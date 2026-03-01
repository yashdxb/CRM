#!/usr/bin/env python3
"""
Sync ClickUp CRM Backlog with comprehensive SignalR integration catalog.
- Adds missing stories under existing [NOW] Real-Time SignalR Quick Wins epic
- Creates new [NEXT] Real-Time Entity Sync & Collaboration epic with stories
- Adds review thread live chat under [LATER] Compliance & Collaboration
- Deletes duplicate pipeline kanban story
- Excludes all supply chain related work
"""

import requests
import json
import time
import sys

TOKEN = 'pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY'
LIST_ID = '901710720381'
HEADERS = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
}

# ── Known IDs from backlog fetch ──
NOW_SIGNALR_EPIC_ID = '86e0422m0'        # [NOW] Real-Time SignalR Quick Wins
LATER_COLLAB_EPIC_ID = '86e041xa9'       # [LATER] Compliance & Collaboration
DUPLICATE_KANBAN_ID = '86e0424bd'         # Duplicate pipeline kanban story to delete

# ── Helpers ──────────────────────────────────────────────────────────────────

def api(method, url, payload=None, retries=3):
    for attempt in range(retries):
        try:
            r = requests.request(method, url, headers=HEADERS, json=payload, timeout=20)
            if r.status_code == 429:
                wait = int(r.headers.get('Retry-After', 3))
                print(f'  Rate limited, waiting {wait}s...')
                time.sleep(wait)
                continue
            if r.status_code >= 500:
                print(f'  Server error {r.status_code}, retry {attempt+1}...')
                time.sleep(2)
                continue
            return r
        except Exception as e:
            print(f'  Error: {e}, retry {attempt+1}...')
            time.sleep(2)
    return None

def create_task(name, parent_id=None, description='', status='backlog'):
    """Create a task (story) in the CRM Backlog list."""
    payload = {
        'name': name,
        'description': description,
        'status': status,
    }
    if parent_id:
        payload['parent'] = parent_id

    r = api('POST', f'https://api.clickup.com/api/v2/list/{LIST_ID}/task', payload)
    if r and r.status_code in (200, 201):
        task = r.json()
        print(f'  ✅ Created: {name} (id: {task["id"]})')
        return task
    else:
        status_code = r.status_code if r else 'no response'
        text = r.text[:200] if r else 'timeout'
        print(f'  ❌ FAILED: {name} — {status_code}: {text}')
        return None

def delete_task(task_id, name):
    """Delete a task."""
    r = api('DELETE', f'https://api.clickup.com/api/v2/task/{task_id}')
    if r and r.status_code in (200, 204):
        print(f'  🗑️  Deleted duplicate: {name} (id: {task_id})')
        return True
    else:
        status_code = r.status_code if r else 'no response'
        print(f'  ❌ FAILED to delete: {name} — {status_code}')
        return False


# ═══════════════════════════════════════════════════════════════════════════════
# STEP 1: Delete duplicate pipeline kanban story
# ═══════════════════════════════════════════════════════════════════════════════

def step1_delete_duplicate():
    print('\n══ STEP 1: Delete duplicate pipeline kanban story ══')
    delete_task(DUPLICATE_KANBAN_ID, 'Pipeline kanban live updates via SignalR (duplicate)')
    time.sleep(0.5)


# ═══════════════════════════════════════════════════════════════════════════════
# STEP 2: Add new stories under [NOW] Real-Time SignalR Quick Wins
# ═══════════════════════════════════════════════════════════════════════════════

