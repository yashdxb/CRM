import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import { CampaignEmailListItem } from '../models/marketing.model';

@Component({
  selector: 'app-campaign-emails-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    TableModule,
    TagModule,
    InputTextModule,
    BreadcrumbsComponent
  ],
  templateUrl: './campaign-emails.page.html',
  styleUrl: './campaign-emails.page.scss'
})
export class CampaignEmailsPage {
  protected readonly rowsPerPageOptions = [10, 20, 50];
  protected readonly statusFilterOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'Sending', value: 'Sending' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Failed', value: 'Failed' }
  ];

  protected readonly emails = signal<CampaignEmailListItem[]>([]);
  protected readonly totalRecords = signal(0);
  protected readonly loading = signal(false);
  protected statusFilter = signal('');
  protected searchText = signal('');

  protected readonly filteredEmails = computed(() => {
    let rows = this.emails();
    const status = this.statusFilter();
    const search = this.searchText().toLowerCase().trim();

    if (status) {
      rows = rows.filter(e => e.status === status);
    }
    if (search) {
      rows = rows.filter(e =>
        e.subject.toLowerCase().includes(search) ||
        e.campaignName.toLowerCase().includes(search)
      );
    }
    return rows;
  });

  protected readonly kpis = computed(() => {
    const rows = this.emails();
    const sent = rows.filter(e => e.status === 'Sent');
    const totalSent = sent.reduce((sum, e) => sum + e.sentCount, 0);
    const totalOpens = sent.reduce((sum, e) => sum + e.openCount, 0);
    const totalClicks = sent.reduce((sum, e) => sum + e.clickCount, 0);

    return {
      totalEmails: rows.length,
      sentEmails: sent.length,
      totalRecipients: totalSent,
      avgOpenRate: totalSent > 0 ? Math.round((totalOpens / totalSent) * 100) : 0,
      avgClickRate: totalSent > 0 ? Math.round((totalClicks / totalSent) * 100) : 0
    };
  });

  private readonly data = inject(MarketingDataService);
  private readonly router = inject(Router);
  private readonly toast = inject(AppToastService);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.data.searchEmails({
      status: this.statusFilter() || undefined,
      search: this.searchText()?.trim() || undefined,
      page: 1,
      pageSize: 50
    }).subscribe({
      next: (res) => {
        this.emails.set(res.items);
        this.totalRecords.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('error', 'Failed to load campaign emails');
        this.loading.set(false);
      }
    });
  }

  protected viewCampaign(campaignId: string): void {
    this.router.navigate(['/app/marketing/campaigns', campaignId]);
  }

  protected viewEmail(emailId: string): void {
    this.router.navigate(['/app/marketing/emails', emailId]);
  }

  protected getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Sent': return 'success';
      case 'Sending': return 'info';
      case 'Scheduled': return 'warn';
      case 'Draft': return 'secondary';
      case 'Failed': return 'danger';
      default: return 'secondary';
    }
  }

  protected formatDate(dateStr?: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  protected formatNumber(num: number): string {
    return num.toLocaleString();
  }

  protected computeRate(count: number, total: number): number {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }
}
