# Project Backlog (Single Source of Truth)

Purpose: Cross-cutting platform, architecture, infra, tooling, and operational backlog items that affect CRM + SCM. Product features live in `docs/CRM_BACKLOG.md` and `docs/SCM_BACKLOG.md`.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

---

## Recent Delivery Updates (2026-03-25)

- Embedded Telerik Report Workspace restored inside CRM
  Status: DONE
  Date: `2026-03-29`
  - Delivered:
    - restored the built-in Telerik Web Report Designer host in `/app/report-designer`
    - kept designer asset loading on the CRM/API side instead of requiring Report Server for authoring
    - moved report workspace route/navigation gating to `Permissions.Reports.Design`
    - kept Report Server as a later optional publishing/viewing path instead of the current authoring requirement
  - Evidence:
    - `client/src/app/crm/features/reports/pages/report-designer.page.ts`
    - `client/src/app/crm/features/reports/pages/report-designer.page.html`
    - `client/src/app/crm/features/reports/pages/report-designer.page.scss`
    - `client/src/app/crm/features/reports/pages/reports.page.ts`
    - `client/src/app/crm/features/reports/pages/reports.page.html`
    - `client/src/app/app.routes.ts`
    - `client/src/app/layout/navigation/navigation.config.ts`
    - `docs/TELERIK_EMBEDDED_REPORTING_RUNBOOK.md`

- Embedded Telerik report library/workspace flow completed and documented
  Status: DONE
  Date: `2026-03-29`
  - Delivered:
    - bridged curated report library items into editable file-backed `.trdp` reports
    - patched editable report packages with live environment SQL connection string and tenant id
    - added `Edit in Workspace` flow from report library into `/app/report-designer`
    - fixed Azure embedded designer asset loading by replacing bad `/scripts.js` dependency with a stable app asset
    - documented the end-to-end implementation and operator flow
  - Evidence:
    - `server/src/CRM.Enterprise.Api/Reporting/EmbeddedReportWorkspaceService.cs`
    - `server/src/CRM.Enterprise.Api/Reporting/TenantReportResolver.cs`
    - `server/src/CRM.Enterprise.Api/Controllers/ReportServerController.cs`
    - `client/src/assets/report-designer-host.html`
    - `client/src/assets/vendor/jquery.min.js`
    - `docs/TELERIK_EMBEDDED_REPORTING_RUNBOOK.md`

