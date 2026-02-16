import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionDefinition, PermissionPackPreset, RoleIntentPack, RoleSummary, UpsertRoleRequest } from '../models/user-admin.model';
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

type PermissionWorkspaceTab = 'all-permissions' | 'presets' | 'drift' | 'effective-access';
type PermissionActionTab = 'create-manage' | 'view-analyze' | 'governance';

@Component({
  selector: 'app-role-form-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CheckboxModule,
    TabsModule,
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
  protected readonly loadingRoles = signal(false);
  protected readonly roleSaving = signal(false);
  protected readonly isEditMode = signal(false);
  protected readonly isSystemRole = signal(false);
  protected readonly canManageAdmin = signal(false);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly intentPacks = signal<RoleIntentPack[]>([]);
  protected readonly loadingIntentPacks = signal(false);
  protected readonly permissionPackPresets = signal<PermissionPackPreset[]>([]);
  protected readonly loadingPackPresets = signal(false);
  protected readonly activePermissionTab = signal<PermissionWorkspaceTab>('all-permissions');
  protected readonly activePermissionActionTab = signal<PermissionActionTab>('create-manage');
  protected readonly basePermissions = signal<string[]>([]);
  protected readonly inheritedPermissions = signal<string[]>([]);
  protected driftNotes = '';
  protected readonly visibilityOptions = [
    { label: 'Team (default)', value: 'Team', hint: 'See own + descendant roles' },
    { label: 'Self only', value: 'Self', hint: 'See only own records' },
    { label: 'All', value: 'All', hint: 'See all records' }
  ];
  protected readonly securityLevels = signal<{ id: string; name: string; description?: string | null; rank: number; isDefault: boolean }[]>([]);
  protected readonly loadingSecurityLevels = signal(false);
  protected readonly securityOptions = computed(() =>
    this.securityLevels()
      .slice()
      .sort((a, b) => a.rank - b.rank)
      .map(level => ({
        label: level.name,
        value: level.id,
        hint: level.description ?? `Rank ${level.rank}`
      }))
  );
  
  // Selected permissions as a Set for easy toggle
  protected readonly selectedPermissions = signal<Set<string>>(new Set());

  protected readonly capabilityGroups = computed(() => {
    const catalog = this.permissionCatalog();
    const groups = new Map<string, PermissionDefinition[]>();
    for (const permission of catalog) {
      const key = permission.capability || 'General';
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(permission);
    }
    return Array.from(groups.entries()).map(([capability, permissions]) => ({
      capability,
      permissions: permissions.slice().sort((a, b) => a.label.localeCompare(b.label))
    }));
  });
  protected readonly allPermissionActionTabs = computed(() => {
    const all = this.permissionCatalog();
    const createManage = all.filter((permission) => this.permissionBucket(permission) === 'create-manage').length;
    const viewAnalyze = all.filter((permission) => this.permissionBucket(permission) === 'view-analyze').length;
    const governance = all.filter((permission) => this.permissionBucket(permission) === 'governance').length;
    return {
      createManage,
      viewAnalyze,
      governance
    };
  });
  protected readonly filteredCapabilityGroups = computed(() => {
    const bucket = this.activePermissionActionTab();
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
    const added = Array.from(current).filter((permission) => !base.has(permission));
    const removed = Array.from(base).filter((permission) => !current.has(permission));
    return { added, removed };
  });
  protected readonly effectivePermissionLabels = computed(() =>
    Array.from(this.selectedPermissions())
      .map((permission) => this.permissionLabel(permission))
      .sort((a, b) => a.localeCompare(b))
  );

  protected readonly roleForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.maxLength(240)]],
    parentRoleId: [null as string | null],
    visibilityScope: ['Team' as string],
    securityLevelId: [null as string | null],
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
    this.loadIntentPacks();
    this.loadPermissionPackPresets();
    this.loadRoles();
    this.loadSecurityLevels();
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

  protected applyIntentPack(pack: RoleIntentPack) {
    if (this.roleSaving() || !pack?.permissions?.length) {
      return;
    }
    this.selectedPermissions.set(new Set(pack.permissions));
    this.syncFormPermissions();
  }

  protected applyPermissionPack(pack: PermissionPackPreset) {
    if (this.roleSaving() || !pack?.permissions?.length) {
      return;
    }
    this.selectedPermissions.set(new Set(pack.permissions));
    this.syncFormPermissions();
  }

  protected resetToDefault() {
    if (this.roleSaving()) {
      return;
    }
    const base = this.basePermissions();
    if (!base.length) {
      this.raiseToast('error', 'No base pack found for this role.');
      return;
    }
    this.selectedPermissions.set(new Set(base));
    this.syncFormPermissions();
  }

  protected acceptDrift() {
    if (!this.roleId || this.roleSaving()) {
      return;
    }
    const permissions = (this.roleForm.value.permissions ?? []) as string[];
    if (permissions.length === 0) {
      this.raiseToast('error', 'Select at least one permission');
      return;
    }
    const payload: UpsertRoleRequest = {
      name: this.roleForm.value.name?.trim() ?? '',
      description: this.roleForm.value.description?.trim() || undefined,
      parentRoleId: this.roleForm.value.parentRoleId ?? null,
      visibilityScope: this.roleForm.value.visibilityScope ?? 'Team',
      securityLevelId: this.roleForm.value.securityLevelId ?? this.defaultSecurityLevelId(),
      permissions,
      acceptDrift: true,
      driftNotes: this.driftNotes?.trim() || undefined
    };

    this.roleSaving.set(true);
    this.dataService.updateRole(this.roleId, payload).subscribe({
      next: (role) => {
        this.roleSaving.set(false);
        this.applyRole(role);
        this.raiseToast('success', 'Drift accepted and base pack updated.');
      },
      error: () => {
        this.roleSaving.set(false);
        this.raiseToast('error', 'Unable to accept drift');
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

  protected loadIntentPacks() {
    this.loadingIntentPacks.set(true);
    this.dataService.getRoleIntentPacks().subscribe({
      next: (packs) => {
        this.intentPacks.set(packs ?? []);
        this.loadingIntentPacks.set(false);
      },
      error: () => {
        this.intentPacks.set([]);
        this.loadingIntentPacks.set(false);
      }
    });
  }

  protected loadPermissionPackPresets() {
    this.loadingPackPresets.set(true);
    this.dataService.getPermissionPackPresets().subscribe({
      next: (packs) => {
        this.permissionPackPresets.set(packs ?? []);
        this.loadingPackPresets.set(false);
      },
      error: () => {
        this.permissionPackPresets.set([]);
        this.loadingPackPresets.set(false);
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
      parentRoleId: role.parentRoleId ?? null,
      visibilityScope: role.visibilityScope ?? 'Team',
      securityLevelId: role.securityLevelId ?? this.defaultSecurityLevelId(),
      permissions: [...role.permissions]
    });
    // Populate selected permissions from role
    this.selectedPermissions.set(new Set(role.permissions));
    this.basePermissions.set(role.basePermissions ?? []);
    this.inheritedPermissions.set(role.inheritedPermissions ?? []);
    this.driftNotes = role.driftNotes ?? '';
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
      parentRoleId: this.roleForm.value.parentRoleId ?? null,
      visibilityScope: this.roleForm.value.visibilityScope ?? 'Team',
      securityLevelId: this.roleForm.value.securityLevelId ?? this.defaultSecurityLevelId(),
      permissions,
      driftNotes: this.driftNotes?.trim() || undefined
    };

    this.roleSaving.set(true);
    const request$ = this.roleId
      ? this.dataService.updateRole(this.roleId, payload)
      : this.dataService.createRole(payload);

    request$.subscribe({
      next: () => {
        this.roleSaving.set(false);
        const message = this.roleId ? 'Role updated' : 'Role created';
        this.raiseToast('success', message);
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

  protected currentRoleId() {
    return this.roleId;
  }

  protected parentRoleOptions() {
    const currentId = this.roleId;
    return this.roles()
      .filter(role => role.id !== currentId)
      .map((role) => ({
        label: role.name,
        value: role.id,
        meta: role.hierarchyLevel ? `H${role.hierarchyLevel}` : 'H?'
      }));
  }

  protected hierarchyPreviewLabel() {
    const parentId = this.roleForm.value.parentRoleId ?? null;
    if (!parentId) {
      return 'H1 (top level)';
    }
    const parent = this.roles().find(role => role.id === parentId);
    if (!parent?.hierarchyLevel) {
      return 'H?';
    }
    return `H${parent.hierarchyLevel + 1}`;
  }

  private loadRoles() {
    this.loadingRoles.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles ?? []);
        this.loadingRoles.set(false);
      },
      error: () => {
        this.loadingRoles.set(false);
        this.raiseToast('error', 'Unable to load roles');
      }
    });
  }

  private loadSecurityLevels() {
    this.loadingSecurityLevels.set(true);
    this.dataService.getSecurityLevels().subscribe({
      next: (levels) => {
        this.securityLevels.set(levels ?? []);
        this.loadingSecurityLevels.set(false);
        if (!this.roleForm.value.securityLevelId) {
          this.roleForm.patchValue({
            securityLevelId: this.defaultSecurityLevelId()
          });
        }
      },
      error: () => {
        this.securityLevels.set([]);
        this.loadingSecurityLevels.set(false);
      }
    });
  }

  private defaultSecurityLevelId(): string | null {
    const levels = this.securityLevels();
    if (levels.length === 0) {
      return null;
    }
    const defaultLevel = levels.find(level => level.isDefault);
    return (defaultLevel ?? levels[0]).id;
  }

  protected clearToast() {
    this.toastService.clear();
  }

  protected onPermissionTabChange(next: string | number | undefined) {
    if (
      next === 'all-permissions' ||
      next === 'presets' ||
      next === 'drift' ||
      next === 'effective-access'
    ) {
      this.activePermissionTab.set(next);
      return;
    }
    this.activePermissionTab.set('all-permissions');
  }

  protected onPermissionActionTabChange(next: string | number | undefined) {
    if (next === 'create-manage' || next === 'view-analyze' || next === 'governance') {
      this.activePermissionActionTab.set(next);
      return;
    }
    this.activePermissionActionTab.set('create-manage');
  }

  protected permissionLabel(key: string) {
    return this.permissionCatalog().find((item) => item.key === key)?.label ?? key;
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
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
}
