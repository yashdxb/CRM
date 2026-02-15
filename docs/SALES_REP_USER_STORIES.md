# Sales Rep User Stories (Login → End-to-End)

Purpose: Single, end-to-end flow for a Sales Rep from first login through lead capture, qualification, conversion, opportunity execution, approvals, and handoff. Each story includes acceptance criteria, evidence (UI/API refs), and sample data.

---

## Flow Overview (Order)
1. Login and reach dashboard.
2. Create first lead.
3. Qualify lead (CQVS) and see confidence + weakest signal.
4. Log first activity with outcome + next step.
5. Convert lead to Account + Contact + Opportunity.
6. Update opportunity stage with key confirmations.
7. Enforce forecast category at stage changes.
8. Add pricing/discount approvals and see status/feedback.
9. Generate proposal and track legal/security checks.
10. Add pre‑sales teammates and document scope/approach.
11. Capture delivery handoff and trigger kickoff.
12. Review dashboard (priority stream + forecast + risk).

Admin dependency (People & Access):
- For invited users who have never logged in, Users list should show `Invite sent <date/time>` (latest resend time when applicable) instead of only `Never logged in`.

---

## Sample Data (Realistic, Testable With Expected Results)

Lead (Overview tab) — create a new lead (Scenario A: Qualified):
- firstName: Alex
- lastName: Johnson
- companyName: Blue Harbor Logistics
- status: New
- assignmentStrategy: Manual (not auto-derived from settings)
- ownerId: “yasser0503@outlook.com” (default to current login; read‑only when the user’s security level is lower, based on configurable security levels)
- email: alex@blueharborlogistics.com
- phone: +1 415-555-0134 (international format)
- phoneType: Mobile
- jobTitle: Ops Director
- source: Referral
- territory: West
Expected result:
- Lead saves successfully and appears in the Leads list.
- System score remains read‑only and updates only via scoring logic.
- Email validation blocks invalid formats with an inline error.
- Phone enforces international format and stores E.164.
- Phone input supports all countries with international dial + masked entry.
- Phone type is selected from the system lookup and saved with the lead.
- Other tabs are disabled until the lead is saved.
- After first save, user is routed to `Qualification` tab.
- Assignment and owner are read-only for lower security levels (driven by configurable security levels, not hard-coded roles).

Lead (Qualification tab / CQVS) — set 3+ factors:
- budgetAvailability: Budget allocated and approved
- budgetEvidence: Customer call
- readinessToSpend: Ready to proceed pending final step
- readinessEvidence: Email confirmation
- buyingTimeline: Target date verbally confirmed
- timelineEvidence: Meeting notes
- problemSeverity: Critical business impact
- problemEvidence: Discovery notes
- economicBuyer: Buyer engaged in discussion
- economicBuyerEvidence: Call recap
- icpFit: Strong ICP fit
- icpFitEvidence: Account research
- qualifiedNotes: “Pain confirmed, buyer engaged, timeline agreed.”
- nurtureFollowUpAtUtc: 2026-02-20 (if status = Nurture)
- disqualifiedReason: “Budget frozen for FY26” (if status = Disqualified)
- lossReason: “Selected competitor” (if status = Lost)
- lossCompetitor: “Competitor X” (if status = Lost)
- lossNotes: “Lost on price and timeline” (if status = Lost)
Expected result:
- Confidence label shows Medium/High, weakest signal is the lowest‑confidence factor.
- Evidence fields are disabled when factor is “Unknown / not yet discussed”.
- Truth coverage increases as more factors are Verified.

Activity (Create Activity) — log the first touch:
- template: Discovery Call
- subject: Discovery call
- type: Call
- priority: High
- status: Completed
- ownerId: “yasser0503@outlook.com”
- dueDateUtc: 2026-02-13 10:00 AM
- completedDateUtc: 2026-02-13 10:45 AM
- relatedEntityType: Lead
- relatedEntityId: “Alex Johnson / Blue Harbor Logistics”
- description: “Discovery agenda and notes”
- outcome: “Connected; agreed next steps”
- nextStepSubject: “Send proposal”
- nextStepDueDateUtc: 2026-02-14 10:00 AM
Expected result:
- Activity saves and appears in the related lead timeline.
- Next‑step task is created and appears in the Priority Stream.
- SLA due is displayed separately and is marked met once the first touch is logged.
- Next step due date is captured during the log activity action (not auto-filled from SLA).
- If a first-touch task is still open, it is auto-completed when the cadence touch is logged.

