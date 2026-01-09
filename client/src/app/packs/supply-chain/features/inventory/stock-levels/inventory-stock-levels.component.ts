import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface StockLevelRow {
  sku: string;
  product: string;
  category: string;
  supplier: string;
  warehouse: string;
  current: number;
  safety: number;
  reorder: number;
  daysCover: number;
  onOrder: number;
  status: 'Healthy' | 'Watch' | 'Critical';
  tags: string[];
}

@Component({
  selector: 'app-inventory-stock-levels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ChipModule,
    SelectModule,
    ProgressBarModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    BreadcrumbsComponent
  ],
  templateUrl: './inventory-stock-levels.component.html',
  styleUrls: ['./inventory-stock-levels.component.scss']
})
export class InventoryStockLevelsComponent {
  private readonly rows = signal<StockLevelRow[]>([
    {
      sku: 'MCU-X5-128',
      product: 'MCU Series X5 · 128MB',
      category: 'Electronics',
      supplier: 'Innovatek',
      warehouse: 'Chicago DC',
      current: 1820,
      safety: 1600,
      reorder: 1500,
      daysCover: 32,
      onOrder: 400,
      status: 'Healthy',
      tags: ['High runner', 'Strategic']
    },
    {
      sku: 'PB-M12-001',
      product: 'Precision Bolt M12',
      category: 'Mechanical',
      supplier: 'Vertex Industrial',
      warehouse: 'Munich Hub',
      current: 520,
      safety: 680,
      reorder: 600,
      daysCover: 14,
      onOrder: 280,
      status: 'Watch',
      tags: ['Spot buy', 'Production-critical']
    },
    {
      sku: 'CW-12-200',
      product: 'Copper Wire 12 AWG',
      category: 'Raw Materials',
      supplier: 'GlobalMetals',
      warehouse: 'Dallas Crossdock',
      current: 420,
      safety: 620,
      reorder: 580,
      daysCover: 9,
      onOrder: 0,
      status: 'Critical',
      tags: ['Commodity', 'Escalated']
    },
    {
      sku: 'PK-PF-004',
      product: 'Polyfoam Packaging',
      category: 'Packaging',
      supplier: 'BlueRibbon Logistics',
      warehouse: 'Rotterdam DC',
      current: 690,
      safety: 540,
      reorder: 520,
      daysCover: 21,
      onOrder: 180,
      status: 'Healthy',
      tags: ['Seasonal', 'Sustainability']
    },
    {
      sku: 'SA-300-07',
      product: 'Sensor Assembly SA-300',
      category: 'Electronics',
      supplier: 'Nexis Electronics',
      warehouse: 'Shenzhen Hub',
      current: 240,
      safety: 360,
      reorder: 320,
      daysCover: 11,
      onOrder: 500,
      status: 'Watch',
      tags: ['Customer escalation', 'Expedite in progress']
    }
  ]);

  readonly filterOptions = {
    status: [
      { label: 'All statuses', value: 'All' },
      { label: 'Healthy', value: 'Healthy' },
      { label: 'Watch', value: 'Watch' },
      { label: 'Critical', value: 'Critical' }
    ],
    category: [
      { label: 'All categories', value: 'All' },
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Mechanical', value: 'Mechanical' },
      { label: 'Raw Materials', value: 'Raw Materials' },
      { label: 'Packaging', value: 'Packaging' }
    ],
    warehouse: [
      { label: 'All warehouses', value: 'All' },
      { label: 'Chicago DC', value: 'Chicago DC' },
      { label: 'Munich Hub', value: 'Munich Hub' },
      { label: 'Dallas Crossdock', value: 'Dallas Crossdock' },
      { label: 'Rotterdam DC', value: 'Rotterdam DC' },
      { label: 'Shenzhen Hub', value: 'Shenzhen Hub' }
    ]
  };

  readonly search = signal('');
  readonly selectedStatus = signal('All');
  readonly selectedCategory = signal('All');
  readonly selectedWarehouse = signal('All');

  get searchValue(): string {
    return this.search();
  }

  set searchValue(value: string) {
    this.search.set(value);
  }

  get selectedStatusValue(): string {
    return this.selectedStatus();
  }

  set selectedStatusValue(value: string) {
    this.selectedStatus.set(value);
  }

  get selectedCategoryValue(): string {
    return this.selectedCategory();
  }

  set selectedCategoryValue(value: string) {
    this.selectedCategory.set(value);
  }

  get selectedWarehouseValue(): string {
    return this.selectedWarehouse();
  }

  set selectedWarehouseValue(value: string) {
    this.selectedWarehouse.set(value);
  }

  readonly filteredRows = computed(() => {
    const term = this.search().toLowerCase();
    const status = this.selectedStatus();
    const category = this.selectedCategory();
    const warehouse = this.selectedWarehouse();

    return this.rows().filter(row => {
      const matchesTerm =
        term.length === 0 ||
        row.product.toLowerCase().includes(term) ||
        row.sku.toLowerCase().includes(term) ||
        row.supplier.toLowerCase().includes(term);

      const matchesStatus = status === 'All' || row.status === status;
      const matchesCategory = category === 'All' || row.category === category;
      const matchesWarehouse = warehouse === 'All' || row.warehouse === warehouse;

      return matchesTerm && matchesStatus && matchesCategory && matchesWarehouse;
    });
  });

  readonly criticalCount = computed(
    () => this.rows().filter(row => row.status === 'Critical').length
  );

  readonly watchCount = computed(
    () => this.rows().filter(row => row.status === 'Watch').length
  );

  stockProgress(row: StockLevelRow): number {
    return Math.min(100, Math.round((row.current / row.safety) * 100));
  }

  severity(status: StockLevelRow['status']): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Healthy':
        return 'success';
      case 'Watch':
        return 'warn';
      case 'Critical':
        return 'danger';
      default:
        return 'success';
    }
  }
}
