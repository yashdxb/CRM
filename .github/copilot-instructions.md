# CRM Enterprise – Copilot Guide

## Monorepo basics
- Angular 21 UI lives in `client/`; Clean Architecture API/Domain/Infrastructure sit in `server/src`.
- Run `npm install` + `npm start` from `client/` for the shell; `npm run build` targets Azure Static Web Apps.
- Backend lives under `server/src/CRM.Enterprise.Api`; use `dotnet build` then `dotnet run --project CRM.Enterprise.Api`.
- `docker compose up -d sqlserver` starts the local SQL Server declared in the root compose file.

## Frontend workflow
- The shell is entirely standalone-component based (`app.routes.ts` + lazy `loadComponent`); register new views by adding routes beneath `/app`.
- PrimeNG modules are imported per component (see `features/customers/pages/customers.page.ts`); avoid shared NgModules.
- Screens fetch data through thin services in `features/*/services` that build `HttpParams` and call `/api/**` (e.g., `CustomerDataService`).
- State is held with Angular `signal`/`computed` (`CustomersPage`, `DashboardPage`); prefer signals over RxJS subjects in components.
- Tables follow the existing PrimeNG table + paginator composition and status color helpers (`statusSeverity` functions) so reuse that pattern.

## Theme + layout system
- `ThemeService` (`core/theme/theme.service.ts`) sets CSS variables at bootstrap via the `APP_INITIALIZER` in `app.config.ts`.
- When adding palette keys, extend `THEMES` in `core/theme/theme.tokens.ts` and refer to them via CSS variables; do not hardcode colors.
- Global spacing tokens (`--md-space-*`) live in `src/styles.scss`; reference them for padding/margins instead of pixel literals.
- `ShellComponent` owns sidebar/topbar behavior and environment badges; nest feature outlets inside `/app` and keep shell logic isolated there.

## Mock API layer
- Dev builds default to `environment.useMockApi = true`, so `/api/**` is intercepted by `mocks/mock-api.interceptor.ts`.
- To expose new mock endpoints, add handlers in the interceptor and data in `mock-db.ts`; keep payloads aligned with the future REST contracts.
- When pointing at the real API, flip `useMockApi` (or override via env files) so Angular uses `HttpClient` against `environment.apiUrl`.

## Backend workflow
- `Program.cs` wires `AddApplication()` + `AddInfrastructure()` and enforces CORS for localhost:4200/5173; update those lists if the client origin changes.
- Controllers return record DTOs under `Api/Contracts/**`; keep DTO definitions colocated with their controller namespace.
- `ContactsController` shows the expected EF Core pattern: `AsNoTracking`, include navigation properties, manual projection to DTOs, soft-delete via `IsDeleted`.
- Auth flows go through `AuthController` + `IAuthService`; tokens are issued in `Infrastructure/Auth/AuthService` using `JwtOptions` from configuration.

## Persistence + seeding
- `CrmDbContext` applies `ApplyConfigurationsFromAssembly` and stamps audit columns in `SaveChanges`; set `CreatedAtUtc/UpdatedAtUtc` via this hook, not manually.
- `DatabaseInitializer` runs on startup (see `Program.cs` scope) to apply migrations, seed roles, seed the admin user, and add canonical lead/opportunity stages.
- Update the connection string + JWT secrets in `CRM.Enterprise.Api/appsettings.Development.json`; identical names are required in Azure app settings later.

## Feature development checklist
- Decide whether the UI should hit the mock layer or backend; update both the Angular service and, if mocking, the interceptor/data so UX stays functional offline.
- For backend additions, add contracts → controller → domain/infrastructure pieces, then register services in `AddApplication`/`AddInfrastructure` as needed.
- Whenever endpoints touch the DB, mirror the DTO in Angular (models/service) so shapes stay in sync; rely on the PrimeNG patterns already in `features/*/pages`.
- Keep tests aligned with existing tooling (`ng test` / Vitest when configured) and prefer integration tests at the API layer once DbContext mappings solidify.
