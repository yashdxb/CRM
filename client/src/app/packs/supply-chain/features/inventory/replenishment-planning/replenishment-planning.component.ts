import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface ReplenishmentPlan {
  planId: string;
  priority: 'High' | 'Medium' | 'Low';
  warehouse: string;
  sku: string;
  product: string;
  supplier: string;
  orderQty: number;
  suggestedQty: number;
  eta: string;
  status: 'Draft' | 'Awaiting approval' | 'Confirmed';
  rationale: string;
  tags: string[];
}

interface TaskItem {
  title: string;
  description: string;
  owner: string;
  due: string;
  status: 'Open' | 'In progress' | 'Completed';
}

@Component({
  selector: 'app-replenishment-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    SelectModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './replenishment-planning.component.html',
  styleUrls: ['./replenishment-planning.component.scss']
})
export class ReplenishmentPlanningComponent {
  private readonly plans = signal<ReplenishmentPlan[]>([
    {
      planId: 'PLAN-2045',
      priority: 'High',
      warehouse: 'Munich Hub',
      sku: 'PB-M12-001',
      product: 'Precision Bolt M12',
      supplier: 'Vertex Industrial',
      orderQty: 480,
      suggestedQty: 520,
      eta: 'ETA 12 Nov',
      status: 'Awaiting approval',
      rationale: 'Line B safety stock breach in 9 days. Expedite recommended.',
      tags: ['Expedite', 'Production critical']
    },
    {
      planId: 'PLAN-2052',
      priority: 'Medium',
      warehouse: 'Chicago DC',
      sku: 'MCU-X5-128',
      product: 'MCU Series X5 · 128MB',
      supplier: 'Innovatek',
      orderQty: 750,
      suggestedQty: 720,
      eta: 'ETA 18 Nov',
      status: 'Draft',
      rationale: 'Seasonal build plan requires buffer uplift.',
      tags: ['Seasonal', 'Collaborative']
    },
    {
      planId: 'PLAN-2057',
      priority: 'Low',
      warehouse: 'Rotterdam DC',
      sku: 'PK-PF-004',
      product: 'Polyfoam Packaging',
      supplier: 'BlueRibbon Logistics',
      orderQty: 320,
      suggestedQty: 300,
      eta: 'ETA 25 Nov',
      status: 'Confirmed',
      rationale: 'Aligning with packaging vendor weekly consolidation.',
      tags: ['Consolidated', 'Sustainability']
    }
  ]);

  readonly tasks = signal<TaskItem[]>([
    {
      title: 'Validate BOM consumption for PLAN-2045',
      description: 'Confirm updated usage with production planning before releasing PO.',
      owner: 'Ashley Patel',
      due: 'Due tomorrow',
      status: 'In progress'
    },
    {
      title: 'Supplier commit for PLAN-2052',
      description: 'Request Innovatek for early slot on EMS line.',
      owner: 'Carlos Rivera',
      due: 'Due in 3 days',
      status: 'Open'
    },
    {
      title: 'Review excess from PLAN-2057',
      description: 'Check offset opportunity with APAC sites',
      owner: 'Priya Sen',
      due: 'Completed',
      status: 'Completed'
    }
  ]);

  readonly filters = {
    priority: [
      { label: 'All priorities', value: 'All' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' }
    ],
    status: [
      { label: 'All statuses', value: 'All' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Awaiting approval', value: 'Awaiting approval' },
      { label: 'Confirmed', value: 'Confirmed' }
    ],
    warehouse: [
      { label: 'All warehouses', value: 'All' },
      { label: 'Munich Hub', value: 'Munich Hub' },
      { label: 'Chicago DC', value: 'Chicago DC' },
      { label: 'Rotterdam DC', value: 'Rotterdam DC' }
    ]
  };

  readonly selectedPriority = signal('All');
  readonly selectedStatus = signal('All');
  readonly selectedWarehouse = signal('All');

  get selectedPriorityValue(): string {
    return this.selectedPriority();
  }
  set selectedPriorityValue(value: string) {
    this.selectedPriority.set(value);
  }

  get selectedStatusValue(): string {
    return this.selectedStatus();
  }
  set selectedStatusValue(value: string) {
    this.selectedStatus.set(value);
  }

  get selectedWarehouseValue(): string {
    return this.selectedWarehouse();
  }
  set selectedWarehouseValue(value: string) {
    this.selectedWarehouse.set(value);
  }

  readonly visiblePlans = computed(() => {
    const priority = this.selectedPriority();
    const status = this.selectedStatus();
    const warehouse = this.selectedWarehouse();

    return this.plans().filter(plan => {
      const priorityOk = priority === 'All' || plan.priority === priority;
      const statusOk = status === 'All' || plan.status === status;
      const warehouseOk = warehouse === 'All' || plan.warehouse === warehouse;
      return priorityOk && statusOk && warehouseOk;
    });
  });

  readonly approvalProgress = computed(() => {
    const awaiting = this.plans().filter(p => p.status === 'Awaiting approval').length;
    const total = this.plans().length || 1;
    return Math.round((awaiting / total) * 100);
  });

  readonly openTasks = computed(() =>
    this.tasks().filter(task => task.status !== 'Completed').length
  );

  fillPercent(plan: ReplenishmentPlan): number {
    if (!plan.suggestedQty) {
      return 0;
    }
    return Math.min(100, Math.round((plan.orderQty / plan.suggestedQty) * 100));
  }

  tagSeverity(priority: ReplenishmentPlan['priority']): 'danger' | 'warn' | 'info' {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warn';
      default:
        return 'info';
    }
  }

  statusSeverity(status: ReplenishmentPlan['status']): 'info' | 'warn' | 'success' {
    switch (status) {
      case 'Awaiting approval':
        return 'warn';
      case 'Confirmed':
        return 'success';
      default:
        return 'info';
    }
  }
}
