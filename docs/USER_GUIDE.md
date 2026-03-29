# CRM Enterprise User Guide (Draft)

This guide explains the end-to-end flow from login to core CRM operations, including the recommended order of work for daily use. It is written for someone new to CRM systems.

---

## Realistic Example (New User Story)

Imagine you are a new sales rep at "NorthEdge CRM." You get an email from a potential customer asking for a demo.

1) **Create a Lead**
- You open Leads and add the person and company info.
- Why: a lead is a potential customer, and it’s the starting point for all future actions.

2) **Qualify the Lead**
- You add a few details (company, job title, source).
- You score the lead (or AI scores it).
- Why: qualification helps prioritize who is most likely to buy.

3) **Create Activities**
- You add a task: “Call the lead tomorrow.”
- Why: activities keep your follow-ups organized and visible to your team.

4) **Convert to Opportunity**
- After the call, the lead is interested.
- You convert the lead into an opportunity.
- Why: an opportunity represents a real opportunity with value and a pipeline stage.

5) **Update Opportunity Stage**
- You move the opportunity from “Qualified” to “Proposal.”
- Why: pipeline stages help forecast revenue and track progress.

6) **Close the Opportunity**
- If the opportunity is won or lost, you record a reason.
- Why: win/loss data improves sales strategy.

## Realistic Use Cases (Step-by-step Examples)

### Use Case 1: Inbound website lead
**Scenario**: A visitor fills out your website form asking for a demo.
**Example**:
1) Leads -> Add Lead  
   Name: Sarah Johnson  
   Email: sarah@techstartup.io  
   Company: TechStartup Inc  
   Source: Website  
   Status: New  
2) Save.
3) Add Activity -> Call  
   Subject: Qualification call  
   Due: Today  
   Priority: High  
**Outcome**: Lead is tracked and a follow-up is scheduled.

### Use Case 2: Qualification call and status update
**Scenario**: You call Sarah and confirm budget/timeline.
**Example**:
1) Lead -> Update Status: New -> Contacted  
2) Log Activity -> Meeting  
   Subject: Demo scheduled  
   Due: Tomorrow  
3) Update Status: Contacted -> Qualified  
**Outcome**: Lead is ready for conversion.

### Use Case 3: Convert a qualified lead to opportunity
**Scenario**: Sarah is a real buyer.
**Example**:
1) Lead -> Convert  
2) Create:
   - Account: TechStartup Inc
   - Contact: Sarah Johnson
   - Opportunity: TechStartup - CRM Pilot  
**Outcome**: Lead becomes an opportunity in the pipeline.

### Use Case 4: Opportunity progression and proposal
**Scenario**: Opportunity value is $25,000 and needs a proposal.
**Example**:
1) Opportunity -> Update  
   Amount: $25,000  
   Stage: Discovery -> Proposal  
   Close Date: Feb 15, 2026  
2) Add Activity -> Task  
   Subject: Send proposal  
   Due: Tomorrow  
**Outcome**: Pipeline reflects the active proposal.

### Use Case 5: Won opportunity and onboarding task
**Scenario**: Sarah agrees to $23,000 and signs.
**Example**:
1) Opportunity -> Stage: Closed Won  
   Amount: $23,000  
   Win Reason: Price + timing  
2) Account -> Update Lifecycle: Lead -> Customer  
3) Add Activity -> Task  
   Subject: Schedule onboarding call  
   Due: Next week  
**Outcome**: Customer is onboarded with a clear next step.

### Use Case 6: Lost opportunity and learning
**Scenario**: A prospect chooses another vendor.
**Example**:
1) Opportunity -> Stage: Closed Lost  
2) Loss Reason: "Competitor lower price"  
**Outcome**: Loss data is captured for future strategy.

### Use Case 7: Upsell existing customer
**Scenario**: 6 months later, customer wants an add-on.
**Example**:
1) Account -> New Opportunity  
   Name: TechStartup - Add-on Module  
   Amount: $8,000  
   Stage: Discovery  
   Close Date: Mar 2026  
