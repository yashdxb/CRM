# Documentation Index (Master Registry)

**Purpose**: Master registry for documentation governance, classification, and lifecycle.

**Scope**: Covers all files currently under `docs/` (including subfolders and non-Markdown assets).

**Last Reviewed**: February 23, 2026

---

## 1) Governance Rules (Mandatory)

1. **Canonical docs** are the source of truth for project rules and governance.
2. **ClickUp** is the source of truth for backlog/story state.
3. **Operational guides** explain how to execute work; they are not the source of truth.
4. **Sync / audit docs** are time-bound snapshots and must not become canonical.
5. **Reference / mapping docs** support planning and coverage analysis; they do not override code or canonical docs.
6. Every new doc should declare:
   - category
   - source-of-truth status
   - canonical reference
   - owner (role/team)
   - last review date (or date created)

---

## 2) Canonical Docs (Explicit)

These are the primary source-of-truth documents for this repo.

1. `docs/PROJECT_MASTER.md`
   - Canonical for project contract, architecture/UI rules, operational standards, and governance.

Backlog/story source of truth:
1. ClickUp list `CRM Backlog` (`901710720381`)
2. `docs/USER_STORIES.md` is a generated mirror/export (not canonical)

Important:
1. If a non-canonical doc conflicts with these, update the canonical doc or the codebase, then reconcile the non-canonical doc.
2. The running codebase remains the final source of truth for implementation behavior.

---

## 3) Category Definitions

1. `Canonical`
   - Primary source of truth used to govern implementation and planning.
2. `Operational Guide`
   - How-to or execution guidance for developers/operators.
3. `Sync / Audit Snapshot`
   - Point-in-time reconciliation, reports, investigations, or quick-fix notes.
4. `Reference / Mapping`
   - Capability maps, technical references, style references, examples.
5. `Roadmap / Backlog Planning`
   - Product/backlog/phase planning docs that may feed canonical docs.
6. `Knowledge Base Content`
   - AI grounding knowledge corpus, templates, manifests, test sets.
7. `Assets / Examples`
   - Images, prototypes, previews, example HTML, generated artifacts.

---

## 4) Registry (Current Coverage)

### 4.1 Root-Level Docs (`docs/*`)

