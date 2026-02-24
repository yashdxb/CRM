import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal, effect } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Device Detection Service
 * 
 * Provides reactive signals for responsive design breakpoints.
 * Automatically detects device type and window size changes.
 * 
 * Usage in components:
 * @inject(DeviceService) device = inject(DeviceService);
 * 
 * In templates:
 * *ngIf="device.isMobile()" - Show on mobile devices
 * *ngIf="device.isTablet()" - Show on tablets
 * [class.mobile]="device.isMobile()" - Apply mobile CSS class
 */
@Injectable({ providedIn: 'root' })
export class DeviceService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Breakpoints matching _design-tokens.scss
  private readonly BREAKPOINTS = {
    mobile: 320,
    mobileLg: 480,
    tablet: 768,
    desktop: 1024,
    desktopLg: 1200,
    desktopXl: 1440,
    desktop2xl: 1920
  };

  // Reactive width signal
  private readonly windowWidth = signal<number>(
    this.isBrowser ? window.innerWidth : 1024
  );

  // Device type signals
  readonly isMobile = signal(this.checkIsMobile());
  readonly isMobileLg = signal(this.checkIsMobileLg());
  readonly isTablet = signal(this.checkIsTablet());
  readonly isDesktop = signal(this.checkIsDesktop());
  readonly isDesktopLg = signal(this.checkIsDesktopLg());

  // Utility signals
  readonly isSmallScreen = signal(this.checkIsSmallScreen()); // mobile or mobile-lg
  readonly isTouchDevice = signal(this.checkIsTouchDevice());

  constructor() {
    if (this.isBrowser) {
      // Listen to window resize events
      fromEvent(window, 'resize')
        .pipe(debounceTime(150))
        .subscribe(() => {
          this.updateWindowSize();
        });

      // Listen to orientation change
      fromEvent(window, 'orientationchange')
        .pipe(debounceTime(150))
        .subscribe(() => {
          this.updateWindowSize();
        });

      // Setup reactive effects to update all signals when width changes
      effect(() => {
        const width = this.windowWidth();
        this.isMobile.set(width < this.BREAKPOINTS.mobileLg);
        this.isMobileLg.set(width >= this.BREAKPOINTS.mobileLg && width < this.BREAKPOINTS.tablet);
        this.isTablet.set(width >= this.BREAKPOINTS.tablet && width < this.BREAKPOINTS.desktop);
        this.isDesktop.set(width >= this.BREAKPOINTS.desktop && width < this.BREAKPOINTS.desktopLg);
        this.isDesktopLg.set(width >= this.BREAKPOINTS.desktopLg);
        this.isSmallScreen.set(width < this.BREAKPOINTS.tablet);
      });
    }
  }

  /** Get current window width */
  getWidth(): number {
    return this.windowWidth();
  }

  /** Check if matches specific breakpoint or smaller */
  isAtOrBelow(breakpoint: keyof typeof this.BREAKPOINTS): boolean {
    return this.windowWidth() <= this.BREAKPOINTS[breakpoint];
  }

  /** Check if matches specific breakpoint or larger */
  isAtOrAbove(breakpoint: keyof typeof this.BREAKPOINTS): boolean {
    return this.windowWidth() >= this.BREAKPOINTS[breakpoint];
  }

  /** Get breakpoint value for custom media queries */
  getBreakpoint(breakpoint: keyof typeof this.BREAKPOINTS): number {
    return this.BREAKPOINTS[breakpoint];
  }

  /** Get all breakpoints map for debugging */
  getBreakpoints() {
    return { ...this.BREAKPOINTS };
  }

  // Private helper methods
  private updateWindowSize(): void {
    if (this.isBrowser) {
      this.windowWidth.set(window.innerWidth);
    }
  }

  private checkIsMobile(): boolean {
    return this.isBrowser && window.innerWidth < this.BREAKPOINTS.mobileLg;
  }

  private checkIsMobileLg(): boolean {
    return (
      this.isBrowser &&
      window.innerWidth >= this.BREAKPOINTS.mobileLg &&
      window.innerWidth < this.BREAKPOINTS.tablet
    );
  }

  private checkIsTablet(): boolean {
    return (
      this.isBrowser &&
      window.innerWidth >= this.BREAKPOINTS.tablet &&
      window.innerWidth < this.BREAKPOINTS.desktop
    );
  }

  private checkIsDesktop(): boolean {
    return (
      this.isBrowser &&
      window.innerWidth >= this.BREAKPOINTS.desktop &&
      window.innerWidth < this.BREAKPOINTS.desktopLg
    );
  }

  private checkIsDesktopLg(): boolean {
    return this.isBrowser && window.innerWidth >= this.BREAKPOINTS.desktopLg;
  }

  private checkIsSmallScreen(): boolean {
    return this.isBrowser && window.innerWidth < this.BREAKPOINTS.tablet;
  }

  private checkIsTouchDevice(): boolean {
    if (!this.isBrowser) return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }
}
