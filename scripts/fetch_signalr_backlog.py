#!/usr/bin/env python3
"""Fetch current ClickUp CRM Backlog and identify SignalR/real-time related stories."""

import requests
import json
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
    print(f'Total tasks: {len(tasks)}')

    # Find SignalR/real-time related tasks
    keywords = ['signalr', 'real-time', 'realtime', 'real time', 'live', 'streaming', 'presence', 'websocket']
    signalr_tasks = [t for t in tasks if any(kw in t['name'].lower() for kw in keywords)]

    print(f'\nSignalR/Real-time related tasks ({len(signalr_tasks)}):')
    for t in signalr_tasks:
        parent = t.get('parent', None)
        parent_name = ''
        if parent:
            parent_task = next((x for x in tasks if x['id'] == parent), None)
            parent_name = f' (under: {parent_task["name"]})' if parent_task else ''
        status = t['status']['status']
        print(f'  [{status}] {t["name"]}{parent_name} -- id: {t["id"]}')

    # Show all epics
    epics = [t for t in tasks if not t.get('parent')]
    print(f'\nAll epics ({len(epics)}):')
    for e in epics:
        children = [t for t in tasks if t.get('parent') == e['id']]
        status = e['status']['status']
        print(f'  [{status}] {e["name"]} -- id: {e["id"]} ({len(children)} stories)')

    # Get statuses
    r = requests.get(f'https://api.clickup.com/api/v2/list/{LIST_ID}', headers=HEADERS)
    list_data = r.json()
    statuses = list_data.get('statuses', [])
    print(f'\nAvailable statuses:')
    for s in statuses:
        print(f'  {s["status"]} (type: {s["type"]})')

    # Save full task data for reference
    with open('scratch/current_backlog_signalr.json', 'w') as f:
        json.dump(tasks, f, indent=2)
    print(f'\nFull task data saved to scratch/current_backlog_signalr.json')

if __name__ == '__main__':
    main()
