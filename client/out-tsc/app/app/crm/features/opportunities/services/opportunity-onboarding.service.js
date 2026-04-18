import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class OpportunityOnboardingService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    get(opportunityId, type) {
        let params = new HttpParams();
        if (type) {
            params = params.set('type', type);
        }
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/onboarding`, { params });
    }
    create(opportunityId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/onboarding`, payload);
    }
    update(itemId, payload) {
        return this.http.patch(`${this.baseUrl}/api/opportunity-onboarding/${itemId}`, payload);
    }
    delete(itemId) {
        return this.http.delete(`${this.baseUrl}/api/opportunity-onboarding/${itemId}`);
    }
    static ɵfac = function OpportunityOnboardingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityOnboardingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OpportunityOnboardingService, factory: OpportunityOnboardingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityOnboardingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
