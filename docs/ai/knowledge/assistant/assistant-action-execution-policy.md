---
title: Assistant Action Execution Policy
module: assistant
audience: all
version: 2026-02-19
owner: product-ops
status: approved
tenant_scope: global
source: ai-governance
---

## Purpose

Define how assistant recommendations are converted into executable actions with risk-based controls.

## Policy Rules

1. Low-risk actions may execute in one click.
2. Medium/high-risk actions must pass a review-confirm step.
3. Role scope must be enforced before visibility or execution.
4. Permission and policy gates remain authoritative over assistant suggestions.
5. Every action event must be auditable with accepted/rejected telemetry.

## Risk-Based Execution

### One-click allowed

- Follow-up task creation
- Reminder task creation
- Work queue navigation actions

### Review required

- Approval creation or overrides
- Forecast-impacting changes
- Stage/probability changes
- Coaching or escalation assignments

## Audit Requirements

Record:

- who suggested (`assistant`) and who executed
- action payload reference
- decision (`accepted`/`rejected`)
- timestamp and entity linkage
