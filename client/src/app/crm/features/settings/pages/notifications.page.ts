import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { EmailAlertPreferences, NotificationChannel, NotificationService, NotificationType } from '../../../../core/notifications';
import { NotificationPreferencesService } from '../../../../shared/services/notification-preferences.service';
import { AppToastService } from '../../../../core/app-toast.service';

interface NotificationPreferenceOption {
  key: NotificationType;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleSwitchModule, ButtonModule, InputTextModule, BreadcrumbsComponent],
  templateUrl: './notifications.page.html',
  styleUrl: './notifications.page.scss'
})
export class NotificationsPage implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly preferencesApi = inject(NotificationPreferencesService);
  private readonly toastService = inject(AppToastService);

  protected readonly preferences = this.notificationService.preferences;

  protected readonly options: NotificationPreferenceOption[] = [
    { key: 'success', label: 'Success', description: 'Saved, completed, or success updates.', icon: 'pi pi-check-circle' },
    { key: 'error', label: 'Errors', description: 'Failures, blocked actions, or validation errors.', icon: 'pi pi-exclamation-circle' },
    { key: 'warning', label: 'Warnings', description: 'At-risk deals or important attention items.', icon: 'pi pi-exclamation-triangle' },
    { key: 'info', label: 'Info', description: 'Informational nudges and helpful updates.', icon: 'pi pi-info-circle' }
  ];

  protected readonly emailDisabled = computed(() =>
    Object.values(this.preferences().email).every((value) => !value)
  );

  ngOnInit(): void {
    this.preferencesApi.getPreferences().subscribe({
      next: (prefs) => this.notificationService.setPreferences(prefs),
      error: () => {
        this.toastService.show('error', 'Unable to load notification preferences.', 3000);
      }
    });
  }

  protected toggle(channel: NotificationChannel, type: NotificationType, enabled: boolean | { checked?: boolean }) {
    const resolved = this.resolveToggleValue(enabled);
    this.notificationService.updatePreference(channel, type, resolved);
    this.syncPreferences();
  }

  protected toggleAlertsEnabled(enabled: boolean | { checked?: boolean }) {
    const current = this.preferences();
    const resolved = this.resolveToggleValue(enabled);
    this.notificationService.setPreferences({ ...current, alertsEnabled: resolved });
    this.syncPreferences();
  }

  protected toggleEmailAlert(key: keyof EmailAlertPreferences, enabled: boolean | { checked?: boolean }) {
    const current = this.preferences();
    const resolved = this.resolveToggleValue(enabled);
    this.notificationService.setPreferences({
      ...current,
      emailAlerts: {
        ...current.emailAlerts,
        [key]: resolved
      }
    });
    this.syncPreferences();
  }

  protected updateEmailAlertValue(key: keyof EmailAlertPreferences, value: number | string) {
    const current = this.preferences();
    const parsed = typeof value === 'number' ? value : Number(value);
    const nextValue = Number.isFinite(parsed) ? Math.max(1, parsed) : 1;
    this.notificationService.setPreferences({
      ...current,
      emailAlerts: {
        ...current.emailAlerts,
        [key]: nextValue
      }
    });
    this.syncPreferences();
  }

  protected getPreference(channel: NotificationChannel, type: NotificationType): boolean {
    return this.preferences()[channel][type];
  }

  protected setPreference(channel: NotificationChannel, type: NotificationType, enabled: boolean): void {
    this.toggle(channel, type, enabled);
  }

  protected get alertsEnabled(): boolean {
    return this.preferences().alertsEnabled;
  }

  protected set alertsEnabled(value: boolean) {
    this.toggleAlertsEnabled(value);
  }

  protected resetPreferences() {
    this.notificationService.resetPreferences();
    this.syncPreferences();
  }

  private syncPreferences() {
    const current = this.preferences();
    this.preferencesApi.updatePreferences(current).subscribe({
      next: (prefs) => this.notificationService.setPreferences(prefs),
      error: () => {
        this.toastService.show('error', 'Unable to save notification preferences.', 3000);
      }
    });
  }

  private resolveToggleValue(event: boolean | { checked?: boolean } | null | undefined): boolean {
    if (typeof event === 'boolean') {
      return event;
    }
    if (event && typeof event === 'object' && typeof event.checked === 'boolean') {
      return event.checked;
    }
    return false;
  }
}
