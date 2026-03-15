#!/usr/bin/env python3
from __future__ import annotations

from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PATH = OUTPUT_DIR / "North_Edge_CRM_Operations_Workbook.pdf"

PRIMARY = HexColor("#2563eb")
PRIMARY_DARK = HexColor("#1d4ed8")
CYAN = HexColor("#0891b2")
GREEN = HexColor("#059669")
AMBER = HexColor("#d97706")
ROSE = HexColor("#e11d48")
SLATE_900 = HexColor("#0f172a")
SLATE_800 = HexColor("#1e293b")
SLATE_700 = HexColor("#334155")
SLATE_500 = HexColor("#64748b")
SLATE_300 = HexColor("#cbd5e1")
SLATE_200 = HexColor("#e2e8f0")
SLATE_100 = HexColor("#f1f5f9")
BLUE_BG = HexColor("#eff6ff")
MINT_BG = HexColor("#ecfdf5")
AMBER_BG = HexColor("#fffbeb")
ROSE_BG = HexColor("#fff1f2")


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            "CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=31,
            textColor=SLATE_900,
            alignment=TA_LEFT,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "CoverSubtitle",
            fontName="Helvetica",
            fontSize=13,
            leading=18,
            textColor=PRIMARY_DARK,
            alignment=TA_LEFT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "Meta",
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=SLATE_500,
            alignment=TA_LEFT,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            "Section",
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=PRIMARY_DARK,
            spaceBefore=12,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "Subsection",
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=15,
            textColor=SLATE_800,
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Body",
            fontName="Helvetica",
            fontSize=9.4,
            leading=13.5,
            textColor=SLATE_700,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Small",
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=SLATE_500,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "Label",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=SLATE_800,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            "WorkbookBullet",
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=SLATE_700,
            leftIndent=14,
            bulletIndent=3,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            "CardTitle",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=SLATE_900,
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            "CardValue",
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=SLATE_900,
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            "CardCaption",
            fontName="Helvetica",
            fontSize=8.3,
            leading=10.5,
            textColor=SLATE_700,
            alignment=TA_CENTER,
        )
    )
    return styles


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(SLATE_200)
    canvas.line(18 * mm, 15 * mm, A4[0] - 18 * mm, 15 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE_500)
    canvas.drawString(18 * mm, 9.5 * mm, "North Edge CRM Operations Workbook")
    canvas.drawRightString(A4[0] - 18 * mm, 9.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_table(rows, widths, header_bg=BLUE_BG):
    table = Table(rows, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), header_bg),
                ("TEXTCOLOR", (0, 0), (-1, 0), PRIMARY_DARK),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("LEADING", (0, 0), (-1, -1), 10),
                ("TEXTCOLOR", (0, 1), (-1, -1), SLATE_700),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, SLATE_100]),
                ("GRID", (0, 0), (-1, -1), 0.35, SLATE_300),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def card_row(styles):
    cards = [
        ("8", "Business scenarios", "Lead-to-deal, listing execution, service handling, and manager oversight"),
        ("3", "Working personas", "Anastasiia Zaher, Robert Lambke, and service coordination"),
        ("6", "Core records", "Leads, contacts, accounts, deals, properties, and service cases"),
        ("14", "Days of sample activity", "Enough volume for follow-up, forecasting, review, and closure"),
    ]
    data = []
    for title, value, caption in cards:
        data.append(
            Table(
                [
                    [Paragraph(value, styles["CardValue"])],
                    [Paragraph(title, styles["CardTitle"])],
                    [Paragraph(caption, styles["CardCaption"])],
                ],
                colWidths=[42 * mm],
            )
        )
    outer = Table([data], colWidths=[42 * mm] * 4)
    outer.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    for idx, bg in enumerate([BLUE_BG, MINT_BG, AMBER_BG, ROSE_BG]):
        data[idx].setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), bg),
                    ("BOX", (0, 0), (-1, -1), 0.6, SLATE_300),
                    ("ROUNDEDCORNERS", [10, 10, 10, 10]),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ]
            )
        )
    return outer


