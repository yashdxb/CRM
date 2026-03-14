#!/usr/bin/env python3
"""Create G3/G4/G5 Property Module growth feature tasks in ClickUp under the Property epic."""
import json
import urllib.request

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}

# --- Find Property epic ---
all_tasks = []
page = 0
while True:
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?page={page}&subtasks=true&include_closed=true"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    tasks = data.get("tasks", [])
    if not tasks:
        break
    all_tasks.extend(tasks)
    if data.get("last_page", True):
        break
    page += 1

property_epic = next(
    t for t in all_tasks
    if "Properties & Real Estate Module" in t["name"] and not t.get("parent")
)
print(f"Found epic: {property_epic['name']} ({property_epic['id']})")

# --- Growth stories to create ---
stories = [
    {
        "name": "G3) Comparable Market Analysis (CMA) tab on property detail page",
        "description": (
            "As a real estate agent, I want a CMA tab on the property detail page so I can view "
            "comparable properties and market analytics to inform pricing decisions.\n\n"
            "## Implementation Summary\n"
            "Full-stack implementation: frontend CMA tab with comparables grid, summary metrics "
            "(median price, avg price/sqft, days on market, comparable count), and generate report "
            "with configurable radius. Backend analytics pipeline with CMA generation logic.\n\n"
            "## Frontend Evidence\n"
            "- Models: `property.model.ts` (ComparableProperty, CmaSummary, CmaReport, CmaPropertyStatus, CmaSource, MarketTrend)\n"
            "- Service: `property-data.service.ts` (getCmaReport(), generateCmaReport())\n"
            "- Page: `property-detail.page.ts` (cmaReport signal, cmaLoading signal, loadCmaReport())\n"
            "- Template: `property-detail.page.html` (CMA tab, comparables grid, summary metrics)\n"
            "- Mock data: `mock-db.ts` (mockComparables, generateCmaComparables(), getCmaReport())\n\n"
            "## Backend Evidence\n"
            "- DTOs: `PropertyDtos.cs` (CmaReportDto, CmaSummaryDto, ComparablePropertyDto)\n"
            "- Interface: `IPropertyService.cs` (GetCmaReportAsync(), GenerateCmaReportAsync())\n"
            "- Implementation: `PropertyService.cs` (CMA generation logic with analytics)\n"
            "- Controller: `PropertiesController.cs` (GET/POST /api/properties/{id}/cma)\n"
            "- Contracts: `SubResourceContracts.cs` (CmaReportResponse, ComparablePropertyItem, CmaSummaryItem)\n\n"
            "## Acceptance Criteria\n"
            "- [x] CMA tab on property detail page with comparables grid\n"
            "- [x] Summary metrics: median price, avg price/sqft, days on market, comparable count\n"
            "- [x] Generate CMA report with configurable radius\n"
            "- [x] Comparable properties show address, price, sqft, beds/baths, status, distance\n"
            "- [x] Backend CMA generation with full analytics pipeline\n"
            "- [x] Mock API layer with realistic comparable data\n\n"
            "MoSCoW: Should | Commits: c42e1db"
        ),
        "status": "done",
        "priority": 3,
        "tags": ["next", "done", "module:Properties"],
    },
    {
        "name": "G4) E-Signature / DocuSign integration on property detail page",
        "description": (
            "As a real estate agent, I want an E-Signature tab on the property detail page so I can "
            "create, send, track, and manage DocuSign signature envelopes for property documents.\n\n"
            "## Implementation Summary\n"
            "Full-stack implementation: frontend E-Signature tab with signature request cards, "
            "action buttons per envelope status (Send for Draft, Refresh/Void for Sent/Viewed, "
            "Download for Signed). Backend DocuSign REST API integration with JWT OAuth "
            "authentication, envelope lifecycle management.\n\n"
            "## Frontend Evidence\n"
            "- Models: `property.model.ts` (SignatureRequest, SignatureRequestSigner, SignatureProvider, "
            "SignatureStatus, SignatureDocType, SignerRole, SignerStatus)\n"
            "- Service: `property-data.service.ts` (getSignatureRequests(), createSignatureRequest(), "
            "sendSignatureRequest(), voidSignatureRequest(), refreshSignatureStatus(), downloadSignedDocument())\n"
            "- Page: `property-detail.page.ts` (signatureRequests signal, void dialog, action methods)\n"
            "- Template: `property-detail.page.html` (E-Signature tab, esign cards, signer badges, action buttons)\n"
            "- Styles: `property-detail.page.scss` (.esign-card__actions, .void-dialog-text)\n"
            "- Mock data: `mock-db.ts` (mockSignatureRequests)\n\n"
            "## Backend Evidence\n"
            "- Domain: `SignatureRequest.cs` (PropertyId, Status, EnvelopeId, SignersJson)\n"
            "- DocuSign interface: `IDocuSignService.cs` (SendEnvelopeAsync, GetEnvelopeStatusAsync, "
            "DownloadDocumentAsync, VoidEnvelopeAsync)\n"
            "- DocuSign service: `DocuSignService.cs` (REST API: OAuth JWT token, envelope management)\n"
            "- DocuSign config: `DocuSignOptions.cs` (IntegrationKey, UserId, AccountId, RsaPrivateKey)\n"
            "- Controller: `PropertiesController.cs` (6 signature endpoints)\n"
            "- Contracts: `SubResourceContracts.cs` (SignatureRequestListItem, CreateSignatureApiRequest, "
            "VoidSignatureApiRequest, SignerItem, SignerInput)\n\n"
            "## Acceptance Criteria\n"
            "- [x] E-Signature tab on property detail page with signature request cards\n"
            "- [x] Create signature request with document type, signers (name, email, role)\n"
            "- [x] Send envelope to DocuSign (Draft -> Sent status transition)\n"
            "- [x] Refresh envelope status from DocuSign in real-time\n"
            "- [x] Void envelope with reason (Sent/Viewed -> Voided)\n"
            "- [x] Download signed documents as PDF when status is Signed/Completed\n"
            "- [x] Signer status badges showing per-signer completion state\n"
            "- [x] Backend DocuSign REST API integration with JWT OAuth authentication\n"
            "- [x] Action buttons conditional on envelope status\n"
            "- [x] Void confirmation dialog with reason input\n\n"
            "MoSCoW: Should | Commits: c42e1db, 20bf652"
        ),
        "status": "done",
        "priority": 3,
        "tags": ["next", "done", "module:Properties"],
    },
    {
        "name": "G5) Property alerts and subscription notifications",
        "description": (
            "As a real estate agent, I want an Alerts tab on the property detail page so I can "
            "create alert rules with criteria and frequency, and track notification history.\n\n"
            "## Implementation Summary\n"
            "Full-stack implementation: frontend Alerts tab with alert rules list, criteria editor, "
            "frequency selector, toggle on/off, notification history. Backend with 2 domain entities "
            "(PropertyAlertRule, PropertyAlertNotification), criteria JSON storage, notification tracking.\n\n"
            "## Frontend Evidence\n"
            "- Models: `property.model.ts` (PropertyAlertRule, PropertyAlertNotification, "
            "AlertFrequency, AlertNotificationStatus)\n"
            "- Service: `property-data.service.ts` (getAlertRules(), createAlertRule(), "
            "toggleAlertRule(), getAlertNotifications())\n"
            "- Page: `property-detail.page.ts` (alertRules signal, alertNotifications signal, CRUD methods)\n"
            "- Template: `property-detail.page.html` (Alerts tab, rule list, notification history)\n"
            "- Mock data: `mock-db.ts` (mockAlertRules, mockAlertNotifications)\n\n"
            "## Backend Evidence\n"
            "- Domain: `PropertyAlertRule.cs` (PropertyId, ClientName/Email, CriteriaJson, Frequency, "
            "IsActive, MatchCount, LastNotifiedAtUtc)\n"
            "- Domain: `PropertyAlertNotification.cs` (RuleId FK, ClientName/Email, MatchedProperties, "
            "SentAtUtc, Status)\n"
            "- DTOs: `PropertyDtos.cs` (PropertyAlertRuleDto, PropertyAlertNotificationDto, "
            "PropertyAlertCriteriaDto)\n"
            "- Interface: `IPropertyService.cs` (4 alert methods)\n"
            "- Implementation: `PropertyService.cs` (alert rule CRUD + notification query)\n"
            "- Controller: `PropertiesController.cs` (4 alert endpoints)\n"
            "- Contracts: `SubResourceContracts.cs` (CreateAlertRuleRequest, ToggleAlertRuleRequest, "
            "PropertyAlertRuleListItem, PropertyAlertNotificationItem)\n\n"
            "## Acceptance Criteria\n"
            "- [x] Alerts tab on property detail page with alert rules and notification history\n"
            "- [x] Create alert rule with criteria (property type, min/max price, min bedrooms, location) "
            "and frequency (Instant, Daily, Weekly)\n"
            "- [x] Toggle alert rules on/off\n"
            "- [x] Notification history with matched properties, send date, delivery status\n"
            "- [x] Backend alert rule CRUD with criteria JSON storage\n"
            "- [x] Backend notification tracking with match count and last notified timestamp\n"
            "- [x] Mock API layer with realistic alert data\n\n"
            "MoSCoW: Should | Commits: c42e1db"
        ),
        "status": "done",
        "priority": 3,
        "tags": ["next", "done", "module:Properties"],
    },
]

# --- Create tasks ---
created_ids = {}
for story in stories:
    payload = json.dumps({
        "name": story["name"],
        "description": story["description"],
        "status": story["status"],
        "priority": story["priority"],
        "tags": story["tags"],
        "parent": property_epic["id"],
    }).encode("utf-8")

    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task"
    req = urllib.request.Request(url, data=payload, headers=HEADERS, method="POST")
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    task_id = result["id"]
    task_name = result["name"]
    created_ids[task_name] = task_id
    print(f"  Created: {task_name} → {task_id}")

# --- Also update the parent epic status to complete ---
epic_url = f"https://api.clickup.com/api/v2/task/{property_epic['id']}"
epic_payload = json.dumps({"status": "done"}).encode("utf-8")
req = urllib.request.Request(epic_url, data=epic_payload, headers=HEADERS, method="PUT")
with urllib.request.urlopen(req) as resp:
    result = json.loads(resp.read())
print(f"\nUpdated epic status to 'complete': {result['name']}")

print("\n--- ClickUp IDs for CRM_BACKLOG.md ---")
for name, tid in created_ids.items():
    print(f"  {name}: {tid}")
