# CRM Enterprise – Copilot Guide

## Monorepo basics
- Angular 21 UI lives in `client/`; Clean Architecture API/Domain/Infrastructure sit in `server/src`.
- Run `npm install` + `npm start` from `client/` for the shell; `npm run build` targets Azure Static Web Apps.
- Backend lives under `server/src/CRM.Enterprise.Api`; use `dotnet build` then `dotnet run --project CRM.Enterprise.Api`.
- `docker compose up -d sqlserver` starts the local SQL Server declared in the root compose file.

-## Frontend workflow

### SCSS Partial Import Guidance
- When importing shared SCSS partials (like _design-tokens.scss) from feature/component stylesheets, always calculate the relative path based on the actual directory depth of the file.
- For features/pages under `crm/features`, use:
  `@use '../../../../../styles/design-tokens' as *;`
- For features/pages under deeper folders (e.g., `packs/supply-chain/features/inventory`), add additional `../` segments as needed. For example:
  `@use '../../../../../../styles/design-tokens' as *;`
- If you encounter a "Can't find stylesheet to import" error, double-check the number of `../` segments so the path resolves from your SCSS file to `src/styles/_design-tokens.scss`.
- This is necessary because Angular CLI does not always support root-relative imports for component-level SCSS, and directory depth may differ between feature areas.
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
- Every page must inherit from the global design system; do not create isolated page styles.
  - Use the shared global files: `src/styles.scss`, `src/styles/_design-tokens.scss`, `src/styles/_components.scss`,
    `src/styles/_animations.scss`, `src/app/shared/_form-page-styles.scss`, `src/app/shared/page-design-system.scss`, `src/app/app.scss`.
- Use PrimeNG `p-inputgroup` + `p-inputgroup-addon` with `pi` icons for form inputs; apply `icon-addon` + specific `icon-addon--*` classes for per-field colors (global rules live in `client/src/styles/_components.scss`).

---

# 🎨 Design System Principles

## Design Philosophy
The CRM uses a **Premium Glass UI** design inspired by Apple + Linear/Vercel hybrid aesthetics:
- **Glassmorphism**: Frosted glass cards with `backdrop-filter: blur()` and subtle transparency
- **Ambient Glow**: Cards lift and glow on hover/focus with blue ambient shadows
- **Gradient Accents**: Purple-to-blue gradients for titles, primary actions, and active states
- **Teal Section Headers**: Form section titles use cyan/teal color palette
- **Smooth Transitions**: All interactions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing
- **Visual Summary Cards**: Hero sections include decorative summary cards (`visual-card`) that provide contextual metrics - this is the **canonical pattern** for all summary/insight cards across the app

## When to Use Which Pattern

| Page Type | Pattern | Example | SCSS Import |
|-----------|---------|---------|-------------|
| **List/Dashboard pages** | Customer Workspace | `customers.page`, `leads.page`, `dashboard.page` | `page-design-system` |
| **Create/Edit forms** | Form Page Style | `role-form.page`, `customer-form.page`, `workspace-settings.page` | `form-page-styles` |
| **Settings pages with forms** | Form Page Style | `workspace-settings.page`, `lead-assignment.page` | `form-page-styles` |

---

## Design Tokens (`_design-tokens.scss`)

Always use design tokens instead of hardcoded values:

### Gradients
```scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$success-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
$cyan-gradient: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
$purple-gradient: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
```

### Glassmorphism
```scss
$glass-bg: rgba(255, 255, 255, 0.85);
$glass-bg-subtle: rgba(255, 255, 255, 0.6);
$glass-border: rgba(255, 255, 255, 0.3);
$glass-blur: 20px;
$glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
$glass-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
```

### Spacing & Radius
```scss
$space-1: 0.25rem;  $space-4: 1rem;   $space-6: 1.5rem;  $space-8: 2rem;
$radius-md: 0.5rem; $radius-lg: 0.75rem; $radius-xl: 1rem; $radius-2xl: 1.5rem;
```

### Typography
```scss
$font-size-sm: 0.875rem;   // 14px - hints, labels
$font-size-md: 0.9375rem;  // 15px - body text
$font-size-base: 1rem;     // 16px - default
$font-size-lg: 1.125rem;   // 18px - card titles
$font-size-2xl: 1.375rem;  // 22px - section headers
```

---

## Page Design Pattern (List/Dashboard Pages)

Use for: `customers.page`, `leads.page`, `opportunities.page`, `contacts.page`, `dashboard.page`

