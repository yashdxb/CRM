import { Injectable, inject, signal } from '@angular/core';
import { NotificationService } from './notifications/notification.service';

export type AppToastTone = 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class AppToastService {
  private readonly notificationService = inject(NotificationService);
  private readonly toast = signal<{ tone: AppToastTone; message: string } | null>(null);
  readonly toastState = this.toast.asReadonly();

  show(tone: AppToastTone, message: string, durationMs = 3000) {
    this.toast.set({ tone, message });
    this.notificationService.pushInbox(tone, message);
    window.setTimeout(() => this.clear(), durationMs);
  }

  clear() {
    this.toast.set(null);
  }
}
