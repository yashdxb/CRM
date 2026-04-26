import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
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
type TenantFlagControlName =
  | 'featureProperties'
  | 'featureMarketingCampaigns'
  | 'featureMyMailbox'
  | 'featureHelpDesk'
  | 'featureHelpDeskCases'
  | 'featureHelpDeskEmailIntake'
  | 'featureHelpDeskRealtime';

interface ModuleTreeNode {
  key: string;
  label: string;
  description: string;
  icon: string;
  controlName?: TenantFlagControlName;
  alwaysOn?: boolean;
  children?: ModuleTreeNode[];
}

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
    NgClass,
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

  /** Cached current workspace settings so feature-flag saves include required fields. */
  private currentSettings = signal<WorkspaceSettings | null>(null);

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
  protected readonly enabledTenantModules = computed(() => {
    const value = this.flagsForm.getRawValue();
    const items = ['Core CRM'];
    if (value.featureProperties) items.push('Properties');
    if (value.featureMarketingCampaigns) items.push('Marketing Campaigns');
    if (value.featureMyMailbox) items.push('My Mailbox');
    if (value.featureHelpDesk || value.featureHelpDeskCases || value.featureHelpDeskEmailIntake || value.featureHelpDeskRealtime) items.push('Help Desk');
    return items;
  });
  protected readonly industryPackCards = computed(() => [
    {
      title: this.flagsForm.getRawValue().industryPreset === 'RealEstateBrokerage' ? 'Real Estate Brokerage' : 'Core CRM',
      description: this.flagsForm.getRawValue().industryPreset === 'RealEstateBrokerage'
        ? 'Brokerage vocabulary, property workflows, and vertical-ready defaults.'
        : 'Standard CRM language, record defaults, and sales workflows.',
      tone: this.flagsForm.getRawValue().industryPreset === 'RealEstateBrokerage' ? 'supply' : 'core'
    },
    ...this.enabledTenantModules()
      .filter((module) => module !== 'Core CRM')
      .map((module) => ({
        title: module,
        description: this.moduleDescription(module),
        tone: 'core'
      }))
  ]);
  protected readonly moduleTree = signal<ModuleTreeNode[]>([
    {
      key: 'core-crm',
      label: 'Core CRM',
      description: 'Base CRM platform, shared navigation, records, and workspace shell.',
      icon: 'pi-shield',
      alwaysOn: true,
      children: [
        {
          key: 'properties',
          label: 'Properties',
          description: 'Property management and listing workspace.',
          icon: 'pi-home',
          controlName: 'featureProperties'
        },
        {
          key: 'marketing',
          label: 'Marketing Campaigns',
          description: 'Campaign planning, sends, and attribution.',
          icon: 'pi-megaphone',
          controlName: 'featureMarketingCampaigns'
        },
        {
          key: 'mailbox',
          label: 'My Mailbox',
          description: 'Personal mailbox workspace and CRM-linked email send surface.',
          icon: 'pi-envelope',
          controlName: 'featureMyMailbox'
        },
        {
          key: 'helpdesk',
          label: 'Help Desk',
          description: 'Service workspace for support operations.',
          icon: 'pi-headphones',
          controlName: 'featureHelpDesk',
          children: [
            {
              key: 'helpdesk-cases',
              label: 'Cases',
              description: 'Support case management.',
              icon: 'pi-briefcase',
              controlName: 'featureHelpDeskCases'
            },
            {
              key: 'helpdesk-email',
              label: 'Email Intake',
              description: 'Create cases from inbound email.',
              icon: 'pi-inbox',
              controlName: 'featureHelpDeskEmailIntake'
            },
            {
              key: 'helpdesk-realtime',
              label: 'Realtime Help Desk',
              description: 'Live case activity updates.',
              icon: 'pi-bolt',
              controlName: 'featureHelpDeskRealtime'
            }
          ]
        }
      ]
    }
  ]);

  protected readonly flagsForm = this.fb.group({
    industryPreset: ['CoreCRM'],
    featureProperties: [false],
    featureMarketingCampaigns: [false],
    featureMyMailbox: [false],
    featureHelpDesk: [false],
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
    this.bindModuleTreeState();
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
      next: (settings) => {
        this.currentSettings.set(settings);
        this.applyFeatureSettings(settings);
      },
      error: () => { /* keep defaults */ }
    });
  }

  private applyFeatureSettings(settings: WorkspaceSettings) {
    const ff = settings.featureFlags ?? {};
    const helpDeskEnabled = !!ff['helpdesk.enabled'] || !!ff['helpdesk.cases'] || !!ff['helpdesk.emailIntake'] || !!ff['helpdesk.realtime'];
    this.activeVerticalPresetConfiguration.set(settings.verticalPresetConfiguration ?? null);
    this.flagsForm.patchValue({
      industryPreset: settings.industryPreset || settings.verticalPresetConfiguration?.presetId || 'CoreCRM',
      featureProperties: !!ff['properties'],
      featureMarketingCampaigns: !!ff['marketing.campaigns'],
      featureMyMailbox: !!ff['mailbox.enabled'],
      featureHelpDesk: helpDeskEnabled,
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
    const activeTenant = this.activeTenant();
    if (!activeTenant) {
      this.raiseToast('error', 'No active tenant selected');
      return;
    }

    const p = this.flagsForm.getRawValue();
    const featureFlags = this.buildFeatureFlags(p);
    this.savingFlags.set(true);
    this.dataService.updateIndustrySettings(activeTenant.id, {
      industryPreset: p.industryPreset || 'CoreCRM',
      industryModules: this.buildIndustryModules(p),
      featureFlags,
      reportDesignerRequiredPermission: p.reportDesignerRequiredPermission || null
    }).subscribe({
      next: () => {
        this.savingFlags.set(false);
        this.loadTenants();
        this.loadFeatureFlags();
        this.raiseToast('success', 'Tenant configuration saved');
      },
      error: () => {
        this.savingFlags.set(false);
        this.raiseToast('error', 'Unable to save tenant configuration');
      }
    });
  }

  /* ── Vertical preset ── */
  protected applyVerticalPreset(resetExisting: boolean) {
    const activeTenant = this.activeTenant();
    if (!activeTenant) {
      this.raiseToast('error', 'No active tenant selected');
      return;
    }

    const values = this.flagsForm.getRawValue();
    const presetId = values.industryPreset || 'CoreCRM';
    this.presetApplying.set(true);
    this.dataService.updateIndustrySettings(activeTenant.id, {
      industryPreset: presetId,
      industryModules: this.buildIndustryModules(values),
      featureFlags: this.buildFeatureFlags(values),
      reportDesignerRequiredPermission: values.reportDesignerRequiredPermission || null,
      resetExisting
    }).subscribe({
      next: () => {
        this.presetApplying.set(false);
        this.loadTenants();
        this.loadFeatureFlags();
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

  private buildFeatureFlags(values: ReturnType<typeof this.flagsForm.getRawValue>): Record<string, boolean> {
    return {
      properties: !!values.featureProperties,
      'marketing.campaigns': !!values.featureMarketingCampaigns,
      'mailbox.enabled': !!values.featureMyMailbox,
      'helpdesk.enabled': !!values.featureHelpDesk,
      'helpdesk.cases': !!values.featureHelpDeskCases,
      'helpdesk.emailIntake': !!values.featureHelpDeskEmailIntake,
      'helpdesk.realtime': !!values.featureHelpDeskRealtime,
      'realtime.dashboard': !!values.featureRealtimeDashboard,
      'realtime.pipeline': !!values.featureRealtimePipeline,
      'realtime.entityCrud': !!values.featureRealtimeEntityCrud,
      'realtime.importProgress': !!values.featureRealtimeImportProgress,
      'realtime.recordPresence': !!values.featureRealtimeRecordPresence,
      'realtime.assistantStreaming': !!values.featureRealtimeAssistantStreaming,
      'ai.knowledgeSearch': !!values.featureAiKnowledgeSearch,
      'communications.emailDelivery': !!values.featureEmailDelivery,
      'communications.emailDelivery.invites': !!values.featureEmailDeliveryInvites,
      'communications.emailDelivery.security': !!values.featureEmailDeliverySecurity,
      'communications.emailDelivery.approvals': !!values.featureEmailDeliveryApprovals,
      'communications.emailDelivery.proposals': !!values.featureEmailDeliveryProposals,
      'communications.emailDelivery.marketing': !!values.featureEmailDeliveryMarketing,
      'communications.emailDelivery.notifications': !!values.featureEmailDeliveryNotifications,
      'communications.emailDelivery.mailbox': !!values.featureEmailDeliveryMailbox,
      'communications.emailDelivery.statusNotifications': !!values.featureEmailDeliveryStatusNotifications,
      'auth.entra': !!values.featureAuthEntra
    };
  }

  private buildIndustryModules(values: ReturnType<typeof this.flagsForm.getRawValue>): string[] {
    const modules = ['core-crm'];
    if (values.featureProperties) modules.push('properties');
    if (values.featureMarketingCampaigns) modules.push('marketing');
    if (values.featureMyMailbox) modules.push('mailbox');
    if (values.featureHelpDesk || values.featureHelpDeskCases || values.featureHelpDeskEmailIntake || values.featureHelpDeskRealtime) {
      modules.push('helpdesk');
    }
    return modules;
  }

  private moduleDescription(module: string): string {
    switch (module) {
      case 'Properties':
        return 'Property listings, brokerage inventory, and real estate workspace access.';
      case 'Marketing Campaigns':
        return 'Campaign planning, sends, attribution, and audience operations.';
      case 'My Mailbox':
        return 'Personal mailbox access for sending and reading CRM-linked email.';
      case 'Help Desk':
        return 'Cases, intake, and support operations for service teams.';
      default:
        return 'Enabled as part of the active tenant scope.';
    }
  }

  protected isModuleNodeChecked(node: ModuleTreeNode): boolean {
    if (node.alwaysOn) {
      return true;
    }

    if (node.controlName) {
      return !!this.flagsForm.get(node.controlName)?.value;
    }

    return !!node.children?.some((child) => this.isModuleNodeChecked(child));
  }

  protected onModuleNodeToggle(node: ModuleTreeNode, checked: boolean): void {
    if (node.alwaysOn) {
      return;
    }

    if (node.controlName) {
      this.flagsForm.get(node.controlName)?.setValue(checked, { emitEvent: false });
    }

    if (node.children?.length) {
      if (!checked) {
        for (const child of node.children) {
          this.setNodeBranchValue(child, false);
        }
      } else if (node.controlName === 'featureHelpDesk' && !node.children.some((child) => this.isModuleNodeChecked(child))) {
        const defaultChild = node.children[0];
        if (defaultChild?.controlName) {
          this.flagsForm.get(defaultChild.controlName)?.setValue(true, { emitEvent: false });
        }
      }
    }

    this.syncDerivedModuleParents();
  }

  private setNodeBranchValue(node: ModuleTreeNode, checked: boolean): void {
    if (node.controlName) {
      this.flagsForm.get(node.controlName)?.setValue(checked, { emitEvent: false });
    }

    node.children?.forEach((child) => this.setNodeBranchValue(child, checked));
  }

  private bindModuleTreeState(): void {
    const helpDeskChildren: TenantFlagControlName[] = [
      'featureHelpDeskCases',
      'featureHelpDeskEmailIntake',
      'featureHelpDeskRealtime'
    ];

    for (const controlName of helpDeskChildren) {
      this.flagsForm.get(controlName)?.valueChanges.subscribe(() => this.syncDerivedModuleParents());
    }

    this.flagsForm.get('featureHelpDesk')?.valueChanges.subscribe((enabled) => {
      if (!enabled) {
        for (const controlName of helpDeskChildren) {
          this.flagsForm.get(controlName)?.setValue(false, { emitEvent: false });
        }
        return;
      }

      if (!helpDeskChildren.some((controlName) => !!this.flagsForm.get(controlName)?.value)) {
        this.flagsForm.get('featureHelpDeskCases')?.setValue(true, { emitEvent: false });
      }
    });
  }

  private syncDerivedModuleParents(): void {
    const helpDeskEnabled =
      !!this.flagsForm.get('featureHelpDeskCases')?.value ||
      !!this.flagsForm.get('featureHelpDeskEmailIntake')?.value ||
      !!this.flagsForm.get('featureHelpDeskRealtime')?.value ||
      !!this.flagsForm.get('featureHelpDesk')?.value;

    this.flagsForm.get('featureHelpDesk')?.setValue(helpDeskEnabled, { emitEvent: false });
  }
}
