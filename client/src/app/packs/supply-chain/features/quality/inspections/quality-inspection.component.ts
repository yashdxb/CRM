import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface InspectionLot {
  lotId: string;
  supplier: string;
  po: string;
  sku: string;
  receivedQty: number;
  inspectedQty: number;
  status: 'Awaiting Inspection' | 'In Progress' | 'Completed' | 'Hold';
  defects: number;
  owner: string;
  tags: string[];
}

interface InspectionSummary {
  window: string;
  lots: number;
  completed: number;
  defects: number;
}

@Component({
  selector: 'app-quality-inspection',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './quality-inspection.component.html',
  styleUrls: ['./quality-inspection.component.scss']
})
export class QualityInspectionComponent {
  readonly lots = signal<InspectionLot[]>([
    {
      lotId: 'LOT-2025-118',
      supplier: 'Vertex Industrial',
      po: 'PO-45008944',
      sku: 'PB-M12-001',
      receivedQty: 320,
      inspectedQty: 120,
      status: 'In Progress',
      defects: 2,
      owner: 'A. Garcia',
      tags: ['Priority line A', 'Dimensional check']
    },
    {
      lotId: 'LOT-2025-119',
      supplier: 'Innovatek EMS',
      po: 'PO-45008968',
      sku: 'MCU-X5-128',
      receivedQty: 190,
      inspectedQty: 190,
      status: 'Completed',
      defects: 0,
      owner: 'J. Chen',
      tags: ['Electronics', 'Visual']
    },
    {
      lotId: 'LOT-2025-120',
      supplier: 'Nova Metals',
      po: 'PO-45008998',
      sku: 'CW-12-200',
      receivedQty: 540,
      inspectedQty: 0,
      status: 'Awaiting Inspection',
      defects: 0,
      owner: 'Pending assignment',
      tags: ['Commodity', 'Chemical cert']
    },
    {
      lotId: 'LOT-2025-121',
      supplier: 'Sunrise Textiles',
      po: 'PO-45008977',
      sku: 'FAB-302-RED',
      receivedQty: 240,
      inspectedQty: 120,
      status: 'Hold',
      defects: 8,
      owner: 'M. Patel',
      tags: ['Color variance', 'Customer escalation']
    },
    {
      lotId: 'LOT-2025-122',
      supplier: 'BlueRibbon Logistics',
      po: 'PO-45009002',
      sku: 'PK-PF-004',
      receivedQty: 400,
      inspectedQty: 260,
      status: 'In Progress',
      defects: 1,
      owner: 'S. Taylor',
      tags: ['Packaging integrity']
    }
  ]);

  readonly summary = signal<InspectionSummary[]>([
    { window: 'Morning', lots: 6, completed: 3, defects: 2 },
    { window: 'Afternoon', lots: 5, completed: 1, defects: 1 },
    { window: 'Evening', lots: 3, completed: 0, defects: 0 }
  ]);

  readonly backlogCount = computed(() =>
    this.lots().filter(lot => lot.status === 'Awaiting Inspection').length
  );

  readonly holdCount = computed(() =>
    this.lots().filter(lot => lot.status === 'Hold').length
  );

  readonly completionRate = computed(() => {
    const total = this.lots().length || 1;
    const completed = this.lots().filter(lot => lot.status === 'Completed').length;
    return Math.round((completed / total) * 100);
  });

  percentage(completed: number, total: number): number {
    if (!total) {
      return 0;
    }
    return Math.round((completed / total) * 100);
  }

  statusSeverity(status: InspectionLot['status']): 'info' | 'warn' | 'success' | 'danger' {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Awaiting Inspection':
        return 'info';
      case 'In Progress':
        return 'warn';
      case 'Hold':
        return 'danger';
      default:
        return 'info';
    }
  }
}
