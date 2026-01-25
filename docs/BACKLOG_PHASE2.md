# Phase 2 Backlog by Module

Purpose: A module-by-module feature backlog for Phase 2. Each item is scoped for build readiness and should map to the Phase 2 flow gaps in `PROJECT_MASTER.md`.

---

# Execution Queue (Approved)

Order: execute sequentially, build + verify after each task.

## Task 1 — Leads MVP flow completion
- Scope:
  - Lead list + detail + qualification actions
  - SLA timers + first‑touch task auto-creation
  - Enforced outcomes (Disqualified reason, Nurture follow‑up, Qualified handoff)
- Acceptance:
  - Lead cannot be closed without required outcome fields
  - SLA timer starts on assignment and creates first-touch task
  - Qualification sets next steps and handoff readiness

## Task 2 — Opportunity stage enforcement
- Scope:
  - Stage exit criteria gates
  - Next-step required before stage advance
  - At‑risk flag when no activity in X days
- Acceptance:
  - Stage changes blocked until required fields complete
  - Next-step scheduled is required for stage changes
  - At‑risk status visible in list + dashboard

## Task 3 — Activity discipline
- Scope:
  - Enforce outcome + next step + due date on completion
  - Templates aligned to stages
  - Idle opportunity detection hook
- Acceptance:
  - Activity cannot complete without outcome + next step date
  - Templates selectable per stage
  - Idle deals flagged after inactivity threshold

## Leads
- Lead SLA timer (first-touch) with escalation  
  - Acceptance: SLA clock starts on assignment; overdue triggers alert + task.
- Multi-touch cadence tracking (call/email/LinkedIn)  
  - Acceptance: cadence steps logged + auto next-step task created.
- Lead outcome enforcement (Disqualified reason, Nurture follow-up date, Qualified handoff)  
  - Acceptance: lead cannot close without required outcome fields.
- Handoff package validator (notes + booked meeting + outcome)  
  - Acceptance: handoff blocked unless meeting + notes exist.

## Activities
- Enforce activity outcome + next step + due date  
  - Acceptance: activity save fails without outcome + next step date.
- Activity templates aligned to stages  
  - Acceptance: templates selectable per stage with prefilled defaults.
- Inactivity detection hook (no activity in X days)  
  - Acceptance: idle opportunities flagged at X days.

## Opportunities
- Stage exit criteria gates  
  - Acceptance: stage change blocked until required fields complete.
- At-risk deal flag (no activity in X days)  
  - Acceptance: at‑risk status visible in list + dashboard.
- Opportunity next-step required before stage advance  
  - Acceptance: stage advance requires scheduled next step.

## Accounts & Contacts
- Buying group roles required (Decision Maker, Champion, Influencer, Procurement, Technical)  
  - Acceptance: at least one role required for late-stage deals.
- Account ownership + parent/child validation  
  - Acceptance: ownership must be set; parent/child link validated.

## Approvals
- Approval visibility with comments + audit trail  
  - Acceptance: approval status + comments visible to rep/manager.
- Single-level approval thresholds enforcement (existing, ensure surfaced)  
  - Acceptance: threshold breach triggers approval flow.

## Dashboard / Command Center
- At-risk deal widget  
  - Acceptance: shows count + quick filter.
- “No next step” widget  
  - Acceptance: shows deals without next step.
- Pipeline discipline KPIs (last activity, next step due)  
  - Acceptance: KPIs visible per rep.

## Sales Manager
- Deal review queue (stuck stage, late-stage, no next step)  
  - Acceptance: queue filters + drill-down view.
- Comment + coaching tasks to reps  
  - Acceptance: manager comment generates rep task.

## Pre-Sales
- Opportunity team role tracking  
  - Acceptance: team members have role tags.
- Demo/POC activity with required outcomes  
  - Acceptance: demo outcome required before stage advance.

## Delivery / Implementation
- Handoff package template (scope/risks/timeline)  
  - Acceptance: required fields before kickoff.
- Onboarding checklist + milestones  
  - Acceptance: tasks auto-created on Closed Won.
- Implementation completion status  
  - Acceptance: completion updates account state.

## Notifications
- Escalation alerts for SLA breaches  
  - Acceptance: alerts delivered + logged.
- Idle deal alert notifications  
  - Acceptance: triggered after inactivity threshold.

---

## Notes
- Phase 3 items (renewals, expansion, health scoring, legal/finance workflows) are intentionally excluded here.
- Tie acceptance criteria back to `PROJECT_MASTER.md` section 13.2 and 13.3.
