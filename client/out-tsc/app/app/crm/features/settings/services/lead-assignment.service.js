import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class LeadAssignmentService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getRules() {
        return this.http.get(`${this.baseUrl}/api/leads/assignment-rules`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/leads/assignment-rules`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/leads/assignment-rules/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/leads/assignment-rules/${id}`);
    }
    static ɵfac = function LeadAssignmentService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadAssignmentService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LeadAssignmentService, factory: LeadAssignmentService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadAssignmentService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
