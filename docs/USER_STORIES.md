# CRM Enterprise User Stories (All Roles)

> **Doc Role**
> - **Source of truth**: **Yes (Canonical)**
> - **Canonical scope**: Normalized epic-based user stories and ClickUp story sync snapshots documented here
> - **Companion canonical doc**: `docs/PROJECT_MASTER.md` (project contract, architecture/UI/ops standards)
> - **Master registry**: `docs/DOCS_INDEX.md`

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

### Decision Inbox & Approval Workflow Roadmap Sync (ClickUp -> Docs)
- Sync date: **February 25, 2026**
- Epic: `Epic | Decision Inbox | Approval Workflow Orchestration & Operations` (ClickUp: `86e00nx1x`)
- Purpose: Track the enterprise Decision Inbox / approval workflow modernization roadmap in `Now / Next / Later` buckets without rewriting existing approval mechanics already in production.
- Duplicate-aware note:
  - This roadmap **extends** existing approval workflow/rules.
  - Some assistant execution mechanics already exist under `Epic | AI Assistant | Action Execution & Review Controls` (`86dzxrdp5`) and should be treated as supporting stories, not duplicates.

**Now (Completed - Enterprise MVP baseline)**
- `86e00nx2e` — Module: Approvals | Generic `DecisionRequest + DecisionStep` engine with audit log (`Completed`)
  - Implemented: persisted tables (`DecisionRequests`, `DecisionSteps`, `DecisionActionLogs`), generic inbox API, history API, approve/reject/request-info/delegate actions, generic-first inbox reads with legacy fallback.
  - Implemented: linked decision approve/reject now executes generic `DecisionRequest/DecisionStep` progression first and uses legacy approval-chain rows as a compatibility projection (not legacy `DecideAsync` progression authority).
  - Implemented: linked approval audit/queue side-effects (`ApprovalGranted/Rejected`, `ApprovalStepQueued`, queue enqueue) were extracted into generic decision orchestration hooks; legacy chain sync now acts as compatibility projection.
  - Hardening moved to **Next**: reduce legacy compatibility chain to pure read/projection behavior and move remaining linked workflow semantics into generic orchestration policies/hooks.
- `86e00nx2r` — Module: Approvals | Decision Inbox list page (`My Decisions`, `Team Queue`) (`Completed`)
  - Implemented: enterprise split-pane inbox, queue tabs (`My`, `Team`, `Attention`, `Completed`), child menu shell (`Inbox`, `Approvals`, `AI Reviews`, `Policies & SLA`, `Decision History`).
- `86e00nx2v` — Module: Approvals | Discount/exception workflow routed through Decision Inbox engine (`Completed`)
  - Implemented: Opportunity form approval request create path now calls generic decision API; backend bridges to existing approval chain; generic actions and generic-first inbox rendering are active.
  - Implemented: linked approve/reject compatibility path now resolves the target legacy approval from the generic `DecisionStep` current pending step (cutover bridge toward generic progression authority).
  - Implemented: linked approve/reject path now writes canonical generic `DecisionRequest/DecisionStep` progression state while legacy approval chain runs in compatibility mode (`syncDecisionRequest=false`).
  - Implemented: linked approve/reject no longer calls legacy approval `DecideAsync` for progression; generic progression is canonical and legacy rows/chains are synchronized as compatibility projection (including next-step queue row materialization).
  - Hardening moved to **Next**: retire remaining legacy progression assumptions and complete generic-first orchestration ownership.
- `86e00nx34` — Module: Approvals | SLA countdown + escalation on decision steps (`Completed`)
  - Implemented: SLA status in inbox/detail, audited escalation marker, background escalation worker, assignee email alerts, approver-role fallback, `Sales Manager` fallback.
  - Implemented: persisted `DecisionEscalationPolicy` workspace setting + Decision Inbox `Policies & SLA` quick controls (admin-editable) driving worker behavior (enable/email/assignee/step-role/fallback role).
  - Hardening moved to **Next**: richer escalation routing matrix/rules and full policy editor support.
