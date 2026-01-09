import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-supplier-scorecards',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    ChipModule,
    ProgressBarModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './supplier-scorecards.component.html',
  styleUrls: ['./supplier-scorecards.component.scss']
})
export class SupplierScorecardsComponent {
  readonly summary = [
    { label: 'Overall Score', value: '82', delta: '+4', trend: 'up' as const },
    { label: 'On-Time Delivery', value: '91%', delta: '+2%', trend: 'up' as const },
    { label: 'Quality Rating', value: '86%', delta: '-1%', trend: 'down' as const },
    { label: 'Innovation', value: '74%', delta: '+6%', trend: 'up' as const }
  ];

  readonly pulse = [
    { label: 'Preferred Mix', value: '62%', helper: 'Of evaluated suppliers', tone: 'info' as const },
    { label: 'At Risk', value: '3', helper: 'Require escalation or coaching', tone: 'warn' as const }
  ];

  readonly rows: Array<{
    supplier: string;
    category: string;
    spendShare: number;
    quality: number;
    delivery: number;
    responsiveness: number;
    innovation: number;
    overall: number;
    status: 'Preferred' | 'Stable' | 'Watch';
    tags: string[];
  }> = [
    {
      supplier: 'Atlas Components',
      category: 'Electronics',
      spendShare: 28,
      quality: 92,
      delivery: 88,
      responsiveness: 84,
      innovation: 78,
      overall: 86,
      status: 'Preferred',
      tags: ['Strategic', 'Tier 1']
    },
    {
      supplier: 'Nordic Metals',
      category: 'Raw Materials',
      spendShare: 18,
      quality: 79,
      delivery: 72,
      responsiveness: 70,
      innovation: 64,
      overall: 72,
      status: 'Watch',
      tags: ['Cost Focus', 'Tier 2']
    },
    {
      supplier: 'Summit Packaging',
      category: 'Packaging',
      spendShare: 14,
      quality: 86,
      delivery: 90,
      responsiveness: 82,
      innovation: 75,
      overall: 83,
      status: 'Stable',
      tags: ['Growth', 'Regional']
    }
  ];

  tagSeverity(status: string): 'success' | 'info' | 'warn' {
    switch (status) {
      case 'Preferred':
        return 'success';
      case 'Watch':
        return 'warn';
      default:
        return 'info';
    }
  }

  // Helper methods for hero stats
  getAverageOverall(): number {
    if (this.rows.length === 0) return 0;
    return Math.round(this.rows.reduce((sum, row) => sum + row.overall, 0) / this.rows.length);
  }

  getPreferredCount(): number {
    return this.rows.filter(row => row.status === 'Preferred').length;
  }

  getWatchCount(): number {
    return this.rows.filter(row => row.status === 'Watch').length;
  }

  // Helper methods for metric icons
  getMetricIcon(label: string): string {
    switch (label) {
      case 'Overall Score': return 'pi-chart-pie';
      case 'On-Time Delivery': return 'pi-truck';
      case 'Quality Rating': return 'pi-verified';
      case 'Innovation': return 'pi-lightbulb';
      default: return 'pi-chart-bar';
    }
  }

  // Helper methods for table cells
  getAvatarClass(status: string): string {
    switch (status) {
      case 'Preferred': return 'avatar--preferred';
      case 'Watch': return 'avatar--watch';
      default: return 'avatar--stable';
    }
  }

  getScoreClass(score: number): string {
    if (score >= 85) return 'score--excellent';
    if (score >= 75) return 'score--good';
    if (score >= 65) return 'score--average';
    return 'score--poor';
  }

  getOverallRingClass(overall: number): string {
    if (overall >= 85) return 'ring--excellent';
    if (overall >= 75) return 'ring--good';
    if (overall >= 65) return 'ring--average';
    return 'ring--poor';
  }
}
