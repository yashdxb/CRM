# Telerik Embedded Reporting Runbook

> **Doc Role**
> - **Category**: Operational Guide
> - **Source of truth**: No
> - **Canonical reference**: `docs/PROJECT_MASTER.md`
> - **Owner**: Engineering
> - **Last reviewed**: March 29, 2026

This runbook documents how CRM currently hosts Telerik reporting inside the application without requiring Telerik Report Server for day-to-day report authoring.

It covers:
- embedded report viewer and designer architecture
- report library and report workspace flow
- how editable `.trdp` files are generated and patched
- tenant and connection handling
- Azure-specific behavior and deployment notes
- known limitations

---

## 1) Current Product Decision

Current reporting posture:
- `Report Library` is the in-app surface for running curated CRM reports.
- `Report Workspace` is the in-app Telerik Web Report Designer host for editing/designing reports.
- Telerik `Report Server` is optional later for centralized publishing/governance, but it is **not required** for the current built-in authoring flow.

This means:
- report viewing and report design both stay inside CRM
- the API hosts Telerik reporting services and designer assets
- the browser stays on CRM-origin URLs

---

## 2) Runtime Architecture

### Frontend

Key files:
- `client/src/app/crm/features/reports/pages/reports.page.ts`
- `client/src/app/crm/features/reports/pages/reports.page.html`
- `client/src/app/crm/features/reports/pages/report-designer.page.ts`
- `client/src/app/crm/features/reports/pages/report-designer.page.html`
- `client/src/assets/report-designer-host.html`

Responsibilities:
- `Reports` page:
  - loads the curated report library
  - shows CRM-side filters
  - runs reports in the embedded Telerik viewer
  - exposes `Edit in Workspace` for editable file-backed reports
- `Report Workspace` page:
  - hosts the embedded Telerik Web Report Designer inside an iframe
  - posts initialization payload into the isolated designer host
- `report-designer-host.html`:
  - loads jQuery, Kendo runtime, Telerik designer CSS/JS, and the CRM designer config
  - boots the jQuery plugin for Telerik Web Report Designer

### Backend

Key files:
- `server/src/CRM.Enterprise.Api/Program.cs`
- `server/src/CRM.Enterprise.Api/Controllers/ReportServerController.cs`
- `server/src/CRM.Enterprise.Api/Controllers/WebReportDesignerController.cs`
- `server/src/CRM.Enterprise.Api/Controllers/ReportDesignerAssetsController.cs`
- `server/src/CRM.Enterprise.Api/Reporting/TenantReportResolver.cs`
- `server/src/CRM.Enterprise.Api/Reporting/EmbeddedReportWorkspaceService.cs`
- `server/src/CRM.Enterprise.Infrastructure/Reporting/ReportLibraryService.cs`

Responsibilities:
- `Program.cs`
  - registers Telerik reporting service configuration
  - registers Telerik report designer configuration
  - points file-backed report storage to writable `Reports/`
- `ReportServerController`
  - returns report library metadata and parameter options
  - bridges report library items into editable embedded report files
- `WebReportDesignerController`
  - hosts Telerik Web Report Designer API endpoints
- `ReportDesignerAssetsController`
  - serves stable designer CSS/JS assets from the API
- `TenantReportResolver`
  - patches report sources at runtime for viewer execution
  - injects `TenantId`
  - patches SQL data sources with the live `SqlServer` connection string
- `EmbeddedReportWorkspaceService`
  - ensures editable `.trdp` files exist for curated library reports
  - patches those packages with live connection string + tenant parameter defaults

---

## 3) Storage Model

Writable report storage root:
- development: `server/src/CRM.Enterprise.Api/Reports`
- hosted environments: `$HOME/site/data/CRM-Enterprise/Reports`

Important subfolders:
- `Reports/CRM/`
  - generated editable `.trdp` report definitions used by the workspace
- `Reports/Resources/`
  - Telerik designer resources
- `Reports/SharedDataSources/`
  - Telerik shared data source storage
- `Reports/Settings/`
  - Telerik designer settings storage

Important rule:
- generated `.trdp` files are **runtime artifacts**
- they should not be treated as source-controlled environment-agnostic truth
- do not rely on locally generated `.trdp` files as deployable artifacts
- the runtime-generated workspace folder is:
  - `server/src/CRM.Enterprise.Api/Reports/CRM/`
- that folder should stay out of git because the files inside it are:
  - created on demand by the API
  - patched per environment with the active SQL connection string
  - patched per request/session with tenant-specific defaults like `TenantId`

### Git policy