SCENARIOS = [
    {
        "title": "1. Brokerage lead intake and qualification",
        "objective": "Capture a new inbound seller enquiry, qualify it with evidence, and convert it into an active client relationship with a live deal.",
        "records": [
            ["Lead", "Maya Rosen, homeowner enquiry from downtown Toronto"],
            ["Channel", "Website form followed by inbound phone call"],
            ["Assigned owner", "Anastasiia Zaher"],
            ["Expected outcome", "Qualified lead linked to account, contact, and a new deal"],
        ],
        "steps": [
            "Create Maya Rosen as a new lead with the enquiry topic 'Listing consultation for condo sale'.",
            "Record the source as Website and capture a same-day phone follow-up activity with outcome and next step.",
            "Add readiness notes covering target sale window, expected list price, current mortgage position, and whether all owners are aligned.",
            "Promote the lead to qualified only after a discovery meeting is logged and the seller's timeline, goals, and decision-makers are clear.",
            "Create the customer record 'Rosen Family Holdings', convert Maya into the primary contact, and open a new deal for the listing opportunity.",
        ],
        "expected": [
            "Lead history shows intake, call, meeting, and qualification progression.",
            "Customer and contact records are linked cleanly.",
            "A deal exists with a realistic amount and expected close date.",
            "Manager can review the qualification evidence without chasing notes in other modules.",
        ],
    },
    {
        "title": "2. Contact and account growth from an active client",
        "objective": "Expand one client relationship into a brokerage account with multiple contacts, preferred channels, and role clarity.",
        "records": [
            ["Account", "Sterling Harbour Realty Group"],
            ["Primary contact", "Sofia Marin, Brokerage Operations Director"],
            ["Additional contact", "Daniel Varga, Finance Coordinator"],
            ["Expected outcome", "Account carries key contacts, phone/email details, and role ownership"],
        ],
        "steps": [
            "Create the account with website, phone, city, and industry details.",
            "Add Sofia Marin as the primary operational contact and Daniel Varga as the finance contact.",
            "Record communication preferences, decision influence, and who approves pricing or legal documents.",
            "Link both contacts to the active deal so the team has a complete stakeholder map.",
        ],
        "expected": [
            "The account detail page becomes the commercial anchor for future activity.",
            "Contacts have distinct business roles and communication context.",
            "The deal shows both contacts with the correct relationship to the transaction.",
        ],
    },
    {
        "title": "3. Deal progression from qualification to closing",
        "objective": "Move a live deal through stage progression, approvals, and closure with visible owner, confidence, and risk management.",
        "records": [
            ["Deal", "Queen West Listing Intake - Spring Portfolio"],
            ["Amount", "$1,450,000"],
            ["Owner", "Anastasiia Zaher"],
            ["Manager reviewer", "Robert Lambke"],
        ],
        "steps": [
            "Create the deal with summary, requirements, buying or selling process, success criteria, value, and expected close date.",
            "Advance the deal from Qualification to the next commercial stages only when each required field is complete.",
            "Log a pricing approval or manager review step when commercial terms need oversight.",
            "Add the latest call, meeting, and document milestones so the deal timeline reflects real execution.",
            "Close one deal as won with final value and one parallel deal as lost with a clear reason, such as pricing gap or timeline mismatch.",
        ],
        "expected": [
            "Stage progression respects required information and leaves a visible history trail.",
            "Approvals and review notes are visible to management.",
            "Won and lost deals capture meaningful closure data for reporting.",
        ],
    },
    {
        "title": "4. Property listing execution for a realtor workspace",
        "objective": "Operate a listing from intake through activation, media, showings, documents, alerts, and manager review.",
        "records": [
            ["Property", "12 Lakeview Crescent, Toronto"],
            ["MLS", "C1234567"],
            ["Primary contact", "Sofia Marin"],
            ["Linked deal", "Queen West Listing Intake - Spring Portfolio"],
        ],
        "steps": [
            "Create the property with address, neighborhood, status, type, list price, size, and key listing features.",
            "Link the property to owner, account, contact, and the active deal.",
            "Upload listing photos, the listing agreement, floor plan, and inspection summary.",
            "Schedule two showings, log one completed showing with buyer feedback, and record a follow-up activity.",
            "Change the property status from Draft to Active, then record a list-price adjustment and confirm the history is preserved.",
            "Create two buyer alert subscriptions with realistic match criteria for Toronto condo inventory.",
        ],
        "expected": [
            "Property detail acts as a single workspace for media, showings, price changes, documents, and alerts.",
            "Timeline reflects activation, documents, showings, price change, and alert activity.",
            "Manager sees the same property state and supporting evidence from a separate login.",
        ],
    },
    {
        "title": "5. Daily activity management and follow-up discipline",
        "objective": "Use activities to drive next steps, maintain accountability, and prove that no lead or deal goes stale.",
        "records": [
            ["Owner", "Anastasiia Zaher"],
            ["Related records", "Maya Rosen lead, Queen West deal, 12 Lakeview Crescent property"],
            ["Activity mix", "Call, meeting, task, follow-up"],
        ],
        "steps": [
            "Log a completed call against the lead with outcome, notes, and next step.",
            "Log a discovery meeting against the deal with a confirmed next-step due date.",
            "Create a follow-up task against the property for staging feedback and then mark it complete.",
            "Review each related record to confirm activities appear in the correct timeline and relationship context.",
        ],
        "expected": [
            "Each activity carries a real outcome and next step instead of placeholder text.",
            "Activities are visible from the related lead, deal, and property records.",
            "Managers can see workload and completion quality without opening multiple disconnected screens.",
        ],
    },
    {
        "title": "6. Service and case handling after handoff",
        "objective": "Manage a post-sale or client service issue using Help Desk records while maintaining CRM continuity.",
        "records": [
            ["Case", "Missing condo board disclosure in post-offer document pack"],
            ["Account", "Sterling Harbour Realty Group"],
            ["Contact", "Daniel Varga"],
            ["Priority", "High"],
        ],
        "steps": [
            "Open a new service case tied to the account and contact.",
            "Assign the case to a service coordinator and set the appropriate queue, priority, and SLA policy.",
            "Record one internal comment, one client-facing update, and one escalation event if the document is still missing after the first deadline.",
            "Resolve the case with a clear resolution summary and closure timestamp.",
        ],
        "expected": [
            "Help Desk data stays linked to the same customer context as the commercial records.",
            "Comments, escalation history, and closure details are visible in one case record.",
            "Managers can assess service responsiveness without losing CRM relationship context.",
        ],
    },
    {
        "title": "7. Manager review, approvals, and forecast readiness",
        "objective": "Give leadership a clean path to review pipeline quality, pricing approvals, and listing readiness before forecast meetings.",
        "records": [
            ["Manager", "Robert Lambke"],
            ["Review set", "Open deals, active listings, pending approvals, and stale follow-ups"],
        ],
        "steps": [
            "Sign in as the manager and review the open deal created earlier, including amount, confidence, stage history, and approval notes.",
            "Open the linked property to confirm listing status, latest showings, price changes, and document completeness.",
            "Review the activity timeline for signs of stale work, such as overdue follow-ups or missing stakeholder contact.",
            "Approve or challenge the deal based on evidence quality, missing documents, or unresolved pricing risk.",
        ],
        "expected": [
            "Leadership can review deal and property readiness without relying on verbal updates.",
            "Approval or challenge actions are visible in the record history.",
            "Pipeline review is grounded in evidence, not stage labels alone.",
        ],
    },
    {
        "title": "8. Record closure, archive, and cleanup discipline",
        "objective": "Close out completed or obsolete records cleanly so operational reporting stays trustworthy.",
        "records": [
            ["Closed record", "A completed listing deal and sold property"],
            ["Archived record", "One withdrawn or inactive listing"],
        ],
        "steps": [
            "Mark a successful property journey as sold and close the related deal with final value and closing date.",
            "Archive or delete one withdrawn property after confirming its child records no longer appear in active work queues.",
            "Review the list, board, and direct detail access to ensure closed or archived records behave correctly.",
            "Confirm that reporting records remain accurate while daily operational views stay clean.",
        ],
        "expected": [
            "Closed work is preserved for historical reporting.",
            "Archived or deleted work no longer pollutes active pipelines and listing boards.",
            "Managers still trust the current-state views after cleanup activity.",
        ],
    },
]


