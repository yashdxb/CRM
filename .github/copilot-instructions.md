# CRM Enterprise – Copilot Guide

> **Source of truth alignment**: This guide follows `docs/PROJECT_MASTER.md`. If any conflict exists, the **running codebase** is the source of truth.

---

## 1) Stack (Exact Versions)

### Frontend
- Angular: `~21.0.8`
- Angular CDK: `^21.0.6`
- PrimeNG: `~21.0.2`
- PrimeIcons: `^7.0.0`
- PrimeNG Themes: `~21.0.2`
- Chart.js: `^4.5.1`
- RxJS: `~7.8.0`
- TypeScript: `~5.9.2`
- Package manager: `npm@10.9.4`

### Backend
- .NET: `net10.0`
- Entity Framework Core: `8.0.7`
- SQL Server (Azure SQL in production; connection name `SqlServer`)
- Azure SignalR: `Microsoft.Azure.SignalR 1.32.0`
- Azure Communication Email: `1.0.2`
- Azure Service Bus: `7.17.4`
- SendGrid: removed (no longer used)

---

## 2) Repository Structure Rules

### Frontend (`client/src/app`)
- `core/`: cross-cutting services, guards, interceptors, notifications, auth helpers.
- `crm/`: CRM application features and pages.
- `public/`: public auth pages (login, invite accept, password change).
- `layout/`: shared shell, nav, and layout scaffolding.
- `shared/`: shared UI components, styles, utilities, and shared services.
- `mocks/`, `packs/`: use only for local development and packaged modules as currently structured.

### Backend (`server/src`)
- `CRM.Enterprise.Api`: API host, controllers, middleware, SignalR hubs.
- `CRM.Enterprise.Application`: use-case orchestration and application services.
- `CRM.Enterprise.Domain`: entities, domain rules, security permissions.
- `CRM.Enterprise.Infrastructure`: EF Core persistence, external services, integrations.

---

## 3) Monorepo Basics
- Angular 21 UI lives in `client/`; Clean Architecture API/Domain/Infrastructure sit in `server/src`.
- Run `npm install` + `npm start` from `client/` for the shell; `npm run build` targets Azure Static Web Apps.
- Backend lives under `server/src/CRM.Enterprise.Api`; use `dotnet build` then `dotnet run --project CRM.Enterprise.Api`.
- `docker compose up -d sqlserver` starts the local SQL Server declared in the root compose file.

---

## 4) Frontend Workflow

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
- Edit/Create form pages must match the **Edit Customer** page standard:
  - Card title styling, card body glass styling, field hover/focus, and primary action button must match.
  - Do not introduce per-page button colors or focus colors.

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

## 📐 LIST PAGE DESIGN SPECIFICATION (MANDATORY)

**Reference Implementation:** `customers.page.ts` + `customers.page.scss`  
**Use for:** `customers.page`, `leads.page`, `opportunities.page`, `contacts.page`, `dashboard.page`

### Visual Reference

![Customers List Page - Reference Implementation](../docs/images/customers-list-page-reference.png)

*The Customers Workspace page showcasing the canonical list page design: gradient background with animated orbs, hero section with stats, visual summary cards, metric KPI cards with ring charts, search/filter toolbar, and glassmorphic data table.*

---

### 1. PAGE CONTAINER & BACKGROUND

```scss
// Page container with gradient background
.page-container {
  position: relative;
  min-height: 100vh;
  padding: $space-5 $space-6;  // 20px 24px
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: $space-3;  // 12px
  }
}

// Animated background orbs (fixed position)
.bg-orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: orb-float 20s ease-in-out infinite;
  
  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }
  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }
  &.orb-3 { width: 300px; height: 300px; background: $secondary-gradient; top: 40%; right: 20%; animation-delay: -14s; }
}
```

---

### 2. HERO SECTION - TITLE STYLES (MANDATORY SIZES)

```scss
// Hero section: two-column grid layout
.hero-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $space-6;  // 24px
  margin-bottom: $space-5;  // 20px
  animation: fade-in-up 0.6s ease-out;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: $space-4;  // 16px
  }
}

// HERO TITLE - "Customer Workspace" main title
.hero-title {
  font-size: $font-size-4xl;  // 32px (2rem)
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin: 0 0 $space-1;  // 0 0 4px
  
  .title-gradient {
    background: $primary-gradient;  // #667eea → #764ba2
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 4s ease-in-out infinite;
  }
  
  .title-light {
    -webkit-text-fill-color: $gray-700;  // #374151
    margin-left: $space-2;  // 8px
  }
}

// Hero badge (e.g., "Customer Intelligence Hub")
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: $space-2;  // 8px
  padding: $space-1 $space-3;  // 4px 12px
  background: $glass-bg;  // rgba(255, 255, 255, 0.85)
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;  // rgba(255, 255, 255, 0.3)
  border-radius: $radius-full;  // 9999px (pill shape)
  font-size: $font-size-sm;  // 14px (0.875rem)
  font-weight: 600;
  color: $primary;  // #667eea
  text-transform: uppercase;
  letter-spacing: 0.1em;
  width: fit-content;
  box-shadow: $glass-shadow;
  
  .badge-dot {
    width: 8px;
    height: 8px;
    background: $success;  // #22c55e
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
  }
}

// Hero description text
.hero-description {
  font-size: $font-size-base;  // 16px (1rem)
  color: $gray-500;  // #6b7280
  font-weight: 400;
  max-width: 500px;
  line-height: 1.6;
  margin: 0;
}
```

---

### 3. HERO STATS (INLINE METRICS WITH PROGRESS BARS)

