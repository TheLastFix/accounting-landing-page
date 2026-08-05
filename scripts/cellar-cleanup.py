"""Cellar cleanup script for the landing page — deletes stale _nuxt assets.

Safety rule: an object is deleted only if it is BOTH missing from the
current build's live set AND older than RETENTION_DAYS, so tabs left open
after a recent deploy keep working while genuinely old builds are reclaimed.

Nuxt emits no manifest, so the live set comes from the deployed
`landing/index.html` (entry scripts, stylesheets, modulepreload links),
extended with:
- the appManifest build files (`_nuxt/builds/latest.json` + the current
  build's `meta/<id>.json`) — fetched by every client but never referenced
  from the HTML;
- every `_nuxt/` reference found in the live JS/CSS (dynamic chunks,
  images, fonts) — relative refs are resolved against the referencing file.
If the HTML cannot be fetched, the cleanup is skipped entirely — nothing
is deleted. Stable files (robots.txt, favicon, images, _payload.json at the
landing root) are never touched.

Manual run (same env vars as the GitHub Action):
    AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... \
    CELLAR_BUCKET=... CELLAR_HOST=... \
    python scripts/cellar-cleanup.py [--dry-run]

Or via the GitHub Action (.github/workflows/cleanup-cellar.yml), scheduled
weekly or triggered manually from the Actions tab.
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import posixpath
import re
import sys
from datetime import datetime, timedelta, timezone
from typing import Any

import boto3
from botocore.client import Config
from botocore.exceptions import BotoCoreError, ClientError

logger = logging.getLogger(__name__)

RETENTION_DAYS = 10
LANDING_PREFIX = "landing/_nuxt/"
LANDING_INDEX_KEY = "landing/index.html"
BUILDS_PREFIX = "landing/_nuxt/builds/"
BUILDS_LATEST_KEY = f"{BUILDS_PREFIX}latest.json"

# Relative asset refs in built JS/CSS, e.g. import("./chunk-ABC.js")
_RELATIVE_ASSET_RE = re.compile(
    r"""["'](\.[^"']*\.(?:js|css|png|jpe?g|svg|webp|gif|avif|woff2?|ttf|eot)(?:\?[^"']*)?)["']"""
)
# url(...) refs in CSS, e.g. url(./img-ABC.png) or url(/landing/_nuxt/img-ABC.png)
_CSS_URL_RE = re.compile(r"url\(['\"]?([^)'\"]+)['\"]?\)")


def _get_client() -> tuple[Any, str]:
    """Build the boto3 client from the environment."""
    bucket = os.environ["CELLAR_BUCKET"]
    host = os.environ["CELLAR_HOST"]
    # Cellar requires the literal region "default" and SigV4
    # (see Clever Cloud docs: Using SDKs > Python)
    return (
        boto3.client(
            "s3",
            region_name="default",
            endpoint_url=f"https://{host}",
            config=Config(signature_version="s3v4"),
        ),
        bucket,
    )


def _bucket_key_for_token(token: str) -> str | None:
    """Normalize an HTML/JS/CSS token to a bucket key under landing/.

    Tokens may be relative ("_nuxt/entry-ABC.js"), domain-absolute
    ("/_nuxt/entry-ABC.js") or full URLs — only the "_nuxt/" part matters.
    """
    clean = token.split("?")[0].split("#")[0]
    idx = clean.find("_nuxt/")
    if idx == -1:
        return None
    return f"landing/{clean[idx:]}"


