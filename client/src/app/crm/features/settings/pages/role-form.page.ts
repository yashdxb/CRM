import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionDefinition, RoleSummary, UpsertRoleRequest } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

interface ScreenPermission {
  screenName: string;
  screenKey: string;
  icon: string;
  description: string;
  permissions: {
    create: string | null;
    read: string | null;
    update: string | null;
    delete: string | null;
  };
}

@Component({
  selector: 'app-role-form-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    TableModule,
    CheckboxModule,
    TooltipModule,
    NgClass,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './role-form.page.html',
  styleUrl: './role-form.page.scss'
})
export class RoleFormPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);

  protected readonly permissionCatalog = signal<PermissionDefinition[]>([]);
  protected readonly loadingPermissions = signal(true);
  protected readonly loadingRole = signal(false);
  protected readonly roleSaving = signal(false);
  protected readonly isEditMode = signal(false);
  protected readonly isSystemRole = signal(false);
  protected readonly canManageAdmin = signal(false);
  
  // Selected permissions as a Set for easy toggle
  protected readonly selectedPermissions = signal<Set<string>>(new Set());

  protected readonly roleForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.maxLength(240)]],
    permissions: [[] as string[]]
  });

  // Screen permission matrix - maps screens to CRUD permissions
  protected readonly screenPermissions = signal<ScreenPermission[]>([
    {
      screenName: 'Dashboard',
      screenKey: 'Dashboard',
      icon: 'pi-th-large',
      description: 'View analytics and KPIs',
      permissions: {
        create: null,
        read: 'Permissions.Dashboard.View',
        update: null,
        delete: null
      }
    },
    {
      screenName: 'Customers',
      screenKey: 'Customers',
      icon: 'pi-building',
      description: 'Manage customer accounts',
      permissions: {
        create: 'Permissions.Customers.Manage',
        read: 'Permissions.Customers.View',
        update: 'Permissions.Customers.Manage',
        delete: 'Permissions.Customers.Manage'
      }
    },
    {
      screenName: 'Contacts',
      screenKey: 'Contacts',
      icon: 'pi-users',
      description: 'Manage contact records',
      permissions: {
        create: 'Permissions.Contacts.Manage',
        read: 'Permissions.Contacts.View',
        update: 'Permissions.Contacts.Manage',
        delete: 'Permissions.Contacts.Manage'
      }
    },
    {
      screenName: 'Leads',
      screenKey: 'Leads',
      icon: 'pi-bolt',
      description: 'Track and convert leads',
      permissions: {
        create: 'Permissions.Leads.Manage',
        read: 'Permissions.Leads.View',
        update: 'Permissions.Leads.Manage',
        delete: 'Permissions.Leads.Manage'
      }
    },
    {
      screenName: 'Opportunities',
      screenKey: 'Opportunities',
      icon: 'pi-dollar',
      description: 'Manage sales pipeline',
      permissions: {
        create: 'Permissions.Opportunities.Manage',
        read: 'Permissions.Opportunities.View',
        update: 'Permissions.Opportunities.Manage',
        delete: 'Permissions.Opportunities.Manage'
      }
    },
    {
      screenName: 'Activities',
      screenKey: 'Activities',
      icon: 'pi-calendar',
      description: 'Schedule and track activities',
      permissions: {
        create: 'Permissions.Activities.Manage',
        read: 'Permissions.Activities.View',
        update: 'Permissions.Activities.Manage',
        delete: 'Permissions.Activities.Manage'
      }
    },
    {
      screenName: 'Administration',
      screenKey: 'Administration',
      icon: 'pi-cog',
      description: 'System settings and users',
      permissions: {
        create: 'Permissions.Administration.Manage',
        read: 'Permissions.Administration.View',
        update: 'Permissions.Administration.Manage',
        delete: 'Permissions.Administration.Manage'
      }
    },
    {
      screenName: 'Tenants',
      screenKey: 'Tenants',
      icon: 'pi-sitemap',
      description: 'Multi-tenant management',
      permissions: {
        create: 'Permissions.Tenants.Manage',
        read: 'Permissions.Tenants.View',
        update: 'Permissions.Tenants.Manage',
        delete: 'Permissions.Tenants.Manage'
      }
    }
  ]);

  private roleId: string | null = null;

  constructor() {
    this.canManageAdmin.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.roleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode.set(!!this.roleId);
    this.loadPermissions();
    if (this.roleId) {
      this.loadRole(this.roleId);
    }
  }

  // Check if a permission is selected
  protected isPermissionSelected(permissionKey: string | null): boolean {
    if (!permissionKey) return false;
    return this.selectedPermissions().has(permissionKey);
  }

  // Toggle a permission
  protected togglePermission(permissionKey: string | null): void {
    if (!permissionKey || this.roleSaving()) return;
    
    const current = new Set(this.selectedPermissions());
    if (current.has(permissionKey)) {
      current.delete(permissionKey);
    } else {
      current.add(permissionKey);
    }
    this.selectedPermissions.set(current);
    this.syncFormPermissions();
  }

  // Toggle all CRUD for a screen row
  protected toggleAllForScreen(screen: ScreenPermission, checked: boolean): void {
    if (this.roleSaving()) return;
    
    const current = new Set(this.selectedPermissions());
    const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete];
    
    perms.forEach(p => {
      if (p) {
        if (checked) {
          current.add(p);
        } else {
          current.delete(p);
        }
      }
    });
    
    this.selectedPermissions.set(current);
    this.syncFormPermissions();
  }

  // Check if all permissions for a screen are selected
  protected isAllSelectedForScreen(screen: ScreenPermission): boolean {
    const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete]
      .filter(p => p !== null) as string[];
    if (perms.length === 0) return false;
    return perms.every(p => this.selectedPermissions().has(p));
  }

  // Check if some (but not all) permissions for a screen are selected
  protected isSomeSelectedForScreen(screen: ScreenPermission): boolean {
    const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete]
      .filter(p => p !== null) as string[];
    if (perms.length === 0) return false;
    const selectedCount = perms.filter(p => this.selectedPermissions().has(p)).length;
    return selectedCount > 0 && selectedCount < perms.length;
  }

  // Sync selected permissions to form
  private syncFormPermissions(): void {
    this.roleForm.patchValue({
      permissions: Array.from(this.selectedPermissions())
    });
  }

  protected loadPermissions() {
    this.loadingPermissions.set(true);
    this.dataService.getPermissionCatalog().subscribe({
      next: (permissions) => {
        this.permissionCatalog.set(permissions);
        this.loadingPermissions.set(false);
      },
      error: () => {
        this.loadingPermissions.set(false);
        this.raiseToast('error', 'Unable to load permissions');
      }
    });
  }

  private loadRole(id: string) {
    this.loadingRole.set(true);
    this.dataService.getRole(id).subscribe({
      next: (role) => {
        this.loadingRole.set(false);
        this.applyRole(role);
      },
      error: () => {
        this.loadingRole.set(false);
        this.raiseToast('error', 'Role not found');
        this.router.navigate(['/app/settings/roles']);
      }
    });
  }

  private applyRole(role: RoleSummary) {
    this.roleForm.patchValue({
      name: role.name,
      description: role.description ?? '',
      permissions: [...role.permissions]
    });
    // Populate selected permissions from role
    this.selectedPermissions.set(new Set(role.permissions));
    this.isSystemRole.set(role.isSystem);
  }

  protected saveRole() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    const permissions = (this.roleForm.value.permissions ?? []) as string[];
    if (permissions.length === 0) {
      this.roleForm.get('permissions')?.setErrors({ required: true });
      this.raiseToast('error', 'Select at least one permission');
      return;
    }

    const payload: UpsertRoleRequest = {
      name: this.roleForm.value.name?.trim() ?? '',
      description: this.roleForm.value.description?.trim() || undefined,
      permissions
    };

    this.roleSaving.set(true);
    const request$ = this.roleId
      ? this.dataService.updateRole(this.roleId, payload)
      : this.dataService.createRole(payload);

    request$.subscribe({
      next: () => {
        this.roleSaving.set(false);
        this.raiseToast('success', this.roleId ? 'Role updated' : 'Role created');
        this.router.navigate(['/app/settings/roles']);
      },
      error: () => {
        this.roleSaving.set(false);
        this.raiseToast('error', 'Unable to save role');
      }
    });
  }

  protected selectedPermissionCount() {
    const permissions = (this.roleForm.value.permissions ?? []) as string[];
    return permissions.length;
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
