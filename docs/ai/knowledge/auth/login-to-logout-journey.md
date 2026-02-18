---
title: Login to Logout Journey
module: auth
audience: all
version: 2026-02-18
owner: product-ops
status: approved
tenant_scope: global
source: app-routes
---

## Purpose

Describe the end-to-end authenticated CRM journey from sign in to sign out.

## Entry points

1. Public landing page: `/landing`
2. Login page: `/login`
3. Accept invite: `/accept-invite?token=...`
4. Forced password change page: `/change-password`

## Login flow

1. User submits `email` and `password` on `/login`.
2. Client sends `POST /api/auth/login`.
3. If available, client sends `X-Tenant-Key` header from tenant storage.
4. On success, client stores:
   - `auth_token` (JWT)
   - `tenant_key` (tenant context)
5. If `mustChangePassword = true`, user is redirected to `/change-password`.
6. Otherwise user is redirected to the requested route, default `/app/dashboard`.

## Auth guard behavior

1. `/app/**` requires `authGuard`.
2. If token is missing/expired, user is redirected to `/login?redirectTo=<path>`.
3. Route-level access uses `roleGuard` with permission keys.
4. Unauthorized route access redirects to `/landing`.

## Authenticated CRM shell

1. Main shell route is `/app`.
2. Default child route is `/app/dashboard`.
3. Major CRM sections:
   - `/app/dashboard`
   - `/app/leads` and lead sub-routes
   - `/app/opportunities`
   - `/app/activities`
   - `/app/settings/*`

## Session and user context

1. Token claims drive role/permission checks.
2. Tenant context is persisted in local storage as `tenant_key`.
3. API calls include bearer token via auth interceptor.

## Logout flow

1. User triggers logout from user menu or command palette.
2. Client calls `POST /api/auth/logout`.
3. Client clears token, disconnects presence, and navigates to `/login`.

## New user invite flow

1. Admin sends invite.
2. Invite page validates token using `GET /api/auth/invite-status`.
3. User sets password using `POST /api/auth/accept-invite`.
4. User signs in through normal login flow.
