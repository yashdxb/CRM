---
title: Lead List Field and Action Reference
module: leads
audience: sales-rep
version: 2026-02-18
owner: sales-ops
status: approved
tenant_scope: global
source: leads-ui
---

## Purpose

Define the Lead List view structure, displayed fields, filters, and list actions.

## View modes

1. Table view (default)
2. Kanban view

## Table columns

1. Select checkbox
2. Lead
3. Status
4. Contact
5. Lead Score
6. Owner
7. Row actions

## Lead cell content

1. Lead initials avatar
2. Lead name
3. Company
4. Overall score chip
5. SLA chip (when first-touch fields exist)
6. Converted links (Account, Contact, Opportunity) when present

## Top-level filters

1. Search by text
2. Status quick filters:
   - All
   - New
   - Contacted
   - Nurture
   - Qualified
   - Converted
   - Lost
   - Disqualified

## Bulk actions

1. Assign owner
2. Change status
3. Delete

## Row-level actions

1. Edit lead
2. Log activity
3. Convert lead (when status allows)
4. Delete lead

## Import and pagination

1. CSV import dialog is available for manage permission.
2. Table pagination is server-backed via page and pageSize.
