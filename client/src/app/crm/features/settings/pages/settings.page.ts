import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
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
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { AppToastService } from '../../../../core/app-toast.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    DatePipe,
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

  private searchDebounceId: number | null = null;

  constructor() {
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
    }
    this.loadRoles();
    this.loadUsers();
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
}
