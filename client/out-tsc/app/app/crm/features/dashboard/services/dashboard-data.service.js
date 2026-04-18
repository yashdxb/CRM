import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, retry, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
/** Retry transient failures (0 = network error, 502, 503, 504) up to 2 times with exponential backoff. */
function retryTransient() {
    return (source) => source.pipe(retry({
        count: 2,
        delay: (error, retryIndex) => {
            const status = error?.status ?? 0;
            if (status === 0 || status === 502 || status === 503 || status === 504) {
                return timer(retryIndex * 2000);
            }
            throw error;
        }
    }));
}
export class DashboardDataService {
    http = inject(HttpClient);
    getSummary(period, fromUtc, toUtc) {
        const url = `${environment.apiUrl}/api/dashboard/summary`;
        let params = new HttpParams();
        if (period) {
            params = params.set('period', period);
        }
        if (fromUtc) {
            params = params.set('fromUtc', fromUtc);
        }
        if (toUtc) {
            params = params.set('toUtc', toUtc);
        }
        const empty = {
            totalCustomers: 0,
            leads: 0,
            prospects: 0,
            activeCustomers: 0,
            openOpportunities: 0,
            pipelineValueTotal: 0,
            tasksDueToday: 0,
            upcomingActivities: 0,
            overdueActivities: 0,
            atRiskOpportunities: 0,
            opportunitiesWithoutNextStep: 0,
            recentCustomers: [],
            activitiesNextWeek: [],
            myTasks: [],
            // Chart data
            revenueByMonth: [],
            customerGrowth: [],
            activityBreakdown: [],
            pipelineValue: [],
            conversionTrend: [],
            topPerformers: [],
            newlyAssignedLeads: [],
            atRiskDeals: [],
            // Additional metrics
            avgDealSize: 0,
            winRate: 0,
            avgSalesCycle: 0,
            monthlyRecurringRevenue: 0,
            customerLifetimeValue: 0,
            churnRate: 0,
            // Epistemic metrics
            avgQualificationConfidence: 0,
            avgTruthCoverage: 0,
            avgTimeToTruthDays: 0,
            riskRegisterCount: 0,
            riskIntelligence: [],
            topRiskFlags: [],
            confidenceWeightedPipelineValue: 0,
            costOfNotKnowingValue: 0,
            costOfNotKnowingDeals: 0,
            costOfNotKnowingBreakdown: [],
            costOfNotKnowingTrend: [],
            confidenceCalibrationScore: 0,
            confidenceCalibrationSample: 0,
            myPipelineValueTotal: 0,
            myConfidenceWeightedPipelineValue: 0,
            myQuotaTarget: null,
            forecastScenarios: []
        };
        return this.http.get(url, { params }).pipe(retryTransient(), catchError((err) => {
            console.error('Failed to load dashboard summary', err);
            return of(empty);
        }));
    }
    getManagerPipelineHealth() {
        const url = `${environment.apiUrl}/api/dashboard/manager/pipeline-health`;
        const empty = {
            openOpportunities: 0,
            pipelineValueTotal: 0,
            missingNextStepCount: 0,
            nextStepOverdueCount: 0,
            noRecentActivityCount: 0,
            closeDateOverdueCount: 0,
            stuckStageCount: 0,
            coachingOpenCount: 0,
            coachingOverdueCount: 0,
            coachingEscalationsLast7Days: 0,
            approvalPendingCount: 0,
            approvalCycleAvgHours: 0,
            reviewNeedsWorkCount: 0,
            reviewEscalatedCount: 0,
            reviewAckOverdueCount: 0,
            reviewAckAvgHours: 0,
            pipelineByStage: [],
            topTruthGaps: [],
            reviewQueue: []
        };
        return this.http.get(url).pipe(retryTransient(), catchError((err) => {
            console.error('Failed to load manager pipeline health', err);
            return of(empty);
        }));
    }
    getSalesTeamPerformance() {
        const url = `${environment.apiUrl}/api/dashboard/manager/team-performance`;
        const empty = {
            teamRevenue: 0,
            dealsClosed: 0,
            winRate: 0,
            avgCycleDays: 0,
            teamRevenuePrevious: 0,
            dealsClosedPrevious: 0,
            winRatePrevious: 0,
            avgCycleDaysPrevious: 0,
            reps: []
        };
        return this.http.get(url).pipe(retryTransient(), catchError((err) => {
            console.error('Failed to load sales team performance', err);
            return of(empty);
        }));
    }
    getAssistantInsights() {
        const url = `${environment.apiUrl}/api/assistant/insights`;
        const empty = {
            scope: 'Self',
            kpis: [],
            actions: [],
            generatedAtUtc: new Date().toISOString()
        };
        return this.http.get(url).pipe(retryTransient(), catchError((err) => {
            console.error('Failed to load assistant insights', err);
            return of(empty);
        }));
    }
    executeAssistantAction(action, note) {
        const url = `${environment.apiUrl}/api/assistant/actions/execute`;
        return this.http.post(url, {
            actionId: action.id,
            actionType: action.actionType,
            riskTier: action.riskTier,
            entityType: action.entityType ?? null,
            entityId: action.entityId ?? null,
            note: note ?? null
        });
    }
    reviewAssistantAction(action, approved, reviewNote) {
        const url = `${environment.apiUrl}/api/assistant/actions/review`;
        return this.http.post(url, {
            actionId: action.id,
            actionType: action.actionType,
            riskTier: action.riskTier,
            entityType: action.entityType ?? null,
            entityId: action.entityId ?? null,
            approved,
            reviewNote: reviewNote ?? null
        });
    }
    undoAssistantAction(createdActivityId, actionType) {
        const url = `${environment.apiUrl}/api/assistant/actions/undo`;
        return this.http.post(url, {
            createdActivityId,
            actionType: actionType ?? null
        });
    }
    coachOpportunity(opportunityId, payload) {
        const url = `${environment.apiUrl}/api/opportunities/${opportunityId}/coach`;
        return this.http.post(url, {
            comment: payload.comment,
            dueDateUtc: payload.dueDateUtc ?? null,
            priority: payload.priority ?? null
        });
    }
    getLayout() {
        const url = `${environment.apiUrl}/api/dashboard/layout`;
        return this.http
            .get(url)
            .pipe(retryTransient(), catchError((err) => {
            console.error('Failed to load dashboard layout', err);
            return of({ cardOrder: [], sizes: {}, dimensions: {}, hiddenCards: [], roleLevel: null, packName: null });
        }));
    }
    saveLayout(payload) {
        const url = `${environment.apiUrl}/api/dashboard/layout`;
        return this.http.put(url, payload);
    }
    getDefaultLayout() {
        const url = `${environment.apiUrl}/api/dashboard/layout/default`;
        return this.http.get(url).pipe(retryTransient());
    }
    getDefaultLayoutForLevel(level) {
        const url = `${environment.apiUrl}/api/dashboard/layout/default`;
        return this.http.get(url, { params: { level } }).pipe(retryTransient());
    }
    resetLayout() {
        const url = `${environment.apiUrl}/api/dashboard/layout/reset`;
        return this.http.post(url, {});
    }
    saveDefaultLayout(payload) {
        const url = `${environment.apiUrl}/api/dashboard/layout/default`;
        return this.http.put(url, payload);
    }
    getTemplates() {
        const url = `${environment.apiUrl}/api/dashboard/templates`;
        return this.http.get(url);
    }
    createTemplate(payload) {
        const url = `${environment.apiUrl}/api/dashboard/templates`;
        return this.http.post(url, payload);
    }
    updateTemplate(templateId, payload) {
        const url = `${environment.apiUrl}/api/dashboard/templates/${templateId}`;
        return this.http.put(url, payload);
    }
    setDefaultTemplate(templateId) {
        const url = `${environment.apiUrl}/api/dashboard/templates/${templateId}/default`;
        return this.http.post(url, {});
    }
    static ɵfac = function DashboardDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DashboardDataService, factory: DashboardDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardDataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
