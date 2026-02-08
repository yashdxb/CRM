# CRM Backlog (Single Source of Truth)

Purpose: Consolidated CRM backlog across Now/Next/Later. SCM items live in `docs/SCM_BACKLOG.md`. Keep ClickUp in sync with this document.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

---

## Now Checklist (Draft)

Source: MVP Now requirements shared in chat. This is a working checklist; update as needed.

### 1) Scope

Acceptance criteria are written as testable statements (UI + API). Use these to certify Now.

1) Auth + Users (Admin/User)
MoSCoW: Must
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
MoSCoW: Must
- Status: DONE
- Evidence:
  - JWT setup: `server/src/CRM.Enterprise.Api/Program.cs`
  - Login/logout endpoints: `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`
- Acceptance criteria:
  - Login returns access token + expiry.
  - Logout returns 204 and requires auth.

3) Accounts (CRUD, list/search/filter, pagination)
MoSCoW: Must
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
MoSCoW: Must
- Status: PARTIAL
- Evidence:
  - Entities store CreatedAtUtc/UpdatedAtUtc in multiple controllers
- Gaps:
  - Consistency across all entities and UI display
- Acceptance criteria:
  - Each entity (Account, Contact, Opportunity, Activity) stores CreatedAtUtc and UpdatedAtUtc on create/update.
  - OwnerId is persisted and surfaced in list views.

5) Contacts (CRUD, linked to Account)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Contacts UI: `client/src/app/features/contacts/pages/contacts.page.html`
  - Contacts API: `server/src/CRM.Enterprise.Api/Controllers/ContactsController.cs`
- Acceptance criteria:
  - User can create/edit/delete a contact.
  - Contact can link to an account.
  - Contacts list supports search by name/email/phone.

6) Opportunities (CRUD, Stage/Amount/CloseDate/WinLoss reason)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Opportunities UI + form: `client/src/app/features/opportunities/pages/opportunities.page.html`
  - Opportunities API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - User can create/edit/delete an opportunity.
  - Stage, amount, close date, and win/loss reason persist.

