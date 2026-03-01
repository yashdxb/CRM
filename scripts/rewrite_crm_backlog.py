#!/usr/bin/env python3
"""
CRM Backlog Complete Rewrite
=============================
Deletes ALL existing tasks in the CRM Backlog list and creates a fresh,
properly-ordered set of epics + user stories grounded in the actual codebase.

Features:
- Backups already taken to scratch/crm_backlog_backup.json (204 tasks)
  and scratch/prio_backlog_backup.json (87 tasks)
- Deletes all existing tasks first
- Creates epics as parent tasks, user stories as subtasks
- Proper "As a ... I want ... So that ..." format
- No numbered prefixes, no status indicators
- Ordered by user journey: Auth → Dashboard → Leads → ... → Future
- Rate-limited to stay under ClickUp API limits
"""

import json, time, sys, os, textwrap
import urllib.request, urllib.error

# ─── Configuration ────────────────────────────────────────────────────────────
API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
CRM_LIST_ID = "901710720381"
BASE_URL = "https://api.clickup.com/api/v2"

HEADERS = {
    "Authorization": API_TOKEN,
    "Content-Type": "application/json",
}

# Rate-limit: stay under 100 req/min → ~1.5 req/sec with buffer
REQUEST_DELAY = 0.7  # seconds between API calls