Opportunity (Opportunity Details + Deal Settings) — after conversion:
- name: Blue Harbor CRM Rollout
- accountId: Blue Harbor Logistics
- stage: Qualification
- expectedCloseDate: 2026-03-31
- amount: 120000
- currency: USD
- probability: 60
- forecastCategory: Pipeline
- opportunityType: New Business
- contractStartDateUtc: 2026-04-15
- contractEndDateUtc: 2027-04-14
- winLossReason: (blank unless Closed Won/Lost)
- summary: “Confirmed pain + buying committee identified.”
- requirements: “Pipeline discipline + reporting + integrations.”
- buyingProcess: “Stage gate review → procurement → legal.”
- successCriteria: “Adoption in 60 days + forecast accuracy.”
Expected result:
- Stage save is blocked if summary/requirements/buyingProcess/successCriteria are missing.
- Forecast category is required at forecastable stages.

Opportunity (Pricing & Discounts):
- discountPercent: 12.5
- discountAmount: 15000
- pricingNotes: “Volume discount requested by procurement.”
Expected result:
- Approval request required if thresholds are exceeded.

Opportunity (Proposal):
- proposalStatus: Drafted
- proposalLink: https://docs.example.com/proposal-001
- proposalGeneratedAtUtc: 2026-02-13
- proposalSentAtUtc: 2026-02-15
- proposalNotes: “Includes rollout timeline + integration scope.”
Expected result:
- Proposal fields persist and appear on reload.

Opportunity (Pre‑Sales Team):
- teamMembers[0].userId: “Pre‑Sales Engineer”
- teamMembers[0].role: Solution Architect
- preSalesScope: “Phase 1 rollout + integrations”
- preSalesApproach: “Pilot → expand to full team”
Expected result:
- Team member row persists and displays in Pre‑Sales section.

Opportunity (Approval Workflow):
- approvalRequest.purpose: Discount approval
- approvalRequest.amount: 15000
- approvalRequest.currency: USD
- approvalDecisionNotes: “Approved at 12.5%”
Expected result:
- Approval appears in the approvals list with status + notes.

Opportunity (Security & Legal Review):
- securityReviewStatus: In review
- legalReviewStatus: In review
- securityChecklist: “Security questionnaire sent”
- legalChecklist: “MSA redlines pending”
- technicalChecklist: “Demo validation risk logged”
Expected result:
- Checklist items can be added/updated and show Saved state.

Opportunity (Delivery Handoff):
- deliveryOwnerId: CS Lead
- deliveryStatus: Planned
- deliveryHandoffScope: “Phase 1 onboarding”
- deliveryHandoffRisks: “Security review pending”
- deliveryHandoffTimeline: “Kickoff in 2 weeks”
- triggerKickoff: Click “Trigger kickoff”
Expected result:
- Handoff fields persist; kickoff action logged in review thread or activity log.

Onboarding Checklist & Milestones:
- onboardingChecklist[0].title: “Kickoff scheduled”
- onboardingChecklist[0].status: In progress
- onboardingChecklist[0].dueDateUtc: 2026-02-28
- onboardingChecklist[0].notes: “Invite sent to stakeholders”
- onboardingMilestones[0].title: “Phase 1 complete”
- onboardingMilestones[0].status: Not started
- onboardingMilestones[0].dueDateUtc: 2026-04-30
- onboardingMilestones[0].notes: “Post‑go‑live review”
Expected result:
- Items persist and appear in the checklist/milestones lists.

Additional Sample Scenarios (CQVS + Status outcomes)

Scenario B — Nurture (timeline slipped; keep relationship warm)
Lead (Overview):
- firstName: Maya
- lastName: Chen
- companyName: Harborline Foods
- status: Nurture
- assignmentStrategy: Manual
- ownerId: “yasser0503@outlook.com”
- email: maya@harborlinefoods.com
- phone: +1 312-555-0188
- jobTitle: Supply Chain Manager
- source: Web
- territory: Midwest
Lead (Qualification / CQVS):
- budgetAvailability: Budget planned but not approved
- budgetEvidence: Internal plan mention
- readinessToSpend: Not ready this quarter
- readinessEvidence: Email from buyer
- buyingTimeline: Target date after Q3
- timelineEvidence: Follow-up call notes
- problemSeverity: Moderate impact
- problemEvidence: Ops review notes
- economicBuyer: Identified but not engaged
- economicBuyerEvidence: Org chart reference
- icpFit: Good ICP fit
- icpFitEvidence: Account research
- nurtureFollowUpAtUtc: 2026-05-15
Expected result:
- Status remains Nurture; follow-up date appears on lead timeline and reminders.
- Weakest signal shows “Economic Buyer” or “Readiness”.

