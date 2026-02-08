# CRM Enterprise Project Master

Single source of truth for the CRM Enterprise codebase. This document consolidates the current project contract, roadmap, style guides, issue fixes, lessons learned, user guide, use cases, test plan, and Azure roadmap. If any conflict exists, the **running codebase** is the source of truth and this document must be updated.

---

## 1) Stack (Exact Versions)

### Frontend
- Angular: `~21.0.8`
- Angular CDK: `^21.0.6`
- PrimeNG: `~21.0.2`
- PrimeIcons: `^7.0.0`
- PrimeNG Themes: `~21.0.2`
- PrimeUIX Themes: `^2.0.2`
- Chart.js: `^4.5.1`
- RxJS: `~7.8.0`
- TypeScript: `~5.9.2`
- Package manager: `npm@10.9.4`

### Backend
- .NET: `net10.0`
- Entity Framework Core: `8.0.7`
- SQL Server (Azure SQL in production; connection name `SqlServer`)
- Azure SignalR: `Microsoft.Azure.SignalR 1.32.0`
- Azure Communication Email: `1.0.2`
- Azure Service Bus: `7.17.4`
- SendGrid: removed (no longer used)

---

## 2) Repository Structure Rules

### Frontend (`client/src/app`)
- `core/`: cross-cutting services, guards, interceptors, notifications, auth helpers.
- `crm/`: CRM application features and pages.
- `public/`: public auth pages (login, invite accept, password change).
- `layout/`: shared shell, nav, and layout scaffolding.
- `shared/`: shared UI components, styles, utilities, and shared services.
- `mocks/`, `packs/`: use only for local development and packaged modules as currently structured.

### Backend (`server/src`)
- `CRM.Enterprise.Api`: API host, controllers, middleware, SignalR hubs.
- `CRM.Enterprise.Application`: use-case orchestration and application services.
- `CRM.Enterprise.Domain`: entities, domain rules, security permissions.
- `CRM.Enterprise.Infrastructure`: EF Core persistence, external services, integrations.

---

## 3) Architecture Rules

### Frontend
- Use standalone Angular components (current pattern).
- No inline templates or styles. Always use `templateUrl` and `styleUrl`.
- Every page follows the Page Design System structure and uses global styles.
- PrimeNG components are mandatory for inputs, tables, dialogs, and buttons.
- Date/time display must follow current user timezone conversion rules (UTC storage; local display).
- Mobile-first: every page must be responsive and usable on mobile devices.

### Backend
- Clean architecture is mandatory: Domain has no dependency on Infrastructure or Api.
- Controllers are thin and delegate to Application services or Infrastructure abstractions.
- EF Core is the only persistence mechanism; no raw SQL unless already present.
- Tenant filtering is enforced through middleware + EF query filters.

---

## 4) Authentication and Authorization
- JWT Bearer authentication with issuer/audience validation.
- Claims-based authorization using `crm:permission`.
- Policies are defined in `CRM.Enterprise.Security.Permissions` and enforced per controller/action.
- Authorization fallback policy requires authenticated users.

---

## 5) Tenant and Role Handling
- Tenant resolution: `X-Tenant-Key` header or host-based mapping.
- Default tenant key comes from configuration (`Tenant:DefaultKey`) when not resolved.
- Tenant provider is set per request; EF query filters rely on it.
- System roles are defined in `CRM.Enterprise.Security.Permissions.RoleNames`.
- **Security levels are tenant-defined. Do not hard-code role security tiers.**

---

## 6) UI/UX Standards (Current)
- Global styles are authoritative: `client/src/styles` and `client/src/app/shared`.
- Pages must use the animated orb background and shared layout containers.
- Premium glass/gradient styling is required; do not create one-off themes.
- Button styles must use the global CRM button classes.
- List pages and form pages follow the Component Style Guide templates.
- Login page uses the branded logo, glass card, orb + grid background, and noise overlay to match the prototype look.
- **Login UI lock:** The current login screen visual design is approved/locked. Do not change its styles without explicit approval.
- **Auth screens parity:** All public auth pages (login, accept-invite, change-password, password reset) must match the login screen’s visual system: same background (orbs + grid + noise), glass card treatment, typography, spacing, and button styling.
- **Auth shell component:** Public auth pages must use the shared `AuthShellComponent` to ensure visual parity and avoid style drift.

### Global Style Files (Source of Truth)
- `client/src/styles.scss`
- `client/src/styles/_design-tokens.scss`
- `client/src/styles/_components.scss`
- `client/src/styles/_animations.scss`
- `client/src/app/shared/_form-page-styles.scss`
- `client/src/app/shared/page-design-system.scss`
- `client/src/app/app.scss`

### Page Structure (Required)
```
<div class="page-background">
  <div class="animated-orb orb-1"></div>
  <div class="animated-orb orb-2"></div>
  <div class="animated-orb orb-3"></div>
</div>

<div class="page-container">
  <div class="page-content">
    <app-breadcrumbs></app-breadcrumbs>
    <!-- header + content -->
  </div>
</div>
```

---

