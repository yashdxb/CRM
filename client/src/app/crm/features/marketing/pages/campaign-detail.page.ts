import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { LeadDataService } from '../../leads/services/lead-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import {
  AttributionExplainability,
  CampaignDetailResponse,
  CampaignEntityType,
  CampaignHealthScore,
  CampaignMember,
  CampaignRecommendation,
  CampaignResponseStatus
} from '../models/marketing.model';
import { MarketingDataService } from '../services/marketing-data.service';

type CampaignTab = 'overview' | 'members' | 'opportunities' | 'performance' | 'action-center';

@Component({
  selector: 'app-campaign-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
    DialogModule,
    BreadcrumbsComponent
  ],
  templateUrl: './campaign-detail.page.html',
  styleUrl: './campaign-detail.page.scss'
})
export class CampaignDetailPage {
  protected readonly entityTypeOptions: Array<{ label: string; value: CampaignEntityType }> = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Contact', value: 'Contact' }
  ];
  protected readonly responseStatusOptions: Array<{ label: string; value: CampaignResponseStatus }> = [
    { label: 'Sent', value: 'Sent' },
    { label: 'Responded', value: 'Responded' },
    { label: 'Qualified', value: 'Qualified' },
    { label: 'Unsubscribed', value: 'Unsubscribed' }
  ];

  protected readonly campaign = signal<CampaignDetailResponse | null>(null);
  protected readonly loading = signal(true);
  protected readonly activeTab = signal<CampaignTab>('overview');
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';

  protected readonly healthScore = signal<CampaignHealthScore | null>(null);
  protected readonly recommendations = signal<CampaignRecommendation[]>([]);
  protected readonly recommendationReason = signal<Record<string, string>>({});
  protected readonly explainabilityOpen = signal(false);
  protected readonly explainability = signal<AttributionExplainability | null>(null);
  protected readonly loadingExplainability = signal(false);

  protected readonly entityType = signal<CampaignEntityType>('Lead');
  protected readonly selectedEntityId = signal('');
  protected readonly responseStatus = signal<CampaignResponseStatus>('Sent');

  protected readonly leadOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly contactOptions = signal<Array<{ label: string; value: string }>>([]);

  protected readonly canManage = computed(() =>
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.marketingManage)
  );

  protected readonly currentOptions = computed(() =>
    this.entityType() === 'Lead' ? this.leadOptions() : this.contactOptions()
  );

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly data = inject(MarketingDataService);
  private readonly leads = inject(LeadDataService);
  private readonly contacts = inject(ContactDataService);
  private readonly toast = inject(AppToastService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);

  constructor() {
    this.loadCurrencyContext();
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/marketing/campaigns']);
      return;
    }

    this.loadLookups();
    this.loadCampaign(id);
    this.loadInsights(id);
  }

  protected setTab(tab: CampaignTab): void {
    this.activeTab.set(tab);
  }

  protected editCampaign(): void {
    const id = this.campaign()?.campaign.id;
    if (!id) return;
    this.router.navigate(['/app/marketing/campaigns', id, 'edit']);
  }

  protected goToAttribution(): void {
    this.router.navigate(['/app/marketing/attribution']);
  }

  protected backToCampaigns(): void {
    this.router.navigate(['/app/marketing/campaigns']);
  }

  protected addMember(): void {
    const id = this.campaign()?.campaign.id;
    const entityId = this.selectedEntityId();
    if (!id || !entityId) {
      return;
    }

    this.data
      .addCampaignMember(id, {
        entityType: this.entityType(),
        entityId,
        responseStatus: this.responseStatus()
      })
      .subscribe({
        next: () => {
          this.toast.show('success', 'Member added.');
          this.selectedEntityId.set('');
          this.loadCampaign(id);
          this.loadInsights(id);
        },
        error: () => this.toast.show('error', 'Unable to add member.')
      });
  }

  protected removeMember(member: CampaignMember): void {
    const id = this.campaign()?.campaign.id;
    if (!id) return;

    this.data.removeCampaignMember(id, member.id).subscribe({
      next: () => {
        this.toast.show('success', 'Member removed.');
        this.loadCampaign(id);
        this.loadInsights(id);
      },
      error: () => this.toast.show('error', 'Unable to remove member.')
    });
  }

  protected decideRecommendation(recommendation: CampaignRecommendation, decision: 'accept' | 'dismiss' | 'snooze'): void {
    const reason = this.recommendationReason()[recommendation.id] ?? '';
    this.data
      .applyRecommendationDecision(recommendation.id, {
        decision,
        reason: reason.trim() || undefined,
        applyActions: true
      })
      .subscribe({
        next: () => {
          this.toast.show('success', `Recommendation ${decision}ed.`);
          const campaignId = this.campaign()?.campaign.id;
          if (campaignId) {
            this.loadInsights(campaignId);
          }
        },
        error: () => this.toast.show('error', 'Unable to apply recommendation decision.')
      });
  }

  protected updateRecommendationReason(recommendationId: string, value: string): void {
    this.recommendationReason.set({
      ...this.recommendationReason(),
      [recommendationId]: value
    });
  }

  protected openOpportunityWorklist(recommendation: CampaignRecommendation): void {
    const campaignName = this.campaign()?.campaign.name ?? 'campaign';
    const focusTag = recommendation.type.replaceAll('_', ' ');
    this.router.navigate(['/app/opportunities'], {
      queryParams: {
        search: campaignName,
        focus: focusTag
      }
    });
  }

  protected showExplainability(opportunityId: string): void {
    this.loadingExplainability.set(true);
    this.explainabilityOpen.set(true);
    this.data.explainOpportunityAttribution(opportunityId).subscribe({
      next: (result) => {
        this.explainability.set(result);
        this.loadingExplainability.set(false);
      },
      error: () => {
        this.explainability.set(null);
        this.loadingExplainability.set(false);
        this.toast.show('error', 'Unable to load attribution explainability.');
      }
    });
  }

  protected closeExplainability(): void {
    this.explainabilityOpen.set(false);
    this.explainability.set(null);
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

  protected trendLabel(trend: string): string {
    if (trend === 'up') return 'Improving';
    if (trend === 'down') return 'Declining';
    return 'Stable';
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

  private loadCampaign(id: string): void {
    this.loading.set(true);
    this.data.getCampaign(id).subscribe({
      next: (res) => {
        this.campaign.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load campaign detail.');
        this.router.navigate(['/app/marketing/campaigns']);
      }
    });
  }

  private loadInsights(campaignId: string): void {
    this.data.getCampaignHealthScore(campaignId).subscribe({
      next: (res) => this.healthScore.set(res),
      error: () => this.healthScore.set(null)
    });

    this.data.getCampaignRecommendations(campaignId).subscribe({
      next: (rows) => this.recommendations.set(rows),
      error: () => this.recommendations.set([])
    });
  }

  private loadLookups(): void {
    this.leads.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => this.leadOptions.set(res.items.map((lead) => ({ label: `${lead.name} (${lead.company || 'No company'})`, value: lead.id }))),
      error: () => this.leadOptions.set([])
    });

    this.contacts.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => this.contactOptions.set(res.items.map((contact) => ({ label: `${contact.name} (${contact.accountName || 'No account'})`, value: contact.id }))),
      error: () => this.contactOptions.set([])
    });
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
