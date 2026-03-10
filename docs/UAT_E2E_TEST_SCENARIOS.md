# CRM Enterprise — UAT & E2E Test Scenarios

> **Purpose**: This document defines the test users, seed data, and end-to-end workflow scenarios for UAT validation of the CRM system.  
> **Created**: 2026-03-09  
> **Status**: Ready for implementation  
> **Execution Method**: Playwright automated tests (data entry via UI)  
> **Target Environment**: Local development (`http://localhost:4200`)

---

## Goal Summary

**Objective**: Validate the complete CRM sales lifecycle—from lead creation through closed-won—by entering realistic data through the application UI via Playwright automation.

**What this tests:**
1. **User Authentication** — Login with Sales Rep and Sales Manager credentials
2. **Account Creation** — Create company records with full business details
3. **Contact Creation** — Add contacts linked to accounts
4. **Lead Management** — Create leads, update statuses through the lifecycle (New → Contacted → Qualified → Converted)
5. **BANT Qualification** — Enter qualification scores and evidence
6. **Lead Conversion** — Convert qualified leads into Account + Contact + Opportunity
7. **Opportunity Pipeline** — Progress deals through stages (Prospecting → Qualification → Proposal → Negotiation → Closed Won)
8. **Activity Logging** — Log calls, emails, and meetings against leads and opportunities
9. **Approval Workflow** — Trigger and resolve discount approval when threshold is exceeded
10. **Data Integrity** — Verify all created records display correctly in list views, filters, and detail pages

**Success Criteria**: All data entry operations complete without errors; all records are visible and correctly displayed in the CRM UI.

**Error Handling**: Any errors encountered during test execution are documented in `docs/DAILY_OPERATIONS_LOG.md` with root cause and fix applied.

---

## 1. Test Users

### 1.1 Sales Representatives (8)

| # | Full Name | Email | Role | TimeZone | Locale | Monthly Quota | Password |
|---|-----------|-------|------|----------|--------|---------------|----------|
| 1 | Marcus Rivera | marcus.rivera@crmenterprise.demo | Sales Rep | America/New_York | en-US | $75,000 | CrmTest!1 |
| 2 | Sarah Kim | sarah.kim@crmenterprise.demo | Sales Rep | America/Los_Angeles | en-US | $80,000 | CrmTest!1 |
| 3 | David Okonkwo | david.okonkwo@crmenterprise.demo | Sales Rep | Europe/London | en-GB | $65,000 | CrmTest!1 |
| 4 | Emily Zhang | emily.zhang@crmenterprise.demo | Sales Rep | Asia/Singapore | en-SG | $70,000 | CrmTest!1 |
| 5 | Carlos Mendez | carlos.mendez@crmenterprise.demo | Sales Rep | America/Chicago | es-US | $60,000 | CrmTest!1 |
| 6 | Aisha Patel | aisha.patel@crmenterprise.demo | Sales Rep | Asia/Dubai | en-AE | $85,000 | CrmTest!1 |
| 7 | James Sullivan | james.sullivan@crmenterprise.demo | Sales Rep | America/Denver | en-US | $72,000 | CrmTest!1 |
| 8 | Fatima Al-Hassan | fatima.alhassan@crmenterprise.demo | Sales Rep | Asia/Dubai | ar-AE | $78,000 | CrmTest!1 |

### 1.2 Sales Managers (2)

| # | Full Name | Email | Role | TimeZone | Locale | Monthly Quota | Password |
|---|-----------|-------|------|----------|--------|---------------|----------|
| 1 | Rachel Torres | rachel.torres@crmenterprise.demo | Sales Manager | America/New_York | en-US | $500,000 | CrmTest!1 |
| 2 | Daniel Brooks | daniel.brooks@crmenterprise.demo | Sales Manager | Europe/London | en-GB | $450,000 | CrmTest!1 |

### 1.3 Existing Users (Reference)

| Full Name | Email | Role |
|-----------|-------|------|
| Super Admin | admin@crmenterprise.demo | SuperAdmin |
| Yasser Ahamed | yasser.ahamed@crmenterprise.demo | Admin |
| Jordan Patel | jordan.patel@crmenterprise.demo | Sales Manager |
| Ava Chen | ava.chen@crmenterprise.demo | Sales Rep |
| Leo Martins | leo.martins@crmenterprise.demo | Marketing Ops |
| Priya Nair | priya.nair@crmenterprise.demo | Customer Success |
| Nina Okafor | nina.okafor@crmenterprise.demo | Support |

