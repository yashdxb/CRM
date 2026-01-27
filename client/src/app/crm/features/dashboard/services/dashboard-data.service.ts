import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DashboardSummary, ManagerPipelineHealth } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  private readonly http = inject(HttpClient);

  private readonly defaultLayout = [
    'pipeline',
    'accounts',
    'new-leads',
    'at-risk-deals',
    'manager-health',
    'activity-mix',
    'conversion',
    'top-performers',
    'my-tasks',
    'timeline',
    'health'
  ];

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
      churnRate: 0
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
      pipelineByStage: [],
      reviewQueue: []
    };
    return this.http.get<ManagerPipelineHealth>(url).pipe(catchError(() => of(empty)));
  }

  getLayout() {
    const url = `${environment.apiUrl}/api/dashboard/layout`;
    return this.http
      .get<{
        cardOrder: string[];
        sizes?: Record<string, 'sm' | 'md' | 'lg'>;
        dimensions?: Record<string, { width: number; height: number }>;
        hiddenCards?: string[];
      }>(url)
      .pipe(catchError(() => of({ cardOrder: this.defaultLayout, sizes: {}, dimensions: {}, hiddenCards: [] })));
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
    }>(url, payload);
  }

  getDefaultLayout() {
    return [...this.defaultLayout];
  }
}
