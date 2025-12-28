import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Customer, CustomerStatus } from '../models/customer.model';
import { CustomerDataService } from '../services/customer-data.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { CsvColumn, exportToCsv } from '../../../shared/utils/csv';
import { SavedView, SavedViewsService } from '../../../shared/services/saved-views.service';
import { RecentlyViewedItem, RecentlyViewedService } from '../../../shared/services/recently-viewed.service';
import { BulkAction, BulkActionsBarComponent } from '../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';

interface StatusOption {
  label: string;
  value: CustomerStatus | 'all';
}

type SegmentValue = 'all' | 'recent' | 'attention' | 'customers';

interface SegmentOption {
  label: string;
  value: SegmentValue;
  description: string;
}

interface CustomerViewFilters {
  searchTerm: string;
  statusFilter: StatusOption['value'];
  ownerFilter: string;
  segmentFilter: SegmentValue;
  viewMode: 'table' | 'cards';
}

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    FormsModule,
    CardModule,
    TableModule,
    TagModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    PaginatorModule,
    SkeletonModule,
    TooltipModule,
    DialogModule,
    BreadcrumbsComponent,
    BulkActionsBarComponent
  ],
  templateUrl: './customers.page.html',
  styleUrl: './customers.page.scss'
})
export class CustomersPage {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];
  protected readonly statusOptionsInline = this.statusOptions.filter((option) => option.value !== 'all');
  protected readonly segmentOptions: SegmentOption[] = [
    { label: 'All records', value: 'all', description: 'Everything returned by the current query' },
    { label: 'New this week', value: 'recent', description: 'Created in the last 7 days' },
    {
      label: 'Needs follow-up',
      value: 'attention',
      description: 'Leads or prospects with no recent motion'
    },
    { label: 'Active customers', value: 'customers', description: 'Live customers only' }
  ];

  protected readonly customers = signal<Customer[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly ownerFilter = signal<'all' | string>('all');
  protected readonly segmentFilter = signal<SegmentValue>('all');
  protected readonly ownerOptions = computed(() => {
    const owners = Array.from(new Set(this.customers().map((c) => c.owner))).filter((o) => !!o);
    return [
      { label: 'Any owner', value: 'all' },
      ...owners.sort().map((owner) => ({ label: owner, value: owner }))
    ];
  });
  protected readonly filteredCustomers = computed(() => {
    const owner = this.ownerFilter();
    const segment = this.segmentFilter();
    let rows = [...this.customers()];

    if (owner !== 'all') {
      rows = rows.filter((c) => c.owner === owner);
    }

    if (segment === 'recent') {
      rows = rows.filter((c) => this.daysSince(c.createdAt) <= 7);
    } else if (segment === 'attention') {
      rows = rows.filter(
        (c) => (c.status === 'Lead' || c.status === 'Prospect') && this.daysSince(c.createdAt) > 30
      );
    } else if (segment === 'customers') {
      rows = rows.filter((c) => c.status === 'Customer');
    }

    return rows;
  });
  protected readonly metrics = computed(() => {
    const rows = this.customers();
    const leads = rows.filter((c) => c.status === 'Lead').length;
    const prospects = rows.filter((c) => c.status === 'Prospect').length;
    const activeCustomers = rows.filter((c) => c.status === 'Customer').length;
    const newThisWeek = rows.filter((c) => this.daysSince(c.createdAt) <= 7).length;

    return {
      total: this.total(),
      leads,
      prospects,
      activeCustomers,
      newThisWeek
    };
  });

  protected searchTerm = '';
  protected statusFilter: StatusOption['value'] = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected viewMode: 'table' | 'cards' = 'table';
  protected readonly Math = Math;
  protected readonly savedViews = signal<SavedView<CustomerViewFilters>[]>([]);
  protected readonly selectedViewId = signal<string | null>(null);
  protected readonly viewOptions = computed(() => [
    { label: 'Saved views', value: null },
    ...this.savedViews().map((view) => ({ label: view.name, value: view.id }))
  ]);
  protected viewName = '';
  protected readonly selectedIds = signal<string[]>([]);
  protected readonly bulkActions: BulkAction[] = [
    { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user' },
    { id: 'change-status', label: 'Change status', icon: 'pi pi-tag' },
    { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger' }
  ];
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected assignDialogVisible = false;
  protected assignOwnerId: string | null = null;
  protected statusDialogVisible = false;
  protected bulkStatus: CustomerStatus | null = null;
  protected readonly recentCustomers = computed(() => this.recentlyViewed.itemsFor('customers'));

  constructor(
    private readonly customerData: CustomerDataService,
    private readonly router: Router,
    private readonly savedViewsService: SavedViewsService,
    private readonly userAdminData: UserAdminDataService,
    private readonly recentlyViewed: RecentlyViewedService
  ) {
    this.loadSavedViews();
    this.load();
    this.loadOwners();
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : (this.statusFilter as CustomerStatus);

    this.customerData
      .search({
        search: this.searchTerm || undefined,
        status,
        page: this.pageIndex + 1,
        pageSize: this.rows
      })
      .subscribe((res) => {
        this.customers.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
        this.selectedIds.set([]);
      });
  }

  protected onCreate() {
    this.router.navigate(['/app/customers/new']);
  }

  protected onEdit(row: Customer) {
    this.recentlyViewed.add('customers', {
      id: row.id,
      title: row.name,
      subtitle: row.company || row.status
    });
    this.router.navigate(['/app/customers', row.id, 'edit']);
  }

  protected openRecent(item: RecentlyViewedItem) {
    this.router.navigate(['/app/customers', item.id, 'edit']);
  }

  protected onDelete(row: Customer) {
    const confirmed = confirm(`Delete ${row.name}?`);
    if (!confirmed) return;
    this.customerData.delete(row.id).subscribe(() => this.load());
  }

  protected onSearch(term: string) {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.load();
  }

  protected onOwnerFilterChange(value: string) {
    this.ownerFilter.set(value ?? 'all');
  }

  protected onSegmentChange(value: SegmentValue) {
    this.segmentFilter.set(value ?? 'all');
  }

  protected setViewMode(mode: 'table' | 'cards') {
    this.viewMode = mode;
  }

  protected resetFilters() {
    this.statusFilter = 'all';
    this.ownerFilter.set('all');
    this.segmentFilter.set('all');
    this.searchTerm = '';
    this.pageIndex = 0;
    this.load();
  }

  protected onStatusChange(value: StatusOption['value']) {
    this.statusFilter = value;
    this.pageIndex = 0;
    this.load();
  }

  protected onSaveView() {
    const name = this.viewName.trim();
    if (!name) {
      return;
    }

    const saved = this.savedViewsService.saveView<CustomerViewFilters>('customers', {
      name,
      filters: {
        searchTerm: this.searchTerm,
        statusFilter: this.statusFilter,
        ownerFilter: this.ownerFilter(),
        segmentFilter: this.segmentFilter(),
        viewMode: this.viewMode
      }
    });
    this.viewName = '';
    this.loadSavedViews();
    this.selectedViewId.set(saved.id);
  }

  protected onSelectView(id: string | null) {
    if (!id) {
      this.selectedViewId.set(null);
      return;
    }
    const view = this.savedViews().find((item) => item.id === id);
    if (!view) {
      return;
    }
    this.selectedViewId.set(id);
    this.applyView(view);
  }

  protected onDeleteView() {
    const selected = this.selectedViewId();
    if (!selected) {
      return;
    }
    this.savedViewsService.deleteView('customers', selected);
    this.selectedViewId.set(null);
    this.loadSavedViews();
  }

  protected onExport() {
    const rows = this.filteredCustomers();
    const columns: CsvColumn<Customer>[] = [
      { header: 'Name', value: (row) => row.name },
      { header: 'Company', value: (row) => row.company },
      { header: 'Email', value: (row) => row.email },
      { header: 'Phone', value: (row) => row.phone },
      { header: 'Status', value: (row) => row.status },
      { header: 'Owner', value: (row) => row.owner },
      { header: 'Created At', value: (row) => row.createdAt }
    ];
    exportToCsv(rows, columns, 'customers.csv');
  }

  protected onInlineStatusChange(row: Customer, status: CustomerStatus) {
    if (!status || row.status === status) {
      return;
    }
    this.customerData.updateLifecycle(row.id, status).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Status update failed. Please try again.');
      }
    });
  }

  protected onInlineOwnerChange(row: Customer, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.customerData.updateOwner(row.id, ownerId).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Owner update failed. Please try again.');
      }
    });
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
  }

  protected statusSeverity(status: CustomerStatus) {
    switch (status) {
      case 'Lead':
        return 'info';
      case 'Prospect':
        return 'warn';
      default:
        return 'info';
    }
  }

  private daysSince(dateIso: string) {
    const timestamp = Date.parse(dateIso);
    if (Number.isNaN(timestamp)) {
      return Number.MAX_SAFE_INTEGER;
    }

    const diff = Date.now() - timestamp;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  protected isSelected(id: string) {
    return this.selectedIds().includes(id);
  }

  protected toggleSelection(id: string, checked: boolean) {
    const current = new Set(this.selectedIds());
    if (checked) {
      current.add(id);
    } else {
      current.delete(id);
    }
    this.selectedIds.set(Array.from(current));
  }

  protected toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedIds.set(this.filteredCustomers().map((row) => row.id));
      return;
    }
    this.selectedIds.set([]);
  }

  protected selectAllFiltered() {
    this.selectedIds.set(this.filteredCustomers().map((row) => row.id));
  }

  protected clearSelection() {
    this.selectedIds.set([]);
  }

  protected onBulkAction(action: BulkAction) {
    if (action.id === 'assign-owner') {
      this.assignDialogVisible = true;
      return;
    }
    if (action.id === 'change-status') {
      this.statusDialogVisible = true;
      return;
    }
    if (action.id === 'delete') {
      this.confirmBulkDelete();
    }
  }

  protected confirmBulkDelete() {
    const ids = this.selectedIds();
    if (!ids.length) {
      return;
    }
    const confirmed = confirm(`Delete ${ids.length} customers?`);
    if (!confirmed) {
      return;
    }

    const deletes$ = ids.map((id) =>
      this.customerData.delete(id).pipe(
        map(() => true),
        catchError(() => of(false))
      )
    );

    forkJoin(deletes$).subscribe((results) => {
      const failures = results.filter((ok) => !ok).length;
      this.clearSelection();
      this.load();
      if (failures) {
        alert(`${failures} customers could not be deleted.`);
      }
    });
  }

  protected confirmBulkAssign() {
    const ids = this.selectedIds();
    if (!ids.length || !this.assignOwnerId) {
      return;
    }
    this.customerData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
      next: () => {
        this.assignDialogVisible = false;
        this.assignOwnerId = null;
        this.clearSelection();
        this.load();
      },
      error: () => {
        alert('Owner assignment failed. Please try again.');
      }
    });
  }

  protected confirmBulkStatusUpdate() {
    const ids = this.selectedIds();
    if (!ids.length || !this.bulkStatus) {
      return;
    }
    this.customerData.bulkUpdateLifecycle(ids, this.bulkStatus).subscribe({
      next: () => {
        this.statusDialogVisible = false;
        this.bulkStatus = null;
        this.clearSelection();
        this.load();
      },
      error: () => {
        alert('Status update failed. Please try again.');
      }
    });
  }

  private loadSavedViews() {
    this.savedViews.set(this.savedViewsService.getViews<CustomerViewFilters>('customers'));
  }

  private applyView(view: SavedView<CustomerViewFilters>) {
    const filters = view.filters;
    this.searchTerm = filters.searchTerm ?? '';
    this.statusFilter = filters.statusFilter ?? 'all';
    this.ownerFilter.set(filters.ownerFilter ?? 'all');
    this.segmentFilter.set(filters.segmentFilter ?? 'all');
    this.viewMode = filters.viewMode ?? 'table';
    this.pageIndex = 0;
    this.load();
  }

  private loadOwners() {
    this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
      const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
      this.ownerOptionsForAssign.set(options);
    });
  }
}
