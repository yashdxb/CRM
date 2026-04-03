#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
from datetime import datetime
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PATH = OUTPUT_DIR / "North_Edge_CRM_Customer_Dossier.pdf"

DOC_VERSION = "1.0"
PRODUCT = "North Edge CRM"
ORG = "North Edge System"
WEBSITE = "www.northedgesystem.com"

PAGE = landscape(A4)
PAGE_WIDTH, PAGE_HEIGHT = PAGE

SLATE_900 = HexColor("#0F172A")
SLATE_800 = HexColor("#1E293B")
SLATE_700 = HexColor("#334155")
SLATE_500 = HexColor("#64748B")
SLATE_300 = HexColor("#CBD5E1")
SLATE_200 = HexColor("#E2E8F0")
SLATE_100 = HexColor("#F8FAFC")
INDIGO = HexColor("#4F46E5")
BLUE = HexColor("#2563EB")
CYAN = HexColor("#0891B2")
EMERALD = HexColor("#059669")
AMBER = HexColor("#D97706")
ROSE = HexColor("#E11D48")
INDIGO_BG = HexColor("#EEF2FF")
BLUE_BG = HexColor("#EFF6FF")
MINT_BG = HexColor("#ECFDF5")
AMBER_BG = HexColor("#FFFBEB")
ROSE_BG = HexColor("#FFF1F2")


def load_module(script_name: str):
    path = Path(__file__).with_name(script_name)
    spec = importlib.util.spec_from_file_location(path.stem, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


benchmark = load_module("generate_current_codebase_benchmark_pdf.py")
inventory = load_module("generate_feature_inventory_pdf.py")


def build_styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("CoverEyebrow", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=CYAN, spaceAfter=4))
    s.add(ParagraphStyle("CoverTitle", fontName="Helvetica-Bold", fontSize=28, leading=32, textColor=SLATE_900, spaceAfter=6))
    s.add(ParagraphStyle("CoverSubtitle", fontName="Helvetica", fontSize=11.5, leading=16, textColor=SLATE_700, spaceAfter=8))
    s.add(ParagraphStyle("Meta", fontName="Helvetica", fontSize=8, leading=10, textColor=SLATE_500, spaceAfter=2))
    s.add(ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=INDIGO, spaceBefore=6, spaceAfter=6))
    s.add(ParagraphStyle("Body", fontName="Helvetica", fontSize=8.8, leading=12, textColor=SLATE_700, spaceAfter=4))
    s.add(ParagraphStyle("Small", fontName="Helvetica", fontSize=7.4, leading=9.6, textColor=SLATE_500, spaceAfter=2))
    s.add(ParagraphStyle("Label", fontName="Helvetica-Bold", fontSize=8.1, leading=10, textColor=SLATE_800, spaceAfter=2))
    s.add(ParagraphStyle("BandTitle", fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=white))
    s.add(ParagraphStyle("BandText", fontName="Helvetica", fontSize=8.6, leading=11.5, textColor=SLATE_700))
    s.add(ParagraphStyle("CardTitle", fontName="Helvetica-Bold", fontSize=8.5, leading=10.5, textColor=SLATE_800))
    s.add(ParagraphStyle("CardValue", fontName="Helvetica-Bold", fontSize=17, leading=20, textColor=SLATE_900))
    return s


