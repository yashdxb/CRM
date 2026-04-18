import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal, effect } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
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
export class DeviceService {
    platformId = inject(PLATFORM_ID);
    isBrowser = isPlatformBrowser(this.platformId);
    // Breakpoints matching _design-tokens.scss
    BREAKPOINTS = {
        mobile: 320,
        mobileLg: 480,
        tablet: 768,
        desktop: 1024,
        desktopLg: 1200,
        desktopXl: 1440,
        desktop2xl: 1920
    };
    // Reactive width signal
    windowWidth = signal(this.isBrowser ? window.innerWidth : 1024, ...(ngDevMode ? [{ debugName: "windowWidth" }] : []));
    // Device type signals
    isMobile = signal(this.checkIsMobile(), ...(ngDevMode ? [{ debugName: "isMobile" }] : []));
    isMobileLg = signal(this.checkIsMobileLg(), ...(ngDevMode ? [{ debugName: "isMobileLg" }] : []));
    isTablet = signal(this.checkIsTablet(), ...(ngDevMode ? [{ debugName: "isTablet" }] : []));
    isDesktop = signal(this.checkIsDesktop(), ...(ngDevMode ? [{ debugName: "isDesktop" }] : []));
    isDesktopLg = signal(this.checkIsDesktopLg(), ...(ngDevMode ? [{ debugName: "isDesktopLg" }] : []));
    // Utility signals
    isSmallScreen = signal(this.checkIsSmallScreen(), ...(ngDevMode ? [{ debugName: "isSmallScreen" }] : [])); // mobile or mobile-lg
    isTouchDevice = signal(this.checkIsTouchDevice(), ...(ngDevMode ? [{ debugName: "isTouchDevice" }] : []));
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
    getWidth() {
        return this.windowWidth();
    }
    /** Check if matches specific breakpoint or smaller */
    isAtOrBelow(breakpoint) {
        return this.windowWidth() <= this.BREAKPOINTS[breakpoint];
    }
    /** Check if matches specific breakpoint or larger */
    isAtOrAbove(breakpoint) {
        return this.windowWidth() >= this.BREAKPOINTS[breakpoint];
    }
    /** Get breakpoint value for custom media queries */
    getBreakpoint(breakpoint) {
        return this.BREAKPOINTS[breakpoint];
    }
    /** Get all breakpoints map for debugging */
    getBreakpoints() {
        return { ...this.BREAKPOINTS };
    }
    // Private helper methods
    updateWindowSize() {
        if (this.isBrowser) {
            this.windowWidth.set(window.innerWidth);
        }
    }
    checkIsMobile() {
        return this.isBrowser && window.innerWidth < this.BREAKPOINTS.mobileLg;
    }
    checkIsMobileLg() {
        return (this.isBrowser &&
            window.innerWidth >= this.BREAKPOINTS.mobileLg &&
            window.innerWidth < this.BREAKPOINTS.tablet);
    }
    checkIsTablet() {
        return (this.isBrowser &&
            window.innerWidth >= this.BREAKPOINTS.tablet &&
            window.innerWidth < this.BREAKPOINTS.desktop);
    }
    checkIsDesktop() {
        return (this.isBrowser &&
            window.innerWidth >= this.BREAKPOINTS.desktop &&
            window.innerWidth < this.BREAKPOINTS.desktopLg);
    }
    checkIsDesktopLg() {
        return this.isBrowser && window.innerWidth >= this.BREAKPOINTS.desktopLg;
    }
    checkIsSmallScreen() {
        return this.isBrowser && window.innerWidth < this.BREAKPOINTS.tablet;
    }
    checkIsTouchDevice() {
        if (!this.isBrowser)
            return false;
        return ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0);
    }
    static ɵfac = function DeviceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DeviceService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DeviceService, factory: DeviceService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DeviceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
