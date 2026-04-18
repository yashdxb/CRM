import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, timeout } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class ReportsDataService {
    http = inject(HttpClient);
    getPipelineByStage() {
        const url = `${environment.apiUrl}/api/reports/pipeline-by-stage`;
        const empty = {
            generatedAtUtc: new Date().toISOString(),
            totalOpenOpportunities: 0,
            totalPipelineValue: 0,
            stages: []
        };
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load pipeline-by-stage report', err);
            return of(empty);
        }));
    }
    getEmbedConfig() {
        const url = `${environment.apiUrl}/api/reports/embed-config`;
        const empty = {
            enabled: false,
            provider: 'telerik-rest-service',
            serviceUrl: null,
            pipelineByStageReportSource: null
        };
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load embed config', err);
            return of(empty);
        }));
    }
    getReportServerConfig() {
        const url = `${environment.apiUrl}/api/report-server/config`;
        const empty = { enabled: false };
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load report server config', err);
            return of(empty);
        }));
    }
    getReportServerToken() {
        const url = `${environment.apiUrl}/api/report-server/token`;
        return this.http.post(url, null);
    }
    getReportCatalog() {
        const url = `${environment.apiUrl}/api/report-server/catalog`;
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load report catalog', err);
            return of([]);
        }));
    }
    getReportLibrary() {
        const url = `${environment.apiUrl}/api/report-server/library`;
        return this.http.get(url).pipe(timeout(8000), catchError((err) => {
            console.error('Failed to load report library', err);
            return of([]);
        }));
    }
    getReportCategories() {
        const url = `${environment.apiUrl}/api/report-server/categories`;
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load report categories', err);
            return of([]);
        }));
    }
    getReportParameterOptions(reportId, parameterName) {
        const encodedReportId = encodeURIComponent(reportId);
        const encodedParameterName = encodeURIComponent(parameterName);
        const url = `${environment.apiUrl}/api/report-server/reports/${encodedReportId}/parameters/${encodedParameterName}/options`;
        return this.http.get(url).pipe(catchError((err) => {
            console.error('Failed to load report parameter options', err);
            return of([]);
        }));
    }
    static ɵfac = function ReportsDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReportsDataService, factory: ReportsDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
