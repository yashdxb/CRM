import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-supplier-compliance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    SelectModule,
    TagModule,
    BreadcrumbsComponent
  ],
  templateUrl: './supplier-compliance.component.html',
  styleUrls: ['./supplier-compliance.component.scss']
})
export class SupplierComplianceComponent {
  readonly rows: Array<{
    supplier: string;
    certification: string;
    status: 'Valid' | 'Expiring' | 'Expired';
    expiry: string;
  }> = [
    { supplier: 'Atlas Components', certification: 'ISO 9001', status: 'Valid', expiry: '2026-02-15' },
    { supplier: 'Nordic Metals', certification: 'REACH', status: 'Expiring', expiry: '2025-05-02' },
    { supplier: 'Keystone Logistics', certification: 'C-TPAT', status: 'Valid', expiry: '2026-08-21' },
    { supplier: 'Summit Packaging', certification: 'FSC', status: 'Expired', expiry: '2024-12-10' }
  ];

  readonly statusOptions = [
    { label: 'All statuses', value: null },
    { label: 'Valid', value: 'Valid' },
    { label: 'Expiring', value: 'Expiring' },
    { label: 'Expired', value: 'Expired' }
  ];

  filter = { searchText: '', status: null as string | null };
  filteredRows = [...this.rows];

  applyFilters(): void {
    const term = this.filter.searchText.trim().toLowerCase();
    this.filteredRows = this.rows.filter((row) => {
      const matchesTerm =
        !term ||
        row.supplier.toLowerCase().includes(term) ||
        row.certification.toLowerCase().includes(term);
      const matchesStatus = !this.filter.status || row.status === this.filter.status;
      return matchesTerm && matchesStatus;
    });
  }

  resetFilters(): void {
    this.filter = { searchText: '', status: null };
    this.filteredRows = [...this.rows];
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Valid':
        return 'success';
      case 'Expiring':
        return 'warn';
      default:
        return 'danger';
    }
  }
}
