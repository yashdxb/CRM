import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { RoleSummary, UpsertUserRequest, UserDetailResponse } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  imports: [
    CommonModule,
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
  protected readonly user = signal<UserDetailResponse | null>(null);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly generatedPassword = signal<string | null>(null);
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

    this.loading.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => this.roles.set(roles),
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
          isActive: detail.isActive,
          temporaryPassword: ''
        });
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
        this.saving.set(false);
        this.raiseToast('success', 'User updated');
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
