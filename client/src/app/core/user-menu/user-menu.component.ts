import { Component, inject, signal, HostListener, ElementRef, computed } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../theme/theme.service';
import { readTokenContext } from '../auth/token.utils';
import { AuthService } from '../auth/auth.service';

export interface UserInfo {
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [NgIf, NgClass, AvatarModule, ButtonModule],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }),
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }))
      ])
    ])
  ],
  template: `
    <div class="user-menu" #menuContainer>
      <button
        pButton
        type="button"
        class="user-menu__trigger p-button-text"
        (click)="toggleMenu()"
        [attr.aria-expanded]="isOpen()"
      >
        <p-avatar 
          [label]="initials()" 
          shape="circle" 
          styleClass="user-menu__avatar"
          [style]="{ 'background': 'linear-gradient(135deg, #6366f1, #8b5cf6)', 'color': 'white' }"
        ></p-avatar>
        <div class="user-menu__info">
          <span class="user-menu__name">{{ user().fullName }}</span>
          <span class="user-menu__role">{{ user().role }}</span>
        </div>
        <i class="pi pi-chevron-down user-menu__chevron" [ngClass]="{ 'user-menu__chevron--open': isOpen() }"></i>
      </button>

      <div class="user-menu__dropdown" *ngIf="isOpen()" [@dropdownAnimation]>
        <div class="user-menu__header">
          <p-avatar 
            [label]="initials()" 
            shape="circle" 
            size="large"
            [style]="{ 'background': 'linear-gradient(135deg, #6366f1, #8b5cf6)', 'color': 'white' }"
          ></p-avatar>
          <div>
            <p class="user-menu__header-name">{{ user().fullName }}</p>
            <p class="user-menu__header-email">{{ user().email }}</p>
          </div>
        </div>

        <div class="user-menu__divider"></div>

        <div class="user-menu__section">
          <button pButton type="button" class="user-menu__item p-button-text" (click)="navigateTo('/app/profile')">
            <i class="pi pi-user"></i>
            <span>My Profile</span>
          </button>
          <button pButton type="button" class="user-menu__item p-button-text" (click)="navigateTo('/app/settings')">
            <i class="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </div>

        <div class="user-menu__divider"></div>

        <div class="user-menu__section">
          <button pButton type="button" class="user-menu__item p-button-text" (click)="toggleTheme()">
            <i class="pi" [ngClass]="themeService.themeIcon()"></i>
            <span>{{ themeService.themeLabel() }}</span>
            <span class="user-menu__badge">{{ themeService.isDarkMode() ? 'On' : 'Off' }}</span>
          </button>
          <button pButton type="button" class="user-menu__item p-button-text" (click)="openKeyboardShortcuts()">
            <i class="pi pi-key"></i>
            <span>Keyboard Shortcuts</span>
            <kbd>?</kbd>
          </button>
        </div>

        <div class="user-menu__divider"></div>

        <div class="user-menu__section">
          <button pButton type="button" class="user-menu__item user-menu__item--danger p-button-text" (click)="logout()">
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-menu {
      position: relative;
    }

    .user-menu__trigger.p-button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px 6px 6px;
      border: none;
      border-radius: 12px;
      background: transparent;
      transition: background 0.15s ease;
    }

    .user-menu__trigger.p-button:hover {
      background: rgba(15, 23, 42, 0.06);
    }

    .user-menu__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .user-menu__name {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-strong, #0f172a);
    }

    .user-menu__role {
      font-size: 0.75rem;
      color: var(--text-subtle, #64748b);
    }

    .user-menu__chevron {
      font-size: 0.7rem;
      color: var(--text-subtle, #94a3b8);
      transition: transform 0.2s ease;
    }

    .user-menu__chevron--open {
      transform: rotate(180deg);
    }

    .user-menu__dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 280px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.05);
      overflow: hidden;
      z-index: 1000;
    }

    .user-menu__header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    }

    .user-menu__header-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #0f172a;
      margin: 0;
    }

    .user-menu__header-email {
      font-size: 0.8rem;
      color: #64748b;
      margin: 0;
    }

    .user-menu__divider {
      height: 1px;
      background: #e2e8f0;
      margin: 0;
    }

    .user-menu__section {
      padding: 8px;
    }

    .user-menu__item.p-button {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      border-radius: 10px;
      background: transparent;
      font-family: inherit;
      font-size: 0.875rem;
      color: #334155;
      text-align: left;
      transition: background 0.15s ease;
    }

    .user-menu__item.p-button:hover {
      background: #f1f5f9;
    }

    .user-menu__item .pi {
      width: 18px;
      text-align: center;
      color: #64748b;
    }

    .user-menu__item span:first-of-type {
      flex: 1;
    }

    .user-menu__item--danger {
      color: #dc2626;
    }

    .user-menu__item--danger .pi {
      color: #dc2626;
    }

    .user-menu__item--danger:hover {
      background: rgba(220, 38, 38, 0.08);
    }

    .user-menu__badge {
      padding: 2px 8px;
      border-radius: 6px;
      background: #e0e7ff;
      color: #4f46e5;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .user-menu__item kbd {
      padding: 2px 6px;
      border-radius: 4px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      font-size: 0.7rem;
      font-family: inherit;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .user-menu__info {
        display: none;
      }

      .user-menu__chevron {
        display: none;
      }

      .user-menu__trigger.p-button {
        padding: 6px;
      }
    }
  `]
})
export class UserMenuComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly authService = inject(AuthService);

  protected readonly isOpen = signal(false);
  protected readonly user = signal<UserInfo>(this.getUserFromToken());

  // Computed signal for initials to avoid recalculation on each change detection
  protected readonly initials = computed(() => {
    return this.user().fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isOpen.set(false);
  }

  toggleMenu(): void {
    this.isOpen.update(v => !v);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  openKeyboardShortcuts(): void {
    // Will dispatch event to show shortcuts modal
    window.dispatchEvent(new CustomEvent('show-keyboard-shortcuts'));
    this.isOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.isOpen.set(false);
  }

  private getUserFromToken(): UserInfo {
    const context = readTokenContext();
    if (!context) {
      return { fullName: 'Guest', email: '', role: 'Signed out' };
    }

    const payload = context.payload;
    const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const roles = Array.isArray(roleClaim)
      ? roleClaim.filter((role) => typeof role === 'string')
      : typeof roleClaim === 'string'
        ? [roleClaim]
        : [];

    const fullName = typeof payload['unique_name'] === 'string' ? payload['unique_name'] : 'User';
    const email = typeof payload['email'] === 'string' ? payload['email'] : '';
    const role = roles[0] ?? 'User';

    return { fullName, email, role };
  }
}
