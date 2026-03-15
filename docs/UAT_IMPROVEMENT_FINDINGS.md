# UAT Improvement Findings

> **Generated from:** Comprehensive Playwright UAT Run (34 test cases, 7 modules)
> **Date:** July 2025
> **Prepared by:** QA Engineering
> **Approved by:** Robert Lambke

---

## Summary

During the comprehensive UAT execution of all CRM modules, the following improvement opportunities were identified. Items are prioritized by impact on user experience, data integrity, and developer productivity.

---

## Priority 1 — Critical (Fix Immediately)

### 1. NG01352 — Missing `name` Attributes on Opportunity Form Inputs
- **Module:** Opportunities
- **File:** `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`
- **Issue:** Four input elements were missing the required `name` attribute, causing Angular strict mode `NG01352` violations at runtime. This can lead to form auto-fill failures, accessibility gaps, and Angular form tracking issues.
- **Fields affected:** `opportunityName`, `amount`, `probability`, `expectedRevenue`
- **Status:** **FIXED** in this UAT cycle.

### 2. NG0100 — ExpressionChangedAfterItHasBeenChecked in QuickAddModalComponent
- **Module:** Contacts, Activities (Quick Add flows)
- **File:** `client/src/app/layout/quick-add/quick-add-modal.component.ts`, `client/src/app/layout/shell.component.ts`
- **Issue:** When switching quick-add entity type (e.g., from 'lead' to 'contact' or 'activity'), Angular throws `NG0100` because the two-way bound property changes during change detection. While the functionality works, this is a runtime error that appears in the browser console and could mask other issues.
- **Root cause:** Unused `initialType` model signal on the modal conflicted with `setTimeout`-deferred `open()` call in the shell.
- **Fix applied:** Removed unused `initialType` model and `[initialType]` binding. Replaced `setTimeout` with synchronous `open()` call (child property set before parent signal update). No more NG0100 in console.
- **Status:** **FIXED**

---

## Priority 2 — High (Next Sprint)

### 3. Lead Duplicate Detection Fires on Every Update (PUT)
- **Module:** Leads
- **File:** Server-side `LeadService.cs` + `lead-form.page.ts` (`submitWithDuplicateGuard`)
- **Issue:** Duplicate detection runs on every PUT/update call, not just on initial creation.
- **Investigation:** Server already excludes the current record's ID via `ExcludeLeadId` parameter in `CheckDuplicatesAsync` and `FindExactDuplicateLeadAsync`. Frontend already passes `excludeLeadId: isEdit ? this.editingId : undefined`. Self-exclusion was already implemented.
- **Status:** **Already fixed** — no changes needed.

### 4. Lead Form Navigates Away After Update — No In-Place Convert Flow
- **Module:** Leads
- **File:** `lead-form.page.ts` → `performSave()`
- **Issue:** After clicking "Update lead" in edit mode, `performSave()` unconditionally navigated to `/app/leads`. This prevented users from performing follow-up actions (like clicking "Convert Lead") without navigating back.
- **Fix applied:** Changed `performSave()` edit branch to call `reloadLeadDetails(this.editingId!)` instead of navigating away. User stays on the lead edit page with refreshed data after saving.
- **Status:** **FIXED**

### 5. Calendar Date Picker — Day Cells Detach from DOM During Navigation
- **Module:** Activities
- **File:** PrimeNG `p-datepicker` component
- **Issue:** When clicking a day cell in the calendar picker, the underlying DOM element is occasionally detached and re-rendered between the Playwright `locator.click()` resolution and the actual click event. This requires retry logic in automated tests. While not always visible to manual users (the browser handles it), it suggests the calendar re-renders unnecessarily when switching months or on focus changes.
- **UX impact:** Minor — may cause rare missed clicks for fast users.
- **Suggested fix:** Investigate if PrimeNG `p-datepicker` change detection can be optimized to avoid full re-render of day cells when the month hasn't changed.

---

## Priority 3 — Medium (Backlog)

### 6. Lead Status Stepper — Discoverability Hint
- **Module:** Leads
- **File:** `lead-form.page.html` / `lead-form.page.scss`
- **Issue:** In edit mode, the visual stepper ribbon replaces the dropdown but had no explanatory hint for users.
- **Fix applied:** Added italic hint text "Click an available step above to change status" below the stepper in edit mode. Styled with `lead-status-rail__hint` class.
- **Status:** **FIXED**

### 7. Opportunity Stage Validation — Silent Rejection Without Guidance
- **Module:** Opportunities
- **File:** `opportunity-form.page.ts` / `opportunity-form.page.html`
- **Issue:** When creating an opportunity, certain stages require additional fields but the user received no proactive guidance about what's needed.
- **Investigation:** Stage already defaults to "Prospecting" (no extra requirements). Server validation returns clear 400 errors.
- **Fix applied:** Added `stageRequirementHint()` computed method that shows inline help text listing required fields for each stage (e.g., "Qualification requires: amount, close date, pain summary..."). Hint appears below the stage selector.
- **Status:** **FIXED**

