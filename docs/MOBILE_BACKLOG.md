# Mobile Backlog (React Native)

Purpose: Separate backlog for the React Native mobile app inside this repo. ClickUp mobile backlog items should align with this document and the dedicated epic/story file.

Mobile app path: `mobile/`
Primary story source: `docs/MOBILE_REACT_NATIVE_EPICS_STORIES.md`

Legend:
- DONE: implemented and verified
- PARTIAL: started, but not complete
- NOT STARTED: no implementation yet

## Current Direction

- Stack: React Native 0.81.5 + Expo SDK 54 + TypeScript 5.9.2
- Progress: 11 of 12 stories DONE (Stories 1–10, 12)
- Remaining: Story 11 (Activity creation and quick update flow)
- Authentication: DONE (Story 9)
- Live API integration: DONE (Story 10 — dashboard, leads, contacts, deals all wired)
- Dashboard: DONE (Story 12 — KPIs, pipeline, tasks, activity feed)
- Premium visual system: DONE (Story 8)

## Current Local Status

1. React Native mobile project scaffold
- Status: DONE

2. iOS simulator build support from this repo path
- Status: DONE

3. Unauthenticated mobile shell and tab workspace
- Status: DONE

4. Leads, Contacts, Deals, Activities preview surfaces
- Status: DONE

5. Premium visual system for the mobile shell and preview workspaces
- Status: DONE

6. Dashboard redesign with KPIs, pipeline, tasks, and activity feed
- Status: DONE

7. Authentication and live API integration
- Status: DONE (auth complete, all screens wired to real API, dashboard uses /api/dashboard/summary)

8. Offline sync and device-native workflows
- Status: NOT STARTED
