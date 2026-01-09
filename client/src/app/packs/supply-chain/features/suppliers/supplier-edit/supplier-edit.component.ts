
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { SupplierDataService, UpsertSupplierRequest, SupplierDetailResponse } from '../services/supplier-data.service';

@Component({
  selector: 'app-supplier-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  form!: FormGroup;
  supplierId: string | null = null;
  supplier: SupplierDetailResponse | null = null;

  // Status options for the dropdown
  statusOptions = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Pending Approval', value: 'Pending Approval' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Active', value: 'Active' },
    { label: 'On Hold', value: 'On Hold' },
    { label: 'Blocked', value: 'Blocked' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  readonly countryOptions = [
    { label: 'United States', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Germany', value: 'Germany' },
    { label: 'India', value: 'India' },
    { label: 'China', value: 'China' }
  ];




  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly supplierData: SupplierDataService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      country: [null],
      status: [null],
      contactName: [''],
      contactEmail: ['', Validators.email],
      contactPhone: [''],
      website: [''],
      notes: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.supplierId = id;
      this.loadSupplier();
    } else {
      this.supplierId = null;
      // New supplier starts as Draft - show all statuses for flexibility
      this.form.patchValue({ status: 'Draft' });
    }
    
    // Debug: log status options
    console.log('Status options:', this.statusOptions);
  }


  navigateToDetail(): void {
    if (!this.supplierId) {
      this.router.navigate(['/app/supply-chain/suppliers']);
      return;
    }
    this.router.navigate(['/app/supply-chain/suppliers', this.supplierId]);
  }


  saveSupplier(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: UpsertSupplierRequest = this.form.value;
    if (this.supplierId) {
      this.supplierData.updateSupplier(this.supplierId, request).subscribe({
        next: (res) => {
          this.supplierId = res.id;
          this.navigateToDetail();
        },
        error: (err) => {
          alert('Failed to update supplier: ' + (err?.error?.message || 'Unknown error'));
        }
      });
    } else {
      this.supplierData.createSupplier(request).subscribe({
        next: (res) => {
          this.supplierId = res.id;
          this.navigateToDetail();
        },
        error: (err) => {
          alert('Failed to create supplier: ' + (err?.error?.message || 'Unknown error'));
        }
      });
    }
  }


  cancel(): void {
    this.navigateToDetail();
  }

  statusLabel(value: string | null | undefined): string {
    const match = this.statusOptions.find((option) => option.value === value);
    return match?.label ?? 'Draft';
  }


  private loadSupplier(): void {
    if (!this.supplierId) {
      this.router.navigate(['/app/supply-chain/suppliers']);
      return;
    }
    this.supplierData.getSupplier(this.supplierId).subscribe({
      next: (supplier) => {
        this.supplier = supplier;
        this.form.patchValue(supplier);
        // Update status options based on current status (lifecycle transitions)
        this.statusOptions = this.getAllowedTransitions(supplier.status ?? null);
      },
      error: () => {
        this.router.navigate(['/app/supply-chain/suppliers']);
      }
    });
  }

  private getAllowedTransitions(currentStatus: string | null): Array<{ label: string; value: string }> {
    if (!currentStatus) {
      return [...this.statusOptions];
    }

    const allowed = new Set<string>([
      currentStatus,
      'Draft',
      'Pending Approval',
      'Approved',
      'Active',
      'On Hold',
      'Blocked',
      'Inactive'
    ]);

    return this.statusOptions.filter(option => allowed.has(option.value));
  }
}
