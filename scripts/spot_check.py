#!/usr/bin/env python3
"""Spot-check specific tasks to verify changes applied."""
import requests, json

HEADERS = {"Authorization": "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"}
BASE = "https://api.clickup.com/api/v2"

# Check a few key tasks:
# 1. Competitive audit epic (should be completed now)
# 2. A child that should be completed
# 3. A backlog item that should have new description
CHECK_IDS = [
    ("86e02y3vw", "Competitive Audit Epic (should be closed)"),
    ("86e02y3w7", "Email integration child (should be closed)"),
    ("86e02y3xc", "Report builder child (should be closed)"),
    ("86e01xvh0", "Approvals policy hooks (should have new description)"),
    ("86dzxrdpm", "One-click low-risk actions (should have new description)"),
    ("86dzrwq50", "Execution Quality v1 (should have new description)"),
]

for task_id, label in CHECK_IDS:
    resp = requests.get(f"{BASE}/task/{task_id}", headers=HEADERS)
    if resp.status_code != 200:
        print(f"ERROR fetching {task_id}: {resp.status_code}")
        continue
    t = resp.json()
    status = t["status"]["status"]
    name = t["name"][:80]
    desc_preview = (t.get("description") or "")[:150]
    print(f"\n{'='*70}")
    print(f"CHECK: {label}")
    print(f"  ID:     {task_id}")
    print(f"  Status: {status}")
    print(f"  Name:   {name}")
    print(f"  Desc:   {desc_preview}...")
