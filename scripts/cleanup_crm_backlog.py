#!/usr/bin/env python3
"""
CRM Backlog Cleanup & Rewrite Script
=====================================

This script:
1. Fetches all existing tasks from the CRM Backlog list
2. Closes duplicates that overlap with the Prioritization Backlog
3. Rewrites remaining backlog stories with proper detail based on codebase audit
4. Preserves completed/done items (no changes)
5. Preserves read-to-test/review items (no changes)

CODEBASE AUDIT RESULTS (used to drive the rewrite):
=====================================================

FULLY BUILT (frontend + backend + API):
  - Customers: list, create, edit, search, import/export
  - Contacts: list, create, edit, search, import
  - Leads: list, create, edit, convert, scoring, assignment rules, qualification
  - Opportunities: list, create, edit, approvals, onboarding, review checklist, automation rules
  - Activities: list, create, edit, search
  - Dashboard: summary, layout, widgets, packs, epistemic metrics
  - Settings: users, roles, permissions, workspace, approvals, qualification policy/thresholds,
              lead assignment, opportunity automation, security levels, notifications, tenants,
              audit log, dashboard packs, marketing settings
  - Marketing: campaigns (list, detail, form, attribution)
  - AI Assistant: chat service, knowledge grounding (Azure Search), agent tools, lead scoring
  - Decision Inbox: approvals page, history, policies/SLA, shell
  - Auth: login, logout, change password, accept invite, JWT
  - Real-time: SignalR (PresenceHub, CrmEventsHub), notifications
  - Audit: audit events

MOCK-ONLY (frontend uses mock interceptor, no real backend endpoints yet):
  - Customers CRUD uses mock-db.ts for search/get/create/update/delete
  - Activities search uses mock-db.ts
  - Dashboard summary uses mock-db.ts
  - Users/Roles CRUD uses mock-db.ts
  - Workspace settings uses mock-db.ts
  - Opportunities CRUD uses mock-db.ts
  Note: Backend services exist for ALL of these - the mock layer is just for dev mode

NOT BUILT YET:
  - Email integration (bidirectional sync)
  - Report builder / ad-hoc reports
  - Scheduled reports
  - Web-to-lead / embeddable forms
  - Custom fields management UI
  - Quote / proposal generation (CPQ)
  - Product catalog / price book on opportunities
  - Webhooks / outbound event system
  - Territory management
  - Contract management
  - Forecasting engine (target vs actual)
  - Duplicate detection
  - Notes & attachments system
  - Saved views / column customization
  - Inline editing on list views
  - Task/reminder automation from stage changes
  - Basic email marketing (nurture sequences)
  - Visual workflow builder
  - Customer portal
  - Case/support ticketing
  - Plugin/extension framework
  - Advanced analytics/BI
  - Social media integration
  - AI conversation intelligence
  - Mobile native app
  - Multi-language / localization
  - Audit & compliance suite (beyond current audit log)
  - Real-time collaboration (co-editing)
  - SSO / SAML
  - OData / GraphQL
"""

import json
import time
import sys
from typing import Dict, List, Optional, Any
try:
    import requests
