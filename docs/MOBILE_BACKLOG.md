# Mobile Backlog (Flutter)

Purpose: Separate backlog for the Flutter mobile app. Keep ClickUp in sync with this document.
Mobile repo: https://github.com/yashdxb/crm-enterprise-mobile

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

---

## Now Checklist (Draft)

Mobile MVP scope aligned to core CRM execution needs.

1) Auth + tenant selection
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - User can sign in with CRM credentials and receive a valid JWT.
  - Tenant context is set to `default` (or selected tenant) and stored locally.
  - Session persists across app restarts.

2) Dashboard KPIs + My Tasks
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - Mobile dashboard shows KPI cards (pipeline, tasks due today, leads).
  - My Tasks list renders and supports status updates.

3) Leads list + lead detail (read-only)
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - Leads list supports search and status filter.
  - Lead detail shows key profile fields, score, and status.

4) Activities (create/complete)
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - User can create Task/Call/Meeting with due date and priority.
  - User can mark activities complete from list or detail.

5) Push notifications for tasks + SLA alerts
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - Push notifications for newly assigned tasks.
  - SLA breach notifications for overdue first-touch tasks.

6) Offline read cache (leads + tasks)
MoSCoW: Should
- Status: NOT STARTED
- Acceptance criteria:
  - Last 24-48 hours of leads and tasks are available offline.
  - Clear UI state indicates offline mode.

---

## Next Checklist (Draft)

1) Lead create + qualify + convert
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - Create lead from mobile with required fields.
  - Qualification factors editable with Unknown defaults.
  - Convert lead into account/contact/opportunity with safeguards.

2) Opportunities list + detail + stage update
MoSCoW: Must
- Status: NOT STARTED
- Acceptance criteria:
  - Opportunities list supports stage filter.
  - Opportunity detail shows stage, amount, close date, owner.
  - Stage update enforces required fields.

3) Accounts + contacts (search + detail)
MoSCoW: Should
- Status: NOT STARTED
- Acceptance criteria:
  - Search across accounts and contacts.
  - Detail view shows linked records and activity timeline.

4) Activity timeline + notes
MoSCoW: Should
- Status: NOT STARTED
- Acceptance criteria:
  - Timeline displays activities for lead/account/opportunity.
  - Notes can be added from mobile.

5) My pipeline summary + at-risk alerts
MoSCoW: Should
- Status: NOT STARTED
- Acceptance criteria:
  - Mobile pipeline summary shows stage totals.
  - At-risk deals are highlighted.

6) Role/permission gating parity with web
MoSCoW: Should
- Status: NOT STARTED
- Acceptance criteria:
  - UI elements respect CRM permission claims.
  - Unauthorized actions are blocked with clear messaging.

---

## Later Checklist (Draft)

1) Offline write + sync conflict handling
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Offline edits sync when online.
  - Conflicts resolved with last-write or user choice.

2) Calendar integration (device + Google/Outlook)
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Meetings sync to device calendar.
  - Optional Google/Outlook OAuth connects to CRM activities.

3) Email compose + sync
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Send email from mobile and log to timeline.
  - Replies sync back to CRM.

4) Document capture (scan + upload)
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Scan document with camera and upload to record.

5) Mobile reporting dashboards
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Executive pipeline summary and trend views.

6) Field sales enhancements (geo check-in, visit logs)
MoSCoW: Could
- Status: NOT STARTED
- Acceptance criteria:
  - Optional visit log with location and notes.
