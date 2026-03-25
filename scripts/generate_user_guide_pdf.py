#!/usr/bin/env python3
"""
North Edge CRM – User Guide
Refreshed against the current codebase module surface, routes, permissions,
controllers, and implemented service workflows.
"""

from __future__ import annotations

import os
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from reportlab.platypus.flowables import Flowable


PRIMARY = HexColor("#4f46e5")
PRIMARY_LIGHT = HexColor("#eef2ff")
CYAN = HexColor("#0891b2")
CYAN_LIGHT = HexColor("#ecfeff")
EMERALD = HexColor("#059669")
EMERALD_LIGHT = HexColor("#ecfdf5")
AMBER = HexColor("#d97706")
AMBER_LIGHT = HexColor("#fffbeb")
ROSE = HexColor("#e11d48")
ROSE_LIGHT = HexColor("#fff1f2")
SLATE_900 = HexColor("#0f172a")
SLATE_800 = HexColor("#1f2937")
SLATE_700 = HexColor("#334155")
SLATE_500 = HexColor("#64748b")
SLATE_300 = HexColor("#cbd5e1")
SLATE_200 = HexColor("#e2e8f0")
SLATE_100 = HexColor("#f8fafc")

OUTPUT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "docs", "North_Edge_CRM_User_Guide.pdf")

GUIDE_SCOPE = [
    "Dashboard and assistant workspace",
    "Leads, contacts, customers, activities, and deals",
    "Decision Inbox and approval flows",
    "Marketing, campaign email, and attribution pages",
    "Reports, help desk, mailbox, workflows, and admin settings",
]

ROLE_FAMILIES = [
    ("Sales users", "Work mainly in Dashboard, Leads, Activities, Contacts, Customers, and Deals."),
    ("Managers and approvers", "Use the same commercial modules plus Decision Inbox, team views, and more operational visibility."),
    ("Marketing users", "Work in Campaigns, Attribution, Campaign Emails, and Marketing settings."),
    ("Support users", "Work in Help Desk Cases, Queues, SLA policies, comments, and service reporting."),
    ("Administrators", "Manage users, roles, workspace settings, policies, lookups, workflows, audit, and tenant-level controls."),
]

NAV_SECTIONS = [
    ("Dashboard", "Personal and team work overview, KPI cards, pipeline health, and assistant insights."),
    ("Reports", "Report library and report workspace for analysis and reporting."),
    ("Decision Inbox", "Pending decisions, approvals, policy/SLA shell, and decision history."),
    ("Customers", "Company-level records, filters, edits, imports, exports, and linked commercial context."),
    ("Contacts", "People-level records linked to accounts, deals, and interactions."),
    ("Leads", "Lead list, pipeline view, import, create/edit, convert, status history, and qualification workflow."),
    ("Deals", "Deal list, pipeline, detail, create/edit, approvals, quotes, proposals, and deal health."),
    ("Marketing", "Campaigns, attribution, campaign emails, and related settings."),
    ("Help Desk", "Cases, queues, settings, and support workflow pages."),
    ("Activities", "Table, calendar, tasks, create/edit, and entity-linked activity tracking."),
    ("Mailbox", "Inbox, sent, drafts, archive, spam, trash, and email templates."),
    ("Settings", "Users, roles, workspace, approval settings, policies, lookups, audit, and workflow-related admin pages."),
]

LEAD_GUIDE = [
    ("Main list and pipeline", "Leads have a primary list view and a pipeline-oriented view. The routed surfaces include list, pipeline, import, create, edit, and convert pages."),
    ("Status model", "Current code supports New, Contacted, Nurture, Qualified, Converted, Lost, and Disqualified end states or branch outcomes."),
    ("Qualification discipline", "Lead workflows now carry qualification logic, evidence-related controls, and gated progression rather than simple status clicking."),
    ("Cadence and history", "Lead APIs expose cadence touches, status history, evidence sources, duplicate check, and disposition reporting."),
    ("Conversation intelligence", "Lead records support AI conversation summaries with sentiment and next action based on outbound CRM email logs and inbound synced email evidence."),
]

