# Azure Login Failure - Quick Fix Guide

**Status:** 🚨 **Critical** - Login completely broken  
**Root Cause:** Hardcoded invalid API endpoint + potential deployment issue  
**Time to Fix:** 10-15 minutes (once actual API endpoint is identified)

---

## ⚡ Step 1: Identify Your Actual API Endpoint (5 minutes)

Run this command to find your deployed Azure App Services:

```bash
# Login to Azure
az login

# List all app services in your subscription
az webapp list --query "[].{name:name, defaultHostName:defaultHostName}" -o table

# Look for one that matches: crm-enterprise-api-*
# Example output might be:
# crm-enterprise-api-prod        crm-enterprise-api-prod.azurewebsites.net
# crm-enterprise-api-staging     crm-enterprise-api-staging.azurewebsites.net
```

**Write down your actual API endpoint:**
```
ACTUAL_API_ENDPOINT = https://_____________________________.azurewebsites.net
```

---

## ⚡ Step 2: Test API Connectivity (2 minutes)

Before changing configuration, verify the endpoint is working:

```bash
# Replace with your actual endpoint
API_URL="https://YOUR_ACTUAL_API_ENDPOINT"

# Test health endpoint
curl -v "${API_URL}/health"

# Expected output: 200 OK
# If you get connection error, timeout, or 404 → API not deployed/running
```

---

## ⚡ Step 3: Fix Production Environment Configuration

### **Option A: Simple Fix (Quick, but not permanent)**

Edit: `client/src/environments/environment.production.ts`

```typescript
// BEFORE (broken)
const resolveApiUrl = () => {
  return 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
};

// AFTER (fixed)
const resolveApiUrl = () => {
  return 'https://YOUR_ACTUAL_API_ENDPOINT.azurewebsites.net';
};
```

**Replace `YOUR_ACTUAL_API_ENDPOINT` with the value from Step 1**

### **Option B: Smart Fix (Recommended for production)**

```typescript
const resolveApiUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    
    // If running on Azure Static Web App
    if (host.includes('azurestaticapps.net')) {
      // Use environment variable or deployment-specific endpoint
      return 'https://YOUR_ACTUAL_API_ENDPOINT.azurewebsites.net';
    }
    
    // Local development
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      return 'http://localhost:5014';
    }
  }
  
  // Fallback
  return 'https://YOUR_ACTUAL_API_ENDPOINT.azurewebsites.net';
};

export const environment = {
  production: true,
  useMockApi: false,
  apiUrl: resolveApiUrl(),
  envLabel: 'PROD',
  theme: 'graphite'
};
```

---

## ⚡ Step 4: Update E2E Test Configuration

Open: `client/playwright.config.ts`

```typescript
// BEFORE
export default defineConfig({
  // ... other config
  env: {
    E2E_API_URL: 'https://crm-enterprise-api-dev-01122345.azurewebsites.net',
  },
});

// AFTER
export default defineConfig({
  // ... other config
  env: {
    E2E_API_URL: process.env.E2E_API_URL || 'https://YOUR_ACTUAL_API_ENDPOINT.azurewebsites.net',
  },
});
```

---

## ⚡ Step 5: Rebuild and Deploy

```bash
# Build production Angular app
cd client
npm install
npm run build

# Output: dist/ folder ready for deployment

# If using Azure Static Web Apps:
# Push to main branch or run manual deployment
git add .
git commit -m "fix: update API endpoint for production login"
git push origin main
```

---

## ⚛️ Step 6: Test the Fix

1. **Wait for deployment** (~2-5 minutes)

2. **Open the frontend:**
   ```
   https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net/login
   ```

3. **Check browser DevTools (F12):**
   - **Console tab:** Should show no errors
   - **Network tab:** Watch the POST to `/api/auth/login`
   - Expected response: `200` (if valid credentials) or `401` (if invalid)
   - NOT `0` (network error) or timeout

4. **Test login with credentials:**
   - Use a valid user email/password from your database
   - If you don't have any, see "Seed Default Admin" below

---

## 🗄️ Seed Default Admin User (if needed)

If you have no users in the database, you need to run the seeding script:

```bash
# From server directory
cd server/src/CRM.Enterprise.Api

# Run the project (applies migrations and seeds admin user)
dotnet run

# Look for output:
# "Admin user created: admin@example.com"
# Password: (generated or default)
```

Or check your database initialization code for default credentials.

---

## 🔍 **Troubleshooting**

### ❌ Still Getting "Network error"
```
Means: API endpoint is not responding

Check:
1. Is the API_ENDPOINT actually deployed? 
   curl https://YOUR_API_ENDPOINT/health
   
2. Is it running?
   az webapp show -n {app_name} --query state
   Should return: "Running" not "Stopped"
   
3. Are permissions correct?
   Check Azure App Service network/firewall rules
```

### ❌ Still Getting "Invalid email or password"
```
Means: API is responding but authentication failed

Check:
1. Email exists in database
2. Password is correct
3. User account is not deactivated
4. JWT configuration in backend appsettings.json
```

### ❌ CORS Error in Browser Console
```
"Access to XMLHttpRequest has been blocked by CORS policy"

Check:
1. Is frontend origin whitelisted in backend CORS?
   ✅ Already done in Program.cs (line 57)
   
2. Does backend CORS include your current frontend domain?
   Look for: jolly-dune-0d9d1fe0f.2.azurestaticapps.net
```

### ❌ Still Getting Timeout After 15 Seconds
```
Means: API is not responding at all

Check:
1. API endpoint is correct
2. API service is running
3. Network connectivity (firewall, routing)
4. Application Insights logs for backend errors
```

---

## 🩺 **Diagnostic Commands**

Run these to understand your deployment:

```bash
# See all app services
az webapp list -o table

# Get specific app service details
az webapp show -g {resource_group} -n {app_name}

# View app service logs
az webapp log tail -g {resource_group} -n {app_name}

# Check app service configuration
az webapp config appsettings list -g {resource_group} -n {app_name}

# Test endpoint directly
curl -v https://YOUR_API_ENDPOINT/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Should return: either 200 (success) or 401 (invalid credentials)
# NOT: connection error, timeout
```

---

## 📋 **Validation Checklist**

- [ ] Identified actual API endpoint from Azure
- [ ] Verified API is running: `curl https://API/health` returns 200
- [ ] Updated `environment.production.ts` with correct endpoint
- [ ] Updated `playwright.config.ts` with correct endpoint
- [ ] Rebuilt Angular app: `npm run build`
- [ ] Deployed to Azure Static Web App
- [ ] Waited 5 minutes for deployment
- [ ] Tested login at: https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net/login
- [ ] DevTools Network tab shows POST to `/api/auth/login` succeeds (200 or 401)
- [ ] Successfully logged in with valid credentials

---

## 🎯 **If All Else Fails**

Contact Azure support with:
1. Resource group name
2. App Service names (frontend + backend)
3. Network trace from browser DevTools
4. Application Insights logs (if available)
5. Date/time of login attempts

Or check these documentation files:
- `docs/LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md` (detailed analysis)
- `docs/PROJECT_MASTER.md` (architecture overview)
- `server/src/CRM.Enterprise.Api/Program.cs` (CORS configuration)

