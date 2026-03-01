#!/usr/bin/env python3
"""
Sync CRM Backlog with Competitive Audit Report v2.0 gaps.

Changes:
1. ADD story "Inbound email sync and auto-linking" under existing [NOW] Email Integration epic
2. ADD new [NOW] epic "SSO & Enterprise Authentication" + 2 stories
3. ADD new [NOW] epic "Real-Time SignalR Quick Wins" + 2 stories
4. ADD new [NEXT] epic "API Enhancement Layer" + 2 stories
5. ADD new [LATER] epic "Social Media Integration" + 2 stories
6. MOVE "Lead nurturing sequences" from [LATER] Marketing Automation Suite → [NEXT] Email Marketing Campaigns
"""
import json
import time
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
headers = {"Authorization": API_TOKEN, "Content-Type": "application/json"}


def api_call(method, url, data=None, retries=3):
    """Make an API call with retry logic."""
    for attempt in range(retries):
        try:
            payload = json.dumps(data).encode("utf-8") if data else None
            req = urllib.request.Request(url, data=payload, headers=headers, method=method)
            with urllib.request.urlopen(req) as resp:
                body = resp.read()
                return json.loads(body) if body else {}
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt + 1}: {e}")
                time.sleep(2)
            else:
                raise
    return {}


def create_task(name, description="", priority=None, tags=None, parent=None):
    """Create a task in the CRM Backlog list."""
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task"
    payload = {
        "name": name,
        "description": description,
        "status": "backlog",
    }
    if priority:
        payload["priority"] = priority
    if tags:
        payload["tags"] = tags
    if parent:
        payload["parent"] = parent

    result = api_call("POST", url, payload)
    time.sleep(0.5)  # Rate limit
    return result


# ──────────────────────────────────────────────
# Step 0: Fetch all tasks to find existing epic IDs
# ──────────────────────────────────────────────
print("Fetching all tasks...")
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

print(f"Found {len(all_tasks)} existing tasks")

# Find key epic IDs
email_epic = next((t for t in all_tasks if t["name"] == "[NOW] Email Integration" and not t.get("parent")), None)
email_marketing_epic = next((t for t in all_tasks if t["name"] == "[NEXT] Email Marketing Campaigns" and not t.get("parent")), None)
marketing_later_epic = next((t for t in all_tasks if t["name"] == "[LATER] Marketing Automation Suite" and not t.get("parent")), None)

# Find the nurture story to move
nurture_story = None
if marketing_later_epic:
    nurture_story = next(
        (t for t in all_tasks if t.get("parent") == marketing_later_epic["id"] and "nurtur" in t["name"].lower()),
        None,
    )

print(f"  Email Integration epic: {email_epic['id'] if email_epic else 'NOT FOUND'}")
print(f"  Email Marketing epic: {email_marketing_epic['id'] if email_marketing_epic else 'NOT FOUND'}")
print(f"  Marketing Later epic: {marketing_later_epic['id'] if marketing_later_epic else 'NOT FOUND'}")
print(f"  Nurture story to move: {nurture_story['name'] if nurture_story else 'NOT FOUND'}")
print()

# ──────────────────────────────────────────────
# Step 1: Add "Inbound email sync" story under [NOW] Email Integration
# ──────────────────────────────────────────────
print("1. Adding 'Inbound email sync' story under [NOW] Email Integration...")
if email_epic:
    result = create_task(
        name="Inbound email sync and auto-linking to records",
        description=(
            "As a sales rep, I want inbound emails automatically synced and linked to CRM records "
            "so I can see replies and full conversation threads without leaving the CRM.\n\n"
            "Acceptance Criteria:\n"
            "- OAuth2 email provider connection (MS Graph / Gmail)\n"
            "- Inbound emails auto-linked to contacts, leads, and opportunities\n"
            "- Email thread timeline view on record detail pages\n"
            "- Bidirectional sync (sent + received visible in CRM)\n\n"
            "Source: Competitive Audit v2.0 — Section 8 (Feature Gap), N1, Section 15"
        ),
        priority=2,  # High
        tags=["future", "now"],
        parent=email_epic["id"],
    )
    print(f"  ✅ Created: {result.get('name', 'ERROR')}")
else:
    print("  ❌ Email Integration epic not found!")

# ──────────────────────────────────────────────
# Step 2: Add [NOW] SSO & Enterprise Authentication epic + 2 stories
# ──────────────────────────────────────────────
print("\n2. Creating [NOW] SSO & Enterprise Authentication epic...")
sso_epic = create_task(
    name="[NOW] SSO & Enterprise Authentication",
    description=(
        "Enterprise deal-blocker: IT procurement teams require SSO/SAML before approving CRM purchase. "
        "No SSO blocks enterprise sales.\n\n"
        "Source: Competitive Audit v2.0 — Section 7 (Stack Gap), Section 15 (Technical Quick Win)"
    ),
    priority=2,  # High
    tags=["future", "now"],
)
print(f"  ✅ Epic created: {sso_epic.get('name', 'ERROR')}")