DEAL_GUIDE = [
    ("Deal workspace", "Deals support list, pipeline, detail, and form pages with stage control and commercial context."),
    ("Decision integration", "Deal approvals flow into the Decision Inbox rather than being handled informally."),
    ("Quotes and proposals", "The opportunity services and DTOs support quote, proposal, and review-oriented fields."),
    ("Deal health", "There is a dedicated settings surface for deal health scoring, and dashboards consume pipeline health signals."),
]

AI_GUIDE = [
    ("Assistant chat", "The assistant exposes history, chat, and streaming response behavior through the assistant controller and service interfaces."),
    ("Insight generation", "The assistant produces KPI-style insights and prioritized actions rather than chat only."),
    ("Action execution", "Assistant actions can execute directly, route to review, or be undone for supported action types."),
    ("Lead AI scoring", "Lead scoring includes Azure OpenAI scoring and a rule-based fallback layer."),
    ("Conversation summary", "Lead conversation summarization writes summary, sentiment, and next-action fields back to the lead record."),
    ("Marketing recommendations", "Campaign recommendations include confidence, impact estimate, evidence, and accept-dismiss-snooze workflows."),
]

MARKETING_GUIDE = [
    ("Campaigns", "Create, edit, view, and analyze campaigns."),
    ("Attribution", "Attribution pages connect campaign activity to influenced opportunities and pipeline."),
    ("Campaign emails", "Campaign email pages support compose, edit, detail, and recipient/reporting flows."),
    ("Recommendations and health", "Marketing services provide campaign health scoring, explainability, and recommendation decisions."),
]

HELPDESK_GUIDE = [
    ("Cases", "Case list and detail pages provide the support-side operational surface."),
    ("Queues", "Dedicated queue management supports shared service workflows."),
    ("SLA settings", "Help desk settings and SLA policy services support operational response targets and escalation."),
    ("Comments and escalation history", "Support cases include comments, attachments, and escalation events."),
]

SETTINGS_GUIDE = [
    ("People & access", "Users, roles, invite flow, permissions, teams, and security-related administration."),
    ("Workspace settings", "Organization defaults, workspace behavior, and tenant-facing controls."),
    ("Approval and qualification settings", "Approval settings, qualification policy, qualification thresholds, and lead assignment."),
    ("Marketing and email settings", "Marketing settings, email accounts, and email delivery policy controls."),
    ("Lookups and reference data", "Lead statuses, opportunity stages, currencies, activity types, help desk lookup values, deal types, and more."),
    ("Workflow and audit", "Workflow builder routing and audit log visibility are part of the admin surface."),
]

COMMON_WORKFLOWS = [
    ("Sales user workflow", [
        "Start in Dashboard to identify new leads, overdue work, and at-risk deals.",
        "Open or update a lead, log activity, and move the lead through qualification or nurture logic.",
        "Convert qualified leads into customer/contact/deal context.",
        "Manage the deal, next steps, and related activities until approval or close is needed.",
    ]),
    ("Manager / approver workflow", [
        "Use Dashboard and Decision Inbox to monitor pipeline health and pending decisions.",
        "Review deals that need approvals or intervention.",
        "Use audit/history and policy context to make traceable commercial decisions.",
    ]),
    ("Marketing workflow", [
        "Create or update campaigns, monitor attribution and campaign health, and work campaign email operations.",
        "Review recommendation evidence before accepting, dismissing, or snoozing campaign actions.",
    ]),
    ("Support workflow", [
        "Receive or create a case, assign it to a queue or owner, track status against SLA, and capture comments or attachments.",
        "Use queue and policy settings to keep service work visible and accountable.",
    ]),
    ("Administrator workflow", [
        "Manage user access, workspace settings, qualification rules, approval settings, marketing settings, email accounts, and lookup data.",
        "Review audit logs and tenant-level policy behavior when governance questions arise.",
    ]),
]

PERMISSION_GROUPS = [
    ("Dashboard", "Permissions.Dashboard.View"),
    ("Customers", "Permissions.Customers.View / Manage"),
    ("Contacts", "Permissions.Contacts.View / Manage"),
    ("Leads", "Permissions.Leads.View / Manage"),
    ("Deals", "Permissions.Opportunities.View / Manage"),
    ("Approvals", "Permissions.Opportunities.Approvals.Request / Approve / Override"),
    ("Activities", "Permissions.Activities.View / Manage"),
    ("Email / Mailbox", "Permissions.Emails.View / Manage"),
    ("Marketing", "Permissions.Marketing.View / Manage"),
    ("Help Desk", "Permissions.HelpDesk.View / Manage / Admin"),
    ("Administration", "Permissions.Administration.View / Manage"),
    ("Reports", "Permissions.Reports.View / Manage / Design"),
    ("Audit", "Permissions.Audit.View"),
    ("Tenants", "Permissions.Tenants.View / Manage"),
    ("Properties", "Permissions.Properties.View / Manage"),
]


