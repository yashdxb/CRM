import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

interface RfqHistoryItem {
  rfqId: string;
  title: string;
  requester: string;
  createdOn: string;
  closedOn: string;
  category: string;
  status: 'Awarded' | 'Cancelled' | 'In Negotiation';
  suppliersInvited: number;
  quotesReceived: number;
  savingsAchieved: string;
  tags: string[];
}

@Component({
  selector: 'app-rfq-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ChipModule,
    TagModule,
    SelectModule,
    InputTextModule
  ],
  templateUrl: './rfq-history.component.html',
  styleUrls: ['./rfq-history.component.scss']
})
export class RfqHistoryComponent {
  private readonly rfqHistorySignal = signal<RfqHistoryItem[]>([
    {
      rfqId: 'RFQ-2025-004',
      title: 'Precision Fasteners Q2',
      requester: 'Allison Drake',
      createdOn: 'Jan 22, 2025',
      closedOn: 'Feb 12, 2025',
      category: 'Mechanical Components',
      status: 'In Negotiation',
      suppliersInvited: 5,
      quotesReceived: 4,
      savingsAchieved: 'Projected 7.8%',
      tags: ['Value engineering', 'Freight']
    },
    {
      rfqId: 'RFQ-2025-003',
      title: 'Soldered Assemblies Supply',
      requester: 'Priya Nair',
      createdOn: 'Jan 05, 2025',
      closedOn: 'Jan 28, 2025',
      category: 'Electronics Manufacturing',
      status: 'Awarded',
      suppliersInvited: 6,
      quotesReceived: 5,
      savingsAchieved: '6.2%',
      tags: ['Alt materials', 'Warranty']
    },
    {
      rfqId: 'RFQ-2024-031',
      title: 'Embedded Controllers FY25',
      requester: 'Rafael Kim',
      createdOn: 'Dec 04, 2024',
      closedOn: 'Jan 09, 2025',
      category: 'Electronics Components',
      status: 'Awarded',
      suppliersInvited: 4,
      quotesReceived: 4,
      savingsAchieved: '4.8%',
      tags: ['Dual sourcing', 'FX hedge']
    },
    {
      rfqId: 'RFQ-2024-025',
      title: 'Packaging Materials Refresh',
      requester: 'Priya Nair',
      createdOn: 'Oct 16, 2024',
      closedOn: 'Nov 02, 2024',
      category: 'Packaging',
      status: 'Cancelled',
      suppliersInvited: 3,
      quotesReceived: 2,
      savingsAchieved: '—',
      tags: ['Sustainability']
    }
  ]);

  readonly rfqHistory = computed(() => this.rfqHistorySignal());
  selectedStatus: 'All' | RfqHistoryItem['status'] = 'All';
  selectedCategory: 'All' | string = 'All';
  searchTerm = '';

  get filteredHistory(): RfqHistoryItem[] {
    return this.rfqHistory().filter(item => {
      const matchesStatus = this.selectedStatus === 'All' || item.status === this.selectedStatus;
      const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchesSearch =
        !this.searchTerm ||
        item.rfqId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.requester.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }

  readonly statusOptions = [
    { label: 'All Statuses', value: 'All' },
    { label: 'Awarded', value: 'Awarded' },
    { label: 'In Negotiation', value: 'In Negotiation' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  readonly categoryOptions = [
    { label: 'All Categories', value: 'All' },
    { label: 'Mechanical Components', value: 'Mechanical Components' },
    { label: 'Electronics Manufacturing', value: 'Electronics Manufacturing' },
    { label: 'Electronics Components', value: 'Electronics Components' },
    { label: 'Packaging', value: 'Packaging' }
  ];

  constructor(private router: Router) {}

  openRfq(rfqId: string): void {
    this.router.navigate(['/app/supply-chain/rfqs', rfqId]);
  }
}