### 8. Customer Duplicate Detection — No Merge Capability
- **Module:** Customers
- **File:** Customer create/edit flow
- **Issue:** When creating a customer with a similar name, the system shows a duplicate detection dialog with "Save Anyway". There is no option to merge with the existing record or view the potential duplicate before deciding.
- **UX impact:** Users must either abandon the creation and manually search for the duplicate, or create a duplicate and clean up later.
- **Suggested fix:** Add a "View Duplicate" link in the dialog that opens the matching record in a new tab, and consider a merge workflow for confirmed duplicates.

### 9. Qualification Factors — Scoring Criteria Help Text
- **Module:** Leads (CQVS Qualification)
- **File:** `lead-form.page.html` — qualification tab
- **Issue:** The 5 CQVS qualification factors (Budget, Readiness, Timeline, Problem severity, Economic buyer) had field descriptions but no guidance on what "Confirmed", "Likely", or "Unknown" means for each factor.
- **Fix applied:** Enhanced all 5 qualification factor help texts with specific scoring criteria. Example: Budget now shows "Confirmed = budget stated in writing · Likely = verbal indication · Unknown = not yet discussed". Each factor has tailored definitions.
- **Status:** **FIXED**

### 10. Lead Stepper Unlock Hints — Now Actionable
- **Module:** Leads
- **File:** `lead-form.page.ts` / `lead-form.page.html`
- **Issue:** When a stepper step is locked, the hint text was visible but the step couldn't be clicked.
- **Fix applied:** Made locked stepper steps clickable. Clicking a locked step now navigates to the relevant tab (e.g., "Contacted" → Activity tab, "Qualified" → Qualification tab). Tooltip updated to include "(click to go there)" suffix for locked steps. Added `onLockedStepClick()` method.
- **Status:** **FIXED**

---

## Priority 4 — Low (Polish)

### 11. Settings Pages — Load Verification Only
- **Module:** Settings & Administration
- **Issue:** The 13 settings pages were tested for load and basic rendering only. No CRUD operations were tested on settings (workspace settings, roles, lead assignment rules, etc.) because these affect global tenant configuration.
- **Suggested action:** Create separate settings UAT test suite with tenant-isolated test data.

### 12. Activity List Page — No Inline Edit
- **Module:** Activities
- **Issue:** The activities list page shows all activities but requires navigating to a separate edit page to modify any record. Inline editing (especially for notes and outcomes) would reduce friction.
- **Suggested fix:** Add inline editing for key fields (notes, outcome) directly in the activities table.

### 13. Quick-Add Modal — Route-Aware Default Entity Type
- **Module:** Cross-cutting (Quick Add)
- **File:** `client/src/app/layout/shell.component.ts`
- **Issue:** The quick-add modal always defaulted to "lead" regardless of the current page context.
- **Fix applied:** Added `inferQuickAddType()` method that reads the current route URL: `/app/contacts` → 'contact', `/app/activities` → 'activity', default → 'lead'. When `openQuickAdd()` is called without an explicit type, it now uses the inferred type from the current route.
- **Status:** **FIXED**

---

## Test Infrastructure Notes

| Observation | Detail |
|-------------|--------|
| **RUN_ID strategy** | Each test run generates a unique `RUN_ID` (base-36 timestamp) appended to all test data names/emails to avoid cross-run interference |
| **API-direct creation** | Speed optimization: leads created via direct API POST before UI qualification, reducing test time from ~30s to ~14s per conversion test |
| **Duplicate dialog handling** | Robust `waitFor` + try/catch pattern avoids test flakiness from conditional dialogs |
| **Calendar date setting** | 3-retry loop pattern handles PrimeNG datepicker DOM detachment |
| **Qualification factors** | Uses `combobox` → `listbox` → `option` ARIA role chain for PrimeNG multiselect interactions |

---

## Metrics

| Metric | Value |
|--------|-------|
| Total test cases | 34 |
| Pass rate | 100% (34/34) |
| Total execution time | ~1.1 minutes |
| Modules covered | 7 (Dashboard, Customers, Contacts, Leads, Opportunities, Activities, Settings) |
| Source code fixes applied | 8 (NG01352, NG0100, stay-on-page, stepper hint, stage hints, qualification help, actionable steps, route-aware quick-add) |
| Improvement items identified | 13 |
| Items fixed | 8 (#1, #2, #4, #6, #7, #9, #10, #13) |
| Items already handled | 2 (#3, #7 default) |
| Items deferred | 3 (#5 PrimeNG internal, #8 merge feature, #11 settings tests, #12 inline edit) |
| Priority 1 (Critical) | 2 — all fixed |
| Priority 2 (High) | 3 — all resolved |
| Priority 3 (Medium) | 5 — 4 fixed, 1 deferred |
| Priority 4 (Low) | 3 — 1 fixed, 2 deferred |