---

## 2. Primary E2E Workflow: "TechNova Solutions — Enterprise Platform Deal"

**Assigned Sales Rep**: Marcus Rivera (`marcus.rivera@crmenterprise.demo`)  
**Approving Manager**: Rachel Torres (`rachel.torres@crmenterprise.demo`)  
**Deal Value**: $125,000  
**Industry**: Technology / SaaS  
**Expected Duration**: Full lead-to-close lifecycle

### Step-by-Step Workflow

#### Step 1 — Create Account

| Field | Value |
|-------|-------|
| Company Name | TechNova Solutions Inc. |
| Industry | Technology |
| Website | https://technova-solutions.example.com |
| Phone | +1 (415) 555-8200 |
| Address | 2100 Innovation Blvd, Suite 400 |
| City | San Francisco |
| State | CA |
| Zip | 94105 |
| Country | United States |
| Owner | Marcus Rivera |

#### Step 2 — Create Contact

| Field | Value |
|-------|-------|
| First Name | Sophia |
| Last Name | Chen |
| Email | sophia.chen@technova-solutions.example.com |
| Phone | +1 (415) 555-8201 |
| Job Title | VP of Engineering |
| Account | TechNova Solutions Inc. |
| Owner | Marcus Rivera |

#### Step 3 — Create Lead (Status: New)

| Field | Value |
|-------|-------|
| First Name | Sophia |
| Last Name | Chen |
| Email | sophia.chen@technova-solutions.example.com |
| Phone | +1 (415) 555-8201 |
| Company Name | TechNova Solutions Inc. |
| Job Title | VP of Engineering |
| Source | Webinar |
| Territory | West Coast |
| Score | 0 (not yet scored) |
| Status | **New** |
| Owner | Marcus Rivera |

#### Step 4 — Log Activity: Initial Outreach Email

| Field | Value |
|-------|-------|
| Type | Email |
| Subject | Introduction — CRM Enterprise Platform |
| Description | Sent introductory email after webinar attendance. Highlighted enterprise features and requested a discovery call. |
| Date | 2026-03-01 10:00 UTC |
| Duration | 15 min |
| Related To | Lead: Sophia Chen |
| Owner | Marcus Rivera |

#### Step 5 — Update Lead Status → Contacted

| Field | Value |
|-------|-------|
| Status | **Contacted** |
| Notes | Sophia responded positively, interested in a demo. Scheduled discovery call for next week. |

#### Step 6 — Log Activity: Discovery Call

| Field | Value |
|-------|-------|
| Type | Call |
| Subject | Discovery Call — TechNova Platform Needs |
| Description | 45-minute discovery call. Sophia described pain points: fragmented tools, no unified pipeline view, manual approval workflows. Team of 40 engineers needs better project CRM. Budget cycle starts Q2. Decision involves CTO (James Wong). |
| Date | 2026-03-05 14:00 UTC |
| Duration | 45 min |
| Outcome | Positive — strong interest, budget available Q2 |
| Related To | Lead: Sophia Chen |
| Owner | Marcus Rivera |

#### Step 7 — BANT Qualification

| BANT Field | Value | Evidence |
|------------|-------|----------|
| Budget Availability | 8 / 10 | Q2 budget cycle, $100K–$150K range confirmed |
| Economic Buyer | James Wong, CTO | Sophia reports to CTO who has final sign-off |
| Problem Severity | 9 / 10 | Fragmented tools causing missed deals, manual approvals delaying closures |
| Buying Timeline | 7 / 10 | Q2 start, aiming for implementation by Q3 |
| ICP Fit | 9 / 10 | Mid-market SaaS, 200+ employees, complex sales cycle, needs approval workflows |
| Readiness to Spend | 8 / 10 | Active evaluation, comparing 2 other vendors |

#### Step 8 — Update Lead Status → Qualified

| Field | Value |
|-------|-------|
| Status | **Qualified** |
| Score | 85 |
| Qualified At | 2026-03-06 09:00 UTC |
| Notes | BANT fully qualified. Strong fit. Moving to conversion. |

#### Step 9 — Convert Lead → Account + Contact + Opportunity

| Field | Value |
|-------|-------|
| Action | **Convert Lead** |
| Converted At | 2026-03-06 09:30 UTC |
| Account Created | TechNova Solutions Inc. (link to Step 1 account) |
| Contact Created | Sophia Chen (link to Step 2 contact) |
| Opportunity Created | TechNova Enterprise Platform Deal |
| Lead Status | **Converted** |

