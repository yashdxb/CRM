# Review Flows (E2E with Exact Stories + UI Fields)

This document lists **exact story text** from `docs/CRM_BACKLOG.md`, plus UI fields and a sample use case to replicate in the system.

## Sales Rep Day 1 (Empty Data) E2E

Flow 01A: Login (user can access dashboard)
Flow 01B: Create first Lead (Quick Add or Leads → New)
Flow 01C: Qualify Lead (set CQVS factors; at least 1–2 not Unknown)
Flow 01D: Create first Activity (Call/Meeting) with outcome + next step + due date
Flow 01E: Convert Lead → Account + Contact + Opportunity
Flow 01F: Update Opportunity stage (confirm pain/decision maker/next step)
Flow 01G: Log activity outcome + next step
Flow 01H: Review Dashboard (lead/opportunity appears; confidence + weakest signal visible)

Use this order when a new rep logs in with no data (only lookup values).

1. Login → Dashboard (confirm access and empty state).
2. Create first Lead (Quick Add or Leads → New).
3. Qualify Lead (set initial CQVS factors; at least 1–2 not Unknown).
4. Create first Activity (Call/Meeting) with outcome + next step + due date.
5. Convert Lead → Account + Contact + Opportunity.
6. Update Opportunity stage (confirm pain/decision maker/next step).
7. Log activity outcome + next step.
8. Review Dashboard (lead/opportunity appears, confidence + weakest signal visible).

### Lead Stories Used in This Flow
- Story: As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately.
  - ClickUp: 86dzp8xe0
  - Acceptance criteria:
    - Dashboard command center shows sections for Tasks Due/Overdue and New Leads.
    - Pipeline by stage and At‑risk deals are visible in the same view.
    - Forecast snapshot shows raw and confidence‑weighted totals.
  - UI fields: (see lead form)
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → update qualification fields and save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach.
  - ClickUp: 86dzp8xdn
  - Acceptance criteria:
    - New leads assigned to an owner based on assignment rules.
    - SLA deadline (`slaDueAtUtc`) is set on creation.
    - First-touch task is created for the assigned owner.
  - UI fields: slaDueAtUtc
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → set fields: slaDueAtUtc. Save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach.
  - ClickUp: 86dzp8xdm
  - Acceptance criteria:
    - Lead detail displays `source`, `aiScore`, and `routingReason`.
    - Score and rationale refresh when key fields change.
  - UI fields: source, aiScore, routingReason
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → set fields: source, aiScore, routingReason. Save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward.
  - ClickUp: 86dzp8xd6
  - Acceptance criteria:
    - Lead CQVS factors include Company Fit, Authority, Need, Timing.
    - Lead cannot be marked Qualified until factors are set (not all Unknown).
    - Qualification state is persisted and visible on reload.
  - UI fields: (see lead form)
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → update qualification fields and save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date.
  - ClickUp: 86dzp8xdf
  - Acceptance criteria:
    - Activity form provides outcome options and requires selection.
    - Next-step fields are required and create follow-up activity.
  - UI fields: (see lead form)
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → update qualification fields and save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean.
  - ClickUp: 86dzp8xd5
  - Acceptance criteria:
    - Disqualified requires `disqualifiedReason`.
    - Nurture requires `nurtureFollowUpDate`.
    - Qualified requires `qualifiedNotes` and CQVS factors not all Unknown.
  - UI fields: disqualifiedReason, nurtureFollowUpDate, qualifiedNotes
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → set fields: disqualifiedReason, nurtureFollowUpDate, qualifiedNotes. Save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.
  - ClickUp: 86dzp8xd2
  - Acceptance criteria:
    - Convert action creates Account, Contact, Opportunity in one submission.
    - Selected fields map correctly (lead->account/contact/opportunity).
    - Activities/notes from lead are linked to the created opportunity/account.
  - UI fields: (see lead form)
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → update qualification fields and save.
    - Expected: Changes persist, and dependent UI sections update accordingly.
- Story: As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.
  - ClickUp: 86dzp8xcz
  - Acceptance criteria:
    - Converting a lead sets status to Closed/Converted.
    - Converted leads are excluded from active lead lists.
  - UI fields: (see lead form)
  - Use case sample:
    - Precondition: Lead exists (or create a new lead).
    - Action: Open Lead → update qualification fields and save.
    - Expected: Changes persist, and dependent UI sections update accordingly.

## Sales Rep E2E

