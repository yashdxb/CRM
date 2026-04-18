import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class NotificationPreferencesService {
    http = inject(HttpClient);
    getPreferences() {
        return this.http.get(`${environment.apiUrl}/api/notifications/preferences`);
    }
    updatePreferences(preferences) {
        return this.http.put(`${environment.apiUrl}/api/notifications/preferences`, preferences);
    }
    static ɵfac = function NotificationPreferencesService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationPreferencesService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationPreferencesService, factory: NotificationPreferencesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationPreferencesService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
