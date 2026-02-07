import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary } from '../models/user-admin.model';
import { DashboardDataService } from '../../dashboard/services/dashboard-data.service';

interface DashboardCardOption {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-packs-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    BreadcrumbsComponent
  ],
  templateUrl: './dashboard-packs.page.html',
  styleUrl: './dashboard-packs.page.scss'
})
export class DashboardPacksPage {
  private readonly rolesService = inject(UserAdminDataService);
  private readonly dashboardData = inject(DashboardDataService);
  private readonly toastService = inject(AppToastService);

  protected readonly canManageDefaults = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return tokenHasPermission(payload, PERMISSION_KEYS.administrationManage);
  });

  protected readonly loadingRoles = signal(true);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly availableLevels = computed(() => {
    const levels = this.roles()
      .map(role => role.level ?? null)
      .filter((level): level is number => typeof level === 'number' && level > 0);
    const unique = Array.from(new Set(levels)).sort((a, b) => a - b);
    return unique.map(level => ({ label: `L${level}`, value: level }));
  });

  protected readonly selectedLevel = signal<number | null>(null);
  protected readonly selectedCards = signal<Set<string>>(new Set());
  protected readonly selectedCharts = signal<Set<string>>(new Set());
  protected readonly defaultOrder = signal<string[]>([]);
  protected readonly loadingDefaults = signal(false);
  protected readonly savingDefaults = signal(false);

  protected readonly cardCatalog: DashboardCardOption[] = [
    { id: 'pipeline', label: 'Pipeline by Stage', icon: 'pi pi-filter' },
    { id: 'truth-metrics', label: 'Truth Metrics', icon: 'pi pi-verified' },
    { id: 'risk-register', label: 'Risk Register', icon: 'pi pi-exclamation-triangle' },
    { id: 'confidence-forecast', label: 'Confidence Forecast', icon: 'pi pi-chart-line' },
    { id: 'accounts', label: 'Recent Accounts', icon: 'pi pi-building' },
    { id: 'manager-health', label: 'Pipeline Health', icon: 'pi pi-shield' },
    { id: 'activity-mix', label: 'Activity Mix', icon: 'pi pi-chart-pie' },
    { id: 'conversion', label: 'Conversion Trend', icon: 'pi pi-percentage' },
    { id: 'top-performers', label: 'Top Performers', icon: 'pi pi-trophy' },
    { id: 'my-tasks', label: 'My Task', icon: 'pi pi-check-square' },
    { id: 'timeline', label: 'Activity Timeline', icon: 'pi pi-clock' },
    { id: 'health', label: 'Business Health', icon: 'pi pi-heart' }
  ];
  protected readonly chartCatalog: DashboardCardOption[] = [
    { id: 'revenue', label: 'Revenue Trend', icon: 'pi pi-chart-line' },
    { id: 'growth', label: 'Customer Growth', icon: 'pi pi-users' }
  ];

  protected readonly cardOptions = computed(() =>
    this.cardCatalog.map(card => ({
      ...card,
      checked: this.selectedCards().has(card.id)
    }))
  );
  protected readonly chartOptions = computed(() =>
    this.chartCatalog.map(chart => ({
      ...chart,
      checked: this.selectedCharts().has(chart.id)
    }))
  );

  constructor() {
    this.loadRoles();
  }

  protected onLevelChange(level: number | null) {
    this.selectedLevel.set(level);
    if (!level) {
      this.selectedCards.set(new Set());
      this.defaultOrder.set([]);
      return;
    }
    this.loadDefaultLayout(level);
  }

  protected toggleCard(cardId: string, checked: boolean) {
    const next = new Set(this.selectedCards());
    if (checked) {
      next.add(cardId);
    } else {
      next.delete(cardId);
    }
    this.selectedCards.set(next);
  }

  protected toggleChart(chartId: string, checked: boolean) {
    const next = new Set(this.selectedCharts());
    if (checked) {
      next.add(chartId);
    } else {
      next.delete(chartId);
    }
    this.selectedCharts.set(next);
  }

  protected onCardClick(cardId: string, checked: boolean, event: Event) {
    const target = event.target as HTMLElement | null;
    if (target?.closest('.p-checkbox')) {
      return;
    }
    this.toggleCard(cardId, !checked);
  }

  protected onChartClick(chartId: string, checked: boolean, event: Event) {
    const target = event.target as HTMLElement | null;
    if (target?.closest('.p-checkbox')) {
      return;
    }
    this.toggleChart(chartId, !checked);
  }

  protected saveDefaults() {
    if (!this.canManageDefaults()) {
      this.toastService.show('error', 'You do not have permission to update defaults.', 3000);
      return;
    }
    const level = this.selectedLevel();
    if (!level) {
      this.toastService.show('error', 'Select a role level to save.', 3000);
      return;
    }
    const order = this.buildOrder();
    if (order.length === 0) {
      this.toastService.show('error', 'Select at least one card.', 3000);
      return;
    }
    this.savingDefaults.set(true);
    const selectedCharts = this.selectedCharts();
    const hiddenCharts = this.chartCatalog.map(chart => chart.id).filter(id => !selectedCharts.has(id));
    this.dashboardData
      .saveDefaultLayout({
        roleLevel: level,
        cardOrder: order,
        sizes: {},
        dimensions: {},
        hiddenCards: [
          ...this.cardCatalog.map(card => card.id).filter(id => !order.includes(id)),
          ...hiddenCharts
        ]
      })
      .subscribe({
        next: () => {
          this.savingDefaults.set(false);
          this.defaultOrder.set(order);
          this.toastService.show('success', `Default L${level} pack saved.`, 3000);
        },
        error: (error) => {
          this.savingDefaults.set(false);
          const message = typeof error?.error === 'string' && error.error.trim().length > 0
            ? error.error
            : 'Unable to save default pack.';
          this.toastService.show('error', message, 3500);
        }
      });
  }

  private buildOrder(): string[] {
    const selected = this.selectedCards();
    const current = this.defaultOrder();
    if (current.length === 0) {
      return this.cardCatalog.map(card => card.id).filter(id => selected.has(id));
    }
    const inOrder = current.filter(id => selected.has(id));
    const missing = this.cardCatalog
      .map(card => card.id)
      .filter(id => selected.has(id) && !inOrder.includes(id));
    return [...inOrder, ...missing];
  }

  private loadRoles() {
    this.loadingRoles.set(true);
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles ?? []);
        this.loadingRoles.set(false);
        const levels = this.availableLevels();
        if (levels.length > 0 && !this.selectedLevel()) {
          this.onLevelChange(levels[0].value);
        }
      },
      error: () => {
        this.loadingRoles.set(false);
        this.roles.set([]);
      }
    });
  }

  private loadDefaultLayout(level: number) {
    this.loadingDefaults.set(true);
    this.dashboardData.getDefaultLayoutForLevel(level).subscribe({
      next: (response) => {
        const order = response.cardOrder ?? [];
        const hidden = response.hiddenCards ?? [];
        this.defaultOrder.set(order);
        this.selectedCards.set(new Set(order));
        const selectedCharts = this.chartCatalog
          .map(chart => chart.id)
          .filter(id => !hidden.includes(id));
        this.selectedCharts.set(new Set(selectedCharts));
        this.loadingDefaults.set(false);
      },
      error: () => {
        this.defaultOrder.set([]);
        this.selectedCards.set(new Set());
        this.selectedCharts.set(new Set());
        this.loadingDefaults.set(false);
      }
    });
  }
}
