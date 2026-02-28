#!/usr/bin/env python3
"""
North Edge CRM – Comprehensive User Guide
Role-based user guide: Sales Rep → Sales Manager → Director/VP → Administrator
Generated from codebase analysis of routes, permissions, UI components, and domain logic.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib import colors
import os
from datetime import datetime

# ── Color Palette ──
PRIMARY = HexColor("#667eea")
PRIMARY_DARK = HexColor("#4f46e5")
SECONDARY = HexColor("#764ba2")
CYAN = HexColor("#06b6d4")
CYAN_DARK = HexColor("#0e7490")
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
TEAL_BG = HexColor("#f0fdfa")

# ── Output ──
OUTPUT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "docs", "North_Edge_CRM_User_Guide.pdf")


# ════════════════════════════════════════════════════════════════
# STYLES
# ════════════════════════════════════════════════════════════════

def build_styles():
    s = getSampleStyleSheet()

    s.add(ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=34, leading=40,
                         textColor=GRAY_900, alignment=TA_LEFT, spaceAfter=4))
    s.add(ParagraphStyle('CoverSub', fontName='Helvetica', fontSize=16, leading=22,
                         textColor=PRIMARY, alignment=TA_LEFT, spaceAfter=4))
    s.add(ParagraphStyle('CoverDate', fontName='Helvetica', fontSize=11, leading=14,
                         textColor=GRAY_500, alignment=TA_LEFT, spaceAfter=20))
    s.add(ParagraphStyle('ChapterTitle', fontName='Helvetica-Bold', fontSize=22, leading=28,
                         textColor=PRIMARY_DARK, spaceBefore=0, spaceAfter=12))
    s.add(ParagraphStyle('Sec', fontName='Helvetica-Bold', fontSize=15, leading=20,
                         textColor=GRAY_900, spaceBefore=16, spaceAfter=8))
    s.add(ParagraphStyle('SubSec', fontName='Helvetica-Bold', fontSize=12, leading=16,
                         textColor=GRAY_800, spaceBefore=12, spaceAfter=6))
    s.add(ParagraphStyle('Body', fontName='Helvetica', fontSize=9.5, leading=14,
                         textColor=GRAY_700, alignment=TA_JUSTIFY, spaceAfter=6))
    s.add(ParagraphStyle('BodyBold', fontName='Helvetica-Bold', fontSize=9.5, leading=14,
                         textColor=GRAY_800, spaceAfter=4))
    s.add(ParagraphStyle('BulletItem', fontName='Helvetica', fontSize=9.5, leading=13,
                         textColor=GRAY_700, leftIndent=16, bulletIndent=6, spaceAfter=3))
    s.add(ParagraphStyle('BulletBold', fontName='Helvetica-Bold', fontSize=9.5, leading=13,
                         textColor=GRAY_800, leftIndent=16, bulletIndent=6, spaceAfter=3))
    s.add(ParagraphStyle('StepNum', fontName='Helvetica-Bold', fontSize=9.5, leading=13,
                         textColor=PRIMARY_DARK, leftIndent=16, bulletIndent=0, spaceAfter=2))
    s.add(ParagraphStyle('Tip', fontName='Helvetica-Oblique', fontSize=9, leading=12,
                         textColor=CYAN_DARK, leftIndent=20, spaceAfter=6, spaceBefore=4))
    s.add(ParagraphStyle('Warning', fontName='Helvetica-Oblique', fontSize=9, leading=12,
                         textColor=DANGER, leftIndent=20, spaceAfter=6, spaceBefore=4))
    s.add(ParagraphStyle('TH', fontName='Helvetica-Bold', fontSize=8, leading=10,
                         textColor=BLUE_500, alignment=TA_LEFT))
    s.add(ParagraphStyle('TC', fontName='Helvetica', fontSize=8, leading=11,
                         textColor=GRAY_700))
    s.add(ParagraphStyle('TCB', fontName='Helvetica-Bold', fontSize=8, leading=11,
                         textColor=GRAY_800))
    s.add(ParagraphStyle('Footer', fontName='Helvetica', fontSize=7, leading=9,
                         textColor=GRAY_500, alignment=TA_CENTER))
    s.add(ParagraphStyle('RoleTag', fontName='Helvetica-Bold', fontSize=9, leading=12,
                         textColor=white))
    s.add(ParagraphStyle('TOCChapter', fontName='Helvetica-Bold', fontSize=11, leading=16,
                         textColor=PRIMARY_DARK, spaceBefore=6, spaceAfter=2))
    s.add(ParagraphStyle('TOCItem', fontName='Helvetica', fontSize=9.5, leading=14,
                         textColor=GRAY_700, leftIndent=16, spaceAfter=1))
    return s


class GradientBar(Flowable):
    def __init__(self, width, height=3, c1=PRIMARY, c2=SECONDARY):
        Flowable.__init__(self)
        self.width, self.height, self.c1, self.c2 = width, height, c1, c2

    def draw(self):
        steps = 100
        sw = self.width / steps
        for i in range(steps):
            r = self.c1.red + (self.c2.red - self.c1.red) * i / steps
            g = self.c1.green + (self.c2.green - self.c1.green) * i / steps
            b = self.c1.blue + (self.c2.blue - self.c1.blue) * i / steps
            self.canv.setFillColorRGB(r, g, b)
            self.canv.rect(i * sw, 0, sw + 0.5, self.height, fill=1, stroke=0)


class RoleBadge(Flowable):
    """Colored badge indicating which roles a section applies to."""
    COLORS = {
        'Sales Rep': SUCCESS,
        'Sales Manager': BLUE_500,
        'Director / VP': PURPLE,
        'Administrator': DANGER,
    }

    def __init__(self, roles, width=None):
        Flowable.__init__(self)
        self.roles = roles if isinstance(roles, list) else [roles]
        self.bar_width = width or 500

    def wrap(self, availWidth, availHeight):
        return (self.bar_width, 18)

    def draw(self):
        x = 0
        self.canv.setFont('Helvetica-Bold', 7)
        for role in self.roles:
            color = self.COLORS.get(role, GRAY_500)
            label = f"  {role}  "
            tw = self.canv.stringWidth(label, 'Helvetica-Bold', 7)
            pw = tw + 8
            self.canv.setFillColor(color)
            self.canv.roundRect(x, 2, pw, 14, 3, fill=1, stroke=0)
            self.canv.setFillColor(white)
            self.canv.drawString(x + 4, 5, label)
            x += pw + 6


def make_table(data, col_widths=None):
    cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), BG_HEADER),
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
    tbl.setStyle(TableStyle(cmds))
    return tbl


def add_page_number(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.setFillColor(GRAY_500)
    canvas_obj.drawCentredString(
        A4[0] / 2, 15 * mm,
        f"North Edge CRM User Guide  |  Page {doc.page}  |  {datetime.now().strftime('%B %d, %Y')}  |  www.northedgesystem.com"
    )
    canvas_obj.restoreState()


# ════════════════════════════════════════════════════════════════
# HELPERS
# ════════════════════════════════════════════════════════════════

ALL_ROLES = ['Sales Rep', 'Sales Manager', 'Director / VP', 'Administrator']
MGMT_ROLES = ['Sales Manager', 'Director / VP', 'Administrator']
ADMIN_ONLY = ['Administrator']
ADMIN_DIR = ['Director / VP', 'Administrator']


def chapter(story, s, W, title, number):
    story.append(PageBreak())
    story.append(GradientBar(W, 4))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(f"Chapter {number}", s['CoverDate']))
    story.append(Paragraph(title, s['ChapterTitle']))
    story.append(Spacer(1, 2 * mm))


def sec(story, s, title):
    story.append(Paragraph(title, s['Sec']))


def subsec(story, s, title):
    story.append(Paragraph(title, s['SubSec']))


def body(story, s, text):
    story.append(Paragraph(text, s['Body']))


def bold(story, s, text):
    story.append(Paragraph(text, s['BodyBold']))


def bullet(story, s, text):
    story.append(Paragraph(f"• {text}", s['BulletItem']))


def step(story, s, num, text):
    story.append(Paragraph(f"{num}. {text}", s['StepNum']))


def tip(story, s, text):
    story.append(Paragraph(f"💡 Tip: {text}", s['Tip']))


def warn(story, s, text):
    story.append(Paragraph(f"⚠ {text}", s['Warning']))


def badge(story, roles, W):
    story.append(Spacer(1, 2 * mm))
    story.append(RoleBadge(roles, W))
    story.append(Spacer(1, 2 * mm))


# ════════════════════════════════════════════════════════════════
# BUILD PDF
# ════════════════════════════════════════════════════════════════

def build_pdf():
    s = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH, pagesize=A4,
        topMargin=20 * mm, bottomMargin=25 * mm,
        leftMargin=18 * mm, rightMargin=18 * mm,
        title="North Edge CRM – Comprehensive User Guide",
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
    story.append(Paragraph("North Edge CRM", s['CoverTitle']))
    story.append(Paragraph("Comprehensive User Guide", s['CoverSub']))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Role-Based Reference for Sales Reps, Sales Managers, Directors & Administrators", s['Body']))
    story.append(Spacer(1, 6 * mm))
    story.append(Paragraph(f"Generated: {datetime.now().strftime('%B %d, %Y')}", s['CoverDate']))
    story.append(Paragraph("North Edge System  •  Toronto, Canada  •  www.northedgesystem.com", s['CoverDate']))
    story.append(Paragraph("Classification: Internal – All Staff", s['CoverDate']))
    story.append(Spacer(1, 20 * mm))
    story.append(GradientBar(W, 2))

    # ═══════════════════════════════════════════
    # TABLE OF CONTENTS
    # ═══════════════════════════════════════════
    story.append(PageBreak())
    story.append(Paragraph("Table of Contents", s['ChapterTitle']))
    story.append(Spacer(1, 4 * mm))
    toc_items = [
        ("1", "Getting Started", ["Logging In", "Changing Your Password", "Navigating the Interface", "Understanding Your Role"]),
        ("2", "Dashboard", ["Personal KPIs", "Priority Action Stream", "Quota Progress", "Charts & Analytics", "Manager Pipeline Health", "AI Assistant Insights"]),
        ("3", "Customer Management", ["Browsing Customers", "Creating & Editing", "Inline Editing", "CSV Import & Export", "Bulk Actions"]),
        ("4", "Lead Management", ["Browsing Leads", "Lead Scoring (CQVS)", "Pipeline / Kanban View", "Creating & Converting Leads", "SLA Tracking", "CSV Import", "Bulk Actions", "Coach Drawer"]),
        ("5", "Opportunity Management", ["Browsing Opportunities", "Pipeline Stages", "Creating & Editing", "Inline Stage Changes", "CSV Export"]),
        ("6", "Contact Management", ["Browsing Contacts", "Creating & Editing", "Linking to Accounts", "CSV Import & Export", "Bulk Actions"]),
        ("7", "Activity Management", ["Table View", "Calendar View", "Tasks View", "Grouping by Lead/Opportunity", "Creating & Completing Activities"]),
        ("8", "Decision Engine & Approvals", ["Decision Inbox", "Approving / Rejecting", "Delegating Approvals", "AI-Assisted Decision Drafts", "Decision History & Audit"]),
        ("9", "AI Assistant", ["Insights Panel", "Suggested Actions", "Approve / Undo Actions", "AI Reviews"]),
        ("10", "Administration & Settings", ["User Management", "Role & Permission Management", "Workspace Settings", "Approval Workflow Configuration",
                                              "Notification Rules", "Lead Assignment Rules", "Qualification Policies", "Tenant Configuration", "Dashboard Packs",
                                              "Security Levels", "Audit Log"]),
        ("11", "Role Permissions Reference", ["Permission Matrix", "Visibility Scopes", "Role Hierarchy"]),
        ("12", "Keyboard Shortcuts & Tips", ["Navigation Shortcuts", "Power User Tips"]),
    ]
    for num, title, subs in toc_items:
        story.append(Paragraph(f"<b>Chapter {num}:</b>  {title}", s['TOCChapter']))
        for sub in subs:
            story.append(Paragraph(f"› {sub}", s['TOCItem']))
    story.append(Spacer(1, 6 * mm))
    story.append(GradientBar(W, 2))

    # ═══════════════════════════════════════════
    # CHAPTER 1 – GETTING STARTED
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Getting Started", 1)
    badge(story, ALL_ROLES, W)

    sec(story, s, "1.1  Logging In")
    body(story, s,
         "Navigate to your organization's North Edge CRM URL. You will see the <b>Landing Page</b> with the product logo and a "
         "<b>Sign In</b> button. Click it to reach the <b>Login Page</b>.")
    step(story, s, 1, "Enter your <b>email address</b> in the Email field.")
    step(story, s, 2, "Enter your <b>password</b>.")
    step(story, s, 3, "If your organization uses multi-tenancy, the <b>Tenant Key</b> will be sent automatically via the X-Tenant-Key header.")
    step(story, s, 4, "Click <b>Sign In</b>. You will be redirected to the Dashboard.")
    tip(story, s, "If your login fails, the system retries up to 2 times on transient errors (network issues, 502/503/504). If the error persists, contact your administrator.")
    body(story, s,
         "On first login, if your administrator set the <b>Must Change Password</b> flag, you will be redirected to the "
         "<b>Change Password</b> page before accessing the CRM.")

    sec(story, s, "1.2  Accepting an Invitation")
    body(story, s,
         "New users receive an email invitation with a unique link. Click the link to reach the <b>Accept Invite</b> page where you set "
         "your password and activate your account. The invitation token expires after the time configured by your administrator.")

    sec(story, s, "1.3  Changing Your Password")
    badge(story, ALL_ROLES, W)
    step(story, s, 1, "Click your profile avatar in the top-right corner and select <b>Change Password</b>.")
    step(story, s, 2, "Enter your current password, then your new password twice.")
    step(story, s, 3, "Click <b>Update Password</b>.")
    warn(story, s, "You will be logged out from all sessions after changing your password. Log in again with the new credentials.")

    sec(story, s, "1.4  Navigating the Interface")
    body(story, s,
         "The North Edge CRM interface uses a <b>sidebar + topbar</b> shell layout:")
    bullet(story, s, "<b>Sidebar (left):</b> Collapsible navigation organized into sections — Dashboard, Decision Inbox, Customers, Leads, Opportunities, Activities, Contacts, and Settings. Each section expands to show child links.")
    bullet(story, s, "<b>Topbar:</b> Displays environment badge, search, notifications, and your profile menu.")
    bullet(story, s, "<b>Main Content Area:</b> The central workspace where pages render — list views, forms, dashboards, etc.")
    tip(story, s, "The sidebar collapses to icons on smaller screens. Hover over icons to see tooltips.")

    body(story, s, "<b>Sidebar Navigation Structure:</b>")
    nav_data = [
        ['Section', 'Sub-items', 'Required Permission'],
        ['Dashboard', '—', 'dashboardView'],
        ['Decision Inbox', 'Inbox, Approvals, AI Reviews, Policies & SLA, Decision History', 'opportunitiesView'],
        ['Customers', 'All Customers, Add Customer', 'customersView'],
        ['Leads', 'All Leads, Add Lead, Pipeline, Import Leads', 'leadsView'],
        ['Opportunities', 'All Opportunities, Add Opportunity', 'opportunitiesView'],
        ['Activities', 'All Activities, Calendar, Tasks', 'activitiesView'],
        ['Contacts', 'All Contacts, Add Contact', 'contactsView'],
        ['Settings', 'People & Access, Workspace & Org, Workflow & Rules, Trust & Audit', 'administrationView'],
    ]
    story.append(make_table(nav_data, col_widths=[W * 0.18, W * 0.52, W * 0.30]))
    story.append(Spacer(1, 3 * mm))
    tip(story, s, "Menu items you don't have permission for will not appear in your sidebar.")

    sec(story, s, "1.5  Understanding Your Role")
    body(story, s,
         "North Edge CRM uses a <b>hierarchical role-based access control</b> (RBAC) system. Each role has a set of permissions and a "
         "<b>Visibility Scope</b> that controls what data you can see:")
    role_data = [
        ['Role', 'Typical Scope', 'Description'],
        ['Sales Rep', 'Self', 'Can view and manage own leads, accounts, contacts, activities, and opportunities. Cannot access Settings or see other reps\' data.'],
        ['Sales Manager', 'Team', 'Everything a Sales Rep can do, plus: view the entire team\'s data, pipeline health dashboard, coaching tools, assign leads via bulk actions, request and manage approvals.'],
        ['Director / VP', 'All', 'Everything a Sales Manager can do, plus: override approvals, view all teams\' data, access qualification policies, and view advanced analytics.'],
        ['Administrator', 'All', 'Full system access including user/role management, workspace configuration, tenant creation, approval workflow setup, audit logs, security levels, and all CRM features.'],
    ]
    story.append(make_table(role_data, col_widths=[W * 0.16, W * 0.14, W * 0.70]))
    story.append(Spacer(1, 3 * mm))
    body(story, s,
         "Roles support <b>parent-child hierarchy</b> — a parent role automatically inherits the permissions of child roles. "
         "The system also tracks <b>Security Levels</b> tied to roles for advanced data access control. "
         "Your administrator can create custom roles with any combination of the 20 available permission keys.")

    # ═══════════════════════════════════════════
    # CHAPTER 2 – DASHBOARD
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Dashboard", 2)
    badge(story, ALL_ROLES, W)
    body(story, s,
         "The Dashboard is your <b>command center</b> — a personalized, widget-rich home page that displays key metrics, tasks, "
         "and insights. It uses a premium glassmorphic UI with drag-and-drop card reordering.")

    sec(story, s, "2.1  Personal KPI Cards")
    body(story, s,
         "At the top of the Dashboard, you see a greeting and a row of KPI cards showing your personal metrics:")
    kpi_data = [
        ['KPI Card', 'What It Shows'],
        ['Accounts', 'Total number of accounts assigned to you (or your team if Manager+)'],
        ['Open Opportunities', 'Count of opportunities in Open status'],
        ['Pipeline Value', 'Sum of all open opportunity amounts, formatted as currency'],
        ['Tasks Due Today', 'Activities of type Task with due date = today'],
        ['Upcoming Activities', 'Activities due in the next 7 days'],
    ]
    story.append(make_table(kpi_data, col_widths=[W * 0.28, W * 0.72]))
    story.append(Spacer(1, 2 * mm))
    body(story, s,
         "Below the primary KPIs, <b>secondary KPI cards</b> appear in a reorderable grid. You can <b>drag and drop</b> these "
         "cards to customize your layout. Cards include: At-Risk Deals, No Next Step, Customer Breakdown (Lead/Prospect/Customer counts).")
    tip(story, s, "Your card layout is saved to your profile and persists across sessions.")

    sec(story, s, "2.2  Priority Action Stream")
    body(story, s,
         "The <b>Priority Stream</b> is a unified, prioritized queue of items requiring your attention. It merges multiple data sources "
         "into a single, sortable list:")
    bullet(story, s, "<b>Overdue Tasks</b> — tasks past their due date (highest priority)")
    bullet(story, s, "<b>Due Today</b> — tasks due today")
    bullet(story, s, "<b>New Leads</b> — recently assigned leads awaiting action")
    bullet(story, s, "<b>At-Risk Deals</b> — opportunities flagged as at-risk (no next step, close date passed, stuck in stage)")
    bullet(story, s, "<b>Pending Decisions</b> — approval items in your Decision Inbox")
    body(story, s,
         "Use the <b>filter tabs</b> to narrow the stream: All, Overdue, Today, Decisions, New Leads, At-Risk, No Next Step.")
    tip(story, s, "The Priority Stream calculates a priority score for each item so the most urgent actions always appear first.")

    sec(story, s, "2.3  Quota Progress")
    body(story, s,
         "The <b>Quota Progress</b> widget shows your personal monthly quota target (set by your Administrator) and your "
         "<b>confidence-weighted pipeline</b> progress against it. The pipeline value is weighted by each opportunity's probability "
         "percentage, giving a realistic forecast of expected revenue.")

    sec(story, s, "2.4  Charts & Analytics")
    body(story, s, "The Dashboard includes multiple Chart.js visualizations:")
    bullet(story, s, "<b>Revenue by Month</b> — bar chart showing monthly closed-won revenue")
    bullet(story, s, "<b>Customer Growth</b> — line chart tracking customer acquisition over time")
    bullet(story, s, "<b>Activity Breakdown</b> — donut chart showing distribution of Calls, Emails, Meetings, Tasks, Notes")
    bullet(story, s, "<b>Pipeline by Stage</b> — bar chart showing opportunity counts per stage")
    bullet(story, s, "<b>Conversion Trend</b> — line chart showing lead-to-customer conversion rate over time")
    bullet(story, s, "<b>Cost-of-Not-Knowing Trend</b> — risk exposure trend (click to expand breakdown)")

    sec(story, s, "2.5  Manager Pipeline Health")
    badge(story, MGMT_ROLES, W)
    body(story, s,
         "Sales Managers and above see an additional <b>Manager Pipeline Health</b> section with team-wide analytics:")
    bullet(story, s, "<b>Pipeline by Stage</b> — team aggregate view")
    bullet(story, s, "<b>Missing Next Step</b> — deals without a scheduled next step")
    bullet(story, s, "<b>Next Step Overdue</b> — deals where the next step date has passed")
    bullet(story, s, "<b>No Recent Activity</b> — deals with no logged activity in the configurable period")
    bullet(story, s, "<b>Close Date Passed</b> — open deals past their expected close date")
    bullet(story, s, "<b>Stuck in Stage</b> — deals that haven't progressed between stages")
    bullet(story, s, "<b>Coaching Stats</b> — coaching notes sent and pending")
    bullet(story, s, "<b>Approval Queue Stats</b> — pending, approved, rejected counts")
    bullet(story, s, "<b>Truth Gaps</b> — deals with incomplete or inconsistent data")
    tip(story, s, "Use the Manager Pipeline Health section to identify coaching opportunities and blocked deals across your team.")

    body(story, s, "<b>Coaching Dialog:</b> Managers can open a coaching dialog on any at-risk deal to:")
    bullet(story, s, "Add a coaching comment with context")
    bullet(story, s, "Set a due date for the sales rep to respond")
    bullet(story, s, "Assign a priority level to the coaching item")

    sec(story, s, "2.6  AI Assistant Insights")
    badge(story, ALL_ROLES, W)
    body(story, s,
         "The <b>AI Assistant Insights</b> panel shows AI-generated KPIs and <b>Suggested Actions</b>. These are context-aware "
         "recommendations analyzed from your pipeline data:")
    bullet(story, s, "<b>Expand each action</b> to see details and reasoning")
    bullet(story, s, "<b>Approve</b> an action to execute it (e.g., log an activity, schedule a follow-up)")
    bullet(story, s, "<b>Undo</b> a recently approved action within the countdown window")
    bullet(story, s, "<b>Request AI Review</b> to get a deeper analysis from the AI engine")

    body(story, s, "<b>Additional Dashboard Widgets:</b>")
    bullet(story, s, "<b>Expansion Signals</b> — AI-detected deal expansion opportunities")
    bullet(story, s, "<b>Decision Inbox Widget</b> — quick view of pending approvals")
    bullet(story, s, "<b>Forecast Scenarios</b> — projected outcomes based on pipeline probability")
    bullet(story, s, "<b>Recent Accounts</b> (last 5), <b>My Tasks</b> (top 6), <b>Top Performers</b>, <b>Newly Assigned Leads</b>, <b>At-Risk Deals</b>")

    # ═══════════════════════════════════════════
    # CHAPTER 3 – CUSTOMERS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Customer Management", 3)
    badge(story, ALL_ROLES, W)

    sec(story, s, "3.1  Customer Workspace")
    body(story, s,
         "The Customer Workspace (<b>Customers</b> menu) is your central hub for managing accounts. "
         "It features a hero section with stats, metric KPI cards, and a data table.")

    subsec(story, s, "Metric Cards")
    body(story, s, "Five metric cards display at the top:")
    bullet(story, s, "<b>Total</b> — total customer/account count")
    bullet(story, s, "<b>Leads</b> — accounts in Lead status")
    bullet(story, s, "<b>Prospects</b> — accounts in Prospect status")
    bullet(story, s, "<b>Active Customers</b> — accounts in Customer status")
    bullet(story, s, "<b>New This Week</b> — accounts created in the last 7 days")

    subsec(story, s, "Filters & Search")
    body(story, s, "Above the table, you can filter by:")
    bullet(story, s, "<b>Search</b> — free-text search across name, company, email")
    bullet(story, s, "<b>Status</b> — All / Lead / Prospect / Customer")
    bullet(story, s, "<b>Owner</b> — filter by assigned owner (Sales Managers+ can see all owners)")
    bullet(story, s, "<b>Segment</b> — All / New this week / Needs follow-up / Active customers")

    subsec(story, s, "Table Columns")
    col_data = [
        ['Column', 'Description', 'Inline Edit?'],
        ['Name', 'Customer/account name (clickable link to edit)', 'No'],
        ['Company', 'Company name', 'No'],
        ['Email', 'Primary email address', 'No'],
        ['Phone', 'Phone number', 'No'],
        ['Status', 'Lead / Prospect / Customer', 'Yes ✓'],
        ['Owner', 'Assigned sales rep', 'Yes ✓ (Manage perm)'],
        ['Created At', 'Date the record was created', 'No'],
    ]
    story.append(make_table(col_data, col_widths=[W * 0.15, W * 0.50, W * 0.35]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "3.2  Creating a Customer")
    badge(story, ALL_ROLES, W)
    body(story, s, "Required permission: <b>customersManage</b>")
    step(story, s, 1, "Click the <b>+ New Customer</b> button in the toolbar (or use the sidebar link <b>Add Customer</b>).")
    step(story, s, 2, "Fill in the form fields: Name, Company, Email, Phone, Status, and optionally assign an Owner.")
    step(story, s, 3, "Click <b>Save</b> to create the customer.")
    body(story, s,
         "The form follows the <b>premium glass card</b> design — cards lift on hover and glow blue when a field is focused. "
         "All form pages share this consistent design language.")

    sec(story, s, "3.3  Inline Editing")
    body(story, s,
         "From the customer list, you can change <b>Status</b> and <b>Owner</b> directly in the table without opening the edit form. "
         "Click the status badge or owner name to open a dropdown selector. The change saves immediately.")

    sec(story, s, "3.4  CSV Import & Export")
    subsec(story, s, "Export")
    body(story, s,
         "Click the <b>Export CSV</b> button in the toolbar. The system exports all filtered records with columns: "
         "Name, Company, Email, Phone, Status, Owner, Created At.")
    subsec(story, s, "Import")
    badge(story, ['Sales Manager', 'Director / VP', 'Administrator'], W)
    step(story, s, 1, "Click the <b>Import</b> button in the toolbar.")
    step(story, s, 2, "Select a CSV file with the required columns.")
    step(story, s, 3, "The system uploads the file and starts a background import job.")
    step(story, s, 4, "A progress indicator shows the job status. You can continue working while the import runs.")

    sec(story, s, "3.5  Bulk Actions")
    badge(story, ['Sales Manager', 'Director / VP', 'Administrator'], W)
    body(story, s,
         "Select multiple customers using the checkboxes in the table. A <b>bulk action bar</b> appears with these options:")
    bullet(story, s, "<b>Assign Owner</b> — reassign all selected records to a different owner")
    bullet(story, s, "<b>Change Status</b> — update status for all selected records")
    bullet(story, s, "<b>Delete</b> — permanently remove selected records")
    warn(story, s, "Bulk delete is irreversible. Only users with customersManage permission can delete records.")

    sec(story, s, "3.6  View Toggle")
    body(story, s,
         "Toggle between <b>Table View</b> (default) and <b>Card View</b> using the view toggle buttons in the toolbar. "
         "Card view displays each customer as a visual card with key details.")

    # ═══════════════════════════════════════════
    # CHAPTER 4 – LEADS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Lead Management", 4)
    badge(story, ALL_ROLES, W)

    sec(story, s, "4.1  Lead Workspace")
    body(story, s,
         "The Lead Workspace provides two views: <b>Table</b> and <b>Kanban Pipeline</b>. "
         "Switch between them using the view toggle or by navigating to <b>Leads → Pipeline</b> in the sidebar.")

    subsec(story, s, "Lead Statuses")
    status_data = [
        ['Status', 'Description'],
        ['New', 'Freshly created or imported lead — not yet contacted'],
        ['Contacted', 'Initial outreach has been made'],
        ['Nurture', 'Lead is being nurtured over time (not yet sales-ready)'],
        ['Qualified', 'Lead meets qualification criteria — ready for conversion'],
        ['Converted', 'Successfully converted to Account + Contact + Opportunity'],
        ['Lost', 'Lead was lost to a competitor or went unresponsive'],
        ['Disqualified', 'Lead does not meet ICP or qualification criteria'],
    ]
    story.append(make_table(status_data, col_widths=[W * 0.20, W * 0.80]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "4.2  Lead Scoring — CQVS Framework")
    body(story, s,
         "North Edge CRM uses a proprietary <b>CQVS scoring framework</b> to evaluate leads. "
         "Understanding CQVS helps you prioritize which leads to pursue first.")
    cqvs_data = [
        ['Dimension', 'Weight', 'What It Measures'],
        ['C – Company Fit', '~30%', 'How well the company matches your Ideal Customer Profile (ICP): industry, size, geography'],
        ['Q – Qualification Readiness', '~25%', 'Budget availability, decision timeline, buying readiness'],
        ['V – Value / Problem Severity', '~25%', 'How severe is the lead\'s problem? Higher severity = higher urgency'],
        ['S – Stakeholder Access', '~20%', 'Can you reach the economic buyer / decision maker?'],
    ]
    story.append(make_table(cqvs_data, col_widths=[W * 0.22, W * 0.10, W * 0.68]))
    story.append(Spacer(1, 3 * mm))
    body(story, s,
         "The <b>Display Score</b> in the table is calculated as: 30% Buyer Data Quality + 70% Qualification Score. "
         "Additional data points include: Evidence Coverage %, Qualification Confidence Label, "
         "Weakest Signal Indicator, and Assumptions Outstanding.")
    tip(story, s, "A lead with CQVS score above 70 and all dimensions green is a strong candidate for conversion.")

    sec(story, s, "4.3  SLA Tracking")
    body(story, s,
         "Each lead has a <b>First-Touch SLA</b> — the maximum number of hours (configured by your admin) before a new lead must "
         "receive its first contact. The SLA status column shows:")
    bullet(story, s, "<b>Completed</b> — first touch logged within SLA window")
    bullet(story, s, "<b>Due</b> — SLA window is approaching but not yet breached")
    bullet(story, s, "<b>Overdue</b> — SLA has been breached (requires immediate action)")
    bullet(story, s, "<b>Not Started</b> — no SLA timer yet (newly created)")

    sec(story, s, "4.4  Pipeline / Kanban View")
    body(story, s,
         "Navigate to <b>Leads → Pipeline</b> to see leads organized as cards in <b>Kanban columns by status</b>. "
         "Each column represents a status (New, Contacted, Nurture, etc.). "
         "This view gives a visual overview of your lead pipeline progression.")

    sec(story, s, "4.5  Creating & Converting Leads")
    subsec(story, s, "Creating a Lead")
    step(story, s, 1, "Click <b>+ New Lead</b> or go to <b>Leads → Add Lead</b>.")
    step(story, s, 2, "Fill in the form: Name, Company, Email, Phone, Status, Source, and notes.")
    step(story, s, 3, "Click <b>Save</b>.")

    subsec(story, s, "Converting a Lead")
    body(story, s,
         "When a lead is qualified, convert it to create three linked records simultaneously:")
    step(story, s, 1, "From the lead list, click the <b>Convert</b> action on a Qualified lead.")
    step(story, s, 2, "The Convert page creates: an <b>Account</b> (Customer), a <b>Contact</b>, and an <b>Opportunity</b>.")
    step(story, s, 3, "Review the pre-filled data and adjust as needed.")
    step(story, s, 4, "Click <b>Convert</b>. The lead status changes to <b>Converted</b> with links to the created records.")
    tip(story, s, "After conversion, you can click the linked Account, Contact, or Opportunity directly from the lead row.")

    sec(story, s, "4.6  Coach Drawer")
    badge(story, MGMT_ROLES, W)
    body(story, s,
         "Sales Managers can open the <b>Coach Drawer</b> to view CQVS group metrics and score breakdowns for selected leads. "
         "This helps in coaching sessions — identify weak dimensions and guide reps on what evidence to gather.")

    sec(story, s, "4.7  Bulk Actions")
    badge(story, ['Sales Manager', 'Director / VP', 'Administrator'], W)
    body(story, s, "Multi-select leads via checkboxes, then use the bulk action bar:")
    bullet(story, s, "<b>Assign Owner</b> — requires administrationManage permission")
    bullet(story, s, "<b>Change Status</b> — batch status update")
    bullet(story, s, "<b>Delete</b> — permanent removal")

    # ═══════════════════════════════════════════
    # CHAPTER 5 – OPPORTUNITIES
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Opportunity Management", 5)
    badge(story, ALL_ROLES, W)

    sec(story, s, "5.1  Opportunities Workspace")
    body(story, s,
         "The Opportunities page shows all sales opportunities with pipeline tracking, filtering, and inline stage management.")

    subsec(story, s, "Pipeline Stages")
    stage_data = [
        ['Stage', 'Description', 'Typical Probability'],
        ['Prospecting', 'Initial identification of the opportunity', '10–20%'],
        ['Qualification', 'Confirming budget, authority, need, timeline', '20–40%'],
        ['Proposal', 'Proposal or demo delivered to the prospect', '40–60%'],
        ['Negotiation', 'Terms, pricing, and contracts being negotiated', '60–80%'],
        ['Closed Won', 'Deal won — revenue booked', '100%'],
        ['Closed Lost', 'Deal lost to competitor, budget cut, or no-decision', '0%'],
    ]
    story.append(make_table(stage_data, col_widths=[W * 0.18, W * 0.55, W * 0.27]))
    story.append(Spacer(1, 3 * mm))

    subsec(story, s, "Metric Cards")
    bullet(story, s, "<b>Total</b> — all opportunities")
    bullet(story, s, "<b>Open</b> — non-closed opportunities")
    bullet(story, s, "<b>Closed Won / Lost</b> — win/loss counts")
    bullet(story, s, "<b>Pipeline Value</b> — sum of open opportunity amounts")
    bullet(story, s, "<b>Weighted Pipeline</b> — amount × probability for each deal, summed")
    bullet(story, s, "<b>Stalled</b> — deals with no activity in a configurable period")
    bullet(story, s, "<b>Avg Deal Size</b> — average opportunity amount")

    subsec(story, s, "Table Columns")
    opp_col_data = [
        ['Column', 'Description', 'Inline Edit?'],
        ['Name', 'Opportunity name (link to edit)', 'No'],
        ['Account', 'Linked customer account', 'No'],
        ['Stage', 'Pipeline stage', 'Yes ✓ (non-Closed only)'],
        ['Amount', 'Deal value', 'No'],
        ['Probability', 'Win probability %', 'No'],
        ['Close Date', 'Expected close date', 'No'],
        ['Next Step', 'Next action to progress the deal', 'No'],
        ['Owner', 'Assigned sales rep', 'No'],
    ]
    story.append(make_table(opp_col_data, col_widths=[W * 0.14, W * 0.50, W * 0.36]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "5.2  Filters")
    bullet(story, s, "<b>Search</b> — free text across name and account")
    bullet(story, s, "<b>Stage</b> — filter by pipeline stage")
    bullet(story, s, "<b>Missing Next Step</b> — toggle to show only deals without a next step")

    sec(story, s, "5.3  Creating & Editing Opportunities")
    step(story, s, 1, "Click <b>+ New Opportunity</b> or go to <b>Opportunities → Add Opportunity</b>.")
    step(story, s, 2, "Fill in: Name, Account, Stage, Amount, Probability, Close Date, Next Step, Owner.")
    step(story, s, 3, "Click <b>Save</b>.")
    body(story, s,
         "When editing, you can also inline-change the <b>Stage</b> directly from the list table — click the stage badge, "
         "select a new stage, and it saves immediately. Note: once a deal is Closed Won or Closed Lost, "
         "inline stage change is disabled; you must use the edit form.")

    sec(story, s, "5.4  CSV Export")
    body(story, s, "Click <b>Export CSV</b> to download all filtered opportunities.")

    # ═══════════════════════════════════════════
    # CHAPTER 6 – CONTACTS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Contact Management", 6)
    badge(story, ALL_ROLES, W)

    sec(story, s, "6.1  Contacts Workspace")
    body(story, s,
         "The Contacts page manages individual people associated with customer accounts. "
         "Contacts track lifecycle stage independently and can be linked to accounts.")

    subsec(story, s, "Computed Stats")
    bullet(story, s, "<b>Total contacts</b> in scope")
    bullet(story, s, "<b>Contacts with linked accounts</b>")
    bullet(story, s, "<b>Lifecycle breakdown</b> — Lead / Prospect / Customer counts")
    bullet(story, s, "<b>Unique owners</b> — number of distinct contact owners")

    subsec(story, s, "Table Columns")
    contact_cols = [
        ['Column', 'Description', 'Inline Edit?'],
        ['Name', 'Contact name (link to edit)', 'No'],
        ['Email', 'Email address', 'No'],
        ['Phone', 'Phone number', 'No'],
        ['Account', 'Linked account/customer', 'No'],
        ['Lifecycle Stage', 'Lead / Prospect / Customer', 'Yes ✓'],
        ['Owner', 'Assigned owner', 'Yes ✓ (Manage perm)'],
        ['Created At', 'Record creation date', 'No'],
    ]
    story.append(make_table(contact_cols, col_widths=[W * 0.16, W * 0.44, W * 0.40]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "6.2  Filters")
    bullet(story, s, "<b>Search</b> — text search across name, email")
    bullet(story, s, "<b>Account</b> — filter by linked account")
    bullet(story, s, "<b>Lifecycle</b> — All / Lead / Prospect / Customer")
    bullet(story, s, "<b>Owner</b> — filter by assigned owner")

    sec(story, s, "6.3  Import & Export")
    body(story, s, "Same pattern as Customers — CSV export of all filtered records, CSV import with background job processing.")

    sec(story, s, "6.4  Bulk Actions")
    badge(story, ['Sales Manager', 'Director / VP', 'Administrator'], W)
    body(story, s, "Multi-select → Assign Owner, Change Status, or Delete.")

    # ═══════════════════════════════════════════
    # CHAPTER 7 – ACTIVITIES
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Activity Management", 7)
    badge(story, ALL_ROLES, W)

    sec(story, s, "7.1  Activity Types")
    act_data = [
        ['Type', 'Description', 'Example'],
        ['Call', 'Phone call logged or scheduled', 'Discovery call with CFO'],
        ['Email', 'Email sent or received', 'Proposal follow-up email'],
        ['Meeting', 'Scheduled meeting (in-person or virtual)', 'Product demo with marketing team'],
        ['Task', 'Action item or to-do', 'Prepare pricing proposal by Friday'],
        ['Note', 'Free-form note attached to a record', 'Competitor mentioned during call'],
    ]
    story.append(make_table(act_data, col_widths=[W * 0.12, W * 0.42, W * 0.46]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "7.2  Three Views")
    subsec(story, s, "Table View (Default)")
    body(story, s,
         "A sortable, filterable table of all activities. Columns: Subject, Type, Status, Due Date, Related Entity, Owner.")

    subsec(story, s, "Calendar View")
    body(story, s,
         "Navigate to <b>Activities → Calendar</b>. A monthly calendar grid displays activities by date. "
         "Click on a day to open the <b>Day Detail Panel</b> showing all activities and tasks for that date.")

    subsec(story, s, "Tasks View")
    body(story, s,
         "Navigate to <b>Activities → Tasks</b>. Filters to Task-type activities and organizes them into sections: "
         "<b>Overdue</b>, <b>Due Today</b>, <b>Upcoming</b>, and <b>Completed</b>.")

    sec(story, s, "7.3  Filters & Grouping")
    bullet(story, s, "<b>Status</b> — All / Upcoming / Completed / Overdue")
    bullet(story, s, "<b>Owner</b> — filter by owner")
    bullet(story, s, "<b>Type</b> — Call / Email / Meeting / Task / Note")
    bullet(story, s, "<b>Group By</b> — None / Lead / Opportunity (groups activities under their related entity with per-group stats)")
    bullet(story, s, "<b>Search</b> — free text")
    bullet(story, s, "<b>My View</b> toggle — show only your activities")
    bullet(story, s, "<b>Overdue Only / Due Today</b> — quick filters")

    subsec(story, s, "Stats Bar")
    bullet(story, s, "Open activities count")
    bullet(story, s, "Due today count")
    bullet(story, s, "Overdue count")
    bullet(story, s, "Completed count")
    bullet(story, s, "Completion rate %")

    sec(story, s, "7.4  Creating & Managing Activities")
    step(story, s, 1, "Click <b>+ New Activity</b> or go to <b>Activities → Calendar</b> and click a date.")
    step(story, s, 2, "Select the <b>Type</b> (Call, Email, Meeting, Task, Note).")
    step(story, s, 3, "Enter Subject, Due Date, Related Entity (Lead, Contact, Account, or Opportunity), and Owner.")
    step(story, s, 4, "Click <b>Save</b>.")
    body(story, s,
         "To mark an activity as complete, click the <b>Mark Complete</b> action in the table. "
         "Related entity links are clickable — you can navigate directly to the linked lead, contact, or opportunity.")

    # ═══════════════════════════════════════════
    # CHAPTER 8 – DECISION ENGINE & APPROVALS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Decision Engine & Approvals", 8)
    badge(story, MGMT_ROLES, W)

    sec(story, s, "8.1  Decision Inbox Overview")
    body(story, s,
         "The <b>Decision Inbox</b> is a centralized approval workflow system for opportunity-related decisions. "
         "Access it via <b>Decision Inbox</b> in the sidebar. It has five tab-based views:")
    dec_tabs = [
        ['Tab', 'Purpose', 'Who Uses It'],
        ['Inbox', 'All items requiring your attention', 'All with approvals permission'],
        ['Approvals', 'Items specifically pending your approval', 'Approvers / Managers+'],
        ['AI Reviews', 'Items with AI-assisted decision drafts', 'Approvers / Managers+'],
        ['Policies & SLA', 'Configure approval routing, thresholds, escalation', 'Administrators'],
        ['Decision History', 'Audit trail of all past decisions', 'Viewers with auditView'],
    ]
    story.append(make_table(dec_tabs, col_widths=[W * 0.16, W * 0.46, W * 0.38]))
    story.append(Spacer(1, 3 * mm))

    sec(story, s, "8.2  Approval Queue Views")
    body(story, s, "Within the Inbox and Approvals tabs, you can switch between queue views:")
    bullet(story, s, "<b>My Queue</b> — items assigned to you personally")
    bullet(story, s, "<b>Team Queue</b> — items assigned to anyone on your team")
    bullet(story, s, "<b>Attention</b> — items escalated or overdue")
    bullet(story, s, "<b>Completed</b> — items you've already acted on")
    body(story, s, "Additional filters: Status (All / Pending / Approved / Rejected), Purpose (All / Close / Discount), Search.")

    sec(story, s, "8.3  Approving, Rejecting & Delegating")
    subsec(story, s, "Approving")
    body(story, s, "Required permission: <b>opportunitiesApprovalsApprove</b>")
    step(story, s, 1, "Open an approval item from the queue.")
    step(story, s, 2, "Review the opportunity details, amount, stage, and any AI-generated draft.")
    step(story, s, 3, "Add optional notes explaining your decision.")
    step(story, s, 4, "Click <b>Approve</b>.")

    subsec(story, s, "Rejecting")
    step(story, s, 1, "Open the approval item.")
    step(story, s, 2, "Add required rejection notes (explaining why).")
    step(story, s, 3, "Click <b>Reject</b>.")

    subsec(story, s, "Delegating")
    body(story, s,
         "If the decision falls outside your authority, click <b>Delegate</b> and select another approver. "
         "The item moves to their queue with your delegation notes attached.")

    subsec(story, s, "Override")
    badge(story, ADMIN_DIR, W)
    body(story, s,
         "Directors and Administrators with <b>opportunitiesApprovalsOverride</b> permission can override a rejected or "
         "pending decision, bypassing the normal approval chain.")

    sec(story, s, "8.4  AI-Assisted Decision Drafts")
    body(story, s,
         "For certain approval items, the AI engine generates a <b>Decision Draft</b> with a recommendation, risk assessment, "
         "and supporting data. The draft appears in the AI Reviews tab. You can accept, modify, or discard the AI recommendation.")

    sec(story, s, "8.5  Decision History (Audit Trail)")
    badge(story, ADMIN_DIR, W)
    body(story, s,
         "The Decision History tab provides a complete audit trail: who requested, who approved/rejected, timestamps, "
         "notes, and whether AI assistance was used. This data is immutable for compliance purposes.")

    # ═══════════════════════════════════════════
    # CHAPTER 9 – AI ASSISTANT
    # ═══════════════════════════════════════════
    chapter(story, s, W, "AI Assistant", 9)
    badge(story, ALL_ROLES, W)

    sec(story, s, "9.1  How It Works")
    body(story, s,
         "North Edge CRM integrates a <b>3-tier AI fallback</b> system:")
    bullet(story, s, "<b>Tier 1 – Azure OpenAI:</b> Primary AI engine with enterprise-grade security and compliance")
    bullet(story, s, "<b>Tier 2 – OpenAI Direct:</b> Fallback if Azure OpenAI is unavailable")
    bullet(story, s, "<b>Tier 3 – Rule-Based Engine:</b> Deterministic fallback that always works, even offline")
    body(story, s,
         "This ensures AI features are <b>always available</b> — the system never fails completely because of an AI outage.")

    sec(story, s, "9.2  Insights Panel (Dashboard)")
    body(story, s,
         "The AI Insights panel on the Dashboard shows contextual KPIs and <b>Suggested Actions</b>. Each action card includes:")
    bullet(story, s, "Action description and reasoning")
    bullet(story, s, "Related entity (lead, opportunity, account)")
    bullet(story, s, "Priority level")
    bullet(story, s, "<b>Approve</b> button — executes the action (e.g., creates a task, logs an activity)")
    bullet(story, s, "<b>Undo</b> button — reverts the action within a countdown window")

    sec(story, s, "9.3  AI Reviews")
    body(story, s,
         "Request an AI Review on any approval item to get a detailed analysis. The AI evaluates deal risk, historical patterns, "
         "and recommends approve/reject with confidence scores. Reviews are logged and visible in the Decision History.")

    sec(story, s, "9.4  CQVS & Scoring")
    body(story, s,
         "The AI engine contributes to lead scoring via the CQVS framework (see Chapter 4). It analyzes buyer signals, engagement "
         "patterns, and market data to calculate Company Fit and Value severity scores. The AI scoring integrates with the "
         "<b>Assistant Action Scoring Policy</b> configured by your administrator.")

    # ═══════════════════════════════════════════
    # CHAPTER 10 – ADMINISTRATION & SETTINGS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Administration & Settings", 10)
    badge(story, ADMIN_ONLY, W)
    body(story, s,
         "The Settings area is accessible to users with <b>administrationView</b> permission (typically Administrators). "
         "It is organized into four groups:")

    sec(story, s, "10.1  People & Access")

    subsec(story, s, "User Management")
    body(story, s,
         "View, search, and manage all users. From the Users tab you can:")
    bullet(story, s, "<b>View user list</b> — name, email, role, status, last login")
    bullet(story, s, "<b>Edit user</b> — change role, set quota, toggle active/inactive, set timezone/locale")
    bullet(story, s, "<b>Invite new user</b> — enter email, select role, send invitation email with expiring token")
    bullet(story, s, "<b>Reset password flag</b> — force password change on next login")
    tip(story, s, "Deactivating a user preserves their data (leads, opportunities, activities) but prevents login.")

    subsec(story, s, "Role Management")
    body(story, s, "Create and edit roles with:")
    bullet(story, s, "<b>Name & Description</b> — human-readable role identity")
    bullet(story, s, "<b>Level</b> — numeric hierarchy level (higher = more authority)")
    bullet(story, s, "<b>Parent Role</b> — inherits permissions from parent")
    bullet(story, s, "<b>Visibility Scope</b> — Self (own data only) / Team (team data) / All (everything)")
    bullet(story, s, "<b>Permissions</b> — granular permission assignment from the 20 available keys")
    bullet(story, s, "<b>Security Level</b> — link to a security level for data access control")

    subsec(story, s, "Permission Catalog")
    body(story, s, "View all 20 permission keys with labels and descriptions. This is a read-only reference catalog.")

    subsec(story, s, "Security Levels")
    body(story, s, "Define and manage security levels that can be assigned to roles for hierarchical data access control.")

    subsec(story, s, "Dashboard Packs")
    body(story, s, "Configure which dashboard widget layouts are available to different roles or teams.")

    sec(story, s, "10.2  Workspace & Org")

    subsec(story, s, "Workspace Settings")
    body(story, s,
         "Organization-level settings including:")
    bullet(story, s, "<b>Organization name & timezone</b>")
    bullet(story, s, "<b>Currency</b>")
    bullet(story, s, "<b>Default contract term</b>")
    bullet(story, s, "<b>Lead first-touch SLA hours</b>")
    bullet(story, s, "<b>Industry preset & modules</b>")
    bullet(story, s, "<b>Qualification & scoring policies</b> (JSON-based)")
    bullet(story, s, "<b>Decision escalation policy</b>")
    bullet(story, s, "<b>Dashboard layout defaults</b>")

    subsec(story, s, "Tenant Configuration")
    badge(story, ADMIN_ONLY, W)
    body(story, s,
         "For multi-tenant deployments: view tenants, create new tenants, configure per-tenant policies. "
         "Requires <b>tenantsView / tenantsManage</b> permissions.")

    sec(story, s, "10.3  Workflow & Rules")

    subsec(story, s, "Approval Workflow")
    body(story, s,
         "Configure who can approve what, routing rules, and thresholds. Define:")
    bullet(story, s, "Approval purpose types (Close, Discount)")
    bullet(story, s, "Amount thresholds for auto-approval vs. manual review")
    bullet(story, s, "Routing chains (who approves first, second, etc.)")
    bullet(story, s, "Escalation timing (how long before auto-escalation to next approver)")

    subsec(story, s, "Notification Rules")
    body(story, s,
         "Configure notification templates and triggers. Define which events send notifications, "
         "recipient rules, and notification content. The system uses background workers (NotificationAlertWorker) "
         "to process and deliver notifications.")

    subsec(story, s, "Lead Assignment Rules")
    body(story, s,
         "Configure how new leads are assigned to sales reps. Options include round-robin, geography-based, "
         "capacity-based, or manual assignment. Requires <b>leadsManage</b> permission.")

    subsec(story, s, "Qualification Policy & Thresholds")
    body(story, s,
         "Define the scoring weights, thresholds, and rules for lead qualification. "
         "Configure what CQVS scores trigger auto-qualification, auto-disqualification, or manual review.")

    subsec(story, s, "Opportunity Automation")
    body(story, s,
         "Define stage-based automation rules — what happens automatically when an opportunity moves to a specific stage "
         "(e.g., create follow-up task, send notification, trigger approval request).")

    sec(story, s, "10.4  Trust & Audit")

    subsec(story, s, "Audit Log")
    badge(story, ADMIN_DIR, W)
    body(story, s,
         "The Audit Log provides a searchable, filterable record of all significant system actions: "
         "logins, data changes, permission updates, approval decisions, and configuration changes. "
         "Requires <b>auditView</b> permission. Data is immutable — audit records cannot be modified or deleted.")

    # ═══════════════════════════════════════════
    # CHAPTER 11 – PERMISSION REFERENCE
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Role Permissions Reference", 11)

    sec(story, s, "11.1  Complete Permission Matrix")
    body(story, s,
         "The following matrix shows which permissions are typically assigned to each predefined role. "
         "Your administrator may customize these for your organization.")
    perm_data = [
        ['Permission Key', 'Sales Rep', 'Sales Mgr', 'Director', 'Admin'],
        ['Dashboard: View', '✓', '✓', '✓', '✓'],
        ['Customers: View', '✓', '✓', '✓', '✓'],
        ['Customers: Manage', '✓', '✓', '✓', '✓'],
        ['Contacts: View', '✓', '✓', '✓', '✓'],
        ['Contacts: Manage', '✓', '✓', '✓', '✓'],
        ['Leads: View', '✓', '✓', '✓', '✓'],
        ['Leads: Manage', '✓', '✓', '✓', '✓'],
        ['Opportunities: View', '✓', '✓', '✓', '✓'],
        ['Opportunities: Manage', '✓', '✓', '✓', '✓'],
        ['Approvals: Request', '✓', '✓', '✓', '✓'],
        ['Approvals: Approve', '—', '✓', '✓', '✓'],
        ['Approvals: Override', '—', '—', '✓', '✓'],
        ['Activities: View', '✓', '✓', '✓', '✓'],
        ['Activities: Manage', '✓', '✓', '✓', '✓'],
        ['Administration: View', '—', '—', '—', '✓'],
        ['Administration: Manage', '—', '—', '—', '✓'],
        ['Audit: View', '—', '—', '✓', '✓'],
        ['Tenants: View', '—', '—', '—', '✓'],
        ['Tenants: Manage', '—', '—', '—', '✓'],
    ]
    story.append(make_table(perm_data, col_widths=[W * 0.32, W * 0.17, W * 0.17, W * 0.17, W * 0.17]))
    story.append(Spacer(1, 3 * mm))
    tip(story, s,
        "The '✓' indicates the permission is typically granted. '—' means not granted by default. "
        "Administrators can customize any role's permissions.")

    sec(story, s, "11.2  Visibility Scopes")
    vis_data = [
        ['Scope', 'Data Visible', 'Typical Role'],
        ['Self', 'Only records owned by you', 'Sales Rep'],
        ['Team', 'Records owned by you + your team members', 'Sales Manager'],
        ['All', 'All records across the organization', 'Director / VP, Administrator'],
    ]
    story.append(make_table(vis_data, col_widths=[W * 0.15, W * 0.55, W * 0.30]))
    story.append(Spacer(1, 3 * mm))
    body(story, s,
         "Visibility scope affects which records appear in list pages (Customers, Leads, Opportunities, Contacts, Activities) "
         "and Dashboard widgets. A Sales Rep with <b>Self</b> scope only sees their own records; a Manager with <b>Team</b> scope "
         "sees records for all reps on their team.")

    sec(story, s, "11.3  Role Hierarchy")
    body(story, s,
         "Roles form a parent-child hierarchy. A parent role <b>inherits all permissions</b> of its child roles plus any "
         "additional permissions assigned directly. Example hierarchy:")
    bullet(story, s, "<b>Administrator</b> (Level 100, All scope)")
    bullet(story, s, "  └─ <b>Director / VP</b> (Level 80, All scope)")
    bullet(story, s, "      └─ <b>Sales Manager</b> (Level 60, Team scope)")
    bullet(story, s, "          └─ <b>Sales Rep</b> (Level 40, Self scope)")
    body(story, s,
         "The <b>Level</b> number determines hierarchy order. Higher levels have more authority. "
         "The <b>HierarchyPath</b> field tracks the full path (e.g., '/Admin/Director/Manager/Rep') for ancestry queries.")

    # ═══════════════════════════════════════════
    # CHAPTER 12 – TIPS & SHORTCUTS
    # ═══════════════════════════════════════════
    chapter(story, s, W, "Keyboard Shortcuts & Tips", 12)
    badge(story, ALL_ROLES, W)

    sec(story, s, "12.1  Power User Tips")
    bullet(story, s, "<b>Inline Editing:</b> Click directly on Status or Owner columns in list tables to change values without opening the edit form.")
    bullet(story, s, "<b>Dashboard Card Reorder:</b> Drag and drop KPI cards on the Dashboard to customize your layout. Your arrangement persists.")
    bullet(story, s, "<b>Quick Filters:</b> Use the segment filter on the Customers page to quickly find records needing follow-up.")
    bullet(story, s, "<b>Lead Pipeline View:</b> Switch to Kanban mode for a visual overview of your lead pipeline.")
    bullet(story, s, "<b>Priority Stream:</b> Check the Priority Stream first thing each morning — it surfaces the most urgent items across all modules.")
    bullet(story, s, "<b>Calendar View:</b> Use the Activities Calendar for weekly planning — click days to see scheduled items.")
    bullet(story, s, "<b>Bulk Operations:</b> Multi-select records, then use the bulk action bar. This is much faster than editing one by one.")
    bullet(story, s, "<b>CSV Import:</b> Prepare your CSV with the exact column headers the system expects. The import runs in the background.")
    bullet(story, s, "<b>AI Actions:</b> Don't ignore AI suggested actions — they surface insights from your data you might miss.")
    bullet(story, s, "<b>CQVS Scores:</b> Focus on leads with high CQVS scores and green dimensions. These have the highest conversion probability.")
    bullet(story, s, "<b>Coaching (Managers):</b> Use the Coach Drawer and Pipeline Health dashboard to identify reps who need guidance.")
    bullet(story, s, "<b>Delegation:</b> If an approval is outside your authority, delegate it rather than leaving it pending.")

    sec(story, s, "12.2  Common Workflows by Role")

    subsec(story, s, "Sales Rep Daily Workflow")
    step(story, s, 1, "Log in → <b>Dashboard</b> → Check Priority Stream for overdue tasks and new leads.")
    step(story, s, 2, "Process overdue tasks first, then due-today items.")
    step(story, s, 3, "Review <b>Newly Assigned Leads</b> → log first-touch activity within SLA window.")
    step(story, s, 4, "Check <b>At-Risk Deals</b> → schedule next steps for stalled opportunities.")
    step(story, s, 5, "Log all activities (calls, emails, meetings) to keep your pipeline data fresh.")
    step(story, s, 6, "Review AI Suggested Actions → approve relevant ones.")

    subsec(story, s, "Sales Manager Daily Workflow")
    step(story, s, 1, "Log in → <b>Dashboard</b> → Check <b>Manager Pipeline Health</b> section.")
    step(story, s, 2, "Review <b>Missing Next Step</b> and <b>Stuck in Stage</b> deals → coach reps.")
    step(story, s, 3, "Process <b>Decision Inbox</b> → approve/reject pending approvals.")
    step(story, s, 4, "Check SLA compliance → follow up on reps with overdue first-touch.")
    step(story, s, 5, "Review <b>At-Risk Deals</b> across the team → open coaching dialogs.")
    step(story, s, 6, "Use bulk actions to reassign leads if a rep is overloaded.")

    subsec(story, s, "Administrator Weekly Workflow")
    step(story, s, 1, "Review <b>Audit Log</b> for unusual activity or security events.")
    step(story, s, 2, "Check user accounts → deactivate departed employees, resend expired invites.")
    step(story, s, 3, "Review role permissions → ensure roles match org structure.")
    step(story, s, 4, "Verify approval workflow thresholds → adjust if business rules change.")
    step(story, s, 5, "Update lead assignment rules if territory or team structure changed.")
    step(story, s, 6, "Review qualification policies → tune CQVS weights if conversion quality is off.")

    # ═══════════════════════════════════════════
    # END CARD
    # ═══════════════════════════════════════════
    story.append(PageBreak())
    story.append(Spacer(1, 60 * mm))
    story.append(GradientBar(W, 3))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "End of User Guide — North Edge CRM Comprehensive Reference",
        s['Footer']
    ))
    story.append(Paragraph(
        f"Generated {datetime.now().strftime('%B %d, %Y')}  •  North Edge System  •  Toronto, Canada  •  www.northedgesystem.com",
        s['Footer']
    ))
    story.append(Paragraph("Classification: Internal – All Staff", s['Footer']))

    # ── Build ──
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    return OUTPUT_PATH


if __name__ == "__main__":
    path = build_pdf()
    print(f"✅ PDF generated: {path}")
    print(f"   Size: {os.path.getsize(path) // 1024} KB")