- `86e00nx3c` — Module: Assistant | AI decision summary + rationale draft in Decision Inbox (assist only) (`Completed`)
  - Implemented: `Draft rationale` action, assist-only summary, recommended action chip, draft note insertion for approve/reject/request-info.

**Detailed implementation stories (created under Decision Inbox epic, support the roadmap stories above)**
- `86e01ft01` — Module: Approvals | Decision Inbox child-menu shell + scoped child views (`Completed`)
- `86e01ft0h` — Module: Approvals | Decision History page (real data, filters, table, Inbox deep-link) (`Completed`)
- `86e01ft0y` — Module: Approvals | Policies & SLA read page (workflow policy + SLA health + escalation visibility) (`Completed`)
- `86e01ft2m` — Module: Approvals | Decision Inbox `Request Info` + `Delegate` actions (generic engine + legacy compatibility) (`Completed`)
- `86e01ft2q` — Module: Approvals | Decision SLA escalation automation worker + notification fallback chain (`In progress`)
- `86e01p4b2` — Module: Approvals | Linked approval action target resolution from generic `DecisionStep` current pending step (cutover bridge) (`Completed`)
- `86e01pga2` — Module: Approvals | Linked approve/reject generic canonical state write with legacy compatibility execution (`Completed`)
- `86e01pga8` — Module: Approvals | Persisted DecisionEscalationPolicy + Decision Inbox Policies & SLA quick controls (`Completed`)
- `86e01pmkp` — Module: Approvals | Generic linked approval progression cutover (legacy chain compatibility projection sync after generic decision execution) (`Completed`)
- `86e01x75p` — Module: Approvals | Extract linked approval side-effects into generic-first orchestration hooks (legacy sync projection-only) (`Completed`)
- `PENDING-CU-STAGEOVR-1` — Module: Approvals | Stage override request path from Opportunity form creates generic `StageOverride` decision via Decision Inbox (`Completed`, pending ClickUp sync)
- `PENDING-CU-STAGEOVR-2` — Module: Approvals | Approved `StageOverride` decision executes audited opportunity stage override (`Completed`, pending ClickUp sync)

**Next**
- `86e00nx3h` — Module: Approvals | Stage override approvals routed through Decision Inbox (`Completed`)
- `86e00nx3t` — Module: Assistant | High-risk AI action review routed into Decision Inbox
- `86e00nx40` — Module: Approvals | Delegation and out-of-office routing
- `86e00nx4c` — Module: Dashboard | Decision inbox KPIs (pending / overdue / cycle time / bottlenecks)
- `86e01xvgb` — Module: Approvals | Generic linked workflow orchestration hardening (reduce legacy chain to pure projection/read compatibility)
- `86e01xvgq` — Module: Approvals | Escalation routing matrix and notification policy editor in Decision module
- `86e01xvh0` — Module: Approvals | Generic orchestration policy hooks for linked approval workflows (step activation / notifications / audit policy)

**Later**
- `86e00nx4j` — Module: Approvals | Parallel approvals
- `86e00nx4q` — Module: Approvals | Advanced routing (segment / region / product)
- `86e00nx4x` — Module: Approvals | Approval analytics + bottleneck insights
- `86e00nx5b` — Module: Approvals | Closed-loop policy tuning

**Related existing stories (supporting, not duplicates)**
- `86dzxrdq4` — Review-required flow for medium/high-risk assistant actions
- `86dzxrdqr` — Action policy engine (risk tier + confidence threshold)
- `86dzxrdqy` — Assistant action audit trail and acceptance telemetry
- `86dzxrdr4` — Dashboard action queue execute/review UX and state badges

### Recent UI/UX Implementation Sync (ClickUp -> Docs)
- Sync date: **February 26, 2026**
- Scope: Dashboard pack management ordering UX, Lead Edit page width/responsiveness, Qualification Policy page Factor Evidence Mapping readability + visual polish, Deal form sticky-summary responsive hardening
- Purpose: Capture detailed implementation stories for recent UI/UX work without duplicating canonical Epic 2 / Epic 5 / Epic 8 story wording.

