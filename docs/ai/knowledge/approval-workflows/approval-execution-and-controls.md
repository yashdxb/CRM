---
title: Approval Execution and Control Policy
module: approvals
audience: sales-manager
version: 2026-02-18
owner: revenue-ops
status: approved
tenant_scope: global
source: crm-backlog
---

## Purpose

Define how approval requests are triggered, routed, and audited for opportunity changes.

## Trigger conditions

1. Approval is required when configured threshold rules are exceeded.
2. Approval can be tied to discount, amount, or gated workflow policy.
3. Requests are initiated from opportunity execution flow.

## Permission controls

1. Request permission is separate from approve permission.
2. Approve and override actions must be explicitly granted.
3. Edit rights alone must not allow approval decisions.

## Decision flow

1. User submits approval request with business context.
2. Eligible approver reviews and records decision.
3. System stores status, approver identity, comments, and timestamps.
4. Blocked close/progression actions are released only after approved state.

## Audit and traceability

1. All approval events must be auditable.
2. Decision comments and workflow status changes must be persisted.
3. Audit records must remain tenant-scoped and policy-compliant.
