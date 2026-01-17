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
  protected readonly user = signal<UserDetailResponse | null>(null);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly generatedPassword = signal<string | null>(null);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly timezoneOptions = [
    {
      label: 'UTC+13:00',
      items: [{ label: 'UTC+13:00 - Auckland, New Zealand', value: 'Pacific/Auckland', iconClass: 'tz-nz' }]
    },
    {
      label: 'UTC+12:00',
      items: [
        { label: 'UTC+12:00 - Sydney, Australia', value: 'Australia/Sydney', iconClass: 'tz-au' },
        { label: 'UTC+12:00 - Melbourne, Australia', value: 'Australia/Melbourne', iconClass: 'tz-au' }
      ]
    },
    {
      label: 'UTC+10:30',
      items: [{ label: 'UTC+10:30 - Hobart, Australia', value: 'Australia/Hobart', iconClass: 'tz-au' }]
    },
    {
      label: 'UTC+10:00',
      items: [
        { label: 'UTC+10:00 - Brisbane, Australia', value: 'Australia/Brisbane', iconClass: 'tz-au' },
        { label: 'UTC+10:00 - Darwin, Australia', value: 'Australia/Darwin', iconClass: 'tz-au' },
        { label: 'UTC+10:00 - Seoul, South Korea', value: 'Asia/Seoul', iconClass: 'tz-kr' },
        { label: 'UTC+10:00 - Tokyo, Japan', value: 'Asia/Tokyo', iconClass: 'tz-jp' }
      ]
    },
    {
      label: 'UTC+9:30',
      items: [{ label: 'UTC+09:30 - Adelaide, Australia', value: 'Australia/Adelaide', iconClass: 'tz-au' }]
    },
    {
      label: 'UTC+8:00',
      items: [
        { label: 'UTC+08:00 - Perth, Australia', value: 'Australia/Perth', iconClass: 'tz-au' },
        { label: 'UTC+08:00 - Singapore', value: 'Asia/Singapore', iconClass: 'tz-sg' },
        { label: 'UTC+08:00 - Hong Kong', value: 'Asia/Hong_Kong', iconClass: 'tz-hk' },
        { label: 'UTC+08:00 - Shanghai, China', value: 'Asia/Shanghai', iconClass: 'tz-cn' },
        { label: 'UTC+08:00 - Manila, Philippines', value: 'Asia/Manila', iconClass: 'tz-ph' }
      ]
    },
    {
      label: 'UTC+7:00',
      items: [{ label: 'UTC+07:00 - Jakarta, Indonesia', value: 'Asia/Jakarta', iconClass: 'tz-id' }]
    },
    {
      label: 'UTC+5:30',
      items: [{ label: 'UTC+05:30 - Kolkata, India', value: 'Asia/Kolkata', iconClass: 'tz-in' }]
    },
    {
      label: 'UTC+4:00',
      items: [{ label: 'UTC+04:00 - Dubai, United Arab Emirates', value: 'Asia/Dubai', iconClass: 'tz-ae' }]
    },
    {
      label: 'UTC+3:00',
      items: [
        { label: 'UTC+03:00 - Istanbul, Turkey', value: 'Europe/Istanbul', iconClass: 'tz-tr' },
        { label: 'UTC+03:00 - Riyadh, Saudi Arabia', value: 'Asia/Riyadh', iconClass: 'tz-sa' },
        { label: 'UTC+03:00 - Moscow, Russia', value: 'Europe/Moscow', iconClass: 'tz-ru' }
      ]
    },
    {
      label: 'UTC+2:00',
      items: [
        { label: 'UTC+02:00 - Johannesburg, South Africa', value: 'Africa/Johannesburg', iconClass: 'tz-za' },
        { label: 'UTC+02:00 - Jerusalem, Israel', value: 'Asia/Jerusalem', iconClass: 'tz-il' }
      ]
    },
    {
      label: 'UTC+1:00',
      items: [
        { label: 'UTC+01:00 - Berlin, Germany', value: 'Europe/Berlin', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Rome, Italy', value: 'Europe/Rome', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Paris, France', value: 'Europe/Paris', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Madrid, Spain', value: 'Europe/Madrid', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Amsterdam, Netherlands', value: 'Europe/Amsterdam', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Stockholm, Sweden', value: 'Europe/Stockholm', iconClass: 'tz-eu' },
        { label: 'UTC+01:00 - Oslo, Norway', value: 'Europe/Oslo', iconClass: 'tz-eu' }
      ]
    },
    {
      label: 'UTC+0:00',
      items: [{ label: 'UTC+00:00 - London, United Kingdom', value: 'Europe/London', iconClass: 'tz-uk' }]
    },
    {
      label: 'UTC-3:00',
      items: [
        { label: 'UTC-03:00 - Sao Paulo, Brazil', value: 'America/Sao_Paulo', iconClass: 'tz-br' },
        { label: 'UTC-03:00 - Buenos Aires, Argentina', value: 'America/Argentina/Buenos_Aires', iconClass: 'tz-ar' }
      ]
    },
    {
      label: 'UTC-3:30',
      items: [{ label: 'UTC-03:30 - St. John\'s, Canada', value: 'America/St_Johns', iconClass: 'tz-ca' }]
    },
    {
      label: 'UTC-4:00',
      items: [
        { label: 'UTC-04:00 - Halifax, Canada', value: 'America/Halifax', iconClass: 'tz-ca' },
        { label: 'UTC-04:00 - Santiago, Chile', value: 'America/Santiago', iconClass: 'tz-cl' }
      ]
    },
    {
      label: 'UTC-5:00',
      items: [
        { label: 'UTC-05:00 - Toronto, Canada', value: 'America/Toronto', iconClass: 'tz-us' },
        { label: 'UTC-05:00 - New York, United States', value: 'America/New_York', iconClass: 'tz-us' },
        { label: 'UTC-05:00 - Bogota, Colombia', value: 'America/Bogota', iconClass: 'tz-co' },
        { label: 'UTC-05:00 - Lima, Peru', value: 'America/Lima', iconClass: 'tz-pe' }
      ]
    },
    {
      label: 'UTC-6:00',
      items: [
        { label: 'UTC-06:00 - Winnipeg, Canada', value: 'America/Winnipeg', iconClass: 'tz-us' },
        { label: 'UTC-06:00 - Chicago, United States', value: 'America/Chicago', iconClass: 'tz-us' },
        { label: 'UTC-06:00 - Mexico City, Mexico', value: 'America/Mexico_City', iconClass: 'tz-mx' }
      ]
    },
    {
      label: 'UTC-7:00',
      items: [
        { label: 'UTC-07:00 - Edmonton, Canada', value: 'America/Edmonton', iconClass: 'tz-us' },
        { label: 'UTC-07:00 - Denver, United States', value: 'America/Denver', iconClass: 'tz-us' }
      ]
    },
    {
      label: 'UTC-8:00',
      items: [
        { label: 'UTC-08:00 - Vancouver, Canada', value: 'America/Vancouver', iconClass: 'tz-us' },
        { label: 'UTC-08:00 - Los Angeles, United States', value: 'America/Los_Angeles', iconClass: 'tz-us' }
      ]
    },
    {
      label: 'UTC-9:00',
      items: [{ label: 'UTC-09:00 - Anchorage, United States', value: 'America/Anchorage', iconClass: 'tz-us' }]
    },
    {
      label: 'UTC-10:00',
      items: [{ label: 'UTC-10:00 - Honolulu, United States', value: 'Pacific/Honolulu', iconClass: 'tz-us' }]
    }
  ];

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