### Flow 02B | Leads
- Story: As a Sales Rep, AI suggests next evidence to resolve weakest signal
- ClickUp: 86dzp8xz6
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 02C | Leads
- Story: As a Sales Rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet"
- ClickUp: 86dzp8y1d
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 02D | Leads
- Story: As a Sales Rep, I see "Unknown / not yet discussed" preselected for every qualification factor
- ClickUp: 86dzp8y1u
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 02E | Leads
- Story: As a Sales Rep, I want an inline qualification summary on the lead detail that shows overall confidence and the weakest signal so I can see what is uncertain and fix it quickly.
- ClickUp: 86dzp8y19
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02F | Leads
- Story: As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately.
- ClickUp: 86dzp8xe0
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02G | Leads
- Story: As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.
- ClickUp: 86dzp8xd2
- UI fields: (see UI in UI: client/src/app/crm/features/leads/pages/lead-form.page.html)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 02H | Leads
- Story: As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean.
- ClickUp: 86dzp8xd5
- UI fields: disqualifiedReason, nurtureFollowUpDate, qualifiedNotes
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02I | Leads
- Story: As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach.
- ClickUp: 86dzp8xdn
- UI fields: slaDueAtUtc
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02J | Leads
- Story: As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach.
- ClickUp: 86dzp8xdm
- UI fields: source, aiScore, routingReason
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02K | Leads
- Story: As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.
- ClickUp: 86dzp8xcz
- UI fields: (see UI in UI: client/src/app/crm/features/leads/pages/lead-form.page.html)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02L | Leads
- Story: As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date.
- ClickUp: 86dzp8xdf
- UI fields: (see UI in UI: client/src/app/crm/features/leads/pages/lead-form.page.html)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 02M | Leads
- Story: As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward.
- ClickUp: 86dzp8xd6
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 02N | Leads
- Story: As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends.
- ClickUp: 86dzp8x9q
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 03A | Contacts
- Story: As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership.
- ClickUp: 86dzp8xcg
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 03B | Contacts
- Story: As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context.
- ClickUp: 86dzp8xcw
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 03C | Contacts
- Story: As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group.
- ClickUp: 86dzp8xcr
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 04A | Opportunities
- Story: As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early.
- ClickUp: 86dzp8xdx
- UI fields: idleDeal, idleDealNoNextStep, idleDealNoActivity, idleDealDays, idleDealCooldownDays
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04B | Opportunities
- Story: As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate.
- ClickUp: 86dzp8xcc
- UI fields: forecastCategory, Closed, Omitted
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04C | Opportunities
- Story: As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early.
- ClickUp: 86dzp8x8e
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04D | Opportunities
- Story: As a Sales Rep, I want renewal tasks created and tracked like any opportunity.
- ClickUp: 86dzp8x8w
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04E | Opportunities
- Story: As a Sales Rep, I want stage‑specific activity templates so I can log actions faster.
- ClickUp: 86dzp8xc4
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04F | Opportunities
- Story: As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality.
- ClickUp: 86dzp8xc7
- UI fields: (see UI in UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04G | Opportunities
- Story: As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal.
- ClickUp: 86dzp8xa7
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04H | Opportunities
- Story: As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome.
- ClickUp: 86dzp8xav
- UI fields: (see UI in UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04I | Opportunities
- Story: As a Sales Rep, I want to mark deals as Commit only when verified and expected to close.
- ClickUp: 86dzp8xa9
- UI fields: expectedCloseDate, probability
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04J | Opportunities
- Story: As a Sales Rep, I want to schedule discovery and log notes before leaving the stage.
- ClickUp: 86dzp8xbq
- UI fields: (see UI in UI: client/src/app/crm/features/opportunities/pages/opportunity-form.page.html)
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 04K | Opportunities
- Story: As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one.
- ClickUp: 86dzp8xce
- UI fields: name, amount, expectedCloseDate, stage
- Use case:
  - Precondition: Opportunity exists with stage and amount.
  - Action: Update stage/fields and attempt save.
  - Expected: Validation enforces required fields and updates persist.

### Flow 05A | Activities
- Story: As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene.
- ClickUp: 86dzp8x9n
- UI fields: outcome, nextStepSubject, nextStepDueDateUtc
- Use case:
  - Precondition: Opportunity/Lead exists.
  - Action: Create an activity with outcome + next step + due date.
  - Expected: Activity saves and next-step task is created.

### Flow 05B | Activities
- Story: As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction.
- ClickUp: 86dzp8xdt
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity/Lead exists.
  - Action: Create an activity with outcome + next step + due date.
  - Expected: Activity saves and next-step task is created.

### Flow 05C | Activities
- Story: As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates.
- ClickUp: 86dzp8x97
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity/Lead exists.
  - Action: Create an activity with outcome + next step + due date.
  - Expected: Activity saves and next-step task is created.

### Flow 05D | Activities
- Story: As a Sales Rep, I want the system to surface opportunities missing next steps.
- ClickUp: 86dzp8x9k
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Opportunity/Lead exists.
  - Action: Create an activity with outcome + next step + due date.
  - Expected: Activity saves and next-step task is created.

### Flow 06D | Dashboard
- Story: As a Sales Rep, I can view Risk Register flags derived from CQVS
- ClickUp: 86dzp8xzq
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06E | Dashboard
- Story: As a Sales Rep, I want a structured checklist to flag risks early.
- ClickUp: 86dzp8xbh
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06F | Dashboard
- Story: As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota.
- ClickUp: 86dzp8x8g
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06G | Dashboard
- Story: As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed.
- ClickUp: 86dzp8x92
- UI fields: (see UI in UI: client/src/app/crm/features/dashboard/pages/dashboard.page.html)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06H | Dashboard
- Story: As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs.
- ClickUp: 86dzp8x89
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06I | Dashboard
- Story: As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit.
- ClickUp: 86dzp8xbp
- UI fields: requirements, buyingProcess, successCriteria
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06J | Dashboard
- Story: As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing.
- ClickUp: 86dzp8xc1
- UI fields: summary
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06K | Dashboard
- Story: As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context.
- ClickUp: 86dzp8x8p
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06L | Dashboard
- Story: As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs.
- ClickUp: 86dzp8xat
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06M | Dashboard
- Story: As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment.
- ClickUp: 86dzp8xb6
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06N | Dashboard
- Story: As a Sales Rep, I want to provide handoff notes and trigger a kickoff.
- ClickUp: 86dzp8x9z
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06O | Dashboard
- Story: As a Sales Rep, I want to track security questionnaire and legal redlines with status updates.
- ClickUp: 86dzp8xan
- UI fields: securityReviewStatus, legalReviewStatus, securityChecklist, legalChecklist
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06P | Dashboard
- Story: As a Sales Rep, I want to track technical risks before demo/validation.
- ClickUp: 86dzp8xb3
- UI fields: technicalChecklist
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 07B | Settings
- Story: As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded.
- ClickUp: 86dzp8xah
- UI fields: pricingNotes, discountPercent, discountAmount, probability, expectedCloseDate
- Use case:
  - Precondition: Admin role.
  - Action: Update the relevant setting and save.
  - Expected: Setting persists and affects the corresponding workflow.

### Flow 07C | Settings
- Story: As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback.
- ClickUp: 86dzp8x9c
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Admin role.
  - Action: Update the relevant setting and save.
  - Expected: Setting persists and affects the corresponding workflow.

## Manager E2E

### Flow 02A | Leads
- Story: As a Sales Manager, I want the CQVS score breakdown to show labeled factors (C/Q/V/S) with per‑factor scores and weights so I can see why a lead is rated and coach reps on weak factors.
- ClickUp: 86dzp8y10
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Lead exists (or create a new lead).
  - Action: Open lead detail and update qualification factors.
  - Expected: Lead detail reflects updated status/summary and persists on reload.

### Flow 03A | Contacts
- Story: As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership.
- ClickUp: 86dzp8xcg
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Required data exists.
  - Action: Perform the workflow described by the story.
  - Expected: UI and data reflect the change.

### Flow 06A | Dashboard
- Story: As a Sales Manager, I can see Truth Coverage and Time-to-Truth per deal
- ClickUp: 86dzp8y0j
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06B | Dashboard
- Story: As a Sales Manager, I see top truth gaps across pipeline
- ClickUp: 86dzp8y02
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06C | Dashboard
- Story: As a Sales Manager, I want pipeline and forecast rollups across my role hierarchy by default.
- ClickUp: 86dzpgeq0
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06V | Dashboard
- Story: As a Sales Manager, I want a deal-level Cost of Not Knowing breakdown so I can see which missing factors drive exposure.
- ClickUp: 86dzpr31w
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06W | Dashboard
- Story: As a Sales Manager, I want an exposure rollup with drill-down to the top contributing deals so I can focus coaching.
- ClickUp: 86dzpr32x
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 06X | Dashboard
- Story: As a Sales Manager, I want an exposure trend line (4–8 weeks) to see if uncertainty is improving or worsening.
- ClickUp: 86dzpr337
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Seed data exists for leads/opportunities/activities.
  - Action: Open Dashboard and review cards relevant to the story.
  - Expected: Card values match underlying data and drill-down links work.

### Flow 07C | Settings
- Story: As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback.
- ClickUp: 86dzp8x9c
- UI fields: (no UI reference found)
- Use case:
  - Precondition: Admin role.
  - Action: Update the relevant setting and save.
  - Expected: Setting persists and affects the corresponding workflow.