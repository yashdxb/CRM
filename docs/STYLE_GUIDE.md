# Style Guide

## Global Style Rules

Every page must inherit from the global design system. Do not build isolated page styles. Use the shared mixins, tokens, and utilities so UI stays consistent across modules.

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

