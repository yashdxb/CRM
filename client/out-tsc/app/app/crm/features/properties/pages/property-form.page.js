import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { forkJoin } from 'rxjs';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/property-data.service";
import * as i3 from "../../settings/services/user-admin-data.service";
import * as i4 from "../../customers/services/customer-data.service";
import * as i5 from "../../contacts/services/contact-data.service";
import * as i6 from "../../opportunities/services/opportunity-data.service";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
import * as i9 from "primeng/button";
import * as i10 from "primeng/api";
import * as i11 from "primeng/inputtext";
import * as i12 from "primeng/textarea";
import * as i13 from "primeng/select";
import * as i14 from "primeng/inputgroup";
import * as i15 from "primeng/inputgroupaddon";
import * as i16 from "primeng/inputnumber";
import * as i17 from "primeng/datepicker";
function PropertyFormPage_p_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 126);
    i0.ɵɵtext(1, "Property address is required.");
    i0.ɵɵelementEnd();
} }
function PropertyFormPage_ng_template_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.label);
} }
function PropertyFormPage_ng_template_86_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r2.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r2.label);
} }
function PropertyFormPage_ng_template_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_86_div_0_Template, 4, 2, "div", 129);
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r2);
} }
function PropertyFormPage_ng_template_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r3.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function PropertyFormPage_ng_template_92_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r4.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r4.label);
} }
function PropertyFormPage_ng_template_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_92_div_0_Template, 4, 2, "div", 129);
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r4);
} }
function PropertyFormPage_ng_template_199_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 130);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r5.fullName);
} }
function PropertyFormPage_ng_template_200_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 130);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r6.fullName);
} }
function PropertyFormPage_ng_template_200_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_200_div_0_Template, 4, 1, "div", 129);
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r6);
} }
function PropertyFormPage_div_229_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 131);
    i0.ɵɵelement(1, "i", 132);
    i0.ɵɵelementStart(2, "span", 133);
    i0.ɵɵtext(3, "Drag & drop photos here");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 134);
    i0.ɵɵtext(5, "Files upload after save \u2022 JPG, PNG, WebP up to 10 MB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 135);
    i0.ɵɵlistener("change", function PropertyFormPage_div_229_Template_input_change_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onPhotoSelect($event)); });
    i0.ɵɵelementEnd()();
} }
function PropertyFormPage_div_230_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 138);
    i0.ɵɵelement(1, "img", 139);
    i0.ɵɵelementStart(2, "button", 140);
    i0.ɵɵlistener("click", function PropertyFormPage_div_230_div_1_Template_button_click_2_listener() { const photo_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.removeExistingPhoto(photo_r10.id)); });
    i0.ɵɵelement(3, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 142);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const photo_r10 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r7.resolveMediaUrl(photo_r10.fileUrl), i0.ɵɵsanitizeUrl)("alt", photo_r10.fileName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(photo_r10.fileName);
} }
function PropertyFormPage_div_230_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵtemplate(1, PropertyFormPage_div_230_div_1_Template, 6, 3, "div", 137);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r7.existingPhotos());
} }
function PropertyFormPage_div_231_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 138);
    i0.ɵɵelement(1, "img", 139);
    i0.ɵɵelementStart(2, "button", 140);
    i0.ɵɵlistener("click", function PropertyFormPage_div_231_div_1_Template_button_click_2_listener() { const i_r13 = i0.ɵɵrestoreView(_r12).index; const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.removePhoto(i_r13)); });
    i0.ɵɵelement(3, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 142);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const photo_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", photo_r14.preview, i0.ɵɵsanitizeUrl)("alt", photo_r14.file.name);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(photo_r14.file.name);
} }
function PropertyFormPage_div_231_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵtemplate(1, PropertyFormPage_div_231_div_1_Template, 6, 3, "div", 137);
    i0.ɵɵelementStart(2, "label", 143);
    i0.ɵɵelement(3, "i", 144);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Add more");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 145);
    i0.ɵɵlistener("change", function PropertyFormPage_div_231_Template_input_change_6_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onPhotoSelect($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r7.photoFiles());
} }
function PropertyFormPage_ng_template_245_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 146);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r15 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r15.fullName);
} }
function PropertyFormPage_ng_template_246_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 146);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r16.fullName);
} }
function PropertyFormPage_ng_template_246_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_246_div_0_Template, 4, 1, "div", 129);
} if (rf & 2) {
    const option_r16 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r16);
} }
function PropertyFormPage_ng_template_251_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r17 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r17.name);
} }
function PropertyFormPage_ng_template_252_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r18.name);
} }
function PropertyFormPage_ng_template_252_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_252_div_0_Template, 4, 1, "div", 129);
} if (rf & 2) {
    const option_r18 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r18);
} }
function PropertyFormPage_ng_template_257_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 148);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r19 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r19.name);
} }
function PropertyFormPage_ng_template_258_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 148);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r20.name);
} }
function PropertyFormPage_ng_template_258_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_258_div_0_Template, 4, 1, "div", 129);
} if (rf & 2) {
    const option_r20 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r20);
} }
function PropertyFormPage_ng_template_263_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 149);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r21 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r21.name);
} }
function PropertyFormPage_ng_template_264_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵelement(1, "i", 149);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r22.name);
} }
function PropertyFormPage_ng_template_264_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertyFormPage_ng_template_264_div_0_Template, 4, 1, "div", 129);
} if (rf & 2) {
    const option_r22 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r22);
} }
export class PropertyFormPage {
    router;
    route;
    propertyData;
    userService;
    customerService;
    contactService;
    opportunityService;
    fb = inject(FormBuilder);
    statusOptions = [
        { label: 'Draft', value: 'Draft', icon: 'pi-file-edit' },
        { label: 'Active', value: 'Active', icon: 'pi-check-circle' },
        { label: 'Conditional', value: 'Conditional', icon: 'pi-clock' },
        { label: 'Sold', value: 'Sold', icon: 'pi-star-fill' },
        { label: 'Terminated', value: 'Terminated', icon: 'pi-times-circle' },
        { label: 'Expired', value: 'Expired', icon: 'pi-calendar-times' },
        { label: 'Delisted', value: 'Delisted', icon: 'pi-minus-circle' }
    ];
    typeOptions = [
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
    isEditMode = signal(false, ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    photoUploading = signal(false, ...(ngDevMode ? [{ debugName: "photoUploading" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    toastService = inject(AppToastService);
    propertyId = null;
    // Photo upload (X5)
    photoFiles = signal([], ...(ngDevMode ? [{ debugName: "photoFiles" }] : []));
    existingPhotos = signal([], ...(ngDevMode ? [{ debugName: "existingPhotos" }] : []));
    dragging = signal(false, ...(ngDevMode ? [{ debugName: "dragging" }] : []));
    // Relationship lookup data
    users = signal([], ...(ngDevMode ? [{ debugName: "users" }] : []));
    customers = signal([], ...(ngDevMode ? [{ debugName: "customers" }] : []));
    contacts = signal([], ...(ngDevMode ? [{ debugName: "contacts" }] : []));
    opportunities = signal([], ...(ngDevMode ? [{ debugName: "opportunities" }] : []));
    formGroup = this.fb.group({
        address: ['', Validators.required],
        mlsNumber: [''],
        city: [''],
        province: [''],
        postalCode: [''],
        neighborhood: [''],
        country: ['Canada'],
        status: ['Draft'],
        propertyType: ['Detached'],
        listPrice: [null],
        salePrice: [null],
        currency: ['CAD'],
        listingDate: [null],
        soldDate: [null],
        bedrooms: [null],
        bathrooms: [null],
        squareFeet: [null],
        lotSizeSqFt: [null],
        yearBuilt: [null],
        garageSpaces: [null],
        description: [''],
        features: [''],
        virtualTourUrl: [''],
        photoUrls: [''],
        ownerId: [null],
        accountId: [null],
        primaryContactId: [null],
        opportunityId: [null],
        // Commission fields (X7)
        commissionRate: [null],
        buyerAgentCommission: [null],
        sellerAgentCommission: [null],
        coListingAgentId: [null]
    });
    constructor(router, route, propertyData, userService, customerService, contactService, opportunityService) {
        this.router = router;
        this.route = route;
        this.propertyData = propertyData;
        this.userService = userService;
        this.customerService = customerService;
        this.contactService = contactService;
        this.opportunityService = opportunityService;
    }
    ngOnInit() {
        this.propertyId = this.route.snapshot.paramMap.get('id');
        if (this.propertyId) {
            this.isEditMode.set(true);
            this.loadProperty();
        }
        this.loadLookups();
    }
    loadLookups() {
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
    loadProperty() {
        if (!this.propertyId)
            return;
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
    loadExistingPhotos(propertyId) {
        this.propertyData.getDocuments(propertyId).subscribe({
            next: (docs) => this.existingPhotos.set(docs.filter((doc) => doc.category === 'Photo')),
            error: () => this.existingPhotos.set([])
        });
    }
    onSave() {
        if (this.saving() || this.photoUploading() || this.loading()) {
            return;
        }
        // PrimeNG InputNumber commits/parses on blur. Blur the active control and
        // defer the save by one tick so currency edits are committed before route navigation.
        const activeElement = typeof document !== 'undefined' ? document.activeElement : null;
        activeElement?.blur();
        setTimeout(() => this.commitSave(), 0);
    }
    prepareForSave(event) {
        const target = event?.target;
        const activeElement = typeof document !== 'undefined' ? document.activeElement : null;
        if (activeElement && activeElement !== target) {
            activeElement.blur();
        }
    }
    commitSave() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            this.raiseToast('error', 'Please fix the highlighted errors before saving.');
            return;
        }
        this.saving.set(true);
        const v = this.formGroup.getRawValue();
        const payload = {
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
                next: () => this.finishSave(this.propertyId, 'Property updated.'),
                error: () => {
                    this.saving.set(false);
                    this.raiseToast('error', 'Unable to update property.');
                }
            });
        }
        else {
            this.propertyData.create(payload).subscribe({
                next: (property) => this.finishSave(property.id, 'Property created.'),
                error: () => {
                    this.saving.set(false);
                    this.raiseToast('error', 'Unable to create property.');
                }
            });
        }
    }
    finishSave(propertyId, message) {
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
    navigateWithToast(message) {
        this.saving.set(false);
        this.router.navigate(['/app/properties'], { state: { toast: { tone: 'success', message } } });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
    }
    // ── Photo drag-drop (X5) ─────────────────────────────────────────────
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(true);
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(false);
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(false);
        const files = event.dataTransfer?.files;
        if (files)
            this.addPhotoFiles(files);
    }
    onPhotoSelect(event) {
        const input = event.target;
        if (input.files)
            this.addPhotoFiles(input.files);
        input.value = '';
    }
    addPhotoFiles(fileList) {
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
    removePhoto(index) {
        const current = this.photoFiles();
        URL.revokeObjectURL(current[index].preview);
        current.splice(index, 1);
        this.photoFiles.set([...current]);
    }
    removeExistingPhoto(docId) {
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
    resolveMediaUrl(url) {
        if (!url) {
            return '';
        }
        if (/^https?:\/\//i.test(url)) {
            return url;
        }
        return `${environment.apiUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    static ɵfac = function PropertyFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertyFormPage)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.PropertyDataService), i0.ɵɵdirectiveInject(i3.UserAdminDataService), i0.ɵɵdirectiveInject(i4.CustomerDataService), i0.ɵɵdirectiveInject(i5.ContactDataService), i0.ɵɵdirectiveInject(i6.OpportunityDataService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertyFormPage, selectors: [["app-property-form-page"]], decls: 268, vars: 60, consts: [[1, "property-form-page"], [1, "page-header"], [1, "header-content"], ["pButton", "", "type", "button", "routerLink", "/app/properties", 1, "back-link", "p-button-text"], [1, "pi", "pi-arrow-left"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "form-container"], [1, "property-form", 3, "ngSubmit", "formGroup"], [1, "form-fieldset", 3, "disabled"], [1, "form-section", "section--basic"], [1, "section-title"], [1, "pi", "pi-home"], [1, "form-grid"], [1, "form-field"], ["for", "propertyAddress"], [1, "required"], [1, "icon-addon", "icon-addon--address"], [1, "pi", "pi-map-marker"], ["pInputText", "", "id", "propertyAddress", "formControlName", "address", "placeholder", "Enter property address"], ["class", "field-error", 4, "ngIf"], ["for", "propertyMls"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-hashtag"], ["pInputText", "", "id", "propertyMls", "formControlName", "mlsNumber", "placeholder", "e.g., W1234567"], ["for", "propertyCity"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-building"], ["pInputText", "", "id", "propertyCity", "formControlName", "city", "placeholder", "City"], ["for", "propertyProvince"], [1, "pi", "pi-map"], ["pInputText", "", "id", "propertyProvince", "formControlName", "province", "placeholder", "Province / State"], ["for", "propertyPostalCode"], [1, "pi", "pi-inbox"], ["pInputText", "", "id", "propertyPostalCode", "formControlName", "postalCode", "placeholder", "A1A 1A1"], ["for", "propertyNeighborhood"], [1, "icon-addon", "icon-addon--success"], [1, "pi", "pi-compass"], ["pInputText", "", "id", "propertyNeighborhood", "formControlName", "neighborhood", "placeholder", "Neighborhood"], ["for", "propertyCountry"], [1, "pi", "pi-globe"], ["pInputText", "", "id", "propertyCountry", "formControlName", "country", "placeholder", "Country"], [1, "form-section", "section--contact"], [1, "pi", "pi-dollar"], ["for", "propertyStatus"], ["id", "propertyStatus", "optionLabel", "label", "optionValue", "value", "formControlName", "status", "placeholder", "Select status", "appendTo", "body", "styleClass", "w-full", 3, "options"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["for", "propertyType"], ["id", "propertyType", "optionLabel", "label", "optionValue", "value", "formControlName", "propertyType", "placeholder", "Select type", "appendTo", "body", "styleClass", "w-full", 3, "options"], ["for", "propertyListPrice"], ["id", "propertyListPrice", "formControlName", "listPrice", "mode", "currency", "currency", "CAD", "locale", "en-CA", "placeholder", "0.00", "styleClass", "w-full", 3, "minFractionDigits", "maxFractionDigits"], ["for", "propertySalePrice"], [1, "icon-addon", "icon-addon--warning"], ["id", "propertySalePrice", "formControlName", "salePrice", "mode", "currency", "currency", "CAD", "locale", "en-CA", "placeholder", "0.00", "styleClass", "w-full", 3, "minFractionDigits", "maxFractionDigits"], ["for", "propertyCurrency"], [1, "pi", "pi-money-bill"], ["pInputText", "", "id", "propertyCurrency", "formControlName", "currency", "placeholder", "CAD"], ["for", "propertyListingDate"], ["id", "propertyListingDate", "formControlName", "listingDate", "dateFormat", "M dd, yy", "placeholder", "Select listing date", "appendTo", "body", "styleClass", "w-full", 3, "showIcon"], ["for", "propertySoldDate"], ["id", "propertySoldDate", "formControlName", "soldDate", "dateFormat", "M dd, yy", "placeholder", "Select sold date", "appendTo", "body", "styleClass", "w-full", 3, "showIcon"], [1, "form-section", "section--additional"], [1, "pi", "pi-list"], ["for", "propertyBedrooms"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-moon"], ["id", "propertyBedrooms", "formControlName", "bedrooms", "placeholder", "0", "styleClass", "w-full", 3, "min", "max"], ["for", "propertyBathrooms"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-slack"], ["id", "propertyBathrooms", "formControlName", "bathrooms", "placeholder", "0", "styleClass", "w-full", 3, "min", "max", "minFractionDigits", "maxFractionDigits"], ["for", "propertySquareFeet"], [1, "pi", "pi-stop"], ["id", "propertySquareFeet", "formControlName", "squareFeet", "placeholder", "0", "styleClass", "w-full", 3, "min"], ["for", "propertyLotSize"], [1, "pi", "pi-expand"], ["id", "propertyLotSize", "formControlName", "lotSizeSqFt", "placeholder", "0", "styleClass", "w-full", 3, "min"], ["for", "propertyYearBuilt"], [1, "pi", "pi-calendar"], ["id", "propertyYearBuilt", "formControlName", "yearBuilt", "placeholder", "e.g., 2020", "styleClass", "w-full", 3, "min", "max", "useGrouping"], ["for", "propertyGarage"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-car"], ["id", "propertyGarage", "formControlName", "garageSpaces", "placeholder", "0", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-percentage"], ["for", "propertyCommRate"], ["id", "propertyCommRate", "formControlName", "commissionRate", "suffix", "%", "placeholder", "0.00", "styleClass", "w-full", 3, "min", "max", "minFractionDigits", "maxFractionDigits"], ["for", "propertyBuyerComm"], [1, "pi", "pi-user"], ["id", "propertyBuyerComm", "formControlName", "buyerAgentCommission", "suffix", "%", "placeholder", "0.00", "styleClass", "w-full", 3, "min", "max", "minFractionDigits", "maxFractionDigits"], ["for", "propertySellerComm"], [1, "pi", "pi-users"], ["id", "propertySellerComm", "formControlName", "sellerAgentCommission", "suffix", "%", "placeholder", "0.00", "styleClass", "w-full", 3, "min", "max", "minFractionDigits", "maxFractionDigits"], ["for", "propertyCoAgent"], ["id", "propertyCoAgent", "optionLabel", "fullName", "optionValue", "id", "formControlName", "coListingAgentId", "placeholder", "Select co-listing agent", "appendTo", "body", "filterBy", "fullName,email", "styleClass", "w-full", 3, "options", "filter", "showClear"], [1, "form-section", "section--workspace"], [1, "pi", "pi-file-edit"], [1, "form-field", "full-width"], ["for", "propertyDescription"], ["pTextarea", "", "id", "propertyDescription", "formControlName", "description", "rows", "5", "placeholder", "Describe the property features, finishes, upgrades...", 1, "w-full"], ["for", "propertyFeatures"], ["pTextarea", "", "id", "propertyFeatures", "formControlName", "features", "rows", "3", "placeholder", "Pool, hardwood floors, smart home, heated garage...", 1, "w-full"], [1, "pi", "pi-images"], ["for", "propertyVirtualTour"], [1, "pi", "pi-video"], ["pInputText", "", "id", "propertyVirtualTour", "formControlName", "virtualTourUrl", "placeholder", "https://my.matterport.com/..."], [1, "photo-drop-zone", 3, "dragover", "dragleave", "drop"], ["class", "drop-prompt", 4, "ngIf"], ["class", "photo-grid", 4, "ngIf"], ["for", "propertyPhotoUrls"], ["pTextarea", "", "id", "propertyPhotoUrls", "formControlName", "photoUrls", "rows", "2", "placeholder", "Optional external image URLs separated by commas", 1, "w-full"], [1, "pi", "pi-link"], ["for", "propertyOwner"], ["id", "propertyOwner", "optionLabel", "fullName", "optionValue", "id", "formControlName", "ownerId", "placeholder", "Select owner", "appendTo", "body", "filterBy", "fullName,email", "styleClass", "w-full", 3, "options", "filter", "showClear"], ["for", "propertyAccount"], ["id", "propertyAccount", "optionLabel", "name", "optionValue", "id", "formControlName", "accountId", "placeholder", "Select account", "appendTo", "body", "filterBy", "name,company", "styleClass", "w-full", 3, "options", "filter", "showClear"], ["for", "propertyContact"], ["id", "propertyContact", "optionLabel", "name", "optionValue", "id", "formControlName", "primaryContactId", "placeholder", "Select contact", "appendTo", "body", "filterBy", "name,email", "styleClass", "w-full", 3, "options", "filter", "showClear"], ["for", "propertyOpportunity"], ["id", "propertyOpportunity", "optionLabel", "name", "optionValue", "id", "formControlName", "opportunityId", "placeholder", "Select opportunity", "appendTo", "body", "filterBy", "name", "styleClass", "w-full", 3, "options", "filter", "showClear"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", "routerLink", "/app/properties", 1, "crm-button", "crm-button--ghost"], ["type", "submit", "pButton", "", 1, "crm-button", "crm-button--primary", 3, "mousedown", "label", "disabled"], [1, "field-error"], [1, "select-option"], [1, "pi", 3, "ngClass"], ["class", "select-option", 4, "ngIf"], [1, "pi", "pi-user", 2, "color", "#f59e0b"], [1, "drop-prompt"], [1, "pi", "pi-cloud-upload"], [1, "drop-title"], [1, "drop-hint"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", "multiple", "", 1, "drop-input", 3, "change"], [1, "photo-grid"], ["class", "photo-thumb", 4, "ngFor", "ngForOf"], [1, "photo-thumb"], [3, "src", "alt"], ["type", "button", "title", "Remove", 1, "photo-remove", 3, "click"], [1, "pi", "pi-times"], [1, "photo-name"], [1, "photo-add-more"], [1, "pi", "pi-plus"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", "multiple", "", 3, "change"], [1, "pi", "pi-user", 2, "color", "#6366f1"], [1, "pi", "pi-building", 2, "color", "#3b82f6"], [1, "pi", "pi-id-card", 2, "color", "#22c55e"], [1, "pi", "pi-chart-line", 2, "color", "#a855f7"]], template: function PropertyFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "header", 1)(3, "div", 2)(4, "button", 3);
            i0.ɵɵelement(5, "i", 4);
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "Back to properties");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5)(9, "h1", 6)(10, "span", 7);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 8);
            i0.ɵɵtext(13, "Property");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "p");
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(16, "main", 9)(17, "form", 10);
            i0.ɵɵlistener("ngSubmit", function PropertyFormPage_Template_form_ngSubmit_17_listener() { return ctx.onSave(); });
            i0.ɵɵelementStart(18, "fieldset", 11)(19, "section", 12)(20, "h2", 13);
            i0.ɵɵelement(21, "i", 14);
            i0.ɵɵtext(22, " Property information ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 15)(24, "div", 16)(25, "label", 17);
            i0.ɵɵtext(26, "Address ");
            i0.ɵɵelementStart(27, "span", 18);
            i0.ɵɵtext(28, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "p-inputgroup")(30, "p-inputgroup-addon", 19);
            i0.ɵɵelement(31, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(33, PropertyFormPage_p_33_Template, 2, 0, "p", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 16)(35, "label", 23);
            i0.ɵɵtext(36, "MLS Number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "p-inputgroup")(38, "p-inputgroup-addon", 24);
            i0.ɵɵelement(39, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "input", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 16)(42, "label", 27);
            i0.ɵɵtext(43, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "p-inputgroup")(45, "p-inputgroup-addon", 28);
            i0.ɵɵelement(46, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(47, "input", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 16)(49, "label", 31);
            i0.ɵɵtext(50, "Province");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "p-inputgroup")(52, "p-inputgroup-addon", 28);
            i0.ɵɵelement(53, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "input", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 16)(56, "label", 34);
            i0.ɵɵtext(57, "Postal Code");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "p-inputgroup")(59, "p-inputgroup-addon", 24);
            i0.ɵɵelement(60, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(61, "input", 36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "div", 16)(63, "label", 37);
            i0.ɵɵtext(64, "Neighborhood");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "p-inputgroup")(66, "p-inputgroup-addon", 38);
            i0.ɵɵelement(67, "i", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(68, "input", 40);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(69, "div", 16)(70, "label", 41);
            i0.ɵɵtext(71, "Country");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "p-inputgroup")(73, "p-inputgroup-addon", 24);
            i0.ɵɵelement(74, "i", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "input", 43);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(76, "section", 44)(77, "h2", 13);
            i0.ɵɵelement(78, "i", 45);
            i0.ɵɵtext(79, " Listing & pricing ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 15)(81, "div", 16)(82, "label", 46);
            i0.ɵɵtext(83, "Listing Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "p-select", 47);
            i0.ɵɵtemplate(85, PropertyFormPage_ng_template_85_Template, 4, 2, "ng-template", 48)(86, PropertyFormPage_ng_template_86_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "div", 16)(88, "label", 50);
            i0.ɵɵtext(89, "Property Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "p-select", 51);
            i0.ɵɵtemplate(91, PropertyFormPage_ng_template_91_Template, 4, 2, "ng-template", 48)(92, PropertyFormPage_ng_template_92_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 16)(94, "label", 52);
            i0.ɵɵtext(95, "List Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "p-inputgroup")(97, "p-inputgroup-addon", 38);
            i0.ɵɵelement(98, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(99, "p-inputNumber", 53);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "div", 16)(101, "label", 54);
            i0.ɵɵtext(102, "Sale Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "p-inputgroup")(104, "p-inputgroup-addon", 55);
            i0.ɵɵelement(105, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(106, "p-inputNumber", 56);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 16)(108, "label", 57);
            i0.ɵɵtext(109, "Currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "p-inputgroup")(111, "p-inputgroup-addon", 24);
            i0.ɵɵelement(112, "i", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(113, "input", 59);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(114, "div", 16)(115, "label", 60);
            i0.ɵɵtext(116, "Listing Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(117, "p-datepicker", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "div", 16)(119, "label", 62);
            i0.ɵɵtext(120, "Sold Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(121, "p-datepicker", 63);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(122, "section", 64)(123, "h2", 13);
            i0.ɵɵelement(124, "i", 65);
            i0.ɵɵtext(125, " Property details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "div", 15)(127, "div", 16)(128, "label", 66);
            i0.ɵɵtext(129, "Bedrooms");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "p-inputgroup")(131, "p-inputgroup-addon", 67);
            i0.ɵɵelement(132, "i", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(133, "p-inputNumber", 69);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(134, "div", 16)(135, "label", 70);
            i0.ɵɵtext(136, "Bathrooms");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "p-inputgroup")(138, "p-inputgroup-addon", 71);
            i0.ɵɵelement(139, "i", 72);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(140, "p-inputNumber", 73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(141, "div", 16)(142, "label", 74);
            i0.ɵɵtext(143, "Square Feet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(144, "p-inputgroup")(145, "p-inputgroup-addon", 28);
            i0.ɵɵelement(146, "i", 75);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(147, "p-inputNumber", 76);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(148, "div", 16)(149, "label", 77);
            i0.ɵɵtext(150, "Lot Size (sqft)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(151, "p-inputgroup")(152, "p-inputgroup-addon", 38);
            i0.ɵɵelement(153, "i", 78);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(154, "p-inputNumber", 79);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(155, "div", 16)(156, "label", 80);
            i0.ɵɵtext(157, "Year Built");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "p-inputgroup")(159, "p-inputgroup-addon", 55);
            i0.ɵɵelement(160, "i", 81);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(161, "p-inputNumber", 82);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(162, "div", 16)(163, "label", 83);
            i0.ɵɵtext(164, "Garage Spaces");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(165, "p-inputgroup")(166, "p-inputgroup-addon", 84);
            i0.ɵɵelement(167, "i", 85);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(168, "p-inputNumber", 86);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(169, "section", 44)(170, "h2", 13);
            i0.ɵɵelement(171, "i", 87);
            i0.ɵɵtext(172, " Commission ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "div", 15)(174, "div", 16)(175, "label", 88);
            i0.ɵɵtext(176, "Commission Rate (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(177, "p-inputgroup")(178, "p-inputgroup-addon", 55);
            i0.ɵɵelement(179, "i", 87);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(180, "p-inputNumber", 89);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(181, "div", 16)(182, "label", 90);
            i0.ɵɵtext(183, "Buyer Agent (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(184, "p-inputgroup")(185, "p-inputgroup-addon", 38);
            i0.ɵɵelement(186, "i", 91);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(187, "p-inputNumber", 92);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "div", 16)(189, "label", 93);
            i0.ɵɵtext(190, "Seller Agent (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(191, "p-inputgroup")(192, "p-inputgroup-addon", 67);
            i0.ɵɵelement(193, "i", 94);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(194, "p-inputNumber", 95);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(195, "div", 16)(196, "label", 96);
            i0.ɵɵtext(197, "Co-Listing Agent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(198, "p-select", 97);
            i0.ɵɵtemplate(199, PropertyFormPage_ng_template_199_Template, 4, 1, "ng-template", 48)(200, PropertyFormPage_ng_template_200_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(201, "section", 98)(202, "h2", 13);
            i0.ɵɵelement(203, "i", 99);
            i0.ɵɵtext(204, " Description ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(205, "div", 100)(206, "label", 101);
            i0.ɵɵtext(207, "Property Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(208, "textarea", 102);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(209, "div", 100)(210, "label", 103);
            i0.ɵɵtext(211, "Features & Amenities");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(212, "textarea", 104);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(213, "section", 44)(214, "h2", 13);
            i0.ɵɵelement(215, "i", 105);
            i0.ɵɵtext(216, " Media ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(217, "div", 15)(218, "div", 16)(219, "label", 106);
            i0.ɵɵtext(220, "Virtual Tour URL");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(221, "p-inputgroup")(222, "p-inputgroup-addon", 67);
            i0.ɵɵelement(223, "i", 107);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(224, "input", 108);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(225, "div", 100)(226, "label");
            i0.ɵɵtext(227, "Property Photos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(228, "div", 109);
            i0.ɵɵlistener("dragover", function PropertyFormPage_Template_div_dragover_228_listener($event) { return ctx.onDragOver($event); })("dragleave", function PropertyFormPage_Template_div_dragleave_228_listener($event) { return ctx.onDragLeave($event); })("drop", function PropertyFormPage_Template_div_drop_228_listener($event) { return ctx.onDrop($event); });
            i0.ɵɵtemplate(229, PropertyFormPage_div_229_Template, 7, 0, "div", 110)(230, PropertyFormPage_div_230_Template, 2, 1, "div", 111)(231, PropertyFormPage_div_231_Template, 7, 1, "div", 111);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(232, "div", 100)(233, "label", 112);
            i0.ɵɵtext(234, "Photo URLs");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(235, "textarea", 113);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(236, "section", 12)(237, "h2", 13);
            i0.ɵɵelement(238, "i", 114);
            i0.ɵɵtext(239, " Relationships ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(240, "div", 15)(241, "div", 16)(242, "label", 115);
            i0.ɵɵtext(243, "Owner / Agent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(244, "p-select", 116);
            i0.ɵɵtemplate(245, PropertyFormPage_ng_template_245_Template, 4, 1, "ng-template", 48)(246, PropertyFormPage_ng_template_246_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(247, "div", 16)(248, "label", 117);
            i0.ɵɵtext(249, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(250, "p-select", 118);
            i0.ɵɵtemplate(251, PropertyFormPage_ng_template_251_Template, 4, 1, "ng-template", 48)(252, PropertyFormPage_ng_template_252_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(253, "div", 16)(254, "label", 119);
            i0.ɵɵtext(255, "Primary Contact");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(256, "p-select", 120);
            i0.ɵɵtemplate(257, PropertyFormPage_ng_template_257_Template, 4, 1, "ng-template", 48)(258, PropertyFormPage_ng_template_258_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(259, "div", 16)(260, "label", 121);
            i0.ɵɵtext(261, "Opportunity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(262, "p-select", 122);
            i0.ɵɵtemplate(263, PropertyFormPage_ng_template_263_Template, 4, 1, "ng-template", 48)(264, PropertyFormPage_ng_template_264_Template, 1, 1, "ng-template", 49);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(265, "footer", 123);
            i0.ɵɵelement(266, "button", 124);
            i0.ɵɵelementStart(267, "button", 125);
            i0.ɵɵlistener("mousedown", function PropertyFormPage_Template_button_mousedown_267_listener($event) { return ctx.prepareForSave($event); });
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create New");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update property listing details" : "Add a new property listing to your portfolio");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.formGroup);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", ((tmp_4_0 = ctx.formGroup.get("address")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.formGroup.get("address")) == null ? null : tmp_4_0.touched));
            i0.ɵɵadvance(51);
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.typeOptions);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("minFractionDigits", 0)("maxFractionDigits", 2);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("minFractionDigits", 0)("maxFractionDigits", 2);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("showIcon", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("showIcon", true);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("min", 0)("max", 99);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 99)("minFractionDigits", 0)("maxFractionDigits", 1);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 1800)("max", 2099)("useGrouping", false);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 20);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("min", 0)("max", 100)("minFractionDigits", 0)("maxFractionDigits", 2);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 100)("minFractionDigits", 0)("maxFractionDigits", 2);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 100)("minFractionDigits", 0)("maxFractionDigits", 2);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.users())("filter", true)("showClear", true);
            i0.ɵɵadvance(30);
            i0.ɵɵclassProp("drag-active", ctx.dragging());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.photoFiles().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.existingPhotos().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.photoFiles().length);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("options", ctx.users())("filter", true)("showClear", true);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.customers())("filter", true)("showClear", true);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.contacts())("filter", true)("showClear", true);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.opportunities())("filter", true)("showClear", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("label", ctx.photoUploading() ? "Uploading photos\u2026" : ctx.saving() ? "Saving\u2026" : ctx.isEditMode() ? "Update property" : "Create property")("disabled", ctx.formGroup.invalid || ctx.saving() || ctx.loading() || ctx.photoUploading());
        } }, dependencies: [CommonModule, i7.NgClass, i7.NgForOf, i7.NgIf, ReactiveFormsModule, i8.ɵNgNoValidate, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgControlStatusGroup, i8.FormGroupDirective, i8.FormControlName, RouterLink,
            ButtonModule, i9.ButtonDirective, i10.PrimeTemplate, InputTextModule, i11.InputText, TextareaModule, i12.Textarea, SelectModule, i13.Select, InputGroupModule, i14.InputGroup, InputGroupAddonModule, i15.InputGroupAddon, InputNumberModule, i16.InputNumber, DatePickerModule, i17.DatePicker, BreadcrumbsComponent], styles: ["\n\n\n\n\n\n[_nghost-%COMP%] {\n  --apple-blue: 0, 122, 255;\n  --apple-purple: 175, 82, 222;\n  --apple-pink: 255, 45, 85;\n  --apple-teal: 90, 200, 250;\n  --apple-green: 52, 199, 89;\n  --apple-gray-1: 142, 142, 147;\n  --apple-gray-2: 174, 174, 178;\n  --apple-gray-3: 199, 199, 204;\n  --apple-gray-4: 209, 209, 214;\n  --apple-gray-5: 229, 229, 234;\n  --apple-gray-6: 242, 242, 247;\n  --apple-label: 0, 0, 0;\n  --apple-secondary: 60, 60, 67;\n  --apple-tertiary: 60, 60, 67;\n  --apple-fill: 120, 120, 128;\n\n  --gradient-start: rgba(var(--apple-blue), 0.6);\n  --gradient-mid: rgba(var(--apple-purple), 0.4);\n  --gradient-end: rgba(var(--apple-teal), 0.5);\n}\n\n.property-form-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  position: relative;\n  background:\n    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n    radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n    radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n    linear-gradient(180deg,\n      rgba(var(--apple-gray-6), 0.95) 0%,\n      rgba(255, 255, 255, 1) 40%,\n      rgba(var(--apple-gray-6), 0.3) 100%);\n  padding-bottom: 5rem;\n}\n\n.property-form-page[_ngcontent-%COMP%]::before {\n  content: '';\n  position: fixed;\n  top: -15%;\n  left: -5%;\n  width: 50%;\n  height: 50%;\n  background: radial-gradient(circle, rgba(var(--apple-blue), 0.08) 0%, rgba(var(--apple-blue), 0.03) 30%, transparent 60%);\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_float-orb-1 18s ease-in-out infinite;\n}\n\n.property-form-page[_ngcontent-%COMP%]::after {\n  content: '';\n  position: fixed;\n  bottom: -20%;\n  right: -10%;\n  width: 60%;\n  height: 60%;\n  background: radial-gradient(circle, rgba(var(--apple-purple), 0.07) 0%, rgba(var(--apple-teal), 0.03) 35%, transparent 60%);\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_float-orb-2 22s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_float-orb-1 {\n  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n  25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n  50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n  75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n}\n\n@keyframes _ngcontent-%COMP%_float-orb-2 {\n  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n  33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n  66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n}\n\n\n\n\n\n\n.page-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: rgba(255, 255, 255, 0.65);\n  backdrop-filter: blur(40px) saturate(200%);\n  -webkit-backdrop-filter: blur(40px) saturate(200%);\n  border-bottom: 1px solid transparent;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n    linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  padding: 1rem 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n}\n\n.header-content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n  margin-left: -0.375rem;\n  border: none;\n  background: transparent;\n  color: rgba(var(--apple-blue), 1);\n  font-size: 0.9375rem;\n  font-weight: 500;\n  letter-spacing: -0.01em;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n}\n\n.back-link[_ngcontent-%COMP%]:hover {\n  background: rgba(var(--apple-blue), 0.1);\n  transform: translateX(-2px);\n}\n\n.back-link[_ngcontent-%COMP%]:active {\n  background: rgba(var(--apple-blue), 0.15);\n  transform: scale(0.97);\n}\n\n.back-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  transition: transform 0.2s ease;\n}\n\n.back-link[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  transform: translateX(-3px);\n}\n\n.header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n}\n\n.title-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n}\n\n.title-light[_ngcontent-%COMP%] {\n  -webkit-text-fill-color: #374151;\n  margin-left: 0.5rem;\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n.header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n  color: #6b7280;\n  font-size: 1rem;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n\n\n\n\n\n.form-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 1.5rem;\n}\n\n.property-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-fieldset[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  border: none;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n\n\n\n\n\n.form-section[_ngcontent-%COMP%] {\n  position: relative;\n  background: rgba(255, 255, 255, 0.55);\n  backdrop-filter: blur(40px) saturate(180%);\n  -webkit-backdrop-filter: blur(40px) saturate(180%);\n  border-radius: 20px;\n  padding: 1.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n    0 1px 2px rgba(0, 0, 0, 0.02),\n    0 4px 12px rgba(0, 0, 0, 0.03),\n    0 16px 32px rgba(0, 0, 0, 0.04);\n  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.form-section[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: -1px;\n  border-radius: 21px;\n  padding: 1px;\n  background: linear-gradient(135deg, transparent 0%, transparent 100%);\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n  pointer-events: none;\n  opacity: 0;\n  transition: all 0.4s ease;\n}\n\n.form-section[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 120%;\n  height: 120%;\n  transform: translate(-50%, -50%);\n  background: radial-gradient(ellipse at center, rgba(var(--apple-blue), 0) 0%, transparent 70%);\n  pointer-events: none;\n  z-index: -1;\n  opacity: 0;\n  transition: all 0.4s ease;\n}\n\n.form-section[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.72);\n  border-color: transparent;\n  transform: translateY(-3px) scale(1.005);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n    0 4px 8px rgba(0, 0, 0, 0.03),\n    0 8px 24px rgba(0, 0, 0, 0.06),\n    0 24px 48px rgba(var(--apple-blue), 0.08),\n    0 0 60px rgba(var(--apple-blue), 0.06);\n}\n\n.form-section[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n  background: linear-gradient(135deg,\n    rgba(var(--apple-blue), 0.4) 0%,\n    rgba(var(--apple-purple), 0.3) 50%,\n    rgba(var(--apple-teal), 0.4) 100%);\n}\n\n.form-section[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n  background: radial-gradient(ellipse at center, rgba(var(--apple-blue), 0.04) 0%, transparent 70%);\n}\n\n.form-section[_ngcontent-%COMP%]:focus-within {\n  background: rgba(255, 255, 255, 0.78);\n  border-color: transparent;\n  transform: translateY(-2px);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.95) inset,\n    0 4px 8px rgba(0, 0, 0, 0.03),\n    0 12px 32px rgba(var(--apple-blue), 0.1),\n    0 0 80px rgba(var(--apple-blue), 0.08);\n}\n\n.form-section[_ngcontent-%COMP%]:focus-within::before {\n  opacity: 1;\n  background: linear-gradient(135deg,\n    rgba(var(--apple-blue), 0.5) 0%,\n    rgba(var(--apple-purple), 0.35) 50%,\n    rgba(var(--apple-teal), 0.5) 100%);\n}\n\n\n\n\n\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;\n  font-size: 1.0625rem;\n  font-weight: 650;\n  color: #0e7490;\n  margin: 0 0 1.25rem;\n  padding-bottom: 0.875rem;\n  border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n  transition: all 0.3s ease;\n}\n\n.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  font-size: 0.9375rem;\n  color: #06b6d4;\n  background: rgba(6, 182, 212, 0.15);\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.form-section[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  transform: scale(1.12);\n  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n}\n\n\n\n.section--basic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] { color: #4338ca; border-bottom-color: rgba(99, 102, 241, 0.2); }\n.section--basic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #6366f1; background: rgba(99, 102, 241, 0.15); }\n.form-section.section--basic[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25); }\n\n.section--contact[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] { color: #047857; border-bottom-color: rgba(16, 185, 129, 0.2); }\n.section--contact[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #10b981; background: rgba(16, 185, 129, 0.15); }\n.form-section.section--contact[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25); }\n\n.section--additional[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] { color: #b45309; border-bottom-color: rgba(245, 158, 11, 0.2); }\n.section--additional[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #f59e0b; background: rgba(245, 158, 11, 0.15); }\n.form-section.section--additional[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25); }\n\n.section--workspace[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] { color: #6d28d9; border-bottom-color: rgba(139, 92, 246, 0.2); }\n.section--workspace[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }\n.form-section.section--workspace[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25); }\n\n\n\n\n\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  &.full-width {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n\n    label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}\n\n.form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #475569;\n  letter-spacing: 0.01em;\n  white-space: nowrap;\n  min-width: 110px;\n  flex-shrink: 0;\n  text-align: right;\n  transition: color 0.2s ease;\n}\n\n.form-field[_ngcontent-%COMP%]:hover    > label[_ngcontent-%COMP%] {\n  color: #334155;\n}\n\n.form-field[_ngcontent-%COMP%]:focus-within    > label[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n\n.form-field[_ngcontent-%COMP%]    > p-inputgroup[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]    > p-select[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]    > textarea[_ngcontent-%COMP%], \n.form-field[_ngcontent-%COMP%]    > p-inputNumber[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 700;\n}\n\n.field-error[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  margin: 0.25rem 0 0;\n}\n\n\n\n\n\n\n[_nghost-%COMP%]     {\n  .p-inputtext {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    border-radius: 10px;\n    padding: 0.625rem 0.875rem;\n    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.8);\n      border-color: rgba(var(--apple-gray-2), 0.5);\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      box-shadow:\n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 2px 8px rgba(var(--apple-blue), 0.1);\n      outline: none;\n    }\n  }\n\n  .p-textarea {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    border-radius: 10px;\n    padding: 0.625rem 0.875rem;\n    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    resize: vertical;\n\n    &::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      box-shadow:\n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 2px 8px rgba(var(--apple-blue), 0.1);\n      outline: none;\n    }\n  }\n\n  .p-inputnumber-input {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n  }\n\n  p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n    background: rgba(255, 255, 255, 0.95);\n    border-color: rgba(var(--apple-blue), 0.5);\n    transform: scale(1.03);\n  }\n\n  .p-select {\n    border-radius: 10px;\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    background: rgba(255, 255, 255, 0.6);\n    transition: all 0.25s ease;\n\n    &:hover {\n      border-color: rgba(var(--apple-gray-2), 0.5);\n    }\n\n    .p-select-label {\n      font-size: 0.9375rem;\n      color: #1e293b;\n      font-weight: 500;\n      padding: 0.625rem 0.875rem;\n    }\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9375rem;\n\n  i {\n    font-size: 0.875rem;\n    color: #6366f1;\n  }\n}\n\n\n\n\n\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem 0 0;\n}\n\n[_nghost-%COMP%]     {\n  .crm-button--primary {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n    border: none !important;\n    color: white !important;\n    font-weight: 600;\n    font-size: 0.9375rem;\n    padding: 0.625rem 1.5rem;\n    border-radius: 10px;\n    transition: all 0.25s ease;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover:not(:disabled) {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  }\n\n  .crm-button--ghost {\n    background: transparent !important;\n    border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n    color: #6b7280 !important;\n    font-weight: 500;\n    font-size: 0.9375rem;\n    padding: 0.625rem 1.5rem;\n    border-radius: 10px;\n    transition: all 0.25s ease;\n\n    &:hover {\n      background: rgba(0, 0, 0, 0.04) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: #374151 !important;\n    }\n  }\n}\n\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n\n  .form-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .form-field[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n\n    button {\n      width: 100%;\n    }\n  }\n\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n\n\n\n\n\n\n.photo-drop-zone[_ngcontent-%COMP%] {\n  position: relative;\n  border: 2px dashed rgba(var(--apple-gray-3), 0.5);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.4);\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  min-height: 160px;\n\n  &:hover {\n    border-color: rgba(var(--apple-blue), 0.4);\n    background: rgba(255, 255, 255, 0.6);\n  }\n\n  &.drag-active {\n    border-color: rgba(var(--apple-blue), 0.6);\n    background: rgba(var(--apple-blue), 0.06);\n    box-shadow: 0 0 0 4px rgba(var(--apple-blue), 0.1);\n    transform: scale(1.01);\n  }\n}\n\n.drop-prompt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  padding: 2.5rem 1.5rem;\n  cursor: pointer;\n  position: relative;\n\n  i {\n    font-size: 2rem;\n    color: rgba(var(--apple-blue), 0.5);\n    margin-bottom: 0.25rem;\n  }\n\n  .drop-title {\n    font-size: 0.9375rem;\n    font-weight: 600;\n    color: #374151;\n  }\n\n  .drop-hint {\n    font-size: 0.8125rem;\n    color: #9ca3af;\n  }\n}\n\n.drop-input[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.photo-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 0.75rem;\n  padding: 1rem;\n}\n\n.photo-thumb[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  aspect-ratio: 1;\n  background: rgba(0, 0, 0, 0.04);\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n    transition: transform 0.3s ease;\n  }\n\n  &:hover img {\n    transform: scale(1.05);\n  }\n\n  .photo-remove {\n    position: absolute;\n    top: 4px;\n    right: 4px;\n    width: 24px;\n    height: 24px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(239, 68, 68, 0.85);\n    color: white;\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    font-size: 0.65rem;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover .photo-remove {\n    opacity: 1;\n  }\n\n  .photo-name {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    padding: 2px 6px;\n    background: rgba(0, 0, 0, 0.55);\n    color: white;\n    font-size: 0.6875rem;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover .photo-name {\n    opacity: 1;\n  }\n}\n\n.photo-add-more[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.25rem;\n  border: 2px dashed rgba(var(--apple-gray-3), 0.5);\n  border-radius: 10px;\n  aspect-ratio: 1;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  color: #9ca3af;\n  font-size: 0.75rem;\n  font-weight: 600;\n\n  i {\n    font-size: 1.25rem;\n  }\n\n  input {\n    display: none;\n  }\n\n  &:hover {\n    border-color: rgba(var(--apple-blue), 0.4);\n    color: rgba(var(--apple-blue), 1);\n    background: rgba(var(--apple-blue), 0.04);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertyFormPage, [{
        type: Component,
        args: [{ selector: 'app-property-form-page', standalone: true, imports: [
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
                ], template: "<div class=\"property-form-page\">\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- Page Header -->\n  <header class=\"page-header\">\n    <div class=\"header-content\">\n      <button pButton type=\"button\" class=\"back-link p-button-text\" routerLink=\"/app/properties\">\n        <i class=\"pi pi-arrow-left\"></i>\n        <span>Back to properties</span>\n      </button>\n      <div class=\"header-title\">\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>\n          <span class=\"title-light\">Property</span>\n        </h1>\n        <p>{{ isEditMode() ? 'Update property listing details' : 'Add a new property listing to your portfolio' }}</p>\n      </div>\n    </div>\n  </header>\n\n  <!-- Form Section -->\n  <main class=\"form-container\">\n    <form class=\"property-form\" [formGroup]=\"formGroup\" (ngSubmit)=\"onSave()\">\n      <fieldset class=\"form-fieldset\" [disabled]=\"loading()\">\n\n        <!-- Basic Information -->\n        <section class=\"form-section section--basic\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-home\"></i>\n            Property information\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyAddress\">Address <span class=\"required\">*</span></label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                  <i class=\"pi pi-map-marker\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyAddress\" formControlName=\"address\" placeholder=\"Enter property address\" />\n              </p-inputgroup>\n              <p class=\"field-error\" *ngIf=\"formGroup.get('address')?.invalid && formGroup.get('address')?.touched\">Property address is required.</p>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyMls\">MLS Number</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                  <i class=\"pi pi-hashtag\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyMls\" formControlName=\"mlsNumber\" placeholder=\"e.g., W1234567\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyCity\">City</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                  <i class=\"pi pi-building\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyCity\" formControlName=\"city\" placeholder=\"City\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyProvince\">Province</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                  <i class=\"pi pi-map\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyProvince\" formControlName=\"province\" placeholder=\"Province / State\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyPostalCode\">Postal Code</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                  <i class=\"pi pi-inbox\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyPostalCode\" formControlName=\"postalCode\" placeholder=\"A1A 1A1\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyNeighborhood\">Neighborhood</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                  <i class=\"pi pi-compass\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyNeighborhood\" formControlName=\"neighborhood\" placeholder=\"Neighborhood\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyCountry\">Country</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                  <i class=\"pi pi-globe\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyCountry\" formControlName=\"country\" placeholder=\"Country\" />\n              </p-inputgroup>\n            </div>\n          </div>\n        </section>\n\n        <!-- Listing & Pricing -->\n        <section class=\"form-section section--contact\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-dollar\"></i>\n            Listing &amp; pricing\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyStatus\">Listing Status</label>\n              <p-select\n                id=\"propertyStatus\"\n                [options]=\"statusOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                formControlName=\"status\"\n                placeholder=\"Select status\"\n                appendTo=\"body\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyType\">Property Type</label>\n              <p-select\n                id=\"propertyType\"\n                [options]=\"typeOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                formControlName=\"propertyType\"\n                placeholder=\"Select type\"\n                appendTo=\"body\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyListPrice\">List Price</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                  <i class=\"pi pi-dollar\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyListPrice\"\n                  formControlName=\"listPrice\"\n                  mode=\"currency\"\n                  currency=\"CAD\"\n                  locale=\"en-CA\"\n                  placeholder=\"0.00\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertySalePrice\">Sale Price</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                  <i class=\"pi pi-dollar\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertySalePrice\"\n                  formControlName=\"salePrice\"\n                  mode=\"currency\"\n                  currency=\"CAD\"\n                  locale=\"en-CA\"\n                  placeholder=\"0.00\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyCurrency\">Currency</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                  <i class=\"pi pi-money-bill\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyCurrency\" formControlName=\"currency\" placeholder=\"CAD\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyListingDate\">Listing Date</label>\n              <p-datepicker\n                id=\"propertyListingDate\"\n                formControlName=\"listingDate\"\n                [showIcon]=\"true\"\n                dateFormat=\"M dd, yy\"\n                placeholder=\"Select listing date\"\n                appendTo=\"body\"\n                styleClass=\"w-full\"\n              ></p-datepicker>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertySoldDate\">Sold Date</label>\n              <p-datepicker\n                id=\"propertySoldDate\"\n                formControlName=\"soldDate\"\n                [showIcon]=\"true\"\n                dateFormat=\"M dd, yy\"\n                placeholder=\"Select sold date\"\n                appendTo=\"body\"\n                styleClass=\"w-full\"\n              ></p-datepicker>\n            </div>\n          </div>\n        </section>\n\n        <!-- Property Details -->\n        <section class=\"form-section section--additional\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-list\"></i>\n            Property details\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyBedrooms\">Bedrooms</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                  <i class=\"pi pi-moon\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyBedrooms\"\n                  formControlName=\"bedrooms\"\n                  [min]=\"0\"\n                  [max]=\"99\"\n                  placeholder=\"0\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyBathrooms\">Bathrooms</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                  <i class=\"pi pi-slack\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyBathrooms\"\n                  formControlName=\"bathrooms\"\n                  [min]=\"0\"\n                  [max]=\"99\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"1\"\n                  placeholder=\"0\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertySquareFeet\">Square Feet</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                  <i class=\"pi pi-stop\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertySquareFeet\"\n                  formControlName=\"squareFeet\"\n                  [min]=\"0\"\n                  placeholder=\"0\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyLotSize\">Lot Size (sqft)</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                  <i class=\"pi pi-expand\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyLotSize\"\n                  formControlName=\"lotSizeSqFt\"\n                  [min]=\"0\"\n                  placeholder=\"0\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyYearBuilt\">Year Built</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                  <i class=\"pi pi-calendar\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyYearBuilt\"\n                  formControlName=\"yearBuilt\"\n                  [min]=\"1800\"\n                  [max]=\"2099\"\n                  [useGrouping]=\"false\"\n                  placeholder=\"e.g., 2020\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyGarage\">Garage Spaces</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                  <i class=\"pi pi-car\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyGarage\"\n                  formControlName=\"garageSpaces\"\n                  [min]=\"0\"\n                  [max]=\"20\"\n                  placeholder=\"0\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n          </div>\n        </section>\n\n        <!-- Commission (X7) -->\n        <section class=\"form-section section--contact\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-percentage\"></i>\n            Commission\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyCommRate\">Commission Rate (%)</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                  <i class=\"pi pi-percentage\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyCommRate\"\n                  formControlName=\"commissionRate\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  suffix=\"%\"\n                  placeholder=\"0.00\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyBuyerComm\">Buyer Agent (%)</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                  <i class=\"pi pi-user\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertyBuyerComm\"\n                  formControlName=\"buyerAgentCommission\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  suffix=\"%\"\n                  placeholder=\"0.00\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertySellerComm\">Seller Agent (%)</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                  <i class=\"pi pi-users\"></i>\n                </p-inputgroup-addon>\n                <p-inputNumber\n                  id=\"propertySellerComm\"\n                  formControlName=\"sellerAgentCommission\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  suffix=\"%\"\n                  placeholder=\"0.00\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyCoAgent\">Co-Listing Agent</label>\n              <p-select\n                id=\"propertyCoAgent\"\n                [options]=\"users()\"\n                optionLabel=\"fullName\"\n                optionValue=\"id\"\n                formControlName=\"coListingAgentId\"\n                placeholder=\"Select co-listing agent\"\n                appendTo=\"body\"\n                [filter]=\"true\"\n                filterBy=\"fullName,email\"\n                [showClear]=\"true\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-user\" style=\"color:#f59e0b\"></i><span>{{ option.fullName }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-user\" style=\"color:#f59e0b\"></i><span>{{ option.fullName }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n          </div>\n        </section>\n\n        <!-- Description -->\n        <section class=\"form-section section--workspace\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-file-edit\"></i>\n            Description\n          </h2>\n\n          <div class=\"form-field full-width\">\n            <label for=\"propertyDescription\">Property Description</label>\n            <textarea\n              pTextarea\n              id=\"propertyDescription\"\n              formControlName=\"description\"\n              rows=\"5\"\n              placeholder=\"Describe the property features, finishes, upgrades...\"\n              class=\"w-full\"\n            ></textarea>\n          </div>\n\n          <div class=\"form-field full-width\">\n            <label for=\"propertyFeatures\">Features &amp; Amenities</label>\n            <textarea\n              pTextarea\n              id=\"propertyFeatures\"\n              formControlName=\"features\"\n              rows=\"3\"\n              placeholder=\"Pool, hardwood floors, smart home, heated garage...\"\n              class=\"w-full\"\n            ></textarea>\n          </div>\n        </section>\n\n        <!-- Media -->\n        <section class=\"form-section section--contact\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-images\"></i>\n            Media\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyVirtualTour\">Virtual Tour URL</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                  <i class=\"pi pi-video\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"propertyVirtualTour\" formControlName=\"virtualTourUrl\" placeholder=\"https://my.matterport.com/...\" />\n              </p-inputgroup>\n            </div>\n\n            <!-- Photo Upload Drop Zone (X5) -->\n            <div class=\"form-field full-width\">\n              <label>Property Photos</label>\n              <div\n                class=\"photo-drop-zone\"\n                [class.drag-active]=\"dragging()\"\n                (dragover)=\"onDragOver($event)\"\n                (dragleave)=\"onDragLeave($event)\"\n                (drop)=\"onDrop($event)\"\n              >\n                <div class=\"drop-prompt\" *ngIf=\"!photoFiles().length\">\n                  <i class=\"pi pi-cloud-upload\"></i>\n                  <span class=\"drop-title\">Drag &amp; drop photos here</span>\n                  <span class=\"drop-hint\">Files upload after save &bull; JPG, PNG, WebP up to 10 MB</span>\n                  <input type=\"file\" accept=\"image/jpeg,image/png,image/webp,image/gif\" multiple (change)=\"onPhotoSelect($event)\" class=\"drop-input\" />\n                </div>\n\n                <div class=\"photo-grid\" *ngIf=\"existingPhotos().length\">\n                  <div class=\"photo-thumb\" *ngFor=\"let photo of existingPhotos()\">\n                    <img [src]=\"resolveMediaUrl(photo.fileUrl)\" [alt]=\"photo.fileName\" />\n                    <button type=\"button\" class=\"photo-remove\" (click)=\"removeExistingPhoto(photo.id)\" title=\"Remove\">\n                      <i class=\"pi pi-times\"></i>\n                    </button>\n                    <span class=\"photo-name\">{{ photo.fileName }}</span>\n                  </div>\n                </div>\n\n                <div class=\"photo-grid\" *ngIf=\"photoFiles().length\">\n                  <div class=\"photo-thumb\" *ngFor=\"let photo of photoFiles(); let i = index\">\n                    <img [src]=\"photo.preview\" [alt]=\"photo.file.name\" />\n                    <button type=\"button\" class=\"photo-remove\" (click)=\"removePhoto(i)\" title=\"Remove\">\n                      <i class=\"pi pi-times\"></i>\n                    </button>\n                    <span class=\"photo-name\">{{ photo.file.name }}</span>\n                  </div>\n                  <label class=\"photo-add-more\">\n                    <i class=\"pi pi-plus\"></i>\n                    <span>Add more</span>\n                    <input type=\"file\" accept=\"image/jpeg,image/png,image/webp,image/gif\" multiple (change)=\"onPhotoSelect($event)\" />\n                  </label>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-field full-width\">\n              <label for=\"propertyPhotoUrls\">Photo URLs</label>\n              <textarea\n                pTextarea\n                id=\"propertyPhotoUrls\"\n                formControlName=\"photoUrls\"\n                rows=\"2\"\n                placeholder=\"Optional external image URLs separated by commas\"\n                class=\"w-full\"\n              ></textarea>\n            </div>\n          </div>\n        </section>\n\n        <!-- Relationships -->\n        <section class=\"form-section section--basic\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-link\"></i>\n            Relationships\n          </h2>\n\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"propertyOwner\">Owner / Agent</label>\n              <p-select\n                id=\"propertyOwner\"\n                [options]=\"users()\"\n                optionLabel=\"fullName\"\n                optionValue=\"id\"\n                formControlName=\"ownerId\"\n                placeholder=\"Select owner\"\n                appendTo=\"body\"\n                [filter]=\"true\"\n                filterBy=\"fullName,email\"\n                [showClear]=\"true\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-user\" style=\"color:#6366f1\"></i><span>{{ option.fullName }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-user\" style=\"color:#6366f1\"></i><span>{{ option.fullName }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyAccount\">Account</label>\n              <p-select\n                id=\"propertyAccount\"\n                [options]=\"customers()\"\n                optionLabel=\"name\"\n                optionValue=\"id\"\n                formControlName=\"accountId\"\n                placeholder=\"Select account\"\n                appendTo=\"body\"\n                [filter]=\"true\"\n                filterBy=\"name,company\"\n                [showClear]=\"true\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-building\" style=\"color:#3b82f6\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-building\" style=\"color:#3b82f6\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyContact\">Primary Contact</label>\n              <p-select\n                id=\"propertyContact\"\n                [options]=\"contacts()\"\n                optionLabel=\"name\"\n                optionValue=\"id\"\n                formControlName=\"primaryContactId\"\n                placeholder=\"Select contact\"\n                appendTo=\"body\"\n                [filter]=\"true\"\n                filterBy=\"name,email\"\n                [showClear]=\"true\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-id-card\" style=\"color:#22c55e\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-id-card\" style=\"color:#22c55e\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"propertyOpportunity\">Opportunity</label>\n              <p-select\n                id=\"propertyOpportunity\"\n                [options]=\"opportunities()\"\n                optionLabel=\"name\"\n                optionValue=\"id\"\n                formControlName=\"opportunityId\"\n                placeholder=\"Select opportunity\"\n                appendTo=\"body\"\n                [filter]=\"true\"\n                filterBy=\"name\"\n                [showClear]=\"true\"\n                styleClass=\"w-full\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-chart-line\" style=\"color:#a855f7\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"selectedItem\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-chart-line\" style=\"color:#a855f7\"></i><span>{{ option.name }}</span></div>\n                </ng-template>\n              </p-select>\n            </div>\n          </div>\n        </section>\n\n      </fieldset>\n\n      <footer class=\"form-actions\">\n        <button\n          type=\"button\"\n          pButton\n          label=\"Cancel\"\n          class=\"crm-button crm-button--ghost\"\n          routerLink=\"/app/properties\">\n        </button>\n        <button\n          type=\"submit\"\n          pButton\n          (mousedown)=\"prepareForSave($event)\"\n          [label]=\"photoUploading() ? 'Uploading photos\u2026' : (saving() ? 'Saving\u2026' : (isEditMode() ? 'Update property' : 'Create property'))\"\n          class=\"crm-button crm-button--primary\"\n          [disabled]=\"formGroup.invalid || saving() || loading() || photoUploading()\">\n        </button>\n      </footer>\n    </form>\n  </main>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   PROPERTY FORM PAGE - Premium Glass UI with Card Focus Effects\n   Apple + Linear/Vercel Hybrid Design\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n:host {\n  --apple-blue: 0, 122, 255;\n  --apple-purple: 175, 82, 222;\n  --apple-pink: 255, 45, 85;\n  --apple-teal: 90, 200, 250;\n  --apple-green: 52, 199, 89;\n  --apple-gray-1: 142, 142, 147;\n  --apple-gray-2: 174, 174, 178;\n  --apple-gray-3: 199, 199, 204;\n  --apple-gray-4: 209, 209, 214;\n  --apple-gray-5: 229, 229, 234;\n  --apple-gray-6: 242, 242, 247;\n  --apple-label: 0, 0, 0;\n  --apple-secondary: 60, 60, 67;\n  --apple-tertiary: 60, 60, 67;\n  --apple-fill: 120, 120, 128;\n\n  --gradient-start: rgba(var(--apple-blue), 0.6);\n  --gradient-mid: rgba(var(--apple-purple), 0.4);\n  --gradient-end: rgba(var(--apple-teal), 0.5);\n}\n\n.property-form-page {\n  min-height: 100vh;\n  position: relative;\n  background:\n    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n    radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n    radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n    linear-gradient(180deg,\n      rgba(var(--apple-gray-6), 0.95) 0%,\n      rgba(255, 255, 255, 1) 40%,\n      rgba(var(--apple-gray-6), 0.3) 100%);\n  padding-bottom: 5rem;\n}\n\n.property-form-page::before {\n  content: '';\n  position: fixed;\n  top: -15%;\n  left: -5%;\n  width: 50%;\n  height: 50%;\n  background: radial-gradient(circle, rgba(var(--apple-blue), 0.08) 0%, rgba(var(--apple-blue), 0.03) 30%, transparent 60%);\n  pointer-events: none;\n  z-index: 0;\n  animation: float-orb-1 18s ease-in-out infinite;\n}\n\n.property-form-page::after {\n  content: '';\n  position: fixed;\n  bottom: -20%;\n  right: -10%;\n  width: 60%;\n  height: 60%;\n  background: radial-gradient(circle, rgba(var(--apple-purple), 0.07) 0%, rgba(var(--apple-teal), 0.03) 35%, transparent 60%);\n  pointer-events: none;\n  z-index: 0;\n  animation: float-orb-2 22s ease-in-out infinite;\n}\n\n@keyframes float-orb-1 {\n  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n  25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n  50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n  75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n}\n\n@keyframes float-orb-2 {\n  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n  33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n  66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   HEADER - Premium Frosted Bar\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.page-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: rgba(255, 255, 255, 0.65);\n  backdrop-filter: blur(40px) saturate(200%);\n  -webkit-backdrop-filter: blur(40px) saturate(200%);\n  border-bottom: 1px solid transparent;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n    linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n  background-origin: border-box;\n  background-clip: padding-box, border-box;\n  padding: 1rem 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n}\n\n.header-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n  margin-left: -0.375rem;\n  border: none;\n  background: transparent;\n  color: rgba(var(--apple-blue), 1);\n  font-size: 0.9375rem;\n  font-weight: 500;\n  letter-spacing: -0.01em;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n}\n\n.back-link:hover {\n  background: rgba(var(--apple-blue), 0.1);\n  transform: translateX(-2px);\n}\n\n.back-link:active {\n  background: rgba(var(--apple-blue), 0.15);\n  transform: scale(0.97);\n}\n\n.back-link i {\n  font-size: 1rem;\n  transition: transform 0.2s ease;\n}\n\n.back-link:hover i {\n  transform: translateX(-3px);\n}\n\n.header-title h1 {\n  margin: 0 0 0.25rem;\n}\n\n.hero-title {\n  font-size: 2rem;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n}\n\n.title-gradient {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: gradient-shift 4s ease-in-out infinite;\n}\n\n.title-light {\n  -webkit-text-fill-color: #374151;\n  margin-left: 0.5rem;\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n.header-title p {\n  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n  color: #6b7280;\n  font-size: 1rem;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   FORM LAYOUT\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.form-container {\n  position: relative;\n  z-index: 1;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 1.5rem;\n}\n\n.property-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.form-fieldset {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  border: none;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   FORM SECTIONS - Premium Glass Cards with Hover Focus\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.form-section {\n  position: relative;\n  background: rgba(255, 255, 255, 0.55);\n  backdrop-filter: blur(40px) saturate(180%);\n  -webkit-backdrop-filter: blur(40px) saturate(180%);\n  border-radius: 20px;\n  padding: 1.75rem;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n    0 1px 2px rgba(0, 0, 0, 0.02),\n    0 4px 12px rgba(0, 0, 0, 0.03),\n    0 16px 32px rgba(0, 0, 0, 0.04);\n  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.form-section::before {\n  content: '';\n  position: absolute;\n  inset: -1px;\n  border-radius: 21px;\n  padding: 1px;\n  background: linear-gradient(135deg, transparent 0%, transparent 100%);\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n  pointer-events: none;\n  opacity: 0;\n  transition: all 0.4s ease;\n}\n\n.form-section::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 120%;\n  height: 120%;\n  transform: translate(-50%, -50%);\n  background: radial-gradient(ellipse at center, rgba(var(--apple-blue), 0) 0%, transparent 70%);\n  pointer-events: none;\n  z-index: -1;\n  opacity: 0;\n  transition: all 0.4s ease;\n}\n\n.form-section:hover {\n  background: rgba(255, 255, 255, 0.72);\n  border-color: transparent;\n  transform: translateY(-3px) scale(1.005);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n    0 4px 8px rgba(0, 0, 0, 0.03),\n    0 8px 24px rgba(0, 0, 0, 0.06),\n    0 24px 48px rgba(var(--apple-blue), 0.08),\n    0 0 60px rgba(var(--apple-blue), 0.06);\n}\n\n.form-section:hover::before {\n  opacity: 1;\n  background: linear-gradient(135deg,\n    rgba(var(--apple-blue), 0.4) 0%,\n    rgba(var(--apple-purple), 0.3) 50%,\n    rgba(var(--apple-teal), 0.4) 100%);\n}\n\n.form-section:hover::after {\n  opacity: 1;\n  background: radial-gradient(ellipse at center, rgba(var(--apple-blue), 0.04) 0%, transparent 70%);\n}\n\n.form-section:focus-within {\n  background: rgba(255, 255, 255, 0.78);\n  border-color: transparent;\n  transform: translateY(-2px);\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.95) inset,\n    0 4px 8px rgba(0, 0, 0, 0.03),\n    0 12px 32px rgba(var(--apple-blue), 0.1),\n    0 0 80px rgba(var(--apple-blue), 0.08);\n}\n\n.form-section:focus-within::before {\n  opacity: 1;\n  background: linear-gradient(135deg,\n    rgba(var(--apple-blue), 0.5) 0%,\n    rgba(var(--apple-purple), 0.35) 50%,\n    rgba(var(--apple-teal), 0.5) 100%);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   SECTION TITLES\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;\n  font-size: 1.0625rem;\n  font-weight: 650;\n  color: #0e7490;\n  margin: 0 0 1.25rem;\n  padding-bottom: 0.875rem;\n  border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n  transition: all 0.3s ease;\n}\n\n.section-title i {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  font-size: 0.9375rem;\n  color: #06b6d4;\n  background: rgba(6, 182, 212, 0.15);\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.form-section:hover .section-title i {\n  transform: scale(1.12);\n  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n}\n\n/* Per-section color identity */\n.section--basic .section-title { color: #4338ca; border-bottom-color: rgba(99, 102, 241, 0.2); }\n.section--basic .section-title i { color: #6366f1; background: rgba(99, 102, 241, 0.15); }\n.form-section.section--basic:hover .section-title i { box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25); }\n\n.section--contact .section-title { color: #047857; border-bottom-color: rgba(16, 185, 129, 0.2); }\n.section--contact .section-title i { color: #10b981; background: rgba(16, 185, 129, 0.15); }\n.form-section.section--contact:hover .section-title i { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25); }\n\n.section--additional .section-title { color: #b45309; border-bottom-color: rgba(245, 158, 11, 0.2); }\n.section--additional .section-title i { color: #f59e0b; background: rgba(245, 158, 11, 0.15); }\n.form-section.section--additional:hover .section-title i { box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25); }\n\n.section--workspace .section-title { color: #6d28d9; border-bottom-color: rgba(139, 92, 246, 0.2); }\n.section--workspace .section-title i { color: #8b5cf6; background: rgba(139, 92, 246, 0.15); }\n.form-section.section--workspace:hover .section-title i { box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   FORM GRID & FIELDS\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  &.full-width {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n\n    label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}\n\n.form-field > label {\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #475569;\n  letter-spacing: 0.01em;\n  white-space: nowrap;\n  min-width: 110px;\n  flex-shrink: 0;\n  text-align: right;\n  transition: color 0.2s ease;\n}\n\n.form-field:hover > label {\n  color: #334155;\n}\n\n.form-field:focus-within > label {\n  color: #4f46e5;\n}\n\n.form-field > p-inputgroup,\n.form-field > p-select,\n.form-field > textarea,\n.form-field > p-inputNumber {\n  flex: 1;\n  min-width: 0;\n}\n\n.required {\n  color: #ef4444;\n  font-weight: 700;\n}\n\n.field-error {\n  color: #ef4444;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  margin: 0.25rem 0 0;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   INPUT STYLING\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n:host ::ng-deep {\n  .p-inputtext {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    border-radius: 10px;\n    padding: 0.625rem 0.875rem;\n    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.8);\n      border-color: rgba(var(--apple-gray-2), 0.5);\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      box-shadow:\n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 2px 8px rgba(var(--apple-blue), 0.1);\n      outline: none;\n    }\n  }\n\n  .p-textarea {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    border-radius: 10px;\n    padding: 0.625rem 0.875rem;\n    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    resize: vertical;\n\n    &::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      box-shadow:\n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 2px 8px rgba(var(--apple-blue), 0.1);\n      outline: none;\n    }\n  }\n\n  .p-inputnumber-input {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.9375rem;\n    color: #1e293b !important;\n    font-weight: 500 !important;\n  }\n\n  p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n    background: rgba(255, 255, 255, 0.95);\n    border-color: rgba(var(--apple-blue), 0.5);\n    transform: scale(1.03);\n  }\n\n  .p-select {\n    border-radius: 10px;\n    border: 1px solid rgba(var(--apple-gray-3), 0.4);\n    background: rgba(255, 255, 255, 0.6);\n    transition: all 0.25s ease;\n\n    &:hover {\n      border-color: rgba(var(--apple-gray-2), 0.5);\n    }\n\n    .p-select-label {\n      font-size: 0.9375rem;\n      color: #1e293b;\n      font-weight: 500;\n      padding: 0.625rem 0.875rem;\n    }\n  }\n}\n\n.select-option {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9375rem;\n\n  i {\n    font-size: 0.875rem;\n    color: #6366f1;\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   FORM ACTIONS\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem 0 0;\n}\n\n:host ::ng-deep {\n  .crm-button--primary {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n    border: none !important;\n    color: white !important;\n    font-weight: 600;\n    font-size: 0.9375rem;\n    padding: 0.625rem 1.5rem;\n    border-radius: 10px;\n    transition: all 0.25s ease;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover:not(:disabled) {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  }\n\n  .crm-button--ghost {\n    background: transparent !important;\n    border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n    color: #6b7280 !important;\n    font-weight: 500;\n    font-size: 0.9375rem;\n    padding: 0.625rem 1.5rem;\n    border-radius: 10px;\n    transition: all 0.25s ease;\n\n    &:hover {\n      background: rgba(0, 0, 0, 0.04) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: #374151 !important;\n    }\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   RESPONSIVE\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@media (max-width: 768px) {\n  .page-header {\n    padding: 0.75rem 1rem;\n  }\n\n  .form-container {\n    padding: 1rem;\n  }\n\n  .form-section {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .form-field {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n\n  .form-actions {\n    flex-direction: column-reverse;\n\n    button {\n      width: 100%;\n    }\n  }\n\n  .hero-title {\n    font-size: 1.5rem;\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   PHOTO DRAG & DROP (X5)\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.photo-drop-zone {\n  position: relative;\n  border: 2px dashed rgba(var(--apple-gray-3), 0.5);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.4);\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  min-height: 160px;\n\n  &:hover {\n    border-color: rgba(var(--apple-blue), 0.4);\n    background: rgba(255, 255, 255, 0.6);\n  }\n\n  &.drag-active {\n    border-color: rgba(var(--apple-blue), 0.6);\n    background: rgba(var(--apple-blue), 0.06);\n    box-shadow: 0 0 0 4px rgba(var(--apple-blue), 0.1);\n    transform: scale(1.01);\n  }\n}\n\n.drop-prompt {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  padding: 2.5rem 1.5rem;\n  cursor: pointer;\n  position: relative;\n\n  i {\n    font-size: 2rem;\n    color: rgba(var(--apple-blue), 0.5);\n    margin-bottom: 0.25rem;\n  }\n\n  .drop-title {\n    font-size: 0.9375rem;\n    font-weight: 600;\n    color: #374151;\n  }\n\n  .drop-hint {\n    font-size: 0.8125rem;\n    color: #9ca3af;\n  }\n}\n\n.drop-input {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.photo-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 0.75rem;\n  padding: 1rem;\n}\n\n.photo-thumb {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  aspect-ratio: 1;\n  background: rgba(0, 0, 0, 0.04);\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n    transition: transform 0.3s ease;\n  }\n\n  &:hover img {\n    transform: scale(1.05);\n  }\n\n  .photo-remove {\n    position: absolute;\n    top: 4px;\n    right: 4px;\n    width: 24px;\n    height: 24px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(239, 68, 68, 0.85);\n    color: white;\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    font-size: 0.65rem;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover .photo-remove {\n    opacity: 1;\n  }\n\n  .photo-name {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    padding: 2px 6px;\n    background: rgba(0, 0, 0, 0.55);\n    color: white;\n    font-size: 0.6875rem;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    opacity: 0;\n    transition: opacity 0.2s ease;\n  }\n\n  &:hover .photo-name {\n    opacity: 1;\n  }\n}\n\n.photo-add-more {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.25rem;\n  border: 2px dashed rgba(var(--apple-gray-3), 0.5);\n  border-radius: 10px;\n  aspect-ratio: 1;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  color: #9ca3af;\n  font-size: 0.75rem;\n  font-weight: 600;\n\n  i {\n    font-size: 1.25rem;\n  }\n\n  input {\n    display: none;\n  }\n\n  &:hover {\n    border-color: rgba(var(--apple-blue), 0.4);\n    color: rgba(var(--apple-blue), 1);\n    background: rgba(var(--apple-blue), 0.04);\n  }\n}\n"] }]
    }], () => [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.PropertyDataService }, { type: i3.UserAdminDataService }, { type: i4.CustomerDataService }, { type: i5.ContactDataService }, { type: i6.OpportunityDataService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertyFormPage, { className: "PropertyFormPage", filePath: "src/app/crm/features/properties/pages/property-form.page.ts", lineNumber: 61 }); })();
