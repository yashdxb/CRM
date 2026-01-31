# CRM Enterprise User Stories (All Roles)

Purpose: Central location for role-based, end-to-end CRM user stories. This document complements `PROJECT_MASTER.md` and drives backlog + acceptance criteria. Keep it updated as new roles or flows are introduced.

---

## Strategic Benchmark & Differentiation (Current Plan)

### Positioning Goal
We will not try to out‑Salesforce Salesforce. We win on **speed to value**, **execution discipline**, and **intelligent next‑step guidance** with fewer screens and stronger defaults.

### Current Benchmark (vs Salesforce, HubSpot, Dynamics 365, Pipedrive)
- **Overall score today:** 72/100
- **Target after Phase 2:** 88/100
- **Target after Phase 3:** 94/100

**Differentiation score today:** ~55/100 (we must improve *how* the workflow feels, not only breadth).

### Where We Match Leaders
- Lead management: SLA timers, qualification, clean conversion, source tracking.
- Opportunity discipline: stage gates, deal health, forecast categories, approvals.

### Where We Can Beat Leaders (Differentiators)
1) **Decision‑Grade Priority Stream**  
   One feed for tasks + leads + at‑risk + no‑next‑step with required next action.
2) **Deal Coach in the Workflow**  
   Manager coaching → rep acknowledgment → SLA escalation built in.
3) **AI Assistant with Context**  
   Summarize account + opportunities + activity gaps and recommend next steps.

### Gaps That Matter Most
**Automation & Intelligence** (lead scoring, workflow triggers, auto‑assignment)  
**Reporting & Analytics** (custom reports, activity metrics, pipeline trend)  
**Integrations** (email + calendar auto‑log, docs, e‑sign)  
**Mobile** (core flows optimized, quick‑add, offline notes)

### Execution Plan (Phased)
**Phase 1.5 (next 30–45 days)**  
- Priority Stream finalization (filters, quick actions, reliable next‑step enforcement)  
- Approval routing logic (role + amount + discount)  
- Rep activity metrics (calls/emails per rep, response time)  

**Phase 2 (next 60–90 days)**  
- Lead scoring (rules‑based)  
- Workflow automation (stage triggers + task creation)  
- Forecast rollups (rep → manager)  
- Account hierarchy view  
- Email + calendar integration (auto‑logging)  

**Phase 3 (next 120–180 days)**  
- Custom report builder  
- Win/loss analysis + competitor tracking  
- Next‑best‑action AI  
- Document management + e‑signature hooks  
- Mobile offline mode  

## Sales Rep (Full B2B Flow)

### Sales Home / Command Center
- As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately.
- As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early.
- As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction.
  - Use case: Open dashboard first thing → review overdue tasks + at‑risk deals → open highest priority record.
  - Data to enter: tasks with due dates (today/overdue), an opportunity with no activity in 10+ days, at‑risk flag, next‑step overdue.

### Leads — Intake & Assignment
- As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach.
- As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach.
  - Use case: View “Newly assigned leads” list → see SLA due time → click lead.
  - Data to enter: lead source (web/email/event), score, routing reason, SLA due date, assigned owner.

### Leads — Qualification Loop
- As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date.
- As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward.
- As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean.
  - Use case: Log outreach → set outcome → add next step date → update lead status.
  - Data to enter: qualification fields (fit/role/timing), disqualify reason, nurture follow‑up date, qualified notes.

### Lead Conversion
- As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.
- As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.
  - Use case: Click Convert → verify Account/Contact/Opportunity created with history.
  - Data to enter: converted company name, primary contact, initial opportunity value + stage.

### Accounts & Contacts
- As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context.
- As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group.
- As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership.
  - Use case: Open Account → add contact roles → add team members.
  - Data to enter: contact roles, account notes, parent/child account links, team member assignments.

### Opportunities — Setup
- As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one.
- As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate.
  - Use case: Create opportunity from conversion → set stage + forecast category.
  - Data to enter: opportunity value, close date, stage, forecast category, probability.

