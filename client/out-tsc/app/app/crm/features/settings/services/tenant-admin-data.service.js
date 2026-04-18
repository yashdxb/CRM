import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class TenantAdminDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    listTenants() {
        return this.http.get(`${this.baseUrl}/api/tenants`);
    }
    createTenant(payload) {
        return this.http.post(`${this.baseUrl}/api/tenants`, payload);
    }
    updateIndustrySettings(tenantId, payload) {
        return this.http.put(`${this.baseUrl}/api/tenants/${tenantId}/industry`, payload);
    }
    static ɵfac = function TenantAdminDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantAdminDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TenantAdminDataService, factory: TenantAdminDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantAdminDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
