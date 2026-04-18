import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class HelpDeskDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    searchCases(request) {
        let params = new HttpParams();
        if (request.search)
            params = params.set('search', request.search);
        if (request.status)
            params = params.set('status', request.status);
        if (request.priority)
            params = params.set('priority', request.priority);
        if (request.severity)
            params = params.set('severity', request.severity);
        if (request.queueId)
            params = params.set('queueId', request.queueId);
        if (request.ownerUserId)
            params = params.set('ownerUserId', request.ownerUserId);
        if (request.source)
            params = params.set('source', request.source);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/helpdesk/cases`, { params });
    }
    getCase(id) {
        return this.http.get(`${this.baseUrl}/api/helpdesk/cases/${id}`);
    }
    createCase(payload) {
        return this.http.post(`${this.baseUrl}/api/helpdesk/cases`, payload);
    }
    updateCase(id, payload) {
        return this.http.put(`${this.baseUrl}/api/helpdesk/cases/${id}`, payload);
    }
    assignCase(id, queueId, ownerUserId) {
        return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/assign`, { queueId, ownerUserId });
    }
    updateStatus(id, status, note) {
        return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/status`, { status, note });
    }
    addComment(id, body, isInternal = true, attachmentIds = []) {
        return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/comments`, { body, isInternal, attachmentIds });
    }
    listQueues() {
        return this.http.get(`${this.baseUrl}/api/helpdesk/queues`);
    }
    lookupActiveUsers(search, max = 200) {
        let params = new HttpParams();
        if (search)
            params = params.set('search', search);
        if (max)
            params = params.set('max', String(max));
        return this.http.get(`${this.baseUrl}/api/users/lookup`, { params });
    }
    createQueue(payload) {
        return this.http.post(`${this.baseUrl}/api/helpdesk/queues`, payload);
    }
    updateQueue(id, payload) {
        return this.http.put(`${this.baseUrl}/api/helpdesk/queues/${id}`, payload);
    }
    listSlaPolicies() {
        return this.http.get(`${this.baseUrl}/api/helpdesk/sla-policies`);
    }
    updateSlaPolicy(id, payload) {
        return this.http.put(`${this.baseUrl}/api/helpdesk/sla-policies/${id}`, payload);
    }
    getSummary() {
        return this.http.get(`${this.baseUrl}/api/helpdesk/reports/summary`);
    }
    static ɵfac = function HelpDeskDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpDeskDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HelpDeskDataService, factory: HelpDeskDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDeskDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
