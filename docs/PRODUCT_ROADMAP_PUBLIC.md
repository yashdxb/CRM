# North Edge CRM Product Roadmap (External)

Website: `www.northedgesystem.com`  
Purpose: Customer-facing roadmap for prospects, customers, and partners.  
This roadmap reflects current priorities and may evolve based on customer feedback and delivery learnings.

## Product Summary

North Edge CRM helps revenue teams run the full execution loop in one workspace:
- Capture and qualify leads with evidence-based scoring.
- Convert qualified leads into account, contact, and opportunity records.
- Enforce pipeline discipline with stage guardrails, next-step tracking, and SLA visibility.
- Track activities and manager oversight with dashboards and risk signals.
- Support enterprise governance with roles, permissions, and tenant-aware controls.

## Technology Summary

- Frontend: Angular + PrimeNG
- Backend: ASP.NET Core (.NET) with layered, microservice-ready architecture (API, Application, Domain, Infrastructure)
- Data: Azure SQL (tenant-aware data model)
- Cloud Architecture: Azure-based scalable architecture for secure growth across tenants and workloads
- AI Architecture: model-driven scoring + semantic services + function-calling orchestration for workflow automation
- Security: JWT-based auth today, Entra-aligned enterprise identity roadmap
- Delivery: Azure App Service + Azure Static Web Apps + GitHub Actions CI/CD with scalable deployment topology
- Quality: Playwright E2E + API and UI validation

## Roadmap

### Released
- Authentication and role-based access foundations.
- Core CRM entities and workflows:
  - Leads, Contacts, Accounts, Opportunities, Activities.
- Lead qualification and conversion flow with history continuity.
- Dashboard baseline for KPI and execution visibility.
- Settings foundations for roles, permissions, and security-level controls.

### In Progress
- Sales rep end-to-end flow hardening (data quality, validation, and UX consistency).
- Qualification experience simplification and scoring clarity.
- Governance consistency for owner/assignment editability based on configurable security rules.
- UI reliability improvements (tab behavior, hover states, compact data-heavy layouts).
- AI-assisted scoring transparency (clearer rationale, confidence labels, and fallback handling).
- AI agentic task delegation across CRM workflows.

### Planned
- Manager execution controls:
  - Missing next-step detection, stale-deal signals, and SLA adherence visibility.
- Expanded decision support:
  - Confidence, risk, and coaching-oriented guidance for pipeline quality.
- Architecture hardening:
  - Broader service-boundary cleanup and event-driven module seams.
- Enterprise identity and security uplift:
  - Entra migration and deeper governance integrations.
- Mobile app planned.
- AI workflow automation:
  - App-to-function orchestration where the CRM calls backend functions based on detected intent and policy.
  - Function-calling pipelines for create/update/notify/escalate actions with approval guardrails.
  - AI-generated action plans that convert into concrete CRM tasks and follow-ups.

### Under Consideration
- Advanced next-best-action recommendations.
- Deeper forecasting and scenario intelligence.
- Extended integrations and automation accelerators.
- Additional industry-specific packs and role-centric workflow accelerators.
- Multi-agent orchestration for cross-module execution (lead, opportunity, activity, approval).

## Full Released Capability List (Current)

### Access, Security, and Tenant Foundations
- JWT login/logout and protected API access.
- User administration and role-based access control foundations.
- Capability-based permission model and role-intent views.
- Separation of approval permissions from standard edit permissions.
- Policy gates for high-risk actions with server-side enforcement.
- Role hierarchy with reporting-visibility scopes (Self/Team/All).
- Security-level model separated from role hierarchy and configurable per tenant.
- Multi-tenant workspace settings and tenant context resolution.

### Core CRM Data and Workflows
- Leads module with create/read/update/delete and assignment handling.
- Contacts module with account linking and lifecycle support.
- Opportunities module with create/read/update/delete and stage operations.
- Accounts/Customers module with operational list and record workflows.
- Lead conversion flow creating account/contact/opportunity with continuity.
- Lead SLA first-touch policy and due-time behavior.
- Workflow automation rules for stage-triggered task creation.

### Sales Execution and Pipeline Discipline
- Opportunity stage history and close reason handling.
- Lightweight threshold-based approval workflow for opportunities.
- Inline edits for high-frequency list fields (owner/status/stage).
- Bulk actions for list management (assign/delete/status updates).
- Recently viewed records across major CRM modules.
- Quick-add modal for lead/contact/activity creation.
- Activity templates for common execution patterns.

### Analytics, Dashboard, and Forecasting
- Dashboard KPI baseline (pipeline/tasks/upcoming/recent context).
- Epistemic widgets (truth metrics, risk register, confidence-oriented forecasting views).
- Manager pipeline health rollups aligned to role hierarchy.
- Role-based dashboard packs and reset-to-default behavior.
- Named default dashboard templates managed by admins.

### Data Operations and Engagement
- CSV import for leads/customers/contacts.
- CSV export from list workflows (supported modules).
- In-app notification center behavior and user preferences.
- Email alert worker with configurable notification preferences.

### AI Capabilities Already Released
- Lead AI score refresh endpoint and UI action.
- Confidence and rationale surfaced with scoring output.
- Resilient fallback scoring path when AI provider is unavailable.
- Qualification scoring breakdown and confidence/risk signal visibility.

## AI & Intelligence Roadmap

### Released
- Evidence-aware lead qualification scoring with confidence and risk signals.
- Qualification breakdown transparency at factor level for sales users and managers.
- AI score refresh with resilient fallback behavior for service interruptions.

### In Progress
- Semantic normalization of qualification/evidence language for more consistent scoring inputs.
- Explainability improvements for score/risk outputs (human-readable rationale).
- Policy-aware AI UX to ensure automation respects tenant-level governance and permissions.

### Planned
- Email integration for AI semantic analysis and execution:
  - Inbound email semantic parsing (intent, urgency, objections, buying signals, timeline clues).
  - Outbound email drafting and tone adaptation by persona/stage.
  - Thread summarization, sentiment tracking, and relationship-risk flags.
  - Auto-linking emails to leads/contacts/opportunities/activities with confidence thresholds.
  - Recommended next actions from email context (task creation, follow-up scheduling, escalation).
- Function-calling app architecture:
  - AI assistant triggers approved CRM functions through typed tool contracts.
  - Deterministic validation layer before writes (permission checks, policy checks, data checks).
  - Human-in-the-loop mode for sensitive operations (owner reassignment, stage changes, conversions).
  - Full auditability of AI-triggered actions (who/what/why/when).
- Advanced intelligence:
  - Opportunity health scoring using semantic + behavioral signals.
  - Forecast confidence bands based on uncertainty and evidence coverage.
  - Conversational CRM assistant for natural-language query and action execution.
  - Retrieval-augmented insights from product docs, playbooks, and account history.

### Under Consideration
- Call transcript intelligence (objection mining, MEDDIC/CQVS signal extraction, coaching prompts).
- Real-time meeting copilots with action capture and auto-logging.
- Account-level relationship graph intelligence and stakeholder influence scoring.
- Reinforcement-style recommendation tuning from user feedback loops.
- Predictive churn/expansion intelligence beyond core pipeline use cases.

## Contact

For roadmap feedback or partnership input, email `contact@northedgesystem.com` or visit `www.northedgesystem.com`.  
Priority and sequence are reviewed continuously with customer outcomes and platform stability in mind.
