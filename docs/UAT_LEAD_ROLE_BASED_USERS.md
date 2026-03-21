# UAT - Leads Role-Based Workflow Pack (Leo Martin / Robert Lambke)

> Status: operational UAT pack, not canonical product policy.
> Source-of-truth references:
> - `client/src/app/crm/features/leads/pages/lead-form.page.ts`
> - `client/src/app/crm/features/leads/pages/leads.page.html`
> - `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`
> - `client/e2e/lead-sales-rep-uat.spec.ts`
> - `client/e2e/lead-sales-manager-uat.spec.ts`

## 1. Purpose

Replace guess-based lead UAT with a role-based pack that matches the current CRM behavior for:

- lead lifecycle progression
- activity-driven status gates
- qualification discipline
- nurture and re-engagement handling
- conversion readiness and manager-review logic
- loss, disqualification, and recycle-to-nurture reporting

This pack is written for the current product as implemented, not for an earlier generic CRM assumption set.

## 2. Roles Under Test

| Role | User | Email | Core responsibility in this UAT |
|---|---|---|---|
| Sales Rep | Leo Martin | `leo.martin@crmenterprise.demo` | Executes realistic lead progression, qualification, conversion, closure, and recycle actions. |
| Sales Manager | Robert Lambke | `yasser.ahamed@gmail.com` | Reviews team lead readiness, coaching signals, filters, Lead Coach drawer, and disposition reporting. |

## 3. Current Lead Model To Validate

### 3.1 Business statuses

The lead status set is:

- `New`
- `Contacted`
- `Nurture`
- `Qualified`
- `Converted`
- `Lost`
- `Disqualified`

### 3.2 Visual lifecycle model in the current UI

The lead form treats the lifecycle as:

- Main path: `New -> Contacted -> Qualified`
- Side branch: `Nurture`
- Outcome states: `Converted`, `Lost`, `Disqualified`

`Nurture` is intentionally not a forced linear step between `Contacted` and `Qualified`.

### 3.3 Real status-transition rules currently enforced

These are the real rules reflected in the current form logic and backend service:

- `New -> Nurture`
  - allowed
  - requires `Nurture follow-up date`
- `New -> Contacted`
  - blocked until a completed lead activity exists
- `Contacted -> Nurture`
  - allowed only with activity evidence
  - still requires `Nurture follow-up date`
- `Nurture -> Contacted`
  - blocked until a recent re-engagement activity exists
- `Contacted -> Qualified`
  - blocked until:
    - recent completed activity exists
    - at least 3 qualification factors are completed
    - qualification notes are entered
    - evidence threshold is met when the workspace policy requires it
- `Nurture -> Qualified`
  - blocked until:
    - recent re-engagement activity exists
    - at least 3 qualification factors are completed
    - qualification notes are entered
    - evidence threshold is met when the workspace policy requires it
- `Contacted -> New`
  - not allowed
- `Lost`
  - requires loss reason, competitor, and loss notes
- `Disqualified`
  - requires disqualification reason
- `Recycle to Nurture`
  - allowed only from `Lost` or `Disqualified`

### 3.4 Activity and SLA behavior to validate

- `Contacted` is activity-driven
- first-touch SLA appears in the lead header and `Next Lead Action`
- if status is `Nurture`, the next action area becomes nurture follow-up oriented
- if status is `Nurture` and there is no recent re-engagement activity, the primary CTA becomes `Log re-engagement`

### 3.5 Readiness model to validate

The product computes `Conversion Readiness` with these bands:

- `Ready`
- `Monitor`
- `Coach`
- `At Risk`

Readiness combines:

- qualification signal
- conversation signal when available
- weakest gap
- assumption count
- risk flags

Manager-review recommendation is expected when:

- assumptions are still high
- conversation momentum is weak
- or readiness score is below the safer threshold

## 4. User Interface Areas Covered

### 4.1 Lead form

Validate these UI areas in the current form:

- header status ribbon with knob, score, stepper, branch, and primary CTA
- status selector as alternate status control
- `Overview`
- `Activity & Follow-up`
- `Qualifications`
- `Supporting Documents`
- `History`
- `Convert Lead`
- closure dialogs for `Lost` and `Disqualified`

### 4.2 Lead list and manager workspace

Validate these manager-facing surfaces:

