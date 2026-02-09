import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
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
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { Activity } from '../../activities/models/activity.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AttachmentDataService, AttachmentItem } from '../../../../shared/services/attachment-data.service';

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
  templateUrl: "./contact-form.page.html",
  styleUrls: ["./contact-form.page.scss"]
})
export class ContactFormPage implements OnInit {
  protected readonly lifecycleOptions: Option<string>[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];
  protected readonly buyingRoleOptions: Option<string>[] = [
    { label: 'Decision Maker', value: 'Decision Maker' },
    { label: 'Champion', value: 'Champion' },
    { label: 'Influencer', value: 'Influencer' },
    { label: 'Procurement', value: 'Procurement' },
    { label: 'Technical Evaluator', value: 'Technical Evaluator' }
  ];

  protected accountOptions: Option<string>[] = [];
  protected readonly accounts = signal<Customer[]>([]);
  protected form: SaveContactRequest = this.createEmptyForm();
  protected saving = signal(false);
  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly relatedAccounts = signal<Customer[]>([]);
  protected readonly accountHistory = signal<Activity[]>([]);
  protected readonly accountHistoryLoading = signal(false);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);
  protected noteText = '';
  private readonly toastService = inject(AppToastService);
  private readonly cdr = inject(ChangeDetectorRef);

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
      queueMicrotask(() => {
        this.accounts.set(res.items);
        this.accountOptions = res.items.map((account: Customer) => ({ label: account.name, value: account.id }));
        this.cdr.markForCheck();
      });
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
        this.raiseToast('success', message);
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
      buyingRole: contact.buyingRole,
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
      buyingRole: undefined,
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

  protected relatedOpportunitiesSorted() {
    return [...this.relatedOpportunities()].sort((a, b) =>
      (a.createdAtUtc ?? '').localeCompare(b.createdAtUtc ?? '')
    );
  }

  protected relatedAccountsSorted() {
    return [...this.relatedAccounts()].sort((a, b) => a.name.localeCompare(b.name));
  }

  protected relatedAccountRelation(account: Customer): string {
    const currentId = this.form.accountId;
    const currentParent = this.linkedAccount()?.parentAccountId;
    if (!currentId) return 'Related';
    if (account.id === currentParent) return 'Parent';
    if (account.parentAccountId === currentId) return 'Child';
    if (currentParent && account.parentAccountId === currentParent) return 'Sibling';
    return 'Related';
  }

  protected opportunityCount() {
    return this.relatedOpportunities().length;
  }

  protected latestOpportunityCreatedAt() {
    const latest = this.relatedOpportunitiesSorted().slice(-1)[0];
    return latest?.createdAtUtc ?? null;
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

      this.customerData.getRelatedAccounts(this.form.accountId).subscribe({
        next: (res) => this.relatedAccounts.set(res),
        error: () => this.raiseToast('error', 'Unable to load related accounts.')
      });

      this.accountHistoryLoading.set(true);
      this.activityData
        .search({
          relatedEntityType: 'Account',
          relatedEntityId: this.form.accountId,
          page: 1,
          pageSize: 20
        })
        .subscribe({
          next: (res) => {
            const ordered = [...res.items].sort(
              (a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? '')
            );
            this.accountHistory.set(ordered);
            this.accountHistoryLoading.set(false);
          },
          error: () => {
            this.accountHistoryLoading.set(false);
            this.raiseToast('error', 'Unable to load account history.');
          }
        });
    }

    this.attachmentData.list('Contact', this.editingId).subscribe({
      next: (items) => this.attachments.set(items),
      error: () => this.raiseToast('error', 'Unable to load attachments.')
    });
  }
}