# ─── API Helpers ──────────────────────────────────────────────────────────────
def api_request(method: str, url: str, data: dict | None = None) -> dict | None:
    """Make an API request with retry logic."""
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as resp:
                raw = resp.read()
                return json.loads(raw) if raw else None
        except urllib.error.HTTPError as e:
            if e.code == 429:  # Rate limited
                wait = 10 * (attempt + 1)
                print(f"  ⏳ Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            body_text = e.read().decode() if e.fp else ""
            print(f"  ❌ HTTP {e.code}: {body_text[:200]}")
            if attempt < 2:
                time.sleep(3)
                continue
            raise
        except Exception as e:
            if attempt < 2:
                time.sleep(3)
                continue
            raise
    return None


def get_all_tasks() -> list[dict]:
    """Fetch all tasks in the CRM Backlog list."""
    all_tasks = []
    page = 0
    while True:
        url = f"{BASE_URL}/list/{CRM_LIST_ID}/task?page={page}&include_closed=true&subtasks=true"
        result = api_request("GET", url)
        if not result or not result.get("tasks"):
            break
        all_tasks.extend(result["tasks"])
        if result.get("last_page", True):
            break
        page += 1
        time.sleep(REQUEST_DELAY)
    return all_tasks


def delete_task(task_id: str) -> bool:
    """Delete a single task."""
    url = f"{BASE_URL}/task/{task_id}"
    try:
        api_request("DELETE", url)
        return True
    except Exception as e:
        print(f"  ⚠️  Failed to delete {task_id}: {e}")
        return False


def create_task(name: str, description: str, priority: int = 3,
                tags: list[str] | None = None,
                parent: str | None = None,
                custom_fields: list | None = None) -> dict | None:
    """Create a task in the CRM Backlog list."""
    url = f"{BASE_URL}/list/{CRM_LIST_ID}/task"
    payload: dict = {
        "name": name,
        "description": description,
        "priority": priority,  # 1=Urgent, 2=High, 3=Normal, 4=Low
        "status": "backlog",
    }
    if tags:
        payload["tags"] = tags
    if parent:
        payload["parent"] = parent
    if custom_fields:
        payload["custom_fields"] = custom_fields

    return api_request("POST", url, payload)


# ─── Epic & Story Definitions ────────────────────────────────────────────────
# Priority mapping: 1=Urgent, 2=High, 3=Normal, 4=Low

BACKLOG = [
    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 1: Authentication & User Onboarding
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Authentication & User Onboarding",
        "description": textwrap.dedent("""\
            Core authentication and user onboarding flows for the CRM platform.

            **Built Components:**
            - Frontend: Login page, Change Password page, Accept Invite page
            - Backend: AuthController, IAuthService (JWT token issuance)
            - Routes: /login, /change-password, /accept-invite
            - Mock layer: login endpoint with full-permission JWT

            **Architecture:** Clean Architecture — AuthController → IAuthService → AuthService (Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "User login with email and password",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** log in with my email and password
                    **So that** I can access my CRM workspace securely

                    **Acceptance Criteria:**
                    - User enters email and password on login page
                    - System validates credentials against AuthService
                    - JWT access token returned on success with user permissions
                    - User redirected to /app/dashboard after login
                    - Invalid credentials show inline error message
                    - Login form has loading state during authentication

                    **Technical Notes:**
                    - Route: /login → AuthController.Login → IAuthService
                    - Mock: Full-permission JWT with all PERMISSION_KEYS for dev mode
                    - Token stored in localStorage/sessionStorage
                """),
                "priority": 1,
            },
            {
                "name": "JWT session management and token refresh",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want** my session to persist and refresh automatically
                    **So that** I don't have to re-login frequently

                    **Acceptance Criteria:**
                    - JWT token contains sub, email, name, roles, permissions, exp claims
                    - Auth guard (authGuard) protects all /app/** routes
                    - Expired token redirects to /login
                    - Token payload used to populate user context across the app

                    **Technical Notes:**
                    - JwtOptions from appsettings configures token lifetime
                    - Frontend AuthService manages token storage and extraction
                """),
                "priority": 2,
            },
            {
                "name": "User logout and session cleanup",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** log out of the system
                    **So that** my session is terminated securely

                    **Acceptance Criteria:**
                    - Logout button in shell/topbar triggers POST /api/auth/logout
                    - Local token + user state cleared
                    - User redirected to /login
                    - SignalR connections disconnected on logout

                    **Technical Notes:**
                    - Mock: returns 204 No Content
                    - PresenceHub should remove user on disconnect
                """),
                "priority": 2,
            },
            {
                "name": "Change password",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** change my password
                    **So that** I can maintain account security

                    **Acceptance Criteria:**
                    - Accessible from /change-password route
                    - Requires current password + new password + confirm
                    - Validates password strength requirements
                    - Success message and redirect to login

                    **Technical Notes:**
                    - Route: /change-password → standalone page component
                    - Backend: AuthController endpoint
                """),
                "priority": 3,
            },
            {
                "name": "Accept team invitation",
                "description": textwrap.dedent("""\
                    **As an** invited user
                    **I want to** accept an email invitation and set up my account
                    **So that** I can join my team's CRM workspace

                    **Acceptance Criteria:**
                    - Invitation URL with token lands on /accept-invite
                    - User sets full name and password
                    - Account activated and associated with correct tenant/role
                    - Redirect to /login after setup

                    **Technical Notes:**
                    - Route: /accept-invite → AcceptInvitePage
                    - Invitation sent from Settings > Invite User (/app/settings/invite)
                """),
                "priority": 3,
            },
            {
                "name": "Role-based route protection",
                "description": textwrap.dedent("""\
                    **As a** system administrator
                    **I want** routes to be protected by role permissions
                    **So that** users only access features they're authorized for

                    **Acceptance Criteria:**
                    - roleGuard checks user's permissions against route data.permission
                    - tenantFeatureGuard checks feature flags (e.g., marketing.campaigns)
                    - Unauthorized access shows 403 or redirects appropriately
                    - PERMISSION_KEYS constants used consistently across all routes

                    **Technical Notes:**
                    - Guards: authGuard, roleGuard, tenantFeatureGuard
                    - Permission keys: customersView, leadsView, opportunitiesView, etc.
                    - Feature flags: marketing.campaigns enabled per tenant
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 2: Dashboard & Analytics
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Dashboard & Analytics",
        "description": textwrap.dedent("""\
            Main CRM dashboard with summary KPIs, customizable layout, and pack-based analytics.

            **Built Components:**
            - Frontend: DashboardPage (standalone component with signals)
            - Backend: DashboardController, IDashboardReadService, IDashboardLayoutService
            - Route: /app/dashboard (default landing after login)
            - Mock: /api/dashboard/summary

            **Architecture:** DashboardController → IDashboardReadService + IDashboardLayoutService
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Dashboard summary with KPI cards",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** see key metrics on my dashboard
                    **So that** I can monitor team performance at a glance

                    **Acceptance Criteria:**
                    - Dashboard displays total customers, leads, opportunities, revenue
                    - Metric cards use glassmorphism design with ring charts
                    - Data refreshed on page load from /api/dashboard/summary
                    - Responsive grid: 5 columns → 3 → 2 → 1 on smaller screens

                    **Technical Notes:**
                    - DashboardPage uses Angular signals for state
                    - Mock: buildDashboardSummary() in mock-db.ts
                    - Design: metric-card pattern from page-design-system
                """),
                "priority": 1,
            },
            {
                "name": "Customizable dashboard layout",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** customize my dashboard widget layout
                    **So that** I see the most relevant data for my role

                    **Acceptance Criteria:**
                    - Users can add/remove/reorder dashboard widgets
                    - Layout persists per user via IDashboardLayoutService
                    - Widget types: charts, KPI cards, lists, recent activity
                    - Drag-and-drop reordering

                    **Technical Notes:**
                    - Backend: IDashboardLayoutService stores layout config
                    - Endpoint: DashboardController layout endpoints
                """),
                "priority": 2,
            },
            {
                "name": "Dashboard packs and modules",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** manage dashboard packs
                    **So that** different teams have pre-configured dashboard modules

                    **Acceptance Criteria:**
                    - Admin can create/configure dashboard packs at /app/settings/dashboard-packs
                    - Packs contain collections of widgets and layouts
                    - Packs assignable to roles or teams
                    - Users see pack widgets on their dashboard

                    **Technical Notes:**
                    - Settings route: /app/settings/dashboard-packs → SettingsPage
                    - Backend service manages pack definitions
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 3: Lead Management
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Lead Management",
        "description": textwrap.dedent("""\
            Complete lead lifecycle: capture, qualify, score, assign, convert.

            **Built Components:**
            - Frontend: LeadsPage (list + pipeline views), LeadFormPage (create/edit), LeadConvertPage
            - Backend: LeadsController, LeadAssignmentRulesController
            - Services: ILeadService, ILeadScoringService, ILeadImportService
            - Routes: /app/leads, /app/leads/pipeline, /app/leads/import, /app/leads/new, /app/leads/:id/edit, /app/leads/:id/convert
            - Status: REAL API (not mocked)

            **Architecture:** LeadsController → ILeadService + ILeadScoringService → LeadService + LeadScoringService (Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Lead list with search and filtering",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** view and search all my leads
                    **So that** I can manage my pipeline efficiently

                    **Acceptance Criteria:**
                    - Lead list at /app/leads with PrimeNG data table
                    - Search by name, company, email
                    - Filter by status, source, assigned user
                    - Server-side pagination
                    - Status badges with color coding (lead, prospect, etc.)

                    **Technical Notes:**
                    - LeadsPage component with signals for state management
                    - LeadDataService → GET /api/leads with HttpParams
                    - Real API endpoint (ILeadService.SearchAsync)
                    - Permission: leadsView required
                """),
                "priority": 1,
            },
            {
                "name": "Pipeline (Kanban) view for leads",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** see leads in a pipeline/Kanban view
                    **So that** I can visualize deal progression across stages

                    **Acceptance Criteria:**
                    - Kanban board at /app/leads/pipeline
                    - Columns represent lead stages (New, Contacted, Qualified, etc.)
                    - Drag-and-drop to move leads between stages
                    - Lead cards show key info (name, value, source)

                    **Technical Notes:**
                    - Same LeadsPage component with view toggle
                    - Route: /app/leads/pipeline
                """),
                "priority": 2,
            },
            {
                "name": "Create new lead",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** create a new lead
                    **So that** I can track potential customers in the system

                    **Acceptance Criteria:**
                    - Form at /app/leads/new with all lead fields
                    - Required fields: name, company, status, source
                    - Premium glass form design with section cards
                    - Validation messages for required fields
                    - Success notification and redirect to lead list

                    **Technical Notes:**
                    - LeadFormPage component
                    - POST /api/leads → ILeadService.CreateAsync
                    - Permission: leadsManage required
                    - Uses form-page-styles mixin system
                """),
                "priority": 1,
            },
            {
                "name": "Edit existing lead",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** edit an existing lead's details
                    **So that** I can keep lead information up to date

                    **Acceptance Criteria:**
                    - Form at /app/leads/:id/edit pre-populated with lead data
                    - All fields editable
                    - Save button updates lead via PUT /api/leads/:id
                    - Back button returns to lead list

                    **Technical Notes:**
                    - Same LeadFormPage component in edit mode
                    - Permission: leadsManage required
                """),
                "priority": 1,
            },
            {
                "name": "Lead qualification scoring (CQVS model)",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** leads scored with the CQVS qualification model
                    **So that** the team focuses on the highest-potential leads

                    **Acceptance Criteria:**
                    - CQVS scoring: Credibility, Qualification, Value, Strategic fit
                    - Score displayed on lead detail and list views
                    - Score thresholds configurable at /app/settings/qualification-thresholds
                    - Qualification policy defined at /app/settings/qualification-policy

                    **Technical Notes:**
                    - ILeadScoringService handles scoring logic
                    - QualificationPolicyPage + QualificationThresholdsPage in settings
                    - Backend: scoring algorithm in Infrastructure layer
                """),
                "priority": 2,
            },
            {
                "name": "AI-powered lead scoring",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** AI to predict lead conversion probability
                    **So that** we prioritize high-value leads automatically

                    **Acceptance Criteria:**
                    - AI score (0-100) computed for each lead
                    - Score considers: engagement history, firmographics, behavior
                    - AI score visible alongside CQVS score
                    - Model retrains periodically on conversion data

                    **Technical Notes:**
                    - ILeadScoringService with ML-based scoring
                    - Three scoring implementations found in codebase
                    - Azure AI Foundry integration
                """),
                "priority": 2,
            },
            {
                "name": "Import leads from CSV/Excel",
                "description": textwrap.dedent("""\
                    **As a** sales operations user
                    **I want to** bulk-import leads from a file
                    **So that** I can onboard leads from external sources quickly

                    **Acceptance Criteria:**
                    - Import page at /app/leads/import
                    - Upload CSV or Excel file
                    - Column mapping UI to match file columns to lead fields
                    - Preview and validate before import
                    - Import job progress tracking

                    **Technical Notes:**
                    - ILeadImportService handles file parsing and validation
                    - ImportJobsController tracks job status
                    - Route: /app/leads/import
                """),
                "priority": 2,
            },
            {
                "name": "Convert lead to opportunity, customer, or contact",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** convert a qualified lead into an opportunity, customer, or contact
                    **So that** the lead progresses into the sales pipeline

                    **Acceptance Criteria:**
                    - Convert page at /app/leads/:id/convert
                    - Options to create: Opportunity, Customer, Contact, or any combination
                    - Lead data pre-fills the new records
                    - Original lead marked as converted
                    - Audit trail of conversion

                    **Technical Notes:**
                    - LeadConvertPage component
                    - ILeadService.ConvertAsync
                    - Permission: leadsManage required
                """),
                "priority": 1,
            },
            {
                "name": "Lead assignment rules",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** configure automatic lead assignment rules
                    **So that** new leads are routed to the right salesperson

                    **Acceptance Criteria:**
                    - Rules page at /app/settings/lead-assignment
                    - Rules based on: territory, lead source, industry, round-robin
                    - Edit rule at /app/settings/lead-assignment/:id/edit
                    - Rules execute automatically on lead creation

                    **Technical Notes:**
                    - LeadAssignmentRulesController + LeadAssignmentPage
                    - Backend applies rules in ILeadService on create
                    - Permission: leadsManage required
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 4: Contact Management
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Contact Management",
        "description": textwrap.dedent("""\
            Manage contacts associated with customers and opportunities.

            **Built Components:**
            - Frontend: ContactsPage, ContactFormPage
            - Backend: ContactsController, IContactService, IContactImportService
            - Routes: /app/contacts, /app/contacts/new, /app/contacts/:id/edit
            - Status: REAL API (not mocked)

            **Architecture:** ContactsController → IContactService → ContactService (Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Contact list with search and pagination",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** view and search all contacts
                    **So that** I can find the right person to reach out to

                    **Acceptance Criteria:**
                    - Contact list at /app/contacts with PrimeNG data table
                    - Search by name, email, company, phone
                    - Server-side pagination
                    - Avatar, name, company, role displayed per row
                    - Action buttons: edit, view details

                    **Technical Notes:**
                    - ContactsPage with signals
                    - GET /api/contacts (IContactService.SearchAsync)
                    - Real API (not mocked)
                    - Permission: contactsView
                """),
                "priority": 1,
            },
            {
                "name": "Create new contact",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** create a new contact
                    **So that** I can track people associated with my accounts

                    **Acceptance Criteria:**
                    - Form at /app/contacts/new
                    - Fields: name, email, phone, company, title, address
                    - Associate contact with a customer account
                    - Validation and success notification

                    **Technical Notes:**
                    - ContactFormPage component
                    - POST /api/contacts (IContactService.CreateAsync)
                    - Permission: contactsManage
                """),
                "priority": 1,
            },
            {
                "name": "Edit existing contact",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** edit a contact's details
                    **So that** contact information stays current

                    **Acceptance Criteria:**
                    - Form at /app/contacts/:id/edit pre-populated
                    - All fields editable
                    - Save triggers PUT /api/contacts/:id
                    - Back navigation to contact list

                    **Technical Notes:**
                    - Same ContactFormPage in edit mode
                    - Permission: contactsManage
                """),
                "priority": 1,
            },
            {
                "name": "Contact import from CSV/Excel",
                "description": textwrap.dedent("""\
                    **As a** sales operations user
                    **I want to** bulk-import contacts from a file
                    **So that** I can onboard contacts from external systems

                    **Acceptance Criteria:**
                    - Upload CSV/Excel with contact data
                    - Column mapping and preview
                    - Duplicate detection during import
                    - Import progress and error report

                    **Technical Notes:**
                    - IContactImportService handles parsing
                    - ImportJobsController for job tracking
                """),
                "priority": 3,
            },
            {
                "name": "Buying roles and account history",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** assign buying roles to contacts
                    **So that** I know each contact's influence in the buying process

                    **Acceptance Criteria:**
                    - Buying role field on contact (Decision Maker, Influencer, Champion, etc.)
                    - Account history showing interactions and timeline
                    - Contact linked to opportunities where they're involved

                    **Technical Notes:**
                    - Contact entity has buying role property
                    - History tracked via AuditableEntity timestamps
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 5: Customer Management
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Customer Management",
        "description": textwrap.dedent("""\
            Customer workspace for managing accounts and customer lifecycle.

            **Built Components:**
            - Frontend: CustomersPage (workspace), CustomerFormPage (create/edit)
            - Backend: CustomersController, ICustomerService, ICustomerImportService
            - Routes: /app/customers, /app/customers/new, /app/customers/:id/edit
            - Mock: CRUD operations (searchCustomers, mockCustomers in mock-db.ts)

            **Architecture:** CustomersController → ICustomerService → CustomerService (Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Customer workspace with search and pagination",
                "description": textwrap.dedent("""\
                    **As a** account manager
                    **I want to** view all customers in a searchable workspace
                    **So that** I can find and manage my accounts

                    **Acceptance Criteria:**
                    - Customer list at /app/customers with PrimeNG data table
                    - Hero section with KPI metric cards (total, active, leads, new)
                    - Search by name, email, company
                    - Filter by status (lead, prospect, customer, inactive)
                    - Avatar with initials, status badges, company info per row
                    - Glassmorphism design with animated background orbs

                    **Technical Notes:**
                    - CustomersPage is the reference implementation for list page design
                    - Uses Angular signals for reactive state
                    - Mock: searchCustomers() with pagination in mock-db.ts
                    - Permission: customersView
                """),
                "priority": 1,
            },
            {
                "name": "Create new customer",
                "description": textwrap.dedent("""\
                    **As an** account manager
                    **I want to** create a new customer record
                    **So that** the account is tracked in the system

                    **Acceptance Criteria:**
                    - Form at /app/customers/new
                    - Premium glass form with section cards
                    - Fields: company name, contact info, industry, status, address
                    - Validation and success toast notification
                    - Redirect to customer list after save

                    **Technical Notes:**
                    - CustomerFormPage component
                    - POST create via mock API
                    - Uses form-page-styles mixin
                    - Permission: customersManage
                """),
                "priority": 1,
            },
            {
                "name": "Edit existing customer",
                "description": textwrap.dedent("""\
                    **As an** account manager
                    **I want to** edit a customer's details
                    **So that** account information remains accurate

                    **Acceptance Criteria:**
                    - Form at /app/customers/:id/edit pre-populated with customer data
                    - All fields editable
                    - Save button submits changes
                    - Back link to customer list

                    **Technical Notes:**
                    - Same CustomerFormPage in edit mode
                    - GET /api/customers/:id → PUT /api/customers/:id
                    - Permission: customersManage
                """),
                "priority": 1,
            },
            {
                "name": "Customer status lifecycle management",
                "description": textwrap.dedent("""\
                    **As an** account manager
                    **I want** customer status to reflect lifecycle stage
                    **So that** I can segment and track account progression

                    **Acceptance Criteria:**
                    - Statuses: Lead, Prospect, Customer, Inactive
                    - Status badge colors match design system
                    - Status transition rules (e.g., Lead → Prospect → Customer)
                    - Filter workspace by status

                    **Technical Notes:**
                    - Status enum in Domain layer
                    - statusSeverity() helper for PrimeNG badge colors
                    - Mock data includes all status types
                """),
                "priority": 2,
            },
            {
                "name": "Customer import from CSV/Excel",
                "description": textwrap.dedent("""\
                    **As a** sales operations user
                    **I want to** bulk-import customer records
                    **So that** I can migrate from another system

                    **Acceptance Criteria:**
                    - Upload CSV/Excel file
                    - Column mapping and duplicate detection
                    - Import progress tracking
                    - Error report for failed rows

                    **Technical Notes:**
                    - ICustomerImportService in Application layer
                    - ImportJobsController for progress
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 6: Opportunity & Deal Management
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Opportunity & Deal Management",
        "description": textwrap.dedent("""\
            End-to-end deal management: create, track, quote, and close opportunities.

            **Built Components:**
            - Frontend: OpportunitiesPage, OpportunityFormPage
            - Backend: OpportunitiesController, OpportunityQuotesController, OpportunityAutomationRulesController
            - Services: IOpportunityService, IOpportunityQuoteService, IOpportunityOnboardingService
            - Routes: /app/opportunities, /app/opportunities/new, /app/opportunities/:id/edit
            - Mock: Full CRUD (searchOpportunities, createOpportunity, etc.)

            **Architecture:** OpportunitiesController → IOpportunityService → OpportunityService (Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Opportunity list with stage filtering",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** view all my deals with stage filtering
                    **So that** I can focus on deals at different pipeline stages

                    **Acceptance Criteria:**
                    - Deal list at /app/opportunities with PrimeNG table
                    - Filter by stage (Qualification, Proposal, Negotiation, Closed Won, etc.)
                    - Search by deal name, customer, amount
                    - Server-side pagination
                    - Value, probability, expected close date columns

                    **Technical Notes:**
                    - OpportunitiesPage component
                    - Mock: searchOpportunities() in mock-db.ts
                    - Permission: opportunitiesView
                """),
                "priority": 1,
            },
            {
                "name": "Create new deal",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** create a new opportunity/deal
                    **So that** I can track it through the sales pipeline

                    **Acceptance Criteria:**
                    - Form at /app/opportunities/new
                    - Fields: name, customer, stage, amount, probability, close date, description
                    - Associate with customer and contacts
                    - Success notification and redirect to deal list

                    **Technical Notes:**
                    - OpportunityFormPage component
                    - POST /api/opportunities (SaveOpportunityRequest)
                    - Mock: createOpportunity() in mock-db.ts
                    - Permission: opportunitiesManage
                """),
                "priority": 1,
            },
            {
                "name": "Edit existing deal",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** edit an existing deal
                    **So that** I can update stage, value, and other fields as the deal progresses

                    **Acceptance Criteria:**
                    - Form at /app/opportunities/:id/edit pre-populated
                    - All fields editable
                    - Stage change triggers workflow (if automation rules configured)
                    - Save confirmation

                    **Technical Notes:**
                    - Same OpportunityFormPage in edit mode
                    - PUT /api/opportunities/:id
                    - Mock: updateOpportunity()
                    - Permission: opportunitiesManage
                """),
                "priority": 1,
            },
            {
                "name": "Opportunity pipeline stages",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** canonical pipeline stages for deals
                    **So that** the team follows a consistent sales process

                    **Acceptance Criteria:**
                    - Default stages seeded by DatabaseInitializer
                    - Stages: Qualification, Discovery, Proposal, Negotiation, Closed Won, Closed Lost
                    - Stage displayed in list and form views
                    - Stage progression tracked in audit log

                    **Technical Notes:**
                    - DatabaseInitializer seeds canonical stages on startup
                    - OpportunityStage entity in Domain layer
                """),
                "priority": 2,
            },
            {
                "name": "Opportunity quotes (CPQ)",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** create and manage quotes for opportunities
                    **So that** I can provide pricing proposals to customers

                    **Acceptance Criteria:**
                    - Create quotes linked to an opportunity
                    - Quote line items with products, quantities, prices
                    - Quote versioning (draft, sent, accepted, rejected)
                    - Quote total calculation

                    **Technical Notes:**
                    - OpportunityQuotesController
                    - IOpportunityQuoteService in Application layer
                    - NEW service (recently added to codebase)
                """),
                "priority": 2,
            },
            {
                "name": "Opportunity onboarding workflow",
                "description": textwrap.dedent("""\
                    **As a** sales operations manager
                    **I want** a structured onboarding workflow for won deals
                    **So that** new customers are set up properly

                    **Acceptance Criteria:**
                    - Onboarding steps defined per deal type
                    - Checklist of onboarding tasks
                    - Progress tracking per opportunity
                    - Completion triggers status update

                    **Technical Notes:**
                    - IOpportunityOnboardingService
                    - OpportunityOnboardingController
                    - Linked to review checklist
                """),
                "priority": 3,
            },
            {
                "name": "Deal automation rules",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** configure automation rules for deal lifecycle events
                    **So that** routine tasks are handled automatically

                    **Acceptance Criteria:**
                    - Automation rules page at /app/settings/opportunity-automation
                    - Rules triggered by: stage change, amount threshold, inactivity
                    - Actions: assign owner, send notification, create task, require approval
                    - Enable/disable rules

                    **Technical Notes:**
                    - OpportunityAutomationRulesController
                    - OpportunityAutomationPage in settings
                    - Permission: opportunitiesManage
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 7: Deal Approvals & Decision Inbox
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Deal Approvals & Decision Inbox",
        "description": textwrap.dedent("""\
            Centralized decision inbox for deal approvals, reviews, and governance.

            **Built Components:**
            - Frontend: Decision routing under /app/decisions (pending-action, policies, audit)
            - Backend: DecisionsController, OpportunityApprovalsController, OpportunityReviewChecklistController
            - Services: IDecisionInboxService, IOpportunityApprovalService, IOpportunityReviewChecklistService
            - Status: REAL API

            **Architecture:** DecisionsController → IDecisionInboxService
        """),
        "priority": 2,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Decision inbox with pending actions",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** a centralized inbox for pending decisions
                    **So that** I can quickly act on items requiring my approval

                    **Acceptance Criteria:**
                    - Inbox at /app/decisions/pending-action
                    - Lists all pending approvals assigned to current user
                    - Items sortable by priority, date, deal value
                    - Quick actions: approve, reject, request info

                    **Technical Notes:**
                    - Redirects: /app/decisions → pending-action, /app/decisions/inbox → pending-action
                    - /app/opportunities/approvals → decisions/pending-action
                    - IDecisionInboxService.GetPendingAsync
                """),
                "priority": 2,
            },
            {
                "name": "Approve, reject, or escalate deals",
                "description": textwrap.dedent("""\
                    **As a** approver
                    **I want to** approve, reject, or escalate deal requests
                    **So that** deals proceed through the governance process

                    **Acceptance Criteria:**
                    - Action buttons on each pending item
                    - Comment field for approval/rejection reason
                    - Escalation routes to next-level approver
                    - Notification sent to deal owner on decision

                    **Technical Notes:**
                    - OpportunityApprovalsController
                    - IOpportunityApprovalService handles state transitions
                    - SignalR CrmEventsHub for real-time notification
                """),
                "priority": 2,
            },
            {
                "name": "Decision history and audit trail",
                "description": textwrap.dedent("""\
                    **As a** compliance officer
                    **I want to** view the complete history of all decisions
                    **So that** I can audit approval processes

                    **Acceptance Criteria:**
                    - History page at /app/decisions/audit
                    - All past decisions with timestamp, approver, action, comments
                    - Filterable by date range, approver, deal
                    - Export to CSV/PDF

                    **Technical Notes:**
                    - DecisionHistoryPage component
                    - IAuditEventService for audit trail
                """),
                "priority": 3,
            },
            {
                "name": "Policies and SLA controls",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** define approval policies and SLA rules
                    **So that** deals follow governance requirements

                    **Acceptance Criteria:**
                    - Policies page at /app/decisions/policies
                    - Define approval thresholds (e.g., deals > $100K need VP approval)
                    - SLA timers for response time
                    - Escalation rules for overdue approvals
                    - Approval settings at /app/settings/approvals

                    **Technical Notes:**
                    - DecisionPoliciesSlaPage component
                    - ApprovalSettingsPage in settings
                """),
                "priority": 3,
            },
            {
                "name": "Review checklist management",
                "description": textwrap.dedent("""\
                    **As a** deal reviewer
                    **I want** a structured review checklist for high-value deals
                    **So that** all due diligence steps are completed

                    **Acceptance Criteria:**
                    - Checklist items per deal type
                    - Check/uncheck items as review progresses
                    - All items must be checked before approval
                    - Checklist template configurable by admin

                    **Technical Notes:**
                    - OpportunityReviewChecklistController
                    - IOpportunityReviewChecklistService
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 8: Activity Management
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Activity Management",
        "description": textwrap.dedent("""\
            Track calls, emails, meetings, and tasks related to CRM records.

            **Built Components:**
            - Frontend: ActivitiesPage (list/calendar/task views), ActivityFormPage
            - Backend: ActivitiesController, IActivityService
            - Routes: /app/activities, /app/activities/calendar, /app/activities/tasks, /app/activities/new, /app/activities/:id/edit
            - Mock: searchActivities()

            **Architecture:** ActivitiesController → IActivityService → ActivityService (Infrastructure)
        """),
        "priority": 2,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "Activity list with filtering",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** view all activities in a filterable list
                    **So that** I can track my engagements with customers

                    **Acceptance Criteria:**
                    - Activity list at /app/activities
                    - Filter by type (call, email, meeting, task), status, owner
                    - Search by subject or description
                    - Server-side pagination
                    - Date, type, subject, related record columns

                    **Technical Notes:**
                    - ActivitiesPage component with view toggle
                    - Mock: searchActivities() in mock-db.ts
                    - Permission: activitiesView
                """),
                "priority": 2,
            },
            {
                "name": "Calendar view for activities",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** view activities on a calendar
                    **So that** I can manage my schedule visually

                    **Acceptance Criteria:**
                    - Calendar view at /app/activities/calendar
                    - Month, week, day views
                    - Activities shown as calendar events
                    - Click event to view/edit activity
                    - Drag to reschedule

                    **Technical Notes:**
                    - Same ActivitiesPage with calendar mode
                    - PrimeNG or FullCalendar integration
                """),
                "priority": 2,
            },
            {
                "name": "Task management view",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want** a dedicated task view
                    **So that** I can manage my to-do items separately

                    **Acceptance Criteria:**
                    - Task view at /app/activities/tasks
                    - Filter by status (pending, completed, overdue)
                    - Quick complete toggle
                    - Due date and priority sorting

                    **Technical Notes:**
                    - Same ActivitiesPage with task filter
                    - Route: /app/activities/tasks
                """),
                "priority": 3,
            },
            {
                "name": "Create new activity",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** log a new activity (call, email, meeting, task)
                    **So that** customer interactions are recorded

                    **Acceptance Criteria:**
                    - Form at /app/activities/new
                    - Fields: type, subject, date/time, duration, description, related record
                    - Associate activity with lead, contact, customer, or opportunity
                    - Validation and success notification

                    **Technical Notes:**
                    - ActivityFormPage component
                    - POST /api/activities
                    - Permission: activitiesManage
                """),
                "priority": 2,
            },
            {
                "name": "Edit existing activity",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** edit an existing activity
                    **So that** I can update details or outcomes

                    **Acceptance Criteria:**
                    - Form at /app/activities/:id/edit pre-populated
                    - All fields editable
                    - Mark activity as completed
                    - Add outcome notes

                    **Technical Notes:**
                    - Same ActivityFormPage in edit mode
                    - PUT /api/activities/:id
                    - Permission: activitiesManage
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 9: Marketing & Campaigns
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Marketing & Campaigns",
        "description": textwrap.dedent("""\
            Campaign management and marketing attribution analytics.

            **Built Components:**
            - Frontend: CampaignsPage, CampaignFormPage, CampaignDetailPage, CampaignAttributionPage
            - Backend: MarketingController, ICampaignAttributionService, IMarketingService
            - Routes: /app/marketing/campaigns (list/new/edit/:id), /app/marketing/attribution
            - Status: REAL API (behind tenant feature flag: marketing.campaigns)

            **Architecture:** MarketingController → IMarketingService + ICampaignAttributionService
        """),
        "priority": 2,
        "tags": ["built", "feature"],
        "stories": [
            {
                "name": "Campaign list with search and filter",
                "description": textwrap.dedent("""\
                    **As a** marketing manager
                    **I want to** view all campaigns
                    **So that** I can track campaign status and performance

                    **Acceptance Criteria:**
                    - Campaign list at /app/marketing/campaigns
                    - Search by campaign name
                    - Filter by status, type, date range
                    - Columns: name, status, type, budget, start/end date
                    - Gated by tenant feature flag: marketing.campaigns

                    **Technical Notes:**
                    - CampaignsPage component
                    - tenantFeatureGuard checks feature flag
                    - Permission: marketingView
                """),
                "priority": 2,
            },
            {
                "name": "Create and edit campaigns",
                "description": textwrap.dedent("""\
                    **As a** marketing manager
                    **I want to** create and edit marketing campaigns
                    **So that** I can plan and manage marketing efforts

                    **Acceptance Criteria:**
                    - Create form at /app/marketing/campaigns/new
                    - Edit form at /app/marketing/campaigns/:id/edit
                    - Fields: name, type, status, budget, start/end dates, description
                    - Campaign type options (email, social, event, etc.)

                    **Technical Notes:**
                    - CampaignFormPage component
                    - Permission: marketingManage
                """),
                "priority": 2,
            },
            {
                "name": "Campaign detail and performance",
                "description": textwrap.dedent("""\
                    **As a** marketing manager
                    **I want to** view campaign detail and performance metrics
                    **So that** I can evaluate campaign effectiveness

                    **Acceptance Criteria:**
                    - Detail page at /app/marketing/campaigns/:id
                    - Shows campaign info, associated leads, and conversions
                    - Performance metrics: reach, engagement, conversion rate
                    - Timeline of campaign activities

                    **Technical Notes:**
                    - CampaignDetailPage component
                    - Permission: marketingView
                """),
                "priority": 2,
            },
            {
                "name": "Campaign attribution analytics",
                "description": textwrap.dedent("""\
                    **As a** marketing manager
                    **I want to** see attribution analytics across campaigns
                    **So that** I know which campaigns drive the most revenue

                    **Acceptance Criteria:**
                    - Attribution page at /app/marketing/attribution
                    - Attribution models: first-touch, last-touch, multi-touch
                    - Revenue attributed per campaign
                    - Visualization: charts and tables

                    **Technical Notes:**
                    - CampaignAttributionPage component
                    - ICampaignAttributionService backend
                    - Permission: marketingView
                """),
                "priority": 3,
            },
            {
                "name": "Marketing settings configuration",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** configure marketing module settings
                    **So that** the marketing features align with our processes

                    **Acceptance Criteria:**
                    - Settings page at /app/settings/marketing
                    - Configure default campaign types
                    - Set budget thresholds and approval rules
                    - Enable/disable marketing features per tenant

                    **Technical Notes:**
                    - MarketingSettingsPage component
                    - Gated by tenant feature flag
                    - Permission: administrationView
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 10: AI Assistant & Intelligence
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "AI Assistant & Intelligence",
        "description": textwrap.dedent("""\
            AI-powered assistant with knowledge grounding, lead scoring, and CRM action execution.

            **Built Components:**
            - Backend: AssistantController, AgentToolsController
            - Services: IAssistantChatService (Azure AI Foundry), ILeadScoringService
            - Knowledge: AzureSearchKnowledgeClient for grounded responses
            - Agent: FoundryAgentClient for tool-based actions

            **Architecture:** AssistantController → IAssistantChatService → Azure AI Foundry + Azure AI Search
        """),
        "priority": 2,
        "tags": ["built", "ai"],
        "stories": [
            {
                "name": "AI assistant chat interface",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** chat with an AI assistant
                    **So that** I can get quick answers about my CRM data

                    **Acceptance Criteria:**
                    - Chat panel accessible from the shell/sidebar
                    - Natural language queries about leads, deals, customers
                    - Conversational responses with data context
                    - Chat history within session

                    **Technical Notes:**
                    - AssistantController handles chat requests
                    - IAssistantChatService integrates with Azure AI Foundry
                    - Frontend: chat drawer/panel component
                """),
                "priority": 2,
            },
            {
                "name": "Knowledge-grounded AI responses",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want** AI responses grounded in CRM documentation and data
                    **So that** answers are accurate and relevant

                    **Acceptance Criteria:**
                    - AI retrieves relevant docs from Azure AI Search index
                    - Responses cite sources when applicable
                    - Knowledge base includes product docs, help articles, CRM data

                    **Technical Notes:**
                    - AzureSearchKnowledgeClient for RAG (Retrieval-Augmented Generation)
                    - Knowledge manifest built by scripts/build_ai_knowledge_manifest.py
                    - Index managed by scripts/setup_ai_knowledge_search_index.py
                """),
                "priority": 3,
            },
            {
                "name": "AI-powered CRM action execution",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want** the AI assistant to execute CRM actions on my behalf
                    **So that** I can perform tasks via natural language commands

                    **Acceptance Criteria:**
                    - Commands: "Create a lead for X", "Show my pipeline", "Update deal Y"
                    - AI translates intent to CRM API calls
                    - Confirmation before destructive actions
                    - Action results displayed in chat

                    **Technical Notes:**
                    - AgentToolsController exposes available tools
                    - FoundryAgentClient orchestrates tool calls
                    - Tools map to existing CRM API endpoints
                """),
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 11: Settings & Administration
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Settings & Administration",
        "description": textwrap.dedent("""\
            System administration: users, roles, permissions, workspace, tenants.

            **Built Components:**
            - Frontend: SettingsPage (users/roles/permissions/teams/security/dashboard-packs),
              UserEditPage, RoleFormPage, InviteUserPage, WorkspaceSettingsPage, ApprovalSettingsPage,
              NotificationsPage, AuditLogPage, TenantsPage, TenantCreatePage
            - Backend: UsersController, RolesController, SecurityLevelsController, WorkspaceController,
              NotificationPreferencesController, TenantsController, AuditController,
              SystemCurrenciesController, SystemPhoneTypesController, SystemTimeZonesController
            - Routes: /app/settings/** (20+ sub-routes)
            - Mock: users CRUD, roles CRUD, workspace settings, permissions

            **Architecture:** Controllers → Application services → Infrastructure services
        """),
        "priority": 1,
        "tags": ["built", "core"],
        "stories": [
            {
                "name": "User management (list, create, edit, deactivate)",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** manage all system users
                    **So that** I can control access and maintain the team roster

                    **Acceptance Criteria:**
                    - User list at /app/settings/users
                    - Search and filter users (include inactive toggle)
                    - Edit user at /app/settings/users/:id/edit
                    - Activate/deactivate users
                    - Reset user password
                    - Delete user

                    **Technical Notes:**
                    - SettingsPage with user tab, UserEditPage for edit
                    - Mock: searchUsers, createUser, updateUser, deleteUser, resetUserPassword, setUserActiveStatus
                    - Permission: administrationView/administrationManage
                """),
                "priority": 1,
            },
            {
                "name": "User invitation flow",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** invite new users via email
                    **So that** team members can join the CRM workspace

                    **Acceptance Criteria:**
                    - Invite form at /app/settings/invite
                    - Enter email, select role
                    - System sends invitation email with setup link
                    - Invited user accepts at /accept-invite

                    **Technical Notes:**
                    - InviteUserPage component
                    - Permission: administrationManage
                """),
                "priority": 2,
            },
            {
                "name": "Role management with permissions",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** create and manage roles with granular permissions
                    **So that** I can control feature access per role

                    **Acceptance Criteria:**
                    - Role list at /app/settings/roles
                    - Create role at /app/settings/roles/new
                    - Edit role at /app/settings/roles/:id/edit
                    - Assign permissions per feature area (leads, contacts, etc.)
                    - Permission definitions from /api/roles/permissions
                    - Delete role (with protection for built-in roles)

                    **Technical Notes:**
                    - RoleFormPage component with permission grid
                    - Mock: listRoles, createRole, updateRole, deleteRole, getPermissionDefinitions
                    - PERMISSION_KEYS constants define all available permissions
                """),
                "priority": 1,
            },
            {
                "name": "Workspace settings",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** configure workspace-level settings
                    **So that** the CRM reflects our organization's preferences

                    **Acceptance Criteria:**
                    - Settings page at /app/settings/workspace
                    - Configure: company name, logo, timezone, currency, date format
                    - Settings apply globally to all users
                    - Save confirmation

                    **Technical Notes:**
                    - WorkspaceSettingsPage component
                    - Mock: getWorkspaceSettings, updateWorkspaceSettings
                    - WorkspaceController backend
                    - Permission: administrationManage
                """),
                "priority": 2,
            },
            {
                "name": "Tenant configuration and provisioning",
                "description": textwrap.dedent("""\
                    **As a** platform administrator
                    **I want to** manage tenants and provision new ones
                    **So that** the platform supports multi-tenancy

                    **Acceptance Criteria:**
                    - Tenant list at /app/settings/tenants
                    - Create tenant at /app/settings/tenants/new
                    - Configure tenant features, limits, and settings
                    - Tenant data isolation enforced

                    **Technical Notes:**
                    - TenantsPage, TenantCreatePage components
                    - TenantsController, ITenantProvisioningService
                    - TenantContextController for context resolution
                    - Permission: tenantsView/tenantsManage
                """),
                "priority": 2,
            },
            {
                "name": "Notification preferences",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** configure my notification preferences
                    **So that** I receive relevant alerts without noise

                    **Acceptance Criteria:**
                    - Preferences page at /app/settings/notifications
                    - Toggle notifications per event type (deal updates, approvals, assignments)
                    - Channel preferences (in-app, email)
                    - Quiet hours configuration

                    **Technical Notes:**
                    - NotificationsPage component
                    - NotificationPreferencesController backend
                    - Permission: administrationView
                """),
                "priority": 3,
            },
            {
                "name": "Audit log viewer",
                "description": textwrap.dedent("""\
                    **As a** compliance administrator
                    **I want to** view the system audit log
                    **So that** I can monitor all significant actions

                    **Acceptance Criteria:**
                    - Audit log at /app/settings/audit-log
                    - Filter by user, action type, entity, date range
                    - Each entry shows: who, what, when, entity affected
                    - Pagination for large result sets

                    **Technical Notes:**
                    - AuditLogPage component
                    - AuditController, IAuditEventService
                    - CrmDbContext stamps CreatedAtUtc/UpdatedAtUtc via SaveChanges hook
                    - Permission: auditView
                """),
                "priority": 2,
            },
            {
                "name": "Security levels configuration",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** configure security levels for data classification
                    **So that** sensitive records have appropriate access controls

                    **Acceptance Criteria:**
                    - Security levels page at /app/settings/security-levels
                    - Define levels: Public, Internal, Confidential, Restricted
                    - Assign security levels to records
                    - Access filtered by user's clearance

                    **Technical Notes:**
                    - SecurityLevelsController
                    - SettingsPage with security-levels tab
                    - Permission: administrationManage
                """),
                "priority": 3,
            },
            {
                "name": "System reference data (currencies, phone types, timezones)",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want** system reference data managed centrally
                    **So that** all CRM records use consistent reference values

                    **Acceptance Criteria:**
                    - System currencies list and management
                    - Phone type definitions (Work, Mobile, Home, etc.)
                    - Timezone list for user/workspace settings

                    **Technical Notes:**
                    - SystemCurrenciesController, SystemPhoneTypesController, SystemTimeZonesController
                    - Reference data seeded by DatabaseInitializer
                """),
                "priority": 4,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 12: Real-Time & Notifications
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Real-Time & Notifications",
        "description": textwrap.dedent("""\
            Live notifications and presence tracking via SignalR.

            **Built Components:**
            - Backend: PresenceHub, CrmEventsHub (SignalR)
            - Controllers: NotificationsController, NotificationPreferencesController
            - Frontend: Notification UI components

            **Architecture:** SignalR hubs for real-time communication, NotificationsController for persistence
        """),
        "priority": 2,
        "tags": ["built", "infrastructure"],
        "stories": [
            {
                "name": "Real-time user presence tracking",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** see who's currently online
                    **So that** I know which team members are available

                    **Acceptance Criteria:**
                    - Online status indicator in shell/sidebar
                    - User appears online when connected via PresenceHub
                    - Status updates in real-time (connect/disconnect)
                    - Shows list of online team members

                    **Technical Notes:**
                    - PresenceHub (SignalR) manages connections
                    - OnConnectedAsync/OnDisconnectedAsync track presence
                """),
                "priority": 3,
            },
            {
                "name": "Live CRM event notifications",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want to** receive real-time notifications for CRM events
                    **So that** I stay informed without refreshing

                    **Acceptance Criteria:**
                    - Toast/bell notifications for: new lead assigned, deal stage change, approval needed
                    - Notification badge count in header
                    - Click notification to navigate to relevant record
                    - Mark as read functionality

                    **Technical Notes:**
                    - CrmEventsHub broadcasts events to connected clients
                    - NotificationsController for persistence and history
                    - Frontend subscribes to hub events on login
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # EPIC 13: Platform Infrastructure
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "Platform Infrastructure",
        "description": textwrap.dedent("""\
            Core platform capabilities: multi-tenancy, RBAC, audit, data isolation.

            **Built Components:**
            - Multi-tenant architecture with tenant context resolution
            - RBAC with PERMISSION_KEYS and role guards
            - AuditableEntity base class for automatic timestamps
            - DatabaseInitializer for migrations and seed data
            - Mock API interceptor for offline development

            **Architecture:** Clean Architecture (4-layer: Api → Application → Domain ← Infrastructure)
        """),
        "priority": 1,
        "tags": ["built", "infrastructure"],
        "stories": [
            {
                "name": "Multi-tenant data isolation",
                "description": textwrap.dedent("""\
                    **As a** platform operator
                    **I want** tenant data isolated at the database level
                    **So that** each organization's data is secure and separate

                    **Acceptance Criteria:**
                    - All queries filtered by TenantId automatically
                    - Tenant context resolved from JWT token
                    - Cross-tenant access prevented
                    - Tenant-specific feature flags

                    **Technical Notes:**
                    - TenantContextController resolves tenant
                    - CrmDbContext applies tenant filter
                    - tenantFeatureGuard checks feature flags per tenant
                """),
                "priority": 1,
            },
            {
                "name": "Clean Architecture enforcement",
                "description": textwrap.dedent("""\
                    **As a** developer
                    **I want** the codebase to follow Clean Architecture strictly
                    **So that** the system is maintainable and testable

                    **Acceptance Criteria:**
                    - Domain: entities, enums, value objects (no dependencies)
                    - Application: interfaces, DTOs (depends on Domain only)
                    - Infrastructure: implementations, DbContext (depends on Application + Domain)
                    - Api: controllers, contracts (depends on Application only)
                    - Controllers never inject DbContext directly
                    - DI registration in AddApplication() + AddInfrastructure()

                    **Technical Notes:**
                    - 79 domain entities, 168 migrations
                    - 30+ application service interfaces
                    - 39 API controllers
                    - Program.cs wires AddApplication() + AddInfrastructure()
                """),
                "priority": 2,
            },
            {
                "name": "Database seeding and initialization",
                "description": textwrap.dedent("""\
                    **As a** developer
                    **I want** the database auto-initialized on startup
                    **So that** development and new deployments work immediately

                    **Acceptance Criteria:**
                    - Migrations applied automatically on startup
                    - Default roles seeded (System Administrator, etc.)
                    - Admin user seeded with default credentials
                    - Pipeline stages and reference data seeded

                    **Technical Notes:**
                    - DatabaseInitializer runs in Program.cs startup scope
                    - Seeds roles, admin user, lead/opportunity stages
                    - Connection string in appsettings.Development.json
                """),
                "priority": 2,
            },
            {
                "name": "Mock API layer for offline development",
                "description": textwrap.dedent("""\
                    **As a** frontend developer
                    **I want** a mock API layer for offline development
                    **So that** I can build UI features without the backend running

                    **Acceptance Criteria:**
                    - environment.useMockApi toggles mock mode
                    - Mock interceptor handles: auth, customers, opportunities, activities, users, roles, workspace, suppliers, dashboard
                    - Mock data in mock-db.ts with realistic test data
                    - Real API used for: leads, contacts, marketing, approvals, decisions, notifications

                    **Technical Notes:**
                    - mock-api.interceptor.ts (327 lines) intercepts /api/** requests
                    - mock-db.ts contains data generators and CRUD operations
                    - Toggle via environment files
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # FUTURE FEATURES — NOW TIER (Next 3-6 months)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "[NOW] Email Integration",
        "description": textwrap.dedent("""\
            Integrate email sending/receiving directly into CRM records.
            Priority: NOW (next 3-6 months) — High demand from sales team.

            **Status:** Not yet built. Frontend and backend need new components.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Send emails from CRM records",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** send emails directly from lead/contact/customer records
                    **So that** all communication is tracked in one place

                    **Acceptance Criteria:**
                    - Compose email panel on record detail pages
                    - To/CC/BCC auto-populated from record
                    - Rich text editor for email body
                    - Sent email logged as an activity
                """),
                "priority": 2,
            },
            {
                "name": "Email templates for sales outreach",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want** reusable email templates
                    **So that** I can send consistent, professional outreach

                    **Acceptance Criteria:**
                    - Template library in settings
                    - Merge fields ({{first_name}}, {{company}}, etc.)
                    - Create, edit, delete templates
                    - Select template when composing email
                """),
                "priority": 3,
            },
            {
                "name": "Email tracking (opens and clicks)",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want to** know when my emails are opened or clicked
                    **So that** I can follow up at the right time

                    **Acceptance Criteria:**
                    - Open tracking pixel embedded in sent emails
                    - Click tracking for links in email body
                    - Tracking data shown on activity record
                    - Notification when email is opened
                """),
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NOW] Report Builder",
        "description": textwrap.dedent("""\
            Build custom reports and export data.
            Priority: NOW — Critical for sales management.

            **Status:** Not yet built.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Drag-and-drop report builder",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** build custom reports by dragging fields and filters
                    **So that** I can analyze data specific to my needs

                    **Acceptance Criteria:**
                    - Report builder UI with field selector
                    - Drag fields to rows, columns, filters
                    - Preview report before saving
                    - Chart and table output options
                """),
                "priority": 2,
            },
            {
                "name": "Standard report templates",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** pre-built report templates
                    **So that** I can quickly access common reports

                    **Acceptance Criteria:**
                    - Templates: Pipeline Summary, Lead Conversion, Activity Report, Revenue Forecast
                    - One-click generation from template
                    - Template parameters (date range, filters)
                """),
                "priority": 2,
            },
            {
                "name": "Export reports to PDF and Excel",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** export reports to PDF or Excel
                    **So that** I can share them with stakeholders

                    **Acceptance Criteria:**
                    - Export button on report view
                    - PDF export with branding and formatting
                    - Excel export with raw data
                    - Download triggered from browser
                """),
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NOW] Product Catalog & CPQ",
        "description": textwrap.dedent("""\
            Product/service catalog with configure-price-quote workflow.
            Priority: NOW — Needed for quote generation on opportunities.

            **Status:** Partially built (IOpportunityQuoteService exists). Needs product catalog UI.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Product and service catalog",
                "description": textwrap.dedent("""\
                    **As a** product manager
                    **I want to** manage a catalog of products and services
                    **So that** sales can select products when creating quotes

                    **Acceptance Criteria:**
                    - Catalog management page
                    - Products with: name, SKU, description, unit price, category
                    - Active/inactive toggle
                    - Search and filter by category
                """),
                "priority": 2,
            },
            {
                "name": "Configure-Price-Quote (CPQ) workflow",
                "description": textwrap.dedent("""\
                    **As a** sales representative
                    **I want** a guided CPQ process for building quotes
                    **So that** quotes are accurate and follow pricing rules

                    **Acceptance Criteria:**
                    - Select products from catalog
                    - Configure: quantity, options, discounts
                    - Price calculated with rules (volume discounts, tiers)
                    - Quote document generated

                    **Technical Notes:**
                    - IOpportunityQuoteService already exists
                    - Extends OpportunityQuotesController
                """),
                "priority": 2,
            },
        ],
    },
    {
        "epic": "[NOW] Custom Fields",
        "description": textwrap.dedent("""\
            Admin-configurable custom fields for CRM entities.
            Priority: NOW — Every organization needs custom data fields.

            **Status:** Not yet built.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Admin UI for custom field definitions",
                "description": textwrap.dedent("""\
                    **As an** administrator
                    **I want to** define custom fields for CRM entities
                    **So that** the CRM adapts to our specific data needs

                    **Acceptance Criteria:**
                    - Custom field admin page in settings
                    - Field types: text, number, date, dropdown, checkbox, multi-select
                    - Assign fields to entities: leads, contacts, customers, opportunities
                    - Required/optional toggle
                """),
                "priority": 2,
            },
            {
                "name": "Custom fields on forms and lists",
                "description": textwrap.dedent("""\
                    **As a** CRM user
                    **I want** custom fields to appear on forms and list views
                    **So that** I can enter and see custom data

                    **Acceptance Criteria:**
                    - Custom fields rendered dynamically on create/edit forms
                    - Custom fields available as columns in list views
                    - Custom field values searchable and filterable
                    - Validation rules applied per field type
                """),
                "priority": 2,
            },
        ],
    },
    {
        "epic": "[NOW] Web-to-Lead Forms",
        "description": textwrap.dedent("""\
            Embeddable lead capture forms for websites.
            Priority: NOW — Direct lead generation capability.

            **Status:** Not yet built.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Embeddable lead capture form builder",
                "description": textwrap.dedent("""\
                    **As a** marketing manager
                    **I want to** create embeddable web forms for lead capture
                    **So that** website visitors become leads automatically

                    **Acceptance Criteria:**
                    - Form builder in CRM with field selection
                    - Generate embed code (HTML/JS snippet)
                    - Form submission creates a lead in CRM
                    - Custom thank-you page URL
                    - CAPTCHA/spam protection
                """),
                "priority": 2,
            },
            {
                "name": "Auto-assign captured leads",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want** web-captured leads automatically assigned
                    **So that** they're followed up on immediately

                    **Acceptance Criteria:**
                    - Web leads processed by lead assignment rules
                    - Lead source marked as "Web Form"
                    - Notification sent to assigned sales rep
                    - Lead tagged with form name for tracking
                """),
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NOW] Scheduled Reports & Webhooks",
        "description": textwrap.dedent("""\
            Automated report delivery and webhook integrations.
            Priority: NOW — Essential for operational workflows.

            **Status:** Not yet built.
        """),
        "priority": 2,
        "tags": ["future", "now"],
        "stories": [
            {
                "name": "Schedule recurring report delivery",
                "description": textwrap.dedent("""\
                    **As a** sales manager
                    **I want to** schedule reports to be emailed automatically
                    **So that** I receive key metrics without manual effort

                    **Acceptance Criteria:**
                    - Schedule frequency: daily, weekly, monthly
                    - Select report and recipients
                    - Email delivery with attached PDF/Excel
                    - Manage/pause/delete schedules
                """),
                "priority": 2,
            },
            {
                "name": "Webhook configuration for CRM events",
                "description": textwrap.dedent("""\
                    **As a** system integrator
                    **I want to** configure webhooks for CRM events
                    **So that** external systems can react to CRM changes

                    **Acceptance Criteria:**
                    - Webhook management page in settings
                    - Configure URL, events, authentication
                    - Events: lead created, deal stage changed, customer updated
                    - Retry logic for failed deliveries
                    - Execution logs with status
                """),
                "priority": 2,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # FUTURE FEATURES — NEXT TIER (6-12 months)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "[NEXT] Contract Management",
        "description": textwrap.dedent("""\
            Contract lifecycle management linked to opportunities.
            Priority: NEXT (6-12 months).

            **Status:** Not yet built.
        """),
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Contract lifecycle tracking",
                "description": "**As a** sales representative\n**I want to** track contracts through their lifecycle\n**So that** I manage renewals and obligations\n\n**Acceptance Criteria:**\n- Contract statuses: Draft, Pending Approval, Active, Expired, Renewed\n- Link contracts to opportunities and customers\n- Contract value and term tracking\n- Timeline view of contract milestones",
                "priority": 3,
            },
            {
                "name": "Contract templates and versioning",
                "description": "**As a** legal/sales ops user\n**I want** contract templates with version control\n**So that** I use approved, current contract language\n\n**Acceptance Criteria:**\n- Template library with clause management\n- Version history for each contract\n- Compare versions side-by-side\n- Template approval workflow",
                "priority": 3,
            },
            {
                "name": "Renewal alerts and reminders",
                "description": "**As a** account manager\n**I want** automatic renewal reminders\n**So that** I never miss a contract renewal opportunity\n\n**Acceptance Criteria:**\n- Configurable reminder lead time (30/60/90 days before expiry)\n- Dashboard widget for upcoming renewals\n- Email notification for renewal reminders\n- Renewal pipeline view",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Territory Management",
        "description": "Geographic and account-based territory management.\nPriority: NEXT (6-12 months).\n\n**Status:** Not yet built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Territory definitions and hierarchy",
                "description": "**As a** sales VP\n**I want to** define sales territories\n**So that** account coverage is clear and balanced\n\n**Acceptance Criteria:**\n- Create territories by geography, industry, or account size\n- Territory hierarchy (region → area → territory)\n- Assign reps to territories\n- Visual map of territories",
                "priority": 3,
            },
            {
                "name": "Territory-based reporting",
                "description": "**As a** sales VP\n**I want** reports segmented by territory\n**So that** I can compare performance across regions\n\n**Acceptance Criteria:**\n- Pipeline by territory report\n- Revenue by territory report\n- Territory coverage and capacity analysis\n- Drill-down from territory to individual reps",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Forecasting Engine",
        "description": "Sales forecasting with pipeline analysis.\nPriority: NEXT (6-12 months).\n\n**Status:** Dashboard has basic forecast visualization. Engine not built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Sales forecast modeling",
                "description": "**As a** sales manager\n**I want** automated sales forecasts\n**So that** I can predict revenue and plan resources\n\n**Acceptance Criteria:**\n- Forecast based on pipeline (weighted by probability)\n- Historical accuracy tracking\n- Adjustable forecast categories (Best Case, Commit, Pipeline)\n- Quarterly and annual views",
                "priority": 3,
            },
            {
                "name": "Forecast accuracy tracking",
                "description": "**As a** sales VP\n**I want to** track forecast accuracy over time\n**So that** I can improve prediction reliability\n\n**Acceptance Criteria:**\n- Compare forecasts to actuals per period\n- Accuracy percentage by team/rep\n- Trend analysis of forecast vs actual\n- Alerts for significant forecast deviations",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[NEXT] Deduplication & Merge",
        "description": "Duplicate detection and record merging for contacts and leads.\nPriority: NEXT.\n\n**Status:** Not yet built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Duplicate detection for contacts and leads",
                "description": "**As a** data quality manager\n**I want** the system to detect duplicate records\n**So that** our CRM data stays clean\n\n**Acceptance Criteria:**\n- Automatic duplicate detection on create (name, email, phone matching)\n- Scheduled duplicate scan across all records\n- Duplicate candidates list with confidence scores\n- Rules configurable (exact match, fuzzy match)",
                "priority": 3,
            },
            {
                "name": "Record merge wizard",
                "description": "**As a** data quality manager\n**I want to** merge duplicate records\n**So that** all data consolidates into a single record\n\n**Acceptance Criteria:**\n- Side-by-side comparison of duplicate records\n- Select master record and surviving values per field\n- Related records (activities, opportunities) re-linked to survivor\n- Merge audit trail",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Notes & Attachments",
        "description": "Rich notes and file attachments on all CRM records.\nPriority: NEXT.\n\n**Status:** AttachmentsController exists in backend. Frontend not built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Notes on CRM records",
                "description": "**As a** sales representative\n**I want to** add notes to any CRM record\n**So that** I can capture important context\n\n**Acceptance Criteria:**\n- Rich text notes on leads, contacts, customers, opportunities\n- Chronological note feed on record detail\n- Edit and delete own notes\n- @mention team members in notes",
                "priority": 3,
            },
            {
                "name": "File attachments",
                "description": "**As a** CRM user\n**I want to** attach files to CRM records\n**So that** relevant documents are stored with the record\n\n**Acceptance Criteria:**\n- Upload files (PDF, Word, Excel, images) to any record\n- File list on record detail page\n- Download and preview attachments\n- File size limits and type restrictions\n\n**Technical Notes:**\n- AttachmentsController already exists in backend\n- Needs frontend UI components",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Email Marketing Campaigns",
        "description": "Email campaign builder with audience segmentation.\nPriority: NEXT.\n\n**Status:** Basic campaign management built. Email marketing features not built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Email campaign builder",
                "description": "**As a** marketing manager\n**I want** a visual email campaign builder\n**So that** I can create professional email campaigns\n\n**Acceptance Criteria:**\n- Drag-and-drop email builder with templates\n- Dynamic content blocks (text, images, buttons, dividers)\n- Preview on desktop and mobile\n- A/B testing for subject lines and content",
                "priority": 3,
            },
            {
                "name": "Audience segmentation",
                "description": "**As a** marketing manager\n**I want to** segment audiences based on CRM data\n**So that** I send targeted, relevant emails\n\n**Acceptance Criteria:**\n- Segment by: status, industry, location, custom fields, activity\n- Dynamic segments that update automatically\n- Segment size preview before campaign send\n- Exclude/include list management",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Saved Views & Inline Editing",
        "description": "Custom list views and inline data editing.\nPriority: NEXT.\n\n**Status:** Not yet built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Saved list views",
                "description": "**As a** CRM user\n**I want to** save custom list view configurations\n**So that** I can quickly access my preferred data views\n\n**Acceptance Criteria:**\n- Save current filter + column configuration as a named view\n- Personal and shared views\n- Set default view per entity\n- Quick switch between saved views",
                "priority": 3,
            },
            {
                "name": "Inline cell editing on data tables",
                "description": "**As a** CRM user\n**I want to** edit cell values directly in the list view\n**So that** I can update data without opening a form\n\n**Acceptance Criteria:**\n- Click cell to enter edit mode\n- Edit text, dropdown, date fields inline\n- Auto-save on blur or Enter key\n- Undo capability for accidental changes",
                "priority": 3,
            },
        ],
    },
    {
        "epic": "[NEXT] Task Automation",
        "description": "Rule-based automatic task creation and assignment.\nPriority: NEXT.\n\n**Status:** Not yet built.",
        "priority": 3,
        "tags": ["future", "next"],
        "stories": [
            {
                "name": "Rule-based task creation",
                "description": "**As a** sales manager\n**I want** tasks created automatically based on rules\n**So that** repetitive task creation is eliminated\n\n**Acceptance Criteria:**\n- Rules: when lead stage changes to X, create task Y\n- Rules: when deal is won, create onboarding tasks\n- Configurable task details (title, assignee, due date offset)\n- Rule enable/disable toggle",
                "priority": 3,
            },
            {
                "name": "Task escalation and reminders",
                "description": "**As a** sales manager\n**I want** overdue tasks escalated automatically\n**So that** nothing falls through the cracks\n\n**Acceptance Criteria:**\n- Reminder notifications before due date\n- Escalation to manager after X days overdue\n- Escalation chain configurable\n- Overdue task dashboard widget",
                "priority": 3,
            },
        ],
    },

    # ══════════════════════════════════════════════════════════════════════════
    # FUTURE FEATURES — LATER TIER (12+ months)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "epic": "[LATER] Marketing Automation Suite",
        "description": "Full marketing automation with multi-step workflows and nurturing.\nPriority: LATER (12+ months).\n\n**Status:** Not yet built. Extends existing campaign management.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Multi-step campaign workflows",
                "description": "**As a** marketing manager\n**I want** multi-step automated campaign workflows\n**So that** leads receive the right content at the right time\n\n**Acceptance Criteria:**\n- Visual workflow builder for email sequences\n- Triggers: form submit, email open, link click, time delay\n- Conditional branching based on lead actions\n- Campaign analytics per step",
                "priority": 4,
            },
            {
                "name": "Lead nurturing sequences",
                "description": "**As a** marketing manager\n**I want** automated lead nurturing sequences\n**So that** leads are warmed up before sales contact\n\n**Acceptance Criteria:**\n- Pre-built nurturing templates\n- Drip email sequences with time delays\n- Lead scoring integration (exit nurture on score threshold)\n- Nurture performance analytics",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] Visual Workflow Builder",
        "description": "Drag-and-drop workflow designer for business process automation.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Drag-and-drop workflow designer",
                "description": "**As an** administrator\n**I want** a visual workflow builder\n**So that** I can automate complex business processes without coding\n\n**Acceptance Criteria:**\n- Canvas-based workflow designer\n- Node types: trigger, condition, action, delay, branch\n- CRM actions: create record, update field, send email, assign\n- Test/debug mode for workflow validation",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] Customer Portal & Case Ticketing",
        "description": "Self-service customer portal with support case management.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Customer self-service portal",
                "description": "**As a** customer\n**I want** a self-service portal\n**So that** I can access my account info and submit requests\n\n**Acceptance Criteria:**\n- Customer login with separate auth\n- View account details, invoices, contracts\n- Submit and track support requests\n- Knowledge base search",
                "priority": 4,
            },
            {
                "name": "Support case tracking",
                "description": "**As a** support agent\n**I want** a case ticketing system\n**So that** I can manage customer support requests\n\n**Acceptance Criteria:**\n- Create, assign, and track support cases\n- Case priority and SLA management\n- Case linked to customer and contact records\n- Resolution tracking and satisfaction surveys",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] Plugin Framework & Advanced BI",
        "description": "Extension/plugin architecture and advanced business intelligence.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Plugin extension framework",
                "description": "**As a** developer\n**I want** a plugin framework for the CRM\n**So that** custom functionality can be added without modifying core code\n\n**Acceptance Criteria:**\n- Plugin API with lifecycle hooks\n- Plugin marketplace/registry\n- Sandboxed execution environment\n- Plugin configuration UI",
                "priority": 4,
            },
            {
                "name": "Advanced BI dashboards",
                "description": "**As a** business analyst\n**I want** advanced BI dashboards with drill-down\n**So that** I can perform deep data analysis\n\n**Acceptance Criteria:**\n- Multi-dimensional data visualizations\n- Drill-down from summary to detail\n- Cross-entity analytics (leads → opportunities → revenue)\n- Dashboard sharing and embedding",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] Mobile Native & Multi-Language",
        "description": "Native mobile app and internationalization support.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Native mobile app",
                "description": "**As a** field sales representative\n**I want** a native mobile app\n**So that** I can access CRM data on the go\n\n**Acceptance Criteria:**\n- iOS and Android native apps\n- Offline data access with sync\n- Push notifications for CRM events\n- Mobile-optimized lead and contact management\n- Camera integration for business card scanning",
                "priority": 4,
            },
            {
                "name": "Multi-language and i18n support",
                "description": "**As a** global organization\n**I want** CRM in multiple languages\n**So that** teams worldwide can use it in their preferred language\n\n**Acceptance Criteria:**\n- Language switcher in user settings\n- UI labels, messages, and system text translatable\n- Date, number, and currency format localization\n- RTL language support",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] AI Conversation Intelligence",
        "description": "AI-powered call analysis and sales coaching.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "Call recording transcription and analysis",
                "description": "**As a** sales manager\n**I want** sales calls automatically transcribed and analyzed\n**So that** I can coach reps and understand customer needs\n\n**Acceptance Criteria:**\n- Integration with VoIP/phone systems\n- Automatic transcription of recorded calls\n- Sentiment analysis and keyword extraction\n- Call summary and action items generated by AI\n- Coaching insights (talk ratio, questions asked, next steps)",
                "priority": 4,
            },
        ],
    },
    {
        "epic": "[LATER] Compliance & Collaboration",
        "description": "Data compliance (GDPR) and real-time team collaboration.\nPriority: LATER.\n\n**Status:** Not yet built.",
        "priority": 4,
        "tags": ["future", "later"],
        "stories": [
            {
                "name": "GDPR and data compliance management",
                "description": "**As a** compliance officer\n**I want** GDPR compliance tools in the CRM\n**So that** we handle personal data according to regulations\n\n**Acceptance Criteria:**\n- Consent tracking for contacts\n- Data subject access request (DSAR) workflow\n- Right to be forgotten (data erasure)\n- Data processing audit trail\n- Privacy impact assessment tools",
                "priority": 4,
            },
            {
                "name": "Real-time team collaboration",
                "description": "**As a** CRM user\n**I want** real-time collaboration features\n**So that** my team can work together efficiently\n\n**Acceptance Criteria:**\n- Real-time co-editing of notes and records\n- Live cursors showing who's viewing a record\n- Team chat within CRM context\n- @mention notifications in activities and notes",
                "priority": 4,
            },
        ],
    },
]


# ─── Main Execution ──────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("  CRM BACKLOG COMPLETE REWRITE")
    print("  Target List: CRM Backlog (ID: {})".format(CRM_LIST_ID))
    print("=" * 70)

    # ── Step 1: Count what we'll create ──
    total_epics = len(BACKLOG)
    total_stories = sum(len(e["stories"]) for e in BACKLOG)
    print(f"\n📋 Plan: {total_epics} epics, {total_stories} user stories")

    # ── Step 2: Fetch and delete ALL existing tasks ──
    print("\n🗑️  Phase 1: Deleting all existing tasks...")
    existing = get_all_tasks()
    print(f"   Found {len(existing)} existing tasks to delete")

    # Delete subtasks first, then parent tasks (to avoid orphan issues)
    parents = [t for t in existing if not t.get("parent")]
    subtasks = [t for t in existing if t.get("parent")]

    deleted = 0
    for i, task in enumerate(subtasks + parents, 1):
        tid = task["id"]
        name = task.get("name", "???")[:50]
        if delete_task(tid):
            deleted += 1
            if i % 10 == 0 or i == len(existing):
                print(f"   Deleted {deleted}/{len(existing)}  (latest: {name})")
        time.sleep(REQUEST_DELAY)

    print(f"   ✅ Deleted {deleted} tasks total")

    # ── Step 3: Create new epics and stories ──
    print(f"\n📝 Phase 2: Creating {total_epics} epics + {total_stories} stories...")
    created_epics = 0
    created_stories = 0

    for epic_data in BACKLOG:
        # Create the epic (parent task)
        epic_name = epic_data["epic"]
        print(f"\n   📌 Creating epic: {epic_name}")

        epic_result = create_task(
            name=epic_name,
            description=epic_data["description"],
            priority=epic_data["priority"],
            tags=epic_data.get("tags", []),
        )
        time.sleep(REQUEST_DELAY)

        if not epic_result or "id" not in epic_result:
            print(f"   ❌ Failed to create epic: {epic_name}")
            continue

        epic_id = epic_result["id"]
        created_epics += 1

        # Create stories as subtasks under this epic
        for story_data in epic_data["stories"]:
            story_name = story_data["name"]
            story_result = create_task(
                name=story_name,
                description=story_data["description"],
                priority=story_data["priority"],
                parent=epic_id,
            )
            time.sleep(REQUEST_DELAY)

            if story_result and "id" in story_result:
                created_stories += 1
            else:
                print(f"      ❌ Failed to create story: {story_name}")

        print(f"      ✅ {len(epic_data['stories'])} stories created under '{epic_name}'")

    # ── Summary ──
    print("\n" + "=" * 70)
    print("  REWRITE COMPLETE")
    print(f"  Deleted:  {deleted} old tasks")
    print(f"  Created:  {created_epics} epics + {created_stories} stories")
    print(f"  Total:    {created_epics + created_stories} new tasks")
    print("=" * 70)

    if created_epics != total_epics or created_stories != total_stories:
        print(f"\n⚠️  Expected {total_epics} epics + {total_stories} stories")
        print(f"   Got      {created_epics} epics + {created_stories} stories")
        print("   Some tasks may have failed — check output above")


if __name__ == "__main__":
    main()
