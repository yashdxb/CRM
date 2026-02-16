import { DatePipe, DecimalPipe, PercentPipe, NgFor, NgIf, CurrencyPipe, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, NgTemplateOutlet, NgStyle } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderListModule } from 'primeng/orderlist';
import { Subject, startWith, switchMap } from 'rxjs';

import { DashboardDataService } from '../services/dashboard-data.service';
import { DashboardSummary, ManagerPipelineHealth, ManagerReviewDeal } from '../models/dashboard.model';
import { Customer } from '../../customers/models/customer.model';
import { Activity } from '../../activities/models/activity.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { OpportunityApprovalInboxItem, ExpansionSignal } from '../../opportunities/models/opportunity.model';
import { OpportunityApprovalService } from '../../opportunities/services/opportunity-approval.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CommandPaletteService } from '../../../../core/command-palette/command-palette.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { AppToastService } from '../../../../core/app-toast.service';
import { NotificationService } from '../../../../core/notifications';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { DASHBOARD_CARD_CATALOG, DASHBOARD_CHART_CATALOG, type DashboardChartId } from '../dashboard-catalog';

type ChartId = DashboardChartId;
type PriorityStreamType = 'task' | 'lead' | 'deal' | 'decision';

interface PriorityStreamItem {
  id: string;
  type: PriorityStreamType;
  title: string;
  subtitle: string;
  status: string;
  dueLabel: string;
  dueClass: string;
  dueColumn: string;
  action: string;
  meta: string[];
  priorityScore: number;
  leadFirstTouchDueAtUtc?: string;
  opportunityId?: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    NgTemplateOutlet,
    NgStyle,
    DatePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    FormsModule,
    DragDropModule,
    ChartModule,
    ButtonModule,
    DialogModule,
    OrderListModule,
    BreadcrumbsComponent
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage implements OnInit {
  protected readonly chartIdKeys = ['revenue', 'growth'] as const;
  protected readonly chartIdSet = new Set<ChartId>(this.chartIdKeys);
  protected readonly chartIdDefaultOrder: ChartId[] = [...this.chartIdKeys];
  protected readonly chartIdTypeGuard = (value: string): value is ChartId =>
    this.chartIdSet.has(value as ChartId);
  private readonly dashboardData = inject(DashboardDataService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly commandPaletteService = inject(CommandPaletteService);
  private readonly toastService = inject(AppToastService);
  private readonly notificationService = inject(NotificationService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly emptySummary: DashboardSummary = {
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
    revenueByMonth: [],
    customerGrowth: [],
    activityBreakdown: [],
    pipelineValue: [],
    conversionTrend: [],
    topPerformers: [],
    newlyAssignedLeads: [],
    atRiskDeals: [],
    avgDealSize: 0,
    winRate: 0,
    avgSalesCycle: 0,
    monthlyRecurringRevenue: 0,
    customerLifetimeValue: 0,
    churnRate: 0,
    avgQualificationConfidence: 0,
    avgTruthCoverage: 0,
    avgTimeToTruthDays: 0,
    riskRegisterCount: 0,
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
  private readonly summarySignal = signal<DashboardSummary>(this.emptySummary);
  private readonly emptyManagerHealth: ManagerPipelineHealth = {
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
  private readonly managerHealthRefresh$ = new Subject<void>();
  private readonly managerHealthSignal = signal<ManagerPipelineHealth>(this.emptyManagerHealth);
  protected readonly expansionSignals = signal<ExpansionSignal[]>([]);
  protected readonly pendingDecisionInbox = signal<OpportunityApprovalInboxItem[]>([]);
  protected readonly expansionLoading = signal(false);
  protected readonly expansionSubmitting = signal<Record<string, boolean>>({});

  protected readonly summary = computed(() => this.summarySignal() ?? this.emptySummary);
  protected readonly managerHealth = computed(() => this.managerHealthSignal() ?? this.emptyManagerHealth);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  protected coachingDialogOpen = false;
  protected coachingComment = '';
  protected coachingDueLocal = '';
  protected coachingPriority = 'High';
  protected coachingSubmitting = false;
  private coachingDeal: ManagerReviewDeal | null = null;
  protected expansionDialogOpen = false;

  protected readonly greeting = this.getGreeting();
  
  // Chart configurations
  protected revenueChartData: any;
  protected revenueChartOptions: any;
  protected customerGrowthData: any;
  protected customerGrowthOptions: any;
  protected activityDonutData: any;
  protected activityDonutOptions: any;
  protected pipelineChartData: any;
  protected pipelineChartOptions: any;
  protected conversionChartData: any;
  protected conversionChartOptions: any;
  protected costTrendChartData: any;
  protected costTrendChartOptions: any;
  protected costBreakdownDialogOpen = false;
  protected costBreakdownSortKey: 'exposure' | 'amount' | 'stage' | 'name' = 'exposure';
  protected costBreakdownSortDirection: 'asc' | 'desc' = 'desc';
  
  protected readonly kpis = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      { label: 'Accounts', value: data.totalCustomers, sub: 'Total records' },
      { label: 'Open opportunities', value: data.openOpportunities, sub: 'Active pipeline' },
      { label: 'Pipeline value', value: data.pipelineValueTotal, sub: 'Open forecast' },
      { label: 'Tasks due today', value: data.tasksDueToday, sub: 'Focus list' },
      { label: 'Upcoming activities', value: data.upcomingActivities, sub: 'Next 7 days' }
    ];
  });
  
  protected readonly secondaryKpis = computed(() => {
    const data = this.summary();
    if (!data) return [];
    const items = [
      { id: 'accounts', label: 'Accounts', value: data.totalCustomers, trend: 0, percentage: 100, icon: 'pi-building', color: 'cyan' },
      { id: 'open-opps', label: 'Open Opps', value: data.openOpportunities, trend: 0, percentage: 100, icon: 'pi-briefcase', color: 'purple' },
      { id: 'at-risk', label: 'At-risk deals', value: data.atRiskOpportunities, trend: 0, percentage: 100, icon: 'pi-exclamation-triangle', color: 'danger' },
      { id: 'no-next-step', label: 'No next step', value: data.opportunitiesWithoutNextStep, trend: 0, percentage: 100, icon: 'pi-calendar-times', color: 'warning' },
      { id: 'tasks-due', label: 'Tasks Due', value: data.tasksDueToday, trend: 0, percentage: 100, icon: 'pi-calendar', color: 'success' },
      { id: 'next-7-days', label: 'Next 7 Days', value: data.upcomingActivities, trend: 0, percentage: 100, icon: 'pi-clock', color: 'orange' }
    ];
    const order = this.kpiOrder().length ? this.kpiOrder() : this.defaultKpiOrder;
    const lookup = new Map(items.map(item => [item.id, item]));
    return order
      .map((id: string) => lookup.get(id))
      .filter((item): item is (typeof items)[number] => !!item);
  });
  
  protected readonly customerBreakdown = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      { label: 'Lead', value: data.leads, accent: 'teal' },
      { label: 'Prospect', value: data.prospects, accent: 'amber' },
      { label: 'Customer', value: data.activeCustomers, accent: 'emerald' }
    ];
  });

  protected readonly topRiskFlags = computed(() => this.summary()?.topRiskFlags ?? []);
  protected readonly topCostBreakdown = computed(() =>
    (this.summary()?.costOfNotKnowingBreakdown ?? []).slice(0, 5)
  );

  protected readonly executionGuideItems = computed(() => {
    const data = this.summary();
    if (!data) return [];
    return [
      {
        key: 'next-step',
        label: 'Schedule next steps for open deals',
        count: data.opportunitiesWithoutNextStep
      },
      {
        key: 'at-risk',
        label: 'Recover at-risk opportunities',
        count: data.atRiskOpportunities
      },
      {
        key: 'overdue',
        label: 'Clear overdue activities',
        count: data.overdueActivities
      },
      {
        key: 'new-leads',
        label: 'Work newly assigned leads',
        count: data.newlyAssignedLeads?.length ?? 0
      }
    ];
  });

  protected confidenceLabel(value: number): string {
    if (value >= 0.75) return 'High';
    if (value >= 0.5) return 'Medium';
    if (value >= 0.2) return 'Neutral';
    return 'Low';
  }

  protected confidenceTone(value: number): string {
    if (value >= 0.75) return 'success';
    if (value >= 0.5) return 'info';
    if (value >= 0.2) return 'warning';
    return 'danger';
  }

  protected weightedPipelineDelta(): number {
    const data = this.summary();
    if (!data) return 0;
    return data.confidenceWeightedPipelineValue - data.pipelineValueTotal;
  }

  protected readonly recentAccounts = computed(() => this.summary()?.recentCustomers?.slice(0, 5) ?? []);
  protected readonly upcomingActivities = computed(() => this.summary()?.activitiesNextWeek?.slice(0, 6) ?? []);
  protected readonly myTasks = computed(() => this.summary()?.myTasks?.slice(0, 6) ?? []);
  protected readonly topPerformers = computed(() => this.summary()?.topPerformers ?? []);
  protected readonly newlyAssignedLeads = computed(() => this.summary()?.newlyAssignedLeads?.slice(0, 6) ?? []);
  protected readonly atRiskDeals = computed(() => this.summary()?.atRiskDeals?.slice(0, 6) ?? []);
  protected readonly myQuotaTarget = computed(() => this.summary()?.myQuotaTarget ?? null);
  protected readonly myQuotaProgress = computed(() => {
    const quota = this.myQuotaTarget();
    if (!quota || quota <= 0) {
      return null;
    }
    const weighted = this.summary()?.myConfidenceWeightedPipelineValue ?? 0;
    return Math.min(100, Math.round((weighted / quota) * 100));
  });
  protected readonly priorityStreamItems = computed(() => {
    const items: PriorityStreamItem[] = [];
    const tasks = this.myTasks();
    const leads = this.newlyAssignedLeads();
    const deals = this.atRiskDeals();
    const decisions = this.pendingDecisionInbox();

    for (const task of tasks) {
      const dueLabel = this.getTaskDueLabel(task);
      const dueClass = this.getTaskDueClass(task);
      items.push({
        id: task.id,
        type: 'task',
        title: task.subject,
        subtitle: task.relatedEntityName || task.type || 'Task',
        status: task.status,
        dueLabel,
        dueClass,
        dueColumn: dueClass === 'due-today' ? 'Due today' : dueLabel,
        action: task.type === 'Call' ? 'Call now' : task.type === 'Email' ? 'Send email' : 'Complete task',
        meta: [
          task.dueDateUtc ? `Due ${this.formatShortDate(task.dueDateUtc)}` : 'No due date',
          `Priority: ${this.getTaskPriorityLabel(task)}`
        ],
        priorityScore: this.getTaskPriorityScore(task)
      });
    }

    for (const lead of leads) {
      items.push({
        id: lead.id,
        type: 'lead',
        title: lead.name,
        subtitle: lead.company,
        status: 'New lead',
        dueLabel: 'New',
        dueClass: 'due-today',
        dueColumn: 'Due today',
        action: 'Review & contact',
        meta: [
          lead.email ? lead.email : 'No email',
          `Assigned ${this.formatShortDate(lead.createdAtUtc)}`
        ],
        priorityScore: 70,
        leadFirstTouchDueAtUtc: lead.firstTouchDueAtUtc
      });
    }

    for (const deal of deals) {
      items.push({
        id: deal.id,
        type: 'deal',
        title: deal.name,
        subtitle: deal.accountName,
        status: deal.reason || 'At risk',
        dueLabel: 'At risk',
        dueClass: 'due-overdue',
        dueColumn: deal.nextStepDueAtUtc ? `Due ${this.formatShortDate(deal.nextStepDueAtUtc)}` : 'No next step',
        action: deal.reason?.toLowerCase().includes('missing next step')
          ? 'Set next step'
          : deal.reason?.toLowerCase().includes('next step overdue')
            ? 'Update next step'
            : 'Log activity',
        meta: [
          `Stage: ${deal.stage}`,
          `Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: this.resolveCurrencyCode(), maximumFractionDigits: 0 }).format(deal.amount ?? 0)}`
        ],
        priorityScore: 65
      });
    }

    for (const decision of decisions) {
      const requestedOn = new Date(decision.requestedOn);
      const ageInHours = Number.isNaN(requestedOn.getTime())
        ? 0
        : Math.max(0, Math.round((Date.now() - requestedOn.getTime()) / 36e5));
      const overdue = ageInHours >= 48;
      items.push({
        id: decision.id,
        type: 'decision',
        title: decision.opportunityName,
        subtitle: decision.accountName,
        status: `${decision.purpose} approval`,
        dueLabel: overdue ? 'Pending >48h' : 'Pending',
        dueClass: overdue ? 'due-overdue' : 'due-today',
        dueColumn: overdue ? 'Escalate' : 'Review now',
        action: 'Open decision inbox',
        meta: [
          `Requested by ${decision.requestedByName || 'Unknown'}`,
          `Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: decision.currency || this.resolveCurrencyCode(), maximumFractionDigits: 0 }).format(decision.amount ?? 0)}`
        ],
        priorityScore: overdue ? 95 : 85,
        opportunityId: decision.opportunityId
      });
    }

    return items.sort((a, b) => b.priorityScore - a.priorityScore);
  });
  protected readonly prioritySummary = computed(() => ({
    overdue: this.getTaskSummaryCounts().overdue,
    today: this.getTaskSummaryCounts().today,
    decisions: this.pendingDecisionInbox().length,
    newLeads: this.newlyAssignedLeads().length,
    atRisk: this.atRiskDeals().length,
    noNextStep: this.summary()?.opportunitiesWithoutNextStep ?? 0
  }));
  protected priorityFilter = signal<'all' | 'overdue' | 'today' | 'decisions' | 'new-leads' | 'at-risk' | 'no-next-step'>('all');
  protected readonly filteredPriorityStreamItems = computed(() => {
    const items = this.priorityStreamItems();
    const filter = this.priorityFilter();
    if (filter === 'all') return items;
    if (filter === 'overdue') {
      return items.filter(item => item.dueClass === 'due-overdue');
    }
    if (filter === 'today') {
      return items.filter(item => item.dueClass === 'due-today');
    }
    if (filter === 'decisions') {
      return items.filter(item => item.type === 'decision');
    }
    if (filter === 'new-leads') {
      return items.filter(item => item.type === 'lead');
    }
    if (filter === 'no-next-step') {
      return items.filter(item => item.type === 'deal' && item.status?.toLowerCase().includes('missing next step'));
    }
    return items.filter(item => item.type === 'deal');
  });
  protected readonly activityBreakdown = computed(() => this.summary()?.activityBreakdown ?? []);
  protected readonly pipelineValue = computed(() => this.summary()?.pipelineValue ?? []);
  protected readonly managerPipelineByStage = computed(() => this.managerHealth().pipelineByStage ?? []);
  protected readonly managerTruthGaps = computed(() => this.managerHealth().topTruthGaps ?? []);
  protected readonly managerReviewQueue = computed(() => this.managerHealth().reviewQueue ?? []);
  protected readonly managerHealthStats = computed(() => {
    const data = this.managerHealth();
    return [
      { label: 'Missing next step', value: data.missingNextStepCount, tone: 'danger' },
      { label: 'Next step overdue', value: data.nextStepOverdueCount, tone: 'warn' },
      { label: 'No recent activity', value: data.noRecentActivityCount, tone: 'warn' },
      { label: 'Close date passed', value: data.closeDateOverdueCount, tone: 'danger' },
      { label: 'Stuck in stage', value: data.stuckStageCount, tone: 'muted' },
      { label: 'Coaching open', value: data.coachingOpenCount, tone: 'warn' },
      { label: 'Coaching overdue', value: data.coachingOverdueCount, tone: 'danger' },
      { label: 'Coaching escalations (7d)', value: data.coachingEscalationsLast7Days, tone: 'muted' },
      { label: 'Approvals pending', value: data.approvalPendingCount, tone: 'warn' },
      { label: 'Approval cycle (hrs)', value: data.approvalCycleAvgHours, tone: 'muted' },
      { label: 'Review needs work', value: data.reviewNeedsWorkCount, tone: 'warn' },
      { label: 'Review escalated', value: data.reviewEscalatedCount, tone: 'danger' },
      { label: 'Review ack overdue', value: data.reviewAckOverdueCount, tone: 'danger' },
      { label: 'Review ack avg (hrs)', value: data.reviewAckAvgHours, tone: 'muted' }
    ];
  });
  
  protected readonly activityStats = computed(() => {
    const data = this.summary();
    const upcoming = data?.upcomingActivities ?? 0;
    const overdue = data?.overdueActivities ?? 0;
    const total = upcoming + overdue;
    const completion = total ? Math.round((upcoming / total) * 100) : 100;
    return { upcoming, overdue, completion };
  });
  
  protected readonly totalPipelineValue = computed(() => {
    const pipeline = this.pipelineValue();
    const summary = this.summary();
    if (summary?.pipelineValueTotal) {
      return summary.pipelineValueTotal;
    }
    return pipeline.reduce((sum, stage) => sum + stage.value, 0);
  });

  protected openCoaching(deal: ManagerReviewDeal) {
    this.coachingDeal = deal;
    this.coachingComment = '';
    this.coachingPriority = 'High';
    this.coachingDueLocal = this.defaultCoachingDueLocal();
    this.coachingDialogOpen = true;
  }

  protected closeCoaching() {
    if (this.coachingSubmitting) return;
    this.coachingDialogOpen = false;
    this.coachingDeal = null;
  }

  protected submitCoaching() {
    const deal = this.coachingDeal;
    const comment = this.coachingComment.trim();
    if (!deal || !comment || this.coachingSubmitting) {
      return;
    }

    this.coachingSubmitting = true;
    const dueDateUtc = this.localToUtcIso(this.coachingDueLocal);
    this.dashboardData
      .coachOpportunity(deal.id, {
        comment,
        dueDateUtc,
        priority: this.coachingPriority
      })
      .subscribe({
        next: () => {
          this.coachingSubmitting = false;
          this.closeCoaching();
          this.refreshManagerHealth();
        },
        error: () => {
          this.coachingSubmitting = false;
        }
      });
  }

  private refreshManagerHealth() {
    this.managerHealthRefresh$.next();
  }

  private defaultCoachingDueLocal() {
    const due = new Date();
    due.setDate(due.getDate() + 2);
    due.setMinutes(due.getMinutes() - due.getTimezoneOffset());
    return due.toISOString().slice(0, 16);
  }

  private localToUtcIso(localValue: string): string | null {
    if (!localValue) return null;
    const parsed = new Date(localValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  protected layoutOrder: string[] = [];
  protected layoutDialogOpen = false;
  protected layoutDraft: Array<{ id: string; label: string; icon: string }> = [];
  protected layoutSizes: Record<string, 'sm' | 'md' | 'lg'> = {};
  protected layoutDimensions: Record<string, { width: number; height: number }> = {};
  private hasLocalLayoutPreference = false;
  private hasLocalChartPreference = false;
  private roleDefaultLayout: string[] = [];
  private roleDefaultHiddenCharts = new Set<ChartId>();
  protected roleDefaultLevel: number | null = null;
  protected readonly activePackName = signal<string>('H1 Pack');
  protected readonly canManageLayoutDefaults = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return tokenHasPermission(payload, PERMISSION_KEYS.administrationManage);
  });
  // Locked size map so customize layout never inflates card heights.
  private readonly defaultCardSizes: Record<string, 'sm' | 'md' | 'lg'> = {
    pipeline: 'lg',
    'truth-metrics': 'md',
    'risk-register': 'md',
    'execution-guide': 'sm',
    'confidence-forecast': 'sm',
    'forecast-scenarios': 'sm',
    'my-forecast': 'sm',
    'expansion-signals': 'md',
    accounts: 'md',
    'manager-health': 'md',
    'activity-mix': 'sm',
    conversion: 'sm',
    'top-performers': 'md',
    'my-tasks': 'md',
    timeline: 'lg',
    health: 'md'
  };
  private readonly defaultChartSizes: Record<ChartId, 'sm' | 'md' | 'lg'> = {
    revenue: 'lg',
    growth: 'md'
  };

  private readonly defaultKpiOrder = ['accounts', 'open-opps', 'at-risk', 'no-next-step', 'tasks-due', 'next-7-days'];
  private readonly kpiOrderStorageKey = 'crm.dashboard.kpi.order';
  protected readonly kpiOrder = signal<string[]>([]);

  private readonly layoutStorageKey = 'crm.dashboard.command-center.layout';
  private readonly chartVisibilityStorageKey = 'crm.dashboard.charts.visibility';
  protected showRevenueChart = true;
  protected showCustomerGrowthChart = true;
  protected chartOrder: ChartId[] = [...this.chartIdDefaultOrder];
  private resizeState:
    | {
        element: HTMLElement;
        cardId: string | null;
        handle: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
        startX: number;
        startY: number;
        startWidth: number;
        startHeight: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
      }
    | null = null;
  private readonly onResizeMove = (event: MouseEvent) => this.handleResizeMove(event);
  private readonly onResizeEnd = () => this.stopResize();

  protected readonly cardCatalog = DASHBOARD_CARD_CATALOG;
  protected readonly chartCatalog: Array<{ id: ChartId; label: string; icon: string }> = DASHBOARD_CHART_CATALOG;
  protected readonly selectableCards = signal<Array<{ id: string; label: string; icon: string }>>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const summary = this.summary();
        this.initCharts(summary);
      });
    }
    this.kpiOrder.set(this.loadKpiOrder());
    this.loadCurrencyContext();
  }

  ngOnInit(): void {
    this.dashboardData.getSummary()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(summary => {
        const resolvedSummary = summary ?? this.emptySummary;
        this.summarySignal.set(resolvedSummary);
        this.emitRiskAlerts(resolvedSummary);
      });

    this.loadExpansionSignals();
    this.loadPendingDecisionInbox();

    this.managerHealthRefresh$
      .pipe(
        startWith(void 0),
        switchMap(() => this.dashboardData.getManagerPipelineHealth()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(health => {
        this.managerHealthSignal.set(health ?? this.emptyManagerHealth);
      });

    const { order, sizes, dimensions, hasLocalPreference } = this.loadLayoutPreferences();
    const knownCardIds = new Set(this.cardCatalog.map((card) => card.id));
    const normalizedLocalOrder = order.filter((id) => knownCardIds.has(id));
    this.layoutOrder = normalizedLocalOrder.length > 0
      ? normalizedLocalOrder
      : this.cardCatalog.map((card) => card.id);
    this.layoutSizes = this.buildDefaultSizeMap();
    this.layoutDimensions = dimensions ?? {};
    this.hasLocalLayoutPreference = hasLocalPreference;
    this.loadChartVisibility();
    this.refreshSelectableCards();
    this.dashboardData.getDefaultLayout().subscribe({
      next: (response) => {
        const knownCardIds = new Set(this.cardCatalog.map((card) => card.id));
        this.roleDefaultLayout = (response.cardOrder ?? []).filter((id) => knownCardIds.has(id));
        this.roleDefaultLevel = response.roleLevel ?? null;
        this.activePackName.set(this.resolvePackName(response.packName, response.roleLevel));
        const hidden = response.hiddenCards ?? [];
        this.roleDefaultHiddenCharts = new Set(
          hidden.filter((id): id is ChartId => this.chartIdTypeGuard(id))
        );
        this.applyRoleDefaultCharts();

        // If the user has a persisted layout that contains cards not in the role's default pack,
        // strip them out immediately so Customize Layout and the dashboard itself stay aligned.
        const roleDefaultOrder = this.getLayoutDefaultOrder();
        this.layoutOrder = this.applyRoleDefault(this.layoutOrder, roleDefaultOrder);

        this.refreshSelectableCards();
        this.loadServerLayout();
      },
      error: () => {
        this.roleDefaultLayout = [];
        this.roleDefaultLevel = null;
        this.activePackName.set(this.resolvePackName(null, this.roleDefaultLevel));
        this.roleDefaultHiddenCharts = new Set();
        this.refreshSelectableCards();
        this.loadServerLayout();
      }
    });

  }

  protected onQuickAdd(): void {
    this.commandPaletteService.requestQuickAdd('lead');
  }

  private emitRiskAlerts(summary: DashboardSummary): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const missingNextStep = summary.opportunitiesWithoutNextStep ?? 0;
    const idleDeals = summary.atRiskDeals?.filter((deal) =>
      deal.reason?.toLowerCase().includes('no recent activity')).length ?? 0;

    const state = this.readRiskAlertState();
    const alreadyShown = state?.date === today;
    const shouldShowMissing = missingNextStep > 0 && (!alreadyShown || (state?.missingNextStep ?? 0) < missingNextStep);
    const shouldShowIdle = idleDeals > 0 && (!alreadyShown || (state?.idleDeals ?? 0) < idleDeals);

    if (!shouldShowMissing && !shouldShowIdle) {
      return;
    }

    if (shouldShowMissing) {
      this.notificationService.warning(
        'Missing next steps',
        `${missingNextStep} opportunity${missingNextStep === 1 ? '' : 'ies'} has no next step.`
      );
    }

    if (shouldShowIdle) {
      this.notificationService.warning(
        'Idle deals',
        `${idleDeals} opportunity${idleDeals === 1 ? '' : 'ies'} has no activity in the last 30 days.`
      );
    }

    this.persistRiskAlertState({
      date: today,
      missingNextStep: Math.max(state?.missingNextStep ?? 0, missingNextStep),
      idleDeals: Math.max(state?.idleDeals ?? 0, idleDeals)
    });
  }

  protected expansionSignalsCount(): number {
    return this.expansionSignals().length;
  }

  protected isExpansionSubmitting(signal: ExpansionSignal): boolean {
    return !!this.expansionSubmitting()[signal.opportunityId];
  }

  protected createExpansionOpportunity(signal: ExpansionSignal): void {
    if (signal.hasExpansionOpportunity || this.isExpansionSubmitting(signal)) {
      return;
    }

    this.expansionSubmitting.update((current) => ({
      ...current,
      [signal.opportunityId]: true
    }));

    this.opportunityData.createExpansion(signal.opportunityId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.expansionSignals.update((current) =>
            current.map((item) =>
              item.opportunityId === signal.opportunityId
                ? { ...item, hasExpansionOpportunity: true }
                : item
            )
          );
          this.expansionSubmitting.update((current) => ({
            ...current,
            [signal.opportunityId]: false
          }));
          this.toastService.show('success', 'Expansion opportunity created.', 3000);
        },
        error: () => {
          this.expansionSubmitting.update((current) => ({
            ...current,
            [signal.opportunityId]: false
          }));
          this.toastService.show('error', 'Unable to create expansion opportunity.', 3000);
        }
      });
  }

  private loadExpansionSignals(): void {
    this.expansionLoading.set(true);
    this.opportunityData.getExpansionSignals()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (signals) => {
          this.expansionSignals.set(signals ?? []);
          this.expansionLoading.set(false);
        },
        error: () => {
          this.expansionLoading.set(false);
          this.toastService.show('error', 'Unable to load expansion signals.', 3000);
        }
      });
  }

  private loadPendingDecisionInbox(): void {
    this.approvalService
      .getInbox('Pending')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.pendingDecisionInbox.set(items ?? []);
        },
        error: () => {
          this.pendingDecisionInbox.set([]);
        }
      });
  }

  private readRiskAlertState(): { date: string; missingNextStep: number; idleDeals: number } | null {
    try {
      const raw = localStorage.getItem('crm_risk_alerts_state');
      if (!raw) return null;
      return JSON.parse(raw) as { date: string; missingNextStep: number; idleDeals: number };
    } catch {
      return null;
    }
  }

  private persistRiskAlertState(state: { date: string; missingNextStep: number; idleDeals: number }): void {
    try {
      localStorage.setItem('crm_risk_alerts_state', JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }

  private loadServerLayout(): void {
    this.dashboardData.getLayout().subscribe(({ cardOrder, sizes, dimensions, hiddenCards }) => {
      const defaultOrder = this.getLayoutDefaultOrder();
      const normalized = this.applyRoleDefault(
        this.normalizeLayoutWithHidden(cardOrder, hiddenCards, defaultOrder),
        defaultOrder
      );
      const serverHasState = (hiddenCards?.length ?? 0) > 0
        || Object.keys(sizes ?? {}).length > 0
        || Object.keys(dimensions ?? {}).length > 0
        || !this.areArraysEqual(normalized, defaultOrder);
      if (this.hasLocalLayoutPreference && !serverHasState && this.roleDefaultLayout.length === 0) {
        this.dashboardData.saveLayout(this.buildLayoutPayload()).subscribe();
        return;
      }
      setTimeout(() => {
        this.layoutOrder = normalized;
        this.layoutSizes = this.buildDefaultSizeMap();
        const serverDimensions = dimensions ?? {};
        this.layoutDimensions = Object.keys(serverDimensions).length > 0
          ? serverDimensions
          : (this.layoutDimensions ?? {});
        this.persistLayoutPreferences();
        this.refreshSelectableCards();
      }, 0);
    });
  }

  protected openLayoutDialog(): void {
    const defaultOrder = this.getLayoutDefaultOrder();
    // Ensure the dialog cannot show cards outside the current role pack.
    this.layoutOrder = this.applyRoleDefault(this.layoutOrder, defaultOrder);
    this.layoutDraft = this.getOrderedCards(this.layoutOrder);
    this.layoutDialogOpen = true;
  }

  protected getSelectableCards() {
    const allowed = new Set(this.getLayoutDefaultOrder());
    return this.cardCatalog.filter(card => allowed.has(card.id));
  }

  protected isCardVisible(cardId: string): boolean {
    return this.layoutOrder.includes(cardId);
  }

  protected onCardVisibilityChange(cardId: string, visible: boolean): void {
    // Keep the layout list as the single source of truth for which cards are displayed.
    const defaultOrder = this.getLayoutDefaultOrder();
    const nextOrder = visible
      ? this.normalizeLayout([...this.layoutOrder, cardId], defaultOrder)
      : this.layoutOrder.filter(id => id !== cardId);

    this.layoutOrder = nextOrder;
    if (!visible) {
      delete this.layoutSizes[cardId];
      delete this.layoutDimensions[cardId];
    }

    this.ensureSizeDefaults();
    this.persistLayoutPreferences();
    this.layoutDraft = this.getOrderedCards(this.layoutOrder);

    this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
      next: response => {
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
          ? normalized
          : this.normalizeLayout(nextOrder, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = response.dimensions ?? {};
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
      },
      error: () => {
        this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
      }
    });
  }

  protected saveLayout(): void {
    const order = this.layoutDraft.map(item => item.id);
    const defaultOrder = this.getLayoutDefaultOrder();
    const requested = order.length === 0 ? [] : this.normalizeLayout(order, defaultOrder);
    this.layoutOrder = requested;
    this.ensureSizeDefaults();
    this.persistLayoutPreferences();
    this.layoutDialogOpen = false;
    this.dashboardData.saveLayout(this.buildLayoutPayload(requested)).subscribe({
      next: response => {
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, requested, defaultOrder)
          ? normalized
          : requested;
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = response.dimensions ?? {};
        this.persistLayoutPreferences();
        this.toastService.show('success', 'Layout saved.', 2500);
      },
      error: () => {
        this.layoutOrder = requested;
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.toastService.show('error', 'Unable to save layout.', 3000);
      }
    });
  }

  protected resetLayout(): void {
    this.dashboardData.resetLayout().subscribe({
      next: response => {
        const defaultOrder = this.getLayoutDefaultOrder();
        this.layoutOrder = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = response.dimensions ?? {};
        this.activePackName.set(this.resolvePackName(response.packName, response.roleLevel ?? this.roleDefaultLevel));
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
        this.resetChartPreference();
        this.applyRoleDefaultCharts();
      },
      error: () => {
        const fallbackOrder = this.getLayoutDefaultOrder();
        this.layoutOrder = this.normalizeLayout(fallbackOrder, fallbackOrder);
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
        this.resetChartPreference();
        this.applyRoleDefaultCharts();
      }
    });
  }

  protected onCardDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const nextOrder = [...this.layoutOrder];
    moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
    this.layoutOrder = nextOrder;
    this.persistLayoutPreferences();
    this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
      next: response => {
        const defaultOrder = this.getLayoutDefaultOrder();
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
          ? normalized
          : this.normalizeLayout(nextOrder, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
      },
      error: () => {
        const defaultOrder = this.getLayoutDefaultOrder();
        this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
        this.persistLayoutPreferences();
      }
    });
  }

  protected hideCard(cardId: string): void {
    const nextOrder = this.layoutOrder.filter(id => id !== cardId);
    this.layoutOrder = nextOrder;
    delete this.layoutSizes[cardId];
    delete this.layoutDimensions[cardId];
    this.persistLayoutPreferences();
    this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
      next: response => {
        const defaultOrder = this.getLayoutDefaultOrder();
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
          ? normalized
          : this.normalizeLayout(nextOrder, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
      },
      error: () => {
        const defaultOrder = this.getLayoutDefaultOrder();
        this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
        this.persistLayoutPreferences();
      }
    });
  }

  protected hideChart(chartKey: ChartId): void {
    if (chartKey === 'revenue') {
      this.showRevenueChart = false;
      this.persistChartVisibility();
      return;
    }
    this.showCustomerGrowthChart = false;
    this.persistChartVisibility();
  }

  protected saveRoleDefaultLayout(): void {
    if (!this.roleDefaultLevel) {
      this.toastService.show('error', 'Hierarchy level is not configured for your role.', 3500);
      return;
    }
    const order = this.layoutDraft.map(item => item.id);
    const requested = order.length === 0 ? [] : this.normalizeLayout(order, this.cardCatalog.map(card => card.id));
    const payload = this.buildDefaultLayoutPayload(requested);
    this.dashboardData.saveDefaultLayout({ roleLevel: this.roleDefaultLevel, ...payload }).subscribe({
      next: response => {
        this.roleDefaultLayout = response.cardOrder ?? [];
        this.toastService.show('success', `Default layout saved for H${this.roleDefaultLevel}.`, 3000);
      },
      error: () => {
        this.toastService.show('error', 'Unable to save role default layout.', 3500);
      }
    });
  }

  protected onChartDrop(event: CdkDragDrop<ChartId[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const nextOrder = [...this.chartOrder];
    moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
    this.chartOrder = nextOrder;
    this.persistChartVisibility();
  }

  protected onKpiDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const nextOrder = [...this.kpiOrder()];
    moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
    this.kpiOrder.set(nextOrder);
    this.persistKpiOrder();
  }

  protected onCardDragStart(event: CdkDragStart<string>): void {
    const element = event.source.element.nativeElement;
    const rect = element.getBoundingClientRect();
    // Freeze preview size so cards don't inflate while dragging.
    element.style.setProperty('--drag-width', `${Math.round(rect.width)}px`);
    element.style.setProperty('--drag-height', `${Math.round(rect.height)}px`);
  }

  protected onCardDragEnd(event: CdkDragEnd<string>): void {
    const element = event.source.element.nativeElement;
    // Clean up drag sizing vars after drop so layout stays responsive.
    element.style.removeProperty('--drag-width');
    element.style.removeProperty('--drag-height');
  }

  protected startResize(
    event: MouseEvent,
    element: HTMLElement,
    handle: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
  ): void {
    const cardId = element.dataset['cardId'] ?? null;
    if (cardId !== 'my-tasks') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const rect = element.getBoundingClientRect();
    const baseMinWidth = Number(element.dataset['minWidth'] ?? 260);
    const baseMinHeight = Number(element.dataset['minHeight'] ?? 220);
    // Respect the rendered content so cards cannot be resized smaller than what they display.
    const contentConstraints = this.getCardContentConstraints(element);
    const minWidth = Math.max(baseMinWidth, contentConstraints.minWidth);
    const minHeight = Math.max(baseMinHeight, contentConstraints.minHeight);
    // Cap growth to 50% above content height and the available grid width.
    const grid = element.closest('.dashboard-card-grid') as HTMLElement | null;
    const gridRect = grid?.getBoundingClientRect();
    const maxWidth = Math.max(minWidth, Math.floor(gridRect?.width ?? window.innerWidth));
    const maxHeight = Math.max(minHeight, Math.floor(gridRect?.height ?? window.innerHeight));
    this.resizeState = {
      element,
      cardId,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    };
    element.classList.add('is-resizing');
    window.addEventListener('mousemove', this.onResizeMove);
    window.addEventListener('mouseup', this.onResizeEnd);
  }

  private handleResizeMove(event: MouseEvent): void {
    if (!this.resizeState) return;
    const { element, handle, startX, startY, startWidth, startHeight, minWidth, minHeight, maxWidth, maxHeight } = this.resizeState;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    let nextWidth = startWidth;
    let nextHeight = startHeight;

    if (handle.includes('e')) {
      nextWidth = startWidth + dx;
    }
    if (handle.includes('w')) {
      nextWidth = startWidth - dx;
    }
    if (handle.includes('s')) {
      nextHeight = startHeight + dy;
    }
    if (handle.includes('n')) {
      nextHeight = startHeight - dy;
    }

    nextWidth = Math.min(maxWidth, Math.max(minWidth, nextWidth));
    nextHeight = Math.min(maxHeight, Math.max(minHeight, nextHeight));

    element.style.width = `${nextWidth}px`;
    element.style.height = `${nextHeight}px`;
  }

  private stopResize(): void {
    if (!this.resizeState) return;
    const { element, cardId } = this.resizeState;
    element.classList.remove('is-resizing');
    if (cardId) {
      const rect = element.getBoundingClientRect();
      this.layoutDimensions = {
        ...this.layoutDimensions,
        [cardId]: { width: Math.round(rect.width), height: Math.round(rect.height) }
      };
      this.persistLayoutPreferences();
      this.dashboardData.saveLayout(this.buildLayoutPayload()).subscribe({
        next: response => {
        this.layoutOrder = this.normalizeLayoutWithHidden(
          response.cardOrder,
          response.hiddenCards,
          this.layoutOrder
        );
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = response.dimensions ?? {};
        this.persistLayoutPreferences();
        },
        error: () => {
          // Keep local changes if server update fails.
        }
      });
    }
    this.resizeState = null;
    window.removeEventListener('mousemove', this.onResizeMove);
    window.removeEventListener('mouseup', this.onResizeEnd);
  }

  private getCardContentConstraints(element: HTMLElement) {
    // Measure header + body so cards keep enough room for their visible content.
    const header = element.querySelector('.card-header') as HTMLElement | null;
    const body = element.querySelector('.card-body') as HTMLElement | null;
    const headerWidth = header?.scrollWidth ?? 0;
    const bodyWidth = body?.scrollWidth ?? 0;
    const minWidth = Math.ceil(Math.max(headerWidth, bodyWidth, element.scrollWidth));
    const headerHeight = header?.scrollHeight ?? 0;
    const bodyHeight = body?.scrollHeight ?? 0;
    const minHeight = Math.ceil(Math.max(headerHeight + bodyHeight, element.scrollHeight));
    return { minWidth, minHeight };
  }

  private loadChartVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = window.localStorage.getItem(this.chartVisibilityStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { revenue?: boolean; growth?: boolean; order?: string[] };
      if (typeof parsed.revenue === 'boolean') this.showRevenueChart = parsed.revenue;
      if (typeof parsed.growth === 'boolean') this.showCustomerGrowthChart = parsed.growth;
      if (Array.isArray(parsed.order)) {
        const filtered = parsed.order.filter(item => this.chartIdTypeGuard(item));
        if (filtered.length) {
          this.chartOrder = filtered;
        }
      }
      this.hasLocalChartPreference = true;
    } catch {
      // Ignore invalid local storage values.
    }
  }

  private persistChartVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const payload = {
      revenue: this.showRevenueChart,
      growth: this.showCustomerGrowthChart,
      order: this.chartOrder
    };
    window.localStorage.setItem(this.chartVisibilityStorageKey, JSON.stringify(payload));
    this.hasLocalChartPreference = true;
  }

  private loadKpiOrder(): string[] {
    if (!isPlatformBrowser(this.platformId)) return [...this.defaultKpiOrder];
    try {
      const stored = window.localStorage.getItem(this.kpiOrderStorageKey);
      if (!stored) return [...this.defaultKpiOrder];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed;
      }
    } catch {
      // Ignore invalid local storage values.
    }
    return [...this.defaultKpiOrder];
  }

  private persistKpiOrder(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.localStorage.setItem(this.kpiOrderStorageKey, JSON.stringify(this.kpiOrder()));
  }

  protected getCardSizeClass(cardId: string): string {
    return `size-${this.layoutSizes[cardId] ?? this.defaultCardSizes[cardId] ?? 'md'}`;
  }

  protected getChartSizeClass(chartId: ChartId): string {
    return `size-${this.layoutSizes[chartId] ?? this.defaultChartSizes[chartId] ?? 'md'}`;
  }

  protected getCardDimensions(cardId: string): { width?: string; height?: string } | null {
    const dimensions = this.layoutDimensions[cardId];
    if (!dimensions) return null;
    if (cardId === 'my-tasks') {
      return { height: `${dimensions.height}px` };
    }
    return null;
  }

  protected toggleCardSize(cardId: string): void {
    // Resizing/maximizing is disabled; keep sizes locked to defaults.
  }

  protected isChartVisible(chartId: ChartId): boolean {
    return chartId === 'revenue' ? this.showRevenueChart : this.showCustomerGrowthChart;
  }

  protected onChartVisibilityChange(chartId: ChartId, visible: boolean): void {
    if (chartId === 'revenue') {
      this.showRevenueChart = visible;
    } else {
      this.showCustomerGrowthChart = visible;
    }
    this.persistChartVisibility();
  }

  protected setPriorityFilter(
    filter: 'all' | 'overdue' | 'today' | 'decisions' | 'new-leads' | 'at-risk' | 'no-next-step'
  ): void {
    this.priorityFilter.set(this.priorityFilter() === filter ? 'all' : filter);
  }

  protected onPriorityComplete(item: PriorityStreamItem): void {
    if (item.type === 'task') {
      this.router.navigate(['/app/activities', item.id, 'edit']);
      return;
    }

    if (item.type === 'lead') {
      const subject = item.title ? `Follow up: ${item.title}` : 'Lead follow-up';
      this.router.navigate(['/app/activities/new'], {
        queryParams: {
          relatedType: 'Lead',
          relatedId: item.id,
          subject,
          leadFirstTouchDueAtUtc: item.leadFirstTouchDueAtUtc ?? undefined
        }
      });
      return;
    }

    if (item.type === 'decision') {
      this.router.navigate(['/app/decisions'], {
        queryParams: {
          status: 'Pending',
          focus: item.id
        }
      });
      return;
    }

    const subject = item.title ? `Follow up: ${item.title}` : 'Opportunity follow-up';
    this.router.navigate(['/app/activities/new'], {
      queryParams: {
        relatedType: 'Opportunity',
        relatedId: item.id,
        subject
      }
    });
  }

  protected openCostBreakdownDialog(): void {
    this.costBreakdownDialogOpen = true;
  }

  protected closeCostBreakdownDialog(): void {
    this.costBreakdownDialogOpen = false;
  }

  protected toggleCostBreakdownSortDirection(): void {
    this.costBreakdownSortDirection = this.costBreakdownSortDirection === 'asc' ? 'desc' : 'asc';
  }

  protected costBreakdownSorted(): DashboardSummary['costOfNotKnowingBreakdown'] {
    const items = [...(this.summary()?.costOfNotKnowingBreakdown ?? [])];
    const direction = this.costBreakdownSortDirection === 'asc' ? 1 : -1;
    const key = this.costBreakdownSortKey;

    return items.sort((a, b) => {
      if (key === 'name') {
        return a.opportunityName.localeCompare(b.opportunityName) * direction;
      }
      if (key === 'stage') {
        return a.stage.localeCompare(b.stage) * direction;
      }
      if (key === 'amount') {
        return (a.amount - b.amount) * direction;
      }
      return (a.costOfNotKnowingValue - b.costOfNotKnowingValue) * direction;
    });
  }

  private initCharts(summary: DashboardSummary): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#64748b';
    const textColorSecondary = '#94a3b8';
    const surfaceBorder = 'rgba(148, 163, 184, 0.1)';
    
    // Gradient colors
    const primaryColor = '#667eea';
    const cyanColor = '#06b6d4';
    const purpleColor = '#a855f7';
    const successColor = '#22c55e';
    const orangeColor = '#f97316';

    const revenueSeries = summary.revenueByMonth;
    const customerSeries = summary.customerGrowth;
    const conversionSeries = summary.conversionTrend.length
      ? summary.conversionTrend
      : [
          { label: 'W1', value: 18 },
          { label: 'W2', value: 22 },
          { label: 'W3', value: 20 },
          { label: 'W4', value: 28 },
          { label: 'W5', value: 32 },
          { label: 'W6', value: 38 }
        ];
    const costTrendSeries = summary.costOfNotKnowingTrend.length
      ? summary.costOfNotKnowingTrend
      : [
          { label: 'W1', value: 52000 },
          { label: 'W2', value: 48000 },
          { label: 'W3', value: 45000 },
          { label: 'W4', value: 42000 },
          { label: 'W5', value: 39000 },
          { label: 'W6', value: 41000 },
          { label: 'W7', value: 37000 },
          { label: 'W8', value: 35000 }
        ];
    const pipelineSeries = summary.pipelineValue.length
      ? summary.pipelineValue
      : [
          { stage: 'Qualification', count: 0, value: 125000 },
          { stage: 'Proposal', count: 0, value: 196000 },
          { stage: 'Negotiation', count: 0, value: 180000 },
          { stage: 'Closed Won', count: 0, value: 312000 }
        ];
    const activitySeries = summary.activityBreakdown.length
      ? summary.activityBreakdown
      : [
          { type: 'Call', count: 25, percentage: 25 },
          { type: 'Email', count: 35, percentage: 35 },
          { type: 'Meeting', count: 20, percentage: 20 },
          { type: 'Task', count: 20, percentage: 20 }
        ];

    // Revenue Chart (Area)
    this.revenueChartData = {
      labels: revenueSeries.map(item => item.label),
      datasets: [
        {
          label: 'Revenue',
          data: revenueSeries.map(item => Number(item.value)),
          fill: true,
          borderColor: primaryColor,
          backgroundColor: this.createGradient(primaryColor, 0.3),
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
    
    this.revenueChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: (ctx: any) => `$${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `$${(value / 1000)}k`
          }
        }
      }
    };

    // Customer Growth (Bar)
    this.customerGrowthData = {
      labels: customerSeries.map(item => item.label),
      datasets: [
        {
          label: 'New Customers',
          data: customerSeries.map(item => Number(item.value)),
          backgroundColor: [
            `${cyanColor}cc`,
            `${primaryColor}cc`,
            `${purpleColor}cc`,
            `${successColor}cc`,
            `${primaryColor}cc`,
            `${cyanColor}cc`
          ],
          borderRadius: 8,
          borderSkipped: false
        }
      ]
    };
    
    this.customerGrowthOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { color: textColorSecondary }
        }
      }
    };

    // Activity Donut
    this.activityDonutData = {
      labels: activitySeries.map(item => `${item.type}${item.type.endsWith('s') ? '' : 's'}`),
      datasets: [
        {
          data: activitySeries.map(item => item.percentage ?? item.count),
          backgroundColor: [cyanColor, purpleColor, primaryColor, successColor],
          borderWidth: 0,
          hoverOffset: 8
        }
      ]
    };
    
    this.activityDonutOptions = {
      cutout: '70%',
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true,
            padding: 16,
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `${ctx.label}: ${ctx.raw}%`
          }
        }
      }
    };

    // Pipeline Chart (Horizontal Bar)
    this.pipelineChartData = {
      labels: pipelineSeries.map(item => item.stage),
      datasets: [
        {
          label: 'Value',
          data: pipelineSeries.map(item => Number(item.value)),
          backgroundColor: [
            cyanColor,
            purpleColor,
            orangeColor,
            successColor
          ],
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    };
    
    this.pipelineChartOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `$${ctx.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `$${(value / 1000)}k`
          }
        },
        y: {
          grid: { display: false },
          ticks: { color: textColor, font: { weight: 500 } }
        }
      }
    };

    // Conversion Trend (Line)
    this.conversionChartData = {
      labels: conversionSeries.map(item => item.label),
      datasets: [
        {
          label: 'Conversion Rate',
          data: conversionSeries.map(item => Number(item.value)),
          fill: false,
          borderColor: successColor,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: successColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    };
    
    this.conversionChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `${ctx.raw}%`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: { 
            color: textColorSecondary,
            callback: (value: number) => `${value}%`
          },
          min: 0,
          max: 50
        }
      }
    };

    // Cost of Not Knowing Trend (Line)
    this.costTrendChartData = {
      labels: costTrendSeries.map(item => item.label),
      datasets: [
        {
          label: 'Exposure',
          data: costTrendSeries.map(item => Number(item.value)),
          fill: false,
          borderColor: orangeColor,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: orangeColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };

    this.costTrendChartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#64748b',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx: any) => `${this.formatCurrency(ctx.raw)}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColorSecondary }
        },
        y: {
          grid: { color: surfaceBorder },
          ticks: {
            color: textColorSecondary,
            callback: (value: number) => `$${(value / 1000)}k`
          }
        }
      }
    };
  }

  private loadLayoutPreferences(): {
    order: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hasLocalPreference: boolean;
  } {
    const defaultOrder = this.getLayoutDefaultOrder();
    if (!isPlatformBrowser(this.platformId)) {
      return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
    }
    try {
      const stored = window.localStorage.getItem(this.layoutStorageKey);
      if (!stored) {
        return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
      }
      const parsed = JSON.parse(stored) as { dimensions?: Record<string, { width: number; height: number }> };
      const dimensions = parsed?.dimensions ?? {};
      const hasLocalPreference = Object.keys(dimensions).length > 0;
      return { order: defaultOrder, sizes: {}, dimensions, hasLocalPreference };
    } catch {
      return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
    }
  }

  private persistLayoutPreferences(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.localStorage.setItem(this.layoutStorageKey, JSON.stringify({
      dimensions: this.layoutDimensions ?? {}
    }));
    this.hasLocalLayoutPreference = Object.keys(this.layoutDimensions ?? {}).length > 0;
  }

  private shouldHonorServerLayout(
    serverOrder: string[],
    requestedOrder: string[],
    defaultOrder: string[]
  ): boolean {
    if (requestedOrder.length === 0 && serverOrder.length > 0) return false;
    if (requestedOrder.some(id => !serverOrder.includes(id))) return false;
    if (!this.hasLocalLayoutPreference) return true;
    if (this.areArraysEqual(serverOrder, requestedOrder)) return true;
    return !this.areArraysEqual(serverOrder, defaultOrder);
  }

  private ensureSizeDefaults(): void {
    // Force locked sizes regardless of previous server data.
    this.layoutSizes = this.buildDefaultSizeMap();
  }

  private areArraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((value, index) => value === b[index]);
  }

  private createGradient(color: string, alpha: number): string {
    return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
  }

  protected statusSeverity(status: Customer['status']) {
    switch (status) {
      case 'Lead':
        return 'info';
      case 'Prospect':
        return 'warn';
      default:
        return 'info';
    }
  }

  protected activitySeverity(status: Activity['status']) {
    if (status === 'Overdue') return 'danger';
    if (status === 'Upcoming') return 'info';
    return 'info';
  }
  
  protected getFunnelWidth(index: number): number {
    const widths = [100, 75, 50];
    return widths[index] ?? 50;
  }
  
  protected getConversionRate(index: number): number {
    const breakdown = this.customerBreakdown();
    if (index >= breakdown.length - 1) return 0;
    const current = breakdown[index].value;
    const next = breakdown[index + 1].value;
    if (current === 0) return 0;
    return Math.round((next / current) * 100);
  }
  
  protected getTotalConversion(): number {
    const breakdown = this.customerBreakdown();
    if (breakdown.length < 2) return 0;
    const first = breakdown[0].value;
    const last = breakdown[breakdown.length - 1].value;
    if (first === 0) return 0;
    return Math.round((last / first) * 100);
  }
  
  protected getHealthProgress(): string {
    const completion = this.activityStats().completion;
    const circumference = 2 * Math.PI * 54;
    const progress = (completion / 100) * circumference;
    return `${progress} ${circumference}`;
  }
  
  protected getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      'Call': 'pi-phone',
      'Email': 'pi-envelope',
      'Meeting': 'pi-video',
      'Task': 'pi-check-square'
    };
    return icons[type] || 'pi-circle';
  }
  
  protected getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      'Call': 'cyan',
      'Email': 'purple',
      'Meeting': 'primary',
      'Task': 'success'
    };
    return colors[type] || 'primary';
  }

  protected getTaskDueLabel(task: Activity): string {
    if (!task.dueDateUtc) {
      return 'No due date';
    }
    const due = this.parseUtcDate(task.dueDateUtc);
    const today = new Date();
    const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return `Due ${due.toLocaleDateString()}`;
  }

  protected asLocalDate(value?: string | Date | null): Date | null {
    if (!value) {
      return null;
    }
    // Normalize backend timestamps before DatePipe renders them in local time.
    return value instanceof Date ? value : this.parseUtcDate(value);
  }

  protected formatTruthCoverage(value?: number | null): string {
    if (value === null || value === undefined) {
      return '--';
    }
    return `${Math.round(value * 100)}%`;
  }

  protected formatTimeToTruth(value?: number | null): string {
    if (value === null || value === undefined) {
      return '--';
    }
    return `${value.toFixed(1)}d`;
  }

  protected getTaskDueClass(task: Activity): string {
    if (!task.dueDateUtc) {
      return 'due-neutral';
    }
    const due = this.parseUtcDate(task.dueDateUtc);
    const today = new Date();
    const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'due-overdue';
    if (diffDays === 0) return 'due-today';
    if (diffDays <= 7) return 'due-soon';
    return 'due-upcoming';
  }

  protected getTaskPriorityLabel(task: Activity): string {
    return task.priority ?? 'Normal';
  }

  protected getTaskSummaryCounts(): { overdue: number; today: number; week: number } {
    // Use UTC parsing to keep date buckets consistent across browsers.
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return this.myTasks().reduce(
      (acc, task) => {
        if (!task.dueDateUtc) return acc;
        const due = this.parseUtcDate(task.dueDateUtc);
        const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
        const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) acc.overdue += 1;
        else if (diffDays === 0) acc.today += 1;
        else if (diffDays <= 7) acc.week += 1;
        return acc;
      },
      { overdue: 0, today: 0, week: 0 }
    );
  }

  private getTaskPriorityScore(task: Activity): number {
    if (!task.dueDateUtc) {
      return task.status === 'Overdue' ? 95 : 60;
    }
    const due = this.parseUtcDate(task.dueDateUtc);
    const today = new Date();
    const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 100;
    if (diffDays === 0) return 90;
    if (diffDays <= 2) return 80;
    if (diffDays <= 7) return 70;
    return 60;
  }

  private formatShortDate(value: string): string {
    const date = this.parseUtcDate(value);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  private parseUtcDate(value: string): Date {
    // Ensure UTC interpretation when the API omits a timezone offset.
    return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
  }


  private normalizeLayout(order: string[], fallback: string[]): string[] {
    const known = new Set(this.cardCatalog.map((card) => card.id));
    // When a role-level default pack exists, treat it as the allowlist for this user.
    const allowed = this.roleDefaultLayout.length > 0
      ? new Set(fallback.filter((id) => known.has(id)))
      : known;

    const filtered = order.filter(id => allowed.has(id));
    if (filtered.length) {
      return filtered;
    }
    return fallback.filter(id => allowed.has(id));
  }

  private normalizeLayoutWithHidden(
    order: string[] | undefined,
    hiddenCards: string[] | undefined,
    fallback: string[]
  ): string[] {
    const hidden = new Set(hiddenCards ?? []);
    const visibleFallback = fallback.filter(id => !hidden.has(id));
    const visibleOrder = (order ?? []).filter(id => !hidden.has(id));
    return this.normalizeLayout(visibleOrder, visibleFallback);
  }

  private applyRoleDefault(order: string[], fallback: string[]): string[] {
    if (this.roleDefaultLayout.length === 0) {
      return order;
    }

    const known = new Set(this.cardCatalog.map((card) => card.id));
    const allowed = new Set(fallback.filter((id) => known.has(id)));
    const filtered = order.filter(id => allowed.has(id));
    if (filtered.length) {
      return filtered;
    }
    return [...fallback];
  }

  private getOrderedCards(order: string[]) {
    const map = new Map(this.cardCatalog.map(card => [card.id, card]));
    return order.map(id => map.get(id)).filter(Boolean) as Array<{ id: string; label: string; icon: string }>;
  }

  private buildLayoutPayload(orderOverride?: string[]) {
    const cardOrder = orderOverride ?? this.layoutOrder;
    const defaultOrder = this.getLayoutDefaultOrder();
    const hiddenCards = defaultOrder.filter(id => !cardOrder.includes(id));
    return {
      cardOrder,
      sizes: this.buildDefaultSizeMap(),
      dimensions: this.buildLayoutDimensionsPayload(),
      hiddenCards
    };
  }

  private buildDefaultLayoutPayload(orderOverride?: string[]) {
    const cardOrder = orderOverride ?? [];
    const canonical = this.cardCatalog.map(card => card.id);
    const hiddenCards = canonical.filter(id => !cardOrder.includes(id));
    return {
      cardOrder,
      sizes: this.buildDefaultSizeMap(),
      dimensions: this.buildLayoutDimensionsPayload(),
      hiddenCards
    };
  }

  private getLayoutDefaultOrder(): string[] {
    const known = new Set(this.cardCatalog.map((card) => card.id));
    if (this.roleDefaultLayout.length > 0) {
      const sanitized = this.roleDefaultLayout.filter((id) => known.has(id));
      if (sanitized.length > 0) {
        return sanitized;
      }
    }
    return this.cardCatalog.map(card => card.id);
  }

  private buildDefaultSizeMap() {
    return {
      ...this.defaultCardSizes,
      ...this.defaultChartSizes
    };
  }

  private buildLayoutDimensionsPayload(): Record<string, { width: number; height: number }> {
    const dimensions = this.layoutDimensions ?? {};
    if (!dimensions['my-tasks']) return {};
    return { 'my-tasks': dimensions['my-tasks'] };
  }

  private applyRoleDefaultCharts(): void {
    if (this.hasLocalChartPreference) {
      return;
    }

    this.showRevenueChart = !this.roleDefaultHiddenCharts.has('revenue');
    this.showCustomerGrowthChart = !this.roleDefaultHiddenCharts.has('growth');
  }

  private refreshSelectableCards(): void {
    const next = this.getSelectableCards();
    this.selectableCards.set(next);
  }

  private resolvePackName(packName?: string | null, roleLevel?: number | null): string {
    const trimmed = packName?.trim();
    if (trimmed) {
      return trimmed;
    }

    if (roleLevel && roleLevel > 0) {
      return `H${roleLevel} Pack`;
    }

    if (this.roleDefaultLevel && this.roleDefaultLevel > 0) {
      return `H${this.roleDefaultLevel} Pack`;
    }

      return 'H1 Pack';
  }

  private resetChartPreference(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.localStorage.removeItem(this.chartVisibilityStorageKey);
    this.hasLocalChartPreference = false;
  }

  private loadCurrencyContext() {
    this.referenceData
      .getCurrencies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        const active = items.filter((currency) => currency.isActive);
        this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
        if (!this.currencyCode() && this.currencyFallback) {
          this.currencyCode.set(this.currencyFallback);
        }
      });

    this.settingsService
      .getSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (settings) => {
          const resolved = settings.currency || this.currencyFallback;
          if (resolved) {
            this.currencyCode.set(resolved);
          }
        }
      });
  }

  protected resolveCurrencyCode() {
    return this.currencyCode() || this.currencyFallback || '';
  }

  private formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.resolveCurrencyCode() || 'USD',
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }

}
