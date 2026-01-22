# Project Phases (Merged)

This document merges Phase 1, Phase 2, Phase 3, and Phase 3 Options into one reference.

---

# Phase 1 Checklist (Draft)

Source: MVP Phase 1 requirements shared in chat. This is a working checklist; update as needed.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

## 1) Scope

Acceptance criteria are written as testable statements (UI + API). Use these to certify Phase 1.

1) Auth + Users (Admin/User)
- Status: DONE
- Evidence:
  - Auth endpoints: `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`
  - Users + roles: `server/src/CRM.Enterprise.Api/Controllers/UsersController.cs`
  - Roles UI: `client/src/app/features/settings/pages/roles.page.ts`
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

3) Accounts (CRUD, list/search/filter, pagination)
- Status: PARTIAL
- Evidence:
  - Customers UI: `client/src/app/features/customers/pages/customers.page.html`
  - Customers API: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
- Gaps to confirm:
  - Pagination wiring in UI vs API
  - Search/filter coverage for all fields
- Acceptance criteria:
  - User can create, edit, and delete an account.
  - Accounts list supports search and status filter.
  - Pagination works and page size changes update results.

4) OwnerId + Created/Updated audit fields
- Status: PARTIAL
- Evidence:
  - Entities store CreatedAtUtc/UpdatedAtUtc in multiple controllers
- Gaps:
  - Consistency across all entities and UI display
- Acceptance criteria:
  - Each entity (Account, Contact, Opportunity, Activity) stores CreatedAtUtc and UpdatedAtUtc on create/update.
  - OwnerId is persisted and surfaced in list views.

5) Contacts (CRUD, linked to Account)
- Status: DONE
- Evidence:
  - Contacts UI: `client/src/app/features/contacts/pages/contacts.page.html`
  - Contacts API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
- Acceptance criteria:
  - User can create/edit/delete a contact.
  - Contact can link to an account.
  - Contacts list supports search by name/email/phone.

6) Opportunities (CRUD, Stage/Amount/CloseDate/WinLoss reason)
- Status: DONE
- Evidence:
  - Opportunities UI + form: `client/src/app/features/opportunities/pages/opportunities.page.html`
  - Opportunities API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - User can create/edit/delete an opportunity.
  - Stage, amount, close date, and win/loss reason persist.

