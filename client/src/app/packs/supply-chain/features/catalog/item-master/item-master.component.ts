import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ItemMasterDataService } from '../../../catalog/services/item-master-data.service';
import { ItemMaster, ItemMasterUpsertRequest } from '../../../catalog/models/item-master.model';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { AppToastService } from '../../../../../core/app-toast.service';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SelectModule,
    BreadcrumbsComponent
  ],
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {
  private itemMasterService = inject(ItemMasterDataService);
  private toastService = inject(AppToastService);
  items: ItemMaster[] = [];
  loading = true;
  totalRecords = 0;
  searchValue = '';
  categoryFilter: string | null = null;
  statusFilter: 'active' | 'inactive' | 'all' = 'all';
  readonly statusOptions = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];
  categoryOptions: Array<{ label: string; value: string | null }> = [{ label: 'All categories', value: null }];
  rows = 10;
  first = 0;
  dialogVisible = false;
  dialogSubmitting = false;
  editingId: string | null = null;
  form: ItemMasterUpsertRequest = this.createEmptyForm();

  ngOnInit(): void {
    this.loadCategories();
    this.loadItems(0, this.rows);
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    const pageSize = event.rows ?? this.rows;
    const first = event.first ?? 0;
    this.rows = pageSize;
    this.first = first;
    this.loadItems(first, pageSize);
  }

  applyFilters() {
    this.first = 0;
    this.loadItems(0, this.rows);
  }

  clearFilters() {
    this.searchValue = '';
    this.categoryFilter = null;
    this.statusFilter = 'all';
    this.applyFilters();
  }

  openCreateDialog() {
    this.editingId = null;
    this.form = this.createEmptyForm();
    this.dialogVisible = true;
  }

  openEditDialog(item: ItemMaster) {
    this.editingId = item.id;
    this.form = {
      sku: item.sku,
      name: item.name,
      description: item.description ?? '',
      categoryName: item.categoryName ?? '',
      defaultUom: item.defaultUom ?? '',
      isActive: item.isActive
    };
    this.dialogVisible = true;
  }

  saveDialog() {
    if (!this.form.sku.trim() || !this.form.name.trim()) {
      this.toastService.show('error', 'SKU and name are required.', 2600);
      return;
    }

    this.dialogSubmitting = true;
    const payload: ItemMasterUpsertRequest = {
      sku: this.form.sku.trim(),
      name: this.form.name.trim(),
      description: this.form.description?.trim() || null,
      categoryName: this.form.categoryName?.trim() || null,
      defaultUom: this.form.defaultUom?.trim() || null,
      isActive: this.form.isActive
    };

    const request$ = this.editingId
      ? this.itemMasterService.update(this.editingId, payload)
      : this.itemMasterService.create(payload);

    request$.subscribe({
      next: () => {
        if (!this.editingId) {
          this.first = 0;
        }
        this.dialogSubmitting = false;
        this.dialogVisible = false;
        this.toastService.show('success', this.editingId ? 'Item updated.' : 'Item created.', 2200);
        this.loadCategories();
        this.loadItems(this.first, this.rows);
      },
      error: (error) => {
        this.dialogSubmitting = false;
        const message = error?.error?.message || 'Unable to save item.';
        this.toastService.show('error', message, 3200);
      }
    });
  }

  toggleActive(item: ItemMaster) {
    this.itemMasterService.toggleActive(item.id).subscribe({
      next: (updated) => {
        this.toastService.show('success', `${updated.name} is now ${updated.isActive ? 'active' : 'inactive'}.`, 2200);
        this.loadItems(this.first, this.rows);
      },
      error: () => {
        this.toastService.show('error', 'Unable to update item status.', 2800);
      }
    });
  }

  archive(item: ItemMaster) {
    this.itemMasterService.delete(item.id).subscribe({
      next: () => {
        this.toastService.show('success', `${item.name} archived.`, 2200);
        this.loadCategories();
        this.loadItems(this.first, this.rows);
      },
      error: () => {
        this.toastService.show('error', 'Unable to archive item.', 2800);
      }
    });
  }

  formatPrice(item: ItemMaster): string {
    if (item.defaultUnitPrice == null) {
      return 'No active price list';
    }

    return `${item.defaultUnitPrice.toFixed(2)}${item.defaultPriceListName ? ` (${item.defaultPriceListName})` : ''}`;
  }

  private loadCategories() {
    this.itemMasterService.search({ page: 1, pageSize: 100 }).subscribe({
      next: (result) => {
        const categories = Array.from(new Set(
          (result.items ?? [])
            .map((item) => item.categoryName?.trim())
            .filter((value): value is string => !!value)
        )).sort((a, b) => a.localeCompare(b));

        this.categoryOptions = [
          { label: 'All categories', value: null },
          ...categories.map((category) => ({ label: category, value: category }))
        ];
      },
      error: () => {
        this.categoryOptions = [{ label: 'All categories', value: null }];
      }
    });
  }

  private loadItems(first: number, pageSize: number) {
    this.loading = true;
    const page = Math.floor(first / pageSize) + 1;
    const isActive = this.statusFilter === 'all' ? undefined : this.statusFilter === 'active';
    this.itemMasterService.search({
      page,
      pageSize,
      search: this.searchValue.trim() || undefined,
      category: this.categoryFilter ?? undefined,
      isActive
    }).subscribe({
      next: (result) => {
        this.items = result.items ?? [];
        this.totalRecords = result.total ?? 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.items = [];
        this.totalRecords = 0;
      }
    });
  }

  private createEmptyForm(): ItemMasterUpsertRequest {
    return {
      sku: '',
      name: '',
      description: null,
      categoryName: null,
      defaultUom: null,
      isActive: true
    };
  }
}
