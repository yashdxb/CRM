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
