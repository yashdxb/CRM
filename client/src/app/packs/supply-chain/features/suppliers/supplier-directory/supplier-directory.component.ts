import { Component, inject, signal } from '@angular/core';
import { SupplierDataService, SupplierListItem } from '../services/supplier-data.service';
import { getStatusFilterOptions, getStatusSeverity } from '../models/supplier-status.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-supplier-directory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    SelectModule,
    TagModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './supplier-directory.component.html',
  styleUrls: ['./supplier-directory.component.scss']
})
export class SupplierDirectoryComponent {
  private readonly router = inject(Router);

  private readonly supplierData = inject(SupplierDataService);

  addSupplier(): void {
    this.router.navigate(['/app/supply-chain/suppliers', 'new', 'edit']);
  }
  readonly suppliers = signal<SupplierListItem[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);

  readonly statusOptions = getStatusFilterOptions();


  filter = { searchText: '', status: null as string | null };
  page = 1;
  pageSize = 20;

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading.set(true);
    console.log('Loading suppliers...');
    this.supplierData.getSuppliers({
      search: this.filter.searchText,
      status: this.filter.status ?? undefined,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe({
      next: (res) => {
        console.log('Suppliers loaded:', res);
        this.suppliers.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading suppliers:', err);
        console.error('Status:', err.status, 'Message:', err.message);
        console.error('Full error:', JSON.stringify(err, null, 2));
        this.suppliers.set([]);
        this.total.set(0);
        this.loading.set(false);
      }
    });
  }


  applyFilters(): void {
    this.page = 1;
    this.loadSuppliers();
  }


  resetFilters(): void {
    this.filter = { searchText: '', status: null };
    this.page = 1;
    this.loadSuppliers();
  }

  getStatusSeverity(status: string) {
    return getStatusSeverity(status);
  }


  viewSupplier(row: { id: string }): void {
    this.router.navigate(['/app/supply-chain/suppliers', row.id]);
  }

  editSupplier(row: { id: string }): void {
    this.router.navigate(['/app/supply-chain/suppliers', row.id, 'edit']);
  }

  removeSupplier(row: { id: string }): void {
    if (!row.id) return;
    if (!confirm('Are you sure you want to remove this supplier?')) return;
    this.supplierData.deleteSupplier(row.id).subscribe({
      next: () => this.loadSuppliers(),
      error: () => alert('Failed to remove supplier.')
    });
  }
}