Current recommendation:
- **ignore** `server/src/CRM.Enterprise.Api/Reports/CRM/`
- **ignore** `temp/`

Reason:
- those files are local or hosted runtime output
- they are not stable authored templates
- committing them risks shipping environment-mutated artifacts instead of the code that generates them

What should be committed instead:
- the report-generation code
- the curated report library metadata
- the Telerik CLR report definitions used as the canonical source

What should not be committed by default:
- generated `.trdp` packages under `Reports/CRM`
- locally patched packages containing concrete dev or prod connection strings
- temporary report export/debug files

---

## 4) End-to-End Flow

### A) Run a report from Report Library

1. User opens `/app/reports`.
2. Frontend loads report library metadata from `GET /api/report-server/library`.
3. Backend returns curated CRM report items and filter definitions.
4. User selects a report and fills CRM-side filters.
5. Frontend runs the report through Telerik viewer.
6. Backend resolves the report through `TenantReportResolver`.
7. Resolver injects tenant context and patches the report SQL data sources.

### B) Edit a report in Report Workspace

1. User opens `/app/reports`.
2. User selects a report such as `Pipeline by Stage`.
3. User clicks `Edit in Workspace`.
4. Frontend navigates to:
   - `/app/report-designer?report=CRM/<report-id>.trdp`
5. `Report Workspace` loads `report-designer-host.html` inside an iframe.
6. Host page loads:
   - stable jQuery asset from `/assets/vendor/jquery.min.js`
   - Kendo runtime
   - Telerik designer CSS/JS from API asset endpoints
7. Backend ensures the target `.trdp` exists and is patched for the active environment.
8. Telerik Web Report Designer opens the file-backed report definition.

---

## 5) How Editable Reports Are Created

File:
- `server/src/CRM.Enterprise.Api/Reporting/EmbeddedReportWorkspaceService.cs`

What it does:
- maps each curated library report to an editable `.trdp`
- creates the file on demand if it does not exist
- uses `ReportPackager` to package a Telerik `Report` into `.trdp`

Special case:
- `pipeline-by-stage`
  - generated from `PipelineByStageTelerikReport`

Generic case:
- most other reports
  - generated from `EmbeddedLibraryTelerikReport`
  - receive report metadata through hidden/default parameters such as:
    - `ReportKey`
    - `ReportTitle`
    - `ReportDescription`
    - `Header1..Header4`

### Classification of `Reports/CRM/*.trdp`

Current files under `server/src/CRM.Enterprise.Api/Reports/CRM/` such as:
- `pipeline-by-stage.trdp`
- `open-opportunities-by-owner.trdp`
- `lead-conversion-summary.trdp`
- `team-performance.trdp`

are not hand-maintained source assets.

They are generated workspace copies derived from:
- `PipelineByStageTelerikReport`
- `EmbeddedLibraryTelerikReport`
- report library metadata from `ReportLibraryService`

So the operational classification is:
- **canonical source**: code + metadata
- **generated editable workspace artifact**: `Reports/CRM/*.trdp`

If the product later needs true versioned Telerik designer templates, create a separate committed template directory and keep `Reports/CRM/` runtime-only.

---

## 6) Connection String and Tenant Patching

This was the most important implementation detail.

### Viewer path

Viewer/runtime execution is patched through:
- `server/src/CRM.Enterprise.Api/Reporting/TenantReportResolver.cs`

It:
- injects `TenantId` into the report source
- patches `SqlDataSource.ConnectionString` with the live `ConnectionStrings:SqlServer`
- applies hidden `TenantId` values to the report document

### Designer/workspace path

The workspace cannot rely on the same runtime patching alone because Telerik designer schema/preview loading reads the packaged `.trdp` definition directly.

So `EmbeddedReportWorkspaceService` also patches the `.trdp` package itself:
- rewrites `SqlDataSource ConnectionString` inside `definition.xml`
- writes the current tenant id into the hidden `TenantId` report parameter

This avoids two classes of failure:
- unresolved `=ConnectionStrings.SqlServer` in the designer
- blank `TenantId` causing SQL conversion failures during preview/schema load

---

## 7) Why the `.trdp` May Look Hard-Coded

Yes, the generated `.trdp` package contains a concrete SQL connection string after patching.

That is intentional for the embedded workspace flow.

Important nuance:
- the connection string written into the package is taken from the **current environment configuration**
- local dev writes the local SQL connection string
- Azure writes the Azure SQL connection string

So the package is not intended to be a portable source artifact.
It is an environment-patched runtime file.

This is why:
- local generated `.trdp` files must not be committed as deployable truth
- Azure must regenerate or re-patch those files inside the Azure environment

