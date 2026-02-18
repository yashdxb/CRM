---
title: Lead Form Tabs and Fields Reference
module: leads
audience: sales-rep
version: 2026-02-18
owner: sales-enable
status: approved
tenant_scope: global
source: lead-form-ui
---

## Purpose

Document lead form tab structure and field-level coverage.

## Tabs

1. Overview
2. Qualification
3. Activity and Follow-Up
4. History

## Tab availability

1. On create mode, only Overview is enabled.
2. On edit mode, all tabs are enabled.

## Overview tab fields

### Lead basics

1. `firstName` (required)
2. `lastName` (required)
3. `companyName`
4. `status`
5. `assignmentStrategy`
6. `ownerId` (shown for Manual assignment)

### Contact details

1. `email`
2. `phoneTypeId`
3. `phoneCountry`
4. `phone` (masked by selected country when possible)
5. `jobTitle`
6. `source`
7. `routingReason` (read-only display when provided)

### Pipeline context

1. `score` (manual/auto behavior depends on settings)
2. `territory`

## Qualification tab fields

1. `budgetAvailability`
2. `budgetEvidence`
3. `readinessToSpend`
4. `readinessEvidence`
5. `buyingTimeline`
6. `timelineEvidence`
7. `problemSeverity`
8. `problemEvidence`
9. `economicBuyer`
10. `economicBuyerEvidence`
11. `icpFit`
12. `icpFitEvidence`

## Status-dependent fields

1. `qualifiedNotes` (required when status is Qualified)
2. `nurtureFollowUpAtUtc` (required when status is Nurture)
3. `disqualifiedReason` (required when status is Disqualified)
4. `lossReason` (required when status is Lost)
5. `lossCompetitor` (required when status is Lost)
6. `lossNotes` (required when status is Lost)

## Activity and Follow-Up tab fields

1. `cadenceChannel`
2. `cadenceNextStepLocal`
3. `cadenceOutcome`

This tab logs cadence touches and writes follow-up activity context.

## History tab content

1. Lead status history timeline
2. Recorded cadence touches
3. Audit-style progression context for lead lifecycle events
