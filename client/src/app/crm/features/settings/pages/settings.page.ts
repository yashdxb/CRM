import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';

import { ResetPasswordRequest, RoleSummary, UserListItem } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, readUserEmail, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { AppToastService } from '../../../../core/app-toast.service';
import { PresenceService } from '../../../../core/realtime/presence.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    RouterLink,
    SelectModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToggleSwitchModule,
    NgClass,
    NgFor,
    NgIf,
    FormsModule,
    BreadcrumbsComponent
  ],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss'
})
export class SettingsPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);
  private readonly presenceService = inject(PresenceService);

  protected readonly users = signal<UserListItem[]>([]);
  protected readonly totalUsers = signal(0);
  protected readonly roles = signal<RoleSummary[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly roleFilter = signal<'all' | string>('all');
  protected readonly statusFilter = signal<'all' | 'active' | 'inactive'>('all');
  protected readonly includeInactive = signal(false);
  protected readonly loadingUsers = signal(true);
  protected readonly loadingRoles = signal(true);
  protected readonly roleFilterOptions = computed(() => [
    { label: 'All roles', value: 'all' },
    ...this.roles().map((role) => ({ label: role.name, value: role.name }))
  ]);
  protected readonly statusFilterOptions = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];
  protected readonly filteredUsers = computed(() => {
    let rows = [...this.users()];
    const status = this.statusFilter();
    if (status === 'active') {
      rows = rows.filter((user) => user.isActive);
    } else if (status === 'inactive') {
      rows = rows.filter((user) => !user.isActive);
    }

    if (this.roleFilter() !== 'all') {
      rows = rows.filter((user) => user.roles.includes(this.roleFilter()));
    }

    return rows;
  });

  protected readonly activeUsersCount = computed(() =>
    this.users().filter(u => u.isActive).length
  );

  protected readonly inactiveUsersCount = computed(() =>
    this.users().filter(u => !u.isActive).length
  );

  protected readonly canManageTenants = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.tenantsManage);
  });
  protected readonly canManageAdmin = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
  });
  protected readonly canManageLeads = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
  });

  private readonly timeZoneByEmail = new Map<string, string>([
    ['jay.dissa@gmail.com', 'America/Toronto'],
    ['yasser.ahamed@live.com', 'America/Toronto'],
    ['davidjreggio@gmail.com', 'America/Sao_Paulo']
  ]);
  private readonly formatters = new Map<string, Intl.DateTimeFormat>();
  private readonly userLocale = navigator.language || 'en-US';
  private readonly currentUserTimeZone = signal('UTC');
  protected readonly onlineUsers = signal<Set<string>>(new Set());
  private readonly avatarTones = [
    'avatar-tone-1',
    'avatar-tone-2',
    'avatar-tone-3',
    'avatar-tone-4',
    'avatar-tone-5',
    'avatar-tone-6',
    'avatar-tone-7',
    'avatar-tone-8'
  ];

  private searchDebounceId: number | null = null;

  constructor() {
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
    }
    this.loadRoles();
    this.loadUsers();
    this.presenceService.connect();
    this.presenceService.onlineUsers$.subscribe((users) => {
      this.onlineUsers.set(users);
    });
  }

  protected loadUsers() {
    this.loadingUsers.set(true);
    const includeInactive = this.statusFilter() === 'inactive' ? true : this.includeInactive();
    const search = this.searchTerm().trim() || undefined;
    this.dataService
      .search({ includeInactive, search, page: 1, pageSize: 50 })
      .subscribe({
        next: (response) => {
          this.users.set(response.items);
          this.totalUsers.set(response.total);
          this.resolveCurrentUserTimeZone(response.items);
          const merged = new Set(this.onlineUsers());
          response.items
            .filter((user) => user.isOnline)
            .forEach((user) => merged.add(user.id));
          if (merged.size) {
            this.onlineUsers.set(merged);
          }
          this.loadingUsers.set(false);
        },
        error: () => {
          this.loadingUsers.set(false);
          this.raiseToast('error', 'Unable to load users. Please try again.');
        }
      });
  }

  protected loadRoles() {
    this.loadingRoles.set(true);
    this.dataService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.loadingRoles.set(false);
      },
      error: () => {
        this.loadingRoles.set(false);
        this.raiseToast('error', 'Unable to load roles');
      }
    });
  }

  protected toggleIncludeInactive(nextValue: boolean) {
    this.includeInactive.set(nextValue);
    this.loadUsers();
  }

  protected onSearchChange(term: string) {
    this.searchTerm.set(term);
    if (this.searchDebounceId) {
      window.clearTimeout(this.searchDebounceId);
    }
    this.searchDebounceId = window.setTimeout(() => this.loadUsers(), 250);
  }

  protected onRoleFilterChange(value: string | null) {
    this.roleFilter.set(value ?? 'all');
  }

  protected onStatusFilterChange(value: 'all' | 'active' | 'inactive' | null) {
    this.statusFilter.set(value ?? 'all');
    this.loadUsers();
  }

  protected resetFilters() {
    this.searchTerm.set('');
    this.roleFilter.set('all');
    this.statusFilter.set('all');
    this.loadUsers();
  }

  protected startEdit(user: UserListItem) {
    this.router.navigate(['/app/settings/users', user.id, 'edit']);
  }

  protected resetPassword(user: UserListItem) {
    const password = prompt(`Enter a temporary password for ${user.fullName}`, this.generatePasswordValue());
    if (!password) {
      return;
    }

    const trimmed = password.trim();
    if (!trimmed) {
      return;
    }

    const payload: ResetPasswordRequest = { temporaryPassword: trimmed };
    this.dataService.resetPassword(user.id, payload).subscribe({
        next: () => this.raiseToast('success', 'Password reset'),
        error: () => this.raiseToast('error', 'Unable to reset password')
      });
  }

  protected goToTenants() {
    this.router.navigate(['/app/settings/tenants']);
  }

  protected toggleUserStatus(user: UserListItem) {
    const request$ = user.isActive ? this.dataService.deactivate(user.id) : this.dataService.activate(user.id);
    request$.subscribe({
        next: () => {
          this.raiseToast('success', user.isActive ? 'User deactivated' : 'User reactivated');
          this.loadUsers();
        },
        error: () => this.raiseToast('error', 'Unable to update status')
      });
  }

  protected canResendInvite(user: UserListItem): boolean {
    return user.isActive;
  }

  protected resendInvite(user: UserListItem) {
    if (!this.canResendInvite(user)) {
      return;
    }
    if (!confirm(`Resend invite to ${user.fullName}?`)) {
      return;
    }

    this.dataService.resendInvite(user.id).subscribe({
      next: () => this.raiseToast('success', 'Invite resent'),
      error: () => this.raiseToast('error', 'Unable to resend invite')
    });
  }

  protected deleteUser(user: UserListItem) {
    if (!confirm(`Remove ${user.fullName} from the workspace?`)) {
      return;
    }

    this.dataService.delete(user.id).subscribe({
        next: () => {
          this.raiseToast('success', 'User removed');
          this.loadUsers();
        },
        error: () => this.raiseToast('error', 'Unable to delete user')
      });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  protected isOnline(user: UserListItem): boolean {
    return this.onlineUsers().has(user.id);
  }

  protected getAvatarTone(user: UserListItem): string {
    const seed = (user.email || user.fullName || '').trim().toLowerCase();
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    const index = Math.abs(hash) % this.avatarTones.length;
    return this.avatarTones[index];
  }

  protected getAvatarClasses(user: UserListItem): Record<string, boolean> {
    return {
      'avatar-active': user.isActive,
      'avatar-inactive': !user.isActive,
      'avatar-online': this.isOnline(user),
      [this.getAvatarTone(user)]: true
    };
  }

  protected formatLoginTime(user: UserListItem): string {
    if (!user.lastLoginAtUtc) {
      return '';
    }
    const formatter = this.getFormatter(this.currentUserTimeZone());
    return formatter.format(this.parseUtcDate(user.lastLoginAtUtc));
  }

  protected formatLoginDuration(user: UserListItem, isOnline: boolean): string {
    if (!user.lastLoginAtUtc) {
      return '';
    }
    const deltaMs = Date.now() - this.parseUtcDate(user.lastLoginAtUtc).getTime();
    if (!Number.isFinite(deltaMs) || deltaMs < 0) {
      return '';
    }
    const minutes = Math.floor(deltaMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let value = '';
    if (days > 0) {
      value = `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
      value = `${hours}h ${minutes % 60}m`;
    } else {
      value = `${Math.max(minutes, 1)}m`;
    }

    return isOnline ? `Online for ${value}` : `Last seen ${value} ago`;
  }

  private generatePasswordValue() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upper = alphabet.toUpperCase();
    const digits = '0123456789';
    const symbols = '!@$?*#';
    const pool = alphabet + upper + digits + symbols;
    let value = '';
    for (let i = 0; i < 14; i++) {
      const index = Math.floor(Math.random() * pool.length);
      value += pool[index];
    }
    return value;
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  protected getTimeZoneForUser(user: UserListItem): string {
    const userZone = user.timeZone?.trim();
    if (userZone) {
      return userZone;
    }
    const key = user.email.trim().toLowerCase();
    return this.timeZoneByEmail.get(key) ?? 'UTC';
  }

  private resolveCurrentUserTimeZone(users: UserListItem[]) {
    const email = readUserEmail();
    const userId = readUserId();
    const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!email && !userId) {
      this.currentUserTimeZone.set(browserZone || 'UTC');
      return;
    }

    const match = users.find((item) => item.id === userId)
      ?? users.find((item) => item.email?.trim().toLowerCase() === email);
    const zone = match?.timeZone?.trim();
    const mappedZone = email ? this.timeZoneByEmail.get(email) : undefined;
    const resolved = zone && zone !== 'UTC' ? zone : mappedZone ?? browserZone ?? 'UTC';
    this.currentUserTimeZone.set(resolved);
  }

  private getFormatter(timeZone: string): Intl.DateTimeFormat {
    const key = `${this.userLocale}|${timeZone}`;
    if (!this.formatters.has(key)) {
      this.formatters.set(
        key,
        new Intl.DateTimeFormat(this.userLocale, {
          timeZone,
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    }
    return this.formatters.get(key)!;
  }

  private parseUtcDate(value: string): Date {
    // Ensure UTC interpretation when the API omits a timezone offset.
    return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
  }
}
