#!/usr/bin/env python3
"""
North Edge CRM – Competitive Audit & Technology Benchmark Report
Generates a professional PDF with all audit findings.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os
from datetime import datetime

# ── Color Palette ──
PRIMARY = HexColor("#667eea")
PRIMARY_DARK = HexColor("#4f46e5")
SECONDARY = HexColor("#764ba2")
CYAN = HexColor("#06b6d4")
SUCCESS = HexColor("#22c55e")
WARNING = HexColor("#f59e0b")
DANGER = HexColor("#ef4444")
GRAY_50 = HexColor("#f9fafb")
GRAY_100 = HexColor("#f3f4f6")
GRAY_200 = HexColor("#e5e7eb")
GRAY_300 = HexColor("#d1d5db")
GRAY_500 = HexColor("#6b7280")
GRAY_700 = HexColor("#374151")
GRAY_800 = HexColor("#1f2937")
GRAY_900 = HexColor("#111827")
BG_HEADER = HexColor("#f0f7ff")
BLUE_500 = HexColor("#3b82f6")
ORANGE = HexColor("#f97316")
PURPLE = HexColor("#a855f7")

# ── Document Version ──
DOC_VERSION = "2.0"
DOC_DATE = "February 28, 2026"
REVISION_HISTORY = [
    ["Version", "Date", "Author", "Changes"],
    ["1.0", "February 11, 2026", "Engineering", "Initial competitive audit — 35 pages, 160 endpoints, 38 entities, 15 differentiators, 17 gaps"],
    ["2.0", "February 28, 2026", "Engineering", "Deep code re-audit — corrected to 47 pages, 199 endpoints, 83 entities, 20 differentiators, "
     "15 gaps. Added: Campaign Mgmt (was Missing→Full), SignalR status (was 2/10→5/10), "
     "AI Deep-Dive section, 5 new differentiators, revised roadmap & recommendations"],
]

# ── Output path ──
OUTPUT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "docs", "North_Edge_CRM_Competitive_Audit_Report.pdf")


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=GRAY_900,
        alignment=TA_LEFT,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Helvetica',
        fontSize=16,
        leading=22,
        textColor=PRIMARY,
        alignment=TA_LEFT,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name='CoverDate',
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=GRAY_500,
        alignment=TA_LEFT,
        spaceAfter=20,
    ))
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=24,
        textColor=PRIMARY_DARK,
        spaceBefore=20,
        spaceAfter=10,
        borderPadding=(0, 0, 4, 0),
    ))
    styles.add(ParagraphStyle(
        name='SubSection',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=18,
        textColor=GRAY_800,
        spaceBefore=14,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='BodyText2',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=GRAY_700,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name='BulletItem',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=GRAY_700,
        leftIndent=16,
        bulletIndent=6,
        spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=BLUE_500,
        alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=GRAY_700,
        alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name='TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=GRAY_800,
        alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name='FooterText',
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=GRAY_500,
        alignment=TA_CENTER,
    ))
    styles.add(ParagraphStyle(
        name='TierLabel',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=white,
    ))
    styles.add(ParagraphStyle(
        name='SmallNote',
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=GRAY_500,
        spaceAfter=4,
    ))
    return styles


class GradientBar(Flowable):
    """Horizontal gradient bar."""
    def __init__(self, width, height=3, color1=PRIMARY, color2=SECONDARY):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color1 = color1
        self.color2 = color2

    def draw(self):
        steps = 100
        step_w = self.width / steps
        for i in range(steps):
            r = self.color1.red + (self.color2.red - self.color1.red) * i / steps
            g = self.color1.green + (self.color2.green - self.color1.green) * i / steps
            b = self.color1.blue + (self.color2.blue - self.color1.blue) * i / steps
            self.canv.setFillColorRGB(r, g, b)
            self.canv.rect(i * step_w, 0, step_w + 0.5, self.height, fill=1, stroke=0)


def make_table(data, col_widths=None, header_bg=BG_HEADER):
    """Build a styled table from list-of-lists."""
    style_commands = [
        ('BACKGROUND', (0, 0), (-1, 0), header_bg),
        ('TEXTCOLOR', (0, 0), (-1, 0), BLUE_500),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('LEADING', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 1), (-1, -1), GRAY_700),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.4, GRAY_200),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, GRAY_50]),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]
    tbl = Table(data, colWidths=col_widths, repeatRows=1)
    tbl.setStyle(TableStyle(style_commands))
    return tbl


def add_page_number(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.setFillColor(GRAY_500)
    canvas_obj.drawCentredString(
        A4[0] / 2, 15 * mm,
        f"North Edge CRM  |  v{DOC_VERSION}  |  Page {doc.page}  |  {DOC_DATE}  |  www.northedgesystem.com  |  Toronto, Canada"
    )
    canvas_obj.restoreState()


def build_pdf():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        topMargin=20 * mm,
        bottomMargin=25 * mm,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        title="North Edge CRM – Competitive Audit & Technology Benchmark Report",
        author="North Edge System",
    )
    W = doc.width
    story = []

    # ═══════════════════════════════════════════
    # COVER PAGE
    # ═══════════════════════════════════════════
    story.append(Spacer(1, 50 * mm))
    story.append(GradientBar(W, 4))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph("North Edge CRM", styles['CoverTitle']))
    story.append(Paragraph("Competitive Audit &<br/>Technology Benchmark Report", styles['CoverSubtitle']))
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph(f"Version {DOC_VERSION}  •  {DOC_DATE}", styles['CoverDate']))
    story.append(Paragraph("North Edge System  •  Toronto, Canada  •  www.northedgesystem.com", styles['CoverDate']))
    story.append(Paragraph("Classification: Internal – Engineering & Product", styles['CoverDate']))
    story.append(Spacer(1, 20 * mm))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 10 * mm))

    cover_points = [
        "Deep code-level CRM capability audit (43K+ backend LOC, 41K+ frontend LOC analysed)",
        "Competitive benchmarking against Top 8 CRM platforms",
        "Technology stack comparison and maturity scoring",
        "Functional feature roadmap: NOW / NEXT / LATER",
        "20 unique differentiators and 15 gap areas identified",
        "AI capabilities deep-dive: RAG, 3-tier scoring, action orchestration, campaign AI",
        "Real-time infrastructure audit: SignalR hubs, event broadcasting, presence tracking",
    ]
    for pt in cover_points:
        story.append(Paragraph(f"•  {pt}", styles['BulletItem']))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # TABLE OF CONTENTS
    # ═══════════════════════════════════════════
    story.append(Paragraph("Table of Contents", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 6 * mm))
    toc_items = [
        ("1.", "Executive Summary"),
        ("2.", "CRM Capability Inventory"),
        ("3.", "Feature Maturity Summary"),
        ("4.", "Unique Differentiators (20)"),
        ("5.", "Competitive Positioning vs. Top Leaders"),
        ("6.", "Technology Stack Benchmarks"),
        ("7.", "Stack Maturity Scorecard"),
        ("8.", "Feature Gaps (15)"),
        ("9.", "Functional Roadmap: NOW / NEXT / LATER"),
        ("10.", "Dependency Chain"),
        ("11.", "Immediate Competitors"),
        ("12.", "Real-Time Capabilities Analysis"),
        ("13.", "SignalR Implementation Status"),
        ("14.", "AI Capabilities Deep-Dive"),
        ("15.", "Recommendations"),
    ]
    for num, title in toc_items:
        story.append(Paragraph(f"<b>{num}</b>  {title}", styles['BodyText2']))
    story.append(Spacer(1, 10 * mm))

    # ── REVISION HISTORY ──
    story.append(Paragraph("Document Revision History", styles['SubSection']))
    story.append(Spacer(1, 3 * mm))
    story.append(make_table(REVISION_HISTORY, col_widths=[W * 0.08, W * 0.16, W * 0.12, W * 0.64]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        f"<b>Current version: {DOC_VERSION}</b> — This document supersedes all previous versions.",
        styles['SmallNote']
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 1. EXECUTIVE SUMMARY
    # ═══════════════════════════════════════════
    story.append(Paragraph("1. Executive Summary", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "North Edge CRM is an Angular 21 + .NET Clean Architecture platform with 47 page components, "
        "38 backend API controllers (199 endpoints), 83 domain entities, 7 AI/ML service implementations, "
        "and a full campaign management system with AI-powered recommendations. "
        "The system features a proprietary CQVS lead scoring framework, a 3-tier AI fallback chain "
        "(Azure OpenAI → OpenAI → Rule-based), an AI assistant with RAG knowledge retrieval (Azure AI Search + Foundry Agent), "
        "a full Decision Engine with multi-step approval chains and SLA auto-escalation, "
        "campaign attribution with explainability, and a drag-and-drop dashboard with 18 widget types. "
        "The backend totals 43,015 lines of C# and the frontend comprises ~41,218 lines of TypeScript "
        "and ~47,847 lines of SCSS.",
        styles['BodyText2']
    ))
    story.append(Paragraph(
        "The platform sits in <b>Upper Tier 2</b> — more advanced than basic CRMs (Pipedrive, Monday, Capsule) "
        "with unique AI capabilities that rival Tier 1 features. Since the prior audit, "
        "Campaign Management and SignalR real-time infrastructure have been implemented. "
        "Key remaining gaps are: Report Builder, Bidirectional Email, Product/Price Book, Quote/CPQ, "
        "and Marketing Automation (nurture/drip). "
        "Direct competitors are <b>SugarCRM, Freshsales, and Zoho CRM</b>.",
        styles['BodyText2']
    ))
    story.append(Spacer(1, 4 * mm))

    # ═══════════════════════════════════════════
    # 2. CRM CAPABILITY INVENTORY
    # ═══════════════════════════════════════════
    story.append(Paragraph("2. CRM Capability Inventory", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    inv_data = [
        ['Dimension', 'Count', 'Detail'],
        ['Frontend Page Components', '47', '2,532 LOC dashboard, 2,610 LOC lead form'],
        ['Routes (lazy-loaded)', '97', '59 CRM + 38 Supply Chain'],
        ['Backend API Controllers', '38', '32 CRM + 6 SCM'],
        ['API Endpoints', '199', 'GET 82, POST 66, PUT 23, DELETE 16, PATCH 12'],
        ['Domain Entities', '83', '56 CRM + 27 SCM'],
        ['Application Service Interfaces', '26', 'Clean Architecture layer'],
        ['Infrastructure Services', '30+', 'Including 3 lead scoring + 3 email senders'],
        ['Background Workers', '4', 'Email, Notifications, Renewals, SLA Escalation'],
        ['AI/ML Implementations', '7', 'Chat/RAG, 3× lead scoring, Foundry, Search, Campaign AI'],
        ['MediatR Handlers', '6', '2 query + 4 event handlers'],
        ['SignalR Hubs', '2', 'PresenceHub + CrmEventsHub'],
        ['Permission Keys (RBAC)', '21', '+ 3 visibility scopes (Self/Team/All)'],
        ['Dashboard Widget Types', '18', '16 cards + 2 charts'],
        ['Settings Pages', '20+', 'Roles, perms, tenants, policies, automation'],
        ['EF Core Configurations', '47', 'Entity type configs + 168 migrations'],
        ['Contract DTOs', '149', 'In 25 subdirectories'],
        ['Backend LOC', '43,015', 'C# (excl. bin/obj/Migrations)'],
        ['Frontend TS LOC', '~41,218', 'TypeScript (excl. spec)'],
        ['Frontend SCSS LOC', '~47,847', '103 SCSS files'],
    ]
    story.append(make_table(inv_data, col_widths=[W * 0.32, W * 0.12, W * 0.56]))
    story.append(Spacer(1, 6 * mm))

    # ═══════════════════════════════════════════
    # 3. FEATURE MATURITY SUMMARY
    # ═══════════════════════════════════════════
    story.append(Paragraph("3. Feature Maturity Summary", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    mat_data = [
        ['Feature Area', 'Pages', 'Maturity', 'Key Highlights'],
        ['Dashboard', '1 (2,532 LOC)', 'Full', '18 widgets, DnD, AI orchestration, forecast, coaching, manager health'],
        ['Customers', '2', 'Full', 'CRUD, bulk actions, CSV import, lifecycle/owner filters, metric cards'],
        ['Contacts', '2', 'Full', 'Full CRUD, CSV import, bulk assign/lifecycle, tabbed detail'],
        ['Leads', '3 (2,610 LOC form)', 'Full', 'CQVS scoring, 3-tier AI, cadence, conversion, duplicate check, import'],
        ['Opportunities', '7', 'Full', 'Stage mgmt, approvals, onboarding, review checklist, team, expansion'],
        ['Activities', '2', 'Full', 'Table/calendar/tasks views, type/status filters, overdue tracking'],
        ['Decision Engine', '5', 'Full', 'Inbox, multi-step chains, AI draft, SLA escalation, delegation, audit'],
        ['Marketing & Campaigns', '4 + 13 API', 'Full', 'CRUD, attribution with explainability, AI recommendations, health scoring'],
        ['Settings', '20+', 'Full', 'Users, roles, perms, tenants, automation, qualification, dashboard packs'],
        ['AI Assistant', 'Integrated', 'Full', 'Chat + RAG (AI Search + Foundry), action exec, undo (60s), risk tiers'],
        ['Auth & Security', '4 public pages', 'Full', 'JWT, RBAC (21 perms), invite flow, password reset, visibility scopes'],
        ['Multi-Tenancy', 'Core infra', 'Full', 'Per-tenant policies, provisioning, feature gating, dashboard defaults'],
        ['Real-Time', '2 SignalR hubs', 'Partial', 'Presence + CRM events, worker broadcasts, tenant/user scoped'],
        ['Automation', '4 workers', 'Full', 'Renewal, SLA escalation, email queue, notification alerts (3 types)'],
    ]
    story.append(make_table(mat_data, col_widths=[W * 0.16, W * 0.13, W * 0.08, W * 0.63]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 4. UNIQUE DIFFERENTIATORS
    # ═══════════════════════════════════════════
    story.append(Paragraph("4. Unique Differentiators (20)", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "These are capabilities that most competitors either lack entirely or implement at a basic level:",
        styles['BodyText2']
    ))

    diff_data = [
        ['#', 'Differentiator', 'Description'],
        ['1', 'CQVS Lead Scoring Framework', 'Proprietary 6-factor model (Budget, Readiness, Timeline, Problem Severity, Economic Buyer, ICP Fit) with 21 configurable evidence sources'],
        ['2', '3-Tier AI Lead Scoring', 'Azure OpenAI → OpenAI → Rule-based automatic fallback. No competitor has multi-provider resilience'],
        ['3', 'AI Execution Orchestration', 'Priority-scored action table with risk/urgency tiers and 60-second undo window on dashboard'],
        ['4', 'AI Chat + RAG + Action Execution', 'Foundry Agent with Azure AI Search grounding, executes CRM actions with risk gating, review workflow, and undo'],
        ['5', 'Cost-of-Not-Knowing Metric', 'Risk-weighted intelligence gap trend — unique KPI measuring data quality cost per deal'],
        ['6', 'Truth Metrics Widget', 'Dashboard widget surfaces data integrity and confidence scoring across the pipeline'],
        ['7', 'Confidence-Weighted Pipeline', 'Trust-scored deal values — no competitor weights pipeline by data quality confidence'],
        ['8', 'Decision Engine + SLA Escalation', 'Multi-step approval chains with background worker auto-escalation, delegation, AI assist drafts'],
        ['9', 'Expansion Signal Detection', 'Automated upsell/cross-sell identification from opportunity patterns with dedicated API'],
        ['10', 'Renewal Automation Worker', 'Background service auto-creates renewal opportunities before contract expiry, runs every 12h'],
        ['11', 'Qualification Policy Engine', 'Per-tenant rules with contextual threshold modifiers per deal type × segment × stage'],
        ['12', 'DnD Dashboard (18 widgets)', 'More widget types than most Tier 2 dashboards with CDK drag-and-drop reordering + chart toggles'],
        ['13', 'Manager Pipeline Health View', 'Coaching-oriented pipeline view with team performance overlay and truth gap detection'],
        ['14', 'Priority Stream', 'Unified cross-entity feed combining leads, opportunities, activities in priority order with filtering'],
        ['15', 'Lead Cadence Tracking', 'Evidence-source tracking with buyer engagement cadence scoring and SLA breach alerts'],
        ['16', 'Campaign Attribution + Explainability', 'First-touch attribution model with evidence trail, candidate listing, and full explainability UI'],
        ['17', 'Campaign AI Recommendations', 'Rule-based recommendations with confidence, impact estimates, evidence, accept/dismiss/snooze workflow'],
        ['18', 'Campaign Health Scoring', 'Composite 0-100 health score with trend tracking, reason chips, and historical snapshots'],
        ['19', 'SignalR Real-Time Broadcasting', 'All 4 workers publish events via SignalR to tenant + user channels; live presence tracking'],
        ['20', 'Tenant Feature Gating', 'Per-tenant module toggle (e.g., supply chain, marketing) with route-level guard and disabled page'],
    ]
    story.append(make_table(diff_data, col_widths=[W * 0.04, W * 0.26, W * 0.70]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 5. COMPETITIVE POSITIONING
    # ═══════════════════════════════════════════
    story.append(Paragraph("5. Competitive Positioning vs. Top Leaders", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    comp_header = ['Capability', 'North Edge', 'Salesforce', 'HubSpot', 'Dynamics', 'Zoho', 'Freshsales', 'SugarCRM', 'Pipedrive']
    comp_rows = [
        comp_header,
        ['Contact/Account Mgmt', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full'],
        ['Lead Mgmt & Scoring', 'Full + AI', 'Full + AI', 'Full + AI', 'Full + AI', 'Full', 'Full + AI', 'Full', 'Basic'],
        ['Opportunity/Pipeline', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full'],
        ['AI Lead Scoring', '3-tier fallback', 'Einstein', 'Predictive', 'Copilot', 'Zia', 'Freddy', 'SugarPredict', '—'],
        ['AI Chat Assistant', 'Full + Actions', 'Einstein GPT', 'ChatSpot', 'Copilot', 'Zia', 'Freddy', '—', 'AI assistant'],
        ['AI Action Exec + Undo', 'Yes (60s)', 'Partial', 'No', 'Partial', 'No', 'No', 'No', 'No'],
        ['Decision/Approval Engine', 'Full + SLA', 'Full', 'Basic', 'Full', 'Partial', 'No', 'Full', 'No'],
        ['Dashboard Customization', '18 widgets+DnD', 'Full', 'Full', 'Full', 'Full', 'Basic', 'Basic', 'Basic'],
        ['RBAC (Granular)', '21 perms', 'Full', 'Tiered', 'Full', 'Full', 'Basic', 'Full', 'Basic'],
        ['Multi-Tenancy', 'Full', 'Full', 'No', 'Full', 'Full', 'No', 'Partial', 'No'],
        ['CSV Import/Export', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full'],
        ['Audit Trail', 'Full', 'Full', 'Partial', 'Full', 'Full', 'Basic', 'Full', 'No'],
        ['Email Integration', 'Outbound', 'Full (bi)', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full'],
        ['Campaign Management', 'Missing', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Basic'],
        ['Marketing Automation', 'Missing', 'Pardot', 'Full', 'Full', 'Full', 'Full', 'Partial', 'No'],
        ['Quote/CPQ', 'Missing', 'Full', 'Full', 'Full', 'Full', 'No', 'Full', 'Basic'],
        ['Report Builder', 'Missing', 'Full', 'Full', 'Full', 'Full', 'Basic', 'Full', 'Basic'],
        ['Web-to-Lead Forms', 'Missing', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full', 'Full'],
        ['Mobile Native', 'Responsive', 'App', 'App', 'App', 'App', 'App', 'App', 'App'],
    ]
    cw = W / 9
    story.append(make_table(comp_rows, col_widths=[cw * 1.4] + [cw * 0.95] * 8))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 6. TECHNOLOGY STACK BENCHMARKS
    # ═══════════════════════════════════════════
    story.append(Paragraph("6. Technology Stack Benchmarks", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    tech_data = [
        ['Dimension', 'North Edge', 'Salesforce', 'HubSpot', 'Dynamics 365', 'Zoho', 'Freshsales', 'SugarCRM'],
        ['Frontend', 'Angular 21', 'Aura/LWC', 'React', 'React+Fluent', 'Proprietary', 'React', 'Backbone'],
        ['UI Library', 'PrimeNG 21', 'Lightning DS', 'Custom', 'Fluent UI', 'Custom', 'Custom', 'Custom'],
        ['State Mgmt', 'Signals', 'LDS', 'Redux', 'Redux/Zustand', 'Custom', 'Redux', 'Backbone'],
        ['Backend', 'C# (.NET)', 'Java/Apex', 'Java+Node', 'C# (.NET)', 'Java', 'Ruby+Go', 'PHP'],
        ['Architecture', 'Clean (4-layer)', 'MVC+Platform', 'Microservices', 'CQRS+Micro', 'Mono→Micro', 'Mono→Micro', 'MVC'],
        ['Database', 'SQL Server/EF', 'Oracle+Propr.', 'MySQL+HBase', 'SQL+Dataverse', 'PostgreSQL', 'PostgreSQL', 'MySQL'],
        ['Auth', 'JWT+RBAC', 'OAuth+SAML+SSO', 'OAuth+SSO', 'AzureAD+RBAC', 'OAuth+SSO', 'OAuth+SSO', 'OAuth+SAML'],
        ['AI Runtime', 'AzureOAI+OAI+Rules', 'Einstein GPT', 'ChatSpot/OAI', 'AzureOAI/Copilot', 'Zia', 'Freddy AI', 'SugarPredict'],
        ['AI Resilience', '3-tier fallback', 'Single', 'Single', 'Single+fallback', 'Single', 'Single', 'Single'],
        ['RAG/Knowledge', 'AI Search+Foundry', 'Data Cloud', 'Knowledge Base', 'Copilot Studio', '—', '—', '—'],
        ['Background Jobs', '4 Hosted Svc', 'Batch Apex', 'Sidekiq+Kafka', 'AzFunc+SvcBus', 'Custom', 'Sidekiq', 'Cron'],
        ['Message Bus', 'Azure Svc Bus', 'Platform Events', 'Kafka', 'Azure Svc Bus', 'Custom', 'RabbitMQ', '—'],
        ['Email Service', 'Graph+ACS', 'SF Email', 'SendGrid', 'Exchange+Graph', 'Custom SMTP', 'SendGrid', 'Custom'],
        ['Hosting', 'Azure SWA+AppSvc', 'SF Cloud', 'AWS', 'Azure Cloud', 'Proprietary DC', 'AWS', 'AWS/On-prem'],
        ['Multi-Tenancy', 'App-level', 'Platform-native', 'Account', 'Dataverse-native', 'Account', 'Account', 'Instance'],
        ['API Style', 'REST (199)', 'REST+SOAP+GQL', 'REST+GraphQL', 'REST+OData+GQL', 'REST+GraphQL', 'REST', 'REST+GQL'],
        ['Real-time', 'SignalR (Partial)', 'Streaming API', 'WebSockets', 'SignalR', 'Long-polling', 'WebSockets', '—'],
        ['Mobile', 'Responsive', 'iOS+Android', 'iOS+Android', 'iOS+Android+PWA', 'iOS+Android', 'iOS+Android', 'iOS+Android'],
        ['Extensibility', 'Code-level only', 'Apex+AppExch', 'WF+Marketplace', 'PowerPlat+Plugins', 'Deluge+Market', 'Marketplace', 'Logic Hooks'],
    ]
    cw7 = W / 8
    story.append(make_table(tech_data, col_widths=[cw7 * 1.3] + [cw7 * 0.957] * 7))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 7. STACK MATURITY SCORECARD
    # ═══════════════════════════════════════════
    story.append(Paragraph("7. Stack Maturity Scorecard", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    score_data = [
        ['Category', 'North Edge', 'Salesforce', 'HubSpot', 'Dynamics', 'Zoho', 'Freshsales', 'SugarCRM'],
        ['Frontend Modernity', '9/10', '7/10', '9/10', '8/10', '6/10', '8/10', '4/10'],
        ['Backend Architecture', '9/10', '8/10', '9/10', '9/10', '6/10', '7/10', '5/10'],
        ['AI Sophistication', '9/10', '9/10', '7/10', '9/10', '6/10', '7/10', '5/10'],
        ['AI Resilience (Fallback)', '10/10', '6/10', '4/10', '7/10', '4/10', '4/10', '4/10'],
        ['Database/ORM', '8/10', '8/10', '8/10', '9/10', '7/10', '8/10', '6/10'],
        ['Auth & Security', '7/10', '10/10', '8/10', '10/10', '8/10', '7/10', '7/10'],
        ['API Design', '7/10', '10/10', '9/10', '10/10', '8/10', '7/10', '7/10'],
        ['Background Processing', '8/10', '9/10', '9/10', '9/10', '6/10', '7/10', '4/10'],
        ['Extensibility', '4/10', '10/10', '8/10', '10/10', '7/10', '6/10', '6/10'],
        ['Mobile', '4/10', '9/10', '9/10', '9/10', '9/10', '9/10', '7/10'],
        ['Real-time Capabilities', '5/10', '9/10', '8/10', '9/10', '5/10', '7/10', '3/10'],
        ['Average Score', '7.3', '8.6', '8.0', '8.6', '6.5', '7.0', '5.3'],
    ]
    story.append(make_table(score_data, col_widths=[cw7 * 1.3] + [cw7 * 0.957] * 7))
    story.append(Spacer(1, 6 * mm))

    story.append(Paragraph("Stack Strengths", styles['SubSection']))
    strengths = [
        "<b>Angular 21 + PrimeNG 21</b> — Latest framework version. SugarCRM is still on Backbone (legacy).",
        "<b>Clean Architecture (4-layer)</b> — Architecturally aligned with Dynamics 365. Most Tier 2 use simpler MVC.",
        "<b>3-Tier AI Fallback (10/10)</b> — No other CRM has multi-provider AI resilience.",
        "<b>Azure Service Bus</b> — Same enterprise messaging as Dynamics 365.",
        "<b>EF Core + SQL Server</b> — Production-proven, enterprise-grade data stack.",
    ]
    for s in strengths:
        story.append(Paragraph(f"•  {s}", styles['BulletItem']))

    story.append(Paragraph("Stack Gaps", styles['SubSection']))
    gaps_tech = [
        "<b>No SSO/SAML/OAuth2 provider</b> — Blocks enterprise procurement. IT teams require SSO.",
        "<b>No GraphQL or OData</b> — REST-only limits query flexibility for integrators.",
        "<b>SignalR partial — no live record co-editing</b> — Infrastructure exists (2 hubs, worker broadcasts) but no record-level presence or live updates.",
        "<b>No native mobile app</b> — Responsive web isn't enough for field sales reps.",
        "<b>No plugin/extension system</b> — Can't build marketplace ecosystem.",
        "<b>No webhook/event system</b> — Can't push data to external systems on changes.",
    ]
    for g in gaps_tech:
        story.append(Paragraph(f"•  {g}", styles['BulletItem']))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 8. FEATURE GAPS
    # ═══════════════════════════════════════════
    story.append(Paragraph("8. Feature Gaps (15)", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    gaps_data = [
        ['Severity', 'Feature Gap', 'Details'],
        ['HIGH', 'Marketing Automation (Drip/Nurture)', 'Campaigns exist, but no automated sequences, drip workflows, or engagement scoring'],
        ['MEDIUM', 'Custom Field Mgmt UI', 'Entity exists in backend but no admin UI for self-service'],
        ['MEDIUM', 'Email Integration (Inbound)', 'Outbound only via Graph API — no inbound sync or tracking'],
        ['MEDIUM', 'Product / Price-book', 'No product catalog — opportunity value is manual entry only'],
        ['MEDIUM', 'Quote/Proposal Generation', 'No quote builder, PDF generation, or e-signature integration'],
        ['MEDIUM', 'Contract Management', 'Renewal worker exists but no formal contract entity/workflow'],
        ['MEDIUM', 'Report Builder', 'No ad-hoc report designer — dashboard only'],
        ['MEDIUM', 'Web-to-Lead Forms', 'No embeddable forms — leads are manual entry or CSV import'],
        ['LOW', 'Territory Hierarchy', 'No territory tree structure for regional access control'],
        ['LOW', 'Forecasting Targets', 'Confidence-weighted pipeline exists but no formal forecast periods'],
        ['LOW', 'Visual Workflow Builder', '4 workers are hard-coded — no drag-and-drop automation'],
        ['LOW', 'Cross-entity Dedup', 'Lead-level dedup exists — not across contacts/accounts'],
        ['LOW', 'Social Media Integration', 'No social profile enrichment or social listening'],
        ['LOW', 'Native Mobile App', 'Responsive web only — no iOS/Android native app'],
        ['LOW', 'Scheduled Reports', 'No daily/weekly email digests or report subscriptions'],
    ]
    story.append(make_table(gaps_data, col_widths=[W * 0.1, W * 0.25, W * 0.65]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 9. FUNCTIONAL ROADMAP: NOW / NEXT / LATER
    # ═══════════════════════════════════════════
    story.append(Paragraph("9. Functional Roadmap: NOW / NEXT / LATER", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    # ── NOW ──
    story.append(Paragraph("NOW (0–3 months) — Deal-Breakers That Block Sales", styles['SubSection']))
    now_data = [
        ['#', 'Feature', 'Why NOW'],
        ['N1', 'Email Integration (Bidirectional)', 'Reps can\'t work from CRM without seeing replies. All competitors have it.'],
        ['N2', 'Report Builder', 'No ad-hoc reporting = no VP/Director adoption. Table-stakes for enterprise.'],
        ['N3', 'Product & Price Book', 'Can\'t attach products to deals — opportunity value is manual-only.'],
        ['N4', 'Quote / Proposal Generation', 'Reps can\'t send quotes from CRM — forces external tools.'],
        ['N5', 'Custom Fields Management UI', 'Every competitor lets admins add fields without developers.'],
        ['N6', 'Web-to-Lead / Web Forms', 'No way to capture leads from website — manual entry only.'],
        ['N7', 'Scheduled Reports & Digests', 'Managers expect morning pipeline emails and weekly digests.'],
        ['N8', 'Webhook / Event System', 'Can\'t integrate with Slack, Teams, Zapier without webhooks.'],
    ]
    story.append(make_table(now_data, col_widths=[W * 0.05, W * 0.3, W * 0.65]))
    story.append(Spacer(1, 6 * mm))

    # ── NEXT ──
    story.append(Paragraph("NEXT (3–6 months) — Competitive Parity", styles['SubSection']))
    next_data = [
        ['#', 'Feature', 'Why NEXT'],
        ['X1', 'Marketing Automation (Nurture)', 'Campaigns exist; add drip sequences, engagement scoring, automated workflows'],
        ['X2', 'Contract Management', 'Renewal worker exists but no contract entity to renew against.'],
        ['X3', 'Territory Management', 'Enterprise orgs with 50+ reps need territory-based access.'],
        ['X4', 'Forecasting Engine', 'Confidence-weighted pipeline exists but no target-vs-actual tracking.'],
        ['X5', 'Cross-Entity Duplicate Detection', 'Lead-level dedup exists — extend to contacts/accounts.'],
        ['X6', 'Notes & Attachments System', 'No structured notes — reps need to document interactions.'],
        ['X7', 'Saved Views / List Views', 'Every table shows same view — reps need their own saved filters.'],
        ['X8', 'Inline Editing (Table)', 'Reps must open a record to change a single field.'],
        ['X9', 'Task/Reminder Automation', 'Activities exist but aren\'t auto-generated on stage changes.'],
    ]
    story.append(make_table(next_data, col_widths=[W * 0.05, W * 0.3, W * 0.65]))
    story.append(Spacer(1, 6 * mm))

    # ── LATER ──
    story.append(Paragraph("LATER (6–12 months) — Differentiation & Tier 1 Push", styles['SubSection']))
    later_data = [
        ['#', 'Feature', 'Strategic Value'],
        ['L1', 'Full Marketing Automation', 'Eliminates need for HubSpot Marketing alongside CRM.'],
        ['L2', 'Visual Workflow Builder', 'Competes with Salesforce Flow, Dynamics Power Automate.'],
        ['L3', 'Customer Portal', 'Self-service for customers — extends multi-tenancy.'],
        ['L4', 'Case / Support Ticketing', 'Expands from Sales CRM to full CRM (sales + service).'],
        ['L5', 'Plugin / Extension Framework', 'Marketplace ecosystem for partners and customers.'],
        ['L6', 'Advanced Analytics & BI', 'Cohort analysis, pivot tables, drill-down — Power BI rival.'],
        ['L7', 'Social Media Integration', 'LinkedIn/Twitter enrichment and social listening.'],
        ['L8', 'AI Conversation Intelligence', 'Call transcription, sentiment analysis, coaching insights.'],
        ['L9', 'Native Mobile App', 'iOS + Android via Capacitor/MAUI with offline support.'],
        ['L10', 'Multi-Language & Localization', 'Language packs, RTL, date/currency localization.'],
        ['L11', 'Audit & Compliance Suite', 'GDPR, data retention, field-level change history.'],
        ['L12', 'Real-Time Collaboration', 'SignalR-based live presence, updates, @mentions.'],
    ]
    story.append(make_table(later_data, col_widths=[W * 0.05, W * 0.3, W * 0.65]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 10. DEPENDENCY CHAIN
    # ═══════════════════════════════════════════
    story.append(Paragraph("10. Dependency Chain (Build Order)", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    deps = [
        "Email Integration (NOW) → Marketing Automation / Nurture (NEXT) → Full Marketing Automation (LATER)",
        "Product/Price Book (NOW) → Quote Generation (NOW) → Contract Mgmt (NEXT)",
        "Report Builder (NOW) → Scheduled Reports (NOW) → Advanced Analytics (LATER)",
        "Custom Fields UI (NOW) → Saved Views (NEXT) → Visual Workflow Builder (LATER)",
        "Webhooks (NOW) → Plugin Framework (LATER)",
        "Campaigns (EXISTS) → Nurture Sequences (NEXT) → Full Marketing Automation (LATER)",
        "Territory Mgmt (NEXT) → Forecasting Engine (NEXT)",
        "Notes System (NEXT) → Customer Portal (LATER)",
        "Case Ticketing (LATER) → Customer Portal (LATER)",
    ]
    for d in deps:
        story.append(Paragraph(f"→  {d}", styles['BulletItem']))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "<b>Critical Path:</b> Email Integration → Products → Quotes → Report Builder → Webhooks. "
        "These 5 features unblock the most downstream work and close the biggest competitive gaps. "
        "Campaign management is already built — the marketing gap is now nurture/drip automation only.",
        styles['BodyText2']
    ))
    story.append(Spacer(1, 6 * mm))

    # ═══════════════════════════════════════════
    # 11. IMMEDIATE COMPETITORS
    # ═══════════════════════════════════════════
    story.append(Paragraph("11. Immediate Competitors", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    tier_data = [
        ['Tier', 'CRMs', 'Rationale'],
        ['Tier 1 (Enterprise)', 'Salesforce, Dynamics 365, Oracle CX', 'Full platform: marketing automation, CPQ, service, analytics, marketplace'],
        ['Tier 2 Upper (YOU)', 'North Edge CRM, SugarCRM, Freshsales', 'Strong core CRM + AI + campaigns. Missing marketing automation/CPQ/reports'],
        ['Tier 2 Lower', 'Zoho, Pipedrive, Monday CRM', 'Broader ecosystem but weaker on AI/decision engine'],
        ['Tier 3 (Basic)', 'Insightly, Capsule, Less Annoying CRM', 'Basic contact/deal management only'],
    ]
    story.append(make_table(tier_data, col_widths=[W * 0.18, W * 0.35, W * 0.47]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Direct competitors are <b>SugarCRM, Freshsales, and Zoho CRM</b>. "
        "You now have campaign management with AI recommendations — stronger than SugarCRM and Freshsales on marketing. "
        "Your AI and decision-engine capabilities exceed all three. "
        "Remaining gaps vs. these competitors: email sync (inbound), quotes, report builder, and full marketing automation.",
        styles['BodyText2']
    ))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 12. REAL-TIME CAPABILITIES
    # ═══════════════════════════════════════════
    story.append(Paragraph("12. Real-Time Capabilities Analysis", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "North Edge CRM now scores <b>5/10</b> on real-time capabilities — up from 2/10 in the prior audit. "
        "Two SignalR hubs (PresenceHub + CrmEventsHub) are implemented, a SignalRCrmRealtimePublisher broadcasts "
        "tenant + user-scoped events, and all 4 background workers publish events via SignalR. "
        "Remaining gaps are live record co-editing, streaming AI chat, and full dashboard auto-refresh.",
        styles['BodyText2']
    ))

    rt_data = [
        ['Capability', 'Current Status', 'Detail'],
        ['SignalR Hubs', 'Implemented (2)', 'PresenceHub (join/leave broadcast) + CrmEventsHub (tenant/user groups)'],
        ['Event Publisher', 'Implemented', 'SignalRCrmRealtimePublisher — ICrmRealtimePublisher interface, tenant+user scoped'],
        ['Presence Tracking', 'Implemented', 'PresenceHub with user join/leave, online status broadcasting'],
        ['Worker → Browser Push', 'Implemented (4)', 'All 4 workers call PublishTenantEventAsync/PublishUserEventAsync'],
        ['Push notifications', 'Implemented', 'NotificationAlertWorker pushes SLA breaches, idle deals, coaching alerts'],
        ['Live record updates', 'Not yet', 'No record-level change broadcasting to other viewers'],
        ['Streaming AI chat', 'Not yet', 'Full response wait — not streaming tokens via IAsyncEnumerable'],
        ['Live dashboard', 'Not yet', 'Metrics computed on load — no auto-refresh via SignalR deltas'],
        ['Live pipeline/kanban', 'Not yet', 'Stage changes not broadcast to other pipeline viewers'],
    ]
    story.append(make_table(rt_data, col_widths=[W * 0.2, W * 0.2, W * 0.60]))
    story.append(Spacer(1, 4 * mm))

    rt_comp = [
        ['CRM', 'Score', 'Technology'],
        ['Salesforce', '9/10', 'Streaming API, Platform Events, Pub/Sub API, real-time record locking'],
        ['Dynamics 365', '9/10', 'SignalR-based real-time updates, Power Automate triggers, live co-authoring'],
        ['HubSpot', '8/10', 'WebSocket-based live updates, real-time activity feed, live chat'],
        ['Pipedrive', '7/10', 'WebSocket live updates on deals/activities, real-time sync'],
        ['Freshsales', '7/10', 'WebSocket updates, real-time lead tracking, live chat'],
        ['North Edge CRM', '5/10', 'SignalR (2 hubs, publisher, worker broadcasts); no record co-editing yet'],
        ['Zoho', '5/10', 'Partial real-time via long-polling, Zoho Cliq integration'],
        ['SugarCRM', '3/10', 'Minimal — mostly polling-based'],
    ]
    story.append(make_table(rt_comp, col_widths=[W * 0.18, W * 0.1, W * 0.72]))
    story.append(Spacer(1, 6 * mm))

    # ═══════════════════════════════════════════
    # 13. SIGNALR INTEGRATION OPPORTUNITIES
    # ═══════════════════════════════════════════
    story.append(Paragraph("13. SignalR Implementation Status", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "The SignalR infrastructure is <b>implemented and operational</b>. Two hubs handle presence and CRM events. "
        "A dedicated publisher (SignalRCrmRealtimePublisher) provides tenant-wide and user-specific broadcasting. "
        "All 4 background workers actively push events through this infrastructure. Below is the status and remaining opportunities.",
        styles['BodyText2']
    ))

    sr_data = [
        ['Status', 'Component', 'Detail'],
        ['BUILT', 'PresenceHub', 'User join/leave broadcasting, online status tracking via groups'],
        ['BUILT', 'CrmEventsHub', 'Tenant-scoped and user-scoped event groups, general broadcasting'],
        ['BUILT', 'SignalRCrmRealtimePublisher', 'ICrmRealtimePublisher impl — PublishTenantEventAsync, PublishUserEventAsync'],
        ['BUILT', 'EmailQueueWorker → SignalR', 'Pushes email delivery status (sent/failed) to tenant + user channels'],
        ['BUILT', 'NotificationAlertWorker → SignalR', 'Pushes SLA breach, idle deal, coaching alerts to user channels'],
        ['BUILT', 'DecisionSlaEscalationWorker → SignalR', 'Pushes escalation events to approver\'s user channel'],
        ['BUILT', 'RenewalAutomationWorker → SignalR', 'Pushes renewal creation events to opportunity owner\'s channel'],
        ['REMAINING', 'AI Assistant Streaming', 'Switch to IAsyncEnumerable + SignalR stream for token-by-token UX'],
        ['REMAINING', 'Dashboard Live Metrics', 'Entity change detection → broadcast widget deltas to viewers'],
        ['REMAINING', 'Pipeline Kanban Live', 'Broadcast opportunity stage changes for live card moves'],
        ['REMAINING', 'Record-Level Presence', 'Show who is viewing/editing a specific record in real-time'],
        ['REMAINING', 'Review Thread Live Chat', 'Live comment push for deal review threads'],
    ]
    story.append(make_table(sr_data, col_widths=[W * 0.1, W * 0.28, W * 0.62]))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 14. AI CAPABILITIES DEEP-DIVE
    # ═══════════════════════════════════════════
    story.append(Paragraph("14. AI Capabilities Deep-Dive", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "North Edge CRM has <b>7 distinct AI implementations</b> — more than most Tier 2 competitors and rivaling "
        "Tier 1 platforms in several areas. The AI architecture features multi-provider resilience, RAG grounding, "
        "action execution with risk-based review, and campaign intelligence.",
        styles['BodyText2']
    ))
    story.append(Spacer(1, 3 * mm))

    ai_data = [
        ['#', 'Implementation', 'LOC', 'Key Capabilities'],
        ['1', 'AssistantChatService', '1,080', 'Foundry Agent with RAG (AI Search), action execution with risk tiering '
         '(low=auto, medium/high=review), confidence gating (<0.55 forces review), 60s undo window, rate limiting (10s), '
         'grounded prompt with real-time CRM snapshot, audit trail per action'],
        ['2', 'AzureOpenAILeadScoringService', '126', 'Primary AI scorer — structured JSON response with score (0-100), '
         'confidence (0-1), reasoning, recommended actions. Uses GPT-4o.'],
        ['3', 'OpenAILeadScoringService', '117', 'Secondary fallback — identical prompt/response schema. Auto-activates '
         'when Azure OpenAI is unavailable.'],
        ['4', 'RuleBasedLeadScoringService', '33', 'Tertiary fallback — additive scoring (base 20, max 100), fixed '
         'confidence 0.35. Ensures scoring never fails.'],
        ['5', 'FoundryAgentClient', '224', 'Azure AI Foundry Agents HTTP client with thread-based conversation, '
         'polling with rate-limit retry, 20-second hard timeout, structured response parsing.'],
        ['6', 'AzureSearchKnowledgeClient', '87', 'RAG retrieval layer — configurable top-k, filter expressions, '
         'content truncation. Feeds grounding documents to AssistantChatService.'],
        ['7', 'MarketingService (AI)', '1,232', '5 AI recommendation types: pause_low_efficiency, reengage_stalled, '
         'increase_budget, reallocate_budget, monitor_steady_state. Composite health scoring (0-100) with trend. '
         'First-touch attribution with explainability event trail.'],
    ]
    story.append(make_table(ai_data, col_widths=[W * 0.04, W * 0.22, W * 0.06, W * 0.68]))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("AI Architecture Highlights", styles['SubSection']))
    ai_highlights = [
        "<b>3-Tier Scoring Fallback (10/10 Resilience)</b> — Azure OpenAI → OpenAI → Rule-based. No other CRM has automatic multi-provider AI failover.",
        "<b>Action Risk Tiering</b> — Low-risk actions auto-execute. Medium/high-risk go to review. Confidence < 0.55 forces review regardless of risk level.",
        "<b>60-Second Undo Window</b> — Every AI-executed action can be undone within 60 seconds. Unique in the CRM market.",
        "<b>RAG Grounding</b> — Azure AI Search retrieves knowledge documents; Foundry Agent uses them for context-aware responses.",
        "<b>Campaign Intelligence</b> — 5 recommendation types with confidence scoring, impact estimates, and evidence. Accept/dismiss/snooze workflow with 12-hour cache.",
        "<b>Attribution Explainability</b> — First-touch attribution with evidence trail showing why each campaign touchpoint was credited.",
    ]
    for h in ai_highlights:
        story.append(Paragraph(f"•  {h}", styles['BulletItem']))
    story.append(PageBreak())

    # ═══════════════════════════════════════════
    # 15. RECOMMENDATIONS
    # ═══════════════════════════════════════════
    story.append(Paragraph("15. Recommendations", styles['SectionTitle']))
    story.append(GradientBar(W, 2))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Immediate Priorities (This Quarter)", styles['SubSection']))
    imm_recs = [
        "<b>Close the Email Gap</b> — Bidirectional email integration (MS Graph inbound sync) is the single highest-impact feature. Every lost deal starts with \"can my reps see replies in the CRM?\"",
        "<b>Ship Report Builder</b> — VP/Director-level buyers won't adopt without ad-hoc reporting. Even a basic filter + chart + export covers 80% of use cases.",
        "<b>Add Products + Quotes</b> — These two features are tightly coupled and complete the deal-closure workflow inside the CRM.",
        "<b>Expose Custom Fields UI</b> — Your backend entity already exists. Building the admin UI is front-end only.",
        "<b>Add Webhooks</b> — Leverage your existing Azure Service Bus. Publish entity events → outbound webhook delivery. Enables Zapier/Make/N8N integrations.",
    ]
    for r in imm_recs:
        story.append(Paragraph(f"•  {r}", styles['BulletItem']))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Technical Quick Wins", styles['SubSection']))
    tech_wins = [
        "<b>Extend SignalR to Dashboard</b> — Infrastructure is built (2 hubs, publisher). Wire entity change detection → dashboard widget auto-refresh. Score jumps from 5/10 to 7/10.",
        "<b>Add SSO/SAML</b> — Enterprise deal-blocker. Azure AD B2C or IdentityServer integration.",
        "<b>Add OData or GraphQL layer</b> — Start with OData on key entities (read-only) for power users and integrators.",
        "<b>Stream AI Chat via SignalR</b> — Switch AssistantChatService to IAsyncEnumerable + SignalR stream. Token-by-token UX with no extra infrastructure.",
    ]
    for t in tech_wins:
        story.append(Paragraph(f"•  {t}", styles['BulletItem']))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Strategic Positioning", styles['SubSection']))
    story.append(Paragraph(
        "North Edge CRM has distinctive AI advantages (CQVS scoring, 3-tier fallback, action orchestration with undo, "
        "campaign AI with attribution explainability) that no Tier 2 competitor can match and that rival Tier 1 platforms. "
        "Campaign management with AI recommendations is now built — closing a major gap. SignalR infrastructure provides "
        "a real-time foundation. The strategy should be: "
        "<b>close the remaining table-stakes gaps (NOW) to stop losing deals on missing features, "
        "then lean into your AI differentiators as the competitive moat.</b> "
        "Position as: \"The AI-first CRM that's actually enterprise-ready\" — "
        "once email, reports, quotes, and webhooks ship, that claim becomes fully defensible.",
        styles['BodyText2']
    ))
    story.append(Spacer(1, 6 * mm))

    # ── Roadmap Summary Table ──
    story.append(Paragraph("Roadmap Summary", styles['SubSection']))
    summary_data = [
        ['Phase', 'Features', 'Timeline', 'Outcome'],
        ['NOW', '8 features', '0–3 months', 'Close deal-blocking gaps. Reps work 100% in CRM'],
        ['NEXT', '9 features', '3–6 months', 'Full Tier 2 parity. Compete with Freshsales/Zoho/Sugar'],
        ['LATER', '12 features', '6–12 months', 'Push into Tier 1. Approach HubSpot/Dynamics level'],
        ['TOTAL', '29 features', '12 months', 'From Upper Tier 2 → Lower Tier 1'],
    ]
    story.append(make_table(summary_data, col_widths=[W * 0.12, W * 0.18, W * 0.2, W * 0.50]))
    story.append(Spacer(1, 10 * mm))

    # ── End Card ──
    story.append(GradientBar(W, 3))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        f"End of Report — North Edge CRM Competitive Audit & Technology Benchmark  •  Version {DOC_VERSION}",
        styles['FooterText']
    ))
    story.append(Paragraph(
        f"{DOC_DATE}  •  North Edge System  •  Toronto, Canada  •  www.northedgesystem.com",
        styles['FooterText']
    ))
    story.append(Paragraph(
        "Classification: Internal – Engineering & Product  •  This document supersedes all previous versions.",
        styles['FooterText']
    ))

    # ── Build ──
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    return OUTPUT_PATH


if __name__ == "__main__":
    path = build_pdf()
    print(f"✅ PDF generated: {path}")
    print(f"   Size: {os.path.getsize(path) / 1024:.0f} KB")
