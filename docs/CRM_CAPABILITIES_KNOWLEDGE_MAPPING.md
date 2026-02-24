# CRM Capabilities → Knowledge Mapping

> **Doc Role**
> - **Source of truth**: No (`Reference / Mapping`)
> - **Canonical references**: `docs/PROJECT_MASTER.md` (AI assistant operational guidance), `docs/USER_STORIES.md` (story priorities), `docs/DOCS_INDEX.md`
> - **Use this doc for**: Capability coverage planning and gap analysis for AI knowledge corpus
> - **Status**: Active


**Purpose**: Systematically identify all CRM capabilities and map them to knowledge documents  
**Owner**: Product/RevOps team  
**Last Updated**: 2026-02-23

---

## How to Use This Guide

Each section lists CRM capabilities → required knowledge documents.

**For each capability:**
1. Check if knowledge document exists in `docs/ai/knowledge/`
2. If missing → **[CREATE]** (use template below)
3. If exists but incomplete → **[EXPAND]** (add details)
4. If complete → **[READY]** (mark approved)

---

## 1. Leads Module

### Capability: Create Lead
**Description**: Sales rep creates new lead record

**Required Knowledge**:
```
docs/ai/knowledge/leads/
├─ lead-fields-complete.md           [Status: READY ✅]
│  └─ Required fields: firstName, email
│     Optional: company, phone, source
│     Validation rules per field
│
├─ lead-creation-workflow.md          [Status: CREATE 🔨]
│  └─ How to access form
│     Required vs optional fields
│     What happens after submit
│     Auto-linked to account if exists
│
└─ lead-duplicate-handling.md         [Status: CREATE 🔨]
   └─ How system detects duplicates
      What happens on duplicate attempt
      How to resolve
```

**Test Questions**:
- "What fields are required to create a lead?"
- "Can I create a lead without a company?"
- "What happens if I use an email that already exists?"

### Capability: Search/Filter Leads
**Required Knowledge**:
```
docs/ai/knowledge/leads/
├─ lead-search-filters.md            [Status: CREATE 🔨]
│  └─ Available search/filter fields
│     Auto-complete behavior
│     Advanced filters (date range, score)
│
└─ lead-sorting-display.md           [Status: CREATE 🔨]
   └─ Default sort order
      Available sort columns
      Pagination (rows per page)
```

### Capability: Stage Lead Through Lifecycle
**Required Knowledge**:
```
docs/ai/knowledge/leads/
├─ lead-status-transitions.md        [Status: READY ✅]
│  └─ Valid transitions: New → Contacted → Qualified → Converted/Disqualified
│
├─ lead-sla-policy.md                [Status: READY ✅]
│  └─ Auto-aging rules
│     Days without activity thresholds
│     SLA breach notifications
│
└─ lead-qualification-criteria.md    [Status: CREATE 🔨]
   └─ What makes a lead "qualified"
      Score thresholds
      Required before conversion
```

### Capability: Convert Lead to Opportunity
**Required Knowledge**:
```
docs/ai/knowledge/leads/
└─ lead-to-opportunity-conversion.md  [Status: CREATE 🔨]
   └─ What fields map to opportunity
      What happens to lead record
      When/how to trigger conversion
      Data preserved vs. reset

docs/ai/knowledge/opportunities/
└─ lead-conversion-into-opportunity.md [Status: CREATE 🔨]
   └─ Creates new opp record
      Inherits fields from lead
      Starts in "Prospecting" stage
```

---

## 2. Opportunities Module

### Capability: Create Opportunity
**Required Knowledge**:
```
docs/ai/knowledge/opportunities/
├─ opportunity-fields-complete.md    [Status: CREATE 🔨]
│  └─ All opportunity fields with:
│     - Type and validation
│     - Required vs. optional
│     - Auto-calculated fields
│
├─ opportunity-creation-guide.md     [Status: CREATE 🔨]
│  └─ When to create (vs. convert from lead)
│     How to open form
│     Field hints and examples
│     What happens on save
│
└─ opportunity-initial-probability.md [Status: CREATE 🔨]
   └─ Default probability by stage
      How to override
      Impact on forecast
```

