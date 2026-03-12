import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';

import { PropertyStatus, PropertyType } from '../models/property.model';
import { PropertyDataService, SavePropertyRequest } from '../services/property-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

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
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    BreadcrumbsComponent
  ],
  templateUrl: './property-form.page.html',
  styleUrls: ['./property-form.page.scss']
})
export class PropertyFormPage implements OnInit {
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
  protected readonly loading = signal(false);
  protected readonly addressError = signal<string | null>(null);
  private readonly toastService = inject(AppToastService);
  protected propertyId: string | null = null;

  protected form: SavePropertyRequest = {
    mlsNumber: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    listPrice: undefined,
    salePrice: undefined,
    currency: 'CAD',
    status: 'Draft',
    propertyType: 'Detached',
    bedrooms: undefined,
    bathrooms: undefined,
    squareFeet: undefined,
    lotSizeSqFt: undefined,
    yearBuilt: undefined,
    garageSpaces: undefined,
    description: '',
    neighborhood: ''
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly propertyData: PropertyDataService
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (this.propertyId) {
      this.isEditMode.set(true);
      this.loadProperty();
    }
  }

  private loadProperty() {
    if (!this.propertyId) return;
    this.loading.set(true);
    this.propertyData.getById(this.propertyId).subscribe({
      next: (property) => {
        this.form = {
          mlsNumber: property.mlsNumber || '',
          address: property.address,
          city: property.city || '',
          province: property.province || '',
          postalCode: property.postalCode || '',
          listPrice: property.listPrice,
          salePrice: property.salePrice,
          currency: property.currency || 'CAD',
          status: property.status,
          propertyType: property.propertyType,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          squareFeet: property.squareFeet,
          lotSizeSqFt: property.lotSizeSqFt,
          yearBuilt: property.yearBuilt,
          garageSpaces: property.garageSpaces,
          description: property.description || '',
          neighborhood: property.neighborhood || '',
          ownerId: property.ownerId,
          accountId: property.accountId,
          primaryContactId: property.primaryContactId,
          opportunityId: property.opportunityId
        };
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load property.');
      }
    });
  }

  protected onSave() {
    this.addressError.set(!this.form.address ? 'Property address is required.' : null);
    if (this.addressError()) {
      this.raiseToast('error', 'Please fix the highlighted errors before saving.');
      return;
    }

    this.saving.set(true);
    const payload: SavePropertyRequest = { ...this.form };

    if (this.propertyId) {
      this.propertyData.update(this.propertyId, payload).subscribe({
        next: () => this.navigateWithToast('Property updated.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update property.');
        }
      });
    } else {
      this.propertyData.create(payload).subscribe({
        next: () => this.navigateWithToast('Property created.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to create property.');
        }
      });
    }
  }

  private navigateWithToast(message: string) {
    this.saving.set(false);
    this.router.navigate(['/app/properties'], { state: { toast: { tone: 'success', message } } });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
  }
}
