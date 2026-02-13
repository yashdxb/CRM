import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import {
  QualificationPolicy,
  QualificationThresholdRule,
  WorkspaceSettings
} from '../models/workspace-settings.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-qualification-thresholds-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputNumberModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    NgIf,
    NgFor,
    BreadcrumbsComponent
  ],
  templateUrl: './qualification-thresholds.page.html',
  styleUrl: './qualification-thresholds.page.scss'
})
export class QualificationThresholdsPage {
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);
  private readonly referenceData = inject(ReferenceDataService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['', [Validators.required]]
  });

  protected readonly qualificationPolicy = signal<QualificationPolicy>(QualificationThresholdsPage.defaultPolicy());

  protected readonly dealTypeOptions: Option[] = [
    { label: 'All', value: 'All' },
    { label: 'Inbound', value: 'Inbound' },
    { label: 'Outbound', value: 'Outbound' },
    { label: 'Expansion', value: 'Expansion' },
    { label: 'Partner', value: 'Partner' }
  ];

  protected readonly segmentOptions: Option[] = [
    { label: 'All', value: 'All' },
    { label: 'SMB', value: 'SMB' },
    { label: 'Mid', value: 'Mid' },
    { label: 'Enterprise', value: 'Enterprise' }
  ];

  protected readonly stageOptions: Option[] = [
    { label: 'All', value: 'All' },
    { label: 'Discovery', value: 'Discovery' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' }
  ];

  private loadedSettings: WorkspaceSettings | null = null;
  private currencyFallback = '';

  constructor() {
    this.loadCurrencyFallback();
    this.loadSettings();
  }

  protected loadSettings() {
    this.loading.set(true);
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load contextual thresholds');
      }
    });
  }

  protected saveSettings() {
    if (!this.loadedSettings) {
      return;
    }

    const currentPolicy = this.qualificationPolicy();
    const safePayload = {
      name: this.loadedSettings.name ?? 'Workspace',
      timeZone: this.loadedSettings.timeZone ?? 'UTC',
      currency: this.resolveCurrency(this.loadedSettings.currency ?? null),
      leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
      defaultContractTermMonths: this.loadedSettings.defaultContractTermMonths ?? null,
      defaultDeliveryOwnerRoleId: this.loadedSettings.defaultDeliveryOwnerRoleId ?? null,
      approvalAmountThreshold: this.loadedSettings.approvalAmountThreshold ?? null,
      approvalApproverRole: this.loadedSettings.approvalApproverRole ?? '',
      approvalWorkflowPolicy: this.loadedSettings.approvalWorkflowPolicy ?? null,
      qualificationPolicy: {
        ...currentPolicy,
        thresholdRules: currentPolicy.thresholdRules
      }
    };

    this.saving.set(true);
    this.settingsService.updateSettings(safePayload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Contextual thresholds updated');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save contextual thresholds');
      }
    });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.loadedSettings = settings;
    this.settingsForm.patchValue({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: this.resolveCurrency(settings.currency ?? null)
    });
    const policy = settings.qualificationPolicy ?? QualificationThresholdsPage.defaultPolicy();
    const normalized = {
      ...QualificationThresholdsPage.defaultPolicy(),
      ...policy,
      exposureWeights: (policy.exposureWeights && policy.exposureWeights.length > 0)
        ? policy.exposureWeights
        : QualificationThresholdsPage.defaultPolicy().exposureWeights,
      evidenceSources: (policy.evidenceSources && policy.evidenceSources.length > 0)
        ? policy.evidenceSources
        : QualificationThresholdsPage.defaultPolicy().evidenceSources
    };
    this.qualificationPolicy.set(normalized);
  }

  protected addThresholdRule() {
    const current = this.qualificationPolicy();
    const nextRule: QualificationThresholdRule = {
      segment: 'All',
      dealType: 'All',
      stage: 'All',
      threshold: current.defaultThreshold
    };
    this.qualificationPolicy.set({
      ...current,
      thresholdRules: [...current.thresholdRules, nextRule]
    });
  }

  protected removeThresholdRule(index: number) {
    const current = this.qualificationPolicy();
    const next = current.thresholdRules.filter((_, idx) => idx !== index);
    this.qualificationPolicy.set({ ...current, thresholdRules: next });
  }

  protected updateThresholdRule(index: number, patch: Partial<QualificationThresholdRule>) {
    const current = this.qualificationPolicy();
    const next = current.thresholdRules.map((rule, idx) => idx === index ? { ...rule, ...patch } : rule);
    this.qualificationPolicy.set({ ...current, thresholdRules: next });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadCurrencyFallback() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.settingsForm.value.currency && this.currencyFallback) {
        this.settingsForm.patchValue({ currency: this.currencyFallback });
      }
    });
  }

  private resolveCurrency(value: string | null) {
    return value || this.currencyFallback || '';
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
      ],
      exposureWeights: [
        { key: 'budget', weight: 25 },
        { key: 'timeline', weight: 20 },
        { key: 'economicBuyer', weight: 20 },
        { key: 'problem', weight: 15 },
        { key: 'readiness', weight: 10 },
        { key: 'icpFit', weight: 10 }
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
}
