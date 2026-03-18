#!/usr/bin/env python3
from __future__ import annotations

import copy
import json
from pathlib import Path

from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer

import generate_leo_martin_combined_pdf as base


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "anastasiia-zaher-lead-cycle.pdf"
RESULTS_TEMPLATE = ROOT / "output" / "uat" / "leo-martin-lead-cycle-results.json"

DOCUMENT_VERSION = "1.1"
USER_NAME = "Anastasiia Zaher"
ROLE_NAME = "Sales Rep"
VERSION_UPDATE_SUMMARY = (
    "Derived from version 1.0. This version is tailored for Anastasiia Zaher, replaces the lead dataset "
    "with a new realistic set of companies and contacts, preserves the latest qualification-scoring and "
    "lifecycle coverage scope, and converts the result section into a fresh execution template."
)

TENANT_KEY = "default"

SCENARIO_IDENTITIES = [
    {
        "first": "Sofia",
        "last": "Bennett",
        "company": "Meridian Lane Advisory",
        "email": "sofia.bennett@meridianlaneadvisory.com",
        "phone": "+1 (647) 555-0101",
        "job_title": "Executive Assistant",
        "source": "Website",
    },
    {
        "first": "Tarek",
        "last": "Faris",
        "company": "Westport Industrial Realty",
        "email": "tarek.faris@westportindustrial.com",
        "phone": "+1 (647) 555-0102",
        "job_title": "Operations Coordinator",
        "source": "Inbound Call",
    },
    {
        "first": "Nadia",
        "last": "Petrenko",
        "company": "Alderstone Holdings",
        "email": "nadia.petrenko@alderstoneholdings.com",
        "phone": "+1 (647) 555-0103",
        "job_title": "Project Analyst",
        "source": "Industry Event",
    },
    {
        "first": "Victor",
        "last": "Almeida",
        "company": "Granite Wharf Properties",
        "email": "victor.almeida@granitewharf.com",
        "phone": "+1 (647) 555-0104",
        "job_title": "Director of Operations",
        "source": "Referral",
    },
    {
        "first": "Isabelle",
        "last": "Laurent",
        "company": "Sterling Harbor Capital",
        "email": "isabelle.laurent@sterlingharborcapital.com",
        "phone": "+1 (647) 555-0105",
        "job_title": "VP of Asset Operations",
        "source": "Executive Referral",
    },
    {
        "first": "Diego",
        "last": "Romero",
        "company": "Parkline Commercial Group",
        "email": "diego.romero@parklinecommercial.com",
        "phone": "+1 (647) 555-0106",
        "job_title": "Portfolio Director",
        "source": "Partner Referral",
    },
    {
        "first": "Mei",
        "last": "Chen",
        "company": "Harbour Gate Management",
        "email": "mei.chen@harbourgate.ca",
        "phone": "+1 (647) 555-0107",
        "job_title": "Operations Lead",
        "source": "Partner Referral",
    },
    {
        "first": "Samir",
        "last": "Khoury",
        "company": "Cedar Peak Trust",
        "email": "samir.khoury@cedarpeaktrust.com",
        "phone": "+1 (647) 555-0108",
        "job_title": "Regional Operations Manager",
        "source": "Website",
    },
    {
        "first": "Klara",
        "last": "Nyberg",
        "company": "Northfield Transit Services",
        "email": "klara.nyberg@northfieldtransit.com",
        "phone": "+1 (647) 555-0109",
        "job_title": "Business Analyst",
        "source": "Outbound Prospecting",
    },
    {
        "first": "Adrian",
        "last": "Wells",
        "company": "Eastbridge Harbour Group",
        "email": "adrian.wells@eastbridgeharbour.com",
        "phone": "+1 (647) 555-0110",
        "job_title": "Director of Portfolio Systems",
        "source": "Referral",
    },
    {
        "first": "Camila",
        "last": "Duarte",
        "company": "Brookhaven Estates",
        "email": "camila.duarte@brookhavenestates.com",
        "phone": "+1 (647) 555-0111",
        "job_title": "Operations Supervisor",
        "source": "Inbound Call",
    },
    {
        "first": "Ethan",
        "last": "Rowe",
        "company": "Ridgeview Logistics Park",
        "email": "ethan.rowe@ridgeviewlogistics.com",
        "phone": "+1 (647) 555-0112",
        "job_title": "Site Coordinator",
        "source": "Website",
    },
    {
        "first": "Layla",
        "last": "Mansour",
        "company": "Shoreline Retail Partners",
        "email": "layla.mansour@shorelineretail.com",
        "phone": "+1 (647) 555-0113",
        "job_title": "Operations Manager",
        "source": "Industry Event",
    },
]


def load_results_template() -> dict:
    return json.loads(RESULTS_TEMPLATE.read_text(encoding="utf-8"))


