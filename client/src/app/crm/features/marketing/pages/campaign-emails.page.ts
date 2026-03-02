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

interface CampaignEmailRow {
  id: string;
  campaignId: string;
  campaignName: string;
  subject: string;
  recipientCount: number;
  sentCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  openRate: number;
  clickRate: number;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Sent' | 'Failed';
  scheduledAt?: string;
  sentAt?: string;
}

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

  protected readonly emails = signal<CampaignEmailRow[]>([]);
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
    // Mock data for now - will be replaced with API call
    setTimeout(() => {
      this.emails.set([
        {
          id: '1',
          campaignId: 'c1',
          campaignName: 'Spring Product Launch',
          subject: 'Introducing Our New Product Line',
          recipientCount: 5000,
          sentCount: 4850,
          openCount: 1940,
          clickCount: 485,
          bounceCount: 150,
          openRate: 40,
          clickRate: 10,
          status: 'Sent',
          sentAt: '2026-02-28T10:00:00Z'
        },
        {
          id: '2',
          campaignId: 'c1',
          campaignName: 'Spring Product Launch',
          subject: 'Follow-up: Special Offer Inside',
          recipientCount: 4850,
          sentCount: 4700,
          openCount: 1645,
          clickCount: 376,
          bounceCount: 150,
          openRate: 35,
          clickRate: 8,
          status: 'Sent',
          sentAt: '2026-03-01T10:00:00Z'
        },
        {
          id: '3',
          campaignId: 'c2',
          campaignName: 'Customer Appreciation Week',
          subject: 'Thank You for Being a Valued Customer',
          recipientCount: 2500,
          sentCount: 0,
          openCount: 0,
          clickCount: 0,
          bounceCount: 0,
          openRate: 0,
          clickRate: 0,
          status: 'Scheduled',
          scheduledAt: '2026-03-05T09:00:00Z'
        },
        {
          id: '4',
          campaignId: 'c3',
          campaignName: 'Q2 Newsletter',
          subject: 'What\'s New This Quarter',
          recipientCount: 8000,
          sentCount: 0,
          openCount: 0,
          clickCount: 0,
          bounceCount: 0,
          openRate: 0,
          clickRate: 0,
          status: 'Draft'
        }
      ]);
      this.loading.set(false);
    }, 500);
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
}
