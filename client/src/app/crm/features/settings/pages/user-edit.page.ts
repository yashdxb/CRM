import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
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
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
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
  protected readonly loadingDashboardPackOptions = signal(true);
  protected readonly updatingDashboardPack = signal(false);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly generatedPassword = signal<string | null>(null);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

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
          this.saving.set(false);
          this.raiseToast('success', 'User updated');
          return;
        }

        this.updatingDashboardPack.set(true);
        this.dataService.updateDashboardPack(selected.id, packRequest).subscribe({
          next: () => {
            this.saving.set(false);
            this.updatingDashboardPack.set(false);
            this.raiseToast('success', 'User and dashboard pack updated');
          },
          error: () => {
            this.saving.set(false);
            this.updatingDashboardPack.set(false);
            this.raiseToast('error', 'User updated, but dashboard pack update failed');
          }
        });
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to update user');
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
