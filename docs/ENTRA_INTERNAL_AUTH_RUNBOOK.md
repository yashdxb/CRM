# Entra ID Internal Auth Runbook

Category: Operational Guide  
Canonical Source: `docs/PROJECT_MASTER.md`  
Owner: Engineering  
Last Reviewed: 2026-03-03

## Purpose

Enable Microsoft Entra ID sign-in for internal CRM users while keeping existing email/password login as fallback.

## Scope

This runbook covers:

1. Backend Entra token validation (`/api/auth/login/entra`)
2. Frontend Microsoft login button (MSAL popup)
3. Tenant-safe login behavior using existing `X-Tenant-Key` resolution

This runbook does not cover:

1. External customer portal identity
2. Entra group-to-role synchronization

## Backend Configuration

Set `EntraId` configuration in API settings/app service:

```json
"EntraId": {
  "Enabled": true,
  "ClientId": "<SPA_CLIENT_ID>",
  "TenantId": "organizations",
  "Authority": "https://login.microsoftonline.com/organizations",
  "AllowedTenantIds": ["<TENANT_GUID_OPTIONAL>"]
}
```

Notes:

1. `ClientId` must match the frontend app registration used by MSAL.
2. Keep `Enabled=false` until frontend is configured and tested.
3. `AllowedTenantIds` is optional but recommended for tighter control.

## Frontend Configuration

Set `environment.auth.entra` values:

```ts
auth: {
  entra: {
    enabled: true,
    clientId: '<SPA_CLIENT_ID>',
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: '<APP_ORIGIN>/login'
  }
}
```

Notes:

1. If `enabled=false`, Microsoft button is hidden.
2. Existing email/password login remains available.

## Enablement Sequence

1. Configure Entra app registration (SPA redirect URI = `/login`).
2. Deploy backend config with `EntraId.Enabled=true`.
3. Deploy frontend config with `auth.entra.enabled=true`.
4. Test with tenant `default` first.
5. Expand to additional tenants after pilot validation.

## Validation Checklist

1. Login page shows `Sign In With Microsoft` button.
2. Popup login returns to CRM and issues CRM JWT.
3. JWT includes tenant-scoped permissions as expected.
4. Wrong tenant selection fails safely (401/tenant mismatch).
5. Existing email/password login still works.

## Rollback

1. Set frontend `auth.entra.enabled=false`.
2. Set backend `EntraId.Enabled=false`.
3. Restart API app service.
4. Verify standard login path still works.
