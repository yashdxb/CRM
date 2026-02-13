import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { TreeNode } from 'primeng/api';

import { PermissionDefinition, PermissionPackPreset, RoleIntentPack, RoleSummary, SecurityLevelDefinition, UpsertSecurityLevelRequest } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

type RolesWorkspaceTab = 'directory' | 'security-levels' | 'presets' | 'drift';

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    OrganizationChartModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    TableModule,
    TabsModule,
    TagModule,
    TextareaModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './roles.page.html',
  styleUrl: './roles.page.scss'
})
export class RolesPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly permissionCatalog = signal<PermissionDefinition[]>([]);
  protected readonly intentPacks = signal<RoleIntentPack[]>([]);
  protected readonly permissionPackPresets = signal<PermissionPackPreset[]>([]);
  protected readonly securityLevels = signal<SecurityLevelDefinition[]>([]);
  protected readonly loadingRoles = signal(true);
  protected readonly loadingPermissions = signal(true);
  protected readonly loadingIntentPacks = signal(true);
  protected readonly loadingPermissionPackPresets = signal(true);
  protected readonly loadingSecurityLevels = signal(true);
  protected readonly roleSaving = signal(false);
  protected readonly securityLevelSaving = signal(false);
  protected readonly canManageAdmin = signal(false);
  protected readonly showHierarchy = signal(false);
  protected readonly activeWorkspaceTab = signal<RolesWorkspaceTab>('directory');
  protected readonly securityEditorOpen = signal(false);
  protected readonly editingSecurityLevel = signal<SecurityLevelDefinition | null>(null);
  protected readonly orgChartNodes = computed(() => this.buildOrgChartNodes());
  protected readonly defaultSecurityLevelName = computed(() => {
    const defaultLevel = this.securityLevels().find((level) => level.isDefault);
    return defaultLevel?.name ?? 'Not set';
  });

  /** Count of system roles */
  protected readonly systemRolesCount = computed(() => this.roles().filter(r => r.isSystem).length);
  
  /** Count of custom roles */
  protected readonly customRolesCount = computed(() => this.roles().filter(r => !r.isSystem).length);
  protected readonly rolesWithSecurityLevelCount = computed(() =>
    this.roles().filter((role) => !!role.securityLevelId).length
  );
  protected readonly driftRows = computed(() =>
    this.roles().map((role) => {
      const base = new Set(role.basePermissions ?? []);
      const current = new Set(role.permissions ?? []);
      const addedCount = Array.from(current).filter((permission) => !base.has(permission)).length;
      const removedCount = Array.from(base).filter((permission) => !current.has(permission)).length;
      return {
        role,
        addedCount,
        removedCount,
        hasDrift: addedCount > 0 || removedCount > 0
      };
    })
  );
  protected readonly driftedRolesCount = computed(() => this.driftRows().filter((row) => row.hasDrift).length);
  protected readonly securityLevelsById = computed(() => {
    const map = new Map<string, SecurityLevelDefinition>();
    for (const level of this.securityLevels()) {
      map.set(level.id, level);
    }
    return map;
  });
  protected readonly securityForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.maxLength(240)]],
    rank: [0, [Validators.min(0)]],
    isDefault: [false]
  });

  constructor() {
    this.canManageAdmin.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.loadPermissions();
    this.loadRoles();
    this.loadSecurityLevels();
    this.loadIntentPacks();
    this.loadPermissionPackPresets();
    this.route.queryParamMap.subscribe((params) => {
      this.activeWorkspaceTab.set(this.coerceWorkspaceTab(params.get('tab')));
    });
  }

  protected onWorkspaceTabChange(next: string | number | undefined) {
    const tab = this.coerceWorkspaceTab(typeof next === 'string' ? next : null);
    this.activeWorkspaceTab.set(tab);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab === 'directory' ? null : tab },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
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

  protected loadSecurityLevels() {
    this.loadingSecurityLevels.set(true);
    this.dataService.getSecurityLevels().subscribe({
      next: (levels) => {
        this.securityLevels.set(levels ?? []);
        this.loadingSecurityLevels.set(false);
      },
      error: () => {
        this.loadingSecurityLevels.set(false);
        this.raiseToast('error', 'Unable to load security levels');
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
        this.loadingIntentPacks.set(false);
        this.raiseToast('error', 'Unable to load role intent packs');
      }
    });
  }

  protected loadPermissionPackPresets() {
    this.loadingPermissionPackPresets.set(true);
    this.dataService.getPermissionPackPresets().subscribe({
      next: (presets) => {
        this.permissionPackPresets.set(presets ?? []);
        this.loadingPermissionPackPresets.set(false);
      },
      error: () => {
        this.loadingPermissionPackPresets.set(false);
        this.raiseToast('error', 'Unable to load permission presets');
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

  protected toggleView(mode: 'list' | 'hierarchy') {
    this.showHierarchy.set(mode === 'hierarchy');
  }

  protected securityLevelForRole(role: RoleSummary): SecurityLevelDefinition | null {
    const levelId = role.securityLevelId;
    if (!levelId) {
      return null;
    }
    return this.securityLevelsById().get(levelId) ?? null;
  }

  protected openCreateSecurityLevel() {
    this.editingSecurityLevel.set(null);
    this.securityForm.reset({
      name: '',
      description: '',
      rank: this.nextSecurityLevelRank(),
      isDefault: this.securityLevels().length === 0
    });
    this.securityEditorOpen.set(true);
  }

  protected openEditSecurityLevel(level: SecurityLevelDefinition) {
    this.editingSecurityLevel.set(level);
    this.securityForm.reset({
      name: level.name,
      description: level.description ?? '',
      rank: level.rank,
      isDefault: level.isDefault
    });
    this.securityEditorOpen.set(true);
  }

  protected closeSecurityEditor() {
    this.securityEditorOpen.set(false);
    this.securityForm.markAsPristine();
    this.securityForm.markAsUntouched();
  }

  protected saveSecurityLevel() {
    if (this.securityLevelSaving()) {
      return;
    }

    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const payload = this.buildSecurityPayload();
    const current = this.editingSecurityLevel();
    this.securityLevelSaving.set(true);

    const request = current
      ? this.dataService.updateSecurityLevel(current.id, payload)
      : this.dataService.createSecurityLevel(payload);

    request.subscribe({
      next: () => {
        this.securityLevelSaving.set(false);
        this.raiseToast('success', current ? 'Security level updated' : 'Security level created');
        this.closeSecurityEditor();
        this.loadSecurityLevels();
        this.loadRoles();
      },
      error: (err) => {
        this.securityLevelSaving.set(false);
        const message = err?.error ?? 'Unable to save security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected deleteSecurityLevel(level: SecurityLevelDefinition) {
    if (!this.canManageAdmin() || this.securityLevelSaving()) {
      return;
    }

    if (level.isDefault) {
      this.raiseToast('error', 'Default security level cannot be deleted');
      return;
    }

    if (!confirm(`Delete ${level.name}? Reassign any roles currently using this level first.`)) {
      return;
    }

    this.securityLevelSaving.set(true);
    this.dataService.deleteSecurityLevel(level.id).subscribe({
      next: () => {
        this.securityLevelSaving.set(false);
        this.raiseToast('success', 'Security level deleted');
        this.loadSecurityLevels();
        this.loadRoles();
      },
      error: (err) => {
        this.securityLevelSaving.set(false);
        const message = err?.error ?? 'Unable to delete security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected setDefaultSecurityLevel(level: SecurityLevelDefinition) {
    if (!this.canManageAdmin() || this.securityLevelSaving() || level.isDefault) {
      return;
    }

    this.securityLevelSaving.set(true);
    const payload: UpsertSecurityLevelRequest = {
      name: level.name,
      description: level.description ?? null,
      rank: level.rank,
      isDefault: true
    };

    this.dataService.updateSecurityLevel(level.id, payload).subscribe({
      next: () => {
        this.securityLevelSaving.set(false);
        this.raiseToast('success', `${level.name} is now the default security level`);
        this.loadSecurityLevels();
        this.loadRoles();
      },
      error: (err) => {
        this.securityLevelSaving.set(false);
        const message = err?.error ?? 'Unable to set default security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected duplicateSecurityLevel(level: SecurityLevelDefinition) {
    if (!this.canManageAdmin() || this.securityLevelSaving()) {
      return;
    }

    this.securityLevelSaving.set(true);
    const payload: UpsertSecurityLevelRequest = {
      name: this.uniqueSecurityLevelName(level.name),
      description: level.description ?? null,
      rank: this.nextSecurityLevelRank(),
      isDefault: false
    };

    this.dataService.createSecurityLevel(payload).subscribe({
      next: () => {
        this.securityLevelSaving.set(false);
        this.raiseToast('success', `${payload.name} created`);
        this.loadSecurityLevels();
      },
      error: (err) => {
        this.securityLevelSaving.set(false);
        const message = err?.error ?? 'Unable to duplicate security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected securityLevelTag(level: SecurityLevelDefinition): 'success' | 'info' {
    return level.isDefault ? 'success' : 'info';
  }

  protected securityLevelType(level: SecurityLevelDefinition): string {
    return level.isDefault ? 'Default' : 'Custom';
  }

  protected driftTone(addedCount: number, removedCount: number): 'success' | 'warn' | 'info' {
    if (removedCount > 0) {
      return 'warn';
    }
    if (addedCount > 0) {
      return 'success';
    }
    return 'info';
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

  private buildOrgChartNodes(): TreeNode[] {
    const roles = this.roles();
    if (!roles.length) {
      return [];
    }

    const nodesById = new Map<string, TreeNode>();
    roles.forEach((role) => {
      nodesById.set(role.id, {
        label: role.name,
        data: role,
        expanded: true,
        children: []
      });
    });

    const roots: TreeNode[] = [];
    roles.forEach((role) => {
      const node = nodesById.get(role.id)!;
      const parentId = role.parentRoleId ?? null;
      if (parentId && nodesById.has(parentId)) {
        const parent = nodesById.get(parentId)!;
        parent.children = parent.children ?? [];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private buildSecurityPayload(): UpsertSecurityLevelRequest {
    const value = this.securityForm.value;
    return {
      name: value.name?.trim() ?? '',
      description: value.description?.trim() ? value.description.trim() : null,
      rank: typeof value.rank === 'number' ? value.rank : 0,
      isDefault: value.isDefault ?? false
    };
  }

  private nextSecurityLevelRank(): number {
    const levels = this.securityLevels();
    if (!levels.length) {
      return 0;
    }
    return Math.max(...levels.map((level) => level.rank)) + 1;
  }

  private uniqueSecurityLevelName(baseName: string): string {
    const trimmed = (baseName || 'Security Level').trim();
    const names = new Set(this.securityLevels().map((level) => level.name.trim().toLowerCase()));
    let candidate = `${trimmed} Copy`;
    if (!names.has(candidate.toLowerCase())) {
      return candidate;
    }
    let i = 2;
    while (names.has(`${candidate} ${i}`.toLowerCase())) {
      i += 1;
    }
    return `${candidate} ${i}`;
  }

  private coerceWorkspaceTab(value: string | null): RolesWorkspaceTab {
    if (value === 'security-levels' || value === 'presets' || value === 'drift' || value === 'directory') {
      return value;
    }
    return 'directory';
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
