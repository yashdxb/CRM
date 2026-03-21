import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TextareaModule } from 'primeng/textarea';

import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { VerticalPresetConfiguration, WorkspaceSettings } from '../models/workspace-settings.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary } from '../models/user-admin.model';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { TenantContextService } from '../../../../core/tenant/tenant-context.service';

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
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    InputTextModule,
    SelectModule,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    TextareaModule,
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
  private readonly tenantContext = inject(TenantContextService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly effectiveFeatureFlags = signal<Record<string, boolean>>({});
  private latestSettings: WorkspaceSettings | null = null;

  // Shared time zone catalog keeps labels and flags consistent across settings screens.
  protected timeZoneOptions: TimeZoneOption[] = [];
  protected readonly getFlagUrl = getTimeZoneFlagUrl;

  protected currencyOptions: Option[] = [];
  protected readonly verticalPresetOptions: Option[] = [
    { label: 'Core CRM', value: 'CoreCRM' },
    { label: 'Real Estate Brokerage', value: 'RealEstateBrokerage' }
  ];
  protected readonly activeVerticalPresetConfiguration = signal<VerticalPresetConfiguration | null>(null);
  protected readonly presetApplying = signal(false);
  protected readonly presetApplied = computed(() => !!this.activeVerticalPresetConfiguration());

  protected readonly reportDesignerPermissionOptions: Option[] = [
    { label: 'Admins Only (Administration Manage)', value: 'Permissions.Administration.Manage' },
    { label: 'Reports Design Permission', value: 'Permissions.Reports.Design' },
    { label: 'Reports Manage Permission', value: 'Permissions.Reports.Manage' },
    { label: 'Reports View Permission', value: 'Permissions.Reports.View' }
  ];

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['', [Validators.required]],
    industryPreset: ['CoreCRM', [Validators.required]],
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
    scoreImmediateUrgencyFrom: [80, [Validators.min(5), Validators.max(99)]],
    supportingDocsMaxPerRecord: [10, [Validators.min(1), Validators.max(100)]],
    supportingDocsMaxFileSizeMb: [10, [Validators.min(1), Validators.max(100)]],
    featureProperties: [false],
    featureAuthEntra: [false],
    featureRealtimeDashboard: [false],
    featureRealtimePipeline: [false],
    featureRealtimeEntityCrud: [false],
    featureRealtimeImportProgress: [false],
    featureRealtimeRecordPresence: [false],
    featureRealtimeAssistantStreaming: [false],
    featureAiKnowledgeSearch: [true],
    featureHelpDeskCases: [false],
    featureHelpDeskEmailIntake: [false],
    featureHelpDeskRealtime: [false],
    featureEmailDelivery: [false],
    featureEmailDeliveryInvites: [false],
    featureEmailDeliverySecurity: [false],
    featureEmailDeliveryApprovals: [false],
    featureEmailDeliveryProposals: [false],
    featureEmailDeliveryMarketing: [false],
    featureEmailDeliveryNotifications: [false],
    featureEmailDeliveryMailbox: [false],
    featureEmailDeliveryStatusNotifications: [false],
    reportDesignerRequiredPermission: ['Permissions.Administration.Manage']
  });

  constructor() {
    this.settingsForm.get('featureEmailDelivery')?.valueChanges.subscribe((enabled) => {
      if (enabled) {
        return;
      }

      this.settingsForm.patchValue({
        featureEmailDeliveryInvites: false,
        featureEmailDeliverySecurity: false,
        featureEmailDeliveryApprovals: false,
        featureEmailDeliveryProposals: false,
        featureEmailDeliveryMarketing: false,
        featureEmailDeliveryNotifications: false,
        featureEmailDeliveryMailbox: false,
        featureEmailDeliveryStatusNotifications: false
      }, { emitEvent: false });
    });

    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timeZoneOptions = options;
    });
    this.loadCurrencies();
    this.loadRoles();
    this.loadTenantContext();
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
      industryPreset: payload.industryPreset ?? 'CoreCRM',
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
      },
      supportingDocumentPolicy: {
        maxDocumentsPerRecord: Number(payload.supportingDocsMaxPerRecord ?? 10),
        maxFileSizeMb: Number(payload.supportingDocsMaxFileSizeMb ?? 10),
        allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.webp']
      },
      featureFlags: {
        properties: !!payload.featureProperties,
        'auth.entra': !!payload.featureAuthEntra,
        'realtime.dashboard': !!payload.featureRealtimeDashboard,
        'realtime.pipeline': !!payload.featureRealtimePipeline,
        'realtime.entityCrud': !!payload.featureRealtimeEntityCrud,
        'realtime.importProgress': !!payload.featureRealtimeImportProgress,
        'realtime.recordPresence': !!payload.featureRealtimeRecordPresence,
        'realtime.assistantStreaming': !!payload.featureRealtimeAssistantStreaming,
        'ai.knowledgeSearch': !!payload.featureAiKnowledgeSearch,
        'helpdesk.cases': !!payload.featureHelpDeskCases,
        'helpdesk.emailIntake': !!payload.featureHelpDeskEmailIntake,
        'helpdesk.realtime': !!payload.featureHelpDeskRealtime,
        'communications.emailDelivery': !!payload.featureEmailDelivery,
        'communications.emailDelivery.invites': !!payload.featureEmailDeliveryInvites,
        'communications.emailDelivery.security': !!payload.featureEmailDeliverySecurity,
        'communications.emailDelivery.approvals': !!payload.featureEmailDeliveryApprovals,
        'communications.emailDelivery.proposals': !!payload.featureEmailDeliveryProposals,
        'communications.emailDelivery.marketing': !!payload.featureEmailDeliveryMarketing,
        'communications.emailDelivery.notifications': !!payload.featureEmailDeliveryNotifications,
        'communications.emailDelivery.mailbox': !!payload.featureEmailDeliveryMailbox,
        'communications.emailDelivery.statusNotifications': !!payload.featureEmailDeliveryStatusNotifications
      },
      reportDesignerRequiredPermission: payload.reportDesignerRequiredPermission || null
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
    this.latestSettings = settings;
    this.settingsForm.patchValue({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: this.resolveCurrency(settings.currency ?? null),
      industryPreset: settings.industryPreset || settings.verticalPresetConfiguration?.presetId || 'CoreCRM',
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
      scoreImmediateUrgencyFrom: settings.assistantActionScoringPolicy?.thresholds?.immediateUrgencyFrom ?? 80,
      supportingDocsMaxPerRecord: settings.supportingDocumentPolicy?.maxDocumentsPerRecord ?? 10,
      supportingDocsMaxFileSizeMb: settings.supportingDocumentPolicy?.maxFileSizeMb ?? 10,
      featureProperties: this.resolveFeatureFlag(settings.featureFlags, 'properties'),
      featureAuthEntra: this.resolveFeatureFlag(settings.featureFlags, 'auth.entra'),
      featureRealtimeDashboard: this.resolveFeatureFlag(settings.featureFlags, 'realtime.dashboard'),
      featureRealtimePipeline: this.resolveFeatureFlag(settings.featureFlags, 'realtime.pipeline'),
      featureRealtimeEntityCrud: this.resolveFeatureFlag(settings.featureFlags, 'realtime.entityCrud'),
      featureRealtimeImportProgress: this.resolveFeatureFlag(settings.featureFlags, 'realtime.importProgress'),
      featureRealtimeRecordPresence: this.resolveFeatureFlag(settings.featureFlags, 'realtime.recordPresence'),
      featureRealtimeAssistantStreaming: this.resolveFeatureFlag(settings.featureFlags, 'realtime.assistantStreaming'),
      featureAiKnowledgeSearch: this.resolveFeatureFlag(settings.featureFlags, 'ai.knowledgeSearch', true),
      featureHelpDeskCases: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.cases'),
      featureHelpDeskEmailIntake: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.emailIntake'),
      featureHelpDeskRealtime: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.realtime'),
      featureEmailDelivery: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery'),
      featureEmailDeliveryInvites: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.invites'),
      featureEmailDeliverySecurity: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.security'),
      featureEmailDeliveryApprovals: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.approvals'),
      featureEmailDeliveryProposals: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.proposals'),
      featureEmailDeliveryMarketing: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.marketing'),
      featureEmailDeliveryNotifications: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.notifications'),
      featureEmailDeliveryMailbox: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.mailbox'),
      featureEmailDeliveryStatusNotifications: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.statusNotifications'),
      reportDesignerRequiredPermission: settings.reportDesignerRequiredPermission || 'Permissions.Administration.Manage'
    });
    this.activeVerticalPresetConfiguration.set(settings.verticalPresetConfiguration ?? null);
  }

  protected applyVerticalPreset(resetExisting: boolean) {
    const presetId = this.settingsForm.getRawValue().industryPreset || 'CoreCRM';
    this.presetApplying.set(true);
    this.settingsService.applyVerticalPreset({ presetId, resetExisting }).subscribe({
      next: (settings) => {
        this.presetApplying.set(false);
        this.applySettings(settings);
        this.raiseToast('success', resetExisting ? 'Vertical preset reset and applied.' : 'Vertical preset applied.');
      },
      error: () => {
        this.presetApplying.set(false);
        this.raiseToast('error', 'Unable to apply vertical preset.');
      }
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
    return this.settingsForm.value.currency || '';
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

  private loadTenantContext() {
    this.tenantContext.getTenantContext().subscribe({
      next: (context) => {
        this.effectiveFeatureFlags.set(context.featureFlags ?? {});
        if (this.latestSettings) {
          this.applySettings(this.latestSettings);
        }
      },
      error: () => this.effectiveFeatureFlags.set({})
    });
  }

  private resolveFeatureFlag(overrides: Record<string, boolean> | null | undefined, key: string, defaultValue = false): boolean {
    if (typeof overrides?.[key] === 'boolean') {
      return !!overrides[key];
    }

    const effective = this.effectiveFeatureFlags()[key];
    return typeof effective === 'boolean' ? effective : defaultValue;
  }

}
