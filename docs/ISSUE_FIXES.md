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

## 10) Stop All Notification Emails (Hard Disable)

**Symptoms**
- Users still received notification emails even when notification settings were turned off.
- Requirement was to stop all notification emails immediately.

**Fix applied**
1) Added a hard runtime stop in notification alert worker send path.
2) Added a hard runtime stop in decision SLA escalation email path.

**Files changed**
- `server/src/CRM.Enterprise.Infrastructure/Notifications/NotificationAlertWorker.cs`
- `server/src/CRM.Enterprise.Infrastructure/Decisions/DecisionSlaEscalationWorker.cs`

**Commit**
- `77aeff3`

**Behavior now**
- Notification alert emails are not sent.
- Decision escalation emails are not sent.
- In-app realtime notifications remain unaffected.

**Deployment note**
- GitHub Actions API deploy currently fails in CI due to missing Telerik private NuGet feed (`NU1101`).
- Manual Azure deploy/restart is required until CI feed configuration is fixed.

## 11) Telerik "Pipeline By Stage" Report Runtime Errors and Broken Layout

**Symptoms**
- Report viewer loaded, but the report body failed with Telerik processing errors.
- Errors changed across iterations, including:
  - `Invalid object name` from the report SQL query.
  - `BarSeries: X value cannot be null or empty when using NumericalScale`.
  - `Table Body has 2 rows but 1 are expected`.
  - `Cannot find an overload of the function IsNull() that accepts arguments of type (null)`.
  - Footer/page counter expression failures involving `PageNumber`.
- After some fixes, the chart rendered incorrectly as a broken single-point graph or left a large blank area before the table.

**Root cause**
This was not one issue. It was a chain of report-definition problems in the server-side Telerik report:

1. The SQL source did not match the actual CRM schema.
2. The graph definition mixed incompatible axis/value bindings during iteration.
3. The table definition did not fully align body rows with row/column groups.
4. A defensive `IsNull(...)` expression was introduced in a Telerik context where that overload was not valid.
5. Footer page-number expressions were not accepted by the Telerik runtime version in this project.
6. The layout sizing left unnecessary whitespace and pushed content across extra pages.

**Fix pattern**
1. Correct the SQL data source to use the real CRM tables and join path.
2. Bind both the chart and table to the same explicit SQL data source.
3. Use category-on-X and numeric-on-Y graph configuration with `Y = "= Sum(Fields.TotalValue)"`.
4. Define explicit table row groups and one column group per body column.
5. Remove the unsupported footer page-number expression instead of leaving a runtime error in production.
6. Reduce chart/detail heights and move the table up so the report reads as one compact page block.

**Example implementation**
- File: `server/src/CRM.Enterprise.Api/Reporting/PipelineByStageTelerikReport.cs`
- Key changes:
  - SQL fixed to:
    - `FROM [crm].[Opportunities] o`
    - `INNER JOIN [crm].[OpportunityStages] s ON o.StageId = s.Id`
  - Shared SQL data source used by both graph and table
  - Graph configured with:
    - category group on `Fields.StageName`
    - value axis as `NumericalScale`
    - `BarSeries.Y = "= Sum(Fields.TotalValue)"`
  - Table fixed with:
    - one detail row group
    - explicit column groups for `Stage`, `Deals`, `Value`, `Share`
  - Layout tightened:
    - detail height reduced to `12cm`
    - graph height reduced to `6.8cm`
    - table moved to `7.8cm`
    - table height set to `3.2cm`
  - Legend hidden to remove the stray blue marker
  - Footer right text box set to blank because the runtime rejected the page counter expressions in this environment

**Files changed**
- `server/src/CRM.Enterprise.Api/Reporting/PipelineByStageTelerikReport.cs`

**Verification**
Playwright was used to validate the end result against the running app, not just the code shape.

```bash
cd client
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 \
  npx playwright test e2e/telerik-debug.spec.ts --workers=1
```

- ✅ `/app/reports` renders without Telerik processing errors
- ✅ The chart displays the expected stage bars:
  - `Qualification` = `$760,000`
  - `Prospecting` = `$120,000`
  - `Proposal` = `$90,200`
