# Mobile Responsive Implementation - Technical Reference

## Quick Start for Developers

### 1. Make a Component Responsive (5 Minutes)

**Step 1: Import design tokens**
```scss
@use '../../../styles/design-tokens' as *;
```

**Step 2: Add responsive breakpoints**
```scss
.my-component {
  padding: 2rem;           // Default (desktop)
  
  @include respond-to('tablet') {
    padding: 1.5rem;
  }
  
  @include respond-to('mobile-lg') {
    padding: 1rem;
  }
}
```

**Step 3: Test in DevTools** (Ctrl+Shift+M → resize to 375px, 768px)

### 2. Use DeviceService in a Component

```typescript
import { Component, inject } from '@angular/core';
import { DeviceService } from '../core/device/device.service';

@Component({
  selector: 'app-my-feature',
  template: `
    <!-- Show/hide based on device -->
    <div *ngIf="device.isSmallScreen()">
      <h1 class="mobile-heading">Mobile Title</h1>
    </div>
    
    <div [class.hidden]="device.isSmallScreen()">
      <h1 class="desktop-heading">Desktop Title</h1>
    </div>
  `
})
export class MyFeatureComponent {
  protected device = inject(DeviceService);
}
```

---

## Mixin Reference

All mixins are in `_design-tokens.scss`:

### `@include respond-to($breakpoint)`
Max-width media query (mobile-first). Use this most often.

```scss
@include respond-to('mobile-lg') {
  // Applied at 479px and below
}
```

**Breakpoint values:**
- `'mobile'` → max-width: 319px
- `'mobile-lg'` → max-width: 479px
- `'tablet'` → max-width: 767px
- `'desktop'` → max-width: 1023px
- `'desktop-lg'` → max-width: 1199px

### `@include respond-min($breakpoint)`
Min-width media query. Use when you need the opposite.

```scss
@include respond-min('desktop') {
  // Applied at 1024px and above
}
```

### Semantic Shortcuts

```scss
@include mobile-only { }     // max-width: 479px
@include tablet-up { }       // min-width: 768px
@include desktop-up { }      // min-width: 1024px
@include desktop-lg-up { }   // min-width: 1200px
```

### Hide/Show Utilities

```scss
@include hide-mobile    // Hidden < 768px
@include hide-desktop   // Hidden >= 1024px
@include show-mobile    // Only visible < 768px
```

### Fluid Typography

Auto-scales between min/max based on viewport:

```scss
h1 {
  @include fluid-font(1.5rem, 3rem);  // 24px–48px
  @include fluid-font(1rem, 2rem, 320px, 1440px);  // Custom min/max screens
}
```

### Touch Target

Ensures 44x44px minimum for touch:

```scss
button {
  @include touch-target;
}
```

### Safe Area (Notched Phones)

```scss
.page {
  @include safe-padding-mobile;  // Respects notches, cutouts
}
```

---

## DeviceService Signals

All reactive signals that update when window resizes:

```typescript
device.isMobile()          // boolean: < 480px
device.isMobileLg()        // boolean: 480–768px
device.isTablet()          // boolean: 768–1024px
device.isDesktop()         // boolean: 1024–1200px
device.isDesktopLg()       // boolean: >= 1200px
device.isSmallScreen()     // boolean: < 768px
device.isTouchDevice()     // boolean: touch-capable
```

### Utility Methods

```typescript
// Get current width
const width = device.getWidth();

// Check against breakpoint
device.isAtOrBelow('tablet')       // < 768px?
device.isAtOrAbove('desktop')      // >= 1024px?

// Get pixel value
device.getBreakpoint('mobile-lg')  // Returns 480

// Get all breakpoints
device.getBreakpoints()            // Returns full map
```

---

## Common Patterns