except ImportError:
    print("Installing requests...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "-q"])
    import requests

# ─── Configuration ────────────────────────────────────────────────────────────
API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
CRM_BACKLOG_LIST_ID = "901710720381"
PRIO_BACKLOG_LIST_ID = "901711494470"
BASE_URL = "https://api.clickup.com/api/v2"
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# Rate-limit helper
def rate_limited_request(method: str, url: str, **kwargs) -> requests.Response:
    """Make a rate-limited request with retry on 429."""
    for attempt in range(5):
        resp = requests.request(method, url, headers=HEADERS, **kwargs)
        if resp.status_code == 429:
            wait = int(resp.headers.get("Retry-After", 2))
            print(f"  [rate-limited] waiting {wait}s...")
            time.sleep(wait)
            continue
        return resp
    return resp

# ─── Fetch all tasks from a list ──────────────────────────────────────────────
def fetch_all_tasks(list_id: str) -> List[Dict]:
    """Fetch all tasks (including subtasks and closed) from a ClickUp list."""
    all_tasks: List[Dict] = []
    page = 0
    while True:
        resp = rate_limited_request(
            "GET",
            f"{BASE_URL}/list/{list_id}/task",
            params={"page": page, "subtasks": "true", "include_closed": "true"}
        )
        resp.raise_for_status()
        tasks = resp.json().get("tasks", [])
        if not tasks:
            break
        all_tasks.extend(tasks)
        page += 1
        time.sleep(0.3)
    return all_tasks


# ─── Task IDs to CLOSE (duplicates of Prioritization Backlog) ────────────────
# These are the competitive-audit gap items that are 1:1 duplicates of the
# 29 epics we just created in the Prioritization Backlog.
# We close the parent epic AND all its children (campaign subtasks stay — they're completed).

COMPETITIVE_AUDIT_EPIC_ID = "86e02y3vw"  # "Epic | Competitive Audit | Gap Closure..."

# All children of the Competitive Audit epic (these are all direct duplicates of Prioritization Backlog epics)
COMPETITIVE_AUDIT_CHILDREN = [
    "86e02y3w7",  # Email integration → [NOW] Email Bidirectional Sync
    "86e02y3xc",  # Report builder → [NOW] Report Builder & Analytics Engine
    "86e02y3xh",  # Product catalog → [NOW] Product & Price Book Management
    "86e02y3xr",  # Quote/proposal → [NOW] Quote / Proposal Generator (CPQ Lite)
    "86e02y3xv",  # Custom fields → [NOW] Custom Fields UI Builder
    "86e02y3y4",  # Web-to-lead → [NOW] Web-to-Lead Capture Forms
    "86e02y3yr",  # Scheduled reports → [NOW] Scheduled Reports & Dashboard Alerts
    "86e02y3z3",  # Webhooks → [NOW] Webhooks & API Event System
    "86e02y3za",  # Campaign Mgmt → ALREADY BUILT (in progress, subtasks completed)
    "86e02y3zh",  # Contract Mgmt → [NEXT] Contract Lifecycle Management
    "86e02y3zv",  # Territory Mgmt → [NEXT] Territory Management
    "86e02y400",  # Forecasting → [NEXT] Forecasting Engine
    "86e02y407",  # Dedup → [NEXT] Cross-Entity Deduplication Engine
    "86e02y40e",  # Notes/attachments → [NEXT] Notes & Attachments System
    "86e02y40r",  # Email marketing → [NEXT] Marketing Automation – Nurture Sequences
    "86e02y40x",  # Saved views → [NEXT] Saved Views & Column Customization
    "86e02y41a",  # Inline editing → [NEXT] Inline Editing on List Views
    "86e02y41j",  # Task automation → [NEXT] Task & Reminder Automation
    "86e02y41r",  # Full marketing → [LATER] Full Marketing Automation Suite
    "86e02y420",  # Workflow builder → [LATER] Visual Workflow / Process Builder
    "86e02y42d",  # Customer portal → [LATER] Customer Self-Service Portal
    "86e02y42n",  # Case ticketing → [LATER] Case / Support Ticketing Module
    "86e02y42v",  # Plugin framework → [LATER] Plugin / Extension Framework
    "86e02y431",  # Advanced analytics → [LATER] Advanced Analytics & BI Dashboard
    "86e02y436",  # Social media → [LATER] Social Media Integration
    "86e02y43b",  # AI conversation intel → [LATER] AI Conversation Intelligence
    "86e02y43h",  # Mobile → [LATER] Native Mobile App
    "86e02y43v",  # Multi-language → [LATER] Multi-Language & Localization
    "86e02y446",  # Compliance → [LATER] Audit Trail & Compliance Suite
    "86e02y44b",  # Real-time collab → [LATER] Real-Time Collaboration
    "86e02y44n",  # SignalR foundation → ALREADY BUILT (PresenceHub, CrmEventsHub)
    "86e02y457",  # SSO/SAML → duplicate (not in Prio Backlog, but competitive-audit item)
    "86e02y45j",  # OData/GraphQL → duplicate (not in Prio Backlog, but competitive-audit item)
]

# Campaign management subtasks (completed - these are children of 86e02y3za)
# Keep these as completed - they document real work done
CAMPAIGN_SUBTASK_IDS = [
    "86e03wcgv", "86e03wcgp", "86e03wcgh", "86e03wceb", "86e03wce5", "86e03wcdz"
]

# SignalR subtasks - keep completed ones, close backlog ones as "duplicate"
SIGNALR_BACKLOG_SUBTASKS = [
    "86e030yxn",  # P10 - Record-level presence indicators (backlog)
    "86e030yxm",  # P9 - Review Threads live comments (backlog)
    "86e030yn1",  # P3 - AI Assistant token streaming (backlog)
]

# ─── Tasks to KEEP and REWRITE (genuine CRM backlog items that aren't duplicates) ────

# These are the real backlog items that need detailed rewriting.
# Grouped by epic/module.

REWRITE_TASKS: Dict[str, Dict[str, Any]] = {
    # ═══════════════════════════════════════════════════════════════════════
    # EPIC: Decision Inbox | Approval Workflow Orchestration (86e00nx1x)
    # ═══════════════════════════════════════════════════════════════════════
    "86e01xvh0": {
        "name": "Module: Approvals | Generic orchestration policy hooks for linked approval chains",
        "description": (
            "**As a** platform engineer,\n"
            "**I want** the approval orchestration engine to expose generic policy hooks that any "
            "business entity (not just Opportunities) can register with,\n"
            "**So that** approval workflows can be reused across Opportunities, POs, Discounts, "
            "and future entities without code duplication.\n\n"
            "**Context:** The current DecisionRequest/DecisionStep entities support generic linked "
            "approval chains. This story adds configurable policy hooks so new entity types can "
            "plug in without modifying the core orchestration.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Policy hook interface defined in Application layer\n"
            "- [ ] Registration mechanism for entity-type → approval policy mapping\n"
            "- [ ] At least 2 entity types registered (Opportunity discount + PO approval)\n"
            "- [ ] Unit tests for hook resolution\n"
            "- [ ] Existing Opportunity approval flow unchanged"
        ),
    },
    "86e01xvgq": {
        "name": "Module: Approvals | Escalation routing matrix and notification policy engine",
        "description": (
            "**As an** admin,\n"
            "**I want** a configurable escalation routing matrix that defines multi-level "
            "escalation paths with notification policies per level,\n"
            "**So that** overdue approvals automatically escalate to the right person with the "
            "right urgency.\n\n"
            "**Context:** DecisionEscalationPolicy entity exists. DecisionSlaEscalationWorker "
            "already handles basic SLA escalation. This story adds matrix-based routing with "
            "configurable notification templates.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Routing matrix admin UI in Settings > Approvals\n"
            "- [ ] Configurable escalation levels (L1 → L2 → L3)\n"
            "- [ ] Notification template per level (email, in-app, both)\n"
            "- [ ] Integration with existing DecisionSlaEscalationWorker\n"
            "- [ ] Audit trail for escalation events\n"
            "- [ ] E2E test for multi-level escalation path"
        ),
    },
    "86e01xvgb": {
        "name": "Module: Approvals | Generic linked workflow orchestration hardening",
        "description": (
            "**As a** platform engineer,\n"
            "**I want** the linked approval workflow orchestration hardened for production "
            "reliability (retries, idempotency, state recovery),\n"
            "**So that** approval chains never get stuck in an inconsistent state.\n\n"
            "**Context:** Current linked approval progression (approve/reject → side effects) "
            "works. This story adds retry logic, idempotent state transitions, and recovery "
            "for interrupted chains.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Idempotent state machine for DecisionStep transitions\n"
            "- [ ] Retry mechanism for failed side-effect execution\n"
            "- [ ] State recovery job to detect and resolve stuck chains\n"
            "- [ ] Comprehensive logging/telemetry for chain lifecycle\n"
            "- [ ] Chaos test covering mid-chain failures"
        ),
    },
    "86e00nx5b": {
        "name": "Module: Approvals | Closed-loop policy tuning from approval analytics",
        "description": (
            "**As an** admin,\n"
            "**I want** the system to analyze approval patterns (approval rates, SLA misses, "
            "bottlenecks) and suggest policy threshold adjustments,\n"
            "**So that** approval policies stay calibrated to real business patterns.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Approval analytics dashboard (approval rate, avg time, SLA compliance)\n"
            "- [ ] Pattern detection for frequent override scenarios\n"
            "- [ ] Suggested threshold adjustments based on historical data\n"
            "- [ ] Admin can accept/reject suggestions with audit trail"
        ),
    },
    "86e00nx4x": {
        "name": "Module: Approvals | Approval analytics and bottleneck visibility for managers",
        "description": (
            "**As a** manager,\n"
            "**I want** a dashboard showing approval bottlenecks (who's slow, which policies "
            "cause delays, SLA breach trends),\n"
            "**So that** I can identify and address process inefficiencies.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Bottleneck report by approver (avg response time, pending count)\n"
            "- [ ] Policy-level delay analysis chart\n"
            "- [ ] SLA breach trend line (weekly/monthly)\n"
            "- [ ] Drill-down from chart to specific pending decisions\n"
            "- [ ] Export to CSV"
        ),
    },
    "86e00nx4q": {
        "name": "Module: Approvals | Advanced routing by segment, region, and deal size",
        "description": (
            "**As an** admin,\n"
            "**I want** approval routing rules that consider deal segment, region, and "
            "deal size to route to the right approver,\n"
            "**So that** enterprise deals get VP-level approval while SMB deals route to managers.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Routing rule builder UI in Settings > Approvals\n"
            "- [ ] Conditions: segment, region, amount range, product line\n"
            "- [ ] Multi-condition AND/OR logic\n"
            "- [ ] Preview / test mode before activation\n"
            "- [ ] Falls back to default chain if no rule matches"
        ),
    },
    "86e00nx4j": {
        "name": "Module: Approvals | Parallel approval support for multi-stakeholder decisions",
        "description": (
            "**As an** admin,\n"
            "**I want** to configure parallel approval steps where multiple approvers "
            "must all approve (or majority-approve) before proceeding,\n"
            "**So that** cross-functional reviews can happen simultaneously.\n\n"
            "**Context:** Current DecisionStep model is sequential. This adds parallel step "
            "support with configurable quorum (all, majority, any-one).\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] DecisionStep supports parallel type with quorum setting\n"
            "- [ ] UI shows parallel approvers side-by-side in Decision Inbox\n"
            "- [ ] Quorum logic: all-must-approve, majority, any-one\n"
            "- [ ] Timeline visualization shows parallel branches\n"
            "- [ ] Regression: existing sequential flows unchanged"
        ),
    },
    "86e00nx4c": {
        "name": "Module: Dashboard | Decision Inbox KPI widgets for managers",
        "description": (
            "**As a** manager,\n"
            "**I want** dashboard widgets showing Decision Inbox KPIs (pending count, "
            "my-queue count, avg approval time, SLA compliance rate),\n"
            "**So that** I can monitor approval health without leaving the dashboard.\n\n"
            "**Context:** Dashboard already has epistemic widgets, forecast cards, and "
            "risk register. This adds decision/approval metrics.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'Pending Approvals' count widget with trend sparkline\n"
            "- [ ] 'My Queue' widget showing items assigned to current user\n"
            "- [ ] 'Avg Approval Time' metric with threshold coloring\n"
            "- [ ] 'SLA Compliance' percentage gauge\n"
            "- [ ] Widgets available in dashboard pack configuration"
        ),
    },
    "86e00nx40": {
        "name": "Module: Approvals | Delegation and out-of-office routing for approvers",
        "description": (
            "**As an** approver,\n"
            "**I want** to set a delegate and out-of-office status so my pending "
            "approvals automatically route to my backup,\n"
            "**So that** approval chains don't stall when I'm unavailable.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'Set Delegate' action in Decision Inbox profile menu\n"
            "- [ ] OOO date range with auto-activate/deactivate\n"
            "- [ ] Pending items auto-reassign to delegate on OOO start\n"
            "- [ ] Notification to delegate when items are transferred\n"
            "- [ ] Audit trail for delegation events\n"
            "- [ ] Items return to original approver when OOO ends (configurable)"
        ),
    },
    "86e00nx3t": {
        "name": "Module: Assistant | High-risk AI action reviews routed to admin approval queue",
        "description": (
            "**As an** admin,\n"
            "**I want** AI assistant actions classified as high-risk (e.g., bulk updates, "
            "stage changes, discount approvals) to require admin review before execution,\n"
            "**So that** AI-driven actions have human oversight proportional to risk.\n\n"
            "**Context:** AI Assistant has action execution framework. This integrates the "
            "approval workflow system with the action risk classification.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Risk classification on assistant actions (low/medium/high)\n"
            "- [ ] High-risk actions create DecisionRequest for admin\n"
            "- [ ] Admin sees AI action context + rationale in Decision Inbox\n"
            "- [ ] Approved actions execute automatically\n"
            "- [ ] Rejected actions notify the requesting user"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # EPIC: AI Assistant | Action Execution & Review Controls (86dzxrdp5)
    # ═══════════════════════════════════════════════════════════════════════
    "86dzxrdru": {
        "name": "Module: Assistant | E2E test coverage for assistant action execution paths",
        "description": (
            "**As a** QA engineer,\n"
            "**I want** comprehensive E2E test coverage for all assistant action execution paths "
            "(one-click, review-required, admin-approved),\n"
            "**So that** we can confidently ship action execution without regressions.\n\n"
            "**Context:** Assistant chat exists (AssistantChatService + FoundryAgentClient). "
            "Action execution pathways need test harnesses.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] E2E test: low-risk one-click action (log follow-up task)\n"
            "- [ ] E2E test: medium-risk review-required action (stage change)\n"
            "- [ ] E2E test: high-risk admin-approved action (discount)\n"
            "- [ ] E2E test: action rejection + user notification\n"
            "- [ ] Test coverage report ≥80% for action execution module"
        ),
    },
    "86dzxrdrk": {
        "name": "Module: Assistant | Role-scope enforcement for action visibility and execution",
        "description": (
            "**As a** platform engineer,\n"
            "**I want** assistant actions filtered by user role permissions so users only see "
            "and execute actions their role allows,\n"
            "**So that** the permission model extends to AI-driven operations.\n\n"
            "**Context:** Permission model exists (PermissionCatalogEntry, RolePermission). "
            "AgentToolsController exposes tools. This story connects them.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Action catalog filtered by user's role permissions\n"
            "- [ ] Execution blocked server-side if permission missing\n"
            "- [ ] UI hides unavailable actions in chat suggestions\n"
            "- [ ] Admin can map actions to permission entries\n"
            "- [ ] Audit log entry for blocked action attempts"
        ),
    },
    "86dzxrdr4": {
        "name": "Module: Assistant | Dashboard action queue with execute/review UX",
        "description": (
            "**As a** sales rep,\n"
            "**I want** a dashboard widget showing my pending AI-suggested actions with "
            "execute/review/dismiss controls,\n"
            "**So that** I can efficiently process AI recommendations from one place.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'AI Action Queue' dashboard widget\n"
            "- [ ] Shows pending actions grouped by risk level\n"
            "- [ ] One-click execute for low-risk actions\n"
            "- [ ] Review detail drawer for medium/high-risk\n"
            "- [ ] Dismiss with optional feedback (wrong/not now/irrelevant)\n"
            "- [ ] Batch actions for multiple low-risk items"
        ),
    },
    "86dzxrdqy": {
        "name": "Module: Assistant | Action audit trail and acceptance telemetry",
        "description": (
            "**As a** product owner,\n"
            "**I want** every AI assistant action (suggested, executed, rejected, dismissed) "
            "logged with full audit trail and acceptance telemetry,\n"
            "**So that** we can measure AI value and train better models.\n\n"
            "**Context:** AuditEvent entity exists. This extends it for assistant actions.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Audit entry for every action lifecycle event\n"
            "- [ ] Telemetry: suggestion→acceptance rate by action type\n"
            "- [ ] Telemetry: time-to-action from suggestion to execution\n"
            "- [ ] Filterable in Settings > Audit Log by 'AI Actions'\n"
            "- [ ] Export-ready for ML training data pipelines"
        ),
    },
    "86dzxrdqr": {
        "name": "Module: Assistant | Action policy engine with risk tier and confidence thresholds",
        "description": (
            "**As an** admin,\n"
            "**I want** to configure action policies that define risk tiers and confidence "
            "thresholds for each action type,\n"
            "**So that** the system automatically routes actions to the right approval level.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Action policy configuration UI in Settings\n"
            "- [ ] Risk tier assignment per action type (low/medium/high)\n"
            "- [ ] Confidence threshold: auto-execute above X%, review below\n"
            "- [ ] Override capability for specific roles\n"
            "- [ ] Policy versioning with rollback"
        ),
    },
    "86dzxrdq4": {
        "name": "Module: Assistant | Review-required flow for medium/high-risk actions",
        "description": (
            "**As a** sales rep,\n"
            "**I want** medium and high-risk AI actions to show a review panel with the "
            "AI's rationale, affected records, and expected impact before I confirm,\n"
            "**So that** I can make informed decisions about AI suggestions.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Review drawer shows: action description, affected records, AI confidence\n"
            "- [ ] Impact preview: what will change if executed\n"
            "- [ ] Rationale explanation: why the AI suggested this\n"
            "- [ ] Confirm/Reject/Request More Info actions\n"
            "- [ ] High-risk items route to manager after user confirms"
        ),
    },
    "86dzxrdpm": {
        "name": "Module: Assistant | One-click low-risk actions with undo support",
        "description": (
            "**As a** sales rep,\n"
            "**I want** low-risk AI actions (log task, set follow-up, add note) to execute "
            "with one click and show an undo toast,\n"
            "**So that** routine actions are frictionless but recoverable.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] One-click execution for actions classified as low-risk\n"
            "- [ ] Toast notification with undo option (5-second window)\n"
            "- [ ] Undo reverts the action completely\n"
            "- [ ] Success animation in chat interface\n"
            "- [ ] Audit entry created even for undone actions"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # EPIC: AI Assistant | Revenue Execution Orchestration Outcomes (86dzzkbv0)
    # ═══════════════════════════════════════════════════════════════════════
    "86dzzkby7": {
        "name": "Module: Assistant | Closed-loop learning from suggestion adoption patterns",
        "description": (
            "**As a** product owner,\n"
            "**I want** the AI to learn from which suggestions are adopted vs rejected "
            "to improve future recommendation relevance,\n"
            "**So that** the assistant gets smarter over time.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Track adoption/rejection for every suggestion\n"
            "- [ ] Feedback loop data pipeline to model training\n"
            "- [ ] Monthly improvement report (adoption rate trend)\n"
            "- [ ] A/B test framework for suggestion strategies\n"
            "- [ ] Privacy: no PII exported to training pipeline"
        ),
    },
    "86dzzkby4": {
        "name": "Module: Assistant | Playbook runtime by stage/segment with artifact generation",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the AI assistant to load stage-specific playbooks and generate "
            "artifacts (talk tracks, email templates, discovery guides) based on deal context,\n"
            "**So that** I always have the right resources at the right stage.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Playbook templates configurable per stage + segment\n"
            "- [ ] AI generates personalized artifacts from templates\n"
            "- [ ] Artifacts available in chat and deal sidebar\n"
            "- [ ] Manager can review/customize playbook templates\n"
            "- [ ] Usage tracking: which playbooks drive highest win rates"
        ),
    },
    "86dzzkby0": {
        "name": "Module: Assistant | Truth gap resolution loop with CQVS-targeted evidence requests",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the AI to identify truth gaps in my deals (via CQVS framework) "
            "and suggest specific evidence-gathering actions to close them,\n"
            "**So that** my deals have complete and accurate data.\n\n"
            "**Context:** Lead scoring with CQVS exists. This adds proactive gap detection "
            "and AI-driven evidence request suggestions.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] AI detects 'Unknown' CQVS factors on active deals\n"
            "- [ ] Generates specific evidence requests (meeting, call, email)\n"
            "- [ ] Priority ranked by impact on deal score\n"
            "- [ ] Progress tracking: gaps closed vs. total\n"
            "- [ ] Weekly 'Truth Gap Report' for managers"
        ),
    },
    "86dzwn0eq": {
        "name": "Module: Assistant | Forecast reliability risk signals in assistant responses",
        "description": (
            "**As a** sales manager,\n"
            "**I want** the AI assistant to surface forecast reliability risks (deals with "
            "low confidence, stale data, missing evidence) in conversational responses,\n"
            "**So that** I can quickly assess pipeline quality.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Assistant identifies low-confidence deals when asked about forecast\n"
            "- [ ] Highlights stale deals (no activity in X days)\n"
            "- [ ] Suggests specific actions to improve forecast reliability\n"
            "- [ ] Integrates with existing confidence-weighted forecast data"
        ),
    },
    "86dzwn0e4": {
        "name": "Module: Assistant | Manager coaching orchestration with acknowledgment tracking",
        "description": (
            "**As a** manager,\n"
            "**I want** the AI to generate coaching recommendations for my reps based on "
            "deal execution patterns and track whether I've acted on them,\n"
            "**So that** coaching is data-driven and accountable.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] AI identifies coaching opportunities from deal data\n"
            "- [ ] Coaching suggestion cards in manager dashboard\n"
            "- [ ] Acknowledge/dismiss/snooze actions per suggestion\n"
            "- [ ] Rep can see coaching notes received\n"
            "- [ ] Coaching activity tracked in team metrics"
        ),
    },
    "86dzwn0dk": {
        "name": "Module: Assistant | Approval copilot with policy-aware request guidance",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the AI assistant to help me prepare approval requests by checking "
            "policy requirements and suggesting the right justification,\n"
            "**So that** my approval requests are complete and less likely to be rejected.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] AI checks deal against approval policy thresholds\n"
            "- [ ] Suggests required justification based on policy\n"
            "- [ ] Pre-fills approval request with deal context\n"
            "- [ ] Warns about missing supporting documents\n"
            "- [ ] Historical: shows similar approved requests as reference"
        ),
    },
    "86dzwn0cr": {
        "name": "Module: Assistant | At-risk pipeline autopilot recommendations",
        "description": (
            "**As a** sales manager,\n"
            "**I want** the AI to automatically identify at-risk deals (SLA breaches, "
            "stalled stages, declining engagement) and suggest intervention actions,\n"
            "**So that** at-risk revenue is proactively managed.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Risk detection rules: stalled > X days, SLA breach, declining score\n"
            "- [ ] Suggested interventions: reassign, escalate, schedule call\n"
            "- [ ] Risk summary card in manager dashboard\n"
            "- [ ] Configurable risk thresholds per stage\n"
            "- [ ] Weekly at-risk pipeline email digest"
        ),
    },
    "86dzwn0c7": {
        "name": "Module: Assistant | Next-best-action orchestration from live CRM data",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the AI assistant to proactively suggest my next best action based on "
            "live CRM data (deal stages, activity recency, CQVS gaps),\n"
            "**So that** I maximize revenue impact with every action.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] NBA engine reads live deal, activity, and contact data\n"
            "- [ ] Prioritizes actions by expected revenue impact\n"
            "- [ ] Suggests up to 5 actions ranked by priority\n"
            "- [ ] Integrates with dashboard 'Today's Focus' section\n"
            "- [ ] Learns from completed action outcomes"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # EPIC: AI Assistant | Knowledge Grounding & Retrieval (86dzw8unp)
    # ═══════════════════════════════════════════════════════════════════════
    "86dzw8uux": {
        "name": "Module: Assistant | Foundry runtime connected with Azure AI Agent Service",
        "description": (
            "**As a** product owner,\n"
            "**I want** the AI assistant runtime connected to Azure AI Foundry Agent Service "
            "with proper authentication and tool registration,\n"
            "**So that** the assistant uses managed AI infrastructure.\n\n"
            "**Context:** FoundryAgentClient exists in Infrastructure/AI. This story ensures "
            "production-ready connectivity.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] FoundryAgentClient configured with managed identity auth\n"
            "- [ ] Agent tools registered (CRM search, deal lookup, activity log)\n"
            "- [ ] Health check endpoint for Foundry connectivity\n"
            "- [ ] Fallback behavior when Foundry is unavailable\n"
            "- [ ] Cost monitoring dashboard for AI API calls"
        ),
    },
    "86dzw8uuw": {
        "name": "Module: Assistant | Full integration test: login-to-logout assistant flow",
        "description": (
            "**As a** CRM admin,\n"
            "**I want** a full integration test covering login → assistant chat → action "
            "execution → logout to verify end-to-end reliability,\n"
            "**So that** we can validate the complete user journey.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Integration test: authenticate → open chat → send query\n"
            "- [ ] Verify: response is grounded in knowledge base\n"
            "- [ ] Verify: suggested actions are role-appropriate\n"
            "- [ ] Test: execute an action and verify side-effects\n"
            "- [ ] Test: session cleanup on logout"
        ),
    },
    "86dzw8uuv": {
        "name": "Module: Assistant | Knowledge-grounded responses from Azure Search index",
        "description": (
            "**As a** sales user,\n"
            "**I want** assistant responses grounded in our knowledge base (product docs, "
            "pricing, policies) via Azure AI Search retrieval,\n"
            "**So that** answers are accurate and based on our actual content.\n\n"
            "**Context:** AzureSearchKnowledgeClient exists. Knowledge docs need to be "
            "published to the search index.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Knowledge docs indexed in Azure AI Search\n"
            "- [ ] RAG pipeline: user query → search → LLM grounding\n"
            "- [ ] Source attribution shown in chat (doc title + section)\n"
            "- [ ] Fallback: 'I don't have info on that' for ungrounded queries\n"
            "- [ ] Knowledge freshness: re-index on doc updates"
        ),
    },
    "86dzw8uuu": {
        "name": "Module: Assistant | Knowledge publishing pipeline to Azure AI Search",
        "description": (
            "**As an** engineer,\n"
            "**I want** an automated pipeline that publishes knowledge docs to Azure AI "
            "Search index with proper chunking and embeddings,\n"
            "**So that** the assistant always has current knowledge.\n\n"
            "**Context:** Scripts exist (setup_ai_knowledge_search_index.py, "
            "push_ai_knowledge_to_search.py). This story productionizes the pipeline.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Automated CI/CD step for knowledge publishing\n"
            "- [ ] Document chunking with optimal chunk size\n"
            "- [ ] Embedding generation (text-embedding-3-small or equivalent)\n"
            "- [ ] Incremental updates (only changed docs re-indexed)\n"
            "- [ ] Index health monitoring in admin dashboard"
        ),
    },
    "86dzw8uuk": {
        "name": "Module: Assistant | Knowledge doc validation and accuracy scoring",
        "description": (
            "**As a** product ops user,\n"
            "**I want** knowledge docs validated for accuracy and completeness before "
            "they're published to the search index,\n"
            "**So that** the assistant never gives outdated or incorrect information.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Validation pipeline checks: format, required sections, freshness\n"
            "- [ ] Accuracy score based on last-reviewed date\n"
            "- [ ] Stale doc alerts (not updated in X days)\n"
            "- [ ] Review workflow: mark as reviewed → publish\n"
            "- [ ] Dashboard: knowledge health (coverage, staleness, accuracy)"
        ),
    },
    "86dzw8uug": {
        "name": "Module: Assistant | Automated Azure AI Search index management",
        "description": (
            "**As a** CRM admin,\n"
            "**I want** the Azure AI Search index automatically created and managed "
            "(schema, skillset, indexer) through infrastructure-as-code,\n"
            "**So that** search infrastructure is reproducible and maintainable.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Bicep/ARM template for search index, skillset, indexer\n"
            "- [ ] Automated index recreation on schema changes\n"
            "- [ ] Environment-specific (dev/staging/prod) configurations\n"
            "- [ ] Monitoring: index size, query latency, document count\n"
            "- [ ] Alerting on indexer failures"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # EPIC: Dashboard | Deal Execution Quality (86dzrwknd)
    # ═══════════════════════════════════════════════════════════════════════
    "86dzrwq5x": {
        "name": "Dashboard | Test coverage, calibration, and rollout controls",
        "description": (
            "**As a** product owner,\n"
            "**I want** comprehensive test coverage for deal execution quality features "
            "and admin controls for gradual rollout,\n"
            "**So that** new scoring models can be safely deployed.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Unit tests for execution quality scoring (≥90% coverage)\n"
            "- [ ] Feature flag for execution quality widgets\n"
            "- [ ] A/B test support: old vs new scoring model\n"
            "- [ ] Calibration tool: tune weights based on outcomes\n"
            "- [ ] Rollout dashboard showing adoption metrics"
        ),
    },
    "86dzrwq5t": {
        "name": "Dashboard | Email sentiment signal integration (conditional)",
        "description": (
            "**As a** sales manager,\n"
            "**I want** email sentiment signals (positive/neutral/negative) integrated "
            "into deal execution quality scores,\n"
            "**So that** engagement tone is factored into deal health.\n\n"
            "**Precondition:** Requires email integration (bidirectional sync) first.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Sentiment analysis on email threads per deal\n"
            "- [ ] Sentiment score feeds into execution quality model\n"
            "- [ ] Trend visualization: sentiment over deal lifecycle\n"
            "- [ ] Admin can enable/disable sentiment scoring"
        ),
    },
    "86dzrwq5n": {
        "name": "Dashboard | Signal enrichment: response time, cadence, meeting depth, buying signals",
        "description": (
            "**As a** sales manager,\n"
            "**I want** deal execution quality enriched with response time metrics, "
            "cadence regularity, meeting depth, and buying signal density,\n"
            "**So that** execution quality scoring is multi-dimensional.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Response time metric: avg time to respond to prospect\n"
            "- [ ] Cadence regularity: are touchpoints evenly spaced?\n"
            "- [ ] Meeting depth: discovery vs demo vs negotiation ratio\n"
            "- [ ] Buying signal count: positive signals per stage\n"
            "- [ ] Combined multi-signal execution quality score"
        ),
    },
    "86dzrwq5h": {
        "name": "Dashboard | Next-best-action guidance (doNow/thisWeek/optional)",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the dashboard to show prioritized next-best-action guidance "
            "categorized as do-now / this-week / optional,\n"
            "**So that** I focus on the highest-impact activities.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'Do Now' section: urgent actions (SLA breaches, stalled deals)\n"
            "- [ ] 'This Week' section: important but not urgent\n"
            "- [ ] 'Optional' section: nice-to-have optimizations\n"
            "- [ ] Actions link to specific records for one-click navigation\n"
            "- [ ] Refreshes based on real-time CRM data"
        ),
    },
    "86dzrwq5d": {
        "name": "Dashboard | Belief-vs-Truth capture and gap indicator",
        "description": (
            "**As a** sales rep,\n"
            "**I want** to record my belief about deal probability and see how it "
            "compares to the system's data-driven truth score,\n"
            "**So that** I can identify where my intuition diverges from data.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'My Confidence' slider on opportunity record (1-100%)\n"
            "- [ ] System truth score from CQVS + execution quality\n"
            "- [ ] Gap indicator: Belief - Truth (positive = overconfident)\n"
            "- [ ] Manager dashboard: team belief-vs-truth distribution\n"
            "- [ ] Historical calibration: are reps getting more accurate?"
        ),
    },
    "86dzrwq58": {
        "name": "Dashboard | Render Engagement Score, Execution Quality, and Risk with reasons",
        "description": (
            "**As a** sales rep,\n"
            "**I want** engagement score, execution quality, and risk metrics rendered "
            "on my dashboard with drill-down reasons,\n"
            "**So that** I understand why each metric is where it is.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Engagement Score widget with factor breakdown\n"
            "- [ ] Execution Quality widget with component scores\n"
            "- [ ] Risk widget with contributing risk factors\n"
            "- [ ] Drill-down: click metric → see contributing deals\n"
            "- [ ] Color coding: green/yellow/red by threshold"
        ),
    },
    "86dzrwq50": {
        "name": "Dashboard | Execution Quality v1 scoring model and API contract",
        "description": (
            "**As a** platform engineer,\n"
            "**I want** the Execution Quality v1 scoring model defined with a clear "
            "API contract (input signals, weights, output schema),\n"
            "**So that** the dashboard and AI assistant can consume it.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Scoring model: activity frequency, recency, diversity, cadence\n"
            "- [ ] Configurable weights per signal\n"
            "- [ ] API endpoint: GET /api/dashboard/execution-quality/{dealId}\n"
            "- [ ] Batch endpoint for portfolio scoring\n"
            "- [ ] Model versioning for A/B testing"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # STANDALONE BACKLOG ITEMS (no parent epic)
    # ═══════════════════════════════════════════════════════════════════════
    "86dzp8xz6": {
        "name": "02B - Leads | AI suggests next evidence to resolve weakest CQVS factors",
        "description": (
            "**As a** sales rep,\n"
            "**I want** the AI to suggest specific evidence-gathering actions to resolve "
            "my weakest CQVS qualification factors,\n"
            "**So that** I know exactly what to do next to strengthen my lead.\n\n"
            "**Context:** Lead scoring with CQVS framework exists (lead-scoring.util.ts). "
            "This adds AI-powered suggestions for gap resolution.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] AI reads current CQVS scores and identifies weakest factor\n"
            "- [ ] Suggests 1-3 specific actions (call, email, meeting) per gap\n"
            "- [ ] Suggestions shown in lead detail sidebar\n"
            "- [ ] Clicking suggestion creates a task or activity\n"
            "- [ ] Factor score improves after evidence is recorded"
        ),
    },
    "86dzp8xkf": {
        "name": "Module: Settings | Tenant module pack configuration",
        "description": (
            "**As a** platform admin,\n"
            "**I want** to configure which module packs (CRM, SCM, Marketing, etc.) are "
            "enabled per tenant,\n"
            "**So that** each tenant only pays for and sees the modules they need.\n\n"
            "**Context:** TenantContextController exists. tenantFeatureGuard already checks "
            "feature flags. This story adds the admin UI to configure packs.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Module pack toggle grid in tenant settings\n"
            "- [ ] Packs: CRM Core, Marketing, Supply Chain, AI Assistant\n"
            "- [ ] Toggle immediately hides/shows navigation items\n"
            "- [ ] Backend enforces pack membership on API calls\n"
            "- [ ] Audit log entry when pack configuration changes"
        ),
    },
    "86dzp8xdf": {
        "name": "02L - Leads | Log call outcomes (Connected / Voicemail / No Answer) on lead record",
        "description": (
            "**As a** sales rep,\n"
            "**I want** to log call outcomes (Connected, Voicemail, No Answer, Wrong Number) "
            "directly on the lead record,\n"
            "**So that** call activity is tracked and cadence can be measured.\n\n"
            "**Context:** Activities exist with outcomes. Leads page exists with edit form. "
            "This adds a specific call-logging quick action.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] 'Log Call' button on lead detail and lead list\n"
            "- [ ] Outcome picker: Connected, Voicemail, No Answer, Wrong Number\n"
            "- [ ] Connected → optional notes + next steps field\n"
            "- [ ] Activity created with type=Call and outcome\n"
            "- [ ] Call history visible on lead timeline\n"
            "- [ ] Call count metrics on lead list (total calls, last call date)"
        ),
    },

    # ═══════════════════════════════════════════════════════════════════════
    # SignalR backlog items (not duplicated in Prioritization Backlog)
    # ═══════════════════════════════════════════════════════════════════════
    "86e030yxn": {
        "name": "SignalR P10 | Record-level presence indicators showing who's viewing a record",
        "description": (
            "**As a** sales rep,\n"
            "**I want** to see who else is currently viewing the same record (lead, deal, "
            "contact) with avatar presence indicators,\n"
            "**So that** I avoid conflicting edits and can coordinate in real-time.\n\n"
            "**Context:** PresenceHub SignalR hub exists. This extends presence tracking "
            "from app-level to record-level.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] Presence indicators on record detail pages (lead, deal, contact)\n"
            "- [ ] Avatar stack showing active viewers\n"
            "- [ ] Tooltip with viewer name and viewing duration\n"
            "- [ ] Auto-update when viewers join/leave\n"
            "- [ ] Performance: ≤100ms latency for presence updates"
        ),
    },
    "86e030yxm": {
        "name": "SignalR P9 | Real-time review thread comments on deal records",
        "description": (
            "**As a** sales rep,\n"
            "**I want** review thread comments on deal records to update in real-time "
            "via SignalR without page refresh,\n"
            "**So that** collaboration on deals feels instant.\n\n"
            "**Context:** CrmEventsHub exists. OpportunityReviewChecklistItem entity "
            "supports review checklists.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] New comments appear instantly for all viewers\n"
            "- [ ] Comment edit/delete reflected in real-time\n"
            "- [ ] Typing indicator when someone is composing\n"
            "- [ ] Notification badge for unread comments\n"
            "- [ ] Offline resilience: sync on reconnect"
        ),
    },
    "86e030yn1": {
        "name": "SignalR P3 | AI Assistant token streaming over SignalR",
        "description": (
            "**As a** sales rep,\n"
            "**I want** AI assistant responses to stream token-by-token via SignalR "
            "so I see the answer appear progressively,\n"
            "**So that** the assistant feels responsive even for long answers.\n\n"
            "**Context:** AssistantChatService exists. FoundryAgentClient calls the AI. "
            "This adds streaming via CrmEventsHub.\n\n"
            "**Acceptance Criteria:**\n"
            "- [ ] SignalR channel for assistant message streaming\n"
            "- [ ] Tokens render progressively in chat UI\n"
            "- [ ] Markdown formatting applied as tokens arrive\n"
            "- [ ] Cancel/stop button during streaming\n"
            "- [ ] Fallback: full-response mode if streaming fails"
        ),
    },
}

# ─── IDs to close as duplicate ────────────────────────────────────────────────
# Competitive Audit epic + all children (except completed campaign subtasks)
IDS_TO_CLOSE = set()
IDS_TO_CLOSE.add(COMPETITIVE_AUDIT_EPIC_ID)
for child_id in COMPETITIVE_AUDIT_CHILDREN:
    # Skip campaign subtasks (completed, keep as-is)
    if child_id not in CAMPAIGN_SUBTASK_IDS:
        IDS_TO_CLOSE.add(child_id)


def close_task(task_id: str, reason: str = "Duplicate of Prioritization Backlog") -> bool:
    """Close a task by setting status to 'completed'."""
    url = f"{BASE_URL}/task/{task_id}"
    resp = rate_limited_request("PUT", url, json={
        "status": "completed",
        "description": f"[AUTO-CLOSED] {reason}\n\nThis item has been superseded by the equivalent epic in the Prioritization Backlog (list {PRIO_BACKLOG_LIST_ID}). The Prioritization Backlog contains the canonical version with detailed user stories."
    })
    return resp.status_code == 200


def update_task(task_id: str, name: str, description: str) -> bool:
    """Update a task's name and description with properly detailed content."""
    url = f"{BASE_URL}/task/{task_id}"
    resp = rate_limited_request("PUT", url, json={
        "name": name,
        "description": description,
    })
    return resp.status_code == 200


def main():
    print("=" * 70)
    print("CRM BACKLOG CLEANUP & REWRITE")
    print("=" * 70)
    print()

    # Phase 1: Fetch all current tasks
    print("[1/3] Fetching all CRM Backlog tasks...")
    all_tasks = fetch_all_tasks(CRM_BACKLOG_LIST_ID)
    print(f"  Found {len(all_tasks)} total tasks")

    # Categorize
    completed = [t for t in all_tasks if t["status"]["status"] in ("completed", "done")]
    backlog = [t for t in all_tasks if t["status"]["status"] == "backlog"]
    in_progress = [t for t in all_tasks if t["status"]["status"] == "in progress"]
    review = [t for t in all_tasks if t["status"]["status"] in ("read to test", "review")]

    print(f"  Completed/Done: {len(completed)}")
    print(f"  Backlog: {len(backlog)}")
    print(f"  In Progress: {len(in_progress)}")
    print(f"  Read to Test / Review: {len(review)}")
    print()

    # Phase 2: Close duplicates
    print("[2/3] Closing competitive-audit duplicates...")
    close_success = 0
    close_fail = 0
    close_skip = 0

    for task in all_tasks:
        task_id = task["id"]
        if task_id in IDS_TO_CLOSE:
            # Skip if already completed
            if task["status"]["status"] in ("completed", "done"):
                print(f"  SKIP (already closed): {task_id} | {task['name'][:60]}")
                close_skip += 1
                continue

            print(f"  CLOSING: {task_id} | {task['name'][:60]}")
            if close_task(task_id):
                close_success += 1
            else:
                close_fail += 1
                print(f"    *** FAILED to close {task_id}")
            time.sleep(0.4)

    print(f"\n  Closed: {close_success} | Failed: {close_fail} | Skipped: {close_skip}")
    print()

    # Phase 3: Rewrite remaining backlog tasks with detailed descriptions
    print("[3/3] Rewriting backlog stories with detailed descriptions...")
    rewrite_success = 0
    rewrite_fail = 0
    rewrite_skip = 0

    for task_id, rewrite_data in REWRITE_TASKS.items():
        # Check if this task actually exists in our fetch
        existing = next((t for t in all_tasks if t["id"] == task_id), None)
        if not existing:
            print(f"  SKIP (not found): {task_id} | {rewrite_data['name'][:60]}")
            rewrite_skip += 1
            continue

        # Skip completed tasks
        if existing["status"]["status"] in ("completed", "done"):
            print(f"  SKIP (completed): {task_id} | {rewrite_data['name'][:60]}")
            rewrite_skip += 1
            continue

        print(f"  REWRITING: {task_id} | {rewrite_data['name'][:60]}")
        if update_task(task_id, rewrite_data["name"], rewrite_data["description"]):
            rewrite_success += 1
        else:
            rewrite_fail += 1
            print(f"    *** FAILED to update {task_id}")
        time.sleep(0.4)

    print(f"\n  Rewritten: {rewrite_success} | Failed: {rewrite_fail} | Skipped: {rewrite_skip}")
    print()

    # Summary
    print("=" * 70)
    print("CLEANUP COMPLETE")
    print("=" * 70)
    print(f"  Duplicates closed: {close_success}")
    print(f"  Stories rewritten: {rewrite_success}")
    print(f"  Original completed items: {len(completed)} (preserved)")
    print(f"  Read-to-test items: {len(review)} (preserved)")
    print()
    print("Remaining backlog structure:")
    print("  - Decision Inbox / Approval Workflow Orchestration (10 stories)")
    print("  - AI Assistant / Action Execution & Review (7 stories)")
    print("  - AI Assistant / Revenue Execution Orchestration (8 stories)")
    print("  - AI Assistant / Knowledge Grounding & Retrieval (6 stories)")
    print("  - Dashboard / Deal Execution Quality (7 stories)")
    print("  - Standalone: Lead CQVS AI suggestions, Tenant packs, Call logging")
    print("  - SignalR: P3 (token streaming), P9 (review comments), P10 (presence)")
    print()
    print("All competitive-audit gap items are now in the Prioritization Backlog.")
    print(f"  Prioritization Backlog: {PRIO_BACKLOG_LIST_ID} (29 epics, 58 stories)")


if __name__ == "__main__":
    main()
