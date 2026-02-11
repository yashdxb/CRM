# CRM Backlog (Single Source of Truth)

Purpose: Consolidated CRM backlog across Now/Next/Later. SCM items live in `docs/SCM_BACKLOG.md`. Keep ClickUp in sync with this document.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

---

## E2E Flow Index (Login → End-to-End)

Purpose: Use this to validate the full product flow without changing execution priority. This is a testing and walkthrough order, not a delivery order.

### 1) Login / Access
- Auth + Users (Admin/User)
- JWT login/logout

### 2) Leads (Capture → Qualify → Convert)
- Lead lifecycle (CRUD + workflow + conversion + assignment rules)
- Lead outcomes enforced (Disqualified / Nurture / Qualified)
- Lead qualification discipline (CQVS, weakest signal, confidence)
- Lead conversion (Account + Contact + Opportunity + activity transfer)
- Lead auto-close after conversion

### 3) Accounts + Contacts
- Accounts (CRUD, list/search/filter, pagination)
- Contacts (CRUD, linked to Account)
- Account / Contact detail enrichment (timeline, attachments, related records, notes)
- Account team members (pre‑sales, manager)

### 4) Opportunities (Pipeline Discipline)
- Opportunities (CRUD, Stage/Amount/CloseDate/Win/Loss)
- Stage progression requires key confirmations (pain/decision maker/next step)
- Forecast category enforced at stage changes
- Alerts for no next step / no activity in X days
- Approval thresholds + pricing/discount approval flow

### 5) Activities (Execution Hygiene)
- Activities (Task/Call/Meeting; due date, priority, status)
- Activity outcomes + required next steps
- Activity templates
- Quick actions (log activity, create task, schedule meeting)

### 6) Dashboards + Forecasting
- Dashboard KPIs (pipeline, tasks, upcoming)
- Epistemic dashboard widgets (Truth Metrics, Risk Register, Confidence Forecast)
- Conditional Forecasting (Forecast Scenarios)
- Manager coaching + health summaries

### 7) Settings, Security, Admin
- Multi-tenancy + workspace settings
- Roles + permissions + security levels
- Notification preferences
- CSV import/export

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
  - Login UI: `client/src/app/public/auth/login.page.html`
  - Login UI logic: `client/src/app/public/auth/login.page.ts`
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
  - UI note: Not implemented yet — list views do not surface OwnerId/audit fields in current UI.
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
  - Shell layout: `client/src/app/layout/shell.component.html`
  - Shell styles: `client/src/app/layout/shell.component.scss`
  - PrimeNG usage in lists/forms: `client/src/app/crm/features/*/pages/*.html`
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

4) Lead SLA policy (first-touch SLA configurable)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Workspace SLA field: `client/src/app/crm/features/settings/pages/workspace-settings.page.html`
  - Workspace settings API: `server/src/CRM.Enterprise.Api/Controllers/WorkspaceController.cs`
  - SLA application in lead service: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
- Acceptance criteria:
  - Admin can set first-touch SLA hours in workspace settings.
  - New leads create a first-touch task using the configured SLA window.
  - SLA due time is displayed on the Lead form.

