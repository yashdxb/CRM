import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { Campaign } from '../models/marketing.model';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';

@Component({
  selector: 'app-campaigns-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TableModule, BreadcrumbsComponent],
  templateUrl: './campaigns.page.html',
  styleUrl: './campaigns.page.scss'
})
export class CampaignsPage {
  protected readonly rowsPerPageOptions = [10, 20, 50];
  protected readonly statusFilterOptions = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Planned', value: 'Planned' },
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Archived', value: 'Archived' }
  ];
  protected readonly channelFilterOptions = [
    { label: 'Email', value: 'Email' },
    { label: 'Events', value: 'Events' },
    { label: 'Web', value: 'Web' },
    { label: 'Social', value: 'Social' },
    { label: 'Mixed', value: 'Mixed' }
  ];
  protected readonly campaigns = signal<Campaign[]>([]);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  protected readonly ownerFilterOptions = computed(() =>
    Array.from(
      new Map(
        this.campaigns()
          .filter((campaign) => !!campaign.ownerName?.trim())
          .map((campaign) => [campaign.ownerName.trim(), { label: campaign.ownerName.trim(), value: campaign.ownerName.trim() }])
      ).values()
    ).sort((a, b) => a.label.localeCompare(b.label))
  );
  protected readonly kpis = computed(() => {
    const rows = this.campaigns();
    return {
      total: rows.length,
      active: rows.filter((row) => row.status === 'Active').length,
      plannedBudget: rows.reduce((sum, row) => sum + (row.budgetPlanned ?? 0), 0),
      actualBudget: rows.reduce((sum, row) => sum + (row.budgetActual ?? 0), 0)
    };
  });

  protected readonly loading = signal(false);

  protected readonly canManage = computed(() =>
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.marketingManage)
  );

  private readonly data = inject(MarketingDataService);
  private readonly router = inject(Router);
  private readonly toast = inject(AppToastService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);

  constructor() {
    this.loadCurrencyContext();
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.data.searchCampaigns({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => {
        this.campaigns.set(res.items);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Failed to load campaigns.');
      }
    });
  }

  protected createCampaign(): void {
    this.router.navigate(['/app/marketing/campaigns/new']);
  }

  protected openAttribution(): void {
    this.router.navigate(['/app/marketing/attribution']);
  }

  protected openSettings(): void {
    this.router.navigate(['/app/settings/marketing']);
  }

  protected openCampaign(campaign: Campaign): void {
    this.router.navigate(['/app/marketing/campaigns', campaign.id]);
  }

  protected editCampaign(campaign: Campaign): void {
    this.router.navigate(['/app/marketing/campaigns', campaign.id, 'edit']);
  }

  protected archiveCampaign(campaign: Campaign): void {
    if (!this.canManage()) {
      return;
    }

    this.data.archiveCampaign(campaign.id).subscribe({
      next: () => {
        this.toast.show('success', 'Campaign archived.');
        this.load();
      },
      error: () => this.toast.show('error', 'Unable to archive campaign.')
    });
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
