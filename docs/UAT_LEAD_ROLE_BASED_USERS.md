# UAT — Lead Workflow Signals and Outcomes (Leo Martin / Robert Lambke)

> Purpose: validate the lead engine using realistic role-based scenarios, not only CRUD steps.
> Environment: local CRM
> Scope: CRM Leads only
> Roles under test:
> - Sales Rep: Leo Martin (`yasser0503@outlook.com`)
> - Sales Manager: Robert Lambke (`yasser.ahamed@gmail.com`)

## 1. UAT Objective

Validate that the CRM produces the correct signal, trigger, score, and lifecycle outcome for realistic lead situations.

The UAT is built around:
- qualification signals
- conversation signals
- conversion-readiness output
- negative-path disposition
- recycle-to-nurture recovery

This document treats `Leads` as an operational decision engine:

`Input -> Signal -> Decision -> Trigger -> Outcome`

## 2. Primary Role Under Test Now

The immediate runnable UAT pack is for:
- Sales Rep: Leo Martin

Manager validation remains relevant, but the first automation pack focuses on Leo’s execution path only.

## 3. Scenario Matrix

This pack does not attempt every mathematical permutation of CQVS factors. That would be wasteful and hard to maintain.

Instead, it covers the practical core matrix for UAT:
- positive conversion path
- high conversation / weak qualification mismatch
- stale engagement after qualification
- no-signal / insufficient-evidence state
- budget-gap despite active buyer engagement
- poor ICP fit despite conversation activity
- explicit lost / disqualified / nurture lifecycle outcomes

That gives broad coverage of the operational lead engine without collapsing into synthetic combinatorics.

| Scenario ID | Lead | Company | Main Intent | Expected Signal | Expected Outcome |
|---|---|---|---|---|---|
| LEO-01 | Nora Patel | North Shore Capital | Strong engagement + qualified buyer | High conversation, qualified, monitor conversion readiness | Conversion allowed with documented override |
| LEO-02 | Marcus Chen | Parkline Estates | Strong engagement but missing qualification proof | High conversation, weak qualification | Coaching guidance, not ready to convert |
| LEO-03 | Alina Dobrev | Meridian Urban Partners | Qualified lead with stale conversation | Low conversation, aging engagement | Risk/stall signal and weak readiness |
| LEO-04 | Priya Khanna | Cedar Grove Advisors | Wrong-fit / no-budget lead | Disqualification reason captured | Lead moved to Disqualified |
| LEO-05 | Omar El-Sayed | Brookfield Tenant Advisory | Lost/disqualified lead returned to nurture | Recycle trigger with preserved reason | Lead moved to Nurture with follow-up path |
| LEO-06 | Sofia Marin | Sterling Harbour Realty | Fully validated buyer-ready lead | High conversation, strong CQVS proof, low assumption count | Readiness = Ready without manager-review warning |
| LEO-07 | Ethan Ross | Harbor Eight Holdings | New lead with almost no usable signal | Low outbound-only conversation, CQVS mostly unknown | At-risk / insufficient evidence state |
| LEO-08 | Daniela Rios | Crestlane Property Group | Buyer engaged but budget blocked | Strong conversation, budget remains weakest signal | Manager review recommended; budget gap explicit |
| LEO-09 | Victor Petrescu | Westline Tenant Partners | Active engagement but poor ICP fit | Mixed conversation with weak fit risk flag | Coach or At Risk with ICP-fit weakness visible |
| LEO-10 | Samira Haddad | Elm Ridge Advisory | Lead lost to a competitor | Explicit loss reason on end-state lead | Lost status recorded with reporting-safe reason |

## 4. Shared Role Setup

| Role | Full Name | Email | Expected Access |
|---|---|---|---|
| Sales Rep | Leo Martin | `yasser0503@outlook.com` | Can create, update, qualify, recycle, and convert owned leads. |
| Sales Manager | Robert Lambke | `yasser.ahamed@gmail.com` | Can review coaching, readiness, and disposition reporting. |

