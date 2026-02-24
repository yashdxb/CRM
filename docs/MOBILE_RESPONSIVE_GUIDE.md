# CRM Enterprise - Mobile Responsive Design Guide

> **Doc Role**
> - **Source of truth**: No (`Operational Guide`)
> - **Canonical references**: `docs/PROJECT_MASTER.md` (mobile guiding principles), `docs/DOCS_INDEX.md`
> - **Use this doc for**: Mobile UX/dev implementation guidance, breakpoints, patterns, and responsive QA expectations
> - **Status**: Active


## 📱 Overview

The CRM Enterprise application is now fully responsive with mobile-first design principles. The premium glass UI aesthetic is preserved across all breakpoints while ensuring excellent usability on phones, tablets, and desktops.

**Key Principle**: Responsive design doesn't mean simplification—it means intelligent adaptation. The glass UI, gradients, and premium feel remain consistent across all devices.

---

## 🎯 Breakpoints

Breakpoints are defined in `client/src/styles/_design-tokens.scss` and are synced with the `DeviceService`:

| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| `mobile` | 320px | iPhone SE, older phones |
| `mobile-lg` | 480px | iPhone 12, standard phones |
| `tablet` | 768px | iPad, Android tablets |
| `desktop` | 1024px | Laptop, desktop (default) |
| `desktop-lg` | 1200px | Large monitors |
| `desktop-xl` | 1440px | Ultra-wide displays |
| `desktop-2xl` | 1920px | 4K monitors |

---

## 🔧 Using Responsive Mixins in SCSS

All responsive utilities are in `_design-tokens.scss`. Usage pattern (mobile-first):

### Max-Width Media Query (Mobile First)
```scss
@use '../../../styles/design-tokens' as *;

.card {
  padding: 2rem;           // Default (desktop)
  
  @include respond-to('tablet') {
    padding: 1.5rem;       // At 767px and below
  }
  
  @include respond-to('mobile-lg') {
    padding: 1rem;         // At 479px and below
  }
}
```

### Min-Width Media Query (When Needed)
```scss
.section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  // Desktop
  
  @include respond-min('desktop-lg') {
    grid-template-columns: repeat(5, 1fr);  // 1200px+
  }
}
```

### Hide/Show Utilities
```scss
.desktop-only {
  @include hide-mobile;     // Hidden on tablets & mobile
}

.mobile-nav {
  @include show-mobile;     // Only visible on mobile
}
```

### Fluid Typography
```scss
h1 {
  @include fluid-font(1.5rem, 3rem);  // Scales between 24px–48px
}
```

### Touch Target Size
```scss
button {
  @include touch-target;    // Minimum 44x44px for mobile
}
```

### Semantic Mixins
```scss
.hero {
  @include mobile-only {
    flex-direction: column;
  }
  
  @include tablet-up {
    display: grid;
  }
  
  @include desktop-lg-up {
    gap: 2rem;
  }
}
```

---

## 📲 Using DeviceService in Components

The `DeviceService` provides reactive signals for device detection:

### Inject in Component
```typescript
import { Component, inject } from '@angular/core';
import { DeviceService } from './core/device/device.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <!-- Conditionally show layouts -->
    <div *ngIf="device.isMobile()">
      <app-mobile-dashboard />
    </div>
    <div *ngIf="!device.isMobile()">
      <app-desktop-dashboard />
    </div>

    <!-- Conditional rendering -->
    <button *ngIf="device.isTablet()">Tablet Action</button>
    <button [class.hidden]="device.isMobile()">Desktop-only</button>
  `
})
export class DashboardComponent {
  device = inject(DeviceService);
}
```

### Available Signals
```typescript
device.isMobile()           // < 480px
device.isMobileLg()        // 480px - 768px
device.isTablet()          // 768px - 1024px
device.isDesktop()         // 1024px - 1200px
device.isDesktopLg()       // >= 1200px
device.isSmallScreen()     // < 768px (mobile + mobile-lg)
device.isTouchDevice()     // Detects touch capability
```

### Utility Methods
```typescript
// Get current window width
const w = device.getWidth();

// Check specific breakpoint
const isMobileOrSmaller = device.isAtOrBelow('mobile-lg');
const isDesktopOrLarger = device.isAtOrAbove('desktop');