## 7) Coding Rules and Boundaries
- Follow the shared style guides; do not override on a per-page basis.
- Avoid page-specific tokens; introduce new tokens only in shared global files.
- Respect existing module boundaries; do not move files across layers without approval.
- Keep TypeScript strict and Angular template strict rules enabled.

---

## 8) DO NOT Rules (Explicit)
- Do not add new frameworks, UI libraries, or architectural patterns.
- Do not refactor or reorganize folders unless explicitly requested.
- Do not hardcode environment-specific URLs in production builds.
- Do not bypass tenant isolation or permission checks.
- Do not hardcode role names or role-based layouts; use hierarchy levels + configured defaults.
- Do not introduce inline HTML/CSS in components.
- Do not commit or push unless explicitly instructed.

---

## 9) AI-Generated Code Rules
- No guessing: use the current codebase and documentation only.
- Diff-only changes: smallest viable edits, no sweeping refactors.
- No modernization or library upgrades.
- Always preserve existing behavior unless explicitly asked to change it.
- When unclear, ask for clarification instead of inventing.

---

## 10) Operational Notes (Current Reality)
- CORS is controlled in `CRM.Enterprise.Api/Program.cs` and App Service CORS settings.
- Production frontend must target the production API host (do not point to dev API in prod builds).
- SignalR hub is mapped to `/api/hubs/presence` and uses the same CORS policy.
- **Deployment gate:** before any deploy, verify both client and API builds succeed.
- **Daily ops log:** record daily issues and fixes in `docs/DAILY_OPERATIONS_LOG.md`, and only merge verified outcomes into this master file.
- **Lead AI scoring:** Lead score refresh uses Azure OpenAI when configured, falls back to OpenAI, then rules-based scoring to keep the UI functional.

---

## 10.1) ClickUp Automation (Backlog + Governance)

**Purpose:** Keep ClickUp aligned with the codebase and roadmap plan without manual drift.

### Backlog Structure (Current)
- **Epics list** (Product & Planning):
  - `Now`
  - `Next`
  - `Later`
- **Next execution epics** (children of `Next`):
  - Epistemic State + Evidence Governance
  - Feedback Loop + Weakest Signal
  - Epistemic Metrics Core
  - Risk & Cost of Not Knowing
  - Conditional Forecasting
  - Coaching & Management
- **User Stories list**: stories are **subtasks** of the appropriate epic.
- **Modules list**: one task per module (Leads, Opportunities, Dashboard, Settings, etc.).
- **Linkage**: each story is linked to a module task and prefixed with `Module: <Module> | ...` for visibility.

### Tagging Standard
- Tier tags: `now`, `next`, `later`
- Module tags: `module:Leads`, `module:Opportunities`, `module:Dashboard`, `module:Settings`, etc.
- Status tags: `done`, `partial`, `not-started`, `candidate`

### Dashboard Packs (Role Defaults)
- **Hierarchy levels** are computed from parent/child depth (H1 = top level). No role names are hard-coded.
- **Default layout per hierarchy level** is stored in workspace settings (tenant config) and can be updated via API/UI.
- Users can customize layout; **Reset to Role Default** restores the hierarchy-level pack.
- Configure hierarchy via **Settings → Roles**.

### Qualification Policy (Conversion Thresholds)
- Qualification thresholds are configurable in **Settings → Workspace**.
- Policies support contextual rules (segment/deal type/stage) and modifiers (competitive, strategic, executive champion, velocity).
- Conversion enforces thresholds server-side, with manager approval + override reason when below thresholds (configurable).
- Storage is tenant-scoped (`QualificationPolicyJson` on `Tenants`) and returned via `GET /api/workspace`.

### Description Standard (Stories)
```
## Story
<title>

## Acceptance Criteria
- ...
- ...

## Evidence
- `path/to/source`
```

### Automation Rules (Operational)
- **Source of truth** for CRM backlog items and completion status: `docs/CRM_BACKLOG.md`.
- **Source of truth** for supply-chain backlog items: `docs/SCM_BACKLOG.md`.
- **Source of truth** for cross-cutting platform/infra backlog items: `docs/PROJECT_BACKLOG.md`.
- **New backlog items** derived from `docs/CRM_BACKLOG.md`, `docs/SCM_BACKLOG.md`, and `docs/PROJECT_BACKLOG.md` (PARTIAL/NOT STARTED/UNKNOWN).
- **Do not assume** status beyond documented evidence.

### ClickUp API Integration
- Personal API token stored in Azure App Service settings: `CLICKUP_API_TOKEN`.
- Personal ClickUp API token also stored in Azure Key Vault `kv-crm-dev-ca` as secret `clickup-api-token` (RBAC enabled).
- Use ClickUp API for create/update/delete tasks and to attach tags/parent relationships.
- ClickUp public API does **not** support Docs content CRUD; use tasks for documentation tracking instead.

### ClickUp Workspace Map (Current)
- Workspace (team) name: `North Edge System's Workspace`
- Workspace (team) id: `9017850483`
- Primary space name: `CRM Platform`
- Primary space id: `90173924925`
- Secondary space name: `Team Space`
- Secondary space id: `90173924936`
- Folder: `Product & Planning` (id: `90176298145`)
  - List: `Epics` (id: `901710553489`)
  - List: `SCM Backlog` (id: `901710734279`)
  - List: `CRM Backlog` (id: `901710720381`)
  - List: `Project Backlog` (id: `901710720382`)
