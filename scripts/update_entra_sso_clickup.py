#!/usr/bin/env python3
"""
Update ClickUp SSO & Enterprise Authentication epic and stories
to reflect the completed Entra SSO implementation (2026-03-08).
"""
import requests
import json
import sys

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"  # CRM Backlog
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

SSO_EPIC_ID = "86e0422k2"

# Known subtask IDs from search
ENTRA_RUNBOOK_ID = "86e05r0by"
ENTRA_LOGIN_ENDPOINT_ID = "86e05r0ar"
SAML_SSO_ID = "86e0422k7"


def api(method, url, payload=None):
    r = requests.request(method, url, headers=HEADERS, json=payload)
    if r.status_code >= 400:
        print(f"  ERROR {r.status_code}: {r.text[:200]}")
    return r


def get_all_tasks():
    tasks = []
    page = 0
    while True:
        url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?page={page}&subtasks=true&include_closed=true"
        r = api("GET", url)
        data = r.json()
        batch = data.get("tasks", [])
        tasks.extend(batch)
        if not batch or data.get("last_page", True):
            break
        page += 1
    return tasks


def find_sso_subtasks(tasks):
    results = []
    for t in tasks:
        if t.get("parent") == SSO_EPIC_ID or t.get("id") == SSO_EPIC_ID:
            results.append(t)
    return results


def update_task_status(task_id, status_name):
    url = f"https://api.clickup.com/api/v2/task/{task_id}"
    payload = {"status": status_name}
    r = api("PUT", url, payload)
    return r.status_code < 400


def create_subtask(name, description, status="done"):
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task"
    payload = {
        "name": name,
        "description": description,
        "status": status,
        "parent": SSO_EPIC_ID,
        "tags": ["now", "module:Settings", "done"],
    }
    r = api("POST", url, payload)
    if r.status_code < 400:
        return r.json().get("id")
    return None


def main():
    print("=" * 60)
    print("  ClickUp SSO Epic Update Script")
    print("=" * 60)

    # 1. Fetch all tasks
    print("\n1. Fetching CRM Backlog tasks...")
    tasks = get_all_tasks()
    print(f"   Found {len(tasks)} total tasks")

    # 2. List current SSO epic subtasks
    print("\n2. Current SSO epic subtasks:")
    sso_tasks = find_sso_subtasks(tasks)
    for t in sso_tasks:
        status = t.get("status", {}).get("status", "?")
        print(f"   [{status}] {t['name']} (id={t['id']})")

    # 3. Create new story: Entra SPA App Registration
    print("\n3. Creating new story: Entra SPA App Registration...")
    desc = """## Module: Settings | Entra SPA App Registration & SSO Enablement

**Completed:** 2026-03-08

### What was done:
- Created Entra SPA app registration: "CRM Enterprise - SSO Login" (appId: 7ac0399a-d8ef-420f-b07e-65fb9a8de912)
- Configured SPA redirect URIs (production + localhost)
- Added delegated permissions: openid, profile, email (admin consent granted)
- Enabled ID token issuance
- Updated appsettings.json and appsettings.Development.json with Enabled=true, ClientId, TenantId, Authority
- Updated Angular environment.ts and environment.production.ts with matching config
- Both client and API builds verified clean
- Verified SSO login works across multiple browsers

### Acceptance Criteria:
- [x] SPA app registration created in Entra with correct redirect URIs
- [x] openid, profile, email permissions granted with admin consent
- [x] Backend config EntraId.Enabled=true with real ClientId and tenant-scoped Authority
- [x] Frontend environment files updated with matching Entra config
- [x] /api/auth/config endpoint returns entra.enabled=true with valid clientId
- [x] Login via "Sign In With Microsoft" works in production
- [x] Multi-browser SSO login verified
- [x] Existing email/password login still works (LocalLoginEnabled=true)

### References:
- Runbook: docs/ENTRA_INTERNAL_AUTH_RUNBOOK.md
- App Registration Object ID: af699db2-490c-4388-8772-9500a9ce0bd7
- Tenant: df4fe0d4-9f04-4365-94d1-90b5ff952725
"""
    new_id = create_subtask(
        "Module: Settings | Entra SPA app registration and SSO enablement",
        desc,
        "done",
    )
    if new_id:
        print(f"   Created task id={new_id}")
    else:
        print("   Failed to create task")

    # 4. Ensure SAML/SSO stays backlog (not done yet)
    print(f"\n4. SAML/SSO task ({SAML_SSO_ID}) stays in backlog (no change)")

    # 5. Final state
    print("\n5. Fetching updated SSO epic subtasks...")
    tasks2 = get_all_tasks()
    sso_tasks2 = find_sso_subtasks(tasks2)
    print(f"\n   SSO & Enterprise Authentication Epic ({SSO_EPIC_ID}):")
    for t in sso_tasks2:
        status = t.get("status", {}).get("status", "?")
        is_epic = "(EPIC)" if t.get("id") == SSO_EPIC_ID else ""
        print(f"   [{status}] {t['name']} {is_epic}")

    print("\n" + "=" * 60)
    print("  Done!")
    print("=" * 60)


if __name__ == "__main__":
    main()
