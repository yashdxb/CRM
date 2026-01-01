import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of, Subscription, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';

import { Lead, LeadStatus } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { SavedView, SavedViewsService } from '../../../../shared/services/saved-views.service';
import { BulkAction, BulkActionsBarComponent } from '../../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { RecentlyViewedItem, RecentlyViewedService } from '../../../../shared/services/recently-viewed.service';
import { CsvImportJob, CsvImportJobStatusResponse } from '../../../../shared/models/csv-import.model';
import { ImportJobService } from '../../../../shared/services/import-job.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

interface StatusOption {
  label: string;
  value: LeadStatus | 'all';
}

interface LeadViewFilters {
  searchTerm: string;
  statusFilter: StatusOption['value'];
  viewMode: 'table' | 'kanban';
}

@Component({
  selector: 'app-leads-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    FileUploadModule,
    InputTextModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    DecimalPipe,
    DatePipe,
    DialogModule,
    BreadcrumbsComponent,
    BulkActionsBarComponent
  ],
  templateUrl: './leads.page.html',
  styleUrl: './leads.page.scss'
})
export class LeadsPage {
  protected readonly Math = Math;
  protected viewMode: 'table' | 'kanban' = 'table';
  private readonly toastService = inject(AppToastService);
  
  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all' },
    { label: 'New', value: 'New' },
    { label: 'Qualified', value: 'Qualified' },
    { label: 'Converted', value: 'Converted' },
    { label: 'Lost', value: 'Lost' }
  ];
  protected readonly filteredStatusOptions = this.statusOptions.filter((o) => o.value !== 'all');

  protected readonly leads = signal<Lead[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly metrics = computed(() => {
    const rows = this.leads();
    const newLeads = rows.filter((l) => l.status === 'New').length;
    const qualified = rows.filter((l) => l.status === 'Qualified').length;
    const converted = rows.filter((l) => l.status === 'Converted').length;
    const lost = rows.filter((l) => l.status === 'Lost').length;
    const avgScore = rows.length
      ? Math.round(rows.reduce((sum, lead) => sum + (lead.score ?? 0), 0) / rows.length)
      : 0;

    return {
      total: this.total(),
      newLeads,
      qualified,
      converted,
      lost,
      avgScore
    };
  });

  // Conversion rate: converted / (converted + lost) * 100
  protected readonly conversionRate = computed(() => {
    const m = this.metrics();
    const totalClosed = m.converted + m.lost;
    return totalClosed > 0 ? Math.round((m.converted / totalClosed) * 100) : 0;
  });

  protected searchTerm = '';
  protected statusFilter: StatusOption['value'] = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected readonly savedViews = signal<SavedView<LeadViewFilters>[]>([]);
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
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
  });
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected assignDialogVisible = false;
  protected assignOwnerId: string | null = null;
  protected statusDialogVisible = false;
  protected bulkStatus: LeadStatus | null = null;
  protected readonly recentLeads = computed(() => this.recentlyViewed.itemsFor('leads'));
  protected importDialogVisible = false;
  protected importFile: File | null = null;
  protected readonly importJob = signal<CsvImportJob | null>(null);
  protected readonly importStatus = signal<CsvImportJobStatusResponse | null>(null);
  protected readonly importError = signal<string | null>(null);
  protected readonly importing = signal(false);
  private importPoll?: Subscription;

  constructor(
    private readonly leadData: LeadDataService,
    private readonly router: Router,
    private readonly savedViewsService: SavedViewsService,
    private readonly userAdminData: UserAdminDataService,
    private readonly recentlyViewed: RecentlyViewedService,
    private readonly importJobs: ImportJobService
  ) {
    this.loadSavedViews();
    this.loadOwners();
    if (this.router.url.includes('/leads/pipeline')) {
      this.viewMode = 'kanban';
    }
    if (this.router.url.includes('/leads/import')) {
      this.importDialogVisible = true;
    }
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
      history.replaceState({}, '');
    }
    this.load();
  }

  // Get funnel width percentage based on total leads
  protected getFunnelWidth(status: LeadStatus): number {
    const m = this.metrics();
    if (m.total === 0) return 0;
    
    const count = status === 'New' ? m.newLeads
      : status === 'Qualified' ? m.qualified
      : status === 'Converted' ? m.converted
      : m.lost;
    
    return Math.max(10, (count / m.total) * 100);
  }

  // Get leads filtered by status for Kanban view
  protected getLeadsByStatus(status: string): Lead[] {
    return this.leads().filter(lead => lead.status === status);
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : (this.statusFilter as LeadStatus);

    this.leadData
      .search({
        search: this.searchTerm || undefined,
        status,
        page: this.pageIndex + 1,
        pageSize: this.rows
      })
      .subscribe((res) => {
        this.leads.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
        this.selectedIds.set([]);
      });
  }

  protected onCreate() {
    this.router.navigate(['/app/leads/new']);
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
    if (this.router.url.includes('/leads/import')) {
      this.router.navigate(['/app/leads']);
    }
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
    this.leadData.importCsv(this.importFile).subscribe({
      next: (job) => {
        this.importJob.set(job);
        this.importStatus.set(null);
        this.raiseToast('success', 'Lead import queued.');
        this.startImportPolling(job.id);
      },
      error: () => {
        this.importError.set('Import failed. Please check your CSV and try again.');
        this.importing.set(false);
        this.raiseToast('error', 'Lead import failed.');
      }
    });
  }

  protected onEdit(row: Lead) {
    this.recentlyViewed.add('leads', {
      id: row.id,
      title: row.name,
      subtitle: row.company || row.email || row.status
    });
    this.router.navigate(['/app/leads', row.id, 'edit'], { state: { lead: row } });
  }

  protected onConvert(row: Lead) {
    this.recentlyViewed.add('leads', {
      id: row.id,
      title: row.name,
      subtitle: row.company || row.email || row.status
    });
    this.router.navigate(['/app/leads', row.id, 'convert'], { state: { lead: row } });
  }

  protected openRecent(item: RecentlyViewedItem) {
    this.router.navigate(['/app/leads', item.id, 'edit']);
  }

  protected onDelete(row: Lead) {
    const confirmed = confirm(`Delete lead ${row.name}?`);
    if (!confirmed) return;
    this.leadData.delete(row.id).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Lead deleted.');
      },
      error: () => this.raiseToast('error', 'Unable to delete lead.')
    });
  }

  protected onSearch(term: string) {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.load();
  }

  protected onStatusChange(value: StatusOption['value']) {
    this.statusFilter = value;
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
              this.raiseToast('error', 'Lead import status failed.');
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
            this.raiseToast('success', 'Lead import completed.');
          }
          if (status.status === 'Failed' && this.importing()) {
            this.importing.set(false);
            this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
            this.raiseToast('error', 'Lead import failed.');
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
      this.selectedIds.set(this.leads().map((row) => row.id));
      return;
    }
    this.selectedIds.set([]);
  }

  protected selectAllFiltered() {
    this.selectedIds.set(this.leads().map((row) => row.id));
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
    const confirmed = confirm(`Delete ${ids.length} leads?`);
    if (!confirmed) {
      return;
    }

    const deletes$ = ids.map((id) =>
      this.leadData.delete(id).pipe(
        map(() => true),
        catchError(() => of(false))
      )
    );

    forkJoin(deletes$).subscribe((results) => {
      const failures = results.filter((ok) => !ok).length;
      this.clearSelection();
      this.load();
      if (failures) {
        this.raiseToast('error', `${failures} leads could not be deleted.`);
        return;
      }
      this.raiseToast('success', 'Leads deleted.');
    });
  }

  protected confirmBulkAssign() {
    const ids = this.selectedIds();
    if (!ids.length || !this.assignOwnerId) {
      return;
    }
    this.leadData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
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
    this.leadData.bulkUpdateStatus(ids, this.bulkStatus).subscribe({
      next: () => {
        this.statusDialogVisible = false;
        this.bulkStatus = null;
        this.clearSelection();
        this.load();
        this.raiseToast('success', 'Status updated.');
      },
      error: () => {
        this.raiseToast('error', 'Status update failed.');
      }
    });
  }

  protected onInlineStatusChange(row: Lead, status: LeadStatus) {
    if (!status || row.status === status) {
      return;
    }
    this.leadData.updateStatus(row.id, status).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Status updated.');
      },
      error: () => {
        this.raiseToast('error', 'Status update failed.');
      }
    });
  }

  protected onInlineOwnerChange(row: Lead, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.leadData.updateOwner(row.id, ownerId).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Owner updated.');
      },
      error: () => {
        this.raiseToast('error', 'Owner update failed.');
      }
    });
  }

  protected onSaveView() {
    const name = this.viewName.trim();
    if (!name) {
      return;
    }
    const saved = this.savedViewsService.saveView<LeadViewFilters>('leads', {
      name,
      filters: {
        searchTerm: this.searchTerm,
        statusFilter: this.statusFilter,
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
    this.savedViewsService.deleteView('leads', selected);
    this.selectedViewId.set(null);
    this.loadSavedViews();
  }

  protected statusSeverity(status: LeadStatus) {
    switch (status) {
      case 'New':
        return 'info';
      case 'Qualified':
        return 'info';
      case 'Converted':
        return 'info';
      case 'Lost':
        return 'warn';
      default:
        return 'info';
    }
  }

  protected getAvatarClass(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'avatar-new';
      case 'Qualified':
        return 'avatar-qualified';
      case 'Converted':
        return 'avatar-converted';
      case 'Lost':
        return 'avatar-lost';
      default:
        return 'avatar-new';
    }
  }

  protected statusClass(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'badge-info';
      case 'Qualified':
        return 'badge-purple';
      case 'Converted':
        return 'badge-success';
      case 'Lost':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  }

  // Lead create/edit handled by separate page.

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadSavedViews() {
    this.savedViews.set(this.savedViewsService.getViews<LeadViewFilters>('leads'));
  }

  private applyView(view: SavedView<LeadViewFilters>) {
    const filters = view.filters;
    this.searchTerm = filters.searchTerm ?? '';
    this.statusFilter = filters.statusFilter ?? 'all';
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
