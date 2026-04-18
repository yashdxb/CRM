import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class OpportunityApprovalService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    getForOpportunity(opportunityId) {
        return this.http.get(`${this.baseUrl}/api/opportunities/${opportunityId}/approvals`);
    }
    getInbox(status, purpose) {
        const params = {};
        if (status)
            params['status'] = status;
        if (purpose)
            params['purpose'] = purpose;
        return this.http.get(`${this.baseUrl}/api/decisions/inbox`, { params }).pipe(
        // Keep the existing UI model stable while backend transitions to generic decision contracts.
        map((items) => (items ?? []).map((item) => this.mapDecisionInboxItem(item))));
    }
    requestApproval(opportunityId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/approvals`, payload);
    }
    requestApprovalViaDecisionEngine(opportunityId, payload) {
        const request = {
            decisionType: 'OpportunityApproval',
            workflowType: 'OpportunityApproval',
            entityType: 'Opportunity',
            entityId: opportunityId,
            entityName: payload.opportunityName,
            parentEntityName: payload.accountName ?? null,
            purpose: payload.purpose ?? 'Close',
            amount: payload.amount,
            currency: payload.currency ?? 'USD',
            status: 'Submitted',
            policyReason: (payload.purpose ?? 'Close') === 'Discount'
                ? 'Discount exception requires approval.'
                : 'Opportunity close approval required.',
            businessImpactLabel: 'commercial approval'
        };
        return this.http
            .post(`${this.baseUrl}/api/decisions/requests`, request)
            .pipe(map((item) => this.mapDecisionInboxItemToApproval(item)));
    }
    requestStageOverrideDecision(opportunityId, payload) {
        return this.http.post(`${this.baseUrl}/api/opportunities/${opportunityId}/stage-override-request`, {
            requestedStage: payload.requestedStage,
            blockerReason: payload.blockerReason,
            notes: payload.notes ?? null
        });
    }
    decide(approvalId, payload) {
        return this.http.patch(`${this.baseUrl}/api/opportunity-approvals/${approvalId}`, payload);
    }
    decideDecision(decisionId, payload) {
        return this.http.patch(`${this.baseUrl}/api/decisions/${decisionId}/decision`, payload).pipe(map((item) => this.mapDecisionInboxItem(item)));
    }
    requestDecisionInfo(decisionId, notes) {
        return this.http.post(`${this.baseUrl}/api/decisions/${decisionId}/request-info`, { notes: notes ?? null }).pipe(map((item) => this.mapDecisionInboxItem(item)));
    }
    delegateDecision(decisionId, payload) {
        return this.http.post(`${this.baseUrl}/api/decisions/${decisionId}/delegate`, {
            delegateUserId: payload.delegateUserId,
            delegateUserName: payload.delegateUserName ?? null,
            notes: payload.notes ?? null
        }).pipe(map((item) => this.mapDecisionInboxItem(item)));
    }
    escalateDecision(decisionId, payload) {
        return this.http.post(`${this.baseUrl}/api/decisions/${decisionId}/escalate`, {
            notes: payload?.notes ?? null
        }).pipe(map((item) => this.mapDecisionInboxItem(item)));
    }
    generateDecisionAssistDraft(decisionId) {
        return this.http.post(`${this.baseUrl}/api/decisions/${decisionId}/assist-draft`, {});
    }
    getDecisionHistory(filters) {
        const params = {};
        if (filters?.action)
            params['action'] = filters.action;
        if (filters?.status)
            params['status'] = filters.status;
        if (filters?.decisionType)
            params['decisionType'] = filters.decisionType;
        if (filters?.search)
            params['search'] = filters.search;
        if (filters?.decisionId)
            params['decisionId'] = filters.decisionId;
        if (typeof filters?.take === 'number')
            params['take'] = String(filters.take);
        return this.http.get(`${this.baseUrl}/api/decisions/history`, { params });
    }
    mapDecisionInboxItem(item) {
        return {
            id: item.id,
            opportunityId: item.entityId,
            opportunityName: item.entityName,
            accountName: item.parentEntityName ?? '—',
            status: item.status ?? 'Pending',
            purpose: item.purpose,
            approverRole: item.stepRole ?? item.steps?.find((step) => step.stepOrder === item.currentStepOrder)?.approverRole ?? 'Approver',
            approvalChainId: null,
            stepOrder: item.currentStepOrder,
            totalSteps: item.totalSteps,
            chainStatus: item.chainStatus ?? item.status,
            approverUserId: item.assigneeUserId,
            approverName: item.assigneeName,
            requestedByUserId: item.requestedByUserId,
            requestedByName: item.requestedByName,
            requestedOn: item.requestedOn,
            decisionOn: item.decisionOn,
            notes: item.notes,
            amount: item.amount,
            currency: item.currency,
            workflowExecutionId: item.workflowExecutionId ?? null,
            workflowStepNodeId: item.workflowStepNodeId ?? null,
            workflowStepOrder: item.workflowStepOrder ?? item.currentStepOrder,
            workflowName: item.workflowName ?? null,
            workflowVersion: item.workflowVersion ?? null,
            workflowDealId: item.workflowDealId ?? item.entityId,
            workflowDealName: item.workflowDealName ?? item.entityName,
            decisionType: item.decisionType,
            priority: item.priority,
            riskLevel: item.riskLevel,
            slaStatus: item.slaStatus,
            slaDueAtUtc: item.slaDueAtUtc,
            isEscalated: item.isEscalated,
            requestedAgeHours: item.requestedAgeHours,
            policyReason: item.policyReason,
            businessImpactLabel: item.businessImpactLabel
        };
    }
    mapDecisionInboxItemToApproval(item) {
        return {
            id: item.id,
            opportunityId: item.entityId,
            status: item.status ?? 'Pending',
            purpose: item.purpose,
            approverRole: item.stepRole ??
                item.steps?.find((step) => step.stepOrder === item.currentStepOrder)?.approverRole ??
                'Approver',
            approvalChainId: null,
            stepOrder: item.currentStepOrder,
            totalSteps: item.totalSteps,
            chainStatus: item.chainStatus ?? item.status,
            approverUserId: item.assigneeUserId,
            approverName: item.assigneeName,
            requestedByUserId: item.requestedByUserId,
            requestedByName: item.requestedByName,
            requestedOn: item.requestedOn,
            decisionOn: item.decisionOn,
            notes: item.notes,
            amount: item.amount,
            currency: item.currency
        };
    }
    static ɵfac = function OpportunityApprovalService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityApprovalService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: OpportunityApprovalService, factory: OpportunityApprovalService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityApprovalService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