def make_replacements(old_identity: dict[str, str], new_identity: dict[str, str]) -> dict[str, str]:
    old_full_name = f"{old_identity['first']} {old_identity['last']}"
    new_full_name = f"{new_identity['first']} {new_identity['last']}"
    return {
        old_full_name: new_full_name,
        old_identity["first"]: new_identity["first"],
        old_identity["last"]: new_identity["last"],
        old_identity["company"]: new_identity["company"],
        old_identity["email"]: new_identity["email"],
        old_identity["phone"]: new_identity["phone"],
        old_identity["job_title"]: new_identity["job_title"],
        old_identity["source"]: new_identity["source"],
        "Leo Martin": USER_NAME,
        "Leo Martin, Sales Rep": f"{USER_NAME}, {ROLE_NAME}",
    }


def replace_text(value: str, replacements: dict[str, str]) -> str:
    updated = value
    for old, new in replacements.items():
        updated = updated.replace(old, new)
    return updated


def transform_rows(rows: list[tuple[str, str]], replacements: dict[str, str], new_identity: dict[str, str]) -> list[tuple[str, str]]:
    transformed = []
    for key, value in rows:
        if key == "First Name":
            transformed.append((key, new_identity["first"]))
        elif key == "Last Name":
            transformed.append((key, new_identity["last"]))
        elif key == "Company":
            transformed.append((key, new_identity["company"]))
        elif key == "Email":
            transformed.append((key, new_identity["email"]))
        elif key == "Phone":
            transformed.append((key, new_identity["phone"]))
        elif key == "Job Title":
            transformed.append((key, new_identity["job_title"]))
        elif key == "Source":
            transformed.append((key, new_identity["source"]))
        else:
            transformed.append((key, replace_text(value, replacements)))
    return transformed


def transform_steps(steps: list[str], replacements: dict[str, str]) -> list[str]:
    updated_steps = [replace_text(step, replacements) for step in steps]
    return [
        step.replace("If Assignment is visible, keep Assignment as Manual and set Owner to Anastasiia Zaher.", "If Assignment is visible, keep Assignment as Manual and set Owner to Anastasiia Zaher.")
        for step in updated_steps
    ]


def transform_scenarios() -> list[dict]:
    scenarios = copy.deepcopy(base.SCENARIOS)
    transformed = []
    for index, scenario in enumerate(scenarios):
        lead_rows = dict(scenario["lead"])
        old_identity = {
            "first": lead_rows.get("First Name", ""),
            "last": lead_rows.get("Last Name", ""),
            "company": lead_rows.get("Company", ""),
            "email": lead_rows.get("Email", ""),
            "phone": lead_rows.get("Phone", ""),
            "job_title": lead_rows.get("Job Title", ""),
            "source": lead_rows.get("Source", ""),
        }
        new_identity = SCENARIO_IDENTITIES[index]
        replacements = make_replacements(old_identity, new_identity)

        scenario["objective"] = replace_text(scenario["objective"], replacements)
        scenario["lead"] = transform_rows(scenario["lead"], replacements, new_identity)
        scenario["steps"] = transform_steps(scenario["steps"], replacements)

        for section_name in ("activity", "qualification", "conversion", "closure"):
            if section_name in scenario:
                scenario[section_name] = transform_rows(scenario[section_name], replacements, new_identity)

        transformed.append(scenario)
    return transformed


