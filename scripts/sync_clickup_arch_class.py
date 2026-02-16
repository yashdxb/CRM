#!/usr/bin/env python3
import argparse
import json
import os
import re
import sys
import time
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
from urllib import request, error

API_BASE = "https://api.clickup.com/api/v2"


@dataclass
class StoryClass:
    arch_class: str
    reason: str


def api_request(method: str, path: str, token: str, payload: Optional[Dict] = None, retries: int = 4):
    url = f"{API_BASE}{path}"
    data = None
    headers = {
        "Authorization": token,
        "Content-Type": "application/json",
    }
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")

    for attempt in range(retries):
        req = request.Request(url, data=data, headers=headers, method=method)
        try:
            with request.urlopen(req, timeout=60) as resp:
                body = resp.read().decode("utf-8")
                return json.loads(body) if body else {}
        except error.HTTPError as e:
            body = e.read().decode("utf-8", errors="ignore")
            if e.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                time.sleep(1.5 * (attempt + 1))
                continue
            raise RuntimeError(f"{method} {url} failed: {e.code} {body}")


def fetch_all_tasks(list_id: str, token: str) -> List[Dict]:
    tasks: List[Dict] = []
    page = 0
    while True:
        payload = api_request(
            "GET",
            f"/list/{list_id}/task?include_closed=true&subtasks=true&page={page}",
            token,
        )
        page_tasks = payload.get("tasks", [])
        if not page_tasks:
            break
        tasks.extend(page_tasks)
        page += 1
    return tasks


def is_story_like(task: Dict) -> bool:
    name = (task.get("name") or "").strip()
    desc = task.get("description") or ""
    desc_l = desc.lower()

    story_markers = [
        " as a ",
        " as an ",
        "module:",
        "## story",
        "story ",
        "user story",
    ]
    has_marker = any(m in f" {name.lower()} " for m in [" as a ", " as an "]) or any(
        m in desc_l for m in ["## story", "user story", "\nstory "]
    ) or name.lower().startswith("module:") or bool(re.match(r"^[0-9]{2}[A-Z0-9-]*\s-\s", name))

    if not has_marker:
        return False

    container_names = {
        "now",
        "next",
        "later",
        "coaching & management",
        "conditional forecasting",
        "epistemic metrics core",
        "epistemic state + evidence governance",
        "feedback loop + weakest signal",
        "risk & cost of not knowing",
    }
    normalized = name.strip().lower()
    if normalized in container_names or normalized.startswith("epic |"):
        return False

    return True


def classify_story(task: Dict) -> StoryClass:
    name = task.get("name") or ""
    desc = task.get("description") or ""
    text = f"{name}\n{desc}".lower()

    complex_patterns: List[Tuple[str, str]] = [
        (r"approval|approve|override", "approval/override workflow"),
        (r"policy gate|threshold", "policy/threshold branching"),
        (r"stage automation|automation creates|auto-?create|auto-?assign", "automation/orchestration"),
        (r"sla", "SLA-driven workflow"),
        (r"scoring model|api contract", "service contract and scoring orchestration"),
        (r"conversion action|create account.*contact.*opportunity", "cross-module conversion"),
        (r"rollup|hierarchy|descendant roles", "cross-scope aggregation"),
        (r"calibration|cost of not knowing|confidence-weighted|forecast", "computed multi-signal analytics"),
        (r"next-best-action|belief-vs-truth|signal enrichment|email sentiment", "multi-signal guidance workflow"),
        (r"review outcomes|acknowledg", "multi-step review/coaching flow"),
        (r"exit criteria|stage progression", "stage-gate orchestration"),
        (r"security questionnaire|legal redlines", "cross-function legal/security orchestration"),
        (r"onboarding tasks|assign delivery|renewal", "post-close automation"),
    ]

    for pattern, reason in complex_patterns:
        if re.search(pattern, text):
            return StoryClass("Complex Orchestration", reason)

    simple_patterns: List[Tuple[str, str]] = [
        (r"ui|dialog|navigation|tabs", "UI-focused implementation"),
        (r"render|display|view|widget|card", "read/display behavior"),
        (r"preselected|disabled|inline", "single-module form behavior"),
        (r"tag contacts|set opportunity name", "single-entity field update"),
        (r"quick actions", "localized workflow shortcut"),
    ]

    for pattern, reason in simple_patterns:
        if re.search(pattern, text):
            return StoryClass("Simple Flow", reason)

    # Safe default under current architecture rule.
    return StoryClass("Simple Flow", "single-module/service-first default")


