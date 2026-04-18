import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/api";
import * as i3 from "primeng/inputgroup";
import * as i4 from "primeng/inputgroupaddon";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/tag";
import * as i8 from "@angular/forms";
function TenantCreatePage_ng_template_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "img", 71);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r1 == null ? null : option_r1.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r1 == null ? null : option_r1.flagCode) ? option_r1.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r1.label);
} }
function TenantCreatePage_ng_template_95_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "img", 71);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r3 == null ? null : option_r3.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r3 == null ? null : option_r3.flagCode) ? option_r3.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function TenantCreatePage_ng_template_95_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1, "Select time zone");
    i0.ɵɵelementEnd();
} }
function TenantCreatePage_ng_template_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TenantCreatePage_ng_template_95_div_0_Template, 4, 3, "div", 72)(1, TenantCreatePage_ng_template_95_ng_template_1_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const tzPlaceholder_r4 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r3)("ngIfElse", tzPlaceholder_r4);
} }
function TenantCreatePage_ng_template_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74)(1, "span", 75);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.symbol || option_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function TenantCreatePage_ng_template_104_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74)(1, "span", 75);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.symbol || option_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.label);
} }
function TenantCreatePage_ng_template_104_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1, "Select currency");
    i0.ɵɵelementEnd();
} }
function TenantCreatePage_ng_template_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TenantCreatePage_ng_template_104_div_0_Template, 5, 2, "div", 76)(1, TenantCreatePage_ng_template_104_ng_template_1_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const currencyPlaceholder_r7 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r6)("ngIfElse", currencyPlaceholder_r7);
} }
export class TenantCreatePage {
    dataService = inject(TenantAdminDataService);
    formBuilder = inject(FormBuilder);
    toastService = inject(AppToastService);
    timeZoneService = inject(TimeZoneService);
    referenceData = inject(ReferenceDataService);
    router = inject(Router);
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    canManageTenants = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.tenantsManage), ...(ngDevMode ? [{ debugName: "canManageTenants" }] : []));
    tenantForm = this.formBuilder.group({
        key: ['', Validators.required],
        name: ['', Validators.required],
        adminName: ['', Validators.required],
        adminEmail: ['', [Validators.required, Validators.email]],
        adminPassword: ['', Validators.required],
        timeZone: ['UTC'],
        currency: ['']
    });
    // Shared time zone catalog keeps labels and flags consistent across settings screens.
    timeZoneOptions = [];
    getFlagUrl = getTimeZoneFlagUrl;
    currencyOptions = [];
    constructor() {
        this.timeZoneService.getTimeZones().subscribe((options) => {
            this.timeZoneOptions = options;
        });
        this.loadCurrencies();
    }
    createTenant() {
        if (!this.canManageTenants()) {
            this.raiseToast('error', 'You do not have permission to create tenants');
            return;
        }
        if (this.tenantForm.invalid) {
            this.tenantForm.markAllAsTouched();
            this.raiseToast('error', 'Complete the required fields');
            return;
        }
        const formValue = this.tenantForm.getRawValue();
        const payload = {
            key: (formValue.key ?? '').trim(),
            name: (formValue.name ?? '').trim(),
            adminName: (formValue.adminName ?? '').trim(),
            adminEmail: (formValue.adminEmail ?? '').trim(),
            adminPassword: formValue.adminPassword ?? '',
            timeZone: formValue.timeZone ?? null,
            currency: formValue.currency ?? null,
            industryPreset: 'CoreCRM',
            industryModules: []
        };
        this.saving.set(true);
        this.dataService.createTenant(payload).subscribe({
            next: (tenant) => {
                this.saving.set(false);
                this.raiseToast('success', `Tenant ${tenant.key} created`);
                this.tenantForm.reset({
                    timeZone: 'UTC',
                    currency: this.currencyOptions[0]?.value ?? ''
                });
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to create tenant');
            }
        });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadCurrencies() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyOptions = active.map((currency) => ({
                label: currency.code,
                value: currency.code,
                symbol: currency.symbol,
                name: currency.name
            }));
            if (!this.tenantForm.value.currency && this.currencyOptions.length > 0) {
                this.tenantForm.patchValue({ currency: this.currencyOptions[0].value });
            }
        });
    }
    static ɵfac = function TenantCreatePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantCreatePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TenantCreatePage, selectors: [["app-tenant-create-page"]], decls: 125, vars: 5, consts: [["tzPlaceholder", ""], ["currencyPlaceholder", ""], [1, "tenant-page", "tenant-create-page"], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-container"], [1, "hero-section"], [1, "hero-content"], [1, "hero-text"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-actions"], ["type", "button", "pButton", "", "icon", "pi pi-arrow-left", "label", "Back to tenants", "routerLink", "/app/settings/tenants", 1, "crm-button", "crm-button--ghost"], ["type", "button", "pButton", "", "icon", "pi pi-sliders-h", "label", "Workspace Settings", "routerLink", "/app/settings/workspace", 1, "crm-button", "crm-button--ghost"], [1, "content-grid", "tenant-create-grid"], [1, "main-cards"], [1, "glass-card"], [1, "card-header"], [1, "card-header-icon", "card-header-icon--primary"], [1, "pi", "pi-building"], [1, "card-title"], [1, "card-subtitle"], [1, "tenant-form", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "section-title"], [1, "pi", "pi-briefcase"], [1, "form-row"], [1, "form-field"], [1, "form-label"], [1, "addon--cyan"], [1, "pi", "pi-key"], ["pInputText", "", "formControlName", "key", "placeholder", "north-edge"], [1, "addon--purple"], ["pInputText", "", "formControlName", "name", "placeholder", "NorthEdge CRM"], [1, "pi", "pi-user"], [1, "addon--blue"], ["pInputText", "", "formControlName", "adminName", "placeholder", "Yasser Ahmed"], [1, "addon--pink"], [1, "pi", "pi-envelope"], ["pInputText", "", "formControlName", "adminEmail", "placeholder", "admin@company.com"], [1, "addon--orange"], [1, "pi", "pi-lock"], ["pInputText", "", "type", "password", "formControlName", "adminPassword", "placeholder", "Secure password"], [1, "pi", "pi-sliders-h"], [1, "addon--teal"], [1, "pi", "pi-clock"], ["appendTo", "body", "formControlName", "timeZone", "optionLabel", "label", "optionValue", "value", "placeholder", "Select time zone", 3, "options"], ["pTemplate", "item"], ["pTemplate", "value"], [1, "addon--green"], [1, "pi", "pi-wallet"], ["appendTo", "body", "formControlName", "currency", "optionLabel", "label", "optionValue", "value", "placeholder", "Select currency", 3, "options"], [1, "pi", "pi-sitemap"], [1, "industry-pack-grid"], [1, "pack-card", "pack-card--core"], [1, "pack-header"], [1, "pack-icon", "pack-icon--core"], [1, "pi", "pi-shield"], [1, "pack-meta"], ["value", "Always on", "severity", "success"], [1, "pack-body"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", "routerLink", "/app/settings/tenants", 1, "crm-button", "crm-button--ghost"], ["type", "submit", "pButton", "", "icon", "pi pi-check", "label", "Create tenant", 1, "crm-button", "crm-button--primary", 3, "loading", "disabled"], [1, "timezone-option"], ["width", "18", "height", "12", "loading", "lazy", 1, "timezone-flag", 3, "src", "alt"], ["class", "timezone-option", 4, "ngIf", "ngIfElse"], [1, "select-placeholder"], [1, "select-option"], [1, "currency-symbol"], ["class", "select-option", 4, "ngIf", "ngIfElse"]], template: function TenantCreatePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 2)(1, "div", 3);
            i0.ɵɵelement(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 7);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "div", 8)(8, "div", 9)(9, "div", 10)(10, "div", 11);
            i0.ɵɵelement(11, "span", 12);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Super Admin");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 13)(15, "span", 14);
            i0.ɵɵtext(16, "Create");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 15);
            i0.ɵɵtext(18, "Tenant");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "p", 16);
            i0.ɵɵtext(20, " Provision a new workspace with a primary admin and optional industry packs. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 17);
            i0.ɵɵelement(22, "button", 18)(23, "button", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "div", 20)(25, "div", 21)(26, "article", 22)(27, "header", 23)(28, "div", 24);
            i0.ɵɵelement(29, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "h2", 26);
            i0.ɵɵtext(32, "Tenant details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p", 27);
            i0.ɵɵtext(34, "Core workspace identity and admin user");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "form", 28);
            i0.ɵɵlistener("ngSubmit", function TenantCreatePage_Template_form_ngSubmit_35_listener() { return ctx.createTenant(); });
            i0.ɵɵelementStart(36, "div", 29)(37, "h3", 30);
            i0.ɵɵelement(38, "i", 31);
            i0.ɵɵtext(39, " Workspace info ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 32)(41, "div", 33)(42, "label", 34);
            i0.ɵɵtext(43, "Tenant key");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "p-inputgroup")(45, "p-inputgroup-addon", 35);
            i0.ɵɵelement(46, "i", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(47, "input", 37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 33)(49, "label", 34);
            i0.ɵɵtext(50, "Tenant name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "p-inputgroup")(52, "p-inputgroup-addon", 38);
            i0.ɵɵelement(53, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "input", 39);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(55, "div", 29)(56, "h3", 30);
            i0.ɵɵelement(57, "i", 40);
            i0.ɵɵtext(58, " Primary admin ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 32)(60, "div", 33)(61, "label", 34);
            i0.ɵɵtext(62, "Admin name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "p-inputgroup")(64, "p-inputgroup-addon", 41);
            i0.ɵɵelement(65, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "input", 42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 33)(68, "label", 34);
            i0.ɵɵtext(69, "Admin email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "p-inputgroup")(71, "p-inputgroup-addon", 43);
            i0.ɵɵelement(72, "i", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(73, "input", 45);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(74, "div", 32)(75, "div", 33)(76, "label", 34);
            i0.ɵɵtext(77, "Admin password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "p-inputgroup")(79, "p-inputgroup-addon", 46);
            i0.ɵɵelement(80, "i", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "input", 48);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(82, "div", 29)(83, "h3", 30);
            i0.ɵɵelement(84, "i", 49);
            i0.ɵɵtext(85, " Defaults ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "div", 32)(87, "div", 33)(88, "label", 34);
            i0.ɵɵtext(89, "Time zone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "p-inputgroup")(91, "p-inputgroup-addon", 50);
            i0.ɵɵelement(92, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "p-select", 52);
            i0.ɵɵtemplate(94, TenantCreatePage_ng_template_94_Template, 4, 3, "ng-template", 53)(95, TenantCreatePage_ng_template_95_Template, 3, 2, "ng-template", 54);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(96, "div", 33)(97, "label", 34);
            i0.ɵɵtext(98, "Currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "p-inputgroup")(100, "p-inputgroup-addon", 55);
            i0.ɵɵelement(101, "i", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "p-select", 57);
            i0.ɵɵtemplate(103, TenantCreatePage_ng_template_103_Template, 5, 2, "ng-template", 53)(104, TenantCreatePage_ng_template_104_Template, 3, 2, "ng-template", 54);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(105, "div", 29)(106, "h3", 30);
            i0.ɵɵelement(107, "i", 58);
            i0.ɵɵtext(108, " Industry packs ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "div", 59)(110, "div", 60)(111, "div", 61)(112, "div", 62);
            i0.ɵɵelement(113, "i", 63);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "div", 64)(115, "h4");
            i0.ɵɵtext(116, "Core CRM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "p");
            i0.ɵɵtext(118, "Leads, Accounts, Contacts, Opportunities, Activities.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(119, "p-tag", 65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "p", 66);
            i0.ɵɵtext(121, " Core CRM is enabled for every tenant. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(122, "div", 67);
            i0.ɵɵelement(123, "button", 68)(124, "button", 69);
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(35);
            i0.ɵɵproperty("formGroup", ctx.tenantForm);
            i0.ɵɵadvance(58);
            i0.ɵɵproperty("options", ctx.timeZoneOptions);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.currencyOptions);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("loading", ctx.saving())("disabled", ctx.tenantForm.invalid || ctx.saving() || !ctx.canManageTenants());
        } }, dependencies: [ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, InputGroupModule, i3.InputGroup, InputGroupAddonModule, i4.InputGroupAddon, InputTextModule, i5.InputText, SelectModule, i6.Select, TagModule, i7.Tag, NgIf,
            ReactiveFormsModule, i8.ɵNgNoValidate, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgControlStatusGroup, i8.FormGroupDirective, i8.FormControlName, RouterLink,
            BreadcrumbsComponent], styles: ["@use '../../../../shared/page-design-system' as *;\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n.tenant-create-page[_ngcontent-%COMP%] {\n  .tenant-create-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .main-cards {\n    max-width: 960px;\n    margin: 0 auto;\n  }\n\n  .tenant-form {\n    display: flex;\n    flex-direction: column;\n    gap: $space-6;\n  }\n\n  .form-section {\n    display: flex;\n    flex-direction: column;\n    gap: $space-4;\n    padding-bottom: $space-2;\n  }\n\n  .card-header {\n    align-items: flex-start;\n    text-align: left;\n  }\n\n  .section-title {\n    @include form.section-title;\n  }\n\n  .form-section:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n\n\n.timezone-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.timezone-flag[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.select-placeholder[_ngcontent-%COMP%] {\n  color: $text-muted;\n  font-weight: 500;\n}\n\n.p-inputgroup[_ngcontent-%COMP%] {\n  .p-inputgroup-addon {\n    border: none;\n    transition: all 0.2s ease;\n\n    i {\n      font-size: 1rem;\n    }\n  }\n\n  &:focus-within .p-inputgroup-addon {\n    transform: scale(1.05);\n  }\n}\n\n.addon--cyan[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e0f7fa, #b2ebf2) !important;\n  color: #0097a7 !important;\n}\n\n.addon--purple[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ede9fe, #ddd6fe) !important;\n  color: #7c3aed !important;\n}\n\n.addon--blue[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #dbeafe, #bfdbfe) !important;\n  color: #2563eb !important;\n}\n\n.addon--pink[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fce7f3, #fbcfe8) !important;\n  color: #db2777 !important;\n}\n\n.addon--orange[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ffedd5, #fed7aa) !important;\n  color: #ea580c !important;\n}\n\n.addon--teal[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ccfbf1, #99f6e4) !important;\n  color: #0d9488 !important;\n}\n\n.addon--green[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important;\n  color: #16a34a !important;\n}\n\n.addon--primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e0e7ff, #c7d2fe) !important;\n  color: $primary !important;\n}\n\n.icon-blue[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.icon-teal[_ngcontent-%COMP%] {\n  color: #0d9488;\n}\n\n.icon-indigo[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n\n.icon-green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.icon-amber[_ngcontent-%COMP%] {\n  color: #d97706;\n}\n\n.icon-rose[_ngcontent-%COMP%] {\n  color: #db2777;\n}\n\n.icon-purple[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n\n.industry-pack-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pack-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(99, 102, 241, 0.12);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.pack-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  justify-content: space-between;\n}\n\n.pack-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: grid;\n  place-items: center;\n  border-radius: $radius-lg;\n  font-size: 1.2rem;\n\n  &--core {\n    background: linear-gradient(135deg, #dbeafe, #bfdbfe);\n    color: #2563eb;\n  }\n\n  &--supply {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: #7c3aed;\n  }\n}\n\n.pack-meta[_ngcontent-%COMP%] {\n  flex: 1;\n\n  h4 {\n    margin: 0 0 $space-1;\n    font-size: 1rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    color: $text-muted;\n  }\n}\n\n.pack-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.pack-body[_ngcontent-%COMP%] {\n  margin: 0;\n  color: $text-secondary;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.module-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n\n  &.is-disabled {\n    opacity: 0.55;\n    pointer-events: none;\n  }\n}\n\n.module-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n  }\n\n  &.is-disabled {\n    box-shadow: none;\n  }\n}\n\n.module-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.module-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.module-desc[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: $text-muted;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantCreatePage, [{
        type: Component,
        args: [{ selector: 'app-tenant-create-page', standalone: true, imports: [
                    ButtonModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputTextModule,
                    SelectModule,
                    TagModule,
                    NgIf,
                    ReactiveFormsModule,
                    RouterLink,
                    BreadcrumbsComponent
                ], template: "<section class=\"tenant-page tenant-create-page\">\n  <div class=\"page-background\">\n    <div class=\"animated-orb orb-1\"></div>\n    <div class=\"animated-orb orb-2\"></div>\n    <div class=\"animated-orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-container\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <div class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-text\">\n          <div class=\"hero-badge\">\n            <span class=\"badge-dot\"></span>\n            <span>Super Admin</span>\n          </div>\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">Create</span>\n            <span class=\"title-light\">Tenant</span>\n          </h1>\n          <p class=\"hero-subtitle\">\n            Provision a new workspace with a primary admin and optional industry packs.\n          </p>\n        </div>\n        <div class=\"hero-actions\">\n          <button\n            type=\"button\"\n            pButton\n            class=\"crm-button crm-button--ghost\"\n            icon=\"pi pi-arrow-left\"\n            label=\"Back to tenants\"\n            routerLink=\"/app/settings/tenants\"\n          ></button>\n          <button\n            type=\"button\"\n            pButton\n            class=\"crm-button crm-button--ghost\"\n            icon=\"pi pi-sliders-h\"\n            label=\"Workspace Settings\"\n            routerLink=\"/app/settings/workspace\"\n          ></button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"content-grid tenant-create-grid\">\n      <div class=\"main-cards\">\n        <article class=\"glass-card\">\n          <header class=\"card-header\">\n            <div class=\"card-header-icon card-header-icon--primary\">\n              <i class=\"pi pi-building\"></i>\n            </div>\n            <div>\n              <h2 class=\"card-title\">Tenant details</h2>\n              <p class=\"card-subtitle\">Core workspace identity and admin user</p>\n            </div>\n          </header>\n\n          <form class=\"tenant-form\" [formGroup]=\"tenantForm\" (ngSubmit)=\"createTenant()\">\n            <div class=\"form-section\">\n              <h3 class=\"section-title\">\n                <i class=\"pi pi-briefcase\"></i>\n                Workspace info\n              </h3>\n              <div class=\"form-row\">\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Tenant key</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--cyan\">\n                      <i class=\"pi pi-key\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText formControlName=\"key\" placeholder=\"north-edge\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Tenant name</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--purple\">\n                      <i class=\"pi pi-building\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText formControlName=\"name\" placeholder=\"NorthEdge CRM\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-section\">\n              <h3 class=\"section-title\">\n                <i class=\"pi pi-user\"></i>\n                Primary admin\n              </h3>\n              <div class=\"form-row\">\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Admin name</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--blue\">\n                      <i class=\"pi pi-user\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText formControlName=\"adminName\" placeholder=\"Yasser Ahmed\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Admin email</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--pink\">\n                      <i class=\"pi pi-envelope\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText formControlName=\"adminEmail\" placeholder=\"admin@company.com\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n              <div class=\"form-row\">\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Admin password</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--orange\">\n                      <i class=\"pi pi-lock\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText type=\"password\" formControlName=\"adminPassword\" placeholder=\"Secure password\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-section\">\n              <h3 class=\"section-title\">\n                <i class=\"pi pi-sliders-h\"></i>\n                Defaults\n              </h3>\n              <div class=\"form-row\">\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Time zone</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--teal\">\n                      <i class=\"pi pi-clock\"></i>\n                    </p-inputgroup-addon>\n                    <p-select\n                      appendTo=\"body\"\n                      formControlName=\"timeZone\"\n                      [options]=\"timeZoneOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      placeholder=\"Select time zone\"\n                    >\n                      <ng-template pTemplate=\"item\" let-option>\n                        <div class=\"timezone-option\">\n                          <img\n                            class=\"timezone-flag\"\n                            [src]=\"getFlagUrl(option?.flagCode)\"\n                            [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                            width=\"18\"\n                            height=\"12\"\n                            loading=\"lazy\"\n                          />\n                          <span>{{ option.label }}</span>\n                        </div>\n                      </ng-template>\n                      <ng-template pTemplate=\"value\" let-option>\n                        <div class=\"timezone-option\" *ngIf=\"option; else tzPlaceholder\">\n                          <img\n                            class=\"timezone-flag\"\n                            [src]=\"getFlagUrl(option?.flagCode)\"\n                            [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                            width=\"18\"\n                            height=\"12\"\n                            loading=\"lazy\"\n                          />\n                          <span>{{ option.label }}</span>\n                        </div>\n                        <ng-template #tzPlaceholder>\n                          <span class=\"select-placeholder\">Select time zone</span>\n                        </ng-template>\n                      </ng-template>\n                    </p-select>\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label class=\"form-label\">Currency</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"addon--green\">\n                      <i class=\"pi pi-wallet\"></i>\n                    </p-inputgroup-addon>\n                    <p-select\n                      appendTo=\"body\"\n                      formControlName=\"currency\"\n                      [options]=\"currencyOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      placeholder=\"Select currency\"\n                    >\n                      <ng-template pTemplate=\"item\" let-option>\n                        <div class=\"select-option\">\n                          <span class=\"currency-symbol\">{{ option.symbol || option.label }}</span>\n                          <span>{{ option.label }}</span>\n                        </div>\n                      </ng-template>\n                      <ng-template pTemplate=\"value\" let-option>\n                        <div class=\"select-option\" *ngIf=\"option; else currencyPlaceholder\">\n                          <span class=\"currency-symbol\">{{ option.symbol || option.label }}</span>\n                          <span>{{ option.label }}</span>\n                        </div>\n                        <ng-template #currencyPlaceholder>\n                          <span class=\"select-placeholder\">Select currency</span>\n                        </ng-template>\n                      </ng-template>\n                    </p-select>\n                  </p-inputgroup>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-section\">\n              <h3 class=\"section-title\">\n                <i class=\"pi pi-sitemap\"></i>\n                Industry packs\n              </h3>\n              <div class=\"industry-pack-grid\">\n                <div class=\"pack-card pack-card--core\">\n                  <div class=\"pack-header\">\n                    <div class=\"pack-icon pack-icon--core\">\n                      <i class=\"pi pi-shield\"></i>\n                    </div>\n                    <div class=\"pack-meta\">\n                      <h4>Core CRM</h4>\n                      <p>Leads, Accounts, Contacts, Opportunities, Activities.</p>\n                    </div>\n                    <p-tag value=\"Always on\" severity=\"success\"></p-tag>\n                  </div>\n                  <p class=\"pack-body\">\n                    Core CRM is enabled for every tenant.\n                  </p>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-actions\">\n              <button\n                type=\"button\"\n                pButton\n                class=\"crm-button crm-button--ghost\"\n                label=\"Cancel\"\n                routerLink=\"/app/settings/tenants\"\n              ></button>\n              <button\n                type=\"submit\"\n                pButton\n                icon=\"pi pi-check\"\n                label=\"Create tenant\"\n                class=\"crm-button crm-button--primary\"\n                [loading]=\"saving()\"\n                [disabled]=\"tenantForm.invalid || saving() || !canManageTenants()\"\n              ></button>\n            </div>\n          </form>\n        </article>\n      </div>\n    </div>\n  </div>\n</section>\n", styles: ["@use '../../../../shared/page-design-system' as *;\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n.tenant-create-page {\n  .tenant-create-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .main-cards {\n    max-width: 960px;\n    margin: 0 auto;\n  }\n\n  .tenant-form {\n    display: flex;\n    flex-direction: column;\n    gap: $space-6;\n  }\n\n  .form-section {\n    display: flex;\n    flex-direction: column;\n    gap: $space-4;\n    padding-bottom: $space-2;\n  }\n\n  .card-header {\n    align-items: flex-start;\n    text-align: left;\n  }\n\n  .section-title {\n    @include form.section-title;\n  }\n\n  .form-section:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.select-option {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n/* Match the global time zone selector with flag icons. */\n.timezone-option {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.select-placeholder {\n  color: $text-muted;\n  font-weight: 500;\n}\n\n.p-inputgroup {\n  .p-inputgroup-addon {\n    border: none;\n    transition: all 0.2s ease;\n\n    i {\n      font-size: 1rem;\n    }\n  }\n\n  &:focus-within .p-inputgroup-addon {\n    transform: scale(1.05);\n  }\n}\n\n.addon--cyan {\n  background: linear-gradient(135deg, #e0f7fa, #b2ebf2) !important;\n  color: #0097a7 !important;\n}\n\n.addon--purple {\n  background: linear-gradient(135deg, #ede9fe, #ddd6fe) !important;\n  color: #7c3aed !important;\n}\n\n.addon--blue {\n  background: linear-gradient(135deg, #dbeafe, #bfdbfe) !important;\n  color: #2563eb !important;\n}\n\n.addon--pink {\n  background: linear-gradient(135deg, #fce7f3, #fbcfe8) !important;\n  color: #db2777 !important;\n}\n\n.addon--orange {\n  background: linear-gradient(135deg, #ffedd5, #fed7aa) !important;\n  color: #ea580c !important;\n}\n\n.addon--teal {\n  background: linear-gradient(135deg, #ccfbf1, #99f6e4) !important;\n  color: #0d9488 !important;\n}\n\n.addon--green {\n  background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important;\n  color: #16a34a !important;\n}\n\n.addon--primary {\n  background: linear-gradient(135deg, #e0e7ff, #c7d2fe) !important;\n  color: $primary !important;\n}\n\n.icon-blue {\n  color: #2563eb;\n}\n\n.icon-teal {\n  color: #0d9488;\n}\n\n.icon-indigo {\n  color: #4f46e5;\n}\n\n.icon-green {\n  color: #16a34a;\n}\n\n.icon-amber {\n  color: #d97706;\n}\n\n.icon-rose {\n  color: #db2777;\n}\n\n.icon-purple {\n  color: #7c3aed;\n}\n\n.industry-pack-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pack-card {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(99, 102, 241, 0.12);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.pack-header {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  justify-content: space-between;\n}\n\n.pack-icon {\n  width: 44px;\n  height: 44px;\n  display: grid;\n  place-items: center;\n  border-radius: $radius-lg;\n  font-size: 1.2rem;\n\n  &--core {\n    background: linear-gradient(135deg, #dbeafe, #bfdbfe);\n    color: #2563eb;\n  }\n\n  &--supply {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: #7c3aed;\n  }\n}\n\n.pack-meta {\n  flex: 1;\n\n  h4 {\n    margin: 0 0 $space-1;\n    font-size: 1rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    color: $text-muted;\n  }\n}\n\n.pack-toggle {\n  display: flex;\n  align-items: center;\n}\n\n.pack-body {\n  margin: 0;\n  color: $text-secondary;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.module-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n\n  &.is-disabled {\n    opacity: 0.55;\n    pointer-events: none;\n  }\n}\n\n.module-item {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n  }\n\n  &.is-disabled {\n    box-shadow: none;\n  }\n}\n\n.module-meta {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.module-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.module-desc {\n  font-size: 0.8rem;\n  color: $text-muted;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TenantCreatePage, { className: "TenantCreatePage", filePath: "src/app/crm/features/settings/pages/tenant-create.page.ts", lineNumber: 46 }); })();
