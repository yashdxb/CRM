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
import { map } from 'rxjs';

import { OpportunityDataService, SaveOpportunityRequest } from '../services/opportunity-data.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { OpportunityReviewChecklistService } from '../services/opportunity-review-checklist.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  Opportunity,
  OpportunityApprovalItem,
  OpportunityReviewChecklistItem
} from '../models/opportunity.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

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

  protected accountOptions: Option<string | undefined>[] = [];
  protected selectedStage = 'Prospecting';
  protected form: SaveOpportunityRequest = this.createEmptyForm();
  protected saving = signal(false);
  protected readonly isEditMode = signal(false);
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
  });
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
  private editingId: string | null = null;
  private pendingOpportunity: Opportunity | null = null;
  private pendingAccountName: string | null = null;

  private readonly opportunityData = inject(OpportunityDataService);
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly checklistService = inject(OpportunityReviewChecklistService);
  protected readonly router = inject(Router);
  protected readonly customerData = inject(CustomerDataService);
  private readonly toastService = inject(AppToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadAccounts();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.editingId = id;
      this.isEditMode.set(!!id);
      if (id) {
        this.loadOpportunity(id);
        this.loadChecklists(id);
        this.loadApprovals(id);
      } else {
        this.form = this.createEmptyForm();
        this.selectedStage = this.form.stageName ?? 'Prospecting';
        this.securityChecklist = [];
        this.legalChecklist = [];
        this.approvals = [];
      }
    });
  }

  protected onStageChange(stage: string) {
    this.selectedStage = stage;
    this.form.stageName = stage;
    this.form.probability = this.estimateProbability(stage);
    this.form.isClosed = stage.startsWith('Closed');
    this.form.isWon = stage === 'Closed Won';
  }

  protected onSave() {
    if (!this.form.name) return;
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
    const payload: SaveOpportunityRequest = {
      ...this.form,
      expectedCloseDate,
      stageName: this.selectedStage,
      winLossReason: this.form.winLossReason || null
    };

    const request$ = this.editingId
      ? this.opportunityData.update(this.editingId, payload).pipe(map(() => null))
      : this.opportunityData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
      },
      error: (err) => {
        this.saving.set(false);
        const message = typeof err?.error === 'string' ? err.error : 'Unable to save opportunity.';
        this.toastService.show('error', message, 4000);
      }
    });
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
    Object.assign(this.form, {
      name: opp.name,
      accountId: resolvedAccountId,
      stageName: stage,
      amount: opp.amount ?? 0,
      currency: opp.currency ?? 'USD',
      probability: opp.probability ?? this.estimateProbability(stage),
      expectedCloseDate: opp.closeDate ? new Date(opp.closeDate) : undefined,
      summary: this.form.summary ?? '',
      discountPercent: opp.discountPercent ?? undefined,
      discountAmount: opp.discountAmount ?? undefined,
      pricingNotes: opp.pricingNotes ?? '',
      securityReviewStatus: opp.securityReviewStatus ?? 'Not Started',
      securityNotes: opp.securityNotes ?? '',
      legalReviewStatus: opp.legalReviewStatus ?? 'Not Started',
      legalNotes: opp.legalNotes ?? '',
      isClosed: opp.status !== 'Open',
      isWon: opp.status === 'Closed Won',
      winLossReason: opp.winLossReason ?? ''
    });
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
      expectedCloseDate: undefined,
      summary: '',
      discountPercent: undefined,
      discountAmount: undefined,
      pricingNotes: '',
      securityReviewStatus: 'Not Started',
      securityNotes: '',
      legalReviewStatus: 'Not Started',
      legalNotes: '',
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

  private validateStageRequirements(): string | null {
    const stage = this.selectedStage;
    const amountRequired = ['Qualification', 'Proposal', 'Negotiation'].includes(stage);
    const closeDateRequired = ['Qualification', 'Proposal', 'Negotiation'].includes(stage);
    const buyingRoleRequired = ['Proposal', 'Negotiation', 'Commit'].includes(stage);

    if (amountRequired && (!this.form.amount || this.form.amount <= 0)) {
      return `Amount is required before moving to ${stage}.`;
    }

    if (closeDateRequired && !this.form.expectedCloseDate) {
      return `Expected close date is required before moving to ${stage}.`;
    }

    if (buyingRoleRequired) {
      return 'A buying role contact is required before moving to late-stage opportunities.';
    }

    if (stage === 'Commit') {
      if (this.form.securityReviewStatus !== 'Approved' || this.form.legalReviewStatus !== 'Approved') {
        return 'Security and legal reviews must be approved before moving to Commit.';
      }
    }

    return null;
  }
}