def upsert_architecture_section(desc: str, classification: StoryClass) -> str:
    base = desc or ""
    base = re.sub(
        r"\n## Architecture Classification\n(?:.|\n)*?(?=\n## |\Z)",
        "\n",
        base,
        flags=re.MULTILINE,
    ).rstrip()

    section = (
        "\n\n## Architecture Classification\n"
        f"- Class: `{classification.arch_class}`\n"
        f"- Reason: {classification.reason}\n"
        "- Rule Source: `docs/PROJECT_BACKLOG.md` -> `Hybrid CQRS Implementation Checklist (Execution)`\n"
    )

    return (base + section).strip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync ClickUp stories with architecture classification")
    parser.add_argument("--list-id", default="901710720381")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--report-json", default="/tmp/clickup_arch_sync.json")
    parser.add_argument("--report-md", default="/tmp/clickup_arch_sync.md")
    args = parser.parse_args()

    token = os.getenv("CLICKUP_API_TOKEN")
    if not token:
        print("Missing CLICKUP_API_TOKEN", file=sys.stderr)
        return 2

    tasks = fetch_all_tasks(args.list_id, token)
    story_tasks = [t for t in tasks if is_story_like(t)]

    results = []
    updated = 0

    for task in story_tasks:
        classification = classify_story(task)
        old_desc = task.get("description") or ""
        new_desc = upsert_architecture_section(old_desc, classification)
        changed = new_desc != (old_desc if old_desc.endswith("\n") else old_desc + ("\n" if old_desc else ""))

        if changed and not args.dry_run:
            api_request("PUT", f"/task/{task['id']}", token, payload={"description": new_desc})
            updated += 1
            time.sleep(0.12)

        results.append(
            {
                "id": task.get("id"),
                "name": task.get("name"),
                "status": (task.get("status") or {}).get("status"),
                "parent": task.get("parent"),
                "architecture_class": classification.arch_class,
                "reason": classification.reason,
                "changed": changed,
            }
        )

    counts = {
        "total_tasks": len(tasks),
        "story_tasks": len(story_tasks),
        "simple_flow": sum(1 for r in results if r["architecture_class"] == "Simple Flow"),
        "complex_orchestration": sum(1 for r in results if r["architecture_class"] == "Complex Orchestration"),
        "updated": updated if not args.dry_run else 0,
        "would_update": sum(1 for r in results if r["changed"]),
        "dry_run": args.dry_run,
    }

    report = {"counts": counts, "stories": sorted(results, key=lambda x: (x["architecture_class"], x["name"]))}

    with open(args.report_json, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    lines = []
    lines.append("# ClickUp Architecture Classification Sync")
    lines.append("")
    lines.append(f"- List ID: `{args.list_id}`")
    lines.append(f"- Story tasks analyzed: **{counts['story_tasks']}**")
    lines.append(f"- Simple Flow: **{counts['simple_flow']}**")
    lines.append(f"- Complex Orchestration: **{counts['complex_orchestration']}**")
    if args.dry_run:
        lines.append(f"- Dry run: **yes** (would update: {counts['would_update']})")
    else:
        lines.append(f"- Updated in ClickUp: **{counts['updated']}**")
    lines.append("")
    lines.append("## Story Classification")
    lines.append("")
    lines.append("| Task ID | Class | Status | Story |")
    lines.append("|---|---|---|---|")

    for r in sorted(results, key=lambda x: x["name"].lower()):
        name = r["name"].replace("|", "\\|")
        lines.append(f"| `{r['id']}` | {r['architecture_class']} | {r['status']} | {name} |")

    with open(args.report_md, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print(json.dumps(counts, indent=2))
    print(f"Wrote {args.report_json}")
    print(f"Wrote {args.report_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
