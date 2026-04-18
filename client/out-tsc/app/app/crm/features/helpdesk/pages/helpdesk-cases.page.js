import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { HelpDeskDataService } from '../services/helpdesk-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/table";
const _c0 = () => [10, 20, 50];
const _c1 = () => ["caseNumber", "subject", "accountName", "contactName"];
function HelpDeskCasesPage_button_47_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_button_47_Template_button_click_0_listener() { const view_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.applyQuickView(view_r3.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const view_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r3.activeView() === view_r3.value);
    i0.ɵɵproperty("label", view_r3.label);
} }
function HelpDeskCasesPage_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 27);
    i0.ɵɵlistener("ngModelChange", function HelpDeskCasesPage_div_48_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.bulkStatus.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 28);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_div_48_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.applyBulkStatus()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-select", 29);
    i0.ɵɵlistener("ngModelChange", function HelpDeskCasesPage_div_48_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.bulkQueueId.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 30);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_div_48_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.applyBulkAssignQueue()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 31);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_div_48_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.clearSelection()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r3.selectedCases().length, " selected");
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r3.statusOptions)("ngModel", ctx_r3.bulkStatus());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r3.bulkStatus() || ctx_r3.bulkSaving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r3.bulkQueueOptions())("ngModel", ctx_r3.bulkQueueId());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r3.bulkQueueId() || ctx_r3.bulkSaving());
} }
function HelpDeskCasesPage_ng_template_51_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "span", 33);
    i0.ɵɵelement(2, "i", 34);
    i0.ɵɵelementStart(3, "input", 35);
    i0.ɵɵlistener("input", function HelpDeskCasesPage_ng_template_51_Template_input_input_3_listener($event) { i0.ɵɵrestoreView(_r6); i0.ɵɵnextContext(); const dt_r7 = i0.ɵɵreference(50); return i0.ɵɵresetView(dt_r7.filterGlobal($event.target.value, "contains")); });
    i0.ɵɵelementEnd()()();
} }
function HelpDeskCasesPage_ng_template_52_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_38_Template_p_select_onChange_0_listener($event) { const filter_r9 = i0.ɵɵrestoreView(_r8).filterCallback; return i0.ɵɵresetView(filter_r9($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r10 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.statusOptions)("ngModel", value_r10);
} }
function HelpDeskCasesPage_ng_template_52_ng_template_41_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_41_Template_p_select_onChange_0_listener($event) { const filter_r12 = i0.ɵɵrestoreView(_r11).filterCallback; return i0.ɵɵresetView(filter_r12($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r13 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.priorityOptions)("ngModel", value_r13);
} }
function HelpDeskCasesPage_ng_template_52_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_44_Template_p_select_onChange_0_listener($event) { const filter_r15 = i0.ɵɵrestoreView(_r14).filterCallback; return i0.ɵɵresetView(filter_r15($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r16 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.severityOptions)("ngModel", value_r16);
} }
function HelpDeskCasesPage_ng_template_52_ng_template_47_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_47_Template_p_select_onChange_0_listener($event) { const filter_r18 = i0.ɵɵrestoreView(_r17).filterCallback; return i0.ɵɵresetView(filter_r18($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r19 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.queueOptions())("ngModel", value_r19);
} }
function HelpDeskCasesPage_ng_template_52_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_50_Template_p_select_onChange_0_listener($event) { const filter_r21 = i0.ɵɵrestoreView(_r20).filterCallback; return i0.ɵɵresetView(filter_r21($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r22 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.ownerOptions())("ngModel", value_r22);
} }
function HelpDeskCasesPage_ng_template_52_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 65);
    i0.ɵɵlistener("onChange", function HelpDeskCasesPage_ng_template_52_ng_template_53_Template_p_select_onChange_0_listener($event) { const filter_r24 = i0.ɵɵrestoreView(_r23).filterCallback; return i0.ɵɵresetView(filter_r24($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r25 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r3.sourceOptions)("ngModel", value_r25);
} }
function HelpDeskCasesPage_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 36);
    i0.ɵɵelement(2, "p-tableHeaderCheckbox");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 37);
    i0.ɵɵtext(4, "Case # ");
    i0.ɵɵelement(5, "p-sortIcon", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 39);
    i0.ɵɵtext(7, "Subject ");
    i0.ɵɵelement(8, "p-sortIcon", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 41);
    i0.ɵɵtext(10, "Status ");
    i0.ɵɵelement(11, "p-sortIcon", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 43);
    i0.ɵɵtext(13, "Priority ");
    i0.ɵɵelement(14, "p-sortIcon", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 45);
    i0.ɵɵtext(16, "Severity ");
    i0.ɵɵelement(17, "p-sortIcon", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 47);
    i0.ɵɵtext(19, "Queue ");
    i0.ɵɵelement(20, "p-sortIcon", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th", 49);
    i0.ɵɵtext(22, "Owner ");
    i0.ɵɵelement(23, "p-sortIcon", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "th", 51);
    i0.ɵɵtext(25, "Source ");
    i0.ɵɵelement(26, "p-sortIcon", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "th", 53);
    i0.ɵɵtext(28, "SLA ");
    i0.ɵɵelement(29, "p-sortIcon", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "tr");
    i0.ɵɵelement(31, "th");
    i0.ɵɵelementStart(32, "th");
    i0.ɵɵelement(33, "p-columnFilter", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "th");
    i0.ɵɵelement(35, "p-columnFilter", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "th")(37, "p-columnFilter", 57);
    i0.ɵɵtemplate(38, HelpDeskCasesPage_ng_template_52_ng_template_38_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "th")(40, "p-columnFilter", 59);
    i0.ɵɵtemplate(41, HelpDeskCasesPage_ng_template_52_ng_template_41_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "th")(43, "p-columnFilter", 60);
    i0.ɵɵtemplate(44, HelpDeskCasesPage_ng_template_52_ng_template_44_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "th")(46, "p-columnFilter", 61);
    i0.ɵɵtemplate(47, HelpDeskCasesPage_ng_template_52_ng_template_47_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "th")(49, "p-columnFilter", 62);
    i0.ɵɵtemplate(50, HelpDeskCasesPage_ng_template_52_ng_template_50_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "th")(52, "p-columnFilter", 63);
    i0.ɵɵtemplate(53, HelpDeskCasesPage_ng_template_52_ng_template_53_Template, 1, 2, "ng-template", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵelement(55, "p-columnFilter", 64);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(37);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("showMatchModes", false)("showOperator", false)("showAddButton", false);
} }
function HelpDeskCasesPage_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 66);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_ng_template_53_Template_tr_click_0_listener() { const row_r27 = i0.ɵɵrestoreView(_r26).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.openCase(row_r27)); });
    i0.ɵɵelementStart(1, "td", 66);
    i0.ɵɵlistener("click", function HelpDeskCasesPage_ng_template_53_Template_td_click_1_listener($event) { i0.ɵɵrestoreView(_r26); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(2, "p-tableCheckbox", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td")(20, "div", 68)(21, "span", 69);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "small");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r27 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r27);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.caseNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.severity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.queueName || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.ownerUserName || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.source);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("breached", ctx_r3.getSlaState(row_r27) === "breached")("at-risk", ctx_r3.getSlaState(row_r27) === "at-risk")("healthy", ctx_r3.getSlaState(row_r27) === "healthy");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 17, ctx_r3.getSlaState(row_r27)), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.formatDueIn(row_r27.resolutionDueUtc));
} }
function HelpDeskCasesPage_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 70);
    i0.ɵɵtext(2, "No support cases found.");
    i0.ɵɵelementEnd()();
} }
export class HelpDeskCasesPage {
    data = inject(HelpDeskDataService);
    toast = inject(AppToastService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    realtime = inject(CrmEventsService);
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    bulkSaving = signal(false, ...(ngDevMode ? [{ debugName: "bulkSaving" }] : []));
    cases = signal([], ...(ngDevMode ? [{ debugName: "cases" }] : []));
    queues = signal([], ...(ngDevMode ? [{ debugName: "queues" }] : []));
    selectedCases = signal([], ...(ngDevMode ? [{ debugName: "selectedCases" }] : []));
    summary = signal({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0, averageCsatScore: null, ratedCaseCount: 0, topClosureReasons: [] }, ...(ngDevMode ? [{ debugName: "summary" }] : []));
    activeView = signal('all', ...(ngDevMode ? [{ debugName: "activeView" }] : []));
    bulkStatus = signal(null, ...(ngDevMode ? [{ debugName: "bulkStatus" }] : []));
    bulkQueueId = signal(null, ...(ngDevMode ? [{ debugName: "bulkQueueId" }] : []));
    canManage = computed(() => tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.helpDeskManage), ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    statusOptions = [
        { label: 'New', value: 'New' },
        { label: 'Open', value: 'Open' },
        { label: 'Pending Customer', value: 'Pending Customer' },
        { label: 'Pending Internal', value: 'Pending Internal' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Closed', value: 'Closed' }
    ];
    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Urgent', value: 'Urgent' }
    ];
    severityOptions = [
        { label: 'S1', value: 'S1' },
        { label: 'S2', value: 'S2' },
        { label: 'S3', value: 'S3' },
        { label: 'S4', value: 'S4' }
    ];
    sourceOptions = [
        { label: 'Manual', value: 'Manual' },
        { label: 'Email', value: 'Email' }
    ];
    quickViewOptions = [
        { label: 'All Cases', value: 'all' },
        { label: 'My Queue', value: 'my-queue' },
        { label: 'Unassigned', value: 'unassigned' },
        { label: 'Breached SLA', value: 'breached' }
    ];
    queueOptions = computed(() => Array.from(new Map(this.cases()
        .filter((row) => !!row.queueName)
        .map((row) => [row.queueName, { label: row.queueName, value: row.queueName }])).values()), ...(ngDevMode ? [{ debugName: "queueOptions" }] : []));
    bulkQueueOptions = computed(() => this.queues().map((queue) => ({ label: queue.name, value: queue.id })), ...(ngDevMode ? [{ debugName: "bulkQueueOptions" }] : []));
    topClosureReason = computed(() => this.summary().topClosureReasons?.[0]?.reason ?? '-', ...(ngDevMode ? [{ debugName: "topClosureReason" }] : []));
    averageCsat = computed(() => this.summary().averageCsatScore ?? null, ...(ngDevMode ? [{ debugName: "averageCsat" }] : []));
    viewCases = computed(() => {
        const view = this.activeView();
        const now = Date.now();
        const rows = this.cases();
        switch (view) {
            case 'my-queue':
                return rows.filter((row) => !!row.queueName);
            case 'unassigned':
                return rows.filter((row) => !row.ownerUserId && !row.queueId);
            case 'breached':
                return rows.filter((row) => new Date(row.resolutionDueUtc).getTime() < now && ['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status));
            default:
                return rows;
        }
    }, ...(ngDevMode ? [{ debugName: "viewCases" }] : []));
    ownerOptions = computed(() => Array.from(new Map(this.cases()
        .filter((row) => !!row.ownerUserName)
        .map((row) => [row.ownerUserName, { label: row.ownerUserName, value: row.ownerUserName }])).values()), ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    constructor() {
        this.load();
        this.loadQueues();
        this.realtime.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (event.eventType === 'helpdesk.case.changed' || event.eventType === 'helpdesk.case.escalated') {
                this.load();
            }
        });
    }
    load() {
        this.loading.set(true);
        this.data.searchCases({ page: 1, pageSize: 200 }).subscribe({
            next: (res) => {
                this.cases.set(res.items ?? []);
                this.selectedCases.set([]);
                this.loading.set(false);
            },
            error: () => {
                this.toast.show('error', 'Unable to load help desk cases.');
                this.loading.set(false);
            }
        });
        this.data.getSummary().subscribe({
            next: (summary) => this.summary.set(summary),
            error: () => this.summary.set({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0, averageCsatScore: null, ratedCaseCount: 0, topClosureReasons: [] })
        });
    }
    createCase() {
        if (!this.canManage()) {
            this.toast.show('error', 'You need Help Desk Manage permission to create a case.');
            return;
        }
        this.router.navigate(['/app/helpdesk/cases/new']);
    }
    openCase(item) {
        this.router.navigate(['/app/helpdesk/cases', item.id]);
    }
    onSelectionChange(rows) {
        this.selectedCases.set(rows ?? []);
    }
    applyQuickView(view) {
        this.activeView.set(view);
        this.selectedCases.set([]);
    }
    applyBulkStatus() {
        const status = this.bulkStatus();
        const selection = this.selectedCases();
        if (!status || !selection.length) {
            return;
        }
        this.bulkSaving.set(true);
        forkJoin(selection.map((row) => this.data.updateStatus(row.id, status))).subscribe({
            next: () => {
                this.toast.show('success', `Updated status for ${selection.length} case(s).`);
                this.bulkStatus.set(null);
                this.load();
            },
            error: () => {
                this.bulkSaving.set(false);
                this.toast.show('error', 'Unable to update selected cases.');
            }
        });
    }
    applyBulkAssignQueue() {
        const queueId = this.bulkQueueId();
        const selection = this.selectedCases();
        if (!queueId || !selection.length) {
            return;
        }
        this.bulkSaving.set(true);
        forkJoin(selection.map((row) => this.data.assignCase(row.id, queueId, row.ownerUserId ?? null))).subscribe({
            next: () => {
                this.toast.show('success', `Assigned queue for ${selection.length} case(s).`);
                this.bulkQueueId.set(null);
                this.load();
            },
            error: () => {
                this.bulkSaving.set(false);
                this.toast.show('error', 'Unable to assign selected cases.');
            }
        });
    }
    clearSelection() {
        this.selectedCases.set([]);
    }
    getSlaState(row) {
        if (!['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status)) {
            return 'resolved';
        }
        const due = new Date(row.resolutionDueUtc).getTime();
        const now = Date.now();
        if (due < now) {
            return 'breached';
        }
        if (due <= now + 60 * 60 * 1000) {
            return 'at-risk';
        }
        return 'healthy';
    }
    formatDueIn(dueUtc) {
        const ms = new Date(dueUtc).getTime() - Date.now();
        const absoluteMinutes = Math.round(Math.abs(ms) / 60000);
        const hours = Math.floor(absoluteMinutes / 60);
        const minutes = absoluteMinutes % 60;
        const token = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        return ms >= 0 ? `in ${token}` : `${token} overdue`;
    }
    loadQueues() {
        this.data.listQueues().subscribe({
            next: (queues) => this.queues.set(queues ?? []),
            error: () => this.queues.set([])
        });
    }
    static ɵfac = function HelpDeskCasesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpDeskCasesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpDeskCasesPage, selectors: [["app-helpdesk-cases-page"]], decls: 55, vars: 18, consts: [["dt", ""], [1, "page-background", "helpdesk-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "glass-card", "hero-card"], [1, "hero-title"], [1, "hero-subtitle"], ["pButton", "", "type", "button", "icon", "pi pi-plus", "label", "New Case", 1, "crm-button", "crm-button--primary", 3, "click"], [1, "kpi-grid"], [1, "glass-card", "kpi-card"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-value", "kpi-value--compact"], [1, "glass-card", "table-card"], [1, "table-toolbar"], [1, "quick-views"], ["pButton", "", "type", "button", "class", "crm-button crm-button--pill crm-button--sm view-pill", 3, "label", "active", "click", 4, "ngFor", "ngForOf"], ["class", "bulk-actions", 4, "ngIf"], ["dataKey", "id", 3, "selectionChange", "value", "selection", "loading", "paginator", "rows", "rowsPerPageOptions", "globalFilterFields"], ["pTemplate", "caption"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--pill", "crm-button--sm", "view-pill", 3, "click", "label"], [1, "bulk-actions"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Bulk status", 3, "ngModelChange", "options", "ngModel"], ["pButton", "", "type", "button", "label", "Apply Status", 1, "crm-button", "crm-button--primary", "crm-button--sm", 3, "click", "disabled"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Bulk queue", 3, "ngModelChange", "options", "ngModel"], ["pButton", "", "type", "button", "label", "Assign Queue", 1, "crm-button", "crm-button--primary", "crm-button--sm", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Clear", 1, "crm-button", "crm-button--ghost", "crm-button--sm", 3, "click"], [1, "table-header"], [1, "p-input-icon-left"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search case number or subject", 3, "input"], [2, "width", "2.5rem"], ["pSortableColumn", "caseNumber"], ["field", "caseNumber"], ["pSortableColumn", "subject"], ["field", "subject"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "priority"], ["field", "priority"], ["pSortableColumn", "severity"], ["field", "severity"], ["pSortableColumn", "queueName"], ["field", "queueName"], ["pSortableColumn", "ownerUserName"], ["field", "ownerUserName"], ["pSortableColumn", "source"], ["field", "source"], ["pSortableColumn", "resolutionDueUtc"], ["field", "resolutionDueUtc"], ["field", "caseNumber", "matchMode", "contains", "display", "menu"], ["field", "subject", "matchMode", "contains", "display", "menu"], ["field", "status", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["pTemplate", "filter"], ["field", "priority", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["field", "severity", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["field", "queueName", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["field", "ownerUserName", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["field", "source", "matchMode", "equals", "display", "menu", 3, "showMatchModes", "showOperator", "showAddButton"], ["field", "resolutionDueUtc", "matchMode", "dateAfter", "display", "menu"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Any", 3, "onChange", "options", "ngModel"], [3, "click"], [3, "value"], [1, "sla-cell"], [1, "sla-chip"], ["colspan", "10"]], template: function HelpDeskCasesPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 1);
            i0.ɵɵelement(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 6)(7, "div")(8, "h1", 7);
            i0.ɵɵtext(9, "Help Desk Cases");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 8);
            i0.ɵɵtext(11, "Track support workload, SLA risk, and resolution progress in one workspace.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 9);
            i0.ɵɵlistener("click", function HelpDeskCasesPage_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.createCase()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "section", 10)(14, "article", 11)(15, "span", 12);
            i0.ɵɵtext(16, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 13);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "article", 11)(20, "span", 12);
            i0.ɵɵtext(21, "At Risk");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 13);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "article", 11)(25, "span", 12);
            i0.ɵɵtext(26, "Breached");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "span", 13);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "article", 11)(30, "span", 12);
            i0.ɵɵtext(31, "Resolved Today");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span", 13);
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "article", 11)(35, "span", 12);
            i0.ɵɵtext(36, "Avg CSAT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span", 13);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "article", 11)(40, "span", 12);
            i0.ɵɵtext(41, "Top Closure Reason");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "span", 14);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "section", 15)(45, "div", 16)(46, "div", 17);
            i0.ɵɵtemplate(47, HelpDeskCasesPage_button_47_Template, 1, 3, "button", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(48, HelpDeskCasesPage_div_48_Template, 8, 7, "div", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "p-table", 20, 0);
            i0.ɵɵlistener("selectionChange", function HelpDeskCasesPage_Template_p_table_selectionChange_49_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSelectionChange($event)); });
            i0.ɵɵtemplate(51, HelpDeskCasesPage_ng_template_51_Template, 4, 0, "ng-template", 21)(52, HelpDeskCasesPage_ng_template_52_Template, 56, 18, "ng-template", 22)(53, HelpDeskCasesPage_ng_template_53_Template, 26, 19, "ng-template", 23)(54, HelpDeskCasesPage_ng_template_54_Template, 3, 0, "ng-template", 24);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵattribute("title", ctx.canManage() ? "Create a new support case" : "Requires Help Desk Manage permission");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary().openCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().atRiskCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().breachedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().resolvedTodayCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.averageCsat() ?? "-");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.topClosureReason());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.quickViewOptions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedCases().length && ctx.canManage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.viewCases())("selection", ctx.selectedCases())("loading", ctx.loading())("paginator", true)("rows", 20)("rowsPerPageOptions", i0.ɵɵpureFunction0(16, _c0))("globalFilterFields", i0.ɵɵpureFunction0(17, _c1));
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, SelectModule, i6.Select, TableModule, i7.Table, i7.SortableColumn, i7.SortIcon, i7.TableCheckbox, i7.TableHeaderCheckbox, i7.ColumnFilter, BreadcrumbsComponent, i1.TitleCasePipe], styles: [".helpdesk-page[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .kpi-grid {\n    display: grid;\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n    gap: 0.75rem;\n    margin-bottom: 1rem;\n  }\n\n  .kpi-card {\n    display: flex;\n    flex-direction: column;\n    gap: 0.35rem;\n  }\n\n  .kpi-label {\n    font-size: 0.75rem;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    opacity: 0.75;\n  }\n\n  .kpi-value {\n    font-size: 1.6rem;\n    font-weight: 700;\n  }\n\n  .kpi-value--compact {\n    font-size: 1rem;\n    line-height: 1.3;\n  }\n\n  .table-card {\n    padding: 0.75rem;\n  }\n\n  .table-toolbar {\n    display: grid;\n    gap: 0.65rem;\n    margin-bottom: 0.75rem;\n  }\n\n  .quick-views {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n\n  .view-pill.active {\n    border-color: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 55%, white);\n    background: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 14%, white);\n    color: var(--crm-primary-700, #1d4ed8);\n    box-shadow: 0 8px 18px color-mix(in srgb, var(--crm-primary-500, #3b82f6) 24%, transparent);\n  }\n\n  .bulk-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n  }\n\n  .sla-cell {\n    display: grid;\n    gap: 0.2rem;\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    width: fit-content;\n    border-radius: 999px;\n    padding: 0.2rem 0.6rem;\n    font-size: 0.72rem;\n    font-weight: 700;\n  }\n\n  .sla-chip.healthy {\n    background: rgba(22, 163, 74, 0.14);\n    color: #166534;\n  }\n\n  .sla-chip.at-risk {\n    background: rgba(245, 158, 11, 0.18);\n    color: #92400e;\n  }\n\n  .sla-chip.breached {\n    background: rgba(239, 68, 68, 0.16);\n    color: #991b1b;\n  }\n\n  .table-header {\n    display: flex;\n    justify-content: flex-end;\n  }\n\n  @media (max-width: 1024px) {\n    .kpi-grid {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n\n  @media (max-width: 720px) {\n    .kpi-grid {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDeskCasesPage, [{
        type: Component,
        args: [{ selector: 'app-helpdesk-cases-page', standalone: true, imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, BreadcrumbsComponent], template: "<section class=\"page-background helpdesk-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card hero-card\">\n    <div>\n      <h1 class=\"hero-title\">Help Desk Cases</h1>\n      <p class=\"hero-subtitle\">Track support workload, SLA risk, and resolution progress in one workspace.</p>\n    </div>\n    <button\n      pButton\n      type=\"button\"\n      class=\"crm-button crm-button--primary\"\n      icon=\"pi pi-plus\"\n      label=\"New Case\"\n      [attr.title]=\"canManage() ? 'Create a new support case' : 'Requires Help Desk Manage permission'\"\n      (click)=\"createCase()\">\n    </button>\n  </section>\n\n  <section class=\"kpi-grid\">\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">Open</span>\n      <span class=\"kpi-value\">{{ summary().openCount }}</span>\n    </article>\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">At Risk</span>\n      <span class=\"kpi-value\">{{ summary().atRiskCount }}</span>\n    </article>\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">Breached</span>\n      <span class=\"kpi-value\">{{ summary().breachedCount }}</span>\n    </article>\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">Resolved Today</span>\n      <span class=\"kpi-value\">{{ summary().resolvedTodayCount }}</span>\n    </article>\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">Avg CSAT</span>\n      <span class=\"kpi-value\">{{ averageCsat() ?? '-' }}</span>\n    </article>\n    <article class=\"glass-card kpi-card\">\n      <span class=\"kpi-label\">Top Closure Reason</span>\n      <span class=\"kpi-value kpi-value--compact\">{{ topClosureReason() }}</span>\n    </article>\n  </section>\n\n  <section class=\"glass-card table-card\">\n    <div class=\"table-toolbar\">\n      <div class=\"quick-views\">\n        <button\n          pButton\n          type=\"button\"\n          *ngFor=\"let view of quickViewOptions\"\n          [label]=\"view.label\"\n          class=\"crm-button crm-button--pill crm-button--sm view-pill\"\n          [class.active]=\"activeView() === view.value\"\n          (click)=\"applyQuickView(view.value)\">\n        </button>\n      </div>\n\n      <div class=\"bulk-actions\" *ngIf=\"selectedCases().length && canManage()\">\n        <span>{{ selectedCases().length }} selected</span>\n        <p-select\n          [options]=\"statusOptions\"\n          [ngModel]=\"bulkStatus()\"\n          (ngModelChange)=\"bulkStatus.set($event)\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          placeholder=\"Bulk status\">\n        </p-select>\n        <button pButton type=\"button\" class=\"crm-button crm-button--primary crm-button--sm\" [disabled]=\"!bulkStatus() || bulkSaving()\" label=\"Apply Status\" (click)=\"applyBulkStatus()\"></button>\n        <p-select\n          [options]=\"bulkQueueOptions()\"\n          [ngModel]=\"bulkQueueId()\"\n          (ngModelChange)=\"bulkQueueId.set($event)\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          placeholder=\"Bulk queue\">\n        </p-select>\n        <button pButton type=\"button\" class=\"crm-button crm-button--primary crm-button--sm\" [disabled]=\"!bulkQueueId() || bulkSaving()\" label=\"Assign Queue\" (click)=\"applyBulkAssignQueue()\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--ghost crm-button--sm\" label=\"Clear\" (click)=\"clearSelection()\"></button>\n      </div>\n    </div>\n\n    <p-table #dt [value]=\"viewCases()\" dataKey=\"id\" [selection]=\"selectedCases()\" (selectionChange)=\"onSelectionChange($event)\" [loading]=\"loading()\" [paginator]=\"true\" [rows]=\"20\" [rowsPerPageOptions]=\"[10,20,50]\" [globalFilterFields]=\"['caseNumber','subject','accountName','contactName']\">\n      <ng-template pTemplate=\"caption\">\n        <div class=\"table-header\">\n          <span class=\"p-input-icon-left\">\n            <i class=\"pi pi-search\"></i>\n            <input pInputText type=\"text\" placeholder=\"Search case number or subject\" (input)=\"dt.filterGlobal($any($event.target).value, 'contains')\" />\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n          <th style=\"width: 2.5rem\"><p-tableHeaderCheckbox></p-tableHeaderCheckbox></th>\n          <th pSortableColumn=\"caseNumber\">Case # <p-sortIcon field=\"caseNumber\"></p-sortIcon></th>\n          <th pSortableColumn=\"subject\">Subject <p-sortIcon field=\"subject\"></p-sortIcon></th>\n          <th pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n          <th pSortableColumn=\"priority\">Priority <p-sortIcon field=\"priority\"></p-sortIcon></th>\n          <th pSortableColumn=\"severity\">Severity <p-sortIcon field=\"severity\"></p-sortIcon></th>\n          <th pSortableColumn=\"queueName\">Queue <p-sortIcon field=\"queueName\"></p-sortIcon></th>\n          <th pSortableColumn=\"ownerUserName\">Owner <p-sortIcon field=\"ownerUserName\"></p-sortIcon></th>\n          <th pSortableColumn=\"source\">Source <p-sortIcon field=\"source\"></p-sortIcon></th>\n          <th pSortableColumn=\"resolutionDueUtc\">SLA <p-sortIcon field=\"resolutionDueUtc\"></p-sortIcon></th>\n        </tr>\n        <tr>\n          <th></th>\n          <th>\n            <p-columnFilter field=\"caseNumber\" matchMode=\"contains\" display=\"menu\"></p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"subject\" matchMode=\"contains\" display=\"menu\"></p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"status\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"statusOptions\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"priority\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"priorityOptions\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"severity\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"severityOptions\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"queueName\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"queueOptions()\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"ownerUserName\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"ownerOptions()\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"source\" matchMode=\"equals\" display=\"menu\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\n              <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                <p-select [options]=\"sourceOptions\" [ngModel]=\"value\" optionLabel=\"label\" optionValue=\"value\" (onChange)=\"filter($event.value)\" placeholder=\"Any\"></p-select>\n              </ng-template>\n            </p-columnFilter>\n          </th>\n          <th>\n            <p-columnFilter field=\"resolutionDueUtc\" matchMode=\"dateAfter\" display=\"menu\"></p-columnFilter>\n          </th>\n        </tr>\n      </ng-template>\n\n      <ng-template pTemplate=\"body\" let-row>\n        <tr (click)=\"openCase(row)\">\n          <td (click)=\"$event.stopPropagation()\">\n            <p-tableCheckbox [value]=\"row\"></p-tableCheckbox>\n          </td>\n          <td>{{ row.caseNumber }}</td>\n          <td>{{ row.subject }}</td>\n          <td>{{ row.status }}</td>\n          <td>{{ row.priority }}</td>\n          <td>{{ row.severity }}</td>\n          <td>{{ row.queueName || '-' }}</td>\n          <td>{{ row.ownerUserName || '-' }}</td>\n          <td>{{ row.source }}</td>\n          <td>\n            <div class=\"sla-cell\">\n              <span class=\"sla-chip\" [class.breached]=\"getSlaState(row) === 'breached'\" [class.at-risk]=\"getSlaState(row) === 'at-risk'\" [class.healthy]=\"getSlaState(row) === 'healthy'\">\n                {{ getSlaState(row) | titlecase }}\n              </span>\n              <small>{{ formatDueIn(row.resolutionDueUtc) }}</small>\n            </div>\n          </td>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"emptymessage\">\n        <tr>\n          <td colspan=\"10\">No support cases found.</td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </section>\n</section>\n", styles: [".helpdesk-page {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .kpi-grid {\n    display: grid;\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n    gap: 0.75rem;\n    margin-bottom: 1rem;\n  }\n\n  .kpi-card {\n    display: flex;\n    flex-direction: column;\n    gap: 0.35rem;\n  }\n\n  .kpi-label {\n    font-size: 0.75rem;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    opacity: 0.75;\n  }\n\n  .kpi-value {\n    font-size: 1.6rem;\n    font-weight: 700;\n  }\n\n  .kpi-value--compact {\n    font-size: 1rem;\n    line-height: 1.3;\n  }\n\n  .table-card {\n    padding: 0.75rem;\n  }\n\n  .table-toolbar {\n    display: grid;\n    gap: 0.65rem;\n    margin-bottom: 0.75rem;\n  }\n\n  .quick-views {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n\n  .view-pill.active {\n    border-color: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 55%, white);\n    background: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 14%, white);\n    color: var(--crm-primary-700, #1d4ed8);\n    box-shadow: 0 8px 18px color-mix(in srgb, var(--crm-primary-500, #3b82f6) 24%, transparent);\n  }\n\n  .bulk-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n  }\n\n  .sla-cell {\n    display: grid;\n    gap: 0.2rem;\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    width: fit-content;\n    border-radius: 999px;\n    padding: 0.2rem 0.6rem;\n    font-size: 0.72rem;\n    font-weight: 700;\n  }\n\n  .sla-chip.healthy {\n    background: rgba(22, 163, 74, 0.14);\n    color: #166534;\n  }\n\n  .sla-chip.at-risk {\n    background: rgba(245, 158, 11, 0.18);\n    color: #92400e;\n  }\n\n  .sla-chip.breached {\n    background: rgba(239, 68, 68, 0.16);\n    color: #991b1b;\n  }\n\n  .table-header {\n    display: flex;\n    justify-content: flex-end;\n  }\n\n  @media (max-width: 1024px) {\n    .kpi-grid {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n\n  @media (max-width: 720px) {\n    .kpi-grid {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpDeskCasesPage, { className: "HelpDeskCasesPage", filePath: "src/app/crm/features/helpdesk/pages/helpdesk-cases.page.ts", lineNumber: 26 }); })();
