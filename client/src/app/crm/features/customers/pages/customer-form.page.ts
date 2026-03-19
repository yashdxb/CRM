import { Component, DestroyRef, HostListener, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';

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
import { PropertyDataService } from '../../properties/services/property-data.service';
import { Property } from '../../properties/models/property.model';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';
import { FormDraftDetail, FormDraftSummary } from '../../../../core/drafts/form-draft.model';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';

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
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    DialogModule,
    SplitButtonModule,
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

  protected readonly accountTypeOptions = [
    { label: 'Customer', value: 'Customer', icon: 'pi-users' },
    { label: 'Partner', value: 'Partner', icon: 'pi-handshake' },
    { label: 'Competitor', value: 'Competitor', icon: 'pi-bolt' },
    { label: 'Vendor', value: 'Vendor', icon: 'pi-truck' }
  ];

  protected readonly ratingOptions = [
    { label: 'Hot', value: 'Hot', icon: 'pi-sun' },
    { label: 'Warm', value: 'Warm', icon: 'pi-cloud' },
    { label: 'Cold', value: 'Cold', icon: 'pi-snowflake' }
  ];

  protected readonly accountSourceOptions = [
    { label: 'Web', value: 'Web', icon: 'pi-globe' },
    { label: 'Referral', value: 'Referral', icon: 'pi-share-alt' },
    { label: 'Partner', value: 'Partner', icon: 'pi-handshake' },
    { label: 'Trade Show', value: 'Trade Show', icon: 'pi-calendar' },
    { label: 'Other', value: 'Other', icon: 'pi-ellipsis-h' }
  ];

  protected readonly isEditMode = signal(false);
  protected readonly saving = signal(false);
  protected readonly draftSaving = signal(false);
  protected readonly loading = signal(false);
  protected readonly recentDrafts = signal<FormDraftSummary[]>([]);
  protected readonly draftLibraryVisible = signal(false);
  protected readonly draftLibraryLoading = signal(false);
  protected readonly draftLibraryItems = signal<FormDraftSummary[]>([]);
  protected readonly draftStatusMessage = signal<string | null>(null);
  protected readonly draftModeActive = signal(false);
  protected readonly draftPromptVisible = signal(false);
  protected readonly draftOpenConfirmVisible = signal(false);
  protected readonly activeDraftId = signal<string | null>(null);
  protected readonly nameError = signal<string | null>(null);
  private readonly toastService = inject(AppToastService);
  private readonly activityData = inject(ActivityDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly attachmentData = inject(AttachmentDataService);
  private readonly propertyData = inject(PropertyDataService);
  private readonly crmEvents = inject(CrmEventsService);
  private readonly formDraftService = inject(FormDraftService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserId = readUserId();
  protected customerId: string | null = null;

  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedContacts = signal<Contact[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly relatedProperties = signal<Property[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);
  protected readonly parentAccountOptions = signal<{ label: string; value: string }[]>([]);
  protected readonly presenceUsers = signal<Array<{ userId: string; displayName: string; isEditing: boolean }>>([]);
  protected readonly duplicateWarning = signal<{ matchId: string; matchName: string } | null>(null);
  private duplicateCheckTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingDraftToOpen: FormDraftSummary | null = null;
  private hasShownDraftPrompt = false;

  protected noteText = '';
  private localEditingState = false;
  private editingIdleTimer: ReturnType<typeof setTimeout> | null = null;

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
    parentAccountId: undefined,
    territory: '',
    annualRevenue: undefined,
    numberOfEmployees: undefined,
    accountType: undefined,
    rating: undefined,
    accountSource: undefined,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: ''
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly customerData: CustomerDataService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.loadRecentDrafts();
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
    this.clearEditingIdleTimer();
    if (this.customerId) {
      this.crmEvents.setRecordEditingState('customer', this.customerId, false);
      this.crmEvents.leaveRecordPresence('customer', this.customerId);
    }
  }

  @HostListener('input')
  @HostListener('change')
  protected onCollaborativeEditingActivity(): void {
    if (!this.customerId || !this.isEditMode()) {
      return;
    }

    if (!this.localEditingState) {
      this.localEditingState = true;
      this.crmEvents.setRecordEditingState('customer', this.customerId, true);
    }

    this.clearEditingIdleTimer();
    this.editingIdleTimer = setTimeout(() => {
      if (!this.customerId) {
        return;
      }

      this.localEditingState = false;
      this.crmEvents.setRecordEditingState('customer', this.customerId, false);
    }, 8000);
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
          website: customer.website || '',
          industry: customer.industry || '',
          description: customer.notes?.join(', ') || '',
          email: customer.email || '',
          company: customer.company || '',
          address: customer.address || '',
          parentAccountId: customer.parentAccountId,
          territory: customer.territory || '',
          annualRevenue: customer.annualRevenue,
          numberOfEmployees: customer.numberOfEmployees,
          accountType: customer.accountType,
          rating: customer.rating,
          accountSource: customer.accountSource
        };
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load customer.');
      }
    });
  }

  protected checkForDuplicate(): void {
    if (this.duplicateCheckTimer) {
      clearTimeout(this.duplicateCheckTimer);
    }
    this.duplicateCheckTimer = setTimeout(() => {
      const { name, accountNumber, website, phone } = this.form;
      if (!name && !accountNumber && !website && !phone) {
        this.duplicateWarning.set(null);
        return;
      }
      this.customerData.checkDuplicate({
        name: name || undefined,
        accountNumber: accountNumber || undefined,
        website: website || undefined,
        phone: phone || undefined,
        excludeId: this.customerId || undefined
      }).subscribe({
        next: (res) => {
          this.duplicateWarning.set(
            res.isDuplicate && res.matchId && res.matchName
              ? { matchId: res.matchId, matchName: res.matchName }
              : null
          );
        },
        error: () => this.duplicateWarning.set(null)
      });
    }, 600);
  }

  protected onSave() {
    this.nameError.set(!this.form.name ? 'Customer name is required.' : null);
    if (this.nameError()) {
      this.raiseToast('error', 'Please fix the highlighted errors before saving.');
      return;
    }

    this.saving.set(true);
    const payload: SaveCustomerRequest = {
      name: this.form.name,
      lifecycleStage: this.form.lifecycleStage,
      phone: this.form.phone,
      website: this.form.website,
      industry: this.form.industry,
      description: this.form.description,
      parentAccountId: this.form.parentAccountId,
      territory: this.form.territory,
      annualRevenue: this.form.annualRevenue,
      numberOfEmployees: this.form.numberOfEmployees,
      accountType: this.form.accountType,
      rating: this.form.rating,
      accountSource: this.form.accountSource,
      billingStreet: this.form.billingStreet,
      billingCity: this.form.billingCity,
      billingState: this.form.billingState,
      billingPostalCode: this.form.billingPostalCode,
      billingCountry: this.form.billingCountry,
      shippingStreet: this.form.shippingStreet,
      shippingCity: this.form.shippingCity,
      shippingState: this.form.shippingState,
      shippingPostalCode: this.form.shippingPostalCode,
      shippingCountry: this.form.shippingCountry
    };

    if (this.customerId) {
      this.customerData.update(this.customerId, payload).subscribe({
        next: () => {
          this.saving.set(false);
          this.completeActiveDraft();
          this.raiseToast('success', 'Customer updated.');
          this.loadRecentDrafts();
        },
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update customer.');
        }
      });
    } else {
      this.customerData.create(payload).subscribe({
        next: (created) => {
          this.saving.set(false);
          this.completeActiveDraft();
          this.raiseToast('success', 'Customer created.');
          this.loadRecentDrafts();
          void this.router.navigate(['/app/customers', created.id, 'edit']);
        },
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to create customer.');
        }
      });
    }
  }

  protected primarySaveLabel(): string {
    return this.customerId ? 'Update Customer' : 'Create Customer';
  }

  protected draftButtonLabel(): string {
    const count = this.recentDrafts().length;
    return count > 0 ? `Save Draft (${count})` : 'Save Draft';
  }

  protected draftSplitButtonItems(): MenuItem[] {
    const items: MenuItem[] = [];

    const drafts = this.recentDrafts();
    items.push({ label: 'Saved drafts', disabled: true, styleClass: 'crm-draft-menu-heading' });
    if (!drafts.length) {
      items.push({ label: 'No saved drafts yet', disabled: true, styleClass: 'crm-draft-menu-empty' });
      return items;
    }
    for (const draft of drafts) {
      items.push({
        label: this.buildDraftMenuMarkup(draft),
        escape: false,
        command: () => this.openDraftFromSummary(draft)
      });
    }
    items.push({ separator: true });
    items.push({ label: 'View all drafts', icon: 'pi pi-list', command: () => this.openDraftLibrary() });
    return items;
  }

  protected saveDraft(): void {
    this.draftSaving.set(true);
    this.formDraftService.save({
      id: this.activeDraftId(),
      entityType: 'customer',
      title: this.buildDraftTitle(),
      subtitle: this.buildDraftSubtitle(),
      payloadJson: JSON.stringify(this.form)
    }).subscribe({
      next: (draft) => {
        this.draftSaving.set(false);
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft saved at ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
        this.loadRecentDrafts();
        if (this.draftLibraryVisible()) {
          this.loadDraftLibrary();
        }
      },
      error: () => {
        this.draftSaving.set(false);
        this.draftStatusMessage.set('Unable to save draft.');
        this.raiseToast('error', 'Unable to save draft.');
      }
    });
  }

  protected openDraftFromSummary(draft: FormDraftSummary): void {
    if (this.hasDraftFormChanges()) {
      this.pendingDraftToOpen = draft;
      this.draftOpenConfirmVisible.set(true);
      return;
    }

    this.loadDraft(draft.id);
  }

  protected confirmOpenDraft(): void {
    const draft = this.pendingDraftToOpen;
    this.pendingDraftToOpen = null;
    this.draftOpenConfirmVisible.set(false);
    if (draft) {
      this.loadDraft(draft.id);
    }
  }

  protected cancelOpenDraft(): void {
    this.pendingDraftToOpen = null;
    this.draftOpenConfirmVisible.set(false);
  }

  protected openDraftLibrary(): void {
    this.draftLibraryVisible.set(true);
    this.loadDraftLibrary();
  }

  protected closeDraftLibrary(): void {
    this.draftLibraryVisible.set(false);
  }

  protected dismissDraftPrompt(): void {
    this.draftPromptVisible.set(false);
  }

  protected loadDraftFromPrompt(draft: FormDraftSummary): void {
    this.draftPromptVisible.set(false);
    this.loadDraft(draft.id);
  }

  protected discardDraft(draft: FormDraftSummary, event?: Event): void {
    event?.stopPropagation();
    this.formDraftService.discard(draft.id).subscribe({
      next: () => {
        if (this.activeDraftId() === draft.id) {
          this.activeDraftId.set(null);
          this.draftModeActive.set(false);
          this.draftStatusMessage.set(null);
        }
        this.loadRecentDrafts();
        this.loadDraftLibrary();
      },
      error: () => this.raiseToast('error', 'Unable to discard draft.')
    });
  }

  protected formatDraftTimestamp(value: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(value));
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
    this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
  }

  private loadRecentDrafts(): void {
    this.formDraftService.list('customer', { limit: 5, page: 1, pageSize: 5 }).subscribe({
      next: (result) => {
        const items = result.items;
        this.recentDrafts.set(items);
        if (!this.hasShownDraftPrompt && !this.customerId && !this.draftModeActive() && items.length) {
          this.hasShownDraftPrompt = true;
          this.draftPromptVisible.set(true);
        }
      },
      error: () => this.recentDrafts.set([])
    });
  }

  private loadDraftLibrary(): void {
    this.draftLibraryLoading.set(true);
    this.formDraftService.list('customer', { page: 1, pageSize: 50 }).subscribe({
      next: (result) => {
        this.draftLibraryLoading.set(false);
        this.draftLibraryItems.set(result.items);
      },
      error: () => {
        this.draftLibraryLoading.set(false);
        this.draftLibraryItems.set([]);
      }
    });
  }

  private loadDraft(id: string): void {
    this.formDraftService.get(id).subscribe({
      next: (draft) => {
        this.form = {
          ...this.emptyDraftPayload(),
          ...this.parseDraftPayload(draft)
        };
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
        this.draftLibraryVisible.set(false);
      },
      error: () => this.raiseToast('error', 'Unable to open draft.')
    });
  }

  private parseDraftPayload(draft: FormDraftDetail): Partial<SaveCustomerRequest & { email?: string; company?: string; address?: string }> {
    try {
      return JSON.parse(draft.payloadJson) as Partial<SaveCustomerRequest & { email?: string; company?: string; address?: string }>;
    } catch {
      return {};
    }
  }

  private completeActiveDraft(): void {
    const activeDraftId = this.activeDraftId();
    if (!activeDraftId) {
      return;
    }

    this.formDraftService.complete(activeDraftId).subscribe({ next: () => {}, error: () => {} });
    this.activeDraftId.set(null);
    this.draftModeActive.set(false);
  }

  private hasDraftFormChanges(): boolean {
    return JSON.stringify(this.form) !== JSON.stringify(this.emptyDraftPayload());
  }

  private buildDraftTitle(): string {
    return this.form.name?.trim() || 'Untitled customer draft';
  }

  private buildDraftSubtitle(): string | null {
    return this.form.industry?.trim() || null;
  }

  private buildDraftMenuMarkup(draft: FormDraftSummary): string {
    const title = this.escapeDraftText(draft.title);
    const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No industry');
    const timestamp = this.escapeDraftText(this.formatDraftTimestamp(draft.updatedAtUtc));
    return `<div class="crm-draft-menuitem"><span class="crm-draft-menuitem__title">${title}</span><span class="crm-draft-menuitem__meta">${subtitle} · ${timestamp}</span></div>`;
  }

  private escapeDraftText(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  private emptyDraftPayload(): SaveCustomerRequest & { email?: string; company?: string; address?: string } {
    return {
      name: '',
      lifecycleStage: 'Lead',
      phone: '',
      website: '',
      industry: '',
      description: '',
      email: '',
      company: '',
      address: '',
      parentAccountId: undefined,
      territory: '',
      annualRevenue: undefined,
      numberOfEmployees: undefined,
      accountType: undefined,
      rating: undefined,
      accountSource: undefined,
      billingStreet: '',
      billingCity: '',
      billingState: '',
      billingPostalCode: '',
      billingCountry: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingPostalCode: '',
      shippingCountry: ''
    };
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

    this.propertyData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedProperties.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load related properties.')
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

  protected relatedPropertiesSorted() {
    return [...this.relatedProperties()].sort((a, b) =>
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
                displayName: String(value['displayName'] ?? 'User'),
                isEditing: !!value['isEditing']
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
          const isEditing = !!event.payload['isEditing'];
          if (!userId) {
            return;
          }

          this.presenceUsers.update((users) => {
            if (action === 'joined') {
              if (users.some((user) => user.userId === userId)) {
                return users.map((user) =>
                  user.userId === userId ? { ...user, displayName, isEditing } : user
                );
              }
              return [...users, { userId, displayName, isEditing }];
            }
            if (action === 'left') {
              return users.filter((user) => user.userId !== userId);
            }
            if (action === 'editing_started' || action === 'editing_stopped') {
              const nextEditingState = action === 'editing_started' ? true : isEditing;
              if (users.some((user) => user.userId === userId)) {
                return users.map((user) =>
                  user.userId === userId ? { ...user, displayName, isEditing: nextEditingState } : user
                );
              }
              return [...users, { userId, displayName, isEditing: nextEditingState }];
            }
            return users;
          });
        }
      });
  }

  protected visiblePresenceUsers(): Array<{ userId: string; displayName: string; isEditing: boolean }> {
    return this.presenceUsers().filter((viewer) => !this.isCurrentUser(viewer.userId));
  }

  protected activeEditors(): Array<{ userId: string; displayName: string; isEditing: boolean }> {
    return this.visiblePresenceUsers().filter((viewer) => viewer.isEditing);
  }

  protected viewingPresenceSummary(): string {
    const viewers = this.visiblePresenceUsers();
    if (!viewers.length) {
      return '';
    }

    if (viewers.length === 1) {
      return `${viewers[0].displayName} is viewing this record.`;
    }

    if (viewers.length === 2) {
      return `${viewers[0].displayName} and ${viewers[1].displayName} are viewing this record.`;
    }

    return `${viewers[0].displayName} and ${viewers.length - 1} others are viewing this record.`;
  }

  private isCurrentUser(userId: string): boolean {
    if (!this.currentUserId || !userId) {
      return false;
    }

    return userId.toLowerCase() === this.currentUserId.toLowerCase();
  }

  protected editingPresenceSummary(): string {
    const editors = this.activeEditors();
    if (!editors.length) {
      return '';
    }

    if (editors.length === 1) {
      return `${editors[0].displayName} is editing this record now.`;
    }

    if (editors.length === 2) {
      return `${editors[0].displayName} and ${editors[1].displayName} are editing this record now.`;
    }

    return `${editors[0].displayName} and ${editors.length - 1} others are editing this record now.`;
  }

  private clearEditingIdleTimer(): void {
    if (this.editingIdleTimer) {
      clearTimeout(this.editingIdleTimer);
      this.editingIdleTimer = null;
    }
  }
}