**Outcome**: Multiple opportunities tracked under one account.

### Use Case 8: Support request as activity
**Scenario**: Customer calls with a service issue.
**Example**:
1) Account -> Log Activity  
   Type: Call  
   Subject: Support issue  
   Notes: "Cannot access reports"  
2) Create follow-up Task  
**Outcome**: Service request is tracked with visibility.

### Use Case 9: Renewal tracking
**Scenario**: Contract renews in 60 days.
**Example**:
1) Account -> New Opportunity  
   Name: TechStartup - 2026 Renewal  
   Close Date: Contract expiry  
   Stage: Negotiation  
**Outcome**: Renewal is treated as a formal opportunity.

### Use Case 10: Multi-contact decision team
**Scenario**: Enterprise opportunity needs multiple stakeholders.
**Example**:
1) Account -> Add Contacts  
   Sarah (Champion), Mike (Budget), Lisa (Technical)  
2) Opportunity -> Link key contacts  
3) Activities -> Log meetings per contact  
**Outcome**: You track influence and decision flow.

## Full CRM Cycle (End-to-end Example)

**Company**: TechStartup Inc  
**Primary Contact**: Sarah Johnson  
**Goal**: Move from inbound interest to closed opportunity and post-sale follow-up.

1) **Lead Intake**
   - Leads -> Add Lead
   - Name: Sarah Johnson
   - Email: sarah@techstartup.io
   - Company: TechStartup Inc
   - Source: Website
   - Status: New
   - Save

2) **First Follow-up**
   - Lead -> Add Activity (Call)
   - Subject: Qualification call
   - Due: Today
   - Priority: High
   - Save

3) **Qualification**
   - Lead -> Update Status: New -> Contacted
   - Notes: Budget confirmed, needs CRM in Q1
   - Lead -> Update Status: Contacted -> Qualified

4) **Convert to Opportunity**
   - Lead -> Convert
   - Creates:
     - Account: TechStartup Inc
     - Contact: Sarah Johnson
     - Opportunity: TechStartup - CRM Pilot

5) **Pipeline Progress**
   - Opportunity -> Update
   - Stage: Discovery -> Proposal
   - Amount: $25,000
   - Close Date: Feb 15, 2026
   - Add Activity: Send proposal (Task, due tomorrow)

6) **Negotiation**
   - Opportunity -> Update
   - Stage: Proposal -> Negotiation
   - Amount: $23,000
   - Add Activity: Final review call

7) **Close**
   - Opportunity -> Stage: Closed Won
   - Win Reason: Feature fit + pricing
   - Account -> Lifecycle: Customer
   - Add Activity: Schedule onboarding call

8) **Post-sale**
   - Activities -> Log onboarding meeting
   - Accounts -> Add upsell opportunity (optional)

Result: Full cycle tracked from lead to customer with follow-ups and audit trail.

## Role-based Workflows (What Each Role Does)

### Super Admin
**Goal**: Keep the system running for all tenants.
1) Settings -> Tenants: create or switch tenant
2) Workspace Settings: set time zone, currency, approvals
3) Roles: define permissions for each role
4) Users: invite admins or managers

### Admin
**Goal**: Configure CRM for the team.
1) Users: invite sales team members
2) Roles: assign permissions
3) Lead Assignment: set routing rules
4) Notifications: enable alerts for tasks/opps

### Sales Manager
**Goal**: Monitor pipeline and coach reps.
1) Dashboard: review KPIs and pipeline value
2) Opportunities: review stages and stalled opportunities
3) Leads: review new leads and assignments
4) Activities: check overdue tasks and follow-ups

### Sales Rep
**Goal**: Work leads and close opportunities.
1) Leads: create and update status
2) Activities: log calls/meetings/tasks
3) Convert lead -> opportunity
4) Opportunities: move stages and update amounts

### Support / Customer Success
**Goal**: Handle customer issues and renewals.
1) Accounts: view customer details
2) Activities: log support calls or tickets
3) Opportunities: track renewals and upsells

