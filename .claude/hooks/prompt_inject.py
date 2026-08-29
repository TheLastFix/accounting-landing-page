#!/usr/bin/env python3
"""
prompt_inject.py - UserPromptSubmit hook.

Injects into every Claude prompt:
- A warning listing mandatory files not yet read this session.
- A warning if the decision log has not been written yet.
- Project rules (always injected if defined in config).

For the mandatory files check:
- Always-required files (no "paths" or "skills") are shown if unread.
- Skill-triggered files are shown if the relevant skill is active and file unread.
- Path-triggered-only files are skipped (can't know which path Claude will touch).

stdout of UserPromptSubmit hooks is automatically prepended to Claude's context.

Reads stdin JSON fields:
- session_id: stable identifier for the current Claude Code session

Always exits 0.
"""

import json
import os
import re
import sys


def get_flag_dir(session_id: str) -> str:
    """Return the session flag directory using the session_id from hook input.

    session_id is stable for the entire Claude Code session and unique per session.
    """
    return f"/tmp/claude_reads_{session_id}"


def write_flag(flag_dir: str, name: str) -> None:
    """Write a flag file to mark something as done this session."""
    flag_path = os.path.join(flag_dir, name)
    open(flag_path, "w").close()


def flag_exists(flag_dir: str, filepath: str) -> bool:
    """Check if a mandatory file has been marked as read this session."""
    flag = os.path.join(flag_dir, filepath.replace("/", "_"))
    return os.path.exists(flag)


def get_active_skills(flag_dir: str) -> set:
    """Return set of active skill names from session flags."""
    if not os.path.isdir(flag_dir):
        return set()
    return {
        name.removeprefix("skill_")
        for name in os.listdir(flag_dir)
        if name.startswith("skill_")
    }


def is_file_relevant_in_prompt(
    file_key: str,
    rule: dict,
    active_skills: set,
) -> bool:
    """Check if a mandatory file is relevant to show in the prompt injection.

    Returns True if the file requirement could apply this session based on
    available context (skills, global rules).
    """
    if not isinstance(rule, dict):
        return False

    paths = rule.get("paths")
    skills = rule.get("skills")
    has_paths = paths is not None
    has_skills = skills is not None

    # Always required (no trigger conditions)
    if not has_paths and not has_skills:
        return True

    # Skill-triggered: show if the skill is active
    if has_skills and active_skills.intersection(skills):
        return True

    # Path-only files: can't determine relevance without knowing the target path,
    # so skip them to avoid noise.
    return False


def main() -> None:
    """Entry point."""
    project_root = os.getcwd()
    config_path = os.path.join(project_root, ".claude", "hooks-system.json")

    # Load project config if exists
    project_config = {}
    if os.path.exists(config_path):
        try:
            with open(config_path) as f:
                project_config = json.load(f)
        except (json.JSONDecodeError, IOError):
            pass

    full_config = project_config

    # Extract mandatory_files sub-config (merged)
    config = full_config.get("mandatory_files", {})

    data = json.load(sys.stdin)
    session_id = data.get("session_id", "default")

    flag_dir = get_flag_dir(session_id)
    os.makedirs(flag_dir, exist_ok=True)

    lines = []
    active_skills = get_active_skills(flag_dir)

    # --- Detect skills from prompt (PostToolUse Skill may not fire in settings.json) ---
    prompt_text = data.get("prompt", "") or ""
    skills_from_prompt = set()
    for match in re.finditer(r"(?:/code-plugin:|/)([\w-]+(?:-[\w]+)*)", prompt_text):
        s = match.group(1)
        if s not in ("code-plugin", "core-plugin"):
            skills_from_prompt.add(s)
    active_skills.update(skills_from_prompt)
    for s in skills_from_prompt:
        write_flag(flag_dir, f"skill_{s}")

    # --- Check mandatory files via file-keyed config ---
    missing_files = []

    for file_key, rule in config.items():
        if is_file_relevant_in_prompt(file_key, rule, active_skills):
            if not flag_exists(flag_dir, file_key):
                missing_files.append(file_key)

    if missing_files:
        files_list = ", ".join(missing_files)
        lines.append(f"⚠️  Mandatory files not read this session: {files_list}")
        lines.append("    → Use the Read tool to read them before making any change.")

    # --- Check decision log ---
    require_decision_log = full_config.get("require_decision_log", False)
    if require_decision_log:
        decision_log_flag = os.path.join(flag_dir, "decision_log_written")
        if not os.path.exists(decision_log_flag):
            lines.append("⚠️  Decision log not written yet this session.")
            lines.append(
                f"    → Write your plan in /tmp/claude_decisions_{session_id}.md"
            )
            lines.append(
                "    → Include: what you are going to do, why, and which files will be affected."
            )

    if lines:
        print("\n".join(lines))

    sys.exit(0)


if __name__ == "__main__":
    main()
