import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ButtonModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="notification-container" role="region" aria-label="Notifications" aria-live="polite">
      <div
        *ngFor="let notification of notificationService.notifications()"
        class="notification"
        [ngClass]="'notification--' + notification.type"
        [@slideIn]
        role="alert"
      >
        <div class="notification__icon">
          <i class="pi" [ngClass]="getIcon(notification.type)"></i>
        </div>
        <div class="notification__content">
          <p class="notification__title">{{ notification.title }}</p>
          <p *ngIf="notification.message" class="notification__message">{{ notification.message }}</p>
        </div>
        <button
          *ngIf="notification.action"
          pButton
          type="button"
          class="notification__action p-button-text"
          [label]="notification.action.label"
          (click)="handleAction(notification)"
        ></button>
        <button
          *ngIf="notification.dismissible"
          pButton
          type="button"
          icon="pi pi-times"
          class="notification__dismiss p-button-text"
          (click)="notificationService.dismiss(notification.id)"
          aria-label="Dismiss notification"
        ></button>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 80px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
      width: 100%;
      pointer-events: none;
    }

    .notification {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);
      pointer-events: auto;
      backdrop-filter: blur(10px);
    }

    .notification__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      flex-shrink: 0;
    }

    .notification--success .notification__icon {
      background: rgba(16, 185, 129, 0.12);
      color: #059669;
    }

    .notification--error .notification__icon {
      background: rgba(239, 68, 68, 0.12);
      color: #dc2626;
    }

    .notification--warning .notification__icon {
      background: rgba(245, 158, 11, 0.12);
      color: #d97706;
    }

    .notification--info .notification__icon {
      background: rgba(59, 130, 246, 0.12);
      color: #2563eb;
    }

    .notification__content {
      flex: 1;
      min-width: 0;
    }

    .notification__title {
      font-weight: 600;
      font-size: 0.9rem;
      color: #0f172a;
      margin: 0 0 2px;
    }

    .notification__message {
      font-size: 0.85rem;
      color: #64748b;
      margin: 0;
      line-height: 1.4;
    }

    .notification__action.p-button {
      padding: 6px 12px;
      border-radius: 8px;
      border: none;
      background: rgba(99, 102, 241, 0.1);
      color: #4f46e5;
      font-weight: 600;
      font-size: 0.8rem;
      transition: background 0.15s ease;
      white-space: nowrap;
    }

    .notification__action.p-button:hover {
      background: rgba(99, 102, 241, 0.2);
    }

    .notification__dismiss.p-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #94a3b8;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .notification__dismiss.p-button:hover {
      background: rgba(15, 23, 42, 0.06);
      color: #475569;
    }

    @media (max-width: 480px) {
      .notification-container {
        top: auto;
        bottom: 24px;
        right: 16px;
        left: 16px;
        max-width: none;
      }
    }
  `]
})
export class NotificationContainerComponent {
  protected readonly notificationService = inject(NotificationService);

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'pi-check-circle';
      case 'error': return 'pi-times-circle';
      case 'warning': return 'pi-exclamation-triangle';
      case 'info': return 'pi-info-circle';
      default: return 'pi-info-circle';
    }
  }

  handleAction(notification: Notification): void {
    notification.action?.callback();
    this.notificationService.dismiss(notification.id);
  }
}
