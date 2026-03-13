#!/usr/bin/env python3
"""
Create Properties Module epic + stories in ClickUp CRM Backlog,
then print results for local doc sync.
"""
import json
import urllib.request
import sys

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"  # CRM Backlog
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}


def api(method, url, payload=None):
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=HEADERS, method=method)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def fetch_all_tasks():
    all_tasks = []
    page = 0
    while True:
        url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task?page={page}&subtasks=true&include_closed=true"
        data = api("GET", url)
        tasks = data.get("tasks", [])
        if not tasks:
            break
        all_tasks.extend(tasks)
        if data.get("last_page", True):
            break
        page += 1
    return all_tasks


def find_next_epic(tasks):
    for t in tasks:
        name = t.get("name", "")
        if "[NEXT]" in name and not t.get("parent"):
            return t
    return None


def find_property_tasks(tasks):
    results = []
    for t in tasks:
        name = t.get("name", "").lower()
        if "propert" in name or "real estate" in name:
            results.append(t)
    return results


def create_task(payload):
    url = f"https://api.clickup.com/api/v2/list/{LIST_ID}/task"
    return api("POST", url, payload)


# --- Story definitions (X1-X12 for Properties module) ---

STORIES = [
    {
        "code": "X1",
        "name": "Properties | Document & attachment management on property detail page",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want to upload, view, and delete documents "
            "(contracts, disclosures, inspections, photos) on a property detail page.\n\n"
            "Acceptance Criteria:\n"
            "- Document list shows name, category, file size, upload date.\n"
            "- Upload dialog with category selection and file picker.\n"
            "- Delete with confirmation.\n"
            "- Mock API layer with CRUD operations.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts\n"
            "- client/src/app/crm/features/properties/models/property.model.ts\n"
            "- client/src/app/mocks/mock-db.ts\n"
            "- client/src/app/mocks/mock-api.interceptor.ts"
        ),
    },
    {
        "code": "X2",
        "name": "Properties | Activity & task association on property detail page",
        "status": "in progress",
        "desc": (
            "As a real estate agent, I want to track activities (tasks, calls, emails, meetings, "
            "notes, follow-ups) associated with a property.\n\n"
            "Acceptance Criteria:\n"
            "- Activities tab on property detail page.\n"
            "- Activity list shows type icon, subject, due date, priority, status.\n"
            "- Create activity dialog with type/subject/description/dueDate/priority.\n"
            "- Mark activity as complete from the list.\n"
            "- Mock API layer with CRUD operations.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts\n"
            "- client/src/app/crm/features/properties/models/property.model.ts\n"
            "- client/src/app/mocks/mock-db.ts\n"
            "- client/src/app/mocks/mock-api.interceptor.ts"
        ),
    },
    {
        "code": "X3",
        "name": "Properties | Showing/viewing log with visitor tracking",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want to log property showings with visitor info, "
            "date/time, duration, status, rating, and feedback.\n\n"
            "Acceptance Criteria:\n"
            "- Showings tab on property detail page.\n"
            "- Showing table with visitor, date, duration, status badge, rating stars, feedback.\n"
            "- Schedule showing dialog with visitor name/date/duration.\n"
            "- Mock API layer with CRUD.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts\n"
            "- client/src/app/crm/features/properties/models/property.model.ts\n"
            "- client/src/app/mocks/mock-db.ts"
        ),
    },
    {
        "code": "X4",
        "name": "Properties | Price change history timeline",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want to see a visual timeline of all price changes "
            "for a property with direction indicators and percentage changes.\n\n"
            "Acceptance Criteria:\n"
            "- Price History tab on property detail page.\n"
            "- Timeline with date, old price, new price, direction arrow, percentage change.\n"
            "- Color-coded increase (green) / decrease (red) indicators.\n"
            "- Mock API layer with historical data.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts\n"
            "- client/src/app/crm/features/properties/models/property.model.ts\n"
            "- client/src/app/mocks/mock-db.ts"
        ),
    },
    {
        "code": "X5",
        "name": "Properties | Photo upload with drag-drop on property form",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want to upload property photos via drag-and-drop "
            "with preview, reorder, and remove capabilities.\n\n"
            "Acceptance Criteria:\n"
            "- Drag-and-drop zone on property create/edit form.\n"
            "- Photo preview grid with thumbnails.\n"
            "- Remove individual photos.\n"
            "- File type and size validation.\n"
            "- Visual feedback during drag hover.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-form.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-form.page.ts\n"
            "- client/src/app/crm/features/properties/pages/property-form.page.scss"
        ),
    },
    {
        "code": "X6",
        "name": "Properties | Reactive form migration for property create/edit",
        "status": "complete",
        "desc": (
            "As a developer, I want property forms to use Angular reactive forms "
            "with proper validation and type safety.\n\n"
            "Acceptance Criteria:\n"
            "- Property form uses FormGroup with FormControls.\n"
            "- Validation messages for required fields.\n"
            "- Form populates correctly in edit mode.\n"
            "- Submit creates/updates property via service.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-form.page.ts\n"
            "- client/src/app/crm/features/properties/pages/property-form.page.html"
        ),
    },
    {
        "code": "X7",
        "name": "Properties | Commission tracking fields and display",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want to track commission rates and amounts "
            "for each property listing.\n\n"
            "Acceptance Criteria:\n"
            "- Commission rate (%) field on property form.\n"
            "- Computed commission amount displayed on detail page.\n"
            "- Commission shown in pricing section with KPI cards.\n"
            "- Price per sqft calculated and displayed.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts\n"
            "- client/src/app/crm/features/properties/models/property.model.ts"
        ),
    },
    {
        "code": "X8",
        "name": "Properties | Kanban board view by property status",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want a kanban board view of properties "
            "organized by status columns (Draft, Active, Under Contract, etc.).\n\n"
            "Acceptance Criteria:\n"
            "- Toggle between table and kanban view on properties list page.\n"
            "- Kanban columns for each property status.\n"
            "- Cards show property name, price, address, type, date.\n"
            "- Column headers with count badges.\n"
            "- Consistent glass UI styling.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/properties.page.html\n"
            "- client/src/app/crm/features/properties/pages/properties.page.ts\n"
            "- client/src/app/crm/features/properties/pages/properties.page.scss"
        ),
    },
    {
        "code": "X9",
        "name": "Properties | SignalR real-time property alerts (placeholder)",
        "status": "backlog",
        "desc": (
            "As a real estate agent, I want real-time notifications when property "
            "status changes, new showings are scheduled, or offers are received.\n\n"
            "Acceptance Criteria:\n"
            "- SignalR hub integration for property events.\n"
            "- Toast notifications for status changes.\n"
            "- Live updates on property detail page.\n"
            "- Uses existing CrmEventsHub infrastructure."
        ),
    },
    {
        "code": "X10",
        "name": "Properties | Reverse navigation from Account/Contact to Properties",
        "status": "backlog",
        "desc": (
            "As a CRM user, I want to see related properties on Account and Contact "
            "detail pages for cross-entity navigation.\n\n"
            "Acceptance Criteria:\n"
            "- Account detail page shows related properties section.\n"
            "- Contact detail page shows related properties section.\n"
            "- Click navigates to property detail.\n"
            "- Properties linked via owner/account relationship."
        ),
    },
    {
        "code": "X11",
        "name": "Properties | Bulk operations on properties list page",
        "status": "backlog",
        "desc": (
            "As a real estate agent, I want to perform bulk operations (status change, "
            "assign agent, delete) on multiple properties at once.\n\n"
            "Acceptance Criteria:\n"
            "- Multi-select checkboxes on properties table.\n"
            "- Bulk action toolbar appears when items selected.\n"
            "- Bulk status change, bulk assign, bulk delete with confirmation.\n"
            "- Partial failure reporting."
        ),
    },
    {
        "code": "X12",
        "name": "Properties | Quick actions on property detail page",
        "status": "complete",
        "desc": (
            "As a real estate agent, I want quick action buttons on the property detail page "
            "for common operations (change status, log showing, upload document).\n\n"
            "Acceptance Criteria:\n"
            "- Quick action buttons in hero section.\n"
            "- Change status dialog with confirmation.\n"
            "- Schedule showing quick action.\n"
            "- Upload document quick action.\n"
            "- Actions update the property state immediately.\n\n"
            "Evidence:\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.html\n"
            "- client/src/app/crm/features/properties/pages/property-detail.page.ts"
        ),
    },
]


