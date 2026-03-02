import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { ItemMasterDataService } from '../../../catalog/services/item-master-data.service';
import { ItemMaster } from '../../../catalog/models/item-master.model';
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
    SelectModule,
    BreadcrumbsComponent
  ],
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {
  private itemMasterService = inject(ItemMasterDataService);
  private toastService = inject(AppToastService);
  private router = inject(Router);
  items: ItemMaster[] = [];
  loading = true;
  totalRecords = 0;
  searchValue = '';
  itemTypeFilter: 'Product' | 'Service' | 'all' = 'all';
  categoryFilter: string | null = null;
  statusFilter: 'active' | 'inactive' | 'all' = 'all';
  readonly itemTypeOptions = [
    { label: 'All types', value: 'all' },
    { label: 'Product', value: 'Product' },
    { label: 'Service', value: 'Service' }
  ];
  readonly statusOptions = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];
  categoryOptions: Array<{ label: string; value: string | null }> = [{ label: 'All categories', value: null }];
  rows = 10;
  first = 0;

  get activeCount(): number {
    return this.items.filter(item => item.isActive).length;
  }

  get inactiveCount(): number {
    return this.items.filter(item => !item.isActive).length;
  }

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
    this.itemTypeFilter = 'all';
    this.categoryFilter = null;
    this.statusFilter = 'all';
    this.applyFilters();
  }

  openCreatePage() {
    this.router.navigate(['/app/catalog/new']);
  }

  openEditPage(item: ItemMaster) {
    this.router.navigate(['/app/catalog', item.id, 'edit']);
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
    if (!confirm(`Archive ${item.name}?`)) {
      return;
    }

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
    const itemType = this.itemTypeFilter === 'all' ? undefined : this.itemTypeFilter;
    const isActive = this.statusFilter === 'all' ? undefined : this.statusFilter === 'active';
    this.itemMasterService.search({
      page,
      pageSize,
      search: this.searchValue.trim() || undefined,
      itemType,
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

}
