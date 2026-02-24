import { CommonModule, DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { DecisionHistoryItem } from '../models/opportunity.model';

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-decision-history-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    DatePipe
  ],
  templateUrl: './decision-history.page.html',
  styleUrl: './decision-history.page.scss'
})
export class DecisionHistoryPage {
  private readonly service = inject(OpportunityApprovalService);
  private readonly toast = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = signal(true);
  protected readonly rows = signal<DecisionHistoryItem[]>([]);
  protected readonly search = signal('');

  protected actionFilter = 'all';
  protected statusFilter = 'all';
  protected decisionTypeFilter = 'all';

  protected readonly actionOptions: FilterOption[] = [
    { label: 'All actions', value: 'all' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Approval SLA Escalated', value: 'ApprovalSlaEscalated' }
  ];

  protected readonly statusOptions: FilterOption[] = [
    { label: 'All statuses', value: 'all' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  protected readonly decisionTypeOptions: FilterOption[] = [
    { label: 'All decision types', value: 'all' },
    { label: 'Discount Approval', value: 'Discount' },
    { label: 'AI Review', value: 'AI' },
    { label: 'Stage Override', value: 'Stage' }
  ];

  protected readonly kpis = computed(() => {
    const all = this.rows();
    return {
      total: all.length,
      escalations: all.filter(r => r.isEscalated || r.action === 'ApprovalSlaEscalated').length,
      approvals: all.filter(r => r.action === 'Approved').length,
      rejections: all.filter(r => r.action === 'Rejected').length
    };
  });

  protected readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.rows().filter(row => {
      if (term) {
        const haystack = [
          row.action,
          row.actorName,
          row.decisionType,
          row.entityType,
          row.entityName,
          row.status,
          row.notes,
          row.policyReason
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(term)) {
          return false;
        }
      }
      return true;
    });
  });

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.service.getDecisionHistory({
      action: this.actionFilter === 'all' ? undefined : this.actionFilter,
      status: this.statusFilter === 'all' ? undefined : this.statusFilter,
      decisionType: this.decisionTypeFilter === 'all' ? undefined : this.decisionTypeFilter,
      take: 250
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: rows => {
        this.rows.set(rows ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load decision history.', 3000);
      }
    });
  }

  protected onSearch(value: string): void {
    this.search.set(value ?? '');
  }

  protected refreshFilters(): void {
    this.load();
  }

  protected openInInbox(row: DecisionHistoryItem): void {
    this.router.navigate(['/app/decisions/inbox'], { queryParams: { selected: row.decisionId } });
  }

  protected actionSeverity(action: string): 'success' | 'danger' | 'warn' | 'info' {
    const normalized = (action || '').toLowerCase();
    if (normalized.includes('approved')) return 'success';
    if (normalized.includes('rejected')) return 'danger';
    if (normalized.includes('escalated')) return 'warn';
    return 'info';
  }

  protected riskSeverity(risk?: string | null): 'success' | 'warn' | 'danger' | 'info' {
    const value = (risk || '').toLowerCase();
    if (value === 'high') return 'danger';
    if (value === 'medium') return 'warn';
    if (value === 'low') return 'success';
    return 'info';
  }
}

