import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface ReturnClaim {
  rmaId: string;
  supplier: string;
  po: string;
  sku: string;
  quantity: number;
  reason: string;
  status: 'Draft' | 'Submitted' | 'Awaiting Supplier' | 'In Transit' | 'Closed';
  owner: string;
  createdOn: string;
  tags: string[];
}

interface ClaimSummary {
  status: string;
  count: number;
  trend: 'up' | 'down' | 'flat';
  delta: string;
}

@Component({
  selector: 'app-returns-claims',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './returns-claims.component.html',
  styleUrls: ['./returns-claims.component.scss']
})
export class ReturnsClaimsComponent {
  readonly claims = signal<ReturnClaim[]>([
    {
      rmaId: 'RMA-1054',
      supplier: 'Vertex Industrial',
      po: 'PO-45008810',
      sku: 'PB-M12-001',
      quantity: 120,
      reason: 'Dimensional variance',
      status: 'Awaiting Supplier',
      owner: 'Quality Ops',
      createdOn: 'Oct 18, 2025',
      tags: ['Critical line A', 'QA']
    },
    {
      rmaId: 'RMA-1055',
      supplier: 'Innovatek EMS',
      po: 'PO-45008854',
      sku: 'MCU-X5-128',
      quantity: 60,
      reason: 'Firmware mismatch',
      status: 'Submitted',
      owner: 'Electronics QA',
      createdOn: 'Oct 23, 2025',
      tags: ['Expedite', 'Supplier investigation']
    },
    {
      rmaId: 'RMA-1056',
      supplier: 'Sunrise Textiles',
      po: 'PO-45008876',
      sku: 'FAB-302-RED',
      quantity: 210,
      reason: 'Color variance',
      status: 'In Transit',
      owner: 'Returns Team',
      createdOn: 'Oct 21, 2025',
      tags: ['Sustainability', 'Customer escalation']
    },
    {
      rmaId: 'RMA-1057',
      supplier: 'Nova Metals',
      po: 'PO-45008900',
      sku: 'CW-12-200',
      quantity: 320,
      reason: 'Surface oxidation',
      status: 'Draft',
      owner: 'Commodity QA',
      createdOn: 'Oct 26, 2025',
      tags: ['Commodity', 'Hold']
    },
    {
      rmaId: 'RMA-1051',
      supplier: 'BlueRibbon Logistics',
      po: 'PO-45008799',
      sku: 'PK-PF-004',
      quantity: 85,
      reason: 'Packaging damage in transit',
      status: 'Closed',
      owner: 'Supply Planning',
      createdOn: 'Oct 12, 2025',
      tags: ['Logistics', 'Resolved']
    }
  ]);

  readonly summaries = signal<ClaimSummary[]>([
    { status: 'Overdue response', count: 2, trend: 'up', delta: '+1 vs last week' },
    { status: 'Awaiting supplier', count: 4, trend: 'flat', delta: 'No change' },
    { status: 'Resolved MTD', count: 9, trend: 'up', delta: '+3 vs Sept' }
  ]);

  readonly openClaims = computed(() =>
    this.claims().filter(claim => claim.status !== 'Closed').length
  );

  readonly draftClaims = computed(() =>
    this.claims().filter(claim => claim.status === 'Draft').length
  );

  readonly closeRate = computed(() => {
    const total = this.claims().length || 1;
    const closed = this.claims().filter(claim => claim.status === 'Closed').length;
    return Math.round((closed / total) * 100);
  });

  statusSeverity(status: ReturnClaim['status']): 'info' | 'warn' | 'success' | 'danger' {
    switch (status) {
      case 'Closed':
        return 'success';
      case 'Draft':
        return 'info';
      case 'Awaiting Supplier':
        return 'warn';
      case 'In Transit':
        return 'info';
      case 'Submitted':
        return 'info';
      default:
        return 'info';
    }
  }
}
