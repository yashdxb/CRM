# Redis Read-Model Caching Runbook

> **Doc Role**
> - **Source of truth**: No
> - **Category**: Operational Guide
> - **Canonical reference**: `docs/PROJECT_MASTER.md`
> - **Owner**: Engineering
> - **Last reviewed**: 2026-03-25

## Purpose

Document the Redis-backed read-model caching added for CRM dashboard and assistant retrieval paths.

This cache layer reduces repeat-query latency on expensive read endpoints without changing frontend contracts or making write flows depend on Redis.

## Azure Placement

- Service: `Azure Managed Redis`
- Resource name: `crm-enterprise-redis-dev-ca`
- Resource group: `rg-crm-dev-ca`
- Region: `canadacentral`
- Dev topology: `1 node`
- Database: `default`
- Port: `10000`
- Access model: public endpoint with TLS and key auth

Placement rationale:
- Redis is colocated with the API and data tier in `canadacentral`.
- The Angular client does not talk to Redis directly.
- Static Web App region is not the Redis placement driver.

## Code Integration Points

- Registration and configuration:
  - `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`
- Cache abstraction:
  - `server/src/CRM.Enterprise.Infrastructure/Caching/IReadModelCache.cs`
  - `server/src/CRM.Enterprise.Infrastructure/Caching/ReadModelCache.cs`
  - `server/src/CRM.Enterprise.Infrastructure/Caching/RedisCacheOptions.cs`
- Cached services:
  - `server/src/CRM.Enterprise.Infrastructure/Dashboard/DashboardReadService.cs`
  - `server/src/CRM.Enterprise.Infrastructure/AI/AssistantChatService.cs`
- Configuration defaults:
  - `server/src/CRM.Enterprise.Api/appsettings.json`
  - `server/src/CRM.Enterprise.Api/appsettings.Development.json`

## Cached Endpoints

Current Redis-backed read paths:

1. `GET /api/dashboard/summary`
2. `GET /api/dashboard/manager/pipeline-health`
3. `GET /api/assistant/insights`

Not cached:
- dashboard layout/customization endpoints
- role/user settings endpoints
- write paths
- generic CRUD list/detail flows

## Cache Keys

Keys are user-scoped and tenant-scoped.

Formats:
- `tenant:{tenantId}:user:{userId-or-anonymous}:dashboard:summary`
- `tenant:{tenantId}:user:{userId-or-anonymous}:dashboard:manager-pipeline-health`
- `tenant:{tenantId}:user:{userId}:assistant:insights`

This prevents cross-tenant and cross-user leakage for personalized CRM views.

## TTL Defaults

Configured in `Cache:Redis`:

- `DashboardSummaryTtlSeconds`: `30`
- `ManagerPipelineHealthTtlSeconds`: `30`
- `AssistantInsightsTtlSeconds`: `30`

Implementation guardrail:
- minimum enforced TTL is `5` seconds

## Fail-Open Behavior

The cache layer is intentionally fail-open.

If Redis is unavailable:
- the API still executes the underlying SQL/read-model query
- the request returns normal data from the source service
- cache read/write failures are logged as warnings
- the cache does not block the request pipeline

This was verified locally by forcing an invalid Redis connection and confirming `200` responses still returned from dashboard summary.

## Configuration

Relevant app settings:

```json
"Cache": {
  "Redis": {
    "Enabled": true,
    "ConnectionString": "",
    "InstanceName": "crm-enterprise-dev:",
    "DashboardSummaryTtlSeconds": 30,
    "ManagerPipelineHealthTtlSeconds": 30,
    "AssistantInsightsTtlSeconds": 30
  }
}
```

Azure App Service settings applied to the dev API:
- `Cache__Redis__Enabled=true`
- `Cache__Redis__ConnectionString=<managed-redis-connection-string>`
- `Cache__Redis__InstanceName=crm-enterprise-dev:`
- `Cache__Redis__DashboardSummaryTtlSeconds=30`
- `Cache__Redis__ManagerPipelineHealthTtlSeconds=30`
- `Cache__Redis__AssistantInsightsTtlSeconds=30`

## Validation Notes

Validated locally against the managed Redis instance:

- dashboard summary returned `200`
- manager pipeline health returned `200`
- assistant insights returned `200`
- repeat calls were faster than initial calls
- bad Redis connection still returned source data

Observed warm/cold timings during validation:
- summary: about `0.0217s -> 0.0133s`
- manager health: about `0.0143s -> 0.0115s`
- assistant insights: about `0.0216s -> 0.0132s`

## Operational Notes

- This is a dev proof-of-value topology only.
- Production should use a separate `2-node HA` Redis deployment in the same region.
- Keep TTLs short because these are operational dashboard surfaces.
- If cache coverage expands materially, add explicit invalidation/event-driven refresh for workflows that demand fresher data than short TTLs can provide.