5) Workflow automation (stage triggers + task creation)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Automation rules API: `server/src/CRM.Enterprise.Api/Controllers/OpportunityAutomationRulesController.cs`
  - Rule persistence: `server/src/CRM.Enterprise.Domain/Entities/OpportunityStageAutomationRule.cs`
  - Stage trigger handler: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityEventHandlers.cs`
  - Automation rules UI: `client/src/app/crm/features/settings/pages/opportunity-automation.page.html`
- Acceptance criteria:
  - Admin can create/edit/delete stage automation rules.
  - Rules trigger task creation when an opportunity enters the configured stage.
  - Duplicate rule tasks are not created for the same opportunity.

6) Forecast rollups (rep → manager) + pipeline accuracy controls
MoSCoW: Must
- Status: DONE
- Evidence:
  - Manager pipeline health rollup: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
  - Manager pipeline health API: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
  - Role hierarchy visibility scoping: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
  - Role scope UI: `client/src/app/crm/features/settings/pages/role-form.page.html`
- Acceptance criteria:
  - Manager pipeline health data is scoped to the manager’s role hierarchy.
  - Pipeline counts/values roll up for descendants by default.
  - Role visibility scope can restrict rollups to Self/Team/All.

7) Lead AI scoring
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

8) Opportunity enhancements (probability, stage history, win/loss reason, risk alerts)
MoSCoW: Should
- Status: DONE
- Evidence:
  - Stage history API: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
  - Timeline UI and pipeline alerts: `client/src/app/features/opportunities/pages/opportunities.page.html`
- Acceptance criteria:
  - Stage history entries created on stage change.
  - Win/loss reason required on close.
  - Stalled deals flagged in pipeline view.

9) Lightweight approval thresholds (single-level)
MoSCoW: Must
- Status: DONE
- Evidence:
  - Workspace settings UI: `client/src/app/features/settings/pages/workspace-settings.page.html`
  - Opportunity enforcement: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
- Acceptance criteria:
  - Manager-configurable thresholds (amount and/or discount) stored in workspace settings.
  - Opportunity close blocked when thresholds exceeded until approved.
  - Single approver role (default Sales Manager).

10) Epistemic dashboard widgets (Truth Metrics, Risk Register, Confidence Forecast)
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

11) Hierarchy-level dashboard packs (H1/H2/H3...) + reset
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

12) Named default dashboard templates (admin-defined)
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

13) Calendar sync (Google/Outlook)
MoSCoW: Could
- Status: NOT STARTED
- Evidence:
  - Calendar UI exists, but no sync: `client/src/app/features/activities/pages/activities.page.ts`
- Acceptance criteria:
  - OAuth connection to Google/Outlook.
  - 2-way sync for meetings/tasks.

14) Email integration (send + sync + templates)
MoSCoW: Could
- Status: NOT STARTED
- Evidence:
  - UI note: Not implemented yet — no email send/sync or template UI in codebase.
  - API note: No email integration endpoints found.
- Acceptance criteria:
  - Email templates CRUD.
  - Send email from CRM and log to timeline.
  - Inbox sync for replies.

15) CSV import/export
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
  - Email alert worker: `server/src/CRM.Enterprise.Infrastructure/Notifications/NotificationAlertWorker.cs`
  - Preferences UI: `client/src/app/crm/features/settings/pages/notifications.page.ts`
- Acceptance criteria:
  - Notification center with read/unread state.
  - Email notifications for tasks/opps with opt-out preferences.
  - Email alert types (SLA/idle/coaching) are configurable per user.
  - Idle-deal and coaching cooldown thresholds are configurable in the UI.
  - Email alert toggles default to off until explicitly enabled.

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
- Status: DONE
- Acceptance criteria:
  - “Request approval”, “Approve”, and “Override” are separate permissions.
  - Users can edit opportunities without automatically gaining approval rights.
  - Approval actions are blocked if user lacks the specific approval permission.
- Evidence:
  - Permission keys + catalog: `server/src/CRM.Enterprise.Domain/Security/Permissions.cs`
  - Policies registered: `server/src/CRM.Enterprise.Api/Program.cs`
  - Approval request/decide gating: `server/src/CRM.Enterprise.Api/Controllers/OpportunityApprovalsController.cs`
  - Approval request blocked on update without permission: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
  - Client permissions + UI gating: `client/src/app/core/auth/permission.constants.ts`
  - Opportunity approval UI: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`
  - Approval actions UI: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`
  - Approval inbox gating: `client/src/app/crm/features/opportunities/pages/opportunity-approvals.page.ts`
  - Approvals route permission: `client/src/app/app.routes.ts`
  - Navigation permission: `client/src/app/layout/navigation/navigation.config.ts`
  - Mock permission catalog: `client/src/app/mocks/mock-db.ts`
  - Seeded role permissions: `server/src/CRM.Enterprise.Infrastructure/Persistence/DatabaseInitializer.cs`

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

- Approval workflow (optional) (ClickUp: 86dzp8xfq, Status: COMPLETED)
- As a manager, uncertainty exposure is quantified (Cost of Not Knowing) (ClickUp: 86dzp8xyv, Status: COMPLETED)
  - Acceptance criteria:
    - Dashboard shows Cost of Not Knowing value and number of high-uncertainty deals.
    - Cost of Not Knowing is derived from pipeline amounts and confidence scoring.
  - Evidence:
    - Cost of Not Knowing computation: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - Dashboard API exposure: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
    - Dashboard UI display: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
- As a system, confidence is calibrated against outcomes (ClickUp: 86dzp8xzj, Status: COMPLETED)
  - Acceptance criteria:
    - Calibration score is calculated from closed-won/lost outcomes over a lookback window.
    - Calibration score and sample size are exposed to the dashboard.
  - Evidence:
    - Calibration logic: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - API contract: `server/src/CRM.Enterprise.Application/Dashboard/DashboardSummaryDto.cs`
    - Dashboard UI: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
- Coaching & Management (ClickUp: 86dzp8xeu, Status: COMPLETED)
  - Acceptance criteria:
    - Managers can create coaching tasks on at-risk deals with comment, due date, and priority.
    - Coaching tasks appear in manager health metrics (open/overdue/escalations).
    - Review outcomes that require acknowledgment create follow-up tasks with due dates.
  - Evidence:
    - Coaching API + task creation: `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`
    - Coaching endpoint: `server/src/CRM.Enterprise.Api/Controllers/OpportunitiesController.cs`
    - Manager health metrics: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - Coaching UI dialog + actions: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
    - Coaching UI logic: `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`
    - Review acknowledgment flow: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`
