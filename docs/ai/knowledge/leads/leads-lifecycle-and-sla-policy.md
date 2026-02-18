---
title: Leads Lifecycle and SLA Policy
module: leads
audience: sales-rep
version: 2026-02-18
owner: sales-ops
status: approved
tenant_scope: global
source: crm-backlog
---

## Purpose

Define the operating rules for lead capture, qualification, SLA compliance, and conversion.

## Lifecycle states

1. New
2. Working
3. Qualified
4. Nurture
5. Disqualified
6. Converted or Closed

## SLA and first touch

1. New leads must receive first-touch action within configured SLA.
2. System creates first-touch task based on tenant SLA rules.
3. SLA due timestamp is system-owned and not manually overridden.

## Qualification discipline

1. Qualification should capture fit, authority, need, and timing signals.
2. Outcome reason is required for Disqualified or Nurture outcomes.
3. Qualified leads must include enough context for clean handoff.

## Conversion policy

1. Conversion creates Account, Contact, and Opportunity in one workflow.
2. Existing lead history is retained for continuity.
3. Converted lead is closed automatically to prevent duplication.
