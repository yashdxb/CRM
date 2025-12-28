import { Injectable, signal, computed } from '@angular/core';
import { readUserId } from '../auth/token.utils';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

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
  private currentStorageKey = this.storageKey();
  
  readonly notifications = this._notifications.asReadonly();
  readonly hasNotifications = computed(() => this._notifications().length > 0);
  readonly latestNotification = computed(() => this._notifications()[0] ?? null);
  readonly inbox = this._inbox.asReadonly();
  readonly unreadCount = computed(() => this._inbox().filter((item) => !item.read).length);

  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  show(notification: Omit<Notification, 'id' | 'timestamp'>): string {
    this.syncForUser();
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
      return;
    }
    this.currentStorageKey = key;
    this._inbox.set(this.readInbox());
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

  private storageKey() {
    const userId = readUserId() ?? 'anonymous';
    return `notification_inbox:${userId}`;
  }
}
