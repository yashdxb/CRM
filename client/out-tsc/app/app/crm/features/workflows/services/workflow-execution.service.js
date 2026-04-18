import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class WorkflowExecutionService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getDealApprovalStatus() {
        return this.http.get(`${this.baseUrl}/api/workflows/executions/deal-approval/status`);
    }
    getDealApprovalHistory(take = 50) {
        return this.http.get(`${this.baseUrl}/api/workflows/executions/deal-approval/history?take=${take}`);
    }
    static ɵfac = function WorkflowExecutionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowExecutionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkflowExecutionService, factory: WorkflowExecutionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowExecutionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
