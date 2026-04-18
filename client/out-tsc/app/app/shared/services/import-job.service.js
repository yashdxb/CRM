import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class ImportJobService {
    http = inject(HttpClient);
    getStatus(jobId) {
        return this.http.get(`${environment.apiUrl}/api/import-jobs/${jobId}`);
    }
    static ɵfac = function ImportJobService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ImportJobService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ImportJobService, factory: ImportJobService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImportJobService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
