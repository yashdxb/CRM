# Azure Deployment Login Failure - Root Cause Analysis

**Date:** February 20, 2026  
**Issue:** Unable to login via Azure deployment landing page  
**Severity:** Critical - Blocks user authentication

---

## Executive Summary

The login failure stems from **three interconnected infrastructure issues**:

1. ❌ **Hardcoded Invalid API Endpoint** - Production environment points to an unverified Azure App Service domain
2. ❌ **API Endpoint Not Responding** - The configured API URL may not be deployed or accessible  
3. ⚠️ **Potential CORS Configuration Gap** - Origin mismatch between deployed frontend and backend

---

## Root Causes

### 1. **CRITICAL: Hardcoded Invalid Production API URL**

**Current Configuration:**
```typescript
// File: client/src/environments/environment.production.ts
const resolveApiUrl = () => {
  return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
};
```

**Issue:**
- The API endpoint `crm-enterprise-api-dev-01122345.azurewebsites.net` is **hardcoded** without dynamic resolution
- No verification that this Azure App Service exists or is running
- The domain appears to be a **development placeholder** (notice `-dev-` in the name)
- This URL is replicated across **multiple files** (playwright configs, e2e tests, OpenAPI specs)

**Evidence:**
- Frontend: `client/src/environments/environment.production.ts:9`
- E2E Tests: `client/e2e/*.spec.ts` (hardcoded in multiple test files)
- Playwright Config: `client/playwright.config.ts`
- OpenAPI Spec: `docs/ai/agent-tools.openapi.json`

---

### 2. **CRITICAL: API Service Not Deployed or Inaccessible**

**Symptoms:**
- Login page shows: `"Network error. Please check your connection and try again."` (HTTP Status: 0)
- Or: `"Request timed out. Please try again."` (15-second timeout)

**Root Cause:**
- The Azure App Service at `crm-enterprise-api-dev-01122345.azurewebsites.net` may:
  - ❌ Not exist (never deployed)
  - ❌ Not be running (stopped or deallocated)
  - ❌ Not be accessible from the client's network
  - ❌ Have different DNS name (typo in domain)

**Verification Steps:**
```bash
# Test if API endpoint is reachable
curl -v https://crm-enterprise-api-dev-01122345.azurewebsites.net/health

# Should return: 200 OK
# If fails: Connection refused, timeout, or 404 - API is not deployed
```

---

### 3. **WARNING: Potential CORS Origin Mismatch**

**Frontend Deployment:**
```
✅ Deployed to: https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net
```

**Backend CORS Configuration:**
```csharp
// File: server/src/CRM.Enterprise.Api/Program.cs (lines 51-88)
var allowedOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "http://localhost:4200",
    "https://localhost:4200",
    "http://localhost:4201",
    "https://localhost:4201",
    "http://127.0.0.1:4201",
    "http://localhost:5173",
    "https://localhost:5173",
    "https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net",  // ✅ Whitelisted
    "https://northedgesystem.com",
    "https://www.northedgesystem.com"
};
```

**Status:** ✅ Frontend origin **IS** whitelisted  
**But:** If API is at a different domain than expected, it won't respond to the request anyway.

---

## **Login Flow Architecture**

### Current Flow (Broken):
```
User @ https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net
         ↓
   Clicks "Sign In"
         ↓
   Angular AuthService builds request to:
   https://crm-enterprise-api-dev-01122345.azurewebsites.net/api/auth/login
         ↓
   ❌ Request fails: No response, timeout, or 404
         ↓
   Error: "Network error" or "Request timed out"
```

### Required Implementation:
```
Client needs to:
1. Know the actual API endpoint (not hardcoded placeholder)
2. Make HTTPS request to that endpoint
3. Include X-Tenant-Key header (if multi-tenant)
4. Send { email, password } JSON payload
5. Receive { accessToken, expiresAtUtc, roles, permissions, ... } JWT response
```

---

## Error Handling in Login Page

**Login page handles these error scenarios:**
```typescript
// File: client/src/app/public/auth/login.page.ts (lines 127-141)

switch (HTTP Status) {
  case 0:        → "Network error. Please check your connection..."
  case 401:      → "Invalid email or password."
  case 400:      → "Invalid tenant key." (if contains 'tenant')
  case timeout:  → "Request timed out. Please try again."
  case unknown:  → Server error message or generic message
}
```

**User Experience:**
- ⏱️ 15-second timeout before showing "Request timed out" error
- No error logs visible in browser console (potential debugging challenge)

---

## Azure Deployment Checklist

| Item | Status | Evidence |
|------|--------|----------|
| Frontend deployed to Azure Static Web Apps | ✅ Yes | `jolly-dune-0d9d1fe0f.2.azurestaticapps.net` |
| Frontend origin whitelisted in backend | ✅ Yes | `Program.cs:57` |
| Backend API deployed to configured endpoint | ❌ **UNKNOWN** | Need verification |
| API service is running | ❌ **UNKNOWN** | Need verification |
| API accessible from frontend origin | ❌ **UNKNOWN** | Need verification |
| JWT settings configured in App Service | ❌ **UNKNOWN** | Need verification |
| SQL Server connection string valid | ❌ **UNKNOWN** | Need verification |

---

## Deep Dive: Environment Configuration

### Development (Working ✅)
```typescript
// client/src/environments/environment.ts
return 'http://localhost:5014';  // Local .NET process
```
✅ Works because backend runs locally

### Production (Broken ❌)
```typescript
// client/src/environments/environment.production.ts
return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';  // ???
```
❌ Points to unverified/non-existent Azure endpoint

### Actual Backend Configuration
```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=tcp:crm-sql-dev-01130044.database.windows.net,1433;"
  }
}
```
- Backend is configured to use Azure SQL Server
- But API endpoint URL is hardcoded and unverified

