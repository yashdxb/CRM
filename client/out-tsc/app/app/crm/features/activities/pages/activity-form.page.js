import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { map } from 'rxjs';
import { ActivityDataService } from '../services/activity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { LeadDataService } from '../../leads/services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, readUserId, tokenHasRole } from '../../../../core/auth/token.utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/textarea";
import * as i8 from "primeng/datepicker";
import * as i9 from "primeng/inputgroup";
import * as i10 from "primeng/inputgroupaddon";
function ActivityFormPage_section_15_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "a", 66);
    i0.ɵɵelement(2, "i", 67);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const link_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", link_r1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.relatedLabel(), " ");
} }
function ActivityFormPage_section_15_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1, "No related record yet.");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_section_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 62)(1, "div", 63);
    i0.ɵɵtext(2, "Related record");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ActivityFormPage_section_15_div_3_Template, 4, 2, "div", 64)(4, ActivityFormPage_section_15_ng_template_4_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noRelatedSummary_r3 = i0.ɵɵreference(5);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.relatedLink())("ngIfElse", noRelatedSummary_r3);
} }
function ActivityFormPage_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r4.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r4.label);
} }
function ActivityFormPage_ng_template_28_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r5.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function ActivityFormPage_ng_template_28_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Choose template");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_28_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_28_ng_template_1_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const templatePlaceholder_r6 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r5)("ngIfElse", templatePlaceholder_r6);
} }
function ActivityFormPage_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
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
function ActivityFormPage_ng_template_43_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
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
function ActivityFormPage_ng_template_43_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select type");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_43_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_43_ng_template_1_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r8 = ctx.$implicit;
    const typePlaceholder_r9 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r8)("ngIfElse", typePlaceholder_r9);
} }
function ActivityFormPage_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r10.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r10.label);
} }
function ActivityFormPage_ng_template_49_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r11.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r11.label);
} }
function ActivityFormPage_ng_template_49_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select priority");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_49_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_49_ng_template_1_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    const priorityPlaceholder_r12 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r11)("ngIfElse", priorityPlaceholder_r12);
} }
function ActivityFormPage_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r13.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r13.label);
} }
function ActivityFormPage_ng_template_55_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r14.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r14.label);
} }
function ActivityFormPage_ng_template_55_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select status");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_55_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_55_ng_template_1_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r14 = ctx.$implicit;
    const statusPlaceholder_r15 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r14)("ngIfElse", statusPlaceholder_r15);
} }
function ActivityFormPage_ng_template_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r16 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r16.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r16.label);
} }
function ActivityFormPage_ng_template_61_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r17.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r17.label);
} }
function ActivityFormPage_ng_template_61_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select owner");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_61_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_61_ng_template_1_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const ownerPlaceholder_r18 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r17)("ngIfElse", ownerPlaceholder_r18);
} }
function ActivityFormPage_small_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 73);
    i0.ɵɵtext(1, " Owner is fixed to the current logged-in user. ");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_68_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Defaulted from Lead SLA (", ctx_r1.leadSlaDueLabel(), ") ");
} }
function ActivityFormPage_div_68_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Lead SLA due: ", ctx_r1.leadSlaDueLabel(), " ");
} }
function ActivityFormPage_div_68_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function ActivityFormPage_div_68_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.syncDueDateToLeadSla()); });
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtemplate(1, ActivityFormPage_div_68_span_1_Template, 2, 1, "span", 75)(2, ActivityFormPage_div_68_span_2_Template, 2, 1, "span", 75)(3, ActivityFormPage_div_68_button_3_Template, 1, 0, "button", 76);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.dueDateDefaultedFromLeadSla());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.dueDateDefaultedFromLeadSla());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canSyncDueDateToLeadSla());
} }
function ActivityFormPage_div_69_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 79);
    i0.ɵɵtext(2, "Completed at");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-datePicker", 80);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_69_Template_p_datePicker_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.completedDateUtc, $event) || (ctx_r1.form.completedDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.completedDateUtc);
    i0.ɵɵproperty("showIcon", true)("showTime", true);
} }
function ActivityFormPage_ng_template_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r21 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r21.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r21.label);
} }
function ActivityFormPage_ng_template_75_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r22.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r22.label);
} }
function ActivityFormPage_ng_template_75_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select record type");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_ng_template_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_ng_template_75_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_ng_template_75_ng_template_1_Template, 2, 0, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r22 = ctx.$implicit;
    const relatedPlaceholder_r23 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r22)("ngIfElse", relatedPlaceholder_r23);
} }
function ActivityFormPage_div_76_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r25 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r25.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r25.label);
} }
function ActivityFormPage_div_76_ng_template_5_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r26.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r26.label);
} }
function ActivityFormPage_div_76_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select account");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_76_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_div_76_ng_template_5_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_div_76_ng_template_5_ng_template_1_Template, 2, 0, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r26 = ctx.$implicit;
    const accountPlaceholder_r27 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r26)("ngIfElse", accountPlaceholder_r27);
} }
function ActivityFormPage_div_76_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 81);
    i0.ɵɵtext(2, "Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 82);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_76_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.relatedEntityId, $event) || (ctx_r1.form.relatedEntityId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function ActivityFormPage_div_76_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRelatedEntityChange($event)); });
    i0.ɵɵtemplate(4, ActivityFormPage_div_76_ng_template_4_Template, 4, 2, "ng-template", 30)(5, ActivityFormPage_div_76_ng_template_5_Template, 3, 2, "ng-template", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r1.customerOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.relatedEntityId);
    i0.ɵɵproperty("disabled", ctx_r1.systemLocked());
} }
function ActivityFormPage_div_77_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r29 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r29.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r29.label);
} }
function ActivityFormPage_div_77_ng_template_5_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r30 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r30.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r30.label);
} }
function ActivityFormPage_div_77_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select contact");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_77_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_div_77_ng_template_5_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_div_77_ng_template_5_ng_template_1_Template, 2, 0, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r30 = ctx.$implicit;
    const contactPlaceholder_r31 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r30)("ngIfElse", contactPlaceholder_r31);
} }
function ActivityFormPage_div_77_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 83);
    i0.ɵɵtext(2, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 84);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_77_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.relatedEntityId, $event) || (ctx_r1.form.relatedEntityId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function ActivityFormPage_div_77_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRelatedEntityChange($event)); });
    i0.ɵɵtemplate(4, ActivityFormPage_div_77_ng_template_4_Template, 4, 2, "ng-template", 30)(5, ActivityFormPage_div_77_ng_template_5_Template, 3, 2, "ng-template", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r1.contactOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.relatedEntityId);
    i0.ɵɵproperty("disabled", ctx_r1.systemLocked());
} }
function ActivityFormPage_div_78_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r33 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r33.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r33.label);
} }
function ActivityFormPage_div_78_ng_template_5_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r34 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r34.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r34.label);
} }
function ActivityFormPage_div_78_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select opportunity");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_78_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_div_78_ng_template_5_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_div_78_ng_template_5_ng_template_1_Template, 2, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r34 = ctx.$implicit;
    const opportunityPlaceholder_r35 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r34)("ngIfElse", opportunityPlaceholder_r35);
} }
function ActivityFormPage_div_78_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 85);
    i0.ɵɵtext(2, "Opportunity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 86);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_78_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r32); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.relatedEntityId, $event) || (ctx_r1.form.relatedEntityId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function ActivityFormPage_div_78_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r32); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRelatedEntityChange($event)); });
    i0.ɵɵtemplate(4, ActivityFormPage_div_78_ng_template_4_Template, 4, 2, "ng-template", 30)(5, ActivityFormPage_div_78_ng_template_5_Template, 3, 2, "ng-template", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r1.opportunityOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.relatedEntityId);
    i0.ɵɵproperty("disabled", ctx_r1.systemLocked());
} }
function ActivityFormPage_div_79_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r37 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r37.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r37.label);
} }
function ActivityFormPage_div_79_ng_template_5_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r38 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r38.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r38.label);
} }
function ActivityFormPage_div_79_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Select lead");
    i0.ɵɵelementEnd();
} }
function ActivityFormPage_div_79_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivityFormPage_div_79_ng_template_5_div_0_Template, 4, 2, "div", 71)(1, ActivityFormPage_div_79_ng_template_5_ng_template_1_Template, 2, 0, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const option_r38 = ctx.$implicit;
    const leadPlaceholder_r39 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", option_r38)("ngIfElse", leadPlaceholder_r39);
} }
function ActivityFormPage_div_79_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 87);
    i0.ɵɵtext(2, "Lead");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 88);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_79_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.relatedEntityId, $event) || (ctx_r1.form.relatedEntityId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function ActivityFormPage_div_79_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRelatedEntityChange($event)); });
    i0.ɵɵtemplate(4, ActivityFormPage_div_79_ng_template_4_Template, 4, 2, "ng-template", 30)(5, ActivityFormPage_div_79_ng_template_5_Template, 3, 2, "ng-template", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r1.leadOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.relatedEntityId);
    i0.ɵɵproperty("disabled", ctx_r1.systemLocked());
} }
function ActivityFormPage_div_90_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "label", 89);
    i0.ɵɵtext(2, "Next step subject ");
    i0.ɵɵelementStart(3, "span", 34);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-inputgroup")(6, "p-inputgroup-addon", 35);
    i0.ɵɵelement(7, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 90);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_90_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r40); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.nextStepSubject, $event) || (ctx_r1.form.nextStepSubject = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.nextStepSubject);
} }
function ActivityFormPage_div_91_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 91);
    i0.ɵɵtext(2, "Next step due date ");
    i0.ɵɵelementStart(3, "span", 34);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-datePicker", 92);
    i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_div_91_Template_p_datePicker_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r41); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.nextStepDueDateUtc, $event) || (ctx_r1.form.nextStepDueDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.nextStepDueDateUtc);
    i0.ɵɵproperty("showIcon", true)("showTime", true);
} }
export class ActivityFormPage {
    typeOptions = [
        { label: 'Task', value: 'Task', icon: 'pi-check-square' },
        { label: 'Call', value: 'Call', icon: 'pi-phone' },
        { label: 'Email', value: 'Email', icon: 'pi-envelope' },
        { label: 'Meeting', value: 'Meeting', icon: 'pi-users' }
    ];
    priorityOptions = [
        { label: 'High', value: 'High', icon: 'pi-arrow-up' },
        { label: 'Normal', value: 'Normal', icon: 'pi-minus' },
        { label: 'Low', value: 'Low', icon: 'pi-arrow-down' }
    ];
    statusOptions = [
        { label: 'Open', value: 'Open', icon: 'pi-clock' },
        { label: 'Completed', value: 'Completed', icon: 'pi-check-circle' }
    ];
    relationOptions = [
        { label: 'Account', value: 'Account', icon: 'pi-building' },
        { label: 'Contact', value: 'Contact', icon: 'pi-id-card' },
        { label: 'Opportunity', value: 'Opportunity', icon: 'pi-briefcase' },
        { label: 'Lead', value: 'Lead', icon: 'pi-user' }
    ];
    templateOptions = [];
    activityTemplates = [
        {
            id: 'call-discovery',
            label: 'Discovery call',
            icon: 'pi-phone',
            stages: ['Prospecting', 'Qualification'],
            defaults: {
                subject: 'Discovery call',
                type: 'Call',
                priority: 'High',
                description: 'Confirm pain points, decision process, and next steps.'
            }
        },
        {
            id: 'intro-email',
            label: 'Intro email',
            icon: 'pi-send',
            stages: ['Prospecting'],
            defaults: {
                subject: 'Intro outreach',
                type: 'Email',
                priority: 'Normal',
                description: 'Introduce value proposition and request a quick discovery call.'
            }
        },
        {
            id: 'intro-call',
            label: 'Intro call',
            icon: 'pi-phone',
            stages: ['Prospecting'],
            defaults: {
                subject: 'Intro call',
                type: 'Call',
                priority: 'Normal',
                description: 'Validate interest and confirm discovery meeting.'
            }
        },
        {
            id: 'qualification-email',
            label: 'Qualification email',
            icon: 'pi-envelope',
            stages: ['Prospecting', 'Qualification'],
            defaults: {
                subject: 'Qualification follow-up',
                type: 'Email',
                priority: 'Normal',
                description: 'Summarize needs, confirm stakeholders, and propose next step.'
            }
        },
        {
            id: 'discovery-survey',
            label: 'Discovery questionnaire',
            icon: 'pi-list',
            stages: ['Qualification'],
            defaults: {
                subject: 'Discovery questionnaire',
                type: 'Task',
                priority: 'Normal',
                description: 'Capture requirements, success criteria, and timeline.'
            }
        },
        {
            id: 'meeting-stakeholder',
            label: 'Stakeholder meeting',
            icon: 'pi-users',
            stages: ['Qualification', 'Proposal'],
            defaults: {
                subject: 'Stakeholder sync',
                type: 'Meeting',
                priority: 'Normal',
                description: 'Agenda: recap needs, align stakeholders, and lock the next action.'
            }
        },
        {
            id: 'demo-poc',
            label: 'Demo / POC',
            icon: 'pi-desktop',
            stages: ['Qualification', 'Proposal'],
            defaults: {
                subject: 'Product demo / POC',
                type: 'Meeting',
                priority: 'High',
                description: 'Run demo or proof of concept, capture decision criteria and feedback.'
            }
        },
        {
            id: 'proposal-review',
            label: 'Proposal review',
            icon: 'pi-file',
            stages: ['Proposal'],
            defaults: {
                subject: 'Proposal review',
                type: 'Meeting',
                priority: 'High',
                description: 'Walk through proposal, confirm scope, and address objections.'
            }
        },
        {
            id: 'security-questionnaire',
            label: 'Security questionnaire',
            icon: 'pi-shield',
            stages: ['Proposal', 'Negotiation'],
            defaults: {
                subject: 'Security review',
                type: 'Task',
                priority: 'High',
                description: 'Complete security questionnaire and address compliance concerns.'
            }
        },
        {
            id: 'legal-redlines',
            label: 'Legal redlines',
            icon: 'pi-briefcase',
            stages: ['Proposal', 'Negotiation'],
            defaults: {
                subject: 'Legal redlines',
                type: 'Task',
                priority: 'High',
                description: 'Review contract redlines and coordinate approvals.'
            }
        },
        {
            id: 'negotiation-call',
            label: 'Negotiation call',
            icon: 'pi-phone',
            stages: ['Negotiation'],
            defaults: {
                subject: 'Negotiation call',
                type: 'Call',
                priority: 'High',
                description: 'Review terms, pricing, and confirm path to signature.'
            }
        },
        {
            id: 'final-approval',
            label: 'Final approval',
            icon: 'pi-check-circle',
            stages: ['Negotiation'],
            defaults: {
                subject: 'Final approval request',
                type: 'Task',
                priority: 'High',
                description: 'Secure final approvals and confirm signature date.'
            }
        },
        {
            id: 'handoff-kickoff',
            label: 'Handoff kickoff',
            icon: 'pi-flag',
            stages: ['Closed Won'],
            defaults: {
                subject: 'Implementation kickoff',
                type: 'Meeting',
                priority: 'High',
                description: 'Introduce delivery team, confirm scope, and schedule kickoff.'
            }
        },
        {
            id: 'loss-review',
            label: 'Loss review',
            icon: 'pi-chart-line',
            stages: ['Closed Lost'],
            defaults: {
                subject: 'Loss review',
                type: 'Task',
                priority: 'Normal',
                description: 'Capture loss reason and competitive insights.'
            }
        },
        {
            id: 'follow-up',
            label: 'Follow-up task',
            icon: 'pi-check-square',
            defaults: {
                subject: 'Follow-up',
                type: 'Task',
                priority: 'Normal',
                description: 'Send recap, share collateral, and confirm next meeting.'
            }
        }
    ];
    form = this.createEmptyForm();
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    toastService = inject(AppToastService);
    customerOptions = [];
    contactOptions = [];
    opportunityOptions = [];
    leadOptions = [];
    ownerOptions = [];
    selectedTemplate = 'none';
    activityStatus = 'Open';
    systemLocked = signal(false, ...(ngDevMode ? [{ debugName: "systemLocked" }] : []));
    dueDateDefaultedFromLeadSla = signal(false, ...(ngDevMode ? [{ debugName: "dueDateDefaultedFromLeadSla" }] : []));
    canEditOwner = computed(() => {
        const payload = readTokenContext()?.payload ?? null;
        return (tokenHasRole(payload, 'Sales Manager') ||
            tokenHasRole(payload, 'System Administrator') ||
            tokenHasRole(payload, 'Admin') ||
            tokenHasRole(payload, 'Super Admin'));
    }, ...(ngDevMode ? [{ debugName: "canEditOwner" }] : []));
    pendingAccountOption = null;
    pendingContactOption = null;
    pendingOpportunityOption = null;
    pendingLeadOption = null;
    pendingOwnerOption = null;
    opportunityStage = null;
    leadFirstTouchDueAtUtc = null;
    activityData = inject(ActivityDataService);
    customerData = inject(CustomerDataService);
    contactData = inject(ContactDataService);
    opportunityData = inject(OpportunityDataService);
    leadData = inject(LeadDataService);
    userAdminData = inject(UserAdminDataService);
    cdr = inject(ChangeDetectorRef);
    route = inject(ActivatedRoute);
    router = inject(Router);
    currentUserId = readUserId();
    editingId = null;
    ngOnInit() {
        this.editingId = this.route.snapshot.paramMap.get('id');
        const activity = history.state?.activity;
        if (this.editingId && activity) {
            this.prefill(activity);
        }
        if (this.editingId) {
            this.loadActivityForEdit(this.editingId);
        }
        if (!this.editingId) {
            this.assignCurrentUserAsOwner();
            this.applyContextFromQuery();
        }
        this.updateTemplateOptions();
        this.loadOwners();
        this.loadLookups();
    }
    isEditMode() {
        return !!this.editingId;
    }
    relatedLink() {
        const id = this.form.relatedEntityId;
        const type = this.form.relatedEntityType;
        if (!id || !type) {
            return null;
        }
        switch (type) {
            case 'Account':
                return `/app/customers/${id}/edit`;
            case 'Contact':
                return `/app/contacts/${id}/edit`;
            case 'Opportunity':
                return `/app/deals/${id}/edit`;
            case 'Lead':
                return `/app/leads/${id}/edit`;
            default:
                return null;
        }
    }
    relatedLabel() {
        const id = this.form.relatedEntityId;
        const type = this.form.relatedEntityType;
        if (!id || !type) {
            return 'No related record selected yet.';
        }
        const label = this.resolveRelatedName(type, id);
        return label ? `${type}: ${label}` : `${type} record`;
    }
    resolveRelatedName(type, id) {
        const options = (() => {
            switch (type) {
                case 'Account':
                    return this.customerOptions;
                case 'Contact':
                    return this.contactOptions;
                case 'Opportunity':
                    return this.opportunityOptions;
                case 'Lead':
                    return this.leadOptions;
                default:
                    return [];
            }
        })();
        return options.find((option) => option.value === id)?.label ?? null;
    }
    onRelationTypeChange(_value) {
        this.form.relatedEntityId = undefined;
        if (this.form.relatedEntityType !== 'Opportunity') {
            this.opportunityStage = null;
            this.updateTemplateOptions();
        }
    }
    onRelatedEntityChange(value) {
        if (this.form.relatedEntityType !== 'Opportunity') {
            return;
        }
        if (!value) {
            this.opportunityStage = null;
            this.updateTemplateOptions();
            return;
        }
        this.updateOpportunityStage(value);
    }
    onTemplateChange(value) {
        const selected = value ?? 'none';
        this.selectedTemplate = selected;
        this.form.templateKey = selected === 'none' ? undefined : selected;
        if (selected === 'none') {
            return;
        }
        const template = this.activityTemplates.find((item) => item.id === selected);
        if (!template) {
            return;
        }
        this.form = {
            ...this.form,
            subject: template.defaults.subject ?? this.form.subject,
            type: template.defaults.type ?? this.form.type,
            priority: template.defaults.priority ?? this.form.priority,
            description: template.defaults.description ?? this.form.description,
            templateKey: selected
        };
    }
    onStatusChange(status) {
        const nextStatus = status ?? 'Open';
        this.activityStatus = nextStatus;
        if (nextStatus === 'Completed') {
            if (!this.form.completedDateUtc) {
                this.form.completedDateUtc = new Date();
            }
            return;
        }
        this.form.completedDateUtc = undefined;
    }
    onSave() {
        if (!this.form.subject) {
            return;
        }
        if (!this.form.outcome || !this.form.outcome.trim()) {
            this.raiseToast('error', 'Outcome is required for an activity.');
            return;
        }
        if (this.activityStatus !== 'Completed') {
            if (!this.form.nextStepSubject || !this.form.nextStepSubject.trim()) {
                this.raiseToast('error', 'Next step subject is required for an activity.');
                return;
            }
            if (!this.form.nextStepDueDateUtc) {
                this.raiseToast('error', 'Next step due date is required for an activity.');
                return;
            }
        }
        if (this.activityStatus === 'Completed') {
            if (!this.form.dueDateUtc) {
                this.raiseToast('error', 'Due date is required to complete an activity.');
                return;
            }
        }
        if (this.form.relatedEntityType === 'Lead' && !this.form.dueDateUtc) {
            this.raiseToast('error', 'Due date is required for lead-related activities.');
            return;
        }
        this.saving.set(true);
        const payload = {
            ...this.form,
            completedDateUtc: this.activityStatus === 'Completed' ? (this.form.completedDateUtc ?? new Date()) : undefined,
            nextStepSubject: this.activityStatus === 'Completed' ? undefined : this.form.nextStepSubject,
            nextStepDueDateUtc: this.activityStatus === 'Completed' ? undefined : this.form.nextStepDueDateUtc
        };
        const request$ = this.editingId
            ? this.activityData.update(this.editingId, payload).pipe(map(() => null))
            : this.activityData.create(payload).pipe(map(() => null));
        request$.subscribe({
            next: () => {
                this.saving.set(false);
                const message = this.editingId ? 'Activity updated.' : 'Activity created.';
                this.raiseToast('success', message);
            },
            error: (err) => {
                this.saving.set(false);
                const message = err?.error ?? (this.editingId ? 'Unable to update activity.' : 'Unable to create activity.');
                this.raiseToast('error', message);
            }
        });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadLookups() {
        this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            queueMicrotask(() => {
                this.customerOptions = res.items.map((c) => ({
                    label: c.name,
                    value: c.id,
                    icon: 'pi-building'
                }));
                if (this.pendingAccountOption) {
                    const exists = this.customerOptions.some((option) => option.value === this.pendingAccountOption?.value);
                    if (!exists) {
                        this.customerOptions = [this.pendingAccountOption, ...this.customerOptions];
                    }
                    this.pendingAccountOption = null;
                }
                this.cdr.markForCheck();
            });
        });
        this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            queueMicrotask(() => {
                this.contactOptions = res.items.map((c) => ({
                    label: c.name,
                    value: c.id,
                    icon: 'pi-id-card'
                }));
                if (this.pendingContactOption) {
                    const exists = this.contactOptions.some((option) => option.value === this.pendingContactOption?.value);
                    if (!exists) {
                        this.contactOptions = [this.pendingContactOption, ...this.contactOptions];
                    }
                    this.pendingContactOption = null;
                }
                this.cdr.markForCheck();
            });
        });
        this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            queueMicrotask(() => {
                this.opportunityOptions = res.items.map((o) => ({
                    label: o.name,
                    value: o.id,
                    icon: 'pi-briefcase'
                }));
                if (this.pendingOpportunityOption) {
                    const exists = this.opportunityOptions.some((option) => option.value === this.pendingOpportunityOption?.value);
                    if (!exists) {
                        this.opportunityOptions = [this.pendingOpportunityOption, ...this.opportunityOptions];
                    }
                    this.pendingOpportunityOption = null;
                }
                this.cdr.markForCheck();
            });
        });
        this.leadData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            queueMicrotask(() => {
                this.leadOptions = res.items.map((lead) => ({
                    label: lead.company ? `${lead.name} · ${lead.company}` : lead.name,
                    value: lead.id,
                    icon: 'pi-user'
                }));
                if (this.pendingLeadOption) {
                    const exists = this.leadOptions.some((option) => option.value === this.pendingLeadOption?.value);
                    if (!exists) {
                        this.leadOptions = [this.pendingLeadOption, ...this.leadOptions];
                    }
                    this.pendingLeadOption = null;
                }
                this.cdr.markForCheck();
            });
        });
    }
    loadActivityForEdit(id) {
        this.activityData.get(id).subscribe({
            next: (activity) => this.prefill(activity),
            error: () => {
                this.raiseToast('error', 'Unable to load activity.');
                this.router.navigate(['/app/activities']);
            }
        });
    }
    prefill(activity) {
        this.systemLocked.set(this.isSystemActivity(activity));
        const dueDate = activity.dueDateUtc ? this.parseUtcDate(activity.dueDateUtc) : undefined;
        const completedDate = activity.completedDateUtc ? this.parseUtcDate(activity.completedDateUtc) : undefined;
        this.form = {
            subject: activity.subject,
            description: activity.description,
            outcome: activity.outcome,
            templateKey: activity.templateKey,
            type: activity.type,
            priority: activity.priority ?? 'Normal',
            dueDateUtc: dueDate,
            completedDateUtc: completedDate,
            nextStepSubject: activity.nextStepSubject ?? '',
            nextStepDueDateUtc: activity.nextStepDueDateUtc ? this.parseUtcDate(activity.nextStepDueDateUtc) : undefined,
            relatedEntityType: activity.relatedEntityType ?? 'Account',
            relatedEntityId: activity.relatedEntityId,
            ownerId: activity.ownerId
        };
        if (activity.templateKey) {
            this.selectedTemplate = activity.templateKey;
        }
        this.activityStatus = completedDate ? 'Completed' : 'Open';
        if (activity.ownerId) {
            const label = activity.ownerName?.trim() || 'Owner';
            const option = { label, value: activity.ownerId, icon: 'pi-user' };
            const exists = this.ownerOptions.some((item) => item.value === option.value);
            if (!exists) {
                this.ownerOptions = [option, ...this.ownerOptions];
            }
            this.pendingOwnerOption = option;
        }
        if (!this.canEditOwner()) {
            this.assignCurrentUserAsOwner();
        }
        if (activity.relatedEntityType === 'Lead' && activity.relatedEntityId) {
            const label = activity.relatedEntityName?.trim() || 'Lead';
            const option = { label, value: activity.relatedEntityId, icon: 'pi-user' };
            const exists = this.leadOptions.some((item) => item.value === option.value);
            if (!exists) {
                this.leadOptions = [option, ...this.leadOptions];
            }
            this.pendingLeadOption = option;
            return;
        }
        if (activity.relatedEntityType === 'Account' && activity.relatedEntityId) {
            const label = activity.relatedEntityName?.trim() || 'Account';
            const option = { label, value: activity.relatedEntityId, icon: 'pi-building' };
            const exists = this.customerOptions.some((item) => item.value === option.value);
            if (!exists) {
                this.customerOptions = [option, ...this.customerOptions];
            }
            this.pendingAccountOption = option;
        }
        else if (activity.relatedEntityType === 'Contact' && activity.relatedEntityId) {
            const label = activity.relatedEntityName?.trim() || 'Contact';
            const option = { label, value: activity.relatedEntityId, icon: 'pi-id-card' };
            const exists = this.contactOptions.some((item) => item.value === option.value);
            if (!exists) {
                this.contactOptions = [option, ...this.contactOptions];
            }
            this.pendingContactOption = option;
        }
        else if (activity.relatedEntityType === 'Opportunity' && activity.relatedEntityId) {
            this.updateOpportunityStage(activity.relatedEntityId);
            const label = activity.relatedEntityName?.trim() || 'Opportunity';
            const option = { label, value: activity.relatedEntityId, icon: 'pi-briefcase' };
            const exists = this.opportunityOptions.some((item) => item.value === option.value);
            if (!exists) {
                this.opportunityOptions = [option, ...this.opportunityOptions];
            }
            this.pendingOpportunityOption = option;
        }
        queueMicrotask(() => this.cdr.markForCheck());
    }
    isSystemActivity(activity) {
        const subject = (activity.subject ?? '').trim();
        const description = (activity.description ?? '').trim();
        if (!subject && !description) {
            return false;
        }
        if (description.includes('Auto-created next step.')) {
            return true;
        }
        if (/^First touch\b/i.test(subject)) {
            return true;
        }
        return /^Cadence\b/i.test(subject);
    }
    parseUtcDate(value) {
        // Ensure UTC interpretation when the API omits a timezone suffix.
        return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
    }
    createEmptyForm() {
        return {
            subject: '',
            description: '',
            outcome: '',
            templateKey: undefined,
            type: 'Task',
            priority: 'Normal',
            dueDateUtc: undefined,
            nextStepSubject: '',
            nextStepDueDateUtc: undefined,
            relatedEntityType: 'Account',
            relatedEntityId: undefined,
            ownerId: this.currentUserId ?? undefined
        };
    }
    loadOwners() {
        this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
            next: (res) => {
                queueMicrotask(() => {
                    this.ownerOptions = res.items.map((user) => ({
                        label: user.fullName,
                        value: user.id,
                        icon: 'pi-user'
                    }));
                    if (this.pendingOwnerOption) {
                        const exists = this.ownerOptions.some((option) => option.value === this.pendingOwnerOption?.value);
                        if (!exists) {
                            this.ownerOptions = [this.pendingOwnerOption, ...this.ownerOptions];
                        }
                        this.pendingOwnerOption = null;
                    }
                    this.assignCurrentUserAsOwner();
                    this.cdr.markForCheck();
                });
            },
            error: () => {
                queueMicrotask(() => {
                    this.ownerOptions = [];
                    this.assignCurrentUserAsOwner();
                    this.cdr.markForCheck();
                });
            }
        });
    }
    assignCurrentUserAsOwner() {
        if (!this.currentUserId) {
            return;
        }
        if (!this.form.ownerId || !this.canEditOwner()) {
            this.form.ownerId = this.currentUserId;
        }
        const currentOption = this.ownerOptions.find((option) => option.value === this.currentUserId);
        if (!currentOption) {
            this.pendingOwnerOption = this.pendingOwnerOption?.value === this.currentUserId
                ? this.pendingOwnerOption
                : { label: 'Current user', value: this.currentUserId, icon: 'pi-user' };
            this.ownerOptions = this.pendingOwnerOption ? [this.pendingOwnerOption, ...this.ownerOptions] : this.ownerOptions;
            return;
        }
        this.pendingOwnerOption = currentOption;
    }
    applyContextFromQuery() {
        const relatedType = this.route.snapshot.queryParamMap.get('relatedType');
        const relatedId = this.route.snapshot.queryParamMap.get('relatedId') ?? undefined;
        const subject = this.route.snapshot.queryParamMap.get('subject') ?? undefined;
        const type = this.route.snapshot.queryParamMap.get('type');
        const leadFirstTouchDueAtUtc = this.route.snapshot.queryParamMap.get('leadFirstTouchDueAtUtc');
        if (relatedType) {
            this.form.relatedEntityType = relatedType;
        }
        if (relatedId) {
            this.form.relatedEntityId = relatedId;
            if (relatedType === 'Opportunity') {
                this.updateOpportunityStage(relatedId);
            }
        }
        if (subject && !this.form.subject) {
            this.form.subject = subject;
        }
        if (type && this.typeOptions.some((option) => option.value === type)) {
            this.form.type = type;
        }
        this.leadFirstTouchDueAtUtc = this.parseOptionalDate(leadFirstTouchDueAtUtc);
        if (this.form.relatedEntityType === 'Lead' && !this.form.dueDateUtc && this.leadFirstTouchDueAtUtc) {
            this.form.dueDateUtc = new Date(this.leadFirstTouchDueAtUtc);
            this.dueDateDefaultedFromLeadSla.set(true);
        }
    }
    onDueDateChange(value) {
        this.form.dueDateUtc = value ?? undefined;
        if (!this.hasLeadSlaDueDate()) {
            this.dueDateDefaultedFromLeadSla.set(false);
            return;
        }
        this.dueDateDefaultedFromLeadSla.set(this.isSameMoment(value, this.leadFirstTouchDueAtUtc));
    }
    hasLeadSlaDueDate() {
        return this.form.relatedEntityType === 'Lead' && !!this.leadFirstTouchDueAtUtc;
    }
    leadSlaDueLabel() {
        return this.leadFirstTouchDueAtUtc
            ? this.leadFirstTouchDueAtUtc.toLocaleString()
            : '';
    }
    canSyncDueDateToLeadSla() {
        if (!this.hasLeadSlaDueDate())
            return false;
        return !this.isSameMoment(this.form.dueDateUtc, this.leadFirstTouchDueAtUtc);
    }
    syncDueDateToLeadSla() {
        if (!this.leadFirstTouchDueAtUtc)
            return;
        this.form.dueDateUtc = new Date(this.leadFirstTouchDueAtUtc);
        this.dueDateDefaultedFromLeadSla.set(true);
    }
    parseOptionalDate(value) {
        if (!value)
            return null;
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    isSameMoment(left, right) {
        if (!left || !right)
            return false;
        const leftDate = left instanceof Date ? left : new Date(left);
        const rightDate = right instanceof Date ? right : new Date(right);
        if (Number.isNaN(leftDate.getTime()) || Number.isNaN(rightDate.getTime()))
            return false;
        return leftDate.getTime() === rightDate.getTime();
    }
    updateOpportunityStage(opportunityId) {
        this.opportunityData.getById(opportunityId).subscribe({
            next: (opportunity) => {
                this.opportunityStage = opportunity.stage ?? null;
                this.updateTemplateOptions();
            },
            error: () => {
                this.opportunityStage = null;
                this.updateTemplateOptions();
            }
        });
    }
    updateTemplateOptions() {
        const templates = this.opportunityStage
            ? this.activityTemplates.filter((template) => !template.stages || template.stages.includes(this.opportunityStage))
            : this.activityTemplates;
        this.templateOptions = [
            { label: 'No template', value: 'none', icon: 'pi-sliders-h' },
            ...templates.map((template) => ({
                label: template.label,
                value: template.id,
                icon: template.icon
            }))
        ];
        if (this.selectedTemplate !== 'none') {
            const stillAvailable = templates.some((template) => template.id === this.selectedTemplate);
            if (!stillAvailable) {
                this.selectedTemplate = 'none';
            }
        }
    }
    static ɵfac = function ActivityFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActivityFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivityFormPage, selectors: [["app-activity-form-page"]], decls: 95, vars: 39, consts: [["noRelatedSummary", ""], ["templatePlaceholder", ""], ["typePlaceholder", ""], ["priorityPlaceholder", ""], ["statusPlaceholder", ""], ["ownerPlaceholder", ""], ["relatedPlaceholder", ""], ["accountPlaceholder", ""], ["contactPlaceholder", ""], ["opportunityPlaceholder", ""], ["leadPlaceholder", ""], [1, "activity-form-page"], [1, "form-header"], [1, "header-content"], ["type", "button", "routerLink", "/app/activities", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "related-summary", 4, "ngIf"], [1, "form-body"], [1, "form-layout", 3, "ngSubmit"], [1, "form-card"], [1, "section-title"], [1, "pi", "pi-calendar"], [1, "form-grid"], [1, "form-field"], ["for", "act-template"], ["inputId", "act-template", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "template", "placeholder", "Choose template", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["pTemplate", "item"], ["pTemplate", "value"], [1, "form-field", "full-row"], ["for", "act-subject"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "act-subject", "name", "subject", "required", "", "placeholder", "Enter activity subject", 1, "w-full", 3, "ngModelChange", "ngModel", "readonly"], ["for", "act-type"], ["inputId", "act-type", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "type", "placeholder", "Select type", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-priority"], ["inputId", "act-priority", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "priority", "placeholder", "Select priority", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-status"], ["inputId", "act-status", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "status", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "act-ownerId"], ["inputId", "act-ownerId", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "ownerId", "placeholder", "Select owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["class", "field-hint", 4, "ngIf"], ["for", "act-dueDateUtc"], [1, "due-date-content"], ["inputId", "act-dueDateUtc", "name", "dueDateUtc", "appendTo", "body", "hourFormat", "12", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "disabled", "showIcon", "showTime"], ["class", "due-date-meta", 4, "ngIf"], ["class", "form-field", 4, "ngIf"], ["for", "act-relatedEntityType"], ["inputId", "act-relatedEntityType", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "relatedEntityType", "placeholder", "Select record type", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-description"], ["pTextarea", "", "id", "act-description", "name", "description", "rows", "3", "placeholder", "Add agenda notes", 3, "ngModelChange", "ngModel"], ["for", "act-outcome"], ["pTextarea", "", "id", "act-outcome", "name", "outcome", "rows", "3", "placeholder", "Capture outcome and key takeaways", 3, "ngModelChange", "ngModel"], ["class", "form-field full-row", 4, "ngIf"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", 1, "crm-button--ghost", 3, "click"], ["type", "submit", "pButton", "", 1, "crm-button--primary", 3, "label", "disabled"], [1, "related-summary"], [1, "related-summary-label"], ["class", "related-summary-links", 4, "ngIf", "ngIfElse"], [1, "related-summary-links"], [1, "related-summary-link", 3, "routerLink"], [1, "pi", "pi-link"], [1, "related-summary-empty"], [1, "select-option"], [1, "pi", 3, "ngClass"], ["class", "select-option", 4, "ngIf", "ngIfElse"], [1, "select-placeholder"], [1, "field-hint"], [1, "due-date-meta"], ["class", "due-date-hint", 4, "ngIf"], ["pButton", "", "type", "button", "label", "Sync to SLA", "icon", "pi pi-refresh", "class", "crm-button crm-button--ghost due-date-sync", 3, "click", 4, "ngIf"], [1, "due-date-hint"], ["pButton", "", "type", "button", "label", "Sync to SLA", "icon", "pi pi-refresh", 1, "crm-button", "crm-button--ghost", "due-date-sync", 3, "click"], ["for", "act-completedDateUtc"], ["inputId", "act-completedDateUtc", "name", "completedDateUtc", "appendTo", "body", "hourFormat", "12", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon", "showTime"], ["for", "act-account"], ["inputId", "act-account", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "relatedEntityId", "placeholder", "Select account", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-contact"], ["inputId", "act-contact", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "relatedEntityId", "placeholder", "Select contact", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-opportunity"], ["inputId", "act-opportunity", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "relatedEntityId", "placeholder", "Select opportunity", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-lead"], ["inputId", "act-lead", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "relatedEntityId", "placeholder", "Select lead", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "act-nextStepSubject"], ["pInputText", "", "id", "act-nextStepSubject", "name", "nextStepSubject", "placeholder", "e.g., Follow-up call with procurement", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "act-nextStepDueDateUtc"], ["inputId", "act-nextStepDueDateUtc", "name", "nextStepDueDateUtc", "appendTo", "body", "hourFormat", "12", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon", "showTime"]], template: function ActivityFormPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 11)(1, "div", 12)(2, "div", 13);
            i0.ɵɵelement(3, "app-breadcrumbs");
            i0.ɵɵelementStart(4, "button", 14);
            i0.ɵɵelement(5, "i", 15);
            i0.ɵɵtext(6, " Back to activities ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 16)(8, "h1", 17)(9, "span", 18);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 19);
            i0.ɵɵtext(12, "Activity");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(15, ActivityFormPage_section_15_Template, 6, 2, "section", 20);
            i0.ɵɵelementStart(16, "div", 21)(17, "form", 22);
            i0.ɵɵlistener("ngSubmit", function ActivityFormPage_Template_form_ngSubmit_17_listener() { return ctx.onSave(); });
            i0.ɵɵelementStart(18, "section", 23)(19, "h3", 24);
            i0.ɵɵelement(20, "i", 25);
            i0.ɵɵtext(21, " Activity details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 26)(23, "div", 27)(24, "label", 28);
            i0.ɵɵtext(25, "Template");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p-select", 29);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_26_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedTemplate, $event) || (ctx.selectedTemplate = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_26_listener($event) { return ctx.onTemplateChange($event); });
            i0.ɵɵtemplate(27, ActivityFormPage_ng_template_27_Template, 4, 2, "ng-template", 30)(28, ActivityFormPage_ng_template_28_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 32)(30, "label", 33);
            i0.ɵɵtext(31, "Subject ");
            i0.ɵɵelementStart(32, "span", 34);
            i0.ɵɵtext(33, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "p-inputgroup")(35, "p-inputgroup-addon", 35);
            i0.ɵɵelement(36, "i", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "input", 37);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_input_ngModelChange_37_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.subject, $event) || (ctx.form.subject = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(38, "div", 27)(39, "label", 38);
            i0.ɵɵtext(40, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "p-select", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_41_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.type, $event) || (ctx.form.type = $event); return $event; });
            i0.ɵɵtemplate(42, ActivityFormPage_ng_template_42_Template, 4, 2, "ng-template", 30)(43, ActivityFormPage_ng_template_43_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 27)(45, "label", 40);
            i0.ɵɵtext(46, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "p-select", 41);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_47_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.priority, $event) || (ctx.form.priority = $event); return $event; });
            i0.ɵɵtemplate(48, ActivityFormPage_ng_template_48_Template, 4, 2, "ng-template", 30)(49, ActivityFormPage_ng_template_49_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 27)(51, "label", 42);
            i0.ɵɵtext(52, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "p-select", 43);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_53_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.activityStatus, $event) || (ctx.activityStatus = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_53_listener($event) { return ctx.onStatusChange($event); });
            i0.ɵɵtemplate(54, ActivityFormPage_ng_template_54_Template, 4, 2, "ng-template", 30)(55, ActivityFormPage_ng_template_55_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 27)(57, "label", 44);
            i0.ɵɵtext(58, "Owner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "p-select", 45);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_59_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.ownerId, $event) || (ctx.form.ownerId = $event); return $event; });
            i0.ɵɵtemplate(60, ActivityFormPage_ng_template_60_Template, 4, 2, "ng-template", 30)(61, ActivityFormPage_ng_template_61_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(62, ActivityFormPage_small_62_Template, 2, 0, "small", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 27)(64, "label", 47);
            i0.ɵɵtext(65, "Due date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "div", 48)(67, "p-datePicker", 49);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_datePicker_ngModelChange_67_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.dueDateUtc, $event) || (ctx.form.dueDateUtc = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ActivityFormPage_Template_p_datePicker_ngModelChange_67_listener($event) { return ctx.onDueDateChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(68, ActivityFormPage_div_68_Template, 4, 3, "div", 50);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(69, ActivityFormPage_div_69_Template, 4, 3, "div", 51);
            i0.ɵɵelementStart(70, "div", 27)(71, "label", 52);
            i0.ɵɵtext(72, "Related to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "p-select", 53);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_73_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.relatedEntityType, $event) || (ctx.form.relatedEntityType = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ActivityFormPage_Template_p_select_ngModelChange_73_listener($event) { return ctx.onRelationTypeChange($event); });
            i0.ɵɵtemplate(74, ActivityFormPage_ng_template_74_Template, 4, 2, "ng-template", 30)(75, ActivityFormPage_ng_template_75_Template, 3, 2, "ng-template", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(76, ActivityFormPage_div_76_Template, 6, 3, "div", 51)(77, ActivityFormPage_div_77_Template, 6, 3, "div", 51)(78, ActivityFormPage_div_78_Template, 6, 3, "div", 51)(79, ActivityFormPage_div_79_Template, 6, 3, "div", 51);
            i0.ɵɵelementStart(80, "div", 32)(81, "label", 54);
            i0.ɵɵtext(82, "Notes / Agenda");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "textarea", 55);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_textarea_ngModelChange_83_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.description, $event) || (ctx.form.description = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(84, "div", 32)(85, "label", 56);
            i0.ɵɵtext(86, "Outcome ");
            i0.ɵɵelementStart(87, "span", 34);
            i0.ɵɵtext(88, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(89, "textarea", 57);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivityFormPage_Template_textarea_ngModelChange_89_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.outcome, $event) || (ctx.form.outcome = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(90, ActivityFormPage_div_90_Template, 9, 1, "div", 58)(91, ActivityFormPage_div_91_Template, 6, 3, "div", 51);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "div", 59)(93, "button", 60);
            i0.ɵɵlistener("click", function ActivityFormPage_Template_button_click_93_listener() { return ctx.router.navigate(["/app/activities"]); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(94, "button", 61);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create New");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update the schedule and details" : "Track tasks, calls, and meetings");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("options", ctx.templateOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedTemplate);
            i0.ɵɵproperty("disabled", ctx.systemLocked());
            i0.ɵɵadvance(11);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.subject);
            i0.ɵɵproperty("readonly", ctx.systemLocked());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.typeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.type);
            i0.ɵɵproperty("disabled", ctx.systemLocked());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.priorityOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.priority);
            i0.ɵɵproperty("disabled", ctx.systemLocked());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.activityStatus);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.ownerOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.ownerId);
            i0.ɵɵproperty("disabled", ctx.systemLocked() || !ctx.canEditOwner());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.canEditOwner());
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.dueDateUtc);
            i0.ɵɵproperty("disabled", ctx.systemLocked())("showIcon", true)("showTime", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasLeadSlaDueDate());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activityStatus === "Completed");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.relationOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.relatedEntityType);
            i0.ɵɵproperty("disabled", ctx.systemLocked());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.form.relatedEntityType === "Account");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.relatedEntityType === "Contact");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.relatedEntityType === "Opportunity");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.relatedEntityType === "Lead");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.description);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.outcome);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activityStatus !== "Completed");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activityStatus !== "Completed");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("label", ctx.isEditMode() ? "Update activity" : "Create activity")("disabled", !ctx.form.subject || ctx.saving());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.NgModel, i2.NgForm, RouterLink,
            ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, SelectModule, i6.Select, TextareaModule, i7.Textarea, DatePickerModule, i8.DatePicker, InputGroupModule, i9.InputGroup, InputGroupAddonModule, i10.InputGroupAddon, BreadcrumbsComponent], styles: ["@use '../../../../shared/form-page-styles' as form;\n\n[_nghost-%COMP%] {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.activity-form-page[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  @include form.form-page-header;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  @include form.form-header-content;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  @include form.form-back-link;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  @include form.form-header-title;\n}\n\n.form-body[_ngcontent-%COMP%] {\n  @include form.form-container;\n}\n\n.form-layout[_ngcontent-%COMP%] {\n  @include form.form-layout;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup, > p-select, > p-inputnumber, > p-datepicker, > input, > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.due-date-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.due-date-meta[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n}\n\n.due-date-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: rgba(71, 85, 105, 0.9);\n  font-style: italic;\n}\n\n.due-date-sync[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.6rem;\n  min-height: 1.8rem;\n  font-size: 0.75rem;\n}\n\n.related-summary[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 1rem auto 0;\n  padding: 0.75rem 1rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  display: grid;\n  gap: 0.5rem;\n}\n\n.related-summary-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.related-summary-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-weight: 600;\n  text-decoration: none;\n  font-size: 0.85rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n}\n\n.related-summary-empty[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.85rem;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n[_nghost-%COMP%]     .p-inputtext, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext, \n[_nghost-%COMP%]     .p-dropdown, \n[_nghost-%COMP%]     .p-select, \n[_nghost-%COMP%]     .p-inputtextarea, \n[_nghost-%COMP%]     .p-datepicker input {\n  @include form.premium-input;\n}\n\n[_nghost-%COMP%]     .p-inputtext:hover, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext:hover, \n[_nghost-%COMP%]     .p-dropdown:hover, \n[_nghost-%COMP%]     .p-select:hover, \n[_nghost-%COMP%]     .p-inputtextarea:hover, \n[_nghost-%COMP%]     .p-datepicker input:hover {\n  @include form.premium-input-hover;\n}\n\n[_nghost-%COMP%]     .p-inputtext:focus, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext:focus, \n[_nghost-%COMP%]     .p-dropdown:focus-within, \n[_nghost-%COMP%]     .p-select:focus-within, \n[_nghost-%COMP%]     .p-inputtextarea:focus, \n[_nghost-%COMP%]     .p-datepicker input:focus {\n  @include form.premium-input-focus;\n}\n\n[_nghost-%COMP%]     .p-select-item, \n[_nghost-%COMP%]     .p-dropdown-item {\n  .select-option {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n    font-weight: 600;\n  }\n\n  .select-option i {\n    font-size: 0.95rem;\n    color: rgba(59, 130, 246, 0.9);\n  }\n}\n\n.select-placeholder[_ngcontent-%COMP%] {\n  color: rgba(100, 116, 139, 0.75);\n  font-weight: 500;\n}\n\n@media (max-width: 768px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityFormPage, [{
        type: Component,
        args: [{ selector: 'app-activity-form-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    TextareaModule,
                    DatePickerModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    BreadcrumbsComponent
                ], template: "\n    <section class=\"activity-form-page\">\n      <div class=\"form-header\">\n        <div class=\"header-content\">\n          <app-breadcrumbs></app-breadcrumbs>\n          <button type=\"button\" class=\"back-link\" routerLink=\"/app/activities\">\n            <i class=\"pi pi-arrow-left\"></i>\n            Back to activities\n          </button>\n          <div class=\"header-title\">\n            <h1 class=\"hero-title\">\n              <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>\n              <span class=\"title-light\">Activity</span>\n            </h1>\n            <p>{{ isEditMode() ? 'Update the schedule and details' : 'Track tasks, calls, and meetings' }}</p>\n          </div>\n        </div>\n      </div>\n\n      <section class=\"related-summary\" *ngIf=\"isEditMode()\">\n        <div class=\"related-summary-label\">Related record</div>\n        <div class=\"related-summary-links\" *ngIf=\"relatedLink() as link; else noRelatedSummary\">\n          <a class=\"related-summary-link\" [routerLink]=\"link\">\n            <i class=\"pi pi-link\"></i>\n            {{ relatedLabel() }}\n          </a>\n        </div>\n        <ng-template #noRelatedSummary>\n          <span class=\"related-summary-empty\">No related record yet.</span>\n        </ng-template>\n      </section>\n\n      <div class=\"form-body\">\n        <form class=\"form-layout\" (ngSubmit)=\"onSave()\">\n          <section class=\"form-card\">\n            <h3 class=\"section-title\">\n              <i class=\"pi pi-calendar\"></i>\n              Activity details\n            </h3>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"act-template\">Template</label>\n                <p-select\n                  inputId=\"act-template\"\n                  appendTo=\"body\"\n                  [options]=\"templateOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"template\"\n                  [(ngModel)]=\"selectedTemplate\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onTemplateChange($event)\"\n                  placeholder=\"Choose template\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else templatePlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #templatePlaceholder>\n                      <span class=\"select-placeholder\">Choose template</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"act-subject\">Subject <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-tag\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"act-subject\" name=\"subject\" [(ngModel)]=\"form.subject\" required placeholder=\"Enter activity subject\" class=\"w-full\" [readonly]=\"systemLocked()\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-type\">Type</label>\n                <p-select\n                  inputId=\"act-type\"\n                  appendTo=\"body\"\n                  [options]=\"typeOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"type\"\n                  [(ngModel)]=\"form.type\"\n                  [disabled]=\"systemLocked()\"\n                  placeholder=\"Select type\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else typePlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #typePlaceholder>\n                      <span class=\"select-placeholder\">Select type</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-priority\">Priority</label>\n                <p-select\n                  inputId=\"act-priority\"\n                  appendTo=\"body\"\n                  [options]=\"priorityOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"priority\"\n                  [(ngModel)]=\"form.priority\"\n                  [disabled]=\"systemLocked()\"\n                  placeholder=\"Select priority\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else priorityPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #priorityPlaceholder>\n                      <span class=\"select-placeholder\">Select priority</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-status\">Status</label>\n                <p-select\n                  inputId=\"act-status\"\n                  appendTo=\"body\"\n                  [options]=\"statusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"status\"\n                  [(ngModel)]=\"activityStatus\"\n                  (ngModelChange)=\"onStatusChange($event)\"\n                  placeholder=\"Select status\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else statusPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #statusPlaceholder>\n                      <span class=\"select-placeholder\">Select status</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-ownerId\">Owner</label>\n                <p-select\n                  inputId=\"act-ownerId\"\n                  appendTo=\"body\"\n                  [options]=\"ownerOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"ownerId\"\n                  [(ngModel)]=\"form.ownerId\"\n                  [disabled]=\"systemLocked() || !canEditOwner()\"\n                  placeholder=\"Select owner\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else ownerPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #ownerPlaceholder>\n                      <span class=\"select-placeholder\">Select owner</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n                <small class=\"field-hint\" *ngIf=\"!canEditOwner()\">\n                  Owner is fixed to the current logged-in user.\n                </small>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-dueDateUtc\">Due date</label>\n                <div class=\"due-date-content\">\n                <p-datePicker\n                    inputId=\"act-dueDateUtc\"\n                    name=\"dueDateUtc\"\n                    appendTo=\"body\"\n                    [(ngModel)]=\"form.dueDateUtc\"\n                    (ngModelChange)=\"onDueDateChange($event)\"\n                    [disabled]=\"systemLocked()\"\n                    [showIcon]=\"true\"\n                    [showTime]=\"true\"\n                    hourFormat=\"12\"\n                    styleClass=\"w-full\"\n                  ></p-datePicker>\n                  <div class=\"due-date-meta\" *ngIf=\"hasLeadSlaDueDate()\">\n                    <span class=\"due-date-hint\" *ngIf=\"dueDateDefaultedFromLeadSla()\">\n                      Defaulted from Lead SLA ({{ leadSlaDueLabel() }})\n                    </span>\n                    <span class=\"due-date-hint\" *ngIf=\"!dueDateDefaultedFromLeadSla()\">\n                      Lead SLA due: {{ leadSlaDueLabel() }}\n                    </span>\n                    <button\n                      *ngIf=\"canSyncDueDateToLeadSla()\"\n                      pButton\n                      type=\"button\"\n                      label=\"Sync to SLA\"\n                      icon=\"pi pi-refresh\"\n                      class=\"crm-button crm-button--ghost due-date-sync\"\n                      (click)=\"syncDueDateToLeadSla()\"\n                    ></button>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-field\" *ngIf=\"activityStatus === 'Completed'\">\n                <label for=\"act-completedDateUtc\">Completed at</label>\n                <p-datePicker\n                  inputId=\"act-completedDateUtc\"\n                  name=\"completedDateUtc\"\n                  appendTo=\"body\"\n                  [(ngModel)]=\"form.completedDateUtc\"\n                  [showIcon]=\"true\"\n                  [showTime]=\"true\"\n                  hourFormat=\"12\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"act-relatedEntityType\">Related to</label>\n                <p-select\n                  inputId=\"act-relatedEntityType\"\n                  appendTo=\"body\"\n                  [options]=\"relationOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"relatedEntityType\"\n                  [(ngModel)]=\"form.relatedEntityType\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onRelationTypeChange($event)\"\n                  placeholder=\"Select record type\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else relatedPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #relatedPlaceholder>\n                      <span class=\"select-placeholder\">Select record type</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.relatedEntityType === 'Account'\">\n                <label for=\"act-account\">Account</label>\n                <p-select\n                  inputId=\"act-account\"\n                  appendTo=\"body\"\n                  [options]=\"customerOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"relatedEntityId\"\n                  [(ngModel)]=\"form.relatedEntityId\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onRelatedEntityChange($event)\"\n                  placeholder=\"Select account\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else accountPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #accountPlaceholder>\n                      <span class=\"select-placeholder\">Select account</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.relatedEntityType === 'Contact'\">\n                <label for=\"act-contact\">Contact</label>\n                <p-select\n                  inputId=\"act-contact\"\n                  appendTo=\"body\"\n                  [options]=\"contactOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"relatedEntityId\"\n                  [(ngModel)]=\"form.relatedEntityId\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onRelatedEntityChange($event)\"\n                  placeholder=\"Select contact\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else contactPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #contactPlaceholder>\n                      <span class=\"select-placeholder\">Select contact</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.relatedEntityType === 'Opportunity'\">\n                <label for=\"act-opportunity\">Opportunity</label>\n                <p-select\n                  inputId=\"act-opportunity\"\n                  appendTo=\"body\"\n                  [options]=\"opportunityOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"relatedEntityId\"\n                  [(ngModel)]=\"form.relatedEntityId\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onRelatedEntityChange($event)\"\n                  placeholder=\"Select opportunity\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else opportunityPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #opportunityPlaceholder>\n                      <span class=\"select-placeholder\">Select opportunity</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.relatedEntityType === 'Lead'\">\n                <label for=\"act-lead\">Lead</label>\n                <p-select\n                  inputId=\"act-lead\"\n                  appendTo=\"body\"\n                  [options]=\"leadOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"relatedEntityId\"\n                  [(ngModel)]=\"form.relatedEntityId\"\n                  [disabled]=\"systemLocked()\"\n                  (ngModelChange)=\"onRelatedEntityChange($event)\"\n                  placeholder=\"Select lead\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"value\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option; else leadPlaceholder\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <ng-template #leadPlaceholder>\n                      <span class=\"select-placeholder\">Select lead</span>\n                    </ng-template>\n                  </ng-template>\n                </p-select>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"act-description\">Notes / Agenda</label>\n                <textarea pTextarea id=\"act-description\" name=\"description\" [(ngModel)]=\"form.description\" rows=\"3\" placeholder=\"Add agenda notes\"></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"act-outcome\">Outcome <span class=\"required\">*</span></label>\n                <textarea pTextarea id=\"act-outcome\" name=\"outcome\" [(ngModel)]=\"form.outcome\" rows=\"3\" placeholder=\"Capture outcome and key takeaways\"></textarea>\n              </div>\n              <div class=\"form-field full-row\" *ngIf=\"activityStatus !== 'Completed'\">\n                <label for=\"act-nextStepSubject\">Next step subject <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-tag\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"act-nextStepSubject\"\n                    name=\"nextStepSubject\"\n                    [(ngModel)]=\"form.nextStepSubject\"\n                    placeholder=\"e.g., Follow-up call with procurement\"\n                    class=\"w-full\"\n                  />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\" *ngIf=\"activityStatus !== 'Completed'\">\n                <label for=\"act-nextStepDueDateUtc\">Next step due date <span class=\"required\">*</span></label>\n                <p-datePicker\n                  inputId=\"act-nextStepDueDateUtc\"\n                  name=\"nextStepDueDateUtc\"\n                  appendTo=\"body\"\n                  [(ngModel)]=\"form.nextStepDueDateUtc\"\n                  [showIcon]=\"true\"\n                  [showTime]=\"true\"\n                  hourFormat=\"12\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n              </div>\n            </div>\n          </section>\n\n          <div class=\"form-actions\">\n            <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button--ghost\" (click)=\"router.navigate(['/app/activities'])\"></button>\n            <button\n              type=\"submit\"\n              pButton\n              [label]=\"isEditMode() ? 'Update activity' : 'Create activity'\"\n              class=\"crm-button--primary\"\n              [disabled]=\"!form.subject || saving()\"\n            ></button>\n          </div>\n        </form>\n      </div>\n    </section>\n  \n", styles: ["@use '../../../../shared/form-page-styles' as form;\n\n:host {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.activity-form-page {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header {\n  @include form.form-page-header;\n}\n\n.header-content {\n  @include form.form-header-content;\n}\n\n.back-link {\n  @include form.form-back-link;\n}\n\n.header-title {\n  @include form.form-header-title;\n}\n\n.form-body {\n  @include form.form-container;\n}\n\n.form-layout {\n  @include form.form-layout;\n}\n\n.form-card {\n  @include form.form-section;\n}\n\n.section-title {\n  @include form.section-title;\n}\n\n.form-grid {\n  @include form.form-grid;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup, > p-select, > p-inputnumber, > p-datepicker, > input, > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.due-date-content {\n  flex: 1;\n  min-width: 0;\n}\n\n.due-date-meta {\n  margin-top: 0.4rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n}\n\n.due-date-hint {\n  font-size: 0.78rem;\n  color: rgba(71, 85, 105, 0.9);\n  font-style: italic;\n}\n\n.due-date-sync {\n  padding: 0.2rem 0.6rem;\n  min-height: 1.8rem;\n  font-size: 0.75rem;\n}\n\n.related-summary {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 1rem auto 0;\n  padding: 0.75rem 1rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  display: grid;\n  gap: 0.5rem;\n}\n\n.related-summary-label {\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.related-summary-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.related-summary-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-weight: 600;\n  text-decoration: none;\n  font-size: 0.85rem;\n}\n\n.related-summary-link i {\n  font-size: 0.9rem;\n}\n\n.related-summary-link:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n}\n\n.related-summary-empty {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.85rem;\n}\n\n.form-actions {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n:host ::ng-deep .p-inputtext,\n:host ::ng-deep .p-inputnumber .p-inputtext,\n:host ::ng-deep .p-dropdown,\n:host ::ng-deep .p-select,\n:host ::ng-deep .p-inputtextarea,\n:host ::ng-deep .p-datepicker input {\n  @include form.premium-input;\n}\n\n:host ::ng-deep .p-inputtext:hover,\n:host ::ng-deep .p-inputnumber .p-inputtext:hover,\n:host ::ng-deep .p-dropdown:hover,\n:host ::ng-deep .p-select:hover,\n:host ::ng-deep .p-inputtextarea:hover,\n:host ::ng-deep .p-datepicker input:hover {\n  @include form.premium-input-hover;\n}\n\n:host ::ng-deep .p-inputtext:focus,\n:host ::ng-deep .p-inputnumber .p-inputtext:focus,\n:host ::ng-deep .p-dropdown:focus-within,\n:host ::ng-deep .p-select:focus-within,\n:host ::ng-deep .p-inputtextarea:focus,\n:host ::ng-deep .p-datepicker input:focus {\n  @include form.premium-input-focus;\n}\n\n:host ::ng-deep .p-select-item,\n:host ::ng-deep .p-dropdown-item {\n  .select-option {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n    font-weight: 600;\n  }\n\n  .select-option i {\n    font-size: 0.95rem;\n    color: rgba(59, 130, 246, 0.9);\n  }\n}\n\n.select-placeholder {\n  color: rgba(100, 116, 139, 0.75);\n  font-weight: 500;\n}\n\n@media (max-width: 768px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ActivityFormPage, { className: "ActivityFormPage", filePath: "src/app/crm/features/activities/pages/activity-form.page.ts", lineNumber: 63 }); })();
