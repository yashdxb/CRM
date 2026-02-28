import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { MarketingDataService } from '../../marketing/services/marketing-data.service';
import { RecommendationPilotMetrics } from '../../marketing/models/marketing.model';

@Component({
  selector: 'app-marketing-settings-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, BreadcrumbsComponent],
  templateUrl: './marketing-settings.page.html',
  styleUrl: './marketing-settings.page.scss'
})
export class MarketingSettingsPage {
  protected readonly attributionModel = 'First-touch';
  protected readonly attributionDescription = 'Earliest campaign membership across linked lead/contact determines the single campaign credited per opportunity.';
  protected readonly pilotMetrics = signal<RecommendationPilotMetrics | null>(null);

  private readonly router = inject(Router);
  private readonly marketingData = inject(MarketingDataService);

  constructor() {
    this.loadPilotMetrics();
  }

  protected openCampaigns(): void {
    this.router.navigate(['/app/marketing/campaigns']);
  }

  protected openAttribution(): void {
    this.router.navigate(['/app/marketing/attribution']);
  }

  protected openImpactTelemetryAudit(): void {
    this.router.navigate(['/app/settings/audit-log'], {
      queryParams: {
        entityType: 'MarketingTelemetry',
        action: 'ImpactWorklistOpened'
      }
    });
  }

  protected loadPilotMetrics(): void {
    this.marketingData.getRecommendationPilotMetrics().subscribe({
      next: (metrics) => this.pilotMetrics.set(metrics),
      error: () => this.pilotMetrics.set(null)
    });
  }
}