## 1) Login and Tenant Context

1. Open the app in your browser.
2. Confirm the correct workspace/tenant context (tenant key or tenant host mapping).
3. Sign in with either:
   - Email + password, or
   - Microsoft sign-in (when Entra is enabled for your environment).
4. Your tenant context is resolved automatically. If you are a super admin, you can switch tenants in the Settings area.

Notes:
- If you see data that does not match your company, verify the active tenant.
- If you are a super admin, tenant data is isolated by tenant key.
- Internal users are expected to use `Internal` audience access; external/portal users are separate scope.

## 2) Navigation Overview (What Each Module Means)

Primary modules:
- **Dashboard**: A summary of KPIs and urgent work. Without it, you must build reports manually or check every list.
- **Customers (Accounts)**: Companies or organizations you sell to. Without accounts, you lose the “big picture” relationship.
- **Contacts**: People inside a customer account. Without contacts, you lose who to call and their role.
- **Leads**: Early-stage prospects not yet qualified. Without leads, you forget or lose early opportunities.
- **Opportunities**: Opportunities in progress with value and stage. Without this, forecasting and pipeline management becomes guesswork.
- **Activities**: Tasks, calls, meetings. Without activities, follow-ups become manual and inconsistent.

Settings:
- **Users**: Manage people who can access the system. Without this, you can’t onboard a team.
- **Roles**: Define permissions. Without roles, anyone can change critical data.
- **Workspace**: Tenant settings (time zone, currency, approvals). Without this, data is inconsistent across teams.
- **Lead assignment**: Rules to assign leads. Without it, leads get lost or unevenly distributed.
- **Notifications**: Alerts for tasks and updates. Without it, users miss critical actions.

## 3) Recommended Daily Workflow (Order of Work)

1) Review Dashboard
- Check KPIs and tasks due today.
- Scan the pipeline for stalled opportunities and urgent items.

2) Work Leads
- Create or update leads.
- Assign owners or use assignment rules.
- Convert qualified leads into account/contact/opportunity.

3) Update Opportunities
- Move stage forward based on progress.
- Add win/loss reasons on close.

4) Log Activities
- Add calls, meetings, or tasks.
- Ensure overdue items are resolved.

5) Maintain Accounts and Contacts
- Keep account details current.
- Update contact roles and emails.

## 4) Leads: Create, Qualify, Convert

Create a lead:
- Go to Leads -> Add Lead.
- Fill basics (name, company, contact).
- Set status, assignment, and owner.
- Save.

AI Score:
- Open a lead and click AI score to refresh the score.
- The score updates automatically when key fields change (email, phone, company, job title, source, territory, account/contact).

Convert a lead:
- Open a lead -> Convert.
- Choose account/contact/opportunity.
- Confirm to create linked records.

Lead history:
- Open the lead and scroll to **Status history** to see who changed status and when.
- Use **Activities** on the lead to see calls, meetings, and tasks over time.

## 5) Opportunities: Stage and Outcomes

Edit an opportunity:
- Update stage, close date, and amount.
- If closing, add win/loss reason.
- The pipeline view reflects stage history and risk.

## 6) Activities: Tasks, Calls, Meetings

Create activities:
- Use templates (Call/Meeting/Follow-up) for quick entry.
- Link activities to account, contact, or opportunity.
- Track due dates and priorities.

My Tasks:
- Use the task list to stay on track.
- Overdue items are highlighted.

## 7) Customers (Accounts) and Contacts

Accounts:
- Create and manage companies.
- Link contacts and opportunities.

Contacts:
- Add people linked to accounts.
- Track roles and communication details.

## 8) Quick Add

Use the quick add action in the shell to create:
- Lead
- Contact
- Activity
without leaving your current page.

## 9) Search, Filters, and Bulk Actions

Search and filters:
- Use the list view search.
- Save views per user for quick recall.

Bulk actions:
- Assign owners in bulk.
- Update statuses in bulk.
- Delete with confirmation.

## 10) Roles and Permissions

