import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/activity-data.service";
import * as i2 from "../../customers/services/customer-data.service";
import * as i3 from "../../contacts/services/contact-data.service";
import * as i4 from "@angular/router";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/button";
import * as i7 from "primeng/api";
import * as i8 from "primeng/inputtext";
import * as i9 from "primeng/select";
import * as i10 from "primeng/table";
import * as i11 from "primeng/paginator";
const _c0 = a0 => ["/app/leads", a0, "edit"];
const _c1 = a0 => ["/app/deals", a0, "edit"];
const _c2 = () => [1, 2, 3, 4, 5];
function ActivitiesPage_span_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1, "!");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_span_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1, "!");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_span_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r0.completionRate(), "%");
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 Last activity ", i0.ɵɵpipeBind2(2, 1, ctx_r0.asLocalDate(group_r3.lastActivityAt), "MMM d, h:mm a"));
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 99);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Overdue ", group_r3.overdueCount);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_button_20_Template_button_click_0_listener() { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(7); return i0.ɵɵresetView(ctx_r0.canManage() ? ctx_r0.onEdit(row_r5) : null); });
    i0.ɵɵelementStart(1, "div", 101)(2, "span", 102);
    i0.ɵɵelement(3, "i", 103);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 104);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 105)(8, "span", 106);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 107);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(7);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", row_r5.type);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-phone", row_r5.type === "Call")("pi-envelope", row_r5.type === "Email")("pi-users", row_r5.type === "Meeting")("pi-check-square", row_r5.type === "Task");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r5.type, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r5.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("upcoming", row_r5.status === "Upcoming")("completed", row_r5.status === "Completed")("overdue", row_r5.status === "Overdue");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r5.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 19, ctx_r0.asLocalDate(row_r5.completedDateUtc || row_r5.dueDateUtc || row_r5.createdAtUtc), "MMM d, h:mm a"));
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85)(2, "div", 86)(3, "div", 87)(4, "span", 88);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 89);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_Template_a_click_6_listener($event) { i0.ɵɵrestoreView(_r2); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(7, "i", 90);
    i0.ɵɵtext(8, " Open Lead ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 91)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_span_12_Template, 3, 4, "span", 92);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 93)(14, "span", 94);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 95);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_span_18_Template, 2, 1, "span", 96);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 97);
    i0.ɵɵtemplate(20, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_button_20_Template, 13, 22, "button", 98);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(group_r3.leadName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c0, group_r3.leadId));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", group_r3.items.length, " activit", group_r3.items.length === 1 ? "y" : "ies");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r3.lastActivityAt);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Open ", group_r3.openCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Done ", group_r3.completedCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r3.overdueCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r3.items);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 79)(2, "div", 80)(3, "span", 81);
    i0.ɵɵtext(4, "Grouped by Lead");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 82);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_div_7_Template, 21, 11, "div", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r0.groupedLeadActivityCount(), " lead", ctx_r0.groupedLeadActivityCount() === 1 ? "" : "s");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.leadGroupedActivities());
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_ng_container_1_Template, 8, 3, "ng-container", 78);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const emptyState_r6 = i0.ɵɵreference(6);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.leadGroupedActivities().length)("ngIfElse", emptyState_r6);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 Last activity ", i0.ɵɵpipeBind2(2, 1, ctx_r0.asLocalDate(group_r8.lastActivityAt), "MMM d, h:mm a"));
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 99);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Overdue ", group_r8.overdueCount);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_button_20_Template_button_click_0_listener() { const row_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r0 = i0.ɵɵnextContext(7); return i0.ɵɵresetView(ctx_r0.canManage() ? ctx_r0.onEdit(row_r10) : null); });
    i0.ɵɵelementStart(1, "div", 101)(2, "span", 102);
    i0.ɵɵelement(3, "i", 103);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 104);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 105)(8, "span", 106);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 107);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(7);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", row_r10.type);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-phone", row_r10.type === "Call")("pi-envelope", row_r10.type === "Email")("pi-users", row_r10.type === "Meeting")("pi-check-square", row_r10.type === "Task");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r10.type, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r10.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("upcoming", row_r10.status === "Upcoming")("completed", row_r10.status === "Completed")("overdue", row_r10.status === "Overdue");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r10.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 19, ctx_r0.asLocalDate(row_r10.completedDateUtc || row_r10.dueDateUtc || row_r10.createdAtUtc), "MMM d, h:mm a"));
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85)(2, "div", 86)(3, "div", 87)(4, "span", 88);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 89);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_Template_a_click_6_listener($event) { i0.ɵɵrestoreView(_r7); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(7, "i", 90);
    i0.ɵɵtext(8, " Open Opportunity ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 91)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_span_12_Template, 3, 4, "span", 92);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 93)(14, "span", 94);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 95);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_span_18_Template, 2, 1, "span", 96);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 97);
    i0.ɵɵtemplate(20, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_button_20_Template, 13, 22, "button", 98);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r8 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(group_r8.opportunityName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c1, group_r8.opportunityId));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", group_r8.items.length, " activit", group_r8.items.length === 1 ? "y" : "ies");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r8.lastActivityAt);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Open ", group_r8.openCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Done ", group_r8.completedCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r8.overdueCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r8.items);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 79)(2, "div", 80)(3, "span", 81);
    i0.ɵɵtext(4, "Grouped by Opportunity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 82);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_div_7_Template, 21, 11, "div", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r0.groupedOpportunityActivityCount(), " opportunit", ctx_r0.groupedOpportunityActivityCount() === 1 ? "y" : "ies");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.opportunityGroupedActivities());
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_ng_container_0_Template, 8, 3, "ng-container", 78);
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const emptyState_r6 = i0.ɵɵreference(6);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r0.opportunityGroupedActivities().length)("ngIfElse", emptyState_r6);
} }
function ActivitiesPage_section_109_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_container_1_Template, 2, 2, "ng-container", 78)(2, ActivitiesPage_section_109_ng_container_2_ng_container_1_ng_template_2_Template, 1, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const opportunityGroupedView_r11 = i0.ɵɵreference(3);
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.groupBy === "lead")("ngIfElse", opportunityGroupedView_r11);
} }
function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Related To");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Due Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 115);
    i0.ɵɵtext(16, "Actions");
    i0.ɵɵelementEnd()();
} }
function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_a_14_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 132);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_a_14_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r15); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(1, "i", 90);
    i0.ɵɵtext(2, " View ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r16 = ctx.ngIf;
    i0.ɵɵproperty("routerLink", link_r16);
} }
function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 116);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template_tr_click_0_listener() { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.canManage() ? ctx_r0.onEdit(row_r14) : null); });
    i0.ɵɵelementStart(1, "td")(2, "span", 117);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "span", 102);
    i0.ɵɵelement(6, "i", 103);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "div", 118)(10, "span", 119);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 120);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_a_14_Template, 3, 1, "a", 121);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td")(16, "span", 122);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "td")(19, "span", 123);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td")(23, "span", 106);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "td")(26, "span", 124);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "td", 115)(29, "div", 125)(30, "button", 126);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template_button_click_30_listener($event) { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r0.markCompleted(row_r14)); });
    i0.ɵɵelement(31, "i", 127);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 128);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template_button_click_32_listener($event) { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r0.onEdit(row_r14)); });
    i0.ɵɵelement(33, "i", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 130);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template_button_click_34_listener($event) { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r0.onDelete(row_r14)); });
    i0.ɵɵelement(35, "i", 131);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r14.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", row_r14.type);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-phone", row_r14.type === "Call")("pi-envelope", row_r14.type === "Email")("pi-users", row_r14.type === "Meeting")("pi-check-square", row_r14.type === "Task");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r14.type, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.relationLabel(row_r14.relatedEntityType));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r14.relatedEntityName || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.relatedLink(row_r14));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("high", row_r14.priority === "High")("normal", row_r14.priority === "Normal" || !row_r14.priority)("low", row_r14.priority === "Low");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r14.priority || "Normal", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(21, 33, ctx_r0.asLocalDate(row_r14.dueDateUtc), "MMM d, h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("upcoming", row_r14.status === "Upcoming")("completed", row_r14.status === "Completed")("overdue", row_r14.status === "Overdue");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r14.status, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r14.ownerName || "Unassigned");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r0.canMarkComplete(row_r14));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
} }
function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 108)(2, "p-table", 109);
    i0.ɵɵtemplate(3, ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_3_Template, 17, 0, "ng-template", 110)(4, ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_ng_template_4_Template, 36, 36, "ng-template", 111);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 112)(6, "span", 113);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p-paginator", 114);
    i0.ɵɵlistener("onPageChange", function ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_Template_p_paginator_onPageChange_8_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.filteredActivities());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate3(" Showing ", ctx_r0.pageIndex * ctx_r0.rows + 1, "\u2013", ctx_r0.Math.min((ctx_r0.pageIndex + 1) * ctx_r0.rows, ctx_r0.total()), " of ", ctx_r0.total(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("rows", ctx_r0.rows)("totalRecords", ctx_r0.total())("first", ctx_r0.pageIndex * ctx_r0.rows)("showFirstLastIcon", false)("showPageLinks", true)("pageLinkSize", 5);
} }
function ActivitiesPage_section_109_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ActivitiesPage_section_109_ng_container_2_ng_template_2_ng_container_0_Template, 9, 10, "ng-container", 78);
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const emptyState_r6 = i0.ɵɵreference(6);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r0.filteredActivities().length)("ngIfElse", emptyState_r6);
} }
function ActivitiesPage_section_109_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ActivitiesPage_section_109_ng_container_2_ng_container_1_Template, 4, 2, "ng-container", 78)(2, ActivitiesPage_section_109_ng_container_2_ng_template_2_Template, 1, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const flatTableView_r17 = i0.ɵɵreference(3);
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.groupBy !== "none")("ngIfElse", flatTableView_r17);
} }
function ActivitiesPage_section_109_ng_template_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 135);
    i0.ɵɵelement(1, "div", 136);
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_109_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 133);
    i0.ɵɵtemplate(1, ActivitiesPage_section_109_ng_template_3_div_1_Template, 2, 0, "div", 134);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function ActivitiesPage_section_109_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 137)(1, "div", 138);
    i0.ɵɵelement(2, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 139);
    i0.ɵɵtext(4, "No activities found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 140);
    i0.ɵɵtext(6, "Create your first activity to start tracking calls, emails, and meetings.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 141);
    i0.ɵɵlistener("click", function ActivitiesPage_section_109_ng_template_5_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r18); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onCreate()); });
    i0.ɵɵelement(8, "i", 32);
    i0.ɵɵtext(9, " New Activity ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
} }
function ActivitiesPage_section_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 76)(1, "div", 77);
    i0.ɵɵtemplate(2, ActivitiesPage_section_109_ng_container_2_Template, 4, 2, "ng-container", 78)(3, ActivitiesPage_section_109_ng_template_3_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(5, ActivitiesPage_section_109_ng_template_5_Template, 10, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const loadingState_r19 = i0.ɵɵreference(4);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r0.loading())("ngIfElse", loadingState_r19);
} }
function ActivitiesPage_section_110_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r21 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(day_r21);
} }
function ActivitiesPage_section_110_button_19_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 164);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(day_r23.items.length);
} }
function ActivitiesPage_section_110_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 161);
    i0.ɵɵlistener("click", function ActivitiesPage_section_110_button_19_Template_button_click_0_listener() { const day_r23 = i0.ɵɵrestoreView(_r22).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectDate(day_r23.date)); });
    i0.ɵɵelementStart(1, "span", 162);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ActivitiesPage_section_110_button_19_span_3_Template, 2, 1, "span", 163);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r23 = ctx.$implicit;
    i0.ɵɵclassProp("is-outside", !day_r23.isCurrentMonth)("is-today", day_r23.isToday)("is-selected", day_r23.isSelected);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(day_r23.date.getDate());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", day_r23.items.length);
} }
function ActivitiesPage_section_110_div_27_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 167)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 168);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r24 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r24.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r24.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r24.type);
} }
function ActivitiesPage_section_110_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 165);
    i0.ɵɵtemplate(1, ActivitiesPage_section_110_div_27_div_1_Template, 8, 3, "div", 166);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.selectedDayTasks());
} }
function ActivitiesPage_section_110_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "No tasks scheduled for this day.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_110_div_36_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 167)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 168);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r25 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r25.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r25.dueDateUtc ? i0.ɵɵpipeBind2(6, 3, ctx_r0.asLocalDate(task_r25.dueDateUtc), "MMM d, h:mm a") : "No due date");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r25.type);
} }
function ActivitiesPage_section_110_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 165);
    i0.ɵɵtemplate(1, ActivitiesPage_section_110_div_36_div_1_Template, 9, 6, "div", 166);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.openTasksPreview());
} }
function ActivitiesPage_section_110_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "All caught up.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_110_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 142)(1, "div", 143)(2, "header", 144)(3, "div")(4, "p", 145);
    i0.ɵɵtext(5, "Schedule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 146);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 147)(11, "button", 148);
    i0.ɵɵlistener("click", function ActivitiesPage_section_110_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.previousMonth()); });
    i0.ɵɵelement(12, "i", 149);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 150);
    i0.ɵɵlistener("click", function ActivitiesPage_section_110_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToToday()); });
    i0.ɵɵelement(14, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 151);
    i0.ɵɵlistener("click", function ActivitiesPage_section_110_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.nextMonth()); });
    i0.ɵɵelement(16, "i", 152);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 153);
    i0.ɵɵtemplate(18, ActivitiesPage_section_110_div_18_Template, 2, 1, "div", 154)(19, ActivitiesPage_section_110_button_19_Template, 4, 8, "button", 155);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "aside", 156)(21, "div", 157)(22, "header")(23, "h3");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 158);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(27, ActivitiesPage_section_110_div_27_Template, 2, 1, "div", 159)(28, ActivitiesPage_section_110_ng_template_28_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 157)(31, "header")(32, "h3");
    i0.ɵɵtext(33, "Open tasks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 158);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(36, ActivitiesPage_section_110_div_36_Template, 2, 1, "div", 159)(37, ActivitiesPage_section_110_ng_template_37_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const noTasks_r26 = i0.ɵɵreference(29);
    const noOpenTasks_r27 = i0.ɵɵreference(38);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r0.calendarMonthLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedDateLabel());
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngForOf", ctx_r0.weekdayLabels);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.calendarDays());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Tasks for ", ctx_r0.selectedDateLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedDayTasks().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedDayTasks().length)("ngIfElse", noTasks_r26);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r0.openTasks().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.openTasksPreview().length)("ngIfElse", noOpenTasks_r27);
} }
function ActivitiesPage_section_111_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 176);
    i0.ɵɵlistener("click", function ActivitiesPage_section_111_button_19_Template_button_click_0_listener() { const task_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onEdit(task_r30)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 177);
    i0.ɵɵtext(8, "Today");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r30 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r30.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r30.dueDateUtc ? i0.ɵɵpipeBind2(6, 3, ctx_r0.asLocalDate(task_r30.dueDateUtc), "MMM d, h:mm a") : "No due date");
} }
function ActivitiesPage_section_111_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "No tasks due today.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_111_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 176);
    i0.ɵɵlistener("click", function ActivitiesPage_section_111_button_27_Template_button_click_0_listener() { const task_r32 = i0.ɵɵrestoreView(_r31).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onEdit(task_r32)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 178);
    i0.ɵɵtext(8, "Overdue");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r32 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r32.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r32.dueDateUtc ? i0.ɵɵpipeBind2(6, 3, ctx_r0.asLocalDate(task_r32.dueDateUtc), "MMM d, h:mm a") : "No due date");
} }
function ActivitiesPage_section_111_p_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "Nothing overdue.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_111_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 176);
    i0.ɵɵlistener("click", function ActivitiesPage_section_111_button_35_Template_button_click_0_listener() { const task_r34 = i0.ɵɵrestoreView(_r33).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onEdit(task_r34)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 179);
    i0.ɵɵtext(8, "Upcoming");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r34 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r34.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r34.dueDateUtc ? i0.ɵɵpipeBind2(6, 3, ctx_r0.asLocalDate(task_r34.dueDateUtc), "MMM d, h:mm a") : "No due date");
} }
function ActivitiesPage_section_111_p_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "No upcoming tasks.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_111_button_43_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 176);
    i0.ɵɵlistener("click", function ActivitiesPage_section_111_button_43_Template_button_click_0_listener() { const task_r36 = i0.ɵɵrestoreView(_r35).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.onEdit(task_r36)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 180);
    i0.ɵɵtext(8, "Done");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r36 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(task_r36.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r36.completedDateUtc ? i0.ɵɵpipeBind2(6, 3, ctx_r0.asLocalDate(task_r36.completedDateUtc), "MMM d, h:mm a") : "Completed");
} }
function ActivitiesPage_section_111_p_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 140);
    i0.ɵɵtext(1, "No completed tasks.");
    i0.ɵɵelementEnd();
} }
function ActivitiesPage_section_111_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 169)(1, "div", 170)(2, "div")(3, "p", 145);
    i0.ɵɵtext(4, "Tasks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h2");
    i0.ɵɵtext(6, "Execution queue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 146);
    i0.ɵɵtext(8, "Focused list of open and completed tasks.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 141);
    i0.ɵɵlistener("click", function ActivitiesPage_section_111_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r28); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onCreate()); });
    i0.ɵɵelement(10, "i", 32);
    i0.ɵɵtext(11, " Add Task ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 171)(13, "article", 172)(14, "header")(15, "span");
    i0.ɵɵtext(16, "Due today");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, ActivitiesPage_section_111_button_19_Template, 9, 6, "button", 173)(20, ActivitiesPage_section_111_p_20_Template, 2, 0, "p", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "article", 172)(22, "header")(23, "span");
    i0.ɵɵtext(24, "Overdue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(27, ActivitiesPage_section_111_button_27_Template, 9, 6, "button", 173)(28, ActivitiesPage_section_111_p_28_Template, 2, 0, "p", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "article", 172)(30, "header")(31, "span");
    i0.ɵɵtext(32, "Upcoming");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(35, ActivitiesPage_section_111_button_35_Template, 9, 6, "button", 173)(36, ActivitiesPage_section_111_p_36_Template, 2, 0, "p", 174);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "article", 175)(38, "header")(39, "span");
    i0.ɵɵtext(40, "Completed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "strong");
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(43, ActivitiesPage_section_111_button_43_Template, 9, 6, "button", 173)(44, ActivitiesPage_section_111_p_44_Template, 2, 0, "p", 174);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", !ctx_r0.canManage());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.tasksToday().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.tasksToday());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.tasksToday().length);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.tasksOverdue().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.tasksOverdue());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.tasksOverdue().length);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.tasksUpcoming().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.tasksUpcoming());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.tasksUpcoming().length);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.tasksCompleted().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.tasksCompleted());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.tasksCompleted().length);
} }
export class ActivitiesPage {
    activityData;
    customerData;
    contactData;
    router;
    Math = Math;
    weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    currentView = signal('table', ...(ngDevMode ? [{ debugName: "currentView" }] : []));
    statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Overdue', value: 'Overdue' }
    ];
    groupByOptions = [
        { label: 'No grouping', value: 'none' },
        { label: 'Lead', value: 'lead' },
        { label: 'Opportunity', value: 'opportunity' }
    ];
    activities = signal([], ...(ngDevMode ? [{ debugName: "activities" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    customers = signal([], ...(ngDevMode ? [{ debugName: "customers" }] : []));
    contacts = signal([], ...(ngDevMode ? [{ debugName: "contacts" }] : []));
    myOwnerId = signal(null, ...(ngDevMode ? [{ debugName: "myOwnerId" }] : []));
    myView = signal(false, ...(ngDevMode ? [{ debugName: "myView" }] : []));
    overdueOnly = signal(false, ...(ngDevMode ? [{ debugName: "overdueOnly" }] : []));
    toastService = inject(AppToastService);
    ownerOptions = computed(() => {
        const owners = new Map();
        for (const activity of this.activities()) {
            if (!activity.ownerId || !activity.ownerName)
                continue;
            owners.set(activity.ownerId, activity.ownerName);
        }
        return [
            { label: 'All owners', value: 'all' },
            ...Array.from(owners.entries())
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map(([id, name]) => ({ label: name, value: id }))
        ];
    }, ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    activeOwnerFilter = 'all';
    groupBy = 'none';
    searchQuery = '';
    typeFilter = 'all';
    isDueTodayActive = false;
    statusFilter = 'all';
    pageIndex = 0;
    rows = 10;
    todayKey = this.toDateKey(new Date());
    openActivitiesCount = computed(() => this.activities().filter((activity) => activity.status !== 'Completed').length, ...(ngDevMode ? [{ debugName: "openActivitiesCount" }] : []));
    dueTodayCount = computed(() => {
        if (!this.todayKey) {
            return 0;
        }
        return this.activities().filter((activity) => {
            if (activity.status === 'Completed') {
                return false;
            }
            return this.toDateKey(activity.dueDateUtc) === this.todayKey;
        }).length;
    }, ...(ngDevMode ? [{ debugName: "dueTodayCount" }] : []));
    overdueCount = computed(() => this.activities().filter((activity) => activity.status === 'Overdue').length, ...(ngDevMode ? [{ debugName: "overdueCount" }] : []));
    completedCount = computed(() => this.activities().filter((activity) => activity.status === 'Completed').length, ...(ngDevMode ? [{ debugName: "completedCount" }] : []));
    completionRate = computed(() => {
        const total = this.activities().length;
        if (total === 0)
            return 0;
        return Math.round((this.completedCount() / total) * 100);
    }, ...(ngDevMode ? [{ debugName: "completionRate" }] : []));
    calendarMonth = signal(new Date(), ...(ngDevMode ? [{ debugName: "calendarMonth" }] : []));
    selectedDate = signal(new Date(), ...(ngDevMode ? [{ debugName: "selectedDate" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.activitiesManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    calendarDays = computed(() => {
        const month = this.calendarMonth();
        const start = new Date(month.getFullYear(), month.getMonth(), 1);
        const startDay = start.getDay();
        const gridStart = new Date(start);
        gridStart.setDate(start.getDate() - startDay);
        const itemsByDate = new Map();
        for (const activity of this.activities()) {
            const key = this.toDateKey(activity.dueDateUtc);
            if (!key)
                continue;
            const list = itemsByDate.get(key) ?? [];
            list.push(activity);
            itemsByDate.set(key, list);
        }
        const todayKey = this.toDateKey(new Date());
        const selectedKey = this.toDateKey(this.selectedDate());
        const days = [];
        for (let i = 0; i < 42; i++) {
            const date = new Date(gridStart);
            date.setDate(gridStart.getDate() + i);
            const key = this.toDateKey(date);
            days.push({
                date,
                isCurrentMonth: date.getMonth() === month.getMonth(),
                isToday: key === todayKey,
                isSelected: key === selectedKey,
                items: key ? itemsByDate.get(key) ?? [] : []
            });
        }
        return days;
    }, ...(ngDevMode ? [{ debugName: "calendarDays" }] : []));
    selectedDayActivities = computed(() => {
        const key = this.toDateKey(this.selectedDate());
        if (!key)
            return [];
        return this.activities().filter((activity) => this.toDateKey(activity.dueDateUtc) === key);
    }, ...(ngDevMode ? [{ debugName: "selectedDayActivities" }] : []));
    selectedDayTasks = computed(() => this.selectedDayActivities().filter((activity) => activity.type === 'Task'), ...(ngDevMode ? [{ debugName: "selectedDayTasks" }] : []));
    openTasks = computed(() => this.activities().filter((activity) => activity.type === 'Task' && activity.status !== 'Completed'), ...(ngDevMode ? [{ debugName: "openTasks" }] : []));
    openTasksPreview = computed(() => this.openTasks().slice(0, 6), ...(ngDevMode ? [{ debugName: "openTasksPreview" }] : []));
    taskItems = computed(() => this.filteredActivities().filter((activity) => activity.type === 'Task'), ...(ngDevMode ? [{ debugName: "taskItems" }] : []));
    tasksOverdue = computed(() => this.taskItems().filter((activity) => activity.status === 'Overdue'), ...(ngDevMode ? [{ debugName: "tasksOverdue" }] : []));
    tasksUpcoming = computed(() => this.taskItems().filter((activity) => activity.status === 'Upcoming'), ...(ngDevMode ? [{ debugName: "tasksUpcoming" }] : []));
    tasksCompleted = computed(() => this.taskItems().filter((activity) => activity.status === 'Completed'), ...(ngDevMode ? [{ debugName: "tasksCompleted" }] : []));
    tasksToday = computed(() => this.taskItems().filter((activity) => {
        if (activity.status === 'Completed') {
            return false;
        }
        return this.toDateKey(activity.dueDateUtc) === this.todayKey;
    }), ...(ngDevMode ? [{ debugName: "tasksToday" }] : []));
    leadGroupedActivities = computed(() => {
        const groups = new Map();
        for (const activity of this.filteredActivities()) {
            if (activity.relatedEntityType !== 'Lead' || !activity.relatedEntityId) {
                continue;
            }
            const key = activity.relatedEntityId;
            const existing = groups.get(key);
            if (!existing) {
                groups.set(key, {
                    key,
                    leadId: activity.relatedEntityId,
                    leadName: activity.relatedEntityName || 'Lead',
                    items: [activity],
                    openCount: activity.status !== 'Completed' ? 1 : 0,
                    completedCount: activity.status === 'Completed' ? 1 : 0,
                    overdueCount: activity.status === 'Overdue' ? 1 : 0,
                    lastActivityAt: activity.completedDateUtc ?? activity.dueDateUtc ?? activity.createdAtUtc
                });
                continue;
            }
            existing.items.push(activity);
            if (activity.status !== 'Completed')
                existing.openCount += 1;
            if (activity.status === 'Completed')
                existing.completedCount += 1;
            if (activity.status === 'Overdue')
                existing.overdueCount += 1;
            const candidate = activity.completedDateUtc ?? activity.dueDateUtc ?? activity.createdAtUtc;
            if (!candidate)
                continue;
            if (!existing.lastActivityAt) {
                existing.lastActivityAt = candidate;
                continue;
            }
            const a = this.asLocalDate(candidate)?.getTime() ?? 0;
            const b = this.asLocalDate(existing.lastActivityAt)?.getTime() ?? 0;
            if (a > b) {
                existing.lastActivityAt = candidate;
            }
        }
        return Array.from(groups.values())
            .map((group) => ({
            ...group,
            items: [...group.items].sort((a, b) => {
                const aTime = this.asLocalDate(a.completedDateUtc ?? a.dueDateUtc ?? a.createdAtUtc)?.getTime() ?? 0;
                const bTime = this.asLocalDate(b.completedDateUtc ?? b.dueDateUtc ?? b.createdAtUtc)?.getTime() ?? 0;
                return bTime - aTime;
            })
        }))
            .sort((a, b) => {
            const aTime = this.asLocalDate(a.lastActivityAt)?.getTime() ?? 0;
            const bTime = this.asLocalDate(b.lastActivityAt)?.getTime() ?? 0;
            return bTime - aTime;
        });
    }, ...(ngDevMode ? [{ debugName: "leadGroupedActivities" }] : []));
    opportunityGroupedActivities = computed(() => {
        const groups = new Map();
        for (const activity of this.filteredActivities()) {
            if (activity.relatedEntityType !== 'Opportunity' || !activity.relatedEntityId) {
                continue;
            }
            const key = activity.relatedEntityId;
            const existing = groups.get(key);
            if (!existing) {
                groups.set(key, {
                    key,
                    opportunityId: activity.relatedEntityId,
                    opportunityName: activity.relatedEntityName || 'Opportunity',
                    items: [activity],
                    openCount: activity.status !== 'Completed' ? 1 : 0,
                    completedCount: activity.status === 'Completed' ? 1 : 0,
                    overdueCount: activity.status === 'Overdue' ? 1 : 0,
                    lastActivityAt: activity.completedDateUtc ?? activity.dueDateUtc ?? activity.createdAtUtc
                });
                continue;
            }
            existing.items.push(activity);
            if (activity.status !== 'Completed')
                existing.openCount += 1;
            if (activity.status === 'Completed')
                existing.completedCount += 1;
            if (activity.status === 'Overdue')
                existing.overdueCount += 1;
            const candidate = activity.completedDateUtc ?? activity.dueDateUtc ?? activity.createdAtUtc;
            if (!candidate)
                continue;
            if (!existing.lastActivityAt) {
                existing.lastActivityAt = candidate;
                continue;
            }
            const a = this.asLocalDate(candidate)?.getTime() ?? 0;
            const b = this.asLocalDate(existing.lastActivityAt)?.getTime() ?? 0;
            if (a > b) {
                existing.lastActivityAt = candidate;
            }
        }
        return Array.from(groups.values())
            .map((group) => ({
            ...group,
            items: [...group.items].sort((a, b) => {
                const aTime = this.asLocalDate(a.completedDateUtc ?? a.dueDateUtc ?? a.createdAtUtc)?.getTime() ?? 0;
                const bTime = this.asLocalDate(b.completedDateUtc ?? b.dueDateUtc ?? b.createdAtUtc)?.getTime() ?? 0;
                return bTime - aTime;
            })
        }))
            .sort((a, b) => {
            const aTime = this.asLocalDate(a.lastActivityAt)?.getTime() ?? 0;
            const bTime = this.asLocalDate(b.lastActivityAt)?.getTime() ?? 0;
            return bTime - aTime;
        });
    }, ...(ngDevMode ? [{ debugName: "opportunityGroupedActivities" }] : []));
    relatedLink(activity) {
        if (!activity.relatedEntityId || !activity.relatedEntityType) {
            return null;
        }
        switch (activity.relatedEntityType) {
            case 'Lead':
                return `/app/leads/${activity.relatedEntityId}/edit`;
            case 'Account':
                return `/app/customers/${activity.relatedEntityId}/edit`;
            case 'Contact':
                return `/app/contacts/${activity.relatedEntityId}/edit`;
            case 'Opportunity':
                return `/app/deals/${activity.relatedEntityId}/edit`;
            default:
                return null;
        }
    }
    constructor(activityData, customerData, contactData, router) {
        this.activityData = activityData;
        this.customerData = customerData;
        this.contactData = contactData;
        this.router = router;
        this.myOwnerId.set(readUserId());
        const toast = history.state?.toast;
        if (toast) {
            this.toastService.show(toast.tone, toast.message, 3000);
        }
        this.currentView.set(this.viewFromUrl(this.router.url));
        this.load();
        this.loadLookups();
    }
    load() {
        this.loading.set(true);
        const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
        // Calendar view is personal-only to avoid leaking other owners' schedules.
        const ownerId = this.currentView() === 'calendar'
            ? this.myOwnerId() ?? undefined
            : this.myView()
                ? this.myOwnerId() ?? undefined
                : this.activeOwnerFilter !== 'all'
                    ? this.activeOwnerFilter
                    : undefined;
        const type = this.typeFilter === 'all' ? undefined : this.typeFilter;
        this.activityData
            .search({
            status,
            search: this.searchQuery || undefined,
            page: this.pageIndex + 1,
            pageSize: this.rows,
            ownerId,
            type
        })
            .subscribe((res) => {
            this.activities.set(res.items);
            this.total.set(res.total);
            this.loading.set(false);
        });
    }
    onStatusChange(value) {
        this.statusFilter = value;
        this.pageIndex = 0;
        this.load();
    }
    onOwnerFilterChange(value) {
        if (!this.canManage()) {
            return;
        }
        this.activeOwnerFilter = value ?? 'all';
        this.pageIndex = 0;
        this.load();
    }
    onGroupByChange(value) {
        this.groupBy = value ?? 'none';
    }
    toggleMine() {
        this.myView.set(!this.myView());
        this.pageIndex = 0;
        this.load();
    }
    toggleOverdue() {
        this.overdueOnly.set(!this.overdueOnly());
    }
    toggleDueToday() {
        this.isDueTodayActive = !this.isDueTodayActive;
    }
    onTypeChange(type) {
        this.typeFilter = this.typeFilter === type ? 'all' : type;
        this.pageIndex = 0;
        this.load();
    }
    onSearch(query) {
        this.searchQuery = query;
        this.pageIndex = 0;
        this.load();
    }
    onPageChange(event) {
        this.pageIndex = event.page ?? 0;
        this.rows = event.rows ?? this.rows;
        this.load();
    }
    statusSeverity(status) {
        if (status === 'Overdue')
            return 'danger';
        if (status === 'Upcoming')
            return 'info';
        return 'info';
    }
    canMarkComplete(activity) {
        return this.canManage() && !activity.completedDateUtc;
    }
    relationLabel(type) {
        if (!type)
            return 'Record';
        return type;
    }
    groupedLeadActivityCount() {
        return this.leadGroupedActivities().length;
    }
    groupedOpportunityActivityCount() {
        return this.opportunityGroupedActivities().length;
    }
    asLocalDate(value) {
        if (!value) {
            return null;
        }
        if (value instanceof Date) {
            return value;
        }
        return this.parseUtcDate(value);
    }
    setView(view) {
        if (this.currentView() === view) {
            return;
        }
        this.currentView.set(view);
        // Calendar is enforced as personal-only in load(); do not mutate table/task owner filters.
        if (view === 'tasks') {
            this.typeFilter = 'Task';
        }
        else if (this.typeFilter === 'Task') {
            this.typeFilter = 'all';
        }
        const path = view === 'table'
            ? '/app/activities'
            : view === 'calendar'
                ? '/app/activities/calendar'
                : '/app/activities/tasks';
        this.router.navigate([path]);
    }
    calendarMonthLabel() {
        const month = this.calendarMonth();
        return month.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    selectedDateLabel() {
        const date = this.selectedDate();
        return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    }
    previousMonth() {
        const month = this.calendarMonth();
        this.calendarMonth.set(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    }
    nextMonth() {
        const month = this.calendarMonth();
        this.calendarMonth.set(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    }
    goToToday() {
        const today = new Date();
        this.calendarMonth.set(new Date(today.getFullYear(), today.getMonth(), 1));
        this.selectedDate.set(today);
    }
    selectDate(date) {
        this.selectedDate.set(date);
    }
    viewFromUrl(url) {
        if (url.includes('/activities/calendar')) {
            return 'calendar';
        }
        if (url.includes('/activities/tasks')) {
            return 'tasks';
        }
        return 'table';
    }
    filteredActivities() {
        let rows = [...this.activities()];
        if (this.overdueOnly()) {
            rows = rows.filter((row) => row.status === 'Overdue');
        }
        if (this.isDueTodayActive) {
            rows = rows.filter((row) => this.toDateKey(row.dueDateUtc) === this.todayKey);
        }
        return rows;
    }
    onCreate() {
        this.router.navigate(['/app/activities/new']);
    }
    onEdit(row) {
        this.router.navigate(['/app/activities', row.id, 'edit'], { state: { activity: row } });
    }
    onDelete(row) {
        if (!confirm(`Delete activity ${row.subject}?`)) {
            return;
        }
        this.activityData.delete(row.id).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Activity deleted.');
            },
            error: () => this.raiseToast('error', 'Unable to delete activity.')
        });
    }
    markCompleted(row) {
        if (!this.canManage()) {
            return;
        }
        this.raiseToast('error', 'Complete this activity from the edit screen to capture outcome and next step.');
        this.onEdit(row);
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadLookups() {
        this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => this.customers.set(res.items));
        this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => this.contacts.set(res.items));
    }
    toDateKey(value) {
        if (!value) {
            return null;
        }
        const date = typeof value === 'string' ? this.parseUtcDate(value) : value;
        if (Number.isNaN(date.getTime())) {
            return null;
        }
        return date.toISOString().split('T')[0];
    }
    parseUtcDate(value) {
        // Normalize API timestamps to UTC when the offset is missing.
        return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
    }
    static ɵfac = function ActivitiesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActivitiesPage)(i0.ɵɵdirectiveInject(i1.ActivityDataService), i0.ɵɵdirectiveInject(i2.CustomerDataService), i0.ɵɵdirectiveInject(i3.ContactDataService), i0.ɵɵdirectiveInject(i4.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivitiesPage, selectors: [["app-activities-page"]], decls: 114, vars: 46, consts: [["loadingState", ""], ["emptyState", ""], ["flatTableView", ""], ["opportunityGroupedView", ""], ["noTasks", ""], ["noOpenTasks", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "page-container"], [1, "page-content"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "pi", "pi-calendar", "gradient-icon"], [1, "title-gradient"], [1, "title-light"], [1, "title-count"], [1, "header-right"], [1, "view-toggle"], ["pButton", "", "type", "button", "title", "Table View", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-list"], ["pButton", "", "type", "button", "title", "Calendar View", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-calendar"], ["pButton", "", "type", "button", "title", "Tasks View", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-check-square"], ["type", "button", "title", "Refresh", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-refresh"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "kpi-strip"], [1, "kpi-card"], [1, "kpi-icon", "total"], [1, "pi", "pi-inbox"], [1, "kpi-data"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-divider"], ["pButton", "", "type", "button", 1, "kpi-card", "clickable", 3, "click"], [1, "kpi-icon", "upcoming"], [1, "pi", "pi-clock"], [1, "kpi-icon", "duetoday"], [1, "pi", "pi-calendar-clock"], ["class", "kpi-badge info", 4, "ngIf"], [1, "kpi-icon", "overdue"], [1, "pi", "pi-exclamation-circle"], ["class", "kpi-badge danger", 4, "ngIf"], [1, "kpi-icon", "completed"], [1, "pi", "pi-check-circle"], ["class", "kpi-badge success", 4, "ngIf"], [1, "toolbar-section"], [1, "toolbar", "glass-card"], [1, "toolbar-left"], [1, "search-box"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search activities...", 3, "ngModelChange", "ngModel"], [1, "filter-pills"], ["pButton", "", "type", "button", 1, "pill", 3, "click"], [1, "pi", "pi-phone"], [1, "pi", "pi-envelope"], [1, "pi", "pi-users"], [1, "toolbar-right"], ["inputId", "activities-groupBy", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Group by", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], ["inputId", "activities-ownerFilter", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All Owners", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel", "disabled"], ["pButton", "", "type", "button", 1, "pill", "toggle", 3, "click"], [1, "pi", "pi-user"], ["class", "table-section", 4, "ngIf"], ["class", "calendar-section", 4, "ngIf"], ["class", "tasks-section", 4, "ngIf"], ["pButton", "", "type", "button", 1, "fab", 3, "click", "disabled"], [1, "kpi-badge", "info"], [1, "kpi-badge", "danger"], [1, "kpi-badge", "success"], [1, "table-section"], [1, "data-table-wrapper", "glass-card"], [4, "ngIf", "ngIfElse"], [1, "grouped-activities"], [1, "grouped-activities__summary"], [1, "grouped-activities__label"], [1, "grouped-activities__count"], ["class", "lead-group-card", 4, "ngFor", "ngForOf"], [1, "lead-group-card"], [1, "lead-group-card__header"], [1, "lead-group-card__identity"], [1, "lead-group-card__title-row"], [1, "lead-group-card__title"], [1, "lead-group-card__lead-link", 3, "click", "routerLink"], [1, "pi", "pi-link"], [1, "lead-group-card__meta"], [4, "ngIf"], [1, "lead-group-card__stats"], [1, "group-chip", "neutral"], [1, "group-chip", "success"], ["class", "group-chip danger", 4, "ngIf"], [1, "lead-group-card__items"], ["type", "button", "class", "lead-group-activity", 3, "click", 4, "ngFor", "ngForOf"], [1, "group-chip", "danger"], ["type", "button", 1, "lead-group-activity", 3, "click"], [1, "lead-group-activity__left"], [1, "type-badge"], [1, "pi"], [1, "lead-group-activity__subject"], [1, "lead-group-activity__right"], [1, "status-chip"], [1, "lead-group-activity__date"], [1, "table-responsive"], [1, "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "pagination-bar"], [1, "pagination-info"], [3, "onPageChange", "rows", "totalRecords", "first", "showFirstLastIcon", "showPageLinks", "pageLinkSize"], [1, "actions-col"], [1, "table-row", 3, "click"], [1, "subject-text"], [1, "related-info"], [1, "related-type"], [1, "related-name"], ["class", "related-link", 3, "routerLink", "click", 4, "ngIf"], [1, "priority-chip"], [1, "date-text"], [1, "owner-text"], [1, "row-actions"], ["type", "button", "title", "Mark completed", 1, "row-action-btn", "row-action-btn--complete", 3, "click", "disabled"], [1, "pi", "pi-check"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "related-link", 3, "click", "routerLink"], [1, "loading-skeleton"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-text"], ["pButton", "", "type", "button", 1, "btn-primary", 3, "click", "disabled"], [1, "calendar-section"], [1, "calendar-shell", "glass-card"], [1, "calendar-header"], [1, "eyebrow"], [1, "muted"], [1, "calendar-actions"], ["pButton", "", "type", "button", "title", "Previous month", 1, "btn-icon", 3, "click"], [1, "pi", "pi-angle-left"], ["pButton", "", "type", "button", "title", "Today", 1, "btn-icon", 3, "click"], ["pButton", "", "type", "button", "title", "Next month", 1, "btn-icon", 3, "click"], [1, "pi", "pi-angle-right"], [1, "calendar-grid"], ["class", "calendar-weekday", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", "class", "calendar-day", 3, "is-outside", "is-today", "is-selected", "click", 4, "ngFor", "ngForOf"], [1, "calendar-panel"], [1, "panel-card"], [1, "pill"], ["class", "task-list", 4, "ngIf", "ngIfElse"], [1, "calendar-weekday"], ["pButton", "", "type", "button", 1, "calendar-day", 3, "click"], [1, "day-number"], ["class", "day-count", 4, "ngIf"], [1, "day-count"], [1, "task-list"], ["class", "task-item", 4, "ngFor", "ngForOf"], [1, "task-item"], [1, "task-type"], [1, "tasks-section"], [1, "tasks-header", "glass-card"], [1, "tasks-grid"], [1, "tasks-column"], ["pButton", "", "type", "button", "class", "task-card", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "empty-text", 4, "ngIf"], [1, "tasks-column", "tasks-column--completed"], ["pButton", "", "type", "button", 1, "task-card", 3, "click", "disabled"], [1, "status-tag", "status-tag--today"], [1, "status-tag", "status-tag--overdue"], [1, "status-tag", "status-tag--upcoming"], [1, "status-tag", "status-tag--done"]], template: function ActivitiesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelement(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 11)(6, "div", 12);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "header", 13)(9, "div", 14)(10, "h1", 15);
            i0.ɵɵelement(11, "i", 16);
            i0.ɵɵelementStart(12, "span", 17);
            i0.ɵɵtext(13, "Activities");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span", 18);
            i0.ɵɵtext(15, "Workspace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 19);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "div", 20)(19, "div", 21)(20, "button", 22);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_20_listener() { return ctx.setView("table"); });
            i0.ɵɵelement(21, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 24);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_22_listener() { return ctx.setView("calendar"); });
            i0.ɵɵelement(23, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 26);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_24_listener() { return ctx.setView("tasks"); });
            i0.ɵɵelement(25, "i", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "button", 28);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_26_listener() { return ctx.load(); });
            i0.ɵɵelementStart(27, "span", 29);
            i0.ɵɵelement(28, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span");
            i0.ɵɵtext(30, "Refresh");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "button", 31);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_31_listener() { return ctx.onCreate(); });
            i0.ɵɵelementStart(32, "span", 29);
            i0.ɵɵelement(33, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35, "Add Activity");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(36, "section", 33)(37, "div", 34)(38, "div", 35);
            i0.ɵɵelement(39, "i", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 37)(41, "span", 38);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span", 39);
            i0.ɵɵtext(44, "Total");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(45, "div", 40);
            i0.ɵɵelementStart(46, "button", 41);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_46_listener() { return ctx.onStatusChange("Upcoming"); });
            i0.ɵɵelementStart(47, "div", 42);
            i0.ɵɵelement(48, "i", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 37)(50, "span", 38);
            i0.ɵɵtext(51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "span", 39);
            i0.ɵɵtext(53, "Open");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(54, "button", 41);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_54_listener() { return ctx.toggleDueToday(); });
            i0.ɵɵelementStart(55, "div", 44);
            i0.ɵɵelement(56, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 37)(58, "span", 38);
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "span", 39);
            i0.ɵɵtext(61, "Due Today");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(62, ActivitiesPage_span_62_Template, 2, 0, "span", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "button", 41);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_63_listener() { return ctx.toggleOverdue(); });
            i0.ɵɵelementStart(64, "div", 47);
            i0.ɵɵelement(65, "i", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "div", 37)(67, "span", 38);
            i0.ɵɵtext(68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "span", 39);
            i0.ɵɵtext(70, "Overdue");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(71, ActivitiesPage_span_71_Template, 2, 0, "span", 49);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(72, "div", 40);
            i0.ɵɵelementStart(73, "button", 41);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_73_listener() { return ctx.onStatusChange("Completed"); });
            i0.ɵɵelementStart(74, "div", 50);
            i0.ɵɵelement(75, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div", 37)(77, "span", 38);
            i0.ɵɵtext(78);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 39);
            i0.ɵɵtext(80, "Done");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(81, ActivitiesPage_span_81_Template, 2, 1, "span", 52);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "section", 53)(83, "div", 54)(84, "div", 55)(85, "div", 56);
            i0.ɵɵelement(86, "i", 57);
            i0.ɵɵelementStart(87, "input", 58);
            i0.ɵɵtwoWayListener("ngModelChange", function ActivitiesPage_Template_input_ngModelChange_87_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ActivitiesPage_Template_input_ngModelChange_87_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 59)(89, "button", 60);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_89_listener() { return ctx.onTypeChange("all"); });
            i0.ɵɵtext(90, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "button", 60);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_91_listener() { return ctx.onTypeChange("Call"); });
            i0.ɵɵelement(92, "i", 61);
            i0.ɵɵtext(93, " Calls ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "button", 60);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_94_listener() { return ctx.onTypeChange("Email"); });
            i0.ɵɵelement(95, "i", 62);
            i0.ɵɵtext(96, " Emails ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "button", 60);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_97_listener() { return ctx.onTypeChange("Meeting"); });
            i0.ɵɵelement(98, "i", 63);
            i0.ɵɵtext(99, " Meetings ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "button", 60);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_100_listener() { return ctx.onTypeChange("Task"); });
            i0.ɵɵelement(101, "i", 27);
            i0.ɵɵtext(102, " Tasks ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(103, "div", 64)(104, "p-select", 65);
            i0.ɵɵlistener("ngModelChange", function ActivitiesPage_Template_p_select_ngModelChange_104_listener($event) { return ctx.onGroupByChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "p-select", 66);
            i0.ɵɵlistener("ngModelChange", function ActivitiesPage_Template_p_select_ngModelChange_105_listener($event) { return ctx.onOwnerFilterChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "button", 67);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_106_listener() { return ctx.toggleMine(); });
            i0.ɵɵelement(107, "i", 68);
            i0.ɵɵtext(108, " Mine ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(109, ActivitiesPage_section_109_Template, 7, 2, "section", 69)(110, ActivitiesPage_section_110_Template, 39, 11, "section", 70)(111, ActivitiesPage_section_111_Template, 45, 13, "section", 71);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(112, "button", 72);
            i0.ɵɵlistener("click", function ActivitiesPage_Template_button_click_112_listener() { return ctx.onCreate(); });
            i0.ɵɵelement(113, "i", 32);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate(ctx.total());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.currentView() === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentView() === "calendar");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentView() === "tasks");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.total());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.statusFilter === "Upcoming");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.openActivitiesCount());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.isDueTodayActive);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.dueTodayCount());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.dueTodayCount() > 0);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.overdueOnly());
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.overdueCount());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.overdueCount() > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.statusFilter === "Completed");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.completedCount());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.completionRate() > 0);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.typeFilter === "all");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.typeFilter === "Call");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.typeFilter === "Email");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.typeFilter === "Meeting");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.typeFilter === "Task");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.groupByOptions)("ngModel", ctx.groupBy);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.ownerOptions())("ngModel", ctx.activeOwnerFilter)("disabled", !ctx.canManage());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.myView());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.currentView() === "table");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.currentView() === "calendar");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.currentView() === "tasks");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.canManage());
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, ButtonModule, i6.ButtonDirective, i7.PrimeTemplate, InputTextModule, i8.InputText, SelectModule, i9.Select, TableModule, i10.Table, PaginatorModule, i11.Paginator, RouterLink,
            BreadcrumbsComponent,
            DatePipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACTIVITIES[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   macOS[_ngcontent-%COMP%]   Glassmorphism[_ngcontent-%COMP%]   Design\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../../styles/design-tokens'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   GLASSMORPHISM[_ngcontent-%COMP%]   VARIABLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n$glass-bg[_ngcontent-%COMP%]:   rgba(255, 255, 255, 0.72)[_ngcontent-%COMP%];\n$glass-bg-hover[_ngcontent-%COMP%]:   rgba(255, 255, 255, 0.85)[_ngcontent-%COMP%];\n$glass-blur[_ngcontent-%COMP%]:   24px[_ngcontent-%COMP%];\n$glass-border-light[_ngcontent-%COMP%]:   rgba(255, 255, 255, 0.5)[_ngcontent-%COMP%];\n$glass-border-dark[_ngcontent-%COMP%]:   rgba(0, 0, 0, 0.06)[_ngcontent-%COMP%];\n$glass-shadow[_ngcontent-%COMP%]:   0[_ngcontent-%COMP%]   8px[_ngcontent-%COMP%]   32px[_ngcontent-%COMP%]   rgba(0, 0, 0, 0.08)[_ngcontent-%COMP%], \n   0[_ngcontent-%COMP%]   2px[_ngcontent-%COMP%]   8px[_ngcontent-%COMP%]   rgba(0, 0, 0, 0.04)[_ngcontent-%COMP%], \n   inset[_ngcontent-%COMP%]   0[_ngcontent-%COMP%]   1px[_ngcontent-%COMP%]   0[_ngcontent-%COMP%]   rgba(255, 255, 255, 0.6)[_ngcontent-%COMP%];\n$glass-shadow-hover[_ngcontent-%COMP%]:   0[_ngcontent-%COMP%]   12px[_ngcontent-%COMP%]   40px[_ngcontent-%COMP%]   rgba(0, 0, 0, 0.12)[_ngcontent-%COMP%], \n   0[_ngcontent-%COMP%]   4px[_ngcontent-%COMP%]   12px[_ngcontent-%COMP%]   rgba(0, 0, 0, 0.06)[_ngcontent-%COMP%], \n   inset[_ngcontent-%COMP%]   0[_ngcontent-%COMP%]   1px[_ngcontent-%COMP%]   0[_ngcontent-%COMP%]   rgba(255, 255, 255, 0.8)[_ngcontent-%COMP%];\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   BACKGROUND[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Vibrant[_ngcontent-%COMP%]   gradient[_ngcontent-%COMP%]   with[_ngcontent-%COMP%]   floating[_ngcontent-%COMP%]   orbs\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n\n  .animated-orb {\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(100px);\n    opacity: 0.7;\n    animation: _ngcontent-%COMP%_float 25s ease-in-out infinite;\n\n    &.orb-1 {\n      width: 500px;\n      height: 500px;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      top: -150px;\n      right: -100px;\n    }\n\n    &.orb-2 {\n      width: 400px;\n      height: 400px;\n      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);\n      bottom: 10%;\n      left: -100px;\n      animation-delay: -8s;\n    }\n\n    &.orb-3 {\n      width: 350px;\n      height: 350px;\n      background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);\n      bottom: -80px;\n      right: 20%;\n      animation-delay: -16s;\n    }\n  }\n\n  .grid-pattern {\n    position: absolute;\n    inset: 0;\n    background-image: \n      linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);\n    background-size: 60px 60px;\n    opacity: 0.5;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CALENDAR[_ngcontent-%COMP%]   VIEW\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.calendar-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.9fr);\n  gap: 24px;\n  align-items: start;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.tasks-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.tasks-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 20px 24px;\n\n  h2 {\n    margin: 4px 0 0;\n    font-size: 22px;\n    font-weight: 700;\n    color: #1a1a2e;\n  }\n\n  .eyebrow {\n    margin: 0;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .muted {\n    margin: 4px 0 0;\n    color: $gray-500;\n    font-size: 13px;\n  }\n}\n\n.tasks-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.tasks-column[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  border: 1px solid $glass-border-light;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: $glass-shadow;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n\n    span {\n      font-size: 13px;\n      color: $gray-500;\n      font-weight: 600;\n    }\n\n    strong {\n      font-size: 20px;\n      font-weight: 700;\n      color: #1a1a2e;\n    }\n  }\n}\n\n.tasks-column--completed[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.task-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 24px rgba(99, 102, 241, 0.12);\n  }\n\n  strong {\n    display: block;\n    font-size: 13px;\n    color: #1f2937;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: 12px;\n  }\n}\n\n.status-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 8px;\n  border-radius: 999px;\n  text-transform: uppercase;\n\n  &--today {\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n  }\n\n  &--overdue {\n    background: rgba($danger, 0.15);\n    color: $danger;\n  }\n\n  &--upcoming {\n    background: rgba($purple, 0.15);\n    color: $purple;\n  }\n\n  &--done {\n    background: rgba($success, 0.15);\n    color: $success;\n  }\n}\n\n.calendar-shell[_ngcontent-%COMP%] {\n  padding: 20px 22px;\n}\n\n.calendar-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 18px;\n\n  h2 {\n    margin: 4px 0 0;\n    font-size: 22px;\n    font-weight: 700;\n    color: #1a1a2e;\n  }\n\n  .eyebrow {\n    margin: 0;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .muted {\n    margin: 4px 0 0;\n    color: $gray-500;\n    font-size: 13px;\n  }\n}\n\n.calendar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.calendar-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 8px;\n}\n\n.calendar-weekday[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: $gray-500;\n  text-align: center;\n  padding-bottom: 6px;\n}\n\n.calendar-day[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  border-radius: 12px;\n  padding: 10px 8px;\n  min-height: 70px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    background: $glass-bg-hover;\n    border-color: rgba($purple, 0.2);\n    transform: translateY(-1px);\n  }\n\n  &.is-outside {\n    opacity: 0.4;\n  }\n\n  &.is-today {\n    border-color: rgba($cyan, 0.45);\n    box-shadow: inset 0 0 0 1px rgba($cyan, 0.3);\n  }\n\n  &.is-selected {\n    border-color: rgba($purple, 0.5);\n    box-shadow: 0 6px 16px rgba($purple, 0.2);\n  }\n}\n\n.day-number[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.day-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: white;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  padding: 2px 6px;\n  border-radius: 999px;\n}\n\n.calendar-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.panel-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  border: 1px solid $glass-border-light;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: $glass-shadow;\n\n  header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    margin-bottom: 10px;\n\n    h3 {\n      margin: 0;\n      font-size: 15px;\n      font-weight: 700;\n      color: #1a1a2e;\n    }\n  }\n\n  .pill {\n    background: rgba($purple, 0.12);\n    color: $purple;\n    font-size: 12px;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: 999px;\n  }\n}\n\n.task-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.task-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n\n  strong {\n    display: block;\n    font-size: 13px;\n    color: #1f2937;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: 12px;\n  }\n}\n\n.task-type[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: $gray-500;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.98); }\n  75% { transform: translate(-30px, -15px) scale(1.02); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   CONTAINER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 100vh;\n  padding: 28px 36px;\n\n  @media (max-width: 768px) {\n    padding: 16px;\n  }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   HEADER[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   bar\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 28px;\n  padding: 20px 28px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 20px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.5);\n\n  i {\n    font-size: 9px;\n    opacity: 0.6;\n  }\n\n  .breadcrumb-current {\n    color: $purple;\n    font-weight: 600;\n  }\n}\n\n.page-title[_ngcontent-%COMP%] {\n  margin: 0;\n\n  .gradient-icon {\n    font-size: 26px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n}\n\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   GLASS[_ngcontent-%COMP%]   BUTTONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.btn-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  border: 1px solid $glass-border-light;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  color: #64748b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($purple, 0.3);\n    color: $purple;\n    transform: translateY(-2px);\n    box-shadow: 0 6px 16px rgba($purple, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  }\n\n  i {\n    font-size: 16px;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 22px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4),\n              inset 0 1px 0 rgba(255, 255, 255, 0.2);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5),\n                inset 0 1px 0 rgba(255, 255, 255, 0.3);\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   STRIP[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   metric[_ngcontent-%COMP%]   cards\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.kpi-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: 12px;\n  margin-bottom: 24px;\n  overflow-x: auto;\n  padding: 4px;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 18px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  transition: all 0.25s ease;\n  position: relative;\n  flex: 1;\n  min-width: 160px;\n\n  &.clickable {\n    cursor: pointer;\n\n    &:hover {\n      background: $glass-bg-hover;\n      transform: translateY(-3px);\n      box-shadow: $glass-shadow-hover;\n    }\n\n    &.active {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n      border-color: rgba(102, 126, 234, 0.3);\n      \n      .kpi-value {\n        color: #667eea;\n      }\n    }\n  }\n}\n\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n\n  i {\n    font-size: 20px;\n  }\n\n  &.total {\n    background: linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(100, 116, 139, 0.1) 100%);\n    color: #64748b;\n  }\n\n  &.upcoming {\n    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);\n    color: #06b6d4;\n  }\n\n  &.duetoday {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);\n    color: #f59e0b;\n  }\n\n  &.overdue {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);\n    color: #ef4444;\n  }\n\n  &.completed {\n    background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);\n    color: #22c55e;\n  }\n}\n\n.kpi-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 700;\n  color: #1a1a2e;\n  line-height: 1;\n  letter-spacing: -0.5px;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.5);\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.kpi-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 6px;\n  border-radius: 11px;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &.info {\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);\n  }\n\n  &.danger {\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);\n  }\n\n  &.success {\n    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);\n  }\n}\n\n.kpi-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);\n  margin: 8px 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TOOLBAR[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   search[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   filters\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.toolbar-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 16px 24px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 18px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n}\n\n.toolbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n\n.toolbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid $glass-border-light;\n  border-radius: 12px;\n  transition: all 0.2s ease;\n  min-width: 260px;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($purple, 0.4);\n    box-shadow: 0 0 0 4px rgba($purple, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.02);\n  }\n\n  i {\n    color: rgba(0, 0, 0, 0.35);\n    font-size: 14px;\n  }\n\n  input {\n    border: none;\n    background: transparent;\n    outline: none;\n    font-size: 14px;\n    color: #1a1a2e;\n    width: 100%;\n\n    &::placeholder {\n      color: rgba(0, 0, 0, 0.35);\n    }\n  }\n}\n\n.filter-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1px solid $glass-border-light;\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  i {\n    font-size: 12px;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba($purple, 0.3);\n    color: $purple;\n  }\n\n  &.active {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    border-color: transparent;\n    color: white;\n    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n  }\n}\n\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid $glass-border-light;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  button {\n    padding: 10px 14px;\n    border: none;\n    background: transparent;\n    color: #64748b;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n      color: $purple;\n      background: rgba(255, 255, 255, 0.5);\n    }\n\n    &.active {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n    }\n\n    i {\n      font-size: 14px;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   TABLE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   card\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.table-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.grouped-activities[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.grouped-activities__summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.55);\n}\n\n.grouped-activities__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.grouped-activities__count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(51, 65, 85, 0.85);\n  font-weight: 600;\n}\n\n.lead-group-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.65);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n}\n\n.lead-group-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 16px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));\n}\n\n.lead-group-card__identity[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  gap: 4px;\n}\n\n.lead-group-card__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.lead-group-card__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.lead-group-card__lead-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #2563eb;\n  text-decoration: none;\n}\n\n.lead-group-card__lead-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.lead-group-card__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.lead-group-card__stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.group-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  padding: 4px 8px;\n  font-size: 11px;\n  font-weight: 700;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n\n.group-chip.neutral[_ngcontent-%COMP%] {\n  background: rgba(241, 245, 249, 0.9);\n  color: #475569;\n}\n\n.group-chip.success[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n}\n\n.group-chip.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.92);\n  color: #991b1b;\n}\n\n.lead-group-card__items[_ngcontent-%COMP%] {\n  display: grid;\n}\n\n.lead-group-activity[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 12px 16px;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.16s ease;\n}\n\n.lead-group-card__items[_ngcontent-%COMP%]   .lead-group-activity[_ngcontent-%COMP%]:first-child {\n  border-top: 0;\n}\n\n.lead-group-activity[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.55);\n}\n\n.lead-group-activity__left[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.lead-group-activity__subject[_ngcontent-%COMP%] {\n  min-width: 0;\n  color: #1f2937;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.lead-group-activity__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-shrink: 0;\n}\n\n.lead-group-activity__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(71, 85, 105, 0.85);\n  white-space: nowrap;\n}\n\n@media (max-width: 900px) {\n  .lead-group-card__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .lead-group-card__stats[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .lead-group-activity[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .lead-group-activity__right[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border-light;\n  border-radius: 20px;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 18px 24px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.table-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1a1a2e;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 0;\n\n  i {\n    color: #667eea;\n  }\n}\n\n.table-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.5);\n  background: rgba(0, 0, 0, 0.05);\n  padding: 5px 14px;\n  border-radius: 20px;\n  font-weight: 500;\n}\n\n.table-responsive[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n\n  th {\n    padding: 14px 20px;\n    text-align: left;\n    font-size: 0.72rem;\n    font-weight: 600;\n    color: #3b82f6;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    white-space: nowrap;\n  }\n\n  td {\n    padding: 16px 20px;\n    font-size: 14px;\n    color: #374151;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    vertical-align: middle;\n  }\n\n  tr {\n    transition: all 0.2s ease;\n\n    &:hover {\n      background: rgba(102, 126, 234, 0.04);\n    }\n\n    &:last-child td {\n      border-bottom: none;\n    }\n  }\n\n  .actions-col {\n    width: 100px;\n    text-align: center;\n  }\n}\n\n.subject-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1a1a2e;\n}\n\n.type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n\n  i {\n    font-size: 11px;\n  }\n\n  &[data-type=\"Call\"] {\n    background: rgba(34, 197, 94, 0.15);\n    color: #16a34a;\n  }\n\n  &[data-type=\"Email\"] {\n    background: rgba(6, 182, 212, 0.15);\n    color: #0891b2;\n  }\n\n  &[data-type=\"Meeting\"] {\n    background: rgba(139, 92, 246, 0.15);\n    color: #7c3aed;\n  }\n\n  &[data-type=\"Task\"] {\n    background: rgba(102, 126, 234, 0.15);\n    color: #4f46e5;\n  }\n}\n\n.related-cell[_ngcontent-%COMP%], \n.related-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.related-type[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: rgba(0, 0, 0, 0.4);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.related-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #374151;\n}\n\n.related-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n}\n\n.related-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n\n.related-link[_ngcontent-%COMP%]:hover {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n\n.priority-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &.high {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n  }\n\n  &.normal {\n    background: rgba(100, 116, 139, 0.12);\n    color: #475569;\n  }\n\n  &.low {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n}\n\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n\n  &.overdue {\n    background: rgba(239, 68, 68, 0.15);\n    color: #dc2626;\n  }\n\n  &.upcoming {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0ea5e9;\n  }\n\n  &.completed {\n    background: rgba(34, 197, 94, 0.14);\n    color: #16a34a;\n  }\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &::before {\n    content: '';\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n  }\n\n  &.success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n    &::before { background: #22c55e; }\n  }\n\n  &.info {\n    background: rgba(6, 182, 212, 0.12);\n    color: #0891b2;\n    &::before { background: #06b6d4; }\n  }\n\n  &.warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n    &::before { background: #f59e0b; }\n  }\n\n  &.danger {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n    &::before { background: #ef4444; }\n  }\n}\n\n.date-cell[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n}\n\n.owner-cell[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #64748b;\n}\n\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 6px;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.loading-state[_ngcontent-%COMP%] {\n  padding: 40px;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n\n  .skeleton {\n    height: 60px;\n    background: linear-gradient(90deg, \n      rgba(0, 0, 0, 0.04) 25%, \n      rgba(0, 0, 0, 0.08) 50%, \n      rgba(0, 0, 0, 0.04) 75%);\n    background-size: 200% 100%;\n    animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n    border-radius: 12px;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);\n\n  i {\n    font-size: 40px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n}\n\n.empty-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin-bottom: 8px;\n}\n\n.empty-description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.5);\n  max-width: 380px;\n  margin-bottom: 28px;\n  line-height: 1.6;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGINATION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.pagination-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  background: rgba(255, 255, 255, 0.3);\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FAB[_ngcontent-%COMP%]   (Mobile)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.fab[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 28px;\n  right: 28px;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  cursor: pointer;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.5),\n              inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  transition: all 0.3s ease;\n  z-index: 1000;\n\n  i {\n    font-size: 24px;\n  }\n\n  &:hover {\n    transform: scale(1.1);\n    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);\n  }\n\n  @media (max-width: 768px) {\n    display: flex;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DIALOG[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   FORM[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   modal\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.activity-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n\n  @media (max-width: 480px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  font-size: 14px;\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  transition: all 0.2s ease;\n\n  &::placeholder {\n    color: rgba(0, 0, 0, 0.35);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: rgba($purple, 0.4);\n    background: white;\n    box-shadow: 0 0 0 4px rgba($purple, 0.1);\n  }\n\n  &.textarea {\n    resize: vertical;\n    min-height: 120px;\n  }\n}\n\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESPONSIVE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 1024px) {\n  .kpi-strip {\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .kpi-card {\n    flex: 0 0 auto;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 16px 20px;\n  }\n\n  .header-right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    width: 100%;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 16px 20px;\n  }\n\n  .toolbar-left[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-box[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n\n  .filter-pills[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .toolbar-right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    width: 100%;\n  }\n\n  //[_ngcontent-%COMP%]   Keep[_ngcontent-%COMP%]   view[_ngcontent-%COMP%]   toggles[_ngcontent-%COMP%]   usable[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   narrow[_ngcontent-%COMP%]   screens[_ngcontent-%COMP%]   without[_ngcontent-%COMP%]   overflow.\n[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n\n    button {\n      flex: 1 1 0;\n    }\n  }\n\n  .btn-primary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .toolbar-right[_ngcontent-%COMP%]   .filter-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n@media (max-width: 640px) {\n  //[_ngcontent-%COMP%]   Tighten[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   calendar[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   layouts[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]   phones.\n[_ngcontent-%COMP%]   .calendar-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .calendar-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .calendar-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n\n  .calendar-day[_ngcontent-%COMP%] {\n    min-height: 56px;\n    padding: 8px 6px;\n  }\n\n  .tasks-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .tasks-header[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .data-table[_ngcontent-%COMP%] {\n    min-width: 760px;\n  }\n\n  .kpi-card[_ngcontent-%COMP%] {\n    min-width: 140px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivitiesPage, [{
        type: Component,
        args: [{ selector: 'app-activities-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    FormsModule,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    TableModule,
                    PaginatorModule,
                    DatePipe,
                    RouterLink,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"page-container\">\n  <div class=\"page-content\">\n    <!-- PrimeNG Breadcrumb -->\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <!-- Page Header -->\n    <header class=\"page-header\">\n      <div class=\"header-left\">\n        <h1 class=\"page-title\">\n          <i class=\"pi pi-calendar gradient-icon\"></i>\n          <span class=\"title-gradient\">Activities</span>\n          <span class=\"title-light\">Workspace</span>\n          <span class=\"title-count\">{{ total() }}</span>\n        </h1>\n      </div>\n      <div class=\"header-right\">\n        <div class=\"view-toggle\">\n          <button pButton type=\"button\" class=\"toggle-btn\" [class.active]=\"currentView() === 'table'\" (click)=\"setView('table')\" title=\"Table View\">\n            <i class=\"pi pi-list\"></i>\n          </button>\n          <button pButton type=\"button\" class=\"toggle-btn\" [class.active]=\"currentView() === 'calendar'\" (click)=\"setView('calendar')\" title=\"Calendar View\">\n            <i class=\"pi pi-calendar\"></i>\n          </button>\n          <button pButton type=\"button\" class=\"toggle-btn\" [class.active]=\"currentView() === 'tasks'\" (click)=\"setView('tasks')\" title=\"Tasks View\">\n            <i class=\"pi pi-check-square\"></i>\n          </button>\n        </div>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"load()\" title=\"Refresh\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Refresh</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>Add Activity</span>\n        </button>\n      </div>\n    </header>\n\n    <!-- KPI Strip -->\n    <section class=\"kpi-strip\">\n      <div class=\"kpi-card\">\n        <div class=\"kpi-icon total\">\n          <i class=\"pi pi-inbox\"></i>\n        </div>\n        <div class=\"kpi-data\">\n          <span class=\"kpi-value\">{{ total() }}</span>\n          <span class=\"kpi-label\">Total</span>\n        </div>\n      </div>\n      <div class=\"kpi-divider\"></div>\n      <button pButton type=\"button\" class=\"kpi-card clickable\" [class.active]=\"statusFilter === 'Upcoming'\" (click)=\"onStatusChange('Upcoming')\">\n        <div class=\"kpi-icon upcoming\">\n          <i class=\"pi pi-clock\"></i>\n        </div>\n        <div class=\"kpi-data\">\n          <span class=\"kpi-value\">{{ openActivitiesCount() }}</span>\n          <span class=\"kpi-label\">Open</span>\n        </div>\n      </button>\n      <button pButton type=\"button\" class=\"kpi-card clickable\" [class.active]=\"isDueTodayActive\" (click)=\"toggleDueToday()\">\n        <div class=\"kpi-icon duetoday\">\n          <i class=\"pi pi-calendar-clock\"></i>\n        </div>\n        <div class=\"kpi-data\">\n          <span class=\"kpi-value\">{{ dueTodayCount() }}</span>\n          <span class=\"kpi-label\">Due Today</span>\n        </div>\n        <span class=\"kpi-badge info\" *ngIf=\"dueTodayCount() > 0\">!</span>\n      </button>\n      <button pButton type=\"button\" class=\"kpi-card clickable\" [class.active]=\"overdueOnly()\" (click)=\"toggleOverdue()\">\n        <div class=\"kpi-icon overdue\">\n          <i class=\"pi pi-exclamation-circle\"></i>\n        </div>\n        <div class=\"kpi-data\">\n          <span class=\"kpi-value\">{{ overdueCount() }}</span>\n          <span class=\"kpi-label\">Overdue</span>\n        </div>\n        <span class=\"kpi-badge danger\" *ngIf=\"overdueCount() > 0\">!</span>\n      </button>\n      <div class=\"kpi-divider\"></div>\n      <button pButton type=\"button\" class=\"kpi-card clickable\" [class.active]=\"statusFilter === 'Completed'\" (click)=\"onStatusChange('Completed')\">\n        <div class=\"kpi-icon completed\">\n          <i class=\"pi pi-check-circle\"></i>\n        </div>\n        <div class=\"kpi-data\">\n          <span class=\"kpi-value\">{{ completedCount() }}</span>\n          <span class=\"kpi-label\">Done</span>\n        </div>\n        <span class=\"kpi-badge success\" *ngIf=\"completionRate() > 0\">{{ completionRate() }}%</span>\n      </button>\n    </section>\n\n    <!-- Toolbar -->\n    <section class=\"toolbar-section\">\n      <div class=\"toolbar glass-card\">\n        <div class=\"toolbar-left\">\n          <div class=\"search-box\">\n            <i class=\"pi pi-search\"></i>\n            <input pInputText type=\"text\" placeholder=\"Search activities...\" [(ngModel)]=\"searchQuery\" (ngModelChange)=\"onSearch($event)\" />\n          </div>\n          <div class=\"filter-pills\">\n            <button pButton type=\"button\" class=\"pill\" [class.active]=\"typeFilter === 'all'\" (click)=\"onTypeChange('all')\">All</button>\n            <button pButton type=\"button\" class=\"pill\" [class.active]=\"typeFilter === 'Call'\" (click)=\"onTypeChange('Call')\">\n              <i class=\"pi pi-phone\"></i> Calls\n            </button>\n            <button pButton type=\"button\" class=\"pill\" [class.active]=\"typeFilter === 'Email'\" (click)=\"onTypeChange('Email')\">\n              <i class=\"pi pi-envelope\"></i> Emails\n            </button>\n            <button pButton type=\"button\" class=\"pill\" [class.active]=\"typeFilter === 'Meeting'\" (click)=\"onTypeChange('Meeting')\">\n              <i class=\"pi pi-users\"></i> Meetings\n            </button>\n            <button pButton type=\"button\" class=\"pill\" [class.active]=\"typeFilter === 'Task'\" (click)=\"onTypeChange('Task')\">\n              <i class=\"pi pi-check-square\"></i> Tasks\n            </button>\n          </div>\n        </div>\n        <div class=\"toolbar-right\">\n          <p-select inputId=\"activities-groupBy\" appendTo=\"body\"\n            [options]=\"groupByOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"groupBy\"\n            (ngModelChange)=\"onGroupByChange($event)\"\n            placeholder=\"Group by\"\n            styleClass=\"filter-select\"\n          ></p-select>\n          <p-select inputId=\"activities-ownerFilter\" appendTo=\"body\"\n            [options]=\"ownerOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"activeOwnerFilter\"\n            (ngModelChange)=\"onOwnerFilterChange($event)\"\n            placeholder=\"All Owners\"\n            styleClass=\"filter-select\"\n            [disabled]=\"!canManage()\"\n          ></p-select>\n          <button pButton type=\"button\" class=\"pill toggle\" [class.active]=\"myView()\" (click)=\"toggleMine()\">\n            <i class=\"pi pi-user\"></i> Mine\n          </button>\n        </div>\n      </div>\n    </section>\n\n    <!-- Activities Table -->\n    <section class=\"table-section\" *ngIf=\"currentView() === 'table'\">\n      <div class=\"data-table-wrapper glass-card\">\n        <ng-container *ngIf=\"!loading(); else loadingState\">\n          <ng-container *ngIf=\"groupBy !== 'none'; else flatTableView\">\n            <ng-container *ngIf=\"groupBy === 'lead'; else opportunityGroupedView\">\n            <ng-container *ngIf=\"leadGroupedActivities().length; else emptyState\">\n              <div class=\"grouped-activities\">\n                <div class=\"grouped-activities__summary\">\n                  <span class=\"grouped-activities__label\">Grouped by Lead</span>\n                  <span class=\"grouped-activities__count\">{{ groupedLeadActivityCount() }} lead{{ groupedLeadActivityCount() === 1 ? '' : 's' }}</span>\n                </div>\n\n                <div class=\"lead-group-card\" *ngFor=\"let group of leadGroupedActivities()\">\n                  <div class=\"lead-group-card__header\">\n                    <div class=\"lead-group-card__identity\">\n                      <div class=\"lead-group-card__title-row\">\n                        <span class=\"lead-group-card__title\">{{ group.leadName }}</span>\n                        <a\n                          class=\"lead-group-card__lead-link\"\n                          [routerLink]=\"['/app/leads', group.leadId, 'edit']\"\n                          (click)=\"$event.stopPropagation()\"\n                        >\n                          <i class=\"pi pi-link\"></i>\n                          Open Lead\n                        </a>\n                      </div>\n                      <div class=\"lead-group-card__meta\">\n                        <span>{{ group.items.length }} activit{{ group.items.length === 1 ? 'y' : 'ies' }}</span>\n                        <span *ngIf=\"group.lastActivityAt\">\u2022 Last activity {{ asLocalDate(group.lastActivityAt) | date:'MMM d, h:mm a' }}</span>\n                      </div>\n                    </div>\n                    <div class=\"lead-group-card__stats\">\n                      <span class=\"group-chip neutral\">Open {{ group.openCount }}</span>\n                      <span class=\"group-chip success\">Done {{ group.completedCount }}</span>\n                      <span class=\"group-chip danger\" *ngIf=\"group.overdueCount\">Overdue {{ group.overdueCount }}</span>\n                    </div>\n                  </div>\n\n                  <div class=\"lead-group-card__items\">\n                    <button\n                      type=\"button\"\n                      class=\"lead-group-activity\"\n                      *ngFor=\"let row of group.items\"\n                      (click)=\"canManage() ? onEdit(row) : null\"\n                    >\n                      <div class=\"lead-group-activity__left\">\n                        <span class=\"type-badge\" [attr.data-type]=\"row.type\">\n                          <i class=\"pi\"\n                             [class.pi-phone]=\"row.type === 'Call'\"\n                             [class.pi-envelope]=\"row.type === 'Email'\"\n                             [class.pi-users]=\"row.type === 'Meeting'\"\n                             [class.pi-check-square]=\"row.type === 'Task'\"></i>\n                          {{ row.type }}\n                        </span>\n                        <span class=\"lead-group-activity__subject\">{{ row.subject }}</span>\n                      </div>\n                      <div class=\"lead-group-activity__right\">\n                        <span class=\"status-chip\"\n                              [class.upcoming]=\"row.status === 'Upcoming'\"\n                              [class.completed]=\"row.status === 'Completed'\"\n                              [class.overdue]=\"row.status === 'Overdue'\">\n                          {{ row.status }}\n                        </span>\n                        <span class=\"lead-group-activity__date\">{{ asLocalDate(row.completedDateUtc || row.dueDateUtc || row.createdAtUtc) | date: 'MMM d, h:mm a' }}</span>\n                      </div>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n            </ng-container>\n            <ng-template #opportunityGroupedView>\n              <ng-container *ngIf=\"opportunityGroupedActivities().length; else emptyState\">\n                <div class=\"grouped-activities\">\n                  <div class=\"grouped-activities__summary\">\n                    <span class=\"grouped-activities__label\">Grouped by Opportunity</span>\n                    <span class=\"grouped-activities__count\">{{ groupedOpportunityActivityCount() }} opportunit{{ groupedOpportunityActivityCount() === 1 ? 'y' : 'ies' }}</span>\n                  </div>\n\n                  <div class=\"lead-group-card\" *ngFor=\"let group of opportunityGroupedActivities()\">\n                    <div class=\"lead-group-card__header\">\n                      <div class=\"lead-group-card__identity\">\n                        <div class=\"lead-group-card__title-row\">\n                          <span class=\"lead-group-card__title\">{{ group.opportunityName }}</span>\n                          <a\n                            class=\"lead-group-card__lead-link\"\n                            [routerLink]=\"['/app/deals', group.opportunityId, 'edit']\"\n                            (click)=\"$event.stopPropagation()\"\n                          >\n                            <i class=\"pi pi-link\"></i>\n                            Open Opportunity\n                          </a>\n                        </div>\n                        <div class=\"lead-group-card__meta\">\n                          <span>{{ group.items.length }} activit{{ group.items.length === 1 ? 'y' : 'ies' }}</span>\n                          <span *ngIf=\"group.lastActivityAt\">\u2022 Last activity {{ asLocalDate(group.lastActivityAt) | date:'MMM d, h:mm a' }}</span>\n                        </div>\n                      </div>\n                      <div class=\"lead-group-card__stats\">\n                        <span class=\"group-chip neutral\">Open {{ group.openCount }}</span>\n                        <span class=\"group-chip success\">Done {{ group.completedCount }}</span>\n                        <span class=\"group-chip danger\" *ngIf=\"group.overdueCount\">Overdue {{ group.overdueCount }}</span>\n                      </div>\n                    </div>\n\n                    <div class=\"lead-group-card__items\">\n                      <button\n                        type=\"button\"\n                        class=\"lead-group-activity\"\n                        *ngFor=\"let row of group.items\"\n                        (click)=\"canManage() ? onEdit(row) : null\"\n                      >\n                        <div class=\"lead-group-activity__left\">\n                          <span class=\"type-badge\" [attr.data-type]=\"row.type\">\n                            <i class=\"pi\"\n                               [class.pi-phone]=\"row.type === 'Call'\"\n                               [class.pi-envelope]=\"row.type === 'Email'\"\n                               [class.pi-users]=\"row.type === 'Meeting'\"\n                               [class.pi-check-square]=\"row.type === 'Task'\"></i>\n                            {{ row.type }}\n                          </span>\n                          <span class=\"lead-group-activity__subject\">{{ row.subject }}</span>\n                        </div>\n                        <div class=\"lead-group-activity__right\">\n                          <span class=\"status-chip\"\n                                [class.upcoming]=\"row.status === 'Upcoming'\"\n                                [class.completed]=\"row.status === 'Completed'\"\n                                [class.overdue]=\"row.status === 'Overdue'\">\n                            {{ row.status }}\n                          </span>\n                          <span class=\"lead-group-activity__date\">{{ asLocalDate(row.completedDateUtc || row.dueDateUtc || row.createdAtUtc) | date: 'MMM d, h:mm a' }}</span>\n                        </div>\n                      </button>\n                    </div>\n                  </div>\n                </div>\n              </ng-container>\n            </ng-template>\n          </ng-container>\n\n          <ng-template #flatTableView>\n          <ng-container *ngIf=\"filteredActivities().length; else emptyState\">\n            <div class=\"table-responsive\">\n              <p-table class=\"data-table\" [value]=\"filteredActivities()\">\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th>Subject</th>\n                    <th>Type</th>\n                    <th>Related To</th>\n                    <th>Priority</th>\n                    <th>Due Date</th>\n                    <th>Status</th>\n                    <th>Owner</th>\n                    <th class=\"actions-col\">Actions</th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-row>\n                  <tr class=\"table-row\" (click)=\"canManage() ? onEdit(row) : null\">\n                    <td>\n                      <span class=\"subject-text\">{{ row.subject }}</span>\n                    </td>\n                    <td>\n                      <span class=\"type-badge\" [attr.data-type]=\"row.type\">\n                        <i class=\"pi\" \n                           [class.pi-phone]=\"row.type === 'Call'\"\n                           [class.pi-envelope]=\"row.type === 'Email'\"\n                           [class.pi-users]=\"row.type === 'Meeting'\"\n                           [class.pi-check-square]=\"row.type === 'Task'\"></i>\n                        {{ row.type }}\n                      </span>\n                    </td>\n                    <td>\n                      <div class=\"related-info\">\n                        <span class=\"related-type\">{{ relationLabel(row.relatedEntityType) }}</span>\n                        <span class=\"related-name\">{{ row.relatedEntityName || '\u2014' }}</span>\n                        <a\n                          *ngIf=\"relatedLink(row) as link\"\n                          class=\"related-link\"\n                          [routerLink]=\"link\"\n                          (click)=\"$event.stopPropagation()\"\n                        >\n                          <i class=\"pi pi-link\"></i>\n                          View\n                        </a>\n                      </div>\n                    </td>\n                    <td>\n                      <span class=\"priority-chip\" \n                            [class.high]=\"row.priority === 'High'\"\n                            [class.normal]=\"row.priority === 'Normal' || !row.priority\"\n                            [class.low]=\"row.priority === 'Low'\">\n                        {{ row.priority || 'Normal' }}\n                      </span>\n                    </td>\n                    <td>\n                      <span class=\"date-text\">{{ asLocalDate(row.dueDateUtc) | date: 'MMM d, h:mm a' }}</span>\n                    </td>\n                    <td>\n                      <span class=\"status-chip\"\n                            [class.upcoming]=\"row.status === 'Upcoming'\"\n                            [class.completed]=\"row.status === 'Completed'\"\n                            [class.overdue]=\"row.status === 'Overdue'\">\n                        {{ row.status }}\n                      </span>\n                    </td>\n                    <td>\n                      <span class=\"owner-text\">{{ row.ownerName || 'Unassigned' }}</span>\n                    </td>\n                    <td class=\"actions-col\">\n                      <div class=\"row-actions\">\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--complete\"\n                          [disabled]=\"!canMarkComplete(row)\"\n                          (click)=\"$event.stopPropagation(); markCompleted(row)\"\n                          title=\"Mark completed\"\n                        ><i class=\"pi pi-check\"></i></button>\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--edit\"\n                          [disabled]=\"!canManage()\"\n                          (click)=\"$event.stopPropagation(); onEdit(row)\"\n                          title=\"Edit\"\n                        ><i class=\"pi pi-pencil\"></i></button>\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--delete\"\n                          [disabled]=\"!canManage()\"\n                          (click)=\"$event.stopPropagation(); onDelete(row)\"\n                          title=\"Delete\"\n                        ><i class=\"pi pi-trash\"></i></button>\n                      </div>\n                    </td>\n                  </tr>\n                </ng-template>\n              </p-table>\n            </div>\n            \n            <!-- Pagination -->\n            <div class=\"pagination-bar\">\n              <span class=\"pagination-info\">\n                Showing {{ (pageIndex * rows) + 1 }}\u2013{{ Math.min((pageIndex + 1) * rows, total()) }} of {{ total() }}\n              </span>\n              <p-paginator\n                [rows]=\"rows\"\n                [totalRecords]=\"total()\"\n                [first]=\"pageIndex * rows\"\n                (onPageChange)=\"onPageChange($event)\"\n                [showFirstLastIcon]=\"false\"\n                [showPageLinks]=\"true\"\n                [pageLinkSize]=\"5\"\n              ></p-paginator>\n            </div>\n          </ng-container>\n          </ng-template>\n        </ng-container>\n\n        <ng-template #loadingState>\n          <div class=\"loading-skeleton\">\n            <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5]\">\n              <div class=\"skeleton\"></div>\n            </div>\n          </div>\n        </ng-template>\n\n        <ng-template #emptyState>\n          <div class=\"empty-state\">\n            <div class=\"empty-icon\">\n              <i class=\"pi pi-calendar\"></i>\n            </div>\n            <h3 class=\"empty-title\">No activities found</h3>\n            <p class=\"empty-text\">Create your first activity to start tracking calls, emails, and meetings.</p>\n            <button pButton type=\"button\" class=\"btn-primary\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n              <i class=\"pi pi-plus\"></i>\n              New Activity\n            </button>\n          </div>\n        </ng-template>\n      </div>\n    </section>\n\n    <!-- Calendar + Tasks -->\n    <section class=\"calendar-section\" *ngIf=\"currentView() === 'calendar'\">\n      <div class=\"calendar-shell glass-card\">\n        <header class=\"calendar-header\">\n          <div>\n            <p class=\"eyebrow\">Schedule</p>\n            <h2>{{ calendarMonthLabel() }}</h2>\n            <p class=\"muted\">{{ selectedDateLabel() }}</p>\n          </div>\n          <div class=\"calendar-actions\">\n            <button pButton type=\"button\" class=\"btn-icon\" (click)=\"previousMonth()\" title=\"Previous month\">\n              <i class=\"pi pi-angle-left\"></i>\n            </button>\n            <button pButton type=\"button\" class=\"btn-icon\" (click)=\"goToToday()\" title=\"Today\">\n              <i class=\"pi pi-calendar\"></i>\n            </button>\n            <button pButton type=\"button\" class=\"btn-icon\" (click)=\"nextMonth()\" title=\"Next month\">\n              <i class=\"pi pi-angle-right\"></i>\n            </button>\n          </div>\n        </header>\n        <div class=\"calendar-grid\">\n          <div class=\"calendar-weekday\" *ngFor=\"let day of weekdayLabels\">{{ day }}</div>\n          <button\n            pButton\n            type=\"button\"\n            class=\"calendar-day\"\n            *ngFor=\"let day of calendarDays()\"\n            [class.is-outside]=\"!day.isCurrentMonth\"\n            [class.is-today]=\"day.isToday\"\n            [class.is-selected]=\"day.isSelected\"\n            (click)=\"selectDate(day.date)\"\n          >\n            <span class=\"day-number\">{{ day.date.getDate() }}</span>\n            <span class=\"day-count\" *ngIf=\"day.items.length\">{{ day.items.length }}</span>\n          </button>\n        </div>\n      </div>\n\n      <aside class=\"calendar-panel\">\n        <div class=\"panel-card\">\n          <header>\n            <h3>Tasks for {{ selectedDateLabel() }}</h3>\n            <span class=\"pill\">{{ selectedDayTasks().length }}</span>\n          </header>\n          <div class=\"task-list\" *ngIf=\"selectedDayTasks().length; else noTasks\">\n            <div class=\"task-item\" *ngFor=\"let task of selectedDayTasks()\">\n              <div>\n                <strong>{{ task.subject }}</strong>\n                <small>{{ task.status }}</small>\n              </div>\n              <span class=\"task-type\">{{ task.type }}</span>\n            </div>\n          </div>\n          <ng-template #noTasks>\n            <p class=\"empty-text\">No tasks scheduled for this day.</p>\n          </ng-template>\n        </div>\n\n        <div class=\"panel-card\">\n          <header>\n            <h3>Open tasks</h3>\n            <span class=\"pill\">{{ openTasks().length }}</span>\n          </header>\n          <div class=\"task-list\" *ngIf=\"openTasksPreview().length; else noOpenTasks\">\n            <div class=\"task-item\" *ngFor=\"let task of openTasksPreview()\">\n              <div>\n                <strong>{{ task.subject }}</strong>\n                <small>{{ task.dueDateUtc ? (asLocalDate(task.dueDateUtc) | date: 'MMM d, h:mm a') : 'No due date' }}</small>\n              </div>\n              <span class=\"task-type\">{{ task.type }}</span>\n            </div>\n          </div>\n          <ng-template #noOpenTasks>\n            <p class=\"empty-text\">All caught up.</p>\n          </ng-template>\n        </div>\n      </aside>\n    </section>\n\n    <section class=\"tasks-section\" *ngIf=\"currentView() === 'tasks'\">\n        <div class=\"tasks-header glass-card\">\n          <div>\n            <p class=\"eyebrow\">Tasks</p>\n            <h2>Execution queue</h2>\n            <p class=\"muted\">Focused list of open and completed tasks.</p>\n          </div>\n          <button pButton type=\"button\" class=\"btn-primary\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n            <i class=\"pi pi-plus\"></i>\n            Add Task\n          </button>\n        </div>\n\n      <div class=\"tasks-grid\">\n        <article class=\"tasks-column\">\n          <header>\n            <span>Due today</span>\n            <strong>{{ tasksToday().length }}</strong>\n          </header>\n          <button pButton type=\"button\" class=\"task-card\" *ngFor=\"let task of tasksToday()\" [disabled]=\"!canManage()\" (click)=\"onEdit(task)\">\n            <div>\n              <strong>{{ task.subject }}</strong>\n              <small>{{ task.dueDateUtc ? (asLocalDate(task.dueDateUtc) | date: 'MMM d, h:mm a') : 'No due date' }}</small>\n            </div>\n            <span class=\"status-tag status-tag--today\">Today</span>\n          </button>\n          <p class=\"empty-text\" *ngIf=\"!tasksToday().length\">No tasks due today.</p>\n        </article>\n\n        <article class=\"tasks-column\">\n          <header>\n            <span>Overdue</span>\n            <strong>{{ tasksOverdue().length }}</strong>\n          </header>\n          <button pButton type=\"button\" class=\"task-card\" *ngFor=\"let task of tasksOverdue()\" [disabled]=\"!canManage()\" (click)=\"onEdit(task)\">\n            <div>\n              <strong>{{ task.subject }}</strong>\n              <small>{{ task.dueDateUtc ? (asLocalDate(task.dueDateUtc) | date: 'MMM d, h:mm a') : 'No due date' }}</small>\n            </div>\n            <span class=\"status-tag status-tag--overdue\">Overdue</span>\n          </button>\n          <p class=\"empty-text\" *ngIf=\"!tasksOverdue().length\">Nothing overdue.</p>\n        </article>\n\n        <article class=\"tasks-column\">\n          <header>\n            <span>Upcoming</span>\n            <strong>{{ tasksUpcoming().length }}</strong>\n          </header>\n          <button pButton type=\"button\" class=\"task-card\" *ngFor=\"let task of tasksUpcoming()\" [disabled]=\"!canManage()\" (click)=\"onEdit(task)\">\n            <div>\n              <strong>{{ task.subject }}</strong>\n              <small>{{ task.dueDateUtc ? (asLocalDate(task.dueDateUtc) | date: 'MMM d, h:mm a') : 'No due date' }}</small>\n            </div>\n            <span class=\"status-tag status-tag--upcoming\">Upcoming</span>\n          </button>\n          <p class=\"empty-text\" *ngIf=\"!tasksUpcoming().length\">No upcoming tasks.</p>\n        </article>\n\n        <article class=\"tasks-column tasks-column--completed\">\n          <header>\n            <span>Completed</span>\n            <strong>{{ tasksCompleted().length }}</strong>\n          </header>\n          <button pButton type=\"button\" class=\"task-card\" *ngFor=\"let task of tasksCompleted()\" [disabled]=\"!canManage()\" (click)=\"onEdit(task)\">\n            <div>\n              <strong>{{ task.subject }}</strong>\n              <small>{{ task.completedDateUtc ? (asLocalDate(task.completedDateUtc) | date: 'MMM d, h:mm a') : 'Completed' }}</small>\n            </div>\n            <span class=\"status-tag status-tag--done\">Done</span>\n          </button>\n          <p class=\"empty-text\" *ngIf=\"!tasksCompleted().length\">No completed tasks.</p>\n        </article>\n      </div>\n    </section>\n  </div>\n</div>\n\n<!-- Mobile FAB -->\n<button pButton type=\"button\" class=\"fab\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n  <i class=\"pi pi-plus\"></i>\n</button>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACTIVITIES PAGE - macOS Glassmorphism Design\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../../styles/design-tokens' as *;\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// GLASSMORPHISM VARIABLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n$glass-bg: rgba(255, 255, 255, 0.72);\n$glass-bg-hover: rgba(255, 255, 255, 0.85);\n$glass-blur: 24px;\n$glass-border-light: rgba(255, 255, 255, 0.5);\n$glass-border-dark: rgba(0, 0, 0, 0.06);\n$glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), \n               0 2px 8px rgba(0, 0, 0, 0.04),\n               inset 0 1px 0 rgba(255, 255, 255, 0.6);\n$glass-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.12),\n                     0 4px 12px rgba(0, 0, 0, 0.06),\n                     inset 0 1px 0 rgba(255, 255, 255, 0.8);\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE BACKGROUND - Vibrant gradient with floating orbs\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-background {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n\n  .animated-orb {\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(100px);\n    opacity: 0.7;\n    animation: float 25s ease-in-out infinite;\n\n    &.orb-1 {\n      width: 500px;\n      height: 500px;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      top: -150px;\n      right: -100px;\n    }\n\n    &.orb-2 {\n      width: 400px;\n      height: 400px;\n      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);\n      bottom: 10%;\n      left: -100px;\n      animation-delay: -8s;\n    }\n\n    &.orb-3 {\n      width: 350px;\n      height: 350px;\n      background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);\n      bottom: -80px;\n      right: 20%;\n      animation-delay: -16s;\n    }\n  }\n\n  .grid-pattern {\n    position: absolute;\n    inset: 0;\n    background-image: \n      linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);\n    background-size: 60px 60px;\n    opacity: 0.5;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CALENDAR VIEW\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.calendar-section {\n  display: grid;\n  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.9fr);\n  gap: 24px;\n  align-items: start;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.tasks-section {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.tasks-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 20px 24px;\n\n  h2 {\n    margin: 4px 0 0;\n    font-size: 22px;\n    font-weight: 700;\n    color: #1a1a2e;\n  }\n\n  .eyebrow {\n    margin: 0;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .muted {\n    margin: 4px 0 0;\n    color: $gray-500;\n    font-size: 13px;\n  }\n}\n\n.tasks-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.tasks-column {\n  background: $glass-bg;\n  border: 1px solid $glass-border-light;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: $glass-shadow;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n\n    span {\n      font-size: 13px;\n      color: $gray-500;\n      font-weight: 600;\n    }\n\n    strong {\n      font-size: 20px;\n      font-weight: 700;\n      color: #1a1a2e;\n    }\n  }\n}\n\n.tasks-column--completed {\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.task-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 24px rgba(99, 102, 241, 0.12);\n  }\n\n  strong {\n    display: block;\n    font-size: 13px;\n    color: #1f2937;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: 12px;\n  }\n}\n\n.status-tag {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 8px;\n  border-radius: 999px;\n  text-transform: uppercase;\n\n  &--today {\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n  }\n\n  &--overdue {\n    background: rgba($danger, 0.15);\n    color: $danger;\n  }\n\n  &--upcoming {\n    background: rgba($purple, 0.15);\n    color: $purple;\n  }\n\n  &--done {\n    background: rgba($success, 0.15);\n    color: $success;\n  }\n}\n\n.calendar-shell {\n  padding: 20px 22px;\n}\n\n.calendar-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 18px;\n\n  h2 {\n    margin: 4px 0 0;\n    font-size: 22px;\n    font-weight: 700;\n    color: #1a1a2e;\n  }\n\n  .eyebrow {\n    margin: 0;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .muted {\n    margin: 4px 0 0;\n    color: $gray-500;\n    font-size: 13px;\n  }\n}\n\n.calendar-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.calendar-grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 8px;\n}\n\n.calendar-weekday {\n  font-size: 12px;\n  font-weight: 600;\n  color: $gray-500;\n  text-align: center;\n  padding-bottom: 6px;\n}\n\n.calendar-day {\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  border-radius: 12px;\n  padding: 10px 8px;\n  min-height: 70px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    background: $glass-bg-hover;\n    border-color: rgba($purple, 0.2);\n    transform: translateY(-1px);\n  }\n\n  &.is-outside {\n    opacity: 0.4;\n  }\n\n  &.is-today {\n    border-color: rgba($cyan, 0.45);\n    box-shadow: inset 0 0 0 1px rgba($cyan, 0.3);\n  }\n\n  &.is-selected {\n    border-color: rgba($purple, 0.5);\n    box-shadow: 0 6px 16px rgba($purple, 0.2);\n  }\n}\n\n.day-number {\n  font-size: 14px;\n  font-weight: 600;\n  color: #1f2937;\n}\n\n.day-count {\n  font-size: 11px;\n  font-weight: 700;\n  color: white;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  padding: 2px 6px;\n  border-radius: 999px;\n}\n\n.calendar-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.panel-card {\n  background: $glass-bg;\n  border: 1px solid $glass-border-light;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: $glass-shadow;\n\n  header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    margin-bottom: 10px;\n\n    h3 {\n      margin: 0;\n      font-size: 15px;\n      font-weight: 700;\n      color: #1a1a2e;\n    }\n  }\n\n  .pill {\n    background: rgba($purple, 0.12);\n    color: $purple;\n    font-size: 12px;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: 999px;\n  }\n}\n\n.task-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.task-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n\n  strong {\n    display: block;\n    font-size: 13px;\n    color: #1f2937;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: 12px;\n  }\n}\n\n.task-type {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: $gray-500;\n}\n\n@keyframes float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.98); }\n  75% { transform: translate(-30px, -15px) scale(1.02); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE CONTAINER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-container {\n  position: relative;\n  z-index: 1;\n  min-height: 100vh;\n  padding: 28px 36px;\n\n  @media (max-width: 768px) {\n    padding: 16px;\n  }\n}\n\n.page-content {\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE HEADER - Glass header bar\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 28px;\n  padding: 20px 28px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 20px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n\n.header-left {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.5);\n\n  i {\n    font-size: 9px;\n    opacity: 0.6;\n  }\n\n  .breadcrumb-current {\n    color: $purple;\n    font-weight: 600;\n  }\n}\n\n.page-title {\n  margin: 0;\n\n  .gradient-icon {\n    font-size: 26px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n}\n\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// GLASS BUTTONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.btn-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  border: 1px solid $glass-border-light;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  color: #64748b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($purple, 0.3);\n    color: $purple;\n    transform: translateY(-2px);\n    box-shadow: 0 6px 16px rgba($purple, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  }\n\n  i {\n    font-size: 16px;\n  }\n}\n\n.btn-primary {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 22px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4),\n              inset 0 1px 0 rgba(255, 255, 255, 0.2);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5),\n                inset 0 1px 0 rgba(255, 255, 255, 0.3);\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// KPI STRIP - Glass metric cards\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.kpi-strip {\n  display: flex;\n  align-items: stretch;\n  gap: 12px;\n  margin-bottom: 24px;\n  overflow-x: auto;\n  padding: 4px;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n}\n\n.kpi-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 22px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 18px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  transition: all 0.25s ease;\n  position: relative;\n  flex: 1;\n  min-width: 160px;\n\n  &.clickable {\n    cursor: pointer;\n\n    &:hover {\n      background: $glass-bg-hover;\n      transform: translateY(-3px);\n      box-shadow: $glass-shadow-hover;\n    }\n\n    &.active {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n      border-color: rgba(102, 126, 234, 0.3);\n      \n      .kpi-value {\n        color: #667eea;\n      }\n    }\n  }\n}\n\n.kpi-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n\n  i {\n    font-size: 20px;\n  }\n\n  &.total {\n    background: linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(100, 116, 139, 0.1) 100%);\n    color: #64748b;\n  }\n\n  &.upcoming {\n    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);\n    color: #06b6d4;\n  }\n\n  &.duetoday {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);\n    color: #f59e0b;\n  }\n\n  &.overdue {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);\n    color: #ef4444;\n  }\n\n  &.completed {\n    background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);\n    color: #22c55e;\n  }\n}\n\n.kpi-data {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.kpi-value {\n  font-size: 26px;\n  font-weight: 700;\n  color: #1a1a2e;\n  line-height: 1;\n  letter-spacing: -0.5px;\n}\n\n.kpi-label {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.5);\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.kpi-badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 6px;\n  border-radius: 11px;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &.info {\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);\n  }\n\n  &.danger {\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);\n  }\n\n  &.success {\n    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n    color: white;\n    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);\n  }\n}\n\n.kpi-divider {\n  width: 1px;\n  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);\n  margin: 8px 0;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TOOLBAR - Glass search & filters\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.toolbar-section {\n  margin-bottom: 20px;\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 16px 24px;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: 18px;\n  border: 1px solid $glass-border-light;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n}\n\n.toolbar-left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n\n.toolbar-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.search-box {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid $glass-border-light;\n  border-radius: 12px;\n  transition: all 0.2s ease;\n  min-width: 260px;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($purple, 0.4);\n    box-shadow: 0 0 0 4px rgba($purple, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.02);\n  }\n\n  i {\n    color: rgba(0, 0, 0, 0.35);\n    font-size: 14px;\n  }\n\n  input {\n    border: none;\n    background: transparent;\n    outline: none;\n    font-size: 14px;\n    color: #1a1a2e;\n    width: 100%;\n\n    &::placeholder {\n      color: rgba(0, 0, 0, 0.35);\n    }\n  }\n}\n\n.filter-pills {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1px solid $glass-border-light;\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  color: #64748b;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  i {\n    font-size: 12px;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba($purple, 0.3);\n    color: $purple;\n  }\n\n  &.active {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    border-color: transparent;\n    color: white;\n    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n  }\n}\n\n.view-toggle {\n  display: flex;\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid $glass-border-light;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  button {\n    padding: 10px 14px;\n    border: none;\n    background: transparent;\n    color: #64748b;\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n      color: $purple;\n      background: rgba(255, 255, 255, 0.5);\n    }\n\n    &.active {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n    }\n\n    i {\n      font-size: 14px;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA TABLE - Glass table card\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.table-section {\n  margin-bottom: 20px;\n}\n\n.grouped-activities {\n  display: grid;\n  gap: 16px;\n}\n\n.grouped-activities__summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.55);\n}\n\n.grouped-activities__label {\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.grouped-activities__count {\n  font-size: 12px;\n  color: rgba(51, 65, 85, 0.85);\n  font-weight: 600;\n}\n\n.lead-group-card {\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.65);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n}\n\n.lead-group-card__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 16px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));\n}\n\n.lead-group-card__identity {\n  min-width: 0;\n  display: grid;\n  gap: 4px;\n}\n\n.lead-group-card__title-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.lead-group-card__title {\n  font-size: 15px;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.lead-group-card__lead-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: #2563eb;\n  text-decoration: none;\n}\n\n.lead-group-card__lead-link:hover {\n  text-decoration: underline;\n}\n\n.lead-group-card__meta {\n  font-size: 12px;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.lead-group-card__stats {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.group-chip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  padding: 4px 8px;\n  font-size: 11px;\n  font-weight: 700;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n\n.group-chip.neutral {\n  background: rgba(241, 245, 249, 0.9);\n  color: #475569;\n}\n\n.group-chip.success {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n}\n\n.group-chip.danger {\n  background: rgba(254, 226, 226, 0.92);\n  color: #991b1b;\n}\n\n.lead-group-card__items {\n  display: grid;\n}\n\n.lead-group-activity {\n  width: 100%;\n  border: 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 12px 16px;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.16s ease;\n}\n\n.lead-group-card__items .lead-group-activity:first-child {\n  border-top: 0;\n}\n\n.lead-group-activity:hover {\n  background: rgba(255, 255, 255, 0.55);\n}\n\n.lead-group-activity__left {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.lead-group-activity__subject {\n  min-width: 0;\n  color: #1f2937;\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.lead-group-activity__right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-shrink: 0;\n}\n\n.lead-group-activity__date {\n  font-size: 12px;\n  color: rgba(71, 85, 105, 0.85);\n  white-space: nowrap;\n}\n\n@media (max-width: 900px) {\n  .lead-group-card__header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .lead-group-card__stats {\n    justify-content: flex-start;\n  }\n\n  .lead-group-activity {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .lead-group-activity__right {\n    justify-content: space-between;\n  }\n}\n\n.glass-card {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border-light;\n  border-radius: 20px;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.table-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 18px 24px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: rgba(255, 255, 255, 0.3);\n}\n\n.table-title {\n  font-size: 15px;\n  font-weight: 600;\n  color: #1a1a2e;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 0;\n\n  i {\n    color: #667eea;\n  }\n}\n\n.table-count {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.5);\n  background: rgba(0, 0, 0, 0.05);\n  padding: 5px 14px;\n  border-radius: 20px;\n  font-weight: 500;\n}\n\n.table-responsive {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n\n  th {\n    padding: 14px 20px;\n    text-align: left;\n    font-size: 0.72rem;\n    font-weight: 600;\n    color: #3b82f6;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    white-space: nowrap;\n  }\n\n  td {\n    padding: 16px 20px;\n    font-size: 14px;\n    color: #374151;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    vertical-align: middle;\n  }\n\n  tr {\n    transition: all 0.2s ease;\n\n    &:hover {\n      background: rgba(102, 126, 234, 0.04);\n    }\n\n    &:last-child td {\n      border-bottom: none;\n    }\n  }\n\n  .actions-col {\n    width: 100px;\n    text-align: center;\n  }\n}\n\n.subject-cell {\n  font-weight: 600;\n  color: #1a1a2e;\n}\n\n.type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n\n  i {\n    font-size: 11px;\n  }\n\n  &[data-type=\"Call\"] {\n    background: rgba(34, 197, 94, 0.15);\n    color: #16a34a;\n  }\n\n  &[data-type=\"Email\"] {\n    background: rgba(6, 182, 212, 0.15);\n    color: #0891b2;\n  }\n\n  &[data-type=\"Meeting\"] {\n    background: rgba(139, 92, 246, 0.15);\n    color: #7c3aed;\n  }\n\n  &[data-type=\"Task\"] {\n    background: rgba(102, 126, 234, 0.15);\n    color: #4f46e5;\n  }\n}\n\n.related-cell,\n.related-info {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.related-type {\n  font-size: 10px;\n  color: rgba(0, 0, 0, 0.4);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.related-name {\n  font-size: 14px;\n  color: #374151;\n}\n\n.related-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n}\n\n.related-link i {\n  font-size: 12px;\n}\n\n.related-link:hover {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n\n.priority-badge {\n  display: inline-flex;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &.high {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n  }\n\n  &.normal {\n    background: rgba(100, 116, 139, 0.12);\n    color: #475569;\n  }\n\n  &.low {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n}\n\n.status-chip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n\n  &.overdue {\n    background: rgba(239, 68, 68, 0.15);\n    color: #dc2626;\n  }\n\n  &.upcoming {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0ea5e9;\n  }\n\n  &.completed {\n    background: rgba(34, 197, 94, 0.14);\n    color: #16a34a;\n  }\n}\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &::before {\n    content: '';\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n  }\n\n  &.success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n    &::before { background: #22c55e; }\n  }\n\n  &.info {\n    background: rgba(6, 182, 212, 0.12);\n    color: #0891b2;\n    &::before { background: #06b6d4; }\n  }\n\n  &.warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n    &::before { background: #f59e0b; }\n  }\n\n  &.danger {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n    &::before { background: #ef4444; }\n  }\n}\n\n.date-cell {\n  font-size: 14px;\n  color: #64748b;\n}\n\n.owner-cell {\n  font-size: 14px;\n  color: #64748b;\n}\n\n.row-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 6px;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING & EMPTY STATES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.loading-state {\n  padding: 40px;\n}\n\n.skeleton-row {\n  margin-bottom: 12px;\n\n  .skeleton {\n    height: 60px;\n    background: linear-gradient(90deg, \n      rgba(0, 0, 0, 0.04) 25%, \n      rgba(0, 0, 0, 0.08) 50%, \n      rgba(0, 0, 0, 0.04) 75%);\n    background-size: 200% 100%;\n    animation: shimmer 1.5s infinite;\n    border-radius: 12px;\n  }\n}\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  text-align: center;\n}\n\n.empty-icon {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);\n\n  i {\n    font-size: 40px;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n}\n\n.empty-title {\n  font-size: 20px;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin-bottom: 8px;\n}\n\n.empty-description {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.5);\n  max-width: 380px;\n  margin-bottom: 28px;\n  line-height: 1.6;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGINATION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.pagination-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  background: rgba(255, 255, 255, 0.3);\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.pagination-info {\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FAB (Mobile)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.fab {\n  position: fixed;\n  bottom: 28px;\n  right: 28px;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  cursor: pointer;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.5),\n              inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  transition: all 0.3s ease;\n  z-index: 1000;\n\n  i {\n    font-size: 24px;\n  }\n\n  &:hover {\n    transform: scale(1.1);\n    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);\n  }\n\n  @media (max-width: 768px) {\n    display: flex;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DIALOG & FORM - Glass modal\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.activity-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n\n  @media (max-width: 480px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.form-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n}\n\n.form-input {\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n  font-size: 14px;\n  background: rgba(255, 255, 255, 0.8);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  transition: all 0.2s ease;\n\n  &::placeholder {\n    color: rgba(0, 0, 0, 0.35);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: rgba($purple, 0.4);\n    background: white;\n    box-shadow: 0 0 0 4px rgba($purple, 0.1);\n  }\n\n  &.textarea {\n    resize: vertical;\n    min-height: 120px;\n  }\n}\n\n.dialog-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESPONSIVE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media (max-width: 1024px) {\n  .kpi-strip {\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .kpi-card {\n    flex: 0 0 auto;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 16px 20px;\n  }\n\n  .header-right {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    width: 100%;\n  }\n\n  .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n    padding: 16px 20px;\n  }\n\n  .toolbar-left {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-box {\n    min-width: 100%;\n  }\n\n  .filter-pills {\n    justify-content: flex-start;\n  }\n\n  .toolbar-right {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    width: 100%;\n  }\n\n  // Keep view toggles usable on narrow screens without overflow.\n  .view-toggle {\n    width: 100%;\n    justify-content: space-between;\n\n    button {\n      flex: 1 1 0;\n    }\n  }\n\n  .btn-primary {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .toolbar-right .filter-select {\n    width: 100%;\n  }\n}\n\n@media (max-width: 640px) {\n  // Tighten the calendar and table layouts for small phones.\n  .calendar-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .calendar-actions {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .calendar-grid {\n    gap: 6px;\n  }\n\n  .calendar-day {\n    min-height: 56px;\n    padding: 8px 6px;\n  }\n\n  .tasks-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .tasks-header .btn-primary {\n    width: 100%;\n  }\n\n  .data-table {\n    min-width: 760px;\n  }\n\n  .kpi-card {\n    min-width: 140px;\n  }\n}\n"] }]
    }], () => [{ type: i1.ActivityDataService }, { type: i2.CustomerDataService }, { type: i3.ContactDataService }, { type: i4.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ActivitiesPage, { className: "ActivitiesPage", filePath: "src/app/crm/features/activities/pages/activities.page.ts", lineNumber: 73 }); })();
