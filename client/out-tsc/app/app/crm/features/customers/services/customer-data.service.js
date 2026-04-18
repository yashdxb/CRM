import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class CustomerDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (request.status) {
            params = params.set('status', request.status);
        }
        if (request.page) {
            params = params.set('page', request.page);
        }
        if (request.pageSize) {
            params = params.set('pageSize', request.pageSize);
        }
        if (request.sortBy) {
            params = params.set('sortBy', request.sortBy);
        }
        if (request.sortDirection) {
            params = params.set('sortDirection', request.sortDirection);
        }
        if (request.industry) {
            params = params.set('industry', request.industry);
        }
        if (request.territory) {
            params = params.set('territory', request.territory);
        }
        if (request.ownerId) {
            params = params.set('ownerId', request.ownerId);
        }
        if (request.createdFrom) {
            params = params.set('createdFrom', request.createdFrom);
        }
        if (request.createdTo) {
            params = params.set('createdTo', request.createdTo);
        }
        if (request.minRevenue != null) {
            params = params.set('minRevenue', request.minRevenue);
        }
        if (request.maxRevenue != null) {
            params = params.set('maxRevenue', request.maxRevenue);
        }
        return this.http.get(`${this.baseUrl}/api/customers`, { params });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}`);
    }
    getDetail(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/detail`);
    }
    getRelatedAccounts(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/related-accounts`);
    }
    getTeamMembers(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/team-members`);
    }
    addTeamMember(id, userId, role) {
        return this.http.post(`${this.baseUrl}/api/customers/${id}/team-members`, { userId, role });
    }
    removeTeamMember(id, memberId) {
        return this.http.delete(`${this.baseUrl}/api/customers/${id}/team-members/${memberId}`);
    }
    getContactRoles(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/contact-roles`);
    }
    addContactRole(id, payload) {
        return this.http.post(`${this.baseUrl}/api/customers/${id}/contact-roles`, payload);
    }
    removeContactRole(id, contactRoleId) {
        return this.http.delete(`${this.baseUrl}/api/customers/${id}/contact-roles/${contactRoleId}`);
    }
    getRelatedRecords(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/related-records`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/customers`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/customers/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/customers/${id}`);
    }
    bulkAssignOwner(ids, ownerId) {
        return this.http.post(`${this.baseUrl}/api/customers/bulk-assign-owner`, {
            ids,
            ownerId
        });
    }
    bulkUpdateLifecycle(ids, status) {
        return this.http.post(`${this.baseUrl}/api/customers/bulk-update-lifecycle`, {
            ids,
            status
        });
    }
    updateOwner(id, ownerId) {
        return this.http.patch(`${this.baseUrl}/api/customers/${id}/owner`, {
            ownerId
        });
    }
    updateLifecycle(id, status) {
        return this.http.patch(`${this.baseUrl}/api/customers/${id}/lifecycle`, {
            status
        });
    }
    importCsv(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/api/customers/import/queue`, formData);
    }
    checkDuplicate(params) {
        return this.http.post(`${this.baseUrl}/api/customers/check-duplicate`, params);
    }
    findDuplicates(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/duplicates`);
    }
    mergeAccounts(survivorId, request) {
        return this.http.post(`${this.baseUrl}/api/customers/${survivorId}/merge`, request);
    }
    getHierarchy(id) {
        return this.http.get(`${this.baseUrl}/api/customers/${id}/hierarchy`);
    }
    getTimeline(id, take = 50) {
        const params = new HttpParams().set('take', take);
        return this.http.get(`${this.baseUrl}/api/customers/${id}/timeline`, { params });
    }
    static ɵfac = function CustomerDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomerDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CustomerDataService, factory: CustomerDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomerDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
