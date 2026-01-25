import { Activity } from '../../activities/models/activity.model';
import { Customer } from '../../customers/models/customer.model';

export interface DashboardSummary {
  totalCustomers: number;
  leads: number;
  prospects: number;
  activeCustomers: number;
  openOpportunities: number;
  pipelineValueTotal: number;
  tasksDueToday: number;
  upcomingActivities: number;
  overdueActivities: number;
  atRiskOpportunities: number;
  opportunitiesWithoutNextStep: number;
  recentCustomers: Customer[];
  activitiesNextWeek: Activity[];
  myTasks: Activity[];
  
  // Chart data
  revenueByMonth: ChartDataPoint[];
  customerGrowth: ChartDataPoint[];
  activityBreakdown: ActivityBreakdown[];
  pipelineValue: PipelineStage[];
  conversionTrend: ChartDataPoint[];
  topPerformers: PerformerData[];
  
  // Additional metrics
  avgDealSize: number;
  winRate: number;
  avgSalesCycle: number; // days
  monthlyRecurringRevenue: number;
  customerLifetimeValue: number;
  churnRate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ActivityBreakdown {
  type: string;
  count: number;
  percentage: number;
}

export interface PipelineStage {
  stage: string;
  count: number;
  value: number;
}

export interface PerformerData {
  name: string;
  deals: number;
  revenue: number;
  avatar?: string;
}
