import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { Router } from '@angular/router';
import { CsvColumn, exportToCsv } from '../../../../shared/utils/csv';

import { Opportunity, OpportunitySearchRequest, OpportunityStatus } from '../models/opportunity.model';
import { OpportunityDataService } from '../services/opportunity-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';

interface StageOption {
  label: string;
  value: string;
}


@Component({
  selector: 'app-opportunities-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    TagModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    PaginatorModule,
    SkeletonModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './opportunities.page.html',
  styleUrl: './opportunities.page.scss'
})
export class OpportunitiesPage {
  protected readonly stageOptions: StageOption[] = [
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Closed Won', value: 'Closed Won' },
    { label: 'Closed Lost', value: 'Closed Lost' }
  ];
  protected readonly stageOptionsInline = this.stageOptions.filter(
    (stage) => !stage.value.startsWith('Closed')
  );

  protected readonly opportunities = signal<Opportunity[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  private readonly toastService = inject(AppToastService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
  });
  protected readonly metrics = computed(() => {
    const rows = this.opportunities();
    const open = rows.filter((o) => o.status === 'Open').length;
    const closedWon = rows.filter((o) => o.status === 'Closed Won').length;
    const closedLost = rows.filter((o) => o.status === 'Closed Lost').length;
    const pipelineValue = rows
      .filter((o) => o.status === 'Open')
      .reduce((sum, opp) => sum + (opp.amount ?? 0), 0);
    const weightedPipeline = rows
      .filter((o) => o.status === 'Open')
      .reduce((sum, opp) => sum + (opp.amount ?? 0) * ((opp.probability ?? 0) / 100), 0);
    const stalled = rows.filter((o) => this.isStalled(o)).length;
    const avgDeal = rows.length
      ? Math.round(rows.reduce((sum, opp) => sum + (opp.amount ?? 0), 0) / rows.length)
      : 0;

    return {
      total: this.total(),
      open,
      closedWon,
      closedLost,
      pipelineValue,
      weightedPipeline,
      stalled,
      avgDeal
    };
  });

