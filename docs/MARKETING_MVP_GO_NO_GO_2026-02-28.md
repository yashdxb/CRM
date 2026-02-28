# Marketing MVP Go/No-Go - 2026-02-28

> **Doc Role**
> - **Source of truth**: **No (Sync / Audit Snapshot)**
> - **Canonical references**: `docs/PROJECT_MASTER.md`, `docs/USER_STORIES.md`
> - **Owner**: Engineering
> - **Last reviewed**: 2026-02-28

## Executive Decision
1. **GO for pilot** on tenant `default` after confirming `marketing.campaigns` feature flag is enabled for that tenant.
2. **NO-GO for broad rollout** until pilot telemetry is stable and feature flag rollout runbook is followed tenant-by-tenant.

## Scope Verified
1. Campaign management (CRUD, list/detail, members, attribution UI).
2. First-touch attribution and model comparison UI/logic.
3. Revenue AI Lite slice (health/recommendations/decision flow/explainability) and telemetry drill-down.
4. Marketing settings entry and module-disabled UX behavior.

## Evidence (Current Branch Head)
### Build
1. `dotnet build server/src/CRM.Enterprise.sln` -> **Passed** (0 errors, 0 warnings).
2. `npm --prefix client run build` -> **Passed**.

### Backend Tests
1. `dotnet test server/tests/CRM.Enterprise.Infrastructure.Tests/CRM.Enterprise.Infrastructure.Tests.csproj --filter MarketingAttributionIntegrationTests` -> **Passed** (9/9).
2. Known warning: `NU1903` for `Microsoft.Extensions.Caching.Memory` in test project dependency tree.

### UI E2E
1. `npx playwright test e2e/smoke.spec.ts ...marketing*.spec.ts` -> **Partial**.
2. `e2e/smoke.spec.ts` -> **Passed**.
3. Marketing specs failed with `feature_disabled` response: `Marketing Campaign Management is not enabled for this tenant.`
4. One responsive spec failed early due login response parse after the same environment mismatch during parallel run.

Interpretation:
1. Core app path is healthy.
2. Marketing E2E needs the pilot tenant flag enabled in runtime environment to execute full suite.

## Implemented Commit Set (Marketing MVP + Differentiation)
1. `102230e` revenue-ai insights and explainability.
2. `1e03b58` marketing MVP e2e hardening and decision flow coverage.
3. `40e56d6` recommendation accept flow + follow-up action e2e.
4. `437fa9f` pilot telemetry + worklist handoff + idempotency.
5. `e80ec49` attribution model comparison (`first_touch|last_touch|linear`).
6. `33f95bd` first-touch delta indicators.
7. `de0d753` model impact ranking panel.
8. `9722d30` impact panel worklist actions.
9. `aa7646f` impact worklist click telemetry audit event.
10. `4a34ede` template/handler alignment fix.
11. `d3157c0` telemetry KPI surfacing in settings.
12. `ea32e16` telemetry KPI drill-down to prefiltered audit log.
13. `3f25ab9` telemetry audit Playwright coverage.
14. `f131e6b` dedicated marketing smoke workflow in CI.

## Release Conditions
1. Enable `marketing.campaigns` for `default` tenant only.
2. Re-run marketing Playwright suite in a tenant-enabled environment.
3. Review pilot KPIs weekly:
   - recommendation usefulness,
   - accepted action completion,
   - influenced pipeline trend,
   - attribution trust defects.

## Residual Risks
1. Tenant flag drift can produce false-negative E2E failures if disabled unexpectedly.
2. Test dependency advisory (`NU1903`) remains open and should be remediated in dependency maintenance.
3. Known background runtime warning (`DecisionSlaEscalationWorker` LINQ translation) remains non-blocking but should be cleaned in ops backlog.

## Operator Notes
1. Keep rollout constrained to `default` first.
2. Use `docs/MARKETING_CAMPAIGNS_ROLLOUT_RUNBOOK.md` for tenant enablement steps and restart expectations.
