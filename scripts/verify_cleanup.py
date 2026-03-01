#!/usr/bin/env python3
"""Verify CRM Backlog cleanup results."""
import requests

HEADERS = {"Authorization": "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"}
BASE = "https://api.clickup.com/api/v2"

all_tasks = []
page = 0
while True:
    resp = requests.get(
        f"{BASE}/list/901710720381/task",
        headers=HEADERS,
        params={"subtasks": "true", "include_closed": "true", "page": page}
    )
    tasks = resp.json().get("tasks", [])
    if not tasks:
        break
    all_tasks.extend(tasks)
    page += 1

statuses = {}
for t in all_tasks:
    s = t["status"]["status"]
    statuses[s] = statuses.get(s, 0) + 1

print(f"Total tasks: {len(all_tasks)}")
for s, c in sorted(statuses.items(), key=lambda x: -x[1]):
    print(f"  {s}: {c}")

print("\nRemaining BACKLOG items:")
for t in all_tasks:
    if t["status"]["status"] == "backlog":
        print(f"  {t['id']} | {t['name'][:75]}")

print("\nRemaining EPIC items (backlog):")
for t in all_tasks:
    if t["status"]["status"] == "backlog" and "Epic" in t["name"]:
        print(f"  {t['id']} | {t['name']}")