7) Opportunities list + simple pipeline view
MoSCoW: Must
- Status: DONE
- Evidence:
  - Table + pipeline view: `client/src/app/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - User can toggle table vs pipeline view.
  - Pipeline shows counts and total value per stage.

8) Activities (Task/Call/Meeting; due date, priority, status)
MoSCoW: Must
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
MoSCoW: Must
- Status: DONE
- Evidence:
  - Dashboard UI: `client/src/app/features/dashboard/pages/dashboard.page.html`
  - Dashboard API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
- Acceptance criteria:
  - Dashboard shows KPIs for accounts, pipeline, and tasks due today.
  - Upcoming activities (next 7 days) render.
  - Recently viewed accounts render.

### 2) UI (Dynamics-style, lean)

1) Pages: Dashboard, Accounts, Contacts, Opportunities, Activities
MoSCoW: Must
- Status: DONE
- Evidence:
  - Routes in `client/src/app/app.routes.ts`
- Acceptance criteria:
  - Each page is reachable from sidebar navigation.

2) Layout: left sidebar + top bar + content area, PrimeNG tables/dialogs/toasts
MoSCoW: Must
- Status: DONE
- Evidence:
  - Shell layout + UI usage in client
- Acceptance criteria:
  - Layout is consistent across pages and uses PrimeNG tables/dialogs/toasts.

### 3) Done When

1) User logs in
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - Login UI accepts credentials and routes to dashboard.
2) Can create Account → Contact → Opportunity → Activity
MoSCoW: Must
- Status: DONE (covered by E2E test)
- Acceptance criteria:
  - End-to-end flow succeeds (covered by `client/e2e/core-flows.spec.ts`).
3) Can see KPIs + upcoming tasks on dashboard
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - KPI cards and upcoming activities render with non-empty values.
4) Runs fully on local SQL with migrations and seed data
MoSCoW: Should
- Status: PARTIAL (seed data presence not fully verified)

---

## Next Checklist (Draft)

Source: revised Next plan from discussion. This is a working checklist; update items or acceptance criteria as needed.

### Next: Foundation

Acceptance criteria are written as testable statements (UI + API).

1) Multi-tenancy + workspace settings
MoSCoW: Must
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
MoSCoW: Should
- Status: DONE
- Evidence:
  - Customers page: `client/src/app/features/customers/pages/customers.page.html`
  - Contacts page: `client/src/app/features/contacts/pages/contacts.page.html`
- Acceptance criteria:
  - Timeline shows recent activities.
  - Attachments can be uploaded and downloaded.
  - Related records tabs show linked opportunities/activities.

### Next: Core Features

3) Lead lifecycle (CRUD + workflow + conversion + assignment rules)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Lead form + conversion: `client/src/app/features/leads/pages/lead-form.page.ts`
  - Lead conversion: `client/src/app/features/leads/pages/lead-convert.page.ts`
  - Conversion guardrails + policy UI: `client/src/app/crm/features/leads/pages/lead-convert.page.ts`
  - Workspace qualification policy settings: `client/src/app/crm/features/settings/pages/workspace-settings.page.ts`
  - Qualification policy storage: `server/src/CRM.Enterprise.Api/Controllers/WorkspaceController.cs`
  - Qualification policy rules + enforcement: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
  - Assignment rules UI: `client/src/app/features/settings/pages/lead-assignment.page.ts`
  - API endpoints: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - CQVS qualification UX + feedback: `client/src/app/crm/features/leads/pages/lead-form.page.html`
  - CQVS styling + score breakdown UI: `client/src/app/crm/features/leads/pages/lead-form.page.scss`
  - Confidence gauge (PrimeNG Knob): `client/src/app/crm/features/leads/pages/lead-form.page.html`
  - CQVS data + confidence logic: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
  - Qualification validation timestamps: `server/src/CRM.Enterprise.Infrastructure/Persistence/Migrations/20260204233855_AddLeadQualificationValidationDates.cs`
- Acceptance criteria:
  - Leads can be created, assigned, converted.
  - Assignment rules apply deterministically.
  - Conversion creates account/contact/opportunity when selected.
  - Conversion respects configurable qualification thresholds + modifiers.
  - Overrides require manager approval and/or reason when below threshold.
  - Qualification factors default to Unknown, evidence locks when Unknown, and inline feedback shows confidence + truth coverage + assumptions + weakest signal.

4) Lead AI scoring
MoSCoW: Should
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
MoSCoW: Should
- Status: DONE
- Evidence:
  - Stage history API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
  - Timeline UI and pipeline alerts: `client/src/app/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - Stage history entries created on stage change.
  - Win/loss reason required on close.
  - Stalled deals flagged in pipeline view.

6) Lightweight approval thresholds (single-level)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Workspace settings UI: `client/src/app/features/settings/pages/workspace-settings.page.html`
  - Opportunity enforcement: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - Manager-configurable thresholds (amount and/or discount) stored in workspace settings.
  - Opportunity close blocked when thresholds exceeded until approved.
  - Single approver role (default Sales Manager).

7) Epistemic dashboard widgets (Truth Metrics, Risk Register, Confidence Forecast)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Dashboard widgets UI: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
  - Dashboard widget styling: `client/src/app/crm/features/dashboard/pages/dashboard.page.scss`
  - Dashboard widget logic: `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`
  - Dashboard summary contract: `server/src/CRM.Enterprise.Api/Contracts/Dashboard/DashboardSummaryResponse.cs`
  - Dashboard summary source: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
- Acceptance criteria:
  - Truth Metrics card shows truth coverage, confidence label, time-to-truth.
  - Risk Register card lists top risk flags and total count.
  - Confidence Forecast card shows confidence-weighted pipeline vs raw pipeline.