NOW_STORIES = [
    {
        'name': 'Import job real-time progress via SignalR',
        'description': (
            '## User Story\n'
            'As a CRM user importing leads, contacts, or customers, I want to see a live '
            'progress bar instead of polling so I know exactly how far along my import is.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] Import services (CustomerImportService, ContactImportService, LeadImportService) '
            'publish `import.progress` events via ICrmRealtimePublisher during row processing\n'
            '- [ ] Events include: `{ importJobId, entityType, totalRows, imported, skipped, percentComplete }`\n'
            '- [ ] `import.completed` event fires when import finishes with final stats\n'
            '- [ ] `import.failed` event fires on unrecoverable error\n'
            '- [ ] Events are scoped to the user who triggered the import (user-channel)\n'
            '- [ ] Frontend replaces polling of GET /api/import-jobs/{id} with SignalR listener\n'
            '- [ ] Progress bar updates in real-time without page refresh\n\n'
            '## Technical Notes\n'
            '- Use existing `PublishUserEventAsync` on the user-scoped group\n'
            '- ImportJobsController currently violates Clean Architecture (injects DbContext directly) — '
            'fix when implementing\n'
            '- Batch progress events every 10-50 rows to avoid flooding the channel'
        ),
    },
    {
        'name': 'Entity CRUD broadcast for list auto-refresh',
        'description': (
            '## User Story\n'
            'As a sales team member, when a colleague creates, updates, or deletes a lead, '
            'customer, contact, or activity, I want my list view to auto-refresh so I always '
            'see the latest data without manually reloading.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] LeadService publishes `lead.created/updated/deleted/converted/status.changed/owner.changed` '
            'events via ICrmRealtimePublisher\n'
            '- [ ] CustomerService publishes `customer.created/updated/deleted/lifecycle.changed/owner.changed` events\n'
            '- [ ] ContactService publishes `contact.created/updated/deleted/lifecycle.changed/owner.changed` events\n'
            '- [ ] ActivityService publishes `activity.created/updated/deleted` events\n'
            '- [ ] All events are tenant-scoped so all workspace users receive them\n'
            '- [ ] Frontend list pages (leads.page, customers.page, contacts.page, activities.page) '
            'subscribe to relevant events and auto-refresh or apply deltas\n'
            '- [ ] Bulk operations (bulk-assign-owner, bulk-update-status/lifecycle) publish a single '
            'summary event instead of one per record\n\n'
            '## Technical Notes\n'
            '- Use existing `PublishTenantEventAsync` on the tenant-scoped group\n'
            '- Consider debouncing on the frontend (e.g., 500ms) to batch rapid updates\n'
            '- Include minimal payload (entity id, action, changed-by user) — '
            'frontend re-fetches full data on event'
        ),
    },
]


def step2_add_now_stories():
    print('\n══ STEP 2: Add stories to [NOW] Real-Time SignalR Quick Wins ══')
    for story in NOW_STORIES:
        create_task(story['name'], parent_id=NOW_SIGNALR_EPIC_ID, description=story['description'])
        time.sleep(0.5)


# ═══════════════════════════════════════════════════════════════════════════════
# STEP 3: Create [NEXT] Real-Time Entity Sync & Collaboration epic + stories
# ═══════════════════════════════════════════════════════════════════════════════

NEXT_EPIC_NAME = '[NEXT] Real-Time Entity Sync & Collaboration'
NEXT_EPIC_DESC = (
    '## Epic Description\n'
    'Extend SignalR real-time coverage beyond quick wins to full entity lifecycle events, '
    'quote workflow notifications, campaign/activity live updates, and record-level '
    'presence indicators. Brings real-time score from ~30% to ~70%.\n\n'
    '## Scope\n'
    '- Opportunity full lifecycle events (beyond stage change)\n'
    '- Quote workflow live notifications\n'
    '- Campaign & activity CRUD live events\n'
    '- Record-level presence ("who is viewing this record")\n\n'
    '## Dependencies\n'
    '- [NOW] Real-Time SignalR Quick Wins must be completed first\n'
    '- Existing CrmEventsHub and ICrmRealtimePublisher infrastructure'
)

