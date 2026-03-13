#!/usr/bin/env python3
"""
Check existing Properties epic in ClickUp, add missing stories,
update statuses, and print summary for local doc sync.
"""
import json
import urllib.request
import sys

API_TOKEN = "pk_192218548_5P68SY1P5H046GYILQAST8VWX7D5TMCY"
LIST_ID = "901710720381"
HEADERS = {"Authorization": API_TOKEN, "Content-Type": "application/json"}


def api(method, url, payload=None):
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"HTTP {e.code}: {body[:500]}")
        raise


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


STORIES = [
    {
        "code": "X1",
        "name": "Document & attachment management on property detail page",
        "status": "completed",
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
        "name": "Activity & task association on property detail page",
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
        "name": "Showing/viewing log with visitor tracking",
        "status": "completed",
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
        "name": "Price change history timeline",
        "status": "completed",
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
        "name": "Photo upload with drag-drop on property form",
        "status": "completed",
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
        "name": "Reactive form migration for property create/edit",
        "status": "completed",
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
        "name": "Commission tracking fields and display",
        "status": "completed",
        "desc": (
            "As a real estate agent, I want to track commission rates and amounts "
            "for each property listing.\n\n"
            "Acceptance Criteria:\n"
            "- Commission rate field on property form.\n"
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
        "name": "Kanban board view by property status",
        "status": "completed",
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
        "name": "SignalR real-time property alerts (placeholder)",
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
        "name": "Reverse navigation from Account/Contact to Properties",
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
        "name": "Bulk operations on properties list page",
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
        "name": "Quick actions on property detail page",
        "status": "completed",
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

    # Find the existing Properties epic
    epic = None
    for t in all_tasks:
        name = t.get("name", "")
        if "Properties" in name and "Real Estate" in name and not t.get("parent"):
            epic = t
            break

    if not epic:
        print("ERROR: Properties epic not found. Exiting.")
        sys.exit(1)

    epic_id = epic["id"]
    print(f"Found epic: {epic['name']} (id: {epic_id})")

    # Find existing subtasks of this epic
    existing_subtasks = []
    for t in all_tasks:
        if t.get("parent") == epic_id:
            existing_subtasks.append(t)

    print(f"Existing subtasks: {len(existing_subtasks)}")
    for st in existing_subtasks:
        print(f"  {st['id']} | {st['name']} | {st.get('status', {}).get('status', '?')}")

    # Determine which stories need to be created
    existing_names_lower = set(st["name"].lower() for st in existing_subtasks)

    to_create = []
    for story in STORIES:
        full_name = f"Module: Properties | {story['code']} - {story['name']}"
        # Check if any existing task name contains the story code
        found = False
        for en in existing_names_lower:
            if story["code"].lower() in en and "propert" in en:
                found = True
                break
        if not found:
            to_create.append((story, full_name))

    if not to_create:
        print("\nAll stories already exist. Printing summary only.")
    else:
        print(f"\nCreating {len(to_create)} missing stories...")
        for story, full_name in to_create:
            payload = {
                "name": full_name,
                "description": story["desc"],
                "status": story["status"],
                "priority": 2 if story["status"] != "backlog" else 3,
                "tags": ["next", "module:Properties"],
                "parent": epic_id,
            }
            result = api("POST", f"https://api.clickup.com/api/v2/list/{LIST_ID}/task", payload)
            print(f"  Created: {story['code']} | {result['id']} | {story['status']}")

    # Re-fetch to get final state
    print("\nRe-fetching tasks for final summary...")
    all_tasks = fetch_all_tasks()

    final_subtasks = []
    for t in all_tasks:
        if t.get("parent") == epic_id:
            final_subtasks.append(t)

    print(f"\n=== FINAL SUMMARY (Epic: {epic_id}) ===")
    print(f"Epic: {epic['name']}")
    print(f"Total stories: {len(final_subtasks)}")
    for st in sorted(final_subtasks, key=lambda x: x["name"]):
        status = st.get("status", {}).get("status", "?")
        print(f"  {st['id']} | {status:15s} | {st['name']}")


if __name__ == "__main__":
    main()
