import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';

import { AppToastService } from '../../../../core/app-toast.service';
import { PermissionDefinition, PermissionPackPreset, RoleIntentPack, RoleSummary, UpsertRoleRequest } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';

type PermissionActionTab = 'create-manage' | 'view-analyze' | 'governance';

@Component({
  selector: 'app-permissions-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    NgTemplateOutlet,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    SelectModule,
    TabsModule
  ],
  templateUrl: './permissions.page.html',
  styleUrl: './permissions.page.scss'
})
export class PermissionsPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly permissionCatalog = signal<PermissionDefinition[]>([]);
  protected readonly intentPacks = signal<RoleIntentPack[]>([]);
  protected readonly permissionPackPresets = signal<PermissionPackPreset[]>([]);
  protected readonly selectedRole = signal<RoleSummary | null>(null);
  protected readonly selectedRoleId = signal<string | null>(null);
  protected readonly selectedPermissions = signal<Set<string>>(new Set());
  protected readonly basePermissions = signal<string[]>([]);
  protected readonly inheritedPermissions = signal<string[]>([]);
  protected readonly driftNotes = signal('');
  protected readonly loadingRoles = signal(true);
  protected readonly loadingPermissions = signal(true);
  protected readonly loadingRole = signal(false);
  protected readonly saving = signal(false);
  protected readonly activeActionTab = signal<PermissionActionTab>('create-manage');

  protected readonly roleOptions = computed(() =>
    this.roles()
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((role) => ({
        label: role.name,
        value: role.id
      }))
  );

  protected readonly selectedPermissionCount = computed(() => this.selectedPermissions().size);

  protected readonly capabilityGroups = computed(() => {
    const groups = new Map<string, PermissionDefinition[]>();
    for (const permission of this.permissionCatalog()) {
      const key = permission.capability || 'General';
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)?.push(permission);
    }

    return Array.from(groups.entries()).map(([capability, permissions]) => ({
      capability,
      permissions: permissions.slice().sort((a, b) => a.label.localeCompare(b.label))
    }));
  });

  protected readonly actionTabCounts = computed(() => {
    const all = this.permissionCatalog();
    return {
      createManage: all.filter((permission) => this.permissionBucket(permission) === 'create-manage').length,
      viewAnalyze: all.filter((permission) => this.permissionBucket(permission) === 'view-analyze').length,
      governance: all.filter((permission) => this.permissionBucket(permission) === 'governance').length
    };
  });

  protected readonly filteredCapabilityGroups = computed(() => {
    const bucket = this.activeActionTab();
    return this.capabilityGroups()
      .map((group) => ({
        capability: group.capability,
        permissions: group.permissions.filter((permission) => this.permissionBucket(permission) === bucket)
      }))
      .filter((group) => group.permissions.length > 0);
  });

  protected readonly driftSummary = computed(() => {
    const current = this.selectedPermissions();
    const base = new Set(this.basePermissions());
    return {
      added: Array.from(current).filter((permission) => !base.has(permission)),
      removed: Array.from(base).filter((permission) => !current.has(permission))
    };
  });

  constructor() {
    this.loadPermissions();
    this.loadRoles();
    this.loadIntentPacks();
    this.loadPermissionPackPresets();
    const roleId = this.route.snapshot.queryParamMap.get('roleId');
    if (roleId) {
      this.selectedRoleId.set(roleId);
      this.loadRole(roleId);
    }
  }

  protected onRoleChange(nextRoleId: string | null) {
    if (!nextRoleId) {
      this.selectedRoleId.set(null);
      this.selectedRole.set(null);
      this.selectedPermissions.set(new Set());
      this.basePermissions.set([]);
      this.inheritedPermissions.set([]);
      this.driftNotes.set('');
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { roleId: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
      return;
    }

    this.selectedRoleId.set(nextRoleId);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { roleId: nextRoleId },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    this.loadRole(nextRoleId);
  }

  protected isPermissionSelected(permissionKey: string): boolean {
    return this.selectedPermissions().has(permissionKey);
  }

  protected togglePermission(permissionKey: string) {
    const next = new Set(this.selectedPermissions());
    if (next.has(permissionKey)) {
      next.delete(permissionKey);
    } else {
      next.add(permissionKey);
    }
    this.selectedPermissions.set(next);
  }

  protected applyIntentPack(pack: RoleIntentPack) {
    if (!pack?.permissions?.length) {
      return;
    }
    this.selectedPermissions.set(new Set(pack.permissions));
  }

  protected applyPermissionPack(pack: PermissionPackPreset) {
    if (!pack?.permissions?.length) {
      return;
    }
    this.selectedPermissions.set(new Set(pack.permissions));
  }

  protected resetToBase() {
    const base = this.basePermissions();
    if (!base.length) {
      this.raiseToast('error', 'No base permission set found for this role.');
      return;
    }
    this.selectedPermissions.set(new Set(base));
  }

  protected savePermissions() {
    const role = this.selectedRole();
    if (!role) {
      this.raiseToast('error', 'Select a role first.');
      return;
    }

    const permissions = Array.from(this.selectedPermissions());
    if (!permissions.length) {
      this.raiseToast('error', 'Select at least one permission.');
      return;
    }

    const payload: UpsertRoleRequest = {
      name: role.name,
      description: role.description ?? undefined,
      parentRoleId: role.parentRoleId ?? null,
      visibilityScope: role.visibilityScope ?? 'Team',
      securityLevelId: role.securityLevelId ?? null,
      permissions,
      driftNotes: this.driftNotes().trim() || undefined
    };

    this.saving.set(true);
    this.dataService.updateRole(role.id, payload).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.applyRole(updated);
        this.raiseToast('success', 'Permissions updated.');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save permissions.');
      }
    });
  }

  protected permissionLabel(key: string): string {
    return this.permissionCatalog().find((item) => item.key === key)?.label ?? key;
  }

  protected onActionTabChange(next: string | number | undefined) {
    if (next === 'create-manage' || next === 'view-analyze' || next === 'governance') {
      this.activeActionTab.set(next);
      return;
    }
    this.activeActionTab.set('create-manage');
  }

  private loadPermissions() {
    this.loadingPermissions.set(true);
    this.dataService.getPermissionCatalog().subscribe({
      next: (permissions) => {
        this.permissionCatalog.set(permissions);
        this.loadingPermissions.set(false);
      },
      error: () => {
        this.loadingPermissions.set(false);
        this.raiseToast('error', 'Unable to load permission catalog.');
      }
    });
  }

  private loadRoles() {
    this.loadingRoles.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles ?? []);
        this.loadingRoles.set(false);
        if (!this.selectedRoleId() && roles.length > 0) {
          this.onRoleChange(roles[0].id);
        }
      },
      error: () => {
        this.loadingRoles.set(false);
        this.raiseToast('error', 'Unable to load roles.');
      }
    });
  }

  private loadRole(roleId: string) {
    this.loadingRole.set(true);
    this.dataService.getRole(roleId).subscribe({
      next: (role) => {
        this.loadingRole.set(false);
        this.applyRole(role);
      },
      error: () => {
        this.loadingRole.set(false);
        this.raiseToast('error', 'Unable to load role permissions.');
      }
    });
  }

  private applyRole(role: RoleSummary) {
    this.selectedRole.set(role);
    this.selectedRoleId.set(role.id);
    this.selectedPermissions.set(new Set(role.permissions ?? []));
    this.basePermissions.set(role.basePermissions ?? []);
    this.inheritedPermissions.set(role.inheritedPermissions ?? []);
    this.driftNotes.set(role.driftNotes ?? '');
  }

  private loadIntentPacks() {
    this.dataService.getRoleIntentPacks().subscribe({
      next: (packs) => this.intentPacks.set(packs ?? []),
      error: () => this.intentPacks.set([])
    });
  }

  private loadPermissionPackPresets() {
    this.dataService.getPermissionPackPresets().subscribe({
      next: (packs) => this.permissionPackPresets.set(packs ?? []),
      error: () => this.permissionPackPresets.set([])
    });
  }

  private permissionBucket(permission: PermissionDefinition): PermissionActionTab {
    const key = `${permission.key ?? ''} ${permission.label ?? ''}`.toLowerCase();
    if (
      key.includes('.view') ||
      key.includes(' view') ||
      key.includes('report') ||
      key.includes('analy') ||
      key.includes('export')
    ) {
      return 'view-analyze';
    }
    if (
      key.includes('approve') ||
      key.includes('override') ||
      key.includes('audit') ||
      key.includes('administration') ||
      key.includes('tenant')
    ) {
      return 'governance';
    }
    return 'create-manage';
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
