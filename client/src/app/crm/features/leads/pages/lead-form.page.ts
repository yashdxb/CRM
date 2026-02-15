import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { TabsModule } from 'primeng/tabs';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

import { map, Observable } from 'rxjs';

import {
  Lead,
  LeadAssignmentStrategy,
  LeadCadenceChannel,
  LeadCadenceTouch,
  LeadDuplicateCheckCandidate,
  LeadDuplicateCheckResponse,
  LeadScoreBreakdownItem,
  LeadStatus,
  LeadStatusHistoryItem
} from '../models/lead.model';
import { LeadDataService, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuthService } from '../../../../core/auth/auth.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, readUserEmail, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { TooltipModule } from 'primeng/tooltip';
import { PhoneTypeReference, ReferenceDataService } from '../../../../core/services/reference-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { computeLeadScore, computeQualificationRawScore, LeadDataWeight, LeadScoreResult } from './lead-scoring.util';

interface StatusOption {
  label: string;
  value: LeadStatus;
  icon: string;
  disabled?: boolean;
}

interface AssignmentOption {
  label: string;
  value: LeadAssignmentStrategy;
}

interface OwnerOption {
  label: string;
  value: string;
  email?: string;
}

interface OptionItem {
  label: string;
  value: string;
  icon: string;
  tone: 'unknown' | 'assumed' | 'verified' | 'invalid' | 'neutral';
}
interface CadenceChannelOption {
  label: string;
  value: LeadCadenceChannel;
}

interface PhoneTypeOption {
  label: string;
  value: string;
  isDefault: boolean;
}

interface ScoreBreakdownRow {
  cqvs: 'C' | 'Q' | 'V' | 'S';
  factor: string;
  weight: number;
  selectedValue: string;
  confidence: string;
  evidence: string;
  score: number;
  maxScore: number;
}

interface CqvsGroupRow {
  code: 'C' | 'Q' | 'V' | 'S';
  title: string;
  description: string;
  weight: number;
  score: number;
  maxScore: number;
}

const CQVS_GROUP_DEFINITIONS: Array<{
  code: 'C' | 'Q' | 'V' | 'S';
  title: string;
  description: string;
  weight: number;
  factors: string[];
}> = [
  {
    code: 'C',
    title: 'Company Fit',
    description: 'ICP alignment and account fit.',
    weight: 10,
    factors: ['ICP Fit']
  },
  {
    code: 'Q',
    title: 'Qualification Readiness',
    description: 'Budget, readiness, and buying timeline.',
    weight: 60,
    factors: ['Budget', 'Readiness', 'Timeline']
  },
  {
    code: 'V',
    title: 'Value / Problem Severity',
    description: 'Business pain and urgency.',
    weight: 20,
    factors: ['Problem']
  },
  {
    code: 'S',
    title: 'Stakeholder Access',
    description: 'Economic buyer engagement.',
    weight: 10,
    factors: ['Economic Buyer']
  }
];

