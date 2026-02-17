# Issue Fixes (CRM)

This file tracks recurring UI/data issues and how to fix them quickly.

## 1) PrimeNG select value not showing on edit until click
**Symptoms**
- On edit forms (e.g., Activity Edit), owner or related entity fields appear empty.
- After clicking anywhere in the form, the selected value suddenly appears.

**Root cause**
- The form value is set before select options are loaded.
- PrimeNG `<p-select>` only displays the value when the option exists in the options list.

**Fix pattern**
1) When pre‑filling an edit form, create a temporary option for the current value.
2) Insert it into the select options list immediately.
3) When the real list loads, merge the temporary option if it doesn't already exist.

**Example implementation**
- File: `client/src/app/crm/features/activities/pages/activity-form.page.ts`
- Added a `pendingOwnerOption` and merge it into `ownerOptions` once users load.

**Why this is safe**
- It keeps the selected value visible even when the API list is delayed.
- It avoids duplicates by checking existing options before inserting.

## 2) Activity Edit date/time shows UTC instead of user local time
**Symptoms**
- Activity Edit date/time fields render in UTC even when the user is in a different time zone.
- The stored value looks correct in the API response, but the picker displays the wrong hour.

**Root cause**
- The API returns UTC timestamps without a timezone suffix (e.g. `"2026-01-18T12:30:00"`).
- `new Date(value)` treats this as local time, which shifts the displayed time.

**Fix pattern**
1) When pre-filling edit forms, parse timestamps as UTC if the string lacks a timezone offset.
2) Use a helper to append `Z` when needed before constructing the Date.

**Example implementation**
- File: `client/src/app/crm/features/activities/pages/activity-form.page.ts`
- Added `parseUtcDate()` and used it for `dueDateUtc` and `completedDateUtc`.

**Why this is safe**
- It preserves UTC storage while displaying the correct local time.
- It only changes how the edit form parses dates; payloads remain unchanged.

## 3) Activity list timestamps show UTC instead of user local time
**Symptoms**
- Activity list rows and task views display UTC timestamps.
- The same record renders correctly after editing.

**Root cause**
- The list templates pass raw UTC strings to Angular `date` pipe.
- When the string lacks a timezone suffix, `date` assumes local time.

**Fix pattern**
1) Normalize activity timestamps with the same UTC parsing helper used in edit forms.
2) Pass the parsed `Date` to the `date` pipe in list templates.

**Example implementation**
- Files: `client/src/app/crm/features/activities/pages/activities.page.ts`, `client/src/app/crm/features/activities/pages/activities.page.html`
- Added `parseUtcDate()` + `asLocalDate()` and applied to list/task rendering.

**Why this is safe**
- Keeps the storage format unchanged and fixes display only.

## 4) Lead create fails in production with CORS error
**Symptoms**
- Creating a lead in production shows `Origin ... is not allowed by Access-Control-Allow-Origin`.
- Browser console shows `Status code: 500` and `net::ERR_FAILED`.

**Root cause**
- Production frontend is calling a dev API host that does not return CORS headers for `https://www.northedgesystem.com`.
- The API response is a 500 and does not include CORS headers, so the browser reports it as a CORS error.

**Fix pattern**
1) Ensure the production frontend points to the production API host.
2) Allow `northedgesystem.com` and subdomains in API CORS policy.
3) Redeploy the API so the updated CORS policy is active.
4) Validate with the production E2E test.

**Example implementation**
- CORS policy update: `server/src/CRM.Enterprise.Api/Program.cs`
- Production API URL: `client/src/environments/environment.production.ts`
- Production E2E test: `client/e2e/lead-create-prod.spec.ts`

**Why this is safe**
- It keeps CORS locked to the company domain while unblocking production traffic.
- The E2E test verifies lead creation without exposing sensitive logs.

## 5) Dashboard console error (NG0100 ExpressionChangedAfterItHasBeenCheckedError)
**Symptoms**
- Browser console shows `ExpressionChangedAfterItHasBeenCheckedError` when loading the dashboard.
- Error references the dashboard card list changing after it was checked.

**Root cause**
- The selectable card list was computed in a template method and changed during initialization when role defaults arrived.
- Angular detected the value change mid-cycle and logged NG0100.

**Fix pattern**
1) Cache selectable cards in a signal and update it when layout defaults change.
2) Bind the template to the cached signal instead of calling a method.

**Example implementation**
- File: `client/src/app/crm/features/dashboard/pages/dashboard.page.ts`
- File: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`

**Why this is safe**
- Keeps the UI stable during initial change detection.
- Removes mid-cycle list mutation without changing the layout logic.

## 6) Landing page Book Demo form consistency and scheduling policy
**Symptoms**
- Book Demo UI had inconsistent control sizing after introducing Ifta labels.
- Dialog closed unexpectedly on outside clicks.
- Scheduling constraints were ambiguous across user timezone vs Toronto policy window.

**Root cause**
- Mixed native inputs and PrimeNG controls with incomplete width/height rules for `p-iftalabel`.
- No single canonical timestamp path for scheduling validation.

**Fix pattern**
1) Standardize the dialog as PrimeNG modal:
   - Use `p-dialog` with `modal=true` and `dismissableMask=false`.
2) Standardize controls:
   - Use PrimeNG controls only (`pInputText`, `p-select`, `p-datepicker`, `pTextarea`) with `p-iftalabel`.
   - Apply explicit full-width + min-height styles for usable input sizing.
3) Canonical scheduling payload:
   - Convert selected date/time + selected timezone to `preferredDateTimeUtc` before submit.
4) Enforce policy in backend (authoritative):
   - Validate from UTC against Toronto time rules: next Toronto day onward, 9:00 AM-5:00 PM Toronto.
5) Confirm user completion:
   - Show explicit success dialog/thanks note after submission.

**Example implementation**
- Client:
  - `client/src/app/public/landing/landing.page.ts`
  - `client/src/app/public/landing/landing.page.html`
  - `client/src/app/public/landing/landing.page.scss`
  - `client/src/app/public/landing/models/crm-landing.models.ts`
  - `client/src/app/public/landing/services/crm-landing.service.ts`
- API:
  - `server/src/CRM.Enterprise.Api/Contracts/Auth/BookDemoRequest.cs`
  - `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`

**Why this is safe**
- UX is consistent and accessible with PrimeNG controls.
- Scheduling rules are tamper-resistant because backend validates on UTC canonical data.
- Ops receives consistent timestamps (UTC + Toronto display in email).
