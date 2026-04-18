import { Component, DestroyRef, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { distinctUntilChanged, finalize, map, switchMap } from 'rxjs';
import { EmailDataService } from '../services/email-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { MailboxService } from '../services/mailbox.service';
import { EmailConnectionService } from '../../settings/services/email-connection.service';
import { CrmEmailLinkService } from '../services/crm-email-link.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/dialog";
import * as i4 from "primeng/api";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/select";
import * as i8 from "primeng/editor";
import * as i9 from "primeng/progressspinner";
const _c0 = () => ({ height: "220px" });
const _c1 = () => ({ standalone: true });
const _c2 = () => ({ width: "16px", height: "16px" });
const _c3 = () => ({ width: "720px", maxWidth: "95vw" });
const _c4 = () => ({ padding: "0" });
function EmailComposeDialogComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
    i0.ɵɵelement(2, "i", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 8)(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.headerIconClass());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.headerIcon());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.headerTitle());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.headerSubtitle());
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_9_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3.category);
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39)(1, "div", 40);
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 41)(4, "span", 42);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_9_span_6_Template, 2, 1, "span", 43);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r3.category);
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r4.name);
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "Choose a template (optional)...");
    i0.ɵɵelementEnd();
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_div_0_Template, 4, 1, "div", 45)(1, EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_span_1_Template, 2, 0, "span", 46);
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", item_r4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !item_r4);
} }
function EmailComposeDialogComponent_ng_template_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 14);
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Quick Start");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 16)(6, "label");
    i0.ɵɵtext(7, "Start from a template");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p-select", 36);
    i0.ɵɵlistener("ngModelChange", function EmailComposeDialogComponent_ng_template_2_Conditional_2_Template_p_select_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onTemplateSelected($event)); });
    i0.ɵɵtemplate(9, EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_9_Template, 7, 2, "ng-template", 37)(10, EmailComposeDialogComponent_ng_template_2_Conditional_2_ng_template_10_Template, 2, 2, "ng-template", 38);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("options", ctx_r0.templates())("ngModel", ctx_r0.selectedTemplateId())("ngModelOptions", i0.ɵɵpureFunction0(4, _c1))("showClear", true);
} }
function EmailComposeDialogComponent_ng_template_2_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 48);
    i0.ɵɵelement(1, "button", 49)(2, "button", 50)(3, "button", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 48);
    i0.ɵɵelement(5, "button", 52)(6, "button", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 48);
    i0.ɵɵelement(8, "button", 54)(9, "button", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 48);
    i0.ɵɵelement(11, "button", 56);
    i0.ɵɵelementEnd();
} }
function EmailComposeDialogComponent_ng_template_2_div_55_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("pi " + item_r5.icon);
    i0.ɵɵstyleProp("color", ctx_r0.getEntityColor(item_r5.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.label);
} }
function EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("pi " + item_r6.icon);
    i0.ɵɵstyleProp("color", ctx_r0.getEntityColor(item_r6.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.label);
} }
function EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "Select type...");
    i0.ɵɵelementEnd();
} }
function EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_div_0_Template, 4, 5, "div", 63)(1, EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_span_1_Template, 2, 0, "span", 46);
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", item_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !item_r6);
} }
function EmailComposeDialogComponent_ng_template_2_div_55_div_14_ng_template_4_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r7.subtitle);
} }
function EmailComposeDialogComponent_ng_template_2_div_55_div_14_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "span", 66);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, EmailComposeDialogComponent_ng_template_2_div_55_div_14_ng_template_4_span_3_Template, 2, 1, "span", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r7.subtitle);
} }
function EmailComposeDialogComponent_ng_template_2_div_55_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "label");
    i0.ɵɵtext(2, "Record Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 64);
    i0.ɵɵtemplate(4, EmailComposeDialogComponent_ng_template_2_div_55_div_14_ng_template_4_Template, 4, 2, "ng-template", 37);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r0.relatedRecordOptions())("filter", true)("loading", ctx_r0.relatedRecordLoading());
} }
function EmailComposeDialogComponent_ng_template_2_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57)(1, "div", 14);
    i0.ɵɵelement(2, "i", 58);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Link to Record");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 59);
    i0.ɵɵtext(6, "Optional");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 23)(8, "div", 16)(9, "label");
    i0.ɵɵtext(10, "Record Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p-select", 60);
    i0.ɵɵtemplate(12, EmailComposeDialogComponent_ng_template_2_div_55_ng_template_12_Template, 4, 5, "ng-template", 37)(13, EmailComposeDialogComponent_ng_template_2_div_55_ng_template_13_Template, 2, 2, "ng-template", 38);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, EmailComposeDialogComponent_ng_template_2_div_55_div_14_Template, 5, 3, "div", 61);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("options", ctx_r0.relatedEntityTypes);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.form.value.relatedEntityType);
} }
function EmailComposeDialogComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "form", 11);
    i0.ɵɵconditionalCreate(2, EmailComposeDialogComponent_ng_template_2_Conditional_2_Template, 11, 5, "div", 12);
    i0.ɵɵelementStart(3, "div", 13)(4, "div", 14);
    i0.ɵɵelement(5, "i", 15);
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Recipients");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 16)(9, "label");
    i0.ɵɵtext(10, "To ");
    i0.ɵɵelementStart(11, "span", 17);
    i0.ɵɵtext(12, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 18);
    i0.ɵɵelement(14, "i", 19)(15, "input", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 16)(17, "label");
    i0.ɵɵtext(18, "Recipient Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 18);
    i0.ɵɵelement(20, "i", 21)(21, "input", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 23)(23, "div", 16)(24, "label");
    i0.ɵɵtext(25, "CC");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 24);
    i0.ɵɵelementStart(27, "small", 25);
    i0.ɵɵtext(28, "Comma-separated");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 16)(30, "label");
    i0.ɵɵtext(31, "BCC");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 26);
    i0.ɵɵelementStart(33, "small", 25);
    i0.ɵɵtext(34, "Comma-separated");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(35, "div", 27)(36, "div", 14);
    i0.ɵɵelement(37, "i", 28);
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Message");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 16)(41, "label");
    i0.ɵɵtext(42, "Subject ");
    i0.ɵɵelementStart(43, "span", 17);
    i0.ɵɵtext(44, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 18);
    i0.ɵɵelement(46, "i", 29)(47, "input", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 31)(49, "label");
    i0.ɵɵtext(50, "Message Body ");
    i0.ɵɵelementStart(51, "span", 17);
    i0.ɵɵtext(52, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "p-editor", 32);
    i0.ɵɵtemplate(54, EmailComposeDialogComponent_ng_template_2_ng_template_54_Template, 12, 0, "ng-template", 33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, EmailComposeDialogComponent_ng_template_2_div_55_Template, 15, 2, "div", 34);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.mode === "new" ? 2 : -1);
    i0.ɵɵadvance(51);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(5, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.showRelatedEntity);
} }
function EmailComposeDialogComponent_ng_template_4_i_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 75);
} }
function EmailComposeDialogComponent_ng_template_4_p_progressSpinner_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-progressSpinner", 76);
} if (rf & 2) {
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(2, _c2));
} }
function EmailComposeDialogComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 69)(1, "button", 70);
    i0.ɵɵlistener("click", function EmailComposeDialogComponent_ng_template_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onCancel()); });
    i0.ɵɵelement(2, "i", 71);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 72);
    i0.ɵɵlistener("click", function EmailComposeDialogComponent_ng_template_4_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onSend()); });
    i0.ɵɵtemplate(6, EmailComposeDialogComponent_ng_template_4_i_6_Template, 1, 0, "i", 73)(7, EmailComposeDialogComponent_ng_template_4_p_progressSpinner_7_Template, 1, 3, "p-progressSpinner", 74);
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.sending());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.sending());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.sending());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.sending() ? "Sending..." : "Send Email");
} }
function EmailComposeDialogComponent_Conditional_6_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_6_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EmailComposeDialogComponent_Conditional_6_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 78);
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const composeHeader_r10 = i0.ɵɵreference(1);
    i0.ɵɵproperty("ngTemplateOutlet", composeHeader_r10);
} }
function EmailComposeDialogComponent_Conditional_6_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_6_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_6_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EmailComposeDialogComponent_Conditional_6_ng_template_3_ng_container_0_Template, 1, 0, "ng-container", 78);
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const composeFooter_r11 = i0.ɵɵreference(5);
    i0.ɵɵproperty("ngTemplateOutlet", composeFooter_r11);
} }
function EmailComposeDialogComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-dialog", 77);
    i0.ɵɵtwoWayListener("visibleChange", function EmailComposeDialogComponent_Conditional_6_Template_p_dialog_visibleChange_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.visible, $event) || (ctx_r0.visible = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onHide", function EmailComposeDialogComponent_Conditional_6_Template_p_dialog_onHide_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onCancel()); });
    i0.ɵɵtemplate(1, EmailComposeDialogComponent_Conditional_6_ng_template_1_Template, 1, 1, "ng-template", 33)(2, EmailComposeDialogComponent_Conditional_6_ng_container_2_Template, 1, 0, "ng-container", 78)(3, EmailComposeDialogComponent_Conditional_6_ng_template_3_Template, 1, 1, "ng-template", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    const composeContent_r12 = i0.ɵɵreference(3);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(7, _c3));
    i0.ɵɵtwoWayProperty("visible", ctx_r0.visible);
    i0.ɵɵproperty("modal", true)("dismissableMask", true)("contentStyle", i0.ɵɵpureFunction0(8, _c4));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", composeContent_r12);
} }
function EmailComposeDialogComponent_Conditional_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_7_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_7_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function EmailComposeDialogComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4)(1, "header", 80);
    i0.ɵɵtemplate(2, EmailComposeDialogComponent_Conditional_7_ng_container_2_Template, 1, 0, "ng-container", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, EmailComposeDialogComponent_Conditional_7_ng_container_3_Template, 1, 0, "ng-container", 78);
    i0.ɵɵelementStart(4, "footer", 81);
    i0.ɵɵtemplate(5, EmailComposeDialogComponent_Conditional_7_ng_container_5_Template, 1, 0, "ng-container", 78);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const composeHeader_r10 = i0.ɵɵreference(1);
    const composeContent_r12 = i0.ɵɵreference(3);
    const composeFooter_r11 = i0.ɵɵreference(5);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", composeHeader_r10);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", composeContent_r12);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", composeFooter_r11);
} }
export class EmailComposeDialogComponent {
    destroyRef = inject(DestroyRef);
    emailService = inject(EmailDataService);
    mailboxService = inject(MailboxService);
    emailConnectionService = inject(EmailConnectionService);
    crmLinkService = inject(CrmEmailLinkService);
    toast = inject(AppToastService);
    visible = false;
    embedded = false;
    showRelatedEntity = true;
    defaultToEmail = '';
    defaultToName = '';
    defaultSubject = '';
    defaultRelatedEntityType;
    defaultRelatedEntityId;
    mode = 'new';
    replyToEmail;
    visibleChange = new EventEmitter();
    sent = new EventEmitter();
    templates = signal([], ...(ngDevMode ? [{ debugName: "templates" }] : []));
    selectedTemplateId = signal(null, ...(ngDevMode ? [{ debugName: "selectedTemplateId" }] : []));
    sending = signal(false, ...(ngDevMode ? [{ debugName: "sending" }] : []));
    relatedRecordOptions = signal([], ...(ngDevMode ? [{ debugName: "relatedRecordOptions" }] : []));
    relatedRecordLoading = signal(false, ...(ngDevMode ? [{ debugName: "relatedRecordLoading" }] : []));
    // Computed signals for header based on mode
    headerTitle = () => {
        switch (this.mode) {
            case 'reply': return 'Reply';
            case 'replyAll': return 'Reply All';
            case 'forward': return 'Forward';
            default: return 'Compose Email';
        }
    };
    headerSubtitle = () => {
        switch (this.mode) {
            case 'reply': return 'Reply to this email';
            case 'replyAll': return 'Reply to all recipients';
            case 'forward': return 'Forward this email';
            default: return 'Send a new email message';
        }
    };
    headerIcon = () => {
        switch (this.mode) {
            case 'reply': return 'pi-reply';
            case 'replyAll': return 'pi-reply';
            case 'forward': return 'pi-arrow-right';
            default: return 'pi-envelope';
        }
    };
    headerIconClass = () => {
        return this.mode !== 'new' ? 'header-icon mode-' + this.mode : 'header-icon';
    };
    relatedEntityTypes = [
        { label: 'Lead', value: 'Lead', icon: 'pi-user-plus' },
        { label: 'Contact', value: 'Contact', icon: 'pi-user' },
        { label: 'Customer', value: 'Customer', icon: 'pi-building' },
        { label: 'Opportunity', value: 'Opportunity', icon: 'pi-dollar' },
        { label: 'Activity', value: 'Activity', icon: 'pi-calendar' }
    ];
    getEntityColor(type) {
        const colors = {
            Lead: '#06b6d4',
            Contact: '#8b5cf6',
            Customer: '#22c55e',
            Opportunity: '#f59e0b',
            Activity: '#3b82f6'
        };
        return colors[type] || '#6b7280';
    }
    form = new FormGroup({
        toEmail: new FormControl('', [Validators.required, Validators.email]),
        toName: new FormControl(''),
        ccEmails: new FormControl(''),
        bccEmails: new FormControl(''),
        subject: new FormControl('', [Validators.required]),
        htmlBody: new FormControl('', [Validators.required]),
        relatedEntityType: new FormControl(null),
        relatedEntityId: new FormControl(null)
    });
    ngOnInit() {
        this.loadTemplates();
        this.bindRelatedRecordOptions();
    }
    ngOnChanges(changes) {
        if (changes['visible'] && this.visible) {
            this.resetForm();
        }
    }
    onTemplateSelected(templateId) {
        this.selectedTemplateId.set(templateId);
        if (!templateId) {
            return;
        }
        this.emailService.getTemplate(templateId).subscribe({
            next: (template) => {
                this.form.patchValue({
                    subject: template.subject,
                    htmlBody: template.htmlBody
                });
            },
            error: () => {
                this.toast.show('error', 'Failed to load template');
            }
        });
    }
    onSend() {
        if (this.form.invalid || this.sending()) {
            return;
        }
        this.sending.set(true);
        const formValue = this.form.value;
        const request = {
            toEmail: formValue.toEmail ?? '',
            toName: formValue.toName || undefined,
            ccEmails: formValue.ccEmails || undefined,
            bccEmails: formValue.bccEmails || undefined,
            subject: formValue.subject ?? '',
            htmlBody: formValue.htmlBody ?? '',
            templateId: this.selectedTemplateId() ?? undefined,
            relatedEntityType: formValue.relatedEntityType ?? undefined,
            relatedEntityId: formValue.relatedEntityId ?? undefined
        };
        const hasRelatedEntity = !!request.relatedEntityType && !!request.relatedEntityId;
        const send$ = hasRelatedEntity
            ? this.emailService.send({
                ...request,
                sendImmediately: true,
                enableTracking: true
            }).pipe(map(() => ({ success: true })))
            : this.emailConnectionService.getConnections().pipe(switchMap((response) => {
                const primaryConnection = response.items.find((item) => item.isActive && item.isPrimary)
                    ?? response.items.find((item) => item.isActive);
                if (!primaryConnection) {
                    throw new Error('Connect an active mailbox account before sending email.');
                }
                const parseAddressList = (value) => (value ?? '')
                    .split(',')
                    .map((entry) => entry.trim())
                    .filter((entry) => entry.length > 0);
                return this.mailboxService.sendEmail(primaryConnection.id, {
                    to: [request.toEmail],
                    cc: parseAddressList(request.ccEmails),
                    bcc: parseAddressList(request.bccEmails),
                    subject: request.subject ?? '',
                    htmlBody: request.htmlBody ?? ''
                });
            }), map((response) => ({
                success: response.success,
                error: response.error
            })));
        send$.pipe(finalize(() => this.sending.set(false))).subscribe({
            next: (response) => {
                if (!response.success) {
                    this.toast.show('error', response.error ?? 'Failed to send email');
                    return;
                }
                this.toast.show('success', 'Email sent successfully');
                this.sent.emit();
                this.close();
            },
            error: (err) => {
                const maybeHttpError = err;
                this.toast.show('error', maybeHttpError.error?.message ?? maybeHttpError.message ?? 'Failed to send email');
            }
        });
    }
    onCancel() {
        this.close();
    }
    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.resetForm();
    }
    resetForm() {
        let toEmail = this.defaultToEmail;
        let toName = this.defaultToName;
        let ccEmails = '';
        let subject = this.defaultSubject;
        let htmlBody = '';
        // Handle reply/forward modes
        if (this.replyToEmail && this.mode !== 'new') {
            const email = this.replyToEmail;
            switch (this.mode) {
                case 'reply':
                    toEmail = email.from.email;
                    toName = email.from.name ?? '';
                    subject = email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`;
                    htmlBody = this.buildQuotedReply(email);
                    break;
                case 'replyAll':
                    toEmail = email.from.email;
                    toName = email.from.name ?? '';
                    // Add all original To recipients (except current user) to CC
                    const ccList = email.to
                        .filter(r => r.email !== toEmail)
                        .map(r => r.email)
                        .concat((email.cc ?? []).map(r => r.email));
                    ccEmails = ccList.join(', ');
                    subject = email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`;
                    htmlBody = this.buildQuotedReply(email);
                    break;
                case 'forward':
                    toEmail = '';
                    toName = '';
                    subject = email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`;
                    htmlBody = this.buildForwardBody(email);
                    break;
            }
        }
        this.form.reset({
            toEmail,
            toName,
            ccEmails,
            bccEmails: '',
            subject,
            htmlBody,
            relatedEntityType: this.defaultRelatedEntityType ?? null,
            relatedEntityId: this.defaultRelatedEntityId ?? null
        });
        this.selectedTemplateId.set(null);
    }
    bindRelatedRecordOptions() {
        this.form.controls.relatedEntityType.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
            .subscribe((entityType) => {
            if (!entityType) {
                this.relatedRecordOptions.set([]);
                this.relatedRecordLoading.set(false);
                this.form.controls.relatedEntityId.setValue(null, { emitEvent: false });
                return;
            }
            const selectedId = entityType === this.defaultRelatedEntityType
                ? (this.form.controls.relatedEntityId.value ?? this.defaultRelatedEntityId ?? undefined)
                : undefined;
            if (entityType !== this.defaultRelatedEntityType) {
                this.form.controls.relatedEntityId.setValue(null, { emitEvent: false });
            }
            this.loadRelatedRecordOptions(entityType, selectedId);
        });
    }
    loadRelatedRecordOptions(entityType, selectedId) {
        this.relatedRecordLoading.set(true);
        this.crmLinkService.getRecordOptions(entityType, undefined, selectedId).pipe(finalize(() => this.relatedRecordLoading.set(false))).subscribe({
            next: (options) => {
                this.relatedRecordOptions.set(options);
            },
            error: () => {
                this.relatedRecordOptions.set([]);
                this.toast.show('error', 'Failed to load CRM records');
            }
        });
    }
    buildQuotedReply(email) {
        const fromDisplay = email.from.name ? `${email.from.name} <${email.from.email}>` : email.from.email;
        const date = new Date(email.receivedAtUtc).toLocaleString();
        return `<br><br><div style="margin-top: 16px; padding-left: 16px; border-left: 3px solid #ccc; color: #666;">
      <p style="margin: 0 0 8px 0;">On ${date}, ${fromDisplay} wrote:</p>
      ${email.htmlBody}
    </div>`;
    }
    buildForwardBody(email) {
        const fromDisplay = email.from.name ? `${email.from.name} <${email.from.email}>` : email.from.email;
        const toDisplay = email.to.map(r => r.name ? `${r.name} <${r.email}>` : r.email).join(', ');
        const date = new Date(email.receivedAtUtc).toLocaleString();
        return `<br><br>---------- Forwarded message ---------<br>
      <b>From:</b> ${fromDisplay}<br>
      <b>Date:</b> ${date}<br>
      <b>Subject:</b> ${email.subject}<br>
      <b>To:</b> ${toDisplay}<br><br>
      ${email.htmlBody}`;
    }
    loadTemplates() {
        this.emailService.searchTemplates({ isActive: true, pageSize: 100 }).subscribe({
            next: (response) => {
                this.templates.set(response.items);
            },
            error: () => {
                // Silent fail for templates - they're optional
            }
        });
    }
    static ɵfac = function EmailComposeDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailComposeDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailComposeDialogComponent, selectors: [["app-email-compose-dialog"]], inputs: { visible: "visible", embedded: "embedded", showRelatedEntity: "showRelatedEntity", defaultToEmail: "defaultToEmail", defaultToName: "defaultToName", defaultSubject: "defaultSubject", defaultRelatedEntityType: "defaultRelatedEntityType", defaultRelatedEntityId: "defaultRelatedEntityId", mode: "mode", replyToEmail: "replyToEmail" }, outputs: { visibleChange: "visibleChange", sent: "sent" }, features: [i0.ɵɵNgOnChangesFeature], decls: 8, vars: 1, consts: [["composeHeader", ""], ["composeContent", ""], ["composeFooter", ""], ["styleClass", "compose-email-dialog", 3, "visible", "modal", "dismissableMask", "style", "contentStyle"], [1, "compose-page-shell"], [1, "dialog-header"], [1, "header-icon"], [1, "pi", 3, "ngClass"], [1, "header-text"], [1, "header-subtitle"], [1, "compose-body"], [1, "compose-form", 3, "formGroup"], [1, "form-section", "template-section"], [1, "form-section", "recipients-section"], [1, "section-header"], [1, "pi", "pi-users"], [1, "field"], [1, "required"], [1, "input-with-icon"], [1, "pi", "pi-at", "field-icon"], ["pInputText", "", "formControlName", "toEmail", "placeholder", "recipient@example.com", 1, "w-full"], [1, "pi", "pi-user", "field-icon"], ["pInputText", "", "formControlName", "toName", "placeholder", "John Doe (optional)", 1, "w-full"], [1, "field-row"], ["pInputText", "", "formControlName", "ccEmails", "placeholder", "cc@example.com", 1, "w-full"], [1, "field-hint"], ["pInputText", "", "formControlName", "bccEmails", "placeholder", "bcc@example.com", 1, "w-full"], [1, "form-section", "message-section"], [1, "pi", "pi-pencil"], [1, "pi", "pi-tag", "field-icon"], ["pInputText", "", "formControlName", "subject", "placeholder", "Enter your email subject...", 1, "w-full"], [1, "field", "editor-field"], ["formControlName", "htmlBody", "placeholder", "Write your message here..."], ["pTemplate", "header"], ["class", "form-section link-section", 4, "ngIf"], [1, "pi", "pi-file-edit"], ["appendTo", "body", "optionLabel", "name", "optionValue", "id", "placeholder", "Choose a template (optional)...", "styleClass", "w-full template-select", 3, "ngModelChange", "options", "ngModel", "ngModelOptions", "showClear"], ["pTemplate", "item"], ["pTemplate", "value"], [1, "template-option"], [1, "template-icon"], [1, "template-info"], [1, "template-name"], ["class", "template-category", 4, "ngIf"], [1, "template-category"], ["class", "template-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], [1, "ql-formats"], ["type", "button", "aria-label", "Bold", 1, "ql-bold"], ["type", "button", "aria-label", "Italic", 1, "ql-italic"], ["type", "button", "aria-label", "Underline", 1, "ql-underline"], ["type", "button", "value", "ordered", "aria-label", "Ordered List", 1, "ql-list"], ["type", "button", "value", "bullet", "aria-label", "Bullet List", 1, "ql-list"], ["type", "button", "aria-label", "Link", 1, "ql-link"], ["type", "button", "aria-label", "Image", 1, "ql-image"], ["type", "button", "aria-label", "Remove Formatting", 1, "ql-clean"], [1, "form-section", "link-section"], [1, "pi", "pi-link"], [1, "section-badge"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "relatedEntityType", "placeholder", "Select type...", "styleClass", "w-full", 3, "options"], ["class", "field", 4, "ngIf"], [1, "entity-option"], ["class", "entity-option", 4, "ngIf"], ["appendTo", "body", "optionLabel", "label", "optionValue", "id", "formControlName", "relatedEntityId", "placeholder", "Select record...", "styleClass", "w-full", 3, "options", "filter", "loading"], [1, "entity-record-option"], [1, "entity-record-option__label"], ["class", "entity-record-option__subtitle", 4, "ngIf"], [1, "entity-record-option__subtitle"], [1, "dialog-footer"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "pi", "pi-times"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", "btn-send", 3, "click", "disabled"], ["class", "pi pi-send", 4, "ngIf"], ["strokeWidth", "4", 3, "style", 4, "ngIf"], [1, "pi", "pi-send"], ["strokeWidth", "4"], ["styleClass", "compose-email-dialog", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask", "contentStyle"], [4, "ngTemplateOutlet"], ["pTemplate", "footer"], [1, "compose-page-header"], [1, "compose-page-footer"]], template: function EmailComposeDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EmailComposeDialogComponent_ng_template_0_Template, 8, 5, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(2, EmailComposeDialogComponent_ng_template_2_Template, 56, 6, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(4, EmailComposeDialogComponent_ng_template_4_Template, 10, 4, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵconditionalCreate(6, EmailComposeDialogComponent_Conditional_6_Template, 4, 9, "p-dialog", 3)(7, EmailComposeDialogComponent_Conditional_7_Template, 6, 3, "section", 4);
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(!ctx.embedded ? 6 : 7);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgIf, i1.NgTemplateOutlet, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, DialogModule, i3.Dialog, i4.PrimeTemplate, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, TextareaModule,
            SelectModule, i7.Select, EditorModule, i8.Editor, ProgressSpinnerModule, i9.ProgressSpinner], styles: ["\n\n    .dialog-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.875rem;\n    }\n\n    .header-icon[_ngcontent-%COMP%] {\n      width: 44px;\n      height: 44px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      border-radius: 12px;\n      color: white;\n      font-size: 1.25rem;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    .header-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .header-subtitle[_ngcontent-%COMP%] {\n      font-size: 0.8125rem;\n      color: #6b7280;\n    }\n\n    \n\n    .compose-body[_ngcontent-%COMP%] {\n      padding: 1.25rem 1.5rem;\n      max-height: 65vh;\n      overflow-y: auto;\n    }\n\n    .compose-page-shell[_ngcontent-%COMP%] {\n      background: #ffffff;\n      border: 1px solid #e5e7eb;\n      border-radius: 16px;\n      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n    }\n\n    .compose-page-header[_ngcontent-%COMP%] {\n      padding: 1.25rem 1.5rem;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);\n    }\n\n    .compose-page-shell[_ngcontent-%COMP%]   .compose-body[_ngcontent-%COMP%] {\n      max-height: none;\n      overflow: visible;\n    }\n\n    .compose-page-footer[_ngcontent-%COMP%] {\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n    }\n\n    .compose-form[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0;\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%] {\n      padding: 1rem 0;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .form-section[_ngcontent-%COMP%]:last-child {\n      border-bottom: none;\n      padding-bottom: 0;\n    }\n\n    .form-section[_ngcontent-%COMP%]:first-child {\n      padding-top: 0;\n    }\n\n    .section-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      margin-bottom: 0.875rem;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #0891b2;\n    }\n\n    .section-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.875rem;\n      color: #06b6d4;\n    }\n\n    .section-badge[_ngcontent-%COMP%] {\n      margin-left: auto;\n      padding: 0.125rem 0.5rem;\n      background: rgba(107, 114, 128, 0.1);\n      color: #6b7280;\n      border-radius: 9999px;\n      font-size: 0.6875rem;\n      font-weight: 500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    \n\n    .field[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.375rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .field[_ngcontent-%COMP%]:last-child {\n      margin-bottom: 0;\n    }\n\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      font-size: 0.8125rem;\n      font-weight: 500;\n      color: #374151;\n    }\n\n    .field[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n      color: #ef4444;\n    }\n\n    .field-hint[_ngcontent-%COMP%] {\n      font-size: 0.6875rem;\n      color: #9ca3af;\n    }\n\n    .field-row[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 1rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .field-row[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n      margin-bottom: 0;\n    }\n\n    .entity-record-option[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.1rem;\n    }\n\n    .entity-record-option__label[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: #111827;\n    }\n\n    .entity-record-option__subtitle[_ngcontent-%COMP%] {\n      color: #6b7280;\n      font-size: 0.75rem;\n    }\n\n    @media (max-width: 600px) {\n      .field-row[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    \n\n    .input-with-icon[_ngcontent-%COMP%] {\n      position: relative;\n    }\n\n    .input-with-icon[_ngcontent-%COMP%]   .field-icon[_ngcontent-%COMP%] {\n      position: absolute;\n      left: 0.875rem;\n      top: 50%;\n      transform: translateY(-50%);\n      color: #9ca3af;\n      font-size: 0.875rem;\n      z-index: 1;\n      pointer-events: none;\n    }\n\n    .input-with-icon[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      padding-left: 2.5rem !important;\n    }\n\n    \n\n    .template-section[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.04) 0%, rgba(118, 75, 162, 0.04) 100%);\n      margin: -1.25rem -1.5rem 0;\n      padding: 1rem 1.5rem !important;\n      border-bottom: 1px solid rgba(102, 126, 234, 0.1) !important;\n    }\n\n    .template-option[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.625rem;\n    }\n\n    .template-icon[_ngcontent-%COMP%] {\n      width: 28px;\n      height: 28px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n      border-radius: 6px;\n      color: #667eea;\n      font-size: 0.75rem;\n    }\n\n    .template-info[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.125rem;\n    }\n\n    .template-name[_ngcontent-%COMP%] {\n      font-weight: 500;\n      color: #1f2937;\n    }\n\n    .template-category[_ngcontent-%COMP%] {\n      font-size: 0.6875rem;\n      color: #9ca3af;\n    }\n\n    \n\n    .entity-option[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n    }\n\n    .entity-option[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.875rem;\n    }\n\n    .select-placeholder[_ngcontent-%COMP%] {\n      color: #9ca3af;\n    }\n\n    \n\n    .editor-field[_ngcontent-%COMP%] {\n      margin-bottom: 0;\n    }\n\n    \n\n    .dialog-footer[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding: 1rem 1.5rem;\n      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      padding: 0.625rem 1.25rem;\n      border: none;\n      border-radius: 8px;\n      font-size: 0.875rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .btn-ghost[_ngcontent-%COMP%] {\n      background: white;\n      color: #6b7280;\n      border: 1px solid #e5e7eb;\n    }\n\n    .btn-ghost[_ngcontent-%COMP%]:hover {\n      background: #f9fafb;\n      border-color: #d1d5db;\n      color: #374151;\n    }\n\n    .btn-primary[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n    }\n\n    .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);\n    }\n\n    .btn-primary[_ngcontent-%COMP%]:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n      transform: none;\n      box-shadow: none;\n    }\n\n    .btn-send[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.875rem;\n    }\n\n    \n\n    [_nghost-%COMP%]     {\n      .compose-email-dialog {\n        .p-dialog-header {\n          padding: 1.25rem 1.5rem;\n          border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);\n        }\n\n        .p-dialog-content {\n          padding: 0;\n        }\n\n        .p-dialog-footer {\n          padding: 0;\n        }\n      }\n\n      .p-editor-container {\n        border: 1px solid #e5e7eb;\n        border-radius: 8px;\n        overflow: hidden;\n        transition: border-color 200ms, box-shadow 200ms;\n      }\n\n      .p-editor-container:focus-within {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .p-editor-toolbar {\n        background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n        border-bottom: 1px solid #e5e7eb;\n        padding: 0.5rem;\n      }\n\n      .p-editor-content {\n        border: none;\n        background: white;\n      }\n\n      .p-editor-content .ql-editor {\n        font-size: 0.9375rem;\n        line-height: 1.6;\n        min-height: 180px;\n      }\n\n      .p-inputtext {\n        border: 1px solid #e5e7eb;\n        border-radius: 8px;\n        padding: 0.625rem 0.875rem;\n        font-size: 0.9375rem;\n        transition: border-color 200ms, box-shadow 200ms;\n      }\n\n      .p-inputtext:focus {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .p-select {\n        border-radius: 8px;\n      }\n\n      .p-select:not(.p-disabled):hover {\n        border-color: #667eea;\n      }\n\n      .p-select:not(.p-disabled).p-focus {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .template-select .p-select-label {\n        padding: 0.625rem 0.875rem;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailComposeDialogComponent, [{
        type: Component,
        args: [{ selector: 'app-email-compose-dialog', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    DialogModule,
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    SelectModule,
                    EditorModule,
                    ProgressSpinnerModule
                ], template: `
    <ng-template #composeHeader>
      <div class="dialog-header">
        <div class="header-icon" [class]="headerIconClass()">
          <i class="pi" [ngClass]="headerIcon()"></i>
        </div>
        <div class="header-text">
          <h2>{{ headerTitle() }}</h2>
          <span class="header-subtitle">{{ headerSubtitle() }}</span>
        </div>
      </div>
    </ng-template>

    <ng-template #composeContent>
      <div class="compose-body">
        <form [formGroup]="form" class="compose-form">
          @if (mode === 'new') {
          <div class="form-section template-section">
            <div class="section-header">
              <i class="pi pi-file-edit"></i>
              <span>Quick Start</span>
            </div>
            <div class="field">
              <label>Start from a template</label>
              <p-select
                appendTo="body"
                [options]="templates()"
                optionLabel="name"
                optionValue="id"
                [ngModel]="selectedTemplateId()"
                (ngModelChange)="onTemplateSelected($event)"
                [ngModelOptions]="{ standalone: true }"
                placeholder="Choose a template (optional)..."
                [showClear]="true"
                styleClass="w-full template-select"
              >
                <ng-template pTemplate="item" let-item>
                  <div class="template-option">
                    <div class="template-icon">
                      <i class="pi pi-file-edit"></i>
                    </div>
                    <div class="template-info">
                      <span class="template-name">{{ item.name }}</span>
                      <span class="template-category" *ngIf="item.category">{{ item.category }}</span>
                    </div>
                  </div>
                </ng-template>
                <ng-template pTemplate="value" let-item>
                  <div class="template-option" *ngIf="item">
                    <i class="pi pi-file-edit"></i>
                    <span>{{ item.name }}</span>
                  </div>
                  <span *ngIf="!item" class="select-placeholder">Choose a template (optional)...</span>
                </ng-template>
              </p-select>
            </div>
          </div>
          }

          <div class="form-section recipients-section">
            <div class="section-header">
              <i class="pi pi-users"></i>
              <span>Recipients</span>
            </div>

            <div class="field">
              <label>To <span class="required">*</span></label>
              <div class="input-with-icon">
                <i class="pi pi-at field-icon"></i>
                <input
                  pInputText
                  formControlName="toEmail"
                  placeholder="recipient@example.com"
                  class="w-full"
                />
              </div>
            </div>

            <div class="field">
              <label>Recipient Name</label>
              <div class="input-with-icon">
                <i class="pi pi-user field-icon"></i>
                <input
                  pInputText
                  formControlName="toName"
                  placeholder="John Doe (optional)"
                  class="w-full"
                />
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label>CC</label>
                <input
                  pInputText
                  formControlName="ccEmails"
                  placeholder="cc@example.com"
                  class="w-full"
                />
                <small class="field-hint">Comma-separated</small>
              </div>
              <div class="field">
                <label>BCC</label>
                <input
                  pInputText
                  formControlName="bccEmails"
                  placeholder="bcc@example.com"
                  class="w-full"
                />
                <small class="field-hint">Comma-separated</small>
              </div>
            </div>
          </div>

          <div class="form-section message-section">
            <div class="section-header">
              <i class="pi pi-pencil"></i>
              <span>Message</span>
            </div>

            <div class="field">
              <label>Subject <span class="required">*</span></label>
              <div class="input-with-icon">
                <i class="pi pi-tag field-icon"></i>
                <input
                  pInputText
                  formControlName="subject"
                  placeholder="Enter your email subject..."
                  class="w-full"
                />
              </div>
            </div>

            <div class="field editor-field">
              <label>Message Body <span class="required">*</span></label>
              <p-editor
                formControlName="htmlBody"
                [style]="{ height: '220px' }"
                placeholder="Write your message here..."
              >
                <ng-template pTemplate="header">
                  <span class="ql-formats">
                    <button type="button" class="ql-bold" aria-label="Bold"></button>
                    <button type="button" class="ql-italic" aria-label="Italic"></button>
                    <button type="button" class="ql-underline" aria-label="Underline"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-list" value="ordered" aria-label="Ordered List"></button>
                    <button type="button" class="ql-list" value="bullet" aria-label="Bullet List"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-link" aria-label="Link"></button>
                    <button type="button" class="ql-image" aria-label="Image"></button>
                  </span>
                  <span class="ql-formats">
                    <button type="button" class="ql-clean" aria-label="Remove Formatting"></button>
                  </span>
                </ng-template>
              </p-editor>
            </div>
          </div>

          <div class="form-section link-section" *ngIf="showRelatedEntity">
            <div class="section-header">
              <i class="pi pi-link"></i>
              <span>Link to Record</span>
              <span class="section-badge">Optional</span>
            </div>
            
            <div class="field-row">
              <div class="field">
                <label>Record Type</label>
                <p-select
                  appendTo="body"
                  [options]="relatedEntityTypes"
                  optionLabel="label"
                  optionValue="value"
                  formControlName="relatedEntityType"
                  placeholder="Select type..."
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-item>
                    <div class="entity-option">
                      <i [class]="'pi ' + item.icon" [style.color]="getEntityColor(item.value)"></i>
                      <span>{{ item.label }}</span>
                    </div>
                  </ng-template>
                  <ng-template pTemplate="value" let-item>
                    <div class="entity-option" *ngIf="item">
                      <i [class]="'pi ' + item.icon" [style.color]="getEntityColor(item.value)"></i>
                      <span>{{ item.label }}</span>
                    </div>
                    <span *ngIf="!item" class="select-placeholder">Select type...</span>
                  </ng-template>
                </p-select>
              </div>
              <div class="field" *ngIf="form.value.relatedEntityType">
                <label>Record Name</label>
                <p-select
                  appendTo="body"
                  [options]="relatedRecordOptions()"
                  optionLabel="label"
                  optionValue="id"
                  formControlName="relatedEntityId"
                  placeholder="Select record..."
                  [filter]="true"
                  [loading]="relatedRecordLoading()"
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-item>
                    <div class="entity-record-option">
                      <span class="entity-record-option__label">{{ item.label }}</span>
                      <span class="entity-record-option__subtitle" *ngIf="item.subtitle">{{ item.subtitle }}</span>
                    </div>
                  </ng-template>
                </p-select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ng-template>

    <ng-template #composeFooter>
      <div class="dialog-footer">
        <button
          pButton
          type="button"
          class="btn btn-ghost"
          (click)="onCancel()"
        >
          <i class="pi pi-times"></i>
          <span>Cancel</span>
        </button>
        <button
          pButton
          type="button"
          class="btn btn-primary btn-send"
          [disabled]="form.invalid || sending()"
          (click)="onSend()"
        >
          <i class="pi pi-send" *ngIf="!sending()"></i>
          <p-progressSpinner
            *ngIf="sending()"
            [style]="{ width: '16px', height: '16px' }"
            strokeWidth="4"
          ></p-progressSpinner>
          <span>{{ sending() ? 'Sending...' : 'Send Email' }}</span>
        </button>
      </div>
    </ng-template>

    @if (!embedded) {
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [dismissableMask]="true"
      [style]="{ width: '720px', maxWidth: '95vw' }"
      [contentStyle]="{ padding: '0' }"
      (onHide)="onCancel()"
      styleClass="compose-email-dialog"
    >
      <ng-template pTemplate="header">
        <ng-container *ngTemplateOutlet="composeHeader"></ng-container>
      </ng-template>

      <ng-container *ngTemplateOutlet="composeContent"></ng-container>

      <ng-template pTemplate="footer">
        <ng-container *ngTemplateOutlet="composeFooter"></ng-container>
      </ng-template>
    </p-dialog>
    } @else {
    <section class="compose-page-shell">
      <header class="compose-page-header">
        <ng-container *ngTemplateOutlet="composeHeader"></ng-container>
      </header>
      <ng-container *ngTemplateOutlet="composeContent"></ng-container>
      <footer class="compose-page-footer">
        <ng-container *ngTemplateOutlet="composeFooter"></ng-container>
      </footer>
    </section>
    }
  `, styles: ["\n    /* Dialog Header */\n    .dialog-header {\n      display: flex;\n      align-items: center;\n      gap: 0.875rem;\n    }\n\n    .header-icon {\n      width: 44px;\n      height: 44px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      border-radius: 12px;\n      color: white;\n      font-size: 1.25rem;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    .header-text h2 {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .header-subtitle {\n      font-size: 0.8125rem;\n      color: #6b7280;\n    }\n\n    /* Body Container */\n    .compose-body {\n      padding: 1.25rem 1.5rem;\n      max-height: 65vh;\n      overflow-y: auto;\n    }\n\n    .compose-page-shell {\n      background: #ffffff;\n      border: 1px solid #e5e7eb;\n      border-radius: 16px;\n      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n    }\n\n    .compose-page-header {\n      padding: 1.25rem 1.5rem;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);\n    }\n\n    .compose-page-shell .compose-body {\n      max-height: none;\n      overflow: visible;\n    }\n\n    .compose-page-footer {\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n    }\n\n    .compose-form {\n      display: flex;\n      flex-direction: column;\n      gap: 0;\n    }\n\n    /* Form Sections */\n    .form-section {\n      padding: 1rem 0;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .form-section:last-child {\n      border-bottom: none;\n      padding-bottom: 0;\n    }\n\n    .form-section:first-child {\n      padding-top: 0;\n    }\n\n    .section-header {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      margin-bottom: 0.875rem;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #0891b2;\n    }\n\n    .section-header i {\n      font-size: 0.875rem;\n      color: #06b6d4;\n    }\n\n    .section-badge {\n      margin-left: auto;\n      padding: 0.125rem 0.5rem;\n      background: rgba(107, 114, 128, 0.1);\n      color: #6b7280;\n      border-radius: 9999px;\n      font-size: 0.6875rem;\n      font-weight: 500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    /* Fields */\n    .field {\n      display: flex;\n      flex-direction: column;\n      gap: 0.375rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .field:last-child {\n      margin-bottom: 0;\n    }\n\n    .field label {\n      font-size: 0.8125rem;\n      font-weight: 500;\n      color: #374151;\n    }\n\n    .field .required {\n      color: #ef4444;\n    }\n\n    .field-hint {\n      font-size: 0.6875rem;\n      color: #9ca3af;\n    }\n\n    .field-row {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 1rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .field-row .field {\n      margin-bottom: 0;\n    }\n\n    .entity-record-option {\n      display: flex;\n      flex-direction: column;\n      gap: 0.1rem;\n    }\n\n    .entity-record-option__label {\n      font-weight: 600;\n      color: #111827;\n    }\n\n    .entity-record-option__subtitle {\n      color: #6b7280;\n      font-size: 0.75rem;\n    }\n\n    @media (max-width: 600px) {\n      .field-row {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    /* Input with Icon */\n    .input-with-icon {\n      position: relative;\n    }\n\n    .input-with-icon .field-icon {\n      position: absolute;\n      left: 0.875rem;\n      top: 50%;\n      transform: translateY(-50%);\n      color: #9ca3af;\n      font-size: 0.875rem;\n      z-index: 1;\n      pointer-events: none;\n    }\n\n    .input-with-icon input {\n      padding-left: 2.5rem !important;\n    }\n\n    /* Template Selection */\n    .template-section {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.04) 0%, rgba(118, 75, 162, 0.04) 100%);\n      margin: -1.25rem -1.5rem 0;\n      padding: 1rem 1.5rem !important;\n      border-bottom: 1px solid rgba(102, 126, 234, 0.1) !important;\n    }\n\n    .template-option {\n      display: flex;\n      align-items: center;\n      gap: 0.625rem;\n    }\n\n    .template-icon {\n      width: 28px;\n      height: 28px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n      border-radius: 6px;\n      color: #667eea;\n      font-size: 0.75rem;\n    }\n\n    .template-info {\n      display: flex;\n      flex-direction: column;\n      gap: 0.125rem;\n    }\n\n    .template-name {\n      font-weight: 500;\n      color: #1f2937;\n    }\n\n    .template-category {\n      font-size: 0.6875rem;\n      color: #9ca3af;\n    }\n\n    /* Entity Options */\n    .entity-option {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n    }\n\n    .entity-option i {\n      font-size: 0.875rem;\n    }\n\n    .select-placeholder {\n      color: #9ca3af;\n    }\n\n    /* Editor Field */\n    .editor-field {\n      margin-bottom: 0;\n    }\n\n    /* Dialog Footer */\n    .dialog-footer {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding: 1rem 1.5rem;\n      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .btn {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      padding: 0.625rem 1.25rem;\n      border: none;\n      border-radius: 8px;\n      font-size: 0.875rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .btn-ghost {\n      background: white;\n      color: #6b7280;\n      border: 1px solid #e5e7eb;\n    }\n\n    .btn-ghost:hover {\n      background: #f9fafb;\n      border-color: #d1d5db;\n      color: #374151;\n    }\n\n    .btn-primary {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n    }\n\n    .btn-primary:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);\n    }\n\n    .btn-primary:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n      transform: none;\n      box-shadow: none;\n    }\n\n    .btn-send i {\n      font-size: 0.875rem;\n    }\n\n    /* PrimeNG Overrides */\n    :host ::ng-deep {\n      .compose-email-dialog {\n        .p-dialog-header {\n          padding: 1.25rem 1.5rem;\n          border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n          background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);\n        }\n\n        .p-dialog-content {\n          padding: 0;\n        }\n\n        .p-dialog-footer {\n          padding: 0;\n        }\n      }\n\n      .p-editor-container {\n        border: 1px solid #e5e7eb;\n        border-radius: 8px;\n        overflow: hidden;\n        transition: border-color 200ms, box-shadow 200ms;\n      }\n\n      .p-editor-container:focus-within {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .p-editor-toolbar {\n        background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);\n        border-bottom: 1px solid #e5e7eb;\n        padding: 0.5rem;\n      }\n\n      .p-editor-content {\n        border: none;\n        background: white;\n      }\n\n      .p-editor-content .ql-editor {\n        font-size: 0.9375rem;\n        line-height: 1.6;\n        min-height: 180px;\n      }\n\n      .p-inputtext {\n        border: 1px solid #e5e7eb;\n        border-radius: 8px;\n        padding: 0.625rem 0.875rem;\n        font-size: 0.9375rem;\n        transition: border-color 200ms, box-shadow 200ms;\n      }\n\n      .p-inputtext:focus {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .p-select {\n        border-radius: 8px;\n      }\n\n      .p-select:not(.p-disabled):hover {\n        border-color: #667eea;\n      }\n\n      .p-select:not(.p-disabled).p-focus {\n        border-color: #667eea;\n        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);\n      }\n\n      .template-select .p-select-label {\n        padding: 0.625rem 0.875rem;\n      }\n    }\n  "] }]
    }], null, { visible: [{
            type: Input
        }], embedded: [{
            type: Input
        }], showRelatedEntity: [{
            type: Input
        }], defaultToEmail: [{
            type: Input
        }], defaultToName: [{
            type: Input
        }], defaultSubject: [{
            type: Input
        }], defaultRelatedEntityType: [{
            type: Input
        }], defaultRelatedEntityId: [{
            type: Input
        }], mode: [{
            type: Input
        }], replyToEmail: [{
            type: Input
        }], visibleChange: [{
            type: Output
        }], sent: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailComposeDialogComponent, { className: "EmailComposeDialogComponent", filePath: "src/app/crm/features/emails/components/email-compose-dialog.component.ts", lineNumber: 724 }); })();