Roles control:
- Which modules are visible.
- Which actions are allowed.
- Audience compatibility (Internal vs External).

Admin role templates:
- **Internal Admin**: Workspace governance (users, roles, settings, audit, admin operations).
- **External Admin**: Support-focused administration (Help Desk operations) without tenant/workspace governance.

Guardrails:
- External users cannot be assigned roles that include governance permissions such as Administration/Tenants management.
- If a role is incompatible with External audience, user save returns a validation error.

User access review (Settings -> Users -> Edit User):
- Permissions are shown in a grouped table by module (merged module cells).
- Use filters for module, risk, change type, and search.
- Switch perspective between `After Save` and `Current` to preview access impact before saving.
- Conflict banner highlights risky combinations (for example, elevated access without view).

If you cannot see a menu:
- The role does not have view permission.

If a button is disabled:
- The role does not have manage permission.

## 11) Notifications

Notifications include:
- Task assigned
- Opportunity updates

Use Settings -> Notifications to opt in or out of email alerts.

Temporary operational override (2026-03-05):
- Notification emails are globally disabled by backend guardrail.
- In-app notifications continue to work.

## 12) Workspace Settings

Configure:
- Company name
- Time zone
- Currency
- Approval thresholds (single-level)

These settings apply to your tenant.

## 13) Help Desk (Now)

What is delivered now:
- Cases list/workspace with quick views and bulk actions.
- Queue management with member assignment.
- SLA policy matrix + escalation worker.
- Email-to-case intake webhook.
- Realtime case updates and summary KPI cards.
- CSAT score + closure reason analytics.
- Agent macros/canned responses.

Agent flow:
1) Go to `Help Desk -> Cases`.
2) Open `New Case`.
3) Set priority/severity/category and save.
4) Assign queue/owner, then use `Quick status`.
5) Add conversation comments and track timeline/escalations.
6) Capture closure reason + CSAT before close.

## 14) Troubleshooting

Login issues:
- Verify the tenant key and correct credentials.
- If Microsoft sign-in is enabled, verify Entra client/authority settings are configured for this environment.
- Confirm API is running and reachable.

AI scoring errors:
- Ensure OpenAI key is configured for the API.
- Verify the API is running and the lead has at least two signals.

## 15) Best Practices

---

## Use Case Coverage Map (vs Dynamics baseline)

Why this can beat Dynamics (for SMBs):
- Fewer clicks to reach “next action” (lead → activity → conversion).
- Clearer guidance (outcomes and task completion are explicit).
- Cleaner UX (reduced clutter, faster onboarding, less admin setup).
- AI scoring + next‑step hints are front‑and‑center, not hidden.

Supported now (no system change):
- New inbound lead → qualify → convert → opportunity → close won/lost.
- Existing customer expansion (new opportunity on account).
- Task‑driven sales day (My Tasks + Activities).
- Manager pipeline review (filter by stage/owner).
- Lost opportunity with reason.

Needs small change (Next polish):
- Activity outcome notes (done) + explicit “Completed at”.
- Optional “Nurture/Inactive” lead status for cold leads.
- Clear owner handoff step + audit.
- Bulk actions + bulk task creation for outreach lists.

Later (bigger changes):
1) Parent/child accounts + roll‑up reporting.
2) Audit log / History tab (who changed what, when) for Leads, Opportunities, Accounts.
3) Completed activity editing permissions (owner/admin only) + audit trail.
4) Competitor displacement tracking field + reporting.
5) Proposal/quote workflow (files or docs).
6) Partner/referral commissions + payout tracking.

## Core Use Cases (MVP‑ready and recommended order)

### Use Case 1: New Lead → Qualified → Opportunity Won
1) Create lead (name, company, source).
2) Add activity (call) with due date and priority.
3) After call, set activity status to Completed and add Outcome.
4) Update lead status: New → Contacted → Qualified.
5) Convert lead (creates Account + Contact + Opportunity).
6) Move opportunity stages until Closed Won and record win reason.