- Folder: `CRM Modules` (id: `90176298150`)
  - List: `List` (id: `901710553353`)
- Folder: `Engineering` (id: `90176298161`)
  - List: `List` (id: `901710553369`)
- Folder: `QA & Release` (id: `90176298180`)
  - List: `List` (id: `901710553388`)
- Folder: `Operations` (id: `90176298195`)
  - List: `List` (id: `901710553403`)

---

## 11) Issue Fix Patterns (Current Reality)
- PrimeNG select edits: insert a temporary option when pre-filling forms so values render before options load.
- Activity edit/list time: parse API timestamps as UTC (append `Z` when missing) and display in user local time.
- Lead status resolution: resolve `LeadStatus` entities and attach to `Lead` before save to avoid FK insert order issues.
- User directory tables must page through API results in production so Azure-hosted builds can see every tenant user; the component now tracks pagination state and forwards `page`/`pageSize` along with `totalUsers`.
- Presence status requires a SignalR connection that includes the tenant header plus the stored JWT even before any user interaction; the root app now starts that connection so online indicators survive refreshes.
- Tenant keys persisted from login now survive returning to the root host, so the realtime connection always carries the proper `X-Tenant-Key` instead of falling back to `default`.
- Presence service now treats the locally-authenticated user as online immediately so the green dot isn’t erased while the hub snapshot finishes after a refresh.
- Login issue note: if a user cannot sign in after tenant changes, verify the stored password hash matches the current login (passwords may be generated/reset alongside tenant provisioning or tenant key changes). Reset the user password in the target tenant if needed.

---

## 12) Lessons Learned

### Production CORS and API Routing
- Avoid hard-coding dev API URLs in production builds; route to a dedicated production API host.
- Always return CORS headers for allowed origins, even on error responses.
- Keep a production E2E test that hits the real API and asserts a 2xx response.

### Invite Acceptance Flow
- Treat invite tokens as single-use and add a precheck before showing the password form.
- Redirect to login after success to make the flow explicit and secure.
- Show clear messages for expired/used invites to reduce support tickets.

### UI Consistency
- Document visual styles once and reuse (liquid glass, gradient titles, input groups).
- Prefer lightweight, inline loading indicators for long-running actions.

---

## 13) Roadmap & Benchmark (Current)
Reference: `docs/USER_STORIES.md` → “Strategic Benchmark & Differentiation (Current Plan)”.

### Positioning Goal
Win on **execution discipline**, **speed to value**, and **AI‑guided next steps** rather than feature parity with enterprise CRMs.

### Now (Immediate) (next 30–45 days)
- Priority Stream finalization (filters, quick actions, next‑step enforcement)
- Approval routing logic (role + amount + discount)
- Rep activity metrics (calls/emails per rep, response time)

### Next (next 60–90 days)
- Lead scoring (rules‑based)
- Workflow automation (stage triggers + task creation)
- Forecast rollups (rep → manager)
- Account hierarchy view
- Email + calendar auto‑logging

### Later (next 120–180 days)
- Custom report builder
- Win/loss analysis + competitor tracking
- Next‑best‑action AI
- Document management + e‑signature hooks
- Mobile offline mode

---

## 14) User Guide (Condensed)

### Core Flow
- Lead -> qualify -> activity -> convert -> opportunity -> stage updates -> win/loss.
- Activities track tasks/calls/meetings and drive pipeline movement.
- Dashboard KPIs summarize accounts, pipeline, and tasks.

### Use Case Highlights (from UseCases_V1)
- Inbound lead capture and qualification
- Conversion to opportunity and pipeline progression
- Win/loss capture and renewal tracking
- Multi-contact decision team management

---

## 14) User Stories (Role-Based)
- Canonical user stories live in `docs/USER_STORIES.md` (all roles, execution-ready).

---

## 13.1) Sales Rep Full B2B Flow (Future-Ready)

**Principle:** The CRM is an execution system, not a database. It enforces next steps, protects forecast accuracy, and drives continuous momentum.

### Start of Day – Sales Home (Command Center)
**System must show:**
- Overdue + due-today tasks, newly assigned leads, at-risk deals (no activity in X days)
- Today’s meetings, personal forecast snapshot, and deals closing within 30 days
**Sales rep actions:**
- Prioritize tasks, open the highest-impact lead/opportunity, log missed activity

### Lead Handling – Top of Funnel
**System actions (auto):**
- Assign lead owner, start SLA timer, create first follow-up task, set routing reason
**Sales rep actions:**
- First-touch call/email, log outcome, schedule next step
**Qualification gate:**
- Fit, need, authority, timeline (BANT-style or MEDDIC-lite)
- Outcome required: Disqualified (reason), Nurture, or Qualified (Sales Accepted)

### Lead Conversion – Transition to Sales
**On qualification:**
- Create Account + Contact + Opportunity
- Transfer activities/notes; lock lead as “Converted”
**Required data:**
- Opportunity name, value, close date, initial stage

### Account + Contact Strategy
**Sales rep actions:**
- Verify account ownership and parent-child relationships
- Add account notes, attach stakeholders, and classify roles:
  Decision Maker / Champion / Influencer / Procurement / Technical

