# Style Guide

## Global Style Rules

Every page must inherit from the global design system. Do not build isolated page styles. Use the shared mixins, tokens, and utilities so UI stays consistent across modules.

Mandatory change-control rule:
- Do not alter any existing style, color, spacing, typography, or visual behavior unless the user explicitly asks for a style/UI change in the current task.

### Global Style Files (Source of Truth)

| File | Location | Purpose |
| --- | --- | --- |
| styles.scss | `client/src/styles.scss` | Main global stylesheet (imported in `angular.json`) |
| _design-tokens.scss | `client/src/styles/_design-tokens.scss` | CSS variables, colors, spacing tokens |
| _components.scss | `client/src/styles/_components.scss` | Reusable component styles |
| _animations.scss | `client/src/styles/_animations.scss` | Shared animations/keyframes |
| _form-page-styles.scss | `client/src/app/shared/_form-page-styles.scss` | Premium glass UI mixins for form pages |
| page-design-system.scss | `client/src/app/shared/page-design-system.scss` | Shared page layout system |
| app.scss | `client/src/app/app.scss` | App-level component styles |

### Enforcement Guidelines

- New pages must import and apply the global style system (mixins/tokens) instead of creating one-off styles.
- Use existing component classes and PrimeNG styles before adding new selectors.
- If a page needs a new pattern, add it to the global files above first, then consume it in the page.

### Heading Hierarchy Standard (CRM-Wide)

Apply this hierarchy on all CRM pages:

- `H1` page title: use `h1.hero-title` (exactly one per page).
- `H2` section title: use `h2.section-title` (soft gradient style from shared system).
- `H3` card/subsection title: use `h3.card-title` or `h3.section-title` (solid readable style).
- Subtitle text: use `page-subtitle` / `hero-subtitle` / `hero-description`.

Rules:
- Do not define page-local hero/title gradient colors.
- Do not use `H2` or `H3` for the primary page title.
- Keep heading styles centralized in `client/src/styles/_components.scss`.

### List Row Action Buttons Standard

Lead list is the visual reference for all list/table row actions.

- Use container class: `row-actions`
- Use button class pattern: `action-btn p-button-text p-button-rounded p-button-sm` + severity
- Severity mapping:
  - Edit: `p-button-info`
  - Coach: `p-button-help`
  - Log activity: `p-button-secondary`
  - Convert/complete: `p-button-success`
  - Delete: `p-button-danger`
- Do not create page-specific icon button skins for list rows.
- Shared implementation lives in `client/src/styles/_components.scss` under `LIST ROW ACTION BUTTONS`.

### Dashboard Customize Layout Rules

- `Customize Command Center` labels and pack context must be API-sourced, not inferred from local fallback state.
- Show pack context in the cards section label, for example:
  - `Command Center cards (SDR Pack)`
  - `Command Center cards (H2 Pack)`
- When user layout is untouched, card visibility and display order must follow the assigned dashboard pack definition exactly.