def _collect_live_keys(s3_client, bucket: str) -> set[str]:
    """Return every _nuxt key referenced by the current build.

    The deployed HTML is the source of truth for the entry chunks; the
    appManifest build files and the references inside the live JS/CSS
    (dynamic chunks, images, fonts) are collected too — they never appear
    in the HTML. Keys are full bucket keys (e.g. "landing/_nuxt/entry-ABC.js").
    """
    obj = s3_client.get_object(Bucket=bucket, Key=LANDING_INDEX_KEY)
    html = obj["Body"].read().decode("utf-8")

    live: set[str] = set()
    for token in re.findall(r"[^\"'\s]*?_nuxt/[^\"'\s]*", html):
        key = _bucket_key_for_token(token)
        if key:
            live.add(key)

    # appManifest build files are fetched by every client at runtime but are
    # never referenced from the HTML — protect the current build's explicitly,
    # or they would be deleted as stale after the retention window.
    try:
        latest = json.loads(
            s3_client.get_object(Bucket=bucket, Key=BUILDS_LATEST_KEY)["Body"].read()
        )
        live.add(BUILDS_LATEST_KEY)
        build_id = latest.get("id") if isinstance(latest, dict) else None
        if isinstance(build_id, str):
            live.add(f"{BUILDS_PREFIX}meta/{build_id}.json")
    except (ClientError, BotoCoreError, json.JSONDecodeError) as exc:
        logger.warning("Cannot read appManifest latest.json (%s)", exc)

    # Dynamic chunks and assets referenced from JS/CSS only do not appear in
    # the HTML — scan the live files and resolve their relative refs.
    # Newly discovered JS/CSS files are scanned too (queue, not one pass).
    pending = [key for key in live if key.endswith((".js", ".css"))]
    while pending:
        key = pending.pop()
        try:
            body = s3_client.get_object(Bucket=bucket, Key=key).get("Body")
            content = body.read().decode("utf-8") if body else ""
        except (ClientError, BotoCoreError) as exc:
            logger.warning("Cannot read %s: %s", key, exc)
            continue
        for token in re.findall(r"[^\"'\s]*?_nuxt/[^\"'\s]*", content):
            ref = _bucket_key_for_token(token)
            if ref and ref not in live:
                live.add(ref)
                if ref.endswith((".js", ".css")):
                    pending.append(ref)
        for match in re.finditer(_RELATIVE_ASSET_RE, content):
            ref = match.group(1).split("?")[0].split("#")[0]
            resolved = posixpath.normpath(posixpath.join(posixpath.dirname(key), ref))
            if resolved not in live:
                live.add(resolved)
                if resolved.endswith((".js", ".css")):
                    pending.append(resolved)
        for match in re.finditer(_CSS_URL_RE, content):
            url = match.group(1)
            if url.startswith(("data:", "http")):
                continue
            clean = url.split("?")[0].split("#")[0]
            resolved = posixpath.normpath(
                posixpath.join(posixpath.dirname(key), clean)
            ).lstrip("/")
            if resolved not in live:
                live.add(resolved)
                if resolved.endswith((".js", ".css")):
                    pending.append(resolved)
    return live


def _delete_stale_objects(
    s3_client,
    bucket: str,
    live_keys: set[str],
    retention_days: int,
    dry_run: bool = False,
) -> list[str]:
    """Delete objects under LANDING_PREFIX missing from live_keys and old.

    With `dry_run`, objects are listed but not deleted.
    Returns the list of deleted keys.
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=retention_days)
    deleted: list[str] = []

    paginator = s3_client.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=bucket, Prefix=LANDING_PREFIX):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if key in live_keys:
                continue
            if obj["LastModified"] < cutoff:
                if not dry_run:
                    s3_client.delete_object(Bucket=bucket, Key=key)
                deleted.append(key)
    return deleted


def main() -> None:
    """Entry point: connect to Cellar and remove stale landing assets."""
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    parser = argparse.ArgumentParser(description="Clean stale landing assets on Cellar")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="list objects that would be deleted without deleting them",
    )
    args = parser.parse_args()
    s3, bucket = _get_client()

    try:
        live_keys = _collect_live_keys(s3, bucket)
    except (ClientError, BotoCoreError) as exc:
        logger.error(
            "Cannot load the landing index.html (%s) — aborting, nothing deleted", exc
        )
        sys.exit(1)

    deleted = _delete_stale_objects(
        s3, bucket, live_keys, RETENTION_DAYS, dry_run=args.dry_run
    )
    verb = "would delete" if args.dry_run else "deleted"
    logger.info("%s %d stale objects", verb.capitalize(), len(deleted))
    for key in deleted:
        print(f"  - {key}")


if __name__ == "__main__":
    main()
