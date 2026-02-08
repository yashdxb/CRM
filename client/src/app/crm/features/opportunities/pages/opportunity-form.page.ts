import { ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { map, of, switchMap } from 'rxjs';

import { OpportunityDataService, OpportunityReviewOutcomeRequest, SaveOpportunityRequest } from '../services/opportunity-data.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { OpportunityReviewChecklistService } from '../services/opportunity-review-checklist.service';
import { OpportunityOnboardingService } from '../services/opportunity-onboarding.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  Opportunity,
  OpportunityApprovalItem,
  OpportunityReviewChecklistItem,
  OpportunityReviewThreadItem,
  OpportunityOnboardingItem,
  OpportunityTeamMember
} from '../models/opportunity.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission, tokenHasRole } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserListItem } from '../../settings/models/user-admin.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-opportunity-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./opportunity-form.page.html",
  styleUrls: ['./opportunity-form.page.scss']
})
export class OpportunityFormPage implements OnInit {
  protected readonly stageOptions: Option[] = [
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Security / Legal Review', value: 'Security / Legal Review' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Commit', value: 'Commit' },
    { label: 'Closed Won', value: 'Closed Won' },
    { label: 'Closed Lost', value: 'Closed Lost' }
  ];

  protected readonly currencyOptions: Option[] = [
    { label: 'USD', value: 'USD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' }
  ];

  protected readonly reviewStatusOptions: Option[] = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Blocked', value: 'Blocked' }
  ];
  protected readonly onboardingStatusOptions: Option[] = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Blocked', value: 'Blocked' }
  ];
  protected readonly forecastCategoryOptions: Option[] = [
    { label: 'Pipeline', value: 'Pipeline' },
    { label: 'Best Case', value: 'Best Case' },
    { label: 'Commit', value: 'Commit' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Omitted', value: 'Omitted' }
  ];
  protected readonly opportunityTypeOptions: Option[] = [
    { label: 'New', value: 'New' },
    { label: 'Renewal', value: 'Renewal' },
    { label: 'Expansion', value: 'Expansion' }
  ];

  protected accountOptions: Option<string | undefined>[] = [];
  protected selectedStage = 'Prospecting';
  protected form: SaveOpportunityRequest = this.createEmptyForm();
  protected saving = signal(false);
  protected readonly isEditMode = signal(false);
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
  });
  protected readonly isManager = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return tokenHasRole(payload, 'Sales Manager') || tokenHasRole(payload, 'System Administrator');
  });
  protected readonly hasPendingAcknowledgment = computed(() =>
    this.reviewThread().some((item) => item.kind === 'Acknowledgment' && !item.completedDateUtc)
  );
  protected securityChecklist: OpportunityReviewChecklistItem[] = [];
  protected legalChecklist: OpportunityReviewChecklistItem[] = [];
  protected newSecurityItem = '';
  protected newLegalItem = '';
  protected checklistSavingIds = new Set<string>();
  protected checklistSavedIds = new Set<string>();
  protected approvals: OpportunityApprovalItem[] = [];
  protected readonly approvalPurposeOptions: Option[] = [
    { label: 'Close', value: 'Close' },
    { label: 'Discount', value: 'Discount' }
  ];
  protected approvalRequest = {
    purpose: 'Close',
    amount: 0,
    currency: 'USD'
  };
  protected approvalRequesting = signal(false);
  protected approvalDecisionNotes: Record<string, string> = {};
  protected approvalDecidingIds = new Set<string>();
  private approvalAmountLocked = false;
  private syncingApprovalAmount = false;
  protected readonly reviewOutcomeOptions: Option[] = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Needs Work', value: 'Needs Work' },
    { label: 'Escalated', value: 'Escalated' }
  ];
  protected reviewThread = signal<OpportunityReviewThreadItem[]>([]);
  protected readonly teamRoleOptions: Option[] = [
    { label: 'Solution Consultant', value: 'Solution Consultant' },
    { label: 'Sales Engineer', value: 'Sales Engineer' },
    { label: 'Product Specialist', value: 'Product Specialist' },
    { label: 'Executive Sponsor', value: 'Executive Sponsor' }
  ];
  protected readonly deliveryStatusOptions: Option[] = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];
  protected teamMemberOptions: Option[] = [];
  protected teamMembers: OpportunityTeamMember[] = [];
  private teamDirty = false;
  protected onboardingChecklist: OpportunityOnboardingItem[] = [];
  protected onboardingMilestones: OpportunityOnboardingItem[] = [];
  protected onboardingSavingIds = new Set<string>();
  protected onboardingSavedIds = new Set<string>();
  protected newOnboardingChecklistItem = '';
  protected newOnboardingMilestoneItem = '';
  protected reviewOutcome: OpportunityReviewOutcomeRequest['outcome'] = 'Needs Work';
  protected reviewComment = '';
  protected reviewAckDueLocal = '';
  protected reviewSubmitting = false;
  protected ackSubmitting = false;
  protected nextStepDueAtUtc: Date | null = null;
  private originalStage: string | null = null;
  private editingId: string | null = null;
  private pendingOpportunity: Opportunity | null = null;
  private pendingAccountName: string | null = null;

  private readonly opportunityData = inject(OpportunityDataService);
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly checklistService = inject(OpportunityReviewChecklistService);
  private readonly onboardingService = inject(OpportunityOnboardingService);
  private readonly userAdminData = inject(UserAdminDataService);
  protected readonly router = inject(Router);
  protected readonly customerData = inject(CustomerDataService);
  private readonly toastService = inject(AppToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadAccounts();
    this.reviewAckDueLocal = this.defaultReviewDueLocal();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.editingId = id;
      this.isEditMode.set(!!id);
      if (id) {
        this.loadOpportunity(id);
        this.loadChecklists(id);
        this.loadApprovals(id);
        this.loadReviewThread(id);
        this.loadOnboarding(id);
        this.loadTeamMembers(id);
      } else {
        this.form = this.createEmptyForm();
        this.selectedStage = this.form.stageName ?? 'Prospecting';
        this.securityChecklist = [];
        this.legalChecklist = [];
        this.onboardingChecklist = [];
        this.onboardingMilestones = [];
        this.approvals = [];
        this.reviewThread.set([]);
      }
    });
    this.loadTeamMemberOptions();
  }

  protected onStageChange(stage: string) {
    this.selectedStage = stage;
    this.form.stageName = stage;
    this.form.probability = this.estimateProbability(stage);
    this.form.isClosed = stage.startsWith('Closed');
    this.form.isWon = stage === 'Closed Won';
    const defaultForecast = this.estimateForecastCategory(stage);
    if (!this.form.forecastCategory || stage.startsWith('Closed') || stage === 'Commit') {
      this.form.forecastCategory = defaultForecast;
    }
  }

  protected onSave() {
    if (!this.form.name) return;
    const teamError = this.validateTeamMembers();
    if (teamError) {
      this.toastService.show('error', teamError, 4000);
      return;
    }
    const validationError = this.validateStageRequirements();
    if (validationError) {
      this.toastService.show('error', validationError, 4000);
      return;
    }
    this.saving.set(true);

    const rawCloseDate = this.form.expectedCloseDate as unknown;
    const expectedCloseDate = rawCloseDate instanceof Date
      ? rawCloseDate.toISOString()
      : (typeof rawCloseDate === 'string' && rawCloseDate.trim() ? rawCloseDate : undefined);
    const rawContractStart = this.form.contractStartDateUtc as unknown;
    const contractStartDateUtc = rawContractStart instanceof Date
      ? rawContractStart.toISOString()
      : (typeof rawContractStart === 'string' && rawContractStart.trim() ? rawContractStart : undefined);
    const rawContractEnd = this.form.contractEndDateUtc as unknown;
    const contractEndDateUtc = rawContractEnd instanceof Date
      ? rawContractEnd.toISOString()
      : (typeof rawContractEnd === 'string' && rawContractEnd.trim() ? rawContractEnd : undefined);
    const rawDeliveryCompleted = this.form.deliveryCompletedAtUtc as unknown;
    const deliveryCompletedAtUtc = rawDeliveryCompleted instanceof Date
      ? rawDeliveryCompleted.toISOString()
      : (typeof rawDeliveryCompleted === 'string' && rawDeliveryCompleted.trim() ? rawDeliveryCompleted : undefined);
    const payload: SaveOpportunityRequest = {
      ...this.form,
      expectedCloseDate,
      contractStartDateUtc,
      contractEndDateUtc,
      deliveryCompletedAtUtc,
      stageName: this.selectedStage,
      winLossReason: this.form.winLossReason || null
    };

    const request$ = this.editingId
      ? this.opportunityData.update(this.editingId, payload).pipe(map(() => this.editingId!))
      : this.opportunityData.create(payload).pipe(map((opp) => opp.id));

    request$
      .pipe(switchMap((id) => this.saveTeamMembers(id)))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.originalStage = this.selectedStage;
        },
        error: (err) => {
          this.saving.set(false);
          const message = typeof err?.error === 'string' ? err.error : 'Unable to save opportunity.';
          this.toastService.show('error', message, 4000);
        }
      });
  }

  protected addTeamMember() {
    this.teamMembers = [
      ...this.teamMembers,
      {
        userId: '',
        userName: '',
        role: this.teamRoleOptions[0]?.value ?? '',
        createdAtUtc: new Date().toISOString()
      }
    ];
    this.teamDirty = true;
  }

  protected removeTeamMember(index: number) {
    this.teamMembers = this.teamMembers.filter((_, i) => i !== index);
    this.teamDirty = true;
  }

  protected markTeamDirty() {
    this.teamDirty = true;
  }

  protected accountLink(): string | null {
    return this.form.accountId ? `/app/customers/${this.form.accountId}/edit` : null;
  }

  protected accountLabel(): string {
    const id = this.form.accountId;
    if (!id) {
      return 'No linked account yet.';
    }
    return this.accountOptions.find((option) => option.value === id)?.label ?? 'Account';
  }

  private loadAccounts() {
    this.customerData.search({ page: 1, pageSize: 50 }).subscribe((res) => {
      this.accountOptions = res.items.map((c) => ({ label: c.name, value: c.id }));
      if (this.pendingAccountName && !this.form.accountId) {
        const match = this.accountOptions.find((opt) => opt.label === this.pendingAccountName);
        this.form.accountId = match?.value;
        this.pendingAccountName = null;
      }

      if (!this.isEditMode() && !this.form.accountId) {
        this.form.accountId = res.items[0]?.id;
      }

      if (this.pendingOpportunity) {
        this.applyOpportunity(this.pendingOpportunity);
        this.pendingOpportunity = null;
      }
      this.cdr.detectChanges();
    });
  }

  protected forecastGuidance(): string | null {
    const stage = this.selectedStage || this.form.stageName || 'Prospecting';
    const required = this.estimateForecastCategory(stage);

    if (stage.startsWith('Closed')) {
      return `Required: ${required} for ${stage}.`;
    }
    if (stage === 'Commit') {
      return 'Required: Commit before moving to the Commit stage.';
    }
    return `Default for ${stage}: ${required}.`;
  }

  private loadOpportunity(id: string) {
    this.opportunityData.getById(id).subscribe({
      next: (opp) => {
        this.applyOpportunity(opp);
        if (!this.accountOptions.length) {
          this.pendingOpportunity = opp;
        }
      },
      error: () => {
        this.router.navigate(['/app/opportunities']);
      }
    });
  }

  private loadChecklists(opportunityId: string) {
    this.checklistService.get(opportunityId, 'Security').subscribe({
      next: (items) => {
        this.securityChecklist = items;
        this.cdr.detectChanges();
      }
    });
    this.checklistService.get(opportunityId, 'Legal').subscribe({
      next: (items) => {
        this.legalChecklist = items;
        this.cdr.detectChanges();
      }
    });
  }

  private loadOnboarding(opportunityId: string) {
    this.onboardingService.get(opportunityId, 'Checklist').subscribe({
      next: (items) => {
        this.onboardingChecklist = (items ?? []).map((item) => ({
          ...item,
          dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.onboardingChecklist = [];
      }
    });
    this.onboardingService.get(opportunityId, 'Milestone').subscribe({
      next: (items) => {
        this.onboardingMilestones = (items ?? []).map((item) => ({
          ...item,
          dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.onboardingMilestones = [];
      }
    });
  }

  private loadApprovals(opportunityId: string) {
    this.approvalService.getForOpportunity(opportunityId).subscribe({
      next: (items) => {
        this.approvals = items ?? [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.approvals = [];
      }
    });
  }

  private loadReviewThread(opportunityId: string) {
    this.opportunityData.getReviewThread(opportunityId).subscribe({
      next: (items) => {
        this.reviewThread.set(items ?? []);
        this.cdr.detectChanges();
      },
      error: () => {
        this.reviewThread.set([]);
      }
    });
  }

  private loadTeamMemberOptions() {
    this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
      next: (res) => {
        this.teamMemberOptions = res.items.map((user: UserListItem) => ({
          label: user.fullName,
          value: user.id
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.teamMemberOptions = [];
      }
    });
  }

  private loadTeamMembers(opportunityId: string) {
    this.opportunityData.getTeam(opportunityId).subscribe({
      next: (items) => {
        this.teamMembers = items ?? [];
        this.teamDirty = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.teamMembers = [];
        this.teamDirty = false;
      }
    });
  }

  private saveTeamMembers(opportunityId: string) {
    if (!this.teamDirty) {
      return of(null);
    }

    const members = this.teamMembers
      .filter((member) => member.userId && member.role)
      .map((member) => ({
        userId: member.userId,
        role: member.role
      }));

    return this.opportunityData.updateTeam(opportunityId, { members }).pipe(
      map((items) => {
        this.teamMembers = items ?? [];
        this.teamDirty = false;
        return null;
      })
    );
  }

  private validateTeamMembers(): string | null {
    if (!this.teamMembers.length) {
      return null;
    }
    const missing = this.teamMembers.some((member) => !member.userId || !member.role);
    if (missing) {
      return 'Each team member needs a user and role.';
    }
    const unique = new Set(this.teamMembers.map((member) => member.userId));
    if (unique.size !== this.teamMembers.length) {
      return 'Duplicate team members are not allowed.';
    }
    return null;
  }

  protected submitReviewOutcome() {
    if (!this.editingId || this.reviewSubmitting || !this.isManager()) {
      return;
    }

    const comment = this.reviewComment.trim();
    const requiresDue = this.reviewOutcome !== 'Approved';
    const acknowledgmentDueAtUtc = requiresDue ? this.localToUtcIso(this.reviewAckDueLocal) : null;
    if (requiresDue && !acknowledgmentDueAtUtc) {
      this.toastService.show('error', 'Acknowledgment due date is required for Needs Work or Escalated.', 4000);
      return;
    }

    this.reviewSubmitting = true;
    this.opportunityData
      .addReviewOutcome(this.editingId, {
        outcome: this.reviewOutcome,
        comment: comment || null,
        acknowledgmentDueAtUtc
      })
      .subscribe({
        next: () => {
          this.reviewSubmitting = false;
          this.reviewComment = '';
          this.reviewAckDueLocal = this.defaultReviewDueLocal();
          this.loadReviewThread(this.editingId!);
          this.toastService.show('success', 'Review outcome saved.', 2500);
        },
        error: (err) => {
          this.reviewSubmitting = false;
          const message = typeof err?.error === 'string' ? err.error : 'Unable to save review outcome.';
          this.toastService.show('error', message, 4000);
        }
      });
  }

  protected acknowledgeReview() {
    if (!this.editingId || this.ackSubmitting || this.isManager()) {
      return;
    }

    this.ackSubmitting = true;
    this.opportunityData.acknowledgeReview(this.editingId).subscribe({
      next: () => {
        this.ackSubmitting = false;
        this.loadReviewThread(this.editingId!);
        this.toastService.show('success', 'Review acknowledged.', 2500);
      },
      error: (err) => {
        this.ackSubmitting = false;
        const message = typeof err?.error === 'string' ? err.error : 'Unable to acknowledge review.';
        this.toastService.show('error', message, 4000);
      }
    });
  }

  protected requestApproval() {
    if (!this.editingId || this.approvalRequesting()) {
      return;
    }
    const amount = Number(this.approvalRequest.amount ?? 0);
    if (!amount || amount <= 0) {
      this.toastService.show('error', 'Approval amount must be greater than zero.', 3000);
      return;
    }

    this.approvalRequesting.set(true);
    this.approvalService
      .requestApproval(this.editingId, {
        amount,
        currency: this.approvalRequest.currency ?? 'USD',
        purpose: this.approvalRequest.purpose
      })
      .subscribe({
        next: (item) => {
          this.upsertApproval(item);
          this.approvalRequesting.set(false);
          this.toastService.show('success', 'Approval request sent.', 2500);
        },
        error: (err) => {
          this.approvalRequesting.set(false);
          const message = typeof err?.error === 'string' ? err.error : 'Unable to request approval.';
          this.toastService.show('error', message, 3500);
        }
      });
  }

  protected decideApproval(item: OpportunityApprovalItem, approved: boolean) {
    if (this.approvalDecidingIds.has(item.id)) {
      return;
    }
    this.approvalDecidingIds.add(item.id);
    this.approvalService
      .decide(item.id, {
        approved,
        notes: this.approvalDecisionNotes[item.id] || null
      })
      .subscribe({
        next: (updated) => {
          this.upsertApproval(updated);
          this.approvalDecidingIds.delete(item.id);
          this.toastService.show('success', 'Approval updated.', 2500);
        },
        error: (err) => {
          this.approvalDecidingIds.delete(item.id);
          const message = typeof err?.error === 'string' ? err.error : 'Unable to update approval.';
          this.toastService.show('error', message, 3500);
        }
      });
  }

  protected isApprovalsLoading(): boolean {
    return this.approvalRequesting();
  }

  protected approvalStatusClass(status: string): string {
    return `approval-status approval-status--${status.toLowerCase()}`;
  }

  protected onApprovalPurposeChange(purpose: string) {
    this.approvalRequest.purpose = purpose;
    this.approvalAmountLocked = false;
    this.syncApprovalAmount();
  }

  protected onApprovalAmountEdited() {
    if (!this.syncingApprovalAmount) {
      this.approvalAmountLocked = true;
    }
  }

  protected syncApprovalAmount() {
    if (this.approvalAmountLocked) {
      return;
    }
    this.syncingApprovalAmount = true;
    try {
      const amount = this.approvalRequest.purpose === 'Discount'
        ? (this.form.discountAmount ?? 0)
        : (this.form.amount ?? 0);
      this.approvalRequest.amount = amount ?? 0;
    } finally {
      this.syncingApprovalAmount = false;
    }
  }

  protected onCurrencyChange(currency: string) {
    this.form.currency = currency;
    this.approvalRequest.currency = currency;
  }

  protected addChecklistItem(type: 'Security' | 'Legal') {
    const title = (type === 'Security' ? this.newSecurityItem : this.newLegalItem).trim();
    if (!title || !this.editingId) {
      return;
    }

    this.checklistService
      .create(this.editingId, { title, type, status: 'Pending' })
      .subscribe((item) => {
        if (type === 'Security') {
          this.securityChecklist = [...this.securityChecklist, item];
          this.newSecurityItem = '';
        } else {
          this.legalChecklist = [...this.legalChecklist, item];
          this.newLegalItem = '';
        }
      });
  }

  protected saveChecklistItem(item: OpportunityReviewChecklistItem) {
    if (this.checklistSavingIds.has(item.id)) {
      return;
    }
    this.checklistSavingIds.add(item.id);
    this.checklistService
      .update(item.id, {
        title: item.title,
        status: item.status,
        notes: item.notes ?? null
      })
      .subscribe({
        next: () => {
          this.checklistSavingIds.delete(item.id);
          this.checklistSavedIds.add(item.id);
          window.setTimeout(() => this.checklistSavedIds.delete(item.id), 1200);
        },
        error: () => {
          this.checklistSavingIds.delete(item.id);
        }
      });
  }

  protected deleteChecklistItem(item: OpportunityReviewChecklistItem) {
    this.checklistService.delete(item.id).subscribe(() => {
      if (item.type === 'Security') {
        this.securityChecklist = this.securityChecklist.filter((i) => i.id !== item.id);
      } else {
        this.legalChecklist = this.legalChecklist.filter((i) => i.id !== item.id);
      }
    });
  }

  protected addOnboardingItem(type: 'Checklist' | 'Milestone') {
    const title = (type === 'Checklist' ? this.newOnboardingChecklistItem : this.newOnboardingMilestoneItem).trim();
    if (!title || !this.editingId) {
      return;
    }

    this.onboardingService
      .create(this.editingId, { title, type, status: 'Pending' })
      .subscribe((item) => {
        if (type === 'Checklist') {
          this.onboardingChecklist = [...this.onboardingChecklist, item];
          this.newOnboardingChecklistItem = '';
        } else {
          this.onboardingMilestones = [...this.onboardingMilestones, item];
          this.newOnboardingMilestoneItem = '';
        }
      });
  }

  protected saveOnboardingItem(item: OpportunityOnboardingItem) {
    if (this.onboardingSavingIds.has(item.id)) {
      return;
    }
    this.onboardingSavingIds.add(item.id);
    this.onboardingService
      .update(item.id, {
        title: item.title,
        status: item.status,
        type: item.type,
        dueDateUtc: item.dueDateUtc,
        notes: item.notes ?? null
      })
      .subscribe({
        next: () => {
          this.onboardingSavingIds.delete(item.id);
          this.onboardingSavedIds.add(item.id);
          window.setTimeout(() => this.onboardingSavedIds.delete(item.id), 1200);
        },
        error: () => {
          this.onboardingSavingIds.delete(item.id);
        }
      });
  }

  protected deleteOnboardingItem(item: OpportunityOnboardingItem) {
    this.onboardingService.delete(item.id).subscribe(() => {
      if (item.type === 'Checklist') {
        this.onboardingChecklist = this.onboardingChecklist.filter((i) => i.id !== item.id);
      } else {
        this.onboardingMilestones = this.onboardingMilestones.filter((i) => i.id !== item.id);
      }
    });
  }

  protected isOnboardingSaving(item: OpportunityOnboardingItem): boolean {
    return this.onboardingSavingIds.has(item.id);
  }

  protected isOnboardingSaved(item: OpportunityOnboardingItem): boolean {
    return this.onboardingSavedIds.has(item.id);
  }

  protected isChecklistSaving(item: OpportunityReviewChecklistItem): boolean {
    return this.checklistSavingIds.has(item.id);
  }

  protected isChecklistSaved(item: OpportunityReviewChecklistItem): boolean {
    return this.checklistSavedIds.has(item.id);
  }

  private applyOpportunity(opp: Opportunity) {
    const accountIdFromName = this.accountOptions.find((opt) => opt.label === opp.account)?.value;
    if (!accountIdFromName && opp.account) {
      this.pendingAccountName = opp.account;
    }
    const resolvedAccountId = opp.accountId ?? accountIdFromName ?? this.form.accountId;
    const stage = opp.stage || 'Prospecting';
    this.selectedStage = stage;
    this.originalStage = stage;
    Object.assign(this.form, {
      name: opp.name,
      accountId: resolvedAccountId,
      stageName: stage,
      amount: opp.amount ?? 0,
      currency: opp.currency ?? 'USD',
      probability: opp.probability ?? this.estimateProbability(stage),
      forecastCategory: opp.forecastCategory ?? this.estimateForecastCategory(stage),
      opportunityType: opp.opportunityType ?? 'New',
      expectedCloseDate: opp.closeDate ? new Date(opp.closeDate) : undefined,
      contractStartDateUtc: opp.contractStartDateUtc ? new Date(opp.contractStartDateUtc) : undefined,
      contractEndDateUtc: opp.contractEndDateUtc ? new Date(opp.contractEndDateUtc) : undefined,
      summary: opp.summary ?? '',
      requirements: opp.requirements ?? '',
      buyingProcess: opp.buyingProcess ?? '',
      successCriteria: opp.successCriteria ?? '',
      discountPercent: opp.discountPercent ?? undefined,
      discountAmount: opp.discountAmount ?? undefined,
      pricingNotes: opp.pricingNotes ?? '',
      securityReviewStatus: opp.securityReviewStatus ?? 'Not Started',
      securityNotes: opp.securityNotes ?? '',
      legalReviewStatus: opp.legalReviewStatus ?? 'Not Started',
      legalNotes: opp.legalNotes ?? '',
      deliveryOwnerId: opp.deliveryOwnerId ?? undefined,
      deliveryHandoffScope: opp.deliveryHandoffScope ?? '',
      deliveryHandoffRisks: opp.deliveryHandoffRisks ?? '',
      deliveryHandoffTimeline: opp.deliveryHandoffTimeline ?? '',
      deliveryStatus: opp.deliveryStatus ?? undefined,
      deliveryCompletedAtUtc: opp.deliveryCompletedAtUtc ? new Date(opp.deliveryCompletedAtUtc) : undefined,
      isClosed: opp.status !== 'Open',
      isWon: opp.status === 'Closed Won',
      winLossReason: opp.winLossReason ?? ''
    });
    this.nextStepDueAtUtc = opp.nextStepDueAtUtc ? new Date(opp.nextStepDueAtUtc) : null;
    this.approvalRequest = {
      ...this.approvalRequest,
      amount: opp.amount ?? this.approvalRequest.amount,
      currency: opp.currency ?? this.approvalRequest.currency
    };
    this.approvalAmountLocked = false;
    this.syncApprovalAmount();
    this.cdr.detectChanges();
  }

  private createEmptyForm(): SaveOpportunityRequest {
    return {
      name: '',
      accountId: undefined,
      stageName: 'Prospecting',
      amount: 0,
      currency: 'USD',
      probability: this.estimateProbability('Prospecting'),
      forecastCategory: this.estimateForecastCategory('Prospecting'),
      opportunityType: 'New',
      expectedCloseDate: undefined,
      contractStartDateUtc: undefined,
      contractEndDateUtc: undefined,
      summary: '',
      requirements: '',
      buyingProcess: '',
      successCriteria: '',
      discountPercent: undefined,
      discountAmount: undefined,
      pricingNotes: '',
      securityReviewStatus: 'Not Started',
      securityNotes: '',
      legalReviewStatus: 'Not Started',
      legalNotes: '',
      deliveryOwnerId: undefined,
      deliveryHandoffScope: '',
      deliveryHandoffRisks: '',
      deliveryHandoffTimeline: '',
      deliveryStatus: undefined,
      deliveryCompletedAtUtc: undefined,
      isClosed: false,
      isWon: false,
      winLossReason: ''
    };
  }

  private upsertApproval(item: OpportunityApprovalItem) {
    const existingIndex = this.approvals.findIndex((approval) => approval.id === item.id);
    if (existingIndex >= 0) {
      const updated = [...this.approvals];
      updated[existingIndex] = item;
      this.approvals = updated;
    } else {
      this.approvals = [item, ...this.approvals];
    }
  }

  private estimateProbability(stage: string) {
    const map: Record<string, number> = {
      Prospecting: 20,
      Qualification: 35,
      Proposal: 55,
      'Security / Legal Review': 65,
      Negotiation: 75,
      Commit: 85,
      'Closed Won': 100,
      'Closed Lost': 0
    };
    return map[stage] ?? 0;
  }

  private estimateForecastCategory(stage: string) {
    const map: Record<string, string> = {
      Prospecting: 'Pipeline',
      Qualification: 'Pipeline',
      Proposal: 'Best Case',
      'Security / Legal Review': 'Best Case',
      Negotiation: 'Commit',
      Commit: 'Commit',
      'Closed Won': 'Closed',
      'Closed Lost': 'Omitted'
    };
    return map[stage] ?? 'Pipeline';
  }

  private defaultReviewDueLocal(): string {
    const due = new Date();
    due.setDate(due.getDate() + 2);
    due.setSeconds(0, 0);
    const tzOffset = due.getTimezoneOffset();
    const local = new Date(due.getTime() - tzOffset * 60_000);
    return local.toISOString().slice(0, 16);
  }

  private localToUtcIso(localValue: string): string | null {
    if (!localValue?.trim()) {
      return null;
    }
    const parsed = new Date(localValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  protected isPainConfirmationRequired(): boolean {
    const stage = this.selectedStage || 'Prospecting';
    return ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
  }

  protected isQualificationFitRequired(): boolean {
    const stage = this.selectedStage || 'Prospecting';
    return ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
  }

  protected demoOutcomeGuidance(): string | null {
    const stage = this.selectedStage || 'Prospecting';
    if (['Proposal', 'Negotiation', 'Commit'].includes(stage)) {
      return 'Demo/POC outcome is required before moving to late stages. Log a Demo/POC activity.';
    }
    return null;
  }

  protected discoveryGuidance(): string | null {
    const stage = this.selectedStage || 'Prospecting';
    if (['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage)) {
      return 'Discovery meeting + notes are required before moving to qualification or later. Schedule a Discovery activity.';
    }
    return null;
  }

  private validateStageRequirements(): string | null {
    const stage = this.selectedStage;
    const amountRequired = ['Qualification', 'Proposal', 'Negotiation'].includes(stage);
    const closeDateRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
    const buyingRoleRequired = ['Proposal', 'Negotiation', 'Commit'].includes(stage);
    const painRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
    const fitRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
    const contractStart = this.form.contractStartDateUtc ? new Date(this.form.contractStartDateUtc) : null;
    const contractEnd = this.form.contractEndDateUtc ? new Date(this.form.contractEndDateUtc) : null;

    if (contractStart && contractEnd && contractEnd < contractStart) {
      return 'Contract end date must be after the contract start date.';
    }

    if (!this.isEditMode()) {
      if (!stage?.trim()) {
        return 'Stage is required when creating an opportunity.';
      }
      if (!this.form.amount || this.form.amount <= 0) {
        return 'Amount is required when creating an opportunity.';
      }
      if (!this.form.expectedCloseDate) {
        return 'Expected close date is required when creating an opportunity.';
      }
    }

    if (amountRequired && (!this.form.amount || this.form.amount <= 0)) {
      return `Amount is required before moving to ${stage}.`;
    }

    if ((this.form.discountPercent || this.form.discountAmount)
      && (!this.form.pricingNotes || !this.form.pricingNotes.trim())) {
      return 'Pricing notes and objections are required when applying discounts.';
    }

    if (closeDateRequired && !this.form.expectedCloseDate) {
      return `Expected close date is required before moving to ${stage}.`;
    }

    if (buyingRoleRequired) {
      return 'A buying role contact is required before moving to late-stage opportunities.';
    }

    if (painRequired && !this.form.summary?.trim()) {
      return `Pain/problem summary is required before moving to ${stage}.`;
    }

    if (fitRequired) {
      if (!this.form.requirements?.trim()) {
        return `Requirements are required before moving to ${stage}.`;
      }
      if (!this.form.buyingProcess?.trim()) {
        return `Buying process is required before moving to ${stage}.`;
      }
      if (!this.form.successCriteria?.trim()) {
        return `Success criteria is required before moving to ${stage}.`;
      }
    }

    if (stage === 'Commit') {
      if (this.form.securityReviewStatus !== 'Approved' || this.form.legalReviewStatus !== 'Approved') {
        return 'Security and legal reviews must be approved before moving to Commit.';
      }
      if (this.form.forecastCategory !== 'Commit') {
        return 'Forecast category must be Commit before moving to the Commit stage.';
      }
    }

    if (this.form.isClosed) {
      if (!this.form.forecastCategory) {
        return 'Forecast category is required before closing an opportunity.';
      }
      if (this.form.isWon && this.form.forecastCategory !== 'Closed') {
        return 'Closed won opportunities must use the Closed forecast category.';
      }
      if (!this.form.isWon && this.form.forecastCategory !== 'Omitted') {
        return 'Closed lost opportunities must use the Omitted forecast category.';
      }
    }

    if (this.isEditMode() && this.originalStage && stage !== this.originalStage && !stage.startsWith('Closed')) {
      if (!this.nextStepDueAtUtc) {
        return 'Next step is required before changing stage. Log an activity with a due date.';
      }
    }

    return null;
  }
}
