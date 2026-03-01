#!/usr/bin/env python3
"""Delete all tasks from the Prioritization Backlog (merged into CRM Backlog)."""
import json
import time
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
PRIO_LIST_ID = "901711494470"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# Fetch all tasks (including subtasks and closed)
print("Fetching Prioritization Backlog tasks...")
all_tasks = []
page = 0
while True:
    url = f"https://api.clickup.com/api/v2/list/{PRIO_LIST_ID}/task?page={page}&subtasks=true&include_closed=true"
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

print(f"Found {len(all_tasks)} tasks to delete")

# Delete subtasks first, then parents
subtasks = [t for t in all_tasks if t.get("parent")]
parents = [t for t in all_tasks if not t.get("parent")]
ordered = subtasks + parents

success = 0
failed = 0
for i, task in enumerate(ordered, 1):
    task_id = task["id"]
    task_name = task["name"]
    url = f"https://api.clickup.com/api/v2/task/{task_id}"
    req = urllib.request.Request(url, headers=headers, method="DELETE")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as resp:
                resp.read()
            print(f"  [{i}/{len(ordered)}] Deleted: {task_name}")
            success += 1
            break
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
            else:
                print(f"  [{i}/{len(ordered)}] FAILED: {task_name} — {e}")
                failed += 1
    time.sleep(0.3)

print(f"\nDeleted {success} tasks, {failed} failed")

# Now delete the list itself
print("\nDeleting the Prioritization Backlog list...")
url = f"https://api.clickup.com/api/v2/list/{PRIO_LIST_ID}"
req = urllib.request.Request(url, headers=headers, method="DELETE")
try:
    with urllib.request.urlopen(req) as resp:
        resp.read()
    print("✅ Prioritization Backlog list deleted")
except Exception as e:
    print(f"⚠️  Could not delete list: {e}")
    print("   (You may need to delete it manually from ClickUp)")
