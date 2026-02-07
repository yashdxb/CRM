import { Component, inject, model, output, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { QuickAddType } from '../../core/command-palette';
import { NotificationService } from '../../core/notifications';
import { LeadDataService, SaveLeadRequest } from '../../crm/features/leads/services/lead-data.service';
import { ContactDataService } from '../../crm/features/contacts/services/contact-data.service';
import { CustomerDataService } from '../../crm/features/customers/services/customer-data.service';
import { OpportunityDataService } from '../../crm/features/opportunities/services/opportunity-data.service';
import { ActivityDataService } from '../../crm/features/activities/services/activity-data.service';
import { UpsertActivityRequest } from '../../crm/features/activities/models/activity.model';
import { Option } from '../navigation';

@Component({
  selector: 'app-quick-add-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: "./quick-add-modal.component.html",
  styleUrl: './quick-add-modal.component.scss'
})
export class QuickAddModalComponent {
  private readonly notificationService = inject(NotificationService);
  private readonly leadData = inject(LeadDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly activityData = inject(ActivityDataService);

  readonly visible = model(false);
  readonly initialType = model<QuickAddType>('lead');
  readonly close = output<void>();
  readonly created = output<void>();

  protected quickAddType: 'lead' | 'contact' | 'activity' = 'lead';
  protected readonly quickAddTypes: Option<'lead' | 'contact' | 'activity'>[] = [
    { label: 'Lead', value: 'lead' },
    { label: 'Contact', value: 'contact' },
    { label: 'Activity', value: 'activity' }
  ];
  
  protected quickAddLeadName = '';
  protected quickAddLeadCompany = '';
  protected quickAddLeadEmail = '';
  protected quickAddLeadPhone = '';
  protected quickAddContactName = '';
  protected quickAddContactEmail = '';
  protected quickAddContactPhone = '';
  protected quickAddContactAccountId: string | null = null;
  protected quickAddActivitySubject = '';
  protected quickAddActivityType: UpsertActivityRequest['type'] = 'Task';
  protected quickAddActivityPriority: UpsertActivityRequest['priority'] = 'Normal';
  protected quickAddActivityDueDate?: string | Date;
  protected quickAddActivityOutcome = '';
  protected quickAddActivityNextStepSubject = '';
  protected quickAddActivityNextStepDueDate?: string | Date;
  protected quickAddActivityRelationType: UpsertActivityRequest['relatedEntityType'] = 'Account';
  protected quickAddActivityRelationId: string | null = null;
  
  readonly saving = signal(false);
  readonly accountOptions = signal<Option<string>[]>([]);
  readonly contactOptions = signal<Option<string>[]>([]);
  readonly opportunityOptions = signal<Option<string>[]>([]);
  
  protected readonly activityTypeOptions: Option<UpsertActivityRequest['type']>[] = [
    { label: 'Task', value: 'Task' },
    { label: 'Call', value: 'Call' },
    { label: 'Email', value: 'Email' },
    { label: 'Meeting', value: 'Meeting' }
  ];
  protected readonly activityPriorityOptions: Option<NonNullable<UpsertActivityRequest['priority']>>[] = [
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' }
  ];
  protected readonly activityRelationOptions: Option<NonNullable<UpsertActivityRequest['relatedEntityType']>>[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Opportunity', value: 'Opportunity' }
  ];

  open(type?: QuickAddType) {
    this.resetForm(type);
    this.loadLookups();
  }

  protected onQuickAddRelationTypeChange(_value?: UpsertActivityRequest['relatedEntityType']) {
    this.quickAddActivityRelationId = null;
  }

  protected canSubmitQuickAdd() {
    if (this.quickAddType === 'lead') {
      return !!this.quickAddLeadName.trim();
    }
    if (this.quickAddType === 'contact') {
      return !!this.quickAddContactName.trim();
    }
    return !!this.quickAddActivitySubject.trim()
      && !!this.quickAddActivityOutcome.trim()
      && !!this.quickAddActivityNextStepSubject.trim()
      && !!this.quickAddActivityNextStepDueDate;
  }

  protected submitQuickAdd() {
    if (this.saving()) return;

    this.saving.set(true);
    if (this.quickAddType === 'lead') {
      const { firstName, lastName } = this.splitName(this.quickAddLeadName);
      const payload: SaveLeadRequest = {
        firstName,
        lastName,
        companyName: this.quickAddLeadCompany || undefined,
        email: this.quickAddLeadEmail || undefined,
        phone: this.quickAddLeadPhone || undefined,
        status: 'New'
      };
      this.leadData.create(payload).subscribe({
        next: () => this.finishQuickAdd('Lead created', payload.firstName),
        error: () => this.failQuickAdd('Lead')
      });
      return;
    }

    if (this.quickAddType === 'contact') {
      const { firstName, lastName } = this.splitName(this.quickAddContactName);
      this.contactData.create({
        firstName,
        lastName,
        email: this.quickAddContactEmail || undefined,
        phone: this.quickAddContactPhone || undefined,
        accountId: this.quickAddContactAccountId || undefined
      }).subscribe({
        next: () => this.finishQuickAdd('Contact created', `${firstName} ${lastName}`.trim()),
        error: () => this.failQuickAdd('Contact')
      });
      return;
    }

    const dueDate =
      this.quickAddActivityDueDate instanceof Date
        ? this.quickAddActivityDueDate.toISOString()
        : this.quickAddActivityDueDate;
    const nextStepDueDate =
      this.quickAddActivityNextStepDueDate instanceof Date
        ? this.quickAddActivityNextStepDueDate.toISOString()
        : this.quickAddActivityNextStepDueDate;
    const activityPayload: UpsertActivityRequest = {
      subject: this.quickAddActivitySubject,
      type: this.quickAddActivityType,
      priority: this.quickAddActivityPriority,
      dueDateUtc: dueDate,
      outcome: this.quickAddActivityOutcome,
      nextStepSubject: this.quickAddActivityNextStepSubject,
      nextStepDueDateUtc: nextStepDueDate,
      relatedEntityType: this.quickAddActivityRelationType,
      relatedEntityId: this.quickAddActivityRelationId || undefined
    };
    this.activityData.create(activityPayload).subscribe({
      next: () => this.finishQuickAdd('Activity created', activityPayload.subject),
      error: () => this.failQuickAdd('Activity')
    });
  }

  private finishQuickAdd(title: string, name?: string) {
    this.saving.set(false);
    this.notificationService.success(title, name ? `${name} saved successfully.` : 'Saved successfully.');
    this.created.emit();
    this.close.emit();
  }

  private failQuickAdd(label: string) {
    this.saving.set(false);
    this.notificationService.error(`${label} not saved`, 'Please try again.');
  }

  private resetForm(type?: QuickAddType) {
    this.quickAddType = type ?? 'lead';
    this.quickAddLeadName = '';
    this.quickAddLeadCompany = '';
    this.quickAddLeadEmail = '';
    this.quickAddLeadPhone = '';
    this.quickAddContactName = '';
    this.quickAddContactEmail = '';
    this.quickAddContactPhone = '';
    this.quickAddContactAccountId = null;
    this.quickAddActivitySubject = '';
    this.quickAddActivityType = 'Task';
    this.quickAddActivityPriority = 'Normal';
    this.quickAddActivityDueDate = undefined;
    this.quickAddActivityOutcome = '';
    this.quickAddActivityNextStepSubject = '';
    this.quickAddActivityNextStepDueDate = undefined;
    this.quickAddActivityRelationType = 'Account';
    this.quickAddActivityRelationId = null;
  }

  private splitName(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { firstName: 'Unknown', lastName: '' };
    }
    const parts = trimmed.split(/\s+/);
    const firstName = parts.shift() ?? '';
    const lastName = parts.join(' ');
    return { firstName, lastName };
  }

  private loadLookups() {
    if (!this.accountOptions().length) {
      this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.accountOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
    if (!this.contactOptions().length) {
      this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.contactOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
    if (!this.opportunityOptions().length) {
      this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.opportunityOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
  }
}
