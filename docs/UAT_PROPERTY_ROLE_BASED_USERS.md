# UAT — CRM Realtor / Property Workflow (Leo Martin / Robert Lambke)

> Category: Operational Guide
> Canonical status: Not canonical
> Canonical reference: [docs/PROJECT_MASTER.md](/Users/yasserahmed/Desktop/Development%20Projects/CRM-Enterprise/docs/PROJECT_MASTER.md)
> Owner: Engineering / QA / RevOps
> Last reviewed: 2026-03-14
> Purpose: validate the CRM realtor/property workflow end-to-end using role-based scenarios and realistic brokerage sample data.
> Environment: local CRM
> Scope: CRM only, with focus on realtor/property workflows
> Roles under test:
> - Sales Rep / Realtor: Leo Martin (`yasser0503@outlook.com`)
> - Sales Manager / Approver: Robert Lambke (`yasser.ahamed@gmail.com`)

## 1. UAT Objective

Validate that the CRM supports a realistic brokerage execution flow:

`Lead/Client -> Property Intake -> Listing Execution -> Showings -> Price Changes -> Documents -> Alerts -> Manager Oversight`

This pack is not just CRUD. It validates:
- property lifecycle control
- media handling
- showing coordination
- listing-document workflow
- buyer alert automation
- manager oversight and approval-style review

## 2. UAT Scope

Included:
- property create, edit, detail, delete
- owner / account / contact / opportunity linkage
- managed photo upload
- property timeline events
- showing log
- document upload
- activity log
- price change history
- alert rules and alert notification history
- role-based visibility across Sales Rep and Sales Manager

Excluded:
- MLS external feed synchronization
- CMA external data validation
- e-sign production provider integration
- map/geocoding validation

## 2.1 Latest Executed Result

Latest local Playwright validation on `2026-03-14`:
- `client/e2e/property-regressions.spec.ts` -> `5 passed`
- `client/e2e/smoke.spec.ts` -> `1 passed`

Validated flows:
- price edit creates persisted price history and manager can review it
- follow-up activity persists correctly and manager can review it
- showing subresource persists and manager can review it
- document subresource persists and manager can review it
- alert rule plus notification history persist and manager can review them

Implementation notes tied to this UAT pass:
- showing dialog date/time input was hardened to a deterministic local `datetime-local` path
- realtime client startup now uses direct WebSocket transport to avoid noisy failed negotiate loops during local startup

## 3. Test Roles

| Role | Full Name | Email | Expected Access |
|---|---|---|---|
| Sales Rep / Realtor | Leo Martin | `yasser0503@outlook.com` | Can create and manage properties, showings, activities, documents, photos, and alerts. |
| Sales Manager / Approver | Robert Lambke | `yasser.ahamed@gmail.com` | Can review and manage the same records with manager-level visibility and approval-style oversight. |

## 4. Sample Data Pack

### Shared account and people

| Entity | Field | Value |
|---|---|---|
| Account | Name | `Sterling Harbour Realty Group` |
| Account | Industry | `Real Estate Brokerage` |
| Account | Website | `https://sterlingharbourrealty.example.com` |
| Account | Phone | `+1 (416) 555-0182` |
| Account | City | `Toronto` |
| Contact | Full Name | `Sofia Marin` |
| Contact | Email | `sofia.marin@sterlingharbourrealty.example.com` |
| Contact | Title | `Brokerage Operations Director` |
| Opportunity | Name | `Queen West Listing Intake - Spring Portfolio` |
| Opportunity | Amount | `1450000` |
| Opportunity | Stage | `Qualification` |

### Primary property

| Field | Value |
|---|---|
| MLS Number | `C1234567` |
| Address | `1458 Queen St W` |
| City | `Toronto` |
| Province | `Ontario` |
| Postal Code | `M6K 1L2` |
| Country | `Canada` |
| Neighborhood | `Queen West` |
| Status | `Draft` |
| Property Type | `Condo` |
| List Price | `1450000` |
| Bedrooms | `3` |
| Bathrooms | `2` |
| Square Feet | `1680` |
| Year Built | `2019` |
| Features | `South-facing terrace, renovated kitchen, parking, locker, smart home upgrades` |
| Virtual Tour URL | `https://tour.example.com/1458-queen-st-w` |
| Owner | `Leo Martin` |
| Account | `Sterling Harbour Realty Group` |
| Primary Contact | `Sofia Marin` |
| Opportunity | `Queen West Listing Intake - Spring Portfolio` |

### Photo sample set

