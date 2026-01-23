# CRM Enterprise Project Master

Single source of truth for the CRM Enterprise codebase. This document consolidates the current project contract, phases, style guides, issue fixes, lessons learned, user guide, use cases, test plan, and Azure roadmap. If any conflict exists, the **running codebase** is the source of truth and this document must be updated.

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

---

## 6) UI/UX Standards (Current)
- Global styles are authoritative: `client/src/styles` and `client/src/app/shared`.
- Pages must use the animated orb background and shared layout containers.
- Premium glass/gradient styling is required; do not create one-off themes.
- Button styles must use the global CRM button classes.
- List pages and form pages follow the Component Style Guide templates.

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

## 13) User Guide (Condensed)

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

## 17) Entra Migration Roadmap (Next Phase)

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

## 18) Project Phases (Merged)

The full phase checklists are included below to keep one source of truth.

# Phase 1 Checklist (Draft)

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

## 2) Architecture (Phase 1)

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

# Phase 2 Checklist (Draft)

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

13) Saved filters/views per user
- Status: DONE

14) Bulk actions on lists
- Status: DONE

15) Inline edit for simple fields
- Status: DONE

16) Recently viewed lists in each module
- Status: DONE

# Phase 3 Candidate Backlog (Draft)

1) Next-best-action suggestions (LOW-MED)
2) Deal risk alerts (LOW-MED)
3) Activity summaries (MED)
4) Email draft suggestions (MED)
5) KPI explanations (MED)
6) Dedicated award screen (SCM) (MED)

# Phase 3 Options (Draft)

- Approval workflow (multi-level) options

---

## 19) Resolved Conflicts (Applied)
- Competitive gap vs current reality: email integration is **transactional only** today; full email sync/templates remain a gap.
- Phase evidence paths updated to `client/src/app/crm/features/...` to match current structure.

## 20) Conflicts to Validate
- Phase 2 says notification center is done, competitive gap previously marked it as missing. Current status is in-app toasts + preferences; confirm if the full notification center UI is complete.
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
