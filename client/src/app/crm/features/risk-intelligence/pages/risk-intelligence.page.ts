import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

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
    ChipModule,
    SkeletonModule,
    TagModule,
    TableModule
  ],
  templateUrl: './risk-intelligence.page.html',
  styleUrls: ['./risk-intelligence.page.scss']
})
export class RiskIntelligencePage {
  private readonly dataService = inject(RiskIntelligenceDataService);
  private readonly router = inject(Router);
  private loadRequestId = 0;

  protected readonly loading = signal(true);
  protected readonly loadError = signal<string | null>(null);
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
  protected readonly heroHighlights = computed(() => {
    const summary = this.workspace().summary;
    return [
      {
        label: 'Immediate actions',
        value: summary.immediateRisks,
        caption: summary.immediateRisks === 1 ? 'risk needs action now' : 'risks need action now',
        tone: 'danger'
      },
      {
        label: 'Pipeline pressure',
        value: summary.stalePipelineCount,
        caption: summary.stalePipelineCount === 1 ? 'stale deal to review' : 'stale deals to review',
        tone: 'warning'
      },
      {
        label: 'Approval backlog',
        value: summary.overdueApprovals,
        caption: summary.overdueApprovals === 1 ? 'overdue approval' : 'overdue approvals',
        tone: 'neutral'
      }
    ];
  });
  protected readonly priorityQueue = computed(() => this.workspace().priorityRisks.slice(0, 5));
  protected readonly riskPanelSummary = computed(() => {
    const summary = this.workspace().summary;
    return [
      { label: 'Immediate', count: summary.immediateRisks, severity: 'critical' },
      { label: 'Soon', count: summary.soonRisks, severity: 'high' },
      { label: 'Overdue approvals', count: summary.overdueApprovals, severity: 'medium' },
      { label: 'Open risks', count: summary.totalOpenRisks, severity: 'info' }
    ].filter((item) => item.count > 0);
  });
  protected readonly focusSignals = computed(() => {
    const selected = this.selectedRisk();
    if (!selected) {
      return [];
    }

    return [
      { label: 'Urgency', value: this.urgencyLabel(selected.urgency), tone: selected.urgency },
      { label: 'Owner', value: selected.owner, tone: 'neutral' },
      { label: 'Source', value: selected.sourceSurface, tone: 'neutral' },
      { label: 'Module', value: selected.affectedModule, tone: 'neutral' }
    ];
  });

  constructor() {
    this.loadWorkspace();
  }

  protected loadWorkspace() {
    const requestId = ++this.loadRequestId;
    this.loading.set(true);
    this.loadError.set(null);
    this.dataService.getWorkspace().subscribe({
      next: (workspace) => {
        if (requestId !== this.loadRequestId) {
          return;
        }

        this.workspace.set(workspace);
        const currentSelection = this.selectedRiskId();
        if (!currentSelection || !workspace.priorityRisks.some((item) => item.id === currentSelection)) {
          this.selectedRiskId.set(workspace.priorityRisks[0]?.id ?? null);
        }
        this.loading.set(false);
      },
      error: (error) => {
        if (requestId !== this.loadRequestId) {
          return;
        }

        console.error('Failed to load Risk Intelligence workspace', error);
        this.loading.set(false);
        this.loadError.set('Risk Intelligence could not load on the first attempt. Retry now.');
      }
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

  protected riskTierClass(item: RiskGuidanceItem): string {
    const score = item.score ?? 0;
    const urgency = (item.urgency ?? '').trim().toLowerCase();
    if (score >= 80 || urgency === 'immediate') {
      return 'risk-high';
    }
    if (score >= 60 || urgency === 'soon') {
      return 'risk-medium';
    }
    return 'risk-low';
  }

  protected riskCardSeverityClass(item: RiskGuidanceItem): string {
    const tier = this.riskTierClass(item);
    switch (tier) {
      case 'risk-high':
        return 'critical';
      case 'risk-medium':
        return 'high';
      default:
        return 'medium';
    }
  }

  protected riskCardSeverityLabel(item: RiskGuidanceItem): string {
    const severity = this.riskCardSeverityClass(item);
    switch (severity) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Watch';
      default:
        return 'Info';
    }
  }

  protected riskCountLabel(item: RiskGuidanceItem): string {
    return `Score ${item.score} · ${item.affectedModule}`;
  }

  protected riskSeverityIcon(item: RiskGuidanceItem): string {
    switch (this.riskCardSeverityClass(item)) {
      case 'critical':
        return 'pi pi-exclamation-circle';
      case 'high':
        return 'pi pi-exclamation-triangle';
      default:
        return 'pi pi-eye';
    }
  }

  protected urgencyIcon(urgency: string): string {
    switch ((urgency ?? '').trim().toLowerCase()) {
      case 'immediate':
        return 'pi pi-bolt';
      case 'soon':
        return 'pi pi-clock';
      default:
        return 'pi pi-calendar';
    }
  }

  protected impactLabel(score: number): string {
    if (score >= 80) {
      return 'HIGH IMPACT';
    }
    if (score >= 60) {
      return 'MEDIUM IMPACT';
    }
    return 'LOW IMPACT';
  }

  protected impactUrgencyLabel(item: RiskGuidanceItem): string {
    return `${this.impactLabel(item.score)}, ${this.urgencyLabel(item.urgency).toUpperCase()} URGENCY`;
  }

  protected queueReason(item: RiskGuidanceItem): string {
    return item.evidence?.[0] || item.reasonSummary;
  }

  protected queueSummary(item: RiskGuidanceItem): string {
    return `${item.entityLabel} · ${item.reasonSummary}`;
  }

  protected dueWindowLabel(urgency: string): string {
    switch ((urgency ?? '').trim().toLowerCase()) {
      case 'immediate':
        return 'Now';
      case 'soon':
        return '24 hours';
      default:
        return 'Planned';
    }
  }

  protected ctaLabel(item: RiskGuidanceItem): string {
    return this.riskTierClass(item) === 'risk-low' ? 'Open' : 'Review';
  }

  protected ctaIcon(item: RiskGuidanceItem): string {
    return this.riskTierClass(item) === 'risk-low' ? 'pi pi-arrow-right' : 'pi pi-search';
  }

  protected generatedAtLabel(timestamp: string): string {
    const generated = new Date(timestamp);
    const now = Date.now();
    const diffMinutes = Math.max(0, Math.round((now - generated.getTime()) / 60000));

    if (diffMinutes < 1) {
      return 'Updated just now';
    }
    if (diffMinutes === 1) {
      return 'Updated 1 minute ago';
    }
    if (diffMinutes < 60) {
      return `Updated ${diffMinutes} minutes ago`;
    }

    return `Updated ${generated.toLocaleString()}`;
  }

  protected focusSignalToneClass(tone: string): string {
    const normalized = (tone ?? '').trim().toLowerCase();
    if (normalized === 'immediate' || normalized === 'danger') {
      return 'focus-pill focus-pill--danger';
    }
    if (normalized === 'soon' || normalized === 'warning' || normalized === 'warn') {
      return 'focus-pill focus-pill--warning';
    }
    return 'focus-pill focus-pill--neutral';
  }
}
