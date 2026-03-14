import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

import { OpportunityDataService } from '../services/opportunity-data.service';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  Opportunity,
  OpportunityContactRole,
  OpportunityHealthScore,
  OpportunityStageHistoryItem,
  OpportunityTeamMember
} from '../models/opportunity.model';
import { Activity } from '../../activities/models/activity.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

@Component({
  standalone: true,
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.page.html',
  styleUrls: ['./opportunity-detail.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    SkeletonModule,
    BreadcrumbsComponent
  ]
})
export class OpportunityDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly activityData = inject(ActivityDataService);

  protected opportunity = signal<Opportunity | null>(null);
  protected loading = signal(true);
  protected healthScore = signal<OpportunityHealthScore | null>(null);
  protected healthLoading = signal(false);
  protected stageHistory = signal<OpportunityStageHistoryItem[]>([]);
  protected historyLoading = signal(false);
  protected contactRoles = signal<OpportunityContactRole[]>([]);
  protected contactRolesLoading = signal(false);
  protected teamMembers = signal<OpportunityTeamMember[]>([]);
  protected teamLoading = signal(false);
  protected activities = signal<Activity[]>([]);
  protected activitiesLoading = signal(false);

  protected canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);

  protected dealAgeDays = computed(() => {
    const opp = this.opportunity();
    if (!opp) return 0;
    const diffMs = Date.now() - new Date(opp.createdAtUtc).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
  });

  protected stageDurations = computed(() => {
    const history = this.stageHistory();
    if (!history.length) return [];
    const sorted = [...history].sort((a, b) => new Date(a.changedAtUtc).getTime() - new Date(b.changedAtUtc).getTime());
    const durations: Array<{ stage: string; durationDays: number; isCurrent: boolean }> = [];
    for (let i = 0; i < sorted.length; i++) {
      const enteredAt = new Date(sorted[i].changedAtUtc);
      const exitedAt = i + 1 < sorted.length ? new Date(sorted[i + 1].changedAtUtc) : null;
      const diffMs = (exitedAt ?? new Date()).getTime() - enteredAt.getTime();
      durations.push({
        stage: sorted[i].stage,
        durationDays: Math.max(Math.round(diffMs / 86_400_000), 0),
        isCurrent: !exitedAt
      });
    }
    return durations;
  });

  protected maxStageDays = computed(() => {
    const durations = this.stageDurations();
    if (!durations.length) return 1;
    return Math.max(...durations.map((d) => d.durationDays), 1);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/deals']);
      return;
    }
    this.loadOpportunity(id);
    this.loadHealthScore(id);
    this.loadStageHistory(id);
    this.loadContactRoles(id);
    this.loadTeam(id);
    this.loadActivities(id);
  }

  private loadOpportunity(id: string): void {
    this.loading.set(true);
    this.opportunityData.getById(id).subscribe({
      next: (opp) => {
        this.opportunity.set(opp);
        this.loading.set(false);
      },
      error: () => {
        this.router.navigate(['/app/deals']);
      }
    });
  }

  private loadHealthScore(id: string): void {
    this.healthLoading.set(true);
    this.opportunityData.getHealthScore(id).subscribe({
      next: (hs) => {
        this.healthScore.set(hs);
        this.healthLoading.set(false);
      },
      error: () => {
        this.healthScore.set(null);
        this.healthLoading.set(false);
      }
    });
  }

  private loadStageHistory(id: string): void {
    this.historyLoading.set(true);
    this.opportunityData.getHistory(id).subscribe({
      next: (items) => {
        this.stageHistory.set(items);
        this.historyLoading.set(false);
      },
      error: () => {
        this.stageHistory.set([]);
        this.historyLoading.set(false);
      }
    });
  }

  private loadContactRoles(id: string): void {
    this.contactRolesLoading.set(true);
    this.opportunityData.getContactRoles(id).subscribe({
      next: (roles) => {
        this.contactRoles.set(roles);
        this.contactRolesLoading.set(false);
      },
      error: () => {
        this.contactRoles.set([]);
        this.contactRolesLoading.set(false);
      }
    });
  }

  private loadTeam(id: string): void {
    this.teamLoading.set(true);
    this.opportunityData.getTeam(id).subscribe({
      next: (members) => {
        this.teamMembers.set(members);
        this.teamLoading.set(false);
      },
      error: () => {
        this.teamMembers.set([]);
        this.teamLoading.set(false);
      }
    });
  }

  private loadActivities(id: string): void {
    this.activitiesLoading.set(true);
    this.activityData
      .search({ relatedEntityType: 'Opportunity', relatedEntityId: id, pageSize: 5, page: 1 })
      .subscribe({
        next: (res) => {
          this.activities.set(res.items ?? []);
          this.activitiesLoading.set(false);
        },
        error: () => {
          this.activities.set([]);
          this.activitiesLoading.set(false);
        }
      });
  }

  protected healthScoreColor(score: number): string {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    if (score >= 20) return '#f97316';
    return '#ef4444';
  }

  protected stageBadgeClass(stage: string): string {
    const s = (stage || '').toLowerCase();
    if (s.includes('won')) return 'stage-badge--won';
    if (s.includes('lost')) return 'stage-badge--lost';
    if (s.includes('negot')) return 'stage-badge--negotiation';
    if (s.includes('proposal')) return 'stage-badge--proposal';
    if (s.includes('qualif')) return 'stage-badge--qualification';
    return 'stage-badge--default';
  }

  protected statusClass(status: string): string {
    if (status === 'Open') return 'status--open';
    if (status === 'Closed Won') return 'status--won';
    if (status === 'Closed Lost') return 'status--lost';
    return 'status--default';
  }

  protected formatCurrency(amount: number, currency: string): string {
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `${currency || '$'} ${amount.toLocaleString()}`;
    }
  }

  protected activityIcon(type: string): string {
    const t = (type || '').toLowerCase();
    if (t.includes('call')) return 'pi-phone';
    if (t.includes('email')) return 'pi-envelope';
    if (t.includes('meet')) return 'pi-video';
    if (t.includes('note')) return 'pi-file';
    if (t.includes('task')) return 'pi-check-square';
    return 'pi-clock';
  }
}
