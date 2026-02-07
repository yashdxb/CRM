# CRM Enterprise Project Contract

## Purpose
This document defines the binding technical, UX, and delivery rules for the current CRM Enterprise codebase. It consolidates existing CRM documentation and reflects the current implementation. If a conflict exists, the running codebase is the source of truth and this document must be updated.

## Stack (Exact Versions)

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

## Repository Structure Rules

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

## Frontend Architecture Rules
- Use standalone Angular components (current pattern).
- No inline templates or styles. Always use `templateUrl` and `styleUrl`.
- Every page follows the Page Design System structure and uses global styles.
- PrimeNG components are mandatory for inputs, tables, dialogs, and buttons.
- Date/time display must follow current user timezone conversion rules (UTC storage; local display).

## Backend Architecture Rules
- Clean architecture is mandatory: Domain has no dependency on Infrastructure or Api.
- Controllers are thin and delegate to Application services or Infrastructure abstractions.
- EF Core is the only persistence mechanism; no raw SQL unless already present.
- Tenant filtering is enforced through middleware + EF query filters.

## Authentication and Authorization
- JWT Bearer authentication with issuer/audience validation.
- Claims-based authorization using `crm:permission`.
- Policies are defined in `CRM.Enterprise.Security.Permissions` and enforced per controller/action.
- Authorization fallback policy requires authenticated users.

## Tenant and Role Handling
- Tenant resolution: `X-Tenant-Key` header or host-based mapping.
- Default tenant key comes from configuration (`Tenant:DefaultKey`) when not resolved.
- Tenant provider is set per request; EF query filters rely on it.
- System roles are defined in `CRM.Enterprise.Security.Permissions.RoleNames`.

## UI/UX Standards (Current)
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
<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n</div>\n\n<div class=\"page-container\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n    <!-- header + content -->\n  </div>\n</div>\n```

## Coding Rules and Boundaries
- Follow the shared style guides; do not override on a per-page basis.
- Avoid page-specific tokens; introduce new tokens only in shared global files.
- Respect existing module boundaries; do not move files across layers without approval.
- Keep TypeScript strict and Angular template strict rules enabled.

## DO NOT Rules (Explicit)
- Do not add new frameworks, UI libraries, or architectural patterns.
- Do not refactor or reorganize folders unless explicitly requested.
- Do not hardcode environment-specific URLs in production builds.
- Do not bypass tenant isolation or permission checks.
- Do not introduce inline HTML/CSS in components.
- Do not commit or push unless explicitly instructed.

## AI-Generated Code Rules
- No guessing: use the current codebase and documentation only.
- Diff-only changes: smallest viable edits, no sweeping refactors.
- No modernization or library upgrades.
- Always preserve existing behavior unless explicitly asked to change it.
- When unclear, ask for clarification instead of inventing.

## Operational Notes (Current Reality)
- CORS is controlled in `CRM.Enterprise.Api/Program.cs` and App Service CORS settings.
- Production frontend must target the production API host (do not point to dev API in prod builds).
- SignalR hub is mapped to `/api/hubs/presence` and uses the same CORS policy.

## Issue Fix Patterns (Current Reality)
- PrimeNG select edits: insert a temporary option when pre-filling forms so values render before options load.
- Activity edit/list time: parse API timestamps as UTC (append `Z` when missing) and display in user local time.
- Lead status resolution: resolve `LeadStatus` entities and attach to `Lead` before save to avoid FK insert order issues.

## Core User Flow Expectations
- Lead -> qualify -> activity -> convert -> opportunity -> stage updates -> win/loss.
- Activities track tasks/calls/meetings and drive pipeline movement.
- Dashboard KPIs summarize accounts, pipeline, and tasks.

## Testing Expectations
- Use `docs/TEST_PLAN.md` for roadmap validation and E2E coverage.

## Supporting Docs (Merged by Reference)
- Style Guides:
  - `docs/STYLE_GUIDE.md`
  - `docs/COMPONENT_STYLE_GUIDE.md`
- Issue Fix Patterns:
  - `docs/ISSUE_FIXES.md`
- Lessons Learned:
  - `docs/LESSONS_LEARNED.md`
- User Flows:
  - `docs/USER_GUIDE.md`
  - `docs/UseCases_V1.txt`
- Testing:
  - `docs/TEST_PLAN.md`
- Competitive/Gap Analysis:
  - `docs/COMPETITIVE_GAP.md`
- Legacy/History:
  - `docs/login-cors-fix.md`
