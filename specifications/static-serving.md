# Landing Page Static Serving (Cellar S3 + Django)

_please put all link path absolute from the root of the project_

## Data flow

1. Developer pushes to `main` in the landing repo
   ↓
2. [GitHub Actions workflow](../.github/workflows/deploy.yml)
   - `npm ci` + `npm run build` with `LANDING_CDN_URL` injected from secrets
   - Cellar credentials passed as env vars (`CELLAR_KEY_ID`, `CELLAR_KEY_SECRET`)
   - `_nuxt/` (except `builds/`) → `s3://CELLAR_BUCKET/landing/_nuxt` with `Cache-Control: public, max-age=31536000, immutable`
   - Stable-URL files (`index.html`, `_payload.json`, `favicon.svg`, `robots.txt`, `200/404.html`, `_nuxt/builds/*`) → `no-cache`, revalidated at every request
     ↓
3. [nuxt.config.ts](../nuxt.config.ts) — static generation
   - `ssr: true` + `nitro.preset: "static"` → `nuxt generate` bakes the page content into the HTML (SEO)
   - `cdnURL` set from `LANDING_CDN_URL` (bucket URL) → `_nuxt/` assets and hashed images are prefixed automatically
   - Nuxt defaults kept: the random `buildId` makes the `_payload.json` URL change on every deploy
     ↓
4. Build output: `.output/public/` — prerendered `index.html` (full content, all asset URLs point to the bucket), `_nuxt/*-hash.*` (JS/CSS + images from `assets/images/`), `_payload.json`
   ↓
5. Browser requests the landing page (onesnap.ch / www.onesnap.ch)
   ↓
6. [urls_landing.py](<backend-directory>/config/urls_landing.py) routes the domain root **and any sub-path** (`/pricing`, `/about`, …) to the [landing_page view](<backend-directory>/config/views_landing.py)
   ↓
7. [views_landing.py](<backend-directory>/config/views_landing.py) (`_load_landing_html`)
   - Fetches `/landing/index.html` from the bucket (cached 60 s, last known-good fallback)
   - View returns it as-is with `Cache-Control: no-cache`
     ↓
8. Browser loads the prerendered HTML: assets and images come directly from the bucket (URLs baked at build time), cached immutably for 1 year

## Design choices

- **Static generation (SSG)**: `ssr: true` + `nuxt generate` → the page content is pre-rendered in the HTML — the whole point of Nuxt is good SEO
- **Django serves the generated HTML as-is**: the build output is the finished product (standard static-hosting pattern). No manifest, no template for the landing
- **Images live in `assets/images/`**: Nuxt hashes them into `_nuxt/` and applies `cdnURL` automatically — no composable needed, and immutable caching stays correct (a changed image gets a new URL). `public/` keeps `robots.txt`, `favicon.svg` and the images of the commented-out dashboard sections (`dashboard.png`, `mockup-hero.png`, `Home.svg`) — stable URLs by design; small SVGs may be inlined as data URIs by Vite
- **Hashed filenames + immutable cache**: browsers cache assets for a year with zero revalidation; no `--delete` so a page rendered just before a deploy never requests a missing chunk
- **Shell freshness**: HTML cached 60 s server-side + `Cache-Control: no-cache` → a new deploy is visible immediately
- **Nuxt defaults kept (no deterministic build)**: a random `buildId` per build makes the `_payload.json` URL change on every deploy — with the immutable cache, browsers always fetch the correct payload. A fixed buildId + timestamp-stripping hooks were workarounds for the old commit-the-build flow (git noise) and are obsolete — and harmful — here
- **Multi-page ready**: the catch-all routes every sub-path to the landing HTML, so future Nuxt sub-pages (pricing, about, …) work without any Django change — the Nuxt client router takes over
