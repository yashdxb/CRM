import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';

interface EmailRecipient {
  id: string;
  email: string;
  name: string;
  status: 'Delivered' | 'Opened' | 'Clicked' | 'Bounced' | 'Unsubscribed';
  openedAt?: string;
  clickedAt?: string;
  clickCount: number;
}

interface CampaignEmailDetail {
  id: string;
  campaignId: string;
  campaignName: string;
  subject: string;
  previewText: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  recipientCount: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  uniqueOpens: number;
  clickCount: number;
  uniqueClicks: number;
  bounceCount: number;
  unsubscribeCount: number;
  spamCount: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Sent' | 'Failed';
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  recipients: EmailRecipient[];
}

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
  protected readonly loading = signal(true);
  protected readonly activeTab = signal<'overview' | 'recipients'>('overview');

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(AppToastService);

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
    // Mock data - will be replaced with API call
    setTimeout(() => {
      this.email.set({
        id,
        campaignId: 'c1',
        campaignName: 'Spring Product Launch',
        subject: 'Introducing Our New Product Line',
        previewText: 'Discover the latest innovations designed just for you...',
        fromName: 'North Edge Team',
        fromEmail: 'marketing@northedge.com',
        replyTo: 'support@northedge.com',
        recipientCount: 5000,
        sentCount: 4850,
        deliveredCount: 4700,
        openCount: 2350,
        uniqueOpens: 1940,
        clickCount: 680,
        uniqueClicks: 485,
        bounceCount: 150,
        unsubscribeCount: 23,
        spamCount: 2,
        openRate: 40,
        clickRate: 10,
        bounceRate: 3,
        status: 'Sent',
        sentAt: '2026-02-28T10:00:00Z',
        createdAt: '2026-02-25T14:30:00Z',
        recipients: [
          { id: '1', email: 'john.doe@example.com', name: 'John Doe', status: 'Clicked', openedAt: '2026-02-28T10:15:00Z', clickedAt: '2026-02-28T10:16:00Z', clickCount: 3 },
          { id: '2', email: 'jane.smith@example.com', name: 'Jane Smith', status: 'Opened', openedAt: '2026-02-28T10:30:00Z', clickCount: 0 },
          { id: '3', email: 'bob.wilson@example.com', name: 'Bob Wilson', status: 'Delivered', clickCount: 0 },
          { id: '4', email: 'alice.johnson@example.com', name: 'Alice Johnson', status: 'Clicked', openedAt: '2026-02-28T11:00:00Z', clickedAt: '2026-02-28T11:02:00Z', clickCount: 1 },
          { id: '5', email: 'invalid@bounced.com', name: 'Invalid Email', status: 'Bounced', clickCount: 0 },
          { id: '6', email: 'mike.brown@example.com', name: 'Mike Brown', status: 'Unsubscribed', openedAt: '2026-02-28T12:00:00Z', clickCount: 0 }
        ]
      });
      this.loading.set(false);
    }, 500);
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
}
