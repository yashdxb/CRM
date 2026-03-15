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
- **File:** `client/src/app/shared/quick-add-modal.component.ts`
- **Issue:** When switching quick-add entity type (e.g., from 'lead' to 'contact' or 'activity'), Angular throws `NG0100` because the two-way bound property changes during change detection. While the functionality works, this is a runtime error that appears in the browser console and could mask other issues.
- **Suggested fix:** Use `setTimeout()` or `afterNextRender()` to defer the entity type update, or use `signal`-based state to avoid expression change during the same CD cycle.
- **Status:** Open

---

## Priority 2 — High (Next Sprint)

### 3. Lead Duplicate Detection Fires on Every Update (PUT)
- **Module:** Leads
- **File:** Server-side duplicate detection middleware + `lead-form.page.ts` (`submitWithDuplicateGuard`)
- **Issue:** Duplicate detection runs on every PUT/update call, not just on initial creation. When editing an existing lead (e.g., changing status to Qualified), the user is shown a "Possible Duplicate Leads" dialog asking to "Save Anyway" — even though the lead already exists. This creates unnecessary clicks and confusion.
- **UX impact:** Extra confirmation dialog on every edit. A lead being edited should not match itself in duplicate detection.
- **Suggested fix:** Server should exclude the current record's ID from duplicate detection results when processing PUT requests. Alternatively, the client can suppress the dialog when the only match is the record being edited.

### 4. Lead Form Navigates Away After Update — No In-Place Convert Flow
- **Module:** Leads
- **File:** `lead-form.page.ts` → `performSave()` (line ~1375)
- **Issue:** After clicking "Update lead" in edit mode, `performSave()` unconditionally navigates to `/app/leads`. This prevents users from performing follow-up actions (like clicking "Convert Lead") without navigating back. The user must leave the leads list, re-open the lead, and then convert.
- **UX impact:** Extra navigation steps for the common workflow: qualify → save → convert.
- **Suggested fix:** After a successful edit, either (a) stay on the edit page with a success toast, or (b) provide a "Save & Convert" composite action when the lead is being changed to Qualified status.

### 5. Calendar Date Picker — Day Cells Detach from DOM During Navigation
- **Module:** Activities
- **File:** PrimeNG `p-datepicker` component
- **Issue:** When clicking a day cell in the calendar picker, the underlying DOM element is occasionally detached and re-rendered between the Playwright `locator.click()` resolution and the actual click event. This requires retry logic in automated tests. While not always visible to manual users (the browser handles it), it suggests the calendar re-renders unnecessarily when switching months or on focus changes.
- **UX impact:** Minor — may cause rare missed clicks for fast users.
- **Suggested fix:** Investigate if PrimeNG `p-datepicker` change detection can be optimized to avoid full re-render of day cells when the month hasn't changed.

---

## Priority 3 — Medium (Backlog)

### 6. Lead Status Stepper vs Dropdown Inconsistency
- **Module:** Leads
- **File:** `lead-form.page.html` / `lead-form.page.ts`
- **Issue:** In create mode, lead status is set via a `<p-select>` dropdown. In edit mode, the dropdown is hidden (`*ngIf="!showStatusStepper()"`) and replaced by a visual stepper ribbon. This design inconsistency means users familiar with the create flow cannot easily discover how to change status in the edit flow.
- **UX impact:** Moderate learning curve when transitioning from create to edit workflows.
- **Suggested fix:** Consider always showing the stepper (even in create mode) for consistency, or adding a tooltip/hint in edit mode explaining the stepper replaces the dropdown.

### 7. Opportunity Stage Validation — Silent Rejection Without Guidance
- **Module:** Opportunities
- **File:** Server-side stage validation
- **Issue:** When creating an opportunity, certain stages (e.g., "Qualification", "Proposal") require additional fields (like close date, amount, or contacts). If these are missing, the POST returns a 400 error but the error message may not clearly indicate which fields are needed for the chosen stage. During testing, switching to "Prospecting" stage resolved the issue because it has no extra requirements.
- **UX impact:** User frustration when form submission fails without clear field-level guidance.
- **Suggested fix:** Add inline validation hints that appear when a stage is selected, showing which additional fields become required. Pre-populate the stage to "Prospecting" as the default since it's the natural starting point.

### 8. Customer Duplicate Detection — No Merge Capability
- **Module:** Customers
- **File:** Customer create/edit flow
- **Issue:** When creating a customer with a similar name, the system shows a duplicate detection dialog with "Save Anyway". There is no option to merge with the existing record or view the potential duplicate before deciding.
- **UX impact:** Users must either abandon the creation and manually search for the duplicate, or create a duplicate and clean up later.
- **Suggested fix:** Add a "View Duplicate" link in the dialog that opens the matching record in a new tab, and consider a merge workflow for confirmed duplicates.

### 9. Qualification Factors — No Inline Help Text
- **Module:** Leads (CQVS Qualification)
- **File:** `lead-form.page.html` — qualification tab
- **Issue:** The 6 CQVS qualification factors (Budget, Timeline, Economic Buyer, Problem/Pain, Readiness, ICP Fit) use dropdown selects but provide no guidance on what constitutes "Confirmed", "Likely", "Unknown", or "Not Assessed" for each factor. Sales reps must rely on training to know the difference.
- **UX impact:** Inconsistent scoring across the sales team due to subjective interpretation.
- **Suggested fix:** Add `helpText` or tooltip for each factor explaining the criteria for each level (e.g., "Confirmed: Customer has explicitly stated budget amount in writing").

### 10. Lead Stepper Unlock Hints — Visible but Not Actionable
- **Module:** Leads
- **File:** `lead-form.page.html` — stepper section
- **Issue:** When a stepper step is locked (for non-admin users), the unlock hint text is displayed but the step cannot be clicked. The hint says what's needed (e.g., "Log a first-touch activity") but doesn't link to the relevant action.
- **UX impact:** Users know what's needed but must manually navigate to perform the action.
- **Suggested fix:** Make unlock hints actionable — e.g., "Log a first-touch activity" could be a clickable link that opens the activity creation form pre-filled for that lead.

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

### 13. Quick-Add Modal — Entity Type Defaults to Last Used
- **Module:** Cross-cutting (Quick Add)
- **Issue:** The quick-add modal remembers the last entity type used, which can confuse users who expect it to default to the context-appropriate type (e.g., opening quick-add from the contacts page should default to "contact").
- **Suggested fix:** Pass the current module context to the quick-add modal via the command palette activation.

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
| Source code fixes applied | 1 (NG01352 in opportunity-form) |
| Improvement items identified | 13 |
| Priority 1 (Critical) | 2 |
| Priority 2 (High) | 3 |
| Priority 3 (Medium) | 5 |
| Priority 4 (Low) | 3 |
