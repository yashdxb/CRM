import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
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

@Component({
  selector: 'app-tenant-create-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    TagModule,
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

  protected readonly tenantForm = this.formBuilder.group({
    key: ['', Validators.required],
    name: ['', Validators.required],
    adminName: ['', Validators.required],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', Validators.required],
    timeZone: ['UTC'],
    currency: ['']
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

    const payload: CreateTenantRequest = {
      key: (formValue.key ?? '').trim(),
      name: (formValue.name ?? '').trim(),
      adminName: (formValue.adminName ?? '').trim(),
      adminEmail: (formValue.adminEmail ?? '').trim(),
      adminPassword: formValue.adminPassword ?? '',
      timeZone: formValue.timeZone ?? null,
      currency: formValue.currency ?? null,
      industryPreset: 'CoreCRM',
      industryModules: []
    };

    this.saving.set(true);
    this.dataService.createTenant(payload).subscribe({
      next: (tenant) => {
        this.saving.set(false);
        this.raiseToast('success', `Tenant ${tenant.key} created`);
        this.tenantForm.reset({
          timeZone: 'UTC',
          currency: this.currencyOptions[0]?.value ?? ''
        });
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
}