7) Opportunities list + simple pipeline view
- Status: DONE
- Evidence:
  - Table + pipeline view: `client/src/app/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - User can toggle table vs pipeline view.
  - Pipeline shows counts and total value per stage.

8) Activities (Task/Call/Meeting; due date, priority, status)
- Status: PARTIAL
- Evidence:
  - Activities UI: `client/src/app/features/activities/pages/activities.page.html`
  - Activities API: `server/src/CRM.Enterprise.Api/Controllers/ActivitiesController.cs`
- Gaps:
  - “My Tasks” view + overdue highlighting proof
- Acceptance criteria:
  - User can create/edit/delete an activity of type Task/Call/Meeting.
  - Due date and priority persist.
  - “My Tasks” filter exists and overdue items are highlighted.

9) Dashboard (KPI cards, upcoming activities, recent accounts)
- Status: DONE
- Evidence:
  - Dashboard UI: `client/src/app/features/dashboard/pages/dashboard.page.html`
  - Dashboard API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
- Acceptance criteria:
  - Dashboard shows KPIs for accounts, pipeline, and tasks due today.
  - Upcoming activities (next 7 days) render.
  - Recently viewed accounts render.

## 2) Architecture (Phase 1)

Acceptance criteria are architectural checks rather than UI flows.

1) Microservices: IdentityService + CrmCoreService
- Status: PARTIAL
- Evidence:
  - Current structure is a single API project
- Gap:
  - Separate deployable services are not visible
- Acceptance criteria:
  - Identity service and CRM core can deploy independently.
  - Each service has its own API host and database boundary.

2) Clean Architecture (API/Application/Domain/Infrastructure/Contracts)
- Status: DONE
- Evidence:
  - Layers exist in server solution
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
- Evidence:
  - Migrations in server project
- Acceptance criteria:
  - `dotnet ef database update` succeeds on clean DB.

## 3) Data (Local-first)

1) SQL Server local (Docker recommended)
- Status: PARTIAL
- Evidence:
  - SQL usage and migrations present
- Gap:
  - Docker setup not verified here
- Acceptance criteria:
  - Docker compose (or documented steps) spins up SQL locally.

2) One DB with separate schemas (identity.*, crm.*)
- Status: DONE
- Evidence:
  - Controllers reference identity/crm schemas in EF
- Acceptance criteria:
  - Tables are created under `identity` and `crm` schemas.

3) No cross-service joins beyond CrmCore boundary
- Status: UNKNOWN
- Evidence:
  - Hard to confirm without service split
- Acceptance criteria:
  - No EF joins across service boundaries once split.

## 4) UI (Dynamics-style, lean)

1) Pages: Dashboard, Accounts, Contacts, Opportunities, Activities
- Status: DONE
- Evidence:
  - Routes in `client/src/app/app.routes.ts`
- Acceptance criteria:
  - Each page is reachable from sidebar navigation.

2) Layout: left sidebar + top bar + content area, PrimeNG tables/dialogs/toasts
- Status: DONE
- Evidence:
  - Shell layout + UI usage in client
- Acceptance criteria:
  - Layout is consistent across pages and uses PrimeNG tables/dialogs/toasts.

## 5) Done When

1) User logs in
- Status: DONE
- Acceptance criteria:
  - Login UI accepts credentials and routes to dashboard.
2) Can create Account → Contact → Opportunity → Activity
- Status: DONE (covered by E2E test)
- Acceptance criteria:
  - End-to-end flow succeeds (covered by `client/e2e/core-flows.spec.ts`).
3) Can see KPIs + upcoming tasks on dashboard
- Status: DONE
- Acceptance criteria:
  - KPI cards and upcoming activities render with non-empty values.
4) Runs fully on local SQL with migrations and seed data
- Status: PARTIAL (seed data presence not fully verified)

---

# Phase 2 Checklist (Draft)

Source: revised Phase 2 plan from discussion. This is a working checklist; update items or acceptance criteria as needed.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

## Phase 2A: Foundation

Acceptance criteria are written as testable statements (UI + API).

1) Multi-tenancy + workspace settings
- Status: DONE
- Evidence:
  - Workspace settings UI: `client/src/app/features/settings/pages/workspace-settings.page.ts`
  - Workspace settings API: `server/src/CRM.Enterprise.Api/Controllers/WorkspaceController.cs`
  - Tenant middleware + filters: `server/src/CRM.Enterprise.Api/Middleware/TenantResolutionMiddleware.cs`
- Acceptance criteria:
  - Tenant isolation enforced for all CRM entities.
  - Workspace settings update and persist by tenant.
  - Tenant context resolved for each request.

2) Account / Contact detail enrichment (timeline, attachments, related records, notes)
- Status: DONE
- Evidence:
  - Customers page: `client/src/app/features/customers/pages/customers.page.html`
  - Contacts page: `client/src/app/features/contacts/pages/contacts.page.html`
- Acceptance criteria:
  - Timeline shows recent activities.
  - Attachments can be uploaded and downloaded.
  - Related records tabs show linked opportunities/activities.

## Phase 2B: Core Features

3) Lead lifecycle (CRUD + workflow + conversion + assignment rules)
- Status: DONE
- Evidence:
  - Lead form + conversion: `client/src/app/features/leads/pages/lead-form.page.ts`
  - Lead conversion: `client/src/app/features/leads/pages/lead-convert.page.ts`
  - Assignment rules UI: `client/src/app/features/settings/pages/lead-assignment.page.ts`
  - API endpoints: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
- Acceptance criteria:
  - Leads can be created, assigned, converted.
  - Assignment rules apply deterministically.
  - Conversion creates account/contact/opportunity when selected.

4) Lead AI scoring
- Status: DONE
- Evidence:
  - OpenAI scoring service: `server/src/CRM.Enterprise.Infrastructure/Leads/OpenAiLeadScoringService.cs`
  - AI score endpoint: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - Auto-score trigger on key field changes: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - UI trigger + display: `client/src/app/features/leads/pages/lead-form.page.ts`
- Acceptance criteria:
  - AI score returns a confidence and rationale.
  - Score updates when key fields change.

5) Opportunity enhancements (probability, stage history, win/loss reason, risk alerts)
- Status: DONE
- Evidence:
  - Stage history API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
  - Timeline UI and pipeline alerts: `client/src/app/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - Stage history entries created on stage change.
  - Win/loss reason required on close.
  - Stalled deals flagged in pipeline view.

