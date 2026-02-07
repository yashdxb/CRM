# SCM Backlog (Single Source of Truth)

Purpose: Supply Chain (SCM) backlog and roadmap, separated from core CRM. Use this for SCM scope only.

Legend:
- DONE: implemented and wired in UI + API
- PARTIAL: implemented but missing key pieces or not fully integrated
- NOT STARTED: no evidence yet
- UNKNOWN: needs confirmation / no clear evidence found

---

## SCM Roadmap (From Later Candidates)

### Dedicated Award Screen (SCM) (MED)
- Goal: Provide a focused award workspace for RFQ awards (no modal-only flow).
- Inputs: RFQ, selected supplier quotes, award amount, terms, effective dates.
- Output: award detail page with summary + audit trail.
- Acceptance criteria:
  - `/app/supply-chain/awards/:id` shows award header, linked RFQ, and supplier.
  - Award line items show item, qty, unit price, total, and currency.
  - Read-only for v1; edit flow can be added later.

### Industry Module (HIGH)

Goal: Allow tenants to enable domain modules (e.g., supply chain).

Recommended approach:
- Keep core CRM default.
- Add a tenant-level module pack flag to enable/disable features.
- Start with minimal navigation and permissions gating.
- Pilot with 1–2 tenants before broad rollout.

Acceptance criteria:
- Module pack toggle stored per tenant and drives menu visibility.
- Permissions gate access to all module routes.
- Core CRM remains unchanged when module is off.

### Catalog & Pricing (Future Split)

Decision:
- Supply-chain pack manages purchase/cost pricing only.
- Sales/POS pack (future) manages sell pricing and promotions.

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

### SCM Pricing Roadmap (Cost-Only)

MVP (2–3 weeks):
- Tables: `scm.PriceLists`, `scm.PriceListItems`
- Read-only list screens + filters
- API: GET price lists + items
- UI: Catalog & Pricing shows supplier cost pricing only

v1 (3–5 weeks):
- CRUD for price lists + items
- Validation: date ranges, currency, UOM
- CSV import/export
- Audit fields + basic history

v2 (later):
- `scm.PriceListOverrides` (supplier-specific exceptions)
- Effective-date versioning
- Optional approval workflow