- Conditional Forecasting (ClickUp: 86dzp8xey, Status: COMPLETED)
  - Acceptance criteria:
    - Dashboard shows a Forecast Scenarios card with Base, Conservative, and Commit-only totals.
    - Each scenario displays total amount and deal count, plus delta vs Base.
    - Scenario values are derived from forecast categories on opportunities (category on opportunity or stage default).
  - Evidence:
    - Scenario computation: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - API contract: `server/src/CRM.Enterprise.Application/Dashboard/DashboardSummaryDto.cs`
    - API response mapping: `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`
    - Response model: `server/src/CRM.Enterprise.Api/Contracts/Dashboard/DashboardSummaryResponse.cs`
    - Dashboard card UI: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
    - Dashboard card config: `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`
    - Dashboard card styles: `client/src/app/crm/features/dashboard/pages/dashboard.page.scss`
- CSV import/export flow (ClickUp: 86dzp8xh9, Status: COMPLETED)
- Epistemic Metrics Core (ClickUp: 86dzp8xf6, Status: COMPLETED)
  - Acceptance criteria:
    - Dashboard shows confidence-weighted pipeline totals.
    - Calibration score and sample size are displayed on the forecast card.
    - Cost of Not Knowing is surfaced with a deal count and value.
  - Evidence:
    - Metrics computation: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - API summary fields: `server/src/CRM.Enterprise.Application/Dashboard/DashboardSummaryDto.cs`
    - Dashboard UI cards: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`
- Epistemic State + Evidence Governance (ClickUp: 86dzp8xfc, Status: COMPLETED)
  - Acceptance criteria:
    - Qualification factors default to `Unknown` and are visually represented in the lead detail.
    - Evidence inputs are disabled when a factor is `Unknown` and unlocked only when the factor is set.
    - Lead detail shows an inline qualification summary with confidence and weakest signal.
  - Evidence:
    - Qualification rules + factor defaults: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
    - Lead detail CQVS UI: `client/src/app/crm/features/leads/pages/lead-form.page.html`
    - Lead detail logic: `client/src/app/crm/features/leads/pages/lead-form.page.ts`
    - CQVS styling: `client/src/app/crm/features/leads/pages/lead-form.page.scss`
- Feedback Loop + Weakest Signal (ClickUp: 86dzp8xf9, Status: COMPLETED)
  - Acceptance criteria:
    - Lead detail shows weakest signal with confidence + rationale.
    - Next-evidence suggestions appear for the weakest factor to guide rep action.
    - Lead list surfaces weakest-signal chips for quick triage.
  - Evidence:
    - Weakest signal + suggestions logic: `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
    - Lead detail UI: `client/src/app/crm/features/leads/pages/lead-form.page.html`
    - Lead detail behavior: `client/src/app/crm/features/leads/pages/lead-form.page.ts`
    - Lead list chips: `client/src/app/crm/features/leads/pages/leads.page.html`
- Activities | As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene. (ClickUp: 86dzp8x9n, Status: COMPLETED) Flow: 05A
  - Acceptance criteria:
    - Activity form requires `outcome`, `nextStepSubject`, and `nextStepDueDateUtc` before save.
    - Submitting creates the activity and auto-creates a next-step task when provided.
    - Validation errors appear when required fields are missing.
  - Evidence:
    - UI: client/src/app/crm/features/activities/pages/activity-form.page.html
- Activities | As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction. (ClickUp: 86dzp8xdt, Status: COMPLETED) Flow: 05B
  - Acceptance criteria:
    - Command center shows quick actions for Activity, Task, and Meeting.
    - Quick action opens modal and saves without leaving the dashboard.
    - Successful save shows toast and updates recent activity list.
- Activities | As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates. (ClickUp: 86dzp8x97, Status: COMPLETED) Flow: 05C
  - Acceptance criteria:
    - Review outcome options include Needs Work and Escalate.
    - Selecting Needs Work or Escalate creates an acknowledgment task with due date.
    - Acknowledgment tasks appear in Activities and dashboard task list.
- Activities | As a Sales Rep, I want the system to surface opportunities missing next steps. (ClickUp: 86dzp8x9k, Status: COMPLETED) Flow: 05D
  - Acceptance criteria:
    - Dashboard shows a “Missing Next Step” list for open opportunities.
    - An opportunity is flagged when no open next-step activity exists.
    - Clicking the item navigates to the opportunity detail.
- Activities | As a system, automation creates tasks for unresolved high-impact factors (ClickUp: 86dzp8xyj, Status: COMPLETED) Flow: 05E
  - Acceptance criteria:
    - High-impact risk flags on a lead create Task activities for the lead owner (up to 3 items).
    - Tasks are not created for Lost, Disqualified, or Converted leads.
    - Existing open tasks for the same lead + risk label are not duplicated.
  - Evidence:
    - UI: client/src/app/crm/features/activities/pages/activity-form.page.html
- Contacts | As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership. (ClickUp: 86dzp8xcg, Status: COMPLETED) Flow: 03A
  - Acceptance criteria:
    - Account team section supports adding members with role (Pre-sales/Manager).
    - Team members persist and display on account/opportunity detail.
    - Removing a member updates ownership display immediately.
