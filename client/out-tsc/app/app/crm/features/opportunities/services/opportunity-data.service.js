import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class OpportunityDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search)
            params = params.set('search', request.search);
        if (request.stage)
            params = params.set('stage', request.stage);
        if (request.accountId)
            params = params.set('accountId', request.accountId);
        if (request.missingNextStep)
            params = params.set('missingNextStep', 'true');
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/opportunities`, { params });
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/opportunities/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/opportunities/${id}`);
    }
    getHistory(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}/history`);
    }
    updateOwner(id, ownerId) {
        return this.http.patch(`${this.baseUrl}/api/opportunities/${id}/owner`, {
            ownerId
        });
    }
    updateStage(id, stage) {
        return this.http.patch(`${this.baseUrl}/api/opportunities/${id}/stage`, {
            stage
        });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}`);
    }
    getAudit(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}/audit`);
    }
    getReviewThread(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}/review-thread`);
    }
    addReviewOutcome(id, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${id}/review-outcome`, payload);
    }
    acknowledgeReview(id) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${id}/review-ack`, {});
    }
    getTeam(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}/team`);
    }
    updateTeam(id, payload) {
        return this.http.put(`${this.baseUrl}/api/opportunities/${id}/team`, payload);
    }
    getContactRoles(id) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${id}/contact-roles`);
    }
    addContactRole(id, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${id}/contact-roles`, payload);
    }
    removeContactRole(id, contactRoleId) {
        return this.http.delete(`${this.baseUrl}/api/opportunities/${id}/contact-roles/${contactRoleId}`);
    }
    getExpansionSignals() {
        return this.http.get(`${this.baseUrl}/api/opportunities/expansion-signals`);
    }
    createExpansion(opportunityId) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/expansion`, {});
    }
    getQuotes(opportunityId) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes`);
    }
    getQuote(opportunityId, quoteId) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes/${quoteId}`);
    }
    createQuote(opportunityId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes`, payload);
    }
    updateQuote(opportunityId, quoteId, payload) {
        return this.http.put(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes/${quoteId}`, payload);
    }
    submitQuoteForApproval(opportunityId, quoteId) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes/${quoteId}/submit-approval`, {});
    }
    generateQuoteProposal(opportunityId, quoteId) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes/${quoteId}/generate-proposal`, {});
    }
    sendQuoteProposal(opportunityId, quoteId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/quotes/${quoteId}/send-proposal`, payload ?? {});
    }
    getPriceLists(page = 1, pageSize = 100) {
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);
        return this.http.get(`${this.baseUrl}/api/supply-chain/price-lists`, { params });
    }
    getItemMaster() {
        const params = new HttpParams()
            .set('isActive', true)
            .set('page', 1)
            .set('pageSize', 200);
        return this.http.get(`${this.baseUrl}/api/supply-chain/item-master`, { params });
    }
    getHealthScore(opportunityId) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/health-score`);
    }
    checkDuplicates(payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/duplicate-check`, payload);
    }
    static ɵfac = function OpportunityDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OpportunityDataService, factory: OpportunityDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