- ✅ The summary table matches the chart data
- ✅ The stray legend square is gone
- ✅ The large empty gap between chart and table is removed
- ✅ The report no longer fails on footer/page-number expressions

**Why this is safe**
- The fix is isolated to the server-side report definition.
- No authentication, report routing, or CRM business logic was changed.
- The graph and table now read from the same dataset, which reduces drift and mismatch risk.
- The final state favors stable rendering over decorative footer logic that the current Telerik runtime does not support reliably in this setup.

## 12) Telerik Report Server URL confusion (IIS VM vs active Report Server host)

**Symptoms**
- Report Server integration could not be re-enabled because the URL was unknown.
- A remembered host `http://20.106.148.159` opened IIS, which made it unclear whether the Report Server deployment was broken or moved.
- Azure Key Vault contained Report Server credentials, but no explicit URL secret.

**Root cause**
- There are two Azure report-related resource groups and two VMs:
  - `rg-crm-report-dev-eus` with `vmrptdev01` (Windows)
  - `rg-crm-report-dev-eus2` with `vmrptlinux01` (Linux)
- The Windows VM looks plausible from naming, but it currently serves only the default IIS landing page from `C:\inetpub\wwwroot`.
- The actual Telerik Report Server is running on the Linux VM behind nginx, which proxies traffic to a local upstream on `127.0.0.1:82`.

**Fix pattern**
1. Use Azure CLI to enumerate report-related resource groups and VMs.
2. Probe the public endpoints instead of assuming the Windows VM is the report host.
3. Inspect VM web-server configuration directly:
   - IIS on `vmrptdev01`
   - nginx on `vmrptlinux01`
4. Confirm the actual Telerik login page before updating application config.

**Verified result**
- Active Telerik Report Server URL:
  - `https://52.247.69.37`
  - `http://52.247.69.37`
- Azure host:
  - resource group: `rg-crm-report-dev-eus2`
  - VM: `vmrptlinux01`
- nginx config confirms:
  - public ingress on `80` and `443`
  - proxy target `127.0.0.1:82`
- `http://20.106.148.159` is not the report server. It is the Windows VM `vmrptdev01` serving default IIS only.

**Useful commands**
```bash
az vm list -d --query "[].{name:name,resourceGroup:resourceGroup,privateIps:privateIps,publicIps:publicIps}" -o table

az vm run-command invoke -g rg-crm-report-dev-eus2 -n vmrptlinux01 \
  --command-id RunShellScript \
  --scripts "sudo sed -n '1,240p' /etc/nginx/sites-enabled/reportserver"

curl -k -L https://52.247.69.37 | head
```

**Why this matters**
- App config should point to the Linux/nginx endpoint, not the Windows IIS VM.
- Future Report Server troubleshooting should start with Azure resource-group separation and live endpoint verification, not memory of an older local/IP setup.

## 14) Report Server hostname masking (`reports.northedgesystem.com`)

**Symptoms**
- The Report Server designer/viewer was exposed with the raw public IP `52.247.69.37`.
- That worked technically, but it was the wrong public URL shape and exposed infrastructure details.

**Root cause**
- The VM already had a public IP and nginx reverse proxy, but there was no DNS hostname bound to the service.
- nginx was configured as a catch-all with `server_name _;`.

**Fix pattern**
1. Create a public DNS `A` record:
   - `reports.northedgesystem.com -> 52.247.69.37`
2. Update nginx on `vmrptlinux01` to bind:
   - `server_name reports.northedgesystem.com;`
3. Reissue the current certificate with:
   - `CN=reports.northedgesystem.com`
   - `SAN=DNS:reports.northedgesystem.com`
4. Update application configuration to use:
   - `Reporting__ReportServerUrl=https://reports.northedgesystem.com`

**Verified result**
- DNS resolves correctly:
  - `reports.northedgesystem.com -> 52.247.69.37`
- nginx now serves the hostname directly.
- Local CRM API `/api/report-server/config` returns:
  - `reportServerUrl: https://reports.northedgesystem.com`
  - `designerUrl: https://reports.northedgesystem.com`
- Opening a Report Server report from `/app/reports` still succeeds after the hostname switch with no visible Telerik error pane in the automated browser run.