### Required HTML Structure
```html
<div class="page-container">
  <!-- Animated Background Orbs -->
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
  
  <app-breadcrumbs></app-breadcrumbs>
  
  <!-- Hero Section: two-column grid -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-badge"><span class="badge-dot"></span><span>Page Label</span></div>
      <h1 class="hero-title">
        <span class="title-gradient">Title</span>
        <span class="title-light">Subtitle</span>
      </h1>
      <p class="hero-description">Page description text</p>
      
      <!-- Stats with progress bars -->
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="stat-value">{{ count }}</div>
          <div class="stat-label">Label</div>
          <div class="stat-bar"><div class="stat-bar-fill"></div></div>
        </div>
      </div>
      
      <div class="hero-actions"><!-- Buttons --></div>
    </div>
    
    <!-- Visual cards sidebar -->
    <div class="hero-visual">
      <div class="visual-card visual-card--primary">
        <div class="card-icon"><i class="pi pi-chart-line"></i></div>
        <div class="card-content">
          <span class="card-label">Label</span>
          <strong class="card-value">{{ value }}</strong>
          <span class="card-trend card-trend--up"><i class="pi pi-arrow-up"></i> Trend</span>
        </div>
        <div class="card-glow"></div>
      </div>
    </div>
  </section>
  
  <!-- Data table section -->
  <section class="data-section">...</section>
</div>
```

### SCSS Imports
```scss
@use '../../../../shared/page-design-system' as *;
@use '../../../../../styles/design-tokens' as *;
```

### Available CSS Classes (from `_components.scss`)
- **Layout**: `.page-container`, `.hero-section`, `.hero-content`, `.hero-visual`, `.data-section`
- **Stats**: `.hero-stats`, `.hero-stat`, `.stat-value`, `.stat-label`, `.stat-bar`, `.stat-bar-fill--success/--warning/--info`
- **Visual cards**: `.visual-card--primary/--secondary/--success/--purple`, `.card-icon`, `.card-content`, `.card-glow`
- **Title**: `.hero-badge`, `.badge-dot`, `.hero-title`, `.title-gradient`, `.title-light`
- **Cards**: `.glass-card`, `.card-header`, `.card-title`

---

## Visual Summary Cards (Decorative Cards)

**Design Principle**: Visual summary cards provide at-a-glance insights in the hero section sidebar. They are the **canonical pattern** for decorative summary cards across all pages.

### Purpose
- Display contextual metrics or status at the top of any page
- Provide visual balance to the hero section
- Show real-time or computed values with trend indicators
- Must be meaningful to the page context (not just decoration)

### Required Structure
```html
<div class="hero-visual">
  <div class="visual-card visual-card--primary">
    <div class="card-icon">
      <i class="pi pi-chart-line"></i>
    </div>
    <div class="card-content">
      <span class="card-label">This Week</span>
      <strong class="card-value">+{{ value }}</strong>
      <span class="card-trend card-trend--up">
        <i class="pi pi-arrow-up"></i> Trend text
      </span>
    </div>
    <div class="card-glow"></div>
  </div>
</div>
```

### Visual Card Variants
| Variant | Use Case | Background Gradient |
|---------|----------|---------------------|
| `--primary` | Main metric, new records, growth | Purple → Blue |
| `--secondary` | Team/user counts, secondary info | Blue → Cyan |
| `--success` | Completed items, wins, conversions | Green gradient |
| `--purple` | Special/featured metrics | Deep purple |

### Key Design Elements
- **Card glow**: `.card-glow` adds ambient lighting effect on hover
- **Card icon**: 44px rounded container with gradient background, scales on hover
- **Card trend**: Shows direction (up/down arrow) with contextual text
- **Hover effect**: `translateY(-3px) scale(1.01)` + gradient border glow

### Content Guidelines
- **Label**: Short descriptor (max 2 words) - "This Week", "Team Active", "Pipeline"
- **Value**: Primary metric, can include prefix (+, $, %) - keep concise
- **Trend**: Contextual descriptor - "New records", "Members", "vs last month"

### When to Use
- List/Dashboard pages: Show metrics relevant to the data being displayed
- Settings pages: Show configuration summary or status
- Form pages with hero: Show related counts or status

---

## Metric Cards (KPI Dashboard Cards)

**Design Principle**: Metric cards display key performance indicators in a horizontal dashboard row. They are the **canonical pattern** for KPI visualization across all list/dashboard pages.

