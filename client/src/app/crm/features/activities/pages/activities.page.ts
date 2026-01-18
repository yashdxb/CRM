import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, RouterLink } from '@angular/router';

import { Activity, ActivityType } from '../models/activity.model';
import { ActivityDataService } from '../services/activity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Contact } from '../../contacts/models/contact.model';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

interface StatusOption {
  label: string;
  value: Activity['status'] | 'all';
}

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    DatePipe,
    RouterLink,
    BreadcrumbsComponent
  ],
  templateUrl: './activities.page.html',
  styleUrl: './activities.page.scss'
})
export class ActivitiesPage {
  protected readonly Math = Math;
  protected readonly weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  protected readonly currentView = signal<'table' | 'calendar' | 'tasks'>('table');
  
  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Overdue', value: 'Overdue' }
  ];

  protected readonly activities = signal<Activity[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly customers = signal<Customer[]>([]);
  protected readonly contacts = signal<Contact[]>([]);
  protected readonly myOwnerId = signal<string | null>(null);
  protected readonly myView = signal(false);
  protected readonly overdueOnly = signal(false);
  private readonly toastService = inject(AppToastService);
  protected readonly ownerOptions = computed(() => {
    const owners = new Map<string, string>();
    for (const activity of this.activities()) {
      if (!activity.ownerId || !activity.ownerName) continue;
      owners.set(activity.ownerId, activity.ownerName);
    }
    return [
      { label: 'All owners', value: 'all' },
      ...Array.from(owners.entries())
        .sort((a, b) => a[1].localeCompare(b[1]))
        .map(([id, name]) => ({ label: name, value: id }))
    ];
  });

  protected activeOwnerFilter: string | 'all' = 'all';
  protected searchQuery = '';
  protected typeFilter: ActivityType | 'all' = 'all';
  protected isDueTodayActive = false;

  protected statusFilter: StatusOption['value'] = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  private readonly todayKey = this.toDateKey(new Date());
  protected readonly openActivitiesCount = computed(() =>
    this.activities().filter((activity) => activity.status !== 'Completed').length
  );
  protected readonly dueTodayCount = computed(() => {
    if (!this.todayKey) {
      return 0;
    }
    return this.activities().filter((activity) => {
      if (activity.status === 'Completed') {
        return false;
      }
      return this.toDateKey(activity.dueDateUtc) === this.todayKey;
    }).length;
  });
  protected readonly overdueCount = computed(() =>
    this.activities().filter((activity) => activity.status === 'Overdue').length
  );
  protected readonly completedCount = computed(() =>
    this.activities().filter((activity) => activity.status === 'Completed').length
  );
  protected readonly completionRate = computed(() => {
    const total = this.activities().length;
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });
  protected readonly calendarMonth = signal<Date>(new Date());
  protected readonly selectedDate = signal<Date>(new Date());
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.activitiesManage);
  });
  protected readonly calendarDays = computed(() => {
    const month = this.calendarMonth();
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const startDay = start.getDay();
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startDay);

    const itemsByDate = new Map<string, Activity[]>();
    for (const activity of this.activities()) {
      const key = this.toDateKey(activity.dueDateUtc);
      if (!key) continue;
      const list = itemsByDate.get(key) ?? [];
      list.push(activity);
      itemsByDate.set(key, list);
    }

    const todayKey = this.toDateKey(new Date());
    const selectedKey = this.toDateKey(this.selectedDate());
    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      items: Activity[];
    }> = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);
      const key = this.toDateKey(date);
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month.getMonth(),
        isToday: key === todayKey,
        isSelected: key === selectedKey,
        items: key ? itemsByDate.get(key) ?? [] : []
      });
    }

    return days;
  });
  protected readonly selectedDayActivities = computed(() => {
    const key = this.toDateKey(this.selectedDate());
    if (!key) return [];
    return this.activities().filter((activity) => this.toDateKey(activity.dueDateUtc) === key);
  });
  protected readonly selectedDayTasks = computed(() =>
    this.selectedDayActivities().filter((activity) => activity.type === 'Task')
  );
  protected readonly openTasks = computed(() =>
    this.activities().filter((activity) => activity.type === 'Task' && activity.status !== 'Completed')
  );
  protected readonly openTasksPreview = computed(() => this.openTasks().slice(0, 6));
  protected readonly taskItems = computed(() => this.filteredActivities().filter((activity) => activity.type === 'Task'));
  protected readonly tasksOverdue = computed(() =>
    this.taskItems().filter((activity) => activity.status === 'Overdue')
  );
  protected readonly tasksUpcoming = computed(() =>
    this.taskItems().filter((activity) => activity.status === 'Upcoming')
  );
  protected readonly tasksCompleted = computed(() =>
    this.taskItems().filter((activity) => activity.status === 'Completed')
  );
  protected readonly tasksToday = computed(() =>
    this.taskItems().filter((activity) => {
      if (activity.status === 'Completed') {
        return false;
      }
      return this.toDateKey(activity.dueDateUtc) === this.todayKey;
    })
  );

  protected relatedLink(activity: Activity): string | null {
    if (!activity.relatedEntityId || !activity.relatedEntityType) {
      return null;
    }

    switch (activity.relatedEntityType) {
      case 'Lead':
        return `/app/leads/${activity.relatedEntityId}/edit`;
      case 'Account':
        return `/app/customers/${activity.relatedEntityId}/edit`;
      case 'Contact':
        return `/app/contacts/${activity.relatedEntityId}/edit`;
      case 'Opportunity':
        return `/app/opportunities/${activity.relatedEntityId}/edit`;
      default:
        return null;
    }
  }

  constructor(
    private readonly activityData: ActivityDataService,
    private readonly customerData: CustomerDataService,
    private readonly contactData: ContactDataService,
    private readonly router: Router
  ) {
    this.myOwnerId.set(readUserId());
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
    }
    this.currentView.set(this.viewFromUrl(this.router.url));
    this.load();
    this.loadLookups();
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
    const ownerId = this.myView()
      ? this.myOwnerId() ?? undefined
      : this.activeOwnerFilter !== 'all'
        ? this.activeOwnerFilter
        : undefined;
    const type = this.typeFilter === 'all' ? undefined : this.typeFilter;

    this.activityData
      .search({
        status,
        search: this.searchQuery || undefined,
        page: this.pageIndex + 1,
        pageSize: this.rows,
        ownerId,
        type
      })
      .subscribe((res) => {
        this.activities.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
      });
  }

  protected onStatusChange(value: StatusOption['value']) {
    this.statusFilter = value;
    this.pageIndex = 0;
    this.load();
  }

  protected onOwnerFilterChange(value: string) {
    this.activeOwnerFilter = value ?? 'all';
    this.pageIndex = 0;
    this.load();
  }

  protected toggleMine() {
    this.myView.set(!this.myView());
    this.pageIndex = 0;
    this.load();
  }

  protected toggleOverdue() {
    this.overdueOnly.set(!this.overdueOnly());
  }

  protected toggleDueToday() {
    this.isDueTodayActive = !this.isDueTodayActive;
  }

  protected onTypeChange(type: ActivityType | 'all') {
    this.typeFilter = this.typeFilter === type ? 'all' : type;
    this.pageIndex = 0;
    this.load();
  }

  protected onSearch(query: string) {
    this.searchQuery = query;
    this.pageIndex = 0;
    this.load();
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
  }

  protected statusSeverity(status: Activity['status']) {
    if (status === 'Overdue') return 'danger';
    if (status === 'Upcoming') return 'info';
    return 'info';
  }

  protected canMarkComplete(activity: Activity) {
    return this.canManage() && !activity.completedDateUtc;
  }

  protected relationLabel(type?: Activity['relatedEntityType']) {
    if (!type) return 'Record';
    return type;
  }

  protected asLocalDate(value?: Date | string | null): Date | null {
    if (!value) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    return this.parseUtcDate(value);
  }

  protected setView(view: 'table' | 'calendar' | 'tasks') {
    if (this.currentView() === view) {
      return;
    }
    this.currentView.set(view);
    if (view === 'tasks') {
      this.typeFilter = 'Task';
    } else if (this.typeFilter === 'Task') {
      this.typeFilter = 'all';
    }

    const path =
      view === 'table'
        ? '/app/activities'
        : view === 'calendar'
          ? '/app/activities/calendar'
          : '/app/activities/tasks';
    this.router.navigate([path]);
  }

  protected calendarMonthLabel() {
    const month = this.calendarMonth();
    return month.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  protected selectedDateLabel() {
    const date = this.selectedDate();
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  protected previousMonth() {
    const month = this.calendarMonth();
    this.calendarMonth.set(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }

  protected nextMonth() {
    const month = this.calendarMonth();
    this.calendarMonth.set(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }

  protected goToToday() {
    const today = new Date();
    this.calendarMonth.set(new Date(today.getFullYear(), today.getMonth(), 1));
    this.selectedDate.set(today);
  }

  protected selectDate(date: Date) {
    this.selectedDate.set(date);
  }

  private viewFromUrl(url: string) {
    if (url.includes('/activities/calendar')) {
      return 'calendar' as const;
    }
    if (url.includes('/activities/tasks')) {
      return 'tasks' as const;
    }
    return 'table' as const;
  }

  protected filteredActivities() {
    let rows = [...this.activities()];

    if (this.overdueOnly()) {
      rows = rows.filter((row) => row.status === 'Overdue');
    }

    if (this.isDueTodayActive) {
      rows = rows.filter((row) => this.toDateKey(row.dueDateUtc) === this.todayKey);
    }

    return rows;
  }

  protected onCreate() {
    this.router.navigate(['/app/activities/new']);
  }

  protected onEdit(row: Activity) {
    this.router.navigate(['/app/activities', row.id, 'edit'], { state: { activity: row } });
  }

  protected onDelete(row: Activity) {
    if (!confirm(`Delete activity ${row.subject}?`)) {
      return;
    }
    this.activityData.delete(row.id).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Activity deleted.');
      },
      error: () => this.raiseToast('error', 'Unable to delete activity.')
    });
  }

  protected markCompleted(row: Activity) {
    if (!this.canManage()) {
      return;
    }

    const payload = {
      subject: row.subject,
      description: row.description,
      type: row.type,
      priority: row.priority,
      dueDateUtc: row.dueDateUtc,
      completedDateUtc: new Date().toISOString(),
      relatedEntityType: row.relatedEntityType,
      relatedEntityId: row.relatedEntityId,
      ownerId: row.ownerId
    };

    this.activityData.update(row.id, payload).subscribe({
      next: () => {
        this.raiseToast('success', 'Activity marked completed.');
        this.load();
      },
      error: () => this.raiseToast('error', 'Unable to mark activity completed.')
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadLookups() {
    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => this.customers.set(res.items));
    this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => this.contacts.set(res.items));
  }

  private toDateKey(value?: Date | string | null): string | null {
    if (!value) {
      return null;
    }
    const date = typeof value === 'string' ? this.parseUtcDate(value) : value;
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split('T')[0];
  }

  private parseUtcDate(value: string): Date {
    // Normalize API timestamps to UTC when the offset is missing.
    return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
  }
}