- Contacts | As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context. (ClickUp: 86dzp8xcw, Status: COMPLETED) Flow: 03B
  - Acceptance criteria:
    - Contact workspace shows linked account history (recent activities on the account).
    - Contact workspace lists related accounts (parent/child/sibling) with navigation.
    - Relationship labels are derived from the account hierarchy (parent/child/sibling).
  - Evidence:
- Contacts | As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group. (ClickUp: 86dzp8xcr, Status: COMPLETED) Flow: 03C
  - Acceptance criteria:
    - Contact form includes “Buying Role” multi-select with the 5 roles.
    - Selected roles persist and display on contact detail.
    - Buying role is available in contact list columns/filters.
- Dashboard | As a Sales Manager, I can see Truth Coverage and Time-to-Truth per deal (ClickUp: 86dzp8y0j, Status: COMPLETED) Flow: 06A
  - Acceptance criteria:
    - Manager dashboard lists deals with Truth Coverage % and Time-to-Truth value per deal.
    - Each deal row shows the weakest signal label and last updated timestamp.
    - Data is scoped to the manager’s visibility (self + descendants by default).
  - Evidence:
- Dashboard | As a Sales Manager, I see top truth gaps across pipeline (ClickUp: 86dzp8y02, Status: COMPLETED) Flow: 06B
  - Acceptance criteria:
    - Dashboard shows top 3–5 truth gaps with counts across the visible pipeline.
    - Each gap is labeled by CQVS factor (e.g., “Decision Maker unknown”).
    - Clicking a gap filters the pipeline list to matching deals (or shows a linked view).
  - Evidence:
- Dashboard | As a Sales Manager, I want pipeline and forecast rollups across my role hierarchy by default. (ClickUp: 86dzpgeq0, Status: COMPLETED) Flow: 06C
  - Acceptance criteria:
    - Manager dashboard totals include deals owned by direct and indirect reports.
    - A “My deals only” toggle limits rollups to the manager’s own deals.
    - Totals update immediately when scope is changed.
  - Evidence:
- Dashboard | As a Sales Rep, I can view Risk Register flags derived from CQVS (ClickUp: 86dzp8xzq, Status: COMPLETED) Flow: 06D
  - Acceptance criteria:
    - Risk Register card lists CQVS-derived risk flags for the rep’s pipeline.
    - Each flag shows the factor label and state (Unknown / Needs validation / Stale).
    - Flags link to the underlying lead or opportunity.
  - Evidence:
- Dashboard | As a Sales Rep, I want a structured checklist to flag risks early. (ClickUp: 86dzp8xbh, Status: COMPLETED) Flow: 06E
  - Acceptance criteria:
    - Risk Checklist card lists top risk flags with counts.
    - Checklist items can be checked/unchecked and persist locally per user.
  - Evidence:
- Dashboard | As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota. (ClickUp: 86dzp8x8g, Status: COMPLETED) Flow: 06F
  - Acceptance criteria:
    - Dashboard shows personal pipeline and confidence-weighted pipeline totals.
    - Forecast card includes deltas vs raw pipeline for the current user.
    - Quota targets can be configured per user and displayed alongside personal pipeline.
  - Evidence:
- Dashboard | As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed. (ClickUp: 86dzp8x92, Status: COMPLETED) Flow: 06G
  - Acceptance criteria:
    - When a contract end date enters 90/60/30 day windows, a renewal opportunity is created if one doesn’t already exist.
    - Reminder tasks are created at 90/60/30 days for the renewal opportunity owner.
    - Base opportunity links to the renewal opportunity and shows the renewal status.
  - Evidence:
    - UI: client/src/app/crm/features/dashboard/pages/dashboard.page.html
- Dashboard | As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs. (ClickUp: 86dzp8x89, Status: COMPLETED) Flow: 06H
  - Acceptance criteria:
    - Execution Guide card shows counts for missing next steps, at-risk opportunities, overdue activities, and newly assigned leads.
    - Card is available in the default command center layout.
  - Evidence:
- Dashboard | As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit. (ClickUp: 86dzp8xbp, Status: COMPLETED) Flow: 06I
  - Acceptance criteria:
    - Opportunity form includes fields: `requirements`, `buyingProcess`, `successCriteria`.
    - Fields are required before advancing beyond Qualification.
    - Values persist and display on reload.
- Dashboard | As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing. (ClickUp: 86dzp8xc1, Status: COMPLETED) Flow: 06J
  - Acceptance criteria:
    - Moving to Qualification+ requires `summary` (pain/problem).
    - Moving to Qualification+ requires a contact tagged as Decision Maker.
    - Stage change (non-closed) requires a scheduled next step (open activity with due date).
  - Evidence:
    - UI: client/src/app/crm/features/dashboard/pages/dashboard.page.html
