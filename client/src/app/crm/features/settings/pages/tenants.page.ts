import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
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
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    SkeletonModule,
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
  private readonly dataService = inject(TenantAdminDataService);
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

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }


}
