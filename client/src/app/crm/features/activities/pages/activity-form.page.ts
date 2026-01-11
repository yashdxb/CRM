import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { map } from 'rxjs';

import { Activity, ActivityType, UpsertActivityRequest } from '../models/activity.model';
import { ActivityDataService } from '../services/activity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Customer } from '../../customers/models/customer.model';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { LeadDataService } from '../../leads/services/lead-data.service';
import { Lead } from '../../leads/models/lead.model';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserListItem } from '../../settings/models/user-admin.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readUserId } from '../../../../core/auth/token.utils';

interface Option<T = string> {
  label: string;
  value: T;
  icon: string;
}

interface ActivityTemplate {
  id: string;
  label: string;
  defaults: Partial<UpsertActivityRequest>;
}

@Component({
  selector: 'app-activity-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./activity-form.page.html",
  styleUrls: ["./activity-form.page.scss"]
})
export class ActivityFormPage implements OnInit {
  protected readonly typeOptions: Option<ActivityType>[] = [
    { label: 'Task', value: 'Task', icon: 'pi-check-square' },
    { label: 'Call', value: 'Call', icon: 'pi-phone' },
    { label: 'Email', value: 'Email', icon: 'pi-envelope' },
    { label: 'Meeting', value: 'Meeting', icon: 'pi-users' }
  ];

  protected readonly priorityOptions: Option<NonNullable<UpsertActivityRequest['priority']>>[] = [
    { label: 'High', value: 'High', icon: 'pi-arrow-up' },
    { label: 'Normal', value: 'Normal', icon: 'pi-minus' },
    { label: 'Low', value: 'Low', icon: 'pi-arrow-down' }
  ];

  protected readonly statusOptions: Option<'Open' | 'Completed'>[] = [
    { label: 'Open', value: 'Open', icon: 'pi-clock' },
    { label: 'Completed', value: 'Completed', icon: 'pi-check-circle' }
  ];

  protected readonly relationOptions: Option<NonNullable<UpsertActivityRequest['relatedEntityType']>>[] = [
    { label: 'Account', value: 'Account', icon: 'pi-building' },
    { label: 'Contact', value: 'Contact', icon: 'pi-id-card' },
    { label: 'Opportunity', value: 'Opportunity', icon: 'pi-briefcase' },
    { label: 'Lead', value: 'Lead', icon: 'pi-user' }
  ];
  protected readonly templateOptions: Option<string>[] = [
    { label: 'No template', value: 'none', icon: 'pi-sliders-h' },
    { label: 'Discovery call', value: 'call-discovery', icon: 'pi-phone' },
    { label: 'Stakeholder meeting', value: 'meeting-stakeholder', icon: 'pi-users' },
    { label: 'Follow-up task', value: 'follow-up', icon: 'pi-check-square' }
  ];
  private readonly activityTemplates: ActivityTemplate[] = [
    {
      id: 'call-discovery',
      label: 'Discovery call',
      defaults: {
        subject: 'Discovery call',
        type: 'Call',
        priority: 'High',
        description: 'Confirm pain points, decision process, and next steps.'
      }
    },
    {
      id: 'meeting-stakeholder',
      label: 'Stakeholder meeting',
      defaults: {
        subject: 'Stakeholder sync',
        type: 'Meeting',
        priority: 'Normal',
        description: 'Agenda: recap needs, align stakeholders, and lock the next action.'
      }
    },
    {
      id: 'follow-up',
      label: 'Follow-up task',
      defaults: {
        subject: 'Follow-up',
        type: 'Task',
        priority: 'Normal',
        description: 'Send recap, share collateral, and confirm next meeting.'
      }
    }
  ];

  protected form: UpsertActivityRequest = this.createEmptyForm();
  protected saving = signal(false);
  private readonly toastService = inject(AppToastService);
  protected customerOptions: Option<string>[] = [];
  protected contactOptions: Option<string>[] = [];
  protected opportunityOptions: Option<string>[] = [];
  protected leadOptions: Option<string>[] = [];
  protected ownerOptions: Option<string>[] = [];
  protected selectedTemplate = 'none';
  protected activityStatus: 'Open' | 'Completed' = 'Open';
  private pendingAccountOption: Option<string> | null = null;
  private pendingContactOption: Option<string> | null = null;
  private pendingOpportunityOption: Option<string> | null = null;
  private pendingLeadOption: Option<string> | null = null;
  private pendingOwnerOption: Option<string> | null = null;