for story in [
    {
        "name": "SAML/SSO identity provider integration",
        "desc": (
            "As an IT admin, I want to configure SAML SSO so employees can log in with their "
            "corporate identity provider (Azure AD, Okta, OneLogin).\n\n"
            "Acceptance Criteria:\n"
            "- SAML 2.0 SP-initiated login flow\n"
            "- Azure AD B2C or IdentityServer integration\n"
            "- Auto-provisioning of user accounts from IdP claims\n"
            "- Fallback to email/password when SSO is not configured"
        ),
    },
    {
        "name": "OAuth2 external identity provider support",
        "desc": (
            "As an IT admin, I want to allow Google Workspace and Microsoft 365 login "
            "so users don't need a separate CRM password.\n\n"
            "Acceptance Criteria:\n"
            "- OAuth2 / OpenID Connect provider configuration UI\n"
            "- Google and Microsoft social login buttons on login page\n"
            "- Account linking for existing users\n"
            "- Tenant-level SSO enforcement toggle"
        ),
    },
]:
    result = create_task(
        name=story["name"],
        description=story["desc"],
        priority=2,
        tags=["future", "now"],
        parent=sso_epic["id"],
    )
    print(f"  ✅ Story: {result.get('name', 'ERROR')}")

# ──────────────────────────────────────────────
# Step 3: Add [NOW] Real-Time SignalR Quick Wins epic + 2 stories
# ──────────────────────────────────────────────
print("\n3. Creating [NOW] Real-Time SignalR Quick Wins epic...")
signalr_epic = create_task(
    name="[NOW] Real-Time SignalR Quick Wins",
    description=(
        "Infrastructure already built (2 hubs, publisher, 4 worker broadcasts). "
        "These quick wins leverage existing SignalR to boost real-time score from 5/10 to 7/10.\n\n"
        "Source: Competitive Audit v2.0 — Section 13 (REMAINING), Section 15 (Technical Quick Wins)"
    ),
    priority=2,  # High
    tags=["future", "now"],
)
print(f"  ✅ Epic created: {signalr_epic.get('name', 'ERROR')}")

for story in [
    {
        "name": "AI assistant token streaming via SignalR",
        "desc": (
            "As a CRM user, I want AI assistant responses to stream token-by-token "
            "so I see results immediately instead of waiting for the full response.\n\n"
            "Acceptance Criteria:\n"
            "- Switch AssistantChatService to IAsyncEnumerable\n"
            "- Stream tokens via SignalR to the chat UI\n"
            "- Typing indicator and progressive text rendering\n"
            "- No additional infrastructure required (uses existing CrmEventsHub)"
        ),
    },
    {
        "name": "Dashboard live metrics auto-refresh via SignalR",
        "desc": (
            "As a manager, I want dashboard widgets to update automatically when data changes "
            "so I always see current metrics without manual refresh.\n\n"
            "Acceptance Criteria:\n"
            "- Entity change detection broadcasts widget deltas via SignalR\n"
            "- Dashboard widgets auto-refresh on relevant entity changes\n"
            "- No full page reload — incremental widget updates only\n"
            "- Uses existing SignalRCrmRealtimePublisher infrastructure"
        ),
    },
]:
    result = create_task(
        name=story["name"],
        description=story["desc"],
        priority=2,
        tags=["future", "now"],
        parent=signalr_epic["id"],
    )
    print(f"  ✅ Story: {result.get('name', 'ERROR')}")

# ──────────────────────────────────────────────
# Step 4: Add [NEXT] API Enhancement Layer epic + 2 stories
# ──────────────────────────────────────────────
print("\n4. Creating [NEXT] API Enhancement Layer epic...")
api_epic = create_task(
    name="[NEXT] API Enhancement Layer",
    description=(
        "REST-only limits query flexibility for integrators. Add OData or GraphQL "
        "to match Salesforce/Dynamics/HubSpot API capabilities.\n\n"
        "Source: Competitive Audit v2.0 — Section 7 (Stack Gap), Section 15 (Technical Quick Win)"
    ),
    priority=3,  # Normal
    tags=["future", "next"],
)
print(f"  ✅ Epic created: {api_epic.get('name', 'ERROR')}")

