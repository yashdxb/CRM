import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, HostListener, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { TabsModule } from 'primeng/tabs';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

import { map, Observable } from 'rxjs';

import {
  Lead,
  LeadAssignmentStrategy,
  LeadCustomQualificationFactorValue,
  LeadConversionReadiness,
  LeadDuplicateCheckCandidate,
  LeadDuplicateCheckResponse,
  LEAD_STATUSES,
  LeadScoreBreakdownItem,
  LeadStatus,
  LeadStatusHistoryItem
} from '../models/lead.model';
import { LeadDataService, LeadConversationSummaryResponse, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuthService } from '../../../../core/auth/auth.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, readUserEmail, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { HasUnsavedChanges } from '../../../../core/guards/unsaved-changes.guard';
import { TooltipModule } from 'primeng/tooltip';
import { PhoneTypeReference, ReferenceDataService } from '../../../../core/services/reference-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import {
  BrokerageLeadProfileCatalog,
  LeadDispositionPolicy,
  QualificationFactorDefinition,
  QualificationPolicy,
  SupportingDocumentPolicy,
  VerticalPresetConfiguration
} from '../../settings/models/workspace-settings.model';
import { AttachmentDataService, AttachmentItem } from '../../../../shared/services/attachment-data.service';
import { computeLeadScore, computeQualificationRawScore, LeadDataWeight, LeadScoreResult, QualificationFactorConfig } from './lead-scoring.util';
import { Activity } from '../../activities/models/activity.model';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { EmailListItem } from '../../emails/models/email.model';
import { FormDraftDetail, FormDraftSummary } from '../../../../core/drafts/form-draft.model';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';

/** Progression statuses shown in the stepper (left → right) */
const LEAD_PROGRESSION_STATUSES: readonly LeadStatus[] = ['New', 'Contacted', 'Qualified'] as const;
/** Outcome statuses shown as exit buttons below the stepper */
const LEAD_OUTCOME_STATUSES: readonly LeadStatus[] = ['Converted', 'Lost', 'Disqualified'] as const;

type StepState = 'completed' | 'current' | 'available' | 'locked';

interface StepperStep {
  status: LeadStatus;
  label: string;
  icon: string;
  state: StepState;
  unlockHint: string | null;
  timeInStage: string | null;
}

interface StatusOption {
  label: string;
  value: LeadStatus;
  icon: string;
  disabled?: boolean;
}

interface StatusRecommendationChip {
  label: string;
  tone: 'info' | 'success' | 'warn';
}

interface LeadPrimaryStatusAction {
  kind: 'progress' | 'convert' | 'recycle' | 'logActivity';
  status?: LeadStatus;
  label: string;
  icon: string;
  disabled: boolean;
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

type QualificationFactorKey = 'budget' | 'readiness' | 'timeline' | 'problem' | 'economicBuyer' | 'icpFit';

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
    FileUploadModule,
    TagModule,
    DialogModule,
    DatePickerModule,
    TooltipModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    TabsModule,
    AccordionModule,
    SplitButtonModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./lead-form.page.html",
  styleUrls: ["./lead-form.page.scss"]
})
export class LeadFormPage implements OnInit, OnDestroy, HasUnsavedChanges {
  private static readonly ACCORDION_STATE_STORAGE_KEY = 'crm.lead-form.accordion-state.v1';
  protected activeTab = signal<'overview' | 'qualification' | 'activity' | 'history' | 'documents'>('overview');

  /** Inline closure form state (Strategy C – stepper morphs) */
  protected closureFormActive = signal(false);
  protected closureFormStatus = signal<'Lost' | 'Disqualified' | null>(null);
  protected closureReason = '';
  protected closureCompetitor = '';
  protected closureNotes = '';

  /** Backward movement confirmation state */
  protected backwardConfirmPending = signal(false);
  protected backwardConfirmTarget = signal<StepperStep | null>(null);

  /** Inline convert form state (Strategy C – stepper morphs for Convert) */
  protected convertFormActive = signal(false);
  protected statusPathExpanded = signal(false);

