import { CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { forkJoin, switchMap } from 'rxjs';

import { Property, PropertyStatus, PropertyType, MlsFeedConfig, MlsImportJob } from '../models/property.model';
import { PropertyDataService, SavePropertyRequest } from '../services/property-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CsvColumn, exportToCsv } from '../../../../shared/utils/csv';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

interface StatusOption { label: string; value: PropertyStatus | 'all'; }
interface TypeOption { label: string; value: PropertyType | 'all'; }

@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    FormsModule,
    TableModule,
    TagModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    PaginatorModule,
    SkeletonModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    BreadcrumbsComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './properties.page.html',
  styleUrl: './properties.page.scss'
})
export class PropertiesPage {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Active', value: 'Active' },
    { label: 'Conditional', value: 'Conditional' },
    { label: 'Sold', value: 'Sold' },
    { label: 'Terminated', value: 'Terminated' },
    { label: 'Expired', value: 'Expired' },
    { label: 'Delisted', value: 'Delisted' }
  ];

  protected readonly typeOptions: TypeOption[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Detached', value: 'Detached' },
    { label: 'Semi-Detached', value: 'SemiDetached' },
    { label: 'Townhouse', value: 'Townhouse' },
    { label: 'Condo', value: 'Condo' },
    { label: 'Duplex', value: 'Duplex' },
    { label: 'Triplex', value: 'Triplex' },
    { label: 'Bungalow', value: 'Bungalow' },
    { label: 'Cottage', value: 'Cottage' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Land', value: 'Land' },
    { label: 'Multi-Family', value: 'MultiFamily' },
    { label: 'Other', value: 'Other' }
  ];

  protected readonly properties = signal<Property[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);

  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.propertiesManage);
  });

  protected readonly metrics = computed(() => {
    const rows = this.properties();
    const active = rows.filter(p => p.status === 'Active').length;
    const conditional = rows.filter(p => p.status === 'Conditional').length;
    const sold = rows.filter(p => p.status === 'Sold').length;
    const draft = rows.filter(p => p.status === 'Draft').length;
    return { total: this.total(), active, conditional, sold, draft };
  });

  protected searchTerm = '';
  protected statusFilter: StatusOption['value'] = 'all';
  protected typeFilter: TypeOption['value'] = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected viewMode: 'table' | 'kanban' | 'map' = 'table';
  protected readonly Math = Math;

  /* ── Bulk Operations (X11) ── */
  protected readonly selectedIds = signal(new Set<string>());
  protected readonly hasSelection = computed(() => this.selectedIds().size > 0);
  protected readonly selectionCount = computed(() => this.selectedIds().size);
  protected readonly isAllSelected = computed(() => {
    const rows = this.properties();
    return rows.length > 0 && this.selectedIds().size === rows.length;
  });
  protected showBulkStatusDialog = signal(false);
  protected bulkStatus: PropertyStatus = 'Active';

  protected readonly bulkStatusOptions: StatusOption[] = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Active', value: 'Active' },
    { label: 'Conditional', value: 'Conditional' },
    { label: 'Sold', value: 'Sold' },
    { label: 'Terminated', value: 'Terminated' },
    { label: 'Expired', value: 'Expired' },
    { label: 'Delisted', value: 'Delisted' }
  ];

  protected readonly kanbanStatuses: PropertyStatus[] = [
    'Draft', 'Active', 'Conditional', 'Sold', 'Terminated', 'Expired', 'Delisted'
  ];

  constructor(
    private readonly propertyData: PropertyDataService,
    private readonly router: Router,
    private readonly toastService: AppToastService,
    private readonly confirmationService: ConfirmationService
  ) {
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) this.toastService.show(toast.tone, toast.message, 3000);
    this.load();
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : (this.statusFilter as PropertyStatus);
    const propertyType = this.typeFilter === 'all' ? undefined : (this.typeFilter as PropertyType);

    this.propertyData
      .search({
        search: this.searchTerm || undefined,
        status,
        propertyType,
        page: this.pageIndex + 1,
        pageSize: this.rows
      })
      .subscribe((res) => {
        this.properties.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
      });
  }

  protected onCreate() {
    this.router.navigate(['/app/properties/new']);
  }

  protected onEdit(row: Property) {
    this.router.navigate(['/app/properties', row.id, 'edit']);
  }

  protected onRowClick(row: Property, event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('button, a, p-select, .p-select, .row-actions')) return;
    this.router.navigate(['/app/properties', row.id]);
  }

  protected onDelete(row: Property) {
    this.confirmationService.confirm({
      message: `Delete property at ${row.address}?`,
      header: 'Delete Property',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.propertyData.delete(row.id).subscribe({
          next: () => { this.load(); this.toastService.show('success', 'Property deleted.', 3000); },
          error: () => this.toastService.show('error', 'Unable to delete property.', 3000)
        });
      }
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

  protected onTypeChange(value: TypeOption['value']) {
    this.typeFilter = value;
    this.pageIndex = 0;
    this.load();
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? 10;
    this.load();
  }

  protected resetFilters() {
    this.statusFilter = 'all';
    this.typeFilter = 'all';
    this.searchTerm = '';
    this.pageIndex = 0;
    this.load();
  }

  protected onExport() {
    const rows = this.properties();
    const columns: CsvColumn<Property>[] = [
      { header: 'MLS #', value: r => r.mlsNumber ?? '' },
      { header: 'Address', value: r => r.address },
      { header: 'City', value: r => r.city ?? '' },
      { header: 'Province', value: r => r.province ?? '' },
      { header: 'List Price', value: r => r.listPrice?.toString() ?? '' },
      { header: 'Status', value: r => r.status },
      { header: 'Type', value: r => r.propertyType },
      { header: 'Beds', value: r => r.bedrooms?.toString() ?? '' },
      { header: 'Baths', value: r => r.bathrooms?.toString() ?? '' },
      { header: 'Sq Ft', value: r => r.squareFeet?.toString() ?? '' },
      { header: 'Owner', value: r => r.ownerName ?? '' }
    ];
    exportToCsv(rows, columns, 'properties.csv');
  }

  protected statusSeverity(status: PropertyStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Active': return 'success';
      case 'Conditional': return 'warn';
      case 'Sold': return 'info';
      case 'Draft': return 'secondary';
      case 'Terminated': return 'danger';
      case 'Expired': return 'danger';
      case 'Delisted': return 'contrast';
      default: return 'secondary';
    }
  }

  protected formatPropertyType(type: PropertyType): string {
    switch (type) {
      case 'SemiDetached': return 'Semi-Detached';
      case 'MultiFamily': return 'Multi-Family';
      default: return type;
    }
  }

  /* ── Bulk selection helpers (X11) ── */
  protected toggleSelect(id: string) {
    const s = new Set(this.selectedIds());
    s.has(id) ? s.delete(id) : s.add(id);
    this.selectedIds.set(s);
  }

  protected toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.properties().map(p => p.id)));
    }
  }

  protected isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  protected clearSelection() {
    this.selectedIds.set(new Set());
  }

  protected bulkDelete() {
    const count = this.selectedIds().size;
    if (!count) return;

    this.confirmationService.confirm({
      message: `Delete ${count} selected properties?`,
      header: 'Delete Properties',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        const obs = Array.from(this.selectedIds()).map(id => this.propertyData.delete(id));
        forkJoin(obs).subscribe({
          next: () => {
            this.selectedIds.set(new Set());
            this.load();
            this.toastService.show('success', `${count} properties deleted.`, 3000);
          },
          error: () => {
            this.selectedIds.set(new Set());
            this.load();
            this.toastService.show('error', 'Some properties could not be deleted.', 3000);
          }
        });
      }
    });
  }

  protected bulkChangeStatus() {
    const ids = Array.from(this.selectedIds());
    const obs = ids.map(id => {
      return this.propertyData.getById(id).pipe(
        switchMap((prop) => this.propertyData.update(id, { ...prop, status: this.bulkStatus } as SavePropertyRequest))
      );
    });
    forkJoin(obs).subscribe({
      next: () => {
        this.selectedIds.set(new Set());
        this.showBulkStatusDialog.set(false);
        this.load();
        this.toastService.show('success', `${ids.length} properties updated.`, 3000);
      },
      error: () => {
        this.selectedIds.set(new Set());
        this.showBulkStatusDialog.set(false);
        this.load();
        this.toastService.show('error', 'Some properties could not be updated.', 3000);
      }
    });
  }

  protected getPropertiesByStatus(status: PropertyStatus): Property[] {
    return this.properties().filter(p => p.status === status);
  }

  protected statusColor(status: PropertyStatus): string {
    switch (status) {
      case 'Active': return '#22c55e';
      case 'Conditional': return '#f59e0b';
      case 'Sold': return '#3b82f6';
      case 'Draft': return '#9ca3af';
      case 'Terminated': return '#ef4444';
      case 'Expired': return '#f97316';
      case 'Delisted': return '#6b7280';
      default: return '#9ca3af';
    }
  }

  /* ── MLS / IDX Feed Integration (G1) ── */
  protected readonly mlsFeeds = signal<MlsFeedConfig[]>([]);
  protected readonly mlsImportHistory = signal<MlsImportJob[]>([]);
  protected readonly showMlsDialog = signal(false);
  protected readonly mlsImporting = signal(false);

  protected readonly mapNeighborhoods = computed(() => {
    const groups = new Map<string, Property[]>();
    for (const p of this.properties()) {
      const key = p.neighborhood || p.city || 'Other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    }
    return Array.from(groups.entries()).map(([name, items]) => ({ name, items }));
  });

  protected onShowMlsDialog(): void {
    this.showMlsDialog.set(true);
    this.propertyData.getMlsFeeds().subscribe({ next: (d) => this.mlsFeeds.set(d) });
    this.propertyData.getMlsImportHistory().subscribe({ next: (d) => this.mlsImportHistory.set(d) });
  }

  protected triggerMlsImport(feedId: string): void {
    this.mlsImporting.set(true);
    this.propertyData.triggerMlsImport(feedId).subscribe({
      next: () => {
        this.mlsImporting.set(false);
        this.toastService.show('success', 'MLS import started.', 3000);
        this.propertyData.getMlsImportHistory().subscribe({ next: (d) => this.mlsImportHistory.set(d) });
      },
      error: () => this.mlsImporting.set(false)
    });
  }

  protected mlsFeedStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) { case 'Active': return 'success'; case 'Paused': return 'warn'; case 'Error': return 'danger'; default: return 'secondary'; }
  }

  protected mlsJobStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) { case 'Completed': return 'success'; case 'Running': return 'info'; case 'Failed': return 'danger'; default: return 'secondary'; }
  }
}
