#!/usr/bin/env python3
"""Fetch all built tasks and list statuses to plan the update."""
import json
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# Fetch all tasks (including subtasks)
all_tasks = []
page = 0
while True:
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?page={page}&subtasks=true"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    tasks = data.get("tasks", [])
    if not tasks:
        break
    all_tasks.extend(tasks)
    if data.get("last_page", True):
        break
    page += 1

# Show available statuses
statuses = set()
for t in all_tasks:
    s = t.get("status", {})
    statuses.add((s.get("status", "?"), s.get("type", "?")))
print("Available statuses:")
for s, t in sorted(statuses):
    print(f"  status='{s}', type='{t}'")

# Find built tasks (tagged 'built')
built_tasks = [t for t in all_tasks if any(tag["name"] == "built" for tag in t.get("tags", []))]
epics = [t for t in built_tasks if not t.get("parent")]
stories = [t for t in built_tasks if t.get("parent")]

print(f"\nBuilt epics: {len(epics)}")
print(f"Built stories: {len(stories)}")
print(f"Total built tasks to mark done: {len(built_tasks)}")

print("\nBuilt epics and their stories:")
for e in epics:
    e_status = e.get("status", {}).get("status", "?")
    print(f"\n  Epic: {e['name']} [status: {e_status}]")
    for s in stories:
        if s.get("parent") == e["id"]:
            s_status = s.get("status", {}).get("status", "?")
            print(f"    - {s['name']} [status: {s_status}]")

# Also get list statuses
print("\n--- List statuses ---")
url = f"https://api.clickup.com/api/v2/list/{LIST_ID}"
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    list_data = json.loads(resp.read())
for s in list_data.get("statuses", []):
    print(f"  '{s['status']}' (type: {s['type']}, orderindex: {s['orderindex']})")
