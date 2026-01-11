// src/app/features/procurement/rfqs/rfq-create/rfq-create.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  ReferenceDataService,
  CarrierReference,
  TransportationModeReference,
  CurrencyReference,
  UnitOfMeasureReference
} from '../../../../../core/services/reference-data.service';
import { AwardsDataService } from '../../awards/services/awards-data.service';
import { SelectOption } from '../../../../../shared/models/select-option.model';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { ShippingLane } from '../../../system-admin/reference-data/data/shipping-lane.model';
import { ShippingRate } from '../../../system-admin/reference-data/data/shipping-rate.model';
import { PaymentTerm } from '../../../system-admin/reference-data/data/payment-term.model';
import { Incoterm } from '../../../system-admin/reference-data/data/incoterm.model';

import { ProductService } from '../../../catalog/services/product.service';
import { Product } from '../../../catalog/models/product.model';
import { RFQ, RFQStatus, RFQType } from '../../../models/rfq.model';
import { RfqDataService } from '../services/rfq-data.service';

@Component({
  selector: 'app-rfq-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    MultiSelectModule,
    StepperModule,
    ToastModule,
    BreadcrumbsComponent
  ],
  providers: [MessageService],
  templateUrl: './rfq-create.html',
  styleUrls: ['./rfq-create.scss']
})
export class RfqCreateComponent implements OnInit {
  form!: FormGroup;

  rfqTypes: SelectOption[] = [
    { label: 'RFQ - Request for Quotation', value: RFQType.RFQ },
    { label: 'RFP - Request for Proposal', value: RFQType.RFP }
  ];

  currencies: SelectOption<string>[] = [];
  paymentTermsOptions: SelectOption<string>[] = [];
  incotermsOptions: SelectOption<string>[] = [];
  uomOptions: SelectOption<string>[] = [];
  transportModeOptions: SelectOption<string>[] = [];
  shippingLaneOptions: SelectOption<string>[] = [];
  shippingRateOptions: SelectOption<string>[] = [];
  carrierOptions: SelectOption<string>[] = [];
  carrierOptionsForLane: SelectOption<string>[] = [];

  availableSuppliers: SelectOption<string>[] = [];
  catalogPrefillCount = 0;
  catalogPrefillProducts: Product[] = [];
  catalogPrefillSuppliers: string[] = [];
  private supplierNameCache = new Map<string, string>();

  private rfqId: string | null = null;
  isEditMode = false;
  isSaving = false;

