import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { TenantSummary } from '../models/tenant-admin.model';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { VerticalPresetConfiguration, WorkspaceSettings } from '../models/workspace-settings.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { getTenantKey, setTenantKey } from '../../../../core/tenant/tenant.utils';

interface Option { label: string; value: string; }

@Component({
  selector: 'app-tenants-page',
  standalone: true,
  imports: [
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    SelectModule,
    SkeletonModule,
    TabsModule,
    TagModule,
    TooltipModule,
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    BreadcrumbsComponent
  ],
  templateUrl: './tenants.page.html',
  styleUrl: './tenants.page.scss'
})
export class TenantsPage {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(TenantAdminDataService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);

  protected readonly loading = signal(true);
  protected readonly tenants = signal<TenantSummary[]>([]);
  protected readonly activeTenantKey = signal(getTenantKey());
  protected readonly tenantOptions = computed(() =>
    this.tenants().map((tenant) => ({
      label: `${tenant.name} (${tenant.key})`,
      value: tenant.key
    }))
  );
  protected readonly activeTenant = computed(() =>
    this.tenants().find((tenant) => tenant.key === this.activeTenantKey()) ?? null
  );
  protected readonly canManageTenants = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.tenantsManage)
  );

  protected readonly totalTenants = computed(() => this.tenants().length);

  /* ── Feature-flag config tab ── */
  protected readonly activeConfigTab = signal<string>('modules');
  protected readonly savingFlags = signal(false);

  /* ── Vertical preset ── */
  protected readonly verticalPresetOptions: Option[] = [
    { label: 'Core CRM', value: 'CoreCRM' },
    { label: 'Real Estate Brokerage', value: 'RealEstateBrokerage' }
  ];
  protected readonly activeVerticalPresetConfiguration = signal<VerticalPresetConfiguration | null>(null);
  protected readonly presetApplying = signal(false);
  protected readonly presetApplied = computed(() => !!this.activeVerticalPresetConfiguration());

  protected readonly flagsForm = this.fb.group({
    industryPreset: ['CoreCRM'],
    featureProperties: [false],
    featureMarketingCampaigns: [false],
    featureHelpDeskCases: [false],
    featureHelpDeskEmailIntake: [false],
    featureHelpDeskRealtime: [false],
    featureRealtimeDashboard: [false],
    featureRealtimePipeline: [false],
    featureRealtimeEntityCrud: [false],
    featureRealtimeImportProgress: [false],
    featureRealtimeRecordPresence: [false],
    featureRealtimeAssistantStreaming: [false],
    featureAiKnowledgeSearch: [true],
    featureEmailDelivery: [false],
    featureEmailDeliveryInvites: [false],
    featureEmailDeliverySecurity: [false],
    featureEmailDeliveryApprovals: [false],
    featureEmailDeliveryProposals: [false],
    featureEmailDeliveryMarketing: [false],
    featureEmailDeliveryNotifications: [false],
    featureEmailDeliveryMailbox: [false],
    featureEmailDeliveryStatusNotifications: [false],
    featureAuthEntra: [false],
    reportDesignerRequiredPermission: ['Permissions.Administration.Manage']
  });

  protected readonly emailDeliveryEnabled = computed(() =>
    !!this.flagsForm.get('featureEmailDelivery')?.value
  );

  protected readonly emailDeliveryOptions = [
    { controlName: 'featureEmailDeliveryInvites', inputId: 'tc-email-invites', label: 'Invite emails' },
    { controlName: 'featureEmailDeliverySecurity', inputId: 'tc-email-security', label: 'Password & security emails' },
    { controlName: 'featureEmailDeliveryApprovals', inputId: 'tc-email-approvals', label: 'Approval & workflow emails' },
    { controlName: 'featureEmailDeliveryProposals', inputId: 'tc-email-proposals', label: 'Proposal & quote emails' },
    { controlName: 'featureEmailDeliveryMarketing', inputId: 'tc-email-marketing', label: 'Marketing campaign emails' },
    { controlName: 'featureEmailDeliveryNotifications', inputId: 'tc-email-notifications', label: 'Alert & notification emails' },
    { controlName: 'featureEmailDeliveryMailbox', inputId: 'tc-email-mailbox', label: 'Mailbox & manual send actions' }
  ] as const;

  protected readonly reportDesignerPermissionOptions: Option[] = [
    { label: 'Admins Only (Administration Manage)', value: 'Permissions.Administration.Manage' },
    { label: 'Reports Design Permission', value: 'Permissions.Reports.Design' },
    { label: 'Reports Manage Permission', value: 'Permissions.Reports.Manage' },
    { label: 'Reports View Permission', value: 'Permissions.Reports.View' }
  ];

  constructor() {
    this.loadTenants();
    this.loadFeatureFlags();

    // Toggle child email delivery flags when parent is toggled off
    this.flagsForm.get('featureEmailDelivery')?.valueChanges.subscribe((enabled) => {
      if (!enabled) {
        for (const opt of this.emailDeliveryOptions) {
          this.flagsForm.get(opt.controlName)?.setValue(false, { emitEvent: false });
        }
        this.flagsForm.get('featureEmailDeliveryStatusNotifications')?.setValue(false, { emitEvent: false });
      }
    });
  }

  protected onConfigTabChange(tab: string | number | undefined) {
    if (typeof tab === 'string') {
      this.activeConfigTab.set(tab);
    }
  }

  protected loadTenants() {
    this.loading.set(true);
    this.dataService.listTenants().subscribe({
      next: (tenants) => {
        this.tenants.set(tenants);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load tenants');
      }
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  protected applyActiveTenant() {
    const key = this.activeTenantKey();
    if (!key) {
      return;
    }

    setTenantKey(key);
    this.raiseToast('success', `Active tenant set to ${key}`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.location.reload(), 400);
    }
  }

  protected onActiveTenantChange(key: string) {
    this.activeTenantKey.set(key);
  }

  /* ── Feature flags ── */
  private loadFeatureFlags() {
    this.settingsService.getSettings().subscribe({
      next: (settings) => this.applyFeatureSettings(settings),
      error: () => { /* keep defaults */ }
    });
  }

  private applyFeatureSettings(settings: WorkspaceSettings) {
    const ff = settings.featureFlags ?? {};
    this.activeVerticalPresetConfiguration.set(settings.verticalPresetConfiguration ?? null);
    this.flagsForm.patchValue({
      industryPreset: settings.industryPreset || settings.verticalPresetConfiguration?.presetId || 'CoreCRM',
      featureProperties: !!ff['properties'],
      featureMarketingCampaigns: !!ff['marketing.campaigns'],
      featureHelpDeskCases: !!ff['helpdesk.cases'],
      featureHelpDeskEmailIntake: !!ff['helpdesk.emailIntake'],
      featureHelpDeskRealtime: !!ff['helpdesk.realtime'],
      featureRealtimeDashboard: !!ff['realtime.dashboard'],
      featureRealtimePipeline: !!ff['realtime.pipeline'],
      featureRealtimeEntityCrud: !!ff['realtime.entityCrud'],
      featureRealtimeImportProgress: !!ff['realtime.importProgress'],
      featureRealtimeRecordPresence: !!ff['realtime.recordPresence'],
      featureRealtimeAssistantStreaming: !!ff['realtime.assistantStreaming'],
      featureAiKnowledgeSearch: ff['ai.knowledgeSearch'] !== false,
      featureEmailDelivery: !!ff['communications.emailDelivery'],
      featureEmailDeliveryInvites: !!ff['communications.emailDelivery.invites'],
      featureEmailDeliverySecurity: !!ff['communications.emailDelivery.security'],
      featureEmailDeliveryApprovals: !!ff['communications.emailDelivery.approvals'],
      featureEmailDeliveryProposals: !!ff['communications.emailDelivery.proposals'],
      featureEmailDeliveryMarketing: !!ff['communications.emailDelivery.marketing'],
      featureEmailDeliveryNotifications: !!ff['communications.emailDelivery.notifications'],
      featureEmailDeliveryMailbox: !!ff['communications.emailDelivery.mailbox'],
      featureEmailDeliveryStatusNotifications: !!ff['communications.emailDelivery.statusNotifications'],
      featureAuthEntra: !!ff['auth.entra'],
      reportDesignerRequiredPermission: settings.reportDesignerRequiredPermission || 'Permissions.Administration.Manage'
    });
  }

  protected saveFeatureFlags() {
    const p = this.flagsForm.getRawValue();
    const featureFlags: Record<string, boolean> = {
      properties: !!p.featureProperties,
      'marketing.campaigns': !!p.featureMarketingCampaigns,
      'helpdesk.cases': !!p.featureHelpDeskCases,
      'helpdesk.emailIntake': !!p.featureHelpDeskEmailIntake,
      'helpdesk.realtime': !!p.featureHelpDeskRealtime,
      'realtime.dashboard': !!p.featureRealtimeDashboard,
      'realtime.pipeline': !!p.featureRealtimePipeline,
      'realtime.entityCrud': !!p.featureRealtimeEntityCrud,
      'realtime.importProgress': !!p.featureRealtimeImportProgress,
      'realtime.recordPresence': !!p.featureRealtimeRecordPresence,
      'realtime.assistantStreaming': !!p.featureRealtimeAssistantStreaming,
      'ai.knowledgeSearch': !!p.featureAiKnowledgeSearch,
      'communications.emailDelivery': !!p.featureEmailDelivery,
      'communications.emailDelivery.invites': !!p.featureEmailDeliveryInvites,
      'communications.emailDelivery.security': !!p.featureEmailDeliverySecurity,
      'communications.emailDelivery.approvals': !!p.featureEmailDeliveryApprovals,
      'communications.emailDelivery.proposals': !!p.featureEmailDeliveryProposals,
      'communications.emailDelivery.marketing': !!p.featureEmailDeliveryMarketing,
      'communications.emailDelivery.notifications': !!p.featureEmailDeliveryNotifications,
      'communications.emailDelivery.mailbox': !!p.featureEmailDeliveryMailbox,
      'communications.emailDelivery.statusNotifications': !!p.featureEmailDeliveryStatusNotifications,
      'auth.entra': !!p.featureAuthEntra
    };
    this.savingFlags.set(true);
    this.settingsService.updateSettings({
      featureFlags,
      reportDesignerRequiredPermission: p.reportDesignerRequiredPermission || null
    } as Partial<WorkspaceSettings> as WorkspaceSettings).subscribe({
      next: (settings) => {
        this.savingFlags.set(false);
        this.applyFeatureSettings(settings);
        this.raiseToast('success', 'Feature flags saved');
      },
      error: () => {
        this.savingFlags.set(false);
        this.raiseToast('error', 'Unable to save feature flags');
      }
    });
  }

  /* ── Vertical preset ── */
  protected applyVerticalPreset(resetExisting: boolean) {
    const presetId = this.flagsForm.getRawValue().industryPreset || 'CoreCRM';
    this.presetApplying.set(true);
    this.settingsService.applyVerticalPreset({ presetId, resetExisting }).subscribe({
      next: (settings) => {
        this.presetApplying.set(false);
        this.applyFeatureSettings(settings);
        this.raiseToast('success', resetExisting ? 'Vertical preset reset and applied.' : 'Vertical preset applied.');
      },
      error: () => {
        this.presetApplying.set(false);
        this.raiseToast('error', 'Unable to apply vertical preset.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
