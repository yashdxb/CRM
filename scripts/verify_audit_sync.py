#!/usr/bin/env python3
"""Verify CRM Backlog after audit sync."""
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
done = [t for t in all_tasks if t.get("status", {}).get("status") == "done"]
open_t = [t for t in all_tasks if t.get("status", {}).get("status") != "done"]

print(f"=== CRM Backlog Final State ===")
print(f"Total: {len(all_tasks)} ({len(epics)} epics + {len(stories)} stories)")
print(f"Done: {len(done)} | Open: {len(open_t)}")

# Group open epics by tier
now_epics = [e for e in epics if "[NOW]" in e["name"]]
next_epics = [e for e in epics if "[NEXT]" in e["name"]]
later_epics = [e for e in epics if "[LATER]" in e["name"]]

print(f"\n📋 NOW tier: {len(now_epics)} epics")
for e in now_epics:
    sc = sum(1 for s in stories if s.get("parent") == e["id"])
    print(f"  {e['name']} ({sc} stories)")

print(f"\n📋 NEXT tier: {len(next_epics)} epics")
for e in next_epics:
    sc = sum(1 for s in stories if s.get("parent") == e["id"])
    print(f"  {e['name']} ({sc} stories)")

print(f"\n📋 LATER tier: {len(later_epics)} epics")
for e in later_epics:
    sc = sum(1 for s in stories if s.get("parent") == e["id"])
    print(f"  {e['name']} ({sc} stories)")

# Check for the marketing suite having lost a story
mkt_later = next((e for e in epics if "Marketing Automation Suite" in e["name"]), None)
if mkt_later:
    mkt_stories = [s for s in stories if s.get("parent") == mkt_later["id"]]
    print(f"\n[LATER] Marketing Automation Suite remaining stories: {len(mkt_stories)}")
    for s in mkt_stories:
        print(f"  - {s['name']}")

# Check Email Marketing Campaigns has the moved story
email_mkt = next((e for e in epics if "Email Marketing Campaigns" in e["name"]), None)
if email_mkt:
    em_stories = [s for s in stories if s.get("parent") == email_mkt["id"]]
    print(f"\n[NEXT] Email Marketing Campaigns stories: {len(em_stories)}")
    for s in em_stories:
        print(f"  - {s['name']}")

print("\n✅ Verification complete")