### Opportunity Stages — Execution
- As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality.
- As a Sales Rep, I want stage‑specific activity templates so I can log actions faster.
  - Use case: Try to advance stage → blocked until exit criteria completed.
  - Data to enter: required fields for each stage (decision maker, success criteria, proposal date, etc.).

### Qualification Stage
- As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing.
- As a Sales Rep, I want to schedule discovery and log notes before leaving the stage.
  - Use case: Log qualification notes → schedule discovery task.
  - Data to enter: pain summary, decision maker, discovery meeting date.

### Discovery Stage
- As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit.
- As a Sales Rep, I want a structured checklist to flag risks early.
  - Use case: Complete discovery checklist → update opportunity fields.
  - Data to enter: requirements, buying process steps, success criteria, risks.

### Solution Design Stage
- As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment.
- As a Sales Rep, I want to track technical risks before demo/validation.
  - Use case: Add pre‑sales to team → attach scope doc.
  - Data to enter: solution scope, technical risk notes, pre‑sales owner.

### Demo / Validation Stage
- As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome.
  - Use case: Log demo result → capture feedback and champion support.
  - Data to enter: demo outcome (pass/fail), feedback notes, champion confirmed.

### Proposal Stage
- As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs.
  - Use case: Create quote → request discount approval if above threshold.
  - Data to enter: proposal date, pricing, discount request, legal/security flag.

### Security / Legal Review
- As a Sales Rep, I want to track security questionnaire and legal redlines with status updates.
  - Use case: Upload questionnaire → mark legal status.
  - Data to enter: security status, legal redlines summary, expected close date.

### Negotiation Stage
- As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded.
  - Use case: Update pricing → log objections → update probability.
  - Data to enter: objection notes, updated price, new probability.

### Commit Stage
- As a Sales Rep, I want to mark deals as Commit only when verified and expected to close.
  - Use case: Set forecast category = Commit → confirm signature date.
  - Data to enter: expected signature date, delivery kickoff tentative date.

### Closed Won
- As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal.
- As a Sales Rep, I want to provide handoff notes and trigger a kickoff.
  - Use case: Mark Closed Won → onboarding checklist created.
  - Data to enter: handoff notes, kickoff date, renewal date.

### Closed Lost
- As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends.
  - Use case: Mark Closed Lost → required fields enforced.
  - Data to enter: loss reason, competitor, supporting notes.

### Daily Activity Discipline
- As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene.
- As a Sales Rep, I want the system to surface opportunities missing next steps.
  - Use case: Log activity → outcome + next step required.
  - Data to enter: activity outcome, next step date, linked opportunity.

### Manager Interactions
- As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback.
- As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates.
  - Use case: Submit approval → receive decision → complete acknowledgment.
  - Data to enter: approval request, manager comments, acknowledgment due date.

### Renewals
- As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed.
- As a Sales Rep, I want renewal tasks created and tracked like any opportunity.
  - Use case: Contract end date triggers renewal opp.
  - Data to enter: contract end date, renewal opportunity values.

### Expansion Signals
- As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context.
  - Use case: Add expansion opportunity from account health signal.
  - Data to enter: expansion signal type, new opportunity linked to account.

### Forecast & Reporting
- As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota.
- As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early.
  - Use case: Open forecast report → filter by month/owner.
  - Data to enter: pipeline values, close dates, forecast categories.

### Guiding Principle
- As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs.

---

## SDR / BDR
_Pending: to be added._

## Sales Manager
_Pending: to be added._

## Sales Operations / CRM Admin
_Pending: to be added._

## Pre‑Sales / Solution Consultant
_Pending: to be added._

## Finance
_Pending: to be added._

## Legal
_Pending: to be added._

## Delivery / Implementation
_Pending: to be added._

## Customer Success Manager (CSM)
_Pending: to be added._

## Support / Service Agent
_Pending: to be added._
