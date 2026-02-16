import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import {
  OpportunityApprovalInboxItem,
  OpportunityApprovalStatus
} from '../models/opportunity.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-opportunity-approvals-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './opportunity-approvals.page.html',
  styleUrl: './opportunity-approvals.page.scss'
})
export class OpportunityApprovalsPage {
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly approvals = signal<OpportunityApprovalInboxItem[]>([]);
  protected readonly loading = signal(true);
  protected noteInputs: Record<string, string> = {};
  protected readonly actioningIds = signal(new Set<string>());

  protected readonly statusOptions: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  protected readonly purposeOptions: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Close', value: 'Close' },
    { label: 'Discount', value: 'Discount' }
  ];

  protected statusFilter = 'Pending';
  protected purposeFilter = 'all';

  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return (
      tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsApprove) ||
      tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsOverride)
    );
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const status = params.get('status');
        const purpose = params.get('purpose');
        this.statusFilter = status && this.statusOptions.some((option) => option.value === status)
          ? status
          : this.statusFilter;
        this.purposeFilter = purpose && this.purposeOptions.some((option) => option.value === purpose)
          ? purpose
          : this.purposeFilter;
        this.load();
      });
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
    const purpose = this.purposeFilter === 'all' ? undefined : this.purposeFilter;

    this.approvalService.getInbox(status, purpose).subscribe({
      next: (items) => {
        this.approvals.set(items ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toastService.show('error', 'Unable to load approvals.', 3000);
      }
    });
  }

  protected statusSeverity(status: OpportunityApprovalStatus): 'info' | 'success' | 'danger' | 'warn' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Pending':
      default:
        return 'warn';
    }
  }

  protected openOpportunity(item: OpportunityApprovalInboxItem) {
    this.router.navigate(['/app/opportunities', item.opportunityId, 'edit']);
  }

  protected decide(item: OpportunityApprovalInboxItem, approved: boolean) {
    if (this.actioningIds().has(item.id)) {
      return;
    }
    const notes = this.noteInputs[item.id] ?? null;
    const updated = new Set(this.actioningIds());
    updated.add(item.id);
    this.actioningIds.set(updated);

    this.approvalService.decide(item.id, { approved, notes }).subscribe({
      next: (updatedItem) => {
        const nextList = this.approvals().map((row) =>
          row.id === updatedItem.id ? { ...row, status: updatedItem.status } : row
        );
          this.approvals.set(nextList);
          this.clearActioning(item.id);
          this.toastService.show('success', 'Approval updated.', 2500);
        },
      error: (err) => {
        this.clearActioning(item.id);
        const message = typeof err?.error === 'string' ? err.error : 'Unable to update approval.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected isActioning(id: string): boolean {
    return this.actioningIds().has(id);
  }

  private clearActioning(id: string) {
    const updated = new Set(this.actioningIds());
    updated.delete(id);
    this.actioningIds.set(updated);
  }
}
