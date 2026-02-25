import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import {
  ApprovalWorkflowPolicy,
  ApprovalWorkflowStep,
  DecisionEscalationPolicy,
  WorkspaceSettings
} from '../../settings/models/workspace-settings.model';
import { DecisionHistoryItem, OpportunityApprovalInboxItem } from '../models/opportunity.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

@Component({
  selector: 'app-decision-policies-sla-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    CheckboxModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './decision-policies-sla.page.html',
  styleUrl: './decision-policies-sla.page.scss'
})
export class DecisionPoliciesSlaPage {
  private readonly approvals = inject(OpportunityApprovalService);
  private readonly workspace = inject(WorkspaceSettingsService);
  private readonly toast = inject(AppToastService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly workspaceSettings = signal<WorkspaceSettings | null>(null);
  protected readonly inboxRows = signal<OpportunityApprovalInboxItem[]>([]);
  protected readonly historyRows = signal<DecisionHistoryItem[]>([]);
  protected readonly quickApprovalAmountThreshold = signal<number | null>(null);
  protected readonly quickApprovalApproverRole = signal<string>('');
  protected readonly escalationPolicyDraft = signal<DecisionEscalationPolicy>(this.defaultDecisionEscalationPolicy());

  protected readonly approvalPolicy = computed<ApprovalWorkflowPolicy | null>(
    () => this.workspaceSettings()?.approvalWorkflowPolicy ?? null
  );

  protected readonly approvalSteps = computed<ApprovalWorkflowStep[]>(() => {
    const policy = this.approvalPolicy();
    const steps = policy?.steps ?? [];
    return [...steps].sort((a, b) => a.order - b.order);
  });

  protected readonly activePolicyCount = computed(() => {
    const settings = this.workspaceSettings();
    let count = 0;
    if ((settings?.approvalWorkflowPolicy?.enabled ?? false) && this.approvalSteps().length) count += 1;
    if ((settings?.approvalAmountThreshold ?? 0) > 0) count += 1;
    if ((settings?.decisionEscalationPolicy?.enabled ?? true)) count += 1;
    if ((settings?.leadFirstTouchSlaHours ?? 0) > 0) count += 1;
    return count;
  });

  protected readonly canManagePolicies = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
  });

  protected readonly operationalKpis = computed(() => {
    const inbox = this.inboxRows();
    const pending = inbox.filter((r) => r.status === 'Pending');
    const overdue = pending.filter((r) => r.slaStatus === 'overdue').length;
    const atRisk = pending.filter((r) => r.slaStatus === 'at-risk').length;
    const escalated = pending.filter((r) => !!r.isEscalated).length;
    const avgAgeHours = pending.length
      ? Math.round((pending.reduce((acc, row) => acc + (row.requestedAgeHours ?? 0), 0) / pending.length) * 10) / 10
      : 0;
    return { pending: pending.length, overdue, atRisk, escalated, avgAgeHours };
  });

  protected readonly historyKpis = computed(() => {
    const rows = this.historyRows();
    const now = Date.now();
    const within7d = rows.filter((r) => now - new Date(r.actionAtUtc).getTime() <= 7 * 24 * 60 * 60 * 1000);
    return {
      events7d: within7d.length,
      escalations7d: within7d.filter((r) => r.isEscalated || r.action === 'ApprovalSlaEscalated').length,
      approvals7d: within7d.filter((r) => r.action === 'Approved').length,
      rejections7d: within7d.filter((r) => r.action === 'Rejected').length
    };
  });

  protected readonly purposeDistribution = computed(() => {
    const pending = this.inboxRows().filter((r) => r.status === 'Pending');
    const groups = new Map<string, number>();
    for (const row of pending) {
      const key = row.purpose || 'Unspecified';
      groups.set(key, (groups.get(key) ?? 0) + 1);
    }
    return Array.from(groups.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  });

  protected readonly escalationTrendRows = computed(() => {
    return this.historyRows()
      .filter((r) => r.isEscalated || r.action === 'ApprovalSlaEscalated')
      .slice(0, 12);
  });

  protected readonly escalationRoutingRows = computed(() => {
    const workflowRoles = Array.from(
      new Set(
        this.approvalSteps()
          .map((step) => (step.approverRole ?? '').trim())
          .filter(Boolean)
      )
    );

    const rows: Array<{
      order: number;
      target: string;
      source: string;
      status: 'configured' | 'fallback';
      description: string;
    }> = [];

    rows.push({
      order: 1,
      target: 'Current assignee',
      source: 'DecisionStep.AssigneeUserId',
      status: this.escalationPolicyDraft().notifyCurrentAssignee ? 'configured' : 'fallback',
      description: this.escalationPolicyDraft().notifyCurrentAssignee
        ? 'Primary escalation recipient when the pending step has a direct assignee.'
        : 'Disabled by policy; current assignee notifications are skipped.'
    });

    rows.push({
      order: 2,
      target: workflowRoles.length ? workflowRoles.join(', ') : (this.workspaceSettings()?.approvalApproverRole || 'Step approver role'),
      source: 'Pending step approver role',
      status: this.escalationPolicyDraft().notifyPendingStepRole && workflowRoles.length ? 'configured' : 'fallback',
      description: this.escalationPolicyDraft().notifyPendingStepRole
        ? 'Fallback notification target uses the pending step approver role users when no direct assignee is available.'
        : 'Disabled by policy; step approver role notifications are skipped.'
    });

    rows.push({
      order: 3,
      target: this.escalationPolicyDraft().fallbackRoleName || 'Sales Manager',
      source: 'Global fallback role',
      status: 'fallback',
      description: 'Safety-net escalation recipient when assignee and step-role recipients are unavailable.'
    });

    return rows;
  });

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    let pending = 3;
    const finish = () => {
      pending -= 1;
      if (pending <= 0) {
        this.loading.set(false);
      }
    };

    this.workspace
      .getSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (settings) => {
          this.workspaceSettings.set(settings);
          this.quickApprovalAmountThreshold.set(settings.approvalAmountThreshold ?? null);
          this.quickApprovalApproverRole.set(settings.approvalApproverRole ?? '');
          this.escalationPolicyDraft.set(this.normalizeEscalationPolicy(settings.decisionEscalationPolicy));
          finish();
        },
        error: () => {
          finish();
          this.toast.show('error', 'Unable to load workspace policy settings.', 3000);
        }
      });

    this.approvals
      .getInbox()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (rows) => {
          this.inboxRows.set(rows ?? []);
          finish();
        },
        error: () => {
          finish();
          this.toast.show('error', 'Unable to load decision inbox metrics.', 3000);
        }
      });

    this.approvals
      .getDecisionHistory({ take: 200 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (rows) => {
          this.historyRows.set(rows ?? []);
          finish();
        },
        error: () => {
          finish();
          this.toast.show('error', 'Unable to load decision history metrics.', 3000);
        }
      });
  }

  protected approvalPolicyEnabledLabel(): string {
    return this.approvalPolicy()?.enabled ? 'Enabled' : 'Disabled';
  }

  protected approvalPolicyEnabledSeverity(): 'success' | 'warn' {
    return this.approvalPolicy()?.enabled ? 'success' : 'warn';
  }

  protected slaSeverity(value: string): 'success' | 'warn' | 'danger' | 'info' {
    const v = (value || '').toLowerCase();
    if (v === 'overdue') return 'danger';
    if (v === 'at-risk') return 'warn';
    if (v === 'on-track') return 'success';
    return 'info';
  }

  protected prioritySeverity(value?: string | null): 'success' | 'warn' | 'danger' | 'contrast' | 'info' {
    const v = (value || '').toLowerCase();
    if (v === 'critical') return 'danger';
    if (v === 'high') return 'warn';
    if (v === 'medium') return 'info';
    if (v === 'normal') return 'success';
    return 'contrast';
  }

  protected routingRowSeverity(status: 'configured' | 'fallback'): 'success' | 'info' {
    return status === 'configured' ? 'success' : 'info';
  }

  protected saveQuickPolicyControls(): void {
    const settings = this.workspaceSettings();
    if (!settings || !this.canManagePolicies() || this.saving()) {
      return;
    }

    this.saving.set(true);
    this.workspace.updateSettings({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: settings.currency,
      leadFirstTouchSlaHours: settings.leadFirstTouchSlaHours ?? null,
      defaultContractTermMonths: settings.defaultContractTermMonths ?? null,
      defaultDeliveryOwnerRoleId: settings.defaultDeliveryOwnerRoleId ?? null,
      approvalAmountThreshold: this.quickApprovalAmountThreshold(),
      approvalApproverRole: this.quickApprovalApproverRole().trim() || null,
      approvalWorkflowPolicy: settings.approvalWorkflowPolicy ?? null,
      qualificationPolicy: settings.qualificationPolicy ?? null,
      assistantActionScoringPolicy: settings.assistantActionScoringPolicy ?? null,
      decisionEscalationPolicy: this.normalizeEscalationPolicy(this.escalationPolicyDraft()),
      supportingDocumentPolicy: settings.supportingDocumentPolicy ?? null
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (updated) => {
        this.workspaceSettings.set(updated);
        this.quickApprovalAmountThreshold.set(updated.approvalAmountThreshold ?? null);
        this.quickApprovalApproverRole.set(updated.approvalApproverRole ?? '');
        this.escalationPolicyDraft.set(this.normalizeEscalationPolicy(updated.decisionEscalationPolicy));
        this.saving.set(false);
        this.toast.show('success', 'Decision policy controls updated.', 2500);
      },
      error: () => {
        this.saving.set(false);
        this.toast.show('error', 'Unable to save decision policy controls.', 3000);
      }
    });
  }

  protected updateEscalationPolicy<K extends keyof DecisionEscalationPolicy>(key: K, value: DecisionEscalationPolicy[K]): void {
    this.escalationPolicyDraft.update((current) => ({ ...current, [key]: value }));
  }

  private normalizeEscalationPolicy(policy?: DecisionEscalationPolicy | null): DecisionEscalationPolicy {
    const defaults = this.defaultDecisionEscalationPolicy();
    return {
      enabled: policy?.enabled ?? defaults.enabled,
      sendEmailNotifications: policy?.sendEmailNotifications ?? defaults.sendEmailNotifications,
      notifyCurrentAssignee: policy?.notifyCurrentAssignee ?? defaults.notifyCurrentAssignee,
      notifyPendingStepRole: policy?.notifyPendingStepRole ?? defaults.notifyPendingStepRole,
      fallbackRoleName: (policy?.fallbackRoleName ?? defaults.fallbackRoleName).trim() || defaults.fallbackRoleName
    };
  }

  private defaultDecisionEscalationPolicy(): DecisionEscalationPolicy {
    return {
      enabled: true,
      sendEmailNotifications: true,
      notifyCurrentAssignee: true,
      notifyPendingStepRole: true,
      fallbackRoleName: 'Sales Manager'
    };
  }
}
