import { DatePipe, DecimalPipe, NgFor, NgIf, CurrencyPipe, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, NgTemplateOutlet, NgStyle } from '@angular/common';
import { Component, computed, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderListModule } from 'primeng/orderlist';

import { DashboardDataService } from '../services/dashboard-data.service';
import { DashboardSummary, ManagerPipelineHealth } from '../models/dashboard.model';
import { Customer } from '../../customers/models/customer.model';
import { Activity } from '../../activities/models/activity.model';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CommandPaletteService } from '../../../../core/command-palette/command-palette.service';

type ChartId = 'revenue' | 'growth';

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
    churnRate: 0
  };
  private readonly summarySignal = toSignal(this.dashboardData.getSummary(), { initialValue: this.emptySummary });
  private readonly emptyManagerHealth: ManagerPipelineHealth = {
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
  private readonly managerHealthSignal = toSignal(this.dashboardData.getManagerPipelineHealth(), { initialValue: this.emptyManagerHealth });

  protected readonly summary = computed(() => this.summarySignal() ?? this.emptySummary);
  protected readonly managerHealth = computed(() => this.managerHealthSignal() ?? this.emptyManagerHealth);

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
  
  protected readonly recentAccounts = computed(() => this.summary()?.recentCustomers?.slice(0, 5) ?? []);
  protected readonly upcomingActivities = computed(() => this.summary()?.activitiesNextWeek?.slice(0, 6) ?? []);
  protected readonly myTasks = computed(() => this.summary()?.myTasks?.slice(0, 6) ?? []);
  protected readonly topPerformers = computed(() => this.summary()?.topPerformers ?? []);
  protected readonly newlyAssignedLeads = computed(() => this.summary()?.newlyAssignedLeads?.slice(0, 6) ?? []);
  protected readonly atRiskDeals = computed(() => this.summary()?.atRiskDeals?.slice(0, 6) ?? []);
  protected readonly activityBreakdown = computed(() => this.summary()?.activityBreakdown ?? []);
  protected readonly pipelineValue = computed(() => this.summary()?.pipelineValue ?? []);
  protected readonly managerPipelineByStage = computed(() => this.managerHealth().pipelineByStage ?? []);
  protected readonly managerReviewQueue = computed(() => this.managerHealth().reviewQueue ?? []);
  protected readonly managerHealthStats = computed(() => {
    const data = this.managerHealth();
    return [
      { label: 'Missing next step', value: data.missingNextStepCount, tone: 'danger' },
      { label: 'Next step overdue', value: data.nextStepOverdueCount, tone: 'warn' },
      { label: 'No recent activity', value: data.noRecentActivityCount, tone: 'warn' },
      { label: 'Close date passed', value: data.closeDateOverdueCount, tone: 'danger' },
      { label: 'Stuck in stage', value: data.stuckStageCount, tone: 'muted' }
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

  protected layoutOrder: string[] = [];
  protected layoutDialogOpen = false;
  protected layoutDraft: Array<{ id: string; label: string; icon: string }> = [];
  protected layoutSizes: Record<string, 'sm' | 'md' | 'lg'> = {};
  protected layoutDimensions: Record<string, { width: number; height: number }> = {};
  private hasLocalLayoutPreference = false;
  // Locked size map so customize layout never inflates card heights.
  private readonly defaultCardSizes: Record<string, 'sm' | 'md' | 'lg'> = {
    pipeline: 'lg',
    accounts: 'md',
    'new-leads': 'md',
    'at-risk-deals': 'md',
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

  protected readonly cardCatalog = [
    { id: 'pipeline', label: 'Pipeline by Stage', icon: 'pi pi-filter' },
    { id: 'accounts', label: 'Recent Accounts', icon: 'pi pi-building' },
    { id: 'new-leads', label: 'Newly Assigned Leads', icon: 'pi pi-user-plus' },
    { id: 'at-risk-deals', label: 'At-Risk Deals', icon: 'pi pi-exclamation-triangle' },
    { id: 'manager-health', label: 'Pipeline Health', icon: 'pi pi-shield' },
    { id: 'activity-mix', label: 'Activity Mix', icon: 'pi pi-chart-pie' },
    { id: 'conversion', label: 'Conversion Trend', icon: 'pi pi-percentage' },
    { id: 'top-performers', label: 'Top Performers', icon: 'pi pi-trophy' },
    { id: 'my-tasks', label: 'My Tasks', icon: 'pi pi-check-square' },
    { id: 'timeline', label: 'Activity Timeline', icon: 'pi pi-clock' },
    { id: 'health', label: 'Business Health', icon: 'pi pi-heart' }
  ];
  protected readonly chartCatalog: Array<{ id: ChartId; label: string; icon: string }> = [
    { id: 'revenue', label: 'Revenue Trend', icon: 'pi pi-chart-line' },
    { id: 'growth', label: 'Customer Growth', icon: 'pi pi-users' }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const summary = this.summary();
        this.initCharts(summary);
      });
    }
    this.kpiOrder.set(this.loadKpiOrder());
  }

  ngOnInit(): void {
    const { order, sizes, dimensions, hasLocalPreference } = this.loadLayoutPreferences();
    this.layoutOrder = order;
    this.layoutSizes = this.buildDefaultSizeMap();
    this.layoutDimensions = dimensions ?? {};
    this.hasLocalLayoutPreference = hasLocalPreference;
    this.loadChartVisibility();

    this.dashboardData.getLayout().subscribe(({ cardOrder, sizes, dimensions, hiddenCards }) => {
      const defaultOrder = this.dashboardData.getDefaultLayout();
      const normalized = this.normalizeLayoutWithHidden(cardOrder, hiddenCards, defaultOrder);
      const serverHasState = (hiddenCards?.length ?? 0) > 0
        || Object.keys(sizes ?? {}).length > 0
        || Object.keys(dimensions ?? {}).length > 0
        || !this.areArraysEqual(normalized, defaultOrder);
      if (this.hasLocalLayoutPreference && !serverHasState) {
        this.dashboardData.saveLayout(this.buildLayoutPayload()).subscribe();
        return;
      }
      this.layoutOrder = normalized;
      this.layoutSizes = this.buildDefaultSizeMap();
      this.layoutDimensions = {};
      this.persistLayoutPreferences();
    });
  }

  protected onQuickAdd(): void {
    this.commandPaletteService.requestQuickAdd('lead');
  }

  protected openLayoutDialog(): void {
    this.layoutDraft = this.getOrderedCards(this.layoutOrder);
    this.layoutDialogOpen = true;
  }

  protected isCardVisible(cardId: string): boolean {
    return this.layoutOrder.includes(cardId);
  }

  protected onCardVisibilityChange(cardId: string, visible: boolean): void {
    // Keep the layout list as the single source of truth for which cards are displayed.
    const defaultOrder = this.dashboardData.getDefaultLayout();
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
    const defaultOrder = this.dashboardData.getDefaultLayout();
    const requested = this.normalizeLayout(order, defaultOrder);
    this.layoutOrder = requested;
    this.ensureSizeDefaults();
    this.persistLayoutPreferences();
    this.dashboardData.saveLayout(this.buildLayoutPayload(requested)).subscribe({
      next: response => {
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, requested, defaultOrder)
          ? normalized
          : requested;
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
        this.layoutDialogOpen = false;
      },
      error: () => {
        this.layoutOrder = requested;
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDialogOpen = false;
      }
    });
  }

  protected resetLayout(): void {
    const order = this.dashboardData.getDefaultLayout();
    this.dashboardData.saveLayout(this.buildLayoutPayload(order)).subscribe({
      next: response => {
        const defaultOrder = this.dashboardData.getDefaultLayout();
        this.layoutOrder = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
      },
      error: () => {
        this.layoutOrder = this.normalizeLayout(order, order);
        this.layoutSizes = {};
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
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
        const defaultOrder = this.dashboardData.getDefaultLayout();
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
          ? normalized
          : this.normalizeLayout(nextOrder, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
      },
      error: () => {
        const defaultOrder = this.dashboardData.getDefaultLayout();
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
        const defaultOrder = this.dashboardData.getDefaultLayout();
        const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
        this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
          ? normalized
          : this.normalizeLayout(nextOrder, defaultOrder);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = {};
        this.persistLayoutPreferences();
      },
      error: () => {
        const defaultOrder = this.dashboardData.getDefaultLayout();
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
    // Resizing disabled: keep cards at fixed dimensions.
    return;
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
    const maxHeight = Math.max(minHeight, Math.floor(minHeight * 1.5));
    const cardId = element.dataset['cardId'] ?? null;
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
          this.layoutDimensions = {};
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

    const revenueSeries = summary.revenueByMonth.length
      ? summary.revenueByMonth
      : [
          { label: 'Jul', value: 85000 },
          { label: 'Aug', value: 98000 },
          { label: 'Sep', value: 112000 },
          { label: 'Oct', value: 125000 },
          { label: 'Nov', value: 142000 },
          { label: 'Dec', value: 168000 }
        ];
    const customerSeries = summary.customerGrowth.length
      ? summary.customerGrowth
      : [
          { label: 'Jul', value: 35 },
          { label: 'Aug', value: 42 },
          { label: 'Sep', value: 48 },
          { label: 'Oct', value: 55 },
          { label: 'Nov', value: 62 },
          { label: 'Dec', value: 78 }
        ];
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
  }

  private loadLayoutPreferences(): {
    order: string[];
    sizes: Record<string, 'sm' | 'md' | 'lg'>;
    dimensions: Record<string, { width: number; height: number }>;
    hasLocalPreference: boolean;
  } {
    const defaultOrder = this.dashboardData.getDefaultLayout();
    if (!isPlatformBrowser(this.platformId)) {
      return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
    }
    // Keep layout state server-driven so it follows the user across devices.
    return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
  }

  private persistLayoutPreferences(): void {
    // No-op: layout persistence is handled by the API for cross-device consistency.
    this.hasLocalLayoutPreference = false;
  }

  private shouldHonorServerLayout(
    serverOrder: string[],
    requestedOrder: string[],
    defaultOrder: string[]
  ): boolean {
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
    const allowed = new Set(this.cardCatalog.map(card => card.id));
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

  private getOrderedCards(order: string[]) {
    const map = new Map(this.cardCatalog.map(card => [card.id, card]));
    return order.map(id => map.get(id)).filter(Boolean) as Array<{ id: string; label: string; icon: string }>;
  }

  private buildLayoutPayload(orderOverride?: string[]) {
    const cardOrder = orderOverride ?? this.layoutOrder;
    const defaultOrder = this.dashboardData.getDefaultLayout();
    const hiddenCards = defaultOrder.filter(id => !cardOrder.includes(id));
    return {
      cardOrder,
      sizes: this.buildDefaultSizeMap(),
      dimensions: {},
      hiddenCards
    };
  }

  private buildDefaultSizeMap() {
    return {
      ...this.defaultCardSizes,
      ...this.defaultChartSizes
    };
  }
}