Scenario C — Disqualified (no fit or blocked)
Lead (Overview):
- firstName: Omar
- lastName: Reed
- companyName: QuickServe Retail
- status: Disqualified
- assignmentStrategy: Manual
- ownerId: “yasser0503@outlook.com”
- email: omar@quickserveretail.com
- phone: +1 646-555-0197
- jobTitle: Store Operations Lead
- source: Cold outbound
- territory: East
Lead (Qualification / CQVS):
- budgetAvailability: No budget
- budgetEvidence: Buyer email
- readinessToSpend: Not planned
- readinessEvidence: Call notes
- buyingTimeline: Unknown
- problemSeverity: Low impact
- economicBuyer: Not identified
- icpFit: Weak ICP fit
- disqualifiedReason: “No budget / not ICP”
- qualifiedNotes: “Single location; not enterprise fit”
Expected result:
- Lead status set to Disqualified with reason stored and visible in lead details.
- Lead no longer appears in active lead work queues.

Scenario D — Lost (competitive loss after evaluation)
Lead (Overview):
- firstName: Priya
- lastName: Nair
- companyName: Meridian Freight
- status: Lost
- assignmentStrategy: Manual
- ownerId: “yasser0503@outlook.com”
- email: priya@meridianfreight.com
- phone: +1 202-555-0119
- jobTitle: VP Operations
- source: Partner
- territory: East
Lead (Qualification / CQVS):
- budgetAvailability: Approved
- readinessToSpend: Ready
- buyingTimeline: 30–45 days
- problemSeverity: High
- economicBuyer: Engaged
- icpFit: Strong ICP fit
- lossReason: “Selected competitor”
- lossCompetitor: “Competitor X”
- lossNotes: “Chose incumbent due to shorter procurement timeline”
Expected result:
- Lead status set to Lost with competitor + notes stored.
- Loss reason is visible for reporting and win/loss analysis.

---

## Stories (Login → End)

### 1) Login and Reach Dashboard
Story: As a Sales Rep, I want to log in and land on the dashboard so I can start my day.
Acceptance criteria: Login accepts valid credentials and returns a JWT; user is redirected to the dashboard; unauthorized users cannot access protected pages.
UI steps:
- Open the app login page.
- Enter Email and Password.
- Click `Sign in`.
- Verify you land on `Dashboard` and see KPI cards.
Evidence: `client/src/app/public/auth/login.page.html`, `client/src/app/public/auth/login.page.ts`, `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`.
Sample data: Email = “yasser0503@outlook.com”; Password = “P@ssw0rd!”.

### 2) Create First Lead
Story: As a Sales Rep, I want to create a new lead so I can start tracking a prospect.
Acceptance criteria: Lead can be created with name + company + source; lead appears in the Leads list after save; lead detail opens successfully.
Acceptance criteria (Overview behavior):
- Assignment is not auto‑derived from settings on the create form.
- Owner defaults to the logged‑in user; if the user’s security level is lower, Owner is read‑only.
- Owner editability is governed by permission + security level (not hard-coded role names):
  - requires `Permissions.Administration.Manage`
  - user security level rank must be above tenant default level
- Email requires valid format and shows inline validation on error.
- Phone requires international format (E.164 or `+<country> <number>`).
- All non‑Overview tabs are disabled until the lead is saved.
- After first save, UI navigates to `Qualification` and prompts to fill now or later.
- System score is read‑only and recalculates based on scoring logic.
Acceptance criteria (List behavior):
- Leads list inline Owner dropdown is disabled for users failing the same governance rule.
- Leads bulk “Assign owner” dialog dropdown/button is disabled for users failing the same governance rule.
UI note: Tabs use a flat style (no heavy shadow/3D).
UI steps:
- Side menu → `Leads`.
- Click `New Lead`.
- Fill Lead basics fields.
- Click `Save`.
- Verify the new lead appears in the list and opens.
Evidence: `client/src/app/crm/features/leads/pages/leads.page.html`, `client/src/app/crm/features/leads/pages/leads.page.ts`, `client/src/app/crm/features/leads/pages/lead-form.page.html`, `client/src/app/crm/features/leads/pages/lead-form.page.ts`, `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`.
Validation evidence: `client/e2e/lead-owner-click-guard.spec.ts`, `client/e2e/leads-owner-list-readonly.spec.ts`.
Issue fix notes (Owner dropdown remained enabled for lower security users):
- Issue observed:
  - Owner dropdown was still interactable in local dev for users who should be read-only.
