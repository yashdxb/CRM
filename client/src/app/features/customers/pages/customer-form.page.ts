import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

import { CustomerStatus } from '../models/customer.model';
import { CustomerDataService, SaveCustomerRequest } from '../services/customer-data.service';
import { AppToastService } from '../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { Activity } from '../../activities/models/activity.model';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AttachmentDataService, AttachmentItem } from '../../../shared/services/attachment-data.service';

interface StatusOption {
  label: string;
  value: CustomerStatus;
}

@Component({
  selector: 'app-customer-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CardModule,
    TabsModule,
    TableModule,
    TagModule,
    FileUploadModule,
    BreadcrumbsComponent
  ],
  template: `
    <div class="customer-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-nav">
            <button pButton type="button" class="back-link p-button-text" routerLink="/app/customers">
              <i class="pi pi-arrow-left"></i>
              <span>Back to Customers</span>
            </button>
          </div>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Customer' : 'Create New Customer' }}</h1>
            <p>{{ isEditMode() ? 'Update customer information' : 'Add a new customer to your CRM' }}</p>
          </div>
        </div>
      </header>

      <!-- Form Section -->
      <main class="form-container">
        <form class="customer-form" (ngSubmit)="onSave()">
          <fieldset class="form-fieldset" [disabled]="loading()">
            <!-- Basic Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-user"></i>
                Basic Information
              </h2>
              
              <div class="form-grid">
                <div class="field">
                  <label for="customerName">Customer Name <span class="required">*</span></label>
                  <input 
                    pInputText 
                    id="customerName"
                    name="name" 
                    [(ngModel)]="form.name" 
                    required 
                    placeholder="Enter customer name"
                    class="w-full"
                  />
                </div>
                
                <div class="field">
                  <label for="customerStatus">Lifecycle Stage</label>
                  <p-select
                    id="customerStatus"
                    [options]="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    name="status"
                    [(ngModel)]="form.lifecycleStage"
                    placeholder="Select status"
                    styleClass="w-full"
                  ></p-select>
                </div>

                <div class="field">
                  <label for="customerIndustry">Industry</label>
                  <input 
                    pInputText 
                    id="customerIndustry"
                    name="industry" 
                    [(ngModel)]="form.industry" 
                    placeholder="e.g., Technology, Healthcare"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerCompany">Company</label>
                  <input 
                    pInputText 
                    id="customerCompany"
                    name="company" 
                    [(ngModel)]="form.company" 
                    placeholder="Company name"
                    class="w-full"
                  />
                </div>
              </div>
            </section>

            <!-- Contact Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-phone"></i>
                Contact Information
              </h2>
              
              <div class="form-grid">
                <div class="field">
                  <label for="customerEmail">Email Address</label>
                  <input 
                    pInputText 
                    id="customerEmail"
                    name="email" 
                    type="email"
                    [(ngModel)]="form.email" 
                    placeholder="customer@example.com"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerPhone">Phone Number</label>
                  <input 
                    pInputText 
                    id="customerPhone"
                    name="phone" 
                    [(ngModel)]="form.phone" 
                    placeholder="+1 (555) 000-0000"
                    class="w-full"
                  />
                </div>
                
                <div class="field">
                  <label for="customerWebsite">Website</label>
                  <input 
                    pInputText 
                    id="customerWebsite"
                    name="website" 
                    [(ngModel)]="form.website" 
                    placeholder="https://example.com"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerAddress">Address</label>
                  <input 
                    pInputText 
                    id="customerAddress"
                    name="address" 
                    [(ngModel)]="form.address" 
                    placeholder="Street address, City, Country"
                    class="w-full"
                  />
                </div>
              </div>
            </section>

            <!-- Additional Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-file-edit"></i>
                Additional Information
              </h2>
              
              <div class="field full-width">
                <label for="customerDescription">Notes</label>
                <textarea 
                  pTextarea 
                  id="customerDescription"
                  name="description" 
                  [(ngModel)]="form.description" 
                  rows="4" 
                  placeholder="Add any relevant notes about this customer..."
                  class="w-full"
                ></textarea>
              </div>
            </section>
          </fieldset>

          <!-- Form Actions -->
          <footer class="form-actions">
            <button 
              type="button" 
              pButton 
              label="Cancel" 
              icon="pi pi-times"
              class="crm-button crm-button--ghost" 
              routerLink="/app/customers">
            </button>
            <button 
              type="submit" 
              pButton 
              [label]="isEditMode() ? 'Update Customer' : 'Create Customer'"
              [icon]="isEditMode() ? 'pi pi-check' : 'pi pi-plus'"
              class="crm-button crm-button--primary" 
              [disabled]="!form.name || saving() || loading()">
            </button>
          </footer>
        </form>
      </main>

      <section class="form-container detail-container" *ngIf="isEditMode()">
        <section class="form-section">
          <h2 class="section-title">
            <i class="pi pi-briefcase"></i>
            Customer workspace
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
                    placeholder="Add a note about this customer..."
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
                  <h3>Contacts</h3>
                  <p-table [value]="relatedContacts()" [paginator]="false" [rows]="5" styleClass="compact-table">
                    <ng-template pTemplate="header">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-row>
                      <tr>
                        <td>{{ row.name }}</td>
                        <td>{{ row.email || '—' }}</td>
                        <td>{{ row.phone || '—' }}</td>
                      </tr>
                    </ng-template>
                  </p-table>
                  <div class="empty-state" *ngIf="!relatedContacts().length">No contacts linked.</div>
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
    .customer-form-page {
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

    .header-nav {
      margin-bottom: 1rem;
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

      &:hover {
        color: #0284c7;
        gap: 0.75rem;
      }

      i {
        font-size: 0.875rem;
      }
    }

    .header-title {
      h1 {
        font-size: 1.75rem;
        font-weight: 800;
        color: #1a1a2e;
        margin: 0 0 0.25rem;
        background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
        margin: 0;
      }
    }

    .form-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .customer-form {
      display: flex;
      flex-direction: column;
    }

    .form-fieldset {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      border: none;
      margin: 0;
      padding: 0;
      min-width: 0;
    }

    .form-section {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border: none;
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

      i {
        color: #667eea;
        font-size: 1.1rem;
      }
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

      &.full-width {
        grid-column: 1 / -1;
      }
    }

    .field label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #475569;
    }

    .required {
      color: #ef4444;
    }

    .w-full {
      width: 100%;
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
export class CustomerFormPage implements OnInit {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];

  protected readonly isEditMode = signal(false);
  protected readonly saving = signal(false);
  protected readonly loading = signal(false);
  private readonly toastService = inject(AppToastService);
  private readonly activityData = inject(ActivityDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly attachmentData = inject(AttachmentDataService);
  protected customerId: string | null = null;

  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedContacts = signal<Contact[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);

  protected noteText = '';

  protected form: SaveCustomerRequest & { email?: string; company?: string; address?: string } = {
    name: '',
    lifecycleStage: 'Lead',
    phone: '',
    website: '',
    industry: '',
    description: '',
    email: '',
    company: '',
    address: ''
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly customerData: CustomerDataService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEditMode.set(true);
      this.loadCustomer();
      this.loadDetailData();
    }
  }

  private loadCustomer() {
    if (!this.customerId) return;
    this.loading.set(true);
    this.customerData.getById(this.customerId).subscribe({
      next: (customer) => {
        this.form = {
          name: customer.name,
          lifecycleStage: customer.status,
          phone: customer.phone || '',
          website: customer.address || '',
          industry: '',
          description: customer.notes?.join(', ') || '',
          email: customer.email || '',
          company: customer.company || '',
          address: customer.address || ''
        };
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load customer.');
      }
    });
  }

  protected onSave() {
    if (!this.form.name) return;

    this.saving.set(true);
    const payload: SaveCustomerRequest = {
      name: this.form.name,
      lifecycleStage: this.form.lifecycleStage,
      phone: this.form.phone,
      website: this.form.website,
      industry: this.form.industry,
      description: this.form.description
    };

    if (this.customerId) {
      this.customerData.update(this.customerId, payload).subscribe({
        next: () => this.navigateWithToast('Customer updated.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update customer.');
        }
      });
    } else {
      this.customerData.create(payload).subscribe({
        next: () => this.navigateWithToast('Customer created.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to create customer.');
        }
      });
    }
  }

  protected addNote() {
    if (!this.customerId || !this.noteText.trim()) {
      return;
    }

    this.noteSaving.set(true);
    const payload = {
      subject: 'Note',
      description: this.noteText.trim(),
      type: 'Note' as const,
      relatedEntityType: 'Account' as const,
      relatedEntityId: this.customerId
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
    if (!this.customerId || !event.files?.length) {
      return;
    }

    const file = event.files[0];
    this.attachmentData.upload(file, 'Account', this.customerId).subscribe({
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

  private navigateWithToast(message: string) {
    this.saving.set(false);
    this.router.navigate(['/app/customers'], { state: { toast: { tone: 'success', message } } });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadDetailData() {
    if (!this.customerId) {
      return;
    }

    this.timelineLoading.set(true);
    this.activityData
      .search({
        relatedEntityType: 'Account',
        relatedEntityId: this.customerId,
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
        relatedEntityType: 'Account',
        relatedEntityId: this.customerId,
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

    this.contactData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedContacts.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load related contacts.')
    });

    this.opportunityData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedOpportunities.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load opportunities.')
    });

    this.attachmentData.list('Account', this.customerId).subscribe({
      next: (items) => this.attachments.set(items),
      error: () => this.raiseToast('error', 'Unable to load attachments.')
    });
  }
}