### Opportunity Execution – Stage System (Full B2B)
**Stages (default):**
1) Qualification
2) Discovery
3) Solution Design
4) Demo / Validation
5) Proposal
6) Security / Legal Review
7) Negotiation
8) Commit
9) Closed Won / Closed Lost

**Exit criteria (must be enforced per stage):**
- Qualification: problem confirmed, decision maker identified, discovery scheduled
- Discovery: requirements captured, buying process known, success criteria set
- Solution Design: scope defined, pre-sales engaged, risks logged
- Demo/Validation: demo/POC completed, champion confirmed
- Proposal: quote created, approvals logged, proposal sent
- Security/Legal: questionnaires + legal steps tracked
- Negotiation: pricing + terms confirmed, close date updated
- Commit: verbal yes + expected signature date + kickoff date

### Activity Discipline (Mandatory)
**Rules:**
- Every activity has an outcome
- Every activity defines a next step + due date
- Opportunity must show last activity date + next scheduled action
**System enforcement:**
- Block stage progression without next-step
- Flag idle opportunities and at-risk deals

### Manager Interaction (Sales Rep View)
**Sales rep actions:**
- Submit discount/approval requests with justification
**Visibility:**
- Approval status, manager comments, forecast category changes

### Deal Closure
**Closed Won:**
- Lock opportunity, create contract/order, create onboarding tasks
- Assign delivery/CS owner, set renewal date
- Sales rep provides handoff notes + intro email
**Closed Lost:**
- Require loss reason + competitor + notes
- Remove from forecast; feed win/loss analytics

### Post-Sale + Expansion
- Attend kickoff, support early success
- Detect expansion signals (usage, requests, new departments)
- Create Expansion Opportunity with linked account context

### Renewals
**System actions:**
- Auto-create renewal opportunity at 90/60/30 days
**Sales rep actions:**
- Renewal discovery, proposal, close renewal

### Reporting + Self-Management
- Personal pipeline health, deals without next step, activity volume, close rate

### Governance + Data Integrity (Future-Ready)
- Stage exit criteria enforced by validation rules
- Required fields and controlled vocabularies (loss reasons, competitors, outcomes)
- SLA and escalation rules for first-touch and follow-ups
- AI guidance allowed only if explainable and overrideable

### Current vs. Future Mapping (Snapshot)
**Currently supported (based on existing modules):**
- Leads CRUD + assignment rules + conversion to Account/Contact/Opportunity
- Opportunities with stages + win/loss capture
- Activities with outcomes + due dates
- Dashboard KPI surface for pipeline and tasks
- Approval thresholds (single-level)
- Notifications (in-app + preferences)

**Future/Gap items to implement:**
- Stage exit validation gates
- SLA timers + escalation paths for leads
- Controlled vocabularies for loss reasons/competitors/activity outcomes
- Security/legal step tracking checklist per opportunity
- Renewal automation (90/60/30-day triggers)
- Expansion signals and expansion opportunity templates

---

## 13.2) B2B CRM – Extended Flows by Role (Future-Ready)

These workflows define how non‑rep roles operate in the same CRM, with clear ownership, inputs/outputs, and enforcement points. They are designed to be build‑ready and align with enterprise CRM expectations.

### SDR / BDR (Lead Qualification)
**Purpose:** Convert raw leads into sales‑accepted opportunities.
**Daily view:** New leads, SLA timers, outreach cadence queue, meetings booked.
**Flow:**
- First touch within SLA → multi‑touch cadence (call/email/LinkedIn).
- Log every outcome with next step + due date.
- Qualify for: company fit, role relevance, interest, timing.
**Outcomes (required):**
- Disqualified (reason required)
- Nurture (future follow‑up)
- Qualified → handoff to Sales Rep with notes + booked discovery meeting

### Sales Manager
**Purpose:** Forecast accuracy, deal governance, rep performance.
**Manager view:** Team pipeline, commit vs target, at‑risk deals, approvals.
**Flow:**
- Review pipeline weekly + critical deals daily.
- Inspect: no next step, stage stuck, large/late‑stage deals.
- Coach reps via comments/tasks; enforce stage exit criteria.
- Approve/deny discounts and non‑standard terms.
- Adjust forecast categories and reassign ownership when required.

### Sales Ops / CRM Admin
**Purpose:** Process integrity, data quality, automation, and scale.
**Core responsibilities:**
- Configure stages + exit criteria, required fields, and SLAs.
- Manage roles/permissions; maintain products/pricing/templates.
- Automations: lead routing, idle‑deal alerts, task auto‑creation.
- Data quality: duplicate detection, merge rules, field validation.
- Reporting enablement + audit/compliance logging.
**Output:** A governed system that enforces workflow without manual policing.

### Pre‑Sales / Solution Consultant
**Purpose:** Technical validation and solution alignment.
**Flow:**
- Added to opportunity team on Discovery or Solution Design.
- Review requirements; support discovery calls.
- Design solution scope; deliver demo/POC.
- Capture technical risks/constraints; update opportunity notes.
- Support proposal, security review, and validation stages.

