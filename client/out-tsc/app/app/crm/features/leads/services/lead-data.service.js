import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class LeadDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search)
            params = params.set('search', request.search);
        if (request.status)
            params = params.set('status', request.status);
        if (request.conversationView)
            params = params.set('conversationView', request.conversationView);
        if (request.sortBy)
            params = params.set('sortBy', request.sortBy);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/leads`, { params });
    }
    get(id) {
        return this.http.get(`${this.baseUrl}/api/leads/${id}`);
    }
    getDispositionReport() {
        return this.http.get(`${this.baseUrl}/api/leads/disposition-report`);
    }
    getStatusHistory(id) {
        return this.http.get(`${this.baseUrl}/api/leads/${id}/status-history`);
    }
    getAudit(id) {
        return this.http.get(`${this.baseUrl}/api/leads/${id}/audit`);
    }
    getCadenceTouches(id) {
        return this.http.get(`${this.baseUrl}/api/leads/${id}/cadence-touches`);
    }
    getCadenceChannels() {
        return this.http.get(`${this.baseUrl}/api/leads/cadence-channels`);
    }
    getEvidenceSources() {
        return this.http.get(`${this.baseUrl}/api/leads/evidence-sources`);
    }
    getQualificationPolicy() {
        return this.http.get(`${this.baseUrl}/api/leads/qualification-policy`);
    }
    checkDuplicates(payload) {
        return this.http.post(`${this.baseUrl}/api/leads/duplicate-check`, payload);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/leads`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/leads/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/leads/${id}`);
    }
    bulkAssignOwner(ids, ownerId) {
        return this.http.post(`${this.baseUrl}/api/leads/bulk-assign-owner`, {
            ids,
            ownerId
        });
    }
    bulkUpdateStatus(ids, status) {
        return this.http.post(`${this.baseUrl}/api/leads/bulk-update-status`, {
            ids,
            status
        });
    }
    updateOwner(id, ownerId) {
        return this.http.patch(`${this.baseUrl}/api/leads/${id}/owner`, {
            ownerId
        });
    }
    updateStatus(id, status) {
        return this.http.patch(`${this.baseUrl}/api/leads/${id}/status`, {
            status
        });
    }
    recycleToNurture(id) {
        return this.http.post(`${this.baseUrl}/api/leads/${id}/recycle-to-nurture`, {});
    }
    logCadenceTouch(id, payload) {
        return this.http.post(`${this.baseUrl}/api/leads/${id}/cadence-touch`, payload);
    }
    getLeadEmails(id, page = 1, pageSize = 10) {
        const params = new HttpParams()
            .set('relatedEntityType', 'Lead')
            .set('relatedEntityId', id)
            .set('page', page)
            .set('pageSize', pageSize);
        return this.http.get(`${this.baseUrl}/api/emails`, { params });
    }
    aiScore(id) {
        return this.http.post(`${this.baseUrl}/api/leads/${id}/ai-score`, {});
    }
    generateConversationSummary(id) {
        return this.http.post(`${this.baseUrl}/api/leads/${id}/conversation-summary`, {});
    }
    convert(id, payload) {
        return this.http.post(`${this.baseUrl}/api/leads/${id}/convert`, payload);
    }
    importCsv(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/api/leads/import/queue`, formData);
    }
    static ɵfac = function LeadDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LeadDataService, factory: LeadDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