```scss
.hero-stats {
  display: flex;
  gap: $space-4;  // 16px
  flex-wrap: wrap;
  margin-top: $space-2;  // 8px
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 80px;
  
  .stat-value {
    font-size: $font-size-2xl;  // 22px (1.375rem)
    font-weight: 700;
    color: $gray-800;  // #1f2937
  }
  
  .stat-label {
    font-size: $font-size-xs;  // 13px (0.8125rem)
    color: $gray-500;  // #6b7280
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .stat-bar {
    width: 100%;
    height: 4px;
    background: $gray-200;  // #e5e7eb
    border-radius: $radius-full;
    overflow: hidden;
    
    .stat-bar-fill {
      height: 100%;
      background: $primary-gradient;
      border-radius: $radius-full;
      transition: width 1s ease-out;
      
      &--leads { background: $cyan-gradient; }
      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }
      &--success { background: $success-gradient; }
    }
  }
}
```

---

### 4. VISUAL CARDS (HERO SIDEBAR)

```scss
.hero-visual {
  display: flex;
  flex-direction: column;
  gap: $space-3;  // 12px
  animation: slide-in-right 0.6s ease-out 0.2s both;
}

.visual-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: $space-3;  // 12px
  padding: $space-3 $space-4;  // 12px 16px
  background: $glass-bg;  // rgba(255, 255, 255, 0.85)
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: $radius-lg;  // 12px (0.75rem)
  box-shadow: $glass-shadow;
  min-width: 220px;
  overflow: hidden;
  transition: transform 250ms, box-shadow 250ms;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $glass-shadow-lg;
  }
  
  .card-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-md;  // 8px
    font-size: $font-size-xl;  // 20px (1.25rem)
  }
  
  &--primary .card-icon { background: $primary-gradient; color: white; }
  &--secondary .card-icon { background: $cyan-gradient; color: white; }
  &--success .card-icon { background: $success-gradient; color: white; }
  &--purple .card-icon { background: $purple-gradient; color: white; }
  
  .card-label {
    font-size: $font-size-xs;  // 13px
    color: $gray-500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-value {
    font-size: $font-size-2xl;  // 22px (1.375rem)
    font-weight: 700;
    color: $gray-800;
  }
  
  .card-trend {
    display: flex;
    align-items: center;
    gap: $space-1;  // 4px
    font-size: $font-size-xs;  // 13px
    color: $gray-500;
    
    &--up { color: $success; }
  }
  
  .card-glow {
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
}
```

---

### 5. METRIC CARDS (KPI ROW)

```scss
.metrics-section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $space-3;  // 12px
  margin-bottom: $space-5;  // 20px
  
  @media (max-width: 1400px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.metric-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: $space-3;  // 12px
  padding: $space-3 $space-4;  // 12px 16px
  background: $glass-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: $radius-lg;  // 12px
  box-shadow: $glass-shadow;
  overflow: hidden;
  transition: all 250ms;
  animation: fade-in-up 0.5s ease-out backwards;
  
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $glass-shadow-lg;
    
    .metric-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }
  
  .metric-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-md;  // 8px
    font-size: $font-size-lg;  // 18px
    color: white;
    flex-shrink: 0;
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  &--total .metric-icon { background: $primary-gradient; }
  &--leads .metric-icon { background: $cyan-gradient; }
  &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }
  &--customers .metric-icon { background: $success-gradient; }
  &--new .metric-icon { background: $orange-gradient; }
  
  .metric-label {
    font-size: $font-size-xs;  // 13px
    color: $gray-500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .metric-value {
    font-size: $font-size-2xl;  // 22px (1.375rem)
    font-weight: 700;
    color: $gray-800;
  }
}

// Ring chart inside metric card
.metric-ring {
  position: absolute;
  right: $space-3;  // 12px
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: $gray-200; stroke-width: 3; }
  .ring-fill {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    transition: stroke-dasharray 1s ease-out;
    
    &--cyan { stroke: $cyan; }
    &--purple { stroke: $purple; }
    &--green { stroke: $success; }
  }
}

// "NEW" badge pulse
.metric-badge span {
  display: inline-block;
  padding: $space-1 $space-2;  // 4px 8px
  background: $orange-gradient;
  color: white;
  font-size: $font-size-xs;  // 13px
  font-weight: 700;
  border-radius: $radius-sm;  // 6px
  animation: badge-pulse 2s ease-in-out infinite;
}
```

---

### 6. BUTTONS (LIST PAGE ACTIONS)

```scss
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $space-2;  // 8px
  padding: $space-2 $space-4;  // 8px 16px
  border: none;
  border-radius: $radius-md;  // 8px
  font-size: $font-size-base;  // 16px
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms;
  overflow: hidden;
  
  i { font-size: $font-size-base; }
}

.btn-primary {
  background: $primary-gradient;  // #667eea → #764ba2
  color: white;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
  
  &:active { transform: translateY(0); }
}

// Shimmer glow effect on primary button
.btn-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 3s infinite;
}

.btn-secondary {
  background: $glass-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  color: $gray-700;
  box-shadow: $glass-shadow;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: $glass-shadow-lg;
  }
}

.btn-ghost {
  background: transparent;
  color: $gray-600;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: $gray-800;
  }
}
```

---

### 7. DATA TABLE STYLES (MANDATORY)