### Finance
**Purpose:** Protect margin, pricing consistency, billing accuracy.
**Flow:**
- Receive pricing/discount approvals with margin visibility.
- Approve/deny with comments; define billing schedule + payment terms.
- Validate tax/invoicing rules before Closed Won.
- Trigger billing/ERP handoff once contract is signed.

### Legal
**Purpose:** Contract compliance and risk management.
**Flow:**
- Intake contract request → review redlines/clauses.
- Track negotiation status and deviations from standards.
- Approve final language; mark ready for signature.
- Maintain contract audit trail.

### Delivery / Implementation
**Purpose:** Successful onboarding and solution delivery.
**Flow:**
- Auto‑assigned on Closed Won.
- Review handoff package (scope, stakeholders, risks, timeline).
- Schedule kickoff; execute onboarding checklist.
- Track milestones + dependencies; sync status to CRM.
- Mark implementation complete and hand over to CSM.

### Customer Success Manager (CSM)
**Purpose:** Retention, adoption, expansion.
**Flow:**
- Own post‑onboarding relationship.
- Monitor health indicators, usage, NPS/feedback.
- Trigger playbooks for risk or low adoption.
- Identify expansion signals and open Expansion Opportunity.
- Coordinate renewals with Sales.

### Support / Service Agent
**Purpose:** Issue resolution + SLA compliance.
**Flow:**
- Intake case (email/portal/phone) → identify account/contact.
- Classify priority/SLA → resolve or escalate.
- Record resolution notes; close case.
- Feed insights into account health and renewal risk.

### Cross‑Role Governance (Required)
- Shared Account + Contact record; single source of truth.
- Role‑based permissions with shared visibility (no data silos).
- SLA + escalation rules across lead and case workflows.
- Required outcomes + next steps for all activities.

**Final principle:** Role specialization with shared data is the foundation of a true B2B CRM.

---

## 13.3) Recommended Delivery Order (Advisor Notes)

**Priority 1 (P2, pipeline discipline):**
1) Lead SLA timers + first-touch enforcement
2) Activity outcome + next-step enforcement
3) Opportunity stage exit criteria gates
4) At-risk deal alerts + dashboard widgets

**Priority 2 (P2, governance + manager visibility):**
5) Approval workflow visibility + comments/audit trail
6) Deal review workflow for stuck/late-stage opportunities

**Priority 3 (P3, revenue expansion + retention):**
7) Renewal automation (90/60/30 day triggers)
8) Expansion signals + expansion opportunity templates
9) Health scoring + NPS + risk alerts (CSM)

---

## 14) Test Plan Summary

### Test Types
- E2E (Playwright): user journeys and critical flows
- API checks: endpoint behavior, payloads, validation
- UI checks: page rendering, filters, navigation

### Current Coverage
- E2E:
  - `client/e2e/lead-lifecycle.spec.ts`
  - `client/e2e/core-flows.spec.ts`
  - `client/e2e/smoke.spec.ts`

### Gaps to Add Next
1) Accounts edit/delete tests
2) Contacts edit/delete tests
3) Opportunity close + win/loss reason validation test
4) Activities overdue highlighting test
5) Multi-tenant isolation test

---

## 15) Competitive Gap Summary (Adjusted to Current Reality)

### Strengths
- Lead lifecycle + conversion + assignment rules
- Accounts/Contacts CRUD + linking
- Opportunities pipeline + stage history

### Gaps
- Email integration beyond transactional sends (templates + logging + sync)
- Calendar sync
- Reporting module
- Full notification center UI (beyond in-app toasts)

### Recommended Differentiators
- AI-first workflow suggestions
- Communication-native CRM (email + calendar integrated)
- Fast onboarding and guided setup

---

## 16) Azure Services (Current and Required)

### Current Azure-Native Services Used
- Azure App Service (API hosting)
- Azure Static Web Apps (frontend hosting)
- Azure SQL Database (primary data store)
- Azure SignalR (presence and realtime features)
- Azure Communication Email (transactional email)
- Azure Service Bus (email queue and async processing)
 - SendGrid: removed (deprecated in this codebase)

### Operational Rules
- CORS must be configured in both API code and App Service settings.
- Always align environment URLs (dev vs prod) across client and API.
- Health endpoints: `/health` and `/healthz` should remain available.

---

## 17) Entra Migration Roadmap (Next Milestone)

### Goal
Migrate user identity to Microsoft Entra (Azure AD) while preserving CRM tenant boundaries and roles.

### Current State
- JWT-based auth issued by the CRM API.
- Roles and permissions are stored in the CRM database.

### Target Architecture (Planned)
- Entra becomes the identity provider for authentication.
- CRM continues to enforce `crm:permission` policies but maps users to Entra identities.
- Tenant resolution stays inside CRM middleware; identity is externalized.

### Required Updates
- Add Entra app registration and configure OAuth flows.
- Map Entra user object IDs to CRM users.
- Update invite and password-reset flows to align with Entra.
- Ensure tokens include required claims for CRM permissions.

---

## 18) Project Roadmap (Merged)

The full checklist sections are included below to keep one source of truth.

# Current Execution Plan (Approved)

Goal: deliver the Sales Rep end-to-end flow first while adding microservice-ready seams without splitting services yet.