**Test Questions**:
- "What fields are required for a new opportunity?"
- "Can I create an opportunity without a related lead?"
- "What's the default probability for Prospecting stage?"

### Capability: Move Opportunity Through Stages
**Required Knowledge**:
```
docs/ai/knowledge/opportunities/
├─ opportunity-stage-definitions.md  [Status: CREATE 🔨]
│  └─ All stages: Prospecting, Engage, Solution, Commit, Closed Won/Lost
│     Duration/typical time in each stage
│     Definition and success criteria
│
├─ opportunity-stage-gates.md        [Status: CREATE 🔨]
│  └─ Exit criteria for each stage
│     Required fields before moving forward
│     Who can approve stage change
│     What fields get locked/unlocked
│
└─ opportunity-stage-transitions.md  [Status: CREATE 🔨]
   └─ Valid transitions (forward, backward)
      System notifications on transition
      Audit trail recorded
```

### Capability: Forecast Management
**Required Knowledge**:
```
docs/ai/knowledge/opportunities/
├─ opportunity-forecast-calculation.md [Status: CREATE 🔨]
│  └─ Formula: Amount × Probability = Forecast
│     How probability affects forecast
│     Who can change probability
│     Impact on pipeline metrics
│
└─ opportunity-forecast-governance.md  [Status: CREATE 🔨]
   └─ Commit to forecast rules
      What requires manager approval
      Forecast category (pipeline, commit, won)
```

### Capability: Risk Scoring
**Required Knowledge**:
```
docs/ai/knowledge/opportunities/
├─ opportunity-risk-scoring.md       [Status: CREATE 🔨]
│  └─ Risk factors and weights
│     Age + no activity
│     Missing required fields at stage
│     Probability vs. amount mismatch
│
└─ opportunity-at-risk-dashboard.md  [Status: CREATE 🔨]
   └─ How system identifies at-risk opps
      What triggers alerts
      Recommended actions
```

---

## 3. Approvals Module

### Capability: Trigger Approval Workflows
**Required Knowledge**:
```
docs/ai/knowledge/approvals/
├─ approval-types.md                 [Status: CREATE 🔨]
│  └─ Discount approval
│     Override approval (probability/amount)
│     Forecast override approval
│     Skip-stage approval
│
├─ approval-thresholds.md            [Status: CREATE 🔨]
│  └─ When approval triggered (% discount, $ amount, etc.)
│     Different thresholds by role
│     Regional/territory variations
│
└─ approval-routing-rules.md         [Status: CREATE 🔨]
   └─ Where approvals route (manager, director, vp)
      Priority/SLA for approval
      Escalation if pending too long
```

### Capability: Approve/Reject Actions
**Required Knowledge**:
```
docs/ai/knowledge/approvals/
├─ approval-review-workflow.md       [Status: CREATE 🔨]
│  └─ How to view pending approvals
│     Information available for decision
│     How to approve/reject/comment
│
└─ approval-consequences.md          [Status: CREATE 🔨]
   └─ What happens on approve
      What happens on reject
      Can requester appeal rejection
```

---

## 4. Activities Module

### Capability: Log Activity
**Required Knowledge**:
```
docs/ai/knowledge/activities/
├─ activity-types-guide.md           [Status: CREATE 🔨]
│  └─ Call: date, duration, outcome type
│     Email: to/cc, subject, body preview
│     Meeting: date, time, attendees
│     Demo: presentation type, attendees
│     Task: due date, assignee, notes
│
├─ activity-outcomes.md              [Status: CREATE 🔨]
│  └─ Possible outcomes per activity type
│     What "Positive" vs "Neutral" means
│     Impact on lead/opp scoring
│
└─ activity-auto-linking.md          [Status: CREATE 🔨]
   └─ Auto-linked based on activity type
      Can manually link to multiple records
      Historical activity linked automatically
```

