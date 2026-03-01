import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { EmailDataService } from '../services/email-data.service';
import { EmailRelationType, EmailTemplateListItem, SendEmailRequest } from '../models/email.model';
import { AppToastService } from '../../../../core/app-toast.service';

interface RelatedEntityOption {
  label: string;
  value: EmailRelationType;
  icon: string;
}

@Component({
  selector: 'app-email-compose-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    EditorModule,
    ProgressSpinnerModule
  ],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [dismissableMask]="true"
      [style]="{ width: '720px', maxWidth: '95vw' }"
      [contentStyle]="{ padding: '0' }"
      (onHide)="onCancel()"
      styleClass="compose-email-dialog"
    >
      <ng-template pTemplate="header">
        <div class="dialog-header">
          <div class="header-icon">
            <i class="pi pi-envelope"></i>
          </div>
          <div class="header-text">
            <h2>Compose Email</h2>
            <span class="header-subtitle">Send a new email message</span>
          </div>
        </div>
      </ng-template>
      
      <div class="compose-body">
        <form [formGroup]="form" class="compose-form">
          <!-- Template Selection -->
          <div class="form-section template-section">
            <div class="section-header">
              <i class="pi pi-file-edit"></i>
              <span>Quick Start</span>
            </div>
            <div class="field">
              <label>Start from a template</label>
              <p-select
                appendTo="body"
                [options]="templates()"
                optionLabel="name"
                optionValue="id"
                [ngModel]="selectedTemplateId()"
                (ngModelChange)="onTemplateSelected($event)"
                [ngModelOptions]="{ standalone: true }"
                placeholder="Choose a template (optional)..."
                [showClear]="true"
                styleClass="w-full template-select"
              >
                <ng-template pTemplate="item" let-item>
                  <div class="template-option">
                    <div class="template-icon">
                      <i class="pi pi-file-edit"></i>
                    </div>
                    <div class="template-info">
                      <span class="template-name">{{ item.name }}</span>
                      <span class="template-category" *ngIf="item.category">{{ item.category }}</span>
                    </div>
                  </div>
                </ng-template>
                <ng-template pTemplate="value" let-item>
                  <div class="template-option" *ngIf="item">
                    <i class="pi pi-file-edit"></i>
                    <span>{{ item.name }}</span>
                  </div>
                  <span *ngIf="!item" class="select-placeholder">Choose a template (optional)...</span>
                </ng-template>
              </p-select>
            </div>
          </div>

          <!-- Recipients Section -->
          <div class="form-section recipients-section">
            <div class="section-header">
              <i class="pi pi-users"></i>
              <span>Recipients</span>
            </div>
            
            <div class="field">
              <label>To <span class="required">*</span></label>
              <div class="input-with-icon">
                <i class="pi pi-at field-icon"></i>
                <input
                  pInputText
                  formControlName="toEmail"
                  placeholder="recipient@example.com"
                  class="w-full"
                />
              </div>
            </div>

            <div class="field">
              <label>Recipient Name</label>
              <div class="input-with-icon">
                <i class="pi pi-user field-icon"></i>
                <input
                  pInputText
                  formControlName="toName"
                  placeholder="John Doe (optional)"
                  class="w-full"
                />
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label>CC</label>
                <input
                  pInputText
                  formControlName="ccEmails"
                  placeholder="cc@example.com"
                  class="w-full"
                />
                <small class="field-hint">Comma-separated</small>
              </div>
              <div class="field">
                <label>BCC</label>
                <input
                  pInputText
                  formControlName="bccEmails"
                  placeholder="bcc@example.com"
                  class="w-full"
                />
                <small class="field-hint">Comma-separated</small>
              </div>
            </div>
          </div>

          <!-- Message Section -->
          <div class="form-section message-section">
            <div class="section-header">
              <i class="pi pi-pencil"></i>
              <span>Message</span>
            </div>
            
            <div class="field">
              <label>Subject <span class="required">*</span></label>
              <div class="input-with-icon">
                <i class="pi pi-tag field-icon"></i>
                <input
                  pInputText
                  formControlName="subject"
                  placeholder="Enter your email subject..."
                  class="w-full"
                />
              </div>
            </div>

            <div class="field editor-field">
              <label>Message Body <span class="required">*</span></label>
              <p-editor
                formControlName="htmlBody"
                [style]="{ height: '220px' }"
                placeholder="Write your message here..."
              >
                <ng-template pTemplate="header">
                  <span class="ql-formats">
                    <button type="button" class="ql-bold" aria-label="Bold"></button>
                    <button type="button" class="ql-italic" aria-label="Italic"></button>
                    <button type="button" class="ql-underline" aria-label="Underline"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-list" value="ordered" aria-label="Ordered List"></button>
                    <button type="button" class="ql-list" value="bullet" aria-label="Bullet List"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-link" aria-label="Link"></button>
                    <button type="button" class="ql-image" aria-label="Image"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-clean" aria-label="Remove Formatting"></button>
                  </span>
                </ng-template>
              </p-editor>
            </div>
          </div>

          <!-- Related Entity Section -->
          <div class="form-section link-section" *ngIf="showRelatedEntity">
            <div class="section-header">
              <i class="pi pi-link"></i>
              <span>Link to Record</span>
              <span class="section-badge">Optional</span>
            </div>
            
            <div class="field-row">
              <div class="field">
                <label>Record Type</label>
                <p-select
                  appendTo="body"
                  [options]="relatedEntityTypes"
                  optionLabel="label"
                  optionValue="value"
                  formControlName="relatedEntityType"
                  placeholder="Select type..."
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-item>
                    <div class="entity-option">
                      <i [class]="'pi ' + item.icon" [style.color]="getEntityColor(item.value)"></i>
                      <span>{{ item.label }}</span>
                    </div>
                  </ng-template>
                  <ng-template pTemplate="value" let-item>
                    <div class="entity-option" *ngIf="item">
                      <i [class]="'pi ' + item.icon" [style.color]="getEntityColor(item.value)"></i>
                      <span>{{ item.label }}</span>
                    </div>
                    <span *ngIf="!item" class="select-placeholder">Select type...</span>
                  </ng-template>
                </p-select>
              </div>
              <div class="field" *ngIf="form.value.relatedEntityType">
                <label>Record ID</label>
                <input
                  pInputText
                  formControlName="relatedEntityId"
                  placeholder="Enter record ID..."
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <ng-template pTemplate="footer">
        <div class="dialog-footer">
          <button
            pButton
            type="button"
            class="btn btn-ghost"
            (click)="onCancel()"
          >
            <i class="pi pi-times"></i>
            <span>Cancel</span>
          </button>
          <button
            pButton
            type="button"
            class="btn btn-primary btn-send"
            [disabled]="form.invalid || sending()"
            (click)="onSend()"
          >
            <i class="pi pi-send" *ngIf="!sending()"></i>
            <p-progressSpinner
              *ngIf="sending()"
              [style]="{ width: '16px', height: '16px' }"
              strokeWidth="4"
            ></p-progressSpinner>
            <span>{{ sending() ? 'Sending...' : 'Send Email' }}</span>
          </button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    /* Dialog Header */
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    .header-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .header-text h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .header-subtitle {
      font-size: 0.8125rem;
      color: #6b7280;
    }

    /* Body Container */
    .compose-body {
      padding: 1.25rem 1.5rem;
      max-height: 65vh;
      overflow-y: auto;
    }

    .compose-form {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Form Sections */
    .form-section {
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .form-section:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .form-section:first-child {
      padding-top: 0;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.875rem;
      font-size: 0.8125rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0891b2;
    }

    .section-header i {
      font-size: 0.875rem;
      color: #06b6d4;
    }

    .section-badge {
      margin-left: auto;
      padding: 0.125rem 0.5rem;
      background: rgba(107, 114, 128, 0.1);
      color: #6b7280;
      border-radius: 9999px;
      font-size: 0.6875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Fields */
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      margin-bottom: 0.75rem;
    }

    .field:last-child {
      margin-bottom: 0;
    }

    .field label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: #374151;
    }

    .field .required {
      color: #ef4444;
    }

    .field-hint {
      font-size: 0.6875rem;
      color: #9ca3af;
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .field-row .field {
      margin-bottom: 0;
    }

    @media (max-width: 600px) {
      .field-row {
        grid-template-columns: 1fr;
      }
    }

    /* Input with Icon */
    .input-with-icon {
      position: relative;
    }

    .input-with-icon .field-icon {
      position: absolute;
      left: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 0.875rem;
      z-index: 1;
      pointer-events: none;
    }

    .input-with-icon input {
      padding-left: 2.5rem !important;
    }

    /* Template Selection */
    .template-section {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.04) 0%, rgba(118, 75, 162, 0.04) 100%);
      margin: -1.25rem -1.5rem 0;
      padding: 1rem 1.5rem !important;
      border-bottom: 1px solid rgba(102, 126, 234, 0.1) !important;
    }

    .template-option {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .template-icon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 6px;
      color: #667eea;
      font-size: 0.75rem;
    }

    .template-info {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .template-name {
      font-weight: 500;
      color: #1f2937;
    }

    .template-category {
      font-size: 0.6875rem;
      color: #9ca3af;
    }

    /* Entity Options */
    .entity-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .entity-option i {
      font-size: 0.875rem;
    }

    .select-placeholder {
      color: #9ca3af;
    }

    /* Editor Field */
    .editor-field {
      margin-bottom: 0;
    }

    /* Dialog Footer */
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .btn-ghost {
      background: white;
      color: #6b7280;
      border: 1px solid #e5e7eb;
    }

    .btn-ghost:hover {
      background: #f9fafb;
      border-color: #d1d5db;
      color: #374151;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .btn-send i {
      font-size: 0.875rem;
    }

    /* PrimeNG Overrides */
    :host ::ng-deep {
      .compose-email-dialog {
        .p-dialog-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
        }

        .p-dialog-content {
          padding: 0;
        }

        .p-dialog-footer {
          padding: 0;
        }
      }

      .p-editor-container {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 200ms, box-shadow 200ms;
      }

      .p-editor-container:focus-within {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
      }

      .p-editor-toolbar {
        background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
        border-bottom: 1px solid #e5e7eb;
        padding: 0.5rem;
      }

      .p-editor-content {
        border: none;
        background: white;
      }

      .p-editor-content .ql-editor {
        font-size: 0.9375rem;
        line-height: 1.6;
        min-height: 180px;
      }

      .p-inputtext {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.625rem 0.875rem;
        font-size: 0.9375rem;
        transition: border-color 200ms, box-shadow 200ms;
      }

      .p-inputtext:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
      }

      .p-select {
        border-radius: 8px;
      }

      .p-select:not(.p-disabled):hover {
        border-color: #667eea;
      }

      .p-select:not(.p-disabled).p-focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
      }

      .template-select .p-select-label {
        padding: 0.625rem 0.875rem;
      }
    }
  `]
})
export class EmailComposeDialogComponent implements OnInit, OnChanges {
  private readonly emailService = inject(EmailDataService);
  private readonly toast = inject(AppToastService);

  @Input() visible = false;
  @Input() showRelatedEntity = true;
  @Input() defaultToEmail = '';
  @Input() defaultToName = '';
  @Input() defaultSubject = '';
  @Input() defaultRelatedEntityType?: EmailRelationType;
  @Input() defaultRelatedEntityId?: string;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() sent = new EventEmitter<void>();

  protected readonly templates = signal<EmailTemplateListItem[]>([]);
  protected readonly selectedTemplateId = signal<string | null>(null);
  protected readonly sending = signal(false);

  protected readonly relatedEntityTypes: RelatedEntityOption[] = [
    { label: 'Lead', value: 'Lead', icon: 'pi-user-plus' },
    { label: 'Contact', value: 'Contact', icon: 'pi-user' },
    { label: 'Customer', value: 'Customer', icon: 'pi-building' },
    { label: 'Opportunity', value: 'Opportunity', icon: 'pi-dollar' },
    { label: 'Activity', value: 'Activity', icon: 'pi-calendar' }
  ];

  protected getEntityColor(type: EmailRelationType): string {
    const colors: Record<EmailRelationType, string> = {
      Lead: '#06b6d4',
      Contact: '#8b5cf6',
      Customer: '#22c55e',
      Opportunity: '#f59e0b',
      Activity: '#3b82f6'
    };
    return colors[type] || '#6b7280';
  }

  protected readonly form = new FormGroup({
    toEmail: new FormControl('', [Validators.required, Validators.email]),
    toName: new FormControl(''),
    ccEmails: new FormControl(''),
    bccEmails: new FormControl(''),
    subject: new FormControl('', [Validators.required]),
    htmlBody: new FormControl('', [Validators.required]),
    relatedEntityType: new FormControl<EmailRelationType | null>(null),
    relatedEntityId: new FormControl<string | null>(null)
  });

  ngOnInit(): void {
    this.loadTemplates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.resetForm();
    }
  }

  protected onTemplateSelected(templateId: string | null): void {
    this.selectedTemplateId.set(templateId);

    if (!templateId) {
      return;
    }

    this.emailService.getTemplate(templateId).subscribe({
      next: (template) => {
        this.form.patchValue({
          subject: template.subject,
          htmlBody: template.htmlBody
        });
      },
      error: () => {
        this.toast.show('error', 'Failed to load template');
      }
    });
  }

  protected onSend(): void {
    if (this.form.invalid || this.sending()) {
      return;
    }

    this.sending.set(true);

    const formValue = this.form.value;
    const request: SendEmailRequest = {
      toEmail: formValue.toEmail ?? '',
      toName: formValue.toName || undefined,
      ccEmails: formValue.ccEmails || undefined,
      bccEmails: formValue.bccEmails || undefined,
      subject: formValue.subject ?? '',
      htmlBody: formValue.htmlBody ?? '',
      templateId: this.selectedTemplateId() ?? undefined,
      relatedEntityType: formValue.relatedEntityType ?? undefined,
      relatedEntityId: formValue.relatedEntityId ?? undefined
    };

    this.emailService.send(request).subscribe({
      next: () => {
        this.toast.show('success', 'Email sent successfully');
        this.sending.set(false);
        this.sent.emit();
        this.close();
      },
      error: (err) => {
        this.toast.show('error', err?.error?.message ?? 'Failed to send email');
        this.sending.set(false);
      }
    });
  }

  protected onCancel(): void {
    this.close();
  }

  private close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      toEmail: this.defaultToEmail,
      toName: this.defaultToName,
      ccEmails: '',
      bccEmails: '',
      subject: this.defaultSubject,
      htmlBody: '',
      relatedEntityType: this.defaultRelatedEntityType ?? null,
      relatedEntityId: this.defaultRelatedEntityId ?? null
    });
    this.selectedTemplateId.set(null);
  }

  private loadTemplates(): void {
    this.emailService.searchTemplates({ isActive: true, pageSize: 100 }).subscribe({
      next: (response) => {
        this.templates.set(response.items);
      },
      error: () => {
        // Silent fail for templates - they're optional
      }
    });
  }
}