**Detailed implementation stories (Completed)**
- `86e02gm0t` — Module: Dashboard | Pack management row drag-and-drop ordering in Customize Layout (exact drop position)
  - Implemented: Angular CDK vertical row drag/drop in Dashboard pack management customize-layout dialog (`cdkDropList`/`cdkDrag`) with drag handle + row index.
  - Implemented: exact drop positioning replaces prior PrimeNG `p-orderList` drag behavior for more reliable row ordering.
- `86e02gm15` — Module: Leads | Lead Edit page full-width content lane + mobile-first responsive width parity with Customer Workspace
  - Implemented: removed nested width caps on Lead Edit header/form/related summary containers so the page fills the CRM content lane like Customer Workspace.
  - Implemented: desktop/tablet/mobile width and overflow validation (Playwright) with no horizontal overflow.
- `86e02gm19` — Module: Settings | Qualification Policy page full-width alignment + Factor Evidence Mapping readable vivid card redesign
  - Implemented: fixed Qualification Policy content container alignment and removed reserved side-lane gap behavior.
  - Implemented: Factor Evidence Mapping redesigned as full-width stacked factor cards with vivid per-factor color accents and improved readability.
- `PENDING-CU-DEAL-RESP-1` — Module: Opportunities | Deal sticky-summary cards responsive hardening for narrow/laptop widths (`Completed`, pending ClickUp sync)
  - Implemented: summary card grid now uses auto-fit columns to prevent card squeeze/overlap at intermediate viewport widths.
  - Implemented: risk/approval status badges now wrap safely (no clipped text) with mobile fallback to single-column summary layout.
- `CU-MARKETING-MVP-1` — Module: Marketing | Campaign Management MVP with first-touch campaign-to-opportunity attribution (`Completed`, ClickUp synced under `86e02y3za` subtasks)
  - Implemented: new Marketing module routes + sidebar nav (`Campaigns`, `Add Campaign`, `Attribution`) with `Permissions.Marketing.View/Manage` gating and role matrix integration.
  - Implemented: backend `api/marketing` endpoints for campaign CRUD/archive, member add/remove, campaign detail/performance, and attribution summary.
  - Implemented: new `Campaign`, `CampaignMember`, and `CampaignAttribution` entities/tables with tenant-safe indexing and uniqueness constraints for first-touch attribution.
  - Implemented: first-touch attribution recomputation hooks on opportunity create/update/delete and campaign member changes.
  - Implemented: frontend pages for Campaign list, Campaign form, Campaign detail workspace (overview/members/opportunities/performance), and attribution summary view.

### Competitive Audit Roadmap Sync (ClickUp -> Docs)
- Sync date: **February 26, 2026**
- Source: `docs/North_Edge_CRM_Competitive_Audit_Report.pdf` (competitive audit benchmark and gap roadmap)
- Epic: `Epic | Competitive Audit | Gap Closure, Parity, and Ecosystem Roadmap` (ClickUp: `86e02y3vw`)
- Purpose: Capture the competitive gap-closure roadmap (`Now / Next / Later`) as an execution epic with canonical stories in `CRM Backlog`, aligned to the audit report and dependency chain.
- Scope note:
  - This roadmap is competitive-gap and platform-parity focused (email, reports, CPQ, webhooks, marketing, service, mobile, ecosystem).
  - It extends existing CRM module epics and should not overwrite the already-active Decision Inbox / AI execution modernization track.
- Critical path from audit (tracked as sequencing guidance, not duplicate stories):
  - `Email Integration` -> `Product & Price Book` -> `Quote / Proposal` -> `Report Builder` -> `Webhook / Event System`