**Test Questions**:
- "What activity types can I log?"
- "What outcomes are available for a call?"
- "How does logging activity affect lead score?"

### Capability: View Activity Timeline
**Required Knowledge**:
```
docs/ai/knowledge/activities/
└─ activity-timeline-view.md         [Status: CREATE 🔨]
   └─ Chronological order (newest first)
      Filter by type
      Link between records
      Who can see which activities (permissions)
```

---

## 5. Command Center (Dashboard) Module

### Capability: View KPIs
**Required Knowledge**:
```
docs/ai/knowledge/command-center/
├─ dashboard-kpi-definitions.md      [Status: CREATE 🔨]
│  └─ Each KPI:
│     - What it measures
│     - Formula/calculation
│     - How to interpret
│     - Industry benchmarks
│
├─ dashboard-kpis-core.md            [Status: CREATE 🔨]
│  └─ Lead Response SLA Breaches
│     Pipeline Total
│     Commit Forecast
│     Win Rate
│     Avg Deal Size
│     Sales Cycle Length
│
└─ dashboard-alerts.md               [Status: CREATE 🔨]
   └─ SLA breaches
      At-risk opportunities
      Pending approvals
      Aging leads
```

**Test Questions**:
- "What does 'Lead Response SLA Breaches' mean?"
- "How is Win Rate calculated?"
- "What's considered an at-risk opportunity?"

---

## 6. Pipeline Governance Module

### Capability: Enforce Required Fields by Stage
**Required Knowledge**:
```
docs/ai/knowledge/pipeline-governance/
├─ stage-required-fields.md          [Status: CREATE 🔨]
│  └─ Prospecting: title, company, amount
│     Engage: decision maker, budget confirmed
│     Solution: proposal date, competitor
│     Commit: final amount, close date, conditions
│     (etc. for each stage)
│
└─ field-validation-rules.md         [Status: CREATE 🔨]
   └─ Field locked once move to stage X
      Field required before moving to stage Y
      Conditional requirements
```

### Capability: Stage Gates & Forecasting
**Required Knowledge**:
```
docs/ai/knowledge/pipeline-governance/
├─ forecast-rules-by-stage.md        [Status: CREATE 🔨]
│  └─ Pipeline stage: 10% probability
│     Commit: 50% probability (minimum)
│     Won: 100% probability
│     Lost: 0% probability
│
└─ stage-exit-criteria.md            [Status: CREATE 🔨]
   └─ What must be true before leaving stage
      Who can approve exit
      What triggers automatic stage change
```

---

## 7. Authentication & Permissions

### Capability: User Login & Role Assignment
**Required Knowledge**:
```
docs/ai/knowledge/auth/
├─ login-workflow.md                 [Status: READY ✅]
│  └─ Email/password or SSO
│     MFA enrollment
│     Session timeout
│
├─ user-roles-and-permissions.md     [Status: CREATE 🔨]
│  └─ Sales Rep: view/edit own records
│     Sales Manager: view team records
│     Administrator: full system access
│
└─ data-visibility-rules.md          [Status: CREATE 🔨]
   └─ What each role can see
      Tenant isolation
      Account-based filtering
```

---

## 8. Mobile/Responsive

### Capability: Use CRM on Mobile Device
**Required Knowledge**:
```
docs/ai/knowledge/assistant/
└─ mobile-optimized-workflows.md     [Status: CREATE 🔨]
   └─ Which features work on mobile
      Offline capabilities
      Recommended workflows on mobile
      Device-specific shortcuts/gestures
```

---

## 9. Integration Points

