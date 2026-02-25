import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
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

type QueueView = 'my' | 'team' | 'attention' | 'completed';
type DecisionViewMode = 'inbox' | 'approvals' | 'ai-reviews';

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
    TabsModule,
    TextareaModule,
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
  protected readonly decisionViewMode = signal<DecisionViewMode>('inbox');
  protected readonly activeQueueView = signal<QueueView>('my');
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

  protected readonly canViewTeamQueue = computed(() => this.canManage());

  protected readonly filteredApprovals = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const queueView = this.activeQueueView();
    const viewMode = this.decisionViewMode();

    return this.approvals().filter((item) => {
      if (!this.matchesDecisionView(item, viewMode)) {
        return false;
      }
      if (queueView === 'my' && !this.isMyDecision(item)) {
        return false;
      }
      if (queueView === 'team') {
        if (!this.canViewTeamQueue()) {
          return false;
        }
        const isTeam = item.status === 'Pending' && !this.isMyDecision(item);
        if (!isTeam) {
          return false;
        }
      }
      if (queueView === 'attention') {
        const attention =
          item.status === 'Pending' &&
          (item.slaStatus === 'overdue' || item.slaStatus === 'at-risk' || item.priority === 'critical' || !!item.isEscalated);
        if (!attention) {
          return false;
        }
      }
      if (queueView === 'completed' && item.status === 'Pending') {
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

  protected readonly queueTabBadge = computed(() => ({
    my: this.approvals().filter((item) => this.matchesDecisionView(item, this.decisionViewMode()) && this.isMyDecision(item)).length,
    team: this.canViewTeamQueue()
      ? this.approvals().filter((item) => this.matchesDecisionView(item, this.decisionViewMode()) && item.status === 'Pending' && !this.isMyDecision(item)).length
      : 0,
    attention: this.approvals().filter(
      (item) =>
        this.matchesDecisionView(item, this.decisionViewMode()) &&
        item.status === 'Pending' &&
        (item.slaStatus === 'overdue' || item.slaStatus === 'at-risk' || item.priority === 'critical' || !!item.isEscalated)
    ).length,
    completed: this.approvals().filter((item) => this.matchesDecisionView(item, this.decisionViewMode()) && item.status !== 'Pending').length
  }));

  protected readonly pageTitle = computed(() => {
    switch (this.decisionViewMode()) {
      case 'approvals':
        return 'Approval Workflows';
      case 'ai-reviews':
        return 'AI Review Queue';
      default:
        return 'Decision Inbox';
    }
  });

  protected readonly heroDescription = computed(() => {
    switch (this.decisionViewMode()) {
      case 'approvals':
        return 'Approval-focused decision queue for discount, exception, and workflow-gated commercial approvals.';
      case 'ai-reviews':
        return 'Human review queue for high-risk AI-generated actions and policy-sensitive automation decisions.';
      default:
        return 'Prioritized approvals and exceptions with SLA visibility, policy context, and operator-ready actions.';
    }
  });

  protected readonly queueSubtitle = computed(() => {
    switch (this.decisionViewMode()) {
      case 'approvals':
        return 'Approval decisions prioritized by SLA, risk, and business impact.';
      case 'ai-reviews':
        return 'AI-assisted decisions awaiting human review, policy confirmation, or override.';
      default:
        return 'My Decisions, Team Queue, and SLA-prioritized exceptions.';
    }
  });

  protected readonly emptyListMessage = computed(() => {
    switch (this.decisionViewMode()) {
      case 'approvals':
        return 'No approval decisions match the selected queue and filters.';
      case 'ai-reviews':
        return 'No AI review items match the selected queue and filters.';
      default:
        return 'No decision items match the selected queue and filters.';
    }
  });

  protected readonly emptyDetailSubtitle = computed(() => {
    switch (this.decisionViewMode()) {
      case 'approvals':
        return 'Choose an approval item from the queue to review policy context and take action.';
      case 'ai-reviews':
        return 'Choose an AI review item from the queue to review policy context and decide whether to proceed.';
      default:
        return 'Choose an item from the queue to review policy context and take action.';
    }
  });

  constructor() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      const mode = data['decisionView'];
      if (mode === 'approvals' || mode === 'ai-reviews' || mode === 'inbox') {
        this.decisionViewMode.set(mode);
      } else {
        this.decisionViewMode.set('inbox');
      }
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

  protected onQueueViewChange(value: string | number | null | undefined) {
    if (value === 'my' || value === 'team' || value === 'attention' || value === 'completed') {
      if (value === 'team' && !this.canViewTeamQueue()) {
        this.activeQueueView.set('my');
        this.ensureSelection();
        return;
      }
      this.activeQueueView.set(value);
      this.ensureSelection();
    }
  }

  protected onSearchInput(value: string) {
    this.searchQuery.set(value ?? '');
    this.ensureSelection();
  }

  protected selectDecision(item: OpportunityApprovalInboxItem) {
    this.selectedApprovalId.set(item.id);
  }

  protected openOpportunity(item: OpportunityApprovalInboxItem) {
    this.router.navigate(['/app/opportunities', item.opportunityId, 'edit']);
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
        const nextList = this.approvals().map((row) =>
          row.id === updatedItem.id
            ? {
                ...row,
                status: updatedItem.status,
                notes: updatedItem.notes,
                decisionOn: updatedItem.decisionOn,
                approverName: updatedItem.approverName,
                chainStatus: updatedItem.chainStatus,
                slaStatus: 'completed',
                priority: 'normal'
              }
            : row
        );
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

  private matchesDecisionView(item: OpportunityApprovalInboxItem, mode: DecisionViewMode): boolean {
    const decisionType = (item.decisionType || '').toLowerCase();
    const purpose = (item.purpose || '').toLowerCase();
    const policy = (item.policyReason || '').toLowerCase();

    if (mode === 'approvals') {
      return !decisionType.includes('ai') && !purpose.includes('ai review');
    }

    if (mode === 'ai-reviews') {
      return decisionType.includes('ai') || purpose.includes('ai') || policy.includes('ai action');
    }

    return true;
  }
}
