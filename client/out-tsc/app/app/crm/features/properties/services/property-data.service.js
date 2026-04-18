import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class PropertyDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search)
            params = params.set('search', request.search);
        if (request.status)
            params = params.set('status', request.status);
        if (request.propertyType)
            params = params.set('propertyType', request.propertyType);
        if (request.city)
            params = params.set('city', request.city);
        if (request.accountId)
            params = params.set('accountId', request.accountId);
        if (request.contactId)
            params = params.set('contactId', request.contactId);
        if (request.sortBy)
            params = params.set('sortBy', request.sortBy);
        if (request.page)
            params = params.set('page', request.page);
        if (request.pageSize)
            params = params.set('pageSize', request.pageSize);
        return this.http.get(`${this.baseUrl}/api/properties`, { params });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/api/properties/${id}`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/properties`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/properties/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/properties/${id}`);
    }
    // Price History (X4)
    getPriceHistory(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/price-history`);
    }
    addPriceChange(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/price-history`, payload);
    }
    getTimeline(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/timeline`);
    }
    // Showings (X3)
    getShowings(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/showings`);
    }
    createShowing(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/showings`, payload);
    }
    updateShowing(propertyId, showingId, payload) {
        return this.http.put(`${this.baseUrl}/api/properties/${propertyId}/showings/${showingId}`, payload);
    }
    // Documents (X1)
    getDocuments(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/documents`);
    }
    uploadDocument(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/documents`, payload);
    }
    uploadPhoto(propertyId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/photos`, formData);
    }
    deleteDocument(propertyId, docId) {
        return this.http.delete(`${this.baseUrl}/api/properties/${propertyId}/documents/${docId}`);
    }
    // Activities (X2)
    getActivities(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/activities`);
    }
    createActivity(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/activities`, payload);
    }
    updateActivity(propertyId, activityId, payload) {
        return this.http.put(`${this.baseUrl}/api/properties/${propertyId}/activities/${activityId}`, payload);
    }
    // MLS/IDX Feeds (G1)
    getMlsFeeds() {
        return this.http.get(`${this.baseUrl}/api/properties/mls-feeds`);
    }
    createMlsFeed(payload) {
        return this.http.post(`${this.baseUrl}/api/properties/mls-feeds`, payload);
    }
    triggerMlsImport(feedId) {
        return this.http.post(`${this.baseUrl}/api/properties/mls-feeds/${feedId}/import`, {});
    }
    getMlsImportHistory() {
        return this.http.get(`${this.baseUrl}/api/properties/mls-imports`);
    }
    // Comparable Market Analysis (G3)
    getCmaReport(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/cma`);
    }
    generateCmaReport(propertyId, radiusMiles = 2) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/cma`, { radiusMiles });
    }
    // E-Signature (G4)
    getSignatureRequests(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/signatures`);
    }
    createSignatureRequest(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/signatures`, payload);
    }
    sendSignatureRequest(propertyId, signatureId) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/send`, {});
    }
    refreshSignatureStatus(propertyId, signatureId) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/refresh`, {});
    }
    voidSignatureRequest(propertyId, signatureId, reason) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/void`, { reason });
    }
    downloadSignedDocument(propertyId, signatureId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/signatures/${signatureId}/download`, {
            responseType: 'blob'
        });
    }
    // Property Alerts (G5)
    getAlertRules(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/alerts`);
    }
    createAlertRule(propertyId, payload) {
        return this.http.post(`${this.baseUrl}/api/properties/${propertyId}/alerts`, payload);
    }
    toggleAlertRule(propertyId, ruleId, isActive) {
        return this.http.put(`${this.baseUrl}/api/properties/${propertyId}/alerts/${ruleId}`, { isActive });
    }
    getAlertNotifications(propertyId) {
        return this.http.get(`${this.baseUrl}/api/properties/${propertyId}/alert-notifications`);
    }
    static ɵfac = function PropertyDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PropertyDataService, factory: PropertyDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