8) Hierarchy-level dashboard packs (H1/H2/H3...) + reset
MoSCoW: Should
- Status: DONE
- Evidence:
  - Role-level layout defaults (client): `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`
  - Role-level defaults API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
  - Role-level defaults persistence: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardLayoutService.cs`
  - Reset to role default button: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
- Acceptance criteria:
  - Role levels are configured per role (no hard-coded role names).
  - Default layout per level is stored in tenant config and served by the API.
  - Role levels are editable in Settings → Roles.
  - User customizations persist and override the default pack.
  - “Reset to Role Default” restores the role-level pack layout.

9) Named default dashboard templates (admin-defined)
MoSCoW: Should
- Status: DONE
- Evidence:
  - Template API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
  - Template storage: `server/src/CRM.Enterprise.Domain/Entities/DashboardTemplate.cs`
  - Template persistence: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardLayoutService.cs`
  - Template UI: `client/src/app/crm/features/settings/pages/dashboard-packs.page.html`
- Acceptance criteria:
  - Admin can create named templates (no hard-coded names).
  - Templates define visible cards and order.
  - One template can be marked as default.
  - Default template applies when no role-level pack is configured.

### Next: Integrations

6) Calendar sync (Google/Outlook)
MoSCoW: Could
- Status: NOT STARTED
- Evidence:
  - Calendar UI exists, but no sync: `client/src/app/features/activities/pages/activities.page.ts`
- Acceptance criteria:
  - OAuth connection to Google/Outlook.
  - 2-way sync for meetings/tasks.

7) Email integration (send + sync + templates)
MoSCoW: Could
- Status: NOT STARTED
- Evidence:
  - No API or UI references found
- Acceptance criteria:
  - Email templates CRUD.
  - Send email from CRM and log to timeline.
  - Inbox sync for replies.

8) CSV import/export
MoSCoW: Should
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

### Next: Engagement

9) Notification center + email notifications + preferences
MoSCoW: Should
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

### Next: Low-complexity UX wins

10) Activity templates (Call/Meeting/Follow-up)
MoSCoW: Should
- Status: DONE
- Evidence:
  - Activity form templates: `client/src/app/features/activities/pages/activity-form.page.ts`
- Acceptance criteria:
  - User can pick a template to prefill subject, type, priority, description.

11) Bulk actions on lists (assign owner, delete, change status)
MoSCoW: Should
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

12) Inline edit for simple fields (owner, status, stage)
MoSCoW: Should
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

13) Recently viewed lists in each module
MoSCoW: Should
- Status: DONE
- Evidence:
  - Shared service: `client/src/app/shared/services/recently-viewed.service.ts`
  - Customers UI: `client/src/app/features/customers/pages/customers.page.html`
  - Contacts UI: `client/src/app/features/contacts/pages/contacts.page.html`
  - Leads UI: `client/src/app/features/leads/pages/leads.page.html`
  - Opportunities UI: `client/src/app/features/opportunities/pages/opportunities.page.html`
  - Activities UI: `client/src/app/features/activities/pages/activities.page.html`
- Acceptance criteria:
  - Last 5-10 items viewed are visible per module.
  - Entries persist per user and update on view.

14) Quick-add modal (lead/contact/activity)
MoSCoW: Should
- Status: DONE
- Evidence:
  - Shell quick-add dialog: `client/src/app/layout/shell.component.ts`
- Acceptance criteria:
  - Create lead/contact/activity without leaving the current page.
  - Shows validation and success feedback, closes on save.

### Next: Permissions & Roles (Capability Model)

15) Capability-first permission model with role intent
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - Permissions are grouped by capability (not only by entity CRUD).
  - Role editor supports view by capability and view by role intent.
  - “Apply Default” resets to the role’s base pack while preserving drift notes.
- Evidence:
  - Capability/intent views: `client/src/app/crm/features/settings/pages/role-form.page.html`
  - Capability grouping + drift handling: `client/src/app/crm/features/settings/pages/role-form.page.ts`
  - Permission catalog w/ capability: `server/src/CRM.Enterprise.Domain/Security/Permissions.cs`

16) Policy gates for high-risk actions (threshold enforcement)
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - Approval/override thresholds are enforced server-side (discount %, deal size, stage gates).
  - UI displays the applicable policy gate when a user is blocked.
  - Gate violations are logged in audit trail with rule name and threshold.
- Evidence:
  - Server-side gates + audit: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
  - UI policy gate banner: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`
  - UI policy gate logic: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`