### Purpose
- Display key metrics below the hero section
- Show real-time counts with visual progress indicators
- Provide quick data insights with sparklines or ring charts
- Animate on load with staggered fade-in-up effect

### Required Structure
```html
<section class="metrics-section">
  <div class="metric-card metric-card--total">
    <div class="metric-icon">
      <i class="pi pi-database"></i>
    </div>
    <div class="metric-content">
      <span class="metric-label">Total Records</span>
      <strong class="metric-value">{{ count }}</strong>
    </div>
    <div class="metric-ring">
      <svg viewBox="0 0 36 36">
        <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="ring-fill ring-fill--cyan" [attr.stroke-dasharray]="percentage + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
    </div>
  </div>
</section>
```

### Metric Card Variants
| Variant | Use Case | Icon Gradient |
|---------|----------|---------------|
| `--total` | Total count, all records | Purple → Blue (`$primary-gradient`) |
| `--leads` | Leads count | Cyan → Teal (`$cyan-gradient`) |
| `--prospects` | Prospects | Purple (`$purple-gradient`) |
| `--customers` | Converted customers | Green (`$success-gradient`) |
| `--new` | New this week/period | Orange (`$orange-gradient`) |

### Key Design Elements
- **Card size**: `padding: $space-3 $space-4` (0.75rem 1rem)
- **Icon size**: 36px × 36px rounded container with gradient background
- **Hover effect**: `translateY(-2px)` + `$glass-shadow-lg`, icon scales 1.1 and rotates 5deg
- **Staggered animation**: Each card animates with 0.05s delay (`animation-delay: #{$i * 0.05}s`)
- **Ring chart**: 32px circular SVG progress indicator (right side)
- **Badge**: Optional "NEW" badge with `$orange-gradient` and pulse animation

### Ring Fill Colors
```scss
.ring-fill--cyan { stroke: $cyan; }    // #06b6d4
.ring-fill--purple { stroke: $purple; } // #a855f7  
.ring-fill--green { stroke: $success; } // #22c55e
```

### Responsive Grid
```scss
.metrics-section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);  // 5 cards
  gap: $space-3;
  
  @media (max-width: 1400px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}
```

### When to Use
- List pages (Customers, Leads, Opportunities, Contacts)
- Dashboard pages with key metrics
- Settings pages with configuration stats
- Any page needing KPI visualization row

---

## Form Page Pattern (Create/Edit/Settings Pages)

Use for: `role-form.page`, `customer-form.page`, `lead-form.page`, `workspace-settings.page`

### Key Features
- **Glass cards that lift on hover**: `translateY(-3px) scale(1.005)` + blue ambient glow
- **Focus-within effect**: When any input is focused, entire card gets `80px` blue glow
- **Gradient border**: Rainbow gradient appears on card hover via `::before` pseudo-element
- **Section title animation**: Icon scales up + enhanced shadow on card hover
- **Premium input focus**: `4px` blue ring + soft glow around focused inputs

### SCSS Setup
```scss
@use '../../../../shared/form-page-styles' as form;
@use '../../../../../styles/design-tokens' as *;

:host {
  @include form.premium-selection;
  @include form.premium-focus-ring;
}

.page-container {
  @include form.form-page-base;  // Mesh gradient + animated orbs
}
```

### Form Card with Focus Pop Effect
```scss
.form-card {
  @include form.form-section;  // Glass card with hover/focus effects
  
  &:hover .section-title {
    @include form.section-title-hover;  // Title animates on hover
  }
}

.section-title {
  @include form.section-title;  // Teal icon + title styling
}
```

### HTML Structure
```html
<section class="form-page">
  <header class="form-header">
    <div class="header-content">
      <app-breadcrumbs></app-breadcrumbs>
      <button class="back-link" routerLink="/app/...">
        <i class="pi pi-arrow-left"></i> Back
      </button>
      <div class="header-title">
        <h1>
          <span class="title-gradient">Create</span>
          <span class="title-light">Role</span>
        </h1>
        <p>Description text</p>
      </div>
    </div>
  </header>

  <div class="form-body">
    <form class="form-layout">
      <!-- Glass card that pops on focus -->
      <section class="form-card">
        <h3 class="section-title">
          <i class="pi pi-id-card"></i>
          Section Name
        </h3>
        <div class="form-grid">
          <div class="field">
            <label>Label <span class="required">*</span></label>
            <input pInputText formControlName="name" />
          </div>
        </div>
      </section>
    </form>
  </div>
</section>
```

### Available Mixins (`_form-page-styles.scss`)

