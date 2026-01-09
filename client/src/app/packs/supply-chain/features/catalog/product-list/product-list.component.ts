
// src/app/features/products/product-list/product-list.component.ts

import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG Imports
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';

// Services and Models
import { ProductService } from '../../../catalog/services/product.service';
import { Product, DemandLevel, CatalogSupplier } from '../../../catalog/models/product.model';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialogModule,
    ToastModule,
    MultiSelectModule,
    CheckboxModule,
    BreadcrumbsComponent,
    EmptyStateComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  @ViewChild('dt') dataTable?: Table;

  products: Product[] = [];
  suppliers: CatalogSupplier[] = [];
  loading = true;
  searchValue = '';
  selectedSupplierIds: string[] = [];
  supplierSelectionTouched = false;
  selectedProducts: Product[] = [];
  rfqDraftProductIds = new Set<string>();
  rfqDraftProducts: Product[] = [];

  ngOnInit(): void {
    this.loading = false;
    this.loadSuppliers();
  }

  /** Load products for the selected suppliers */
  loadProducts(): void {
    if (!this.selectedSupplierIds.length) {
      this.loading = false;
      this.products = [];
      return;
    }

    this.loading = true;
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products.filter(product =>
          this.selectedSupplierIds.includes(product.supplierId)
        );
        this.loading = false;
        this.selectedProducts = [];
      },
      error: error => {
        console.error('Error loading products:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products'
        });
      }
    });
  }

  /** Load available suppliers */
  loadSuppliers(): void {
    this.productService.getSuppliers().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
      },
      error: error => {
        console.error('Error loading suppliers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load suppliers'
        });
      }
    });
  }

  onSupplierSelectionChange(): void {
    this.supplierSelectionTouched = true;
    this.rfqDraftProductIds.clear();
    this.rfqDraftProducts = [];
    this.clearSelection();

    if (!this.selectedSupplierIds.length) {
      this.products = [];
      return;
    }

    this.loadProducts();
  }

  clearSupplierSelection(): void {
    this.selectedSupplierIds = [];
    this.supplierSelectionTouched = true;
    this.rfqDraftProductIds.clear();
    this.rfqDraftProducts = [];
    this.clearSelection();
    this.products = [];
    this.searchValue = '';
    this.loading = false;
  }

  hasSupplierSelection(): boolean {
    return this.selectedSupplierIds.length > 0;
  }

  getSelectedSupplierNames(): string[] {
    return this.suppliers
      .filter(supplier => this.selectedSupplierIds.includes(supplier.id))
      .map(supplier => supplier.name);
  }

  addToRfqDraft(product: Product): void {
    const added = this.addProductToDraft(product);
    if (!added) {
      this.messageService.add({
        severity: 'info',
        summary: 'Already added',
        detail: `${product.name} is already in your RFQ draft`
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Added to draft',
      detail: `${product.name} saved for ${product.supplierName}`
    });
  }

  addSelectedToRfqDraft(): void {
    if (!this.selectedProducts.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Select products first',
        detail: 'Choose one or more products to add to your RFQ draft.'
      });
      return;
    }

    let addedCount = 0;
    const newlyAdded: Product[] = [];
    this.selectedProducts.forEach(product => {
      if (this.addProductToDraft(product)) {
        addedCount++;
        newlyAdded.push(product);
      }
    });

    if (addedCount) {
      const supplierNames = Array.from(new Set(newlyAdded.map(product => product.supplierName)));
      this.messageService.add({
        severity: 'success',
        summary: 'Products added',
        detail: `${addedCount} product${addedCount > 1 ? 's' : ''} added for ${supplierNames.join(', ')}`
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Already added',
        detail: 'Selected products were already part of the RFQ draft.'
      });
    }

    this.clearSelection();
  }

  selectAllVisible(): void {
    const tableRecords: Product[] =
      (this.dataTable?.filteredValue as Product[] | undefined) ?? this.products;
    this.selectedProducts = [...tableRecords];
    if (this.dataTable) {
      this.dataTable.selection = [...this.selectedProducts];
      const dataKey = this.dataTable.dataKey;
      if (dataKey) {
        const selectionKeys: Record<string, boolean> = {};
        this.selectedProducts.forEach(item => {
          const record = item as unknown as Record<string, unknown>;
          const key = record[dataKey];
          if (key !== undefined && key !== null) {
            selectionKeys[String(key)] = true;
          }
        });
        this.dataTable.selectionKeys = selectionKeys;
      }
    }
  }

  clearSelection(): void {
    this.selectedProducts = [];
    if (this.dataTable) {
      this.dataTable.selection = [];
      this.dataTable.selectionKeys = {};
    }
  }

  onSelectionChange(selected: Product[]): void {
    this.selectedProducts = selected;
  }

  isInRfqDraft(product: Product): boolean {
    return this.rfqDraftProductIds.has(product.id);
  }

  get hasDraftItems(): boolean {
    return this.rfqDraftProducts.length > 0;
  }

  get draftSupplierNames(): string {
    const names = Array.from(new Set(this.rfqDraftProducts.map(product => product.supplierName)));
    return names.join(', ');
  }

  get draftSummary(): string {
    const supplierCount = new Set(this.rfqDraftProducts.map(product => product.supplierId)).size;
    if (supplierCount <= 1) {
      const count = this.rfqDraftProducts.length;
      return `${count} item${count === 1 ? '' : 's'} ready for RFQ`;
    }
    return `${this.rfqDraftProducts.length} items across ${supplierCount} suppliers`;
  }

  navigateToDraft(): void {
    const supplierIds = Array.from(new Set(this.rfqDraftProducts.map(product => product.supplierId)));
    const productIds = this.rfqDraftProducts.map(product => product.id);

    this.router.navigate(['/app/supply-chain/rfqs/draft'], {
      queryParams: {
        ...(supplierIds.length === 1 ? { supplierId: supplierIds[0] } : {}),
        productIds: productIds.join(',')
      }
    });
  }

  /** Clear global search filter */
  clear(table: Table): void {
    table.clear();
    this.searchValue = '';
  }

  getDemandLevel(demand: number): DemandLevel {
    if (demand >= 500) return DemandLevel.HIGH;
    if (demand >= 200) return DemandLevel.MEDIUM;
    return DemandLevel.LOW;
  }

  getDemandSeverity(demand: number): 'success' | 'warn' | 'info' {
    const level = this.getDemandLevel(demand);
    switch (level) {
      case DemandLevel.HIGH:
        return 'success';
      case DemandLevel.MEDIUM:
        return 'warn';
      case DemandLevel.LOW:
      default:
        return 'info';
    }
  }

  isStockLow(product: Product): boolean {
    if (!product.currentStockLevel) return false;
    return product.currentStockLevel < product.optimalStockLevel * 0.8;
  }

  getStockSeverity(product: Product): 'success' | 'warn' | 'danger' {
    if (!product.currentStockLevel) return 'warn';
    const percentage = (product.currentStockLevel / product.optimalStockLevel) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warn';
    return 'danger';
  }

  getStockStatusLabel(currentStock?: number, optimalStock?: number): string {
    if (!currentStock || !optimalStock) return 'Unknown';
    const percentage = (currentStock / optimalStock) * 100;
    if (percentage >= 80) return 'Healthy';
    if (percentage >= 50) return 'Monitor';
    return 'Low';
  }

  getStockStatusClass(currentStock?: number, optimalStock?: number): string {
    if (!currentStock || !optimalStock) return 'stock-status stock-status--unknown';
    const percentage = (currentStock / optimalStock) * 100;
    if (percentage >= 80) return 'stock-status stock-status--healthy';
    if (percentage >= 50) return 'stock-status stock-status--monitor';
    return 'stock-status stock-status--low';
  }

  viewProduct(product: Product): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Coming soon',
      detail: `Product detail view for ${product.name} will be available in the next release.`
    });
  }

  editProduct(product: Product): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Coming soon',
      detail: `Product edit form for ${product.name} will be available in the next release.`
    });
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to deactivate ${product.name}?`,
      header: 'Confirm Deactivation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deactivated successfully'
            });
            this.loadProducts();
          },
          error: error => {
            console.error('Error deactivating product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to deactivate product'
            });
          }
        });
      }
    });
  }

  addProduct(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Coming soon',
      detail: 'Add new product form will be available in the next release.'
    });
  }

  private addProductToDraft(product: Product): boolean {
    if (this.rfqDraftProductIds.has(product.id)) {
      return false;
    }

    this.rfqDraftProductIds.add(product.id);
    this.rfqDraftProducts = [...this.rfqDraftProducts, product];
    return true;
  }
}
