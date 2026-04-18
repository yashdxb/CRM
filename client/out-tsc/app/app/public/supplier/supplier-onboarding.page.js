import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { BusinessType, CERTIFICATION_TYPES, EMPLOYEE_RANGES, INDUSTRIES } from './models/supplier-registration.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/select";
import * as i6 from "primeng/datepicker";
import * as i7 from "primeng/fileupload";
import * as i8 from "primeng/checkbox";
import * as i9 from "primeng/message";
import * as i10 from "primeng/toast";
import * as i11 from "primeng/tabs";
const _c0 = () => ({ width: "100%" });
function SupplierOnboardingPage_small_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "companyName"), " ");
} }
function SupplierOnboardingPage_small_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "taxId"), " ");
} }
function SupplierOnboardingPage_small_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "businessType"), " ");
} }
function SupplierOnboardingPage_small_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "industry"), " ");
} }
function SupplierOnboardingPage_small_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "yearEstablished"), " ");
} }
function SupplierOnboardingPage_small_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "numberOfEmployees"), " ");
} }
function SupplierOnboardingPage_small_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.companyForm, "website"), " ");
} }
function SupplierOnboardingPage_small_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "primaryContactName"), " ");
} }
function SupplierOnboardingPage_small_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "primaryContactPosition"), " ");
} }
function SupplierOnboardingPage_small_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "primaryContactEmail"), " ");
} }
function SupplierOnboardingPage_small_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "primaryContactPhone"), " ");
} }
function SupplierOnboardingPage_small_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "street"), " ");
} }
function SupplierOnboardingPage_small_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "city"), " ");
} }
function SupplierOnboardingPage_small_118_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "state"), " ");
} }
function SupplierOnboardingPage_small_124_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "country"), " ");
} }
function SupplierOnboardingPage_small_129_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.contactForm, "postalCode"), " ");
} }
function SupplierOnboardingPage_div_140_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "div", 76)(2, "div", 77);
    i0.ɵɵelement(3, "i", 78);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 79)(7, "span", 80);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 81);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 82);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 83)(16, "p-button", 84);
    i0.ɵɵlistener("onClick", function SupplierOnboardingPage_div_140_div_1_Template_p_button_onClick_16_listener() { const ctx_r2 = i0.ɵɵrestoreView(_r2); const cert_r4 = ctx_r2.$implicit; const i_r5 = ctx_r2.index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editCertification(cert_r4, i_r5)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p-button", 85);
    i0.ɵɵlistener("onClick", function SupplierOnboardingPage_div_140_div_1_Template_p_button_onClick_17_listener() { const i_r5 = i0.ɵɵrestoreView(_r2).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeCertification(i_r5)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const cert_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(cert_r4.type);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(cert_r4.number);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind2(11, 10, cert_r4.issuedDate, "MM/dd/yyyy"), " - ", i0.ɵɵpipeBind2(12, 13, cert_r4.expiryDate, "MM/dd/yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", cert_r4.fileName, " (", ctx_r0.formatFileSize(cert_r4.fileSize || 0), ")");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("text", true)("rounded", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", true)("rounded", true);
} }
function SupplierOnboardingPage_div_140_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtemplate(1, SupplierOnboardingPage_div_140_div_1_Template, 18, 16, "div", 74);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.certifications);
} }
function SupplierOnboardingPage_div_141_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 86)(1, "p-button", 87);
    i0.ɵɵlistener("onClick", function SupplierOnboardingPage_div_141_Template_p_button_onClick_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openCertificationForm()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵproperty("outlined", true);
} }
function SupplierOnboardingPage_div_142_small_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.certificationForm, "type"), " ");
} }
function SupplierOnboardingPage_div_142_small_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.certificationForm, "number"), " ");
} }
function SupplierOnboardingPage_div_142_small_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.certificationForm, "issuedDate"), " ");
} }
function SupplierOnboardingPage_div_142_small_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.certificationForm, "expiryDate"), " ");
} }
function SupplierOnboardingPage_div_142_small_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.certificationForm, "file"), " ");
} }
function SupplierOnboardingPage_div_142_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 88)(1, "form", 89)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 10)(5, "label", 90);
    i0.ɵɵtext(6, "Certification Type *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "p-select", 91);
    i0.ɵɵtemplate(8, SupplierOnboardingPage_div_142_small_8_Template, 2, 1, "small", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 10)(10, "label", 92);
    i0.ɵɵtext(11, "Certification Number *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 93);
    i0.ɵɵtemplate(13, SupplierOnboardingPage_div_142_small_13_Template, 2, 1, "small", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "label", 94);
    i0.ɵɵtext(17, "Issued Date *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "p-datepicker", 95);
    i0.ɵɵtemplate(19, SupplierOnboardingPage_div_142_small_19_Template, 2, 1, "small", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 10)(21, "label", 96);
    i0.ɵɵtext(22, "Expiry Date *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "p-datepicker", 97);
    i0.ɵɵtemplate(24, SupplierOnboardingPage_div_142_small_24_Template, 2, 1, "small", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 10)(26, "label", 98);
    i0.ɵɵtext(27, "Upload Certificate *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p-fileupload", 99);
    i0.ɵɵlistener("onSelect", function SupplierOnboardingPage_div_142_Template_p_fileupload_onSelect_28_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onFileSelect($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "small", 26);
    i0.ɵɵtext(30, "Accepted: PDF, JPG, PNG (Max 10MB)");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(31, SupplierOnboardingPage_div_142_small_31_Template, 2, 1, "small", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 100)(33, "p-button", 101);
    i0.ɵɵlistener("onClick", function SupplierOnboardingPage_div_142_Template_p_button_onClick_33_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelCertificationForm()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p-button", 102);
    i0.ɵɵlistener("onClick", function SupplierOnboardingPage_div_142_Template_p_button_onClick_34_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveCertification()); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.certificationForm);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.editingIndex >= 0 ? "Edit" : "Add", " Certification");
    i0.ɵɵadvance(4);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(20, _c0));
    i0.ɵɵproperty("options", ctx_r0.certificationTypes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isFieldInvalid(ctx_r0.certificationForm, "type"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.isFieldInvalid(ctx_r0.certificationForm, "number"));
    i0.ɵɵadvance(5);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(21, _c0));
    i0.ɵɵproperty("showIcon", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isFieldInvalid(ctx_r0.certificationForm, "issuedDate"));
    i0.ɵɵadvance(4);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(22, _c0));
    i0.ɵɵproperty("showIcon", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isFieldInvalid(ctx_r0.certificationForm, "expiryDate"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("auto", true)("maxFileSize", 10000000)("customUpload", true);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.isFieldInvalid(ctx_r0.certificationForm, "file"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("outlined", true);
} }
function SupplierOnboardingPage_small_154_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.accountForm, "username"), " ");
} }
function SupplierOnboardingPage_small_161_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getFieldError(ctx_r0.accountForm, "password"), " ");
} }
function SupplierOnboardingPage_small_166_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 72);
    i0.ɵɵtext(1, " Passwords do not match ");
    i0.ɵɵelementEnd();
} }
function SupplierOnboardingPage_small_177_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 103);
    i0.ɵɵtext(1, " You must accept the terms and conditions ");
    i0.ɵɵelementEnd();
} }
export class SupplierOnboardingPage {
    fb = inject(FormBuilder);
    router = inject(Router);
    messageService = inject(MessageService);
    companyForm;
    contactForm;
    certificationForm;
    accountForm;
    businessTypes = Object.values(BusinessType).map((value) => ({ label: value, value }));
    industries = INDUSTRIES.map((value) => ({ label: value, value }));
    employeeRanges = EMPLOYEE_RANGES.map((value) => ({ label: value, value }));
    certificationTypes = CERTIFICATION_TYPES.map((value) => ({ label: value, value }));
    activeIndex = 0;
    certifications = [];
    showCertificationForm = false;
    editingIndex = -1;
    ngOnInit() {
        this.initializeForms();
    }
    initializeForms() {
        this.companyForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.minLength(2)]],
            taxId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
            businessType: [null, Validators.required],
            industry: [null, Validators.required],
            yearEstablished: [
                null,
                [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]
            ],
            numberOfEmployees: [null, Validators.required],
            website: ['', Validators.pattern(/^https?:\/\/.+/)]
        });
        this.contactForm = this.fb.group({
            primaryContactName: ['', [Validators.required, Validators.minLength(2)]],
            primaryContactEmail: ['', [Validators.required, Validators.email]],
            primaryContactPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]+$/)]],
            primaryContactPosition: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9\s-]+$/i)]]
        });
        this.certificationForm = this.fb.group({
            type: [null, Validators.required],
            number: ['', Validators.required],
            issuedDate: [null, Validators.required],
            expiryDate: [null, Validators.required],
            issuingAuthority: ['', Validators.required],
            file: [null, Validators.required]
        });
        this.accountForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
            confirmPassword: ['', Validators.required],
            termsAccepted: [false, Validators.requiredTrue]
        }, { validators: this.passwordMatchValidator });
    }
    passwordValidator(control) {
        const value = control.value;
        if (!value)
            return null;
        const hasNumber = /[0-9]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasSpecial = /[!@#$%^&*]/.test(value);
        return hasNumber && hasUpper && hasLower && hasSpecial ? null : { passwordStrength: true };
    }
    passwordMatchValidator(group) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }
    nextStep() {
        const forms = [this.companyForm, this.contactForm, null, this.accountForm];
        const currentForm = forms[this.activeIndex];
        if (currentForm && currentForm.invalid) {
            currentForm.markAllAsTouched();
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Please fill in all required fields correctly.'
            });
            return;
        }
        this.activeIndex++;
    }
    previousStep() {
        this.activeIndex--;
    }
    getCertificationMessage() {
        const businessType = this.companyForm.get('businessType')?.value;
        if (businessType === BusinessType.MANUFACTURER || businessType === BusinessType.DISTRIBUTOR) {
            return 'Certifications are optional now but recommended for Manufacturers and Distributors.';
        }
        return 'Certifications are optional but improve visibility in sourcing events.';
    }
    openCertificationForm() {
        this.showCertificationForm = true;
        this.certificationForm.reset();
        this.editingIndex = -1;
    }
    editCertification(cert, index) {
        this.showCertificationForm = true;
        this.editingIndex = index;
        this.certificationForm.patchValue({
            type: cert.type,
            number: cert.number,
            issuedDate: cert.issuedDate,
            expiryDate: cert.expiryDate,
            issuingAuthority: cert.issuingAuthority
        });
    }
    cancelCertificationForm() {
        this.showCertificationForm = false;
        this.certificationForm.reset();
        this.editingIndex = -1;
    }
    onFileSelect(event) {
        const file = event.files?.[0];
        if (!file)
            return;
        if (file.size > 10 * 1024 * 1024) {
            this.messageService.add({
                severity: 'error',
                summary: 'File Too Large',
                detail: 'File size must be less than 10MB.'
            });
            return;
        }
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Invalid File Type',
                detail: 'Only PDF, JPG, and PNG files are allowed.'
            });
            return;
        }
        this.certificationForm.patchValue({ file });
    }
    saveCertification() {
        if (this.certificationForm.invalid) {
            this.certificationForm.markAllAsTouched();
            return;
        }
        const formValue = this.certificationForm.value;
        const file = formValue.file;
        const certification = {
            id: this.editingIndex >= 0 ? this.certifications[this.editingIndex].id : this.generateId(),
            type: formValue.type,
            number: formValue.number,
            issuedDate: formValue.issuedDate,
            expiryDate: formValue.expiryDate,
            issuingAuthority: formValue.issuingAuthority,
            file,
            fileName: file?.name,
            fileSize: file?.size
        };
        if (this.editingIndex >= 0) {
            this.certifications[this.editingIndex] = certification;
            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Certification updated.' });
        }
        else {
            this.certifications.push(certification);
            this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Certification added.' });
        }
        this.cancelCertificationForm();
    }
    removeCertification(index) {
        this.certifications.splice(index, 1);
        this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Certification removed.' });
    }
    formatFileSize(bytes) {
        if (!bytes)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
    }
    submitRegistration() {
        if (this.accountForm.invalid) {
            this.accountForm.markAllAsTouched();
            return;
        }
        this.messageService.add({
            severity: 'success',
            summary: 'Registration Submitted',
            detail: 'Your supplier profile has been submitted for review.'
        });
        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 2000);
    }
    generateId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    isFieldInvalid(form, fieldName) {
        const field = form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
    getFieldError(form, fieldName) {
        const field = form.get(fieldName);
        if (!field || !field.errors)
            return '';
        if (field.errors['required'])
            return 'This field is required';
        if (field.errors['email'])
            return 'Invalid email format';
        if (field.errors['minlength'])
            return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
        if (field.errors['pattern'])
            return 'Invalid format';
        if (field.errors['min'])
            return `Minimum value is ${field.errors['min'].min}`;
        if (field.errors['max'])
            return `Maximum value is ${field.errors['max'].max}`;
        if (field.errors['passwordStrength']) {
            return 'Password must contain uppercase, lowercase, number, and special character';
        }
        return 'Invalid value';
    }
    static ɵfac = function SupplierOnboardingPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SupplierOnboardingPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SupplierOnboardingPage, selectors: [["app-supplier-onboarding-page"]], features: [i0.ɵɵProvidersFeature([MessageService])], decls: 206, vars: 58, consts: [[1, "registration-container"], [1, "registration-card"], [1, "registration-header"], [1, "registration-meta"], [1, "meta-pill"], [1, "meta-text"], [3, "valueChange", "value"], [3, "value"], [1, "step-form", 3, "formGroup"], [1, "form-row"], [1, "form-field"], ["for", "companyName"], ["pInputText", "", "id", "companyName", "formControlName", "companyName", "placeholder", "Enter company name"], ["class", "error", 4, "ngIf"], ["for", "taxId"], ["pInputText", "", "id", "taxId", "formControlName", "taxId", "placeholder", "XX-XXXXXXX"], ["for", "businessType"], ["id", "businessType", "formControlName", "businessType", "optionLabel", "label", "optionValue", "value", "placeholder", "Select business type", "appendTo", "body", 3, "options"], ["for", "industry"], ["id", "industry", "formControlName", "industry", "optionLabel", "label", "optionValue", "value", "placeholder", "Select industry", "appendTo", "body", 3, "options"], ["for", "yearEstablished"], ["pInputText", "", "id", "yearEstablished", "type", "number", "formControlName", "yearEstablished", "placeholder", "YYYY"], ["for", "numberOfEmployees"], ["id", "numberOfEmployees", "formControlName", "numberOfEmployees", "optionLabel", "label", "optionValue", "value", "placeholder", "Select range", "appendTo", "body", 3, "options"], ["for", "website"], ["pInputText", "", "id", "website", "formControlName", "website", "placeholder", "https://www.example.com"], [1, "form-hint"], [1, "step-actions"], ["type", "button", "label", "Next", "icon", "pi pi-arrow-right", "iconPos", "right", 3, "onClick"], [1, "section-subtitle"], ["for", "primaryContactName"], ["pInputText", "", "id", "primaryContactName", "formControlName", "primaryContactName", "placeholder", "John Doe"], ["for", "primaryContactPosition"], ["pInputText", "", "id", "primaryContactPosition", "formControlName", "primaryContactPosition", "placeholder", "Sales Manager"], ["for", "primaryContactEmail"], ["pInputText", "", "id", "primaryContactEmail", "type", "email", "formControlName", "primaryContactEmail", "placeholder", "john@company.com"], ["for", "primaryContactPhone"], ["pInputText", "", "id", "primaryContactPhone", "formControlName", "primaryContactPhone", "placeholder", "+1 (555) 123-4567"], [1, "section-title"], ["for", "street"], ["pInputText", "", "id", "street", "formControlName", "street", "placeholder", "123 Main Street"], ["for", "city"], ["pInputText", "", "id", "city", "formControlName", "city", "placeholder", "New York"], ["for", "state"], ["pInputText", "", "id", "state", "formControlName", "state", "placeholder", "NY"], ["for", "country"], ["pInputText", "", "id", "country", "formControlName", "country", "placeholder", "United States"], ["for", "postalCode"], ["pInputText", "", "id", "postalCode", "formControlName", "postalCode", "placeholder", "10001"], ["type", "button", "label", "Back", "icon", "pi pi-arrow-left", 3, "onClick", "outlined"], [1, "step-form"], ["severity", "info", 3, "text", "closable"], ["class", "certifications-list", 4, "ngIf"], ["class", "add-cert-section", 4, "ngIf"], ["class", "certification-form-panel", 4, "ngIf"], ["for", "username"], ["pInputText", "", "id", "username", "formControlName", "username", "placeholder", "Choose a username"], ["for", "password"], ["pInputText", "", "id", "password", "type", "password", "formControlName", "password", "placeholder", "Create a strong password"], ["for", "confirmPassword"], ["pInputText", "", "id", "confirmPassword", "type", "password", "formControlName", "confirmPassword", "placeholder", "Re-enter your password"], ["formControlName", "termsAccepted", "inputId", "terms", 3, "binary"], ["for", "terms", 1, "checkbox-label"], ["href", "/terms", "target", "_blank"], ["href", "/privacy", "target", "_blank"], ["class", "error", "style", "display: block;", 4, "ngIf"], [1, "review-section"], [1, "review-summary"], [1, "review-item"], [1, "review-label"], [1, "review-value"], ["type", "button", "label", "Submit Registration", "icon", "pi pi-check", "iconPos", "right", "severity", "success", 3, "onClick"], [1, "error"], [1, "certifications-list"], ["class", "certification-item", 4, "ngFor", "ngForOf"], [1, "certification-item"], [1, "cert-info"], [1, "cert-type"], [1, "pi", "pi-file-pdf"], [1, "cert-details"], [1, "cert-number"], [1, "cert-dates"], [1, "cert-file"], [1, "cert-actions"], ["type", "button", "icon", "pi pi-pencil", "severity", "info", 3, "onClick", "text", "rounded"], ["type", "button", "icon", "pi pi-trash", "severity", "danger", 3, "onClick", "text", "rounded"], [1, "add-cert-section"], ["type", "button", "label", "Add Certification", "icon", "pi pi-plus", 3, "onClick", "outlined"], [1, "certification-form-panel"], [3, "formGroup"], ["for", "certType"], ["id", "certType", "formControlName", "type", "optionLabel", "label", "optionValue", "value", "placeholder", "Select certification type", "appendTo", "body", 3, "options"], ["for", "certNumber"], ["pInputText", "", "id", "certNumber", "formControlName", "number", "placeholder", "ISO9001-2024-12345"], ["for", "issuedDate"], ["id", "issuedDate", "formControlName", "issuedDate", "appendTo", "body", "dateFormat", "mm/dd/yy", 3, "showIcon"], ["for", "expiryDate"], ["id", "expiryDate", "formControlName", "expiryDate", "appendTo", "body", "dateFormat", "mm/dd/yy", 3, "showIcon"], ["for", "file"], ["mode", "basic", "chooseLabel", "Choose File", "accept", ".pdf,.jpg,.jpeg,.png", 3, "onSelect", "auto", "maxFileSize", "customUpload"], [1, "cert-form-actions"], ["type", "button", "label", "Cancel", 3, "onClick", "outlined"], ["type", "button", "label", "Save Certification", "icon", "pi pi-check", 3, "onClick"], [1, "error", 2, "display", "block"]], template: function SupplierOnboardingPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Supplier Registration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Join the supplier network and respond to RFQs faster.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 3)(8, "span", 4);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 5);
            i0.ɵɵtext(11, "Estimated time: 5-7 minutes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 5);
            i0.ɵɵtext(13, "Fields marked * are required");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "p-tabs", 6);
            i0.ɵɵtwoWayListener("valueChange", function SupplierOnboardingPage_Template_p_tabs_valueChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.activeIndex, $event) || (ctx.activeIndex = $event); return $event; });
            i0.ɵɵelementStart(15, "p-tablist")(16, "p-tab", 7);
            i0.ɵɵtext(17, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p-tab", 7);
            i0.ɵɵtext(19, "Contact");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "p-tab", 7);
            i0.ɵɵtext(21, "Certifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "p-tab", 7);
            i0.ɵɵtext(23, "Account");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "p-tabpanels")(25, "p-tabpanel", 7)(26, "form", 8)(27, "h3");
            i0.ɵɵtext(28, "Company Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 9)(30, "div", 10)(31, "label", 11);
            i0.ɵɵtext(32, "Company Name *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 12);
            i0.ɵɵtemplate(34, SupplierOnboardingPage_small_34_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 10)(36, "label", 14);
            i0.ɵɵtext(37, "Tax ID / EIN *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 15);
            i0.ɵɵtemplate(39, SupplierOnboardingPage_small_39_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 9)(41, "div", 10)(42, "label", 16);
            i0.ɵɵtext(43, "Business Type *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "p-select", 17);
            i0.ɵɵtemplate(45, SupplierOnboardingPage_small_45_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 10)(47, "label", 18);
            i0.ɵɵtext(48, "Industry *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(49, "p-select", 19);
            i0.ɵɵtemplate(50, SupplierOnboardingPage_small_50_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 9)(52, "div", 10)(53, "label", 20);
            i0.ɵɵtext(54, "Year Established *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(55, "input", 21);
            i0.ɵɵtemplate(56, SupplierOnboardingPage_small_56_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 10)(58, "label", 22);
            i0.ɵɵtext(59, "Number of Employees *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(60, "p-select", 23);
            i0.ɵɵtemplate(61, SupplierOnboardingPage_small_61_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "div", 10)(63, "label", 24);
            i0.ɵɵtext(64, "Website (Optional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(65, "input", 25);
            i0.ɵɵelementStart(66, "small", 26);
            i0.ɵɵtext(67, "Public site or product catalog link.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(68, SupplierOnboardingPage_small_68_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "div", 27)(70, "p-button", 28);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_70_listener() { return ctx.nextStep(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(71, "p-tabpanel", 7)(72, "form", 8)(73, "h3");
            i0.ɵɵtext(74, "Primary Contact Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "p", 29);
            i0.ɵɵtext(76, "We will use this contact for RFQ communication.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 9)(78, "div", 10)(79, "label", 30);
            i0.ɵɵtext(80, "Full Name *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "input", 31);
            i0.ɵɵtemplate(82, SupplierOnboardingPage_small_82_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 10)(84, "label", 32);
            i0.ɵɵtext(85, "Position *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(86, "input", 33);
            i0.ɵɵtemplate(87, SupplierOnboardingPage_small_87_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 9)(89, "div", 10)(90, "label", 34);
            i0.ɵɵtext(91, "Email *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(92, "input", 35);
            i0.ɵɵtemplate(93, SupplierOnboardingPage_small_93_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "div", 10)(95, "label", 36);
            i0.ɵɵtext(96, "Phone *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(97, "input", 37);
            i0.ɵɵtemplate(98, SupplierOnboardingPage_small_98_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(99, "h3", 38);
            i0.ɵɵtext(100, "Company Address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "p", 29);
            i0.ɵɵtext(102, "Used for documentation and compliance records.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "div", 10)(104, "label", 39);
            i0.ɵɵtext(105, "Street Address *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(106, "input", 40);
            i0.ɵɵtemplate(107, SupplierOnboardingPage_small_107_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "div", 9)(109, "div", 10)(110, "label", 41);
            i0.ɵɵtext(111, "City *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(112, "input", 42);
            i0.ɵɵtemplate(113, SupplierOnboardingPage_small_113_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "div", 10)(115, "label", 43);
            i0.ɵɵtext(116, "State/Province *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(117, "input", 44);
            i0.ɵɵtemplate(118, SupplierOnboardingPage_small_118_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "div", 9)(120, "div", 10)(121, "label", 45);
            i0.ɵɵtext(122, "Country *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(123, "input", 46);
            i0.ɵɵtemplate(124, SupplierOnboardingPage_small_124_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "div", 10)(126, "label", 47);
            i0.ɵɵtext(127, "Postal Code *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(128, "input", 48);
            i0.ɵɵtemplate(129, SupplierOnboardingPage_small_129_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(130, "div", 27)(131, "p-button", 49);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_131_listener() { return ctx.previousStep(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(132, "p-button", 28);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_132_listener() { return ctx.nextStep(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(133, "p-tabpanel", 7)(134, "div", 50)(135, "h3");
            i0.ɵɵtext(136, "Certifications");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "p", 29);
            i0.ɵɵtext(138, "Optional now. You can add more later.");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(139, "p-message", 51);
            i0.ɵɵtemplate(140, SupplierOnboardingPage_div_140_Template, 2, 1, "div", 52)(141, SupplierOnboardingPage_div_141_Template, 2, 4, "div", 53)(142, SupplierOnboardingPage_div_142_Template, 35, 23, "div", 54);
            i0.ɵɵelementStart(143, "div", 27)(144, "p-button", 49);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_144_listener() { return ctx.previousStep(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "p-button", 28);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_145_listener() { return ctx.nextStep(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(146, "p-tabpanel", 7)(147, "form", 8)(148, "h3");
            i0.ɵɵtext(149, "Create Your Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(150, "div", 10)(151, "label", 55);
            i0.ɵɵtext(152, "Username *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(153, "input", 56);
            i0.ɵɵtemplate(154, SupplierOnboardingPage_small_154_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(155, "div", 10)(156, "label", 57);
            i0.ɵɵtext(157, "Password *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(158, "input", 58);
            i0.ɵɵelementStart(159, "small", 26);
            i0.ɵɵtext(160, " Must contain uppercase, lowercase, number, and special character (!@#$%^&*) ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(161, SupplierOnboardingPage_small_161_Template, 2, 1, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "div", 10)(163, "label", 59);
            i0.ɵɵtext(164, "Confirm Password *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(165, "input", 60);
            i0.ɵɵtemplate(166, SupplierOnboardingPage_small_166_Template, 2, 0, "small", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "div", 10);
            i0.ɵɵelement(168, "p-checkbox", 61);
            i0.ɵɵelementStart(169, "label", 62);
            i0.ɵɵtext(170, " I agree to the ");
            i0.ɵɵelementStart(171, "a", 63);
            i0.ɵɵtext(172, "Terms of Service");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(173, " and ");
            i0.ɵɵelementStart(174, "a", 64);
            i0.ɵɵtext(175, "Privacy Policy");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(176, " * ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(177, SupplierOnboardingPage_small_177_Template, 2, 0, "small", 65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(178, "div", 66)(179, "h4");
            i0.ɵɵtext(180, "Review Your Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(181, "div", 67)(182, "div", 68)(183, "span", 69);
            i0.ɵɵtext(184, "Company:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(185, "span", 70);
            i0.ɵɵtext(186);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(187, "div", 68)(188, "span", 69);
            i0.ɵɵtext(189, "Business Type:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(190, "span", 70);
            i0.ɵɵtext(191);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(192, "div", 68)(193, "span", 69);
            i0.ɵɵtext(194, "Contact Email:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(195, "span", 70);
            i0.ɵɵtext(196);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(197, "div", 68)(198, "span", 69);
            i0.ɵɵtext(199, "Certifications:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(200, "span", 70);
            i0.ɵɵtext(201);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(202, "div", 27)(203, "p-button", 49);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_203_listener() { return ctx.previousStep(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(204, "p-button", 71);
            i0.ɵɵlistener("onClick", function SupplierOnboardingPage_Template_p_button_onClick_204_listener() { return ctx.submitRegistration(); });
            i0.ɵɵelementEnd()()()()()()()();
            i0.ɵɵelement(205, "p-toast");
        } if (rf & 2) {
            let tmp_44_0;
            let tmp_47_0;
            let tmp_48_0;
            let tmp_49_0;
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("Step ", ctx.activeIndex + 1, " of 4");
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("value", ctx.activeIndex);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 3);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.companyForm);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "companyName"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "taxId"));
            i0.ɵɵadvance(5);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(55, _c0));
            i0.ɵɵproperty("options", ctx.businessTypes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "businessType"));
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(56, _c0));
            i0.ɵɵproperty("options", ctx.industries);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "industry"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "yearEstablished"));
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(57, _c0));
            i0.ɵɵproperty("options", ctx.employeeRanges);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "numberOfEmployees"));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.companyForm, "website"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.contactForm);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "primaryContactName"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "primaryContactPosition"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "primaryContactEmail"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "primaryContactPhone"));
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "street"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "city"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "state"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "country"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.contactForm, "postalCode"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("outlined", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 2);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("text", ctx.getCertificationMessage())("closable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.certifications.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.showCertificationForm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCertificationForm);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("outlined", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.accountForm);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.accountForm, "username"));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.accountForm, "password"));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.accountForm.hasError("passwordMismatch") && ((tmp_44_0 = ctx.accountForm.get("confirmPassword")) == null ? null : tmp_44_0.touched));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.isFieldInvalid(ctx.accountForm, "termsAccepted"));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate((tmp_47_0 = ctx.companyForm.get("companyName")) == null ? null : tmp_47_0.value);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate((tmp_48_0 = ctx.companyForm.get("businessType")) == null ? null : tmp_48_0.value);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate((tmp_49_0 = ctx.contactForm.get("primaryContactEmail")) == null ? null : tmp_49_0.value);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.certifications.length, " added");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("outlined", true);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.Button, InputTextModule, i4.InputText, SelectModule, i5.Select, DatePickerModule, i6.DatePicker, FileUploadModule, i7.FileUpload, CheckboxModule, i8.Checkbox, MessageModule, i9.Message, ToastModule, i10.Toast, TabsModule, i11.Tabs, i11.TabPanels, i11.TabPanel, i11.TabList, i11.Tab, i1.DatePipe], styles: ["@use '../../shared/page-design-system' as *;\n\n.registration-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n}\n\n.registration-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 14px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 960px;\n  width: 100%;\n  padding: 2.5rem;\n\n  @media (max-width: 768px) {\n    padding: 1.5rem;\n  }\n}\n\n.registration-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n\n  h1 {\n    font-size: 2rem;\n    font-weight: 700;\n    color: #1f2937;\n    margin: 0 0 0.5rem 0;\n  }\n\n  p {\n    font-size: 1rem;\n    color: #6b7280;\n    margin: 0;\n  }\n}\n\n.registration-meta[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  color: #64748b;\n  font-size: 0.85rem;\n}\n\n.meta-pill[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 999px;\n  background: #eef2ff;\n  color: #4338ca;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n}\n\n.meta-text[_ngcontent-%COMP%] {\n  opacity: 0.9;\n}\n\n.step-form[_ngcontent-%COMP%] {\n  padding: 1.5rem 0;\n\n  h3 {\n    font-size: 1.5rem;\n    font-weight: 600;\n    color: #1f2937;\n    margin: 0 0 1.5rem 0;\n  }\n\n  h4 {\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #374151;\n    margin: 1.5rem 0 1rem 0;\n  }\n\n  .section-title {\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #374151;\n    margin: 2rem 0 1rem 0;\n    padding-top: 1.5rem;\n    border-top: 1px solid #e5e7eb;\n  }\n}\n\n.section-subtitle[_ngcontent-%COMP%] {\n  margin: -0.75rem 0 1.25rem;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n  margin-bottom: 1.5rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n\n  label {\n    font-weight: 600;\n    color: #374151;\n    font-size: 0.95rem;\n  }\n\n  input {\n    width: 100%;\n  }\n\n  .form-hint {\n    font-size: 0.85rem;\n    color: #6b7280;\n    margin-top: 0.25rem;\n  }\n\n  small.error {\n    font-size: 0.85rem;\n    color: #dc2626;\n    margin-top: 0.25rem;\n  }\n\n  .checkbox-label {\n    margin-left: 0.5rem;\n    font-weight: normal;\n\n    a {\n      color: #2563eb;\n      text-decoration: none;\n\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n}\n\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n}\n\n.certifications-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.certification-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  transition: all 0.2s;\n\n  &:hover {\n    background: #f3f4f6;\n    border-color: #d1d5db;\n  }\n\n  .cert-info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n\n    .cert-type {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-weight: 600;\n      color: #1f2937;\n      font-size: 1rem;\n\n      i {\n        color: #dc2626;\n        font-size: 1.25rem;\n      }\n    }\n\n    .cert-details {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      font-size: 0.875rem;\n      color: #6b7280;\n\n      .cert-number {\n        font-weight: 500;\n        color: #374151;\n      }\n\n      .cert-dates {\n        font-style: italic;\n      }\n\n      .cert-file {\n        color: #2563eb;\n      }\n    }\n  }\n\n  .cert-actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n\n    .cert-actions {\n      width: 100%;\n      justify-content: flex-end;\n    }\n  }\n}\n\n.add-cert-section[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n}\n\n.certification-form-panel[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n\n  h4 {\n    margin-top: 0;\n    color: #1f2937;\n  }\n\n  .cert-form-actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: 1rem;\n    margin-top: 1.5rem;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n    }\n  }\n}\n\n.review-section[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-top: 2rem;\n\n  h4 {\n    margin-top: 0;\n    margin-bottom: 1rem;\n    color: #1f2937;\n  }\n\n  .review-summary {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n\n    .review-item {\n      display: flex;\n      justify-content: space-between;\n      padding-bottom: 0.75rem;\n      border-bottom: 1px solid #e5e7eb;\n\n      &:last-child {\n        border-bottom: none;\n        padding-bottom: 0;\n      }\n\n      .review-label {\n        font-weight: 600;\n        color: #6b7280;\n        font-size: 0.95rem;\n      }\n\n      .review-value {\n        color: #1f2937;\n        font-size: 0.95rem;\n        text-align: right;\n      }\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .registration-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .registration-card[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n\n  .registration-header[_ngcontent-%COMP%] {\n    h1 {\n      font-size: 1.5rem;\n    }\n\n    p {\n      font-size: 0.9rem;\n    }\n  }\n\n  .step-form[_ngcontent-%COMP%] {\n    h3 {\n      font-size: 1.25rem;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SupplierOnboardingPage, [{
        type: Component,
        args: [{ selector: 'app-supplier-onboarding-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    DatePickerModule,
                    FileUploadModule,
                    CheckboxModule,
                    MessageModule,
                    ToastModule,
                    TabsModule
                ], providers: [MessageService], template: "<div class=\"registration-container\">\n  <div class=\"registration-card\">\n    <div class=\"registration-header\">\n      <h1>Supplier Registration</h1>\n      <p>Join the supplier network and respond to RFQs faster.</p>\n      <div class=\"registration-meta\">\n        <span class=\"meta-pill\">Step {{ activeIndex + 1 }} of 4</span>\n        <span class=\"meta-text\">Estimated time: 5-7 minutes</span>\n        <span class=\"meta-text\">Fields marked * are required</span>\n      </div>\n    </div>\n\n    <p-tabs [(value)]=\"activeIndex\">\n      <p-tablist>\n        <p-tab [value]=\"0\">Company</p-tab>\n        <p-tab [value]=\"1\">Contact</p-tab>\n        <p-tab [value]=\"2\">Certifications</p-tab>\n        <p-tab [value]=\"3\">Account</p-tab>\n      </p-tablist>\n\n      <p-tabpanels>\n        <p-tabpanel [value]=\"0\">\n          <form [formGroup]=\"companyForm\" class=\"step-form\">\n            <h3>Company Information</h3>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"companyName\">Company Name *</label>\n                <input\n                  pInputText\n                  id=\"companyName\"\n                  formControlName=\"companyName\"\n                  placeholder=\"Enter company name\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'companyName')\">\n                  {{ getFieldError(companyForm, 'companyName') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"taxId\">Tax ID / EIN *</label>\n                <input\n                  pInputText\n                  id=\"taxId\"\n                  formControlName=\"taxId\"\n                  placeholder=\"XX-XXXXXXX\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'taxId')\">\n                  {{ getFieldError(companyForm, 'taxId') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"businessType\">Business Type *</label>\n                <p-select\n                  id=\"businessType\"\n                  formControlName=\"businessType\"\n                  [options]=\"businessTypes\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Select business type\"\n                  appendTo=\"body\"\n                  [style]=\"{ width: '100%' }\">\n                </p-select>\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'businessType')\">\n                  {{ getFieldError(companyForm, 'businessType') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"industry\">Industry *</label>\n                <p-select\n                  id=\"industry\"\n                  formControlName=\"industry\"\n                  [options]=\"industries\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Select industry\"\n                  appendTo=\"body\"\n                  [style]=\"{ width: '100%' }\">\n                </p-select>\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'industry')\">\n                  {{ getFieldError(companyForm, 'industry') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"yearEstablished\">Year Established *</label>\n                <input\n                  pInputText\n                  id=\"yearEstablished\"\n                  type=\"number\"\n                  formControlName=\"yearEstablished\"\n                  placeholder=\"YYYY\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'yearEstablished')\">\n                  {{ getFieldError(companyForm, 'yearEstablished') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"numberOfEmployees\">Number of Employees *</label>\n                <p-select\n                  id=\"numberOfEmployees\"\n                  formControlName=\"numberOfEmployees\"\n                  [options]=\"employeeRanges\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Select range\"\n                  appendTo=\"body\"\n                  [style]=\"{ width: '100%' }\">\n                </p-select>\n                <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'numberOfEmployees')\">\n                  {{ getFieldError(companyForm, 'numberOfEmployees') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"website\">Website (Optional)</label>\n              <input\n                pInputText\n                id=\"website\"\n                formControlName=\"website\"\n                placeholder=\"https://www.example.com\" />\n              <small class=\"form-hint\">Public site or product catalog link.</small>\n              <small class=\"error\" *ngIf=\"isFieldInvalid(companyForm, 'website')\">\n                {{ getFieldError(companyForm, 'website') }}\n              </small>\n            </div>\n\n            <div class=\"step-actions\">\n              <p-button\n                type=\"button\"\n                label=\"Next\"\n                icon=\"pi pi-arrow-right\"\n                iconPos=\"right\"\n                (onClick)=\"nextStep()\">\n              </p-button>\n            </div>\n          </form>\n        </p-tabpanel>\n\n        <p-tabpanel [value]=\"1\">\n          <form [formGroup]=\"contactForm\" class=\"step-form\">\n            <h3>Primary Contact Information</h3>\n            <p class=\"section-subtitle\">We will use this contact for RFQ communication.</p>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"primaryContactName\">Full Name *</label>\n                <input\n                  pInputText\n                  id=\"primaryContactName\"\n                  formControlName=\"primaryContactName\"\n                  placeholder=\"John Doe\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'primaryContactName')\">\n                  {{ getFieldError(contactForm, 'primaryContactName') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"primaryContactPosition\">Position *</label>\n                <input\n                  pInputText\n                  id=\"primaryContactPosition\"\n                  formControlName=\"primaryContactPosition\"\n                  placeholder=\"Sales Manager\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'primaryContactPosition')\">\n                  {{ getFieldError(contactForm, 'primaryContactPosition') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"primaryContactEmail\">Email *</label>\n                <input\n                  pInputText\n                  id=\"primaryContactEmail\"\n                  type=\"email\"\n                  formControlName=\"primaryContactEmail\"\n                  placeholder=\"john@company.com\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'primaryContactEmail')\">\n                  {{ getFieldError(contactForm, 'primaryContactEmail') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"primaryContactPhone\">Phone *</label>\n                <input\n                  pInputText\n                  id=\"primaryContactPhone\"\n                  formControlName=\"primaryContactPhone\"\n                  placeholder=\"+1 (555) 123-4567\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'primaryContactPhone')\">\n                  {{ getFieldError(contactForm, 'primaryContactPhone') }}\n                </small>\n              </div>\n            </div>\n\n            <h3 class=\"section-title\">Company Address</h3>\n            <p class=\"section-subtitle\">Used for documentation and compliance records.</p>\n\n            <div class=\"form-field\">\n              <label for=\"street\">Street Address *</label>\n              <input\n                pInputText\n                id=\"street\"\n                formControlName=\"street\"\n                placeholder=\"123 Main Street\" />\n              <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'street')\">\n                {{ getFieldError(contactForm, 'street') }}\n              </small>\n            </div>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"city\">City *</label>\n                <input\n                  pInputText\n                  id=\"city\"\n                  formControlName=\"city\"\n                  placeholder=\"New York\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'city')\">\n                  {{ getFieldError(contactForm, 'city') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"state\">State/Province *</label>\n                <input\n                  pInputText\n                  id=\"state\"\n                  formControlName=\"state\"\n                  placeholder=\"NY\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'state')\">\n                  {{ getFieldError(contactForm, 'state') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"form-row\">\n              <div class=\"form-field\">\n                <label for=\"country\">Country *</label>\n                <input\n                  pInputText\n                  id=\"country\"\n                  formControlName=\"country\"\n                  placeholder=\"United States\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'country')\">\n                  {{ getFieldError(contactForm, 'country') }}\n                </small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"postalCode\">Postal Code *</label>\n                <input\n                  pInputText\n                  id=\"postalCode\"\n                  formControlName=\"postalCode\"\n                  placeholder=\"10001\" />\n                <small class=\"error\" *ngIf=\"isFieldInvalid(contactForm, 'postalCode')\">\n                  {{ getFieldError(contactForm, 'postalCode') }}\n                </small>\n              </div>\n            </div>\n\n            <div class=\"step-actions\">\n              <p-button\n                type=\"button\"\n                label=\"Back\"\n                icon=\"pi pi-arrow-left\"\n                (onClick)=\"previousStep()\"\n                [outlined]=\"true\">\n              </p-button>\n              <p-button\n                type=\"button\"\n                label=\"Next\"\n                icon=\"pi pi-arrow-right\"\n                iconPos=\"right\"\n                (onClick)=\"nextStep()\">\n              </p-button>\n            </div>\n          </form>\n        </p-tabpanel>\n\n        <p-tabpanel [value]=\"2\">\n          <div class=\"step-form\">\n            <h3>Certifications</h3>\n            <p class=\"section-subtitle\">Optional now. You can add more later.</p>\n\n            <p-message severity=\"info\" [text]=\"getCertificationMessage()\" [closable]=\"false\"></p-message>\n\n            <div class=\"certifications-list\" *ngIf=\"certifications.length > 0\">\n              <div class=\"certification-item\" *ngFor=\"let cert of certifications; let i = index\">\n                <div class=\"cert-info\">\n                  <div class=\"cert-type\">\n                    <i class=\"pi pi-file-pdf\"></i>\n                    <span>{{ cert.type }}</span>\n                  </div>\n                  <div class=\"cert-details\">\n                    <span class=\"cert-number\">{{ cert.number }}</span>\n                    <span class=\"cert-dates\">\n                      {{ cert.issuedDate | date: 'MM/dd/yyyy' }} - {{ cert.expiryDate | date: 'MM/dd/yyyy' }}\n                    </span>\n                    <span class=\"cert-file\">{{ cert.fileName }} ({{ formatFileSize(cert.fileSize || 0) }})</span>\n                  </div>\n                </div>\n                <div class=\"cert-actions\">\n                  <p-button\n                    type=\"button\"\n                    icon=\"pi pi-pencil\"\n                    [text]=\"true\"\n                    [rounded]=\"true\"\n                    severity=\"info\"\n                    (onClick)=\"editCertification(cert, i)\">\n                  </p-button>\n                  <p-button\n                    type=\"button\"\n                    icon=\"pi pi-trash\"\n                    [text]=\"true\"\n                    [rounded]=\"true\"\n                    severity=\"danger\"\n                    (onClick)=\"removeCertification(i)\">\n                  </p-button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"add-cert-section\" *ngIf=\"!showCertificationForm\">\n              <p-button\n                type=\"button\"\n                label=\"Add Certification\"\n                icon=\"pi pi-plus\"\n                (onClick)=\"openCertificationForm()\"\n                [outlined]=\"true\"\n                [style]=\"{ width: '100%' }\">\n              </p-button>\n            </div>\n\n            <div class=\"certification-form-panel\" *ngIf=\"showCertificationForm\">\n              <form [formGroup]=\"certificationForm\">\n                <h4>{{ editingIndex >= 0 ? 'Edit' : 'Add' }} Certification</h4>\n\n                <div class=\"form-field\">\n                  <label for=\"certType\">Certification Type *</label>\n                  <p-select\n                    id=\"certType\"\n                    formControlName=\"type\"\n                    [options]=\"certificationTypes\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    placeholder=\"Select certification type\"\n                    appendTo=\"body\"\n                    [style]=\"{ width: '100%' }\">\n                  </p-select>\n                  <small class=\"error\" *ngIf=\"isFieldInvalid(certificationForm, 'type')\">\n                    {{ getFieldError(certificationForm, 'type') }}\n                  </small>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"certNumber\">Certification Number *</label>\n                  <input\n                    pInputText\n                    id=\"certNumber\"\n                    formControlName=\"number\"\n                    placeholder=\"ISO9001-2024-12345\" />\n                  <small class=\"error\" *ngIf=\"isFieldInvalid(certificationForm, 'number')\">\n                    {{ getFieldError(certificationForm, 'number') }}\n                  </small>\n                </div>\n\n                <div class=\"form-row\">\n                  <div class=\"form-field\">\n                    <label for=\"issuedDate\">Issued Date *</label>\n                    <p-datepicker\n                      id=\"issuedDate\"\n                      formControlName=\"issuedDate\"\n                      [showIcon]=\"true\"\n                      appendTo=\"body\"\n                      dateFormat=\"mm/dd/yy\"\n                      [style]=\"{ width: '100%' }\">\n                    </p-datepicker>\n                    <small class=\"error\" *ngIf=\"isFieldInvalid(certificationForm, 'issuedDate')\">\n                      {{ getFieldError(certificationForm, 'issuedDate') }}\n                    </small>\n                  </div>\n\n                  <div class=\"form-field\">\n                    <label for=\"expiryDate\">Expiry Date *</label>\n                    <p-datepicker\n                      id=\"expiryDate\"\n                      formControlName=\"expiryDate\"\n                      [showIcon]=\"true\"\n                      appendTo=\"body\"\n                      dateFormat=\"mm/dd/yy\"\n                      [style]=\"{ width: '100%' }\">\n                    </p-datepicker>\n                    <small class=\"error\" *ngIf=\"isFieldInvalid(certificationForm, 'expiryDate')\">\n                      {{ getFieldError(certificationForm, 'expiryDate') }}\n                    </small>\n                  </div>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"file\">Upload Certificate *</label>\n                  <p-fileupload\n                    mode=\"basic\"\n                    chooseLabel=\"Choose File\"\n                    [auto]=\"true\"\n                    accept=\".pdf,.jpg,.jpeg,.png\"\n                    [maxFileSize]=\"10000000\"\n                    (onSelect)=\"onFileSelect($event)\"\n                    [customUpload]=\"true\">\n                  </p-fileupload>\n                  <small class=\"form-hint\">Accepted: PDF, JPG, PNG (Max 10MB)</small>\n                  <small class=\"error\" *ngIf=\"isFieldInvalid(certificationForm, 'file')\">\n                    {{ getFieldError(certificationForm, 'file') }}\n                  </small>\n                </div>\n\n                <div class=\"cert-form-actions\">\n                  <p-button\n                    type=\"button\"\n                    label=\"Cancel\"\n                    (onClick)=\"cancelCertificationForm()\"\n                    [outlined]=\"true\">\n                  </p-button>\n                  <p-button\n                    type=\"button\"\n                    label=\"Save Certification\"\n                    icon=\"pi pi-check\"\n                    (onClick)=\"saveCertification()\">\n                  </p-button>\n                </div>\n              </form>\n            </div>\n\n            <div class=\"step-actions\">\n              <p-button\n                type=\"button\"\n                label=\"Back\"\n                icon=\"pi pi-arrow-left\"\n                (onClick)=\"previousStep()\"\n                [outlined]=\"true\">\n              </p-button>\n              <p-button\n                type=\"button\"\n                label=\"Next\"\n                icon=\"pi pi-arrow-right\"\n                iconPos=\"right\"\n                (onClick)=\"nextStep()\">\n              </p-button>\n            </div>\n          </div>\n        </p-tabpanel>\n\n        <p-tabpanel [value]=\"3\">\n          <form [formGroup]=\"accountForm\" class=\"step-form\">\n            <h3>Create Your Account</h3>\n\n            <div class=\"form-field\">\n              <label for=\"username\">Username *</label>\n              <input\n                pInputText\n                id=\"username\"\n                formControlName=\"username\"\n                placeholder=\"Choose a username\" />\n              <small class=\"error\" *ngIf=\"isFieldInvalid(accountForm, 'username')\">\n                {{ getFieldError(accountForm, 'username') }}\n              </small>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"password\">Password *</label>\n              <input\n                pInputText\n                id=\"password\"\n                type=\"password\"\n                formControlName=\"password\"\n                placeholder=\"Create a strong password\" />\n              <small class=\"form-hint\">\n                Must contain uppercase, lowercase, number, and special character (!@#$%^&*)\n              </small>\n              <small class=\"error\" *ngIf=\"isFieldInvalid(accountForm, 'password')\">\n                {{ getFieldError(accountForm, 'password') }}\n              </small>\n            </div>\n\n            <div class=\"form-field\">\n              <label for=\"confirmPassword\">Confirm Password *</label>\n              <input\n                pInputText\n                id=\"confirmPassword\"\n                type=\"password\"\n                formControlName=\"confirmPassword\"\n                placeholder=\"Re-enter your password\" />\n              <small\n                class=\"error\"\n                *ngIf=\"accountForm.hasError('passwordMismatch') && accountForm.get('confirmPassword')?.touched\">\n                Passwords do not match\n              </small>\n            </div>\n\n            <div class=\"form-field\">\n              <p-checkbox formControlName=\"termsAccepted\" [binary]=\"true\" inputId=\"terms\"></p-checkbox>\n              <label for=\"terms\" class=\"checkbox-label\">\n                I agree to the <a href=\"/terms\" target=\"_blank\">Terms of Service</a> and\n                <a href=\"/privacy\" target=\"_blank\">Privacy Policy</a> *\n              </label>\n              <small class=\"error\" *ngIf=\"isFieldInvalid(accountForm, 'termsAccepted')\" style=\"display: block;\">\n                You must accept the terms and conditions\n              </small>\n            </div>\n\n            <div class=\"review-section\">\n              <h4>Review Your Information</h4>\n              <div class=\"review-summary\">\n                <div class=\"review-item\">\n                  <span class=\"review-label\">Company:</span>\n                  <span class=\"review-value\">{{ companyForm.get('companyName')?.value }}</span>\n                </div>\n                <div class=\"review-item\">\n                  <span class=\"review-label\">Business Type:</span>\n                  <span class=\"review-value\">{{ companyForm.get('businessType')?.value }}</span>\n                </div>\n                <div class=\"review-item\">\n                  <span class=\"review-label\">Contact Email:</span>\n                  <span class=\"review-value\">{{ contactForm.get('primaryContactEmail')?.value }}</span>\n                </div>\n                <div class=\"review-item\">\n                  <span class=\"review-label\">Certifications:</span>\n                  <span class=\"review-value\">{{ certifications.length }} added</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"step-actions\">\n              <p-button\n                type=\"button\"\n                label=\"Back\"\n                icon=\"pi pi-arrow-left\"\n                (onClick)=\"previousStep()\"\n                [outlined]=\"true\">\n              </p-button>\n              <p-button\n                type=\"button\"\n                label=\"Submit Registration\"\n                icon=\"pi pi-check\"\n                iconPos=\"right\"\n                (onClick)=\"submitRegistration()\"\n                severity=\"success\">\n              </p-button>\n            </div>\n          </form>\n        </p-tabpanel>\n      </p-tabpanels>\n    </p-tabs>\n  </div>\n</div>\n\n<p-toast></p-toast>\n", styles: ["@use '../../shared/page-design-system' as *;\n\n.registration-container {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n}\n\n.registration-card {\n  background: #ffffff;\n  border-radius: 14px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 960px;\n  width: 100%;\n  padding: 2.5rem;\n\n  @media (max-width: 768px) {\n    padding: 1.5rem;\n  }\n}\n\n.registration-header {\n  text-align: center;\n  margin-bottom: 2rem;\n\n  h1 {\n    font-size: 2rem;\n    font-weight: 700;\n    color: #1f2937;\n    margin: 0 0 0.5rem 0;\n  }\n\n  p {\n    font-size: 1rem;\n    color: #6b7280;\n    margin: 0;\n  }\n}\n\n.registration-meta {\n  margin-top: 0.75rem;\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  color: #64748b;\n  font-size: 0.85rem;\n}\n\n.meta-pill {\n  padding: 0.25rem 0.75rem;\n  border-radius: 999px;\n  background: #eef2ff;\n  color: #4338ca;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n}\n\n.meta-text {\n  opacity: 0.9;\n}\n\n.step-form {\n  padding: 1.5rem 0;\n\n  h3 {\n    font-size: 1.5rem;\n    font-weight: 600;\n    color: #1f2937;\n    margin: 0 0 1.5rem 0;\n  }\n\n  h4 {\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #374151;\n    margin: 1.5rem 0 1rem 0;\n  }\n\n  .section-title {\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #374151;\n    margin: 2rem 0 1rem 0;\n    padding-top: 1.5rem;\n    border-top: 1px solid #e5e7eb;\n  }\n}\n\n.section-subtitle {\n  margin: -0.75rem 0 1.25rem;\n  color: #6b7280;\n  font-size: 0.95rem;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n  margin-bottom: 1.5rem;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n\n  label {\n    font-weight: 600;\n    color: #374151;\n    font-size: 0.95rem;\n  }\n\n  input {\n    width: 100%;\n  }\n\n  .form-hint {\n    font-size: 0.85rem;\n    color: #6b7280;\n    margin-top: 0.25rem;\n  }\n\n  small.error {\n    font-size: 0.85rem;\n    color: #dc2626;\n    margin-top: 0.25rem;\n  }\n\n  .checkbox-label {\n    margin-left: 0.5rem;\n    font-weight: normal;\n\n    a {\n      color: #2563eb;\n      text-decoration: none;\n\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n}\n\n.step-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n}\n\n.certifications-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.certification-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  transition: all 0.2s;\n\n  &:hover {\n    background: #f3f4f6;\n    border-color: #d1d5db;\n  }\n\n  .cert-info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n\n    .cert-type {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-weight: 600;\n      color: #1f2937;\n      font-size: 1rem;\n\n      i {\n        color: #dc2626;\n        font-size: 1.25rem;\n      }\n    }\n\n    .cert-details {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      font-size: 0.875rem;\n      color: #6b7280;\n\n      .cert-number {\n        font-weight: 500;\n        color: #374151;\n      }\n\n      .cert-dates {\n        font-style: italic;\n      }\n\n      .cert-file {\n        color: #2563eb;\n      }\n    }\n  }\n\n  .cert-actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n\n    .cert-actions {\n      width: 100%;\n      justify-content: flex-end;\n    }\n  }\n}\n\n.add-cert-section {\n  margin: 1.5rem 0;\n}\n\n.certification-form-panel {\n  background: #f9fafb;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n\n  h4 {\n    margin-top: 0;\n    color: #1f2937;\n  }\n\n  .cert-form-actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: 1rem;\n    margin-top: 1.5rem;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n    }\n  }\n}\n\n.review-section {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-top: 2rem;\n\n  h4 {\n    margin-top: 0;\n    margin-bottom: 1rem;\n    color: #1f2937;\n  }\n\n  .review-summary {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n\n    .review-item {\n      display: flex;\n      justify-content: space-between;\n      padding-bottom: 0.75rem;\n      border-bottom: 1px solid #e5e7eb;\n\n      &:last-child {\n        border-bottom: none;\n        padding-bottom: 0;\n      }\n\n      .review-label {\n        font-weight: 600;\n        color: #6b7280;\n        font-size: 0.95rem;\n      }\n\n      .review-value {\n        color: #1f2937;\n        font-size: 0.95rem;\n        text-align: right;\n      }\n    }\n  }\n}\n\n@media (max-width: 768px) {\n  .registration-container {\n    padding: 1rem;\n  }\n\n  .registration-card {\n    padding: 1.5rem 1rem;\n  }\n\n  .registration-header {\n    h1 {\n      font-size: 1.5rem;\n    }\n\n    p {\n      font-size: 0.9rem;\n    }\n  }\n\n  .step-form {\n    h3 {\n      font-size: 1.25rem;\n    }\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SupplierOnboardingPage, { className: "SupplierOnboardingPage", filePath: "src/app/public/supplier/supplier-onboarding.page.ts", lineNumber: 51 }); })();