**Final SSL fix**
- A temporary public inbound `80` rule was added on the VM NSG for ACME validation.
- `certbot` + `python3-certbot-nginx` were installed on `vmrptlinux01`.
- A trusted Let's Encrypt certificate was issued for `reports.northedgesystem.com`.
- nginx was updated automatically to use:
  - `/etc/letsencrypt/live/reports.northedgesystem.com/fullchain.pem`
  - `/etc/letsencrypt/live/reports.northedgesystem.com/privkey.pem`
- The temporary ACME NSG rule was then removed.
- The CRM API App Service outbound IP set was explicitly allowed on inbound `443` so the proxy path can work from Azure.

**Why this is safe**
- The change is limited to ingress/DNS/config identity and does not change the upstream Report Server application itself.
- The CRM app now references the hostname instead of the raw IP, which is the correct public integration shape.

**Verified result**
- Browser TLS for `https://reports.northedgesystem.com` now chains to Let's Encrypt.
- CRM local API works with:
  - `Reporting__ReportServerUrl=https://reports.northedgesystem.com`
  - `Reporting__IgnoreInvalidTlsCertificate=false`
- `/api/report-server/config` returns the hostname URL.
- `/api/report-server/catalog` loads successfully.
- `/app/reports` opens a Report Server catalog report with no visible Telerik error pane in the automated browser run.

## 15) Report Server designer SQL connection failure (`127.0.0.1` was wrong)

**Symptoms**
- Creating a report in Telerik Report Server failed at the SQL data source step.
- Testing the connection with the repo's local development connection string returned:
  - `provider: TCP Provider, error: 35`
  - `The server was not found or was not accessible`

**Root cause**
- Report Server is running on `vmrptlinux01`.
- Using `Server=127.0.0.1,1433` inside the Report Server designer points to the Report Server VM itself, not the CRM database.
- The CRM application actually uses Azure SQL, not a local SQL Server instance on the Report Server host.

**Fix pattern**
1. Read the live app connection string from Azure App Service settings.
2. Extract the real SQL host and database:
   - SQL host: `crm-sql-dev-01130044.database.windows.net`
   - Database: `crm-enterprise-dev`
3. Verify the Report Server VM can reach Azure SQL on `1433`.
4. Use the Azure SQL connection string in the Report Server designer instead of `127.0.0.1`.

**Verified result**
- Azure App Service connection string confirmed:
  - `Server=tcp:crm-sql-dev-01130044.database.windows.net,1433`
  - `Initial Catalog=crm-enterprise-dev`
- Database exists on Azure SQL server `crm-sql-dev-01130044`.
- Connectivity from `vmrptlinux01` to Azure SQL port `1433` succeeded:
  - `TCP_OK`

**Operational note**
- Do not use local repo `appsettings.Development.json` SQL values inside hosted Report Server.
- For Report Server-authored reports, always use the database endpoint reachable from the Report Server host.

## 13) CRM application integration with Telerik Report Server

**Symptoms**
- The repo had Report Server catalog/token code, but the application still rendered reports through the embedded Telerik REST service by default.
- Direct browser calls to the Report Server created practical issues:
  - self-signed TLS warnings on the dev host
  - mixed-origin viewer/resource requests
  - inconsistent auth expectations between CRM JWT and Report Server bearer tokens
- Catalog cards could load, but opening a report failed on parameter or resource requests.

**Root causes**
- The app was returning the external Report Server URL directly instead of a same-origin CRM proxy.
- `ReportServerClient` was deserializing token payload fields with the wrong naming convention.
- Report catalog items did not reliably include `CategoryName`, but the Telerik viewer needs `Category/ReportName` when opening a Report Server report.
- Viewer asset requests under `/resources/` were being blocked because the proxy treated them like authenticated API calls instead of static viewer resources.

**Fix pattern**
1. Enable Report Server mode through the `Reporting` options:
   - `ReportServerUrl`
   - `ReportServerUsername`
   - `ReportServerPassword`
   - `IgnoreInvalidTlsCertificate` for the current dev server only
2. Route the frontend viewer through the CRM API proxy:
   - `/api/report-server/proxy/api/reports`
