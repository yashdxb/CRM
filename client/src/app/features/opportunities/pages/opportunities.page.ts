import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { map } from 'rxjs';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { Router } from '@angular/router';
import { CsvColumn, exportToCsv } from '../../../shared/utils/csv';

import {
  Opportunity,
  OpportunitySearchRequest,
  OpportunityStageHistoryItem,
  OpportunityStatus
} from '../models/opportunity.model';
import {
  OpportunityDataService,
  SaveOpportunityRequest
} from '../services/opportunity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';
import { SavedView, SavedViewsService } from '../../../shared/services/saved-views.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { RecentlyViewedItem, RecentlyViewedService } from '../../../shared/services/recently-viewed.service';

interface StageOption {
  label: string;
  value: string;
}

interface PipelineColumn {
  stage: string;
  label: string;
  items: Opportunity[];
  totalValue: number;
}

interface OpportunityViewFilters {
  searchTerm: string;
  stageFilter: string | 'all';
  viewMode: 'board' | 'table';
}

@Component({
  selector: 'app-opportunities-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    CardModule,
    TableModule,
    TagModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    DatePickerModule,
    PaginatorModule,
    SkeletonModule,
    CurrencyPipe,
    DatePipe,
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

  private readonly stageProbability: Record<string, number> = {
    Prospecting: 20,
    Qualification: 35,
    Proposal: 55,
    Negotiation: 75,
    'Closed Won': 100,
    'Closed Lost': 0
  };

  protected readonly opportunities = signal<Opportunity[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly customers = signal<Customer[]>([]);
  protected readonly viewMode = signal<'board' | 'table'>('board');
  protected readonly stageHistory = signal<OpportunityStageHistoryItem[]>([]);
  protected readonly historyLoading = signal(false);
  protected readonly cardHistory = signal<Record<string, OpportunityStageHistoryItem[]>>({});
  protected readonly cardHistoryLoading = signal<Record<string, boolean>>({});
  protected readonly openHistoryCards = signal<Set<string>>(new Set());
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
  protected readonly pipelineColumns = computed<PipelineColumn[]>(() => {
    const rows = this.opportunities();
    return this.stageOptions.map((stage) => {
      const items = rows.filter((opp) => opp.stage === stage.value);
      const totalValue = items.reduce((sum, opp) => sum + (opp.amount ?? 0), 0);
      return {
        stage: stage.value,
        label: stage.label,
        items,
        totalValue
      };
    });
  });

  protected dialogVisible = false;
  protected editingId: string | null = null;
  protected form: SaveOpportunityRequest = this.createEmptyForm();
  protected formStageName: string | null = null;
  protected winLossError = false;

  protected searchTerm = '';
  protected stageFilter: string | 'all' = 'all';
  protected pageIndex = 0;
  protected rows = 10;
  protected readonly savedViews = signal<SavedView<OpportunityViewFilters>[]>([]);
  protected readonly selectedViewId = signal<string | null>(null);
  protected readonly viewOptions = computed(() => [
    { label: 'Saved views', value: null },
    ...this.savedViews().map((view) => ({ label: view.name, value: view.id }))
  ]);
  protected viewName = '';
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected readonly recentOpportunities = computed(() => this.recentlyViewed.itemsFor('opportunities'));

  constructor(
    private readonly opportunityData: OpportunityDataService,
    private readonly customerData: CustomerDataService,
    private readonly router: Router,
    private readonly savedViewsService: SavedViewsService,
    private readonly userAdminData: UserAdminDataService,
    private readonly recentlyViewed: RecentlyViewedService
  ) {
    this.loadSavedViews();
    this.load();
    this.loadCustomers();
    this.loadOwners();
  }

  protected load() {
    this.loading.set(true);
    const stage = this.stageFilter === 'all' ? undefined : this.stageFilter;

    const request: OpportunitySearchRequest = {
      search: this.searchTerm || undefined,
      stage,
      page: this.pageIndex + 1,
      pageSize: this.rows
    };

    this.opportunityData.search(request).subscribe((res) => {
      this.opportunities.set(res.items);
      this.total.set(res.total);
      this.loading.set(false);
      this.openStalledHistoryCards();
    });
  }

  protected loadCustomers() {
    this.customerData.search({ page: 1, pageSize: 50 }).subscribe((res) => {
      this.customers.set(res.items);
    });
  }

  private openStalledHistoryCards() {
    const open = new Set(this.openHistoryCards());
    this.opportunities().forEach((row) => {
      if (this.isStalled(row)) {
        open.add(row.id);
        this.loadCardHistory(row.id);
      }
    });
    this.openHistoryCards.set(open);
  }

  protected onCreate() {
    this.router.navigate(['/app/opportunities/new']);
  }

  protected onEdit(row: Opportunity) {
    this.recentlyViewed.add('opportunities', {
      id: row.id,
      title: row.name,
      subtitle: row.account || row.stage
    });
    this.editingId = row.id;
    this.form = {
      name: row.name,
      accountId: this.findCustomerIdByName(row.account),
      stageId: undefined,
      stageName: row.stage,
      amount: row.amount,
      currency: row.currency,
      expectedCloseDate: row.closeDate,
      summary: '',
      probability: row.probability ?? this.estimateProbability(row.stage),
      isClosed: row.status !== 'Open',
      isWon: row.status === 'Closed Won',
      winLossReason: row.winLossReason ?? ''
    };
    this.formStageName = row.stage;
    this.winLossError = false;
    this.dialogVisible = true;
    this.loadHistory(row.id);
  }

  protected openRecent(item: RecentlyViewedItem) {
    const row = this.opportunities().find((entry) => entry.id === item.id);
    if (row) {
      this.onEdit(row);
      return;
    }
    this.searchTerm = item.title;
    this.pageIndex = 0;
    this.load();
  }

  protected onSave() {
    if (this.form.isClosed && !this.form.winLossReason?.trim()) {
      this.winLossError = true;
      return;
    }

    this.winLossError = false;
    const payload: SaveOpportunityRequest = {
      ...this.form,
      stageName: this.formStageName ?? (this.stageFilter === 'all' ? undefined : this.stageFilter),
      probability: this.form.probability ?? this.estimateProbability(this.formStageName ?? this.form.stageName ?? 'Prospecting'),
      winLossReason: this.form.winLossReason ?? null
    };

    const request$ = this.editingId
      ? this.opportunityData.update(this.editingId, payload).pipe(map(() => null))
      : this.opportunityData.create(payload).pipe(map(() => null));

    request$.subscribe(() => {
      this.dialogVisible = false;
      this.load();
    });
  }

  protected onDelete(row: Opportunity) {
    const confirmed = confirm(`Delete opportunity ${row.name}?`);
    if (!confirmed) return;
    this.opportunityData.delete(row.id).subscribe(() => this.load());
  }

  protected loadHistory(opportunityId: string) {
    this.historyLoading.set(true);
    this.opportunityData.getHistory(opportunityId).subscribe({
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

  protected toggleCardHistory(opportunityId: string) {
    const open = new Set(this.openHistoryCards());
    if (open.has(opportunityId)) {
      open.delete(opportunityId);
      this.openHistoryCards.set(open);
      return;
    }

    open.add(opportunityId);
    this.openHistoryCards.set(open);
    this.loadCardHistory(opportunityId);
  }

  protected isCardHistoryOpen(opportunityId: string) {
    return this.openHistoryCards().has(opportunityId);
  }

  protected cardHistoryItems(opportunityId: string) {
    return this.cardHistory()[opportunityId] ?? [];
  }

  protected isCardHistoryLoading(opportunityId: string) {
    return this.cardHistoryLoading()[opportunityId] ?? false;
  }

  private loadCardHistory(opportunityId: string) {
    this.cardHistoryLoading.set({
      ...this.cardHistoryLoading(),
      [opportunityId]: true
    });

    this.opportunityData.getHistory(opportunityId).subscribe({
      next: (items) => {
        this.cardHistory.set({
          ...this.cardHistory(),
          [opportunityId]: items.slice(0, 3)
        });
        this.cardHistoryLoading.set({
          ...this.cardHistoryLoading(),
          [opportunityId]: false
        });
      },
      error: () => {
        this.cardHistoryLoading.set({
          ...this.cardHistoryLoading(),
          [opportunityId]: false
        });
      }
    });
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

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
  }

  protected onSaveView() {
    const name = this.viewName.trim();
    if (!name) {
      return;
    }
    const saved = this.savedViewsService.saveView<OpportunityViewFilters>('opportunities', {
      name,
      filters: {
        searchTerm: this.searchTerm,
        stageFilter: this.stageFilter,
        viewMode: this.viewMode()
      }
    });
    this.viewName = '';
    this.loadSavedViews();
    this.selectedViewId.set(saved.id);
  }

  protected onSelectView(id: string | null) {
    if (!id) {
      this.selectedViewId.set(null);
      return;
    }
    const view = this.savedViews().find((item) => item.id === id);
    if (!view) {
      return;
    }
    this.selectedViewId.set(id);
    this.applyView(view);
  }

  protected onDeleteView() {
    const selected = this.selectedViewId();
    if (!selected) {
      return;
    }
    this.savedViewsService.deleteView('opportunities', selected);
    this.selectedViewId.set(null);
    this.loadSavedViews();
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
    exportToCsv(rows, columns, 'opportunities.csv');
  }

  protected onInlineStageChange(row: Opportunity, stage: string) {
    if (!stage || row.stage === stage) {
      return;
    }
    this.opportunityData.updateStage(row.id, stage).subscribe({
      next: () => this.load(),
      error: (err) => {
        alert(err?.error ?? 'Stage update failed. Please try again.');
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

  protected setViewMode(mode: 'board' | 'table') {
    this.viewMode.set(mode);
  }

  protected onPipelineStageChange(row: Opportunity, nextStage: string) {
    if (!nextStage || nextStage === row.stage) {
      return;
    }

    if (nextStage.startsWith('Closed') && !(row.winLossReason ?? '').trim()) {
      this.editingId = row.id;
      this.form = {
        name: row.name,
        accountId: this.findCustomerIdByName(row.account),
        stageId: undefined,
        stageName: nextStage,
        amount: row.amount,
        currency: row.currency,
        expectedCloseDate: row.closeDate,
        summary: '',
        probability: this.estimateProbability(nextStage),
        isClosed: true,
        isWon: nextStage === 'Closed Won',
        winLossReason: ''
      };
      this.formStageName = nextStage;
      this.winLossError = true;
      this.dialogVisible = true;
      this.loadHistory(row.id);
      return;
    }

    const payload: SaveOpportunityRequest = {
      name: row.name,
      accountId: this.findCustomerIdByName(row.account),
      stageName: nextStage,
      amount: row.amount,
      currency: row.currency,
      expectedCloseDate: row.closeDate,
      probability: this.estimateProbability(nextStage),
      summary: '',
      isClosed: nextStage.startsWith('Closed'),
      isWon: nextStage === 'Closed Won',
      winLossReason: row.winLossReason ?? ''
    };

    this.opportunityData
      .update(row.id, payload)
      .pipe(map(() => null))
      .subscribe(() => this.load());
  }

  protected isStalled(row: Opportunity): boolean {
    if (row.status !== 'Open') return false;
    const date = this.resolveLastTouched(row);
    if (!date) return false;
    return this.daysSince(date) > 30;
  }

  protected stalledAge(row: Opportunity): number {
    const date = this.resolveLastTouched(row);
    return date ? this.daysSince(date) : 0;
  }

  private resolveLastTouched(row: Opportunity): Date | null {
    const raw = row.updatedAtUtc || row.createdAtUtc || row.closeDate;
    if (!raw) return null;
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private daysSince(date: Date): number {
    const ms = Date.now() - date.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
  }

  protected findCustomerIdByName(name: string): string | undefined {
    return this.customers().find((c) => c.name === name)?.id;
  }

  private loadSavedViews() {
    this.savedViews.set(this.savedViewsService.getViews<OpportunityViewFilters>('opportunities'));
  }

  private applyView(view: SavedView<OpportunityViewFilters>) {
    const filters = view.filters;
    this.searchTerm = filters.searchTerm ?? '';
    this.stageFilter = filters.stageFilter ?? 'all';
    this.viewMode.set(filters.viewMode ?? 'board');
    this.pageIndex = 0;
    this.load();
  }

  private loadOwners() {
    this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
      const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
      this.ownerOptionsForAssign.set(options);
    });
  }

  protected onStageSelect(nextStage: string | null) {
    this.formStageName = nextStage;
    if (!nextStage) {
      return;
    }

    if (nextStage.startsWith('Closed')) {
      this.form.isClosed = true;
      this.form.isWon = nextStage === 'Closed Won';
      this.form.probability = nextStage === 'Closed Won' ? 100 : 0;
    } else {
      this.form.isClosed = false;
      this.form.isWon = false;
      this.form.probability = this.estimateProbability(nextStage);
    }
  }

  private createEmptyForm(): SaveOpportunityRequest {
    return {
      name: '',
      accountId: this.customers()[0]?.id,
      stageId: undefined,
      stageName: 'Prospecting',
      amount: 0,
      currency: 'USD',
      probability: 0,
      expectedCloseDate: '',
      summary: '',
      isClosed: false,
      isWon: false,
      winLossReason: ''
    };
  }

  private estimateProbability(stage: string) {
    return this.stageProbability[stage] ?? 0;
  }
}