- Root cause:
  - UI disable state alone was not sufficient; interaction handlers still accepted owner-change attempts in some flows.
  - Early implementations also relied on role-name assumptions in parts of the UI path.
- Fix implemented:
  - Centralized owner editability to governance checks (no role-name hardcoding):
    - require `Permissions.Administration.Manage`
    - require user security-level rank above tenant default level
  - Applied the same gate consistently in:
    - Edit Lead owner field
    - Leads list inline Owner editor
    - Leads bulk Assign Owner dialog
  - Added click-guard in handlers so blocked users cannot update owner even if UI events fire.
- Lessons learned:
  - Treat control-level disable as UX only; enforce the same rule in write handlers and API paths.
  - Keep one reusable governance predicate for all owner-assignment surfaces to avoid drift.
  - Validate in local e2e against local API to avoid false positives from environment mismatch.
Sample data: Scenario A (Qualified) lead overview values above.

### 3) Qualify Lead (CQVS) and See Confidence + Weakest Signal
Story: As a Sales Rep, I want qualification factors (CQVS) with confidence + weakest signal so I know what to validate next.
Acceptance criteria: Qualification factors default to “Unknown / not yet discussed”; evidence fields are disabled when factor is Unknown and auto‑set to “No evidence yet”; qualification summary shows confidence label, truth coverage, and weakest signal; next‑evidence suggestions appear when weakest signal is Unknown/Assumed.
UI steps:
- Open the lead you just created.
- Click `Qualification` tab.
- Set 3+ CQVS factors and add evidence.
- Verify Confidence label + Weakest signal panel updates.
Evidence: `client/src/app/crm/features/leads/pages/lead-form.page.html`, `client/src/app/crm/features/leads/pages/lead-form.page.ts`, `server/src/CRM.Enterprise.Infrastructure/Leads/LeadService.cs`.
Sample data: Scenario A (Qualified) CQVS values above.

### 4) Log First Activity With Outcome + Next Step
Story: As a Sales Rep, I want every activity to require an outcome and next step so my pipeline stays current.
Acceptance criteria: Activity requires subject, type, outcome, next step subject, and next step due date; saved activity appears under the related record; next‑step task is created; in Activity & Follow‑Up, next‑step due date is read‑only before first touch and editable after a touch is logged; logging a cadence touch auto‑completes any open first‑touch task for the lead.
UI steps:
- From the lead page, click `Log activity`.
- Choose `Call` and fill subject, outcome, next step, and due date.
- Click `Save`.
- Verify activity appears in the lead timeline and next‑step task is listed.
Evidence: `client/src/app/crm/features/activities/pages/activity-form.page.html`, `server/src/CRM.Enterprise.Api/Controllers/ActivitiesController.cs`.
Sample data: Activity values above.

### 5) Convert Lead to Account + Contact + Opportunity
Story: As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and closes the lead.
Acceptance criteria: Convert action creates Account + Contact + Opportunity; lead status becomes Converted/Closed; related activities/notes are linked to the created opportunity/account.
UI steps:
- On the lead detail, click `Convert`.
- Confirm Account + Contact + Opportunity targets.
- Click `Convert Lead`.
- Verify Account, Contact, and Opportunity were created.
Evidence: `client/src/app/crm/features/leads/pages/lead-convert.page.ts`, `client/src/app/crm/features/leads/pages/lead-convert.page.html`, `server/src/CRM.Enterprise.Api/Controllers/LeadsController.cs`.
Sample data: Scenario A lead + opportunity values above.

