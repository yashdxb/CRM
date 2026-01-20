import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';

import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { WorkspaceSettings } from '../models/workspace-settings.model';
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
    InputTextModule,
    InputNumberModule,
    SelectModule,
    DecimalPipe,
    NgFor,
    NgIf,
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
      approvalApproverRole: payload.approvalApproverRole ?? ''
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
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