def build_styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("CoverTitle", fontName="Helvetica-Bold", fontSize=30, leading=36, textColor=SLATE_900, spaceAfter=6))
    s.add(ParagraphStyle("CoverSub", fontName="Helvetica", fontSize=15, leading=20, textColor=PRIMARY, spaceAfter=6))
    s.add(ParagraphStyle("Meta", fontName="Helvetica", fontSize=10, leading=13, textColor=SLATE_500, spaceAfter=3))
    s.add(ParagraphStyle("ChapterTitle", fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=PRIMARY, spaceAfter=10))
    s.add(ParagraphStyle("Sec", fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=SLATE_900, spaceBefore=12, spaceAfter=6))
    s.add(ParagraphStyle("SubSec", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=SLATE_800, spaceBefore=8, spaceAfter=4))
    s.add(ParagraphStyle("Body", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=SLATE_700, alignment=TA_JUSTIFY, spaceAfter=5))
    s.add(ParagraphStyle("GuideBullet", fontName="Helvetica", fontSize=9.4, leading=12.8, textColor=SLATE_700, leftIndent=16, bulletIndent=6, spaceAfter=3))
    s.add(ParagraphStyle("TOC", fontName="Helvetica", fontSize=10, leading=14, textColor=SLATE_700, leftIndent=12, spaceAfter=2))
    s.add(ParagraphStyle("TOCHead", fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=PRIMARY, spaceBefore=4, spaceAfter=2))
    s.add(ParagraphStyle("Footer", fontName="Helvetica", fontSize=7.2, leading=9, textColor=SLATE_500, alignment=TA_CENTER))
    return s


class GradientBar(Flowable):
    def __init__(self, width, height=4, c1=PRIMARY, c2=CYAN):
        super().__init__()
        self.width = width
        self.height = height
        self.c1 = c1
        self.c2 = c2

    def draw(self):
        steps = 80
        seg = self.width / steps
        for i in range(steps):
            r = self.c1.red + (self.c2.red - self.c1.red) * i / steps
            g = self.c1.green + (self.c2.green - self.c1.green) * i / steps
            b = self.c1.blue + (self.c2.blue - self.c1.blue) * i / steps
            self.canv.setFillColorRGB(r, g, b)
            self.canv.rect(i * seg, 0, seg + 0.2, self.height, fill=1, stroke=0)


def table(data, widths):
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_LIGHT),
                ("TEXTCOLOR", (0, 0), (-1, 0), PRIMARY),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("TEXTCOLOR", (0, 1), (-1, -1), SLATE_700),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("GRID", (0, 0), (-1, -1), 0.35, SLATE_200),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, SLATE_100]),
            ]
        )
    )
    return t


