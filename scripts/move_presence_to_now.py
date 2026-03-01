#!/usr/bin/env python3
"""
Move 'Record-level presence indicators' from [NEXT] to [NOW] Real-Time SignalR Quick Wins
and update its description to emphasize concurrent editing notifications.
"""

import requests
import time

TOKEN = 'pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY'
LIST_ID = '901710720381'
HEADERS = {'Authorization': TOKEN, 'Content-Type': 'application/json'}

NOW_EPIC_ID = '86e0422m0'       # [NOW] Real-Time SignalR Quick Wins
RECORD_PRESENCE_ID = '86e042ex6' # Record-level presence indicators (currently under NEXT)

UPDATED_DESC = (
    '## User Story\n'
    'As a CRM user, when I open a customer, lead, opportunity, or contact record, '
    'I want to immediately see who else is currently viewing or editing the same record '
    'so we avoid conflicting changes. When another user saves changes to a record I am '
    'viewing, I should get a real-time notification and the option to refresh.\n\n'
    '## Why Top Priority\n'
    'Concurrent editing without visibility is a data integrity risk. In a multi-user '
    'CRM, two reps editing the same deal or customer simultaneously leads to lost updates. '
    'This is a foundational real-time feature that must ship before broader entity sync.\n\n'
    '## Acceptance Criteria\n'
    '- [ ] New SignalR group pattern: `tenant:{id}:record:{entityType}:{entityId}`\n'
    '- [ ] When a user opens a record form, frontend joins the record-level SignalR group\n'
    '- [ ] When a user navigates away or closes the tab, frontend leaves the group\n'
    '- [ ] Other users on the same record see avatar badges of concurrent viewers '
    '(e.g., "Yasser is viewing this record")\n'
    '- [ ] When a user SAVES changes to a record, a `record.updated` event is published '
    'to the record group\n'
    '- [ ] Other concurrent viewers receive a toast notification: '
    '"[User] just updated this record — click to refresh"\n'
    '- [ ] Stale data warning: if a concurrent edit is detected, the form shows a banner '
    'with "Refresh" and "Overwrite" options\n'
    '- [ ] Presence indicator disappears after 30s timeout if no heartbeat\n'
    '- [ ] Works on: customer-form, lead-form, contact-form, opportunity-form pages\n'
    '- [ ] Max viewers shown: 5 avatars + "+N more" overflow badge\n\n'
    '## Technical Notes\n'
    '- Extend PresenceHub with `JoinRecord(entityType, entityId)` and `LeaveRecord` methods\n'
    '- Reuse existing `IPresenceTracker` pattern from user presence\n'
    '- On save: publish `record.updated` to the record group with `{ entityType, entityId, '
    'updatedBy, updatedFields[], timestamp }`\n'
    '- Frontend detects if local form version != server version → show stale data warning\n'
    '- Consider optimistic concurrency: include `rowVersion` / `ETag` in save requests\n'
    '- Heartbeat every 15s to keep presence alive; auto-leave on disconnect'
)

def main():
    print('Moving "Record-level presence indicators" to [NOW] tier...\n')

    # Step 1: Update the task — move parent to NOW epic + update description
    payload = {
        'parent': NOW_EPIC_ID,
        'description': UPDATED_DESC,
    }
    r = requests.put(
        f'https://api.clickup.com/api/v2/task/{RECORD_PRESENCE_ID}',
        headers=HEADERS,
        json=payload,
        timeout=20
    )

    if r.status_code == 200:
        task = r.json()
        parent_id = task.get('parent', 'none')
        print(f'✅ Moved to [NOW] Real-Time SignalR Quick Wins (parent: {parent_id})')
        print(f'✅ Updated description with concurrent editing notification requirements')
    else:
        print(f'❌ Failed: {r.status_code} — {r.text[:300]}')
        return

    # Step 2: Verify
    time.sleep(1)
    r2 = requests.get(
        f'https://api.clickup.com/api/v2/task/{RECORD_PRESENCE_ID}',
        headers=HEADERS,
        timeout=20
    )
    if r2.status_code == 200:
        task = r2.json()
        parent = task.get('parent', None)
        print(f'\nVerification:')
        print(f'  Task: {task["name"]}')
        print(f'  Parent: {parent}')
        print(f'  Status: {task["status"]["status"]}')
        if parent == NOW_EPIC_ID:
            print(f'  ✅ Confirmed under [NOW] Real-Time SignalR Quick Wins')
        else:
            print(f'  ⚠️  Parent mismatch — expected {NOW_EPIC_ID}, got {parent}')

    # Step 3: Count stories under NOW epic
    time.sleep(0.5)
    tasks_all = []
    page = 0
    while True:
        r3 = requests.get(
            f'https://api.clickup.com/api/v2/list/{LIST_ID}/task',
            headers=HEADERS,
            params={'page': page, 'subtasks': 'true', 'include_closed': 'true'}
        )
        data = r3.json()
        batch = data.get('tasks', [])
        tasks_all.extend(batch)
        if not batch or data.get('last_page', True):
            break
        page += 1
        time.sleep(0.3)

    now_stories = [t for t in tasks_all if t.get('parent') == NOW_EPIC_ID]
    next_rt = [t for t in tasks_all if not t.get('parent') and 'Real-Time Entity Sync' in t.get('name', '')]
    next_stories = []
    if next_rt:
        next_stories = [t for t in tasks_all if t.get('parent') == next_rt[0]['id']]

    print(f'\n[NOW] Real-Time SignalR Quick Wins — {len(now_stories)} stories:')
    for s in now_stories:
        print(f'  - {s["name"]}')

    if next_rt:
        print(f'\n[NEXT] Real-Time Entity Sync & Collaboration — {len(next_stories)} stories:')
        for s in next_stories:
            print(f'  - {s["name"]}')

if __name__ == '__main__':
    main()