- Redis-backed read-model caching for CRM dashboard and assistant surfaces
  Status: DONE
  Commits: `e7e2dfc`
  - Delivered:
    - Redis registration and fail-open cache abstraction in Infrastructure
    - short-TTL caching for dashboard summary
    - short-TTL caching for manager pipeline health
    - short-TTL caching for assistant insights
    - Azure Managed Redis dev placement validated in `canadacentral`
  - Evidence:
    - `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`
    - `server/src/CRM.Enterprise.Infrastructure/Caching/IReadModelCache.cs`
    - `server/src/CRM.Enterprise.Infrastructure/Caching/ReadModelCache.cs`
    - `server/src/CRM.Enterprise.Infrastructure/Caching/RedisCacheOptions.cs`
    - `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
    - `server/src/CRM.Enterprise.Infrastructure/AI/AssistantChatService.cs`
    - `docs/REDIS_READ_MODEL_CACHING_RUNBOOK.md`

- MCP adoption judgment for CRM integration surface
  Status: DONE
  Date: `2026-03-26`
  - Decision:
    - do not make MCP a primary near-term platform investment
    - keep MCP as a later integration surface after CRM workflows and permissions stabilize
  - Why:
    - current priority remains workflow correctness, visibility semantics, approvals UX, and stable service boundaries
    - MCP would amplify unstable domain behavior instead of fixing it
  - Approved direction:
    - phase 1: read-only MCP tools over stable CRM read models
    - phase 2: constrained write tools with auditability
    - phase 3: approval-aware agent workflows
  - Evidence:
    - `docs/PROJECT_MASTER.md`
    - `README.md`

---

## Platform & Architecture

1) Clean architecture enforcement (API/Application/Domain/Infrastructure boundaries)
MoSCoW: TBD
- Status: DONE
- Acceptance criteria:
  - Domain has no dependency on Infrastructure or API.
  - Application layer orchestrates use cases.

2) Light CQRS + MediatR (decision + adoption)
MoSCoW: TBD
- Status: PARTIAL
- Evidence:
  - Decision recorded in `docs/PROJECT_MASTER.md` (February 16, 2026): hybrid CQRS, service-first default.
- Acceptance criteria:
  - Default implementation path is Application services for CRUD/simple flows.
  - MediatR is used only for complex orchestrations, policy-heavy commands, or multi-handler event-driven workflows.
  - Controller surface remains thin regardless of path.
  - Azure Service Bus is the async integration boundary for decoupled side effects.

### Hybrid CQRS Implementation Checklist (Execution)

Use this checklist for every backend story touching business workflows.

#### A) Pre-implementation gate (required)
- Classify the story as `Simple Flow` or `Complex Orchestration`.
- `Simple Flow` criteria: single module, CRUD-like behavior, no multi-step policy branching, no multi-handler side effects.
- `Complex Orchestration` criteria: cross-module transaction, approval/override policy branches, or non-trivial event-driven side effects.
- Choose implementation path and record it in PR notes:
  - `Simple Flow` -> Application service.
  - `Complex Orchestration` -> MediatR command/query + handlers.

#### B) Controller seam checklist (required)
- Controller action contains no direct `DbContext` access.
- Controller delegates to Application service or MediatR only.
- Authorization and tenant guards remain enforced at API boundary.
- Response contracts remain backward compatible unless story explicitly changes them.

#### C) Module-by-module checklist

Leads
- Keep CRUD, assignment updates, and simple scoring refresh in service path.
- Use MediatR for qualification/conversion flows only when branching/policy orchestration grows.
- Emit domain/integration events for side effects (audit, notifications, async follow-up).

Opportunities
- Keep basic CRUD and read/list endpoints in service path.
- Prefer MediatR for stage transitions, approval requests/decisions, and policy-gated close flows.
- Ensure stage/approval workflows are idempotent (safe on retries).

Activities
- Keep create/edit/delete/list in service path.
- Use MediatR when activity completion triggers multi-handler consequences (coaching, alerts, task automation).
- Keep next-step enforcement in domain/application rules regardless of path.

Dashboard / Read Models
- Keep read services as default query path.
- Add MediatR query handlers only when composition becomes complex across multiple read models.
- Avoid business side effects in dashboard/read queries.

Settings / Admin Policies
- Keep straightforward settings CRUD in service path.
- Use MediatR for settings changes that trigger recalculation/reseeding/rebuild flows across modules.
- Never hard-code security levels or role tiers; always resolve from tenant configuration.

#### D) Eventing and Azure integration checklist
- In-process domain events for local side effects inside monolith boundaries.
- Azure Service Bus for async integration events and decoupled background processing.
- Event payloads include tenant context and stable identifiers.
- Handlers are retry-safe and idempotent where re-delivery is possible.

#### E) Definition of done (architecture)
- Selected path (Service vs MediatR) matches classification and is documented.
- Controller seam and tenant/permission rules are preserved.
- Side effects are event-driven where appropriate (not hard-wired in controllers).
- Existing tests updated; new tests added for complex orchestration and policy branches.

1) Service seams (controllers delegate to Application services; no direct DbContext)
MoSCoW: TBD
- Status: PARTIAL
- Evidence:
  - Leads: DONE (per `docs/PROJECT_MASTER.md`)
  - Customers/Contacts: IN PROGRESS
- Acceptance criteria:
  - Controllers contain no direct DbContext usage.
  - Use-case services exist per module.

3) In-process domain events (beyond Leads)
MoSCoW: TBD
- Status: PARTIAL
- Acceptance criteria:
  - Events for OpportunityStageChanged, ActivityCompleted, etc.
  - Handlers wired for audit/notifications.

4) Microservice readiness (no extraction yet)
MoSCoW: TBD
- Status: PARTIAL
- Acceptance criteria:
  - Clear module seams (read models or snapshots)
  - Avoid cross-module joins in controllers

5) EF Core migrations reliability
MoSCoW: TBD
- Status: DONE
- Acceptance criteria:
  - `dotnet ef database update` succeeds on clean DB.

6) Local SQL Server setup (Docker recommended)
MoSCoW: TBD
- Status: PARTIAL
- Acceptance criteria:
  - Docker compose (or documented steps) spins up SQL locally.

7) Single DB with separate schemas (identity.*, crm.*)
MoSCoW: TBD
- Status: DONE
- Acceptance criteria:
  - Tables are created under `identity` and `crm` schemas.

8) No cross-service joins beyond CrmCore boundary
MoSCoW: TBD
- Status: UNKNOWN
- Acceptance criteria:
  - No EF joins across service boundaries once split.

## Reliability & Ops

9) Background job runner replacement (Hangfire removed)
MoSCoW: TBD
- Status: NOT STARTED
- Acceptance criteria:
  - Job runner for email and import workflows
  - Retry/backoff strategy for async processing

10) Ops hardening (background jobs, retries, health checks)
MoSCoW: TBD
- Status: DONE
- Evidence:
  - Health endpoints + detailed healthz: `server/src/CRM.Enterprise.Api/Program.cs`
  - Retry policies (SQL): `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`
- Acceptance criteria:
  - Health endpoint and basic retry policies exist.

12) Redis-backed caching for expensive read models
MoSCoW: TBD
- Status: DONE
- Evidence:
  - Redis registration + options: `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`
  - Cache abstraction: `server/src/CRM.Enterprise.Infrastructure/Caching/IReadModelCache.cs`
  - Dashboard summary + manager health: `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
  - Assistant insights: `server/src/CRM.Enterprise.Infrastructure/AI/AssistantChatService.cs`
  - Runbook: `docs/REDIS_READ_MODEL_CACHING_RUNBOOK.md`
