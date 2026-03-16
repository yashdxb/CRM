# CRM Enterprise — Picklist / Dropdown / Select Audit Report

> **Generated**: Comprehensive audit of every picklist, dropdown, and select option across the full-stack CRM application.
> **Scope**: Frontend (Angular/PrimeNG) + Backend (.NET Domain Enums)

---

## Legend

| Column | Meaning |
|--------|---------|
| **Source** | `hardcoded` = static array in component; `shared-const` = imported from shared model/constant; `API` = loaded from backend at runtime; `API+fallback` = API-driven with hardcoded fallback; `computed` = derived from other data at runtime; `backend-enum` = .NET Domain Enum |
| **Multi-use** | ✅ = same values used in multiple files; ❌ = unique to one file |

---

## Table of Contents

1. [Leads Module](#1-leads-module)
2. [Customers Module](#2-customers-module)
3. [Contacts Module](#3-contacts-module)
4. [Opportunities Module](#4-opportunities-module)
5. [Activities Module](#5-activities-module)
6. [Marketing Module](#6-marketing-module)
7. [Helpdesk Module](#7-helpdesk-module)
8. [Properties Module](#8-properties-module)
9. [Settings Module](#9-settings-module)
10. [Workflows Module](#10-workflows-module)
11. [Emails Module](#11-emails-module)
12. [Quick-Add Modal (Layout)](#12-quick-add-modal-layout)
13. [Reference Data Service (Core)](#13-reference-data-service-core)
14. [Backend Domain Enums](#14-backend-domain-enums)
15. [Cross-Cutting Issues & Recommendations](#15-cross-cutting-issues--recommendations)

---

## 1. Leads Module

### `LEAD_STATUSES` (shared constant)
| Detail | Value |
|--------|-------|
| **Field** | Lead status |
| **File** | `client/src/app/crm/features/leads/models/lead.model.ts` L2 |
| **Source** | `shared-const` |
| **Values** | `New`, `Contacted`, `Nurture`, `Qualified`, `Converted`, `Lost`, `Disqualified` |
| **Multi-use** | ✅ Used in `leads.page.ts` L105, `lead-form.page.ts` L247 |

### `leads.page.ts` — List filters

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L103 | `shared-const` | `All` + LEAD_STATUSES | ✅ |
| `filteredStatusOptions` | L111 | `computed` | statusOptions minus 'all' | ❌ |
| `conversationViewOptions` | L113 | `hardcoded` | `all`, `manager_review`, `at_risk`, `ready_to_convert`, `coaching_queue`, `weak_signal`, `no_signal` | ❌ |
| `kanbanStatuses` | L112 | `shared-const` | LEAD_STATUSES array | ✅ |

### `lead-form.page.ts` — Form fields

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L247 | `shared-const` | LEAD_STATUSES (7 values) | ✅ |
| `assignmentOptions` | L252 | `hardcoded` | `Manual`, `RoundRobin`, `Territory` | ✅ see lead-assignment |
| `budgetOptions` | L258 | `hardcoded` | `Unknown / not yet discussed`, `Indicative range mentioned`, `Budget allocated and approved`, `Budget identified but unapproved`, `No defined budget`, `Budget explicitly unavailable` | ❌ |
| `readinessOptions` | L271 | `hardcoded` | `Unknown / unclear`, `Interest expressed, no urgency`, `Actively evaluating solutions`, `Internal decision in progress`, `Ready to proceed pending final step`, `Not planning to spend` | ❌ |
| `timelineOptions` | L284 | `hardcoded` | `Unknown / not discussed`, `Rough timeline mentioned`, `Target date verbally confirmed`, `Decision date confirmed internally`, `Date missed / repeatedly pushed`, `No defined timeline` | ❌ |
| `problemOptions` | L297 | `hardcoded` | `Unknown / not validated`, `Mild inconvenience`, `Recognized operational problem`, `High business impact`, `Critical business impact`, `Executive-level priority`, `Problem acknowledged but deprioritized` | ❌ |
| `economicBuyerOptions` | L311 | `hardcoded` | `Unknown / not identified`, `Influencer identified`, `Buyer identified, not engaged`, `Buyer engaged in discussion`, `Buyer verbally supportive`, `Buyer explicitly not involved` | ❌ |
| `icpFitOptions` | L325 | `hardcoded` | `Unknown / not assessed`, `Partial ICP fit`, `Strong ICP fit`, `Out-of-profile but exploratory`, `Clearly out of ICP` | ❌ |
| `disqualificationReasonOptions` | L305 | `API` (signal) | Loaded from workspace settings `leadDisqualificationReasons` | ❌ |
| `lossReasonOptions` | L306 | `API` (signal) | Loaded from workspace settings `leadLossReasons` | ❌ |
| `buyerTypeOptions` | L307 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `motivationUrgencyOptions` | L308 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `financingReadinessOptions` | L309 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `preApprovalStatusOptions` | L310 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `preferredAreaOptions` | L311 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `propertyTypeOptions` | L312 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `budgetBandOptions` | L313 | `API` (signal) | Loaded from vertical preset catalog | ❌ |
| `evidenceOptions` | L315 | `API+fallback` | Fallback: `No evidence yet`, `Customer call`, `Call notes`, `Call recap`, `Follow-up call notes`, `Discovery call notes`, `Discovery meeting notes`, `Meeting notes`, `Email confirmation`, `Email from buyer`, `Buyer email`, `Written confirmation`, `Chat transcript`, `Proposal feedback`, `Internal plan mention`, `Ops review notes`, `Org chart reference`, `Account research`, `Third-party confirmation`, `Historical / prior deal`, `Inferred from context` | ❌ |
| `ownerOptions` | L318 | `API` (signal) | Loaded from users API | ✅ pattern |
| `cadenceChannelOptions` | L377 | `API` | Loaded from `leadData.getCadenceChannels()` | ❌ |
| `phoneTypeOptions` | L381 | `API` | Loaded from `referenceData.getPhoneTypes()` | ✅ |
| `phoneCountryOptions` | L382 | `computed` | Built from `Intl.DisplayNames` regions API | ❌ |

### `lead-convert.page.ts` — Conversion form

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `dealTypeOptions` | L297 | `hardcoded` | `Inbound`, `Outbound`, `Expansion`, `Partner` | ❌ |
| `segmentOptions` | L304 | `hardcoded` | `SMB`, `Mid`, `Enterprise` | ❌ |
| `stageOptions` | L310 | `hardcoded` | `Discovery`, `Qualification`, `Proposal`, `Negotiation` | ❌ |
| `velocityOptions` | L317 | `hardcoded` | `Fast`, `Normal`, `Slow` | ❌ |

---

## 2. Customers Module

### `customer-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L65 | `hardcoded` | `Lead`, `Prospect`, `Customer` | ✅ contacts too |
| `accountTypeOptions` | L71 | `hardcoded` | `Customer`, `Partner`, `Competitor`, `Vendor` | ❌ |
| `ratingOptions` | L78 | `hardcoded` | `Hot`, `Warm`, `Cold` | ❌ |
| `accountSourceOptions` | L84 | `hardcoded` | `Web`, `Referral`, `Partner`, `Trade Show`, `Other` | ❌ |

### `customers.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L77 | `hardcoded` | Filter list (All + customer statuses) | ✅ |
| `industryOptions` | L169 | `API` (signal) | Derived from loaded customer data | ❌ |
| `territoryOptions` | L170 | `API` (signal) | Derived from loaded customer data | ❌ |
| `ownerOptions` | L100 | `computed` | Derived from users | ✅ pattern |

---

## 3. Contacts Module

### `contact-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `lifecycleStages` (stepper) | ~L82 | `hardcoded` | `Lead`, `Prospect`, `Customer` | ✅ matches contacts.page |
| `buyingRoleOptions` | L74 | `hardcoded` | `Decision Maker`, `Champion`, `Influencer`, `Procurement`, `Technical Evaluator` | ❌ |
| `reportsToOptions` | L147 | `API` (signal) | Loaded from contacts API | ❌ |
| `accountOptions` | L199 | `API` (signal) | Loaded from customers API | ❌ |

### `contacts.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `lifecycleOptions` | L74 | `hardcoded` | `All statuses`, `Lead`, `Prospect`, `Customer` | ✅ |
| `ownerOptions` | L88 | `computed` | Derived from contact data owners | ✅ pattern |
| `accountFilterOptions` | L96 | `computed` | Derived from customer list | ❌ |
| `tagOptions` | L125 | `API` (signal) | Loaded dynamically | ❌ |
| `activityTypeOptions` | L173 | `hardcoded` | `Call`, `Email`, `Meeting`, `Task`, `Note` | ✅ overlaps activities |

---

## 4. Opportunities Module

### `opportunity-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `stageOptions` | L185 | `hardcoded` | `Prospecting`, `Qualification`, `Proposal`, `Security / Legal Review`, `Negotiation`, `Commit`, `Closed Won`, `Closed Lost` | ✅ used in workflows too |
| `currencyOptions` | L196 | `API` | Loaded from reference-data service | ✅ |
| `reviewStatusOptions` | L198 | `hardcoded` | `Not Started`, `In Progress`, `Approved`, `Blocked` | ❌ |
| `proposalStatusOptions` | L204 | `hardcoded` | `Not Started`, `Draft`, `Sent`, `Accepted`, `Declined` | ❌ |
| `onboardingStatusOptions` | L211 | `hardcoded` | `Pending`, `In Progress`, `Completed`, `Blocked` | ❌ |
| `forecastCategoryOptions` | L217 | `hardcoded` | `Pipeline`, `Best Case`, `Commit`, `Closed`, `Omitted` | ❌ |
| `opportunityTypeOptions` | L224 | `hardcoded` | `New`, `Renewal`, `Expansion` | ❌ |
| `approvalPurposeOptions` | ~L285 | `hardcoded` | `Close`, `Discount` | ✅ matches approvals |
| `decisionActionOptions` | ~L297 | `hardcoded` | `approve`, `reject`, `review`, `escalate` | ❌ |
| `reviewOutcomeOptions` | ~L305 | `hardcoded` | `Approved`, `Needs Work`, `Escalated` | ❌ |
| `teamRoleOptions` | L310 | `hardcoded` | `Solution Consultant`, `Sales Engineer`, `Product Specialist`, `Executive Sponsor` | ❌ |
| `deliveryStatusOptions` | L316 | `hardcoded` | `Not Started`, `In Progress`, `Completed` | ❌ |
| `stakeholderRoleOptions` | L395 | `hardcoded` | `Decision Maker`, `Champion`, `Influencer`, `Evaluator`, `Blocker` | ❌ |

### `opportunity-approvals.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L73 | `hardcoded` | `All`, `Pending` | ❌ |
| `purposeOptions` | L78 | `hardcoded` | `All`, `Close`, `Discount` | ✅ overlaps form |
| `delegateOptions` | L380 | `computed` | Derived from users | ❌ |

### `decision-history.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `actionOptions` | L52 | `hardcoded` | `All actions`, `Submitted`, `Approved`, `Rejected`, `Approval SLA Escalated` | ❌ |
| `statusOptions` | L60 | `hardcoded` | `All statuses`, `Submitted`, `Pending`, `Approved`, `Rejected` | ❌ |
| `decisionTypeOptions` | L68 | `hardcoded` | `All decision types`, `Discount Approval`, `AI Review`, `Stage Override` | ❌ |

---

## 5. Activities Module

### `activity-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `typeOptions` | L64 | `hardcoded` | `Task`, `Call`, `Email`, `Meeting` | ✅ overlaps quick-add, contacts |
| `priorityOptions` | L71 | `hardcoded` | `High`, `Normal`, `Low` | ✅ overlaps quick-add |
| `statusOptions` | L77 | `hardcoded` | `Open`, `Completed` | ❌ |
| `relationOptions` | L82 | `hardcoded` | `Account`, `Contact`, `Opportunity`, `Lead` | ✅ overlaps quick-add |

---

## 6. Marketing Module

### `campaign-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `typeOptions` | L57 | `hardcoded` | `General`, `Demand Gen`, `Event`, `Partner`, `ABM` | ❌ |
| `channelOptions` | L64 | `hardcoded` | `Mixed`, `Email`, `Web`, `Events`, `Social` | ✅ matches campaigns list |
| `statusOptions` | L71 | `hardcoded` | `Draft`, `Planned`, `Active`, `Completed` | ✅ matches campaigns list |
| `ownerOptions` | L77 | `computed` | Derived from users API | ✅ pattern |

### `campaigns.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusFilterOptions` | L26 | `hardcoded` | `Draft`, `Planned`, `Active`, `Completed`, `Archived` | ⚠️ has `Archived` which form lacks |
| `channelFilterOptions` | L33 | `hardcoded` | `Email`, `Events`, `Web`, `Social`, `Mixed` | ✅ |
| `ownerFilterOptions` | ~L40 | `computed` | Derived from campaign data owners | ❌ |

### `campaign-detail.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `entityTypeOptions` | L50 | `hardcoded` | `Lead`, `Contact` | ❌ |
| `responseStatusOptions` | L54 | `hardcoded` | `Sent`, `Responded`, `Qualified`, `Unsubscribed` | ❌ |

### `campaign-emails.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusFilterOptions` | L33 | `hardcoded` | `All Statuses` (empty value), `Draft`, `Scheduled`, `Sending`, `Sent`, `Failed` | ❌ |

---

## 7. Helpdesk Module

### ⚠️ DUPLICATED picklists across `helpdesk-cases.page.ts` and `helpdesk-case-detail.page.ts`

| Field | Cases Line | Detail Line | Source | Values | Multi-use |
|-------|-----------|-------------|--------|--------|-----------|
| `statusOptions` | L45 | L55 | `hardcoded` ×2 | `New`, `Open`, `Pending Customer`, `Pending Internal`, `Resolved`, `Closed` | ⚠️ DUPLICATED |
| `priorityOptions` | L53 | L63 | `hardcoded` ×2 | `Low`, `Medium`, `High`, `Urgent` | ⚠️ DUPLICATED |
| `severityOptions` | L59 | L69 | `hardcoded` ×2 | `S1 – Critical`, `S2 – High`, `S3 – Medium`, `S4 – Low` | ⚠️ DUPLICATED |
| `sourceOptions` | L65 | L75 | `hardcoded` ×2 | `Manual`, `Email` | ⚠️ DUPLICATED |

### `helpdesk-cases.page.ts` — unique fields

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `quickViewOptions` | L69 | `hardcoded` | `All Cases`, `My Queue`, `Unassigned`, `Breached SLA` | ❌ |
| `bulkQueueOptions` | L84 | `computed` | Derived from queue data | ❌ |
| `queueOptions` | computed | `computed` | Derived from data | ❌ |

### `helpdesk-case-detail.page.ts` — unique fields

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `closureReasonOptions` | L82 | `hardcoded` | `Resolved by product guidance`, `Bug fix deployed`, `Configuration issue`, `User training required`, `Third-party dependency` | ❌ |
| `macroOptions` | L89 | `hardcoded` | `request-logs`, `request-env`, `closure-confirm` | ❌ |

---

## 8. Properties Module

### `property-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L64 | `hardcoded` | `Draft`, `Active`, `Conditional`, `Sold`, `Terminated`, `Expired`, `Delisted` | ✅ duplicated 3× |
| `typeOptions` | L74 | `hardcoded` | `Detached`, `SemiDetached`, `Townhouse`, `Condo`, `Duplex`, `Triplex`, `Bungalow`, `Cottage`, `Commercial`, `Land`, `MultiFamily`, `Other` | ✅ duplicated 2× |

### `properties.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L56 | `hardcoded` | `All` + same 7 statuses above | ✅ DUPLICATED |
| `typeOptions` | L67 | `hardcoded` | `All Types` + same 12 types above | ✅ DUPLICATED |
| `bulkStatusOptions` | L120 | `hardcoded` | Same 7 statuses (no "All") | ✅ DUPLICATED |

### `property-detail.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `statusOptions` | L160 | `hardcoded` | Same 7 statuses | ✅ DUPLICATED |
| `documentCategories` | L172 | `hardcoded` | `Photo`, `FloorPlan`, `Contract`, `Inspection`, `Appraisal`, `Disclosure`, `Other` | ❌ |
| `activityTypes` | L181 | `hardcoded` | `Task`, `Call`, `Email`, `Meeting`, `Note`, `FollowUp` | ⚠️ differs from ActivityType enum (adds Note, FollowUp) |
| `activityPriorities` | L190 | `hardcoded` | `Low`, `Medium`, `High`, `Urgent` | ❌ (differs from activity-form: High/Normal/Low) |
| `signatureDocTypes` | L197 | `hardcoded` | `PurchaseAgreement`, `ListingAgreement`, `Amendment`, `Disclosure`, `Other` | ❌ |
| `signatureProviders` | L205 | `hardcoded` | `DocuSign`, `HelloSign`, `AdobeSign` | ❌ |
| `signerRoles` | L211 | `hardcoded` | `Buyer`, `Seller`, `Agent`, `Lawyer`, `Witness` | ❌ |
| `alertFrequencies` | L219 | `hardcoded` | `Instant`, `Daily`, `Weekly` | ❌ |

---

## 9. Settings Module

### `workspace-settings.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `timeZoneOptions` | L76 | `API` | Loaded from TimeZoneService | ✅ shared across settings |
| `currencyOptions` | L78 | `API` | Loaded from ReferenceDataService | ✅ |
| `verticalPresetOptions` | L81 | `hardcoded` | `CoreCRM`, `RealEstateBrokerage` | ❌ |
| `reportDesignerPermissionOptions` | L87 | `hardcoded` | `Permissions.Administration.Manage`, `Permissions.Reports.Design`, `Permissions.Reports.Manage`, `Permissions.Reports.View` | ❌ |
| `roleOptions` | L288 | `API` | Loaded from roles API | ✅ |

### `role-form.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `visibilityOptions` | L89 | `hardcoded` | `Team` (default), `Self`, `All` | ❌ (matches RoleVisibilityScope enum) |
| `securityOptions` | ~L96 | `API` (computed) | Loaded from security levels API, sorted by rank | ❌ |

### `invite-user.page.ts` / `user-edit.page.ts`

| Field | File | Line | Source | Values | Multi-use |
|-------|------|------|--------|--------|-----------|
| `localeOptions` | invite-user | L90 | `hardcoded` | `en-US`, `en-GB`, `en-IN`, `fr-FR`, `es-ES` | ✅ DUPLICATED in user-edit L334 |
| `timezoneOptions` | invite-user | L87 | `API` | TimeZoneService | ✅ shared |
| `localeOptions` | user-edit | L334 | `hardcoded` | Same 5 locales | ✅ DUPLICATED |
| `timezoneOptions` | user-edit | L331 | `API` | TimeZoneService | ✅ shared |
| `permissionModuleOptions` | user-edit | L203 | `computed` | Derived from permissions catalog | ❌ |
| `permissionPerspectiveOptions` | user-edit | L214 | `hardcoded` | `After Save`, `Current` | ❌ |
| `permissionRiskOptions` | user-edit | L218 | `hardcoded` | `All risks`, `Critical`, `Sensitive`, `Standard` | ❌ |
| `permissionChangeOptions` | user-edit | L224 | `hardcoded` | `All changes`, `Added`, `Removed`, `Unchanged` | ❌ |

### `settings.page.ts` (user management list)

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `roleFilterOptions` | L87 | `computed` | `All roles` + derived from roles API | ❌ |
| `statusFilterOptions` | L91 | `hardcoded` | `All statuses`, `Active`, `Inactive` | ❌ |

### `tenant-create.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `timeZoneOptions` | L70 | `API` | TimeZoneService | ✅ |
| `currencyOptions` | L73 | `API` | ReferenceDataService | ✅ |

### `qualification-thresholds.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `dealTypeOptions` | L65 | `hardcoded` | `All`, `Inbound`, `Outbound`, `Expansion`, `Partner` | ❌ |
| `segmentOptions` | L72 | `hardcoded` | `All`, `SMB`, `Mid`, `Enterprise` | ❌ |
| `stageOptions` | L80 | `hardcoded` | `All`, `Discovery`, `Qualification`, `Proposal`, `Negotiation` | ❌ |

### `lead-assignment.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `typeOptions` | L51 | `hardcoded` | `Manual`, `RoundRobin`, `Territory` | ✅ matches lead-form assignment |
| `ownerOptions` | L57 | `API` (signal) | Loaded from users API | ✅ pattern |

### `opportunity-automation.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `priorityOptions` | L39 | `hardcoded` | `Low`, `Medium`, `High` | ❌ |

### `audit-log.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `entityOptions` | L61 | `hardcoded` | `Lead`, `Opportunity`, `Activity`, `Account`, `Contact`, `MarketingTelemetry`, `Rfq`, `Quote`, `Award` | ❌ |
| `actionOptions` | L73 | `hardcoded` | `Created`, `Updated`, `Deleted`, `StatusChanged`, `OwnerChanged`, `StageChanged`, `AmountChanged`, `Converted`, `OutcomeUpdated`, `ImpactWorklistOpened` | ❌ |
| `userOptions` | L86 | `API` | `All users` + loaded from users API | ❌ |

### `dashboard-packs.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `customPackOptions` | L118 | `computed` | Derived from dashboard pack templates | ❌ |

---

## 10. Workflows Module

### `workflow-designer.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `templateOptions` | L67 | `hardcoded` (signal) | `deal-approval`, `discount-approval`, `large-deal-escalation`, `stage-gate-exception`, `approval-email-followup`, `conditional-routing`, `full-pipeline` | ❌ |
| `moduleOptions` | L108 | `API+fallback` | Fallback: `Opportunities` | ❌ |
| `pipelineOptions` | L109 | `API+fallback` | Fallback: `Default Pipeline`, `All Pipelines` | ❌ |
| `stageOptions` | L110 | `API+fallback` | Fallback: `Prospecting`, `Qualification`, `Proposal`, `Negotiation`, `Security / Legal Review`, `Commit`, `Closed Won`, `Closed Lost`, `All` | ✅ overlaps opp stages |
| `triggerOptions` | L111 | `API+fallback` | Fallback: `manual-request`, `on-stage-change`, `on-amount-threshold`, `on-discount-threshold` | ❌ |
| `roleOptions` | L106 | `API` (signal) | Loaded from roles | ✅ |
| `securityLevelOptions` | L107 | `API` (signal) | Loaded from security levels | ✅ |

### `properties-panel.component.ts` (workflow node config)

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `conditionFieldOptions` | L33 | `hardcoded` | `amount`, `purpose`, `stage`, `riskScore` | ❌ |
| `conditionOperatorOptions` | L39 | `hardcoded` | `equals`, `contains`, `gt`, `lt` | ❌ |
| `delayUnitOptions` | L45 | `hardcoded` | `minutes`, `hours`, `days` | ❌ |
| `emailRecipientOptions` | L50 | `hardcoded` | `owner`, `manager`, `primary-contact` | ❌ |
| `notificationChannelOptions` | L55 | `hardcoded` | `in-app`, `signalr`, `email-digest` | ❌ |
| `notificationAudienceOptions` | L60 | `hardcoded` | `owner`, `approver-role`, `revenue-ops` | ❌ |
| `crmUpdateFieldOptions` | L65 | `hardcoded` | `stage`, `status`, `forecastCategory` | ❌ |
| `activityTypeOptions` | L70 | `hardcoded` | `Task`, `FollowUp`, `Call`, `Meeting` | ⚠️ differs from other activity type lists |
| `activityOwnerOptions` | L76 | `hardcoded` | `owner`, `approver`, `manager` | ❌ |

---

## 11. Emails Module

### `emails.page.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `linkEntityTypeOptions` | L83 | `hardcoded` | `Lead`, `Contact`, `Account`, `Opportunity` | ✅ matches activity relations |

---

## 12. Quick-Add Modal (Layout)

### `layout/quick-add/quick-add-modal.component.ts`

| Field | Line | Source | Values | Multi-use |
|-------|------|--------|--------|-----------|
| `activityTypeOptions` | L82 | `hardcoded` | `Task`, `Call`, `Email`, `Meeting` | ✅ matches activity-form |
| `activityPriorityOptions` | L88 | `hardcoded` | `High`, `Normal`, `Low` | ✅ matches activity-form |
| `activityRelationOptions` | L93 | `hardcoded` | `Account`, `Contact`, `Opportunity` | ⚠️ missing `Lead` (activity-form has it) |

---

## 13. Reference Data Service (Core)

### `core/services/reference-data.service.ts`

| Field | Source | Values | Multi-use |
|-------|--------|--------|-----------|
| `currencies` | `API` (`GET /api/system/currencies`) with hardcoded fallback | Fallback: `USD`, `EUR`, `GBP`, `CAD`, `JPY`, `AUD`, `CHF` | ✅ used in opp-form, workspace-settings, tenant-create |
| `phoneTypes` | `API` (`GET /api/system/phone-types`) | API-driven, no fallback | ✅ used in lead-form |

---

## 14. Backend Domain Enums

All located in `server/src/CRM.Enterprise.Domain/Enums/`

| Enum | File | Values | Frontend Match |
|------|------|--------|----------------|
| `ActivityType` | `ActivityType.cs` | `Call`=1, `Email`=2, `Meeting`=3, `Task`=4, `Note`=5, `FollowUp`=6 | ⚠️ Frontend activity-form only has 4 (missing Note, FollowUp); property-detail has all 6; contacts has 5 (adds Note, missing FollowUp) |
| `ActivityRelationType` | `ActivityRelationType.cs` | `Lead`=1, `Contact`=2, `Account`=3, `Opportunity`=4, `DirectChatThread`=5, `DirectChatMessage`=6, `SupportCase`=7, `SupportCaseComment`=8 | ⚠️ Frontend only shows 4 entity types (Lead/Contact/Account/Opportunity); chat/support types are system-only |
| `PropertyStatus` | `PropertyStatus.cs` | `Draft`=0, `Active`=1, `Conditional`=2, `Sold`=3, `Terminated`=4, `Expired`=5, `Delisted`=6 | ✅ Matches frontend property picklists |
| `PropertyType` | `PropertyType.cs` | `Detached`=1, `SemiDetached`=2, `Townhouse`=3, `Condo`=4, `Duplex`=5, `Triplex`=6, `Bungalow`=7, `Cottage`=8, `Commercial`=9, `Land`=10, `MultiFamily`=11, `Other`=99 | ✅ Matches frontend property type picklists |
| `DocumentCategory` | `DocumentCategory.cs` | `Photo`, `FloorPlan`, `Contract`, `Inspection`, `Appraisal`, `Disclosure`, `Other` | ✅ Matches property-detail documentCategories |
| `PropertyActivityPriority` | `PropertyActivityPriority.cs` | `Low`, `Medium`, `High`, `Urgent` | ⚠️ Matches property-detail but NOT activity-form (High/Normal/Low) |
| `PropertyActivityStatus` | `PropertyActivityStatus.cs` | `Open`, `InProgress`, `Completed`, `Cancelled` | ❌ No matching frontend picklist |
| `ShowingStatus` | `ShowingStatus.cs` | `Scheduled`, `Completed`, `Cancelled`, `NoShow` | ❌ No matching frontend picklist |
| `NotificationType` | `NotificationType.cs` | `Success`, `Error`, `Warning`, `Info` | ❌ System-only, not a user-facing picklist |
| `RoleVisibilityScope` | `RoleVisibilityScope.cs` | `Self`=0, `Team`=1, `All`=2 | ✅ Matches role-form visibilityOptions |
| `UserAudience` | `UserAudience.cs` | `Internal`=0, `External`=1 | ❌ System-only, not a user-facing dropdown |
| `FieldDataType` | `FieldDataType.cs` | `Text`=1, `Number`=2, `Currency`=3, `Date`=4, `Boolean`=5 | ❌ System/config, not a user-facing picklist |

---

## 15. Cross-Cutting Issues & Recommendations

### 🔴 Critical: Duplicated Hardcoded Picklists

These picklists are copy-pasted across multiple files with no shared source of truth:

| Picklist | Files | Risk |
|----------|-------|------|
| **Property status** (7 values) | `property-form.page.ts`, `properties.page.ts`, `property-detail.page.ts` (3 copies) | Values could drift between form/list/detail |
| **Property type** (12 values) | `property-form.page.ts`, `properties.page.ts` (2 copies) | Values could drift |
| **Helpdesk status/priority/severity/source** | `helpdesk-cases.page.ts`, `helpdesk-case-detail.page.ts` (4 picklists × 2 copies = 8 duplications) | High risk of value drift |
| **Locale options** (5 values) | `invite-user.page.ts`, `user-edit.page.ts` (2 copies) | Could miss adding a new locale |
| **Lead assignment types** | `lead-form.page.ts` L252, `lead-assignment.page.ts` L51 (2 copies) | Values match now but no shared const |

### 🟡 Warning: Frontend ↔ Backend Mismatches

| Issue | Detail |
|-------|--------|
| **Activity types inconsistency** | Backend enum has 6 (`Call`, `Email`, `Meeting`, `Task`, `Note`, `FollowUp`). activity-form shows 4, contacts shows 5, property-detail shows 6, workflow properties-panel shows 4 (different subset: `Task`, `FollowUp`, `Call`, `Meeting`). Quick-add shows same 4 as activity-form. |
| **Priority naming** | activity-form uses `High`/`Normal`/`Low`; property-detail uses `Low`/`Medium`/`High`/`Urgent`; opp-automation uses `Low`/`Medium`/`High`; PropertyActivityPriority enum uses `Low`/`Medium`/`High`/`Urgent`. No consistent naming. |
| **Quick-add missing Lead** | `activityRelationOptions` in quick-add has `Account`/`Contact`/`Opportunity` but is missing `Lead` (which activity-form includes). |
| **Campaign statuses** | Form has 4 statuses (`Draft`/`Planned`/`Active`/`Completed`); list filter has 5 (adds `Archived`). Form cannot set `Archived`. |

### 🟢 Recommendation: Extract Shared Constants

The following should be extracted to shared constant files (modeled after `LEAD_STATUSES`):

1. **`PROPERTY_STATUSES`** — used in 3+ files
2. **`PROPERTY_TYPES`** — used in 2+ files
3. **`HELPDESK_STATUSES`**, **`HELPDESK_PRIORITIES`**, **`HELPDESK_SEVERITIES`** — used in 2 files each
4. **`ACTIVITY_TYPES`** — standardize which subset appears where
5. **`CAMPAIGN_STATUSES`**, **`CAMPAIGN_CHANNELS`** — used in form + list
6. **`LOCALE_OPTIONS`** — used in invite-user + user-edit
7. **`PRIORITY_LEVELS`** — standardize naming across modules
8. **`OPPORTUNITY_STAGES`** — used in opp-form + workflows + qualification thresholds

### Summary Statistics

| Metric | Count |
|--------|-------|
| **Total unique picklists found** | ~120+ |
| **Hardcoded picklists** | ~85 |
| **API-driven picklists** | ~25 |
| **Computed/derived picklists** | ~15 |
| **Backend enums** | 12 |
| **Duplicate copy-paste instances** | ~20 |
| **Frontend↔Backend mismatches** | 4 |