- Dashboard | As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context. (ClickUp: 86dzp8x8p, Status: COMPLETED) Flow: 06K
  - Acceptance criteria:
    - Opportunity form includes an “Expansion signals” section with signal type, date, and notes.
    - Rep can create an Expansion opportunity linked to the current account/opportunity.
    - Expansion opportunity retains a reference back to the originating signal.
  - Evidence:
- Dashboard | As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs. (ClickUp: 86dzp8xat, Status: COMPLETED) Flow: 06L
  - Acceptance criteria:
    - Proposal status, link, notes, and generated/sent dates are captured on the opportunity.
    - Pricing notes + discount fields persist and can be submitted for approval.
    - Security/legal review status and checklists are tracked and required before Commit.
  - Evidence:
- Dashboard | As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment. (ClickUp: 86dzp8xb6, Status: COMPLETED) Flow: 06M
  - Acceptance criteria:
    - Pre-sales team members can be added with roles on the opportunity.
    - Scope summary and approach notes are captured on the opportunity.
    - Pre-sales notes persist and are editable alongside team members.
  - Evidence:
- Dashboard | As a Sales Rep, I want to provide handoff notes and trigger a kickoff. (ClickUp: 86dzp8x9z, Status: COMPLETED) Flow: 06N
  - Acceptance criteria:
    - Sales Rep can capture handoff scope, risks, delivery owner, and timeline before Closed Won.
    - “Trigger kickoff” creates an onboarding milestone and confirms success.
    - Closed Won requires handoff fields to be completed.
  - Evidence:
- Dashboard | As a Sales Rep, I want to track security questionnaire and legal redlines with status updates. (ClickUp: 86dzp8xan, Status: COMPLETED) Flow: 06O
  - Acceptance criteria:
    - Opportunity form includes `securityReviewStatus` and `legalReviewStatus` fields.
    - Security checklist (`securityChecklist`) and Legal checklist (`legalChecklist`) allow add/edit/remove items.
    - Status values persist and display on reload.
    - Commit/Close is blocked if required statuses are not Approved.
  - Evidence:
- Dashboard | As a Sales Rep, I want to track technical risks before demo/validation. (ClickUp: 86dzp8xb3, Status: COMPLETED) Flow: 06P
  - Acceptance criteria:
    - Opportunity form includes a Technical risk checklist (`technicalChecklist`) with status + notes.
    - At least one technical risk must be logged before moving to Proposal/Validation stages.
    - Technical risks can be created, updated, and removed like other review checklist items.
  - Evidence:
- Dashboard | As an Executive, I can view confidence-weighted pipeline totals (ClickUp: 86dzp8y09, Status: COMPLETED) Flow: 06Q
  - Acceptance criteria:
    - Dashboard shows confidence-weighted pipeline total and raw pipeline total.
    - Executive view uses rollup scope across the organization (or selected scope).
  - Evidence:
- Dashboard | Confidence-weighted forecast card (ClickUp: 86dzp8xed, Status: COMPLETED) Flow: 06R
  - Acceptance criteria:
    - Dashboard shows raw pipeline total and confidence‑weighted total.
    - Card displays delta between weighted and raw totals.
    - Values use user currency and update with pipeline changes.
- Dashboard | Epistemic summary widgets (Truth Coverage, Confidence, Time-to-Truth) (ClickUp: 86dzp8xen, Status: COMPLETED) Flow: 06S
  - Acceptance criteria:
    - Dashboard shows Truth Coverage %, Confidence label, and Time‑to‑Truth.
    - Values update based on CQVS factor states and evidence.
    - Widgets are included in default dashboard pack.
- Dashboard | Risk Register summary widget (ClickUp: 86dzp8xef, Status: COMPLETED) Flow: 06T
  - Acceptance criteria:
    - Dashboard shows total risk flag count and top risk labels.
    - Clicking a flag filters/links to the related deal or lead.
- Dashboard | Hierarchy-based H1/H2 dashboard packs + reset (ClickUp: 86dzp8xea, Status: COMPLETED) Flow: 06U
  - Acceptance criteria:
    - Default pack is selected by role hierarchy level.
    - User can customize dashboard and reset to role default.
    - Reset restores pack layout and visibility settings.
- Leads | As a Sales Manager, I want the CQVS score breakdown to show labeled factors (C/Q/V/S) with per‑factor scores and weights so I can see why a lead is rated and coach reps on weak factors. (ClickUp: 86dzp8y10, Status: COMPLETED) Flow: 02A
  - Acceptance criteria:
    - CQVS breakdown lists the four labeled factors (C/Q/V/S) with clear titles.
    - Each factor shows a score and weight/impact.
    - Total confidence/score equals the weighted sum of the factors.
  - Evidence:
- Leads | As a Sales Rep, AI suggests next evidence to resolve weakest signal (ClickUp: 86dzp8xz6, Status: COMPLETED) Flow: 02B
  - Acceptance criteria:
    - Qualification status shows a "Suggested next evidence" list tied to the weakest factor.
    - Suggestions update when qualification factors change.
    - Server-provided suggestions take precedence when available.
  - Evidence:
