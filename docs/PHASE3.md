# Phase 3 Candidate Backlog (Draft)

These are **post‑Phase 2** ideas. Prioritized by **importance** with **complexity** noted.
Order: high impact + low complexity first.

## Priority Order (Low → High Complexity)

1) Next‑best‑action suggestions (LOW–MED)
- Goal: Recommend 2–3 actions per lead/opportunity (follow‑up, schedule meeting, send proposal).
- Inputs: stage, last activity date, amount, close date, owner workload.
- Output: list of suggested actions + rationale.
- Acceptance criteria:
  - Shows top 2–3 actions with rationale on lead/opportunity detail.
  - Respects tenant + permissions; no cross‑tenant data.
  - Read‑only: no record updates from AI.

2) Deal risk alerts (LOW–MED)
- Goal: Flag opportunities at risk (stalled > N days, close date slipped, no activity).
- Inputs: stage history, activity recency, close date changes.
- Output: risk badge + short rationale.
- Acceptance criteria:
  - Risk badge appears when rule thresholds are met.
  - Rationale lists the trigger (e.g., “No activity in 21 days”).
  - Badge clears when activity resumes or stage changes.

3) Activity summaries (MED)
- Goal: Summarize meeting notes or call transcripts.
- Inputs: activity description or transcript.
- Output: short summary + key decisions.
- Acceptance criteria:
  - Summary appears under activity details within 10 seconds.
  - Summary length capped (e.g., 2–4 sentences).
  - User can re‑generate summary on demand.

4) Email draft suggestions (MED)
- Goal: Provide suggested email copy for follow‑ups.
- Inputs: last interaction, stage, contact name, company.
- Output: subject + body draft.
- Acceptance criteria:
  - Draft appears in a modal with editable text.
  - No sending or logging unless user confirms.
  - Draft respects tenant + permissions.

5) KPI explanations (MED)
- Goal: Explain KPI movement (pipeline value up/down).
- Inputs: metric change + records affecting the change.
- Output: narrative summary with record references.
- Acceptance criteria:
  - Explanation cites 3–5 records that drove the change.
  - Links open the referenced records.
  - “No explanation” shown if data is insufficient.

6) Dedicated Award Screen (SCM) (MED)
- Goal: Provide a focused award workspace for RFQ awards (no modal-only flow).
- Inputs: RFQ, selected supplier quotes, award amount, terms, effective dates.
- Output: award detail page with summary + audit trail.
- Acceptance criteria:
  - `/app/supply-chain/awards/:id` shows award header, linked RFQ, and supplier.
  - Award line items show item, qty, unit price, total, and currency.
  - Read-only for v1; edit flow can be added later.

## Industry Module (HIGH)

Goal: Allow tenants to enable domain modules (e.g., supply chain).

Recommended approach:
- Keep core CRM default.
- Add a tenant‑level **module pack** flag to enable/disable features.
- Start with minimal navigation and permissions gating.
- Pilot with 1–2 tenants before broad rollout.

Supply chain scope ideas (defer to later):
- RFQ / RFI workflows
- Comparison + award
- Inventory
- Product catalog
- Pricing & rate cards (procurement cost only)

Acceptance criteria:
- Module pack toggle stored per tenant and drives menu visibility.
- Permissions gate access to all module routes.
- Core CRM remains unchanged when module is off.

## Catalog & Pricing (Future Split)

Decision:
- Supply‑chain pack manages **purchase/cost pricing** only.
- Sales/POS pack (future) manages **sell pricing** and promotions.

Recommended tables (SCM schema):
- `scm.PriceLists`
  - `Id`, `TenantId`, `Name`, `Currency`, `Status`, `ValidFrom`, `ValidTo`, `Notes`, audit fields
- `scm.PriceListItems`
  - `Id`, `TenantId`, `PriceListId`, `ItemMasterId`, `Uom`, `UnitPrice`, `MinQty`, `MaxQty`, `LeadTimeDays`, `IsActive`, audit fields
- Optional: `scm.PriceListOverrides` (later)
  - `Id`, `TenantId`, `PriceListId`, `SupplierId`, `ItemMasterId`, `Uom`, `UnitPrice`, `ValidFrom`, `ValidTo`, `IsActive`, audit fields

Sales/POS pack (future tables):
- `sales.PriceLists` (sell prices)
- `sales.PriceRules` (discounts, tiers, promos)

## SCM Pricing Roadmap (Cost‑Only)

MVP (2–3 weeks):
- Tables: `scm.PriceLists`, `scm.PriceListItems`
- Read‑only list screens + filters
- API: GET price lists + items
- UI: Catalog & Pricing shows supplier cost pricing only

v1 (3–5 weeks):
- CRUD for price lists + items
- Validation: date ranges, currency, UOM
- CSV import/export
- Audit fields + basic history

v2 (later):
- `scm.PriceListOverrides` (supplier‑specific exceptions)
- Effective‑date versioning
- Optional approval workflow
