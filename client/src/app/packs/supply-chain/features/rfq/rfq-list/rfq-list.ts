// src/app/features/procurement/rfqs/rfq-list/rfq-list.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

import { RFQ, RFQStatus, RFQType, RFQFilter } from '../../../models/rfq.model';
import { RfqDataService } from '../services/rfq-data.service';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-rfq-list',
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
  templateUrl: './rfq-list.html',
  styleUrls: ['./rfq-list.scss']
})
export class RfqListComponent implements OnInit {
  allData: RFQ[] = [];
  filteredData: RFQ[] = [];

  filter: RFQFilter = {
    searchText: '',
    status: undefined,
    type: undefined,
    dateFrom: undefined,
    dateTo: undefined
  };

  statusOptions = [
    { label: 'All Statuses', value: undefined },
    ...Object.values(RFQStatus).map(s => ({ label: s, value: s }))
  ];

  typeOptions = [
    { label: 'All Types', value: undefined },
    ...Object.values(RFQType).map(t => ({ label: t, value: t }))
  ];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private rfqDataService: RfqDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.rfqDataService.getAll().subscribe({
      next: items => {
        this.allData = items.map(item => this.rfqDataService.mapListItem(item));
        this.filteredData = [...this.allData];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Load failed',
          detail: 'Unable to load RFQs from the server.'
        });
      }
    });
  }

  applyFilters(): void {
    this.filteredData = this.allData.filter(item => {
      const matchesSearch = !this.filter.searchText || 
        item.rfqNumber.toLowerCase().includes(this.filter.searchText.toLowerCase()) ||
        item.title.toLowerCase().includes(this.filter.searchText.toLowerCase());

      const matchesStatus = !this.filter.status || item.status === this.filter.status;
      const matchesType = !this.filter.type || item.type === this.filter.type;

      const matchesDateFrom = !this.filter.dateFrom || 
        new Date(item.closeDate) >= new Date(this.filter.dateFrom);
      const matchesDateTo = !this.filter.dateTo || 
        new Date(item.closeDate) <= new Date(this.filter.dateTo);

      return matchesSearch && matchesStatus && matchesType && matchesDateFrom && matchesDateTo;
    });
  }

  resetFilters(): void {
    this.filter = {
      searchText: '',
      status: undefined,
      type: undefined,
      dateFrom: undefined,
      dateTo: undefined
    };
    this.applyFilters();
  }

  getStatusSeverity(status: RFQStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const severityMap: Record<RFQStatus, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      [RFQStatus.DRAFT]: 'secondary',
      [RFQStatus.PUBLISHED]: 'info',
      [RFQStatus.IN_PROGRESS]: 'warn',
      [RFQStatus.CLOSED]: 'secondary',
      [RFQStatus.AWARDED]: 'success',
      [RFQStatus.CANCELLED]: 'danger'
    };
    return severityMap[status];
  }

  getTypeSeverity(type: RFQType): 'success' | 'info' {
    return type === RFQType.RFQ ? 'success' : 'info';
  }

  createRFQ(): void {
    this.router.navigate(['/app/supply-chain/rfqs/new']);
  }

  viewDetails(item: RFQ): void {
    this.router.navigate(['/app/supply-chain/rfqs', item.id]);
  }

  editRFQ(item: RFQ): void {
    this.router.navigate(['/app/supply-chain/rfqs', item.id, 'edit']);
  }

  confirmDelete(item: RFQ): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${item.rfqNumber}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteRFQ(item);
      }
    });
  }

  deleteRFQ(item: RFQ): void {
    const index = this.allData.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.allData.splice(index, 1);
      this.applyFilters();
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'RFQ deleted successfully'
      });
    }
  }

  publishRFQ(item: RFQ): void {
    item.status = RFQStatus.PUBLISHED;
    item.publishDate = new Date();
    this.messageService.add({
      severity: 'success',
      summary: 'Published',
      detail: `${item.rfqNumber} has been published`
    });
  }

  getDaysRemaining(closeDate: Date): number {
    const today = new Date();
    const close = new Date(closeDate);
    const diff = close.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
