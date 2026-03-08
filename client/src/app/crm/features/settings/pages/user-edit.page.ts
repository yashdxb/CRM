import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  DashboardPackOption,
  UpsertUserRequest,
  RoleSummary,
  UserDetailResponse
} from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    TableModule,
    ToggleSwitchModule,
    BreadcrumbsComponent
  ],
  templateUrl: './user-edit.page.html',
  styleUrl: './user-edit.page.scss'
})
export class UserEditPage implements OnInit {
  private readonly dataService = inject(UserAdminDataService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);
  private readonly timeZoneService = inject(TimeZoneService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);
  protected readonly user = signal<UserDetailResponse | null>(null);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly roleDefaultDashboardPacks = signal<DashboardPackOption[]>([]);
  protected readonly customDashboardPacks = signal<DashboardPackOption[]>([]);
  protected readonly selectedDashboardPackKey = signal<string | null>(null);
  protected readonly permissionPerspective = signal<'draft' | 'current'>('draft');
  protected readonly permissionSearch = signal('');
  protected readonly permissionModuleFilter = signal<'all' | string>('all');
  protected readonly permissionRiskFilter = signal<'all' | 'critical' | 'sensitive' | 'standard'>('all');
  protected readonly permissionChangeFilter = signal<'all' | 'added' | 'removed' | 'unchanged'>('all');
  protected readonly loadingDashboardPackOptions = signal(true);
  protected readonly updatingDashboardPack = signal(false);
  protected readonly accessAccordionValue = signal<string[]>(['permissions', 'security', 'dashboard']);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly generatedPassword = signal<string | null>(null);
  private readonly initialFormState = signal<string | null>(null);
  private readonly initialDashboardPackKey = signal<string | null>(null);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );
  protected readonly hasPendingChanges = computed(() => {
    const initial = this.initialFormState();
    if (!initial) {
      return false;
    }

    const current = this.serializeFormState();
    const packChanged = (this.selectedDashboardPackKey() ?? null) !== (this.initialDashboardPackKey() ?? null);
    return current !== initial || packChanged;
  });
  protected readonly selectedRoleRecords = computed(() => {
    const selectedIds = new Set(this.form.controls.roleIds.value ?? []);
    return this.roles().filter((role) => selectedIds.has(role.id));
  });
  protected readonly selectedRoleCount = computed(() => this.selectedRoleRecords().length);
  protected readonly effectivePermissionGroups = computed(() => {
    const permissionSources = new Map<string, Set<string>>();
    for (const role of this.selectedRoleRecords()) {
      const roleName = role.name || 'Unnamed role';
      const allPermissions = new Set<string>([
        ...(role.permissions ?? []),
        ...(role.inheritedPermissions ?? []),
        ...(role.basePermissions ?? [])
      ]);

      for (const permission of allPermissions) {
        if (!permission) {
          continue;
        }

        if (!permissionSources.has(permission)) {
          permissionSources.set(permission, new Set<string>());
        }

        permissionSources.get(permission)?.add(roleName);
      }
    }

    const grouped = new Map<string, Array<{ key: string; sources: string[] }>>();
    for (const [permission, sources] of permissionSources.entries()) {
      const module = this.resolvePermissionModule(permission);
      if (!grouped.has(module)) {
        grouped.set(module, []);
      }

      grouped.get(module)?.push({
        key: permission,
        sources: [...sources].sort((a, b) => a.localeCompare(b))
      });
    }

    return [...grouped.entries()]
      .map(([module, items]) => ({
        module,
        count: items.length,
        items: items.sort((a, b) => a.key.localeCompare(b.key))
      }))
      .sort((a, b) => a.module.localeCompare(b.module));
  });
  protected readonly effectivePermissionCount = computed(() =>
    this.effectivePermissionGroups().reduce((total, group) => total + group.count, 0)
  );
  protected readonly effectivePermissionRows = computed(() =>
    this.effectivePermissionGroups().flatMap((group) =>
      group.items.map((item) => ({
        module: group.module,
        key: item.key,
        label: this.formatPermissionLabel(item.key),
        risk: this.resolvePermissionRisk(item.key),
        sources: item.sources
      }))
    )
  );
  protected readonly currentPermissionRows = computed(() => {
    const roleIds = this.user()?.roleIds ?? [];
    const selectedIds = new Set(roleIds);
    const selectedRoles = this.roles().filter((role) => selectedIds.has(role.id));
    const permissionSources = new Map<string, Set<string>>();

    for (const role of selectedRoles) {
      const roleName = role.name || 'Unnamed role';
      const allPermissions = new Set<string>([
        ...(role.permissions ?? []),
        ...(role.inheritedPermissions ?? []),
        ...(role.basePermissions ?? [])
      ]);

      for (const permission of allPermissions) {
        if (!permission) {
          continue;
        }

        if (!permissionSources.has(permission)) {
          permissionSources.set(permission, new Set<string>());
        }

        permissionSources.get(permission)?.add(roleName);
      }
    }

    return [...permissionSources.entries()]
      .map(([key, sources]) => ({
        module: this.resolvePermissionModule(key),
        key,
        label: this.formatPermissionLabel(key),
        risk: this.resolvePermissionRisk(key),
        sources: [...sources].sort((a, b) => a.localeCompare(b))
      }))
      .sort((a, b) => (a.module === b.module ? a.label.localeCompare(b.label) : a.module.localeCompare(b.module)));
  });
  protected readonly permissionModuleOptions = computed(() => {
    const modules = new Set<string>([
      ...this.effectivePermissionRows().map((row) => row.module),
      ...this.currentPermissionRows().map((row) => row.module)
    ]);

    return [
      { label: 'All modules', value: 'all' },
      ...[...modules].sort((a, b) => a.localeCompare(b)).map((module) => ({ label: module, value: module }))
    ];
  });
  protected readonly permissionPerspectiveOptions = [
    { label: 'After Save', value: 'draft' as const },
    { label: 'Current', value: 'current' as const }
  ];
  protected readonly permissionRiskOptions = [
    { label: 'All risks', value: 'all' as const },
    { label: 'Critical', value: 'critical' as const },
    { label: 'Sensitive', value: 'sensitive' as const },
    { label: 'Standard', value: 'standard' as const }
  ];
  protected readonly permissionChangeOptions = [
    { label: 'All changes', value: 'all' as const },
    { label: 'Added', value: 'added' as const },
    { label: 'Removed', value: 'removed' as const },
    { label: 'Unchanged', value: 'unchanged' as const }
  ];
  protected readonly permissionTableRows = computed(() => {
    const baseline = new Map(this.currentPermissionRows().map((row) => [row.key, row]));
    const draft = new Map(this.effectivePermissionRows().map((row) => [row.key, row]));
    const perspective = this.permissionPerspective();

    const rows: Array<{
      module: string;
      key: string;
      label: string;
      risk: 'critical' | 'sensitive' | 'standard';
      sources: string[];
      changeType: 'added' | 'removed' | 'unchanged';
    }> = [];

    if (perspective === 'current') {
      for (const [key, row] of baseline.entries()) {
        rows.push({
          ...row,
          changeType: draft.has(key) ? 'unchanged' : 'removed'
        });
      }
    } else {
      for (const [key, row] of draft.entries()) {
        rows.push({
          ...row,
          changeType: baseline.has(key) ? 'unchanged' : 'added'
        });
      }

      for (const [key, row] of baseline.entries()) {
        if (!draft.has(key)) {
          rows.push({
            ...row,
            changeType: 'removed'
          });
        }
      }
    }

    const moduleFilter = this.permissionModuleFilter();
    const riskFilter = this.permissionRiskFilter();
    const changeFilter = this.permissionChangeFilter();
    const search = this.permissionSearch().trim().toLowerCase();

    return rows
      .filter((row) => moduleFilter === 'all' || row.module === moduleFilter)
      .filter((row) => riskFilter === 'all' || row.risk === riskFilter)
      .filter((row) => changeFilter === 'all' || row.changeType === changeFilter)
      .filter((row) => {
        if (!search) {
          return true;
        }

        return (
          row.module.toLowerCase().includes(search)
          || row.label.toLowerCase().includes(search)
          || row.sources.some((source) => source.toLowerCase().includes(search))
        );
      })
      .sort((a, b) => (a.module === b.module ? a.label.localeCompare(b.label) : a.module.localeCompare(b.module)));
  });
  protected readonly permissionConflictWarnings = computed(() => {
    const byModule = new Map<string, Set<string>>();
    for (const row of this.effectivePermissionRows()) {
      const parts = row.key.split('.');
      const action = (parts[parts.length - 1] ?? '').toLowerCase();
      if (!byModule.has(row.module)) {
        byModule.set(row.module, new Set<string>());
      }
      byModule.get(row.module)?.add(action);
    }

    const warnings: string[] = [];
    for (const [module, actions] of byModule.entries()) {
      const hasRead = actions.has('view') || actions.has('read') || actions.has('list');
      const hasElevated = actions.has('manage') || actions.has('admin') || actions.has('delete');
      if (hasElevated && !hasRead) {
        warnings.push(`${module}: elevated access exists without View permission.`);
      }

      if (actions.has('admin') && !actions.has('manage')) {
        warnings.push(`${module}: Admin granted without explicit Manage permission.`);
      }
    }

    return warnings;
  });
  protected readonly effectiveSecurityLevel = computed(() => {
    const ranked = this.selectedRoleRecords()
      .filter((role) => !!role.securityLevelName)
      .sort((a, b) => (b.hierarchyLevel ?? 0) - (a.hierarchyLevel ?? 0));

    const effective = ranked[0] ?? null;
    return {
      name: effective?.securityLevelName ?? 'Not set',
      roleName: effective?.name ?? null,
      sources: [...new Set(ranked.map((role) => role.securityLevelName).filter(Boolean) as string[])]
    };
  });

  // Shared time zone catalog keeps labels and flags consistent across settings screens.
  protected timezoneOptions: TimeZoneOption[] = [];
  protected readonly getFlagUrl = getTimeZoneFlagUrl;

  protected readonly localeOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'English (UK)', value: 'en-GB' },
    { label: 'English (India)', value: 'en-IN' },
    { label: 'French', value: 'fr-FR' },
    { label: 'Spanish', value: 'es-ES' }
  ];
  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    timeZone: ['UTC', Validators.required],
    locale: ['en-US', Validators.required],
    roleIds: [[] as string[]],
    monthlyQuota: [null as number | null, [Validators.min(0)]],
    isActive: [true],
    temporaryPassword: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/settings/users']);
      return;
    }

    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timezoneOptions = options;
    });
    this.loadDashboardPackOptions();
    this.loadCurrencyContext();

    this.loading.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.initializeDashboardPackSelection();
      },
      error: () => this.roles.set([])
    });

    this.dataService.getUser(id).subscribe({
      next: (detail) => {
        this.user.set(detail);
        this.form.patchValue({
          fullName: detail.fullName,
          email: detail.email,
          timeZone: detail.timeZone ?? 'UTC',
          locale: detail.locale ?? 'en-US',
          roleIds: detail.roleIds,
          monthlyQuota: detail.monthlyQuota ?? null,
          isActive: detail.isActive,
          temporaryPassword: ''
        });
        this.initializeDashboardPackSelection();
        this.captureInitialState();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/app/settings/users']);
      }
    });
  }

  protected rolesAsOptions() {
    return this.roles().map((role) => ({ label: role.name, value: role.id, description: role.description }));
  }

  protected dashboardPackOptions() {
    const roleLevel = this.resolveCurrentRoleLevel();
    const roleDefault = this.roleDefaultDashboardPacks().find((option) => option.roleLevel === roleLevel)
      ?? {
        key: `role-default:${roleLevel}`,
        name: `H${roleLevel} Pack`,
        type: 'role-default',
        roleLevel,
        templateId: null
      };

    const options = [roleDefault, ...this.customDashboardPacks()];
    return options.map((option) => ({
      label: option.name,
      value: option.key
    }));
  }

  protected formatPermissionLabel(permission: string): string {
    const parts = permission.split('.');
    return parts.length <= 2 ? permission : parts.slice(2).join(' ');
  }

  protected formatRiskLabel(risk: 'critical' | 'sensitive' | 'standard'): string {
    if (risk === 'critical') {
      return 'Critical';
    }

    if (risk === 'sensitive') {
      return 'Sensitive';
    }

    return 'Standard';
  }

  protected formatChangeLabel(changeType: 'added' | 'removed' | 'unchanged'): string {
    if (changeType === 'added') {
      return 'Added';
    }

    if (changeType === 'removed') {
      return 'Removed';
    }

    return 'Unchanged';
  }

  protected generatePassword() {
    const value = this.generatePasswordValue();
    this.form.patchValue({ temporaryPassword: value });
    this.generatedPassword.set(value);
  }

  protected onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UpsertUserRequest = {
      fullName: this.form.value.fullName?.trim() ?? '',
      email: this.form.value.email?.trim().toLowerCase() ?? '',
      userAudience: this.user()?.userAudience ?? 'Internal',
      timeZone: this.form.value.timeZone,
      locale: this.form.value.locale,
      monthlyQuota: this.form.value.monthlyQuota ?? null,
      isActive: !!this.form.value.isActive,
      roleIds: (this.form.value.roleIds ?? []) as string[],
      temporaryPassword: this.form.value.temporaryPassword?.trim() || undefined
    };

    if (payload.roleIds.length === 0) {
      this.form.get('roleIds')?.setErrors({ required: true });
      return;
    }

    const selected = this.user();
    if (!selected) {
      return;
    }

    this.saving.set(true);
    this.dataService.update(selected.id, payload).subscribe({
      next: () => {
        const packRequest = this.resolveDashboardPackRequest(this.selectedDashboardPackKey(), payload.roleIds ?? []);
        if (!packRequest) {
          this.finalizeSave(selected.id, payload, 'User updated');
          return;
        }

        this.updatingDashboardPack.set(true);
        this.dataService.updateDashboardPack(selected.id, packRequest).subscribe({
          next: () => {
            this.updatingDashboardPack.set(false);
            this.finalizeSave(selected.id, payload, 'User and dashboard pack updated');
          },
          error: (error) => {
            this.saving.set(false);
            this.updatingDashboardPack.set(false);
            this.raiseToast('error', this.extractErrorMessage(error) || 'User updated, but dashboard pack update failed');
          }
        });
      },
      error: (error) => {
        this.saving.set(false);
        this.raiseToast('error', this.extractErrorMessage(error) || 'Unable to update user');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadCurrencyContext() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.currencyCode() && this.currencyFallback) {
        this.currencyCode.set(this.currencyFallback);
      }
    });

    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        const resolved = settings.currency || this.currencyFallback;
        if (resolved) {
          this.currencyCode.set(resolved);
        }
      }
    });
  }

  private loadDashboardPackOptions() {
    this.loadingDashboardPackOptions.set(true);
    this.dataService.getDashboardPackOptions().subscribe({
      next: (response) => {
        this.roleDefaultDashboardPacks.set(response.roleDefaults ?? []);
        this.customDashboardPacks.set(response.customPacks ?? []);
        this.loadingDashboardPackOptions.set(false);
        this.initializeDashboardPackSelection();
      },
      error: () => {
        this.roleDefaultDashboardPacks.set([]);
        this.customDashboardPacks.set([]);
        this.loadingDashboardPackOptions.set(false);
      }
    });
  }

  private initializeDashboardPackSelection() {
    const detail = this.user();
    if (!detail) {
      return;
    }

    const roleLevel = this.resolveCurrentRoleLevel(detail.roleIds);
    const roleDefaultKey = `role-default:${roleLevel}`;
    const storedKey = detail.dashboardPackKey ?? null;
    const options = this.dashboardPackOptions().map((option) => option.value);
    const selected = storedKey && options.includes(storedKey) ? storedKey : roleDefaultKey;
    this.selectedDashboardPackKey.set(selected);
  }

  private captureInitialState() {
    this.initialFormState.set(this.serializeFormState());
    this.initialDashboardPackKey.set(this.selectedDashboardPackKey() ?? null);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.generatedPassword.set(null);
  }

  private serializeFormState(): string {
    const value = this.form.getRawValue();
    const normalizedRoleIds = [...(value.roleIds ?? [])].sort();
    return JSON.stringify({
      fullName: value.fullName?.trim() ?? '',
      email: value.email?.trim().toLowerCase() ?? '',
      timeZone: value.timeZone ?? 'UTC',
      locale: value.locale ?? 'en-US',
      monthlyQuota: value.monthlyQuota ?? null,
      isActive: !!value.isActive,
      roleIds: normalizedRoleIds,
      temporaryPassword: value.temporaryPassword?.trim() ?? ''
    });
  }

  private resolveCurrentRoleLevel(roleIds?: string[]): number {
    const selectedRoleIds = roleIds ?? ((this.form.value.roleIds ?? []) as string[]);
    const levelByRoleId = new Map(
      this.roles().map((role) => [role.id, Math.max(1, role.hierarchyLevel ?? 1)])
    );
    const levels = selectedRoleIds
      .map((roleId) => levelByRoleId.get(roleId))
      .filter((level): level is number => typeof level === 'number');

    return levels.length ? Math.max(...levels) : 1;
  }

  private resolveDashboardPackRequest(selectedKey: string | null, roleIds: string[]) {
    const fallbackRoleLevel = this.resolveCurrentRoleLevel(roleIds);

    if (!selectedKey || selectedKey.startsWith('role-default:')) {
      const levelPart = selectedKey?.replace('role-default:', '').trim() ?? '';
      const parsed = Number(levelPart);
      const roleLevel = Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackRoleLevel;
      return {
        sourceType: 'role-default' as const,
        roleLevel,
        templateId: null
      };
    }

    if (selectedKey.startsWith('custom:')) {
      const templateId = selectedKey.replace('custom:', '').trim();
      if (!templateId) {
        return null;
      }
      return {
        sourceType: 'custom' as const,
        roleLevel: null,
        templateId
      };
    }

    return null;
  }

  private resolvePermissionModule(permission: string): string {
    const parts = permission.split('.');
    return parts.length >= 2 ? parts[1] ?? 'General' : 'General';
  }

  private finalizeSave(userId: string, payload: UpsertUserRequest, successMessage: string) {
    this.dataService.getUser(userId).subscribe({
      next: (latest) => {
        this.saving.set(false);
        this.user.set(latest);
        this.form.patchValue({
          fullName: latest.fullName,
          email: latest.email,
          timeZone: latest.timeZone ?? 'UTC',
          locale: latest.locale ?? 'en-US',
          roleIds: latest.roleIds,
          monthlyQuota: latest.monthlyQuota ?? null,
          isActive: latest.isActive,
          temporaryPassword: ''
        });
        this.initializeDashboardPackSelection();
        this.captureInitialState();

        const payloadRoles = [...(payload.roleIds ?? [])].sort();
        const latestRoles = [...(latest.roleIds ?? [])].sort();
        const rolesMatch = JSON.stringify(payloadRoles) === JSON.stringify(latestRoles);

        if (!rolesMatch) {
          this.raiseToast('error', 'Save was acknowledged, but role changes were not applied.');
          return;
        }

        this.raiseToast('success', successMessage);
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Saved, but failed to refresh latest user details.');
      }
    });
  }

  private extractErrorMessage(error: unknown): string | null {
    if (!(error instanceof HttpErrorResponse)) {
      return null;
    }

    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error.trim();
    }

    if (error.error && typeof error.error === 'object') {
      const message = (error.error as { message?: unknown }).message;
      if (typeof message === 'string' && message.trim()) {
        return message.trim();
      }
    }

    return null;
  }

  private resolvePermissionRisk(permission: string): 'critical' | 'sensitive' | 'standard' {
    const normalized = permission.toLowerCase();
    if (
      normalized.endsWith('.admin')
      || normalized.endsWith('.manage')
      || normalized.endsWith('.delete')
      || normalized.includes('.security.')
      || normalized.includes('.billing.')
    ) {
      return 'critical';
    }

    if (
      normalized.endsWith('.approve')
      || normalized.endsWith('.export')
      || normalized.endsWith('.assign')
      || normalized.includes('.settings.')
    ) {
      return 'sensitive';
    }

    return 'standard';
  }

  private generatePasswordValue() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upper = alphabet.toUpperCase();
    const digits = '0123456789';
    const symbols = '!@$?*#';
    const pool = alphabet + upper + digits + symbols;
    let value = '';
    for (let i = 0; i < 14; i++) {
      const index = Math.floor(Math.random() * pool.length);
      value += pool[index];
    }
    return value;
  }
}
