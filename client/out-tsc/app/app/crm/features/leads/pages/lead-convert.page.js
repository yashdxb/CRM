import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { LeadDataService } from '../services/lead-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/checkbox";
import * as i5 from "primeng/datepicker";
import * as i6 from "primeng/inputnumber";
import * as i7 from "primeng/inputgroup";
import * as i8 from "primeng/inputgroupaddon";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/textarea";
import * as i11 from "primeng/select";
function LeadConvertPage_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const leadData_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Turn ", leadData_r1.name, " into an account, contact, and opportunity.");
} }
function LeadConvertPage_div_16_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const leadData_r3 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(leadData_r3.email);
} }
function LeadConvertPage_div_16_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ((tmp_3_0 = ctx_r3.visiblePresenceUsers()[0]) == null ? null : tmp_3_0.isEditing) ? "pi-pencil" : "pi-eye");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.presenceSummaryText());
} }
function LeadConvertPage_div_16_div_23_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "label", 46);
    i0.ɵɵtext(2, "Account name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputgroup")(4, "p-inputgroup-addon", 47);
    i0.ɵɵelement(5, "i", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 48);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_div_23_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().accountName, $event) || (ctx_r3.form().accountName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().accountName);
} }
function LeadConvertPage_div_16_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "label", 49);
    i0.ɵɵtext(2, "Opportunity name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputgroup")(4, "p-inputgroup-addon", 50);
    i0.ɵɵelement(5, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 52);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_div_47_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().opportunityName, $event) || (ctx_r3.form().opportunityName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().opportunityName);
} }
function LeadConvertPage_div_16_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "label", 53);
    i0.ɵɵtext(2, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputNumber", 54);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_div_48_Template_p_inputNumber_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().amount, $event) || (ctx_r3.form().amount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().amount);
    i0.ɵɵproperty("min", 0);
} }
function LeadConvertPage_div_16_div_49_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "label", 55);
    i0.ɵɵtext(2, "Expected close date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-datePicker", 56);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_div_49_Template_p_datePicker_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().expectedCloseDate, $event) || (ctx_r3.form().expectedCloseDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().expectedCloseDate);
    i0.ɵɵproperty("showIcon", true);
} }
function LeadConvertPage_div_16_p_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1, " Create an account to attach the opportunity. ");
    i0.ɵɵelementEnd();
} }
function LeadConvertPage_div_16_section_51_strong_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const leadData_r10 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", leadData_r10.conversationScore || 0, "/100 ");
} }
function LeadConvertPage_div_16_section_51_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1, "Unavailable");
    i0.ɵɵelementEnd();
} }
function LeadConvertPage_div_16_section_51_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const primaryGap_r11 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Primary gap: ", primaryGap_r11, " ");
} }
function LeadConvertPage_div_16_section_51_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, " Manager review is recommended before conversion. ");
    i0.ɵɵelementEnd();
} }
function LeadConvertPage_div_16_section_51_ul_40_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(reason_r12);
} }
function LeadConvertPage_div_16_section_51_ul_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 80);
    i0.ɵɵtemplate(1, LeadConvertPage_div_16_section_51_ul_40_li_1_Template, 2, 1, "li", 81);
    i0.ɵɵpipe(2, "slice");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 1, ctx_r3.conversionReadinessReasons(), 0, 4));
} }
function LeadConvertPage_div_16_section_51_div_71_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 28)(1, "p-checkbox", 84);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_div_71_label_1_Template_p_checkbox_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.form().managerApproved, $event) || (ctx_r3.form().managerApproved = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_div_71_label_1_Template_p_checkbox_ngModelChange_1_listener() { i0.ɵɵrestoreView(_r13); const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Manager approved");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().managerApproved);
} }
function LeadConvertPage_div_16_section_51_div_71_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 85)(1, "label", 86);
    i0.ɵɵtext(2, "Override reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 87);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_div_71_div_2_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.form().overrideReason, $event) || (ctx_r3.form().overrideReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_div_71_div_2_Template_textarea_ngModelChange_3_listener() { i0.ɵɵrestoreView(_r14); const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().overrideReason);
} }
function LeadConvertPage_div_16_section_51_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵtemplate(1, LeadConvertPage_div_16_section_51_div_71_label_1_Template, 4, 1, "label", 82)(2, LeadConvertPage_div_16_section_51_div_71_div_2_Template, 4, 1, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.qualificationDecision().requiresManagerApproval);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.qualificationDecision().requiresOverrideReason);
} }
function LeadConvertPage_div_16_section_51_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 58)(1, "h2", 25);
    i0.ɵɵelement(2, "i", 59);
    i0.ɵɵtext(3, " Qualification guardrails ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 60)(5, "div")(6, "span", 61);
    i0.ɵɵtext(7, "Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div")(11, "span", 61);
    i0.ɵɵtext(12, "Readiness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "span", 61);
    i0.ɵɵtext(17, "Band");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 62);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "span", 61);
    i0.ɵɵtext(22, "Readiness label");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 62);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "span", 61);
    i0.ɵɵtext(27, "Threshold");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "strong");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div")(31, "span", 61);
    i0.ɵɵtext(32, "Conversation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(33, LeadConvertPage_div_16_section_51_strong_33_Template, 2, 1, "strong", 63)(34, LeadConvertPage_div_16_section_51_ng_template_34_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 64);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, LeadConvertPage_div_16_section_51_div_38_Template, 2, 1, "div", 65)(39, LeadConvertPage_div_16_section_51_div_39_Template, 2, 0, "div", 65)(40, LeadConvertPage_div_16_section_51_ul_40_Template, 3, 5, "ul", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 67)(42, "div", 33)(43, "label", 68);
    i0.ɵɵtext(44, "Deal type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "p-select", 69);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_45_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().dealType, $event) || (ctx_r3.form().dealType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_45_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 33)(47, "label", 70);
    i0.ɵɵtext(48, "Segment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "p-select", 71);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_49_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().segment, $event) || (ctx_r3.form().segment = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_49_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 33)(51, "label", 72);
    i0.ɵɵtext(52, "Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "p-select", 73);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_53_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().stage, $event) || (ctx_r3.form().stage = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_53_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "div", 33)(55, "label", 74);
    i0.ɵɵtext(56, "Velocity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "p-select", 75);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_57_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().velocity, $event) || (ctx_r3.form().velocity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_select_ngModelChange_57_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(58, "div", 67)(59, "label", 28)(60, "p-checkbox", 76);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_60_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().isCompetitive, $event) || (ctx_r3.form().isCompetitive = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_60_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "span");
    i0.ɵɵtext(62, "Competitive deal");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "label", 28)(64, "p-checkbox", 77);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_64_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().hasExecutiveChampion, $event) || (ctx_r3.form().hasExecutiveChampion = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_64_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span");
    i0.ɵɵtext(66, "Executive champion");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "label", 28)(68, "p-checkbox", 78);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_68_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form().isStrategic, $event) || (ctx_r3.form().isStrategic = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_section_51_Template_p_checkbox_ngModelChange_68_listener() { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵtext(70, "Strategic account");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(71, LeadConvertPage_div_16_section_51_div_71_Template, 3, 2, "div", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_6_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    const leadData_r10 = ctx.ngIf;
    const unavailableConversation_r15 = i0.ɵɵreference(35);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", leadData_r10.score, "/100");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ((tmp_6_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_6_0.score) ?? 0, "/100");
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("data-band", ctx_r3.qualificationDecision().band);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.qualificationDecision().band);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("data-band", (tmp_9_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_9_0.label == null ? null : tmp_9_0.label.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(((tmp_10_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_10_0.label) ?? "Not assessed");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.qualificationDecision().adjustedThreshold);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", leadData_r10.conversationSignalAvailable)("ngIfElse", unavailableConversation_r15);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ((tmp_14_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_14_0.summary) || ctx_r3.qualificationDecision().message, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_15_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_15_0.primaryGap);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_16_0 = ctx_r3.conversionReadiness()) == null ? null : tmp_16_0.managerReviewRecommended);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.conversionReadinessReasons().length);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r3.dealTypeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().dealType);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.segmentOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().segment);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.stageOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().stage);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.velocityOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().velocity);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().isCompetitive);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().hasExecutiveChampion);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().isStrategic);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.qualificationDecision().requiresManagerApproval || ctx_r3.qualificationDecision().requiresOverrideReason);
} }
function LeadConvertPage_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14)(2, "div", 15);
    i0.ɵɵelement(3, "img", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 17)(5, "span", 18);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 19);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, LeadConvertPage_div_16_span_9_Template, 2, 1, "span", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 21);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, LeadConvertPage_div_16_div_12_Template, 4, 2, "div", 22);
    i0.ɵɵelementStart(13, "form", 23);
    i0.ɵɵlistener("ngSubmit", function LeadConvertPage_div_16_Template_form_ngSubmit_13_listener() { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onConvert()); });
    i0.ɵɵelementStart(14, "section", 24)(15, "h2", 25);
    i0.ɵɵelement(16, "i", 26);
    i0.ɵɵtext(17, " Account ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 27)(19, "label", 28)(20, "p-checkbox", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form().createAccount, $event) || (ctx_r3.form().createAccount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_20_listener() { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "Create new account");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(23, LeadConvertPage_div_16_div_23_Template, 7, 1, "div", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "section", 24)(25, "h2", 25);
    i0.ɵɵelement(26, "i", 31);
    i0.ɵɵtext(27, " Contact ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 27)(29, "label", 28)(30, "p-checkbox", 32);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form().createContact, $event) || (ctx_r3.form().createContact = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_30_listener() { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32, "Create contact from lead details");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 33)(34, "label", 34);
    i0.ɵɵtext(35, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 35);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(38, "section", 24)(39, "h2", 25);
    i0.ɵɵelement(40, "i", 36);
    i0.ɵɵtext(41, " Opportunity ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 27)(43, "label", 28)(44, "p-checkbox", 37);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form().createOpportunity, $event) || (ctx_r3.form().createOpportunity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadConvertPage_div_16_Template_p_checkbox_ngModelChange_44_listener() { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onFormChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Create opportunity");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(47, LeadConvertPage_div_16_div_47_Template, 7, 1, "div", 30)(48, LeadConvertPage_div_16_div_48_Template, 4, 2, "div", 30)(49, LeadConvertPage_div_16_div_49_Template, 4, 2, "div", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(50, LeadConvertPage_div_16_p_50_Template, 2, 0, "p", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, LeadConvertPage_div_16_section_51_Template, 72, 25, "section", 39);
    i0.ɵɵelementStart(52, "footer", 40)(53, "button", 41);
    i0.ɵɵlistener("click", function LeadConvertPage_div_16_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onCancel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(54, "button", 42);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const leadData_r3 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", leadData_r3.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (leadData_r3.email || leadData_r3.id), i0.ɵɵsanitizeUrl)("alt", leadData_r3.name + " avatar")("title", leadData_r3.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(leadData_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(leadData_r3.company);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", leadData_r3.email);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", leadData_r3.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(leadData_r3.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.visiblePresenceUsers().length);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().createAccount);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.form().createAccount);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().createContact);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", leadData_r3.name, " \u2022 ", leadData_r3.email || "No email", " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form().createOpportunity);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.form().createOpportunity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.form().createOpportunity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.form().createOpportunity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.form().createOpportunity && !ctx_r3.form().createAccount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.lead());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r3.saving() || !ctx_r3.canConvert());
} }
export class LeadConvertPage {
    lead = signal(null, ...(ngDevMode ? [{ debugName: "lead" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    form = signal({
        createAccount: true,
        accountName: '',
        createContact: true,
        createOpportunity: true,
        opportunityName: '',
        amount: 0,
        expectedCloseDate: '',
        dealType: 'Inbound',
        segment: 'SMB',
        stage: 'Qualification',
        isCompetitive: false,
        hasExecutiveChampion: false,
        isStrategic: false,
        velocity: 'Normal',
        managerApproved: false,
        overrideReason: ''
    }, ...(ngDevMode ? [{ debugName: "form" }] : []));
    qualificationPolicy = signal(LeadConvertPage.defaultPolicy(), ...(ngDevMode ? [{ debugName: "qualificationPolicy" }] : []));
    presenceUsers = signal([], ...(ngDevMode ? [{ debugName: "presenceUsers" }] : []));
    qualificationDecision = computed(() => this.evaluateQualification(), ...(ngDevMode ? [{ debugName: "qualificationDecision" }] : []));
    conversionReadiness = computed(() => this.lead()?.conversionReadiness ?? null, ...(ngDevMode ? [{ debugName: "conversionReadiness" }] : []));
    canConvert = computed(() => {
        const value = this.form();
        if (value.createOpportunity && !value.createAccount) {
            return false;
        }
        const decision = this.qualificationDecision();
        if (decision.blocked)
            return false;
        if (decision.requiresManagerApproval && !value.managerApproved)
            return false;
        if (decision.requiresOverrideReason && !value.overrideReason?.trim())
            return false;
        return true;
    }, ...(ngDevMode ? [{ debugName: "canConvert" }] : []));
    route = inject(ActivatedRoute);
    router = inject(Router);
    leadData = inject(LeadDataService);
    toastService = inject(AppToastService);
    workspaceSettings = inject(WorkspaceSettingsService);
    crmEvents = inject(CrmEventsService);
    destroyRef = inject(DestroyRef);
    currentUserId = readUserId();
    leadId = null;
    localEditingState = false;
    ngOnInit() {
        this.leadId = this.route.snapshot.paramMap.get('id');
        if (this.leadId) {
            this.initializePresence(this.leadId);
        }
        this.workspaceSettings.getSettings().subscribe({
            next: (settings) => {
                if (settings?.qualificationPolicy) {
                    this.qualificationPolicy.set(settings.qualificationPolicy);
                }
            },
            error: () => {
                this.qualificationPolicy.set(LeadConvertPage.defaultPolicy());
            }
        });
        const lead = history.state?.lead;
        if (lead) {
            this.setLead(lead);
            return;
        }
        if (this.leadId) {
            this.leadData.get(this.leadId).subscribe({
                next: (data) => this.setLead(data),
                error: () => this.router.navigate(['/app/leads'])
            });
        }
    }
    ngOnDestroy() {
        this.resetEditingPresence();
        if (this.leadId) {
            this.crmEvents.leaveRecordPresence('lead', this.leadId);
        }
    }
    onConvert() {
        if (!this.leadId)
            return;
        if (!this.canConvert())
            return;
        this.resetEditingPresence();
        const value = this.form();
        const closeDate = value.expectedCloseDate;
        const expectedCloseDate = closeDate instanceof Date
            ? closeDate.toISOString()
            : (typeof closeDate === 'string' && closeDate.trim() ? closeDate : undefined);
        const payload = {
            ...value,
            expectedCloseDate
        };
        this.saving.set(true);
        this.leadData.convert(this.leadId, payload).subscribe({
            next: () => {
                this.saving.set(false);
                this.router.navigate(['/app/leads'], { state: { toast: { tone: 'success', message: 'Lead converted.' } } });
            },
            error: () => {
                this.toastService.show('error', 'Lead conversion failed. Please try again.', 3000);
                this.saving.set(false);
            }
        });
    }
    onCancel() {
        this.resetEditingPresence();
        this.router.navigate(['/app/leads']);
    }
    onFormChange() {
        this.form.set({ ...this.form() });
        this.markEditingPresence();
    }
    visiblePresenceUsers() {
        return this.presenceUsers().filter((viewer) => viewer.userId !== this.currentUserId);
    }
    presenceSummaryText() {
        const viewers = this.visiblePresenceUsers();
        if (!viewers.length) {
            return '';
        }
        const editors = viewers.filter((viewer) => viewer.isEditing).length;
        if (editors > 0) {
            return `${viewers.length} collaborator${viewers.length > 1 ? 's' : ''} viewing • ${editors} editing`;
        }
        return `${viewers.length} collaborator${viewers.length > 1 ? 's' : ''} viewing`;
    }
    initializePresence(recordId) {
        this.crmEvents.joinRecordPresence('lead', recordId);
        this.crmEvents.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (!event?.payload) {
                return;
            }
            const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
            const payloadRecordId = String(event.payload['recordId'] ?? '');
            if (entityType !== 'lead' || payloadRecordId !== recordId) {
                return;
            }
            if (event.eventType === 'record.presence.snapshot') {
                const usersRaw = Array.isArray(event.payload['users']) ? event.payload['users'] : [];
                const users = usersRaw
                    .map((item) => {
                    const value = item;
                    return {
                        userId: String(value['userId'] ?? ''),
                        displayName: String(value['displayName'] ?? 'User'),
                        isEditing: !!value['isEditing']
                    };
                })
                    .filter((item) => !!item.userId);
                this.presenceUsers.set(users);
                return;
            }
            if (event.eventType !== 'record.presence.changed') {
                return;
            }
            const userId = String(event.payload['userId'] ?? '');
            const displayName = String(event.payload['displayName'] ?? 'User');
            const action = String(event.payload['action'] ?? '').toLowerCase();
            const isEditing = !!event.payload['isEditing'];
            if (!userId) {
                return;
            }
            this.presenceUsers.update((users) => {
                if (action === 'joined') {
                    if (users.some((user) => user.userId === userId)) {
                        return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing } : user);
                    }
                    return [...users, { userId, displayName, isEditing }];
                }
                if (action === 'left') {
                    return users.filter((user) => user.userId !== userId);
                }
                if (action === 'editing_started' || action === 'editing_stopped') {
                    const nextEditingState = action === 'editing_started' ? true : isEditing;
                    if (users.some((user) => user.userId === userId)) {
                        return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing: nextEditingState } : user);
                    }
                    return [...users, { userId, displayName, isEditing: nextEditingState }];
                }
                return users;
            });
        });
    }
    markEditingPresence() {
        if (!this.leadId || this.localEditingState) {
            return;
        }
        this.localEditingState = true;
        this.crmEvents.setRecordEditingState('lead', this.leadId, true);
    }
    resetEditingPresence() {
        if (!this.leadId || !this.localEditingState) {
            return;
        }
        this.localEditingState = false;
        this.crmEvents.setRecordEditingState('lead', this.leadId, false);
    }
    setLead(lead) {
        this.lead.set(lead);
        const accountName = lead.company || lead.name;
        const opportunityName = `${accountName} Opportunity`;
        this.form.set({
            createAccount: true,
            accountName,
            createContact: true,
            createOpportunity: true,
            opportunityName,
            amount: 0,
            expectedCloseDate: '',
            dealType: 'Inbound',
            segment: 'SMB',
            stage: 'Qualification',
            isCompetitive: false,
            hasExecutiveChampion: false,
            isStrategic: false,
            velocity: 'Normal',
            managerApproved: false,
            overrideReason: ''
        });
    }
    dealTypeOptions = [
        { label: 'Inbound', value: 'Inbound' },
        { label: 'Outbound', value: 'Outbound' },
        { label: 'Expansion', value: 'Expansion' },
        { label: 'Partner', value: 'Partner' }
    ];
    segmentOptions = [
        { label: 'SMB', value: 'SMB' },
        { label: 'Mid', value: 'Mid' },
        { label: 'Enterprise', value: 'Enterprise' }
    ];
    stageOptions = [
        { label: 'Discovery', value: 'Discovery' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Negotiation', value: 'Negotiation' }
    ];
    velocityOptions = [
        { label: 'Fast', value: 'Fast' },
        { label: 'Normal', value: 'Normal' },
        { label: 'Slow', value: 'Slow' }
    ];
    evaluateQualification() {
        const lead = this.lead();
        if (!lead) {
            return {
                score: 0,
                adjustedThreshold: 0,
                band: 'Unknown',
                blocked: true,
                requiresManagerApproval: false,
                requiresOverrideReason: false,
                message: 'Lead not loaded.'
            };
        }
        const policy = this.qualificationPolicy();
        const score = lead.score ?? 0;
        const baseThreshold = this.resolveThreshold(policy);
        const adjustedThreshold = this.applyModifiers(baseThreshold, policy);
        const belowThreshold = score < adjustedThreshold;
        const requiresManagerApproval = score < policy.managerApprovalBelow;
        const blocked = score < policy.blockBelow && !policy.allowOverrides;
        const requiresOverrideReason = policy.requireOverrideReason && belowThreshold;
        const band = score >= adjustedThreshold
            ? 'Strong'
            : score >= policy.managerApprovalBelow
                ? 'Moderate'
                : score >= policy.blockBelow
                    ? 'Weak'
                    : 'Unqualified';
        const message = blocked
            ? `Score ${score}/100 is below the minimum threshold (${policy.blockBelow}).`
            : belowThreshold
                ? `Score ${score}/100 is below the required threshold (${adjustedThreshold}).`
                : `Score ${score}/100 meets the conversion threshold.`;
        return {
            score,
            adjustedThreshold,
            band,
            blocked,
            requiresManagerApproval,
            requiresOverrideReason,
            message
        };
    }
    resolveThreshold(policy) {
        if (!policy.thresholdRules?.length) {
            return policy.defaultThreshold;
        }
        const { dealType = 'All', segment = 'All', stage = 'All' } = this.form();
        let bestRule = policy.defaultThreshold;
        let bestScore = -1;
        for (const rule of policy.thresholdRules) {
            if (!this.matches(rule.segment, segment ?? 'All'))
                continue;
            if (!this.matches(rule.dealType, dealType ?? 'All'))
                continue;
            if (!this.matches(rule.stage, stage ?? 'All'))
                continue;
            let score = 0;
            if (!this.isWildcard(rule.segment))
                score += 1;
            if (!this.isWildcard(rule.dealType))
                score += 1;
            if (!this.isWildcard(rule.stage))
                score += 1;
            if (score > bestScore || (score === bestScore && rule.threshold > bestRule)) {
                bestRule = rule.threshold;
                bestScore = score;
            }
        }
        return bestRule;
    }
    applyModifiers(base, policy) {
        let adjusted = base;
        for (const modifier of policy.modifiers ?? []) {
            if (this.isModifierActive(modifier.key)) {
                adjusted += modifier.delta;
            }
        }
        return Math.min(100, Math.max(0, adjusted));
    }
    isModifierActive(key) {
        const normalized = (key ?? '').toLowerCase();
        const form = this.form();
        if (normalized === 'competitive')
            return !!form.isCompetitive;
        if (normalized === 'executivechampion')
            return !!form.hasExecutiveChampion;
        if (normalized === 'strategic')
            return !!form.isStrategic;
        if (normalized === 'fastvelocity')
            return form.velocity === 'Fast';
        if (normalized === 'slowvelocity')
            return form.velocity === 'Slow';
        return false;
    }
    matches(ruleValue, actual) {
        if (this.isWildcard(ruleValue))
            return true;
        return ruleValue.toLowerCase() === actual.toLowerCase();
    }
    isWildcard(value) {
        return !value || value.toLowerCase() === 'all';
    }
    static defaultPolicy() {
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
            factorEvidenceRules: [
                { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
                { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention'] },
                { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
                { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript'] },
                { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference'] },
                { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call'] }
            ],
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
            evidenceSources: [
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
            ]
        };
    }
    conversionReadinessReasons() {
        return this.conversionReadiness()?.reasons ?? [];
    }
    static ɵfac = function LeadConvertPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadConvertPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LeadConvertPage, selectors: [["app-lead-convert-page"]], decls: 17, vars: 2, consts: [["unavailableConversation", ""], [1, "convert-page"], [1, "page-header"], [1, "header-content"], ["pButton", "", "type", "button", "routerLink", "/app/leads", 1, "back-link", "p-button-text"], [1, "pi", "pi-arrow-left"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [4, "ngIf"], [1, "convert-container"], ["class", "glass-card", 4, "ngIf"], [1, "glass-card"], [1, "lead-summary"], [1, "lead-avatar"], [3, "src", "alt", "title"], [1, "lead-meta"], [1, "lead-name"], [1, "lead-company"], ["class", "lead-contact", 4, "ngIf"], [1, "status-pill"], ["class", "presence-banner", 4, "ngIf"], [1, "convert-form", 3, "ngSubmit"], [1, "form-section"], [1, "section-title"], [1, "pi", "pi-building"], [1, "form-grid"], [1, "checkbox-field"], ["name", "createAccount", "binary", "true", 3, "ngModelChange", "ngModel"], ["class", "form-field", 4, "ngIf"], [1, "pi", "pi-id-card"], ["name", "createContact", "binary", "true", 3, "ngModelChange", "ngModel"], [1, "form-field"], ["for", "lc-contact"], [1, "value-pill"], [1, "pi", "pi-briefcase"], ["name", "createOpportunity", "binary", "true", 3, "ngModelChange", "ngModel"], ["class", "hint", 4, "ngIf"], ["class", "form-section qualification-section", 4, "ngIf"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["type", "submit", "pButton", "", "label", "Convert lead", 1, "crm-button", "crm-button--primary", 3, "disabled"], [1, "lead-contact"], [1, "presence-banner"], [1, "pi", 3, "ngClass"], ["for", "lc-accountName"], [1, "icon-addon", "icon-addon--company"], ["pInputText", "", "id", "lc-accountName", "name", "accountName", "placeholder", "Account name", 3, "ngModelChange", "ngModel"], ["for", "lc-opportunityName"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-user"], ["pInputText", "", "id", "lc-opportunityName", "name", "opportunityName", "placeholder", "Opportunity name", 3, "ngModelChange", "ngModel"], ["for", "lc-amount"], ["id", "lc-amount", "name", "amount", 1, "w-full", 3, "ngModelChange", "ngModel", "min"], ["for", "lc-expectedCloseDate"], ["id", "lc-expectedCloseDate", "name", "expectedCloseDate", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], [1, "hint"], [1, "form-section", "qualification-section"], [1, "pi", "pi-sliders-h"], [1, "qualification-summary"], [1, "label"], [1, "pill"], [4, "ngIf", "ngIfElse"], [1, "summary-message"], ["class", "summary-message", 4, "ngIf"], ["class", "hint-list", 4, "ngIf"], [1, "form-grid", "form-grid--2col"], ["for", "lc-dealType"], ["id", "lc-dealType", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "dealType", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lc-segment"], ["id", "lc-segment", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "segment", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lc-stage"], ["id", "lc-stage", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "stage", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lc-velocity"], ["id", "lc-velocity", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "velocity", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["name", "isCompetitive", "binary", "true", 3, "ngModelChange", "ngModel"], ["name", "hasExecutiveChampion", "binary", "true", 3, "ngModelChange", "ngModel"], ["name", "isStrategic", "binary", "true", 3, "ngModelChange", "ngModel"], ["class", "form-grid form-grid--2col", 4, "ngIf"], [1, "hint-list"], [4, "ngFor", "ngForOf"], ["class", "checkbox-field", 4, "ngIf"], ["class", "form-field full-row", 4, "ngIf"], ["name", "managerApproved", "binary", "true", 3, "ngModelChange", "ngModel"], [1, "form-field", "full-row"], ["for", "lc-overrideReason"], ["pTextarea", "", "id", "lc-overrideReason", "name", "overrideReason", "rows", "3", "placeholder", "Explain why you are converting below threshold", 3, "ngModelChange", "ngModel"]], template: function LeadConvertPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-breadcrumbs");
            i0.ɵɵelementStart(1, "div", 1)(2, "header", 2)(3, "div", 3)(4, "button", 4);
            i0.ɵɵelement(5, "i", 5);
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "Back to leads");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 6)(9, "h1", 7)(10, "span", 8);
            i0.ɵɵtext(11, "Convert");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 9);
            i0.ɵɵtext(13, "Lead");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, LeadConvertPage_p_14_Template, 2, 1, "p", 10);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "main", 11);
            i0.ɵɵtemplate(16, LeadConvertPage_div_16_Template, 55, 21, "div", 12);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.lead());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.lead());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, i2.NgForm, RouterLink,
            ButtonModule, i3.ButtonDirective, CheckboxModule, i4.Checkbox, DatePickerModule, i5.DatePicker, InputNumberModule, i6.InputNumber, InputGroupModule, i7.InputGroup, InputGroupAddonModule, i8.InputGroupAddon, InputTextModule, i9.InputText, TextareaModule, i10.Textarea, SelectModule, i11.Select, BreadcrumbsComponent, i1.SlicePipe], styles: [".convert-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    radial-gradient(at 20% 20%, rgba(59, 130, 246, 0.12) 0px, transparent 50%),\n    radial-gradient(at 80% 0%, rgba(14, 116, 144, 0.12) 0px, transparent 50%),\n    linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);\n}\n\n.page-header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(18px);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.6);\n  padding: 1.5rem 2rem;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  max-width: 920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0;\n  border: none;\n  background: transparent;\n  color: #0ea5e9;\n  text-decoration: none;\n  font-size: 0.875rem;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n\n.back-link[_ngcontent-%COMP%]:hover {\n  color: #0284c7;\n  gap: 0.75rem;\n}\n\n.header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n}\n\n.header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0;\n}\n\n.convert-container[_ngcontent-%COMP%] {\n  max-width: 920px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 20px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n  padding: 2rem;\n}\n\n.lead-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  margin-bottom: 1.5rem;\n}\n\n.lead-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);\n  color: #fff;\n  font-weight: 700;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.lead-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.lead-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.lead-company[_ngcontent-%COMP%], \n.lead-contact[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #64748b;\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(15, 118, 110, 0.12);\n  color: #0f766e;\n}\n\n.presence-banner[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.45rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.1);\n  color: #1d4ed8;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n\n.convert-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n\n.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #6366f1;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: #b91c1c;\n}\n\n.checkbox-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.value-pill[_ngcontent-%COMP%] {\n  background: rgba(226, 232, 240, 0.7);\n  border-radius: 10px;\n  padding: 0.6rem 0.8rem;\n  font-size: 0.85rem;\n  color: #475569;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 180px;\n}\n\n.qualification-section[_ngcontent-%COMP%] {\n  background: rgba(226, 232, 240, 0.45);\n  border-radius: 16px;\n  padding: 1.25rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.qualification-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: center;\n}\n\n.qualification-summary[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #64748b;\n}\n\n.qualification-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  color: #0f172a;\n}\n\n.summary-message[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  font-size: 0.9rem;\n  color: #475569;\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(148, 163, 184, 0.2);\n  color: #334155;\n}\n\n.pill[data-band='Strong'][_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.16);\n  color: #047857;\n}\n\n.pill[data-band='Moderate'][_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.18);\n  color: #1d4ed8;\n}\n\n.pill[data-band='Weak'][_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #b45309;\n}\n\n.pill[data-band='Unqualified'][_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.18);\n  color: #b91c1c;\n}\n\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    padding: 1.25rem 1.5rem;\n  }\n\n  .convert-container[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadConvertPage, [{
        type: Component,
        args: [{ selector: 'app-lead-convert-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    CheckboxModule,
                    DatePickerModule,
                    InputNumberModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputTextModule,
                    TextareaModule,
                    SelectModule,
                    BreadcrumbsComponent,
                ], template: "<app-breadcrumbs></app-breadcrumbs>\n<div class=\"convert-page\">\n  <header class=\"page-header\">\n    <div class=\"header-content\">\n      <button pButton type=\"button\" class=\"back-link p-button-text\" routerLink=\"/app/leads\">\n        <i class=\"pi pi-arrow-left\"></i>\n        <span>Back to leads</span>\n      </button>\n      <div class=\"header-title\">\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Convert</span>\n          <span class=\"title-light\">Lead</span>\n        </h1>\n        <p *ngIf=\"lead() as leadData\">Turn {{ leadData.name }} into an account, contact, and opportunity.</p>\n      </div>\n    </div>\n  </header>\n\n  <main class=\"convert-container\">\n    <div class=\"glass-card\" *ngIf=\"lead() as leadData\">\n      <div class=\"lead-summary\">\n        <div class=\"lead-avatar\">\n          <img\n            [src]=\"$any(leadData).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (leadData.email || leadData.id))\"\n            [alt]=\"leadData.name + ' avatar'\"\n            [title]=\"leadData.name + ' avatar'\"\n          />\n        </div>\n        <div class=\"lead-meta\">\n          <span class=\"lead-name\">{{ leadData.name }}</span>\n          <span class=\"lead-company\">{{ leadData.company }}</span>\n          <span class=\"lead-contact\" *ngIf=\"leadData.email\">{{ leadData.email }}</span>\n        </div>\n        <span class=\"status-pill\" [attr.data-status]=\"leadData.status\">{{ leadData.status }}</span>\n      </div>\n\n      <div class=\"presence-banner\" *ngIf=\"visiblePresenceUsers().length\">\n        <i class=\"pi\" [ngClass]=\"visiblePresenceUsers()[0]?.isEditing ? 'pi-pencil' : 'pi-eye'\"></i>\n        <span>{{ presenceSummaryText() }}</span>\n      </div>\n\n      <form class=\"convert-form\" (ngSubmit)=\"onConvert()\">\n        <section class=\"form-section\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-building\"></i>\n            Account\n          </h2>\n          <div class=\"form-grid\">\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().createAccount\" name=\"createAccount\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Create new account</span>\n            </label>\n            <div class=\"form-field\" *ngIf=\"form().createAccount\">\n              <label for=\"lc-accountName\">Account name</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--company\"><i class=\"pi pi-building\"></i></p-inputgroup-addon>\n                <input pInputText id=\"lc-accountName\" name=\"accountName\" [(ngModel)]=\"form().accountName\" placeholder=\"Account name\" />\n              </p-inputgroup>\n            </div>\n          </div>\n        </section>\n\n        <section class=\"form-section\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-id-card\"></i>\n            Contact\n          </h2>\n          <div class=\"form-grid\">\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().createContact\" name=\"createContact\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Create contact from lead details</span>\n            </label>\n            <div class=\"form-field\">\n              <label for=\"lc-contact\">Contact</label>\n              <div class=\"value-pill\">\n                {{ leadData.name }} \u2022 {{ leadData.email || 'No email' }}\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <section class=\"form-section\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-briefcase\"></i>\n            Opportunity\n          </h2>\n          <div class=\"form-grid\">\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().createOpportunity\" name=\"createOpportunity\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Create opportunity</span>\n            </label>\n            <div class=\"form-field\" *ngIf=\"form().createOpportunity\">\n              <label for=\"lc-opportunityName\">Opportunity name</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-user\"></i></p-inputgroup-addon>\n                <input pInputText id=\"lc-opportunityName\" name=\"opportunityName\" [(ngModel)]=\"form().opportunityName\" placeholder=\"Opportunity name\" />\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field\" *ngIf=\"form().createOpportunity\">\n              <label for=\"lc-amount\">Amount</label>\n              <p-inputNumber id=\"lc-amount\" name=\"amount\" [(ngModel)]=\"form().amount\" [min]=\"0\" class=\"w-full\"></p-inputNumber>\n            </div>\n            <div class=\"form-field\" *ngIf=\"form().createOpportunity\">\n              <label for=\"lc-expectedCloseDate\">Expected close date</label>\n              <p-datePicker id=\"lc-expectedCloseDate\" name=\"expectedCloseDate\" [(ngModel)]=\"form().expectedCloseDate\" [showIcon]=\"true\" styleClass=\"w-full\"></p-datePicker>\n            </div>\n          </div>\n          <p class=\"hint\" *ngIf=\"form().createOpportunity && !form().createAccount\">\n            Create an account to attach the opportunity.\n          </p>\n        </section>\n\n        <section class=\"form-section qualification-section\" *ngIf=\"lead() as leadData\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-sliders-h\"></i>\n            Qualification guardrails\n          </h2>\n          <div class=\"qualification-summary\">\n            <div>\n              <span class=\"label\">Score</span>\n              <strong>{{ leadData.score }}/100</strong>\n            </div>\n            <div>\n              <span class=\"label\">Readiness</span>\n              <strong>{{ conversionReadiness()?.score ?? 0 }}/100</strong>\n            </div>\n            <div>\n              <span class=\"label\">Band</span>\n              <span class=\"pill\" [attr.data-band]=\"qualificationDecision().band\">{{ qualificationDecision().band }}</span>\n            </div>\n            <div>\n              <span class=\"label\">Readiness label</span>\n              <span class=\"pill\" [attr.data-band]=\"conversionReadiness()?.label?.toLowerCase()\">{{ conversionReadiness()?.label ?? 'Not assessed' }}</span>\n            </div>\n            <div>\n              <span class=\"label\">Threshold</span>\n              <strong>{{ qualificationDecision().adjustedThreshold }}</strong>\n            </div>\n            <div>\n              <span class=\"label\">Conversation</span>\n              <strong *ngIf=\"leadData.conversationSignalAvailable; else unavailableConversation\">\n                {{ leadData.conversationScore || 0 }}/100\n              </strong>\n              <ng-template #unavailableConversation>\n                <strong>Unavailable</strong>\n              </ng-template>\n            </div>\n            <div class=\"summary-message\">\n              {{ conversionReadiness()?.summary || qualificationDecision().message }}\n            </div>\n            <div class=\"summary-message\" *ngIf=\"conversionReadiness()?.primaryGap as primaryGap\">\n              Primary gap: {{ primaryGap }}\n            </div>\n            <div class=\"summary-message\" *ngIf=\"conversionReadiness()?.managerReviewRecommended\">\n              Manager review is recommended before conversion.\n            </div>\n            <ul class=\"hint-list\" *ngIf=\"conversionReadinessReasons().length\">\n              <li *ngFor=\"let reason of conversionReadinessReasons() | slice:0:4\">{{ reason }}</li>\n            </ul>\n          </div>\n\n          <div class=\"form-grid form-grid--2col\">\n            <div class=\"form-field\">\n              <label for=\"lc-dealType\">Deal type</label>\n              <p-select\n                id=\"lc-dealType\"\n                appendTo=\"body\"\n                [options]=\"dealTypeOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                [(ngModel)]=\"form().dealType\"\n                (ngModelChange)=\"onFormChange()\"\n                name=\"dealType\"\n                styleClass=\"w-full\"\n              ></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"lc-segment\">Segment</label>\n              <p-select\n                id=\"lc-segment\"\n                appendTo=\"body\"\n                [options]=\"segmentOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                [(ngModel)]=\"form().segment\"\n                (ngModelChange)=\"onFormChange()\"\n                name=\"segment\"\n                styleClass=\"w-full\"\n              ></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"lc-stage\">Stage</label>\n              <p-select\n                id=\"lc-stage\"\n                appendTo=\"body\"\n                [options]=\"stageOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                [(ngModel)]=\"form().stage\"\n                (ngModelChange)=\"onFormChange()\"\n                name=\"stage\"\n                styleClass=\"w-full\"\n              ></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"lc-velocity\">Velocity</label>\n              <p-select\n                id=\"lc-velocity\"\n                appendTo=\"body\"\n                [options]=\"velocityOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                [(ngModel)]=\"form().velocity\"\n                (ngModelChange)=\"onFormChange()\"\n                name=\"velocity\"\n                styleClass=\"w-full\"\n              ></p-select>\n            </div>\n          </div>\n\n          <div class=\"form-grid form-grid--2col\">\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().isCompetitive\" name=\"isCompetitive\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Competitive deal</span>\n            </label>\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().hasExecutiveChampion\" name=\"hasExecutiveChampion\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Executive champion</span>\n            </label>\n            <label class=\"checkbox-field\">\n              <p-checkbox [(ngModel)]=\"form().isStrategic\" name=\"isStrategic\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Strategic account</span>\n            </label>\n          </div>\n\n          <div class=\"form-grid form-grid--2col\" *ngIf=\"qualificationDecision().requiresManagerApproval || qualificationDecision().requiresOverrideReason\">\n            <label class=\"checkbox-field\" *ngIf=\"qualificationDecision().requiresManagerApproval\">\n              <p-checkbox [(ngModel)]=\"form().managerApproved\" name=\"managerApproved\" binary=\"true\" (ngModelChange)=\"onFormChange()\"></p-checkbox>\n              <span>Manager approved</span>\n            </label>\n            <div class=\"form-field full-row\" *ngIf=\"qualificationDecision().requiresOverrideReason\">\n              <label for=\"lc-overrideReason\">Override reason</label>\n              <textarea\n                pTextarea\n                id=\"lc-overrideReason\"\n                name=\"overrideReason\"\n                [(ngModel)]=\"form().overrideReason\"\n                (ngModelChange)=\"onFormChange()\"\n                rows=\"3\"\n                placeholder=\"Explain why you are converting below threshold\"\n              ></textarea>\n            </div>\n          </div>\n        </section>\n\n        <footer class=\"form-actions\">\n          <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button crm-button--ghost\" (click)=\"onCancel()\"></button>\n          <button type=\"submit\" pButton label=\"Convert lead\" class=\"crm-button crm-button--primary\" [disabled]=\"saving() || !canConvert()\"></button>\n        </footer>\n      </form>\n    </div>\n  </main>\n</div>\n", styles: [".convert-page {\n  min-height: 100vh;\n  background:\n    radial-gradient(at 20% 20%, rgba(59, 130, 246, 0.12) 0px, transparent 50%),\n    radial-gradient(at 80% 0%, rgba(14, 116, 144, 0.12) 0px, transparent 50%),\n    linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);\n}\n\n.page-header {\n  background: rgba(255, 255, 255, 0.9);\n  backdrop-filter: blur(18px);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.6);\n  padding: 1.5rem 2rem;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n\n.header-content {\n  max-width: 920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0;\n  border: none;\n  background: transparent;\n  color: #0ea5e9;\n  text-decoration: none;\n  font-size: 0.875rem;\n  font-weight: 600;\n  transition: all 0.2s ease;\n}\n\n.back-link:hover {\n  color: #0284c7;\n  gap: 0.75rem;\n}\n\n.header-title h1 {\n  margin: 0 0 0.25rem;\n}\n\n.header-title p {\n  color: #64748b;\n  margin: 0;\n}\n\n.convert-container {\n  max-width: 920px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 20px;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n  padding: 2rem;\n}\n\n.lead-summary {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  margin-bottom: 1.5rem;\n}\n\n.lead-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);\n  color: #fff;\n  font-weight: 700;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.lead-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.lead-name {\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.lead-company,\n.lead-contact {\n  font-size: 0.875rem;\n  color: #64748b;\n}\n\n.status-pill {\n  margin-left: auto;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(15, 118, 110, 0.12);\n  color: #0f766e;\n}\n\n.presence-banner {\n  margin-bottom: 1.25rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.45rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.1);\n  color: #1d4ed8;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n\n.convert-form {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n\n.form-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n}\n\n.section-title i {\n  color: #6366f1;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.hint {\n  margin: 0;\n  font-size: 0.85rem;\n  color: #b91c1c;\n}\n\n.checkbox-field {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.value-pill {\n  background: rgba(226, 232, 240, 0.7);\n  border-radius: 10px;\n  padding: 0.6rem 0.8rem;\n  font-size: 0.85rem;\n  color: #475569;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.form-actions button {\n  min-width: 180px;\n}\n\n.qualification-section {\n  background: rgba(226, 232, 240, 0.45);\n  border-radius: 16px;\n  padding: 1.25rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.qualification-summary {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: center;\n}\n\n.qualification-summary .label {\n  display: block;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #64748b;\n}\n\n.qualification-summary strong {\n  font-size: 1.05rem;\n  color: #0f172a;\n}\n\n.summary-message {\n  grid-column: 1 / -1;\n  font-size: 0.9rem;\n  color: #475569;\n}\n\n.pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(148, 163, 184, 0.2);\n  color: #334155;\n}\n\n.pill[data-band='Strong'] {\n  background: rgba(16, 185, 129, 0.16);\n  color: #047857;\n}\n\n.pill[data-band='Moderate'] {\n  background: rgba(59, 130, 246, 0.18);\n  color: #1d4ed8;\n}\n\n.pill[data-band='Weak'] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #b45309;\n}\n\n.pill[data-band='Unqualified'] {\n  background: rgba(248, 113, 113, 0.18);\n  color: #b91c1c;\n}\n\n@media (max-width: 768px) {\n  .page-header {\n    padding: 1.25rem 1.5rem;\n  }\n\n  .convert-container {\n    padding: 1.5rem;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LeadConvertPage, { className: "LeadConvertPage", filePath: "src/app/crm/features/leads/pages/lead-convert.page.ts", lineNumber: 46 }); })();