**Now (0–3 months) — Deal-breakers that block sales**
- `86e02y3w7` — Module: Communications | Bidirectional email integration (send + inbound reply sync) so reps can work from CRM without leaving reply context.
- `86e02y3xc` — Module: Reporting | Ad-hoc report builder (filters + grouping + chart + export) so VP/Director users can self-serve reporting.
- `86e02y3xh` — Module: Opportunities | Product catalog + price book attachment to opportunities so deal values are line-item based, not manual only.
- `86e02y3xr` — Module: Opportunities | Quote / proposal generation from opportunity products and pricing so reps can close inside CRM.
- `86e02y3xv` — Module: Settings | Custom fields management UI for admins so schema changes do not require developer intervention.
- `86e02y3y4` — Module: Leads | Web-to-lead / embeddable forms so website submissions create leads directly in CRM.
- `86e02y3yr` — Module: Reporting | Scheduled reports and digest delivery so managers receive recurring pipeline and performance summaries.
- `86e02y3z3` — Module: Integrations | Webhook / outbound event system so CRM changes can integrate with Slack/Teams/Zapier/Make/N8N.

**Next (3–6 months) — Competitive parity**
- `86e02y3za` — Module: Marketing | Campaign Management with campaign-to-opportunity attribution so marketing-to-sales pipeline is visible.
- `86e02y3zh` — Module: Contracts | Contract Management entity and lifecycle so renewal automation runs against real contracts.
- `86e02y3zv` — Module: Settings | Territory Management with territory-based routing/visibility so larger sales orgs can segment access.
- `86e02y400` — Module: Forecasting | Forecasting engine with target-vs-actual tracking so confidence-weighted pipeline becomes plan-vs-performance forecasting.
- `86e02y407` — Module: Data Quality | Cross-entity duplicate detection across leads, contacts, and accounts so duplicate prevention extends beyond leads.
- `86e02y40e` — Module: CRM Core | Structured notes + attachment system across records so reps can capture interaction context consistently.
- `86e02y40r` — Module: Marketing | Basic email marketing (lists + sends + engagement tracking) bridging CRM email integration and future automation.
- `86e02y40x` — Module: UX | Saved list views / filters so reps and managers can preserve table working views across modules.
- `86e02y41a` — Module: UX | Inline table editing for key fields so users avoid opening records for single-field changes.
- `86e02y3za0` — Module: Activities | Task / reminder automation on stage changes and workflow triggers so follow-up actions are generated automatically.

**Later (6–12 months) — Differentiation & Tier 1 push**
- `86e02y41r` — Module: Marketing | Full marketing automation (journeys, nurture, scoring) so CRM can replace a separate marketing platform.
- `86e02y420` — Module: Workflow | Visual workflow builder for business automation so admins can compose rule flows without code.
- `86e02y42d` — Module: Portal | Customer portal for self-service access so CRM extends into customer-facing collaboration.
- `86e02y42n` — Module: Service | Case / support ticketing so North Edge expands from Sales CRM to sales + service CRM.
- `86e02y42v` — Module: Platform | Plugin / extension framework so partners/customers can extend the platform safely.
- `86e02y431` — Module: Analytics | Advanced analytics & BI (pivot/cohort/drill-down) so teams can analyze beyond standard reports.
- `86e02y436` — Module: Integrations | Social media integration for enrichment and listening so reps have social context in CRM.
- `86e02y43b` — Module: AI | AI conversation intelligence (transcription, sentiment, coaching insights) so call interactions feed coaching and deal quality.
- `86e02y43h` — Module: Mobile | Native mobile app (iOS/Android, offline-first flows) for field sales execution.
- `86e02y41r0` — Module: Platform | Multi-language & localization (language packs, RTL, localization formatting) for global deployments.
- `86e02y41r1` — Module: Compliance | Audit & compliance suite (retention, field-level history, compliance controls) for enterprise governance.
- `86e02y41r2` — Module: Collaboration | Real-time collaboration (SignalR updates, presence, @mentions) across CRM workflows.

