import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class TenantContextService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getTenantContext() {
        return this.http.get(`${this.baseUrl}/api/tenant-context`);
    }
    static ɵfac = function TenantContextService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantContextService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TenantContextService, factory: TenantContextService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantContextService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
