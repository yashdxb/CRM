# Project Backlog (Single Source of Truth)

Purpose: Cross-cutting platform, architecture, infra, tooling, and operational backlog items that affect CRM + SCM. Product features live in `docs/CRM_BACKLOG.md` and `docs/SCM_BACKLOG.md`.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

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
- Status: UNKNOWN
- Acceptance criteria:
  - Commands/queries are MediatR requests with handlers.
  - Controllers depend on MediatR for business actions.

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
