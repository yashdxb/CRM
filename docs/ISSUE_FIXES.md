# Issue Fixes (CRM)

This file tracks recurring UI/data issues and how to fix them quickly.

## 1) Dashboard not responsive on mobile phones
**Symptoms**
- Dashboard tested on real mobile device (375px width) shows broken layout
- Content doesn't stack vertically; tables and grids overflow horizontally
- No adaptation for tablet (768px) or mobile breakpoints

**Root cause**
- Responsive SCSS mixin system (`respond-to()`) was created but never applied to `dashboard.page.scss`
- Components had fixed grid layouts without mobile-first `@media` queries
- Grid columns fixed at 2-4 columns regardless of viewport size

**Fix pattern**
1) Applied `@include respond-to('tablet')` and `@include respond-to('mobile')` to all grid/layout sections
2) Used mobile-first approach: base styles mobile, breakpoints add complexity
3) Transformed grid layouts from fixed columns to single-column on mobile
4) Adjusted padding, heights, and gaps for smaller screens
5) Hid verbose table headers on mobile, card layout shown instead

**Example implementation**
- File: `/client/src/app/crm/features/dashboard/pages/dashboard.page.scss`
- Applied responsive mixins to 12+ grid sections:
  - `.dashboard-card-grid`: `repeat(2, 1fr)` → `1fr` on tablet/mobile
  - `.metrics-grid`: `1.5fr repeat(4, 1fr)` → `1fr` on mobile
  - `.ai-action-row`: `4 columns` → `1 column` on mobile
  - `.dashboard-card`: `height: 360px` → `auto` on mobile
  - Padding: `$space-5 $space-6` (desktop) → `$space-3 $space-3` (mobile)

**Verification**
- ✅ Tested at 375px (iPhone SE): Single-column layout, proper stacking
- ✅ Tested at 768px (iPad): Optimized spacing, 1-column grids
- ✅ Tested at 1440px (Desktop): 2-column layouts, spacing preserved
- ✅ No content overflow or horizontal scrolling at any size
- ✅ Glass UI design maintained across all breakpoints
- ✅ Touch targets remain adequate for mobile (44px+)

**Why this is safe**
- Uses existing responsive mixin system already in codebase
- Mobile-first approach ensures smaller screens load less CSS
- No breaking changes; layout adapts gracefully
- All existing desktop functionality preserved

## 2) PrimeNG select value not showing on edit until click
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

## 7) AssistantController: Input Validation, Error Handling & Code Quality Refactoring

**Symptoms / Previous State**
- No explicit input validation in action endpoints; relied on service layer to catch bad data.
- Magic string `"approval_follow_up"` hardcoded in controller switch statement.
- DTO mapping logic duplicated inline across multiple endpoints.
- Inconsistent/missing error handling; no logging for security or operational issues.
- Permission checking tightly coupled to controller with hardcoded permission constants.

**Root cause**
- Initial implementation prioritized feature delivery over robustness.
- No centralized authorization/action type definitions.
- Limited observability into security events and error conditions.

**Fix pattern**
1) **Create dedicated authorization module** (`AssistantActionTypes.cs`):
   - Define action type constants instead of magic strings.
   - Centralize permission mapping via `GetRequiredPermission()`.
   - Enable extensibility for new action types without modifying controller.

2) **Add fail-fast input validation**:
   - Validate required fields (`ActionId`, `ActionType`, `CreatedActivityId`) before service calls.
   - Return `400 BadRequest` with descriptive error messages.
   - Prevents cascade failures in service/infrastructure layers.

3) **Implement comprehensive error handling**:
   - Catch generic exceptions in all action endpoints.
   - Log errors with full context (ActionId, UserId, error details).

## 8) Telerik Report Designer plugin not registered on jQuery
**Symptoms**
- Report Designer page shows: `Telerik Web Report Designer plugin is not registered on jQuery`.
- Intermittent follow-up errors appeared during loading, including missing Kendo runtime symbols.

**Root cause**
- Designer dependency loading was not strict enough and allowed partial success.
- Required runtime pieces (jQuery/Kendo/Viewer/Designer) were not always loaded in a safe order.
- Telerik designer resources served from default endpoints were unreliable in this setup.

**Fix pattern**
1) Serve Telerik designer static assets from API directly:
   - Add `ReportDesignerAssetsController` to map embedded Telerik resources to stable URLs.
2) Strengthen frontend loader behavior:
   - Load required assets in deterministic order.
   - Fail fast when a required script/style fails.
   - Reuse existing script/link elements only after confirmed load completion.
