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

### Local SQL Server via Docker

```bash
docker compose up -d sqlserver
```

- Image: `mcr.microsoft.com/mssql/server:2022-latest` (SA password defaults to `ChangeThisPassword!1` — update the compose file + connection string together if you change it).
- Data/log/secrets files persist under `.containers/sqlserver/**`, which is git-ignored for safety.
- Once the container is healthy, run migrations (`dotnet ef database update ...`) and the backend will connect via the existing development connection string.
- Stop the container with `docker compose down` when you’re done.
