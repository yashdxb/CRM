import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { forkJoin } from 'rxjs';

import { PropertyDocument, PropertyStatus, PropertyType } from '../models/property.model';
import { PropertyDataService, SavePropertyRequest } from '../services/property-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserLookupItem } from '../../settings/models/user-admin.model';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { environment } from '../../../../../environments/environment';

interface StatusOption {
  label: string;
  value: PropertyStatus;
  icon: string;
}

interface TypeOption {
  label: string;
  value: PropertyType;
  icon: string;
}

@Component({
  selector: 'app-property-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  templateUrl: './property-form.page.html',
  styleUrls: ['./property-form.page.scss']
})
export class PropertyFormPage implements OnInit {
  private readonly fb = inject(FormBuilder);

  protected readonly statusOptions: StatusOption[] = [
    { label: 'Draft', value: 'Draft', icon: 'pi-file-edit' },
    { label: 'Active', value: 'Active', icon: 'pi-check-circle' },
    { label: 'Conditional', value: 'Conditional', icon: 'pi-clock' },
    { label: 'Sold', value: 'Sold', icon: 'pi-star-fill' },
    { label: 'Terminated', value: 'Terminated', icon: 'pi-times-circle' },
    { label: 'Expired', value: 'Expired', icon: 'pi-calendar-times' },
    { label: 'Delisted', value: 'Delisted', icon: 'pi-minus-circle' }
  ];

  protected readonly typeOptions: TypeOption[] = [
    { label: 'Detached', value: 'Detached', icon: 'pi-home' },
    { label: 'Semi-Detached', value: 'SemiDetached', icon: 'pi-home' },
    { label: 'Townhouse', value: 'Townhouse', icon: 'pi-building' },
    { label: 'Condo', value: 'Condo', icon: 'pi-building' },
    { label: 'Duplex', value: 'Duplex', icon: 'pi-th-large' },
    { label: 'Triplex', value: 'Triplex', icon: 'pi-th-large' },
    { label: 'Bungalow', value: 'Bungalow', icon: 'pi-home' },
    { label: 'Cottage', value: 'Cottage', icon: 'pi-sun' },
    { label: 'Commercial', value: 'Commercial', icon: 'pi-briefcase' },
    { label: 'Land', value: 'Land', icon: 'pi-map' },
    { label: 'Multi-Family', value: 'MultiFamily', icon: 'pi-users' },
    { label: 'Other', value: 'Other', icon: 'pi-ellipsis-h' }
  ];

  protected readonly isEditMode = signal(false);
  protected readonly saving = signal(false);
  protected readonly photoUploading = signal(false);
  protected readonly loading = signal(false);
  private readonly toastService = inject(AppToastService);
  protected propertyId: string | null = null;

  // Photo upload (X5)
  protected readonly photoFiles = signal<{ file: File; preview: string }[]>([]);
  protected readonly existingPhotos = signal<PropertyDocument[]>([]);
  protected readonly dragging = signal(false);

  // Relationship lookup data
  protected readonly users = signal<UserLookupItem[]>([]);
  protected readonly customers = signal<Customer[]>([]);
  protected readonly contacts = signal<Contact[]>([]);
  protected readonly opportunities = signal<Opportunity[]>([]);

