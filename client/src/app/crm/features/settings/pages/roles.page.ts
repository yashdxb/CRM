import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionDefinition, RoleSummary } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [
    ButtonModule,
    NgClass,
    NgFor,
    NgIf,
    RouterLink,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './roles.page.html',
  styleUrl: './roles.page.scss'
})
export class RolesPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);

  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly permissionCatalog = signal<PermissionDefinition[]>([]);
  protected readonly loadingRoles = signal(true);
  protected readonly loadingPermissions = signal(true);
  protected readonly roleSaving = signal(false);
  protected readonly canManageAdmin = signal(false);

  /** Count of system roles */
  protected readonly systemRolesCount = computed(() => this.roles().filter(r => r.isSystem).length);
  
  /** Count of custom roles */
  protected readonly customRolesCount = computed(() => this.roles().filter(r => !r.isSystem).length);

  constructor() {
    this.canManageAdmin.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.loadPermissions();
    this.loadRoles();
  }

  protected loadRoles() {
    this.loadingRoles.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.loadingRoles.set(false);
      },
      error: () => {
        this.loadingRoles.set(false);
        this.raiseToast('error', 'Unable to load roles');
      }
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

  protected deleteRole(role: RoleSummary) {
    if (role.isSystem || this.roleSaving()) {
      return;
    }

    if (!confirm(`Remove the ${role.name} role? Users assigned to it will lose those permissions.`)) {
      return;
    }

    this.roleSaving.set(true);
    this.dataService.deleteRole(role.id).subscribe({
      next: () => {
        this.roleSaving.set(false);
        this.raiseToast('success', 'Role removed');
        this.loadRoles();
      },
      error: () => {
        this.roleSaving.set(false);
        this.raiseToast('error', 'Unable to delete role');
      }
    });
  }

  protected permissionLabel(key: string) {
    const definition = this.permissionCatalog().find((item) => item.key === key);
    const label = definition?.label?.trim();
    if (label) {
      return label;
    }
    const trimmed = key.replace(/^Permissions\./i, '');
    return trimmed.replace(/\./g, ' ') || key;
  }

  /** Returns an appropriate icon class based on role name */
  protected getRoleIcon(role: RoleSummary): string {
    const name = role.name.toLowerCase();
    
    // Admin roles
    if (name.includes('admin') || name.includes('administrator')) {
      return 'pi pi-crown';
    }
    
    // Customer success / support roles
    if (name.includes('customer success') || name.includes('support') || name.includes('service')) {
      return 'pi pi-heart';
    }
    
    // Sales roles
    if (name.includes('sales') || name.includes('account executive') || name.includes('business development')) {
      return 'pi pi-dollar';
    }
    
    // Manager roles
    if (name.includes('manager') || name.includes('lead') || name.includes('supervisor')) {
      return 'pi pi-users';
    }
    
    // Marketing roles
    if (name.includes('marketing') || name.includes('growth')) {
      return 'pi pi-megaphone';
    }
    
    // Viewer / read-only roles
    if (name.includes('viewer') || name.includes('read') || name.includes('guest')) {
      return 'pi pi-eye';
    }
    
    // Developer / technical roles
    if (name.includes('developer') || name.includes('engineer') || name.includes('technical')) {
      return 'pi pi-code';
    }
    
    // Analytics / reporting roles
    if (name.includes('analyst') || name.includes('analytics') || name.includes('report')) {
      return 'pi pi-chart-bar';
    }
    
    // System roles default
    if (role.isSystem) {
      return 'pi pi-shield';
    }
    
    // Custom roles default
    return 'pi pi-user-edit';
  }

  /** Returns the icon style class based on role type */
  protected getRoleIconStyle(role: RoleSummary): string {
    const name = role.name.toLowerCase();
    
    if (name.includes('admin') || name.includes('administrator')) {
      return 'role-icon--admin';
    }
    if (name.includes('customer success') || name.includes('support') || name.includes('service')) {
      return 'role-icon--success';
    }
    if (name.includes('sales') || name.includes('account executive')) {
      return 'role-icon--sales';
    }
    if (name.includes('manager') || name.includes('lead')) {
      return 'role-icon--manager';
    }
    if (role.isSystem) {
      return 'role-icon--system';
    }
    return 'role-icon--custom';
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
