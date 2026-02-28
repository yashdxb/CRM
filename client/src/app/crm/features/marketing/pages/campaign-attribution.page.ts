import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import {
  AttributionExplainability,
  AttributionModel,
  AttributionSummaryItem,
  CampaignHealthScore,
  CampaignRecommendation
} from '../models/marketing.model';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';

@Component({
  selector: 'app-campaign-attribution-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TagModule, DialogModule, BreadcrumbsComponent],
  templateUrl: './campaign-attribution.page.html',
  styleUrl: './campaign-attribution.page.scss'
})
export class CampaignAttributionPage {
  protected readonly items = signal<AttributionSummaryItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly searchTerm = signal('');
  protected readonly selectedModel = signal<AttributionModel>('first_touch');
  protected readonly attributionModels: Array<{ label: string; value: AttributionModel }> = [
    { label: 'First-touch (source of truth)', value: 'first_touch' },
    { label: 'Last-touch (compare)', value: 'last_touch' },
    { label: 'Linear (compare)', value: 'linear' }
  ];
  protected readonly rowsPerPageOptions = [10, 20, 50];
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';

  protected readonly selectedCampaignId = signal<string | null>(null);
  protected readonly healthScore = signal<CampaignHealthScore | null>(null);
  protected readonly recommendations = signal<CampaignRecommendation[]>([]);
  protected readonly recommendationReason = signal<Record<string, string>>({});

  protected readonly explainabilityOpen = signal(false);
  protected readonly explainability = signal<AttributionExplainability | null>(null);
  protected readonly loadingExplainability = signal(false);

  protected readonly filteredItems = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.items();
    }

    return this.items().filter((item) =>
      item.campaignName.toLowerCase().includes(term) || item.status.toLowerCase().includes(term)
    );
  });
  protected readonly canExplainAttribution = computed(() => this.selectedModel() === 'first_touch');
  protected readonly totals = computed(() => {
    const rows = this.filteredItems();
    return {
      campaigns: rows.length,
      influenced: rows.reduce((sum, row) => sum + row.influencedOpportunities, 0),
      pipeline: rows.reduce((sum, row) => sum + row.influencedPipelineAmount, 0),
      won: rows.reduce((sum, row) => sum + row.wonRevenue, 0)
    };
  });

  protected readonly selectedCampaign = computed(() => {
    const selected = this.selectedCampaignId();
    if (!selected) return null;
    return this.items().find((item) => item.campaignId === selected) ?? null;
  });

  private readonly data = inject(MarketingDataService);
  private readonly toast = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);

  constructor() {
    this.loadCurrencyContext();
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.data.getAttributionSummary(this.selectedModel()).subscribe({
      next: (rows) => {
        this.items.set(rows);
        this.loading.set(false);

        if (!rows.length) {
          this.selectedCampaignId.set(null);
          this.healthScore.set(null);
          this.recommendations.set([]);
          return;
        }

        const currentSelected = this.selectedCampaignId();
        const nextSelected = currentSelected && rows.some((r) => r.campaignId === currentSelected)
          ? currentSelected
          : rows[0].campaignId;

        this.selectCampaign(nextSelected);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load attribution summary.');
      }
    });
  }

  protected selectCampaign(campaignId: string): void {
    this.selectedCampaignId.set(campaignId);
    this.data.getCampaignHealthScore(campaignId).subscribe({
      next: (res) => this.healthScore.set(res),
      error: () => this.healthScore.set(null)
    });

    this.data.getCampaignRecommendations(campaignId).subscribe({
      next: (rows) => this.recommendations.set(rows),
      error: () => this.recommendations.set([])
    });
  }

  protected updateRecommendationReason(recommendationId: string, value: string): void {
    this.recommendationReason.set({
      ...this.recommendationReason(),
      [recommendationId]: value
    });
  }

  protected decideRecommendation(recommendation: CampaignRecommendation, decision: 'accept' | 'dismiss' | 'snooze'): void {
    this.data.applyRecommendationDecision(recommendation.id, {
      decision,
      reason: this.recommendationReason()[recommendation.id] ?? undefined,
      applyActions: true
    }).subscribe({
      next: () => {
        this.toast.show('success', `Recommendation ${decision}ed.`);
        const campaignId = this.selectedCampaignId();
        if (campaignId) {
          this.selectCampaign(campaignId);
        }
      },
      error: () => this.toast.show('error', 'Unable to apply recommendation decision.')
    });
  }

  protected openOpportunityWorklist(recommendation: CampaignRecommendation): void {
    const campaignName = this.selectedCampaign()?.campaignName ?? 'campaign';
    this.router.navigate(['/app/opportunities'], {
      queryParams: {
        search: campaignName,
        focus: recommendation.type.replaceAll('_', ' ')
      }
    });
  }

  protected showExplainability(opportunityId: string): void {
    if (!this.canExplainAttribution()) {
      this.toast.show('success', 'Explainability is available for first-touch model only.');
      return;
    }

    this.loadingExplainability.set(true);
    this.explainabilityOpen.set(true);
    this.data.explainOpportunityAttribution(opportunityId).subscribe({
      next: (result) => {
        this.explainability.set(result);
        this.loadingExplainability.set(false);
      },
      error: () => {
        this.loadingExplainability.set(false);
        this.explainability.set(null);
        this.toast.show('error', 'Unable to load explainability details.');
      }
    });
  }

  protected closeExplainability(): void {
    this.explainabilityOpen.set(false);
    this.explainability.set(null);
  }

  protected resolveCurrencyCode(): string {
    return this.currencyCode() || this.currencyFallback || 'USD';
  }

  protected formatMoney(value: number): string {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: this.resolveCurrencyCode(),
      maximumFractionDigits: 0
    }).format(value ?? 0);
  }

  protected openCampaigns(): void {
    this.router.navigate(['/app/marketing/campaigns']);
  }

  protected openSettings(): void {
    this.router.navigate(['/app/settings/marketing']);
  }

  protected changeAttributionModel(model: AttributionModel): void {
    this.selectedModel.set(model);
    this.load();
  }

  protected statusSeverity(status: string): 'success' | 'warn' | 'secondary' | 'info' {
    const normalized = status?.toLowerCase();
    if (normalized === 'active') {
      return 'success';
    }
    if (normalized === 'planned' || normalized === 'draft') {
      return 'info';
    }
    if (normalized === 'completed') {
      return 'secondary';
    }
    return 'warn';
  }

  protected recommendationSeverity(severity: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const normalized = severity?.toLowerCase();
    if (normalized === 'success') return 'success';
    if (normalized === 'warn') return 'warn';
    if (normalized === 'danger') return 'danger';
    if (normalized === 'secondary') return 'secondary';
    return 'info';
  }

  protected trendIcon(trend: string): string {
    if (trend === 'up') return 'pi pi-arrow-up';
    if (trend === 'down') return 'pi pi-arrow-down';
    return 'pi pi-minus';
  }

  protected trendSeverity(trend: string): 'success' | 'danger' | 'info' {
    if (trend === 'up') return 'success';
    if (trend === 'down') return 'danger';
    return 'info';
  }

  private loadCurrencyContext(): void {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.currencyCode() && this.currencyFallback) {
        this.currencyCode.set(this.currencyFallback);
      }
    });

    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        const resolved = settings.currency || this.currencyFallback;
        if (resolved) {
          this.currencyCode.set(resolved);
        }
      }
    });
  }
}
