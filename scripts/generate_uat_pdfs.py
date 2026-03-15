#!/usr/bin/env python3
"""
Generate per-module UAT PDF documents for CRM Enterprise.

Each PDF is a professional business-user-facing acceptance test document
with numbered test cases, step-by-step instructions, expected results,
and sign-off fields.

Output: output/pdf/uat/  (one PDF per module)
"""

import os
import textwrap
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# ── Branding constants ──────────────────────────────────────────────
BRAND = "North Edge Systems"
PRODUCT = "CRM Enterprise"
VERSION = "1.0"
DOC_DATE = datetime.now().strftime("%B %d, %Y")
PREPARED_BY = "Anastassiia Zaher"
APPROVED_BY = "Robert Lambke"

PRIMARY = colors.HexColor("#667eea")
PRIMARY_DARK = colors.HexColor("#4338ca")
ACCENT = colors.HexColor("#764ba2")
HEADER_BG = colors.HexColor("#f0f7ff")
ROW_ALT = colors.HexColor("#f8fafc")
SUCCESS_GREEN = colors.HexColor("#22c55e")
BORDER_LIGHT = colors.HexColor("#e2e8f0")
TEXT_DARK = colors.HexColor("#1e293b")
TEXT_MED = colors.HexColor("#475569")
TEXT_LIGHT = colors.HexColor("#64748b")

PAGE_W, PAGE_H = A4
MARGIN = 2 * cm


# ── Styles ──────────────────────────────────────────────────────────
def _styles():
    ss = getSampleStyleSheet()
    s = {}
    s["title"] = ParagraphStyle(
        "UATTitle",
        parent=ss["Title"],
        fontSize=26,
        leading=32,
        textColor=PRIMARY_DARK,
        spaceAfter=4 * mm,
        fontName="Helvetica-Bold",
    )
    s["subtitle"] = ParagraphStyle(
        "UATSubtitle",
        parent=ss["Normal"],
        fontSize=13,
        leading=18,
        textColor=TEXT_MED,
        spaceAfter=6 * mm,
    )
    s["h2"] = ParagraphStyle(
        "UATH2",
        parent=ss["Heading2"],
        fontSize=15,
        leading=20,
        textColor=PRIMARY_DARK,
        spaceBefore=8 * mm,
        spaceAfter=4 * mm,
        fontName="Helvetica-Bold",
    )
    s["h3"] = ParagraphStyle(
        "UATH3",
        parent=ss["Heading3"],
        fontSize=12,
        leading=16,
        textColor=TEXT_DARK,
        spaceBefore=5 * mm,
        spaceAfter=2 * mm,
        fontName="Helvetica-Bold",
    )
    s["body"] = ParagraphStyle(
        "UATBody",
        parent=ss["Normal"],
        fontSize=10,
        leading=14,
        textColor=TEXT_DARK,
    )
    s["small"] = ParagraphStyle(
        "UATSmall",
        parent=ss["Normal"],
        fontSize=8.5,
        leading=12,
        textColor=TEXT_MED,
    )
    s["cell"] = ParagraphStyle(
        "UATCell",
        parent=ss["Normal"],
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
    )
    s["cell_bold"] = ParagraphStyle(
        "UATCellBold",
        parent=s["cell"],
        fontName="Helvetica-Bold",
    )
    s["cell_small"] = ParagraphStyle(
        "UATCellSmall",
        parent=ss["Normal"],
        fontSize=8,
        leading=11,
        textColor=TEXT_MED,
    )
    s["footer"] = ParagraphStyle(
        "UATFooter",
        parent=ss["Normal"],
        fontSize=7.5,
        leading=10,
        textColor=TEXT_LIGHT,
        alignment=TA_CENTER,
    )
    s["meta_label"] = ParagraphStyle(
        "UATMetaLabel",
        parent=ss["Normal"],
        fontSize=9,
        leading=12,
        textColor=TEXT_LIGHT,
        fontName="Helvetica-Bold",
    )
    s["meta_value"] = ParagraphStyle(
        "UATMetaValue",
        parent=ss["Normal"],
        fontSize=9,
        leading=12,
        textColor=TEXT_DARK,
    )
    return s


# ── Page templates ──────────────────────────────────────────────────
def _header_footer(canvas, doc, module_name):
    canvas.saveState()
    # Header line
    canvas.setStrokeColor(PRIMARY)
    canvas.setLineWidth(0.8)
    canvas.line(MARGIN, PAGE_H - MARGIN + 8 * mm, PAGE_W - MARGIN, PAGE_H - MARGIN + 8 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(TEXT_LIGHT)
    canvas.drawString(MARGIN, PAGE_H - MARGIN + 10 * mm, f"{BRAND}  ·  {PRODUCT}")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 10 * mm, f"UAT — {module_name}")

    # Footer
    canvas.setStrokeColor(BORDER_LIGHT)
    canvas.line(MARGIN, MARGIN - 5 * mm, PAGE_W - MARGIN, MARGIN - 5 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(TEXT_LIGHT)
    canvas.drawString(MARGIN, MARGIN - 9 * mm, f"Confidential  ·  {DOC_DATE}")
    canvas.drawRightString(PAGE_W - MARGIN, MARGIN - 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def _build_doc(filepath, module_name):
    frame = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN - 5 * mm, id="main")
    doc = BaseDocTemplate(
        str(filepath),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 5 * mm,
        bottomMargin=MARGIN + 2 * mm,
    )
    doc.addPageTemplates(
        [PageTemplate(id="all", frames=[frame], onPage=lambda c, d: _header_footer(c, d, module_name))]
    )
    return doc


# ── Reusable flowable builders ──────────────────────────────────────
def _hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER_LIGHT, spaceAfter=3 * mm, spaceBefore=2 * mm)