def p(text: str, style) -> Paragraph:
    return Paragraph(text.replace("\n", "<br/>"), style)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(SLATE_200)
    canvas.line(14 * mm, 10 * mm, PAGE_WIDTH - 14 * mm, 10 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE_500)
    canvas.drawString(14 * mm, 5.5 * mm, f"{PRODUCT} Customer Dossier")
    canvas.drawRightString(PAGE_WIDTH - 14 * mm, 5.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def band(title: str, detail: str, s) -> Table:
    t = Table([[p(title, s["BandTitle"])], [p(detail, s["BandText"])]], colWidths=[254 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
                ("BACKGROUND", (0, 1), (-1, -1), INDIGO_BG),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("TOPPADDING", (0, 0), (-1, 0), 8),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                ("TOPPADDING", (0, 1), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 1), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return t


def bullet_block(title: str, items: list[str], s, bg, width_mm: float = 126) -> Table:
    rows = [[p(title, s["Label"])]]
    for item in items:
        rows.append([p(f"- {item}", s["Body"])])
    t = Table(rows, colWidths=[width_mm * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return t


def compact_bullet_block(title: str, items: list[str], s, bg, width_mm: float = 126) -> Table:
    rows = [[p(title, s["Label"])]]
    for item in items:
        rows.append([p(f"- {item}", s["Small"])])
    t = Table(rows, colWidths=[width_mm * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def metric_cards(s, metrics: list[tuple[str, str, str]]) -> Table:
    backgrounds = [BLUE_BG, MINT_BG, AMBER_BG, INDIGO_BG]
    row = []
    for idx, (title, value, caption) in enumerate(metrics[:4]):
        inner = Table(
            [[p(value, s["CardValue"])], [p(title, s["CardTitle"])], [p(caption, s["Small"])]],
            colWidths=[58 * mm],
        )
        inner.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), backgrounds[idx]),
                    ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                    ("TOPPADDING", (0, 0), (-1, -1), 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ]
            )
        )
        row.append(inner)
    return Table([row], colWidths=[62 * mm] * len(row), style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))


def benchmark_table(rows_data, s) -> Table:
    rows = [[
        p("Dimension", s["Label"]),
        p("Salesforce", s["Label"]),
        p("Dynamics 365", s["Label"]),
        p("HubSpot", s["Label"]),
        p("Zoho CRM", s["Label"]),
        p("North Edge CRM", s["Label"]),
        p("North Edge CRM position", s["Label"]),
    ]]
    for row in rows_data:
        rows.append([p(str(cell), s["Body"]) for cell in row])
    t = Table(rows, colWidths=[40 * mm, 18 * mm, 18 * mm, 18 * mm, 18 * mm, 22 * mm, 120 * mm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INDIGO_BG),
                ("TEXTCOLOR", (0, 0), (-1, 0), INDIGO),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, SLATE_100]),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("GRID", (0, 0), (-1, -1), 0.25, SLATE_200),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def competitor_section(name: str, section: dict[str, list[str]], s) -> Table:
    t = Table(
        [
            [p(f"vs {name}", s["Section"])],
            [Table([[
                compact_bullet_block("Where it is broader", section["strengths"], s, BLUE_BG),
                compact_bullet_block("Where it is weaker", section["weaknesses"], s, ROSE_BG),
            ]], colWidths=[126 * mm, 126 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))],
            [compact_bullet_block("Where North Edge CRM is sharper", section["north_edge"], s, MINT_BG, 254)],
        ],
        colWidths=[254 * mm],
    )
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return t


def module_table(modules: list[dict], s) -> Table:
    rows = [[
        p("Module", s["Label"]),
        p("Core features", s["Label"]),
        p("Advanced / unique", s["Label"]),
        p("Key user actions", s["Label"]),
    ]]
    for module in modules:
        adv = module["advanced"][:3] + module["unique"][:1]
        rows.append([
            p(module["name"], s["Body"]),
            p("<br/>".join(f"- {x}" for x in module["core"][:5]), s["Small"]),
            p("<br/>".join(f"- {x}" for x in adv), s["Small"]),
            p("<br/>".join(f"- {x}" for x in module["actions"][:5]), s["Small"]),
        ])
    t = Table(rows, colWidths=[33 * mm, 78 * mm, 78 * mm, 65 * mm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), MINT_BG),
                ("TEXTCOLOR", (0, 0), (-1, 0), EMERALD),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, SLATE_100]),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("GRID", (0, 0), (-1, -1), 0.25, SLATE_200),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def two_col(left: Table, right: Table) -> Table:
    return Table([[left, right]], colWidths=[126 * mm, 126 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))


def stack_table(items: list[tuple[str, str]], s, bg) -> Table:
    rows = [[p("Item", s["Label"]), p("Current use", s["Label"])]]
    for name, detail in items:
        rows.append([p(name, s["Body"]), p(detail, s["Small"])])
    t = Table(rows, colWidths=[70 * mm, 56 * mm], repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), bg),
                ("BOX", (0, 0), (-1, -1), 0.5, SLATE_300),
                ("GRID", (0, 0), (-1, -1), 0.25, SLATE_200),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return t


