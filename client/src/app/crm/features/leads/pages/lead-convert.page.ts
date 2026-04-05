import { Component, DestroyRef, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { Lead, LeadConversionReadiness, LeadConversionRequest } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { QualificationPolicy } from '../../settings/models/workspace-settings.model';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';

@Component({
  selector: 'app-lead-convert-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    BreadcrumbsComponent,
],
  templateUrl: './lead-convert.page.html',
  styleUrl: './lead-convert.page.scss'
})
export class LeadConvertPage implements OnInit, OnDestroy {
  protected readonly lead = signal<Lead | null>(null);
  protected readonly saving = signal(false);
  protected readonly form = signal<LeadConversionRequest>({
    createAccount: true,
    accountName: '',
    createContact: true,
    createOpportunity: true,
    opportunityName: '',
    amount: 0,
    expectedCloseDate: '',
    dealType: 'Inbound',
    segment: 'SMB',
    stage: 'Qualification',
    isCompetitive: false,
    hasExecutiveChampion: false,
    isStrategic: false,
    velocity: 'Normal',
    managerApproved: false,
    overrideReason: ''
  });
  protected readonly qualificationPolicy = signal<QualificationPolicy>(LeadConvertPage.defaultPolicy());
  protected readonly presenceUsers = signal<Array<{ userId: string; displayName: string; isEditing: boolean }>>([]);
  protected readonly qualificationDecision = computed(() => this.evaluateQualification());
  protected readonly conversionReadiness = computed<LeadConversionReadiness | null>(() => this.lead()?.conversionReadiness ?? null);
  protected readonly canConvert = computed(() => {
    const value = this.form();
    if (value.createOpportunity && !value.createAccount) {
      return false;
    }
    const decision = this.qualificationDecision();
    if (decision.blocked) return false;
    if (decision.requiresManagerApproval && !value.managerApproved) return false;
    if (decision.requiresOverrideReason && !value.overrideReason?.trim()) return false;
    return true;
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly leadData = inject(LeadDataService);
  private readonly toastService = inject(AppToastService);
  private readonly workspaceSettings = inject(WorkspaceSettingsService);
  private readonly crmEvents = inject(CrmEventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserId = readUserId();

  private leadId: string | null = null;
  private localEditingState = false;

  ngOnInit() {
    this.leadId = this.route.snapshot.paramMap.get('id');
    if (this.leadId) {
      this.initializePresence(this.leadId);
    }
    this.workspaceSettings.getSettings().subscribe({
      next: (settings) => {
        if (settings?.qualificationPolicy) {
          this.qualificationPolicy.set(settings.qualificationPolicy);
        }
      },
      error: () => {
        this.qualificationPolicy.set(LeadConvertPage.defaultPolicy());
      }
    });
    const lead = history.state?.lead as Lead | undefined;
    if (lead) {
      this.setLead(lead);
      return;
    }

    if (this.leadId) {
      this.leadData.get(this.leadId).subscribe({
        next: (data) => this.setLead(data),
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  ngOnDestroy(): void {
    this.resetEditingPresence();
    if (this.leadId) {
      this.crmEvents.leaveRecordPresence('lead', this.leadId);
    }
  }

  protected onConvert() {
    if (!this.leadId) return;
    if (!this.canConvert()) return;
    this.resetEditingPresence();
    const value = this.form();
    const closeDate = value.expectedCloseDate as unknown;
    const expectedCloseDate = closeDate instanceof Date
      ? closeDate.toISOString()
      : (typeof closeDate === 'string' && closeDate.trim() ? closeDate : undefined);
    const payload: LeadConversionRequest = {
      ...value,
      expectedCloseDate
    };
    this.saving.set(true);
    this.leadData.convert(this.leadId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/app/leads'], { state: { toast: { tone: 'success', message: 'Lead converted.' } } });
      },
      error: () => {
        this.toastService.show('error', 'Lead conversion failed. Please try again.', 3000);
        this.saving.set(false);
      }
    });
  }

  protected onCancel() {
    this.resetEditingPresence();
    this.router.navigate(['/app/leads']);
  }

  protected onFormChange() {
    this.form.set({ ...this.form() });
    this.markEditingPresence();
  }

  protected visiblePresenceUsers(): Array<{ userId: string; displayName: string; isEditing: boolean }> {
    return this.presenceUsers().filter((viewer) => viewer.userId !== this.currentUserId);
  }

  protected presenceSummaryText(): string {
    const viewers = this.visiblePresenceUsers();
    if (!viewers.length) {
      return '';
    }

    const editors = viewers.filter((viewer) => viewer.isEditing).length;
    if (editors > 0) {
      return `${viewers.length} collaborator${viewers.length > 1 ? 's' : ''} viewing • ${editors} editing`;
    }

    return `${viewers.length} collaborator${viewers.length > 1 ? 's' : ''} viewing`;
  }

  private initializePresence(recordId: string): void {
    this.crmEvents.joinRecordPresence('lead', recordId);
    this.crmEvents.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event?.payload) {
          return;
        }

        const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
        const payloadRecordId = String(event.payload['recordId'] ?? '');
        if (entityType !== 'lead' || payloadRecordId !== recordId) {
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
          this.presenceUsers.set(users);
          return;
        }

        if (event.eventType !== 'record.presence.changed') {
          return;
        }

        const userId = String(event.payload['userId'] ?? '');
        const displayName = String(event.payload['displayName'] ?? 'User');
        const action = String(event.payload['action'] ?? '').toLowerCase();
        const isEditing = !!event.payload['isEditing'];
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
              return users.map((user) =>
                user.userId === userId ? { ...user, displayName, isEditing: nextEditingState } : user
              );
            }
            return [...users, { userId, displayName, isEditing: nextEditingState }];
          }

          return users;
        });
      });
  }

  private markEditingPresence(): void {
    if (!this.leadId || this.localEditingState) {
      return;
    }

    this.localEditingState = true;
    this.crmEvents.setRecordEditingState('lead', this.leadId, true);
  }

  private resetEditingPresence(): void {
    if (!this.leadId || !this.localEditingState) {
      return;
    }

    this.localEditingState = false;
    this.crmEvents.setRecordEditingState('lead', this.leadId, false);
  }

  private setLead(lead: Lead) {
    this.lead.set(lead);
    const accountName = lead.company || lead.name;
    const opportunityName = `${accountName} Opportunity`;
    this.form.set({
      createAccount: true,
      accountName,
      createContact: true,
      createOpportunity: true,
      opportunityName,
      amount: 0,
      expectedCloseDate: '',
      dealType: 'Inbound',
      segment: 'SMB',
      stage: 'Qualification',
      isCompetitive: false,
      hasExecutiveChampion: false,
      isStrategic: false,
      velocity: 'Normal',
      managerApproved: false,
      overrideReason: ''
    });
  }

  protected readonly dealTypeOptions = [
    { label: 'Inbound', value: 'Inbound' },
    { label: 'Outbound', value: 'Outbound' },
    { label: 'Expansion', value: 'Expansion' },
    { label: 'Partner', value: 'Partner' }
  ];

  protected readonly segmentOptions = [
    { label: 'SMB', value: 'SMB' },
    { label: 'Mid', value: 'Mid' },
    { label: 'Enterprise', value: 'Enterprise' }
  ];

  protected readonly stageOptions = [
    { label: 'Discovery', value: 'Discovery' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' }
  ];

  protected readonly velocityOptions = [
    { label: 'Fast', value: 'Fast' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Slow', value: 'Slow' }
  ];

  private evaluateQualification() {
    const lead = this.lead();
    if (!lead) {
      return {
        score: 0,
        adjustedThreshold: 0,
        band: 'Unknown',
        blocked: true,
        requiresManagerApproval: false,
        requiresOverrideReason: false,
        message: 'Lead not loaded.'
      };
    }

    const policy = this.qualificationPolicy();
    const score = lead.score ?? 0;
    const baseThreshold = this.resolveThreshold(policy);
    const adjustedThreshold = this.applyModifiers(baseThreshold, policy);
    const belowThreshold = score < adjustedThreshold;
    const requiresManagerApproval = score < policy.managerApprovalBelow;
    const blocked = score < policy.blockBelow && !policy.allowOverrides;
    const requiresOverrideReason = policy.requireOverrideReason && belowThreshold;

    const band = score >= adjustedThreshold
      ? 'Strong'
      : score >= policy.managerApprovalBelow
        ? 'Moderate'
        : score >= policy.blockBelow
          ? 'Weak'
          : 'Unqualified';

    const message = blocked
      ? `Score ${score}/100 is below the minimum threshold (${policy.blockBelow}).`
      : belowThreshold
        ? `Score ${score}/100 is below the required threshold (${adjustedThreshold}).`
        : `Score ${score}/100 meets the conversion threshold.`;

    return {
      score,
      adjustedThreshold,
      band,
      blocked,
      requiresManagerApproval,
      requiresOverrideReason,
      message
    };
  }

  private resolveThreshold(policy: QualificationPolicy): number {
    if (!policy.thresholdRules?.length) {
      return policy.defaultThreshold;
    }
    const { dealType = 'All', segment = 'All', stage = 'All' } = this.form();
    let bestRule = policy.defaultThreshold;
    let bestScore = -1;
    for (const rule of policy.thresholdRules) {
      if (!this.matches(rule.segment, segment ?? 'All')) continue;
      if (!this.matches(rule.dealType, dealType ?? 'All')) continue;
      if (!this.matches(rule.stage, stage ?? 'All')) continue;
      let score = 0;
      if (!this.isWildcard(rule.segment)) score += 1;
      if (!this.isWildcard(rule.dealType)) score += 1;
      if (!this.isWildcard(rule.stage)) score += 1;
      if (score > bestScore || (score === bestScore && rule.threshold > bestRule)) {
        bestRule = rule.threshold;
        bestScore = score;
      }
    }
    return bestRule;
  }

  private applyModifiers(base: number, policy: QualificationPolicy): number {
    let adjusted = base;
    for (const modifier of policy.modifiers ?? []) {
      if (this.isModifierActive(modifier.key)) {
        adjusted += modifier.delta;
      }
    }
    return Math.min(100, Math.max(0, adjusted));
  }

  private isModifierActive(key: string): boolean {
    const normalized = (key ?? '').toLowerCase();
    const form = this.form();
    if (normalized === 'competitive') return !!form.isCompetitive;
    if (normalized === 'executivechampion') return !!form.hasExecutiveChampion;
    if (normalized === 'strategic') return !!form.isStrategic;
    if (normalized === 'fastvelocity') return form.velocity === 'Fast';
    if (normalized === 'slowvelocity') return form.velocity === 'Slow';
    return false;
  }

  private matches(ruleValue: string, actual: string) {
    if (this.isWildcard(ruleValue)) return true;
    return ruleValue.toLowerCase() === actual.toLowerCase();
  }

  private isWildcard(value: string) {
    return !value || value.toLowerCase() === 'all';
  }

  private static defaultPolicy(): QualificationPolicy {
    return {
      defaultThreshold: 75,
      managerApprovalBelow: 50,
      blockBelow: 25,
      allowOverrides: true,
      requireOverrideReason: true,
      showCqvsInLeadList: false,
      requireEvidenceBeforeQualified: true,
      minimumEvidenceCoveragePercent: 50,
      factors: [
        { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
        { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
        { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
        { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
        { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
        { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
      ],
      factorEvidenceRules: [
        { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
        { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention'] },
        { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
        { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript'] },
        { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference'] },
        { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call'] }
      ],
      thresholdRules: [],
      modifiers: [
        { key: 'competitive', delta: 10 },
        { key: 'executiveChampion', delta: -15 },
        { key: 'strategic', delta: -15 },
        { key: 'fastVelocity', delta: -10 },
        { key: 'slowVelocity', delta: 10 }
      ],
      exposureWeights: [
        { key: 'budget', weight: 25 },
        { key: 'timeline', weight: 20 },
        { key: 'economicBuyer', weight: 20 },
        { key: 'problem', weight: 15 },
        { key: 'readiness', weight: 10 },
        { key: 'icpFit', weight: 10 }
      ],
      leadDataWeights: [
        { key: 'firstNameLastName', weight: 16 },
        { key: 'email', weight: 24 },
        { key: 'phone', weight: 24 },
        { key: 'companyName', weight: 16 },
        { key: 'jobTitle', weight: 12 },
        { key: 'source', weight: 8 }
      ],
      evidenceSources: [
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
      ]
    };
  }

  protected conversionReadinessReasons(): string[] {
    return this.conversionReadiness()?.reasons ?? [];
  }
}
