import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface TrendPoint {
  label: string;
  value: number;
}

interface KPI {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
}

interface Opportunity {
  supplier: string;
  focus: string;
  impact: string;
  owner: string;
  status: 'Planned' | 'In progress' | 'Completed';
  tags: string[];
}

@Component({
  selector: 'app-supplier-performance-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ChipModule,
    ButtonModule,
    TableModule,
    TagModule,
    BreadcrumbsComponent
  ],
  templateUrl: './supplier-performance-analytics.component.html',
  styleUrls: ['./supplier-performance-analytics.component.scss']
})
export class SupplierPerformanceAnalyticsComponent {
  readonly kpis = signal<KPI[]>([
    {
      label: 'OTD trend (90d)',
      value: '89.4%',
      delta: '+2.1% vs previous period',
      trend: 'up'
    },
    {
      label: 'PPM (defect rate)',
      value: '320',
      delta: '-60 vs goal',
      trend: 'up'
    },
    {
      label: 'Escalations',
      value: '5 open',
      delta: '-3 week over week',
      trend: 'down'
    },
    {
      label: 'Innovation pipeline',
      value: '14 initiatives',
      delta: '+4 new pilots',
      trend: 'up'
    }
  ]);

  readonly otdTrend = signal<TrendPoint[]>([
    { label: 'Jun', value: 84 },
    { label: 'Jul', value: 86 },
    { label: 'Aug', value: 88 },
    { label: 'Sep', value: 87 },
    { label: 'Oct', value: 89 }
  ]);

  readonly ppmTrend = signal<TrendPoint[]>([
    { label: 'Jun', value: 410 },
    { label: 'Jul', value: 380 },
    { label: 'Aug', value: 360 },
    { label: 'Sep', value: 335 },
    { label: 'Oct', value: 320 }
  ]);

  readonly opportunities = signal<Opportunity[]>([
    {
      supplier: 'Innovatek EMS',
      focus: 'Reduce expedite freight by implementing pull replenishment for EMS line B.',
      impact: 'Est. $420k annual savings',
      owner: 'Logistics & Sourcing',
      status: 'In progress',
      tags: ['Logistics', 'Cost down']
    },
    {
      supplier: 'Nova Metals',
      focus: 'Launch collaborative quality roadmap to cut scrap by 35%.',
      impact: 'PPM to 250, $310k savings',
      owner: 'Quality Engineering',
      status: 'Planned',
      tags: ['Quality', 'Strategic']
    },
    {
      supplier: 'BlueRibbon Logistics',
      focus: 'Stabilize packaging supply with dual-source qualification and buffer stock.',
      impact: 'Avoid 3 line stops/month',
      owner: 'Supply Planning',
      status: 'Completed',
      tags: ['Resilience', 'Packaging']
    }
  ]);

  readonly avgOTD = computed(() => {
    const trend = this.otdTrend();
    if (trend.length === 0) {
      return 0;
    }
    const sum = trend.reduce((acc, point) => acc + point.value, 0);
    return Math.round(sum / trend.length);
  });

  readonly ppmImprovement = computed(() => {
    const trend = this.ppmTrend();
    if (trend.length < 2) {
      return 0;
    }
    const start = trend[0].value;
    const end = trend[trend.length - 1].value;
    return Math.round(((start - end) / start) * 100);
  });

  trendClasses(trend: KPI['trend']): string {
    switch (trend) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      default:
        return 'trend-flat';
    }
  }

  statusSeverity(status: Opportunity['status']): 'info' | 'warn' | 'success' {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In progress':
        return 'warn';
      default:
        return 'info';
    }
  }
}