NEXT_STORIES = [
    {
        'name': 'Opportunity full lifecycle SignalR events',
        'description': (
            '## User Story\n'
            'As a sales manager, I want to receive real-time notifications when opportunities '
            'are created, updated, deleted, reassigned, expanded, or reviewed so my pipeline '
            'view stays current.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] OpportunityService publishes events for: `opportunity.created`, `opportunity.updated`, '
            '`opportunity.deleted`, `opportunity.owner.changed`, `opportunity.team.changed`, '
            '`opportunity.expanded`\n'
            '- [ ] Review flow publishes: `opportunity.review.completed`, `opportunity.review.acknowledged`\n'
            '- [ ] Coaching publishes: `opportunity.coaching.completed` (user-scoped)\n'
            '- [ ] Opportunities list page and pipeline kanban react to all events\n'
            '- [ ] Opportunity detail/form page shows live updates when another user edits\n\n'
            '## Technical Notes\n'
            '- Stage change already publishes `opportunity.stage.changed` — extend pattern to all mutations\n'
            '- Owner changes should target both tenant group and the new owner\'s user group'
        ),
    },
    {
        'name': 'Quote workflow live notifications via SignalR',
        'description': (
            '## User Story\n'
            'As a deal owner, I want to see real-time updates when a quote is created, updated, '
            'submitted for approval, or when a proposal is generated and sent, so I can track '
            'the CPQ workflow without refreshing.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] OpportunityQuoteService publishes: `quote.created`, `quote.updated`, '
            '`quote.approval.submitted`, `quote.proposal.generated`, `quote.proposal.sent`\n'
            '- [ ] Events are tenant-scoped for team visibility\n'
            '- [ ] Proposal generation/sent events also target the deal owner via user-scoped channel\n'
            '- [ ] Opportunity form page quotes tab auto-refreshes on quote events\n'
            '- [ ] Decision inbox reacts to `quote.approval.submitted` for approvers\n\n'
            '## Technical Notes\n'
            '- Integrate with existing decision workflow — `quote.approval.submitted` should also '
            'trigger `decision.created` if not already linked\n'
            '- Include opportunityId in all payloads for frontend filtering'
        ),
    },
    {
        'name': 'Campaign and activity CRUD live events',
        'description': (
            '## User Story\n'
            'As a marketing manager, I want campaign list and detail pages to auto-refresh when '
            'campaigns are created, updated, archived, or when members are added/removed. '
            'As a sales rep, I want my activity list and calendar to update when tasks are '
            'created or completed by teammates.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] MarketingService publishes: `campaign.created`, `campaign.updated`, '
            '`campaign.archived`, `campaign.member.added`, `campaign.member.removed`\n'
            '- [ ] ActivityService publishes: `activity.created`, `activity.updated`, `activity.deleted`\n'
            '- [ ] Campaign list page, campaign detail page, and campaign attribution page react to events\n'
            '- [ ] Activity list page and calendar view react to activity events\n'
            '- [ ] All events are tenant-scoped\n\n'
            '## Technical Notes\n'
            '- Campaign member changes may be high-volume for large imports — batch events\n'
            '- Activity events should include the related entity (lead/contact/opportunity) '
            'for frontend context'
        ),
    },
    {
        'name': 'Record-level presence indicators',
        'description': (
            '## User Story\n'
            'As a CRM user, when I open a customer/lead/opportunity/contact record for editing, '
            'I want to see who else is currently viewing or editing the same record so we '
            'avoid conflicting changes.\n\n'
            '## Acceptance Criteria\n'
            '- [ ] New SignalR group pattern: `tenant:{id}:record:{entityType}:{entityId}`\n'
            '- [ ] When user opens a record form, frontend joins the record group\n'
            '- [ ] When user navigates away, frontend leaves the record group\n'
            '- [ ] Other users on the same record see avatars/names of concurrent viewers\n'
            '- [ ] Presence indicator disappears after 30s timeout if no heartbeat\n'
            '- [ ] Works on: customer-form, lead-form, contact-form, opportunity-form pages\n\n'
            '## Technical Notes\n'
            '- Extend PresenceHub with `JoinRecord(entityType, entityId)` and `LeaveRecord` methods\n'
            '- Reuse existing `IPresenceTracker` pattern from user presence\n'
            '- Max viewers shown: 5 avatars + "+N more" overflow\n'
            '- Consider warning on save if concurrent editors detected'
        ),
    },
]


def step3_create_next_epic():
    print('\n══ STEP 3: Create [NEXT] Real-Time Entity Sync & Collaboration epic ══')
    epic = create_task(NEXT_EPIC_NAME, description=NEXT_EPIC_DESC)
    if not epic:
        print('❌ Failed to create NEXT epic, skipping stories')
        return
    epic_id = epic['id']
    time.sleep(0.5)

    for story in NEXT_STORIES:
        create_task(story['name'], parent_id=epic_id, description=story['description'])
        time.sleep(0.5)


# ═══════════════════════════════════════════════════════════════════════════════
# STEP 4: Add review thread live chat under [LATER] Compliance & Collaboration
# ═══════════════════════════════════════════════════════════════════════════════