6) Lightweight approval thresholds (single-level)
- Status: DONE
- Evidence:
  - Workspace settings UI: `client/src/app/features/settings/pages/workspace-settings.page.html`
  - Opportunity enforcement: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - Manager-configurable thresholds (amount and/or discount) stored in workspace settings.
  - Opportunity close blocked when thresholds exceeded until approved.
  - Single approver role (default Sales Manager).

## Phase 2C: Integrations

6) Calendar sync (Google/Outlook)
- Status: NOT STARTED
- Evidence:
  - Calendar UI exists, but no sync: `client/src/app/features/activities/pages/activities.page.ts`
- Acceptance criteria:
  - OAuth connection to Google/Outlook.
  - 2-way sync for meetings/tasks.

7) Email integration (send + sync + templates)
- Status: NOT STARTED
- Evidence:
  - No API or UI references found
- Acceptance criteria:
  - Email templates CRUD.
  - Send email from CRM and log to timeline.
  - Inbox sync for replies.

8) CSV import/export
- Status: DONE
- Evidence:
  - Export wired for customers: `client/src/app/features/customers/pages/customers.page.ts`
  - Export wired for contacts: `client/src/app/features/contacts/pages/contacts.page.ts`
  - Export wired for opportunities: `client/src/app/features/opportunities/pages/opportunities.page.ts`
  - Import API: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
  - Import API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
  - Import API: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - Import UI: `client/src/app/features/customers/pages/customers.page.html`
  - Import UI: `client/src/app/features/contacts/pages/contacts.page.html`
  - Import UI: `client/src/app/features/leads/pages/leads.page.html`
- Acceptance criteria:
  - CSV export available from list views (customers, contacts, opportunities).
  - CSV import for accounts, contacts, leads.

## Phase 2D: Engagement

9) Notification center + email notifications + preferences
- Status: DONE
- Evidence:
  - In-app toast notifications: `client/src/app/core/notifications/notification.service.ts`
  - UI container: `client/src/app/core/notifications/notification-container.component.ts`
  - Preferences API: `server/src/CRM.Enterprise.Api/Controllers/NotificationPreferencesController.cs`
  - Email delivery jobs: `server/src/CRM.Enterprise.Api/Jobs/NotificationEmailJobs.cs`
  - Preferences UI: `client/src/app/features/settings/pages/notifications.page.ts`
- Acceptance criteria:
  - Notification center with read/unread state.
  - Email notifications for tasks/opps with opt-out preferences.

10) Ops hardening (background jobs, retries, health checks)
- Status: DONE
- Evidence:
  - Health endpoints + detailed healthz: `server/src/CRM.Enterprise.Api/Program.cs`
  - Background jobs (Hangfire): `server/src/CRM.Enterprise.Api/Jobs/BackgroundJobs.cs`
  - Retry policies (SQL + Hangfire): `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`
    `server/src/CRM.Enterprise.Api/Jobs/CsvImportJobs.cs`
- Acceptance criteria:
  - Background jobs run for email + imports.
  - Health endpoint and basic retry policies exist.

## Phase 2E: Low-complexity UX wins

11) Activity templates (Call/Meeting/Follow-up)
- Status: DONE
- Evidence:
  - Activity form templates: `client/src/app/features/activities/pages/activity-form.page.ts`
- Acceptance criteria:
  - User can pick a template to prefill subject, type, priority, description.

