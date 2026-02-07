import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { Lead, LeadConversionRequest } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { QualificationPolicy } from '../../settings/models/workspace-settings.model';

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
    InputTextModule,
    TextareaModule,
    SelectModule,
    BreadcrumbsComponent,
],
  templateUrl: './lead-convert.page.html',
  styleUrl: './lead-convert.page.scss'
})
export class LeadConvertPage implements OnInit {
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
  protected readonly qualificationDecision = computed(() => this.evaluateQualification());
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
  private readonly workspaceSettings = inject(WorkspaceSettingsService);

  private leadId: string | null = null;

  ngOnInit() {
    this.leadId = this.route.snapshot.paramMap.get('id');
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

  protected onConvert() {
    if (!this.leadId) return;
    if (!this.canConvert()) return;
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
      error: () => this.saving.set(false)
    });
  }

  protected onCancel() {
    this.router.navigate(['/app/leads']);
  }

  protected onFormChange() {
    this.form.set({ ...this.form() });
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
      thresholdRules: [],
      modifiers: [
        { key: 'competitive', delta: 10 },
        { key: 'executiveChampion', delta: -15 },
        { key: 'strategic', delta: -15 },
        { key: 'fastVelocity', delta: -10 },
        { key: 'slowVelocity', delta: 10 }
      ]
    };
  }
}
