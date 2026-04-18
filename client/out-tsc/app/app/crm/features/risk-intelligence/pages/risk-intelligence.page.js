import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { RiskIntelligenceDataService } from '../services/risk-intelligence-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/skeleton";
import * as i5 from "primeng/tag";
import * as i6 from "primeng/table";
const _c0 = () => ({ "min-width": "100%" });
const _c1 = (a0, a1) => [a0, a1];
const _c2 = () => [1, 2, 3];
function RiskIntelligencePage_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "span", 42);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 43);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 44);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", "tone-" + item_r2.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.caption);
} }
function RiskIntelligencePage_ng_container_39_div_1_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", item_r3.severity);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", item_r3.label, " \u00B7 ", item_r3.count, " ");
} }
function RiskIntelligencePage_ng_container_39_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_container_39_div_1_div_1_span_1_Template, 2, 3, "span", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.riskPanelSummary());
} }
function RiskIntelligencePage_ng_container_39_div_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Record");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Urgency");
    i0.ɵɵelementEnd()();
} }
function RiskIntelligencePage_ng_container_39_div_1_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 54);
    i0.ɵɵlistener("click", function RiskIntelligencePage_ng_container_39_div_1_ng_template_4_Template_tr_click_0_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.selectRisk(item_r6)); });
    i0.ɵɵelementStart(1, "td")(2, "div", 55)(3, "span", 56);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(5, "td")(6, "div", 57)(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "td")(12, "div", 58)(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "td")(16, "div", 59)(17, "span", 60);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const rowIndex_r7 = ctx.rowIndex;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(9, _c1, ctx_r3.riskCardSeverityClass(item_r6), ctx_r3.selectedRiskId() === item_r6.id ? "is-selected" : ""));
    i0.ɵɵattribute("data-testid", "risk-row-" + item_r6.id);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r3.riskCardSeverityClass(item_r6));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(rowIndex_r7 + 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r6.entityLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.affectedModule);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r6.owner);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r3.riskCardSeverityClass(item_r6));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.urgencyLabel(item_r6.urgency));
} }
function RiskIntelligencePage_ng_container_39_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_container_39_div_1_div_1_Template, 2, 1, "div", 47);
    i0.ɵɵelementStart(2, "p-table", 48);
    i0.ɵɵtemplate(3, RiskIntelligencePage_ng_container_39_div_1_ng_template_3_Template, 9, 0, "ng-template", 49)(4, RiskIntelligencePage_ng_container_39_div_1_ng_template_4_Template, 19, 12, "ng-template", 50);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.riskPanelSummary().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r3.priorityQueue())("tableStyle", i0.ɵɵpureFunction0(3, _c0));
} }
function RiskIntelligencePage_ng_container_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_container_39_div_1_Template, 5, 4, "div", 45);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    const emptyState_r8 = i0.ɵɵreference(64);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.priorityQueue().length)("ngIfElse", emptyState_r8);
} }
function RiskIntelligencePage_ng_container_47_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function RiskIntelligencePage_ng_container_47_button_2_Template_button_click_0_listener() { const item_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openRisk(item_r10)); });
    i0.ɵɵelementStart(1, "div", 64)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 65);
    i0.ɵɵelement(5, "p-tag", 66);
    i0.ɵɵelementStart(6, "span", 67);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", item_r10.severity)("severity", ctx_r3.watchlistSeverity(item_r10.severity));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.count);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.context);
} }
function RiskIntelligencePage_ng_container_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 61);
    i0.ɵɵtemplate(2, RiskIntelligencePage_ng_container_47_button_2_Template, 10, 5, "button", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.workspace().watchlist);
} }
function RiskIntelligencePage_ng_container_56_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 85);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 86);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r3.focusSignalToneClass(item_r13.tone));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r13.value);
} }
function RiskIntelligencePage_ng_container_56_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 68)(2, "div", 69)(3, "span", 70);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "span", 71);
    i0.ɵɵtext(7, "Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong", 72);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "h3", 73);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 74)(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 75)(20, "h4");
    i0.ɵɵtext(21, "Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 76)(23, "p");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 77)(26, "h4");
    i0.ɵɵtext(27, "Next action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 78)(29, "p");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 79)(32, "button", 80);
    i0.ɵɵlistener("click", function RiskIntelligencePage_ng_container_56_Template_button_click_32_listener() { const selected_r12 = i0.ɵɵrestoreView(_r11).ngIf; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectRisk(selected_r12)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 81);
    i0.ɵɵlistener("click", function RiskIntelligencePage_ng_container_56_Template_button_click_33_listener() { const selected_r12 = i0.ɵɵrestoreView(_r11).ngIf; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.openRisk(selected_r12)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 82)(35, "h4");
    i0.ɵɵtext(36, "Operator Focus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 83);
    i0.ɵɵtemplate(38, RiskIntelligencePage_ng_container_56_div_38_Template, 5, 4, "div", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const selected_r12 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r3.riskCardSeverityClass(selected_r12));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r3.riskCardSeverityLabel(selected_r12), " issue");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r3.scoreClass(selected_r12.score));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(selected_r12.score);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(selected_r12.entityLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(selected_r12.riskType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(selected_r12.affectedModule);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(selected_r12.owner);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(selected_r12.reasonSummary);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(selected_r12.recommendedAction);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r3.focusSignals());
} }
function RiskIntelligencePage_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 87);
} }
function RiskIntelligencePage_ng_template_59_p_skeleton_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 90);
} }
function RiskIntelligencePage_ng_template_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_template_59_p_skeleton_1_Template, 1, 0, "p-skeleton", 89);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function RiskIntelligencePage_ng_template_61_p_skeleton_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 93);
} }
function RiskIntelligencePage_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_template_61_p_skeleton_1_Template, 1, 0, "p-skeleton", 92);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function RiskIntelligencePage_ng_template_63_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "i", 95);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Risk Intelligence did not load");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 96);
    i0.ɵɵlistener("click", function RiskIntelligencePage_ng_template_63_ng_container_1_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r14); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.loadWorkspace()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.loadError());
} }
function RiskIntelligencePage_ng_template_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵtemplate(1, RiskIntelligencePage_ng_template_63_ng_container_1_Template, 7, 1, "ng-container", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    const noActiveRisks_r15 = i0.ɵɵreference(66);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.loadError())("ngIfElse", noActiveRisks_r15);
} }
function RiskIntelligencePage_ng_template_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 32);
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2, "No active risks right now");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "The current thresholds and CRM signals did not produce any open guidance items.");
    i0.ɵɵelementEnd();
} }
function RiskIntelligencePage_ng_template_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵelement(1, "i", 98);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Select a risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Pick a priority row to inspect its evidence and recommended action.");
    i0.ɵɵelementEnd()();
} }
export class RiskIntelligencePage {
    dataService = inject(RiskIntelligenceDataService);
    router = inject(Router);
    loadRequestId = 0;
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    loadError = signal(null, ...(ngDevMode ? [{ debugName: "loadError" }] : []));
    workspace = signal({
        summary: {
            totalOpenRisks: 0,
            immediateRisks: 0,
            soonRisks: 0,
            stalePipelineCount: 0,
            overdueApprovals: 0
        },
        priorityRisks: [],
        watchlist: [],
        generatedAtUtc: new Date().toISOString()
    }, ...(ngDevMode ? [{ debugName: "workspace" }] : []));
    selectedRiskId = signal(null, ...(ngDevMode ? [{ debugName: "selectedRiskId" }] : []));
    selectedRisk = computed(() => {
        const selectedId = this.selectedRiskId();
        const risks = this.workspace().priorityRisks;
        return risks.find((item) => item.id === selectedId) ?? risks[0] ?? null;
    }, ...(ngDevMode ? [{ debugName: "selectedRisk" }] : []));
    summaryCards = computed(() => {
        const summary = this.workspace().summary;
        return [
            { label: 'Open Risks', value: summary.totalOpenRisks, tone: 'neutral', icon: 'pi pi-shield' },
            { label: 'Immediate', value: summary.immediateRisks, tone: 'danger', icon: 'pi pi-bolt' },
            { label: 'Soon', value: summary.soonRisks, tone: 'warning', icon: 'pi pi-clock' },
            { label: 'Stale Pipeline', value: summary.stalePipelineCount, tone: 'warning', icon: 'pi pi-chart-line' },
            { label: 'Overdue Approvals', value: summary.overdueApprovals, tone: 'danger', icon: 'pi pi-inbox' }
        ];
    }, ...(ngDevMode ? [{ debugName: "summaryCards" }] : []));
    heroHighlights = computed(() => {
        const summary = this.workspace().summary;
        return [
            {
                label: 'Immediate actions',
                value: summary.immediateRisks,
                caption: summary.immediateRisks === 1 ? 'risk needs action now' : 'risks need action now',
                tone: 'danger'
            },
            {
                label: 'Pipeline pressure',
                value: summary.stalePipelineCount,
                caption: summary.stalePipelineCount === 1 ? 'stale deal to review' : 'stale deals to review',
                tone: 'warning'
            },
            {
                label: 'Approval backlog',
                value: summary.overdueApprovals,
                caption: summary.overdueApprovals === 1 ? 'overdue approval' : 'overdue approvals',
                tone: 'neutral'
            }
        ];
    }, ...(ngDevMode ? [{ debugName: "heroHighlights" }] : []));
    priorityQueue = computed(() => this.workspace().priorityRisks.slice(0, 5), ...(ngDevMode ? [{ debugName: "priorityQueue" }] : []));
    riskPanelSummary = computed(() => {
        const summary = this.workspace().summary;
        return [
            { label: 'Immediate', count: summary.immediateRisks, severity: 'critical' },
            { label: 'Soon', count: summary.soonRisks, severity: 'high' },
            { label: 'Overdue approvals', count: summary.overdueApprovals, severity: 'medium' },
            { label: 'Open risks', count: summary.totalOpenRisks, severity: 'info' }
        ].filter((item) => item.count > 0);
    }, ...(ngDevMode ? [{ debugName: "riskPanelSummary" }] : []));
    focusSignals = computed(() => {
        const selected = this.selectedRisk();
        if (!selected) {
            return [];
        }
        return [
            { label: 'Urgency', value: this.urgencyLabel(selected.urgency), tone: selected.urgency },
            { label: 'Owner', value: selected.owner, tone: 'neutral' },
            { label: 'Source', value: selected.sourceSurface, tone: 'neutral' },
            { label: 'Module', value: selected.affectedModule, tone: 'neutral' }
        ];
    }, ...(ngDevMode ? [{ debugName: "focusSignals" }] : []));
    constructor() {
        this.loadWorkspace();
    }
    loadWorkspace() {
        const requestId = ++this.loadRequestId;
        this.loading.set(true);
        this.loadError.set(null);
        this.dataService.getWorkspace().subscribe({
            next: (workspace) => {
                if (requestId !== this.loadRequestId) {
                    return;
                }
                this.workspace.set(workspace);
                const currentSelection = this.selectedRiskId();
                if (!currentSelection || !workspace.priorityRisks.some((item) => item.id === currentSelection)) {
                    this.selectedRiskId.set(workspace.priorityRisks[0]?.id ?? null);
                }
                this.loading.set(false);
            },
            error: (error) => {
                if (requestId !== this.loadRequestId) {
                    return;
                }
                console.error('Failed to load Risk Intelligence workspace', error);
                this.loading.set(false);
                this.loadError.set('Risk Intelligence could not load on the first attempt. Retry now.');
            }
        });
    }
    selectRisk(item) {
        this.selectedRiskId.set(item.id);
    }
    openRisk(item) {
        const route = 'drillRoute' in item ? item.drillRoute : item.route;
        if (!route) {
            return;
        }
        void this.router.navigateByUrl(route);
    }
    urgencySeverity(urgency) {
        switch ((urgency ?? '').trim().toLowerCase()) {
            case 'immediate':
                return 'danger';
            case 'soon':
                return 'warn';
            default:
                return 'secondary';
        }
    }
    urgencyLabel(urgency) {
        switch ((urgency ?? '').trim().toLowerCase()) {
            case 'immediate':
                return 'Immediate';
            case 'soon':
                return 'Soon';
            default:
                return 'Planned';
        }
    }
    watchlistSeverity(severity) {
        switch ((severity ?? '').trim().toLowerCase()) {
            case 'critical':
            case 'high':
                return 'danger';
            case 'medium':
            case 'warn':
                return 'warn';
            case 'info':
                return 'info';
            default:
                return 'secondary';
        }
    }
    scoreClass(score) {
        if (score >= 80) {
            return 'score-badge score-badge--danger';
        }
        if (score >= 60) {
            return 'score-badge score-badge--warn';
        }
        return 'score-badge score-badge--neutral';
    }
    riskTierClass(item) {
        const score = item.score ?? 0;
        const urgency = (item.urgency ?? '').trim().toLowerCase();
        if (score >= 80 || urgency === 'immediate') {
            return 'risk-high';
        }
        if (score >= 60 || urgency === 'soon') {
            return 'risk-medium';
        }
        return 'risk-low';
    }
    riskCardSeverityClass(item) {
        const tier = this.riskTierClass(item);
        switch (tier) {
            case 'risk-high':
                return 'critical';
            case 'risk-medium':
                return 'high';
            default:
                return 'medium';
        }
    }
    riskCardSeverityLabel(item) {
        const severity = this.riskCardSeverityClass(item);
        switch (severity) {
            case 'critical':
                return 'Critical';
            case 'high':
                return 'High';
            case 'medium':
                return 'Watch';
            default:
                return 'Info';
        }
    }
    riskCountLabel(item) {
        return `Score ${item.score} · ${item.affectedModule}`;
    }
    riskSeverityIcon(item) {
        switch (this.riskCardSeverityClass(item)) {
            case 'critical':
                return 'pi pi-exclamation-circle';
            case 'high':
                return 'pi pi-exclamation-triangle';
            default:
                return 'pi pi-eye';
        }
    }
    urgencyIcon(urgency) {
        switch ((urgency ?? '').trim().toLowerCase()) {
            case 'immediate':
                return 'pi pi-bolt';
            case 'soon':
                return 'pi pi-clock';
            default:
                return 'pi pi-calendar';
        }
    }
    impactLabel(score) {
        if (score >= 80) {
            return 'HIGH IMPACT';
        }
        if (score >= 60) {
            return 'MEDIUM IMPACT';
        }
        return 'LOW IMPACT';
    }
    impactUrgencyLabel(item) {
        return `${this.impactLabel(item.score)}, ${this.urgencyLabel(item.urgency).toUpperCase()} URGENCY`;
    }
    queueReason(item) {
        return item.evidence?.[0] || item.reasonSummary;
    }
    queueSummary(item) {
        return `${item.entityLabel} · ${item.reasonSummary}`;
    }
    dueWindowLabel(urgency) {
        switch ((urgency ?? '').trim().toLowerCase()) {
            case 'immediate':
                return 'Now';
            case 'soon':
                return '24 hours';
            default:
                return 'Planned';
        }
    }
    ctaLabel(item) {
        return this.riskTierClass(item) === 'risk-low' ? 'Open' : 'Review';
    }
    ctaIcon(item) {
        return this.riskTierClass(item) === 'risk-low' ? 'pi pi-arrow-right' : 'pi pi-search';
    }
    generatedAtLabel(timestamp) {
        const generated = new Date(timestamp);
        const now = Date.now();
        const diffMinutes = Math.max(0, Math.round((now - generated.getTime()) / 60000));
        if (diffMinutes < 1) {
            return 'Updated just now';
        }
        if (diffMinutes === 1) {
            return 'Updated 1 minute ago';
        }
        if (diffMinutes < 60) {
            return `Updated ${diffMinutes} minutes ago`;
        }
        return `Updated ${generated.toLocaleString()}`;
    }
    focusSignalToneClass(tone) {
        const normalized = (tone ?? '').trim().toLowerCase();
        if (normalized === 'immediate' || normalized === 'danger') {
            return 'focus-pill focus-pill--danger';
        }
        if (normalized === 'soon' || normalized === 'warning' || normalized === 'warn') {
            return 'focus-pill focus-pill--warning';
        }
        return 'focus-pill focus-pill--neutral';
    }
    static ɵfac = function RiskIntelligencePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RiskIntelligencePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RiskIntelligencePage, selectors: [["app-risk-intelligence-page"]], decls: 69, vars: 9, consts: [["loadingValue", ""], ["tableLoading", ""], ["watchlistLoading", ""], ["emptyState", ""], ["noActiveRisks", ""], ["noSelection", ""], [1, "page-container"], ["aria-hidden", "true", 1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "page-content", "risk-page"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-status"], [1, "hero-status__label"], [1, "hero-status__dot"], [1, "hero-command-strip"], ["class", "hero-command-card", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "hero-actions"], ["pButton", "", "type", "button", "icon", "pi pi-refresh", "label", "Refresh", 1, "crm-secondary-btn", "hero-refresh-btn", 3, "click"], [1, "workspace-grid"], [1, "workspace-main"], [1, "risk-panel-shell"], [1, "priority-board-header"], [1, "section-title"], [1, "pi", "pi-shield"], [1, "risk-intelligence-subtitle"], [4, "ngIf", "ngIfElse"], [1, "watchlist-panel"], [1, "panel-header"], [1, "panel-title"], [1, "panel-copy"], [1, "workspace-rail"], [1, "detail-panel"], [1, "hero-command-card", 3, "ngClass"], [1, "hero-command-card__label"], [1, "hero-command-card__value"], [1, "hero-command-card__caption"], ["class", "priority-board", "data-testid", "risk-priority-table", 4, "ngIf", "ngIfElse"], ["data-testid", "risk-priority-table", 1, "priority-board"], ["class", "priority-board-summary", 4, "ngIf"], ["styleClass", "priority-risk-table", "dataKey", "id", 3, "value", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "priority-board-summary"], ["class", "risk-summary-pill", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "risk-summary-pill", 3, "ngClass"], [1, "priority-risk-row", 3, "click", "ngClass"], [1, "priority-risk-cell", "priority-risk-cell--risk"], [1, "priority-risk-rank", 3, "ngClass"], [1, "priority-risk-cell", "priority-risk-cell--record"], [1, "priority-risk-cell", "priority-risk-cell--owner"], [1, "priority-risk-cell", "priority-risk-cell--urgency"], [1, "urgency-pill", 3, "ngClass"], ["data-testid", "risk-watchlist", 1, "watchlist-stack"], ["type", "button", "class", "watchlist-item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "watchlist-item", 3, "click"], [1, "watchlist-item__head"], [1, "watchlist-item__meta"], [3, "value", "severity"], [1, "watchlist-item__count"], [1, "selected-risk-console"], [1, "selected-risk-console__head"], [1, "selected-risk-flag", 3, "ngClass"], [1, "score-badge__label"], [1, "score-badge__value"], [1, "detail-title"], [1, "detail-meta"], [1, "detail-section", "detail-section--impact"], [1, "impact-card"], [1, "detail-section", "detail-section--action"], [1, "recommended-action-card"], [1, "detail-section", "detail-section--action-bar"], ["pButton", "", "type", "button", "icon", "pi pi-search", "label", "Review selected", 1, "selected-risk-btn", "selected-risk-btn--secondary", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-right", "label", "Open source record", "data-testid", "risk-open-selected", 1, "selected-risk-btn", "selected-risk-btn--primary", 3, "click"], [1, "detail-section", "detail-section--signals"], [1, "focus-pill-grid"], [3, "class", 4, "ngFor", "ngForOf"], [1, "focus-pill__label"], [1, "focus-pill__value"], ["width", "4rem", "height", "1.6rem"], [1, "table-loading"], ["height", "7rem", "styleClass", "table-loading__row", 4, "ngFor", "ngForOf"], ["height", "7rem", "styleClass", "table-loading__row"], [1, "watchlist-loading"], ["height", "5rem", 4, "ngFor", "ngForOf"], ["height", "5rem"], ["data-testid", "risk-empty-state", 1, "empty-state"], [1, "pi", "pi-exclamation-circle"], ["pButton", "", "type", "button", "icon", "pi pi-refresh", "label", "Retry", 1, "crm-secondary-btn", 3, "click"], [1, "empty-state"], [1, "pi", "pi-search"]], template: function RiskIntelligencePage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6)(1, "div", 7);
            i0.ɵɵelement(2, "div", 8)(3, "div", 9)(4, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 11);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "section", 12)(8, "div", 13)(9, "div", 14);
            i0.ɵɵelement(10, "span", 15);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Operational Guidance");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "h1", 16)(14, "span", 17);
            i0.ɵɵtext(15, "Risk");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 18);
            i0.ɵɵtext(17, "Intelligence");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "p", 19);
            i0.ɵɵtext(19, " Explainable early warning across deals, approvals, leads, and pipeline hygiene so the team knows what to act on next. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 20)(21, "span", 21);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "span", 22);
            i0.ɵɵelementStart(24, "span", 21);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "div", 23);
            i0.ɵɵtemplate(27, RiskIntelligencePage_div_27_Template, 7, 4, "div", 24);
            i0.ɵɵelementStart(28, "div", 25)(29, "button", 26);
            i0.ɵɵlistener("click", function RiskIntelligencePage_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.loadWorkspace()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "section", 27)(31, "div", 28)(32, "section", 29)(33, "div", 30)(34, "h2", 31);
            i0.ɵɵelement(35, "i", 32);
            i0.ɵɵtext(36, " Priority Risks ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span", 33);
            i0.ɵɵtext(38, "Ranked guidance across current CRM operational signals.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(39, RiskIntelligencePage_ng_container_39_Template, 2, 2, "ng-container", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "section", 35)(41, "div", 36)(42, "div")(43, "h2", 37);
            i0.ɵɵtext(44, "Watchlist & Trends");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "p", 38);
            i0.ɵɵtext(46, "Shared risk patterns that stay visible even when no single record should dominate the queue.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(47, RiskIntelligencePage_ng_container_47_Template, 3, 1, "ng-container", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 39)(49, "section", 40)(50, "div", 36)(51, "div")(52, "h2", 37);
            i0.ɵɵtext(53, "Selected Risk");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "p", 38);
            i0.ɵɵtext(55, "Immediate explanation and next best action.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(56, RiskIntelligencePage_ng_container_56_Template, 39, 12, "ng-container", 34);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(57, RiskIntelligencePage_ng_template_57_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(59, RiskIntelligencePage_ng_template_59_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(61, RiskIntelligencePage_ng_template_61_Template, 2, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(63, RiskIntelligencePage_ng_template_63_Template, 2, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(65, RiskIntelligencePage_ng_template_65_Template, 5, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(67, RiskIntelligencePage_ng_template_67_Template, 6, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const tableLoading_r16 = i0.ɵɵreference(60);
            const watchlistLoading_r17 = i0.ɵɵreference(62);
            const noSelection_r18 = i0.ɵɵreference(68);
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.generatedAtLabel(ctx.workspace().generatedAtUtc));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.workspace().priorityRisks.length, " priority items in focus");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.heroHighlights());
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", tableLoading_r16);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", watchlistLoading_r17);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.selectedRisk())("ngIfElse", noSelection_r18);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, BreadcrumbsComponent,
            ButtonModule, i2.ButtonDirective, i3.PrimeTemplate, ChipModule,
            SkeletonModule, i4.Skeleton, TagModule, i5.Tag, TableModule, i6.Table], styles: [".page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n\n.risk-page[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(56px);\n  opacity: 0.34;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 520px;\n  height: 520px;\n  top: -180px;\n  right: -120px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.42), rgba(113, 144, 235, 0));\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 420px;\n  height: 420px;\n  bottom: 6%;\n  left: -120px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.24), rgba(109, 174, 255, 0));\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  top: 34%;\n  right: 18%;\n  background: radial-gradient(circle, rgba(96, 206, 162, 0.2), rgba(96, 206, 162, 0));\n}\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1.5rem;\n  padding: 1.5rem 1.6rem;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  border-radius: 24px;\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n  overflow: hidden;\n}\n\n.hero-section[_ngcontent-%COMP%]::before, \n.hero-section[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  border-radius: 50%;\n  filter: blur(24px);\n  opacity: 0.48;\n}\n\n.hero-section[_ngcontent-%COMP%]::before {\n  width: 210px;\n  height: 210px;\n  top: -80px;\n  right: -58px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.45), rgba(113, 144, 235, 0));\n}\n\n.hero-section[_ngcontent-%COMP%]::after {\n  width: 240px;\n  height: 240px;\n  bottom: -110px;\n  left: -76px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.28), rgba(109, 174, 255, 0));\n}\n\n.hero-content[_ngcontent-%COMP%], \n.hero-command-strip[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  background: rgba(255, 255, 255, 0.72);\n  color: #5c75d9;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #67d38d;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  gap: 0.35rem;\n  font-size: 2.5rem;\n  line-height: 1;\n  letter-spacing: -0.04em;\n}\n\n.title-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #4ea6ff 0%, #2563eb 60%, #3344d3 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n\n.title-light[_ngcontent-%COMP%] {\n  color: #344868;\n}\n\n.hero-subtitle[_ngcontent-%COMP%], \n.panel-copy[_ngcontent-%COMP%], \n.detail-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.watchlist-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ai-orchestration-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(60, 76, 114, 0.9);\n  line-height: 1.55;\n}\n\n.hero-status[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  align-items: center;\n}\n\n.hero-status__label[_ngcontent-%COMP%], \n.ai-generated-at[_ngcontent-%COMP%], \n.panel-copy[_ngcontent-%COMP%], \n.watchlist-item__count[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(58, 74, 109, 0.88);\n}\n\n.hero-status__dot[_ngcontent-%COMP%] {\n  width: 0.3rem;\n  height: 0.3rem;\n  border-radius: 999px;\n  background: #60a5fa;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.hero-command-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(180px, 1fr));\n  align-content: start;\n  gap: 0.9rem;\n}\n\n.hero-command-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  min-height: 118px;\n  padding: 1rem 1.05rem;\n  border-radius: 16px;\n  border: 1px solid rgba(197, 207, 232, 0.9);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(236, 242, 255, 0.78));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 10px 24px rgba(44, 64, 109, 0.08);\n}\n\n.hero-command-card.tone-danger[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.28);\n  background: linear-gradient(145deg, rgba(255, 247, 248, 0.88), rgba(255, 236, 240, 0.76));\n}\n\n.hero-command-card.tone-warning[_ngcontent-%COMP%] {\n  border-color: rgba(249, 115, 22, 0.26);\n  background: linear-gradient(145deg, rgba(255, 248, 240, 0.88), rgba(255, 239, 219, 0.76));\n}\n\n.hero-command-card.tone-neutral[_ngcontent-%COMP%] {\n  border-color: rgba(96, 165, 250, 0.25);\n  background: linear-gradient(145deg, rgba(243, 248, 255, 0.88), rgba(229, 239, 255, 0.78));\n}\n\n.hero-command-card__label[_ngcontent-%COMP%], \n.detail-meta[_ngcontent-%COMP%], \n.focus-pill__label[_ngcontent-%COMP%], \n.panel-title[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.hero-command-card__label[_ngcontent-%COMP%] {\n  color: rgba(54, 68, 101, 0.95);\n  font-weight: 700;\n}\n\n.hero-command-card__value[_ngcontent-%COMP%] {\n  font-size: 2.1rem;\n  line-height: 1;\n  font-weight: 800;\n  color: #132447;\n}\n\n.hero-command-card__caption[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #4f6492;\n}\n\n.hero-refresh-btn[_ngcontent-%COMP%] {\n  min-width: 150px;\n  background: linear-gradient(135deg, #14b86e, #0f9a5d);\n  border: 1px solid rgba(10, 124, 75, 0.55);\n  color: #fff;\n  box-shadow: 0 12px 24px rgba(20, 184, 110, 0.22);\n}\n\n.hero-refresh-btn[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(135deg, #10a765, #0d8f55);\n}\n\n.workspace-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.9fr) minmax(330px, 0.95fr);\n  gap: 1.1rem;\n  align-items: start;\n}\n\n.workspace-main[_ngcontent-%COMP%], \n.workspace-rail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.workspace-rail[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n\n.risk-panel-shell[_ngcontent-%COMP%], \n.watchlist-panel[_ngcontent-%COMP%], \n.detail-panel[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 18px;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  border-radius: 18px;\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n}\n\n.risk-panel-shell[_ngcontent-%COMP%]::before, \n.watchlist-panel[_ngcontent-%COMP%]::before, \n.detail-panel[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 18px;\n  pointer-events: none;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n  opacity: 0.9;\n}\n\n.ai-orchestration-header[_ngcontent-%COMP%], \n.panel-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  padding-bottom: 0.85rem;\n  border-bottom: 1px solid rgba(174, 189, 221, 0.3);\n}\n\n.section-title[_ngcontent-%COMP%], \n.panel-title[_ngcontent-%COMP%] {\n  margin: 0;\n  width: fit-content;\n  padding: 0.55rem 0.9rem;\n  border-radius: 14px;\n  font-size: 1rem;\n  color: #132447;\n  font-weight: 800;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 8px 18px rgba(49, 69, 115, 0.08);\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: linear-gradient(135deg, rgba(231, 241, 255, 0.98), rgba(212, 227, 255, 0.9));\n  border: 1px solid rgba(96, 165, 250, 0.28);\n}\n\n.card-title[_ngcontent-%COMP%], \n.detail-title[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #132447;\n  font-weight: 800;\n}\n\n.priority-board-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.watchlist-panel[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(237, 249, 244, 0.98), rgba(215, 243, 232, 0.92));\n  border: 1px solid rgba(52, 171, 115, 0.24);\n  color: #155e46;\n}\n\n.detail-panel[_ngcontent-%COMP%]   .panel-title[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(240, 243, 255, 0.98), rgba(224, 232, 255, 0.92));\n  border: 1px solid rgba(99, 102, 241, 0.22);\n  color: #2f4fa6;\n}\n\n.risk-intelligence-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: rgba(60, 76, 114, 0.82);\n}\n\n.priority-board[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border-radius: 20px;\n  border: 1px solid rgba(188, 201, 230, 0.58);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(237, 243, 255, 0.7));\n  backdrop-filter: blur(18px) saturate(126%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 14px 28px rgba(44, 64, 109, 0.08);\n  position: relative;\n  overflow: hidden;\n}\n\n.priority-board[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 20px;\n  pointer-events: none;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n}\n\n.priority-board-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n}\n\n.priority-risk-table[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n[_nghost-%COMP%]     .priority-risk-table .p-datatable-table-container {\n  overflow: visible;\n}\n\n[_nghost-%COMP%]     .priority-risk-table .p-datatable-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background: rgba(255, 255, 255, 0.64);\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .priority-risk-table .p-datatable-thead > tr > th {\n  padding: 0.85rem 1rem;\n  border: 0;\n  background: linear-gradient(145deg, rgba(226, 237, 255, 0.92), rgba(214, 228, 255, 0.86));\n  color: #41557f;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(174, 189, 221, 0.42);\n}\n\n[_nghost-%COMP%]     .priority-risk-table .p-datatable-tbody > tr > td {\n  padding: 0.9rem 1rem;\n  border: 0;\n  border-bottom: 1px solid rgba(196, 207, 231, 0.58);\n  background: rgba(255, 255, 255, 0.5);\n  vertical-align: middle;\n}\n\n.priority-risk-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 160ms ease;\n}\n\n.priority-risk-row[_ngcontent-%COMP%]:hover {\n  background: rgba(234, 242, 255, 0.34);\n}\n\n[_nghost-%COMP%]     .priority-risk-table .p-datatable-tbody > tr.priority-risk-row.is-selected > td {\n  background: rgba(224, 236, 255, 0.62);\n  border-bottom-color: rgba(96, 165, 250, 0.42);\n}\n\n.priority-risk-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.35rem;\n  min-width: 0;\n  color: #344868;\n}\n\n.priority-risk-cell--risk[_ngcontent-%COMP%], \n.priority-risk-cell--urgency[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.priority-risk-cell--record[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.98rem;\n  color: #172b4d;\n}\n\n.priority-risk-cell--record[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  line-height: 1.35;\n  font-size: 0.8rem;\n}\n\n.priority-risk-cell--owner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #172b4d;\n  font-size: 0.92rem;\n}\n\n.priority-risk-rank[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  font-size: 0.92rem;\n  font-weight: 800;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);\n}\n\n.priority-risk-rank.critical[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n}\n\n.priority-risk-rank.high[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #f97316, #ea580c);\n}\n\n.priority-risk-rank.medium[_ngcontent-%COMP%] {\n  color: #3f2f12;\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n}\n\n.risk-row-pill[_ngcontent-%COMP%], \n.urgency-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  min-height: 34px;\n  padding: 0 0.8rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.risk-row-pill.critical[_ngcontent-%COMP%], \n.urgency-pill.critical[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n}\n\n.risk-row-pill.high[_ngcontent-%COMP%], \n.urgency-pill.high[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #f97316, #ea580c);\n}\n\n.risk-row-pill.medium[_ngcontent-%COMP%], \n.urgency-pill.medium[_ngcontent-%COMP%] {\n  color: #3f2f12;\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n}\n\n.detail-topline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.score-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 0.08rem;\n  min-width: 88px;\n  min-height: 88px;\n  padding: 0.8rem 0.9rem;\n  border-radius: 18px;\n  font-weight: 700;\n  border: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 10px 18px rgba(42, 63, 108, 0.08);\n}\n\n.score-badge--danger[_ngcontent-%COMP%] {\n  background: linear-gradient(145deg, rgba(255, 246, 247, 0.95), rgba(255, 234, 238, 0.9));\n  color: #b91c1c;\n  border-color: rgba(239, 68, 68, 0.28);\n}\n\n.score-badge--warn[_ngcontent-%COMP%] {\n  background: linear-gradient(145deg, rgba(255, 248, 240, 0.95), rgba(255, 239, 223, 0.9));\n  color: #c2410c;\n  border-color: rgba(249, 115, 22, 0.26);\n}\n\n.score-badge--neutral[_ngcontent-%COMP%] {\n  background: linear-gradient(145deg, rgba(247, 250, 255, 0.95), rgba(232, 239, 252, 0.9));\n  color: #334155;\n  border-color: rgba(148, 163, 184, 0.24);\n}\n\n.score-badge__label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  line-height: 1;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: inherit;\n  opacity: 0.72;\n  font-weight: 800;\n}\n\n.score-badge__value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  line-height: 1;\n  font-weight: 800;\n}\n\n.detail-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.3rem;\n}\n\n.detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.7rem;\n  margin-bottom: 1rem;\n  color: #64748b;\n}\n\n.detail-section[_ngcontent-%COMP%]    + .detail-section[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n\n.detail-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.4rem;\n  font-size: 0.86rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #1e3a8a;\n}\n\n.recommended-action-card[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(186, 230, 253, 0.95);\n  background: linear-gradient(135deg, rgba(239, 246, 255, 0.96), rgba(255, 255, 255, 0.92));\n}\n\n.selected-risk-console[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.9rem;\n  padding: 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(189, 198, 226, 0.58);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(244, 247, 255, 0.86));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 12px 28px rgba(42, 63, 108, 0.08);\n}\n\n.selected-risk-console__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.selected-risk-flag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 34px;\n  padding: 0 0.8rem;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.selected-risk-flag.critical[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  color: #fff;\n}\n\n.selected-risk-flag.high[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f97316, #ea580c);\n  color: #fff;\n}\n\n.selected-risk-flag.medium[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n  color: #3f2f12;\n}\n\n.impact-card[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(252, 211, 77, 0.42);\n  background: linear-gradient(135deg, rgba(255, 251, 235, 0.96), rgba(255, 247, 237, 0.92));\n}\n\n.detail-section--action-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.selected-risk-btn[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border-radius: 12px;\n  font-weight: 700;\n}\n\n.selected-risk-btn--secondary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(239, 244, 255, 0.96), rgba(223, 234, 255, 0.88));\n  color: #21406d;\n  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.16);\n}\n\n.selected-risk-btn--primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n  color: #fff;\n  box-shadow: 0 12px 22px rgba(37, 99, 235, 0.22);\n}\n\n.evidence-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.focus-pill-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.7rem;\n}\n\n.focus-pill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.18rem;\n  padding: 0.85rem 0.95rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: #ffffff;\n}\n\n.focus-pill--danger[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(254, 242, 242, 0.98), rgba(255, 255, 255, 0.92));\n  border-color: rgba(252, 165, 165, 0.5);\n}\n\n.focus-pill--warning[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(255, 255, 255, 0.92));\n  border-color: rgba(251, 191, 36, 0.45);\n}\n\n.focus-pill--neutral[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.92));\n}\n\n.focus-pill__label[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-weight: 700;\n}\n\n.focus-pill__value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n\n.watchlist-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n\n.watchlist-item[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  padding: 0.95rem 1rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(195, 207, 231, 0.72);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(242, 248, 255, 0.7));\n  backdrop-filter: blur(18px) saturate(126%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.88), 0 10px 22px rgba(35, 56, 102, 0.08);\n  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;\n}\n\n.watchlist-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 16px 28px rgba(32, 55, 101, 0.12);\n  border-color: rgba(96, 165, 250, 0.7);\n}\n\n.watchlist-item__head[_ngcontent-%COMP%], \n.watchlist-item__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.watchlist-item__head[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n\n.watchlist-item__head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #163153;\n}\n\n.empty-state[_ngcontent-%COMP%], \n.table-loading[_ngcontent-%COMP%], \n.watchlist-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  align-items: center;\n  justify-content: center;\n  min-height: 220px;\n  text-align: center;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #2563eb;\n}\n\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  color: #0f172a;\n}\n\n.table-loading__row[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n@media (max-width: 1260px) {\n  .hero-section[_ngcontent-%COMP%], \n   .workspace-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .workspace-rail[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n\n@media (max-width: 980px) {\n  .hero-command-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  [_nghost-%COMP%]     .priority-risk-table .p-datatable-wrapper {\n    overflow-x: auto;\n  }\n\n  .detail-section--action-bar[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n}\n\n@media (max-width: 840px) {\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 2.1rem;\n  }\n\n  .focus-pill-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RiskIntelligencePage, [{
        type: Component,
        args: [{ selector: 'app-risk-intelligence-page', standalone: true, imports: [
                    CommonModule,
                    BreadcrumbsComponent,
                    ButtonModule,
                    ChipModule,
                    SkeletonModule,
                    TagModule,
                    TableModule
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\" aria-hidden=\"true\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-content risk-page\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Operational Guidance</span>\n        </div>\n\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Risk</span>\n          <span class=\"title-light\">Intelligence</span>\n        </h1>\n\n        <p class=\"hero-subtitle\">\n          Explainable early warning across deals, approvals, leads, and pipeline hygiene so the team knows what to act on next.\n        </p>\n\n        <div class=\"hero-status\">\n          <span class=\"hero-status__label\">{{ generatedAtLabel(workspace().generatedAtUtc) }}</span>\n          <span class=\"hero-status__dot\"></span>\n          <span class=\"hero-status__label\">{{ workspace().priorityRisks.length }} priority items in focus</span>\n        </div>\n      </div>\n\n      <div class=\"hero-command-strip\">\n        <div\n          class=\"hero-command-card\"\n          *ngFor=\"let item of heroHighlights()\"\n          [ngClass]=\"'tone-' + item.tone\">\n          <span class=\"hero-command-card__label\">{{ item.label }}</span>\n          <strong class=\"hero-command-card__value\">{{ item.value }}</strong>\n          <span class=\"hero-command-card__caption\">{{ item.caption }}</span>\n        </div>\n\n        <div class=\"hero-actions\">\n          <button pButton type=\"button\" class=\"crm-secondary-btn hero-refresh-btn\" icon=\"pi pi-refresh\" label=\"Refresh\" (click)=\"loadWorkspace()\"></button>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"workspace-grid\">\n      <div class=\"workspace-main\">\n        <section class=\"risk-panel-shell\">\n          <div class=\"priority-board-header\">\n            <h2 class=\"section-title\">\n              <i class=\"pi pi-shield\"></i>\n              Priority Risks\n            </h2>\n            <span class=\"risk-intelligence-subtitle\">Ranked guidance across current CRM operational signals.</span>\n          </div>\n\n          <ng-container *ngIf=\"!loading(); else tableLoading\">\n            <div class=\"priority-board\" *ngIf=\"priorityQueue().length; else emptyState\" data-testid=\"risk-priority-table\">\n              <div class=\"priority-board-summary\" *ngIf=\"riskPanelSummary().length\">\n                <span\n                  class=\"risk-summary-pill\"\n                  *ngFor=\"let item of riskPanelSummary()\"\n                  [ngClass]=\"item.severity\"\n                >\n                  {{ item.label }} \u00B7 {{ item.count }}\n                </span>\n              </div>\n\n              <p-table\n                [value]=\"priorityQueue()\"\n                styleClass=\"priority-risk-table\"\n                dataKey=\"id\"\n                [tableStyle]=\"{ 'min-width': '100%' }\">\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th>Risk</th>\n                    <th>Record</th>\n                    <th>Owner</th>\n                    <th>Urgency</th>\n                  </tr>\n                </ng-template>\n\n                <ng-template pTemplate=\"body\" let-item let-rowIndex=\"rowIndex\">\n                  <tr\n                    class=\"priority-risk-row\"\n                    [ngClass]=\"[riskCardSeverityClass(item), selectedRiskId() === item.id ? 'is-selected' : '']\"\n                    (click)=\"selectRisk(item)\"\n                    [attr.data-testid]=\"'risk-row-' + item.id\">\n                    <td>\n                      <div class=\"priority-risk-cell priority-risk-cell--risk\">\n                        <span class=\"priority-risk-rank\" [ngClass]=\"riskCardSeverityClass(item)\">{{ rowIndex + 1 }}</span>\n                      </div>\n                    </td>\n\n                    <td>\n                      <div class=\"priority-risk-cell priority-risk-cell--record\">\n                        <strong>{{ item.entityLabel }}</strong>\n                        <span>{{ item.affectedModule }}</span>\n                      </div>\n                    </td>\n\n                    <td>\n                      <div class=\"priority-risk-cell priority-risk-cell--owner\">\n                        <span>{{ item.owner }}</span>\n                      </div>\n                    </td>\n\n                    <td>\n                      <div class=\"priority-risk-cell priority-risk-cell--urgency\">\n                        <span class=\"urgency-pill\" [ngClass]=\"riskCardSeverityClass(item)\">{{ urgencyLabel(item.urgency) }}</span>\n                      </div>\n                    </td>\n                  </tr>\n                </ng-template>\n              </p-table>\n            </div>\n          </ng-container>\n        </section>\n\n        <section class=\"watchlist-panel\">\n          <div class=\"panel-header\">\n            <div>\n              <h2 class=\"panel-title\">Watchlist & Trends</h2>\n              <p class=\"panel-copy\">Shared risk patterns that stay visible even when no single record should dominate the queue.</p>\n            </div>\n          </div>\n\n          <ng-container *ngIf=\"!loading(); else watchlistLoading\">\n            <div class=\"watchlist-stack\" data-testid=\"risk-watchlist\">\n              <button\n                *ngFor=\"let item of workspace().watchlist\"\n                type=\"button\"\n                class=\"watchlist-item\"\n                (click)=\"openRisk(item)\">\n                <div class=\"watchlist-item__head\">\n                  <strong>{{ item.label }}</strong>\n                  <div class=\"watchlist-item__meta\">\n                    <p-tag [value]=\"item.severity\" [severity]=\"watchlistSeverity(item.severity)\"></p-tag>\n                    <span class=\"watchlist-item__count\">{{ item.count }}</span>\n                  </div>\n                </div>\n                <p>{{ item.context }}</p>\n              </button>\n            </div>\n          </ng-container>\n        </section>\n      </div>\n\n      <div class=\"workspace-rail\">\n        <section class=\"detail-panel\">\n          <div class=\"panel-header\">\n            <div>\n              <h2 class=\"panel-title\">Selected Risk</h2>\n              <p class=\"panel-copy\">Immediate explanation and next best action.</p>\n            </div>\n          </div>\n\n          <ng-container *ngIf=\"selectedRisk() as selected; else noSelection\">\n            <div class=\"selected-risk-console\">\n              <div class=\"selected-risk-console__head\">\n                <span class=\"selected-risk-flag\" [ngClass]=\"riskCardSeverityClass(selected)\">{{ riskCardSeverityLabel(selected) }} issue</span>\n                <div [class]=\"scoreClass(selected.score)\">\n                  <span class=\"score-badge__label\">Score</span>\n                  <strong class=\"score-badge__value\">{{ selected.score }}</strong>\n                </div>\n              </div>\n\n              <h3 class=\"detail-title\">{{ selected.entityLabel }}</h3>\n              <div class=\"detail-meta\">\n                <span>{{ selected.riskType }}</span>\n                <span>{{ selected.affectedModule }}</span>\n                <span>{{ selected.owner }}</span>\n              </div>\n\n              <div class=\"detail-section detail-section--impact\">\n                <h4>Impact</h4>\n                <div class=\"impact-card\">\n                  <p>{{ selected.reasonSummary }}</p>\n                </div>\n              </div>\n\n              <div class=\"detail-section detail-section--action\">\n                <h4>Next action</h4>\n                <div class=\"recommended-action-card\">\n                  <p>{{ selected.recommendedAction }}</p>\n                </div>\n              </div>\n\n              <div class=\"detail-section detail-section--action-bar\">\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"selected-risk-btn selected-risk-btn--secondary\"\n                  icon=\"pi pi-search\"\n                  label=\"Review selected\"\n                  (click)=\"selectRisk(selected)\"></button>\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"selected-risk-btn selected-risk-btn--primary\"\n                  icon=\"pi pi-arrow-right\"\n                  label=\"Open source record\"\n                  data-testid=\"risk-open-selected\"\n                  (click)=\"openRisk(selected)\"></button>\n              </div>\n            </div>\n\n            <div class=\"detail-section detail-section--signals\">\n              <h4>Operator Focus</h4>\n              <div class=\"focus-pill-grid\">\n                <div *ngFor=\"let item of focusSignals()\" [class]=\"focusSignalToneClass(item.tone)\">\n                  <span class=\"focus-pill__label\">{{ item.label }}</span>\n                  <strong class=\"focus-pill__value\">{{ item.value }}</strong>\n                </div>\n              </div>\n            </div>\n\n          </ng-container>\n        </section>\n      </div>\n    </section>\n  </div>\n</div>\n\n<ng-template #loadingValue>\n  <p-skeleton width=\"4rem\" height=\"1.6rem\"></p-skeleton>\n</ng-template>\n\n<ng-template #tableLoading>\n  <div class=\"table-loading\">\n    <p-skeleton *ngFor=\"let _ of [1,2,3]\" height=\"7rem\" styleClass=\"table-loading__row\"></p-skeleton>\n  </div>\n</ng-template>\n\n<ng-template #watchlistLoading>\n  <div class=\"watchlist-loading\">\n    <p-skeleton *ngFor=\"let _ of [1,2,3]\" height=\"5rem\"></p-skeleton>\n  </div>\n</ng-template>\n\n<ng-template #emptyState>\n  <div class=\"empty-state\" data-testid=\"risk-empty-state\">\n    <ng-container *ngIf=\"loadError(); else noActiveRisks\">\n      <i class=\"pi pi-exclamation-circle\"></i>\n      <h3>Risk Intelligence did not load</h3>\n      <p>{{ loadError() }}</p>\n      <button\n        pButton\n        type=\"button\"\n        class=\"crm-secondary-btn\"\n        icon=\"pi pi-refresh\"\n        label=\"Retry\"\n        (click)=\"loadWorkspace()\"></button>\n    </ng-container>\n  </div>\n</ng-template>\n\n<ng-template #noActiveRisks>\n  <i class=\"pi pi-shield\"></i>\n  <h3>No active risks right now</h3>\n  <p>The current thresholds and CRM signals did not produce any open guidance items.</p>\n</ng-template>\n\n<ng-template #noSelection>\n  <div class=\"empty-state\">\n    <i class=\"pi pi-search\"></i>\n    <h3>Select a risk</h3>\n    <p>Pick a priority row to inspect its evidence and recommended action.</p>\n  </div>\n</ng-template>\n", styles: [".page-container {\n  position: relative;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n\n.risk-page {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(56px);\n  opacity: 0.34;\n}\n\n.orb-1 {\n  width: 520px;\n  height: 520px;\n  top: -180px;\n  right: -120px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.42), rgba(113, 144, 235, 0));\n}\n\n.orb-2 {\n  width: 420px;\n  height: 420px;\n  bottom: 6%;\n  left: -120px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.24), rgba(109, 174, 255, 0));\n}\n\n.orb-3 {\n  width: 300px;\n  height: 300px;\n  top: 34%;\n  right: 18%;\n  background: radial-gradient(circle, rgba(96, 206, 162, 0.2), rgba(96, 206, 162, 0));\n}\n\n.hero-section {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 1.5rem;\n  padding: 1.5rem 1.6rem;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  border-radius: 24px;\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n  overflow: hidden;\n}\n\n.hero-section::before,\n.hero-section::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  border-radius: 50%;\n  filter: blur(24px);\n  opacity: 0.48;\n}\n\n.hero-section::before {\n  width: 210px;\n  height: 210px;\n  top: -80px;\n  right: -58px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.45), rgba(113, 144, 235, 0));\n}\n\n.hero-section::after {\n  width: 240px;\n  height: 240px;\n  bottom: -110px;\n  left: -76px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.28), rgba(109, 174, 255, 0));\n}\n\n.hero-content,\n.hero-command-strip {\n  position: relative;\n  z-index: 1;\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: fit-content;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.14);\n  background: rgba(255, 255, 255, 0.72);\n  color: #5c75d9;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.badge-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #67d38d;\n}\n\n.hero-title {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  gap: 0.35rem;\n  font-size: 2.5rem;\n  line-height: 1;\n  letter-spacing: -0.04em;\n}\n\n.title-gradient {\n  background: linear-gradient(135deg, #4ea6ff 0%, #2563eb 60%, #3344d3 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n\n.title-light {\n  color: #344868;\n}\n\n.hero-subtitle,\n.panel-copy,\n.detail-section p,\n.watchlist-item p,\n.empty-state p,\n.ai-orchestration-subtitle {\n  margin: 0;\n  color: rgba(60, 76, 114, 0.9);\n  line-height: 1.55;\n}\n\n.hero-status {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  align-items: center;\n}\n\n.hero-status__label,\n.ai-generated-at,\n.panel-copy,\n.watchlist-item__count {\n  font-size: 0.82rem;\n  color: rgba(58, 74, 109, 0.88);\n}\n\n.hero-status__dot {\n  width: 0.3rem;\n  height: 0.3rem;\n  border-radius: 999px;\n  background: #60a5fa;\n}\n\n.hero-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.hero-command-strip {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(180px, 1fr));\n  align-content: start;\n  gap: 0.9rem;\n}\n\n.hero-command-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  min-height: 118px;\n  padding: 1rem 1.05rem;\n  border-radius: 16px;\n  border: 1px solid rgba(197, 207, 232, 0.9);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(236, 242, 255, 0.78));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 10px 24px rgba(44, 64, 109, 0.08);\n}\n\n.hero-command-card.tone-danger {\n  border-color: rgba(239, 68, 68, 0.28);\n  background: linear-gradient(145deg, rgba(255, 247, 248, 0.88), rgba(255, 236, 240, 0.76));\n}\n\n.hero-command-card.tone-warning {\n  border-color: rgba(249, 115, 22, 0.26);\n  background: linear-gradient(145deg, rgba(255, 248, 240, 0.88), rgba(255, 239, 219, 0.76));\n}\n\n.hero-command-card.tone-neutral {\n  border-color: rgba(96, 165, 250, 0.25);\n  background: linear-gradient(145deg, rgba(243, 248, 255, 0.88), rgba(229, 239, 255, 0.78));\n}\n\n.hero-command-card__label,\n.detail-meta,\n.focus-pill__label,\n.panel-title {\n  font-size: 0.76rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.hero-command-card__label {\n  color: rgba(54, 68, 101, 0.95);\n  font-weight: 700;\n}\n\n.hero-command-card__value {\n  font-size: 2.1rem;\n  line-height: 1;\n  font-weight: 800;\n  color: #132447;\n}\n\n.hero-command-card__caption {\n  font-size: 0.78rem;\n  color: #4f6492;\n}\n\n.hero-refresh-btn {\n  min-width: 150px;\n  background: linear-gradient(135deg, #14b86e, #0f9a5d);\n  border: 1px solid rgba(10, 124, 75, 0.55);\n  color: #fff;\n  box-shadow: 0 12px 24px rgba(20, 184, 110, 0.22);\n}\n\n.hero-refresh-btn:hover {\n  background: linear-gradient(135deg, #10a765, #0d8f55);\n}\n\n.workspace-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.9fr) minmax(330px, 0.95fr);\n  gap: 1.1rem;\n  align-items: start;\n}\n\n.workspace-main,\n.workspace-rail {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.workspace-rail {\n  position: sticky;\n  top: 1rem;\n}\n\n.risk-panel-shell,\n.watchlist-panel,\n.detail-panel {\n  position: relative;\n  z-index: 1;\n  padding: 18px;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  border-radius: 18px;\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n}\n\n.risk-panel-shell::before,\n.watchlist-panel::before,\n.detail-panel::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 18px;\n  pointer-events: none;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n  opacity: 0.9;\n}\n\n.ai-orchestration-header,\n.panel-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.panel-header {\n  padding-bottom: 0.85rem;\n  border-bottom: 1px solid rgba(174, 189, 221, 0.3);\n}\n\n.section-title,\n.panel-title {\n  margin: 0;\n  width: fit-content;\n  padding: 0.55rem 0.9rem;\n  border-radius: 14px;\n  font-size: 1rem;\n  color: #132447;\n  font-weight: 800;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 8px 18px rgba(49, 69, 115, 0.08);\n}\n\n.section-title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: linear-gradient(135deg, rgba(231, 241, 255, 0.98), rgba(212, 227, 255, 0.9));\n  border: 1px solid rgba(96, 165, 250, 0.28);\n}\n\n.card-title,\n.detail-title {\n  margin: 0;\n  color: #132447;\n  font-weight: 800;\n}\n\n.priority-board-header {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.watchlist-panel .panel-title {\n  background: linear-gradient(135deg, rgba(237, 249, 244, 0.98), rgba(215, 243, 232, 0.92));\n  border: 1px solid rgba(52, 171, 115, 0.24);\n  color: #155e46;\n}\n\n.detail-panel .panel-title {\n  background: linear-gradient(135deg, rgba(240, 243, 255, 0.98), rgba(224, 232, 255, 0.92));\n  border: 1px solid rgba(99, 102, 241, 0.22);\n  color: #2f4fa6;\n}\n\n.risk-intelligence-subtitle {\n  font-size: 0.9rem;\n  color: rgba(60, 76, 114, 0.82);\n}\n\n.priority-board {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border-radius: 20px;\n  border: 1px solid rgba(188, 201, 230, 0.58);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(237, 243, 255, 0.7));\n  backdrop-filter: blur(18px) saturate(126%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 14px 28px rgba(44, 64, 109, 0.08);\n  position: relative;\n  overflow: hidden;\n}\n\n.priority-board::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 20px;\n  pointer-events: none;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n}\n\n.priority-board-summary {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n}\n\n.priority-risk-table {\n  position: relative;\n  z-index: 1;\n}\n\n:host ::ng-deep .priority-risk-table .p-datatable-table-container {\n  overflow: visible;\n}\n\n:host ::ng-deep .priority-risk-table .p-datatable-table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background: rgba(255, 255, 255, 0.64);\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n:host ::ng-deep .priority-risk-table .p-datatable-thead > tr > th {\n  padding: 0.85rem 1rem;\n  border: 0;\n  background: linear-gradient(145deg, rgba(226, 237, 255, 0.92), rgba(214, 228, 255, 0.86));\n  color: #41557f;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(174, 189, 221, 0.42);\n}\n\n:host ::ng-deep .priority-risk-table .p-datatable-tbody > tr > td {\n  padding: 0.9rem 1rem;\n  border: 0;\n  border-bottom: 1px solid rgba(196, 207, 231, 0.58);\n  background: rgba(255, 255, 255, 0.5);\n  vertical-align: middle;\n}\n\n.priority-risk-row {\n  cursor: pointer;\n  transition: background-color 160ms ease;\n}\n\n.priority-risk-row:hover {\n  background: rgba(234, 242, 255, 0.34);\n}\n\n:host ::ng-deep .priority-risk-table .p-datatable-tbody > tr.priority-risk-row.is-selected > td {\n  background: rgba(224, 236, 255, 0.62);\n  border-bottom-color: rgba(96, 165, 250, 0.42);\n}\n\n.priority-risk-cell {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 0.35rem;\n  min-width: 0;\n  color: #344868;\n}\n\n.priority-risk-cell--risk,\n.priority-risk-cell--urgency {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.priority-risk-cell--record strong {\n  font-size: 0.98rem;\n  color: #172b4d;\n}\n\n.priority-risk-cell--record span {\n  color: #64748b;\n  line-height: 1.35;\n  font-size: 0.8rem;\n}\n\n.priority-risk-cell--owner span {\n  font-weight: 700;\n  color: #172b4d;\n  font-size: 0.92rem;\n}\n\n.priority-risk-rank {\n  width: 2rem;\n  height: 2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  font-size: 0.92rem;\n  font-weight: 800;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);\n}\n\n.priority-risk-rank.critical {\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n}\n\n.priority-risk-rank.high {\n  color: #fff;\n  background: linear-gradient(135deg, #f97316, #ea580c);\n}\n\n.priority-risk-rank.medium {\n  color: #3f2f12;\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n}\n\n.risk-row-pill,\n.urgency-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  min-height: 34px;\n  padding: 0 0.8rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.risk-row-pill.critical,\n.urgency-pill.critical {\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n}\n\n.risk-row-pill.high,\n.urgency-pill.high {\n  color: #fff;\n  background: linear-gradient(135deg, #f97316, #ea580c);\n}\n\n.risk-row-pill.medium,\n.urgency-pill.medium {\n  color: #3f2f12;\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n}\n\n.detail-topline {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.score-badge {\n  display: inline-flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 0.08rem;\n  min-width: 88px;\n  min-height: 88px;\n  padding: 0.8rem 0.9rem;\n  border-radius: 18px;\n  font-weight: 700;\n  border: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 10px 18px rgba(42, 63, 108, 0.08);\n}\n\n.score-badge--danger {\n  background: linear-gradient(145deg, rgba(255, 246, 247, 0.95), rgba(255, 234, 238, 0.9));\n  color: #b91c1c;\n  border-color: rgba(239, 68, 68, 0.28);\n}\n\n.score-badge--warn {\n  background: linear-gradient(145deg, rgba(255, 248, 240, 0.95), rgba(255, 239, 223, 0.9));\n  color: #c2410c;\n  border-color: rgba(249, 115, 22, 0.26);\n}\n\n.score-badge--neutral {\n  background: linear-gradient(145deg, rgba(247, 250, 255, 0.95), rgba(232, 239, 252, 0.9));\n  color: #334155;\n  border-color: rgba(148, 163, 184, 0.24);\n}\n\n.score-badge__label {\n  font-size: 0.72rem;\n  line-height: 1;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: inherit;\n  opacity: 0.72;\n  font-weight: 800;\n}\n\n.score-badge__value {\n  font-size: 2rem;\n  line-height: 1;\n  font-weight: 800;\n}\n\n.detail-title {\n  margin: 0 0 0.5rem;\n  font-size: 1.3rem;\n}\n\n.detail-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.7rem;\n  margin-bottom: 1rem;\n  color: #64748b;\n}\n\n.detail-section + .detail-section {\n  margin-top: 1rem;\n}\n\n.detail-section h4 {\n  margin: 0 0 0.4rem;\n  font-size: 0.86rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #1e3a8a;\n}\n\n.recommended-action-card {\n  padding: 0.95rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(186, 230, 253, 0.95);\n  background: linear-gradient(135deg, rgba(239, 246, 255, 0.96), rgba(255, 255, 255, 0.92));\n}\n\n.selected-risk-console {\n  display: flex;\n  flex-direction: column;\n  gap: 0.9rem;\n  padding: 1rem;\n  border-radius: 18px;\n  border: 1px solid rgba(189, 198, 226, 0.58);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(244, 247, 255, 0.86));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 12px 28px rgba(42, 63, 108, 0.08);\n}\n\n.selected-risk-console__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.selected-risk-flag {\n  display: inline-flex;\n  align-items: center;\n  min-height: 34px;\n  padding: 0 0.8rem;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.selected-risk-flag.critical {\n  background: linear-gradient(135deg, #ef4444, #dc2626);\n  color: #fff;\n}\n\n.selected-risk-flag.high {\n  background: linear-gradient(135deg, #f97316, #ea580c);\n  color: #fff;\n}\n\n.selected-risk-flag.medium {\n  background: linear-gradient(135deg, #fcd34d, #f59e0b);\n  color: #3f2f12;\n}\n\n.impact-card {\n  padding: 0.95rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(252, 211, 77, 0.42);\n  background: linear-gradient(135deg, rgba(255, 251, 235, 0.96), rgba(255, 247, 237, 0.92));\n}\n\n.detail-section--action-bar {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.selected-risk-btn {\n  min-height: 42px;\n  border-radius: 12px;\n  font-weight: 700;\n}\n\n.selected-risk-btn--secondary {\n  background: linear-gradient(135deg, rgba(239, 244, 255, 0.96), rgba(223, 234, 255, 0.88));\n  color: #21406d;\n  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.16);\n}\n\n.selected-risk-btn--primary {\n  background: linear-gradient(135deg, #2563eb, #1d4ed8);\n  color: #fff;\n  box-shadow: 0 12px 22px rgba(37, 99, 235, 0.22);\n}\n\n.evidence-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.focus-pill-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.7rem;\n}\n\n.focus-pill {\n  display: flex;\n  flex-direction: column;\n  gap: 0.18rem;\n  padding: 0.85rem 0.95rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226, 232, 240, 0.92);\n  background: #ffffff;\n}\n\n.focus-pill--danger {\n  background: linear-gradient(135deg, rgba(254, 242, 242, 0.98), rgba(255, 255, 255, 0.92));\n  border-color: rgba(252, 165, 165, 0.5);\n}\n\n.focus-pill--warning {\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(255, 255, 255, 0.92));\n  border-color: rgba(251, 191, 36, 0.45);\n}\n\n.focus-pill--neutral {\n  background: linear-gradient(135deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.92));\n}\n\n.focus-pill__label {\n  color: #64748b;\n  font-weight: 700;\n}\n\n.focus-pill__value {\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n\n.watchlist-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n}\n\n.watchlist-item {\n  width: 100%;\n  text-align: left;\n  padding: 0.95rem 1rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(195, 207, 231, 0.72);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(242, 248, 255, 0.7));\n  backdrop-filter: blur(18px) saturate(126%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.88), 0 10px 22px rgba(35, 56, 102, 0.08);\n  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;\n}\n\n.watchlist-item:hover {\n  transform: translateY(-1px);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 16px 28px rgba(32, 55, 101, 0.12);\n  border-color: rgba(96, 165, 250, 0.7);\n}\n\n.watchlist-item__head,\n.watchlist-item__meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.watchlist-item__head {\n  margin-bottom: 0.5rem;\n}\n\n.watchlist-item__head strong {\n  font-size: 1rem;\n  color: #163153;\n}\n\n.empty-state,\n.table-loading,\n.watchlist-loading {\n  display: flex;\n  flex-direction: column;\n  gap: 0.8rem;\n  align-items: center;\n  justify-content: center;\n  min-height: 220px;\n  text-align: center;\n}\n\n.empty-state i {\n  font-size: 1.5rem;\n  color: #2563eb;\n}\n\n.empty-state h3 {\n  margin: 0;\n  font-size: 1.05rem;\n  color: #0f172a;\n}\n\n.table-loading__row {\n  width: 100%;\n}\n\n@media (max-width: 1260px) {\n  .hero-section,\n  .workspace-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .workspace-rail {\n    position: static;\n  }\n}\n\n@media (max-width: 980px) {\n  .hero-command-strip {\n    grid-template-columns: 1fr;\n  }\n\n  :host ::ng-deep .priority-risk-table .p-datatable-wrapper {\n    overflow-x: auto;\n  }\n\n  .detail-section--action-bar {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n}\n\n@media (max-width: 840px) {\n  .hero-section {\n    padding: 1.25rem;\n  }\n\n  .hero-title {\n    font-size: 2.1rem;\n  }\n\n  .focus-pill-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RiskIntelligencePage, { className: "RiskIntelligencePage", filePath: "src/app/crm/features/risk-intelligence/pages/risk-intelligence.page.ts", lineNumber: 29 }); })();
