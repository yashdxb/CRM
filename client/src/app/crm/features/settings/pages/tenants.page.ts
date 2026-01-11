import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { TenantSummary } from '../models/tenant-admin.model';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { getTenantKey, setTenantKey } from '../../../../core/tenant/tenant.utils';

@Component({
  selector: 'app-tenants-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    ListboxModule,
    ToggleSwitchModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    SkeletonModule,
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
  private readonly dataService = inject(TenantAdminDataService);
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

  protected readonly supplyChainModules = [
    { key: 'rfq', label: 'RFQ', icon: 'pi pi-file-edit', iconClass: 'icon-blue', description: 'Source requests and vendor invites.' },
    { key: 'rfi', label: 'RFI / RFP', icon: 'pi pi-file', iconClass: 'icon-teal', description: 'Collect supplier information early.' },
    { key: 'quotes', label: 'Quote Comparison', icon: 'pi pi-chart-line', iconClass: 'icon-indigo', description: 'Capture supplier pricing responses.' },
    { key: 'awards', label: 'Awards', icon: 'pi pi-trophy', iconClass: 'icon-amber', description: 'Finalize awards and suppliers.' },
    { key: 'suppliers', label: 'Supplier Management', icon: 'pi pi-users', iconClass: 'icon-green', description: 'Manage supplier profiles and status.' },
    { key: 'procurement', label: 'Procurement Execution', icon: 'pi pi-briefcase', iconClass: 'icon-purple', description: 'Track purchase and approvals flow.' },
    { key: 'logistics', label: 'Fulfillment & Logistics', icon: 'pi pi-truck', iconClass: 'icon-blue', description: 'Monitor shipping and delivery.' },
    { key: 'inventory', label: 'Inventory', icon: 'pi pi-box', iconClass: 'icon-teal', description: 'Stock levels and replenishment.' },
    { key: 'catalog', label: 'Item Master / Catalog', icon: 'pi pi-list', iconClass: 'icon-rose', description: 'Item master and catalogs.' },
    { key: 'pricing', label: 'Price Lists / Rate Cards', icon: 'pi pi-tags', iconClass: 'icon-indigo', description: 'Supplier pricing and rate cards.' },
    { key: 'contracts', label: 'Contracts', icon: 'pi pi-file', iconClass: 'icon-orange', description: 'Contract references and terms.' },
    { key: 'quality', label: 'Quality', icon: 'pi pi-check-circle', iconClass: 'icon-green', description: 'Inspections and compliance.' },
    { key: 'analytics', label: 'Analytics', icon: 'pi pi-chart-bar', iconClass: 'icon-purple', description: 'Spend and supplier performance.' }
  ];
  protected activeSupplyChainEnabled = false;
  protected activeModuleState: Record<string, boolean> = {};
  protected activeModuleSelection: string[] = [];

  protected readonly totalTenants = computed(() => this.tenants().length);

  constructor() {
    this.activeModuleState = this.buildModuleState([]);
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

  protected saveActiveIndustrySettings() {
    const tenant = this.activeTenant();
    if (!tenant) {
      this.raiseToast('error', 'Select an active tenant');
      return;
    }

    const moduleKeys = this.supplyChainModules
      .filter((module) => this.activeModuleState[module.key])
      .map((module) => module.key);
    const hasSupplyChain = this.activeSupplyChainEnabled || moduleKeys.length > 0;

    this.saving.set(true);
    this.dataService
      .updateIndustrySettings(tenant.id, {
        industryPreset: hasSupplyChain ? 'SupplyChain' : 'CoreCRM',
        industryModules: hasSupplyChain ? moduleKeys : []
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

  protected onActiveSupplyChainToggle(event?: { checked?: boolean; value?: boolean }) {
    if (event && typeof event.checked === 'boolean') {
      this.activeSupplyChainEnabled = event.checked;
    } else if (event && typeof event.value === 'boolean') {
      this.activeSupplyChainEnabled = event.value;
    }

    if (this.activeSupplyChainEnabled) {
      const allModules = this.supplyChainModules.map((module) => module.key);
      this.activeModuleSelection = [...allModules];
      this.activeModuleState = this.buildModuleState(allModules);
      return;
    }

    this.activeModuleSelection = [];
    this.activeModuleState = this.buildModuleState([]);
  }

  protected onModuleSelectionChange() {
    this.activeModuleState = this.buildModuleState(this.activeModuleSelection);
  }

  private syncActiveIndustrySelection() {
    const tenant = this.activeTenant();
    if (!tenant) {
      this.activeSupplyChainEnabled = false;
      this.activeModuleSelection = [];
      this.activeModuleState = this.buildModuleState([]);
      return;
    }

    const modules = tenant.industryModules ?? [];
    this.activeSupplyChainEnabled = tenant.industryPreset === 'SupplyChain' || modules.length > 0;
    this.activeModuleSelection = [...modules];
    this.activeModuleState = this.buildModuleState(modules);
  }

  private buildModuleState(modules: string[]): Record<string, boolean> {
    const state: Record<string, boolean> = {};
    this.supplyChainModules.forEach((module) => {
      state[module.key] = modules.includes(module.key);
    });
    return state;
  }
}
