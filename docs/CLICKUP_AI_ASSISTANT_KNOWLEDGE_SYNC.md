# ClickUp AI Assistant Knowledge Sync

Sync date: **February 18, 2026**
Last verified with ClickUp (epic-based orchestration outcomes sync): **February 22, 2026**
Source list: `CRM Backlog` (`901710720381`)

## Epic

- `86dzw8unp` — `Epic | AI Assistant | Knowledge Grounding & Retrieval`
- `86dzzkbv0` — `Epic | AI Assistant | Revenue Execution Orchestration Outcomes` (created February 22, 2026)

## Stories

- `86dzw8uug` — Module: Assistant | Automated Azure AI Search index setup for knowledge grounding
- `86dzw8uuk` — Module: Assistant | Knowledge docs validation into manifest
- `86dzw8uuu` — Module: Assistant | Azure Search publishing with safe document keys
- `86dzw8uuv` — Module: Assistant | Grounded responses using current CRM policy and field docs
- `86dzw8uuw` — Module: Assistant | Login-to-logout and lead field reference coverage
- `86dzw8uux` — Module: Assistant | Foundry runtime retrieval hookup + prompt QA

## AI Orchestration Outcome Stories (Epic-Based)

Canonical placement in `docs/USER_STORIES.md`:
- `docs/USER_STORIES.md:146` — `Epic 1 | AI Revenue Execution Orchestration (Predominantly Complex Orchestration)`
- Keep these stories ordered there as the canonical implementation sequence for AI orchestration work.

ClickUp parent epic:
- `86dzzkbv0` — `Epic | AI Assistant | Revenue Execution Orchestration Outcomes`

- `86dzwn0c7` — Module: Assistant | Next-best-action orchestration engine from live CRM signals
- `86dzwn0cr` — Module: Assistant | At-risk pipeline autopilot recommendations (SLA/stale/no-next-step)
- `86dzwn0dk` — Module: Assistant | Approval copilot with policy-aware request guidance
- `86dzwn0e4` — Module: Assistant | Manager coaching orchestration with acknowledgment tasks
- `86dzwn0eq` — Module: Assistant | Forecast reliability risk signals in assistant responses
- `86dzzkby0` — Module: Assistant | Truth gap resolution loop with CQVS-targeted evidence tasks
- `86dzzkby4` — Module: Assistant | Playbook runtime by stage/segment with artifact gating
- `86dzzkby7` — Module: Assistant | Closed-loop learning from suggestion adoption and outcomes

## Tag Standard Used

- `module:assistant`
- `not-started`
- `moscow:must`
- `tier:Core`
- `type:Platform`

## Related Execution Sync

- Action execution and review controls sync: `docs/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md`
- Canonical epic-based story catalog and ordering: `docs/USER_STORIES.md` -> `Canonical User Stories (Epic-Based, Normalized)`

## Capability Cross-Check (Requested 8 Items vs ClickUp Stories)

Cross-check date: **February 22, 2026** (repo-doc verification)

### Coverage Matrix

1. **Build AI Next-Best-Action Engine tied to real workflow rules**
   - **Primary ClickUp story match:** `86dzwn0c7` — Next-best-action orchestration engine from live CRM signals
   - **Related execution stories (same capability, implementation slices):**
     - `86dzxrdpm` — one-click low-risk actions
     - `86dzxrdq4` — review-required medium/high-risk actions
     - `86dzxrdqr` — action policy engine (risk tier + confidence threshold)
     - `86dzxrdr4` — dashboard action queue execute/review UX
   - **Status in codebase:** `partial`

2. **Add At-Risk Deal Autopilot**
   - **Primary ClickUp story match:** `86dzwn0cr` — At-risk pipeline autopilot recommendations (SLA/stale/no-next-step)
   - **Semantic overlap in backlog wording:**
     - `86dzrwq5h` — Dashboard | Next-best-action guidance (doNow/thisWeek/optional) (broader dashboard wording; similar outcome)
   - **Status in codebase:** `partial`

3. **Add Manager Coaching Orchestration**
   - **Primary ClickUp story match:** `86dzwn0e4` — Manager coaching orchestration with acknowledgment tasks
   - **Related existing CRM capability wording (same output family):**
     - Manager coaching + acknowledgment + SLA escalation references in `docs/USER_STORIES.md` / `docs/PROJECT_MASTER.md`
   - **Status in codebase:** `partial`

4. **Add Approval Copilot**
   - **Primary ClickUp story match:** `86dzwn0dk` — Approval copilot with policy-aware request guidance
   - **Related execution stories (supporting controls, not duplicates):**
     - `86dzxrdq4` (review-required flow)
     - `86dzxrdqr` (policy engine)
   - **Status in codebase:** `partial`

5. **Add Truth Gap Resolution Loop (CQVS / uncertainty)**
   - **Primary ClickUp story match:** `86dzzkby0` — Truth gap resolution loop with CQVS-targeted evidence tasks
   - **Related non-assistant stories/capabilities (same domain but different scope):**
     - CQVS / weakest signal / evidence suggestions in Leads and dashboard truth gap stories
   - **Status in codebase:** `partial foundations`, `story created`

