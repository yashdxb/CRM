import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';

import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { QualificationModifierRule, QualificationPolicy, QualificationThresholdRule, WorkspaceSettings } from '../models/workspace-settings.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-workspace-settings-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    DecimalPipe,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './workspace-settings.page.html',
  styleUrl: './workspace-settings.page.scss'
})
export class WorkspaceSettingsPage {
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);
  private readonly timeZoneService = inject(TimeZoneService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  // Shared time zone catalog keeps labels and flags consistent across settings screens.
  protected timeZoneOptions: TimeZoneOption[] = [];
  protected readonly getFlagUrl = getTimeZoneFlagUrl;

  protected readonly currencyOptions: Option[] = [
    { label: 'USD', value: 'USD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'INR', value: 'INR' }
  ];

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['USD', [Validators.required]],
    approvalAmountThreshold: [null as number | null, [Validators.min(0)]],
    approvalApproverRole: ['']
  });

  protected readonly qualificationPolicy = signal<QualificationPolicy>(WorkspaceSettingsPage.defaultPolicy());

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

  protected readonly modifierKeyOptions: Option[] = [
    { label: 'Competitive deal', value: 'competitive' },
    { label: 'Executive champion', value: 'executiveChampion' },
    { label: 'Strategic account', value: 'strategic' },
    { label: 'Fast velocity', value: 'fastVelocity' },
    { label: 'Slow velocity', value: 'slowVelocity' }
  ];

  constructor() {
    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timeZoneOptions = options;
    });
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
        this.raiseToast('error', 'Unable to load workspace settings');
      }
    });
  }

  protected saveSettings() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const payload = this.settingsForm.getRawValue();
    const safePayload = {
      ...payload,
      name: payload.name ?? '',
      timeZone: payload.timeZone ?? 'UTC',
      currency: payload.currency ?? 'USD',
      approvalApproverRole: payload.approvalApproverRole ?? '',
      qualificationPolicy: this.qualificationPolicy()
    };
    this.saving.set(true);
    this.settingsService.updateSettings(safePayload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Workspace updated');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save workspace settings');
      }
    });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.settingsForm.patchValue({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: settings.currency,
      approvalAmountThreshold: settings.approvalAmountThreshold ?? null,
      approvalApproverRole: settings.approvalApproverRole ?? ''
    });
    this.qualificationPolicy.set(settings.qualificationPolicy ?? WorkspaceSettingsPage.defaultPolicy());
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
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

  protected addModifierRule() {
    const current = this.qualificationPolicy();
    const nextRule: QualificationModifierRule = { key: 'competitive', delta: 5 };
    this.qualificationPolicy.set({
      ...current,
      modifiers: [...current.modifiers, nextRule]
    });
  }

  protected removeModifierRule(index: number) {
    const current = this.qualificationPolicy();
    const next = current.modifiers.filter((_, idx) => idx !== index);
    this.qualificationPolicy.set({ ...current, modifiers: next });
  }

  protected updateModifierRule(index: number, patch: Partial<QualificationModifierRule>) {
    const current = this.qualificationPolicy();
    const next = current.modifiers.map((rule, idx) => idx === index ? { ...rule, ...patch } : rule);
    this.qualificationPolicy.set({ ...current, modifiers: next });
  }

  protected setPolicyField<K extends keyof QualificationPolicy>(field: K, value: QualificationPolicy[K]) {
    const current = this.qualificationPolicy();
    this.qualificationPolicy.set({ ...current, [field]: value });
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
