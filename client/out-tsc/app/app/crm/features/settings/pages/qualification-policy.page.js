import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/checkbox";
import * as i3 from "primeng/inputgroup";
import * as i4 from "primeng/inputgroupaddon";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/inputnumber";
import * as i7 from "primeng/select";
import * as i8 from "primeng/multiselect";
import * as i9 from "@angular/forms";
import * as i10 from "primeng/accordion";
import * as i11 from "primeng/tabs";
const _c0 = () => [0, 1, 2];
const _c1 = () => ({ class: "qp-sidebar-item" });
const _c2 = a0 => ({ root: a0 });
const _c3 = () => ({ standalone: true });
function QualificationPolicyPage_span_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵelement(1, "i", 46);
    i0.ɵɵtext(2, " Ready ");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_div_68_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵelement(1, "div", 50)(2, "div", 51);
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_div_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtemplate(1, QualificationPolicyPage_div_68_div_1_Template, 3, 0, "div", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function QualificationPolicyPage_form_69_article_113_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 139);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_article_113_button_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const factor_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeCustomQualificationFactor(factor_r4.key)); });
    i0.ɵɵelement(1, "i", 140);
    i0.ɵɵtext(2, " Remove ");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_article_113_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73)(2, "label", 134);
    i0.ɵɵtext(3, "Response type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p-select", 141);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_div_26_Template_p_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r6); const factor_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactor(factor_r4.key, { valueType: $event, options: $event === "text" ? [] : factor_r4.options.length ? factor_r4.options : ["Unknown / not assessed", "Observed", "Confirmed", "Blocked"] })); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 73)(6, "label", 134);
    i0.ɵɵtext(7, "Options");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 142);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_div_26_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r6); const factor_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactorOptions(factor_r4.key, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small", 78);
    i0.ɵɵtext(10, "Used only for single-select custom factors.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const factor_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "qp-factor-type-" + factor_r4.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("inputId", "qp-factor-type-" + factor_r4.key)("options", ctx_r1.customFactorValueTypeOptions)("ngModel", factor_r4.valueType)("ngModelOptions", i0.ɵɵpureFunction0(10, _c3));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "qp-factor-options-" + factor_r4.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "qp-factor-options-" + factor_r4.key)("ngModel", ctx_r1.qualificationFactorOptionsText(factor_r4))("ngModelOptions", i0.ɵɵpureFunction0(11, _c3))("disabled", factor_r4.valueType === "text");
} }
function QualificationPolicyPage_form_69_article_113_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 125)(1, "div", 126)(2, "div", 127)(3, "span", 128);
    i0.ɵɵelement(4, "i", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 130)(6, "h4");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 131)(11, "label", 85)(12, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_Template_p_checkbox_ngModelChange_12_listener($event) { const factor_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactor(factor_r4.key, { isActive: !!$event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Active");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, QualificationPolicyPage_form_69_article_113_button_15_Template, 3, 0, "button", 132);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 133)(17, "div", 72)(18, "div", 73)(19, "label", 134);
    i0.ɵɵtext(20, "Display label");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 135);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_Template_input_ngModelChange_21_listener($event) { const factor_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactor(factor_r4.key, { displayLabel: $event })); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 73)(23, "label", 134);
    i0.ɵɵtext(24, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p-inputNumber", 136);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_Template_p_inputNumber_ngModelChange_25_listener($event) { const factor_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactor(factor_r4.key, { order: $event })); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(26, QualificationPolicyPage_form_69_article_113_div_26_Template, 11, 12, "div", 137);
    i0.ɵɵelementStart(27, "div", 84)(28, "label", 85)(29, "p-checkbox", 138);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_113_Template_p_checkbox_ngModelChange_29_listener($event) { const factor_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQualificationFactor(factor_r4.key, { isRequired: !!$event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "Required for qualification");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const factor_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-factor", factor_r4.key);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-factor", factor_r4.key);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(factor_r4.displayLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(factor_r4.factorType === "custom" ? "Custom factor" : factor_r4.key);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("binary", true)("ngModel", factor_r4.isActive)("ngModelOptions", i0.ɵɵpureFunction0(23, _c3));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.isCustomQualificationFactor(factor_r4));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("for", "qp-factor-label-" + factor_r4.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "qp-factor-label-" + factor_r4.key)("ngModel", factor_r4.displayLabel)("ngModelOptions", i0.ɵɵpureFunction0(24, _c3));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "qp-factor-order-" + factor_r4.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("inputId", "qp-factor-order-" + factor_r4.key)("ngModel", factor_r4.order)("ngModelOptions", i0.ɵɵpureFunction0(25, _c3))("min", 1)("max", 999);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isCustomQualificationFactor(factor_r4));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("binary", true)("ngModel", factor_r4.isRequired)("ngModelOptions", i0.ɵɵpureFunction0(26, _c3))("disabled", !factor_r4.isActive);
} }
function QualificationPolicyPage_form_69_article_182_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 125)(1, "div", 126)(2, "div", 127)(3, "span", 128);
    i0.ɵɵelement(4, "i", 143);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 130)(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9, "Evidence source options shown in Lead Qualification");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "label", 144)(11, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_182_Template_p_checkbox_ngModelChange_11_listener($event) { const factor_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateFactorEvidenceRequire(factor_r8.key, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Require evidence");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 133)(15, "label", 145);
    i0.ɵɵtext(16, "Allowed evidence sources");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p-multiSelect", 146);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_article_182_Template_p_multiSelect_ngModelChange_17_listener($event) { const factor_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateFactorEvidenceSources(factor_r8.key, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 147)(19, "span", 148);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 149);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const factor_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-factor", factor_r8.key);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-factor", factor_r8.key);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(factor_r8.displayLabel);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.factorEvidenceRuleFor(factor_r8.key).requireEvidence)("ngModelOptions", i0.ɵɵpureFunction0(16, _c3));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.qualificationPolicy().evidenceSources)("ngModel", ctx_r1.factorEvidenceRuleFor(factor_r8.key).allowedEvidenceSources)("ngModelOptions", i0.ɵɵpureFunction0(17, _c3))("filter", true)("showClear", true)("display", "chip");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.factorEvidenceRuleFor(factor_r8.key).allowedEvidenceSources.length, " selected ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-required", ctx_r1.factorEvidenceRuleFor(factor_r8.key).requireEvidence);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.factorEvidenceRuleFor(factor_r8.key).requireEvidence ? "Gate enforced" : "Optional evidence", " ");
} }
function QualificationPolicyPage_form_69_div_208_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 154);
    i0.ɵɵtext(1, "Required");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_div_208_div_1_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 155);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_div_208_div_1_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const i_r10 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeEvidenceSource(i_r10)); });
    i0.ɵɵelement(1, "i", 156);
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_div_208_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 150)(1, "input", 151);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_div_208_div_1_Template_input_ngModelChange_1_listener($event) { const i_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateEvidenceSource(i_r10, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, QualificationPolicyPage_form_69_div_208_div_1_span_2_Template, 2, 0, "span", 152)(3, QualificationPolicyPage_form_69_div_208_div_1_button_3_Template, 2, 0, "button", 153);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const source_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", source_r12)("ngModelOptions", i0.ɵɵpureFunction0(5, _c3))("readonly", source_r12.toLowerCase() === "no evidence yet");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", source_r12.toLowerCase() === "no evidence yet");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", source_r12.toLowerCase() !== "no evidence yet");
} }
function QualificationPolicyPage_form_69_div_208_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 116);
    i0.ɵɵtemplate(1, QualificationPolicyPage_form_69_div_208_div_1_Template, 4, 6, "div", 117);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.qualificationPolicy().evidenceSources);
} }
function QualificationPolicyPage_form_69_ng_template_209_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1, "No sources configured. Add at least one evidence source.");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_div_236_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 150)(1, "p-select", 157);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_div_236_div_1_Template_p_select_ngModelChange_1_listener($event) { const i_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateModifierRule(i_r14, { key: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-inputNumber", 158);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_div_236_div_1_Template_p_inputNumber_ngModelChange_2_listener($event) { const i_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateModifierRule(i_r14, { delta: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 155);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_div_236_div_1_Template_button_click_3_listener() { const i_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeModifierRule(i_r14)); });
    i0.ɵɵelement(4, "i", 156);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const modifier_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r1.modifierKeyOptions)("ngModel", modifier_r15.key)("ngModelOptions", i0.ɵɵpureFunction0(7, _c3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", modifier_r15.delta)("min", -50)("max", 50)("ngModelOptions", i0.ɵɵpureFunction0(8, _c3));
} }
function QualificationPolicyPage_form_69_div_236_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 116);
    i0.ɵɵtemplate(1, QualificationPolicyPage_form_69_div_236_div_1_Template, 5, 9, "div", 117);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.qualificationPolicy().modifiers);
} }
function QualificationPolicyPage_form_69_ng_template_237_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1, "No modifiers defined. Add signals to adjust the threshold dynamically.");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_div_262_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 150)(1, "div", 159);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputNumber", 158);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_div_262_Template_p_inputNumber_ngModelChange_3_listener($event) { const factor_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateExposureWeight(factor_r17.key, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 154);
    i0.ɵɵtext(5, "%");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const factor_r17 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(factor_r17.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.exposureWeightFor(factor_r17.key))("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(5, _c3));
} }
function QualificationPolicyPage_form_69_p_263_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1, " We recommend weights totaling 100% for consistent Cost of Not Knowing scoring. ");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_div_287_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 150)(1, "div", 159);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputNumber", 158);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_div_287_Template_p_inputNumber_ngModelChange_3_listener($event) { const field_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateLeadDataWeight(field_r19.key, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 154);
    i0.ɵɵtext(5, "%");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r19 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r19.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.leadDataWeightFor(field_r19.key))("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(5, _c3));
} }
function QualificationPolicyPage_form_69_p_288_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1, " We recommend weights totaling 100% for consistent Lead Data Quality scoring. ");
    i0.ɵɵelementEnd();
} }
function QualificationPolicyPage_form_69_i_294_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 160);
} }
function QualificationPolicyPage_form_69_i_295_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 161);
} }
function QualificationPolicyPage_form_69_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 52);
    i0.ɵɵlistener("ngSubmit", function QualificationPolicyPage_form_69_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveSettings()); });
    i0.ɵɵelementStart(1, "p-tabs", 53);
    i0.ɵɵlistener("valueChange", function QualificationPolicyPage_form_69_Template_p_tabs_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onActiveTabChange($event)); });
    i0.ɵɵelementStart(2, "div", 54)(3, "p-tablist", 55)(4, "p-tab", 56);
    i0.ɵɵelement(5, "i", 19);
    i0.ɵɵelementStart(6, "span", 57);
    i0.ɵɵtext(7, "Scoring Rules");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p-tab", 58);
    i0.ɵɵelement(9, "i", 59);
    i0.ɵɵelementStart(10, "span", 57);
    i0.ɵɵtext(11, "Evidence");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p-tab", 60);
    i0.ɵɵelement(13, "i", 61);
    i0.ɵɵelementStart(14, "span", 57);
    i0.ɵɵtext(15, "Weights & Modifiers");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "p-tabpanels", 62)(17, "p-tabpanel", 63)(18, "p-accordion", 64);
    i0.ɵɵlistener("valueChange", function QualificationPolicyPage_form_69_Template_p_accordion_valueChange_18_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPolicyAccordionValueChange($event)); });
    i0.ɵɵelementStart(19, "p-accordion-panel", 65)(20, "p-accordion-header")(21, "div", 66)(22, "div", 67);
    i0.ɵɵelement(23, "i", 19);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Thresholds & Guardrails");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "span", 68);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "p-accordion-content")(29, "section", 69)(30, "h3", 70);
    i0.ɵɵelement(31, "i", 19);
    i0.ɵɵtext(32, " Thresholds & Guardrails ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p", 71);
    i0.ɵɵtext(34, "Define base conversion thresholds and approval guardrails");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 72)(36, "div", 73)(37, "label", 74);
    i0.ɵɵtext(38, "Default Threshold");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 75)(40, "p-inputgroup")(41, "p-inputgroup-addon", 76);
    i0.ɵɵelement(42, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p-inputNumber", 77);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_inputNumber_ngModelChange_43_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("defaultThreshold", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "small", 78);
    i0.ɵɵtext(45, "Baseline score required to convert");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 73)(47, "label", 79);
    i0.ɵɵtext(48, "Manager Approval Below");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 75)(50, "p-inputgroup")(51, "p-inputgroup-addon", 76);
    i0.ɵɵelement(52, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "p-inputNumber", 80);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_inputNumber_ngModelChange_53_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("managerApprovalBelow", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "small", 78);
    i0.ɵɵtext(55, "Require manager approval under this score");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(56, "div", 73)(57, "label", 81);
    i0.ɵɵtext(58, "Block Below");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 75)(60, "p-inputgroup")(61, "p-inputgroup-addon", 76);
    i0.ɵɵelement(62, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "p-inputNumber", 82);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_inputNumber_ngModelChange_63_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("blockBelow", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(64, "small", 78);
    i0.ɵɵtext(65, "Hard stop unless overrides are enabled");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(66, "div", 73)(67, "label", 83);
    i0.ɵɵtext(68, "Overrides");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "div", 75)(70, "div", 84)(71, "label", 85)(72, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_checkbox_ngModelChange_72_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("allowOverrides", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span");
    i0.ɵɵtext(74, "Allow overrides");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "label", 85)(76, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_checkbox_ngModelChange_76_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("requireOverrideReason", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "span");
    i0.ɵɵtext(78, "Require override reason");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(79, "div", 73)(80, "label", 87);
    i0.ɵɵtext(81, "Lead List Display");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "div", 75)(83, "div", 84)(84, "label", 85)(85, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_checkbox_ngModelChange_85_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("showCqvsInLeadList", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "span");
    i0.ɵɵtext(87, "Enable CQVS coach panel in Leads list");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(88, "small", 78);
    i0.ɵɵtext(89, "Adds a compact \"Coach\" inspector for CQVS breakdown, weakest factor, and next evidence.");
    i0.ɵɵelementEnd()()()()()()();
    i0.ɵɵelementStart(90, "p-accordion-panel", 88)(91, "p-accordion-header")(92, "div", 66)(93, "div", 67);
    i0.ɵɵelement(94, "i", 89);
    i0.ɵɵelementStart(95, "span");
    i0.ɵɵtext(96, "Qualification Factors");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "span", 68);
    i0.ɵɵtext(98);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(99, "p-accordion-content")(100, "section", 69)(101, "h3", 70);
    i0.ɵɵelement(102, "i", 89);
    i0.ɵɵtext(103, " Qualification Factors ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "p", 71);
    i0.ɵɵtext(105, " Control which qualification factors are used, how they are labeled, and whether they are required for qualification. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(106, "div", 90)(107, "h4");
    i0.ɵɵtext(108, "Factor catalog");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(109, "button", 91);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_Template_button_click_109_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addCustomQualificationFactor()); });
    i0.ɵɵelement(110, "i", 92);
    i0.ɵɵtext(111, " Add custom factor ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(112, "div", 93);
    i0.ɵɵtemplate(113, QualificationPolicyPage_form_69_article_113_Template, 32, 27, "article", 94);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(114, "p-tabpanel", 95)(115, "p-accordion", 64);
    i0.ɵɵlistener("valueChange", function QualificationPolicyPage_form_69_Template_p_accordion_valueChange_115_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPolicyAccordionValueChange($event)); });
    i0.ɵɵelementStart(116, "p-accordion-panel", 96)(117, "p-accordion-header")(118, "div", 66)(119, "div", 67);
    i0.ɵɵelement(120, "i", 97);
    i0.ɵɵelementStart(121, "span");
    i0.ɵɵtext(122, "Evidence Enforcement");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(123, "span", 68);
    i0.ɵɵtext(124);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(125, "p-accordion-content")(126, "section", 69)(127, "h3", 70);
    i0.ɵɵelement(128, "i", 97);
    i0.ɵɵtext(129, " Evidence Enforcement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(130, "p", 71);
    i0.ɵɵtext(131, " Define the minimum evidence coverage required before a lead can move to Qualified. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(132, "div", 72)(133, "div", 73)(134, "label", 98);
    i0.ɵɵtext(135, "Qualification evidence gate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(136, "div", 75)(137, "div", 84)(138, "label", 85)(139, "p-checkbox", 86);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_checkbox_ngModelChange_139_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("requireEvidenceBeforeQualified", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(140, "span");
    i0.ɵɵtext(141, "Require evidence before setting lead to Qualified");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(142, "small", 78);
    i0.ɵɵtext(143, "Uses truth/evidence coverage, not factor selections alone.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(144, "div", 73)(145, "label", 99);
    i0.ɵɵtext(146, "Minimum evidence coverage (%)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(147, "div", 75)(148, "p-inputgroup")(149, "p-inputgroup-addon", 76);
    i0.ɵɵelement(150, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(151, "p-inputNumber", 100);
    i0.ɵɵlistener("ngModelChange", function QualificationPolicyPage_form_69_Template_p_inputNumber_ngModelChange_151_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setPolicyField("minimumEvidenceCoveragePercent", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(152, "small", 78);
    i0.ɵɵtext(153, " Recommended: 50% (roughly 3 of 6 evidence fields) before qualification. ");
    i0.ɵɵelementEnd()()()()()()();
    i0.ɵɵelementStart(154, "p-accordion-panel", 101)(155, "p-accordion-header")(156, "div", 66)(157, "div", 67);
    i0.ɵɵelement(158, "i", 102);
    i0.ɵɵelementStart(159, "span");
    i0.ɵɵtext(160, "Factor Evidence Mapping");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(161, "span", 68);
    i0.ɵɵtext(162);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(163, "p-accordion-content")(164, "section", 69)(165, "h3", 70);
    i0.ɵɵelement(166, "i", 102);
    i0.ɵɵtext(167, " Factor Evidence Mapping ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(168, "p", 71);
    i0.ɵɵtext(169, " Define which evidence sources are shown for each qualification factor and whether factor-level evidence is expected. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(170, "div", 103)(171, "div", 104)(172, "div", 105)(173, "span", 106);
    i0.ɵɵelement(174, "i", 25);
    i0.ɵɵtext(175);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(176, "span", 107);
    i0.ɵɵelement(177, "i", 108);
    i0.ɵɵtext(178);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(179, "p", 109);
    i0.ɵɵtext(180, "Configure source choices per factor so reps only see relevant options in the lead form.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(181, "div", 93);
    i0.ɵɵtemplate(182, QualificationPolicyPage_form_69_article_182_Template, 23, 18, "article", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(183, "p", 109);
    i0.ɵɵtext(184, "Tip: keep sources narrow per factor to reduce rep confusion in the Lead Qualification tab.");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(185, "p-accordion-panel", 110)(186, "p-accordion-header")(187, "div", 66)(188, "div", 67);
    i0.ɵɵelement(189, "i", 89);
    i0.ɵɵelementStart(190, "span");
    i0.ɵɵtext(191, "Evidence Sources");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(192, "span", 68);
    i0.ɵɵtext(193);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(194, "p-accordion-content")(195, "section", 69)(196, "h3", 70);
    i0.ɵɵelement(197, "i", 89);
    i0.ɵɵtext(198, " Evidence Sources ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(199, "p", 71);
    i0.ɵɵtext(200, " Configure the evidence source list shown in Lead Qualification. Use clear source names that reps can pick quickly. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(201, "div", 103)(202, "div", 90)(203, "h4");
    i0.ɵɵtext(204, "Evidence Source Catalog");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(205, "button", 91);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_Template_button_click_205_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addEvidenceSource()); });
    i0.ɵɵelement(206, "i", 92);
    i0.ɵɵtext(207, " Add source ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(208, QualificationPolicyPage_form_69_div_208_Template, 2, 1, "div", 111)(209, QualificationPolicyPage_form_69_ng_template_209_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(211, "p-tabpanel", 112)(212, "p-accordion", 64);
    i0.ɵɵlistener("valueChange", function QualificationPolicyPage_form_69_Template_p_accordion_valueChange_212_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPolicyAccordionValueChange($event)); });
    i0.ɵɵelementStart(213, "p-accordion-panel", 113)(214, "p-accordion-header")(215, "div", 66)(216, "div", 67);
    i0.ɵɵelement(217, "i", 34);
    i0.ɵɵelementStart(218, "span");
    i0.ɵɵtext(219, "Modifiers");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(220, "span", 68);
    i0.ɵɵtext(221);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(222, "p-accordion-content")(223, "section", 69)(224, "h3", 70);
    i0.ɵɵelement(225, "i", 34);
    i0.ɵɵtext(226, " Modifiers ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(227, "p", 71);
    i0.ɵɵtext(228, "Signals that adjust the effective threshold dynamically");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(229, "div", 103)(230, "div", 90)(231, "h4");
    i0.ɵɵtext(232, "Qualification Modifiers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(233, "button", 91);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_Template_button_click_233_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addModifierRule()); });
    i0.ɵɵelement(234, "i", 92);
    i0.ɵɵtext(235, " Add modifier ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(236, QualificationPolicyPage_form_69_div_236_Template, 2, 1, "div", 111)(237, QualificationPolicyPage_form_69_ng_template_237_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(239, "p-accordion-panel", 114)(240, "p-accordion-header")(241, "div", 66)(242, "div", 67);
    i0.ɵɵelement(243, "i", 115);
    i0.ɵɵelementStart(244, "span");
    i0.ɵɵtext(245, "Exposure Weights");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(246, "span", 68);
    i0.ɵɵtext(247);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(248, "p-accordion-content")(249, "section", 69)(250, "h3", 70);
    i0.ɵɵelement(251, "i", 115);
    i0.ɵɵtext(252, " Exposure Weights ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(253, "p", 71);
    i0.ɵɵtext(254, " Control how much each qualification factor contributes to Cost of Not Knowing exposure. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(255, "div", 103)(256, "div", 90)(257, "h4");
    i0.ɵɵtext(258, "Qualification Factors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(259, "span", 109);
    i0.ɵɵtext(260);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(261, "div", 116);
    i0.ɵɵtemplate(262, QualificationPolicyPage_form_69_div_262_Template, 6, 6, "div", 117);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(263, QualificationPolicyPage_form_69_p_263_Template, 2, 0, "p", 118);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(264, "p-accordion-panel", 119)(265, "p-accordion-header")(266, "div", 66)(267, "div", 67);
    i0.ɵɵelement(268, "i", 33);
    i0.ɵɵelementStart(269, "span");
    i0.ɵɵtext(270, "Lead Data Quality Weights");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(271, "span", 68);
    i0.ɵɵtext(272);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(273, "p-accordion-content")(274, "section", 69)(275, "h3", 70);
    i0.ɵɵelement(276, "i", 33);
    i0.ɵɵtext(277, " Lead Data Quality Weights ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(278, "p", 71);
    i0.ɵɵtext(279, " Configure how lead basic fields contribute to Lead Data Quality Score (0-100). ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(280, "div", 103)(281, "div", 90)(282, "h4");
    i0.ɵɵtext(283, "Lead Data Fields");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(284, "span", 109);
    i0.ɵɵtext(285);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(286, "div", 116);
    i0.ɵɵtemplate(287, QualificationPolicyPage_form_69_div_287_Template, 6, 6, "div", 117);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(288, QualificationPolicyPage_form_69_p_288_Template, 2, 0, "p", 118);
    i0.ɵɵelementEnd()()()()()()()()();
    i0.ɵɵelementStart(289, "div", 120)(290, "button", 121);
    i0.ɵɵlistener("click", function QualificationPolicyPage_form_69_Template_button_click_290_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadSettings()); });
    i0.ɵɵelement(291, "i", 21);
    i0.ɵɵtext(292, " Reset ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(293, "button", 122);
    i0.ɵɵtemplate(294, QualificationPolicyPage_form_69_i_294_Template, 1, 0, "i", 123)(295, QualificationPolicyPage_form_69_i_295_Template, 1, 0, "i", 124);
    i0.ɵɵtext(296);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const noEvidenceSources_r20 = i0.ɵɵreference(210);
    const noModifiers_r21 = i0.ɵɵreference(238);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.settingsForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.activeTab());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(76, _c2, i0.ɵɵpureFunction0(75, _c1)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(79, _c2, i0.ɵɵpureFunction0(78, _c1)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(82, _c2, i0.ɵɵpureFunction0(81, _c1)));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.policyAccordionValue());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("Default ", ctx_r1.qualificationPolicy().defaultThreshold);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngModel", ctx_r1.qualificationPolicy().defaultThreshold)("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(84, _c3));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r1.qualificationPolicy().managerApprovalBelow)("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(85, _c3));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngModel", ctx_r1.qualificationPolicy().blockBelow)("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(86, _c3));
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.qualificationPolicy().allowOverrides)("ngModelOptions", i0.ɵɵpureFunction0(87, _c3));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.qualificationPolicy().requireOverrideReason)("ngModelOptions", i0.ɵɵpureFunction0(88, _c3));
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.qualificationPolicy().showCqvsInLeadList)("ngModelOptions", i0.ɵɵpureFunction0(89, _c3));
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.activeQualificationFactorsCount(), " active / ", ctx_r1.requiredQualificationFactorsCount(), " required ");
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngForOf", ctx_r1.qualificationFactors());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.policyAccordionValue());
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("is-off", !ctx_r1.qualificationPolicy().requireEvidenceBeforeQualified);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.qualificationPolicy().requireEvidenceBeforeQualified ? ctx_r1.qualificationPolicy().minimumEvidenceCoveragePercent + "% min" : "Disabled", " ");
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.qualificationPolicy().requireEvidenceBeforeQualified)("ngModelOptions", i0.ɵɵpureFunction0(90, _c3));
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngModel", ctx_r1.qualificationPolicy().minimumEvidenceCoveragePercent)("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(91, _c3))("disabled", !ctx_r1.qualificationPolicy().requireEvidenceBeforeQualified);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.requiredFactorEvidenceCount(), "/", ctx_r1.activeQualificationFactorsCount(), " active require evidence ");
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.requiredFactorEvidenceCount(), " factors require evidence ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.qualificationPolicy().evidenceSources.length, " evidence sources available ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.qualificationFactors());
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("", ctx_r1.qualificationPolicy().evidenceSources.length, " sources");
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngIf", ctx_r1.qualificationPolicy().evidenceSources.length)("ngIfElse", noEvidenceSources_r20);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.policyAccordionValue());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r1.qualificationPolicy().modifiers.length, " rules");
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngIf", ctx_r1.qualificationPolicy().modifiers.length)("ngIfElse", noModifiers_r21);
    i0.ɵɵadvance(10);
    i0.ɵɵclassProp("is-warn", ctx_r1.exposureWeightTotal() !== 100);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Total ", ctx_r1.exposureWeightTotal(), "% ");
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate1("Total: ", ctx_r1.exposureWeightTotal(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.exposureWeightOptions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.exposureWeightTotal() !== 100);
    i0.ɵɵadvance(8);
    i0.ɵɵclassProp("is-warn", ctx_r1.leadDataWeightTotal() !== 100);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Total ", ctx_r1.leadDataWeightTotal(), "% ");
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate1("Total: ", ctx_r1.leadDataWeightTotal(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.leadDataWeightOptions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadDataWeightTotal() !== 100);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !ctx_r1.canManageAdmin());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Save Qualification Policy", " ");
} }
export class QualificationPolicyPage {
    static accordionStateKey = 'qualification-policy-accordion';
    static defaultAccordionPanels = [
        'thresholds',
        'qualification-factors',
        'evidence-enforcement',
        'factor-evidence',
        'modifiers',
        'exposure-weights',
        'lead-data-weights',
        'evidence-sources'
    ];
    settingsService = inject(WorkspaceSettingsService);
    toastService = inject(AppToastService);
    fb = inject(FormBuilder);
    referenceData = inject(ReferenceDataService);
    http = inject(HttpClient);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    canManageAdmin = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage), ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    settingsForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(120)]],
        timeZone: ['UTC', [Validators.required]],
        currency: ['', [Validators.required]]
    });
    qualificationPolicy = signal(QualificationPolicyPage.defaultPolicy(), ...(ngDevMode ? [{ debugName: "qualificationPolicy" }] : []));
    policyAccordionValue = signal([
        ...QualificationPolicyPage.defaultAccordionPanels
    ], ...(ngDevMode ? [{ debugName: "policyAccordionValue" }] : []));
    activeTab = signal('scoring', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    modifierKeyOptions = [
        { label: 'Competitive deal', value: 'competitive' },
        { label: 'Executive champion', value: 'executiveChampion' },
        { label: 'Strategic account', value: 'strategic' },
        { label: 'Fast velocity', value: 'fastVelocity' },
        { label: 'Slow velocity', value: 'slowVelocity' }
    ];
    exposureWeightOptions = [
        { key: 'budget', label: 'Budget availability' },
        { key: 'timeline', label: 'Buying timeline' },
        { key: 'economicBuyer', label: 'Economic buyer' },
        { key: 'problem', label: 'Problem severity' },
        { key: 'readiness', label: 'Readiness to spend' },
        { key: 'icpFit', label: 'ICP fit' }
    ];
    leadDataWeightOptions = [
        { key: 'firstNameLastName', label: 'First and last name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'companyName', label: 'Company name' },
        { key: 'jobTitle', label: 'Job title' },
        { key: 'source', label: 'Source' }
    ];
    qualificationFactorOptions = [
        { key: 'budget', label: 'Budget availability' },
        { key: 'readiness', label: 'Readiness to spend' },
        { key: 'timeline', label: 'Buying timeline' },
        { key: 'problem', label: 'Problem severity' },
        { key: 'economicBuyer', label: 'Economic buyer' },
        { key: 'icpFit', label: 'ICP fit' }
    ];
    customFactorValueTypeOptions = [
        { label: 'Single select', value: 'singleSelect' },
        { label: 'Free text', value: 'text' }
    ];
    loadedSettings = null;
    currencyFallback = '';
    constructor() {
        this.loadCurrencyFallback();
        this.loadAccordionState();
        this.loadSettings();
    }
    loadSettings() {
        this.loading.set(true);
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.applySettings(settings);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load qualification policy');
            }
        });
    }
    saveSettings() {
        if (!this.loadedSettings) {
            return;
        }
        const safePayload = {
            name: this.loadedSettings.name ?? 'Workspace',
            timeZone: this.loadedSettings.timeZone ?? 'UTC',
            currency: this.resolveCurrency(this.loadedSettings.currency ?? null),
            leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
            defaultContractTermMonths: this.loadedSettings.defaultContractTermMonths ?? null,
            defaultDeliveryOwnerRoleId: this.loadedSettings.defaultDeliveryOwnerRoleId ?? null,
            approvalAmountThreshold: this.loadedSettings.approvalAmountThreshold ?? null,
            approvalApproverRole: this.loadedSettings.approvalApproverRole ?? '',
            approvalWorkflowPolicy: this.loadedSettings.approvalWorkflowPolicy ?? null,
            qualificationPolicy: this.qualificationPolicy()
        };
        this.saving.set(true);
        this.settingsService.updateSettings(safePayload).subscribe({
            next: (settings) => {
                this.saving.set(false);
                this.applySettings(settings);
                this.raiseToast('success', 'Qualification policy updated');
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to save qualification policy');
            }
        });
    }
    onActiveTabChange(tab) {
        if (typeof tab === 'string') {
            this.activeTab.set(tab);
        }
    }
    onPolicyAccordionValueChange(value) {
        const next = this.normalizeAccordionValue(value);
        this.policyAccordionValue.set(next);
        this.http
            .put(`/api/users/me/ui-state/${QualificationPolicyPage.accordionStateKey}`, {
            value: next
        })
            .subscribe({
            error: () => {
                // Non-blocking UX preference save. Avoid toast noise on transient failures.
            }
        });
    }
    applySettings(settings) {
        this.loadedSettings = settings;
        this.settingsForm.patchValue({
            name: settings.name,
            timeZone: settings.timeZone,
            currency: this.resolveCurrency(settings.currency ?? null)
        });
        const policy = settings.qualificationPolicy ?? QualificationPolicyPage.defaultPolicy();
        const normalized = {
            ...QualificationPolicyPage.defaultPolicy(),
            ...policy,
            exposureWeights: (policy.exposureWeights && policy.exposureWeights.length > 0)
                ? policy.exposureWeights
                : QualificationPolicyPage.defaultPolicy().exposureWeights,
            leadDataWeights: (policy.leadDataWeights && policy.leadDataWeights.length > 0)
                ? policy.leadDataWeights
                : QualificationPolicyPage.defaultPolicy().leadDataWeights,
            minimumEvidenceCoveragePercent: Number.isFinite(policy.minimumEvidenceCoveragePercent)
                ? Math.max(0, Math.min(100, policy.minimumEvidenceCoveragePercent))
                : QualificationPolicyPage.defaultPolicy().minimumEvidenceCoveragePercent,
            evidenceSources: this.normalizeEvidenceSources(policy.evidenceSources)
        };
        normalized.factors = this.normalizeFactors(policy.factors);
        normalized.factorEvidenceRules = this.normalizeFactorEvidenceRules(policy.factorEvidenceRules, normalized.evidenceSources, normalized.factors);
        this.qualificationPolicy.set(normalized);
    }
    qualificationFactors() {
        return [...(this.qualificationPolicy().factors ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    activeQualificationFactorsCount() {
        return this.qualificationFactors().filter((factor) => factor.isActive).length;
    }
    requiredQualificationFactorsCount() {
        return this.qualificationFactors().filter((factor) => factor.isActive && factor.isRequired).length;
    }
    updateQualificationFactor(key, patch) {
        const current = this.qualificationPolicy();
        const next = (current.factors ?? []).map((factor) => {
            if (factor.key !== key) {
                return factor;
            }
            return {
                ...factor,
                ...patch,
                displayLabel: (patch.displayLabel ?? factor.displayLabel ?? '').trim() || factor.displayLabel
            };
        });
        this.qualificationPolicy.set({
            ...current,
            factors: this.normalizeFactors(next)
        });
        this.syncFactorEvidenceRulesToCatalog();
    }
    addCustomQualificationFactor() {
        const current = this.qualificationPolicy();
        const nextKey = this.nextCustomFactorKey();
        const nextOrder = this.nextQualificationFactorOrder();
        this.qualificationPolicy.set({
            ...current,
            factors: this.normalizeFactors([
                ...(current.factors ?? []),
                {
                    key: nextKey,
                    displayLabel: 'Custom qualification factor',
                    isActive: true,
                    isRequired: false,
                    order: nextOrder,
                    factorType: 'custom',
                    valueType: 'singleSelect',
                    includeInScore: false,
                    options: ['Unknown / not assessed', 'Observed', 'Confirmed', 'Blocked']
                }
            ])
        });
        this.syncFactorEvidenceRulesToCatalog();
    }
    removeCustomQualificationFactor(key) {
        const current = this.qualificationPolicy();
        this.qualificationPolicy.set({
            ...current,
            factors: (current.factors ?? []).filter((factor) => factor.key !== key),
            factorEvidenceRules: (current.factorEvidenceRules ?? []).filter((rule) => rule.factorKey !== key)
        });
    }
    updateQualificationFactorOptions(key, value) {
        const options = value
            .split(/\r?\n|,/)
            .map((item) => item.trim())
            .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
        this.updateQualificationFactor(key, { options });
    }
    qualificationFactorOptionsText(factor) {
        return (factor.options ?? []).join('\n');
    }
    isCustomQualificationFactor(factor) {
        return factor.factorType === 'custom';
    }
    addModifierRule() {
        const current = this.qualificationPolicy();
        const nextRule = { key: 'competitive', delta: 5 };
        this.qualificationPolicy.set({
            ...current,
            modifiers: [...current.modifiers, nextRule]
        });
    }
    updateExposureWeight(key, weight) {
        const safeWeight = Number.isFinite(weight) ? Math.max(0, Math.min(100, weight ?? 0)) : 0;
        const current = this.qualificationPolicy();
        const next = (current.exposureWeights ?? []).map((item) => item.key === key ? { ...item, weight: safeWeight } : item);
        this.qualificationPolicy.set({ ...current, exposureWeights: next });
    }
    exposureWeightFor(key) {
        return (this.qualificationPolicy().exposureWeights ?? []).find((item) => item.key === key)?.weight ?? 0;
    }
    exposureWeightTotal() {
        return (this.qualificationPolicy().exposureWeights ?? []).reduce((sum, item) => sum + (item.weight ?? 0), 0);
    }
    exposureWeightsMissing() {
        return this.exposureWeightOptions.filter((option) => !(this.qualificationPolicy().exposureWeights ?? []).some((w) => w.key === option.key));
    }
    updateLeadDataWeight(key, weight) {
        const safeWeight = Number.isFinite(weight) ? Math.max(0, Math.min(100, weight ?? 0)) : 0;
        const current = this.qualificationPolicy();
        const next = (current.leadDataWeights ?? []).map((item) => item.key === key ? { ...item, weight: safeWeight } : item);
        this.qualificationPolicy.set({ ...current, leadDataWeights: next });
    }
    leadDataWeightFor(key) {
        return (this.qualificationPolicy().leadDataWeights ?? []).find((item) => item.key === key)?.weight ?? 0;
    }
    leadDataWeightTotal() {
        return (this.qualificationPolicy().leadDataWeights ?? []).reduce((sum, item) => sum + (item.weight ?? 0), 0);
    }
    requiredFactorEvidenceCount() {
        const active = new Set(this.qualificationFactors().filter((factor) => factor.isActive).map((factor) => factor.key));
        return (this.qualificationPolicy().factorEvidenceRules ?? [])
            .filter((rule) => active.has(rule.factorKey) && rule.requireEvidence)
            .length;
    }
    removeModifierRule(index) {
        const current = this.qualificationPolicy();
        const next = current.modifiers.filter((_, idx) => idx !== index);
        this.qualificationPolicy.set({ ...current, modifiers: next });
    }
    updateModifierRule(index, patch) {
        const current = this.qualificationPolicy();
        const next = current.modifiers.map((rule, idx) => idx === index ? { ...rule, ...patch } : rule);
        this.qualificationPolicy.set({ ...current, modifiers: next });
    }
    setPolicyField(field, value) {
        const current = this.qualificationPolicy();
        this.qualificationPolicy.set({ ...current, [field]: value });
    }
    addEvidenceSource() {
        const nextName = this.nextEvidenceSourceName();
        const current = this.qualificationPolicy();
        this.qualificationPolicy.set({
            ...current,
            evidenceSources: [...current.evidenceSources, nextName]
        });
        this.syncFactorEvidenceRulesToCatalog();
    }
    updateEvidenceSource(index, value) {
        const current = this.qualificationPolicy();
        const trimmed = (value ?? '').trim();
        const next = [...current.evidenceSources];
        next[index] = trimmed;
        this.qualificationPolicy.set({
            ...current,
            evidenceSources: this.normalizeEvidenceSources(next)
        });
        this.syncFactorEvidenceRulesToCatalog();
    }
    removeEvidenceSource(index) {
        const current = this.qualificationPolicy();
        const target = current.evidenceSources[index];
        if (!target) {
            return;
        }
        if (target.toLowerCase() === 'no evidence yet') {
            return;
        }
        const next = current.evidenceSources.filter((_, idx) => idx !== index);
        this.qualificationPolicy.set({
            ...current,
            evidenceSources: this.normalizeEvidenceSources(next)
        });
        this.syncFactorEvidenceRulesToCatalog();
    }
    factorEvidenceRuleFor(key) {
        const current = this.qualificationPolicy();
        return (current.factorEvidenceRules?.find((rule) => rule.factorKey === key) ??
            QualificationPolicyPage.defaultFactorEvidenceRules(current.evidenceSources, current.factors ?? []).find((rule) => rule.factorKey === key) ?? {
            factorKey: key,
            requireEvidence: false,
            allowedEvidenceSources: ['No evidence yet']
        });
    }
    updateFactorEvidenceRequire(key, requireEvidence) {
        const current = this.qualificationPolicy();
        const next = (current.factorEvidenceRules ?? []).map((rule) => rule.factorKey === key ? { ...rule, requireEvidence: !!requireEvidence } : rule);
        this.qualificationPolicy.set({ ...current, factorEvidenceRules: next });
    }
    updateFactorEvidenceSources(key, selected) {
        const current = this.qualificationPolicy();
        const catalog = this.normalizeEvidenceSources(current.evidenceSources);
        const allowed = this.normalizeAllowedEvidenceSources(selected, catalog);
        const next = (current.factorEvidenceRules ?? []).map((rule) => rule.factorKey === key ? { ...rule, allowedEvidenceSources: allowed } : rule);
        this.qualificationPolicy.set({ ...current, evidenceSources: catalog, factorEvidenceRules: next });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadCurrencyFallback() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            if (!this.settingsForm.value.currency && this.currencyFallback) {
                this.settingsForm.patchValue({ currency: this.currencyFallback });
            }
        });
    }
    loadAccordionState() {
        this.http
            .get(`/api/users/me/ui-state/${QualificationPolicyPage.accordionStateKey}`)
            .subscribe({
            next: (response) => {
                this.policyAccordionValue.set(this.normalizeAccordionValue(response?.value));
            },
            error: () => {
                this.policyAccordionValue.set([...QualificationPolicyPage.defaultAccordionPanels]);
            }
        });
    }
    normalizeAccordionValue(value) {
        const allowed = new Set(QualificationPolicyPage.defaultAccordionPanels);
        const incoming = Array.isArray(value)
            ? value.map((item) => String(item))
            : (typeof value === 'string' || typeof value === 'number') && String(value).trim().length > 0
                ? [String(value)]
                : [...QualificationPolicyPage.defaultAccordionPanels];
        const normalized = incoming
            .map((item) => (item ?? '').trim())
            .filter((item) => item.length > 0 && allowed.has(item))
            .filter((item, index, all) => all.indexOf(item) === index);
        return normalized.length ? normalized : [...QualificationPolicyPage.defaultAccordionPanels];
    }
    resolveCurrency(value) {
        return value || this.currencyFallback || '';
    }
    normalizeEvidenceSources(items) {
        const normalized = (items ?? [])
            .map((item) => (item ?? '').trim())
            .filter((item) => item.length > 0)
            .filter((item, index, all) => all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
        if (!normalized.length) {
            return [...QualificationPolicyPage.defaultPolicy().evidenceSources];
        }
        const sentinelIndex = normalized.findIndex((item) => item.toLowerCase() === 'no evidence yet');
        if (sentinelIndex === -1) {
            return ['No evidence yet', ...normalized];
        }
        if (sentinelIndex > 0) {
            const [sentinel] = normalized.splice(sentinelIndex, 1);
            normalized.unshift(sentinel);
        }
        return normalized;
    }
    normalizeAllowedEvidenceSources(items, catalog) {
        const catalogSet = new Set(catalog.map((item) => item.toLowerCase()));
        const normalized = (items ?? [])
            .map((item) => (item ?? '').trim())
            .filter((item) => item.length > 0 && catalogSet.has(item.toLowerCase()))
            .filter((item, index, all) => all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
        if (!normalized.some((item) => item.toLowerCase() === 'no evidence yet') && catalogSet.has('no evidence yet')) {
            normalized.unshift(catalog.find((item) => item.toLowerCase() === 'no evidence yet') ?? 'No evidence yet');
        }
        return normalized.length ? normalized : ['No evidence yet'];
    }
    normalizeFactorEvidenceRules(rules, catalog, factors) {
        const defaults = QualificationPolicyPage.defaultFactorEvidenceRules(catalog, factors);
        const byKey = new Map((rules ?? []).map((rule) => [rule.factorKey, rule]));
        return defaults.map((def) => {
            const configured = byKey.get(def.factorKey);
            if (!configured)
                return def;
            return {
                factorKey: def.factorKey,
                requireEvidence: configured.requireEvidence ?? def.requireEvidence,
                allowedEvidenceSources: this.normalizeAllowedEvidenceSources(configured.allowedEvidenceSources, catalog)
            };
        });
    }
    normalizeFactors(factors) {
        const defaults = QualificationPolicyPage.defaultPolicy().factors;
        const byKey = new Map((factors ?? []).map((factor) => [factor.key, factor]));
        const normalizedSystem = defaults
            .map((factor) => {
            const configured = byKey.get(factor.key);
            if (!configured) {
                return factor;
            }
            return {
                ...factor,
                ...configured,
                displayLabel: (configured.displayLabel ?? '').trim() || factor.displayLabel,
                order: Number.isFinite(configured.order) ? Math.max(1, Math.round(configured.order)) : factor.order,
                factorType: 'system',
                valueType: 'singleSelect',
                includeInScore: true,
                options: []
            };
        })
            .sort((a, b) => a.order - b.order || a.displayLabel.localeCompare(b.displayLabel));
        const normalizedCustom = (factors ?? [])
            .filter((factor) => factor.factorType === 'custom' && !defaults.some((item) => item.key === factor.key))
            .map((factor, index) => ({
            key: this.normalizeCustomFactorKey(factor.key || `custom_factor_${index + 1}`),
            displayLabel: (factor.displayLabel ?? '').trim() || `Custom factor ${index + 1}`,
            isActive: factor.isActive ?? true,
            isRequired: factor.isRequired ?? false,
            order: Number.isFinite(factor.order) ? Math.max(1, Math.round(factor.order)) : 100 + (index * 10),
            factorType: 'custom',
            valueType: factor.valueType === 'text' ? 'text' : 'singleSelect',
            includeInScore: false,
            options: factor.valueType === 'text'
                ? []
                : this.normalizeCustomFactorOptions(factor.options)
        }))
            .sort((a, b) => a.order - b.order || a.displayLabel.localeCompare(b.displayLabel));
        return [...normalizedSystem, ...normalizedCustom]
            .sort((a, b) => a.order - b.order || a.displayLabel.localeCompare(b.displayLabel));
    }
    syncFactorEvidenceRulesToCatalog() {
        const current = this.qualificationPolicy();
        const catalog = this.normalizeEvidenceSources(current.evidenceSources);
        this.qualificationPolicy.set({
            ...current,
            evidenceSources: catalog,
            factorEvidenceRules: this.normalizeFactorEvidenceRules(current.factorEvidenceRules, catalog, current.factors ?? [])
        });
    }
    nextEvidenceSourceName() {
        const existing = new Set(this.qualificationPolicy().evidenceSources.map((item) => item.toLowerCase()));
        for (let i = 1; i <= 999; i += 1) {
            const candidate = `Evidence source ${i}`;
            if (!existing.has(candidate.toLowerCase())) {
                return candidate;
            }
        }
        return 'Evidence source';
    }
    static defaultPolicy() {
        const defaultEvidenceSources = QualificationPolicyPage.defaultEvidenceSources();
        return {
            defaultThreshold: 75,
            managerApprovalBelow: 50,
            blockBelow: 25,
            allowOverrides: true,
            requireOverrideReason: true,
            showCqvsInLeadList: false,
            requireEvidenceBeforeQualified: true,
            minimumEvidenceCoveragePercent: 50,
            factors: [
                { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
            ],
            factorEvidenceRules: QualificationPolicyPage.defaultFactorEvidenceRules(defaultEvidenceSources, []),
            thresholdRules: [],
            modifiers: [
                { key: 'competitive', delta: 10 },
                { key: 'executiveChampion', delta: -15 },
                { key: 'strategic', delta: -15 },
                { key: 'fastVelocity', delta: -10 },
                { key: 'slowVelocity', delta: 10 }
            ],
            exposureWeights: [
                { key: 'budget', weight: 25 },
                { key: 'timeline', weight: 20 },
                { key: 'economicBuyer', weight: 20 },
                { key: 'problem', weight: 15 },
                { key: 'readiness', weight: 10 },
                { key: 'icpFit', weight: 10 }
            ],
            leadDataWeights: [
                { key: 'firstNameLastName', weight: 16 },
                { key: 'email', weight: 24 },
                { key: 'phone', weight: 24 },
                { key: 'companyName', weight: 16 },
                { key: 'jobTitle', weight: 12 },
                { key: 'source', weight: 8 }
            ],
            evidenceSources: defaultEvidenceSources
        };
    }
    static defaultEvidenceSources() {
        return [
            'No evidence yet',
            'Customer call',
            'Call notes',
            'Call recap',
            'Follow-up call notes',
            'Discovery call notes',
            'Discovery meeting notes',
            'Meeting notes',
            'Email confirmation',
            'Email from buyer',
            'Buyer email',
            'Written confirmation',
            'Chat transcript',
            'Proposal feedback',
            'Internal plan mention',
            'Ops review notes',
            'Org chart reference',
            'Account research',
            'Third-party confirmation',
            'Historical / prior deal',
            'Inferred from context'
        ];
    }
    static defaultFactorEvidenceRules(catalog, configuredFactors) {
        const source = catalog;
        const pick = (...names) => source.filter((item) => names.some((name) => name.toLowerCase() === item.toLowerCase()));
        const defaults = [
            { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback') },
            { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention') },
            { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback') },
            { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript') },
            { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference') },
            { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: pick('No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call') }
        ];
        const custom = configuredFactors
            .filter((factor) => factor.factorType === 'custom')
            .map((factor) => ({
            factorKey: factor.key,
            requireEvidence: factor.isRequired,
            allowedEvidenceSources: [...source]
        }));
        return [...defaults, ...custom];
    }
    nextCustomFactorKey() {
        const existing = new Set((this.qualificationPolicy().factors ?? []).map((factor) => factor.key.toLowerCase()));
        for (let index = 1; index <= 999; index += 1) {
            const candidate = `custom_factor_${index}`;
            if (!existing.has(candidate.toLowerCase())) {
                return candidate;
            }
        }
        return `custom_factor_${Date.now()}`;
    }
    nextQualificationFactorOrder() {
        const existing = (this.qualificationPolicy().factors ?? []).map((factor) => factor.order ?? 0);
        return (existing.length ? Math.max(...existing) : 0) + 10;
    }
    normalizeCustomFactorKey(key) {
        return (key ?? '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '') || `custom_factor_${Date.now()}`;
    }
    normalizeCustomFactorOptions(options) {
        const normalized = (options ?? [])
            .map((item) => (item ?? '').trim())
            .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
        return normalized.length ? normalized : ['Unknown / not assessed', 'Observed', 'Confirmed', 'Blocked'];
    }
    static ɵfac = function QualificationPolicyPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QualificationPolicyPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QualificationPolicyPage, selectors: [["app-qualification-policy-page"]], decls: 70, vars: 7, consts: [["noEvidenceSources", ""], ["noModifiers", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn", "btn-secondary"], [1, "pi", "pi-arrow-left"], ["pButton", "", "type", "button", "routerLink", "/app/settings/qualification-thresholds", 1, "btn", "btn-secondary"], [1, "pi", "pi-sliders-h"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-shield"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-lock"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-chart-line"], [1, "pi", "pi-bolt"], [1, "data-section"], [1, "settings-layout"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "settings-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "settings-form", 3, "ngSubmit", "formGroup"], [1, "qp-sidebar-tabs", 3, "valueChange", "value"], [1, "qp-sidebar-layout"], [1, "qp-sidebar-nav"], ["value", "scoring", 3, "pt"], [1, "qp-sidebar-label"], ["value", "evidence", 3, "pt"], [1, "pi", "pi-verified"], ["value", "weights", 3, "pt"], [1, "pi", "pi-chart-bar"], [1, "qp-sidebar-content"], ["value", "scoring"], [1, "policy-accordion-shell", 3, "valueChange", "multiple", "value"], ["value", "thresholds"], [1, "policy-accordion-header"], [1, "policy-accordion-title"], [1, "policy-accordion-badge"], [1, "form-card"], [1, "section-title", "section-title--info"], [1, "section-description"], [1, "form-grid", "form-grid--2col"], [1, "form-field"], ["for", "qp-defaultThreshold"], [1, "form-field__input"], [1, "icon-addon", "icon-addon--info"], ["inputId", "qp-defaultThreshold", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions"], [1, "field-hint"], ["for", "qp-managerApprovalBelow"], ["inputId", "qp-managerApprovalBelow", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions"], ["for", "qp-blockBelow"], ["inputId", "qp-blockBelow", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions"], ["for", "qp-overrides"], [1, "toggle-row"], [1, "checkbox-field"], [3, "ngModelChange", "binary", "ngModel", "ngModelOptions"], ["for", "qp-leadListDisplay"], ["value", "qualification-factors"], [1, "pi", "pi-list-check"], [1, "policy-header"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "pi", "pi-plus"], [1, "factor-evidence-grid"], ["class", "factor-evidence-card", 4, "ngFor", "ngForOf"], ["value", "evidence"], ["value", "evidence-enforcement"], [1, "pi", "pi-check-square"], ["for", "qp-evidenceGate"], ["for", "qp-minEvidenceCoverage"], ["inputId", "qp-minEvidenceCoverage", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions", "disabled"], ["value", "factor-evidence"], [1, "pi", "pi-sitemap"], [1, "policy-block"], [1, "factor-evidence-toolbar"], [1, "factor-evidence-toolbar__summary"], [1, "factor-evidence-toolbar__stat"], [1, "factor-evidence-toolbar__stat", "factor-evidence-toolbar__stat--muted"], [1, "pi", "pi-list"], [1, "hint"], ["value", "evidence-sources"], ["class", "policy-list", 4, "ngIf", "ngIfElse"], ["value", "weights"], ["value", "modifiers"], ["value", "exposure-weights"], [1, "pi", "pi-exclamation-circle"], [1, "policy-list"], ["class", "policy-row policy-row--modifier", 4, "ngFor", "ngForOf"], ["class", "hint", 4, "ngIf"], ["value", "lead-data-weights"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "pi pi-save", 4, "ngIf"], ["class", "pi pi-spinner pi-spin", 4, "ngIf"], [1, "factor-evidence-card"], [1, "factor-evidence-card__header"], [1, "factor-evidence-card__title"], [1, "factor-evidence-card__icon"], [1, "pi", "pi-briefcase"], [1, "factor-evidence-card__title-text"], [1, "factor-evidence-card__toggle"], ["type", "button", "class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], [1, "factor-evidence-card__body"], [3, "for"], ["pInputText", "", "maxlength", "80", 3, "ngModelChange", "id", "ngModel", "ngModelOptions"], ["styleClass", "w-full", 3, "ngModelChange", "inputId", "ngModel", "ngModelOptions", "min", "max"], ["class", "form-grid form-grid--2col", 4, "ngIf"], [3, "ngModelChange", "binary", "ngModel", "ngModelOptions", "disabled"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "pi", "pi-trash"], ["optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "inputId", "options", "ngModel", "ngModelOptions"], ["pInputText", "", "rows", "4", "placeholder", "One option per line", 3, "ngModelChange", "id", "ngModel", "ngModelOptions", "disabled"], [1, "pi", "pi-sparkles"], [1, "checkbox-field", "factor-evidence-card__toggle"], [1, "factor-evidence-card__label"], ["defaultLabel", "Select sources", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions", "filter", "showClear", "display"], [1, "factor-evidence-card__meta"], [1, "factor-evidence-card__count"], [1, "factor-evidence-card__state"], [1, "policy-row", "policy-row--modifier"], ["pInputText", "", 1, "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions", "readonly"], ["class", "factor-suffix", 4, "ngIf"], ["type", "button", "class", "btn btn-ghost", 3, "click", 4, "ngIf"], [1, "factor-suffix"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "pi", "pi-times"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Modifier", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions"], [1, "factor-label"], [1, "pi", "pi-save"], [1, "pi", "pi-spinner", "pi-spin"]], template: function QualificationPolicyPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
            i0.ɵɵelement(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 7)(7, "div", 8)(8, "div", 9);
            i0.ɵɵelement(9, "span", 10);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Qualification");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 11)(13, "span", 12);
            i0.ɵɵtext(14, "Qualification");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 13);
            i0.ɵɵtext(16, "Policy");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18, " Define default conversion thresholds, manager approval guardrails, and signal modifiers that shape lead quality. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 15)(20, "button", 16);
            i0.ɵɵelement(21, "i", 17);
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵtext(23, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 18);
            i0.ɵɵelement(25, "i", 19);
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "Contextual Threshold Rules");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "button", 20);
            i0.ɵɵlistener("click", function QualificationPolicyPage_Template_button_click_28_listener() { return ctx.loadSettings(); });
            i0.ɵɵelement(29, "i", 21);
            i0.ɵɵelementStart(30, "span");
            i0.ɵɵtext(31, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 22)(33, "div", 23)(34, "div", 24);
            i0.ɵɵelement(35, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 26)(37, "span", 27);
            i0.ɵɵtext(38, "Default Threshold");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "strong", 28);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 29);
            i0.ɵɵelement(42, "i", 30);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(44, "div", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 32)(46, "div", 24);
            i0.ɵɵelement(47, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 26)(49, "span", 27);
            i0.ɵɵtext(50, "Modifiers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "strong", 28);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 29);
            i0.ɵɵelement(54, "i", 34);
            i0.ɵɵtext(55, " Dynamic adjustments ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(56, "div", 31);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "section", 35)(58, "div", 36)(59, "div", 37)(60, "div", 38)(61, "div", 39)(62, "h2");
            i0.ɵɵtext(63, "Qualification Policy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "span", 40);
            i0.ɵɵtext(65, "Protect conversion quality with rules and overrides");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 41);
            i0.ɵɵtemplate(67, QualificationPolicyPage_span_67_Template, 3, 0, "span", 42);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(68, QualificationPolicyPage_div_68_Template, 2, 2, "div", 43)(69, QualificationPolicyPage_form_69_Template, 297, 92, "form", 44);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(28);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.qualificationPolicy().defaultThreshold);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" Block below ", ctx.qualificationPolicy().blockBelow, " ");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.qualificationPolicy().modifiers.length);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
        } }, dependencies: [ButtonModule, i1.ButtonDirective, CheckboxModule, i2.Checkbox, InputGroupModule, i3.InputGroup, InputGroupAddonModule, i4.InputGroupAddon, InputTextModule, i5.InputText, InputNumberModule, i6.InputNumber, SelectModule, i7.Select, MultiSelectModule, i8.MultiSelect, FormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.MaxLengthValidator, i9.NgModel, ReactiveFormsModule, i9.FormGroupDirective, RouterLink,
            SkeletonModule,
            AccordionModule, i10.Accordion, i10.AccordionPanel, i10.AccordionHeader, i10.AccordionContent, TabsModule, i11.Tabs, i11.TabPanels, i11.TabPanel, i11.TabList, i11.Tab, NgIf,
            NgFor,
            BreadcrumbsComponent], styles: ["\n\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  --qp-inline-pad: 2rem;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n  width: 100%;\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n\n  @media (min-width: 1200px) {\n    grid-template-columns: minmax(0, 1fr) 360px;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n\n\n\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  min-width: 0;\n\n  @media (min-width: 700px) and (max-width: 1199px) {\n    flex-direction: row;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  \n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  @include form.button-primary;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  @include form.button-ghost;\n}\n\n\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n}\n\n.data-section[_ngcontent-%COMP%]    > .settings-layout[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 1.5rem;\n  width: 100%;\n  align-items: start;\n}\n\n\n\n\n\n.data-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  overflow: hidden;\n  min-width: 0;\n  width: 100%;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input[_ngcontent-%COMP%] {\n  height: 42px;\n  width: 100%;\n}\n\n\n\n\n\n.settings-form[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.policy-accordion-shell[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.policy-accordion-header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  min-width: 0;\n}\n\n.policy-accordion-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.88);\n\n  i {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.1));\n    color: #2563eb;\n    font-size: 0.8rem;\n    flex-shrink: 0;\n  }\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.policy-accordion-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.1);\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  flex-shrink: 0;\n\n  &.is-off {\n    color: rgba(71, 85, 105, 0.9);\n    background: rgba(148, 163, 184, 0.12);\n    border-color: rgba(148, 163, 184, 0.2);\n  }\n\n  &.is-warn {\n    color: #b45309;\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.22);\n  }\n}\n\n\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.policy-accordion-shell[_ngcontent-%COMP%]   .form-card[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  box-shadow: none;\n  padding: 0.4rem 0.2rem 0.2rem;\n\n  .section-title,\n  .section-description {\n    display: none;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  \n\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  \n\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  \n\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-card-inner[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .form-field__input,\n  > .toggle-row {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  .required {\n    @include form.form-required;\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.form-field__input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n\n\n[_nghost-%COMP%]     .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n//   PrimeNG   overrides   with   premium   focus   effects\n[_nghost-%COMP%]     {\n  .policy-accordion-shell {\n    .p-accordionpanel {\n      margin-bottom: 0.75rem;\n      border-radius: 16px;\n      overflow: hidden;\n      border: 1px solid rgba(148, 163, 184, 0.15);\n      background: rgba(255, 255, 255, 0.68);\n      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(18px);\n    }\n\n    .p-accordionheader {\n      background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.7));\n      border: 0;\n    }\n\n    .p-accordionheader-link {\n      width: 100%;\n      padding: 0.9rem 1rem;\n      background: transparent;\n      border: 0;\n      color: inherit;\n    }\n\n    .p-accordioncontent-content {\n      padding: 0.15rem 0.9rem 0.9rem;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.45));\n    }\n\n    .p-accordionpanel-active .p-accordionheader {\n      background: linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(245, 243, 255, 0.9));\n      box-shadow: inset 0 -1px 0 rgba(148, 163, 184, 0.12);\n    }\n  }\n\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n\n\n\n\n.preview-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n  min-width: 0;\n  width: 100%;\n}\n\n.preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.factor-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.factor-suffix[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #64748b;\n}\n\n.policy-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.factor-evidence-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n  margin-bottom: 0.95rem;\n}\n\n.factor-evidence-toolbar__summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n}\n\n.factor-evidence-toolbar__stat[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.38rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.09);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n\n  i {\n    font-size: 0.72rem;\n  }\n\n  &--muted {\n    color: #475569;\n    background: rgba(148, 163, 184, 0.1);\n    border-color: rgba(148, 163, 184, 0.16);\n  }\n}\n\n.factor-evidence-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 0.9rem;\n  margin-bottom: 0.75rem;\n}\n\n.factor-evidence-card[_ngcontent-%COMP%] {\n  --factor-rgb: 59, 130, 246;\n  --factor-strong: #2563eb;\n  border-radius: 14px;\n  border: 1px solid rgba(var(--factor-rgb), 0.22);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.82)),\n    radial-gradient(120% 100% at 100% 0%, rgba(var(--factor-rgb), 0.14), transparent 65%);\n  box-shadow:\n    0 8px 22px rgba(15, 23, 42, 0.05),\n    0 0 0 1px rgba(var(--factor-rgb), 0.04) inset,\n    inset 0 1px 0 rgba(255, 255, 255, 0.5);\n  padding: 0.95rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 0 auto 0;\n    height: 3px;\n    background: linear-gradient(\n      90deg,\n      rgba(var(--factor-rgb), 0.95),\n      rgba(var(--factor-rgb), 0.45)\n    );\n    box-shadow: 0 0 18px rgba(var(--factor-rgb), 0.25);\n    pointer-events: none;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(var(--factor-rgb), 0.34);\n    box-shadow:\n      0 14px 28px rgba(15, 23, 42, 0.07),\n      0 0 0 1px rgba(var(--factor-rgb), 0.08) inset,\n      0 0 26px rgba(var(--factor-rgb), 0.1);\n  }\n\n  &[data-factor='budget'] {\n    --factor-rgb: 16, 185, 129;\n    --factor-strong: #059669;\n  }\n\n  &[data-factor='readiness'] {\n    --factor-rgb: 6, 182, 212;\n    --factor-strong: #0891b2;\n  }\n\n  &[data-factor='timeline'] {\n    --factor-rgb: 245, 158, 11;\n    --factor-strong: #d97706;\n  }\n\n  &[data-factor='problem'] {\n    --factor-rgb: 239, 68, 68;\n    --factor-strong: #dc2626;\n  }\n\n  &[data-factor='economicBuyer'] {\n    --factor-rgb: 139, 92, 246;\n    --factor-strong: #7c3aed;\n  }\n\n  &[data-factor='icpFit'] {\n    --factor-rgb: 236, 72, 153;\n    --factor-strong: #db2777;\n  }\n}\n\n.factor-evidence-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.factor-evidence-card__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.65rem;\n  min-width: 0;\n}\n\n.factor-evidence-card__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(14, 165, 233, 0.12));\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  color: #2563eb;\n\n  i {\n    font-size: 0.8rem;\n  }\n\n  &[data-factor='budget'] {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(34, 197, 94, 0.12));\n    border-color: rgba(16, 185, 129, 0.16);\n    color: #059669;\n  }\n\n  &[data-factor='timeline'] {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(251, 191, 36, 0.12));\n    border-color: rgba(245, 158, 11, 0.16);\n    color: #d97706;\n  }\n\n  &[data-factor='economicBuyer'] {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(168, 85, 247, 0.12));\n    border-color: rgba(139, 92, 246, 0.16);\n    color: #7c3aed;\n  }\n\n  &[data-factor='readiness'] {\n    background: linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(14, 165, 233, 0.12));\n    border-color: rgba(6, 182, 212, 0.18);\n    color: #0891b2;\n  }\n\n  &[data-factor='problem'] {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.16), rgba(248, 113, 113, 0.12));\n    border-color: rgba(239, 68, 68, 0.18);\n    color: #dc2626;\n  }\n\n  &[data-factor='icpFit'] {\n    background: linear-gradient(135deg, rgba(236, 72, 153, 0.16), rgba(244, 114, 182, 0.12));\n    border-color: rgba(236, 72, 153, 0.18);\n    color: #db2777;\n  }\n}\n\n.factor-evidence-card__title-text[_ngcontent-%COMP%] {\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: 0.92rem;\n    line-height: 1.25;\n    color: #0f172a;\n  }\n\n  small {\n    display: block;\n    margin-top: 0.15rem;\n    font-size: 0.74rem;\n    color: #64748b;\n    line-height: 1.3;\n  }\n}\n\n.factor-evidence-card__toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  align-self: center;\n  font-size: 0.78rem;\n  gap: 0.4rem;\n  padding: 0.35rem 0.55rem;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n}\n\n.factor-evidence-card__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.factor-evidence-card__label[_ngcontent-%COMP%] {\n  font-size: 0.77rem;\n  font-weight: 700;\n  color: #334155;\n}\n\n.factor-evidence-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  margin-top: 0.1rem;\n}\n\n.factor-evidence-card__count[_ngcontent-%COMP%] {\n  font-size: 0.73rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.factor-evidence-card__state[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #475569;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n\n  &.is-required {\n    color: #fff;\n    background: linear-gradient(135deg, rgba(var(--factor-rgb), 0.9), rgba(var(--factor-rgb), 0.65));\n    border-color: rgba(var(--factor-rgb), 0.3);\n    box-shadow: 0 4px 12px rgba(var(--factor-rgb), 0.16);\n  }\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    --qp-inline-pad: 1rem;\n    padding: 1rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .data-header[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 0.9rem;\n  }\n\n  .settings-form[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1rem;\n  }\n\n  .hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-accordion-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .policy-accordion-badge[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n\n  .policy-row[_ngcontent-%COMP%], \n   .policy-row--modifier[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .factor-evidence-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .factor-evidence-card__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .factor-evidence-card__toggle[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n}\n\n\n\n\n\n\n.qp-sidebar-tabs[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n\n\n.qp-sidebar-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--qp-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: _ngcontent-%COMP%_qp-side-breathe 2.2s ease-in-out infinite;\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active .qp-sidebar-label, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'] .qp-sidebar-label, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] .qp-sidebar-label {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active i.pi, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'] i.pi, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after, \n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: _ngcontent-%COMP%_qp-side-strip 3s linear infinite;\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(1) {\n  --qp-side-bg: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(2) {\n  --qp-side-bg: linear-gradient(135deg, #10b981 0%, #059669 100%);\n}\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(3) {\n  --qp-side-bg: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n}\n\n\n\n.qp-sidebar-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n\n\n.qp-sidebar-label[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n\n\n@keyframes _ngcontent-%COMP%_qp-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_qp-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n\n\n@media (max-width: 900px) {\n  [_nghost-%COMP%]     .qp-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: _ngcontent-%COMP%_qp-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_qp-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n\n\n[_nghost-%COMP%]     .qp-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QualificationPolicyPage, [{
        type: Component,
        args: [{ selector: 'app-qualification-policy-page', standalone: true, imports: [
                    ButtonModule,
                    CheckboxModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputTextModule,
                    InputNumberModule,
                    SelectModule,
                    MultiSelectModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterLink,
                    SkeletonModule,
                    AccordionModule,
                    TabsModule,
                    NgIf,
                    NgFor,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Qualification</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Qualification</span>\n        <span class=\"title-light\">Policy</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Define default conversion thresholds, manager approval guardrails, and signal modifiers that shape lead quality.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings\">\n          <i class=\"pi pi-arrow-left\"></i>\n          <span>Back to Settings</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings/qualification-thresholds\">\n          <i class=\"pi pi-sliders-h\"></i>\n          <span>Contextual Threshold Rules</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loading()\" (click)=\"loadSettings()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reload</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-shield\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Default Threshold</span>\n          <strong class=\"card-value\">{{ qualificationPolicy().defaultThreshold }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-lock\"></i>\n            Block below {{ qualificationPolicy().blockBelow }}\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-chart-line\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Modifiers</span>\n          <strong class=\"card-value\">{{ qualificationPolicy().modifiers.length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-bolt\"></i>\n            Dynamic adjustments\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"data-section\">\n    <div class=\"settings-layout\">\n      <div class=\"data-card\">\n        <div class=\"data-header\">\n          <div class=\"header-title\">\n            <h2>Qualification Policy</h2>\n            <span class=\"record-count\">Protect conversion quality with rules and overrides</span>\n          </div>\n          <div class=\"header-actions\">\n            <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\">\n              <i class=\"pi pi-check\"></i> Ready\n            </span>\n          </div>\n        </div>\n\n        <div class=\"loading-state\" *ngIf=\"loading()\">\n          <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n            <div class=\"skeleton skeleton-text\"></div>\n            <div class=\"skeleton skeleton-input\"></div>\n          </div>\n        </div>\n\n        <form class=\"settings-form\" *ngIf=\"!loading()\" [formGroup]=\"settingsForm\" (ngSubmit)=\"saveSettings()\">\n\n          <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VERTICAL SIDEBAR TABS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n          <p-tabs class=\"qp-sidebar-tabs\" [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n            <div class=\"qp-sidebar-layout\">\n              <!-- Sidebar Navigation -->\n              <p-tablist class=\"qp-sidebar-nav\">\n                <p-tab value=\"scoring\" [pt]=\"{ root: { class: 'qp-sidebar-item' } }\">\n                  <i class=\"pi pi-sliders-h\"></i>\n                  <span class=\"qp-sidebar-label\">Scoring Rules</span>\n                </p-tab>\n                <p-tab value=\"evidence\" [pt]=\"{ root: { class: 'qp-sidebar-item' } }\">\n                  <i class=\"pi pi-verified\"></i>\n                  <span class=\"qp-sidebar-label\">Evidence</span>\n                </p-tab>\n                <p-tab value=\"weights\" [pt]=\"{ root: { class: 'qp-sidebar-item' } }\">\n                  <i class=\"pi pi-chart-bar\"></i>\n                  <span class=\"qp-sidebar-label\">Weights &amp; Modifiers</span>\n                </p-tab>\n              </p-tablist>\n\n              <!-- Tab Content Area -->\n              <p-tabpanels class=\"qp-sidebar-content\">\n\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 1 \u2014 Scoring Rules \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"scoring\">\n                <p-accordion\n                  class=\"policy-accordion-shell\"\n                  [multiple]=\"true\"\n                  [value]=\"policyAccordionValue()\"\n                  (valueChange)=\"onPolicyAccordionValueChange($event)\"\n                >\n          <p-accordion-panel value=\"thresholds\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-sliders-h\"></i>\n                  <span>Thresholds & Guardrails</span>\n                </div>\n                <span class=\"policy-accordion-badge\">Default {{ qualificationPolicy().defaultThreshold }}</span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-sliders-h\"></i>\n              Thresholds & Guardrails\n            </h3>\n            <p class=\"section-description\">Define base conversion thresholds and approval guardrails</p>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"qp-defaultThreshold\">Default Threshold</label>\n                <div class=\"form-field__input\">\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-chart-bar\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber\n                      inputId=\"qp-defaultThreshold\"\n                      [ngModel]=\"qualificationPolicy().defaultThreshold\"\n                      (ngModelChange)=\"setPolicyField('defaultThreshold', $event)\"\n                      [min]=\"0\"\n                      [max]=\"100\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      styleClass=\"w-full\"\n                    ></p-inputNumber>\n                  </p-inputgroup>\n                  <small class=\"field-hint\">Baseline score required to convert</small>\n                </div>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"qp-managerApprovalBelow\">Manager Approval Below</label>\n                <div class=\"form-field__input\">\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-chart-bar\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber\n                      inputId=\"qp-managerApprovalBelow\"\n                      [ngModel]=\"qualificationPolicy().managerApprovalBelow\"\n                      (ngModelChange)=\"setPolicyField('managerApprovalBelow', $event)\"\n                      [min]=\"0\"\n                      [max]=\"100\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      styleClass=\"w-full\"\n                    ></p-inputNumber>\n                  </p-inputgroup>\n                  <small class=\"field-hint\">Require manager approval under this score</small>\n                </div>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"qp-blockBelow\">Block Below</label>\n                <div class=\"form-field__input\">\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-chart-bar\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber\n                      inputId=\"qp-blockBelow\"\n                      [ngModel]=\"qualificationPolicy().blockBelow\"\n                      (ngModelChange)=\"setPolicyField('blockBelow', $event)\"\n                      [min]=\"0\"\n                      [max]=\"100\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      styleClass=\"w-full\"\n                    ></p-inputNumber>\n                  </p-inputgroup>\n                  <small class=\"field-hint\">Hard stop unless overrides are enabled</small>\n                </div>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"qp-overrides\">Overrides</label>\n                <div class=\"form-field__input\">\n                  <div class=\"toggle-row\">\n                    <label class=\"checkbox-field\">\n                      <p-checkbox\n                        [binary]=\"true\"\n                        [ngModel]=\"qualificationPolicy().allowOverrides\"\n                        (ngModelChange)=\"setPolicyField('allowOverrides', $event)\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                      ></p-checkbox>\n                      <span>Allow overrides</span>\n                    </label>\n                    <label class=\"checkbox-field\">\n                      <p-checkbox\n                        [binary]=\"true\"\n                        [ngModel]=\"qualificationPolicy().requireOverrideReason\"\n                        (ngModelChange)=\"setPolicyField('requireOverrideReason', $event)\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                      ></p-checkbox>\n                      <span>Require override reason</span>\n                    </label>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"qp-leadListDisplay\">Lead List Display</label>\n                <div class=\"form-field__input\">\n                  <div class=\"toggle-row\">\n                    <label class=\"checkbox-field\">\n                      <p-checkbox\n                        [binary]=\"true\"\n                        [ngModel]=\"qualificationPolicy().showCqvsInLeadList\"\n                        (ngModelChange)=\"setPolicyField('showCqvsInLeadList', $event)\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                      ></p-checkbox>\n                      <span>Enable CQVS coach panel in Leads list</span>\n                    </label>\n                  </div>\n                  <small class=\"field-hint\">Adds a compact \"Coach\" inspector for CQVS breakdown, weakest factor, and next evidence.</small>\n                </div>\n              </div>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"qualification-factors\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-list-check\"></i>\n                  <span>Qualification Factors</span>\n                </div>\n                <span class=\"policy-accordion-badge\">\n                  {{ activeQualificationFactorsCount() }} active / {{ requiredQualificationFactorsCount() }} required\n                </span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n              <section class=\"form-card\">\n                <h3 class=\"section-title section-title--info\">\n                  <i class=\"pi pi-list-check\"></i>\n                  Qualification Factors\n                </h3>\n                <p class=\"section-description\">\n                  Control which qualification factors are used, how they are labeled, and whether they are required for qualification.\n                </p>\n\n                <div class=\"policy-header\">\n                  <h4>Factor catalog</h4>\n                  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"addCustomQualificationFactor()\">\n                    <i class=\"pi pi-plus\"></i>\n                    Add custom factor\n                  </button>\n                </div>\n\n                <div class=\"factor-evidence-grid\">\n                  <article class=\"factor-evidence-card\" [attr.data-factor]=\"factor.key\" *ngFor=\"let factor of qualificationFactors()\">\n                    <div class=\"factor-evidence-card__header\">\n                      <div class=\"factor-evidence-card__title\">\n                        <span class=\"factor-evidence-card__icon\" [attr.data-factor]=\"factor.key\">\n                          <i class=\"pi pi-briefcase\"></i>\n                        </span>\n                        <div class=\"factor-evidence-card__title-text\">\n                          <h4>{{ factor.displayLabel }}</h4>\n                          <p>{{ factor.factorType === 'custom' ? 'Custom factor' : factor.key }}</p>\n                        </div>\n                      </div>\n                      <div class=\"factor-evidence-card__toggle\">\n                        <label class=\"checkbox-field\">\n                          <p-checkbox\n                            [binary]=\"true\"\n                            [ngModel]=\"factor.isActive\"\n                            (ngModelChange)=\"updateQualificationFactor(factor.key, { isActive: !!$event })\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                          ></p-checkbox>\n                          <span>Active</span>\n                        </label>\n                        <button\n                          *ngIf=\"isCustomQualificationFactor(factor)\"\n                          type=\"button\"\n                          class=\"btn btn-ghost btn-sm\"\n                          (click)=\"removeCustomQualificationFactor(factor.key)\">\n                          <i class=\"pi pi-trash\"></i>\n                          Remove\n                        </button>\n                      </div>\n                    </div>\n\n                    <div class=\"factor-evidence-card__body\">\n                      <div class=\"form-grid form-grid--2col\">\n                        <div class=\"form-field\">\n                          <label [for]=\"'qp-factor-label-' + factor.key\">Display label</label>\n                          <input\n                            pInputText\n                            [id]=\"'qp-factor-label-' + factor.key\"\n                            [ngModel]=\"factor.displayLabel\"\n                            (ngModelChange)=\"updateQualificationFactor(factor.key, { displayLabel: $event })\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            maxlength=\"80\"\n                          />\n                        </div>\n                        <div class=\"form-field\">\n                          <label [for]=\"'qp-factor-order-' + factor.key\">Order</label>\n                          <p-inputNumber\n                            [inputId]=\"'qp-factor-order-' + factor.key\"\n                            [ngModel]=\"factor.order\"\n                            (ngModelChange)=\"updateQualificationFactor(factor.key, { order: $event })\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            [min]=\"1\"\n                            [max]=\"999\"\n                            styleClass=\"w-full\"\n                          ></p-inputNumber>\n                        </div>\n                      </div>\n\n                      <div class=\"form-grid form-grid--2col\" *ngIf=\"isCustomQualificationFactor(factor)\">\n                        <div class=\"form-field\">\n                          <label [for]=\"'qp-factor-type-' + factor.key\">Response type</label>\n                          <p-select\n                            [inputId]=\"'qp-factor-type-' + factor.key\"\n                            [options]=\"customFactorValueTypeOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [ngModel]=\"factor.valueType\"\n                            (ngModelChange)=\"updateQualificationFactor(factor.key, { valueType: $event, options: $event === 'text' ? [] : (factor.options.length ? factor.options : ['Unknown / not assessed', 'Observed', 'Confirmed', 'Blocked']) })\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            appendTo=\"body\"\n                            styleClass=\"w-full\"\n                          ></p-select>\n                        </div>\n                        <div class=\"form-field\">\n                          <label [for]=\"'qp-factor-options-' + factor.key\">Options</label>\n                          <textarea\n                            pInputText\n                            [id]=\"'qp-factor-options-' + factor.key\"\n                            [ngModel]=\"qualificationFactorOptionsText(factor)\"\n                            (ngModelChange)=\"updateQualificationFactorOptions(factor.key, $event)\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            [disabled]=\"factor.valueType === 'text'\"\n                            rows=\"4\"\n                            placeholder=\"One option per line\"\n                          ></textarea>\n                          <small class=\"field-hint\">Used only for single-select custom factors.</small>\n                        </div>\n                      </div>\n\n                      <div class=\"toggle-row\">\n                        <label class=\"checkbox-field\">\n                          <p-checkbox\n                            [binary]=\"true\"\n                            [ngModel]=\"factor.isRequired\"\n                            (ngModelChange)=\"updateQualificationFactor(factor.key, { isRequired: !!$event })\"\n                            [ngModelOptions]=\"{ standalone: true }\"\n                            [disabled]=\"!factor.isActive\"\n                          ></p-checkbox>\n                          <span>Required for qualification</span>\n                        </label>\n                      </div>\n                    </div>\n                  </article>\n                </div>\n              </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 2 \u2014 Evidence \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"evidence\">\n                <p-accordion\n                  class=\"policy-accordion-shell\"\n                  [multiple]=\"true\"\n                  [value]=\"policyAccordionValue()\"\n                  (valueChange)=\"onPolicyAccordionValueChange($event)\"\n                >\n\n          <p-accordion-panel value=\"evidence-enforcement\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-check-square\"></i>\n                  <span>Evidence Enforcement</span>\n                </div>\n                <span class=\"policy-accordion-badge\" [class.is-off]=\"!qualificationPolicy().requireEvidenceBeforeQualified\">\n                  {{ qualificationPolicy().requireEvidenceBeforeQualified ? (qualificationPolicy().minimumEvidenceCoveragePercent + '% min') : 'Disabled' }}\n                </span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-check-square\"></i>\n              Evidence Enforcement\n            </h3>\n            <p class=\"section-description\">\n              Define the minimum evidence coverage required before a lead can move to Qualified.\n            </p>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"qp-evidenceGate\">Qualification evidence gate</label>\n                <div class=\"form-field__input\">\n                  <div class=\"toggle-row\">\n                    <label class=\"checkbox-field\">\n                      <p-checkbox\n                        [binary]=\"true\"\n                        [ngModel]=\"qualificationPolicy().requireEvidenceBeforeQualified\"\n                        (ngModelChange)=\"setPolicyField('requireEvidenceBeforeQualified', $event)\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                      ></p-checkbox>\n                      <span>Require evidence before setting lead to Qualified</span>\n                    </label>\n                  </div>\n                  <small class=\"field-hint\">Uses truth/evidence coverage, not factor selections alone.</small>\n                </div>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"qp-minEvidenceCoverage\">Minimum evidence coverage (%)</label>\n                <div class=\"form-field__input\">\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-chart-bar\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber\n                      inputId=\"qp-minEvidenceCoverage\"\n                      [ngModel]=\"qualificationPolicy().minimumEvidenceCoveragePercent\"\n                      (ngModelChange)=\"setPolicyField('minimumEvidenceCoveragePercent', $event)\"\n                      [min]=\"0\"\n                      [max]=\"100\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      [disabled]=\"!qualificationPolicy().requireEvidenceBeforeQualified\"\n                      styleClass=\"w-full\"\n                    ></p-inputNumber>\n                  </p-inputgroup>\n                  <small class=\"field-hint\">\n                    Recommended: 50% (roughly 3 of 6 evidence fields) before qualification.\n                  </small>\n                </div>\n              </div>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"factor-evidence\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-sitemap\"></i>\n                  <span>Factor Evidence Mapping</span>\n                </div>\n                <span class=\"policy-accordion-badge\">\n                  {{ requiredFactorEvidenceCount() }}/{{ activeQualificationFactorsCount() }} active require evidence\n                </span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-sitemap\"></i>\n              Factor Evidence Mapping\n            </h3>\n            <p class=\"section-description\">\n              Define which evidence sources are shown for each qualification factor and whether factor-level evidence is expected.\n            </p>\n\n            <div class=\"policy-block\">\n              <div class=\"factor-evidence-toolbar\">\n                <div class=\"factor-evidence-toolbar__summary\">\n                  <span class=\"factor-evidence-toolbar__stat\">\n                    <i class=\"pi pi-shield\"></i>\n                    {{ requiredFactorEvidenceCount() }} factors require evidence\n                  </span>\n                  <span class=\"factor-evidence-toolbar__stat factor-evidence-toolbar__stat--muted\">\n                    <i class=\"pi pi-list\"></i>\n                    {{ qualificationPolicy().evidenceSources.length }} evidence sources available\n                  </span>\n                </div>\n                <p class=\"hint\">Configure source choices per factor so reps only see relevant options in the lead form.</p>\n              </div>\n\n              <div class=\"factor-evidence-grid\">\n                <article class=\"factor-evidence-card\" [attr.data-factor]=\"factor.key\" *ngFor=\"let factor of qualificationFactors()\">\n                  <div class=\"factor-evidence-card__header\">\n                    <div class=\"factor-evidence-card__title\">\n                      <span class=\"factor-evidence-card__icon\" [attr.data-factor]=\"factor.key\">\n                        <i class=\"pi pi-sparkles\"></i>\n                      </span>\n                      <div class=\"factor-evidence-card__title-text\">\n                        <strong>{{ factor.displayLabel }}</strong>\n                        <small>Evidence source options shown in Lead Qualification</small>\n                      </div>\n                    </div>\n\n                    <label class=\"checkbox-field factor-evidence-card__toggle\">\n                      <p-checkbox\n                        [binary]=\"true\"\n                        [ngModel]=\"factorEvidenceRuleFor(factor.key).requireEvidence\"\n                        (ngModelChange)=\"updateFactorEvidenceRequire(factor.key, $event)\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                      ></p-checkbox>\n                      <span>Require evidence</span>\n                    </label>\n                  </div>\n\n                  <div class=\"factor-evidence-card__body\">\n                    <label class=\"factor-evidence-card__label\">Allowed evidence sources</label>\n                    <p-multiSelect\n                      [options]=\"qualificationPolicy().evidenceSources\"\n                      [ngModel]=\"factorEvidenceRuleFor(factor.key).allowedEvidenceSources\"\n                      (ngModelChange)=\"updateFactorEvidenceSources(factor.key, $event)\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      [filter]=\"true\"\n                      [showClear]=\"true\"\n                      [display]=\"'chip'\"\n                      defaultLabel=\"Select sources\"\n                      appendTo=\"body\"\n                      styleClass=\"w-full\"\n                    ></p-multiSelect>\n                    <div class=\"factor-evidence-card__meta\">\n                      <span class=\"factor-evidence-card__count\">\n                        {{ factorEvidenceRuleFor(factor.key).allowedEvidenceSources.length }} selected\n                      </span>\n                      <span class=\"factor-evidence-card__state\" [class.is-required]=\"factorEvidenceRuleFor(factor.key).requireEvidence\">\n                        {{ factorEvidenceRuleFor(factor.key).requireEvidence ? 'Gate enforced' : 'Optional evidence' }}\n                      </span>\n                    </div>\n                  </div>\n                </article>\n              </div>\n              <p class=\"hint\">Tip: keep sources narrow per factor to reduce rep confusion in the Lead Qualification tab.</p>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"evidence-sources\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-list-check\"></i>\n                  <span>Evidence Sources</span>\n                </div>\n                <span class=\"policy-accordion-badge\">{{ qualificationPolicy().evidenceSources.length }} sources</span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-list-check\"></i>\n              Evidence Sources\n            </h3>\n            <p class=\"section-description\">\n              Configure the evidence source list shown in Lead Qualification. Use clear source names that reps can pick quickly.\n            </p>\n\n            <div class=\"policy-block\">\n              <div class=\"policy-header\">\n                <h4>Evidence Source Catalog</h4>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"addEvidenceSource()\">\n                  <i class=\"pi pi-plus\"></i>\n                  Add source\n                </button>\n              </div>\n              <div class=\"policy-list\" *ngIf=\"qualificationPolicy().evidenceSources.length; else noEvidenceSources\">\n                <div class=\"policy-row policy-row--modifier\" *ngFor=\"let source of qualificationPolicy().evidenceSources; let i = index\">\n                  <input\n                    pInputText\n                    [ngModel]=\"source\"\n                    (ngModelChange)=\"updateEvidenceSource(i, $event)\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    class=\"w-full\"\n                    [readonly]=\"source.toLowerCase() === 'no evidence yet'\"\n                  />\n                  <span class=\"factor-suffix\" *ngIf=\"source.toLowerCase() === 'no evidence yet'\">Required</span>\n                  <button\n                    *ngIf=\"source.toLowerCase() !== 'no evidence yet'\"\n                    type=\"button\"\n                    class=\"btn btn-ghost\"\n                    (click)=\"removeEvidenceSource(i)\"\n                  >\n                    <i class=\"pi pi-times\"></i>\n                  </button>\n                </div>\n              </div>\n              <ng-template #noEvidenceSources>\n                <p class=\"hint\">No sources configured. Add at least one evidence source.</p>\n              </ng-template>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 3 \u2014 Weights & Modifiers \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"weights\">\n                <p-accordion\n                  class=\"policy-accordion-shell\"\n                  [multiple]=\"true\"\n                  [value]=\"policyAccordionValue()\"\n                  (valueChange)=\"onPolicyAccordionValueChange($event)\"\n                >\n\n          <p-accordion-panel value=\"modifiers\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-bolt\"></i>\n                  <span>Modifiers</span>\n                </div>\n                <span class=\"policy-accordion-badge\">{{ qualificationPolicy().modifiers.length }} rules</span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-bolt\"></i>\n              Modifiers\n            </h3>\n            <p class=\"section-description\">Signals that adjust the effective threshold dynamically</p>\n\n            <div class=\"policy-block\">\n              <div class=\"policy-header\">\n                <h4>Qualification Modifiers</h4>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"addModifierRule()\">\n                  <i class=\"pi pi-plus\"></i>\n                  Add modifier\n                </button>\n              </div>\n              <div class=\"policy-list\" *ngIf=\"qualificationPolicy().modifiers.length; else noModifiers\">\n                <div class=\"policy-row policy-row--modifier\" *ngFor=\"let modifier of qualificationPolicy().modifiers; let i = index\">\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"modifierKeyOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"modifier.key\"\n                    (ngModelChange)=\"updateModifierRule(i, { key: $event })\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    placeholder=\"Modifier\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                  <p-inputNumber\n                    [ngModel]=\"modifier.delta\"\n                    (ngModelChange)=\"updateModifierRule(i, { delta: $event })\"\n                    [min]=\"-50\"\n                    [max]=\"50\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    styleClass=\"w-full\"\n                  ></p-inputNumber>\n                  <button type=\"button\" class=\"btn btn-ghost\" (click)=\"removeModifierRule(i)\">\n                    <i class=\"pi pi-times\"></i>\n                  </button>\n                </div>\n              </div>\n              <ng-template #noModifiers>\n                <p class=\"hint\">No modifiers defined. Add signals to adjust the threshold dynamically.</p>\n              </ng-template>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"exposure-weights\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-exclamation-circle\"></i>\n                  <span>Exposure Weights</span>\n                </div>\n                <span class=\"policy-accordion-badge\" [class.is-warn]=\"exposureWeightTotal() !== 100\">\n                  Total {{ exposureWeightTotal() }}%\n                </span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-exclamation-circle\"></i>\n              Exposure Weights\n            </h3>\n            <p class=\"section-description\">\n              Control how much each qualification factor contributes to Cost of Not Knowing exposure.\n            </p>\n\n            <div class=\"policy-block\">\n              <div class=\"policy-header\">\n                <h4>Qualification Factors</h4>\n                <span class=\"hint\">Total: {{ exposureWeightTotal() }}%</span>\n              </div>\n              <div class=\"policy-list\">\n                <div class=\"policy-row policy-row--modifier\" *ngFor=\"let factor of exposureWeightOptions\">\n                  <div class=\"factor-label\">{{ factor.label }}</div>\n                  <p-inputNumber\n                    [ngModel]=\"exposureWeightFor(factor.key)\"\n                    (ngModelChange)=\"updateExposureWeight(factor.key, $event)\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    styleClass=\"w-full\"\n                  ></p-inputNumber>\n                  <span class=\"factor-suffix\">%</span>\n                </div>\n              </div>\n              <p class=\"hint\" *ngIf=\"exposureWeightTotal() !== 100\">\n                We recommend weights totaling 100% for consistent Cost of Not Knowing scoring.\n              </p>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"lead-data-weights\">\n            <p-accordion-header>\n              <div class=\"policy-accordion-header\">\n                <div class=\"policy-accordion-title\">\n                  <i class=\"pi pi-chart-line\"></i>\n                  <span>Lead Data Quality Weights</span>\n                </div>\n                <span class=\"policy-accordion-badge\" [class.is-warn]=\"leadDataWeightTotal() !== 100\">\n                  Total {{ leadDataWeightTotal() }}%\n                </span>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-chart-line\"></i>\n              Lead Data Quality Weights\n            </h3>\n            <p class=\"section-description\">\n              Configure how lead basic fields contribute to Lead Data Quality Score (0-100).\n            </p>\n\n            <div class=\"policy-block\">\n              <div class=\"policy-header\">\n                <h4>Lead Data Fields</h4>\n                <span class=\"hint\">Total: {{ leadDataWeightTotal() }}%</span>\n              </div>\n              <div class=\"policy-list\">\n                <div class=\"policy-row policy-row--modifier\" *ngFor=\"let field of leadDataWeightOptions\">\n                  <div class=\"factor-label\">{{ field.label }}</div>\n                  <p-inputNumber\n                    [ngModel]=\"leadDataWeightFor(field.key)\"\n                    (ngModelChange)=\"updateLeadDataWeight(field.key, $event)\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    styleClass=\"w-full\"\n                  ></p-inputNumber>\n                  <span class=\"factor-suffix\">%</span>\n                </div>\n              </div>\n              <p class=\"hint\" *ngIf=\"leadDataWeightTotal() !== 100\">\n                We recommend weights totaling 100% for consistent Lead Data Quality scoring.\n              </p>\n            </div>\n          </section>\n            </p-accordion-content>\n          </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n            </p-tabpanels>\n            </div>\n          </p-tabs>\n\n          <div class=\"form-actions\">\n            <button type=\"button\" class=\"btn btn-ghost\" (click)=\"loadSettings()\" [disabled]=\"loading()\">\n              <i class=\"pi pi-refresh\"></i>\n              Reset\n            </button>\n            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving() || !canManageAdmin()\">\n              <i class=\"pi pi-save\" *ngIf=\"!saving()\"></i>\n              <i class=\"pi pi-spinner pi-spin\" *ngIf=\"saving()\"></i>\n              {{ saving() ? 'Saving...' : 'Save Qualification Policy' }}\n            </button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </section>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   WORKSPACE SETTINGS PAGE - Premium Glass UI with Card Focus Effects\n   Using form-page-styles mixins for consistent design system\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HOST SETUP\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGE CONTAINER - Premium Glass Base with Animated Orbs\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.page-container {\n  @include form.form-page-base;\n  --qp-inline-pad: 2rem;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n  width: 100%;\n}\n\n/* Animated Background Orbs */\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n\n  @media (min-width: 1200px) {\n    grid-template-columns: minmax(0, 1fr) 360px;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO VISUAL CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  min-width: 0;\n\n  @media (min-width: 700px) and (max-width: 1199px) {\n    flex-direction: row;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  /* Gradient border glow on hover */\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   METRICS SECTION - KPI Dashboard Cards\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS - Using form-page-styles patterns\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  @include form.button-primary;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost {\n  @include form.button-ghost;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA SECTION & LAYOUT\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-section {\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n  width: 100%;\n}\n\n.data-section > .settings-layout {\n  width: 100%;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 1.5rem;\n  width: 100%;\n  align-items: start;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA CARD - Premium Glass with Focus Pop Effect\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-card {\n  @include form.form-section;\n  overflow: hidden;\n  min-width: 0;\n  width: 100%;\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   LOADING STATE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.loading-state {\n  padding: 1.5rem;\n}\n\n.skeleton-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input {\n  height: 42px;\n  width: 100%;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM STYLES - Premium Glass Cards with Focus Effects\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.settings-form {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.policy-accordion-shell {\n  display: block;\n}\n\n.policy-accordion-header {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  min-width: 0;\n}\n\n.policy-accordion-title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.88);\n\n  i {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.1));\n    color: #2563eb;\n    font-size: 0.8rem;\n    flex-shrink: 0;\n  }\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.policy-accordion-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.1);\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  flex-shrink: 0;\n\n  &.is-off {\n    color: rgba(71, 85, 105, 0.9);\n    background: rgba(148, 163, 184, 0.12);\n    border-color: rgba(148, 163, 184, 0.2);\n  }\n\n  &.is-warn {\n    color: #b45309;\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.22);\n  }\n}\n\n/* Form Card - Using design system form-section mixin */\n.form-card {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.policy-accordion-shell .form-card {\n  background: transparent;\n  border: 0;\n  box-shadow: none;\n  padding: 0.4rem 0.2rem 0.2rem;\n\n  .section-title,\n  .section-description {\n    display: none;\n  }\n}\n\n.section-title {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  /* Variant: Info (blue) */\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  /* Variant: Warning (amber) */\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  /* Variant: Success (green) */\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-card-inner {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step:last-child {\n  margin-bottom: 0;\n}\n\n.step-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .form-field__input,\n  > .toggle-row {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  .required {\n    @include form.form-required;\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.form-field__input {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.field-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n/* Keep time zone option rows aligned with flag icons. */\n:host ::ng-deep .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n// PrimeNG overrides with premium focus effects\n:host ::ng-deep {\n  .policy-accordion-shell {\n    .p-accordionpanel {\n      margin-bottom: 0.75rem;\n      border-radius: 16px;\n      overflow: hidden;\n      border: 1px solid rgba(148, 163, 184, 0.15);\n      background: rgba(255, 255, 255, 0.68);\n      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(18px);\n    }\n\n    .p-accordionheader {\n      background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.7));\n      border: 0;\n    }\n\n    .p-accordionheader-link {\n      width: 100%;\n      padding: 0.9rem 1rem;\n      background: transparent;\n      border: 0;\n      color: inherit;\n    }\n\n    .p-accordioncontent-content {\n      padding: 0.15rem 0.9rem 0.9rem;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.45));\n    }\n\n    .p-accordionpanel-active .p-accordionheader {\n      background: linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(245, 243, 255, 0.9));\n      box-shadow: inset 0 -1px 0 rgba(148, 163, 184, 0.12);\n    }\n  }\n\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PREVIEW CARD - Premium Glass with Focus Pop\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.preview-card {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n  min-width: 0;\n  width: 100%;\n}\n\n.preview-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS BADGES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header h4 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.factor-label {\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.factor-suffix {\n  font-weight: 600;\n  color: #64748b;\n}\n\n.policy-row .btn {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.factor-evidence-toolbar {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n  margin-bottom: 0.95rem;\n}\n\n.factor-evidence-toolbar__summary {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n}\n\n.factor-evidence-toolbar__stat {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.38rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.09);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n\n  i {\n    font-size: 0.72rem;\n  }\n\n  &--muted {\n    color: #475569;\n    background: rgba(148, 163, 184, 0.1);\n    border-color: rgba(148, 163, 184, 0.16);\n  }\n}\n\n.factor-evidence-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 0.9rem;\n  margin-bottom: 0.75rem;\n}\n\n.factor-evidence-card {\n  --factor-rgb: 59, 130, 246;\n  --factor-strong: #2563eb;\n  border-radius: 14px;\n  border: 1px solid rgba(var(--factor-rgb), 0.22);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.82)),\n    radial-gradient(120% 100% at 100% 0%, rgba(var(--factor-rgb), 0.14), transparent 65%);\n  box-shadow:\n    0 8px 22px rgba(15, 23, 42, 0.05),\n    0 0 0 1px rgba(var(--factor-rgb), 0.04) inset,\n    inset 0 1px 0 rgba(255, 255, 255, 0.5);\n  padding: 0.95rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 0 auto 0;\n    height: 3px;\n    background: linear-gradient(\n      90deg,\n      rgba(var(--factor-rgb), 0.95),\n      rgba(var(--factor-rgb), 0.45)\n    );\n    box-shadow: 0 0 18px rgba(var(--factor-rgb), 0.25);\n    pointer-events: none;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(var(--factor-rgb), 0.34);\n    box-shadow:\n      0 14px 28px rgba(15, 23, 42, 0.07),\n      0 0 0 1px rgba(var(--factor-rgb), 0.08) inset,\n      0 0 26px rgba(var(--factor-rgb), 0.1);\n  }\n\n  &[data-factor='budget'] {\n    --factor-rgb: 16, 185, 129;\n    --factor-strong: #059669;\n  }\n\n  &[data-factor='readiness'] {\n    --factor-rgb: 6, 182, 212;\n    --factor-strong: #0891b2;\n  }\n\n  &[data-factor='timeline'] {\n    --factor-rgb: 245, 158, 11;\n    --factor-strong: #d97706;\n  }\n\n  &[data-factor='problem'] {\n    --factor-rgb: 239, 68, 68;\n    --factor-strong: #dc2626;\n  }\n\n  &[data-factor='economicBuyer'] {\n    --factor-rgb: 139, 92, 246;\n    --factor-strong: #7c3aed;\n  }\n\n  &[data-factor='icpFit'] {\n    --factor-rgb: 236, 72, 153;\n    --factor-strong: #db2777;\n  }\n}\n\n.factor-evidence-card__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.factor-evidence-card__title {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.65rem;\n  min-width: 0;\n}\n\n.factor-evidence-card__icon {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(14, 165, 233, 0.12));\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  color: #2563eb;\n\n  i {\n    font-size: 0.8rem;\n  }\n\n  &[data-factor='budget'] {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(34, 197, 94, 0.12));\n    border-color: rgba(16, 185, 129, 0.16);\n    color: #059669;\n  }\n\n  &[data-factor='timeline'] {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(251, 191, 36, 0.12));\n    border-color: rgba(245, 158, 11, 0.16);\n    color: #d97706;\n  }\n\n  &[data-factor='economicBuyer'] {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(168, 85, 247, 0.12));\n    border-color: rgba(139, 92, 246, 0.16);\n    color: #7c3aed;\n  }\n\n  &[data-factor='readiness'] {\n    background: linear-gradient(135deg, rgba(6, 182, 212, 0.18), rgba(14, 165, 233, 0.12));\n    border-color: rgba(6, 182, 212, 0.18);\n    color: #0891b2;\n  }\n\n  &[data-factor='problem'] {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.16), rgba(248, 113, 113, 0.12));\n    border-color: rgba(239, 68, 68, 0.18);\n    color: #dc2626;\n  }\n\n  &[data-factor='icpFit'] {\n    background: linear-gradient(135deg, rgba(236, 72, 153, 0.16), rgba(244, 114, 182, 0.12));\n    border-color: rgba(236, 72, 153, 0.18);\n    color: #db2777;\n  }\n}\n\n.factor-evidence-card__title-text {\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: 0.92rem;\n    line-height: 1.25;\n    color: #0f172a;\n  }\n\n  small {\n    display: block;\n    margin-top: 0.15rem;\n    font-size: 0.74rem;\n    color: #64748b;\n    line-height: 1.3;\n  }\n}\n\n.factor-evidence-card__toggle {\n  flex-shrink: 0;\n  align-self: center;\n  font-size: 0.78rem;\n  gap: 0.4rem;\n  padding: 0.35rem 0.55rem;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n}\n\n.factor-evidence-card__body {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.factor-evidence-card__label {\n  font-size: 0.77rem;\n  font-weight: 700;\n  color: #334155;\n}\n\n.factor-evidence-card__meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  margin-top: 0.1rem;\n}\n\n.factor-evidence-card__count {\n  font-size: 0.73rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.factor-evidence-card__state {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #475569;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n\n  &.is-required {\n    color: #fff;\n    background: linear-gradient(135deg, rgba(var(--factor-rgb), 0.9), rgba(var(--factor-rgb), 0.65));\n    border-color: rgba(var(--factor-rgb), 0.3);\n    box-shadow: 0 4px 12px rgba(var(--factor-rgb), 0.16);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    --qp-inline-pad: 1rem;\n    padding: 1rem;\n  }\n\n  .hero-section {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .data-header {\n    padding: 1rem 1rem 0.9rem;\n  }\n\n  .settings-form {\n    padding: 1rem;\n    gap: 1rem;\n  }\n\n  .hero-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card {\n    position: static;\n  }\n\n  .form-section {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-accordion-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .policy-accordion-badge {\n    align-self: flex-start;\n  }\n\n  .policy-row,\n  .policy-row--modifier {\n    grid-template-columns: 1fr;\n  }\n\n  .factor-evidence-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .factor-evidence-card__header {\n    flex-direction: column;\n  }\n\n  .factor-evidence-card__toggle {\n    align-self: flex-start;\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   SIDEBAR TABS \u2014 same pattern as Workspace Settings page\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.qp-sidebar-tabs {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n/* Side-by-side grid: sidebar | content */\n.qp-sidebar-layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n/* \u2500\u2500 Sidebar navigation column \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n/* \u2500\u2500 Individual sidebar item \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n/* Icon inside sidebar item */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n/* Subtle glass sheen on top half */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n/* \u2500\u2500 Hover state \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n/* \u2500\u2500 Focus visible \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n/* \u2500\u2500 Active state \u2014 gradient glow pill \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'],\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--qp-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: qp-side-breathe 2.2s ease-in-out infinite;\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'],\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active .qp-sidebar-label,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'] .qp-sidebar-label,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] .qp-sidebar-label {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active i.pi,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'] i.pi,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n/* Active left accent strip */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after,\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: qp-side-strip 3s linear infinite;\n}\n\n/* \u2500\u2500 Per-tab gradient colors (sidebar) \u2500\u2500 */\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(1) {\n  --qp-side-bg: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(2) {\n  --qp-side-bg: linear-gradient(135deg, #10b981 0%, #059669 100%);\n}\n\n:host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item:nth-child(3) {\n  --qp-side-bg: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n}\n\n/* \u2500\u2500 Content area \u2500\u2500 */\n.qp-sidebar-content {\n  flex: 1;\n  min-width: 0;\n}\n\n/* \u2500\u2500 Sidebar label \u2500\u2500 */\n.qp-sidebar-label {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n/* \u2500\u2500 Animations \u2500\u2500 */\n@keyframes qp-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes qp-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n/* Mobile: sidebar collapses to horizontal row */\n@media (max-width: 900px) {\n  :host ::ng-deep .qp-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  :host ::ng-deep .qp-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .qp-sidebar-nav .p-tab.qp-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: qp-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes qp-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n/* Hide PrimeNG default tab ink bar */\n:host ::ng-deep .qp-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QualificationPolicyPage, { className: "QualificationPolicyPage", filePath: "src/app/crm/features/settings/pages/qualification-policy.page.ts", lineNumber: 63 }); })();
