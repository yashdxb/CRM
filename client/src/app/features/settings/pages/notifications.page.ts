import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { NotificationChannel, NotificationService, NotificationType } from '../../../core/notifications';
import { NotificationPreferencesService } from '../../../shared/services/notification-preferences.service';
import { AppToastService } from '../../../core/app-toast.service';

interface NotificationPreferenceOption {
  key: NotificationType;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleSwitchModule, ButtonModule, BreadcrumbsComponent],
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
        this.toastService.show('warning', 'Unable to load notification preferences.', 3000);
      }
    });
  }

  protected toggle(channel: NotificationChannel, type: NotificationType, enabled: boolean) {
    this.notificationService.updatePreference(channel, type, enabled);
    this.syncPreferences();
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
}