**Technical quick wins / accelerators from audit recommendations (separate from roadmap buckets)**
- `86e02y44n` — Module: Platform | SignalR real-time update foundation for notifications, Decision Inbox counts, and live stage/queue updates.
- `86e02y457` — Module: Access | SSO / SAML federation for enterprise identity integration.
- `86e02y45j` — Module: Integrations | Read-only OData or GraphQL access layer for power users and external integrations.

### SignalR Integration Opportunities (Detailed Stories, Refreshed Feb 27, 2026)

Epic alignment: `Epic 10 - Competitive Gap Closure, Platform Parity, and Ecosystem Expansion`.

Now stories (current implementation wave):
1. `Module: Platform | Realtime alert delivery from NotificationAlertWorker`
   ClickUp: `86e030ymv`
   As a CRM user, I want SLA/idle/coaching alerts pushed in-app in realtime so I do not need to refresh to see critical alerts.
   Acceptance:
   - `notification.alert` event emitted on worker alert send
   - tenant/user targeting respected
   - UI receives event and writes to notification inbox
   Status: `Implemented`.
2. `Module: Decisions | Realtime Decision Inbox create/update events`
   ClickUp: `86e030ymw`
   As an approver, I want decision requests and status changes to appear live so inbox badges and queues stay current.
   Acceptance:
   - `decision.created` on request creation
   - `decision.updated` on approve/reject/request-info/delegate
   - events include decision id + status + workflow context
   Status: `Implemented`.
3. `Module: Decisions | Realtime SLA escalation push`
   ClickUp: `86e030yxd`
   As an approver or manager, I want overdue decision escalations pushed immediately so SLA breaches are handled quickly.
   Acceptance:
   - `decision.sla.escalated` emitted by escalation worker
   - events target tenant and known assignee recipients
   Status: `Implemented`.
4. `Module: Opportunities | Pipeline stage-change push for live Kanban sync`
   ClickUp: `86e030yne`
   As a sales manager, I want stage transitions broadcast in realtime so board/list views reflect current pipeline flow.
   Acceptance:
   - `opportunity.stage.changed` emitted on stage updates
   - payload includes opportunity id/name + previous/next stage
   Status: `Implemented`.
5. `Module: Dashboard | Live metric delta broadcast`
   ClickUp: `86e030ynb`
   As an executive user, I want key metric deltas broadcast so dashboard tiles update without hard refresh.
   Acceptance:
   - `dashboard.metrics.delta` emitted from core entity changes (initial: opportunity stage changes)
   - payload identifies source and impacted values
   Status: `Implemented (initial scope)`.
6. `Module: Opportunities | Renewal automation realtime summaries`
   ClickUp: `86e030yxf`
   As an owner/manager, I want renewal automation outcomes pushed so newly created renewals are visible immediately.
   Acceptance:
   - `renewal.automation.completed` emitted when renewals/tasks created
   - payload includes renewal/task counts and timestamp
   Status: `Implemented (tenant summary)`.
7. `Module: Notifications | Email queue delivery status push`
   ClickUp: `86e030yxj`
   As a sender, I want sent/failed email delivery statuses pushed back so I can react without polling logs.
   Acceptance:
   - `email.delivery.status` emitted by email queue worker
   - sender-targeted push when request context is available
   - tenant-level fallback push when sender context is unavailable
   Status: `Implemented`.

Next stories (planned):
1. `Module: Assistant | Token streaming over SignalR`
   ClickUp: `86e030yn1`
   As a seller, I want token-by-token assistant output streaming so long responses feel immediate.
   Acceptance:
   - assistant endpoint supports `IAsyncEnumerable` stream
   - SignalR stream endpoint emits partial tokens and completion signals
   Status: `Planned`.
2. `Module: Collaboration | Realtime review threads on opportunities`
   ClickUp: `86e030yxm`
   As reviewers, I want live threaded comments on opportunities/decisions so collaboration is synchronous and traceable.
   Acceptance:
   - thread messages broadcast in realtime by record thread id
   - unread counts and mention notifications supported
   Status: `Planned`.