def _meta_table(s):
    """Top metadata block (prepared by, approved by, version, date)."""
    data = [
        [
            Paragraph("Prepared by:", s["meta_label"]),
            Paragraph(PREPARED_BY, s["meta_value"]),
            Paragraph("Date:", s["meta_label"]),
            Paragraph(DOC_DATE, s["meta_value"]),
        ],
        [
            Paragraph("Approved by:", s["meta_label"]),
            Paragraph(APPROVED_BY, s["meta_value"]),
            Paragraph("Version:", s["meta_label"]),
            Paragraph(VERSION, s["meta_value"]),
        ],
    ]
    col_w = (PAGE_W - 2 * MARGIN) / 4
    t = Table(data, colWidths=[col_w] * 4)
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("GRID", (0, 0), (-1, -1), 0.4, BORDER_LIGHT),
                ("BACKGROUND", (0, 0), (-1, -1), HEADER_BG),
            ]
        )
    )
    return t


def _signoff_block(s):
    """Final sign-off section."""
    data = [
        [
            Paragraph("<b>Role</b>", s["cell_bold"]),
            Paragraph("<b>Name</b>", s["cell_bold"]),
            Paragraph("<b>Signature</b>", s["cell_bold"]),
            Paragraph("<b>Date</b>", s["cell_bold"]),
            Paragraph("<b>Result</b>", s["cell_bold"]),
        ],
        [Paragraph("Tester", s["cell"]), Paragraph(PREPARED_BY, s["cell"]), "", "", ""],
        [Paragraph("Approver", s["cell"]), Paragraph(APPROVED_BY, s["cell"]), "", "", ""],
        [Paragraph("Project Manager", s["cell"]), "", "", "", ""],
    ]
    avail = PAGE_W - 2 * MARGIN
    t = Table(data, colWidths=[avail * 0.14, avail * 0.22, avail * 0.28, avail * 0.18, avail * 0.18])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
                ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, ROW_ALT]),
            ]
        )
    )
    return t


def _test_table(cases, s):
    """Main test case table with steps, expected results, status columns."""
    header = [
        Paragraph("<b>TC #</b>", s["cell_bold"]),
        Paragraph("<b>Test Case</b>", s["cell_bold"]),
        Paragraph("<b>Steps</b>", s["cell_bold"]),
        Paragraph("<b>Expected Result</b>", s["cell_bold"]),
        Paragraph("<b>Pass / Fail</b>", s["cell_bold"]),
        Paragraph("<b>Comments</b>", s["cell_bold"]),
    ]
    rows = [header]
    for i, tc in enumerate(cases, 1):
        steps_text = "<br/>".join(f"{j}. {step}" for j, step in enumerate(tc["steps"], 1))
        rows.append(
            [
                Paragraph(f"TC-{i:02d}", s["cell_bold"]),
                Paragraph(f"<b>{tc['title']}</b><br/><font size=7 color='#64748b'>{tc.get('category', '')}</font>", s["cell"]),
                Paragraph(steps_text, s["cell_small"]),
                Paragraph(tc["expected"], s["cell_small"]),
                Paragraph("☐ Pass  ☐ Fail", s["cell_small"]),
                Paragraph("", s["cell_small"]),
            ]
        )
    avail = PAGE_W - 2 * MARGIN
    col_widths = [avail * 0.06, avail * 0.18, avail * 0.30, avail * 0.22, avail * 0.10, avail * 0.14]
    t = Table(rows, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.4, BORDER_LIGHT),
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, ROW_ALT]),
        ("LINEBELOW", (0, 0), (-1, 0), 1, PRIMARY_DARK),
    ]
    t.setStyle(TableStyle(style_cmds))
    return t


def _preconditions_table(items, s):
    """Preconditions / prerequisites block."""
    data = [[Paragraph(f"• {item}", s["cell"])] for item in items]
    avail = PAGE_W - 2 * MARGIN
    t = Table(data, colWidths=[avail])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("BACKGROUND", (0, 0), (-1, -1), HEADER_BG),
                ("BOX", (0, 0), (-1, -1), 0.4, BORDER_LIGHT),
            ]
        )
    )
    return t


