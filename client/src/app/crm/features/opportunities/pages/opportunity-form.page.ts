import { ChangeDetectorRef, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { AccordionModule } from 'primeng/accordion';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';

import { OpportunityDataService, OpportunityReviewOutcomeRequest, SaveOpportunityRequest } from '../services/opportunity-data.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { OpportunityReviewChecklistService } from '../services/opportunity-review-checklist.service';
import { OpportunityOnboardingService } from '../services/opportunity-onboarding.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  Opportunity,
  OpportunityApprovalItem,
  DecisionHistoryItem,
  OpportunityReviewChecklistItem,
  OpportunityReviewThreadItem,
  OpportunityOnboardingItem,
  OpportunityTeamMember
} from '../models/opportunity.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, readUserId, tokenHasPermission, tokenHasRole } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserListItem } from '../../settings/models/user-admin.model';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';

interface Option<T = string> {
  label: string;
  value: T;
}

interface ApprovalRequirementBadge {
  label: string;
  detail?: string | null;
  tone: 'neutral' | 'info' | 'warning' | 'success' | 'danger';
}

interface DealSectionNavItem {
  key: DealPanelKey;
  label: string;
  icon: string;
}

interface DealSectionNavGroup {
  key: 'core' | 'execution' | 'governance' | 'delivery' | 'audit';
  label: string;
  items: DealSectionNavItem[];
}

type DealPanelKey =
  | 'opportunity-details'
  | 'deal-settings'
  | 'pricing-discounts'
  | 'quote-proposal'
  | 'pre-sales-team'
  | 'approval-workflow'
  | 'security-legal'
  | 'delivery-handoff'
  | 'onboarding'
  | 'review-thread';

const DEAL_PANEL_ORDER: DealPanelKey[] = [
  'opportunity-details',
  'deal-settings',
  'pricing-discounts',
  'quote-proposal',
  'pre-sales-team',
  'approval-workflow',
  'security-legal',
  'delivery-handoff',
  'onboarding',
  'review-thread'
];

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
    AccordionModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./opportunity-form.page.html",
  styleUrls: ['./opportunity-form.page.scss']
})
export class OpportunityFormPage implements OnInit, OnDestroy {
  private static readonly DISCOUNT_PERCENT_APPROVAL_THRESHOLD = 10;
  private static readonly DISCOUNT_AMOUNT_APPROVAL_THRESHOLD = 1000;
  protected readonly accordionPanels = signal<string[]>([
    'opportunity-details',
    'deal-settings'
  ]);
  protected readonly loadedSectionKeys = signal<Set<DealPanelKey>>(new Set<DealPanelKey>([
    'opportunity-details',
    'deal-settings',
    'pricing-discounts',
    'quote-proposal',
    'delivery-handoff'
  ]));
  protected readonly loadingSectionKeys = signal<Set<DealPanelKey>>(new Set<DealPanelKey>());
  private readonly lockWarningShown = signal<string | null>(null);
  protected readonly activeSectionNav = signal<DealPanelKey>('opportunity-details');

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

  protected currencyOptions: Option[] = [];

