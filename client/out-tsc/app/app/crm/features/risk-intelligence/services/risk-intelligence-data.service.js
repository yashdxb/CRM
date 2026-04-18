import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, of, retry, switchMap, take, timeout, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { readTokenContext } from '../../../../core/auth/token.utils';
import * as i0 from "@angular/core";
function retryTransient() {
    return (source) => source.pipe(retry({
        count: 3,
        delay: (error, retryIndex) => {
            const status = error?.status ?? 0;
            if (status === 0 || status === 401 || status === 403 || status === 502 || status === 503 || status === 504) {
                return timer(retryIndex * 2000);
            }
            throw error;
        }
    }));
}
function waitForAuthContext() {
    return timer(0, 200).pipe(filter(() => !!readTokenContext()?.token), take(1), timeout({ first: 1500, with: () => of(0) }), map(() => void 0));
}
export class RiskIntelligenceDataService {
    http = inject(HttpClient);
    getWorkspace() {
        return waitForAuthContext().pipe(switchMap(() => this.http
            .get(`${environment.apiUrl}/api/risk-intelligence/workspace`)
            .pipe(retryTransient())));
    }
    static ɵfac = function RiskIntelligenceDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RiskIntelligenceDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RiskIntelligenceDataService, factory: RiskIntelligenceDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskIntelligenceDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