| File | Purpose |
|---|---|
| `listing-front.jpg` | Exterior hero image |
| `living-room.jpg` | Main living area |
| `kitchen.jpg` | Renovated kitchen |
| `terrace.jpg` | Outdoor terrace |

### Showing sample set

| Visitor | Date | Status | Feedback |
|---|---|---|---|
| `Emma Clarke` | `2026-03-18 15:00 UTC` | `Completed` | `Strong interest, asked about condo fees and offer date.` |
| `Liam Walker` | `2026-03-19 19:00 UTC` | `Scheduled` | `N/A` |

### Document sample set

| File Name | Category |
|---|---|
| `listing-agreement.pdf` | `Contract` |
| `floor-plan-level-12.pdf` | `FloorPlan` |
| `seller-disclosure.pdf` | `Disclosure` |
| `inspection-summary.pdf` | `Inspection` |

### Alert-rule sample set

| Client | Email | Frequency | Criteria |
|---|---|---|---|
| `Ava Thompson` | `ava.thompson@example.com` | `Instant` | maxPrice `1500000`, minBedrooms `2`, city `Toronto`, neighborhood `Queen West` |
| `Noah Bennett` | `noah.bennett@example.com` | `Daily` | maxPrice `1600000`, propertyType `Condo`, city `Toronto` |

## 5. Scenario Matrix

| Scenario ID | Role | Main Intent | Expected Outcome |
|---|---|---|---|
| PROP-01 | Sales Rep | Create a property with full linkage | Property saved and visible in list/detail |
| PROP-02 | Sales Rep | Upload managed property photos | Photo records stored and rendered on detail |
| PROP-03 | Sales Rep | Move property from Draft to Active | Timeline records true lifecycle events |
| PROP-04 | Sales Rep | Log showing and activity | Showing/activity appear in detail and timeline |
| PROP-05 | Sales Rep | Upload listing documents | Documents persist and appear in detail |
| PROP-06 | Sales Rep | Record price change | Price history updates and timeline captures event |
| PROP-07 | Sales Rep | Create alert rules | Alert rules persist and matching notification history is created |
| PROP-08 | Sales Manager | Review rep-created property | Manager sees complete record and supporting evidence |
| PROP-09 | Sales Manager | Validate governance / approval-style review | Manager confirms readiness, pricing, and client-facing alert setup |
| PROP-10 | Both | Reopen same record after updates | Cross-role continuity remains intact |

## 6. Sales Rep UAT

### PROP-01 Create a linked property

**Goal**
Validate that a realtor can create a listing-ready property with CRM relationships attached.

**Steps**
1. Sign in as `yasser0503@outlook.com`.
2. Open `Properties`.
3. Create a new property using the sample data pack.
4. Set:
   - owner = Leo Martin
   - account = Sterling Harbour Realty Group
   - contact = Sofia Marin
   - opportunity = Queen West Listing Intake - Spring Portfolio
5. Save.

**Expected result**
- Property is created successfully.
- Property appears in the list page.
- Detail page shows linked owner, account, contact, and opportunity.
- Status defaults to `Draft`.
- Timeline contains at least:
  - `Record created`
  - initial status event

### PROP-02 Upload managed photos

**Goal**
Validate managed media upload instead of pasted URLs only.

**Steps**
1. Open the created property in edit mode.
2. Add the 4 sample photos to the upload area.
3. Save the property.
4. Open property detail.

**Expected result**
- Photos upload without error.
- Photos render in the media gallery.
- Photo records exist in the document/media area.
- Timeline includes photo/media-related entries.

### PROP-03 Activate the listing

**Goal**
Validate lifecycle movement from `Draft` to `Active`.

**Steps**
1. Open property detail.
2. Use `Change Status`.
3. Change status from `Draft` to `Active`.

**Expected result**
- Property status becomes `Active`.
- Timeline includes a new status change event.
- Existing history remains in chronological order.

### PROP-04 Log showings and activities

**Goal**
Validate field execution after the property is active.

**Steps**
1. Add a showing for `Emma Clarke` using the sample data.
2. Add a second showing for `Liam Walker`.
3. Create an activity:
   - type = `FollowUp`
   - subject = `Confirm offer review window`
   - priority = `High`
4. Mark one activity complete if applicable.

**Expected result**
- Showings appear in the `Showings` tab.
- Activities appear in the `Activities` tab.
- Timeline includes showing and activity events.
- Live record state remains stable after refresh.

### PROP-04A Focus UAT: Showing Workflow

**Goal**
Validate the dedicated showing workflow in the property detail UI from rep entry through manager review.

**Role coverage**
- Sales Rep executes the showing
- Sales Manager verifies cross-role visibility

