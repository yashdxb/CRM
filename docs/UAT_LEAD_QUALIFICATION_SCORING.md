# UAT — Lead Qualification, Scoring & CQVS Comprehensive Test Scenarios

> **Spec file:** `client/e2e/lead-qualification-scoring-uat.spec.ts`
> **Last updated:** 2025-07
> **Last run:** 78/78 passed (3.9m)

---

## Scoring Formula (Backend — LeadService.cs)

The backend uses **two mutually exclusive scoring paths**:

### Path 1: Qualification Score (when ≥ 1 meaningful qualification factor)
```
score = Sum of all 6 factor scores (clamped 0–100)
```
Data fields (email, phone, company, etc.) are **completely ignored** in this path.

### Path 2: Data Completeness Score (when 0 meaningful factors)
```
score = 20 (base) + email(+20) + phone(+15) + companyName(+10) + jobTitle(+10) + source(+10) + territory(+5) + accountId(+5) + contactId(+5)
```
Max = 100. Special rule: if score = 20 and a prior score > 0 exists, the prior score is preserved.

### Meaningful Factor Definition
A factor is "meaningful" if it is non-null, non-whitespace, and does NOT contain "unknown" (case-insensitive).

### Factor Score Table

| Factor | Value | Score | Max |
|--------|-------|-------|-----|
| **Budget** | Budget allocated and approved | 25 | 25 |
| | Budget identified but unapproved | 15 | |
| | Indicative range mentioned | 15 | |
| | No defined budget | 5 | |
| | Budget explicitly unavailable | 0 | |
| **Readiness** | Internal decision in progress | 20 | 20 |
| | Ready to proceed pending final step | 20 | |
| | Actively evaluating solutions | 15 | |
| | Interest expressed, no urgency | 8 | |
| | Not planning to spend | 0 | |
| **Timeline** | Decision date confirmed internally | 15 | 15 |
| | Target date verbally confirmed | 12 | |
| | Rough timeline mentioned | 6 | |
| | Date missed / repeatedly pushed | 0 | |
| | No defined timeline | 0 | |
| **Problem** | Executive-level priority | 20 | 20 |
| | Critical business impact | 15 | |
| | Recognized operational problem | 8 | |
| | Mild inconvenience | 2 | |
| | Problem acknowledged but deprioritized | 0 | |
| **Economic Buyer** | Buyer engaged in discussion | 10 | 10 |
| | Buyer verbally supportive | 10 | |
| | Buyer identified, not engaged | 5 | |
| | Influencer identified | 5 | |
| | Buyer explicitly not involved | 0 | |
| **ICP Fit** | Strong ICP fit | 10 | 10 |
| | Partial ICP fit | 5 | |
| | Out-of-profile but exploratory | 5 | |
| | Clearly out of ICP | 0 | |

**Maximum qualification score:** 25 + 20 + 15 + 20 + 10 + 10 = **100**

---

## CQVS Groups

| Code | Name | Weight | Factors |
|------|------|--------|---------|
| **C** | Company Fit | 10 | ICP Fit |
| **Q** | Qualification Readiness | 60 | Budget, Readiness, Timeline |
| **V** | Value / Problem | 20 | Problem Severity |
| **S** | Stakeholder Access | 10 | Economic Buyer |

---

## Score Tiers

| Tier | Score Range | Badge Tone | Confidence |
|------|-----------|------------|------------|
| **High** | ≥ 70 | `high` (green) | ≥ 75% → "High" |
| **Medium** | 45–69 | `medium` (amber) | 45–74% → "Medium" |
| **Low** | 0–44 | `low` (red) | < 45% → "Low" |

---

## Test Scenarios

### Category 1: Score Variations via API

Tests create leads via API with specific data quality + qualification factor combinations, then verify the computed score via GET.

| # | Scenario | Data Fields | Qualification Factors | Expected Score | Path | Badge |
|---|----------|------------|----------------------|----------------|------|-------|
| 1.1 | **Perfect score (100)** | All 6 filled | All 6 at max | 100 | Path 1 (qual) | high |
| 1.2 | **Zero score – empty lead** | None | None | 20 | Path 2 (base only) | low |
| 1.3 | **Data-only (no qualification)** | All 6 filled | None set | 90 | Path 2 (20+20+15+10+10+10+5) | high |
| 1.4 | **Qualification-only (no data)** | Only name | All 6 at max | 100 | Path 1 (qual) | high |
| 1.5 | **High score – max factors, partial data** | name + email + phone | All 6 at max | 100 | Path 1 (qual) | high |
| 1.6 | **Medium score – mid factors, all data** | All 6 filled | mid values | 54 | Path 1 (15+15+6+8+5+5) | medium |
| 1.7 | **Low score – minimal factors, partial data** | name + email | all at minimum | 7 | Path 1 (5+0+0+2+0+0) | low |
| 1.8 | **Boundary: score ≥ 70** | All 6 filled | Budget=25, Readiness=20, Timeline=15, Problem=15 | ≥ 70 | Path 1 | high |
| 1.9 | **Boundary: score 45–69** | name + email + company | mid values (47 total) | 45–69 | Path 1 | medium |
| 1.10 | **Boundary: score < 45** | name + email | selected values (36 total) | < 45 | Path 1 | low |

