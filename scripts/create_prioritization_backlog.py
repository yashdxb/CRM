#!/usr/bin/env python3
"""
Create Prioritization Backlog in ClickUp with Epics + User Stories.
Targets list 901711494470 (Prioritization Backlog) under Product & Planning.
"""

import json
import time
import urllib.request
import urllib.error
from typing import Dict, List, Optional

API_BASE = "https://api.clickup.com/api/v2"
TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901711494470"

HEADERS = {
    "Authorization": TOKEN,
    "Content-Type": "application/json",
}

# ── Priority tiers ──────────────────────────────────────────────────────────

EPICS = [
    # ═══════════════════════════  NOW (8)  ═══════════════════════════════════
    {
        "name": "Email Bidirectional Sync",
        "tier": "now",
        "priority": 1,  # 1=Urgent, 2=High, 3=Normal, 4=Low
        "description": (
            "**Epic: Email Bidirectional Sync**\n\n"
            "Integrate two-way email synchronization with Microsoft 365 and Gmail, "
            "enabling reps to send/receive emails directly from CRM records. "
            "All correspondence is auto-linked to contacts, leads, and opportunities.\n\n"
            "**Business Value:** Eliminates context-switching between email client and CRM. "
            "Increases rep productivity by ~25% and ensures 100% email capture for audit trails.\n\n"
            "**Acceptance Criteria:**\n"
            "- OAuth2 connection to M365/Gmail\n"
            "- Emails auto-linked to matching contact/lead\n"
            "- Compose & reply from within CRM\n"
            "- Email thread view on record timeline\n"
            "- Attachment handling up to 25MB"
        ),
        "stories": [
            {
                "name": "US: OAuth2 email provider connection flow",
                "description": (
                    "**As a** CRM user,\n"
                    "**I want to** connect my Microsoft 365 or Gmail account via OAuth2,\n"
                    "**So that** my emails are automatically synced with CRM records.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Settings page with 'Connect Email' button\n"
                    "- OAuth2 consent flow for M365 and Gmail\n"
                    "- Token refresh handling\n"
                    "- Connection status indicator\n"
                    "- Disconnect/reconnect capability"
                ),
            },
            {
                "name": "US: Auto-link inbound emails to CRM records",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want** inbound emails to be automatically matched to contacts/leads by email address,\n"
                    "**So that** I never miss correspondence history.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Match by primary & secondary email fields\n"
                    "- Create activity record for each matched email\n"
                    "- Handle CC/BCC participants\n"
                    "- Unmatched emails go to an inbox for manual linking"
                ),
            },
            {
                "name": "US: Compose and reply to emails from CRM",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** compose and reply to emails directly from a contact/lead record,\n"
                    "**So that** I don't need to switch to my email client.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Rich text editor with formatting\n"
                    "- Attach files up to 25MB\n"
                    "- Email templates support\n"
                    "- Sent email appears on record timeline\n"
                    "- CC/BCC fields available"
                ),
            },
            {
                "name": "US: Email thread timeline view",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want to** view the full email thread history on any CRM record,\n"
                    "**So that** I can review communication context before meetings.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Chronological thread view with expand/collapse\n"
                    "- Show sender, recipients, timestamp\n"
                    "- Preview first 3 lines, expand for full content\n"
                    "- Filter by date range\n"
                    "- Search within email threads"
                ),
            },
        ],
    },
    {
        "name": "Report Builder & Analytics Engine",
        "tier": "now",
        "priority": 1,
        "description": (
            "**Epic: Report Builder & Analytics Engine**\n\n"
            "Provide a drag-and-drop report builder that enables users to create custom reports "
            "from any CRM entity, with charts, filters, groupings, and export capabilities.\n\n"
            "**Business Value:** Every competitor offers reporting. Without this, enterprise "
            "buyers cannot justify CRM adoption. Reduces dependency on external BI tools.\n\n"
            "**Acceptance Criteria:**\n"
            "- Visual report builder with drag-and-drop fields\n"
            "- Bar, line, pie, funnel chart types\n"
            "- Cross-entity joins (e.g., opportunities by customer region)\n"
            "- Save, share, and schedule reports\n"
            "- Export to PDF, CSV, Excel"
        ),
        "stories": [
            {
                "name": "US: Drag-and-drop report field selector",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want to** drag fields from any entity onto a report canvas,\n"
                    "**So that** I can build custom reports without technical skills.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Entity picker (Customers, Leads, Opportunities, etc.)\n"
                    "- Field list with drag handles\n"
                    "- Columns, rows, measures, filters zones\n"
                    "- Live preview as fields are added\n"
                    "- Undo/redo support"
                ),
            },
            {
                "name": "US: Chart visualizations for reports",
                "description": (
                    "**As a** VP of Sales,\n"
                    "**I want to** visualize report data as bar, line, pie, and funnel charts,\n"
                    "**So that** I can quickly spot trends and share insights with leadership.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Toggle between table and chart view\n"
                    "- Chart types: bar, stacked bar, line, area, pie, donut, funnel\n"
                    "- Color customization\n"
                    "- Responsive sizing\n"
                    "- Chart legend and tooltips"
                ),
            },
            {
                "name": "US: Report save, share, and schedule",
                "description": (
                    "**As a** team lead,\n"
                    "**I want to** save reports, share them with my team, and schedule email delivery,\n"
                    "**So that** stakeholders get automated updates.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Save with name and description\n"
                    "- Share with users/roles\n"
                    "- Schedule: daily, weekly, monthly delivery\n"
                    "- Email with PDF/CSV attachment\n"
                    "- Report folder organization"
                ),
            },
            {
                "name": "US: Export reports to PDF, CSV, Excel",
                "description": (
                    "**As a** finance analyst,\n"
                    "**I want to** export any report to PDF, CSV, or Excel format,\n"
                    "**So that** I can use the data in external tools and presentations.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- One-click export button with format picker\n"
                    "- PDF includes charts and formatting\n"
                    "- CSV with proper escaping\n"
                    "- Excel with formatted headers and data types\n"
                    "- Large dataset pagination (10K+ rows)"
                ),
            },
        ],
    },
    {
        "name": "Product & Price Book Management",
        "tier": "now",
        "priority": 2,
        "description": (
            "**Epic: Product & Price Book Management**\n\n"
            "Implement a product catalog with SKUs, pricing tiers, volume discounts, "
            "and multi-currency support. Foundation for quoting and invoicing.\n\n"
            "**Business Value:** Required for quote generation and revenue tracking. "
            "Enterprise buyers expect product-line-item level deal management.\n\n"
            "**Acceptance Criteria:**\n"
            "- Product catalog CRUD with categories\n"
            "- Price books with effective dates\n"
            "- Volume/tiered pricing rules\n"
            "- Multi-currency with exchange rates\n"
            "- Product families and bundles"
        ),
        "stories": [
            {
                "name": "US: Product catalog CRUD with categories",
                "description": (
                    "**As a** product manager,\n"
                    "**I want to** create, edit, and organize products into categories,\n"
                    "**So that** the sales team can easily find and quote products.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Product fields: name, SKU, description, category, unit price, currency\n"
                    "- Category hierarchy (up to 3 levels)\n"
                    "- Active/inactive toggle\n"
                    "- Product image upload\n"
                    "- Search and filter products"
                ),
            },
            {
                "name": "US: Price book management with effective dates",
                "description": (
                    "**As a** sales operations manager,\n"
                    "**I want to** create multiple price books with start/end dates,\n"
                    "**So that** I can manage promotional and regional pricing.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Standard and custom price books\n"
                    "- Effective date ranges\n"
                    "- Override pricing per product\n"
                    "- Assign price books to territories/accounts\n"
                    "- Price book versioning"
                ),
            },
            {
                "name": "US: Volume and tiered pricing rules",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want** automatic volume discounts applied when I add quantities to a quote,\n"
                    "**So that** pricing is consistent and I don't need manual approvals for standard tiers.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Define quantity break tiers (e.g., 1-10, 11-50, 51+)\n"
                    "- Percentage or fixed discount per tier\n"
                    "- Auto-calculate on quote line items\n"
                    "- Override with approval workflow"
                ),
            },
        ],
    },
    {
        "name": "Quote / Proposal Generator (CPQ Lite)",
        "tier": "now",
        "priority": 1,
        "description": (
            "**Epic: Quote / Proposal Generator (CPQ Lite)**\n\n"
            "Build a Configure-Price-Quote engine that lets reps generate professional "
            "PDF proposals from opportunity records, with line items, discounts, terms, and e-signature.\n\n"
            "**Business Value:** #1 missing feature in competitive audit. Every major CRM "
            "(Salesforce, HubSpot, Zoho) ships native quoting. Critical for enterprise deals.\n\n"
            "**Acceptance Criteria:**\n"
            "- Create quotes from opportunities\n"
            "- Add product line items from catalog\n"
            "- Apply discounts and taxes\n"
            "- Generate branded PDF proposals\n"
            "- E-signature integration (DocuSign/Adobe Sign)\n"
            "- Quote versioning and approval workflow"
        ),
        "stories": [
            {
                "name": "US: Create quote from opportunity with line items",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** create a quote directly from an opportunity and add product line items,\n"
                    "**So that** I can quickly build accurate proposals for prospects.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- 'Create Quote' button on opportunity detail page\n"
                    "- Auto-populate customer & contact info\n"
                    "- Add products from catalog with quantity\n"
                    "- Line item subtotals auto-calculated\n"
                    "- Quote total with tax calculation"
                ),
            },
            {
                "name": "US: Generate branded PDF proposal",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** generate a professional PDF proposal with company branding,\n"
                    "**So that** I can send polished documents to prospects.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Company logo, colors, footer on PDF\n"
                    "- Itemized pricing table\n"
                    "- Terms and conditions section\n"
                    "- Validity date\n"
                    "- One-click 'Generate PDF' button"
                ),
            },
            {
                "name": "US: Quote approval workflow",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want** quotes above a certain discount threshold to require my approval,\n"
                    "**So that** we maintain margin discipline.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Configurable approval thresholds (by % discount or total value)\n"
                    "- Approval routing to manager\n"
                    "- Approve/reject with comments\n"
                    "- Email notification on submission and decision\n"
                    "- Quote status: Draft → Pending Approval → Approved → Sent"
                ),
            },
            {
                "name": "US: E-signature integration for quotes",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** send approved quotes for e-signature via DocuSign or Adobe Sign,\n"
                    "**So that** deals close faster without paper processes.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- 'Send for Signature' button on approved quotes\n"
                    "- Integration with DocuSign and/or Adobe Sign\n"
                    "- Signature status tracking (sent, viewed, signed)\n"
                    "- Signed PDF stored on opportunity record\n"
                    "- Auto-update opportunity stage on signature"
                ),
            },
        ],
    },
    {
        "name": "Custom Fields UI Builder",
        "tier": "now",
        "priority": 2,
        "description": (
            "**Epic: Custom Fields UI Builder**\n\n"
            "Enable admins to add custom fields to any entity via a visual UI, "
            "without code changes. Supports text, number, date, picklist, lookup, and formula types.\n\n"
            "**Business Value:** Enterprise CRM is unusable without customization. "
            "Every deployment needs industry-specific fields. Currently requires dev work.\n\n"
            "**Acceptance Criteria:**\n"
            "- Admin UI to add/edit/delete custom fields on any entity\n"
            "- Field types: text, number, date, datetime, picklist, multi-select, lookup, checkbox, formula\n"
            "- Validation rules (required, min/max, regex)\n"
            "- Custom fields appear on forms and list views\n"
            "- Custom fields available in report builder"
        ),
        "stories": [
            {
                "name": "US: Admin UI for creating custom fields",
                "description": (
                    "**As an** admin,\n"
                    "**I want to** create custom fields on any entity through a visual settings page,\n"
                    "**So that** I can tailor CRM data capture to our business needs without developers.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Entity picker dropdown\n"
                    "- Field name, label, type selector\n"
                    "- Default value configuration\n"
                    "- Required/optional toggle\n"
                    "- Drag-and-drop field ordering\n"
                    "- Preview of field on form"
                ),
            },
            {
                "name": "US: Custom field types - picklist and lookup",
                "description": (
                    "**As an** admin,\n"
                    "**I want to** create picklist fields with predefined options and lookup fields that "
                    "reference other entities,\n"
                    "**So that** data entry is standardized and relationships are maintained.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Single-select picklist with option management\n"
                    "- Multi-select picklist\n"
                    "- Lookup field with entity & display field selection\n"
                    "- Cascading picklists (parent-child)\n"
                    "- Option reordering"
                ),
            },
            {
                "name": "US: Custom fields in forms and list views",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want** custom fields to appear on create/edit forms and list view columns,\n"
                    "**So that** I can enter and view custom data alongside standard fields.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Custom fields render on entity forms in configured order\n"
                    "- Column chooser includes custom fields\n"
                    "- Sort and filter by custom fields\n"
                    "- Custom fields in export (CSV/Excel)\n"
                    "- Responsive layout for custom field sections"
                ),
            },
        ],
    },
    {
        "name": "Web-to-Lead Capture Forms",
        "tier": "now",
        "priority": 2,
        "description": (
            "**Epic: Web-to-Lead Capture Forms**\n\n"
            "Provide embeddable web forms that capture leads directly into CRM. "
            "Includes form builder, field mapping, spam protection, and auto-assignment.\n\n"
            "**Business Value:** Automates lead capture from websites, landing pages, events. "
            "Eliminates manual data entry and reduces lead response time.\n\n"
            "**Acceptance Criteria:**\n"
            "- Visual form builder with field selector\n"
            "- Generate embeddable HTML/JS snippet\n"
            "- CAPTCHA / honeypot spam protection\n"
            "- Auto-create lead record on submission\n"
            "- Auto-assign to rep via round-robin or territory rules\n"
            "- Confirmation email to submitter"
        ),
        "stories": [
            {
                "name": "US: Visual web form builder",
                "description": (
                    "**As a** marketing manager,\n"
                    "**I want to** build lead capture forms using a drag-and-drop builder,\n"
                    "**So that** I can deploy forms to our website without developer help.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Drag-and-drop field placement\n"
                    "- Map form fields to CRM lead fields\n"
                    "- Custom styling (colors, fonts)\n"
                    "- Required field validation\n"
                    "- Form preview in builder"
                ),
            },
            {
                "name": "US: Embeddable form snippet generation",
                "description": (
                    "**As a** marketing manager,\n"
                    "**I want to** generate an HTML embed code for my form,\n"
                    "**So that** I can paste it into any website or landing page.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Generate HTML/JS snippet\n"
                    "- iframe option for cross-domain\n"
                    "- Copy-to-clipboard button\n"
                    "- CORS configuration for allowed domains\n"
                    "- Form tracks source URL"
                ),
            },
            {
                "name": "US: Auto-assignment and notification on submission",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want** web form leads to be auto-assigned to reps and trigger notifications,\n"
                    "**So that** response time is minimized and no lead is missed.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Round-robin assignment across team\n"
                    "- Territory-based assignment option\n"
                    "- Real-time notification to assigned rep (SignalR + email)\n"
                    "- Confirmation email to submitter\n"
                    "- Duplicate detection on email address"
                ),
            },
        ],
    },
    {
        "name": "Scheduled Reports & Dashboard Alerts",
        "tier": "now",
        "priority": 3,
        "description": (
            "**Epic: Scheduled Reports & Dashboard Alerts**\n\n"
            "Enable users to schedule report delivery via email and set threshold-based "
            "dashboard alerts (e.g., pipeline drops below $X).\n\n"
            "**Business Value:** Proactive insights without logging in. "
            "Managers get daily/weekly summaries; alerts catch issues in real-time.\n\n"
            "**Acceptance Criteria:**\n"
            "- Schedule any saved report for email delivery\n"
            "- Frequency: daily, weekly, monthly, custom cron\n"
            "- Threshold alerts on KPI metrics\n"
            "- Alert channels: email, in-app notification, SignalR push\n"
            "- Alert history log"
        ),
        "stories": [
            {
                "name": "US: Schedule report email delivery",
                "description": (
                    "**As a** VP of Sales,\n"
                    "**I want to** schedule my pipeline report to be emailed every Monday at 8 AM,\n"
                    "**So that** I start each week with current data without logging in.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Schedule button on saved reports\n"
                    "- Frequency: daily, weekly (day picker), monthly (date picker)\n"
                    "- Time zone selection\n"
                    "- Recipient list (users + external emails)\n"
                    "- Attach PDF and/or CSV"
                ),
            },
            {
                "name": "US: KPI threshold alerts",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want to** set alerts when pipeline value drops below a threshold,\n"
                    "**So that** I can take corrective action before month-end.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Configure metric, operator (>, <, =), threshold value\n"
                    "- Check frequency (hourly, daily)\n"
                    "- Alert via email + in-app notification\n"
                    "- Snooze/dismiss capability\n"
                    "- Alert history with timestamps"
                ),
            },
        ],
    },
    {
        "name": "Webhooks & API Event System",
        "tier": "now",
        "priority": 2,
        "description": (
            "**Epic: Webhooks & API Event System**\n\n"
            "Implement outbound webhooks that fire on CRM events (record created, updated, "
            "stage changed, etc.), enabling integration with external systems.\n\n"
            "**Business Value:** Foundation for Zapier/Make/Power Automate integrations. "
            "Enterprise deployments require event-driven architecture for ecosystem connectivity.\n\n"
            "**Acceptance Criteria:**\n"
            "- Admin UI to configure webhook endpoints\n"
            "- Events: create, update, delete, stage_change for all entities\n"
            "- Payload includes full record snapshot\n"
            "- Retry logic with exponential backoff\n"
            "- Webhook delivery logs with status codes\n"
            "- HMAC signature verification"
        ),
        "stories": [
            {
                "name": "US: Webhook endpoint configuration UI",
                "description": (
                    "**As an** admin,\n"
                    "**I want to** configure webhook URLs and select which events trigger them,\n"
                    "**So that** external systems receive real-time CRM updates.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Add webhook: name, URL, secret key\n"
                    "- Select events per entity (e.g., Lead Created, Opportunity Stage Changed)\n"
                    "- Enable/disable toggle\n"
                    "- Test webhook button (sends sample payload)\n"
                    "- List all configured webhooks with status"
                ),
            },
            {
                "name": "US: Webhook delivery and retry engine",
                "description": (
                    "**As a** system,\n"
                    "**I want to** deliver webhook payloads with retry logic on failure,\n"
                    "**So that** integrations are reliable even during transient outages.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- POST JSON payload to configured URL\n"
                    "- Include HMAC-SHA256 signature header\n"
                    "- Retry: 3 attempts with exponential backoff (1s, 5s, 30s)\n"
                    "- Log each attempt with status code and response\n"
                    "- Auto-disable after 10 consecutive failures"
                ),
            },
            {
                "name": "US: Webhook delivery logs and monitoring",
                "description": (
                    "**As an** admin,\n"
                    "**I want to** view webhook delivery history with status, payload, and response,\n"
                    "**So that** I can troubleshoot integration issues.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Delivery log with timestamp, event, status code\n"
                    "- View request payload and response body\n"
                    "- Filter by webhook, event type, status (success/failure)\n"
                    "- Retry failed deliveries manually\n"
                    "- Retention: 30 days"
                ),
            },
        ],
    },

    # ═══════════════════════════  NEXT (9)  ══════════════════════════════════
    {
        "name": "Marketing Automation – Nurture Sequences",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Marketing Automation – Nurture Sequences**\n\n"
            "Build drip campaign sequences that auto-send emails based on triggers "
            "(lead score, days since last activity, form submission). Extends existing "
            "campaign management infrastructure.\n\n"
            "**Business Value:** Automates lead warming. Converts MQLs to SQLs without "
            "manual rep effort. HubSpot's core differentiator.\n\n"
            "**Acceptance Criteria:**\n"
            "- Sequence builder with steps (email, wait, condition)\n"
            "- Enrollment triggers (score threshold, tag, form submission)\n"
            "- Email template selection per step\n"
            "- Exit conditions (replied, converted, unsubscribed)\n"
            "- Sequence performance metrics (open rate, conversion)"
        ),
        "stories": [
            {
                "name": "US: Nurture sequence builder",
                "description": (
                    "**As a** marketing manager,\n"
                    "**I want to** build multi-step drip sequences with emails, waits, and conditions,\n"
                    "**So that** leads are nurtured automatically over time.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Visual sequence builder (step cards)\n"
                    "- Step types: Send Email, Wait (days/hours), If/Then condition\n"
                    "- Drag-and-drop reordering\n"
                    "- Save as draft, activate, pause\n"
                    "- Clone existing sequences"
                ),
            },
            {
                "name": "US: Enrollment triggers and exit conditions",
                "description": (
                    "**As a** marketing manager,\n"
                    "**I want to** define who enters and exits a nurture sequence automatically,\n"
                    "**So that** only qualified leads receive the right content.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Trigger: lead score >= X, tag added, form submitted\n"
                    "- Manual enrollment option\n"
                    "- Exit: replied to email, converted to opportunity, unsubscribed\n"
                    "- Prevent re-enrollment option\n"
                    "- Enrollment count on sequence dashboard"
                ),
            },
            {
                "name": "US: Sequence performance analytics",
                "description": (
                    "**As a** marketing director,\n"
                    "**I want to** see open rates, click rates, and conversions for each sequence step,\n"
                    "**So that** I can optimize nurture content and timing.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Per-step metrics: sent, delivered, opened, clicked\n"
                    "- Sequence-level conversion rate\n"
                    "- Drop-off visualization between steps\n"
                    "- A/B test comparison (future iteration)\n"
                    "- Export metrics to report builder"
                ),
            },
        ],
    },
    {
        "name": "Contract Lifecycle Management",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Contract Lifecycle Management**\n\n"
            "Manage contracts from creation through renewal, with version tracking, "
            "obligation monitoring, and renewal reminders.\n\n"
            "**Business Value:** Reduces contract leakage and missed renewals. "
            "Enterprise deals often involve multi-year contracts needing lifecycle tracking.\n\n"
            "**Acceptance Criteria:**\n"
            "- Contract CRUD linked to accounts/opportunities\n"
            "- Status workflow: Draft → Active → Expiring → Renewed/Expired\n"
            "- Version history with diff view\n"
            "- Renewal reminders (30/60/90 days)\n"
            "- Document attachment and template generation"
        ),
        "stories": [
            {
                "name": "US: Contract CRUD linked to accounts",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** create contracts under an account with key terms,\n"
                    "**So that** all contractual obligations are tracked in CRM.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Fields: title, start date, end date, value, terms\n"
                    "- Link to account and opportunity\n"
                    "- Status workflow with date-driven transitions\n"
                    "- Attach PDF/Word documents\n"
                    "- Contract number auto-generation"
                ),
            },
            {
                "name": "US: Renewal reminders and alerts",
                "description": (
                    "**As a** account manager,\n"
                    "**I want** automatic reminders when contracts are approaching expiration,\n"
                    "**So that** I can begin renewal conversations proactively.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Configurable reminder intervals (30/60/90 days)\n"
                    "- Email + in-app notification\n"
                    "- Dashboard widget showing expiring contracts\n"
                    "- One-click 'Start Renewal' action\n"
                    "- Bulk renewal capability"
                ),
            },
        ],
    },
    {
        "name": "Territory Management",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Territory Management**\n\n"
            "Define sales territories by geography, industry, or account size and auto-assign "
            "leads/accounts to territory owners.\n\n"
            "**Business Value:** Essential for B2B sales organizations with regional teams. "
            "Ensures balanced workload and clear ownership.\n\n"
            "**Acceptance Criteria:**\n"
            "- Territory CRUD with assignment rules\n"
            "- Rule criteria: region, country, industry, revenue range\n"
            "- Auto-assign new leads/accounts to territory owner\n"
            "- Territory hierarchy (regions → sub-regions)\n"
            "- Territory performance reporting"
        ),
        "stories": [
            {
                "name": "US: Territory definition and rules",
                "description": (
                    "**As a** sales VP,\n"
                    "**I want to** define territories with assignment rules based on region and industry,\n"
                    "**So that** leads are automatically routed to the right rep.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Territory name, owner, description\n"
                    "- Rule builder: field, operator, value (e.g., Country = Canada)\n"
                    "- Multiple rules with AND/OR logic\n"
                    "- Territory map visualization (optional)\n"
                    "- Conflict resolution (first match vs. round-robin)"
                ),
            },
            {
                "name": "US: Auto-assign records to territories",
                "description": (
                    "**As a** system,\n"
                    "**I want to** auto-assign new leads and accounts to the matching territory owner,\n"
                    "**So that** routing is instant and consistent.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Evaluate territory rules on record create/update\n"
                    "- Assign territory field on lead/account\n"
                    "- Notify territory owner of new assignment\n"
                    "- Re-assignment on rule change (configurable)\n"
                    "- Audit log of territory assignments"
                ),
            },
        ],
    },
    {
        "name": "Forecasting Engine",
        "tier": "next",
        "priority": 2,
        "description": (
            "**Epic: Forecasting Engine**\n\n"
            "Implement pipeline forecasting with weighted probabilities, "
            "commit/best-case/pipeline categories, and roll-up by team/territory.\n\n"
            "**Business Value:** #1 enterprise requirement. CFOs need revenue predictability. "
            "Salesforce and Dynamics both have native forecasting.\n\n"
            "**Acceptance Criteria:**\n"
            "- Forecast periods (monthly/quarterly)\n"
            "- Categories: Commit, Best Case, Pipeline, Omitted\n"
            "- Weighted pipeline by stage probability\n"
            "- Roll-up by rep → manager → VP\n"
            "- Override/adjustment capability\n"
            "- Forecast vs. actual tracking"
        ),
        "stories": [
            {
                "name": "US: Forecast period configuration",
                "description": (
                    "**As a** sales ops manager,\n"
                    "**I want to** configure forecast periods and categories,\n"
                    "**So that** the team can submit forecasts aligned with our fiscal calendar.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Define fiscal year start month\n"
                    "- Period: monthly or quarterly\n"
                    "- Categories: Commit, Best Case, Pipeline, Omitted\n"
                    "- Lock past periods from editing\n"
                    "- Configure stage-to-category mapping"
                ),
            },
            {
                "name": "US: Forecast roll-up and overrides",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want to** see my team's forecast rolled up and apply adjustments,\n"
                    "**So that** I can provide leadership with accurate projections.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Auto roll-up from opportunity data\n"
                    "- Manager can override rep forecasts\n"
                    "- Adjustment notes required on overrides\n"
                    "- Hierarchy: Rep → Manager → Director → VP\n"
                    "- Forecast submission workflow (submit → approve)"
                ),
            },
            {
                "name": "US: Forecast vs. actual dashboard",
                "description": (
                    "**As a** VP of Sales,\n"
                    "**I want** a forecast accuracy dashboard showing predicted vs. actual revenue,\n"
                    "**So that** I can improve forecasting discipline over time.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Side-by-side: Forecast amount vs. Closed-Won amount\n"
                    "- Accuracy percentage per rep/team/period\n"
                    "- Trend chart showing accuracy over quarters\n"
                    "- Drill-down to individual deals\n"
                    "- Export to report builder"
                ),
            },
        ],
    },
    {
        "name": "Cross-Entity Deduplication Engine",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Cross-Entity Deduplication Engine**\n\n"
            "Detect and merge duplicate records across contacts, leads, and accounts "
            "using fuzzy matching on name, email, phone, and company.\n\n"
            "**Business Value:** Dirty data is the #1 CRM adoption killer. "
            "Dedup ensures data quality and accurate reporting.\n\n"
            "**Acceptance Criteria:**\n"
            "- Scheduled dedup scan across entities\n"
            "- Fuzzy matching: email, name (Levenshtein), phone normalization\n"
            "- Duplicate groups with confidence scores\n"
            "- Merge wizard: pick master record, merge fields\n"
            "- Audit log of merges with undo capability"
        ),
        "stories": [
            {
                "name": "US: Duplicate detection scan",
                "description": (
                    "**As a** data admin,\n"
                    "**I want to** run a deduplication scan that finds potential duplicates,\n"
                    "**So that** I can clean up our database.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Configurable matching rules (exact, fuzzy, normalized)\n"
                    "- Scan contacts, leads, accounts independently or cross-entity\n"
                    "- Confidence score (High/Medium/Low)\n"
                    "- Schedule: on-demand or recurring\n"
                    "- Results page showing duplicate groups"
                ),
            },
            {
                "name": "US: Merge wizard for duplicate resolution",
                "description": (
                    "**As a** data admin,\n"
                    "**I want to** merge duplicate records by selecting the master and choosing field values,\n"
                    "**So that** related records are preserved and data is consolidated.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Side-by-side record comparison\n"
                    "- Select master record\n"
                    "- Field-by-field value selection\n"
                    "- Merge related activities, notes, emails\n"
                    "- Undo merge within 30 days"
                ),
            },
        ],
    },
    {
        "name": "Notes & Attachments System",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Notes & Attachments System**\n\n"
            "Rich-text notes and file attachments on any CRM record, with @mentions, "
            "pinning, and full-text search.\n\n"
            "**Business Value:** Basic table-stakes feature. Reps need to capture meeting notes, "
            "attach proposals, and collaborate on records.\n\n"
            "**Acceptance Criteria:**\n"
            "- Rich text editor (bold, italic, lists, links)\n"
            "- @mention users for notifications\n"
            "- Pin important notes to top\n"
            "- File upload (PDF, images, docs) up to 50MB\n"
            "- Full-text search across notes"
        ),
        "stories": [
            {
                "name": "US: Rich text notes on CRM records",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** add rich text notes to any contact, lead, or opportunity,\n"
                    "**So that** I can capture meeting notes and context.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Rich text editor with formatting toolbar\n"
                    "- Auto-save while typing\n"
                    "- Created by / timestamp\n"
                    "- Edit and delete own notes\n"
                    "- Notes on record timeline"
                ),
            },
            {
                "name": "US: File attachments with preview",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** attach files to any CRM record and preview them inline,\n"
                    "**So that** all relevant documents are accessible in one place.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Drag-and-drop file upload\n"
                    "- Supported formats: PDF, images, Word, Excel\n"
                    "- Inline preview for PDFs and images\n"
                    "- File size limit: 50MB\n"
                    "- Download button and version tracking"
                ),
            },
        ],
    },
    {
        "name": "Saved Views & Column Customization",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Saved Views & Column Customization**\n\n"
            "Let users save custom list views with their preferred filters, "
            "column selections, sort orders, and share them with the team.\n\n"
            "**Business Value:** Personalization drives adoption. "
            "Reps waste time reconfiguring views daily without saved presets.\n\n"
            "**Acceptance Criteria:**\n"
            "- Save current filter + sort + column config as a named view\n"
            "- Personal and shared views\n"
            "- Set default view per entity\n"
            "- Star/favorite views  \n"
            "- Quick-switch between views"
        ),
        "stories": [
            {
                "name": "US: Save and manage list views",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** save my filtered and sorted list as a named view,\n"
                    "**So that** I can quickly switch to my preferred layouts.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- 'Save View' button capturing current state\n"
                    "- Name and optional description\n"
                    "- View list in sidebar or dropdown\n"
                    "- Edit/rename/delete views\n"
                    "- Set one view as default"
                ),
            },
            {
                "name": "US: Column chooser and drag-to-reorder",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** choose which columns appear and drag them to reorder,\n"
                    "**So that** the list shows the data most relevant to my workflow.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Column chooser panel with checkboxes\n"
                    "- Drag-and-drop column reordering\n"
                    "- Column width persistence\n"
                    "- Include standard and custom fields\n"
                    "- Reset to default option"
                ),
            },
        ],
    },
    {
        "name": "Inline Editing on List Views",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Inline Editing on List Views**\n\n"
            "Enable users to edit record fields directly in list/table views without "
            "opening the detail page, similar to spreadsheet editing.\n\n"
            "**Business Value:** Massive productivity boost for data cleanup and bulk updates. "
            "Reduces clicks by 3-5x for common field edits.\n\n"
            "**Acceptance Criteria:**\n"
            "- Click cell to enter edit mode\n"
            "- Supports text, number, date, picklist, checkbox fields\n"
            "- Tab to next field\n"
            "- Save on blur or Enter\n"
            "- Undo with Ctrl+Z\n"
            "- Validation errors shown inline"
        ),
        "stories": [
            {
                "name": "US: Click-to-edit cells in list view",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** click on a cell in the list view and edit it directly,\n"
                    "**So that** I can update records quickly without opening each one.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Single click activates edit mode\n"
                    "- Input type matches field type\n"
                    "- Save on blur or Enter key\n"
                    "- Cancel with Escape\n"
                    "- Visual indicator for editable cells"
                ),
            },
            {
                "name": "US: Bulk inline editing mode",
                "description": (
                    "**As a** sales ops user,\n"
                    "**I want to** enter a bulk edit mode where I can Tab through cells like a spreadsheet,\n"
                    "**So that** I can clean up data rapidly.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Tab navigates to next editable cell\n"
                    "- Shift+Tab goes backward\n"
                    "- Batch save on exit\n"
                    "- Undo/redo stack\n"
                    "- Dirty cell highlighting"
                ),
            },
        ],
    },
    {
        "name": "Task & Reminder Automation",
        "tier": "next",
        "priority": 3,
        "description": (
            "**Epic: Task & Reminder Automation**\n\n"
            "Auto-create tasks and reminders based on CRM events (e.g., follow-up task "
            "3 days after demo, reminder before contract expiry).\n\n"
            "**Business Value:** Ensures no follow-up is missed. Automates repetitive "
            "task creation that managers currently do manually.\n\n"
            "**Acceptance Criteria:**\n"
            "- Rule builder: trigger event → create task\n"
            "- Configurable: assignee, due date offset, priority\n"
            "- Templates for common task types\n"
            "- Recurring task support\n"
            "- Task notification via email and in-app"
        ),
        "stories": [
            {
                "name": "US: Automated task creation rules",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want to** create rules that auto-generate tasks when events occur,\n"
                    "**So that** follow-ups happen consistently without manual assignment.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Trigger: stage change, date threshold, record creation\n"
                    "- Action: create task with title, assignee, due date\n"
                    "- Due date: relative (e.g., +3 days from trigger)\n"
                    "- Task priority auto-set based on deal value\n"
                    "- Rule enable/disable toggle"
                ),
            },
            {
                "name": "US: Smart reminders before key dates",
                "description": (
                    "**As a** account manager,\n"
                    "**I want** automatic reminders before contract renewals and scheduled calls,\n"
                    "**So that** I never miss important dates.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Reminder: X days before a date field value\n"
                    "- Channels: email + in-app notification\n"
                    "- Snooze options (1 hour, 1 day, 1 week)\n"
                    "- View upcoming reminders in a calendar widget\n"
                    "- Reminder templates for common scenarios"
                ),
            },
        ],
    },

    # ═══════════════════════════  LATER (12)  ═════════════════════════════════
    {
        "name": "Full Marketing Automation Suite",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Full Marketing Automation Suite**\n\n"
            "Complete marketing automation with journey builder, A/B testing, landing page builder, "
            "attribution modeling, and marketing-sales alignment scoring.\n\n"
            "**Business Value:** Competes with HubSpot Marketing Hub. Enables one-platform "
            "marketing-to-sales handoff.\n\n"
            "**Scope:**\n"
            "- Visual journey builder with branching\n"
            "- A/B testing for emails and landing pages\n"
            "- Landing page builder with templates\n"
            "- Multi-touch attribution modeling\n"
            "- Marketing-sourced revenue tracking"
        ),
        "stories": [
            {
                "name": "US: Visual journey builder with branching",
                "description": (
                    "**As a** marketing director,\n"
                    "**I want** a visual journey builder with branching logic,\n"
                    "**So that** I can create sophisticated multi-channel campaigns.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Drag-and-drop journey canvas\n"
                    "- Nodes: email, wait, condition, branch, action\n"
                    "- Branch by: engagement, score, segment\n"
                    "- Journey analytics with path visualization\n"
                    "- Goal tracking and conversion measurement"
                ),
            },
        ],
    },
    {
        "name": "Visual Workflow / Process Builder",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Visual Workflow / Process Builder**\n\n"
            "No-code workflow builder for automating business processes across CRM entities. "
            "Drag-and-drop triggers, conditions, and actions.\n\n"
            "**Business Value:** Replaces custom code for business rules. "
            "Salesforce Process Builder / Flow equivalent.\n\n"
            "**Scope:**\n"
            "- Visual canvas with trigger/condition/action nodes\n"
            "- Triggers: record events, scheduled, manual\n"
            "- Actions: update field, create record, send email, webhook, assign\n"
            "- Version control for workflows\n"
            "- Execution history and debugging"
        ),
        "stories": [
            {
                "name": "US: No-code workflow canvas builder",
                "description": (
                    "**As an** admin,\n"
                    "**I want to** build workflows visually without writing code,\n"
                    "**So that** I can automate business processes and enforce rules.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Drag-and-drop node canvas\n"
                    "- Node types: Trigger, Condition, Action, Loop\n"
                    "- Visual connector lines between nodes\n"
                    "- Test/debug mode with step-through\n"
                    "- Workflow versioning and rollback"
                ),
            },
        ],
    },
    {
        "name": "Customer Self-Service Portal",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Customer Self-Service Portal**\n\n"
            "External-facing portal where customers can view their account, "
            "submit support cases, track orders, and access knowledge base articles.\n\n"
            "**Business Value:** Reduces support burden by 40%. "
            "Salesforce Experience Cloud equivalent.\n\n"
            "**Scope:**\n"
            "- Customer login with SSO\n"
            "- Account dashboard with order history\n"
            "- Case submission and tracking\n"
            "- Knowledge base article browser\n"
            "- Community forum (optional)"
        ),
        "stories": [
            {
                "name": "US: Customer portal with account dashboard",
                "description": (
                    "**As a** customer,\n"
                    "**I want to** log into a portal and see my account information,\n"
                    "**So that** I can self-serve without contacting support.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- SSO login or email+password\n"
                    "- Dashboard: recent orders, open cases, profile\n"
                    "- View contract details and documents\n"
                    "- Update contact information\n"
                    "- Responsive mobile-friendly design"
                ),
            },
        ],
    },
    {
        "name": "Case / Support Ticketing Module",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Case / Support Ticketing Module**\n\n"
            "Built-in support ticketing system with case routing, SLA tracking, "
            "escalation rules, and customer satisfaction surveys.\n\n"
            "**Business Value:** Unifies sales and support in one platform. "
            "Zendesk/Freshdesk replacement for CRM-centric organizations.\n\n"
            "**Scope:**\n"
            "- Case CRUD with priority, category, status\n"
            "- Auto-routing based on category/product\n"
            "- SLA timers with breach alerts\n"
            "- Escalation rules\n"
            "- CSAT survey on case closure"
        ),
        "stories": [
            {
                "name": "US: Case management with SLA tracking",
                "description": (
                    "**As a** support agent,\n"
                    "**I want to** manage cases with SLA timers and priority levels,\n"
                    "**So that** I meet response time commitments.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Case fields: subject, description, priority, category\n"
                    "- SLA timer: first response, resolution\n"
                    "- Visual SLA indicator (green/yellow/red)\n"
                    "- Escalation on SLA breach\n"
                    "- Case linked to account/contact"
                ),
            },
        ],
    },
    {
        "name": "Plugin / Extension Framework",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Plugin / Extension Framework**\n\n"
            "Extensibility framework allowing third-party developers to build plugins "
            "that add UI components, business logic, and integrations.\n\n"
            "**Business Value:** Creates an ecosystem. Salesforce AppExchange model "
            "generates billions in partner revenue.\n\n"
            "**Scope:**\n"
            "- Plugin SDK with documented APIs\n"
            "- Sandboxed plugin execution\n"
            "- Plugin marketplace UI\n"
            "- Install/uninstall lifecycle management\n"
            "- Plugin configuration per tenant"
        ),
        "stories": [
            {
                "name": "US: Plugin SDK and marketplace",
                "description": (
                    "**As a** third-party developer,\n"
                    "**I want** a documented SDK to build and publish CRM plugins,\n"
                    "**So that** I can extend CRM functionality for specific industries.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Plugin SDK with TypeScript + C# support\n"
                    "- Documented API surface\n"
                    "- Sandboxed runtime execution\n"
                    "- Marketplace listing page\n"
                    "- Install/uninstall with configuration"
                ),
            },
        ],
    },
    {
        "name": "Advanced Analytics & BI Dashboard",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Advanced Analytics & BI Dashboard**\n\n"
            "Embedded BI layer with pivot tables, cross-tab analysis, trend detection, "
            "and predictive analytics powered by ML models.\n\n"
            "**Business Value:** Eliminates need for external BI tools (Power BI, Tableau). "
            "Decision-making happens inside CRM.\n\n"
            "**Scope:**\n"
            "- Pivot table builder\n"
            "- Cross-tab / cohort analysis\n"
            "- Trend detection with ML\n"
            "- Custom dashboard builder\n"
            "- Natural language query (Ask Analytics)"
        ),
        "stories": [
            {
                "name": "US: Embedded pivot tables and cross-tab analysis",
                "description": (
                    "**As a** data analyst,\n"
                    "**I want** pivot tables and cross-tab analysis within CRM,\n"
                    "**So that** I can slice data without exporting to Excel.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Pivot table with row/column/value zones\n"
                    "- Aggregations: sum, count, average, min, max\n"
                    "- Drill-down by clicking cells\n"
                    "- Save pivot configurations\n"
                    "- Export pivot results"
                ),
            },
        ],
    },
    {
        "name": "Social Media Integration",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Social Media Integration**\n\n"
            "Connect LinkedIn, Twitter/X, and Facebook to CRM for social selling, "
            "contact enrichment, and social listening on accounts.\n\n"
            "**Business Value:** Social selling generates 45% more opportunities. "
            "LinkedIn Sales Navigator integration is a top enterprise request.\n\n"
            "**Scope:**\n"
            "- LinkedIn profile matching and enrichment\n"
            "- Social activity feed on contact records\n"
            "- Social listening for account mentions\n"
            "- Post scheduling from CRM\n"
            "- Social engagement scoring"
        ),
        "stories": [
            {
                "name": "US: LinkedIn profile enrichment",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want** LinkedIn profile data auto-enriched on contact records,\n"
                    "**So that** I have current job title, company, and background for outreach.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- LinkedIn URL field on contacts\n"
                    "- Auto-fetch: title, company, headline, photo\n"
                    "- Refresh on demand\n"
                    "- Match contacts by email if LinkedIn URL missing\n"
                    "- Compliance with LinkedIn API terms"
                ),
            },
        ],
    },
    {
        "name": "AI Conversation Intelligence",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: AI Conversation Intelligence**\n\n"
            "Record, transcribe, and analyze sales calls using AI. Extract action items, "
            "sentiment, competitor mentions, and coaching insights.\n\n"
            "**Business Value:** Gong/Chorus alternative built into CRM. "
            "Provides data-driven coaching and deal intelligence.\n\n"
            "**Scope:**\n"
            "- Call recording integration (Zoom, Teams, phone)\n"
            "- AI transcription with speaker diarization\n"
            "- Sentiment analysis per segment\n"
            "- Action item extraction\n"
            "- Competitor mention detection\n"
            "- Coach scorecard per call"
        ),
        "stories": [
            {
                "name": "US: AI call transcription and analysis",
                "description": (
                    "**As a** sales manager,\n"
                    "**I want** sales calls automatically transcribed and analyzed by AI,\n"
                    "**So that** I can coach reps without attending every call.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Integration with Zoom/Teams\n"
                    "- Speaker diarization (rep vs. prospect)\n"
                    "- Keyword detection: competitors, pricing, objections\n"
                    "- Sentiment timeline visualization\n"
                    "- Auto-generated call summary"
                ),
            },
        ],
    },
    {
        "name": "Native Mobile App (iOS & Android)",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Native Mobile App (iOS & Android)**\n\n"
            "Build native mobile applications for iOS and Android with offline "
            "capability, push notifications, and mobile-optimized CRM views.\n\n"
            "**Business Value:** Field reps need mobile access. "
            "Every top CRM has a mobile app. Currently only responsive web.\n\n"
            "**Scope:**\n"
            "- React Native or .NET MAUI\n"
            "- Offline data sync with conflict resolution\n"
            "- Push notifications for assignments and alerts\n"
            "- Mobile-optimized record views\n"
            "- Voice-to-text for notes\n"
            "- Barcode/QR code scanning"
        ),
        "stories": [
            {
                "name": "US: Mobile CRM with offline sync",
                "description": (
                    "**As a** field sales rep,\n"
                    "**I want** a mobile app that works offline and syncs when I'm back online,\n"
                    "**So that** I can access CRM data in areas with poor connectivity.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- View contacts, leads, opportunities offline\n"
                    "- Create/edit records offline (queued sync)\n"
                    "- Conflict resolution on sync\n"
                    "- Push notifications for new assignments\n"
                    "- Last sync timestamp indicator"
                ),
            },
        ],
    },
    {
        "name": "Multi-Language & Localization (i18n)",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Multi-Language & Localization (i18n)**\n\n"
            "Full internationalization support with translated UI, locale-aware formatting, "
            "and RTL language support.\n\n"
            "**Business Value:** Required for global enterprise deployments. "
            "Expands addressable market to non-English territories.\n\n"
            "**Scope:**\n"
            "- Angular i18n with lazy-loaded translations\n"
            "- Language picker in settings\n"
            "- Date, number, currency locale formatting\n"
            "- RTL layout support (Arabic, Hebrew)\n"
            "- Translation management workflow"
        ),
        "stories": [
            {
                "name": "US: Multi-language UI with locale formatting",
                "description": (
                    "**As a** global user,\n"
                    "**I want** the CRM UI in my language with correct date/currency formats,\n"
                    "**So that** I can work efficiently in my native language.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Language selector: English, French, Spanish, Arabic, German\n"
                    "- All UI text from translation files\n"
                    "- Date format per locale\n"
                    "- Currency symbol and formatting per locale\n"
                    "- RTL layout for Arabic/Hebrew"
                ),
            },
        ],
    },
    {
        "name": "Audit Trail & Compliance Suite",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Audit Trail & Compliance Suite**\n\n"
            "Comprehensive audit logging, data retention policies, GDPR/CCPA "
            "compliance tools, and field-level audit history.\n\n"
            "**Business Value:** Required for regulated industries (finance, healthcare). "
            "GDPR compliance is legally mandatory in EU.\n\n"
            "**Scope:**\n"
            "- Field-level change history on all entities\n"
            "- Login/session audit trail\n"
            "- Data retention and archival policies\n"
            "- GDPR: Right to erasure, consent management, data export\n"
            "- Compliance dashboard and reporting"
        ),
        "stories": [
            {
                "name": "US: Field-level audit trail and GDPR tools",
                "description": (
                    "**As a** compliance officer,\n"
                    "**I want** field-level change history and GDPR tools,\n"
                    "**So that** we meet regulatory requirements.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- Track: who changed what field, old → new value, when\n"
                    "- GDPR: data export per contact, right to erasure\n"
                    "- Consent management per contact\n"
                    "- Data retention policies with auto-archive\n"
                    "- Compliance audit report export"
                ),
            },
        ],
    },
    {
        "name": "Real-Time Collaboration (Co-editing)",
        "tier": "later",
        "priority": 4,
        "description": (
            "**Epic: Real-Time Collaboration (Co-editing)**\n\n"
            "Google Docs-style real-time co-editing of CRM records, notes, and proposals. "
            "See who's viewing/editing, live cursors, and instant updates.\n\n"
            "**Business Value:** Eliminates overwrite conflicts. Enables collaborative "
            "deal reviews and joint proposal writing.\n\n"
            "**Scope:**\n"
            "- Presence indicators: who's viewing this record\n"
            "- Live field locking when someone is editing\n"
            "- Real-time note co-editing with cursors\n"
            "- Change notifications via SignalR\n"
            "- Conflict resolution for simultaneous edits"
        ),
        "stories": [
            {
                "name": "US: Real-time presence and co-editing",
                "description": (
                    "**As a** sales rep,\n"
                    "**I want to** see who else is viewing or editing a record in real-time,\n"
                    "**So that** we avoid overwriting each other's changes.\n\n"
                    "**Acceptance Criteria:**\n"
                    "- User avatars shown on record when others are viewing\n"
                    "- Field-level lock when another user is editing\n"
                    "- Live updates via SignalR\n"
                    "- Merge or notify on conflict\n"
                    "- Co-editing for notes with live cursors"
                ),
            },
        ],
    },
]


