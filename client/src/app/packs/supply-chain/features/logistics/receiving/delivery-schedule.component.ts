import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface DeliverySlot {
  window: string;
  carrier: string;
  dock: string;
  supplier: string;
  po: string;
  items: number;
  status: 'Scheduled' | 'Arrived' | 'Completed' | 'Delayed';
  notes: string;
  tags: string[];
}

interface CalendarDay {
  date: string;
  weekday: string;
  planned: number;
  completed: number;
  issues: number;
}

@Component({
  selector: 'app-delivery-schedule',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    ProgressBarModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './delivery-schedule.component.html',
  styleUrls: ['./delivery-schedule.component.scss']
})
export class DeliveryScheduleComponent {
  readonly calendar = signal<CalendarDay[]>([
    { date: 'Oct 27', weekday: 'Mon', planned: 12, completed: 10, issues: 1 },
    { date: 'Oct 28', weekday: 'Tue', planned: 14, completed: 12, issues: 2 },
    { date: 'Oct 29', weekday: 'Wed', planned: 11, completed: 8, issues: 1 },
    { date: 'Oct 30', weekday: 'Thu', planned: 9, completed: 7, issues: 0 },
    { date: 'Oct 31', weekday: 'Fri', planned: 15, completed: 0, issues: 0 }
  ]);

  readonly slots = signal<DeliverySlot[]>([
    {
      window: '08:00 – 09:00',
      carrier: 'QuickRoute Trucking',
      dock: 'North Dock 3',
      supplier: 'Vertex Industrial',
      po: 'PO-45008910',
      items: 280,
      status: 'Arrived',
      notes: 'Waiting QA clearance',
      tags: ['Priority line A', 'QA hold']
    },
    {
      window: '09:00 – 10:00',
      carrier: 'BlueRibbon Logistics',
      dock: 'North Dock 5',
      supplier: 'BlueRibbon Packaging',
      po: 'PO-45008976',
      items: 560,
      status: 'Scheduled',
      notes: 'Packaging replenishment',
      tags: ['Packaging', 'Bulk']
    },
    {
      window: '10:30 – 11:30',
      carrier: 'FlexTrack Air',
      dock: 'Air Freight Hub',
      supplier: 'Innovatek EMS',
      po: 'PO-45008988',
      items: 190,
      status: 'Scheduled',
      notes: 'Expedite, staging complete',
      tags: ['Expedite', 'Line B']
    },
    {
      window: '12:00 – 13:00',
      carrier: 'RegionRail Freight',
      dock: 'Rail Spur 2',
      supplier: 'Nova Metals',
      po: 'PO-45008877',
      items: 720,
      status: 'Delayed',
      notes: 'ETA +4h – weather',
      tags: ['Commodity', 'Escalate']
    },
    {
      window: '14:00 – 15:00',
      carrier: 'QuickRoute Trucking',
      dock: 'North Dock 2',
      supplier: 'Sunrise Textiles',
      po: 'PO-45008954',
      items: 430,
      status: 'Scheduled',
      notes: 'Requires inspection',
      tags: ['Sustainability']
    }
  ]);

  readonly completionRate = computed(() => {
    const completed = this.calendar().reduce((sum, day) => sum + day.completed, 0);
    const planned = this.calendar().reduce((sum, day) => sum + day.planned, 0);
    if (!planned) {
      return 0;
    }
    return Math.round((completed / planned) * 100);
  });

  readonly issueRate = computed(() => {
    const issues = this.calendar().reduce((sum, day) => sum + day.issues, 0);
    const planned = this.calendar().reduce((sum, day) => sum + day.planned, 0);
    if (!planned) {
      return 0;
    }
    return Math.round((issues / planned) * 100);
  });

  readonly totalPlanned = computed(() =>
    this.calendar().reduce((sum, day) => sum + day.planned, 0)
  );

  readonly totalIssues = computed(() =>
    this.calendar().reduce((sum, day) => sum + day.issues, 0)
  );

  statusSeverity(status: DeliverySlot['status']): 'info' | 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Arrived':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Delayed':
        return 'danger';
      default:
        return 'warn';
    }
  }

  getCarrierClass(carrier: string): string {
    const name = carrier.toLowerCase();
    if (name.includes('quick')) return 'carrier--quick';
    if (name.includes('blue')) return 'carrier--blue';
    if (name.includes('flex')) return 'carrier--flex';
    if (name.includes('region')) return 'carrier--region';
    return 'carrier--default';
  }
}