def footer(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColor(SLATE_500)
    canvas_obj.drawCentredString(
        A4[0] / 2,
        14 * mm,
        f"North Edge CRM User Guide  |  Page {doc.page}  |  {datetime.now().strftime('%B %d, %Y')}  |  www.northedgesystem.com",
    )
    canvas_obj.restoreState()


def p(text, style):
    return Paragraph(text, style)


def chapter(story, styles, width, number, title):
    story.append(PageBreak())
    story.append(GradientBar(width))
    story.append(Spacer(1, 3 * mm))
    story.append(p(f"Chapter {number}", styles["Meta"]))
    story.append(p(title, styles["ChapterTitle"]))


def add_list(story, styles, items):
    for item in items:
        story.append(p(f"• {item}", styles["GuideBullet"]))


def build_pdf():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=20 * mm,
        bottomMargin=23 * mm,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        title="North Edge CRM User Guide",
        author="North Edge System",
    )
    width = doc.width
    story = []

    story.append(Spacer(1, 48 * mm))
    story.append(GradientBar(width))
    story.append(Spacer(1, 8 * mm))
    story.append(p("North Edge CRM", styles["CoverTitle"]))
    story.append(p("Updated User Guide", styles["CoverSub"]))
    story.append(p("Refreshed against the current implemented codebase. This guide explains the live CRM module surface, how users work in it, and what each area is responsible for.", styles["Body"]))
    story.append(Spacer(1, 4 * mm))
    story.append(p(f"Generated: {datetime.now().strftime('%B %d, %Y')}", styles["Meta"]))
    story.append(p("North Edge System  •  Toronto, Canada  •  www.northedgesystem.com", styles["Meta"]))
    story.append(p("Classification: Internal – Working Guide", styles["Meta"]))
    story.append(Spacer(1, 8 * mm))
    story.append(p("<b>This guide is based on implemented routes, controllers, DTOs, services, and current workflow logic.</b> It has been refreshed to remove outdated modules and older flow assumptions.", styles["Body"]))

    story.append(PageBreak())
    story.append(p("Table of Contents", styles["ChapterTitle"]))
    toc = [
        ("1", "Getting Started and System Scope"),
        ("2", "Dashboard and AI Assistant"),
        ("3", "Leads, Qualification, and Conversion"),
        ("4", "Customers, Contacts, and Activities"),
        ("5", "Deals and Decision Inbox"),
        ("6", "Marketing, Campaign Email, and Attribution"),
        ("7", "Reports, Mailbox, and Help Desk"),
        ("8", "Settings, Permissions, and Administration"),
        ("9", "Common Workflows and Daily Usage Patterns"),
    ]
    for num, title in toc:
        story.append(p(f"Chapter {num}: {title}", styles["TOCHead"]))
    story.append(Spacer(1, 4 * mm))
    story.append(p("This guide intentionally focuses on the current North Edge CRM product surface rather than generic CRM theory or archived design assumptions.", styles["Body"]))

    chapter(story, styles, width, 1, "Getting Started and System Scope")
    story.append(p("North Edge CRM is a multi-module CRM platform. It is not limited to lead tracking. The current application includes commercial workflows, approvals, marketing, email operations, reporting, help desk, and administrative controls.", styles["Body"]))
    story.append(p("The sections below describe the system as it exists in the current codebase.", styles["Body"]))

    story.append(p("Guide Scope", styles["Sec"]))
    add_list(story, styles, GUIDE_SCOPE)

    story.append(p("Typical Role Families", styles["Sec"]))
    role_table = [["Role family", "Primary working areas"]]
    for title, body_text in ROLE_FAMILIES:
        role_table.append([title, body_text])
    story.append(table(role_table, [width * 0.28, width * 0.72]))

    story.append(p("Main Navigation", styles["Sec"]))
    nav_table = [["Navigation area", "What users do there"]]
    for title, body_text in NAV_SECTIONS:
        nav_table.append([title, body_text])
    story.append(table(nav_table, [width * 0.28, width * 0.72]))

    story.append(p("Logging In and Access", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "Users can enter through the login page, accept-invite page, and change-password flow.",
            "Protected application routes live under /app and require authentication.",
            "Access is filtered by permission keys and, for some modules, tenant feature flags.",
            "If a user lacks permission, the application routes them to access-denied or module-disabled pages rather than silently exposing the feature.",
        ],
    )

    chapter(story, styles, width, 2, "Dashboard and AI Assistant")
    story.append(p("The dashboard is the main command surface for authenticated users. It is where users review health, priorities, and assistant insights before deciding what to do next.", styles["Body"]))

    story.append(p("Dashboard", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "The dashboard route is permission-gated through dashboardView.",
            "It serves as the main overview for KPIs, pipeline health, and work prioritization.",
            "It is role-sensitive: sales users, managers, and admins do not use it in the same way.",
        ],
    )

    story.append(p("AI Assistant", styles["Sec"]))
    ai_table = [["Capability", "Current implemented behavior"]]
    for title, body_text in AI_GUIDE:
        ai_table.append([title, body_text])
    story.append(table(ai_table, [width * 0.28, width * 0.72]))

    story.append(p("What this means for users", styles["SubSec"]))
    add_list(
        story,
        styles,
        [
            "The assistant is not only a chat panel. It also surfaces prioritized work and can participate in controlled execution paths.",
            "AI guidance should be treated as assistance layered on top of CRM evidence, not as a replacement for record history or policy logic.",
            "Because the assistant includes review and undo concepts, it is suitable for guided operational workflows rather than simple answer generation only.",
        ],
    )

    chapter(story, styles, width, 3, "Leads, Qualification, and Conversion")
    story.append(p("Leads are now one of the most structured parts of the CRM. The current implementation goes beyond simple status updates and includes evidence-aware progression, cadence, disposition reporting, duplicate checks, and conversation intelligence.", styles["Body"]))

    story.append(p("Lead Module", styles["Sec"]))
    lead_table = [["Lead capability", "Current implemented behavior"]]
    for title, body_text in LEAD_GUIDE:
        lead_table.append([title, body_text])
    story.append(table(lead_table, [width * 0.28, width * 0.72]))

    story.append(p("Lead statuses", styles["SubSec"]))
    add_list(
        story,
        styles,
        [
            "New",
            "Contacted",
            "Nurture",
            "Qualified",
            "Converted",
            "Lost",
            "Disqualified",
        ],
    )

    story.append(p("How users should think about lead progress", styles["SubSec"]))
    add_list(
        story,
        styles,
        [
            "A lead is not just moved forward because a user clicks a status. Status changes are increasingly tied to activity evidence and qualification readiness.",
            "Nurture is treated as a meaningful branch state rather than a simple mandatory linear step.",
            "Conversion remains the bridge from prospect handling into customer/contact/deal context.",
        ],
    )

    chapter(story, styles, width, 4, "Customers, Contacts, and Activities")
    story.append(p("Customers, contacts, and activities form the operational relationship layer of the CRM. These modules carry the core people, company, and evidence history that other modules depend on.", styles["Body"]))

    story.append(p("Customers and Contacts", styles["Sec"]))
    cc_table = [
        ["Area", "Current implemented behavior"],
        ["Customers", "Customer list, detail, create, edit, filters, and company-level CRM context."],
        ["Contacts", "Contact list, create, edit, and person-level CRM records linked to account and commercial context."],
        ["Shared value", "These modules provide the stable account/person records that survive beyond a single lead or deal."],
    ]
    story.append(table(cc_table, [width * 0.25, width * 0.75]))

    story.append(p("Activities", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "Activities support list, calendar, and tasks-oriented views.",
            "Users can create and edit activity records through dedicated form routes.",
            "Activities are connected to other CRM entities and act as the evidence layer behind lead and deal progress.",
            "Activity services also participate in refreshing lead conversation-related scoring behavior.",
        ],
    )

    chapter(story, styles, width, 5, "Deals and Decision Inbox")
    story.append(p("Deals represent the live commercial motion after a prospect becomes a serious revenue opportunity. In the current system, the deal workspace is tightly connected to approvals and governed decision-making.", styles["Body"]))

    story.append(p("Deals", styles["Sec"]))
    deal_table = [["Deal capability", "Current implemented behavior"]]
    for title, body_text in DEAL_GUIDE:
        deal_table.append([title, body_text])
    story.append(table(deal_table, [width * 0.28, width * 0.72]))

    story.append(p("Decision Inbox", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "Decision Inbox routes include pending action, policies & SLA, and decision history surfaces.",
            "The approvals workspace is a dedicated operational area, not just a button embedded inside a deal.",
            "The system is structured so governed approvals can be reviewed with business context, policy context, and history context.",
        ],
    )

    chapter(story, styles, width, 6, "Marketing, Campaign Email, and Attribution")
    story.append(p("Marketing is now a first-class module group in the CRM rather than a peripheral add-on. The current application includes campaign management, attribution, campaign email workflows, health scoring, and recommendation handling.", styles["Body"]))

    story.append(p("Marketing Module", styles["Sec"]))
    marketing_table = [["Marketing capability", "Current implemented behavior"]]
    for title, body_text in MARKETING_GUIDE:
        marketing_table.append([title, body_text])
    story.append(table(marketing_table, [width * 0.28, width * 0.72]))

    story.append(p("Practical user meaning", styles["SubSec"]))
    add_list(
        story,
        styles,
        [
            "Marketing users can work from campaign creation through performance interpretation without leaving the product.",
            "Attribution is not only a count of influenced records; the codebase includes explainability-oriented DTOs and recommendation workflows.",
            "Campaign email is modeled as an operational workflow with detail pages, recipient detail, send/schedule outcomes, and preference handling.",
        ],
    )

    chapter(story, styles, width, 7, "Reports, Mailbox, and Help Desk")
    story.append(p("These modules extend the CRM from commercial execution into communication, visibility, and post-sale operations.", styles["Body"]))

    story.append(p("Reports", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "The application has a reports route and a separate report-designer route.",
            "Permissions distinguish report viewing, report management, and report design.",
            "This means reporting is treated as an active product surface, not only a few embedded charts.",
        ],
    )

    story.append(p("Mailbox", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "The mailbox area includes inbox, starred, sent, drafts, archive, spam, trash, and email template routes.",
            "Mailbox access is permission-controlled separately from the rest of CRM.",
            "Mailbox and CRM evidence intersect through lead conversation analysis and related email flows.",
        ],
    )

    story.append(p("Help Desk", styles["Sec"]))
    helpdesk_table = [["Help desk capability", "Current implemented behavior"]]
    for title, body_text in HELPDESK_GUIDE:
        helpdesk_table.append([title, body_text])
    story.append(table(helpdesk_table, [width * 0.28, width * 0.72]))

    chapter(story, styles, width, 8, "Settings, Permissions, and Administration")
    story.append(p("The administration surface is broader than the older guide suggested. It now spans people, workspace behavior, marketing settings, email accounts, approval and qualification settings, audit, lookups, and workflow-related routing.", styles["Body"]))

    story.append(p("Settings and Administration", styles["Sec"]))
    settings_table = [["Admin area", "Current implemented behavior"]]
    for title, body_text in SETTINGS_GUIDE:
        settings_table.append([title, body_text])
    story.append(table(settings_table, [width * 0.28, width * 0.72]))

    story.append(p("Permission families", styles["Sec"]))
    perm_table = [["Permission group", "Current key family"]]
    for title, body_text in PERMISSION_GROUPS:
        perm_table.append([title, body_text])
    story.append(table(perm_table, [width * 0.28, width * 0.72]))

    story.append(p("Why this matters", styles["SubSec"]))
    add_list(
        story,
        styles,
        [
            "Access in North Edge CRM is not a single admin switch. Different modules are permission-gated independently.",
            "Some modules are also tenant-feature-gated, which means a module can exist in the product but be disabled for a specific tenant.",
            "Workspace-level policy settings now include email delivery controls and other operational toggles, so admins are managing platform behavior, not only user records.",
        ],
    )

    chapter(story, styles, width, 9, "Common Workflows and Daily Usage Patterns")
    story.append(p("The most effective way to learn the CRM is by following the real workflows that connect modules together. The patterns below reflect the current product shape.", styles["Body"]))

    for title, items in COMMON_WORKFLOWS:
        story.append(p(title, styles["Sec"]))
        add_list(story, styles, items)

    story.append(p("Recommended learning order", styles["Sec"]))
    add_list(
        story,
        styles,
        [
            "Start with Dashboard, Leads, Activities, and Deals if you are a sales-facing user.",
            "Add Decision Inbox next if you are part of approval handling.",
            "Add Marketing if you work on campaign execution or attribution.",
            "Add Help Desk if you work on post-sale case handling.",
            "Learn Settings and permission families last unless you are an administrator.",
        ],
    )

    story.append(PageBreak())
    story.append(Spacer(1, 55 * mm))
    story.append(GradientBar(width))
    story.append(Spacer(1, 5 * mm))
    story.append(p("End of User Guide — North Edge CRM", styles["Footer"]))
    story.append(p(f"Generated {datetime.now().strftime('%B %d, %Y')}  •  North Edge System  •  Toronto, Canada  •  www.northedgesystem.com", styles["Footer"]))
    story.append(p("This edition reflects the current codebase module surface and updated workflow behavior.", styles["Footer"]))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return OUTPUT_PATH


if __name__ == "__main__":
    path = build_pdf()
    print(f"✅ PDF generated: {path}")
    print(f"   Size: {os.path.getsize(path) // 1024} KB")
