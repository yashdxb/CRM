import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { HelpDeskCase, HelpDeskCaseComment, HelpDeskCaseEscalation, HelpDeskQueue, SaveHelpDeskCaseRequest } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';
import { AttachmentDataService, AttachmentItem } from '../../../../shared/services/attachment-data.service';

@Component({
  selector: 'app-helpdesk-case-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, TabsModule, RouterLink, BreadcrumbsComponent, FileUploadModule, CheckboxModule, InputNumberModule],
  templateUrl: './helpdesk-case-detail.page.html',
  styleUrl: './helpdesk-case-detail.page.scss'
})
export class HelpDeskCaseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(HelpDeskDataService);
  private readonly attachments = inject(AttachmentDataService);
  private readonly toast = inject(AppToastService);
  private readonly caseId = this.route.snapshot.paramMap.get('id');

  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly caseRecord = signal<HelpDeskCase | null>(null);
  protected readonly comments = signal<HelpDeskCaseComment[]>([]);
  protected readonly escalations = signal<HelpDeskCaseEscalation[]>([]);
  protected readonly queues = signal<HelpDeskQueue[]>([]);
  protected readonly activeTab = signal('overview');
  protected readonly commentAttachmentUploading = signal(false);
  protected readonly pendingCommentAttachments = signal<AttachmentItem[]>([]);
  protected readonly selectedMacro = signal<string | null>(null);
  protected readonly canManage = computed(() =>
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.helpDeskManage)
  );

  protected readonly statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending Customer', value: 'Pending Customer' },
    { label: 'Pending Internal', value: 'Pending Internal' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' }
  ];
  protected readonly priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];
  protected readonly severityOptions = [
    { label: 'S1', value: 'S1' },
    { label: 'S2', value: 'S2' },
    { label: 'S3', value: 'S3' },
    { label: 'S4', value: 'S4' }
  ];
  protected readonly sourceOptions = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Email', value: 'Email' }
  ];
  protected readonly queueOptions = computed(() =>
    this.queues().map((q) => ({ label: q.name, value: q.id }))
  );
  protected readonly closureReasonOptions = [
    { label: 'Resolved by product guidance', value: 'Resolved by product guidance' },
    { label: 'Bug fix deployed', value: 'Bug fix deployed' },
    { label: 'Configuration issue', value: 'Configuration issue' },
    { label: 'User training required', value: 'User training required' },
    { label: 'Third-party dependency', value: 'Third-party dependency' }
  ];
  protected readonly macroOptions = [
    { label: 'Request logs', value: 'request-logs', body: 'Please share recent logs, timestamps, and exact reproduction steps so we can isolate the issue quickly.' },
    { label: 'Request environment details', value: 'request-env', body: 'Please confirm environment, browser version, and tenant key. This helps us validate configuration-specific behavior.' },
    { label: 'Closure confirmation', value: 'closure-confirm', body: 'The fix has been applied. Please confirm whether the issue is fully resolved on your side.' }
  ];
  protected readonly commentForm = this.fb.group({
    body: ['', [Validators.required, Validators.maxLength(4000)]],
    isInternal: [true]
  });
  protected readonly form = this.fb.group({
    subject: ['', [Validators.required, Validators.maxLength(240)]],
    description: ['', [Validators.required, Validators.maxLength(4000)]],
    priority: ['Medium', [Validators.required]],
    severity: ['S3', [Validators.required]],
    category: ['General', [Validators.required]],
    subcategory: [''],
    source: ['Manual', [Validators.required]],
    queueId: [null as string | null],
    closureReason: [null as string | null],
    csatScore: [null as number | null],
    csatFeedback: ['']
  });

  constructor() {
    this.loadQueues();
    if (this.caseId) {
      this.loadCase(this.caseId);
    }
  }

  protected isNewCase() {
    return !this.caseId;
  }

  protected save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const payload: SaveHelpDeskCaseRequest = {
      subject: raw.subject ?? '',
      description: raw.description ?? '',
      priority: raw.priority ?? 'Medium',
      severity: raw.severity ?? 'S3',
      category: raw.category ?? 'General',
      subcategory: raw.subcategory ?? null,
      source: raw.source ?? 'Manual',
      queueId: raw.queueId ?? null,
      accountId: this.caseRecord()?.accountId ?? null,
      contactId: this.caseRecord()?.contactId ?? null,
      ownerUserId: this.caseRecord()?.ownerUserId ?? null,
      closureReason: raw.closureReason ?? null,
      csatScore: raw.csatScore ?? null,
      csatFeedback: raw.csatFeedback ?? null
    };

    const request$ = this.caseId
      ? this.data.updateCase(this.caseId, payload)
      : this.data.createCase(payload);

    request$.subscribe({
      next: (res: any) => {
        this.saving.set(false);
        this.toast.show('success', this.caseId ? 'Case updated.' : 'Case created.');
        if (!this.caseId && res?.id) {
          this.router.navigate(['/app/helpdesk/cases', res.id]);
          return;
        }

        if (this.caseId) {
          this.loadCase(this.caseId);
        }
      },
      error: () => {
        this.saving.set(false);
        this.toast.show('error', 'Unable to save case.');
      }
    });
  }

  protected onActiveTabChange(value: string | number | undefined) {
    if (typeof value === 'string') {
      this.activeTab.set(value);
    }
  }

  protected updateStatus(status: string) {
    if (!this.caseId) {
      return;
    }

    this.data.updateStatus(this.caseId, status, null).subscribe({
      next: () => {
        this.toast.show('success', `Case status updated to ${status}.`);
        this.loadCase(this.caseId!);
      },
      error: () => this.toast.show('error', 'Unable to update case status.')
    });
  }

  protected addComment() {
    if (!this.caseId || this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const payload = this.commentForm.getRawValue();
    const attachmentIds = this.pendingCommentAttachments().map((item) => item.id);
    this.data.addComment(this.caseId, payload.body ?? '', !!payload.isInternal, attachmentIds).subscribe({
      next: () => {
        this.commentForm.reset({ body: '', isInternal: true });
        this.pendingCommentAttachments.set([]);
        this.selectedMacro.set(null);
        this.toast.show('success', 'Comment added.');
        this.loadCase(this.caseId!);
      },
      error: () => this.toast.show('error', 'Unable to add comment.')
    });
  }

  protected uploadCommentAttachment(event: { files?: File[] }) {
    if (!this.caseId || !event.files?.length) {
      return;
    }

    const file = event.files[0];
    this.commentAttachmentUploading.set(true);
    this.attachments.upload(file, 'SupportCase', this.caseId).subscribe({
      next: (attachment) => {
        this.pendingCommentAttachments.set([...this.pendingCommentAttachments(), attachment]);
        this.commentAttachmentUploading.set(false);
      },
      error: (err) => {
        this.commentAttachmentUploading.set(false);
        const message = typeof err?.error?.message === 'string' && err.error.message.trim().length > 0
          ? err.error.message
          : 'Unable to upload attachment.';
        this.toast.show('error', message);
      }
    });
  }

  protected removePendingAttachment(attachmentId: string) {
    this.attachments.delete(attachmentId).subscribe({
      next: () => this.pendingCommentAttachments.set(this.pendingCommentAttachments().filter((item) => item.id !== attachmentId)),
      error: () => this.toast.show('error', 'Unable to remove attachment.')
    });
  }

  protected formatBytes(size: number) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  protected applyMacro(macroKey: string | null) {
    if (!macroKey) {
      return;
    }

    const macro = this.macroOptions.find((item) => item.value === macroKey);
    if (!macro) {
      return;
    }

    const current = this.commentForm.controls.body.value ?? '';
    const next = current.trim().length ? `${current.trim()}\n\n${macro.body}` : macro.body;
    this.commentForm.controls.body.setValue(next);
  }

  protected getSlaState() {
    const row = this.caseRecord();
    if (!row) {
      return 'unknown';
    }

    if (!['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status)) {
      return 'resolved';
    }

    const due = new Date(row.resolutionDueUtc).getTime();
    const now = Date.now();
    if (due < now) {
      return 'breached';
    }

    if (due <= now + 60 * 60 * 1000) {
      return 'at-risk';
    }

    return 'healthy';
  }

  protected formatDueIn(dueUtc?: string | null) {
    if (!dueUtc) {
      return '-';
    }

    const ms = new Date(dueUtc).getTime() - Date.now();
    const absoluteMinutes = Math.round(Math.abs(ms) / 60000);
    const hours = Math.floor(absoluteMinutes / 60);
    const minutes = absoluteMinutes % 60;
    const token = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    return ms >= 0 ? `in ${token}` : `${token} overdue`;
  }

  private loadCase(id: string) {
    this.loading.set(true);
    this.data.getCase(id).subscribe({
      next: (res) => {
        this.caseRecord.set(res.case);
        this.comments.set(res.comments ?? []);
        this.escalations.set(res.escalations ?? []);
        this.form.patchValue({
          subject: res.case.subject,
          description: res.case.description ?? '',
          priority: res.case.priority,
          severity: res.case.severity,
          category: res.case.category,
          subcategory: res.case.subcategory ?? '',
          source: res.case.source,
          queueId: res.case.queueId ?? null,
          closureReason: res.case.closureReason ?? null,
          csatScore: res.case.csatScore ?? null,
          csatFeedback: res.case.csatFeedback ?? ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load case.');
      }
    });
  }

  private loadQueues() {
    this.data.listQueues().subscribe({
      next: (queues) => this.queues.set(queues ?? []),
      error: () => this.queues.set([])
    });
  }
}
