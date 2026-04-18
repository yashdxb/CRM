import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { EditorModule } from 'primeng/editor';
import { DatePickerModule } from 'primeng/datepicker';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/api";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/textarea";
import * as i6 from "primeng/select";
import * as i7 from "primeng/inputgroup";
import * as i8 from "primeng/inputgroupaddon";
import * as i9 from "primeng/editor";
import * as i10 from "primeng/datepicker";
const _c0 = () => ({ height: "300px" });
function CampaignEmailFormPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading email...");
    i0.ɵɵelementEnd()();
} }
function CampaignEmailFormPage_Conditional_20_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function CampaignEmailFormPage_Conditional_20_ng_template_13_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r4.label);
} }
function CampaignEmailFormPage_Conditional_20_ng_template_13_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 58);
    i0.ɵɵtext(1, "Select campaign");
    i0.ɵɵelementEnd();
} }
function CampaignEmailFormPage_Conditional_20_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CampaignEmailFormPage_Conditional_20_ng_template_13_div_0_Template, 4, 1, "div", 56)(1, CampaignEmailFormPage_Conditional_20_ng_template_13_span_1_Template, 2, 0, "span", 57);
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r4);
} }
function CampaignEmailFormPage_Conditional_20_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "h3", 19);
    i0.ɵɵelement(2, "i", 51);
    i0.ɵɵtext(3, " Schedule ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 21)(5, "div", 22)(6, "label", 59);
    i0.ɵɵtext(7, "Send Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "p-datepicker", 60);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("showTime", true)("showIcon", true);
} }
function CampaignEmailFormPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 17);
    i0.ɵɵlistener("ngSubmit", function CampaignEmailFormPage_Conditional_20_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵelementStart(1, "section", 18)(2, "h3", 19);
    i0.ɵɵelement(3, "i", 20);
    i0.ɵɵtext(4, " Email Setup ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 21)(6, "div", 22)(7, "label", 23);
    i0.ɵɵtext(8, "Campaign ");
    i0.ɵɵelementStart(9, "span", 24);
    i0.ɵɵtext(10, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p-select", 25);
    i0.ɵɵtemplate(12, CampaignEmailFormPage_Conditional_20_ng_template_12_Template, 4, 1, "ng-template", 26)(13, CampaignEmailFormPage_Conditional_20_ng_template_13_Template, 2, 2, "ng-template", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 22)(15, "label", 28);
    i0.ɵɵtext(16, "Subject ");
    i0.ɵɵelementStart(17, "span", 24);
    i0.ɵɵtext(18, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "p-inputgroup")(20, "p-inputgroup-addon", 29);
    i0.ɵɵelement(21, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 22)(24, "label", 32);
    i0.ɵɵtext(25, "From Name ");
    i0.ɵɵelementStart(26, "span", 24);
    i0.ɵɵtext(27, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "p-inputgroup")(29, "p-inputgroup-addon", 33);
    i0.ɵɵelement(30, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "input", 35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 22)(33, "label", 36);
    i0.ɵɵtext(34, "Reply-To");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p-inputgroup")(36, "p-inputgroup-addon", 37);
    i0.ɵɵelement(37, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 39);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(39, "section", 18)(40, "h3", 19);
    i0.ɵɵelement(41, "i", 40);
    i0.ɵɵtext(42, " Email Content ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 21)(44, "div", 41)(45, "label", 42);
    i0.ɵɵtext(46, "HTML Body ");
    i0.ɵɵelementStart(47, "span", 24);
    i0.ɵɵtext(48, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(49, "p-editor", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 41)(51, "label", 44);
    i0.ɵɵtext(52, "Plain Text (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(53, "textarea", 45);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(54, CampaignEmailFormPage_Conditional_20_Conditional_54_Template, 9, 2, "section", 18);
    i0.ɵɵelementStart(55, "div", 46)(56, "button", 47);
    i0.ɵɵlistener("click", function CampaignEmailFormPage_Conditional_20_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel()); });
    i0.ɵɵelementStart(57, "span", 48);
    i0.ɵɵelement(58, "i", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span");
    i0.ɵɵtext(60, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "button", 50);
    i0.ɵɵlistener("click", function CampaignEmailFormPage_Conditional_20_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveAndSchedule()); });
    i0.ɵɵelementStart(62, "span", 48);
    i0.ɵɵelement(63, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "span");
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "button", 52)(67, "span", 48);
    i0.ɵɵelement(68, "i", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("options", ctx_r1.campaigns());
    i0.ɵɵadvance(38);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(9, _c0));
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.showSchedule() ? 54 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.showSchedule() ? "Confirm Schedule" : "Save & Schedule");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Saving..." : "Save Draft");
} }
export class CampaignEmailFormPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    data = inject(MarketingDataService);
    toast = inject(AppToastService);
    editId = signal(null, ...(ngDevMode ? [{ debugName: "editId" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    campaigns = signal([], ...(ngDevMode ? [{ debugName: "campaigns" }] : []));
    isEditMode = computed(() => !!this.editId(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    showSchedule = signal(false, ...(ngDevMode ? [{ debugName: "showSchedule" }] : []));
    form = this.fb.group({
        campaignId: ['', Validators.required],
        subject: ['', [Validators.required, Validators.maxLength(200)]],
        fromName: ['', [Validators.required, Validators.maxLength(100)]],
        replyTo: ['', Validators.email],
        htmlBody: ['', Validators.required],
        textBody: [''],
        scheduledAtUtc: [null]
    });
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.editId.set(id);
            this.loadEmail(id);
        }
        this.loadCampaigns();
    }
    loadCampaigns() {
        this.data.searchCampaigns({ pageSize: 200 }).subscribe({
            next: (res) => {
                this.campaigns.set(res.items.map((c) => ({ label: c.name, value: c.id })));
            }
        });
    }
    loadEmail(id) {
        this.loading.set(true);
        this.data.getEmail(id).subscribe({
            next: (detail) => {
                this.form.patchValue({
                    campaignId: detail.campaignId,
                    subject: detail.subject,
                    fromName: detail.fromName,
                    replyTo: detail.replyTo ?? '',
                    htmlBody: detail.htmlBody,
                    textBody: detail.textBody ?? ''
                });
                this.loading.set(false);
            },
            error: () => {
                this.toast.show('error', 'Failed to load email');
                this.loading.set(false);
                this.router.navigate(['/app/marketing/emails']);
            }
        });
    }
    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const val = this.form.getRawValue();
        const payload = {
            campaignId: val.campaignId,
            subject: val.subject,
            fromName: val.fromName,
            replyTo: val.replyTo || undefined,
            htmlBody: val.htmlBody,
            textBody: val.textBody || undefined
        };
        this.saving.set(true);
        const op = this.editId()
            ? this.data.updateEmailDraft(this.editId(), payload)
            : this.data.createEmailDraft(payload);
        op.subscribe({
            next: (result) => {
                this.toast.show('success', this.editId() ? 'Email updated' : 'Email draft created');
                this.saving.set(false);
                this.router.navigate(['/app/marketing/emails', result.id]);
            },
            error: () => {
                this.toast.show('error', 'Failed to save email');
                this.saving.set(false);
            }
        });
    }
    saveAndSchedule() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const scheduledDate = this.form.controls.scheduledAtUtc.value;
        if (!scheduledDate) {
            this.showSchedule.set(true);
            return;
        }
        this.saving.set(true);
        const val = this.form.getRawValue();
        const payload = {
            campaignId: val.campaignId,
            subject: val.subject,
            fromName: val.fromName,
            replyTo: val.replyTo || undefined,
            htmlBody: val.htmlBody,
            textBody: val.textBody || undefined
        };
        const saveOp = this.editId()
            ? this.data.updateEmailDraft(this.editId(), payload)
            : this.data.createEmailDraft(payload);
        saveOp.subscribe({
            next: (result) => {
                this.data.scheduleEmail(result.id, {
                    scheduledAtUtc: scheduledDate.toISOString()
                }).subscribe({
                    next: () => {
                        this.toast.show('success', 'Email scheduled');
                        this.saving.set(false);
                        this.router.navigate(['/app/marketing/emails', result.id]);
                    },
                    error: () => {
                        this.toast.show('error', 'Email saved but scheduling failed');
                        this.saving.set(false);
                        this.router.navigate(['/app/marketing/emails', result.id]);
                    }
                });
            },
            error: () => {
                this.toast.show('error', 'Failed to save email');
                this.saving.set(false);
            }
        });
    }
    cancel() {
        this.router.navigate(['/app/marketing/emails']);
    }
    static ɵfac = function CampaignEmailFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignEmailFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignEmailFormPage, selectors: [["app-campaign-email-form-page"]], decls: 21, vars: 2, consts: [[1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "campaign-email-form-page", "page-container"], [1, "page-content"], [1, "hero"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "loading-state"], [1, "form-layout", 3, "formGroup"], [1, "pi", "pi-spin", "pi-spinner"], [1, "form-layout", 3, "ngSubmit", "formGroup"], [1, "form-card"], [1, "section-title"], [1, "pi", "pi-envelope"], [1, "form-grid"], [1, "form-field"], ["for", "campaignId"], [1, "required"], ["id", "campaignId", "optionLabel", "label", "optionValue", "value", "formControlName", "campaignId", "placeholder", "Select campaign", "appendTo", "body", 1, "w-full", 3, "options"], ["pTemplate", "item"], ["pTemplate", "value"], ["for", "subject"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "subject", "formControlName", "subject", "placeholder", "Enter email subject line"], ["for", "fromName"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-user"], ["pInputText", "", "id", "fromName", "formControlName", "fromName", "placeholder", "Sender display name"], ["for", "replyTo"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-reply"], ["pInputText", "", "id", "replyTo", "formControlName", "replyTo", "placeholder", "Reply-to email (optional)"], [1, "pi", "pi-file-edit"], [1, "form-field", "full-row"], ["for", "htmlBody"], ["id", "htmlBody", "formControlName", "htmlBody"], ["for", "textBody"], ["pTextarea", "", "id", "textBody", "formControlName", "textBody", "rows", "5", "placeholder", "Optional plain text version"], [1, "form-actions"], ["type", "button", 1, "action-btn", "action-btn--back", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-times"], ["type", "button", 1, "action-btn", "action-btn--export", 3, "click", "disabled"], [1, "pi", "pi-clock"], ["type", "submit", 1, "action-btn", "action-btn--add", 3, "disabled"], [1, "pi", "pi-save"], [1, "select-option"], [1, "pi", "pi-flag"], ["class", "select-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], ["for", "scheduledAtUtc"], ["id", "scheduledAtUtc", "formControlName", "scheduledAtUtc", "placeholder", "Pick date & time", "appendTo", "body", 3, "showTime", "showIcon"]], template: function CampaignEmailFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 5)(6, "div", 6);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "section", 7)(9, "span", 8);
            i0.ɵɵelement(10, "span", 9);
            i0.ɵɵtext(11, " Email Campaigns ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h1", 10)(13, "span", 11);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "Email");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 13);
            i0.ɵɵtext(18, "Create and configure a campaign email to send to your audience.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(19, CampaignEmailFormPage_Conditional_19_Template, 4, 0, "div", 14)(20, CampaignEmailFormPage_Conditional_20_Template, 71, 10, "form", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Compose");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.loading() ? 19 : 20);
        } }, dependencies: [CommonModule, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.PrimeTemplate, InputTextModule, i4.InputText, TextareaModule, i5.Textarea, SelectModule, i6.Select, InputGroupModule, i7.InputGroup, InputGroupAddonModule, i8.InputGroupAddon, EditorModule, i9.Editor, DatePickerModule, i10.DatePicker, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.campaign-email-form-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1.1rem;\n  }\n\n  .hero {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.28rem 0.7rem;\n    width: fit-content;\n    border-radius: 999px;\n    border: 1px solid rgba(255, 255, 255, 0.45);\n    background: rgba(255, 255, 255, 0.72);\n    color: #4f46e5;\n    font-size: 0.75rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);\n  }\n\n  .badge-dot {\n    width: 0.45rem;\n    height: 0.45rem;\n    border-radius: 999px;\n    background: #22c55e;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.16);\n  }\n\n  .hero-title {\n    margin: 0;\n\n    .title-gradient {\n      background: $primary-gradient;\n      background-size: 200% auto;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n    }\n\n    .title-light {\n      color: #334155;\n      margin-left: 0.45rem;\n    }\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n    margin: 0;\n    color: #64748b;\n    font-size: 0.9375rem;\n  }\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  padding: 3rem;\n  color: #6b7280;\n  font-size: 0.9375rem;\n\n  i {\n    font-size: 1.25rem;\n  }\n}\n\n.form-layout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.65) 100%);\n  padding: 0.95rem;\n  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(99, 102, 241, 0.28);\n    box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);\n  }\n\n  &:focus-within {\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12), 0 14px 30px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.8rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #0e7490;\n\n  i {\n    color: #06b6d4;\n    background: rgba(6, 182, 212, 0.14);\n    width: 1.45rem;\n    height: 1.45rem;\n    border-radius: 0.45rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.82rem;\n  }\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  &.full-row {\n    grid-column: 1 / -1;\n    align-items: flex-start;\n\n    > label {\n      padding-top: 0.55rem;\n    }\n  }\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      color: #ef4444;\n      margin-left: 2px;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > textarea,\n  > p-datepicker,\n  > p-editor {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.85rem;\n  }\n}\n\n.select-placeholder[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 0.45rem;\n}\n\n[_nghost-%COMP%]     .p-inputgroup > .p-component, \n[_nghost-%COMP%]     .p-inputgroup > .p-inputwrapper, \n[_nghost-%COMP%]     .p-inputgroup > .p-inputwrapper > .p-component {\n  border-radius: 0;\n}\n\n[_nghost-%COMP%]     .p-inputgroup > .p-inputgroup-addon {\n  border-color: rgba(148, 163, 184, 0.28);\n}\n\n[_nghost-%COMP%]     .p-inputtext, \n[_nghost-%COMP%]     .p-select, \n[_nghost-%COMP%]     textarea.p-textarea {\n  color: #1e293b;\n  font-weight: 500;\n  border-color: rgba(148, 163, 184, 0.28);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n[_nghost-%COMP%]     .p-inputtext:enabled:hover, \n[_nghost-%COMP%]     .p-select:not(.p-disabled):hover, \n[_nghost-%COMP%]     textarea.p-textarea:enabled:hover {\n  border-color: rgba(99, 102, 241, 0.35);\n}\n\n[_nghost-%COMP%]     .p-inputtext:enabled:focus, \n[_nghost-%COMP%]     .p-select.p-focus, \n[_nghost-%COMP%]     textarea.p-textarea:enabled:focus {\n  border-color: rgba(59, 130, 246, 0.45);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n\n[_nghost-%COMP%]     .p-editor {\n  .p-editor-toolbar {\n    border-color: rgba(148, 163, 184, 0.28);\n    background: rgba(248, 250, 252, 0.7);\n  }\n\n  .p-editor-content {\n    border-color: rgba(148, 163, 184, 0.28);\n\n    .ql-editor {\n      min-height: 250px;\n      color: #1e293b;\n      font-weight: 500;\n    }\n  }\n}\n\n[_nghost-%COMP%]     p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n  background: rgba(255, 255, 255, 0.95);\n  border-color: rgba(59, 130, 246, 0.5);\n  transform: scale(1.03);\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@media (max-width: 900px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-field[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignEmailFormPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-email-form-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    SelectModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    EditorModule,
                    DatePickerModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"campaign-email-form-page page-container\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero\">\n      <span class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        Email Campaigns\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Compose' }}</span>\n        <span class=\"title-light\">Email</span>\n      </h1>\n      <p class=\"hero-subtitle\">Create and configure a campaign email to send to your audience.</p>\n    </section>\n\n    @if (loading()) {\n      <div class=\"loading-state\">\n        <i class=\"pi pi-spin pi-spinner\"></i>\n        <span>Loading email...</span>\n      </div>\n    } @else {\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\" class=\"form-layout\">\n        <!-- Campaign & Subject Section -->\n        <section class=\"form-card\">\n          <h3 class=\"section-title\">\n            <i class=\"pi pi-envelope\"></i>\n            Email Setup\n          </h3>\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"campaignId\">Campaign <span class=\"required\">*</span></label>\n              <p-select\n                id=\"campaignId\"\n                [options]=\"campaigns()\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                formControlName=\"campaignId\"\n                placeholder=\"Select campaign\"\n                class=\"w-full\"\n                appendTo=\"body\"\n              >\n                <ng-template pTemplate=\"item\" let-option>\n                  <div class=\"select-option\"><i class=\"pi pi-flag\"></i><span>{{ option.label }}</span></div>\n                </ng-template>\n                <ng-template pTemplate=\"value\" let-option>\n                  <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-flag\"></i><span>{{ option.label }}</span></div>\n                  <span *ngIf=\"!option\" class=\"select-placeholder\">Select campaign</span>\n                </ng-template>\n              </p-select>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"subject\">Subject <span class=\"required\">*</span></label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                  <i class=\"pi pi-tag\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"subject\" formControlName=\"subject\" placeholder=\"Enter email subject line\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"fromName\">From Name <span class=\"required\">*</span></label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                  <i class=\"pi pi-user\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"fromName\" formControlName=\"fromName\" placeholder=\"Sender display name\" />\n              </p-inputgroup>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"replyTo\">Reply-To</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                  <i class=\"pi pi-reply\"></i>\n                </p-inputgroup-addon>\n                <input pInputText id=\"replyTo\" formControlName=\"replyTo\" placeholder=\"Reply-to email (optional)\" />\n              </p-inputgroup>\n            </div>\n          </div>\n        </section>\n\n        <!-- Email Body Section -->\n        <section class=\"form-card\">\n          <h3 class=\"section-title\">\n            <i class=\"pi pi-file-edit\"></i>\n            Email Content\n          </h3>\n          <div class=\"form-grid\">\n            <div class=\"form-field full-row\">\n              <label for=\"htmlBody\">HTML Body <span class=\"required\">*</span></label>\n              <p-editor id=\"htmlBody\" formControlName=\"htmlBody\" [style]=\"{ height: '300px' }\"></p-editor>\n            </div>\n\n            <div class=\"form-field full-row\">\n              <label for=\"textBody\">Plain Text (optional)</label>\n              <textarea pTextarea id=\"textBody\" formControlName=\"textBody\" rows=\"5\" placeholder=\"Optional plain text version\"></textarea>\n            </div>\n          </div>\n        </section>\n\n        <!-- Schedule Section -->\n        @if (showSchedule()) {\n          <section class=\"form-card\">\n            <h3 class=\"section-title\">\n              <i class=\"pi pi-clock\"></i>\n              Schedule\n            </h3>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"scheduledAtUtc\">Send Date</label>\n                <p-datepicker\n                  id=\"scheduledAtUtc\"\n                  formControlName=\"scheduledAtUtc\"\n                  [showTime]=\"true\"\n                  [showIcon]=\"true\"\n                  placeholder=\"Pick date & time\"\n                  appendTo=\"body\"\n                ></p-datepicker>\n              </div>\n            </div>\n          </section>\n        }\n\n        <!-- Actions -->\n        <div class=\"form-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"cancel()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n            <span>Cancel</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"saveAndSchedule()\" [disabled]=\"saving()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-clock\"></i></span>\n            <span>{{ showSchedule() ? 'Confirm Schedule' : 'Save & Schedule' }}</span>\n          </button>\n          <button type=\"submit\" class=\"action-btn action-btn--add\" [disabled]=\"saving()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-save\"></i></span>\n            <span>{{ saving() ? 'Saving...' : 'Save Draft' }}</span>\n          </button>\n        </div>\n      </form>\n    }\n  </div>\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.campaign-email-form-page {\n  .page-content {\n    display: grid;\n    gap: 1.1rem;\n  }\n\n  .hero {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.28rem 0.7rem;\n    width: fit-content;\n    border-radius: 999px;\n    border: 1px solid rgba(255, 255, 255, 0.45);\n    background: rgba(255, 255, 255, 0.72);\n    color: #4f46e5;\n    font-size: 0.75rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.06);\n  }\n\n  .badge-dot {\n    width: 0.45rem;\n    height: 0.45rem;\n    border-radius: 999px;\n    background: #22c55e;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.16);\n  }\n\n  .hero-title {\n    margin: 0;\n\n    .title-gradient {\n      background: $primary-gradient;\n      background-size: 200% auto;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: gradient-shift 4s ease-in-out infinite;\n    }\n\n    .title-light {\n      color: #334155;\n      margin-left: 0.45rem;\n    }\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n    margin: 0;\n    color: #64748b;\n    font-size: 0.9375rem;\n  }\n}\n\n.loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  padding: 3rem;\n  color: #6b7280;\n  font-size: 0.9375rem;\n\n  i {\n    font-size: 1.25rem;\n  }\n}\n\n.form-layout {\n  display: grid;\n  gap: 1rem;\n}\n\n.form-card {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.65) 100%);\n  padding: 0.95rem;\n  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(99, 102, 241, 0.28);\n    box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);\n  }\n\n  &:focus-within {\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12), 0 14px 30px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.section-title {\n  margin: 0 0 0.8rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #0e7490;\n\n  i {\n    color: #06b6d4;\n    background: rgba(6, 182, 212, 0.14);\n    width: 1.45rem;\n    height: 1.45rem;\n    border-radius: 0.45rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.82rem;\n  }\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  &.full-row {\n    grid-column: 1 / -1;\n    align-items: flex-start;\n\n    > label {\n      padding-top: 0.55rem;\n    }\n  }\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      color: #ef4444;\n      margin-left: 2px;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > textarea,\n  > p-datepicker,\n  > p-editor {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n}\n\n.select-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.85rem;\n  }\n}\n\n.select-placeholder {\n  color: #94a3b8;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 0.45rem;\n}\n\n:host ::ng-deep .p-inputgroup > .p-component,\n:host ::ng-deep .p-inputgroup > .p-inputwrapper,\n:host ::ng-deep .p-inputgroup > .p-inputwrapper > .p-component {\n  border-radius: 0;\n}\n\n:host ::ng-deep .p-inputgroup > .p-inputgroup-addon {\n  border-color: rgba(148, 163, 184, 0.28);\n}\n\n:host ::ng-deep .p-inputtext,\n:host ::ng-deep .p-select,\n:host ::ng-deep textarea.p-textarea {\n  color: #1e293b;\n  font-weight: 500;\n  border-color: rgba(148, 163, 184, 0.28);\n  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n:host ::ng-deep .p-inputtext:enabled:hover,\n:host ::ng-deep .p-select:not(.p-disabled):hover,\n:host ::ng-deep textarea.p-textarea:enabled:hover {\n  border-color: rgba(99, 102, 241, 0.35);\n}\n\n:host ::ng-deep .p-inputtext:enabled:focus,\n:host ::ng-deep .p-select.p-focus,\n:host ::ng-deep textarea.p-textarea:enabled:focus {\n  border-color: rgba(59, 130, 246, 0.45);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.14);\n}\n\n:host ::ng-deep .p-editor {\n  .p-editor-toolbar {\n    border-color: rgba(148, 163, 184, 0.28);\n    background: rgba(248, 250, 252, 0.7);\n  }\n\n  .p-editor-content {\n    border-color: rgba(148, 163, 184, 0.28);\n\n    .ql-editor {\n      min-height: 250px;\n      color: #1e293b;\n      font-weight: 500;\n    }\n  }\n}\n\n:host ::ng-deep p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n  background: rgba(255, 255, 255, 0.95);\n  border-color: rgba(59, 130, 246, 0.5);\n  transform: scale(1.03);\n}\n\n@keyframes gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@media (max-width: 900px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .form-field {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignEmailFormPage, { className: "CampaignEmailFormPage", filePath: "src/app/crm/features/marketing/pages/campaign-email-form.page.ts", lineNumber: 37 }); })();
