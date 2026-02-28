import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  selector: 'app-marketing-settings-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, BreadcrumbsComponent],
  templateUrl: './marketing-settings.page.html',
  styleUrl: './marketing-settings.page.scss'
})
export class MarketingSettingsPage {
  constructor(private readonly router: Router) {}

  protected readonly attributionModel = 'First-touch';
  protected readonly attributionDescription = 'Earliest campaign membership across linked lead/contact determines the single campaign credited per opportunity.';

  protected openCampaigns(): void {
    this.router.navigate(['/app/marketing/campaigns']);
  }

  protected openAttribution(): void {
    this.router.navigate(['/app/marketing/attribution']);
  }
}
