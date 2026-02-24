# CRM Enterprise Monorepo

Single repository containing the Angular client experience and the ASP.NET Core backend.

## Repository layout

- `client/` – Angular 21 + PrimeNG 21 workspace (current UI shell)
- `server/` – ASP.NET Core 8 solution (API + domain + EF Core infrastructure)
- `.vscode/` – shared launch/tasks definitions wired to the new structure

---

## Frontend shell (`client/`)

Angular UI mimicking a Dynamics 365–style workspace, currently backed by the mock API layer until real services come online.

### Prerequisites

- Node.js 20+
- npm 10+

```bash
cd client
npm install
```

> Run all npm/ng commands from `client/`.

### NPM scripts

| Command        | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `npm start`    | Runs `ng serve` with the mock API enabled         |
| `npm run build`| Production build (targets Azure Static Web Apps)  |
| `npm test`     | Unit tests via Vitest                             |

The dev server launches at `http://localhost:4200` and proxies `/api/**` requests to the in-browser mock layer.

### Mock integration layer

- Toggle via `environment.useMockApi` (default `true` for dev).
- `src/app/mocks/mock-api.interceptor.ts` intercepts `/api/**` and serves data from `mock-db.ts`.
- Responses mirror the future REST contracts so the UI code does not change when the real API is wired up.

### Theme + spacing system

- `ThemeService` (see `src/app/core/theme`) pushes CSS variables at bootstrap using the value in `environment.theme` (`default` for dev, `graphite` for prod).
- Material Design 3 spacing tokens (`--md-space-*`) live in `src/styles.scss`; use them instead of raw pixel values.
- To add an org palette, extend `THEMES` inside `theme.tokens.ts` and set the desired key in the environment files.
- Every page must inherit from the global design system (no isolated one-off styles). See `docs/STYLE_GUIDE.md` for the source-of-truth global style files.

### Mobile responsive design

The CRM Enterprise app is fully responsive with a **mobile-first** approach while maintaining the premium glass UI aesthetic across all breakpoints.

- **Breakpoints**: `320px` (mobile), `480px` (mobile-lg), `768px` (tablet), `1024px` (desktop), `1200px+` (desktop-lg)
- **SCSS Mixins**: Use `@include respond-to('tablet')` instead of raw media queries; defined in `src/styles/_design-tokens.scss`
- **Device Detection**: Inject `DeviceService` in components for reactive device type signals; see `src/app/core/device/device.service.ts`
- **UI Philosophy**: Glass cards, gradients, and shadows adapt beautifully to mobile—adjust spacing and layout, not aesthetics
- **Documentation**: 
  - **Beginner**: Start with `docs/MOBILE_RESPONSIVE_GUIDE.md` (end-to-end guide with examples)
  - **Developer**: Refer to `docs/MOBILE_TECHNICAL_REFERENCE.md` (mixin API, patterns, testing)
- **Example**: The sidebar automatically goes off-canvas on mobile; desktop topbar is responsive; tables adapt to card layout on phones

For new components, follow these steps:
1. Build desktop layout first with flexbox/grid
2. Import `@use 'styles/design-tokens' as *`
3. Add `@include respond-to('tablet')` and `@include respond-to('mobile-lg')` to adjust spacing/columns
4. Test at **375px** (mobile), **768px** (tablet), **1024px** (desktop) in Chrome DevTools (Ctrl+Shift+M)
5. No need for separate mobile components unless layout drastically differs

The responsive infrastructure is production-ready. **Test all new features at mobile sizes before merging.**

### Feature structure

```
client/src/app
 ├─ layout/                    # Shell chrome (sidebar + topbar)
 ├─ core/                      # Theme service, interceptors, config
 ├─ mocks/                     # HTTP interceptor + mock data
 └─ features/
	 ├─ dashboard/
	 ├─ customers/
	 ├─ activities/
	 ├─ settings/
	 └─ (upcoming) leads/opportunities/accounts modules
```

Each feature keeps its own `models`, `services`, and `pages` folders to align with the future modular-monolith/microservice split.

### Next steps

1. Replace the mock interceptor with Azure API Management once the backend endpoints are live.
2. Introduce authentication (JWT) in the shell and gate nav items via role claims.
3. Connect the theme service to organization settings so customers can upload their palette without redeploying.
4. Move reusable UI primitives into `client/src/app/shared` so new modules stay lean.

---

## Backend roadmap (`server/`)

- Clean architecture solution split across Domain, Application, Infrastructure, and Api projects.
- EF Core code-first migrations with environment-specific connection strings (`appsettings.{Environment}.json`).
- Reporting endpoints (pipeline, lead conversion, activities) will rely on SQL views to keep the OLTP schema normalized while delivering fast queries.
- Future AI services plug in via background jobs + event publishing so the MVP can launch without AI yet still capture the history those models need.

### Running the backend locally

1. Install the .NET 8 SDK and ensure SQL Server (local or container) is reachable.
2. From `server/src`, run `dotnet build` then `dotnet run --project CRM.Enterprise.Api`.
3. Update `ConnectionStrings:SqlServer` inside `server/src/CRM.Enterprise.Api/appsettings.Development.json` to match your local instance (default targets `localhost,1433`).
4. Use `dotnet ef migrations add InitialCreate -p CRM.Enterprise.Infrastructure -s CRM.Enterprise.Api` once the DbContext mappings are finalized to create the schema.
5. The API hosts Swagger UI at `https://localhost:5001/swagger` (or the port assigned by Kestrel) and exposes a `/health` probe for quick smoke tests.

Tip: Use `./scripts/dev-api.sh` to automatically start the local SQL container and then launch the API.

### Local SQL Server via Docker

```bash
docker compose up -d sqlserver
```

- Image: `mcr.microsoft.com/mssql/server:2022-latest` (SA password defaults to `ChangeThisPassword!1` — update the compose file + connection string together if you change it).
- Data/log/secrets files persist under `.containers/sqlserver/**`, which is git-ignored for safety.
- Once the container is healthy, run migrations (`dotnet ef database update ...`) and the backend will connect via the existing development connection string.
- Stop the container with `docker compose down` when you’re done.