12) Saved filters/views per user
- Status: DONE
- Evidence:
  - Customers views: `client/src/app/features/customers/pages/customers.page.ts`
  - Contacts views: `client/src/app/features/contacts/pages/contacts.page.ts`
  - Leads views: `client/src/app/features/leads/pages/leads.page.ts`
  - Opportunities views: `client/src/app/features/opportunities/pages/opportunities.page.ts`
  - Storage service: `client/src/app/shared/services/saved-views.service.ts`
- Acceptance criteria:
  - Saved view can be created, named, and recalled per user.
  - Views persist across sessions per user (local storage scoped to user id).

13) Bulk actions on lists (assign owner, delete, change status)
- Status: DONE
- Evidence:
  - Customers bulk assign/delete: `client/src/app/features/customers/pages/customers.page.ts`
  - Contacts bulk assign/delete: `client/src/app/features/contacts/pages/contacts.page.ts`
  - Leads bulk assign/delete: `client/src/app/features/leads/pages/leads.page.ts`
  - Bulk assign API: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
  - Bulk assign API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
  - Bulk assign API: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - Bulk status API: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
  - Bulk status API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
  - Bulk status API: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
- Acceptance criteria:
  - Multi-select rows and perform bulk actions with confirmation.
  - Bulk operations report partial failures clearly.

14) Inline edit for simple fields (owner, status, stage)
- Status: DONE
- Evidence:
  - Customers inline owner/status: `client/src/app/features/customers/pages/customers.page.html`
  - Contacts inline owner/lifecycle: `client/src/app/features/contacts/pages/contacts.page.html`
  - Leads inline owner/status: `client/src/app/features/leads/pages/leads.page.html`
  - Opportunities inline owner/stage: `client/src/app/features/opportunities/pages/opportunities.page.html`
  - API patch endpoints: `server/src/CRM.Enterprise.Api/Controllers/CustomersController.cs`
  - API patch endpoints: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
  - API patch endpoints: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - API patch endpoints: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - Inline edits update the record without leaving the list view.
  - Validation errors display inline and do not erase other fields.

15) Recently viewed lists in each module
- Status: DONE
- Evidence:
  - Shared service: `client/src/app/shared/services/recently-viewed.service.ts`
  - Customers UI: `client/src/app/features/customers/pages/customers.page.html`
  - Contacts UI: `client/src/app/features/contacts/pages/contacts.page.html`
  - Leads UI: `client/src/app/features/leads/pages/leads.page.html`
  - Opportunities UI: `client/src/app/features/opportunities/pages/opportunities.page.html`

---

# Phase 3 Candidate Backlog (Draft)

These are post-Phase 2 ideas. Prioritized by importance with complexity noted.
Order: high impact + low complexity first.

## Priority Order (Low -> High Complexity)

1) Next-best-action suggestions (LOW-MED)
- Goal: Recommend 2-3 actions per lead/opportunity (follow-up, schedule meeting, send proposal).
- Inputs: stage, last activity date, amount, close date, owner workload.
- Output: list of suggested actions + rationale.
- Acceptance criteria:
  - Shows top 2-3 actions with rationale on lead/opportunity detail.
  - Respects tenant + permissions; no cross-tenant data.
  - Read-only: no record updates from AI.

2) Deal risk alerts (LOW-MED)
- Goal: Flag opportunities at risk (stalled > N days, close date slipped, no activity).
- Inputs: stage history, activity recency, close date changes.
- Output: risk badge + short rationale.
- Acceptance criteria:
  - Risk badge appears when rule thresholds are met.
  - Rationale lists the trigger (e.g., "No activity in 21 days").
  - Badge clears when activity resumes or stage changes.

3) Activity summaries (MED)
- Goal: Summarize meeting notes or call transcripts.
- Inputs: activity description or transcript.
- Output: short summary + key decisions.
- Acceptance criteria:
  - Summary appears under activity details within 10 seconds.
  - Summary length capped (e.g., 2-4 sentences).
  - User can re-generate summary on demand.

