# Entra ID Internal Auth Runbook

Category: Operational Guide  
Canonical Source: `docs/PROJECT_MASTER.md`  
Owner: Engineering  
Last Reviewed: 2026-03-08

## Purpose

Enable Microsoft Entra ID sign-in for internal CRM users while keeping existing email/password login as fallback.

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
  "LocalLoginEnabled": true,
  "ClientId": "<SPA_CLIENT_ID>",
  "TenantId": "organizations",
  "Authority": "https://login.microsoftonline.com/organizations",
  "AllowedTenantIds": ["<TENANT_GUID_OPTIONAL>"]
}
```

Notes:

1. `ClientId` must match the frontend app registration used by MSAL.
2. `LocalLoginEnabled` should stay `true` in this slice so email/password fallback remains available.
3. Keep `Enabled=false` until frontend is configured and tested.
4. `AllowedTenantIds` is optional but recommended for tighter control.

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

1. Configure Entra app registration (SPA redirect URI = `/login`).
2. Deploy backend config with `EntraId.Enabled=true`.
3. Keep `EntraId.LocalLoginEnabled=true`.
4. Enable tenant feature flag `auth.entra=true` for pilot tenants.
5. Test with tenant `default` first.
6. Expand to additional tenants after pilot validation.

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
