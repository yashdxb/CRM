import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/api";
import * as i4 from "primeng/select";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/button";
import * as i7 from "primeng/textarea";
import * as i8 from "primeng/confirmdialog";
import * as i9 from "primeng/table";
const _c0 = () => ({ "min-width": "100%" });
const _c1 = () => [1, 2, 3, 4, 5, 6];
function OpportunityApprovalsPage_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "My Approval");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 48);
    i0.ɵɵtext(3, "Requests");
    i0.ɵɵelementEnd();
} }
function OpportunityApprovalsPage_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "Pending Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 48);
    i0.ɵɵtext(3, "Center");
    i0.ɵɵelementEnd();
} }
function OpportunityApprovalsPage_article_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 49)(1, "span", 50);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 51);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", "command-metric-card--" + metric_r2.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r2.value);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 104);
    i0.ɵɵtext(1, "My queue");
    i0.ɵɵelementEnd();
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 Step ", item_r4.workflowStepOrder);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 Step ", item_r4.workflowStepOrder);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 110)(1, "span", 108);
    i0.ɵɵtext(2, "Decision note");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 111);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Conditional_24_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r6); const item_r4 = i0.ɵɵnextContext(2).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r4.noteInputs[item_r4.id], $event) || (ctx_r4.noteInputs[item_r4.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Conditional_24_Template_textarea_click_3_listener($event) { i0.ɵɵrestoreView(_r6); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("autoResize", true);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r4.noteInputs[item_r4.id]);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 105)(1, "div", 106)(2, "div", 107)(3, "span", 108);
    i0.ɵɵtext(4, "Business impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 107)(8, "span", 108);
    i0.ɵɵtext(9, "Policy reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 109)(13, "div", 107)(14, "span", 108);
    i0.ɵɵtext(15, "Workflow context");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵtemplate(18, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_span_18_Template, 2, 1, "span", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 107)(20, "span", 108);
    i0.ɵɵtext(21, "Decision type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(24, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Conditional_24_Template, 4, 2, "label", 110);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r4.businessImpactLabel || "Affects forecast and approval governance.");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r4.policyReason || "Policy review is required before the deal can advance.");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.workflowLabel(item_r4), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r4.workflowStepOrder);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r4.humanizeDecisionType(item_r4.decisionType));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r4.canManage() ? 24 : -1);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 112);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_58_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r4 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.requestInfo(item_r4)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.isActioning(item_r4.id));
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_60_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 113);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_60_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const item_r4 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.decide(item_r4, false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 114);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_60_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const item_r4 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.decide(item_r4, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.isActioning(item_r4.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("loading", ctx_r4.isActioning(item_r4.id))("disabled", ctx_r4.isActioning(item_r4.id));
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 66);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Template_article_click_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.selectDecision(item_r4)); });
    i0.ɵɵelementStart(1, "div", 67)(2, "div", 68)(3, "div", 69)(4, "span", 70);
    i0.ɵɵelement(5, "i", 71);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 72);
    i0.ɵɵelement(8, "i", 73);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 74)(11, "h3", 75);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_span_13_Template, 2, 0, "span", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 77);
    i0.ɵɵelement(15, "i", 78);
    i0.ɵɵtext(16);
    i0.ɵɵtemplate(17, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_span_17_Template, 2, 1, "span", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 80)(19, "div", 81);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 82);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "p", 83);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 84);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 85)(28, "div", 86)(29, "span", 87);
    i0.ɵɵelement(30, "i", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 89);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 90)(34, "span", 87);
    i0.ɵɵelement(35, "i", 91);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 89);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 92)(39, "span", 87);
    i0.ɵɵelement(40, "i", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 89);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(43, "div", 94)(44, "span", 95);
    i0.ɵɵelement(45, "i", 96);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "span", 95);
    i0.ɵɵelement(48, "i", 97);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span", 95);
    i0.ɵɵelement(51, "i", 98);
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span", 95);
    i0.ɵɵelement(54, "i", 99);
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(56, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_div_56_Template, 25, 6, "div", 100);
    i0.ɵɵelementStart(57, "div", 101);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Template_div_click_57_listener($event) { i0.ɵɵrestoreView(_r3); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵconditionalCreate(58, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_58_Template, 1, 1, "button", 102);
    i0.ɵɵelementStart(59, "button", 103);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Template_button_click_59_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.openOpportunity(item_r4)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(60, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Conditional_60_Template, 2, 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("is-selected", ctx_r4.isSelected(item_r4))("tone-critical", ctx_r4.queueCardTone(item_r4) === "critical")("tone-warn", ctx_r4.queueCardTone(item_r4) === "warn");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.compactWorkflowLabel(item_r4), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.purposeLabel(item_r4), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r4.opportunityName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.isMyDecision(item_r4));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r4.accountName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r4.workflowStepOrder);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.amountLabel(item_r4));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-overdue", item_r4.slaStatus === "overdue");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r4.slaLabel(item_r4), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.actionSummary(item_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.compactPolicySummary(item_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", (item_r4.riskLevel || "low").toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.riskLabel(item_r4));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", (item_r4.priority || "normal").toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.priorityLabel(item_r4));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", item_r4.slaStatus);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.dueBadgeLabel(item_r4));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.requesterLabel(item_r4), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r4.approverRole || "Approver", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.relativeTime(item_r4.requestedOn), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.metaDueLabel(item_r4), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.isSelected(item_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r4.canManage() ? 58 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r4.canManage() ? 60 : -1);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtemplate(1, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_article_1_Template, 61, 31, "article", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lane_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", lane_r9.items)("ngForTrackBy", ctx_r4.trackByApprovalId);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Deal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Requester");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Value");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "SLA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd()();
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 128);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_32_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const item_r11 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.requestInfo(item_r11)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.isActioning(item_r11.id));
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 129);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const item_r11 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.decide(item_r11, false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 130);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_34_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r13); const item_r11 = i0.ɵɵnextContext().$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.decide(item_r11, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r4.isActioning(item_r11.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("loading", ctx_r4.isActioning(item_r11.id))("disabled", ctx_r4.isActioning(item_r11.id));
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 119);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Template_tr_click_0_listener() { const item_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.selectDecision(item_r11)); });
    i0.ɵɵelementStart(1, "td")(2, "div", 120)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td")(8, "div", 121)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "td")(12, "div", 121)(13, "span", 122);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "td")(16, "div", 121)(17, "span", 123);
    i0.ɵɵelement(18, "i", 88);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "td")(21, "div", 121)(22, "span", 123);
    i0.ɵɵelement(23, "i", 91);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "td")(26, "div", 121)(27, "span", 123);
    i0.ɵɵelement(28, "i", 93);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "td", 124);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Template_td_click_30_listener($event) { i0.ɵɵrestoreView(_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(31, "div", 125);
    i0.ɵɵconditionalCreate(32, OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_32_Template, 1, 1, "button", 126);
    i0.ɵɵelementStart(33, "button", 127);
    i0.ɵɵlistener("click", function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Template_button_click_33_listener() { const item_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r4 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r4.openOpportunity(item_r11)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(34, OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Conditional_34_Template, 2, 3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("is-selected", ctx_r4.isSelected(item_r11));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r11.opportunityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r11.accountName, " \u00B7 ", ctx_r4.compactWorkflowLabel(item_r11));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.requesterLabel(item_r11));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.amountLabel(item_r11));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", (item_r11.riskLevel || "low").toLowerCase());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.riskLabel(item_r11), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", (item_r11.priority || "normal").toLowerCase());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.priorityLabel(item_r11), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", item_r11.slaStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.slaLabel(item_r11), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r4.canManage() ? 32 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r4.canManage() ? 34 : -1);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 115)(1, "p-table", 116);
    i0.ɵɵtemplate(2, OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_2_Template, 15, 0, "ng-template", 117)(3, OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_ng_template_3_Template, 35, 15, "ng-template", 118);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lane_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", lane_r9.items)("tableStyle", i0.ɵɵpureFunction0(2, _c0));
} }
function OpportunityApprovalsPage_ng_container_78_section_1_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 55)(1, "header", 56)(2, "div", 57)(3, "span", 58);
    i0.ɵɵelement(4, "i", 59);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 60);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 61)(9, "span", 62);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 62);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, OpportunityApprovalsPage_ng_container_78_section_1_article_1_div_13_Template, 2, 2, "div", 63)(14, OpportunityApprovalsPage_ng_container_78_section_1_article_1_ng_template_14_Template, 4, 3, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lane_r9 = ctx.$implicit;
    const tableMode_r14 = i0.ɵɵreference(15);
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("lane-card--danger", lane_r9.tone === "danger")("lane-card--warn", lane_r9.tone === "warn");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(lane_r9.icon);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", lane_r9.title, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lane_r9.subtitle);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.laneLabel(lane_r9));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.laneValueLabel(lane_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.viewMode() === "cards")("ngIfElse", tableMode_r14);
} }
function OpportunityApprovalsPage_ng_container_78_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 53);
    i0.ɵɵtemplate(1, OpportunityApprovalsPage_ng_container_78_section_1_article_1_Template, 16, 12, "article", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.laneGroups())("ngForTrackBy", ctx_r4.trackByLaneKey);
} }
function OpportunityApprovalsPage_ng_container_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, OpportunityApprovalsPage_ng_container_78_section_1_Template, 2, 2, "section", 52);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const emptyState_r15 = i0.ɵɵreference(83);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r4.laneGroups().length)("ngIfElse", emptyState_r15);
} }
function OpportunityApprovalsPage_ng_template_79_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 133);
} }
function OpportunityApprovalsPage_ng_template_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 131);
    i0.ɵɵtemplate(1, OpportunityApprovalsPage_ng_template_79_div_1_Template, 1, 0, "div", 132);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function OpportunityApprovalsPage_ng_template_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 134)(1, "div", 135);
    i0.ɵɵelement(2, "i", 136);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r4.emptyListMessage());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.emptyDetailSubtitle());
} }
export class OpportunityApprovalsPage {
    approvalService = inject(OpportunityApprovalService);
    toastService = inject(AppToastService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    destroyRef = inject(DestroyRef);
    confirmationService = inject(ConfirmationService);
    userAdminData = inject(UserAdminDataService);
    currentUserId = readUserId();
    approvals = signal([], ...(ngDevMode ? [{ debugName: "approvals" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    selectedApprovalId = signal(null, ...(ngDevMode ? [{ debugName: "selectedApprovalId" }] : []));
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    viewMode = signal('table', ...(ngDevMode ? [{ debugName: "viewMode" }] : []));
    actioningIds = signal(new Set(), ...(ngDevMode ? [{ debugName: "actioningIds" }] : []));
    draftingIds = signal(new Set(), ...(ngDevMode ? [{ debugName: "draftingIds" }] : []));
    delegateLoading = signal(false, ...(ngDevMode ? [{ debugName: "delegateLoading" }] : []));
    delegateUsers = signal([], ...(ngDevMode ? [{ debugName: "delegateUsers" }] : []));
    noteInputs = {};
    assistDrafts = {};
    delegateUserInputs = {};
    statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'Pending' }
    ];
    purposeOptions = [
        { label: 'All', value: 'all' },
        { label: 'Close', value: 'Close' },
        { label: 'Discount', value: 'Discount' }
    ];
    statusFilter = 'Pending';
    purposeFilter = 'all';
    canManage = computed(() => {
        const context = readTokenContext();
        return (tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsApprove) ||
            tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsOverride));
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    /** True when the user can only request approvals (Sales Rep) — no approve/override. */
    isRequester = computed(() => !this.canManage(), ...(ngDevMode ? [{ debugName: "isRequester" }] : []));
    filteredApprovals = computed(() => {
        const query = this.searchQuery().trim().toLowerCase();
        return this.approvals().filter((item) => {
            if (item.status !== 'Pending') {
                return false;
            }
            if (!query) {
                return true;
            }
            const haystack = [
                item.opportunityName,
                item.accountName,
                item.requestedByName,
                item.approverRole,
                item.purpose,
                item.status,
                item.policyReason,
                item.priority,
                item.riskLevel,
                item.businessImpactLabel,
                item.decisionType
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(query);
        });
    }, ...(ngDevMode ? [{ debugName: "filteredApprovals" }] : []));
    selectedApproval = computed(() => {
        const list = this.filteredApprovals();
        const selectedId = this.selectedApprovalId();
        if (!list.length) {
            return null;
        }
        if (selectedId) {
            const matched = list.find((item) => item.id === selectedId);
            if (matched) {
                return matched;
            }
        }
        return list[0];
    }, ...(ngDevMode ? [{ debugName: "selectedApproval" }] : []));
    kpis = computed(() => {
        const items = this.filteredApprovals();
        const pending = items.filter((item) => item.status === 'Pending');
        const urgent = pending.filter((item) => this.laneFor(item) === 'urgent').length;
        const dueToday = pending.filter((item) => this.isDueToday(item)).length;
        const dueSoon = pending.filter((item) => this.laneFor(item) === 'due-soon').length;
        const totalAmount = pending.reduce((acc, item) => acc + (item.amount ?? 0), 0);
        return { pending: pending.length, urgent, dueToday, dueSoon, totalAmount };
    }, ...(ngDevMode ? [{ debugName: "kpis" }] : []));
    commandMetrics = computed(() => {
        const metrics = this.kpis();
        return [
            { label: 'Pending approvals', value: metrics.pending, tone: 'neutral' },
            { label: 'Urgent', value: metrics.urgent, tone: 'danger' },
            { label: 'Due soon', value: metrics.dueSoon, tone: 'warn' },
            { label: 'Due today', value: metrics.dueToday, tone: 'warn' }
        ];
    }, ...(ngDevMode ? [{ debugName: "commandMetrics" }] : []));
    laneGroups = computed(() => {
        const items = this.filteredApprovals();
        const grouped = {
            urgent: [],
            'due-soon': [],
            normal: []
        };
        for (const item of items) {
            grouped[this.laneFor(item)].push(item);
        }
        const buildLane = (key, title, subtitle, tone, icon) => ({
            key,
            title,
            subtitle,
            tone,
            icon,
            items: grouped[key],
            totalAmount: grouped[key].reduce((acc, item) => acc + (item.amount ?? 0), 0)
        });
        return [
            buildLane('urgent', 'Urgent', 'Overdue, critical, or high-risk approvals', 'danger', 'pi pi-bolt'),
            buildLane('due-soon', 'Due Soon', 'Pending reviews approaching SLA or decision pressure', 'warn', 'pi pi-clock'),
            buildLane('normal', 'Normal', 'On-track approvals still waiting on a decision', 'success', 'pi pi-check-circle')
        ].filter((lane) => lane.items.length > 0);
    }, ...(ngDevMode ? [{ debugName: "laneGroups" }] : []));
    pageTitle = computed(() => {
        return this.isRequester() ? 'My Approval Requests' : 'Pending Action Center';
    }, ...(ngDevMode ? [{ debugName: "pageTitle" }] : []));
    heroDescription = computed(() => {
        return this.isRequester()
            ? 'Track the status of your submitted deal approvals. You\u2019ll see updates as managers review and decide.'
            : 'Review high-impact deal approvals in one operational queue. Each card surfaces risk, workflow context, and the next decision without forcing a table-first workflow.';
    }, ...(ngDevMode ? [{ debugName: "heroDescription" }] : []));
    queueSubtitle = computed(() => {
        return this.isRequester()
            ? 'View details and track progress on your submitted requests.'
            : 'Review, comment, and decide inline. Use Details when you need the full deal form.';
    }, ...(ngDevMode ? [{ debugName: "queueSubtitle" }] : []));
    emptyListMessage = computed(() => {
        return this.isRequester()
            ? 'You have no pending approval requests.'
            : 'No pending actions match the selected filters.';
    }, ...(ngDevMode ? [{ debugName: "emptyListMessage" }] : []));
    emptyDetailSubtitle = computed(() => {
        return this.isRequester()
            ? 'Your submitted approvals will appear here once created.'
            : 'Choose an item from the queue to review policy context and take action.';
    }, ...(ngDevMode ? [{ debugName: "emptyDetailSubtitle" }] : []));
    constructor() {
        this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
            this.ensureSelection();
        });
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const status = params.get('status');
            const purpose = params.get('purpose');
            const selected = params.get('selected');
            this.statusFilter =
                status && this.statusOptions.some((option) => option.value === status)
                    ? status
                    : this.statusFilter;
            this.purposeFilter =
                purpose && this.purposeOptions.some((option) => option.value === purpose)
                    ? purpose
                    : this.purposeFilter;
            if (selected) {
                this.selectedApprovalId.set(selected);
            }
            this.load();
        });
        if (this.canManage()) {
            this.loadDelegateUsers();
        }
    }
    load() {
        this.loading.set(true);
        const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
        const purpose = this.purposeFilter === 'all' ? undefined : this.purposeFilter;
        this.approvalService.getInbox(status, purpose).subscribe({
            next: (items) => {
                this.approvals.set(items ?? []);
                this.loading.set(false);
                this.ensureSelection();
            },
            error: () => {
                this.loading.set(false);
                this.toastService.show('error', 'Unable to load approvals.', 3000);
            }
        });
    }
    onSearchInput(value) {
        this.searchQuery.set(value ?? '');
        this.ensureSelection();
    }
    selectDecision(item) {
        this.selectedApprovalId.set(item.id);
    }
    setViewMode(mode) {
        this.viewMode.set(mode);
    }
    laneLabel(lane) {
        return `${lane.items.length} pending`;
    }
    laneValueLabel(lane) {
        return this.formatCompactCurrency(lane.totalAmount);
    }
    openOpportunity(item) {
        this.router.navigate(['/app/deals', item.opportunityId, 'edit'], {
            queryParams: {
                reviewMode: 'decision',
                decisionId: item.id,
                from: 'pending-action'
            }
        });
    }
    openWorkflowExecution(item) {
        if (!item.workflowExecutionId) {
            return;
        }
        this.router.navigate(['/app/workflows/executions'], {
            queryParams: {
                executionId: item.workflowExecutionId,
                decisionId: item.id,
                dealId: item.workflowDealId ?? item.opportunityId
            }
        });
    }
    decide(item, approved) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        this.confirmationService.confirm({
            header: approved ? 'Approve pending action' : 'Reject pending action',
            message: this.buildDecisionConfirmationMessage(item, approved),
            icon: approved ? 'pi pi-check-circle' : 'pi pi-times-circle',
            acceptLabel: approved ? 'Approve now' : 'Reject now',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-text',
            acceptButtonStyleClass: approved ? 'approve-confirm-btn' : 'reject-confirm-btn',
            blockScroll: true,
            dismissableMask: true,
            accept: () => this.executeDecision(item, approved)
        });
    }
    executeDecision(item, approved) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        const notes = this.noteInputs[item.id] ?? null;
        const nextActioning = new Set(this.actioningIds());
        nextActioning.add(item.id);
        this.actioningIds.set(nextActioning);
        this.approvalService.decideDecision(item.id, { approved, notes }).subscribe({
            next: (updatedItem) => {
                const nextList = this.approvals().filter((row) => row.id !== updatedItem.id);
                this.approvals.set(nextList);
                this.clearActioning(item.id);
                this.toastService.show('success', 'Decision updated.', 2500);
                this.ensureSelection();
            },
            error: (err) => {
                this.clearActioning(item.id);
                const message = typeof err?.error?.message === 'string'
                    ? err.error.message
                    : typeof err?.error === 'string'
                        ? err.error
                        : 'Unable to update decision.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    requestInfo(item) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Request more information',
            message: this.buildRequestInfoConfirmationMessage(item),
            icon: 'pi pi-comment',
            acceptLabel: 'Send request',
            rejectLabel: 'Cancel',
            rejectButtonStyleClass: 'p-button-text',
            acceptButtonStyleClass: 'info-confirm-btn',
            blockScroll: true,
            dismissableMask: true,
            accept: () => this.executeRequestInfo(item)
        });
    }
    executeRequestInfo(item) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        const notes = this.noteInputs[item.id] ?? null;
        const nextActioning = new Set(this.actioningIds());
        nextActioning.add(item.id);
        this.actioningIds.set(nextActioning);
        this.approvalService.requestDecisionInfo(item.id, notes).subscribe({
            next: (updatedItem) => {
                this.replaceApprovalRow(updatedItem);
                this.clearActioning(item.id);
                this.toastService.show('success', 'More information requested.', 2500);
                this.ensureSelection();
            },
            error: (err) => {
                this.clearActioning(item.id);
                const message = typeof err?.error?.message === 'string'
                    ? err.error.message
                    : 'Unable to request information.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    buildDecisionConfirmationMessage(item, approved) {
        const note = (this.noteInputs[item.id] ?? '').trim();
        const noteSuffix = note ? ` Note: "${note}".` : ' No decision note will be included.';
        const action = approved ? 'approve' : 'reject';
        return `You are about to ${action} ${item.opportunityName} for ${this.amountLabel(item)}. ${this.compactWorkflowLabel(item)} · ${this.slaLabel(item)}.${noteSuffix}`;
    }
    buildRequestInfoConfirmationMessage(item) {
        const note = (this.noteInputs[item.id] ?? '').trim();
        const noteSuffix = note ? ` Note: "${note}".` : ' No request note will be included.';
        return `Ask for more information on ${item.opportunityName} before a decision is made. ${this.compactWorkflowLabel(item)} · ${this.slaLabel(item)}.${noteSuffix}`;
    }
    escalate(item) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        const notes = this.noteInputs[item.id] ?? null;
        const nextActioning = new Set(this.actioningIds());
        nextActioning.add(item.id);
        this.actioningIds.set(nextActioning);
        this.approvalService.escalateDecision(item.id, { notes }).subscribe({
            next: (updatedItem) => {
                this.replaceApprovalRow(updatedItem);
                this.clearActioning(item.id);
                this.toastService.show('success', 'Decision escalated.', 2500);
                this.ensureSelection();
            },
            error: (err) => {
                this.clearActioning(item.id);
                const message = typeof err?.error?.message === 'string'
                    ? err.error.message
                    : 'Unable to escalate decision.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    delegateDecision(item) {
        if (this.actioningIds().has(item.id)) {
            return;
        }
        const delegateUserId = this.delegateUserInputs[item.id];
        if (!delegateUserId) {
            this.toastService.show('error', 'Select a user to delegate this decision.', 3000);
            return;
        }
        const delegateUser = this.delegateUsers().find((u) => u.id === delegateUserId);
        const notes = this.noteInputs[item.id] ?? null;
        const nextActioning = new Set(this.actioningIds());
        nextActioning.add(item.id);
        this.actioningIds.set(nextActioning);
        this.approvalService.delegateDecision(item.id, {
            delegateUserId,
            delegateUserName: delegateUser?.fullName ?? null,
            notes
        }).subscribe({
            next: (updatedItem) => {
                this.replaceApprovalRow(updatedItem);
                this.clearActioning(item.id);
                this.toastService.show('success', 'Decision delegated.', 2500);
                this.ensureSelection();
            },
            error: (err) => {
                this.clearActioning(item.id);
                const message = typeof err?.error?.message === 'string'
                    ? err.error.message
                    : 'Unable to delegate decision.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    isActioning(id) {
        return this.actioningIds().has(id);
    }
    delegateOptions = computed(() => this.delegateUsers().map((user) => ({
        label: `${user.fullName} (${user.email})`,
        value: user.id
    })), ...(ngDevMode ? [{ debugName: "delegateOptions" }] : []));
    isDrafting(id) {
        return this.draftingIds().has(id);
    }
    generateDraft(item) {
        if (this.draftingIds().has(item.id)) {
            return;
        }
        const next = new Set(this.draftingIds());
        next.add(item.id);
        this.draftingIds.set(next);
        this.approvalService.generateDecisionAssistDraft(item.id).subscribe({
            next: (draft) => {
                this.assistDrafts[item.id] = draft;
                this.noteInputs[item.id] = this.pickDraftNote(draft);
                this.toastService.show('success', 'AI draft prepared (assist-only).', 2500);
                this.clearDrafting(item.id);
            },
            error: (err) => {
                this.clearDrafting(item.id);
                const message = typeof err?.error?.message === 'string'
                    ? err.error.message
                    : 'Unable to generate decision draft.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    assistDraftFor(id) {
        return this.assistDrafts[id] ?? null;
    }
    applyAssistDraft(item, mode) {
        const draft = this.assistDrafts[item.id];
        if (!draft) {
            return;
        }
        this.noteInputs[item.id] =
            mode === 'approve' ? draft.approvalDraftNote :
                mode === 'reject' ? draft.rejectDraftNote :
                    draft.requestInfoDraftNote;
    }
    isPending(item) {
        return !!item && item.status === 'Pending';
    }
    isSelected(item) {
        return this.selectedApprovalId() === item.id;
    }
    decisionTitle(item) {
        const type = this.humanizeDecisionType(item.decisionType || 'Approval');
        return `${type} • ${item.opportunityName}`;
    }
    decisionSubtitle(item) {
        return `${this.formatCurrency(item.amount, item.currency)} • ${item.accountName}`;
    }
    humanizeDecisionType(value) {
        const normalized = (value || 'Approval').replace(/[_-]+/g, ' ').trim();
        if (!normalized)
            return 'Approval';
        return normalized
            .split(' ')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ');
    }
    formatCurrency(amount, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            maximumFractionDigits: 0
        }).format(amount ?? 0);
    }
    formatCompactCurrency(amount) {
        const value = amount ?? 0;
        if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(1)}M`;
        }
        if (value >= 1_000) {
            return `$${Math.round(value / 1_000)}K`;
        }
        return `$${Math.round(value)}`;
    }
    statusSeverity(status) {
        switch (status) {
            case 'Approved':
                return 'success';
            case 'Rejected':
                return 'danger';
            case 'Pending':
            default:
                return 'warn';
        }
    }
    riskSeverity(risk) {
        switch ((risk || '').toLowerCase()) {
            case 'high':
                return 'danger';
            case 'medium':
                return 'warn';
            case 'low':
                return 'success';
            default:
                return 'info';
        }
    }
    prioritySeverity(priority) {
        switch ((priority || '').toLowerCase()) {
            case 'critical':
                return 'danger';
            case 'high':
                return 'warn';
            case 'medium':
                return 'info';
            case 'normal':
            default:
                return 'success';
        }
    }
    slaSeverity(status) {
        switch ((status || '').toLowerCase()) {
            case 'overdue':
                return 'danger';
            case 'at-risk':
                return 'warn';
            case 'completed':
                return 'info';
            case 'on-track':
            default:
                return 'success';
        }
    }
    slaLabel(item) {
        if (item.status !== 'Pending') {
            return item.decisionOn ? `Completed ${this.relativeTime(item.decisionOn)}` : 'Completed';
        }
        if (!item.slaDueAtUtc) {
            return 'No SLA';
        }
        const due = new Date(item.slaDueAtUtc).getTime();
        const diffMs = due - Date.now();
        const absMins = Math.round(Math.abs(diffMs) / 60000);
        if (diffMs < 0) {
            if (absMins < 60)
                return `Overdue by ${absMins}m`;
            return `Overdue by ${Math.round(absMins / 60)}h`;
        }
        if (absMins < 60)
            return `Due in ${absMins}m`;
        return `Due in ${Math.round(absMins / 60)}h`;
    }
    relativeTime(value) {
        if (!value)
            return '—';
        const ms = Date.now() - new Date(value).getTime();
        const mins = Math.max(1, Math.round(ms / 60000));
        if (mins < 60)
            return `${mins}m ago`;
        const hours = Math.round(mins / 60);
        if (hours < 48)
            return `${hours}h ago`;
        return `${Math.round(hours / 24)}d ago`;
    }
    queueCardTone(item) {
        if (item.status === 'Pending' && (item.priority === 'critical' || item.slaStatus === 'overdue' || item.isEscalated)) {
            return 'critical';
        }
        if (item.status === 'Pending' && (item.priority === 'high' || item.slaStatus === 'at-risk')) {
            return 'warn';
        }
        return 'normal';
    }
    trackByApprovalId(_index, item) {
        return item.id;
    }
    trackByLaneKey(_index, lane) {
        return lane.key;
    }
    isDueToday(item) {
        if (!item.slaDueAtUtc) {
            return false;
        }
        const due = new Date(item.slaDueAtUtc);
        const now = new Date();
        return (due.getFullYear() === now.getFullYear() &&
            due.getMonth() === now.getMonth() &&
            due.getDate() === now.getDate());
    }
    amountLabel(item) {
        return this.formatCompactCurrency(item.amount);
    }
    actionSummary(item) {
        if (item.businessImpactLabel) {
            return item.businessImpactLabel;
        }
        if (item.policyReason) {
            return item.policyReason;
        }
        return 'Pending approval decision';
    }
    policySummary(item) {
        return item.policyReason || 'Policy review in progress';
    }
    compactPolicySummary(item) {
        const text = this.policySummary(item);
        return text.length > 72 ? `${text.slice(0, 69).trimEnd()}...` : text;
    }
    workflowLabel(item) {
        return item.workflowName || 'Deal Approval Workflow';
    }
    compactWorkflowLabel(item) {
        const label = this.workflowLabel(item);
        return label.replace(/ workflow$/i, '');
    }
    requesterLabel(item) {
        return item.requestedByName || 'Unknown requester';
    }
    tableRowSummary(item) {
        return this.compactPolicySummary(item);
    }
    purposeLabel(item) {
        return item.purpose || 'Approval';
    }
    priorityLabel(item) {
        return (item.priority || 'normal').toUpperCase();
    }
    riskLabel(item) {
        return (item.riskLevel || 'low').toUpperCase();
    }
    metaDueLabel(item) {
        if (item.slaStatus === 'overdue') {
            return 'Needs action';
        }
        if (this.isDueToday(item)) {
            return 'Review today';
        }
        return 'Queue active';
    }
    dueBadgeLabel(item) {
        if (item.status !== 'Pending') {
            return 'Completed';
        }
        if (item.slaStatus === 'overdue') {
            return 'Overdue';
        }
        if (this.isDueToday(item)) {
            return 'Due today';
        }
        if (this.laneFor(item) === 'due-soon') {
            return 'Due soon';
        }
        return 'On track';
    }
    ensureSelection() {
        const list = this.filteredApprovals();
        const current = this.selectedApprovalId();
        if (!list.length) {
            this.selectedApprovalId.set(null);
            return;
        }
        if (!current || !list.some((item) => item.id === current)) {
            this.selectedApprovalId.set(list[0].id);
        }
    }
    isMyDecision(item) {
        const userId = this.currentUserId?.toLowerCase();
        if (!userId) {
            return false;
        }
        return ((item.approverUserId ?? '').toLowerCase() === userId ||
            (item.requestedByUserId ?? '').toLowerCase() === userId);
    }
    clearActioning(id) {
        const updated = new Set(this.actioningIds());
        updated.delete(id);
        this.actioningIds.set(updated);
    }
    clearDrafting(id) {
        const updated = new Set(this.draftingIds());
        updated.delete(id);
        this.draftingIds.set(updated);
    }
    replaceApprovalRow(updatedItem) {
        const nextList = this.approvals().map((row) => row.id === updatedItem.id
            ? { ...row, ...updatedItem }
            : row);
        this.approvals.set(nextList);
    }
    loadDelegateUsers() {
        this.delegateLoading.set(true);
        this.userAdminData.lookupActive(undefined, 100).subscribe({
            next: (users) => {
                this.delegateUsers.set(users ?? []);
                this.delegateLoading.set(false);
            },
            error: () => {
                this.delegateLoading.set(false);
            }
        });
    }
    pickDraftNote(draft) {
        switch ((draft.recommendedAction || '').toLowerCase()) {
            case 'reject':
                return draft.rejectDraftNote;
            case 'request_info':
                return draft.requestInfoDraftNote;
            case 'approve':
            default:
                return draft.approvalDraftNote;
        }
    }
    laneFor(item) {
        if (item.slaStatus === 'overdue' ||
            item.priority === 'critical' ||
            item.riskLevel === 'high') {
            return 'urgent';
        }
        if (item.slaStatus === 'at-risk') {
            return 'due-soon';
        }
        if (item.slaDueAtUtc) {
            const due = new Date(item.slaDueAtUtc).getTime();
            const hours = (due - Date.now()) / 3_600_000;
            if (hours >= 0 && hours <= 24) {
                return 'due-soon';
            }
        }
        return 'normal';
    }
    static ɵfac = function OpportunityApprovalsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityApprovalsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpportunityApprovalsPage, selectors: [["app-opportunity-approvals-page"]], features: [i0.ɵɵProvidersFeature([ConfirmationService])], decls: 84, vars: 25, consts: [["pageLoading", ""], ["emptyState", ""], ["tableMode", ""], [1, "page-container", "approvals-page"], ["aria-hidden", "true", 1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-shell", "liquid-card"], [1, "hero-copy"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "hero-description"], [1, "hero-subtitle"], [1, "hero-utility"], [1, "hero-visual-stack"], [1, "hero-visual-card", "hero-visual-card--danger"], [1, "hero-visual-card__icon"], [1, "pi", "pi-bolt"], [1, "hero-visual-card__content"], [1, "hero-visual-card__label"], [1, "hero-visual-card__value"], [1, "hero-visual-card__meta"], [1, "hero-visual-card", "hero-visual-card--info"], [1, "pi", "pi-wallet"], ["pButton", "", "type", "button", 1, "command-btn", "command-btn--ghost", "refresh-btn", 3, "click"], [1, "pi", "pi-refresh"], [1, "command-metric-grid"], ["class", "command-metric-card", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "control-shell", "liquid-card"], [1, "control-actions"], [1, "filter-pill", "search-pill"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search opportunity, account, requester, workflow, risk", 3, "ngModelChange", "ngModel"], [1, "filter-pill"], [1, "filter-label"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "compact-select", 3, "ngModelChange", "onChange", "options", "ngModel"], ["aria-label", "Queue view mode", 1, "view-toggle"], ["pButton", "", "type", "button", 1, "view-toggle__btn", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-th-large"], ["aria-hidden", "true", 1, "pi", "pi-table"], [1, "control-insights"], [1, "control-note"], [1, "control-divider"], [4, "ngIf", "ngIfElse"], [3, "baseZIndex"], [1, "hero-title__gradient"], [1, "hero-title__light"], [1, "command-metric-card", 3, "ngClass"], [1, "command-metric-card__label"], [1, "command-metric-card__value"], ["class", "lane-stack", 4, "ngIf", "ngIfElse"], [1, "lane-stack"], ["class", "lane-card liquid-card", 3, "lane-card--danger", "lane-card--warn", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "lane-card", "liquid-card"], [1, "lane-header"], [1, "lane-heading"], [1, "lane-kicker"], ["aria-hidden", "true"], [1, "lane-subtitle"], [1, "lane-metrics"], [1, "lane-metric"], ["class", "approval-grid", 4, "ngIf", "ngIfElse"], [1, "approval-grid"], ["class", "approval-card liquid-subcard", 3, "is-selected", "tone-critical", "tone-warn", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "approval-card", "liquid-subcard", 3, "click"], [1, "approval-card__header"], [1, "approval-card__title-wrap"], [1, "approval-card__eyebrow"], [1, "eyebrow-pill", "eyebrow-pill--workflow"], ["aria-hidden", "true", 1, "pi", "pi-sitemap"], [1, "eyebrow-pill", "eyebrow-pill--purpose"], ["aria-hidden", "true", 1, "pi", "pi-briefcase"], [1, "approval-card__title-row"], [1, "approval-card__title"], ["class", "ownership-pill", 4, "ngIf"], [1, "approval-card__workflow", "compact-workflow"], ["aria-hidden", "true", 1, "pi", "pi-building"], [4, "ngIf"], [1, "approval-card__finance"], [1, "approval-card__amount"], [1, "approval-card__due"], [1, "approval-card__impact"], [1, "approval-card__policy"], [1, "approval-card__signal-row"], [1, "signal-pill", "signal-pill--risk"], [1, "signal-pill__icon"], ["aria-hidden", "true", 1, "pi", "pi-shield"], [1, "signal-pill__label"], [1, "signal-pill", "signal-pill--priority"], ["aria-hidden", "true", 1, "pi", "pi-flag-fill"], [1, "signal-pill", "signal-pill--sla"], ["aria-hidden", "true", 1, "pi", "pi-stopwatch"], [1, "approval-card__meta"], [1, "meta-pill"], ["aria-hidden", "true", 1, "pi", "pi-user"], ["aria-hidden", "true", 1, "pi", "pi-id-card"], ["aria-hidden", "true", 1, "pi", "pi-history"], ["aria-hidden", "true", 1, "pi", "pi-bell"], ["class", "approval-card__detail", 4, "ngIf"], [1, "approval-card__actions", 3, "click"], ["pButton", "", "type", "button", "label", "Request Info", "icon", "pi pi-comment", 1, "secondary-action", 3, "disabled"], ["pButton", "", "type", "button", "label", "Details", "icon", "pi pi-arrow-right", "iconPos", "right", 1, "secondary-action", 3, "click"], [1, "ownership-pill"], [1, "approval-card__detail"], [1, "detail-grid"], [1, "detail-block"], [1, "detail-label"], [1, "detail-grid", "detail-grid--secondary"], [1, "note-field"], ["pTextarea", "", "rows", "3", "placeholder", "Capture context for approval, rejection, or a follow-up request.", 3, "ngModelChange", "click", "autoResize", "ngModel"], ["pButton", "", "type", "button", "label", "Request Info", "icon", "pi pi-comment", 1, "secondary-action", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Reject", 1, "reject-action", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Approve", 1, "approve-action", 3, "click", "loading", "disabled"], [1, "approval-table"], ["dataKey", "id", "styleClass", "approval-data-table", 3, "value", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "approval-data-row", 3, "click"], [1, "approval-data-cell", "approval-data-cell--deal"], [1, "approval-data-cell"], [1, "row-chip", "row-chip--value"], [1, "row-chip"], [3, "click"], [1, "approval-data-actions"], ["pButton", "", "type", "button", "label", "Request Info", 1, "secondary-action", "secondary-action--compact", 3, "disabled"], ["pButton", "", "type", "button", "label", "Details", 1, "secondary-action", "secondary-action--compact", 3, "click"], ["pButton", "", "type", "button", "label", "Request Info", 1, "secondary-action", "secondary-action--compact", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Reject", 1, "reject-action", "reject-action--compact", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Approve", 1, "approve-action", "approve-action--compact", 3, "click", "loading", "disabled"], [1, "loading-shell", "liquid-card"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "empty-shell", "liquid-card"], [1, "empty-icon"], [1, "pi", "pi-check-circle"]], template: function OpportunityApprovalsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "div", 4);
            i0.ɵɵelement(2, "div", 5)(3, "div", 6)(4, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 8)(7, "div", 9)(8, "div", 10);
            i0.ɵɵelement(9, "span", 11);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 12);
            i0.ɵɵconditionalCreate(13, OpportunityApprovalsPage_Conditional_13_Template, 4, 0)(14, OpportunityApprovalsPage_Conditional_14_Template, 4, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 13);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 15)(20, "div", 16)(21, "div", 17)(22, "div", 18);
            i0.ɵɵelement(23, "i", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 20)(25, "span", 21);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "strong", 22);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "span", 23);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "div", 24)(32, "div", 18);
            i0.ɵɵelement(33, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 20)(35, "span", 21);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "strong", 22);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span", 23);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(41, "button", 26);
            i0.ɵɵlistener("click", function OpportunityApprovalsPage_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelement(42, "i", 27);
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(45, "section", 28);
            i0.ɵɵtemplate(46, OpportunityApprovalsPage_article_46_Template, 5, 3, "article", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "section", 30)(48, "div", 31)(49, "div", 32);
            i0.ɵɵelement(50, "i", 33);
            i0.ɵɵelementStart(51, "input", 34);
            i0.ɵɵlistener("ngModelChange", function OpportunityApprovalsPage_Template_input_ngModelChange_51_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearchInput($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "div", 35)(53, "span", 36);
            i0.ɵɵtext(54, "Purpose");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "p-select", 37);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityApprovalsPage_Template_p_select_ngModelChange_55_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.purposeFilter, $event) || (ctx.purposeFilter = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("onChange", function OpportunityApprovalsPage_Template_p_select_onChange_55_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 35)(57, "span", 36);
            i0.ɵɵtext(58, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "p-select", 37);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityApprovalsPage_Template_p_select_ngModelChange_59_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("onChange", function OpportunityApprovalsPage_Template_p_select_onChange_59_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "div", 38)(61, "button", 39);
            i0.ɵɵlistener("click", function OpportunityApprovalsPage_Template_button_click_61_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.setViewMode("cards")); });
            i0.ɵɵelement(62, "i", 40);
            i0.ɵɵelementStart(63, "span");
            i0.ɵɵtext(64, "Cards");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "button", 39);
            i0.ɵɵlistener("click", function OpportunityApprovalsPage_Template_button_click_65_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.setViewMode("table")); });
            i0.ɵɵelement(66, "i", 41);
            i0.ɵɵelementStart(67, "span");
            i0.ɵɵtext(68, "Table");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(69, "div", 42)(70, "span", 43);
            i0.ɵɵtext(71, "Risk: high / medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(72, "span", 44);
            i0.ɵɵelementStart(73, "span", 43);
            i0.ɵɵtext(74);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "span", 44);
            i0.ɵɵelementStart(76, "span", 43);
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(78, OpportunityApprovalsPage_ng_container_78_Template, 2, 2, "ng-container", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(79, OpportunityApprovalsPage_ng_template_79_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelement(81, "p-confirmDialog", 46);
            i0.ɵɵtemplate(82, OpportunityApprovalsPage_ng_template_82_Template, 7, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const pageLoading_r16 = i0.ɵɵreference(80);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? "My Requests" : "Decision Inbox");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isRequester() ? 13 : 14);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.heroDescription());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.queueSubtitle());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? "Awaiting review" : "Urgent queue");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? ctx.kpis().pending : ctx.kpis().urgent);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? "Submitted by you" : ctx.kpis().dueToday + " due today");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? "Request value" : "Pending value");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.formatCompactCurrency(ctx.kpis().totalAmount));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isRequester() ? ctx.kpis().pending + " requests pending" : ctx.kpis().pending + " approvals in play");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.commandMetrics());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.searchQuery());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.purposeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.purposeFilter);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("is-active", ctx.viewMode() === "cards");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-active", ctx.viewMode() === "table");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("Queue: ", ctx.kpis().pending, " pending");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("SLA: ", ctx.kpis().dueSoon, " near deadline");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", pageLoading_r16);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("baseZIndex", 12000);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, TagModule, i3.PrimeTemplate, SelectModule, i4.Select, InputTextModule, i5.InputText, ButtonModule, i6.ButtonDirective, ChipModule,
            TextareaModule, i7.Textarea, ConfirmDialogModule, i8.ConfirmDialog, TableModule, i9.Table, BreadcrumbsComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.page-container.approvals-page[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 1.5rem 1.75rem 2rem;\n  color: #0f172a;\n  background:\n    radial-gradient(ellipse 70% 42% at 15% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 58%),\n    radial-gradient(ellipse 55% 35% at 92% 12%, rgba(139, 92, 246, 0.1) 0%, transparent 52%),\n    radial-gradient(ellipse 50% 30% at 6% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 48%),\n    linear-gradient(\n      180deg,\n      rgba(248, 250, 252, 0.96) 0%,\n      rgba(255, 255, 255, 0.98) 42%,\n      rgba(241, 245, 249, 0.72) 100%\n    );\n  min-height: calc(100vh - 56px);\n  overflow: hidden;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 999px;\n  filter: blur(6px);\n  opacity: 0.9;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 360px;\n  height: 360px;\n  top: -130px;\n  left: -120px;\n  background: radial-gradient(circle, rgba(37, 99, 235, 0.16), rgba(59, 130, 246, 0.06) 55%, transparent 72%);\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 420px;\n  height: 420px;\n  right: -150px;\n  bottom: -80px;\n  background: radial-gradient(circle, rgba(6, 182, 212, 0.14), rgba(14, 165, 233, 0.05) 60%, transparent 76%);\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  top: 12rem;\n  right: 22%;\n  background: radial-gradient(circle, rgba(139, 92, 246, 0.12), rgba(79, 70, 229, 0.04) 58%, transparent 74%);\n}\n\n.liquid-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  border-radius: 22px;\n  border: 1px solid rgba(255, 255, 255, 0.72);\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.72)),\n    linear-gradient(180deg, rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.78));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    inset 0 -1px 0 rgba(226, 232, 240, 0.7),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n  backdrop-filter: blur(24px) saturate(160%);\n}\n\n.liquid-subcard[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.76);\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.8)),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(248, 250, 252, 0.82));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.hero-shell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.25rem;\n  padding: 1.25rem 1.3rem;\n  margin-top: 0.75rem;\n}\n\n.hero-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  background: rgba(59, 130, 246, 0.08);\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #1d4ed8;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #34d399;\n  box-shadow: 0 0 10px rgba(52, 211, 153, 0.8);\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0.6rem 0 0.35rem;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  align-items: baseline;\n  font-size: clamp(1.95rem, 2.6vw, 2.6rem);\n  line-height: 1;\n  letter-spacing: -0.04em;\n}\n\n.hero-title__gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #4ea6ff 0%, #2563eb 60%, #3344d3 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n\n.hero-title__light[_ngcontent-%COMP%] {\n  color: #274064;\n}\n\n.hero-description[_ngcontent-%COMP%], \n.hero-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  max-width: 760px;\n  color: rgba(51, 65, 85, 0.8);\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  font-size: 0.92rem;\n}\n\n.hero-utility[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.8rem;\n  justify-items: end;\n}\n\n.hero-visual-stack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  width: min(100%, 280px);\n}\n\n.hero-visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 0.9rem 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(255, 255, 255, 0.84);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n}\n\n.hero-visual-card__icon[_ngcontent-%COMP%] {\n  width: 2.55rem;\n  height: 2.55rem;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  color: #fff;\n  font-size: 1rem;\n}\n\n.hero-visual-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.12rem;\n  min-width: 0;\n}\n\n.hero-visual-card__label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n.hero-visual-card__value[_ngcontent-%COMP%] {\n  font-size: 1.55rem;\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: -0.03em;\n  color: #132447;\n}\n\n.hero-visual-card__meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #4f6492;\n}\n\n.hero-visual-card--danger[_ngcontent-%COMP%]   .hero-visual-card__icon[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #ff4a66, #e02547);\n}\n\n.hero-visual-card--info[_ngcontent-%COMP%]   .hero-visual-card__icon[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #4ea6ff, #2a67de);\n}\n\n.command-metric-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.85rem;\n  margin-top: 1rem;\n}\n\n.command-metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.9rem 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(184, 196, 228, 0.7);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.83), rgba(246, 248, 255, 0.8));\n}\n\n.command-metric-card__label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: rgba(54, 68, 101, 0.95);\n}\n\n.command-metric-card__value[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  line-height: 1;\n  font-weight: 800;\n  color: #2a67de;\n}\n\n.command-metric-card--danger[_ngcontent-%COMP%]   .command-metric-card__value[_ngcontent-%COMP%] {\n  color: #e64a63;\n}\n\n.command-metric-card--warn[_ngcontent-%COMP%]   .command-metric-card__value[_ngcontent-%COMP%] {\n  color: #ef9630;\n}\n\n.refresh-btn[_ngcontent-%COMP%] {\n  min-width: 132px;\n}\n\n.control-shell[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.95rem 1rem;\n  display: grid;\n  gap: 0.85rem;\n}\n\n.control-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.view-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: rgba(255, 255, 255, 0.82);\n}\n\n.view-toggle__btn[_ngcontent-%COMP%] {\n  min-width: 96px;\n  min-height: 40px;\n  border-radius: 12px;\n  border: 0;\n  background: transparent;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  font-weight: 700;\n}\n\n.view-toggle__btn.is-active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(14, 165, 233, 0.08));\n  color: #1d4ed8;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);\n}\n\n.filter-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-height: 52px;\n  padding: 0.45rem 0.8rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.search-pill[_ngcontent-%COMP%] {\n  flex: 1 1 360px;\n  min-width: 280px;\n}\n\n.search-pill[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.72);\n}\n\n.search-pill[_ngcontent-%COMP%]   input[pInputText][_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  padding: 0;\n}\n\n.filter-label[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.76);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.control-insights[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.6rem;\n  color: rgba(51, 65, 85, 0.78);\n  font-size: 0.9rem;\n}\n\n.control-note[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.control-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 16px;\n  background: rgba(148, 163, 184, 0.35);\n}\n\n.lane-stack[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n.lane-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.lane-card--danger[_ngcontent-%COMP%] {\n  box-shadow:\n    inset 4px 0 0 rgba(239, 68, 68, 0.78),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n}\n\n.lane-card--warn[_ngcontent-%COMP%] {\n  box-shadow:\n    inset 4px 0 0 rgba(245, 158, 11, 0.78),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n}\n\n.lane-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.9rem;\n}\n\n.lane-kicker[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #475569;\n  font-size: 0.95rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.lane-subtitle[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: rgba(71, 85, 105, 0.76);\n}\n\n.lane-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  justify-content: flex-end;\n}\n\n.lane-metric[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 38px;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.92);\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  color: #334155;\n  font-weight: 700;\n}\n\n.approval-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.approval-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  padding: 0.82rem 0.88rem;\n  cursor: pointer;\n  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;\n}\n\n.approval-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  border-color: rgba(96, 165, 250, 0.35);\n}\n\n.approval-card.is-selected[_ngcontent-%COMP%] {\n  border-color: rgba(59, 130, 246, 0.34);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 24px rgba(37, 99, 235, 0.12);\n}\n\n.approval-card.tone-critical[_ngcontent-%COMP%] {\n  box-shadow:\n    inset 4px 0 0 rgba(239, 68, 68, 0.7),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.approval-card.tone-warn[_ngcontent-%COMP%] {\n  box-shadow:\n    inset 4px 0 0 rgba(245, 158, 11, 0.72),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.approval-card__header[_ngcontent-%COMP%], \n.approval-card__title-row[_ngcontent-%COMP%], \n.approval-card__meta[_ngcontent-%COMP%], \n.approval-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.approval-card__title-wrap[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.approval-card__eyebrow[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.15rem;\n}\n\n.eyebrow-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-height: 24px;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n\n.eyebrow-pill--workflow[_ngcontent-%COMP%] {\n  background: rgba(224, 231, 255, 0.88);\n  color: #4338ca;\n}\n\n.eyebrow-pill--purpose[_ngcontent-%COMP%] {\n  background: rgba(254, 243, 199, 0.88);\n  color: #b45309;\n}\n\n.approval-card__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.98rem;\n  line-height: 1.2;\n  color: #0f172a;\n}\n\n.approval-card__workflow[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.8rem;\n}\n\n.compact-workflow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.ownership-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(219, 234, 254, 0.88);\n  color: #1d4ed8;\n  font-size: 0.7rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.approval-card__finance[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  justify-items: end;\n  flex-shrink: 0;\n}\n\n.approval-card__amount[_ngcontent-%COMP%] {\n  padding: 0.34rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(255, 247, 237, 0.96);\n  color: #0f172a;\n  font-size: 1.1rem;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n}\n\n.approval-card__due[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #475569;\n}\n\n.approval-card__due.is-overdue[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.approval-card__impact[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #334155;\n}\n\n.approval-card__policy[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.78);\n  line-height: 1.35;\n  font-size: 0.8rem;\n}\n\n.approval-card__signal-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.signal-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.42rem;\n  min-height: 28px;\n  padding: 0.18rem 0.58rem;\n  border-radius: 999px;\n  font-size: 0.74rem;\n  font-weight: 800;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(255, 255, 255, 0.88);\n  color: #334155;\n}\n\n.signal-pill__icon[_ngcontent-%COMP%] {\n  width: 1.1rem;\n  height: 1.1rem;\n  border-radius: 50%;\n  display: inline-grid;\n  place-items: center;\n  font-size: 0.62rem;\n  background: rgba(148, 163, 184, 0.16);\n}\n\n.signal-pill[data-tone='high'][_ngcontent-%COMP%], \n.signal-pill[data-tone='overdue'][_ngcontent-%COMP%], \n.signal-pill[data-tone='critical'][_ngcontent-%COMP%] {\n  color: #b91c1c;\n  background: rgba(254, 242, 242, 0.95);\n  border-color: rgba(252, 165, 165, 0.7);\n}\n\n.signal-pill[data-tone='high'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='overdue'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='critical'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.14);\n}\n\n.signal-pill[data-tone='medium'][_ngcontent-%COMP%], \n.signal-pill[data-tone='warn'][_ngcontent-%COMP%], \n.signal-pill[data-tone='at-risk'][_ngcontent-%COMP%] {\n  color: #a16207;\n  background: rgba(255, 251, 235, 0.95);\n  border-color: rgba(253, 224, 71, 0.75);\n}\n\n.signal-pill[data-tone='medium'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='warn'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='at-risk'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.14);\n}\n\n.signal-pill[data-tone='low'][_ngcontent-%COMP%], \n.signal-pill[data-tone='normal'][_ngcontent-%COMP%], \n.signal-pill[data-tone='on-track'][_ngcontent-%COMP%] {\n  color: #166534;\n  background: rgba(240, 253, 244, 0.94);\n  border-color: rgba(134, 239, 172, 0.72);\n}\n\n.signal-pill[data-tone='low'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='normal'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%], \n.signal-pill[data-tone='on-track'][_ngcontent-%COMP%]   .signal-pill__icon[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.14);\n}\n\n.approval-card__meta[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.45rem;\n}\n\n.meta-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.34rem;\n  min-height: 24px;\n  padding: 0.12rem 0.5rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.95);\n  border: 1px solid rgba(226, 232, 240, 0.88);\n  color: rgba(51, 65, 85, 0.82);\n  font-size: 0.74rem;\n  font-weight: 600;\n}\n\n.approval-card__detail[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.8rem;\n  padding: 0.78rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(248, 250, 252, 0.72);\n}\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.detail-grid--secondary[_ngcontent-%COMP%] {\n  padding-top: 0.1rem;\n}\n\n.detail-block[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n}\n\n.detail-label[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.78);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.detail-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1e293b;\n  line-height: 1.45;\n}\n\n.note-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n}\n\n.note-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  resize: vertical;\n}\n\n.approval-card__actions[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  padding-top: 0.1rem;\n}\n\n.approval-table[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n[_nghost-%COMP%]     .approval-data-table .p-datatable-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background: rgba(255, 255, 255, 0.64);\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .approval-data-table .p-datatable-thead > tr > th {\n  padding: 0.85rem 1rem;\n  border: 0;\n  background: linear-gradient(145deg, rgba(226, 237, 255, 0.92), rgba(214, 228, 255, 0.86));\n  color: #41557f;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(174, 189, 221, 0.42);\n}\n\n[_nghost-%COMP%]     .approval-data-table .p-datatable-tbody > tr > td {\n  padding: 0.9rem 1rem;\n  border: 0;\n  border-bottom: 1px solid rgba(196, 207, 231, 0.58);\n  background: rgba(255, 255, 255, 0.5);\n  vertical-align: middle;\n}\n\n.approval-data-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 140ms ease;\n}\n\n.approval-data-row[_ngcontent-%COMP%]:hover {\n  background: rgba(234, 242, 255, 0.34);\n}\n\n[_nghost-%COMP%]     .approval-data-table .p-datatable-tbody > tr.approval-data-row.is-selected > td {\n  background: rgba(224, 236, 255, 0.62);\n  border-bottom-color: rgba(96, 165, 250, 0.42);\n}\n\n.approval-data-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.3rem;\n  min-width: 0;\n  color: #334155;\n}\n\n.approval-data-cell--deal[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.98rem;\n  color: #0f172a;\n}\n\n.approval-data-cell--deal[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.8rem;\n  line-height: 1.35;\n}\n\n.row-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  min-height: 24px;\n  padding: 0.12rem 0.5rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.95);\n  border: 1px solid rgba(226, 232, 240, 0.88);\n  color: #334155;\n  font-size: 0.72rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.row-chip--value[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.96);\n  color: #0f172a;\n}\n\n.row-chip[data-tone='high'][_ngcontent-%COMP%], \n.row-chip[data-tone='overdue'][_ngcontent-%COMP%], \n.row-chip[data-tone='critical'][_ngcontent-%COMP%] {\n  color: #b91c1c;\n  background: rgba(254, 242, 242, 0.95);\n  border-color: rgba(252, 165, 165, 0.7);\n}\n\n.row-chip[data-tone='medium'][_ngcontent-%COMP%], \n.row-chip[data-tone='at-risk'][_ngcontent-%COMP%] {\n  color: #a16207;\n  background: rgba(255, 251, 235, 0.95);\n  border-color: rgba(253, 224, 71, 0.75);\n}\n\n.row-chip[data-tone='low'][_ngcontent-%COMP%], \n.row-chip[data-tone='normal'][_ngcontent-%COMP%], \n.row-chip[data-tone='on-track'][_ngcontent-%COMP%] {\n  color: #166534;\n  background: rgba(240, 253, 244, 0.94);\n  border-color: rgba(134, 239, 172, 0.72);\n}\n\n.approval-data-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  justify-content: flex-end;\n}\n\n.secondary-action[_ngcontent-%COMP%], \n.reject-action[_ngcontent-%COMP%], \n.approve-action[_ngcontent-%COMP%] {\n  min-width: 108px;\n}\n\n.secondary-action[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.86);\n  color: #334155;\n  border-color: rgba(203, 213, 225, 0.9);\n}\n\n.reject-action[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.94);\n  color: #b91c1c;\n  border-color: rgba(252, 165, 165, 0.8);\n}\n\n.approve-action[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #3b82f6, #2563eb);\n  border-color: rgba(37, 99, 235, 0.9);\n}\n\n.loading-shell[_ngcontent-%COMP%], \n.empty-shell[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-top: 1rem;\n  padding: 1.15rem;\n}\n\n.loading-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 92px;\n  border-radius: 16px;\n  background:\n    linear-gradient(90deg, rgba(226, 232, 240, 0.68), rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.68));\n  background-size: 220% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite linear;\n}\n\n.empty-shell[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  margin: 0 auto 1rem;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: rgba(219, 234, 254, 0.85);\n  color: #2563eb;\n  font-size: 1.7rem;\n}\n\n.empty-shell[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #0f172a;\n  font-size: 1.3rem;\n}\n\n.empty-shell[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.45rem auto 0;\n  max-width: 540px;\n  color: rgba(71, 85, 105, 0.78);\n}\n\n[_nghost-%COMP%]     .compact-select .p-select {\n  min-width: 160px;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .secondary-action.p-button, \n[_nghost-%COMP%]     .reject-action.p-button, \n[_nghost-%COMP%]     .approve-action.p-button, \n[_nghost-%COMP%]     .refresh-btn.p-button, \n[_nghost-%COMP%]     .view-toggle__btn.p-button {\n  border-radius: 12px;\n  min-height: 36px;\n  font-size: 0.83rem;\n  padding: 0.45rem 0.72rem;\n}\n\n[_nghost-%COMP%]     .secondary-action--compact.p-button, \n[_nghost-%COMP%]     .reject-action--compact.p-button, \n[_nghost-%COMP%]     .approve-action--compact.p-button {\n  min-width: 86px;\n  min-height: 30px;\n  font-size: 0.74rem;\n  padding: 0.32rem 0.58rem;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog {\n  width: min(92vw, 34rem);\n  border-radius: 24px;\n  overflow: hidden;\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  background:\n    radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 42%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));\n  box-shadow:\n    0 24px 70px rgba(15, 23, 42, 0.2),\n    inset 0 1px 0 rgba(255, 255, 255, 0.7);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-header {\n  padding: 1.15rem 1.35rem 0.6rem;\n  background: transparent;\n  border: 0;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-title {\n  color: #0f172a;\n  font-size: 1.05rem;\n  font-weight: 800;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-content {\n  padding: 0 1.35rem 1rem;\n  background: transparent;\n  color: rgba(30, 41, 59, 0.84);\n  line-height: 1.6;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-confirm-dialog-icon {\n  width: 2.6rem;\n  height: 2.6rem;\n  margin-right: 0.9rem;\n  border-radius: 16px;\n  display: inline-grid;\n  place-items: center;\n  color: #2563eb;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(14, 165, 233, 0.12));\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer {\n  padding: 0 1.35rem 1.25rem;\n  border: 0;\n  background: transparent;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.7rem;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button {\n  min-width: 120px;\n  min-height: 40px;\n  border-radius: 14px;\n  font-weight: 700;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept {\n  border: 0;\n  color: #fff;\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.approve-confirm-btn {\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.reject-confirm-btn {\n  background: linear-gradient(135deg, #dc2626, #b91c1c);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.info-confirm-btn {\n  background: linear-gradient(135deg, #0f766e, #0ea5a4);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-reject {\n  color: #334155;\n  border: 1px solid rgba(148, 163, 184, 0.4);\n  background: rgba(255, 255, 255, 0.82);\n}\n\n[_nghost-%COMP%]     .p-confirm-dialog .p-dialog-footer .p-button:hover {\n  transform: translateY(-1px);\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 1180px) {\n  .hero-shell[_ngcontent-%COMP%], \n   .lane-header[_ngcontent-%COMP%], \n   .approval-card__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .hero-utility[_ngcontent-%COMP%], \n   .approval-card__finance[_ngcontent-%COMP%] {\n    justify-items: start;\n  }\n\n  .approval-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .approval-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .command-metric-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 840px) {\n  .page-container.approvals-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .hero-utility[_ngcontent-%COMP%], \n   .hero-visual-stack[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-items: stretch;\n  }\n\n  .approval-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .command-metric-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .approval-card__actions[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n\n  .secondary-action[_ngcontent-%COMP%], \n   .reject-action[_ngcontent-%COMP%], \n   .approve-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityApprovalsPage, [{
        type: Component,
        args: [{ selector: 'app-opportunity-approvals-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    TagModule,
                    SelectModule,
                    InputTextModule,
                    ButtonModule,
                    ChipModule,
                    TextareaModule,
                    ConfirmDialogModule,
                    TableModule,
                    BreadcrumbsComponent
                ], providers: [ConfirmationService], template: "<div class=\"page-container approvals-page\">\n  <div class=\"bg-orbs\" aria-hidden=\"true\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-shell liquid-card\">\n    <div class=\"hero-copy\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>{{ isRequester() ? 'My Requests' : 'Decision Inbox' }}</span>\n      </div>\n      <h1 class=\"hero-title\">\n        @if (isRequester()) {\n          <span class=\"hero-title__gradient\">My Approval</span>\n          <span class=\"hero-title__light\">Requests</span>\n        } @else {\n          <span class=\"hero-title__gradient\">Pending Action</span>\n          <span class=\"hero-title__light\">Center</span>\n        }\n      </h1>\n      <p class=\"hero-description\">{{ heroDescription() }}</p>\n      <p class=\"hero-subtitle\">{{ queueSubtitle() }}</p>\n    </div>\n\n    <div class=\"hero-utility\">\n      <div class=\"hero-visual-stack\">\n        <div class=\"hero-visual-card hero-visual-card--danger\">\n          <div class=\"hero-visual-card__icon\">\n            <i class=\"pi pi-bolt\"></i>\n          </div>\n          <div class=\"hero-visual-card__content\">\n            <span class=\"hero-visual-card__label\">{{ isRequester() ? 'Awaiting review' : 'Urgent queue' }}</span>\n            <strong class=\"hero-visual-card__value\">{{ isRequester() ? kpis().pending : kpis().urgent }}</strong>\n            <span class=\"hero-visual-card__meta\">{{ isRequester() ? 'Submitted by you' : kpis().dueToday + ' due today' }}</span>\n          </div>\n        </div>\n\n        <div class=\"hero-visual-card hero-visual-card--info\">\n          <div class=\"hero-visual-card__icon\">\n            <i class=\"pi pi-wallet\"></i>\n          </div>\n          <div class=\"hero-visual-card__content\">\n            <span class=\"hero-visual-card__label\">{{ isRequester() ? 'Request value' : 'Pending value' }}</span>\n            <strong class=\"hero-visual-card__value\">{{ formatCompactCurrency(kpis().totalAmount) }}</strong>\n            <span class=\"hero-visual-card__meta\">{{ isRequester() ? kpis().pending + ' requests pending' : kpis().pending + ' approvals in play' }}</span>\n          </div>\n        </div>\n      </div>\n\n      <button pButton type=\"button\" class=\"command-btn command-btn--ghost refresh-btn\" (click)=\"load()\">\n        <i class=\"pi pi-refresh\"></i>\n        <span>Refresh</span>\n      </button>\n    </div>\n  </section>\n\n  <section class=\"command-metric-grid\">\n    <article\n      *ngFor=\"let metric of commandMetrics()\"\n      class=\"command-metric-card\"\n      [ngClass]=\"'command-metric-card--' + metric.tone\">\n      <span class=\"command-metric-card__label\">{{ metric.label }}</span>\n      <strong class=\"command-metric-card__value\">{{ metric.value }}</strong>\n    </article>\n  </section>\n\n  <section class=\"control-shell liquid-card\">\n    <div class=\"control-actions\">\n      <div class=\"filter-pill search-pill\">\n        <i class=\"pi pi-search\"></i>\n        <input\n          pInputText\n          type=\"text\"\n          [ngModel]=\"searchQuery()\"\n          (ngModelChange)=\"onSearchInput($event)\"\n          placeholder=\"Search opportunity, account, requester, workflow, risk\"\n        />\n      </div>\n\n      <div class=\"filter-pill\">\n        <span class=\"filter-label\">Purpose</span>\n        <p-select\n          appendTo=\"body\"\n          [options]=\"purposeOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [(ngModel)]=\"purposeFilter\"\n          (onChange)=\"load()\"\n          styleClass=\"compact-select\"\n        ></p-select>\n      </div>\n\n      <div class=\"filter-pill\">\n        <span class=\"filter-label\">Status</span>\n        <p-select\n          appendTo=\"body\"\n          [options]=\"statusOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [(ngModel)]=\"statusFilter\"\n          (onChange)=\"load()\"\n          styleClass=\"compact-select\"\n        ></p-select>\n      </div>\n\n      <div class=\"view-toggle\" aria-label=\"Queue view mode\">\n        <button\n          pButton\n          type=\"button\"\n          class=\"view-toggle__btn\"\n          [class.is-active]=\"viewMode() === 'cards'\"\n          (click)=\"setViewMode('cards')\"\n        >\n          <i class=\"pi pi-th-large\" aria-hidden=\"true\"></i>\n          <span>Cards</span>\n        </button>\n        <button\n          pButton\n          type=\"button\"\n          class=\"view-toggle__btn\"\n          [class.is-active]=\"viewMode() === 'table'\"\n          (click)=\"setViewMode('table')\"\n        >\n          <i class=\"pi pi-table\" aria-hidden=\"true\"></i>\n          <span>Table</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"control-insights\">\n      <span class=\"control-note\">Risk: high / medium</span>\n      <span class=\"control-divider\"></span>\n      <span class=\"control-note\">Queue: {{ kpis().pending }} pending</span>\n      <span class=\"control-divider\"></span>\n      <span class=\"control-note\">SLA: {{ kpis().dueSoon }} near deadline</span>\n    </div>\n  </section>\n\n  <ng-container *ngIf=\"!loading(); else pageLoading\">\n    <section *ngIf=\"laneGroups().length; else emptyState\" class=\"lane-stack\">\n      <article\n        *ngFor=\"let lane of laneGroups(); trackBy: trackByLaneKey\"\n        class=\"lane-card liquid-card\"\n        [class.lane-card--danger]=\"lane.tone === 'danger'\"\n        [class.lane-card--warn]=\"lane.tone === 'warn'\"\n      >\n        <header class=\"lane-header\">\n          <div class=\"lane-heading\">\n            <span class=\"lane-kicker\">\n              <i [class]=\"lane.icon\" aria-hidden=\"true\"></i>\n              {{ lane.title }}\n            </span>\n            <p class=\"lane-subtitle\">{{ lane.subtitle }}</p>\n          </div>\n\n          <div class=\"lane-metrics\">\n            <span class=\"lane-metric\">{{ laneLabel(lane) }}</span>\n            <span class=\"lane-metric\">{{ laneValueLabel(lane) }}</span>\n          </div>\n        </header>\n\n        <div class=\"approval-grid\" *ngIf=\"viewMode() === 'cards'; else tableMode\">\n          <article\n            *ngFor=\"let item of lane.items; trackBy: trackByApprovalId\"\n            class=\"approval-card liquid-subcard\"\n            [class.is-selected]=\"isSelected(item)\"\n            [class.tone-critical]=\"queueCardTone(item) === 'critical'\"\n            [class.tone-warn]=\"queueCardTone(item) === 'warn'\"\n            (click)=\"selectDecision(item)\"\n          >\n            <div class=\"approval-card__header\">\n              <div class=\"approval-card__title-wrap\">\n                <div class=\"approval-card__eyebrow\">\n                  <span class=\"eyebrow-pill eyebrow-pill--workflow\">\n                    <i class=\"pi pi-sitemap\" aria-hidden=\"true\"></i>\n                    {{ compactWorkflowLabel(item) }}\n                  </span>\n                  <span class=\"eyebrow-pill eyebrow-pill--purpose\">\n                    <i class=\"pi pi-briefcase\" aria-hidden=\"true\"></i>\n                    {{ purposeLabel(item) }}\n                  </span>\n                </div>\n\n                <div class=\"approval-card__title-row\">\n                  <h3 class=\"approval-card__title\">{{ item.opportunityName }}</h3>\n                  <span *ngIf=\"isMyDecision(item)\" class=\"ownership-pill\">My queue</span>\n                </div>\n                <p class=\"approval-card__workflow compact-workflow\">\n                  <i class=\"pi pi-building\" aria-hidden=\"true\"></i>\n                  {{ item.accountName }}\n                  <span *ngIf=\"item.workflowStepOrder\">\u00B7 Step {{ item.workflowStepOrder }}</span>\n                </p>\n              </div>\n\n              <div class=\"approval-card__finance\">\n                <div class=\"approval-card__amount\">{{ amountLabel(item) }}</div>\n                <div class=\"approval-card__due\" [class.is-overdue]=\"item.slaStatus === 'overdue'\">\n                  {{ slaLabel(item) }}\n                </div>\n              </div>\n            </div>\n\n            <p class=\"approval-card__impact\">{{ actionSummary(item) }}</p>\n            <p class=\"approval-card__policy\">{{ compactPolicySummary(item) }}</p>\n\n            <div class=\"approval-card__signal-row\">\n              <div class=\"signal-pill signal-pill--risk\" [attr.data-tone]=\"(item.riskLevel || 'low').toLowerCase()\">\n                <span class=\"signal-pill__icon\"><i class=\"pi pi-shield\" aria-hidden=\"true\"></i></span>\n                <span class=\"signal-pill__label\">{{ riskLabel(item) }}</span>\n              </div>\n              <div class=\"signal-pill signal-pill--priority\" [attr.data-tone]=\"(item.priority || 'normal').toLowerCase()\">\n                <span class=\"signal-pill__icon\"><i class=\"pi pi-flag-fill\" aria-hidden=\"true\"></i></span>\n                <span class=\"signal-pill__label\">{{ priorityLabel(item) }}</span>\n              </div>\n              <div class=\"signal-pill signal-pill--sla\" [attr.data-tone]=\"item.slaStatus\">\n                <span class=\"signal-pill__icon\"><i class=\"pi pi-stopwatch\" aria-hidden=\"true\"></i></span>\n                <span class=\"signal-pill__label\">{{ dueBadgeLabel(item) }}</span>\n              </div>\n            </div>\n\n            <div class=\"approval-card__meta\">\n              <span class=\"meta-pill\">\n                <i class=\"pi pi-user\" aria-hidden=\"true\"></i>\n                {{ requesterLabel(item) }}\n              </span>\n              <span class=\"meta-pill\">\n                <i class=\"pi pi-id-card\" aria-hidden=\"true\"></i>\n                {{ item.approverRole || 'Approver' }}\n              </span>\n              <span class=\"meta-pill\">\n                <i class=\"pi pi-history\" aria-hidden=\"true\"></i>\n                {{ relativeTime(item.requestedOn) }}\n              </span>\n              <span class=\"meta-pill\">\n                <i class=\"pi pi-bell\" aria-hidden=\"true\"></i>\n                {{ metaDueLabel(item) }}\n              </span>\n            </div>\n\n            <div class=\"approval-card__detail\" *ngIf=\"isSelected(item)\">\n              <div class=\"detail-grid\">\n                <div class=\"detail-block\">\n                  <span class=\"detail-label\">Business impact</span>\n                  <p>{{ item.businessImpactLabel || 'Affects forecast and approval governance.' }}</p>\n                </div>\n                <div class=\"detail-block\">\n                  <span class=\"detail-label\">Policy reason</span>\n                  <p>{{ item.policyReason || 'Policy review is required before the deal can advance.' }}</p>\n                </div>\n              </div>\n\n              <div class=\"detail-grid detail-grid--secondary\">\n                <div class=\"detail-block\">\n                  <span class=\"detail-label\">Workflow context</span>\n                  <p>\n                    {{ workflowLabel(item) }}\n                    <span *ngIf=\"item.workflowStepOrder\">\u00B7 Step {{ item.workflowStepOrder }}</span>\n                  </p>\n                </div>\n                <div class=\"detail-block\">\n                  <span class=\"detail-label\">Decision type</span>\n                  <p>{{ humanizeDecisionType(item.decisionType) }}</p>\n                </div>\n              </div>\n\n              @if (canManage()) {\n              <label class=\"note-field\">\n                <span class=\"detail-label\">Decision note</span>\n                <textarea\n                  pTextarea\n                  rows=\"3\"\n                  [autoResize]=\"true\"\n                  [(ngModel)]=\"noteInputs[item.id]\"\n                  placeholder=\"Capture context for approval, rejection, or a follow-up request.\"\n                  (click)=\"$event.stopPropagation()\"\n                ></textarea>\n              </label>\n              }\n            </div>\n\n            <div class=\"approval-card__actions\" (click)=\"$event.stopPropagation()\">\n              @if (canManage()) {\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"secondary-action\"\n                  label=\"Request Info\"\n                  icon=\"pi pi-comment\"\n                  [disabled]=\"isActioning(item.id)\"\n                  (click)=\"requestInfo(item)\"\n                ></button>\n              }\n              <button\n                pButton\n                type=\"button\"\n                class=\"secondary-action\"\n                label=\"Details\"\n                icon=\"pi pi-arrow-right\"\n                iconPos=\"right\"\n                (click)=\"openOpportunity(item)\"\n              ></button>\n              @if (canManage()) {\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"reject-action\"\n                  label=\"Reject\"\n                  [disabled]=\"isActioning(item.id)\"\n                  (click)=\"decide(item, false)\"\n                ></button>\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"approve-action\"\n                  label=\"Approve\"\n                  [loading]=\"isActioning(item.id)\"\n                  [disabled]=\"isActioning(item.id)\"\n                  (click)=\"decide(item, true)\"\n                ></button>\n              }\n            </div>\n          </article>\n        </div>\n\n        <ng-template #tableMode>\n          <div class=\"approval-table\">\n            <p-table\n              [value]=\"lane.items\"\n              dataKey=\"id\"\n              styleClass=\"approval-data-table\"\n              [tableStyle]=\"{ 'min-width': '100%' }\">\n              <ng-template pTemplate=\"header\">\n                <tr>\n                  <th>Deal</th>\n                  <th>Requester</th>\n                  <th>Value</th>\n                  <th>Risk</th>\n                  <th>Priority</th>\n                  <th>SLA</th>\n                  <th>Actions</th>\n                </tr>\n              </ng-template>\n\n              <ng-template pTemplate=\"body\" let-item>\n                <tr\n                  class=\"approval-data-row\"\n                  [class.is-selected]=\"isSelected(item)\"\n                  (click)=\"selectDecision(item)\">\n                  <td>\n                    <div class=\"approval-data-cell approval-data-cell--deal\">\n                      <strong>{{ item.opportunityName }}</strong>\n                      <span>{{ item.accountName }} \u00B7 {{ compactWorkflowLabel(item) }}</span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"approval-data-cell\">\n                      <span>{{ requesterLabel(item) }}</span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"approval-data-cell\">\n                      <span class=\"row-chip row-chip--value\">{{ amountLabel(item) }}</span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"approval-data-cell\">\n                      <span class=\"row-chip\" [attr.data-tone]=\"(item.riskLevel || 'low').toLowerCase()\">\n                        <i class=\"pi pi-shield\" aria-hidden=\"true\"></i>\n                        {{ riskLabel(item) }}\n                      </span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"approval-data-cell\">\n                      <span class=\"row-chip\" [attr.data-tone]=\"(item.priority || 'normal').toLowerCase()\">\n                        <i class=\"pi pi-flag-fill\" aria-hidden=\"true\"></i>\n                        {{ priorityLabel(item) }}\n                      </span>\n                    </div>\n                  </td>\n                  <td>\n                    <div class=\"approval-data-cell\">\n                      <span class=\"row-chip\" [attr.data-tone]=\"item.slaStatus\">\n                        <i class=\"pi pi-stopwatch\" aria-hidden=\"true\"></i>\n                        {{ slaLabel(item) }}\n                      </span>\n                    </div>\n                  </td>\n                  <td (click)=\"$event.stopPropagation()\">\n                    <div class=\"approval-data-actions\">\n                      @if (canManage()) {\n                        <button\n                          pButton\n                          type=\"button\"\n                          class=\"secondary-action secondary-action--compact\"\n                          label=\"Request Info\"\n                          [disabled]=\"isActioning(item.id)\"\n                          (click)=\"requestInfo(item)\"\n                        ></button>\n                      }\n                      <button\n                        pButton\n                        type=\"button\"\n                        class=\"secondary-action secondary-action--compact\"\n                        label=\"Details\"\n                        (click)=\"openOpportunity(item)\"\n                      ></button>\n                      @if (canManage()) {\n                        <button\n                          pButton\n                          type=\"button\"\n                          class=\"reject-action reject-action--compact\"\n                          label=\"Reject\"\n                          [disabled]=\"isActioning(item.id)\"\n                          (click)=\"decide(item, false)\"\n                        ></button>\n                        <button\n                          pButton\n                          type=\"button\"\n                          class=\"approve-action approve-action--compact\"\n                          label=\"Approve\"\n                          [loading]=\"isActioning(item.id)\"\n                          [disabled]=\"isActioning(item.id)\"\n                          (click)=\"decide(item, true)\"\n                        ></button>\n                      }\n                    </div>\n                  </td>\n                </tr>\n              </ng-template>\n            </p-table>\n          </div>\n        </ng-template>\n      </article>\n    </section>\n  </ng-container>\n</div>\n\n<ng-template #pageLoading>\n  <section class=\"loading-shell liquid-card\">\n    <div class=\"skeleton-row\" *ngFor=\"let row of [1,2,3,4,5,6]\"></div>\n  </section>\n</ng-template>\n\n<p-confirmDialog [baseZIndex]=\"12000\"></p-confirmDialog>\n\n<ng-template #emptyState>\n  <section class=\"empty-shell liquid-card\">\n    <div class=\"empty-icon\"><i class=\"pi pi-check-circle\"></i></div>\n    <h2>{{ emptyListMessage() }}</h2>\n    <p>{{ emptyDetailSubtitle() }}</p>\n  </section>\n</ng-template>\n", styles: [":host {\n  display: block;\n}\n\n.page-container.approvals-page {\n  position: relative;\n  padding: 1.5rem 1.75rem 2rem;\n  color: #0f172a;\n  background:\n    radial-gradient(ellipse 70% 42% at 15% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 58%),\n    radial-gradient(ellipse 55% 35% at 92% 12%, rgba(139, 92, 246, 0.1) 0%, transparent 52%),\n    radial-gradient(ellipse 50% 30% at 6% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 48%),\n    linear-gradient(\n      180deg,\n      rgba(248, 250, 252, 0.96) 0%,\n      rgba(255, 255, 255, 0.98) 42%,\n      rgba(241, 245, 249, 0.72) 100%\n    );\n  min-height: calc(100vh - 56px);\n  overflow: hidden;\n}\n\n.bg-orbs {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 999px;\n  filter: blur(6px);\n  opacity: 0.9;\n}\n\n.orb-1 {\n  width: 360px;\n  height: 360px;\n  top: -130px;\n  left: -120px;\n  background: radial-gradient(circle, rgba(37, 99, 235, 0.16), rgba(59, 130, 246, 0.06) 55%, transparent 72%);\n}\n\n.orb-2 {\n  width: 420px;\n  height: 420px;\n  right: -150px;\n  bottom: -80px;\n  background: radial-gradient(circle, rgba(6, 182, 212, 0.14), rgba(14, 165, 233, 0.05) 60%, transparent 76%);\n}\n\n.orb-3 {\n  width: 300px;\n  height: 300px;\n  top: 12rem;\n  right: 22%;\n  background: radial-gradient(circle, rgba(139, 92, 246, 0.12), rgba(79, 70, 229, 0.04) 58%, transparent 74%);\n}\n\n.liquid-card {\n  position: relative;\n  z-index: 1;\n  border-radius: 22px;\n  border: 1px solid rgba(255, 255, 255, 0.72);\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.72)),\n    linear-gradient(180deg, rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.78));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    inset 0 -1px 0 rgba(226, 232, 240, 0.7),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n  backdrop-filter: blur(24px) saturate(160%);\n}\n\n.liquid-subcard {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.76);\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.8)),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(248, 250, 252, 0.82));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.hero-shell {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.25rem;\n  padding: 1.25rem 1.3rem;\n  margin-top: 0.75rem;\n}\n\n.hero-copy {\n  min-width: 0;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  background: rgba(59, 130, 246, 0.08);\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #1d4ed8;\n}\n\n.badge-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #34d399;\n  box-shadow: 0 0 10px rgba(52, 211, 153, 0.8);\n}\n\n.hero-title {\n  margin: 0.6rem 0 0.35rem;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  align-items: baseline;\n  font-size: clamp(1.95rem, 2.6vw, 2.6rem);\n  line-height: 1;\n  letter-spacing: -0.04em;\n}\n\n.hero-title__gradient {\n  background: linear-gradient(135deg, #4ea6ff 0%, #2563eb 60%, #3344d3 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n\n.hero-title__light {\n  color: #274064;\n}\n\n.hero-description,\n.hero-subtitle {\n  margin: 0;\n  max-width: 760px;\n  color: rgba(51, 65, 85, 0.8);\n}\n\n.hero-subtitle {\n  margin-top: 0.45rem;\n  font-size: 0.92rem;\n}\n\n.hero-utility {\n  display: grid;\n  gap: 0.8rem;\n  justify-items: end;\n}\n\n.hero-visual-stack {\n  display: grid;\n  gap: 0.75rem;\n  width: min(100%, 280px);\n}\n\n.hero-visual-card {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 0.9rem 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(255, 255, 255, 0.84);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n}\n\n.hero-visual-card__icon {\n  width: 2.55rem;\n  height: 2.55rem;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  color: #fff;\n  font-size: 1rem;\n}\n\n.hero-visual-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.12rem;\n  min-width: 0;\n}\n\n.hero-visual-card__label {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n.hero-visual-card__value {\n  font-size: 1.55rem;\n  font-weight: 800;\n  line-height: 1;\n  letter-spacing: -0.03em;\n  color: #132447;\n}\n\n.hero-visual-card__meta {\n  font-size: 0.8rem;\n  color: #4f6492;\n}\n\n.hero-visual-card--danger .hero-visual-card__icon {\n  background: linear-gradient(180deg, #ff4a66, #e02547);\n}\n\n.hero-visual-card--info .hero-visual-card__icon {\n  background: linear-gradient(180deg, #4ea6ff, #2a67de);\n}\n\n.command-metric-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.85rem;\n  margin-top: 1rem;\n}\n\n.command-metric-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.9rem 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(184, 196, 228, 0.7);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.83), rgba(246, 248, 255, 0.8));\n}\n\n.command-metric-card__label {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: rgba(54, 68, 101, 0.95);\n}\n\n.command-metric-card__value {\n  font-size: 1.6rem;\n  line-height: 1;\n  font-weight: 800;\n  color: #2a67de;\n}\n\n.command-metric-card--danger .command-metric-card__value {\n  color: #e64a63;\n}\n\n.command-metric-card--warn .command-metric-card__value {\n  color: #ef9630;\n}\n\n.refresh-btn {\n  min-width: 132px;\n}\n\n.control-shell {\n  margin-top: 1rem;\n  padding: 0.95rem 1rem;\n  display: grid;\n  gap: 0.85rem;\n}\n\n.control-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.view-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: rgba(255, 255, 255, 0.82);\n}\n\n.view-toggle__btn {\n  min-width: 96px;\n  min-height: 40px;\n  border-radius: 12px;\n  border: 0;\n  background: transparent;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  font-weight: 700;\n}\n\n.view-toggle__btn.is-active {\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(14, 165, 233, 0.08));\n  color: #1d4ed8;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95);\n}\n\n.filter-pill {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-height: 52px;\n  padding: 0.45rem 0.8rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.search-pill {\n  flex: 1 1 360px;\n  min-width: 280px;\n}\n\n.search-pill i {\n  color: rgba(71, 85, 105, 0.72);\n}\n\n.search-pill input[pInputText] {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  padding: 0;\n}\n\n.filter-label {\n  color: rgba(71, 85, 105, 0.76);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.control-insights {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.6rem;\n  color: rgba(51, 65, 85, 0.78);\n  font-size: 0.9rem;\n}\n\n.control-note {\n  white-space: nowrap;\n}\n\n.control-divider {\n  width: 1px;\n  height: 16px;\n  background: rgba(148, 163, 184, 0.35);\n}\n\n.lane-stack {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\n.lane-card {\n  padding: 1rem;\n}\n\n.lane-card--danger {\n  box-shadow:\n    inset 4px 0 0 rgba(239, 68, 68, 0.78),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n}\n\n.lane-card--warn {\n  box-shadow:\n    inset 4px 0 0 rgba(245, 158, 11, 0.78),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 32px rgba(15, 23, 42, 0.08),\n    0 1px 2px rgba(15, 23, 42, 0.05);\n}\n\n.lane-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.9rem;\n}\n\n.lane-kicker {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #475569;\n  font-size: 0.95rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.lane-subtitle {\n  margin: 0.35rem 0 0;\n  color: rgba(71, 85, 105, 0.76);\n}\n\n.lane-metrics {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  justify-content: flex-end;\n}\n\n.lane-metric {\n  display: inline-flex;\n  align-items: center;\n  min-height: 38px;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.92);\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  color: #334155;\n  font-weight: 700;\n}\n\n.approval-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.approval-card {\n  display: grid;\n  gap: 0.65rem;\n  padding: 0.82rem 0.88rem;\n  cursor: pointer;\n  transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;\n}\n\n.approval-card:hover {\n  transform: translateY(-1px);\n  border-color: rgba(96, 165, 250, 0.35);\n}\n\n.approval-card.is-selected {\n  border-color: rgba(59, 130, 246, 0.34);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 14px 24px rgba(37, 99, 235, 0.12);\n}\n\n.approval-card.tone-critical {\n  box-shadow:\n    inset 4px 0 0 rgba(239, 68, 68, 0.7),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.approval-card.tone-warn {\n  box-shadow:\n    inset 4px 0 0 rgba(245, 158, 11, 0.72),\n    inset 0 1px 0 rgba(255, 255, 255, 0.95),\n    0 10px 22px rgba(15, 23, 42, 0.06);\n}\n\n.approval-card__header,\n.approval-card__title-row,\n.approval-card__meta,\n.approval-card__actions {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.approval-card__title-wrap {\n  min-width: 0;\n}\n\n.approval-card__eyebrow {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  margin-bottom: 0.15rem;\n}\n\n.eyebrow-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  min-height: 24px;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n\n.eyebrow-pill--workflow {\n  background: rgba(224, 231, 255, 0.88);\n  color: #4338ca;\n}\n\n.eyebrow-pill--purpose {\n  background: rgba(254, 243, 199, 0.88);\n  color: #b45309;\n}\n\n.approval-card__title {\n  margin: 0;\n  font-size: 0.98rem;\n  line-height: 1.2;\n  color: #0f172a;\n}\n\n.approval-card__workflow {\n  margin: 0.2rem 0 0;\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.8rem;\n}\n\n.compact-workflow {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.ownership-pill {\n  display: inline-flex;\n  align-items: center;\n  min-height: 24px;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  background: rgba(219, 234, 254, 0.88);\n  color: #1d4ed8;\n  font-size: 0.7rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.approval-card__finance {\n  display: grid;\n  gap: 0.25rem;\n  justify-items: end;\n  flex-shrink: 0;\n}\n\n.approval-card__amount {\n  padding: 0.34rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(255, 247, 237, 0.96);\n  color: #0f172a;\n  font-size: 1.1rem;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n}\n\n.approval-card__due {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #475569;\n}\n\n.approval-card__due.is-overdue {\n  color: #b91c1c;\n}\n\n.approval-card__impact {\n  margin: 0;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #334155;\n}\n\n.approval-card__policy {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.78);\n  line-height: 1.35;\n  font-size: 0.8rem;\n}\n\n.approval-card__signal-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.signal-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.42rem;\n  min-height: 28px;\n  padding: 0.18rem 0.58rem;\n  border-radius: 999px;\n  font-size: 0.74rem;\n  font-weight: 800;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(255, 255, 255, 0.88);\n  color: #334155;\n}\n\n.signal-pill__icon {\n  width: 1.1rem;\n  height: 1.1rem;\n  border-radius: 50%;\n  display: inline-grid;\n  place-items: center;\n  font-size: 0.62rem;\n  background: rgba(148, 163, 184, 0.16);\n}\n\n.signal-pill[data-tone='high'],\n.signal-pill[data-tone='overdue'],\n.signal-pill[data-tone='critical'] {\n  color: #b91c1c;\n  background: rgba(254, 242, 242, 0.95);\n  border-color: rgba(252, 165, 165, 0.7);\n}\n\n.signal-pill[data-tone='high'] .signal-pill__icon,\n.signal-pill[data-tone='overdue'] .signal-pill__icon,\n.signal-pill[data-tone='critical'] .signal-pill__icon {\n  background: rgba(239, 68, 68, 0.14);\n}\n\n.signal-pill[data-tone='medium'],\n.signal-pill[data-tone='warn'],\n.signal-pill[data-tone='at-risk'] {\n  color: #a16207;\n  background: rgba(255, 251, 235, 0.95);\n  border-color: rgba(253, 224, 71, 0.75);\n}\n\n.signal-pill[data-tone='medium'] .signal-pill__icon,\n.signal-pill[data-tone='warn'] .signal-pill__icon,\n.signal-pill[data-tone='at-risk'] .signal-pill__icon {\n  background: rgba(245, 158, 11, 0.14);\n}\n\n.signal-pill[data-tone='low'],\n.signal-pill[data-tone='normal'],\n.signal-pill[data-tone='on-track'] {\n  color: #166534;\n  background: rgba(240, 253, 244, 0.94);\n  border-color: rgba(134, 239, 172, 0.72);\n}\n\n.signal-pill[data-tone='low'] .signal-pill__icon,\n.signal-pill[data-tone='normal'] .signal-pill__icon,\n.signal-pill[data-tone='on-track'] .signal-pill__icon {\n  background: rgba(34, 197, 94, 0.14);\n}\n\n.approval-card__meta {\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.45rem;\n}\n\n.meta-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.34rem;\n  min-height: 24px;\n  padding: 0.12rem 0.5rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.95);\n  border: 1px solid rgba(226, 232, 240, 0.88);\n  color: rgba(51, 65, 85, 0.82);\n  font-size: 0.74rem;\n  font-weight: 600;\n}\n\n.approval-card__detail {\n  display: grid;\n  gap: 0.8rem;\n  padding: 0.78rem;\n  border-radius: 16px;\n  border: 1px solid rgba(226, 232, 240, 0.9);\n  background: rgba(248, 250, 252, 0.72);\n}\n\n.detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.detail-grid--secondary {\n  padding-top: 0.1rem;\n}\n\n.detail-block {\n  display: grid;\n  gap: 0.25rem;\n}\n\n.detail-label {\n  color: rgba(71, 85, 105, 0.78);\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.detail-block p {\n  margin: 0;\n  color: #1e293b;\n  line-height: 1.45;\n}\n\n.note-field {\n  display: grid;\n  gap: 0.4rem;\n}\n\n.note-field textarea {\n  width: 100%;\n  resize: vertical;\n}\n\n.approval-card__actions {\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.45rem;\n  padding-top: 0.1rem;\n}\n\n.approval-table {\n  position: relative;\n}\n\n:host ::ng-deep .approval-data-table .p-datatable-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background: rgba(255, 255, 255, 0.64);\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n:host ::ng-deep .approval-data-table .p-datatable-thead > tr > th {\n  padding: 0.85rem 1rem;\n  border: 0;\n  background: linear-gradient(145deg, rgba(226, 237, 255, 0.92), rgba(214, 228, 255, 0.86));\n  color: #41557f;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(174, 189, 221, 0.42);\n}\n\n:host ::ng-deep .approval-data-table .p-datatable-tbody > tr > td {\n  padding: 0.9rem 1rem;\n  border: 0;\n  border-bottom: 1px solid rgba(196, 207, 231, 0.58);\n  background: rgba(255, 255, 255, 0.5);\n  vertical-align: middle;\n}\n\n.approval-data-row {\n  cursor: pointer;\n  transition: background-color 140ms ease;\n}\n\n.approval-data-row:hover {\n  background: rgba(234, 242, 255, 0.34);\n}\n\n:host ::ng-deep .approval-data-table .p-datatable-tbody > tr.approval-data-row.is-selected > td {\n  background: rgba(224, 236, 255, 0.62);\n  border-bottom-color: rgba(96, 165, 250, 0.42);\n}\n\n.approval-data-cell {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.3rem;\n  min-width: 0;\n  color: #334155;\n}\n\n.approval-data-cell--deal strong {\n  font-size: 0.98rem;\n  color: #0f172a;\n}\n\n.approval-data-cell--deal span {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.8rem;\n  line-height: 1.35;\n}\n\n.row-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  min-height: 24px;\n  padding: 0.12rem 0.5rem;\n  border-radius: 999px;\n  background: rgba(248, 250, 252, 0.95);\n  border: 1px solid rgba(226, 232, 240, 0.88);\n  color: #334155;\n  font-size: 0.72rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.row-chip--value {\n  background: rgba(255, 247, 237, 0.96);\n  color: #0f172a;\n}\n\n.row-chip[data-tone='high'],\n.row-chip[data-tone='overdue'],\n.row-chip[data-tone='critical'] {\n  color: #b91c1c;\n  background: rgba(254, 242, 242, 0.95);\n  border-color: rgba(252, 165, 165, 0.7);\n}\n\n.row-chip[data-tone='medium'],\n.row-chip[data-tone='at-risk'] {\n  color: #a16207;\n  background: rgba(255, 251, 235, 0.95);\n  border-color: rgba(253, 224, 71, 0.75);\n}\n\n.row-chip[data-tone='low'],\n.row-chip[data-tone='normal'],\n.row-chip[data-tone='on-track'] {\n  color: #166534;\n  background: rgba(240, 253, 244, 0.94);\n  border-color: rgba(134, 239, 172, 0.72);\n}\n\n.approval-data-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  justify-content: flex-end;\n}\n\n.secondary-action,\n.reject-action,\n.approve-action {\n  min-width: 108px;\n}\n\n.secondary-action {\n  background: rgba(255, 255, 255, 0.86);\n  color: #334155;\n  border-color: rgba(203, 213, 225, 0.9);\n}\n\n.reject-action {\n  background: rgba(255, 255, 255, 0.94);\n  color: #b91c1c;\n  border-color: rgba(252, 165, 165, 0.8);\n}\n\n.approve-action {\n  background: linear-gradient(135deg, #3b82f6, #2563eb);\n  border-color: rgba(37, 99, 235, 0.9);\n}\n\n.loading-shell,\n.empty-shell {\n  position: relative;\n  z-index: 1;\n  margin-top: 1rem;\n  padding: 1.15rem;\n}\n\n.loading-shell {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.skeleton-row {\n  height: 92px;\n  border-radius: 16px;\n  background:\n    linear-gradient(90deg, rgba(226, 232, 240, 0.68), rgba(248, 250, 252, 0.95), rgba(226, 232, 240, 0.68));\n  background-size: 220% 100%;\n  animation: shimmer 1.4s infinite linear;\n}\n\n.empty-shell {\n  text-align: center;\n}\n\n.empty-icon {\n  width: 64px;\n  height: 64px;\n  margin: 0 auto 1rem;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: rgba(219, 234, 254, 0.85);\n  color: #2563eb;\n  font-size: 1.7rem;\n}\n\n.empty-shell h2 {\n  margin: 0;\n  color: #0f172a;\n  font-size: 1.3rem;\n}\n\n.empty-shell p {\n  margin: 0.45rem auto 0;\n  max-width: 540px;\n  color: rgba(71, 85, 105, 0.78);\n}\n\n:host ::ng-deep .compact-select .p-select {\n  min-width: 160px;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n:host ::ng-deep .secondary-action.p-button,\n:host ::ng-deep .reject-action.p-button,\n:host ::ng-deep .approve-action.p-button,\n:host ::ng-deep .refresh-btn.p-button,\n:host ::ng-deep .view-toggle__btn.p-button {\n  border-radius: 12px;\n  min-height: 36px;\n  font-size: 0.83rem;\n  padding: 0.45rem 0.72rem;\n}\n\n:host ::ng-deep .secondary-action--compact.p-button,\n:host ::ng-deep .reject-action--compact.p-button,\n:host ::ng-deep .approve-action--compact.p-button {\n  min-width: 86px;\n  min-height: 30px;\n  font-size: 0.74rem;\n  padding: 0.32rem 0.58rem;\n}\n\n:host ::ng-deep .p-confirm-dialog {\n  width: min(92vw, 34rem);\n  border-radius: 24px;\n  overflow: hidden;\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  background:\n    radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 42%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));\n  box-shadow:\n    0 24px 70px rgba(15, 23, 42, 0.2),\n    inset 0 1px 0 rgba(255, 255, 255, 0.7);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-header {\n  padding: 1.15rem 1.35rem 0.6rem;\n  background: transparent;\n  border: 0;\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-title {\n  color: #0f172a;\n  font-size: 1.05rem;\n  font-weight: 800;\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-content {\n  padding: 0 1.35rem 1rem;\n  background: transparent;\n  color: rgba(30, 41, 59, 0.84);\n  line-height: 1.6;\n}\n\n:host ::ng-deep .p-confirm-dialog .p-confirm-dialog-icon {\n  width: 2.6rem;\n  height: 2.6rem;\n  margin-right: 0.9rem;\n  border-radius: 16px;\n  display: inline-grid;\n  place-items: center;\n  color: #2563eb;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(14, 165, 233, 0.12));\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer {\n  padding: 0 1.35rem 1.25rem;\n  border: 0;\n  background: transparent;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.7rem;\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button {\n  min-width: 120px;\n  min-height: 40px;\n  border-radius: 14px;\n  font-weight: 700;\n  box-shadow: none;\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept {\n  border: 0;\n  color: #fff;\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.approve-confirm-btn {\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.reject-confirm-btn {\n  background: linear-gradient(135deg, #dc2626, #b91c1c);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-accept.info-confirm-btn {\n  background: linear-gradient(135deg, #0f766e, #0ea5a4);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button.p-confirm-dialog-reject {\n  color: #334155;\n  border: 1px solid rgba(148, 163, 184, 0.4);\n  background: rgba(255, 255, 255, 0.82);\n}\n\n:host ::ng-deep .p-confirm-dialog .p-dialog-footer .p-button:hover {\n  transform: translateY(-1px);\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 1180px) {\n  .hero-shell,\n  .lane-header,\n  .approval-card__header {\n    flex-direction: column;\n  }\n\n  .hero-utility,\n  .approval-card__finance {\n    justify-items: start;\n  }\n\n  .approval-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .approval-row {\n    grid-template-columns: 1fr;\n  }\n\n  .command-metric-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 840px) {\n  .page-container.approvals-page {\n    padding: 1rem;\n  }\n\n  .detail-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .hero-utility,\n  .hero-visual-stack {\n    width: 100%;\n    justify-items: stretch;\n  }\n\n  .approval-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .command-metric-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .approval-card__actions {\n    justify-content: stretch;\n  }\n\n  .secondary-action,\n  .reject-action,\n  .approve-action {\n    width: 100%;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpportunityApprovalsPage, { className: "OpportunityApprovalsPage", filePath: "src/app/crm/features/opportunities/pages/opportunity-approvals.page.ts", lineNumber: 67 }); })();
