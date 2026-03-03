# Help Desk Rollout Runbook (MVP)

## Scope
This runbook covers tenant rollout controls for the CRM Help Desk MVP:
- `helpdesk.cases`
- `helpdesk.emailIntake`
- `helpdesk.realtime`

## Default Pilot State
- Pilot tenant: `default`
- Expected behavior after deployment:
  - Help Desk module visible only for tenants with `helpdesk.cases=true`
  - Non-enabled tenants are routed to `/app/module-disabled` with feature context

## Config Keys

### API configuration (`appsettings` / environment)
- `Features:HelpDesk:Cases:EnabledByDefault` (`true|false`)
- `Features:HelpDesk:Cases:EnabledTenants` (string array)

Example:
```json
{
  "Features": {
    "HelpDesk": {
      "Cases": {
        "EnabledByDefault": false,
        "EnabledTenants": [ "default" ]
      }
    }
  }
}
```

### Tenant override (workspace setting)
Feature overrides are stored in tenant `FeatureFlagsJson` and can be set from Workspace Settings:
- `helpdesk.cases`
- `helpdesk.emailIntake`
- `helpdesk.realtime`

## Enable for an Additional Tenant
1. Add tenant key to `Features:HelpDesk:Cases:EnabledTenants` in API config.
2. Restart API service (required for config-based defaults to refresh).
3. Sign in as tenant admin and verify in Workspace Settings that flags are on.
4. Verify sidebar shows `Help Desk`.
5. Smoke check:
   - Create case
   - Add comment
   - Update status
   - Open queues/settings pages

## Disable / Rollback
1. Set tenant flag overrides to `false` in Workspace Settings, or remove tenant from enabled list.
2. Restart API if config list changed.
3. Verify user is redirected to module-disabled page when opening Help Desk routes.

## Operational Notes
- Email intake endpoint: `POST /api/helpdesk/email/intake/webhook`
- Realtime events:
  - `helpdesk.case.changed`
  - `helpdesk.case.escalated`
  - `helpdesk.queue.changed`
- SLA scan worker runs continuously and creates escalation events for open cases.
