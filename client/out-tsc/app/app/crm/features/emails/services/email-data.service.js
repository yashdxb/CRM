import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class EmailDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    // ============ EMAIL LOG OPERATIONS ============
    search(request) {
        let params = new HttpParams();
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (request.status) {
            params = params.set('status', request.status);
        }
        if (request.relatedEntityType) {
            params = params.set('relatedEntityType', request.relatedEntityType);
        }
        if (request.relatedEntityId) {
            params = params.set('relatedEntityId', request.relatedEntityId);
        }
        if (request.senderId) {
            params = params.set('senderId', request.senderId);
        }
        if (request.fromDate) {
            params = params.set('fromDate', request.fromDate);
        }
        if (request.toDate) {
            params = params.set('toDate', request.toDate);
        }
        if (request.page) {
            params = params.set('page', request.page);
        }
        if (request.pageSize) {
            params = params.set('pageSize', request.pageSize);
        }
        return this.http.get(`${this.baseUrl}/api/emails`, { params });
    }
    get(id) {
        return this.http.get(`${this.baseUrl}/api/emails/${id}`);
    }
    send(request) {
        return this.http.post(`${this.baseUrl}/api/emails`, request);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/emails/${id}`);
    }
    getStats() {
        return this.http.get(`${this.baseUrl}/api/emails/stats`);
    }
    // ============ TEMPLATE OPERATIONS ============
    searchTemplates(request) {
        let params = new HttpParams();
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (request.category) {
            params = params.set('category', request.category);
        }
        if (request.isActive !== undefined) {
            params = params.set('isActive', request.isActive);
        }
        if (request.page) {
            params = params.set('page', request.page);
        }
        if (request.pageSize) {
            params = params.set('pageSize', request.pageSize);
        }
        return this.http.get(`${this.baseUrl}/api/emails/templates`, { params });
    }
    getTemplate(id) {
        return this.http.get(`${this.baseUrl}/api/emails/templates/${id}`);
    }
    createTemplate(request) {
        return this.http.post(`${this.baseUrl}/api/emails/templates`, request);
    }
    updateTemplate(id, request) {
        return this.http.put(`${this.baseUrl}/api/emails/templates/${id}`, request);
    }
    deleteTemplate(id) {
        return this.http.delete(`${this.baseUrl}/api/emails/templates/${id}`);
    }
    static ɵfac = function EmailDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EmailDataService, factory: EmailDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
