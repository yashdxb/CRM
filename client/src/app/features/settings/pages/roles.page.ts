import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionDefinition, RoleSummary } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

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

  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly permissionCatalog = signal<PermissionDefinition[]>([]);
  protected readonly loadingRoles = signal(true);
  protected readonly loadingPermissions = signal(true);
  protected readonly roleSaving = signal(false);
  protected readonly toast = signal<{ tone: 'success' | 'error'; message: string } | null>(null);

  constructor() {
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
    return this.permissionCatalog().find((definition) => definition.key === key)?.label ?? key;
  }

  protected clearToast() {
    this.toast.set(null);
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toast.set({ tone, message });
    setTimeout(() => this.clearToast(), 4000);
  }
}
