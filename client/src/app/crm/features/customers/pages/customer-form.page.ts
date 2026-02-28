import { Component, DestroyRef, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { Activity } from '../../activities/models/activity.model';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AttachmentDataService, AttachmentItem } from '../../../../shared/services/attachment-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';

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
  templateUrl: "./customer-form.page.html",
  styleUrls: ["./customer-form.page.scss"]
})
export class CustomerFormPage implements OnInit, OnDestroy {
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
  private readonly crmEvents = inject(CrmEventsService);
  private readonly destroyRef = inject(DestroyRef);
  protected customerId: string | null = null;

  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedContacts = signal<Contact[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);
  protected readonly parentAccountOptions = signal<{ label: string; value: string }[]>([]);
  protected readonly presenceUsers = signal<Array<{ userId: string; displayName: string }>>([]);

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
    address: '',
    parentAccountId: undefined
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly customerData: CustomerDataService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.initializePresence(this.customerId);
      this.isEditMode.set(true);
      this.loadCustomer();
      this.loadDetailData();
    }

    this.customerData.search({ page: 1, pageSize: 200 }).subscribe((res) => {
      const items = res.items
        .filter((item) => item.id !== this.customerId)
        .map((item) => ({ label: item.name, value: item.id }));
      setTimeout(() => {
        this.parentAccountOptions.set(items);
      }, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.customerId) {
      this.crmEvents.leaveRecordPresence('customer', this.customerId);
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
          address: customer.address || '',
          parentAccountId: customer.parentAccountId
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
      description: this.form.description,
      parentAccountId: this.form.parentAccountId
    };

    if (this.customerId) {
      this.customerData.update(this.customerId, payload).subscribe({
        next: () => {
          this.saving.set(false);
          this.raiseToast('success', 'Customer updated.');
        },
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update customer.');
        }
      });
    } else {
      this.customerData.create(payload).subscribe({
        next: () => {
          this.saving.set(false);
          this.raiseToast('success', 'Customer created.');
        },
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

  protected relatedContactsSorted() {
    return [...this.relatedContacts()].sort((a, b) =>
      (a.createdAt ?? '').localeCompare(b.createdAt ?? '')
    );
  }

  protected relatedOpportunitiesSorted() {
    return [...this.relatedOpportunities()].sort((a, b) =>
      (a.createdAtUtc ?? '').localeCompare(b.createdAtUtc ?? '')
    );
  }

  protected contactCount() {
    return this.relatedContacts().length;
  }

  protected opportunityCount() {
    return this.relatedOpportunities().length;
  }

  protected latestContactCreatedAt() {
    const latest = this.relatedContactsSorted().slice(-1)[0];
    return latest?.createdAt ?? null;
  }

  protected latestOpportunityCreatedAt() {
    const latest = this.relatedOpportunitiesSorted().slice(-1)[0];
    return latest?.createdAtUtc ?? null;
  }

  private initializePresence(recordId: string): void {
    this.crmEvents.joinRecordPresence('customer', recordId);
    this.crmEvents.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event?.payload) {
          return;
        }

        const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
        const payloadRecordId = String(event.payload['recordId'] ?? '');
        if (entityType !== 'customer' || payloadRecordId !== recordId) {
          return;
        }

        if (event.eventType === 'record.presence.snapshot') {
          const usersRaw = Array.isArray(event.payload['users']) ? event.payload['users'] : [];
          const users = usersRaw
            .map((item) => {
              const value = item as Record<string, unknown>;
              return {
                userId: String(value['userId'] ?? ''),
                displayName: String(value['displayName'] ?? 'User')
              };
            })
            .filter((item) => !!item.userId);
          this.presenceUsers.set(users);
          return;
        }

        if (event.eventType === 'record.presence.changed') {
          const userId = String(event.payload['userId'] ?? '');
          const displayName = String(event.payload['displayName'] ?? 'User');
          const action = String(event.payload['action'] ?? '').toLowerCase();
          if (!userId) {
            return;
          }

          this.presenceUsers.update((users) => {
            if (action === 'joined') {
              if (users.some((user) => user.userId === userId)) {
                return users;
              }
              return [...users, { userId, displayName }];
            }
            if (action === 'left') {
              return users.filter((user) => user.userId !== userId);
            }
            return users;
          });
        }
      });
  }
}
