import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';

import {
  PurchaseOrder,
  PurchaseOrderFilter,
  PurchaseOrderStatus
} from '../../../../models/po.model';
import { PURCHASE_ORDERS_SEED_DATA } from '../../data/purchase-orders-seed.data';
import { BreadcrumbsComponent } from '../../../../../../core/breadcrumbs';

@Component({
  selector: 'app-po-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TagModule,
    DatePickerModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.scss']
})
export class PoListComponent implements OnInit {
  allData: PurchaseOrder[] = [];
  filteredData: PurchaseOrder[] = [];

  filter: PurchaseOrderFilter = {
    searchText: '',
    status: undefined,
    supplier: undefined,
    dateFrom: undefined,
    dateTo: undefined
  };

  statusOptions = [
    { label: 'All Statuses', value: undefined },
    { label: 'Draft', value: 'Draft' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'Approved', value: 'Approved' },
    { label: 'In Transit', value: 'In Transit' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  supplierOptions: Array<{ label: string; value: string | undefined }> = [{ label: 'All Suppliers', value: undefined }];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allData = PURCHASE_ORDERS_SEED_DATA.map((item) => ({ ...item }));
    const suppliers = Array.from(new Set(this.allData.map((item) => item.supplierName)));
    this.supplierOptions = [
      { label: 'All Suppliers', value: undefined },
      ...suppliers.map((supplier) => ({ label: supplier, value: supplier }))
    ];
    this.filteredData = [...this.allData];
  }

  applyFilters(): void {
    this.filteredData = this.allData.filter((item) => {
      const term = this.filter.searchText.trim().toLowerCase();
      const matchesSearch =
        !term ||
        item.poNumber.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        item.supplierName.toLowerCase().includes(term);

      const matchesStatus = !this.filter.status || item.status === this.filter.status;
      const matchesSupplier = !this.filter.supplier || item.supplierName === this.filter.supplier;

      const matchesDateFrom = !this.filter.dateFrom || new Date(item.orderDate) >= new Date(this.filter.dateFrom);
      const matchesDateTo = !this.filter.dateTo || new Date(item.orderDate) <= new Date(this.filter.dateTo);

      return matchesSearch && matchesStatus && matchesSupplier && matchesDateFrom && matchesDateTo;
    });
  }

  resetFilters(): void {
    this.filter = {
      searchText: '',
      status: undefined,
      supplier: undefined,
      dateFrom: undefined,
      dateTo: undefined
    };
    this.applyFilters();
  }

  getStatusSeverity(status: PurchaseOrderStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const severityMap: Record<PurchaseOrderStatus, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      Draft: 'secondary',
      Submitted: 'info',
      Approved: 'success',
      'In Transit': 'warn',
      Completed: 'success',
      Cancelled: 'danger'
    };
    return severityMap[status];
  }

  createPO(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Mock Action',
      detail: 'Create PO is coming soon for Procurement.'
    });
  }

  viewDetails(item: PurchaseOrder): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Mock Action',
      detail: `Open details for ${item.poNumber}.`
    });
  }

  editPO(item: PurchaseOrder): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Mock Action',
      detail: `Edit ${item.poNumber} in the next iteration.`
    });
  }

  confirmDelete(item: PurchaseOrder): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${item.poNumber}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deletePO(item)
    });
  }

  deletePO(item: PurchaseOrder): void {
    const index = this.allData.findIndex((row) => row.id === item.id);
    if (index > -1) {
      this.allData.splice(index, 1);
      this.applyFilters();
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Purchase order deleted successfully.'
      });
    }
  }

  getDaysUntilDelivery(item: PurchaseOrder): number {
    if (!item.expectedDeliveryDate) {
      return 0;
    }
    const today = new Date();
    const delivery = new Date(item.expectedDeliveryDate);
    const diff = delivery.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
