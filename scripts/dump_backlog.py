#!/usr/bin/env python3
"""Fetch all CRM Backlog tasks with full detail for comparison."""
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

print("=== OPEN EPICS (Future Roadmap) ===")
open_epics = [e for e in epics if e.get("status", {}).get("status") != "done"]
for e in open_epics:
    tags = ", ".join(t["name"] for t in e.get("tags", []))
    print(f"\nEPIC: {e['name']} [{tags}]")
    for s in stories:
        if s.get("parent") == e["id"]:
            s_status = s.get("status", {}).get("status", "?")
            print(f"  - {s['name']} [{s_status}]")

print("\n\n=== DONE EPICS (Built) ===")
done_epics = [e for e in epics if e.get("status", {}).get("status") == "done"]
for e in done_epics:
    tags = ", ".join(t["name"] for t in e.get("tags", []))
    print(f"\nEPIC: {e['name']} [{tags}]")
    for s in stories:
        if s.get("parent") == e["id"]:
            print(f"  - {s['name']}")
