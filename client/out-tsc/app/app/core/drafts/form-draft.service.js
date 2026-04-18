import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class FormDraftService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    list(entityType, options) {
        let params = new HttpParams().set('entityType', entityType);
        if (options?.limit != null) {
            params = params.set('limit', options.limit);
        }
        if (options?.page != null) {
            params = params.set('page', options.page);
        }
        if (options?.pageSize != null) {
            params = params.set('pageSize', options.pageSize);
        }
        return this.http.get(`${this.baseUrl}/api/drafts`, { params });
    }
    get(id) {
        return this.http.get(`${this.baseUrl}/api/drafts/${id}`);
    }
    save(request) {
        return this.http.post(`${this.baseUrl}/api/drafts`, request);
    }
    complete(id) {
        return this.http.post(`${this.baseUrl}/api/drafts/${id}/complete`, {});
    }
    discard(id) {
        return this.http.delete(`${this.baseUrl}/api/drafts/${id}`);
    }
    static ɵfac = function FormDraftService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FormDraftService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FormDraftService, factory: FormDraftService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormDraftService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