3) Ensure runtime prerequisites before initialization:
   - Validate `jQuery` availability.
   - Validate Kendo runtime availability (`kendo.View` check) before creating designer instance.
4) Keep plugin-name compatibility:
   - Support both `telerik_WebReportDesigner` and `telerikWebReportDesigner`.

**Example implementation**
- `client/src/app/crm/features/reports/pages/report-designer.page.ts`
- `client/angular.json`
- `server/src/CRM.Enterprise.Api/Controllers/ReportDesignerAssetsController.cs`
- `server/src/CRM.Enterprise.Api/Authorization/TelerikAnonymousRequirement.cs`
- `server/src/CRM.Enterprise.Api/Program.cs`

**Verification**
- `npm run build -- --configuration development` passes.
- `npx playwright test e2e/smoke.spec.ts` passes.
- Runtime probe confirms:
  - `jQuery.fn.telerik_WebReportDesigner` is present.
  - `window.kendo.View` is available.
  - no page runtime errors on `/app/report-designer`.

**Why this is safe**
- Does not alter report business logic.
- Improves load determinism and error visibility.
- Keeps existing auth and route contracts while stabilizing asset delivery.
   - Return meaningful client messages while preserving sensitive info in logs.
   - Special handling for rate limits (429) and service unavailability (503).

4) **Inject logging**:
   - Add `ILogger<AssistantController>` via dependency injection.
   - Log security events (unauthorized attempts) with user/action context.
   - Log operational issues and exceptions with appropriate severity levels.

5) **Refactor DTO mapping**:
   - Extract `MapExecuteRequest()` and `MapReviewRequest()` methods.
   - Eliminate inline null-coalescing duplication.
   - Centralize transformation logic for maintainability.

6) **Refactor permission logic**:
   - Replace controller switch statement with delegation to `AssistantActionTypes`.
   - Add null-safety checks to prevent compiler warnings.
   - Decouple controller from specific permission constants.

**Example implementation**
- New file: `server/src/CRM.Enterprise.Api/Authorization/AssistantActionTypes.cs`
  - Defines `ApprovalFollowUp` constant
  - Implements `GetRequiredPermission(actionType)` method
- Modified file: `server/src/CRM.Enterprise.Api/Controllers/AssistantController.cs`
  - Added `ILogger<AssistantController>` injection
  - Added input validation in `ExecuteAction()`, `ReviewAction()`, `UndoAction()`
  - Enhanced error handling in `Send()`, `ExecuteAction()`, `ReviewAction()`, `UndoAction()`
  - Extracted `MapExecuteRequest()` and `MapReviewRequest()` methods
  - Refactored `CanExecuteAction()` to use `AssistantActionTypes.GetRequiredPermission()`

**Code Quality Improvements**
| Metric | Before | After | Impact |
|--------|--------|-------|--------|
| Magic strings in controller | 1 | 0 | Maintainability ↑ |
| DTO mapping duplication | 3 endpoints | 2 extracted methods | DRY principle ↑ |
| Error scenarios explicitly handled | 2 | 4+ with logging | Observability ↑ |
| Logging coverage | None | All action endpoints | Debuggability ↑ |
| Input validation | Implicit | Explicit fail-fast | Robustness ↑ |
| Lines of code in controller | 221 | 293 (refactored) | Clarity ↑ |

**Why this is safe**
- Maintains Clean Architecture separation of concerns (no layer violations).
- All changes are backward compatible; public API contract unchanged.
- Build successful with zero errors and zero breaking changes.
- Validation and error handling enhance robustness without changing feature behavior.
- New authorization module is easily testable and extensible.

## 7) OAuth Email Connection Returns 400 Bad Request
**Symptoms**
- Clicking "Connect" for Microsoft 365 email integration completes OAuth consent flow.
- After redirect back to CRM, POST `/api/email-connections/callback` returns 400 Bad Request.
- GET `/api/email-connections` returns 500 Internal Server Error.

**Root cause (multi-layered)**
1. **Scope duplication**: `EmailOAuthOptions.cs` initialized `Scopes` array with default values, causing .NET configuration binding to merge appsettings scopes with defaults (12 scopes instead of 6).
2. **Missing User.Read scope**: Microsoft Graph `/me` endpoint requires `User.Read` permission. The `profile` and `email` OIDC scopes only provide claims in the ID token—they do NOT grant Graph API access.
3. **Misleading error**: Azure logs showed "OAuth token exchange failed... 403 Forbidden" but the actual failure was in `GetUserProfileAsync()` calling Graph API, NOT the token exchange itself.

