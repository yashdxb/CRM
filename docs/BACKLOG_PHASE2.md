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
 - Status: Completed

## Task 2 — Opportunity stage enforcement
- Scope:
  - Stage exit criteria gates
  - Next-step required before stage advance
  - At‑risk flag when no activity in X days
- Acceptance:
  - Stage changes blocked until required fields complete
  - Next-step scheduled is required for stage changes
  - At‑risk status visible in list + dashboard
 - Status: Completed

## Task 3 — Activity discipline
- Scope:
  - Enforce outcome + next step + due date on completion
  - Templates aligned to stages
  - Idle opportunity detection hook
- Acceptance:
  - Activity cannot complete without outcome + next step date
  - Templates selectable per stage
  - Idle deals flagged after inactivity threshold
 - Status: Completed (discipline + idle hooks)

## Leads
- Lead SLA timer (first-touch) with escalation  
  - Acceptance: SLA clock starts on assignment; overdue triggers alert + task.
- Multi-touch cadence tracking (call/email/LinkedIn)  
  - Acceptance: cadence steps logged + auto next-step task created.
- Lead outcome enforcement (Disqualified reason, Nurture follow-up date, Qualified handoff)  
  - Acceptance: lead cannot close without required outcome fields.
- Handoff package validator (notes + booked meeting + outcome)  
  - Acceptance: handoff blocked unless meeting + notes exist.
 - Status: Lead outcomes + SLA + nurture follow-up task completed; cadence tracking + handoff validator now implemented.

## Activities
- Enforce activity outcome + next step + due date  
  - Acceptance: activity save fails without outcome + next step date.
- Activity templates aligned to stages  
  - Acceptance: templates selectable per stage with prefilled defaults.
- Inactivity detection hook (no activity in X days)  
  - Acceptance: idle opportunities flagged at X days.
 - Status: Discipline enforced + inactivity hook implemented; templates pending.

## Opportunities
- Stage exit criteria gates  
  - Acceptance: stage change blocked until required fields complete.
- At-risk deal flag (no activity in X days)  
  - Acceptance: at‑risk status visible in list + dashboard.
- Opportunity next-step required before stage advance  
  - Acceptance: stage advance requires scheduled next step.
- Forecast category controls + commit discipline  
  - Acceptance: forecast category required before close; Commit stage requires Commit category.
 - Status: Completed (stage rules + risk indicators + next-step requirement with tests + forecast controls).

## Accounts & Contacts
- Buying group roles required (Decision Maker, Champion, Influencer, Procurement, Technical)  
  - Acceptance: at least one role required for late-stage deals.
- Account ownership + parent/child validation  
  - Acceptance: ownership must be set; parent/child link validated.
 - Status: Completed.

## Approvals
- Approval visibility with comments + audit trail  
  - Acceptance: approval status + comments visible to rep/manager.
- Single-level approval thresholds enforcement (existing, ensure surfaced)  
  - Acceptance: threshold breach triggers approval flow.
 - Status: Approval workflow, inbox queue, and integration tests completed; thresholds surfaced.

## Dashboard / Command Center
- At-risk deal widget  
  - Acceptance: shows count + quick filter.
- “No next step” widget  
  - Acceptance: shows deals without next step.
- Pipeline discipline KPIs (last activity, next step due)  
  - Acceptance: KPIs visible per rep.
 - Status: Completed.

## Sales Manager
- Deal review queue (stuck stage, late-stage, no next step)  
  - Acceptance: queue filters + drill-down view.
- Comment + coaching tasks to reps  
  - Acceptance: manager comment generates rep task.
- Deal review workflow depth (review thread + outcomes + rep acknowledgment)  
  - Acceptance: manager can post review outcomes (Approve / Needs Work / Escalate), reps must acknowledge with due date tracking.
 - Status: Partial (pipeline health review queue + manager coaching task creation + review thread/outcomes/acknowledgment implemented; deeper coaching automation/reporting still pending).

## Pre-Sales
- Opportunity team role tracking  
  - Acceptance: team members have role tags.
- Demo/POC activity with required outcomes  
  - Acceptance: demo outcome required before stage advance.
 - Status: Pending.

## Delivery / Implementation
- Handoff package template (scope/risks/timeline)  
  - Acceptance: required fields before kickoff.
- Onboarding checklist + milestones  
  - Acceptance: tasks auto-created on Closed Won.
- Implementation completion status  
  - Acceptance: completion updates account state.
 - Status: Pending.

## Notifications
- Escalation alerts for SLA breaches  
  - Acceptance: alerts delivered + logged.
- Idle deal alert notifications  
  - Acceptance: triggered after inactivity threshold.
 - Status: Pending.

---

# Completed Work (to date)
- Lead service seam + lead domain events + handlers
- Lead import service seam
- Lead outcomes + first-touch SLA + nurture follow-up task
- Lead cadence touch logging + auto next-step task + qualified handoff validator (meeting + notes)
- Activity and opportunity service seams + domain events
- Opportunity stage enforcement + at-risk + no-next-step flags
- Activity discipline enforcement (outcome + next step)
- Account ownership + parent/child validation + buying roles
- Opportunity approval workflow + queue (API + UI)
- Security/legal review + pricing/discount approval tracking
- Opportunity review checklist auto-save
- Dashboard KPIs (at-risk, no next step)
- Approval API/inbox integration tests + non-approver guards
- Stage-change next-step requirement tests
- Manager pipeline health API + dashboard review queue card
- Manager coaching task API + dashboard coaching dialog + tests
- Manager deal review thread API + outcomes + rep acknowledgment tracking (API + UI)
- Lead cadence + qualified handoff API tests
- Forecast category controls + commit discipline (API + UI) + tests
- Renewal automation (90/60/30) + expansion signals/creation (P3 follow-ons)

---

## Notes
- Phase 3 items (renewals, expansion, health scoring, legal/finance workflows) are intentionally excluded here.
- Tie acceptance criteria back to `PROJECT_MASTER.md` section 13.2 and 13.3.