- Leads | As a Sales Rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet" (ClickUp: 86dzp8y1d, Status: COMPLETED) Flow: 02C
  - Acceptance criteria:
    - Evidence input is disabled when a factor is set to Unknown.
    - Evidence text shows “No evidence yet” until the factor moves out of Unknown.
    - Changing the factor state immediately enables/disables the evidence input.
  - Evidence:
- Leads | As a Sales Rep, I see "Unknown / not yet discussed" preselected for every qualification factor (ClickUp: 86dzp8y1u, Status: COMPLETED) Flow: 02D
  - Acceptance criteria:
    - New leads show each CQVS factor defaulted to “Unknown / not yet discussed”.
    - Defaults persist until the rep explicitly changes a factor.
    - Default values are stored and returned by the API.
  - Evidence:
- Leads | As a Sales Rep, I want an inline qualification summary on the lead detail that shows overall confidence and the weakest signal so I can see what is uncertain and fix it quickly. (ClickUp: 86dzp8y19, Status: COMPLETED) Flow: 02E
  - Acceptance criteria:
    - Lead detail shows an inline summary with confidence score (numeric + label).
    - Summary shows the weakest signal factor and its state.
    - Summary updates immediately when qualification factors change.
    - If all factors are strong/known, weakest signal displays “No weak signals.”
  - Evidence:
- Leads | As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately. (ClickUp: 86dzp8xe0, Status: COMPLETED) Flow: 02F
  - Acceptance criteria:
    - Dashboard command center shows sections for Tasks Due/Overdue and New Leads.
    - Pipeline by stage and At‑risk deals are visible in the same view.
    - Forecast snapshot shows raw and confidence‑weighted totals.
- Leads | As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes. (ClickUp: 86dzp8xd2, Status: COMPLETED) Flow: 02G
  - Acceptance criteria:
    - Convert action creates Account, Contact, Opportunity in one submission.
    - Selected fields map correctly (lead->account/contact/opportunity).
    - Activities/notes from lead are linked to the created opportunity/account.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean. (ClickUp: 86dzp8xd5, Status: COMPLETED) Flow: 02H
  - Acceptance criteria:
    - Disqualified requires `disqualifiedReason`.
    - Nurture requires `nurtureFollowUpDate`.
    - Qualified requires `qualifiedNotes` and CQVS factors not all Unknown.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach. (ClickUp: 86dzp8xdn, Status: COMPLETED) Flow: 02I
  - Acceptance criteria:
    - New leads assigned to an owner based on assignment rules.
    - SLA deadline (`slaDueAtUtc`) is set on creation.
    - First-touch task is created for the assigned owner.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach. (ClickUp: 86dzp8xdm, Status: COMPLETED) Flow: 02J
  - Acceptance criteria:
    - Lead detail displays `source`, `aiScore`, and `routingReason`.
    - Score and rationale refresh when key fields change.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work. (ClickUp: 86dzp8xcz, Status: COMPLETED) Flow: 02K
  - Acceptance criteria:
    - Converting a lead sets status to Closed/Converted.
    - Converted leads are excluded from active lead lists.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date. (ClickUp: 86dzp8xdf, Status: COMPLETED) Flow: 02L
  - Acceptance criteria:
    - Activity form provides outcome options and requires selection.
    - Next-step fields are required and create follow-up activity.
  - Evidence:
    - UI: client/src/app/crm/features/leads/pages/lead-form.page.html
- Leads | As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward. (ClickUp: 86dzp8xd6, Status: COMPLETED) Flow: 02M
  - Acceptance criteria:
    - Lead CQVS factors include Company Fit, Authority, Need, Timing.
    - Lead cannot be marked Qualified until factors are set (not all Unknown).
    - Qualification state is persisted and visible on reload.
- Leads | As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (ClickUp: 86dzp8x9q, Status: COMPLETED) Flow: 02N
  - Acceptance criteria:
    - When lead status is set to Lost, loss reason, competitor, and loss notes are required.
    - Lost details are stored on the lead and returned in lead detail responses.
  - Evidence:
- Leads | Configurable qualification policy + conversion guardrails (ClickUp: 86dzp8xe3, Status: COMPLETED) Flow: 02O
  - Acceptance criteria:
    - Settings allow `defaultThreshold`, `managerApprovalBelow`, and `blockBelow`.
    - Lead conversion is blocked below `blockBelow` unless override is allowed.
    - Override requires reason when `requireOverrideReason` is enabled.
- Opportunities | As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early. (ClickUp: 86dzp8xdx, Status: COMPLETED) Flow: 04A
  - Acceptance criteria:
    - Idle-deal alerts respect `idleDeal`, `idleDealNoNextStep`, and `idleDealNoActivity` settings.
    - No-next-step is true when an open opportunity has no next-step activity scheduled.
    - No-activity uses `idleDealDays` threshold and `idleDealCooldownDays` for repeat alerts.
  - Evidence:
    - UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html
