import { ChangeDetectorRef, Component, DestroyRef, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { map } from 'rxjs';

import { Contact, SaveContactRequest, DuplicateContact, ContactRelationship } from '../models/contact.model';
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
import { PropertyDataService } from '../../properties/services/property-data.service';
import { Property } from '../../properties/models/property.model';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';
import { HasUnsavedChanges } from '../../../../core/guards/unsaved-changes.guard';
import { FormDraftDetail, FormDraftSummary } from '../../../../core/drafts/form-draft.model';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';

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
    InputGroupModule,
    InputGroupAddonModule,
    TextareaModule,
    TabsModule,
    TableModule,
    TagModule,
    FileUploadModule,
    AutoCompleteModule,
    DialogModule,
    SplitButtonModule,
    BreadcrumbsComponent
  ],
  templateUrl: "./contact-form.page.html",
  styleUrls: ["./contact-form.page.scss"]
})
export class ContactFormPage implements OnInit, OnDestroy, HasUnsavedChanges {
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

  // C8: Lifecycle stepper
  protected readonly lifecycleStages = [
    { label: 'Lead', value: 'Lead', icon: 'pi-user-plus' },
    { label: 'Prospect', value: 'Prospect', icon: 'pi-search' },
    { label: 'Customer', value: 'Customer', icon: 'pi-check-circle' }
  ];
  protected readonly contactCreatedAt = signal<string | null>(null);

  // C9: Engagement scoring breakdown
  protected engagementBreakdown = computed(() => {
    const activityCount = this.activities().length;
    const oppCount = this.relatedOpportunities().length;
    const hasEmail = !!this.form.email;
    const created = this.contactCreatedAt();
    const recencyDays = created
      ? Math.floor((Date.now() - new Date(created.endsWith('Z') ? created : created + 'Z').getTime()) / 86400000)
      : 999;
    const completeness = [this.form.firstName, this.form.lastName, this.form.email, this.form.phone, this.form.jobTitle, this.form.linkedInProfile]
      .filter(v => !!v).length / 6;

    const activities = Math.min(activityCount / 10, 1) * 30;
    const opportunities = Math.min(oppCount / 3, 1) * 25;
    const email = hasEmail ? 20 : 0;
    const recency = recencyDays <= 7 ? 15 : recencyDays <= 30 ? 10 : recencyDays <= 90 ? 5 : 0;
    const profile = completeness * 10;
    const total = Math.round(activities + opportunities + email + recency + profile);

    return {
      total,
      items: [
        { label: 'Activities', value: Math.round(activities), max: 30, color: '#667eea' },
        { label: 'Opportunities', value: Math.round(opportunities), max: 25, color: '#a855f7' },
        { label: 'Email', value: Math.round(email), max: 20, color: '#ec4899' },
        { label: 'Recency', value: Math.round(recency), max: 15, color: '#22c55e' },
        { label: 'Profile', value: Math.round(profile), max: 10, color: '#f59e0b' }
      ]
    };
  });

  protected accountOptions: Option<string>[] = [];
  protected readonly accounts = signal<Customer[]>([]);
  protected form: SaveContactRequest = this.createEmptyForm();
  private _originalFormSnapshot: string = '';
  protected saving = signal(false);
  protected draftSaving = signal(false);
  protected readonly recentDrafts = signal<FormDraftSummary[]>([]);
  protected readonly draftLibraryVisible = signal(false);
  protected readonly draftLibraryLoading = signal(false);
  protected readonly draftLibraryItems = signal<FormDraftSummary[]>([]);
  protected readonly draftStatusMessage = signal<string | null>(null);
  protected readonly draftModeActive = signal(false);
  protected readonly draftPromptVisible = signal(false);
  protected readonly draftOpenConfirmVisible = signal(false);
  protected readonly leavePromptVisible = signal(false);
  protected readonly activeDraftId = signal<string | null>(null);
  protected firstNameError = signal<string | null>(null);
  protected lastNameError = signal<string | null>(null);
  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly relatedAccounts = signal<Customer[]>([]);
  protected readonly accountHistory = signal<Activity[]>([]);
  protected readonly accountHistoryLoading = signal(false);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly relatedProperties = signal<Property[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);
  protected readonly presenceUsers = signal<Array<{ userId: string; displayName: string; isEditing: boolean }>>([]);
  protected noteText = '';

