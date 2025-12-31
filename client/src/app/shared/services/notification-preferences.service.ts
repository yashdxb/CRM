import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationPreferences } from '../../core/notifications/notification.service';

@Injectable({ providedIn: 'root' })
export class NotificationPreferencesService {
  private readonly http = inject(HttpClient);

  getPreferences() {
    return this.http.get<NotificationPreferences>(`${environment.apiUrl}/api/notifications/preferences`);
  }

  updatePreferences(preferences: NotificationPreferences) {
    return this.http.put<NotificationPreferences>(
      `${environment.apiUrl}/api/notifications/preferences`,
      preferences
    );
  }
}