  protected overviewAccordionOpenPanels = signal<string[]>(['lead-basics', 'contact-details', 'score']);
  protected qualificationAccordionOpenPanels = signal<string[]>([
    'qualification-factors',
    'qualification-scoring',
    'qualification-context',
    'qualification-disposition'
  ]);
  protected activityAccordionOpenPanels = signal<string[]>(['activity-main']);
  protected documentsAccordionOpenPanels = signal<string[]>(['documents-main']);
  protected historyAccordionOpenPanels = signal<string[]>(['history-main']);
  protected readonly statusOptions: StatusOption[] = LEAD_STATUSES.map((status) => ({
    label: status,
    value: status,
    icon: this.statusIcon(status)
  }));
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
  protected readonly disqualificationReasonOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly lossReasonOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly buyerTypeOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly motivationUrgencyOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly financingReadinessOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly preApprovalStatusOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly preferredAreaOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly propertyTypeOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly budgetBandOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly verticalPresetConfiguration = signal<VerticalPresetConfiguration | null>(null);
  protected evidenceOptions: OptionItem[] = LeadFormPage.defaultEvidenceSources().map((source) =>
    LeadFormPage.toEvidenceOption(source)
  );
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);
  protected draftSaving = signal(false);
  protected readonly recentDrafts = signal<FormDraftSummary[]>([]);
  protected readonly draftLibraryVisible = signal(false);
  protected readonly draftLibraryLoading = signal(false);
  protected readonly draftLibraryItems = signal<FormDraftSummary[]>([]);
  protected readonly draftStatusMessage = signal<string | null>(null);
  protected readonly draftModeActive = signal(false);
  protected readonly draftPromptVisible = signal(false);
  protected readonly draftOpenConfirmVisible = signal(false);
  protected readonly leavePromptVisible = signal(false);
  protected readonly activeDraftId = signal<string | null>(null);
  protected aiScoring = signal(false);
  protected statusApiError = signal<string | null>(null);
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
  protected conversationScore = signal<number | null>(null);
  protected conversationScoreLabel = signal<string | null>(null);
  protected conversationScoreReasons = signal<string[]>([]);
  protected conversationScoreUpdatedAtUtc = signal<string | null>(null);
  protected conversationSignalAvailable = signal(false);
  protected conversationAiDimensionScore = signal<number | null>(null);
  protected conversationAiToneLabel = signal<string | null>(null);
  protected conversationAiSentiment = signal<string | null>(null);
  protected conversationAiBuyingReadiness = signal<string | null>(null);
  protected conversationAiSemanticIntent = signal<string | null>(null);
  protected conversationAiToneJustification = signal<string | null>(null);
  protected conversionReadiness = signal<LeadConversionReadiness | null>(null);
  protected leadNumber = signal<string | null>(null);
  protected serverNextEvidenceSuggestions = signal<string[]>([]);
  protected nextEvidenceSuggestions = signal<string[]>([]);
  protected qualificationFeedback = signal<{
    confidenceLabel: string;
    weakestSignal: string | null;
    weakestState: string | null;
  } | null>(null);
  protected readonly presenceUsers = signal<Array<{ userId: string; displayName: string; isEditing: boolean }>>([]);
  protected serverWeakestSignal = signal<string | null>(null);
  protected serverWeakestState = signal<string | null>(null);
  protected scoreBreakdown = signal<LeadScoreBreakdownItem[]>([]);
  protected riskFlags = signal<string[]>([]);
  protected routingReason = signal<string | null>(null);
  protected statusHistory = signal<LeadStatusHistoryItem[]>([]);
  protected attachments = signal<AttachmentItem[]>([]);
  protected attachmentsLoading = signal(false);
  protected attachmentUploading = signal(false);
  protected attachmentDeletingIds = signal<string[]>([]);
  protected attachmentUploadError = signal<string | null>(null);
  protected recentLeadActivities = signal<Activity[]>([]);
  protected recentLeadActivitiesLoading = signal(false);
  protected leadEmails = signal<EmailListItem[]>([]);
  protected leadEmailsLoading = signal(false);
  protected leadEmailsExpanded = signal(false);
  protected leadEmailsTotalCount = signal(0);
  protected conversationAiSummary = signal<LeadConversationSummaryResponse | null>(null);
  protected conversationAiSummaryLoading = signal(false);
  protected transferredActivityCount = signal<number>(0);
  protected transferredLastActivity = signal<Activity | null>(null);
  protected transferredActivityEntityType = signal<'Opportunity' | 'Account' | null>(null);
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
  protected qualificationPolicyConfig = signal<QualificationPolicy | null>(null);
  protected supportingDocumentPolicy = signal<SupportingDocumentPolicy | null>(null);
  private readonly toastService = inject(AppToastService);
  private readonly phoneUtil = PhoneNumberUtil.getInstance();
  private readonly regionDisplay = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly referenceData = inject(ReferenceDataService);
  private readonly workspaceSettings = inject(WorkspaceSettingsService);
  private readonly attachmentData = inject(AttachmentDataService);
  private readonly activityData = inject(ActivityDataService);
  private readonly authService = inject(AuthService);
  private readonly formDraftService = inject(FormDraftService);
  private readonly mailCompose = inject(MailComposeService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  private readonly crmEvents = inject(CrmEventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserId = readUserId();

  private editingId: string | null = null;
  private leadDataWeights: LeadDataWeight[] = [];
  private pendingSavePayload: SaveLeadRequest | null = null;
  private pendingDraftToOpen: FormDraftSummary | null = null;
  private pendingSaveIsEdit = false;
  private localEditingState = false;
  private editingIdleTimer: ReturnType<typeof setTimeout> | null = null;
  private formSnapshot: string | null = null;
  private hasShownDraftPrompt = false;
  private pendingLeaveResolver: ((value: boolean) => void) | null = null;
  private pendingLeaveDecision: Promise<boolean> | null = null;
  private leaveAfterSave = false;
  private leaveAfterDraftSave = false;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    this.loadRecentDrafts();
    this.activeTab.set(this.getDefaultTab());
    this.restoreAccordionState();
    const lead = history.state?.lead as Lead | undefined;
    this.loadOwners();
    this.loadEvidenceSources();
    this.loadLeadDispositionPolicy();
    this.loadPhoneTypes();
    this.loadPhoneCountries();
    this.loadLeadDataWeights();
    this.loadSupportingDocumentPolicy();
    this.resolveAssignmentAccess();
    if (!this.editingId) {
      this.captureFormSnapshot();
    }
    if (this.editingId) {
      this.initializePresence(this.editingId);
      if (lead) {
        this.prefillFromLead(lead);
      }
      this.leadData.get(this.editingId).subscribe({
        next: (data) => {
          this.prefillFromLead(data);
          this.loadStatusHistory(this.editingId!);
          this.loadRecentLeadActivities(this.editingId!);
          this.loadSupportingDocuments(this.editingId!);
          this.loadLeadEmails(this.editingId!);
        },
        error: (err) => {
          console.error('Lead load failed:', err);
          const status = (err as { status?: number })?.status;
          const parsed = this.extractApiError(err, 'This lead is no longer available.');
          const detail = status ? `(HTTP ${status}) ${parsed.message}` : parsed.message;
          this.raiseToast('error', detail);
          this.router.navigate(['/app/leads']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.resolvePendingLeave(false);
    this.clearEditingIdleTimer();
    if (this.editingId) {
      this.crmEvents.setRecordEditingState('lead', this.editingId, false);
      this.crmEvents.leaveRecordPresence('lead', this.editingId);
    }
  }

  protected composeToCurrentLead(event?: Event): void {
    event?.preventDefault();
    if (!this.isEditMode() || !this.form.email || !this.editingId) {
      return;
    }

    const displayName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();

    this.mailCompose.open({
      toEmail: this.form.email,
      toName: displayName || undefined,
      relatedEntityType: 'Lead',
      relatedEntityId: this.editingId
    });
  }

  @HostListener('input')
  @HostListener('change')
  protected onCollaborativeEditingActivity(): void {
    if (!this.editingId || !this.isEditMode()) {
      return;
    }

    if (!this.localEditingState) {
      this.localEditingState = true;
      this.crmEvents.setRecordEditingState('lead', this.editingId, true);
      console.debug('[LeadForm] Broadcasting editing state: true');
    }

    this.clearEditingIdleTimer();
    this.editingIdleTimer = setTimeout(() => {
      if (!this.editingId) {
        return;
      }

      // Keep editing state ON if form has uncommitted changes
      if (this.hasUncommittedChanges()) {
        console.debug('[LeadForm] Form has uncommitted changes, keeping editing state ON');
        return;
      }

      this.localEditingState = false;
      this.crmEvents.setRecordEditingState('lead', this.editingId, false);
      console.debug('[LeadForm] Broadcasting editing state: false (idle timeout)');
    }, 8000);
  }

  /**
   * Check if the form has uncommitted changes by comparing current values to the loaded snapshot.
   */
  protected hasUncommittedChanges(): boolean {
    if (!this.formSnapshot || !this.isEditMode()) {
      return false;
    }
    const currentSnapshot = this.createFormSnapshot();
    return currentSnapshot !== this.formSnapshot;
  }

  private createFormSnapshot(): string {
    // Serialize key form fields for comparison
    const snapshotData = {
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      companyName: this.form.companyName,
      email: this.form.email,
      phone: this.form.phone,
      status: this.form.status,
      source: this.form.source,
      jobTitle: this.form.jobTitle,
      ownerId: this.form.ownerId,
      territory: this.form.territory,
      disqualifiedReason: this.form.disqualifiedReason,
      qualifiedNotes: this.form.qualifiedNotes,
      buyerType: this.form.buyerType,
      motivationUrgency: this.form.motivationUrgency,
      financingReadiness: this.form.financingReadiness,
      preApprovalStatus: this.form.preApprovalStatus,
      preferredArea: this.form.preferredArea,
      preferredPropertyType: this.form.preferredPropertyType,
      budgetBand: this.form.budgetBand,
      budgetAvailability: this.form.budgetAvailability,
      budgetEvidence: this.form.budgetEvidence,
      readinessToSpend: this.form.readinessToSpend,
      readinessEvidence: this.form.readinessEvidence,
      buyingTimeline: this.form.buyingTimeline,
      timelineEvidence: this.form.timelineEvidence,
      problemSeverity: this.form.problemSeverity,
      problemEvidence: this.form.problemEvidence,
      economicBuyer: this.form.economicBuyer,
      economicBuyerEvidence: this.form.economicBuyerEvidence,
      icpFit: this.form.icpFit,
      icpFitEvidence: this.form.icpFitEvidence,
      customQualificationFactors: this.form.customQualificationFactors
    };
    return JSON.stringify(snapshotData);
  }

  private captureFormSnapshot(): void {
    this.formSnapshot = this.createFormSnapshot();
    console.debug('[LeadForm] Form snapshot captured');
  }

  private resolvePendingLeave(value: boolean): void {
    const resolver = this.pendingLeaveResolver;
    this.pendingLeaveResolver = null;
    this.pendingLeaveDecision = null;
    this.leaveAfterSave = false;
    this.leaveAfterDraftSave = false;
    this.leavePromptVisible.set(false);
    resolver?.(value);
  }

  private finalizeLeaveAfterSave(success: boolean): void {
    if (!this.leaveAfterSave) {
      return;
    }
    this.resolvePendingLeave(success);
  }

  private finalizeLeaveAfterDraftSave(success: boolean): void {
    if (!this.leaveAfterDraftSave) {
      return;
    }
    this.resolvePendingLeave(success);
  }

  private resetEditingState(): void {
    if (this.editingId && this.localEditingState) {
      this.localEditingState = false;
      this.crmEvents.setRecordEditingState('lead', this.editingId, false);
      console.debug('[LeadForm] Broadcasting editing state: false (after save)');
    }
    this.clearEditingIdleTimer();
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  hasUnsavedChanges(): boolean {
    return this.hasDraftFormChanges();
  }

  confirmLeaveWithUnsavedChanges(): Promise<boolean> {
    if (this.pendingLeaveDecision) {
      return this.pendingLeaveDecision;
    }

    this.leavePromptVisible.set(true);
    this.pendingLeaveDecision = new Promise<boolean>((resolve) => {
      this.pendingLeaveResolver = resolve;
    });
    return this.pendingLeaveDecision;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges()) {
      event.preventDefault();
    }
  }

  protected onAccordionValueChange(
    section: 'overview' | 'qualification' | 'activity' | 'documents' | 'history',
    value: string | number | Array<string | number> | null | undefined
  ): void {
    const normalized = Array.isArray(value)
      ? value
          .map((item) => (typeof item === 'number' ? String(item) : item))
          .filter((item): item is string => typeof item === 'string')
      : typeof value === 'string'
        ? [value]
        : typeof value === 'number'
          ? [String(value)]
        : [];

    switch (section) {
      case 'overview':
        this.overviewAccordionOpenPanels.set(normalized);
        break;
      case 'qualification':
        this.qualificationAccordionOpenPanels.set(normalized);
        break;
      case 'activity':
        this.activityAccordionOpenPanels.set(normalized);
        break;
      case 'documents':
        this.documentsAccordionOpenPanels.set(normalized);
        break;
      case 'history':
        this.historyAccordionOpenPanels.set(normalized);
        break;
    }

    this.persistAccordionState();
  }

  protected setActiveTab(tab: 'overview' | 'qualification' | 'activity' | 'history' | 'documents') {
    if (this.isTabDisabled(tab)) {
      return;
    }
    this.activeTab.set(tab);
  }

  protected onActiveTabChange(tab: string | number | null | undefined): void {
    if (typeof tab !== 'string') {
      return;
    }
    if (tab === 'overview' || tab === 'qualification' || tab === 'activity' || tab === 'history' || tab === 'documents') {
      this.setActiveTab(tab);
    }
  }

  protected isTabDisabled(tab: 'overview' | 'qualification' | 'activity' | 'history' | 'documents') {
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

  protected qualificationInlineError(): string | null {
    if (this.form.status !== 'Qualified') return null;
    const minimum = this.minimumRequiredQualificationFactors();
    if (this.countQualificationFactors() < minimum) {
      return `${minimum} qualification factor${minimum === 1 ? '' : 's'} required to qualify.`;
    }
    if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
      return `Evidence coverage must be at least ${this.minimumEvidenceCoveragePercent()}% to qualify.`;
    }
    return null;
  }

  protected qualificationTabBadge(): string | null {
    const count = this.riskFlags().length;
    return count ? `${count} risk` : null;
  }

  protected activityTabBadge(): string | null {
    const due = this.nextLeadActionDueDate();
    if (!due) return null;
    const now = new Date();
    if (due.getTime() < now.getTime()) {
      return 'Overdue';
    }
    return null;
  }

  protected logActivity(mode: 'follow-up' | 'first-touch' | 'reengagement' = 'follow-up'): void {
    if (!this.editingId) {
      return;
    }
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    const subject =
      mode === 'reengagement'
        ? (fullName ? `Re-engagement: ${fullName}` : 'Lead re-engagement')
        : mode === 'first-touch'
          ? (fullName ? `First touch: ${fullName}` : 'Lead first touch')
          : (fullName ? `Follow up: ${fullName}` : 'Lead follow-up');
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

  protected statusIcon(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'pi-star';
      case 'Contacted':
        return 'pi-comments';
      case 'Nurture':
        return 'pi-clock';
      case 'Qualified':
        return 'pi-check';
      case 'Converted':
        return 'pi-verified';
      case 'Lost':
        return 'pi-times';
      case 'Disqualified':
        return 'pi-ban';
      default:
        return 'pi-circle';
    }
  }

  protected statusOptionsForView(): StatusOption[] {
    if (this.hasAdministrationManagePermission()) {
      return this.statusOptions.map((option) => ({ ...option, disabled: false }));
    }
    if (!this.isEditMode()) {
      return this.statusOptions.map((option) => ({
        ...option,
        disabled: option.value !== 'New'
      }));
    }
    return this.statusOptions.map((option) => ({
      ...option,
      disabled: this.isStatusSelectionDisabled(option.value)
    }));
  }

  protected statusPolicyHint(): string | null {
    const apiError = this.statusApiError();
    if (apiError) {
      return apiError;
    }
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
    if (this.form.status === 'Nurture' && !this.hasRecentReengagementActivity()) {
      return 'Log a new re-engagement activity before resuming this lead to Contacted or Qualified.';
    }
    return null;
  }

  protected isActivityDrivenHint(): boolean {
    return this.isEditMode() && this.form.status === 'New' && !this.firstTouchedAtUtc();
  }

  protected goToActivityTab(): void {
    this.setActiveTab('activity');
  }

  protected nextRecommendedStatusChip(): StatusRecommendationChip | null {
    if (!this.isEditMode() || this.form.status === 'Converted') {
      return null;
    }

    const hasFirstTouch = !!this.firstTouchedAtUtc();
    const hasQualifiedSignals = this.countQualificationFactors() >= 3 && !!this.form.qualifiedNotes?.trim();

    if ((this.form.status === 'New' || this.form.status === 'Nurture') && !hasFirstTouch) {
      return { label: 'Next recommended: Contacted', tone: 'warn' };
    }

    if ((this.form.status === 'New' || this.form.status === 'Contacted' || this.form.status === 'Nurture') && hasFirstTouch && hasQualifiedSignals) {
      if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
        return { label: 'Next recommended: Add evidence', tone: 'warn' };
      }
      return { label: 'Next recommended: Qualified', tone: 'success' };
    }

    if ((this.form.status === 'New' || this.form.status === 'Contacted' || this.form.status === 'Nurture') && hasFirstTouch) {
      return { label: 'Next recommended: Contacted', tone: 'info' };
    }

    if (this.form.status === 'Qualified' && this.canConvertLead()) {
      return { label: 'Next recommended: Convert lead', tone: 'success' };
    }

    return null;
  }

  protected primaryStatusAction(): LeadPrimaryStatusAction | null {
    if (!this.isEditMode()) {
      return null;
    }

    if (this.canRecycleLead()) {
      return {
        kind: 'recycle',
        label: 'Recycle to Nurture',
        icon: 'pi pi-refresh',
        disabled: false
      };
    }

    if (this.form.status === 'Qualified') {
      return {
        kind: 'convert',
        label: 'Convert Lead',
        icon: 'pi pi-arrow-up-right',
        disabled: !this.canConvertLead()
      };
    }

    if (this.form.status === 'New' && !this.hasAnyCompletedLeadActivityEvidence()) {
      return {
        kind: 'logActivity',
        label: 'Log first activity',
        icon: 'pi pi-calendar-plus',
        disabled: false
      };
    }

    if (this.form.status === 'Nurture') {
      if (!this.hasRecentReengagementActivity()) {
        return {
          kind: 'logActivity',
          label: 'Log re-engagement',
          icon: 'pi pi-calendar-plus',
          disabled: false
        };
      }
      const resumeStatus: LeadStatus = this.hasReachedContactedStage() ? 'Contacted' : 'New';
      return {
        kind: 'progress',
        status: resumeStatus,
        label: resumeStatus === 'Contacted' ? 'Resume to Contacted' : 'Move to New',
        icon: this.statusIcon(resumeStatus),
        disabled: false
      };
    }

    const nextStatus = this.nextProgressionStatus();
    if (!nextStatus) {
      return null;
    }

    return {
      kind: 'progress',
      status: nextStatus,
      label: this.progressActionLabel(nextStatus),
      icon: this.statusIcon(nextStatus),
      disabled: this.progressActionBlockedReasons().length > 0
    };
  }

  protected triggerPrimaryStatusAction(): void {
    const action = this.primaryStatusAction();
    if (!action || action.disabled) {
      return;
    }

    switch (action.kind) {
      case 'progress':
        if (action.status) {
          this.form.status = action.status;
        }
        return;
      case 'logActivity':
        this.logActivity(this.form.status === 'Nurture' ? 'reengagement' : 'first-touch');
        return;
      case 'convert':
        this.onOutcomeClick('Converted');
        return;
      case 'recycle':
        this.recycleToNurture();
        return;
    }
  }

  protected toggleStatusPath(): void {
    this.statusPathExpanded.update((value) => !value);
  }

  protected progressActionBlockedReasons(): string[] {
    const status = this.nextMainProgressionTarget();
    if (!status) {
      return [];
    }

    return this.transitionBlockedReasons(status);
  }

  protected secondaryOutcomeActions(): Array<{ status: 'Lost' | 'Disqualified'; label: string; icon: string; disabled: boolean }> {
    return [
      {
        status: 'Lost',
        label: 'Mark Lost',
        icon: 'pi pi-times-circle',
        disabled: !this.isOutcomeAvailable('Lost')
      },
      {
        status: 'Disqualified',
        label: 'Disqualify',
        icon: 'pi pi-ban',
        disabled: !this.isOutcomeAvailable('Disqualified')
      }
    ];
  }

  protected currentStatusInstruction(): string | null {
    const action = this.primaryStatusAction();
    if (!action) {
      return this.statusPolicyHint();
    }

    if (action.kind === 'progress') {
      if (this.progressActionBlockedReasons().length) {
        return 'Complete the required evidence below to unlock the next main step.';
      }
      return `Recommended next step: ${action.label}`;
    }

    if (action.kind === 'logActivity') {
      return action.label === 'Log re-engagement'
        ? 'Re-engagement required'
        : 'Log the first completed activity before moving this lead forward.';
    }

    if (action.kind === 'convert') {
      return action.disabled ? 'Conversion is blocked until qualification and policy requirements are met.' : 'Lead is ready for conversion.';
    }

    if (action.kind === 'recycle') {
      return 'This lead can be recycled back into nurture for follow-up.';
    }

    return null;
  }

  protected nurtureBranchAction(): { label: string; icon: string } | null {
    if (!this.isEditMode() || this.form.status === 'Converted' || this.canRecycleLead()) {
      return null;
    }

    if (this.form.status === 'Nurture') {
      return null;
    }

    return {
      label: 'Move to Nurture',
      icon: 'pi pi-clock'
    };
  }

  protected nurtureBranchState(): StepState {
    const current = this.form.status as LeadStatus;
    if (current === 'Nurture') {
      return 'current';
    }

    if (current === 'Converted' || current === 'Lost' || current === 'Disqualified') {
      return 'locked';
    }

    return 'available';
  }

  protected onNurtureBranchClick(): void {
    if (!this.isEditMode() || this.form.status === 'Nurture' || this.nurtureBranchState() === 'locked') {
      return;
    }

    if ((this.form.status as LeadStatus) === 'Contacted' && !this.hasAnyCompletedLeadActivityEvidence()) {
      this.raiseToast('error', 'Log a completed activity before moving a contacted lead into nurture.');
      this.setActiveTab('activity');
      return;
    }

    this.form.status = 'Nurture';
    if (!this.form.nurtureFollowUpAtUtc) {
      this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
    }
    this.setActiveTab('qualification');
  }

  private nextProgressionStatus(): LeadStatus | null {
    const currentIndex = this.progressionIndex(this.form.status as LeadStatus);
    if (currentIndex < 0 || currentIndex >= LEAD_PROGRESSION_STATUSES.length - 1) {
      return null;
    }

    return LEAD_PROGRESSION_STATUSES[currentIndex + 1];
  }

  private progressActionLabel(status: LeadStatus): string {
    switch (status) {
      case 'Contacted':
        return 'Mark as Contacted';
      case 'Nurture':
        return 'Move to Nurture';
      case 'Qualified':
        return 'Move to Qualified';
      default:
        return `Move to ${status}`;
    }
  }

  private nextMainProgressionTarget(): LeadStatus | null {
    const current = this.form.status as LeadStatus;
    if (current === 'Nurture') {
      return this.hasReachedContactedStage() ? 'Contacted' : 'New';
    }

    return this.nextProgressionStatus();
  }

  // ─── Status Stepper ────────────────────────────────────────────

  /** Whether to show the visual stepper (edit mode — all roles including admin) */
  protected showStatusStepper(): boolean {
    return this.isEditMode();
  }

  /** The ordered progression order index for the current status */
  private progressionIndex(status: LeadStatus): number {
    return LEAD_PROGRESSION_STATUSES.indexOf(status);
  }

  /** Build the stepper steps with state + unlock hints */
  protected stepperSteps(): StepperStep[] {
    const current = this.form.status as LeadStatus;
    const currentIdx = this.progressionIndex(current);
    const hasFirstTouch = !!this.firstTouchedAtUtc();
    const qualFactors = this.countQualificationFactors();
    const hasQualNotes = !!this.form.qualifiedNotes?.trim();
    const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();

    const isAdmin = this.hasAdministrationManagePermission();

    return LEAD_PROGRESSION_STATUSES.map((status, idx) => {
      let state: StepState;
      let unlockHint: string | null = null;

      if (status === current) {
        state = 'current';
      } else if (currentIdx >= 0 && idx < currentIdx) {
        // Steps before current are completed (in the progression)
        state = 'completed';
      } else {
        // Admins bypass gates — all steps are available
        if (isAdmin) {
          state = 'available';
        } else {
          state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
          if (state === 'locked') {
            unlockHint = this.transitionBlockedReasons(status).join(' ');
          }
        }
      }

      // Special case: branch/outcome states that sit outside the main linear path
      if (currentIdx < 0) {
        if (current === 'Nurture') {
          if (status === 'New') {
            state = 'completed';
          } else if (status === 'Contacted') {
            if (this.hasReachedContactedStage()) {
              state = 'completed';
            } else if (isAdmin) {
              state = 'available';
            } else {
              state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
              if (state === 'locked') {
                unlockHint = this.transitionBlockedReasons(status).join(' ');
              }
            }
          } else if (status === 'Qualified') {
            if (isAdmin) {
              state = 'available';
            } else {
              state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
              if (state === 'locked') {
                unlockHint = this.transitionBlockedReasons(status).join(' ');
              }
            }
          } else {
            state = 'completed';
          }
        } else if (current === 'Converted') {
          state = 'completed';
        } else {
          // Lost/Disqualified — show steps as they were before exit
          state = idx === 0 ? 'completed' : 'locked';
        }
      }

      return {
        status,
        label: status,
        icon: this.statusIcon(status),
        state,
        unlockHint,
        timeInStage: state === 'current' ? this.computeTimeInStage(status) : null
      };
    });
  }

  /** Compute how long the lead has been in the given status */
  private computeTimeInStage(status: LeadStatus): string | null {
    const history = this.statusHistory();
    if (!history.length) return null;
    // Find the most recent entry matching current status
    const entry = history.find(h => h.status === status);
    if (!entry?.changedAtUtc) return null;
    const changed = new Date(entry.changedAtUtc.endsWith('Z') ? entry.changedAtUtc : entry.changedAtUtc + 'Z');
    const now = new Date();
    const diffMs = now.getTime() - changed.getTime();
    if (diffMs < 0) return null;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}mo`;
  }

  /** Build a compact audit trail from status history for display near the stepper */
  protected statusAuditTrail(): Array<{ status: string; date: string }> {
    const history = this.statusHistory();
    if (!history.length) return [];
    // Show history in chronological order (oldest first), limit to last 6
    return [...history]
      .sort((a, b) => new Date(a.changedAtUtc).getTime() - new Date(b.changedAtUtc).getTime())
      .slice(-6)
      .map(h => ({
        status: h.status,
        date: new Date(h.changedAtUtc.endsWith('Z') ? h.changedAtUtc : h.changedAtUtc + 'Z')
          .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }));
  }

  private isStepUnlocked(status: LeadStatus, hasFirstTouch: boolean, qualFactors: number, hasQualNotes: boolean, meetsEvidence: boolean): boolean {
    switch (status) {
      case 'Contacted':
        return hasFirstTouch;
      case 'Nurture':
        return true; // Nurture is always available as a parking state
      case 'Qualified':
        return hasFirstTouch && qualFactors >= 3 && hasQualNotes && meetsEvidence;
      default:
        return true;
    }
  }

  private stepUnlockHint(status: LeadStatus, hasFirstTouch: boolean, qualFactors: number, hasQualNotes: boolean, meetsEvidence: boolean): string {
    switch (status) {
      case 'Contacted':
        return 'Log a completed call, email, or meeting to unlock this step';
      case 'Qualified': {
        const missing: string[] = [];
        const minimum = this.minimumRequiredQualificationFactors();
        if (!hasFirstTouch) missing.push('log an activity');
        if (qualFactors < minimum) missing.push(`complete ${minimum - qualFactors} more qualification factor${minimum - qualFactors > 1 ? 's' : ''}`);
        if (!hasQualNotes) missing.push('add qualification notes');
        if (!meetsEvidence) missing.push('add evidence to meet coverage threshold');
        return `To unlock: ${missing.join(', ')}`;
      }
      default:
        return 'Complete the previous steps first';
    }
  }

  private hasReachedContactedStage(): boolean {
    if (!!this.firstTouchedAtUtc()) {
      return true;
    }

    const current = this.form.status as LeadStatus;
    if (current === 'Contacted' || current === 'Qualified' || current === 'Converted') {
      return true;
    }

    return this.statusHistory().some((entry) => entry.status === 'Contacted');
  }

  /** Whether the current status is an outcome (below the stepper) */
  protected isOutcomeStatus(): boolean {
    return !!this.form.status && (LEAD_OUTCOME_STATUSES as readonly string[]).includes(this.form.status);
  }

  /** Click handler for a stepper step */
  protected onStepClick(step: StepperStep): void {
    if (step.state === 'current') return;

    // Locked step: navigate to the tab that helps satisfy unlock requirements
    if (step.state === 'locked') {
      this.onLockedStepClick(step);
      return;
    }

    // Backward movement: clicking a completed step to regress
    if (step.state === 'completed') {
      this.backwardConfirmTarget.set(step);
      this.backwardConfirmPending.set(true);
      return;
    }

    const blockedReasons = this.transitionBlockedReasons(step.status);
    if (blockedReasons.length) {
      this.raiseToast('error', blockedReasons[0]);
      this.onLockedStepClick(step);
      return;
    }

    this.form.status = step.status;
  }

  /** Navigate to the relevant tab when a locked step is clicked */
  private onLockedStepClick(step: StepperStep): void {
    if (step.status === 'Contacted') {
      this.setActiveTab('activity');
    } else if (step.status === 'Qualified') {
      const current = this.form.status as LeadStatus;
      if (current === 'Nurture' && !this.hasRecentReengagementActivity()) {
        this.setActiveTab('activity');
        return;
      }
      this.setActiveTab('qualification');
    }
  }

  /** Confirm backward movement */
  protected confirmBackward(): void {
    const target = this.backwardConfirmTarget();
    if (target) {
      const blockedReasons = this.transitionBlockedReasons(target.status);
      if (blockedReasons.length) {
        this.raiseToast('error', blockedReasons[0]);
        this.onLockedStepClick(target);
      } else {
        this.form.status = target.status;
      }
    }
    this.backwardConfirmPending.set(false);
    this.backwardConfirmTarget.set(null);
  }

  /** Cancel backward movement */
  protected cancelBackward(): void {
    this.backwardConfirmPending.set(false);
    this.backwardConfirmTarget.set(null);
  }

  /** Click handler for outcome exit buttons */
  protected onOutcomeClick(status: LeadStatus): void {
    if (status === 'Converted') {
      this.convertFormActive.set(true);
    } else if (status === 'Lost' || status === 'Disqualified') {
      this.closureReason = '';
      this.closureCompetitor = '';
      this.closureNotes = '';
      this.closureFormStatus.set(status);
      this.closureFormActive.set(true);
    }
  }

  /** Confirm inline convert → navigate to the convert page */
  protected confirmConvert(): void {
    this.convertFormActive.set(false);
    this.onConvertLead();
  }

  /** Cancel the inline convert prompt */
  protected cancelConvert(): void {
    this.convertFormActive.set(false);
  }

  /** Confirm the closure: apply status + populate form fields, then trigger save */
  protected confirmClosure(): void {
    const status = this.closureFormStatus();
    if (!status) return;

    if (status === 'Lost') {
      if (!this.closureReason?.trim()) return;
      this.form.status = status;
      this.form.lossReason = this.closureReason;
      this.form.lossCompetitor = this.closureCompetitor;
      this.form.lossNotes = this.closureNotes;
    } else {
      if (!this.closureReason?.trim()) return;
      this.form.status = status;
      this.form.disqualifiedReason = this.closureReason;
    }

    // Trigger save — closure form closes only on success (inside performSave)
    this.onSave();
  }

  /** Cancel the inline closure form without changing status */
  protected cancelClosure(): void {
    this.closureFormActive.set(false);
    this.closureFormStatus.set(null);
  }

  /** Whether a specific outcome action is available */
  protected isOutcomeAvailable(status: LeadStatus): boolean {
    if (status === 'Converted') return this.canConvertLead();
    if (status === 'Lost' || status === 'Disqualified') {
      const current = this.form.status as LeadStatus;
      return current !== 'Converted'; // Can exit to lost/disqualified from any non-converted status
    }
    return false;
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
    return id ? `/app/deals/${id}/edit` : null;
  }

  protected onConvertLead(): void {
    if (!this.editingId || !this.canConvertLead()) {
      return;
    }
    this.router.navigate(['/app/leads', this.editingId, 'convert']);
  }

  protected canRecycleLead(): boolean {
    return this.isEditMode() && (this.form.status === 'Lost' || this.form.status === 'Disqualified');
  }

  protected recycleToNurture(): void {
    if (!this.editingId || !this.canRecycleLead()) {
      return;
    }

    this.leadData.recycleToNurture(this.editingId).subscribe({
      next: () => {
        this.raiseToast('success', 'Lead recycled to nurture.');
        this.form.status = 'Nurture';
        this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
        this.reloadLeadDetails(this.editingId!);
      },
      error: () => {
        this.raiseToast('error', 'Unable to recycle lead to nurture.');
      }
    });
  }

  protected onSave(): boolean {
    if (!this.form.firstName || !this.form.lastName) {
      return false;
    }

    if (!this.validateOverviewFields()) {
      return false;
    }

    const outcomeError = this.validateOutcome();
    if (outcomeError) {
      this.raiseToast('error', outcomeError);
      return false;
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

    this.statusApiError.set(null);
    this.saving.set(true);
    const isEdit = !!this.editingId;
    this.submitWithDuplicateGuard(payload, isEdit);
    return true;
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

  protected primarySaveLabel(): string {
    return this.isEditMode() ? 'Update Lead' : 'Create Lead';
  }

  protected draftButtonLabel(): string {
    const count = this.recentDrafts().length;
    return count > 0 ? `Save Draft (${count})` : 'Save Draft';
  }

  protected draftSplitButtonItems(): MenuItem[] {
    const items: MenuItem[] = [];

    const drafts = this.recentDrafts();
    items.push({
      label: 'Saved drafts',
      disabled: true,
      styleClass: 'crm-draft-menu-heading'
    });

    if (!drafts.length) {
      items.push({
        label: 'No saved drafts yet',
        disabled: true,
        styleClass: 'crm-draft-menu-empty'
      });
      return items;
    }

    for (const draft of drafts) {
      items.push({
        label: this.buildDraftMenuMarkup(draft),
        escape: false,
        command: () => this.openDraftFromSummary(draft)
      });
    }

    items.push({ separator: true });
    items.push({
      label: 'View all drafts',
      icon: 'pi pi-list',
      command: () => this.openDraftLibrary()
    });

    return items;
  }

  protected openDraftFromSummary(draft: FormDraftSummary): void {
    if (this.hasDraftFormChanges()) {
      this.pendingDraftToOpen = draft;
      this.draftOpenConfirmVisible.set(true);
      return;
    }

    this.loadDraft(draft.id);
  }

  protected confirmOpenDraft(): void {
    const draft = this.pendingDraftToOpen;
    this.pendingDraftToOpen = null;
    this.draftOpenConfirmVisible.set(false);
    if (draft) {
      this.loadDraft(draft.id);
    }
  }

  protected cancelOpenDraft(): void {
    this.pendingDraftToOpen = null;
    this.draftOpenConfirmVisible.set(false);
  }

  protected saveDraft(): void {
    this.draftSaving.set(true);
    this.formDraftService.save({
      id: this.activeDraftId(),
      entityType: 'lead',
      title: this.buildDraftTitle(),
      subtitle: this.buildDraftSubtitle(),
      payloadJson: this.serializeDraftPayload()
    }).subscribe({
      next: (draft) => {
        this.draftSaving.set(false);
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft saved at ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
        this.captureFormSnapshot();
        this.loadRecentDrafts();
        if (this.draftLibraryVisible()) {
          this.loadDraftLibrary();
        }
        this.finalizeLeaveAfterDraftSave(true);
      },
      error: () => {
        this.draftSaving.set(false);
        this.draftStatusMessage.set('Unable to save draft.');
        this.raiseToast('error', 'Unable to save draft.');
        this.finalizeLeaveAfterDraftSave(false);
      }
    });
  }

  protected stayOnForm(): void {
    this.resolvePendingLeave(false);
  }

  protected leaveWithoutSaving(): void {
    this.resolvePendingLeave(true);
  }

  protected saveDraftAndLeave(): void {
    this.leaveAfterDraftSave = true;
    this.saveDraft();
  }

  protected submitAndLeave(): void {
    this.leaveAfterSave = true;
    if (!this.onSave()) {
      this.leaveAfterSave = false;
      this.resolvePendingLeave(false);
    }
  }

  protected openDraftLibrary(): void {
    this.draftLibraryVisible.set(true);
    this.loadDraftLibrary();
  }

  protected closeDraftLibrary(): void {
    this.draftLibraryVisible.set(false);
  }

  protected dismissDraftPrompt(): void {
    this.draftPromptVisible.set(false);
  }

  protected loadDraftFromPrompt(draft: FormDraftSummary): void {
    this.draftPromptVisible.set(false);
    this.loadDraft(draft.id);
  }

  protected discardDraft(draft: FormDraftSummary, event?: Event): void {
    event?.stopPropagation();
    this.formDraftService.discard(draft.id).subscribe({
      next: () => {
        if (this.activeDraftId() === draft.id) {
          this.activeDraftId.set(null);
          this.draftModeActive.set(false);
          this.draftStatusMessage.set(null);
        }
        this.loadRecentDrafts();
        this.loadDraftLibrary();
      },
      error: () => this.raiseToast('error', 'Unable to discard draft.')
    });
  }

  protected formatDraftTimestamp(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(value));
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
        const activeDraftId = this.activeDraftId();
        this.saving.set(false);
        if (activeDraftId) {
          this.formDraftService.complete(activeDraftId).subscribe({ next: () => {}, error: () => {} });
          this.activeDraftId.set(null);
          this.draftModeActive.set(false);
        }
        if (!isEdit && created) {
          this.editingId = created.id;
          if (!this.leaveAfterSave) {
            this.router.navigate(['/app/leads', created.id, 'edit'], {
              state: { lead: created, defaultTab: 'qualification' }
            });
          }
        }
        if (isEdit) {
          // Stay on page and refresh data so user can perform follow-up actions (e.g., convert)
          if (!this.leaveAfterSave) {
            this.reloadLeadDetails(this.editingId!);
          }
        }
        this.statusApiError.set(null);
        // Close inline closure form on successful save
        if (this.closureFormActive()) {
          this.closureFormActive.set(false);
          this.closureFormStatus.set(null);
        }
        const message = isEdit ? 'Lead updated.' : 'Lead created. Complete qualification now or later.';
        this.raiseToast('success', message);
        this.updateQualificationFeedback();
        this.loadRecentDrafts();
        this.captureFormSnapshot();
        this.finalizeLeaveAfterSave(true);
      },
      error: (err) => {
        this.saving.set(false);
        const fallback = this.editingId ? 'Unable to update lead.' : 'Unable to create lead.';
        const parsed = this.extractApiError(err, fallback);
        this.statusApiError.set(this.mapLeadStatusErrorToHint(parsed.code, parsed.message));
        this.raiseToast('error', parsed.message);
        this.finalizeLeaveAfterSave(false);
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
  }

  private loadRecentDrafts(): void {
    this.formDraftService.list('lead', { limit: 5, page: 1, pageSize: 5 }).subscribe({
      next: (result) => {
        const items = result.items;
        this.recentDrafts.set(items);
        if (!this.hasShownDraftPrompt && !this.isEditMode() && !this.draftModeActive() && items.length) {
          this.hasShownDraftPrompt = true;
          this.draftPromptVisible.set(true);
        }
      },
      error: () => this.recentDrafts.set([])
    });
  }

  private loadDraftLibrary(): void {
    this.draftLibraryLoading.set(true);
    this.formDraftService.list('lead', { page: 1, pageSize: 50 }).subscribe({
      next: (result) => {
        this.draftLibraryLoading.set(false);
        this.draftLibraryItems.set(result.items);
      },
      error: () => {
        this.draftLibraryLoading.set(false);
        this.draftLibraryItems.set([]);
      }
    });
  }

  private loadDraft(id: string): void {
    this.formDraftService.get(id).subscribe({
      next: (draft) => {
        const payload = this.parseDraftPayload(draft);
        this.form = {
          ...this.createEmptyForm(),
          ...payload
        };
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
        this.draftLibraryVisible.set(false);
        this.updateQualificationFeedback();
        this.updateFollowUpGuidance();
        this.captureFormSnapshot();
      },
      error: () => this.raiseToast('error', 'Unable to open draft.')
    });
  }

  private parseDraftPayload(draft: FormDraftDetail): Partial<SaveLeadRequest & { autoScore: boolean }> {
    try {
      return JSON.parse(draft.payloadJson) as Partial<SaveLeadRequest & { autoScore: boolean }>;
    } catch {
      return {};
    }
  }

  private serializeDraftPayload(): string {
    return JSON.stringify(this.form);
  }

  private hasDraftFormChanges(): boolean {
    if (this.formSnapshot) {
      return this.createFormSnapshot() !== this.formSnapshot;
    }

    const payload = this.serializeDraftPayload();
    return payload !== JSON.stringify(this.createEmptyForm());
  }

  private buildDraftTitle(): string {
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    return fullName || 'Untitled lead draft';
  }

  private buildDraftSubtitle(): string | null {
    return this.form.companyName?.trim() || null;
  }

  private buildDraftMenuMarkup(draft: FormDraftSummary): string {
    const title = this.escapeDraftText(draft.title);
    const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No company');
    const timestamp = this.escapeDraftText(this.formatDraftTimestamp(draft.updatedAtUtc));
    return `<div class="crm-draft-menuitem"><span class="crm-draft-menuitem__title">${title}</span><span class="crm-draft-menuitem__meta">${subtitle} · ${timestamp}</span></div>`;
  }

  private escapeDraftText(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  private extractApiError(error: unknown, fallback: string): { message: string; code: string | null } {
    const httpError = error as HttpErrorResponse | null;
    const payload = httpError?.error;
    const code = (payload as { code?: string } | null | undefined)?.code;
    if (typeof payload === 'string' && payload.trim().length > 0) {
      return { message: payload.trim(), code: null };
    }

    const errors = (payload as { errors?: Record<string, string[] | string> } | null | undefined)?.errors;
    if (errors && typeof errors === 'object') {
      const firstKey = Object.keys(errors)[0];
      const value = firstKey ? errors[firstKey] : null;
      if (Array.isArray(value) && value[0]) {
        return { message: value[0], code: code ?? null };
      }
      if (typeof value === 'string' && value.trim().length > 0) {
        return { message: value.trim(), code: code ?? null };
      }
    }

    const message = (payload as { message?: string } | null | undefined)?.message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return { message: message.trim(), code: code ?? null };
    }

    const title = (payload as { title?: string } | null | undefined)?.title;
    if (typeof title === 'string' && title.trim().length > 0 && title !== 'One or more validation errors occurred.') {
      return { message: title.trim(), code: code ?? null };
    }

    return { message: fallback, code: code ?? null };
  }

  private extractApiErrorMessage(error: unknown, fallback: string): string {
    return this.extractApiError(error, fallback).message;
  }

  private mapLeadStatusErrorToHint(code: string | null, fallbackMessage: string): string | null {
    switch (code) {
      case 'LEAD_STATUS_REQUIRES_ACTIVITY':
        return 'Log a completed call, email, or meeting before setting the lead to Contacted.';
      case 'LEAD_STATUS_REQUIRES_DISCOVERY_MEETING':
        return 'Complete or schedule a discovery meeting before setting the lead to Qualified.';
      case 'LEAD_STATUS_REQUIRES_QUALIFICATION_FACTORS':
        return `Select at least ${this.minimumRequiredQualificationFactors()} qualification factors before setting the lead to Qualified.`;
      case 'LEAD_STATUS_REQUIRES_QUALIFICATION_NOTES':
        return 'Add qualification notes before setting the lead to Qualified.';
      case 'LEAD_STATUS_REQUIRES_EVIDENCE_COVERAGE':
        return `Add evidence until coverage reaches at least ${this.minimumEvidenceCoveragePercent()}% before setting the lead to Qualified.`;
      case 'LEAD_STATUS_REQUIRES_NURTURE_FOLLOWUP':
        return 'Add a nurture follow-up date before setting the lead to Nurture.';
      case 'LEAD_STATUS_REQUIRES_OUTCOME_REASON':
        return 'Add the required reason/details before moving to this lead outcome status.';
      case 'LEAD_STATUS_INVALID_TRANSITION':
        return fallbackMessage;
      default:
        return null;
    }
  }

  private prefillFromLead(lead: Lead) {
    const [firstName, ...rest] = lead.name.split(' ');
    this.leadNumber.set(lead.leadNumber ?? null);
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
      buyerType: lead.buyerType ?? '',
      motivationUrgency: lead.motivationUrgency ?? '',
      financingReadiness: lead.financingReadiness ?? '',
      preApprovalStatus: lead.preApprovalStatus ?? '',
      preferredArea: lead.preferredArea ?? '',
      preferredPropertyType: lead.preferredPropertyType ?? '',
      budgetBand: lead.budgetBand ?? '',
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
      icpFitEvidence: lead.icpFitEvidence || 'No evidence yet',
      customQualificationFactors: (lead.customQualificationFactors ?? []).map((factor) => ({
        key: factor.key,
        value: factor.value ?? '',
        evidence: factor.evidence ?? 'No evidence yet'
      }))
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
    this.conversationScore.set(lead.conversationScore ?? null);
    this.conversationScoreLabel.set(lead.conversationScoreLabel ?? null);
    this.conversationScoreReasons.set(lead.conversationScoreReasons ?? []);
    this.conversationScoreUpdatedAtUtc.set(lead.conversationScoreUpdatedAtUtc ?? null);
    this.conversationSignalAvailable.set(lead.conversationSignalAvailable === true);
    this.conversationAiDimensionScore.set(lead.conversationAiDimensionScore ?? null);
    this.conversationAiToneLabel.set(lead.conversationAiToneLabel ?? null);
    this.conversationAiSentiment.set(lead.conversationAiSentiment ?? null);
    this.conversationAiBuyingReadiness.set(lead.conversationAiBuyingReadiness ?? null);
    this.conversationAiSemanticIntent.set(lead.conversationAiSemanticIntent ?? null);
    this.conversationAiToneJustification.set(lead.conversationAiToneJustification ?? null);
    this.conversionReadiness.set(lead.conversionReadiness ?? null);
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
    this.updateFollowUpGuidance();
    // Capture form snapshot after fully populating form for uncommitted changes detection
    this.captureFormSnapshot();
  }

  private loadStatusHistory(leadId: string) {
    this.leadData.getStatusHistory(leadId).subscribe({
      next: (history) => this.statusHistory.set(history),
      error: () => this.statusHistory.set([])
    });
  }

  private loadRecentLeadActivities(leadId: string) {
    this.recentLeadActivitiesLoading.set(true);
    this.transferredActivityCount.set(0);
    this.transferredLastActivity.set(null);
    this.transferredActivityEntityType.set(null);
    this.activityData
      .search({
        page: 1,
        pageSize: 6,
        relatedEntityType: 'Lead',
        relatedEntityId: leadId
      })
      .subscribe({
        next: (res) => {
          const items = (res.items ?? []).slice(0, 6);
          this.recentLeadActivities.set(items);
          if (items.length > 0) {
            this.recentLeadActivitiesLoading.set(false);
            return;
          }

          if (this.form.status === 'Converted' && (this.linkedOpportunityId() || this.linkedAccountId())) {
            this.loadTransferredActivitiesSummary();
            return;
          }

          this.recentLeadActivitiesLoading.set(false);
        },
        error: () => {
          this.recentLeadActivities.set([]);
          this.recentLeadActivitiesLoading.set(false);
        }
      });
  }

  private loadLeadEmails(leadId: string) {
    this.leadEmailsLoading.set(true);
    this.leadData.getLeadEmails(leadId).subscribe({
      next: (res) => {
        this.leadEmails.set(res.items ?? []);
        this.leadEmailsTotalCount.set(res.total ?? 0);
        this.leadEmailsLoading.set(false);
      },
      error: () => {
        this.leadEmails.set([]);
        this.leadEmailsLoading.set(false);
      }
    });
  }

  protected emailEngagementStats() {
    const emails = this.leadEmails();
    if (!emails.length) return null;
    const sent = emails.filter(e => e.status !== 'Failed');
    const opened = emails.filter(e => e.status === 'Opened' || e.status === 'Clicked');
    const sorted = [...emails].sort((a, b) =>
      new Date(b.sentAtUtc || b.createdAtUtc).getTime() - new Date(a.sentAtUtc || a.createdAtUtc).getTime()
    );
    return {
      total: this.leadEmailsTotalCount(),
      displayed: emails.length,
      openRate: sent.length ? Math.round((opened.length / sent.length) * 100) : 0,
      lastEmailDate: sorted[0]?.sentAtUtc || sorted[0]?.createdAtUtc || null
    };
  }

  protected toggleEmailsExpanded() {
    this.leadEmailsExpanded.update(v => !v);
  }

  protected trackEmailById(_index: number, email: EmailListItem): string {
    return email.id;
  }

  protected emailDirection(email: EmailListItem): 'outbound' | 'inbound' {
    const currentEmail = readUserEmail();
    if (!currentEmail) return 'outbound';
    return email.toEmail?.toLowerCase() === currentEmail.toLowerCase() ? 'inbound' : 'outbound';
  }

  protected onGenerateConversationSummary() {
    if (!this.editingId || this.conversationAiSummaryLoading()) return;
    this.conversationAiSummaryLoading.set(true);
    this.leadData.generateConversationSummary(this.editingId).subscribe({
      next: (result) => {
        this.conversationAiSummary.set(result);
        this.conversationAiSummaryLoading.set(false);
        this.raiseToast('success', 'AI conversation summary generated.');
      },
      error: (err) => {
        this.conversationAiSummaryLoading.set(false);
        this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to generate conversation summary.'));
      }
    });
  }

  protected sentimentIcon(sentiment: string): string {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'pi-thumbs-up';
      case 'cautious': return 'pi-exclamation-triangle';
      case 'negative': return 'pi-thumbs-down';
      default: return 'pi-minus';
    }
  }

  protected sentimentClass(sentiment: string): string {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'sentiment--positive';
      case 'cautious': return 'sentiment--cautious';
      case 'negative': return 'sentiment--negative';
      default: return 'sentiment--neutral';
    }
  }

  private loadTransferredActivitiesSummary(): void {
    const opportunityId = this.linkedOpportunityId();
    const accountId = this.linkedAccountId();
    const targetType: 'Opportunity' | 'Account' | null = opportunityId ? 'Opportunity' : (accountId ? 'Account' : null);
    const targetId = opportunityId ?? accountId;

    if (!targetType || !targetId) {
      this.recentLeadActivitiesLoading.set(false);
      return;
    }

    this.activityData.search({
      page: 1,
      pageSize: 10,
      relatedEntityType: targetType,
      relatedEntityId: targetId
    }).subscribe({
      next: (res) => {
        const items = res.items ?? [];
        this.transferredActivityCount.set(res.total ?? items.length);
        this.transferredLastActivity.set(items[0] ?? null);
        this.transferredActivityEntityType.set(targetType);
        this.recentLeadActivitiesLoading.set(false);
      },
      error: () => {
        this.transferredActivityCount.set(0);
        this.transferredLastActivity.set(null);
        this.transferredActivityEntityType.set(null);
        this.recentLeadActivitiesLoading.set(false);
      }
    });
  }

  private reloadLeadDetails(leadId: string): void {
    this.leadData.get(leadId).subscribe({
      next: (lead) => {
        this.prefillFromLead(lead);
        this.loadStatusHistory(leadId);
        this.loadRecentLeadActivities(leadId);
        this.loadSupportingDocuments(leadId);
      }
    });
  }

  protected isFirstTouchPending(): boolean {
    return !!this.firstTouchDueAtUtc() && !this.firstTouchedAtUtc();
  }

  protected nextLeadActionDueDate(): Date | null {
    if (this.form.status === 'Nurture' && this.form.nurtureFollowUpAtUtc instanceof Date) {
      return this.form.nurtureFollowUpAtUtc;
    }

    const firstTouchDue = this.firstTouchDueAtUtc();
    if (firstTouchDue && !this.firstTouchedAtUtc()) {
      return new Date(firstTouchDue);
    }

    return null;
  }

  protected nextLeadActionDueLabel(): string {
    if (this.form.status === 'Nurture' && this.form.nurtureFollowUpAtUtc) {
      return 'Nurture follow-up date';
    }

    if (this.isFirstTouchPending()) {
      return 'First touch due';
    }

    return 'No scheduled lead follow-up';
  }

  protected nextLeadActionChannel(): string {
    const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
    const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';

    if (this.form.status === 'Nurture' || readiness === 'not planning to spend') {
      return 'Email';
    }

    if (this.isFirstTouchPending() || timeline.includes('confirmed')) {
      return 'Call';
    }

    return 'Use the related activity type';
  }

  protected nextLeadActionButtonLabel(): string {
    if ((this.form.status as LeadStatus) === 'Nurture' && !this.hasRecentReengagementActivity()) {
      return 'Log re-engagement';
    }

    if ((this.form.status as LeadStatus) === 'New' && !this.hasAnyCompletedLeadActivityEvidence()) {
      return 'Log first activity';
    }

    return 'Log activity';
  }

  protected lastLeadActivitySummary(): string {
    const latest = this.recentLeadActivities()[0];
    if (!latest) {
      if ((this.form.status as LeadStatus) === 'Nurture' && !this.hasRecentReengagementActivity()) {
        return 'No re-engagement activity has been recorded yet.';
      }

      return 'No activity has been recorded yet.';
    }

    const owner = latest.ownerName?.trim();
    const dateLabel = this.activityTimelineDateLabel(latest);
    const at = dateLabel ? new Date(dateLabel).toLocaleString() : null;
    const parts: string[] = [latest.type];
    if (owner) parts.push(owner);
    if (at) parts.push(at);
    return parts.join(' • ');
  }

  protected activityTypeIcon(type: Activity['type']): string {
    switch (type) {
      case 'Meeting':
        return 'pi pi-users';
      case 'Call':
        return 'pi pi-phone';
      case 'Email':
        return 'pi pi-envelope';
      case 'Task':
        return 'pi pi-check-square';
      case 'Note':
      default:
        return 'pi pi-file-edit';
    }
  }

  protected activityTimelineDateLabel(item: Activity): string | undefined {
    return item.completedDateUtc ?? item.dueDateUtc ?? item.createdAtUtc;
  }

  private activityEffectiveDate(item: Activity): Date | null {
    const raw = item.completedDateUtc ?? item.createdAtUtc ?? item.dueDateUtc;
    if (!raw) {
      return null;
    }

    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private isCompletedActivityEvidence(item: Activity): boolean {
    return item.status === 'Completed' || !!item.completedDateUtc;
  }

  private latestStatusChangedAt(status: LeadStatus): Date | null {
    const matching = this.statusHistory()
      .filter((entry) => entry.status === status && !!entry.changedAtUtc)
      .map((entry) => new Date(entry.changedAtUtc.endsWith('Z') ? entry.changedAtUtc : `${entry.changedAtUtc}Z`))
      .filter((value) => !Number.isNaN(value.getTime()))
      .sort((a, b) => b.getTime() - a.getTime());

    return matching[0] ?? null;
  }

  private hasAnyCompletedLeadActivityEvidence(): boolean {
    return this.recentLeadActivities().some((item) => this.isCompletedActivityEvidence(item));
  }

  private hasCompletedActivitySince(anchor: Date | null): boolean {
    return this.recentLeadActivities().some((item) => {
      if (!this.isCompletedActivityEvidence(item)) {
        return false;
      }

      const effective = this.activityEffectiveDate(item);
      if (!effective) {
        return false;
      }

      return !anchor || effective.getTime() >= anchor.getTime();
    });
  }

  private hasRecentReengagementActivity(): boolean {
    const nurtureAnchor = this.latestStatusChangedAt('Nurture');
    return this.hasCompletedActivitySince(nurtureAnchor);
  }

  private hasRecentContactProgressActivity(): boolean {
    const contactedAnchor = this.latestStatusChangedAt('Contacted');
    return this.hasCompletedActivitySince(contactedAnchor);
  }

  protected openActivityRecord(activityId: string): void {
    void this.router.navigate(['/app/activities', activityId, 'edit']);
  }

  protected onStatusSelectionChange(nextStatus: LeadStatus): void {
    if (nextStatus === this.form.status) {
      return;
    }

    const blockedReasons = this.transitionBlockedReasons(nextStatus);
    if (blockedReasons.length) {
      this.raiseToast('error', blockedReasons[0]);
      if (nextStatus === 'Contacted') {
        this.setActiveTab('activity');
      } else if (nextStatus === 'Qualified') {
        this.setActiveTab((this.form.status as LeadStatus) === 'Nurture' && !this.hasRecentReengagementActivity() ? 'activity' : 'qualification');
      }
      return;
    }

    if (nextStatus === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
      this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
    }

    this.form.status = nextStatus;
  }

  private transitionBlockedReasons(target: LeadStatus): string[] {
    const current = this.form.status as LeadStatus;
    const hasFirstTouch = !!this.firstTouchedAtUtc();
    const qualFactors = this.countQualificationFactors();
    const hasQualNotes = !!this.form.qualifiedNotes?.trim();
    const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();

    if (target === current) {
      return [];
    }

    if (target === 'New') {
      return [];
    }

    if (target === 'Nurture') {
      if (current === 'Contacted' && !this.hasAnyCompletedLeadActivityEvidence()) {
        return ['Log a completed activity before moving a contacted lead into nurture.'];
      }
      return [];
    }

    if (target === 'Contacted') {
      if (current === 'Nurture' && !this.hasRecentReengagementActivity()) {
        return ['Log a recent re-engagement activity before resuming this lead to Contacted.'];
      }
      if (!hasFirstTouch && !this.hasAnyCompletedLeadActivityEvidence()) {
        return ['Log a completed activity before moving this lead to Contacted.'];
      }
      return [];
    }

    if (target === 'Qualified') {
      const reasons: string[] = [];
      if (current === 'Nurture') {
        if (!this.hasRecentReengagementActivity()) {
          reasons.push('Log a recent re-engagement activity before moving this lead to Qualified.');
        }
      } else if (current === 'Contacted') {
        if (!this.hasRecentContactProgressActivity()) {
          reasons.push('Log a recent completed activity before moving this lead to Qualified.');
        }
      } else if (!hasFirstTouch && !this.hasAnyCompletedLeadActivityEvidence()) {
        reasons.push('Log a completed activity before moving this lead to Qualified.');
      }

      const minimum = this.minimumRequiredQualificationFactors();
      if (qualFactors < minimum) {
        reasons.push(`Complete ${minimum - qualFactors} more qualification factor${minimum - qualFactors > 1 ? 's' : ''}.`);
      }
      if (!hasQualNotes) {
        reasons.push('Add qualification notes.');
      }
      if (!meetsEvidence) {
        reasons.push('Add evidence to meet the coverage threshold.');
      }
      return reasons;
    }

    return [];
  }

  private isStatusSelectionDisabled(status: LeadStatus): boolean {
    const current = this.form.status as LeadStatus;
    const isConverted = current === 'Converted';

    if (status === current) {
      return false;
    }

    if (status === 'Converted') {
      return !isConverted;
    }

    if (status === 'New' && current === 'Contacted') {
      return true;
    }

    return this.transitionBlockedReasons(status).length > 0;
  }

  protected hasTransferredActivitySummary(): boolean {
    return this.transferredActivityCount() > 0;
  }

  protected transferredActivitySummaryLabel(): string {
    const count = this.transferredActivityCount();
    const entityType = this.transferredActivityEntityType();
    if (!count || !entityType) {
      return 'No transferred activities found.';
    }

    const target = entityType === 'Opportunity' ? 'opportunity' : 'account';
    return `${count} ${count === 1 ? 'activity was' : 'activities were'} transferred to the converted ${target}.`;
  }

  protected openConvertedActivityTimeline(): void {
    const opportunityId = this.linkedOpportunityId();
    if (opportunityId) {
      void this.router.navigate(['/app/activities'], {
        queryParams: { relatedEntityType: 'Opportunity', relatedEntityId: opportunityId }
      });
      return;
    }

    const accountId = this.linkedAccountId();
    if (accountId) {
      void this.router.navigate(['/app/activities'], {
        queryParams: { relatedEntityType: 'Account', relatedEntityId: accountId }
      });
    }
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
      buyerType: '',
      motivationUrgency: '',
      financingReadiness: '',
      preApprovalStatus: '',
      preferredArea: '',
      preferredPropertyType: '',
      budgetBand: '',
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
      icpFitEvidence: 'No evidence yet',
      customQualificationFactors: []
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

  private loadLeadDispositionPolicy() {
    this.workspaceSettings.getSettings().subscribe({
      next: (settings) => {
        const policy = LeadFormPage.normalizeLeadDispositionPolicy(settings.leadDispositionPolicy);
        this.disqualificationReasonOptions.set(policy.disqualificationReasons.map((value) => ({ label: value, value })));
        this.lossReasonOptions.set(policy.lossReasons.map((value) => ({ label: value, value })));
        this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
        this.ensureDispositionSelectionsRemainVisible();
      },
      error: () => {
        this.disqualificationReasonOptions.set([]);
        this.lossReasonOptions.set([]);
        this.applyVerticalPresetConfiguration(null);
        this.ensureDispositionSelectionsRemainVisible();
      }
    });
  }

  private ensureDispositionSelectionsRemainVisible() {
    const disqualification = (this.form.disqualifiedReason ?? '').trim();
    if (disqualification && !this.disqualificationReasonOptions().some((item) => item.value.toLowerCase() === disqualification.toLowerCase())) {
      this.disqualificationReasonOptions.update((items) => [...items, { label: disqualification, value: disqualification }]);
    }

    const loss = (this.form.lossReason ?? '').trim();
    if (loss && !this.lossReasonOptions().some((item) => item.value.toLowerCase() === loss.toLowerCase())) {
      this.lossReasonOptions.update((items) => [...items, { label: loss, value: loss }]);
    }
  }

  private loadLeadDataWeights() {
    this.workspaceSettings.getSettings().subscribe({
      next: (settings) => {
        this.qualificationPolicyConfig.set(settings.qualificationPolicy ?? null);
        this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
        this.leadDataWeights = settings.qualificationPolicy?.leadDataWeights ?? [];
        if (this.form.autoScore) {
          this.form.score = this.computeAutoScore();
        }
      },
      error: () => {
        this.qualificationPolicyConfig.set(null);
        this.leadDataWeights = [];
      }
    });
  }

  private loadSupportingDocumentPolicy() {
    this.workspaceSettings.getSettings().subscribe({
      next: (settings) => {
        this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
        this.supportingDocumentPolicy.set(settings.supportingDocumentPolicy ?? this.defaultSupportingDocumentPolicy());
      },
      error: () => {
        this.applyVerticalPresetConfiguration(null);
        this.supportingDocumentPolicy.set(this.defaultSupportingDocumentPolicy());
      }
    });
  }

  protected isBrokeragePreset(): boolean {
    return (this.verticalPresetConfiguration()?.presetId ?? 'CoreCRM') === 'RealEstateBrokerage';
  }

  protected qualificationSectionTitle(): string {
    return this.isBrokeragePreset() ? 'Buyer Readiness Summary' : 'Qualification Summary';
  }

  protected qualificationGuidanceText(): string {
    return this.verticalPresetConfiguration()?.vocabulary?.qualificationGuidance
      ?? this.qualificationStatusHint();
  }

  private applyVerticalPresetConfiguration(config: VerticalPresetConfiguration | null) {
    this.verticalPresetConfiguration.set(config);
    const catalog = config?.brokerageLeadProfileCatalog;
    this.buyerTypeOptions.set(this.mapCatalogOptions(catalog?.buyerTypes));
    this.motivationUrgencyOptions.set(this.mapCatalogOptions(catalog?.motivationUrgencies));
    this.financingReadinessOptions.set(this.mapCatalogOptions(catalog?.financingReadinessOptions));
    this.preApprovalStatusOptions.set(this.mapCatalogOptions(catalog?.preApprovalStatuses));
    this.preferredAreaOptions.set(this.mapCatalogOptions(catalog?.preferredAreas));
    this.propertyTypeOptions.set(this.mapCatalogOptions(catalog?.propertyTypes));
    this.budgetBandOptions.set(this.mapCatalogOptions(catalog?.budgetBands));
    this.ensureBrokerageSelectionsRemainVisible();
  }

  private mapCatalogOptions(values: readonly string[] | null | undefined): Array<{ label: string; value: string }> {
    return (values ?? [])
      .map((value) => (value ?? '').trim())
      .filter((value, index, all) => value.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === value.toLowerCase()) === index)
      .map((value) => ({ label: value, value }));
  }

  private ensureBrokerageSelectionsRemainVisible() {
    this.ensureOptionIncludesSelection(this.buyerTypeOptions, this.form.buyerType);
    this.ensureOptionIncludesSelection(this.motivationUrgencyOptions, this.form.motivationUrgency);
    this.ensureOptionIncludesSelection(this.financingReadinessOptions, this.form.financingReadiness);
    this.ensureOptionIncludesSelection(this.preApprovalStatusOptions, this.form.preApprovalStatus);
    this.ensureOptionIncludesSelection(this.preferredAreaOptions, this.form.preferredArea);
    this.ensureOptionIncludesSelection(this.propertyTypeOptions, this.form.preferredPropertyType);
    this.ensureOptionIncludesSelection(this.budgetBandOptions, this.form.budgetBand);
  }

  private ensureOptionIncludesSelection(
    signalOptions: WritableSignal<Array<{ label: string; value: string }>>,
    selectedValue: string | null | undefined
  ) {
    const value = (selectedValue ?? '').trim();
    if (!value) {
      return;
    }

    const exists = signalOptions().some((item) => item.value.toLowerCase() === value.toLowerCase());
    if (!exists) {
      signalOptions.update((items) => [...items, { label: value, value }]);
    }
  }

  private loadSupportingDocuments(leadId: string) {
    this.attachmentsLoading.set(true);
    this.attachmentData.list('Lead', leadId).subscribe({
      next: (items) => {
        this.attachments.set(items);
        this.attachmentsLoading.set(false);
      },
      error: (err) => {
        this.attachments.set([]);
        this.attachmentsLoading.set(false);
        const httpError = err as HttpErrorResponse | null;
        if (httpError?.status === 404 || httpError?.status === 400) {
          return;
        }
        this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to load supporting documents.'));
      }
    });
  }

  protected onAttachmentUpload(event: { files: File[] }) {
    if (!this.editingId || !event.files?.length || this.attachmentUploading()) {
      return;
    }

    if (this.isSupportingDocumentLimitReached()) {
      this.raiseToast('error', `Supporting document limit reached (${this.supportingDocumentMaxCount()} per record).`);
      return;
    }

    const file = event.files[0];
    const maxSizeBytes = this.supportingDocumentMaxFileSizeMb() * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.attachmentUploadError.set(`File exceeds ${this.supportingDocumentMaxFileSizeMb()} MB limit.`);
      this.raiseToast('error', `File exceeds ${this.supportingDocumentMaxFileSizeMb()} MB limit.`);
      return;
    }

    const allowedExts = this.supportingDocumentPolicy()?.allowedExtensions ?? this.defaultSupportingDocumentPolicy().allowedExtensions;
    const fileExt = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    if (!allowedExts.includes(fileExt)) {
      const message = `File type "${fileExt}" is not allowed. Accepted: ${allowedExts.join(', ')}`;
      this.attachmentUploadError.set(message);
      this.raiseToast('error', message);
      return;
    }

    this.attachmentUploadError.set(null);
    this.attachmentUploading.set(true);
    this.attachmentData.upload(file, 'Lead', this.editingId).subscribe({
      next: (attachment) => {
        this.attachmentUploading.set(false);
        this.attachments.set([attachment, ...this.attachments()]);
        this.raiseToast('success', 'Supporting document uploaded.');
      },
      error: (err) => {
        this.attachmentUploading.set(false);
        const message = this.extractApiErrorMessage(err, 'Unable to upload supporting document.');
        this.attachmentUploadError.set(message);
        this.raiseToast('error', message);
      }
    });
  }

  protected downloadAttachment(item: AttachmentItem) {
    window.open(this.attachmentData.downloadUrl(item.id), '_blank');
  }

  protected deleteAttachment(item: AttachmentItem) {
    if (!item?.id) {
      return;
    }
    const confirmed = window.confirm(`Delete supporting document \"${item.fileName}\"?`);
    if (!confirmed) {
      return;
    }
    if (this.attachmentDeletingIds().includes(item.id)) {
      return;
    }

    this.attachmentDeletingIds.set([...this.attachmentDeletingIds(), item.id]);
    this.attachmentData.delete(item.id).subscribe({
      next: () => {
        this.attachments.set(this.attachments().filter((entry) => entry.id !== item.id));
        this.attachmentDeletingIds.set(this.attachmentDeletingIds().filter((id) => id !== item.id));
        this.raiseToast('success', 'Supporting document deleted.');
      },
      error: (err) => {
        this.attachmentDeletingIds.set(this.attachmentDeletingIds().filter((id) => id !== item.id));
        this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to delete supporting document.'));
      }
    });
  }

  protected attachmentDeleting(itemId: string): boolean {
    return this.attachmentDeletingIds().includes(itemId);
  }

  protected supportingDocumentMaxCount(): number {
    return this.supportingDocumentPolicy()?.maxDocumentsPerRecord ?? 10;
  }

  protected supportingDocumentMaxFileSizeMb(): number {
    return this.supportingDocumentPolicy()?.maxFileSizeMb ?? 10;
  }

  protected supportingDocumentAllowedExtensions(): string {
    return (this.supportingDocumentPolicy()?.allowedExtensions ?? this.defaultSupportingDocumentPolicy().allowedExtensions).join(', ');
  }

  protected supportingDocumentRemainingCount(): number {
    return Math.max(0, this.supportingDocumentMaxCount() - this.attachments().length);
  }

  protected isSupportingDocumentLimitReached(): boolean {
    return this.attachments().length >= this.supportingDocumentMaxCount();
  }

  protected supportingDocumentUsageLabel(): string {
    return `Used ${this.attachments().length} / ${this.supportingDocumentMaxCount()}`;
  }

  private defaultSupportingDocumentPolicy(): SupportingDocumentPolicy {
    return {
      maxDocumentsPerRecord: 10,
      maxFileSizeMb: 10,
      allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.webp']
    };
  }

  private restoreAccordionState(): void {
    const stored = this.readAccordionStateStorage();
    if (!stored) {
      return;
    }

    this.overviewAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.overview, ['lead-basics', 'contact-details', 'score']));
    const qualificationFallback = [
      'qualification-factors',
      'qualification-scoring',
      'qualification-context',
      'qualification-disposition'
    ];
    const qualificationStored = Array.isArray(stored.qualification) ? stored.qualification : [];
    const hasLegacyQualificationPanel = qualificationStored.some((value) => value === 'qualification-main');
    this.qualificationAccordionOpenPanels.set(
      hasLegacyQualificationPanel
        ? qualificationFallback
        : this.normalizeAccordionPanelState(stored.qualification, qualificationFallback)
    );
    this.activityAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.activity, ['activity-main']));
    this.documentsAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.documents, ['documents-main']));
    this.historyAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.history, ['history-main']));
  }

  private persistAccordionState(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const state = {
      overview: this.overviewAccordionOpenPanels(),
      qualification: this.qualificationAccordionOpenPanels(),
      activity: this.activityAccordionOpenPanels(),
      documents: this.documentsAccordionOpenPanels(),
      history: this.historyAccordionOpenPanels()
    };

    try {
      localStorage.setItem(LeadFormPage.ACCORDION_STATE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage write failures (private mode/quota) and keep UI state in memory only.
    }
  }

  private readAccordionStateStorage():
    | Partial<Record<'overview' | 'qualification' | 'activity' | 'documents' | 'history', unknown>>
    | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    try {
      const raw = localStorage.getItem(LeadFormPage.ACCORDION_STATE_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === 'object' ? parsed as Partial<Record<'overview' | 'qualification' | 'activity' | 'documents' | 'history', unknown>> : null;
    } catch {
      return null;
    }
  }

  private normalizeAccordionPanelState(value: unknown, fallback: string[]): string[] {
    if (!Array.isArray(value)) {
      return [...fallback];
    }
    const normalized = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    return normalized;
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
    return computeLeadScore(this.form, this.leadDataWeights, this.activeQualificationFactorConfigs()).finalLeadScore;
  }

  private computeQualificationScore(): number | null {
    return computeQualificationRawScore(this.form, this.activeQualificationFactorConfigs());
  }

  private scoreSnapshot(): LeadScoreResult {
    return computeLeadScore(this.form, this.leadDataWeights, this.activeQualificationFactorConfigs());
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
    const scoreBearing = Math.max(1, this.activeQualificationFactors().filter((factor) => factor.includeInScore).length);
    return Math.round((Math.min(count, scoreBearing) / scoreBearing) * 100);
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
    const value = this.overallScoreBadgeValue();
    return `Overall score ${value} / 100`;
  }

  protected overallScoreBadgeValue(): number {
    const value = this.form.score ?? this.computeAutoScore();
    return Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0;
  }

  protected overallScoreBadgeTone(): 'high' | 'medium' | 'low' | 'none' {
    const score = this.overallScoreBadgeValue();
    if (!score) return 'none';
    if (score >= 70) return 'high';
    if (score >= 45) return 'medium';
    return 'low';
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
    return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/${this.activeQualificationFactorCount()} active factors and ${coverage}% evidence coverage.`;
  }

  protected qualificationFactorsSelectedLabel(): string {
    return `${this.countQualificationFactors()} / ${this.activeQualificationFactorCount()}`;
  }

  protected qualificationFactorsBadgeLabel(): string {
    return `${this.countQualificationFactors()}/${this.activeQualificationFactorCount()} selected`;
  }

  protected qualificationFactorsBadgeTone(): 'high' | 'medium' | 'low' | 'none' {
    const count = this.countQualificationFactors();
    if (count === 0) return 'none';
    if (count >= 5) return 'high';
    if (count >= 3) return 'medium';
    return 'low';
  }

  /** Dynamic icon class for Evidence Coverage metric (red at 0%, amber <50%, green ≥50%) */
  protected coverageMetricIcon(): string {
    const pct = this.truthCoveragePercent();
    if (pct === 0) return 'pi-times-circle';
    if (pct < 50) return 'pi-exclamation-circle';
    return 'pi-check-circle';
  }

  /** Severity tone for Evidence Coverage metric card */
  protected coverageMetricTone(): 'none' | 'low' | 'medium' | 'high' {
    const pct = this.truthCoveragePercent();
    if (pct === 0) return 'none';
    if (pct < 30) return 'low';
    if (pct < 60) return 'medium';
    return 'high';
  }

  /** Severity tone for Confidence metric card */
  protected confidenceMetricTone(): 'none' | 'low' | 'medium' | 'high' {
    if (!this.hasQualificationFactors()) return 'none';
    const pct = this.qualificationConfidencePercent();
    if (pct < 30) return 'low';
    if (pct < 60) return 'medium';
    return 'high';
  }

  /** Severity tone for Conversation Score metric card */
  protected conversationMetricTone(): 'none' | 'low' | 'medium' | 'high' {
    if (!this.conversationSignalAvailable()) return 'none';
    const score = this.conversationScore() ?? 0;
    if (score < 25) return 'low';
    if (score < 55) return 'medium';
    return 'high';
  }

  /** Icon for Conversation Score metric (dynamic based on signal availability) */
  protected conversationMetricIcon(): string {
    if (!this.conversationSignalAvailable()) return 'pi-minus-circle';
    const score = this.conversationScore() ?? 0;
    if (score < 25) return 'pi-exclamation-circle';
    return 'pi-comments';
  }

  /** Qualification progress — how many more factors needed to meet minimum */
  protected qualificationProgressRemaining(): number {
    return Math.max(0, this.minimumRequiredQualificationFactors() - this.countQualificationFactors());
  }

  /** Qualification progress percentage (factors selected / minimum required) */
  protected qualificationProgressPercent(): number {
    const min = this.minimumRequiredQualificationFactors();
    if (min === 0) return 0;
    return Math.min(100, Math.round((this.countQualificationFactors() / min) * 100));
  }

  /** Text for the qualification progress indicator */
  protected qualificationProgressLabel(): string {
    const remaining = this.qualificationProgressRemaining();
    if (remaining === 0 && this.countQualificationFactors() > 0) return 'Minimum factors met';
    if (remaining === 0) return 'Select qualification factors to begin';
    return `${remaining} more factor${remaining === 1 ? '' : 's'} needed to qualify`;
  }

  /** Severity tone for Conversion Readiness */
  protected conversionReadinessTone(): 'none' | 'low' | 'medium' | 'high' {
    const score = this.conversionReadiness()?.score ?? 0;
    if (score === 0) return 'none';
    if (score < 35) return 'low';
    if (score < 65) return 'medium';
    return 'high';
  }

  protected qualificationRequiredBadgeLabel(): string | null {
    const remaining = Math.max(0, this.minimumRequiredQualificationFactors() - this.countQualificationFactors());
    return remaining > 0 ? `${remaining} more to qualify` : null;
  }

  protected qualifiedNotesBadgeLabel(): string {
    const notes = this.form.qualifiedNotes?.trim() ?? '';
    return notes ? `${Math.min(notes.length, 999)} chars` : 'No notes';
  }

  protected qualifiedNotesBadgeVariant(): 'cyan' | 'neutral' {
    return (this.form.qualifiedNotes?.trim()?.length ?? 0) > 0 ? 'cyan' : 'neutral';
  }

  protected dispositionBadgeLabel(): string {
    switch (this.form.status) {
      case 'Nurture':
        return this.form.nurtureFollowUpAtUtc ? 'Nurture scheduled' : 'Nurture pending';
      case 'Lost':
        return this.form.lossReason?.trim() ? 'Loss details added' : 'Loss details required';
      case 'Disqualified':
        return this.form.disqualifiedReason?.trim() ? 'Reason captured' : 'Reason required';
      default:
        return 'Active path';
    }
  }

  protected dispositionBadgeVariant(): 'neutral' | 'orange' | 'danger' | 'cyan' {
    switch (this.form.status) {
      case 'Nurture':
        return 'orange';
      case 'Lost':
      case 'Disqualified':
        return 'danger';
      default:
        return 'neutral';
    }
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

  protected leadHeaderScoreValue(): number {
    return this.scoreSnapshot().finalLeadScore;
  }

  protected leadHeaderScoreColor(): string {
    const score = this.leadHeaderScoreValue();
    if (score >= 80) return '#16a34a';
    if (score >= 55) return '#2563eb';
    if (score >= 35) return '#d97706';
    return '#dc2626';
  }

  protected leadProgressSummary(): string {
    const status = this.form.status as LeadStatus;
    const progressionIndex = this.progressionIndex(status);
    if (progressionIndex >= 0) {
      return `Stage ${progressionIndex + 1} of ${LEAD_PROGRESSION_STATUSES.length}`;
    }

    if (status === 'Nurture') {
      return this.hasReachedContactedStage() ? 'Nurture branch after Contacted' : 'Nurture branch from New';
    }

    if ((LEAD_OUTCOME_STATUSES as readonly LeadStatus[]).includes(status)) {
      return 'Outcome recorded';
    }

    return 'Initial stage';
  }

  protected leadHeaderProgressMessage(): string {
    const status = this.form.status as LeadStatus;
    const hasFirstTouch = !!this.firstTouchedAtUtc();
    const hasQualNotes = !!this.form.qualifiedNotes?.trim();
    const qualFactors = this.countQualificationFactors();
    const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();
    switch (status) {
      case 'New':
        return hasFirstTouch ? 'First outreach logged' : 'Awaiting first outreach';
      case 'Contacted':
        return hasFirstTouch && qualFactors >= this.minimumRequiredQualificationFactors() && hasQualNotes && meetsEvidence
          ? 'Ready for qualification'
          : 'Discovery in progress';
      case 'Nurture':
        return 'In nurture follow-up';
      case 'Qualified':
        return 'Ready to convert';
      case 'Converted':
        return 'Converted to a live record';
      case 'Lost':
        return 'Closed as lost';
      case 'Disqualified':
        return 'Closed as disqualified';
      default:
        return 'Lead status summary';
    }
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

    if (this.form.status === 'Qualified' && this.countQualificationFactors() < this.minimumRequiredQualificationFactors()) {
      return `At least ${this.minimumRequiredQualificationFactors()} qualification factors are required before marking a lead as Qualified.`;
    }

    if (this.form.status === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
      return 'Nurture follow-up date is required when setting a lead to Nurture.';
    }

    if (this.form.status === 'Disqualified' && !this.form.disqualifiedReason?.trim()) {
      return 'Disqualified reason is required when closing a lead as Disqualified.';
    }

    if (this.form.status === 'Lost') {
      if (!this.form.lossReason?.trim()) {
        return 'Loss reason is required when closing a lead as Lost.';
      }
      if (!this.form.lossCompetitor?.trim()) {
        return 'Competitor is required when closing a lead as Lost.';
      }
      if (!this.form.lossNotes?.trim()) {
        return 'Loss notes are required when closing a lead as Lost.';
      }
    }

    return null;
  }

  private countQualificationFactors(): number {
    const factors = this.activeQualificationFactors().map((factor) => this.formValueForFactor(factor.key));
    return factors.filter((value) => this.isMeaningfulFactor(value)).length;
  }

  protected isQualificationFactorActive(key: string): boolean {
    return this.activeQualificationFactors().some((factor) => factor.key === key);
  }

  protected qualificationFactorLabel(key: string, fallback: string): string {
    return this.allQualificationFactors().find((factor) => factor.key === key)?.displayLabel ?? fallback;
  }

  protected minimumRequiredQualificationFactors(): number {
    const activeFactors = this.activeQualificationFactors();
    if (!activeFactors.length) {
      return 0;
    }

    const configuredRequired = activeFactors.filter((factor) => factor.isRequired).length;
    return configuredRequired > 0 ? configuredRequired : Math.min(3, activeFactors.length);
  }

  protected activeQualificationFactorCount(): number {
    return this.activeQualificationFactors().length;
  }

  protected customQualificationFactors(): QualificationFactorDefinition[] {
    return this.activeQualificationFactors().filter((factor) => factor.factorType === 'custom');
  }

  private activeQualificationFactorConfigs(): QualificationFactorConfig[] {
    return this.activeQualificationFactors().map((factor) => ({
      key: factor.key,
      displayLabel: factor.displayLabel,
      isActive: factor.isActive,
      isRequired: factor.isRequired,
      order: factor.order,
      factorType: factor.factorType,
      valueType: factor.valueType,
      includeInScore: factor.includeInScore,
      options: factor.options
    }));
  }

  private activeQualificationFactors(): QualificationFactorDefinition[] {
    return this.allQualificationFactors().filter((factor) => factor.isActive);
  }

  private allQualificationFactors(): QualificationFactorDefinition[] {
    const configured = this.qualificationPolicyConfig()?.factors ?? [];
    const defaults: QualificationFactorDefinition[] = [
      { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
    ];

    if (!configured.length) {
      return defaults;
    }

    const byKey = new Map(configured.map((factor) => [factor.key, factor] as const));
    const mergedDefaults = defaults.map((factor) => {
      const override = byKey.get(factor.key);
      return override
        ? {
            ...factor,
            ...override,
            displayLabel: (override.displayLabel ?? '').trim() || factor.displayLabel,
            options: override.options ?? factor.options
          }
        : factor;
    });

    const custom = configured
      .filter((factor) => factor.factorType === 'custom')
      .map((factor) => ({
        ...factor,
        displayLabel: factor.displayLabel.trim() || factor.key,
        options: factor.options ?? []
      }));

    return [...mergedDefaults, ...custom]
      .sort((a, b) => a.order - b.order || a.displayLabel.localeCompare(b.displayLabel));
  }

  private formValueForFactor(key: string): string | null {
    switch (key) {
      case 'budget':
        return this.form.budgetAvailability ?? null;
      case 'readiness':
        return this.form.readinessToSpend ?? null;
      case 'timeline':
        return this.form.buyingTimeline ?? null;
      case 'problem':
        return this.form.problemSeverity ?? null;
      case 'economicBuyer':
        return this.form.economicBuyer ?? null;
      case 'icpFit':
        return this.form.icpFit ?? null;
      default:
        return this.customFactorValue(key);
    }
  }

  private setEvidenceValueForFactor(key: string, value: string): void {
    switch (key) {
      case 'budget':
        this.form.budgetEvidence = value;
        return;
      case 'readiness':
        this.form.readinessEvidence = value;
        return;
      case 'timeline':
        this.form.timelineEvidence = value;
        return;
      case 'problem':
        this.form.problemEvidence = value;
        return;
      case 'economicBuyer':
        this.form.economicBuyerEvidence = value;
        return;
      case 'icpFit':
        this.form.icpFitEvidence = value;
        return;
      default:
        this.setCustomFactorEvidence(key, value);
        return;
    }
  }

  private optionsForFactor(key: string): OptionItem[] {
    switch (key) {
      case 'budget':
        return this.budgetOptions;
      case 'readiness':
        return this.readinessOptions;
      case 'timeline':
        return this.timelineOptions;
      case 'problem':
        return this.problemOptions;
      case 'economicBuyer':
        return this.economicBuyerOptions;
      case 'icpFit':
        return this.icpFitOptions;
      default:
        return this.customFactorOptions(key);
    }
  }

  private scoreForFactor(key: string): number {
    const factor = this.allQualificationFactors().find((item) => item.key === key);
    if (!factor?.includeInScore) {
      return 0;
    }

    switch (key) {
      case 'budget':
        return this.getBudgetScore(this.form.budgetAvailability);
      case 'readiness':
        return this.getReadinessScore(this.form.readinessToSpend);
      case 'timeline':
        return this.getTimelineScore(this.form.buyingTimeline);
      case 'problem':
        return this.getProblemScore(this.form.problemSeverity);
      case 'economicBuyer':
        return this.getEconomicBuyerScore(this.form.economicBuyer);
      case 'icpFit':
        return this.getIcpFitScore(this.form.icpFit);
      default:
        return 0;
    }
  }

  private maxScoreForFactor(key: string): number {
    const factor = this.allQualificationFactors().find((item) => item.key === key);
    if (!factor?.includeInScore) {
      return 0;
    }

    switch (key) {
      case 'budget':
        return 25;
      case 'readiness':
        return 20;
      case 'timeline':
        return 15;
      case 'problem':
        return 20;
      case 'economicBuyer':
        return 10;
      case 'icpFit':
        return 10;
      default:
        return 0;
    }
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
    this.updateFollowUpGuidance();
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

  protected evidenceOptionsForFactor(factorKey: string): OptionItem[] {
    const rules = this.qualificationPolicyConfig()?.factorEvidenceRules ?? [];
    const rule = rules.find((candidate) => (candidate.factorKey ?? '').toLowerCase() === factorKey.toLowerCase());
    const allowed = (rule?.allowedEvidenceSources ?? [])
      .map((value) => (value ?? '').trim().toLowerCase())
      .filter((value) => value.length > 0);

    if (!allowed.length) {
      return this.evidenceOptions;
    }

    const filtered = this.evidenceOptions.filter((option) => allowed.includes(option.value.toLowerCase()));
    return filtered.length ? filtered : this.evidenceOptions;
  }

  protected customFactorValue(key: string): string | null {
    return this.form.customQualificationFactors?.find((factor) => factor.key === key)?.value ?? null;
  }

  protected customFactorEvidence(key: string): string | null {
    return this.form.customQualificationFactors?.find((factor) => factor.key === key)?.evidence ?? null;
  }

  protected setCustomFactorValue(key: string, value: string | null): void {
    const factors = [...(this.form.customQualificationFactors ?? [])];
    const current = factors.find((factor) => factor.key === key);
    if (current) {
      current.value = value;
    } else {
      factors.push({ key, value, evidence: 'No evidence yet' });
    }
    this.form.customQualificationFactors = factors;
  }

  protected setCustomFactorEvidence(key: string, evidence: string | null): void {
    const factors = [...(this.form.customQualificationFactors ?? [])];
    const current = factors.find((factor) => factor.key === key);
    if (current) {
      current.evidence = evidence;
    } else {
      factors.push({ key, value: null, evidence });
    }
    this.form.customQualificationFactors = factors;
  }

  protected trackCustomQualificationFactor(_index: number, factor: QualificationFactorDefinition): string {
    return factor.key;
  }

  protected isCustomTextFactor(factor: QualificationFactorDefinition): boolean {
    return factor.valueType === 'text';
  }

  protected customFactorOptions(key: string): OptionItem[] {
    const factor = this.allQualificationFactors().find((item) => item.key === key);
    return (factor?.options ?? []).map((option) => ({
      label: option,
      value: option,
      icon: this.resolveCustomFactorOptionIcon(option),
      tone: this.resolveCustomFactorOptionTone(option)
    }));
  }

  private isUnknownValue(value?: string | null): boolean {
    if (!value) return true;
    return value.trim().toLowerCase().includes('unknown');
  }

  private normalizeEvidence(): void {
    for (const factor of this.allQualificationFactors()) {
      if (this.isEvidenceDisabled(this.formValueForFactor(factor.key))) {
        this.setEvidenceValueForFactor(factor.key, 'No evidence yet');
      }
    }
  }

  private ensureEvidenceOptionsContainSelections(): void {
    const selectedValues = [
      this.form.budgetEvidence,
      this.form.readinessEvidence,
      this.form.timelineEvidence,
      this.form.problemEvidence,
      this.form.economicBuyerEvidence,
      this.form.icpFitEvidence,
      ...(this.form.customQualificationFactors ?? []).map((factor) => factor.evidence)
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

  private static normalizeLeadDispositionPolicy(policy: LeadDispositionPolicy | null | undefined): LeadDispositionPolicy {
    const normalize = (items: readonly string[] | null | undefined) => {
      return (items ?? [])
        .map((item) => (item ?? '').trim())
        .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
    };

    return {
      disqualificationReasons: normalize(policy?.disqualificationReasons),
      lossReasons: normalize(policy?.lossReasons)
    };
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
    return this.activeQualificationFactors()
      .filter((factor) => factor.includeInScore)
      .map((factor) => ({
      factor: factor.displayLabel,
      score: this.scoreForFactor(factor.key),
      maxScore: this.maxScoreForFactor(factor.key)
      }));
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

  protected requiresEvidenceBeforeQualified(): boolean {
    return this.qualificationPolicyConfig()?.requireEvidenceBeforeQualified ?? false;
  }

  protected minimumEvidenceCoveragePercent(): number {
    const configured = this.qualificationPolicyConfig()?.minimumEvidenceCoveragePercent;
    if (configured === null || configured === undefined || Number.isNaN(configured)) {
      return 50;
    }
    return Math.min(100, Math.max(0, Math.round(configured)));
  }

  protected assumptionsOutstandingLabel(): string {
    const count = this.assumptionsOutstanding();
    if (!count) return '0 assumptions';
    return `${count} assumption${count === 1 ? '' : 's'}`;
  }

  protected conversationScoreValueLabel(): string {
    if (!this.conversationSignalAvailable()) {
      return 'Signal unavailable';
    }

    return `${this.conversationScore() ?? 0} / 100`;
  }

  protected conversationScoreDisplayLabel(): string {
    if (!this.conversationSignalAvailable()) {
      return 'Unavailable';
    }

    return this.conversationScoreLabel() ?? 'Scored';
  }

  protected conversationScoreUpdatedLabel(): string | null {
    const value = this.conversationScoreUpdatedAtUtc();
    if (!value) {
      return null;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return `Updated ${parsed.toLocaleString()}`;
  }

  protected conversationSignalStateLabel(): 'No signal' | 'Weak signal' | 'Healthy signal' | 'Risk signal' {
    if (!this.conversationSignalAvailable()) {
      return 'No signal';
    }

    if (this.isConversationRiskState()) {
      return 'Risk signal';
    }

    if ((this.conversationScore() ?? 0) >= 70 || this.isHighBuyingIntentState()) {
      return 'Healthy signal';
    }

    return 'Weak signal';
  }

  protected conversationSignalStateTone(): 'neutral' | 'weak' | 'healthy' | 'risk' {
    const state = this.conversationSignalStateLabel();
    switch (state) {
      case 'Healthy signal':
        return 'healthy';
      case 'Risk signal':
        return 'risk';
      case 'Weak signal':
        return 'weak';
      default:
        return 'neutral';
    }
  }

  protected conversationSentimentDisplay(): string {
    return this.conversationAiSummary()?.sentiment?.trim()
      || this.conversationAiSentiment()?.trim()
      || 'Not detected';
  }

  protected conversationSummaryDisplay(): string {
    const aiSummary = this.conversationAiSummary()?.summary?.trim();
    if (aiSummary) {
      return aiSummary;
    }

    const stats = this.emailEngagementStats();
    if (!stats?.total) {
      return 'No conversation signal exists yet because this lead does not have a linked email thread or recorded outreach. Log a real touchpoint so the CRM can assess tone, intent, and readiness.';
    }

    if (!this.conversationSignalAvailable()) {
      return 'Email activity is recorded, but the signal is still too thin to score confidently. Two-way replies, objections, or buying signals will make the guidance more reliable.';
    }

    return `This lead has ${stats.total} recorded email touchpoint${stats.total === 1 ? '' : 's'} and a ${this.conversationScoreDisplayLabel().toLowerCase()} conversation signal. Review the detected signals below before advancing the lead.`;
  }

  protected conversationNextActionDisplay(): string {
    const aiAction = this.conversationAiSummary()?.nextAction?.trim();
    if (aiAction) {
      return aiAction;
    }

    const riskSignal = this.conversationRiskSignals()[0];
    if (riskSignal) {
      return `Address this gap next: ${riskSignal}.`;
    }

    const positiveSignal = this.conversationPositiveSignals()[0];
    if (positiveSignal) {
      return `Build on the current momentum: ${positiveSignal.toLowerCase()}.`;
    }

    return 'Add the next meaningful touchpoint or meeting outcome so the CRM can convert conversation activity into readiness guidance.';
  }

  protected conversationPositiveSignals(): string[] {
    return this.conversationClassifiedSignals().positive;
  }

  protected conversationRiskSignals(): string[] {
    return this.conversationClassifiedSignals().risk;
  }

  protected conversationNeutralSignals(): string[] {
    return this.conversationClassifiedSignals().neutral;
  }

  private isConversationRiskState(): boolean {
    return ['negative', 'cautious'].includes((this.conversationSentimentDisplay() ?? '').trim().toLowerCase())
      || ['guarded', 'dismissive'].includes((this.conversationAiToneLabel() ?? '').trim().toLowerCase())
      || ['stalling', 'objecting', 'disengaged'].includes((this.conversationAiBuyingReadiness() ?? '').trim().toLowerCase())
      || ['going silent', 'raising objections'].includes((this.conversationAiSemanticIntent() ?? '').trim().toLowerCase());
  }

  protected isHighBuyingIntentState(): boolean {
    return ['ready to buy', 'actively evaluating'].includes((this.conversationAiBuyingReadiness() ?? '').trim().toLowerCase())
      || ['seeking solution', 'negotiating terms', 'comparing options'].includes((this.conversationAiSemanticIntent() ?? '').trim().toLowerCase());
  }

  private conversationClassifiedSignals(): { positive: string[]; risk: string[]; neutral: string[] } {
    const deduped = Array.from(new Set(this.conversationScoreReasons().map((reason) => reason.trim()).filter(Boolean)));
    const positive: string[] = [];
    const risk: string[] = [];
    const neutral: string[] = [];

    for (const reason of deduped) {
      const normalized = reason.toLowerCase();
      if (/(no |not |missing|lack|stale|stalled|weak|risk|only outbound|unavailable|not engaged|no reply|no budget|no timeline|no buyer)/.test(normalized)) {
        risk.push(reason);
      } else if (/(recent|engaged|reply|replies|stakeholder|buyer|budget mentioned|timeline discussed|momentum|positive)/.test(normalized)) {
        positive.push(reason);
      } else {
        neutral.push(reason);
      }
    }

    return { positive, risk, neutral };
  }

  protected conversionReadinessScoreLabel(): string {
    return `${this.conversionReadiness()?.score ?? 0} / 100`;
  }

  protected conversionReadinessDisplayLabel(): string {
    return this.conversionReadiness()?.label ?? 'Not assessed';
  }

  protected conversionReadinessSummary(): string {
    return this.conversionReadiness()?.summary ?? 'Conversion readiness is derived from qualification proof and conversation signal.';
  }

  protected conversionReadinessPrimaryGap(): string | null {
    return this.conversionReadiness()?.primaryGap ?? null;
  }

  protected conversionReadinessReasons(): string[] {
    return this.conversionReadiness()?.reasons ?? [];
  }

  protected conversionReadinessManagerReview(): boolean {
    return this.conversionReadiness()?.managerReviewRecommended === true;
  }

  private computeTruthCoverage(factors: Array<{ state: string }>): number {
    if (!factors.length) return 0;
    const verifiedCount = factors.filter((factor) => factor.state === 'Verified').length;
    return verifiedCount / factors.length;
  }

  private computeAssumptionsOutstanding(factors: Array<{ label: string; state: string }>): number {
    const highImpactKeys = new Set<string>(['budget', 'timeline', 'economicBuyer']);
    return this.activeQualificationFactors()
      .filter((factor) => highImpactKeys.has(factor.key))
      .map((factor) => factors.find((item) => item.label === factor.displayLabel))
      .filter((factor): factor is { label: string; state: string } => !!factor)
      .filter((factor) => factor.state === 'Unknown' || factor.state === 'Assumed')
      .length;
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
    return this.activeQualificationFactors().map((factor) =>
      this.getFactorState(factor.displayLabel, this.formValueForFactor(factor.key), this.optionsForFactor(factor.key))
    );
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

  private resolveCustomFactorOptionTone(value: string): OptionItem['tone'] {
    const normalized = value.trim().toLowerCase();
    if (normalized.includes('unknown')) return 'unknown';
    if (normalized.includes('blocked') || normalized.includes('not ') || normalized.includes('no ')) return 'invalid';
    if (normalized.includes('confirmed') || normalized.includes('validated') || normalized.includes('approved')) return 'verified';
    return 'assumed';
  }

  private resolveCustomFactorOptionIcon(value: string): string {
    switch (this.resolveCustomFactorOptionTone(value)) {
      case 'verified':
        return 'pi pi-check-circle';
      case 'invalid':
        return 'pi pi-times-circle';
      case 'unknown':
        return 'pi pi-question-circle';
      default:
        return 'pi pi-info-circle';
    }
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

  private updateFollowUpGuidance(): void {
    const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
    const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';
    let hint: string | null = null;

    if (readiness === 'not planning to spend') {
      hint = 'Readiness is “Not planning to spend.” Move the lead to Nurture when appropriate and record the real outreach from Log activity.';
    }

    if (timeline.includes('target date verbally confirmed')) {
      hint = 'Timeline has a confirmed target date. Record the next customer touch through Log activity so the timeline stays accurate.';
    }

    this.followUpHint.set(hint);
  }

  private getDefaultTab(): 'overview' | 'qualification' | 'activity' | 'history' | 'documents' {
    const stateTab = history.state?.defaultTab;
    if (stateTab === 'qualification' || stateTab === 'overview' || stateTab === 'activity' || stateTab === 'history' || stateTab === 'documents') {
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

  private initializePresence(recordId: string): void {
    console.debug('[LeadForm] initializePresence called for recordId:', recordId);
    const normalizedRecordId = recordId.toLowerCase();
    this.crmEvents.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event?.payload) {
          return;
        }

        const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
        const payloadRecordId = String(event.payload['recordId'] ?? '').toLowerCase();

        // Log all presence events for this record
        if (event.eventType.startsWith('record.presence') && entityType === 'lead' && payloadRecordId === normalizedRecordId) {
          console.debug('[LeadForm] Received presence event:', event);
        }

        if (entityType !== 'lead' || payloadRecordId !== normalizedRecordId) {
          return;
        }

        if (event.eventType === 'record.presence.snapshot') {
          const usersRaw = Array.isArray(event.payload['users']) ? event.payload['users'] : [];
          const users = usersRaw
            .map((item) => {
              const value = item as Record<string, unknown>;
              return {
                userId: String(value['userId'] ?? ''),
                displayName: String(value['displayName'] ?? 'User'),
                isEditing: !!value['isEditing']
              };
            })
            .filter((item) => !!item.userId);
          console.debug('[LeadForm] Setting presenceUsers from snapshot:', users);
          this.presenceUsers.set(users);
          return;
        }

        if (event.eventType === 'record.presence.changed') {
          const userId = String(event.payload['userId'] ?? '');
          const displayName = String(event.payload['displayName'] ?? 'User');
          const action = String(event.payload['action'] ?? '').toLowerCase();
          const isEditing = !!event.payload['isEditing'];
          console.debug('[LeadForm] Presence changed:', { userId, displayName, action, isEditing });
          if (!userId) {
            return;
          }

          this.presenceUsers.update((users) => {
            if (action === 'joined') {
              if (users.some((user) => user.userId === userId)) {
                return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing } : user);
              }
              return [...users, { userId, displayName, isEditing }];
            }
            if (action === 'left') {
              return users.filter((user) => user.userId !== userId);
            }
            if (action === 'editing_started' || action === 'editing_stopped') {
              const nextEditingState = action === 'editing_started' ? true : isEditing;
              if (users.some((user) => user.userId === userId)) {
                return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing: nextEditingState } : user);
              }

              return [...users, { userId, displayName, isEditing: nextEditingState }];
            }
            return users;
          });
        }
      });
    this.crmEvents.joinRecordPresence('lead', recordId);
  }

  protected visiblePresenceUsers(): Array<{ userId: string; displayName: string; isEditing: boolean }> {
    return this.presenceUsers().filter((viewer) => !this.isCurrentUser(viewer.userId));
  }

  protected activeEditors(): Array<{ userId: string; displayName: string; isEditing: boolean }> {
    return this.visiblePresenceUsers().filter((viewer) => viewer.isEditing);
  }

  /**
   * Returns true if another user has uncommitted changes, putting this form into read-only mode.
   */
  protected isReadOnlyDueToEditing(): boolean {
    return this.activeEditors().length > 0;
  }

  /**
   * Returns the name of the user who has the edit lock (first active editor).
   */
  protected lockingEditorName(): string | null {
    const editors = this.activeEditors();
    return editors.length > 0 ? editors[0].displayName : null;
  }

  protected viewingPresenceSummary(): string {
    const viewers = this.visiblePresenceUsers();
    if (!viewers.length) {
      return '';
    }

    if (viewers.length === 1) {
      return `${viewers[0].displayName} is viewing this record.`;
    }

    if (viewers.length === 2) {
      return `${viewers[0].displayName} and ${viewers[1].displayName} are viewing this record.`;
    }

    return `${viewers[0].displayName} and ${viewers.length - 1} others are viewing this record.`;
  }

  protected editingPresenceSummary(): string {
    const editors = this.activeEditors();
    if (!editors.length) {
      return '';
    }

    if (editors.length === 1) {
      return `${editors[0].displayName} is editing this record now.`;
    }

    if (editors.length === 2) {
      return `${editors[0].displayName} and ${editors[1].displayName} are editing this record now.`;
    }

    return `${editors[0].displayName} and ${editors.length - 1} others are editing this record now.`;
  }

  private clearEditingIdleTimer(): void {
    if (this.editingIdleTimer) {
      clearTimeout(this.editingIdleTimer);
      this.editingIdleTimer = null;
    }
  }

  private isCurrentUser(userId: string): boolean {
    if (!this.currentUserId || !userId) {
      return false;
    }

    return userId.toLowerCase() === this.currentUserId.toLowerCase();
  }
}
