import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { CreateTenantRequest } from '../models/tenant-admin.model';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';

interface Option<T = string> {
  label: string;
  value: T;
  icon?: string;
  iconClass?: string;
}

interface IndustryModuleOption {
  key: string;
  label: string;
  description: string;
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-tenant-create-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    TagModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    BreadcrumbsComponent
  ],
  templateUrl: './tenant-create.page.html',
  styleUrl: './tenant-create.page.scss'
})
export class TenantCreatePage {
  private readonly dataService = inject(TenantAdminDataService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(AppToastService);
  private readonly timeZoneService = inject(TimeZoneService);
  private readonly referenceData = inject(ReferenceDataService);
  protected readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly canManageTenants = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.tenantsManage)
  );

  protected readonly supplyChainModules: IndustryModuleOption[] = [
    {
      key: 'rfq',
      label: 'RFQ',
      description: 'Manage requests for quotation and vendor responses.',
      icon: 'pi-file-edit',
      iconClass: 'icon-blue'
    },
    {
      key: 'rfi',
      label: 'RFI / RFP',
      description: 'Capture request-for-information workflows.',
      icon: 'pi-file',
      iconClass: 'icon-teal'
    },
    {
      key: 'quotes',
      label: 'Quote Comparison',
      description: 'Track supplier quotes and pricing responses.',
      icon: 'pi-dollar',
      iconClass: 'icon-green'
    },
    {
      key: 'awards',
      label: 'Awards',
      description: 'Record award decisions and summary details.',
      icon: 'pi-star',
      iconClass: 'icon-amber'
    },
    {
      key: 'suppliers',
      label: 'Supplier Management',
      description: 'Maintain supplier profiles and scorecards.',
      icon: 'pi-users',
      iconClass: 'icon-indigo'
    },
    {
      key: 'procurement',
      label: 'Procurement Execution',
      description: 'Draft purchase orders and approvals.',
      icon: 'pi-shopping-cart',
      iconClass: 'icon-rose'
    },
    {
      key: 'logistics',
      label: 'Fulfillment & Logistics',
      description: 'Track shipments, receiving, and fulfillment.',
      icon: 'pi-truck',
      iconClass: 'icon-blue'
    },
    {
      key: 'inventory',
      label: 'Inventory',
      description: 'Monitor stock levels and replenishment.',
      icon: 'pi-box',
      iconClass: 'icon-teal'
    },
    {
      key: 'catalog',
      label: 'Item Master / Catalog',
      description: 'Manage item master and catalogs.',
      icon: 'pi-book',
      iconClass: 'icon-indigo'
    },
    {
      key: 'pricing',
      label: 'Price Lists / Rate Cards',
      description: 'Configure price lists and rate cards.',
      icon: 'pi-tags',
      iconClass: 'icon-green'
    },
    {
      key: 'contracts',
      label: 'Contracts',
      description: 'Store supplier agreements and renewals.',
      icon: 'pi-file',
      iconClass: 'icon-amber'
    },
    {
      key: 'quality',
      label: 'Quality',
      description: 'Track inspections and corrective actions.',
      icon: 'pi-check-circle',
      iconClass: 'icon-rose'
    },
    {
      key: 'analytics',
      label: 'Analytics',
      description: 'Review spend analytics and savings.',
      icon: 'pi-chart-line',
      iconClass: 'icon-purple'
    }
  ];

  protected readonly modulesForm = this.formBuilder.group(
    this.supplyChainModules.reduce((controls, module) => {
      controls[module.key] = this.formBuilder.control(false);
      return controls;
    }, {} as Record<string, ReturnType<FormBuilder['control']>>)
  );

  protected readonly tenantForm = this.formBuilder.group({
    key: ['', Validators.required],
    name: ['', Validators.required],
    adminName: ['', Validators.required],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', Validators.required],
    timeZone: ['UTC'],
    currency: [''],
    supplyChainEnabled: [false],
    modules: this.modulesForm
  });

  // Shared time zone catalog keeps labels and flags consistent across settings screens.
  protected timeZoneOptions: TimeZoneOption[] = [];
  protected readonly getFlagUrl = getTimeZoneFlagUrl;

  protected currencyOptions: Array<Option & { symbol?: string; name?: string }> = [];

  constructor() {
    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timeZoneOptions = options;
    });
    this.loadCurrencies();
  }

  protected onSupplyChainToggle() {
    if (!this.tenantForm.controls.supplyChainEnabled.value) {
      this.resetModuleSelections();
    }
  }

  protected createTenant() {
    if (!this.canManageTenants()) {
      this.raiseToast('error', 'You do not have permission to create tenants');
      return;
    }

    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      this.raiseToast('error', 'Complete the required fields');
      return;
    }

    const formValue = this.tenantForm.getRawValue();
    const supplyChainEnabled = formValue.supplyChainEnabled ?? false;
    const moduleKeys = supplyChainEnabled ? this.extractModuleKeysFromForm() : [];

    const payload: CreateTenantRequest = {
      key: (formValue.key ?? '').trim(),
      name: (formValue.name ?? '').trim(),
      adminName: (formValue.adminName ?? '').trim(),
      adminEmail: (formValue.adminEmail ?? '').trim(),
      adminPassword: formValue.adminPassword ?? '',
      timeZone: formValue.timeZone ?? null,
      currency: formValue.currency ?? null,
      industryPreset: supplyChainEnabled ? 'SupplyChain' : 'CoreCRM',
      industryModules: moduleKeys
    };

    this.saving.set(true);
    this.dataService.createTenant(payload).subscribe({
      next: (tenant) => {
        this.saving.set(false);
        this.raiseToast('success', `Tenant ${tenant.key} created`);
        this.tenantForm.reset({
          timeZone: 'UTC',
          currency: this.currencyOptions[0]?.value ?? '',
          supplyChainEnabled: false
        });
        this.resetModuleSelections();
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to create tenant');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private extractModuleKeysFromForm(): string[] {
    const values = this.modulesForm.getRawValue();
    return this.supplyChainModules
      .map((module) => module.key)
      .filter((key) => values[key]);
  }

  private loadCurrencies() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyOptions = active.map((currency) => ({
        label: currency.code,
        value: currency.code,
        symbol: currency.symbol,
        name: currency.name
      }));
      if (!this.tenantForm.value.currency && this.currencyOptions.length > 0) {
        this.tenantForm.patchValue({ currency: this.currencyOptions[0].value });
      }
    });
  }

  private resetModuleSelections() {
    const resetValues = this.supplyChainModules.reduce((acc, module) => {
      acc[module.key] = false;
      return acc;
    }, {} as Record<string, boolean>);
    this.modulesForm.reset(resetValues, { emitEvent: false });
  }
}
