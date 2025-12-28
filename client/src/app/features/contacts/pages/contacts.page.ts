import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Contact } from '../models/contact.model';
import { ContactDataService } from '../services/contact-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { CsvColumn, exportToCsv } from '../../../shared/utils/csv';
import { SavedView, SavedViewsService } from '../../../shared/services/saved-views.service';
import { BulkAction, BulkActionsBarComponent } from '../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { RecentlyViewedItem, RecentlyViewedService } from '../../../shared/services/recently-viewed.service';

interface LifecycleOption {
  label: string;
  value: string | 'all';
}

interface ContactViewFilters {
  searchTerm: string;
  ownerFilter: string;
  lifecycleFilter: LifecycleOption['value'];
  accountFilter: string | 'all';
}

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DecimalPipe,
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
    DialogModule,
    BreadcrumbsComponent,
    BulkActionsBarComponent
  ],
  templateUrl: './contacts.page.html',
  styleUrl: './contacts.page.scss'
})
export class ContactsPage {
  protected readonly lifecycleOptions: LifecycleOption[] = [
    { label: 'All statuses', value: 'all' },
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];

  protected readonly contacts = signal<Contact[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly customers = signal<Customer[]>([]);
  protected readonly ownerFilter = signal<'all' | string>('all');
  protected readonly lifecycleFilter = signal<LifecycleOption['value']>('all');
  protected readonly ownerOptions = computed(() => {
    const owners = Array.from(new Set(this.contacts().map((c) => c.owner))).filter(Boolean);
    return [
      { label: 'Any owner', value: 'all' },
      ...owners.sort().map((owner) => ({ label: owner!, value: owner! }))
    ];
  });
  protected readonly lifecycleFormOptions: LifecycleOption[] = this.lifecycleOptions.filter((option) => option.value !== 'all');
  protected readonly accountFilterOptions = computed(() => {
    const customerOptions = this.customers().map((customer) => ({ label: customer.name, value: customer.id }));
    return [{ label: 'All accounts', value: 'all' }, ...customerOptions];
  });
  protected readonly contactsInScope = computed(() => this.filteredContacts().length);
  protected readonly contactsWithLinkedAccounts = computed(() => this.contacts().filter((contact) => !!contact.accountId).length);
  protected readonly lifecycleCounts = computed(() => {
    const counts = {
      lead: 0,
      prospect: 0,
      customer: 0
    };

    this.contacts().forEach((contact) => {
      const stage = contact.lifecycleStage ?? 'Customer';
      if (stage === 'Lead') counts.lead += 1;
      else if (stage === 'Prospect') counts.prospect += 1;
      else counts.customer += 1;
    });

    return counts;
  });
  protected readonly ownerCount = computed(() => Math.max(this.ownerOptions().length - 1, 0));

  protected searchTerm = '';
  protected accountFilter: string | 'all' = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected readonly savedViews = signal<SavedView<ContactViewFilters>[]>([]);
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
  protected bulkStatus: string | null = null;
  protected readonly recentContacts = computed(() => this.recentlyViewed.itemsFor('contacts'));

  protected readonly filteredContacts = computed(() => {
    let rows = [...this.contacts()];

    if (this.ownerFilter() !== 'all') {
      rows = rows.filter((c) => c.owner === this.ownerFilter());
    }

    if (this.lifecycleFilter() !== 'all') {
      rows = rows.filter((c) => (c.lifecycleStage ?? 'Customer') === this.lifecycleFilter());
    }

    return rows;
  });

  constructor(
    private readonly contactsData: ContactDataService,
    private readonly customerData: CustomerDataService,
    private readonly router: Router,
    private readonly savedViewsService: SavedViewsService,
    private readonly userAdminData: UserAdminDataService,
    private readonly recentlyViewed: RecentlyViewedService
  ) {
    this.loadSavedViews();
    this.load();
    this.loadAccounts();
    this.loadOwners();
  }

  protected load() {
    this.loading.set(true);
    this.contactsData
      .search({
        search: this.searchTerm || undefined,
        accountId: this.accountFilter === 'all' ? undefined : this.accountFilter,
        page: this.pageIndex + 1,
        pageSize: this.rows
      })
      .subscribe((res) => {
        this.contacts.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
        this.selectedIds.set([]);
      });
  }

  protected loadAccounts() {
    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.customers.set(res.items);
    });
  }

  protected onCreate() {
    this.router.navigate(['/app/contacts/new']);
  }

  protected onEdit(row: Contact) {
    this.recentlyViewed.add('contacts', {
      id: row.id,
      title: row.name,
      subtitle: row.email || row.accountName || 'Contact'
    });
    this.router.navigate(['/app/contacts', row.id, 'edit'], { state: { contact: row } });
  }

  protected openRecent(item: RecentlyViewedItem) {
    this.router.navigate(['/app/contacts', item.id, 'edit']);
  }

  protected onDelete(row: Contact) {
    if (!confirm(`Delete contact ${row.name}?`)) {
      return;
    }
    this.contactsData.delete(row.id).subscribe(() => this.load());
  }

  protected onSearch(term: string) {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.load();
  }

  protected onOwnerFilterChange(value: string) {
    this.ownerFilter.set(value ?? 'all');
  }

  protected onLifecycleChange(value: LifecycleOption['value']) {
    this.lifecycleFilter.set(value ?? 'all');
  }

  protected onAccountChange(value: string | null) {
    this.accountFilter = value ?? 'all';
    this.pageIndex = 0;
    this.load();
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
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
      this.selectedIds.set(this.filteredContacts().map((row) => row.id));
      return;
    }
    this.selectedIds.set([]);
  }

  protected selectAllFiltered() {
    this.selectedIds.set(this.filteredContacts().map((row) => row.id));
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
    const confirmed = confirm(`Delete ${ids.length} contacts?`);
    if (!confirmed) {
      return;
    }

    const deletes$ = ids.map((id) =>
      this.contactsData.delete(id).pipe(
        map(() => true),
        catchError(() => of(false))
      )
    );

    forkJoin(deletes$).subscribe((results) => {
      const failures = results.filter((ok) => !ok).length;
      this.clearSelection();
      this.load();
      if (failures) {
        alert(`${failures} contacts could not be deleted.`);
      }
    });
  }

  protected confirmBulkAssign() {
    const ids = this.selectedIds();
    if (!ids.length || !this.assignOwnerId) {
      return;
    }
    this.contactsData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
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
    this.contactsData.bulkUpdateLifecycle(ids, this.bulkStatus).subscribe({
      next: () => {
        this.statusDialogVisible = false;
        this.bulkStatus = null;
        this.clearSelection();
        this.load();
      },
      error: () => {
        alert('Lifecycle update failed. Please try again.');
      }
    });
  }

  protected onInlineLifecycleChange(row: Contact, status: string) {
    if (!status || row.lifecycleStage === status) {
      return;
    }
    this.contactsData.updateLifecycle(row.id, status).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Lifecycle update failed. Please try again.');
      }
    });
  }

  protected onInlineOwnerChange(row: Contact, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.contactsData.updateOwner(row.id, ownerId).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Owner update failed. Please try again.');
      }
    });
  }

  protected onSaveView() {
    const name = this.viewName.trim();
    if (!name) {
      return;
    }
    const saved = this.savedViewsService.saveView<ContactViewFilters>('contacts', {
      name,
      filters: {
        searchTerm: this.searchTerm,
        ownerFilter: this.ownerFilter(),
        lifecycleFilter: this.lifecycleFilter(),
        accountFilter: this.accountFilter
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
    this.savedViewsService.deleteView('contacts', selected);
    this.selectedViewId.set(null);
    this.loadSavedViews();
  }

  protected onExport() {
    const rows = this.filteredContacts();
    const columns: CsvColumn<Contact>[] = [
      { header: 'Name', value: (row) => row.name },
      { header: 'Email', value: (row) => row.email },
      { header: 'Phone', value: (row) => row.phone },
      { header: 'Account', value: (row) => row.accountName },
      { header: 'Lifecycle', value: (row) => row.lifecycleStage ?? 'Customer' },
      { header: 'Owner', value: (row) => row.owner },
      { header: 'Created At', value: (row) => row.createdAt }
    ];
    exportToCsv(rows, columns, 'contacts.csv');
  }

  protected statusSeverity(stage?: string) {
    if (stage === 'Prospect') return 'warn';
    if (stage === 'Lead') return 'info';
    return 'info';
  }

  private loadSavedViews() {
    this.savedViews.set(this.savedViewsService.getViews<ContactViewFilters>('contacts'));
  }

  private applyView(view: SavedView<ContactViewFilters>) {
    const filters = view.filters;
    this.searchTerm = filters.searchTerm ?? '';
    this.ownerFilter.set(filters.ownerFilter ?? 'all');
    this.lifecycleFilter.set(filters.lifecycleFilter ?? 'all');
    this.accountFilter = filters.accountFilter ?? 'all';
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
