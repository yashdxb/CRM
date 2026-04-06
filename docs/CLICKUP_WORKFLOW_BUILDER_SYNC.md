# ClickUp ↔ Repo: Workflow Builder Phase 3 Sync

> Generated: 2026-04-07
> Epic: Approval workflow builder + governed runtime
> ClickUp List: CRM Backlog (`901710720381`)
> Tags: `done`, `module:Workflows`, `now`

## Summary

Phase 3 of the workflow builder improvement plan has been implemented. This covers:
1. **Workflow template catalog** — 5 executable starter templates with a guided picker dialog.
2. **Simulation mode** — traversed-node visualization, estimated duration, and final outcome in the builder sidebar.
3. **Approval settings route consolidation** — old `/app/settings/approvals` redirects to `/app/workflows`.

## Acceptance Criteria — Phase 3

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Template picker dialog opens when creating a new workflow from the workspace | ✅ Done |
| 2 | Five real-estate templates available (High Discount, Inquiry Follow-Up, Showing Follow-Up, Low Readiness, Price Drop) | ✅ Done |
| 3 | Builder loads pre-filled definition when navigating with `?template=` query param | ✅ Done |
| 4 | "Start Blank" option available in template picker | ✅ Done |
| 5 | Simulation panel in builder sidebar shows traversed nodes with pass/skip/pending status | ✅ Done |
| 6 | Simulation shows estimated duration and final outcome | ✅ Done |
| 7 | `/app/settings/approvals` redirects to `/app/workflows` | ✅ Done |
| 8 | Sidebar navigation "Intelligence & Automation" section points to workflows | ✅ Done |
| 9 | Assistant panel and dashboard approval navigation updated | ✅ Done |
| 10 | ApprovalSettingsPage marked @deprecated | ✅ Done |
| 11 | E2E tests updated for new route | ✅ Done |
| 12 | Clean Angular build verified | ✅ Done |

## Files Changed

### Models
- `client/src/app/crm/features/workflows/models/approval-workflow-builder.model.ts` — Added `WorkflowTemplate`, `SimulationResult`, `SimulationNode` interfaces

### Services
- `client/src/app/crm/features/workflows/services/approval-workflow-builder.facade.ts` — Added `getTemplateCatalog()`, `createFromTemplate()`, `runSimulation()`, 4 new template factory methods

### Pages
- `client/src/app/crm/features/workflows/pages/workflow-workspace.page.ts` — Template picker dialog, facade injection
- `client/src/app/crm/features/workflows/pages/workflow-workspace.page.html` — Template picker grid UI
- `client/src/app/crm/features/workflows/pages/workflow-workspace.page.scss` — Template card styles
- `client/src/app/crm/features/workflows/pages/workflow-builder.page.ts` — `loadInitialDefinition()` from query param, `simulationResult` computed
- `client/src/app/crm/features/workflows/pages/workflow-builder.page.html` — Simulation sidebar card
- `client/src/app/crm/features/workflows/pages/workflow-builder.page.scss` — Simulation node styles

### Route & Navigation
- `client/src/app/app.routes.ts` — `settings/approvals` → redirect to `/app/workflows`
- `client/src/app/layout/navigation/navigation.config.ts` — Sidebar section updated, removed "Approvals" child
- `client/src/app/core/assistant/assistant-panel.component.ts` — Navigation updated
- `client/src/app/crm/features/dashboard/pages/dashboard.page.ts` — Navigation updated
- `client/src/app/crm/features/opportunities/pages/decision-policies-sla.page.html` — Link updated
- `client/src/app/crm/features/settings/pages/approval-settings.page.ts` — Marked `@deprecated`

### E2E
- `client/e2e/uat/settings.uat.spec.ts` — Updated to test `/app/workflows`
- `client/e2e/uat-comprehensive.spec.ts` — Updated settings page path

### Docs
- `docs/WORKFLOW_BUILDER_IMPROVEMENTS.md` — Moved simulation + templates to "Implemented" section
- `docs/CRM_BACKLOG.md` — Updated item 9 remaining focus + added Phase 3 delivery notes

## Remaining Work (Next / Later)

| Item | Priority | Notes |
|------|----------|-------|
| Execute `delay` and `email` nodes at runtime | Next | Backend runtime path extension |
| Routed-edge label placement | Next | Canvas rendering enhancement |
| Expand workflow scope beyond deal approval | Later | Leads, properties, help desk |
| Workflow analytics and stuck-node visibility | Later | — |
| Version compare and rollback | Later | — |