#### Step 10 — Opportunity Created (Stage: Prospecting)

| Field | Value |
|-------|-------|
| Name | TechNova Enterprise Platform Deal |
| Amount | $125,000 |
| Currency | USD |
| Probability | 20% |
| Stage | **Prospecting** |
| Type | New Business |
| Account | TechNova Solutions Inc. |
| Primary Contact | Sophia Chen |
| Expected Close Date | 2026-06-30 |
| Owner | Marcus Rivera |
| Summary | Enterprise CRM platform deal for 40-person engineering org. VP of Engineering driving evaluation, CTO has budget authority. |
| Requirements | Unified pipeline view, automated approval workflows, real-time dashboards, API integrations |

#### Step 11 — Log Activity: Demo Meeting

| Field | Value |
|-------|-------|
| Type | Meeting |
| Subject | Product Demo — TechNova Engineering Team |
| Description | Full platform demo for Sophia Chen (VP Eng) and James Wong (CTO). Covered pipeline management, approval automation, dashboards, and API capabilities. CTO impressed with real-time features. Asked for proposal with enterprise pricing. |
| Date | 2026-03-12 15:00 UTC |
| Duration | 60 min |
| Related To | Opportunity: TechNova Enterprise Platform Deal |
| Owner | Marcus Rivera |

#### Step 12 — Advance Opportunity → Qualification Stage

| Field | Value |
|-------|-------|
| Stage | **Qualification** |
| Probability | 40% |
| Notes | Demo completed successfully. CTO engaged. Moving to proposal phase. |

#### Step 13 — Advance Opportunity → Proposal Stage

| Field | Value |
|-------|-------|
| Stage | **Proposal** |
| Probability | 60% |
| Proposal Status | Sent |
| Proposal Sent At | 2026-03-15 10:00 UTC |
| Proposal Notes | Enterprise tier proposal: $125,000/year, 50 seats, premium support, custom API integrations, dedicated onboarding. Includes 15% multi-year discount for 3-year commitment. |
| Discount Percent | 15% |
| Pricing Notes | 15% multi-year discount for 3-year commitment ($106,250/year effective) |

#### Step 14 — Approval Required (Discount > 10% Threshold)

> The 15% discount exceeds the system threshold of 10%, triggering an approval request.

| Field | Value |
|-------|-------|
| Purpose | Discount |
| Amount | $125,000 |
| Currency | USD |
| Status | **Pending** |
| Requested By | Marcus Rivera (Sales Rep) |
| Approver Role | Sales Manager |
| Approver User | Rachel Torres |
| Step Order | 1 |
| Requested On | 2026-03-15 10:30 UTC |
| Notes | 15% multi-year discount on $125K deal. 3-year commitment. Customer comparing 2 competitors. |

#### Step 15 — Manager Approves Discount

| Field | Value |
|-------|-------|
| Status | **Approved** |
| Decision On | 2026-03-15 14:00 UTC |
| Decision Notes | Approved — 3-year commitment justifies 15% discount. Strong strategic account. |
| Approver | Rachel Torres |

#### Step 16 — Advance to Negotiation → Closed Won

| Field | Value |
|-------|-------|
| Stage | **Negotiation** → **Closed Won** |
| Probability | 80% → 100% |
| Is Closed | true |
| Is Won | true |
| Win/Loss Reason | Strong product fit, competitive pricing with multi-year discount, CTO champion |
| Contract Start Date | 2026-07-01 |
| Contract End Date | 2029-06-30 |
| Forecast Category | Closed |
| Final Amount | $125,000 |

---

## 3. Additional Seed Data — Leads (Various Statuses)

These leads provide coverage across all lifecycle stages for UI validation and filtering.

| # | First Name | Last Name | Company | Source | Status | Owner | Score | Notes |
|---|-----------|-----------|---------|--------|--------|-------|-------|-------|
| 1 | Robert | Fischer | Meridian Logistics | LinkedIn | **New** | Sarah Kim | 0 | Inbound from LinkedIn ad campaign |
| 2 | Amara | Osei | GreenLeaf Organics | Referral | **New** | David Okonkwo | 0 | Referred by existing customer |
| 3 | Liam | Hartley | Atlas Financial Group | Trade Show | **Contacted** | Emily Zhang | 25 | Met at FinTech Summit, initial call completed |
| 4 | Yuki | Tanaka | Sakura Digital | Website | **Contacted** | Carlos Mendez | 30 | Submitted website inquiry, responded to follow-up |
| 5 | Pradeep | Sharma | Indus Manufacturing | Cold Call | **Nurture** | Aisha Patel | 40 | Interested but budget not until Q4 |
| 6 | Eva | Kowalski | EuroTech Dynamics | Event | **Qualified** | James Sullivan | 78 | BANT qualified, pending conversion |
| 7 | Omar | Khalil | Crescent Trading Co. | Partner | **Disqualified** | Fatima Al-Hassan | 15 | Company too small, < 10 employees, not ICP fit |

