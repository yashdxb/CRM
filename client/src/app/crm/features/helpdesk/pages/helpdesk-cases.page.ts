import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { HelpDeskCase, HelpDeskQueue, HelpDeskSummary } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';

@Component({
  selector: 'app-helpdesk-cases-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, BreadcrumbsComponent],
  templateUrl: './helpdesk-cases.page.html',
  styleUrl: './helpdesk-cases.page.scss'
})
export class HelpDeskCasesPage {
  private readonly data = inject(HelpDeskDataService);
  private readonly toast = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly realtime = inject(CrmEventsService);

  protected readonly loading = signal(false);
  protected readonly bulkSaving = signal(false);
  protected readonly cases = signal<HelpDeskCase[]>([]);
  protected readonly queues = signal<HelpDeskQueue[]>([]);
  protected readonly selectedCases = signal<HelpDeskCase[]>([]);
  protected readonly summary = signal<HelpDeskSummary>({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0, averageCsatScore: null, ratedCaseCount: 0, topClosureReasons: [] });
  protected readonly activeView = signal<'all' | 'my-queue' | 'unassigned' | 'breached'>('all');
  protected readonly bulkStatus = signal<string | null>(null);
  protected readonly bulkQueueId = signal<string | null>(null);
  protected readonly canManage = computed(() =>
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.helpDeskManage)
  );
  protected readonly statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending Customer', value: 'Pending Customer' },
    { label: 'Pending Internal', value: 'Pending Internal' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' }
  ];
  protected readonly priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];
  protected readonly severityOptions = [
    { label: 'S1', value: 'S1' },
    { label: 'S2', value: 'S2' },
    { label: 'S3', value: 'S3' },
    { label: 'S4', value: 'S4' }
  ];
  protected readonly sourceOptions = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Email', value: 'Email' }
  ];
  protected readonly quickViewOptions = [
    { label: 'All Cases', value: 'all' as const },
    { label: 'My Queue', value: 'my-queue' as const },
    { label: 'Unassigned', value: 'unassigned' as const },
    { label: 'Breached SLA', value: 'breached' as const }
  ];
  protected readonly queueOptions = computed(() =>
    Array.from(
      new Map(
        this.cases()
          .filter((row) => !!row.queueName)
          .map((row) => [row.queueName!, { label: row.queueName!, value: row.queueName! }])
      ).values()
    )
  );
  protected readonly bulkQueueOptions = computed(() =>
    this.queues().map((queue) => ({ label: queue.name, value: queue.id }))
  );
  protected readonly topClosureReason = computed(() => this.summary().topClosureReasons?.[0]?.reason ?? '-');
  protected readonly averageCsat = computed(() => this.summary().averageCsatScore ?? null);
  protected readonly viewCases = computed(() => {
    const view = this.activeView();
    const now = Date.now();
    const rows = this.cases();
    switch (view) {
      case 'my-queue':
        return rows.filter((row) => !!row.queueName);
      case 'unassigned':
        return rows.filter((row) => !row.ownerUserId && !row.queueId);
      case 'breached':
        return rows.filter((row) => new Date(row.resolutionDueUtc).getTime() < now && ['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status));
      default:
        return rows;
    }
  });
  protected readonly ownerOptions = computed(() =>
    Array.from(
      new Map(
        this.cases()
          .filter((row) => !!row.ownerUserName)
          .map((row) => [row.ownerUserName!, { label: row.ownerUserName!, value: row.ownerUserName! }])
      ).values()
    )
  );

  constructor() {
    this.load();
    this.loadQueues();
    this.realtime.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.eventType === 'helpdesk.case.changed' || event.eventType === 'helpdesk.case.escalated') {
          this.load();
        }
      });
  }

  protected load() {
    this.loading.set(true);
    this.data.searchCases({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => {
        this.cases.set(res.items ?? []);
        this.selectedCases.set([]);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('error', 'Unable to load help desk cases.');
        this.loading.set(false);
      }
    });

    this.data.getSummary().subscribe({
      next: (summary) => this.summary.set(summary),
      error: () => this.summary.set({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0, averageCsatScore: null, ratedCaseCount: 0, topClosureReasons: [] })
    });
  }

  protected createCase() {
    if (!this.canManage()) {
      this.toast.show('error', 'You need Help Desk Manage permission to create a case.');
      return;
    }

    this.router.navigate(['/app/helpdesk/cases/new']);
  }

  protected openCase(item: HelpDeskCase) {
    this.router.navigate(['/app/helpdesk/cases', item.id]);
  }

  protected onSelectionChange(rows: HelpDeskCase[]) {
    this.selectedCases.set(rows ?? []);
  }

  protected applyQuickView(view: 'all' | 'my-queue' | 'unassigned' | 'breached') {
    this.activeView.set(view);
    this.selectedCases.set([]);
  }

  protected applyBulkStatus() {
    const status = this.bulkStatus();
    const selection = this.selectedCases();
    if (!status || !selection.length) {
      return;
    }

    this.bulkSaving.set(true);
    forkJoin(selection.map((row) => this.data.updateStatus(row.id, status))).subscribe({
      next: () => {
        this.toast.show('success', `Updated status for ${selection.length} case(s).`);
        this.bulkStatus.set(null);
        this.load();
      },
      error: () => {
        this.bulkSaving.set(false);
        this.toast.show('error', 'Unable to update selected cases.');
      }
    });
  }

  protected applyBulkAssignQueue() {
    const queueId = this.bulkQueueId();
    const selection = this.selectedCases();
    if (!queueId || !selection.length) {
      return;
    }

    this.bulkSaving.set(true);
    forkJoin(selection.map((row) => this.data.assignCase(row.id, queueId, row.ownerUserId ?? null))).subscribe({
      next: () => {
        this.toast.show('success', `Assigned queue for ${selection.length} case(s).`);
        this.bulkQueueId.set(null);
        this.load();
      },
      error: () => {
        this.bulkSaving.set(false);
        this.toast.show('error', 'Unable to assign selected cases.');
      }
    });
  }

  protected clearSelection() {
    this.selectedCases.set([]);
  }

  protected getSlaState(row: HelpDeskCase) {
    if (!['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status)) {
      return 'resolved';
    }

    const due = new Date(row.resolutionDueUtc).getTime();
    const now = Date.now();
    if (due < now) {
      return 'breached';
    }

    if (due <= now + 60 * 60 * 1000) {
      return 'at-risk';
    }

    return 'healthy';
  }

  protected formatDueIn(dueUtc: string) {
    const ms = new Date(dueUtc).getTime() - Date.now();
    const absoluteMinutes = Math.round(Math.abs(ms) / 60000);
    const hours = Math.floor(absoluteMinutes / 60);
    const minutes = absoluteMinutes % 60;
    const token = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return ms >= 0 ? `in ${token}` : `${token} overdue`;
  }

  private loadQueues() {
    this.data.listQueues().subscribe({
      next: (queues) => this.queues.set(queues ?? []),
      error: () => this.queues.set([])
    });
  }
}
