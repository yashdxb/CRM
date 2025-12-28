import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgFor, NgIf, DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Lead, LeadStatus } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { SavedView, SavedViewsService } from '../../../shared/services/saved-views.service';
import { BulkAction, BulkActionsBarComponent } from '../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { RecentlyViewedItem, RecentlyViewedService } from '../../../shared/services/recently-viewed.service';

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
    NgClass,
    FormsModule,
    SelectModule,
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
  protected readonly toast = signal<{ tone: 'success' | 'error'; message: string } | null>(null);
  
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
  protected readonly bulkActions: BulkAction[] = [
    { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user' },
    { id: 'change-status', label: 'Change status', icon: 'pi pi-tag' },
    { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger' }
  ];
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected assignDialogVisible = false;
  protected assignOwnerId: string | null = null;
  protected statusDialogVisible = false;
  protected bulkStatus: LeadStatus | null = null;
  protected readonly recentLeads = computed(() => this.recentlyViewed.itemsFor('leads'));

  constructor(
    private readonly leadData: LeadDataService,
    private readonly router: Router,
    private readonly savedViewsService: SavedViewsService,
    private readonly userAdminData: UserAdminDataService,
    private readonly recentlyViewed: RecentlyViewedService
  ) {
    this.loadSavedViews();
    this.loadOwners();
    if (this.router.url.includes('/leads/pipeline')) {
      this.viewMode = 'kanban';
    }
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toast.set(toast);
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
    this.leadData.delete(row.id).subscribe(() => this.load());
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
        alert(`${failures} leads could not be deleted.`);
      }
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
    this.leadData.bulkUpdateStatus(ids, this.bulkStatus).subscribe({
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

  protected onInlineStatusChange(row: Lead, status: LeadStatus) {
    if (!status || row.status === status) {
      return;
    }
    this.leadData.updateStatus(row.id, status).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Status update failed. Please try again.');
      }
    });
  }

  protected onInlineOwnerChange(row: Lead, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.leadData.updateOwner(row.id, ownerId).subscribe({
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
    this.toast.set(null);
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