**Steps**
1. Sign in as `yasser0503@outlook.com`.
2. Open the target property detail page.
3. Click `Log Showing` from the hero quick actions.
4. Enter:
   - visitor name = `Emma Clarke`
   - visitor email = `emma.clarke@example.com`
   - visitor phone = `+1 (416) 555-0138`
   - scheduled at = a future date/time
   - duration = `45`
5. Save the showing.
6. Open the `Showings` tab.
7. Confirm the new showing row is visible.
8. Return to `Details` and confirm the timeline includes a showing event.
9. Sign out and sign in as `yasser.ahamed@gmail.com`.
10. Open the same property.
11. Open `Showings` and confirm the same showing is visible.
12. Open `Details` and confirm the timeline still includes the showing event.

**Expected result**
- The showing dialog saves successfully.
- The showing appears in the `Showings` tab with visitor, schedule, and duration.
- The property timeline records the showing event.
- Sales Manager can review the same showing without data loss or role-based inconsistency.

### PROP-05 Upload documents

### PROP-05A Focus UAT: Document Workflow

**Goal**
Validate that a realtor can attach a listing document from the property detail page and that the same document is visible to the manager on review.

**Role coverage**
- Sales Rep uploads the document
- Sales Manager validates cross-role visibility

**Steps**
1. Sign in as `yasser0503@outlook.com`.
2. Open the target property detail page.
3. Open the `Documents` tab.
4. Click `Upload Document`.
5. Enter:
   - file name = `listing-agreement.pdf`
   - category = `Contract`
   - file URL = `https://example.com/docs/listing-agreement.pdf`
6. Save the document.
7. Confirm the document appears in `Documents`.
8. Return to `Details` and confirm the timeline includes a document event.
9. Sign out and sign in as `yasser.ahamed@gmail.com`.
10. Open the same property and open `Documents`.
11. Confirm the same document is visible.

**Expected result**
- The document dialog saves successfully.
- The document appears in the `Documents` tab with category and upload date.
- The property timeline records the upload event.
- Sales Manager can see the same document on review.

### PROP-06A Focus UAT: Price Change Workflow

**Goal**
Validate that a realtor can change the listing price through the standard edit flow and that price history plus timeline events are recorded correctly.

**Role coverage**
- Sales Rep updates the list price
- Sales Manager validates cross-role visibility

**Steps**
1. Sign in as `yasser0503@outlook.com`.
2. Open the target property detail page.
3. Click `Edit`.
4. Change list price from `845000` to `829000`.
5. Save the property.
6. Return to the property detail page.
7. Confirm the hero and pricing card show `CA$829,000`.
8. Open `Price History` and confirm a new price-change row exists.
9. Return to `Details` and confirm the timeline includes a price-change event.
10. Sign out and sign in as `yasser.ahamed@gmail.com`.
11. Open the same property.
12. Confirm the current list price is `CA$829,000`.
13. Open `Price History` and confirm the same entry is visible.

**Expected result**
- The edited list price saves successfully.
- Price history shows the old and new values.
- The timeline records the price update.
- Sales Manager sees the same updated price and history.

### PROP-07A Focus UAT: Activity Workflow

**Goal**
Validate that a realtor can create and complete a property activity from the detail page and that the manager can review the same activity state.

**Role coverage**
- Sales Rep creates and completes the activity
- Sales Manager validates cross-role visibility

**Steps**
1. Sign in as `yasser0503@outlook.com`.
2. Open the target property detail page.
3. Open the `Activities` tab.
4. Click `Add Activity`.
5. Enter:
   - type = `Follow Up`
   - subject = `Confirm offer review window`
   - description = `Call seller to confirm deadline for reviewing incoming offers.`
   - due date = a future date
   - priority = `High`
6. Save the activity.
7. Confirm the activity appears in `Activities`.
8. Mark the activity complete.
9. Confirm the activity state updates to completed.
10. Return to `Details` and confirm the timeline includes an activity event.
11. Sign out and sign in as `yasser.ahamed@gmail.com`.
12. Open the same property and open `Activities`.
13. Confirm the same activity is visible in its completed state.

**Expected result**
- The activity dialog saves successfully.
- The activity appears in the `Activities` tab with type, priority, and status.
- The activity can be completed from the detail view.
- The property timeline records the activity event.
- Sales Manager can see the same completed activity.

**Goal**
Validate document workflow for listing operations.

**Steps**
1. Upload:
   - `listing-agreement.pdf`
   - `floor-plan-level-12.pdf`
   - `seller-disclosure.pdf`
2. Verify categories are assigned correctly.

**Expected result**
- Documents persist under `Documents & Attachments`.
- File names and categories display correctly.
- Timeline includes document upload events.