### Capability: API Access (Developer)
**Required Knowledge**:
```
docs/ai/knowledge/api/
├─ api-authentication.md             [Status: CREATE 🔨]
│  └─ Bearer token auth
│     API key generation
│     Token refresh
│     Rate limiting
│
├─ lead-api-endpoints.md             [Status: CREATE 🔨]
│  └─ GET /api/leads
│     POST /api/leads
│     PUT /api/leads/{id}
│     DELETE /api/leads/{id}
│
├─ opportunity-api-endpoints.md      [Status: CREATE 🔨]
│  └─ Similar for opportunities
│
├─ activity-api-endpoints.md         [Status: CREATE 🔨]
│  └─ Similar for activities
│
└─ error-responses-and-codes.md      [Status: CREATE 🔨]
   └─ 400 Bad Request, 401 Unauthorized...
      How to interpret error messages
      Common causes and solutions
```

---

## 10. Sales Playbooks

### Capability: Follow Daily Operating Procedures
**Required Knowledge**:
```
docs/ai/knowledge/sales-playbooks/
├─ sales-rep-daily-workflow.md       [Status: CREATE 🔨]
│  └─ 1. Check dashboard for alerts
│     2. Review SLA breaches
│     3. Log activities from previous day
│     4. Reach out to at-risk leads
│     5. Update opportunity stages
│
├─ sales-manager-daily-workflow.md   [Status: CREATE 🔨]
│  └─ 1. Review team KPIs
│     2. Identify underperforming reps
│     3. Review pending approvals
│     4. Conduct team coaching
│
├─ lead-qualification-playbook.md    [Status: CREATE 🔨]
│  └─ Is lead scorable? (firmographic fit)
│     What questions to ask?
│     Qualification gates/checks
│     When to disqualify
│
└─ opportunity-closing-playbook.md   [Status: CREATE 🔨]
   └─ Pre-closing checklist
      Required documentation
      Approval requirements
      Steps to close won/lost
```

---

## Sample Completion Checklist

### Phase 1: Foundation (Weeks 1-2)
- [ ] Lead Fields & Transitions: READY
- [ ] Lead SLA Policy: READY
- [ ] Opportunity Stages: CREATE + APPROVE
- [ ] Activity Types: CREATE + APPROVE
- [ ] Basic Sales Rep Playbook: CREATE + APPROVE

**Expected Result**: 22 documents indexed

### Phase 2: Depth (Weeks 3-4)
- [ ] Approval Workflows: CREATE + APPROVE
- [ ] Pipeline Governance: CREATE + APPROVE
- [ ] Advanced Forecasting: CREATE + APPROVE
- [ ] Sales Manager Playbook: CREATE + APPROVE
- [ ] API Reference: CREATE + APPROVE

**Expected Result**: 37 documents indexed

### Phase 3: Excellence (Weeks 5-6)
- [ ] Dashboard KPI Definitions: CREATE + APPROVE
- [ ] Mobile Workflows: CREATE + APPROVE
- [ ] Integration Guide: CREATE + APPROVE
- [ ] Troubleshooting: CREATE + APPROVE
- [ ] FAQ by Role: CREATE + APPROVE

**Expected Result**: 52+ documents indexed

---

## Status Template

Use this to track which documents exist:

```markdown
## Leads Module
- [x] lead-fields-complete.md (READY)
- [x] lead-status-transitions.md (READY)
- [x] lead-sla-policy.md (READY)
- [ ] lead-creation-workflow.md (CREATE)
- [ ] lead-duplicate-handling.md (CREATE)
- [ ] lead-search-filters.md (CREATE)
- [ ] lead-sorting-display.md (CREATE)
- [ ] lead-qualification-criteria.md (CREATE)
- [ ] lead-to-opportunity-conversion.md (CREATE)

## Opportunities Module
- [ ] opportunity-fields-complete.md (CREATE)
- [ ] opportunity-creation-guide.md (CREATE)
... (etc.)
```

---

## Next Actions

1. **Review this list** against your actual CRM capabilities
2. **Add missing capabilities** not listed here
3. **Create files** for [CREATE] items using templates in main guide
4. **Iterate**: Expand docs based on user questions the assistant can't answer