def api_request(method: str, url: str, data: Optional[Dict] = None) -> Dict:
    """Make a ClickUp API request with retry."""
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(
        f"{API_BASE}/{url}",
        data=body,
        headers=HEADERS,
        method=method,
    )
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            if e.code == 429:  # Rate limit
                wait = int(e.headers.get("Retry-After", 2))
                print(f"  ⏳ Rate limited, waiting {wait}s...")
                time.sleep(wait)
            else:
                err_body = e.read().decode() if e.fp else ""
                print(f"  ❌ HTTP {e.code}: {err_body[:200]}")
                if attempt < 2:
                    time.sleep(1)
                else:
                    raise
        except Exception as exc:
            print(f"  ❌ Error: {exc}")
            if attempt < 2:
                time.sleep(1)
            else:
                raise
    return {}


def create_task(list_id: str, name: str, description: str, priority: int, tags: List[str]) -> Dict:
    """Create a task in a ClickUp list."""
    payload = {
        "name": name,
        "description": description,
        "priority": priority,
        "tags": tags,
        "status": "backlog",
    }
    return api_request("POST", f"list/{list_id}/task", payload)


def create_subtask(parent_id: str, list_id: str, name: str, description: str, tags: List[str]) -> Dict:
    """Create a subtask under a parent task."""
    payload = {
        "name": name,
        "description": description,
        "parent": parent_id,
        "tags": tags,
        "status": "backlog",
    }
    return api_request("POST", f"list/{list_id}/task", payload)