def build_story():
    styles = base.styles()
    scenarios = transform_scenarios()
    results = load_results_template()
    result_map = {scenario["scenarioName"]: scenario for scenario in results["scenarios"]}

    story = [
        Spacer(1, 0.55 * inch),
        Paragraph("Lead Cycle", styles["CoverTitle"]),
        Spacer(1, 0.14 * inch),
        base.table(
            [
                ["Document version", DOCUMENT_VERSION],
                ["Version update summary", VERSION_UPDATE_SUMMARY],
                ["Prepared for user", USER_NAME],
                ["Role", ROLE_NAME],
                ["Test execution reported by", "______________________________"],
            ],
            [2.5 * inch, 7.0 * inch],
            styles,
        ),
        Spacer(1, 0.12 * inch),
        Paragraph("1. Introduction and scope", styles["Section"]),
        Paragraph(
            "This document defines the manual validation scope for the lead lifecycle under the Sales Rep role. "
            "The purpose of this test is to confirm that lead progression, qualification discipline, conversion guardrails, "
            "closure handling, and recycle-to-nurture behavior operate correctly with realistic business data. "
            "It is intended to support structured tester execution, consistent data entry, and formal UAT recording.",
            styles["Body"],
        ),
        Paragraph(
            "This version is prepared for a fresh execution by Anastasiia Zaher. It retains the same lead lifecycle "
            "coverage model but uses a different realistic dataset so the run can be performed independently and recorded as a separate test cycle.",
            styles["Body"],
        ),
        Paragraph("2. Role and environment", styles["Section"]),
        Paragraph(
            base.bullets([
                f"User name: {USER_NAME}",
                f"Role: {ROLE_NAME}",
                f"Tenant key: {TENANT_KEY}",
                "Use Leads, Add Lead, Log activity, the status stepper, and Convert Lead exactly as named in the UI.",
                "Record the actual execution outcome in the result sections at the end of this document.",
            ]),
            styles["Body"],
        ),
        Paragraph("3. Standard creation flow", styles["Section"]),
        Paragraph(
            base.numbers([
                f"Sign in as {USER_NAME}, {ROLE_NAME}.",
                "Open the Leads workspace.",
                "Start a new lead record.",
                "On the Overview tab, enter Lead basics and Contact details exactly as shown for the scenario.",
                f"If Assignment is visible, keep Assignment as Manual and set Owner to {USER_NAME}.",
                "Save the record to create the lead.",
            ]),
            styles["Body"],
        ),
        Paragraph("4. Manual execution scenarios", styles["Section"]),
    ]

    for index, scenario in enumerate(scenarios, start=1):
        result_entry = result_map.get(scenario["title"], {})
        scenario_explanation = result_entry.get("businessIntent", scenario["objective"])
        story.extend([
            Paragraph(f"Scenario {index}: {scenario['title']}", styles["SubSection"]),
            Paragraph(f"<b>Objective:</b> {scenario['objective']}", styles["Body"]),
            Paragraph(f"<b>Scenario explanation:</b> {scenario_explanation}", styles["Body"]),
            Paragraph("<b>Execution steps:</b><br/>" + base.numbers(scenario["steps"]), styles["Body"]),
            Paragraph("<b>Lead fields:</b>", styles["Body"]),
            base.table([["Field", "Value"], *scenario["lead"]], [2.2 * inch, 7.55 * inch], styles),
        ])

        for section_name, heading in (
            ("activity", "Activity values"),
            ("qualification", "Qualification values"),
            ("conversion", "Conversion values"),
            ("closure", "Closure dialog values"),
        ):
            if section_name in scenario:
                story.extend([
                    Spacer(1, 0.06 * inch),
                    Paragraph(f"<b>{heading}:</b>", styles["Body"]),
                    base.table([["Field", "Value"], *scenario[section_name]], [2.2 * inch, 7.55 * inch], styles),
                ])
        story.append(Spacer(1, 0.14 * inch))

    story.extend([
        PageBreak(),
        Paragraph("5. UAT execution summary", styles["Section"]),
        Paragraph(
            base.bullets([
                f"Document version: {DOCUMENT_VERSION}",
                f"Prepared for user: {USER_NAME}",
                f"Role: {ROLE_NAME}",
                f"Planned scenarios: {len(scenarios)}",
                "Execution date: ______________________________",
                "Overall result: Pass / Fail / Blocked",
            ]),
            styles["Body"],
        ),
        Paragraph("6. Scenario execution matrix", styles["Section"]),
    ])

    matrix = [["Scenario", "Expected Band", "Lifecycle Target", "Expected Result", "Actual Result", "Pass/Fail"]]
    for scenario in results["scenarios"]:
        matrix.append([
            scenario["scenarioName"],
            scenario["expectedQualificationBand"],
            scenario["lifecycleTarget"],
            scenario["expectedResult"],
            "______________________________",
            "________________",
        ])
    story.append(base.table(matrix, [1.85 * inch, 0.95 * inch, 1.2 * inch, 4.55 * inch, 1.75 * inch, 0.9 * inch], styles))

    story.extend([
        Spacer(1, 0.14 * inch),
        Paragraph("7. Defect and remediation summary", styles["Section"]),
        base.table(
            [
                ["Issue", "Root cause", "Fix applied", "Retest result"],
                ["________________", "________________", "________________", "________________"],
                ["________________", "________________", "________________", "________________"],
                ["________________", "________________", "________________", "________________"],
            ],
            [2.0 * inch, 2.5 * inch, 2.5 * inch, 2.0 * inch],
            styles,
        ),
        Spacer(1, 0.14 * inch),
        Paragraph("8. Test execution report", styles["Section"]),
        base.table(
            [
                ["Test execution reported by", "______________________________"],
                ["Execution date", "______________________________"],
                ["Environment", "______________________________"],
                ["Reported issues reference", "______________________________"],
                ["General notes", "____________________________________________________________"],
            ],
            [2.5 * inch, 5.0 * inch],
            styles,
        ),
    ])
    return story


def main() -> int:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=landscape(letter),
        leftMargin=0.4 * inch,
        rightMargin=0.4 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title="Lead Cycle",
    )
    doc.build(build_story())
    print(OUTPUT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