- Opportunities | As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate. (ClickUp: 86dzp8xcc, Status: COMPLETED) Flow: 04B
  - Acceptance criteria:
    - On stage change, `forecastCategory` is validated against the stage default.
    - Closed Won forces `Closed`; Closed Lost forces `Omitted`.
    - UI shows guidance and blocks save on invalid forecast category.
  - Evidence:
    - UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html
- Opportunities | As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early. (ClickUp: 86dzp8x8e, Status: COMPLETED) Flow: 04C
  - Acceptance criteria:
    - Dashboard shows “No activity” and “No next step” counts for open deals.
    - Counts link to filtered lists of affected opportunities.
- Opportunities | As a Sales Rep, I want renewal tasks created and tracked like any opportunity. (ClickUp: 86dzp8x8w, Status: COMPLETED) Flow: 04D
  - Acceptance criteria:
    - Renewal reminder tasks are created at 90/60/30 days.
    - Tasks are linked to the renewal opportunity and appear in Activities.
- Opportunities | As a Sales Rep, I want stage‑specific activity templates so I can log actions faster. (ClickUp: 86dzp8xc4, Status: COMPLETED) Flow: 04E
  - Acceptance criteria:
    - Activity form supports stage‑based template selection.
    - Templates prefill subject, type, and description.
    - Changing stage updates available templates.
- Opportunities | As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality. (ClickUp: 86dzp8xc7, Status: COMPLETED) Flow: 04F
  - Acceptance criteria:
    - Stage change validates required fields for the target stage.
    - Missing requirements block save with inline errors.
  - Evidence:
    - UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html
- Opportunities | As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal. (ClickUp: 86dzp8xa7, Status: COMPLETED) Flow: 04G
  - Acceptance criteria:
    - When an opportunity is marked Closed Won, onboarding tasks are auto-created if none exist.
    - When Closed Won and delivery owner is empty, the system assigns the default delivery owner role (tenant setting) or falls back to the opportunity owner.
    - When Closed Won and contract dates are missing, contract start defaults to close date (or now) and contract end is set using the default contract term months.
    - After Closed Won, sales-critical fields are locked; only delivery handoff + renewal fields remain editable.
  - Evidence:
- Opportunities | As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome. (ClickUp: 86dzp8xav, Status: COMPLETED) Flow: 04H
  - Acceptance criteria:
    - Moving to stages that require a demo/POC is blocked unless a completed demo activity with an outcome exists.
    - Demo outcome validation uses activity template keys to ensure consistent enforcement.
  - Evidence:
    - UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html
- Opportunities | As a Sales Rep, I want to mark deals as Commit only when verified and expected to close. (ClickUp: 86dzp8xa9, Status: COMPLETED) Flow: 04I
  - Acceptance criteria:
    - Commit forecast category requires `expectedCloseDate` and `probability`.
    - Commit selection is blocked if key stage gates are incomplete.
- Opportunities | As a Sales Rep, I want to schedule discovery and log notes before leaving the stage. (ClickUp: 86dzp8xbq, Status: COMPLETED) Flow: 04J
  - Acceptance criteria:
    - Moving to stages that require discovery is blocked unless a discovery meeting exists with notes and a scheduled/completed time.
  - Evidence:
    - UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html
- Opportunities | As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one. (ClickUp: 86dzp8xce, Status: COMPLETED) Flow: 04K
  - Acceptance criteria:
    - Opportunity create requires `name`, `amount`, `expectedCloseDate`, `stage`.
    - Defaults are applied for stage and forecast category if not provided.
- Opportunities | As an Admin, I want stage automation rules that create tasks on stage entry. (ClickUp: 86dzpgepx, Status: COMPLETED) Flow: 04L
  - Acceptance criteria:
    - Admin can define rule with `stage`, `taskTemplate`, and `dueInDays`.
    - On stage entry, tasks are created for the opportunity owner.
    - Rules can be enabled/disabled per stage.
- Settings | Approval Settings page (ClickUp: 86dzpdf2f, Status: COMPLETED) Flow: 07A
  - Acceptance criteria:
    - Approval Threshold field (`approvalAmountThreshold`) saves and reloads correctly.
    - Primary Approver Role field (`approvalApproverRole`) is selectable from roles.
    - Approval Chain toggle (`approvalWorkflowPolicy.enabled`) enables multi-step flow.
    - Approval Steps allow per-step `approverRole`, `amountThreshold`, and `purpose`.
  - Evidence:
- Settings | As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded. (ClickUp: 86dzp8xah, Status: COMPLETED) Flow: 07B
  - Acceptance criteria:
    - Opportunity form includes `pricingNotes`, `discountPercent`, `discountAmount`.
    - Updating `probability` or `expectedCloseDate` above threshold requires approval.
    - Submit approval creates an approval request and shows status.
- Settings | As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback. (ClickUp: 86dzp8x9c, Status: COMPLETED) Flow: 07C
  - Acceptance criteria:
    - Approval section shows request status and approver feedback.
    - Request approval button is enabled only when thresholds are met.
    - Approval decisions update the status in the opportunity view.
