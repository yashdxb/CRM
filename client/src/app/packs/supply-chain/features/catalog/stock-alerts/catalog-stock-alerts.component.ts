import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

// Define the StockAlert interface
// This is just an example, you can define your own interface based on your requirements
interface StockAlert {
  product: string;
  sku: string;
  supplier: string;
  location: string;
  category: string;
  currentStock: number;
  safetyStock: number;
  reorderPoint: number;
  status: 'Critical' | 'Warning' | 'Healthy';
  daysCover: number;
  lastUpdated: string;
  tags: string[];
}

interface SummaryMetric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
  severity: 'danger' | 'warn' | 'info';
}

@Component({
  selector: 'app-catalog-stock-alerts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ChipModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './catalog-stock-alerts.component.html',
  styleUrls: ['./catalog-stock-alerts.component.scss']
})
export class CatalogStockAlertsComponent {
  private readonly alertsSignal = signal<StockAlert[]>([
    {
      product: 'Precision Bolt M12',
      sku: 'PB-M12-001',
      supplier: 'Vertex Industrial',
      location: 'Chicago DC',
      category: 'Mechanical',
      currentStock: 420,
      safetyStock: 600,
      reorderPoint: 550,
      status: 'Critical',
      daysCover: 7,
      lastUpdated: 'Today · 07:45',
      tags: ['High priority', 'Production line A']
    },
    {
      product: 'MCU Series X5',
      sku: 'MCU-X5-128',
      supplier: 'Innovatek',
      location: 'Shenzhen Hub',
      category: 'Electronics',
      currentStock: 1800,
      safetyStock: 1500,
      reorderPoint: 1400,
      status: 'Healthy',
      daysCover: 28,
      lastUpdated: 'Yesterday · 19:12',
      tags: ['Buffer secured']
    },
    {
      product: 'Polyfoam Packaging',
      sku: 'PK-PF-004',
      supplier: 'BlueRibbon Logistics',
      location: 'Los Angeles DC',
      category: 'Packaging',
      currentStock: 260,
      safetyStock: 320,
      reorderPoint: 300,
      status: 'Warning',
      daysCover: 12,
      lastUpdated: 'Today · 09:05',
      tags: ['Sustainability', 'Seasonal peak']
    },
    {
      product: 'Copper Wire 12 AWG',
      sku: 'CW-12-200',
      supplier: 'GlobalMetals',
      location: 'Houston DC',
      category: 'Raw Materials',
      currentStock: 980,
      safetyStock: 1200,
      reorderPoint: 1000,
      status: 'Warning',
      daysCover: 9,
      lastUpdated: '2 days ago',
      tags: ['Commodity risk']
    },
    {
      product: 'Sensor Assembly SA-300',
      sku: 'SA-300-07',
      supplier: 'Nexis Electronics',
      location: 'Berlin DC',
      category: 'Electronics',
      currentStock: 110,
      safetyStock: 200,
      reorderPoint: 180,
      status: 'Critical',
      daysCover: 5,
      lastUpdated: 'Today · 08:40',
      tags: ['Customer escalation', 'Priority freight']
    }
  ]);

  readonly alerts = computed(() => this.alertsSignal());
  searchTerm = '';
  selectedStatus: 'All' | StockAlert['status'] = 'All';
  selectedCategory: 'All' | string = 'All';
  selectedLocation: 'All' | string = 'All';

  readonly summaryMetrics = computed<SummaryMetric[]>(() => {
    const alerts = this.alerts();
    const critical = alerts.filter(a => a.status === 'Critical').length;
    const warning = alerts.filter(a => a.status === 'Warning').length;
    const healthy = alerts.filter(a => a.status === 'Healthy').length;
    const avgCover =
      alerts.length === 0
        ? 0
        : Math.round(
            alerts.reduce((acc, alert) => acc + alert.daysCover, 0) / alerts.length
          );

    return [
      {
        label: 'Critical alerts',
        value: critical.toString(),
        delta: critical > 0 ? '+ action required' : 'All clear',
        trend: critical > 0 ? 'up' : 'flat',
        severity: 'danger'
      },
      {
        label: 'Warning alerts',
        value: warning.toString(),
        delta: warning > 0 ? `${warning} need monitoring` : 'No warnings',
        trend: warning > 0 ? 'up' : 'flat',
        severity: 'warn'
      },
      {
        label: 'Healthy SKUs',
        value: healthy.toString(),
        delta: `${alerts.length} total tracked`,
        trend: 'flat',
        severity: 'info'
      },
      {
        label: 'Average days cover',
        value: `${avgCover}`,
        delta: avgCover < 10 ? 'Consider replenishment' : 'Within target',
        trend: avgCover < 10 ? 'down' : 'flat',
        severity: avgCover < 10 ? 'danger' : 'info'
      }
    ];
  });

  readonly criticalAlerts = computed(() =>
    this.alerts().filter(alert => alert.status === 'Critical')
  );

  readonly warningAlerts = computed(() =>
    this.alerts().filter(alert => alert.status === 'Warning')
  );

  readonly healthyAlerts = computed(() =>
    this.alerts().filter(alert => alert.status === 'Healthy')
  );

  readonly orderedAlerts = computed(() => [
    ...this.criticalAlerts(),
    ...this.warningAlerts(),
    ...this.healthyAlerts()
  ]);

  readonly statusOptions = [
    { label: 'All Statuses', value: 'All' },
    { label: 'Critical', value: 'Critical' },
    { label: 'Warning', value: 'Warning' },
    { label: 'Healthy', value: 'Healthy' }
  ];

  readonly categoryOptions = [
    { label: 'All Categories', value: 'All' },
    { label: 'Mechanical', value: 'Mechanical' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Packaging', value: 'Packaging' },
    { label: 'Raw Materials', value: 'Raw Materials' }
  ];

  readonly locationOptions = [
    { label: 'All Locations', value: 'All' },
    { label: 'Chicago DC', value: 'Chicago DC' },
    { label: 'Shenzhen Hub', value: 'Shenzhen Hub' },
    { label: 'Los Angeles DC', value: 'Los Angeles DC' },
    { label: 'Houston DC', value: 'Houston DC' },
    { label: 'Berlin DC', value: 'Berlin DC' }
  ];

  get filteredAlerts(): StockAlert[] {
    return this.alerts().filter(alert => {
      const matchesStatus = this.selectedStatus === 'All' || alert.status === this.selectedStatus;
      const matchesCategory = this.selectedCategory === 'All' || alert.category === this.selectedCategory;
      const matchesLocation = this.selectedLocation === 'All' || alert.location === this.selectedLocation;
      const matchesSearch =
        !this.searchTerm ||
        alert.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        alert.supplier.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        alert.sku.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesLocation && matchesSearch;
    });
  }

  severity(status: StockAlert['status']): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Healthy':
        return 'success';
      case 'Warning':
        return 'warn';
      default:
        return 'danger';
    }
  }

  stockProgress(alert: StockAlert): number {
    const ratio = alert.currentStock / alert.safetyStock;
    return Math.min(Math.round(ratio * 100), 120);
  }
}
