import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { map } from 'rxjs';

import { Contact, SaveContactRequest } from '../models/contact.model';
import { ContactDataService } from '../services/contact-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';
import { AppToastService } from '../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { Activity } from '../../activities/models/activity.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AttachmentDataService, AttachmentItem } from '../../../shared/services/attachment-data.service';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-contact-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    TabsModule,
    TableModule,
    TagModule,
    FileUploadModule,
    BreadcrumbsComponent
  ],
  template: `
    <div class="contact-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <header class="page-header">
        <div class="header-content">
          <button pButton type="button" class="back-link p-button-text" routerLink="/app/contacts">
            <i class="pi pi-arrow-left"></i>
            <span>Back to contacts</span>
          </button>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Contact' : 'Create New Contact' }}</h1>
            <p>{{ isEditMode() ? 'Update stakeholder details' : 'Add a new person to your account team' }}</p>
          </div>
        </div>
      </header>

      <main class="form-container">
        <form class="contact-form" (ngSubmit)="onSave()">
          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-user"></i>
              Contact details
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>First name <span class="required">*</span></label>
                <input pInputText name="firstName" [(ngModel)]="form.firstName" required placeholder="First name" class="w-full" />
              </div>
              <div class="field">
                <label>Last name <span class="required">*</span></label>
                <input pInputText name="lastName" [(ngModel)]="form.lastName" required placeholder="Last name" class="w-full" />
              </div>
              <div class="field">
                <label>Email</label>
                <input pInputText name="email" [(ngModel)]="form.email" type="email" placeholder="name@company.com" class="w-full" />
              </div>
              <div class="field">
                <label>Job title</label>
                <input pInputText name="jobTitle" [(ngModel)]="form.jobTitle" placeholder="Role or title" class="w-full" />
              </div>
              <div class="field">
                <label>Phone</label>
                <input pInputText name="phone" [(ngModel)]="form.phone" placeholder="+1 555-0101" class="w-full" />
              </div>
              <div class="field">
                <label>Mobile</label>
                <input pInputText name="mobile" [(ngModel)]="form.mobile" placeholder="+1 555-0102" class="w-full" />
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-building"></i>
              Account context
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Account</label>
                <p-select
                  [options]="accountOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="accountId"
                  [(ngModel)]="form.accountId"
                  placeholder="Link to account"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Lifecycle</label>
                <p-select
                  [options]="lifecycleOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="lifecycleStage"
                  [(ngModel)]="form.lifecycleStage"
                  placeholder="Select lifecycle"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Activity score</label>
                <p-inputNumber name="activityScore" [(ngModel)]="form.activityScore" [min]="0" [max]="100" class="w-full"></p-inputNumber>
              </div>
              <div class="field">
                <label>LinkedIn</label>
                <input pInputText name="linkedInProfile" [(ngModel)]="form.linkedInProfile" placeholder="https://linkedin.com/in/..." class="w-full" />
              </div>
            </div>
          </section>

          <footer class="form-actions">
            <button type="button" pButton label="Cancel" class="crm-button crm-button--ghost" (click)="router.navigate(['/app/contacts'])"></button>
            <button
              type="submit"
              pButton
              [label]="isEditMode() ? 'Update contact' : 'Create contact'"
              class="crm-button crm-button--primary"
              [disabled]="!form.firstName || !form.lastName || saving()"
            ></button>
          </footer>
        </form>
      </main>

      <section class="form-container detail-container" *ngIf="isEditMode()">
        <section class="form-section">
          <h2 class="section-title">
            <i class="pi pi-address-book"></i>
            Contact workspace
          </h2>

          <p-tabs value="timeline">
            <p-tablist>
              <p-tab value="timeline">Timeline</p-tab>
              <p-tab value="notes">Notes</p-tab>
              <p-tab value="related">Related records</p-tab>
              <p-tab value="attachments">Attachments</p-tab>
            </p-tablist>
            <p-tabpanels>
              <p-tabpanel value="timeline">
              <div class="timeline" *ngIf="!timelineLoading(); else timelineLoadingTpl">
                <div class="timeline-item" *ngFor="let activity of activities()">
                  <div class="timeline-type">
                    <span class="type-dot" [attr.data-type]="activity.type">{{ activity.type }}</span>
                  </div>
                  <div class="timeline-body">
                    <div class="timeline-title">{{ activity.subject }}</div>
                    <div class="timeline-meta">
                      <span>{{ activity.createdAtUtc | date: 'MMM d, yyyy · h:mm a' }}</span>
                      <span *ngIf="activity.ownerName">• {{ activity.ownerName }}</span>
                    </div>
                    <div class="timeline-description" *ngIf="activity.description">{{ activity.description }}</div>
                  </div>
                </div>
                <div class="empty-state" *ngIf="!activities().length">No activity yet.</div>
              </div>
              <ng-template #timelineLoadingTpl>
                <div class="empty-state">Loading timeline...</div>
              </ng-template>
              </p-tabpanel>

              <p-tabpanel value="notes">
              <div class="notes">
                <div class="note-editor">
                  <textarea
                    pTextarea
                    rows="4"
                    placeholder="Add a note about this contact..."
                    class="w-full"
                    [(ngModel)]="noteText"
                  ></textarea>
                  <div class="note-actions">
                    <button
                      pButton
                      type="button"
                      label="Add note"
                      icon="pi pi-plus"
                      class="crm-button crm-button--primary"
                      [disabled]="!noteText.trim() || noteSaving()"
                      (click)="addNote()"
                    ></button>
                  </div>
                </div>

                <div class="note-list" *ngIf="notes().length; else notesEmpty">
                  <div class="note-item" *ngFor="let note of notes()">
                    <div class="note-header">
                      <span class="note-title">{{ note.subject }}</span>
                      <span class="note-meta">{{ note.createdAtUtc | date: 'MMM d, yyyy · h:mm a' }}</span>
                    </div>
                    <div class="note-body">{{ note.description }}</div>
                  </div>
                </div>
                <ng-template #notesEmpty>
                  <div class="empty-state">No notes yet.</div>
                </ng-template>
              </div>
              </p-tabpanel>

              <p-tabpanel value="related">
              <div class="related-grid">
                <div class="related-section">
                  <h3>Account</h3>
                  <div class="account-card" *ngIf="linkedAccount(); else accountEmpty">
                    <div class="account-name">{{ linkedAccount()?.name }}</div>
                  <div class="account-meta">{{ linkedAccount()?.company || '—' }}</div>
                  </div>
                  <ng-template #accountEmpty>
                    <div class="empty-state">No account linked.</div>
                  </ng-template>
                </div>

                <div class="related-section">
                  <h3>Opportunities</h3>
                  <p-table [value]="relatedOpportunities()" [paginator]="false" [rows]="5" styleClass="compact-table">
                    <ng-template pTemplate="header">
                      <tr>
                        <th>Name</th>
                        <th>Stage</th>
                        <th>Amount</th>
                      </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-row>
                      <tr>
                        <td>{{ row.name }}</td>
                        <td><p-tag [value]="row.stage" severity="info"></p-tag></td>
                        <td>{{ row.amount | currency: row.currency : 'symbol' : '1.0-0' }}</td>
                      </tr>
                    </ng-template>
                  </p-table>
                  <div class="empty-state" *ngIf="!relatedOpportunities().length">No opportunities yet.</div>
                </div>
              </div>
              </p-tabpanel>

              <p-tabpanel value="attachments">
              <div class="attachments">
                <p-fileUpload
                  mode="basic"
                  chooseLabel="Upload file"
                  [customUpload]="true"
                  (uploadHandler)="onAttachmentUpload($event)"
                  [auto]="true"
                ></p-fileUpload>

                <p-table [value]="attachments()" [paginator]="false" [rows]="5" styleClass="compact-table">
                  <ng-template pTemplate="header">
                    <tr>
                      <th>File</th>
                      <th>Uploaded by</th>
                      <th>Size</th>
                      <th></th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-row>
                    <tr>
                      <td>{{ row.fileName }}</td>
                      <td>{{ row.uploadedBy || '—' }}</td>
                      <td>{{ row.size | number }} bytes</td>
                      <td class="table-actions">
                        <button pButton type="button" class="icon-btn" icon="pi pi-download" (click)="downloadAttachment(row)"></button>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
                <div class="empty-state" *ngIf="!attachments().length">No attachments yet.</div>
              </div>
              </p-tabpanel>
            </p-tabpanels>
          </p-tabs>
        </section>
      </section>
    </div>
  `,
  styles: [`
    .contact-form-page {
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

    .contact-form {
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

    .detail-container {
      padding-top: 0;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 1rem;
      padding: 1rem;
      border-radius: 14px;
      background: rgba(248, 250, 252, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }

    .type-dot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      background: rgba(59, 130, 246, 0.12);
      color: #1d4ed8;
    }

    .type-dot[data-type='Call'] { background: rgba(16, 185, 129, 0.15); color: #047857; }
    .type-dot[data-type='Meeting'] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }
    .type-dot[data-type='Email'] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }
    .type-dot[data-type='Task'] { background: rgba(148, 163, 184, 0.2); color: #475569; }
    .type-dot[data-type='Note'] { background: rgba(236, 72, 153, 0.15); color: #be185d; }

    .timeline-title {
      font-weight: 700;
      color: #1f2937;
    }

    .timeline-meta {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0.25rem 0 0.5rem;
    }

    .timeline-description {
      color: #334155;
    }

    .notes {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .note-editor {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .note-actions {
      display: flex;
      justify-content: flex-end;
    }

    .note-item {
      padding: 1rem;
      border-radius: 14px;
      background: rgba(248, 250, 252, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }

    .note-header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .note-meta {
      font-weight: 500;
      color: #94a3b8;
      font-size: 0.8rem;
    }

    .note-body {
      color: #475569;
      white-space: pre-wrap;
    }

    .related-grid {
      display: grid;
      gap: 1.5rem;
    }

    .related-section h3 {
      margin-bottom: 0.75rem;
      color: #1f2937;
      font-size: 1rem;
      font-weight: 700;
    }

    .account-card {
      padding: 1rem;
      border-radius: 14px;
      background: rgba(248, 250, 252, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }

    .account-name {
      font-weight: 700;
      color: #1f2937;
    }

    .account-meta {
      color: #64748b;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }

    .attachments {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .compact-table ::ng-deep .p-datatable-thead > tr > th {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #64748b;
    }

    .table-actions {
      width: 48px;
      text-align: right;
    }

    .empty-state {
      padding: 1rem;
      color: #94a3b8;
      font-size: 0.9rem;
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
export class ContactFormPage implements OnInit {
  protected readonly lifecycleOptions: Option<string>[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];

  protected accountOptions: Option<string>[] = [];
  protected readonly accounts = signal<Customer[]>([]);
  protected form: SaveContactRequest = this.createEmptyForm();
  protected saving = signal(false);
  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);
  protected noteText = '';
  private readonly toastService = inject(AppToastService);

  private readonly contactData = inject(ContactDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly activityData = inject(ActivityDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly attachmentData = inject(AttachmentDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const contact = history.state?.contact as Contact | undefined;
    if (this.editingId && contact) {
      this.prefill(contact);
    } else if (this.editingId) {
      this.contactData.getById(this.editingId).subscribe({
        next: (item) => this.prefill(item),
        error: () => this.raiseToast('error', 'Unable to load contact.')
      });
    }

    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.accounts.set(res.items);
      this.accountOptions = res.items.map((account: Customer) => ({ label: account.name, value: account.id }));
    });
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected onSave() {
    if (!this.form.firstName || !this.form.lastName) {
      return;
    }

    const payload: SaveContactRequest = {
      ...this.form,
      activityScore: this.form.activityScore ?? 0
    };

    this.saving.set(true);
    const request$ = this.editingId
      ? this.contactData.update(this.editingId, payload).pipe(map(() => null))
      : this.contactData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Contact updated.' : 'Contact created.';
        this.router.navigate(['/app/contacts'], { state: { toast: { tone: 'success', message } } });
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update contact.' : 'Unable to create contact.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private prefill(contact: Contact) {
    const [firstName, ...rest] = contact.name.split(' ');
    this.form = {
      firstName,
      lastName: rest.join(' '),
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      jobTitle: contact.jobTitle,
      accountId: contact.accountId,
      ownerId: undefined,
      lifecycleStage: contact.lifecycleStage ?? 'Lead',
      activityScore: contact.activityScore ?? 0,
      linkedInProfile: ''
    };
    this.loadDetailData();
  }

  private createEmptyForm(): SaveContactRequest {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      mobile: '',
      jobTitle: '',
      accountId: undefined,
      ownerId: undefined,
      lifecycleStage: 'Lead',
      activityScore: 0,
      linkedInProfile: ''
    };
  }

  protected addNote() {
    if (!this.editingId || !this.noteText.trim()) {
      return;
    }

    this.noteSaving.set(true);
    const payload = {
      subject: 'Note',
      description: this.noteText.trim(),
      type: 'Note' as const,
      relatedEntityType: 'Contact' as const,
      relatedEntityId: this.editingId
    };

    this.activityData.create(payload).subscribe({
      next: (note) => {
        this.noteSaving.set(false);
        this.noteText = '';
        this.notes.set([note, ...this.notes()]);
        this.activities.set([note, ...this.activities()]);
      },
      error: () => {
        this.noteSaving.set(false);
        this.raiseToast('error', 'Unable to add note.');
      }
    });
  }

  protected onAttachmentUpload(event: { files: File[] }) {
    if (!this.editingId || !event.files?.length) {
      return;
    }

    const file = event.files[0];
    this.attachmentData.upload(file, 'Contact', this.editingId).subscribe({
      next: (attachment) => {
        this.attachments.set([attachment, ...this.attachments()]);
        this.raiseToast('success', 'Attachment uploaded.');
      },
      error: () => {
        this.raiseToast('error', 'Unable to upload attachment.');
      }
    });
  }

  protected downloadAttachment(item: AttachmentItem) {
    const url = this.attachmentData.downloadUrl(item.id);
    window.open(url, '_blank');
  }

  protected linkedAccount() {
    if (!this.form.accountId) {
      return null;
    }
    return this.accounts().find((account) => account.id === this.form.accountId) ?? null;
  }

  private loadDetailData() {
    if (!this.editingId) {
      return;
    }

    this.timelineLoading.set(true);
    this.activityData
      .search({
        relatedEntityType: 'Contact',
        relatedEntityId: this.editingId,
        page: 1,
        pageSize: 50
      })
      .subscribe({
        next: (res) => {
          const ordered = [...res.items].sort(
            (a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? '')
          );
          this.activities.set(ordered);
          this.timelineLoading.set(false);
        },
        error: () => {
          this.timelineLoading.set(false);
          this.raiseToast('error', 'Unable to load timeline.');
        }
      });

    this.activityData
      .search({
        relatedEntityType: 'Contact',
        relatedEntityId: this.editingId,
        type: 'Note',
        page: 1,
        pageSize: 50
      })
      .subscribe({
        next: (res) => {
          const ordered = [...res.items].sort(
            (a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? '')
          );
          this.notes.set(ordered);
        }
      });

    if (this.form.accountId) {
      this.opportunityData.search({ accountId: this.form.accountId, page: 1, pageSize: 20 }).subscribe({
        next: (res) => this.relatedOpportunities.set(res.items),
        error: () => this.raiseToast('error', 'Unable to load opportunities.')
      });
    }

    this.attachmentData.list('Contact', this.editingId).subscribe({
      next: (items) => this.attachments.set(items),
      error: () => this.raiseToast('error', 'Unable to load attachments.')
    });
  }
}
