import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class WorkflowDefinitionService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    workflowKey = 'deal-approval';
    legacyUrl = `${this.baseUrl}/api/workflows/deal-approval`;
    getRoleOptions() {
        return this.http.get(`${this.baseUrl}/api/roles`);
    }
    getSecurityLevelOptions() {
        return this.http.get(`${this.baseUrl}/api/security-levels`);
    }
    getScopeMetadata() {
        return this.http.get(`${this.baseUrl}/api/workflows/definitions/${this.workflowKey}/metadata`);
    }
    getDealApprovalDefinition() {
        return this.http
            .get(`${this.baseUrl}/api/workflows/definitions/${this.workflowKey}`)
            .pipe(map((response) => {
            const parsed = this.parseDefinitionJson(response.definitionJson);
            return {
                definition: parsed,
                isActive: response.isActive,
                updatedAtUtc: response.updatedAtUtc,
                publishedDefinitionJson: response.publishedDefinitionJson ?? null,
                publishedAtUtc: response.publishedAtUtc ?? null,
                publishedBy: response.publishedBy ?? null
            };
        }), catchError(() => {
            return this.http.get(this.legacyUrl).pipe(map((definition) => ({
                definition,
                isActive: definition.enabled,
                updatedAtUtc: null,
                publishedDefinitionJson: null,
                publishedAtUtc: null,
                publishedBy: null
            })), catchError((legacyError) => throwError(() => legacyError)));
        }));
    }
    saveDealApprovalDefinition(definition, isActive, operation) {
        return this.http.put(`${this.baseUrl}/api/workflows/definitions/${this.workflowKey}`, {
            definitionJson: JSON.stringify(definition),
            isActive,
            operation
        }).pipe(catchError((error) => {
            if (error?.status !== 404) {
                return throwError(() => error);
            }
            return this.http.put(this.legacyUrl, {
                ...definition,
                enabled: isActive
            }).pipe(map((legacy) => ({
                key: this.workflowKey,
                name: 'Deal Approval',
                isActive: legacy.enabled,
                definitionJson: JSON.stringify(legacy),
                updatedAtUtc: null,
                publishedDefinitionJson: null,
                publishedAtUtc: null,
                publishedBy: null
            })));
        }));
    }
    validateDealApprovalDefinition(definition) {
        return this.http.post(`${this.baseUrl}/api/workflows/definitions/${this.workflowKey}/validate`, {
            definitionJson: JSON.stringify(definition),
            isActive: definition.enabled
        }).pipe(catchError((error) => {
            if (error?.status !== 404) {
                return throwError(() => error);
            }
            const hasApprovalStep = (definition.steps ?? []).some((step) => (step.approverRole ?? '').trim().length > 0);
            if (definition.enabled && !hasApprovalStep) {
                return of({
                    isValid: false,
                    errors: ['At least one approval step with approver role is required.']
                });
            }
            return of({
                isValid: true,
                errors: []
            });
        }));
    }
    parseDefinitionJson(raw) {
        if (typeof raw === 'string') {
            return JSON.parse(raw);
        }
        if (raw && typeof raw === 'object') {
            return raw;
        }
        throw new Error('Workflow definition payload is not valid JSON.');
    }
    static ɵfac = function WorkflowDefinitionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowDefinitionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WorkflowDefinitionService, factory: WorkflowDefinitionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowDefinitionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