### Category 2: CQVS Group Variations

Each scenario targets making one CQVS group strong and others weak (or vice versa).

| # | Scenario | C (ICP) | Q (Budget+Readiness+Timeline) | V (Problem) | S (EconBuyer) | Expected Score | Path | Weakest |
|---|----------|---------|-------------------------------|-------------|---------------|----------------|------|---------|
| 2.1 | **Strong Q, weak rest** | 0 (unknown) | 25+20+15=60 | 0 (unknown) | 0 (unknown) | 60 | Path 1 | C, V, S |
| 2.2 | **Strong V, weak rest** | 0 | 0+0+0=0 | 20 (executive) | 0 | 20 | Path 1 | Q |
| 2.3 | **Strong C+S, weak Q+V** | 10 (strong) | 5+0+0=5 | 2 (mild) | 10 (engaged) | 27 | Path 1 | Q |
| 2.4 | **All groups balanced mid** | 5 (partial) | 15+15+6=36 | 8 (recognized) | 5 (identified) | 54 | Path 1 | — |
| 2.5 | **All groups at max** | 10 | 25+20+15=60 | 20 | 10 | 100 | Path 1 | — |
| 2.6 | **All groups unknown** | 0 | 0+0+0=0 | 0 | 0 | 90 | Path 2 (all data) | all |

### Category 3: Qualification Factor Variations (Individual)

Each test varies ONE factor through all its values while keeping others constant at max.

#### 3.1 Budget Availability (max 25)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Budget allocated and approved | 25 | 100 |
| Budget identified but unapproved | 15 | 90 |
| Indicative range mentioned | 15 | 90 |
| No defined budget | 5 | 80 |
| Budget explicitly unavailable | 0 | 75 |
| Unknown / not yet discussed | 0 | 75 |

#### 3.2 Readiness to Spend (max 20)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Internal decision in progress | 20 | 100 |
| Ready to proceed pending final step | 20 | 100 |
| Actively evaluating solutions | 15 | 95 |
| Interest expressed, no urgency | 8 | 88 |
| Not planning to spend | 0 | 80 |
| Unknown / unclear | 0 | 80 |

#### 3.3 Buying Timeline (max 15)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Decision date confirmed internally | 15 | 100 |
| Target date verbally confirmed | 12 | 97 |
| Rough timeline mentioned | 6 | 91 |
| Date missed / repeatedly pushed | 0 | 85 |
| No defined timeline | 0 | 85 |
| Unknown / not discussed | 0 | 85 |

#### 3.4 Problem Severity (max 20)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Executive-level priority | 20 | 100 |
| Critical business impact | 15 | 95 |
| Recognized operational problem | 8 | 88 |
| Mild inconvenience | 2 | 82 |
| Problem acknowledged but deprioritized | 0 | 80 |
| Unknown / not validated | 0 | 80 |

#### 3.5 Economic Buyer (max 10)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Buyer engaged in discussion | 10 | 100 |
| Buyer verbally supportive | 10 | 100 |
| Buyer identified, not engaged | 5 | 95 |
| Influencer identified | 5 | 95 |
| Buyer explicitly not involved | 0 | 90 |
| Unknown / not identified | 0 | 90 |

#### 3.6 ICP Fit (max 10)

| Value | Score | QS (others at max) |
|-------|-------|---------------------|
| Strong ICP fit | 10 | 100 |
| Partial ICP fit | 5 | 95 |
| Out-of-profile but exploratory | 5 | 95 |
| Clearly out of ICP | 0 | 90 |
| Unknown / not assessed | 0 | 90 |

### Category 4: Status Transition Rules

| # | Scenario | From | To | Expected | Gate |
|---|----------|------|----|----------|------|
| 4.1 | New → Contacted | New | Contacted | ✅ (requires firstTouch activity) | Activity-driven |
| 4.2 | New → Nurture | New | Nurture | ✅ (requires nurtureFollowUpAtUtc) | Outcome |
| 4.3 | New → Qualified | New | Qualified | ✅ (requires ≥3 factors + notes + meeting) | Qualification gate |
| 4.4 | New → Lost | New | Lost | ✅ (requires lossReason, lossCompetitor, lossNotes) | Outcome |
| 4.5 | New → Disqualified | New | Disqualified | ✅ (requires disqualifiedReason) | Outcome |
| 4.6 | New → Converted | New | Converted | ❌ BLOCKED | Must be Qualified first |
| 4.7 | Contacted → Nurture | Contacted | Nurture | ✅ | Outcome |
| 4.8 | Contacted → Qualified | Contacted | Qualified | ✅ | Qualification gate |
| 4.9 | Contacted → New | Contacted | New | ❌ BLOCKED | No revert |
| 4.10 | Qualified → Converted | Qualified | Converted | ✅ | Conversion |
| 4.11 | Converted → Any | Converted | * | ❌ BLOCKED | Terminal |
| 4.12 | Lost → Contacted (recycle) | Lost | Contacted | ✅ (requires firstTouch) | Activity-driven |
| 4.13 | Disqualified → Nurture (recycle) | Disqualified | Nurture | ✅ | Outcome |

