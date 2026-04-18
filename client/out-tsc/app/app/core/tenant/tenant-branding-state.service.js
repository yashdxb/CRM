import { inject, Injectable, signal } from '@angular/core';
import { TenantBrandingService } from './tenant-branding.service';
import { getTenantKeyForAuthBootstrap } from './tenant.utils';
import * as i0 from "@angular/core";
export class TenantBrandingStateService {
    brandingService = inject(TenantBrandingService);
    logoUrl = signal(null, ...(ngDevMode ? [{ debugName: "logoUrl" }] : []));
    tenantName = signal(null, ...(ngDevMode ? [{ debugName: "tenantName" }] : []));
    /** Load branding for an authenticated user (uses auth token for tenant resolution). */
    loadBranding() {
        this.brandingService.getBranding().subscribe({
            next: (b) => this.apply(b),
            error: () => this.clear()
        });
    }
    /** Load branding publicly (pre-auth, e.g. login page). */
    loadPublicBranding() {
        const key = getTenantKeyForAuthBootstrap();
        if (!key) {
            this.clear();
            return;
        }
        this.brandingService.getPublicBranding(key).subscribe({
            next: (b) => this.apply(b),
            error: () => this.clear()
        });
    }
    clear() {
        this.logoUrl.set(null);
        this.tenantName.set(null);
    }
    apply(b) {
        this.logoUrl.set(b.logoUrl);
        this.tenantName.set(b.tenantName);
    }
    static ɵfac = function TenantBrandingStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantBrandingStateService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TenantBrandingStateService, factory: TenantBrandingStateService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantBrandingStateService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