3. `Module: Collaboration | Record-level presence indicators`
   ClickUp: `86e030yxn`
   As users, I want to see who is currently viewing the same record so edits/reviews are coordinated.
   Acceptance:
   - connection tracking per record session
   - presence chips show active viewers on lead/opportunity pages
   Status: `Planned`.

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
| Epic 2 - Lead Intake, Qualification, Evidence, and Conversion | 16 | 2 | 1 | 0 | 13 | `partial` | CQVS labeling explicitly marked in progress |
| Epic 3 - Activity Discipline, Next-Step Hygiene, and Coaching Signals | 5 | 0 | 0 | 0 | 5 | `partial` | No explicit done markers; do not infer completion from surrounding features |
| Epic 4 - Opportunity Execution, Recovery, and Stage Discipline | 9 | 3 | 0 | 0 | 6 | `partial` | Several core stage-flow stories done; recovery/forecast discipline still open |
| Epic 5 - Dashboard Command Center, Forecast, and Truth Visibility | 14 | 3 | 0 | 0 | 11 | `partial` | Mix of delivered widgets and open command-center/reporting items |
| Epic 6 - Sales Motion Workflow (Qualification to Handoff) | 9 | 5 | 0 | 0 | 4 | `partial` | Later-stage workflow and handoff largely delivered; remaining items still open |
| Epic 7 - Contacts and Buying Group Mapping | 3 | 1 | 0 | 0 | 2 | `partial` | Core contact context done; buying-group mapping still open |
| Epic 8 - Governance, Approvals, and Workspace Settings | 13 | 5 | 0 | 1 | 7 | `partial` | Contains one `Must` policy permission story; settings/admin work mixed |
| Epic 9 - People, Access, Security Levels, and Role-Based Packs | 8 | 4 | 0 | 0 | 4 | `partial` | Strong delivery progress; module packs item still placeholder wording |
| Epic 10 - Competitive Gap Closure, Platform Parity, and Ecosystem Expansion | 30 | 0 | 0 | 0 | 30 | `partial` | Added from Feb 26 competitive audit roadmap (`Now / Next / Later`) and synced to ClickUp epic `86e02y3vw` |

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
7. `Module: Leads | Configurable qualification policy + conversion guardrails (including evidence enforcement and factor-to-evidence-source mapping)`
8. `Module: Leads | As a manager, score breakdown aligns with CQVS labels (Company fit, Qualification readiness, Value/Problem severity, Stakeholder access) (In progress: explicit C/Q/V/S labeling pending)`
9. `Module: Leads | As a rep, AI suggests next evidence to resolve weakest signal`
10. `Module: Leads | As a rep, evidence is disabled when a factor is Unknown and locked to "No evidence yet"`
11. `Module: Leads | As a rep, I see "Unknown / not yet discussed" preselected for every qualification factor`
12. `Module: Leads | As a rep, I see an inline qualification status summary with confidence + weakest signal`
13. `Module: Leads | As a Sales Rep, I want a single conversion action that creates Account + Contact + Opportunity and transfers activities/notes.`
14. `Module: Leads | As a Sales Rep, I want the lead to close automatically after conversion to avoid duplicate work.`
15. `Module: Leads | As a Sales Rep, I want a Supporting Documents tab on Lead Edit so I can upload, view, download, and delete evidence files (within workspace policy limits) and keep qualification/conversion proof attached to the lead. (Done) (ClickUp: 86e00gx2d)`
16. `Module: Leads | As a Sales Rep, I want to record loss reason, competitor, and notes so leadership can analyze trends. (Done)`

