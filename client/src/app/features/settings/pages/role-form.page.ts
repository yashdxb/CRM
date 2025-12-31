import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { SkeletonModule } from 'primeng/skeleton';

import { PermissionDefinition, RoleSummary, UpsertRoleRequest } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../core/auth/permission.constants';
import { AppToastService } from '../../../core/app-toast.service';

@Component({
  selector: 'app-role-form-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ListboxModule,
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

  protected readonly roleForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.maxLength(240)]],
    permissions: [[] as string[]]
  });

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
