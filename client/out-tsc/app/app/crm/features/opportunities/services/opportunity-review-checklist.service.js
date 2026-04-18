import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class OpportunityReviewChecklistService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    get(opportunityId, type) {
        let params = new HttpParams();
        if (type) {
            params = params.set('type', type);
        }
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/review-checklist`, { params });
    }
    create(opportunityId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/review-checklist`, payload);
    }
    update(itemId, payload) {
        return this.http.patch(`${this.baseUrl}/api/opportunity-review-checklist/${itemId}`, payload);
    }
    delete(itemId) {
        return this.http.delete(`${this.baseUrl}/api/opportunity-review-checklist/${itemId}`);
    }
    static ɵfac = function OpportunityReviewChecklistService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityReviewChecklistService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OpportunityReviewChecklistService, factory: OpportunityReviewChecklistService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityReviewChecklistService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
