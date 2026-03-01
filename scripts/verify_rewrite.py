#!/usr/bin/env python3
"""Verify the CRM Backlog rewrite results."""
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

# Separate epics (no parent) and stories (have parent)
epics = [t for t in all_tasks if not t.get("parent")]
stories = [t for t in all_tasks if t.get("parent")]

print(f"Total tasks: {len(all_tasks)}")
print(f"Epics (parent tasks): {len(epics)}")
print(f"Stories (subtasks): {len(stories)}")
print()
print("Epics in order:")
for i, e in enumerate(epics, 1):
    story_count = sum(1 for s in stories if s.get("parent") == e["id"])
    tags = ", ".join(t["name"] for t in e.get("tags", []))
    p = e.get("priority", {})
    prio = p.get("priority", "none") if p else "none"
    print(f"  {i:2d}. [{prio}] {e['name']} ({story_count} stories) [{tags}]")

# Validation checks
print("\n--- Validation ---")
old_prefix_count = sum(1 for t in all_tasks if any(
    t["name"].startswith(p) for p in ["01", "02", "03", "04", "05", "06", "07", "08", "09"]))
status_in_name = sum(1 for t in all_tasks if any(
    w in t["name"].lower() for w in ["completed", "ready to test", "in progress"]))
print(f"Tasks with old numbered prefixes: {old_prefix_count} (should be 0)")
print(f"Tasks with status in name: {status_in_name} (should be 0)")
print(f"Expected: 34 epics, 111 stories, 145 total")
if len(epics) == 34 and len(stories) == 111 and len(all_tasks) == 145:
    print("✅ VERIFICATION PASSED")
else:
    print("⚠️  COUNTS DO NOT MATCH EXPECTED")