  private shippingLanes: ShippingLane[] = [];
  private shippingRates: ShippingRate[] = [];
  private carriers: CarrierReference[] = [];
  private transportModes: TransportationModeReference[] = [];
  private defaultUomCode = '';
  private pendingSupplierIds: string[] | null = null;
  selectedLaneDetails: ShippingLane | null = null;
  selectedRateDetails: ShippingRate | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private referenceDataService: ReferenceDataService,
    private awardsService: AwardsDataService,
    private productService: ProductService,
    private rfqDataService: RfqDataService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadReferenceData();
    this.loadSupplierOptions();
    this.prefillFromQueryParams();
    this.loadExistingRfq();
  }

  initForm(): void {
    this.form = this.fb.group({
      basicInfo: this.fb.group({
        type: [RFQType.RFQ, [Validators.required]],
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        description: ['', [Validators.maxLength(1000)]],
        closeDate: [null, [Validators.required]],
        responseDeadline: [null, [Validators.required]],
        deliveryDate: [null]
      }),
      terms: this.fb.group({
        currency: [null, [Validators.required]],
        paymentTerms: [null],
        incoterms: [null],
        deliveryLocation: [''],
        shippingLaneId: [null],
        transportMode: [null],
        preferredCarrierId: [null],
        shippingRateId: [null]
      }),
      lineItems: this.fb.array([]),
      suppliers: this.fb.group({
        invitedSupplierIds: [[], [Validators.required, Validators.minLength(1)]]
      })
    });
  }

  private loadSupplierOptions(): void {
    this.productService.getSuppliers()
      .pipe(take(1))
      .subscribe({
        next: suppliers => {
          const mappedSuppliers = suppliers.map(supplier => {
            this.supplierNameCache.set(supplier.id, supplier.name);
            return { label: supplier.name, value: supplier.id };
          });

          this.availableSuppliers = mappedSuppliers;

          if (this.pendingSupplierIds?.length) {
            this.applySupplierPrefill(this.pendingSupplierIds);
          }
        },
        error: error => {
          console.error('Error loading suppliers for RFQ create:', error);
        }
      });
  }

  private prefillFromQueryParams(): void {
    this.route.queryParamMap
      .pipe(take(1))
      .subscribe(params => {
        const productIdsParam = params.get('productIds');
        const supplierIdParam = params.get('supplierId');

        const supplierIds = new Set<string>();
        if (supplierIdParam) {
          supplierIds.add(supplierIdParam);
        }

        const productIds = productIdsParam
          ? productIdsParam.split(',').map(id => id.trim()).filter(Boolean)
          : [];

        if (productIds.length) {
          this.productService.getProducts()
            .pipe(take(1))
            .subscribe({
              next: products => {
                const matchedProducts = products.filter(product => productIds.includes(product.id));
                if (matchedProducts.length) {
                  matchedProducts.forEach(product => supplierIds.add(product.supplierId));
                  this.applyProductPrefill(matchedProducts);
                }

                this.applySupplierPrefill(Array.from(supplierIds));
                this.ensureLineItemsPresent();
              },
              error: error => {
                console.error('Error pre-filling products for RFQ draft:', error);
                this.applySupplierPrefill(Array.from(supplierIds));
                this.ensureLineItemsPresent();
              }
            });
        } else {
          this.applySupplierPrefill(Array.from(supplierIds));
          this.ensureLineItemsPresent();
        }
      });
  }

  private applyProductPrefill(products: Product[]): void {
    this.catalogPrefillProducts = products;
    this.catalogPrefillCount = products.length;

    if (!products.length) {
      return;
    }

    this.resetLineItems();

    products.forEach(product => {
      if (product.supplierId && product.supplierName) {
        this.supplierNameCache.set(product.supplierId, product.supplierName);
      }

      const lineItemGroup = this.createLineItem();
      lineItemGroup.patchValue({
        productName: product.name ?? '',
        description: product.description ?? 'Please provide specification details.',
        quantity: 1,
        uom: this.defaultUomCode || null,
        specifications: product.sku ? `SKU: ${product.sku}` : ''
      }, { emitEvent: false });

      this.lineItems.push(lineItemGroup);
    });

    this.refreshLineItemUoms();

    const supplierNames = Array.from(new Set(products.map(product => product.supplierName).filter(Boolean)));
    const basicInfoGroup = this.basicInfoGroup;

    if (!basicInfoGroup.get('title')?.value) {
      if (supplierNames.length === 1) {
        basicInfoGroup.patchValue({ title: `RFQ for ${supplierNames[0]}` }, { emitEvent: false });
      } else {
        basicInfoGroup.patchValue({ title: `RFQ for ${products.length} Catalog Items` }, { emitEvent: false });
      }
    }

    if (!basicInfoGroup.get('description')?.value) {
      const topProducts = products.slice(0, 3).map(product => product.name).filter(Boolean);
      const productSummary = topProducts.length ? topProducts.join(', ') : 'selected catalog items';
      const supplierSummary = supplierNames.length ? supplierNames.join(', ') : 'catalog suppliers';
      basicInfoGroup.patchValue({
        description: `Draft created from catalog selections for ${supplierSummary}. Items include ${productSummary}${products.length > 3 ? ' and more' : ''}.`
      }, { emitEvent: false });
    }
  }

  private applySupplierPrefill(supplierIds: string[]): void {
    const uniqueSuppliers = Array.from(new Set(supplierIds.filter(Boolean)));
    this.pendingSupplierIds = uniqueSuppliers;

    if (!uniqueSuppliers.length) {
      this.catalogPrefillSuppliers = [];
      this.suppliersGroup.patchValue({ invitedSupplierIds: [] }, { emitEvent: false });
      return;
    }

    const supplierDisplayNames = uniqueSuppliers.map(id => this.supplierNameCache.get(id) ?? id);
    this.catalogPrefillSuppliers = supplierDisplayNames;

    if (!this.availableSuppliers.length) {
      this.suppliersGroup.patchValue({ invitedSupplierIds: uniqueSuppliers }, { emitEvent: false });
      return;
    }

    let optionsChanged = false;
    const updatedOptions = [...this.availableSuppliers];

    uniqueSuppliers.forEach(id => {
      if (!updatedOptions.some(option => option.value === id)) {
        const label = this.supplierNameCache.get(id) ?? id;
        updatedOptions.push({ label, value: id });
        optionsChanged = true;
      }
    });

    if (optionsChanged) {
      this.availableSuppliers = updatedOptions;
    }

    this.suppliersGroup.patchValue({ invitedSupplierIds: uniqueSuppliers }, { emitEvent: false });
  }

  private resetLineItems(): void {
    while (this.lineItems.length) {
      this.lineItems.removeAt(0);
    }
  }

  private ensureLineItemsPresent(): void {
    if (!this.lineItems.length) {
      this.addLineItem();
    }
  }

  get lineItems(): FormArray {
    return this.form.get('lineItems') as FormArray;
  }

  get basicInfoGroup(): FormGroup {
    return this.form.get('basicInfo') as FormGroup;
  }

  get termsGroup(): FormGroup {
    return this.form.get('terms') as FormGroup;
  }

  get suppliersGroup(): FormGroup {
    return this.form.get('suppliers') as FormGroup;
  }

  get currencyControl(): FormControl {
    return this.form.get('terms.currency') as FormControl;
  }

  createLineItem(): FormGroup {
    return this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      uom: [this.defaultUomCode || null, [Validators.required]],
      targetPrice: [null, [Validators.min(0)]],
      specifications: ['']
    });
  }

  addLineItem(): void {
    this.lineItems.push(this.createLineItem());
  }

  removeLineItem(index: number): void {
    if (this.lineItems.length > 1) {
      this.lineItems.removeAt(index);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'At least one line item is required'
      });
    }
  }

  getLineItemGroup(index: number): FormGroup {
    return this.lineItems.at(index) as FormGroup;
  }

  private loadReferenceData(): void {
    this.referenceDataService.getCurrencies().subscribe((currencies: CurrencyReference[]) => {
      const activeCurrencies = currencies.filter(currency => currency.isActive);
      this.currencies = activeCurrencies.map(currency => ({
        label: `${currency.code} - ${currency.name}`,
        value: currency.code
      }));

      const baseCurrency = activeCurrencies.find(currency => currency.code === 'USD') ?? activeCurrencies[0];
      if (baseCurrency && !this.currencyControl.value) {
        this.currencyControl.setValue(baseCurrency.code);
      }
    });

    this.referenceDataService.getPaymentTerms().subscribe((terms: PaymentTerm[]) => {
      const activeTerms = terms.filter(term => term.isActive).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      this.paymentTermsOptions = activeTerms.map(term => ({ label: term.name, value: term.code }));

      if (this.paymentTermsOptions.length && !this.termsGroup.get('paymentTerms')?.value) {
        this.termsGroup.patchValue({ paymentTerms: this.paymentTermsOptions[0].value }, { emitEvent: false });
      }
    });

    this.referenceDataService.getIncoterms().subscribe((incoterms: Incoterm[]) => {
      const activeIncoterms = incoterms.filter(term => term.isActive);
      this.incotermsOptions = activeIncoterms.map(term => ({
        label: `${term.code}${term.description ? ' - ' + term.description : ''}`,
        value: term.code
      }));
    });

    this.referenceDataService.getUnitsOfMeasure().subscribe((uoms: UnitOfMeasureReference[]) => {
      const activeUnits = uoms.filter(uom => uom.isActive);
      this.uomOptions = activeUnits.map(uom => ({ label: `${uom.name} (${uom.symbol})`, value: uom.code }));

      const baseUnit = activeUnits.find(uom => uom.isBaseUnit) ?? activeUnits[0];
      if (baseUnit) {
        this.defaultUomCode = baseUnit.code;
        this.refreshLineItemUoms();
      }
    });

    this.referenceDataService.getCarriers().subscribe((carriers: CarrierReference[]) => {
      this.carriers = carriers;
      this.carrierOptions = carriers.map(carrier => ({ label: carrier.name, value: carrier.id }));
      this.carrierOptionsForLane = this.carrierOptions.slice();
    });

    this.referenceDataService.getTransportationModes().subscribe((modes: TransportationModeReference[]) => {
      this.transportModes = modes;
      this.transportModeOptions = modes.map(mode => ({ label: mode.name, value: mode.name }));
    });

    this.referenceDataService.getShippingLanes().subscribe((lanes: ShippingLane[]) => {
      this.shippingLanes = lanes;
      this.shippingLaneOptions = lanes.map(lane => ({
        label: `${lane.laneCode} · ${lane.originHub} → ${lane.destinationHub}`,
        value: lane.id
      }));
    });

    this.referenceDataService.getShippingRates().subscribe((rates: ShippingRate[]) => {
      this.shippingRates = rates;
    });
  }

  private refreshLineItemUoms(): void {
    this.lineItems.controls.forEach(control => {
      const uomControl = (control as FormGroup).get('uom');
      if (uomControl && !uomControl.value) {
        uomControl.setValue(this.defaultUomCode, { emitEvent: false });
      }
    });
  }

  private findCarrierIdByName(name: string | undefined): string | null {
    if (!name) {
      return null;
    }

    const carrier = this.carriers.find(item => item.name === name);
    return carrier ? carrier.id : null;
  }

  onShippingLaneChange(laneId: string | null): void {
    if (!laneId) {
      this.selectedLaneDetails = null;
      this.shippingRateOptions = [];
      this.carrierOptionsForLane = this.carrierOptions.slice();
      this.termsGroup.patchValue(
        {
          transportMode: null,
          preferredCarrierId: null,
          shippingRateId: null
        },
        { emitEvent: false }
      );
      return;
    }

    this.selectedLaneDetails = this.shippingLanes.find(lane => lane.id === laneId) ?? null;

    const preferredCarrierNames = this.selectedLaneDetails?.preferredCarriers ?? [];
    const mappedCarriers = preferredCarrierNames
      .map(name => {
        const carrier = this.carriers.find(c => c.name === name);
        return carrier ? ({ label: carrier.name, value: carrier.id } as SelectOption<string>) : null;
      })
      .filter((option): option is SelectOption<string> => option !== null);

    this.carrierOptionsForLane = mappedCarriers.length ? mappedCarriers : this.carrierOptions.slice();

    const defaultCarrierId = this.selectedLaneDetails ? this.findCarrierIdByName(preferredCarrierNames[0]) : null;
    const transportModeName = this.selectedLaneDetails?.defaultMode ?? null;

    this.shippingRateOptions = this.shippingRates
      .filter(rate => rate.laneId === laneId)
      .map(rate => ({
        label: `${rate.carrier} · ${rate.chargeBasis} · ${rate.currency} ${rate.baseRate.toFixed(2)}`,
        value: rate.id
      }));

    this.selectedRateDetails = null;

    this.termsGroup.patchValue(
      {
        preferredCarrierId: defaultCarrierId ?? null,
        transportMode: transportModeName ?? null,
        shippingRateId: this.shippingRateOptions.length === 1 ? this.shippingRateOptions[0].value : null
      },
      { emitEvent: false }
    );

    if (this.shippingRateOptions.length === 1) {
      this.onShippingRateChange(this.shippingRateOptions[0].value);
    }
  }

  onShippingRateChange(rateId: string | null): void {
    if (!rateId) {
      this.selectedRateDetails = null;
      return;
    }

    const rate = this.shippingRates.find(item => item.id === rateId) ?? null;
    this.selectedRateDetails = rate;

    if (!rate) {
      return;
    }

    const carrierId = this.findCarrierIdByName(rate.carrier);
    if (carrierId) {
      this.termsGroup.patchValue({ preferredCarrierId: carrierId }, { emitEvent: false });
    }

    if (rate.mode) {
      this.termsGroup.patchValue({ transportMode: rate.mode }, { emitEvent: false });
    }

    const currentLaneId = this.termsGroup.get('shippingLaneId')?.value;
    if (!currentLaneId && rate.laneId) {
      this.termsGroup.patchValue({ shippingLaneId: rate.laneId }, { emitEvent: false });
      this.onShippingLaneChange(rate.laneId);
    }
  }

  saveDraft(): void {
    if (!this.basicInfoGroup.get('title')?.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Title required',
        detail: 'Please provide a title before saving a draft.'
      });
      return;
    }

    this.submit(RFQStatus.DRAFT);
  }

  publish(): void {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please complete all required fields'
      });
      return;
    }

    this.submit(RFQStatus.PUBLISHED);
  }

  cancel(): void {
    this.router.navigate(['/app/supply-chain/rfqs']);
  }

  hasError(groupName: string, fieldName: string): boolean {
    const control = this.form.get(`${groupName}.${fieldName}`);
    return !!(control && control.invalid && control.touched);
  }

  hasLineItemError(index: number, fieldName: string): boolean {
    const control = this.lineItems.at(index).get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  private loadExistingRfq(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.rfqId = id;
    this.isEditMode = true;

    this.rfqDataService.getById(id).subscribe({
      next: rfqResponse => {
        const rfq = this.rfqDataService.mapDetail(rfqResponse);
        this.applyRfqToForm(rfq);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Load failed',
          detail: 'Unable to load RFQ for editing.'
        });
      }
    });
  }

  private applyRfqToForm(rfq: RFQ): void {
    this.basicInfoGroup.patchValue(
      {
        type: rfq.type ?? RFQType.RFQ,
        title: rfq.title ?? '',
        description: rfq.description ?? '',
        closeDate: rfq.closeDate ? new Date(rfq.closeDate) : null,
        responseDeadline: rfq.responseDeadline ? new Date(rfq.responseDeadline) : null,
        deliveryDate: rfq.expectedDeliveryDate ? new Date(rfq.expectedDeliveryDate) : null
      },
      { emitEvent: false }
    );

    this.termsGroup.patchValue(
      {
        currency: rfq.currency ?? null,
        paymentTerms: rfq.paymentTerms ?? null,
        incoterms: rfq.incoterms ?? null,
        deliveryLocation: rfq.deliveryLocation ?? '',
        shippingLaneId: null,
        transportMode: null,
        preferredCarrierId: null,
        shippingRateId: null
      },
      { emitEvent: false }
    );

    this.resetLineItems();
    if (rfq.lineItems?.length) {
      rfq.lineItems.forEach(item => {
        const group = this.createLineItem();
        group.patchValue(
          {
            productName: item.productName ?? '',
            description: item.description ?? '',
            quantity: item.quantity ?? 1,
            uom: item.uom ?? this.defaultUomCode ?? null,
            targetPrice: item.targetPrice ?? null,
            specifications: item.specifications ?? ''
          },
          { emitEvent: false }
        );
        this.lineItems.push(group);
      });
    }

    this.ensureLineItemsPresent();
  }

  private buildPayload(status: RFQStatus): Partial<RFQ> {
    const basic = this.basicInfoGroup.getRawValue();
    const terms = this.termsGroup.getRawValue();
    const suppliers = this.suppliersGroup.getRawValue();

    return {
      id: this.rfqId ?? '',
      buyerId: '',
      buyerName: '',
      rfqNumber: '',
      title: basic.title,
      description: basic.description ?? '',
      type: basic.type ?? RFQType.RFQ,
      status,
      issueDate: new Date(),
      closeDate: basic.closeDate ?? null,
      responseDeadline: basic.responseDeadline ?? basic.closeDate ?? null,
      expectedDeliveryDate: basic.deliveryDate ?? null,
      currency: terms.currency ?? null,
      paymentTerms: terms.paymentTerms ?? null,
      incoterms: terms.incoterms ?? null,
      deliveryLocation: terms.deliveryLocation ?? null,
      createdBy: '',
      lineItems: this.lineItems.value.map((line: any) => ({
        id: '',
        productName: line.productName,
        description: line.description,
        quantity: line.quantity,
        uom: line.uom,
        targetPrice: line.targetPrice ?? undefined,
        specifications: line.specifications ?? undefined
      })),
      invitedSupplierIds: suppliers.invitedSupplierIds ?? [],
      invitedSupplierCount: (suppliers.invitedSupplierIds ?? []).length,
      responseCount: 0
    };
  }

  private submit(status: RFQStatus): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    const rfq = this.buildPayload(status);
    const payload = this.rfqDataService.buildUpsertPayload(rfq, status);

    if (this.isEditMode && this.rfqId) {
      this.rfqDataService.update(this.rfqId, payload).subscribe({
        next: () => {
          this.handleSaveSuccess(status, this.rfqId ?? undefined);
        },
        error: () => {
          this.handleSaveError();
        }
      });
      return;
    }

    this.rfqDataService.create(payload).subscribe({
      next: response => {
        this.handleSaveSuccess(status, response.id);
      },
      error: error => {
        this.handleSaveError(error);
      }
    });
  }

  private handleSaveSuccess(status: RFQStatus, rfqId?: string): void {
    this.isSaving = false;
    this.messageService.add({
      severity: 'success',
      summary: this.isEditMode ? 'Updated' : 'Created',
      detail: `RFQ ${status === RFQStatus.DRAFT ? 'draft saved' : 'published'} successfully.`
    });

    if (this.isEditMode) {
      if (rfqId) {
        this.rfqId = rfqId;
      }
      return;
    }

    if (rfqId) {
      this.tryCreateAward(rfqId, status);
      this.rfqId = rfqId;
      return;
    }
  }

  private handleSaveError(error?: any): void {
    const message = error?.error?.message ?? 'Unable to save RFQ. Please try again.';
    this.isSaving = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Save failed',
      detail: message
    });
  }

  private tryCreateAward(rfqId: string, status: RFQStatus): void {
    if (status !== RFQStatus.PUBLISHED) {
      return;
    }

    const suppliers = this.suppliersGroup.getRawValue().invitedSupplierIds ?? [];
    const primarySupplier = suppliers[0];
    if (!primarySupplier) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Award skipped',
        detail: 'Publish completed, but no supplier was selected to award.'
      });
      return;
    }

    const awardAmount = this.lineItems.controls.reduce((sum, control) => {
      const quantity = Number(control.get('quantity')?.value ?? 0);
      const targetPrice = Number(control.get('targetPrice')?.value ?? 0);
      return sum + quantity * targetPrice;
    }, 0);

    if (awardAmount <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Award skipped',
        detail: 'Publish completed, but award amount could not be calculated.'
      });
      return;
    }

    const currency = this.termsGroup.getRawValue().currency ?? null;
    this.awardsService.createAward({
      rfqId,
      supplierId: primarySupplier,
      awardNumber: null,
      awardDate: new Date().toISOString(),
      status: 'Awarded',
      awardAmount,
      currency,
      notes: null
    }).subscribe({
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Award pending',
          detail: 'RFQ published, but the award could not be created yet.'
        });
      }
    });
  }
}
