import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
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

type ApprovalLaneKey = 'urgent' | 'due-soon' | 'normal';
type ApprovalViewMode = 'cards' | 'table';

interface ApprovalLane {
  key: ApprovalLaneKey;
  title: string;
  subtitle: string;
  tone: 'danger' | 'warn' | 'success';
  icon: string;
  items: OpportunityApprovalInboxItem[];
  totalAmount: number;
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
    ConfirmDialogModule,
    TableModule,
    BreadcrumbsComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './opportunity-approvals.page.html',
  styleUrl: './opportunity-approvals.page.scss'
})
export class OpportunityApprovalsPage {
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly currentUserId = readUserId();

  protected readonly approvals = signal<OpportunityApprovalInboxItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly selectedApprovalId = signal<string | null>(null);
  protected readonly searchQuery = signal('');
  protected readonly viewMode = signal<ApprovalViewMode>('table');
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

  /** True when the user can only request approvals (Sales Rep) — no approve/override. */
  protected readonly isRequester = computed(() => !this.canManage());

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
    const items = this.filteredApprovals();
    const pending = items.filter((item) => item.status === 'Pending');
    const urgent = pending.filter((item) => this.laneFor(item) === 'urgent').length;
    const dueToday = pending.filter((item) => this.isDueToday(item)).length;
    const dueSoon = pending.filter((item) => this.laneFor(item) === 'due-soon').length;
    const totalAmount = pending.reduce((acc, item) => acc + (item.amount ?? 0), 0);

