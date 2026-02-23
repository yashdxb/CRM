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

### Architecture Classification Sync (ClickUp -> Docs)
- Sync date: **February 16, 2026**
- ClickUp source list: `CRM Backlog` (`901710720381`)
- Stories analyzed and updated in ClickUp: **86**
- Classification totals:
  - `Simple Flow`: **39**
  - `Complex Orchestration`: **47**
- Full per-story snapshot: `docs/CLICKUP_ARCH_CLASSIFICATION_SYNC.md`
- Classification rule source: `docs/PROJECT_BACKLOG.md` -> `Hybrid CQRS Implementation Checklist (Execution)`

### AI Assistant Knowledge Grounding Sync (ClickUp -> Docs)
- Sync date: **February 18, 2026**
- Epic: `Epic | AI Assistant | Knowledge Grounding & Retrieval` (ClickUp: `86dzw8unp`)
- Stories created:
  - `86dzw8uug` — Module: Assistant | Azure AI Search index setup automation
  - `86dzw8uuk` — Module: Assistant | Knowledge manifest validation/generation
  - `86dzw8uuu` — Module: Assistant | Azure Search publishing with safe ids
  - `86dzw8uuv` — Module: Assistant | Grounded response policy for real workflows
  - `86dzw8uuw` — Module: Assistant | Login-to-logout + lead field reference coverage
  - `86dzw8uux` — Module: Assistant | Foundry runtime retrieval hookup + prompt QA
- AI orchestration stories created:
  - `86dzwn0c7` — Module: Assistant | Next-best-action orchestration engine from live CRM signals
  - `86dzwn0cr` — Module: Assistant | At-risk pipeline autopilot recommendations (SLA/stale/no-next-step)
  - `86dzwn0dk` — Module: Assistant | Approval copilot with policy-aware request guidance
  - `86dzwn0e4` — Module: Assistant | Manager coaching orchestration with acknowledgment tasks
  - `86dzwn0eq` — Module: Assistant | Forecast reliability risk signals in assistant responses
- Detailed snapshot: `docs/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md`

### AI Assistant Action Execution Sync (ClickUp -> Docs)
- Sync date: **February 19, 2026**
- Epic: `Epic | AI Assistant | Action Execution & Review Controls` (ClickUp: `86dzxrdp5`)
- Stories created:
  - `86dzxrdpm` — Module: Assistant | One-click low-risk actions (task/follow-up) with undo support
  - `86dzxrdq4` — Module: Assistant | Review-required flow for medium/high-risk assistant actions
  - `86dzxrdqr` — Module: Assistant | Action policy engine (risk tier + confidence threshold)
  - `86dzxrdqy` — Module: Assistant | Assistant action audit trail and acceptance telemetry
  - `86dzxrdr4` — Module: Assistant | Dashboard action queue execute/review UX and state badges
  - `86dzxrdrk` — Module: Assistant | Role-scope enforcement for action visibility and execution
  - `86dzxrdru` — Module: Assistant | E2E coverage for assistant action execution paths
- Detailed snapshot: `docs/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md`

### AI Orchestration Story Clarification (Dedup / Same-Meaning Mapping)
- Cross-check source: `docs/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md` → `Capability Cross-Check` + `Story Clarification`
- Purpose: avoid duplicate ClickUp stories when different wording describes the same capability outcome or implementation slice.

- **Outcome stories (what the AI should do)**:
  - `86dzwn0c7` — Next-best-action orchestration engine from live CRM signals
  - `86dzwn0cr` — At-risk pipeline autopilot recommendations (SLA/stale/no-next-step)
  - `86dzwn0dk` — Approval copilot with policy-aware request guidance
  - `86dzwn0e4` — Manager coaching orchestration with acknowledgment tasks
  - `86dzwn0eq` — Forecast reliability risk signals in assistant responses
  - `86dzzkby0` — Truth gap resolution loop with CQVS-targeted evidence tasks
  - `86dzzkby4` — Playbook runtime by stage/segment with artifact gating
  - `86dzzkby7` — Closed-loop learning from suggestion adoption and outcomes

