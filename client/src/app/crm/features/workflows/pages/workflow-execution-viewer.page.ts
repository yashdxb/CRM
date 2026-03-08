import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { WorkflowExecutionHistoryItem, WorkflowExecutionStatus } from '../models/workflow-definition.model';
import { WorkflowExecutionService } from '../services/workflow-execution.service';

@Component({
  selector: 'app-workflow-execution-viewer-page',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, ButtonModule, BreadcrumbsComponent],
  templateUrl: './workflow-execution-viewer.page.html',
  styleUrl: './workflow-execution-viewer.page.scss'
})
export class WorkflowExecutionViewerPage {
  private readonly service = inject(WorkflowExecutionService);
  private readonly crmEvents = inject(CrmEventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(true);
  protected readonly status = signal<WorkflowExecutionStatus | null>(null);
  protected readonly history = signal<WorkflowExecutionHistoryItem[]>([]);
  protected readonly selectedExecutionId = signal<string | null>(null);
  protected readonly selectedDecisionId = signal<string | null>(null);
  protected readonly selectedDealId = signal<string | null>(null);
  protected readonly selectedHistoryItem = computed(() => {
    const executionId = this.selectedExecutionId();
    if (!executionId) {
      return null;
    }

    return this.history().find((item) => item.executionId === executionId) ?? null;
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.selectedExecutionId.set(params.get('executionId'));
        this.selectedDecisionId.set(params.get('decisionId'));
        this.selectedDealId.set(params.get('dealId'));
      });

    this.crmEvents.connect();
    this.crmEvents.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.eventType.includes('decision') || event.eventType.includes('approval')) {
          this.refresh();
        }
      });

    this.refresh();
  }

  protected refresh() {
    this.loading.set(true);
    this.service.getDealApprovalStatus().subscribe({
      next: (status) => {
        this.status.set(status);
        this.service.getDealApprovalHistory(40).subscribe({
          next: (history) => {
            this.history.set(history);
            this.loading.set(false);
          },
          error: () => {
            this.history.set([]);
            this.loading.set(false);
          }
        });
      },
      error: () => {
        this.loading.set(false);
        this.status.set(null);
      }
    });
  }

  protected isSelected(item: WorkflowExecutionHistoryItem) {
    return item.executionId === this.selectedExecutionId();
  }
}