- lead list readiness filters:
  - `Manager review`
  - `At risk`
  - `Ready to convert`
  - `Coaching queue`
  - `Weak conversation`
  - `No signal`
  - `Engaged but incomplete`
- `Lead Coach` drawer
- disposition report API-backed reporting

## 5. Test Data Strategy

The earlier lead UAT drifted because it guessed scenarios from legacy or partial data. This replacement pack uses realistic named leads that match the current automated role-based specs and current rules.

### 5.1 Sales Rep dataset

| Scenario ID | Lead | Company | Why this lead exists |
|---|---|---|---|
| LEO-01 | Amelia Foster | Harbourline Advisory | Baseline `New` lead with no evidence. |
| LEO-02 | Julian Mercer | Silver Birch Realty | Proves `Contacted` is activity-driven and `Qualified` is factor-gated. |
| LEO-03 | Nadia Petrenko | Alderstone Holdings | Validates `New -> Nurture` with no first touch. |
| LEO-04 | Omar El-Sayed | Brookfield Tenant Advisory | Validates `Nurture -> Contacted` via re-engagement. |
| LEO-05 | Grace Holloway | North Point Capital | High-confidence lead that should convert cleanly. |
| LEO-06 | Lucia Ferrer | Bluehaven Estates | Medium lead that needs override reason before conversion. |
| LEO-07 | Owen Matthis | Westridge Logistics Park | Low-confidence lead that requires manager approval plus override. |
| LEO-08 | Farah Rahman | Lakeside Retail Partners | Validates `Disqualified`, `Lost`, and recycle-to-nurture rules. |

### 5.2 Sales Manager dataset

| Scenario ID | Lead | Company | Why this lead exists |
|---|---|---|---|
| ROBERT-01 | Alicia Warren | Granite Quay Realty | Strong motion but still `Manager review`. |
| ROBERT-02 | Ben Holzer | Harborline Asset Group | Minimal evidence, expected `At Risk`. |
| ROBERT-03 | Carla Mendes | Queen West Residential | Fully validated `Ready` lead. |
| ROBERT-04 | Darius Cole | Summit Lane Advisory | Disqualified reason reporting. |
| ROBERT-05 | Elena Petrov | Crescent Bridge Realty | Lost, then recycled to nurture for trend/reporting. |

## 6. Leo Martin UAT Pack

### LEO-01 Baseline unknown lead

**Intent**

Validate the minimum-confidence lead state.

**Seed data**

- Lead: `Amelia Foster`
- Company: `Harbourline Advisory`
- Status at save: `New`
- Activity evidence: none
- Qualification evidence: none

**User flow**

1. Sign in as Leo Martin.
2. Open `Leads`.
3. Create the lead with realistic contact details only.
4. Save without activities and without qualification factors.

**Expected result**

- lead remains `New`
- score remains low
- no contact-based progression is implied
- readiness should not look strong
- first-touch action remains pending

### LEO-02 Mid-funnel mixed-signal lead

**Intent**

Validate the actual gate logic for `New -> Contacted -> Qualified`.

**Seed data**

- Lead: `Julian Mercer`
- Company: `Silver Birch Realty`
- Source: `Referral`
- Activity: completed meeting
- Qualification profile:
  - budget: indicative range
  - readiness: actively evaluating
  - timeline: rough timeline
  - problem severity: recognized operational problem
  - economic buyer: identified, not engaged
  - ICP fit: strong

**User flow**

1. Create the lead in `New`.
2. Attempt to set `Contacted` before any completed activity.
3. Confirm the system blocks the change.
4. Log a completed lead activity.
5. Set the lead to `Contacted`.
6. Attempt `Qualified` with fewer than 3 factors.
7. Confirm the system blocks qualification.
8. Complete at least 3 factors and qualification notes.
9. Save as `Qualified`.

**Expected result**

- `Contacted` is blocked until completed activity exists
- `Qualified` is blocked until factor and note rules are met
- after valid evidence is present, progression succeeds
- lead lands in a medium-strength qualified state, not falsely `Ready`

### LEO-03 New lead parked in Nurture

**Intent**

Validate that a lead can be intentionally parked without first touch.

**Seed data**

- Lead: `Nadia Petrenko`
- Company: `Alderstone Holdings`
- Reasoning: still valid, not ready for active progression

**User flow**

1. Create the lead in `New`.
2. Set status to `Nurture`.
3. Enter a nurture follow-up date.
4. Save.