- Acceptance criteria:
  - selected read endpoints use short-TTL distributed cache
  - keys are tenant-scoped and user-scoped
  - cache failures do not fail the request path
  - no frontend contract changes required

13) MCP integration surface for CRM
MoSCoW: SHOULD
- Status: NOT STARTED
- Decision note:
  - recommended later, not now
  - do not begin implementation until core CRM workflows, role visibility, and approval/audit semantics are stable
- Acceptance criteria:
  - phase 1 read-only tools defined for dashboard, search, and decision context
  - tool contracts are tenant-scoped and role-aware
  - audit model exists for all future write-capable tools
  - write tools are approval-aware and bounded to safe CRM actions

11) E2E + API test coverage gaps
MoSCoW: TBD
- Status: NOT STARTED
- Acceptance criteria:
  - Accounts edit/delete tests
  - Contacts edit/delete tests
  - Opportunity close + win/loss validation
  - Activities overdue highlighting test
  - Multi-tenant isolation test

## ClickUp Later Items (Unstaged Backlog Mirror)

Source: ClickUp Later epic + its execution epics/subtasks.

Legend: status from ClickUp.

### Module: Activities

- As a system, automation creates tasks for unresolved high-impact factors (ClickUp: 86dzkxk3c, Status: backlog)
- Later - Activity summaries (ClickUp: 86dzm0h5j, Status: backlog)

### Module: Dashboard

- Later - KPI explanations (ClickUp: 86dzm0h9j, Status: backlog)

### Module: General

