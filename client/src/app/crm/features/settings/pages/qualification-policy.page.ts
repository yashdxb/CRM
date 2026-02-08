import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import {
  QualificationModifierRule,
  QualificationPolicy,
  WorkspaceSettings
} from '../models/workspace-settings.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-qualification-policy-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
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
  templateUrl: './qualification-policy.page.html',
  styleUrl: './qualification-policy.page.scss'
})
export class QualificationPolicyPage {
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['USD', [Validators.required]]
  });

  protected readonly qualificationPolicy = signal<QualificationPolicy>(QualificationPolicyPage.defaultPolicy());

  protected readonly modifierKeyOptions: Option[] = [
    { label: 'Competitive deal', value: 'competitive' },
    { label: 'Executive champion', value: 'executiveChampion' },
    { label: 'Strategic account', value: 'strategic' },
    { label: 'Fast velocity', value: 'fastVelocity' },
    { label: 'Slow velocity', value: 'slowVelocity' }
  ];

  private loadedSettings: WorkspaceSettings | null = null;

  constructor() {
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
        this.raiseToast('error', 'Unable to load qualification policy');
      }
    });
  }

  protected saveSettings() {
    if (!this.loadedSettings) {
      return;
    }

    const safePayload = {
      name: this.loadedSettings.name ?? 'Workspace',
      timeZone: this.loadedSettings.timeZone ?? 'UTC',
      currency: this.loadedSettings.currency ?? 'USD',
      leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
      approvalAmountThreshold: this.loadedSettings.approvalAmountThreshold ?? null,
      approvalApproverRole: this.loadedSettings.approvalApproverRole ?? '',
      approvalWorkflowPolicy: this.loadedSettings.approvalWorkflowPolicy ?? null,
      qualificationPolicy: this.qualificationPolicy()
    };

    this.saving.set(true);
    this.settingsService.updateSettings(safePayload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Qualification policy updated');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save qualification policy');
      }
    });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.loadedSettings = settings;
    this.settingsForm.patchValue({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: settings.currency
    });
    this.qualificationPolicy.set(settings.qualificationPolicy ?? QualificationPolicyPage.defaultPolicy());
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

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
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