**Expected result**

- `New -> Nurture` is allowed
- nurture follow-up date is required
- header shows the lead as in nurture follow-up
- no fake `Contacted` state is inferred

### LEO-04 Re-engagement from Nurture

**Intent**

Validate that a nurtured lead cannot resume progression without fresh evidence.

**Seed data**

- Lead: `Omar El-Sayed`
- Company: `Brookfield Tenant Advisory`
- Current status: `Nurture`

**User flow**

1. Open the nurtured lead.
2. Attempt to move it to `Contacted`.
3. Confirm the form blocks progression and points the user to activity.
4. Use `Log re-engagement`.
5. Record a recent completed re-engagement activity.
6. Resume to `Contacted`.

**Expected result**

- `Nurture -> Contacted` is blocked until recent re-engagement exists
- primary CTA is `Log re-engagement` when evidence is missing
- after the recent activity is logged, `Contacted` becomes valid

### LEO-05 Strong verified lead

**Intent**

Validate the clean conversion happy path.

**Seed data**

- Lead: `Grace Holloway`
- Company: `North Point Capital`
- Qualification profile:
  - budget allocated and approved
  - ready to proceed pending final step
  - decision date confirmed
  - critical business impact
  - buyer engaged
  - strong ICP fit

**User flow**

1. Create the lead.
2. Add cadence evidence and a completed executive meeting.
3. Qualify the lead with complete strong evidence and notes.
4. Convert the lead into account, contact, and opportunity.

**Expected result**

- lead reaches `Qualified`
- readiness presents as strong
- manager review is not recommended
- conversion succeeds without override reason
- linked records are created and the lead ends in `Converted`

### LEO-06 Override-threshold lead

**Intent**

Validate the medium-strength conversion path that still needs a business override.

**Seed data**

- Lead: `Lucia Ferrer`
- Company: `Bluehaven Estates`
- Commercial posture: plausible, but evidence still incomplete

**User flow**

1. Create and qualify the lead with medium-strength evidence.
2. Attempt conversion without override reason.
3. Confirm conversion is blocked.
4. Retry with a valid override reason.

**Expected result**

- conversion is blocked until override reason is provided
- manager approval is not necessarily required here
- second attempt succeeds when override reason is present

### LEO-07 Manager-approval conversion

**Intent**

Validate the low-confidence conversion path that requires explicit managerial approval.

**Seed data**

- Lead: `Owen Matthis`
- Company: `Westridge Logistics Park`
- Commercial posture:
  - no defined budget
  - no defined timeline
  - weak buyer engagement
  - only partial fit

**User flow**

1. Create and qualify the lead with low-confidence evidence.
2. Attempt conversion with override reason but without manager approval.
3. Confirm conversion is blocked.
4. Retry with manager approval plus override reason.

**Expected result**

- first conversion attempt fails
- second attempt succeeds only when manager approval is supplied
- readiness remains visibly weak even though conversion can be forced through governed approval

### LEO-08 Closure and recycle

**Intent**

Validate closure enforcement and recoverability.

**Seed data**

- Lead: `Farah Rahman`
- Company: `Lakeside Retail Partners`

**User flow**

1. Attempt `Recycle to Nurture` from `New`.
2. Confirm recycle is blocked.
3. Attempt `Disqualified` without reason.
4. Confirm closure is blocked.
5. Disqualify with a valid reason.
6. Recycle to `Nurture`.
7. Attempt `Lost` without competitor and notes.
8. Confirm closure is blocked.
9. Mark `Lost` with reason, competitor, and notes.
10. Recycle again to `Nurture`.

**Expected result**

- recycle works only from `Lost` or `Disqualified`
- `Disqualified` always requires reason
- `Lost` always requires reason, competitor, and notes
- recycled lead lands in `Nurture` with a follow-up date

## 7. Robert Lambke UAT Pack

### ROBERT-01 Manager review queue

**Intent**

Validate that the manager can see strong motion that still needs review.

**Seed data**

- Lead: `Alicia Warren`
- Company: `Granite Quay Realty`
- Pattern:
  - strong activity
  - high business impact
  - good fit
  - budget still assumed
  - buyer not yet engaged

**User flow**

1. Sign in as Robert Lambke.
2. Open the lead list.
3. Use the `Manager review` filter.
4. Open Alicia Warren in the `Lead Coach` drawer.

