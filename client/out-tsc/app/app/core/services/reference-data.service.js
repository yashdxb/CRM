import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PERMISSION_KEYS } from '../auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../auth/token.utils';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class ReferenceDataService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    currencies = [
        { id: 'cur-USD', code: 'USD', name: 'US Dollar', symbol: '$', isActive: true },
        { id: 'cur-EUR', code: 'EUR', name: 'Euro', symbol: '€', isActive: true },
        { id: 'cur-GBP', code: 'GBP', name: 'British Pound', symbol: '£', isActive: true },
        { id: 'cur-CAD', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', isActive: true },
        { id: 'cur-JPY', code: 'JPY', name: 'Japanese Yen', symbol: '¥', isActive: true },
        { id: 'cur-AUD', code: 'AUD', name: 'Australian Dollar', symbol: 'A$', isActive: true },
        { id: 'cur-CHF', code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', isActive: true }
    ];
    getCurrencies() {
        const context = readTokenContext();
        if (!tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationView)) {
            return of(this.currencies.slice());
        }
        return this.http.get(`${this.baseUrl}/api/system/currencies`).pipe(catchError(() => of(this.currencies.slice())));
    }
    getPhoneTypes() {
        return this.http.get(`${this.baseUrl}/api/system/phone-types`).pipe(catchError(() => of([])));
    }
    static ɵfac = function ReferenceDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReferenceDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReferenceDataService, factory: ReferenceDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReferenceDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
