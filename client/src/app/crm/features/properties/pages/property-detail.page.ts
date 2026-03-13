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

import { PropertyDataService } from '../services/property-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { Property, PriceChange, Showing, PropertyDocument, PropertyActivity } from '../models/property.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';

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
  protected activeTab = signal<'details' | 'showings' | 'documents' | 'priceHistory' | 'activities'>('details');

  // Sub-resource data
  protected priceHistory = signal<PriceChange[]>([]);
  protected showings = signal<Showing[]>([]);
  protected documents = signal<PropertyDocument[]>([]);
  protected activities = signal<PropertyActivity[]>([]);

  // Dialogs
  protected showShowingDialog = signal(false);
  protected showDocumentDialog = signal(false);
  protected showStatusDialog = signal(false);
  protected showActivityDialog = signal(false);

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

  protected selectedStatus = signal<string>('');

  protected canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.propertiesManage);

  protected daysSinceListed = computed(() => {
    const prop = this.property();
    if (!prop) return 0;
    const ref = prop.listingDateUtc || prop.createdAtUtc;
    const diffMs = Date.now() - new Date(ref).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
  });

  protected timelineEvents = computed<{ label: string; date: string; icon: string; variant: string }[]>(() => {
    const prop = this.property();
    if (!prop) return [];
    const events: { label: string; date: string; icon: string; variant: string; ts: number }[] = [];
    events.push({ label: 'Record Created', date: prop.createdAtUtc, icon: 'pi-plus-circle', variant: 'created', ts: new Date(prop.createdAtUtc).getTime() });
    if (prop.listingDateUtc) {
      events.push({ label: 'Listed on Market', date: prop.listingDateUtc, icon: 'pi-megaphone', variant: 'listed', ts: new Date(prop.listingDateUtc).getTime() });
    }
    if (prop.updatedAtUtc && prop.updatedAtUtc !== prop.createdAtUtc) {
      events.push({ label: 'Last Updated', date: prop.updatedAtUtc, icon: 'pi-pencil', variant: 'updated', ts: new Date(prop.updatedAtUtc).getTime() });
    }
    if (prop.soldDateUtc) {
      events.push({ label: 'Sold', date: prop.soldDateUtc, icon: 'pi-check-circle', variant: 'sold', ts: new Date(prop.soldDateUtc).getTime() });
    }
    return events.sort((a, b) => a.ts - b.ts);
  });

  protected pricePerSqFt = computed(() => {
    const prop = this.property();
    if (!prop?.listPrice || !prop?.squareFeet || prop.squareFeet === 0) return null;
    return Math.round(prop.listPrice / prop.squareFeet);
  });

  protected photoUrlList = computed(() => {
    const prop = this.property();
    if (!prop?.photoUrls) return [];
    return prop.photoUrls.split(',').map(u => u.trim()).filter(u => u.length > 0);
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
        if (payload?.['entityType'] !== 'property') return null;
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
    this.propertyData.getPriceHistory(id).subscribe({ next: (data) => this.priceHistory.set(data) });
    this.propertyData.getShowings(id).subscribe({ next: (data) => this.showings.set(data) });
    this.propertyData.getDocuments(id).subscribe({ next: (data) => this.documents.set(data) });
    this.propertyData.getActivities(id).subscribe({ next: (data) => this.activities.set(data) });
  }

  protected setTab(tab: 'details' | 'showings' | 'documents' | 'priceHistory' | 'activities') {
    this.activeTab.set(tab);
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
        this.showStatusDialog.set(false);
        this.toast.show('success', 'Status updated.', 3000);
      }
    });
  }

  protected onLogShowing() {
    this.showingForm.reset({ visitorName: '', visitorEmail: '', visitorPhone: '', scheduledAtUtc: null, durationMinutes: 30 });
    this.showShowingDialog.set(true);
  }

  protected submitShowing() {
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
}