## 5. Leo Martin UAT — Realistic Scenario Pack

### LEO-01 Strong engagement with qualified buyer
**Goal**
Validate the positive path from realistic discovery to conversion.

**Lead data**
- Lead: `Nora Patel`
- Company: `North Shore Capital`
- Email: `nora.patel@northshorecapital.ca`
- Title: `Operations Director`
- Source: `Website`

**Realistic activity evidence**
- Outbound follow-up email summarizing evaluation path
- Discovery call confirming budget range and finance stakeholder
- Discovery meeting with `Daniel Shah`, Finance Director
- Commercial next-step task

**Qualification evidence**
- Budget availability: `Indicative range mentioned`
- Readiness to spend: `Actively evaluating solutions`
- Buying timeline: `Rough timeline mentioned`
- Problem severity: `Recognized operational problem`
- Economic buyer: `Buyer identified, not engaged`
- ICP fit: `Strong ICP fit`

**Expected signals**
- Conversation score: high
- Lead status can reach `Qualified`
- Conversion readiness: `Monitor` or better
- Primary gap remains visible if some evidence is still assumed

**Trigger**
- Rep chooses to convert

**Expected outcome**
- Conversion allowed with override reason if score is below threshold
- Account, Contact, and Opportunity are created

### LEO-02 Strong engagement but weak qualification proof
**Goal**
Validate that good conversation alone does not make a lead conversion-ready.

**Lead data**
- Lead: `Marcus Chen`
- Company: `Parkline Estates`
- Email: `marcus.chen@parklineestates.ca`
- Title: `Director of Leasing Operations`
- Source: `Referral`

**Realistic activity evidence**
- Recent discovery call
- Recent planning meeting
- Follow-up email with requested next steps

**Qualification posture**
- Minimal or incomplete factor evidence
- No qualified status transition attempted

**Expected signals**
- Conversation score: high or medium-high
- Qualification remains weaker than conversation
- Conversion readiness: `Coach` or `At Risk`
- Missing evidence should be explicit

**Trigger**
- Rep reviews the qualification summary after conversation activity

**Expected outcome**
- System recommends next evidence
- Lead appears as coachable, not conversion-ready

### LEO-03 Qualified lead with stale engagement
**Goal**
Validate aging/stall detection.

**Lead data**
- Lead: `Alina Dobrev`
- Company: `Meridian Urban Partners`
- Email: `alina.dobrev@meridianurban.ca`
- Title: `Investment Operations Manager`
- Source: `Industry Event`

**Realistic activity evidence**
- Discovery meeting logged more than 21 days ago
- No recent reply signal
- No recent activity in the last 14 days

**Qualification posture**
- Lead reaches `Qualified`
- Quality evidence exists, but recency is weak

**Expected signals**
- Conversation score: low
- Reasons include stalled or aging engagement
- Conversion readiness: low enough to warn the rep

**Trigger**
- Rep opens the lead after inactivity

**Expected outcome**
- Stale engagement warning appears
- Conversion should not look confidently ready

### LEO-04 Disqualified lead with explicit reason
**Goal**
Validate the negative path and configured reason capture.

**Lead data**
- Lead: `Priya Khanna`
- Company: `Cedar Grove Advisors`
- Email: `priya.khanna@cedargroveadvisors.ca`
- Title: `Office Operations Lead`
- Source: `Inbound Call`

**Disposition reason**
- use a configured disqualification reason from workspace settings

**Expected signals**
- Lead cannot remain ambiguous after disqualification
- Reason must be visible

**Trigger**
- Rep sets status to `Disqualified`

**Expected outcome**
- Disqualification succeeds only with reason
- Disposition reporting should later include the reason

### LEO-05 Recycle to nurture after disposition
**Goal**
Validate lifecycle recovery instead of dead-end loss.

**Lead data**
- Lead: `Omar El-Sayed`
- Company: `Brookfield Tenant Advisory`
- Email: `omar.elsayed@brookfieldtenant.ca`
- Title: `Tenant Strategy Consultant`
- Source: `Partner Referral`