- **Execution-control stories (how we safely deliver the outcome)**:
  - `86dzxrdpm`, `86dzxrdq4`, `86dzxrdqr`, `86dzxrdqy`, `86dzxrdr4`, `86dzxrdrk`, `86dzxrdru`
  - These support orchestration delivery and should not be treated as duplicate product outcomes.

- **Known wording overlap (same/similar intent, different phrasing)**:
  - “Next-best-action guidance” backlog wording may overlap with `86dzwn0c7` / `86dzwn0cr`
  - Existing approval workflow stories are not duplicates of `Approval Copilot` (AI guidance vs workflow mechanics)
  - Existing coaching task/review thread features are not duplicates of `Manager Coaching Orchestration` (AI orchestration vs workflow primitives)

- **Current story coverage vs strategic 8-item AI orchestration target**:
  - Outcome story coverage is now complete in ClickUp (8/8) after adding:
    - `86dzzkby0` (truth-gap resolution loop)
    - `86dzzkby4` (playbook runtime)
    - `86dzzkby7` (closed-loop learning)
  - Telemetry support exists (`86dzxrdqy`) but implementation still needs full learning-loop behavior beyond audit telemetry.

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

## Canonical User Stories (Epic-Based, Normalized)

Canonical story catalog (normalized from ClickUp CRM Backlog + local sync notes).

### Rules for This Canonical Section
- Keep only canonical user stories and explicitly marked implementation/UI tasks.
- Merge same-output duplicates before classification (`Simple Flow` vs `Complex Orchestration`).
- Use epic grouping + ordered flow to preserve implementation sequence.
- If wording changes but output stays the same, keep one primary story and record aliases in sync docs (do not add a duplicate story line).

### Epic Status Summary (Doc-Annotated Snapshot)

Status source rules for this summary:
- `Completed / In progress / Must` counts below come from inline markers in this document.
- Existing inline `(Done)` markers are interpreted as `Completed` for now (legacy wording retained in story lines).
- `Unmarked` means no explicit inline completion marker in this document (not automatically `not-started`).
- For AI orchestration (`Epic 1`), implementation status is additionally governed by `docs/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md` and `docs/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md`.
- ClickUp story existence is tracked separately from implementation completion.

| Epic | Stories | Completed | In progress | Must | Unmarked | Epic status (current) | Notes |
|---|---:|---:|---:|---:|---:|---|---|
| Epic 1 - AI Revenue Execution Orchestration | 15 | 0 | 0 | 0 | 15 | `partial` | 8/8 outcome stories now exist in ClickUp; implementation still partial/not-started across items |
| Epic 2 - Lead Intake, Qualification, Evidence, and Conversion | 15 | 1 | 1 | 0 | 13 | `partial` | CQVS labeling explicitly marked in progress |
| Epic 3 - Activity Discipline, Next-Step Hygiene, and Coaching Signals | 5 | 0 | 0 | 0 | 5 | `partial` | No explicit done markers; do not infer completion from surrounding features |
| Epic 4 - Opportunity Execution, Recovery, and Stage Discipline | 9 | 3 | 0 | 0 | 6 | `partial` | Several core stage-flow stories done; recovery/forecast discipline still open |
| Epic 5 - Dashboard Command Center, Forecast, and Truth Visibility | 14 | 3 | 0 | 0 | 11 | `partial` | Mix of delivered widgets and open command-center/reporting items |
| Epic 6 - Sales Motion Workflow (Qualification to Handoff) | 9 | 5 | 0 | 0 | 4 | `partial` | Later-stage workflow and handoff largely delivered; remaining items still open |
| Epic 7 - Contacts and Buying Group Mapping | 3 | 1 | 0 | 0 | 2 | `partial` | Core contact context done; buying-group mapping still open |
| Epic 8 - Governance, Approvals, and Workspace Settings | 11 | 3 | 0 | 1 | 7 | `partial` | Contains one `Must` policy permission story; settings/admin work mixed |
| Epic 9 - People, Access, Security Levels, and Role-Based Packs | 8 | 4 | 0 | 0 | 4 | `partial` | Strong delivery progress; module packs item still placeholder wording |

