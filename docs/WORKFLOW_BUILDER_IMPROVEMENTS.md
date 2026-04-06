# Workflow Builder Improvements

> Category: Operational Guide
> Canonical status: Not canonical
> Canonical references: [docs/PROJECT_MASTER.md](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/docs/PROJECT_MASTER.md), [docs/CRM_BACKLOG.md](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/docs/CRM_BACKLOG.md)
> Owner: Engineering
> Last reviewed: 2026-03-14

## Purpose

This document captures the current workflow-builder improvement direction for the CRM-only product scope and the practical implementation that has now landed in the repo.

## Current product read

The workflow builder already had real value in one lane:
- draft and published lifecycle
- tenant-aware scope metadata
- approval-step security-level routing
- execution viewer for deal approvals

The main gap was that the UI suggested general workflow automation, while the actual editable model was still mostly approval-only.

## Main gaps identified

1. Non-approval nodes were visually present but had no real typed configuration model.
2. Connections had only `source` and `target`, so branch semantics were missing.
3. The properties panel edited all approval steps in bulk instead of supporting focused node-by-node editing.
4. Canvas rewiring could discard connection metadata because edge state was not preserved.

## Implemented now

The current repo now includes the `Now` improvement scope that was identified during the workflow-builder review.

### 1. Typed node configuration

Workflow nodes now support structured config in both frontend and backend for:
- `condition`
- `delay`
- `email`
- `notification`
- `crm-update`
- `activity`

Frontend model:
- [workflow-definition.model.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/models/workflow-definition.model.ts)

Backend model and mapper:
- [DealApprovalWorkflowDefinition.cs](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/server/src/CRM.Enterprise.Workflows/DealApprovalWorkflowDefinition.cs)

What this changed in practice:
- configurable nodes now have a real serialized schema instead of loose labels
- drafts preserve typed config in the saved definition JSON
- publish validation can reject incomplete non-approval nodes before they reach runtime

### 2. Connection metadata

Workflow connections now support:
- `label`
- `branchKey`

This gives the builder a place to represent path semantics such as:
- `approved`
- `rejected`
- `yes`
- `no`

What this changed in practice:
- branch semantics are part of the workflow definition instead of implicit canvas geometry
- edge metadata survives connection rebuilds in the designer
- condition nodes can now be validated against labeled outgoing paths

### 3. Focused selected-node editing

The properties panel is now organized around a selected node instead of a long all-steps list.

What this enables:
- one node selected at a time
- node-specific configuration fields
- approval-step editing when the selected node is an approval node
- outgoing branch label editing for the selected node

Updated files:
- [workflow-designer.page.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.ts)
- [workflow-designer.page.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/pages/workflow-designer.page.html)
- [properties-panel.component.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/components/properties-panel/properties-panel.component.ts)
- [properties-panel.component.html](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/components/properties-panel/properties-panel.component.html)

What this changed in practice:
- the panel now edits one node at a time
- approval nodes still expose approval-step settings
- condition, delay, email, notification, CRM update, and activity nodes now expose their own configuration fields
- outgoing branches for the selected node can be labeled directly from the panel

### 4. Config-aware node labels and safer edge sync

The canvas now:
- preserves existing connection metadata when edges are recreated
- renders more meaningful labels for configured nodes such as delay, email, notification, CRM update, and activity
- supports direct node selection from the canvas overlay
- renders branch labels on the canvas for labeled outgoing paths

Updated file:
- [workflow-canvas.component.ts](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/client/src/app/crm/features/workflows/components/workflow-canvas/workflow-canvas.component.ts)

### 5. Structure validation for configurable nodes

Backend validation now enforces basic configuration requirements for published workflows:
- condition nodes need field/operator/value
- condition nodes need labeled outgoing branches
- delay nodes need positive duration
- email nodes need template or subject
- notification nodes need channel and audience
- CRM update nodes need field and value
- activity nodes need activity type and subject

## Verification

The implemented `Now` scope was validated with:
- `dotnet build server/src/CRM.Enterprise.Api/CRM.Enterprise.Api.csproj`
- `npm run build`
- `npm exec playwright test e2e/smoke.spec.ts e2e/workflow-designer.spec.ts --project=chromium`

## Additional delivered execution support

The approval runtime now executes two non-approval node types inside the published deal workflow path:
- `crm-update`
- `activity`
- `notification`

Current runtime behavior:
- the published graph is converted into an execution plan
- workflow actions execute from `start` until the next approval checkpoint
- after an approval decision, execution resumes until the next approval node or `end`
- approval-chain storage remains backward compatible with older `StepsJson` payloads

Current supported CRM update targets:
- `stage`
- `status`
- `forecastCategory`

Current supported activity behavior:
- creates an `Activity` linked to the deal/opportunity
- supports owner strategies for `owner`, `manager`, and `approver`
- supports due-date offsets and activity type mapping

## Effect of the current implementation

The builder is still primarily a deal-approval workflow builder at runtime, but it is no longer only a diagramming surface for non-approval nodes.

