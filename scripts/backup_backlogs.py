#!/usr/bin/env python3
"""Backup CRM Backlog and Prioritization Backlog to JSON files."""
import requests, json, time, os

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
BASE = "https://api.clickup.com/api/v2"
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

def fetch_all(list_id, label):
    all_tasks = []
    page = 0
    while True:
        r = requests.get(f"{BASE}/list/{list_id}/task", headers=HEADERS,
                         params={"page": page, "subtasks": "true", "include_closed": "true"})
        r.raise_for_status()
        tasks = r.json().get("tasks", [])
        if not tasks:
            break
        all_tasks.extend(tasks)
        page += 1
        time.sleep(0.3)
    print(f"  {label}: {len(all_tasks)} tasks fetched")
    return all_tasks

print("Backing up CRM Backlog...")
crm = fetch_all("901710720381", "CRM Backlog")
print("Backing up Prioritization Backlog...")
prio = fetch_all("901711494470", "Prioritization Backlog")

os.makedirs("scratch", exist_ok=True)
with open("scratch/crm_backlog_backup.json", "w") as f:
    json.dump(crm, f, indent=2)
with open("scratch/prio_backlog_backup.json", "w") as f:
    json.dump(prio, f, indent=2)

print(f"\nBackups saved:")
print(f"  scratch/crm_backlog_backup.json  ({len(crm)} tasks)")
print(f"  scratch/prio_backlog_backup.json ({len(prio)} tasks)")
