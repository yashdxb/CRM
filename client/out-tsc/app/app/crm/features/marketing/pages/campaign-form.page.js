import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/textarea";
import * as i7 from "primeng/inputnumber";
import * as i8 from "primeng/datepicker";
import * as i9 from "primeng/select";
import * as i10 from "primeng/inputgroup";
import * as i11 from "primeng/inputgroupaddon";
function CampaignFormPage_section_53_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
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
function CampaignFormPage_section_53_ng_template_22_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
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
function CampaignFormPage_section_53_ng_template_22_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select type");
    i0.ɵɵelementEnd();
} }
function CampaignFormPage_section_53_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CampaignFormPage_section_53_ng_template_22_div_0_Template, 4, 2, "div", 70)(1, CampaignFormPage_section_53_ng_template_22_span_1_Template, 2, 0, "span", 71);
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r4);
} }
function CampaignFormPage_section_53_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r5.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function CampaignFormPage_section_53_ng_template_28_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r6.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.label);
} }
function CampaignFormPage_section_53_ng_template_28_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select channel");
    i0.ɵɵelementEnd();
} }
function CampaignFormPage_section_53_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CampaignFormPage_section_53_ng_template_28_div_0_Template, 4, 2, "div", 70)(1, CampaignFormPage_section_53_ng_template_28_span_1_Template, 2, 0, "span", 71);
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r6);
} }
function CampaignFormPage_section_53_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r7.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r7.label);
} }
function CampaignFormPage_section_53_ng_template_34_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r8.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r8.label);
} }
function CampaignFormPage_section_53_ng_template_34_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select status");
    i0.ɵɵelementEnd();
} }
function CampaignFormPage_section_53_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CampaignFormPage_section_53_ng_template_34_div_0_Template, 4, 2, "div", 70)(1, CampaignFormPage_section_53_ng_template_34_span_1_Template, 2, 0, "span", 71);
} if (rf & 2) {
    const option_r8 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r8);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r8);
} }
function CampaignFormPage_section_53_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r9.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r9.label);
} }
function CampaignFormPage_section_53_ng_template_40_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 69);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r10.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r10.label);
} }
function CampaignFormPage_section_53_ng_template_40_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select owner");
    i0.ɵɵelementEnd();
} }
function CampaignFormPage_section_53_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CampaignFormPage_section_53_ng_template_40_div_0_Template, 4, 2, "div", 70)(1, CampaignFormPage_section_53_ng_template_40_span_1_Template, 2, 0, "span", 71);
} if (rf & 2) {
    const option_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r10);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r10);
} }
function CampaignFormPage_section_53_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 33)(1, "form", 34);
    i0.ɵɵlistener("ngSubmit", function CampaignFormPage_section_53_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵelementStart(2, "div", 35)(3, "div", 36)(4, "h2", 37);
    i0.ɵɵelement(5, "i", 38);
    i0.ɵɵtext(6, " Campaign Basics");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8, "Core details for reporting, routing, and ownership.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 40)(10, "label")(11, "span");
    i0.ɵɵtext(12, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p-inputgroup")(14, "p-inputgroup-addon", 41);
    i0.ɵɵelement(15, "i", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "label")(18, "span");
    i0.ɵɵtext(19, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p-select", 44);
    i0.ɵɵtemplate(21, CampaignFormPage_section_53_ng_template_21_Template, 4, 2, "ng-template", 45)(22, CampaignFormPage_section_53_ng_template_22_Template, 2, 2, "ng-template", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "label")(24, "span");
    i0.ɵɵtext(25, "Channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p-select", 47);
    i0.ɵɵtemplate(27, CampaignFormPage_section_53_ng_template_27_Template, 4, 2, "ng-template", 45)(28, CampaignFormPage_section_53_ng_template_28_Template, 2, 2, "ng-template", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "label")(30, "span");
    i0.ɵɵtext(31, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p-select", 48);
    i0.ɵɵtemplate(33, CampaignFormPage_section_53_ng_template_33_Template, 4, 2, "ng-template", 45)(34, CampaignFormPage_section_53_ng_template_34_Template, 2, 2, "ng-template", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "label")(36, "span");
    i0.ɵɵtext(37, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p-select", 49);
    i0.ɵɵtemplate(39, CampaignFormPage_section_53_ng_template_39_Template, 4, 2, "ng-template", 45)(40, CampaignFormPage_section_53_ng_template_40_Template, 2, 2, "ng-template", 46);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(41, "div", 35)(42, "div", 36)(43, "h2", 37);
    i0.ɵɵelement(44, "i", 50);
    i0.ɵɵtext(45, " Schedule and Budget");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 39);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 40)(49, "label")(50, "span");
    i0.ɵɵtext(51, "Start Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "p-inputgroup")(53, "p-inputgroup-addon", 51);
    i0.ɵɵelement(54, "i", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(55, "p-datepicker", 53);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(56, "label")(57, "span");
    i0.ɵɵtext(58, "End Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "p-inputgroup")(60, "p-inputgroup-addon", 51);
    i0.ɵɵelement(61, "i", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(62, "p-datepicker", 55);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "label")(64, "span");
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "p-inputgroup")(67, "p-inputgroup-addon", 56);
    i0.ɵɵelement(68, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(69, "p-inputnumber", 57);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "label")(71, "span");
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "p-inputgroup")(74, "p-inputgroup-addon", 58);
    i0.ɵɵelement(75, "i", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(76, "p-inputnumber", 60);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(77, "div", 35)(78, "div", 36)(79, "h2", 37);
    i0.ɵɵelement(80, "i", 61);
    i0.ɵɵtext(81, " Objective");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "p", 39);
    i0.ɵɵtext(83, "Capture intent and expected business outcome.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(84, "label")(85, "span");
    i0.ɵɵtext(86, "Objective");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "p-inputgroup")(88, "p-inputgroup-addon", 62);
    i0.ɵɵelement(89, "i", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(90, "textarea", 64);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(91, "div", 65)(92, "button", 66);
    i0.ɵɵlistener("click", function CampaignFormPage_section_53_Template_button_click_92_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(93, "button", 67);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("options", ctx_r1.typeOptions);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.channelOptions);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.statusOptions);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.ownerOptions());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("Set timing and spend targets using ", ctx_r1.resolveCurrencyCode(), ".");
    i0.ɵɵadvance(18);
    i0.ɵɵtextInterpolate1("Planned Budget (", ctx_r1.resolveCurrencyCode(), ")");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 0)("minFractionDigits", 0)("maxFractionDigits", 2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Actual Budget (", ctx_r1.resolveCurrencyCode(), ")");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 0)("minFractionDigits", 0)("maxFractionDigits", 2);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("label", ctx_r1.saving() ? "Saving..." : "Save Campaign")("disabled", ctx_r1.saving());
} }
function CampaignFormPage_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 73);
    i0.ɵɵtext(1, "Loading campaign...");
    i0.ɵɵelementEnd();
} }
export class CampaignFormPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    data = inject(MarketingDataService);
    users = inject(UserAdminDataService);
    toast = inject(AppToastService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    editId = signal(null, ...(ngDevMode ? [{ debugName: "editId" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    owners = signal([], ...(ngDevMode ? [{ debugName: "owners" }] : []));
    isEditMode = computed(() => !!this.editId(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    typeOptions = [
        { label: 'General', value: 'General', icon: 'pi-briefcase' },
        { label: 'Demand Gen', value: 'Demand Gen', icon: 'pi-bullseye' },
        { label: 'Event', value: 'Event', icon: 'pi-calendar' },
        { label: 'Partner', value: 'Partner', icon: 'pi-users' },
        { label: 'ABM', value: 'ABM', icon: 'pi-star' }
    ];
    channelOptions = [
        { label: 'Mixed', value: 'Mixed', icon: 'pi-send' },
        { label: 'Email', value: 'Email', icon: 'pi-envelope' },
        { label: 'Web', value: 'Web', icon: 'pi-globe' },
        { label: 'Events', value: 'Events', icon: 'pi-calendar-plus' },
        { label: 'Social', value: 'Social', icon: 'pi-share-alt' }
    ];
    statusOptions = [
        { label: 'Draft', value: 'Draft', icon: 'pi-pencil' },
        { label: 'Planned', value: 'Planned', icon: 'pi-clock' },
        { label: 'Active', value: 'Active', icon: 'pi-play-circle' },
        { label: 'Completed', value: 'Completed', icon: 'pi-check-circle' }
    ];
    ownerOptions = computed(() => this.owners().map((owner) => ({ label: owner.fullName, value: owner.id, icon: 'pi-user' })), ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    form = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(180)]],
        type: ['General', [Validators.required]],
        channel: ['Mixed', [Validators.required]],
        status: ['Draft', [Validators.required]],
        ownerUserId: ['', [Validators.required]],
        startDateUtc: [''],
        endDateUtc: [''],
        budgetPlanned: [0, [Validators.min(0)]],
        budgetActual: [0, [Validators.min(0)]],
        objective: ['', [Validators.maxLength(2000)]]
    });
    constructor() {
        this.loadCurrencyContext();
        this.editId.set(this.route.snapshot.paramMap.get('id'));
        this.loadOwners();
        if (this.editId()) {
            this.loadCampaign(this.editId());
        }
    }
    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload = this.toPayload();
        this.saving.set(true);
        const onSuccess = () => {
            this.saving.set(false);
            this.toast.show('success', this.isEditMode() ? 'Campaign updated.' : 'Campaign created.');
            this.router.navigate(['/app/marketing/campaigns']);
        };
        const onError = () => {
            this.saving.set(false);
            this.toast.show('error', 'Unable to save campaign.');
        };
        if (this.isEditMode()) {
            this.data.updateCampaign(this.editId(), payload).subscribe({ next: onSuccess, error: onError });
            return;
        }
        this.data.createCampaign(payload).subscribe({ next: onSuccess, error: onError });
    }
    cancel() {
        if (this.editId()) {
            this.router.navigate(['/app/marketing/campaigns', this.editId()]);
            return;
        }
        this.router.navigate(['/app/marketing/campaigns']);
    }
    resolveCurrencyCode() {
        return this.currencyCode() || this.currencyFallback || 'USD';
    }
    formatMoney(value) {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: this.resolveCurrencyCode(),
            maximumFractionDigits: 0
        }).format(Number(value ?? 0));
    }
    loadOwners() {
        this.users.lookupActive(undefined, 200).subscribe({
            next: (res) => {
                this.owners.set(res.map((user) => ({
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email
                })));
                if (!this.editId() && res.length > 0 && !this.form.controls.ownerUserId.value) {
                    this.form.controls.ownerUserId.setValue(res[0].id);
                }
            },
            error: () => this.toast.show('error', 'Unable to load owners.')
        });
    }
    loadCampaign(id) {
        this.loading.set(true);
        this.data.getCampaign(id).subscribe({
            next: (res) => {
                this.loading.set(false);
                this.form.patchValue({
                    name: res.campaign.name,
                    type: res.campaign.type,
                    channel: res.campaign.channel,
                    status: res.campaign.status,
                    ownerUserId: res.campaign.ownerUserId,
                    startDateUtc: this.toDateInput(res.campaign.startDateUtc),
                    endDateUtc: this.toDateInput(res.campaign.endDateUtc),
                    budgetPlanned: res.campaign.budgetPlanned,
                    budgetActual: res.campaign.budgetActual,
                    objective: res.campaign.objective ?? ''
                });
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load campaign.');
                this.router.navigate(['/app/marketing/campaigns']);
            }
        });
    }
    toPayload() {
        const value = this.form.getRawValue();
        return {
            name: value.name,
            type: value.type,
            channel: value.channel,
            status: value.status,
            ownerUserId: value.ownerUserId,
            startDateUtc: value.startDateUtc ? new Date(value.startDateUtc).toISOString() : null,
            endDateUtc: value.endDateUtc ? new Date(value.endDateUtc).toISOString() : null,
            budgetPlanned: Number(value.budgetPlanned ?? 0),
            budgetActual: Number(value.budgetActual ?? 0),
            objective: value.objective?.trim() || null
        };
    }
    toDateInput(value) {
        if (!value) {
            return '';
        }
        return new Date(value).toISOString().slice(0, 10);
    }
    loadCurrencyContext() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            if (!this.currencyCode() && this.currencyFallback) {
                this.currencyCode.set(this.currencyFallback);
            }
        });
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                const resolved = settings.currency || this.currencyFallback;
                if (resolved) {
                    this.currencyCode.set(resolved);
                }
            }
        });
    }
    static ɵfac = function CampaignFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignFormPage, selectors: [["app-campaign-form-page"]], decls: 56, vars: 7, consts: [["loadingTpl", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "campaign-form-page", "page-container"], [1, "page-content"], [1, "hero"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "metrics-dashboard", "form-metrics"], [1, "metrics-grid"], [1, "metric-card", "metric-card--status"], [1, "metric-header"], [1, "metric-icon", "primary"], [1, "pi", "pi-flag"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--channel"], [1, "metric-icon", "info"], [1, "pi", "pi-megaphone"], [1, "metric-card", "metric-card--planned"], [1, "metric-icon", "success"], [1, "pi", "pi-wallet"], [1, "metric-card", "metric-card--actual"], [1, "metric-icon", "warning"], [1, "pi", "pi-money-bill"], ["class", "crm-panel", 4, "ngIf", "ngIfElse"], [1, "crm-panel"], [1, "form-grid", 3, "ngSubmit", "formGroup"], [1, "form-section", "full-width"], [1, "section-head"], [1, "section-title"], [1, "pi", "pi-id-card"], [1, "section-note"], [1, "section-grid"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "type", "text", "formControlName", "name", 1, "crm-input"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", "placeholder", "Select type", "formControlName", "type", 3, "options"], ["pTemplate", "item"], ["pTemplate", "value"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", "placeholder", "Select channel", "formControlName", "channel", 3, "options"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", "placeholder", "Select status", "formControlName", "status", 3, "options"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", "placeholder", "Select owner", "formControlName", "ownerUserId", 3, "options"], [1, "pi", "pi-calendar-clock"], [1, "icon-addon", "icon-addon--date"], [1, "pi", "pi-calendar-plus"], ["styleClass", "crm-input", "dateFormat", "yy-mm-dd", "dataType", "string", "appendTo", "body", "formControlName", "startDateUtc"], [1, "pi", "pi-calendar"], ["styleClass", "crm-input", "dateFormat", "yy-mm-dd", "dataType", "string", "appendTo", "body", "formControlName", "endDateUtc"], [1, "icon-addon", "icon-addon--budget"], ["styleClass", "crm-input", "mode", "decimal", "formControlName", "budgetPlanned", 3, "min", "minFractionDigits", "maxFractionDigits"], [1, "icon-addon", "icon-addon--actual"], [1, "pi", "pi-chart-line"], ["styleClass", "crm-input", "mode", "decimal", "formControlName", "budgetActual", 3, "min", "minFractionDigits", "maxFractionDigits"], [1, "pi", "pi-bullseye"], [1, "icon-addon", "icon-addon--objective"], [1, "pi", "pi-file-edit"], ["pTextarea", "", "rows", "4", "formControlName", "objective", 1, "crm-input"], [1, "actions", "full-width"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "submit", 1, "crm-button", "crm-button--primary", 3, "label", "disabled"], [1, "select-option"], [1, "pi", 3, "ngClass"], ["class", "select-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], [1, "crm-panel", "loading"]], template: function CampaignFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 6)(6, "div", 7);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "section", 8)(9, "span", 9);
            i0.ɵɵelement(10, "span", 10);
            i0.ɵɵtext(11, " Campaign Management ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h1", 11)(13, "span", 12);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 13);
            i0.ɵɵtext(16, "Campaign");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18, "Define campaign setup, ownership, timeline, and budget baseline.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "section", 15)(20, "div", 16)(21, "article", 17)(22, "div", 18)(23, "div", 19);
            i0.ɵɵelement(24, "i", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "span", 21);
            i0.ɵɵtext(26, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "strong", 22);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "article", 23)(30, "div", 18)(31, "div", 24);
            i0.ɵɵelement(32, "i", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "span", 21);
            i0.ɵɵtext(34, "Channel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "strong", 22);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "article", 26)(38, "div", 18)(39, "div", 27);
            i0.ɵɵelement(40, "i", 28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "span", 21);
            i0.ɵɵtext(42, "Planned");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "strong", 22);
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "article", 29)(46, "div", 18)(47, "div", 30);
            i0.ɵɵelement(48, "i", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "span", 21);
            i0.ɵɵtext(50, "Actual");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "strong", 22);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(53, CampaignFormPage_section_53_Template, 94, 16, "section", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(54, CampaignFormPage_ng_template_54_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const loadingTpl_r11 = i0.ɵɵreference(55);
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "New");
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.form.controls.status.value);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.form.controls.channel.value);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.form.controls.budgetPlanned.value));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.form.controls.budgetActual.value));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingTpl_r11);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, TextareaModule, i6.Textarea, InputNumberModule, i7.InputNumber, DatePickerModule, i8.DatePicker, SelectModule, i9.Select, InputGroupModule, i10.InputGroup, InputGroupAddonModule, i11.InputGroupAddon, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.campaign-form-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1.1rem;\n  }\n\n  .hero {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.28rem 0.7rem;\n    width: fit-content;\n    border-radius: 999px;\n    border: 1px solid rgba(255, 255, 255, 0.45);\n    background: rgba(255, 255, 255, 0.72);\n    color: #4f46e5;\n    font-size: 0.75rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);\n  }\n\n  .badge-dot {\n    width: 0.45rem;\n    height: 0.45rem;\n    border-radius: 999px;\n    background: #22c55e;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.16);\n  }\n\n  .hero-title {\n    margin: 0;\n\n    .title-gradient {\n      background: $primary-gradient;\n      background-size: 200% auto;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n    }\n\n    .title-light {\n      color: #334155;\n      margin-left: 0.45rem;\n    }\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n    margin: 0;\n  }\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(170px, 1fr));\n  gap: 0.9rem;\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  padding: 0.95rem 1rem;\n  transition: transform 200ms ease, box-shadow 200ms ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);\n  }\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: clamp(1.05rem, 1.35vw, 1.35rem);\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-card--status[_ngcontent-%COMP%]::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-card--channel[_ngcontent-%COMP%]::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-card--planned[_ngcontent-%COMP%]::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #059669 0%, #22c55e 100%);\n}\n\n.form-metrics[_ngcontent-%COMP%]   .metric-card--actual[_ngcontent-%COMP%]::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.7) 100%);\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  padding: 1.05rem;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.07);\n}\n\n.form-section[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.65) 100%);\n  padding: 0.95rem;\n  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(99, 102, 241, 0.28);\n    box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);\n  }\n\n  &:focus-within {\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12), 0 14px 30px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.section-head[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: 0;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #06b6d4;\n    background: rgba(6, 182, 212, 0.14);\n    width: 1.45rem;\n    height: 1.45rem;\n    border-radius: 0.45rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.82rem;\n  }\n}\n\n.section-note[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: #64748b;\n  font-size: 0.82rem;\n}\n\n.section-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\nlabel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n}\n\nlabel[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #475569;\n  font-size: 0.83rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.crm-input[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.85rem;\n  }\n}\n\n.select-placeholder[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n\n.icon-addon[_ngcontent-%COMP%] {\n  min-width: 2.2rem;\n  justify-content: center;\n  color: #334155;\n\n  &.icon-addon--name {\n    color: #4f46e5;\n    background: rgba(99, 102, 241, 0.12);\n  }\n\n  &.icon-addon--date {\n    color: #0284c7;\n    background: rgba(14, 165, 233, 0.12);\n  }\n\n  &.icon-addon--budget {\n    color: #059669;\n    background: rgba(16, 185, 129, 0.12);\n  }\n\n  &.icon-addon--actual {\n    color: #ea580c;\n    background: rgba(249, 115, 22, 0.12);\n  }\n\n  &.icon-addon--objective {\n    color: #7c3aed;\n    background: rgba(124, 58, 237, 0.12);\n  }\n}\n\n[_nghost-%COMP%]     .crm-input .p-inputnumber-input, \n[_nghost-%COMP%]     .crm-input .p-datepicker-input {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .p-inputgroup > .p-component, \n[_nghost-%COMP%]     .p-inputgroup > .p-inputwrapper, \n[_nghost-%COMP%]     .p-inputgroup > .p-inputwrapper > .p-component {\n  border-radius: 0;\n}\n\n[_nghost-%COMP%]     .p-inputgroup > .p-inputgroup-addon {\n  border-color: rgba(148, 163, 184, 0.28);\n}\n\n[_nghost-%COMP%]     .p-inputtext, \n[_nghost-%COMP%]     .p-select, \n[_nghost-%COMP%]     .p-inputnumber-input, \n[_nghost-%COMP%]     .p-datepicker-input, \n[_nghost-%COMP%]     textarea.p-textarea {\n  color: #1e293b;\n  font-weight: 500;\n  border-color: rgba(148, 163, 184, 0.28);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n[_nghost-%COMP%]     .p-inputtext:enabled:hover, \n[_nghost-%COMP%]     .p-select:not(.p-disabled):hover, \n[_nghost-%COMP%]     .p-inputnumber:not(.p-disabled):hover .p-inputnumber-input, \n[_nghost-%COMP%]     .p-datepicker:not(.p-disabled):hover .p-datepicker-input, \n[_nghost-%COMP%]     textarea.p-textarea:enabled:hover {\n  border-color: rgba(99, 102, 241, 0.35);\n}\n\n[_nghost-%COMP%]     .p-inputtext:enabled:focus, \n[_nghost-%COMP%]     .p-select.p-focus, \n[_nghost-%COMP%]     .p-inputnumber-input:enabled:focus, \n[_nghost-%COMP%]     .p-datepicker-input:enabled:focus, \n[_nghost-%COMP%]     textarea.p-textarea:enabled:focus {\n  border-color: rgba(59, 130, 246, 0.45);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n\n.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 0.45rem;\n}\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--crm-text-muted, #6b7280);\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@media (max-width: 900px) {\n  .form-metrics[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(160px, 1fr));\n  }\n\n  .section-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .form-metrics[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignFormPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-form-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    InputNumberModule,
                    DatePickerModule,
                    SelectModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"campaign-form-page page-container\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero\">\n      <span class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        Campaign Management\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'New' }}</span>\n        <span class=\"title-light\">Campaign</span>\n      </h1>\n      <p class=\"hero-subtitle\">Define campaign setup, ownership, timeline, and budget baseline.</p>\n    </section>\n\n    <section class=\"metrics-dashboard form-metrics\">\n      <div class=\"metrics-grid\">\n        <article class=\"metric-card metric-card--status\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-flag\"></i></div>\n          </div>\n          <span class=\"metric-label\">Status</span>\n          <strong class=\"metric-value\">{{ form.controls.status.value }}</strong>\n        </article>\n\n        <article class=\"metric-card metric-card--channel\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-megaphone\"></i></div>\n          </div>\n          <span class=\"metric-label\">Channel</span>\n          <strong class=\"metric-value\">{{ form.controls.channel.value }}</strong>\n        </article>\n\n        <article class=\"metric-card metric-card--planned\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon success\"><i class=\"pi pi-wallet\"></i></div>\n          </div>\n          <span class=\"metric-label\">Planned</span>\n          <strong class=\"metric-value\">{{ formatMoney(form.controls.budgetPlanned.value) }}</strong>\n        </article>\n\n        <article class=\"metric-card metric-card--actual\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-money-bill\"></i></div>\n          </div>\n          <span class=\"metric-label\">Actual</span>\n          <strong class=\"metric-value\">{{ formatMoney(form.controls.budgetActual.value) }}</strong>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"crm-panel\" *ngIf=\"!loading(); else loadingTpl\">\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\" class=\"form-grid\">\n        <div class=\"form-section full-width\">\n          <div class=\"section-head\">\n            <h2 class=\"section-title\"><i class=\"pi pi-id-card\"></i> Campaign Basics</h2>\n            <p class=\"section-note\">Core details for reporting, routing, and ownership.</p>\n          </div>\n          <div class=\"section-grid\">\n            <label>\n              <span>Name</span>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-tag\"></i></p-inputgroup-addon>\n                <input pInputText type=\"text\" class=\"crm-input\" formControlName=\"name\" />\n              </p-inputgroup>\n            </label>\n\n            <label>\n              <span>Type</span>\n              <p-select\n                appendTo=\"body\"\n                styleClass=\"crm-input\"\n                [options]=\"typeOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                placeholder=\"Select type\"\n                formControlName=\"type\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                </ng-template>\n                <ng-template pTemplate=\"value\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                  <span *ngIf=\"!option\" class=\"select-placeholder\">Select type</span>\n                </ng-template>\n              </p-select>\n            </label>\n\n            <label>\n              <span>Channel</span>\n              <p-select\n                appendTo=\"body\"\n                styleClass=\"crm-input\"\n                [options]=\"channelOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                placeholder=\"Select channel\"\n                formControlName=\"channel\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                </ng-template>\n                <ng-template pTemplate=\"value\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                  <span *ngIf=\"!option\" class=\"select-placeholder\">Select channel</span>\n                </ng-template>\n              </p-select>\n            </label>\n\n            <label>\n              <span>Status</span>\n              <p-select\n                appendTo=\"body\"\n                styleClass=\"crm-input\"\n                [options]=\"statusOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                placeholder=\"Select status\"\n                formControlName=\"status\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                </ng-template>\n                <ng-template pTemplate=\"value\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                  <span *ngIf=\"!option\" class=\"select-placeholder\">Select status</span>\n                </ng-template>\n              </p-select>\n            </label>\n\n            <label>\n              <span>Owner</span>\n              <p-select\n                appendTo=\"body\"\n                styleClass=\"crm-input\"\n                [options]=\"ownerOptions()\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                placeholder=\"Select owner\"\n                formControlName=\"ownerUserId\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                </ng-template>\n                <ng-template pTemplate=\"value\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\">\n                    <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                    <span>{{ option.label }}</span>\n                  </div>\n                  <span *ngIf=\"!option\" class=\"select-placeholder\">Select owner</span>\n                </ng-template>\n              </p-select>\n            </label>\n          </div>\n        </div>\n\n        <div class=\"form-section full-width\">\n          <div class=\"section-head\">\n            <h2 class=\"section-title\"><i class=\"pi pi-calendar-clock\"></i> Schedule and Budget</h2>\n            <p class=\"section-note\">Set timing and spend targets using {{ resolveCurrencyCode() }}.</p>\n          </div>\n          <div class=\"section-grid\">\n            <label>\n              <span>Start Date</span>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--date\"><i class=\"pi pi-calendar-plus\"></i></p-inputgroup-addon>\n                <p-datepicker\n                  styleClass=\"crm-input\"\n                  dateFormat=\"yy-mm-dd\"\n                  dataType=\"string\"\n                  appendTo=\"body\"\n                  formControlName=\"startDateUtc\"\n                ></p-datepicker>\n              </p-inputgroup>\n            </label>\n\n            <label>\n              <span>End Date</span>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--date\"><i class=\"pi pi-calendar\"></i></p-inputgroup-addon>\n                <p-datepicker\n                  styleClass=\"crm-input\"\n                  dateFormat=\"yy-mm-dd\"\n                  dataType=\"string\"\n                  appendTo=\"body\"\n                  formControlName=\"endDateUtc\"\n                ></p-datepicker>\n              </p-inputgroup>\n            </label>\n\n            <label>\n              <span>Planned Budget ({{ resolveCurrencyCode() }})</span>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--budget\"><i class=\"pi pi-wallet\"></i></p-inputgroup-addon>\n                <p-inputnumber\n                  styleClass=\"crm-input\"\n                  mode=\"decimal\"\n                  [min]=\"0\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  formControlName=\"budgetPlanned\"\n                ></p-inputnumber>\n              </p-inputgroup>\n            </label>\n\n            <label>\n              <span>Actual Budget ({{ resolveCurrencyCode() }})</span>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--actual\"><i class=\"pi pi-chart-line\"></i></p-inputgroup-addon>\n                <p-inputnumber\n                  styleClass=\"crm-input\"\n                  mode=\"decimal\"\n                  [min]=\"0\"\n                  [minFractionDigits]=\"0\"\n                  [maxFractionDigits]=\"2\"\n                  formControlName=\"budgetActual\"\n                ></p-inputnumber>\n              </p-inputgroup>\n            </label>\n          </div>\n        </div>\n\n        <div class=\"form-section full-width\">\n          <div class=\"section-head\">\n            <h2 class=\"section-title\"><i class=\"pi pi-bullseye\"></i> Objective</h2>\n            <p class=\"section-note\">Capture intent and expected business outcome.</p>\n          </div>\n          <label>\n            <span>Objective</span>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--objective\"><i class=\"pi pi-file-edit\"></i></p-inputgroup-addon>\n              <textarea pTextarea rows=\"4\" class=\"crm-input\" formControlName=\"objective\"></textarea>\n            </p-inputgroup>\n          </label>\n        </div>\n\n        <div class=\"actions full-width\">\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"cancel()\"></button>\n          <button\n            pButton\n            type=\"submit\"\n            class=\"crm-button crm-button--primary\"\n            [label]=\"saving() ? 'Saving...' : 'Save Campaign'\"\n            [disabled]=\"saving()\"\n          ></button>\n        </div>\n      </form>\n    </section>\n  </div>\n</div>\n\n<ng-template #loadingTpl>\n  <section class=\"crm-panel loading\">Loading campaign...</section>\n</ng-template>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.campaign-form-page {\n  .page-content {\n    display: grid;\n    gap: 1.1rem;\n  }\n\n  .hero {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.28rem 0.7rem;\n    width: fit-content;\n    border-radius: 999px;\n    border: 1px solid rgba(255, 255, 255, 0.45);\n    background: rgba(255, 255, 255, 0.72);\n    color: #4f46e5;\n    font-size: 0.75rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);\n  }\n\n  .badge-dot {\n    width: 0.45rem;\n    height: 0.45rem;\n    border-radius: 999px;\n    background: #22c55e;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.16);\n  }\n\n  .hero-title {\n    margin: 0;\n\n    .title-gradient {\n      background: $primary-gradient;\n      background-size: 200% auto;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: gradient-shift 4s ease-in-out infinite;\n    }\n\n    .title-light {\n      color: #334155;\n      margin-left: 0.45rem;\n    }\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n    margin: 0;\n  }\n}\n\n.form-metrics .metrics-grid {\n  grid-template-columns: repeat(4, minmax(170px, 1fr));\n  gap: 0.9rem;\n}\n\n.form-metrics .metric-card {\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  padding: 0.95rem 1rem;\n  transition: transform 200ms ease, box-shadow 200ms ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);\n  }\n}\n\n.form-metrics .metric-value {\n  font-size: clamp(1.05rem, 1.35vw, 1.35rem);\n}\n\n.form-metrics .metric-card--status::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n}\n\n.form-metrics .metric-card--channel::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n}\n\n.form-metrics .metric-card--planned::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #059669 0%, #22c55e 100%);\n}\n\n.form-metrics .metric-card--actual::before {\n  opacity: 1;\n  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.7) 100%);\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  padding: 1.05rem;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.07);\n}\n\n.form-section {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.65) 100%);\n  padding: 0.95rem;\n  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(99, 102, 241, 0.28);\n    box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);\n  }\n\n  &:focus-within {\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12), 0 14px 30px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.section-head {\n  margin-bottom: 0.8rem;\n}\n\n.section-title {\n  margin: 0;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #06b6d4;\n    background: rgba(6, 182, 212, 0.14);\n    width: 1.45rem;\n    height: 1.45rem;\n    border-radius: 0.45rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.82rem;\n  }\n}\n\n.section-note {\n  margin: 0.2rem 0 0;\n  color: #64748b;\n  font-size: 0.82rem;\n}\n\n.section-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\nlabel {\n  display: grid;\n  gap: 0.4rem;\n}\n\nlabel > span {\n  font-weight: 600;\n  color: #475569;\n  font-size: 0.83rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.crm-input {\n  width: 100%;\n}\n\n.select-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.85rem;\n  }\n}\n\n.select-placeholder {\n  color: #94a3b8;\n}\n\n.icon-addon {\n  min-width: 2.2rem;\n  justify-content: center;\n  color: #334155;\n\n  &.icon-addon--name {\n    color: #4f46e5;\n    background: rgba(99, 102, 241, 0.12);\n  }\n\n  &.icon-addon--date {\n    color: #0284c7;\n    background: rgba(14, 165, 233, 0.12);\n  }\n\n  &.icon-addon--budget {\n    color: #059669;\n    background: rgba(16, 185, 129, 0.12);\n  }\n\n  &.icon-addon--actual {\n    color: #ea580c;\n    background: rgba(249, 115, 22, 0.12);\n  }\n\n  &.icon-addon--objective {\n    color: #7c3aed;\n    background: rgba(124, 58, 237, 0.12);\n  }\n}\n\n:host ::ng-deep .crm-input .p-inputnumber-input,\n:host ::ng-deep .crm-input .p-datepicker-input {\n  width: 100%;\n}\n\n:host ::ng-deep .p-inputgroup > .p-component,\n:host ::ng-deep .p-inputgroup > .p-inputwrapper,\n:host ::ng-deep .p-inputgroup > .p-inputwrapper > .p-component {\n  border-radius: 0;\n}\n\n:host ::ng-deep .p-inputgroup > .p-inputgroup-addon {\n  border-color: rgba(148, 163, 184, 0.28);\n}\n\n:host ::ng-deep .p-inputtext,\n:host ::ng-deep .p-select,\n:host ::ng-deep .p-inputnumber-input,\n:host ::ng-deep .p-datepicker-input,\n:host ::ng-deep textarea.p-textarea {\n  color: #1e293b;\n  font-weight: 500;\n  border-color: rgba(148, 163, 184, 0.28);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n:host ::ng-deep .p-inputtext:enabled:hover,\n:host ::ng-deep .p-select:not(.p-disabled):hover,\n:host ::ng-deep .p-inputnumber:not(.p-disabled):hover .p-inputnumber-input,\n:host ::ng-deep .p-datepicker:not(.p-disabled):hover .p-datepicker-input,\n:host ::ng-deep textarea.p-textarea:enabled:hover {\n  border-color: rgba(99, 102, 241, 0.35);\n}\n\n:host ::ng-deep .p-inputtext:enabled:focus,\n:host ::ng-deep .p-select.p-focus,\n:host ::ng-deep .p-inputnumber-input:enabled:focus,\n:host ::ng-deep .p-datepicker-input:enabled:focus,\n:host ::ng-deep textarea.p-textarea:enabled:focus {\n  border-color: rgba(59, 130, 246, 0.45);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n\n.full-width {\n  grid-column: 1 / -1;\n}\n\n.actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 0.45rem;\n}\n\n.loading {\n  text-align: center;\n  color: var(--crm-text-muted, #6b7280);\n}\n\n@keyframes gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@media (max-width: 900px) {\n  .form-metrics .metrics-grid {\n    grid-template-columns: repeat(2, minmax(160px, 1fr));\n  }\n\n  .section-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .form-metrics .metrics-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignFormPage, { className: "CampaignFormPage", filePath: "src/app/crm/features/marketing/pages/campaign-form.page.ts", lineNumber: 40 }); })();
