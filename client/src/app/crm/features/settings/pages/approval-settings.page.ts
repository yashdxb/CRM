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
import { TooltipModule } from 'primeng/tooltip';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary } from '../models/user-admin.model';
import {
  ApprovalWorkflowPolicy,
  ApprovalWorkflowStep,
  WorkspaceSettings
} from '../models/workspace-settings.model';

@Component({
  selector: 'app-approval-settings-page',
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
    TooltipModule,
    NgIf,
    NgFor,
    BreadcrumbsComponent
  ],
  templateUrl: './approval-settings.page.html',
  styleUrl: './approval-settings.page.scss'
})
export class ApprovalSettingsPage {
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly settingsForm = this.fb.group({
    approvalAmountThreshold: [null as number | null, [Validators.min(0)]],
    approvalApproverRole: ['']
  });

  protected readonly approvalWorkflowPolicy = signal<ApprovalWorkflowPolicy>(
    ApprovalSettingsPage.defaultApprovalPolicy()
  );
  protected readonly roles = signal<RoleSummary[]>([]);

  private loadedSettings: WorkspaceSettings | null = null;

  constructor() {
    this.loadRoles();
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
        this.raiseToast('error', 'Unable to load approval settings');
      }
    });
  }

  private loadRoles() {
    this.userAdminData.getRoles().subscribe({
      next: (roles) => this.roles.set(roles ?? []),
      error: () => this.roles.set([])
    });
  }

  protected saveSettings() {
    if (this.settingsForm.invalid || !this.loadedSettings) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const payload = this.settingsForm.getRawValue();
    const safePayload = {
      name: this.loadedSettings.name ?? 'Workspace',
      timeZone: this.loadedSettings.timeZone ?? 'UTC',
      currency: this.loadedSettings.currency ?? 'USD',
      leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
      approvalAmountThreshold: payload.approvalAmountThreshold ?? null,
      approvalApproverRole: payload.approvalApproverRole ?? '',
      approvalWorkflowPolicy: this.approvalWorkflowPolicy(),
      qualificationPolicy: this.loadedSettings.qualificationPolicy ?? null
    };

    this.saving.set(true);
    this.settingsService.updateSettings(safePayload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Approval settings updated');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save approval settings');
      }
    });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.loadedSettings = settings;
    this.settingsForm.patchValue({
      approvalAmountThreshold: settings.approvalAmountThreshold ?? null,
      approvalApproverRole: settings.approvalApproverRole ?? ''
    });
    this.approvalWorkflowPolicy.set(
      settings.approvalWorkflowPolicy ?? ApprovalSettingsPage.defaultApprovalPolicy()
    );
  }

  protected setApprovalWorkflowEnabled(enabled: boolean) {
    const current = this.approvalWorkflowPolicy();
    this.approvalWorkflowPolicy.set({ ...current, enabled });
  }

  protected addApprovalStep() {
    const current = this.approvalWorkflowPolicy();
    const nextOrder = current.steps.length + 1;
    const nextStep: ApprovalWorkflowStep = {
      order: nextOrder,
      approverRole: '',
      amountThreshold: null,
      purpose: null
    };
    this.approvalWorkflowPolicy.set({ ...current, steps: [...current.steps, nextStep] });
  }

  protected removeApprovalStep(index: number) {
    const current = this.approvalWorkflowPolicy();
    const nextSteps = current.steps.filter((_, idx) => idx != index)
      .map((step, idx) => ({ ...step, order: idx + 1 }));
    this.approvalWorkflowPolicy.set({ ...current, steps: nextSteps });
  }

  protected updateApprovalStep(index: number, patch: Partial<ApprovalWorkflowStep>) {
    const current = this.approvalWorkflowPolicy();
    const nextSteps = current.steps.map((step, idx) => idx === index ? { ...step, ...patch } : step);
    this.approvalWorkflowPolicy.set({ ...current, steps: nextSteps });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  protected roleOptions() {
    return this.roles().map((role) => ({ label: role.name, value: role.name }));
  }

  private static defaultApprovalPolicy(): ApprovalWorkflowPolicy {
    return {
      enabled: true,
      steps: [
        {
          order: 1,
          approverRole: 'Sales Manager',
          amountThreshold: null,
          purpose: null
        }
      ]
    };
  }
}
