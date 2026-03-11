#!/usr/bin/env python3
"""Create lead audit improvement tasks in ClickUp and mark them done.

Fetches the ClickUp API token from Azure Key Vault, finds the Lead Management
epic, creates subtasks for each audit improvement, and marks them closed.
"""
from __future__ import annotations

import json
import subprocess
import sys
import urllib.request

API_BASE = "https://api.clickup.com/api/v2"
CRM_LIST_ID = "901710720381"
VAULT_NAME = "kv-crm-dev-ca"
SECRET_NAME = "clickup-api-token"


def get_token_from_keyvault() -> str:
    result = subprocess.run(
        ["az", "keyvault", "secret", "show",
         "--vault-name", VAULT_NAME,
         "--name", SECRET_NAME,
         "--query", "value", "-o", "tsv"],
        capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def api_get(path: str, token: str) -> dict:
    req = urllib.request.Request(
        f"{API_BASE}{path}",
        headers={"Authorization": token, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def api_post(path: str, token: str, body: dict) -> dict:
    data = json.dumps(body).encode()
    req = urllib.request.Request(
        f"{API_BASE}{path}",
        data=data,
        method="POST",
        headers={"Authorization": token, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def api_put(path: str, token: str, body: dict) -> dict:
    data = json.dumps(body).encode()
    req = urllib.request.Request(
        f"{API_BASE}{path}",
        data=data,
        method="PUT",
        headers={"Authorization": token, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


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


def find_lead_epic(tasks: list[dict]) -> str | None:
    """Find the Lead Management epic task ID."""
    for t in tasks:
        name = t.get("name", "").lower()
        parent = t.get("parent")
        if not parent and "lead" in name and ("management" in name or "module" in name):
            return t["id"]
    # Fallback: look for any epic-level task with 'lead' in name
    for t in tasks:
        name = t.get("name", "").lower()
        parent = t.get("parent")
        if not parent and "lead" in name:
            return t["id"]
    return None


# The audit improvements we completed
AUDIT_IMPROVEMENTS = [
    {
        "name": "Module: Leads | Remove dead .field CSS from lead form",
        "description": (
            "**Audit Issue 7.1** — Removed all orphaned `.field` CSS blocks from "
            "lead-form.page.scss. Updated `.qualification-grid .field` selectors to "
            "`.form-field` to match the active horizontal layout standard.\n\n"
            "Commit: 4e6e87d"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Client-side attachment upload validation",
        "description": (
            "**Audit Issue 3.4** — Added file size and extension validation in "
            "`onAttachmentUpload()` before calling `attachmentData.upload()`. "
            "Validates against `supportingDocumentMaxFileSizeMb` and "
            "`supportingDocumentAllowedExtensions` with toast error feedback.\n\n"
            "Commit: 4e6e87d"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Add help text to qualification factor fields",
        "description": (
            "**Audit Issue 5.2** — Added `aria-describedby` attributes and visible "
            "`.field-hint` help text to all 5 qualification factor selects: "
            "Budget availability, Readiness to spend, Buying timeline, "
            "Problem severity, Economic buyer.\n\n"
            "Commit: 4e6e87d"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Mobile responsive table improvements",
        "description": (
            "**Audit Issue 6.3** — Improved leads list table for mobile viewports. "
            "Hides Contact and Owner columns on screens <= 768px, reduces min-widths, "
            "adds text-overflow ellipsis on table headers. Reduced min-width from "
            "760px to 520px.\n\n"
            "Commit: 4e6e87d"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Replace pButton with unified button standard",
        "description": (
            "**Audit Issue 1.1** — Replaced `pButton` directive usage in lead form "
            "with plain `<button type='button'>` and `action-btn` classes per the "
            "unified button standard. Dialog buttons exempted per standard.\n\n"
            "Commit: bf1f118"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Error toast on lead convert failure",
        "description": (
            "**Audit Issue 2.2** — Added error toast notification when lead "
            "conversion API call fails, using AppToastService.\n\n"
            "Commit: bf1f118"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Accessibility: aria-labels on leads list",
        "description": (
            "**Audit Issue 4.1** — Added aria-label attributes to all action "
            "buttons on the leads list page (edit, delete, view, convert, etc.). "
            "Also added semantic roles to kanban cards (Issue 4.2).\n\n"
            "Commit: bf1f118"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
    {
        "name": "Module: Leads | Move LeadsController to clean architecture",
        "description": (
            "**Audit Issue 10.2** — Refactored LeadsController to delegate to "
            "ILeadService instead of injecting DbContext directly. Follows the "
            "mandatory clean architecture layering.\n\n"
            "Commit: bf1f118"
        ),
        "tags": ["done", "now", "module:Leads"],
    },
]


def main():
    print("Fetching ClickUp API token from Azure Key Vault...")
    token = get_token_from_keyvault()
    print(f"  Token retrieved (ends ...{token[-6:]})")

    print("Fetching all tasks from CRM Backlog list...")
    tasks = fetch_all_tasks(CRM_LIST_ID, token)
    print(f"  Found {len(tasks)} tasks")

    epic_id = find_lead_epic(tasks)
    if not epic_id:
        print("ERROR: Could not find Lead Management epic. Listing epics:")
        for t in tasks:
            if not t.get("parent"):
                print(f"  {t['id']} | {t['name'][:60]}")
        sys.exit(1)
    print(f"  Lead Management epic ID: {epic_id}")

    # Check which tasks already exist (avoid duplicates)
    existing_names = {t["name"].strip().lower() for t in tasks}

    created = 0
    skipped = 0
    for item in AUDIT_IMPROVEMENTS:
        if item["name"].strip().lower() in existing_names:
            print(f"  SKIP (exists): {item['name'][:60]}")
            skipped += 1
            continue

        print(f"  Creating: {item['name'][:60]}...")
        body = {
            "name": item["name"],
            "description": item["description"],
            "status": "done",
            "parent": epic_id,
            "tags": item["tags"],
        }
        try:
            result = api_post(f"/list/{CRM_LIST_ID}/task", token, body)
            task_id = result.get("id", "?")
            print(f"    Created: {task_id}")
            created += 1
        except Exception as e:
            print(f"    FAILED: {e}")

    print(f"\nDone. Created: {created}, Skipped: {skipped}")


if __name__ == "__main__":
    main()
