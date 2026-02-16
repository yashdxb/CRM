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

## Delivery and Validation Workflow
- Verify UI implementations with Playwright on local dev after meaningful UI changes.
- Keep automation target explicit: local dev by default; avoid Azure dev automation unless explicitly requested.
- If service startup fails, check occupied ports and release/restart cleanly before debugging functional issues.
- Confirm API contract behavior first, then validate rendered UI behavior.

## Data Integrity and Source of Truth
- Dropdowns and selectable configuration lists should come from API sources, not client-side fallback data.
- For dashboard customization, assigned user pack context (name + display order) must be API-driven and preserved in untouched states.
- Keep demo/sample records realistic; avoid artificial suffixing patterns in names.

## Collaboration Behavior
- When user prompts end with a direct question, provide the direct answer first, then implementation/execution steps.