# ── Build module story ──────────────────────────────────────────────
def _build_story(module, s):
    """Return list of flowable objects for one module."""
    story = []

    # Title
    story.append(Paragraph(f"{module['title']}", s["title"]))
    story.append(Paragraph(module["subtitle"], s["subtitle"]))
    story.append(_meta_table(s))
    story.append(Spacer(1, 6 * mm))
    story.append(_hr())

    # Purpose
    story.append(Paragraph("1. Purpose", s["h2"]))
    story.append(Paragraph(module["purpose"], s["body"]))
    story.append(Spacer(1, 3 * mm))

    # Scope
    story.append(Paragraph("2. Scope", s["h2"]))
    story.append(Paragraph(module["scope"], s["body"]))
    story.append(Spacer(1, 3 * mm))

    # Preconditions
    story.append(Paragraph("3. Preconditions", s["h2"]))
    story.append(_preconditions_table(module["preconditions"], s))
    story.append(Spacer(1, 3 * mm))

    # Test cases
    story.append(Paragraph("4. Test Cases", s["h2"]))
    story.append(_test_table(module["cases"], s))
    story.append(Spacer(1, 5 * mm))

    # Sign-off
    story.append(Paragraph("5. Sign-Off", s["h2"]))
    story.append(_signoff_block(s))
    story.append(Spacer(1, 8 * mm))

    # Notes
    story.append(Paragraph("6. Notes & Defects", s["h2"]))
    notes_data = [
        [
            Paragraph("<b>#</b>", s["cell_bold"]),
            Paragraph("<b>Description</b>", s["cell_bold"]),
            Paragraph("<b>Severity</b>", s["cell_bold"]),
            Paragraph("<b>Status</b>", s["cell_bold"]),
        ],
    ]
    for n in range(1, 4):
        notes_data.append([Paragraph(str(n), s["cell"]), "", "", ""])
    avail = PAGE_W - 2 * MARGIN
    nt = Table(notes_data, colWidths=[avail * 0.08, avail * 0.52, avail * 0.18, avail * 0.22])
    nt.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("GRID", (0, 0), (-1, -1), 0.4, BORDER_LIGHT),
                ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ]
        )
    )
    story.append(nt)

    return story


# ══════════════════════════════════════════════════════════════════════
#  MODULE DEFINITIONS — Business-user UAT test cases
# ══════════════════════════════════════════════════════════════════════