---

## 4. Additional Seed Data — Opportunities (Various Pipeline Stages)

These opportunities provide coverage across all pipeline stages for kanban/table views.

| # | Name | Amount | Stage | Account | Owner | Probability | Close Date | Notes |
|---|------|--------|-------|---------|-------|-------------|------------|-------|
| 1 | Meridian Fleet Tracking Suite | $45,000 | **Prospecting** | Meridian Logistics | Sarah Kim | 15% | 2026-08-15 | Early stage, needs discovery |
| 2 | Atlas Portfolio Dashboard | $92,000 | **Qualification** | Atlas Financial Group | Emily Zhang | 35% | 2026-07-30 | Demo completed, evaluating requirements |
| 3 | GreenLeaf Supply Chain CRM | $38,000 | **Proposal** | GreenLeaf Organics | David Okonkwo | 55% | 2026-06-15 | Proposal sent, awaiting feedback |
| 4 | EuroTech Engineering Hub | $67,500 | **Negotiation** | EuroTech Dynamics | James Sullivan | 75% | 2026-05-30 | Contract terms under review |
| 5 | Sakura Digital Expansion | $28,000 | **Closed Lost** | Sakura Digital | Carlos Mendez | 0% | 2026-03-01 | Lost to competitor — pricing gap |

---

## 5. Additional Seed Data — Accounts

| # | Company Name | Industry | Website | City | Country | Owner |
|---|-------------|----------|---------|------|---------|-------|
| 1 | Meridian Logistics | Transportation | https://meridian-logistics.example.com | Houston | United States | Sarah Kim |
| 2 | GreenLeaf Organics | Agriculture | https://greenleaf-organics.example.com | Portland | United States | David Okonkwo |
| 3 | Atlas Financial Group | Financial Services | https://atlas-financial.example.com | Singapore | Singapore | Emily Zhang |
| 4 | EuroTech Dynamics | Manufacturing | https://eurotech-dynamics.example.com | Munich | Germany | James Sullivan |
| 5 | Sakura Digital | Media & Entertainment | https://sakura-digital.example.com | Tokyo | Japan | Carlos Mendez |
| 6 | Indus Manufacturing | Manufacturing | https://indus-manufacturing.example.com | Mumbai | India | Aisha Patel |
| 7 | Crescent Trading Co. | Wholesale Trade | https://crescent-trading.example.com | Dubai | UAE | Fatima Al-Hassan |

---

## 6. Additional Seed Data — Contacts

| # | First Name | Last Name | Email | Job Title | Account | Owner |
|---|-----------|-----------|-------|----------|---------|-------|
| 1 | Robert | Fischer | robert.fischer@meridian-logistics.example.com | Head of Operations | Meridian Logistics | Sarah Kim |
| 2 | Amara | Osei | amara.osei@greenleaf-organics.example.com | Procurement Director | GreenLeaf Organics | David Okonkwo |
| 3 | Liam | Hartley | liam.hartley@atlas-financial.example.com | CIO | Atlas Financial Group | Emily Zhang |
| 4 | Yuki | Tanaka | yuki.tanaka@sakura-digital.example.com | Digital Strategy Lead | Sakura Digital | Carlos Mendez |
| 5 | Pradeep | Sharma | pradeep.sharma@indus-manufacturing.example.com | Plant Manager | Indus Manufacturing | Aisha Patel |
| 6 | Eva | Kowalski | eva.kowalski@eurotech-dynamics.example.com | VP of Sales | EuroTech Dynamics | James Sullivan |
| 7 | Omar | Khalil | omar.khalil@crescent-trading.example.com | General Manager | Crescent Trading Co. | Fatima Al-Hassan |

---

## 7. Tenant Configuration

| Setting | Value | Purpose |
|---------|-------|---------|
| ApprovalAmountThreshold | $50,000 | Triggers manager approval for deals ≥ $50K |
| ApprovalApproverRole | Sales Manager | Role that receives approval requests |

