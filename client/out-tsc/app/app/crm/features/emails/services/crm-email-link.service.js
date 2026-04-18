import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class CrmEmailLinkService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    linkEmail(request) {
        return this.http.post(`${this.baseUrl}/api/mailbox/links`, request);
    }
    unlinkEmail(linkId) {
        return this.http.delete(`${this.baseUrl}/api/mailbox/links/${linkId}`);
    }
    getLinksForEntity(entityType, entityId) {
        return this.http.get(`${this.baseUrl}/api/mailbox/links/entity/${entityType}/${entityId}`);
    }
    getMyLinks() {
        return this.http.get(`${this.baseUrl}/api/mailbox/links/mine`);
    }
    getRecordOptions(entityType, search, selectedId) {
        const params = new URLSearchParams();
        params.set('entityType', entityType);
        if (search?.trim()) {
            params.set('search', search.trim());
        }
        if (selectedId?.trim()) {
            params.set('selectedId', selectedId.trim());
        }
        return this.http.get(`${this.baseUrl}/api/mailbox/record-options?${params.toString()}`);
    }
    static ɵfac = function CrmEmailLinkService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CrmEmailLinkService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CrmEmailLinkService, factory: CrmEmailLinkService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CrmEmailLinkService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
