#!/usr/bin/env python3
"""Add Pipeline kanban live updates story under SignalR Quick Wins epic."""
import json
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# Fetch tasks to find the SignalR epic
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

signalr_epic = next(t for t in all_tasks if "[NOW] Real-Time SignalR Quick Wins" in t["name"] and not t.get("parent"))
print(f"Found epic: {signalr_epic['name']} ({signalr_epic['id']})")

payload = json.dumps({
    "name": "Pipeline kanban live updates via SignalR",
    "description": (
        "As a sales manager, I want the pipeline kanban board to update in real-time "
        "when reps move deals between stages so I see live card movement without refreshing.\n\n"
        "Acceptance Criteria:\n"
        "- Opportunity stage changes broadcast via SignalR to all pipeline viewers\n"
        "- Kanban cards animate to new column without page reload\n"
        "- Concurrent viewers see the same live state\n"
        "- Uses existing CrmEventsHub and SignalRCrmRealtimePublisher\n\n"
        "Source: Competitive Audit v2.0 - Section 13 (REMAINING: Pipeline Kanban Live)"
    ),
    "status": "backlog",
    "priority": 2,
    "tags": ["future", "now"],
    "parent": signalr_epic["id"],
}).encode("utf-8")

url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task"
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
with urllib.request.urlopen(req) as resp:
    result = json.loads(resp.read())
print(f"Created: {result['name']}")