**Near-term build order (MVP backbone)**
- Leads: capture, assign, qualify, SLA timers, and required outcomes.
- Lead conversion: account + contact + opportunity creation with history transfer.
- Opportunities: stages, next-step enforcement, and stage history.
- Activities: calls/emails/meetings with outcomes and follow-ups.
- Manager guardrails: stale deals, missing next steps, and approvals.

**Architecture seams to add while building (no microservices yet)**
- Controllers must delegate to Application services (no direct DbContext logic).
- Introduce domain events (in-process now) for lead qualified, stage changes, activity completion.
- Avoid cross-module joins in controllers; use read models or snapshots.
- Optional: split DbContexts by module while keeping a single database.

**Explicit decision**
- Do not extract microservices yet; prioritize flow completeness and seam isolation.

**Execution options (approved on January 25, 2026)**
- Option 1 (active): move import/queue logic into module-level ImportServices so controllers have zero DbContext access.
  - Status: DONE for Leads; IN PROGRESS for Customers/Contacts; queued for remaining modules.
- Option 2 (scheduled next): expand in-process domain events beyond Leads (OpportunityStageChanged, ActivityCompleted) and wire handlers for audit/notifications.
- Option 3 (scheduled after Option 2): apply the same service seam pattern to any remaining controllers still touching DbContext directly.

# Now Checklist (Draft)

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

## 1) Scope

1) Auth + Users (Admin/User)
- Status: DONE
- Evidence:
  - Auth endpoints: `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`
  - Users + roles: `server/src/CRM.Enterprise.Api/Controllers/UsersController.cs`
  - Roles UI: `client/src/app/crm/features/settings/pages/roles.page.ts`
- Acceptance criteria:
  - User can log in with valid credentials and receives JWT.
  - Admin can list users and view roles.
  - Admin can create, edit, and deactivate a user.

2) JWT login/logout
- Status: DONE
- Evidence:
  - JWT setup: `server/src/CRM.Enterprise.Api/Program.cs`
  - Login/logout endpoints: `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`
- Acceptance criteria:
  - Login returns access token + expiry.
  - Logout returns 204 and requires auth.

3) Accounts (Customers)
- Status: PARTIAL
- Evidence:
  - Customers UI: `client/src/app/crm/features/customers/pages/customers.page.html`
  - Customers API: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
- Acceptance criteria:
  - User can create, edit, and delete an account.
  - Accounts list supports search and status filter.
  - Pagination works and page size changes update results.

4) OwnerId + Created/Updated audit fields
- Status: PARTIAL
- Evidence:
  - Entities store CreatedAtUtc/UpdatedAtUtc in multiple controllers
- Acceptance criteria:
  - Each entity stores CreatedAtUtc and UpdatedAtUtc on create/update.
  - OwnerId is persisted and surfaced in list views.

5) Contacts (CRUD, linked to Account)
- Status: DONE
- Evidence:
  - Contacts UI: `client/src/app/crm/features/contacts/pages/contacts.page.html`
  - Contacts API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
- Acceptance criteria:
  - User can create/edit/delete a contact.
  - Contact can link to an account.
  - Contacts list supports search by name/email/phone.

6) Opportunities (CRUD, Stage/Amount/CloseDate/WinLoss reason)
- Status: DONE
- Evidence:
  - Opportunities UI + form: `client/src/app/crm/features/opportunities/pages/opportunities.page.html`
  - Opportunities API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - User can create/edit/delete an opportunity.
  - Stage, amount, close date, and win/loss reason persist.

