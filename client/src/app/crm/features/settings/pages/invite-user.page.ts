import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary, UpsertUserRequest } from '../models/user-admin.model';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission, tokenHasRole } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { TimeZoneOption, getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';

@Component({
  selector: 'app-invite-user-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    MultiSelectModule,
    ToggleSwitchModule,
    BreadcrumbsComponent
  ],
  templateUrl: './invite-user.page.html',
  styleUrl: './invite-user.page.scss'
})
export class InviteUserPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly timeZoneService = inject(TimeZoneService);
  private readonly document = inject(DOCUMENT);
  private readonly fieldLabels: Record<string, string> = {
    fullName: 'Full name',
    email: 'Email',
    timeZone: 'Time zone',
    locale: 'Locale',
    roleIds: 'Roles'
  };

  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly loadingRoles = signal(true);
  protected readonly saving = signal(false);
  protected readonly generatedPassword = signal<string | null>(null);
  protected readonly status = signal<{ tone: 'success' | 'error'; message: string } | null>(null);
  // Re-evaluate permissions from storage so freshly issued tokens unlock the button without reloads.
  protected readonly canManageAdmin = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return (
      tokenHasPermission(payload, PERMISSION_KEYS.administrationManage) ||
      tokenHasRole(payload, 'Admin')
    );
  });
  protected readonly inviteDisabledReason = computed(() => {
    if (!readTokenContext()) {
      return 'Your session has expired. Please sign in again.';
    }
    if (!this.canManageAdmin()) {
      return 'You do not have permission to invite users.';
    }
    if (this.saving()) {
      return 'Invite is already sending.';
    }
    if (this.form.invalid) {
      return 'Complete the required fields before sending the invite.';
    }
    return null;
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
    isActive: [true],
    temporaryPassword: ['']
  });

  protected readonly canSubmit = computed(() => this.form.valid && !this.saving() && this.canManageAdmin());

  constructor() {
    this.timeZoneService.getTimeZones().subscribe((options) => {
      this.timezoneOptions = options;
    });
    // Clear the manual "roles required" error once the user selects at least one role.
    this.form.get('roleIds')?.valueChanges.subscribe((roles) => {
      if ((roles ?? []).length > 0) {
        this.form.get('roleIds')?.setErrors(null);
      }
    });
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
        this.raiseStatus('error', 'Unable to load roles. Refresh and try again.');
      }
    });
  }

  protected rolesAsOptions() {
    return this.roles().map((role) => ({ label: role.name, value: role.id, description: role.description }));
  }

  protected handleSubmit() {
    this.syncDomFormValues();
    this.syncRoleErrors();
    if (!this.canManageAdmin()) {
      // Block unauthorized sends while still surfacing a clear UI message.
      this.raiseStatus('error', 'You do not have permission to invite users.');
      return;
    }
    if (this.form.invalid) {
      // Give immediate feedback when required fields are missing so the button doesn't feel unresponsive.
      this.form.markAllAsTouched();
      this.raiseStatus('error', this.buildMissingFieldsMessage());
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
      this.raiseStatus('error', 'Assign at least one role.');
      return;
    }

    this.saving.set(true);
    this.dataService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.raiseStatus('success', 'User invited successfully.');
        this.form.reset({
          fullName: '',
          email: '',
          timeZone: 'UTC',
          locale: 'en-US',
          roleIds: [],
          isActive: true,
          temporaryPassword: ''
        });
        this.generatedPassword.set(null);
      },
      error: () => {
        this.saving.set(false);
        this.raiseStatus('error', 'Unable to invite user.');
      }
    });
  }

  protected generatePassword() {
    const value = this.generatePasswordValue();
    this.form.patchValue({ temporaryPassword: value });
    this.generatedPassword.set(value);
  }

  protected handleInviteClick(event: Event) {
    this.syncDomFormValues();
    this.syncRoleErrors();
    if (!readTokenContext()) {
      event.preventDefault();
      this.raiseStatus('error', 'Your session has expired. Please sign in again.');
      return;
    }
    if (!this.canManageAdmin()) {
      event.preventDefault();
      this.raiseStatus('error', 'You do not have permission to invite users.');
      return;
    }
    if (this.form.invalid) {
      event.preventDefault();
      this.form.markAllAsTouched();
      this.raiseStatus('error', this.buildMissingFieldsMessage());
    }
  }

  private syncRoleErrors() {
    // Normalize any stale role validation errors to keep the form state accurate.
    const roles = (this.form.get('roleIds')?.value ?? []) as string[];
    if (roles.length > 0) {
      this.form.get('roleIds')?.setErrors(null);
    }
  }

  private syncDomFormValues() {
    const fullNameInput = this.document.getElementById('fullName') as HTMLInputElement | null;
    if (fullNameInput) {
      const normalized = fullNameInput.value.trim();
      if (normalized !== this.form.controls.fullName.value) {
        this.form.controls.fullName.setValue(normalized, { emitEvent: false });
      }
    }

    const emailInput = this.document.getElementById('email') as HTMLInputElement | null;
    if (emailInput) {
      const normalized = emailInput.value.trim().toLowerCase();
      if (normalized !== this.form.controls.email.value) {
        this.form.controls.email.setValue(normalized, { emitEvent: false });
      }
    }

    const temporaryPasswordInput = this.document.getElementById('temporaryPassword') as HTMLInputElement | null;
    if (temporaryPasswordInput) {
      const normalized = temporaryPasswordInput.value.trim();
      if (normalized !== this.form.controls.temporaryPassword.value) {
        this.form.controls.temporaryPassword.setValue(normalized, { emitEvent: false });
      }
    }

    this.form.controls.fullName.updateValueAndValidity({ emitEvent: false });
    this.form.controls.email.updateValueAndValidity({ emitEvent: false });
    this.form.controls.temporaryPassword.updateValueAndValidity({ emitEvent: false });
  }

  private buildMissingFieldsMessage() {
    const missing = Object.entries(this.fieldLabels)
      .filter(([key]) => this.form.get(key)?.invalid)
      .map(([, label]) => label);
    if (missing.length === 0) {
      return 'Complete the required fields before sending the invite.';
    }
    return `Complete the required fields: ${missing.join(', ')}.`;
  }

  protected navigateBack() {
    this.router.navigate(['/app/settings']);
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

  private raiseStatus(tone: 'success' | 'error', message: string) {
    this.status.set({ tone, message });
    setTimeout(() => this.status.set(null), 4000);
  }
}
