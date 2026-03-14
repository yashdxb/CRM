import { Component, OnInit, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

import { PropertyDataService } from '../services/property-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  Property, PriceChange, Showing, PropertyDocument, PropertyActivity,
  CmaReport, ComparableProperty, SignatureRequest, PropertyAlertRule, PropertyAlertNotification, PropertyTimelineEvent
} from '../models/property.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { environment } from '../../../../../environments/environment';

export interface LiveAlert {
  id: string;
  type: 'price' | 'showing' | 'status' | 'document' | 'activity' | 'info';
  message: string;
  timestamp: string;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    SkeletonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    TableModule,
    BreadcrumbsComponent
  ]
})
export class PropertyDetailPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly propertyData = inject(PropertyDataService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(AppToastService);
  private readonly crmEvents = inject(CrmEventsService);
  private eventSub?: Subscription;
  private propertyId = '';

  // Live alerts (X9)
  protected liveAlerts = signal<LiveAlert[]>([]);
  protected showLiveBanner = computed(() => this.liveAlerts().length > 0);

  protected property = signal<Property | null>(null);
  protected loading = signal(true);
  protected activeTab = signal<'details' | 'showings' | 'documents' | 'priceHistory' | 'activities' | 'cma' | 'esign' | 'alerts'>('details');

  // Sub-resource data
  protected priceHistory = signal<PriceChange[]>([]);
  protected showings = signal<Showing[]>([]);
  protected documents = signal<PropertyDocument[]>([]);
  protected activities = signal<PropertyActivity[]>([]);
  protected timeline = signal<PropertyTimelineEvent[]>([]);

  // CMA (G3)
  protected cmaReport = signal<CmaReport | null>(null);
  protected cmaLoading = signal(false);

  // E-Signature (G4)
  protected signatureRequests = signal<SignatureRequest[]>([]);
  protected showSignatureDialog = signal(false);

  // Alerts (G5)
  protected alertRules = signal<PropertyAlertRule[]>([]);
  protected alertNotifications = signal<PropertyAlertNotification[]>([]);
  protected showAlertDialog = signal(false);

  // Dialogs
  protected showShowingDialog = signal(false);
  protected showDocumentDialog = signal(false);
  protected showStatusDialog = signal(false);
  protected showActivityDialog = signal(false);
  protected showingScheduledAtLocal = '';

  // Quick action forms
  protected showingForm: FormGroup = this.fb.group({
    visitorName: ['', Validators.required],
    visitorEmail: [''],
    visitorPhone: [''],
    scheduledAtUtc: [null as Date | null, Validators.required],
    durationMinutes: [30]
  });

  protected documentForm: FormGroup = this.fb.group({
    fileName: ['', Validators.required],
    category: ['Other'],
    fileUrl: ['']
  });

  protected activityForm: FormGroup = this.fb.group({
    type: ['Task'],
    subject: ['', Validators.required],
    description: [''],
    dueDate: [null as Date | null],
    priority: ['Medium']
  });

  // E-Signature form (G4)
  protected signatureForm: FormGroup = this.fb.group({
    documentName: ['', Validators.required],
    documentType: ['ListingAgreement'],
    provider: ['DocuSign'],
    signerName: ['', Validators.required],
    signerEmail: ['', [Validators.required, Validators.email]],
    signerRole: ['Buyer']
  });

  // Alert rule form (G5)
  protected alertForm: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    clientEmail: ['', [Validators.required, Validators.email]],
    frequency: ['Daily'],
    minPrice: [null as number | null],
    maxPrice: [null as number | null],
    minBedrooms: [null as number | null]
  });

  protected readonly statusOptions = [
    { label: 'Draft', value: 'Draft', icon: 'pi-file-edit' },
    { label: 'Active', value: 'Active', icon: 'pi-check-circle' },
    { label: 'Conditional', value: 'Conditional', icon: 'pi-clock' },
    { label: 'Sold', value: 'Sold', icon: 'pi-star-fill' },
    { label: 'Terminated', value: 'Terminated', icon: 'pi-times-circle' },
    { label: 'Expired', value: 'Expired', icon: 'pi-calendar-times' },
    { label: 'Delisted', value: 'Delisted', icon: 'pi-minus-circle' }
  ];

  protected readonly documentCategories = [
    { label: 'Photo', value: 'Photo' },
    { label: 'Floor Plan', value: 'FloorPlan' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Inspection', value: 'Inspection' },
    { label: 'Appraisal', value: 'Appraisal' },
    { label: 'Disclosure', value: 'Disclosure' },
    { label: 'Other', value: 'Other' }
  ];

  protected readonly activityTypes = [
    { label: 'Task', value: 'Task', icon: 'pi-check-square' },
    { label: 'Call', value: 'Call', icon: 'pi-phone' },
    { label: 'Email', value: 'Email', icon: 'pi-envelope' },
    { label: 'Meeting', value: 'Meeting', icon: 'pi-users' },
    { label: 'Note', value: 'Note', icon: 'pi-pencil' },
    { label: 'Follow Up', value: 'FollowUp', icon: 'pi-replay' }
  ];

  protected readonly activityPriorities = [
    { label: 'Low', value: 'Low', icon: 'pi-minus' },
    { label: 'Medium', value: 'Medium', icon: 'pi-equals' },
    { label: 'High', value: 'High', icon: 'pi-exclamation-triangle' },
    { label: 'Urgent', value: 'Urgent', icon: 'pi-bolt' }
  ];

  protected readonly signatureDocTypes = [
    { label: 'Purchase Agreement', value: 'PurchaseAgreement', icon: 'pi-file' },
    { label: 'Listing Agreement', value: 'ListingAgreement', icon: 'pi-list' },
    { label: 'Amendment', value: 'Amendment', icon: 'pi-pencil' },
    { label: 'Disclosure', value: 'Disclosure', icon: 'pi-info-circle' },
    { label: 'Other', value: 'Other', icon: 'pi-paperclip' }
  ];

  protected readonly signatureProviders = [
    { label: 'DocuSign', value: 'DocuSign', icon: 'pi-verified' },
    { label: 'HelloSign', value: 'HelloSign', icon: 'pi-check-circle' },
    { label: 'Adobe Sign', value: 'AdobeSign', icon: 'pi-file-pdf' }
  ];

  protected readonly signerRoles = [
    { label: 'Buyer', value: 'Buyer', icon: 'pi-user' },
    { label: 'Seller', value: 'Seller', icon: 'pi-user' },
    { label: 'Agent', value: 'Agent', icon: 'pi-briefcase' },
    { label: 'Lawyer', value: 'Lawyer', icon: 'pi-shield' },
    { label: 'Witness', value: 'Witness', icon: 'pi-eye' }
  ];

  protected readonly alertFrequencies = [
    { label: 'Instant', value: 'Instant', icon: 'pi-bolt' },
    { label: 'Daily', value: 'Daily', icon: 'pi-calendar' },
    { label: 'Weekly', value: 'Weekly', icon: 'pi-calendar-clock' }
  ];

  protected selectedStatus = signal<string>('');

  protected canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.propertiesManage);

  protected daysSinceListed = computed(() => {
    const prop = this.property();
    if (!prop) return 0;
    const ref = prop.listingDateUtc || prop.createdAtUtc;
    const diffMs = Date.now() - new Date(ref).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
  });

  protected timelineEvents = computed(() => this.timeline());

  protected pricePerSqFt = computed(() => {
    const prop = this.property();
    if (!prop?.listPrice || !prop?.squareFeet || prop.squareFeet === 0) return null;
    return Math.round(prop.listPrice / prop.squareFeet);
  });

  protected photoUrlList = computed(() => {
    const prop = this.property();
    const manualUrls = (prop?.photoUrls ?? '')
      .split(',')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
    const uploadedUrls = this.documents()
      .filter((doc) => doc.category === 'Photo' && !!doc.fileUrl)
      .map((doc) => this.resolveMediaUrl(doc.fileUrl));
    return Array.from(new Set([...uploadedUrls, ...manualUrls.map((url) => this.resolveMediaUrl(url))]));
  });

  protected priceChangeDirection = (pc: PriceChange) => pc.newPrice > pc.previousPrice ? 'up' : 'down';
  protected priceChangePct = (pc: PriceChange) => Math.abs(((pc.newPrice - pc.previousPrice) / pc.previousPrice) * 100).toFixed(1);

  protected showingSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Completed': return 'success';
      case 'Scheduled': return 'info';
      case 'Cancelled': return 'warn';
      case 'NoShow': return 'danger';
      default: return 'secondary';
    }
  }

  protected docCategoryIcon(cat: string): string {
    switch (cat) {
      case 'Photo': return 'pi-image';
      case 'FloorPlan': return 'pi-map';
      case 'Contract': return 'pi-file';
      case 'Inspection': return 'pi-search';
      case 'Appraisal': return 'pi-chart-line';
      case 'Disclosure': return 'pi-info-circle';
      default: return 'pi-paperclip';
    }
  }

  protected formatFileSize(bytes?: number): string {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/properties']);
      return;
    }
    this.propertyId = id;
    this.loadProperty(id);
    this.subscribeToLiveEvents(id);
  }

  ngOnDestroy(): void {
    this.eventSub?.unsubscribe();
    if (this.propertyId) {
      this.crmEvents.leaveRecordPresence('property', this.propertyId);
    }
  }

  private subscribeToLiveEvents(propertyId: string): void {
    this.crmEvents.joinRecordPresence('property', propertyId);
    this.eventSub = this.crmEvents.events$.subscribe((ev) => {
      const payload = ev.payload as Record<string, unknown> | null;
      const entityId = payload?.['entityId'] as string | undefined;
      // Only process events relevant to this property
      if (entityId && entityId !== propertyId) return;
      const alert = this.mapEventToAlert(ev.eventType, payload, ev.occurredAtUtc);
      if (alert) {
        this.liveAlerts.update((prev) => [alert, ...prev].slice(0, 20));
      }
    });
  }

  private mapEventToAlert(
    eventType: string,
    payload: Record<string, unknown> | null | undefined,
    occurredAt: string
  ): LiveAlert | null {
    const id = crypto.randomUUID();
    switch (eventType) {
      case 'entity.crud.changed':
        if (String(payload?.['entityType'] ?? '').toLowerCase() !== 'property') return null;
        return { id, type: 'info', message: `Property record updated by ${payload?.['userName'] || 'another user'}`, timestamp: occurredAt, icon: 'pi-refresh' };
      case 'property.price.changed':
        return { id, type: 'price', message: `Price changed to ${payload?.['newPrice'] || 'a new value'}`, timestamp: occurredAt, icon: 'pi-dollar' };
      case 'property.showing.scheduled':
        return { id, type: 'showing', message: `New showing scheduled for ${payload?.['visitorName'] || 'a visitor'}`, timestamp: occurredAt, icon: 'pi-calendar' };
      case 'property.status.changed':
        return { id, type: 'status', message: `Status changed to ${payload?.['newStatus'] || 'unknown'}`, timestamp: occurredAt, icon: 'pi-sync' };
      case 'property.document.uploaded':
        return { id, type: 'document', message: `New document uploaded: ${payload?.['fileName'] || 'file'}`, timestamp: occurredAt, icon: 'pi-file' };
      case 'property.activity.created':
        return { id, type: 'activity', message: `New activity: ${payload?.['subject'] || 'task'}`, timestamp: occurredAt, icon: 'pi-bell' };
      default:
        return null;
    }
  }

  protected dismissAlert(alertId: string): void {
    this.liveAlerts.update((prev) => prev.filter((a) => a.id !== alertId));
  }

  protected clearAllAlerts(): void {
    this.liveAlerts.set([]);
  }

  protected alertTypeIcon(type: LiveAlert['type']): string {
    switch (type) {
      case 'price': return 'alert-icon--price';
      case 'showing': return 'alert-icon--showing';
      case 'status': return 'alert-icon--status';
      case 'document': return 'alert-icon--document';
      case 'activity': return 'alert-icon--activity';
      default: return 'alert-icon--info';
    }
  }

  private loadProperty(id: string): void {
    this.loading.set(true);
    this.propertyData.getById(id).subscribe({
      next: (prop) => {
        this.property.set(prop);
        this.selectedStatus.set(prop.status);
        this.loading.set(false);
        this.loadSubResources(id);
      },
      error: () => {
        this.router.navigate(['/app/properties']);
      }
    });
  }

  private loadSubResources(id: string): void {
    this.propertyData.getTimeline(id).subscribe({ next: (data) => this.timeline.set(data) });
    this.propertyData.getPriceHistory(id).subscribe({ next: (data) => this.priceHistory.set(data) });
    this.propertyData.getShowings(id).subscribe({ next: (data) => this.showings.set(data) });
    this.propertyData.getDocuments(id).subscribe({ next: (data) => this.documents.set(data) });
    this.propertyData.getActivities(id).subscribe({ next: (data) => this.activities.set(data) });
    this.propertyData.getSignatureRequests(id).subscribe({ next: (data) => this.signatureRequests.set(data) });
    this.propertyData.getAlertRules(id).subscribe({ next: (data) => this.alertRules.set(data) });
    this.propertyData.getAlertNotifications(id).subscribe({ next: (data) => this.alertNotifications.set(data) });
  }

  protected setTab(tab: 'details' | 'showings' | 'documents' | 'priceHistory' | 'activities' | 'cma' | 'esign' | 'alerts') {
    this.activeTab.set(tab);
    if (tab === 'cma' && !this.cmaReport()) {
      this.loadCmaReport();
    }
  }

  // Quick Actions (X12)
  protected onChangeStatus() {
    this.showStatusDialog.set(true);
  }

  protected confirmStatusChange() {
    const prop = this.property();
    if (!prop) return;
    this.propertyData.update(prop.id, { address: prop.address, status: this.selectedStatus() }).subscribe({
      next: () => {
        this.property.set({ ...prop, status: this.selectedStatus() as any });
        this.loadSubResources(prop.id);
        this.showStatusDialog.set(false);
        this.toast.show('success', 'Status updated.', 3000);
      }
    });
  }

  protected onLogShowing() {
    this.showingForm.reset({ visitorName: '', visitorEmail: '', visitorPhone: '', scheduledAtUtc: null, durationMinutes: 30 });
    this.showingScheduledAtLocal = '';
    this.showShowingDialog.set(true);
  }

  protected submitShowing() {
    const scheduledAt = this.parseLocalDateTime(this.showingScheduledAtLocal) ?? this.resolveShowingScheduledAt();
    if (scheduledAt) {
      this.showingForm.patchValue({ scheduledAtUtc: scheduledAt }, { emitEvent: false });
    }

    this.showingForm.markAllAsTouched();
    if (this.showingForm.invalid) return;
    const prop = this.property();
    if (!prop) return;
    const v = this.showingForm.getRawValue();
    this.propertyData.createShowing(prop.id, {
      visitorName: v.visitorName,
      visitorEmail: v.visitorEmail || undefined,
      visitorPhone: v.visitorPhone || undefined,
      scheduledAtUtc: v.scheduledAtUtc?.toISOString(),
      durationMinutes: v.durationMinutes,
      status: 'Scheduled'
    }).subscribe({
      next: () => {
        this.showShowingDialog.set(false);
        this.loadSubResources(prop.id);
        this.toast.show('success', 'Showing scheduled.', 3000);
      }
    });
  }

  protected onShowingScheduledAtChange(value: string): void {
    this.showingScheduledAtLocal = value;
    const scheduledAt = this.parseLocalDateTime(value);
    this.showingForm.patchValue({ scheduledAtUtc: scheduledAt }, { emitEvent: false });
    this.showingForm.get('scheduledAtUtc')?.markAsDirty();
    this.showingForm.get('scheduledAtUtc')?.updateValueAndValidity({ emitEvent: false });
  }

  private resolveShowingScheduledAt(): Date | null {
    const controlValue = this.showingForm.get('scheduledAtUtc')?.value;
    if (controlValue instanceof Date && !Number.isNaN(controlValue.getTime())) {
      return controlValue;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    const rawValue = (document.querySelector('#showing-date input') as HTMLInputElement | null)?.value?.trim();
    if (!rawValue) {
      return null;
    }

    const directParse = new Date(rawValue);
    if (!Number.isNaN(directParse.getTime())) {
      return directParse;
    }

    const match = rawValue.match(
      /^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{4})(?:,\s*|\s+)(?<hour>\d{1,2}):(?<minute>\d{2})\s*(?<meridiem>AM|PM)$/i
    );
    if (!match?.groups) {
      return null;
    }

    const month = Number(match.groups['month']);
    const day = Number(match.groups['day']);
    const year = Number(match.groups['year']);
    let hour = Number(match.groups['hour']);
    const minute = Number(match.groups['minute']);
    const meridiem = match.groups['meridiem'].toUpperCase();

    if (meridiem === 'PM' && hour < 12) {
      hour += 12;
    } else if (meridiem === 'AM' && hour === 12) {
      hour = 0;
    }

    const parsed = new Date(year, month - 1, day, hour, minute, 0, 0);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private parseLocalDateTime(rawValue: string | null | undefined): Date | null {
    if (!rawValue) {
      return null;
    }

    const match = rawValue.match(
      /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2})$/
    );
    if (!match?.groups) {
      return null;
    }

    const year = Number(match.groups['year']);
    const month = Number(match.groups['month']);
    const day = Number(match.groups['day']);
    const hour = Number(match.groups['hour']);
    const minute = Number(match.groups['minute']);
    const parsed = new Date(year, month - 1, day, hour, minute, 0, 0);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  protected onUploadDocument() {
    this.documentForm.reset({ fileName: '', category: 'Other', fileUrl: '' });
    this.showDocumentDialog.set(true);
  }

  protected submitDocument() {
    this.documentForm.markAllAsTouched();
    if (this.documentForm.invalid) return;
    const prop = this.property();
    if (!prop) return;
    const v = this.documentForm.getRawValue();
    this.propertyData.uploadDocument(prop.id, {
      fileName: v.fileName,
      category: v.category,
      fileUrl: v.fileUrl || undefined,
      uploadedBy: prop.ownerName
    }).subscribe({
      next: () => {
        this.showDocumentDialog.set(false);
        this.loadSubResources(prop.id);
        this.toast.show('success', 'Document uploaded.', 3000);
      }
    });
  }

  protected onDeleteDocument(docId: string) {
    const prop = this.property();
    if (!prop) return;
    this.propertyData.deleteDocument(prop.id, docId).subscribe({
      next: () => {
        this.documents.set(this.documents().filter(d => d.id !== docId));
        this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
        this.toast.show('success', 'Document deleted.', 3000);
      }
    });
  }

  protected formatCurrency(amount: number | undefined, currency: string | undefined): string {
    if (amount == null) return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'CAD', maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `$${amount.toLocaleString()}`;
    }
  }

  // Activity actions (X2)
  protected onAddActivity() {
    this.activityForm.reset({ type: 'Task', subject: '', description: '', dueDate: null, priority: 'Medium' });
    this.showActivityDialog.set(true);
  }

  protected submitActivity() {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) return;
    const prop = this.property();
    if (!prop) return;
    const v = this.activityForm.getRawValue();
    this.propertyData.createActivity(prop.id, {
      type: v.type,
      subject: v.subject,
      description: v.description || undefined,
      dueDate: v.dueDate?.toISOString(),
      priority: v.priority,
      status: 'Open'
    }).subscribe({
      next: () => {
        this.showActivityDialog.set(false);
        this.propertyData.getActivities(prop.id).subscribe({ next: (data) => this.activities.set(data) });
        this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
        this.toast.show('success', 'Activity created.', 3000);
      }
    });
  }

  protected completeActivity(activityId: string) {
    const prop = this.property();
    if (!prop) return;
    this.propertyData.updateActivity(prop.id, activityId, { status: 'Completed', completedDate: new Date().toISOString() }).subscribe({
      next: () => {
        this.activities.set(this.activities().map(a => a.id === activityId ? { ...a, status: 'Completed' as const, completedDate: new Date().toISOString() } : a));
        this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
        this.toast.show('success', 'Activity completed.', 3000);
      }
    });
  }

  protected activityTypeIcon(type: string): string {
    switch (type) {
      case 'Task': return 'pi-check-square';
      case 'Call': return 'pi-phone';
      case 'Email': return 'pi-envelope';
      case 'Meeting': return 'pi-users';
      case 'Note': return 'pi-pencil';
      case 'FollowUp': return 'pi-replay';
      default: return 'pi-list';
    }
  }

  protected activityTypeLabel(type: string): string {
    switch (type) {
      case 'FollowUp': return 'Follow Up';
      default: return type;
    }
  }

  protected prioritySeverity(priority: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (priority) {
      case 'Urgent': return 'danger';
      case 'High': return 'warn';
      case 'Medium': return 'info';
      case 'Low': return 'secondary';
      default: return 'info';
    }
  }

  protected statusClass(status: string): string {
    switch (status) {
      case 'Active': return 'status--active';
      case 'Conditional': return 'status--conditional';
      case 'Sold': return 'status--sold';
      case 'Draft': return 'status--draft';
      case 'Terminated': case 'Expired': case 'Delisted': return 'status--inactive';
      default: return 'status--default';
    }
  }

  protected typeLabel(type: string): string {
    const map: Record<string, string> = {
      SemiDetached: 'Semi-Detached',
      MultiFamily: 'Multi-Family'
    };
    return map[type] || type;
  }

  // ── CMA (G3) ──
  private loadCmaReport(): void {
    const prop = this.property();
    if (!prop) return;
    this.cmaLoading.set(true);
    this.propertyData.getCmaReport(prop.id).subscribe({
      next: (r) => { this.cmaReport.set(r); this.cmaLoading.set(false); },
      error: () => this.cmaLoading.set(false)
    });
  }

  protected generateCma(): void {
    const prop = this.property();
    if (!prop) return;
    this.cmaLoading.set(true);
    this.propertyData.generateCmaReport(prop.id, 5).subscribe({
      next: (r) => { this.cmaReport.set(r); this.cmaLoading.set(false); this.toast.show('success', 'CMA report generated.', 3000); },
      error: () => this.cmaLoading.set(false)
    });
  }

  protected marketTrendSeverity(trend: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (trend) { case 'Rising': return 'success'; case 'Declining': return 'danger'; default: return 'info'; }
  }

  protected cmaStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) { case 'Sold': return 'success'; case 'Active': return 'info'; case 'Pending': return 'warn'; default: return 'secondary'; }
  }

  // ── E-Signature (G4) ──
  protected onAddSignatureRequest(): void {
    this.signatureForm.reset({ documentName: '', documentType: 'PurchaseAgreement', provider: 'DocuSign', signerName: '', signerEmail: '', signerRole: 'Buyer' });
    this.showSignatureDialog.set(true);
  }

  protected submitSignatureRequest(): void {
    this.signatureForm.markAllAsTouched();
    if (this.signatureForm.invalid) return;
    const prop = this.property();
    if (!prop) return;
    const v = this.signatureForm.getRawValue();
    this.propertyData.createSignatureRequest(prop.id, {
      documentName: v.documentName,
      documentType: v.documentType,
      provider: v.provider,
      signers: [{ name: v.signerName, email: v.signerEmail, role: v.signerRole, status: 'Pending' as const }]
    }).subscribe({
      next: () => {
        this.showSignatureDialog.set(false);
        this.propertyData.getSignatureRequests(prop.id).subscribe({ next: (d) => this.signatureRequests.set(d) });
        this.toast.show('success', 'Signature request sent.', 3000);
      }
    });
  }

  protected signatureStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Signed': return 'success'; case 'Sent': case 'Viewed': return 'info';
      case 'Draft': return 'secondary'; case 'Declined': return 'danger'; case 'Expired': return 'warn';
      default: return 'secondary';
    }
  }

  // ── Property Alerts (G5) ──
  protected onAddAlertRule(): void {
    this.alertForm.reset({ clientName: '', clientEmail: '', frequency: 'Daily', minPrice: null, maxPrice: null, minBedrooms: null });
    this.showAlertDialog.set(true);
  }

  protected submitAlertRule(): void {
    this.alertForm.markAllAsTouched();
    if (this.alertForm.invalid) return;
    const prop = this.property();
    if (!prop) return;
    const v = this.alertForm.getRawValue();
    this.propertyData.createAlertRule(prop.id, {
      clientName: v.clientName,
      clientEmail: v.clientEmail,
      frequency: v.frequency,
      criteria: {
        minPrice: v.minPrice || undefined,
        maxPrice: v.maxPrice || undefined,
        minBedrooms: v.minBedrooms || undefined
      }
    }).subscribe({
      next: () => {
        this.showAlertDialog.set(false);
        this.propertyData.getAlertRules(prop.id).subscribe({ next: (d) => this.alertRules.set(d) });
        this.propertyData.getAlertNotifications(prop.id).subscribe({ next: (d) => this.alertNotifications.set(d) });
        this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
        this.toast.show('success', 'Alert rule created.', 3000);
      }
    });
  }

  protected toggleAlertRule(ruleId: string, isActive: boolean): void {
    const prop = this.property();
    if (!prop) return;
    this.propertyData.toggleAlertRule(prop.id, ruleId, isActive).subscribe({
      next: () => {
        this.alertRules.set(this.alertRules().map(r => r.id === ruleId ? { ...r, isActive } : r));
        this.propertyData.getTimeline(prop.id).subscribe({ next: (data) => this.timeline.set(data) });
        this.toast.show('success', isActive ? 'Alert activated.' : 'Alert paused.', 3000);
      }
    });
  }

  protected alertNotifStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) { case 'Clicked': return 'success'; case 'Opened': case 'Sent': return 'info'; case 'Bounced': return 'danger'; default: return 'secondary'; }
  }

  protected resolveMediaUrl(url?: string | null): string {
    if (!url) {
      return '';
    }

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `${environment.apiUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}