- API flagging + storage (ClickUp: 86dzm0h3y, Status: backlog)
- API for award detail (ClickUp: 86dzm0hbp, Status: backlog)
- Add rationale formatting (ClickUp: 86dzm0h24, Status: backlog)
- Approval workflow (optional) (ClickUp: 86dzm0hk8, Status: backlog)
- As a manager, uncertainty exposure is quantified (Cost of Not Knowing) (ClickUp: 86dzkxk2j, Status: backlog)
- As a system, confidence is calibrated against outcomes (ClickUp: 86dzkxk0v, Status: backlog)
- Audit trail display (ClickUp: 86dzm0hcm, Status: backlog)
- CRUD endpoints (ClickUp: 86dzm0hh4, Status: backlog)
- CSV import/export flow (ClickUp: 86dzm0hhr, Status: backlog)
- Compose modal UI (ClickUp: 86dzm0h8x, Status: backlog)
- Confirm/send flow (ClickUp: 86dzm0h9a, Status: backlog)
- Define risk rules (ClickUp: 86dzm0h3h, Status: backlog)
- Define rules + inputs (ClickUp: 86dzm0h16, Status: backlog)
- Draft generator (ClickUp: 86dzm0h84, Status: backlog)
- GET endpoints (ClickUp: 86dzm0hfh, Status: backlog)
- KPI delta analysis (ClickUp: 86dzm0ha2, Status: backlog)
- Latency monitoring (ClickUp: 86dzm0h75, Status: backlog)
- Narrative generator (ClickUp: 86dzm0hac, Status: backlog)
- Overrides schema (ClickUp: 86dzm0hjn, Status: backlog)
- Permissions alignment (ClickUp: 86dzm0hea, Status: backlog)
- Later - Deal risk alerts (ClickUp: 86dzm0h2p, Status: backlog)
- Later - Dedicated Award Screen (SCM) (ClickUp: 86dzm0hba, Status: backlog)
- Later - Industry module pack toggle (ClickUp: 86dzm0hd2, Status: backlog)
- Later - Next-best-action suggestions (ClickUp: 86dzm0h0v, Status: backlog)
- Later - SCM Pricing MVP (read-only lists) (ClickUp: 86dzm0heu, Status: backlog)
- Later - SCM Pricing v2 (overrides + versioning) (ClickUp: 86dzm0hj5, Status: backlog)
- Read-only UI lists (ClickUp: 86dzm0hg0, Status: backlog)
- Route + menu gating (ClickUp: 86dzm0hdy, Status: backlog)
- Schema for scm.PriceLists + Items (ClickUp: 86dzm0hf8, Status: backlog)
- Summarization service (ClickUp: 86dzm0h69, Status: backlog)
- Tenant setting for module packs (ClickUp: 86dzm0hdk, Status: backlog)
- UI award screen (ClickUp: 86dzm0hc8, Status: backlog)
- UI badge + rationale (ClickUp: 86dzm0h4u, Status: backlog)
- UI component for suggestions (ClickUp: 86dzm0h1r, Status: backlog)
- UI display + regenerate (ClickUp: 86dzm0h6p, Status: backlog)
- UI forms + validation (ClickUp: 86dzm0hhe, Status: backlog)
- UI linkage to records (ClickUp: 86dzm0hax, Status: backlog)
- Versioning logic (ClickUp: 86dzm0hjv, Status: backlog)

### Module: Leads

- As a rep, AI suggests next evidence to resolve weakest signal (ClickUp: 86dzkxk1h, Status: backlog)

### Module: Settings

- Later - Email draft suggestions (ClickUp: 86dzm0h7r, Status: backlog)
- Later - SCM Pricing v1 (CRUD + import/export) (ClickUp: 86dzm0hg9, Status: backlog)

## Data & Governance

12) Audit/event coverage consistency
MoSCoW: TBD
- Status: PARTIAL
- Acceptance criteria:
  - Uniform audit events across key entities
  - Consistent UI surfaces for audit history
