import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of, Subscription, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';

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
import { CsvImportJob, CsvImportJobStatusResponse } from '../../../shared/models/csv-import.model';
import { ImportJobService } from '../../../shared/services/import-job.service';
import { readTokenContext, tokenHasPermission } from '../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../core/auth/permission.constants';
import { AppToastService } from '../../../core/app-toast.service';

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
    CheckboxModule,
    FileUploadModule,
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
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.contactsManage);
  });

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
  protected readonly bulkActions = computed<BulkAction[]>(() => {
    const disabled = !this.canManage();
    return [
      { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user', disabled },
      { id: 'change-status', label: 'Change status', icon: 'pi pi-tag', disabled },
      { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger', disabled }
    ];
  });
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected assignDialogVisible = false;
  protected assignOwnerId: string | null = null;
  protected statusDialogVisible = false;
  protected bulkStatus: string | null = null;
  protected readonly recentContacts = computed(() => this.recentlyViewed.itemsFor('contacts'));
  protected importDialogVisible = false;
  protected importFile: File | null = null;
  protected readonly importJob = signal<CsvImportJob | null>(null);
  protected readonly importStatus = signal<CsvImportJobStatusResponse | null>(null);
  protected readonly importError = signal<string | null>(null);
  protected readonly importing = signal(false);
  private importPoll?: Subscription;

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
    private readonly recentlyViewed: RecentlyViewedService,
    private readonly toastService: AppToastService,
    private readonly importJobs: ImportJobService
  ) {
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
    }
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

  protected openImport() {
    this.importDialogVisible = true;
    this.importFile = null;
    this.importJob.set(null);
    this.importStatus.set(null);
    this.importError.set(null);
    this.stopImportPolling();
  }

  protected closeImport() {
    this.importDialogVisible = false;
    this.stopImportPolling();
  }

  protected onImportFileSelected(event: { files?: File[] } | Event) {
    if (event && 'files' in event && event.files) {
      this.importFile = event.files.length ? event.files[0] : null;
      return;
    }

    if (event instanceof Event) {
      const input = event.target as HTMLInputElement | null;
      const files = input?.files;
      this.importFile = files && files.length ? files[0] : null;
      return;
    }

    this.importFile = null;
  }

  protected onImport() {
    if (!this.importFile) return;
    this.importing.set(true);
    this.importError.set(null);
    this.contactsData.importCsv(this.importFile).subscribe({
      next: (job) => {
        this.importJob.set(job);
        this.importStatus.set(null);
        this.raiseToast('success', 'Contact import queued.');
        this.startImportPolling(job.id);
      },
      error: () => {
        this.importError.set('Import failed. Please check your CSV and try again.');
        this.importing.set(false);
        this.raiseToast('error', 'Contact import failed.');
      }
    });
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
    this.contactsData.delete(row.id).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Contact deleted.');
      },
      error: () => this.raiseToast('error', 'Unable to delete contact.')
    });
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

  private startImportPolling(jobId: string) {
    this.stopImportPolling();
    this.importing.set(true);
    this.importPoll = timer(0, 2000)
      .pipe(
        switchMap(() =>
          this.importJobs.getStatus(jobId).pipe(
            catchError(() => {
              this.importError.set('Unable to check import status.');
              this.importing.set(false);
              this.raiseToast('error', 'Contact import status failed.');
              return of(null);
            })
          )
        ),
        takeWhile(
          (status) => !!status && (status.status === 'Queued' || status.status === 'Processing'),
          true
        ),
        tap((status) => {
          if (!status) return;
          this.importStatus.set(status);
          if (status.status === 'Completed' && this.importing()) {
            this.importing.set(false);
            this.load();
            this.raiseToast('success', 'Contact import completed.');
          }
          if (status.status === 'Failed' && this.importing()) {
            this.importing.set(false);
            this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
            this.raiseToast('error', 'Contact import failed.');
          }
        })
      )
      .subscribe();
  }

  private stopImportPolling() {
    if (this.importPoll) {
      this.importPoll.unsubscribe();
      this.importPoll = undefined;
    }
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
        this.raiseToast('error', `${failures} contacts could not be deleted.`);
        return;
      }
      this.raiseToast('success', 'Contacts deleted.');
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
        this.raiseToast('success', 'Owner assigned.');
      },
      error: () => {
        this.raiseToast('error', 'Owner assignment failed.');
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
        this.raiseToast('success', 'Lifecycle updated.');
      },
      error: () => {
        this.raiseToast('error', 'Lifecycle update failed.');
      }
    });
  }

  protected onInlineLifecycleChange(row: Contact, status: string) {
    if (!status || row.lifecycleStage === status) {
      return;
    }
    this.contactsData.updateLifecycle(row.id, status).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Lifecycle updated.');
      },
      error: () => {
        this.raiseToast('error', 'Lifecycle update failed.');
      }
    });
  }

  protected onInlineOwnerChange(row: Contact, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.contactsData.updateOwner(row.id, ownerId).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Owner updated.');
      },
      error: () => {
        this.raiseToast('error', 'Owner update failed.');
      }
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
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