  protected searchTerm = '';
  protected stageFilter: string | 'all' = 'all';
  protected missingNextStepOnly = false;
  protected pageIndex = 0;
  protected rows = 10;
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);

  constructor(
    private readonly opportunityData: OpportunityDataService,
    private readonly router: Router,
    private readonly userAdminData: UserAdminDataService
  ) {
    this.load();
    this.loadOwners();
    this.loadCurrencyContext();
  }

  protected load() {
    this.loading.set(true);
    const stage = this.stageFilter === 'all' ? undefined : this.stageFilter;

    const request: OpportunitySearchRequest = {
      search: this.searchTerm || undefined,
      stage,
      missingNextStep: this.missingNextStepOnly ? true : undefined,
      page: this.pageIndex + 1,
      pageSize: this.rows
    };

    this.opportunityData.search(request).subscribe((res) => {
      this.opportunities.set(res.items);
      this.total.set(res.total);
      this.loading.set(false);
    });
  }

  protected onCreate() {
    this.router.navigate(['/app/opportunities/new']);
  }

  protected onEdit(row: Opportunity) {
    this.router.navigate(['/app/opportunities', row.id, 'edit']);
  }

  protected onDelete(row: Opportunity) {
    const confirmed = confirm(`Delete deal ${row.name}?`);
    if (!confirmed) return;
    this.opportunityData.delete(row.id).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Deal deleted.');
      },
      error: () => this.raiseToast('error', 'Unable to delete deal.')
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  protected onSearch(term: string) {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.load();
  }

  protected onStageChange(stage: string | 'all') {
    this.stageFilter = stage;
    this.pageIndex = 0;
    this.load();
  }

  protected onMissingNextStepToggle() {
    this.missingNextStepOnly = !this.missingNextStepOnly;
    this.pageIndex = 0;
    this.load();
  }

  protected clearFilters() {
    this.stageFilter = 'all';
    this.missingNextStepOnly = false;
    this.pageIndex = 0;
    this.load();
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
  }

  protected onExport() {
    const rows = this.opportunities();
    const columns: CsvColumn<Opportunity>[] = [
      { header: 'Name', value: (row) => row.name },
      { header: 'Account', value: (row) => row.account },
      { header: 'Stage', value: (row) => row.stage },
      { header: 'Amount', value: (row) => row.amount },
      { header: 'Currency', value: (row) => row.currency },
      { header: 'Probability', value: (row) => row.probability },
      { header: 'Close Date', value: (row) => row.closeDate },
      { header: 'Status', value: (row) => row.status },
      { header: 'Owner', value: (row) => row.owner }
    ];
    exportToCsv(rows, columns, 'deals.csv');
  }

  private loadCurrencyContext() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.currencyCode() && this.currencyFallback) {
        this.currencyCode.set(this.currencyFallback);
      }
    });

    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        const resolved = settings.currency || this.currencyFallback;
        if (resolved) {
          this.currencyCode.set(resolved);
        }
      }
    });
  }

  protected resolveCurrencyCode() {
    return this.currencyCode() || this.currencyFallback || '';
  }

  protected onInlineStageChange(row: Opportunity, stage: string) {
    if (!stage || row.stage === stage) {
      return;
    }
    if (!stage.startsWith('Closed') && !row.nextStepDueAtUtc) {
      this.toastService.show('error', 'Next step is required before changing stage. Log an activity with a due date.', 4000);
      return;
    }
    this.opportunityData.updateStage(row.id, stage).subscribe({
      next: () => this.load(),
      error: (err) => {
        const message = err?.error ?? 'Stage update failed. Please try again.';
        this.toastService.show('error', message, 4000);
      }
    });
  }

  protected onInlineOwnerChange(row: Opportunity, ownerId: string) {
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.opportunityData.updateOwner(row.id, ownerId).subscribe({
      next: () => this.load(),
      error: () => {
        alert('Owner update failed. Please try again.');
      }
    });
  }

  protected statusSeverity(status: OpportunityStatus) {
    if (status === 'Closed Won') return 'info';
    if (status === 'Closed Lost') return 'warn';
    return 'info';
  }

  protected isStalled(row: Opportunity): boolean {
    if (row.status !== 'Open') return false;
    if (row.isAtRisk !== undefined) return row.isAtRisk;
    const lastTouched = this.resolveLastTouched(row);
    const nextStepDue = this.resolveNextStepDue(row);
    if (!nextStepDue) return true;
    if (this.isPastDue(nextStepDue)) return true;
    if (!lastTouched) return false;
    return this.daysSince(lastTouched) > 30;
  }

  protected stalledAge(row: Opportunity): number {
    const date = this.resolveLastTouched(row);
    return date ? this.daysSince(date) : 0;
  }

  protected nextStepLabel(row: Opportunity): string {
    const nextStepDue = this.resolveNextStepDue(row);
    if (!nextStepDue) return 'No next step';
    if (this.isPastDue(nextStepDue)) return `Overdue ${this.daysSince(nextStepDue)}d`;
    return `Due in ${Math.max(0, this.daysUntil(nextStepDue))}d`;
  }

  private resolveLastTouched(row: Opportunity): Date | null {
    const raw = row.lastActivityAtUtc || row.updatedAtUtc || row.createdAtUtc || row.closeDate;
    if (!raw) return null;
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private resolveNextStepDue(row: Opportunity): Date | null {
    const raw = row.nextStepDueAtUtc;
    if (!raw) return null;
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private daysSince(date: Date): number {
    const ms = Date.now() - date.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
  }

  private daysUntil(date: Date): number {
    const ms = date.getTime() - Date.now();
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
  }

  private isPastDue(date: Date): boolean {
    return date.getTime() < Date.now();
  }

  private loadOwners() {
    this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
      const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
      this.ownerOptionsForAssign.set(options);
    });
  }
}
