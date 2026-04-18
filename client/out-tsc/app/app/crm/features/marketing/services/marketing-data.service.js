import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class MarketingDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    searchCampaigns(request) {
        let params = new HttpParams();
        if (request.search)
            params = params.set('search', request.search);
        if (request.status)
            params = params.set('status', request.status);
        if (request.channel)
            params = params.set('channel', request.channel);
        if (request.ownerUserId)
            params = params.set('ownerUserId', request.ownerUserId);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/marketing/campaigns`, { params });
    }
    getCampaign(id) {
        return this.http.get(`${this.baseUrl}/api/marketing/campaigns/${id}`);
    }
    createCampaign(payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/campaigns`, payload);
    }
    updateCampaign(id, payload) {
        return this.http.put(`${this.baseUrl}/api/marketing/campaigns/${id}`, payload);
    }
    archiveCampaign(id) {
        return this.http.post(`${this.baseUrl}/api/marketing/campaigns/${id}/archive`, {});
    }
    addCampaignMember(campaignId, payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/members`, payload);
    }
    removeCampaignMember(campaignId, memberId) {
        return this.http.delete(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/members/${memberId}`);
    }
    getCampaignPerformance(campaignId) {
        return this.http.get(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/performance`);
    }
    getAttributionSummary(model = 'first_touch') {
        const params = new HttpParams().set('model', model);
        return this.http.get(`${this.baseUrl}/api/marketing/attribution/summary`, { params });
    }
    getCampaignHealthScore(campaignId) {
        return this.http.get(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/health-score`);
    }
    getCampaignRecommendations(campaignId) {
        return this.http.get(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/recommendations`);
    }
    applyRecommendationDecision(recommendationId, payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/recommendations/${recommendationId}/decision`, payload);
    }
    explainOpportunityAttribution(opportunityId) {
        return this.http.get(`${this.baseUrl}/api/marketing/attribution/opportunities/${opportunityId}/explain`);
    }
    getRecommendationPilotMetrics() {
        return this.http.get(`${this.baseUrl}/api/marketing/recommendations/pilot-metrics`);
    }
    trackImpactWorklistClick(payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/telemetry/impact-worklist-click`, payload);
    }
    // ── Campaign Email endpoints ──────────────────────────────────
    searchEmails(request) {
        let params = new HttpParams();
        if (request.campaignId)
            params = params.set('campaignId', request.campaignId);
        if (request.status)
            params = params.set('status', request.status);
        if (request.search)
            params = params.set('search', request.search);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/marketing/emails`, { params });
    }
    getEmail(id) {
        return this.http.get(`${this.baseUrl}/api/marketing/emails/${id}`);
    }
    createEmailDraft(payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/emails`, payload);
    }
    updateEmailDraft(id, payload) {
        return this.http.put(`${this.baseUrl}/api/marketing/emails/${id}`, payload);
    }
    sendEmail(id) {
        return this.http.post(`${this.baseUrl}/api/marketing/emails/${id}/send`, {});
    }
    scheduleEmail(id, payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/emails/${id}/schedule`, payload);
    }
    cancelEmail(id) {
        return this.http.post(`${this.baseUrl}/api/marketing/emails/${id}/cancel`, {});
    }
    getEmailRecipients(emailId, request = {}) {
        let params = new HttpParams();
        if (request.status)
            params = params.set('status', request.status);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/marketing/emails/${emailId}/recipients`, { params });
    }
    getEmailPreference(email) {
        return this.http.get(`${this.baseUrl}/api/marketing/email-preferences/${encodeURIComponent(email)}`);
    }
    updateEmailPreference(email, payload) {
        return this.http.put(`${this.baseUrl}/api/marketing/email-preferences/${encodeURIComponent(email)}`, payload);
    }
    publicUnsubscribe(payload) {
        return this.http.post(`${this.baseUrl}/api/marketing/public/unsubscribe`, payload);
    }
    static ɵfac = function MarketingDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MarketingDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MarketingDataService, factory: MarketingDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarketingDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