  protected readonly formGroup: FormGroup = this.fb.group({
    address: ['', Validators.required],
    mlsNumber: [''],
    city: [''],
    province: [''],
    postalCode: [''],
    neighborhood: [''],
    country: ['Canada'],
    status: ['Draft'],
    propertyType: ['Detached'],
    listPrice: [null as number | null],
    salePrice: [null as number | null],
    currency: ['CAD'],
    listingDate: [null as Date | null],
    soldDate: [null as Date | null],
    bedrooms: [null as number | null],
    bathrooms: [null as number | null],
    squareFeet: [null as number | null],
    lotSizeSqFt: [null as number | null],
    yearBuilt: [null as number | null],
    garageSpaces: [null as number | null],
    description: [''],
    features: [''],
    virtualTourUrl: [''],
    photoUrls: [''],
    ownerId: [null as string | null],
    accountId: [null as string | null],
    primaryContactId: [null as string | null],
    opportunityId: [null as string | null],
    // Commission fields (X7)
    commissionRate: [null as number | null],
    buyerAgentCommission: [null as number | null],
    sellerAgentCommission: [null as number | null],
    coListingAgentId: [null as string | null]
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly propertyData: PropertyDataService,
    private readonly userService: UserAdminDataService,
    private readonly customerService: CustomerDataService,
    private readonly contactService: ContactDataService,
    private readonly opportunityService: OpportunityDataService
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (this.propertyId) {
      this.isEditMode.set(true);
      this.loadProperty();
    }
    this.loadLookups();
  }

  private loadLookups() {
    this.userService.lookupActive().subscribe({
      next: (items) => this.users.set(items)
    });
    this.customerService.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => this.customers.set(res.items)
    });
    this.contactService.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => this.contacts.set(res.items)
    });
    this.opportunityService.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => this.opportunities.set(res.items)
    });
  }

  private loadProperty() {
    if (!this.propertyId) return;
    this.loading.set(true);
    this.propertyData.getById(this.propertyId).subscribe({
      next: (property) => {
        this.formGroup.patchValue({
          mlsNumber: property.mlsNumber || '',
          address: property.address,
          city: property.city || '',
          province: property.province || '',
          postalCode: property.postalCode || '',
          listPrice: property.listPrice ?? null,
          salePrice: property.salePrice ?? null,
          currency: property.currency || 'CAD',
          status: property.status,
          propertyType: property.propertyType,
          bedrooms: property.bedrooms ?? null,
          bathrooms: property.bathrooms ?? null,
          squareFeet: property.squareFeet ?? null,
          lotSizeSqFt: property.lotSizeSqFt ?? null,
          yearBuilt: property.yearBuilt ?? null,
          garageSpaces: property.garageSpaces ?? null,
          description: property.description || '',
          features: property.features || '',
          neighborhood: property.neighborhood || '',
          country: property.country || 'Canada',
          listingDate: property.listingDateUtc ? new Date(property.listingDateUtc) : null,
          soldDate: property.soldDateUtc ? new Date(property.soldDateUtc) : null,
          ownerId: property.ownerId ?? null,
          accountId: property.accountId ?? null,
          primaryContactId: property.primaryContactId ?? null,
          opportunityId: property.opportunityId ?? null,
          photoUrls: property.photoUrls || '',
          virtualTourUrl: property.virtualTourUrl || '',
          commissionRate: property.commissionRate ?? null,
          buyerAgentCommission: property.buyerAgentCommission ?? null,
          sellerAgentCommission: property.sellerAgentCommission ?? null,
          coListingAgentId: property.coListingAgentId ?? null
        });
        this.formGroup.markAsPristine();
        this.loadExistingPhotos(property.id);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load property.');
      }
    });
  }

  private loadExistingPhotos(propertyId: string) {
    this.propertyData.getDocuments(propertyId).subscribe({
      next: (docs) => this.existingPhotos.set(docs.filter((doc) => doc.category === 'Photo')),
      error: () => this.existingPhotos.set([])
    });
  }

  protected onSave() {
    if (this.saving() || this.photoUploading() || this.loading()) {
      return;
    }

    // PrimeNG InputNumber commits/parses on blur. Blur the active control and
    // defer the save by one tick so currency edits are committed before route navigation.
    const activeElement = typeof document !== 'undefined' ? document.activeElement as HTMLElement | null : null;
    activeElement?.blur();

    setTimeout(() => this.commitSave(), 0);
  }

  protected prepareForSave(event?: Event) {
    const target = event?.target as EventTarget | null;
    const activeElement = typeof document !== 'undefined' ? document.activeElement as HTMLElement | null : null;
    if (activeElement && activeElement !== target) {
      activeElement.blur();
    }
  }

  private commitSave() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.raiseToast('error', 'Please fix the highlighted errors before saving.');
      return;
    }

    this.saving.set(true);
    const v = this.formGroup.getRawValue();
    const payload: SavePropertyRequest = {
      mlsNumber: v.mlsNumber,
      address: v.address,
      city: v.city,
      province: v.province,
      postalCode: v.postalCode,
      listPrice: v.listPrice ?? undefined,
      salePrice: v.salePrice ?? undefined,
      currency: v.currency,
      status: v.status,
      propertyType: v.propertyType,
      bedrooms: v.bedrooms ?? undefined,
      bathrooms: v.bathrooms ?? undefined,
      squareFeet: v.squareFeet ?? undefined,
      lotSizeSqFt: v.lotSizeSqFt ?? undefined,
      yearBuilt: v.yearBuilt ?? undefined,
      garageSpaces: v.garageSpaces ?? undefined,
      description: v.description,
      features: v.features,
      neighborhood: v.neighborhood,
      country: v.country,
      listingDateUtc: v.listingDate?.toISOString(),
      soldDateUtc: v.soldDate?.toISOString(),
      ownerId: v.ownerId ?? undefined,
      accountId: v.accountId ?? undefined,
      primaryContactId: v.primaryContactId ?? undefined,
      opportunityId: v.opportunityId ?? undefined,
      photoUrls: v.photoUrls,
      virtualTourUrl: v.virtualTourUrl,
      commissionRate: v.commissionRate ?? undefined,
      buyerAgentCommission: v.buyerAgentCommission ?? undefined,
      sellerAgentCommission: v.sellerAgentCommission ?? undefined,
      coListingAgentId: v.coListingAgentId ?? undefined
    };

    if (this.propertyId) {
      this.propertyData.update(this.propertyId, payload).subscribe({
        next: () => this.finishSave(this.propertyId!, 'Property updated.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update property.');
        }
      });
    } else {
      this.propertyData.create(payload).subscribe({
        next: (property) => this.finishSave(property.id, 'Property created.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to create property.');
        }
      });
    }
  }

  private finishSave(propertyId: string, message: string) {
    const pendingPhotos = this.photoFiles();
    if (!pendingPhotos.length) {
      this.navigateWithToast(message);
      return;
    }

    this.photoUploading.set(true);
    forkJoin(pendingPhotos.map((item) => this.propertyData.uploadPhoto(propertyId, item.file))).subscribe({
      next: () => {
        pendingPhotos.forEach((item) => URL.revokeObjectURL(item.preview));
        this.photoFiles.set([]);
        this.photoUploading.set(false);
        this.navigateWithToast(`${message} Photos uploaded.`);
      },
      error: () => {
        this.photoUploading.set(false);
        this.saving.set(false);
        this.raiseToast('error', 'Property saved, but one or more photos failed to upload.');
      }
    });
  }

  private navigateWithToast(message: string) {
    this.saving.set(false);
    this.router.navigate(['/app/properties'], { state: { toast: { tone: 'success', message } } });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
  }

  // ── Photo drag-drop (X5) ─────────────────────────────────────────────
  protected onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(true);
  }

  protected onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(false);
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.addPhotoFiles(files);
  }

  protected onPhotoSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.addPhotoFiles(input.files);
    input.value = '';
  }

  private addPhotoFiles(fileList: FileList) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const current = this.photoFiles();

    Array.from(fileList).forEach(file => {
      if (!allowed.includes(file.type)) {
        this.raiseToast('error', `${file.name} is not a supported image type.`);
        return;
      }
      if (file.size > maxSize) {
        this.raiseToast('error', `${file.name} exceeds the 10 MB limit.`);
        return;
      }
      if (current.length >= 20) {
        this.raiseToast('error', 'Maximum 20 photos allowed.');
        return;
      }
      const preview = URL.createObjectURL(file);
      current.push({ file, preview });
    });

    this.photoFiles.set([...current]);
  }

  protected removePhoto(index: number) {
    const current = this.photoFiles();
    URL.revokeObjectURL(current[index].preview);
    current.splice(index, 1);
    this.photoFiles.set([...current]);
  }

  protected removeExistingPhoto(docId: string) {
    if (!this.propertyId) {
      return;
    }

    this.propertyData.deleteDocument(this.propertyId, docId).subscribe({
      next: () => {
        const remaining = this.existingPhotos().filter((photo) => photo.id !== docId);
        this.existingPhotos.set(remaining);
        const nextUrls = remaining.map((photo) => photo.fileUrl).join(', ');
        this.formGroup.patchValue({ photoUrls: nextUrls });
        this.raiseToast('success', 'Photo removed.');
      },
      error: () => this.raiseToast('error', 'Unable to remove photo.')
    });
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
