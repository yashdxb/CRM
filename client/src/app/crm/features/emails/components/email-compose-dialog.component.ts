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
      header="Compose Email"
      [(visible)]="visible"
      [modal]="true"
      [dismissableMask]="true"
      [style]="{ width: '720px', maxWidth: '95vw' }"
      [contentStyle]="{ padding: '1.5rem' }"
      (onHide)="onCancel()"
    >
      <form [formGroup]="form" class="compose-form">
        <!-- Template Selection -->
        <div class="field template-field">
          <label>Template (optional)</label>
          <p-select
            appendTo="body"
            [options]="templates()"
            optionLabel="name"
            optionValue="id"
            [ngModel]="selectedTemplateId()"
            (ngModelChange)="onTemplateSelected($event)"
            [ngModelOptions]="{ standalone: true }"
            placeholder="Select a template..."
            [showClear]="true"
            styleClass="w-full"
          >
            <ng-template pTemplate="item" let-item>
              <div class="template-option">
                <i class="pi pi-file-edit"></i>
                <span>{{ item.name }}</span>
                <span class="template-category" *ngIf="item.category">({{ item.category }})</span>
              </div>
            </ng-template>
          </p-select>
        </div>

        <!-- Recipients -->
        <div class="field">
          <label>To <span class="required">*</span></label>
          <input
            pInputText
            formControlName="toEmail"
            placeholder="recipient@example.com"
            class="w-full"
          />
          <small class="field-hint">Primary recipient email address</small>
        </div>

        <div class="field-row">
          <div class="field">
            <label>CC</label>
            <input
              pInputText
              formControlName="ccEmails"
              placeholder="cc1@example.com, cc2@example.com"
              class="w-full"
            />
            <small class="field-hint">Comma-separated (optional)</small>
          </div>
          <div class="field">
            <label>BCC</label>
            <input
              pInputText
              formControlName="bccEmails"
              placeholder="bcc@example.com"
              class="w-full"
            />
            <small class="field-hint">Comma-separated (optional)</small>
          </div>
        </div>

        <!-- Recipient Name (optional) -->
        <div class="field">
          <label>Recipient Name</label>
          <input
            pInputText
            formControlName="toName"
            placeholder="John Doe (optional)"
            class="w-full"
          />
        </div>

        <!-- Subject -->
        <div class="field">
          <label>Subject <span class="required">*</span></label>
          <input
            pInputText
            formControlName="subject"
            placeholder="Email subject..."
            class="w-full"
          />
        </div>

        <!-- Body -->
        <div class="field">
          <label>Message <span class="required">*</span></label>
          <p-editor
            formControlName="htmlBody"
            [style]="{ height: '200px' }"
            placeholder="Write your message..."
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
              </span>
              <span class="ql-formats">
                <button type="button" class="ql-clean" aria-label="Remove Formatting"></button>
              </span>
            </ng-template>
          </p-editor>
        </div>

        <!-- Related Entity -->
        <div class="field-row related-entity-row" *ngIf="showRelatedEntity">
          <div class="field">
            <label>Link to</label>
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
                  <i [class]="'pi ' + item.icon"></i>
                  <span>{{ item.label }}</span>
                </div>
              </ng-template>
              <ng-template pTemplate="value" let-item>
                <div class="entity-option" *ngIf="item">
                  <i [class]="'pi ' + item.icon"></i>
                  <span>{{ item.label }}</span>
                </div>
                <span *ngIf="!item" class="select-placeholder">Select type...</span>
              </ng-template>
            </p-select>
          </div>
          <div class="field" *ngIf="form.value.relatedEntityType">
            <label>Entity ID</label>
            <input
              pInputText
              formControlName="relatedEntityId"
              placeholder="Enter ID..."
              class="w-full"
            />
          </div>
        </div>
      </form>

      <ng-template pTemplate="footer">
        <div class="dialog-footer">
          <button
            pButton
            type="button"
            class="crm-button crm-button--ghost"
            label="Cancel"
            (click)="onCancel()"
          ></button>
          <button
            pButton
            type="button"
            class="crm-button crm-button--primary"
            [label]="sending() ? 'Sending...' : 'Send Email'"
            [disabled]="form.invalid || sending()"
            (click)="onSend()"
          >
            <i class="pi pi-send" *ngIf="!sending()"></i>
            <p-progressSpinner
              *ngIf="sending()"
              [style]="{ width: '16px', height: '16px' }"
              strokeWidth="3"
            ></p-progressSpinner>
          </button>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .compose-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .field label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-color-secondary);
    }

    .field .required {
      color: #ef4444;
    }

    .field-hint {
      font-size: 0.75rem;
      color: var(--text-color-secondary);
      opacity: 0.7;
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 600px) {
      .field-row {
        grid-template-columns: 1fr;
      }
    }

    .template-field {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--surface-border);
      margin-bottom: 0.5rem;
    }

    .template-option,
    .entity-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .template-category {
      font-size: 0.75rem;
      color: var(--text-color-secondary);
    }

    .related-entity-row {
      padding-top: 0.5rem;
      border-top: 1px solid var(--surface-border);
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .select-placeholder {
      color: var(--text-color-secondary);
    }

    :host ::ng-deep {
      .p-editor-container {
        border-radius: 6px;
      }

      .p-editor-content {
        border-radius: 0 0 6px 6px;
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
