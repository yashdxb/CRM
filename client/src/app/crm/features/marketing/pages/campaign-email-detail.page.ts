import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import { CampaignEmailDetail, CampaignEmailRecipient } from '../models/marketing.model';

@Component({
  selector: 'app-campaign-email-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    TableModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './campaign-email-detail.page.html',
  styleUrl: './campaign-email-detail.page.scss'
})
export class CampaignEmailDetailPage implements OnInit {
  protected readonly email = signal<CampaignEmailDetail | null>(null);
  protected readonly recipients = signal<CampaignEmailRecipient[]>([]);
  protected readonly recipientTotal = signal(0);
  protected readonly loading = signal(true);
  protected readonly activeTab = signal<'overview' | 'recipients'>('overview');

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(AppToastService);
  private readonly data = inject(MarketingDataService);

  protected readonly deliveryRate = computed(() => {
    const e = this.email();
    if (!e || e.sentCount === 0) return 0;
    return Math.round((e.deliveredCount / e.sentCount) * 100);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmail(id);
    } else {
      this.router.navigate(['/app/marketing/emails']);
    }
  }

  protected loadEmail(id: string): void {
    this.loading.set(true);
    this.data.getEmail(id).subscribe({
      next: (detail) => {
        this.email.set(detail);
        this.loading.set(false);
        this.loadRecipients(id);
      },
      error: () => {
        this.toast.show('error', 'Failed to load email details');
        this.loading.set(false);
      }
    });
  }

  private loadRecipients(emailId: string): void {
    this.data.getEmailRecipients(emailId, { page: 1, pageSize: 100 }).subscribe({
      next: (res) => {
        this.recipients.set(res.items);
        this.recipientTotal.set(res.total);
      },
      error: () => {
        this.toast.show('error', 'Failed to load recipients');
      }
    });
  }

  protected goBack(): void {
    this.router.navigate(['/app/marketing/emails']);
  }

  protected viewCampaign(): void {
    const e = this.email();
    if (e) {
      this.router.navigate(['/app/marketing/campaigns', e.campaignId]);
    }
  }

  protected setTab(tab: 'overview' | 'recipients'): void {
    this.activeTab.set(tab);
  }

  protected getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Sent': return 'success';
      case 'Sending': return 'info';
      case 'Scheduled': return 'warn';
      case 'Draft': return 'secondary';
      case 'Failed': return 'danger';
      case 'Delivered': return 'info';
      case 'Opened': return 'success';
      case 'Clicked': return 'success';
      case 'Bounced': return 'danger';
      case 'Unsubscribed': return 'warn';
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
