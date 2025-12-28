import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { CreateTenantRequest, TenantSummary } from '../models/tenant-admin.model';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';

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
    SelectModule,
    SkeletonModule,
    DatePipe,
    NgClass,
    NgFor,
    NgIf,
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

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly tenants = signal<TenantSummary[]>([]);
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

  protected readonly tenantForm = this.fb.group({
    key: ['', [Validators.required, Validators.maxLength(80)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    adminName: ['', [Validators.required, Validators.maxLength(120)]],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', [Validators.required, Validators.minLength(8)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['USD', [Validators.required]]
  });

  protected readonly totalTenants = computed(() => this.tenants().length);

  constructor() {
    this.loadTenants();
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
          currency: 'USD'
        });
        this.raiseToast('success', 'Tenant provisioned');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to create tenant');
      }
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
