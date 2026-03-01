#!/usr/bin/env python3
"""Mark all built CRM epics and their stories as 'done' in ClickUp."""
import json
import time
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# Fetch all tasks (including subtasks)
print("Fetching all tasks...")
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

print(f"Total tasks fetched: {len(all_tasks)}")

# Find built epics (tagged 'built', no parent)
built_epics = [t for t in all_tasks if not t.get("parent")
               and any(tag["name"] == "built" for tag in t.get("tags", []))]

# Find stories that are children of built epics
built_epic_ids = {e["id"] for e in built_epics}
built_stories = [t for t in all_tasks if t.get("parent") in built_epic_ids]

tasks_to_update = built_stories + built_epics  # stories first, then epics

print(f"Built epics: {len(built_epics)}")
print(f"Built stories (children of built epics): {len(built_stories)}")
print(f"Total tasks to mark done: {len(tasks_to_update)}")
print()

# Mark each as 'done'
success = 0
failed = 0
for i, task in enumerate(tasks_to_update, 1):
    task_id = task["id"]
    task_name = task["name"]
    is_epic = task_id in built_epic_ids
    label = "EPIC" if is_epic else "STORY"

    payload = json.dumps({"status": "done"}).encode("utf-8")
    url = f"https://api.clickup.com/api/v2/task/{task_id}"
    req = urllib.request.Request(url, data=payload, headers=headers, method="PUT")

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as resp:
                resp.read()
            print(f"  [{i}/{len(tasks_to_update)}] ✅ {label}: {task_name}")
            success += 1
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
            else:
                print(f"  [{i}/{len(tasks_to_update)}] ❌ {label}: {task_name} — {e}")
                failed += 1

    # Rate limit: ~1 req/sec
    time.sleep(0.5)

print(f"\n{'='*60}")
print(f"DONE: {success} marked as done, {failed} failed")
print(f"  Epics: {len(built_epics)}")
print(f"  Stories: {len(built_stories)}")
