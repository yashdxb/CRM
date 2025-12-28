import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
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
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

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
    NgClass,
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
  private readonly fb = inject(FormBuilder);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly toast = signal<{ tone: 'success' | 'error'; message: string } | null>(null);

  protected readonly timeZoneOptions: Option[] = [
    { label: 'UTC', value: 'UTC' },
    { label: 'America/New_York', value: 'America/New_York' },
    { label: 'America/Chicago', value: 'America/Chicago' },
    { label: 'America/Los_Angeles', value: 'America/Los_Angeles' },
    { label: 'Europe/London', value: 'Europe/London' },
    { label: 'Asia/Kolkata', value: 'Asia/Kolkata' }
  ];

  protected readonly currencyOptions: Option[] = [
    { label: 'USD', value: 'USD' },
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
    this.toast.set(null);
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toast.set({ tone, message });
    setTimeout(() => this.clearToast(), 4000);
  }
}