  protected readonly reviewStatusOptions: Option[] = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Blocked', value: 'Blocked' }
  ];
  protected readonly proposalStatusOptions: Option[] = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Declined', value: 'Declined' }
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
  protected readonly canRequestApproval = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsRequest);
  });
  protected readonly canDecideApproval = computed(() => {
    const context = readTokenContext();
    return (
      tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsApprove) ||
      tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsOverride)
    );
  });
  protected readonly isManager = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return (
      tokenHasRole(payload, 'Sales Manager') ||
      tokenHasRole(payload, 'System Administrator') ||
      tokenHasRole(payload, 'Admin') ||
      tokenHasRole(payload, 'Super Admin')
    );
  });
  protected readonly hasPendingAcknowledgment = computed(() =>
    this.reviewThread().some((item) => item.kind === 'Acknowledgment' && !item.completedDateUtc)
  );
  protected securityChecklist: OpportunityReviewChecklistItem[] = [];
  protected legalChecklist: OpportunityReviewChecklistItem[] = [];
  protected technicalChecklist: OpportunityReviewChecklistItem[] = [];
  protected newSecurityItem = '';
  protected newLegalItem = '';
  protected newTechnicalItem = '';
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
    currency: ''
  };
  protected approvalRequesting = signal(false);
  protected readonly decisionReviewMode = signal(false);
  protected readonly activeDecisionId = signal<string | null>(null);
  protected readonly decisionHistory = signal<DecisionHistoryItem[]>([]);
  protected readonly decisionActionSubmitting = signal(false);
  protected decisionReviewComment = '';
  protected decisionAction = '';
  protected readonly decisionActionOptions: Option[] = [
    { label: 'Approve', value: 'approve' },
    { label: 'Reject', value: 'reject' },
    { label: 'Review', value: 'review' },
    { label: 'Escalate', value: 'escalate' }
  ];
  protected approvalDecisionNotes: Record<string, string> = {};
  protected approvalDecidingIds = new Set<string>();
  private approvalAmountLocked = false;
  private syncingApprovalAmount = false;
  private approvalAmountThreshold: number | null = null;
  protected readonly policyGateMessage = signal<string | null>(null);
  protected readonly canRequestStageOverride = signal(false);
  protected readonly stageOverrideRequesting = signal(false);
  protected readonly lastStageOverrideDecisionId = signal<string | null>(null);
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
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);
  private readonly crmEvents = inject(CrmEventsService);
  protected readonly router = inject(Router);
  protected readonly customerData = inject(CustomerDataService);
  private readonly toastService = inject(AppToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);
  private readonly currentUserId = readUserId();
  private currencyFallback = '';
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadCurrencyContext();
    this.loadAccounts();
    this.reviewAckDueLocal = this.defaultReviewDueLocal();

    this.route.queryParamMap.subscribe((params) => {
      const isDecisionReview = params.get('reviewMode') === 'decision';
      const decisionId = params.get('decisionId');
      const isActiveReview = isDecisionReview && !!decisionId;
      this.decisionReviewMode.set(isActiveReview);
      this.activeDecisionId.set(isActiveReview ? decisionId : null);
      this.decisionReviewComment = '';
      if (isActiveReview && decisionId) {
        this.loadDecisionHistory(decisionId);
        this.ensureSectionDataLoaded('approval-workflow');
      } else {
        this.decisionHistory.set([]);
      }
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.editingId = id;
      this.isEditMode.set(!!id);
      if (id) {
        this.loadOpportunity(id);
        this.ensureSectionDataLoaded('approval-workflow');
        this.loadSectionsForOpenPanels();
      } else {
        this.form = this.createEmptyForm();
        this.selectedStage = this.form.stageName ?? 'Prospecting';
        this.securityChecklist = [];
        this.legalChecklist = [];
        this.onboardingChecklist = [];
        this.onboardingMilestones = [];
        this.approvals = [];
        this.reviewThread.set([]);
        this.loadedSectionKeys.set(new Set<DealPanelKey>([
          'opportunity-details',
          'deal-settings',
          'pricing-discounts',
          'quote-proposal',
          'delivery-handoff'
        ]));
        this.loadingSectionKeys.set(new Set<DealPanelKey>());
      }
    });
    this.loadTeamMemberOptions();
    this.crmEvents.connect();
    this.crmEvents.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => this.handleRealtimeEvent(event));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onAccordionPanelsChange(value: string[] | string | number[] | number | null | undefined) {
    const next = Array.isArray(value)
      ? value.map((item) => String(item))
      : (value != null ? [String(value)] : []);
    const normalized = this.normalizePanels(next);
    this.accordionPanels.set(normalized);
    const active = normalized.find((panel) => DEAL_PANEL_ORDER.includes(panel as DealPanelKey)) as DealPanelKey | undefined;
    if (active) {
      this.activeSectionNav.set(active);
    }
    const rejected = next.find((panel) => !normalized.includes(panel));
    if (rejected) {
      const reason = this.sectionLockReason(rejected as DealPanelKey) ?? 'Section is locked by workflow policy.';
      if (this.lockWarningShown() !== rejected) {
        this.toastService.show('error', reason, 2800);
        this.lockWarningShown.set(rejected);
      }
    } else {
      this.lockWarningShown.set(null);
    }
    this.loadSectionsForOpenPanels();
  }

  protected isSectionLoaded(section: DealPanelKey): boolean {
    return this.loadedSectionKeys().has(section);
  }

  protected isSectionLoading(section: DealPanelKey): boolean {
    return this.loadingSectionKeys().has(section);
  }

  protected isSectionLocked(section: DealPanelKey): boolean {
    return !!this.sectionLockReason(section);
  }

  protected sectionLockReason(section: DealPanelKey): string | null {
    const stage = this.selectedStage || this.form.stageName || 'Prospecting';
    const stageRank = this.stageRank(stage);
    const detailsReady = Boolean(this.form.name?.trim()) && Boolean(this.form.accountId);

    if (section === 'opportunity-details' || section === 'deal-settings' || section === 'pricing-discounts') {
      return null;
    }

    if (section === 'quote-proposal') {
      if (!detailsReady) return 'Complete deal basics first (name and account).';
      if (stageRank < this.stageRank('Proposal')) return 'Move to Proposal stage to unlock Quote / Proposal.';
      return null;
    }

    if (section === 'pre-sales-team') {
      if (!this.isEditMode()) return 'Save deal first to assign pre-sales team.';
      if (stageRank < this.stageRank('Proposal')) return 'Move to Proposal stage to unlock Pre-Sales Team.';
      return null;
    }

    if (section === 'approval-workflow') {
      if (!this.isEditMode()) return 'Save deal first to request approvals.';
      if (!this.shouldShowApprovalWorkflowSection() && !this.approvals.length) {
        return 'Approval workflow appears only when approval is required.';
      }
      return null;
    }

    if (section === 'security-legal') {
      if (!this.isEditMode()) return 'Save deal first to manage Security & Legal checklists.';
      if (stageRank < this.stageRank('Security / Legal Review')) {
        return 'Move to Security / Legal Review stage to unlock this section.';
      }
      return null;
    }

    if (section === 'delivery-handoff') {
      if (!this.isEditMode()) return 'Save deal first to plan delivery handoff.';
      if (stageRank < this.stageRank('Commit')) return 'Move to Commit stage to unlock Delivery & Handoff.';
      return null;
    }

    if (section === 'onboarding') {
      if (!this.isEditMode()) return 'Save deal first to manage onboarding.';
      if (!this.form.isWon && stage !== 'Closed Won') return 'Onboarding unlocks after Closed Won.';
      return null;
    }

    if (section === 'review-thread') {
      if (!this.isEditMode()) return 'Save deal first to use review thread.';
      if (stageRank < this.stageRank('Qualification')) return 'Move to Qualification stage to unlock review thread.';
      return null;
    }

    return null;
  }

  protected sectionStatus(section: DealPanelKey): 'locked' | 'ready' | 'in-progress' | 'complete' {
    if (this.isSectionLocked(section)) return 'locked';

    if (section === 'opportunity-details') {
      return this.form.name?.trim() && this.form.accountId ? 'complete' : 'in-progress';
    }
    if (section === 'deal-settings') {
      return this.form.amount && this.form.amount > 0 ? 'complete' : 'in-progress';
    }
    if (section === 'pricing-discounts') {
      return (this.form.discountAmount || this.form.discountPercent) ? 'in-progress' : 'ready';
    }
    if (section === 'quote-proposal') {
      return this.form.proposalStatus && this.form.proposalStatus !== 'Not Started' ? 'in-progress' : 'ready';
    }
    if (section === 'pre-sales-team') {
      return this.teamMembers.length ? 'in-progress' : 'ready';
    }
    if (section === 'approval-workflow') {
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) return 'in-progress';
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved')) return 'complete';
      return 'ready';
    }
    if (section === 'security-legal') {
      const any = this.securityChecklist.length + this.legalChecklist.length + this.technicalChecklist.length;
      return any > 0 ? 'in-progress' : 'ready';
    }
    if (section === 'delivery-handoff') {
      return this.form.deliveryOwnerId && this.form.deliveryHandoffScope?.trim() ? 'in-progress' : 'ready';
    }
    if (section === 'onboarding') {
      const any = this.onboardingChecklist.length + this.onboardingMilestones.length;
      return any > 0 ? 'in-progress' : 'ready';
    }
    if (section === 'review-thread') {
      return this.reviewThread().length ? 'in-progress' : 'ready';
    }
    return 'ready';
  }

  protected dealSectionNavGroups(): DealSectionNavGroup[] {
    const groups: DealSectionNavGroup[] = [
      {
        key: 'core',
        label: 'Core',
        items: [
          { key: 'opportunity-details', label: 'Deal Details', icon: 'pi pi-briefcase' },
          { key: 'deal-settings', label: 'Deal Settings', icon: 'pi pi-chart-line' },
          { key: 'pricing-discounts', label: 'Pricing & Discounts', icon: 'pi pi-percentage' }
        ]
      },
      {
        key: 'execution',
        label: 'Sales Execution',
        items: [
          { key: 'quote-proposal', label: 'Quote / Proposal', icon: 'pi pi-file-edit' },
          { key: 'pre-sales-team', label: 'Pre-Sales Team', icon: 'pi pi-users' }
        ]
      },
      {
        key: 'governance',
        label: 'Governance',
        items: [
          { key: 'approval-workflow', label: 'Approval Workflow', icon: 'pi pi-check-circle' },
          { key: 'security-legal', label: 'Security & Legal', icon: 'pi pi-shield' }
        ]
      },
      {
        key: 'delivery',
        label: 'Delivery',
        items: [
          { key: 'delivery-handoff', label: 'Delivery & Handoff', icon: 'pi pi-briefcase' },
          { key: 'onboarding', label: 'Onboarding', icon: 'pi pi-list-check' }
        ]
      },
      {
        key: 'audit',
        label: 'Audit',
        items: [{ key: 'review-thread', label: 'Review / History', icon: 'pi pi-comments' }]
      }
    ];

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => this.isSectionVisible(item.key))
      }))
      .filter((group) => group.items.length > 0);
  }

  protected sectionStatusLabel(section: DealPanelKey): string {
    if (section === 'pricing-discounts') {
      const discountPercent = Number(this.form.discountPercent ?? 0);
      const discountAmount = Number(this.form.discountAmount ?? 0);
      const needsDiscountApproval =
        discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
        discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;

      if (this.hasFinalApprovalByPurpose('discount', 'rejected')) return 'Action Required';
      if (this.hasFinalApprovalByPurpose('discount', 'approved')) return 'Approved';
      if (this.hasPendingApprovalByPurpose('discount')) return 'Submitted';
      if (needsDiscountApproval) return 'Needs Approval';
      if (discountPercent > 0 || discountAmount > 0) return 'Configured';
    }
    if (section === 'approval-workflow') {
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) return 'Approval Pending';
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved')) return 'Approved';
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected')) return 'Rejected';
      if (this.approvals.length > 0) return 'Submitted';
    }
    const status = this.sectionStatus(section);
    if (status === 'locked') return 'Locked';
    if (status === 'complete') return 'Complete';
    if (status === 'in-progress') return 'In Progress';
    return 'Ready';
  }

  protected sectionStatusTone(section: DealPanelKey): 'neutral' | 'info' | 'warning' | 'success' | 'danger' {
    if (section === 'pricing-discounts') {
      const discountPercent = Number(this.form.discountPercent ?? 0);
      const discountAmount = Number(this.form.discountAmount ?? 0);
      const needsDiscountApproval =
        discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
        discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;

      if (this.hasFinalApprovalByPurpose('discount', 'rejected')) return 'danger';
      if (this.hasFinalApprovalByPurpose('discount', 'approved')) return 'success';
      if (this.hasPendingApprovalByPurpose('discount')) return 'info';
      if (needsDiscountApproval) return 'warning';
      if (discountPercent > 0 || discountAmount > 0) return 'info';
    }
    if (section === 'approval-workflow') {
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) return 'warning';
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved')) return 'success';
      if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected')) return 'danger';
      if (this.approvals.length > 0) return 'info';
    }
    const status = this.sectionStatus(section);
    if (status === 'locked') return 'danger';
    if (status === 'complete') return 'success';
    if (status === 'in-progress') return 'info';
    return 'neutral';
  }

  protected isSectionVisible(section: DealPanelKey): boolean {
    const stage = this.selectedStage || this.form.stageName || 'Prospecting';
    const rank = this.stageRank(stage);
    const proposalRank = this.stageRank('Proposal');
    const securityRank = this.stageRank('Security / Legal Review');
    const commitRank = this.stageRank('Commit');
    const qualificationRank = this.stageRank('Qualification');

    if (section === 'opportunity-details' || section === 'deal-settings' || section === 'pricing-discounts') {
      return true;
    }

    if (section === 'approval-workflow') {
      return this.shouldShowApprovalWorkflowSection() || this.approvals.length > 0 || this.decisionReviewMode() || this.requesterApprovalLocked();
    }

    if (section === 'quote-proposal' || section === 'pre-sales-team') {
      return rank >= proposalRank;
    }

    if (section === 'security-legal') {
      return rank >= securityRank;
    }

    if (section === 'delivery-handoff') {
      return rank >= commitRank && stage !== 'Closed Lost';
    }

    if (section === 'onboarding') {
      return stage === 'Closed Won' || !!this.form.isWon;
    }

    if (section === 'review-thread') {
      if (this.requesterApprovalLocked()) {
        return true;
      }
      return this.isEditMode() && (rank >= qualificationRank || this.reviewThread().length > 0);
    }

    return true;
  }

  protected isSectionActive(section: DealPanelKey): boolean {
    return this.accordionPanels().includes(section);
  }

  protected openDealSection(section: DealPanelKey) {
    if (!this.isSectionVisible(section)) return;
    const reason = this.sectionLockReason(section);
    if (reason) {
      this.toastService.show('error', reason, 2800);
      return;
    }
    const next = this.normalizePanels([...this.accordionPanels(), section]);
    this.accordionPanels.set(next);
    this.activeSectionNav.set(section);
    this.lockWarningShown.set(null);
    this.loadSectionsForOpenPanels();
    setTimeout(() => {
      const sectionNode = this.document?.querySelector<HTMLElement>(`[data-deal-section="${section}"]`);
      sectionNode?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 70);
  }

  protected dealOwnerLabel(): string {
    if (this.form.deliveryOwnerId) {
      const ownerOption = this.teamMemberOptions.find((option) => option.value === this.form.deliveryOwnerId);
      if (ownerOption?.label) {
        return ownerOption.label;
      }
    }

    const firstTeamMember = this.teamMembers.find((member) => member.userName?.trim());
    if (firstTeamMember?.userName) {
      return firstTeamMember.userName;
    }

    return 'Not assigned';
  }

  protected dealRiskSummary(): ApprovalRequirementBadge {
    if (this.policyGateMessage()) {
      return { label: 'High Risk', detail: 'Policy gate active', tone: 'danger' };
    }
    if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) {
      return { label: 'Approval Pending', detail: 'Decision required', tone: 'warning' };
    }
    if ((this.selectedStage || '').toLowerCase() === 'commit') {
      return { label: 'Commit Watch', detail: 'Late-stage control', tone: 'info' };
    }
    return { label: 'Normal', detail: 'No active blockers', tone: 'success' };
  }

  protected onStageChange(stage: string) {
    this.selectedStage = stage;
    this.form.stageName = stage;
    this.form.probability = this.estimateProbability(stage);
    this.form.isClosed = stage.startsWith('Closed');
    this.form.isWon = stage === 'Closed Won';
    this.form.forecastCategory = this.estimateForecastCategory(stage);
    this.enforceAccordionAccess();
  }

  protected amountApprovalBadge(): ApprovalRequirementBadge {
    const threshold = this.approvalAmountThreshold ?? 0;
    const amount = Number(this.form.amount ?? 0);
    const closeApproval = this.latestApprovalByPurpose('Close');
    if (closeApproval) {
      const status = (closeApproval.status || '').toLowerCase();
      if (status === 'pending') {
        return { label: 'Approval pending', detail: 'Close approval request submitted', tone: 'warning' };
      }
      if (status === 'approved') {
        return { label: 'Approval approved', detail: 'Close approval already granted', tone: 'success' };
      }
      if (status === 'rejected') {
        return { label: 'Approval rejected', detail: 'Close approval was rejected', tone: 'danger' };
      }
    }

    if (!threshold || threshold <= 0) {
      return { label: 'No close threshold', detail: 'No amount-based close approval rule configured', tone: 'neutral' };
    }

    if (amount >= threshold) {
      const closing = Boolean(this.form.isClosed || this.selectedStage?.startsWith('Closed'));
      return {
        label: closing ? 'Approval required' : 'Approval likely on close',
        detail: `Threshold ${threshold.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${this.resolveCurrencyCode()}`,
        tone: closing ? 'danger' : 'warning'
      };
    }

    return {
      label: 'Within close threshold',
      detail: `Below ${threshold.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${this.resolveCurrencyCode()}`,
      tone: 'success'
    };
  }

  protected discountApprovalBadge(): ApprovalRequirementBadge {
    const discountApproval = this.latestApprovalByPurpose('Discount');
    if (discountApproval) {
      const status = (discountApproval.status || '').toLowerCase();
      if (status === 'pending') {
        return { label: 'Approval pending', detail: 'Discount approval request submitted', tone: 'warning' };
      }
      if (status === 'approved') {
        return { label: 'Approval approved', detail: 'Discount approval already granted', tone: 'success' };
      }
      if (status === 'rejected') {
        return { label: 'Approval rejected', detail: 'Discount approval was rejected', tone: 'danger' };
      }
    }

    const percent = Number(this.form.discountPercent ?? 0);
    const amount = Number(this.form.discountAmount ?? 0);
    const requiresApproval =
      percent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
      amount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;

    if (requiresApproval) {
      return {
        label: 'Discount approval required',
        detail: `>=${OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD}% or >=${OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD} ${this.resolveCurrencyCode()}`,
        tone: 'danger'
      };
    }

    if (percent > 0 || amount > 0) {
      return {
        label: 'Within discount policy',
        detail: `Below ${OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD}% / ${OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD} ${this.resolveCurrencyCode()}`,
        tone: 'info'
      };
    }

    return { label: 'No discount approval', detail: 'No discount entered', tone: 'neutral' };
  }

  protected opportunityDetailsBadge(): string {
    const nameReady = Boolean(this.form.name?.trim());
    const stageReady = Boolean((this.selectedStage || this.form.stageName || '').trim());
    if (nameReady && stageReady) {
      return `${this.selectedStage || this.form.stageName}`;
    }
    if (nameReady) {
      return 'Name ready';
    }
    return 'Setup';
  }

  protected dealSettingsHeaderBadge(): string {
    return this.amountApprovalBadge().label;
  }

  protected pricingHeaderBadge(): string {
    return this.discountApprovalBadge().label;
  }

  protected proposalHeaderBadge(): string {
    return this.form.proposalStatus || 'Not Started';
  }

  protected preSalesTeamHeaderBadge(): string {
    return this.teamMembers.length ? `${this.teamMembers.length} teammate${this.teamMembers.length > 1 ? 's' : ''}` : 'No teammates';
  }

  protected approvalWorkflowHeaderBadge(): string {
    if (!this.isEditMode()) {
      return 'Save first';
    }
    const pending = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'pending').length;
    if (pending > 0) {
      return `${pending} pending`;
    }
    if (this.approvals.length > 0) {
      return `${this.approvals.length} total`;
    }
    return 'No requests';
  }

  protected approvalWorkflowHeaderTone(): ApprovalRequirementBadge['tone'] {
    return this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending') ? 'warning' : 'neutral';
  }

  protected shouldShowApprovalWorkflowSection(): boolean {
    if (!this.isEditMode()) {
      return false;
    }

    if (this.approvals.length > 0) {
      return true;
    }

    const discountPercent = Number(this.form.discountPercent ?? 0);
    const discountAmount = Number(this.form.discountAmount ?? 0);
    const needsDiscountApproval =
      discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
      discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;

    const amountThreshold = this.approvalAmountThreshold ?? 0;
    const amount = Number(this.form.amount ?? 0);
    const needsAmountApproval = amountThreshold > 0 && amount >= amountThreshold;

    return needsDiscountApproval || needsAmountApproval;
  }

  protected requesterApprovalLocked(): boolean {
    if (!this.isEditMode()) {
      return false;
    }

    return this.approvals.some((approval) => (approval.status || '').toLowerCase() === 'pending');
  }

  protected currentApprovalStatusLabel(): string {
    const pendingCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'pending').length;
    if (pendingCount > 0) {
      return pendingCount === 1 ? 'Pending for Approval' : `${pendingCount} Pending for Approval`;
    }

    const approvedCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'approved').length;
    if (approvedCount > 0) {
      return approvedCount === 1 ? 'Approved' : `${approvedCount} Approved`;
    }

    const rejectedCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'rejected').length;
    if (rejectedCount > 0) {
      return rejectedCount === 1 ? 'Rejected' : `${rejectedCount} Rejected`;
    }

    return 'No Approval Requested';
  }

  protected currentApprovalStatusTone(): ApprovalRequirementBadge['tone'] {
    if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) {
      return 'warning';
    }
    if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved')) {
      return 'success';
    }
    if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected')) {
      return 'danger';
    }
    return 'neutral';
  }

  protected approvalPendingSummaryDetail(): string {
    return this.requesterApprovalLocked()
      ? 'Read-only: deal is locked while approval is pending'
      : this.currentApprovalStatusLabel();
  }

  protected decisionReviewSummary(): OpportunityApprovalItem | null {
    const decisionId = this.activeDecisionId();
    if (!decisionId) {
      return null;
    }
    return this.approvals.find((approval) => approval.id === decisionId) ?? null;
  }

  protected securityLegalHeaderBadge(): string {
    const total = this.securityChecklist.length + this.legalChecklist.length + this.technicalChecklist.length;
    if (!total) {
      return 'No checks';
    }
    const blocked = [...this.securityChecklist, ...this.legalChecklist, ...this.technicalChecklist]
      .filter((item) => (item.status || '').toLowerCase() === 'blocked').length;
    return blocked > 0 ? `${blocked} blocked` : `${total} checks`;
  }

  protected deliveryHeaderBadge(): string {
    return this.form.deliveryStatus || 'Not Started';
  }

  protected onboardingHeaderBadge(): string {
    const total = this.onboardingChecklist.length + this.onboardingMilestones.length;
    if (!total) {
      return 'No items';
    }
    return `${total} items`;
  }

  protected reviewThreadHeaderBadge(): string {
    if (!this.isEditMode()) {
      return 'Save first';
    }
    const pendingAck = this.hasPendingAcknowledgment();
    if (pendingAck) {
      return 'Ack pending';
    }
    const count = this.reviewThread().length;
    return count ? `${count} entries` : 'No reviews';
  }

  protected reviewThreadHeaderTone(): ApprovalRequirementBadge['tone'] {
    return this.hasPendingAcknowledgment() ? 'warning' : 'neutral';
  }

  protected onSave() {
    if (this.requesterApprovalLocked()) {
      this.toastService.show('error', 'This deal is read-only while approval is pending.', 3000);
      return;
    }
    if (this.decisionReviewMode()) {
      this.toastService.show('success', 'This record is opened in decision review mode (read-only).', 3000);
      return;
    }
    if (!this.form.name) return;
    const teamError = this.validateTeamMembers();
    if (teamError) {
      this.toastService.show('error', teamError, 4000);
      return;
    }
    const validationError = this.validateStageRequirements();
    if (validationError) {
      this.handlePolicyGateMessage(validationError);
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
    const rawProposalGenerated = this.form.proposalGeneratedAtUtc as unknown;
    const proposalGeneratedAtUtc = rawProposalGenerated instanceof Date
      ? rawProposalGenerated.toISOString()
      : (typeof rawProposalGenerated === 'string' && rawProposalGenerated.trim() ? rawProposalGenerated : undefined);
    const rawProposalSent = this.form.proposalSentAtUtc as unknown;
    const proposalSentAtUtc = rawProposalSent instanceof Date
      ? rawProposalSent.toISOString()
      : (typeof rawProposalSent === 'string' && rawProposalSent.trim() ? rawProposalSent : undefined);
    const payload: SaveOpportunityRequest = {
      ...this.form,
      expectedCloseDate,
      contractStartDateUtc,
      contractEndDateUtc,
      deliveryCompletedAtUtc,
      proposalGeneratedAtUtc,
      proposalSentAtUtc,
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
          this.policyGateMessage.set(null);
          this.canRequestStageOverride.set(false);
        },
        error: (err) => {
          this.saving.set(false);
          const message = typeof err?.error === 'string' ? err.error : 'Unable to save deal.';
          this.handlePolicyGateMessage(message);
          this.toastService.show('error', message, 4000);
        }
      });
  }

  protected requestStageOverride() {
    const opportunityId = this.editingId;
    const gateMessage = this.policyGateMessage();
    const requestedStage = this.selectedStage;
    if (!opportunityId || !gateMessage || !requestedStage || !this.isStageOverrideContext()) {
      return;
    }

    this.stageOverrideRequesting.set(true);
    this.approvalService.requestStageOverrideDecision(opportunityId, {
      requestedStage,
      blockerReason: gateMessage
    }).subscribe({
      next: (result) => {
        this.stageOverrideRequesting.set(false);
        this.lastStageOverrideDecisionId.set(result.decisionId);
        this.toastService.show('success', result.message, 3500);
        void this.router.navigate(['/app/decisions/pending-action'], {
          queryParams: { selected: result.decisionId }
        });
      },
      error: (err) => {
        this.stageOverrideRequesting.set(false);
        const message =
          (typeof err?.error?.message === 'string' && err.error.message) ||
          (typeof err?.error === 'string' && err.error) ||
          'Unable to request stage override approval.';
        this.toastService.show('error', message, 4000);
      }
    });
  }

  protected triggerKickoff() {
    if (!this.editingId) {
      return;
    }
    const handoffError = this.validateHandoffRequirements();
    if (handoffError) {
      this.toastService.show('error', handoffError, 4000);
      return;
    }
    const existing = this.onboardingMilestones.find((item) =>
      item.title.toLowerCase().includes('kickoff'));
    if (existing) {
      this.toastService.show('success', 'Kickoff milestone already exists.', 2500);
      return;
    }
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    this.onboardingService
      .create(this.editingId, {
        type: 'Milestone',
        title: 'Kickoff meeting scheduled',
        status: 'Pending',
        dueDateUtc: dueDate,
        notes: this.form.deliveryHandoffScope ?? null
      })
      .subscribe({
        next: (item) => {
          this.onboardingMilestones = [...this.onboardingMilestones, item];
          this.toastService.show('success', 'Kickoff milestone created.', 2500);
        },
        error: () => {
          this.toastService.show('error', 'Unable to create kickoff milestone.', 3000);
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

  protected sendBackForReview() {
    const decisionId = this.activeDecisionId();
    if (!decisionId || this.decisionActionSubmitting()) {
      return;
    }

    const notes = this.decisionReviewComment?.trim();
    if (!notes) {
      this.toastService.show('error', 'Add a review comment before sending back.', 3000);
      return;
    }

    this.decisionActionSubmitting.set(true);
    this.approvalService.requestDecisionInfo(decisionId, notes).subscribe({
      next: () => {
        this.decisionActionSubmitting.set(false);
        this.toastService.show('success', 'Case sent back for review.', 2500);
        this.decisionReviewComment = '';
        this.decisionAction = '';
        this.loadApprovalsForDecisionContext();
        this.loadDecisionHistory(decisionId);
      },
      error: (err) => {
        this.decisionActionSubmitting.set(false);
        const message =
          (typeof err?.error?.message === 'string' && err.error.message) ||
          (typeof err?.error === 'string' && err.error) ||
          'Unable to send case back for review.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected approveDecisionFromReview() {
    this.executeDecisionOutcomeFromReview(true);
  }

  protected rejectDecisionFromReview() {
    this.executeDecisionOutcomeFromReview(false);
  }

  protected submitDecisionAction() {
    const action = this.decisionAction;
    if (!action || this.decisionActionSubmitting()) {
      return;
    }

    const noteRequired = action === 'reject' || action === 'review' || action === 'escalate';
    const comment = this.decisionReviewComment?.trim() ?? '';
    if (noteRequired && !comment) {
      this.toastService.show('error', 'Comment is required for this action.', 3000);
      return;
    }

    if (action === 'reject') {
      if (!window.confirm('Confirm reject this decision?')) {
        return;
      }
      this.rejectDecisionFromReview();
      return;
    }

    if (action === 'escalate') {
      if (!window.confirm('Confirm escalate this decision?')) {
        return;
      }
      this.escalateDecisionFromReview();
      return;
    }

    if (action === 'review') {
      this.sendBackForReview();
      return;
    }

    this.approveDecisionFromReview();
  }

  protected escalateDecisionFromReview() {
    const decisionId = this.activeDecisionId();
    if (!decisionId || this.decisionActionSubmitting()) {
      return;
    }

    this.decisionActionSubmitting.set(true);
    this.approvalService.escalateDecision(decisionId, {
      notes: this.decisionReviewComment?.trim() || null
    }).subscribe({
      next: () => {
        this.decisionActionSubmitting.set(false);
        this.toastService.show('success', 'Decision escalated.', 2500);
        this.decisionReviewComment = '';
        this.decisionAction = '';
        this.loadApprovalsForDecisionContext();
        this.loadDecisionHistory(decisionId);
      },
      error: (err) => {
        this.decisionActionSubmitting.set(false);
        const message =
          (typeof err?.error?.message === 'string' && err.error.message) ||
          (typeof err?.error === 'string' && err.error) ||
          'Unable to escalate decision.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  protected decisionHistoryTone(item: DecisionHistoryItem): 'neutral' | 'info' | 'warning' | 'success' | 'danger' {
    const action = (item.action || '').toLowerCase();
    if (action.includes('approve')) return 'success';
    if (action.includes('reject')) return 'danger';
    if (action.includes('escalat')) return 'warning';
    if (action.includes('request') || action.includes('info') || action.includes('review')) return 'info';
    return 'neutral';
  }

  protected decisionStatusTone(status?: string | null): 'neutral' | 'info' | 'warning' | 'success' | 'danger' {
    const value = (status || '').toLowerCase();
    if (value === 'approved') return 'success';
    if (value === 'rejected') return 'danger';
    if (value === 'pending') return 'warning';
    if (value === 'escalated') return 'info';
    return 'neutral';
  }

  private executeDecisionOutcomeFromReview(approved: boolean) {
    const decisionId = this.activeDecisionId();
    if (!decisionId || this.decisionActionSubmitting()) {
      return;
    }

    this.decisionActionSubmitting.set(true);
    this.approvalService
      .decideDecision(decisionId, { approved, notes: this.decisionReviewComment?.trim() || null })
      .subscribe({
        next: () => {
          this.decisionActionSubmitting.set(false);
          this.toastService.show('success', approved ? 'Decision approved.' : 'Decision rejected.', 2500);
          this.decisionReviewComment = '';
          this.decisionAction = '';
          this.loadApprovalsForDecisionContext();
          this.loadDecisionHistory(decisionId);
        },
        error: (err) => {
          this.decisionActionSubmitting.set(false);
          const message =
            (typeof err?.error?.message === 'string' && err.error.message) ||
            (typeof err?.error === 'string' && err.error) ||
            'Unable to update decision.';
          this.toastService.show('error', message, 3500);
        }
      });
  }

  private loadApprovalsForDecisionContext() {
    if (!this.editingId) {
      return;
    }
    this.loadApprovals(this.editingId);
  }

  private loadDecisionHistory(decisionId: string) {
    this.approvalService.getDecisionHistory({
      decisionId,
      take: 100
    }).subscribe({
      next: (items) => {
        this.decisionHistory.set(items ?? []);
      },
      error: () => {
        this.decisionHistory.set([]);
      }
    });
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
    return `Forecast locked to ${required} for ${stage}.`;
  }

  protected decisionMakerGuidance(): string | null {
    const stage = this.selectedStage || this.form.stageName || 'Prospecting';
    if (['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage)) {
      return 'Decision maker confirmation is required before moving beyond qualification.';
    }
    return null;
  }

  protected isForecastLocked(): boolean {
    return true;
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

  private loadSectionsForOpenPanels() {
    for (const panel of this.normalizePanels(this.accordionPanels())) {
      this.ensureSectionDataLoaded(panel as DealPanelKey);
    }
  }

  private normalizePanels(panels: string[]): string[] {
    const filtered = panels
      .map((panel) => panel as DealPanelKey)
      .filter((panel) => this.isSectionVisible(panel))
      .filter((panel) => !this.isSectionLocked(panel));

    return [...new Set(filtered)].sort(
      (a, b) => DEAL_PANEL_ORDER.indexOf(a) - DEAL_PANEL_ORDER.indexOf(b)
    );
  }

  private enforceAccordionAccess() {
    const normalized = this.normalizePanels(this.accordionPanels());
    if (normalized.length > 0) {
      if (normalized.length !== this.accordionPanels().length) {
        this.accordionPanels.set(normalized);
      }
      return;
    }

    const fallback = DEAL_PANEL_ORDER.find((panel) => this.isSectionVisible(panel) && !this.isSectionLocked(panel));
    if (fallback) {
      this.accordionPanels.set([fallback]);
      this.activeSectionNav.set(fallback);
    }
  }

  private ensureSectionDataLoaded(section: DealPanelKey) {
    if (!this.isEditMode() || !this.editingId) {
      return;
    }
    if (this.loadedSectionKeys().has(section) || this.loadingSectionKeys().has(section)) {
      return;
    }

    const markLoading = () => {
      const next = new Set(this.loadingSectionKeys());
      next.add(section);
      this.loadingSectionKeys.set(next);
    };
    const markDone = () => {
      const loading = new Set(this.loadingSectionKeys());
      loading.delete(section);
      this.loadingSectionKeys.set(loading);

      const loaded = new Set(this.loadedSectionKeys());
      loaded.add(section);
      this.loadedSectionKeys.set(loaded);
    };

    markLoading();

    switch (section) {
      case 'pre-sales-team':
        this.loadTeamMembers(this.editingId, markDone);
        break;
      case 'approval-workflow':
        this.loadApprovals(this.editingId, markDone);
        break;
      case 'security-legal':
        this.loadChecklists(this.editingId, markDone);
        break;
      case 'onboarding':
        this.loadOnboarding(this.editingId, markDone);
        break;
      case 'review-thread':
        this.loadReviewThread(this.editingId, markDone);
        break;
      default:
        markDone();
        break;
    }
  }

  private loadChecklists(opportunityId: string, onSettled?: () => void) {
    let pending = 3;
    const done = () => {
      pending -= 1;
      if (pending <= 0) {
        onSettled?.();
      }
    };
    this.checklistService.get(opportunityId, 'Security').subscribe({
      next: (items) => {
        this.securityChecklist = items;
        this.cdr.detectChanges();
        done();
      },
      error: () => {
        this.securityChecklist = [];
        done();
      }
    });
    this.checklistService.get(opportunityId, 'Legal').subscribe({
      next: (items) => {
        this.legalChecklist = items;
        this.cdr.detectChanges();
        done();
      },
      error: () => {
        this.legalChecklist = [];
        done();
      }
    });
    this.checklistService.get(opportunityId, 'Technical').subscribe({
      next: (items) => {
        this.technicalChecklist = items;
        this.cdr.detectChanges();
        done();
      },
      error: () => {
        this.technicalChecklist = [];
        done();
      }
    });
  }

  private loadOnboarding(opportunityId: string, onSettled?: () => void) {
    let pending = 2;
    const done = () => {
      pending -= 1;
      if (pending <= 0) {
        onSettled?.();
      }
    };
    this.onboardingService.get(opportunityId, 'Checklist').subscribe({
      next: (items) => {
        this.onboardingChecklist = (items ?? []).map((item) => ({
          ...item,
          dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
        }));
        this.cdr.detectChanges();
        done();
      },
      error: () => {
        this.onboardingChecklist = [];
        done();
      }
    });
    this.onboardingService.get(opportunityId, 'Milestone').subscribe({
      next: (items) => {
        this.onboardingMilestones = (items ?? []).map((item) => ({
          ...item,
          dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
        }));
        this.cdr.detectChanges();
        done();
      },
      error: () => {
        this.onboardingMilestones = [];
        done();
      }
    });
  }

  private loadApprovals(opportunityId: string, onSettled?: () => void) {
    this.approvalService.getForOpportunity(opportunityId).subscribe({
      next: (items) => {
        this.approvals = items ?? [];
        this.enforceAccordionAccess();
        this.cdr.detectChanges();
        onSettled?.();
      },
      error: () => {
        this.approvals = [];
        this.enforceAccordionAccess();
        onSettled?.();
      }
    });
  }

  private handleRealtimeEvent(event: { eventType?: string; payload?: Record<string, unknown> | null } | null | undefined) {
    if (!event?.eventType || !this.isEditMode() || !this.editingId) {
      return;
    }

    const eventType = event.eventType.toLowerCase();
    if (!eventType.startsWith('decision.')) {
      return;
    }

    const payloadEntityId = String(event.payload?.['entityId'] ?? '');
    if (payloadEntityId && payloadEntityId !== this.editingId) {
      return;
    }

    this.loadApprovals(this.editingId);
    const decisionId = this.activeDecisionId();
    if (decisionId) {
      this.loadDecisionHistory(decisionId);
    }
  }

  private hasApprovalByPurpose(purpose: string): boolean {
    const needle = purpose.trim().toLowerCase();
    return this.approvals.some((approval) => (approval.purpose || '').toLowerCase() === needle);
  }

  private hasPendingApprovalByPurpose(purpose: string): boolean {
    const needle = purpose.trim().toLowerCase();
    return this.approvals.some((approval) =>
      (approval.purpose || '').toLowerCase() === needle &&
      (approval.status || '').toLowerCase() === 'pending');
  }

  private hasFinalApprovalByPurpose(purpose: string, status: 'approved' | 'rejected'): boolean {
    const needle = purpose.trim().toLowerCase();
    return this.approvals.some((approval) =>
      (approval.purpose || '').toLowerCase() === needle &&
      (approval.status || '').toLowerCase() === status);
  }

  private loadReviewThread(opportunityId: string, onSettled?: () => void) {
    this.opportunityData.getReviewThread(opportunityId).subscribe({
      next: (items) => {
        this.reviewThread.set(items ?? []);
        this.enforceAccordionAccess();
        this.cdr.detectChanges();
        onSettled?.();
      },
      error: () => {
        this.reviewThread.set([]);
        this.enforceAccordionAccess();
        onSettled?.();
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

  private loadTeamMembers(opportunityId: string, onSettled?: () => void) {
    this.opportunityData.getTeam(opportunityId).subscribe({
      next: (items) => {
        this.teamMembers = items ?? [];
        this.teamDirty = false;
        this.cdr.detectChanges();
        onSettled?.();
      },
      error: () => {
        this.teamMembers = [];
        this.teamDirty = false;
        onSettled?.();
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

  private handlePolicyGateMessage(message: string) {
    const normalized = message.toLowerCase();
    const isApprovalGate =
      normalized.includes('approval required') ||
      normalized.includes('discount approval required') ||
      normalized.includes('approval role must be configured');
    const isStageOverrideCandidate =
      this.isStageOverrideContext() &&
      !normalized.includes('unable to save') &&
      (
        normalized.includes('before moving to') ||
        normalized.includes('before changing stage') ||
        normalized.includes('required before moving') ||
        normalized.includes('must be approved before moving')
      );

    const gateMessage = (isApprovalGate || isStageOverrideCandidate) ? message : null;
    this.policyGateMessage.set(gateMessage);
    this.canRequestStageOverride.set(Boolean(gateMessage && isStageOverrideCandidate && this.canRequestApproval()));
  }

  private isStageOverrideContext(): boolean {
    const stage = (this.selectedStage ?? '').trim();
    return Boolean(
      this.isEditMode() &&
      this.editingId &&
      this.originalStage &&
      stage &&
      !stage.startsWith('Closed') &&
      stage !== this.originalStage
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
      .requestApprovalViaDecisionEngine(this.editingId, {
        amount,
        currency: this.approvalRequest.currency || this.resolveCurrencyCode(),
        purpose: this.approvalRequest.purpose,
        opportunityName: this.form.name?.trim() || 'Deal',
        accountName: this.form.accountId ? this.accountLabel() : null
      })
      .subscribe({
        next: (item) => {
          this.upsertApproval(item);
          this.approvalRequesting.set(false);
          this.toastService.show('success', 'Approval request sent.', 2500);
        },
        error: (err) => {
          this.approvalRequesting.set(false);
          const message =
            err?.status === 403
              ? 'You do not have permission to request approvals.'
              : (typeof err?.error === 'string' ? err.error : 'Unable to request approval.');
          this.handlePolicyGateMessage(message);
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
          const message =
            err?.status === 403
              ? 'You do not have permission to approve or override approvals.'
              : (typeof err?.error === 'string' ? err.error : 'Unable to update approval.');
          this.handlePolicyGateMessage(message);
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
    const normalized = this.normalizeCurrencyCode(currency);
    this.form.currency = normalized;
    this.approvalRequest.currency = normalized;
  }

  protected generateProposal() {
    const now = new Date();
    const status = this.form.proposalStatus || 'Not Started';
    if (status === 'Not Started') {
      this.form.proposalStatus = 'Draft';
    }
    if (!this.form.proposalGeneratedAtUtc) {
      this.form.proposalGeneratedAtUtc = now;
    }
    if (!this.form.proposalNotes && this.form.pricingNotes) {
      this.form.proposalNotes = this.form.pricingNotes;
    }
    this.toastService.show('success', 'Proposal draft created.', 2500);
  }

  protected markProposalSent() {
    const now = new Date();
    if (!this.form.proposalGeneratedAtUtc) {
      this.form.proposalGeneratedAtUtc = now;
    }
    this.form.proposalStatus = 'Sent';
    this.form.proposalSentAtUtc = now;
    this.toastService.show('success', 'Proposal marked as sent.', 2500);
  }

  protected addChecklistItem(type: 'Security' | 'Legal' | 'Technical') {
    const title = (type === 'Security'
      ? this.newSecurityItem
      : type === 'Legal'
        ? this.newLegalItem
        : this.newTechnicalItem).trim();
    if (!title || !this.editingId) {
      return;
    }

    this.checklistService
      .create(this.editingId, { title, type, status: 'Pending' })
      .subscribe({
        next: (item) => {
          if (type === 'Security') {
            this.securityChecklist = [...this.securityChecklist, item];
            this.newSecurityItem = '';
          } else if (type === 'Legal') {
            this.legalChecklist = [...this.legalChecklist, item];
            this.newLegalItem = '';
          } else {
            this.technicalChecklist = [...this.technicalChecklist, item];
            this.newTechnicalItem = '';
          }
        },
        error: (error) => {
          const message = typeof error?.error === 'string'
            ? error.error
            : 'Unable to add checklist item.';
          this.toastService.show('error', message, 3500);
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
        error: (error) => {
          this.checklistSavingIds.delete(item.id);
          const message = typeof error?.error === 'string'
            ? error.error
            : 'Unable to update checklist item.';
          this.toastService.show('error', message, 3500);
        }
      });
  }

  protected deleteChecklistItem(item: OpportunityReviewChecklistItem) {
    this.checklistService.delete(item.id).subscribe(() => {
      if (item.type === 'Security') {
        this.securityChecklist = this.securityChecklist.filter((i) => i.id !== item.id);
      } else if (item.type === 'Legal') {
        this.legalChecklist = this.legalChecklist.filter((i) => i.id !== item.id);
      } else {
        this.technicalChecklist = this.technicalChecklist.filter((i) => i.id !== item.id);
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
      currency: this.resolveCurrency(opp.currency),
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
      proposalStatus: opp.proposalStatus ?? 'Not Started',
      proposalNotes: opp.proposalNotes ?? '',
      proposalLink: opp.proposalLink ?? '',
      proposalGeneratedAtUtc: opp.proposalGeneratedAtUtc ? new Date(opp.proposalGeneratedAtUtc) : undefined,
      proposalSentAtUtc: opp.proposalSentAtUtc ? new Date(opp.proposalSentAtUtc) : undefined,
      preSalesScope: opp.preSalesScope ?? '',
      preSalesApproach: opp.preSalesApproach ?? '',
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
      currency: this.resolveCurrency(opp.currency ?? this.approvalRequest.currency)
    };
    this.approvalAmountLocked = false;
    this.syncApprovalAmount();
    this.enforceAccordionAccess();
    this.cdr.detectChanges();
  }

  private createEmptyForm(): SaveOpportunityRequest {
    return {
      name: '',
      accountId: undefined,
      stageName: 'Prospecting',
      amount: 0,
      currency: this.resolveCurrencyCode(),
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
      proposalStatus: 'Not Started',
      proposalNotes: '',
      proposalLink: '',
      proposalGeneratedAtUtc: undefined,
      proposalSentAtUtc: undefined,
      preSalesScope: '',
      preSalesApproach: '',
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

  private stageRank(stage: string): number {
    const order = this.stageOptions.map((item) => item.value);
    const idx = order.indexOf(stage);
    return idx >= 0 ? idx : 0;
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

  private loadCurrencyContext() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyOptions = active.map((currency) => ({
        label: currency.code,
        value: currency.code
      }));
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      this.applyCurrencyDefaults(this.currencyFallback);
    });

    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        const resolved = settings.currency || this.currencyFallback;
        this.approvalAmountThreshold =
          settings.approvalAmountThreshold != null ? Number(settings.approvalAmountThreshold) : null;
        this.applyCurrencyDefaults(resolved);
      }
    });
  }

  private latestApprovalByPurpose(purpose: 'Close' | 'Discount'): OpportunityApprovalItem | null {
    return this.approvals.find((approval) => (approval.purpose || '').toLowerCase() === purpose.toLowerCase()) ?? null;
  }

  private applyCurrencyDefaults(currencyCode: string) {
    const normalized = this.normalizeCurrencyCode(currencyCode);
    if (!normalized) return;
    if (!this.form?.currency) {
      this.form = { ...(this.form ?? this.createEmptyForm()), currency: normalized };
    }
    if (!this.approvalRequest.currency) {
      this.approvalRequest.currency = normalized;
    }
  }

  protected resolveCurrency(value?: string | null) {
    const normalized = this.normalizeCurrencyCode(value);
    return normalized || this.resolveCurrencyCode();
  }

  protected resolveCurrencyCode() {
    // `this.form` can be undefined during field initialization (createEmptyForm -> resolveCurrencyCode).
    // Guard for that startup window.
    return (
      this.normalizeCurrencyCode(this.form?.currency) ||
      this.normalizeCurrencyCode(this.currencyFallback) ||
      this.normalizeCurrencyCode(this.currencyOptions[0]?.value) ||
      'USD'
    );
  }

  private normalizeCurrencyCode(value?: string | null): string {
    if (!value) {
      return '';
    }
    const normalized = value.trim().toUpperCase();
    return /^[A-Z]{3}$/.test(normalized) ? normalized : '';
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
        return 'Stage is required when creating a deal.';
      }
      if (!this.form.amount || this.form.amount <= 0) {
        return 'Amount is required when creating a deal.';
      }
      if (!this.form.expectedCloseDate) {
        return 'Expected close date is required when creating a deal.';
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

    if (['Proposal', 'Security / Legal Review', 'Negotiation', 'Commit'].includes(stage)) {
      if (!this.technicalChecklist.length) {
        return 'Log at least one technical risk before demo/validation.';
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
        return 'Forecast category is required before closing a deal.';
      }
      if (this.form.isWon && this.form.forecastCategory !== 'Closed') {
        return 'Closed won opportunities must use the Closed forecast category.';
      }
      if (!this.form.isWon && this.form.forecastCategory !== 'Omitted') {
        return 'Closed lost opportunities must use the Omitted forecast category.';
      }
    }

    if (this.form.isClosed && this.form.isWon) {
      const handoffError = this.validateHandoffRequirements();
      if (handoffError) {
        return handoffError;
      }
    }

    if (this.isEditMode() && this.originalStage && stage !== this.originalStage && !stage.startsWith('Closed')) {
      if (!this.nextStepDueAtUtc) {
        return 'Next step is required before changing stage. Log an activity with a due date.';
      }
    }

    return null;
  }

  private validateHandoffRequirements(): string | null {
    if (!this.form.deliveryOwnerId) {
      return 'Delivery owner is required for handoff.';
    }
    if (!this.form.deliveryHandoffScope?.trim()) {
      return 'Handoff scope is required before kickoff.';
    }
    if (!this.form.deliveryHandoffRisks?.trim()) {
      return 'Handoff risks are required before kickoff.';
    }
    if (!this.form.deliveryHandoffTimeline?.trim()) {
      return 'Handoff timeline is required before kickoff.';
    }
    return null;
  }
}
