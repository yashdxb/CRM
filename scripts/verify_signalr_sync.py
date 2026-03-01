#!/usr/bin/env python3
"""Verify SignalR stories sync was applied correctly."""

import requests
import time

TOKEN = 'pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY'
LIST_ID = '901710720381'
HEADERS = {'Authorization': TOKEN}

def fetch_all_tasks():
    tasks = []
    page = 0
    while True:
        r = requests.get(
            f'https://api.clickup.com/api/v2/list/{LIST_ID}/task',
            headers=HEADERS,
            params={'page': page, 'subtasks': 'true', 'include_closed': 'true'}
        )
        data = r.json()
        batch = data.get('tasks', [])
        tasks.extend(batch)
        if not batch or data.get('last_page', True):
            break
        page += 1
        time.sleep(0.3)
    return tasks

def main():
    tasks = fetch_all_tasks()
    epics = [t for t in tasks if not t.get('parent')]
    stories = [t for t in tasks if t.get('parent')]
    done = [t for t in tasks if t['status']['type'] == 'closed']
    open_tasks = [t for t in tasks if t['status']['type'] != 'closed']

    print(f'Total tasks: {len(tasks)} ({len(epics)} epics + {len(stories)} stories)')
    print(f'Done: {len(done)} | Open: {len(open_tasks)}')

    # Verify SignalR epics and stories
    keywords = ['signalr', 'real-time', 'realtime', 'live', 'streaming', 'presence']
    signalr = [t for t in tasks if any(kw in t['name'].lower() for kw in keywords)]

    print(f'\n═══ SignalR / Real-Time tasks ({len(signalr)}) ═══')
    for t in signalr:
        parent = t.get('parent')
        parent_name = ''
        if parent:
            p = next((x for x in tasks if x['id'] == parent), None)
            parent_name = f' → under: {p["name"]}' if p else ''
        status = t['status']['status']
        print(f'  [{status}] {t["name"]}{parent_name}')

    # Check no duplicate kanban stories
    kanban = [t for t in tasks if 'kanban' in t['name'].lower()]
    print(f'\n═══ Kanban stories (should be 1): {len(kanban)} ═══')
    for t in kanban:
        print(f'  [{t["status"]["status"]}] {t["name"]} (id: {t["id"]})')

    # Show the new NEXT epic
    next_epics = [t for t in epics if '[NEXT]' in t['name'] and 'Real-Time' in t['name']]
    print(f'\n═══ New [NEXT] Real-Time epic: {len(next_epics)} ═══')
    for e in next_epics:
        children = [t for t in tasks if t.get('parent') == e['id']]
        print(f'  {e["name"]} ({len(children)} stories)')
        for c in children:
            print(f'    - {c["name"]}')

    # Final verdict
    checks = [
        ('Duplicate kanban removed', len(kanban) == 1),
        ('NOW epic has 5 stories', len([t for t in stories if t.get('parent') == '86e0422m0']) == 5),
        ('NEXT Real-Time epic exists', len(next_epics) == 1),
        ('NEXT epic has 4 stories', len([t for t in stories if next_epics and t.get('parent') == next_epics[0]['id']]) == 4 if next_epics else False),
        ('LATER Collab has review chat', any('review thread' in t['name'].lower() for t in stories)),
    ]

    print('\n═══ VERIFICATION ═══')
    all_pass = True
    for label, passed in checks:
        icon = '✅' if passed else '❌'
        print(f'  {icon} {label}')
        if not passed:
            all_pass = False

    if all_pass:
        print(f'\n🎉 VERIFICATION PASSED — {len(epics)} epics, {len(stories)} stories, {len(tasks)} total')
    else:
        print('\n⚠️  SOME CHECKS FAILED — review above')

if __name__ == '__main__':
    main()