def main():
    print("=" * 60)
    print("  North Edge CRM — Prioritization Backlog Creator")
    print(f"  Target List: {LIST_ID}")
    print("=" * 60)

    total_epics = 0
    total_stories = 0
    failed = []

    for epic_data in EPICS:
        tier = epic_data["tier"]
        epic_name = f"[{tier.upper()}] {epic_data['name']}"
        tags = [tier, "epic", "roadmap"]

        # Add module tag if applicable
        name_lower = epic_data["name"].lower()
        if "email" in name_lower:
            tags.append("module:activities")
        elif "marketing" in name_lower or "nurture" in name_lower:
            tags.append("module:marketing")
        elif "report" in name_lower or "analytics" in name_lower or "dashboard" in name_lower:
            tags.append("module:dashboard")
        elif "lead" in name_lower:
            tags.append("module:leads")
        elif "mobile" in name_lower:
            tags.append("module:mobile")
        elif "contact" in name_lower:
            tags.append("module:contacts")
        elif "opportunit" in name_lower or "forecast" in name_lower or "quote" in name_lower:
            tags.append("module:opportunities")
        elif "assistant" in name_lower or "ai " in name_lower or "conversation" in name_lower:
            tags.append("module:assistant")
        elif "settings" in name_lower or "custom field" in name_lower or "webhook" in name_lower or "plugin" in name_lower:
            tags.append("module:settings")

        print(f"\n📦 Creating Epic: {epic_name}")
        print(f"   Tier: {tier} | Priority: {epic_data['priority']} | Tags: {tags}")

        try:
            epic_result = create_task(
                LIST_ID,
                epic_name,
                epic_data["description"],
                epic_data["priority"],
                tags,
            )
            epic_id = epic_result.get("id")
            if not epic_id:
                print(f"   ❌ Failed to create epic: {epic_result}")
                failed.append(epic_name)
                continue

            total_epics += 1
            print(f"   ✅ Created (id: {epic_id})")

            # Create user stories as subtasks
            for story_data in epic_data.get("stories", []):
                story_tags = [tier, "story"]
                print(f"   📝 Creating Story: {story_data['name']}")

                try:
                    story_result = create_subtask(
                        epic_id,
                        LIST_ID,
                        story_data["name"],
                        story_data["description"],
                        story_tags,
                    )
                    story_id = story_result.get("id")
                    if story_id:
                        total_stories += 1
                        print(f"      ✅ Created (id: {story_id})")
                    else:
                        print(f"      ❌ Failed: {story_result}")
                        failed.append(story_data["name"])
                except Exception as e:
                    print(f"      ❌ Error: {e}")
                    failed.append(story_data["name"])

                time.sleep(0.3)  # Rate limit courtesy

        except Exception as e:
            print(f"   ❌ Error creating epic: {e}")
            failed.append(epic_name)

        time.sleep(0.3)  # Rate limit courtesy

    # Summary
    print("\n" + "=" * 60)
    print("  SUMMARY")
    print("=" * 60)
    print(f"  Epics created:  {total_epics} / {len(EPICS)}")
    print(f"  Stories created: {total_stories}")
    print(f"  Failed:          {len(failed)}")
    if failed:
        print("\n  Failed items:")
        for f in failed:
            print(f"    - {f}")
    print("=" * 60)


if __name__ == "__main__":
    main()