---

## Critical Files to Verify

### 1. **Frontend Configuration (3 places)**
```
❌ client/src/environments/environment.production.ts
❌ client/playwright.config.ts
❌ client/e2e/*.spec.ts (multiple files)
```

### 2. **Backend Configuration**
```
✅ server/src/CRM.Enterprise.Api/Program.cs (CORS configured)
? server/src/CRM.Enterprise.Api/appsettings.json (JWT settings, SQL Server)
? Azure App Service app settings (override appsettings.json)
```

### 3. **OpenAPI / AI Specs**
```
❌ docs/ai/agent-tools.openapi.json
❌ docs/ai/KNOWLEDGE_GROUNDING_GUIDE.md
```

---

## Resolution Path

### Phase 1: Verify Actual Backend Deployment ✅
1. **Find actual API endpoint:**
   ```bash
   # Check Azure App Services
   az webapp list --query "[].defaultHostName" -o table
   
   # Look for: crm-enterprise-api-* or similar
   ```

2. **Test API health:**
   ```bash
   curl https://{ACTUAL_API_ENDPOINT}/health
   # Should return 200 OK if running
   ```

3. **Verify connectivity:**
   ```bash
   # From client, test CORS preflight
   curl -X OPTIONS https://{ACTUAL_API_ENDPOINT}/api/auth/login \
     -H "Origin: https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net" \
     -H "Access-Control-Request-Method: POST"
   # Should return 200 with CORS headers
   ```

### Phase 2: Update Configuration 🔧
Once actual endpoint is identified:

1. **Update environment.production.ts:**
   ```typescript
   const resolveApiUrl = () => {
     // Extract actual deployed API endpoint
     return 'https://{ACTUAL_API_ENDPOINT}';
   };
   ```

2. **Update all E2E/test configs**

3. **Update OpenAPI specs**

4. **Ensure CORS origin is whitelisted in backend**

### Phase 3: Verify JWT & Database Connection ✅
Ensure backend can:
- Connect to Azure SQL Server
- Validate JWT tokens
- Authenticate users

---

## Recommended Quick Fixes

### **Option A: Use Dynamic API Resolution (Recommended ✅)**
```typescript
// client/src/environments/environment.production.ts
const resolveApiUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    
    // Extract subdomain from deployed frontend
    if (host.includes('azurestaticapps.net')) {
      // For static web app hosted backend: https://crm-web-001.azurestaticapps.net
      // API runs on same origin
      return window.location.origin;
      
      // OR if separate API service:
      // return 'https://crm-api-prod.azurewebsites.net';
    }
  }
  return 'http://localhost:5014'; // Fallback for dev
};
```

### **Option B: Add to Environment Variables (Best Practice)**
```typescript
// During Azure deployment, inject via App Settings
export const environment = {
  apiUrl: process.env['API_URL'] || 'http://localhost:5014'
};
```

### **Option C: Use Azure Static Web Apps API Proxy (Best)**
Configure `staticwebapp.config.json`:
```json
{
  "routes": [
    {
      "route": "/api/*",
      "rewrite": "http://crm-enterprise-api-prod.azurewebsites.net/"
    }
  ]
}
```

---

## Testing the Fix

Once configuration is updated:

1. **Test in browser console:**
   ```javascript
   // Open DevTools Console on login page
   console.log(window.location.origin);  // Should show Azure Static Web App domain
   
   // Check network tab
   // POST /api/auth/login should show 200 (if credentials correct) or 401 (if invalid)
   // NOT 0 (network error) or timeout
   ```

2. **Test with correct credentials:**
   ```
   Email: (from database seeding or admin user)
   Password: (initial password or reset)
   ```

3. **Monitor server logs:**
   ```bash
   # Azure App Service logs
   az webapp log tail --resource-group {RG} --name {API_APP_NAME}
   ```

---

## Prevention: Fix Configuration Permanently

**Update all hardcoded API references:**

1. ✅ `client/src/environments/environment.production.ts` 
2. ✅ `client/playwright.config.ts`
3. ✅ `client/e2e/*.spec.ts` (use environment variable)
4. ✅ `docs/ai/agent-tools.openapi.json` (document actual endpoint)
5. ✅ `docs/ai/KNOWLEDGE_GROUNDING_GUIDE.md` (update instructions)

**Implement proper environment management:**
- Use Azure Key Vault for secrets
- Use App Configuration for API endpoints
- Use GitHub Actions secrets for CI/CD pipeline

---

## Summary Table

| Issue | Severity | Impact | Status |
|-------|----------|--------|--------|
| Hardcoded invalid API URL | 🔴 Critical | Login completely broken | Needs immediate fix |
| API endpoint not running | 🔴 Critical | No backend available | Needs verification |
| API configuration in App Service | 🟡 High | JWT/DB connection | Needs verification |
| CORS origin mismatch | 🟡 Medium | Cross-origin request blocked | ✅ Configured |
| Hardcoded URLs in tests | 🟡 Medium | E2E tests fail | Needs cleanup |

---

## Next Steps

1. **IMMEDIATE:** Identify actual API endpoint deployed in Azure
2. **URGENT:** Update `environment.production.ts` with correct endpoint
3. **HIGH:** Test login flow end-to-end
4. **HIGH:** Verify JWT and database connectivity
5. **MEDIUM:** Update all remaining hardcoded references
6. **MEDIUM:** Implement dynamic API resolution for future deployments

---

## Support

For debugging, check:
- **Browser Console:** DevTools → Console tab for JavaScript errors
- **Network Tab:** DevTools → Network tab for HTTP request/response details
- **Server Logs:** Azure App Service → Log Stream for backend errors
- **Application Insights:** Azure Portal for detailed telemetry

