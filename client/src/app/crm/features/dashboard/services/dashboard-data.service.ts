import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DashboardSummary } from '../models/dashboard.model';

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
}
