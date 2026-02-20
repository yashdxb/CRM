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
  newlyAssignedLeads: DashboardLead[];
  atRiskDeals: DashboardOpportunity[];
  
  // Additional metrics
  avgDealSize: number;
  winRate: number;
  avgSalesCycle: number; // days
  monthlyRecurringRevenue: number;
  customerLifetimeValue: number;
  churnRate: number;

  // Epistemic metrics
  avgQualificationConfidence: number;
  avgTruthCoverage: number;
  avgTimeToTruthDays: number;
  riskRegisterCount: number;
  topRiskFlags: RiskFlagSummary[];
  confidenceWeightedPipelineValue: number;
  costOfNotKnowingValue: number;
  costOfNotKnowingDeals: number;
  costOfNotKnowingBreakdown: CostOfNotKnowingDeal[];
  costOfNotKnowingTrend: ChartDataPoint[];
  confidenceCalibrationScore: number;
  confidenceCalibrationSample: number;
  myPipelineValueTotal: number;
  myConfidenceWeightedPipelineValue: number;
  myQuotaTarget?: number | null;
  forecastScenarios: ForecastScenario[];
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

export interface DashboardLead {
  id: string;
  name: string;
  company: string;
  status: string;
  email?: string;
  createdAtUtc: string;
  firstTouchDueAtUtc?: string;
}

export interface DashboardOpportunity {
  id: string;
  name: string;
  accountName: string;
  stage: string;
  amount: number;
  reason: string;
  nextStepDueAtUtc?: string;
  lastActivityAtUtc?: string;
}

export interface RiskFlagSummary {
  label: string;
  count: number;
}

export interface CostOfNotKnowingDeal {
  opportunityId: string;
  opportunityName: string;
  accountName: string;
  stage: string;
  amount: number;
  costOfNotKnowingValue: number;
  topFactors: CostOfNotKnowingFactor[];
}

export interface CostOfNotKnowingFactor {
  key: string;
  label: string;
  weight: number;
  contribution: number;
  state: string;
}

export interface ForecastScenario {
  key: string;
  label: string;
  value: number;
  dealCount: number;
  deltaFromBase: number;
}

export interface ManagerPipelineHealth {
  openOpportunities: number;
  pipelineValueTotal: number;
  missingNextStepCount: number;
  nextStepOverdueCount: number;
  noRecentActivityCount: number;
  closeDateOverdueCount: number;
  stuckStageCount: number;
  coachingOpenCount: number;
  coachingOverdueCount: number;
  coachingEscalationsLast7Days: number;
  approvalPendingCount: number;
  approvalCycleAvgHours: number;
  reviewNeedsWorkCount: number;
  reviewEscalatedCount: number;
  reviewAckOverdueCount: number;
  reviewAckAvgHours: number;
  pipelineByStage: PipelineStage[];
  topTruthGaps: RiskFlagSummary[];
  reviewQueue: ManagerReviewDeal[];
}

export interface ManagerReviewDeal {
  id: string;
  name: string;
  accountName: string;
  stage: string;
  amount: number;
  ownerName: string;
  reason: string;
  truthCoverage?: number;
  timeToTruthDays?: number;
  nextStepDueAtUtc?: string;
  lastActivityAtUtc?: string;
  expectedCloseDate?: string;
}

export interface AssistantInsightsKpi {
  key: string;
  label: string;
  value: number;
  severity: 'ok' | 'warn' | 'danger' | string;
}

export interface AssistantInsightsAction {
  id: string;
  title: string;
  description: string;
  score: number;
  riskTier: 'low' | 'medium' | 'high' | string;
  urgency: 'planned' | 'soon' | 'immediate' | string;
  ownerScope: string;
  dueWindow: string;
  actionType: string;
  entityType?: string | null;
  entityId?: string | null;
  priority: number;
  reasons: string[];
  entities: string[];
  impactEstimate: string;
  reviewGuidance: string;
}

export interface AssistantActionExecutionResult {
  status: string;
  message: string;
  requiresReview: boolean;
  createdActivityId?: string | null;
  createdApprovalId?: string | null;
}

export interface AssistantInsights {
  scope: string;
  kpis: AssistantInsightsKpi[];
  actions: AssistantInsightsAction[];
  generatedAtUtc: string;
}