## 7.1) Recommended Source-Control Model

Best-practice model for this repo:

1. Keep source-controlled report logic in:
   - CLR Telerik report classes
   - curated report metadata
   - report packaging / patching services
2. Treat `Reports/CRM/` as writable runtime storage only.
3. If a future report should be maintained primarily in Telerik Designer and versioned in git:
   - store a clean canonical `.trdp` in a dedicated committed template path
   - do not use the mutable runtime workspace path as that canonical location

This separation avoids:
- accidental commit of dev/prod connection strings
- tenant-patched report definitions leaking into source control
- confusion between authored assets and generated output

---

## 8) Azure-Specific Note

### Issue observed

On Azure, Playwright confirmed the embedded designer failed while opening a report in workspace because:
- `report-designer-host.html` attempted to load `/scripts.js`
- Azure returned HTML for that path
- browser refused to execute it due to MIME mismatch

Observed browser error:
- `Refused to execute script from 'https://www.northedgesystem.com/scripts.js' because its MIME type ('text/html') is not executable`

### Fix

The host was changed to use a stable application asset:
- `/assets/vendor/jquery.min.js`

Files:
- `client/src/assets/report-designer-host.html`
- `client/src/assets/vendor/jquery.min.js`

This is required because `/scripts.js` is not a reliable production asset path for the embedded designer host.

---

## 9) Verified Local Modification Flow

The following flow was verified locally with Playwright:

1. Login as:
   - `yasser.ahamed@live.com`
2. Open `Reports`
3. Select `Pipeline by Stage`
4. Click `Edit in Workspace`
5. Open route:
   - `/app/report-designer?report=CRM/pipeline-by-stage.trdp`
6. Load embedded designer host
7. Confirm designer UI renders with:
   - `Menu`
   - `Preview`
   - `Components`
   - `Explorer`
8. Confirm the loaded asset path appears as:
   - `CRM/pipeline-by-stage.trdp`

This verified that the workspace opens the editable file-backed report instead of failing at connection/tenant resolution.

---

## 10) Current Limitations

1. Telerik/Kendo license warning still appears in console for the designer runtime.
   - This does not currently block the workspace from loading.

2. The embedded designer layout can feel collapsed or inert if Telerik restores a bad saved workspace state.
   - Current mitigation:
     - `persistSession: false`
     - `skipOnboarding: true`
   - File:
     - `client/src/assets/report-designer-host.html`

3. Not every report is a hand-authored dedicated `.trdp`.
   - some are generated through the generic `EmbeddedLibraryTelerikReport`
   - this is sufficient for in-app editing but not yet a fully curated designer-authored report library

4. Azure validation of the full modified workspace requires the patched build to be deployed before the live site can be rechecked.

---

## 11) Relevant Files

### Frontend
- `client/src/app/crm/features/reports/pages/reports.page.ts`
- `client/src/app/crm/features/reports/pages/reports.page.html`
- `client/src/app/crm/features/reports/pages/report-designer.page.ts`
- `client/src/app/crm/features/reports/pages/report-designer.page.html`
- `client/src/assets/report-designer-host.html`
- `client/src/assets/vendor/jquery.min.js`

### Backend
- `server/src/CRM.Enterprise.Api/Program.cs`
- `server/src/CRM.Enterprise.Api/Controllers/ReportServerController.cs`
- `server/src/CRM.Enterprise.Api/Controllers/WebReportDesignerController.cs`
- `server/src/CRM.Enterprise.Api/Controllers/ReportDesignerAssetsController.cs`
- `server/src/CRM.Enterprise.Api/Reporting/EmbeddedReportWorkspaceService.cs`
- `server/src/CRM.Enterprise.Api/Reporting/EmbeddedLibraryTelerikReport.cs`
- `server/src/CRM.Enterprise.Api/Reporting/PipelineByStageTelerikReport.cs`
- `server/src/CRM.Enterprise.Api/Reporting/TenantReportResolver.cs`
- `server/src/CRM.Enterprise.Api/Middleware/TenantResolutionMiddleware.cs`
- `server/src/CRM.Enterprise.Infrastructure/Reporting/ReportLibraryService.cs`

---

## 12) Operator Guidance

Use this embedded path when:
- tenant admins or provider-side developers need to design reports inside CRM now
- you do not want to require Report Server for authoring

Use Report Server later when:
- you want centralized report publishing governance
- you want an external report management surface
- you are ready to treat Report Server as the publishing/catalog authority

Current recommendation:
- author in CRM workspace now
- keep Report Server optional and later
