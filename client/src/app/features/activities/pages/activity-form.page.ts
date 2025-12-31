import { Component, OnInit, inject, signal } from '@angular/core';
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
import { AppToastService } from '../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

interface Option<T = string> {
  label: string;
  value: T;
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
  template: `
    <div class="activity-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <header class="page-header">
        <div class="header-content">
          <button pButton type="button" class="back-link p-button-text" routerLink="/app/activities">
            <i class="pi pi-arrow-left"></i>
            <span>Back to activities</span>
          </button>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Activity' : 'Create New Activity' }}</h1>
            <p>{{ isEditMode() ? 'Update the schedule and details' : 'Track tasks, calls, and meetings' }}</p>
          </div>
        </div>
      </header>

      <main class="form-container">
        <form class="activity-form" (ngSubmit)="onSave()">
          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-calendar"></i>
              Activity details
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Template</label>
                <p-select
                  [options]="templateOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="template"
                  [(ngModel)]="selectedTemplate"
                  (ngModelChange)="onTemplateChange($event)"
                  placeholder="Choose template"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field full-row">
                <label>Subject <span class="required">*</span></label>
                <input pInputText name="subject" [(ngModel)]="form.subject" required placeholder="Enter activity subject" class="w-full" />
              </div>
              <div class="field">
                <label>Type</label>
                <p-select
                  [options]="typeOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="type"
                  [(ngModel)]="form.type"
                  placeholder="Select type"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Priority</label>
                <p-select
                  [options]="priorityOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="priority"
                  [(ngModel)]="form.priority"
                  placeholder="Select priority"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Due date</label>
                <p-datePicker
                  name="dueDateUtc"
                  [(ngModel)]="form.dueDateUtc"
                  [showIcon]="true"
                  styleClass="w-full"
                ></p-datePicker>
              </div>
              <div class="field">
                <label>Related to</label>
                <p-select
                  [options]="relationOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityType"
                  [(ngModel)]="form.relatedEntityType"
                  (ngModelChange)="onRelationTypeChange($event)"
                  placeholder="Select record type"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Account'">
                <label>Account</label>
                <p-select
                  [options]="customerOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select account"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Contact'">
                <label>Contact</label>
                <p-select
                  [options]="contactOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select contact"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Opportunity'">
                <label>Opportunity</label>
                <p-select
                  [options]="opportunityOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select opportunity"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field full-row">
                <label>Description</label>
                <textarea pTextarea name="description" [(ngModel)]="form.description" rows="3" placeholder="Add notes or agenda"></textarea>
              </div>
            </div>
          </section>

          <footer class="form-actions">
            <button type="button" pButton label="Cancel" class="crm-button crm-button--ghost" (click)="router.navigate(['/app/activities'])"></button>
            <button
              type="submit"
              pButton
              [label]="isEditMode() ? 'Update activity' : 'Create activity'"
              class="crm-button crm-button--primary"
              [disabled]="!form.subject || saving()"
            ></button>
          </footer>
        </form>
      </main>
    </div>
  `,
  styles: [`
    .activity-form-page {
      min-height: 100vh;
      background:
        radial-gradient(at 40% 20%, hsla(228, 83%, 72%, 0.12) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.12) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355, 85%, 63%, 0.08) 0px, transparent 50%),
        linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
      background-attachment: fixed;
    }

    .page-header {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .header-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0;
      border: none;
      background: transparent;
      color: #0ea5e9;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .back-link:hover {
      color: #0284c7;
      gap: 0.75rem;
    }

    .header-title h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0 0 0.25rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-title p {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }

    .form-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .activity-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-section {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    }

    .section-title i {
      color: #667eea;
      font-size: 1.1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .full-row {
      grid-column: 1 / -1;
    }

    .field label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #475569;
    }

    .required {
      color: #ef4444;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .form-actions button {
      min-width: 180px;
    }

    @media (max-width: 768px) {
      .page-header {
        padding: 1.25rem 1.5rem;
      }

      .form-container {
        padding: 1.5rem;
      }
    }
  `]
})
export class ActivityFormPage implements OnInit {
  protected readonly typeOptions: Option<ActivityType>[] = [
    { label: 'Task', value: 'Task' },
    { label: 'Call', value: 'Call' },
    { label: 'Email', value: 'Email' },
    { label: 'Meeting', value: 'Meeting' }
  ];

  protected readonly priorityOptions: Option<NonNullable<UpsertActivityRequest['priority']>>[] = [
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' }
  ];

  protected readonly relationOptions: Option<NonNullable<UpsertActivityRequest['relatedEntityType']>>[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Opportunity', value: 'Opportunity' }
  ];
  protected readonly templateOptions: Option<string>[] = [
    { label: 'No template', value: 'none' },
    { label: 'Discovery call', value: 'call-discovery' },
    { label: 'Stakeholder meeting', value: 'meeting-stakeholder' },
    { label: 'Follow-up task', value: 'follow-up' }
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
  protected selectedTemplate = 'none';

  private readonly activityData = inject(ActivityDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const activity = history.state?.activity as Activity | undefined;
    if (this.editingId && activity) {
      this.prefill(activity);
    } else if (this.editingId && !activity) {
      this.router.navigate(['/app/activities']);
      return;
    }

    this.loadLookups();
  }

  protected isEditMode() {
    return !!this.editingId;
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

  protected onSave() {
    if (!this.form.subject) {
      return;
    }

    this.saving.set(true);
    const request$ = this.editingId
      ? this.activityData.update(this.editingId, this.form).pipe(map(() => null))
      : this.activityData.create(this.form).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Activity updated.' : 'Activity created.';
        this.router.navigate(['/app/activities'], { state: { toast: { tone: 'success', message } } });
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
      this.customerOptions = res.items.map((c: Customer) => ({ label: c.name, value: c.id }));
    });
    this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.contactOptions = res.items.map((c: Contact) => ({ label: c.name, value: c.id }));
    });
    this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.opportunityOptions = res.items.map((o: Opportunity) => ({ label: o.name, value: o.id }));
    });
  }

  private prefill(activity: Activity) {
    this.form = {
      subject: activity.subject,
      description: activity.description,
      type: activity.type,
      priority: activity.priority ?? 'Normal',
      dueDateUtc: activity.dueDateUtc,
      completedDateUtc: activity.completedDateUtc,
      relatedEntityType: activity.relatedEntityType ?? 'Account',
      relatedEntityId: activity.relatedEntityId,
      ownerId: activity.ownerId
    };
  }

  private createEmptyForm(): UpsertActivityRequest {
    return {
      subject: '',
      description: '',
      type: 'Task',
      priority: 'Normal',
      dueDateUtc: undefined,
      relatedEntityType: 'Account',
      relatedEntityId: undefined,
      ownerId: undefined
    };
  }
}
