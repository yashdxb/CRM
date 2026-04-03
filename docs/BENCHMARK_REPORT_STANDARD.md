# Benchmark Report Standard

**Category**: Operational Guide  
**Canonical?**: No  
**Canonical Reference**: `docs/PROJECT_MASTER.md`  
**Owner**: Product / Engineering  
**Last Reviewed**: April 3, 2026

---

## Purpose

Define the standard format, evidence rules, and maintenance process for North Edge CRM benchmark reports used in enterprise sales, presales, partner, and internal strategy conversations.

This standard exists to keep benchmark output:
- grounded in the current implemented product
- analytically credible
- visually consistent
- reusable across updates

---

## Standard Benchmark Artifact

Primary benchmark artifact:
- Generator: `scripts/generate_current_codebase_benchmark_pdf.py`
- Output: `output/pdf/North_Edge_CRM_Current_Codebase_Benchmark_Report.pdf`

Companion inventory artifact:
- Generator: `scripts/generate_feature_inventory_pdf.py`
- Output: `output/pdf/North_Edge_CRM_Feature_Inventory.pdf`

Use the benchmark report as the primary external and executive-facing comparison asset.  
Use the feature inventory as the detailed supporting reference.

---

## Scope Rules

The benchmark report must evaluate **current implemented capability only**.

Allowed:
- implemented modules and workflows present in the codebase
- current technical stack and Azure service usage
- current embedded reporting, mailbox, approvals, risk, and governance capabilities
- short future expansion notes when explicitly labeled as future

Not allowed:
- roadmap claims presented as current functionality
- speculative parity claims against Salesforce, Dynamics 365, HubSpot, or Zoho CRM
- unsupported AI claims
- unverified ecosystem or scale claims

---

## Required Competitor Set

Every standard benchmark report must include:
- Salesforce
- Microsoft Dynamics 365
- HubSpot
- Zoho CRM

Additional competitors may be added only when the target deal requires them, but the standard benchmark must keep the four-platform baseline above.

---

## Required Structure

The standard benchmark report should follow this structure:

1. Executive Summary
2. Benchmark Framework Definition
3. Benchmark Matrix
4. Competitive Positioning Analysis
5. Unique Differentiation
6. Strategic Positioning
7. Where North Edge Is Not Competing
8. Future Competitive Expansion
9. Technology Stack / Evidence Basis

This structure is the current standard unless replaced by an explicit update to this document.

---

## Evidence Basis

The benchmark must be derived from the live repo and current generated outputs, not from narrative assumptions.

Preferred evidence sources:
- Angular route/module/page inventory
- ASP.NET Core controller and service inventory
- current docs already reconciled with code
- package manifests and `.csproj` files for stack details
- Azure service usage already reflected in the repo and deployment model

If a capability is uncertain:
- mark it narrowly
- avoid broad claims
- prefer `Focused` or `Moderate` over inflated scoring

---

## Writing Standard

Tone:
- analytical
- direct
- executive-ready
- presales-ready

Avoid:
- marketing fluff
- generic “best-in-class” language
- fake parity language
- vague transformation language

The benchmark should sound closer to product strategy or analyst documentation than marketing copy.

---

## North Edge Positioning Rules

North Edge CRM should be positioned as:
- a governed execution CRM
- strong in approval governance, operational discipline, risk guidance, and embedded reporting
- Azure-native in architecture

North Edge CRM should **not** be positioned as:
- a full ecosystem giant like Salesforce
- a full marketing automation suite today
- a lightweight SMB CRM

This boundary is intentional and should remain explicit in every benchmark revision.

---

## AI Positioning Rules

AI content must remain evidence-based.

Allowed current framing:
- focused operational AI
- assistant-driven guidance
- lead scoring
- risk-guided next actions
- Azure AI Search / Foundry grounding path

Not allowed current framing:
- broad autonomous enterprise agent platform parity
- end-to-end agentic replacement claims
- unsupported predictive precision claims

---

## Document Identity Requirements

The benchmark PDF cover must include:
- Organization name: `North Edge System`
- Website: `www.northedgesystem.com`
- Document version number
- Generation date

The document version should be incremented when the benchmark structure or evidence basis materially changes.

---

## Validation Standard

After regenerating the PDF:

1. Generate the PDF successfully.
2. Run `pdfinfo` against the output.
3. Render preview pages with `pdftoppm` for visual inspection.
4. Perform a light text extraction spot check to confirm key sections are present.

Minimum validation expectation:
- file generates without errors
- section headings appear correctly
- cover metadata appears correctly
- tables and layout render cleanly

---

## Update Triggers

Regenerate and review the benchmark when any of the following change materially:
- module footprint
- approval / workflow capability
- reporting capability
- mailbox capability
- risk intelligence capability
- AI capability
- stack or Azure deployment posture

Do not regenerate only for cosmetic UI changes unless they materially affect positioning.

---

## Historical / Non-Standard Benchmark Material

Earlier benchmark-style or competitive audit documents may remain in the repo as reference material, but they are not the current standard unless they explicitly conform to this document.

The current standard is:
- the benchmark generator
- the benchmark PDF output
- this standard document

