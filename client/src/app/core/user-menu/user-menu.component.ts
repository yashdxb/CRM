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
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
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
