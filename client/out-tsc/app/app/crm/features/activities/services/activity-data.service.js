import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class ActivityDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.status) {
            params = params.set('status', request.status);
        }
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (request.type) {
            params = params.set('type', request.type);
        }
        if (request.page) {
            params = params.set('page', request.page);
        }
        if (request.pageSize) {
            params = params.set('pageSize', request.pageSize);
        }
        if (request.ownerId) {
            params = params.set('ownerId', request.ownerId);
        }
        if (request.relatedEntityType) {
            params = params.set('relatedEntityType', request.relatedEntityType);
        }
        if (request.relatedEntityId) {
            params = params.set('relatedEntityId', request.relatedEntityId);
        }
        return this.http.get(`${this.baseUrl}/api/activities`, { params });
    }
    get(id) {
        return this.http.get(`${this.baseUrl}/api/activities/${id}`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/activities`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/activities/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/activities/${id}`);
    }
    static ɵfac = function ActivityDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActivityDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ActivityDataService, factory: ActivityDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