> **Note**: Discount approval is separately triggered at **10% discount** or **$1,000 discount amount** (hardcoded in `OpportunityQuoteService`).

---

## 8. Validation Checklist

### Login & Users
- [ ] Login as each new Sales Rep — verify dashboard loads
- [ ] Login as each Sales Manager — verify manager views available
- [ ] Verify user avatars, names, and roles display correctly in shell header

### Leads Page
- [ ] All 8 leads visible (7 additional + 1 primary, or converted)
- [ ] Filter by status: New (2), Contacted (2), Nurture (1), Qualified (1), Converted (1), Disqualified (1)
- [ ] Lead scores display correctly
- [ ] Owner assignment shows correct rep names

### Deals / Opportunities Page
- [ ] All 6 opportunities visible (5 additional + 1 primary)
- [ ] Kanban view: cards distributed across correct stages
- [ ] Table view: amounts, probabilities, close dates correct
- [ ] Closed Won deal (TechNova) shows green status
- [ ] Closed Lost deal (Sakura Digital) shows red status

### Approval Workflow
- [ ] Login as Marcus Rivera — verify approval request was submitted
- [ ] Login as Rachel Torres — verify pending approval in inbox
- [ ] Approval shows correct deal amount, discount %, and purpose

### Activities
- [ ] TechNova timeline shows 3 activities: Email, Call, Meeting
- [ ] Activities linked to correct lead/opportunity

### Accounts & Contacts
- [ ] 8 accounts visible (7 additional + TechNova)
- [ ] Each account has at least 1 contact
- [ ] Contact details (email, phone, job title) display correctly

---

## 9. Implementation Notes

### Target File
`server/src/CRM.Enterprise.Infrastructure/Persistence/DatabaseInitializer.cs`

### Changes Required
1. **Extend `_seedUsers` array** (line ~1584) with 10 new entries (8 reps + 2 managers)
2. **Add `SeedE2EWorkflowDataAsync()` method** — creates accounts, contacts, leads, opportunities, activities, and approval chain
3. **Call new method** from `SeedTenantDataAsync()` after user seeding completes
4. **Set tenant approval threshold** to $50,000 in tenant config

### Guard
All E2E seed data is guarded by `ShouldSeedProductionTestData()` — will NOT execute in production unless explicitly overridden.

### Password
All test users use password `CrmTest!1`, hashed via ASP.NET Identity `PasswordHasher<User>` (PBKDF2-SHA256).

---

## 10. Scenario 2 — Extended Data Seeding (Users, Lead Enrichment, Campaigns, Help Desk, Pipeline)

> **Execution Method**: API-based Playwright tests (no fragile UI automation)  
> **Spec File**: `client/e2e/uat-e2e-data-entry.spec.ts` → `test.describe('UAT — Scenario 2')`  
> **Depends on**: Scenario 1 (TechNova workflow) + seed data must run first

### Step 1 — Seed Test Users (8 Sales Reps + 2 Sales Managers)

Create team members via `POST /api/users`. Each user gets:
- Assigned role(s) by name lookup (`GET /api/roles`)
- Temporary password `CrmTest!1`
- `UserAudience = "Internal"`
- Idempotent: 409 Conflict → skip (already exists)

| # | Full Name | Email | Role | TimeZone | Locale | Monthly Quota |
|---|-----------|-------|------|----------|--------|---------------|
| 1 | Marcus Rivera | marcus.rivera@crmenterprise.demo | Sales Rep | America/New_York | en-US | $75,000 |
| 2 | Sarah Kim | sarah.kim@crmenterprise.demo | Sales Rep | America/Los_Angeles | en-US | $80,000 |
| 3 | David Okonkwo | david.okonkwo@crmenterprise.demo | Sales Rep | Europe/London | en-GB | $65,000 |
| 4 | Emily Zhang | emily.zhang@crmenterprise.demo | Sales Rep | Asia/Singapore | en-SG | $70,000 |
| 5 | Carlos Mendez | carlos.mendez@crmenterprise.demo | Sales Rep | America/Chicago | es-US | $60,000 |
| 6 | Aisha Patel | aisha.patel@crmenterprise.demo | Sales Rep | Asia/Dubai | en-AE | $85,000 |
| 7 | James Sullivan | james.sullivan@crmenterprise.demo | Sales Rep | America/Denver | en-US | $72,000 |
| 8 | Fatima Al-Hassan | fatima.alhassan@crmenterprise.demo | Sales Rep | Asia/Dubai | ar-AE | $78,000 |
| 9 | Rachel Torres | rachel.torres@crmenterprise.demo | Sales Manager | America/New_York | en-US | $500,000 |
| 10 | Daniel Brooks | daniel.brooks@crmenterprise.demo | Sales Manager | Europe/London | en-GB | $450,000 |

