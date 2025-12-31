import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { NotificationChannel, NotificationService, NotificationType } from '../../../core/notifications';

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
export class NotificationsPage {
  private readonly notificationService = inject(NotificationService);

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

  protected toggle(channel: NotificationChannel, type: NotificationType, enabled: boolean) {
    this.notificationService.updatePreference(channel, type, enabled);
  }

  protected resetPreferences() {
    this.notificationService.resetPreferences();
  }
}