7) Opportunities list + pipeline view
- Status: DONE
- Evidence:
  - Table + pipeline view: `client/src/app/crm/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - User can toggle table vs pipeline view.
  - Pipeline shows counts and total value per stage.

8) Activities (Task/Call/Meeting; due date, priority, status)
- Status: PARTIAL
- Evidence:
  - Activities UI: `client/src/app/crm/features/activities/pages/activities.page.html`
  - Activities API: `server/src/CRM.Enterprise.Api/Controllers/ActivitiesController.cs`
- Acceptance criteria:
  - User can create/edit/delete an activity of type Task/Call/Meeting.
  - Due date and priority persist.
  - "My Tasks" filter exists and overdue items are highlighted.

9) Dashboard (KPIs, upcoming activities, recent accounts)
- Status: DONE
- Evidence:
  - Dashboard UI: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
  - Dashboard API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
- Acceptance criteria:
  - KPIs render with values.
  - Upcoming activities render.
  - Recently viewed accounts render.

## 2) Architecture (Now)

1) Microservices: IdentityService + CrmCoreService
- Status: PARTIAL
- Evidence:
  - Current structure is a single API project
- Acceptance criteria:
  - Identity service and CRM core can deploy independently.
  - Each service has its own API host and database boundary.

2) Clean Architecture (API/Application/Domain/Infrastructure)
- Status: DONE
- Acceptance criteria:
  - Domain has no dependency on Infrastructure or API.
  - Application layer orchestrates use cases.

3) Light CQRS + MediatR
- Status: UNKNOWN
- Evidence:
  - No clear MediatR usage located
- Acceptance criteria:
  - Commands/queries are MediatR requests with handlers.
  - Controllers depend on MediatR for business actions.

4) EF Core migrations
- Status: DONE
- Acceptance criteria:
  - `dotnet ef database update` succeeds on clean DB.

## 3) Data (Local-first)

1) SQL Server local (Docker recommended)
- Status: PARTIAL
- Acceptance criteria:
  - Docker compose (or documented steps) spins up SQL locally.

2) One DB with separate schemas (identity.*, crm.*)
- Status: DONE
- Acceptance criteria:
  - Tables are created under `identity` and `crm` schemas.

3) No cross-service joins beyond CrmCore boundary
- Status: UNKNOWN
- Acceptance criteria:
  - No EF joins across service boundaries once split.

## 4) UI (Dynamics-style, lean)

1) Pages: Dashboard, Accounts, Contacts, Opportunities, Activities
- Status: DONE
- Acceptance criteria:
  - Each page is reachable from sidebar navigation.

2) Layout: left sidebar + top bar + content area, PrimeNG tables/dialogs/toasts
- Status: DONE
- Acceptance criteria:
  - Layout is consistent across pages and uses PrimeNG tables/dialogs/toasts.

## 5) Done When

1) User logs in
- Status: DONE
- Acceptance criteria:
  - Login UI accepts credentials and routes to dashboard.
2) Can create Account -> Contact -> Opportunity -> Activity
- Status: DONE
- Acceptance criteria:
  - End-to-end flow succeeds (covered by `client/e2e/core-flows.spec.ts`).
3) Can see KPIs + upcoming tasks on dashboard
- Status: DONE
4) Runs fully on local SQL with migrations and seed data
- Status: PARTIAL

# Next Checklist (Draft)

1) Multi-tenancy + workspace settings
- Status: DONE
- Evidence:
  - Workspace settings UI: `client/src/app/crm/features/settings/pages/workspace-settings.page.ts`
  - Workspace settings API: `server/src/CRM.Enterprise.Api/Controllers/WorkspaceController.cs`
  - Tenant middleware + filters: `server/src/CRM.Enterprise.Api/Middleware/TenantResolutionMiddleware.cs`

2) Account / Contact detail enrichment
- Status: DONE

3) Lead lifecycle (CRUD + workflow + conversion + assignment rules)
- Status: DONE

4) Lead AI scoring
- Status: DONE

5) Opportunity enhancements
- Status: DONE

6) Lightweight approval thresholds (single-level)
- Status: DONE

7) Calendar sync (Google/Outlook)
- Status: NOT STARTED

8) Email integration (send + sync + templates)
- Status: NOT STARTED

9) CSV import/export
- Status: DONE

10) Notification center + email notifications + preferences
- Status: DONE

11) Ops hardening (background jobs, retries, health checks)
- Status: DONE

12) Activity templates
- Status: DONE

13) Bulk actions on lists
- Status: DONE

14) Inline edit for simple fields
- Status: DONE

15) Recently viewed lists in each module
- Status: DONE

16) AI Assistant (Foundry-backed internal chat)
- Status: DONE
- Evidence:
  - API: `server/src/CRM.Enterprise.Api/Controllers/AssistantController.cs`
  - Foundry client: `server/src/CRM.Enterprise.Infrastructure/AI/FoundryAgentClient.cs`
  - Chat storage: `server/src/CRM.Enterprise.Domain/Entities/AssistantThread.cs`
  - UI: `client/src/app/core/assistant/assistant-panel.component.ts`
  - Guide: `docs/ai/FOUNDARY_FINE_TUNING_GUIDE.md`

---

## Next vs Full B2B Sales Rep Flow (Gap Check)

**Covered in Next (Sales Rep flow):**
- Multi-tenancy + workspace settings
- Lead lifecycle (CRUD + workflow + conversion + assignment rules)
- Opportunity enhancements
- Lead SLA timers + first-touch task enforcement
- Mandatory next-step + due date enforcement on activities
- Stage exit criteria gates + at-risk deal detection
- Security/Legal checklist tracking per opportunity stage
- Activity templates
- Bulk actions + inline edit
- Notification center + preferences (in-app)
- Ops hardening (background jobs, retries, health checks)

**Missing vs full Sales Rep flow (must add):**
1) [P3] Forecast category controls + commit discipline — Implemented on January 27, 2026  
   - Acceptance: required forecast category before close; manager override logged.
2) [P3] Renewal automation (90/60/30 day triggers) — Implemented on January 27, 2026  
   - Acceptance: renewal opportunity auto‑created with reminders.
3) [P3] Expansion opportunity creation + signals — Implemented on January 27, 2026  
   - Acceptance: expansion signal creates draft opportunity with account link.

## Next vs Full B2B Role Flows (Other Roles)

**SDR / BDR gaps:**
1) [P2] Multi-touch cadence tracking (call/email/LinkedIn sequences) — Implemented on January 27, 2026  
   - Acceptance: cadence step logging + auto-next-step task.
2) [P2] Handoff package standard (notes + meeting booked + outcome) — Implemented on January 27, 2026  
   - Acceptance: handoff requires meeting + summary note.

**Sales Manager gaps:**
1) [P2] Deal review workflow (no next step, stuck stage, late-stage alerts)  
   - Status: PARTIAL (pipeline health review queue + manager coaching task creation + review thread/outcomes + rep acknowledgment with due dates implemented; deeper coaching automation/reporting still pending).
   - Acceptance: review queue + review outcomes (Approve / Needs Work / Escalate) + rep acknowledgment tracking.
2) [P3] Forecast category governance + commit tracking  
   - Acceptance: commit changes require manager approval + audit.

**Sales Ops / CRM Admin gaps:**
1) [P3] Stage exit criteria configuration UI  
   - Acceptance: configurable per stage in admin UI.
2) [P3] Required-field rules per stage in UI  
   - Acceptance: admin can set per-stage required fields.
3) [P3] Data quality tooling (duplicate detection/merge)  
   - Acceptance: duplicate merge UI with audit trail.

**Pre‑Sales / Solution Consultant gaps:**
1) [P2] Opportunity team membership + role tracking  
   - Acceptance: add/remove team members with role.
2) [P2] Demo/POC tracking with outcomes  
   - Acceptance: demo activity template + outcome required.
3) [P2] Technical risk/constraint capture fields  
   - Acceptance: risk/constraint section on opportunity.

**Finance gaps:**
1) [P3] Discount approval queue + margin visibility  
   - Acceptance: approval includes margin + impact.
2) [P3] Billing schedule/payment term configuration  
   - Acceptance: billing terms required before Closed Won.
3) [P3] ERP/invoicing handoff trigger  
   - Acceptance: handoff event on contract signature.

**Legal gaps:**
1) [P3] Contract review request flow  
   - Acceptance: request captured with owner + SLA.
2) [P3] Clause/redline tracking  
   - Acceptance: redline status visible on opportunity.
3) [P3] Signature readiness status  
   - Acceptance: stage cannot close without legal ready flag.

**Delivery / Implementation gaps:**
1) [P2] Onboarding checklist + milestone tracking  
   - Acceptance: checklist tasks created on Closed Won.
2) [P2] Handoff package template (scope/risks/timeline)  
   - Acceptance: required handoff notes before kickoff.
3) [P2] Implementation completion signal  
   - Acceptance: completion status updates account.

**CSM gaps:**
1) [P3] Health scoring model + automated risk alerts  
   - Acceptance: health score visible + alert on drop.
2) [P3] NPS capture + feedback log  
   - Acceptance: NPS survey result stored per account.
3) [P3] Renewal workflow + expansion trigger  
   - Acceptance: renewal playbook + expansion suggestion.

**Support / Service gaps:**
1) [P3] Case intake + SLA timers  
   - Acceptance: SLA clock + breach alerts.
2) [P3] Priority classification + escalation  
   - Acceptance: priority → queue + escalation rules.
3) [P3] Case-to-account health feedback loop  
   - Acceptance: case trends affect account health.

# Later Candidate Backlog (Draft)

1) Next-best-action suggestions (LOW-MED)
2) Deal risk alerts (LOW-MED)
3) Activity summaries (MED)
4) Email draft suggestions (MED)
5) KPI explanations (MED)
6) Dedicated award screen (SCM) (MED)
7) Lead cadence channel management UI (admin manage add/edit/disable)
8) Configurable Lead SLA rules in Settings (tenant defaults + source overrides)
9) Qualification option lookups in API/DB (replace hard-coded UI options)

# Later Options (Draft)

- Approval workflow (multi-level) options

---

## 19) Resolved Conflicts (Applied)
- Competitive gap vs current reality: email integration is **transactional only** today; full email sync/templates remain a gap.
- Evidence paths updated to `client/src/app/crm/features/...` to match current structure.
- Foundry agent 500s in Azure dev fixed by wiring `FoundryAgentOptions` into DI and setting App Service config (`FoundryAgent__*`).

## 20) Conflicts to Validate
- Next says notification center is done, competitive gap previously marked it as missing. Current status is in-app toasts + preferences; confirm if the full notification center UI is complete.
- Calendar sync is marked NOT STARTED; confirm whether any provider integration has been added.

---

## 21) Legacy and Reference Docs (Superseded)
The following documents are superseded by this master file and should only be used for historical reference:
- `docs/PROJECT_CONTRACT.md`
- `docs/PROJECT_PHASES.md`
- `docs/STYLE_GUIDE.md`
- `docs/COMPONENT_STYLE_GUIDE.md`
- `docs/ISSUE_FIXES.md`
- `docs/LESSONS_LEARNED.md`
- `docs/USER_GUIDE.md`
- `docs/UseCases_V1.txt`
- `docs/TEST_PLAN.md`
- `docs/COMPETITIVE_GAP.md`
- `docs/login-cors-fix.md`

---

## Documentation Discipline (Required)
To keep the project auditable and clean:
- **Daily operations must be logged** in `docs/DAILY_OPERATIONS_LOG.md` (errors, fixes, successes, follow‑ups).
- **Project‑level decisions and verified outcomes** must be reflected in `docs/PROJECT_MASTER.md`.
- **Supporting procedures/guides** should live in focused docs (e.g., `docs/ai/FOUNDARY_FINE_TUNING_GUIDE.md`) and be referenced here.