| Mixin | Purpose |
|-------|---------|
| `form.form-page-base` | Mesh gradient background + animated orbs |
| `form.form-page-header` | Sticky frosted header bar |
| `form.form-header-title` | Gradient title + description styling |
| `form.form-back-link` | Blue animated back button |
| `form.form-section` | **Glass card with hover lift + focus glow** |
| `form.section-title` | Teal icon + title with border |
| `form.section-title-hover` | Title animation on card hover |
| `form.form-grid` | 2-column responsive grid |
| `form.form-field` | Field container with gap |
| `form.form-label` | Label styling |
| `form.premium-input` | Glass input base styling |
| `form.premium-input-hover` | Input hover state |
| `form.premium-input-focus` | **Blue focus ring + glow** |
| `form.button-primary` | Gradient primary button |
| `form.button-ghost` | Transparent ghost button |
| `form.form-actions` | Right-aligned action buttons |

### Section Icon Variants
```scss
.section-icon {
  // Default: teal/cyan
  &--info { /* blue */ }
  &--warning { /* amber */ }
  &--success { /* green */ }
}
```

---

## Color Palette Reference

### Primary Actions & Gradients
- **Primary gradient**: `#667eea → #764ba2` (purple-violet)
- **Title gradient**: Same as primary, with `animation: gradient-shift 4s`

### Section Headers (Form Pages)
- **Icon background**: `rgba(6, 182, 212, 0.15)` (teal)
- **Icon color**: `#06b6d4` (cyan-500)
- **Title color**: `#0e7490` (cyan-700)
- **Border**: `rgba(6, 182, 212, 0.2)`

### Focus States
- **Input focus ring**: `rgba(0, 122, 255, 0.15)` (Apple blue)
- **Card focus glow**: `rgba(0, 122, 255, 0.08)` 80px spread

### Status Colors
- **Success**: `#22c55e` / `#10b981`
- **Warning**: `#f59e0b` / `#f97316`
- **Info**: `#0ea5e9` / `#3b82f6`
- **Danger**: `#ef4444`

---

## Animation Patterns

### Card Hover (Form Pages)
```scss
&:hover {
  transform: translateY(-3px) scale(1.005);
  box-shadow: 
    0 24px 48px rgba(0, 122, 255, 0.08),
    0 0 60px rgba(0, 122, 255, 0.06);
}
```

### Focus-Within Glow
```scss
&:focus-within {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 32px rgba(0, 122, 255, 0.1),
    0 0 80px rgba(0, 122, 255, 0.08);
}
```

### Gradient Border on Hover
```scss
&::before {
  background: linear-gradient(135deg, 
    rgba(0, 122, 255, 0.4) 0%,
    rgba(175, 82, 222, 0.3) 50%,
    rgba(90, 200, 250, 0.4) 100%);
}
```

