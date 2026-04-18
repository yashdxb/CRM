import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
// ── Service ──
export class LookupDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    // ── Lead Statuses ──
    getLeadStatuses() {
        return this.http.get(`${this.baseUrl}/api/lookups/lead-statuses`);
    }
    createLeadStatus(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/lead-statuses`, body);
    }
    updateLeadStatus(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/lead-statuses/${id}`, body);
    }
    deleteLeadStatus(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/lead-statuses/${id}`);
    }
    reorderLeadStatuses(orderedIds) {
        return this.http.post(`${this.baseUrl}/api/lookups/lead-statuses/reorder`, { orderedIds });
    }
    // ── Opportunity Stages ──
    getOpportunityStages() {
        return this.http.get(`${this.baseUrl}/api/lookups/opportunity-stages`);
    }
    createOpportunityStage(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/opportunity-stages`, body);
    }
    updateOpportunityStage(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/opportunity-stages/${id}`, body);
    }
    deleteOpportunityStage(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/opportunity-stages/${id}`);
    }
    reorderOpportunityStages(orderedIds) {
        return this.http.post(`${this.baseUrl}/api/lookups/opportunity-stages/reorder`, { orderedIds });
    }
    // ── Currencies ──
    getCurrencies(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/currencies`, { params });
    }
    createCurrency(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/currencies`, body);
    }
    updateCurrency(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/currencies/${id}`, body);
    }
    deleteCurrency(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/currencies/${id}`);
    }
    // ── Phone Types ──
    getPhoneTypes(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/phone-types`, { params });
    }
    createPhoneType(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/phone-types`, body);
    }
    updatePhoneType(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/phone-types/${id}`, body);
    }
    deletePhoneType(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/phone-types/${id}`);
    }
    // ── Cadence Channels ──
    getCadenceChannels(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/cadence-channels`, { params });
    }
    createCadenceChannel(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/cadence-channels`, body);
    }
    updateCadenceChannel(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/cadence-channels/${id}`, body);
    }
    deleteCadenceChannel(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/cadence-channels/${id}`);
    }
    reorderCadenceChannels(orderedIds) {
        return this.http.post(`${this.baseUrl}/api/lookups/cadence-channels/reorder`, { orderedIds });
    }
    // ── Account Types ──
    getAccountTypes(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/account-types`, { params });
    }
    createAccountType(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/account-types`, body);
    }
    updateAccountType(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/account-types/${id}`, body);
    }
    deleteAccountType(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/account-types/${id}`);
    }
    // ── Account Sources ──
    getAccountSources(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/account-sources`, { params });
    }
    createAccountSource(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/account-sources`, body);
    }
    updateAccountSource(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/account-sources/${id}`, body);
    }
    deleteAccountSource(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/account-sources/${id}`);
    }
    // ── Customer Ratings ──
    getCustomerRatings(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/customer-ratings`, { params });
    }
    createCustomerRating(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/customer-ratings`, body);
    }
    updateCustomerRating(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/customer-ratings/${id}`, body);
    }
    deleteCustomerRating(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/customer-ratings/${id}`);
    }
    // ── Contact Buying Roles ──
    getContactBuyingRoles(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/contact-buying-roles`, { params });
    }
    createContactBuyingRole(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/contact-buying-roles`, body);
    }
    updateContactBuyingRole(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/contact-buying-roles/${id}`, body);
    }
    deleteContactBuyingRole(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/contact-buying-roles/${id}`);
    }
    // ── Activity Types ──
    getActivityTypes(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/activity-types`, { params });
    }
    createActivityType(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/activity-types`, body);
    }
    updateActivityType(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/activity-types/${id}`, body);
    }
    deleteActivityType(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/activity-types/${id}`);
    }
    // ── Activity Priorities ──
    getActivityPriorities(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/activity-priorities`, { params });
    }
    createActivityPriority(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/activity-priorities`, body);
    }
    updateActivityPriority(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/activity-priorities/${id}`, body);
    }
    deleteActivityPriority(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/activity-priorities/${id}`);
    }
    // ── Helpdesk Case Statuses ──
    getHelpdeskCaseStatuses(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/helpdesk-case-statuses`, { params });
    }
    createHelpdeskCaseStatus(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/helpdesk-case-statuses`, body);
    }
    updateHelpdeskCaseStatus(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/helpdesk-case-statuses/${id}`, body);
    }
    deleteHelpdeskCaseStatus(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/helpdesk-case-statuses/${id}`);
    }
    // ── Helpdesk Priorities ──
    getHelpdeskPriorities(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/helpdesk-priorities`, { params });
    }
    createHelpdeskPriority(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/helpdesk-priorities`, body);
    }
    updateHelpdeskPriority(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/helpdesk-priorities/${id}`, body);
    }
    deleteHelpdeskPriority(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/helpdesk-priorities/${id}`);
    }
    // ── Helpdesk Severities ──
    getHelpdeskSeverities(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/helpdesk-severities`, { params });
    }
    createHelpdeskSeverity(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/helpdesk-severities`, body);
    }
    updateHelpdeskSeverity(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/helpdesk-severities/${id}`, body);
    }
    deleteHelpdeskSeverity(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/helpdesk-severities/${id}`);
    }
    // ── Helpdesk Sources ──
    getHelpdeskSources(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/helpdesk-sources`, { params });
    }
    createHelpdeskSource(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/helpdesk-sources`, body);
    }
    updateHelpdeskSource(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/helpdesk-sources/${id}`, body);
    }
    deleteHelpdeskSource(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/helpdesk-sources/${id}`);
    }
    // ── Property Statuses ──
    getPropertyStatuses(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/property-statuses`, { params });
    }
    createPropertyStatus(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/property-statuses`, body);
    }
    updatePropertyStatus(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/property-statuses/${id}`, body);
    }
    deletePropertyStatus(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/property-statuses/${id}`);
    }
    // ── Property Types ──
    getPropertyTypes(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/property-types`, { params });
    }
    createPropertyType(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/property-types`, body);
    }
    updatePropertyType(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/property-types/${id}`, body);
    }
    deletePropertyType(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/property-types/${id}`);
    }
    // ── Deal Types ──
    getDealTypes(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/deal-types`, { params });
    }
    createDealType(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/deal-types`, body);
    }
    updateDealType(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/deal-types/${id}`, body);
    }
    deleteDealType(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/deal-types/${id}`);
    }
    // ── Deal Segments ──
    getDealSegments(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/deal-segments`, { params });
    }
    createDealSegment(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/deal-segments`, body);
    }
    updateDealSegment(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/deal-segments/${id}`, body);
    }
    deleteDealSegment(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/deal-segments/${id}`);
    }
    // ── Document Categories ──
    getDocumentCategories(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/document-categories`, { params });
    }
    createDocumentCategory(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/document-categories`, body);
    }
    updateDocumentCategory(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/document-categories/${id}`, body);
    }
    deleteDocumentCategory(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/document-categories/${id}`);
    }
    // ── Lead Disqualification Reasons ──
    getLeadDisqualificationReasons(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/lead-disqualification-reasons`, { params });
    }
    createLeadDisqualificationReason(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/lead-disqualification-reasons`, body);
    }
    updateLeadDisqualificationReason(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/lead-disqualification-reasons/${id}`, body);
    }
    deleteLeadDisqualificationReason(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/lead-disqualification-reasons/${id}`);
    }
    // ── Lead Loss Reasons ──
    getLeadLossReasons(includeInactive = false) {
        const params = new HttpParams().set('includeInactive', includeInactive);
        return this.http.get(`${this.baseUrl}/api/lookups/lead-loss-reasons`, { params });
    }
    createLeadLossReason(body) {
        return this.http.post(`${this.baseUrl}/api/lookups/lead-loss-reasons`, body);
    }
    updateLeadLossReason(id, body) {
        return this.http.put(`${this.baseUrl}/api/lookups/lead-loss-reasons/${id}`, body);
    }
    deleteLeadLossReason(id) {
        return this.http.delete(`${this.baseUrl}/api/lookups/lead-loss-reasons/${id}`);
    }
    static ɵfac = function LookupDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LookupDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LookupDataService, factory: LookupDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LookupDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