| File | Category | Canonical? | Status | Owner | Primary Use |
|---|---|---|---|---|---|
| `docs/PROJECT_MASTER.md` | Canonical | Yes | Active | Engineering/Product | Project contract, architecture/UI/ops rules |
| `docs/USER_STORIES.md` | Sync / Audit Snapshot | No | Active | Product/Engineering | Generated ClickUp mirror for in-repo visibility/search |
| `docs/PROJECT_CONTRACT.md` | Reference / Mapping | No | Active | Engineering | Historical/adjacent contract reference |
| `docs/PROJECT_BACKLOG.md` | Roadmap / Backlog Planning | No | Active | Product/Engineering | Backlog strategy and execution guidance |
| `docs/PRODUCT_ROADMAP_PUBLIC.md` | Roadmap / Backlog Planning | No | Active | Product | Public-facing roadmap messaging |
| `docs/CRM_BACKLOG.md` | Roadmap / Backlog Planning | No | Active | Product | CRM backlog reference |
| `docs/MOBILE_BACKLOG.md` | Roadmap / Backlog Planning | No | Active | Product/Engineering | Mobile backlog planning |
| `docs/USER_STORIES_LEGACY.md` | Reference / Mapping | No | Reference | Product | Legacy narrative preserved |
| `docs/SALES_REP_USER_STORIES.md` | Reference / Mapping | No | Reference | Product | Role-specific story subset/reference |
| `docs/COMPETITIVE_GAP.md` | Reference / Mapping | No | Active | Product | Competitive analysis |
| `docs/CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md` | Reference / Mapping | No | Active | Product/RevOps | Capability-to-AI-knowledge coverage map |
| `docs/AI_ASSISTANT_ACTION_EXECUTION_BLUEPRINT.md` | Reference / Mapping | No | Active | Engineering | Design/implementation blueprint |
| `docs/AI_ASSISTANT_KNOWLEDGE_QUICK_START.md` | Operational Guide | No | Active | Engineering/RevOps | Quick start for AI knowledge feeding |
| `docs/AI_KNOWLEDGE_FEEDING_GUIDE.md` | Operational Guide | No | Active | Engineering/RevOps | End-to-end AI knowledge feeding guide |
| `docs/COMPONENT_STYLE_GUIDE.md` | Operational Guide | No | Active | Design/Engineering | Component/page style reference |
| `docs/STYLE_GUIDE.md` | Operational Guide | No | Active | Design/Engineering | General style guidance |
| `docs/MOBILE_IMPLEMENTATION_SUMMARY.md` | Operational Guide | No | Active | Engineering | Mobile implementation summary and delivered infra |
| `docs/MOBILE_RESPONSIVE_GUIDE.md` | Operational Guide | No | Active | Engineering/Design | Mobile UX/dev guide |
| `docs/MOBILE_TECHNICAL_REFERENCE.md` | Operational Guide | No | Active | Engineering | Mobile technical reference |
| `docs/USER_GUIDE.md` | Operational Guide | No | Active | Product/Support | End-user/system usage guide |
| `docs/TEST_PLAN.md` | Operational Guide | No | Active | QA/Engineering | Test plan and validation reference |
| `docs/REVIEW_FLOWS.md` | Operational Guide | No | Active | Product/Engineering | Review workflow guidance |
| `docs/MARKETING_CAMPAIGNS_ROLLOUT_RUNBOOK.md` | Operational Guide | No | Active | Engineering/Product | Tenant feature-flag rollout steps for marketing campaigns |
| `docs/SCM_BACKLOG.md` | Roadmap / Backlog Planning | No | Active | Product | SCM backlog planning |
| `docs/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md` | Sync / Audit Snapshot | No | Active | Engineering/Product | ClickUp sync snapshot for AI action execution |
| `docs/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md` | Sync / Audit Snapshot | No | Active | Engineering/Product | ClickUp sync snapshot for AI knowledge stories |
| `docs/CLICKUP_ARCH_CLASSIFICATION_SYNC.md` | Sync / Audit Snapshot | No | Active | Engineering/Product | Classification sync snapshot |
| `docs/CLICKUP_CRM_BACKLOG_CLEANUP.md` | Sync / Audit Snapshot | No | Active | Product | ClickUp cleanup snapshot/report |
| `docs/CLICKUP_NOT_STARTED_REPORT.md` | Sync / Audit Snapshot | No | Active | Product | ClickUp status report snapshot |
| `docs/AZURE_LOGIN_QUICK_FIX.md` | Sync / Audit Snapshot | No | Active | Engineering | Environment quick-fix runbook (issue-specific) |
| `docs/LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md` | Sync / Audit Snapshot | No | Active | Engineering | Incident/root-cause analysis |
| `docs/login-cors-fix.md` | Sync / Audit Snapshot | No | Active | Engineering | Issue-specific fix note |
| `docs/DAILY_OPERATIONS_LOG.md` | Sync / Audit Snapshot | No | Active | Engineering/Ops | Daily issue/fix log |
| `docs/ISSUE_FIXES.md` | Sync / Audit Snapshot | No | Active | Engineering | Aggregated issue fixes |
| `docs/MARKETING_MVP_GO_NO_GO_2026-02-28.md` | Sync / Audit Snapshot | No | Active | Engineering | Point-in-time go/no-go evidence and release conditions for Marketing MVP |
| `docs/LESSONS_LEARNED.md` | Reference / Mapping | No | Active | Engineering | Retrospective patterns/lessons |
| `docs/UseCases_V1.txt` | Reference / Mapping | No | Reference | Product | Legacy use-case notes |