// Get breakpoint pixel value
const desktopPx = device.getBreakpoint('desktop');  // 1024
```

---

## 🎨 Glass UI on Mobile - Best Practices

The premium glass aesthetic adapts perfectly to mobile. Here's how to maintain it:

### Card Styling (Mobile-Safe)
```scss
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  
  @include respond-to('tablet') {
    padding: 1.5rem;        // Comfortable spacing on mobile
  }
  
  @include respond-to('mobile-lg') {
    padding: 1rem;          // Compact but breathable
  }
}
```

✅ **Keep**: Blur, transparency, shadow, rounded corners  
❌ **Don't**: Squeeze padding excessively, hide key elements

### Tables on Mobile
```scss
.data-table {
  // Desktop: standard table
  @media (min-width: 769px) {
    display: table;
  }
  
  // Mobile: becomes card-based
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    thead {
      display: none;  // Hide headers, show as labels
    }
    
    tbody tr {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }
  }
}
```

Use the included `MobileTableWrapperComponent`:
```html
<app-mobile-table-wrapper [isMobileView]="device.isMobile()">
  <p-table [value]="data">
    <!-- Standard table markup -->
  </p-table>
</app-mobile-table-wrapper>
```

---

## 📐 Responsive Component Patterns

### Pattern 1: Hero Section (Responsive as Built-in)
```scss
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @include respond-to('tablet') {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

### Pattern 2: Metrics Grid
```scss
.metrics {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  
  @include respond-to('desktop-lg') {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to('mobile-lg') {
    grid-template-columns: 1fr;
  }
}
```

### Pattern 3: Form Layout
```scss
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @include respond-to('tablet') {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.form-section {
  padding: 2rem;
  
  @include respond-to('tablet') {
    padding: 1.5rem;
  }
  
  @include respond-to('mobile-lg') {
    padding: 1rem;
  }
}
```

### Pattern 4: Sidebar Navigation
The sidebar is already off-canvas on mobile (`shell.component.scss`). It slides from left with scrim overlay:
```scss
@media (max-width: 840px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: min(86vw, 320px);
    transform: translateX(-110%);
    transition: transform 0.25s ease;
  }
  
  .shell:not(.shell--collapsed) .sidebar {
    transform: translateX(0);
  }
}
```

---

## 🚀 Implementation Checklist

When making a page responsive:

- [ ] **SCSS**: Use `@include respond-to()` mixins for breakpoints
- [ ] **Spacing**: Reduce padding/margin on smaller screens
- [ ] **Typography**: Use `clamp()` for fluid sizing or reduce font-size on mobile
- [ ] **Grid**: Drop from 2+ columns to 1 column on tablet
- [ ] **Images**: Use `max-width: 100%` and `height: auto`
- [ ] **Forms**: Stack inputs vertically on mobile, full-width buttons
- [ ] **Tables**: Convert to card layout or horizontal scroll on mobile
- [ ] **Touch**: Ensure buttons are 44px+ for easy tapping
- [ ] **Safe Area**: Use `@include safe-padding-mobile()` for notched phones
- [ ] **Test**: Check all breakpoints in DevTools or physical devices

---

## 🧪 Testing Mobile Responsiveness

### VS Code DevTools
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Test breakpoints: 375px, 768px, 1024px, 1440px

### Chrome Breakpoints to Test
- **Mobile**: 375px (iPhone 12 width)
- **Tablet**: 768px (iPad width)
- **Desktop**: 1024px (laptop default)
- **Large**: 1440px (wide monitor)

### Play with Existing E2E Tests
Check `client/e2e/dashboard-mobile.spec.ts` for mobile testing example:
```typescript
test.use({ viewport: { width: 390, height: 844 } });  // iPhone 12 size
```

---

## 🎭 Glass UI Principles on Mobile

### What Scales Well
✅ Gradient backgrounds (adjust blur for performance)  
✅ Rounded corners (16px-20px feels premium anywhere)  
✅ Soft shadows with transparency  
✅ Color palette (same hues across devices)  
✅ Typography hierarchy (scale, not simplify)  
✅ Spacious cards with breathing room  

### What to Adjust
⚠️ Font sizes (use `clamp()` for fluidity)  
⚠️ Padding (reduce 2rem → 1rem on mobile)  
⚠️ Columns (5 cols → 2 cols → 1 col)  
⚠️ Gaps (reduce by 25-33% on mobile)  
⚠️ Button sizes (increase to 44px for touch)  
⚠️ Image sizes (max-width: 100%)  

### What NOT to Remove
❌ Glass blur effect (reduce for performance: `blur(10px)`)  
❌ Shadows (keep soft, maybe slightly lighter)  
❌ Transparency (maintain premium feel)  
❌ Color gradients (they adapt perfectly)  
❌ Animations (reduce complexity on slower devices)  

---

## 📝 Example: Making a Page Responsive

### Before (Desktop-Only)
```scss
.container {
  display: grid;
  grid-template-columns: 400px 1fr 300px;
  gap: 2rem;
  padding: 3rem;
}

.header h1 {
  font-size: 3rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
```

### After (Mobile-First with Glass UI)
```scss
@use '../styles/design-tokens' as *;

.container {
  // Mobile first
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  
  // Tablet and up
  @include respond-min('tablet') {
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  // Desktop and up
  @include respond-min('desktop') {
    display: grid;
    grid-template-columns: 400px 1fr 300px;
    gap: 2rem;
    padding: 2rem;
  }
}

.header h1 {
  @include fluid-font(1.5rem, 3rem);  // Scales 24px-48px
  line-height: 1.2;
}

button {
  @include touch-target;              // Min 44x44px
  padding: 0.75rem 1.5rem;            // Mobile
  
  @include respond-min('tablet') {
    padding: 1rem 2rem;              // Tablet+
  }
  
  font-size: 1rem;                   // Mobile
  @include respond-min('desktop') {
    font-size: 1.125rem;             // Desktop+
  }
}
```

---

## 🔗 Key Files

| File | Purpose |
|------|---------|
| `client/src/styles/_design-tokens.scss` | Breakpoints, mixins, design tokens |
| `client/src/app/core/device/device.service.ts` | Reactive device detection service |
| `client/src/app/shared/mobile-table-wrapper.component.ts` | Responsive table wrapper |
| `client/src/app/layout/shell.component.scss` | Off-canvas sidebar on mobile |
| `client/src/styles/_components.scss` | Global responsive utilities |
| `client/src/app/shared/_form-page-styles.scss` | Form responsive patterns |
| `client/src/app/shared/page-design-system.scss` | List page responsive patterns |

---

## ⚡ Performance Tips

1. **Reduce Blur on Mobile**: Blur effect is GPU-intensive
   ```scss
   backdrop-filter: blur(20px);     // Desktop
   @include respond-to('tablet') {
     backdrop-filter: blur(10px);   // Mobile
   }
   ```

2. **Simplify Animations**: Respect prefers-reduced-motion
   ```scss
   @media (prefers-reduced-motion: reduce) {
     * {
       animation: none !important;
     }
   }
   ```

3. **Optimize Images**: Use responsive images
   ```html
   <img srcset="image-small.png 480w, image-large.png 1200w" />
   ```

4. **Lazy Load**: Use Angular's built-in lazy loading
   ```html
   <img loading="lazy" src="..." />
   ```

---

## ❓ FAQ

**Q: Will the glass UI look bad on mobile?**  
A: No! Glassmorphism scales beautifully to mobile. We just adjust spacing and layout, not the aesthetic.

**Q: Do I need to create separate mobile components?**  
A: Not always. Use `@include respond-to()` mixins. Only create separate components for drastically different layouts (rare).

**Q: How do I test without a physical phone?**  
A: Use Chrome DevTools device emulation. It's accurate for layout testing.

**Q: Which breakpoint should I prioritize?**  
A: Mobile first (320px+), then test tablet (768px) and desktop (1024px+).

**Q: Can I use viewport width directly in templates?**  
A: Use `DeviceService` signals: `*ngIf="device.isMobile()"` instead.

---

## 📚 Resources

- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Apple HIG: Touch Targets](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/accessibility/)
- [Google Material Design: Responsive UI](https://material.io/design/layout/understanding-layout.html)
- [Web.dev: Responsive Web Design](https://web.dev/responsive-web-design-basics/)

---

## 🎯 Next Steps

1. Test existing pages in DevTools at 375px, 768px, 1024px
2. Identify pages needing responsive updates
3. Apply mixins and `DeviceService` signals
4. Test on physical devices
5. Measure performance with Lighthouse

All of this is achievable **without losing the premium glass UI aesthetic**. The responsive updates enhance usability on mobile while maintaining the visual identity you've built for desktop. 🚀