def build() -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    s = build_styles()
    metrics = benchmark.codebase_metrics()
    stack = benchmark.current_stack()
    azure = inventory.azure_services()

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=PAGE,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=f"{PRODUCT} Customer Dossier",
        author="Codex",
    )

    story = []
    story.append(p("Customer Dossier", s["CoverEyebrow"]))
    story.append(p(f"{PRODUCT}<br/>Current Capability, Competitive Positioning, and Architecture Overview", s["CoverTitle"]))
    story.append(
        p(
            "Single customer-facing document that combines current implemented capability, competitive positioning, technical architecture, and clearly separated documented future expansion themes.",
            s["CoverSubtitle"],
        )
    )
    story.append(p(f"Organization: {ORG}", s["Meta"]))
    story.append(p(f"Website: {WEBSITE}", s["Meta"]))
    story.append(p(f"Document version: {DOC_VERSION}", s["Meta"]))
    story.append(p(f"Generated: {datetime.now().strftime('%B %d, %Y %I:%M %p')}", s["Meta"]))
    story.append(p("Audience: enterprise buyers, sponsors, presales, technical evaluators", s["Meta"]))
    story.append(Spacer(1, 6 * mm))
    story.append(metric_cards(s, metrics))

    story.append(PageBreak())
    story.append(band("1. Executive Summary", "Lead with what North Edge CRM is, why it matters, and where it is intentionally focused.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("What North Edge CRM is", benchmark.EXECUTIVE_SUMMARY, s, BLUE_BG),
        bullet_block("What the buyer should know first", [
            "This document uses current implemented capability only for the product sections.",
            "Future plan is included only in a dedicated later section and is clearly labeled as not current scope.",
            "North Edge CRM should be evaluated as a governed execution CRM, not as an ecosystem-breadth platform.",
        ], s, AMBER_BG)
    ))

    story.append(PageBreak())
    story.append(band("2. Why Buyers Choose North Edge CRM", "North Edge CRM is strongest when the buying criteria emphasize control, discipline, accountability, and embedded operations.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("Primary reasons to choose North Edge CRM", benchmark.WHY_BUYERS_CHOOSE, s, MINT_BG),
        bullet_block("Where it is not competing", benchmark.NOT_COMPETING, s, ROSE_BG)
    ))
    story.append(Spacer(1, 6 * mm))
    story.append(bullet_block("What this means commercially", benchmark.COMMERCIAL_IMPACT, s, INDIGO_BG, 254))

    story.append(PageBreak())
    story.append(band("3. Benchmark Framework and Competitive Position", "Use a practical operating-model lens rather than a broad ecosystem or market-share lens.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("Evaluation dimensions", benchmark.DIMENSIONS[:6], s, INDIGO_BG),
        bullet_block("Evaluation dimensions", benchmark.DIMENSIONS[6:], s, BLUE_BG)
    ))
    story.append(Spacer(1, 5 * mm))
    story.append(benchmark_table(benchmark.BENCHMARK_ROWS[:5], s))

    story.append(PageBreak())
    story.append(band("4. Benchmark Matrix (continued)", "Continuation of the current-state benchmark across platform, AI, integration, and enterprise-readiness dimensions.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(benchmark_table(benchmark.BENCHMARK_ROWS[5:], s))

    story.append(PageBreak())
    story.append(band("5. Competitive Positioning", "Large suites are broader. North Edge CRM is sharper where approval control, evidence, risk guidance, and reviewability matter.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(competitor_section("Salesforce", benchmark.COMPETITIVE_POSITIONING["Salesforce"], s))
    story.append(Spacer(1, 5 * mm))
    story.append(competitor_section("Microsoft Dynamics 365", benchmark.COMPETITIVE_POSITIONING["Dynamics 365"], s))

    story.append(PageBreak())
    story.append(band("6. Competitive Positioning", "North Edge CRM is also differentiated against growth-oriented and value-oriented CRM suites by execution depth and architectural clarity.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(competitor_section("HubSpot", benchmark.COMPETITIVE_POSITIONING["HubSpot"], s))
    story.append(Spacer(1, 5 * mm))
    story.append(competitor_section("Zoho CRM", benchmark.COMPETITIVE_POSITIONING["Zoho CRM"], s))

    story.append(PageBreak())
    story.append(band("7. Current Implemented Module Capabilities", "This section is current implemented system scope, not future intent.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(module_table(inventory.MODULES[:6], s))

    story.append(PageBreak())
    story.append(band("8. Current Implemented Module Capabilities", "Continuation of current implemented module scope across risk, marketing, support, reporting, and mailbox.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(module_table(inventory.MODULES[6:], s))

    story.append(PageBreak())
    story.append(band("9. Cross-Platform Current Capabilities", "These are current shared operating capabilities that cut across the product, not module-specific roadmap claims.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("Workflow and approvals", inventory.CROSS_PLATFORM["Workflow & approvals"], s, BLUE_BG),
        bullet_block("Notifications and reporting", inventory.CROSS_PLATFORM["Notifications"] + inventory.CROSS_PLATFORM["Reporting"], s, MINT_BG)
    ))

    story.append(PageBreak())
    story.append(band("9. Cross-Platform Current Capabilities (continued)", "Continuation of current shared operating capabilities across AI, security, and multi-tenancy.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("AI features", inventory.CROSS_PLATFORM["AI features"], s, INDIGO_BG),
        bullet_block("Security, roles, and multi-tenancy", inventory.CROSS_PLATFORM["Security & roles"] + inventory.CROSS_PLATFORM["Multi-tenancy"], s, BLUE_BG)
    ))

    story.append(PageBreak())
    story.append(band("10. Current Technical Architecture", "The platform story should remain current-state and evidence-based: APIs, integrations, realtime services, and Azure foundation.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("APIs and integrations", inventory.TECHNICAL["APIs"] + inventory.TECHNICAL["Integrations"], s, INDIGO_BG),
        bullet_block("Realtime and Azure services", inventory.TECHNICAL["Real-time features"], s, BLUE_BG)
    ))
    story.append(Spacer(1, 5 * mm))
    azure_left = stack_table(azure[:5], s, MINT_BG)
    azure_right = stack_table(azure[5:], s, TEAL_BG if 'TEAL_BG' in globals() else BLUE_BG)
    story.append(Table([[azure_left, azure_right]], colWidths=[126 * mm, 126 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")])))

    story.append(PageBreak())
    story.append(band("11. Current Stack and Evidence Basis", "Technical proof is included here for diligence, without changing the product-positioning story.", s))
    story.append(Spacer(1, 5 * mm))
    left_stack = stack_table([
        ("Angular", stack["Angular"]),
        ("PrimeNG", stack["PrimeNG"]),
        ("TypeScript", stack["TypeScript"]),
        (".NET", stack[".NET"]),
        ("EF Core", stack["EF Core"]),
        ("MSAL Browser", stack["MSAL Browser"]),
    ], s, BLUE_BG)
    right_stack = stack_table([
        ("Azure SignalR", stack["Azure SignalR"]),
        ("Azure Communication Email", stack["Azure Communication Email"]),
        ("Azure Service Bus", stack["Azure Service Bus"]),
        ("Redis Cache", stack["Redis Cache"]),
        ("Telerik Reporting", stack["Telerik Reporting"]),
        ("Telerik Angular Report Viewer", stack["Telerik Angular Report Viewer"]),
    ], s, AMBER_BG)
    story.append(Table([[left_stack, right_stack]], colWidths=[126 * mm, 126 * mm], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")])))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("Current AI implementation", benchmark.AI_IMPLEMENTATION, s, MINT_BG),
        bullet_block("Current AI positioning guardrails", benchmark.AI_LIMITS, s, ROSE_BG)
    ))

    story.append(PageBreak())
    story.append(band("12. Documented Future Plan (Not Current Scope)", "Everything in this section is documented future direction only and should not be sold as current capability.", s))
    story.append(Spacer(1, 5 * mm))
    story.append(two_col(
        bullet_block("Documented future expansion", benchmark.FUTURE_EXPANSION, s, AMBER_BG),
        bullet_block("Positioning guardrail for future plan", [
            "Keep future themes clearly separate from current implemented capability in customer conversations.",
            "Use this section to show product direction, not to imply present-day parity.",
            "Lead with current strengths; use future direction only when it helps explain the platform trajectory.",
        ], s, INDIGO_BG)
    ))
    story.append(Spacer(1, 5 * mm))
    story.append(bullet_block("Method and evidence basis", [
        "Current product and architecture sections are generated from the current codebase benchmark and feature inventory sources.",
        "Competitor set is fixed to Salesforce, Microsoft Dynamics 365, HubSpot, and Zoho CRM.",
        "Future themes are taken only from documented, explicitly labeled future expansion sections already maintained in the current benchmark source.",
    ], s, BLUE_BG, 254))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return OUTPUT_PATH


if __name__ == "__main__":
    path = build()
    print(f"Generated {path}")
