import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class AuditLogService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(query) {
        let params = new HttpParams();
        if (query.search) {
            params = params.set('search', query.search);
        }
        if (query.entityType) {
            params = params.set('entityType', query.entityType);
        }
        if (query.action) {
            params = params.set('action', query.action);
        }
        if (query.userId) {
            params = params.set('userId', query.userId);
        }
        if (query.fromUtc) {
            params = params.set('fromUtc', query.fromUtc);
        }
        if (query.toUtc) {
            params = params.set('toUtc', query.toUtc);
        }
        if (query.page) {
            params = params.set('page', String(query.page));
        }
        if (query.pageSize) {
            params = params.set('pageSize', String(query.pageSize));
        }
        return this.http.get(`${this.baseUrl}/api/audit`, { params });
    }
    static ɵfac = function AuditLogService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuditLogService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuditLogService, factory: AuditLogService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditLogService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