for story in [
    {
        "name": "OData endpoints for key entities",
        "desc": (
            "As an integrator, I want OData query support on key CRM entities "
            "so I can use $filter, $select, $expand for flexible data retrieval.\n\n"
            "Acceptance Criteria:\n"
            "- OData v4 endpoints on Customers, Contacts, Leads, Opportunities\n"
            "- Support $filter, $select, $orderby, $top, $skip\n"
            "- $expand for navigation properties (e.g., Customer → Contacts)\n"
            "- Read-only initially, write support in future iteration"
        ),
    },
    {
        "name": "GraphQL read-only query layer",
        "desc": (
            "As a frontend developer, I want a GraphQL endpoint so I can fetch "
            "exactly the fields I need in a single request.\n\n"
            "Acceptance Criteria:\n"
            "- GraphQL schema for core CRM entities\n"
            "- Nested queries (e.g., Opportunity → Customer → Contacts)\n"
            "- Pagination support (cursor-based)\n"
            "- Authorization respects existing RBAC permissions"
        ),
    },
]:
    result = create_task(
        name=story["name"],
        description=story["desc"],
        priority=3,
        tags=["future", "next"],
        parent=api_epic["id"],
    )
    print(f"  ✅ Story: {result.get('name', 'ERROR')}")

# ──────────────────────────────────────────────
# Step 5: Add [LATER] Social Media Integration epic + 2 stories
# ──────────────────────────────────────────────
print("\n5. Creating [LATER] Social Media Integration epic...")
social_epic = create_task(
    name="[LATER] Social Media Integration",
    description=(
        "LinkedIn/Twitter profile enrichment and social listening. "
        "Extends contact intelligence with social data.\n\n"
        "Source: Competitive Audit v2.0 — Section 8 (Feature Gap L7), Section 9 (L7)"
    ),
    priority=4,  # Low
    tags=["future", "later"],
)
print(f"  ✅ Epic created: {social_epic.get('name', 'ERROR')}")

for story in [
    {
        "name": "Social profile enrichment (LinkedIn/Twitter)",
        "desc": (
            "As a sales rep, I want to see LinkedIn and Twitter profile data on contact records "
            "so I can personalize outreach with social context.\n\n"
            "Acceptance Criteria:\n"
            "- LinkedIn profile URL auto-lookup from contact email\n"
            "- Display job title, company, mutual connections from LinkedIn\n"
            "- Twitter handle lookup and recent tweet summary\n"
            "- Social data refresh on demand or scheduled"
        ),
    },
    {
        "name": "Social listening and tracking",
        "desc": (
            "As a marketing manager, I want to track social mentions and engagement "
            "so I can identify leads from social activity.\n\n"
            "Acceptance Criteria:\n"
            "- Monitor brand mentions on Twitter/LinkedIn\n"
            "- Auto-create leads from high-engagement social interactions\n"
            "- Social engagement score on contact/lead records\n"
            "- Social activity timeline on record detail pages"
        ),
    },
]:
    result = create_task(
        name=story["name"],
        description=story["desc"],
        priority=4,
        tags=["future", "later"],
        parent=social_epic["id"],
    )
    print(f"  ✅ Story: {result.get('name', 'ERROR')}")

# ──────────────────────────────────────────────
# Step 6: Move "Lead nurturing sequences" from LATER → NEXT
# ──────────────────────────────────────────────
print("\n6. Moving 'Lead nurturing sequences' from LATER → NEXT...")
if nurture_story and email_marketing_epic:
    # Update the story's parent to the NEXT Email Marketing Campaigns epic
    url = f"https://api.clickup.com/api/v2/task/{nurture_story['id']}"
    update_data = {"parent": email_marketing_epic["id"]}
    result = api_call("PUT", url, update_data)
    print(f"  ✅ Moved '{nurture_story['name']}' to [NEXT] Email Marketing Campaigns")
elif not nurture_story:
    print("  ⚠️  Nurture story not found — skipping move")
elif not email_marketing_epic:
    print("  ⚠️  Email Marketing epic not found — skipping move")

# ──────────────────────────────────────────────
# Summary
# ──────────────────────────────────────────────
print("\n" + "=" * 60)
print("SYNC COMPLETE")
print("=" * 60)
print("Added:")
print("  1 story under [NOW] Email Integration (inbound sync)")
print("  [NOW] SSO & Enterprise Authentication (1 epic + 2 stories)")
print("  [NOW] Real-Time SignalR Quick Wins (1 epic + 2 stories)")
print("  [NEXT] API Enhancement Layer (1 epic + 2 stories)")
print("  [LATER] Social Media Integration (1 epic + 2 stories)")
print("Moved:")
print("  'Lead nurturing sequences' from [LATER] → [NEXT] Email Marketing Campaigns")
print(f"\nNew total: ~{len(all_tasks) + 10} tasks")
