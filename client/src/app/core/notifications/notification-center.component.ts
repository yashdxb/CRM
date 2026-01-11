import { Component, HostListener, inject, signal } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NotificationInboxItem, NotificationService } from './notification.service';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DatePipe, ButtonModule],
  templateUrl: "./notification-center.component.html",
  styleUrls: ["./notification-center.component.scss"]
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