- Settings | As an Admin, I want currencies sourced from the system reference data so selectors stay consistent. (ClickUp: 86dzq0q00, Status: COMPLETED) Flow: 07D
  - Acceptance criteria:
    - Currency dropdowns load from the server-side currencies catalog.
    - Only active currencies are returned, ordered by sort order.
    - UI falls back to the local list if the API is unavailable.
  - Evidence:
- Settings | As an Admin, I want policy gates for high-risk actions (discount %, deal size, stage gates) so enforcement is consistent. (ClickUp: 86dzpf90r, Status: COMPLETED) Flow: 07E
  - Acceptance criteria:
    - High‑risk thresholds are configurable in Settings.
    - Discount or high‑value updates are blocked unless approval is granted.
    - Stage gates enforce required fields for target stage.
- Settings | Capability-first permission model with role intent views (ClickUp: 86dzpfc1e, Status: COMPLETED) Flow: 07F
  - Acceptance criteria:
    - Role editor supports capability‑grouped permission view.
    - Summary shows effective access by capability.
    - Role intent view highlights common presets.
- Settings | Role drift + pack presets (ClickUp: 86dzpfc1x, Status: COMPLETED) Flow: 07G
  - Acceptance criteria:
    - Role summary shows drift count vs default pack.
    - Admin can reset role to default pack preset.
- Settings | Role hierarchy (Salesforce-style reporting structure) (ClickUp: 86dzpegw4, Status: COMPLETED) Flow: 07H
  - Acceptance criteria:
    - Role form supports selecting `parentRoleId` (Parent Role) and shows hierarchy preview.
    - Visibility scope (`visibilityScope`) is configurable per role.
    - Changes persist and are reflected in manager rollups.
  - Evidence:
- Settings | Contextual Threshold Rules page (ClickUp: 86dzpdf2h, Status: COMPLETED) Flow: 07I
  - Acceptance criteria:
    - Threshold rules list supports add/edit/remove for `thresholdRules`.
    - Each rule allows `minScore`, `maxScore`, and `action` (e.g., block/require approval).
    - Saving updates tenant settings and reloads accurately.
  - Evidence:
- Settings | Qualification Policy page (ClickUp: 86dzpdf2g, Status: COMPLETED) Flow: 07J
  - Acceptance criteria:
    - Fields `defaultThreshold`, `managerApprovalBelow`, and `blockBelow` save/reload.
    - Override controls (`allowOverrides`, `requireOverrideReason`) enforce validation.
    - Modifiers and exposure weights can be added/edited and persist.
  - Evidence:
- Settings | As a user, I want configurable email alert types and thresholds. (ClickUp: 86dzpgja2, Status: COMPLETED) Flow: 07K
  - Acceptance criteria:
    - Alerts master toggle (`alertsEnabled`) enables/disables email delivery.
    - Email alert toggles (`leadSla`, `idleDeal`, `idleDealNoNextStep`, `idleDealNoActivity`, `coachingEscalation`) persist.
    - Threshold fields (`idleDealDays`, `idleDealCooldownDays`, `coachingCooldownDays`) save and reload.
  - Evidence:
  - Dashboard | As a Sales Manager, I want a deal-level Cost of Not Knowing breakdown so I can see which missing factors drive exposure. (ClickUp: 86dzpr31w, Status: COMPLETED) Flow: 06V
    - Acceptance criteria:
      - Each opportunity shows a Cost of Not Knowing value and its top contributing missing factors.
      - Opening a deal reveals the factor-level breakdown (factor, missing evidence, weight, contribution).
      - Only opportunities within the user’s visibility scope are included.
    - Evidence:
  - Dashboard | As a Sales Manager, I want an exposure rollup with drill-down to the top contributing deals so I can focus coaching. (ClickUp: 86dzpr32x, Status: COMPLETED) Flow: 06W
    - Acceptance criteria:
      - Dashboard shows total exposure and top 5 contributing deals by default.
      - Drill-down lists all contributing deals with sortable exposure values.
      - Rollup matches the sum of included deals for the user’s visibility scope.
    - Evidence:
  - Dashboard | As a Sales Manager, I want an exposure trend line (4–8 weeks) to see if uncertainty is improving or worsening. (ClickUp: 86dzpr337, Status: COMPLETED) Flow: 06X
    - Acceptance criteria:
      - Trend chart shows weekly exposure values for the last 4–8 weeks (default 8).
      - A clear indicator shows whether exposure is improving or worsening.
      - Trend respects the user’s visibility scope.
    - Evidence:
  - Settings | As an admin, I want configurable exposure weights per qualification factor so Cost of Not Knowing reflects my business. (ClickUp: 86dzpr33p, Status: COMPLETED) Flow: 07L
    - Acceptance criteria:
      - Admin can create/edit weights per qualification factor and save.
      - Weights are validated (numeric, non-negative) and persisted per tenant.
      - Changes affect Cost of Not Knowing calculations after refresh.
    - Evidence:
