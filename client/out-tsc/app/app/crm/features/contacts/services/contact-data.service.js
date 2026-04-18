import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class ContactDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (request.accountId) {
            params = params.set('accountId', request.accountId);
        }
        if (request.tag) {
            params = params.set('tag', request.tag);
        }
        if (request.page) {
            params = params.set('page', request.page);
        }
        if (request.pageSize) {
            params = params.set('pageSize', request.pageSize);
        }
        return this.http.get(`${this.baseUrl}/api/contacts`, { params });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/api/contacts/${id}`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/contacts`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/contacts/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/contacts/${id}`);
    }
    bulkAssignOwner(ids, ownerId) {
        return this.http.post(`${this.baseUrl}/api/contacts/bulk-assign-owner`, {
            ids,
            ownerId
        });
    }
    bulkUpdateLifecycle(ids, status) {
        return this.http.post(`${this.baseUrl}/api/contacts/bulk-update-lifecycle`, {
            ids,
            status
        });
    }
    updateOwner(id, ownerId) {
        return this.http.patch(`${this.baseUrl}/api/contacts/${id}/owner`, {
            ownerId
        });
    }
    updateLifecycle(id, status) {
        return this.http.patch(`${this.baseUrl}/api/contacts/${id}/lifecycle`, {
            status
        });
    }
    importCsv(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/api/contacts/import/queue`, formData);
    }
    // C15: Duplicate detection
    checkDuplicates(request) {
        return this.http.post(`${this.baseUrl}/api/contacts/check-duplicates`, request);
    }
    // C16: Merge contacts
    mergeContacts(request) {
        return this.http.post(`${this.baseUrl}/api/contacts/merge`, request);
    }
    // C17: Tags
    getAllTags() {
        return this.http.get(`${this.baseUrl}/api/contacts/tags`);
    }
    updateTags(id, tags) {
        return this.http.put(`${this.baseUrl}/api/contacts/${id}/tags`, tags);
    }
    // C19: Relationships
    getRelationships(id) {
        return this.http.get(`${this.baseUrl}/api/contacts/${id}/relationships`);
    }
    static ɵfac = function ContactDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ContactDataService, factory: ContactDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
