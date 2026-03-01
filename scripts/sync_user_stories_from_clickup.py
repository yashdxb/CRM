#!/usr/bin/env python3
"""Mirror ClickUp CRM Backlog stories into docs/USER_STORIES.md.

Source of truth: ClickUp list 901710720381 (CRM Backlog).
"""
from __future__ import annotations

import datetime as dt
import json
import os
import urllib.request
from collections import Counter
from pathlib import Path

API_BASE = "https://api.clickup.com/api/v2"
DEFAULT_LIST_ID = "901710720381"
DEFAULT_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"


def api_get(path: str, token: str) -> dict:
    request = urllib.request.Request(
        f"{API_BASE}{path}",
        headers={"Authorization": token, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request) as response:
        return json.loads(response.read())


def fetch_all_tasks(list_id: str, token: str) -> list[dict]:
    tasks: list[dict] = []
    page = 0
    while True:
        payload = api_get(
            f"/list/{list_id}/task?page={page}&subtasks=true&include_closed=true",
            token,
        )
        page_tasks = payload.get("tasks", [])
        if not page_tasks:
            break
        tasks.extend(page_tasks)
        if payload.get("last_page", True):
            break
        page += 1
    return tasks


def normalize_task(task: dict) -> dict:
    status = (task.get("status") or {}).get("status", "unknown")
    priority_obj = task.get("priority") or {}
    priority_order = priority_obj.get("priority")
    try:
        priority_order = int(priority_order) if priority_order is not None else 99
    except ValueError:
        priority_order = 99
    tags = sorted(tag.get("name", "") for tag in (task.get("tags") or []))
    return {
        "id": task["id"],
        "name": task.get("name", "").strip(),
        "parent": task.get("parent"),
        "status": status,
        "tags": tags,
        "priority_order": priority_order,
    }


def render_markdown(list_id: str, tasks: list[dict]) -> str:
    now = dt.datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    normalized = [normalize_task(task) for task in tasks]
    epics = [task for task in normalized if not task["parent"]]
    stories = [task for task in normalized if task["parent"]]
    stories_by_parent: dict[str, list[dict]] = {}
    for story in stories:
        stories_by_parent.setdefault(story["parent"], []).append(story)

    status_counts = Counter(task["status"] for task in normalized)
    epic_status_counts = Counter(task["status"] for task in epics)
    story_status_counts = Counter(task["status"] for task in stories)

    lines: list[str] = []
    lines.append("# CRM User Stories Mirror (ClickUp-Synced)")
    lines.append("")
    lines.append("> **Source of truth**: ClickUp CRM Backlog list `901710720381`.")
    lines.append("> This file is a generated mirror for in-repo visibility and search.")
    lines.append("> Do not edit stories manually here; update in ClickUp, then re-sync.")
    lines.append("")
    lines.append("## Sync Metadata")
    lines.append(f"- Synced at: **{now}**")
    lines.append(f"- ClickUp list id: `{list_id}`")
    lines.append(f"- Total tasks mirrored: **{len(normalized)}**")
    lines.append(f"- Epics mirrored: **{len(epics)}**")
    lines.append(f"- Stories mirrored: **{len(stories)}**")
    lines.append("")
    lines.append("## Status Summary")
    lines.append("- All tasks:")
    for status, count in sorted(status_counts.items(), key=lambda item: (-item[1], item[0])):
        lines.append(f"  - `{status}`: {count}")
    lines.append("- Epics:")
    for status, count in sorted(epic_status_counts.items(), key=lambda item: (-item[1], item[0])):
        lines.append(f"  - `{status}`: {count}")
    lines.append("- Stories:")
    for status, count in sorted(story_status_counts.items(), key=lambda item: (-item[1], item[0])):
        lines.append(f"  - `{status}`: {count}")
    lines.append("")
    lines.append("## Epic and Story Mirror")
    lines.append("")

    def epic_sort_key(epic: dict) -> tuple[int, str]:
        return (epic["priority_order"], epic["name"].lower())

    def story_sort_key(story: dict) -> tuple[int, str]:
        return (story["priority_order"], story["name"].lower())

    for epic in sorted(epics, key=epic_sort_key):
        epic_tags = ", ".join(epic["tags"]) if epic["tags"] else "-"
        lines.append(
            f"### {epic['name']} (`{epic['id']}`)"
        )
        lines.append(f"- Status: `{epic['status']}`")
        lines.append(f"- Tags: {epic_tags}")
        epic_stories = sorted(stories_by_parent.get(epic["id"], []), key=story_sort_key)
        if not epic_stories:
            lines.append("- Stories: _None_")
            lines.append("")
            continue
        lines.append("- Stories:")
        for story in epic_stories:
            story_tags = ", ".join(story["tags"]) if story["tags"] else "-"
            lines.append(
                f"  - `{story['id']}` | `{story['status']}` | {story['name']} | tags: {story_tags}"
            )
        lines.append("")

    lines.append("## Maintenance")
    lines.append("- Re-sync command: `python3 scripts/sync_user_stories_from_clickup.py`")
    lines.append("- Keep ClickUp as source of truth; this file is read-only mirror output.")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    output_path = root / "docs" / "USER_STORIES.md"
    list_id = os.environ.get("CLICKUP_CRM_LIST_ID", DEFAULT_LIST_ID)
    token = os.environ.get("CLICKUP_API_TOKEN", DEFAULT_TOKEN).strip()
    if not token:
        raise SystemExit("CLICKUP_API_TOKEN is required.")

    tasks = fetch_all_tasks(list_id, token)
    markdown = render_markdown(list_id, tasks)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Wrote {output_path} ({len(tasks)} tasks mirrored).")


if __name__ == "__main__":
    main()
