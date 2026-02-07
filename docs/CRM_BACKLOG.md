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

8) Role-level dashboard packs (L1/L2/L3...) + reset
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

### Summary

Not done yet. Core CRM enhancements are strong, but integration and engagement items remain missing/partial. This checklist can be treated as the acceptance criteria going forward.

---

## Next User Stories (from ClickUp)

Source: ClickUp Next execution epics (subtasks).

Legend: status from ClickUp.

### Module: Activities

- As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene. (ClickUp: 86dzp7vf4, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Completion gate + auto-create next-step task.
  Acceptance Criteria: Required for all activities on create/update; completion requires due date.
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Activities/ActivityService.cs`, `client/src/app/crm/features/activities/pages/activity-form.page.ts`, `client/src/app/layout/quick-add/quick-add-modal.component.ts`, `server/src/CRM.Enterprise.Infrastructure/Persistence/Migrations/20260207120000_AddActivityNextStepFields.cs`
- As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction. (ClickUp: 86dzp7vdy, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates. (ClickUp: 86dzp7vf8, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Enforcement: Outcome rule + auto-ack task.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want the system to surface opportunities missing next steps. (ClickUp: 86dzp7vf5, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Opportunities list supports a “No next step” filter that returns open deals without a pending next-step due date.
  Playwright: local run (missing next step filter test; file removed after pass).
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`, `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`, `client/src/app/crm/features/opportunities/pages/opportunities.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunities.page.html`

### Module: Contacts

- As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership. (ClickUp: 86dzp7veb, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context. (ClickUp: 86dzp7ve9, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group. (ClickUp: 86dzp7vea, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Dashboard

- As a Sales Rep, I want a structured checklist to flag risks early. (ClickUp: 86dzp7vep, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota. (ClickUp: 86dzp7vfc, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed. (ClickUp: 86dzp7vf9, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs. (ClickUp: 86dzp7vfe, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit. (ClickUp: 86dzp7vem, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Qualification+ stage requires requirements, buying process, and success criteria; UI provides fields for all three.
  Playwright: local run (opportunity qualification fit gate test; file removed after pass).
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`, `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`
- As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing. (ClickUp: 86dzp7veh, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Qualification+ stage changes require a pain/problem summary, a buying-role contact, and a next step with due date.
  Playwright: local run (opportunity pain confirmation test; file removed after pass).
  Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
- As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context. (ClickUp: 86dzp7vfb, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs. (ClickUp: 86dzp7veu, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment. (ClickUp: 86dzp7veq, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to provide handoff notes and trigger a kickoff. (ClickUp: 86dzp7vf2, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Enforcement: Close-stage gate + auto-create onboarding tasks.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to track security questionnaire and legal redlines with status updates. (ClickUp: 86dzp7vew, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to track technical risks before demo/validation. (ClickUp: 86dzp7ver, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a manager, I can see Truth Coverage and Time-to-Truth per deal (ClickUp: 86dzkxjxq, Status: in progress) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a manager, I see top truth gaps across pipeline (ClickUp: 86dzkxjzj, Status: in progress) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a rep, I can view Risk Register flags derived from CQVS (ClickUp: 86dzkxk06, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As an executive, I can view confidence-weighted pipeline totals (ClickUp: 86dzkxjyt, Status: in progress) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- Confidence-weighted forecast card (ClickUp: 86dzp3g0n, Status: done) MoSCoW: Should | Tier: Core | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Epistemic summary widgets (Truth Coverage, Confidence, Time-to-Truth) (ClickUp: 86dzp3g09, Status: done) MoSCoW: Should | Tier: Core | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Risk Register summary widget (ClickUp: 86dzp3g0e, Status: done) MoSCoW: Should | Tier: Core | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Role-based L1/L2 dashboard packs + reset (ClickUp: 86dzp3g10, Status: done) MoSCoW: Should | Tier: Core | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Leads

- As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately. (ClickUp: 86dzp7vdw, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Priority stream feed + dashboard aggregation.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes. (ClickUp: 86dzp7ve6, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Lead conversion creates selected Account/Contact/Opportunity, re-links lead activities to the created record (Opportunity preferred, fallback to Account), and logs a conversion note activity with follow-up.
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`, `client/src/app/crm/features/leads/pages/lead-convert.page.ts`
- As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean. (ClickUp: 86dzp7ve5, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Validation rule on status change.
  Acceptance Criteria: Disqualified/Lost requires a reason, Nurture requires a follow-up date, Qualified requires notes + at least 3 qualification factors.
  Playwright: local run (lead outcome enforcement test; file removed after pass).
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`, `client/src/app/crm/features/leads/pages/lead-form.page.ts`, `client/src/app/crm/features/leads/pages/lead-form.page.html`
- As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach. (ClickUp: 86dzp7vdz, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Automation rule + SLA timer + auto task.
  Acceptance Criteria: Assignment rules apply on lead creation; first‑touch task is created with due date; SLA breach tracked.
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`, `server/src/CRM.Enterprise.Domain/Entities/Lead.cs`, `server/src/CRM.Enterprise.Infrastructure/Notifications/NotificationAlertWorker.cs`, `client/src/app/crm/features/settings/pages/lead-assignment.page.ts`
- As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach. (ClickUp: 86dzp7ve1, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Lead form displays Source, System Score, and Routing Reason for assigned leads.
  Evidence: `client/src/app/crm/features/leads/pages/lead-form.page.html`, `client/src/app/crm/features/leads/pages/lead-form.page.ts`, `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`, `server/src/CRM.Enterprise.Domain/Entities/Lead.cs`
- As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work. (ClickUp: 86dzp7ve7, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Converting a lead sets status to Converted, stores converted opportunity ID, and blocks reconversion attempts.
  Playwright: local run (lead conversion auto-close test; file removed after pass).
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`, `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
- As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date. (ClickUp: 86dzp7ve2, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Creating/updating an activity requires an outcome, next-step subject, and next-step due date; list “complete” redirects to edit for outcome capture.
  Playwright: local run (activity outcome/next-step validation test; file removed after pass).
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Activities/ActivityService.cs`, `client/src/app/crm/features/activities/pages/activity-form.page.ts`, `client/src/app/crm/features/activities/pages/activities.page.ts`
- As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward. (ClickUp: 86dzp7ve4, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Qualification gate + required factors.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (ClickUp: 86dzp7vf3, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a manager, score breakdown aligns with CQVS labels (ClickUp: 86dzkxjwh, Status: done) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor (ClickUp: 86dzkxjub, Status: done) MoSCoW: Should | Tier: Core | Type: User
  Enforcement: Default state enforcement to avoid overconfidence.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a rep, I see an inline qualification status summary with confidence + weakest signal (ClickUp: 86dzkxjvt, Status: done) MoSCoW: Should | Tier: Core | Type: User
  Enforcement: Epistemic summary + weakest-signal surfacing.
  Acceptance Criteria: TBD
  Evidence: TBD
- As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet" (ClickUp: 86dzkxjv6, Status: done) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- Configurable qualification policy + conversion guardrails (ClickUp: 86dzp7uxw, Status: done) MoSCoW: Should | Tier: Core | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Opportunities

- As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early. (ClickUp: 86dzp7vdx, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Dashboard risk alert + in-app warning based on activity/next-step recency.
  Acceptance Criteria: Dashboard shows missing next step + idle deal counts and surfaces in-app warning alerts on load.
  Playwright: `client/e2e/opportunity-risk-alerts.spec.ts`.
  Evidence: `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`, `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
- As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate. (ClickUp: 86dzp7ved, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Validation rule on stage change with UI guidance.
  Acceptance Criteria: Forecast category defaults to the stage policy, and the form shows the required category for Commit/Closed stages.
  Playwright: local run (opportunity forecast guidance test; file removed after pass).
  Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
- As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early. (ClickUp: 86dzp7vfd, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want renewal tasks created and tracked like any opportunity. (ClickUp: 86dzp7vfa, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want stage‑specific activity templates so I can log actions faster. (ClickUp: 86dzp7veg, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality. (ClickUp: 86dzp7vef, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Enforcement: Stage-gate validation on stage change.
  Acceptance Criteria: Stage change blocked unless required fields are satisfied (amount, close date where applicable), buying role exists for late stages, demo outcome present for late stages, and a next step with due date exists; commit requires security/legal approval.
  Evidence: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
- As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal. (ClickUp: 86dzp7vf1, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome. (ClickUp: 86dzp7vet, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Proposal+ stages show Demo/POC requirement guidance; server blocks stage change without a completed Demo/POC outcome.
  Playwright: local run (opportunity demo outcome guidance test; file removed after pass).
  Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
- As a Sales Rep, I want to mark deals as Commit only when verified and expected to close. (ClickUp: 86dzp7vf0, Status: done) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: Commit stage requires an expected close date and verification gates (security/legal approved, forecast category Commit, next step due date).
  Playwright: local run (opportunity commit expected close date test; file removed after pass).
  Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
- As a Sales Rep, I want to schedule discovery and log notes before leaving the stage. (ClickUp: 86dzp7vej, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one. (ClickUp: 86dzp7vec, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Settings

- As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded. (ClickUp: 86dzp7vex, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback. (ClickUp: 86dzp7vf6, Status: backlog) MoSCoW: Must | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
## ClickUp Later Items (Unstaged Backlog Mirror)

Source: ClickUp Later epic + its execution epics/subtasks.

Legend: status from ClickUp.

### Module: Activities

- As a system, automation creates tasks for unresolved high-impact factors (ClickUp: 86dzkxk3c, Status: backlog) MoSCoW: Should | Tier: Core | Type: System
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - Activity summaries (ClickUp: 86dzm0h5j, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Dashboard

- Later - KPI explanations (ClickUp: 86dzm0h9j, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: General

- API flagging + storage (ClickUp: 86dzm0h3y, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- API for award detail (ClickUp: 86dzm0hbp, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Add rationale formatting (ClickUp: 86dzm0h24, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Approval workflow (optional) (ClickUp: 86dzm0hk8, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- As a manager, uncertainty exposure is quantified (Cost of Not Knowing) (ClickUp: 86dzkxk2j, Status: backlog) MoSCoW: Should | Tier: Core | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD
- As a system, confidence is calibrated against outcomes (ClickUp: 86dzkxk0v, Status: backlog) MoSCoW: Should | Tier: Core | Type: System
  Acceptance Criteria: TBD
  Evidence: TBD
- Audit trail display (ClickUp: 86dzm0hcm, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- CRUD endpoints (ClickUp: 86dzm0hh4, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- CSV import/export flow (ClickUp: 86dzm0hhr, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Compose modal UI (ClickUp: 86dzm0h8x, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Confirm/send flow (ClickUp: 86dzm0h9a, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Define risk rules (ClickUp: 86dzm0h3h, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Define rules + inputs (ClickUp: 86dzm0h16, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Draft generator (ClickUp: 86dzm0h84, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- GET endpoints (ClickUp: 86dzm0hfh, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- KPI delta analysis (ClickUp: 86dzm0ha2, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Latency monitoring (ClickUp: 86dzm0h75, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Narrative generator (ClickUp: 86dzm0hac, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Overrides schema (ClickUp: 86dzm0hjn, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Permissions alignment (ClickUp: 86dzm0hea, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - Deal risk alerts (ClickUp: 86dzm0h2p, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - Dedicated Award Screen (SCM) (ClickUp: 86dzm0hba, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - Industry module pack toggle (ClickUp: 86dzm0hd2, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - Next-best-action suggestions (ClickUp: 86dzm0h0v, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - SCM Pricing MVP (read-only lists) (ClickUp: 86dzm0heu, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - SCM Pricing v2 (overrides + versioning) (ClickUp: 86dzm0hj5, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Read-only UI lists (ClickUp: 86dzm0hg0, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Route + menu gating (ClickUp: 86dzm0hdy, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Schema for scm.PriceLists + Items (ClickUp: 86dzm0hf8, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Summarization service (ClickUp: 86dzm0h69, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Tenant setting for module packs (ClickUp: 86dzm0hdk, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI award screen (ClickUp: 86dzm0hc8, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI badge + rationale (ClickUp: 86dzm0h4u, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI component for suggestions (ClickUp: 86dzm0h1r, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI display + regenerate (ClickUp: 86dzm0h6p, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI forms + validation (ClickUp: 86dzm0hhe, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- UI linkage to records (ClickUp: 86dzm0hax, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Versioning logic (ClickUp: 86dzm0hjv, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Leads

- As a rep, AI suggests next evidence to resolve weakest signal (ClickUp: 86dzkxk1h, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: User
  Acceptance Criteria: TBD
  Evidence: TBD

### Module: Settings

- Later - Email draft suggestions (ClickUp: 86dzm0h7r, Status: backlog) MoSCoW: Could | Tier: Accelerator | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
- Later - SCM Pricing v1 (CRUD + import/export) (ClickUp: 86dzm0hg9, Status: backlog) MoSCoW: Wont | Tier: Parked | Type: Platform
  Acceptance Criteria: TBD
  Evidence: TBD
## Later Candidate Backlog (Draft)

These are later-stage ideas. Prioritized by importance with complexity noted. Order: high impact + low complexity first.

### Priority Order (Low → High Complexity)

1) Next‑best‑action suggestions (LOW–MED)
MoSCoW: Could
- Goal: Recommend 2–3 actions per lead/opportunity (follow‑up, schedule meeting, send proposal).
- Inputs: stage, last activity date, amount, close date, owner workload.
- Output: list of suggested actions + rationale.
- Acceptance criteria:
  - Shows top 2–3 actions with rationale on lead/opportunity detail.
  - Respects tenant + permissions; no cross‑tenant data.
  - Read‑only: no record updates from AI.

2) Deal risk alerts (LOW–MED)
MoSCoW: Could
- Goal: Flag opportunities at risk (stalled > N days, close date slipped, no activity).
- Inputs: stage history, activity recency, close date changes.
- Output: risk badge + short rationale.
- Acceptance criteria:
  - Risk badge appears when rule thresholds are met.
  - Rationale lists the trigger (e.g., “No activity in 21 days”).
  - Badge clears when activity resumes or stage changes.

3) Activity summaries (MED)
MoSCoW: Could
- Goal: Summarize meeting notes or call transcripts.
- Inputs: activity description or transcript.
- Output: short summary + key decisions.
- Acceptance criteria:
  - Summary appears under activity details within 10 seconds.
  - Summary length capped (e.g., 2–4 sentences).
  - User can re‑generate summary on demand.

4) Email draft suggestions (MED)
MoSCoW: Could
- Goal: Provide suggested email copy for follow‑ups.
- Inputs: last interaction, stage, contact name, company.
- Output: subject + body draft.
- Acceptance criteria:
  - Draft appears in a modal with editable text.
  - No sending or logging unless user confirms.
  - Draft respects tenant + permissions.

5) KPI explanations (MED)
MoSCoW: Could
- Goal: Explain KPI movement (pipeline value up/down).
- Inputs: metric change + records affecting the change.
- Output: narrative summary with record references.
- Acceptance criteria:
  - Explanation cites 3–5 records that drove the change.
  - Links open the referenced records.
  - “No explanation” shown if data is insufficient.


---

## Later Options (Draft)

- Approval workflow (multi-level) options
MoSCoW: Could