```scss
.data-section {
  position: relative;
  z-index: 1;
  animation: fade-in-up 0.5s ease-out 0.4s both;
}

.data-card {
  background: $glass-bg;
  backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: $radius-2xl;  // 24px (1.5rem)
  box-shadow: $glass-shadow;
  overflow: hidden;
}

.data-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-3 $space-4;  // 12px 16px
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  h2 {
    margin: 0;
    font-size: $font-size-lg;  // 18px (1.125rem)
    font-weight: 600;
    color: $gray-800;
  }
  
  .record-count {
    font-size: $font-size-sm;  // 14px
    color: $gray-500;
  }
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 16px;
  overflow: hidden;
  
  // TABLE HEADER - Soft blue gradient (GLOBAL STANDARD)
  ::ng-deep .p-datatable-thead > tr > th {
    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);
    border: none;
    border-bottom: 2px solid rgba(59, 130, 246, 0.2);
    padding: $space-3 $space-4;  // 12px 16px
    font-size: 0.72rem;  // ~11.5px (header labels)
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #3b82f6;  // Blue-500
  }
  
  // TABLE BODY CELLS
  ::ng-deep .p-datatable-tbody > tr > td {
    vertical-align: middle;
    padding: $space-3 $space-2;  // 12px 8px
  }
  
  // Row hover effect
  .table-row {
    transition: background 150ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    
    &:last-child { border-bottom: none; }
    
    &:hover {
      background: rgba($primary, 0.03);
      
      .customer-avatar {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba($primary, 0.2);
      }
    }
  }
}

// Customer avatar in table
.customer-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-gradient;
  color: white;
  font-size: $font-size-sm;  // 14px
  font-weight: 600;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

// Customer name in table
.customer-info {
  .customer-name {
    font-weight: 600;
    font-size: $font-size-base;  // 16px
    color: $gray-800;
  }
  
  .customer-date {
    font-size: $font-size-xs;  // 13px
    color: $gray-400;
  }
}

// Status badges
.status-badge {
  display: inline-flex;
  padding: 2px $space-2;  // 2px 8px
  font-size: $font-size-sm;  // 14px
  font-weight: 600;
  border-radius: $radius-full;  // pill
  text-transform: capitalize;
  
  &[data-status="lead"] { background: rgba($cyan, 0.15); color: darken($cyan, 15%); }
  &[data-status="prospect"] { background: rgba($purple, 0.15); color: darken($purple, 15%); }
  &[data-status="customer"] { background: rgba($success, 0.15); color: darken($success, 15%); }
  &[data-status="inactive"] { background: rgba($gray-500, 0.15); color: $gray-600; }
}
```

---

### 8. UNIFIED BUTTON STANDARD (MANDATORY)

> **Source file**: `client/src/app/shared/page-design-system.scss` (globally imported — no per-component import needed)
> **Rule**: All list/dashboard/settings page buttons MUST use this 4-tier system. Do NOT use `pButton` directive, `crm-button`, `btn-primary`, `btn-ghost`, `icon-btn`, or `action-icon` classes for action buttons.

#### Tier 1 — Header / Toolbar Buttons (`.action-btn`)

Glass pill buttons with gradient icon badges. Used in hero-actions, data-headers, and filter bars.

```html
<button type="button" class="action-btn action-btn--add">
  <span class="action-btn__icon"><i class="pi pi-plus"></i></span>
  <span>New Record</span>
</button>
```