@Component({
  selector: 'app-lead-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ProgressBarModule,
    KnobModule,
    TableModule,
    TagModule,
    DialogModule,
    DatePickerModule,
    TooltipModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    TabsModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./lead-form.page.html",
  styleUrls: ["./lead-form.page.scss"]
})
export class LeadFormPage implements OnInit {
  protected activeTab = signal<'overview' | 'qualification' | 'activity' | 'history'>('overview');
  protected readonly statusOptions: StatusOption[] = [
    { label: 'New', value: 'New', icon: 'pi-star' },
    { label: 'Contacted', value: 'Contacted', icon: 'pi-comments' },
    { label: 'Nurture', value: 'Nurture', icon: 'pi-clock' },
    { label: 'Qualified', value: 'Qualified', icon: 'pi-check' },
    { label: 'Converted', value: 'Converted', icon: 'pi-verified' },
    { label: 'Lost', value: 'Lost', icon: 'pi-times' },
    { label: 'Disqualified', value: 'Disqualified', icon: 'pi-ban' }
  ];
  protected readonly assignmentOptions: AssignmentOption[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Round robin', value: 'RoundRobin' },
    { label: 'Territory', value: 'Territory' }
  ];
  protected readonly budgetOptions: OptionItem[] = [
    { label: 'Unknown / not yet discussed', value: 'Unknown / not yet discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Indicative range mentioned', value: 'Indicative range mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Budget allocated and approved', value: 'Budget allocated and approved', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Budget identified but unapproved', value: 'Budget identified but unapproved', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'No defined budget', value: 'No defined budget', icon: 'pi pi-times-circle', tone: 'invalid' },
    { label: 'Budget explicitly unavailable', value: 'Budget explicitly unavailable', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly readinessOptions: OptionItem[] = [
    { label: 'Unknown / unclear', value: 'Unknown / unclear', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Interest expressed, no urgency', value: 'Interest expressed, no urgency', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Actively evaluating solutions', value: 'Actively evaluating solutions', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Internal decision in progress', value: 'Internal decision in progress', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Ready to proceed pending final step', value: 'Ready to proceed pending final step', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Not planning to spend', value: 'Not planning to spend', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly timelineOptions: OptionItem[] = [
    { label: 'Unknown / not discussed', value: 'Unknown / not discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Rough timeline mentioned', value: 'Rough timeline mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Target date verbally confirmed', value: 'Target date verbally confirmed', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Decision date confirmed internally', value: 'Decision date confirmed internally', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Date missed / repeatedly pushed', value: 'Date missed / repeatedly pushed', icon: 'pi pi-times-circle', tone: 'invalid' },
    { label: 'No defined timeline', value: 'No defined timeline', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly problemOptions: OptionItem[] = [
    { label: 'Unknown / not validated', value: 'Unknown / not validated', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Mild inconvenience', value: 'Mild inconvenience', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Recognized operational problem', value: 'Recognized operational problem', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'High business impact', value: 'High business impact', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Critical business impact', value: 'Critical business impact', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Executive-level priority', value: 'Executive-level priority', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Problem acknowledged but deprioritized', value: 'Problem acknowledged but deprioritized', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly economicBuyerOptions: OptionItem[] = [
    { label: 'Unknown / not identified', value: 'Unknown / not identified', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Influencer identified', value: 'Influencer identified', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Buyer identified, not engaged', value: 'Buyer identified, not engaged', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Buyer engaged in discussion', value: 'Buyer engaged in discussion', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Buyer verbally supportive', value: 'Buyer verbally supportive', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Buyer explicitly not involved', value: 'Buyer explicitly not involved', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly icpFitOptions: OptionItem[] = [
    { label: 'Unknown / not assessed', value: 'Unknown / not assessed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Partial ICP fit', value: 'Partial ICP fit', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Strong ICP fit', value: 'Strong ICP fit', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Out-of-profile but exploratory', value: 'Out-of-profile but exploratory', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Clearly out of ICP', value: 'Clearly out of ICP', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected evidenceOptions: OptionItem[] = LeadFormPage.defaultEvidenceSources().map((source) =>
    LeadFormPage.toEvidenceOption(source)
  );
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);
  protected aiScoring = signal(false);
  protected aiScoreNote = signal<string | null>(null);
  protected aiScoreSeverity = signal<'success' | 'info' | 'warn' | 'error'>('info');
  protected aiScoreConfidence = signal<number | null>(null);
  protected emailError = signal<string | null>(null);
  protected phoneError = signal<string | null>(null);
  protected assignmentEditable = signal<boolean>(false);
  protected qualificationConfidenceLabel = signal<string | null>(null);
  protected qualificationConfidence = signal<number | null>(null);
  protected truthCoverage = signal<number | null>(null);
  protected assumptionsOutstanding = signal<number | null>(null);
  protected serverNextEvidenceSuggestions = signal<string[]>([]);
  protected nextEvidenceSuggestions = signal<string[]>([]);
  protected qualificationFeedback = signal<{
    confidenceLabel: string;
    weakestSignal: string | null;
    weakestState: string | null;
  } | null>(null);
  protected serverWeakestSignal = signal<string | null>(null);
  protected serverWeakestState = signal<string | null>(null);
  protected scoreBreakdown = signal<LeadScoreBreakdownItem[]>([]);
  protected riskFlags = signal<string[]>([]);
  protected routingReason = signal<string | null>(null);
  protected statusHistory = signal<LeadStatusHistoryItem[]>([]);
  protected cadenceTouches = signal<LeadCadenceTouch[]>([]);
  protected cadenceChannel: LeadCadenceChannel = 'Call';
  protected cadenceChannelOptions: CadenceChannelOption[] = [];
  protected cadenceOutcome = '';
  protected cadenceNextStepLocal: Date | null = null;
  protected cadenceSubmitting = signal(false);
  protected phoneTypeOptions: PhoneTypeOption[] = [];
  protected phoneCountryOptions: Array<{ label: string; value: string; dialCode: string; flag: string; name: string }> = [];
  protected phoneCountryIso = '';
  protected phoneNationalNumber = '';
  protected readonly phoneMask = signal<string>('');
  protected readonly phonePlaceholder = signal<string>('Phone number');
  protected linkedAccountId = signal<string | null>(null);
  protected linkedContactId = signal<string | null>(null);
  protected linkedOpportunityId = signal<string | null>(null);
  protected firstTouchDueAtUtc = signal<string | null>(null);
  protected firstTouchedAtUtc = signal<string | null>(null);
  protected followUpHint = signal<string | null>(null);
  protected duplicateDialogVisible = signal(false);
  protected duplicateCheckResult = signal<LeadDuplicateCheckResponse | null>(null);
  protected duplicateMatches = signal<LeadDuplicateCheckCandidate[]>([]);
  private readonly toastService = inject(AppToastService);
  private readonly phoneUtil = PhoneNumberUtil.getInstance();
  private readonly regionDisplay = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly referenceData = inject(ReferenceDataService);
  private readonly workspaceSettings = inject(WorkspaceSettingsService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;
  private leadDataWeights: LeadDataWeight[] = [];
  private pendingSavePayload: SaveLeadRequest | null = null;
  private pendingSaveIsEdit = false;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    this.cadenceNextStepLocal = this.defaultCadenceDueLocal();
    this.activeTab.set(this.getDefaultTab());
    const lead = history.state?.lead as Lead | undefined;
    this.loadOwners();
    this.loadCadenceChannels();
    this.loadEvidenceSources();
    this.loadPhoneTypes();
    this.loadPhoneCountries();
    this.loadLeadDataWeights();
    this.resolveAssignmentAccess();
    if (this.editingId && lead) {
      this.prefillFromLead(lead);
      this.loadStatusHistory(this.editingId);
      this.loadCadenceTouches(this.editingId);
    } else if (this.editingId) {
      this.leadData.get(this.editingId).subscribe({
        next: (data) => {
          this.prefillFromLead(data);
          this.loadStatusHistory(this.editingId!);
          this.loadCadenceTouches(this.editingId!);
        },
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected setActiveTab(tab: 'overview' | 'qualification' | 'activity' | 'history') {
    if (this.isTabDisabled(tab)) {
      return;
    }
    this.activeTab.set(tab);
  }

  protected onActiveTabChange(tab: string | number | null | undefined): void {
    if (typeof tab !== 'string') {
      return;
    }
    if (tab === 'overview' || tab === 'qualification' || tab === 'activity' || tab === 'history') {
      this.setActiveTab(tab);
    }
  }

  protected isTabDisabled(tab: 'overview' | 'qualification' | 'activity' | 'history') {
    return !this.isEditMode() && tab !== 'overview';
  }

  protected isOwnerReadOnly(): boolean {
    return !this.assignmentEditable();
  }

  protected onEmailChange(value: string) {
    this.form.email = value;
    if (!value?.trim()) {
      this.emailError.set(null);
      return;
    }
    this.emailError.set(this.isValidEmail(value) ? null : 'Enter a valid email address.');
  }

  protected onPhoneChange(value: string) {
    this.phoneNationalNumber = value;
    this.updatePhoneFromInputs();
  }

  protected onPhoneCountryChange(value: string) {
    this.phoneCountryIso = value;
    this.refreshPhoneCountryMeta();
    this.phoneNationalNumber = this.applyMaskToDigits(this.getDigitsOnly(this.phoneNationalNumber), this.phoneMask());
    this.updatePhoneFromInputs();
  }

  protected leadDisplayName(): string {
    const first = this.form.firstName?.trim() ?? '';
    const last = this.form.lastName?.trim() ?? '';
    return `${first} ${last}`.trim() || 'Lead';
  }

  protected qualificationRuleMessage(): string {
    return 'Unknown is neutral. Select at least 3 factors before setting to Qualified.';
  }

  protected qualificationInlineError(): string | null {
    if (this.form.status !== 'Qualified') return null;
    return this.countQualificationFactors() < 3 ? '3 qualification factors required to qualify.' : null;
  }

  protected qualificationTabBadge(): string | null {
    const count = this.riskFlags().length;
    return count ? `${count} risk` : null;
  }

  protected activityTabBadge(): string | null {
    const due = this.cadenceNextStepLocal;
    if (!due) return null;
    const now = new Date();
    if (due.getTime() < now.getTime()) {
      return 'Overdue';
    }
    return null;
  }

  protected logActivity(): void {
    if (!this.editingId) {
      return;
    }
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    const subject = fullName ? `Follow up: ${fullName}` : 'Lead follow-up';
    this.router.navigate(['/app/activities/new'], {
      queryParams: {
        relatedType: 'Lead',
        relatedId: this.editingId,
        subject,
        leadFirstTouchDueAtUtc: this.firstTouchDueAtUtc() ?? undefined
      }
    });
  }

  protected canConvertLead(): boolean {
    return this.isEditMode() && this.form.status === 'Qualified';
  }

  protected canRefreshScore(): boolean {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
  }

  protected statusOptionsForView(): StatusOption[] {
    if (this.hasAdministrationManagePermission()) {
      return this.statusOptions.map((option) => ({ ...option, disabled: false }));
    }
    const isConverted = this.form.status === 'Converted';
    const hasFirstTouch = !!this.firstTouchedAtUtc();
    return this.statusOptions.map((option) => ({
      ...option,
      disabled:
        (option.value === 'Converted' && !isConverted) ||
        (option.value === 'Contacted' && !hasFirstTouch && this.form.status !== 'Contacted') ||
        (option.value === 'New' && this.form.status === 'Contacted')
    }));
  }

  protected statusPolicyHint(): string | null {
    if (!this.isEditMode()) {
      return null;
    }
    if (this.form.status === 'Converted') {
      return 'This lead is already converted. Update the opportunity instead.';
    }
    if (this.form.status === 'New' && !this.firstTouchedAtUtc()) {
      return 'Contacted is activity-driven. Log a completed call, email, or meeting to unlock it.';
    }
    if (this.form.status === 'Contacted' && this.firstTouchedAtUtc()) {
      return 'Contacted was set by completed activity.';
    }
    return null;
  }

  protected hasLinkedRecords(): boolean {
    return !!(this.linkedAccountId() || this.linkedContactId() || this.linkedOpportunityId());
  }

  protected linkedAccountLink(): string | null {
    const id = this.linkedAccountId();
    return id ? `/app/customers/${id}/edit` : null;
  }

  protected linkedContactLink(): string | null {
    const id = this.linkedContactId();
    return id ? `/app/contacts/${id}/edit` : null;
  }

  protected linkedOpportunityLink(): string | null {
    const id = this.linkedOpportunityId();
    return id ? `/app/opportunities/${id}/edit` : null;
  }

  protected onConvertLead(): void {
    if (!this.editingId || !this.canConvertLead()) {
      return;
    }
    this.router.navigate(['/app/leads', this.editingId, 'convert']);
  }

  protected onSave() {
    if (!this.form.firstName || !this.form.lastName) {
      return;
    }

    if (!this.validateOverviewFields()) {
      return;
    }

    const outcomeError = this.validateOutcome();
    if (outcomeError) {
      this.raiseToast('error', outcomeError);
      return;
    }

    const resolvedScore = this.form.autoScore ? this.computeAutoScore() : (this.form.score ?? 0);
    const nurtureFollowUpAtUtc =
      this.form.status === 'Nurture' ? this.localToUtcIso(this.form.nurtureFollowUpAtUtc) : undefined;
    const payload: SaveLeadRequest = {
      ...this.form,
      score: resolvedScore,
      ownerId: this.form.assignmentStrategy === 'Manual' ? this.form.ownerId : undefined,
      territory: this.form.assignmentStrategy === 'Territory' ? this.form.territory : this.form.territory,
      nurtureFollowUpAtUtc
    };
    if (this.form.autoScore) {
      this.form.score = resolvedScore;
    }

    this.saving.set(true);
    const isEdit = !!this.editingId;
    this.submitWithDuplicateGuard(payload, isEdit);
  }

  protected dismissDuplicateDialog(): void {
    this.duplicateDialogVisible.set(false);
    this.duplicateCheckResult.set(null);
    this.duplicateMatches.set([]);
    this.pendingSavePayload = null;
  }

  protected reviewDuplicate(candidate: LeadDuplicateCheckCandidate): void {
    this.dismissDuplicateDialog();
    this.router.navigate(['/app/leads', candidate.leadId, 'edit']);
  }

  protected saveDespiteWarning(): void {
    if (!this.pendingSavePayload) {
      this.dismissDuplicateDialog();
      return;
    }

    const payload = this.pendingSavePayload;
    const isEdit = this.pendingSaveIsEdit;
    this.dismissDuplicateDialog();
    this.performSave(payload, isEdit);
  }

  protected duplicateIsBlocked(): boolean {
    return this.duplicateCheckResult()?.isBlocked ?? false;
  }

  protected duplicateDialogTitle(): string {
    return this.duplicateIsBlocked() ? 'Duplicate Lead Blocked' : 'Possible Duplicate Leads';
  }

  protected duplicateDialogMessage(): string {
    if (this.duplicateIsBlocked()) {
      return 'An exact duplicate exists. Open the existing lead and continue there.';
    }
    return 'Similar leads were found. Review and decide whether to save anyway.';
  }

  private submitWithDuplicateGuard(payload: SaveLeadRequest, isEdit: boolean): void {
    this.leadData.checkDuplicates({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      companyName: payload.companyName,
      excludeLeadId: isEdit ? this.editingId ?? undefined : undefined
    }).subscribe({
      next: (result) => {
        if (result.isBlocked) {
          this.pendingSavePayload = payload;
          this.pendingSaveIsEdit = isEdit;
          this.duplicateCheckResult.set(result);
          this.duplicateMatches.set(result.matches ?? []);
          this.duplicateDialogVisible.set(true);
          this.raiseToast('error', 'Exact duplicate detected. Open the existing lead instead of creating another.');
          return;
        }

        if (result.hasWarnings) {
          this.pendingSavePayload = payload;
          this.pendingSaveIsEdit = isEdit;
          this.duplicateCheckResult.set(result);
          this.duplicateMatches.set(result.matches ?? []);
          this.duplicateDialogVisible.set(true);
          return;
        }

        this.performSave(payload, isEdit);
      },
      error: () => {
        // Duplicate-check should not block saves if the helper endpoint is temporarily unavailable.
        this.performSave(payload, isEdit);
      }
    });
  }

  private performSave(payload: SaveLeadRequest, isEdit: boolean): void {
    this.saving.set(true);
    const request$: Observable<Lead | null> = isEdit
      ? this.leadData.update(this.editingId!, payload).pipe(map(() => null))
      : this.leadData.create(payload);

    request$.subscribe({
      next: (created) => {
        this.saving.set(false);
        if (!isEdit && created) {
          this.editingId = created.id;
          this.router.navigate(['/app/leads', created.id, 'edit'], {
            state: { lead: created, defaultTab: 'qualification' }
          });
        }
        if (isEdit && this.editingId) {
          this.reloadLeadDetails(this.editingId);
        }
        const message = isEdit ? 'Lead updated.' : 'Lead created. Complete qualification now or later.';
        this.raiseToast('success', message);
        this.updateQualificationFeedback();
      },
      error: (err) => {
        this.saving.set(false);
        const fallback = this.editingId ? 'Unable to update lead.' : 'Unable to create lead.';
        this.raiseToast('error', this.extractApiErrorMessage(err, fallback));
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private extractApiErrorMessage(error: unknown, fallback: string): string {
    const httpError = error as HttpErrorResponse | null;
    const payload = httpError?.error;
    if (typeof payload === 'string' && payload.trim().length > 0) {
      return payload.trim();
    }

    const errors = (payload as { errors?: Record<string, string[] | string> } | null | undefined)?.errors;
    if (errors && typeof errors === 'object') {
      const firstKey = Object.keys(errors)[0];
      const value = firstKey ? errors[firstKey] : null;
      if (Array.isArray(value) && value[0]) {
        return value[0];
      }
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim();
      }
    }

    const title = (payload as { title?: string } | null | undefined)?.title;
    if (typeof title === 'string' && title.trim().length > 0 && title !== 'One or more validation errors occurred.') {
      return title.trim();
    }

    return fallback;
  }

  private prefillFromLead(lead: Lead) {
    const [firstName, ...rest] = lead.name.split(' ');
    this.form = {
      firstName,
      lastName: rest.join(' '),
      companyName: lead.company,
      email: lead.email,
      phone: lead.phone,
      phoneTypeId: lead.phoneTypeId ?? undefined,
      status: lead.status,
      score: lead.score ?? 0,
      autoScore: true,
      source: lead.source ?? '',
      jobTitle: lead.jobTitle ?? '',
      ownerId: lead.ownerId,
      assignmentStrategy: 'Manual',
      territory: lead.territory ?? '',
      disqualifiedReason: lead.disqualifiedReason ?? '',
      lossReason: lead.lossReason ?? '',
      lossCompetitor: lead.lossCompetitor ?? '',
      lossNotes: lead.lossNotes ?? '',
      nurtureFollowUpAtUtc: this.toDateValue(lead.nurtureFollowUpAtUtc),
      qualifiedNotes: lead.qualifiedNotes ?? '',
      budgetAvailability: lead.budgetAvailability || 'Unknown / not yet discussed',
      budgetEvidence: lead.budgetEvidence || 'No evidence yet',
      readinessToSpend: lead.readinessToSpend || 'Unknown / unclear',
      readinessEvidence: lead.readinessEvidence || 'No evidence yet',
      buyingTimeline: lead.buyingTimeline || 'Unknown / not discussed',
      timelineEvidence: lead.timelineEvidence || 'No evidence yet',
      problemSeverity: lead.problemSeverity || 'Unknown / not validated',
      problemEvidence: lead.problemEvidence || 'No evidence yet',
      economicBuyer: lead.economicBuyer || 'Unknown / not identified',
      economicBuyerEvidence: lead.economicBuyerEvidence || 'No evidence yet',
      icpFit: lead.icpFit || 'Unknown / not assessed',
      icpFitEvidence: lead.icpFitEvidence || 'No evidence yet'
    };
    // Always derive score from current lead inputs to avoid stale persisted values.
    this.form.score = this.computeAutoScore();
    this.ensureEvidenceOptionsContainSelections();
    this.linkedAccountId.set(lead.accountId ?? null);
    this.linkedContactId.set(lead.contactId ?? null);
    this.linkedOpportunityId.set(lead.convertedOpportunityId ?? null);
    this.firstTouchDueAtUtc.set(lead.firstTouchDueAtUtc ?? null);
    this.firstTouchedAtUtc.set(lead.firstTouchedAtUtc ?? null);
    this.routingReason.set(lead.routingReason ?? null);
    this.qualificationConfidenceLabel.set(lead.qualificationConfidenceLabel ?? null);
    this.qualificationConfidence.set(lead.qualificationConfidence ?? null);
    this.truthCoverage.set(lead.truthCoverage ?? null);
    this.assumptionsOutstanding.set(lead.assumptionsOutstanding ?? null);
    this.serverWeakestSignal.set(lead.weakestSignal ?? null);
    this.serverWeakestState.set(lead.weakestState ?? null);
    this.serverNextEvidenceSuggestions.set(lead.nextEvidenceSuggestions ?? []);
    const breakdown = lead.scoreBreakdown && lead.scoreBreakdown.length ? lead.scoreBreakdown : this.buildScoreBreakdown();
    this.scoreBreakdown.set(breakdown);
    this.riskFlags.set(lead.riskFlags ?? []);
    this.syncPhoneInputsFromE164(lead.phone ?? null);
    this.normalizeEvidence();
    this.updateQualificationFeedback(true);
    this.updateEpistemicSummary(true);
  }

  private loadStatusHistory(leadId: string) {
    this.leadData.getStatusHistory(leadId).subscribe({
      next: (history) => this.statusHistory.set(history),
      error: () => this.statusHistory.set([])
    });
  }

  private loadCadenceTouches(leadId: string) {
    this.leadData.getCadenceTouches(leadId).subscribe({
      next: (touches) => this.cadenceTouches.set(touches),
      error: () => this.cadenceTouches.set([])
    });
  }

  private reloadLeadDetails(leadId: string): void {
    this.leadData.get(leadId).subscribe({
      next: (lead) => {
        this.prefillFromLead(lead);
        this.loadStatusHistory(leadId);
        this.loadCadenceTouches(leadId);
      }
    });
  }

  protected logCadenceTouch() {
    if (!this.editingId || this.cadenceSubmitting()) {
      return;
    }

    const outcome = this.cadenceOutcome.trim();
    if (!outcome) {
      this.raiseToast('error', 'Cadence outcome is required.');
      return;
    }

    const dueIso = this.localToUtcIso(this.cadenceNextStepLocal);
    if (!dueIso) {
      this.raiseToast('error', 'Next step due date is required.');
      return;
    }

    this.cadenceSubmitting.set(true);
    this.leadData
      .logCadenceTouch(this.editingId, {
        channel: this.cadenceChannel,
        outcome,
        nextStepDueAtUtc: dueIso
      })
      .subscribe({
        next: () => {
          this.cadenceSubmitting.set(false);
          this.cadenceOutcome = '';
          if (!this.firstTouchedAtUtc()) {
            this.firstTouchedAtUtc.set(new Date().toISOString());
          }
          this.cadenceNextStepLocal = this.defaultCadenceDueLocal();
          this.loadCadenceTouches(this.editingId!);
          this.raiseToast('success', 'Cadence touch logged and next step scheduled.');
        },
        error: () => {
          this.cadenceSubmitting.set(false);
          this.raiseToast('error', 'Unable to log cadence touch.');
        }
      });
  }

  protected isFirstTouchPending(): boolean {
    return !!this.firstTouchDueAtUtc() && !this.firstTouchedAtUtc();
  }

  private defaultCadenceDueLocal(): Date {
    const due = new Date();
    due.setDate(due.getDate() + 2);
    due.setMinutes(due.getMinutes() - due.getTimezoneOffset());
    return due;
  }

  private localToUtcIso(localValue: string | Date | null | undefined): string | null {
    if (!localValue) return null;
    const parsed = localValue instanceof Date ? localValue : new Date(localValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  private createEmptyForm(): SaveLeadRequest & { autoScore: boolean } {
    return {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      phoneTypeId: undefined,
      jobTitle: '',
      source: '',
      territory: '',
      status: 'New',
      score: 0,
      autoScore: true,
      assignmentStrategy: 'Manual',
      ownerId: readUserId() ?? undefined,
      disqualifiedReason: '',
      lossReason: '',
      lossCompetitor: '',
      lossNotes: '',
      nurtureFollowUpAtUtc: null,
      qualifiedNotes: '',
      budgetAvailability: 'Unknown / not yet discussed',
      budgetEvidence: 'No evidence yet',
      readinessToSpend: 'Unknown / unclear',
      readinessEvidence: 'No evidence yet',
      buyingTimeline: 'Unknown / not discussed',
      timelineEvidence: 'No evidence yet',
      problemSeverity: 'Unknown / not validated',
      problemEvidence: 'No evidence yet',
      economicBuyer: 'Unknown / not identified',
      economicBuyerEvidence: 'No evidence yet',
      icpFit: 'Unknown / not assessed',
      icpFitEvidence: 'No evidence yet'
    };
  }

  private loadOwners() {
    this.userAdminData.lookupActive(undefined, 200).subscribe({
      next: (items) => {
        const options = this.ensureOwnerOptions(this.mapOwnerOptions(items));
        this.ownerOptions.set(options);
        this.applyOwnerDefault(options);
      },
      error: () => {
        const options = this.ensureOwnerOptions([]);
        this.ownerOptions.set(options);
        this.applyOwnerDefault(options);
      }
    });
  }

  private mapOwnerOptions(users: Array<{ id: string; fullName: string; email?: string }>): OwnerOption[] {
    return users.map((user) => ({
      label: user.fullName,
      value: user.id,
      email: user.email?.trim().toLowerCase()
    }));
  }

  private loadCadenceChannels() {
    this.leadData.getCadenceChannels().subscribe({
      next: (items) => {
        const options = items
          .filter((item) => item.isActive)
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
          .map((item) => ({ label: item.name, value: item.name }));
        this.cadenceChannelOptions = options;
        if (!options.some((opt) => opt.value === this.cadenceChannel)) {
          const fallback = items.find((item) => item.isDefault)?.name ?? options[0]?.value;
          if (fallback) {
            this.cadenceChannel = fallback;
          }
        }
      },
      error: () => {
        this.cadenceChannelOptions = [];
      }
    });
  }

  private loadEvidenceSources() {
    this.leadData.getEvidenceSources().subscribe({
      next: (items) => {
        const normalized = (items ?? [])
          .map((item) => (item ?? '').trim())
          .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);

        const catalog = normalized.length ? normalized : LeadFormPage.defaultEvidenceSources();
        if (!catalog.some((item) => item.toLowerCase() === 'no evidence yet')) {
          catalog.unshift('No evidence yet');
        }

        this.evidenceOptions = catalog.map((source) => LeadFormPage.toEvidenceOption(source));
        this.ensureEvidenceOptionsContainSelections();
      },
      error: () => {
        this.evidenceOptions = LeadFormPage.defaultEvidenceSources().map((source) => LeadFormPage.toEvidenceOption(source));
        this.ensureEvidenceOptionsContainSelections();
      }
    });
  }

  private loadPhoneTypes() {
    this.referenceData.getPhoneTypes().subscribe({
      next: (items: PhoneTypeReference[]) => {
        this.phoneTypeOptions = items
          .filter((item) => item.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
          .map((item) => ({ label: item.name, value: item.id, isDefault: item.isDefault }));
      },
      error: () => {
        this.phoneTypeOptions = [];
      }
    });
  }

  private loadLeadDataWeights() {
    this.workspaceSettings.getSettings().subscribe({
      next: (settings) => {
        this.leadDataWeights = settings.qualificationPolicy?.leadDataWeights ?? [];
        if (this.form.autoScore) {
          this.form.score = this.computeAutoScore();
        }
      },
      error: () => {
        this.leadDataWeights = [];
      }
    });
  }

  private applyOwnerDefault(options: OwnerOption[]) {
    if (this.form.ownerId) {
      const isCurrentOwnerSelectable = options.some((opt) => opt.value === this.form.ownerId);
      if (isCurrentOwnerSelectable) {
        return;
      }
      // Do not keep inactive/deleted owners selected in the edit form.
      this.form.ownerId = undefined;
    }

    const userId = readUserId();
    if (userId && options.some((opt) => opt.value === userId)) {
      this.form.ownerId = userId;
      return;
    }
    const userEmail = readUserEmail();
    if (userEmail) {
      const emailMatch = options.find((opt) => (opt.email ?? '').toLowerCase() === userEmail);
      if (emailMatch) {
        this.form.ownerId = emailMatch.value;
        return;
      }
    }
    const fullName = this.authService.currentUser()?.fullName?.trim().toLowerCase();
    if (!fullName) return;
    const match = options.find((opt) => opt.label.trim().toLowerCase() === fullName);
    if (match) {
      this.form.ownerId = match.value;
    }
  }

  private ensureOwnerOptions(options: OwnerOption[]): OwnerOption[] {
    const unique = new Map<string, OwnerOption>();
    for (const option of options) {
      if (!option.value || !option.label?.trim()) {
        continue;
      }
      if (!unique.has(option.value)) {
        unique.set(option.value, option);
      }
    }
    return Array.from(unique.values());
  }

  protected canEditAssignment(): boolean {
    return this.assignmentEditable();
  }

  private resolveAssignmentAccess(): void {
    this.assignmentEditable.set(this.hasAdministrationManagePermission());
  }

  private hasAdministrationManagePermission(): boolean {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
  }

  private validateOverviewFields(): boolean {
    const hasTypedPhoneInput = this.getDigitsOnly(this.phoneNationalNumber ?? '').length > 0;
    if (this.phoneNationalNumber) {
      if (this.phoneCountryIso) {
        this.updatePhoneFromInputs();
      } else if (!this.form.phone?.trim()) {
        this.phoneError.set('Select a country code.');
      } else {
        this.phoneError.set(null);
      }
    }
    const email = this.form.email?.trim() ?? '';
    const phone = this.form.phone?.trim() ?? '';
    const emailError = email ? (this.isValidEmail(email) ? null : 'Enter a valid email address.') : null;
    const phoneError = hasTypedPhoneInput
      ? (phone ? (this.isValidInternationalPhone(phone) ? null : 'Enter a valid phone number for the selected country.') : (this.phoneError() ?? 'Enter a valid phone number for the selected country.'))
      : (phone ? (this.isValidInternationalPhone(phone) ? null : 'Enter a valid phone number for the selected country.') : null);
    this.emailError.set(emailError);
    this.phoneError.set(phoneError);
    if (emailError) {
      this.raiseToast('error', emailError);
      return false;
    }
    if (phoneError) {
      this.raiseToast('error', phoneError);
      return false;
    }
    return true;
  }

  private isValidEmail(value: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
  }

  private isValidInternationalPhone(value: string): boolean {
    try {
      const parsed = this.phoneUtil.parse(value);
      return this.phoneUtil.isValidNumber(parsed);
    } catch {
      return false;
    }
  }

  private updatePhoneFromInputs(): void {
    const country = this.phoneCountryIso;
    const rawNumber = this.phoneNationalNumber?.trim() ?? '';
    const digitsOnly = this.getDigitsOnly(rawNumber);
    if (!rawNumber) {
      this.form.phone = '';
      this.phoneError.set(null);
      return;
    }
    if (!digitsOnly) {
      this.form.phone = '';
      this.phoneError.set(null);
      return;
    }
    if (!country) {
      this.form.phone = '';
      this.phoneError.set('Select a country code.');
      return;
    }
    try {
      const parsed = this.phoneUtil.parse(rawNumber.replace(/_/g, ''), country);
      const valid = this.phoneUtil.isValidNumberForRegion(parsed, country);
      if (!valid) {
        this.form.phone = '';
        this.phoneError.set('Enter a valid phone number for the selected country.');
        return;
      }
      this.form.phone = this.phoneUtil.format(parsed, PhoneNumberFormat.E164);
      this.phoneError.set(null);
    } catch {
      this.form.phone = '';
      this.phoneError.set('Enter a valid phone number for the selected country.');
    }
  }

  private syncPhoneInputsFromE164(value: string | null): void {
    if (!value) {
      this.phoneNationalNumber = '';
      this.phoneCountryIso = '';
      this.refreshPhoneCountryMeta();
      return;
    }
    try {
      const parsed = this.phoneUtil.parse(value);
      const region = this.phoneUtil.getRegionCodeForNumber(parsed) ?? '';
      this.phoneCountryIso = region;
      this.refreshPhoneCountryMeta();
      const digits = String(parsed.getNationalNumber());
      this.phoneNationalNumber = this.applyMaskToDigits(digits, this.phoneMask());
    } catch {
      this.syncPhoneInputsFromDialCode(value);
    }
  }

  private syncPhoneInputsFromDialCode(value: string): void {
    const raw = value.trim();
    const rawDigits = this.getDigitsOnly(raw);
    if (!rawDigits) {
      this.phoneNationalNumber = raw;
      this.phoneCountryIso = '';
      this.refreshPhoneCountryMeta();
      return;
    }

    const match = this.phoneCountryOptions
      .map((option) => ({ option, digits: option.dialCode.replace('+', '') }))
      .filter((item) => rawDigits.startsWith(item.digits))
      .sort((a, b) => b.digits.length - a.digits.length)[0];

    if (!match) {
      this.phoneNationalNumber = raw;
      this.phoneCountryIso = '';
      this.refreshPhoneCountryMeta();
      return;
    }

    this.phoneCountryIso = match.option.value;
    this.refreshPhoneCountryMeta();
    const nationalDigits = rawDigits.slice(match.digits.length);
    this.phoneNationalNumber = this.applyMaskToDigits(nationalDigits, this.phoneMask());
  }

  private loadPhoneCountries(): void {
    const regions = Array.from(this.phoneUtil.getSupportedRegions() as Set<string>) as string[];
    const display = this.regionDisplay;
    this.phoneCountryOptions = regions
      .map((region) => {
        const dialCode = this.phoneUtil.getCountryCodeForRegion(region);
        const name = display?.of(region) ?? region;
        return {
          label: `${name} (+${dialCode})`,
          value: region,
          dialCode: `+${dialCode}`,
          flag: this.toFlagEmoji(region),
          name
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    this.refreshPhoneCountryMeta();
  }

  private refreshPhoneCountryMeta(): void {
    const selected = this.phoneCountryOptions.find((option) => option.value === this.phoneCountryIso) ?? null;
    const maskParts = this.getPhoneMaskForRegion(this.phoneCountryIso);
    this.phoneMask.set(maskParts.mask);
    this.phonePlaceholder.set(selected ? `${selected.flag} ${maskParts.placeholder}` : 'Phone number');
  }

  private getPhoneMaskForRegion(region: string): { mask: string; placeholder: string } {
    if (!region) {
      return { mask: '', placeholder: 'Phone number' };
    }
    try {
      const example = this.phoneUtil.getExampleNumber(region);
      if (!example) {
        return { mask: '999999999999999', placeholder: 'Phone number' };
      }
      const national = this.phoneUtil.format(example, PhoneNumberFormat.NATIONAL);
      const mask = national.replace(/\d/g, '9');
      const placeholder = national;
      return { mask, placeholder };
    } catch {
      return { mask: '999999999999999', placeholder: 'Phone number' };
    }
  }

  private getDigitsOnly(value: string): string {
    return (value ?? '').replace(/\D/g, '');
  }

  private applyMaskToDigits(digits: string, mask: string): string {
    if (!digits || !mask) {
      return digits ?? '';
    }
    let cursor = 0;
    let out = '';
    for (const ch of mask) {
      if (ch === '9') {
        if (cursor >= digits.length) {
          break;
        }
        out += digits[cursor++];
      } else {
        out += ch;
      }
    }
    return out.trim();
  }

  private toFlagEmoji(region: string): string {
    const iso = region.toUpperCase();
    if (!/^[A-Z]{2}$/.test(iso)) {
      return '';
    }
    return String.fromCodePoint(...iso.split('').map((char) => 127397 + char.charCodeAt(0)));
  }

  protected getSlaStatusLabel(): string {
    const due = this.firstTouchDueAtUtc();
    const touched = this.firstTouchedAtUtc();
    if (touched) return 'First touch completed';
    if (!due) return 'SLA not started';
    const dueDate = new Date(due);
    if (Number.isNaN(dueDate.getTime())) return 'SLA pending';
    return dueDate.getTime() < Date.now() ? 'SLA overdue' : 'SLA due';
  }

  protected getSlaTone(): 'overdue' | 'due' | 'done' | 'pending' {
    const due = this.firstTouchDueAtUtc();
    const touched = this.firstTouchedAtUtc();
    if (touched) return 'done';
    if (!due) return 'pending';
    const dueDate = new Date(due);
    if (Number.isNaN(dueDate.getTime())) return 'pending';
    return dueDate.getTime() < Date.now() ? 'overdue' : 'due';
  }

  protected computeAutoScore(): number {
    return computeLeadScore(this.form, this.leadDataWeights).finalLeadScore;
  }

  private computeQualificationScore(): number | null {
    return computeQualificationRawScore(this.form);
  }

  private scoreSnapshot(): LeadScoreResult {
    return computeLeadScore(this.form, this.leadDataWeights);
  }

  private getBudgetScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'budget allocated and approved':
        return 25;
      case 'budget identified but unapproved':
      case 'indicative range mentioned':
        return 15;
      case 'no defined budget':
        return 5;
      default:
        return 0;
    }
  }

  private getReadinessScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'internal decision in progress':
      case 'ready to proceed pending final step':
        return 20;
      case 'actively evaluating solutions':
        return 15;
      case 'interest expressed, no urgency':
        return 8;
      default:
        return 0;
    }
  }

  private getTimelineScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'decision date confirmed internally':
        return 15;
      case 'target date verbally confirmed':
        return 12;
      case 'rough timeline mentioned':
        return 6;
      default:
        return 0;
    }
  }

  private getProblemScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'executive-level priority':
        return 20;
      case 'critical business impact':
        return 20;
      case 'high business impact':
        return 15;
      case 'recognized operational problem':
        return 8;
      case 'mild inconvenience':
        return 2;
      default:
        return 0;
    }
  }

  private getEconomicBuyerScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'buyer engaged in discussion':
      case 'buyer verbally supportive':
        return 10;
      case 'buyer identified, not engaged':
      case 'influencer identified':
        return 5;
      default:
        return 0;
    }
  }

  private getIcpFitScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'strong icp fit':
        return 10;
      case 'partial icp fit':
      case 'out-of-profile but exploratory':
        return 5;
      default:
        return 0;
    }
  }

  protected onAiScore() {
    if (!this.editingId || this.aiScoring() || !this.canRefreshScore()) {
      return;
    }

    this.aiScoring.set(true);
    this.leadData.aiScore(this.editingId).subscribe({
      next: (result) => {
        this.aiScoring.set(false);
        this.form.score = result.score;
        this.form.autoScore = false;
        const confidencePct = Math.round((result.confidence ?? 0) * 100);
        this.aiScoreConfidence.set(confidencePct);
        this.aiScoreNote.set(`Score refreshed to ${result.score}${result.rationale ? ` - ${result.rationale}` : ''}`.trim());
        this.aiScoreSeverity.set(this.resolveAiSeverity(result.score));
        this.raiseToast('success', `Score refreshed to ${result.score}.`);
      },
      error: (err) => {
        this.aiScoring.set(false);
        this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to refresh score.'));
      }
    });
  }

  private resolveAiSeverity(score: number): 'success' | 'info' | 'warn' | 'error' {
    if (score >= 70) return 'success';
    if (score >= 45) return 'info';
    if (score >= 25) return 'warn';
    return 'error';
  }

  protected aiScoreClass() {
    return `is-${this.aiScoreSeverity()}`;
  }

  protected aiScoreIcon() {
    switch (this.aiScoreSeverity()) {
      case 'success':
        return 'pi-check-circle';
      case 'warn':
        return 'pi-exclamation-triangle';
      case 'error':
        return 'pi-times-circle';
      default:
        return 'pi-info-circle';
    }
  }

  protected aiScoreConfidenceLabel() {
    const confidence = this.aiScoreConfidence();
    if (confidence === null) return null;
    if (confidence >= 75) return 'High confidence';
    if (confidence >= 45) return 'Medium confidence';
    return 'Low confidence';
  }

  protected scoreSourceBadge(): string | null {
    const note = this.aiScoreNote()?.toLowerCase();
    if (!note) {
      return null;
    }
    return note.includes('fallback') ? 'Rules fallback' : 'AI';
  }

  protected qualificationConfidencePercent(): number {
    if (!this.hasQualificationFactors()) {
      return 0;
    }

    const serverConfidence = this.qualificationConfidence();
    if (serverConfidence !== null) {
      return Math.round(serverConfidence * 100);
    }
    const count = this.countQualificationFactors();
    return Math.round((count / 6) * 100);
  }

  protected qualificationConfidenceDisplayLabel(): string {
    if (!this.hasQualificationFactors()) return 'Not available';

    const serverLabel = this.qualificationConfidenceLabel();
    if (serverLabel) {
      return serverLabel;
    }

    const percent = this.qualificationConfidencePercent();
    if (percent >= 75) return 'High';
    if (percent >= 45) return 'Medium';
    return 'Low';
  }

  protected qualificationConfidenceHint(): string | null {
    if (!this.hasQualificationFactors()) {
      return null;
    }
    const percent = this.qualificationConfidencePercent();
    if (percent >= 80) return null;
    return 'Improve confidence by completing more qualification factors.';
  }

  protected qualificationStatusLabel(): string {
    const factorCount = this.countQualificationFactors();
    if (factorCount === 0) return 'Not started';
    const qualificationScore = this.scoreSnapshot().qualificationScore100;
    return `${qualificationScore} / 100`;
  }

  protected leadDataQualityScore(): number {
    return this.scoreSnapshot().buyerDataQualityScore100;
  }

  protected overallScorePrimaryLabel(): string {
    const score = this.scoreSnapshot();
    return `Overall score ${score.finalLeadScore} / 100`;
  }

  protected qualificationSubtitleLabel(): string {
    const factorCount = this.countQualificationFactors();
    if (factorCount === 0) {
      return 'Qualification Not started';
    }
    return `Qualification ${this.scoreSnapshot().qualificationScore100} / 100`;
  }

  protected qualificationStatusHint(): string {
    const factorCount = this.countQualificationFactors();
    if (factorCount === 0) return 'No qualification factors selected yet.';
    const qualificationScore = this.scoreSnapshot().qualificationScore100;
    const coverage = this.truthCoveragePercent();
    return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/6 factors and ${coverage}% evidence coverage.`;
  }

  protected scoreKnobValueColor(): string {
    const confidence = this.qualificationConfidencePercent();
    if (confidence >= 75) return '#0ea5a4';
    if (confidence >= 50) return '#0284c7';
    if (confidence >= 30) return '#d97706';
    return '#dc2626';
  }

  protected scoreItemClass(item: LeadScoreBreakdownItem): string {
    if (item.score === 0) return 'is-zero';
    if (item.score >= item.maxScore) return 'is-full';
    return '';
  }

  protected scoreBreakdownRows(): ScoreBreakdownRow[] {
    const scoreByFactor = new Map(this.scoreBreakdown().map((item) => [item.factor, item] as const));
    return [
      {
        cqvs: 'Q',
        factor: 'Budget',
        weight: 25,
        selectedValue: this.form.budgetAvailability ?? 'Unknown / not yet discussed',
        confidence: this.getConfidenceForValue(this.form.budgetAvailability, this.budgetOptions),
        evidence: this.form.budgetEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('Budget')?.score ?? 0,
        maxScore: scoreByFactor.get('Budget')?.maxScore ?? 25
      },
      {
        cqvs: 'Q',
        factor: 'Readiness',
        weight: 20,
        selectedValue: this.form.readinessToSpend ?? 'Unknown / unclear',
        confidence: this.getConfidenceForValue(this.form.readinessToSpend, this.readinessOptions),
        evidence: this.form.readinessEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('Readiness')?.score ?? 0,
        maxScore: scoreByFactor.get('Readiness')?.maxScore ?? 20
      },
      {
        cqvs: 'Q',
        factor: 'Timeline',
        weight: 15,
        selectedValue: this.form.buyingTimeline ?? 'Unknown / not discussed',
        confidence: this.getConfidenceForValue(this.form.buyingTimeline, this.timelineOptions),
        evidence: this.form.timelineEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('Timeline')?.score ?? 0,
        maxScore: scoreByFactor.get('Timeline')?.maxScore ?? 15
      },
      {
        cqvs: 'V',
        factor: 'Problem',
        weight: 20,
        selectedValue: this.form.problemSeverity ?? 'Unknown / not validated',
        confidence: this.getConfidenceForValue(this.form.problemSeverity, this.problemOptions),
        evidence: this.form.problemEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('Problem')?.score ?? 0,
        maxScore: scoreByFactor.get('Problem')?.maxScore ?? 20
      },
      {
        cqvs: 'S',
        factor: 'Economic Buyer',
        weight: 10,
        selectedValue: this.form.economicBuyer ?? 'Unknown / not identified',
        confidence: this.getConfidenceForValue(this.form.economicBuyer, this.economicBuyerOptions),
        evidence: this.form.economicBuyerEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('Economic Buyer')?.score ?? 0,
        maxScore: scoreByFactor.get('Economic Buyer')?.maxScore ?? 10
      },
      {
        cqvs: 'C',
        factor: 'ICP Fit',
        weight: 10,
        selectedValue: this.form.icpFit ?? 'Unknown / not assessed',
        confidence: this.getConfidenceForValue(this.form.icpFit, this.icpFitOptions),
        evidence: this.form.icpFitEvidence ?? 'No evidence yet',
        score: scoreByFactor.get('ICP Fit')?.score ?? 0,
        maxScore: scoreByFactor.get('ICP Fit')?.maxScore ?? 10
      }
    ];
  }

  protected cqvsGroupRows(): CqvsGroupRow[] {
    const factorRows = this.scoreBreakdownRows();
    const byFactor = new Map(factorRows.map((row) => [row.factor, row] as const));
    return CQVS_GROUP_DEFINITIONS.map((group) => {
      const groupRows = group.factors
        .map((factor) => byFactor.get(factor))
        .filter((row): row is ScoreBreakdownRow => !!row);
      const score = groupRows.reduce((sum, row) => sum + row.score, 0);
      const maxScore = groupRows.reduce((sum, row) => sum + row.maxScore, 0);
      return {
        code: group.code,
        title: group.title,
        description: group.description,
        weight: group.weight,
        score,
        maxScore
      };
    });
  }

  protected cqvsGroupPercent(group: CqvsGroupRow): number {
    if (!group.maxScore) return 0;
    return Math.max(0, Math.min(100, Math.round((group.score / group.maxScore) * 100)));
  }

  protected scoreFormulaHint(): string {
    const snapshot = this.scoreSnapshot();
    return `Overall ${snapshot.finalLeadScore}/100 = Lead data quality ${snapshot.buyerDataQualityScore100}/100 x 30% (${snapshot.leadContributionScore100}) + Qualification ${snapshot.qualificationScore100}/100 x 70% (${snapshot.qualificationContributionScore100}).`;
  }

  protected qualificationContributionTotal(): number {
    return this.scoreSnapshot().qualificationScore100;
  }

  protected leadDataQualityTotal(): number {
    return this.scoreSnapshot().buyerDataQualityScore100;
  }

  protected leadDataQualityWeightedContribution(): number {
    return this.scoreSnapshot().leadContributionScore100;
  }

  protected qualificationWeightedContribution(): number {
    return this.scoreSnapshot().qualificationContributionScore100;
  }

  protected scoreContributionPercent(row: ScoreBreakdownRow): number {
    if (!row.maxScore) return 0;
    return Math.max(0, Math.min(100, Math.round((row.score / row.maxScore) * 100)));
  }

  protected statusSeverity(status: LeadStatus | string) {
    switch (status) {
      case 'Qualified':
      case 'Converted':
        return 'success';
      case 'Contacted':
      case 'Nurture':
        return 'info';
      case 'Disqualified':
      case 'Lost':
        return 'danger';
      default:
        return 'warn';
    }
  }

  private validateOutcome(): string | null {
    if (this.form.status === 'Qualified' && !this.form.qualifiedNotes?.trim()) {
      return 'Qualification notes are required when qualifying a lead.';
    }

    if (this.form.status === 'Qualified' && this.countQualificationFactors() < 3) {
      return 'At least 3 qualification factors are required before marking a lead as Qualified.';
    }

    if (this.form.status === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
      return 'Nurture follow-up date is required when setting a lead to Nurture.';
    }

    if ((this.form.status === 'Lost' || this.form.status === 'Disqualified') && !this.form.disqualifiedReason?.trim()) {
      return 'Disqualified reason is required when closing a lead.';
    }

    return null;
  }

  private countQualificationFactors(): number {
    const factors = [
      this.form.budgetAvailability,
      this.form.readinessToSpend,
      this.form.buyingTimeline,
      this.form.problemSeverity,
      this.form.economicBuyer,
      this.form.icpFit
    ];
    return factors.filter((value) => this.isMeaningfulFactor(value)).length;
  }

  private hasQualificationFactors(): boolean {
    return this.countQualificationFactors() > 0;
  }

  private isMeaningfulFactor(value?: string | null): boolean {
    if (!value) return false;
    return value.trim().length > 0 && !this.isUnknownValue(value);
  }

  protected onQualificationFactorChange(): void {
    this.normalizeEvidence();
    this.applyFollowUpDefaults();
    this.refreshScoreBreakdown();
    if (this.form.autoScore) {
      this.form.score = this.computeAutoScore();
    }
    this.updateQualificationFeedback();
    this.updateEpistemicSummary();
  }

  protected isEvidenceDisabled(value?: string | null): boolean {
    if (!value) return true;
    return this.isUnknownValue(value);
  }

  private isUnknownValue(value?: string | null): boolean {
    if (!value) return true;
    return value.trim().toLowerCase().includes('unknown');
  }

  private normalizeEvidence(): void {
    if (this.isEvidenceDisabled(this.form.budgetAvailability)) {
      this.form.budgetEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.readinessToSpend)) {
      this.form.readinessEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.buyingTimeline)) {
      this.form.timelineEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.problemSeverity)) {
      this.form.problemEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.economicBuyer)) {
      this.form.economicBuyerEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.icpFit)) {
      this.form.icpFitEvidence = 'No evidence yet';
    }
  }

  private ensureEvidenceOptionsContainSelections(): void {
    const selectedValues = [
      this.form.budgetEvidence,
      this.form.readinessEvidence,
      this.form.timelineEvidence,
      this.form.problemEvidence,
      this.form.economicBuyerEvidence,
      this.form.icpFitEvidence
    ]
      .map((value) => (value ?? '').trim())
      .filter((value) => value.length > 0);

    const existing = new Set(this.evidenceOptions.map((option) => option.value.toLowerCase()));
    const additions = selectedValues
      .filter((value) => !existing.has(value.toLowerCase()))
      .map((value) => LeadFormPage.toEvidenceOption(value));

    if (additions.length) {
      this.evidenceOptions = [...this.evidenceOptions, ...additions];
    }
  }

  private static defaultEvidenceSources(): string[] {
    return [
      'No evidence yet',
      'Customer call',
      'Call notes',
      'Call recap',
      'Follow-up call notes',
      'Discovery call notes',
      'Discovery meeting notes',
      'Meeting notes',
      'Email confirmation',
      'Email from buyer',
      'Buyer email',
      'Written confirmation',
      'Chat transcript',
      'Proposal feedback',
      'Internal plan mention',
      'Ops review notes',
      'Org chart reference',
      'Account research',
      'Third-party confirmation',
      'Historical / prior deal',
      'Inferred from context'
    ];
  }

  private static toEvidenceOption(source: string): OptionItem {
    const value = source.trim();
    return {
      label: value,
      value,
      icon: LeadFormPage.resolveEvidenceIcon(value),
      tone: LeadFormPage.resolveEvidenceTone(value)
    };
  }

  private static resolveEvidenceTone(source: string): OptionItem['tone'] {
    const normalized = source.trim().toLowerCase();
    if (normalized.includes('no evidence') || normalized.includes('unknown')) {
      return 'unknown';
    }
    if (normalized.includes('inferred') || normalized.includes('assumption')) {
      return 'invalid';
    }
    if (
      normalized.includes('confirmation')
      || normalized.includes('email')
      || normalized.includes('buyer')
      || normalized.includes('meeting')
      || normalized.includes('call')
    ) {
      return 'verified';
    }
    if (normalized.includes('history') || normalized.includes('prior')) {
      return 'neutral';
    }
    return 'assumed';
  }

  private static resolveEvidenceIcon(source: string): string {
    const normalized = source.trim().toLowerCase();
    if (normalized.includes('no evidence')) return 'pi pi-minus-circle';
    if (normalized.includes('email')) return 'pi pi-envelope';
    if (normalized.includes('meeting')) return 'pi pi-calendar';
    if (normalized.includes('call')) return 'pi pi-phone';
    if (normalized.includes('chat')) return 'pi pi-comments';
    if (normalized.includes('org chart')) return 'pi pi-sitemap';
    if (normalized.includes('research')) return 'pi pi-search';
    if (normalized.includes('history') || normalized.includes('prior')) return 'pi pi-history';
    if (normalized.includes('third-party')) return 'pi pi-users';
    if (normalized.includes('proposal')) return 'pi pi-file';
    if (normalized.includes('inferred')) return 'pi pi-compass';
    return 'pi pi-file';
  }

  private updateQualificationFeedback(preferServer = false): void {
    const factors = this.getQualificationFactors();
    const weakest = this.getWeakestFactor(factors);
    const serverWeakestSignal = this.serverWeakestSignal();
    const serverWeakestState = this.serverWeakestState();
    const serverSuggestions = this.serverNextEvidenceSuggestions();
    const confidenceLabel = this.deriveConfidenceLabel(factors);
    const suggestions = preferServer && serverSuggestions.length
      ? serverSuggestions
      : this.buildNextEvidenceSuggestions(weakest?.label ?? null);
    this.qualificationFeedback.set({
      confidenceLabel,
      weakestSignal: preferServer && serverWeakestSignal ? serverWeakestSignal : weakest?.label ?? null,
      weakestState: preferServer && serverWeakestState ? serverWeakestState : weakest?.state ?? null
    });
    this.nextEvidenceSuggestions.set(suggestions);
  }

  private refreshScoreBreakdown(): void {
    this.scoreBreakdown.set(this.buildScoreBreakdown());
  }

  private buildScoreBreakdown(): LeadScoreBreakdownItem[] {
    return [
      { factor: 'Budget', score: this.getBudgetScore(this.form.budgetAvailability), maxScore: 25 },
      { factor: 'Readiness', score: this.getReadinessScore(this.form.readinessToSpend), maxScore: 20 },
      { factor: 'Timeline', score: this.getTimelineScore(this.form.buyingTimeline), maxScore: 15 },
      { factor: 'Problem', score: this.getProblemScore(this.form.problemSeverity), maxScore: 20 },
      { factor: 'Economic Buyer', score: this.getEconomicBuyerScore(this.form.economicBuyer), maxScore: 10 },
      { factor: 'ICP Fit', score: this.getIcpFitScore(this.form.icpFit), maxScore: 10 }
    ];
  }

  private updateEpistemicSummary(preferServer = false): void {
    const factors = this.getQualificationFactors();
    const computedTruthCoverage = this.computeTruthCoverage(factors);
    const computedAssumptions = this.computeAssumptionsOutstanding(factors);

    if (preferServer) {
      this.truthCoverage.set(this.truthCoverage() ?? computedTruthCoverage);
      this.assumptionsOutstanding.set(this.assumptionsOutstanding() ?? computedAssumptions);
    } else {
      this.truthCoverage.set(computedTruthCoverage);
      this.assumptionsOutstanding.set(computedAssumptions);
    }
  }

  protected truthCoveragePercent(): number {
    const coverage = this.truthCoverage();
    if (coverage === null || Number.isNaN(coverage)) return 0;
    return Math.round(coverage * 100);
  }

  protected assumptionsOutstandingLabel(): string {
    const count = this.assumptionsOutstanding();
    if (!count) return '0 assumptions';
    return `${count} assumption${count === 1 ? '' : 's'}`;
  }

  private computeTruthCoverage(factors: Array<{ state: string }>): number {
    if (!factors.length) return 0;
    const verifiedCount = factors.filter((factor) => factor.state === 'Verified').length;
    return verifiedCount / factors.length;
  }

  private computeAssumptionsOutstanding(factors: Array<{ label: string; state: string }>): number {
    const highImpactLabels = new Set(['Budget availability', 'Buying timeline', 'Economic buyer']);
    return factors.filter((factor) => highImpactLabels.has(factor.label) && (factor.state === 'Unknown' || factor.state === 'Assumed')).length;
  }

  private buildNextEvidenceSuggestions(label: string | null): string[] {
    switch (label) {
      case 'Budget availability':
        return [
          'Capture budget range and approval owner.',
          'Ask for confirmation of funding source and timeline.'
        ];
      case 'Readiness to spend':
        return [
          'Confirm internal priority vs competing initiatives.',
          'Ask for target decision date and blockers.'
        ];
      case 'Buying timeline':
        return [
          'Document target go-live date and procurement steps.',
          'Confirm key milestones and dependencies.'
        ];
      case 'Problem severity':
        return [
          'Capture quantified impact (time/cost/risk).',
          'Ask for a recent example or incident.'
        ];
      case 'Economic buyer':
        return [
          'Identify budget owner and approval chain.',
          'Confirm who signs and who influences.'
        ];
      case 'ICP fit':
        return [
          'Validate company size, industry, and stack fit.',
          'Confirm urgency relative to ICP triggers.'
        ];
      default:
        return [
          'Log specific evidence for the weakest factor.',
          'Confirm the next step and decision owner.'
        ];
    }
  }

  private getQualificationFactors(): Array<{ label: string; state: string; weight: number }> {
    return [
      this.getFactorState('Budget availability', this.form.budgetAvailability, this.budgetOptions),
      this.getFactorState('Readiness to spend', this.form.readinessToSpend, this.readinessOptions),
      this.getFactorState('Buying timeline', this.form.buyingTimeline, this.timelineOptions),
      this.getFactorState('Problem severity', this.form.problemSeverity, this.problemOptions),
      this.getFactorState('Economic buyer', this.form.economicBuyer, this.economicBuyerOptions),
      this.getFactorState('ICP fit', this.form.icpFit, this.icpFitOptions)
    ];
  }

  private getFactorState(
    label: string,
    value: string | null | undefined,
    options: OptionItem[]
  ): { label: string; state: string; weight: number } {
    const tone = this.resolveTone(value, options);
    const weight = this.toneWeight(tone);
    return { label, state: this.toneLabel(tone), weight };
  }

  private resolveTone(value: string | null | undefined, options: OptionItem[]): OptionItem['tone'] {
    if (!value) return 'unknown';
    const match = options.find((option) => option.value === value);
    return match?.tone ?? (this.isUnknownValue(value) ? 'unknown' : 'assumed');
  }

  private toneWeight(tone: OptionItem['tone']): number {
    switch (tone) {
      case 'verified':
        return 3;
      case 'assumed':
        return 2;
      case 'unknown':
        return 1;
      case 'invalid':
        return 0;
      default:
        return 2;
    }
  }

  private toneLabel(tone: OptionItem['tone']): string {
    switch (tone) {
      case 'verified':
        return 'Verified';
      case 'assumed':
        return 'Assumed';
      case 'invalid':
        return 'Invalid';
      default:
        return 'Unknown';
    }
  }

  private getConfidenceForValue(value: string | null | undefined, options: OptionItem[]): string {
    const tone = this.resolveTone(value, options);
    return this.toneLabel(tone);
  }

  private getWeakestFactor(factors: Array<{ label: string; state: string; weight: number }>) {
    return factors.reduce((weakest, current) => {
      if (!weakest) return current;
      if (current.weight < weakest.weight) return current;
      return weakest;
    }, null as { label: string; state: string; weight: number } | null);
  }

  private deriveConfidenceLabel(factors: Array<{ weight: number }>): string {
    if (!factors.length) return 'Neutral';
    const average = factors.reduce((sum, factor) => sum + factor.weight, 0) / factors.length;
    if (average >= 2.6) return 'High';
    if (average >= 1.6) return 'Medium';
    return 'Low';
  }

  private applyFollowUpDefaults(): void {
    const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
    const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';
    let hint: string | null = null;

    if (readiness === 'not planning to spend') {
      if (!this.cadenceOutcome.trim()) {
        this.cadenceOutcome = 'Nurture reminder';
      }
      const due = new Date();
      due.setDate(due.getDate() + 14);
      if (!this.cadenceNextStepLocal || this.cadenceNextStepLocal.getTime() > due.getTime()) {
        this.cadenceNextStepLocal = due;
      }
      hint = 'Readiness is “Not planning to spend.” Defaulting follow-up to nurture reminder.';
    }

    if (timeline.includes('target date verbally confirmed')) {
      const due = new Date();
      due.setDate(due.getDate() + 1);
      if (!this.cadenceNextStepLocal || this.cadenceNextStepLocal.getTime() > due.getTime()) {
        this.cadenceNextStepLocal = due;
      }
      hint = 'Timeline has a confirmed target date. Schedule the next step within SLA.';
    }

    this.followUpHint.set(hint);
  }

  private getDefaultTab(): 'overview' | 'qualification' | 'activity' | 'history' {
    const stateTab = history.state?.defaultTab;
    if (stateTab === 'qualification' || stateTab === 'overview' || stateTab === 'activity' || stateTab === 'history') {
      return stateTab;
    }
    if (!this.isEditMode()) {
      return 'overview';
    }
    const roles = this.authService.currentUser()?.roles ?? [];
    const normalized = roles.map((role) => role.toLowerCase());
    const isManager = normalized.some((role) => role.includes('manager') || role.includes('director') || role.includes('vp') || role.includes('admin'));
    if (normalized.length === 0) {
      return 'overview';
    }
    return isManager ? 'overview' : 'qualification';
  }

  private toDateValue(value?: string): Date | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }
}
