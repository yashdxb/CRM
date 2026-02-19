# AI Assistant Action Execution Blueprint

Date: **February 19, 2026**

## Goal

Enable AI recommendations to become executable CRM actions while maintaining policy control, role scope, and auditability.

## Execution Model

1. Low-risk actions execute in one click.
2. Medium/high-risk actions require review and confirmation.
3. All executed/rejected actions are audit logged with telemetry.

## Risk Tiers

### Low risk (one click)

- Create follow-up task
- Create outreach reminder
- Open filtered work queue (lead/opportunity/activity list)

### Medium/high risk (review required)

- Approval request creation
- Forecast-impacting updates
- Coaching/escalation actions
- Any action affecting stage, amount, or close probability

## Review Modal Requirements

- Show proposed payload before submit.
- Explain why review is required (risk tier + confidence gate).
- Require explicit confirm/cancel.
- Persist accepted/rejected state.

## Role and Scope Rules

- Rep: self scope only.
- Manager: team scope (descendant hierarchy).
- Executive/Admin with configured visibility: all scope.
- Execution permissions must still respect module-level permissions and policy gates.

## Audit and Telemetry

Every assistant action event should record:

- `suggested_by=assistant`
- `action_type`, `entity_type`, `entity_id`
- `risk_tier`, `confidence_band`
- `accepted|rejected|executed`
- actor + timestamp
- payload snapshot hash/reference

## UI Integration Points

1. Dashboard:
   - KPI strip: At-Risk, SLA Breaches, Pending Approvals
   - Do Now queue with execute/review badges
2. Assistant panel:
   - Action cards with `Execute` or `Review` CTA
3. Opportunity/Lead detail:
   - In-context action prompts with guardrails

## Rollout Sequence

1. Role-scope + policy engine baseline.
2. One-click low-risk actions with undo.
3. Review flow for medium/high risk.
4. Audit + telemetry pipeline.
5. E2E and release gating.