SAMPLE_DATA = {
    "People and responsibilities": [
        ["Name", "Business role", "Email"],
        ["Anastasiia Zaher", "Realtor", "anastasiia.zaher@example.com"],
        ["Robert Lambke", "Brokerage Manager", "yasser.ahamed@gmail.com"],
        ["Nadia Pires", "Service Coordinator", "nadia.pires@example.com"],
    ],
    "Accounts and contacts": [
        ["Record", "Details", "Notes"],
        ["Sterling Harbour Realty Group", "Toronto brokerage account", "Primary client account used across lead, deal, property, and service scenarios"],
        ["Sofia Marin", "Brokerage Operations Director | sofia.marin@example.com", "Primary contact for listing execution"],
        ["Daniel Varga", "Finance Coordinator | daniel.varga@example.com", "Used for approvals and support follow-up"],
    ],
    "Lead and deal data": [
        ["Record", "Value", "Notes"],
        ["Lead name", "Maya Rosen", "Homeowner enquiry for a condo sale"],
        ["Lead source", "Website enquiry", "Followed by inbound phone call"],
        ["Deal name", "Queen West Listing Intake - Spring Portfolio", "Primary commercial record"],
        ["Deal amount", "$1,450,000", "Use realistic listing-side value"],
    ],
    "Property and service data": [
        ["Record", "Value", "Notes"],
        ["Property", "12 Lakeview Crescent, Toronto", "Main listing workflow record"],
        ["MLS", "C1234567", "Use as the market identifier"],
        ["List price", "$829,000", "Later adjust during the price-change step"],
        ["Service case", "Missing condo board disclosure in post-offer document pack", "Used for Help Desk flow"],
    ],
}


