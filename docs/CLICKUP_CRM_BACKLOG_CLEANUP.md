# ClickUp CRM Backlog Cleanup (Manual Move Checklist)

Lists:
- CRM Backlog: 901710720381
- Project Backlog: 901710720382
- SCM Backlog: 901710734279

## Move To Project Backlog (move:project)

## Move To SCM Backlog (move:scm)

## Review In CRM Backlog (review:crm-docs)
- ClickUp 86dzp8xat (Quote/Proposal): verify status is not `backlog`; align with delivered quote/proposal workspace + quote item badges evidence in CRM backlog.
- Product & Services catalog foundation: create or update story for ItemType (`Product`/`Service`) with backend + frontend evidence and mark as DONE when accepted.
- Product & Services IA/navigation: create or update story for side-nav discoverability (`Catalog`, `Add Item`, `Price Books`) and mark as DONE when accepted.
- Main side-nav colorful icon parity: create or update UX polish story and mark as DONE once visual QA confirms consistency.
- Redis read-model caching: create or update a Project Backlog platform story covering Azure Managed Redis placement plus caching of `dashboard summary`, `manager pipeline health`, and `assistant insights`; mark DONE after ClickUp sync with evidence from `docs/REDIS_READ_MODEL_CACHING_RUNBOOK.md`.
- GraphQL read-only query layer: keep backlog unless a separate architecture decision justifies it; do not close it as equivalent to Redis caching.
- Embedded Telerik Report Workspace: create or update the reporting platform story to reflect the current authoring decision:
  - report authoring is back inside CRM via the built-in Telerik Web Report Designer
  - Report Server remains later/optional for publishing and external workspace use
  - route/nav access now aligns to `Permissions.Reports.Design`
  - link evidence from `docs/PROJECT_MASTER.md` and `docs/PROJECT_BACKLOG.md`
- MCP for CRM integration surface: create or update a Project Backlog architecture story with the documented judgment:
  - not a current primary investment
  - phase as `read-only tools` -> `constrained writes` -> `approval-aware agent workflows`
  - do not start implementation until CRM workflow semantics, role visibility, and audit boundaries are stable
  - link evidence from `docs/PROJECT_MASTER.md` and `docs/PROJECT_BACKLOG.md`
