import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface SupplierDetail {
  id: string;
  companyName: string;
  industry: string;
  country: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  notes: string;
}

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, BreadcrumbsComponent],
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  supplierId: string | null = null;
  supplier: SupplierDetail | null = null;

  private readonly mockSuppliers: SupplierDetail[] = [
    {
      id: 'SUP-001',
      companyName: 'Atlas Components',
      industry: 'Electronics',
      country: 'USA',
      status: 'approved',
      contactName: 'Ava Reynolds',
      contactEmail: 'ava.reynolds@atlas.com',
      contactPhone: '+1 (415) 555-0198',
      website: 'https://atlascomponents.com',
      notes: 'Primary electronics supplier. Strong delivery SLA performance.'
    },
    {
      id: 'SUP-002',
      companyName: 'Nordic Metals',
      industry: 'Raw Materials',
      country: 'Sweden',
      status: 'submitted',
      contactName: 'Lars Holm',
      contactEmail: 'lars.holm@nordicmetals.se',
      contactPhone: '+46 8 555 0123',
      website: 'https://nordicmetals.se',
      notes: 'Onboarding in progress. Awaiting compliance documents.'
    },
    {
      id: 'SUP-003',
      companyName: 'Keystone Logistics',
      industry: 'Logistics',
      country: 'Canada',
      status: 'draft',
      contactName: 'Maya Singh',
      contactEmail: 'maya.singh@keystone.ca',
      contactPhone: '+1 (604) 555-0184',
      website: 'https://keystonelogistics.ca',
      notes: 'Draft profile created by procurement team.'
    }
  ];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get('id');
    this.loadSupplier();
  }

  navigateToList(): void {
    this.router.navigate(['/app/supply-chain/suppliers']);
  }

  editSupplier(): void {
    if (!this.supplierId) {
      return;
    }
    this.router.navigate(['/app/supply-chain/suppliers', this.supplierId, 'edit']);
  }

  getStatusSeverity(status: SupplierDetail['status']): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case 'approved':
        return 'success';
      case 'submitted':
        return 'info';
      case 'draft':
        return 'warn';
      default:
        return 'danger';
    }
  }

  private loadSupplier(): void {
    if (!this.supplierId) {
      this.navigateToList();
      return;
    }
    const supplier = this.mockSuppliers.find((item) => item.id === this.supplierId);
    if (!supplier) {
      this.navigateToList();
      return;
    }
    this.supplier = supplier;
  }
}