3. Authenticate the proxy upstream with the Report Server bearer token while keeping the browser on CRM-origin URLs.
4. Resolve report categories from the Report Server catalog API and open reports as `CategoryName/ReportName`.
5. Allow anonymous GET access only for safe Telerik viewer resource/configuration endpoints so static assets can load without breaking CRM auth.

**Code changes**
- API config endpoint now returns the CRM proxy path instead of the external Report Server service URL:
  - [ReportServerController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/ReportServerController.cs:30)
- Reports embed config now switches the viewer to Report Server provider mode when configured:
  - [ReportsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/ReportsController.cs:29)
- Added same-origin upstream proxy for Telerik Report Server:
  - [ReportServerProxyController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/ReportServerProxyController.cs:10)
- Fixed Report Server token/catalog deserialization and category resolution:
  - [ReportServerClient.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Reporting/ReportServerClient.cs:37)
- Added opt-in dev TLS bypass for the self-signed Report Server cert:
  - [ReportingOptions.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Reporting/ReportingOptions.cs:3)
  - [DependencyInjection.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs:84)
- Frontend now resolves the proxy URL and opens reports with `Category/Report`:
  - [reports.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/reports/pages/reports.page.ts:52)

**Verified result**
- `GET /api/report-server/config` returns:
  - `enabled: true`
  - `reportServiceUrl: /api/report-server/proxy/api/reports`
- `GET /api/report-server/catalog` returns live Report Server items.
- Opening a report from `/app/reports` now completes the expected Telerik sequence:
  - `configuration` 200
  - `clients` 200
  - `parameters` 200
  - `instances` 201
  - `documents` 202
  - `pages/1` 200
  - `resources/*` 200
- The remaining browser result is functional report rendering through Report Server with no visible Telerik error pane in the automated run.

**Verification commands**
```bash
curl -H "Authorization: Bearer <crm-jwt>" http://localhost:5014/api/report-server/config
curl -H "Authorization: Bearer <crm-jwt>" http://localhost:5014/api/report-server/catalog

cd client
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/smoke.spec.ts --workers=1
```

**Why this is safe**
- The external Report Server stays the source of truth for report execution.
- The browser no longer needs direct access to external Report Server auth/session details.
- The proxy is narrow and purpose-built for Telerik viewer traffic, not a general open relay.

## 14) Workflow approval builder saved JSON did not drive real CRM approval behavior

**Symptoms**
- The workflow designer could save a deal approval workflow definition, but opportunity approval behavior still depended on the old threshold-only logic.
- Closing, discounting, or updating a deal could still trigger approvals from hard-coded legacy rules instead of the saved workflow definition.
- The approval runtime could not reliably consume the newer workflow-definition JSON shape.

**Root causes**
- `OpportunityService` was still deciding approval triggers from legacy tenant threshold fields and hard-coded discount thresholds.
- `OpportunityApprovalService` deserialized `ApprovalWorkflowJson` only as the old `ApprovalWorkflowPolicy` payload and did not translate the newer workflow-definition format.
- The default workflow designer template used a generic purpose label (`Deal Approval`) that was not treated as a valid runtime match for `Close`, `Discount`, or `Update`.

**Fix pattern**
1. Parse tenant approval workflow JSON through the shared workflow mapper instead of assuming the legacy policy format.
2. Convert the stored workflow definition to runtime `ApprovalWorkflowPolicy` before building approval chains.
3. Replace the close/update/discount trigger checks in `OpportunityService` so they evaluate the saved workflow policy rather than old constants.
4. Treat `Deal Approval` as a generic workflow purpose so a newly published default approval workflow works without extra hidden configuration.

**Code changes**
- Workflow runtime now translates stored definition JSON into approval policy:
  - [OpportunityApprovalService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityApprovalService.cs)
- Opportunity approval gating now uses workflow steps for:
  - close approvals
  - discount approvals
  - forecast/update approvals
  - [OpportunityService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs)

**Verified result**
- Saving a deal approval workflow now affects real opportunity approval routing.
- The runtime no longer relies on the old `10% / 1000` hard-coded discount approval thresholds.
- A default published workflow can now trigger approval requests for the relevant opportunity actions.
- The old `/app/settings/workflow-builder` entry now redirects to the single workflow builder at `/app/workflows/designer`.
- The legacy settings-only workflow builder files were removed to prevent UI drift.

