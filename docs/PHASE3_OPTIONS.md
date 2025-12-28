# Phase 3 Options (Draft)

This document captures deferred features and expansion paths after Phase 2.

## Approval Workflow (Multi-Level)

- Goal: enable multi-level approvals (e.g., rep → manager → finance).
- Rationale: only after customer demand is proven.

### Options

1) Fixed 2-level approval
- Manager approval required, optional finance approval for high discount.

2) Configurable multi-level approval
- Admin defines levels, thresholds, and approver roles.
- Per-opportunity approval status and audit log.

### Triggers (examples)

- Amount > threshold
- Discount % > threshold
- Stage change to Closed Won

### Data to capture

- Requested by, requested at
- Approved by, approved at
- Reason / notes

### Non-goals for Phase 3

- Full workflow automation builder
- Complex conditional branching beyond thresholds
