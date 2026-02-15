# CRM Enterprise User Stories (All Roles)

Legacy narrative preserved in `docs/USER_STORIES_LEGACY.md`.

Purpose: Central location for role-based, end-to-end CRM user stories. This document complements `PROJECT_MASTER.md` and drives backlog + acceptance criteria. Keep it updated as new roles or flows are introduced.

---

## ClickUp Structure (Execution)
- **Backlog lists**: `CRM Backlog`, `Project Backlog`, `SCM Backlog`
- **User stories** are stored in the relevant backlog list.
- **Module linkage** is required (story title prefix: `Module: <Module> | ...`).
- **Tags**: `module:*`, `done/partial/not-started/candidate`, `moscow:*` (Must/Should/Could/Won’t), `tier:*` (Core/Accelerator/Parked), `type:*` (User/System/Platform).
- **Workspace map**: See `docs/PROJECT_MASTER.md` → “ClickUp Workspace Map (Current)” for IDs (workspace/space/folder/list).

---

## Strategic Benchmark & Differentiation (Current Plan)

### Positioning Goal
We will not try to out‑Salesforce Salesforce. We win on **speed to value**, **execution discipline**, and **intelligent next‑step guidance** with fewer screens and stronger defaults.

### Current Benchmark (vs Salesforce, HubSpot, Dynamics 365, Pipedrive)
- **Overall score today:** 72/100
- **Target after Next:** 88/100
- **Target after Later:** 94/100

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

### Execution Plan (Rolling)
**Now (next 1–2 sprints)**  
- Priority Stream finalization (filters, quick actions, reliable next‑step enforcement)  
- Approval routing logic (role + amount + discount)  
- Rep activity metrics (calls/emails per rep, response time)  

**Next (next 1–2 quarters)**  
- Lead scoring (rules‑based)  
- Workflow automation (stage triggers + task creation)  
- Forecast rollups (rep → manager)  
- Account hierarchy view  
- Email + calendar integration (auto‑logging)  

**Later (strategic)**  
- Custom report builder  
- Win/loss analysis + competitor tracking  
- Next‑best‑action AI  
- Document management + e‑signature hooks  
- Mobile offline mode

## Sales Rep (Full B2B Flow)

Canonical story list synced from ClickUp CRM Backlog.

