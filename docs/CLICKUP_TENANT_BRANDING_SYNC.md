# ClickUp Tenant Branding Sync

Sync date: **April 6, 2026**
Source list: `CRM Backlog` (`901710720381`)

## Epic

- `TBD` — `Epic | Platform | Tenant Branding (Logo)`

## Stories

- `TBD` — Module: Platform | Add LogoUrl property to Tenant entity and EF migration
- `TBD` — Module: Platform | Azure Blob Storage service (IBlobStorageService + BlobStorageService)
- `TBD` — Module: Platform | Tenant branding service (ITenantBrandingService + upload/remove/get)
- `TBD` — Module: Platform | Branding API controller (GET, GET public, POST logo, DELETE logo)
- `TBD` — Module: Platform | Extend TenantContextResponse with LogoUrl + middleware exemption for public endpoint
- `TBD` — Module: UI | Frontend branding service + signal-based state (TenantBrandingStateService)
- `TBD` — Module: UI | Topbar dynamic logo from tenant branding
- `TBD` — Module: UI | Sidebar tenant logo badge
- `TBD` — Module: UI | Login page public branding via hostname resolution
- `TBD` — Module: UI | Workspace Settings "Workspace Branding" section (upload/preview/remove)

## Implementation Progress

All stories implemented and verified with successful `dotnet build` + `ng build` on **April 6, 2026**.

- Module: Platform | LogoUrl entity + migration — `done` ✅
- Module: Platform | Azure Blob Storage service — `done` ✅
- Module: Platform | Tenant branding service — `done` ✅
- Module: Platform | Branding API controller — `done` ✅
- Module: Platform | TenantContextResponse + middleware — `done` ✅
- Module: UI | Frontend branding service + state — `done` ✅
- Module: UI | Topbar dynamic logo — `done` ✅
- Module: UI | Sidebar tenant logo badge — `done` ✅
- Module: UI | Login page public branding — `done` ✅
- Module: UI | Workspace Settings branding section — `done` ✅

> E2E Playwright tests skipped — no test data in Azure environment.

## Tag Standard

- `module:platform`
- `done`
- `moscow:should`
- `tier:Core`
- `type:Platform`

---

## Acceptance Criteria

### Backend
1. `Tenant` entity has `LogoUrl` (nullable string) property with EF migration.
2. `IBlobStorageService` uploads to Azure Blob Storage container `tenant-branding` and returns public URL.
3. `ITenantBrandingService` validates upload (PNG/JPG/WebP, ≤2 MB), stores blob as `{tenantId}/logo.{ext}`, updates `Tenant.LogoUrl`.
4. `TenantBrandingController` exposes 4 endpoints: `GET` (authed), `GET /public` (anonymous), `POST /logo` (admin), `DELETE /logo` (admin).
5. `TenantContextResponse` includes `LogoUrl` so authenticated clients receive branding with context.
6. `/api/tenant-branding/public` is exempt from `TenantResolutionMiddleware`.

### Frontend
7. `TenantBrandingStateService` loads branding after auth, exposes `logoUrl` signal.
8. Topbar shows tenant logo when available, falls back to `assets/branding/logo-v2-light.png`.
9. Sidebar shows tenant logo icon (24 px) when available, falls back to "CRM" text.
10. Login page resolves tenant key from hostname, calls public branding endpoint, shows tenant logo or default.
11. Workspace Settings page has "Workspace Branding" section with logo preview, upload (PrimeNG `p-fileupload`), and remove button.

### Non-Functional
12. Upload is admin-only (`AdministrationManage` permission).
13. No colors, fonts, or favicon — logo only.
14. Default branding gracefully degrades when no logo is set or Blob Storage is unavailable.

---

## Dependencies
- Azure Blob Storage account and container provisioned.
- `ConnectionStrings:AzureBlobStorage` configured in API appsettings.
- `Azure.Storage.Blobs` NuGet added to Infrastructure project.

## Evidence
- Local runbook: `docs/TENANT_BRANDING_ROLLOUT_RUNBOOK.md`
- Implementation plan: session memory `plan.md`