### 6) Stage Progression Requires Key Confirmations
Story: As a Sales Rep, I want stage progression to require key confirmations (pain, decision maker, next step) so stages reflect reality.
Acceptance criteria: Attempting to move past Qualification requires Summary, Requirements, Buying Process, and Success Criteria; UI shows stage guidance when requirements are missing; save is blocked until required fields are completed.
UI steps:
- Side menu → `Opportunities`.
- Open the converted opportunity.
- Attempt to move stage forward without filling required fields.
- Fill Summary, Requirements, Buying Process, Success Criteria.
- Save and confirm stage change succeeds.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `client/src/app/crm/features/opportunities/pages/opportunity-form.page.ts`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`.
Sample data: Opportunity fields above.

### 7) Forecast Category Enforced at Stage Changes
Story: As a Sales Rep, I want forecast category enforced at stage changes so my forecast stays credible.
Acceptance criteria: Forecast category selection is required for forecastable stages; UI disables changes when forecast is locked; attempts to save without required forecast category are blocked.
UI steps:
- In the opportunity, set stage to a forecastable stage.
- Clear Forecast category and attempt save (should block).
- Select Forecast category and save.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Infrastructure/Opportunities/OpportunityService.cs`.
Sample data: Forecast category = “Pipeline”; Stage = “Qualification”.

### 8) Submit Pricing/Discount Approval and See Status/Feedback
Story: As a Sales Rep, I want to request pricing/discount approval and see manager feedback.
Acceptance criteria: Approval request form accepts purpose + amount + currency; approvals list shows status, approver role, and decision notes; rep cannot approve if permission is missing.
UI steps:
- In the opportunity, open `Approvals` section.
- Click `Request Approval`.
- Enter purpose, amount, currency and submit.
- Verify approval appears with status + notes.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`, `server/src/CRM.Enterprise.Api/Controllers/ApprovalsController.cs`.
Sample data: Approval values above.

### 9) Generate Proposal + Track Legal/Security Review
Story: As a Sales Rep, I want to generate a proposal and track legal/security status.
Acceptance criteria: Proposal status/link/notes can be saved; legal and security status fields are editable; checklist items can be added/updated for legal/security.
UI steps:
- In the opportunity, open `Proposal` section.
- Fill proposal status/link/notes and save.
- Set Legal and Security statuses.
- Add checklist items and save.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`.
Sample data: Proposal + legal/security values above.

### 10) Involve Pre‑Sales and Document Scope/Approach
Story: As a Sales Rep, I want to add pre‑sales teammates and document scope/approach for alignment.
Acceptance criteria: Pre‑sales team members can be added with role; scope summary and approach fields persist; team list reflects saved members.
UI steps:
- In the opportunity, open `Pre‑Sales` section.
- Add a team member and role.
- Enter scope and approach.
- Save and verify the team list updates.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`.
Sample data: Team member = “Pre‑Sales Engineer”; Role = “Solution Architect”; Scope = “Phase 1 rollout”; Approach = “Pilot + staged expansion”.

### 11) Capture Delivery Handoff and Trigger Kickoff
Story: As a Sales Rep, I want to provide handoff notes and trigger a kickoff so onboarding starts smoothly.
Acceptance criteria: Delivery owner + status + handoff scope/risks/timeline fields persist; kickoff button is available in edit mode; onboarding checklist/milestones can be added.
UI steps:
- In the opportunity, open `Delivery Handoff` section.
- Fill delivery owner/status/scope/risks/timeline.
- Click `Trigger kickoff`.
- Add onboarding checklist/milestones and save.
Evidence: `client/src/app/crm/features/opportunities/pages/opportunity-form.page.html`.
Sample data: Delivery handoff + onboarding values above.

### 12) Review Dashboard (Priority Stream + Forecast + Risk)
Story: As a Sales Rep, I want a command center view of tasks, pipeline, risks, and forecast so I can prioritize work immediately.
Acceptance criteria: Priority stream shows tasks, new leads, at‑risk deals, and no‑next‑step; pipeline and forecast cards render; risk register and truth metrics display for the rep.
UI steps:
- Side menu → `Dashboard`.
- Verify Priority Stream, Pipeline, Forecast, Risk Register, and Truth Metrics cards.
Evidence: `client/src/app/crm/features/dashboard/pages/dashboard.page.html`, `server/src/CRM.Enterprise.Api/Controllers/DashboardController.cs`.
Sample data: Ensure at least one task, one lead, and one opportunity exist to populate the cards.
