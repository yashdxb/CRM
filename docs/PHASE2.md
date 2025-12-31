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
- Status: PARTIAL
- Evidence:
  - Rule-based auto score: `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`
  - UI toggle + preview: `client/src/app/features/leads/pages/lead-form.page.ts`
- Gap:
  - No AI integration (Azure OpenAI or similar)
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
- Status: PARTIAL
- Evidence:
  - In-app toast notifications: `client/src/app/core/notifications/notification.service.ts`
  - UI container: `client/src/app/core/notifications/notification-container.component.ts`
- Gaps:
  - No preferences UI, no email notifications
- Acceptance criteria:
  - Notification center with read/unread state.
  - Email notifications for tasks/opps with opt-out preferences.

10) Ops hardening (background jobs, retries, health checks)
- Status: PARTIAL
- Evidence:
  - Health endpoint exists: `server/src/CRM.Enterprise.Api/Program.cs`
- Gaps:
  - Background jobs (Hangfire), retry policies, ops dashboards not found
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
  - Activities UI: `client/src/app/features/activities/pages/activities.page.html`
- Acceptance criteria:
  - Last 5-10 items viewed are visible per module.
  - Entries persist per user and update on view.

16) Quick-add modal (lead/contact/activity)
- Status: DONE
- Evidence:
  - Shell quick-add dialog: `client/src/app/layout/shell.component.ts`
- Acceptance criteria:
  - Create lead/contact/activity without leaving the current page.
  - Shows validation and success feedback, closes on save.

## Summary

Not done yet. Core CRM enhancements are strong, but integration and engagement items remain missing/partial. This checklist can be treated as the acceptance criteria going forward.
