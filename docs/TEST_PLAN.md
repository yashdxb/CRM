# CRM Test Plan (Now + Next)

Scope: validate acceptance criteria in `docs/CRM_BACKLOG.md` and `docs/USER_STORIES.md`.

## Test Types

- E2E (Playwright): user journeys and critical flows
- API checks: endpoint behavior, payloads, validation
- UI checks: page rendering, filters, navigation

## Mandatory Execution Rule

- After every code modification or implementation, run Playwright UI before considering the task done.
- Minimum required run: `client/e2e/smoke.spec.ts`.
- Also run the most relevant targeted spec(s) for the changed feature area whenever available.

## Now Test Matrix

1) Auth + Users
- E2E: login/logout, user list visible, role list visible
- API: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/users`

2) Accounts (Customers)
- E2E: create/edit/delete account, search/filter, pagination
- API: `GET/POST/PUT/DELETE /api/customers`

3) Contacts
- E2E: create/edit/delete contact, link to account
- API: `GET/POST/PUT/DELETE /api/contacts`

4) Opportunities
- E2E: create/edit/delete opportunity, stage + win/loss reason
- API: `GET/POST/PUT/DELETE /api/opportunities`

5) Activities
- E2E: create/edit/delete activity, due date + priority, filters
- API: `GET/POST/PUT/DELETE /api/activities`

6) Dashboard
- UI: KPI cards render, upcoming activities, recent accounts
- API: `GET /api/dashboard/summary`

7) Responsive Mobile Design
- **Status**: ✅ **VERIFIED (2026-02-24)**
- **Breakpoints Tested**: 375px (iPhone SE), 768px (iPad), 1440px (Desktop)
- **Test Results**:
  - ✅ **Login Page**: Scales properly at all sizes; glassmorphic design preserved
  - ✅ **Dashboard (Desktop 1440px)**: 2-column grid layout, multi-card views
  - ✅ **Dashboard (Tablet 768px)**: Single-column layout, content stacks properly
  - ✅ **Dashboard (Mobile 375px)**: Full vertical flow, sidebar hidden, no overflow
  - ✅ **Grid Transforms**: 12+ SCSS grid sections properly collapse via `@include respond-to()` mixins
  - ✅ **Glass UI Preserved**: Cards maintain `backdrop-filter: blur()` and styling across all sizes
  - ✅ **Touch Targets**: Spacing appropriate for mobile interaction (44px minimum)
  - ✅ **No Horizontal Scroll**: All content fits within viewport at mobile width
- **Files Modified**: `/client/src/app/crm/features/dashboard/pages/dashboard.page.scss`
- **Files Updated**: `/client/src/environments/environment.ts` (enabled `useMockApi: true` for testing)
- **Evidence**: Screenshots captured at 375px, 768px, 1440px viewports showing responsive behavior
- **Note**: Mock API enabled for dashboard testing due to auth connectivity issue in dev environment

8) Done-when flow
- E2E: Account → Contact → Opportunity → Activity (already in `client/e2e/core-flows.spec.ts`)

## Next Test Matrix

1) Multi-tenancy + workspace settings
- API: tenant-scoped reads/writes; settings persist
- UI: workspace settings update and reload

2) Account/Contact detail enrichment
- UI: timeline, attachments, related records tabs
- API: attachments CRUD (if added)

3) Lead lifecycle
- E2E: create lead, assignment rules apply, conversion creates entities
- API: `POST /api/leads`, `POST /api/leads/{id}/convert`

4) AI lead scoring
- API: scoring endpoint or model response (if added)
- UI: score updates, rationale visible

5) Opportunity enhancements
- UI: stage history, stalled alerts, win/loss reason required
- API: stage history endpoint

6) Calendar sync
- API: OAuth connect, sync endpoint health
- UI: connect/disconnect flow

7) Email integration
- API: send + template CRUD + sync
- UI: send email from record, timeline logging

8) CSV import/export
- UI: import wizard + preview
- API: import/export endpoints

9) Notifications + preferences
- UI: notification center + settings
- API: notification read/unread and preferences

10) Ops hardening
- API: health checks, background job status

## Current Coverage (Observed)

- E2E:
  - `client/e2e/lead-lifecycle.spec.ts`
  - `client/e2e/core-flows.spec.ts`
  - `client/e2e/smoke.spec.ts`

## Gaps to Add Next

1) Accounts edit/delete tests
2) Contacts edit/delete tests
3) Opportunity close + win/loss reason validation test
4) Activities overdue highlighting test
5) Multi-tenant isolation test (once enabled)
