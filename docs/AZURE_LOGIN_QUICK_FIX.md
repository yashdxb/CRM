# Azure Login - Quick Fix & Troubleshooting Guide

**Status:** Resilience architecture implemented  
**Last Updated:** July 2026

---

## Built-in Resilience (Automatic)

The login flow now handles Azure App Service cold starts automatically:

1. **API Warmup**: Login page calls `/health` on load to wake cold instances
2. **30s Timeout**: Accommodates cold starts (10–30s on Basic/Standard tiers)
3. **3 Retries**: Exponential backoff (1s → 2s → 4s) for transient errors (502, 503, 504)
4. **Diagnostic Errors**: Shows whether API is reachable when login fails
5. **Deploy Verification**: CI/CD workflows verify `/health` after every deploy

Most cold-start login failures should now resolve themselves automatically.

---

## Quick Diagnostic (When Login Still Fails)

Run these commands in order:

```bash
API="https://crm-enterprise-api-dev-01122345.azurewebsites.net"

# 1. Basic health
curl "$API/health"
# Expected: 200 → API is running

# 2. Auth config (login page needs this)
curl "$API/api/auth/config"
# Expected: 200 with JSON { localLoginEnabled, entra: {...} }

# 3. DB connectivity
curl "$API/healthz"
# Expected: 200 with {"status":"Healthy",...}

# 4. CORS preflight
curl -X OPTIONS \
  -H "Origin: https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net" \
  -H "Access-Control-Request-Method: POST" \
  "$API/api/auth/login"
# Expected: 200 with Access-Control-Allow-Origin header

# 5. Login attempt
curl -X POST -H "Content-Type: application/json" \
  -H "X-Tenant-Key: default" \
  -d '{"email":"your.email@example.com","password":"YourPassword"}' \
  "$API/api/auth/login"
# Expected: 200 with JWT, or 401 if bad credentials

# 6. App Service startup command (MUST be empty)
az webapp config show \
  --resource-group rg-crm-dev-ca \
  --name crm-enterprise-api-dev-01122345 \
  --query appCommandLine
# Expected: "" (empty string)
```

---

## Common Scenarios & Fixes

### Scenario 1: API just deployed (most common)
**Symptom**: Login fails within 60s of deployment  
**Fix**: Wait 30–60s. The API auto-restarts after deploy; warmup handles this automatically.

### Scenario 2: `/health` returns error or timeout
**Symptom**: API is not responding at all  
**Fix**:
```bash
# Check if app is running
az webapp show -g rg-crm-dev-ca -n crm-enterprise-api-dev-01122345 --query state
# Should be "Running"

# If stopped, start it
az webapp start -g rg-crm-dev-ca -n crm-enterprise-api-dev-01122345

# Check logs
az webapp log tail -g rg-crm-dev-ca -n crm-enterprise-api-dev-01122345
```

### Scenario 3: `appCommandLine` is not empty
**Symptom**: API process fails to bind HTTP port  
**Fix**:
```bash
az webapp config set \
  --resource-group rg-crm-dev-ca \
  --name crm-enterprise-api-dev-01122345 \
  --startup-file ""
```
Then restart: `az webapp restart -g rg-crm-dev-ca -n crm-enterprise-api-dev-01122345`

### Scenario 4: `/healthz` returns unhealthy (DB issue)
**Symptom**: API starts but DB queries fail  
**Fix**: Check Azure SQL firewall rules and connection string in App Service config:
```bash
az webapp config appsettings list \
  -g rg-crm-dev-ca \
  -n crm-enterprise-api-dev-01122345 \
  --query "[?name=='ConnectionStrings__SqlServer']"
```

### Scenario 5: CORS error in browser console
**Symptom**: `Access to XMLHttpRequest has been blocked by CORS policy`  
**Fix**: Verify the frontend origin is in the backend's allowed origins list in `Program.cs`. All known origins are already whitelisted:
- `https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net`
- `https://northedgesystem.com`
- `https://www.northedgesystem.com`

### Scenario 6: DB migrations not applied
**Symptom**: 500 errors on login with EF Core migration errors in logs  
**Fix**: Apply pending migrations:
```bash
cd server/src/CRM.Enterprise.Api
dotnet ef database update --connection "your-azure-sql-connection-string"
```

---

## Infrastructure Reference

| Component | Value |
|-----------|-------|
| API App Service | `crm-enterprise-api-dev-01122345` |
| Resource Group | `rg-crm-dev-ca` |
| SWA | `jolly-dune-0d9d1fe0f.2.azurestaticapps.net` |
| Custom Domain | `www.northedgesystem.com` |
| Azure SQL | `crm-sql-dev-01130044.database.windows.net` |
| App Service Config | `linuxFxVersion=DOTNETCORE|10.0`, `appCommandLine=""` |

---

## Related Documentation

- [LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md](LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md) — Full root cause analysis and resilience architecture
- [copilot-instructions.md](../.github/copilot-instructions.md) — Section 3.2 (Login Resilience Architecture)
- [DAILY_OPERATIONS_LOG.md](DAILY_OPERATIONS_LOG.md) — Operational history