def build_story():
    styles = build_styles()
    story = []
    width, _ = A4
    usable_width = width - 32 * mm

    story.append(Spacer(1, 10 * mm))
    story.append(Paragraph("North Edge CRM Operations Workbook", styles["CoverTitle"]))
    story.append(
        Paragraph(
            "Business-ready entry scenarios for lead management, deal execution, property operations, service handling, and manager review.",
            styles["CoverSubtitle"],
        )
    )
    story.append(Paragraph(f"Prepared on {datetime.now().strftime('%B %d, %Y')}", styles["Meta"]))
    story.append(Paragraph("Environment: Azure dev CRM workspace", styles["Meta"]))
    story.append(Paragraph("Purpose: give business users realistic scenarios and sample data to enter directly in the system.", styles["Meta"]))
    story.append(Spacer(1, 8 * mm))
    story.append(card_row(styles))
    story.append(Spacer(1, 8 * mm))
    story.append(
        Paragraph(
            "This workbook avoids placeholder language. Every scenario below is written as an operational exercise with realistic names, records, values, and expected business outcomes.",
            styles["Body"],
        )
    )

    story.append(Paragraph("Coverage", styles["Section"]))
    for line in [
        "Lead capture and qualification",
        "Account and contact relationship build-out",
        "Deal creation, stage movement, approvals, and closure",
        "Property listing execution including media, showings, documents, alerts, and pricing",
        "Activity and follow-up discipline",
        "Help Desk case handling after handoff",
        "Manager review and forecast readiness",
        "Closure, archive, and cleanup discipline",
    ]:
        story.append(Paragraph(f"• {line}", styles["WorkbookBullet"]))

    story.append(Paragraph("Core sample data", styles["Section"]))
    for title, rows in SAMPLE_DATA.items():
        story.append(Paragraph(title, styles["Subsection"]))
        story.append(make_table(rows, [44 * mm, 66 * mm, 62 * mm]))
        story.append(Spacer(1, 3 * mm))

    story.append(PageBreak())
    story.append(Paragraph("Scenario workbook", styles["Section"]))
    story.append(
        Paragraph(
            "Use each scenario in sequence for a full operational cycle, or assign individual sections to the relevant user role.",
            styles["Body"],
        )
    )

    for scenario in SCENARIOS:
        story.append(Paragraph(scenario["title"], styles["Subsection"]))
        story.append(Paragraph(f"<b>Business objective:</b> {scenario['objective']}", styles["Body"]))
        story.append(make_table([["Record", "Value"], *scenario["records"]], [48 * mm, 124 * mm], header_bg=MINT_BG))
        story.append(Spacer(1, 2 * mm))
        story.append(Paragraph("Execution steps", styles["Label"]))
        for idx, step in enumerate(scenario["steps"], start=1):
            story.append(Paragraph(f"{idx}. {step}", styles["Body"]))
        story.append(Paragraph("Expected business outcome", styles["Label"]))
        for item in scenario["expected"]:
            story.append(Paragraph(f"• {item}", styles["WorkbookBullet"]))
        story.append(Spacer(1, 4 * mm))

    story.append(PageBreak())
    story.append(Paragraph("Recommended entry order", styles["Section"]))
    order_rows = [
        ["Stage", "What to complete", "Primary role"],
        ["Day 1", "Lead intake, qualification, account, contact, and initial deal", "Anastasiia Zaher"],
        ["Day 2", "Property creation, linkage, media, documents, and first activities", "Anastasiia Zaher"],
        ["Day 3", "Showings, buyer alerts, price movement, and deal progression", "Anastasiia Zaher"],
        ["Day 4", "Manager review, approvals, and forecast validation", "Brokerage Manager"],
        ["Day 5", "Service case handling, closure, archive, and cleanup", "Service Coordinator + Manager"],
    ]
    story.append(make_table(order_rows, [28 * mm, 98 * mm, 46 * mm], header_bg=AMBER_BG))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Notes for the business team", styles["Section"]))
    for line in [
        "Use the sample names, values, and dates exactly as written if you want consistent reporting and review output.",
        "Where a scenario asks for supporting notes, write commercially realistic detail instead of placeholders.",
        "Manager review works best after the prior records have been entered fully, including activities, documents, and linked contacts.",
        "If a process cannot be completed because a screen, rule, or role blocks the entry, record the step and the exact page where it happened.",
    ]:
        story.append(Paragraph(f"• {line}", styles["WorkbookBullet"]))

    return story


def build_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=22 * mm,
        title="North Edge CRM Operations Workbook",
        author="OpenAI Codex",
    )
    story = build_story()
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    return OUTPUT_PATH


if __name__ == "__main__":
    path = build_pdf()
    print(path)