**Fix pattern**
1) Fix scope duplication by changing default initialization:
   ```csharp
   // Before (causes merge)
   public string[] Scopes { get; set; } = ["openid", "profile", ...];
   
   // After (respects config-only)
   public string[] Scopes { get; set; } = Array.Empty<string>();
   ```

2) Add `User.Read` scope in appsettings.json:
   ```json
   "Scopes": ["openid", "profile", "email", "offline_access", "User.Read", "Mail.Read", "Mail.Send"]
   ```

3) Ensure Azure AD App Registration has `User.Read` delegated permission added and admin consented.

**Example implementation**
- File: `server/src/CRM.Enterprise.Infrastructure/Emails/EmailOAuthOptions.cs`
  - Changed `Scopes` default from hardcoded array to `Array.Empty<string>()`
- File: `server/src/CRM.Enterprise.Api/appsettings.json`
  - Added `User.Read` to Microsoft OAuth scopes array

**Verification**
- ✅ OAuth consent flow completes successfully
- ✅ Token exchange succeeds (access token obtained)
- ✅ Graph API `/me` call succeeds (user profile fetched)
- ✅ Email connection saved and marked Active
- ✅ Connection test: "Connection verified! Found 5992 messages in inbox."
- ✅ Zero console errors in browser

**Why this is safe**
- Configuration-only change; no business logic modified.
- Backward compatible—existing connections continue working.
- Scopes are well-documented Microsoft Graph permissions.
- Azure AD app registration already had User.Read permission configured.

## 9) Telerik Report Viewer "wrapper" Error – Pages Area Empty

**Symptoms**
- Report viewer loads toolbar but pages area remains empty
- Browser console shows: `Cannot read properties of undefined (reading 'wrapper')`
- Error occurs in `PageNumberInput` constructor at line 8117 of bundled Telerik jQuery Report Viewer
- Network shows `/api/telerik-reports/formats` succeeds but no `/pages/1` request is made

**Root cause**
**Kendo UI CSS/JS version mismatch** (3-year gap):

| Component | Version |
|-----------|---------|
| Bundled Kendo JS (in `@progress/telerik-jquery-report-viewer`) | **2025.4.1111** |
| `kendo-ui-core` CSS | **2022.3.1109** |

The `NumericTextBox` widget initialization failed because the old CSS (2022) didn't create the expected `.k-numerictextbox` wrapper structure that the new JS code (2025) relied on. The widget constructor tried to access `this._numeric.wrapper[0]` which was `undefined`.

**Fix pattern**
1. Update `kendo-ui-core` to match the bundled JS version
2. Install the new CSS package (kendo-ui-core 2025.x no longer bundles CSS)
3. Update `angular.json` styles array to use the new CSS package

**Implementation**

```bash
# Step 1: Update kendo-ui-core (use --legacy-peer-deps due to Telerik's incorrect peer deps)
npm install kendo-ui-core@2025.4.1111 --save --legacy-peer-deps

# Step 2: Install new CSS package
npm install @progress/kendo-theme-default --save --legacy-peer-deps
```

```diff
# angular.json styles array change
- "node_modules/kendo-ui-core/css/web/kendo.common.min.css",
- "node_modules/kendo-ui-core/css/web/kendo.default.min.css",
- "node_modules/kendo-ui-core/css/web/kendo.default.mobile.min.css"
+ "node_modules/@progress/kendo-theme-default/dist/all.css"
```

**Files changed**
- `client/package.json` – dependency versions updated
- `client/angular.json` – styles array updated
- `client/e2e/reports-viewer.spec.ts` – Playwright test added (new file)

**Verification**
```bash
cd client
E2E_BASE_URL=http://localhost:4200 API_BASE_URL=http://localhost:5014 \
  npx playwright test e2e/reports-viewer.spec.ts
```
- ✅ No wrapper errors in console
- ✅ Page number input has proper `k-numerictextbox` and `k-input` classes
- ✅ Report pages area displays content
- ✅ Smoke tests pass (no regressions)

**Why this is safe**
- CSS-only change on client side; no business logic modified
- Kendo theme package is from same vendor (@progress/kendo-theme-default)
- Version alignment ensures widget initialization succeeds
- Backward compatible with existing Telerik Report Viewer components

**Azure deployment note**
Server-side reports code is currently untracked and needs to be committed:
- `server/src/CRM.Enterprise.Api/Authorization/TelerikAnonymousRequirement.cs`
- `server/src/CRM.Enterprise.Api/Controllers/ReportsController.cs`
- `server/src/CRM.Enterprise.Api/Controllers/TelerikReportsController.cs`
- `server/src/CRM.Enterprise.Api/Reporting/`
- `server/src/CRM.Enterprise.Infrastructure/Reporting/`