def main():
    print("Fetching existing ClickUp tasks...")
    all_tasks = fetch_all_tasks()
    print(f"Found {len(all_tasks)} tasks in CRM Backlog list.")

    # Check for existing property tasks
    existing = find_property_tasks(all_tasks)
    if existing:
        print(f"\nFound {len(existing)} existing property-related tasks:")
        for t in existing:
            parent_id = t.get("parent")
            print(f"  {t['id']} | {t['name']} | status={t.get('status', {}).get('status', '?')} | parent={parent_id}")
        print("\nSkipping creation to avoid duplicates. Review existing tasks first.")
        return

    # Find or note NEXT epic
    next_epic = find_next_epic(all_tasks)
    if next_epic:
        print(f"\nFound NEXT epic: {next_epic['name']} ({next_epic['id']})")
    else:
        print("\nNo [NEXT] epic found. Will create tasks without parent.")

    # Create Properties Module epic
    print("\n--- Creating Properties Module Epic ---")
    epic_payload = {
        "name": "[NEXT] Properties & Real Estate Module",
        "description": (
            "Properties module for the CRM platform — full-featured real estate property management.\n\n"
            "Covers: Property CRUD, detail page with tabs (Details, Showings, Documents, Price History, Activities), "
            "Kanban board view, photo upload drag-drop, commission tracking, reactive forms, "
            "quick actions, bulk operations, reverse navigation, and SignalR alerts.\n\n"
            "12 stories (X1-X12). 8 completed, 1 in progress, 3 not started.\n\n"
            "Module tag: module:Properties"
        ),
        "status": "in progress",
        "priority": 2,
        "tags": ["next", "module:Properties"],
    }
    epic = create_task(epic_payload)
    epic_id = epic["id"]
    print(f"Created epic: {epic['name']} (id: {epic_id})")

    # Create stories as subtasks of the epic
    print("\n--- Creating Stories ---")
    created = []
    for story in STORIES:
        payload = {
            "name": f"Module: Properties | {story['code']} — {story['name'].split('|', 1)[1].strip()}",
            "description": story["desc"],
            "status": story["status"],
            "priority": 2 if story["status"] != "backlog" else 3,
            "tags": ["next", "module:Properties"],
            "parent": epic_id,
        }
        result = create_task(payload)
        created.append({"code": story["code"], "id": result["id"], "name": result["name"], "status": story["status"]})
        print(f"  Created: {story['code']} | {result['id']} | {story['status']}")

    # Print summary for local doc sync
    print("\n\n=== SUMMARY FOR LOCAL DOC SYNC ===")
    print(f"Epic ID: {epic_id}")
    print(f"Epic Name: [NEXT] Properties & Real Estate Module")
    print(f"Stories:")
    for c in created:
        print(f"  {c['code']} | ClickUp: {c['id']} | Status: {c['status'].upper()} | {c['name']}")


if __name__ == "__main__":
    main()
