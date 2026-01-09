import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'primeng/tooltip';
import { TreeNode } from 'primeng/api';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CreateTenantRequest, TenantSummary } from '../models/tenant-admin.model';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { getTenantKey, setTenantKey } from '../../../../core/tenant/tenant.utils';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-tenants-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    SkeletonModule,
    TreeModule,
    TooltipModule,
    DatePipe,
    NgClass,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    BreadcrumbsComponent
  ],
  templateUrl: './tenants.page.html',
  styleUrl: './tenants.page.scss'
})
export class TenantsPage {
  private readonly dataService = inject(TenantAdminDataService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(AppToastService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
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
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'INR', value: 'INR' }
  ];

  protected readonly tenantForm = this.fb.group({
    key: ['', [Validators.required, Validators.maxLength(80)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    adminName: ['', [Validators.required, Validators.maxLength(120)]],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', [Validators.required, Validators.minLength(8)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['USD', [Validators.required]],
    industryPreset: ['CoreCRM', [Validators.required]],
    industryModules: [[] as string[]]
  });

  protected readonly industryPackNodes: TreeNode[] = [
    {
      key: 'core-crm',
      label: 'Core CRM',
      icon: 'pi pi-lock',
      selectable: false
    },
    {
      key: 'supply-chain',
      label: 'Supply Chain',
      icon: 'pi pi-sitemap',
      children: [
        { key: 'sc:rfq', label: 'RFQ' },
        { key: 'sc:rfi', label: 'RFI' },
        { key: 'sc:quotes', label: 'Quotes' },
        { key: 'sc:awards', label: 'Awards' },
        { key: 'sc:suppliers', label: 'Supplier Management' },
        { key: 'sc:procurement', label: 'Procurement' },
        { key: 'sc:logistics', label: 'Logistics' },
        { key: 'sc:inventory', label: 'Inventory' },
        { key: 'sc:catalog', label: 'Catalog' },
        { key: 'sc:pricing', label: 'Pricing' },
        { key: 'sc:contracts', label: 'Contracts' },
        { key: 'sc:quality', label: 'Quality' },
        { key: 'sc:analytics', label: 'Analytics' }
      ]
    }
  ];

  protected industrySelection: TreeNode[] = [];
  protected activeIndustrySelection: TreeNode[] = [];
  private readonly industryNodeMap = new Map<string, TreeNode>();

  protected readonly totalTenants = computed(() => this.tenants().length);

  constructor() {
    this.indexIndustryNodes(this.industryPackNodes);
    this.loadTenants();
  }

  protected loadTenants() {
    this.loading.set(true);
    this.dataService.listTenants().subscribe({
      next: (tenants) => {
        this.tenants.set(tenants);
        this.loading.set(false);
        this.syncActiveIndustrySelection();
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load tenants');
      }
    });
  }

  protected createTenant() {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    const payload = this.tenantForm.getRawValue() as CreateTenantRequest;
    this.saving.set(true);
    this.dataService.createTenant(payload).subscribe({
      next: (tenant) => {
        this.saving.set(false);
        this.tenants.set([tenant, ...this.tenants()]);
        this.tenantForm.reset({
          key: '',
          name: '',
          adminName: '',
          adminEmail: '',
          adminPassword: '',
          timeZone: 'UTC',
          currency: 'USD',
          industryPreset: 'CoreCRM',
          industryModules: []
        });
        this.industrySelection = [];
        this.raiseToast('success', 'Tenant provisioned');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to create tenant');
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
    this.syncActiveIndustrySelection();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  protected onIndustrySelectionChange(selection: TreeNode[] | TreeNode | null | undefined) {
    this.industrySelection = this.normalizeSelection(selection);
    const moduleKeys = this.extractModuleKeys(this.industrySelection);
    const hasSupplyChain = moduleKeys.length > 0 || this.hasSupplyChainSelected(this.industrySelection);
    this.tenantForm.patchValue(
      {
        industryPreset: hasSupplyChain ? 'SupplyChain' : 'CoreCRM',
        industryModules: moduleKeys
      },
      { emitEvent: false }
    );
  }

  protected setActiveIndustrySelection(selection: TreeNode[] | TreeNode | null | undefined) {
    this.activeIndustrySelection = this.normalizeSelection(selection);
  }

  protected saveActiveIndustrySettings() {
    const tenant = this.activeTenant();
    if (!tenant) {
      this.raiseToast('error', 'Select an active tenant');
      return;
    }

    const moduleKeys = this.extractModuleKeys(this.activeIndustrySelection);
    const hasSupplyChain = moduleKeys.length > 0 || this.hasSupplyChainSelected(this.activeIndustrySelection);

    this.saving.set(true);
    this.dataService
      .updateIndustrySettings(tenant.id, {
        industryPreset: hasSupplyChain ? 'SupplyChain' : 'CoreCRM',
        industryModules: moduleKeys
      })
      .subscribe({
        next: (updated) => {
          this.saving.set(false);
          this.tenants.set(
            this.tenants().map((item) => (item.id === updated.id ? updated : item))
          );
          this.raiseToast('success', 'Industry pack updated');
          this.syncActiveIndustrySelection();
        },
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update industry pack');
        }
      });
  }

  private syncActiveIndustrySelection() {
    const tenant = this.activeTenant();
    if (!tenant) {
      this.activeIndustrySelection = [];
      return;
    }

    const modules = tenant.industryModules ?? [];
    const nextKeys: string[] = [];

    if (tenant.industryPreset === 'SupplyChain' || modules.length > 0) {
      nextKeys.push('supply-chain', ...modules.map((module) => `sc:${module}`));
    }

    this.activeIndustrySelection = this.buildSelectionFromKeys(nextKeys);
  }

  private extractModuleKeys(selection: TreeNode[]): string[] {
    return selection
      .map((node) => node.key)
      .filter((key): key is string => typeof key === 'string' && key.startsWith('sc:'))
      .map((key) => key.replace('sc:', ''));
  }

  private normalizeSelection(selection: TreeNode[] | TreeNode | null | undefined): TreeNode[] {
    if (!selection) {
      return [];
    }
    return Array.isArray(selection) ? selection : [selection];
  }

  private hasSupplyChainSelected(selection: TreeNode[]): boolean {
    return selection.some((node) => node.key === 'supply-chain');
  }

  private buildSelectionFromKeys(keys: string[]): TreeNode[] {
    return keys
      .map((key) => this.industryNodeMap.get(key))
      .filter((node): node is TreeNode => !!node);
  }

  private indexIndustryNodes(nodes: TreeNode[]) {
    nodes.forEach((node) => {
      if (node.key) {
        this.industryNodeMap.set(node.key, node);
      }
      if (node.children?.length) {
        this.indexIndustryNodes(node.children);
      }
    });
  }
}