### Responsive Grid

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);   // Desktop: 4 items
  gap: 2rem;
  
  @include respond-to('desktop-lg') {
    grid-template-columns: repeat(3, 1fr); // Tablet: 3 items
  }
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr); // Mobile-lg: 2 items
  }
  
  @include respond-to('mobile-lg') {
    grid-template-columns: 1fr;             // Mobile: 1 item
    gap: 1rem;
  }
}
```

### Responsive Flex Stack

```scss
.card-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  
  @include respond-to('tablet') {
    flex-direction: column;
    gap: 1rem;
  }
}
```

### Responsive Table (Convert to Cards)

```scss
.table-container {
  overflow-x: auto;  // Scrollable on mobile
  
  @include respond-to('tablet') {
    overflow: visible;
    
    thead {
      display: none;  // Hide headers
    }
    
    tbody tr {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
}
```

### Responsive Sidebar (Off-Canvas)

Already implemented in `shell.component.scss` at 840px breakpoint.

```scss
.sidebar {
  // Mobile: off-canvas
  position: fixed;
  left: 0;
  width: 320px;
  transform: translateX(-100%);
  
  // Desktop: always visible
  @include respond-min('desktop') {
    position: static;
    transform: translateX(0);
  }
}
```

### Responsive Typography

```scss
h1 {
  font-size: 1.5rem;           // Mobile
  
  @include respond-min('tablet') {
    font-size: 2rem;           // Tablet
  }
  
  @include respond-min('desktop') {
    font-size: 2.5rem;         // Desktop
  }
  
  // OR use fluid scaling
  @include fluid-font(1.5rem, 2.5rem);
}
```

---

## Template Usage

### Conditional Rendering

```html
<!-- Show only on mobile -->
<div *ngIf="device.isMobile()">
  Mobile navigation
</div>

<!-- Hide on mobile -->
<div *ngIf="!device.isSmallScreen()">
  Desktop layout
</div>

<!-- Use with ng-switch -->
<div [ngSwitch]="device.isSmallScreen() ? 'mobile' : 'desktop'">
  <ng-container *ngSwitchCase="'mobile'">
    <app-mobile-dashboard />
  </ng-container>
  <ng-container *ngSwitchCase="'desktop'">
    <app-desktop-dashboard />
  </ng-container>
</div>
```

### Class Binding

```html
<!-- Add mobile class -->
<div [class.mobile]="device.isMobile()">Content</div>

<!-- Multiple classes -->
<div [ngClass]="{'tablet': device.isTablet(), 'mobile': device.isMobile()}">
  Content
</div>

<!-- Conditional styling from service signals -->
<button [disabled]="device.isSmallScreen()">Action</button>
```

---

## Glass UI on Mobile - Code Examples

### Responsive Glass Card

```scss
.glass-card {
  // Always maintain glass look
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  
  // Adjust spacing for smaller screens
  padding: 2rem;
  
  @include respond-to('tablet') {
    padding: 1.5rem;        // Comfortable
  }
  
  @include respond-to('mobile-lg') {
    padding: 1rem;          // Compact but breathable
  }
  
  // Optional: Reduce blur on very small devices for performance
  @media (max-width: 480px) {
    backdrop-filter: blur(10px);  // Lighter blur on weak mobile GPUs
  }
}
```

### Responsive Hero Section (Premium Glass)

```scss
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 3rem 2rem;
  
  // Mobile: Stack vertically
  @include respond-to('tablet') {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
  
  @include respond-to('mobile-lg') {
    padding: 1.5rem 1rem;
  }
}

.hero-content h1 {
  @include fluid-font(1.5rem, 3rem);  // Scales responsively
}

.hero-visual {
  min-height: clamp(300px, 50vh, 500px);  // CSS clamp is great
}
```

### Responsive Metrics Grid

```scss
.metrics {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  
  @include respond-to('desktop-lg') {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to('mobile-lg') {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.metric-card {
  padding: 1.5rem;
  
  @include respond-to('tablet') {
    padding: 1rem;
  }
}
```

---

## Testing Mobile Responsive

### In Chrome DevTools

1. Open DevTools (F12 or Cmd+Option+I)
2. Click toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test at these widths:
   - **375px**: iPhone 12
   - **481px**: Mobile-LG
   - **768px**: iPad
   - **1024px**: Desktop minimum
   - **1440px**: Desktop wide

### In Code (Playwright)

```typescript
test('dashboard is responsive on mobile', async ({ page }) => {
  // Mobile viewport
  page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/app/dashboard');
  
  // Check mobile layout
  const mobileNav = page.locator('[data-mobile-nav]');
  await expect(mobileNav).toBeVisible();
  
  // Check desktop hidden
  const desktopSidebar = page.locator('.sidebar');
  await expect(desktopSidebar).toHaveClass(/off-canvas/);
});
```

---

## Performance Optimization

### Reduce Animations on Mobile

```scss
.animated-element {
  animation: spin 2s infinite;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  
  // Or only animate on desktop
  @include respond-to('tablet') {
    animation: none;
  }
}
```

### Optimize Images

```html
<!-- Use srcset for responsive images -->
<img 
  srcset="image-480.jpg 480w, image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 60vw"
  src="image-1200.jpg"
/>

<!-- Lazy load -->
<img loading="lazy" src="..." />
```

### Container Queries (Advanced)

For component-level responsive design (not viewport-based):

```scss
@container (min-width: 400px) {
  .component { /* Changes based on container, not viewport */ }
}
```

---

## Common Mistakes to Avoid

❌ **Don't use pixel breakpoints randomly**
```scss
@media (max-width: 600px) { }  // Bad, use $breakpoints
```
✅ **Do use design token breakpoints**
```scss
@include respond-to('tablet') { }  // Good
```

❌ **Don't hide content on mobile without alternative**
```scss
.info {
  @include hide-mobile;  // Users can't access on phone!
}
```
✅ **Do provide mobile alternative**
```scss
.info {
  display: none;
  @include respond-min('tablet') { display: block; }
}
// And provide mobile version
.info-mobile {
  @include hide-desktop;
}
```

❌ **Don't squeeze padding excessively**
```scss
padding: 0.25rem;  // Too cramped
```
✅ **Do maintain breathing room**
```scss
padding: 1rem;  // Comfortable even on mobile
```

❌ **Don't forget touch targets**
```scss
button { width: 20px; }  // Too small to tap
```
✅ **Do ensure 44px minimum**
```scss
button {
  @include touch-target;
}
```

---

## File Structure

```
client/src/
├── styles/
│   ├── _design-tokens.scss          ← Breakpoints & mixins here
│   ├── _components.scss
│   └── styles.scss
├── app/
│   ├── core/
│   │   └── device/
│   │       └── device.service.ts    ← Device detection service
│   ├── shared/
│   │   └── mobile-table-wrapper.component.ts
│   └── layout/
│       └── shell.component.scss     ← Off-canvas sidebar
└── e2e/
    └── dashboard-mobile.spec.ts     ← Mobile testing example
```

---

## Checklist: Making a Page Responsive

- [ ] Import `@use 'styles/design-tokens' as *`
- [ ] Identify desktop layout (grid, flex, etc.)
- [ ] Add mobile-first breakpoints with `@include respond-to()`
- [ ] Test at 375px, 768px, 1024px in DevTools
- [ ] Ensure touch targets are 44px+
- [ ] Verify text is readable (min 16px on mobile)
- [ ] Check images scale properly
- [ ] Test form inputs are tappable
- [ ] Verify no horizontal scroll on mobile
- [ ] Test on physical device if possible
- [ ] Run Lighthouse audit for mobile
- [ ] Check performance (animations, blur)

---

## Resources & Examples

- **Full Guide**: Read `MOBILE_RESPONSIVE_GUIDE.md`
- **Design Tokens**: `client/src/styles/_design-tokens.scss`
- **Device Service**: `client/src/app/core/device/device.service.ts`
- **Examples**: `client/src/app/layout/shell.component.scss` (sidebar)
- **E2E Testing**: `client/e2e/dashboard-mobile.spec.ts`

---

Keep the **glass UI aesthetic** while making everything **mobile-first**. Your premium design scales beautifully. 🚀
