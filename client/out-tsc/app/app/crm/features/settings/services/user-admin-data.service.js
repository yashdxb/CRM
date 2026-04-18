import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class UserAdminDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    search(request) {
        let params = new HttpParams();
        if (request.search) {
            params = params.set('search', request.search);
        }
        if (typeof request.includeInactive === 'boolean') {
            params = params.set('includeInactive', String(request.includeInactive));
        }
        if (request.page) {
            params = params.set('page', String(request.page));
        }
        if (request.pageSize) {
            params = params.set('pageSize', String(request.pageSize));
        }
        return this.http.get(`${this.baseUrl}/api/users`, { params });
    }
    lookupActive(search, max = 200) {
        let params = new HttpParams();
        if (search) {
            params = params.set('search', search);
        }
        if (max) {
            params = params.set('max', String(max));
        }
        return this.http.get(`${this.baseUrl}/api/users/lookup`, { params });
    }
    getUser(id) {
        return this.http.get(`${this.baseUrl}/api/users/${id}`);
    }
    getRoles() {
        return this.http.get(`${this.baseUrl}/api/roles`);
    }
    getRole(id) {
        return this.http.get(`${this.baseUrl}/api/roles/${id}`);
    }
    getPermissionCatalog() {
        return this.http
            .get(`${this.baseUrl}/api/roles/permissions`)
            .pipe(map((definitions) => definitions.map((definition) => ({
            key: definition.key ?? definition.Key ?? '',
            label: definition.label ??
                definition.Label ??
                definition.key ??
                definition.Key ??
                '',
            description: definition.description ?? definition.Description ?? '',
            capability: definition.capability ?? definition.Capability ?? 'General'
        }))));
    }
    getRoleIntentPacks() {
        return this.http.get(`${this.baseUrl}/api/roles/intent-packs`);
    }
    getPermissionPackPresets() {
        return this.http.get(`${this.baseUrl}/api/roles/permission-packs`);
    }
    getSecurityLevels() {
        return this.http.get(`${this.baseUrl}/api/security-levels`);
    }
    createSecurityLevel(payload) {
        return this.http.post(`${this.baseUrl}/api/security-levels`, payload);
    }
    updateSecurityLevel(id, payload) {
        return this.http.put(`${this.baseUrl}/api/security-levels/${id}`, payload);
    }
    deleteSecurityLevel(id) {
        return this.http.delete(`${this.baseUrl}/api/security-levels/${id}`);
    }
    createRole(payload) {
        return this.http.post(`${this.baseUrl}/api/roles`, payload);
    }
    updateRole(id, payload) {
        return this.http.put(`${this.baseUrl}/api/roles/${id}`, payload);
    }
    deleteRole(id) {
        return this.http.delete(`${this.baseUrl}/api/roles/${id}`);
    }
    create(payload) {
        return this.http.post(`${this.baseUrl}/api/users`, payload);
    }
    update(id, payload) {
        return this.http.put(`${this.baseUrl}/api/users/${id}`, payload);
    }
    resetPassword(id, payload) {
        return this.http.post(`${this.baseUrl}/api/users/${id}/reset-password`, payload);
    }
    resendInvite(id) {
        return this.http.post(`${this.baseUrl}/api/users/${id}/resend-invite`, {});
    }
    activate(id) {
        return this.http.post(`${this.baseUrl}/api/users/${id}/activate`, {});
    }
    deactivate(id) {
        return this.http.post(`${this.baseUrl}/api/users/${id}/deactivate`, {});
    }
    getDashboardPackOptions() {
        return this.http.get(`${this.baseUrl}/api/users/dashboard-packs/options`);
    }
    updateDashboardPack(id, payload) {
        return this.http.put(`${this.baseUrl}/api/users/${id}/dashboard-pack`, payload);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/users/${id}`);
    }
    uploadProfilePicture(userId, file) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/api/users/${userId}/profile-picture`, formData);
    }
    deleteProfilePicture(userId) {
        return this.http.delete(`${this.baseUrl}/api/users/${userId}/profile-picture`);
    }
    static ɵfac = function UserAdminDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserAdminDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserAdminDataService, factory: UserAdminDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserAdminDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
