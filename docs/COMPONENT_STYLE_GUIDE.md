# CRM Enterprise - Style & Component Guide for AI/LLM Tools

**Version:** 1.0  
**Last Updated:** January 10, 2026  
**Purpose:** Authoritative reference for generating consistent UI code across the CRM Enterprise application

> This guide is optimized for AI code generation tools (Copilot, Codex, Claude, etc.). Follow exact patterns and code snippets provided.

---

## Quick Reference

| Need | Go To |
|------|-------|
| Building a list page | [List/Dashboard Pages](#quick-pattern-list-pages) |
| Building a form page | [Form Pages](#quick-pattern-form-pages) |
| Adding buttons | [Button Patterns](#button-patterns) |
| Creating form fields | [Form Field Patterns](#form-field-patterns) |
| Using colors/tokens | [Design Tokens Reference](#design-tokens-reference) |
| Styling cards | [Card Patterns](#card-patterns) |
| Need spacing value | [Spacing Scale](#spacing-scale) |
| Need animation | [Animation Library](#animation-library) |
| Page component standard | [Page Component Standard](#page-component-standard) |

## Table of Contents

1. [Quick Patterns](#quick-patterns)
2. [Design Tokens Reference](#design-tokens-reference)
3. [Page Type Decision Tree](#page-type-decision-tree)
4. [Component Patterns](#component-patterns)
5. [Import Guidelines](#import-guidelines)
6. [Code Generation Rules](#code-generation-rules)
7. [Page Component Standard](#page-component-standard)

---

## Page Component Standard

This is the required structure for all CRM pages.

Mandatory change-control rule:
- Do not modify existing styles (colors, gradients, spacing, typography, states, backgrounds) unless the user explicitly requests style/UI changes for the current task.

**Must follow:**
- No inline templates or inline styles. Always use `templateUrl` and `styleUrl`.
- Always include breadcrumbs at the top of the content area.
- Use `page-background` for animated orbs and `page-container`/`page-content` for interactive UI.
- Use PrimeNG components for inputs, buttons, tables, dialogs.
- Use global style files; avoid page-specific one-off patterns.
- Heading hierarchy is mandatory:
  - one `h1.hero-title` per page
  - section headers use `h2.section-title`
  - card/subsection headers use `h3.card-title` or `h3.section-title`
  - subtitles use `page-subtitle` / `hero-subtitle` / `hero-description`

**Recommended structure:**
```html
<div class="page-background">
  <div class="animated-orb orb-1"></div>
  <div class="animated-orb orb-2"></div>
  <div class="animated-orb orb-3"></div>
</div>

<div class="page-container">
  <div class="page-content">
    <app-breadcrumbs></app-breadcrumbs>
    <!-- Header + content -->
  </div>
</div>
```

**Required SCSS imports:**
```scss
@use '../../../../shared/page-design-system' as *;
@use '../../../../../styles/design-tokens' as *;
```

**Standard component metadata:**
```ts
@Component({
  selector: 'app-entity-page',
  standalone: true,
  imports: [...],
  templateUrl: './entity.page.html',
  styleUrl: './entity.page.scss'
})
```

---

## Enforcement Checklist

Use this list before committing UI work:

- No inline templates or inline styles in components.
- `templateUrl` and `styleUrl` are used in every page component.
- `page-background` + `page-container` + `page-content` are present.
- `app-breadcrumbs` exists at the top of the content area.
- PrimeNG components used for inputs, buttons, tables, dialogs.
- Page SCSS imports:
  - `@use '../../../../shared/page-design-system' as *;`
  - `@use '../../../../../styles/design-tokens' as *;`
- Form pages follow the **Edit/Create Form Standard** (card titles, focus, and primary action).
- Only one `h1.hero-title` exists on the page.
- `H2`/`H3` are not used as page-level title replacements.

---

## Edit/Create Form Standard

Reference: **Edit Customer** page.

Applies to: all create/edit form pages (CRM only).

**Card titles**
- Use the same card title style as Edit Customer: muted, uppercase eyebrow + bold title.
- Color must follow the existing Edit Customer card title color token (do not invent new colors).

**Card body**
- Use the same glass card background, border, and padding as Edit Customer.
- Form sections must use consistent spacing and grid density.

**Field focus & hover**
- Inputs must use the same hover and focus states as Edit Customer (soft glow + border tint).
- Do not introduce per-page focus colors.

**Primary action**
- The main action (Create/Update) must use the same button class and visual style as Edit Customer.
- Button placement follows the same footer alignment and spacing.

**Do not**
- Do not mix list-page styling into form pages.
- Do not override button colors on a per-page basis.

---

## New Page Template (Copy/Paste)

Use this template to create a new page quickly.

**HTML (`entity.page.html`)**
```html
<div class="page-background">
  <div class="animated-orb orb-1"></div>
  <div class="animated-orb orb-2"></div>
  <div class="animated-orb orb-3"></div>
</div>

<div class="page-container">
  <div class="page-content">
    <app-breadcrumbs></app-breadcrumbs>
    <header class="page-hero">
      <div class="hero-content">
        <span class="hero-eyebrow"><i class="pi pi-circle"></i> Module</span>
        <h1 class="hero-title">Page title</h1>
        <p class="hero-subtitle">Short description.</p>
      </div>
      <div class="hero-actions">
        <button pButton type="button" class="crm-button crm-button--primary">Primary action</button>
      </div>
    </header>
    <div class="glass-card">
      <!-- page content -->
    </div>
  </div>
</div>
```

**SCSS (`entity.page.scss`)**
```scss
@use '../../../../shared/page-design-system' as *;
@use '../../../../../styles/design-tokens' as *;

:host { display: block; }
```

**TypeScript (`entity.page.ts`)**
```ts
@Component({
  selector: 'app-entity-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, ButtonModule],
  templateUrl: './entity.page.html',
  styleUrl: './entity.page.scss'
})
```

---

## Quick Patterns

### QUICK PATTERN: List Row Actions

Lead list is the source-of-truth style for row-level icon actions in tables.

Use this exact markup pattern:

```html
<td class="td-actions">
  <div class="row-actions">
    <button pButton type="button" class="action-btn p-button-text p-button-rounded p-button-sm p-button-info" icon="pi pi-pencil" title="Edit"></button>
    <button pButton type="button" class="action-btn p-button-text p-button-rounded p-button-sm p-button-danger" icon="pi pi-trash" title="Delete"></button>
  </div>
</td>
```

Severity mapping:
- `p-button-info`: edit
- `p-button-help`: coach
- `p-button-secondary`: log activity
- `p-button-success`: convert/complete
- `p-button-danger`: delete

Do not create page-specific row action button skins. Shared styles are centralized in `client/src/styles/_components.scss`.

### QUICK PATTERN: List Pages

**When to use:** Customer/Lead/Contact lists, Dashboard, any data table view  
**Examples:** `customers.page.ts`, `leads.page.ts`, `dashboard.page.ts`

**TypeScript Component:**
```typescript
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  selector: 'app-entity-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, BreadcrumbsComponent],
  templateUrl: './entity.page.html',
  styleUrl: './entity.page.scss'
})
export class EntityPage {
  protected rows = signal<any[]>([]);
  protected loading = signal(false);
  protected totalCount = signal(0);
  
  protected onCreateNew() { /* action */ }
}
```

**HTML Template:**
```html
<div class="page-container">
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
  
  <app-breadcrumbs></app-breadcrumbs>
  
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-badge"><span class="badge-dot"></span><span>Label</span></div>
      <h1 class="hero-title">
        <span class="title-gradient">Main</span>
        <span class="title-light">Subtitle</span>
      </h1>
      <p class="hero-description">Page description text</p>
      <div class="hero-actions">
        <button pButton type="button" class="btn-gradient" (click)="onCreateNew()">
          <i class="pi pi-plus"></i> Create New
        </button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="visual-card visual-card--primary">
        <div class="card-icon"><i class="pi pi-chart-line"></i></div>
        <div class="card-content">
          <span class="card-label">This Week</span>
          <strong class="card-value">+{{ value }}</strong>
          <span class="card-trend card-trend--up"><i class="pi pi-arrow-up"></i> Trend</span>
        </div>
        <div class="card-glow"></div>
      </div>
    </div>
  </section>
  
  <section class="metrics-section">
    <div class="metric-card metric-card--total">
      <div class="metric-icon"><i class="pi pi-database"></i></div>
      <div class="metric-content">
        <span class="metric-label">Total</span>
        <strong class="metric-value">{{ totalCount() }}</strong>
      </div>
    </div>
  </section>
  
  <section class="data-section">
    <div class="glass-card">
      <ng-container *ngIf="!loading(); else loadingState">
        <p-table [value]="rows()" styleClass="crm-table">
          <ng-template pTemplate="header">
            <tr>
              <th>Column</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-row>
            <tr>
              <td>{{ row.name }}</td>
            </tr>
          </ng-template>
        </p-table>
      </ng-container>
      <ng-template #loadingState>
        <p-skeleton height="40px"></p-skeleton>
      </ng-template>
    </div>
  </section>
</div>
```

**SCSS:**
```scss
@use '../../../../shared/page-design-system' as *;
@use '../../../../../styles/design-tokens' as *;

:host { display: block; }
```

---

### QUICK PATTERN: Form Pages

**When to use:** Create/Edit/Settings pages with forms  
**Examples:** `role-form.page.ts`, `customer-form.page.ts`

**TypeScript Component:**
```typescript
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  selector: 'app-entity-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, BreadcrumbsComponent],
  templateUrl: './entity-form.page.html',
  styleUrl: './entity-form.page.scss'
})
export class EntityFormPage implements OnInit {
  private fb = inject(FormBuilder);
  protected form!: FormGroup;
  protected loading = signal(false);
  
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', []], // Add validators
      email: ['', []]
    });
  }
  
  protected onSubmit() { /* submit logic */ }
}
```

**HTML Template:**
```html
<div class="page-container">
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>
  
  <header class="form-header">
    <div class="header-content">
      <app-breadcrumbs></app-breadcrumbs>
      <a routerLink="/app/..." class="back-link">
        <i class="pi pi-arrow-left"></i> Back
      </a>
      <div class="header-title">
        <h1>
          <span class="title-gradient">Create</span>
          <span class="title-light">Entity</span>
        </h1>
        <p>Form description</p>
      </div>
    </div>
  </header>

  <div class="form-body">
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-layout">
      
      <section class="form-card">
        <h3 class="section-title">
          <i class="pi pi-id-card"></i>
          Section Name
        </h3>
        <div class="form-grid">
          <div class="form-field">
            <label class="form-label">Name <span class="required">*</span></label>
            <input pInputText formControlName="name" placeholder="Enter name" />
          </div>
        </div>
      </section>

      <div class="form-actions">
        <button type="submit" pButton class="btn-primary" [disabled]="loading()">
          <i class="pi pi-check"></i> Save
        </button>
        <button type="button" pButton class="btn-ghost" routerLink="/app/...">
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
```

**SCSS:**
```scss
@use '../../../../shared/form-page-styles' as form;
@use '../../../../../styles/design-tokens' as *;

:host {
  display: block;
  @include form.premium-selection;
  @include form.premium-focus-ring;
}

.page-container {
  @include form.form-page-base;
}

.form-card {
  @include form.form-section;
  &:hover .section-title {
    @include form.section-title-hover;
  }
}

.section-title {
  @include form.section-title;
}

.form-grid {
  @include form.form-grid;
}

.form-actions {
  @include form.form-actions;
}
```

---

### QUICK PATTERN: Button

**Decision Tree:**
```
Need button?
├── Primary action (hero, create) → .btn-gradient
├── Secondary action (filter, export) → .btn-glass
├── Tertiary action (cancel) → .btn-ghost
├── Text action → .btn-text
├── Icon only → .btn-icon
└── Pill shaped → .btn-pill
```

**Usage:**
```html
<!-- Primary gradient -->
<button pButton type="button" class="btn-gradient">
  <i class="pi pi-plus"></i> Create
</button>

<!-- Secondary glass -->
<button pButton type="button" class="btn-glass">
  <i class="pi pi-filter"></i> Filter
</button>

<!-- Tertiary ghost -->
<button pButton type="button" class="btn-ghost">
  Cancel
</button>

<!-- Icon only -->
<button pButton type="button" class="btn-icon">
  <i class="pi pi-trash"></i>
</button>
```

---

### QUICK PATTERN: Form Field

**Standard Field:**
```html
<div class="form-field">
  <label class="form-label">
    Field Name
    <span class="required">*</span>
  </label>
  <input pInputText type="text" formControlName="fieldName" placeholder="Placeholder" />
</div>
```

**Field with Icon (Recommended for inputs):**
```html
<div class="form-field">
  <label class="form-label">
    Email
    <span class="required">*</span>
  </label>
  <p-inputgroup>
    <p-inputgroupaddon class="icon-addon icon-addon--info">
      <i class="pi pi-envelope"></i>
    </p-inputgroupaddon>
    <input pInputText type="email" formControlName="email" placeholder="user@example.com" />
  </p-inputgroup>
</div>
```

**Select Field:**
```html
<div class="form-field">
  <label class="form-label">Status <span class="required">*</span></label>
  <p-select
    [options]="statusOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="status"
    placeholder="Select status"
  ></p-select>
</div>
```

---

## Design Tokens Reference

### Colors (SASS Variables)

**Gradients:**
```scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$success-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
$cyan-gradient: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
$purple-gradient: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
$orange-gradient: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
```

**Solid Colors:**
```scss
$primary: #667eea
$success: #22c55e
$warning: #f97316
$danger: #ef4444
$info: #3b82f6
$cyan: #06b6d4
```

**Text Colors:**
```scss
$text-primary: #0f172a
$text-secondary: #475569
$text-muted: #94a3b8
```

### Glassmorphism

```scss
$glass-bg: rgba(255, 255, 255, 0.85)
$glass-border: rgba(255, 255, 255, 0.3)
$glass-blur: 20px
$glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
$glass-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12)
```

### Spacing Scale

```scss
$space-1: 0.25rem (4px)
$space-2: 0.5rem (8px)
$space-3: 0.75rem (12px)
$space-4: 1rem (16px)
$space-6: 1.5rem (24px)
$space-8: 2rem (32px)
```

**Rule:** Use `$space-*` variables. Never hardcode `px` values.

### Border Radius

```scss
$radius-sm: 0.375rem (6px)
$radius-md: 0.5rem (8px)
$radius-lg: 0.75rem (12px)
$radius-xl: 1rem (16px)
$radius-2xl: 1.5rem (24px)
```

### Font Sizes

```scss
$font-size-xs: 0.75rem (12px)
$font-size-sm: 0.875rem (14px) — labels
$font-size-base: 1rem (16px) — body text
$font-size-lg: 1.125rem (18px) — card titles
$font-size-xl: 1.25rem (20px) — section titles
$font-size-2xl: 1.375rem (22px) — page titles
```

---

## PrimeNG Standardization (MANDATORY)

### Core Rules (MANDATORY)

1. **ONLY PrimeNG** - ALL UI components MUST use PrimeNG
2. **NO Angular Material** - Do NOT use @angular/material components
3. **NO custom components** - Do NOT create custom component alternatives
4. **Dropdowns with icons** - All selects MUST have icon + label for values
5. **Icon consistency** - Use PrimeIcons for all dropdown values
6. **Select templates required** - Use `pTemplate="item"` + `pTemplate="value"` to render icons in the list and the selected value

### Approved PrimeNG Components

| Use Case | Component | Module | HTML |
|----------|-----------|--------|------|
| Button | p-button | `ButtonModule` | `<button pButton>` |
| Input Text | p-inputtext | `InputTextModule` | `<input pInputText>` |
| Textarea | p-textarea | `TextareaModule` | `<textarea pInputTextarea>` |
| Select/Dropdown | p-select | `SelectModule` | `<p-select>` |
| Checkbox | p-checkbox | `CheckboxModule` | `<p-checkbox>` |
| Radio | p-radiobutton | `RadioButtonModule` | `<p-radiobutton>` |
| Table | p-table | `TableModule` | `<p-table>` |
| Paginator | p-paginator | `PaginatorModule` | `<p-paginator>` |
| Dialog/Modal | p-dialog | `DialogModule` | `<p-dialog>` |
| Dropdown Menu | p-menu | `MenuModule` | `<p-menu>` |
| Toast Notification | p-toast | `ToastModule` | `<p-toast>` |
| Input Group | p-inputgroup | `InputGroupModule` | `<p-inputgroup>` |
| Input Group Addon | p-inputgroupaddon | `InputGroupModule` | `<p-inputgroupaddon>` |
| Card | p-card | `CardModule` | `<p-card>` |
| Tab View | p-tabview | `TabsModule` | `<p-tabview>` |
| Tag | p-tag | `TagModule` | `<p-tag>` |
| Skeleton | p-skeleton | `SkeletonModule` | `<p-skeleton>` |
| Tooltip | pTooltip | `TooltipModule` | `[pTooltip]` directive |
| Divider | p-divider | `DividerModule` | `<p-divider>` |
| Overlay Panel | p-overlaypanel | `OverlayPanelModule` | `<p-overlaypanel>` |
| File Upload | p-fileupload | `FileUploadModule` | `<p-fileupload>` |
| Dropdown (Select list) | p-dropdown | `DropdownModule` | `<p-dropdown>` |

### Strictly Forbidden

❌ **NO Angular Material** - Do NOT import from `@angular/material`:
```typescript
// ❌ FORBIDDEN
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
```

❌ **NO custom component alternatives:**
- Custom button components
- Custom input components
- Custom select/dropdown components
- Custom modal/dialog components
- Custom table wrappers
- Custom form field wrappers
- Custom notification components

❌ **NO dropdowns without icons** - ALL selects MUST include icons for values:
```html
<!-- ❌ FORBIDDEN - No icons -->
<p-select [options]="statuses">
  <ng-template pTemplate="item" let-option>
    {{ option.label }}
  </ng-template>
</p-select>
```

✅ **ALWAYS include icons in dropdowns:**
```html
<!-- ✅ CORRECT - Every value has an icon -->
<p-select [options]="statuses">
  <ng-template pTemplate="item" let-option>
    <div class="p-d-flex p-ai-center">
      <i [class]="'pi ' + option.icon"></i>
      <span class="ms-2">{{ option.label }}</span>
    </div>
  </ng-template>
  <ng-template pTemplate="value" let-option>
    <div class="p-d-flex p-ai-center" *ngIf="option; else statusPlaceholder">
      <i [class]="'pi ' + option.icon"></i>
      <span class="ms-2">{{ option.label }}</span>
    </div>
    <ng-template #statusPlaceholder>
      <span class="select-placeholder">Select status</span>
    </ng-template>
  </ng-template>
</p-select>
```

**Use PrimeNG exclusively.** Style with `.btn-*` classes if needed, but use `pButton` directive.

### Import Pattern (Mandatory)

Every component imports its PrimeNG module:

```typescript
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  imports: [
    ButtonModule,
    InputTextModule,
    SelectModule,
    TableModule,
    // ... other imports
  ]
})
```

### Styling PrimeNG Components

**DO:** Add classes to style PrimeNG components
```html
<button pButton type="button" class="btn-gradient">
  <i class="pi pi-plus"></i> Create
</button>
```

**DON'T:** Create custom component to wrap PrimeNG
```html
<!-- WRONG -->
<app-custom-button label="Create"></app-custom-button>

<!-- RIGHT -->
<button pButton class="btn-gradient" label="Create"></button>
```

### Adding PrimeNG Styles

When you need custom styling for PrimeNG components, add to **global SCSS** files:

```scss
// In client/src/styles/_components.scss

.p-button.btn-gradient {
  background: $primary-gradient;
  // ... styles
}

.p-inputtext {
  @include form.premium-input;  // Use mixins
}
```

### Theme Configuration

PrimeNG theme is set globally in [app.config.ts](../client/src/app/app.config.ts):
- Do NOT override theme per component
- Do NOT change theme in individual pages
- Use CSS classes for variations

---

## Page Type Decision Tree

```
Building a new page?
│
├─ List, table, or data browsing?
│  └─ YES → Use LIST PAGE pattern
│     Imports: ButtonModule, TableModule, PaginatorModule, BreadcrumbsComponent
│     SCSS: @use '../../../../shared/page-design-system'
│     HTML: hero-section + data-section
│     Table: MUST use <p-table styleClass="crm-table">
│
├─ Form, settings, or create/edit?
│  └─ YES → Use FORM PAGE pattern
│     Imports: ReactiveFormsModule, ButtonModule, BreadcrumbsComponent
│     SCSS: @use '../../../../shared/form-page-styles'
│     HTML: form-header + form-body + form-cards
│     Inputs: MUST use pInputText, p-select, etc.
│
├─ Modal or overlay?
│  └─ YES → Use <p-dialog> from PrimeNG
│     Module: DialogModule (mandatory import)
│     Don't use page patterns
│     Don't create custom modal component
│
├─ Notification/Alert?
│  └─ YES → Use AppToastService OR <p-toast>
│     Service: AppToastService (preferred, uses p-toast internally)
│     Component: <p-toast> if needed
│
└─ Detail/view page?
   └─ Use LIST PAGE pattern as base
      Table: MUST use <p-table>
      Add detail sections in data-section
```

---

## Component Patterns

### Global Design System Files

All styles are centralized to ensure consistency:

| File | Purpose |
|------|---------|
| `client/src/styles/styles.scss` | Main stylesheet (imported in `angular.json`) |
| `client/src/styles/_design-tokens.scss` | CSS variables, colors, spacing tokens |
| `client/src/styles/_components.scss` | Reusable component styles |
| `client/src/styles/_animations.scss` | Shared animations/keyframes |
| `client/src/app/shared/_form-page-styles.scss` | Premium glass UI for form pages |
| `client/src/app/shared/page-design-system.scss` | List/dashboard page layouts |

### Color Palette

#### Primary Gradients
```scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  // Purple → Violet
$success-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);  // Green
$cyan-gradient: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);     // Cyan → Teal
$purple-gradient: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);   // Purple
$orange-gradient: linear-gradient(135deg, #fb923c 0%, #f97316 100%);   // Orange
```

#### Solid Colors
- **Primary:** `#667eea` (Purple)
- **Success:** `#22c55e` (Green)
- **Warning:** `#f97316` (Orange)
- **Danger:** `#ef4444` (Red)
- **Info:** `#3b82f6` (Blue)
- **Cyan:** `#06b6d4` (Teal)

#### Text Colors
- **Primary text:** `#0f172a` (Dark)
- **Secondary text:** `#475569` (Gray)
- **Muted text:** `#94a3b8` (Light gray)

### Glassmorphism Design

```scss
$glass-bg: rgba(255, 255, 255, 0.85);           // Semi-transparent white
$glass-border: rgba(255, 255, 255, 0.3);        // Border color
$glass-blur: 20px;                              // Blur amount
$glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); // Subtle shadow
$glass-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12); // Hover lift
```

### Button Patterns

**Decision Matrix:**
| Class | Use | Gradient | HTML |
|-------|-----|----------|------|
| `.btn-gradient` | Primary action | Purple→Violet | `<button pButton class="btn-gradient">` |
| `.btn-glass` | Secondary action | Frosted glass | `<button pButton class="btn-glass">` |
| `.btn-ghost` | Cancel/tertiary | Transparent | `<button pButton class="btn-ghost">` |
| `.btn-text` | Low priority | Text only | `<button pButton class="btn-text">` |
| `.btn-icon` | Icon only | Transparent | `<button pButton class="btn-icon">` |
| `.btn-pill` | Rounded | Any style | `<button pButton class="btn-pill">` |

**Size Modifiers:** Add `.btn-sm`, `.btn-xs`, or `.btn-lg`

**Example:**
```html
<button pButton type="button" class="btn-gradient btn-lg">
  <i class="pi pi-plus"></i> Create
</button>
```

---

### Form Field Patterns

**Icon Colors (use on p-inputgroupaddon):**
```scss
.icon-addon--info    // Blue
.icon-addon--success // Green
.icon-addon--warning // Orange
.icon-addon--danger  // Red
```

**Complete Form Field with Validation:**
```html
<div class="form-field">
  <label class="form-label">
    Email <span class="required">*</span>
  </label>
  <p-inputgroup>
    <p-inputgroupaddon class="icon-addon icon-addon--info">
      <i class="pi pi-envelope"></i>
    </p-inputgroupaddon>
    <input pInputText type="email" formControlName="email" />
  </p-inputgroup>
  @if (form.get('email')?.invalid && form.get('email')?.touched) {
    <small class="error-message">{{ getErrorMessage('email') }}</small>
  }
</div>
```

---

### Card Patterns

**Visual Card (Hero section):**
```html
<div class="visual-card visual-card--primary">
  <div class="card-icon"><i class="pi pi-chart-line"></i></div>
  <div class="card-content">
    <span class="card-label">Label</span>
    <strong class="card-value">Value</strong>
    <span class="card-trend card-trend--up"><i class="pi pi-arrow-up"></i> Trend</span>
  </div>
  <div class="card-glow"></div>
</div>
```

**Card Variants:** `--primary`, `--secondary`, `--success`, `--purple`

**Glass Card (Data section):**
```html
<div class="glass-card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-content">
    <!-- Content -->
  </div>
</div>
```

**Metric Card (Metrics dashboard):**
```html
<article class="metric-card metric-card--total">
  <div class="metric-icon"><i class="pi pi-database"></i></div>
  <div class="metric-content">
    <span class="metric-label">Total</span>
    <strong class="metric-value">{{ count }}</strong>
  </div>
</article>
```

**Metric Card Variants:** `--total`, `--leads`, `--prospects`, `--customers`, `--new`

---

### Table Patterns

**Standard PrimeNG Table with class:**
```html
<p-table [value]="rows()" styleClass="crm-table">
  <ng-template pTemplate="header">
    <tr>
      <th>Column</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-row>
    <tr>
      <td>{{ row.name }}</td>
      <td class="actions">
        <button pButton type="button" class="btn-icon" (click)="edit(row)">
          <i class="pi pi-pencil"></i>
        </button>
        <button pButton type="button" class="btn-icon danger" (click)="delete(row)">
          <i class="pi pi-trash"></i>
        </button>
      </td>
    </tr>
  </ng-template>
</p-table>
```

---

### Animation Patterns

**Fade In:**
```scss
animation: fadeIn 0.3s ease-out;
```

**Slide Up:**
```scss
animation: slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Pulse (badges):**
```scss
animation: pulse 2s ease-in-out infinite;
```

**Gradient Shift (text):**
```scss
animation: gradient-shift 4s ease infinite;
```

All animations defined in `client/src/styles/_animations.scss`

---

## Import Guidelines

### List Page Imports

```typescript
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    TableModule,
    PaginatorModule,
    SelectModule,
    InputTextModule,
    BreadcrumbsComponent
  ]
})
```

### Form Page Imports

```typescript
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    BreadcrumbsComponent
  ]
})
```

### SCSS Imports

**List Page:**
```scss
@use '../../../../shared/page-design-system' as *;
@use '../../../../../styles/design-tokens' as *;
```

**Form Page:**
```scss
@use '../../../../shared/form-page-styles' as form;
@use '../../../../../styles/design-tokens' as *;
```

**Path Rule:** Count directory depth from file location:
- `client/src/app/crm/features/*/pages/*.page.scss` → `@use '../../../../../styles/design-tokens'`
- `client/src/app/packs/*/features/*/` → Add more `../` based on actual depth

---

## Code Generation Rules

### Rules for AI Code Generation

**1. PAGE TYPE DETECTION**
- If creating list/table page → Use LIST PAGE pattern
- If creating form page → Use FORM PAGE pattern
- Always include `standalone: true` in @Component
- Always include BreadcrumbsComponent in imports

**2. SCSS SETUP**
- Every page imports design tokens
- List pages import `page-design-system`
- Form pages import `form-page-styles` as `form`
- Never hardcode colors, spacing, or sizes

**3. COMPONENT STRUCTURE**
- Use `signal<>` for state
- Use `computed()` for derived state
- Use `inject()` for services
- Implement `OnInit` for form setup

**4. FORMS (MANDATORY)**
- Always use `ReactiveFormsModule`
- Always use `FormBuilder` via inject
- Add validators in FormBuilder
- Display error messages with @if
- Use PrimeNG form inputs ONLY:
  - `<input pInputText>` for text
  - `<p-select>` for dropdowns (with icons - see rule below)
  - `<textarea pInputTextarea>` for multi-line
  - Never create custom input components

**5. BUTTONS (MANDATORY)**
- Always use `pButton` directive
- Always add icon with `<i class="pi pi-..."></i>`
- Primary actions = `.btn-gradient`
- Secondary actions = `.btn-glass`
- Cancel/Back = `.btn-ghost`
- Never create custom button component
- Always import ButtonModule

**6. TABLES (MANDATORY)**
- Always use `<p-table>` with `styleClass="crm-table"`
- Always include header template
- Always include body template
- Action buttons use `.btn-icon`
- Always import TableModule
- Never create custom table wrapper

**7. FORMS (MANDATORY)**
- Always wrap in `<form [formGroup]="form" (ngSubmit)="onSubmit()">`
- Sections wrap in `<section class="form-card">`
- Fields wrap in `<div class="form-field">`
- Use `p-inputgroup` with icon addon for text inputs
- Use `p-select` for dropdowns
- Use `p-checkbox` for boolean values

**8. DROPDOWNS WITH ICONS (MANDATORY)**
- **EVERY `<p-select>` MUST include icons for each option**
- Use `pTemplate="item"` to display icon + label
- Use `pTemplate="value"` to show selected value with icon (and a placeholder when empty)
- Icons must be **colorful** (no black/white). Global mapping is in `client/src/styles.scss`
- If you introduce a new icon, add a color mapping in `client/src/styles.scss`
- Icon source: PrimeIcons (prefix `pi-*`)
- Map icons semantically:
  - Status → `pi-check-circle`, `pi-times-circle`, `pi-clock`, `pi-inbox`
  - Priority → `pi-exclamation-triangle`, `pi-arrow-up`, `pi-minus`, `pi-arrow-down`
  - Source → `pi-envelope`, `pi-phone`, `pi-linkedin`, `pi-globe`, `pi-share-alt`
  - Stage → `pi-search`, `pi-check`, `pi-spinner`, `pi-file-pdf`, `pi-comments`, `pi-thumbs-up`, `pi-thumbs-down`
  - Department → `pi-chart-bar`, `pi-megaphone`, `pi-headphones`, `pi-code`, `pi-users`
- Never render dropdown values without icons

**9. NO CUSTOM COMPONENTS & NO ANGULAR MATERIAL**
- Do not create `.scss` with custom rules
- Do not import from `@angular/material/**`
- Do not create custom input/button/form components
- Use PrimeNG ONLY for all UI components
- Use existing classes from design system
- If need new component type, it must be PrimeNG

**10. TEMPLATE STRUCTURE**
- Always include `.page-container`
- Always include `.bg-orbs` (animated background)
- Always include `<app-breadcrumbs>`
- Always include hero section (list) or form header (form)

**11. PRIMENG MANDATORY**
- Every form input MUST be PrimeNG component
- Every button MUST use pButton directive
- Every table MUST use p-table
- Every modal MUST use p-dialog
- Every select MUST use p-select
- NO Angular Material components allowed
- Do not create alternatives

**12. IMPORTS CHECKLIST**
- [ ] CommonModule or CoreModule
- [ ] FormsModule or ReactiveFormsModule
- [ ] ButtonModule (if any button)
- [ ] Appropriate PrimeNG modules
- [ ] BreadcrumbsComponent
- [ ] RouterLink if needed
- [ ] Do NOT use custom button/input components

---

## PrimeNG Component Examples

---

## Common Patterns Reference

**Empty State:**
```html
<app-empty-state
  type="no-data"
  title="No records"
  description="Create your first record"
  actionLabel="Create"
  actionIcon="pi pi-plus"
  [actionCallback]="() => create()"
></app-empty-state>
```

**Toast Notification:**
```typescript
private toastService = inject(AppToastService);

// Success
this.toastService.show('success', 'Saved successfully', 3000);

// Error
this.toastService.show('error', 'Failed to save', 3000);

// Warning
this.toastService.show('warning', 'Warning message', 3000);
```

**Confirmation Dialog:**
```html
<p-dialog [(visible)]="confirmVisible" modal="true" header="Confirm">
  <p>Are you sure?</p>
  <ng-template pTemplate="footer">
    <button pButton class="btn-ghost" (click)="confirmVisible = false">Cancel</button>
    <button pButton class="btn-danger" (click)="confirm()">Confirm</button>
  </ng-template>
</p-dialog>
```

---

## Anti-Patterns (NEVER DO)

❌ Do NOT hardcode colors
```typescript
// WRONG
style="color: #667eea; background: linear-gradient(...)"

// RIGHT
Use design tokens in SCSS
```

❌ Do NOT create isolated page styles
```typescript
// WRONG
Create new SCSS from scratch

// RIGHT
Import page-design-system or form-page-styles
```

❌ Do NOT mix ngModules with standalone
```typescript
// WRONG
imports: [NgModule], standalone: true

// RIGHT
imports: [Component1, Component2, ...], standalone: true
```

❌ Do NOT use custom button markup
```html
// WRONG
<button style="background: blue">Click</button>

// RIGHT
<button pButton class="btn-gradient">Click</button>
```

❌ Do NOT skip validation in forms
```typescript
// WRONG
FormGroup with no validators

// RIGHT
FormGroup with Validators.required, Validators.email, etc.
```

---

## File Reference Map

| Purpose | File | Use When |
|---------|------|----------|
| Colors & tokens | `client/src/styles/_design-tokens.scss` | Need color, spacing, font size |
| List page layout | `client/src/app/shared/page-design-system.scss` | Building list/dashboard page |
| Form page layout | `client/src/app/shared/_form-page-styles.scss` | Building form/settings page |
| Component classes | `client/src/styles/_components.scss` | Need card, button, table styles |
| Animations | `client/src/styles/_animations.scss` | Need fade, slide, pulse effects |
| Global styles | `client/src/styles/styles.scss` | PrimeNG overrides, utilities |

---

## PrimeNG Component Examples

### Button (pButton)

**Mandatory Import:**
```typescript
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ButtonModule]
})
```

**Variants:**
```html
<!-- Primary gradient -->
<button pButton type="button" class="btn-gradient" label="Create" icon="pi pi-plus"></button>

<!-- Primary text only -->
<button pButton type="button" class="btn-gradient" label="Create"></button>

<!-- Primary with icon -->
<button pButton type="button" class="btn-gradient" (click)="onCreate()">
  <i class="pi pi-plus"></i> Create
</button>

<!-- Secondary glass -->
<button pButton type="button" class="btn-glass" icon="pi pi-filter"></button>

<!-- Tertiary ghost -->
<button pButton type="button" class="btn-ghost" label="Cancel"></button>

<!-- Icon only -->
<button pButton type="button" class="btn-icon" icon="pi pi-trash"></button>

<!-- Small -->
<button pButton type="button" class="btn-gradient btn-sm" label="Small"></button>

<!-- Disabled -->
<button pButton type="button" class="btn-gradient" label="Save" [disabled]="loading()"></button>
```

### Input Text (pInputText)

**Mandatory Import:**
```typescript
import { InputTextModule } from 'primeng/inputtext';

@Component({
  imports: [InputTextModule]
})
```

**Usage:**
```html
<!-- Simple input -->
<input pInputText type="text" formControlName="name" placeholder="Enter name" />

<!-- With form field wrapper -->
<div class="form-field">
  <label class="form-label">Name <span class="required">*</span></label>
  <input pInputText type="text" formControlName="name" placeholder="Enter name" />
</div>

<!-- With input group and icon -->
<p-inputgroup>
  <p-inputgroupaddon class="icon-addon icon-addon--info">
    <i class="pi pi-envelope"></i>
  </p-inputgroupaddon>
  <input pInputText type="email" formControlName="email" placeholder="user@example.com" />
</p-inputgroup>

<!-- Full width -->
<input pInputText type="text" formControlName="name" class="w-full" />
```

### Select (p-select)

**Mandatory Import:**
```typescript
import { SelectModule } from 'primeng/select';

@Component({
  imports: [SelectModule]
})
```

**Usage (MANDATORY icon template):**
```html
<!-- ALWAYS use icon + label templates for selects -->
<div class="form-field">
  <label class="form-label">Status <span class="required">*</span></label>
  <p-select
    [options]="statusOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="status"
    placeholder="Select status"
  >
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
</div>

<!-- Multi-selects still require icon templates for items + selected values -->
```

### Select with Icons (MANDATORY PATTERN)

**ALL dropdowns MUST display icons for each value. Use PrimeIcons (`pi-*`) and appropriate icons.**

**Typical Icon Mapping by Domain:**
```typescript
// Status options
statusOptions = signal([
  { label: 'Active', value: 'active', icon: 'pi-check-circle' },
  { label: 'Inactive', value: 'inactive', icon: 'pi-times-circle' },
  { label: 'Pending', value: 'pending', icon: 'pi-clock' },
  { label: 'Archived', value: 'archived', icon: 'pi-inbox' }
]);

// Priority options
priorityOptions = signal([
  { label: 'Critical', value: 'critical', icon: 'pi-exclamation-triangle', severity: 'danger' },
  { label: 'High', value: 'high', icon: 'pi-arrow-up', severity: 'warning' },
  { label: 'Normal', value: 'normal', icon: 'pi-minus', severity: 'info' },
  { label: 'Low', value: 'low', icon: 'pi-arrow-down', severity: 'success' }
]);

// Lead source options
sourceOptions = signal([
  { label: 'Email', value: 'email', icon: 'pi-envelope' },
  { label: 'Phone', value: 'phone', icon: 'pi-phone' },
  { label: 'LinkedIn', value: 'linkedin', icon: 'pi-linkedin' },
  { label: 'Website', value: 'website', icon: 'pi-globe' },
  { label: 'Referral', value: 'referral', icon: 'pi-share-alt' }
]);

// Stage options
stageOptions = signal([
  { label: 'Prospecting', value: 'prospecting', icon: 'pi-search' },
  { label: 'Qualified', value: 'qualified', icon: 'pi-check' },
  { label: 'In Progress', value: 'in_progress', icon: 'pi-spinner', spin: true },
  { label: 'Proposal', value: 'proposal', icon: 'pi-file-pdf' },
  { label: 'Negotiation', value: 'negotiation', icon: 'pi-comments' },
  { label: 'Closed Won', value: 'closed_won', icon: 'pi-thumbs-up', severity: 'success' },
  { label: 'Closed Lost', value: 'closed_lost', icon: 'pi-thumbs-down', severity: 'danger' }
]);

// Department options
departmentOptions = signal([
  { label: 'Sales', value: 'sales', icon: 'pi-chart-bar' },
  { label: 'Marketing', value: 'marketing', icon: 'pi-megaphone' },
  { label: 'Support', value: 'support', icon: 'pi-headphones' },
  { label: 'Development', value: 'development', icon: 'pi-code' },
  { label: 'HR', value: 'hr', icon: 'pi-users' }
]);

// Document type options
documentTypeOptions = signal([
  { label: 'Invoice', value: 'invoice', icon: 'pi-receipt' },
  { label: 'Quote', value: 'quote', icon: 'pi-dollar' },
  { label: 'Contract', value: 'contract', icon: 'pi-file' },
  { label: 'Agreement', value: 'agreement', icon: 'pi-certificate' }
]);
```

**HTML Pattern (MANDATORY):**
```html
<!-- Status select with icons (always use this template) -->
<div class="form-field">
  <label class="form-label">Status <span class="required">*</span></label>
  <p-select
    [options]="statusOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="status"
    placeholder="Select status"
  >
    <ng-template pTemplate="item" let-option>
      <div class="p-d-flex p-ai-center p-gap-2">
        <i [class]="'pi ' + option.icon"></i>
        <span>{{ option.label }}</span>
      </div>
    </ng-template>
    <ng-template pTemplate="value" let-option>
      <div class="p-d-flex p-ai-center p-gap-2" *ngIf="option">
        <i [class]="'pi ' + option.icon"></i>
        <span>{{ option.label }}</span>
      </div>
      <span *ngIf="!option" class="select-placeholder">Select status</span>
    </ng-template>
  </p-select>
</div>

<!-- Priority select with color severity -->
<div class="form-field">
  <label class="form-label">Priority</label>
  <p-select
    [options]="priorityOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="priority"
    placeholder="Select priority"
  >
    <ng-template pTemplate="item" let-option>
      <div class="p-d-flex p-ai-center p-gap-2">
        <i [class]="'pi ' + option.icon" [style.color]="getSeverityColor(option.severity)"></i>
        <span>{{ option.label }}</span>
      </div>
    </ng-template>
    <ng-template pTemplate="value" let-option>
      <div class="p-d-flex p-ai-center p-gap-2" *ngIf="option">
        <i [class]="'pi ' + option.icon" [style.color]="getSeverityColor(option.severity)"></i>
        <span>{{ option.label }}</span>
      </div>
      <span *ngIf="!option" class="select-placeholder">Select priority</span>
    </ng-template>
  </p-select>
</div>

<!-- Lead source select with brand icons -->
<div class="form-field">
  <label class="form-label">Lead Source</label>
  <p-select
    [options]="sourceOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="source"
    placeholder="How did you hear about us?"
  >
    <ng-template pTemplate="item" let-option>
      <div class="p-d-flex p-ai-center p-gap-2">
        <i [class]="'pi ' + option.icon"></i>
        <span>{{ option.label }}</span>
      </div>
    </ng-template>
    <ng-template pTemplate="value" let-option>
      <div class="p-d-flex p-ai-center p-gap-2" *ngIf="option">
        <i [class]="'pi ' + option.icon"></i>
        <span>{{ option.label }}</span>
      </div>
      <span *ngIf="!option" class="select-placeholder">Select source</span>
    </ng-template>
  </p-select>
</div>

<!-- Opportunity stage select with animated spinner for in-progress -->
<div class="form-field">
  <label class="form-label">Stage <span class="required">*</span></label>
  <p-select
    [options]="stageOptions()"
    optionLabel="label"
    optionValue="value"
    formControlName="stage"
    placeholder="Select stage"
  >
    <ng-template pTemplate="item" let-option>
      <div class="p-d-flex p-ai-center p-gap-2">
        <i 
          [class]="'pi ' + option.icon"
          [class.pi-spin]="option.spin"
        ></i>
        <span>{{ option.label }}</span>
      </div>
    </ng-template>
    <ng-template pTemplate="value" let-option>
      <div class="p-d-flex p-ai-center p-gap-2" *ngIf="option">
        <i 
          [class]="'pi ' + option.icon"
          [class.pi-spin]="option.spin"
        ></i>
        <span>{{ option.label }}</span>
      </div>
      <span *ngIf="!option" class="select-placeholder">Select stage</span>
    </ng-template>
  </p-select>
</div>
```

**TypeScript Helper (Optional):**
```typescript
getSeverityColor(severity?: string): string {
  const colors: Record<string, string> = {
    danger: 'var(--red-500)',
    warning: 'var(--amber-500)',
    info: 'var(--blue-500)',
    success: 'var(--green-500)'
  };
  return colors[severity || 'info'];
}
```

### Table (p-table)

**Mandatory Import:**
```typescript
import { TableModule } from 'primeng/table';

@Component({
  imports: [TableModule]
})
```

**Usage:**
```html
<!-- Standard table with crm-table class (MANDATORY) -->
<p-table [value]="rows()" styleClass="crm-table">
  <ng-template pTemplate="header">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-row>
    <tr>
      <td>{{ row.name }}</td>
      <td>{{ row.email }}</td>
      <td>
        <p-tag [value]="row.status" [severity]="statusSeverity(row.status)"></p-tag>
      </td>
      <td class="actions">
        <button pButton type="button" class="btn-icon" icon="pi pi-pencil" (click)="edit(row)"></button>
        <button pButton type="button" class="btn-icon danger" icon="pi pi-trash" (click)="delete(row)"></button>
      </td>
    </tr>
  </ng-template>
  <ng-template pTemplate="emptymessage">
    <tr>
      <td colspan="4" class="empty-message">No records found</td>
    </tr>
  </ng-template>
</p-table>

<!-- With paginator -->
<p-table 
  [value]="rows()" 
  [paginator]="true" 
  [rows]="10"
  [totalRecords]="totalCount()"
  styleClass="crm-table"
>
  <!-- Template content -->
</p-table>
```

### Checkbox (p-checkbox)

**Mandatory Import:**
```typescript
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  imports: [CheckboxModule]
})
```

**Usage:**
```html
<!-- Binary checkbox -->
<p-checkbox
  [(ngModel)]="isActive"
  binary="true"
  inputId="isActive"
></p-checkbox>
<label for="isActive">Mark as active</label>

<!-- Reactive form -->
<div class="form-field">
  <div class="checkbox-wrapper">
    <p-checkbox
      formControlName="agreeToTerms"
      binary="true"
      inputId="agree"
    ></p-checkbox>
    <label for="agree" class="checkbox-label">I agree to terms</label>
  </div>
</div>

<!-- Array of checkboxes -->
<p-checkbox
  *ngFor="let option of options()"
  [value]="option.value"
  formControlName="permissions"
  [inputId]="'perm_' + option.value"
  label="{{ option.label }}"
></p-checkbox>
```

### Dialog (p-dialog)

**Mandatory Import:**
```typescript
import { DialogModule } from 'primeng/dialog';

@Component({
  imports: [DialogModule]
})
```

**Usage:**
```html
<!-- Basic dialog -->
<p-dialog 
  [(visible)]="dialogVisible" 
  [header]="'Confirm Delete'"
  modal="true"
>
  <p>Are you sure you want to delete this item?</p>
  <ng-template pTemplate="footer">
    <button pButton type="button" class="btn-ghost" label="Cancel" (click)="dialogVisible = false"></button>
    <button pButton type="button" class="btn-danger" label="Delete" (click)="confirmDelete()"></button>
  </ng-template>
</p-dialog>

<!-- Form in dialog -->
<p-dialog 
  [(visible)]="formDialogVisible" 
  [header]="'Create New'"
  [modal]="true"
  [maximizable]="true"
>
  <form [formGroup]="form" (ngSubmit)="submitDialog()">
    <div class="form-field">
      <label class="form-label">Name</label>
      <input pInputText formControlName="name" />
    </div>
  </form>
  <ng-template pTemplate="footer">
    <button pButton class="btn-ghost" label="Cancel" (click)="formDialogVisible = false"></button>
    <button pButton class="btn-gradient" label="Create" (click)="submitDialog()"></button>
  </ng-template>
</p-dialog>
```

### Textarea (pInputTextarea)

**Mandatory Import:**
```typescript
import { TextareaModule } from 'primeng/textarea';

@Component({
  imports: [TextareaModule]
})
```

**Usage:**
```html
<!-- Simple textarea -->
<textarea pInputTextarea formControlName="description" rows="4" placeholder="Enter description..."></textarea>

<!-- With form field wrapper -->
<div class="form-field">
  <label class="form-label">Description</label>
  <textarea pInputTextarea formControlName="description" rows="4" placeholder="Enter description..."></textarea>
</div>

<!-- Auto-resizing -->
<textarea 
  pInputTextarea 
  formControlName="notes" 
  [autoResize]="true"
  placeholder="Auto-expanding textarea"
></textarea>
```

### Input Group (p-inputgroup)

**Mandatory Import:**
```typescript
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  imports: [InputGroupModule, InputTextModule]
})
```

**Usage:**
```html
<!-- With addon -->
<p-inputgroup>
  <p-inputgroupaddon>
    <i class="pi pi-envelope"></i>
  </p-inputgroupaddon>
  <input pInputText formControlName="email" placeholder="Email" />
</p-inputgroup>

<!-- With addon and color -->
<p-inputgroup>
  <p-inputgroupaddon class="icon-addon icon-addon--success">
    <i class="pi pi-check"></i>
  </p-inputgroupaddon>
  <input pInputText value="Verified" />
</p-inputgroup>

<!-- Multiple addons -->
<p-inputgroup>
  <p-inputgroupaddon>
    <i class="pi pi-dollar"></i>
  </p-inputgroupaddon>
  <input pInputText type="number" formControlName="price" />
  <p-inputgroupaddon>USD</p-inputgroupaddon>
</p-inputgroup>
```

### Tag (p-tag)

**Mandatory Import:**
```typescript
import { TagModule } from 'primeng/tag';

@Component({
  imports: [TagModule]
})
```

**Usage:**
```html
<!-- Basic tag -->
<p-tag value="Active"></p-tag>

<!-- With severity -->
<p-tag [value]="status()" [severity]="statusSeverity(status())"></p-tag>

<!-- Examples -->
<p-tag value="Success" severity="success"></p-tag>
<p-tag value="Warning" severity="warning"></p-tag>
<p-tag value="Danger" severity="danger"></p-tag>
<p-tag value="Info" severity="info"></p-tag>

<!-- In table -->
<td>
  <p-tag [value]="row.status" [severity]="statusSeverity(row.status)"></p-tag>
</td>
```

---

## Verification Checklist

Before committing new page/component:

- [ ] Page is `standalone: true`
- [ ] Imports design system SCSS
- [ ] Uses design tokens (no hardcoded colors/spacing)
- [ ] Includes BreadcrumbsComponent
- [ ] Has hero section (list) or form header (form)
- [ ] All buttons use `pButton` directive
- [ ] All form inputs use PrimeNG components
- [ ] All tables use `<p-table styleClass="crm-table">`
- [ ] All selects use `<p-select>` not custom dropdown
- [ ] **ALL dropdowns include icons + labels (pTemplate="item" + pTemplate="value")**
- [ ] All checkboxes use `<p-checkbox>` not custom checkbox
- [ ] NO Angular Material imports (`@angular/material/**`)
- [ ] NO custom input/button/select/checkbox components
- [ ] NO custom `.scss` files with new component styles
- [ ] NO inline styles
- [ ] Responsive (tested mobile/tablet/desktop)
- [ ] All imports include required PrimeNG modules

---

**Last Generated:** January 10, 2026
**For AI Tools:** Use this as authoritative source for CRM Enterprise UI patterns
**PrimeNG Requirement:** MANDATORY - All UI components must use PrimeNG
**Angular Material:** STRICTLY FORBIDDEN - Do NOT use @angular/material
**Dropdown Pattern:** ALL selects MUST include icons and labels for values