    return { pending: pending.length, urgent, dueToday, dueSoon, totalAmount };
  });
  protected readonly commandMetrics = computed(() => {
    const metrics = this.kpis();
    return [
      { label: 'Pending approvals', value: metrics.pending, tone: 'neutral' },
      { label: 'Urgent', value: metrics.urgent, tone: 'danger' },
      { label: 'Due soon', value: metrics.dueSoon, tone: 'warn' },
      { label: 'Due today', value: metrics.dueToday, tone: 'warn' }
    ];
  });

  protected readonly laneGroups = computed<ApprovalLane[]>(() => {
    const items = this.filteredApprovals();
    const grouped: Record<ApprovalLaneKey, OpportunityApprovalInboxItem[]> = {
      urgent: [],
      'due-soon': [],
      normal: []
    };

    for (const item of items) {
      grouped[this.laneFor(item)].push(item);
    }

    const buildLane = (
      key: ApprovalLaneKey,
      title: string,
      subtitle: string,
      tone: 'danger' | 'warn' | 'success',
      icon: string
    ): ApprovalLane => ({
      key,
      title,
      subtitle,
      tone,
      icon,
      items: grouped[key],
      totalAmount: grouped[key].reduce((acc, item) => acc + (item.amount ?? 0), 0)
    });

    return [
      buildLane('urgent', 'Urgent', 'Overdue, critical, or high-risk approvals', 'danger', 'pi pi-bolt'),
      buildLane('due-soon', 'Due Soon', 'Pending reviews approaching SLA or decision pressure', 'warn', 'pi pi-clock'),
      buildLane('normal', 'Normal', 'On-track approvals still waiting on a decision', 'success', 'pi pi-check-circle')
    ].filter((lane) => lane.items.length > 0);
  });

  protected readonly pageTitle = computed(() => {
    return this.isRequester() ? 'My Approval Requests' : 'Pending Action Center';
  });

  protected readonly heroDescription = computed(() => {
    return this.isRequester()
      ? 'Track the status of your submitted deal approvals. You\u2019ll see updates as managers review and decide.'
      : 'Review high-impact deal approvals in one operational queue. Each card surfaces risk, workflow context, and the next decision without forcing a table-first workflow.';
  });

  protected readonly queueSubtitle = computed(() => {
    return this.isRequester()
      ? 'View details and track progress on your submitted requests.'
      : 'Review, comment, and decide inline. Use Details when you need the full deal form.';
  });

  protected readonly emptyListMessage = computed(() => {
    return this.isRequester()
      ? 'You have no pending approval requests.'
      : 'No pending actions match the selected filters.';
  });

  protected readonly emptyDetailSubtitle = computed(() => {
    return this.isRequester()
      ? 'Your submitted approvals will appear here once created.'
      : 'Choose an item from the queue to review policy context and take action.';
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

  protected setViewMode(mode: ApprovalViewMode) {
    this.viewMode.set(mode);
  }

  protected laneLabel(lane: ApprovalLane): string {
    return `${lane.items.length} pending`;
  }

  protected laneValueLabel(lane: ApprovalLane): string {
    return this.formatCompactCurrency(lane.totalAmount);
  }

  protected openOpportunity(item: OpportunityApprovalInboxItem) {
    this.router.navigate(['/app/deals', item.opportunityId, 'edit'], {
      queryParams: {
        reviewMode: 'decision',
        decisionId: item.id,
        from: 'pending-action'
      }
    });
  }

  protected openWorkflowExecution(item: OpportunityApprovalInboxItem) {
    if (!item.workflowExecutionId) {
      return;
    }

    this.router.navigate(['/app/workflows/executions'], {
      queryParams: {
        executionId: item.workflowExecutionId,
        decisionId: item.id,
        dealId: item.workflowDealId ?? item.opportunityId
      }
    });
  }

  protected decide(item: OpportunityApprovalInboxItem, approved: boolean) {
    if (this.actioningIds().has(item.id)) {
      return;
    }

    this.confirmationService.confirm({
      header: approved ? 'Approve pending action' : 'Reject pending action',
      message: this.buildDecisionConfirmationMessage(item, approved),
      icon: approved ? 'pi pi-check-circle' : 'pi pi-times-circle',
      acceptLabel: approved ? 'Approve now' : 'Reject now',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: approved ? 'approve-confirm-btn' : 'reject-confirm-btn',
      blockScroll: true,
      dismissableMask: true,
      accept: () => this.executeDecision(item, approved)
    });
  }

  private executeDecision(item: OpportunityApprovalInboxItem, approved: boolean) {
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

    this.confirmationService.confirm({
      header: 'Request more information',
      message: this.buildRequestInfoConfirmationMessage(item),
      icon: 'pi pi-comment',
      acceptLabel: 'Send request',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'info-confirm-btn',
      blockScroll: true,
      dismissableMask: true,
      accept: () => this.executeRequestInfo(item)
    });
  }

  private executeRequestInfo(item: OpportunityApprovalInboxItem) {
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

  private buildDecisionConfirmationMessage(item: OpportunityApprovalInboxItem, approved: boolean): string {
    const note = (this.noteInputs[item.id] ?? '').trim();
    const noteSuffix = note ? ` Note: "${note}".` : ' No decision note will be included.';
    const action = approved ? 'approve' : 'reject';
    return `You are about to ${action} ${item.opportunityName} for ${this.amountLabel(item)}. ${this.compactWorkflowLabel(item)} · ${this.slaLabel(item)}.${noteSuffix}`;
  }

  private buildRequestInfoConfirmationMessage(item: OpportunityApprovalInboxItem): string {
    const note = (this.noteInputs[item.id] ?? '').trim();
    const noteSuffix = note ? ` Note: "${note}".` : ' No request note will be included.';
    return `Ask for more information on ${item.opportunityName} before a decision is made. ${this.compactWorkflowLabel(item)} · ${this.slaLabel(item)}.${noteSuffix}`;
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

  protected trackByLaneKey(_index: number, lane: ApprovalLane): ApprovalLaneKey {
    return lane.key;
  }

  protected isDueToday(item: OpportunityApprovalInboxItem): boolean {
    if (!item.slaDueAtUtc) {
      return false;
    }
    const due = new Date(item.slaDueAtUtc);
    const now = new Date();
    return (
      due.getFullYear() === now.getFullYear() &&
      due.getMonth() === now.getMonth() &&
      due.getDate() === now.getDate()
    );
  }

  protected amountLabel(item: OpportunityApprovalInboxItem): string {
    return this.formatCompactCurrency(item.amount);
  }

  protected actionSummary(item: OpportunityApprovalInboxItem): string {
    if (item.businessImpactLabel) {
      return item.businessImpactLabel;
    }
    if (item.policyReason) {
      return item.policyReason;
    }
    return 'Pending approval decision';
  }

  protected policySummary(item: OpportunityApprovalInboxItem): string {
    return item.policyReason || 'Policy review in progress';
  }

  protected compactPolicySummary(item: OpportunityApprovalInboxItem): string {
    const text = this.policySummary(item);
    return text.length > 72 ? `${text.slice(0, 69).trimEnd()}...` : text;
  }

  protected workflowLabel(item: OpportunityApprovalInboxItem): string {
    return item.workflowName || 'Deal Approval Workflow';
  }

  protected compactWorkflowLabel(item: OpportunityApprovalInboxItem): string {
    const label = this.workflowLabel(item);
    return label.replace(/ workflow$/i, '');
  }

  protected requesterLabel(item: OpportunityApprovalInboxItem): string {
    return item.requestedByName || 'Unknown requester';
  }

  protected tableRowSummary(item: OpportunityApprovalInboxItem): string {
    return this.compactPolicySummary(item);
  }

  protected purposeLabel(item: OpportunityApprovalInboxItem): string {
    return item.purpose || 'Approval';
  }

  protected priorityLabel(item: OpportunityApprovalInboxItem): string {
    return (item.priority || 'normal').toUpperCase();
  }

  protected riskLabel(item: OpportunityApprovalInboxItem): string {
    return (item.riskLevel || 'low').toUpperCase();
  }

  protected metaDueLabel(item: OpportunityApprovalInboxItem): string {
    if (item.slaStatus === 'overdue') {
      return 'Needs action';
    }
    if (this.isDueToday(item)) {
      return 'Review today';
    }
    return 'Queue active';
  }

  protected dueBadgeLabel(item: OpportunityApprovalInboxItem): string {
    if (item.status !== 'Pending') {
      return 'Completed';
    }
    if (item.slaStatus === 'overdue') {
      return 'Overdue';
    }
    if (this.isDueToday(item)) {
      return 'Due today';
    }
    if (this.laneFor(item) === 'due-soon') {
      return 'Due soon';
    }
    return 'On track';
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

  private laneFor(item: OpportunityApprovalInboxItem): ApprovalLaneKey {
    if (
      item.slaStatus === 'overdue' ||
      item.priority === 'critical' ||
      item.riskLevel === 'high'
    ) {
      return 'urgent';
    }

    if (item.slaStatus === 'at-risk') {
      return 'due-soon';
    }

    if (item.slaDueAtUtc) {
      const due = new Date(item.slaDueAtUtc).getTime();
      const hours = (due - Date.now()) / 3_600_000;
      if (hours >= 0 && hours <= 24) {
        return 'due-soon';
      }
    }

    return 'normal';
  }

}
