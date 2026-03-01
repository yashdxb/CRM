#!/usr/bin/env python3
"""Final verification including closed tasks."""
import json
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

all_tasks = []
page = 0
while True:
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?page={page}&subtasks=true&include_closed=true"
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

epics = [t for t in all_tasks if not t.get("parent")]
stories = [t for t in all_tasks if t.get("parent")]

done_tasks = [t for t in all_tasks if t.get("status", {}).get("status") == "done"]
open_tasks = [t for t in all_tasks if t.get("status", {}).get("status") != "done"]

done_epics = [t for t in done_tasks if not t.get("parent")]
done_stories = [t for t in done_tasks if t.get("parent")]
open_epics = [t for t in open_tasks if not t.get("parent")]
open_stories = [t for t in open_tasks if t.get("parent")]

print(f"=== CRM Backlog Summary ===")
print(f"Total tasks: {len(all_tasks)} (34 epics + 111 stories)")
print(f"  Epics: {len(epics)}, Stories: {len(stories)}")
print()
print(f"✅ DONE (built features):  {len(done_tasks)} ({len(done_epics)} epics + {len(done_stories)} stories)")
print(f"📋 OPEN (future roadmap):  {len(open_tasks)} ({len(open_epics)} epics + {len(open_stories)} stories)")
print()

print("Done epics:")
for e in done_epics:
    sc = sum(1 for s in done_stories if s.get("parent") == e["id"])
    print(f"  ✅ {e['name']} ({sc} stories)")

print("\nOpen epics (future):")
for e in open_epics:
    sc = sum(1 for s in open_stories if s.get("parent") == e["id"])
    tags = ", ".join(t["name"] for t in e.get("tags", []))
    print(f"  📋 {e['name']} ({sc} stories) [{tags}]")

# Final validation
assert len(all_tasks) == 145, f"Expected 145 tasks, got {len(all_tasks)}"
assert len(done_tasks) == 81, f"Expected 81 done, got {len(done_tasks)}"
assert len(open_tasks) == 64, f"Expected 64 open, got {len(open_tasks)}"
print("\n✅ ALL VALIDATIONS PASSED")
