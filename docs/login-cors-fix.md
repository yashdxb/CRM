# Login CORS 500 Fix

## Issue
Logging in from `https://www.northedgesystem.com` failed with a CORS error. The browser showed a 500 response for `/api/auth/login` and the request did not include `Access-Control-Allow-Origin`.

## Root Cause
The tenant resolution middleware ran for CORS preflight (OPTIONS) requests. When the preflight hit the middleware, it attempted tenant resolution and could fail, returning an error before the CORS middleware completed the preflight. This resulted in a 500 without CORS headers, which the browser reported as a CORS block.

## Fix
Bypass tenant resolution for OPTIONS preflight requests.

Change:
- `server/src/CRM.Enterprise.Api/Middleware/TenantResolutionMiddleware.cs`
  - Skip tenant resolution when the HTTP method is `OPTIONS`.

## Result
Preflight requests complete successfully, CORS headers are returned, and login requests proceed without the CORS error.
