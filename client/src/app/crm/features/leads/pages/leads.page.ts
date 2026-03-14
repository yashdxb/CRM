import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { forkJoin, of, Subscription, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';

import { LEAD_STATUSES, Lead, LeadDispositionReport, LeadStatus } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { BulkAction, BulkActionsBarComponent } from '../../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { CsvImportJob, CsvImportJobStatusResponse } from '../../../../shared/models/csv-import.model';
import { ImportJobService } from '../../../../shared/services/import-job.service';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { computeLeadScore, LeadDataWeight, LeadScoreInputs, LeadScoreResult } from './lead-scoring.util';

interface StatusOption {
  label: string;
  value: LeadStatus | 'all';
  icon: string;
}

type ConversationView = 'all' | 'weak_signal' | 'no_signal' | 'coaching_queue' | 'engaged_but_unqualified' | 'manager_review' | 'at_risk' | 'ready_to_convert';
type LeadSortBy = 'newest' | 'lead_score_desc' | 'conversation_desc' | 'conversation_asc' | 'qualification_desc' | 'readiness_desc';

interface ConversationViewOption {
  label: string;
  value: ConversationView;
}

interface SortOption {
  label: string;
  value: LeadSortBy;
}

type CqvsCode = 'C' | 'Q' | 'V' | 'S';

const CQVS_TITLES: Record<CqvsCode, string> = {
  C: 'Company Fit',
  Q: 'Qualification Readiness',
  V: 'Value / Problem Severity',
  S: 'Stakeholder Access'
};

const CQVS_FACTOR_GROUPS: Array<{ code: CqvsCode; title: string; factorMatchers: string[] }> = [
  { code: 'C', title: CQVS_TITLES.C, factorMatchers: ['icp'] },
  { code: 'Q', title: CQVS_TITLES.Q, factorMatchers: ['budget', 'readiness', 'timeline'] },
  { code: 'V', title: CQVS_TITLES.V, factorMatchers: ['problem'] },
  { code: 'S', title: CQVS_TITLES.S, factorMatchers: ['economic buyer'] }
];

@Component({
  selector: 'app-leads-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    FileUploadModule,
    InputTextModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    TooltipModule,
    DrawerModule,
    BreadcrumbsComponent,
    BulkActionsBarComponent,
    RouterLink
  ],
  templateUrl: './leads.page.html',
  styleUrl: './leads.page.scss'
})
export class LeadsPage {
  protected readonly Math = Math;
  protected viewMode: 'table' | 'kanban' = 'table';
  private readonly toastService = inject(AppToastService);
  private readonly crmEventsService = inject(CrmEventsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserId = readUserId();
  private readonly joinedLeadPresenceIds = new Set<string>();
  private readonly leadPresenceUsersByRecord = signal<Map<string, Array<{ userId: string; displayName: string; isEditing: boolean }>>>(new Map());
  
  protected readonly statusOptions: StatusOption[] = [
    { label: 'All', value: 'all', icon: 'pi-inbox' },
    ...LEAD_STATUSES.map((status) => ({
      label: status,
      value: status,
      icon: this.statusIcon(status)
    }))
  ];
  protected readonly filteredStatusOptions = this.statusOptions.filter((o) => o.value !== 'all');
  protected readonly kanbanStatuses = LEAD_STATUSES;
  protected readonly conversationViewOptions: ConversationViewOption[] = [
    { label: 'All signals', value: 'all' },
    { label: 'Manager review', value: 'manager_review' },
    { label: 'At risk', value: 'at_risk' },
    { label: 'Ready to convert', value: 'ready_to_convert' },
    { label: 'Coaching queue', value: 'coaching_queue' },
    { label: 'Weak conversation', value: 'weak_signal' },
    { label: 'No signal', value: 'no_signal' },
    { label: 'Engaged but incomplete', value: 'engaged_but_unqualified' }
  ];
  protected readonly sortOptions: SortOption[] = [
    { label: 'Newest', value: 'newest' },
    { label: 'Highest lead score', value: 'lead_score_desc' },
    { label: 'Highest conversation score', value: 'conversation_desc' },
    { label: 'Lowest conversation score', value: 'conversation_asc' },
    { label: 'Most qualified', value: 'qualification_desc' },
    { label: 'Highest readiness', value: 'readiness_desc' }
  ];

  protected readonly leads = signal<Lead[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  private readonly leadDataWeights = signal<LeadDataWeight[]>([]);
  protected readonly showCqvsInLeadList = signal(false);
  protected readonly coachVisible = signal(false);
  protected readonly coachLead = signal<Lead | null>(null);
  protected readonly metrics = computed(() => {
    const rows = this.leads();
    const newLeads = rows.filter((l) => l.status === 'New').length;
    const contacted = rows.filter((l) => l.status === 'Contacted').length;
    const nurture = rows.filter((l) => l.status === 'Nurture').length;
    const qualified = rows.filter((l) => l.status === 'Qualified').length;
    const converted = rows.filter((l) => l.status === 'Converted').length;
    const lost = rows.filter((l) => l.status === 'Lost').length;
    const disqualified = rows.filter((l) => l.status === 'Disqualified').length;
    const avgScore = rows.length
      ? Math.round(rows.reduce((sum, lead) => sum + this.displayScore(lead), 0) / rows.length)
      : 0;

    return {
      total: this.total(),
      newLeads,
      contacted,
      nurture,
      qualified,
      converted,
      lost,
      disqualified,
      avgScore
    };
  });
  protected readonly conversationCoachMetrics = computed(() => {
    const rows = this.leads();
    return {
      managerReview: rows.filter((lead) => this.matchesConversationView(lead, 'manager_review')).length,
      atRisk: rows.filter((lead) => this.matchesConversationView(lead, 'at_risk')).length,
      readyToConvert: rows.filter((lead) => this.matchesConversationView(lead, 'ready_to_convert')).length,
      coachingQueue: rows.filter((lead) => this.matchesConversationView(lead, 'coaching_queue')).length,
      weakSignal: rows.filter((lead) => this.matchesConversationView(lead, 'weak_signal')).length,
      noSignal: rows.filter((lead) => this.matchesConversationView(lead, 'no_signal')).length,
      engagedButIncomplete: rows.filter((lead) => this.matchesConversationView(lead, 'engaged_but_unqualified')).length
    };
  });
  protected readonly readinessOwnerRollups = computed(() => {
    const buckets = new Map<string, { owner: string; managerReview: number; atRisk: number; readyToConvert: number }>();
    for (const lead of this.leads()) {
      const key = lead.owner || 'Unassigned';
      const current = buckets.get(key) ?? { owner: key, managerReview: 0, atRisk: 0, readyToConvert: 0 };
      if (this.matchesConversationView(lead, 'manager_review')) current.managerReview += 1;
      if (this.matchesConversationView(lead, 'at_risk')) current.atRisk += 1;
      if (this.matchesConversationView(lead, 'ready_to_convert')) current.readyToConvert += 1;
      buckets.set(key, current);
    }

    return Array.from(buckets.values())
      .filter((row) => row.managerReview > 0 || row.atRisk > 0 || row.readyToConvert > 0)
      .sort((a, b) => (b.managerReview + b.atRisk + b.readyToConvert) - (a.managerReview + a.atRisk + a.readyToConvert))
      .slice(0, 5);
  });

  // Conversion rate: converted / (converted + lost) * 100
  protected readonly conversionRate = computed(() => {
    const m = this.metrics();
    const totalClosed = m.converted + m.lost;
    return totalClosed > 0 ? Math.round((m.converted / totalClosed) * 100) : 0;
  });

  protected searchTerm = '';
  protected statusFilter: StatusOption['value'] = 'all';
  protected conversationView: ConversationView = 'all';
  protected sortBy: LeadSortBy = 'newest';
  protected pageIndex = 0;
  protected rows = 10;
  protected readonly selectedIds = signal<string[]>([]);
  protected readonly bulkActions = computed<BulkAction[]>(() => {
    const disabled = !this.canManage();
    const assignDisabled = !this.canEditOwnerAssignment();
    return [
      { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user', disabled: assignDisabled },
      { id: 'change-status', label: 'Change status', icon: 'pi pi-tag', disabled },
      { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger', disabled }
    ];
  });
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
  });

  protected hasConvertedLinks(lead: Lead): boolean {
    return !!(lead.accountId || lead.contactId || lead.convertedOpportunityId);
  }

  protected leadAccountLink(lead: Lead): string[] | null {
    return lead.accountId ? ['/app/customers', lead.accountId, 'edit'] : null;
  }

  protected leadContactLink(lead: Lead): string[] | null {
    return lead.contactId ? ['/app/contacts', lead.contactId, 'edit'] : null;
  }

  protected leadOpportunityLink(lead: Lead): string[] | null {
    return lead.convertedOpportunityId ? ['/app/deals', lead.convertedOpportunityId, 'edit'] : null;
  }
  protected readonly ownerOptionsForAssign = signal<{ label: string; value: string }[]>([]);
  protected readonly dispositionReport = signal<LeadDispositionReport | null>(null);
  protected readonly ownerAssignmentEditable = signal(false);
  protected assignDialogVisible = false;
  protected assignOwnerId: string | null = null;
  protected statusDialogVisible = false;
  protected bulkStatus: LeadStatus | null = null;
  protected importDialogVisible = false;
  protected importFile: File | null = null;
  protected readonly importJob = signal<CsvImportJob | null>(null);
  protected readonly importStatus = signal<CsvImportJobStatusResponse | null>(null);
  protected readonly importError = signal<string | null>(null);
  protected readonly importing = signal(false);

  private statusIcon(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'pi-star';
      case 'Contacted':
        return 'pi-comments';
      case 'Nurture':
        return 'pi-clock';
      case 'Qualified':
        return 'pi-check';
      case 'Converted':
        return 'pi-verified';
      case 'Lost':
        return 'pi-times';
      case 'Disqualified':
        return 'pi-ban';
      default:
        return 'pi-circle';
    }
  }
  private importPoll?: Subscription;
  private activeImportJobId: string | null = null;

  constructor(
    private readonly leadData: LeadDataService,
    private readonly router: Router,
    private readonly userAdminData: UserAdminDataService,
    private readonly importJobs: ImportJobService
  ) {
    this.resolveOwnerAssignmentAccess();
    this.loadOwners();
    this.loadLeadDataWeights();
    if (this.router.url.includes('/leads/pipeline')) {
      this.viewMode = 'kanban';
    }
    if (this.router.url.includes('/leads/import')) {
      this.importDialogVisible = true;
    }
    const toast = history.state?.toast as { tone: 'success' | 'error'; message: string } | undefined;
    if (toast) {
      this.toastService.show(toast.tone, toast.message, 3000);
      history.replaceState({}, '');
    }
    this.load();

    this.crmEventsService.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.eventType === 'record.presence.snapshot' || event.eventType === 'record.presence.changed') {
          this.handleLeadPresenceEvent(event.payload ?? null);
          return;
        }

        if (event.eventType === 'import.job.progress') {
          this.handleImportProgressEvent(event.payload ?? null);
          return;
        }

        if (event.eventType === 'pipeline.lead.created'
          || event.eventType === 'pipeline.lead.updated'
          || event.eventType === 'pipeline.lead.deleted'
          || event.eventType === 'pipeline.lead.moved')
        {
          this.load();
          return;
        }

        if (event.eventType !== 'entity.crud.changed') {
          return;
        }

        const entityType = String(event.payload?.['entityType'] ?? '').toLowerCase();
        if (entityType === 'lead') {
          this.load();
        }
      });

    this.destroyRef.onDestroy(() => {
      for (const leadId of this.joinedLeadPresenceIds) {
        this.crmEventsService.leaveRecordPresence('lead', leadId);
      }
      this.joinedLeadPresenceIds.clear();
      this.leadPresenceUsersByRecord.set(new Map());
    });
  }

  // Get funnel width percentage based on total leads
  protected getFunnelWidth(status: LeadStatus): number {
    const m = this.metrics();
    if (m.total === 0) return 0;
    
    const count = status === 'New' ? m.newLeads
      : status === 'Contacted' ? m.contacted
      : status === 'Qualified' ? m.qualified
      : status === 'Converted' ? m.converted
      : m.lost;
    
    return Math.max(10, (count / m.total) * 100);
  }

  // Get leads filtered by status for Kanban view
  protected getLeadsByStatus(status: string): Lead[] {
    return this.leads().filter(lead => lead.status === status);
  }

  protected load() {
    this.loading.set(true);
    const status = this.statusFilter === 'all' ? undefined : (this.statusFilter as LeadStatus);
    forkJoin({
      search: this.leadData.search({
        search: this.searchTerm || undefined,
        status,
        conversationView: this.conversationView === 'all' ? undefined : this.conversationView,
        sortBy: this.sortBy,
        page: this.pageIndex + 1,
        pageSize: this.rows
      }),
      dispositionReport: this.leadData.getDispositionReport().pipe(catchError(() => of(null)))
    })
      .subscribe({
        next: (res) => {
          this.leads.set(res.search.items);
          this.syncLeadPresenceSubscriptions(res.search.items.map((lead) => lead.id));
          this.total.set(res.search.total);
          this.dispositionReport.set(res.dispositionReport);
          this.loading.set(false);
          this.selectedIds.set([]);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }

  protected leadPresenceCount(leadId: string): number {
    const users = this.leadPresenceUsersByRecord().get(leadId) ?? [];
    return users.filter((user) => user.userId !== this.currentUserId).length;
  }

  protected leadPresenceEditingCount(leadId: string): number {
    const users = this.leadPresenceUsersByRecord().get(leadId) ?? [];
    return users.filter((user) => user.userId !== this.currentUserId && user.isEditing).length;
  }

  protected leadPresenceTooltip(leadId: string): string {
    const users = (this.leadPresenceUsersByRecord().get(leadId) ?? []).filter((user) => user.userId !== this.currentUserId);
    if (!users.length) {
      return '';
    }

    return users
      .map((user) => user.isEditing ? `${user.displayName} (editing)` : user.displayName)
      .join(', ');
  }

  private syncLeadPresenceSubscriptions(leadIds: string[]): void {
    const nextIds = new Set(leadIds);

    for (const currentId of [...this.joinedLeadPresenceIds]) {
      if (!nextIds.has(currentId)) {
        this.crmEventsService.leaveRecordPresence('lead', currentId);
        this.joinedLeadPresenceIds.delete(currentId);
        this.leadPresenceUsersByRecord.update((map) => {
          const next = new Map(map);
          next.delete(currentId);
          return next;
        });
      }
    }

    for (const leadId of nextIds) {
      if (this.joinedLeadPresenceIds.has(leadId)) {
        continue;
      }
      this.crmEventsService.joinRecordPresence('lead', leadId);
      this.joinedLeadPresenceIds.add(leadId);
    }
  }

  private handleLeadPresenceEvent(payload: Record<string, unknown> | null): void {
    if (!payload) {
      return;
    }

    const entityType = String(payload['entityType'] ?? '').toLowerCase();
    if (entityType !== 'lead') {
      return;
    }

    const recordId = String(payload['recordId'] ?? '');
    if (!recordId || !this.joinedLeadPresenceIds.has(recordId)) {
      return;
    }

    if (Array.isArray(payload['users'])) {
      const users = (payload['users'] as unknown[])
        .map((item) => {
          const value = item as Record<string, unknown>;
          return {
            userId: String(value['userId'] ?? ''),
            displayName: String(value['displayName'] ?? 'User'),
            isEditing: !!value['isEditing']
          };
        })
        .filter((item) => !!item.userId);

      this.leadPresenceUsersByRecord.update((map) => {
        const next = new Map(map);
        next.set(recordId, users);
        return next;
      });
      return;
    }

    const userId = String(payload['userId'] ?? '');
    const displayName = String(payload['displayName'] ?? 'User');
    const action = String(payload['action'] ?? '').toLowerCase();
    const isEditing = !!payload['isEditing'];
    if (!userId || !action) {
      return;
    }

    this.leadPresenceUsersByRecord.update((map) => {
      const next = new Map(map);
      const current = [...(next.get(recordId) ?? [])];

      if (action === 'joined') {
        const existingIndex = current.findIndex((item) => item.userId === userId);
        if (existingIndex >= 0) {
          current[existingIndex] = { ...current[existingIndex], displayName, isEditing };
        } else {
          current.push({ userId, displayName, isEditing });
        }
        next.set(recordId, current);
        return next;
      }

      if (action === 'left') {
        next.set(recordId, current.filter((item) => item.userId !== userId));
        return next;
      }

      if (action === 'editing_started' || action === 'editing_stopped') {
        const nextEditing = action === 'editing_started' ? true : isEditing;
        const existingIndex = current.findIndex((item) => item.userId === userId);
        if (existingIndex >= 0) {
          current[existingIndex] = { ...current[existingIndex], displayName, isEditing: nextEditing };
        } else {
          current.push({ userId, displayName, isEditing: nextEditing });
        }
        next.set(recordId, current);
      }

      return next;
    });
  }

  protected onCreate() {
    this.router.navigate(['/app/leads/new']);
  }

  protected openImport() {
    this.importDialogVisible = true;
    this.importFile = null;
    this.activeImportJobId = null;
    this.importJob.set(null);
    this.importStatus.set(null);
    this.importError.set(null);
    this.stopImportPolling();
  }

  protected closeImport() {
    this.importDialogVisible = false;
    this.activeImportJobId = null;
    if (this.router.url.includes('/leads/import')) {
      this.router.navigate(['/app/leads']);
    }
    this.stopImportPolling();
  }

  protected onImportFileSelected(event: { files?: File[] } | Event) {
    if (event && 'files' in event && event.files) {
      this.importFile = event.files.length ? event.files[0] : null;
      return;
    }

    if (event instanceof Event) {
      const input = event.target as HTMLInputElement | null;
      const files = input?.files;
      this.importFile = files && files.length ? files[0] : null;
      return;
    }

    this.importFile = null;
  }

  protected onImport() {
    if (!this.importFile) return;
    this.importing.set(true);
    this.importError.set(null);
    this.leadData.importCsv(this.importFile).subscribe({
      next: (job) => {
        this.importJob.set(job);
        this.activeImportJobId = job.id;
        this.importStatus.set(null);
        this.raiseToast('success', 'Lead import queued.');
        if (this.crmEventsService.isFeatureEnabled('realtime.importProgress')) {
          this.importing.set(true);
        } else {
          this.startImportPolling(job.id);
        }
      },
      error: () => {
        this.importError.set('Import failed. Please check your CSV and try again.');
        this.importing.set(false);
        this.raiseToast('error', 'Lead import failed.');
      }
    });
  }

  protected onEdit(row: Lead) {
    this.router.navigate(['/app/leads', row.id, 'edit'], { state: { lead: row } });
  }

  protected onRowClick(row: Lead, event: MouseEvent): void {
    if (!this.canManage() || this.isInteractiveRowTarget(event)) {
      return;
    }

    this.onEdit(row);
  }

  private isInteractiveRowTarget(event: MouseEvent): boolean {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return false;
    }

    return !!target.closest('button, a, input, textarea, select, .p-button, .p-checkbox, .p-inputswitch, .p-rating, .p-dropdown, .p-select');
  }

  protected onLogActivity(row: Lead) {
    const subject = row.name ? `Follow up: ${row.name}` : 'Lead follow-up';
    this.router.navigate(['/app/activities/new'], {
      queryParams: {
        relatedType: 'Lead',
        relatedId: row.id,
        subject,
        leadFirstTouchDueAtUtc: row.firstTouchDueAtUtc ?? undefined
      }
    });
  }

  protected onConvert(row: Lead) {
    this.router.navigate(['/app/leads', row.id, 'convert'], { state: { lead: row } });
  }

  protected onDelete(row: Lead) {
    const confirmed = confirm(`Delete lead ${row.name}?`);
    if (!confirmed) return;
    this.leadData.delete(row.id).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Lead deleted.');
      },
      error: () => this.raiseToast('error', 'Unable to delete lead.')
    });
  }

  protected canRecycleLead(row: Lead): boolean {
    return row.status === 'Lost' || row.status === 'Disqualified';
  }

  protected dispositionReasonLabel(lead: Lead): string | null {
    if (lead.status === 'Disqualified') {
      return lead.disqualifiedReason?.trim() || null;
    }
    if (lead.status === 'Lost') {
      return lead.lossReason?.trim() || null;
    }
    return null;
  }

  protected dispositionTrendLabel(periodStartUtc: string): string {
    return new Date(periodStartUtc).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  protected dispositionTrendMax(): number {
    const report = this.dispositionReport();
    if (!report?.trend.length) {
      return 1;
    }

    return Math.max(
      1,
      ...report.trend.map((item) => item.disqualified + item.lost + item.recycledToNurture));
  }

  protected recycleLead(row: Lead): void {
    if (!this.canManage() || !this.canRecycleLead(row)) {
      return;
    }

    const confirmed = confirm(`Recycle ${row.name} back to nurture?`);
    if (!confirmed) {
      return;
    }

    this.leadData.recycleToNurture(row.id).subscribe({
      next: () => {
        this.raiseToast('success', 'Lead recycled to nurture.');
        this.load();
      },
      error: () => {
        this.raiseToast('error', 'Unable to recycle lead.');
      }
    });
  }

  protected onSearch(term: string) {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.load();
  }

  protected onStatusChange(value: StatusOption['value']) {
    this.statusFilter = value;
    this.pageIndex = 0;
    this.load();
  }

  protected onConversationViewChange(value: ConversationView): void {
    this.conversationView = value;
    this.pageIndex = 0;
    this.load();
  }

  protected onSortChange(value: LeadSortBy | null | undefined): void {
    this.sortBy = value ?? 'newest';
    this.pageIndex = 0;
    this.load();
  }

  protected onPageChange(event: PaginatorState) {
    this.pageIndex = event.page ?? 0;
    this.rows = event.rows ?? this.rows;
    this.load();
  }

  private startImportPolling(jobId: string) {
    this.stopImportPolling();
    this.importing.set(true);
    this.importPoll = timer(0, 2000)
      .pipe(
        switchMap(() =>
          this.importJobs.getStatus(jobId).pipe(
            catchError(() => {
              this.importError.set('Unable to check import status.');
              this.importing.set(false);
              this.raiseToast('error', 'Lead import status failed.');
              return of(null);
            })
          )
        ),
        takeWhile(
          (status) => !!status && (status.status === 'Queued' || status.status === 'Processing'),
          true
        ),
        tap((status) => {
          if (!status) return;
          this.importStatus.set(status);
          if (status.status === 'Completed' && this.importing()) {
            this.importing.set(false);
            this.load();
            this.raiseToast('success', 'Lead import completed.');
          }
          if (status.status === 'Failed' && this.importing()) {
            this.importing.set(false);
            this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
            this.raiseToast('error', 'Lead import failed.');
          }
        })
      )
      .subscribe();
  }

  private stopImportPolling() {
    if (this.importPoll) {
      this.importPoll.unsubscribe();
      this.importPoll = undefined;
    }
  }

  private handleImportProgressEvent(payload: Record<string, unknown> | null) {
    if (!payload || !this.crmEventsService.isFeatureEnabled('realtime.importProgress')) {
      return;
    }

    const jobId = String(payload['jobId'] ?? '');
    if (!jobId || (this.activeImportJobId && this.activeImportJobId !== jobId)) {
      return;
    }

    const status = String(payload['status'] ?? 'Queued') as CsvImportJobStatusResponse['status'];
    const processed = Number(payload['processed'] ?? 0);
    const succeeded = Number(payload['succeeded'] ?? 0);
    const failed = Number(payload['failed'] ?? 0);
    const total = Number(payload['total'] ?? processed);
    const startedAtUtc = String(payload['startedAtUtc'] ?? new Date().toISOString());
    const finishedAtUtcRaw = payload['finishedAtUtc'];
    const errorSummaryRaw = payload['errorSummary'];

    this.importing.set(status === 'Queued' || status === 'Processing');
    this.importStatus.set({
      id: jobId,
      entityType: String(payload['entityType'] ?? 'Leads'),
      status,
      total,
      imported: succeeded,
      skipped: failed,
      errors: [],
      createdAtUtc: startedAtUtc,
      completedAtUtc: typeof finishedAtUtcRaw === 'string' ? finishedAtUtcRaw : null,
      errorMessage: typeof errorSummaryRaw === 'string' ? errorSummaryRaw : null
    });

    if (status === 'Completed') {
      this.importing.set(false);
      this.activeImportJobId = null;
      this.load();
      this.raiseToast('success', 'Lead import completed.');
      return;
    }

    if (status === 'Failed') {
      this.importing.set(false);
      this.activeImportJobId = null;
      this.importError.set(typeof errorSummaryRaw === 'string' ? errorSummaryRaw : 'Import failed. Please check your CSV and try again.');
      this.raiseToast('error', 'Lead import failed.');
      return;
    }

    if (total > 0 && processed >= total) {
      this.importing.set(false);
    }
  }

  protected isSelected(id: string) {
    return this.selectedIds().includes(id);
  }

  protected toggleSelection(id: string, checked: boolean) {
    const current = new Set(this.selectedIds());
    if (checked) {
      current.add(id);
    } else {
      current.delete(id);
    }
    this.selectedIds.set(Array.from(current));
  }

  protected toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedIds.set(this.leads().map((row) => row.id));
      return;
    }
    this.selectedIds.set([]);
  }

  protected selectAllFiltered() {
    this.selectedIds.set(this.leads().map((row) => row.id));
  }

  protected clearSelection() {
    this.selectedIds.set([]);
  }

  protected onBulkAction(action: BulkAction) {
    if (action.id === 'assign-owner') {
      this.assignDialogVisible = true;
      return;
    }
    if (action.id === 'change-status') {
      this.statusDialogVisible = true;
      return;
    }
    if (action.id === 'delete') {
      this.confirmBulkDelete();
    }
  }

  protected confirmBulkDelete() {
    const ids = this.selectedIds();
    if (!ids.length) {
      return;
    }
    const confirmed = confirm(`Delete ${ids.length} leads?`);
    if (!confirmed) {
      return;
    }

    const deletes$ = ids.map((id) =>
      this.leadData.delete(id).pipe(
        map(() => true),
        catchError(() => of(false))
      )
    );

    forkJoin(deletes$).subscribe((results) => {
      const failures = results.filter((ok) => !ok).length;
      this.clearSelection();
      this.load();
      if (failures) {
        this.raiseToast('error', `${failures} leads could not be deleted.`);
        return;
      }
      this.raiseToast('success', 'Leads deleted.');
    });
  }

  protected confirmBulkAssign() {
    if (!this.canEditOwnerAssignment()) {
      return;
    }
    const ids = this.selectedIds();
    if (!ids.length || !this.assignOwnerId) {
      return;
    }
    this.leadData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
      next: () => {
        this.assignDialogVisible = false;
        this.assignOwnerId = null;
        this.clearSelection();
        this.load();
        this.raiseToast('success', 'Owner assigned.');
      },
      error: () => {
        this.raiseToast('error', 'Owner assignment failed.');
      }
    });
  }

  protected confirmBulkStatusUpdate() {
    const ids = this.selectedIds();
    if (!ids.length || !this.bulkStatus) {
      return;
    }
    this.leadData.bulkUpdateStatus(ids, this.bulkStatus).subscribe({
      next: () => {
        this.statusDialogVisible = false;
        this.bulkStatus = null;
        this.clearSelection();
        this.load();
        this.raiseToast('success', 'Status updated.');
      },
      error: () => {
        this.raiseToast('error', 'Status update failed.');
      }
    });
  }

  protected onInlineStatusChange(row: Lead, status: LeadStatus) {
    if (!status || row.status === status) {
      return;
    }
    this.leadData.updateStatus(row.id, status).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Status updated.');
      },
      error: () => {
        this.raiseToast('error', 'Status update failed.');
      }
    });
  }

  protected onInlineOwnerChange(row: Lead, ownerId: string) {
    if (!this.canEditOwnerAssignment()) {
      return;
    }
    if (!ownerId || row.ownerId === ownerId) {
      return;
    }
    this.leadData.updateOwner(row.id, ownerId).subscribe({
      next: () => {
        this.load();
        this.raiseToast('success', 'Owner updated.');
      },
      error: () => {
        this.raiseToast('error', 'Owner update failed.');
      }
    });
  }

  protected canEditOwnerAssignment(): boolean {
    return this.ownerAssignmentEditable();
  }

  private resolveOwnerAssignmentAccess(): void {
    const context = readTokenContext();
    const hasAdmin = tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
    this.ownerAssignmentEditable.set(hasAdmin);
  }

  protected statusSeverity(status: LeadStatus) {
    switch (status) {
      case 'New':
        return 'info';
      case 'Contacted':
        return 'info';
      case 'Nurture':
        return 'info';
      case 'Qualified':
        return 'info';
      case 'Converted':
        return 'info';
      case 'Lost':
        return 'warn';
      case 'Disqualified':
        return 'warn';
      default:
        return 'info';
    }
  }

  protected getAvatarClass(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'avatar-new';
      case 'Contacted':
        return 'avatar-contacted';
      case 'Nurture':
        return 'avatar-contacted';
      case 'Qualified':
        return 'avatar-qualified';
      case 'Converted':
        return 'avatar-converted';
      case 'Lost':
        return 'avatar-lost';
      case 'Disqualified':
        return 'avatar-lost';
      default:
        return 'avatar-new';
    }
  }

  protected statusClass(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'badge-info';
      case 'Contacted':
        return 'badge-warning';
      case 'Nurture':
        return 'badge-warning';
      case 'Qualified':
        return 'badge-purple';
      case 'Converted':
        return 'badge-success';
      case 'Lost':
        return 'badge-warning';
      case 'Disqualified':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  }

  protected getSlaStatusLabel(lead: Lead): string {
    if (lead.firstTouchedAtUtc) return 'First touch completed';
    if (!lead.firstTouchDueAtUtc) return 'SLA not started';
    const due = new Date(lead.firstTouchDueAtUtc);
    if (Number.isNaN(due.getTime())) return 'SLA pending';
    return due.getTime() < Date.now() ? 'SLA overdue' : 'SLA due';
  }

  protected getSlaTone(lead: Lead): string {
    if (lead.firstTouchedAtUtc) return 'done';
    if (!lead.firstTouchDueAtUtc) return 'pending';
    const due = new Date(lead.firstTouchDueAtUtc);
    if (Number.isNaN(due.getTime())) return 'pending';
    return due.getTime() < Date.now() ? 'overdue' : 'due';
  }

  protected qualificationStatusLabel(lead: Lead): string {
    const factorCount = this.countQualificationFactors(lead);
    if (factorCount === 0) return 'Not started';
    const qualificationScore = this.computeOverallScore(lead).qualificationScore100;
    return `${qualificationScore} / 100`;
  }

  protected displayScore(lead: Lead): number {
    return this.computeOverallScore(lead).finalLeadScore;
  }

  protected overallScoreHint(lead: Lead): string {
    const score = this.computeOverallScore(lead);
    return `Overall ${score.finalLeadScore}/100 = Lead data quality ${score.buyerDataQualityScore100}/100 + Qualification ${score.qualificationScore100}/100 (weighted 30/70).`;
  }

  protected qualificationScoreHint(lead: Lead): string {
    const score = this.computeOverallScore(lead);
    const coverage = typeof lead.truthCoverage === 'number' ? Math.round(lead.truthCoverage * 100) : null;
    const confidencePct = typeof lead.qualificationConfidence === 'number' ? Math.round(lead.qualificationConfidence * 100) : null;
    const pieces: string[] = [`Qualification ${score.qualificationScore100}/100`];
    if (confidencePct !== null) {
      pieces.push(`confidence ${confidencePct}%`);
    }
    if (lead.qualificationConfidenceLabel) {
      pieces.push(lead.qualificationConfidenceLabel);
    }
    if (coverage !== null) {
      pieces.push(`evidence ${coverage}%`);
    }
    if (typeof lead.assumptionsOutstanding === 'number') {
      pieces.push(`${lead.assumptionsOutstanding} assumptions`);
    }
    return pieces.join(' • ');
  }

  protected qualificationScore100(lead: Lead): number {
    return this.computeOverallScore(lead).qualificationScore100;
  }

  protected conversationScoreLabel(lead: Lead): string {
    if (!lead.conversationSignalAvailable) {
      return 'No conversation signal';
    }

    return `${lead.conversationScore ?? 0} / 100`;
  }

  protected conversationScoreHint(lead: Lead): string {
    if (!lead.conversationSignalAvailable) {
      return 'No conversation signal is available for this lead yet.';
    }

    const pieces = [`Conversation ${lead.conversationScore ?? 0}/100`];
    if (lead.conversationScoreLabel) {
      pieces.push(lead.conversationScoreLabel);
    }
    if (lead.conversationScoreReasons?.length) {
      pieces.push(lead.conversationScoreReasons.slice(0, 2).join(' • '));
    }

    return pieces.join(' • ');
  }

  protected readinessScoreLabel(lead: Lead): string {
    return lead.conversionReadiness ? `${lead.conversionReadiness.score} / 100` : 'Not assessed';
  }

  protected readinessHint(lead: Lead): string {
    const readiness = lead.conversionReadiness;
    if (!readiness) {
      return 'Conversion readiness has not been computed for this lead yet.';
    }

    const parts = [`${readiness.label} (${readiness.score}/100)`, readiness.summary];
    if (readiness.primaryGap) {
      parts.push(`Primary gap: ${readiness.primaryGap}`);
    }
    if (readiness.managerReviewRecommended) {
      parts.push('Manager review recommended');
    }
    return parts.join(' • ');
  }

  protected conversationViewHint(): string {
    return this.conversationViewOptions.find((option) => option.value === this.conversationView)?.label ?? 'All signals';
  }

  protected evidenceCoveragePercent(lead: Lead): number | null {
    if (typeof lead.truthCoverage !== 'number' || !Number.isFinite(lead.truthCoverage)) return null;
    return Math.round(lead.truthCoverage * 100);
  }

  protected cqvsWeakestCode(lead: Lead): CqvsCode | null {
    const label = (lead.weakestSignal ?? '').trim().toLowerCase();
    if (!label) return null;

    if (label.includes('budget')) return 'Q';
    if (label.includes('readiness')) return 'Q';
    if (label.includes('timeline')) return 'Q';
    if (label.includes('problem')) return 'V';
    if (label.includes('economic buyer')) return 'S';
    if (label.includes('icp')) return 'C';

    return null;
  }

  protected cqvsWeakestTooltip(lead: Lead): string {
    const signal = lead.weakestSignal?.trim();
    const state = lead.weakestState?.trim();
    const code = this.cqvsWeakestCode(lead);
    const group = code ? `${code} (${CQVS_TITLES[code]})` : 'Unknown';

    if (!signal && !state) return `Weakest factor: Unknown. CQVS group: ${group}.`;
    if (signal && state) return `Weakest factor: ${signal} (${state}). CQVS group: ${group}.`;
    return `Weakest factor: ${signal ?? 'Unknown'}${state ? ` (${state})` : ''}. CQVS group: ${group}.`;
  }

  protected openCoach(lead: Lead): void {
    this.coachLead.set(lead);
    this.coachVisible.set(true);
  }

  protected onCoachHide(): void {
    this.coachVisible.set(false);
    this.coachLead.set(null);
  }

  protected cqvsGroupMetrics(lead: Lead): Array<{ code: CqvsCode; title: string; score: number; maxScore: number; percent: number }> {
    const breakdown = lead.scoreBreakdown ?? [];
    const grouped = new Map<CqvsCode, { score: number; maxScore: number }>();
    for (const group of CQVS_FACTOR_GROUPS) {
      grouped.set(group.code, { score: 0, maxScore: 0 });
    }

    for (const item of breakdown) {
      const code = this.cqvsCodeForFactor(item.factor);
      if (!code) continue;
      const bucket = grouped.get(code);
      if (!bucket) continue;
      bucket.score += item.score ?? 0;
      bucket.maxScore += item.maxScore ?? 0;
    }

    return CQVS_FACTOR_GROUPS.map((group) => {
      const bucket = grouped.get(group.code) ?? { score: 0, maxScore: 0 };
      const percent = bucket.maxScore > 0 ? Math.round((bucket.score / bucket.maxScore) * 100) : 0;
      return {
        code: group.code,
        title: group.title,
        score: bucket.score,
        maxScore: bucket.maxScore,
        percent
      };
    });
  }

  protected cqvsCodeForFactor(factor: string): CqvsCode | null {
    const normalized = (factor ?? '').trim().toLowerCase();
    if (!normalized) return null;

    for (const group of CQVS_FACTOR_GROUPS) {
      if (group.factorMatchers.some((m) => normalized.includes(m))) {
        return group.code;
      }
    }
    return null;
  }

  protected qualificationStatusHint(lead: Lead): string {
    const factorCount = this.countQualificationFactors(lead);
    if (factorCount === 0) return 'No qualification factors selected yet.';
    const qualificationScore = this.computeOverallScore(lead).qualificationScore100;
    const truthCoverage = typeof lead.truthCoverage === 'number' ? Math.round(lead.truthCoverage * 100) : null;
    if (truthCoverage !== null) {
      return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/6 factors and ${truthCoverage}% evidence coverage.`;
    }
    return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/6 factors.`;
  }

  // Lead create/edit handled by separate page.

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadOwners() {
    this.userAdminData.lookupActive(undefined, 300).subscribe({
      next: (items) => {
        const options = items.map((user) => ({ label: user.fullName, value: user.id }));
        this.ownerOptionsForAssign.set(options);
      },
      error: () => {
        this.ownerOptionsForAssign.set([]);
      }
    });
  }

  private matchesConversationView(lead: Lead, view: Exclude<ConversationView, 'all'>): boolean {
    switch (view) {
      case 'weak_signal':
        return lead.conversationSignalAvailable === true && (lead.conversationScore ?? 0) < 50;
      case 'no_signal':
        return lead.conversationSignalAvailable !== true;
      case 'manager_review':
        return lead.conversionReadiness?.managerReviewRecommended === true;
      case 'at_risk':
        return (lead.conversionReadiness?.label ?? '').toLowerCase() === 'at risk';
      case 'ready_to_convert':
        return (lead.conversionReadiness?.label ?? '').toLowerCase() === 'ready';
      case 'coaching_queue':
        return (lead.conversationSignalAvailable !== true || (lead.conversationScore ?? 0) < 50)
          && (this.displayScore(lead) >= 70 || (lead.qualificationConfidence ?? 0) >= 0.7);
      case 'engaged_but_unqualified':
        return lead.conversationSignalAvailable === true
          && (lead.conversationScore ?? 0) >= 70
          && (lead.assumptionsOutstanding ?? 0) > 0;
    }
  }

  private loadLeadDataWeights(): void {
    this.leadData.getQualificationPolicy().subscribe({
      next: (policy) => {
        this.leadDataWeights.set(policy?.leadDataWeights ?? []);
        this.showCqvsInLeadList.set(!!policy?.showCqvsInLeadList);
      },
      error: () => {
        // Default weights live in `computeLeadScore` fallback; this endpoint is for configurability.
        this.leadDataWeights.set([]);
        this.showCqvsInLeadList.set(false);
      }
    });
  }

  private countQualificationFactors(lead: Lead): number {
    const factors = [
      lead.budgetAvailability,
      lead.readinessToSpend,
      lead.buyingTimeline,
      lead.problemSeverity,
      lead.economicBuyer,
      lead.icpFit
    ];
    return factors.filter((value) => this.isMeaningfulFactor(value)).length;
  }

  private isMeaningfulFactor(value?: string): boolean {
    if (!value) return false;
    const normalized = value.trim().toLowerCase();
    return normalized.length > 0 && !normalized.includes('unknown');
  }

  private computeOverallScore(lead: Lead): LeadScoreResult {
    return computeLeadScore(this.toScoreInputs(lead), this.leadDataWeights());
  }

  private toScoreInputs(lead: Lead): LeadScoreInputs {
    const nameParts = (lead.name ?? '').trim().split(/\s+/).filter((part) => part.length > 0);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return {
      firstName,
      lastName,
      email: lead.email ?? null,
      phone: lead.phone ?? null,
      companyName: lead.company ?? null,
      jobTitle: lead.jobTitle ?? null,
      source: lead.source ?? null,
      territory: lead.territory ?? null,
      budgetAvailability: lead.budgetAvailability ?? null,
      readinessToSpend: lead.readinessToSpend ?? null,
      buyingTimeline: lead.buyingTimeline ?? null,
      problemSeverity: lead.problemSeverity ?? null,
      economicBuyer: lead.economicBuyer ?? null,
      icpFit: lead.icpFit ?? null
    };
  }
}