### Step 2 — Enrich Lead Statuses per UAT Spec

Update additional leads from Step 14 (Scenario 1) to realistic lifecycle statuses via `PUT /api/leads/:id`.

| Lead | Current Status | Target Status | Score | Extra Fields |
|------|---------------|---------------|-------|--------------|
| Robert Fischer | New | New | 0 | (no change) |
| Amara Osei | New | New | 0 | (no change) |
| Liam Hartley | New | Contacted | 25 | — |
| Yuki Tanaka | New | Contacted | 30 | — |
| Pradeep Sharma | New | Nurture | 40 | nurtureFollowUpAtUtc = 2026-10-01 |
| Eva Kowalski | New | Qualified | 78 | BANT scores filled |
| Omar Khalil | New | Disqualified | 15 | disqualifiedReason = "Company too small, < 10 employees, not ICP fit" |

### Step 3 — Create Marketing Campaigns

Create 4 campaigns via `POST /api/marketing/campaigns` at different lifecycle stages.
If the marketing feature is disabled, the test skips gracefully.

| # | Name | Type | Channel | Status | Budget Planned | Objective |
|---|------|------|---------|--------|----------------|-----------|
| 1 | Q2 Product Launch | Product Launch | Email | Active | $15,000 | Drive awareness for new enterprise platform features |
| 2 | FinTech Summit 2026 | Event | Event | Planned | $25,000 | Generate 50 qualified leads from financial services vertical |
| 3 | LinkedIn ABM Campaign | ABM | Social | Active | $8,000 | Target 20 mid-market accounts in technology sector |
| 4 | Customer Referral Program | Referral | Partner | Completed | $5,000 | Activate existing customer base for referral leads |

### Step 4 — Create Help Desk Support Cases

Create 4 support cases via `POST /api/helpdesk/cases` with various priorities/categories.
Linked to existing accounts and contacts from Scenario 1 seed data.

| # | Subject | Priority | Severity | Category | Source | Account |
|---|---------|----------|----------|----------|--------|---------|
| 1 | Unable to access dashboard reports | High | Sev2 | Technical | Email | TechNova Solutions Inc. |
| 2 | Request for API integration documentation | Medium | Sev3 | General | Portal | Atlas Financial Group |
| 3 | Billing discrepancy on Q1 invoice | High | Sev2 | Billing | Phone | EuroTech Dynamics |
| 4 | Feature request: custom workflow templates | Low | Sev4 | Feature Request | Email | GreenLeaf Organics |

### Step 5 — Close Sakura Digital Opportunity (Closed Lost)

Update the "Sakura Digital Expansion" opportunity via `PUT /api/opportunities/:id`:
- `stageName = "Closed Lost"`
- `isClosed = true`, `isWon = false`
- `winLossReason = "Lost to competitor — pricing gap"`
- `forecastCategory = "Omitted"`

### Step 6 — Verify All List Views

Navigate to each CRM list page via Playwright and verify data loads:
- **Leads page** — verify mixed statuses visible (New, Contacted, Nurture, Qualified, Disqualified, Converted)
- **Deals page** — verify pipeline stages populated
- **Accounts page** — verify 8+ accounts
- **Contacts page** — verify 8+ contacts
- **Dashboard** — verify dashboard loads with data

---

## 11. Scenario 2 Validation Checklist

### Test Users
- [ ] All 10 test users created (or confirmed existing)
- [ ] Each user has correct role assignment (Sales Rep or Sales Manager)
- [ ] Users can login with `CrmTest!1` password

### Lead Lifecycle Mix
- [ ] Leads page shows mixed statuses: New (2), Contacted (2+), Nurture (1), Qualified (1+), Disqualified (1), Converted (1)
- [ ] Lead scores reflect updated values
- [ ] Disqualified lead shows reason

### Marketing Campaigns
- [ ] 4 campaigns visible in campaign list (or skipped if feature disabled)
- [ ] Campaign statuses: Active (2), Planned (1), Completed (1)

### Help Desk Cases
- [ ] 4 support cases created with correct priorities
- [ ] Cases linked to accounts

### Pipeline
- [ ] Sakura Digital opportunity shows as Closed Lost
- [ ] Dashboard reflects all pipeline data