### Use Case 2: Existing Customer Expansion (Upsell)
1) Open Account.
2) Add new Contact (decision‑maker).
3) Create new Opportunity tied to Account.
4) Log activities and update stages.

### Use Case 3: Task‑Driven Sales Day
1) Open Activities → My Tasks.
2) Work overdue first, then due today.
3) Mark completed tasks and add Outcomes.
4) Update related lead/opportunity status if needed.

### Use Case 4: Lead Assignment for Teams
1) Admin sets Lead Assignment rule (round‑robin or manual).
2) New leads get assigned to owners.
3) Owner completes first activity and updates lead status.

### Use Case 5: Manager Pipeline Review
1) Open Opportunities list or pipeline view.
2) Filter by owner and stage.
3) Identify stalled opportunities and schedule follow‑ups.

## Advanced Scenarios (Keep for Later)
- Parent‑child accounts with roll‑up reporting.
- Competitor displacement tracking and analysis.
- Quote/proposal document flow.
- Partner/referral commissions and revenue sharing.
- Audit log / History tab (who changed what, when) for Leads, Opportunities, Accounts.

---

## Feature Highlights You Should Use

### Timeline and Attachments (Accounts/Contacts)
- Every account/contact has a timeline of recent activity.
- Attachments allow you to store proposals, contracts, or notes.
- Why it matters: centralizes customer context so you don’t search email threads.

### CSV Import/Export
- Export list data from Customers/Contacts/Leads for offline work.
- Import CSV to bulk load records quickly.
- Why it matters: fast onboarding and data cleanup.

### Recently Viewed
- Each module shows your last viewed items for quick return.
- Why it matters: saves time during follow‑ups.

### Inline Edit
- Update owner/status/stage directly in list views.
- Why it matters: fewer clicks, faster pipeline hygiene.

### Bulk Actions
- Assign owners, update status, or delete multiple records at once.
- Why it matters: saves hours on cleanup or reassignment.

### Lead Assignment Rules
- Automatically assigns leads using rules (round‑robin, manual, territory).
- Why it matters: no lead gets lost or ignored.

### Approval Thresholds
- Workspace settings can block large opportunities without approval.
- Why it matters: prevents risky discounting or unauthorized opportunities.

### Notification Center
- In‑app notifications alert you to task assignments and updates.
- Email preferences control whether alerts go to your inbox.

### Tenant Switching (Super Admin)
- Super admins can switch tenants to manage multiple workspaces.
- Why it matters: manage multiple client orgs in one system.

---

## Role‑Based Scenarios

### Super Admin
Primary focus:
- Create/manage tenants.
- Validate tenant isolation.
- Configure global defaults.
Daily flow:
1) Switch to tenant.
2) Validate workspace settings.
3) Spot‑check users/roles.

### Admin
Primary focus:
- Users, roles, workspace settings, data hygiene.
Daily flow:
1) Review notifications.
2) Audit users and permissions.
3) Check data quality (accounts/contacts).

### Sales Manager
Primary focus:
- Pipeline health, team performance.
Daily flow:
1) Review dashboard KPIs.
2) Filter pipeline for stalled opportunities.
3) Reassign leads or add activities.

### Sales Rep
Primary focus:
- New leads, follow‑ups, closing opportunities.
Daily flow:
1) Check “My Tasks.”
2) Work leads and schedule calls.
3) Update opportunity stages.

### Support / Customer Success
Primary focus:
- Post‑sale engagement and retention.
Daily flow:
1) Review accounts and contacts.
2) Log activities and follow‑ups.
3) Escalate risks to manager.


- Keep lead data complete (email, company, job title).
- Update opportunities as soon as stage changes.
- Log activities immediately to avoid stale data.
- Save a few custom views for repeat workflows.

---

## Telerik Reporting (Azure Dev Runbook)

Use this when you need Telerik Report Server running and reachable for CRM report viewing.

### Current Dev Deployment (as implemented)
- Azure resource group: `rg-crm-report-dev-eus2`
- VM: `vmrptlinux01` (Linux)
- Public IP: `52.247.69.37`
- Preferred Report Server hostname:
  - `https://reports.northedgesystem.com`
