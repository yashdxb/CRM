import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuditLogService } from '../services/audit-log.service';
import { AuditEventItem } from '../models/audit-log.model';
import { UserAdminDataService } from '../services/user-admin-data.service';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-audit-log-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    DatePipe,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    PaginatorModule,
    SelectModule,
    TableModule,
    TagModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './audit-log.page.html',
  styleUrl: './audit-log.page.scss'
})
export class AuditLogPage {
  private readonly auditService = inject(AuditLogService);
  private readonly userService = inject(UserAdminDataService);

  protected readonly loading = signal(false);
  protected readonly items = signal<AuditEventItem[]>([]);
  protected readonly total = signal(0);

  protected readonly search = signal('');
  protected readonly entityType = signal<string | null>(null);
  protected readonly action = signal<string | null>(null);
  protected readonly userId = signal<string | null>(null);
  protected readonly fromDate = signal<Date | null>(null);
  protected readonly toDate = signal<Date | null>(null);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);

  protected readonly entityOptions: Option[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Opportunity', value: 'Opportunity' },
    { label: 'Activity', value: 'Activity' },
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'RFQ', value: 'Rfq' },
    { label: 'Quote', value: 'Quote' },
    { label: 'Award', value: 'Award' }
  ];

  protected readonly actionOptions: Option[] = [
    { label: 'Created', value: 'Created' },
    { label: 'Updated', value: 'Updated' },
    { label: 'Deleted', value: 'Deleted' },
    { label: 'Status Changed', value: 'StatusChanged' },
    { label: 'Owner Changed', value: 'OwnerChanged' },
    { label: 'Stage Changed', value: 'StageChanged' },
    { label: 'Amount Changed', value: 'AmountChanged' },
    { label: 'Converted', value: 'Converted' },
    { label: 'Outcome Updated', value: 'OutcomeUpdated' }
  ];

  protected userOptions: Option[] = [{ label: 'All users', value: '' }];

  constructor() {
    this.loadUsers();
    this.loadAudit();
  }

  protected loadAudit() {
    this.loading.set(true);
    const toUtc = this.toEndOfDay(this.toDate());
    this.auditService
      .search({
        search: this.search() || undefined,
        entityType: this.entityType() || undefined,
        action: this.action() || undefined,
        userId: this.userId() || undefined,
        fromUtc: this.fromDate() ? this.fromDate()!.toISOString() : undefined,
        toUtc: toUtc ? toUtc.toISOString() : undefined,
        page: this.page(),
        pageSize: this.pageSize()
      })
      .subscribe({
        next: (response) => {
          this.items.set(response.items);
          this.total.set(response.total);
          this.loading.set(false);
        },
        error: () => {
          this.items.set([]);
          this.total.set(0);
          this.loading.set(false);
        }
      });
  }

  protected onSearch() {
    this.page.set(1);
    this.loadAudit();
  }

  protected resetFilters() {
    this.search.set('');
    this.entityType.set(null);
    this.action.set(null);
    this.userId.set(null);
    this.fromDate.set(null);
    this.toDate.set(null);
    this.page.set(1);
    this.loadAudit();
  }

  protected onPageChange(event: PaginatorState) {
    const page = event.page ?? 0;
    const rows = event.rows ?? this.pageSize();
    this.page.set(page + 1);
    this.pageSize.set(rows);
    this.loadAudit();
  }

  protected auditTagSeverity(action: string) {
    if (action === 'Deleted') {
      return 'danger';
    }
    if (action === 'Created' || action === 'Converted') {
      return 'success';
    }
    if (action.includes('Changed') || action === 'Updated') {
      return 'info';
    }
    return 'warn';
  }

  protected changeSummary(item: AuditEventItem) {
    if (!item.field) {
      return item.action;
    }

    const oldValue = item.oldValue ?? '—';
    const newValue = item.newValue ?? '—';
    return `${item.field}: ${oldValue} → ${newValue}`;
  }

  protected changeDetail(item: AuditEventItem) {
    if (!item.field) {
      return '';
    }

    return `Old: ${item.oldValue ?? '—'} | New: ${item.newValue ?? '—'}`;
  }

  private loadUsers() {
    this.userService.search({ page: 1, pageSize: 200, includeInactive: true }).subscribe({
      next: (response) => {
        const options = response.items.map((user) => ({
          label: user.fullName || user.email,
          value: user.id
        }));
        this.userOptions = [{ label: 'All users', value: '' }, ...options];
      },
      error: () => {
        this.userOptions = [{ label: 'All users', value: '' }];
      }
    });
  }

  private toEndOfDay(value: Date | null) {
    if (!value) {
      return null;
    }
    const end = new Date(value);
    end.setHours(23, 59, 59, 999);
    return end;
  }
}