**Verification commands**
```bash
dotnet build server/src/CRM.Enterprise.sln

cd client
npm run build -- --configuration development
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/smoke.spec.ts e2e/workflow-designer.spec.ts --workers=1
```

**Why this is safe**
- The approval runtime now uses the same tenant workflow source of truth that the builder edits.
- Legacy tenant defaults still work as fallback when no workflow JSON exists.
- The change narrows drift between workflow design, approval execution, and decision inbox behavior.

## 15) Workflow builder publish validation was bypassed by scope normalization

**Symptoms**
- Clearing required scope fields like `Stage` did not reliably block publish.
- The builder could repopulate cleared values with defaults before the save request left the page.
- When publish failed, the UI could collapse the real backend validation message into a generic save error.

**Root causes**
- Frontend normalization in [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts) replaced blank scope fields with fallback defaults on every edit.
- Backend normalization in [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs) also converted blank scope values back to defaults, which is correct for missing fields but wrong for an explicit user-cleared draft.
- The workflow save endpoint returned plain text for validation failures, and the page did not parse all Angular `HttpErrorResponse` shapes correctly.

**Fix pattern**
1. Preserve explicitly blank scope values and only use defaults when a field is actually missing (`null`/`undefined`).
2. Keep structural validation strict for published workflows:
   - exactly one `start`
   - exactly one `end`
   - at least one `approval`
   - graph connectivity checks
   - required scope fields before publish
3. Return structured validation errors from the save endpoint and surface them in the builder UI.

**Code changes**
- Scope normalization now preserves explicit blanks:
  - [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs)
  - [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts)
- Save endpoint now returns an error array for invalid publish attempts:
  - [WorkflowDefinitionsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/WorkflowDefinitionsController.cs)
- Builder UI now captures backend validation errors into the on-page `Validation Issues` panel:
  - [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts)
- Added browser coverage for required-scope publish blocking:
  - [workflow-designer.spec.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/e2e/workflow-designer.spec.ts)

**Verified result**
- Clearing `Stage` and clicking `Publish` now keeps the workflow in the builder and shows:
  - `Workflow stage is required before publishing.`
- The backend no longer silently restores the missing value during the publish path.
- The builder now shows the real validation error instead of a generic save failure.

**Verification commands**
```bash
dotnet build server/src/CRM.Enterprise.sln

cd client
npm run build -- --configuration development
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/workflow-designer.spec.ts --workers=1
```

## 16) Workflow execution viewer saved metadata but could not read published workflow state back reliably

**Symptoms**
- The workflow execution viewer showed `No execution history yet` even after a deal approval request was created.
- `PUT /api/workflows/definitions/deal-approval` returned the new published workflow, but the next `GET` returned the old empty draft graph.
- Approval requests failed with:
  - `Approval workflow must be configured before requesting approval.`

**Root causes**
- The workflow JSON was being stored in camelCase, which is correct for the API and frontend.
- [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs) rehydrated saved JSON with the default `System.Text.Json` settings instead of `JsonSerializerDefaults.Web`.
- That made the runtime lose the persisted step/node data when reading the tenant workflow back, so approval execution and the execution viewer behaved as if the workflow were still empty.
- The new execution viewer E2E also initially tried to publish the starter graph without an approval node, which is invalid by design.

**Fix pattern**
1. Read saved workflow JSON using the same web/camelCase serializer options used when saving.
2. Persist execution metadata on approval chains and expose it through the execution status/history endpoints.
3. Make the E2E publish a minimally valid approval workflow before requesting a deal approval.
4. Run the browser against `http://localhost:4200` so the local Angular app and API do not fail on `127.0.0.1` vs `localhost` CORS mismatch.

**Code changes**
- Fixed workflow JSON rehydration:
  - [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs)
- Added persisted workflow execution metadata on approval chains:
  - [OpportunityApprovalChain.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Domain/Entities/OpportunityApprovalChain.cs)
  - [CrmDbContext.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Persistence/CrmDbContext.cs)
  - [20260307213119_AddWorkflowExecutionMetadataToApprovalChains.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Persistence/Migrations/20260307213119_AddWorkflowExecutionMetadataToApprovalChains.cs)