- Approval workflow (optional)
- As a manager, uncertainty exposure is quantified (Cost of Not Knowing)
- As a system, confidence is calibrated against outcomes
- Coaching & Management
- Conditional Forecasting
- CSV import/export flow
- Epistemic Metrics Core (Done)
- Epistemic State + Evidence Governance
- Feedback Loop + Weakest Signal
- Later - Dedicated Award Screen (SCM)
- Module: Activities | As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene.
- Module: Activities | As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction.
- Module: Activities | As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates.
- Module: Activities | As a Sales Rep, I want the system to surface opportunities missing next steps.
- Module: Activities | As a system, automation creates tasks for unresolved high-impact factors
- Module: Contacts | As a Sales Rep, I want to add account team members (pre‑sales, manager) for shared ownership.
- Module: Contacts | As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context. (Done)
- Module: Contacts | As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group.
- Module: Dashboard | As a manager, I can see Truth Coverage and Time-to-Truth per deal
- Module: Dashboard | As a manager, I see top truth gaps across pipeline
- Module: Dashboard | As a rep, I can view Risk Register flags derived from CQVS (Company fit, Qualification readiness, Value/Problem severity, Stakeholder access)
- Module: Dashboard | As a Sales Rep, I want a structured checklist to flag risks early.
- Module: Dashboard | As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota.
- Module: Dashboard | As a Sales Rep, I want renewal opportunities auto‑created at 90/60/30 days so renewal motions are never missed.
- Module: Dashboard | As a Sales Rep, I want the CRM to guide execution, not just store data — enforcing discipline, protecting forecast accuracy, and enabling clean handoffs.
- Module: Dashboard | As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit.
- Module: Dashboard | As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing.
- Module: Dashboard | As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context. (Done)
- Module: Dashboard | As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs. (Done)
- Module: Dashboard | As a Sales Rep, I want to involve pre‑sales and document scope/approach for alignment. (Done)
- Module: Dashboard | As a Sales Rep, I want to provide handoff notes and trigger a kickoff. (Done)
- Module: Dashboard | As a Sales Rep, I want to track security questionnaire and legal redlines with status updates.
- Module: Dashboard | As a Sales Rep, I want to track technical risks before demo/validation. (Done)
- Module: Dashboard | As a manager, I want pipeline and forecast rollups to include my descendant roles by default so I see the full team view.
- Module: Dashboard | As an executive, I can view confidence-weighted pipeline totals
- Module: Dashboard | Confidence-weighted forecast card
- Module: Dashboard | Epistemic summary widgets (Truth Coverage, Confidence, Time-to-Truth)
- Module: Dashboard | Risk Register summary widget
- Module: Dashboard | Hierarchy-based H1/H2 dashboard packs + reset
- Module: Leads | As a manager, score breakdown aligns with CQVS labels (Company fit, Qualification readiness, Value/Problem severity, Stakeholder access) (In progress: explicit C/Q/V/S labeling pending)
- Module: Leads | As a rep, AI suggests next evidence to resolve weakest signal
- Module: Leads | As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet"
- Module: Leads | As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor
- Module: Leads | As a rep, I see an inline qualification status summary with confidence + weakest signal
- Module: Leads | As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at‑risk deals, and my forecast snapshot so I can prioritize work immediately.
- Module: Leads | As a Sales Rep, I want lead creation guardrails (owner default, validation, tab gating, assignment/owner read-only by configurable security level, phone type lookup, intl phone entry) so the record is clean from day one.
- Module: Leads | As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.
- Module: Leads | As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow‑up date, Qualified notes) to keep data clean.
- Module: Leads | As a Sales Rep, I want new leads automatically assigned with an SLA timer and first‑touch task so I never miss initial outreach (cadence touch auto‑completes the open first‑touch task).
- Module: Leads | As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach.
- Module: Leads | As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.
- Module: Leads | As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date.
- Module: Leads | As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward.
- Module: Leads | As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (Done)
- Module: Leads | Configurable qualification policy + conversion guardrails
- Module: Opportunities | As a Sales Rep, I want alerts for deals with no next step or no activity in X days so I can recover risk early.
- Module: Opportunities | As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate.
- Module: Opportunities | As a Sales Rep, I want insights on deals without activity or next steps so I can fix gaps early.
- Module: Opportunities | As a Sales Rep, I want renewal tasks created and tracked like any opportunity.
- Module: Opportunities | As a Sales Rep, I want stage‑specific activity templates so I can log actions faster.
- Module: Opportunities | As a Sales Rep, I want stage‑specific exit criteria (required fields, next step) so stage progression reflects reality.
- Module: Opportunities | As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal. (Done)
- Module: Opportunities | As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome. (Done)
- Module: Opportunities | As a Sales Rep, I want to mark deals as Commit only when verified and expected to close.
- Module: Opportunities | As a Sales Rep, I want to schedule discovery and log notes before leaving the stage. (Done)
- Module: Opportunities | As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one.
- Module: Settings | As an Admin, I want to set first-touch SLA hours so lead response expectations are enforced.
- Module: Settings | As an Admin, I want to create stage automation rules that generate tasks when a deal enters a stage.
- Module: Settings | As a user, I want to configure email alert types and thresholds so notifications match my workflow.
- Module: Settings | As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded.
- Module: Settings | As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback.
- Module: Settings | Approval Settings page
- Module: Settings | Qualification Policy page
- Module: Settings | Contextual Threshold Rules page
- Module: Settings | As an Admin, I want currencies sourced from the system reference data so selectors stay consistent. (Done)
- Module: Settings | As an Admin, I want settings navigation grouped into People & Access, Workspace & Org, Workflow & Rules, and Trust & Audit so I can find policies quickly and scale as new settings are added.
- Module: Settings | As an Admin, I want the Security Level edit dialog to use the default UI layout with a liquid-glass feel so editing feels consistent and easy to scan.
- Module: Settings | As an Admin, I want invited users who have never logged in to show the invitation sent date/time (and latest resend date/time) so I can track onboarding progress and follow up accurately.
- Module: Settings | As an Admin, I want permissions grouped by capability with role intent views so roles are consistent and easy to audit. (Done)
- Module: Settings | As an Admin, I want policy gates for high-risk actions (discount %, deal size, stage gates) so enforcement is consistent. (Done)
- Module: Settings | As an Admin, I want separate permissions for request/approve/override so edit rights do not grant approvals. (Must)
- Module: Settings | As an Admin, I want H1/H2/H3 packs as presets with role drift tracking so I can safely customize roles. (Done)
- Module: Settings | As an Admin, I want a role hierarchy with computed depth (no manual level input) so reporting lines are clear and consistent. (Done)
- Module: Settings | As an Admin, I want reporting visibility scope per role (Self/Team/All) so manager rollups are correct and configurable.
- Module: Settings | As an Admin, I want named dashboard templates so default Command Center layouts are not hard-coded and can be reused.
- Module: Settings | As a Super Admin, I want to manage configurable security levels (create/edit/delete, set default) so high-risk actions are gated independently of hierarchy with no hard-coded tiers.
- Module: Settings | As an Admin, I want People & Access tabs to preserve tab/filter context and provide inline Security Level actions (set default, duplicate) so admin work is faster and stable after navigation/refresh. (Done) (ClickUp: 86dztkycq)
- Next
- Risk & Cost of Not Knowing
  - Module: Dashboard | As a manager, I want a deal-level Cost of Not Knowing breakdown so I can see which missing factors drive exposure. (Done)
  - Module: Dashboard | As a manager, I want an exposure rollup with drill-down to the top contributing deals so I can focus coaching. (Done)
  - Module: Dashboard | As a manager, I want an exposure trend line (4–8 weeks) to see if uncertainty is improving or worsening. (Done)
  - Module: Settings | As an admin, I want configurable exposure weights per qualification factor so Cost of Not Knowing reflects my business. (Done)
- Tenant setting for module packs
