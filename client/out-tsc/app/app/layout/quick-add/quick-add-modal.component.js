import { Component, inject, model, output, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { NotificationService } from '../../core/notifications';
import { LeadDataService } from '../../crm/features/leads/services/lead-data.service';
import { ContactDataService } from '../../crm/features/contacts/services/contact-data.service';
import { CustomerDataService } from '../../crm/features/customers/services/customer-data.service';
import { OpportunityDataService } from '../../crm/features/opportunities/services/opportunity-data.service';
import { ActivityDataService } from '../../crm/features/activities/services/activity-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/dialog";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/inputgroup";
import * as i7 from "primeng/inputgroupaddon";
import * as i8 from "primeng/textarea";
import * as i9 from "primeng/select";
import * as i10 from "primeng/datepicker";
const _c0 = () => ({ width: "760px", maxWidth: "96vw" });
const _c1 = () => ({ standalone: true });
function QuickAddModalComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "i", 14);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const validationMessage_r1 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(validationMessage_r1);
} }
function QuickAddModalComponent_div_19_small_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Lead name is required.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 8)(2, "label", 16);
    i0.ɵɵtext(3, "Name ");
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-inputgroup")(7, "p-inputgroup-addon", 18);
    i0.ɵɵelement(8, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 20);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_19_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddLeadName, $event) || (ctx_r2.quickAddLeadName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, QuickAddModalComponent_div_19_small_10_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 8)(12, "label", 22);
    i0.ɵɵtext(13, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p-inputgroup")(15, "p-inputgroup-addon", 23);
    i0.ɵɵelement(16, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 25);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_19_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddLeadCompany, $event) || (ctx_r2.quickAddLeadCompany = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 8)(19, "label", 26);
    i0.ɵɵtext(20, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-inputgroup")(22, "p-inputgroup-addon", 27);
    i0.ɵɵelement(23, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_19_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddLeadEmail, $event) || (ctx_r2.quickAddLeadEmail = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 8)(26, "label", 30);
    i0.ɵɵtext(27, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p-inputgroup")(29, "p-inputgroup-addon", 31);
    i0.ɵɵelement(30, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "input", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_19_Template_input_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddLeadPhone, $event) || (ctx_r2.quickAddLeadPhone = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.leadNameInvalid());
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddLeadName);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(11, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.leadNameInvalid());
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddLeadCompany);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(12, _c1));
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddLeadEmail);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(13, _c1));
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddLeadPhone);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(14, _c1));
} }
function QuickAddModalComponent_div_20_small_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Contact name is required.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_20_small_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Account is required.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 8)(2, "label", 35);
    i0.ɵɵtext(3, "Name ");
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-inputgroup")(7, "p-inputgroup-addon", 18);
    i0.ɵɵelement(8, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 36);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_20_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddContactName, $event) || (ctx_r2.quickAddContactName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, QuickAddModalComponent_div_20_small_10_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 8)(12, "label", 37);
    i0.ɵɵtext(13, "Account ");
    i0.ɵɵelementStart(14, "span", 17);
    i0.ɵɵtext(15, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p-select", 38);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_20_Template_p_select_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddContactAccountId, $event) || (ctx_r2.quickAddContactAccountId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, QuickAddModalComponent_div_20_small_17_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 8)(19, "label", 39);
    i0.ɵɵtext(20, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-inputgroup")(22, "p-inputgroup-addon", 27);
    i0.ɵɵelement(23, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 40);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_20_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddContactEmail, $event) || (ctx_r2.quickAddContactEmail = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 8)(26, "label", 41);
    i0.ɵɵtext(27, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p-inputgroup")(29, "p-inputgroup-addon", 31);
    i0.ɵɵelement(30, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "input", 42);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_20_Template_input_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddContactPhone, $event) || (ctx_r2.quickAddContactPhone = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.contactNameInvalid());
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddContactName);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(15, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.contactNameInvalid());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.contactAccountInvalid());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.accountOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddContactAccountId);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(16, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.contactAccountInvalid());
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddContactEmail);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(17, _c1));
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddContactPhone);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(18, _c1));
} }
function QuickAddModalComponent_div_21_small_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Activity subject is required.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_21_div_42_small_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Choose the related account.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_21_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "label", 64);
    i0.ɵɵtext(2, "Account ");
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-select", 65);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_div_42_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityRelationId, $event) || (ctx_r2.quickAddActivityRelationId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, QuickAddModalComponent_div_21_div_42_small_6_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.activityRelationInvalid());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.accountOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityRelationId);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(6, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activityRelationInvalid());
} }
function QuickAddModalComponent_div_21_div_43_small_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Choose the related contact.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_21_div_43_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "label", 66);
    i0.ɵɵtext(2, "Contact ");
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-select", 67);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_div_43_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityRelationId, $event) || (ctx_r2.quickAddActivityRelationId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, QuickAddModalComponent_div_21_div_43_small_6_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.activityRelationInvalid());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.contactOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityRelationId);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(6, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activityRelationInvalid());
} }
function QuickAddModalComponent_div_21_div_44_small_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 34);
    i0.ɵɵtext(1, "Choose the related deal.");
    i0.ɵɵelementEnd();
} }
function QuickAddModalComponent_div_21_div_44_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "label", 68);
    i0.ɵɵtext(2, "Deal ");
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-select", 69);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_div_44_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityRelationId, $event) || (ctx_r2.quickAddActivityRelationId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, QuickAddModalComponent_div_21_div_44_small_6_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.activityRelationInvalid());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.opportunityOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityRelationId);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(6, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activityRelationInvalid());
} }
function QuickAddModalComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 8)(2, "label", 43);
    i0.ɵɵtext(3, "Subject ");
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-inputgroup")(7, "p-inputgroup-addon", 18);
    i0.ɵɵelement(8, "i", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 45);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivitySubject, $event) || (ctx_r2.quickAddActivitySubject = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, QuickAddModalComponent_div_21_small_10_Template, 2, 0, "small", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 8)(12, "label", 46);
    i0.ɵɵtext(13, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p-select", 47);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_select_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityType, $event) || (ctx_r2.quickAddActivityType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 8)(16, "label", 48);
    i0.ɵɵtext(17, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p-select", 49);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityPriority, $event) || (ctx_r2.quickAddActivityPriority = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 8)(20, "label", 50);
    i0.ɵɵtext(21, "Due date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p-datePicker", 51);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_datePicker_ngModelChange_22_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityDueDate, $event) || (ctx_r2.quickAddActivityDueDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 52)(24, "label", 53);
    i0.ɵɵtext(25, "Outcome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "textarea", 54);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_textarea_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityOutcome, $event) || (ctx_r2.quickAddActivityOutcome = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 8)(28, "label", 55);
    i0.ɵɵtext(29, "Next step subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p-inputgroup")(31, "p-inputgroup-addon", 56);
    i0.ɵɵelement(32, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityNextStepSubject, $event) || (ctx_r2.quickAddActivityNextStepSubject = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 8)(35, "label", 59);
    i0.ɵɵtext(36, "Next step due");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "p-datePicker", 60);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_datePicker_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityNextStepDueDate, $event) || (ctx_r2.quickAddActivityNextStepDueDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 8)(39, "label", 61);
    i0.ɵɵtext(40, "Related to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "p-select", 62);
    i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_select_ngModelChange_41_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.quickAddActivityRelationType, $event) || (ctx_r2.quickAddActivityRelationType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function QuickAddModalComponent_div_21_Template_p_select_ngModelChange_41_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onQuickAddRelationTypeChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(42, QuickAddModalComponent_div_21_div_42_Template, 7, 7, "div", 63)(43, QuickAddModalComponent_div_21_div_43_Template, 7, 7, "div", 63)(44, QuickAddModalComponent_div_21_div_44_Template, 7, 7, "div", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("form-field--invalid", ctx_r2.activitySubjectInvalid());
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivitySubject);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(25, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activitySubjectInvalid());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.activityTypeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityType);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(26, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.activityPriorityOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityPriority);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(27, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityDueDate);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(28, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityOutcome);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(29, _c1));
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityNextStepSubject);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(30, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityNextStepDueDate);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(31, _c1));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.activityRelationOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.quickAddActivityRelationType);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(32, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.quickAddActivityRelationType === "Account");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.quickAddActivityRelationType === "Contact");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.quickAddActivityRelationType === "Opportunity");
} }
function QuickAddModalComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function QuickAddModalComponent_ng_template_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.close.emit()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 71);
    i0.ɵɵlistener("click", function QuickAddModalComponent_ng_template_22_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitQuickAdd()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r2.quickAddPrimaryLabel())("disabled", ctx_r2.saving() || !ctx_r2.canSubmitQuickAdd());
} }
export class QuickAddModalComponent {
    notificationService = inject(NotificationService);
    leadData = inject(LeadDataService);
    contactData = inject(ContactDataService);
    customerData = inject(CustomerDataService);
    opportunityData = inject(OpportunityDataService);
    activityData = inject(ActivityDataService);
    visible = model(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    close = output();
    created = output();
    quickAddType = 'lead';
    quickAddTypes = [
        { label: 'Lead', value: 'lead' },
        { label: 'Contact', value: 'contact' },
        { label: 'Activity', value: 'activity' }
    ];
    quickAddLeadName = '';
    quickAddLeadCompany = '';
    quickAddLeadEmail = '';
    quickAddLeadPhone = '';
    quickAddContactName = '';
    quickAddContactEmail = '';
    quickAddContactPhone = '';
    quickAddContactAccountId = null;
    quickAddActivitySubject = '';
    quickAddActivityType = 'Task';
    quickAddActivityPriority = 'Normal';
    quickAddActivityDueDate;
    quickAddActivityOutcome = '';
    quickAddActivityNextStepSubject = '';
    quickAddActivityNextStepDueDate;
    quickAddActivityRelationType = 'Account';
    quickAddActivityRelationId = null;
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    submitted = signal(false, ...(ngDevMode ? [{ debugName: "submitted" }] : []));
    validationMessage = signal(null, ...(ngDevMode ? [{ debugName: "validationMessage" }] : []));
    accountOptions = signal([], ...(ngDevMode ? [{ debugName: "accountOptions" }] : []));
    contactOptions = signal([], ...(ngDevMode ? [{ debugName: "contactOptions" }] : []));
    opportunityOptions = signal([], ...(ngDevMode ? [{ debugName: "opportunityOptions" }] : []));
    activityTypeOptions = [
        { label: 'Task', value: 'Task' },
        { label: 'Call', value: 'Call' },
        { label: 'Email', value: 'Email' },
        { label: 'Meeting', value: 'Meeting' }
    ];
    activityPriorityOptions = [
        { label: 'High', value: 'High' },
        { label: 'Normal', value: 'Normal' },
        { label: 'Low', value: 'Low' }
    ];
    activityRelationOptions = [
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Opportunity', value: 'Opportunity' }
    ];
    open(type) {
        this.resetForm(type);
        this.loadLookups();
    }
    onQuickAddRelationTypeChange(_value) {
        this.quickAddActivityRelationId = null;
    }
    canSubmitQuickAdd() {
        if (this.quickAddType === 'lead') {
            return !!this.quickAddLeadName.trim();
        }
        if (this.quickAddType === 'contact') {
            return !!this.quickAddContactName.trim() && !!this.quickAddContactAccountId;
        }
        return !!this.quickAddActivitySubject.trim() && !!this.quickAddActivityRelationId;
    }
    submitQuickAdd() {
        if (this.saving())
            return;
        this.submitted.set(true);
        if (!this.validateQuickAdd()) {
            return;
        }
        this.saving.set(true);
        if (this.quickAddType === 'lead') {
            const { firstName, lastName } = this.splitName(this.quickAddLeadName);
            const payload = {
                firstName,
                lastName,
                companyName: this.quickAddLeadCompany || undefined,
                email: this.quickAddLeadEmail || undefined,
                phone: this.quickAddLeadPhone || undefined,
                status: 'New'
            };
            this.leadData.create(payload).subscribe({
                next: () => this.finishQuickAdd('Lead created', payload.firstName),
                error: () => this.failQuickAdd('Lead')
            });
            return;
        }
        if (this.quickAddType === 'contact') {
            const { firstName, lastName } = this.splitName(this.quickAddContactName);
            this.contactData.create({
                firstName,
                lastName,
                email: this.quickAddContactEmail || undefined,
                phone: this.quickAddContactPhone || undefined,
                accountId: this.quickAddContactAccountId || undefined
            }).subscribe({
                next: () => this.finishQuickAdd('Contact created', `${firstName} ${lastName}`.trim()),
                error: () => this.failQuickAdd('Contact')
            });
            return;
        }
        const dueDate = this.quickAddActivityDueDate instanceof Date
            ? this.quickAddActivityDueDate.toISOString()
            : this.quickAddActivityDueDate;
        const fallbackOutcome = this.quickAddActivityOutcome?.trim() || 'Logged via quick add';
        const fallbackNextStepSubject = this.quickAddActivityNextStepSubject?.trim() || 'Follow-up';
        const fallbackNextStepDueDate = this.quickAddActivityNextStepDueDate
            ? this.quickAddActivityNextStepDueDate
            : new Date(Date.now() + 24 * 60 * 60 * 1000);
        const nextStepDueDate = fallbackNextStepDueDate instanceof Date
            ? fallbackNextStepDueDate.toISOString()
            : fallbackNextStepDueDate;
        const activityPayload = {
            subject: this.quickAddActivitySubject.trim(),
            type: this.quickAddActivityType,
            priority: this.quickAddActivityPriority,
            dueDateUtc: dueDate,
            outcome: fallbackOutcome,
            nextStepSubject: fallbackNextStepSubject,
            nextStepDueDateUtc: nextStepDueDate,
            relatedEntityType: this.quickAddActivityRelationType,
            relatedEntityId: this.quickAddActivityRelationId || undefined
        };
        this.activityData.create(activityPayload).subscribe({
            next: () => this.finishQuickAdd('Activity created', activityPayload.subject),
            error: () => this.failQuickAdd('Activity')
        });
    }
    finishQuickAdd(title, name) {
        this.saving.set(false);
        this.validationMessage.set(null);
        this.notificationService.success(title, name ? `${name} saved successfully.` : 'Saved successfully.');
        this.created.emit();
        this.close.emit();
    }
    failQuickAdd(label) {
        this.saving.set(false);
        this.notificationService.error(`${label} not saved`, 'Please try again.');
    }
    resetForm(type) {
        this.quickAddType = type ?? 'lead';
        this.submitted.set(false);
        this.validationMessage.set(null);
        this.quickAddLeadName = '';
        this.quickAddLeadCompany = '';
        this.quickAddLeadEmail = '';
        this.quickAddLeadPhone = '';
        this.quickAddContactName = '';
        this.quickAddContactEmail = '';
        this.quickAddContactPhone = '';
        this.quickAddContactAccountId = null;
        this.quickAddActivitySubject = '';
        this.quickAddActivityType = 'Task';
        this.quickAddActivityPriority = 'Normal';
        this.quickAddActivityDueDate = undefined;
        this.quickAddActivityOutcome = '';
        this.quickAddActivityNextStepSubject = '';
        this.quickAddActivityNextStepDueDate = undefined;
        this.quickAddActivityRelationType = 'Account';
        this.quickAddActivityRelationId = null;
    }
    leadNameInvalid() {
        return this.submitted() && !this.quickAddLeadName.trim();
    }
    contactNameInvalid() {
        return this.submitted() && !this.quickAddContactName.trim();
    }
    contactAccountInvalid() {
        return this.submitted() && !this.quickAddContactAccountId;
    }
    activitySubjectInvalid() {
        return this.submitted() && !this.quickAddActivitySubject.trim();
    }
    activityRelationInvalid() {
        return this.submitted() && !this.quickAddActivityRelationId;
    }
    quickAddPrimaryLabel() {
        return this.quickAddType === 'lead'
            ? 'Create Lead'
            : this.quickAddType === 'contact'
                ? 'Create Contact'
                : 'Create Activity';
    }
    validateQuickAdd() {
        if (this.quickAddType === 'lead') {
            if (!this.quickAddLeadName.trim()) {
                this.validationMessage.set('Lead name is required.');
                return false;
            }
        }
        if (this.quickAddType === 'contact') {
            if (!this.quickAddContactName.trim()) {
                this.validationMessage.set('Contact name is required.');
                return false;
            }
            if (!this.quickAddContactAccountId) {
                this.validationMessage.set('Account is required for quick-add contact creation.');
                return false;
            }
        }
        if (this.quickAddType === 'activity') {
            if (!this.quickAddActivitySubject.trim()) {
                this.validationMessage.set('Activity subject is required.');
                return false;
            }
            if (!this.quickAddActivityRelationId) {
                this.validationMessage.set('Select the related record before creating the activity.');
                return false;
            }
        }
        this.validationMessage.set(null);
        return true;
    }
    splitName(value) {
        const trimmed = value.trim();
        if (!trimmed) {
            return { firstName: 'Unknown', lastName: '' };
        }
        const parts = trimmed.split(/\s+/);
        const firstName = parts.shift() ?? '';
        const lastName = parts.join(' ');
        return { firstName, lastName };
    }
    loadLookups() {
        if (!this.accountOptions().length) {
            this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
                this.accountOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
            });
        }
        if (!this.contactOptions().length) {
            this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
                this.contactOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
            });
        }
        if (!this.opportunityOptions().length) {
            this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
                this.opportunityOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
            });
        }
    }
    static ɵfac = function QuickAddModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QuickAddModalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QuickAddModalComponent, selectors: [["app-quick-add-modal"]], inputs: { visible: [1, "visible"] }, outputs: { visible: "visibleChange", close: "close", created: "created" }, decls: 23, vars: 24, consts: [["header", "Quick add", "styleClass", "quick-add-dialog", 3, "visibleChange", "onHide", "visible", "modal", "draggable", "resizable"], [1, "quick-add"], [1, "quick-add__hero"], [1, "quick-add__hero-copy"], [1, "quick-add__eyebrow"], [1, "quick-add__hero-badge"], [1, "pi"], ["class", "quick-add__validation", 4, "ngIf"], [1, "form-field"], ["for", "qa-recordType"], ["id", "qa-recordType", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["class", "quick-add__grid", 4, "ngIf"], ["pTemplate", "footer"], [1, "quick-add__validation"], [1, "pi", "pi-exclamation-triangle"], [1, "quick-add__grid"], ["for", "qa-leadName"], [1, "field-required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-user"], ["pInputText", "", "id", "qa-leadName", "placeholder", "Lead name", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["class", "field-error", 4, "ngIf"], ["for", "qa-leadCompany"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-building"], ["pInputText", "", "id", "qa-leadCompany", "placeholder", "Company", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-leadEmail"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "qa-leadEmail", "placeholder", "name@company.com", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-leadPhone"], [1, "icon-addon", "icon-addon--phone"], [1, "pi", "pi-phone"], ["pInputText", "", "id", "qa-leadPhone", "placeholder", "+1 555 000 0000", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "field-error"], ["for", "qa-contactName"], ["pInputText", "", "id", "qa-contactName", "placeholder", "Contact name", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-contactAccount"], ["id", "qa-contactAccount", "optionLabel", "label", "optionValue", "value", "placeholder", "Select account", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "qa-contactEmail"], ["pInputText", "", "id", "qa-contactEmail", "placeholder", "name@company.com", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-contactPhone"], ["pInputText", "", "id", "qa-contactPhone", "placeholder", "+1 555 000 0000", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-activitySubject"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "qa-activitySubject", "placeholder", "Follow up call", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-activityType"], ["id", "qa-activityType", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "qa-activityPriority"], ["id", "qa-activityPriority", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "qa-activityDueDate"], ["id", "qa-activityDueDate", "appendTo", "body", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "form-field", "full-row"], ["for", "qa-activityOutcome"], ["pTextarea", "", "id", "qa-activityOutcome", "rows", "2", "placeholder", "Capture outcome and key takeaways", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-activityNextStepSubject"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-info-circle"], ["pInputText", "", "id", "qa-activityNextStepSubject", "placeholder", "Follow-up task", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-activityNextStepDueDate"], ["id", "qa-activityNextStepDueDate", "appendTo", "body", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "qa-activityRelatedTo"], ["id", "qa-activityRelatedTo", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["class", "form-field", 3, "form-field--invalid", 4, "ngIf"], ["for", "qa-activityAccount"], ["id", "qa-activityAccount", "optionLabel", "label", "optionValue", "value", "placeholder", "Select account", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "qa-activityContact"], ["id", "qa-activityContact", "optionLabel", "label", "optionValue", "value", "placeholder", "Select contact", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "qa-activityOpportunity"], ["id", "qa-activityOpportunity", "optionLabel", "label", "optionValue", "value", "placeholder", "Select deal", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "disabled"]], template: function QuickAddModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "p-dialog", 0);
            i0.ɵɵtwoWayListener("visibleChange", function QuickAddModalComponent_Template_p_dialog_visibleChange_0_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.visible, $event) || (ctx.visible = $event); return $event; });
            i0.ɵɵlistener("onHide", function QuickAddModalComponent_Template_p_dialog_onHide_0_listener() { return ctx.close.emit(); });
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5, "Quick create");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h3");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 5);
            i0.ɵɵelement(11, "i", 6);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(14, QuickAddModalComponent_div_14_Template, 4, 1, "div", 7);
            i0.ɵɵelementStart(15, "div", 8)(16, "label", 9);
            i0.ɵɵtext(17, "Record type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p-select", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function QuickAddModalComponent_Template_p_select_ngModelChange_18_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.quickAddType, $event) || (ctx.quickAddType = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(19, QuickAddModalComponent_div_19_Template, 32, 15, "div", 11)(20, QuickAddModalComponent_div_20_Template, 32, 19, "div", 11)(21, QuickAddModalComponent_div_21_Template, 45, 33, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(22, QuickAddModalComponent_ng_template_22_Template, 2, 2, "ng-template", 12);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(22, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.visible);
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.quickAddType === "lead" ? "Add a lead" : ctx.quickAddType === "contact" ? "Add a contact" : "Log an activity");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.quickAddType === "lead" ? "Capture the essentials first, then continue in the full form later." : ctx.quickAddType === "contact" ? "Create a contact with the core details and account link." : "Record the activity and keep follow-up details visible.");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("pi-user-plus", ctx.quickAddType === "lead")("pi-id-card", ctx.quickAddType === "contact")("pi-calendar-plus", ctx.quickAddType === "activity");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.quickAddType === "lead" ? "Lead" : ctx.quickAddType === "contact" ? "Contact" : "Activity");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.validationMessage());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.quickAddTypes);
            i0.ɵɵtwoWayProperty("ngModel", ctx.quickAddType);
            i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(23, _c1));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.quickAddType === "lead");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.quickAddType === "contact");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.quickAddType === "activity");
        } }, dependencies: [NgIf,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.ButtonDirective, i3.PrimeTemplate, DialogModule, i4.Dialog, InputTextModule, i5.InputText, InputGroupModule, i6.InputGroup, InputGroupAddonModule, i7.InputGroupAddon, TextareaModule, i8.Textarea, SelectModule, i9.Select, DatePickerModule, i10.DatePicker], styles: [".quick-add[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-4);\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog {\n  overflow: hidden;\n  border-radius: 30px;\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.6)),\n    linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.12));\n  box-shadow:\n    0 28px 80px rgba(15, 23, 42, 0.24),\n    inset 0 1px 0 rgba(255, 255, 255, 0.78),\n    inset 0 -1px 0 rgba(148, 163, 184, 0.14);\n  backdrop-filter: blur(28px) saturate(180%);\n  -webkit-backdrop-filter: blur(28px) saturate(180%);\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-header, \n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-content, \n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-header {\n  padding: 1.25rem 1.35rem 0.5rem;\n  border-bottom: 0;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-title {\n  font-weight: 800;\n  letter-spacing: 0.01em;\n  color: #0f172a;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-content {\n  padding: 0.75rem 1.35rem 1rem;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-footer {\n  padding: 0 1.35rem 1.35rem;\n  border-top: 0;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-header-close-button {\n  color: #475569;\n  background: rgba(255, 255, 255, 0.46);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-header-close-button:hover {\n  background: rgba(255, 255, 255, 0.68);\n  color: #0f172a;\n}\n\n.quick-add__hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.25rem;\n  padding: 1.1rem 1.2rem;\n  border-radius: 20px;\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.38)),\n    linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(168, 85, 247, 0.12));\n  border: 1px solid rgba(255, 255, 255, 0.58);\n  box-shadow:\n    0 16px 40px rgba(15, 23, 42, 0.09),\n    inset 0 1px 0 rgba(255, 255, 255, 0.74);\n  backdrop-filter: blur(20px) saturate(165%);\n  -webkit-backdrop-filter: blur(20px) saturate(165%);\n}\n\n.quick-add__hero-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n\n  h3 {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 800;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: #475569;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    max-width: 38rem;\n  }\n}\n\n.quick-add__eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #6366f1;\n}\n\n.quick-add__hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  padding: 0.7rem 0.95rem;\n  border-radius: 999px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(224, 231, 255, 0.66));\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);\n  color: #4338ca;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.quick-add__validation[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.65rem;\n  padding: 0.9rem 1rem;\n  border-radius: 18px;\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.42)),\n    linear-gradient(135deg, rgba(251, 146, 60, 0.16), rgba(244, 63, 94, 0.1));\n  border: 1px solid rgba(255, 255, 255, 0.58);\n  box-shadow:\n    0 14px 30px rgba(15, 23, 42, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  color: #9a3412;\n  font-weight: 600;\n}\n\n.quick-add__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem 1.1rem;\n\n  @media (max-width: 720px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 0.55rem;\n  padding: 0.9rem 1rem 1rem;\n  border-radius: 18px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.76));\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #475569;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(239, 246, 255, 0.82));\n    border-color: rgba(148, 163, 184, 0.22);\n\n    > label {\n      color: #334155;\n    }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 10px 24px rgba(var(--apple-blue), 0.09);\n\n    > label {\n      color: #4f46e5;\n    }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n  }\n\n  &.form-field--invalid {\n    border-color: rgba(248, 113, 113, 0.42);\n    box-shadow: 0 12px 26px rgba(248, 113, 113, 0.08);\n\n    > label {\n      color: #b91c1c;\n    }\n  }\n}\n\n.field-required[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.field-error[_ngcontent-%COMP%] {\n  color: #b91c1c;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n[_nghost-%COMP%]     .quick-add-dialog .p-dialog-content {\n  padding-top: var(--md-space-4);\n}\n\n@media (max-width: 720px) {\n  .quick-add__hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .quick-add__hero-badge[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuickAddModalComponent, [{
        type: Component,
        args: [{ selector: 'app-quick-add-modal', standalone: true, imports: [
                    NgIf,
                    FormsModule,
                    ButtonModule,
                    DialogModule,
                    InputTextModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    TextareaModule,
                    SelectModule,
                    DatePickerModule
                ], template: "\n    <p-dialog\n      header=\"Quick add\"\n      [(visible)]=\"visible\"\n      [modal]=\"true\"\n      [style]=\"{ width: '760px', maxWidth: '96vw' }\"\n      [draggable]=\"false\"\n      [resizable]=\"false\"\n      styleClass=\"quick-add-dialog\"\n      (onHide)=\"close.emit()\"\n    >\n      <div class=\"quick-add\">\n        <div class=\"quick-add__hero\">\n          <div class=\"quick-add__hero-copy\">\n            <span class=\"quick-add__eyebrow\">Quick create</span>\n            <h3>{{ quickAddType === 'lead' ? 'Add a lead' : (quickAddType === 'contact' ? 'Add a contact' : 'Log an activity') }}</h3>\n            <p>{{ quickAddType === 'lead' ? 'Capture the essentials first, then continue in the full form later.' : (quickAddType === 'contact' ? 'Create a contact with the core details and account link.' : 'Record the activity and keep follow-up details visible.') }}</p>\n          </div>\n          <div class=\"quick-add__hero-badge\">\n            <i\n              class=\"pi\"\n              [class.pi-user-plus]=\"quickAddType === 'lead'\"\n              [class.pi-id-card]=\"quickAddType === 'contact'\"\n              [class.pi-calendar-plus]=\"quickAddType === 'activity'\"\n            ></i>\n            <span>{{ quickAddType === 'lead' ? 'Lead' : (quickAddType === 'contact' ? 'Contact' : 'Activity') }}</span>\n          </div>\n        </div>\n        <div class=\"quick-add__validation\" *ngIf=\"validationMessage() as validationMessage\">\n          <i class=\"pi pi-exclamation-triangle\"></i>\n          <span>{{ validationMessage }}</span>\n        </div>\n        <div class=\"form-field\">\n          <label for=\"qa-recordType\">Record type</label>\n          <p-select\n            id=\"qa-recordType\"\n            [options]=\"quickAddTypes\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [(ngModel)]=\"quickAddType\"\n            [ngModelOptions]=\"{ standalone: true }\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n\n        <div *ngIf=\"quickAddType === 'lead'\" class=\"quick-add__grid\">\n          <div class=\"form-field\" [class.form-field--invalid]=\"leadNameInvalid()\">\n            <label for=\"qa-leadName\">Name <span class=\"field-required\">*</span></label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                <i class=\"pi pi-user\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-leadName\" [(ngModel)]=\"quickAddLeadName\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"Lead name\" />\n            </p-inputgroup>\n            <small class=\"field-error\" *ngIf=\"leadNameInvalid()\">Lead name is required.</small>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-leadCompany\">Company</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                <i class=\"pi pi-building\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-leadCompany\" [(ngModel)]=\"quickAddLeadCompany\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"Company\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-leadEmail\">Email</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                <i class=\"pi pi-envelope\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-leadEmail\" [(ngModel)]=\"quickAddLeadEmail\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"name@company.com\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-leadPhone\">Phone</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--phone\">\n                <i class=\"pi pi-phone\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-leadPhone\" [(ngModel)]=\"quickAddLeadPhone\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"+1 555 000 0000\" />\n            </p-inputgroup>\n          </div>\n        </div>\n\n        <div *ngIf=\"quickAddType === 'contact'\" class=\"quick-add__grid\">\n          <div class=\"form-field\" [class.form-field--invalid]=\"contactNameInvalid()\">\n            <label for=\"qa-contactName\">Name <span class=\"field-required\">*</span></label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                <i class=\"pi pi-user\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-contactName\" [(ngModel)]=\"quickAddContactName\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"Contact name\" />\n            </p-inputgroup>\n            <small class=\"field-error\" *ngIf=\"contactNameInvalid()\">Contact name is required.</small>\n          </div>\n          <div class=\"form-field\" [class.form-field--invalid]=\"contactAccountInvalid()\">\n            <label for=\"qa-contactAccount\">Account <span class=\"field-required\">*</span></label>\n            <p-select\n              id=\"qa-contactAccount\"\n              [options]=\"accountOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddContactAccountId\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              placeholder=\"Select account\"\n              appendTo=\"body\"\n            ></p-select>\n            <small class=\"field-error\" *ngIf=\"contactAccountInvalid()\">Account is required.</small>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-contactEmail\">Email</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                <i class=\"pi pi-envelope\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-contactEmail\" [(ngModel)]=\"quickAddContactEmail\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"name@company.com\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-contactPhone\">Phone</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--phone\">\n                <i class=\"pi pi-phone\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-contactPhone\" [(ngModel)]=\"quickAddContactPhone\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"+1 555 000 0000\" />\n            </p-inputgroup>\n          </div>\n        </div>\n\n        <div *ngIf=\"quickAddType === 'activity'\" class=\"quick-add__grid\">\n          <div class=\"form-field\" [class.form-field--invalid]=\"activitySubjectInvalid()\">\n            <label for=\"qa-activitySubject\">Subject <span class=\"field-required\">*</span></label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                <i class=\"pi pi-tag\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-activitySubject\" [(ngModel)]=\"quickAddActivitySubject\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"Follow up call\" />\n            </p-inputgroup>\n            <small class=\"field-error\" *ngIf=\"activitySubjectInvalid()\">Activity subject is required.</small>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityType\">Type</label>\n            <p-select\n              id=\"qa-activityType\"\n              [options]=\"activityTypeOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityType\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              appendTo=\"body\"\n            ></p-select>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityPriority\">Priority</label>\n            <p-select\n              id=\"qa-activityPriority\"\n              [options]=\"activityPriorityOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityPriority\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              appendTo=\"body\"\n            ></p-select>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityDueDate\">Due date</label>\n            <p-datePicker id=\"qa-activityDueDate\" [(ngModel)]=\"quickAddActivityDueDate\" [ngModelOptions]=\"{ standalone: true }\" appendTo=\"body\"></p-datePicker>\n          </div>\n          <div class=\"form-field full-row\">\n            <label for=\"qa-activityOutcome\">Outcome</label>\n            <textarea\n              pTextarea\n              id=\"qa-activityOutcome\"\n              [(ngModel)]=\"quickAddActivityOutcome\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              rows=\"2\"\n              placeholder=\"Capture outcome and key takeaways\"\n            ></textarea>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityNextStepSubject\">Next step subject</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                <i class=\"pi pi-info-circle\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"qa-activityNextStepSubject\" [(ngModel)]=\"quickAddActivityNextStepSubject\" [ngModelOptions]=\"{ standalone: true }\" placeholder=\"Follow-up task\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityNextStepDueDate\">Next step due</label>\n            <p-datePicker id=\"qa-activityNextStepDueDate\" [(ngModel)]=\"quickAddActivityNextStepDueDate\" [ngModelOptions]=\"{ standalone: true }\" appendTo=\"body\"></p-datePicker>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"qa-activityRelatedTo\">Related to</label>\n            <p-select\n              id=\"qa-activityRelatedTo\"\n              [options]=\"activityRelationOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityRelationType\"\n              (ngModelChange)=\"onQuickAddRelationTypeChange($event)\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              appendTo=\"body\"\n            ></p-select>\n          </div>\n          <div class=\"form-field\" [class.form-field--invalid]=\"activityRelationInvalid()\" *ngIf=\"quickAddActivityRelationType === 'Account'\">\n            <label for=\"qa-activityAccount\">Account <span class=\"field-required\">*</span></label>\n            <p-select\n              id=\"qa-activityAccount\"\n              [options]=\"accountOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityRelationId\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              placeholder=\"Select account\"\n              appendTo=\"body\"\n            ></p-select>\n            <small class=\"field-error\" *ngIf=\"activityRelationInvalid()\">Choose the related account.</small>\n          </div>\n          <div class=\"form-field\" [class.form-field--invalid]=\"activityRelationInvalid()\" *ngIf=\"quickAddActivityRelationType === 'Contact'\">\n            <label for=\"qa-activityContact\">Contact <span class=\"field-required\">*</span></label>\n            <p-select\n              id=\"qa-activityContact\"\n              [options]=\"contactOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityRelationId\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              placeholder=\"Select contact\"\n              appendTo=\"body\"\n            ></p-select>\n            <small class=\"field-error\" *ngIf=\"activityRelationInvalid()\">Choose the related contact.</small>\n          </div>\n          <div class=\"form-field\" [class.form-field--invalid]=\"activityRelationInvalid()\" *ngIf=\"quickAddActivityRelationType === 'Opportunity'\">\n            <label for=\"qa-activityOpportunity\">Deal <span class=\"field-required\">*</span></label>\n            <p-select\n              id=\"qa-activityOpportunity\"\n              [options]=\"opportunityOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"quickAddActivityRelationId\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              placeholder=\"Select deal\"\n              appendTo=\"body\"\n            ></p-select>\n            <small class=\"field-error\" *ngIf=\"activityRelationInvalid()\">Choose the related deal.</small>\n          </div>\n        </div>\n      </div>\n      <ng-template pTemplate=\"footer\">\n        <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"close.emit()\"></button>\n        <button\n          pButton\n          type=\"button\"\n          class=\"crm-button crm-button--primary\"\n          [label]=\"quickAddPrimaryLabel()\"\n          [disabled]=\"saving() || !canSubmitQuickAdd()\"\n          (click)=\"submitQuickAdd()\"\n        ></button>\n      </ng-template>\n    </p-dialog>\n  \n", styles: [".quick-add {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-4);\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog {\n  overflow: hidden;\n  border-radius: 30px;\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.6)),\n    linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.12));\n  box-shadow:\n    0 28px 80px rgba(15, 23, 42, 0.24),\n    inset 0 1px 0 rgba(255, 255, 255, 0.78),\n    inset 0 -1px 0 rgba(148, 163, 184, 0.14);\n  backdrop-filter: blur(28px) saturate(180%);\n  -webkit-backdrop-filter: blur(28px) saturate(180%);\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-header,\n:host ::ng-deep .quick-add-dialog .p-dialog-content,\n:host ::ng-deep .quick-add-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-header {\n  padding: 1.25rem 1.35rem 0.5rem;\n  border-bottom: 0;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-title {\n  font-weight: 800;\n  letter-spacing: 0.01em;\n  color: #0f172a;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-content {\n  padding: 0.75rem 1.35rem 1rem;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-footer {\n  padding: 0 1.35rem 1.35rem;\n  border-top: 0;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-header-close-button {\n  color: #475569;\n  background: rgba(255, 255, 255, 0.46);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-header-close-button:hover {\n  background: rgba(255, 255, 255, 0.68);\n  color: #0f172a;\n}\n\n.quick-add__hero {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.25rem;\n  padding: 1.1rem 1.2rem;\n  border-radius: 20px;\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.38)),\n    linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(168, 85, 247, 0.12));\n  border: 1px solid rgba(255, 255, 255, 0.58);\n  box-shadow:\n    0 16px 40px rgba(15, 23, 42, 0.09),\n    inset 0 1px 0 rgba(255, 255, 255, 0.74);\n  backdrop-filter: blur(20px) saturate(165%);\n  -webkit-backdrop-filter: blur(20px) saturate(165%);\n}\n\n.quick-add__hero-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n\n  h3 {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 800;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: #475569;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    max-width: 38rem;\n  }\n}\n\n.quick-add__eyebrow {\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #6366f1;\n}\n\n.quick-add__hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  padding: 0.7rem 0.95rem;\n  border-radius: 999px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(224, 231, 255, 0.66));\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);\n  color: #4338ca;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.quick-add__validation {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.65rem;\n  padding: 0.9rem 1rem;\n  border-radius: 18px;\n  background-image:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.42)),\n    linear-gradient(135deg, rgba(251, 146, 60, 0.16), rgba(244, 63, 94, 0.1));\n  border: 1px solid rgba(255, 255, 255, 0.58);\n  box-shadow:\n    0 14px 30px rgba(15, 23, 42, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  color: #9a3412;\n  font-weight: 600;\n}\n\n.quick-add__grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem 1.1rem;\n\n  @media (max-width: 720px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 0.55rem;\n  padding: 0.9rem 1rem 1rem;\n  border-radius: 18px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.76));\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #475569;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(239, 246, 255, 0.82));\n    border-color: rgba(148, 163, 184, 0.22);\n\n    > label {\n      color: #334155;\n    }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 10px 24px rgba(var(--apple-blue), 0.09);\n\n    > label {\n      color: #4f46e5;\n    }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n  }\n\n  &.form-field--invalid {\n    border-color: rgba(248, 113, 113, 0.42);\n    box-shadow: 0 12px 26px rgba(248, 113, 113, 0.08);\n\n    > label {\n      color: #b91c1c;\n    }\n  }\n}\n\n.field-required {\n  color: #dc2626;\n}\n\n.field-error {\n  color: #b91c1c;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n:host ::ng-deep .quick-add-dialog .p-dialog-content {\n  padding-top: var(--md-space-4);\n}\n\n@media (max-width: 720px) {\n  .quick-add__hero {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .quick-add__hero-badge {\n    align-self: flex-start;\n  }\n}\n"] }]
    }], null, { visible: [{ type: i0.Input, args: [{ isSignal: true, alias: "visible", required: false }] }, { type: i0.Output, args: ["visibleChange"] }], close: [{ type: i0.Output, args: ["close"] }], created: [{ type: i0.Output, args: ["created"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QuickAddModalComponent, { className: "QuickAddModalComponent", filePath: "src/app/layout/quick-add/quick-add-modal.component.ts", lineNumber: 40 }); })();