Notes:
1. Duplicate entries above are intentionally consolidated semantically; each file is listed once.
2. Some docs remain `Active` even if non-canonical because they are still used operationally.

### 4.2 Structured AI Docs (`docs/ai/**`)

| Path / Pattern | Category | Canonical? | Status | Owner | Primary Use |
|---|---|---|---|---|---|
| `docs/ai/FOUNDARY_FINE_TUNING_GUIDE.md` | Operational Guide | No | Active | Engineering/AI | Fine-tuning guidance |
| `docs/ai/KNOWLEDGE_GROUNDING_GUIDE.md` | Operational Guide | No | Active | Engineering/AI | Knowledge grounding implementation guide |
| `docs/ai/agent-tools.openapi.json` | Reference / Mapping | No | Active | Engineering | Tool/API schema reference |
| `docs/ai/knowledge/README.md` | Operational Guide | No | Active | Engineering/RevOps | Knowledge corpus conventions and workflow |
| `docs/ai/knowledge/CHANGELOG.md` | Sync / Audit Snapshot | No | Active | Engineering/RevOps | Knowledge corpus change log |
| `docs/ai/knowledge/_templates/**` | Knowledge Base Content | No | Active | Engineering/RevOps | Authoring templates |
| `docs/ai/knowledge/manifest.jsonl` | Knowledge Base Content | No | Active | Engineering/RevOps | Index/publish manifest |
| `docs/ai/knowledge/activities/**` | Knowledge Base Content | No | Active | RevOps | Activities domain knowledge |
| `docs/ai/knowledge/approval-workflows/**` | Knowledge Base Content | No | Active | RevOps/Engineering | Approval policy and execution knowledge |
| `docs/ai/knowledge/assistant/**` | Knowledge Base Content | No | Active | Engineering | Assistant policy and response grounding |
| `docs/ai/knowledge/auth/**` | Knowledge Base Content | No | Active | Engineering | Auth journey/reference knowledge |
| `docs/ai/knowledge/command-center/**` | Knowledge Base Content | No | Active | Product/RevOps | Command center KPI definitions |
| `docs/ai/knowledge/leads/**` | Knowledge Base Content | No | Active | RevOps/Product | Lead workflows and rules knowledge |
| `docs/ai/knowledge/opportunities/**` | Knowledge Base Content | No | Active | RevOps/Product | Opportunity execution/forecast knowledge |
| `docs/ai/knowledge/pipeline-governance/**` | Knowledge Base Content | No | Active | RevOps/Product | Stage system and gate policies |
| `docs/ai/knowledge/sales-playbooks/**` | Knowledge Base Content | No | Active | RevOps/Sales Ops | Daily flow and playbook knowledge |
| `docs/ai/prompt-tests/**` | Knowledge Base Content | No | Active | Engineering/AI | Prompt QA test sets |
| `docs/ai/training/**` | Knowledge Base Content | No | Active | Engineering/AI | Training datasets/artifacts |

### 4.3 Images / Prototypes / Static Assets (`docs/images/**`)

| Path / Pattern | Category | Canonical? | Status | Owner | Primary Use |
|---|---|---|---|---|---|
| `docs/images/*.png` | Assets / Examples | No | Active | Design/Engineering | Logos, visual references, previews |
| `docs/images/*.html` | Assets / Examples | No | Active | Engineering/Design | HTML visual preview prototypes |
| `docs/images/logo` | Assets / Examples | No | Reference | Design | Legacy/generated logo asset |

---

## 5) Proposed File Moves (Safe Plan, No Moves Yet)

These are **proposed exact moves** for cleanup. Do not execute until references are updated.

