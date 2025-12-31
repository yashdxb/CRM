import { Component, HostListener, inject, signal } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NotificationInboxItem, NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DatePipe, ButtonModule],
  template: `
    <div class="notification-center" [class.open]="open()">
      <button
        pButton
        type="button"
        class="notification-center__button p-button-rounded p-button-text"
        (click)="toggle()"
        aria-label="Open notifications"
      >
        <i class="pi pi-bell"></i>
        <span class="notification-center__badge" *ngIf="unreadCount()">{{ unreadCount() }}</span>
      </button>

      <div class="notification-center__panel" *ngIf="open()">
        <header class="notification-center__header">
          <div>
            <h4>Notifications</h4>
            <span>{{ unreadCount() }} unread</span>
          </div>
          <div class="notification-center__actions">
            <button
              pButton
              type="button"
              class="notification-center__action p-button-text"
              label="Mark all read"
              (click)="markAllRead()"
              [disabled]="!unreadCount()"
            ></button>
            <button
              pButton
              type="button"
              class="notification-center__action p-button-text"
              label="Clear"
              (click)="clearAll()"
              [disabled]="!items().length"
            ></button>
          </div>
        </header>

        <div class="notification-center__list" *ngIf="items().length; else emptyState">
          <button
            pButton
            type="button"
            class="notification-center__item p-button-text"
            *ngFor="let item of items()"
            [ngClass]="{ 'notification-center__item--unread': !item.read }"
            (click)="markRead(item)"
          >
            <span class="notification-center__dot"></span>
            <div class="notification-center__content">
              <div class="notification-center__title">{{ item.title }}</div>
              <div class="notification-center__message" *ngIf="item.message">{{ item.message }}</div>
              <div class="notification-center__meta">{{ item.createdAt | date:'MMM d, h:mm a' }}</div>
            </div>
            <span class="notification-center__type" [ngClass]="'type--' + item.type">{{ item.type }}</span>
          </button>
        </div>

        <ng-template #emptyState>
          <div class="notification-center__empty">
            <i class="pi pi-bell"></i>
            <p>You're all caught up.</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .notification-center {
      position: relative;
    }

    .notification-center__button.p-button {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: #ffffff;
      color: #475569;
      transition: all 0.2s ease;
    }

    .notification-center__button.p-button:hover {
      border-color: rgba(99, 102, 241, 0.4);
      color: #4f46e5;
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.18);
    }

    .notification-center__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 999px;
      background: #ef4444;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ffffff;
    }

    .notification-center__panel {
      position: absolute;
      right: 0;
      margin-top: 12px;
      width: 360px;
      max-height: 520px;
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
      z-index: 1200;
      display: flex;
      flex-direction: column;
    }

    .notification-center__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 18px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    }

    .notification-center__header h4 {
      margin: 0 0 4px;
      font-size: 1rem;
      color: #0f172a;
    }

    .notification-center__header span {
      font-size: 0.8rem;
      color: #64748b;
    }

    .notification-center__actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .notification-center__action.p-button {
      padding: 0;
      border: none;
      background: transparent;
      color: #4f46e5;
      font-size: 0.75rem;
      font-weight: 600;
      text-align: right;
    }

    .notification-center__action.p-button:disabled {
      color: #cbd5f5;
    }

    .notification-center__list {
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .notification-center__item.p-button {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: start;
      padding: 12px;
      border-radius: 14px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      background: #f8fafc;
      text-align: left;
      transition: all 0.15s ease;
    }

    .notification-center__item--unread {
      background: #ffffff;
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.12);
    }

    .notification-center__item:hover {
      transform: translateY(-1px);
    }

    .notification-center__dot {
      width: 8px;
      height: 8px;
      margin-top: 6px;
      border-radius: 50%;
      background: #94a3b8;
    }

    .notification-center__item--unread .notification-center__dot {
      background: #6366f1;
    }

    .notification-center__title {
      font-weight: 600;
      color: #0f172a;
      font-size: 0.9rem;
    }

    .notification-center__message {
      font-size: 0.82rem;
      color: #64748b;
      margin-top: 4px;
    }

    .notification-center__meta {
      font-size: 0.72rem;
      color: #94a3b8;
      margin-top: 6px;
    }

    .notification-center__type {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 999px;
      text-transform: capitalize;
      background: rgba(148, 163, 184, 0.2);
      color: #475569;
    }

    .notification-center__type.type--success {
      background: rgba(34, 197, 94, 0.15);
      color: #15803d;
    }

    .notification-center__type.type--error {
      background: rgba(239, 68, 68, 0.15);
      color: #b91c1c;
    }

    .notification-center__type.type--warning {
      background: rgba(245, 158, 11, 0.18);
      color: #b45309;
    }

    .notification-center__type.type--info {
      background: rgba(59, 130, 246, 0.15);
      color: #1d4ed8;
    }

    .notification-center__empty {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
    }

    .notification-center__empty i {
      font-size: 1.4rem;
    }

    .notification-center__empty p {
      margin: 0;
      font-size: 0.85rem;
    }
  `]
})
export class NotificationCenterComponent {
  protected readonly notificationService = inject(NotificationService);
  protected readonly open = signal(false);
  protected readonly unreadCount = this.notificationService.unreadCount;
  protected readonly items = this.notificationService.inbox;

  toggle() {
    this.open.update((value) => !value);
  }

  markRead(item: NotificationInboxItem) {
    this.notificationService.markAsRead(item.id);
  }

  markAllRead() {
    this.notificationService.markAllRead();
  }

  clearAll() {
    this.notificationService.clearInbox();
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    if (!this.open()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    const container = target?.closest('.notification-center');
    if (!container) {
      this.open.set(false);
    }
  }
}
