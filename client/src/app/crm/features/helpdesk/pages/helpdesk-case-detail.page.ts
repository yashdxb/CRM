import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { HelpDeskCase, HelpDeskCaseComment, HelpDeskCaseEscalation, HelpDeskQueue, SaveHelpDeskCaseRequest } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';

@Component({
  selector: 'app-helpdesk-case-detail-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, TabsModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './helpdesk-case-detail.page.html',
  styleUrl: './helpdesk-case-detail.page.scss'
})
export class HelpDeskCaseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(HelpDeskDataService);
  private readonly toast = inject(AppToastService);
  private readonly caseId = this.route.snapshot.paramMap.get('id');

  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly caseRecord = signal<HelpDeskCase | null>(null);
  protected readonly comments = signal<HelpDeskCaseComment[]>([]);
  protected readonly escalations = signal<HelpDeskCaseEscalation[]>([]);
  protected readonly queues = signal<HelpDeskQueue[]>([]);
  protected readonly activeTab = signal('overview');
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
    queueId: [null as string | null]
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
      ownerUserId: this.caseRecord()?.ownerUserId ?? null
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
    this.data.addComment(this.caseId, payload.body ?? '', !!payload.isInternal).subscribe({
      next: () => {
        this.commentForm.reset({ body: '', isInternal: true });
        this.toast.show('success', 'Comment added.');
        this.loadCase(this.caseId!);
      },
      error: () => this.toast.show('error', 'Unable to add comment.')
    });
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
          queueId: res.case.queueId ?? null
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