4) Email draft suggestions (MED)
- Goal: Provide suggested email copy for follow-ups.
- Inputs: last interaction, stage, contact name, company.
- Output: subject + body draft.
- Acceptance criteria:
  - Draft appears in a modal with editable text.
  - No sending or logging unless user confirms.
  - Draft respects tenant + permissions.

5) KPI explanations (MED)
- Goal: Explain KPI movement (pipeline value up/down).
- Inputs: metric change + records affecting the change.
- Output: narrative summary with record references.
- Acceptance criteria:
  - Explanation cites 3-5 records that drove the change.
  - Links open the referenced records.
  - "No explanation" shown if data is insufficient.

6) Dedicated Award Screen (SCM) (MED)
- Goal: Provide a focused award workspace for RFQ awards (no modal-only flow).
- Inputs: RFQ, selected supplier quotes, award amount, terms, effective dates.
- Output: award detail page with summary + audit trail.
- Acceptance criteria:
  - `/app/supply-chain/awards/:id` shows award header, linked RFQ, and supplier.
  - Award line items show item, qty, unit price, total, and currency.
  - Read-only for v1; edit flow can be added later.

## Industry Module (HIGH)

Goal: Allow tenants to enable domain modules (e.g., supply chain).

Recommended approach:
- Keep core CRM default.
- Add a tenant-level module pack flag to enable/disable features.
- Start with minimal navigation and permissions gating.
- Pilot with 1-2 tenants before broad rollout.

Supply chain scope ideas (defer to later):
- RFQ / RFI workflows
- Comparison + award
- Inventory
- Product catalog
- Pricing & rate cards (procurement cost only)

Acceptance criteria:
- Module pack toggle stored per tenant and drives menu visibility.
- Permissions gate access to all module routes.
- Core CRM remains unchanged when module is off.

## Catalog & Pricing (Future Split)

Decision:
- Supply-chain pack manages purchase/cost pricing only.
- Sales/POS pack (future) manages sell pricing and promotions.

Recommended tables (SCM schema):
- `scm.PriceLists`
  - `Id`, `TenantId`, `Name`, `Currency`, `Status`, `ValidFrom`, `ValidTo`, `Notes`, audit fields
- `scm.PriceListItems`
  - `Id`, `TenantId`, `PriceListId`, `ItemMasterId`, `Uom`, `UnitPrice`, `MinQty`, `MaxQty`, `LeadTimeDays`, `IsActive`, audit fields
- Optional: `scm.PriceListOverrides` (later)
  - `Id`, `TenantId`, `PriceListId`, `SupplierId`, `ItemMasterId`, `Uom`, `UnitPrice`, `ValidFrom`, `ValidTo`, `IsActive`, audit fields

Sales/POS pack (future tables):
- `sales.PriceLists` (sell prices)
- `sales.PriceRules` (discounts, tiers, promos)

## SCM Pricing Roadmap (Cost-Only)

MVP (2-3 weeks):
- Tables: `scm.PriceLists`, `scm.PriceListItems`
- Read-only list screens + filters
- API: GET price lists + items
- UI: Catalog & Pricing shows supplier cost pricing only

v1 (3-5 weeks):
- CRUD for price lists + items
- Validation: date ranges, currency, UOM
- CSV import/export
- Audit fields + basic history

v2 (later):
- `scm.PriceListOverrides` (supplier-specific exceptions)
- Effective-date versioning
- Optional approval workflow

---

# Phase 3 Options (Draft)

This document captures deferred features and expansion paths after Phase 2.

## Approval Workflow (Multi-Level)

- Goal: enable multi-level approvals (e.g., rep -> manager -> finance).
- Rationale: only after customer demand is proven.

### Options

1) Fixed 2-level approval
- Manager approval required, optional finance approval for high discount.

2) Configurable multi-level approval
- Admin defines levels, thresholds, and approver roles.
- Per-opportunity approval status and audit log.

### Triggers (examples)

- Amount > threshold
- Discount % > threshold
- Stage change to Closed Won

### Data to capture

- Requested by, requested at
- Approved by, approved at
- Reason / notes

### Non-goals for Phase 3

- Full workflow automation builder
- Complex conditional branching beyond thresholds

