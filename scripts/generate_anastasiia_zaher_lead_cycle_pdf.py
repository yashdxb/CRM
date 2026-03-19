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

DOCUMENT_VERSION = "1.4"
USER_NAME = "Anastasiia Zaher"
ROLE_NAME = "Sales Rep"
VERSION_UPDATE_SUMMARY = (
    "Derived from version 1.3. This version keeps the Anastasiia Zaher dataset and retained status set, and "
    "now aligns the guide to the latest lead page where Next Lead Action is planning-only and Log activity is the "
    "only activity write path from the lead form."
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

RETAINED_STATUS_SET = [
    ("New", "Sofia Bennett", "Meridian Lane Advisory", "Keep one baseline lead visible in the initial intake state."),
    ("Contacted", "Tarek Faris", "Westport Industrial Realty", "Confirm the pipeline can visibly retain a lead after first-touch progression."),
    ("Nurture", "Nadia Petrenko", "Alderstone Holdings", "Confirm recycle and follow-up scenarios remain visible in the pipeline."),
    ("Qualified", "Victor Almeida", "Granite Wharf Properties", "Keep one validated mid-funnel lead visible for qualification review."),
    ("Converted", "Isabelle Laurent", "Sterling Harbor Capital", "Keep one successfully converted lead visible in the final closed-won lead state."),
    ("Lost", "Diego Romero", "Parkline Commercial Group", "Keep one closed-lost lead visible with a recorded outcome reason."),
    ("Disqualified", "Mei Chen", "Harbour Gate Management", "Keep one closed-disqualified lead visible with a recorded disqualification reason."),
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
        Paragraph(
            "The test pack also includes a retained status-visibility set. This is separate from lifecycle path coverage: "
            "it intentionally leaves one realistic lead in each business lead status so testers can validate that the "
            "pipeline board visibly renders every stage at the end of execution.",
            styles["Body"],
        ),
        Paragraph("2. Role and environment", styles["Section"]),
        Paragraph(
            base.bullets([
                f"User name: {USER_NAME}",
                f"Role: {ROLE_NAME}",
                f"Tenant key: {TENANT_KEY}",
                "Use Leads, Add Lead, Create Lead / Update Lead, Save Draft, Log activity, the status stepper, and Convert Lead exactly as named in the UI.",
                "Record the actual execution outcome in the result sections at the end of this document.",
            ]),
            styles["Body"],
        ),
        Paragraph("3. Retained lead status coverage", styles["Section"]),
        Paragraph(
            "Use the retained dataset below to verify that the lead pipeline displays every business status as a visible stage snapshot, "
            "not only as historical movement during execution.",
            styles["Body"],
        ),
        base.table(
            [["Lead status", "Retained lead", "Company", "Purpose"] , *RETAINED_STATUS_SET],
            [1.1 * inch, 1.6 * inch, 2.3 * inch, 5.05 * inch],
            styles,
        ),
        Paragraph("4. Exact lead form field inventory", styles["Section"]),
        base.table(base.lead_form_inventory(), [1.8 * inch, 2.55 * inch, 1.45 * inch, 4.7 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("5. Draft retrieval and save controls", styles["Section"]),
        base.table(base.draft_inventory(), [1.85 * inch, 2.55 * inch, 1.65 * inch, 4.45 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("6. Next Lead Action and activity timeline", styles["Section"]),
        base.table(base.next_action_inventory(), [1.85 * inch, 2.55 * inch, 1.65 * inch, 4.45 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("7. Qualification and outcome field inventory", styles["Section"]),
        base.table(base.qualification_inventory(), [1.95 * inch, 2.7 * inch, 1.5 * inch, 4.35 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("8. Activity form field inventory", styles["Section"]),
        base.table(base.activity_inventory(), [1.9 * inch, 2.5 * inch, 1.45 * inch, 4.65 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("9. Convert Lead field inventory", styles["Section"]),
        base.table(base.convert_inventory(), [1.95 * inch, 2.7 * inch, 1.55 * inch, 4.3 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("10. Lead lifecycle logic enforced by the current UI and code", styles["Section"]),
        base.table(base.status_logic_rows(), [1.9 * inch, 8.6 * inch], styles),
        Spacer(1, 0.12 * inch),
        Paragraph("11. Manual execution scenarios", styles["Section"]),
    ]

    for index, scenario in enumerate(scenarios, start=1):
        result_entry = result_map.get(scenario["title"], {})
        scenario_explanation = result_entry.get("businessIntent", scenario["objective"])
        lead_rows = base.scenario_lead_rows(scenario, USER_NAME)
        qualification_rows = base.scenario_qualification_rows(scenario)
        activity_rows = base.scenario_activity_rows(scenario, USER_NAME)
        conversion_rows = base.scenario_conversion_rows(scenario)
        story.extend([
            Paragraph(f"Scenario {index}: {scenario['title']}", styles["SubSection"]),
            Paragraph(f"<b>Objective:</b> {scenario['objective']}", styles["Body"]),
            Paragraph(f"<b>Scenario explanation:</b> {scenario_explanation}", styles["Body"]),
            Paragraph("<b>Execution steps:</b><br/>" + base.numbers(base.scenario_execution_steps(scenario, USER_NAME)), styles["Body"]),
            Paragraph("<b>Lead form values:</b>", styles["Body"]),
            base.table([["Field", "Value to enter or confirm"], *lead_rows], [3.5 * inch, 6.25 * inch], styles),
        ])

        if activity_rows:
            story.extend([
                Spacer(1, 0.06 * inch),
                Paragraph("<b>Activity form values:</b>", styles["Body"]),
                base.table([["Field", "Value to enter or confirm"], *activity_rows], [3.5 * inch, 6.25 * inch], styles),
            ])
        story.extend([
            Spacer(1, 0.06 * inch),
            Paragraph("<b>Qualification and disposition values:</b>", styles["Body"]),
            base.table([["Field", "Value to enter or confirm"], *qualification_rows], [3.5 * inch, 6.25 * inch], styles),
        ])
        if conversion_rows:
            story.extend([
                Spacer(1, 0.06 * inch),
                Paragraph("<b>Convert Lead values:</b>", styles["Body"]),
                base.table([["Field", "Value to enter or confirm"], *conversion_rows], [3.5 * inch, 6.25 * inch], styles),
            ])
        story.append(Spacer(1, 0.14 * inch))

    story.extend([
        PageBreak(),
        Paragraph("12. UAT execution summary", styles["Section"]),
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
        Paragraph("13. Scenario execution matrix", styles["Section"]),
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
        Paragraph("14. Defect and remediation summary", styles["Section"]),
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
        Paragraph("15. Test execution report", styles["Section"]),
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