| Variant | Color | Use Case |
|---------|-------|----------|
| `--add` | Primary gradient (#667eea→#764ba2) | Create / Add actions |
| `--refresh` | Blue (#3b82f6) | Refresh / Reload |
| `--import` | Cyan (#06b6d4) | Import data |
| `--export` | Green (#22c55e) | Export data |
| `--columns` | Purple (#a855f7) | Column config |
| `--settings` | Gray (#6b7280) | Settings / Config |
| `--attribution` | Orange (#f97316) | Attribution / Analytics |
| `--security` | Orange (#f97316) | Security / Permissions |
| `--users` | Purple (#a855f7) | User management |
| `--back` | Gray (#6b7280) | Back navigation |

#### Tier 2 — Table Row Buttons (`.row-action-btn`)

32px gradient circles for table row actions. No text label — icon only with `title` attribute.

```html
<div class="row-actions">
  <button type="button" class="row-action-btn row-action-btn--edit" title="Edit">
    <i class="pi pi-pencil"></i>
  </button>
  <button type="button" class="row-action-btn row-action-btn--delete" title="Delete">
    <i class="pi pi-trash"></i>
  </button>
</div>
```

| Variant | Gradient | Use Case |
|---------|----------|----------|
| `--edit` | Blue (#60a5fa→#3b82f6) | Edit record |
| `--delete` | Red (#f87171→#ef4444) | Delete record |
| `--view` | Cyan (#22d3ee→#06b6d4) | View details |
| `--complete` | Green (#4ade80→#22c55e) | Mark complete |
| `--convert` | Purple (#c084fc→#a855f7) | Convert / Promote |
| `--coach` | Orange (#fb923c→#f97316) | AI Coach / Assist |
| `--activity` | Primary (#818cf8→#667eea) | Log activity |
| `--archive` | Gray (#9ca3af→#6b7280) | Archive |

#### Tier 3 — Card Footer Buttons (`.card-btn`)

Split buttons for card-style layouts with mini gradient icon badges.

```html
<button type="button" class="card-btn card-btn--edit">
  <span class="card-btn__icon"><i class="pi pi-pencil"></i></span>
  <span>Edit</span>
</button>
```

#### Tier 4 — Kanban Mini Buttons (`.mini-action-btn`)

26px compact buttons for kanban cards.

```html
<button type="button" class="mini-action-btn mini-action-btn--edit" title="Edit">
  <i class="pi pi-pencil"></i>
</button>
```

#### Key Rules
- **Always** use plain `<button type="button">` — NO `pButton` directive
- **Always** put icons via `<i class="pi pi-...">` tags inside the button
- **Wrap** `.row-action-btn` containers in `<div class="row-actions">`
- **Dialog buttons** (Cancel/Save inside `<p-dialog>`) are exempt — keep PrimeNG styling
- **Empty-state CTA** buttons are exempt — keep existing styling
- **View-toggle** and **filter-pill** buttons are exempt — they're not action buttons

---

### 9. REQUIRED ANIMATIONS

```scss
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -30px) scale(1.1); }
  50% { transform: translate(100px, 20px) scale(0.9); }
  75% { transform: translate(30px, 50px) scale(1.05); }
}

@keyframes badge-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

---

### 10. QUICK SIZE REFERENCE TABLE

| Element | Font Size | Padding/Size | Notes |
|---------|-----------|--------------|-------|
| Hero Title (`.hero-title`) | 32px (`$font-size-4xl`) | - | Bold 800, gradient text |
| Hero Title Light (`.title-light`) | 32px | `margin-left: 8px` | Gray-700 color |
| Hero Badge | 14px (`$font-size-sm`) | `4px 12px` | Uppercase, letter-spacing 0.1em |
| Hero Description | 16px (`$font-size-base`) | - | Gray-500, max-width 500px |
| Stat Value | 22px (`$font-size-2xl`) | - | Bold 700 |
| Stat Label | 13px (`$font-size-xs`) | - | Uppercase, letter-spacing 0.05em |
| Visual Card | - | `12px 16px` | Min-width 220px |
| Visual Card Icon | 20px (`$font-size-xl`) | `36px × 36px` | Border-radius 8px |
| Visual Card Value | 22px (`$font-size-2xl`) | - | Bold 700 |
| Metric Card | - | `12px 16px` | Border-radius 12px |
| Metric Card Icon | 18px (`$font-size-lg`) | `36px × 36px` | Border-radius 8px |
| Metric Card Value | 22px (`$font-size-2xl`) | - | Bold 700 |
| Button (`.btn`) | 16px (`$font-size-base`) | `8px 16px` | Bold 600, border-radius 8px |
| Table Header | ~11.5px (`0.72rem`) | `12px 16px` | Uppercase, letter-spacing 0.08em |
| Table Cell | 16px (`$font-size-base`) | `12px 8px` | - |
| Customer Avatar | 14px (`$font-size-sm`) | `32px × 32px` | Circular |
| Status Badge | 14px (`$font-size-sm`) | `2px 8px` | Pill shape |
| Icon Button | 14px (`$font-size-sm`) | `26px × 26px` | Border-radius 6px |

---

### 11. SCSS IMPORT PATTERN

```scss
// customers.page.scss (or any list page)
@use '../../../../../styles/design-tokens' as *;
@use 'sass:color';

// All styles from this specification...
```

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
          <!-- Text input: Horizontal label + InputGroup + colorful icon addon -->
          <div class="form-field">
            <label for="field-name">Name <span class="required">*</span></label>
            <p-inputgroup>
              <p-inputgroup-addon class="icon-addon icon-addon--name">
                <i class="pi pi-user"></i>
              </p-inputgroup-addon>
              <input pInputText id="field-name" formControlName="name" placeholder="Enter name" />
            </p-inputgroup>
          </div>
        </div>
      </section>
    </form>
  </div>
</section>
```

### Form Input Field Standard (MANDATORY)

All form input fields across the CRM **MUST** use **horizontal labels** (label beside field, right-aligned) with colorful `<p-inputgroup>` icon addons. The label sits to the left of the input, right-aligned with a fixed `min-width: 110px`.

#### Required Imports
```typescript
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// Add to component imports array
```

#### Form Field Layout (Horizontal Labels — Gold Standard)
```scss
// .form-field uses horizontal layout: label left, input right
.form-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.form-field > label {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  font-size: 0.8125rem;    // 13px
  font-weight: 600;
  color: #475569;          // Slate-600 (gold standard)
  letter-spacing: 0.01em;
  white-space: nowrap;
  min-width: 110px;        // Fixed label width
  flex-shrink: 0;
  text-align: right;       // Right-aligned labels
  transition: color 0.2s ease;
}

// InputGroup fills remaining space
.form-field > p-inputgroup,
.form-field > p-select,
.form-field > textarea {
  flex: 1;
  min-width: 0;
}
```

#### Text / Email / Number Inputs
```html
<div class="form-field">
  <label for="field-email">Email <span class="required">*</span></label>
  <p-inputgroup>
    <p-inputgroup-addon class="icon-addon icon-addon--email">
      <i class="pi pi-envelope"></i>
    </p-inputgroup-addon>
    <input pInputText id="field-email" type="email" formControlName="email" placeholder="Enter email" />
  </p-inputgroup>
</div>
```

#### Textarea Inputs
```html
<div class="form-field">
  <label for="field-notes">Notes</label>
  <textarea pTextarea id="field-notes" formControlName="notes" rows="4" placeholder="Enter notes"></textarea>
</div>
```

#### Select Dropdowns
```html
<div class="form-field">
  <label for="field-status">Status <span class="required">*</span></label>
  <p-select id="field-status" [options]="statusOptions()" optionLabel="label" optionValue="value"
            formControlName="status" placeholder="Select status" class="w-full" appendTo="body">
    <ng-template pTemplate="item" let-option>
      <div class="select-option"><i class="pi" [ngClass]="option.icon"></i><span>{{ option.label }}</span></div>
    </ng-template>
    <ng-template pTemplate="value" let-option>
      <div class="select-option" *ngIf="option"><i class="pi" [ngClass]="option.icon"></i><span>{{ option.label }}</span></div>
      <span *ngIf="!option" class="select-placeholder">Select status</span>
    </ng-template>
  </p-select>
</div>
```

#### Icon Addon Variants (Colorful — MANDATORY)
Every `<p-inputgroup-addon>` **MUST** use a colorful `icon-addon--*` variant class. Generic gray icons are not allowed. Use `icon-addon` + a specific `icon-addon--*` class (global rules in `client/src/styles/_components.scss`):

| Class | Icon Color (Hex) | Background | Common Use |
|-------|-----------------|------------|------------|
| `icon-addon--name` | `#6366f1` (Indigo) | `rgba(99, 102, 241, 0.14)` | Name fields |
| `icon-addon--industry` | `#a855f7` (Purple) | `rgba(168, 85, 247, 0.14)` | Industry/category |
| `icon-addon--company` | `#3b82f6` (Blue) | `rgba(59, 130, 246, 0.14)` | Company/org |
| `icon-addon--email` | `#ec4899` (Pink) | `rgba(236, 72, 153, 0.14)` | Email fields |
| `icon-addon--phone` | `#22c55e` (Green) | `rgba(34, 197, 94, 0.14)` | Phone/contact |
| `icon-addon--website` | `#4f46e5` (Deep Indigo) | `rgba(79, 70, 229, 0.14)` | Website/URL |
| `icon-addon--address` | `#f59e0b` (Amber) | `rgba(245, 158, 11, 0.14)` | Address/location |
| `icon-addon--info` | `#3b82f6` (Blue) | `rgba(59, 130, 246, 0.14)` | General info |
| `icon-addon--success` | `#22c55e` (Green) | `rgba(34, 197, 94, 0.14)` | Success/positive |
| `icon-addon--warning` | `#f59e0b` (Amber) | `rgba(245, 158, 11, 0.14)` | Warning/caution |
| `icon-addon--danger` | `#ef4444` (Red) | `rgba(239, 68, 68, 0.14)` | Danger/critical |

#### InputGroup Focus Enhancement
When an input is focused, the icon addon gets a visual boost:
```scss
:host ::ng-deep p-inputgroup:focus-within p-inputgroup-addon.icon-addon {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(var(--apple-blue), 0.5);
  transform: scale(1.03);
}
```

#### Key Rules
- **Always** use horizontal label layout — label to the left of the field, right-aligned with `min-width: 110px`.
- **Always** use `<p-inputgroup>` + `<p-inputgroup-addon>` with a **colorful** `icon-addon--*` variant for text/email/number/tel inputs.
- **Every icon addon MUST have a unique color** — no generic gray addons.
- **Focus-within label color (MANDATORY):** When any input inside a `.form-field` receives focus, the field label MUST change color to `#4f46e5` (Indigo-600). This provides clear visual feedback for the active field. Implement via `.form-field:focus-within > label { color: #4f46e5; }`. This rule applies to ALL form pages — no exceptions.
- **Container class (MANDATORY):** Every form field container MUST use `class="form-field"`. The old `class="field"` pattern is **deprecated and prohibited**. When encountering `class="field"`, `class="field full"`, `class="field full-row"`, or any `field`-prefixed variant, migrate it to `class="form-field"` (or `class="form-field full-row"` for full-width fields that need vertical stacking).
- **Complex fields with multiple child controls** (e.g., phone grid, score with meta) MUST wrap children in a flex container div (e.g., `.phone-grid`, `.score-content`) and add that class to the `.form-field` flex-child selector in SCSS.
- Selects and textareas use the same horizontal label layout but do NOT need `<p-inputgroup>` wrapping.
- `<p-select>` elements MUST use `appendTo="body"` to prevent overlay clipping.
- Error messages go after the input/inputgroup, inside the `.form-field` container.
- Each input must have a unique `id` and matching `for` on the `<label>`.
- Dialogs follow the same standard — no exemptions for dialog forms.
- **SCSS `.form-field` block is required per page.** Every form page SCSS must define the `.form-field` horizontal layout block with: `display: flex; flex-direction: row; align-items: center; gap: 0.75rem;` plus the label styles (`min-width: 110px; text-align: right; color: #475569;`), hover state (`color: #334155;`), and focus-within state (`color: #4f46e5;`). Pages using shared `_form-page-styles.scss` mixins get this automatically; standalone pages must add it explicitly.

### Mandatory Select Rules
- **Every `<p-select>` MUST render icons for each option.**
- Always include `pTemplate="item"` + `pTemplate="value"` with icon + label.
- Always show a placeholder inside the value template when empty.
- Icons must be colorful (no black/white). Add color mappings in `client/src/styles.scss` when introducing new icons.

Example pattern:
```html
<p-select [options]="statusOptions()" optionLabel="label" optionValue="value" formControlName="status">
  <ng-template pTemplate="item" let-option>
    <div class="select-option">
      <i class="pi" [ngClass]="option.icon"></i>
      <span>{{ option.label }}</span>
    </div>
  </ng-template>
  <ng-template pTemplate="value" let-option>
    <div class="select-option" *ngIf="option">
      <i class="pi" [ngClass]="option.icon"></i>
      <span>{{ option.label }}</span>
    </div>
    <span *ngIf="!option" class="select-placeholder">Select status</span>
  </ng-template>
</p-select>
```

### Form Field Color Gold Standard (MANDATORY)

All form pages **MUST** use these exact color values for labels, inputs, and placeholders. These are the authoritative, approved values for the CRM.

#### Input Text Color
| Property | Value | Token |
|----------|-------|-------|
| Color | `#1e293b` | Slate-800 |
| Font Weight | `500` | Medium |

Applied via `@include form.premium-input` mixin (includes `color: #1e293b !important; font-weight: 500 !important;`). Pages with inline input styles must add this explicitly.

#### Label Color
| State | Value | Token |
|-------|-------|-------|
| Default | `#475569` | Slate-600 |
| Hover | `#334155` | Slate-700 |
| Focus-within | `#4f46e5` | Indigo-600 |
| Font Weight | `600` | Semi-bold |
| Font Size | `0.8125rem` | 13px |

Applied via `@include form.form-label` mixin. Pages with inline label styles must match these values.

#### Placeholder
| Property | Value |
|----------|-------|
| Color | `rgba(var(--apple-gray-1), 0.6)` |
| Font Weight | `400` |

#### Section Header Colors (Default)
Default section headers use **teal/cyan**:
- Title color: `#0e7490` (cyan-700)
- Icon color: `#06b6d4` (cyan-500)
- Icon background: `rgba(6, 182, 212, 0.15)`

#### Per-Section Color Identity (Optional)
Pages with multiple form sections MAY apply per-section color identity using CSS variant classes. The canonical example is `customer-form.page`:

| Section | Class | Title Color | Icon Color | Icon BG |
|---------|-------|-------------|------------|---------|
| Basic Info | `section--basic` | `#4338ca` (Indigo-700) | `#6366f1` (Indigo-500) | `rgba(99, 102, 241, 0.15)` |
| Contact Info | `section--contact` | `#047857` (Emerald-700) | `#10b981` (Emerald-500) | `rgba(16, 185, 129, 0.15)` |
| Additional Info | `section--additional` | `#b45309` (Amber-700) | `#f59e0b` (Amber-500) | `rgba(245, 158, 11, 0.15)` |
| Workspace | `section--workspace` | `#6d28d9` (Violet-700) | `#8b5cf6` (Violet-500) | `rgba(139, 92, 246, 0.15)` |

#### Key Rules
- **Never** use teal `#0891b2` for form field labels — only for section-title hover accents
- **Always** ensure WCAG AA contrast (minimum 4.5:1) for label text
- Inline form pages that do NOT use the shared mixins must manually set these values
- `<p-select>` elements on form pages must use `appendTo="body"` to prevent overlay clipping

---

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
| `form.form-label` | Label styling (`#475569` Slate-600, 600 weight) |
| `form.premium-input` | Glass input with text color (`#1e293b` Slate-800, 500 weight) |
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

### Form Field Colors (Gold Standard)
- **Input text**: `#1e293b` (Slate-800) — weight 500
- **Label default**: `#475569` (Slate-600) — weight 600
- **Label hover**: `#334155` (Slate-700)
- **Label focus-within**: `#4f46e5` (Indigo-600)
- **Placeholder**: `rgba(var(--apple-gray-1), 0.6)` — weight 400

### Section Headers (Form Pages)
- **Icon background**: `rgba(6, 182, 212, 0.15)` (teal)
- **Icon color**: `#06b6d4` (cyan-500)
- **Title color**: `#0e7490` (cyan-700)
- **Border**: `rgba(6, 182, 212, 0.2)`

### Focus States
- **Input focus ring**: `rgba(0, 122, 255, 0.15)` (Apple blue)
- **Card focus glow**: `rgba(0, 122, 255, 0.08)` 80px spread
- **Label focus-within color**: `#4f46e5` (Indigo-600) — label turns indigo when its sibling input is focused. MANDATORY on all form pages.
- **Field background on focus**: `rgba(255, 255, 255, 0.72)` with border `rgba(var(--apple-blue), 0.22)` and shadow `0 4px 14px rgba(var(--apple-blue), 0.07)`

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
- **Production guard (MANDATORY):** never seed demo/test/sample data in Production by default.
- Production test-data seeding is allowed only with explicit owner approval and an explicit runtime override (`Seeding:AllowProductionTestData=true`).
- Update the connection string + JWT secrets in `CRM.Enterprise.Api/appsettings.Development.json`; identical names are required in Azure app settings later.

## Feature development checklist
- Decide whether the UI should hit the mock layer or backend; update both the Angular service and, if mocking, the interceptor/data so UX stays functional offline.
- For backend additions, add contracts → controller → domain/infrastructure pieces, then register services in `AddApplication`/`AddInfrastructure` as needed.
- Whenever endpoints touch the DB, mirror the DTO in Angular (models/service) so shapes stay in sync; rely on the PrimeNG patterns already in `features/*/pages`.
- Keep tests aligned with existing tooling (`ng test` / Vitest when configured) and prefer integration tests at the API layer once DbContext mappings solidify.

---

## 5) Authentication and Authorization
- JWT Bearer authentication with issuer/audience validation.
- Claims-based authorization using `crm:permission`.
- Policies are defined in `CRM.Enterprise.Security.Permissions` and enforced per controller/action.
- Authorization fallback policy requires authenticated users.

---

## 6) Tenant and Role Handling
- Tenant resolution: `X-Tenant-Key` header or host-based mapping.
- Default tenant key comes from configuration (`Tenant:DefaultKey`) when not resolved.
- Tenant provider is set per request; EF query filters rely on it.
- System roles are defined in `CRM.Enterprise.Security.Permissions.RoleNames`.
- **Security levels are tenant-defined. Do not hard-code role security tiers.**

---

## 7) UI/UX Standards (Current)

### Style Change Control (MANDATORY)
- Global styles are authoritative: `client/src/styles` and `client/src/app/shared`.
- **Do not change, alter, or refactor visual styles unless the user explicitly requests a style/UI change in that task.**

### Page Background Baseline (MANDATORY)
- Use the shared Activity Workspace aurora background as the default CRM background system.
- For pages with explicit background layers, use `.page-background` + `.animated-orb` + `.grid-pattern` from `client/src/styles/_components.scss`.
- For pages/forms without explicit background markup, rely on the shell-level fallback background in `client/src/app/layout/shell.component.scss`.
- Do not create page-local background variants unless explicitly requested.

### Login UI Lock
- The current login screen visual design is approved/locked. Do not change its styles without explicit approval.
- **Auth screens parity:** All public auth pages (login, accept-invite, change-password, password reset) must match the login screen's visual system: same background (orbs + grid + noise), glass card treatment, typography, spacing, and button styling.
- **Auth shell component:** Public auth pages must use the shared `AuthShellComponent` to ensure visual parity and avoid style drift.

### Heading Hierarchy
- exactly one `h1.hero-title` per page
- `h2.section-title` for section headers
- `h3.card-title`/`h3.section-title` for card and subsection headers
- `page-subtitle`/`hero-subtitle`/`hero-description` for subtitle copy

### Other UI Rules
- Pages must use the animated orb background and shared layout containers.
- Premium glass/gradient styling is required; do not create one-off themes.
- Button styles must use the global CRM button classes.
- List pages and form pages follow the Component Style Guide templates.
- UI/API binding rule: dropdown and selection data must come from API contracts (no local fallback datasets for production behavior).

---

## 8) Mobile Responsive (MANDATORY)

### Guiding Principles
- Mobile responsiveness is a **core product requirement** for CRM pages (not a later polish item).
- Preserve the premium CRM visual language on mobile: glass, gradients, shadows, and typography hierarchy should **adapt**, not be removed.
- Default implementation approach: layout/spacing adapt first; information hierarchy stays intact; avoid hiding critical workflow actions/data on mobile.

### Technical Implementation
- Use shared responsive utilities and breakpoints from `client/src/styles/_design-tokens.scss` (do not create page-local breakpoint systems).
- Use `DeviceService` (`client/src/app/core/device/device.service.ts`) for reactive device-aware rendering when CSS-only adaptation is not sufficient.
- For dense tabular UI (especially PrimeNG DataTable), prefer the shared wrapper pattern: `client/src/app/shared/mobile-table-wrapper.component.ts`.

### Touch Interaction Standards
- minimum touch targets (`44x44px`)
- readable spacing
- no hover-only critical actions

### Validation Before Closing UI Work
- desktop, tablet, and mobile viewport checks
- verify no horizontal overflow and maintain actionability/readability

### Mobile Documentation (Source of Truth)
- `docs/MOBILE_IMPLEMENTATION_SUMMARY.md` – implementation status and delivered infrastructure
- `docs/MOBILE_RESPONSIVE_GUIDE.md` – product/UX + developer guidance, breakpoints, patterns, testing
- `docs/MOBILE_TECHNICAL_REFERENCE.md` – developer technical reference for mixins, `DeviceService`, patterns

---

## 9) Coding Rules and Boundaries
- Follow the shared style guides; do not override on a per-page basis.
- Avoid page-specific tokens; introduce new tokens only in shared global files.
- Respect existing module boundaries; do not move files across layers without approval.
- Keep TypeScript strict and Angular template strict rules enabled.

---

## 10) DO NOT Rules (Explicit)
- Do not add new frameworks, UI libraries, or architectural patterns.
- Do not refactor or reorganize folders unless explicitly requested.
- Do not hardcode environment-specific URLs in production builds.
- Do not bypass tenant isolation or permission checks.
- Do not hardcode role names or role-based layouts; use hierarchy levels + configured defaults.
- Do not introduce inline HTML/CSS in components.

---

## 11) AI-Generated Code Rules
- No guessing: use the current codebase and documentation only.
- Diff-only changes: smallest viable edits, no sweeping refactors.
- No modernization or library upgrades.
- Always preserve existing behavior unless explicitly asked to change it.
- When unclear, ask for clarification instead of inventing.

---

## 12) Operational Notes (Current Reality)
- CORS is controlled in `CRM.Enterprise.Api/Program.cs` and App Service CORS settings.
- Production frontend must target the production API host (do not point to dev API in prod builds).
- SignalR hubs are mapped to:
  - `/api/hubs/presence` (online/offline user presence)
  - `/api/hubs/crm-events` (tenant/user-targeted CRM realtime events: decision, notifications, stage changes, renewals, email delivery)
  Both use the same CORS policy and JWT query-token handling for websocket connections.
- **Deployment gate:** before any deploy, verify both client and API builds succeed.
- **Deployment method:** push to `master` triggers GitHub Actions for both client and API.
  - Client workflow: `.github/workflows/azure-static-web-apps-jolly-dune-0d9d1fe0f.yml`
  - API workflow: `.github/workflows/deploy-api.yml`
- **Mobile app CI/CD:** Flutter mobile ships from a **separate repo** (`https://github.com/yashdxb/crm-enterprise-mobile`).
- **Daily ops log:** record daily issues and fixes in `docs/DAILY_OPERATIONS_LOG.md`.
- **Lead AI scoring:** Lead score refresh uses Azure OpenAI when configured, falls back to OpenAI, then rules-based scoring.

---

## 13) Issue Fix Patterns (Current Reality)
- PrimeNG select edits: insert a temporary option when pre-filling forms so values render before options load.
- Activity edit/list time: parse API timestamps as UTC (append `Z` when missing) and display in user local time.
- Lead status resolution: resolve `LeadStatus` entities and attach to `Lead` before save to avoid FK insert order issues.
- User directory tables must page through API results in production so Azure-hosted builds can see every tenant user.
- Presence status requires a SignalR connection that includes the tenant header plus the stored JWT even before any user interaction.
- Tenant keys persisted from login now survive returning to the root host, so the realtime connection always carries the proper `X-Tenant-Key`.
- Presence service now treats the locally-authenticated user as online immediately so the green dot isn't erased while the hub snapshot finishes.

---

## 14) Test Plan Summary

### Mandatory Execution Rule
- After every code modification or implementation, Playwright UI execution is required before task closure.
- Minimum required run: `client/e2e/smoke.spec.ts`.
- Targeted Playwright spec(s) for the modified module must also run when present.
- Default execution target is local development. Do not run Playwright against Azure dev unless explicitly requested.

### Current E2E Coverage
- `client/e2e/lead-lifecycle.spec.ts`
- `client/e2e/core-flows.spec.ts`
- `client/e2e/smoke.spec.ts`

---

## 15) Azure Services (Current and Required)

### Current Azure-Native Services Used
- Azure App Service (API hosting)
- Azure Static Web Apps (frontend hosting)
- Azure SQL Database (primary data store)
- Azure SignalR (presence and realtime features)
- Azure Communication Email (transactional email)
- Azure Service Bus (email queue and async processing)
- (SendGrid: removed / deprecated)

### Operational Rules
- CORS must be configured in both API code and App Service settings.
- Always align environment URLs (dev vs prod) across client and API.
- Health endpoints: `/health` and `/healthz` should remain available.

---

## 16) AI Assistant (Foundry-backed)

### Evidence Paths
- API: `server/src/CRM.Enterprise.Api/Controllers/AssistantController.cs`
- Foundry client: `server/src/CRM.Enterprise.Infrastructure/AI/FoundryAgentClient.cs`
- Chat storage: `server/src/CRM.Enterprise.Domain/Entities/AssistantThread.cs`
- UI: `client/src/app/core/assistant/assistant-panel.component.ts`

### Knowledge Team Guides (Operational)
- `docs/AI_ASSISTANT_KNOWLEDGE_QUICK_START.md` (quick onboarding / TL;DR publishing flow)
- `docs/AI_KNOWLEDGE_FEEDING_GUIDE.md` (end-to-end workflow and validation)
- `docs/CRM_CAPABILITIES_KNOWLEDGE_MAPPING.md` (CRM capability coverage → knowledge document mapping)
- `docs/ai/KNOWLEDGE_GROUNDING_GUIDE.md` (runtime/system grounding reference)

### Scripts
- Knowledge manifest builder: `scripts/build_ai_knowledge_manifest.py`
- Search index setup: `scripts/setup_ai_knowledge_search_index.py`
- Search uploader: `scripts/push_ai_knowledge_to_search.py`
- Azure AI Search (dev): `crmenterprisesearchdevca` / index `crm-ai-knowledge`

---

## 17) ClickUp Automation (Backlog + Governance)

### Backlog Structure (Current)
- **Epics list** (Product & Planning): `Now`, `Next`, `Later`
- **User Stories list**: stories are **subtasks** of the appropriate epic.
- **Modules list**: one task per module (Leads, Opportunities, Dashboard, Settings, etc.).
- **Linkage**: each story is linked to a module task and prefixed with `Module: <Module> | ...`.

### Tagging Standard
- Tier tags: `now`, `next`, `later`
- Module tags: `module:Leads`, `module:Opportunities`, `module:Dashboard`, `module:Settings`, etc.
- Status tags: `done`, `partial`, `not-started`, `candidate`

### Automation Rules (Operational)
- **Primary source of truth** for backlog status and prioritization is ClickUp.
- ClickUp list ownership:
  - CRM: `CRM Backlog` (`901710720381`)
  - Mobile: `Mobile Backlog` (`901710789774`)
  - Supply-chain: `SCM Backlog` (`901710734279`)
  - Platform/Infra: `Project Backlog` (`901710720382`)
- Repo backlog docs are **mirrors/snapshots** for local visibility and search:
  - `docs/CRM_BACKLOG.md`
  - `docs/MOBILE_BACKLOG.md`
  - `docs/SCM_BACKLOG.md`
  - `docs/PROJECT_BACKLOG.md`
- When ClickUp and docs differ, reconcile docs to ClickUp unless code evidence proves newer implementation state.
- **Do not assume** status beyond documented evidence.

### ClickUp Workspace Map
- Workspace (team) name: `North Edge System's Workspace`
- Workspace (team) id: `9017850483`
- Primary space: `CRM Platform` (id: `90173924925`)
- Folder `Product & Planning` (id: `90176298145`):
  - List: `Epics` (id: `901710553489`)
  - List: `CRM Backlog` (id: `901710720381`)
  - List: `Project Backlog` (id: `901710720382`)
  - List: `Mobile Backlog` (id: `901710789774`)
  - List: `SCM Backlog` (id: `901710734279`)

---

## 18) MediatR/CQRS Decision (Hybrid Approach)

**Default path (required):**
- Keep CRUD and straightforward module operations in Application services.
- Controllers call Application services directly.

**Use MediatR when any of these are true:**
- A workflow spans multiple modules/aggregates in one use case.
- A command has branching orchestration and policy decisions (e.g., approval and override flows).
- A flow publishes in-process or integration events with non-trivial handler chains.
- The operation requires idempotency/retry-safe command handling.

**Eventing path (Azure-aligned):**
- In-process domain events for local side effects inside the modular monolith.
- Azure Service Bus integration events for async/decoupled processing.

**Non-goals right now:**
- No repo-wide MediatR refactor.
- No microservice extraction tied to this decision.
