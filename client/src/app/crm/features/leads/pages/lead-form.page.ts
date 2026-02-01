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

import { map } from 'rxjs';

import { Lead, LeadAssignmentStrategy, LeadCadenceChannel, LeadCadenceTouch, LeadStatus, LeadStatusHistoryItem } from '../models/lead.model';
import { LeadDataService, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

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
    TagModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./lead-form.page.html",
  styleUrls: ["./lead-form.page.scss"]
})
export class LeadFormPage implements OnInit {
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
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);
  protected aiScoring = signal(false);
  protected aiScoreNote = signal<string | null>(null);
  protected aiScoreSeverity = signal<'success' | 'info' | 'warn' | 'error'>('info');
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
  private readonly toastService = inject(AppToastService);

  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    this.cadenceNextStepLocal = this.defaultCadenceDueLocal();
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
    const request$ = this.editingId
      ? this.leadData.update(this.editingId, payload).pipe(map(() => null))
      : this.leadData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Lead updated.' : 'Lead created.';
        this.raiseToast('success', message);
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
      autoScore: false,
      source: lead.source ?? '',
      jobTitle: lead.jobTitle ?? '',
      ownerId: lead.ownerId,
      assignmentStrategy: 'Manual',
      territory: lead.territory ?? '',
      disqualifiedReason: lead.disqualifiedReason ?? '',
      nurtureFollowUpAtUtc: this.toDateValue(lead.nurtureFollowUpAtUtc),
      qualifiedNotes: lead.qualifiedNotes ?? ''
    };
    this.linkedAccountId.set(lead.accountId ?? null);
    this.linkedContactId.set(lead.contactId ?? null);
    this.linkedOpportunityId.set(lead.convertedOpportunityId ?? null);
    this.firstTouchDueAtUtc.set(lead.firstTouchDueAtUtc ?? null);
    this.firstTouchedAtUtc.set(lead.firstTouchedAtUtc ?? null);
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
      nurtureFollowUpAtUtc: null,
      qualifiedNotes: ''
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

  protected onAiScore() {
    debugger;
    if (!this.editingId || this.aiScoring()) {
      return;
    }

    this.aiScoring.set(true);
    this.leadData.aiScore(this.editingId).subscribe({
      next: (result) => {
        this.aiScoring.set(false);
        this.form.score = result.score;
        this.form.autoScore = false;
        const confidencePct = Math.round(result.confidence * 100);
        this.aiScoreNote.set(`AI score ${result.score} - ${confidencePct}% confidence. ${result.rationale || ''}`.trim());
        this.aiScoreSeverity.set(this.resolveAiSeverity(result.score));
        this.raiseToast('success', `AI score updated to ${result.score}.`);
      },
      error: () => {
        
        
        this.aiScoring.set(false);
        this.raiseToast('error', 'Unable to run AI scoring.');
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

    if (this.form.status === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
      return 'Nurture follow-up date is required when setting a lead to Nurture.';
    }

    if ((this.form.status === 'Lost' || this.form.status === 'Disqualified') && !this.form.disqualifiedReason?.trim()) {
      return 'Disqualified reason is required when closing a lead.';
    }

    return null;
  }

  private toDateValue(value?: string): Date | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }
}
