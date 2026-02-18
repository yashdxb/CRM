---
title: Auth UI and API Reference
module: auth
audience: crm-admin
version: 2026-02-18
owner: engineering
status: approved
tenant_scope: global
source: auth-controller
---

## Purpose

Provide an implementation-accurate reference for authentication UI fields, state handling, and API endpoints.

## Login UI fields

1. `email` (required, must be valid email)
2. `password` (required, minimum 6 chars)
3. `remember` (UI flag; does not change API contract)

## Login request

1. Endpoint: `POST /api/auth/login`
2. Body:
   - `email`
   - `password`
3. Optional header:
   - `X-Tenant-Key`

## Login response

1. `accessToken`
2. `expiresAtUtc`
3. `email`
4. `fullName`
5. `roles`
6. `permissions`
7. `tenantKey`
8. `mustChangePassword`

## Client session storage

1. Token key: `auth_token`
2. Tenant key: `tenant_key`
3. Expired/invalid JWT is automatically cleared from storage.

## Auth endpoints in scope

1. `POST /api/auth/login`
2. `POST /api/auth/logout`
3. `POST /api/auth/change-password`
4. `POST /api/auth/accept-invite`
5. `GET /api/auth/invite-status?token=...`

## Logout behavior

1. API call returns JSON status.
2. Client always clears local session and redirects to `/login`.

## Error behavior (login)

1. `401`: invalid credentials messaging.
2. `400` with tenant issue: invalid tenant key messaging.
3. `0/502/503/504`: transient retry handling before final error.
4. Client timeout target: 15 seconds.
