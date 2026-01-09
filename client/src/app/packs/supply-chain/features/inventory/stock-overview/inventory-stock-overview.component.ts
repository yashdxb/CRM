import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
}

interface WarehouseSnapshot {
  name: string;
  region: string;
  coverageDays: number;
  inventoryValue: number;
  skuCount: number;
  health: 'Healthy' | 'Watch' | 'Critical';
  fillRate: number;
  trend: 'up' | 'down' | 'flat';
}

interface RiskItem {
  sku: string;
  product: string;
  supplier: string;
  risk: 'Stockout risk' | 'Slow mover' | 'Obsolete';
  action: string;
  eta: string;
}

interface ReplenishmentItem {
  reference: string;
  warehouse: string;
  supplier: string;
  status: 'Awaiting approval' | 'In transit' | 'Planned';
  arrival: string;
  lines: number;
}

@Component({
  selector: 'app-inventory-stock-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TagModule,
    TableModule,
    ChipModule,
    SelectModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './inventory-stock-overview.component.html',
  styleUrls: ['./inventory-stock-overview.component.scss']
})
export class InventoryStockOverviewComponent {
  readonly metrics = signal<Metric[]>([
    {
      label: 'Total on-hand value',
      value: '$18.4M',
      delta: '+3.2% vs last month',
      trend: 'up'
    },
    {
      label: 'SKUs under safety stock',
      value: '42',
      delta: '-6 vs last week',
      trend: 'down'
    },
    {
      label: 'Average days of cover',
      value: '27',
      delta: '+2 days vs target',
      trend: 'up'
    },
    {
      label: 'Open replenishments',
      value: '18',
      delta: '7 awaiting confirmation',
      trend: 'flat'
    }
  ]);

  readonly regions = [
    { label: 'All regions', value: 'All' },
    { label: 'North America', value: 'North America' },
    { label: 'Europe', value: 'Europe' },
    { label: 'APAC', value: 'APAC' }
  ];

  private readonly selectedRegion = signal('All');

  get selectedRegionValue(): string {
    return this.selectedRegion();
  }

  set selectedRegionValue(value: string) {
    this.selectedRegion.set(value);
  }

  private readonly warehouseData = signal<WarehouseSnapshot[]>([
    {
      name: 'Chicago DC',
      region: 'North America',
      coverageDays: 31,
      inventoryValue: 5.4,
      skuCount: 1240,
      health: 'Healthy',
      fillRate: 97,
      trend: 'up'
    },
    {
      name: 'Dallas Crossdock',
      region: 'North America',
      coverageDays: 19,
      inventoryValue: 2.7,
      skuCount: 840,
      health: 'Watch',
      fillRate: 89,
      trend: 'down'
    },
    {
      name: 'Rotterdam DC',
      region: 'Europe',
      coverageDays: 23,
      inventoryValue: 3.3,
      skuCount: 920,
      health: 'Healthy',
      fillRate: 93,
      trend: 'flat'
    },
    {
      name: 'Munich Hub',
      region: 'Europe',
      coverageDays: 14,
      inventoryValue: 1.8,
      skuCount: 610,
      health: 'Critical',
      fillRate: 82,
      trend: 'down'
    },
    {
      name: 'Shenzhen Hub',
      region: 'APAC',
      coverageDays: 35,
      inventoryValue: 3.9,
      skuCount: 1050,
      health: 'Healthy',
      fillRate: 98,
      trend: 'up'
    }
  ]);

  readonly risks = signal<RiskItem[]>([
    {
      sku: 'MCU-X5-128',
      product: 'MCU Series X5 · 128MB',
      supplier: 'Innovatek',
      risk: 'Stockout risk',
      action: 'Expedite PO 45001289',
      eta: '3 days'
    },
    {
      sku: 'CW-12-200',
      product: 'Copper Wire 12 AWG',
      supplier: 'GlobalMetals',
      risk: 'Stockout risk',
      action: 'Rebalance from Rotterdam',
      eta: '5 days'
    },
    {
      sku: 'PK-PF-004',
      product: 'Polyfoam Packaging',
      supplier: 'BlueRibbon Logistics',
      risk: 'Slow mover',
      action: 'Reclassify to VMI program',
      eta: 'Review'
    }
  ]);

  readonly replenishments = signal<ReplenishmentItem[]>([
    {
      reference: 'RPL-1078',
      warehouse: 'Munich Hub',
      supplier: 'Vertex Industrial',
      status: 'Awaiting approval',
      arrival: 'ETA 08 Nov',
      lines: 12
    },
    {
      reference: 'RPL-1081',
      warehouse: 'Dallas Crossdock',
      supplier: 'Nexis Electronics',
      status: 'In transit',
      arrival: 'ETA 04 Nov',
      lines: 9
    },
    {
      reference: 'RPL-1083',
      warehouse: 'Chicago DC',
      supplier: 'CoreChem',
      status: 'Planned',
      arrival: 'ETA 12 Nov',
      lines: 7
    }
  ]);

  readonly filteredWarehouses = computed(() => {
    const region = this.selectedRegion();
    const data = this.warehouseData();
    if (region === 'All') {
      return data;
    }
    return data.filter(item => item.region === region);
  });

  readonly totalInventoryValue = computed(() => {
    return this.filteredWarehouses()
      .reduce((sum, snapshot) => sum + snapshot.inventoryValue, 0)
      .toFixed(1);
  });

  severity(health: WarehouseSnapshot['health']): 'success' | 'info' | 'warn' | 'danger' {
    switch (health) {
      case 'Healthy':
        return 'success';
      case 'Watch':
        return 'warn';
      case 'Critical':
        return 'danger';
      default:
        return 'info';
    }
  }
}