  // C17: Tags
  protected formTags: string[] = [];
  protected tagSuggestions = signal<string[]>([]);
  private allTags: string[] = [];

  // C19: Reports-To
  protected reportsToOptions = signal<Option<string>[]>([]);

  // C15: Duplicate Detection
  protected duplicateDialogVisible = signal(false);
  protected duplicates = signal<DuplicateContact[]>([]);
  private pendingSave = false;

  // C18: Convert to Opportunity
  protected converting = signal(false);
  private hasShownDraftPrompt = false;

  // C19: Relationships
  protected relationships = signal<ContactRelationship[]>([]);
  protected relationshipsLoading = signal(false);
  private readonly toastService = inject(AppToastService);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly contactData = inject(ContactDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly activityData = inject(ActivityDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly attachmentData = inject(AttachmentDataService);
  private readonly propertyData = inject(PropertyDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  private readonly crmEvents = inject(CrmEventsService);
  private readonly formDraftService = inject(FormDraftService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentUserId = readUserId();

  private editingId: string | null = null;
  private localEditingState = false;
  private editingIdleTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingDraftToOpen: FormDraftSummary | null = null;
  private pendingLeaveResolver: ((value: boolean) => void) | null = null;
  private pendingLeaveDecision: Promise<boolean> | null = null;
  private leaveAfterSave = false;
  private leaveAfterDraftSave = false;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    this.loadRecentDrafts();
    if (this.editingId) {
      this.initializePresence(this.editingId);
    }
    const contact = history.state?.contact as Contact | undefined;
    if (this.editingId && contact) {
      this.prefill(contact);
    } else if (this.editingId) {
      this.contactData.getById(this.editingId).subscribe({
        next: (item) => this.prefill(item),
        error: () => this.raiseToast('error', 'Unable to load contact.')
      });
    } else {
      this._originalFormSnapshot = this.createSnapshot();
    }

    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      queueMicrotask(() => {
        this.accounts.set(res.items);
        this.accountOptions = res.items.map((account: Customer) => ({ label: account.name, value: account.id }));
        this.cdr.markForCheck();
      });
    });

    // C17: Load all existing tags for autocomplete
    this.contactData.getAllTags().subscribe({
      next: (tags) => { this.allTags = tags; },
      error: () => {}
    });

    // C19: Load contacts for Reports-To dropdown
    this.contactData.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => {
        const opts = res.items
          .filter((c: Contact) => c.id !== this.editingId)
          .map((c: Contact) => ({ label: c.name, value: c.id }));
        this.reportsToOptions.set(opts);
      },
      error: () => {}
    });
  }

  ngOnDestroy(): void {
    this.resolvePendingLeave(false);
    this.clearEditingIdleTimer();
    if (this.editingId) {
      this.crmEvents.setRecordEditingState('contact', this.editingId, false);
      this.crmEvents.leaveRecordPresence('contact', this.editingId);
    }
  }

  @HostListener('input')
  @HostListener('change')
  protected onCollaborativeEditingActivity(): void {
    if (!this.editingId || !this.isEditMode()) {
      return;
    }

    if (!this.localEditingState) {
      this.localEditingState = true;
      this.crmEvents.setRecordEditingState('contact', this.editingId, true);
    }

    this.clearEditingIdleTimer();
    this.editingIdleTimer = setTimeout(() => {
      if (!this.editingId) {
        return;
      }

      this.localEditingState = false;
      this.crmEvents.setRecordEditingState('contact', this.editingId, false);
    }, 8000);
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  hasUnsavedChanges(): boolean {
    return this._originalFormSnapshot !== '' && this.createSnapshot() !== this._originalFormSnapshot;
  }

  confirmLeaveWithUnsavedChanges(): Promise<boolean> {
    if (this.pendingLeaveDecision) {
      return this.pendingLeaveDecision;
    }

    this.leavePromptVisible.set(true);
    this.pendingLeaveDecision = new Promise<boolean>((resolve) => {
      this.pendingLeaveResolver = resolve;
    });
    return this.pendingLeaveDecision;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges()) {
      event.preventDefault();
    }
  }

  protected onSave(): boolean {
    this.firstNameError.set(!this.form.firstName ? 'First name is required.' : null);
    this.lastNameError.set(!this.form.lastName ? 'Last name is required.' : null);
    if (this.firstNameError() || this.lastNameError()) {
      this.raiseToast('error', 'Please fix the highlighted errors before saving.');
      return false;
    }

    // C15: Check for duplicates before creating (skip if user already confirmed)
    if (!this.editingId && !this.pendingSave) {
      this.contactData.checkDuplicates({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        phone: this.form.phone
      }).subscribe({
        next: (result) => {
          if (result.duplicates.length > 0) {
            this.duplicates.set(result.duplicates);
            this.duplicateDialogVisible.set(true);
            return;
          }
          this.executeSave();
        },
        error: () => this.executeSave() // proceed on error
      });
      return true;
    }

    this.pendingSave = false;
    this.executeSave();
    return true;
  }

  // C15: Called when user confirms save despite duplicates
  protected confirmSaveDespiteDuplicates() {
    this.duplicateDialogVisible.set(false);
    this.pendingSave = true;
    this.onSave();
  }

  protected primarySaveLabel(): string {
    return this.isEditMode() ? 'Update Contact' : 'Create Contact';
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
      entityType: 'contact',
      title: this.buildDraftTitle(),
      subtitle: this.buildDraftSubtitle(),
      payloadJson: JSON.stringify({ form: this.form, formTags: this.formTags })
    }).subscribe({
      next: (draft) => {
        this.draftSaving.set(false);
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft saved at ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
      this._originalFormSnapshot = this.createSnapshot();
        this.loadRecentDrafts();
        if (this.draftLibraryVisible()) {
          this.loadDraftLibrary();
        }
        this.finalizeLeaveAfterDraftSave(true);
      },
      error: () => {
        this.draftSaving.set(false);
        this.draftStatusMessage.set('Unable to save draft.');
        this.raiseToast('error', 'Unable to save draft.');
        this.finalizeLeaveAfterDraftSave(false);
      }
    });
  }

  protected stayOnForm(): void {
    this.resolvePendingLeave(false);
  }

  protected leaveWithoutSaving(): void {
    this.resolvePendingLeave(true);
  }

  protected saveDraftAndLeave(): void {
    this.leaveAfterDraftSave = true;
    this.saveDraft();
  }

  protected submitAndLeave(): void {
    this.leaveAfterSave = true;
    if (!this.onSave()) {
      this.leaveAfterSave = false;
      this.resolvePendingLeave(false);
    }
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

  private executeSave() {
    const payload: SaveContactRequest = {
      ...this.form,
      activityScore: this.form.activityScore ?? 0,
      tags: this.formTags.length > 0 ? this.formTags : undefined,
      reportsToId: this.form.reportsToId || undefined
    };

    this.saving.set(true);
    const request$ = this.editingId
      ? this.contactData.update(this.editingId, payload).pipe(map(() => null))
      : this.contactData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.completeActiveDraft();
        this._originalFormSnapshot = this.createSnapshot();
        const message = this.editingId ? 'Contact updated.' : 'Contact created.';
        this.raiseToast('success', message);
        this.loadRecentDrafts();
        this.finalizeLeaveAfterSave(true);
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update contact.' : 'Unable to create contact.');
        this.finalizeLeaveAfterSave(false);
      }
    });
  }

  // C8: Lifecycle stepper helpers
  protected lifecycleStageIndex(stage?: string): number {
    return this.lifecycleStages.findIndex(s => s.value === stage);
  }

  protected timeInStage(): string {
    const created = this.contactCreatedAt();
    if (!created) return '';
    const diff = Date.now() - new Date(created.endsWith('Z') ? created : created + 'Z').getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return 'Today';
    if (days === 1) return '1 day in stage';
    if (days < 30) return `${days} days in stage`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month in stage' : `${months} months in stage`;
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
  }

  private loadRecentDrafts(): void {
    this.formDraftService.list('contact', { limit: 5, page: 1, pageSize: 5 }).subscribe({
      next: (result) => {
        const items = result.items;
        this.recentDrafts.set(items);
        if (!this.hasShownDraftPrompt && !this.isEditMode() && !this.draftModeActive() && items.length) {
          this.hasShownDraftPrompt = true;
          this.draftPromptVisible.set(true);
        }
      },
      error: () => this.recentDrafts.set([])
    });
  }

  private loadDraftLibrary(): void {
    this.draftLibraryLoading.set(true);
    this.formDraftService.list('contact', { page: 1, pageSize: 50 }).subscribe({
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
        const payload = this.parseDraftPayload(draft);
        this.form = {
          ...this.createEmptyForm(),
          ...(payload.form ?? {})
        };
        this.formTags = payload.formTags ?? [];
        this.activeDraftId.set(draft.id);
        this.draftModeActive.set(true);
        this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
        this._originalFormSnapshot = this.createSnapshot();
        this.draftLibraryVisible.set(false);
      },
      error: () => this.raiseToast('error', 'Unable to open draft.')
    });
  }

  private parseDraftPayload(draft: FormDraftDetail): { form?: Partial<SaveContactRequest>; formTags?: string[] } {
    try {
      return JSON.parse(draft.payloadJson) as { form?: Partial<SaveContactRequest>; formTags?: string[] };
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

  private createSnapshot(): string {
    return JSON.stringify({ form: this.form, formTags: this.formTags });
  }

  private resolvePendingLeave(value: boolean): void {
    const resolver = this.pendingLeaveResolver;
    this.pendingLeaveResolver = null;
    this.pendingLeaveDecision = null;
    this.leaveAfterSave = false;
    this.leaveAfterDraftSave = false;
    this.leavePromptVisible.set(false);
    resolver?.(value);
  }

  private finalizeLeaveAfterSave(success: boolean): void {
    if (!this.leaveAfterSave) {
      return;
    }
    this.resolvePendingLeave(success);
  }

  private finalizeLeaveAfterDraftSave(success: boolean): void {
    if (!this.leaveAfterDraftSave) {
      return;
    }
    this.resolvePendingLeave(success);
  }

  private hasDraftFormChanges(): boolean {
    return JSON.stringify({ form: this.form, formTags: this.formTags }) !== JSON.stringify({ form: this.createEmptyForm(), formTags: [] });
  }

  private buildDraftTitle(): string {
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    return fullName || 'Untitled contact draft';
  }

  private buildDraftSubtitle(): string | null {
    const account = this.accounts().find((item) => item.id === this.form.accountId);
    return account?.name ?? null;
  }

  private buildDraftMenuMarkup(draft: FormDraftSummary): string {
    const title = this.escapeDraftText(draft.title);
    const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No account');
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
      linkedInProfile: '',
      street: contact.street,
      city: contact.city,
      state: contact.state,
      postalCode: contact.postalCode,
      country: contact.country,
      tags: contact.tags ?? [],
      reportsToId: contact.reportsToId
    };
    this.formTags = contact.tags ? [...contact.tags] : [];
    this.loadDetailData();
    this.contactCreatedAt.set(contact.createdAt ?? null);
        this._originalFormSnapshot = this.createSnapshot();
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
      linkedInProfile: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      tags: [],
      reportsToId: undefined
    };
  }

  private initializePresence(recordId: string): void {
    this.crmEvents.joinRecordPresence('contact', recordId);
    this.crmEvents.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event?.payload) {
          return;
        }

        const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
        const payloadRecordId = String(event.payload['recordId'] ?? '');
        if (entityType !== 'contact' || payloadRecordId !== recordId) {
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

  // C17: Tag autocomplete filtering
  protected onTagSearch(event: { query: string }) {
    const q = event.query.toLowerCase();
    this.tagSuggestions.set(
      this.allTags.filter(t => t.toLowerCase().includes(q) && !this.formTags.includes(t))
    );
  }

  // C18: Convert contact to opportunity
  protected convertToOpportunity() {
    this.converting.set(true);
    const params: Record<string, string> = {};
    if (this.form.accountId) params['accountId'] = this.form.accountId;
    if (this.editingId) params['contactId'] = this.editingId;
    this.router.navigate(['/app/deals/new'], { queryParams: params });
  }

  // C19: Load relationships
  private loadRelationships() {
    if (!this.editingId) return;
    this.relationshipsLoading.set(true);
    this.contactData.getRelationships(this.editingId).subscribe({
      next: (rels) => {
        this.relationships.set(rels);
        this.relationshipsLoading.set(false);
      },
      error: () => {
        this.relationshipsLoading.set(false);
      }
    });
  }

  protected relationshipIcon(type: string): string {
    switch (type) {
      case 'ReportsTo': return 'pi-arrow-up';
      case 'DirectReport': return 'pi-arrow-down';
      case 'SameAccount': return 'pi-building';
      default: return 'pi-link';
    }
  }

  private loadDetailData() {
    if (!this.editingId) {
      return;
    }

    // C19: Load relationships
    this.loadRelationships();

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

    this.propertyData.search({ contactId: this.editingId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedProperties.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load related properties.')
    });
  }
}
