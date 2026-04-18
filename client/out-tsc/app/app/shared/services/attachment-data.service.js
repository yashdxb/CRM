import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class AttachmentDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    list(relatedEntityType, relatedEntityId) {
        const params = new HttpParams()
            .set('relatedEntityType', relatedEntityType)
            .set('relatedEntityId', relatedEntityId);
        return this.http.get(`${this.baseUrl}/api/attachments`, { params });
    }
    upload(file, relatedEntityType, relatedEntityId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('relatedEntityType', relatedEntityType);
        formData.append('relatedEntityId', relatedEntityId);
        return this.http.post(`${this.baseUrl}/api/attachments`, formData);
    }
    downloadUrl(id) {
        return `${this.baseUrl}/api/attachments/${id}/download`;
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/attachments/${id}`);
    }
    static ɵfac = function AttachmentDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AttachmentDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AttachmentDataService, factory: AttachmentDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttachmentDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