**Expected result**

- Alicia appears in `Manager review`
- coach drawer shows `Conversion Readiness`
- manager-review warning is visible
- weakest gap points to the right commercial weakness, not generic text

### ROBERT-02 At-risk lead

**Intent**

Validate that weak or low-evidence leads appear in the manager risk queue.

**Seed data**

- Lead: `Ben Holzer`
- Company: `Harborline Asset Group`
- Pattern: new lead, little or no interaction evidence

**User flow**

1. Apply the `At risk` filter.
2. Search for `Ben Holzer`.
3. Open the coach drawer.

**Expected result**

- Ben appears in the filtered list
- readiness is `At Risk`
- coach drawer explains why the lead is weak instead of over-scoring it

### ROBERT-03 Ready-to-convert lead

**Intent**

Validate that the list isolates truly ready leads and does not recommend review when not needed.

**Seed data**

- Lead: `Carla Mendes`
- Company: `Queen West Residential`
- Pattern:
  - approved budget
  - committed timeline
  - critical business impact
  - executive sponsor and buyer engaged
  - strong fit

**User flow**

1. Apply `Ready to convert`.
2. Search for `Carla Mendes`.
3. Open the coach drawer.

**Expected result**

- Carla appears in the ready filter
- readiness displays `Ready`
- manager-review warning is absent
- CQVS summary and readiness reasons align with the strong evidence profile

### ROBERT-04 Disposition reporting

**Intent**

Validate that closed lead outcomes are aggregated in reporting.

**Seed data**

- Lead: `Darius Cole`
- Company: `Summit Lane Advisory`
- Status: `Disqualified`
- Required reason recorded

**User flow**

1. Request or open disposition reporting.
2. Inspect disqualification reason distribution.

**Expected result**

- disqualification totals include the test lead
- the recorded disqualification reason is included in rollups

### ROBERT-05 Lost and recycled trend

**Intent**

Validate that loss and recovery appear in reporting, not only in the individual lead.

**Seed data**

- Lead: `Elena Petrov`
- Company: `Crescent Bridge Realty`
- Path:
  - marked `Lost`
  - then recycled to `Nurture`

**User flow**

1. Inspect disposition totals and trend.
2. Confirm nurture totals and recycled trend.
3. Confirm loss reason distribution includes the recorded loss reason.

**Expected result**

- nurture totals include recycled leads
- recycle trend increments
- loss reason remains reportable after recycle

## 8. Expected UI Guidance and Operator Cues

These are the current cues that the tester should verify as part of the UAT:

- `Log first activity` when a new lead cannot yet become `Contacted`
- `Log re-engagement` when a nurtured lead cannot yet resume
- `First touch due` when first-touch SLA is pending
- `Nurture follow-up date` when lead is in nurture
- readiness summary and primary gap in `Qualifications`
- manager-review cue in `Lead Coach`

## 9. Pass Criteria

The role-based lead UAT passes only if all of the following are true:

- status progression follows the actual enforced rules
- no UI path can bypass activity-driven `Contacted`
- `Qualified` always requires factor coverage and notes
- nurture requires follow-up date
- recycle-to-nurture only works from valid end states
- medium and low conversion paths enforce override and approval rules correctly
- manager filters return the correct lead archetypes
- `Lead Coach` explains readiness, weakest gap, CQVS summary, and review need correctly
- disposition reporting includes:
  - disqualification totals
  - nurture totals
  - loss reasons
  - disqualification reasons
  - recycle trend

## 10. Fail Conditions

This pack fails if any of the following occur:

- `Contacted` is reachable without completed activity evidence
- a nurtured lead can resume without re-engagement evidence
- a qualified lead can be saved without notes or without the minimum factor count
- `Lost` or `Disqualified` can be saved without required outcome details
- recycle is allowed from an invalid status
- manager-review and ready-to-convert filters return the wrong leads
- the coach drawer contradicts the lead’s real readiness state
- reporting drops loss or recycle meaning after status changes

## 11. Final Verdict On This Replacement Pack

This UAT is intentionally narrower and more realistic than the old guessed pack.

It is built around:

- the actual lead lifecycle model
- current UI labels and screens
- current backend enforcement
- current readiness logic
- current Leo and Robert test personas already used by the system

That makes it suitable as the new source document for the role-based Leads UAT PDF.