It now has:
- a real schema for general workflow nodes
- validation for configurable nodes
- direct canvas selection and branch visibility
- executable support for `crm-update`, `activity`, and `notification` nodes inside the deal-approval flow

Current limitation:
- non-approval execution currently exists only inside the deal-approval runtime path
- `email` and `delay` nodes are still modeled but not executed
- branch labels are visible on-canvas, but they are still rendered from workflow geometry rather than true routed-edge layout

## Confidence and usability improvements still needed

The builder is structurally stronger now, but it can still feel more complex than it needs to for a first-time CRM admin.

Main confidence gaps still worth addressing:
- the builder still starts as a blank expert surface instead of a guided setup flow
- node configuration is clearer than before, but execution consequences are still not previewed before publish
- branch labels are visible, but users still do not see a strong “happy path vs exception path” mental model
- there is no simulation or dry-run mode to show which nodes would actually fire for a sample deal
- runtime coverage is partial until `delay` and `email` nodes execute

Recommended confidence-first improvements:
1. Add a starter mode with a small number of guided templates and pre-wired paths.
2. Add simulation mode with sample record input and traversed node output.
3. Add inline “what this node will do” summaries in the properties panel.
4. Add a publish readiness summary:
   - valid nodes
   - unlabeled branches
   - inactive paths
   - unsupported runtime nodes
5. Add execution history per workflow node so admins can see which parts of a published workflow are actually being used.

## Next

1. Add runtime support for:
   - `email`
   - `delay`
2. Replace overlay branch labels with routed-edge label placement tied to the actual rendered connection path.

## Implemented — Phase 3 (Templates, Simulation, Route Consolidation)

### 1. Workflow template catalog

A `WorkflowTemplate` model and template catalog system was added in the facade:
- [approval-workflow-builder.model.ts](../client/src/app/crm/features/workflows/models/approval-workflow-builder.model.ts) — `WorkflowTemplate`, `SimulationResult`, `SimulationNode` interfaces
- [approval-workflow-builder.facade.ts](../client/src/app/crm/features/workflows/services/approval-workflow-builder.facade.ts) — `getTemplateCatalog()`, `createFromTemplate()`

Five executable templates:
| Template | Module | Trigger | Steps |
|----------|--------|---------|-------|
| High Discount Approval | Opportunity | On Submit | 3 (Manager → Finance → VP) |
| New Inquiry Follow-Up SLA | Lead | On Create | 2 (Agent Response 8h → Manager Escalation 4h) |
| Showing Follow-Up | Activity | On Complete | 2 (Feedback Capture 24h → Agent Review 12h) |
| Low Readiness Review | Opportunity | On Stage Change | 2 (Manager Review 12h → Go/No-Go Decision 8h) |
| Price Drop Escalation | Opportunity | On Submit | 2 (Manager Price Approval 12h → Director Override 24h) |

### 2. Template picker dialog

The Workflow Workspace page now opens a template picker dialog when creating a new workflow:
- [workflow-workspace.page.ts](../client/src/app/crm/features/workflows/pages/workflow-workspace.page.ts) — `showTemplatePicker`, `templates`, `confirmTemplate()`, `startBlank()`
- [workflow-workspace.page.html](../client/src/app/crm/features/workflows/pages/workflow-workspace.page.html) — `p-dialog` with template grid
- [workflow-workspace.page.scss](../client/src/app/crm/features/workflows/pages/workflow-workspace.page.scss) — template card styles

The builder page reads `?template=` query param and initializes from the selected template:
- [workflow-builder.page.ts](../client/src/app/crm/features/workflows/pages/workflow-builder.page.ts) — `loadInitialDefinition()` via `ActivatedRoute`

### 3. Workflow simulation

The facade exposes `runSimulation()` which evaluates conditions, traverses steps, and returns:
- `triggered` boolean
- `traversedNodes[]` with status (passed/skipped/pending)
- `estimatedDuration`
- `finalOutcome`

The builder sidebar now has a Simulation card showing traversed nodes and outcome:
- [workflow-builder.page.html](../client/src/app/crm/features/workflows/pages/workflow-builder.page.html) — simulation panel
- [workflow-builder.page.scss](../client/src/app/crm/features/workflows/pages/workflow-builder.page.scss) — simulation styles

### 4. Approval settings route consolidation

The old `settings/approvals` route now redirects to `/app/workflows`:
- `app.routes.ts` — `settings/approvals` redirects to `/app/workflows`
- `navigation.config.ts` — sidebar "Intelligence & Automation" section now points to `/app/workflows`, removed standalone "Approvals" child entry
- `assistant-panel.component.ts` and `dashboard.page.ts` — approval entity navigation updated
- `decision-policies-sla.page.html` — "Open Approval Settings" → "Open Workflow Builder"
- `approval-settings.page.ts` — marked `@deprecated`
- E2E tests updated

## Later

1. Expand workflow scope beyond deal approval to:
   - leads
   - properties
   - help desk
2. Add workflow analytics:
   - publish success
   - execution throughput
   - stuck-node visibility
3. Add version compare and rollback tooling.
4. Add subflows or grouped node sections for larger orchestrations.