### PROP-06 Record a price change

**Goal**
Validate price-history and listing-adjustment workflow.

**Steps**
1. Add a price change from `1450000` to `1399000`.
2. Reason = `Seller aligned to active market feedback after first showing block`.

**Expected result**
- Price history shows previous and new value.
- Detail page reflects latest list price.
- Timeline includes a price-change event.
- Realtor can explain why price moved using the stored reason.

### PROP-07 Create buyer alert rules

**Goal**
Validate alert-rule persistence and matching notification history.

**Steps**
1. Add alert rule for `Ava Thompson`.
2. Add alert rule for `Noah Bennett`.
3. Refresh the detail page.

**Expected result**
- Rules persist in the `Alerts` tab.
- Rules show correct frequency and criteria.
- Matching notification history is created for rules that match the current property.
- Notification history includes:
  - client name
  - client email
  - sent timestamp
  - status

### Pass criteria for Sales Rep UAT

- Leo can create a property with all CRM links.
- Leo can upload and remove photos.
- Leo can move status and see true timeline events.
- Leo can log showings and activities.
- Leo can upload listing documents.
- Leo can record a price change.
- Leo can create alert rules and see notification history.

## 7. Sales Manager UAT

### PROP-08 Review the rep-created record

**Goal**
Validate that a manager can review the rep’s property execution end-to-end.

**Steps**
1. Sign out and sign in as `yasser.ahamed@gmail.com`.
2. Open the same property record.
3. Review:
   - details
   - linked account/contact/opportunity
   - showings
   - documents
   - activities
   - price history
   - alerts
   - timeline

**Expected result**
- Robert can access the record.
- Robert sees the same linked CRM graph as the rep.
- Timeline explains the property journey in business order.
- Photo gallery and document evidence are visible.

### PROP-09 Manager approval-style review

**Goal**
Validate managerial oversight on quality, pricing, and client readiness.

**Steps**
1. Confirm the property moved from `Draft` to `Active`.
2. Review whether the price change reason is sufficient.
3. Confirm showings and activities support the listing state.
4. Confirm alert rules are suitable for buyer outreach.
5. If desired, change status to `Conditional` and confirm history remains intact.

**Expected result**
- Manager can review the execution quality of the record.
- Timeline supports coaching and review.
- Price and showing context are visible together.
- Manager can continue the lifecycle without data loss.

### Pass criteria for Sales Manager UAT

- Robert can sign in and access property records.
- Robert can review full property execution history.
- Robert can validate pricing, documents, activities, and alerts.
- Robert can continue status progression without breaking the property record.

## 8. Cross-Role Continuity UAT

### PROP-10 Same record across two users

**Goal**
Validate that the same property remains coherent across rep and manager workflows.

**Steps**
1. Leo creates and enriches the property.
2. Robert reviews and updates the property.
3. Leo signs back in and reopens the property.

**Expected result**
- Both users see the same latest state.
- Timeline remains ordered and complete.
- Photos, documents, showings, activities, and alerts remain intact.
- No linkage loss occurs on account/contact/opportunity relationships.

## 9. Negative and Edge Cases

Use these after the primary path passes.

| ID | Test | Expected Result |
|---|---|---|
| NEG-01 | Upload unsupported photo type | Validation blocks upload |
| NEG-02 | Upload photo larger than allowed size | Validation blocks upload |
| NEG-03 | Create alert rule with invalid email | Validation blocks save |
| NEG-04 | Save property without address | Validation blocks save |
| NEG-05 | Delete uploaded photo | Photo is removed from gallery and record history remains coherent |
| NEG-06 | Refresh detail after every major action | Data remains persisted and not only client-side |

## 10. Suggested E2E Automation Split

Do not put all of this into one brittle test.

### Pack A — Sales Rep core
- login as Leo
- create linked property
- upload photos
- activate listing
- add showing
- add document
- add activity

### Pack B — Listing changes
- create price change
- verify price history
- verify timeline

### Pack C — Alerts
- create alert rules
- verify notification history

### Pack D — Manager review
- login as Robert
- open same property
- verify manager visibility and continuity

## 11. Final UAT Sign-Off Checklist

- [ ] Property module enabled for the tenant
- [ ] Sales Rep can create and manage property records
- [ ] Sales Manager can review and continue the same record
- [ ] Photo upload is managed, not preview-only
- [ ] Timeline is event-driven and meaningful
- [ ] Alert rules persist and notification history is generated
- [ ] Price history, documents, showings, and activities persist after refresh
- [ ] CRM links to account, contact, and opportunity remain stable
