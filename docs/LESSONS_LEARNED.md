# Lessons Learned

## Production CORS & API Routing
- Avoid hard-coding dev API URLs in production builds; route to a dedicated production API host.
- Always return CORS headers for allowed origins, even on error responses.
- Keep a production E2E test that hits the real API and asserts a 2xx response.

## Invite Acceptance Flow
- Treat invite tokens as single-use and add a precheck before showing the password form.
- Redirect to login after success to make the flow explicit and secure.
- Show clear messages for expired/used invites to reduce support tickets.

## UI Consistency
- Document visual styles once and reuse (liquid glass, gradient titles, input groups).
- Prefer lightweight, inline loading indicators for long-running actions.
