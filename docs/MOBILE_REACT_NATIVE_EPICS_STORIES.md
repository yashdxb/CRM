# North Edge CRM Mobile Epics & Stories

Purpose: Local source of truth for the React Native mobile epic and related stories before and after ClickUp sync.

List target:
- Mobile Backlog: `901710789774`

## Epic

### [NOW] North Edge CRM Mobile (React Native)

Purpose:
- establish the dedicated React Native mobile app for North Edge CRM inside the current workspace
- prioritize high-frequency mobile CRM workflows before authentication and deep parity

Status:
- PARTIAL

Scope:
- mobile shell
- leads
- contacts
- deals
- activities
- iOS build reliability for local development
- premium mobile visual system

## Stories

### 1. Mobile app scaffold and brand foundation
- Status: DONE
- Acceptance criteria:
  - separate React Native app exists under `mobile/`
  - app is branded as `North Edge CRM`
  - Expo + TypeScript project runs locally

### 2. iOS local build reliability for repo paths with spaces
- Status: DONE
- Acceptance criteria:
  - `npm run ios` succeeds from this repository path
  - generated iOS scripts no longer fail on `Development Projects` path splitting
  - repair step is automated in mobile package scripts

### 3. Mobile shell and primary tab workspace
- Status: DONE
- Acceptance criteria:
  - app has a usable shell instead of placeholder text
  - tabs exist for `Home`, `Leads`, `Contacts`, `Deals`, `Activities`
  - screen layout is mobile-first and visually coherent

### 4. Leads list and lead detail preview
- Status: DONE
- Acceptance criteria:
  - leads screen shows realistic records
  - one lead can be selected
  - detail preview shows status, score, company, and next action

### 5. Contacts workspace preview
- Status: DONE
- Acceptance criteria:
  - contacts screen shows realistic contact cards
  - each record shows account, role, and last-touch context

### 6. Deals workspace preview
- Status: DONE
- Acceptance criteria:
  - deals screen shows deal name, account, stage, value, and health
  - layout is tuned for mobile scanning

### 7. Activities workspace preview
- Status: DONE
- Acceptance criteria:
  - activities screen shows realistic scheduled work
  - cards expose owner, due state, and related record context

### 8. Premium mobile visual system and glass shell
- Status: DONE
- Acceptance criteria:
  - home and workspace screens use a premium glass/liquid visual direction
  - tabs, cards, and section blocks use colorful accent families instead of one flat surface
  - icons and visual grouping improve scan speed across leads, contacts, deals, and activities

### 9. Authentication and session management
- Status: NOT STARTED
- Acceptance criteria:
  - user can sign in
  - token/session is stored safely
  - logout and session restore work

### 10. Live API integration for leads, contacts, deals, and activities
- Status: NOT STARTED
- Acceptance criteria:
  - static seed data is replaced with API-backed data
  - loading, empty, and error states exist
  - mobile screens handle real backend payloads

### 11. Activity creation and quick update flow
- Status: NOT STARTED
- Acceptance criteria:
  - user can create an activity from mobile
  - user can complete or update a scheduled activity
  - lead/contact/deal linkage is preserved

### 12. Dashboard redesign with KPI cards, pipeline, tasks, and activity feed
- Status: DONE
- Acceptance criteria:
  - HomeScreen shows personalized welcome header with greeting, date, avatar, and online indicator
  - four full-gradient KPI metric cards display Leads, Deals, Contacts, and Revenue counts
  - Sales Pipeline collapsible section shows horizontal segmented progress bar with legend
  - Today's Tasks collapsible section shows interactive checklist with badge priorities
  - Recent Activities collapsible section shows chronological activity feed with colored icons
  - App.tsx tab bar updated to 5-tab layout: Dashboard, Contacts, FAB (+), Deals, More
  - center FAB button uses primary gradient with raised elevation
  - all new components: CollapsibleSection, SalesPipeline, TaskList, ActivityFeed
  - MetricCard redesigned with full gradient fills, Ionicons, and optional notification badges