  private readonly activityData = inject(ActivityDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const activity = history.state?.activity as Activity | undefined;
    if (this.editingId && activity) {
      this.prefill(activity);
    }

    if (this.editingId) {
      this.loadActivityForEdit(this.editingId);
    }

    if (!this.editingId) {
      this.applyContextFromQuery();
    }
    this.loadOwners();
    this.loadLookups();
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected relatedLink(): string | null {
    const id = this.form.relatedEntityId;
    const type = this.form.relatedEntityType;
    if (!id || !type) {
      return null;
    }
    switch (type) {
      case 'Account':
        return `/app/customers/${id}/edit`;
      case 'Contact':
        return `/app/contacts/${id}/edit`;
      case 'Opportunity':
        return `/app/opportunities/${id}/edit`;
      case 'Lead':
        return `/app/leads/${id}/edit`;
      default:
        return null;
    }
  }

  protected relatedLabel(): string {
    const id = this.form.relatedEntityId;
    const type = this.form.relatedEntityType;
    if (!id || !type) {
      return 'No related record selected yet.';
    }
    const label = this.resolveRelatedName(type, id);
    return label ? `${type}: ${label}` : `${type} record`;
  }

  private resolveRelatedName(type: NonNullable<UpsertActivityRequest['relatedEntityType']>, id: string): string | null {
    const options = (() => {
      switch (type) {
        case 'Account':
          return this.customerOptions;
        case 'Contact':
          return this.contactOptions;
        case 'Opportunity':
          return this.opportunityOptions;
        case 'Lead':
          return this.leadOptions;
        default:
          return [];
      }
    })();
    return options.find((option) => option.value === id)?.label ?? null;
  }

  protected onRelationTypeChange(_value?: UpsertActivityRequest['relatedEntityType']) {
    this.form.relatedEntityId = undefined;
  }

  protected onTemplateChange(value?: string | null) {
    const selected = value ?? 'none';
    this.selectedTemplate = selected;
    if (selected === 'none') {
      return;
    }

    const template = this.activityTemplates.find((item) => item.id === selected);
    if (!template) {
      return;
    }

    this.form = {
      ...this.form,
      subject: template.defaults.subject ?? this.form.subject,
      type: template.defaults.type ?? this.form.type,
      priority: template.defaults.priority ?? this.form.priority,
      description: template.defaults.description ?? this.form.description
    };
  }

  protected onStatusChange(status?: 'Open' | 'Completed' | null) {
    const nextStatus = status ?? 'Open';
    this.activityStatus = nextStatus;
    if (nextStatus === 'Completed') {
      if (!this.form.completedDateUtc) {
        this.form.completedDateUtc = new Date();
      }
      return;
    }
    this.form.completedDateUtc = undefined;
  }

  protected onSave() {
    if (!this.form.subject) {
      return;
    }

    this.saving.set(true);
    const payload: UpsertActivityRequest = {
      ...this.form,
      completedDateUtc: this.activityStatus === 'Completed' ? (this.form.completedDateUtc ?? new Date()) : undefined
    };
    const request$ = this.editingId
      ? this.activityData.update(this.editingId, payload).pipe(map(() => null))
      : this.activityData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Activity updated.' : 'Activity created.';
        this.raiseToast('success', message);
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update activity.' : 'Unable to create activity.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadLookups() {
    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      queueMicrotask(() => {
        this.customerOptions = res.items.map((c: Customer) => ({
          label: c.name,
          value: c.id,
          icon: 'pi-building'
        }));
        if (this.pendingAccountOption) {
          const exists = this.customerOptions.some((option) => option.value === this.pendingAccountOption?.value);
          if (!exists) {
            this.customerOptions = [this.pendingAccountOption, ...this.customerOptions];
          }
          this.pendingAccountOption = null;
        }
        this.cdr.markForCheck();
      });
    });
    this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      queueMicrotask(() => {
        this.contactOptions = res.items.map((c: Contact) => ({
          label: c.name,
          value: c.id,
          icon: 'pi-id-card'
        }));
        if (this.pendingContactOption) {
          const exists = this.contactOptions.some((option) => option.value === this.pendingContactOption?.value);
          if (!exists) {
            this.contactOptions = [this.pendingContactOption, ...this.contactOptions];
          }
          this.pendingContactOption = null;
        }
        this.cdr.markForCheck();
      });
    });
    this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      queueMicrotask(() => {
        this.opportunityOptions = res.items.map((o: Opportunity) => ({
          label: o.name,
          value: o.id,
          icon: 'pi-briefcase'
        }));
        if (this.pendingOpportunityOption) {
          const exists = this.opportunityOptions.some((option) => option.value === this.pendingOpportunityOption?.value);
          if (!exists) {
            this.opportunityOptions = [this.pendingOpportunityOption, ...this.opportunityOptions];
          }
          this.pendingOpportunityOption = null;
        }
        this.cdr.markForCheck();
      });
    });
    this.leadData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      queueMicrotask(() => {
        this.leadOptions = res.items.map((lead: Lead) => ({
          label: lead.company ? `${lead.name} · ${lead.company}` : lead.name,
          value: lead.id,
          icon: 'pi-user'
        }));
        if (this.pendingLeadOption) {
          const exists = this.leadOptions.some((option) => option.value === this.pendingLeadOption?.value);
          if (!exists) {
            this.leadOptions = [this.pendingLeadOption, ...this.leadOptions];
          }
          this.pendingLeadOption = null;
        }
        this.cdr.markForCheck();
      });
    });
  }

  private loadActivityForEdit(id: string) {
    this.activityData.get(id).subscribe({
      next: (activity) => this.prefill(activity),
      error: () => {
        this.raiseToast('error', 'Unable to load activity.');
        this.router.navigate(['/app/activities']);
      }
    });
  }

  private prefill(activity: Activity) {
    const dueDate = activity.dueDateUtc ? new Date(activity.dueDateUtc) : undefined;
    const completedDate = activity.completedDateUtc ? new Date(activity.completedDateUtc) : undefined;
    this.form = {
      subject: activity.subject,
      description: activity.description,
      outcome: activity.outcome,
      type: activity.type,
      priority: activity.priority ?? 'Normal',
      dueDateUtc: dueDate,
      completedDateUtc: completedDate,
      relatedEntityType: activity.relatedEntityType ?? 'Account',
      relatedEntityId: activity.relatedEntityId,
      ownerId: activity.ownerId
    };
    this.activityStatus = completedDate ? 'Completed' : 'Open';
    if (activity.ownerId) {
      const label = activity.ownerName?.trim() || 'Owner';
      const option = { label, value: activity.ownerId, icon: 'pi-user' };
      const exists = this.ownerOptions.some((item) => item.value === option.value);
      if (!exists) {
        this.ownerOptions = [option, ...this.ownerOptions];
      }
      this.pendingOwnerOption = option;
    }

    if (activity.relatedEntityType === 'Lead' && activity.relatedEntityId) {
      const label = activity.relatedEntityName?.trim() || 'Lead';
      const option = { label, value: activity.relatedEntityId, icon: 'pi-user' };
      const exists = this.leadOptions.some((item) => item.value === option.value);
      if (!exists) {
        this.leadOptions = [option, ...this.leadOptions];
      }
      this.pendingLeadOption = option;
      return;
    }

    if (activity.relatedEntityType === 'Account' && activity.relatedEntityId) {
      const label = activity.relatedEntityName?.trim() || 'Account';
      const option = { label, value: activity.relatedEntityId, icon: 'pi-building' };
      const exists = this.customerOptions.some((item) => item.value === option.value);
      if (!exists) {
        this.customerOptions = [option, ...this.customerOptions];
      }
      this.pendingAccountOption = option;
    } else if (activity.relatedEntityType === 'Contact' && activity.relatedEntityId) {
      const label = activity.relatedEntityName?.trim() || 'Contact';
      const option = { label, value: activity.relatedEntityId, icon: 'pi-id-card' };
      const exists = this.contactOptions.some((item) => item.value === option.value);
      if (!exists) {
        this.contactOptions = [option, ...this.contactOptions];
      }
      this.pendingContactOption = option;
    } else if (activity.relatedEntityType === 'Opportunity' && activity.relatedEntityId) {
      const label = activity.relatedEntityName?.trim() || 'Opportunity';
      const option = { label, value: activity.relatedEntityId, icon: 'pi-briefcase' };
      const exists = this.opportunityOptions.some((item) => item.value === option.value);
      if (!exists) {
        this.opportunityOptions = [option, ...this.opportunityOptions];
      }
      this.pendingOpportunityOption = option;
    }
    queueMicrotask(() => this.cdr.markForCheck());
  }

  private createEmptyForm(): UpsertActivityRequest {
    return {
      subject: '',
      description: '',
      outcome: '',
      type: 'Task',
      priority: 'Normal',
      dueDateUtc: undefined,
      relatedEntityType: 'Account',
      relatedEntityId: undefined,
      ownerId: readUserId() ?? undefined
    };
  }

  private loadOwners() {
    this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
      next: (res) => {
        queueMicrotask(() => {
          this.ownerOptions = res.items.map((user: UserListItem) => ({
            label: user.fullName,
            value: user.id,
            icon: 'pi-user'
          }));
          if (this.pendingOwnerOption) {
            const exists = this.ownerOptions.some((option) => option.value === this.pendingOwnerOption?.value);
            if (!exists) {
              this.ownerOptions = [this.pendingOwnerOption, ...this.ownerOptions];
            }
            this.pendingOwnerOption = null;
          }
          if (!this.form.ownerId) {
            this.form.ownerId = readUserId() ?? undefined;
          }
          this.cdr.markForCheck();
        });
      },
      error: () => {
        queueMicrotask(() => {
          this.ownerOptions = [];
          this.cdr.markForCheck();
        });
      }
    });
  }

  private applyContextFromQuery() {
    const relatedType = this.route.snapshot.queryParamMap.get('relatedType') as UpsertActivityRequest['relatedEntityType'];
    const relatedId = this.route.snapshot.queryParamMap.get('relatedId') ?? undefined;
    const subject = this.route.snapshot.queryParamMap.get('subject') ?? undefined;

    if (relatedType) {
      this.form.relatedEntityType = relatedType;
    }

    if (relatedId) {
      this.form.relatedEntityId = relatedId;
    }

    if (subject && !this.form.subject) {
      this.form.subject = subject;
    }
  }
}