MODULES = [
    # ── CUSTOMERS ────────────────────────────────────────────────────
    {
        "key": "customers",
        "title": "Customers Module — UAT",
        "subtitle": "User Acceptance Testing for customer record management, search, editing, and lifecycle operations.",
        "purpose": (
            "Validate that authorized users can create, view, edit, search, and delete customer records "
            "through the CRM interface. Confirm that customer data is accurately persisted, that list and "
            "search features return correct results, and that the system enforces required field validations."
        ),
        "scope": (
            "This document covers end-to-end customer lifecycle operations including: new customer creation "
            "with full profile details, inline editing of existing records, bulk record handling, search and "
            "filtering on the customer list page, and soft-deletion with verification."
        ),
        "preconditions": [
            "User is logged in with an account that has Customer Management permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "At least one workspace exists with the default tenant configuration.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Create New Customer — Meridian Health Partners",
                "category": "Record Creation",
                "steps": [
                    "Navigate to Customers → New Customer.",
                    "Enter Company Name: Meridian Health Partners.",
                    "Enter Phone: +1 212 555 8740.",
                    "Enter Email: intake@meridianhealth.example.com.",
                    "Enter Industry: Healthcare.",
                    "Enter Website: https://meridianhealth.example.com.",
                    "Enter Description: Regional health network with 14 clinics across the tri-state area.",
                    "Click 'Create Customer'.",
                    "Navigate to the Customers list page.",
                    "Search for 'Meridian Health Partners'.",
                ],
                "expected": (
                    "Customer record is created successfully. A confirmation message appears. "
                    "The customer is visible in the list when searched by name. All entered fields display correctly."
                ),
            },
            {
                "title": "Edit Existing Customer — Update Description",
                "category": "Record Editing",
                "steps": [
                    "Create customer 'Northshore Capital Advisors' via the system (or confirm it exists).",
                    "Navigate to the customer's Edit page.",
                    "Update the Description field to include expanded asset details.",
                    "Click 'Update Customer'.",
                    "Verify the updated description is saved.",
                ],
                "expected": (
                    "Customer record is updated without errors. The new description persists "
                    "after page reload. Last-modified timestamp is updated."
                ),
            },
            {
                "title": "Bulk Customer Creation — Multiple Industries",
                "category": "Bulk Operations",
                "steps": [
                    "Create three customer records: Pinnacle Construction Group (Construction), "
                    "Verdant Agriculture Holdings (Agriculture), Summit Aerospace Technologies (Aerospace).",
                    "Navigate to the Customers list page.",
                    "Search for each company by name.",
                ],
                "expected": (
                    "All three customers are created successfully. Each appears in search results "
                    "with the correct industry classification."
                ),
            },
            {
                "title": "Create Customer with Full Profile — Oakhaven Pharmaceuticals",
                "category": "Comprehensive Data Entry",
                "steps": [
                    "Navigate to Customers → New Customer.",
                    "Enter Company Name: Oakhaven Pharmaceuticals.",
                    "Enter Industry: Pharmaceuticals.",
                    "Enter Phone: +41 44 555 7830.",
                    "Enter Email: procurement@oakhaven-pharma.example.com.",
                    "Enter Website: https://oakhaven-pharma.example.com.",
                    "Enter Description: Swiss-based pharmaceutical company specializing in rare disease therapeutics.",
                    "Set Lifecycle Stage to 'Customer' (if available).",
                    "Click 'Create Customer'.",
                ],
                "expected": (
                    "Customer is created with all fields populated. Lifecycle stage is set. "
                    "Record appears in the customer directory with full profile details."
                ),
            },
            {
                "title": "Delete Customer and Verify Removal",
                "category": "Record Deletion",
                "steps": [
                    "Create a temporary customer record: Ephemeral Ventures Corp.",
                    "Confirm the record exists by viewing it.",
                    "Delete the customer record.",
                    "Attempt to view the deleted customer.",
                ],
                "expected": (
                    "Customer is deleted successfully. Attempting to access the record returns "
                    "a 'Not Found' status. The customer no longer appears in search results."
                ),
            },
        ],
    },
    # ── CONTACTS ─────────────────────────────────────────────────────
    {
        "key": "contacts",
        "title": "Contacts Module — UAT",
        "subtitle": "User Acceptance Testing for contact record management, profile details, and directory features.",
        "purpose": (
            "Validate that authorized users can create, view, and manage individual contact records "
            "within the CRM. Confirm that contact profiles support comprehensive personal and professional "
            "information, that the contact directory renders correctly, and that quick-add functionality works."
        ),
        "scope": (
            "This document covers contact creation with varying levels of detail (basic, full profile, "
            "mobile/LinkedIn), list page rendering, and command-palette quick-add contact creation."
        ),
        "preconditions": [
            "User is logged in with an account that has Contact Management permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "At least one workspace exists with the default tenant configuration.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Create Contact — Sophia Martinez",
                "category": "Record Creation",
                "steps": [
                    "Navigate to Contacts → New Contact.",
                    "Enter First Name: Sophia.",
                    "Enter Last Name: Martinez.",
                    "Enter Email: sophia.martinez@example.com.",
                    "Enter Job Title: Director of Strategic Partnerships.",
                    "Enter Phone: +1 415 555 3291.",
                    "Click 'Create Contact'.",
                    "Verify the contact appears in the system via search.",
                ],
                "expected": (
                    "Contact record is created successfully. All fields are persisted. "
                    "The contact is findable by searching for the last name."
                ),
            },
            {
                "title": "Create Contact with Full Profile — Robert Lambke",
                "category": "Comprehensive Data Entry",
                "steps": [
                    "Navigate to Contacts → New Contact.",
                    "Enter First Name: Robert.",
                    "Enter Last Name: Lambke.",
                    "Enter Email: r.lambke@example.com.",
                    "Enter Job Title: Senior Vice President, Commercial.",
                    "Enter Phone: +1 646 555 2108.",
                    "Enter LinkedIn Profile URL: https://linkedin.com/in/robertlambke.",
                    "Click 'Create Contact'.",
                    "Verify the contact via search.",
                ],
                "expected": (
                    "Contact is created with all professional and social fields populated. "
                    "LinkedIn profile URL is stored and displayable."
                ),
            },
            {
                "title": "Create Contact with Mobile & LinkedIn — Amara Okafor",
                "category": "Extended Profile",
                "steps": [
                    "Navigate to Contacts → New Contact.",
                    "Enter First Name: Amara. Last Name: Okafor.",
                    "Enter Email: amara.okafor@example.com.",
                    "Enter Job Title: Regional Sales Director.",
                    "Enter Phone: +234 802 555 4600.",
                    "Enter Mobile: +234 812 555 9100 (if field is available).",
                    "Enter LinkedIn Profile URL: https://linkedin.com/in/amaraokafor.",
                    "Click 'Create Contact'.",
                ],
                "expected": (
                    "Contact is created with phone, mobile, and LinkedIn fields all populated. "
                    "Both phone numbers are stored independently."
                ),
            },
            {
                "title": "Contact Directory Loads",
                "category": "List Page",
                "steps": [
                    "Navigate to Contacts list page.",
                    "Wait for the page to fully render.",
                    "Verify the contact directory is displayed.",
                ],
                "expected": (
                    "The contacts list page loads without errors. The directory table or card view "
                    "is visible and displays existing contact records."
                ),
            },
            {
                "title": "Quick-Add Contact — Isabelle Fontaine",
                "category": "Command Palette",
                "steps": [
                    "From any page, open the Command Palette (top bar).",
                    "Select 'Create New Contact'.",
                    "In the quick-add dialog, enter Name: Isabelle Fontaine.",
                    "Enter Email: isabelle.fontaine@example.com.",
                    "Click 'Create'.",
                    "Verify the contact was created by searching.",
                ],
                "expected": (
                    "The quick-add dialog opens from the command palette. Contact is created "
                    "with the provided name and email. The dialog closes after creation."
                ),
            },
        ],
    },
    # ── LEADS ────────────────────────────────────────────────────────
    {
        "key": "leads",
        "title": "Leads Module — UAT",
        "subtitle": "User Acceptance Testing for lead capture, BANT qualification, pipeline management, and conversion workflows.",
        "purpose": (
            "Validate end-to-end lead management including creation, BANT qualification scoring, "
            "editing, partner referral tracking, bulk operations, pipeline list views, and "
            "quick-add functionality via the command palette."
        ),
        "scope": (
            "This document covers: new lead creation with source and territory fields, BANT "
            "(Budget, Authority, Need, Timeline) qualification factor entry, lead editing, "
            "partner referral source tracking, bulk lead creation, list page rendering, "
            "and command-palette quick-add."
        ),
        "preconditions": [
            "User is logged in with an account that has Lead Management permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "Lead qualification policy is configured (budget, timeline, severity, economic buyer, ICP fit).",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Create Lead — David Chen, Cascadia Renewable Energy",
                "category": "Lead Capture",
                "steps": [
                    "Navigate to Leads → New Lead.",
                    "Enter First Name: David. Last Name: Chen.",
                    "Enter Company: Cascadia Renewable Energy.",
                    "Enter Email: david.chen@example.com.",
                    "Enter Job Title: VP Operations.",
                    "Enter Source: Industry Conference.",
                    "Enter Territory: West Coast.",
                    "Click 'Create Lead'.",
                    "Verify the lead appears in the system via search.",
                ],
                "expected": (
                    "Lead is created with all fields populated. Source and territory are recorded. "
                    "Lead appears in the pipeline when searched by last name."
                ),
            },
            {
                "title": "BANT Qualification — Nordic Maritime Logistics",
                "category": "Qualification",
                "steps": [
                    "Navigate to Leads → New Lead.",
                    "Enter basic details: Anastassiia Zaher, Nordic Maritime Logistics, Chief Procurement Officer.",
                    "Switch to the Qualifications tab.",
                    "Set Budget Availability: Confirmed. Enter Evidence: €2.4M approved for fleet modernization.",
                    "Set Buying Timeline: This Quarter. Enter Evidence: RFP deadline September 15th.",
                    "Set Problem Severity: High. Enter Evidence: 12% scheduling errors, $380K demurrage penalties.",
                    "Set Economic Buyer: Identified. Enter Evidence: CFO Martin Lindqvist confirmed as signoff.",
                    "Set ICP Fit: Strong. Enter Evidence: Maritime vertical, 500+ employees, Northern Europe.",
                    "Switch back to Overview tab. Click 'Create Lead'.",
                ],
                "expected": (
                    "Lead is created with all five BANT qualification factors populated. "
                    "Each factor includes a rating and supporting evidence text. "
                    "Lead should reflect a high qualification score."
                ),
            },
            {
                "title": "Edit Lead — Promote Job Title",
                "category": "Record Editing",
                "steps": [
                    "Create lead: Elena Voronova, Baltic Freight Solutions, Head of Digital Transformation.",
                    "Navigate to the lead's Edit page.",
                    "Update Job Title from 'Head of Digital Transformation' to 'Chief Digital Officer'.",
                    "Click 'Update Lead'.",
                    "Verify the updated title is saved.",
                ],
                "expected": (
                    "Lead record is updated. The new job title persists after save. "
                    "No data loss on other fields."
                ),
            },
            {
                "title": "Partner Referral Lead — James Thornton",
                "category": "Referral Tracking",
                "steps": [
                    "Navigate to Leads → New Lead.",
                    "Enter: James Thornton, Thornton & Associates Legal, Managing Partner.",
                    "Enter Source: Partner Referral — Deloitte.",
                    "Enter Territory: Northeast US.",
                    "Click 'Create Lead'.",
                    "Verify the lead and its source value via search.",
                ],
                "expected": (
                    "Lead is created with 'Partner Referral — Deloitte' as the source. "
                    "The referral attribution is accurately stored and visible."
                ),
            },
            {
                "title": "Bulk Lead Creation — Three Regions",
                "category": "Bulk Operations",
                "steps": [
                    "Create three leads: Kenji Watanabe (Sakura Industrial Systems, Trade Show), "
                    "Claire Dubois (Lumière Design Studio, Website Inquiry), "
                    "Marcus Okonkwo (Sahel AgriTech Ventures, Cold Outreach).",
                    "Search for each lead by last name.",
                ],
                "expected": (
                    "All three leads are created successfully. Each is discoverable by last name search. "
                    "Source attribution is correct for each."
                ),
            },
            {
                "title": "Leads List Page Renders",
                "category": "List Page",
                "steps": [
                    "Navigate to the Leads list page.",
                    "Wait for the page to fully render.",
                    "Verify lead pipeline or workspace view is displayed.",
                ],
                "expected": (
                    "The leads list page loads without errors. Lead records or pipeline view "
                    "is visible with data."
                ),
            },
            {
                "title": "Quick-Add Lead — Juniper Wealth Management",
                "category": "Command Palette",
                "steps": [
                    "From any page, open the Command Palette (top bar).",
                    "Select 'Create New Lead'.",
                    "In the quick-add dialog, enter: Juniper Wealth Management.",
                    "Click 'Create'.",
                    "Verify the lead was created by searching.",
                ],
                "expected": (
                    "The quick-add dialog opens. Lead is created with the provided name. "
                    "The dialog closes and the lead is findable in the system."
                ),
            },
        ],
    },
    # ── OPPORTUNITIES ────────────────────────────────────────────────
    {
        "key": "opportunities",
        "title": "Opportunities Module — UAT",
        "subtitle": "User Acceptance Testing for deal creation, pipeline stages, commercial details, and opportunity management.",
        "purpose": (
            "Validate that authorized users can create and manage sales opportunities (deals) "
            "with commercial details including amount, stage, close date, and description. "
            "Confirm that pipeline stages render correctly and that deal records can be edited."
        ),
        "scope": (
            "This document covers opportunity creation with full commercial details, pipeline stage "
            "selection (Proposal, Discovery, Negotiation), deal amount entry, close date setting, "
            "list page rendering, and deal editing."
        ),
        "preconditions": [
            "User is logged in with an account that has Opportunity Management permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "Pipeline stages are configured (Discovery, Proposal, Negotiation, etc.).",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Create Deal — Cascadia Fleet Management Platform",
                "category": "Deal Creation",
                "steps": [
                    "Navigate to Opportunities → New Opportunity.",
                    "Enter Deal Name: Cascadia Fleet Management Platform.",
                    "Select Stage: Proposal.",
                    "Enter Amount: $475,000.",
                    "Set Close Date: 90 days from today.",
                    "Enter Description: Fleet monitoring and route optimization for 340 vehicles across 12 depots.",
                    "Click 'Save Deal'.",
                    "Verify the deal appears in search.",
                ],
                "expected": (
                    "Opportunity is created with all commercial details. Amount, stage, and close date "
                    "are accurately persisted. Deal appears in the pipeline."
                ),
            },
            {
                "title": "Verify Deal Edit Page — Nordic Maritime Expansion",
                "category": "Record Display",
                "steps": [
                    "Create deal: Nordic Maritime Expansion, $610,000, Negotiation stage.",
                    "Navigate to the deal's edit page.",
                    "Verify the deal name is pre-filled correctly.",
                    "Verify the amount and stage are displayed.",
                ],
                "expected": (
                    "Deal details load correctly on the edit page. Name field shows the correct value. "
                    "All commercial fields are pre-populated from the saved record."
                ),
            },
            {
                "title": "Opportunities Pipeline Renders",
                "category": "List Page",
                "steps": [
                    "Navigate to the Opportunities list page.",
                    "Wait for the page to fully render.",
                    "Verify the pipeline or workspace view is displayed.",
                ],
                "expected": (
                    "The opportunities list page loads without errors. Pipeline view or table "
                    "is visible with deal records."
                ),
            },
            {
                "title": "Create Discovery-Stage Deal — Horizon Pharma Clinical Trials",
                "category": "Pipeline Stage",
                "steps": [
                    "Navigate to Opportunities → New Opportunity.",
                    "Enter Deal Name: Horizon Pharma Clinical Trials Portal.",
                    "Select Stage: Discovery.",
                    "Enter Amount: $195,000.",
                    "Set Close Date: 120 days from today.",
                    "Enter Description: Patient enrollment and trial management portal for oncology research.",
                    "Click 'Save Deal'.",
                ],
                "expected": (
                    "Opportunity is created in the Discovery stage. All fields are saved correctly. "
                    "Deal appears in the appropriate pipeline column or filter."
                ),
            },
        ],
    },
    # ── ACTIVITIES ───────────────────────────────────────────────────
    {
        "key": "activities",
        "title": "Activities Module — UAT",
        "subtitle": "User Acceptance Testing for activity logging (calls, meetings), next steps, and activity tracking.",
        "purpose": (
            "Validate that authorized users can log sales activities including calls and meetings, "
            "record outcomes, set follow-up next steps with due dates, and manage the activity feed. "
            "Confirm that quick-add and list page features work correctly."
        ),
        "scope": (
            "This document covers: call activity creation with outcome notes and next-step scheduling, "
            "meeting activity creation with detailed outcomes, command-palette quick-add, "
            "and activity list page rendering."
        ),
        "preconditions": [
            "User is logged in with an account that has Activity Management permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "Activity types (Call, Meeting, etc.) are configured.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Log Call — Q3 Pipeline Review with Cascadia Renewables",
                "category": "Call Activity",
                "steps": [
                    "Navigate to Activities → New Activity.",
                    "Enter Subject: Q3 Pipeline Review — Cascadia Renewables.",
                    "Select Type: Call.",
                    "Enter Outcome: David Chen confirmed budget approval by August 15th. Requested maritime reference customer.",
                    "Enter Next Step Subject: Schedule demo with Henrik Larsen.",
                    "Set Next Step Due Date: 7 days from today.",
                    "Click 'Create Activity'.",
                    "Verify the activity appears in search.",
                ],
                "expected": (
                    "Activity is created with call type, outcome, and next step. "
                    "Due date is set correctly. Activity is searchable by subject keywords."
                ),
            },
            {
                "title": "Quick-Add Activity via Command Palette",
                "category": "Command Palette",
                "steps": [
                    "From any page, open the Command Palette (top bar).",
                    "Look for an Activity creation option.",
                    "If available, select it and enter: Follow-up — Horizon Pharma Discovery.",
                    "Click 'Create'.",
                ],
                "expected": (
                    "If the Activity quick-add option exists in the command palette, an activity "
                    "is created. If not available, this test is marked as N/A."
                ),
            },
            {
                "title": "Activities List Page Renders",
                "category": "List Page",
                "steps": [
                    "Navigate to the Activities list page.",
                    "Wait for the page to fully render.",
                    "Verify the activity feed or workspace view is displayed.",
                ],
                "expected": (
                    "The activities list page loads without errors. Activity records "
                    "are visible in the feed or table view."
                ),
            },
            {
                "title": "Log Meeting — Joint Architecture Workshop, Nordic Maritime",
                "category": "Meeting Activity",
                "steps": [
                    "Navigate to Activities → New Activity.",
                    "Enter Subject: Joint Architecture Workshop — Nordic Maritime.",
                    "Select Type: Meeting.",
                    "Enter Outcome: Full-day workshop at Helsinki logistics center. Mapped 8 integration points. "
                    "CFO approved €180K PoC budget. Pilot in Gothenburg Q4 2025.",
                    "Enter Next Step: Send Statement of Work for Gothenburg pilot.",
                    "Set Next Step Due Date: 5 days from today.",
                    "Click 'Create Activity'.",
                ],
                "expected": (
                    "Meeting activity is created with detailed outcome notes. "
                    "Next step and due date are recorded. Activity type shows as 'Meeting'."
                ),
            },
        ],
    },
    # ── HELPDESK ─────────────────────────────────────────────────────
    {
        "key": "helpdesk",
        "title": "Helpdesk Module — UAT",
        "subtitle": "User Acceptance Testing for support case creation, categorization, priority management, and case listing.",
        "purpose": (
            "Validate that authorized users can create, categorize, and manage helpdesk support cases. "
            "Confirm that priority and severity fields work correctly, that cases appear on the list page, "
            "and that the system supports different case types (billing, IT, feature requests)."
        ),
        "scope": (
            "This document covers: support case creation via the UI form, category and subcategory selection, "
            "priority and severity assignment, list page rendering, and creation of different case types."
        ),
        "preconditions": [
            "User is logged in with an account that has Helpdesk permissions.",
            "The CRM application is accessible at the designated environment URL.",
            "Helpdesk categories, priorities, and severity levels are configured.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Create Case — Invoice Discrepancy, Cascadia PO-2025-4417",
                "category": "Billing Case",
                "steps": [
                    "Navigate to Helpdesk → New Case.",
                    "Enter Subject: Invoice Discrepancy — Cascadia PO-2025-4417.",
                    "Select Category: Billing.",
                    "Select Subcategory: Invoice.",
                    "Select Source: Email.",
                    "Select Priority: High.",
                    "Select Severity: Major.",
                    "Enter Description: $12,400 discrepancy between contracted rate and billed amount. "
                    "Finance requires corrected invoice by end of business Friday.",
                    "Click 'Save'.",
                ],
                "expected": (
                    "Helpdesk case is created with billing category and high priority. "
                    "All classification fields are saved. Case appears on the helpdesk list."
                ),
            },
            {
                "title": "Verify Case on List Page — System Access Request",
                "category": "Case Visibility",
                "steps": [
                    "Create a case: System Access Request — New Hire Onboarding.",
                    "Category: IT Support. Priority: Medium.",
                    "Description: Provision CRM access for new BDM Maria Santos with standard role.",
                    "Navigate to the Helpdesk list page.",
                    "Verify the case is visible.",
                ],
                "expected": (
                    "Case is created and appears on the helpdesk list page. "
                    "Case subject, priority, and category are displayed correctly."
                ),
            },
            {
                "title": "Helpdesk List Page Renders",
                "category": "List Page",
                "steps": [
                    "Navigate to the Helpdesk list page.",
                    "Wait for the page to fully render.",
                    "Verify helpdesk cases or workspace view is displayed.",
                ],
                "expected": (
                    "The helpdesk list page loads without errors. "
                    "Cases are visible in the table or card view."
                ),
            },
            {
                "title": "Create Low-Priority Feature Request",
                "category": "Feature Request",
                "steps": [
                    "Navigate to Helpdesk → New Case.",
                    "Enter Subject: Feature Request — Bulk Export Contacts to CSV.",
                    "Select Category: Feature Request.",
                    "Select Source: Internal.",
                    "Select Priority: Low.",
                    "Select Severity: Minor.",
                    "Enter Description: Sales ops team needs bulk export for quarterly territory re-alignment, "
                    "200+ contacts. CSV or Excel format acceptable.",
                    "Click 'Save'.",
                ],
                "expected": (
                    "Low-priority feature request is created with correct categorization. "
                    "Priority 'Low' and Severity 'Minor' are saved accurately."
                ),
            },
        ],
    },
    # ── SETTINGS ─────────────────────────────────────────────────────
    {
        "key": "settings",
        "title": "Settings & Administration — UAT",
        "subtitle": "User Acceptance Testing for workspace configuration, user management, roles, and system administration.",
        "purpose": (
            "Validate that administrative users can access and configure all CRM settings pages, "
            "including workspace settings, approval thresholds, user directory, roles and permissions, "
            "lead assignment rules, qualification policies, opportunity automation, notification preferences, "
            "audit logging, and marketing configuration."
        ),
        "scope": (
            "This document covers page-load verification for 13 settings areas plus one "
            "functional test (updating SLA hours). These tests confirm that settings pages "
            "are accessible and functional for administrator-level users."
        ),
        "preconditions": [
            "User is logged in with a System Administrator or Workspace Admin role.",
            "The CRM application is accessible at the designated environment URL.",
            "All settings modules are deployed and enabled in the current environment.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Workspace Settings Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Workspace.", "Verify page content loads."],
                "expected": "Workspace settings page loads and displays configuration options.",
            },
            {
                "title": "Approval Settings Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Approvals.", "Verify page content loads."],
                "expected": "Approval settings page loads with threshold configuration visible.",
            },
            {
                "title": "Users Directory Page Loads",
                "category": "User Management",
                "steps": ["Navigate to Settings → Users.", "Verify page content loads."],
                "expected": "User directory page loads and displays team member list.",
            },
            {
                "title": "Roles Management Page Loads",
                "category": "Role Management",
                "steps": ["Navigate to Settings → Roles.", "Verify page content loads."],
                "expected": "Roles page loads with role list and permission configuration visible.",
            },
            {
                "title": "Lead Assignment Rules Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Lead Assignment.", "Verify page content loads."],
                "expected": "Lead assignment rules page loads with routing configuration visible.",
            },
            {
                "title": "Qualification Policy Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Qualification Policy.", "Verify page content loads."],
                "expected": "Qualification policy page loads with criteria settings visible.",
            },
            {
                "title": "Opportunity Automation Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Opportunity Automation.", "Verify page content loads."],
                "expected": "Opportunity automation page loads with pipeline/stage settings visible.",
            },
            {
                "title": "Notifications Settings Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Notifications.", "Verify page content loads."],
                "expected": "Notification settings page loads with alert configuration visible.",
            },
            {
                "title": "Audit Log Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Audit Log.", "Verify page content loads."],
                "expected": "Audit log page loads with event history or log entries visible.",
            },
            {
                "title": "Update Lead First-Touch SLA Hours",
                "category": "Functional Test",
                "steps": [
                    "Navigate to Settings → Workspace.",
                    "Locate the 'Lead First-Touch SLA Hours' field.",
                    "Change the value to 4 hours.",
                    "Click 'Save Settings'.",
                    "Verify the setting is saved successfully.",
                ],
                "expected": (
                    "SLA hours value is updated to 4. A save confirmation is displayed. "
                    "Reloading the page shows the updated value."
                ),
            },
            {
                "title": "Security Levels Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Security Levels.", "Verify page content loads."],
                "expected": "Security levels page loads with access level configuration visible.",
            },
            {
                "title": "Dashboard Packs Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Dashboard Packs.", "Verify page content loads."],
                "expected": "Dashboard packs page loads with widget/pack configuration visible.",
            },
            {
                "title": "Qualification Thresholds Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Qualification Thresholds.", "Verify page content loads."],
                "expected": "Qualification thresholds page loads with score settings visible.",
            },
            {
                "title": "Marketing Settings Page Loads",
                "category": "Settings Access",
                "steps": ["Navigate to Settings → Marketing.", "Verify page content loads."],
                "expected": "Marketing settings page loads with campaign/email settings visible.",
            },
        ],
    },
    # ── NAVIGATION & DASHBOARD ───────────────────────────────────────
    {
        "key": "navigation",
        "title": "Navigation & Dashboard — UAT",
        "subtitle": "User Acceptance Testing for dashboard rendering, module navigation, and system-wide page accessibility.",
        "purpose": (
            "Validate that the main dashboard loads correctly with widgets and metrics, "
            "and that all primary CRM modules are accessible via navigation without errors. "
            "Confirm no blank screens or critical JavaScript errors occur during module navigation."
        ),
        "scope": (
            "This document covers: main dashboard widget rendering and navigation across all "
            "8 primary CRM modules (Dashboard, Customers, Contacts, Leads, Opportunities, "
            "Activities, Helpdesk, Settings)."
        ),
        "preconditions": [
            "User is logged in with an account that has access to all CRM modules.",
            "The CRM application is accessible at the designated environment URL.",
            "All modules are deployed and enabled.",
            "Browser is Google Chrome (latest stable) or Microsoft Edge.",
        ],
        "cases": [
            {
                "title": "Dashboard Loads with Widgets",
                "category": "Dashboard",
                "steps": [
                    "Navigate to the Dashboard page.",
                    "Wait for the page to fully render (2–3 seconds).",
                    "Verify that dashboard widgets, metrics, or overview content is displayed.",
                ],
                "expected": (
                    "Dashboard page loads without errors. Widgets or metric cards are visible. "
                    "No blank screen or loading spinner stuck indefinitely."
                ),
            },
            {
                "title": "All CRM Modules Load Without Errors",
                "category": "Navigation",
                "steps": [
                    "Navigate to each of the following pages and verify content renders:",
                    "1. Dashboard",
                    "2. Customers",
                    "3. Contacts",
                    "4. Leads",
                    "5. Opportunities",
                    "6. Activities",
                    "7. Helpdesk",
                    "8. Settings → Workspace",
                    "For each page, confirm no blank screen or critical errors in the browser console.",
                ],
                "expected": (
                    "All 8 modules load successfully. Each page renders meaningful content. "
                    "No critical JavaScript errors. No blank screens. "
                    "Navigation between modules is smooth with no broken routes."
                ),
            },
        ],
    },
]


# ══════════════════════════════════════════════════════════════════════
#  MAIN — Generate one PDF per module
# ══════════════════════════════════════════════════════════════════════

def main():
    root = Path(__file__).resolve().parent.parent
    out_dir = root / "output" / "pdf" / "uat"
    out_dir.mkdir(parents=True, exist_ok=True)

    s = _styles()

    for mod in MODULES:
        filename = f"UAT_{mod['key'].title()}_Module.pdf"
        filepath = out_dir / filename
        doc = _build_doc(filepath, mod["title"].split("—")[0].strip())
        story = _build_story(mod, s)
        doc.build(story)
        print(f"  ✓  {filename}")

    print(f"\n  {len(MODULES)} PDFs generated in: {out_dir}\n")


if __name__ == "__main__":
    main()
