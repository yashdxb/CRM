# Azure Login Failure - Root Cause Analysis & Resilience Architecture

**Last Updated:** July 2026  
**Status:** Resolved — comprehensive resilience implemented  
**Severity:** Critical (recurring)

---

## Executive Summary

Azure login failures have been a **recurring** issue caused by Azure App Service cold starts, post-deployment restarts, and insufficient client-side timeout/retry handling. The API, frontend environment, CORS, and database have all been **verified as correctly configured and functional**.

The solution is a **multi-layer resilience architecture** that handles cold starts gracefully at every level: frontend warmup, retry with exponential backoff, diagnostic error reporting, and post-deploy workflow health verification.

---

## Verified Infrastructure (All Working)

| Component | URL / Endpoint | Status |
|-----------|---------------|--------|
| API Health | `GET /health` | 200 OK |
| DB Health | `GET /healthz` | 200 OK (DB healthy) |
| Auth Config | `GET /api/auth/config` | 200 OK (JSON) |
| Login | `POST /api/auth/login` | 200 OK (JWT returned) |
| CORS | OPTIONS from SWA origin | 200 OK, correct headers |
| Frontend env | `chunk-*.js` in deployed bundle | Correct `resolveApiUrl()`, `useMockApi: false` |
| SWA | `https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net` | 200 OK |
| Custom domain | `https://www.northedgesystem.com` | Active |
| App Service config | `linuxFxVersion=DOTNETCORE|10.0`, `appCommandLine=""` | Correct |

---

## Root Causes (Recurring Pattern)

### 1. App Service Cold Starts (Primary Cause)
- Azure App Service on pay-as-you-go/Basic tiers deallocates instances after idle periods.
- Cold starts take **10–30 seconds** to restore the .NET 10 process.
- During this window, HTTP requests return status `0` (connection refused) or time out.
- The login page's original 15s timeout was **too short** for cold starts.

### 2. Post-Deployment Restarts
- Every deploy triggers an App Service restart.
- The `deploy-api.yml` workflow deploys and immediately finishes; no health verification.
- Users hitting the login page within 30–60s of deployment would hit an unresponsive API.

### 3. Non-Diagnostic Error Messages (Exacerbated Impact)
- Original error messages said "Network error" or "Request timed out" with no API health context.
- Users (and developers) couldn't tell if the API was permanently down vs. temporarily restarting.

### 4. Past: Incorrect `appCommandLine` (Resolved)
- A previous deployment set `appCommandLine` to `./CRM.Enterprise.Api`, which caused the App Service process to fail port binding.
- **Fix:** `appCommandLine` must be empty; deployment workflow now enforces this and the post-deploy step verifies it.

---

## Resilience Architecture (Implemented)

### Layer 1: Frontend Warmup (`auth.service.ts`)
```
Login page loads → warmUpApi() hits /health → wakes cold instance
User types credentials → API is already warm → login succeeds
```
- `AuthService.warmUpApi()` fires on login page `ngOnInit`.
- Hits the lightweight `/health` endpoint (no DB, fast response).
- Memoized: only fires once per session.
- Non-blocking: errors are swallowed (warmup is best-effort).

### Layer 2: Timeout & Retry (`auth.service.ts` + `login.page.ts`)
```
Login request → 30s timeout → retry on transient failure
                             → up to 3 retries
                             → exponential backoff: 1s, 2s, 4s
```
- **Timeout**: 30 seconds (both RxJS `timeout()` and manual `setTimeout`).
- **Retries**: 3 attempts with exponential backoff (1s → 2s → 4s).
- **Transient detection**: Status 0 (network), 502, 503, 504.
- Applies to both email/password login and Entra SSO login.

### Layer 3: Diagnostic Health Check on Error (`login.page.ts`)
```
Login fails → checkApiHealth() → show specific diagnostic:
  - API reachable + timeout → "Server reachable, please try again"
  - API unreachable + timeout → "API not responding, may be restarting"
  - API reachable + network error → "Network error, try again"
  - API unreachable + network error → "Cannot reach API server"
```
- On timeout or status-0 errors, the login page calls `checkApiHealth()`.
- `apiReachable` state is tracked and displayed to the user.
- Error messages explicitly mention deployment restarts as a possible cause.

### Layer 4: Deploy Workflow Health Verification

**API Deploy (`deploy-api.yml`):**
1. Waits 30s for App Service restart
2. Retries `/health` up to 6 times (15s intervals, ~90s total)
3. Verifies `/api/auth/config` returns 200
4. Checks `/healthz` for database connectivity
5. Confirms `appCommandLine` is empty (deployment guardrail)

**SWA Deploy (`azure-static-web-apps-*.yml`):**
1. Checks API `/health` reachability
2. Verifies `/api/auth/config` returns 200
3. Tests CORS preflight from SWA origin
4. Confirms SWA is serving content

---

## Troubleshooting Checklist

When Azure login fails, run these checks in order:

```bash
# 1. API health (quick check)
curl https://crm-enterprise-api-dev-01122345.azurewebsites.net/health

# 2. Auth config (login page depends on this)
curl https://crm-enterprise-api-dev-01122345.azurewebsites.net/api/auth/config

# 3. DB connectivity
curl https://crm-enterprise-api-dev-01122345.azurewebsites.net/healthz

# 4. CORS (from SWA origin)
curl -X OPTIONS \
  -H "Origin: https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net" \
  -H "Access-Control-Request-Method: POST" \
  https://crm-enterprise-api-dev-01122345.azurewebsites.net/api/auth/login

# 5. Actual login attempt
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Tenant-Key: default" \
  -d '{"email":"test@example.com","password":"test"}' \
  https://crm-enterprise-api-dev-01122345.azurewebsites.net/api/auth/login

# 6. App Service startup command (must be empty)
az webapp config show \
  --resource-group rg-crm-dev-ca \
  --name crm-enterprise-api-dev-01122345 \
  --query appCommandLine

# 7. App Service logs
az webapp log tail \
  --resource-group rg-crm-dev-ca \
  --name crm-enterprise-api-dev-01122345
```

---

## Files Modified for Resilience

| File | Changes |
|------|---------|
| `client/src/app/core/auth/auth.service.ts` | `warmUpApi()`, `checkApiHealth()`, 3 retries with exponential backoff |
| `client/src/app/public/auth/login.page.ts` | API warmup on load, 30s timeout, diagnostic errors, `apiReachable` tracking |
| `.github/workflows/deploy-api.yml` | Post-deploy health verification (health, auth config, DB, appCommandLine) |
| `.github/workflows/azure-static-web-apps-*.yml` | Post-deploy API connectivity check (health, CORS, SWA) |
| `.github/copilot-instructions.md` | Section 3.2 (Login Resilience Architecture), Section 13 pattern |

---

## Prevention Measures

1. **Never set `appCommandLine`** to anything other than empty string for this App Service.
2. **Always wait 30–60s** after deployment before testing login.
3. **Deploy workflow** now automatically verifies API health post-deploy.
4. **Login page** now warms up the API before the user interacts.
5. **Login retries** handle brief cold-start windows transparently.
6. **Treat DB migrations as deployment risk**: schema changes require migration to be applied in Azure SQL before/during deploy.