LATER_STORY = {
    'name': 'Review thread live chat via SignalR',
    'description': (
        '## User Story\n'
        'As a deal reviewer or approver, I want to see real-time chat messages in '
        'opportunity review threads so discussions happen instantly without refreshing.\n\n'
        '## Acceptance Criteria\n'
        '- [ ] Review thread comments publish `review.comment.added` via SignalR\n'
        '- [ ] Events target the record group (`tenant:{id}:record:opportunity:{oppId}`)\n'
        '- [ ] New comments appear instantly for all participants viewing the thread\n'
        '- [ ] Typing indicators show when another user is composing a message\n'
        '- [ ] Unread comment count badge updates in real-time on the opportunity list\n\n'
        '## Technical Notes\n'
        '- Builds on record-level presence from [NEXT] tier\n'
        '- Consider using a dedicated SignalR hub method for chat vs. generic crmEvent\n'
        '- Typing indicator: debounce 2s, auto-clear after 5s'
    ),
}


def step4_add_later_story():
    print('\n══ STEP 4: Add review thread live chat under [LATER] Compliance & Collaboration ══')
    create_task(LATER_STORY['name'], parent_id=LATER_COLLAB_EPIC_ID, description=LATER_STORY['description'])
    time.sleep(0.5)


# ═══════════════════════════════════════════════════════════════════════════════
# STEP 5: Update description of existing [NOW] Real-Time SignalR Quick Wins epic
# ═══════════════════════════════════════════════════════════════════════════════

UPDATED_NOW_EPIC_DESC = (
    '## Epic Description\n'
    'Deliver the highest-impact SignalR real-time features that leverage existing '
    'infrastructure (CrmEventsHub, ICrmRealtimePublisher, 2 hubs, 6 producers). '
    'Brings real-time coverage from ~5.5% to ~30%.\n\n'
    '## Current Infrastructure\n'
    '- 2 SignalR hubs: PresenceHub + CrmEventsHub\n'
    '- SignalRCrmRealtimePublisher with tenant & user scoped publishing\n'
    '- 6 producers already broadcasting 9 event types\n'
    '- 3 frontend consumers (CrmEventsService, PresenceService, NavigationService)\n\n'
    '## Stories\n'
    '1. AI assistant token streaming via SignalR\n'
    '2. Dashboard live metrics auto-refresh via SignalR\n'
    '3. Pipeline kanban live updates via SignalR\n'
    '4. Import job real-time progress via SignalR\n'
    '5. Entity CRUD broadcast for list auto-refresh\n\n'
    '## Dependencies\n'
    '- Real-Time & Notifications epic (DONE)\n'
    '- Platform Infrastructure (DONE)'
)


def step5_update_now_epic():
    print('\n══ STEP 5: Update [NOW] Real-Time SignalR Quick Wins epic description ══')
    payload = {'description': UPDATED_NOW_EPIC_DESC}
    r = api('PUT', f'https://api.clickup.com/api/v2/task/{NOW_SIGNALR_EPIC_ID}', payload)
    if r and r.status_code == 200:
        print('  ✅ Updated epic description')
    else:
        status_code = r.status_code if r else 'no response'
        print(f'  ❌ FAILED to update epic — {status_code}')


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    print('╔═══════════════════════════════════════════════════════════════╗')
    print('║  SignalR Integration Stories — ClickUp Sync                  ║')
    print('║  Excluding supply chain work                                ║')
    print('╚═══════════════════════════════════════════════════════════════╝')

    step1_delete_duplicate()
    step2_add_now_stories()
    step3_create_next_epic()
    step4_add_later_story()
    step5_update_now_epic()

    print('\n══════════════════════════════════════════════════════════════')
    print('  SUMMARY')
    print('══════════════════════════════════════════════════════════════')
    print('  🗑️  Deleted: 1 duplicate story')
    print('  ✅ Added to [NOW] Real-Time SignalR Quick Wins: 2 new stories')
    print('  ✅ Created [NEXT] Real-Time Entity Sync & Collaboration: 1 epic + 4 stories')
    print('  ✅ Added to [LATER] Compliance & Collaboration: 1 new story')
    print('  ✅ Updated [NOW] epic description with full story list')
    print('  📊 Net change: +1 epic, +7 stories, -1 duplicate = +7 net tasks')
    print('══════════════════════════════════════════════════════════════')


if __name__ == '__main__':
    main()
