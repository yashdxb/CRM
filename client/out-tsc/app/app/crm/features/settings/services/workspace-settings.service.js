import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class WorkspaceSettingsService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getSettings() {
        return this.http.get(`${this.baseUrl}/api/workspace`);
    }
    updateSettings(payload) {
        return this.http.put(`${this.baseUrl}/api/workspace`, payload);
    }
    applyVerticalPreset(payload) {
        return this.http.post(`${this.baseUrl}/api/workspace/vertical-preset`, payload);
    }
    static ɵfac = function WorkspaceSettingsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkspaceSettingsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkspaceSettingsService, factory: WorkspaceSettingsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkspaceSettingsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
