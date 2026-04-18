import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class OpportunityAutomationService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getRules() {
        return this.http.get(`${this.baseUrl}/api/opportunities/automation-rules`);
    }
    createRule(payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/automation-rules`, payload);
    }
    updateRule(id, payload) {
        return this.http.put(`${this.baseUrl}/api/opportunities/automation-rules/${id}`, payload);
    }
    deleteRule(id) {
        return this.http.delete(`${this.baseUrl}/api/opportunities/automation-rules/${id}`);
    }
    static ɵfac = function OpportunityAutomationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityAutomationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OpportunityAutomationService, factory: OpportunityAutomationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityAutomationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