### A) Sync / Audit snapshots -> `docs/sync/`
1. `docs/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md` -> `docs/sync/CLICKUP_AI_ASSISTANT_ACTION_EXECUTION_SYNC.md`
2. `docs/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md` -> `docs/sync/CLICKUP_AI_ASSISTANT_KNOWLEDGE_SYNC.md`
3. `docs/CLICKUP_ARCH_CLASSIFICATION_SYNC.md` -> `docs/sync/CLICKUP_ARCH_CLASSIFICATION_SYNC.md`
4. `docs/CLICKUP_CRM_BACKLOG_CLEANUP.md` -> `docs/sync/CLICKUP_CRM_BACKLOG_CLEANUP.md`
5. `docs/CLICKUP_NOT_STARTED_REPORT.md` -> `docs/sync/CLICKUP_NOT_STARTED_REPORT.md`
6. `docs/AZURE_LOGIN_QUICK_FIX.md` -> `docs/sync/AZURE_LOGIN_QUICK_FIX.md`
7. `docs/LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md` -> `docs/sync/LOGIN_FAILURE_ROOT_CAUSE_ANALYSIS.md`
8. `docs/login-cors-fix.md` -> `docs/sync/login-cors-fix.md`
9. `docs/DAILY_OPERATIONS_LOG.md` -> `docs/sync/DAILY_OPERATIONS_LOG.md` (optional; could also be `docs/ops/`)
10. `docs/ISSUE_FIXES.md` -> `docs/sync/ISSUE_FIXES.md` (or `docs/ops/`)

### B) Operational guides -> `docs/guides/`
1. `docs/MOBILE_IMPLEMENTATION_SUMMARY.md` -> `docs/guides/MOBILE_IMPLEMENTATION_SUMMARY.md`
2. `docs/MOBILE_RESPONSIVE_GUIDE.md` -> `docs/guides/MOBILE_RESPONSIVE_GUIDE.md`
3. `docs/MOBILE_TECHNICAL_REFERENCE.md` -> `docs/guides/MOBILE_TECHNICAL_REFERENCE.md`
4. `docs/AI_ASSISTANT_KNOWLEDGE_QUICK_START.md` -> `docs/guides/AI_ASSISTANT_KNOWLEDGE_QUICK_START.md`
5. `docs/AI_KNOWLEDGE_FEEDING_GUIDE.md` -> `docs/guides/AI_KNOWLEDGE_FEEDING_GUIDE.md`
6. `docs/COMPONENT_STYLE_GUIDE.md` -> `docs/guides/COMPONENT_STYLE_GUIDE.md`
7. `docs/STYLE_GUIDE.md` -> `docs/guides/STYLE_GUIDE.md`
8. `docs/TEST_PLAN.md` -> `docs/guides/TEST_PLAN.md`
9. `docs/USER_GUIDE.md` -> `docs/guides/USER_GUIDE.md`

### C) Reference / mapping -> `docs/mappings/`
1. `docs/CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md` -> `docs/mappings/CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md`
2. `docs/COMPETITIVE_GAP.md` -> `docs/mappings/COMPETITIVE_GAP.md`
3. `docs/LESSONS_LEARNED.md` -> `docs/mappings/LESSONS_LEARNED.md` (or `docs/retros/`)
4. `docs/USER_STORIES_LEGACY.md` -> `docs/mappings/USER_STORIES_LEGACY.md`
5. `docs/SALES_REP_USER_STORIES.md` -> `docs/mappings/SALES_REP_USER_STORIES.md`

### D) Keep at root (explicitly)
1. `docs/PROJECT_MASTER.md`
2. `docs/USER_STORIES.md`

---

## 6) Next Cleanup Pass (Recommended)

1. Execute file moves in small batches (`sync` -> `guides` -> `mappings`).
2. Update all references in:
   - `docs/PROJECT_MASTER.md`
   - `docs/USER_STORIES.md`
   - `SKILL.md` files and scripts/docs that point to old paths
3. Add top banners to remaining non-canonical docs (`CLICKUP_*`, incident docs, older guides).
4. Mark archive candidates and move backups (`*.bak*`) into `docs/archive/`.
