import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import {
  DecisionAssistDraft,
  OpportunityApprovalInboxItem,
  OpportunityApprovalStatus
} from '../models/opportunity.model';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserLookupItem } from '../../settings/models/user-admin.model';

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
    TagModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    TextareaModule,
    TableModule,
    BreadcrumbsComponent,
    DecimalPipe,
    DatePipe
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
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly currentUserId = readUserId();

  protected readonly approvals = signal<OpportunityApprovalInboxItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly selectedApprovalId = signal<string | null>(null);
  protected readonly searchQuery = signal('');
  protected readonly actioningIds = signal(new Set<string>());
  protected readonly draftingIds = signal(new Set<string>());
  protected readonly delegateLoading = signal(false);
  protected readonly delegateUsers = signal<UserLookupItem[]>([]);
  protected noteInputs: Record<string, string> = {};
  protected assistDrafts: Record<string, DecisionAssistDraft> = {};
  protected delegateUserInputs: Record<string, string | null> = {};

  protected readonly statusOptions: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'Pending' }
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

  protected readonly filteredApprovals = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    return this.approvals().filter((item) => {
      if (item.status !== 'Pending') {
        return false;
      }
      if (!query) {
        return true;
      }

      const haystack = [
        item.opportunityName,
        item.accountName,
        item.requestedByName,
        item.approverRole,
        item.purpose,
        item.status,
        item.policyReason,
        item.priority,
        item.riskLevel,
        item.businessImpactLabel,
        item.decisionType
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  });

  protected readonly selectedApproval = computed(() => {
    const list = this.filteredApprovals();
    const selectedId = this.selectedApprovalId();
    if (!list.length) {
      return null;
    }
    if (selectedId) {
      const matched = list.find((item) => item.id === selectedId);
      if (matched) {
        return matched;
      }
    }
    return list[0];
  });

  protected readonly kpis = computed(() => {
    const items = this.approvals();
    const pending = items.filter((item) => item.status === 'Pending');
    const overdue = pending.filter((item) => item.slaStatus === 'overdue').length;
    const critical = pending.filter(
      (item) => item.priority === 'critical' || item.riskLevel === 'high'
    ).length;
    const avgAge = pending.length
      ? Math.round((pending.reduce((acc, item) => acc + (item.requestedAgeHours ?? 0), 0) / pending.length) * 10) /
        10
      : 0;
    const totalAmount = pending.reduce((acc, item) => acc + (item.amount ?? 0), 0);

    return { pending: pending.length, overdue, critical, avgAge, totalAmount };
  });

  protected readonly pageTitle = computed(() => {
    return 'Pending Action';
  });

  protected readonly heroDescription = computed(() => {
    return 'Actionable approvals and exceptions waiting for a decision. Completed items move to Decision History.';
  });

  protected readonly queueSubtitle = computed(() => {
    return 'Open any pending item to review, comment, and decide.';
  });

  protected readonly emptyListMessage = computed(() => {
    return 'No pending actions match the selected filters.';
  });

  protected readonly emptyDetailSubtitle = computed(() => {
    return 'Choose an item from the queue to review policy context and take action.';
  });

  constructor() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.ensureSelection();
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const status = params.get('status');
      const purpose = params.get('purpose');
      const selected = params.get('selected');
      this.statusFilter =
        status && this.statusOptions.some((option) => option.value === status)
          ? status
          : this.statusFilter;
      this.purposeFilter =
        purpose && this.purposeOptions.some((option) => option.value === purpose)
          ? purpose
          : this.purposeFilter;
      if (selected) {
        this.selectedApprovalId.set(selected);
      }
      this.load();
    });

    if (this.canManage()) {
      this.loadDelegateUsers();
    }
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
    const purpose = this.purposeFilter === 'all' ? undefined : this.purposeFilter;

    this.approvalService.getInbox(status, purpose).subscribe({
      next: (items) => {
        this.approvals.set(items ?? []);
        this.loading.set(false);
        this.ensureSelection();
      },
      error: () => {
        this.loading.set(false);
        this.toastService.show('error', 'Unable to load approvals.', 3000);
      }
    });
  }

  protected onSearchInput(value: string) {
    this.searchQuery.set(value ?? '');
    this.ensureSelection();
  }

  protected selectDecision(item: OpportunityApprovalInboxItem) {
    this.selectedApprovalId.set(item.id);
  }

  protected openOpportunity(item: OpportunityApprovalInboxItem) {
    this.router.navigate(['/app/opportunities', item.opportunityId, 'edit'], {
      queryParams: {
        reviewMode: 'decision',
        decisionId: item.id,
        from: 'pending-action'
      }
    });
  }

  protected decide(item: OpportunityApprovalInboxItem, approved: boolean) {
    if (this.actioningIds().has(item.id)) {
      return;
    }

    const notes = this.noteInputs[item.id] ?? null;
    const nextActioning = new Set(this.actioningIds());
    nextActioning.add(item.id);
    this.actioningIds.set(nextActioning);

    this.approvalService.decideDecision(item.id, { approved, notes }).subscribe({
      next: (updatedItem) => {
        const nextList = this.approvals().filter((row) => row.id !== updatedItem.id);
        this.approvals.set(nextList);
        this.clearActioning(item.id);
        this.toastService.show('success', 'Decision updated.', 2500);
        this.ensureSelection();
      },
      error: (err) => {
        this.clearActioning(item.id);
        const message = typeof err?.error?.message === 'string'
          ? err.error.message
          : typeof err?.error === 'string'
            ? err.error
            : 'Unable to update decision.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected requestInfo(item: OpportunityApprovalInboxItem) {
    if (this.actioningIds().has(item.id)) {
      return;
    }
    const notes = this.noteInputs[item.id] ?? null;
    const nextActioning = new Set(this.actioningIds());
    nextActioning.add(item.id);
    this.actioningIds.set(nextActioning);

    this.approvalService.requestDecisionInfo(item.id, notes).subscribe({
      next: (updatedItem) => {
        this.replaceApprovalRow(updatedItem);
        this.clearActioning(item.id);
        this.toastService.show('success', 'More information requested.', 2500);
        this.ensureSelection();
      },
      error: (err) => {
        this.clearActioning(item.id);
        const message = typeof err?.error?.message === 'string'
          ? err.error.message
          : 'Unable to request information.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected escalate(item: OpportunityApprovalInboxItem) {
    if (this.actioningIds().has(item.id)) {
      return;
    }

    const notes = this.noteInputs[item.id] ?? null;
    const nextActioning = new Set(this.actioningIds());
    nextActioning.add(item.id);
    this.actioningIds.set(nextActioning);

    this.approvalService.escalateDecision(item.id, { notes }).subscribe({
      next: (updatedItem) => {
        this.replaceApprovalRow(updatedItem);
        this.clearActioning(item.id);
        this.toastService.show('success', 'Decision escalated.', 2500);
        this.ensureSelection();
      },
      error: (err) => {
        this.clearActioning(item.id);
        const message = typeof err?.error?.message === 'string'
          ? err.error.message
          : 'Unable to escalate decision.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected delegateDecision(item: OpportunityApprovalInboxItem) {
    if (this.actioningIds().has(item.id)) {
      return;
    }
    const delegateUserId = this.delegateUserInputs[item.id];
    if (!delegateUserId) {
      this.toastService.show('error', 'Select a user to delegate this decision.', 3000);
      return;
    }
    const delegateUser = this.delegateUsers().find((u) => u.id === delegateUserId);
    const notes = this.noteInputs[item.id] ?? null;

    const nextActioning = new Set(this.actioningIds());
    nextActioning.add(item.id);
    this.actioningIds.set(nextActioning);

    this.approvalService.delegateDecision(item.id, {
      delegateUserId,
      delegateUserName: delegateUser?.fullName ?? null,
      notes
    }).subscribe({
      next: (updatedItem) => {
        this.replaceApprovalRow(updatedItem);
        this.clearActioning(item.id);
        this.toastService.show('success', 'Decision delegated.', 2500);
        this.ensureSelection();
      },
      error: (err) => {
        this.clearActioning(item.id);
        const message = typeof err?.error?.message === 'string'
          ? err.error.message
          : 'Unable to delegate decision.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected isActioning(id: string): boolean {
    return this.actioningIds().has(id);
  }

  protected delegateOptions = computed(() =>
    this.delegateUsers().map((user) => ({
      label: `${user.fullName} (${user.email})`,
      value: user.id
    }))
  );

  protected isDrafting(id: string): boolean {
    return this.draftingIds().has(id);
  }

  protected generateDraft(item: OpportunityApprovalInboxItem): void {
    if (this.draftingIds().has(item.id)) {
      return;
    }

    const next = new Set(this.draftingIds());
    next.add(item.id);
    this.draftingIds.set(next);

    this.approvalService.generateDecisionAssistDraft(item.id).subscribe({
      next: (draft) => {
        this.assistDrafts[item.id] = draft;
        this.noteInputs[item.id] = this.pickDraftNote(draft);
        this.toastService.show('success', 'AI draft prepared (assist-only).', 2500);
        this.clearDrafting(item.id);
      },
      error: (err) => {
        this.clearDrafting(item.id);
        const message = typeof err?.error?.message === 'string'
          ? err.error.message
          : 'Unable to generate decision draft.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected assistDraftFor(id: string): DecisionAssistDraft | null {
    return this.assistDrafts[id] ?? null;
  }

  protected applyAssistDraft(item: OpportunityApprovalInboxItem, mode: 'approve' | 'reject' | 'request_info'): void {
    const draft = this.assistDrafts[item.id];
    if (!draft) {
      return;
    }

    this.noteInputs[item.id] =
      mode === 'approve' ? draft.approvalDraftNote :
      mode === 'reject' ? draft.rejectDraftNote :
      draft.requestInfoDraftNote;
  }

  protected isPending(item: OpportunityApprovalInboxItem | null): boolean {
    return !!item && item.status === 'Pending';
  }

  protected isSelected(item: OpportunityApprovalInboxItem): boolean {
    return this.selectedApprovalId() === item.id;
  }

  protected decisionTitle(item: OpportunityApprovalInboxItem): string {
    const type = this.humanizeDecisionType(item.decisionType || 'Approval');
    return `${type} • ${item.opportunityName}`;
  }

  protected decisionSubtitle(item: OpportunityApprovalInboxItem): string {
    return `${this.formatCurrency(item.amount, item.currency)} • ${item.accountName}`;
  }

  protected humanizeDecisionType(value?: string | null): string {
    const normalized = (value || 'Approval').replace(/[_-]+/g, ' ').trim();
    if (!normalized) return 'Approval';
    return normalized
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }

  protected formatCurrency(amount?: number | null, currency?: string | null): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0
    }).format(amount ?? 0);
  }

  protected formatCompactCurrency(amount?: number | null): string {
    const value = amount ?? 0;
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `$${Math.round(value / 1_000)}K`;
    }
    return `$${Math.round(value)}`;
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

  protected riskSeverity(risk: string): 'success' | 'info' | 'warn' | 'danger' {
    switch ((risk || '').toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warn';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  }

  protected prioritySeverity(priority: string): 'success' | 'info' | 'warn' | 'danger' {
    switch ((priority || '').toLowerCase()) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warn';
      case 'medium':
        return 'info';
      case 'normal':
      default:
        return 'success';
    }
  }

  protected slaSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
    switch ((status || '').toLowerCase()) {
      case 'overdue':
        return 'danger';
      case 'at-risk':
        return 'warn';
      case 'completed':
        return 'info';
      case 'on-track':
      default:
        return 'success';
    }
  }

  protected slaLabel(item: OpportunityApprovalInboxItem): string {
    if (item.status !== 'Pending') {
      return item.decisionOn ? `Completed ${this.relativeTime(item.decisionOn)}` : 'Completed';
    }
    if (!item.slaDueAtUtc) {
      return 'No SLA';
    }
    const due = new Date(item.slaDueAtUtc).getTime();
    const diffMs = due - Date.now();
    const absMins = Math.round(Math.abs(diffMs) / 60000);
    if (diffMs < 0) {
      if (absMins < 60) return `Overdue by ${absMins}m`;
      return `Overdue by ${Math.round(absMins / 60)}h`;
    }
    if (absMins < 60) return `Due in ${absMins}m`;
    return `Due in ${Math.round(absMins / 60)}h`;
  }

  protected relativeTime(value?: string | null): string {
    if (!value) return '—';
    const ms = Date.now() - new Date(value).getTime();
    const mins = Math.max(1, Math.round(ms / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 48) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
  }

  protected queueCardTone(item: OpportunityApprovalInboxItem): 'critical' | 'warn' | 'normal' {
    if (item.status === 'Pending' && (item.priority === 'critical' || item.slaStatus === 'overdue' || item.isEscalated)) {
      return 'critical';
    }
    if (item.status === 'Pending' && (item.priority === 'high' || item.slaStatus === 'at-risk')) {
      return 'warn';
    }
    return 'normal';
  }

  protected trackByApprovalId(_index: number, item: OpportunityApprovalInboxItem): string {
    return item.id;
  }

  private ensureSelection(): void {
    const list = this.filteredApprovals();
    const current = this.selectedApprovalId();
    if (!list.length) {
      this.selectedApprovalId.set(null);
      return;
    }
    if (!current || !list.some((item) => item.id === current)) {
      this.selectedApprovalId.set(list[0].id);
    }
  }

  protected isMyDecision(item: OpportunityApprovalInboxItem): boolean {
    const userId = this.currentUserId?.toLowerCase();
    if (!userId) {
      return false;
    }

    return (
      (item.approverUserId ?? '').toLowerCase() === userId ||
      (item.requestedByUserId ?? '').toLowerCase() === userId
    );
  }

  private clearActioning(id: string) {
    const updated = new Set(this.actioningIds());
    updated.delete(id);
    this.actioningIds.set(updated);
  }

  private clearDrafting(id: string) {
    const updated = new Set(this.draftingIds());
    updated.delete(id);
    this.draftingIds.set(updated);
  }

  private replaceApprovalRow(updatedItem: OpportunityApprovalInboxItem) {
    const nextList = this.approvals().map((row) =>
      row.id === updatedItem.id
        ? { ...row, ...updatedItem }
        : row
    );
    this.approvals.set(nextList);
  }

  private loadDelegateUsers() {
    this.delegateLoading.set(true);
    this.userAdminData.lookupActive(undefined, 100).subscribe({
      next: (users) => {
        this.delegateUsers.set(users ?? []);
        this.delegateLoading.set(false);
      },
      error: () => {
        this.delegateLoading.set(false);
      }
    });
  }

  private pickDraftNote(draft: DecisionAssistDraft): string {
    switch ((draft.recommendedAction || '').toLowerCase()) {
      case 'reject':
        return draft.rejectDraftNote;
      case 'request_info':
        return draft.requestInfoDraftNote;
      case 'approve':
      default:
        return draft.approvalDraftNote;
    }
  }

}
