import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

import { EmailListItem, EmailStatus } from '../models/email.model';
import { EmailDataService } from '../services/email-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { EmailComposeDialogComponent } from '../components/email-compose-dialog.component';

interface StatusOption {
  label: string;
  value: EmailStatus | 'all';
  icon: string;
}

@Component({
  selector: 'app-emails-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
    PaginatorModule,
    SkeletonModule,
    TooltipModule,
    BreadcrumbsComponent,
    EmailComposeDialogComponent
  ],
  templateUrl: './emails.page.html',
  styleUrl: './emails.page.scss'
})
export class EmailsPage implements OnInit {
  private readonly emailService = inject(EmailDataService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);

  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all', icon: 'pi-list' },
    { label: 'Pending', value: 'Pending', icon: 'pi-clock' },
    { label: 'Queued', value: 'Queued', icon: 'pi-hourglass' },
    { label: 'Sent', value: 'Sent', icon: 'pi-check' },
    { label: 'Delivered', value: 'Delivered', icon: 'pi-check-circle' },
    { label: 'Opened', value: 'Opened', icon: 'pi-eye' },
    { label: 'Clicked', value: 'Clicked', icon: 'pi-external-link' },
    { label: 'Bounced', value: 'Bounced', icon: 'pi-times-circle' },
    { label: 'Failed', value: 'Failed', icon: 'pi-exclamation-triangle' }
  ];

  protected readonly emails = signal<EmailListItem[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);

  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.emailsManage);
  });

  protected readonly metrics = computed(() => {
    const rows = this.emails();
    const sent = rows.filter((e) => e.status === 'Sent' || e.status === 'Delivered' || e.status === 'Opened' || e.status === 'Clicked').length;
    const pending = rows.filter((e) => e.status === 'Pending' || e.status === 'Queued').length;
    const opened = rows.filter((e) => e.status === 'Opened' || e.status === 'Clicked').length;
    const failed = rows.filter((e) => e.status === 'Bounced' || e.status === 'Failed').length;

    return {
      total: this.total(),
      sent,
      pending,
      opened,
      failed,
      openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0
    };
  });

  protected searchTerm = '';
  protected statusFilter: EmailStatus | 'all' = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected showComposeDialog = false;
  protected readonly Math = Math;

  ngOnInit(): void {
    this.loadEmails();
  }

  protected loadEmails(): void {
    this.loading.set(true);
    this.emailService.search({
      page: this.pageIndex + 1,
      pageSize: this.rows,
      search: this.searchTerm || undefined,
      status: this.statusFilter !== 'all' ? this.statusFilter : undefined
    }).subscribe({
      next: (response) => {
        this.emails.set(response.items);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.toastService.show('error', 'Failed to load emails');
        this.loading.set(false);
      }
    });
  }

  protected onPageChange(event: PaginatorState): void {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? 10;
    this.loadEmails();
  }

  protected onSearch(): void {
    this.pageIndex = 0;
    this.loadEmails();
  }

  protected onStatusFilterChange(): void {
    this.pageIndex = 0;
    this.loadEmails();
  }

  protected openComposeDialog(): void {
    this.showComposeDialog = true;
  }

  protected onEmailSent(): void {
    this.showComposeDialog = false;
    this.loadEmails();
    this.toastService.show('success', 'Email sent successfully');
  }

  protected statusSeverity(status: EmailStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Delivered':
      case 'Opened':
      case 'Clicked':
        return 'success';
      case 'Sent':
        return 'info';
      case 'Pending':
      case 'Queued':
        return 'warn';
      case 'Bounced':
      case 'Failed':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  protected statusIcon(status: EmailStatus): string {
    const option = this.statusOptions.find((o) => o.value === status);
    return option?.icon ?? 'pi-envelope';
  }

  protected getInitials(email: string): string {
    const parts = email.split('@')[0].split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  }
}