### Category 5: Qualification Gate Enforcement

| # | Scenario | Factors Set | Notes | Expected |
|---|----------|------------|-------|----------|
| 5.1 | 0 factors → Qualified | None meaningful | Yes | ❌ Blocked – "At least 3 qualification factors" |
| 5.2 | 2 factors → Qualified | Budget + Readiness only | Yes | ❌ Blocked – "At least 3 qualification factors" |
| 5.3 | 3 factors → Qualified (minimum) | Budget + Readiness + Timeline | Yes | ✅ Allowed (with meeting) |
| 5.4 | 6 factors → Qualified (all) | All 6 meaningful | Yes | ✅ Allowed (with meeting) |
| 5.5 | 3 factors + no notes → Qualified | Budget + Readiness + Timeline | No | ❌ Blocked – "Qualification notes required" |
| 5.6 | "Unknown" values don't count | Budget=unknown, Readiness=unknown, Timeline=unknown + 2 real | Yes | ❌ Blocked – only 2 meaningful |
| 5.7 | Meeting gate | 3+ factors + notes, no meeting | Yes | ❌ Blocked – "Book or log a discovery meeting" |

### Category 6: `isMeaningfulQualificationValue()` Edge Cases

Each test sets `budgetAvailability` to the input value with all data fields filled, then checks the computed score.

| # | Input | Meaningful? | Expected Score | Path | Reason |
|---|-------|-------------|----------------|------|--------|
| 6.1 | `null` | No | 90 | Path 2 | Null → not meaningful → data completeness |
| 6.2 | `""` (empty) | No | 90 | Path 2 | Empty → not meaningful → data completeness |
| 6.3 | `"Unknown / not yet discussed"` | No | 90 | Path 2 | Contains "unknown" → not meaningful |
| 6.4 | `"Unknown / unclear"` | No | 90 | Path 2 | Contains "unknown" → not meaningful |
| 6.5 | `"Budget allocated and approved"` | Yes | 25 | Path 1 | Meaningful → qual score = budget(25) |
| 6.6 | `"No defined budget"` | Yes | 5 | Path 1 | Meaningful (no "unknown") → qual score = budget(5) |

### Category 7: Outcome Field Enforcement

| # | Status | Missing Field | Expected Error |
|---|--------|--------------|----------------|
| 7.1 | Disqualified | disqualifiedReason | "Disqualified reason is required" |
| 7.2 | Lost | lossReason | "Loss reason is required" |
| 7.3 | Lost | lossCompetitor | "Competitor is required" |
| 7.4 | Lost | lossNotes | "Loss notes are required" |
| 7.5 | Nurture | nurtureFollowUpAtUtc | "Nurture follow-up date is required" |

### Category 8: Confidence & Conversion Readiness Display

| # | Scenario | Qual Score | Expected Confidence Badge |
|---|----------|-----------|--------------------------|
| 8.1 | High confidence | ≥ 75 | "High" |
| 8.2 | Medium confidence | 45–74 | "Medium" |
| 8.3 | Low confidence | < 45 | "Low" |

### Category 9: Data Quality (Path 2 Score)

No qualification factors set → Path 2 data completeness scoring.

| # | Data Fields Present | Expected Score | Breakdown |
|---|--------------------|-----------------------------------------|-----------|
| 9.1 | email + phone + company + job + source + territory | 90 | 20+20+15+10+10+10+5 |
| 9.2 | email + phone | 55 | 20+20+15 |
| 9.3 | email only | 40 | 20+20 |
| 9.4 | name only (no bonus fields) | 20 | base 20 only |

### Category 10: End-to-End Lifecycle Flows

| # | Scenario | Flow |
|---|----------|------|
| 10.1 | **Full happy path** | New → (activity) → Contacted → (qualify) → Qualified → Converted |
| 10.2 | **Nurture path** | New → Nurture (set follow-up) → Contacted → Qualified |
| 10.3 | **Disqualify & recycle** | New → Disqualified → Nurture (recycle) → Contacted → Qualified |
| 10.4 | **Lost & recycle** | New → Lost → Contacted (recycle, needs activity) |

---

## Implementation Notes

- **API-based tests** (Categories 1–7): Create leads via `POST /api/leads`, update via `PUT /api/leads/{id}`, verify score via `GET /api/leads/{id}`
- **UI-based tests** (Categories 8, 10): Navigate lead form, verify badge display, status transitions
- **Unit-like tests** (Category 6): `isMeaningfulQualificationValue()` tested via API score computation
- Score computation is deterministic — same inputs always produce the same score
- Backend scoring (`LeadService.cs`) uses a two-path model that differs from the frontend formula (`lead-scoring.util.ts`)
- Frontend formula (`BDQ×0.3 + QS×0.7`) is for display/preview only; the API's computed score is the source of truth
- Tests validate against the backend-computed score, not the frontend preview