17) Approval permissions separated from edit rights
MoSCoW: Must
- Status: IN PROGRESS
- Acceptance criteria:
  - “Request approval”, “Approve”, and “Override” are separate permissions.
  - Users can edit opportunities without automatically gaining approval rights.
  - Approval actions are blocked if user lacks the specific approval permission.
- Evidence:
  - ClickUp task created in CRM Backlog (see ClickUp sync).

18) Role drift + pack presets
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - H1/H2/H3 permission pack presets are available; editing a role creates drift.
  - Role Drift panel shows deltas and reasons, with “Reset to Default” and “Accept Drift”.
  - Drift changes are stored with timestamp and editor identity.
- Evidence:
  - Drift panel + presets: `client/src/app/crm/features/settings/pages/role-form.page.html`
  - Drift logic: `client/src/app/crm/features/settings/pages/role-form.page.ts`
  - Base pack storage: `server/src/CRM.Enterprise.Domain/Entities/Role.cs`

19) Role hierarchy (Salesforce-style reporting structure)
MoSCoW: Must
- Status: DONE
- Acceptance criteria:
  - Roles can be arranged in a parent/child hierarchy.
  - Hierarchy level is computed from parent/child depth (no manual level input) and visible in roles list/edit view.
  - Permission inheritance is explicit (show inherited vs direct permissions).
  - Reporting visibility respects hierarchy rules (manager sees team rollups).
  - Each role can set reporting visibility scope (Self/Team/All).
- Evidence:
  - Role hierarchy fields: `server/src/CRM.Enterprise.Domain/Entities/Role.cs`
  - API updates: `server/src/CRM.Enterprise.Api/Controllers/RolesController.cs`
  - Role form parent selection: `client/src/app/crm/features/settings/pages/role-form.page.html`
  - Visibility scope in role form: `client/src/app/crm/features/settings/pages/role-form.page.html`
  - Dashboard rollup scoping: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
  - Inherited permissions panel: `client/src/app/crm/features/settings/pages/role-form.page.html`

20) Security level separate from hierarchy (configurable)
MoSCoW: Should
- Status: DONE
- Evidence:
  - Security level definitions: `server/src/CRM.Enterprise.Domain/Entities/SecurityLevelDefinition.cs`
  - Role field + defaults: `server/src/CRM.Enterprise.Domain/Entities/Role.cs`
  - API support: `server/src/CRM.Enterprise.Api/Controllers/RolesController.cs`
  - Security levels API: `server/src/CRM.Enterprise.Api/Controllers/SecurityLevelsController.cs`
  - Security levels page: `client/src/app/crm/features/settings/pages/security-levels.page.ts`
  - Role form UI: `client/src/app/crm/features/settings/pages/role-form.page.html`
- Acceptance criteria:
  - Super Admin can create/update/delete security levels and set a default.
  - Security levels are definable per tenant with no hard-coded labels.
  - Role references a security level (independent of hierarchy).
  - Security levels are managed via Settings → Security Levels and selectable in role editor.

### Summary

Not done yet. Core CRM enhancements are strong, but integration and engagement items remain missing/partial. This checklist can be treated as the acceptance criteria going forward.

---

## ClickUp CRM Backlog (Synced)

Source: ClickUp list `CRM Backlog` (id: 901710720381).

