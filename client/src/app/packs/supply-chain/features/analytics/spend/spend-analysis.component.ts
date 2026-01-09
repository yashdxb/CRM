import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

interface CategorySpend {
  category: string;
  spend: number;
  percent: number;
  change: number;
  suppliers: number;
  status: 'Expanding' | 'Stable' | 'Reducing';
}

interface Opportunity {
  title: string;
  impact: string;
  owner: string;
  due: string;
  status: 'Planned' | 'In flight' | 'Completed';
  tags: string[];
}

@Component({
  selector: 'app-spend-analysis',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ChipModule,
    ButtonModule,
    TagModule,
    ProgressBarModule,
    BreadcrumbsComponent
  ],
  templateUrl: './spend-analysis.component.html',
  styleUrls: ['./spend-analysis.component.scss']
})
export class SpendAnalysisComponent {
  readonly categories = signal<CategorySpend[]>([
    { category: 'Electronics', spend: 6.4, percent: 32, change: 5, suppliers: 18, status: 'Expanding' },
    { category: 'Machined Components', spend: 4.2, percent: 21, change: -2, suppliers: 12, status: 'Reducing' },
    { category: 'Packaging', spend: 2.1, percent: 10, change: 1, suppliers: 9, status: 'Stable' },
    { category: 'Logistics', spend: 3.5, percent: 17, change: 4, suppliers: 6, status: 'Expanding' },
    { category: 'Indirect MRO', spend: 1.8, percent: 9, change: -3, suppliers: 25, status: 'Reducing' }
  ]);

  readonly opportunities = signal<Opportunity[]>([
    {
      title: 'Consolidate packaging suppliers',
      impact: 'Est. $420K annual savings',
      owner: 'Strategic Sourcing',
      due: 'Due in 3 weeks',
      status: 'In flight',
      tags: ['Packaging', 'Dual-source']
    },
    {
      title: 'Launch electronics should-cost review',
      impact: '5% reduction targeted',
      owner: 'Category Manager – Electronics',
      due: 'Kickoff next week',
      status: 'Planned',
      tags: ['Electronics', 'Should-cost']
    },
    {
      title: 'Freight contract re-bid',
      impact: 'Network optimization & carrier mix',
      owner: 'Logistics',
      due: 'Completed',
      status: 'Completed',
      tags: ['Logistics', 'Network']
    }
  ]);

  readonly totalSpend = computed(() =>
    this.categories().reduce((sum, category) => sum + category.spend, 0)
  );

  readonly expandingCount = computed(() =>
    this.categories().filter(category => category.status === 'Expanding').length
  );

  statusSeverity(status: CategorySpend['status']): 'success' | 'info' | 'warn' {
    switch (status) {
      case 'Expanding':
        return 'warn';
      case 'Reducing':
        return 'success';
      default:
        return 'info';
    }
  }

  opportunitySeverity(status: Opportunity['status']): 'success' | 'info' | 'warn' {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Planned':
        return 'info';
      default:
        return 'warn';
    }
  }
}
