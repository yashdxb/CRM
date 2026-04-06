# Tenant Branding Rollout Runbook

## Scope
Per-tenant logo branding. Tenant admins upload a logo via Workspace Settings. The logo appears in the topbar, sidebar, and login page. Logos are stored in Azure Blob Storage. A public endpoint serves tenant branding before authentication (for login page hostname resolution).

**Scope boundary**: Logo only. No colors, fonts, favicon, or theme customization.

## Architecture

### New Domain Property
- `Tenant.LogoUrl` (`string?`) — stores the public blob URL after upload.

### New API Endpoints
| Method | Route | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/tenant-branding` | `[Authorize]` | Returns current tenant's branding (name + logo URL) |
| `GET` | `/api/tenant-branding/public?tenantKey={key}` | `[AllowAnonymous]` | Returns branding by tenant key for login page |
| `POST` | `/api/tenant-branding/logo` | `[Authorize(AdministrationManage)]` | Uploads tenant logo (multipart, max 2 MB) |
| `DELETE` | `/api/tenant-branding/logo` | `[Authorize(AdministrationManage)]` | Removes tenant logo |

### New Backend Services
| Interface | Implementation | Layer |
|---|---|---|
| `IBlobStorageService` | `BlobStorageService` | Application → Infrastructure |
| `ITenantBrandingService` | `TenantBrandingService` | Application → Infrastructure |

### New Frontend Services
| Service | Layer | Purpose |
|---|---|---|
| `TenantBrandingService` | `core/tenant/` | HTTP client for branding API |
| `TenantBrandingStateService` | `core/tenant/` | Signal-based branding state (loaded once after auth) |

### New Frontend Model
- `TenantBranding` interface: `{ tenantName: string; logoUrl: string | null; }`

### Storage
- Azure Blob Storage container: `tenant-branding`
- Blob path: `{tenantId}/logo.{ext}`
- Access: Blob-level public read (logos are public assets)
- NuGet: `Azure.Storage.Blobs` added to `CRM.Enterprise.Infrastructure`

### Config Key
- `ConnectionStrings:AzureBlobStorage` — Azure Blob Storage connection string

---

## Upload Constraints
- **Allowed types**: `image/png`, `image/jpeg`, `image/webp`
- **Max size**: 2 MB
- **Blob naming**: `{tenantId}/logo.{ext}` (replaces previous logo on re-upload)

---

## Files Modified

### Backend
| File | Change |
|---|---|
| `server/src/CRM.Enterprise.Domain/Entities/Tenant.cs` | Added `LogoUrl` property |
| `server/src/CRM.Enterprise.Infrastructure/CRM.Enterprise.Infrastructure.csproj` | Added `Azure.Storage.Blobs` NuGet |
| `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs` | Registered `BlobServiceClient`, `IBlobStorageService`, `ITenantBrandingService` |
| `server/src/CRM.Enterprise.Api/Contracts/Tenants/TenantContextResponse.cs` | Added `LogoUrl` field |
| `server/src/CRM.Enterprise.Api/Controllers/TenantContextController.cs` | Added `LogoUrl` to response mapping |
| `server/src/CRM.Enterprise.Api/Middleware/TenantResolutionMiddleware.cs` | Exempted `/api/tenant-branding/public` from tenant resolution |

### Backend — New Files
| File | Purpose |
|---|---|
| `server/src/CRM.Enterprise.Application/Storage/IBlobStorageService.cs` | Blob storage abstraction |
| `server/src/CRM.Enterprise.Infrastructure/Storage/BlobStorageService.cs` | Azure Blob implementation |
| `server/src/CRM.Enterprise.Application/Tenants/ITenantBrandingService.cs` | Branding service interface |
| `server/src/CRM.Enterprise.Application/Tenants/TenantBrandingDto.cs` | Branding DTO |
| `server/src/CRM.Enterprise.Infrastructure/Tenants/TenantBrandingService.cs` | Branding service implementation |
| `server/src/CRM.Enterprise.Api/Controllers/TenantBrandingController.cs` | Branding API controller |
| `server/src/CRM.Enterprise.Api/Contracts/TenantBranding/TenantBrandingResponse.cs` | API response record |
| EF migration: `AddTenantLogoUrl` | Adds `LogoUrl` column to `Tenants` table |

### Frontend
| File | Change |
|---|---|
| `client/src/app/core/tenant/tenant-context.service.ts` | Added `logoUrl` to `TenantContext` interface |
| `client/src/app/layout/topbar/topbar.component.ts` + `.html` | Dynamic logo from branding state |
| `client/src/app/layout/sidebar/sidebar.component.ts` + `.html` | Tenant logo badge or fallback "CRM" |
| `client/src/app/public/auth/login.page.ts` + `.html` | Public branding via hostname resolution |
| `client/src/app/crm/features/settings/pages/workspace-settings.page.ts` + `.html` + `.scss` | "Workspace Branding" section with upload/remove |
| `client/src/app/layout/sidebar/sidebar.component.scss` | Added `.brand__logo` styles |
| `client/src/app/layout/navigation/navigation.service.ts` | Loads branding state on init |

### Frontend — New Files
| File | Purpose |
|---|---|
| `client/src/app/core/tenant/tenant-branding.model.ts` | `TenantBranding` interface |
| `client/src/app/core/tenant/tenant-branding.service.ts` | HTTP client for branding API |
| `client/src/app/core/tenant/tenant-branding-state.service.ts` | Signal-based branding state |

---

## Deployment Steps

### Prerequisites
1. Azure Blob Storage account provisioned.
2. Container `tenant-branding` created with **Blob (anonymous read for blobs only)** access level.
3. Connection string added to API configuration:
   ```json
   {
     "ConnectionStrings": {
       "AzureBlobStorage": "DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net"
     }
   }
   ```

### Deploy
1. Run EF migration: `dotnet ef database update` (adds `LogoUrl` column).
2. Deploy API with updated configuration.
3. Deploy Angular client.

### Verify
1. Sign in as tenant admin → Workspace Settings → "Workspace Branding" section visible.
2. Upload a PNG logo → verify it appears in topbar, sidebar.
3. Open login page with tenant subdomain → verify tenant logo shows before auth.
4. Remove logo → verify all locations revert to default "North Edge CRM" branding.

### Rollback
- No feature flag needed — feature is purely additive.
- If Blob Storage is unavailable, logos simply remain `null` and all UI shows default branding.
- To remove: drop `LogoUrl` column, redeploy API + client without branding code.

---

## UX Behavior

### Authenticated (topbar, sidebar)
- Logo available → tenant logo displayed.
- Logo `null` → default "North Edge CRM" logo and "CRM" sidebar badge.

### Login Page (public)
- Tenant key resolved from hostname subdomain → calls `GET /api/tenant-branding/public?tenantKey={key}`.
- Logo available → tenant logo displayed.
- Logo `null` or tenant not found → default North Edge CRM logo.

### Workspace Settings
- "Workspace Branding" card after "Company Information".
- Shows current logo preview or placeholder.
- Upload: PrimeNG `p-fileupload`, custom upload mode, accepts PNG/JPG/WebP, max 2 MB.
- Remove: Confirmation → deletes blob → clears `LogoUrl`.

---

## Operational Notes
- Blob container access is public-read at blob level — logos are meant to be publicly visible.
- Upload overwrites previous logo for the same tenant (same blob path).
- No CDN configured initially; consider Azure CDN for production scale.
- The public branding endpoint (`/api/tenant-branding/public`) is exempted from `TenantResolutionMiddleware` (similar to `/api/auth/config`).
