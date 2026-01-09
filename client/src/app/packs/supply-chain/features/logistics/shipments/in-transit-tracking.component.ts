import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface TransitShipment {
  trackingId: string;
  carrier: string;
  origin: string;
  destination: string;
  eta: string;
  departure: string;
  milestone: 'In transit' | 'Customs hold' | 'Out for delivery' | 'Delayed';
  progress: number;
  status: 'On schedule' | 'At risk' | 'Delayed';
  tags: string[];
}

interface LaneSummary {
  lane: string;
  departures: number;
  onTime: number;
  delayed: number;
  trend: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-in-transit-tracking',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    ProgressBarModule,
    CardModule,
    SelectModule,
    InputTextModule,
    BreadcrumbsComponent
  ],
  templateUrl: './in-transit-tracking.component.html',
  styleUrls: ['./in-transit-tracking.component.scss']
})
export class InTransitTrackingComponent {
  readonly shipments = signal<TransitShipment[]>([
    {
      trackingId: 'VL-2025-1942',
      carrier: 'Maersk Ocean',
      origin: 'Shanghai, CN',
      destination: 'Los Angeles, US',
      departure: 'Oct 10, 2025',
      eta: 'Nov 2, 2025',
      milestone: 'In transit',
      progress: 62,
      status: 'On schedule',
      tags: ['Critical components', 'Temp control']
    },
    {
      trackingId: 'FT-5588-092',
      carrier: 'FlexTrack Air',
      origin: 'Frankfurt, DE',
      destination: 'Chicago, US',
      departure: 'Oct 25, 2025',
      eta: 'Oct 29, 2025',
      milestone: 'Out for delivery',
      progress: 92,
      status: 'On schedule',
      tags: ['Expedite', 'Production line B']
    },
    {
      trackingId: 'RAIL-4431-88',
      carrier: 'EuroRail Logistics',
      origin: 'Rotterdam, NL',
      destination: 'Warsaw, PL',
      departure: 'Oct 20, 2025',
      eta: 'Oct 27, 2025',
      milestone: 'Customs hold',
      progress: 48,
      status: 'At risk',
      tags: ['Customs docs', 'High value']
    },
    {
      trackingId: 'TRK-9081-15',
      carrier: 'QuickRoute Trucking',
      origin: 'Dallas, US',
      destination: 'Monterrey, MX',
      departure: 'Oct 24, 2025',
      eta: 'Oct 28, 2025',
      milestone: 'In transit',
      progress: 70,
      status: 'On schedule',
      tags: ['JIT replenishment']
    },
    {
      trackingId: 'AIR-XL-3301',
      carrier: 'SkyLink Cargo',
      origin: 'Seoul, KR',
      destination: 'Seattle, US',
      departure: 'Oct 22, 2025',
      eta: 'Oct 27, 2025',
      milestone: 'Delayed',
      progress: 55,
      status: 'Delayed',
      tags: ['Weather', 'Escalation']
    }
  ]);

  readonly laneSummaries = signal<LaneSummary[]>([
    { lane: 'Asia → US West', departures: 42, onTime: 36, delayed: 6, trend: 'up' },
    { lane: 'EU → US Midwest', departures: 32, onTime: 24, delayed: 8, trend: 'down' },
    { lane: 'US Domestic', departures: 58, onTime: 50, delayed: 8, trend: 'up' },
    { lane: 'EU → APAC', departures: 18, onTime: 12, delayed: 6, trend: 'flat' }
  ]);

  readonly atRiskCount = computed(
    () => this.shipments().filter(shipment => shipment.status !== 'On schedule').length
  );

  readonly onTimeRatio = computed(() => {
    const total = this.shipments().length || 1;
    const onTime = this.shipments().filter(shipment => shipment.status === 'On schedule').length;
    return Math.round((onTime / total) * 100);
  });

  readonly laneOptions = computed(() =>
    this.laneSummaries().map(lane => ({ label: lane.lane, value: lane.lane }))
  );

  severity(status: TransitShipment['status']): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'On schedule':
        return 'success';
      case 'At risk':
        return 'warn';
      default:
        return 'danger';
    }
  }

  trendClass(trend: LaneSummary['trend']): string {
    switch (trend) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      default:
        return 'trend-flat';
    }
  }
}
