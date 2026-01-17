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
    { label: 'Auckland, New Zealand (GMT+13:00)', value: 'Pacific/Auckland', flagCode: 'nz' },
    { label: 'Sydney, Australia (GMT+12:00)', value: 'Australia/Sydney', flagCode: 'au' },
    { label: 'Melbourne, Australia (GMT+12:00)', value: 'Australia/Melbourne', flagCode: 'au' },
    { label: 'Hobart, Australia (GMT+10:30)', value: 'Australia/Hobart', flagCode: 'au' },
    { label: 'Brisbane, Australia (GMT+10:00)', value: 'Australia/Brisbane', flagCode: 'au' },
    { label: 'Darwin, Australia (GMT+10:00)', value: 'Australia/Darwin', flagCode: 'au' },
    { label: 'Seoul, South Korea (GMT+10:00)', value: 'Asia/Seoul', flagCode: 'kr' },
    { label: 'Tokyo, Japan (GMT+10:00)', value: 'Asia/Tokyo', flagCode: 'jp' },
    { label: 'Adelaide, Australia (GMT+09:30)', value: 'Australia/Adelaide', flagCode: 'au' },
    { label: 'Perth, Australia (GMT+08:00)', value: 'Australia/Perth', flagCode: 'au' },
    { label: 'Singapore (GMT+08:00)', value: 'Asia/Singapore', flagCode: 'sg' },
    { label: 'Hong Kong (GMT+08:00)', value: 'Asia/Hong_Kong', flagCode: 'hk' },
    { label: 'Shanghai, China (GMT+08:00)', value: 'Asia/Shanghai', flagCode: 'cn' },
    { label: 'Manila, Philippines (GMT+08:00)', value: 'Asia/Manila', flagCode: 'ph' },
    { label: 'Jakarta, Indonesia (GMT+07:00)', value: 'Asia/Jakarta', flagCode: 'id' },
    { label: 'Kolkata, India (GMT+05:30)', value: 'Asia/Kolkata', flagCode: 'in' },
    { label: 'Dubai, United Arab Emirates (GMT+04:00)', value: 'Asia/Dubai', flagCode: 'ae' },
    { label: 'Istanbul, Turkey (GMT+03:00)', value: 'Europe/Istanbul', flagCode: 'tr' },
    { label: 'Riyadh, Saudi Arabia (GMT+03:00)', value: 'Asia/Riyadh', flagCode: 'sa' },
    { label: 'Moscow, Russia (GMT+03:00)', value: 'Europe/Moscow', flagCode: 'ru' },
    { label: 'Johannesburg, South Africa (GMT+02:00)', value: 'Africa/Johannesburg', flagCode: 'za' },
    { label: 'Jerusalem, Israel (GMT+02:00)', value: 'Asia/Jerusalem', flagCode: 'il' },
    { label: 'Berlin, Germany (GMT+01:00)', value: 'Europe/Berlin', flagCode: 'de' },
    { label: 'Rome, Italy (GMT+01:00)', value: 'Europe/Rome', flagCode: 'it' },
    { label: 'Paris, France (GMT+01:00)', value: 'Europe/Paris', flagCode: 'fr' },
    { label: 'Madrid, Spain (GMT+01:00)', value: 'Europe/Madrid', flagCode: 'es' },
    { label: 'Amsterdam, Netherlands (GMT+01:00)', value: 'Europe/Amsterdam', flagCode: 'nl' },
    { label: 'Stockholm, Sweden (GMT+01:00)', value: 'Europe/Stockholm', flagCode: 'se' },
    { label: 'Oslo, Norway (GMT+01:00)', value: 'Europe/Oslo', flagCode: 'no' },
    { label: 'London, United Kingdom (GMT+00:00)', value: 'Europe/London', flagCode: 'gb' },
    { label: 'Sao Paulo, Brazil (GMT-03:00)', value: 'America/Sao_Paulo', flagCode: 'br' },
    { label: 'Buenos Aires, Argentina (GMT-03:00)', value: 'America/Argentina/Buenos_Aires', flagCode: 'ar' },
    { label: 'St. John\'s, Canada (GMT-03:30)', value: 'America/St_Johns', flagCode: 'ca' },
    { label: 'Halifax, Canada (GMT-04:00)', value: 'America/Halifax', flagCode: 'ca' },
    { label: 'Santiago, Chile (GMT-04:00)', value: 'America/Santiago', flagCode: 'cl' },
    { label: 'Toronto, Canada (GMT-05:00)', value: 'America/Toronto', flagCode: 'ca' },
    { label: 'New York, United States (GMT-05:00)', value: 'America/New_York', flagCode: 'us' },
    { label: 'Bogota, Colombia (GMT-05:00)', value: 'America/Bogota', flagCode: 'co' },
    { label: 'Lima, Peru (GMT-05:00)', value: 'America/Lima', flagCode: 'pe' },
    { label: 'Winnipeg, Canada (GMT-06:00)', value: 'America/Winnipeg', flagCode: 'ca' },
    { label: 'Chicago, United States (GMT-06:00)', value: 'America/Chicago', flagCode: 'us' },
    { label: 'Mexico City, Mexico (GMT-06:00)', value: 'America/Mexico_City', flagCode: 'mx' },
    { label: 'Edmonton, Canada (GMT-07:00)', value: 'America/Edmonton', flagCode: 'ca' },
    { label: 'Denver, United States (GMT-07:00)', value: 'America/Denver', flagCode: 'us' },
    { label: 'Vancouver, Canada (GMT-08:00)', value: 'America/Vancouver', flagCode: 'ca' },
    { label: 'Los Angeles, United States (GMT-08:00)', value: 'America/Los_Angeles', flagCode: 'us' },
    { label: 'Anchorage, United States (GMT-09:00)', value: 'America/Anchorage', flagCode: 'us' },
    { label: 'Honolulu, United States (GMT-10:00)', value: 'Pacific/Honolulu', flagCode: 'us' }
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

  protected getFlagUrl(flagCode?: string): string {
    if (!flagCode) {
      return 'https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png';
    }
    return `https://flagcdn.com/w20/${flagCode}.png`;
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