- Synced approval runtime metadata updates with chain state and linked decision requests:
  - [OpportunityApprovalService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityApprovalService.cs)
- Exposed current execution and history details to the UI:
  - [WorkflowDefinitionDtos.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Application/Workflows/WorkflowDefinitionDtos.cs)
  - [WorkflowExecutionService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Workflows/WorkflowExecutionService.cs)
  - [WorkflowExecutionContracts.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Contracts/Workflows/WorkflowExecutionContracts.cs)
  - [WorkflowExecutionsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/WorkflowExecutionsController.cs)
  - [workflow-definition.model.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/models/workflow-definition.model.ts)
  - [workflow-execution-viewer.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-execution-viewer.page.html)
  - [workflow-execution-viewer.page.scss](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-execution-viewer.page.scss)
- Added targeted browser coverage:
  - [workflow-execution-viewer.spec.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/e2e/workflow-execution-viewer.spec.ts)

**Verified result**
- `GET /api/workflows/definitions/deal-approval` now returns the same published approval graph that was just saved.
- `POST /api/opportunities/{id}/approvals` succeeds against the published workflow.
- `/api/workflows/executions/deal-approval/status` now returns the current deal, purpose, step, and pending approver.
- `/app/workflows/executions` shows the current execution card and populated history items for deal approvals.

**Verification commands**
```bash
dotnet build server/src/CRM.Enterprise.sln

cd client
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/smoke.spec.ts e2e/workflow-execution-viewer.spec.ts --workers=1
```

## 17) Approval workflow epic closeout: published lifecycle, tenant-role routing, and Decision Inbox linkage

**Symptoms**
- The builder only had one saved definition, so draft edits could immediately affect the live runtime path.
- Approval steps relied on free-text role names instead of tenant role ids.
- Decision Inbox items created from approval workflows did not carry workflow execution context, so the inbox could not deep-link into execution history.
- Workflow execution history did not show the linked decision status.

**Fix pattern**
1. Split the tenant workflow state into `draft` and `published`, and make runtime read only the published definition.
2. Add publish metadata (`publishedAtUtc`, `publishedBy`) and explicit operations for `save-draft`, `publish`, `unpublish`, and `revert-draft`.
3. Resolve approval routing from tenant roles and active users, storing both `approverRoleId` and display name for backward compatibility.
4. Persist workflow linkage on decision requests and expose it through the Decision Inbox and workflow execution endpoints.
5. Add browser coverage for publish/save lifecycle and pending-action to workflow-execution deep-linking.

**Code changes**
- Added draft/published workflow persistence and publish governance on the tenant record:
  - [Tenant.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Domain/Entities/Tenant.cs)
  - [WorkflowDefinitionService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Workflows/WorkflowDefinitionService.cs)
  - [WorkflowDefinitionDtos.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Application/Workflows/WorkflowDefinitionDtos.cs)
  - [WorkflowDefinitionContracts.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Contracts/Workflows/WorkflowDefinitionContracts.cs)
  - [WorkflowDefinitionsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/WorkflowDefinitionsController.cs)
- Added approver role ids to the workflow model and runtime routing:
  - [ApprovalWorkflowPolicy.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Application/Approvals/ApprovalWorkflowPolicy.cs)
  - [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs)
  - [OpportunityApproval.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Domain/Entities/OpportunityApproval.cs)
  - [DecisionStep.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Domain/Entities/DecisionStep.cs)
  - [OpportunityApprovalService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityApprovalService.cs)
- Added workflow linkage fields on decisions and surfaced them through the inbox:
  - [DecisionRequest.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Domain/Entities/DecisionRequest.cs)
  - [DecisionDtos.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Application/Decisions/DecisionDtos.cs)
  - [DecisionInboxItem.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Contracts/Decisions/DecisionInboxItem.cs)
  - [CreateDecisionRequest.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Contracts/Decisions/CreateDecisionRequest.cs)
  - [DecisionsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/DecisionsController.cs)
  - [DecisionInboxService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Decisions/DecisionInboxService.cs)
- Extended workflow execution status/history with decision linkage:
  - [WorkflowExecutionService.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Workflows/WorkflowExecutionService.cs)
  - [WorkflowExecutionContracts.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Contracts/Workflows/WorkflowExecutionContracts.cs)
  - [WorkflowExecutionsController.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Api/Controllers/WorkflowExecutionsController.cs)
