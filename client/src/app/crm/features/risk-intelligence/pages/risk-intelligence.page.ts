import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { RiskGuidanceItem, RiskIntelligenceWorkspace, RiskWatchlistItem } from '../models/risk-intelligence.model';
import { RiskIntelligenceDataService } from '../services/risk-intelligence-data.service';

@Component({
  selector: 'app-risk-intelligence-page',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    ButtonModule,
    CardModule,
    ChipModule,
    SkeletonModule,
    TableModule,
    TagModule
  ],
  templateUrl: './risk-intelligence.page.html',
  styleUrl: './risk-intelligence.page.scss'
})
export class RiskIntelligencePage {
  private readonly dataService = inject(RiskIntelligenceDataService);
  private readonly router = inject(Router);

  protected readonly loading = signal(true);
  protected readonly workspace = signal<RiskIntelligenceWorkspace>({
    summary: {
      totalOpenRisks: 0,
      immediateRisks: 0,
      soonRisks: 0,
      stalePipelineCount: 0,
      overdueApprovals: 0
    },
    priorityRisks: [],
    watchlist: [],
    generatedAtUtc: new Date().toISOString()
  });
  protected readonly selectedRiskId = signal<string | null>(null);
  protected readonly selectedRisk = computed(() => {
    const selectedId = this.selectedRiskId();
    const risks = this.workspace().priorityRisks;
    return risks.find((item) => item.id === selectedId) ?? risks[0] ?? null;
  });
  protected readonly summaryCards = computed(() => {
    const summary = this.workspace().summary;
    return [
      { label: 'Open Risks', value: summary.totalOpenRisks, tone: 'neutral', icon: 'pi pi-shield' },
      { label: 'Immediate', value: summary.immediateRisks, tone: 'danger', icon: 'pi pi-bolt' },
      { label: 'Soon', value: summary.soonRisks, tone: 'warning', icon: 'pi pi-clock' },
      { label: 'Stale Pipeline', value: summary.stalePipelineCount, tone: 'warning', icon: 'pi pi-chart-line' },
      { label: 'Overdue Approvals', value: summary.overdueApprovals, tone: 'danger', icon: 'pi pi-inbox' }
    ];
  });

  constructor() {
    this.loadWorkspace();
  }

  protected loadWorkspace() {
    this.loading.set(true);
    this.dataService.getWorkspace().subscribe((workspace) => {
      this.workspace.set(workspace);
      const currentSelection = this.selectedRiskId();
      if (!currentSelection || !workspace.priorityRisks.some((item) => item.id === currentSelection)) {
        this.selectedRiskId.set(workspace.priorityRisks[0]?.id ?? null);
      }
      this.loading.set(false);
    });
  }

  protected selectRisk(item: RiskGuidanceItem) {
    this.selectedRiskId.set(item.id);
  }

  protected openRisk(item: RiskGuidanceItem | RiskWatchlistItem) {
    const route = 'drillRoute' in item ? item.drillRoute : item.route;
    if (!route) {
      return;
    }

    void this.router.navigateByUrl(route);
  }

  protected urgencySeverity(urgency: string): 'secondary' | 'warn' | 'danger' {
    switch ((urgency ?? '').trim().toLowerCase()) {
      case 'immediate':
        return 'danger';
      case 'soon':
        return 'warn';
      default:
        return 'secondary';
    }
  }

  protected urgencyLabel(urgency: string): string {
    switch ((urgency ?? '').trim().toLowerCase()) {
      case 'immediate':
        return 'Immediate';
      case 'soon':
        return 'Soon';
      default:
        return 'Planned';
    }
  }

  protected watchlistSeverity(severity: string): 'danger' | 'warn' | 'info' | 'secondary' {
    switch ((severity ?? '').trim().toLowerCase()) {
      case 'critical':
      case 'high':
        return 'danger';
      case 'medium':
      case 'warn':
        return 'warn';
      case 'info':
        return 'info';
      default:
        return 'secondary';
    }
  }

  protected scoreClass(score: number): string {
    if (score >= 80) {
      return 'score-badge score-badge--danger';
    }
    if (score >= 60) {
      return 'score-badge score-badge--warn';
    }
    return 'score-badge score-badge--neutral';
  }
}