**Initial posture**
- Lead is moved to `Disqualified` or `Lost` with reason

**Expected signals**
- Prior disposition remains meaningful
- recycle is available only from valid end states

**Trigger**
- Rep activates `Recycle to nurture`

**Expected outcome**
- Lead moves to `Nurture`
- follow-up path is created
- disposition context remains visible

### LEO-06 Fully validated buyer-ready lead
**Goal**
Validate the strongest positive CQVS state without relying on a conversion override.

**Lead data**
- Lead: `Sofia Marin`
- Company: `Sterling Harbour Realty`
- Email: `sofia.marin@sterlingharbourrealty.ca`
- Title: `Director of Brokerage Operations`
- Source: `Executive Referral`

**Activity evidence**
- recent two-way email activity
- recent discovery call
- recent meeting with buyer stakeholder

**CQVS posture**
- Budget availability: `Budget allocated and approved`
- Readiness to spend: `Ready to proceed pending final step`
- Buying timeline: `Decision date confirmed internally`
- Problem severity: `Critical business impact`
- Economic buyer: `Buyer engaged in discussion`
- ICP fit: `Strong ICP fit`

**Expected signals**
- Conversation score: high
- Conversion readiness: `Ready`
- Manager review should not be recommended

### LEO-07 Minimal-signal / insufficient-evidence lead
**Goal**
Validate the system’s ability to report lack of signal instead of inventing confidence.

**Lead data**
- Lead: `Ethan Ross`
- Company: `Harbor Eight Holdings`
- Email: `ethan.ross@harboreightholdings.ca`
- Title: `Analyst`
- Source: `Web Form`

**Activity evidence**
- none beyond initial creation

**CQVS posture**
- mostly default / unknown

**Expected signals**
- Conversation score remains low and outbound-only
- Readiness should be `At Risk` or clearly low-confidence
- Primary gap should point to budget or qualification evidence

### LEO-08 Buyer engaged but budget blocked
**Goal**
Validate a mixed-signal case where buyer engagement is real but commercial readiness is weak.

**Lead data**
- Lead: `Daniela Rios`
- Company: `Crestlane Property Group`
- Email: `daniela.rios@crestlaneproperty.ca`
- Title: `Regional Operations Lead`
- Source: `Partner Introduction`

**Activity evidence**
- recent discovery call
- recent working session with budget holder copied

**CQVS posture**
- Budget availability: `Budget explicitly unavailable`
- Readiness to spend: `Actively evaluating solutions`
- Buying timeline: `Target date verbally confirmed`
- Problem severity: `High business impact`
- Economic buyer: `Buyer engaged in discussion`
- ICP fit: `Strong ICP fit`

**Expected signals**
- Conversation score: medium-high or high
- Primary gap: `Budget availability`
- Manager review should be recommended

### LEO-09 Active engagement but weak ICP fit
**Goal**
Validate that engagement does not hide poor strategic fit.

**Lead data**
- Lead: `Victor Petrescu`
- Company: `Westline Tenant Partners`
- Email: `victor.petrescu@westlinetenant.ca`
- Title: `Portfolio Analyst`
- Source: `Outbound Prospecting`

**Activity evidence**
- discovery call
- email follow-up

**CQVS posture**
- ICP fit: `Clearly out of ICP`
- other factors may be partially positive

**Expected signals**
- Readiness remains constrained
- risk or weakness should surface around ICP fit

### LEO-10 Lost lead with explicit reason
**Goal**
Validate the `Lost` path separately from `Disqualified`.

**Lead data**
- Lead: `Samira Haddad`
- Company: `Elm Ridge Advisory`
- Email: `samira.haddad@elmridgeadvisory.ca`
- Title: `Transactions Coordinator`
- Source: `Industry Event`

**Disposition**
- Status: `Lost`
- Reason: realistic competitive loss
- Competitor and loss notes recorded

