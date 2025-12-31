import { Injectable, signal, computed } from '@angular/core';
import { readUserId } from '../auth/token.utils';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationChannel = 'inApp' | 'email';

export interface NotificationChannelPreferences {
  success: boolean;
  error: boolean;
  warning: boolean;
  info: boolean;
}

export interface NotificationPreferences {
  inApp: NotificationChannelPreferences;
  email: NotificationChannelPreferences;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    callback: () => void;
  };
  timestamp: Date;
}

export interface NotificationInboxItem {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  createdAt: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  private readonly _inbox = signal<NotificationInboxItem[]>(this.readInbox());
  private readonly _preferences = signal<NotificationPreferences>(this.readPreferences());
  private currentStorageKey = this.storageKey();
  private currentPrefsKey = this.prefsStorageKey();
  
  readonly notifications = this._notifications.asReadonly();
  readonly hasNotifications = computed(() => this._notifications().length > 0);
  readonly latestNotification = computed(() => this._notifications()[0] ?? null);
  readonly inbox = this._inbox.asReadonly();
  readonly unreadCount = computed(() => this._inbox().filter((item) => !item.read).length);
  readonly preferences = this._preferences.asReadonly();

  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  show(notification: Omit<Notification, 'id' | 'timestamp'>): string {
    this.syncForUser();
    if (!this._preferences().inApp[notification.type]) {
      return '';
    }
    const id = this.generateId();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      dismissible: notification.dismissible ?? true,
      duration: notification.duration ?? this.getDefaultDuration(notification.type)
    };

    this._notifications.update(list => [newNotification, ...list]);
    this.addToInbox(newNotification);

    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => this.dismiss(id), newNotification.duration);
    }

    return id;
  }

  success(title: string, message?: string, action?: Notification['action']): string {
    return this.show({ type: 'success', title, message, action });
  }

  error(title: string, message?: string, action?: Notification['action']): string {
    return this.show({ type: 'error', title, message, action, duration: 8000 });
  }

  warning(title: string, message?: string, action?: Notification['action']): string {
    return this.show({ type: 'warning', title, message, action });
  }

  info(title: string, message?: string, action?: Notification['action']): string {
    return this.show({ type: 'info', title, message, action });
  }

  pushInbox(type: NotificationType, title: string, message?: string): string {
    this.syncForUser();
    if (!this._preferences().inApp[type]) {
      return '';
    }
    const id = this.generateId();
    const entry: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date(),
      dismissible: true,
      duration: 0
    };
    this.addToInbox(entry);
    return id;
  }

  dismiss(id: string): void {
    this._notifications.update(list => list.filter(n => n.id !== id));
  }

  dismissAll(): void {
    this._notifications.set([]);
  }

  markAsRead(id: string): void {
    this.syncForUser();
    this._inbox.update(list => list.map((item) => (item.id === id ? { ...item, read: true } : item)));
    this.persistInbox();
  }

  markAllRead(): void {
    this.syncForUser();
    this._inbox.update(list => list.map((item) => ({ ...item, read: true })));
    this.persistInbox();
  }

  clearInbox(): void {
    this.syncForUser();
    this._inbox.set([]);
    this.persistInbox();
  }

  updatePreference(channel: NotificationChannel, type: NotificationType, enabled: boolean): void {
    this.syncForUser();
    const current = this._preferences();
    this._preferences.set({
      ...current,
      [channel]: {
        ...current[channel],
        [type]: enabled
      }
    });
    this.persistPreferences();
  }

  resetPreferences(): void {
    this.syncForUser();
    this._preferences.set(this.defaultPreferences());
    this.persistPreferences();
  }

  setPreferences(preferences: NotificationPreferences): void {
    this.syncForUser();
    this._preferences.set(preferences);
    this.persistPreferences();
  }

  private getDefaultDuration(type: NotificationType): number {
    switch (type) {
      case 'error': return 8000;
      case 'warning': return 6000;
      case 'success': return 4000;
      case 'info': return 5000;
      default: return 5000;
    }
  }

  private addToInbox(notification: Notification) {
    const entry: NotificationInboxItem = {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      createdAt: notification.timestamp.toISOString(),
      read: false
    };
    this._inbox.update((list) => [entry, ...list].slice(0, 50));
    this.persistInbox();
  }

  private syncForUser() {
    const key = this.storageKey();
    if (key === this.currentStorageKey) {
      this.syncPrefsForUser();
      return;
    }
    this.currentStorageKey = key;
    this._inbox.set(this.readInbox());
    this.syncPrefsForUser();
  }

  private syncPrefsForUser() {
    const key = this.prefsStorageKey();
    if (key === this.currentPrefsKey) {
      return;
    }
    this.currentPrefsKey = key;
    this._preferences.set(this.readPreferences());
  }

  private readInbox(): NotificationInboxItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey());
      if (!stored) {
        return [];
      }
      const parsed = JSON.parse(stored) as NotificationInboxItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persistInbox() {
    try {
      localStorage.setItem(this.storageKey(), JSON.stringify(this._inbox()));
    } catch {
      // Ignore storage errors
    }
  }

  private readPreferences(): NotificationPreferences {
    try {
      const stored = localStorage.getItem(this.prefsStorageKey());
      if (!stored) {
        return this.defaultPreferences();
      }
      const parsed = JSON.parse(stored) as NotificationPreferences;
      return parsed?.inApp && parsed?.email ? parsed : this.defaultPreferences();
    } catch {
      return this.defaultPreferences();
    }
  }

  private persistPreferences() {
    try {
      localStorage.setItem(this.prefsStorageKey(), JSON.stringify(this._preferences()));
    } catch {
      // Ignore storage errors
    }
  }

  private defaultPreferences(): NotificationPreferences {
    const defaults: NotificationChannelPreferences = {
      success: true,
      error: true,
      warning: true,
      info: true
    };
    return {
      inApp: { ...defaults },
      email: {
        success: false,
        error: false,
        warning: false,
        info: false
      }
    };
  }

  private storageKey() {
    const userId = readUserId() ?? 'anonymous';
    return `notification_inbox:${userId}`;
  }

  private prefsStorageKey() {
    const userId = readUserId() ?? 'anonymous';
    return `notification_prefs:${userId}`;
  }
}
