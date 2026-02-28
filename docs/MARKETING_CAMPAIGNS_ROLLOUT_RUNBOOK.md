# Marketing Campaigns Rollout Runbook

## Scope
Feature flag for Campaign Management + Attribution module.

- Feature key: `marketing.campaigns`
- API config path: `Features:Marketing:Campaigns`

## Current Pilot State
- `EnabledByDefault`: `false`
- `EnabledTenants`: `["default"]` in development config
- Production should keep `EnabledByDefault: false` and only include pilot tenant keys explicitly.

## Enable for Additional Tenant
1. Add tenant key to `EnabledTenants`:
   - Example:
   ```json
   {
     "Features": {
       "Marketing": {
         "Campaigns": {
           "EnabledByDefault": false,
           "EnabledTenants": ["default", "acme"]
         }
       }
     }
   }
   ```
2. Apply config to API host (appsettings or environment-backed configuration).
3. Restart API process/app service.

## Why Restart Is Required
The API reads feature-flag configuration from application configuration providers. Most deployment setups require app recycle/restart for updated configuration values to be applied consistently.

## Disable Module for Tenant
- Remove tenant key from `EnabledTenants`.
- Keep `EnabledByDefault: false`.
- Restart API.

## UX Behavior
- When disabled, Marketing routes redirect to `/app/module-disabled` with feature context.
- Marketing API endpoints return `404` with `code: feature_disabled`.

