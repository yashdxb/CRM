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
- Acceptance criteria:
  - Fresh DB migration succeeds and seeds default tenant + roles.

## Summary

Phase 1 is mostly complete with some architectural and “My Tasks/overdue” gaps still unclear. If we want this checklist to be authoritative, we should add explicit acceptance criteria and tie them to tests.