- Updated the workflow builder and inbox/execution UI:
  - [workflow-definition.model.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/models/workflow-definition.model.ts)
  - [workflow-definition.service.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/services/workflow-definition.service.ts)
  - [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts)
  - [workflow-designer.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.html)
  - [properties-panel.component.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/components/properties-panel/properties-panel.component.ts)
  - [properties-panel.component.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/components/properties-panel/properties-panel.component.html)
  - [workflow-execution-viewer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-execution-viewer.page.ts)
  - [workflow-execution-viewer.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-execution-viewer.page.html)
  - [opportunity.model.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/opportunities/models/opportunity.model.ts)
  - [opportunity-approval.service.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/opportunities/services/opportunity-approval.service.ts)
  - [opportunity-approvals.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/opportunities/pages/opportunity-approvals.page.ts)
  - [opportunity-approvals.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/opportunities/pages/opportunity-approvals.page.html)
- Added the schema migration:
  - [20260308023703_AddWorkflowLifecycleAndDecisionLinks.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Infrastructure/Persistence/Migrations/20260308023703_AddWorkflowLifecycleAndDecisionLinks.cs)

**Verified result**
- Draft saves no longer change the runtime workflow used by approvals.
- Published workflows stamp publish metadata and can be unpublished or reverted back into draft.
- Approval steps can bind to a real tenant role id while still preserving the legacy role name for older saved JSON.
- Decision Inbox items created from approval workflows now expose workflow execution id, workflow name, step order, and deal context.
- Pending action rows can deep-link into `/app/workflows/executions` and focus the matching execution.
- Workflow execution status/history now show linked decision status.

**Verification commands**
```bash
dotnet build server/src/CRM.Enterprise.sln

dotnet ef database update \
  --project server/src/CRM.Enterprise.Infrastructure \
  --startup-project server/src/CRM.Enterprise.Api \
  --context CrmDbContext

cd client
npm run build -- --configuration development
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/smoke.spec.ts e2e/workflow-designer.spec.ts e2e/workflow-execution-viewer.spec.ts --workers=1
```

## 18) Workflow builder templates and controlled scope selectors

**Symptoms**
- Admins were still building approval workflows from a mostly blank canvas.
- Workflow scope fields (`module`, `pipeline`, `stage`, `trigger`) were still effectively free-form, which made bad saved configurations possible.
- The workflow-designer browser coverage was still asserting the old free-text panel behavior instead of the new select-based controls.

**Fix pattern**
1. Add built-in approval workflow templates for the main CRM approval cases.
2. Replace free-text scope editing with controlled PrimeNG selects for module, pipeline, stage, and trigger.
3. Tighten backend validation so published workflows reject unsupported scope values explicitly.
4. Update Playwright coverage to assert control values and the current API validation payload shape.

**Code changes**
- Added controlled scope options and reusable workflow templates in the workflow designer:
  - [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts)
- Replaced free-text scope inputs with select-based controls and added a template picker:
  - [workflow-designer.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.html)
  - [workflow-designer.page.scss](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.scss)
- Added backend validation for allowed workflow scope values on published definitions:
  - [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs)
- Updated browser coverage for template application and invalid controlled stage values:
  - [workflow-designer.spec.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/e2e/workflow-designer.spec.ts)

**Verified result**
- Admins can start from built-in templates:
  - `Deal Approval`
  - `Discount Approval`
  - `Large Deal Escalation`
  - `Stage Gate Exception`
- Workflow scope now uses controlled selectors instead of ad hoc text entry.
- Publishing with an invalid stage now returns a clear validation error instead of silently accepting unsupported values.
- The workflow-designer E2E coverage now matches the current select-based UI and backend error payload.

**Verification commands**
```bash
dotnet build server/src/CRM.Enterprise.sln

cd client
npm run build -- --configuration development
E2E_BASE_URL=http://localhost:4200 E2E_API_URL=http://localhost:5014 npx playwright test e2e/smoke.spec.ts e2e/workflow-designer.spec.ts e2e/workflow-execution-viewer.spec.ts --workers=1
```