#### Epic 2 Implementation Note | Evidence Enforcement (Qualified Gate)
- **Approach (implemented)**: qualification factor selections are treated as claims, and evidence fields are treated as proof. `Evidence Coverage` is now a configurable policy gate before setting a lead to `Qualified`.
- **Approach refinement (implemented in Now)**: keep the six core qualification factors fixed for scoring and CQVS compatibility, but make their evidence behavior configurable (`Require evidence` + `Allowed evidence sources`) so reps see factor-relevant source choices and tenants can tune enforcement without changing factor keys.
- **Why this shape (enterprise-safe)**:
  - preserves stable scoring/CQVS/reporting keys (`budget`, `readiness`, `timeline`, `problem`, `economicBuyer`, `icpFit`)
  - removes rep confusion in evidence selection by filtering factor-specific source choices
  - avoids premature full dynamic factor-builder complexity in `Now`
- **Configuration (Settings -> Qualification Policy -> Evidence Enforcement)**:
  - `Require evidence before setting lead to Qualified` (default: `true`)
  - `Minimum evidence coverage (%)` (default: `50`)
- **Configuration (Settings -> Qualification Policy -> Factor Evidence Mapping)**:
  - factor-specific `Require evidence` toggle (Budget / Readiness / Timeline / Problem / Economic Buyer / ICP Fit)
  - factor-specific `Allowed evidence sources` multi-select (filters the Lead Qualification tab dropdowns per factor)
  - purpose: reduce rep confusion by showing only relevant evidence-source choices for each qualification factor
- **Backend enforcement (server-authoritative)**:
  - lead status transition validation blocks `Contacted -> Qualified` when evidence coverage is below tenant policy threshold
  - returns structured error code: `LEAD_STATUS_REQUIRES_EVIDENCE_COVERAGE`
- **Lead form UX (compact guidance)**:
  - progressive status dropdown hides `Qualified` until activity/factors/notes/evidence conditions are met (unless already in that status)
  - `Next recommended` chip shows `Add evidence` when evidence is the remaining blocker
  - inline status blocker message maps the structured server error code to a user-readable hint
  - evidence source dropdowns in Qualification tab are filtered by factor-specific policy mapping (with safe fallback to the global evidence catalog)
- **Next (backlog hardening)**:
  - configurable factor metadata (`label`, `help text`, `enabled`, `display order`) for the six core factors
  - optional full tenant factor catalog (custom factors) only after scoring/reporting/AI prompt contracts are versioned

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
11. `Module: Opportunities | As a deal participant, I want deal edits locked while approval is pending, with clear read-only indicators, so data remains policy-compliant until decision resolution. (Done)`
    - Acceptance criteria:
      - any pending approval on a deal locks deal mutations server-side (`Update`, `Owner`, `Stage`, `Team`, checklist, onboarding, `Delete`) for all deal editors.
      - UI shows top banner + sticky approval chip: `Approval Pending` with explicit read-only lock tooltip.
      - decision/approval actions remain available for approvers.
      - after approval resolves, requester lock is removed automatically.
      - lock violation returns a consistent API message: `Deal is locked while approval is pending.`

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
9. `Module: Settings | As an Admin, I want Qualification Policy to control factor-level evidence requirements and factor-specific evidence source choices so reps see only relevant evidence options in Lead Qualification and qualification gates remain enforceable. (Done)`
10. `Module: Settings | As an Admin, I want currencies sourced from the system reference data so selectors stay consistent. (Done)`
11. `Module: Settings | As an Admin, I want settings navigation grouped into People & Access, Workspace & Org, Workflow & Rules, and Trust & Audit so I can find policies quickly and scale as new settings are added.`
12. `Module: Settings | As an Admin, I want a global supporting document policy (max documents per record and max file size) so evidence uploads are enforced consistently across CRM transactions. (Done) (ClickUp: 86e00gx30)`
13. `Module: Settings | As an Admin, I want named dashboard templates so default Command Center layouts are not hard-coded and can be reused.`

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