**Expected signals**
- lost path is explicit
- loss reason persists on the lead
- later disposition reporting can group it correctly

## 6. Signal / Trigger / Outcome Validation Table

| Area | Trigger | Expected Signal | Expected Outcome |
|---|---|---|---|
| Qualification | Rep records factor evidence | Qualification score and confidence update | Lead reflects stronger evidence or missing proof |
| Conversation | Email/call/meeting activity is linked | Conversation score changes with reasons | Momentum, stall, or bidirectional engagement is visible |
| Readiness | Qualification + conversation are evaluated together | Ready / Monitor / Coach / At Risk | Rep sees a practical decision layer before conversion |
| Conversion | Rep clicks convert | Policy decision is enforced | Convert or block with exact explanation |
| Disposition | Rep marks Lost or Disqualified | Reason becomes part of lead state | Reporting and lifecycle history stay coherent |
| Recycle | Rep chooses recycle-to-nurture | Lifecycle changes to Nurture | Follow-up path is preserved instead of losing the lead |
| CQVS mismatch | Rep captures a mixed factor state | Weakest factor becomes explicit | Coaching / manager review points to the correct gap |
| Minimal-signal state | Lead has little usable interaction evidence | Signal stays low and outbound-only | System avoids false confidence |

## 7. Pass Criteria for Leo Martin UAT

The Leo-only UAT passes when:
- Leo can create multiple realistic leads without admin intervention
- the CRM differentiates between strong, weak, stale, and disposed lead states
- conversation scoring is driven by real interaction evidence
- qualification and readiness do not collapse into the same output
- at least one lead converts successfully through the governed path
- at least one lead reaches `Ready`
- at least one lead remains `At Risk` because of missing evidence
- at least one lead shows strong conversation but weak CQVS proof
- at least one lead shows buyer engagement but budget weakness
- at least one lead shows weak ICP fit despite some engagement
- at least one lead is disqualified with a real reason
- at least one lead is lost with a real reason
- at least one disposed lead is recycled to nurture

## 8. Robert Lambke Manager UAT

### Manager objective
Validate that a Sales Manager can interpret and act on the lead engine output across the team, not only within one lead record.

### Manager scenarios

| Scenario ID | Lead | Company | Manager focus | Expected output |
|---|---|---|---|---|
| ROBERT-01 | Alicia Warren | Granite Quay Realty | Strong motion but weak commercial proof | `Manager review` queue includes the lead and the coach drawer explains the primary gap |
| ROBERT-02 | Ben Holzer | Harborline Asset Group | Minimal interaction evidence | `At Risk` filter shows the lead with weak signal and low readiness |
| ROBERT-03 | Carla Mendes | Queen West Residential | Fully validated buyer-ready lead | `Ready to convert` filter shows the lead without manager-review warning |
| ROBERT-04 | Darius Cole | Summit Lane Advisory | Disqualified lead with explicit reason | Disposition reporting includes the disqualification reason |
| ROBERT-05 | Elena Petrov | Crescent Bridge Realty | Lost then recycled lead | Disposition reporting captures loss reason and recycle-to-nurture trend |

### Expected manager validations
- `Manager review` filter returns leads where strong activity exists but conversion should still be reviewed
- `At Risk` filter returns low-signal leads
- `Ready to convert` filter isolates genuinely ready leads
- Lead Coach drawer shows:
  - conversion readiness
  - weakest factor
  - CQVS summary
  - conversation reasons
  - disposition context when applicable
- Disposition reporting API shows:
  - disqualified totals
  - nurture totals
  - top disqualification reasons
  - top loss reasons
  - recycle trend

### Pass criteria for Robert Lambke UAT
- Robert can sign in as Sales Manager
- Robert can see and use the manager-focused readiness filters
- Robert can open the coach drawer from the lead list
- the manager-review scenario explicitly recommends review before conversion
- the ready scenario does not show the manager-review warning
- disposition reporting contains the expected disqualification / loss / recycle signals
