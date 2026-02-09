import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DashboardSummary, ManagerPipelineHealth } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  private readonly http = inject(HttpClient);

  getSummary() {
    const url = `${environment.apiUrl}/api/dashboard/summary`;
    const empty: DashboardSummary = {
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
      topRiskFlags: [],
      confidenceWeightedPipelineValue: 0,
      costOfNotKnowingValue: 0,
      costOfNotKnowingDeals: 0,
      confidenceCalibrationScore: 0,
      confidenceCalibrationSample: 0,
      myPipelineValueTotal: 0,
      myConfidenceWeightedPipelineValue: 0
    };

    return this.http.get<DashboardSummary>(url).pipe(catchError(() => of(empty)));
  }

  getManagerPipelineHealth() {
    const url = `${environment.apiUrl}/api/dashboard/manager/pipeline-health`;
    const empty: ManagerPipelineHealth = {
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
    return this.http.get<ManagerPipelineHealth>(url).pipe(catchError(() => of(empty)));
  }

  coachOpportunity(opportunityId: string, payload: { comment: string; dueDateUtc?: string | null; priority?: string | null }) {
    const url = `${environment.apiUrl}/api/opportunities/${opportunityId}/coach`;
    return this.http.post<{ activityId: string }>(url, {
      comment: payload.comment,
      dueDateUtc: payload.dueDateUtc ?? null,
      priority: payload.priority ?? null
    });
  }

  getLayout() {
    const url = `${environment.apiUrl}/api/dashboard/layout`;
    return this.http
      .get<{
        cardOrder: string[];
        sizes?: Record<string, 'sm' | 'md' | 'lg'>;
        dimensions?: Record<string, { width: number; height: number }>;
        hiddenCards?: string[];
        roleLevel?: number | null;
      }>(url)
      .pipe(catchError(() => of({ cardOrder: [], sizes: {}, dimensions: {}, hiddenCards: [], roleLevel: null })));
  }

  saveLayout(payload: {
    cardOrder: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hiddenCards: string[];
  }) {
    const url = `${environment.apiUrl}/api/dashboard/layout`;
    return this.http.put<{
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
      roleLevel?: number | null;
    }>(url, payload);
  }

  getDefaultLayout() {
    const url = `${environment.apiUrl}/api/dashboard/layout/default`;
    return this.http.get<{
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
      roleLevel?: number | null;
    }>(url);
  }

  getDefaultLayoutForLevel(level: number) {
    const url = `${environment.apiUrl}/api/dashboard/layout/default`;
    return this.http.get<{
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
      roleLevel?: number | null;
    }>(url, { params: { level } });
  }

  resetLayout() {
    const url = `${environment.apiUrl}/api/dashboard/layout/reset`;
    return this.http.post<{
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
      roleLevel?: number | null;
    }>(url, {});
  }

  saveDefaultLayout(payload: {
    roleLevel: number;
    cardOrder: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hiddenCards: string[];
  }) {
    const url = `${environment.apiUrl}/api/dashboard/layout/default`;
    return this.http.put<{
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
      roleLevel?: number | null;
    }>(url, payload);
  }

  getTemplates() {
    const url = `${environment.apiUrl}/api/dashboard/templates`;
    return this.http.get<{
      id: string;
      name: string;
      description?: string | null;
      isDefault: boolean;
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
    }[]>(url);
  }

  createTemplate(payload: {
    name: string;
    description?: string | null;
    cardOrder: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hiddenCards: string[];
    isDefault?: boolean | null;
  }) {
    const url = `${environment.apiUrl}/api/dashboard/templates`;
    return this.http.post<{
      id: string;
      name: string;
      description?: string | null;
      isDefault: boolean;
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
    }>(url, payload);
  }

  updateTemplate(templateId: string, payload: {
    name: string;
    description?: string | null;
    cardOrder: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hiddenCards: string[];
    isDefault?: boolean | null;
  }) {
    const url = `${environment.apiUrl}/api/dashboard/templates/${templateId}`;
    return this.http.put<{
      id: string;
      name: string;
      description?: string | null;
      isDefault: boolean;
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
    }>(url, payload);
  }

  setDefaultTemplate(templateId: string) {
    const url = `${environment.apiUrl}/api/dashboard/templates/${templateId}/default`;
    return this.http.post<{
      id: string;
      name: string;
      description?: string | null;
      isDefault: boolean;
      cardOrder: string[];
      sizes?: Record<string, 'sm' | 'md' | 'lg'>;
      dimensions?: Record<string, { width: number; height: number }>;
      hiddenCards?: string[];
    }>(url, {});
  }
}
