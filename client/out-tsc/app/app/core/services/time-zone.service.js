import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class TimeZoneService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    timeZones$ = this.http
        .get(`${this.baseUrl}/api/system/timezones`)
        .pipe(map((zones) => zones.map((zone) => ({
        label: zone.label,
        value: zone.ianaId,
        utcOffsetMinutes: zone.utcOffsetMinutes,
        flagCode: zone.flagCode
    }))), 
    // Cache once so every page uses the same list and avoids repeat calls.
    shareReplay({ bufferSize: 1, refCount: false }), catchError(() => of([])));
    getTimeZones() {
        return this.timeZones$;
    }
    static ɵfac = function TimeZoneService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimeZoneService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TimeZoneService, factory: TimeZoneService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimeZoneService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