### Epic 1 | AI Revenue Execution Orchestration (Predominantly `Complex Orchestration`)
1. `Module: Assistant | Next-best-action orchestration engine from live CRM signals`
2. `Module: Assistant | At-risk pipeline autopilot recommendations (SLA/stale/no-next-step)`
3. `Module: Assistant | Approval copilot with policy-aware request guidance`
4. `Module: Assistant | Manager coaching orchestration with acknowledgment tasks`
5. `Module: Assistant | Forecast reliability risk signals in assistant responses`
6. `Module: Assistant | Truth gap resolution loop with CQVS-targeted evidence tasks`
7. `Module: Assistant | Playbook runtime by stage/segment with artifact gating`
8. `Module: Assistant | Closed-loop learning from suggestion adoption and outcomes`
9. `Module: Assistant | One-click low-risk actions (task/follow-up) with undo support`
10. `Module: Assistant | Review-required flow for medium/high-risk assistant actions`
11. `Module: Assistant | Action policy engine (risk tier + confidence threshold)`
12. `Module: Assistant | Assistant action audit trail and acceptance telemetry`
13. `Module: Assistant | Dashboard action queue execute/review UX and state badges`
14. `Module: Assistant | Role-scope enforcement for action visibility and execution`
15. `Module: Assistant | E2E coverage for assistant action execution paths`

### Epic 2 | Lead Intake, Qualification, Evidence, and Conversion
1. `Module: Leads | As a Sales Rep, I want lead creation guardrails (owner default, validation, tab gating, assignment/owner read-only by configurable security level, phone type lookup, intl phone entry) so the record is clean from day one.`
2. `Module: Leads | As a Sales Rep, I want new leads automatically assigned with an SLA timer and first-touch task so I never miss initial outreach (cadence touch auto-completes the open first-touch task).`
3. `Module: Leads | As a Sales Rep, I want the lead record to show source, score, and routing reason so I can tailor outreach.`
4. `Module: Leads | As a Sales Rep, I want to log outcomes (Connected / Voicemail / No Response) and next steps so my pipeline is always up to date.`
5. `Module: Leads | As a Sales Rep, I want lead outcomes enforced (Disqualified reason, Nurture follow-up date, Qualified notes) to keep data clean.`
6. `Module: Leads | As a Sales Rep, I want to qualify leads by company fit, authority, need, and timing so only real opportunities move forward.`
7. `Module: Leads | Configurable qualification policy + conversion guardrails`
8. `Module: Leads | As a manager, score breakdown aligns with CQVS labels (Company fit, Qualification readiness, Value/Problem severity, Stakeholder access) (In progress: explicit C/Q/V/S labeling pending)`
9. `Module: Leads | As a rep, AI suggests next evidence to resolve weakest signal`
10. `Module: Leads | As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet"`
11. `Module: Leads | As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor`
12. `Module: Leads | As a rep, I see an inline qualification status summary with confidence + weakest signal`
13. `Module: Leads | As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.`
14. `Module: Leads | As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.`
15. `Module: Leads | As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (Done)`

### Epic 3 | Activity Discipline, Next-Step Hygiene, and Coaching Signals
1. `Module: Activities | As a Sales Rep, I want every activity to require an outcome and a next step with due date, ensuring pipeline hygiene.`
2. `Module: Activities | As a Sales Rep, I want quick actions (log activity, create task, schedule meeting) from the home view to reduce friction.`
3. `Module: Activities | As a Sales Rep, I want review outcomes (Needs Work / Escalate) to create acknowledgment tasks with due dates.`
4. `Module: Activities | As a Sales Rep, I want the system to surface opportunities missing next steps.`
5. `Module: Activities | As a system, automation creates tasks for unresolved high-impact factors`

