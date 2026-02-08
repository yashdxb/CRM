import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { KnobModule } from 'primeng/knob';

import { map, Observable } from 'rxjs';

import {
  Lead,
  LeadAssignmentStrategy,
  LeadCadenceChannel,
  LeadCadenceTouch,
  LeadScoreBreakdownItem,
  LeadStatus,
  LeadStatusHistoryItem
} from '../models/lead.model';
import { LeadDataService, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuthService } from '../../../../core/auth/auth.service';
import { TooltipModule } from 'primeng/tooltip';

interface StatusOption {
  label: string;
  value: LeadStatus;
  icon: string;
  disabled?: boolean;
}

interface AssignmentOption {
  label: string;
  value: LeadAssignmentStrategy;
}

interface OwnerOption {
  label: string;
  value: string;
}

interface OptionItem {
  label: string;
  value: string;
  icon: string;
  tone: 'unknown' | 'assumed' | 'verified' | 'invalid' | 'neutral';
}
interface CadenceChannelOption {
  label: string;
  value: LeadCadenceChannel;
}

@Component({
  selector: 'app-lead-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ProgressBarModule,
    KnobModule,
    TagModule,
    DatePickerModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./lead-form.page.html",
  styleUrls: ["./lead-form.page.scss"]
})
export class LeadFormPage implements OnInit {
  protected activeTab = signal<'overview' | 'qualification' | 'activity' | 'history'>('overview');
  protected readonly statusOptions: StatusOption[] = [
    { label: 'New', value: 'New', icon: 'pi-star' },
    { label: 'Contacted', value: 'Contacted', icon: 'pi-comments' },
    { label: 'Nurture', value: 'Nurture', icon: 'pi-clock' },
    { label: 'Qualified', value: 'Qualified', icon: 'pi-check' },
    { label: 'Converted', value: 'Converted', icon: 'pi-verified' },
    { label: 'Lost', value: 'Lost', icon: 'pi-times' },
    { label: 'Disqualified', value: 'Disqualified', icon: 'pi-ban' }
  ];
  protected readonly assignmentOptions: AssignmentOption[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Round robin', value: 'RoundRobin' },
    { label: 'Territory', value: 'Territory' }
  ];
  protected readonly budgetOptions: OptionItem[] = [
    { label: 'Unknown / not yet discussed', value: 'Unknown / not yet discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Indicative range mentioned', value: 'Indicative range mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Budget allocated and approved', value: 'Budget allocated and approved', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Budget identified but unapproved', value: 'Budget identified but unapproved', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'No defined budget', value: 'No defined budget', icon: 'pi pi-times-circle', tone: 'invalid' },
    { label: 'Budget explicitly unavailable', value: 'Budget explicitly unavailable', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly readinessOptions: OptionItem[] = [
    { label: 'Unknown / unclear', value: 'Unknown / unclear', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Interest expressed, no urgency', value: 'Interest expressed, no urgency', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Actively evaluating solutions', value: 'Actively evaluating solutions', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Internal decision in progress', value: 'Internal decision in progress', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Ready to proceed pending final step', value: 'Ready to proceed pending final step', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Not planning to spend', value: 'Not planning to spend', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly timelineOptions: OptionItem[] = [
    { label: 'Unknown / not discussed', value: 'Unknown / not discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Rough timeline mentioned', value: 'Rough timeline mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Target date verbally confirmed', value: 'Target date verbally confirmed', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Decision date confirmed internally', value: 'Decision date confirmed internally', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Date missed / repeatedly pushed', value: 'Date missed / repeatedly pushed', icon: 'pi pi-times-circle', tone: 'invalid' },
    { label: 'No defined timeline', value: 'No defined timeline', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly problemOptions: OptionItem[] = [
    { label: 'Unknown / not validated', value: 'Unknown / not validated', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Mild inconvenience', value: 'Mild inconvenience', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Recognized operational problem', value: 'Recognized operational problem', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Critical business impact', value: 'Critical business impact', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Executive-level priority', value: 'Executive-level priority', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Problem acknowledged but deprioritized', value: 'Problem acknowledged but deprioritized', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly economicBuyerOptions: OptionItem[] = [
    { label: 'Unknown / not identified', value: 'Unknown / not identified', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Influencer identified', value: 'Influencer identified', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Buyer identified, not engaged', value: 'Buyer identified, not engaged', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Buyer engaged in discussion', value: 'Buyer engaged in discussion', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Buyer verbally supportive', value: 'Buyer verbally supportive', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Buyer explicitly not involved', value: 'Buyer explicitly not involved', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly icpFitOptions: OptionItem[] = [
    { label: 'Unknown / not assessed', value: 'Unknown / not assessed', icon: 'pi pi-question-circle', tone: 'unknown' },
    { label: 'Partial ICP fit', value: 'Partial ICP fit', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Strong ICP fit', value: 'Strong ICP fit', icon: 'pi pi-check-circle', tone: 'verified' },
    { label: 'Out-of-profile but exploratory', value: 'Out-of-profile but exploratory', icon: 'pi pi-info-circle', tone: 'assumed' },
    { label: 'Clearly out of ICP', value: 'Clearly out of ICP', icon: 'pi pi-times-circle', tone: 'invalid' }
  ];
  protected readonly evidenceOptions: OptionItem[] = [
    { label: 'No evidence yet', value: 'No evidence yet', icon: 'pi pi-minus-circle', tone: 'unknown' },
    { label: 'Direct buyer statement', value: 'Direct buyer statement', icon: 'pi pi-comment', tone: 'verified' },
    { label: 'Written confirmation', value: 'Written confirmation', icon: 'pi pi-file', tone: 'verified' },
    { label: 'Observed behaviour', value: 'Observed behaviour', icon: 'pi pi-eye', tone: 'assumed' },
    { label: 'Third-party confirmation', value: 'Third-party confirmation', icon: 'pi pi-users', tone: 'assumed' },
    { label: 'Inferred from context', value: 'Inferred from context', icon: 'pi pi-compass', tone: 'invalid' },
    { label: 'Historical / prior deal', value: 'Historical / prior deal', icon: 'pi pi-history', tone: 'neutral' }
  ];
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);
  protected aiScoring = signal(false);
  protected aiScoreNote = signal<string | null>(null);
  protected aiScoreSeverity = signal<'success' | 'info' | 'warn' | 'error'>('info');
  protected aiScoreConfidence = signal<number | null>(null);
  protected qualificationConfidenceLabel = signal<string | null>(null);
  protected qualificationConfidence = signal<number | null>(null);
  protected truthCoverage = signal<number | null>(null);
  protected assumptionsOutstanding = signal<number | null>(null);
  protected qualificationFeedback = signal<{
    confidenceLabel: string;
    weakestSignal: string | null;
    weakestState: string | null;
  } | null>(null);
  protected serverWeakestSignal = signal<string | null>(null);
  protected serverWeakestState = signal<string | null>(null);
  protected scoreBreakdown = signal<LeadScoreBreakdownItem[]>([]);
  protected riskFlags = signal<string[]>([]);
  protected routingReason = signal<string | null>(null);
  protected statusHistory = signal<LeadStatusHistoryItem[]>([]);
  protected cadenceTouches = signal<LeadCadenceTouch[]>([]);
  protected cadenceChannel: LeadCadenceChannel = 'Call';
  protected cadenceChannelOptions: CadenceChannelOption[] = [];
  protected cadenceOutcome = '';
  protected cadenceNextStepLocal: Date | null = null;
  protected cadenceSubmitting = signal(false);
  protected linkedAccountId = signal<string | null>(null);
  protected linkedContactId = signal<string | null>(null);
  protected linkedOpportunityId = signal<string | null>(null);
  protected firstTouchDueAtUtc = signal<string | null>(null);
  protected firstTouchedAtUtc = signal<string | null>(null);
  protected followUpHint = signal<string | null>(null);
  private readonly toastService = inject(AppToastService);

  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    this.cadenceNextStepLocal = this.defaultCadenceDueLocal();
    this.activeTab.set(this.getDefaultTab());
    const lead = history.state?.lead as Lead | undefined;
    this.loadOwners();
    this.loadCadenceChannels();
    if (this.editingId && lead) {
      this.prefillFromLead(lead);
      this.loadStatusHistory(this.editingId);
      this.loadCadenceTouches(this.editingId);
    } else if (this.editingId) {
      this.leadData.get(this.editingId).subscribe({
        next: (data) => {
          this.prefillFromLead(data);
          this.loadStatusHistory(this.editingId!);
          this.loadCadenceTouches(this.editingId!);
        },
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected setActiveTab(tab: 'overview' | 'qualification' | 'activity' | 'history') {
    this.activeTab.set(tab);
  }

  protected leadDisplayName(): string {
    const first = this.form.firstName?.trim() ?? '';
    const last = this.form.lastName?.trim() ?? '';
    return `${first} ${last}`.trim() || 'Lead';
  }

  protected qualificationRuleMessage(): string {
    return 'Unknown is neutral. Select at least 3 factors before setting to Qualified.';
  }

  protected qualificationInlineError(): string | null {
    if (this.form.status !== 'Qualified') return null;
    return this.countQualificationFactors() < 3 ? '3 qualification factors required to qualify.' : null;
  }

  protected qualificationTabBadge(): string | null {
    const count = this.riskFlags().length;
    return count ? `${count} risk` : null;
  }

  protected activityTabBadge(): string | null {
    const due = this.cadenceNextStepLocal;
    if (!due) return null;
    const now = new Date();
    if (due.getTime() < now.getTime()) {
      return 'Overdue';
    }
    return null;
  }

  protected logActivity(): void {
    if (!this.editingId) {
      return;
    }
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    const subject = fullName ? `Follow up: ${fullName}` : 'Lead follow-up';
    this.router.navigate(['/app/activities/new'], {
      queryParams: {
        relatedType: 'Lead',
        relatedId: this.editingId,
        subject
      }
    });
  }

  protected canConvertLead(): boolean {
    return this.isEditMode() && this.form.status === 'Qualified';
  }

  protected statusOptionsForView(): StatusOption[] {
    const isConverted = this.form.status === 'Converted';
    return this.statusOptions.map((option) => ({
      ...option,
      disabled: option.value === 'Converted' && !isConverted
    }));
  }

  protected hasLinkedRecords(): boolean {
    return !!(this.linkedAccountId() || this.linkedContactId() || this.linkedOpportunityId());
  }

  protected linkedAccountLink(): string | null {
    const id = this.linkedAccountId();
    return id ? `/app/customers/${id}/edit` : null;
  }

  protected linkedContactLink(): string | null {
    const id = this.linkedContactId();
    return id ? `/app/contacts/${id}/edit` : null;
  }

  protected linkedOpportunityLink(): string | null {
    const id = this.linkedOpportunityId();
    return id ? `/app/opportunities/${id}/edit` : null;
  }

  protected onConvertLead(): void {
    if (!this.editingId || !this.canConvertLead()) {
      return;
    }
    this.router.navigate(['/app/leads', this.editingId, 'convert']);
  }

  protected onSave() {
    if (!this.form.firstName || !this.form.lastName) {
      return;
    }

    const outcomeError = this.validateOutcome();
    if (outcomeError) {
      this.raiseToast('error', outcomeError);
      return;
    }

    const resolvedScore = this.form.autoScore ? this.computeAutoScore() : (this.form.score ?? 0);
    const nurtureFollowUpAtUtc =
      this.form.status === 'Nurture' ? this.localToUtcIso(this.form.nurtureFollowUpAtUtc) : undefined;
    const payload: SaveLeadRequest = {
      ...this.form,
      score: resolvedScore,
      ownerId: this.form.assignmentStrategy === 'Manual' ? this.form.ownerId : undefined,
      territory: this.form.assignmentStrategy === 'Territory' ? this.form.territory : this.form.territory,
      nurtureFollowUpAtUtc
    };
    if (this.form.autoScore) {
      this.form.score = resolvedScore;
    }

    this.saving.set(true);
    const isEdit = !!this.editingId;
    const request$: Observable<Lead | null> = isEdit
      ? this.leadData.update(this.editingId!, payload).pipe(map(() => null))
      : this.leadData.create(payload);

    request$.subscribe({
      next: (created) => {
        this.saving.set(false);
        if (!isEdit && created) {
          this.editingId = created.id;
          this.router.navigate(['/app/leads', created.id, 'edit'], { state: { lead: created } });
        }
        const message = isEdit ? 'Lead updated.' : 'Lead created.';
        this.raiseToast('success', message);
        this.updateQualificationFeedback();
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update lead.' : 'Unable to create lead.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private prefillFromLead(lead: Lead) {
    const [firstName, ...rest] = lead.name.split(' ');
    this.form = {
      firstName,
      lastName: rest.join(' '),
      companyName: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      score: lead.score ?? 0,
      autoScore: true,
      source: lead.source ?? '',
      jobTitle: lead.jobTitle ?? '',
      ownerId: lead.ownerId,
      assignmentStrategy: 'Manual',
      territory: lead.territory ?? '',
      disqualifiedReason: lead.disqualifiedReason ?? '',
      lossReason: lead.lossReason ?? '',
      lossCompetitor: lead.lossCompetitor ?? '',
      lossNotes: lead.lossNotes ?? '',
      nurtureFollowUpAtUtc: this.toDateValue(lead.nurtureFollowUpAtUtc),
      qualifiedNotes: lead.qualifiedNotes ?? '',
      budgetAvailability: lead.budgetAvailability || 'Unknown / not yet discussed',
      budgetEvidence: lead.budgetEvidence || 'No evidence yet',
      readinessToSpend: lead.readinessToSpend || 'Unknown / unclear',
      readinessEvidence: lead.readinessEvidence || 'No evidence yet',
      buyingTimeline: lead.buyingTimeline || 'Unknown / not discussed',
      timelineEvidence: lead.timelineEvidence || 'No evidence yet',
      problemSeverity: lead.problemSeverity || 'Unknown / not validated',
      problemEvidence: lead.problemEvidence || 'No evidence yet',
      economicBuyer: lead.economicBuyer || 'Unknown / not identified',
      economicBuyerEvidence: lead.economicBuyerEvidence || 'No evidence yet',
      icpFit: lead.icpFit || 'Unknown / not assessed',
      icpFitEvidence: lead.icpFitEvidence || 'No evidence yet'
    };
    this.linkedAccountId.set(lead.accountId ?? null);
    this.linkedContactId.set(lead.contactId ?? null);
    this.linkedOpportunityId.set(lead.convertedOpportunityId ?? null);
    this.firstTouchDueAtUtc.set(lead.firstTouchDueAtUtc ?? null);
    this.firstTouchedAtUtc.set(lead.firstTouchedAtUtc ?? null);
    this.routingReason.set(lead.routingReason ?? null);
    this.qualificationConfidenceLabel.set(lead.qualificationConfidenceLabel ?? null);
    this.qualificationConfidence.set(lead.qualificationConfidence ?? null);
    this.truthCoverage.set(lead.truthCoverage ?? null);
    this.assumptionsOutstanding.set(lead.assumptionsOutstanding ?? null);
    this.serverWeakestSignal.set(lead.weakestSignal ?? null);
    this.serverWeakestState.set(lead.weakestState ?? null);
    this.scoreBreakdown.set(lead.scoreBreakdown ?? []);
    this.riskFlags.set(lead.riskFlags ?? []);
    this.normalizeEvidence();
    this.updateQualificationFeedback(true);
    this.updateEpistemicSummary(true);
  }

  private loadStatusHistory(leadId: string) {
    this.leadData.getStatusHistory(leadId).subscribe({
      next: (history) => this.statusHistory.set(history),
      error: () => this.statusHistory.set([])
    });
  }

  private loadCadenceTouches(leadId: string) {
    this.leadData.getCadenceTouches(leadId).subscribe({
      next: (touches) => this.cadenceTouches.set(touches),
      error: () => this.cadenceTouches.set([])
    });
  }

  protected logCadenceTouch() {
    if (!this.editingId || this.cadenceSubmitting()) {
      return;
    }

    const outcome = this.cadenceOutcome.trim();
    if (!outcome) {
      this.raiseToast('error', 'Cadence outcome is required.');
      return;
    }

    const dueIso = this.localToUtcIso(this.cadenceNextStepLocal);
    if (!dueIso) {
      this.raiseToast('error', 'Next step due date is required.');
      return;
    }

    this.cadenceSubmitting.set(true);
    this.leadData
      .logCadenceTouch(this.editingId, {
        channel: this.cadenceChannel,
        outcome,
        nextStepDueAtUtc: dueIso
      })
      .subscribe({
        next: () => {
          this.cadenceSubmitting.set(false);
          this.cadenceOutcome = '';
          this.cadenceNextStepLocal = this.defaultCadenceDueLocal();
          this.loadCadenceTouches(this.editingId!);
          this.raiseToast('success', 'Cadence touch logged and next step scheduled.');
        },
        error: () => {
          this.cadenceSubmitting.set(false);
          this.raiseToast('error', 'Unable to log cadence touch.');
        }
      });
  }

  private defaultCadenceDueLocal(): Date {
    const due = new Date();
    due.setDate(due.getDate() + 2);
    due.setMinutes(due.getMinutes() - due.getTimezoneOffset());
    return due;
  }

  private localToUtcIso(localValue: string | Date | null | undefined): string | null {
    if (!localValue) return null;
    const parsed = localValue instanceof Date ? localValue : new Date(localValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  }

  private createEmptyForm(): SaveLeadRequest & { autoScore: boolean } {
    return {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      jobTitle: '',
      source: '',
      territory: '',
      status: 'New',
      score: 0,
      autoScore: true,
      assignmentStrategy: 'RoundRobin',
      disqualifiedReason: '',
      lossReason: '',
      lossCompetitor: '',
      lossNotes: '',
      nurtureFollowUpAtUtc: null,
      qualifiedNotes: '',
      budgetAvailability: 'Unknown / not yet discussed',
      budgetEvidence: 'No evidence yet',
      readinessToSpend: 'Unknown / unclear',
      readinessEvidence: 'No evidence yet',
      buyingTimeline: 'Unknown / not discussed',
      timelineEvidence: 'No evidence yet',
      problemSeverity: 'Unknown / not validated',
      problemEvidence: 'No evidence yet',
      economicBuyer: 'Unknown / not identified',
      economicBuyerEvidence: 'No evidence yet',
      icpFit: 'Unknown / not assessed',
      icpFitEvidence: 'No evidence yet'
    };
  }

  private loadOwners() {
    this.userAdminData.lookupActive(undefined, 200).subscribe({
      next: (items) => this.ownerOptions.set(this.mapOwnerOptions(items)),
      error: () => this.ownerOptions.set([])
    });
  }

  private mapOwnerOptions(users: Array<{ id: string; fullName: string }>): OwnerOption[] {
    return users.map((user) => ({
      label: user.fullName,
      value: user.id
    }));
  }

  private loadCadenceChannels() {
    this.leadData.getCadenceChannels().subscribe({
      next: (items) => {
        const options = items
          .filter((item) => item.isActive)
          .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
          .map((item) => ({ label: item.name, value: item.name }));
        this.cadenceChannelOptions = options;
        if (!options.some((opt) => opt.value === this.cadenceChannel)) {
          const fallback = items.find((item) => item.isDefault)?.name ?? options[0]?.value;
          if (fallback) {
            this.cadenceChannel = fallback;
          }
        }
      },
      error: () => {
        this.cadenceChannelOptions = [];
      }
    });
  }

  protected getSlaStatusLabel(): string {
    const due = this.firstTouchDueAtUtc();
    const touched = this.firstTouchedAtUtc();
    if (touched) return 'First touch completed';
    if (!due) return 'SLA not started';
    const dueDate = new Date(due);
    if (Number.isNaN(dueDate.getTime())) return 'SLA pending';
    return dueDate.getTime() < Date.now() ? 'SLA overdue' : 'SLA due';
  }

  protected getSlaTone(): 'overdue' | 'due' | 'done' | 'pending' {
    const due = this.firstTouchDueAtUtc();
    const touched = this.firstTouchedAtUtc();
    if (touched) return 'done';
    if (!due) return 'pending';
    const dueDate = new Date(due);
    if (Number.isNaN(dueDate.getTime())) return 'pending';
    return dueDate.getTime() < Date.now() ? 'overdue' : 'due';
  }

  protected computeAutoScore(): number {
    const qualificationScore = this.computeQualificationScore();
    if (qualificationScore !== null) {
      return qualificationScore;
    }

    const email = this.form.email?.trim();
    const phone = this.form.phone?.trim();
    const company = this.form.companyName?.trim();
    const jobTitle = this.form.jobTitle?.trim();
    const source = this.form.source?.trim();
    const territory = this.form.territory?.trim();
    const hasSignal = !!(email || phone || company || jobTitle || source || territory);

    if (!hasSignal) {
      return this.form.score ?? 0;
    }

    let score = 20;
    if (email) score += 20;
    if (phone) score += 15;
    if (company) score += 10;
    if (jobTitle) score += 10;
    if (source) score += 10;
    if (territory) score += 5;

    return Math.min(100, Math.max(0, score));
  }

  private computeQualificationScore(): number | null {
    const factors = [
      this.form.budgetAvailability,
      this.form.readinessToSpend,
      this.form.buyingTimeline,
      this.form.problemSeverity,
      this.form.economicBuyer,
      this.form.icpFit
    ];
    const filled = factors.filter((value) => this.isMeaningfulFactor(value)).length;
    if (filled === 0) return null;

    return (
      this.getBudgetScore(this.form.budgetAvailability)
      + this.getReadinessScore(this.form.readinessToSpend)
      + this.getTimelineScore(this.form.buyingTimeline)
      + this.getProblemScore(this.form.problemSeverity)
      + this.getEconomicBuyerScore(this.form.economicBuyer)
      + this.getIcpFitScore(this.form.icpFit)
    );
  }

  private getBudgetScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'budget allocated and approved':
        return 25;
      case 'budget identified but unapproved':
      case 'indicative range mentioned':
        return 15;
      case 'no defined budget':
        return 5;
      default:
        return 0;
    }
  }

  private getReadinessScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'internal decision in progress':
      case 'ready to proceed pending final step':
        return 20;
      case 'actively evaluating solutions':
        return 15;
      case 'interest expressed, no urgency':
        return 8;
      default:
        return 0;
    }
  }

  private getTimelineScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'decision date confirmed internally':
        return 15;
      case 'target date verbally confirmed':
        return 12;
      case 'rough timeline mentioned':
        return 6;
      default:
        return 0;
    }
  }

  private getProblemScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'executive-level priority':
        return 20;
      case 'critical business impact':
        return 20;
      case 'recognized operational problem':
        return 8;
      case 'mild inconvenience':
        return 2;
      default:
        return 0;
    }
  }

  private getEconomicBuyerScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'buyer engaged in discussion':
      case 'buyer verbally supportive':
        return 10;
      case 'buyer identified, not engaged':
      case 'influencer identified':
        return 5;
      default:
        return 0;
    }
  }

  private getIcpFitScore(value?: string | null): number {
    switch (value?.toLowerCase()) {
      case 'strong icp fit':
        return 10;
      case 'partial icp fit':
      case 'out-of-profile but exploratory':
        return 5;
      default:
        return 0;
    }
  }

  protected onAiScore() {
    if (!this.editingId || this.aiScoring()) {
      return;
    }

    this.aiScoring.set(true);
    this.leadData.aiScore(this.editingId).subscribe({
      next: (result) => {
        this.aiScoring.set(false);
        this.form.score = result.score;
        this.form.autoScore = false;
        const confidencePct = Math.round((result.confidence ?? 0) * 100);
        this.aiScoreConfidence.set(confidencePct);
        this.aiScoreNote.set(`Score refreshed to ${result.score}${result.rationale ? ` - ${result.rationale}` : ''}`.trim());
        this.aiScoreSeverity.set(this.resolveAiSeverity(result.score));
        this.raiseToast('success', `Score refreshed to ${result.score}.`);
      },
      error: () => {
        
        
        this.aiScoring.set(false);
        this.raiseToast('error', 'Unable to refresh score.');
      }
    });
  }

  private resolveAiSeverity(score: number): 'success' | 'info' | 'warn' | 'error' {
    if (score >= 70) return 'success';
    if (score >= 45) return 'info';
    if (score >= 25) return 'warn';
    return 'error';
  }

  protected aiScoreClass() {
    return `is-${this.aiScoreSeverity()}`;
  }

  protected aiScoreIcon() {
    switch (this.aiScoreSeverity()) {
      case 'success':
        return 'pi-check-circle';
      case 'warn':
        return 'pi-exclamation-triangle';
      case 'error':
        return 'pi-times-circle';
      default:
        return 'pi-info-circle';
    }
  }

  protected aiScoreConfidenceLabel() {
    const confidence = this.aiScoreConfidence();
    if (confidence === null) return null;
    if (confidence >= 75) return 'High confidence';
    if (confidence >= 45) return 'Medium confidence';
    return 'Low confidence';
  }

  protected qualificationConfidencePercent(): number {
    const serverConfidence = this.qualificationConfidence();
    if (serverConfidence !== null) {
      return Math.round(serverConfidence * 100);
    }
    const count = this.countQualificationFactors();
    return Math.round((count / 6) * 100);
  }

  protected qualificationConfidenceHint(): string | null {
    const percent = this.qualificationConfidencePercent();
    if (percent >= 80) return null;
    return 'Improve confidence by completing more qualification factors.';
  }

  protected scoreItemClass(item: LeadScoreBreakdownItem): string {
    if (item.score === 0) return 'is-zero';
    if (item.score >= item.maxScore) return 'is-full';
    return '';
  }

  protected statusSeverity(status: LeadStatus | string) {
    switch (status) {
      case 'Qualified':
      case 'Converted':
        return 'success';
      case 'Contacted':
      case 'Nurture':
        return 'info';
      case 'Disqualified':
      case 'Lost':
        return 'danger';
      default:
        return 'warn';
    }
  }

  private validateOutcome(): string | null {
    if (this.form.status === 'Qualified' && !this.form.qualifiedNotes?.trim()) {
      return 'Qualification notes are required when qualifying a lead.';
    }

    if (this.form.status === 'Qualified' && this.countQualificationFactors() < 3) {
      return 'At least 3 qualification factors are required before marking a lead as Qualified.';
    }

    if (this.form.status === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
      return 'Nurture follow-up date is required when setting a lead to Nurture.';
    }

    if ((this.form.status === 'Lost' || this.form.status === 'Disqualified') && !this.form.disqualifiedReason?.trim()) {
      return 'Disqualified reason is required when closing a lead.';
    }

    return null;
  }

  private countQualificationFactors(): number {
    const factors = [
      this.form.budgetAvailability,
      this.form.readinessToSpend,
      this.form.buyingTimeline,
      this.form.problemSeverity,
      this.form.economicBuyer,
      this.form.icpFit
    ];
    return factors.filter((value) => this.isMeaningfulFactor(value)).length;
  }

  private isMeaningfulFactor(value?: string | null): boolean {
    if (!value) return false;
    return value.trim().length > 0 && !this.isUnknownValue(value);
  }

  protected onQualificationFactorChange(): void {
    this.normalizeEvidence();
    this.applyFollowUpDefaults();
    this.updateQualificationFeedback();
    this.updateEpistemicSummary();
  }

  protected isEvidenceDisabled(value?: string | null): boolean {
    if (!value) return true;
    return this.isUnknownValue(value);
  }

  private isUnknownValue(value?: string | null): boolean {
    if (!value) return true;
    return value.trim().toLowerCase().includes('unknown');
  }

  private normalizeEvidence(): void {
    if (this.isEvidenceDisabled(this.form.budgetAvailability)) {
      this.form.budgetEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.readinessToSpend)) {
      this.form.readinessEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.buyingTimeline)) {
      this.form.timelineEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.problemSeverity)) {
      this.form.problemEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.economicBuyer)) {
      this.form.economicBuyerEvidence = 'No evidence yet';
    }
    if (this.isEvidenceDisabled(this.form.icpFit)) {
      this.form.icpFitEvidence = 'No evidence yet';
    }
  }

  private updateQualificationFeedback(preferServer = false): void {
    const factors = this.getQualificationFactors();
    const weakest = this.getWeakestFactor(factors);
    const serverWeakestSignal = this.serverWeakestSignal();
    const serverWeakestState = this.serverWeakestState();
    const confidenceLabel = this.deriveConfidenceLabel(factors);
    this.qualificationFeedback.set({
      confidenceLabel,
      weakestSignal: preferServer && serverWeakestSignal ? serverWeakestSignal : weakest?.label ?? null,
      weakestState: preferServer && serverWeakestState ? serverWeakestState : weakest?.state ?? null
    });
  }

  private updateEpistemicSummary(preferServer = false): void {
    const factors = this.getQualificationFactors();
    const computedTruthCoverage = this.computeTruthCoverage(factors);
    const computedAssumptions = this.computeAssumptionsOutstanding(factors);

    if (preferServer) {
      this.truthCoverage.set(this.truthCoverage() ?? computedTruthCoverage);
      this.assumptionsOutstanding.set(this.assumptionsOutstanding() ?? computedAssumptions);
    } else {
      this.truthCoverage.set(computedTruthCoverage);
      this.assumptionsOutstanding.set(computedAssumptions);
    }
  }

  protected truthCoveragePercent(): number {
    const coverage = this.truthCoverage();
    if (coverage === null || Number.isNaN(coverage)) return 0;
    return Math.round(coverage * 100);
  }

  protected assumptionsOutstandingLabel(): string {
    const count = this.assumptionsOutstanding();
    if (!count) return '0 assumptions';
    return `${count} assumption${count === 1 ? '' : 's'}`;
  }

  private computeTruthCoverage(factors: Array<{ state: string }>): number {
    if (!factors.length) return 0;
    const verifiedCount = factors.filter((factor) => factor.state === 'Verified').length;
    return verifiedCount / factors.length;
  }

  private computeAssumptionsOutstanding(factors: Array<{ label: string; state: string }>): number {
    const highImpactLabels = new Set(['Budget availability', 'Buying timeline', 'Economic buyer']);
    return factors.filter((factor) => highImpactLabels.has(factor.label) && (factor.state === 'Unknown' || factor.state === 'Assumed')).length;
  }

  private getQualificationFactors(): Array<{ label: string; state: string; weight: number }> {
    return [
      this.getFactorState('Budget availability', this.form.budgetAvailability, this.budgetOptions),
      this.getFactorState('Readiness to spend', this.form.readinessToSpend, this.readinessOptions),
      this.getFactorState('Buying timeline', this.form.buyingTimeline, this.timelineOptions),
      this.getFactorState('Problem severity', this.form.problemSeverity, this.problemOptions),
      this.getFactorState('Economic buyer', this.form.economicBuyer, this.economicBuyerOptions),
      this.getFactorState('ICP fit', this.form.icpFit, this.icpFitOptions)
    ];
  }

  private getFactorState(
    label: string,
    value: string | null | undefined,
    options: OptionItem[]
  ): { label: string; state: string; weight: number } {
    const tone = this.resolveTone(value, options);
    const weight = this.toneWeight(tone);
    return { label, state: this.toneLabel(tone), weight };
  }

  private resolveTone(value: string | null | undefined, options: OptionItem[]): OptionItem['tone'] {
    if (!value) return 'unknown';
    const match = options.find((option) => option.value === value);
    return match?.tone ?? (this.isUnknownValue(value) ? 'unknown' : 'assumed');
  }

  private toneWeight(tone: OptionItem['tone']): number {
    switch (tone) {
      case 'verified':
        return 3;
      case 'assumed':
        return 2;
      case 'unknown':
        return 1;
      case 'invalid':
        return 0;
      default:
        return 2;
    }
  }

  private toneLabel(tone: OptionItem['tone']): string {
    switch (tone) {
      case 'verified':
        return 'Verified';
      case 'assumed':
        return 'Assumed';
      case 'invalid':
        return 'Invalid';
      default:
        return 'Unknown';
    }
  }

  private getWeakestFactor(factors: Array<{ label: string; state: string; weight: number }>) {
    return factors.reduce((weakest, current) => {
      if (!weakest) return current;
      if (current.weight < weakest.weight) return current;
      return weakest;
    }, null as { label: string; state: string; weight: number } | null);
  }

  private deriveConfidenceLabel(factors: Array<{ weight: number }>): string {
    if (!factors.length) return 'Neutral';
    const average = factors.reduce((sum, factor) => sum + factor.weight, 0) / factors.length;
    if (average >= 2.6) return 'High';
    if (average >= 1.6) return 'Medium';
    return 'Low';
  }

  private applyFollowUpDefaults(): void {
    const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
    const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';
    let hint: string | null = null;

    if (readiness === 'not planning to spend') {
      if (!this.cadenceOutcome.trim()) {
        this.cadenceOutcome = 'Nurture reminder';
      }
      const due = new Date();
      due.setDate(due.getDate() + 14);
      if (!this.cadenceNextStepLocal || this.cadenceNextStepLocal.getTime() > due.getTime()) {
        this.cadenceNextStepLocal = due;
      }
      hint = 'Readiness is “Not planning to spend.” Defaulting follow-up to nurture reminder.';
    }

    if (timeline.includes('target date verbally confirmed')) {
      const due = new Date();
      due.setDate(due.getDate() + 1);
      if (!this.cadenceNextStepLocal || this.cadenceNextStepLocal.getTime() > due.getTime()) {
        this.cadenceNextStepLocal = due;
      }
      hint = 'Timeline has a confirmed target date. Schedule the next step within SLA.';
    }

    this.followUpHint.set(hint);
  }

  private getDefaultTab(): 'overview' | 'qualification' | 'activity' | 'history' {
    if (!this.isEditMode()) {
      return 'overview';
    }
    const roles = this.authService.currentUser()?.roles ?? [];
    const normalized = roles.map((role) => role.toLowerCase());
    const isManager = normalized.some((role) => role.includes('manager') || role.includes('director') || role.includes('vp') || role.includes('admin'));
    if (normalized.length === 0) {
      return 'overview';
    }
    return isManager ? 'overview' : 'qualification';
  }

  private toDateValue(value?: string): Date | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }
}
