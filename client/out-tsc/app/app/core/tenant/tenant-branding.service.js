import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class TenantBrandingService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getBranding() {
        return this.http.get(`${this.baseUrl}/api/tenant-branding`);
    }
    getPublicBranding(tenantKey) {
        return this.http.get(`${this.baseUrl}/api/tenant-branding/public`, { params: { tenantKey } });
    }
    uploadLogo(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(`${this.baseUrl}/api/tenant-branding/logo`, formData);
    }
    removeLogo() {
        return this.http.delete(`${this.baseUrl}/api/tenant-branding/logo`);
    }
    static ɵfac = function TenantBrandingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantBrandingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TenantBrandingService, factory: TenantBrandingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantBrandingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