### Epic 4 | Opportunity Execution, Recovery, and Stage Discipline
1. `Module: Opportunities | As a Sales Rep, I want to set opportunity name, value, close date, and initial stage so the deal is trackable from day one.`
2. `Module: Opportunities | As a Sales Rep, I want to schedule discovery and log notes before leaving the stage. (Done)`
3. `Module: Opportunities | As a Sales Rep, I want to capture demo outcomes and feedback; stage progression should require a demo outcome. (Done)`
4. `Module: Opportunities | As a Sales Rep, I want stage-specific exit criteria (required fields, next step) so stage progression reflects reality.`
5. `Module: Opportunities | As a Sales Rep, I want stage-specific activity templates so I can log actions faster.`
6. `Module: Opportunities | As a Sales Rep, I want alerts and actionable insights for deals with no next step or no activity in X days so I can recover risk early.` (merged duplicate intent from prior alert/insight variants)
7. `Module: Opportunities | As a Sales Rep, I want forecast category enforced at stage changes so forecasts stay accurate.`
8. `Module: Opportunities | As a Sales Rep, I want to mark deals as Commit only when verified and expected to close.`
9. `Module: Opportunities | As a Sales Rep, I want renewal tasks created and tracked like any opportunity.`
10. `Module: Opportunities | As a Sales Rep, I want the system to create onboarding tasks, assign delivery/CS, set renewal date, and lock the deal. (Done)`

### Epic 5 | Dashboard Command Center, Forecast, and Truth Visibility
1. `Module: Dashboard | As a Sales Rep, I want a daily command center showing tasks due/overdue, new leads, pipeline by stage, at-risk deals, and my forecast snapshot so I can prioritize work immediately.` (moved from Leads; dashboard-owned experience)
2. `Module: Dashboard | As a Sales Rep, I want personal pipeline and forecast reports to track progress to quota.`
3. `Module: Dashboard | As a manager, I want pipeline and forecast rollups to include my descendant roles by default so I see the full team view.`
4. `Module: Dashboard | As an executive, I can view confidence-weighted pipeline totals`
5. `Module: Dashboard | Confidence-weighted forecast card`
6. `Module: Dashboard | As a manager, I can see Truth Coverage and Time-to-Truth per deal`
7. `Module: Dashboard | As a manager, I see top truth gaps across pipeline`
8. `Module: Dashboard | As a rep, I can view Risk Register flags derived from CQVS (Company fit, Qualification readiness, Value/Problem severity, Stakeholder access)`
9. `Module: Dashboard | As a Sales Rep, I want a structured checklist to flag risks early.`
10. `Module: Dashboard | Epistemic summary widgets (Truth Coverage, Confidence, Time-to-Truth)`
11. `Module: Dashboard | Risk Register summary widget`
12. `Module: Dashboard | As a manager, I want a deal-level Cost of Not Knowing breakdown so I can see which missing factors drive exposure. (Done)`
13. `Module: Dashboard | As a manager, I want an exposure rollup with drill-down to the top contributing deals so I can focus coaching. (Done)`
14. `Module: Dashboard | As a manager, I want an exposure trend line (4-8 weeks) to see if uncertainty is improving or worsening. (Done)`
15. `Module: Dashboard | As a Sales Rep, I want the CRM to guide execution, not just store data - enforcing discipline, protecting forecast accuracy, and enabling clean handoffs.` (vision-level story; keep as umbrella outcome)
16. `Module: Dashboard | Hierarchy-based H1/H2 dashboard packs + reset`

### Epic 6 | Sales Motion Workflow (Qualification to Handoff)
1. `Module: Dashboard | As a Sales Rep, I want to capture requirements, buying process, and success criteria to qualify fit.`
2. `Module: Dashboard | As a Sales Rep, I want to confirm pain, decision maker, and next step before advancing.`
3. `Module: Dashboard | As a Sales Rep, I want to track technical risks before demo/validation. (Done)`
4. `Module: Dashboard | As a Sales Rep, I want to involve pre-sales and document scope/approach for alignment. (Done)`
5. `Module: Dashboard | As a Sales Rep, I want to generate a quote/proposal, request discounts if needed, and track legal/security needs. (Done)`
6. `Module: Dashboard | As a Sales Rep, I want to track security questionnaire and legal redlines with status updates.`
7. `Module: Dashboard | As a Sales Rep, I want to provide handoff notes and trigger a kickoff. (Done)`
8. `Module: Dashboard | As a Sales Rep, I want to flag expansion signals and create expansion opportunities with linked context. (Done)`
9. `Module: Dashboard | As a Sales Rep, I want renewal opportunities auto-created at 90/60/30 days so renewal motions are never missed.`

