---
title: Lead Validation and Status Rules Reference
module: leads
audience: sales-manager
version: 2026-02-18
owner: revenue-ops
status: approved
tenant_scope: global
source: lead-form-logic
---

## Purpose

Capture lead form validation and status progression rules enforced by current CRM behavior.

## Core validation

1. First name and last name are required.
2. Email format must be valid when provided.
3. Phone format is validated according to selected country where applicable.

## Qualification requirements

1. Minimum qualification factor coverage is required for Qualified status.
2. Qualification guidance uses CQVS factor structure:
   - Company Fit
   - Qualification Readiness
   - Value / Problem Severity
   - Stakeholder Access
3. Evidence fields should be populated to improve truth coverage and confidence.

## Status policy behavior

1. Contacted status is activity-driven and linked to completed cadence activity.
2. Qualified status requires qualification readiness and contextual notes.
3. Nurture requires follow-up date.
4. Disqualified requires reason capture.
5. Lost requires reason, competitor, and notes.

## Conversion gating

1. Convert action is available only when lead meets conversion prerequisites.
2. Conversion creates linked Account, Contact, and Opportunity entities.
3. Linked records are displayed in lead summary after conversion.

## Ownership and assignment

1. Assignment and owner editability are permission-governed.
2. Owner field is shown for Manual assignment strategy.
3. Owner changes can be performed via form and list bulk actions where authorized.