- Underlying VM endpoints:
  - `http://52.247.69.37`
  - `https://52.247.69.37`
- Sample report verification URL:
  - `http://52.247.69.37/Report/View/Samples/Dashboard?ReportYear=2002`
- Runtime ingress:
  - nginx listens on `80` and `443`
  - nginx proxies `/` to the local Report Server process on `127.0.0.1:82`

### Important Host Distinction
- Do not use the Windows VM at `20.106.148.159` as the Report Server URL.
- Azure resource group `rg-crm-report-dev-eus` contains `vmrptdev01` (Windows), but that host currently serves only the default IIS page from `C:\\inetpub\\wwwroot`.
- The actual Telerik Report Server login page is hosted on the Linux VM in `rg-crm-report-dev-eus2` and is reachable at:
  - `https://reports.northedgesystem.com`
  - `https://52.247.69.37`
  - `http://52.247.69.37`

### Security and Networking
- NSG inbound is restricted to approved source IP only (current: `74.14.155.189/32`) for `22`, `80`, `443`.
- If your office/public IP changes, update NSG source first or access will fail.
- Nginx is fronting the app; Report Server app container is loopback-bound (`127.0.0.1`), not publicly exposed directly.

### Key Vault Secrets Used
Key Vault: `kv-crm-dev-ca`

- `reportserver-admin-username`
- `reportserver-admin-password`
- `reportserver-main-private-key-rsk`
- `reportserver-backup-private-key-rsk`
- `reportserver-vm-admin-password-eus`
- `reportserver-sql-admin-password-ca`

Do not store these values in code or repo files. Use Key Vault + managed access only.

Retrieve the current Report Server login credentials with:
```bash
az keyvault secret show --vault-name kv-crm-dev-ca --name reportserver-admin-username --query value -o tsv
az keyvault secret show --vault-name kv-crm-dev-ca --name reportserver-admin-password --query value -o tsv
```

### CRM Application Integration
- The CRM app should use Report Server through the API proxy, not by pointing the browser directly at the external `/api/reports` endpoint.
- Current viewer proxy path:
  - `/api/report-server/proxy/api/reports`
- Current CRM config endpoint:
  - `/api/report-server/config`
- Current catalog endpoint:
  - `/api/report-server/catalog`

Required API settings:
```json
"Reporting": {
  "ReportServerUrl": "https://reports.northedgesystem.com",
  "ReportServerUsername": "<from-key-vault>",
  "ReportServerPassword": "<from-key-vault>",
  "IgnoreInvalidTlsCertificate": false
}
```

Notes:
- `reports.northedgesystem.com` now uses a trusted Let's Encrypt certificate.
- `IgnoreInvalidTlsCertificate` should remain `false` unless the certificate is broken and you are doing temporary recovery work.
- The current nginx host binding is `reports.northedgesystem.com`.
- Frontend report cards open Report Server reports by category-qualified path (`CategoryName/ReportName`).
- If Report Server mode is enabled, `/api/reports/embed-config` should return provider `report-server` and service URL `/api/report-server/proxy/api/reports`.
- Report viewing is available through CRM report permissions.
- The in-app `Report Workspace` currently uses the built-in Telerik Web Report Designer for report authoring, even if Report Server is configured for viewing/publishing later.
- Built-in report designer access should use `Permissions.Reports.Design` or the workspace-configured `ReportDesignerRequiredPermission`, not a hardcoded admin-only check.
- When designing reports inside Report Server, do not use the repo's local `127.0.0.1` SQL string. Use the real CRM Azure SQL endpoint reachable from the Report Server VM.

### Operational Notes
1. Expect browser warning on HTTPS until a CA-issued certificate is installed.
2. Keep Docker containers and Nginx as the source of truth for runtime exposure.
3. Confirm access with login + sample report view after any infra/network change.
4. If someone remembers an old local IP or IIS host, verify against Azure CLI before changing app config. The active dev endpoint is the Linux VM above, not the Windows IIS VM.