### Epic 10 | Competitive Gap Closure, Platform Parity, and Ecosystem Expansion
1. `Module: Communications | As a Sales Rep, I want bidirectional email integration (send + inbound reply sync) so I can work from CRM without leaving reply context.`
2. `Module: Reporting | As a manager, I want an ad-hoc report builder (filters + grouping + chart + export) so I can self-serve pipeline and performance reporting without engineering support.`
3. `Module: Opportunities | As a Sales Rep, I want product catalog and price-book line items on opportunities so deal values are based on products instead of manual totals.`
4. `Module: Opportunities | As a Sales Rep, I want quote/proposal generation from opportunity products and pricing so I can send quotes without leaving CRM.`
5. `Module: Settings | As an Admin, I want a custom fields management UI so I can add and manage fields without developer changes.`
6. `Module: Leads | As a marketing or sales user, I want web-to-lead / embeddable forms so website inquiries create leads directly in CRM.`
7. `Module: Reporting | As a manager, I want scheduled reports and digest delivery so I receive recurring summaries without manual exports.`
8. `Module: Integrations | As an Admin, I want an outbound webhook/event system so CRM events can trigger Slack, Teams, Zapier, Make, and custom integrations.`
9. `Module: Marketing | As a marketing user, I want campaign management with campaign-to-opportunity attribution so I can measure marketing contribution to revenue.`
10. `Module: Contracts | As a revenue or CS user, I want contract management so renewals and obligations run against real contract records.`
11. `Module: Settings | As an Admin, I want territory management so routing, ownership, and visibility can be organized by territory at scale.`
12. `Module: Forecasting | As a manager, I want target-vs-actual forecasting on top of confidence-weighted pipeline so forecast accountability is measurable.`
13. `Module: Data Quality | As a user, I want cross-entity duplicate detection across leads, contacts, and accounts so duplicate prevention is consistent across CRM.`
14. `Module: CRM Core | As a user, I want structured notes and attachments across core entities so interactions and supporting context are stored consistently.`
15. `Module: Marketing | As a marketing user, I want basic email marketing (lists, sends, engagement tracking) so CRM email capabilities bridge toward marketing automation.`
16. `Module: UX | As a user, I want saved list views and filters so I can keep my working views across CRM modules.`
17. `Module: UX | As a user, I want inline editing in tables for common fields so I can update records faster without opening forms.`
18. `Module: Activities | As a system, I want task/reminder automation from stage changes and workflow triggers so follow-up actions are created automatically.`
19. `Module: Marketing | As a marketing user, I want full marketing automation (journeys, nurture, scoring) so CRM can replace a separate marketing platform.`
20. `Module: Workflow | As an Admin, I want a visual workflow builder so I can compose business automations without code.`
21. `Module: Portal | As a customer-facing team, I want a customer portal so customers can self-serve key CRM workflows and updates.`
22. `Module: Service | As a support team, I want case/ticket management so North Edge supports sales + service CRM workflows.`
23. `Module: Platform | As a partner/admin, I want a plugin/extension framework so the platform can be extended safely without core forks.`
24. `Module: Analytics | As a manager/executive, I want advanced analytics and BI (pivot, cohort, drill-down) so I can analyze revenue performance beyond standard reports.`
25. `Module: Integrations | As a user, I want social media integration for enrichment and listening so CRM records include social context.`
26. `Module: AI | As a manager, I want AI conversation intelligence (transcription, sentiment, coaching insights) so call interactions improve coaching and deal quality.`
27. `Module: Mobile | As a field seller, I want a native mobile app with offline-capable core workflows so I can work reliably outside the office.`
28. `Module: Platform | As an Admin, I want multi-language and localization support so CRM can be deployed across regions and language requirements.`
29. `Module: Compliance | As an Admin, I want an audit and compliance suite (retention, field-level history, compliance controls) so enterprise governance requirements are met.`
30. `Module: Collaboration | As a user, I want real-time collaboration (live updates, presence, mentions) so CRM work stays synchronized across teams.`

### Supporting Implementation/UI Tasks (Non-Canonical User Stories)
- `Module: Leads | Lead Edit page IA + visual polish for daily-use compactness (Qualification tab helper text reduction + Supporting Documents tab UX) (Done)`
- `Module: Auth | Login Sign In button liquid-glass visual theme (locked baseline, PrimeNG green override fixed) (Done)`
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