### Title Gradient Animation
```scss
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## Mock API layer
- Dev builds default to `environment.useMockApi = true`, so `/api/**` is intercepted by `mocks/mock-api.interceptor.ts`.
- To expose new mock endpoints, add handlers in the interceptor and data in `mock-db.ts`; keep payloads aligned with the future REST contracts.
- When pointing at the real API, flip `useMockApi` (or override via env files) so Angular uses `HttpClient` against `environment.apiUrl`.

---

# 🏗️ Backend Clean Architecture (MANDATORY)

## Architecture Overview
The backend **strictly follows Clean Architecture** with four layers. **All new features MUST follow this pattern.**

```
┌─────────────────────────────────────────────────────────────────┐
│                     CRM.Enterprise.Api                          │
│  Controllers, Contracts (DTOs), Middleware, Authorization       │
│  - Thin controllers that delegate to Application services       │
│  - NEVER inject DbContext directly into controllers             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CRM.Enterprise.Application                     │
│  Interfaces (IXxxService), DTOs, Business Logic Contracts       │
│  - Define service interfaces here                               │
│  - Define request/response DTOs here                            │
│  - NO database access, NO infrastructure concerns               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CRM.Enterprise.Domain                         │
│  Entities, Enums, Value Objects, Domain Events                  │
│  - Pure domain models with no dependencies                      │
│  - Business rules and invariants                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                CRM.Enterprise.Infrastructure                    │
│  Service Implementations, Repositories, DbContext, External APIs│
│  - Implements Application interfaces                            │
│  - Database access via CrmDbContext                             │
│  - Register services in DependencyInjection.cs                  │
└─────────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### Domain Layer (`CRM.Enterprise.Domain`)
- **Contains**: Entities, Enums, Value Objects, Domain Events
- **Dependencies**: None (innermost layer)
- **Location**: `server/src/CRM.Enterprise.Domain/`
```
Domain/
├── Entities/
│   └── Supplier.cs           # Entity with properties only
├── Enums/
│   └── SupplierStatus.cs     # Status enumerations
└── Common/
    └── AuditableEntity.cs    # Base classes
```

### Application Layer (`CRM.Enterprise.Application`)
- **Contains**: Service interfaces, DTOs, business logic contracts
- **Dependencies**: Domain only
- **Location**: `server/src/CRM.Enterprise.Application/`
```
Application/
├── Suppliers/
│   ├── ISupplierService.cs       # Interface definition
│   ├── SupplierDto.cs            # Data transfer objects
│   └── SupplierSearchRequest.cs  # Request models
└── DependencyInjection.cs        # Register application services
```

### Infrastructure Layer (`CRM.Enterprise.Infrastructure`)
- **Contains**: Service implementations, repositories, DbContext, external integrations
- **Dependencies**: Application, Domain
- **Location**: `server/src/CRM.Enterprise.Infrastructure/`
```
Infrastructure/
├── Suppliers/
│   └── SupplierService.cs    # Implements ISupplierService
├── Persistence/
│   └── CrmDbContext.cs       # EF Core DbContext
└── DependencyInjection.cs    # Register infrastructure services
```

### Api Layer (`CRM.Enterprise.Api`)
- **Contains**: Controllers, API Contracts (request/response records), Middleware
- **Dependencies**: Application (via interfaces only)
- **Location**: `server/src/CRM.Enterprise.Api/`
```
Api/
├── Controllers/
│   └── SuppliersController.cs    # Thin controller, delegates to ISupplierService
├── Contracts/
│   └── Suppliers/
│       ├── SupplierListItem.cs   # API response records
│       └── UpsertSupplierRequest.cs
└── Middleware/
```

## ⚠️ STRICT RULES

1. **Controllers MUST NOT inject DbContext directly**
   - ❌ `public SuppliersController(CrmDbContext dbContext)`
   - ✅ `public SuppliersController(ISupplierService supplierService)`

2. **Business logic MUST live in Application/Infrastructure, NOT Controllers**
   - Controllers should only: validate input, call service, return response

3. **Every new feature requires all 4 layers**:
   - Domain: Entity (if new)
   - Application: `IXxxService` interface + DTOs
   - Infrastructure: `XxxService` implementation
   - Api: Controller + Contracts

4. **Register services properly**:
   - Application services: `AddApplication()` in `Application/DependencyInjection.cs`
   - Infrastructure services: `AddInfrastructure()` in `Infrastructure/DependencyInjection.cs`

## Example: Adding a New Feature

To add a new "Suppliers" feature:

```csharp
// 1. Domain/Entities/Supplier.cs (if not exists)
public class Supplier : AuditableEntity { ... }

// 2. Application/Suppliers/ISupplierService.cs
public interface ISupplierService
{
    Task<SupplierSearchResponse> SearchAsync(SupplierSearchRequest request, CancellationToken ct);
    Task<SupplierDto?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<SupplierDto> CreateAsync(CreateSupplierRequest request, CancellationToken ct);
    Task<SupplierDto?> UpdateAsync(Guid id, UpdateSupplierRequest request, CancellationToken ct);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct);
}

// 3. Infrastructure/Suppliers/SupplierService.cs
public class SupplierService : ISupplierService
{
    private readonly CrmDbContext _dbContext;
    public SupplierService(CrmDbContext dbContext) => _dbContext = dbContext;
    // ... implement interface methods
}

// 4. Infrastructure/DependencyInjection.cs
services.AddScoped<ISupplierService, SupplierService>();

// 5. Api/Controllers/SuppliersController.cs
[ApiController]
public class SuppliersController : ControllerBase
{
    private readonly ISupplierService _supplierService;
    public SuppliersController(ISupplierService supplierService) => _supplierService = supplierService;
    // ... thin controller methods that delegate to service
}
```

---

## Backend workflow
- `Program.cs` wires `AddApplication()` + `AddInfrastructure()` and enforces CORS for localhost:4200/5173; update those lists if the client origin changes.
- Controllers return record DTOs under `Api/Contracts/**`; keep DTO definitions colocated with their controller namespace.
- **Controllers MUST delegate to Application layer services** - see Clean Architecture section above.
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