### Epic 7 | Contacts and Buying Group Mapping
1. `Module: Contacts | As a Sales Rep, I want to add account team members (pre-sales, manager) for shared ownership.`
2. `Module: Contacts | As a Sales Rep, I want to see account history and related accounts so I can avoid duplication and understand context. (Done)`
3. `Module: Contacts | As a Sales Rep, I want to tag contacts by buying role (Decision Maker, Champion, Influencer, Procurement, Technical Evaluator) to map the buying group.`

### Epic 8 | Governance, Approvals, and Workspace Settings
1. `Module: Settings | As an Admin, I want to set first-touch SLA hours so lead response expectations are enforced.`
2. `Module: Settings | As an Admin, I want to create stage automation rules that generate tasks when a deal enters a stage.`
3. `Module: Settings | As a user, I want to configure email alert types and thresholds so notifications match my workflow.`
4. `Module: Settings | As a Sales Rep, I want to submit pricing/discount approvals and see status + manager feedback.`
5. `Module: Settings | As a Sales Rep, I want to finalize pricing, record objections, and update probability/close date with approvals if thresholds are exceeded.`
6. `Module: Settings | As an Admin, I want policy gates for high-risk actions (discount %, deal size, stage gates) so enforcement is consistent. (Done)`
7. `Module: Settings | As an Admin, I want separate permissions for request/approve/override so edit rights do not grant approvals. (Must)`
8. `Module: Settings | As an Admin, I want configurable exposure weights per qualification factor so Cost of Not Knowing reflects my business. (Done)`
9. `Module: Settings | As an Admin, I want currencies sourced from the system reference data so selectors stay consistent. (Done)`
10. `Module: Settings | As an Admin, I want settings navigation grouped into People & Access, Workspace & Org, Workflow & Rules, and Trust & Audit so I can find policies quickly and scale as new settings are added.`
11. `Module: Settings | As an Admin, I want named dashboard templates so default Command Center layouts are not hard-coded and can be reused.`

### Epic 9 | People, Access, Security Levels, and Role-Based Packs
1. `Module: Settings | As a Super Admin, I want to manage configurable security levels (create/edit/delete, set default) so high-risk actions are gated independently of hierarchy with no hard-coded tiers.`
2. `Module: Settings | As an Admin, I want the Security Level edit dialog to use the default UI layout with a liquid-glass feel so editing feels consistent and easy to scan.`
3. `Module: Settings | As an Admin, I want invited users who have never logged in to show the invitation sent date/time (and latest resend date/time) so I can track onboarding progress and follow up accurately.`
4. `Module: Settings | As an Admin, I want permissions grouped by capability with role intent views so roles are consistent and easy to audit. (Done)`
5. `Module: Settings | As an Admin, I want a role hierarchy with computed depth (no manual level input) so reporting lines are clear and consistent. (Done)`
6. `Module: Settings | As an Admin, I want reporting visibility scope per role (Self/Team/All) so manager rollups are correct and configurable.`
7. `Module: Settings | As an Admin, I want H1/H2/H3 packs as presets with role drift tracking so I can safely customize roles. (Done)`
8. `Module: Settings | As an Admin, I want People & Access tabs to preserve tab/filter context and provide inline Security Level actions (set default, duplicate) so admin work is faster and stable after navigation/refresh. (Done) (ClickUp: 86dztkycq)`
9. `Module: Settings | Tenant setting for module packs` (placeholder wording retained; rewrite with full actor/outcome before implementation)

### Supporting Implementation/UI Tasks (Non-Canonical User Stories)
- `Module: Settings | Approval Settings page`
- `Module: Settings | Qualification Policy page`
- `Module: Settings | Contextual Threshold Rules page`

### Legacy Theme Labels / Backlog Notes (Non-Canonical)
- `Approval workflow (optional)`
- `As a manager, uncertainty exposure is quantified (Cost of Not Knowing)`
- `As a system, confidence is calibrated against outcomes`
- `Coaching & Management`
- `Conditional Forecasting`
- `CSV import/export flow`
- `Epistemic Metrics Core (Done)`
- `Epistemic State + Evidence Governance`
- `Feedback Loop + Weakest Signal`
- `Later - Dedicated Award Screen (SCM)`
