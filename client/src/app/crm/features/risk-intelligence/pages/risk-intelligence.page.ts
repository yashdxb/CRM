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
  protected readonly urgencyFilter = signal<'all' | 'immediate' | 'soon' | 'planned'>('all');
  protected readonly severityFilter = signal<'all' | 'critical' | 'high' | 'medium'>('all');
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
  protected readonly metricCards = computed(() => {
    const summary = this.workspace().summary;
    const total = Math.max(summary.totalOpenRisks, 1);
    const share = (value: number) => Math.min(100, Math.round((value / total) * 100));
    return [
      {
        key: 'total',
        label: 'Open Risks',
        value: summary.totalOpenRisks,
        icon: 'pi pi-shield',
        variant: 'total',
        ringColor: 'cyan',
        ringPercent: 100
      },
      {
        key: 'immediate',
        label: 'Immediate',
        value: summary.immediateRisks,
        icon: 'pi pi-bolt',
        variant: 'immediate',
        ringColor: 'red',
        ringPercent: share(summary.immediateRisks)
      },
      {
        key: 'soon',
        label: 'Soon',
        value: summary.soonRisks,
        icon: 'pi pi-clock',
        variant: 'soon',
        ringColor: 'amber',
        ringPercent: share(summary.soonRisks)
      },
      {
        key: 'stale',
        label: 'Stale Pipeline',
        value: summary.stalePipelineCount,
        icon: 'pi pi-chart-line',
        variant: 'stale',
        ringColor: 'purple',
        ringPercent: share(summary.stalePipelineCount)
      },
      {
        key: 'overdue',
        label: 'Overdue Approvals',
        value: summary.overdueApprovals,
        icon: 'pi pi-inbox',
        variant: 'overdue',
        ringColor: 'rose',
        ringPercent: share(summary.overdueApprovals)
      }
    ];
  });
  protected readonly heroHighlights = computed(() => {
    const summary = this.workspace().summary;
    const total = Math.max(summary.totalOpenRisks, 1);
    const sharePct = (value: number) => Math.min(100, Math.round((value / total) * 100));
    return [
      {
        label: 'Immediate actions',
        value: summary.immediateRisks,
        caption: summary.immediateRisks === 1 ? 'risk needs action now' : 'risks need action now',
        tone: 'danger',
        icon: 'pi pi-bolt',
        share: sharePct(summary.immediateRisks)
      },
      {
        label: 'Pipeline pressure',
        value: summary.stalePipelineCount,
        caption: summary.stalePipelineCount === 1 ? 'stale deal to review' : 'stale deals to review',
        tone: 'warning',
        icon: 'pi pi-chart-line',
        share: sharePct(summary.stalePipelineCount)
      },
      {
        label: 'Approval backlog',
        value: summary.overdueApprovals,
        caption: summary.overdueApprovals === 1 ? 'overdue approval' : 'overdue approvals',
        tone: 'neutral',
        icon: 'pi pi-clock',
        share: sharePct(summary.overdueApprovals)
      }
    ];
  });
  protected readonly systemStatus = computed(() => {
    const summary = this.workspace().summary;
    const critical = summary.immediateRisks + summary.overdueApprovals;
    const watch = summary.soonRisks + summary.stalePipelineCount;

    if (critical >= 5) {
      return {
        tone: 'critical',
        label: 'Action required',
        caption: `${critical} critical signals across immediate risks and overdue approvals.`
      };
    }
    if (critical >= 1 || watch >= 8) {
      return {
        tone: 'watch',
        label: 'Monitor closely',
        caption: `${critical} critical · ${watch} watch-level signals are open.`
      };
    }
    if (summary.totalOpenRisks === 0) {
      return {
        tone: 'normal',
        label: 'All clear',
        caption: 'No open risk signals across the workspace.'
      };
    }
    return {
      tone: 'normal',
      label: 'Operating normally',
      caption: `${summary.totalOpenRisks} open signals being tracked, none critical.`
    };
  });
  protected readonly filteredPriorityQueue = computed(() => {
    const urgency = this.urgencyFilter();
    const severity = this.severityFilter();

    return this.workspace().priorityRisks.filter((item) => {
      const urgencyMatch = urgency === 'all' || (item.urgency ?? '').trim().toLowerCase() === urgency;
      const severityMatch = severity === 'all' || this.riskCardSeverityClass(item) === severity;
      return urgencyMatch && severityMatch;
    });
  });
  protected readonly priorityQueue = computed(() => this.filteredPriorityQueue().slice(0, 5));
  protected readonly focusSignals = computed(() => {
    const selected = this.selectedRisk();
    if (!selected) {
      return [];
    }

    return [
      { label: 'Urgency', value: this.urgencyLabel(selected.urgency), tone: selected.urgency },
      { label: 'Owner', value: selected.owner, tone: 'neutral' },
      { label: 'Source', value: this.humanizeSource(selected.sourceSurface), tone: 'neutral' },
      { label: 'Module', value: selected.affectedModule, tone: 'neutral' }
    ];
  });
  protected readonly moduleBreakdown = computed(() => {
    const counts = new Map<string, number>();
    for (const item of this.workspace().priorityRisks) {
      const key = item.affectedModule?.trim() || 'Unassigned';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const total = Math.max(this.workspace().priorityRisks.length, 1);
    return Array.from(counts.entries())
      .map(([label, count]) => ({
        label,
        count,
        percent: Math.round((count / total) * 100)
      }))
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
      .slice(0, 6);
  });
  protected readonly visibleWatchlist = computed(() => this.workspace().watchlist.slice(0, 3));

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

  protected setUrgencyFilter(filter: 'all' | 'immediate' | 'soon' | 'planned') {
    this.urgencyFilter.set(filter);
  }

  protected setSeverityFilter(filter: 'all' | 'critical' | 'high' | 'medium') {
    this.severityFilter.set(filter);
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

  protected ownerInitials(name: string): string {
    return (name ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || '?';
  }

  protected humanizeSource(source: string | null | undefined): string {
    const value = (source ?? '').trim();
    if (!value) {
      return 'Unattributed';
    }
    const map: Record<string, string> = {
      'assistant-insights': 'Assistant insights',
      'decision-inbox': 'Decision inbox',
      'activity-queue': 'Activity queue',
      'lead-engine': 'Lead engine',
      'opportunity-pulse': 'Opportunity pulse',
      'commission-control': 'Commission control',
      'renewals-radar': 'Renewals radar',
    };
    const key = value.toLowerCase().replace(/[_\s]+/g, '-');
    if (map[key]) {
      return map[key];
    }
    return value
      .replace(/[_\-]+/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  protected evidenceCount(item: RiskGuidanceItem): number {
    return item.evidence?.filter((entry) => !!entry?.trim()).length ?? 0;
  }
}
