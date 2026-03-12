# Entra ID Internal Auth Runbook

Category: Operational Guide  
Canonical Source: `docs/PROJECT_MASTER.md`  
Owner: Engineering  
Last Reviewed: 2026-03-08

## Purpose

Enable Microsoft Entra ID sign-in for internal CRM users while keeping existing email/password login as fallback.

## App Registration

| Property | Value |
|----------|-------|
| Display Name | CRM Enterprise - SSO Login |
| Application (client) ID | `7ac0399a-d8ef-420f-b07e-65fb9a8de912` |
| Object ID | `af699db2-490c-4388-8772-9500a9ce0bd7` |
| Directory (tenant) ID | `df4fe0d4-9f04-4365-94d1-90b5ff952725` |
| Sign-in audience | AzureADMyOrg (single tenant) |
| Platform | SPA (no client secret) |
| ID token issuance | Enabled |

### SPA Redirect URIs

- `https://www.northedgesystem.com/login` (production)
- `https://www.northedgesystem.com` (production root)
- `http://localhost:4200/login` (local dev)
- `http://localhost:4200` (local dev root)

### API Permissions (Delegated)

| Permission | Type | Status |
|------------|------|--------|
| `openid` | Delegated | Admin consent granted |
| `profile` | Delegated | Admin consent granted |
| `email` | Delegated | Admin consent granted |

> **Note:** This app registration is for SSO login only. The existing registration `c901234e-bcbb-4c88-8eb7-81effd30a6e7` is for EmailOAuth (Mail.Read/Mail.Send) and is unrelated.

## Scope

This runbook covers:

1. Backend Entra token validation (`/api/auth/login/entra`)
2. Persisted Entra user binding (`EntraObjectId`, `EntraTenantId`, `EntraUpn`)
3. Frontend runtime auth bootstrap (`/api/auth/config`)
4. Tenant-safe login behavior using existing `X-Tenant-Key` resolution

This runbook does not cover:

1. External customer portal identity
2. Entra group-to-role synchronization
3. Generic SAML / non-Entra OIDC providers

## Backend Configuration

Set `EntraId` configuration in API settings/app service:

```json
"EntraId": {
  "Enabled": true,
  "ClientId": "7ac0399a-d8ef-420f-b07e-65fb9a8de912",
  "TenantId": "df4fe0d4-9f04-4365-94d1-90b5ff952725",
  "Authority": "https://login.microsoftonline.com/df4fe0d4-9f04-4365-94d1-90b5ff952725",
  "LocalLoginEnabled": true,
  "AllowedTenantIds": ["df4fe0d4-9f04-4365-94d1-90b5ff952725"]
}
```

Notes:

1. `ClientId` must match the SPA app registration (`CRM Enterprise - SSO Login`).
2. `LocalLoginEnabled` stays `true` so email/password fallback remains available.
3. `AllowedTenantIds` restricts sign-in to the North Edge tenant only.
4. These values are set in both `appsettings.json` and `appsettings.Development.json`.

## Frontend Configuration

The public login page now reads runtime auth configuration from `GET /api/auth/config`.

Notes:

1. The compiled Angular environment is now only a fallback for local failure scenarios.
2. Microsoft sign-in visibility should be driven by API config, not by build-time toggles.
3. Existing email/password login remains available when `LocalLoginEnabled=true`.

## Tenant Rollout

Tenant-scoped enablement uses the existing tenant feature flags store:

- Feature flag: `auth.entra`

Behavior:

1. Global `EntraId.Enabled` must be `true`.
2. If the tenant has `auth.entra=true`, Microsoft sign-in is shown for that tenant.
3. If the tenant has `auth.entra=false`, Microsoft sign-in is hidden for that tenant.
4. Local login fallback remains available when `EntraId.LocalLoginEnabled=true`.

## Enablement Sequence

1. ~~Configure Entra app registration (SPA redirect URI = `/login`).~~ **Done** (2026-03-08)
2. ~~Deploy backend config with `EntraId.Enabled=true`.~~ **Done** (2026-03-08)
3. ~~Keep `EntraId.LocalLoginEnabled=true`.~~ **Done**
4. Enable tenant feature flag `auth.entra=true` for pilot tenants.
5. Test with tenant `default` first.
6. Expand to additional tenants after pilot validation.

## Angular Environment Config

Both `environment.ts` and `environment.production.ts` now include:

```typescript
auth: {
  entra: {
    enabled: true,
    clientId: '7ac0399a-d8ef-420f-b07e-65fb9a8de912',
    authority: 'https://login.microsoftonline.com/df4fe0d4-9f04-4365-94d1-90b5ff952725',
    redirectUri: `${window.location.origin}/login`
  }
}
```

> These are fallback values only. The login page reads runtime config from `GET /api/auth/config`.

## Validation Checklist

1. Login page shows `Sign In With Microsoft` button only when `/api/auth/config` enables it.
2. Popup login returns to CRM and issues CRM JWT.
3. JWT includes tenant-scoped permissions as expected.
4. First Entra login binds exactly one active internal CRM user by email when no Entra identity is already linked.
5. Subsequent sign-in resolves by persisted Entra identity.
6. Wrong tenant selection fails safely (401/tenant mismatch).
7. Existing email/password login still works.

## Rollback

1. Set tenant feature flag `auth.entra=false`.
2. If needed, set backend `EntraId.Enabled=false`.
3. Restart API app service.
4. Verify standard login path still works.

## Production Login Incident Note

If Azure login fails for both standard email/password and Microsoft sign-in, do not assume Entra configuration is the root cause first.

Check in this order:

1. API health:
   - `GET /health`
   - `GET /api/auth/config`
2. Azure App Service runtime config:
   - `linuxFxVersion` should remain `.NET 10`
   - `appCommandLine` must be empty for the current deployment model
3. Azure SQL migration state:
   - confirm latest EF migrations are applied before blaming auth logic

Known live failure pattern:

- A bad App Service startup command (`appCommandLine=./CRM.Enterprise.Api`) caused the API not to bind the expected HTTP port.
- Browser login then surfaced timeout/CORS-style symptoms, but the root issue was API startup, not Entra configuration.
- Separate recurring issue: schema-changing deploys can succeed while runtime login fails until Azure SQL migrations are applied.

Operational rule:

- Entra setup is required for SSO rollout, but it is **not** the first place to look when `/health` and `/api/auth/config` are failing.