- Approval workflow (optional) (ClickUp: 86dzp8xfq, Status: done)
- As a manager, uncertainty exposure is quantified (Cost of Not Knowing) (ClickUp: 86dzp8xyv, Status: backlog)
- As a system, confidence is calibrated against outcomes (ClickUp: 86dzp8xzj, Status: backlog)
- Coaching & Management (ClickUp: 86dzp8xeu, Status: in progress)
- Conditional Forecasting (ClickUp: 86dzp8xey, Status: in progress)
- CSV import/export flow (ClickUp: 86dzp8xh9, Status: done)
- Epistemic Metrics Core (ClickUp: 86dzp8xf6, Status: in progress)
- Epistemic State + Evidence Governance (ClickUp: 86dzp8xfc, Status: in progress)
- Feedback Loop + Weakest Signal (ClickUp: 86dzp8xf9, Status: backlog)
- Module: Activities | As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene. (ClickUp: 86dzp8x9n, Status: done)
- Module: Activities | As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction. (ClickUp: 86dzp8xdt, Status: done)
- Module: Activities | As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates. (ClickUp: 86dzp8x97, Status: done)
- Module: Activities | As a Sales Rep, I want the system to surface opportunities missing next steps. (ClickUp: 86dzp8x9k, Status: done)
- Module: Activities | As a system, automation creates tasks for unresolved high-impact factors (ClickUp: 86dzp8xyj, Status: backlog)
- Module: Contacts | As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership. (ClickUp: 86dzp8xcg, Status: done)
- Module: Contacts | As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context. (ClickUp: 86dzp8xcw, Status: backlog)
- Module: Contacts | As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group. (ClickUp: 86dzp8xcr, Status: done)
- Module: Dashboard | As a manager, I can see Truth Coverage and Time-to-Truth per deal (ClickUp: 86dzp8y0j, Status: in progress)
- Module: Dashboard | As a manager, I can see Truth Coverage and Time-to-Truth per deal (ClickUp: 86dzp8xtg, Status: in progress)
- Module: Dashboard | As a manager, I see top truth gaps across pipeline (ClickUp: 86dzp8y02, Status: in progress)
- Module: Dashboard | As a manager, I see top truth gaps across pipeline (ClickUp: 86dzp8xt8, Status: in progress)
- Module: Dashboard | As a rep, I can view Risk Register flags derived from CQVS (ClickUp: 86dzp8xzq, Status: done)
- Module: Dashboard | As a rep, I can view Risk Register flags derived from CQVS (ClickUp: 86dzp8xt5, Status: done)
- Module: Dashboard | As a Sales Rep, I want a structured checklist to flag risks early. (ClickUp: 86dzp8xbh, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota. (ClickUp: 86dzp8x8g, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed. (ClickUp: 86dzp8x92, Status: done)
- Module: Dashboard | As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs. (ClickUp: 86dzp8x89, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit. (ClickUp: 86dzp8xbp, Status: done)
- Module: Dashboard | As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing. (ClickUp: 86dzp8xc1, Status: done)
- Module: Dashboard | As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context. (ClickUp: 86dzp8x8p, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs. (ClickUp: 86dzp8xat, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment. (ClickUp: 86dzp8xb6, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want to provide handoff notes and trigger a kickoff. (ClickUp: 86dzp8x9z, Status: backlog)
- Module: Dashboard | As a Sales Rep, I want to track security questionnaire and legal redlines with status updates. (ClickUp: 86dzp8xan, Status: done)
- Module: Dashboard | As a Sales Rep, I want to track technical risks before demo/validation. (ClickUp: 86dzp8xb3, Status: backlog)
- Module: Dashboard | As an executive, I can view confidence-weighted pipeline totals (ClickUp: 86dzp8y09, Status: in progress)
- Module: Dashboard | As an executive, I can view confidence-weighted pipeline totals (ClickUp: 86dzp8xtc, Status: in progress)
- Module: Dashboard | Confidence-weighted forecast card (ClickUp: 86dzp8xed, Status: done)
- Module: Dashboard | Epistemic summary widgets (Truth Coverage, Confidence, Time-to-Truth) (ClickUp: 86dzp8xen, Status: done)
- Module: Dashboard | Risk Register summary widget (ClickUp: 86dzp8xef, Status: done)
- Module: Dashboard | Hierarchy-based H1/H2 dashboard packs + reset (ClickUp: 86dzp8xea, Status: done)
- Module: Leads | As a manager, score breakdown aligns with CQVS labels (ClickUp: 86dzp8y10, Status: done)
- Module: Leads | As a manager, score breakdown aligns with CQVS labels (ClickUp: 86dzp8xtn, Status: done)
- Module: Leads | As a rep, AI suggests next evidence to resolve weakest signal (ClickUp: 86dzp8xz6, Status: backlog)
- Module: Leads | As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet" (ClickUp: 86dzp8y1d, Status: done)
- Module: Leads | As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet" (ClickUp: 86dzp8xtu, Status: done)
- Module: Leads | As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor (ClickUp: 86dzp8y1u, Status: done)
- Module: Leads | As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor (ClickUp: 86dzp8xtz, Status: done)
- Module: Leads | As a rep, I see an inline qualification status summary with confidence + weakest signal (ClickUp: 86dzp8y19, Status: done)
- Module: Leads | As a rep, I see an inline qualification status summary with confidence + weakest signal (ClickUp: 86dzp8xtp, Status: done)
- Module: Leads | As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately. (ClickUp: 86dzp8xe0, Status: done)
- Module: Leads | As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes. (ClickUp: 86dzp8xd2, Status: done)
- Module: Leads | As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean. (ClickUp: 86dzp8xd5, Status: done)
- Module: Leads | As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach. (ClickUp: 86dzp8xdn, Status: done)
- Module: Leads | As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach. (ClickUp: 86dzp8xdm, Status: done)
- Module: Leads | As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work. (ClickUp: 86dzp8xcz, Status: done)
- Module: Leads | As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date. (ClickUp: 86dzp8xdf, Status: done)
- Module: Leads | As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward. (ClickUp: 86dzp8xd6, Status: done)
- Module: Leads | As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (ClickUp: 86dzp8x9q, Status: backlog)
- Module: Leads | Configurable qualification policy + conversion guardrails (ClickUp: 86dzp8xe3, Status: done)
- Module: Opportunities | As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early. (ClickUp: 86dzp8xdx, Status: done)
- Module: Opportunities | As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate. (ClickUp: 86dzp8xcc, Status: done)
- Module: Opportunities | As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early. (ClickUp: 86dzp8x8e, Status: done)
- Module: Opportunities | As a Sales Rep, I want renewal tasks created and tracked like any opportunity. (ClickUp: 86dzp8x8w, Status: done)
- Module: Opportunities | As a Sales Rep, I want stage‑specific activity templates so I can log actions faster. (ClickUp: 86dzp8xc4, Status: done)
- Module: Opportunities | As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality. (ClickUp: 86dzp8xc7, Status: done)
- Module: Opportunities | As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal. (ClickUp: 86dzp8xa7, Status: backlog)
- Module: Opportunities | As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome. (ClickUp: 86dzp8xav, Status: backlog)
- Module: Opportunities | As a Sales Rep, I want to mark deals as Commit only when verified and expected to close. (ClickUp: 86dzp8xa9, Status: done)
- Module: Opportunities | As a Sales Rep, I want to schedule discovery and log notes before leaving the stage. (ClickUp: 86dzp8xbq, Status: backlog)
- Module: Opportunities | As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one. (ClickUp: 86dzp8xce, Status: done)
- Module: Settings | Approval Settings page (ClickUp: 86dzpdf2f, Status: done)
- Module: Settings | As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded. (ClickUp: 86dzp8xah, Status: done)
- Module: Settings | As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback. (ClickUp: 86dzp8x9c, Status: done)
- Module: Settings | As an Admin, I want policy gates for high-risk actions (discount %, deal size, stage gates) so enforcement is consistent. (ClickUp: 86dzpf90r, Status: done)
- Module: Settings | Capability-first permission model with role intent views (ClickUp: 86dzpfc1e, Status: done)
- Module: Settings | Role drift + pack presets (ClickUp: 86dzpfc1x, Status: done)
- Module: Settings | Role hierarchy (Salesforce-style reporting structure) (ClickUp: 86dzpegw4, Status: done)
- Module: Settings | Contextual Threshold Rules page (ClickUp: 86dzpdf2h, Status: done)
- Module: Settings | Qualification Policy page (ClickUp: 86dzpdf2g, Status: done)
- Risk & Cost of Not Knowing (ClickUp: 86dzp8xf4, Status: backlog)
- Tenant setting for module packs (ClickUp: 86dzp8xkf, Status: backlog)