6. **Add Forecast Reliability Layer (behavior-signal commit risk)**
   - **Primary ClickUp story match:** `86dzwn0eq` — Forecast reliability risk signals in assistant responses
   - **Related non-assistant forecast stories (same business area, not duplicate):**
     - Confidence-weighted forecast card
     - Forecast scenarios/dashboard forecast widgets
   - **Status in codebase:** `partial`

7. **Add Playbook Runtime (micro-playbook selection + artifact enforcement)**
   - **Primary ClickUp story match:** `86dzzkby4` — Playbook runtime by stage/segment with artifact gating
   - **Related foundations (not equivalent):**
     - Stage gates / validations / approval workflow / progression rules
   - **Status in codebase:** `not-started as assistant runtime`, `story created`

8. **Add Closed-loop Learning (followed suggestions vs outcomes, improve prompts/scoring)**
   - **Primary ClickUp story match:** `86dzzkby7` — Closed-loop learning from suggestion adoption and outcomes
   - **Related supporting story (telemetry only, not equivalent):**
     - `86dzxrdqy` — Assistant action audit trail and acceptance telemetry
   - **Status in codebase:** `partial telemetry`, `story created`

## Story Clarification (Avoid Duplicate Wording)

Use this normalization so similar wording is treated consistently across ClickUp/docs:

- **Canonical source-of-truth for wording/order** = `docs/USER_STORIES.md` -> `Epic 1 | AI Revenue Execution Orchestration`
  - If a story is reworded in ClickUp for clarity, update alias/overlap notes here and keep one canonical line in `docs/USER_STORIES.md`.
  - Do not create a second story for the same outcome because wording changed.

- **Orchestration engine (what to do)** = `86dzwn0c7`
  - Includes action selection from live signals.
  - Does **not** by itself imply execute/review controls or audit telemetry.

- **Action execution controls (how to safely do it)** = `86dzxrdp5` epic + `86dzxrdpm/q4/qr/qy/r4/rk/ru`
  - These are implementation slices of orchestration delivery, not separate product outcomes.

- **At-risk autopilot** = `86dzwn0cr`
  - Specialization of next-best-action for stale/SLA/no-next-step conditions.
  - Similar wording to “next-best-action guidance” backlog items may describe the same operator outcome at different granularity.

- **Approval Copilot** = `86dzwn0dk`
  - AI guidance/composition for approval submission.
  - Distinct from existing approval workflow platform stories (which are non-AI execution mechanics).

- **Manager Coaching Orchestration** = `86dzwn0e4`
  - AI orchestration outcome.
  - Distinct from existing coaching task/review thread features already present in CRM.

- **Forecast Reliability Layer** = `86dzwn0eq`
  - Assistant behavioral-risk reasoning.
  - Distinct from dashboard forecast visualization cards.

## Missing / Recommended Stories (to fully cover the 8-item list)

Status update (February 22, 2026):
- The three previously missing orchestration outcome stories were created in ClickUp under `86dzzkbv0`.
- Remaining work is implementation and execution-control linkage, not story creation for the strategic 8-item list.

## Epic Clarification Recommendation

Current docs show two adjacent tracks:

- **Knowledge Grounding & Retrieval epic** (`86dzw8unp`)
- **Revenue Execution Orchestration Outcomes epic** (`86dzzkbv0`)
- **Action Execution & Review Controls epic** (`86dzxrdp5`)

To reduce ambiguity for stakeholders, treat the requested 8 capabilities as a higher-level umbrella in documentation:

- **Umbrella capability (docs/backlog grouping):** `AI Revenue Execution Orchestration`
  - `Track A`: Knowledge grounding/retrieval
  - `Track B`: Orchestration intelligence outcomes (next-best-action, autopilot, coaching, approval copilot, forecast reliability, truth-gap loop, playbook runtime, closed-loop learning)
  - `Track C`: Action execution/review controls

This prevents duplicate stories when the same requirement is written once as “copilot/orchestration” and again as “execute/review/policy/telemetry”.

## Sync Rule (Epic-Based Backlog Hygiene)

When updating ClickUp for AI assistant/orchestration work:

1. Check `docs/USER_STORIES.md` `Epic 1` first for an existing canonical story line.
2. If the requested item is the same outcome with different wording:
   - update wording/alias notes
   - do not create a duplicate ClickUp story
3. If it is a supporting delivery slice (policy, review control, telemetry, UX, E2E):
   - place it under `Action Execution & Review Controls` epic (`86dzxrdp5`)
   - do not classify it as a duplicate of an orchestration outcome story
4. If it is a missing strategic outcome (truth-gap loop, playbook runtime, closed-loop learning):
   - add it under `Revenue Execution Orchestration Outcomes` epic (`86dzzkbv0`) and then link supporting execution stories as needed
