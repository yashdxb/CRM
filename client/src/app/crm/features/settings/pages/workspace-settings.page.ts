import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
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
import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary } from '../models/user-admin.model';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-workspace-settings-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
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
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);
  private readonly timeZoneService = inject(TimeZoneService);
  private readonly referenceData = inject(ReferenceDataService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );
  protected readonly roles = signal<RoleSummary[]>([]);

  // Shared time zone catalog keeps labels and flags consistent across settings screens.
  protected timeZoneOptions: TimeZoneOption[] = [];
  protected readonly getFlagUrl = getTimeZoneFlagUrl;

  protected currencyOptions: Option[] = [];

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['', [Validators.required]],
    leadFirstTouchSlaHours: [24, [Validators.min(1), Validators.max(168)]],
    defaultContractTermMonths: [12, [Validators.min(1), Validators.max(120)]],
    defaultDeliveryOwnerRoleId: [null as string | null],
    scoreWeightSlaBreaches: [14, [Validators.min(0), Validators.max(100)]],
    scoreWeightStaleOpportunities: [12, [Validators.min(0), Validators.max(100)]],
    scoreWeightPendingApprovals: [17, [Validators.min(0), Validators.max(100)]],
    scoreWeightLowConfidenceLeads: [9, [Validators.min(0), Validators.max(100)]],
    scoreWeightOverdueActivities: [11, [Validators.min(0), Validators.max(100)]],
    scoreMediumRiskFrom: [45, [Validators.min(1), Validators.max(95)]],
    scoreHighRiskFrom: [75, [Validators.min(5), Validators.max(99)]],
    scoreSoonUrgencyFrom: [50, [Validators.min(1), Validators.max(95)]],
    scoreImmediateUrgencyFrom: [80, [Validators.min(5), Validators.max(99)]]
  });

  constructor() {
    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timeZoneOptions = options;
    });
    this.loadCurrencies();
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
      currency: this.resolveCurrency(payload.currency ?? null),
      leadFirstTouchSlaHours: payload.leadFirstTouchSlaHours ?? 24,
      defaultContractTermMonths: payload.defaultContractTermMonths ?? 12,
      defaultDeliveryOwnerRoleId: payload.defaultDeliveryOwnerRoleId ?? null,
      assistantActionScoringPolicy: {
        weights: {
          slaBreaches: Number(payload.scoreWeightSlaBreaches ?? 14),
          staleOpportunities: Number(payload.scoreWeightStaleOpportunities ?? 12),
          pendingApprovals: Number(payload.scoreWeightPendingApprovals ?? 17),
          lowConfidenceLeads: Number(payload.scoreWeightLowConfidenceLeads ?? 9),
          overdueActivities: Number(payload.scoreWeightOverdueActivities ?? 11)
        },
        thresholds: {
          mediumRiskFrom: Number(payload.scoreMediumRiskFrom ?? 45),
          highRiskFrom: Number(payload.scoreHighRiskFrom ?? 75),
          soonUrgencyFrom: Number(payload.scoreSoonUrgencyFrom ?? 50),
          immediateUrgencyFrom: Number(payload.scoreImmediateUrgencyFrom ?? 80)
        }
      }
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
      currency: this.resolveCurrency(settings.currency ?? null),
      leadFirstTouchSlaHours: settings.leadFirstTouchSlaHours ?? 24,
      defaultContractTermMonths: settings.defaultContractTermMonths ?? 12,
      defaultDeliveryOwnerRoleId: settings.defaultDeliveryOwnerRoleId ?? null,
      scoreWeightSlaBreaches: settings.assistantActionScoringPolicy?.weights?.slaBreaches ?? 14,
      scoreWeightStaleOpportunities: settings.assistantActionScoringPolicy?.weights?.staleOpportunities ?? 12,
      scoreWeightPendingApprovals: settings.assistantActionScoringPolicy?.weights?.pendingApprovals ?? 17,
      scoreWeightLowConfidenceLeads: settings.assistantActionScoringPolicy?.weights?.lowConfidenceLeads ?? 9,
      scoreWeightOverdueActivities: settings.assistantActionScoringPolicy?.weights?.overdueActivities ?? 11,
      scoreMediumRiskFrom: settings.assistantActionScoringPolicy?.thresholds?.mediumRiskFrom ?? 45,
      scoreHighRiskFrom: settings.assistantActionScoringPolicy?.thresholds?.highRiskFrom ?? 75,
      scoreSoonUrgencyFrom: settings.assistantActionScoringPolicy?.thresholds?.soonUrgencyFrom ?? 50,
      scoreImmediateUrgencyFrom: settings.assistantActionScoringPolicy?.thresholds?.immediateUrgencyFrom ?? 80
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  protected roleOptions() {
    return this.roles().map((role) => ({ label: role.name, value: role.id }));
  }

  private loadRoles() {
    this.userAdminData.getRoles().subscribe({
      next: (roles) => this.roles.set(roles ?? []),
      error: () => this.roles.set([])
    });
  }

  protected currentCurrency() {
    return this.settingsForm.value.currency || this.currencyOptions[0]?.value || '';
  }

  private loadCurrencies() {
    this.referenceData.getCurrencies().subscribe((items) => {
      this.currencyOptions = items
        .filter((currency) => currency.isActive)
        .map((currency) => ({
          label: currency.code,
          value: currency.code
        }));
      const fallback = this.currencyOptions[0]?.value;
      if (fallback && !this.settingsForm.value.currency) {
        this.settingsForm.patchValue({ currency: fallback });
      }
    });
  }

  private resolveCurrency(value: string | null) {
    return value || this.currencyOptions[0]?.value || '';
  }

}
