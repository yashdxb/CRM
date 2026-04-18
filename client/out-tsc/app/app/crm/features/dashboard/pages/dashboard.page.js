import { DatePipe, DecimalPipe, PercentPipe, NgFor, NgIf, CurrencyPipe, NgSwitch, NgSwitchCase, NgClass, NgTemplateOutlet, NgStyle } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderListModule } from 'primeng/orderlist';
import { DatePickerModule } from 'primeng/datepicker';
import { Subject, startWith, switchMap } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { DashboardDataService } from '../services/dashboard-data.service';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { OpportunityApprovalService } from '../../opportunities/services/opportunity-approval.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CommandPaletteService } from '../../../../core/command-palette/command-palette.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { AppToastService } from '../../../../core/app-toast.service';
import { NotificationService } from '../../../../core/notifications';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { DASHBOARD_CARD_CATALOG, DASHBOARD_CHART_CATALOG } from '../dashboard-catalog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/cdk/drag-drop";
import * as i3 from "primeng/chart";
import * as i4 from "primeng/api";
import * as i5 from "primeng/button";
import * as i6 from "primeng/dialog";
import * as i7 from "primeng/datepicker";
const _c0 = () => ({ width: "96vw", maxWidth: "1200px" });
const _c1 = () => ({ minHeight: "72vh" });
const _c2 = () => ({ width: "520px", maxWidth: "92vw" });
const _c3 = () => ({ width: "min(720px, 95vw)" });
const _c4 = () => ({ maxHeight: "70vh", overflow: "auto" });
const _c5 = () => ({ width: "min(960px, 92vw)" });
const _c6 = () => ({ width: "min(560px, 92vw)" });
const _c7 = () => ({ overflow: "visible" });
const _c8 = (a0, a1) => [a0, a1];
const _c9 = a0 => ({ $implicit: a0 });
const _c10 = (a0, a1, a2, a3, a4) => ({ "aq-item__strip--danger": a0, "aq-item__strip--warning": a1, "aq-item__strip--purple": a2, "aq-item__strip--cyan": a3, "aq-item__strip--default": a4 });
const _c11 = (a0, a1, a2, a3, a4) => ({ "aq-item__icon--danger": a0, "aq-item__icon--warning": a1, "aq-item__icon--purple": a2, "aq-item__icon--cyan": a3, "aq-item__icon--primary": a4 });
const _c12 = (a0, a1, a2, a3) => ({ "pi-exclamation-triangle": a0, "pi-check-square": a1, "pi-user-plus": a2, "pi-inbox": a3 });
function DashboardPage_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 117);
    i0.ɵɵelement(1, "i", 118);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "All caught up!");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_div_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵelement(1, "i", 120);
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " overdue");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.summary().overdueActivities);
} }
function DashboardPage_div_66_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 121);
    i0.ɵɵelement(1, "i", 122);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Dashboard data failed to load. The API may still be starting up.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 123);
    i0.ɵɵlistener("click", function DashboardPage_div_66_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retryLoadData()); });
    i0.ɵɵelement(5, "i", 124);
    i0.ɵɵtext(6, " Retry ");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_Conditional_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.rangeLabel());
} }
function DashboardPage_Conditional_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Range ");
} }
function DashboardPage_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71)(1, "p-datepicker", 125);
    i0.ɵɵlistener("ngModelChange", function DashboardPage_Conditional_84_Template_p_datepicker_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDateRangeChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("inline", true)("numberOfMonths", 2)("ngModel", ctx_r1.dateRange());
} }
function DashboardPage_article_86_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 126, 11);
    i0.ɵɵelement(2, "div", 127);
    i0.ɵɵelementStart(3, "div", 128)(4, "div", 129)(5, "span", 130);
    i0.ɵɵtext(6, "Forecast cockpit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 131);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 132)(10, "div", 133);
    i0.ɵɵelement(11, "i", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 135)(13, "div", 136);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 137);
    i0.ɵɵtext(17, "Confidence-Weighted Forecast");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 138)(19, "span", 139);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 139);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 139);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 140);
    i0.ɵɵelement(27, "i", 141);
    i0.ɵɵelementStart(28, "span");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(30, "div", 142);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_86_Template_div_mousedown_30_listener($event) { i0.ɵɵrestoreView(_r5); const kpiFeaturedCard_r6 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, kpiFeaturedCard_r6, "e")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 143);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_86_Template_div_mousedown_31_listener($event) { i0.ɵɵrestoreView(_r5); const kpiFeaturedCard_r6 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, kpiFeaturedCard_r6, "se")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", ctx_r1.getCardDimensions("kpi-featured"));
    i0.ɵɵattribute("data-card-id", "kpi-featured");
    i0.ɵɵadvance(7);
    i0.ɵɵclassProp("down", ctx_r1.weightedPipelineDelta() < 0)("up", ctx_r1.weightedPipelineDelta() >= 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.weightedPipelineHeadline(), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(15, 20, ctx_r1.summary().confidenceWeightedPipelineValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" Raw ", i0.ɵɵpipeBind4(21, 25, ctx_r1.totalPipelineValue(), ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Retention ", ctx_r1.pipelineRetentionPct(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Calibration ", ctx_r1.calibrationLevel());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("down", ctx_r1.weightedPipelineDelta() < 0)("up", ctx_r1.weightedPipelineDelta() >= 0);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-shield", ctx_r1.weightedPipelineDelta() >= 0)("pi-arrow-down", ctx_r1.weightedPipelineDelta() < 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.weightedPipelineDirectionLabel());
} }
function DashboardPage_article_87_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 162);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const metric_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 1, metric_r8.value, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
} }
function DashboardPage_article_87_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 162);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const metric_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 1, metric_r8.value, "1.0-0"), " ");
} }
function DashboardPage_article_87_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 144, 12);
    i0.ɵɵelement(2, "div", 145);
    i0.ɵɵelementStart(3, "div", 146)(4, "div", 147);
    i0.ɵɵelement(5, "span", 148);
    i0.ɵɵelementStart(6, "span", 149);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 150);
    i0.ɵɵelement(9, "i", 151);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 152)(11, "div", 153);
    i0.ɵɵelement(12, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 154);
    i0.ɵɵtemplate(14, DashboardPage_article_87_div_14_Template, 3, 6, "div", 155)(15, DashboardPage_article_87_ng_template_15_Template, 3, 4, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(17, "div", 137);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 156)(20, "div", 157)(21, "span", 158);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 159);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 160);
    i0.ɵɵelement(26, "div", 161);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 142);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_87_Template_div_mousedown_27_listener($event) { i0.ɵɵrestoreView(_r7); const kpiCard_r9 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, kpiCard_r9, "e")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 143);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_87_Template_div_mousedown_28_listener($event) { i0.ɵɵrestoreView(_r7); const kpiCard_r9 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, kpiCard_r9, "se")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r8 = ctx.$implicit;
    const numericMetricValue_r10 = i0.ɵɵreference(16);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", ctx_r1.getCardDimensions("kpi-" + metric_r8.id));
    i0.ɵɵattribute("data-card-id", "kpi-" + metric_r8.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "metric-glow--" + ctx_r1.metricTone(metric_r8.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "metric-status-rail--" + ctx_r1.metricTone(metric_r8.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(metric_r8.sub);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(ctx_r1.metricTone(metric_r8.id));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(metric_r8.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", metric_r8.format === "currency")("ngIfElse", numericMetricValue_r10);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(metric_r8.label);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.metricHealthCaption(metric_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", metric_r8.percentage, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "metric-bar--" + ctx_r1.metricTone(metric_r8.id));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.metricTone(metric_r8.id));
    i0.ɵɵstyleProp("width", metric_r8.percentage, "%");
} }
function DashboardPage_ng_template_88_article_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 175)(1, "div", 176);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 177);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const kpi_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("title", ctx_r1.assistantKpiTooltip(kpi_r11.key, kpi_r11.label));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(kpi_r11.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.assistantSeverityClass(kpi_r11.severity));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 4, kpi_r11.value, "1.0-0"));
} }
function DashboardPage_ng_template_88_div_16_article_11_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 204)(1, "span", 205);
    i0.ɵɵtext(2, "Why now");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 206);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(action_r13.reasons[0]);
} }
function DashboardPage_ng_template_88_div_16_article_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 182)(1, "div", 183)(2, "div", 184);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 185)(5, "div", 186);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 187);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 188);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 189)(12, "h3", 190);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 191);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, DashboardPage_ng_template_88_div_16_article_11_div_18_Template, 5, 1, "div", 192);
    i0.ɵɵelementStart(19, "div", 193)(20, "span", 194);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 195);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 196);
    i0.ɵɵelement(25, "i", 197);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵelement(28, "i", 198);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "div", 199)(31, "span", 200);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 201)(34, "button", 202);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_88_div_16_article_11_Template_button_click_34_listener() { const action_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openAssistantAction(action_r13)); });
    i0.ɵɵelement(35, "i", 203);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const action_r13 = ctx.$implicit;
    const idx_r14 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(22, _c8, ctx_r1.assistantRiskClass(action_r13.riskTier), ctx_r1.assistantUrgencyClass(action_r13.priority, action_r13.urgency)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(idx_r14 + 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.assistantRiskClass(action_r13.riskTier));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r13.score);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.assistantImpactLabel(action_r13.score));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.assistantImpactUrgencyLabel(action_r13.score, action_r13.priority, action_r13.urgency));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r13.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.assistantRiskClass(action_r13.riskTier));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.assistantImpactLabel(action_r13.score), " \u00B7 ", ctx_r1.assistantUrgencyLabel(action_r13.priority, action_r13.urgency), " urgency ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r13.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", action_r13.reasons.length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.assistantRiskClass(action_r13.riskTier));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.assistantImpactLabel(action_r13.score), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.assistantUrgencyLabel(action_r13.priority, action_r13.urgency), " urgency");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", action_r13.ownerScope);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", action_r13.dueWindow);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.assistantRiskClass(action_r13.riskTier));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.assistantRiskLabel(action_r13.riskTier), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(25, _c8, ctx_r1.assistantRiskClass(action_r13.riskTier), (action_r13.riskTier || "").toLowerCase() === "low" ? "execute" : "review"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", (action_r13.riskTier || "").toLowerCase() === "low" ? "pi-bolt" : "pi-search");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (action_r13.riskTier || "").toLowerCase() === "low" ? "Execute" : "Review", " ");
} }
function DashboardPage_ng_template_88_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 178)(1, "div", 179)(2, "div");
    i0.ɵɵtext(3, "Priority Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div");
    i0.ɵɵtext(5, "Task Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div");
    i0.ɵɵtext(7, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div");
    i0.ɵɵtext(9, "Action");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 180);
    i0.ɵɵtemplate(11, DashboardPage_ng_template_88_div_16_article_11_Template, 37, 28, "article", 181);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngForOf", ctx_r1.assistantActions());
} }
function DashboardPage_ng_template_88_ng_template_17_strong_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1, "Execution is healthy right now.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_ng_template_88_ng_template_17_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1, "No urgent AI actions right now.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_ng_template_88_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 207);
    i0.ɵɵtemplate(1, DashboardPage_ng_template_88_ng_template_17_strong_1_Template, 2, 0, "strong", 208)(2, DashboardPage_ng_template_88_ng_template_17_ng_template_2_Template, 2, 0, "ng-template", null, 15, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Use the Risk Intelligence card for guidance and watchlist review.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const monitorOnlyState_r15 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantExecutionHealthy())("ngIfElse", monitorOnlyState_r15);
} }
function DashboardPage_ng_template_88_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 209)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 210);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_88_div_19_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.undoAssistantAction()); });
    i0.ɵɵtext(4, " Undo ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.assistantUndoMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.assistantUndoBusy);
} }
function DashboardPage_ng_template_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 163)(1, "div", 164)(2, "div", 165)(3, "h2", 64);
    i0.ɵɵelement(4, "i", 166);
    i0.ɵɵtext(5, " AI Recommendations ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 167);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 168)(9, "span", 169);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 170);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 171);
    i0.ɵɵtemplate(15, DashboardPage_ng_template_88_article_15_Template, 6, 7, "article", 172);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, DashboardPage_ng_template_88_div_16_Template, 12, 1, "div", 173)(17, DashboardPage_ng_template_88_ng_template_17_Template, 6, 2, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor)(19, DashboardPage_ng_template_88_div_19_Template, 5, 2, "div", 174);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noAiActions_r17 = i0.ɵɵreference(18);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.assistantSubtitle());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.assistantInsights().scope, " scope");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Updated ", i0.ɵɵpipeBind2(13, 7, ctx_r1.assistantInsights().generatedAtUtc, "shortTime"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.assistantKpis());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantActions().length)("ngIfElse", noAiActions_r17);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.assistantUndoVisible);
} }
function DashboardPage_div_91_li_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r18 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(reason_r18);
} }
function DashboardPage_div_91_li_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r19 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entity_r19);
} }
function DashboardPage_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 211)(1, "div", 212)(2, "div")(3, "h3", 190);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 200);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 213)(10, "div", 214)(11, "span", 215);
    i0.ɵɵtext(12, "Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 216);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 214)(16, "span", 215);
    i0.ɵɵtext(17, "Priority rank");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 216);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 214)(21, "span", 215);
    i0.ɵɵtext(22, "Urgency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 216);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 214)(26, "span", 215);
    i0.ɵɵtext(27, "Owner scope");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 216);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 214)(31, "span", 215);
    i0.ɵɵtext(32, "Due window");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 216);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 214)(36, "span", 215);
    i0.ɵɵtext(37, "Action type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span", 216);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 214)(41, "span", 215);
    i0.ɵɵtext(42, "Entity type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 216);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 214)(46, "span", 215);
    i0.ɵɵtext(47, "Entity ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span", 216);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 217)(51, "span", 215);
    i0.ɵɵtext(52, "Why now");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "ul", 218);
    i0.ɵɵtemplate(54, DashboardPage_div_91_li_54_Template, 2, 1, "li", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "div", 217)(56, "span", 215);
    i0.ɵɵtext(57, "Entities in scope");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "ul", 218);
    i0.ɵɵtemplate(59, DashboardPage_div_91_li_59_Template, 2, 1, "li", 84);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 217)(61, "span", 215);
    i0.ɵɵtext(62, "Expected impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span", 216);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 217)(66, "span", 215);
    i0.ɵɵtext(67, "Review guidance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "span", 216);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const action_r20 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(action_r20.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r20.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.assistantRiskClass(action_r20.riskTier));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.assistantRiskLabel(action_r20.riskTier), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(action_r20.score);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.priority);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.assistantUrgencyLabel(action_r20.priority, action_r20.urgency));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.ownerScope);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.dueWindow);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.actionType || "N/A");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.entityType || "General");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.entityId || "N/A");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", action_r20.reasons);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", action_r20.entities);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.impactEstimate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(action_r20.reviewGuidance);
} }
function DashboardPage_ng_template_92_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 59);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_92_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAssistantDetailDialog()); });
    i0.ɵɵtext(1, " Close ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 219);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_92_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.runAssistantActionFromDetail()); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ((ctx_r1.assistantDetailAction == null ? null : ctx_r1.assistantDetailAction.riskTier) || "").toLowerCase() === "low" ? "execute" : "review")("disabled", !ctx_r1.assistantDetailAction);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ((ctx_r1.assistantDetailAction == null ? null : ctx_r1.assistantDetailAction.riskTier) || "").toLowerCase() === "low" ? "Execute" : "Review", " ");
} }
function DashboardPage_ng_template_98_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 210);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_98_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelAssistantReview()); });
    i0.ɵɵtext(1, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 210);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_98_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitAssistantReview(false)); });
    i0.ɵɵtext(3, " Reject ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 220);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_98_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitAssistantReview(true)); });
    i0.ɵɵtext(5, " Approve & Execute ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
} }
function DashboardPage_article_100_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DashboardPage_article_100_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 224);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const aiOrchestrationCard_r24 = i0.ɵɵreference(89);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", aiOrchestrationCard_r24);
} }
function DashboardPage_article_100_ng_container_3_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_3_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 234)(1, "span", 235);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 236);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 237);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r25 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r25.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", stage_r25.count, " deals");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(7, 3, stage_r25.value, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
} }
function DashboardPage_article_100_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 226);
    i0.ɵɵtext(4, " Pipeline by Stage ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "span", 169);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_3_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229)(11, "div", 230);
    i0.ɵɵelement(12, "p-chart", 231);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 232);
    i0.ɵɵtemplate(14, DashboardPage_article_100_ng_container_3_div_14_Template, 8, 8, "div", 233);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(8, 6, ctx_r1.totalPipelineValue(), ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(11, _c9, cardId_r26));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", ctx_r1.pipelineChartData)("options", ctx_r1.pipelineChartOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.pipelineValue());
} }
function DashboardPage_article_100_ng_container_4_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 238);
    i0.ɵɵtext(4, " Truth Metrics ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "span", 169);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "percent");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_4_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229)(11, "div", 239)(12, "div", 240)(13, "span", 241);
    i0.ɵɵtext(14, "Truth Coverage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 242);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "percent");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 240)(19, "span", 241);
    i0.ɵɵtext(20, "Confidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 242);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 240)(24, "span", 241);
    i0.ɵɵtext(25, "Time-to-Truth");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 242);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 243);
    i0.ɵɵtext(30, " Based on current lead qualification signals. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 8, ctx_r1.summary().avgTruthCoverage, "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(17, _c9, cardId_r26));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 11, ctx_r1.summary().avgTruthCoverage, "1.0-0"));
    i0.ɵɵadvance(5);
    i0.ɵɵclassMap(ctx_r1.confidenceTone(ctx_r1.summary().avgQualificationConfidence));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.confidenceLabel(ctx_r1.summary().avgQualificationConfidence), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(28, 14, ctx_r1.summary().avgTimeToTruthDays, "1.0-1"), "d");
} }
function DashboardPage_article_100_ng_container_5_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_5_div_13_div_7_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 258);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r28 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", item_r28.severity);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", item_r28.label, " \u00B7 ", item_r28.count, " ");
} }
function DashboardPage_article_100_ng_container_5_div_13_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 256);
    i0.ɵɵtemplate(1, DashboardPage_article_100_ng_container_5_div_13_div_7_span_1_Template, 2, 3, "span", 257);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.riskIntelligenceSummary());
} }
function DashboardPage_article_100_ng_container_5_div_13_article_9_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 259)(1, "div", 260)(2, "span", 261);
    i0.ɵɵelement(3, "i", 120);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 262)(6, "div", 263)(7, "div", 264)(8, "h4");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 265);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 266)(13, "span")(14, "strong");
    i0.ɵɵtext(15, "Why:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span")(18, "strong");
    i0.ɵɵtext(19, "Recommended action:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 267)(22, "button", 268);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_5_div_13_article_9_Template_button_click_22_listener() { const item_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openRiskIntelligence(item_r30)); });
    i0.ɵɵelement(23, "i", 269);
    i0.ɵɵtext(24, " Open workspace ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r30 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngClass", ctx_r1.riskIntelligenceSeverityClass(item_r30.severity));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.riskIntelligenceSeverityClass(item_r30.severity));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.riskIntelligenceSeverityLabel(item_r30.severity), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r30.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r30.count, " active signals");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", item_r30.impact);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", item_r30.recommendedAction);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.riskIntelligenceSeverityClass(item_r30.severity));
} }
function DashboardPage_article_100_ng_container_5_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 249)(1, "div", 250)(2, "div", 251)(3, "span", 252);
    i0.ɵɵtext(4, "Early warning");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Use this card to understand what is at risk, why it is risky, and where managers or owners should act first.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, DashboardPage_article_100_ng_container_5_div_13_div_7_Template, 2, 1, "div", 253);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 254);
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_5_div_13_article_9_Template, 25, 8, "article", 255);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r1.riskIntelligenceSummary().length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.riskIntelligenceItems());
} }
function DashboardPage_article_100_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "div", 244)(3, "h3", 190);
    i0.ɵɵelement(4, "i", 245);
    i0.ɵɵtext(5, " Risk Intelligence ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 246);
    i0.ɵɵtext(7, "Top CRM risks ranked by urgency, with owner context and the next recommended action.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 227)(9, "span", 169);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_5_ng_container_11_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 247);
    i0.ɵɵtemplate(13, DashboardPage_article_100_ng_container_5_div_13_Template, 10, 2, "div", 248);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyRiskFlags_r31 = i0.ɵɵreference(114);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.summary().riskRegisterCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.riskIntelligenceItems().length)("ngIfElse", emptyRiskFlags_r31);
} }
function DashboardPage_article_100_ng_container_6_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_6_div_13_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 274)(1, "div", 275)(2, "div", 276)(3, "span", 277);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 278);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 279);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 280);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 281);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r32 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", item_r32.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r32.eyebrow);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", item_r32.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", item_r32.count, " ", item_r32.countLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r32.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r32.detail);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Outcome: ", item_r32.objective);
} }
function DashboardPage_article_100_ng_container_6_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 271);
    i0.ɵɵtemplate(1, DashboardPage_article_100_ng_container_6_div_13_div_1_Template, 13, 8, "div", 272);
    i0.ɵɵelementStart(2, "div", 273);
    i0.ɵɵtext(3, " Use this card for operating sequence. Diagnostics explain the blockers, and AI Orchestration drives the next recommended actions. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.executionGuideItems());
} }
function DashboardPage_article_100_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "div", 244)(3, "h3", 190);
    i0.ɵɵelement(4, "i", 49);
    i0.ɵɵtext(5, " Operating Priorities ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 246);
    i0.ɵɵtext(7, "Recommended focus order for the current book of business, not another count summary.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 227)(9, "span", 169);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_6_ng_container_11_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 229);
    i0.ɵɵtemplate(13, DashboardPage_article_100_ng_container_6_div_13_Template, 4, 1, "div", 270);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyExecutionGuide_r33 = i0.ɵɵreference(116);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.executionGuideItems().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.executionGuideItems().length)("ngIfElse", emptyExecutionGuide_r33);
} }
function DashboardPage_article_100_ng_container_7_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_7_div_10_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 290);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const signal_r35 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Contract ends ", i0.ɵɵpipeBind2(2, 1, signal_r35.contractEndDateUtc, "MMM d, yyyy"), " ");
} }
function DashboardPage_article_100_ng_container_7_div_10_div_1_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 295);
    i0.ɵɵtext(1, "Expansion created");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_7_div_10_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 287)(1, "div", 288)(2, "div", 289);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 290);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, DashboardPage_article_100_ng_container_7_div_10_div_1_div_7_Template, 3, 4, "div", 291);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 292)(9, "button", 293);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_7_div_10_div_1_Template_button_click_9_listener() { const signal_r35 = i0.ɵɵrestoreView(_r34).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.createExpansionOpportunity(signal_r35)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, DashboardPage_article_100_ng_container_7_div_10_div_1_span_10_Template, 2, 0, "span", 294);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const signal_r35 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(signal_r35.accountName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", signal_r35.opportunityName, " \u00B7 ", signal_r35.signalCount, " signals \u00B7 Last ", i0.ɵɵpipeBind2(6, 7, signal_r35.lastSignalAtUtc, "MMM d"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", signal_r35.contractEndDateUtc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", signal_r35.hasExpansionOpportunity || ctx_r1.isExpansionSubmitting(signal_r35));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", signal_r35.hasExpansionOpportunity);
} }
function DashboardPage_article_100_ng_container_7_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296);
    i0.ɵɵtext(1, "No expansion signals yet.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_7_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 284);
    i0.ɵɵtemplate(1, DashboardPage_article_100_ng_container_7_div_10_div_1_Template, 11, 10, "div", 285)(2, DashboardPage_article_100_ng_container_7_div_10_div_2_Template, 2, 0, "div", 286);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.expansionSignals());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.expansionSignals().length);
} }
function DashboardPage_article_100_ng_container_7_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296);
    i0.ɵɵtext(1, "Loading expansion signals...");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 282);
    i0.ɵɵtext(4, " Expansion Signals ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "span", 169);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, DashboardPage_article_100_ng_container_7_ng_container_8_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 229);
    i0.ɵɵtemplate(10, DashboardPage_article_100_ng_container_7_div_10_Template, 3, 2, "div", 283)(11, DashboardPage_article_100_ng_container_7_ng_template_11_Template, 2, 0, "ng-template", null, 17, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const expansionLoadingTpl_r36 = i0.ɵɵreference(12);
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.expansionSignalsCount());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.expansionLoading())("ngIfElse", expansionLoadingTpl_r36);
} }
function DashboardPage_article_100_ng_container_8_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 323)(1, "div", 312);
    i0.ɵɵelement(2, "i", 324);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 313)(4, "span", 314);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 315);
    i0.ɵɵtext(7, "Calibration sample");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.summary().confidenceCalibrationSample);
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_57_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 94);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_8_ng_container_11_div_57_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r37); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.openCostBreakdownDialog()); });
    i0.ɵɵtext(1, " View all ");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_57_div_5_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 336);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r38 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", factor_r38.label, ": ", i0.ɵɵpipeBind4(2, 2, factor_r38.contribution, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_57_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 329)(1, "div", 330)(2, "div")(3, "div", 331);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 332);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 333);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 334);
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_8_ng_container_11_div_57_div_5_span_11_Template, 3, 7, "span", 335);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const deal_r39 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(deal_r39.opportunityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", deal_r39.accountName, " \u2022 ", deal_r39.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(9, 5, deal_r39.costOfNotKnowingValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", deal_r39.topFactors);
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 325)(1, "div", 326)(2, "h4");
    i0.ɵɵtext(3, "Top Cost Drivers");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, DashboardPage_article_100_ng_container_8_ng_container_11_div_57_button_4_Template, 2, 0, "button", 327);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, DashboardPage_article_100_ng_container_8_ng_container_11_div_57_div_5_Template, 12, 10, "div", 328);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.summary().costOfNotKnowingBreakdown.length > 5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.topCostBreakdown());
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 337)(1, "div", 338)(2, "h4");
    i0.ɵɵtext(3, "Exposure Trend");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 339);
    i0.ɵɵtext(5, "Last 8 weeks");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 340);
    i0.ɵɵelement(7, "p-chart", 341);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("data", ctx_r1.costTrendChartData)("options", ctx_r1.costTrendChartOptions);
} }
function DashboardPage_article_100_ng_container_8_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 297)(2, "div", 298)(3, "span", 299);
    i0.ɵɵtext(4, "Weighted Pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 300);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 301);
    i0.ɵɵelement(9, "i", 141);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "currency");
    i0.ɵɵelementStart(12, "span", 302);
    i0.ɵɵtext(13, "vs raw pipeline");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 303);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(15, "svg", 304);
    i0.ɵɵelement(16, "circle", 305)(17, "circle", 306);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(18, "div", 307)(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "retained");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(23, "div", 308)(24, "span");
    i0.ɵɵtext(25, "Raw pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 309);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 310)(30, "div", 311)(31, "div", 312);
    i0.ɵɵelement(32, "i", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 313)(34, "span", 314);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 315);
    i0.ɵɵtext(38, "Cost of Not Knowing");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 316)(40, "div", 312);
    i0.ɵɵelement(41, "i", 317);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 313)(43, "span", 314);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 315);
    i0.ɵɵtext(46, "Low-confidence deals");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "div", 318)(48, "div", 312);
    i0.ɵɵelement(49, "i", 319);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 313)(51, "span", 314);
    i0.ɵɵtext(52);
    i0.ɵɵpipe(53, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "span", 315);
    i0.ɵɵtext(55, "Calibration score");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(56, DashboardPage_article_100_ng_container_8_ng_container_11_div_56_Template, 8, 1, "div", 320);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(57, DashboardPage_article_100_ng_container_8_ng_container_11_div_57_Template, 6, 2, "div", 321)(58, DashboardPage_article_100_ng_container_8_ng_container_11_div_58_Template, 8, 2, "div", 322);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(7, 26, ctx_r1.summary().confidenceWeightedPipelineValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("negative", ctx_r1.weightedPipelineDelta() < 0);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-arrow-down", ctx_r1.weightedPipelineDelta() < 0)("pi-arrow-up", ctx_r1.weightedPipelineDelta() >= 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(11, 31, ctx_r1.weightedPipelineDelta(), ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(7);
    i0.ɵɵclassProp("excellent", ctx_r1.pipelineRetentionPct() >= 80)("good", ctx_r1.pipelineRetentionPct() >= 60 && ctx_r1.pipelineRetentionPct() < 80)("fair", ctx_r1.pipelineRetentionPct() >= 40 && ctx_r1.pipelineRetentionPct() < 60)("poor", ctx_r1.pipelineRetentionPct() < 40);
    i0.ɵɵattribute("stroke-dasharray", ctx_r1.pipelineRetentionPct() / 100 * 213.6 + " 213.6");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.pipelineRetentionPct(), "%");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(28, 36, ctx_r1.totalPipelineValue(), ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(36, 41, ctx_r1.summary().costOfNotKnowingValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.summary().costOfNotKnowingDeals);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", "cf-metric--" + ctx_r1.calibrationLevel());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(53, 46, ctx_r1.summary().confidenceCalibrationScore, "1.0-0"), "%");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.summary().confidenceCalibrationSample > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.summary().costOfNotKnowingBreakdown.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.costTrendChartData);
} }
function DashboardPage_article_100_ng_container_8_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No forecast data yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Confidence forecast will appear once opportunities with confidence scores are in your pipeline.");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_article_100_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "div", 244)(3, "h3", 190);
    i0.ɵɵelement(4, "i", 134);
    i0.ɵɵtext(5, " Confidence Forecast ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 246);
    i0.ɵɵtext(7, "Pipeline value after confidence weighting & uncertainty exposure.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 227);
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_8_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229);
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_8_ng_container_11_Template, 59, 49, "ng-container", 208)(12, DashboardPage_article_100_ng_container_8_ng_template_12_Template, 7, 0, "ng-template", null, 18, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noConfidenceData_r40 = i0.ɵɵreference(13);
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.hasConfidenceForecastData())("ngIfElse", noConfidenceData_r40);
} }
function DashboardPage_article_100_ng_container_9_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_9_ng_container_11_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 345)(1, "div", 346)(2, "span", 347);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 348);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 349);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 350);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const scenario_r41 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(scenario_r41.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", scenario_r41.dealCount, " deals");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(8, 8, scenario_r41.value, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("negative", scenario_r41.deltaFromBase < 0)("positive", scenario_r41.deltaFromBase > 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(11, 13, scenario_r41.deltaFromBase, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
} }
function DashboardPage_article_100_ng_container_9_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 343);
    i0.ɵɵtemplate(2, DashboardPage_article_100_ng_container_9_ng_container_11_div_2_Template, 12, 18, "div", 344);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.summary().forecastScenarios);
} }
function DashboardPage_article_100_ng_container_9_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296);
    i0.ɵɵtext(1, "No scenarios available.");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "div", 244)(3, "h3", 190);
    i0.ɵɵelement(4, "i", 60);
    i0.ɵɵtext(5, " Forecast Scenarios ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 246);
    i0.ɵɵtext(7, "Modeled upside, base, and downside views across the open book.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 227);
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_9_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229);
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_9_ng_container_11_Template, 3, 1, "ng-container", 208)(12, DashboardPage_article_100_ng_container_9_ng_template_12_Template, 2, 0, "ng-template", null, 19, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noScenarios_r42 = i0.ɵɵreference(13);
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.summary().forecastScenarios.length)("ngIfElse", noScenarios_r42);
} }
function DashboardPage_article_100_ng_container_10_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_10_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 356)(1, "div", 357)(2, "span");
    i0.ɵɵtext(3, "Quota");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 357)(8, "span");
    i0.ɵɵtext(9, "Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const quota_r43 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(6, 2, quota_r43, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r1.myQuotaProgress(), "%");
} }
function DashboardPage_article_100_ng_container_10_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 354);
    i0.ɵɵtext(1, "Quota: Not set");
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "div", 244)(3, "h3", 190);
    i0.ɵɵelement(4, "i", 166);
    i0.ɵɵtext(5, " My Forecast ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 246);
    i0.ɵɵtext(7, "Seller-owned weighted view against individual quota, separate from team forecast.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 227);
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_10_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229)(11, "div", 351);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 352)(15, "span");
    i0.ɵɵtext(16, "Weighted pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 353);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 354);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(23, DashboardPage_article_100_ng_container_10_div_23_Template, 12, 7, "div", 355)(24, DashboardPage_article_100_ng_container_10_ng_template_24_Template, 2, 0, "ng-template", null, 20, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noQuota_r44 = i0.ɵɵreference(25);
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(24, _c9, cardId_r26));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(13, 9, ctx_r1.summary().myConfidenceWeightedPipelineValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("negative", ctx_r1.summary().myConfidenceWeightedPipelineValue - ctx_r1.summary().myPipelineValueTotal < 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(19, 14, ctx_r1.summary().myConfidenceWeightedPipelineValue - ctx_r1.summary().myPipelineValueTotal, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Raw pipeline: ", i0.ɵɵpipeBind4(22, 19, ctx_r1.summary().myPipelineValueTotal, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.myQuotaTarget())("ngIfElse", noQuota_r44);
} }
function DashboardPage_article_100_ng_container_11_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_11_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 362)(1, "div", 363);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 364);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 365)(6, "div", 366);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 367)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 368);
    i0.ɵɵtext(12, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 369);
    i0.ɵɵelement(16, "span", 370);
    i0.ɵɵelementStart(17, "span", 371);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(19, "button", 372);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const account_r45 = ctx.$implicit;
    const i_r46 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r46 + 1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("lead", account_r45.status === "Lead")("prospect", account_r45.status === "Prospect")("customer", account_r45.status === "Customer");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", account_r45.name.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(account_r45.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(account_r45.company);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(account_r45.owner);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("lead", account_r45.status === "Lead")("prospect", account_r45.status === "Prospect")("customer", account_r45.status === "Customer");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(account_r45.status);
} }
function DashboardPage_article_100_ng_container_11_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 229)(1, "div", 360);
    i0.ɵɵtemplate(2, DashboardPage_article_100_ng_container_11_div_10_div_2_Template, 20, 18, "div", 361);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.recentAccounts());
} }
function DashboardPage_article_100_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 50);
    i0.ɵɵtext(4, " Recent Accounts ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "button", 358);
    i0.ɵɵtext(7, " View All ");
    i0.ɵɵelement(8, "i", 269);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_11_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, DashboardPage_article_100_ng_container_11_div_10_Template, 3, 1, "div", 359);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyAccounts_r47 = i0.ɵɵreference(108);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, cardId_r26));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.recentAccounts().length)("ngIfElse", emptyAccounts_r47);
} }
function DashboardPage_article_100_ng_container_12_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 375);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.managerReviewQueue().length, " needs review ");
} }
function DashboardPage_article_100_ng_container_12_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_12_div_8_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 382)(1, "span", 383);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 384);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stat_r48 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", stat_r48.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r48.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r48.label);
} }
function DashboardPage_article_100_ng_container_12_div_8_div_3_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 389);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const gap_r49 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", gap_r49.label, " \u00B7 ", gap_r49.count, " ");
} }
function DashboardPage_article_100_ng_container_12_div_8_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 385)(1, "div", 386);
    i0.ɵɵtext(2, "Top Truth Gaps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 387);
    i0.ɵɵtemplate(4, DashboardPage_article_100_ng_container_12_div_8_div_3_span_4_Template, 2, 2, "span", 388);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.managerTruthGaps());
} }
function DashboardPage_article_100_ng_container_12_div_8_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 390)(1, "div", 386);
    i0.ɵɵtext(2, "Top Truth Gaps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 391);
    i0.ɵɵtext(4, "No gaps flagged");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_article_100_ng_container_12_div_8_div_7_span_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const deal_r51 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Next: ", i0.ɵɵpipeBind2(2, 1, ctx_r1.asLocalDate(deal_r51.nextStepDueAtUtc), "MMM d"));
} }
function DashboardPage_article_100_ng_container_12_div_8_div_7_span_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const deal_r51 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Close: ", i0.ɵɵpipeBind2(2, 1, ctx_r1.asLocalDate(deal_r51.expectedCloseDate), "MMM d"));
} }
function DashboardPage_article_100_ng_container_12_div_8_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 392)(1, "div", 393)(2, "div", 394);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 395)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 368);
    i0.ɵɵtext(8, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 368);
    i0.ɵɵtext(12, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 396);
    i0.ɵɵelement(16, "i", 317);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 397)(19, "div", 398);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 399)(23, "span");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 400);
    i0.ɵɵtemplate(28, DashboardPage_article_100_ng_container_12_div_8_div_7_span_28_Template, 3, 4, "span", 401)(29, DashboardPage_article_100_ng_container_12_div_8_div_7_span_29_Template, 3, 4, "span", 401);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 402);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_12_div_8_div_7_Template_button_click_30_listener() { const deal_r51 = i0.ɵɵrestoreView(_r50).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openCoaching(deal_r51)); });
    i0.ɵɵtext(31, " Coach ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const deal_r51 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(deal_r51.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(deal_r51.accountName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(deal_r51.stage);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(deal_r51.ownerName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", deal_r51.reason, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(21, 10, deal_r51.amount, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Truth: ", ctx_r1.formatTruthCoverage(deal_r51.truthCoverage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("TtT: ", ctx_r1.formatTimeToTruth(deal_r51.timeToTruthDays));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", deal_r51.nextStepDueAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", deal_r51.expectedCloseDate);
} }
function DashboardPage_article_100_ng_container_12_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 376)(1, "div", 377);
    i0.ɵɵtemplate(2, DashboardPage_article_100_ng_container_12_div_8_div_2_Template, 5, 3, "div", 378);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DashboardPage_article_100_ng_container_12_div_8_div_3_Template, 5, 1, "div", 379)(4, DashboardPage_article_100_ng_container_12_div_8_ng_template_4_Template, 5, 0, "ng-template", null, 21, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(6, "div", 380);
    i0.ɵɵtemplate(7, DashboardPage_article_100_ng_container_12_div_8_div_7_Template, 32, 15, "div", 381);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const noTruthGaps_r52 = i0.ɵɵreference(5);
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.managerHealthStats());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.managerTruthGaps().length)("ngIfElse", noTruthGaps_r52);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.managerReviewQueue());
} }
function DashboardPage_article_100_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 245);
    i0.ɵɵtext(4, " Pipeline Health ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_article_100_ng_container_12_span_6_Template, 2, 1, "span", 373)(7, DashboardPage_article_100_ng_container_12_ng_container_7_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, DashboardPage_article_100_ng_container_12_div_8_Template, 8, 4, "div", 374);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyManagerHealth_r53 = i0.ɵɵreference(110);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.managerReviewQueue().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c9, cardId_r26));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.managerReviewQueue().length)("ngIfElse", emptyManagerHealth_r53);
} }
function DashboardPage_article_100_ng_container_13_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_13_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 408)(1, "div", 409);
    i0.ɵɵelement(2, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 410);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 411);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r54 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getActivityColor(activity_r54.type));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getActivityIcon(activity_r54.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", activity_r54.type, "s");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(activity_r54.count);
} }
function DashboardPage_article_100_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 403);
    i0.ɵɵtext(4, " Activity Mix ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_article_100_ng_container_13_ng_container_6_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 229)(8, "div", 404);
    i0.ɵɵelement(9, "p-chart", 405);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 406);
    i0.ɵɵtemplate(11, DashboardPage_article_100_ng_container_13_div_11_Template, 7, 6, "div", 407);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c9, cardId_r26));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", ctx_r1.activityDonutData)("options", ctx_r1.activityDonutOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.activityBreakdown());
} }
function DashboardPage_article_100_ng_container_14_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 412);
    i0.ɵɵtext(4, " Conversion Trend ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "span", 413);
    i0.ɵɵelement(7, "i", 414);
    i0.ɵɵtext(8, " +12% ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_14_ng_container_9_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 229)(11, "div", 340);
    i0.ɵɵelement(12, "p-chart", 415);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 416)(14, "div", 417)(15, "span", 418);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 235);
    i0.ɵɵtext(18, "Win Rate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 417)(20, "span", 236);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 235);
    i0.ɵɵtext(23, "Avg Cycle");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(6, _c9, cardId_r26));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", ctx_r1.conversionChartData)("options", ctx_r1.conversionChartOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.summary().winRate, "%");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.summary().avgSalesCycle, "d");
} }
function DashboardPage_article_100_ng_container_15_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_15_div_9_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 431);
    i0.ɵɵelement(1, "i", 432);
    i0.ɵɵelementEnd();
} }
function DashboardPage_article_100_ng_container_15_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 422)(1, "div", 423);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 424);
    i0.ɵɵelement(4, "img", 425);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 426)(6, "div", 427);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 428)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 368);
    i0.ɵɵtext(12, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 429);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "currency");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(16, DashboardPage_article_100_ng_container_15_div_9_div_16_Template, 2, 0, "div", 430);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const performer_r55 = ctx.$implicit;
    const i_r56 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("gold", i_r56 === 0)("silver", i_r56 === 1)("bronze", i_r56 === 2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i_r56 + 1, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", performer_r55.avatar || "https://i.pravatar.cc/150?u=" + performer_r55.name, i0.ɵɵsanitizeUrl)("alt", performer_r55.name + " avatar")("title", performer_r55.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(performer_r55.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", performer_r55.deals, " deals");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(15, 14, performer_r55.revenue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", i_r56 === 0);
} }
function DashboardPage_article_100_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 419);
    i0.ɵɵtext(4, " Top Performers ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_article_100_ng_container_15_ng_container_6_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 229)(8, "div", 420);
    i0.ɵɵtemplate(9, DashboardPage_article_100_ng_container_15_div_9_Template, 17, 19, "div", 421);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c9, cardId_r26));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.topPerformers());
} }
function DashboardPage_article_100_ng_container_16_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_16_div_43_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 447)(1, "div", 448);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 449)(4, "div", 450);
    i0.ɵɵelement(5, "img", 451);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 452);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 453)(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 454);
    i0.ɵɵtext(12, "won");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 453)(14, "strong", 429);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 453)(18, "strong", 455);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 453)(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 453)(24, "strong", 456);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const rep_r57 = ctx.$implicit;
    const i_r58 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("gold", i_r58 === 0)("silver", i_r58 === 1)("bronze", i_r58 === 2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i_r58 + 1, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", rep_r57.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (rep_r57.userId || rep_r57.name), i0.ɵɵsanitizeUrl)("alt", rep_r57.name + " avatar")("title", rep_r57.name + " avatar");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rep_r57.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rep_r57.dealsClosed);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(16, 17, rep_r57.revenue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", rep_r57.winRate >= 50 ? "good" : rep_r57.winRate >= 25 ? "okay" : "low");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", rep_r57.winRate, "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", rep_r57.avgCycleDays, "d");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rep_r57.activitiesCount);
} }
function DashboardPage_article_100_ng_container_16_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 441)(1, "div", 442)(2, "div", 443);
    i0.ɵɵtext(3, "#");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 444);
    i0.ɵɵtext(5, "Rep");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 445);
    i0.ɵɵtext(7, "Deals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 445);
    i0.ɵɵtext(9, "Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 445);
    i0.ɵɵtext(11, "Win %");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 445);
    i0.ɵɵtext(13, "Avg Cycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 445);
    i0.ɵɵtext(15, "Activities");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, DashboardPage_article_100_ng_container_16_div_43_div_16_Template, 26, 22, "div", 446);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r1.teamPerformanceReps());
} }
function DashboardPage_article_100_ng_container_16_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵelement(1, "i", 197);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No closed deals this period");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_article_100_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 197);
    i0.ɵɵtext(4, " Sales Team Performance ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_article_100_ng_container_16_ng_container_6_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 229)(8, "div", 433)(9, "div", 434)(10, "div", 435)(11, "span", 436);
    i0.ɵɵtext(12, "Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong", 437);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 438);
    i0.ɵɵelement(17, "i", 203);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 435)(20, "span", 436);
    i0.ɵɵtext(21, "Deals Won");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong", 437);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 438);
    i0.ɵɵelement(25, "i", 203);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 435)(28, "span", 436);
    i0.ɵɵtext(29, "Win Rate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "strong", 437);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 438);
    i0.ɵɵelement(33, "i", 203);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 435)(36, "span", 436);
    i0.ɵɵtext(37, "Avg Cycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "strong", 437);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span", 438);
    i0.ɵɵelement(41, "i", 203);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(43, DashboardPage_article_100_ng_container_16_div_43_Template, 17, 1, "div", 439)(44, DashboardPage_article_100_ng_container_16_div_44_Template, 4, 0, "div", 440);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(25, _c9, cardId_r26));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(15, 20, ctx_r1.teamPerformance().teamRevenue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().teamRevenue, ctx_r1.teamPerformance().teamRevenuePrevious) >= 0 ? "positive" : "negative");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().teamRevenue, ctx_r1.teamPerformance().teamRevenuePrevious) >= 0 ? "pi-arrow-up" : "pi-arrow-down");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().teamRevenue, ctx_r1.teamPerformance().teamRevenuePrevious), "% ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.teamPerformance().dealsClosed);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().dealsClosed, ctx_r1.teamPerformance().dealsClosedPrevious) >= 0 ? "positive" : "negative");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().dealsClosed, ctx_r1.teamPerformance().dealsClosedPrevious) >= 0 ? "pi-arrow-up" : "pi-arrow-down");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().dealsClosed, ctx_r1.teamPerformance().dealsClosedPrevious), "% ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.teamPerformance().winRate, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().winRate, ctx_r1.teamPerformance().winRatePrevious) >= 0 ? "positive" : "negative");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().winRate, ctx_r1.teamPerformance().winRatePrevious) >= 0 ? "pi-arrow-up" : "pi-arrow-down");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().winRate, ctx_r1.teamPerformance().winRatePrevious), "% ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.teamPerformance().avgCycleDays, "d");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().avgCycleDays, ctx_r1.teamPerformance().avgCycleDaysPrevious) <= 0 ? "positive" : "negative");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().avgCycleDays, ctx_r1.teamPerformance().avgCycleDaysPrevious) <= 0 ? "pi-arrow-up" : "pi-arrow-down");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.teamPerfDelta(ctx_r1.teamPerformance().avgCycleDays, ctx_r1.teamPerformance().avgCycleDaysPrevious), "% ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.teamPerformanceReps().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.teamPerformanceReps().length === 0);
} }
function DashboardPage_article_100_ng_container_17_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 487)(1, "span", 488);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " items ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.priorityStreamItems().length);
} }
function DashboardPage_article_100_ng_container_17_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_17_div_79_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 504);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const meta_r60 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(meta_r60);
} }
function DashboardPage_article_100_ng_container_17_div_79_div_1_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 505);
    i0.ɵɵelement(2, "i", 506);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 507);
    i0.ɵɵelement(4, "i", 508);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 509);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_div_79_div_1_ng_container_18_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r61); const item_r62 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.onPriorityComplete(item_r62)); });
    i0.ɵɵelement(6, "i", 510);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "Done");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function DashboardPage_article_100_ng_container_17_div_79_div_1_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r63 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 511);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_div_79_div_1_ng_template_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r63); const item_r62 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.onPriorityComplete(item_r62)); });
    i0.ɵɵelement(1, "i", 512);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Review");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_article_100_ng_container_17_div_79_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 491);
    i0.ɵɵelement(1, "div", 492);
    i0.ɵɵelementStart(2, "div", 493)(3, "div", 494);
    i0.ɵɵelement(4, "i", 203);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 495)(6, "div", 496)(7, "span", 497);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 498);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 499);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 500);
    i0.ɵɵtemplate(14, DashboardPage_article_100_ng_container_17_div_79_div_1_span_14_Template, 2, 1, "span", 501);
    i0.ɵɵelementStart(15, "span", 502);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 503);
    i0.ɵɵtemplate(18, DashboardPage_article_100_ng_container_17_div_79_div_1_ng_container_18_Template, 9, 0, "ng-container", 208)(19, DashboardPage_article_100_ng_container_17_div_79_div_1_ng_template_19_Template, 4, 0, "ng-template", null, 22, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r62 = ctx.$implicit;
    const i_r64 = ctx.index;
    const aqDecisionAction_r65 = i0.ɵɵreference(20);
    i0.ɵɵstyleProp("animation-delay", i_r64 * 40 + "ms");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction5(15, _c10, item_r62.dueClass === "due-overdue" || item_r62.type === "deal", item_r62.dueClass === "due-today", item_r62.type === "decision", item_r62.type === "lead", item_r62.dueClass !== "due-overdue" && item_r62.dueClass !== "due-today" && item_r62.type === "task"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction5(21, _c11, item_r62.dueClass === "due-overdue" || item_r62.type === "deal", item_r62.dueClass === "due-today" && item_r62.type !== "deal", item_r62.type === "decision", item_r62.type === "lead", item_r62.type === "task" && item_r62.dueClass !== "due-overdue" && item_r62.dueClass !== "due-today"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction4(27, _c12, item_r62.type === "deal" || item_r62.dueClass === "due-overdue", item_r62.type === "task" && item_r62.dueClass !== "due-overdue", item_r62.type === "lead", item_r62.type === "decision"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r62.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", item_r62.dueClass);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r62.dueColumn);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r62.subtitle);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", item_r62.meta);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-item__tag--overdue", item_r62.type === "deal");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r62.status);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", item_r62.type !== "decision")("ngIfElse", aqDecisionAction_r65);
} }
function DashboardPage_article_100_ng_container_17_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 489);
    i0.ɵɵtemplate(1, DashboardPage_article_100_ng_container_17_div_79_div_1_Template, 21, 32, "div", 490);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredPriorityStreamItems());
} }
function DashboardPage_article_100_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 458)(2, "div", 459)(3, "div", 460)(4, "div", 461);
    i0.ɵɵelement(5, "i", 166);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 462)(7, "h3", 463)(8, "span", 464);
    i0.ɵɵtext(9, "Action");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " Queue ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 465);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 227);
    i0.ɵɵtemplate(14, DashboardPage_article_100_ng_container_17_span_14_Template, 4, 1, "span", 466)(15, DashboardPage_article_100_ng_container_17_ng_container_15_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 467)(17, "button", 468);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("overdue")); });
    i0.ɵɵelement(18, "span", 469);
    i0.ɵɵelementStart(19, "span", 470);
    i0.ɵɵtext(20, "Overdue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 471);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "button", 472);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("today")); });
    i0.ɵɵelement(24, "span", 469);
    i0.ɵɵelementStart(25, "span", 470);
    i0.ɵɵtext(26, "Due Today");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 471);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "button", 473);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("decisions")); });
    i0.ɵɵelement(30, "span", 469);
    i0.ɵɵelementStart(31, "span", 470);
    i0.ɵɵtext(32, "Decisions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 471);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 474);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("new-leads")); });
    i0.ɵɵelement(36, "span", 469);
    i0.ɵɵelementStart(37, "span", 470);
    i0.ɵɵtext(38, "New Leads");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 471);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "button", 475);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("at-risk")); });
    i0.ɵɵelement(42, "span", 469);
    i0.ɵɵelementStart(43, "span", 470);
    i0.ɵɵtext(44, "At-Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 471);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "button", 476);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("no-next-step")); });
    i0.ɵɵelement(48, "span", 469);
    i0.ɵɵelementStart(49, "span", 470);
    i0.ɵɵtext(50, "No Next Step");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "span", 471);
    i0.ɵɵtext(52);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "div", 477)(54, "div", 478)(55, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("all")); });
    i0.ɵɵtext(56, " All ");
    i0.ɵɵelementStart(57, "span", 480);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("overdue")); });
    i0.ɵɵtext(60, " Overdue ");
    i0.ɵɵelementStart(61, "span", 481);
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_63_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("today")); });
    i0.ɵɵtext(64, " Today ");
    i0.ɵɵelementStart(65, "span", 482);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(67, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("decisions")); });
    i0.ɵɵtext(68, " Decisions ");
    i0.ɵɵelementStart(69, "span", 483);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(71, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_71_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("new-leads")); });
    i0.ɵɵtext(72, " Leads ");
    i0.ɵɵelementStart(73, "span", 484);
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "button", 479);
    i0.ɵɵlistener("click", function DashboardPage_article_100_ng_container_17_Template_button_click_75_listener() { i0.ɵɵrestoreView(_r59); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPriorityFilter("at-risk")); });
    i0.ɵɵtext(76, " At-Risk ");
    i0.ɵɵelementStart(77, "span", 485);
    i0.ɵɵtext(78);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(79, DashboardPage_article_100_ng_container_17_div_79_Template, 2, 1, "div", 486);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyMyTasks_r66 = i0.ɵɵreference(106);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r1.actionQueueSubtitle());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.priorityStreamItems().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(42, _c9, cardId_r26));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "overdue");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().overdue);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "today");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().today);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "decisions");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().decisions);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "new-leads");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().newLeads);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "at-risk");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().atRisk);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-chip--active", ctx_r1.priorityFilter() === "no-next-step");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().noNextStep);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "all");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.priorityStreamItems().length);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "overdue");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().overdue);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "today");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().today);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "decisions");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().decisions);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "new-leads");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().newLeads);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("aq-tabs__btn--active", ctx_r1.priorityFilter() === "at-risk");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.prioritySummary().atRisk);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.filteredPriorityStreamItems().length)("ngIfElse", emptyMyTasks_r66);
} }
function DashboardPage_article_100_ng_container_18_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_18_div_14_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 527);
} }
function DashboardPage_article_100_ng_container_18_div_14_div_2_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 528);
    i0.ɵɵelement(1, "i", 529);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r67 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", activity_r67.relatedEntityName, " ");
} }
function DashboardPage_article_100_ng_container_18_div_14_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 518)(1, "div", 519);
    i0.ɵɵelement(2, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DashboardPage_article_100_ng_container_18_div_14_div_2_div_3_Template, 1, 0, "div", 520);
    i0.ɵɵelementStart(4, "div", 521)(5, "div", 522)(6, "span", 523);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 524);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 525);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, DashboardPage_article_100_ng_container_18_div_14_div_2_div_13_Template, 3, 1, "div", 526);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r67 = ctx.$implicit;
    const last_r68 = ctx.last;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("overdue", activity_r67.status === "Overdue");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("call", activity_r67.type === "Call")("email", activity_r67.type === "Email")("meeting", activity_r67.type === "Meeting")("task", activity_r67.type === "Task");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-phone", activity_r67.type === "Call")("pi-envelope", activity_r67.type === "Email")("pi-video", activity_r67.type === "Meeting")("pi-check-square", activity_r67.type === "Task");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !last_r68);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(activity_r67.type);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("overdue", activity_r67.status === "Overdue");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(10, 25, ctx_r1.asLocalDate(activity_r67.dueDateUtc), "MMM d, h:mm a"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r67.subject);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r67.relatedEntityName);
} }
function DashboardPage_article_100_ng_container_18_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 229)(1, "div", 516);
    i0.ɵɵtemplate(2, DashboardPage_article_100_ng_container_18_div_14_div_2_Template, 14, 28, "div", 517);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.upcomingActivities());
} }
function DashboardPage_article_100_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 198);
    i0.ɵɵtext(4, " Activity Timeline ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "div", 513)(7, "button", 514);
    i0.ɵɵtext(8, "All");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 515);
    i0.ɵɵtext(10, "Calls");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 515);
    i0.ɵɵtext(12, "Tasks");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(13, DashboardPage_article_100_ng_container_18_ng_container_13_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, DashboardPage_article_100_ng_container_18_div_14_Template, 3, 1, "div", 359);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyActivities_r69 = i0.ɵɵreference(112);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, cardId_r26));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.upcomingActivities().length)("ngIfElse", emptyActivities_r69);
} }
function DashboardPage_article_100_ng_container_19_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_article_100_ng_container_19_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 229)(1, "div", 531);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 532);
    i0.ɵɵelement(3, "circle", 533)(4, "circle", 534);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 535)(6, "span", 536);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 537);
    i0.ɵɵtext(9, "%");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 538);
    i0.ɵɵtext(11, "Tasks On Track");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 539)(13, "div", 540);
    i0.ɵɵelement(14, "span", 541);
    i0.ɵɵelementStart(15, "span", 542);
    i0.ɵɵtext(16, "Upcoming");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 543);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 540);
    i0.ɵɵelement(20, "span", 544);
    i0.ɵɵelementStart(21, "span", 542);
    i0.ɵɵtext(22, "Overdue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 543);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 545)(26, "div", 546);
    i0.ɵɵelement(27, "i", 547);
    i0.ɵɵelementStart(28, "div", 548)(29, "span", 162);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 137);
    i0.ɵɵtext(33, "Avg CLV");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 546);
    i0.ɵɵelement(35, "i", 549);
    i0.ɵɵelementStart(36, "div", 548)(37, "span", 162);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 137);
    i0.ɵɵtext(40, "Churn Rate");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("stroke-dasharray", ctx_r1.getHealthProgress());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.activityStats().completion);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.activityStats().upcoming);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.activityStats().overdue);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(31, 7, ctx_r1.summary().customerLifetimeValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r1.summary().churnRate, "%");
} }
function DashboardPage_article_100_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 530);
    i0.ɵɵtext(4, " Business Health ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_article_100_ng_container_19_ng_container_6_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, DashboardPage_article_100_ng_container_19_div_7_Template, 41, 12, "div", 359);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cardId_r26 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const emptyHealth_r70 = i0.ɵɵreference(104);
    const cardControls_r27 = i0.ɵɵreference(118);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngTemplateOutlet", cardControls_r27)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, cardId_r26));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.hasHealthData())("ngIfElse", emptyHealth_r70);
} }
function DashboardPage_article_100_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 221, 16);
    i0.ɵɵlistener("cdkDragStarted", function DashboardPage_article_100_Template_article_cdkDragStarted_0_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCardDragStart($event)); })("cdkDragEnded", function DashboardPage_article_100_Template_article_cdkDragEnded_0_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCardDragEnd($event)); });
    i0.ɵɵtemplate(2, DashboardPage_article_100_ng_container_2_Template, 2, 1, "ng-container", 222)(3, DashboardPage_article_100_ng_container_3_Template, 15, 13, "ng-container", 222)(4, DashboardPage_article_100_ng_container_4_Template, 31, 19, "ng-container", 222)(5, DashboardPage_article_100_ng_container_5_Template, 14, 7, "ng-container", 222)(6, DashboardPage_article_100_ng_container_6_Template, 14, 7, "ng-container", 222)(7, DashboardPage_article_100_ng_container_7_Template, 13, 7, "ng-container", 222)(8, DashboardPage_article_100_ng_container_8_Template, 14, 6, "ng-container", 222)(9, DashboardPage_article_100_ng_container_9_Template, 14, 6, "ng-container", 222)(10, DashboardPage_article_100_ng_container_10_Template, 26, 26, "ng-container", 222)(11, DashboardPage_article_100_ng_container_11_Template, 11, 6, "ng-container", 222)(12, DashboardPage_article_100_ng_container_12_Template, 9, 7, "ng-container", 222)(13, DashboardPage_article_100_ng_container_13_Template, 12, 7, "ng-container", 222)(14, DashboardPage_article_100_ng_container_14_Template, 24, 8, "ng-container", 222)(15, DashboardPage_article_100_ng_container_15_Template, 10, 5, "ng-container", 222)(16, DashboardPage_article_100_ng_container_16_Template, 45, 27, "ng-container", 222)(17, DashboardPage_article_100_ng_container_17_Template, 80, 44, "ng-container", 222)(18, DashboardPage_article_100_ng_container_18_Template, 15, 6, "ng-container", 222)(19, DashboardPage_article_100_ng_container_19_Template, 8, 6, "ng-container", 222);
    i0.ɵɵelementStart(20, "div", 223);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_100_Template_div_mousedown_20_listener($event) { i0.ɵɵrestoreView(_r23); const dashboardCard_r71 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, dashboardCard_r71, "s")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 142);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_100_Template_div_mousedown_21_listener($event) { i0.ɵɵrestoreView(_r23); const dashboardCard_r71 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, dashboardCard_r71, "e")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 143);
    i0.ɵɵlistener("mousedown", function DashboardPage_article_100_Template_div_mousedown_22_listener($event) { i0.ɵɵrestoreView(_r23); const dashboardCard_r71 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.startResize($event, dashboardCard_r71, "se")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cardId_r26 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("full-width-card", cardId_r26 === "ai-orchestration" || cardId_r26 === "my-tasks")("my-tasks-card", cardId_r26 === "my-tasks");
    i0.ɵɵproperty("ngSwitch", cardId_r26)("ngClass", ctx_r1.getCardSizeClass(cardId_r26))("ngStyle", ctx_r1.getCardDimensions(cardId_r26));
    i0.ɵɵattribute("data-card-id", cardId_r26)("data-min-height", cardId_r26 === "my-tasks" ? 360 : 220);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", "ai-orchestration");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "pipeline");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "truth-metrics");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "risk-register");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "execution-guide");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "expansion-signals");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "confidence-forecast");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "forecast-scenarios");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "my-forecast");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "accounts");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "manager-health");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "activity-mix");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "conversion");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "top-performers");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "team-performance");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "my-tasks");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "timeline");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "health");
} }
function DashboardPage_ng_container_102_article_1_ng_container_3_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_ng_container_102_article_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 134);
    i0.ɵɵtext(4, " Revenue Trend ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227)(6, "div", 553)(7, "span", 554);
    i0.ɵɵelement(8, "span", 555);
    i0.ɵɵtext(9, " Revenue ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, DashboardPage_ng_container_102_article_1_ng_container_3_ng_container_10_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 229)(12, "div", 556);
    i0.ɵɵelement(13, "p-chart", 557);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const chartId_r73 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const chartControls_r74 = i0.ɵɵreference(120);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngTemplateOutlet", chartControls_r74)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, chartId_r73));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", ctx_r1.revenueChartData)("options", ctx_r1.revenueChartOptions);
} }
function DashboardPage_ng_container_102_article_1_ng_container_4_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DashboardPage_ng_container_102_article_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 225)(2, "h3", 190);
    i0.ɵɵelement(3, "i", 197);
    i0.ɵɵtext(4, " Customer Growth ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 227);
    i0.ɵɵtemplate(6, DashboardPage_ng_container_102_article_1_ng_container_4_ng_container_6_Template, 1, 0, "ng-container", 228);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 229)(8, "div", 556);
    i0.ɵɵelement(9, "p-chart", 231);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const chartId_r73 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    const chartControls_r74 = i0.ɵɵreference(120);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngTemplateOutlet", chartControls_r74)("ngTemplateOutletContext", i0.ɵɵpureFunction1(4, _c9, chartId_r73));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", ctx_r1.customerGrowthData)("options", ctx_r1.customerGrowthOptions);
} }
function DashboardPage_ng_container_102_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 551, 23);
    i0.ɵɵelementContainerStart(2, 552);
    i0.ɵɵtemplate(3, DashboardPage_ng_container_102_article_1_ng_container_3_Template, 14, 6, "ng-container", 222)(4, DashboardPage_ng_container_102_article_1_ng_container_4_Template, 10, 6, "ng-container", 222);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementStart(5, "div", 223);
    i0.ɵɵlistener("mousedown", function DashboardPage_ng_container_102_article_1_Template_div_mousedown_5_listener($event) { i0.ɵɵrestoreView(_r72); const chartCard_r75 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startResize($event, chartCard_r75, "s")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 142);
    i0.ɵɵlistener("mousedown", function DashboardPage_ng_container_102_article_1_Template_div_mousedown_6_listener($event) { i0.ɵɵrestoreView(_r72); const chartCard_r75 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startResize($event, chartCard_r75, "e")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 143);
    i0.ɵɵlistener("mousedown", function DashboardPage_ng_container_102_article_1_Template_div_mousedown_7_listener($event) { i0.ɵɵrestoreView(_r72); const chartCard_r75 = i0.ɵɵreference(1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startResize($event, chartCard_r75, "se")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const chartId_r73 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c8, ctx_r1.getChartSizeClass(chartId_r73), chartId_r73 === "revenue" ? "large" : ""))("ngStyle", ctx_r1.getCardDimensions(chartId_r73));
    i0.ɵɵattribute("data-card-id", chartId_r73)("data-min-width", chartId_r73 === "revenue" ? 320 : 280)("data-min-height", chartId_r73 === "revenue" ? 320 : 280);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitch", chartId_r73);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "revenue");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "growth");
} }
function DashboardPage_ng_container_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DashboardPage_ng_container_102_article_1_Template, 8, 11, "article", 550);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const chartId_r73 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isChartVisible(chartId_r73));
} }
function DashboardPage_ng_template_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 530);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No health data yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Activity stats, CLV, and churn metrics will appear here");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 558);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No priority items");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Tasks, new leads, and at\u2011risk deals will appear here");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No recent accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "New accounts will appear here");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 559);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "Pipeline looks clean");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "No deals require manager review right now");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "All clear!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "No upcoming activities scheduled");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 245);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No risk flags");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Pipeline risk signals will appear here");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No execution prompts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Execution guidance will appear here");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_117_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 560)(1, "button", 561);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_117_Template_button_click_1_listener() { const cardId_r77 = i0.ɵɵrestoreView(_r76).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.hideCard(cardId_r77)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "button", 562);
    i0.ɵɵelementEnd();
} }
function DashboardPage_ng_template_119_Template(rf, ctx) { if (rf & 1) {
    const _r78 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 560)(1, "button", 563);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_119_Template_button_click_1_listener() { const chartId_r79 = i0.ɵɵrestoreView(_r78).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.hideChart(chartId_r79)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "button", 564);
    i0.ɵɵelementEnd();
} }
function DashboardPage_div_137_div_1_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 336);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r80 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", factor_r80.label, ": ", i0.ɵɵpipeBind4(2, 2, factor_r80.contribution, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
} }
function DashboardPage_div_137_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 567)(1, "div", 568)(2, "div", 569);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 570);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 571);
    i0.ɵɵtemplate(7, DashboardPage_div_137_div_1_span_7_Template, 3, 7, "span", 335);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 572)(9, "div", 573);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 574);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "currency");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const deal_r81 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(deal_r81.opportunityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", deal_r81.accountName, " \u2022 ", deal_r81.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", deal_r81.topFactors);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(11, 6, deal_r81.amount, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(14, 11, deal_r81.costOfNotKnowingValue, ctx_r1.resolveCurrencyCode(), "symbol", "1.0-0"), " ");
} }
function DashboardPage_div_137_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 565);
    i0.ɵɵtemplate(1, DashboardPage_div_137_div_1_Template, 15, 16, "div", 566);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.costBreakdownSorted());
} }
function DashboardPage_ng_template_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 296)(1, "div", 342);
    i0.ɵɵelement(2, "i", 245);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No exposure breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Cost of Not Knowing details will appear once there are active opportunities.");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_140_Template(rf, ctx) { if (rf & 1) {
    const _r82 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 575)(1, "button", 59);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_140_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r82); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCostBreakdownDialog()); });
    i0.ɵɵtext(2, "Close");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_div_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 576)(1, "div", 577)(2, "button", 578);
    i0.ɵɵelement(3, "i", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 579);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "i", 141);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const card_r83 = ctx.$implicit;
    const index_r84 = ctx.index;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(index_r84 + 1);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(card_r83.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r83.label);
} }
function DashboardPage_label_150_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 580)(1, "input", 581);
    i0.ɵɵlistener("ngModelChange", function DashboardPage_label_150_Template_input_ngModelChange_1_listener($event) { const card_r86 = i0.ɵɵrestoreView(_r85).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCardVisibilityChange(card_r86.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "i", 141);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const card_r86 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.isCardVisible(card_r86.id));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(card_r86.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r86.label);
} }
function DashboardPage_div_151_label_4_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 580)(1, "input", 581);
    i0.ɵɵlistener("ngModelChange", function DashboardPage_div_151_label_4_Template_input_ngModelChange_1_listener($event) { const chart_r88 = i0.ɵɵrestoreView(_r87).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onChartVisibilityChange(chart_r88.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(2, "i", 141);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const chart_r88 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.isChartVisible(chart_r88.id));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(chart_r88.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(chart_r88.label);
} }
function DashboardPage_div_151_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99)(1, "h4");
    i0.ɵɵtext(2, "Chart cards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 100);
    i0.ɵɵtemplate(4, DashboardPage_div_151_label_4_Template, 5, 4, "label", 101);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectableCharts());
} }
function DashboardPage_ng_template_152_Template(rf, ctx) { if (rf & 1) {
    const _r89 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 575)(1, "button", 59);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_152_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r89); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resetLayout()); });
    i0.ɵɵtext(2, "Reset to role default");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 582);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_152_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r89); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveLayout()); });
    i0.ɵɵtext(4, "Save layout");
    i0.ɵɵelementEnd()();
} }
function DashboardPage_ng_template_173_Template(rf, ctx) { if (rf & 1) {
    const _r90 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 583)(1, "button", 210);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_173_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r90); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCoaching()); });
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 220);
    i0.ɵɵlistener("click", function DashboardPage_ng_template_173_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r90); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCoaching()); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.coachingSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.coachingSubmitting || !ctx_r1.coachingComment.trim());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.coachingSubmitting ? "Sending..." : "Create task", " ");
} }
export class DashboardPage {
    chartIdKeys = ['revenue', 'growth'];
    chartIdSet = new Set(this.chartIdKeys);
    chartIdDefaultOrder = [...this.chartIdKeys];
    chartIdTypeGuard = (value) => this.chartIdSet.has(value);
    dashboardData = inject(DashboardDataService);
    platformId = inject(PLATFORM_ID);
    commandPaletteService = inject(CommandPaletteService);
    toastService = inject(AppToastService);
    notificationService = inject(NotificationService);
    crmEventsService = inject(CrmEventsService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    opportunityData = inject(OpportunityDataService);
    approvalService = inject(OpportunityApprovalService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    emptySummary = {
        totalCustomers: 0,
        leads: 0,
        prospects: 0,
        activeCustomers: 0,
        openOpportunities: 0,
        pipelineValueTotal: 0,
        tasksDueToday: 0,
        upcomingActivities: 0,
        overdueActivities: 0,
        atRiskOpportunities: 0,
        opportunitiesWithoutNextStep: 0,
        recentCustomers: [],
        activitiesNextWeek: [],
        myTasks: [],
        revenueByMonth: [],
        customerGrowth: [],
        activityBreakdown: [],
        pipelineValue: [],
        conversionTrend: [],
        topPerformers: [],
        newlyAssignedLeads: [],
        atRiskDeals: [],
        avgDealSize: 0,
        winRate: 0,
        avgSalesCycle: 0,
        monthlyRecurringRevenue: 0,
        customerLifetimeValue: 0,
        churnRate: 0,
        avgQualificationConfidence: 0,
        avgTruthCoverage: 0,
        avgTimeToTruthDays: 0,
        riskRegisterCount: 0,
        riskIntelligence: [],
        topRiskFlags: [],
        confidenceWeightedPipelineValue: 0,
        costOfNotKnowingValue: 0,
        costOfNotKnowingDeals: 0,
        costOfNotKnowingBreakdown: [],
        costOfNotKnowingTrend: [],
        confidenceCalibrationScore: 0,
        confidenceCalibrationSample: 0,
        myPipelineValueTotal: 0,
        myConfidenceWeightedPipelineValue: 0,
        myQuotaTarget: null,
        forecastScenarios: []
    };
    summarySignal = signal(this.emptySummary, ...(ngDevMode ? [{ debugName: "summarySignal" }] : []));
    emptyManagerHealth = {
        openOpportunities: 0,
        pipelineValueTotal: 0,
        missingNextStepCount: 0,
        nextStepOverdueCount: 0,
        noRecentActivityCount: 0,
        closeDateOverdueCount: 0,
        stuckStageCount: 0,
        coachingOpenCount: 0,
        coachingOverdueCount: 0,
        coachingEscalationsLast7Days: 0,
        approvalPendingCount: 0,
        approvalCycleAvgHours: 0,
        reviewNeedsWorkCount: 0,
        reviewEscalatedCount: 0,
        reviewAckOverdueCount: 0,
        reviewAckAvgHours: 0,
        pipelineByStage: [],
        topTruthGaps: [],
        reviewQueue: []
    };
    managerHealthRefresh$ = new Subject();
    dashboardRealtimeRefresh$ = new Subject();
    managerHealthSignal = signal(this.emptyManagerHealth, ...(ngDevMode ? [{ debugName: "managerHealthSignal" }] : []));
    emptyTeamPerformance = {
        teamRevenue: 0,
        dealsClosed: 0,
        winRate: 0,
        avgCycleDays: 0,
        teamRevenuePrevious: 0,
        dealsClosedPrevious: 0,
        winRatePrevious: 0,
        avgCycleDaysPrevious: 0,
        reps: []
    };
    teamPerformanceSignal = signal(this.emptyTeamPerformance, ...(ngDevMode ? [{ debugName: "teamPerformanceSignal" }] : []));
    emptyAssistantInsights = {
        scope: 'Self',
        kpis: [],
        actions: [],
        generatedAtUtc: new Date().toISOString()
    };
    assistantInsightsSignal = signal(this.emptyAssistantInsights, ...(ngDevMode ? [{ debugName: "assistantInsightsSignal" }] : []));
    expansionSignals = signal([], ...(ngDevMode ? [{ debugName: "expansionSignals" }] : []));
    pendingDecisionInbox = signal([], ...(ngDevMode ? [{ debugName: "pendingDecisionInbox" }] : []));
    selectedPeriod = signal('month', ...(ngDevMode ? [{ debugName: "selectedPeriod" }] : []));
    dateRange = signal(null, ...(ngDevMode ? [{ debugName: "dateRange" }] : []));
    showRangePicker = signal(false, ...(ngDevMode ? [{ debugName: "showRangePicker" }] : []));
    rangeLabel = computed(() => {
        const r = this.dateRange();
        if (!r || r.length < 2 || !r[0] || !r[1])
            return '';
        const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${fmt(r[0])} – ${fmt(r[1])}`;
    }, ...(ngDevMode ? [{ debugName: "rangeLabel" }] : []));
    expansionLoading = signal(false, ...(ngDevMode ? [{ debugName: "expansionLoading" }] : []));
    expansionSubmitting = signal({}, ...(ngDevMode ? [{ debugName: "expansionSubmitting" }] : []));
    summary = computed(() => this.summarySignal() ?? this.emptySummary, ...(ngDevMode ? [{ debugName: "summary" }] : []));
    managerHealth = computed(() => this.managerHealthSignal() ?? this.emptyManagerHealth, ...(ngDevMode ? [{ debugName: "managerHealth" }] : []));
    teamPerformance = computed(() => this.teamPerformanceSignal() ?? this.emptyTeamPerformance, ...(ngDevMode ? [{ debugName: "teamPerformance" }] : []));
    teamPerformanceReps = computed(() => this.teamPerformance().reps ?? [], ...(ngDevMode ? [{ debugName: "teamPerformanceReps" }] : []));
    assistantInsights = computed(() => this.assistantInsightsSignal() ?? this.emptyAssistantInsights, ...(ngDevMode ? [{ debugName: "assistantInsights" }] : []));
    assistantKpis = computed(() => this.assistantInsights().kpis ?? [], ...(ngDevMode ? [{ debugName: "assistantKpis" }] : []));
    assistantActions = computed(() => this.assistantInsights().actions ?? [], ...(ngDevMode ? [{ debugName: "assistantActions" }] : []));
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    coachingDialogOpen = false;
    coachingComment = '';
    coachingDueLocal = '';
    coachingPriority = 'High';
    coachingSubmitting = false;
    coachingDeal = null;
    expansionDialogOpen = false;
    assistantReviewDialogOpen = false;
    assistantReviewNote = '';
    assistantReviewSubmitting = false;
    pendingAssistantAction = null;
    assistantExpandedActionIds = signal([], ...(ngDevMode ? [{ debugName: "assistantExpandedActionIds" }] : []));
    assistantDetailDialogOpen = false;
    assistantDetailAction = null;
    assistantUndoVisible = false;
    assistantUndoBusy = false;
    assistantUndoMessage = '';
    assistantUndoTimerId = null;
    assistantUndoActivityId = null;
    assistantUndoActionType = null;
    // Realtime update tracking
    realtimeUpdating = signal(false, ...(ngDevMode ? [{ debugName: "realtimeUpdating" }] : []));
    dataLoadFailed = signal(false, ...(ngDevMode ? [{ debugName: "dataLoadFailed" }] : []));
    realtimeUpdateTimeout = null;
    greeting = this.getGreeting();
    // Chart configurations
    revenueChartData;
    revenueChartOptions;
    customerGrowthData;
    customerGrowthOptions;
    activityDonutData;
    activityDonutOptions;
    pipelineChartData;
    pipelineChartOptions;
    conversionChartData;
    conversionChartOptions;
    costTrendChartData;
    costTrendChartOptions;
    costBreakdownDialogOpen = false;
    costBreakdownSortKey = 'exposure';
    costBreakdownSortDirection = 'desc';
    kpis = computed(() => {
        const data = this.summary();
        if (!data)
            return [];
        return [
            { label: 'Accounts', value: data.totalCustomers, sub: 'Total records' },
            { label: 'Open opportunities', value: data.openOpportunities, sub: 'Active pipeline' },
            { label: 'Pipeline value', value: data.pipelineValueTotal, sub: 'Open forecast' },
            { label: 'Tasks due today', value: data.tasksDueToday, sub: 'Focus list' },
            { label: 'Upcoming activities', value: data.upcomingActivities, sub: 'Next 7 days' }
        ];
    }, ...(ngDevMode ? [{ debugName: "kpis" }] : []));
    secondaryKpis = computed(() => {
        const data = this.summary();
        if (!data)
            return [];
        const openOpportunities = Math.max(data.openOpportunities, 1);
        const visibleActivities = Math.max(data.upcomingActivities + data.overdueActivities, 1);
        const leadPopulation = Math.max(data.leads + data.prospects, 1);
        const items = [
            {
                id: 'raw-pipeline',
                label: 'Raw pipeline',
                value: data.pipelineValueTotal,
                format: 'currency',
                sub: 'Unweighted open pipeline',
                percentage: data.pipelineValueTotal > 0 ? 100 : 0,
                icon: 'pi-dollar',
                color: 'cyan'
            },
            {
                id: 'at-risk',
                label: 'At-risk deals',
                value: data.atRiskOpportunities,
                format: 'number',
                sub: 'Need recovery attention',
                percentage: Math.round((data.atRiskOpportunities / openOpportunities) * 100),
                icon: 'pi-exclamation-triangle',
                color: 'danger'
            },
            {
                id: 'no-next-step',
                label: 'No next step',
                value: data.opportunitiesWithoutNextStep,
                format: 'number',
                sub: 'Execution gap in pipeline',
                percentage: Math.round((data.opportunitiesWithoutNextStep / openOpportunities) * 100),
                icon: 'pi-calendar-times',
                color: 'warning'
            },
            {
                id: 'tasks-due',
                label: 'Workspace tasks due today',
                value: data.tasksDueToday,
                format: 'number',
                sub: 'Workspace activity queue',
                percentage: Math.round((data.tasksDueToday / visibleActivities) * 100),
                icon: 'pi-calendar',
                color: 'success'
            },
            {
                id: 'overdue-activities',
                label: 'Workspace overdue activities',
                value: data.overdueActivities,
                format: 'number',
                sub: 'Workspace recovery queue',
                percentage: Math.round((data.overdueActivities / visibleActivities) * 100),
                icon: 'pi-history',
                color: 'orange'
            },
            {
                id: 'new-leads',
                label: 'Newly assigned leads',
                value: data.newlyAssignedLeads?.length ?? 0,
                format: 'number',
                sub: 'Fresh follow-up queue',
                percentage: Math.round(((data.newlyAssignedLeads?.length ?? 0) / leadPopulation) * 100),
                icon: 'pi-user-plus',
                color: 'purple'
            }
        ];
        const order = this.kpiOrder().length ? this.kpiOrder() : this.defaultKpiOrder;
        const lookup = new Map(items.map(item => [item.id, item]));
        return order
            .map((id) => lookup.get(id))
            .filter((item) => !!item);
    }, ...(ngDevMode ? [{ debugName: "secondaryKpis" }] : []));
    customerBreakdown = computed(() => {
        const data = this.summary();
        if (!data)
            return [];
        return [
            { label: 'Lead', value: data.leads, accent: 'teal' },
            { label: 'Prospect', value: data.prospects, accent: 'amber' },
            { label: 'Customer', value: data.activeCustomers, accent: 'emerald' }
        ];
    }, ...(ngDevMode ? [{ debugName: "customerBreakdown" }] : []));
    topRiskFlags = computed(() => this.summary()?.topRiskFlags ?? [], ...(ngDevMode ? [{ debugName: "topRiskFlags" }] : []));
    riskSeverityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    sortBySeverity(items) {
        return [...items].sort((a, b) => {
            const aOrder = this.riskSeverityOrder[this.riskIntelligenceSeverityClass(a.severity)] ?? 99;
            const bOrder = this.riskSeverityOrder[this.riskIntelligenceSeverityClass(b.severity)] ?? 99;
            return aOrder - bOrder;
        });
    }
    riskIntelligenceItems = computed(() => this.sortBySeverity(this.summary()?.riskIntelligence ?? []).slice(0, 5), ...(ngDevMode ? [{ debugName: "riskIntelligenceItems" }] : []));
    riskIntelligenceSummary = computed(() => {
        const buckets = new Map();
        for (const item of this.summary()?.riskIntelligence ?? []) {
            const severity = this.riskIntelligenceSeverityClass(item.severity);
            buckets.set(severity, (buckets.get(severity) ?? 0) + item.count);
        }
        return ['critical', 'high', 'medium', 'info']
            .filter((severity) => (buckets.get(severity) ?? 0) > 0)
            .map((severity) => ({
            severity,
            label: this.riskIntelligenceSeverityLabel(severity),
            count: buckets.get(severity) ?? 0
        }));
    }, ...(ngDevMode ? [{ debugName: "riskIntelligenceSummary" }] : []));
    assistantDiagnosticItems = computed(() => {
        const actions = this.assistantActions();
        return this.sortBySeverity(this.summary()?.riskIntelligence ?? []).slice(0, 5).map((item) => ({
            key: item.label,
            label: item.label,
            severity: item.severity,
            count: item.count,
            impact: item.impact,
            recommendedAction: item.recommendedAction,
            linkedActionTitle: this.resolveRiskDiagnosticAction(item, actions)
        }));
    }, ...(ngDevMode ? [{ debugName: "assistantDiagnosticItems" }] : []));
    assistantMonitorOnlyCount = computed(() => this.assistantDiagnosticItems().filter((item) => !item.linkedActionTitle).length, ...(ngDevMode ? [{ debugName: "assistantMonitorOnlyCount" }] : []));
    topCostBreakdown = computed(() => (this.summary()?.costOfNotKnowingBreakdown ?? []).slice(0, 5), ...(ngDevMode ? [{ debugName: "topCostBreakdown" }] : []));
    executionGuideItems = computed(() => {
        const data = this.summary();
        if (!data)
            return [];
        return [
            {
                key: 'recovery',
                eyebrow: 'Now',
                title: 'Stabilize exposed revenue',
                count: data.atRiskOpportunities,
                countLabel: 'deals at risk',
                detail: `${data.atRiskOpportunities} open deals are already showing signal decay, weak buying engagement, or stalled execution.`,
                objective: 'Recover forecast confidence before slippage becomes a quarter-end surprise.',
                tone: 'danger'
            },
            {
                key: 'discipline',
                eyebrow: 'Next',
                title: 'Rebuild deal momentum',
                count: data.opportunitiesWithoutNextStep,
                countLabel: 'execution gaps',
                detail: `${data.opportunitiesWithoutNextStep} active opportunities are missing a committed next step.`,
                objective: 'Restore inspection quality and keep managers looking at movement, not guesswork.',
                tone: 'warning'
            },
            {
                key: 'workday',
                eyebrow: 'Today',
                title: 'Convert the seller workday into buyer movement',
                count: data.tasksDueToday,
                countLabel: 'tasks due',
                detail: `${data.tasksDueToday} tasks are due today and ${data.overdueActivities} prior commitments are already overdue.`,
                objective: 'Turn planned activity into same-day customer progress instead of growing carryover.',
                tone: 'info'
            },
            {
                key: 'coverage',
                eyebrow: 'Protect',
                title: 'Protect fresh pipeline coverage',
                count: data.newlyAssignedLeads?.length ?? 0,
                countLabel: 'new leads',
                detail: `${data.newlyAssignedLeads?.length ?? 0} recently assigned leads are still inside the response window.`,
                objective: 'Preserve speed-to-lead and qualification quality before interest cools.',
                tone: 'success'
            }
        ].filter((item) => item.count > 0);
    }, ...(ngDevMode ? [{ debugName: "executionGuideItems" }] : []));
    selectPeriod(period) {
        this.selectedPeriod.set(period);
        this.showRangePicker.set(false);
        this.refreshSummaryForSelectedPeriod();
    }
    toggleRangePicker() {
        if (this.selectedPeriod() === 'range') {
            this.showRangePicker.update(v => !v);
        }
        else {
            this.selectedPeriod.set('range');
            this.showRangePicker.set(true);
        }
    }
    onDateRangeChange(range) {
        this.dateRange.set(range);
        if (range && range.length === 2 && range[0] && range[1]) {
            this.showRangePicker.set(false);
            this.refreshSummaryForSelectedPeriod();
        }
    }
    refreshSummaryForSelectedPeriod() {
        const request = this.buildSummaryRequestParams();
        this.dashboardData.getSummary(request.period, request.fromUtc, request.toUtc)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((summary) => {
            const resolvedSummary = summary ?? this.emptySummary;
            this.summarySignal.set(resolvedSummary);
            this.emitRiskAlerts(resolvedSummary);
        });
    }
    buildSummaryRequestParams() {
        const period = this.selectedPeriod();
        if (period !== 'range') {
            return { period };
        }
        const range = this.dateRange();
        if (!range || range.length < 2 || !range[0] || !range[1]) {
            return { period: 'month' };
        }
        const from = new Date(range[0]);
        from.setHours(0, 0, 0, 0);
        const to = new Date(range[1]);
        to.setHours(23, 59, 59, 999);
        return {
            period: 'range',
            fromUtc: from.toISOString(),
            toUtc: to.toISOString()
        };
    }
    confidenceLabel(value) {
        if (value >= 0.75)
            return 'High';
        if (value >= 0.5)
            return 'Medium';
        if (value >= 0.2)
            return 'Neutral';
        return 'Low';
    }
    confidenceTone(value) {
        if (value >= 0.75)
            return 'success';
        if (value >= 0.5)
            return 'info';
        if (value >= 0.2)
            return 'warning';
        return 'danger';
    }
    riskIntelligenceSeverityClass(severity) {
        switch ((severity ?? '').trim().toLowerCase()) {
            case 'critical':
                return 'critical';
            case 'high':
                return 'high';
            case 'medium':
                return 'medium';
            default:
                return 'info';
        }
    }
    riskIntelligenceSeverityLabel(severity) {
        const normalized = (severity ?? '').trim().toLowerCase();
        if (normalized === 'critical')
            return 'Critical';
        if (normalized === 'high')
            return 'High';
        if (normalized === 'medium')
            return 'Medium';
        return 'Info';
    }
    openRiskIntelligence(item) {
        this.router.navigate(['/app/risk-intelligence'], {
            queryParams: { source: item.key }
        });
    }
    weightedPipelineDelta() {
        const data = this.summary();
        if (!data)
            return 0;
        return data.confidenceWeightedPipelineValue - data.pipelineValueTotal;
    }
    metricTone(metricId) {
        switch (metricId) {
            case 'raw-pipeline':
                return 'aqua';
            case 'at-risk':
                return 'coral';
            case 'no-next-step':
                return 'amber';
            case 'tasks-due':
                return 'emerald';
            case 'overdue-activities':
                return 'orange';
            case 'new-leads':
                return 'violet';
            default:
                return 'slate';
        }
    }
    metricHealthCaption(metric) {
        const percentage = Math.max(0, Math.min(100, metric.percentage ?? 0));
        switch (metric.id) {
            case 'raw-pipeline':
                return 'Open value currently in motion';
            case 'at-risk':
                return `${percentage}% of open deals need recovery`;
            case 'no-next-step':
                return `${percentage}% of open deals need a next action`;
            case 'tasks-due':
                return `${percentage}% of visible work is due today`;
            case 'overdue-activities':
                return `${percentage}% of visible work is overdue`;
            case 'new-leads':
                return `${percentage}% of the lead pool is newly assigned`;
            default:
                return `${percentage}% of the monitored workload`;
        }
    }
    weightedPipelineHeadline() {
        return this.weightedPipelineDelta() >= 0 ? 'Protected forecast' : 'Forecast exposed';
    }
    weightedPipelineDirectionLabel() {
        return this.weightedPipelineDelta() >= 0 ? 'Confidence holding above raw movement' : 'Confidence trails the raw pipeline';
    }
    recentAccounts = computed(() => this.summary()?.recentCustomers?.slice(0, 5) ?? [], ...(ngDevMode ? [{ debugName: "recentAccounts" }] : []));
    upcomingActivities = computed(() => this.summary()?.activitiesNextWeek?.slice(0, 6) ?? [], ...(ngDevMode ? [{ debugName: "upcomingActivities" }] : []));
    myTasks = computed(() => this.summary()?.myTasks?.slice(0, 6) ?? [], ...(ngDevMode ? [{ debugName: "myTasks" }] : []));
    topPerformers = computed(() => this.summary()?.topPerformers ?? [], ...(ngDevMode ? [{ debugName: "topPerformers" }] : []));
    newlyAssignedLeads = computed(() => this.summary()?.newlyAssignedLeads?.slice(0, 6) ?? [], ...(ngDevMode ? [{ debugName: "newlyAssignedLeads" }] : []));
    atRiskDeals = computed(() => this.summary()?.atRiskDeals?.slice(0, 6) ?? [], ...(ngDevMode ? [{ debugName: "atRiskDeals" }] : []));
    myQuotaTarget = computed(() => this.summary()?.myQuotaTarget ?? null, ...(ngDevMode ? [{ debugName: "myQuotaTarget" }] : []));
    myQuotaProgress = computed(() => {
        const quota = this.myQuotaTarget();
        if (!quota || quota <= 0) {
            return null;
        }
        const weighted = this.summary()?.myConfidenceWeightedPipelineValue ?? 0;
        return Math.min(100, Math.round((weighted / quota) * 100));
    }, ...(ngDevMode ? [{ debugName: "myQuotaProgress" }] : []));
    priorityStreamItems = computed(() => {
        const items = [];
        const tasks = this.myTasks();
        const leads = this.newlyAssignedLeads();
        const deals = this.atRiskDeals();
        const decisions = this.pendingDecisionInbox();
        for (const task of tasks) {
            const dueLabel = this.getTaskDueLabel(task);
            const dueClass = this.getTaskDueClass(task);
            items.push({
                id: task.id,
                type: 'task',
                title: task.subject,
                subtitle: task.relatedEntityName || task.type || 'Task',
                status: task.status,
                dueLabel,
                dueClass,
                dueColumn: dueClass === 'due-today' ? 'Due today' : dueLabel,
                action: task.type === 'Call' ? 'Call now' : task.type === 'Email' ? 'Send email' : 'Complete task',
                meta: [
                    task.dueDateUtc ? `Due ${this.formatShortDate(task.dueDateUtc)}` : 'No due date',
                    `Priority: ${this.getTaskPriorityLabel(task)}`
                ],
                priorityScore: this.getTaskPriorityScore(task)
            });
        }
        for (const lead of leads) {
            items.push({
                id: lead.id,
                type: 'lead',
                title: lead.name,
                subtitle: lead.company,
                status: 'New lead',
                dueLabel: 'New',
                dueClass: 'due-today',
                dueColumn: 'Due today',
                action: 'Review & contact',
                meta: [
                    lead.email ? lead.email : 'No email',
                    `Assigned ${this.formatShortDate(lead.createdAtUtc)}`
                ],
                priorityScore: 70,
                leadFirstTouchDueAtUtc: lead.firstTouchDueAtUtc
            });
        }
        for (const deal of deals) {
            items.push({
                id: deal.id,
                type: 'deal',
                title: deal.name,
                subtitle: deal.accountName,
                status: deal.reason || 'At risk',
                dueLabel: 'At risk',
                dueClass: 'due-overdue',
                dueColumn: deal.nextStepDueAtUtc ? `Due ${this.formatShortDate(deal.nextStepDueAtUtc)}` : 'No next step',
                action: deal.reason?.toLowerCase().includes('missing next step')
                    ? 'Set next step'
                    : deal.reason?.toLowerCase().includes('next step overdue')
                        ? 'Update next step'
                        : 'Log activity',
                meta: [
                    `Stage: ${deal.stage}`,
                    `Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: this.resolveCurrencyCode(), maximumFractionDigits: 0 }).format(deal.amount ?? 0)}`
                ],
                priorityScore: 65
            });
        }
        for (const decision of decisions) {
            const requestedOn = new Date(decision.requestedOn);
            const ageInHours = Number.isNaN(requestedOn.getTime())
                ? 0
                : Math.max(0, Math.round((Date.now() - requestedOn.getTime()) / 36e5));
            const overdue = ageInHours >= 48;
            items.push({
                id: decision.id,
                type: 'decision',
                title: decision.opportunityName,
                subtitle: decision.accountName,
                status: `${decision.purpose} approval`,
                dueLabel: overdue ? 'Pending >48h' : 'Pending',
                dueClass: overdue ? 'due-overdue' : 'due-today',
                dueColumn: overdue ? 'Escalate' : 'Review now',
                action: 'Open decision inbox',
                meta: [
                    `Requested by ${decision.requestedByName || 'Unknown'}`,
                    `Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: decision.currency || this.resolveCurrencyCode(), maximumFractionDigits: 0 }).format(decision.amount ?? 0)}`
                ],
                priorityScore: overdue ? 95 : 85,
                opportunityId: decision.opportunityId
            });
        }
        return items.sort((a, b) => b.priorityScore - a.priorityScore);
    }, ...(ngDevMode ? [{ debugName: "priorityStreamItems" }] : []));
    prioritySummary = computed(() => {
        const items = this.priorityStreamItems();
        return {
            overdue: items.filter((item) => item.dueClass === 'due-overdue').length,
            today: items.filter((item) => item.dueClass === 'due-today').length,
            decisions: items.filter((item) => item.type === 'decision').length,
            newLeads: items.filter((item) => item.type === 'lead').length,
            atRisk: items.filter((item) => item.type === 'deal').length,
            noNextStep: items.filter((item) => item.type === 'deal' && item.status?.toLowerCase().includes('missing next step')).length
        };
    }, ...(ngDevMode ? [{ debugName: "prioritySummary" }] : []));
    priorityFilter = signal('all', ...(ngDevMode ? [{ debugName: "priorityFilter" }] : []));
    filteredPriorityStreamItems = computed(() => {
        const items = this.priorityStreamItems();
        const filter = this.priorityFilter();
        if (filter === 'all')
            return items;
        if (filter === 'overdue') {
            return items.filter(item => item.dueClass === 'due-overdue');
        }
        if (filter === 'today') {
            return items.filter(item => item.dueClass === 'due-today');
        }
        if (filter === 'decisions') {
            return items.filter(item => item.type === 'decision');
        }
        if (filter === 'new-leads') {
            return items.filter(item => item.type === 'lead');
        }
        if (filter === 'no-next-step') {
            return items.filter(item => item.type === 'deal' && item.status?.toLowerCase().includes('missing next step'));
        }
        return items.filter(item => item.type === 'deal');
    }, ...(ngDevMode ? [{ debugName: "filteredPriorityStreamItems" }] : []));
    actionQueueTitle = computed(() => 'My Action Queue', ...(ngDevMode ? [{ debugName: "actionQueueTitle" }] : []));
    actionQueueSubtitle = computed(() => 'Assigned to me across tasks, decisions, leads, and deals', ...(ngDevMode ? [{ debugName: "actionQueueSubtitle" }] : []));
    activityBreakdown = computed(() => this.summary()?.activityBreakdown ?? [], ...(ngDevMode ? [{ debugName: "activityBreakdown" }] : []));
    pipelineValue = computed(() => this.summary()?.pipelineValue ?? [], ...(ngDevMode ? [{ debugName: "pipelineValue" }] : []));
    managerPipelineByStage = computed(() => this.managerHealth().pipelineByStage ?? [], ...(ngDevMode ? [{ debugName: "managerPipelineByStage" }] : []));
    managerTruthGaps = computed(() => this.managerHealth().topTruthGaps ?? [], ...(ngDevMode ? [{ debugName: "managerTruthGaps" }] : []));
    managerReviewQueue = computed(() => this.managerHealth().reviewQueue ?? [], ...(ngDevMode ? [{ debugName: "managerReviewQueue" }] : []));
    managerHealthStats = computed(() => {
        const data = this.managerHealth();
        return [
            { label: 'Missing next step', value: data.missingNextStepCount, tone: 'danger' },
            { label: 'Next step overdue', value: data.nextStepOverdueCount, tone: 'warn' },
            { label: 'No recent activity', value: data.noRecentActivityCount, tone: 'warn' },
            { label: 'Close date passed', value: data.closeDateOverdueCount, tone: 'danger' },
            { label: 'Stuck in stage', value: data.stuckStageCount, tone: 'muted' },
            { label: 'Coaching open', value: data.coachingOpenCount, tone: 'warn' },
            { label: 'Coaching overdue', value: data.coachingOverdueCount, tone: 'danger' },
            { label: 'Coaching escalations (7d)', value: data.coachingEscalationsLast7Days, tone: 'muted' },
            { label: 'Approvals pending', value: data.approvalPendingCount, tone: 'warn' },
            { label: 'Approval cycle (hrs)', value: data.approvalCycleAvgHours, tone: 'muted' },
            { label: 'Review needs work', value: data.reviewNeedsWorkCount, tone: 'warn' },
            { label: 'Review escalated', value: data.reviewEscalatedCount, tone: 'danger' },
            { label: 'Review ack overdue', value: data.reviewAckOverdueCount, tone: 'danger' },
            { label: 'Review ack avg (hrs)', value: data.reviewAckAvgHours, tone: 'muted' }
        ];
    }, ...(ngDevMode ? [{ debugName: "managerHealthStats" }] : []));
    activityStats = computed(() => {
        const data = this.summary();
        const upcoming = data?.upcomingActivities ?? 0;
        const overdue = data?.overdueActivities ?? 0;
        const total = upcoming + overdue;
        const completion = total ? Math.round((upcoming / total) * 100) : 0;
        return { upcoming, overdue, completion };
    }, ...(ngDevMode ? [{ debugName: "activityStats" }] : []));
    hasHealthData = computed(() => {
        const s = this.summary();
        return (s?.upcomingActivities ?? 0) > 0
            || (s?.overdueActivities ?? 0) > 0
            || (s?.customerLifetimeValue ?? 0) > 0
            || (s?.churnRate ?? 0) > 0;
    }, ...(ngDevMode ? [{ debugName: "hasHealthData" }] : []));
    totalPipelineValue = computed(() => {
        const pipeline = this.pipelineValue();
        const summary = this.summary();
        if (summary?.pipelineValueTotal) {
            return summary.pipelineValueTotal;
        }
        return pipeline.reduce((sum, stage) => sum + stage.value, 0);
    }, ...(ngDevMode ? [{ debugName: "totalPipelineValue" }] : []));
    /** Percentage of raw pipeline retained after confidence weighting (0–100). */
    pipelineRetentionPct = computed(() => {
        const raw = this.totalPipelineValue();
        const weighted = this.summary()?.confidenceWeightedPipelineValue ?? 0;
        if (!raw || raw <= 0)
            return 0;
        return Math.round((weighted / raw) * 100);
    }, ...(ngDevMode ? [{ debugName: "pipelineRetentionPct" }] : []));
    /** True when there is meaningful confidence forecast data to display. */
    hasConfidenceForecastData = computed(() => {
        const s = this.summary();
        if (!s)
            return false;
        return (s.confidenceWeightedPipelineValue ?? 0) > 0
            || (s.pipelineValueTotal ?? 0) > 0
            || (s.costOfNotKnowingValue ?? 0) > 0
            || (s.costOfNotKnowingDeals ?? 0) > 0
            || (s.confidenceCalibrationScore ?? 0) > 0;
    }, ...(ngDevMode ? [{ debugName: "hasConfidenceForecastData" }] : []));
    /** Calibration quality label derived from calibration score. */
    calibrationLevel = computed(() => {
        const score = this.summary()?.confidenceCalibrationScore ?? 0;
        if (score >= 80)
            return 'excellent';
        if (score >= 60)
            return 'good';
        if (score >= 40)
            return 'fair';
        return 'poor';
    }, ...(ngDevMode ? [{ debugName: "calibrationLevel" }] : []));
    openCoaching(deal) {
        this.coachingDeal = deal;
        this.coachingComment = '';
        this.coachingPriority = 'High';
        this.coachingDueLocal = this.defaultCoachingDueLocal();
        this.coachingDialogOpen = true;
    }
    closeCoaching() {
        if (this.coachingSubmitting)
            return;
        this.coachingDialogOpen = false;
        this.coachingDeal = null;
    }
    submitCoaching() {
        const deal = this.coachingDeal;
        const comment = this.coachingComment.trim();
        if (!deal || !comment || this.coachingSubmitting) {
            return;
        }
        this.coachingSubmitting = true;
        const dueDateUtc = this.localToUtcIso(this.coachingDueLocal);
        this.dashboardData
            .coachOpportunity(deal.id, {
            comment,
            dueDateUtc,
            priority: this.coachingPriority
        })
            .subscribe({
            next: () => {
                this.coachingSubmitting = false;
                this.closeCoaching();
                this.refreshManagerHealth();
            },
            error: () => {
                this.coachingSubmitting = false;
            }
        });
    }
    refreshManagerHealth() {
        this.managerHealthRefresh$.next();
    }
    defaultCoachingDueLocal() {
        const due = new Date();
        due.setDate(due.getDate() + 2);
        due.setMinutes(due.getMinutes() - due.getTimezoneOffset());
        return due.toISOString().slice(0, 16);
    }
    localToUtcIso(localValue) {
        if (!localValue)
            return null;
        const parsed = new Date(localValue);
        return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    layoutOrder = [];
    get renderedLayoutOrder() {
        return this.layoutOrder.filter((id) => !this.uiSuppressedCardIds.has(id));
    }
    layoutDialogOpen = false;
    layoutDraft = [];
    layoutSizes = {};
    layoutDimensions = {};
    hasLocalLayoutPreference = false;
    hasLocalChartPreference = false;
    roleDefaultLayout = [];
    roleDefaultHiddenCharts = new Set();
    roleDefaultLevel = null;
    activePackName = signal('H1 Pack', ...(ngDevMode ? [{ debugName: "activePackName" }] : []));
    uiSuppressedCardIds = new Set();
    // Locked size map so customize layout never inflates card heights.
    defaultCardSizes = {
        'ai-orchestration': 'lg',
        pipeline: 'lg',
        'truth-metrics': 'md',
        'risk-register': 'md',
        'execution-guide': 'sm',
        'confidence-forecast': 'sm',
        'forecast-scenarios': 'sm',
        'my-forecast': 'sm',
        'expansion-signals': 'md',
        accounts: 'md',
        'manager-health': 'md',
        'activity-mix': 'sm',
        conversion: 'sm',
        'top-performers': 'md',
        'team-performance': 'md',
        'my-tasks': 'md',
        timeline: 'lg',
        health: 'md'
    };
    defaultChartSizes = {
        revenue: 'lg',
        growth: 'md'
    };
    defaultKpiOrder = ['raw-pipeline', 'at-risk', 'no-next-step', 'tasks-due', 'overdue-activities', 'new-leads'];
    kpiOrderStorageKey = 'crm.dashboard.kpi.order';
    kpiOrder = signal([], ...(ngDevMode ? [{ debugName: "kpiOrder" }] : []));
    layoutStorageKey = 'crm.dashboard.command-center.layout';
    chartVisibilityStorageKey = 'crm.dashboard.charts.visibility';
    showRevenueChart = true;
    showCustomerGrowthChart = true;
    chartOrder = [...this.chartIdDefaultOrder];
    resizeState = null;
    onResizeMove = (event) => this.handleResizeMove(event);
    onResizeEnd = () => this.stopResize();
    cardCatalog = DASHBOARD_CARD_CATALOG;
    chartCatalog = DASHBOARD_CHART_CATALOG;
    selectableCards = signal([], ...(ngDevMode ? [{ debugName: "selectableCards" }] : []));
    selectableCharts = signal([], ...(ngDevMode ? [{ debugName: "selectableCharts" }] : []));
    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            effect(() => {
                const summary = this.summary();
                this.initCharts(summary);
            });
        }
        this.destroyRef.onDestroy(() => {
            if (this.assistantUndoTimerId !== null) {
                window.clearTimeout(this.assistantUndoTimerId);
                this.assistantUndoTimerId = null;
            }
        });
        this.kpiOrder.set(this.loadKpiOrder());
        this.loadCurrencyContext();
    }
    ngOnInit() {
        this.loadAllDashboardData();
        this.crmEventsService.events$
            .pipe(filter((event) => event.eventType === 'dashboard.metrics.delta' || event.eventType === 'dashboard.metrics.refresh-requested'), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            // Show realtime update indicator
            this.realtimeUpdating.set(true);
            if (this.realtimeUpdateTimeout) {
                clearTimeout(this.realtimeUpdateTimeout);
            }
            this.realtimeUpdateTimeout = setTimeout(() => {
                this.realtimeUpdating.set(false);
                this.realtimeUpdateTimeout = null;
            }, 2000);
            this.dashboardRealtimeRefresh$.next();
        });
        this.dashboardRealtimeRefresh$
            .pipe(debounceTime(1500), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            const request = this.buildSummaryRequestParams();
            this.dashboardData.getSummary(request.period, request.fromUtc, request.toUtc)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(summary => {
                const resolvedSummary = summary ?? this.emptySummary;
                this.summarySignal.set(resolvedSummary);
                this.emitRiskAlerts(resolvedSummary);
            });
            this.managerHealthRefresh$.next();
        });
        const { order, sizes, dimensions, hasLocalPreference } = this.loadLayoutPreferences();
        const knownCardIds = new Set(this.cardCatalog.map((card) => card.id));
        const normalizedLocalOrder = order.filter((id) => knownCardIds.has(id));
        this.layoutOrder = normalizedLocalOrder.length > 0
            ? normalizedLocalOrder
            : this.cardCatalog.map((card) => card.id);
        this.layoutSizes = this.buildDefaultSizeMap();
        this.layoutDimensions = dimensions ?? {};
        this.hasLocalLayoutPreference = hasLocalPreference;
        this.loadChartVisibility();
        this.refreshSelectableCards();
        this.dashboardData.getDefaultLayout().subscribe({
            next: (response) => {
                const knownCardIds = new Set(this.cardCatalog.map((card) => card.id));
                this.roleDefaultLayout = (response.cardOrder ?? []).filter((id) => knownCardIds.has(id));
                this.roleDefaultLevel = response.roleLevel ?? null;
                this.activePackName.set(this.resolvePackName(response.packName, response.roleLevel));
                const hidden = response.hiddenCards ?? [];
                this.roleDefaultHiddenCharts = new Set(hidden.filter((id) => this.chartIdTypeGuard(id)));
                this.applyRoleDefaultCharts();
                this.refreshSelectableCharts();
                // If the user has a persisted layout that contains cards not in the role's default pack,
                // strip them out immediately so Customize Layout and the dashboard itself stay aligned.
                const roleDefaultOrder = this.getLayoutDefaultOrder();
                this.layoutOrder = this.applyRoleDefault(this.layoutOrder, roleDefaultOrder);
                this.refreshSelectableCards();
                this.loadServerLayout();
            },
            error: () => {
                this.roleDefaultLayout = [];
                this.roleDefaultLevel = null;
                this.activePackName.set(this.resolvePackName(null, this.roleDefaultLevel));
                this.roleDefaultHiddenCharts = new Set();
                this.refreshSelectableCharts();
                this.refreshSelectableCards();
                this.loadServerLayout();
            }
        });
    }
    loadAllDashboardData() {
        this.dataLoadFailed.set(false);
        const request = this.buildSummaryRequestParams();
        this.dashboardData.getSummary(request.period, request.fromUtc, request.toUtc)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (summary) => {
                const resolvedSummary = summary ?? this.emptySummary;
                this.summarySignal.set(resolvedSummary);
                this.emitRiskAlerts(resolvedSummary);
                queueMicrotask(() => this.loadSecondaryDashboardData());
            },
            error: () => {
                this.dataLoadFailed.set(true);
                queueMicrotask(() => this.loadSecondaryDashboardData());
            }
        });
    }
    loadSecondaryDashboardData() {
        this.dashboardData.getAssistantInsights()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((insights) => {
            this.assistantInsightsSignal.set(insights ?? this.emptyAssistantInsights);
            this.assistantExpandedActionIds.set([]);
        });
        this.loadExpansionSignals();
        this.loadPendingDecisionInbox();
        this.managerHealthRefresh$
            .pipe(startWith(void 0), switchMap(() => this.dashboardData.getManagerPipelineHealth()), takeUntilDestroyed(this.destroyRef))
            .subscribe(health => {
            this.managerHealthSignal.set(health ?? this.emptyManagerHealth);
        });
        this.dashboardData.getSalesTeamPerformance()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(perf => {
            this.teamPerformanceSignal.set(perf ?? this.emptyTeamPerformance);
        });
    }
    teamPerfDelta(current, previous) {
        if (previous === 0)
            return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
    }
    retryLoadData() {
        this.loadAllDashboardData();
    }
    onQuickAdd() {
        this.commandPaletteService.requestQuickAdd('lead');
    }
    assistantSeverityClass(severity) {
        const normalized = (severity ?? '').toLowerCase();
        if (normalized === 'danger') {
            return 'danger';
        }
        if (normalized === 'warn' || normalized === 'warning') {
            return 'warning';
        }
        return 'success';
    }
    assistantRiskClass(riskTier) {
        const normalized = (riskTier ?? '').toLowerCase();
        if (normalized === 'high') {
            return 'risk-high';
        }
        if (normalized === 'medium') {
            return 'risk-medium';
        }
        return 'risk-low';
    }
    assistantRiskLabel(riskTier) {
        const normalized = (riskTier ?? '').trim().toLowerCase();
        if (normalized === 'high') {
            return 'HIGH RISK';
        }
        if (normalized === 'medium') {
            return 'MEDIUM RISK';
        }
        if (normalized === 'low') {
            return 'LOW RISK';
        }
        return 'UNKNOWN RISK';
    }
    assistantKpiTooltip(key, label) {
        const normalizedKey = (key ?? '').trim().toLowerCase();
        if (normalizedKey === 'stale-deals') {
            return 'Open opportunities with stale or missing recent activity. Source: live pipeline + activity signals.';
        }
        if (normalizedKey === 'sla-breaches') {
            return 'Leads past first-touch SLA due time. Source: lead SLA timers in the current workspace scope.';
        }
        if (normalizedKey === 'pending-approvals') {
            return 'Open approval decisions awaiting action. Source: approval inbox queue for this scope.';
        }
        if (normalizedKey === 'low-confidence-leads') {
            return 'Active leads below the confidence threshold. Source: live qualification confidence and evidence coverage.';
        }
        if (normalizedKey === 'overdue-activities') {
            return 'Open activities already past due. Source: active execution backlog for the selected scope.';
        }
        return `${label}: live recommendation metric for the selected scope.`;
    }
    assistantSubtitle() {
        const scope = (this.assistantInsights().scope || '').toLowerCase();
        if (scope === 'team' || scope === 'all') {
            return 'Priority-driven recommendations to resolve critical sales risk across the current team scope.';
        }
        return 'Priority-driven recommendations to resolve critical sales risk for the current seller scope.';
    }
    assistantExecutionHealthy() {
        return this.assistantActions().length === 0;
    }
    assistantDiagnosticModeLabel(item) {
        return item.linkedActionTitle ? `Feeds action: ${item.linkedActionTitle}` : 'Monitor only';
    }
    assistantImpactLabel(score) {
        const value = Number(score ?? 0);
        if (value >= 80) {
            return 'HIGH IMPACT';
        }
        if (value >= 60) {
            return 'MODERATE IMPACT';
        }
        return 'LOW IMPACT';
    }
    assistantImpactUrgencyLabel(score, priority, urgency) {
        const impact = this.assistantImpactLabel(score);
        const urgencyLabel = this.assistantUrgencyLabel(priority, urgency).toUpperCase();
        return `${impact}, ${urgencyLabel} URGENCY`;
    }
    resolveRiskDiagnosticAction(item, actions) {
        const haystack = [item.label, item.impact, item.recommendedAction].join(' ').toLowerCase();
        if (haystack.includes('budget') || haystack.includes('confidence') || haystack.includes('evidence') || haystack.includes('qualification')) {
            return actions.find((action) => action.actionType === 'lead_qualification')?.title ?? null;
        }
        if (haystack.includes('timeline') || haystack.includes('engaged') || haystack.includes('stale') || haystack.includes('next step') || haystack.includes('discovery')) {
            return actions.find((action) => action.actionType === 'opportunity_recovery')?.title ?? null;
        }
        if (haystack.includes('approval') || haystack.includes('discount') || haystack.includes('policy')) {
            return actions.find((action) => action.actionType === 'approval_follow_up')?.title ?? null;
        }
        if (haystack.includes('sla') || haystack.includes('first-touch')) {
            return actions.find((action) => action.actionType === 'lead_follow_up')?.title ?? null;
        }
        if (haystack.includes('overdue') || haystack.includes('backlog') || haystack.includes('activity')) {
            return actions.find((action) => action.actionType === 'activity_cleanup')?.title ?? null;
        }
        return null;
    }
    assistantUrgencyClass(priority, urgency) {
        const normalizedUrgency = (urgency ?? '').trim().toLowerCase();
        if (normalizedUrgency === 'immediate') {
            return 'urgency-immediate';
        }
        if (normalizedUrgency === 'soon') {
            return 'urgency-soon';
        }
        if (normalizedUrgency === 'planned') {
            return 'urgency-planned';
        }
        const value = Number(priority ?? 0);
        if (value <= 1) {
            return 'urgency-immediate';
        }
        if (value <= 3) {
            return 'urgency-soon';
        }
        return 'urgency-planned';
    }
    assistantUrgencyLabel(priority, urgency) {
        const urgencyClass = this.assistantUrgencyClass(priority, urgency);
        const urgencyValue = (urgency ?? '').trim();
        if (urgencyValue.length > 0) {
            return urgencyValue.charAt(0).toUpperCase() + urgencyValue.slice(1).toLowerCase();
        }
        const fallbackUrgency = urgencyClass;
        if (fallbackUrgency === 'urgency-immediate') {
            return 'Immediate';
        }
        if (fallbackUrgency === 'urgency-soon') {
            return 'Soon';
        }
        return 'Planned';
    }
    isAssistantActionExpanded(actionId) {
        return this.assistantExpandedActionIds().includes(actionId);
    }
    toggleAssistantActionExpansion(actionId) {
        const current = this.assistantExpandedActionIds();
        if (current.includes(actionId)) {
            this.assistantExpandedActionIds.set(current.filter((id) => id !== actionId));
            return;
        }
        this.assistantExpandedActionIds.set([...current, actionId]);
    }
    expandAllAssistantActions() {
        this.assistantExpandedActionIds.set(this.assistantActions().map((action) => action.id));
    }
    collapseAllAssistantActions() {
        this.assistantExpandedActionIds.set([]);
    }
    openAssistantDetailDialog(action) {
        this.assistantDetailAction = action;
        this.assistantDetailDialogOpen = true;
    }
    closeAssistantDetailDialog() {
        this.assistantDetailDialogOpen = false;
        this.assistantDetailAction = null;
    }
    runAssistantActionFromDetail() {
        if (!this.assistantDetailAction) {
            return;
        }
        const action = this.assistantDetailAction;
        this.closeAssistantDetailDialog();
        this.openAssistantAction(action);
    }
    openAssistantAction(action) {
        const risk = (action.riskTier ?? '').toLowerCase();
        if (risk === 'medium' || risk === 'high') {
            this.pendingAssistantAction = action;
            this.assistantReviewNote = '';
            this.assistantReviewDialogOpen = true;
            return;
        }
        this.dashboardData.executeAssistantAction(action)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (result) => {
                this.toastService.show('success', result.message || 'Action executed.');
                if (result.createdActivityId && (action.riskTier ?? '').toLowerCase() === 'low') {
                    this.showAssistantUndo(action, result.createdActivityId);
                }
                this.dashboardData.getAssistantInsights()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((insights) => {
                    this.assistantInsightsSignal.set(insights ?? this.emptyAssistantInsights);
                    this.assistantExpandedActionIds.set([]);
                });
                this.navigateAssistantAction(action);
            },
            error: () => this.toastService.show('error', 'Unable to execute assistant action.')
        });
    }
    submitAssistantReview(approved) {
        const action = this.pendingAssistantAction;
        if (!action || this.assistantReviewSubmitting) {
            return;
        }
        this.assistantReviewSubmitting = true;
        this.dashboardData.reviewAssistantAction(action, approved, this.assistantReviewNote)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (result) => {
                this.assistantReviewSubmitting = false;
                this.assistantReviewDialogOpen = false;
                this.pendingAssistantAction = null;
                this.assistantReviewNote = '';
                this.toastService.show('success', result.message || (approved ? 'Action approved.' : 'Action rejected.'));
                this.dashboardData.getAssistantInsights()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((insights) => {
                    this.assistantInsightsSignal.set(insights ?? this.emptyAssistantInsights);
                    this.assistantExpandedActionIds.set([]);
                });
                if (approved) {
                    this.navigateAssistantAction(action);
                }
            },
            error: () => {
                this.assistantReviewSubmitting = false;
                this.toastService.show('error', 'Unable to submit review decision.');
            }
        });
    }
    cancelAssistantReview() {
        this.assistantReviewDialogOpen = false;
        this.pendingAssistantAction = null;
        this.assistantReviewNote = '';
    }
    undoAssistantAction() {
        if (!this.assistantUndoActivityId || this.assistantUndoBusy) {
            return;
        }
        this.assistantUndoBusy = true;
        this.dashboardData.undoAssistantAction(this.assistantUndoActivityId, this.assistantUndoActionType ?? undefined)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (result) => {
                this.assistantUndoBusy = false;
                this.assistantUndoVisible = false;
                this.assistantUndoMessage = '';
                this.assistantUndoActivityId = null;
                this.assistantUndoActionType = null;
                if (this.assistantUndoTimerId !== null) {
                    window.clearTimeout(this.assistantUndoTimerId);
                    this.assistantUndoTimerId = null;
                }
                this.toastService.show('success', result.message || 'Action undone.');
                this.dashboardData.getAssistantInsights()
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((insights) => {
                    this.assistantInsightsSignal.set(insights ?? this.emptyAssistantInsights);
                    this.assistantExpandedActionIds.set([]);
                });
            },
            error: () => {
                this.assistantUndoBusy = false;
                this.toastService.show('error', 'Unable to undo action.');
            }
        });
    }
    navigateAssistantAction(action) {
        const entityType = (action.entityType ?? '').toLowerCase();
        if (entityType === 'lead') {
            this.router.navigate(['/app/leads']);
            return;
        }
        if (entityType === 'opportunity') {
            this.router.navigate(['/app/deals']);
            return;
        }
        if (entityType === 'activity') {
            this.router.navigate(['/app/activities']);
            return;
        }
        if (entityType === 'approval') {
            this.router.navigate(['/app/workflows']);
            return;
        }
        this.router.navigate(['/app/dashboard']);
    }
    showAssistantUndo(action, createdActivityId) {
        this.assistantUndoVisible = true;
        this.assistantUndoBusy = false;
        this.assistantUndoActivityId = createdActivityId;
        this.assistantUndoActionType = action.actionType;
        this.assistantUndoMessage = `${action.title} executed.`;
        if (this.assistantUndoTimerId !== null) {
            window.clearTimeout(this.assistantUndoTimerId);
        }
        this.assistantUndoTimerId = window.setTimeout(() => {
            this.assistantUndoVisible = false;
            this.assistantUndoActivityId = null;
            this.assistantUndoActionType = null;
            this.assistantUndoMessage = '';
            this.assistantUndoTimerId = null;
        }, 60_000);
    }
    emitRiskAlerts(summary) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const today = new Date().toISOString().slice(0, 10);
        const missingNextStep = summary.opportunitiesWithoutNextStep ?? 0;
        const idleDeals = summary.atRiskDeals?.filter((deal) => deal.reason?.toLowerCase().includes('no recent activity')).length ?? 0;
        const state = this.readRiskAlertState();
        const alreadyShown = state?.date === today;
        const shouldShowMissing = missingNextStep > 0 && (!alreadyShown || (state?.missingNextStep ?? 0) < missingNextStep);
        const shouldShowIdle = idleDeals > 0 && (!alreadyShown || (state?.idleDeals ?? 0) < idleDeals);
        if (!shouldShowMissing && !shouldShowIdle) {
            return;
        }
        if (shouldShowMissing) {
            this.notificationService.warning('Missing next steps', `${missingNextStep} opportunity${missingNextStep === 1 ? '' : 'ies'} has no next step.`);
        }
        if (shouldShowIdle) {
            this.notificationService.warning('Idle deals', `${idleDeals} opportunity${idleDeals === 1 ? '' : 'ies'} has no activity in the last 30 days.`);
        }
        this.persistRiskAlertState({
            date: today,
            missingNextStep: Math.max(state?.missingNextStep ?? 0, missingNextStep),
            idleDeals: Math.max(state?.idleDeals ?? 0, idleDeals)
        });
    }
    expansionSignalsCount() {
        return this.expansionSignals().length;
    }
    isExpansionSubmitting(signal) {
        return !!this.expansionSubmitting()[signal.opportunityId];
    }
    createExpansionOpportunity(signal) {
        if (signal.hasExpansionOpportunity || this.isExpansionSubmitting(signal)) {
            return;
        }
        this.expansionSubmitting.update((current) => ({
            ...current,
            [signal.opportunityId]: true
        }));
        this.opportunityData.createExpansion(signal.opportunityId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.expansionSignals.update((current) => current.map((item) => item.opportunityId === signal.opportunityId
                    ? { ...item, hasExpansionOpportunity: true }
                    : item));
                this.expansionSubmitting.update((current) => ({
                    ...current,
                    [signal.opportunityId]: false
                }));
                this.toastService.show('success', 'Expansion opportunity created.', 3000);
            },
            error: () => {
                this.expansionSubmitting.update((current) => ({
                    ...current,
                    [signal.opportunityId]: false
                }));
                this.toastService.show('error', 'Unable to create expansion opportunity.', 3000);
            }
        });
    }
    loadExpansionSignals() {
        this.expansionLoading.set(true);
        this.opportunityData.getExpansionSignals()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (signals) => {
                this.expansionSignals.set(signals ?? []);
                this.expansionLoading.set(false);
            },
            error: () => {
                this.expansionLoading.set(false);
                this.toastService.show('error', 'Unable to load expansion signals.', 3000);
            }
        });
    }
    loadPendingDecisionInbox() {
        this.approvalService
            .getInbox('Pending')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (items) => {
                this.pendingDecisionInbox.set(items ?? []);
            },
            error: () => {
                this.pendingDecisionInbox.set([]);
            }
        });
    }
    readRiskAlertState() {
        try {
            const raw = localStorage.getItem('crm_risk_alerts_state');
            if (!raw)
                return null;
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    persistRiskAlertState(state) {
        try {
            localStorage.setItem('crm_risk_alerts_state', JSON.stringify(state));
        }
        catch {
            // ignore storage errors
        }
    }
    loadServerLayout() {
        this.dashboardData.getLayout().subscribe(({ cardOrder, sizes, dimensions, hiddenCards }) => {
            const dashpackOrder = this.getLayoutDefaultOrder();
            const fallbackPackOrder = this.cardCatalog.map((card) => card.id);
            const normalizedServer = this.applyRoleDefault(this.normalizeLayoutWithHidden(cardOrder, hiddenCards, dashpackOrder), dashpackOrder);
            const normalized = this.resolveLayoutOrderByPriority(dashpackOrder, normalizedServer, fallbackPackOrder);
            const serverHasState = (hiddenCards?.length ?? 0) > 0
                || Object.keys(sizes ?? {}).length > 0
                || Object.keys(dimensions ?? {}).length > 0
                || !this.areArraysEqual(normalizedServer, dashpackOrder);
            if (this.hasLocalLayoutPreference && !serverHasState && this.roleDefaultLayout.length === 0) {
                this.dashboardData.saveLayout(this.buildLayoutPayload()).subscribe();
                return;
            }
            setTimeout(() => {
                this.layoutOrder = normalized;
                this.layoutSizes = this.buildDefaultSizeMap();
                const serverDimensions = dimensions ?? {};
                this.layoutDimensions = Object.keys(serverDimensions).length > 0
                    ? serverDimensions
                    : (this.layoutDimensions ?? {});
                this.persistLayoutPreferences();
                this.refreshSelectableCards();
            }, 0);
        });
    }
    openLayoutDialog() {
        const defaultOrder = this.getLayoutDefaultOrder();
        // Ensure the dialog cannot show cards outside the current role pack.
        this.layoutOrder = this.applyRoleDefault(this.normalizeLayout(this.layoutOrder, defaultOrder), defaultOrder);
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
        this.layoutDialogOpen = true;
    }
    getSelectableCards() {
        const byId = new Map(this.cardCatalog.map(card => [card.id, card]));
        const allowedOrder = this.getLayoutDefaultOrder();
        return allowedOrder
            .map(id => byId.get(id))
            .filter((card) => !!card);
    }
    isCardVisible(cardId) {
        return this.layoutOrder.includes(cardId);
    }
    onCardVisibilityChange(cardId, visible) {
        // Keep the layout list as the single source of truth for which cards are displayed.
        const defaultOrder = this.getLayoutDefaultOrder();
        const nextOrder = visible
            ? this.insertCardByPrimaryOrder(this.layoutOrder, cardId, defaultOrder)
            : this.layoutOrder.filter(id => id !== cardId);
        this.layoutOrder = nextOrder;
        if (!visible) {
            delete this.layoutSizes[cardId];
            delete this.layoutDimensions[cardId];
        }
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDraft = this.getOrderedCards(this.layoutOrder);
        this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
            next: response => {
                const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
                this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
                    ? normalized
                    : this.normalizeLayout(nextOrder, defaultOrder);
                this.layoutSizes = this.buildDefaultSizeMap();
                this.layoutDimensions = response.dimensions ?? {};
                this.persistLayoutPreferences();
                this.layoutDraft = this.getOrderedCards(this.layoutOrder);
            },
            error: () => {
                this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
                this.ensureSizeDefaults();
                this.persistLayoutPreferences();
                this.layoutDraft = this.getOrderedCards(this.layoutOrder);
            }
        });
    }
    saveLayout() {
        const order = this.layoutDraft.map(item => item.id);
        const defaultOrder = this.getLayoutDefaultOrder();
        const requested = order.length === 0 ? [] : this.normalizeLayout(order, defaultOrder);
        this.layoutOrder = requested;
        this.ensureSizeDefaults();
        this.persistLayoutPreferences();
        this.layoutDialogOpen = false;
        this.dashboardData.saveLayout(this.buildLayoutPayload(requested)).subscribe({
            next: response => {
                const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
                this.layoutOrder = this.shouldHonorServerLayout(normalized, requested, defaultOrder)
                    ? normalized
                    : requested;
                this.layoutSizes = this.buildDefaultSizeMap();
                this.layoutDimensions = response.dimensions ?? {};
                this.persistLayoutPreferences();
                this.toastService.show('success', 'Layout saved.', 2500);
            },
            error: () => {
                this.layoutOrder = requested;
                this.ensureSizeDefaults();
                this.persistLayoutPreferences();
                this.toastService.show('error', 'Unable to save layout.', 3000);
            }
        });
    }
    resetLayout() {
        this.dashboardData.resetLayout().subscribe({
            next: response => {
                const defaultOrder = this.getLayoutDefaultOrder();
                const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
                this.roleDefaultLayout = [...normalized];
                const hidden = response.hiddenCards ?? [];
                this.roleDefaultHiddenCharts = new Set(hidden.filter((id) => this.chartIdTypeGuard(id)));
                this.layoutOrder = normalized;
                this.layoutSizes = this.buildDefaultSizeMap();
                this.layoutDimensions = response.dimensions ?? {};
                this.activePackName.set(this.resolvePackName(response.packName, response.roleLevel ?? this.roleDefaultLevel));
                this.persistLayoutPreferences();
                this.layoutDraft = this.getOrderedCards(this.layoutOrder);
                this.resetChartPreference();
                this.applyRoleDefaultCharts();
                this.refreshSelectableCharts();
            },
            error: () => {
                const fallbackOrder = this.getLayoutDefaultOrder();
                this.layoutOrder = this.normalizeLayout(fallbackOrder, fallbackOrder);
                this.ensureSizeDefaults();
                this.persistLayoutPreferences();
                this.layoutDraft = this.getOrderedCards(this.layoutOrder);
                this.resetChartPreference();
                this.applyRoleDefaultCharts();
            }
        });
    }
    onCardDrop(event) {
        if (event.previousIndex === event.currentIndex)
            return;
        const nextOrder = [...this.layoutOrder];
        moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
        this.layoutOrder = nextOrder;
        this.persistLayoutPreferences();
        this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
            next: response => {
                const defaultOrder = this.getLayoutDefaultOrder();
                const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
                this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
                    ? normalized
                    : this.normalizeLayout(nextOrder, defaultOrder);
                this.layoutSizes = this.buildDefaultSizeMap();
                this.layoutDimensions = {};
                this.persistLayoutPreferences();
            },
            error: () => {
                const defaultOrder = this.getLayoutDefaultOrder();
                this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
                this.persistLayoutPreferences();
            }
        });
    }
    onLayoutDraftDrop(event) {
        if (event.previousIndex === event.currentIndex)
            return;
        const nextDraft = [...this.layoutDraft];
        moveItemInArray(nextDraft, event.previousIndex, event.currentIndex);
        this.layoutDraft = nextDraft;
    }
    hideCard(cardId) {
        const nextOrder = this.layoutOrder.filter(id => id !== cardId);
        this.layoutOrder = nextOrder;
        delete this.layoutSizes[cardId];
        delete this.layoutDimensions[cardId];
        this.persistLayoutPreferences();
        this.dashboardData.saveLayout(this.buildLayoutPayload(nextOrder)).subscribe({
            next: response => {
                const defaultOrder = this.getLayoutDefaultOrder();
                const normalized = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, defaultOrder);
                this.layoutOrder = this.shouldHonorServerLayout(normalized, nextOrder, defaultOrder)
                    ? normalized
                    : this.normalizeLayout(nextOrder, defaultOrder);
                this.layoutSizes = this.buildDefaultSizeMap();
                this.layoutDimensions = {};
                this.persistLayoutPreferences();
            },
            error: () => {
                const defaultOrder = this.getLayoutDefaultOrder();
                this.layoutOrder = this.normalizeLayout(nextOrder, defaultOrder);
                this.persistLayoutPreferences();
            }
        });
    }
    hideChart(chartKey) {
        if (this.roleDefaultHiddenCharts.has(chartKey)) {
            return;
        }
        if (chartKey === 'revenue') {
            this.showRevenueChart = false;
            this.persistChartVisibility();
            return;
        }
        this.showCustomerGrowthChart = false;
        this.persistChartVisibility();
    }
    saveRoleDefaultLayout() {
        if (!this.roleDefaultLevel) {
            this.toastService.show('error', 'Hierarchy level is not configured for your role.', 3500);
            return;
        }
        const order = this.layoutDraft.map(item => item.id);
        const requested = order.length === 0 ? [] : this.normalizeLayout(order, this.cardCatalog.map(card => card.id));
        const payload = this.buildDefaultLayoutPayload(requested);
        this.dashboardData.saveDefaultLayout({ roleLevel: this.roleDefaultLevel, ...payload }).subscribe({
            next: response => {
                const canonical = this.cardCatalog.map((card) => card.id);
                const normalizedDefault = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, canonical);
                this.roleDefaultLayout = normalizedDefault;
                const hidden = response.hiddenCards ?? [];
                this.roleDefaultHiddenCharts = new Set(hidden.filter((id) => this.chartIdTypeGuard(id)));
                this.applyRoleDefaultCharts();
                this.refreshSelectableCharts();
                this.layoutOrder = this.resolveLayoutOrderByPriority(normalizedDefault, this.layoutOrder, canonical);
                this.layoutDraft = this.getOrderedCards(this.layoutOrder);
                this.refreshSelectableCards();
                this.toastService.show('success', `Default layout saved for H${this.roleDefaultLevel}.`, 3000);
            },
            error: () => {
                this.toastService.show('error', 'Unable to save role default layout.', 3500);
            }
        });
    }
    onChartDrop(event) {
        if (event.previousIndex === event.currentIndex)
            return;
        const nextOrder = [...this.chartOrder];
        moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
        this.chartOrder = nextOrder;
        this.persistChartVisibility();
    }
    onKpiDrop(event) {
        if (event.previousIndex === event.currentIndex)
            return;
        const nextOrder = [...this.kpiOrder()];
        moveItemInArray(nextOrder, event.previousIndex, event.currentIndex);
        this.kpiOrder.set(nextOrder);
        this.persistKpiOrder();
    }
    onCardDragStart(event) {
        const element = event.source.element.nativeElement;
        const rect = element.getBoundingClientRect();
        // Freeze preview size so cards don't inflate while dragging.
        element.style.setProperty('--drag-width', `${Math.round(rect.width)}px`);
        element.style.setProperty('--drag-height', `${Math.round(rect.height)}px`);
    }
    onCardDragEnd(event) {
        const element = event.source.element.nativeElement;
        // Clean up drag sizing vars after drop so layout stays responsive.
        element.style.removeProperty('--drag-width');
        element.style.removeProperty('--drag-height');
    }
    startResize(event, element, handle) {
        const cardId = element.dataset['cardId'] ?? null;
        if (!cardId) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const rect = element.getBoundingClientRect();
        const baseMinWidth = Number(element.dataset['minWidth'] ?? 260);
        const baseMinHeight = Number(element.dataset['minHeight'] ?? 220);
        // Respect the rendered content so cards cannot be resized smaller than what they display.
        const contentConstraints = this.getCardContentConstraints(element);
        const minWidth = Math.max(baseMinWidth, contentConstraints.minWidth);
        const minHeight = Math.max(baseMinHeight, contentConstraints.minHeight);
        // Cap growth to the available grid / metrics-grid width.
        const grid = (element.closest('.dashboard-card-grid') ?? element.closest('.metrics-grid'));
        const gridRect = grid?.getBoundingClientRect();
        const maxWidth = Math.max(minWidth, Math.floor(gridRect?.width ?? window.innerWidth));
        const maxHeight = Math.max(minHeight, Math.floor(gridRect?.height ?? window.innerHeight));
        this.resizeState = {
            element,
            cardId,
            handle,
            startX: event.clientX,
            startY: event.clientY,
            startWidth: rect.width,
            startHeight: rect.height,
            minWidth,
            minHeight,
            maxWidth,
            maxHeight
        };
        element.classList.add('is-resizing');
        window.addEventListener('mousemove', this.onResizeMove);
        window.addEventListener('mouseup', this.onResizeEnd);
    }
    handleResizeMove(event) {
        if (!this.resizeState)
            return;
        const { element, handle, startX, startY, startWidth, startHeight, minWidth, minHeight, maxWidth, maxHeight } = this.resizeState;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        let nextWidth = startWidth;
        let nextHeight = startHeight;
        if (handle.includes('e')) {
            nextWidth = startWidth + dx;
        }
        if (handle.includes('w')) {
            nextWidth = startWidth - dx;
        }
        if (handle.includes('s')) {
            nextHeight = startHeight + dy;
        }
        if (handle.includes('n')) {
            nextHeight = startHeight - dy;
        }
        nextWidth = Math.min(maxWidth, Math.max(minWidth, nextWidth));
        nextHeight = Math.min(maxHeight, Math.max(minHeight, nextHeight));
        element.style.width = `${nextWidth}px`;
        element.style.height = `${nextHeight}px`;
        if (element.closest('.metrics-grid')) {
            element.style.flex = 'none';
        }
    }
    stopResize() {
        if (!this.resizeState)
            return;
        const { element, cardId } = this.resizeState;
        element.classList.remove('is-resizing');
        if (cardId) {
            const rect = element.getBoundingClientRect();
            this.layoutDimensions = {
                ...this.layoutDimensions,
                [cardId]: { width: Math.round(rect.width), height: Math.round(rect.height) }
            };
            this.persistLayoutPreferences();
            this.dashboardData.saveLayout(this.buildLayoutPayload()).subscribe({
                next: response => {
                    this.layoutOrder = this.normalizeLayoutWithHidden(response.cardOrder, response.hiddenCards, this.layoutOrder);
                    this.layoutSizes = this.buildDefaultSizeMap();
                    this.layoutDimensions = response.dimensions ?? {};
                    this.persistLayoutPreferences();
                },
                error: () => {
                    // Keep local changes if server update fails.
                }
            });
        }
        this.resizeState = null;
        window.removeEventListener('mousemove', this.onResizeMove);
        window.removeEventListener('mouseup', this.onResizeEnd);
    }
    getCardContentConstraints(element) {
        // Measure header + body so cards keep enough room for their visible content.
        const header = element.querySelector('.card-header');
        const body = element.querySelector('.card-body');
        const headerWidth = header?.scrollWidth ?? 0;
        const bodyWidth = body?.scrollWidth ?? 0;
        const minWidth = Math.ceil(Math.max(headerWidth, bodyWidth, element.scrollWidth));
        const headerHeight = header?.scrollHeight ?? 0;
        const bodyHeight = body?.scrollHeight ?? 0;
        const minHeight = Math.ceil(Math.max(headerHeight + bodyHeight, element.scrollHeight));
        return { minWidth, minHeight };
    }
    loadChartVisibility() {
        if (!isPlatformBrowser(this.platformId))
            return;
        try {
            const raw = window.localStorage.getItem(this.chartVisibilityStorageKey);
            if (!raw)
                return;
            const parsed = JSON.parse(raw);
            if (typeof parsed.revenue === 'boolean')
                this.showRevenueChart = parsed.revenue;
            if (typeof parsed.growth === 'boolean')
                this.showCustomerGrowthChart = parsed.growth;
            if (Array.isArray(parsed.order)) {
                const filtered = parsed.order.filter(item => this.chartIdTypeGuard(item));
                if (filtered.length) {
                    this.chartOrder = filtered;
                }
            }
            this.hasLocalChartPreference = true;
        }
        catch {
            // Ignore invalid local storage values.
        }
    }
    persistChartVisibility() {
        if (!isPlatformBrowser(this.platformId))
            return;
        const payload = {
            revenue: this.showRevenueChart,
            growth: this.showCustomerGrowthChart,
            order: this.chartOrder
        };
        window.localStorage.setItem(this.chartVisibilityStorageKey, JSON.stringify(payload));
        this.hasLocalChartPreference = true;
    }
    loadKpiOrder() {
        if (!isPlatformBrowser(this.platformId))
            return [...this.defaultKpiOrder];
        try {
            const stored = window.localStorage.getItem(this.kpiOrderStorageKey);
            if (!stored)
                return [...this.defaultKpiOrder];
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
                const allowed = new Set(this.defaultKpiOrder);
                const filtered = parsed.filter((item) => allowed.has(item));
                const missing = this.defaultKpiOrder.filter(item => !filtered.includes(item));
                const resolved = [...filtered, ...missing];
                if (resolved.length) {
                    return resolved;
                }
            }
        }
        catch {
            // Ignore invalid local storage values.
        }
        return [...this.defaultKpiOrder];
    }
    persistKpiOrder() {
        if (!isPlatformBrowser(this.platformId))
            return;
        window.localStorage.setItem(this.kpiOrderStorageKey, JSON.stringify(this.kpiOrder()));
    }
    getCardSizeClass(cardId) {
        return `size-${this.layoutSizes[cardId] ?? this.defaultCardSizes[cardId] ?? 'md'}`;
    }
    getChartSizeClass(chartId) {
        return `size-${this.layoutSizes[chartId] ?? this.defaultChartSizes[chartId] ?? 'md'}`;
    }
    getCardDimensions(cardId) {
        const dimensions = this.layoutDimensions[cardId];
        if (!dimensions)
            return null;
        const style = { width: `${dimensions.width}px`, height: `${dimensions.height}px` };
        if (cardId.startsWith('kpi-')) {
            style['flex'] = 'none';
        }
        return style;
    }
    toggleCardSize(cardId) {
        // Resizing/maximizing is disabled; keep sizes locked to defaults.
    }
    isChartVisible(chartId) {
        return chartId === 'revenue' ? this.showRevenueChart : this.showCustomerGrowthChart;
    }
    onChartVisibilityChange(chartId, visible) {
        if (visible && this.roleDefaultHiddenCharts.has(chartId)) {
            return;
        }
        if (chartId === 'revenue') {
            this.showRevenueChart = visible;
        }
        else {
            this.showCustomerGrowthChart = visible;
        }
        this.persistChartVisibility();
    }
    setPriorityFilter(filter) {
        this.priorityFilter.set(this.priorityFilter() === filter ? 'all' : filter);
    }
    onPriorityComplete(item) {
        if (item.type === 'task') {
            this.router.navigate(['/app/activities', item.id, 'edit']);
            return;
        }
        if (item.type === 'lead') {
            const subject = item.title ? `Follow up: ${item.title}` : 'Lead follow-up';
            this.router.navigate(['/app/activities/new'], {
                queryParams: {
                    relatedType: 'Lead',
                    relatedId: item.id,
                    subject,
                    leadFirstTouchDueAtUtc: item.leadFirstTouchDueAtUtc ?? undefined
                }
            });
            return;
        }
        if (item.type === 'decision') {
            this.router.navigate(['/app/decisions'], {
                queryParams: {
                    status: 'Pending',
                    focus: item.id
                }
            });
            return;
        }
        const subject = item.title ? `Follow up: ${item.title}` : 'Opportunity follow-up';
        this.router.navigate(['/app/activities/new'], {
            queryParams: {
                relatedType: 'Opportunity',
                relatedId: item.id,
                subject
            }
        });
    }
    openCostBreakdownDialog() {
        this.costBreakdownDialogOpen = true;
    }
    closeCostBreakdownDialog() {
        this.costBreakdownDialogOpen = false;
    }
    toggleCostBreakdownSortDirection() {
        this.costBreakdownSortDirection = this.costBreakdownSortDirection === 'asc' ? 'desc' : 'asc';
    }
    costBreakdownSorted() {
        const items = [...(this.summary()?.costOfNotKnowingBreakdown ?? [])];
        const direction = this.costBreakdownSortDirection === 'asc' ? 1 : -1;
        const key = this.costBreakdownSortKey;
        return items.sort((a, b) => {
            if (key === 'name') {
                return a.opportunityName.localeCompare(b.opportunityName) * direction;
            }
            if (key === 'stage') {
                return a.stage.localeCompare(b.stage) * direction;
            }
            if (key === 'amount') {
                return (a.amount - b.amount) * direction;
            }
            return (a.costOfNotKnowingValue - b.costOfNotKnowingValue) * direction;
        });
    }
    initCharts(summary) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = '#64748b';
        const textColorSecondary = '#94a3b8';
        const surfaceBorder = 'rgba(148, 163, 184, 0.1)';
        // Gradient colors
        const primaryColor = '#667eea';
        const cyanColor = '#06b6d4';
        const purpleColor = '#a855f7';
        const successColor = '#22c55e';
        const orangeColor = '#f97316';
        const revenueSeries = summary.revenueByMonth;
        const customerSeries = summary.customerGrowth;
        const conversionSeries = summary.conversionTrend.length
            ? summary.conversionTrend
            : [
                { label: 'W1', value: 18 },
                { label: 'W2', value: 22 },
                { label: 'W3', value: 20 },
                { label: 'W4', value: 28 },
                { label: 'W5', value: 32 },
                { label: 'W6', value: 38 }
            ];
        const costTrendSeries = summary.costOfNotKnowingTrend ?? [];
        const pipelineSeries = summary.pipelineValue.length
            ? summary.pipelineValue
            : [
                { stage: 'Qualification', count: 0, value: 0 },
                { stage: 'Proposal', count: 0, value: 0 },
                { stage: 'Negotiation', count: 0, value: 0 },
                { stage: 'Closed Won', count: 0, value: 0 }
            ];
        const activitySeries = summary.activityBreakdown.length
            ? summary.activityBreakdown
            : [
                { type: 'Call', count: 0, percentage: 0 },
                { type: 'Email', count: 0, percentage: 0 },
                { type: 'Meeting', count: 0, percentage: 0 },
                { type: 'Task', count: 0, percentage: 0 }
            ];
        // Revenue Chart (Area)
        this.revenueChartData = {
            labels: revenueSeries.map(item => item.label),
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueSeries.map(item => Number(item.value)),
                    fill: true,
                    borderColor: primaryColor,
                    backgroundColor: this.createGradient(primaryColor, 0.3),
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: primaryColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        };
        this.revenueChartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: (ctx) => `$${ctx.raw.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColorSecondary }
                },
                y: {
                    grid: { color: surfaceBorder },
                    ticks: {
                        color: textColorSecondary,
                        callback: (value) => `$${(value / 1000)}k`
                    }
                }
            }
        };
        // Customer Growth (Bar)
        this.customerGrowthData = {
            labels: customerSeries.map(item => item.label),
            datasets: [
                {
                    label: 'New Customers',
                    data: customerSeries.map(item => Number(item.value)),
                    backgroundColor: [
                        `${cyanColor}cc`,
                        `${primaryColor}cc`,
                        `${purpleColor}cc`,
                        `${successColor}cc`,
                        `${primaryColor}cc`,
                        `${cyanColor}cc`
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        };
        this.customerGrowthOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColorSecondary }
                },
                y: {
                    grid: { color: surfaceBorder },
                    ticks: { color: textColorSecondary }
                }
            }
        };
        // Activity Donut
        this.activityDonutData = {
            labels: activitySeries.map(item => `${item.type}${item.type.endsWith('s') ? '' : 's'}`),
            datasets: [
                {
                    data: activitySeries.map(item => item.percentage ?? item.count),
                    backgroundColor: [cyanColor, purpleColor, primaryColor, successColor],
                    borderWidth: 0,
                    hoverOffset: 8
                }
            ]
        };
        this.activityDonutOptions = {
            cutout: '70%',
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 16,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${ctx.raw}%`
                    }
                }
            }
        };
        // Pipeline Chart (Horizontal Bar)
        this.pipelineChartData = {
            labels: pipelineSeries.map(item => item.stage),
            datasets: [
                {
                    label: 'Value',
                    data: pipelineSeries.map(item => Number(item.value)),
                    backgroundColor: [
                        cyanColor,
                        purpleColor,
                        orangeColor,
                        successColor
                    ],
                    borderRadius: 6,
                    borderSkipped: false
                }
            ]
        };
        this.pipelineChartOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (ctx) => `$${ctx.raw.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: surfaceBorder },
                    ticks: {
                        color: textColorSecondary,
                        callback: (value) => `$${(value / 1000)}k`
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: textColor, font: { weight: 500 } }
                }
            }
        };
        // Conversion Trend (Line)
        this.conversionChartData = {
            labels: conversionSeries.map(item => item.label),
            datasets: [
                {
                    label: 'Conversion Rate',
                    data: conversionSeries.map(item => Number(item.value)),
                    fill: false,
                    borderColor: successColor,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: successColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        };
        this.conversionChartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (ctx) => `${ctx.raw}%`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColorSecondary }
                },
                y: {
                    grid: { color: surfaceBorder },
                    ticks: {
                        color: textColorSecondary,
                        callback: (value) => `${value}%`
                    },
                    min: 0,
                    max: 50
                }
            }
        };
        // Cost of Not Knowing Trend (Line)
        this.costTrendChartData = {
            labels: costTrendSeries.map(item => item.label),
            datasets: [
                {
                    label: 'Exposure',
                    data: costTrendSeries.map(item => Number(item.value)),
                    fill: false,
                    borderColor: orangeColor,
                    tension: 0.35,
                    borderWidth: 3,
                    pointBackgroundColor: orangeColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        };
        this.costTrendChartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1e293b',
                    bodyColor: '#64748b',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: (ctx) => `${this.formatCurrency(ctx.raw)}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColorSecondary }
                },
                y: {
                    grid: { color: surfaceBorder },
                    ticks: {
                        color: textColorSecondary,
                        callback: (value) => `$${(value / 1000)}k`
                    }
                }
            }
        };
    }
    loadLayoutPreferences() {
        const defaultOrder = this.getLayoutDefaultOrder();
        if (!isPlatformBrowser(this.platformId)) {
            return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
        }
        try {
            const stored = window.localStorage.getItem(this.layoutStorageKey);
            if (!stored) {
                return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
            }
            const parsed = JSON.parse(stored);
            const dimensions = parsed?.dimensions ?? {};
            const hasLocalPreference = Object.keys(dimensions).length > 0;
            return { order: defaultOrder, sizes: {}, dimensions, hasLocalPreference };
        }
        catch {
            return { order: defaultOrder, sizes: {}, dimensions: {}, hasLocalPreference: false };
        }
    }
    persistLayoutPreferences() {
        if (!isPlatformBrowser(this.platformId))
            return;
        window.localStorage.setItem(this.layoutStorageKey, JSON.stringify({
            dimensions: this.layoutDimensions ?? {}
        }));
        this.hasLocalLayoutPreference = Object.keys(this.layoutDimensions ?? {}).length > 0;
    }
    shouldHonorServerLayout(serverOrder, requestedOrder, defaultOrder) {
        if (requestedOrder.length === 0 && serverOrder.length > 0)
            return false;
        if (requestedOrder.some(id => !serverOrder.includes(id)))
            return false;
        if (!this.hasLocalLayoutPreference)
            return true;
        if (this.areArraysEqual(serverOrder, requestedOrder))
            return true;
        return !this.areArraysEqual(serverOrder, defaultOrder);
    }
    ensureSizeDefaults() {
        // Force locked sizes regardless of previous server data.
        this.layoutSizes = this.buildDefaultSizeMap();
    }
    areArraysEqual(a, b) {
        if (a.length !== b.length)
            return false;
        return a.every((value, index) => value === b[index]);
    }
    createGradient(color, alpha) {
        return `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
    }
    statusSeverity(status) {
        switch (status) {
            case 'Lead':
                return 'info';
            case 'Prospect':
                return 'warn';
            default:
                return 'info';
        }
    }
    activitySeverity(status) {
        if (status === 'Overdue')
            return 'danger';
        if (status === 'Upcoming')
            return 'info';
        return 'info';
    }
    getFunnelWidth(index) {
        const widths = [100, 75, 50];
        return widths[index] ?? 50;
    }
    getConversionRate(index) {
        const breakdown = this.customerBreakdown();
        if (index >= breakdown.length - 1)
            return 0;
        const current = breakdown[index].value;
        const next = breakdown[index + 1].value;
        if (current === 0)
            return 0;
        return Math.round((next / current) * 100);
    }
    getTotalConversion() {
        const breakdown = this.customerBreakdown();
        if (breakdown.length < 2)
            return 0;
        const first = breakdown[0].value;
        const last = breakdown[breakdown.length - 1].value;
        if (first === 0)
            return 0;
        return Math.round((last / first) * 100);
    }
    getHealthProgress() {
        const completion = this.activityStats().completion;
        const circumference = 2 * Math.PI * 54;
        const progress = (completion / 100) * circumference;
        return `${progress} ${circumference}`;
    }
    getActivityIcon(type) {
        const icons = {
            'Call': 'pi-phone',
            'Email': 'pi-envelope',
            'Meeting': 'pi-video',
            'Task': 'pi-check-square'
        };
        return icons[type] || 'pi-circle';
    }
    getActivityColor(type) {
        const colors = {
            'Call': 'cyan',
            'Email': 'purple',
            'Meeting': 'primary',
            'Task': 'success'
        };
        return colors[type] || 'primary';
    }
    getTaskDueLabel(task) {
        if (!task.dueDateUtc) {
            return 'No due date';
        }
        const due = this.parseUtcDate(task.dueDateUtc);
        const today = new Date();
        const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0)
            return 'Overdue';
        if (diffDays === 0)
            return 'Due today';
        if (diffDays === 1)
            return 'Due tomorrow';
        if (diffDays <= 7)
            return `Due in ${diffDays} days`;
        return `Due ${due.toLocaleDateString()}`;
    }
    asLocalDate(value) {
        if (!value) {
            return null;
        }
        // Normalize backend timestamps before DatePipe renders them in local time.
        return value instanceof Date ? value : this.parseUtcDate(value);
    }
    formatTruthCoverage(value) {
        if (value === null || value === undefined) {
            return '--';
        }
        return `${Math.round(value * 100)}%`;
    }
    formatTimeToTruth(value) {
        if (value === null || value === undefined) {
            return '--';
        }
        return `${value.toFixed(1)}d`;
    }
    getTaskDueClass(task) {
        if (!task.dueDateUtc) {
            return 'due-neutral';
        }
        const due = this.parseUtcDate(task.dueDateUtc);
        const today = new Date();
        const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0)
            return 'due-overdue';
        if (diffDays === 0)
            return 'due-today';
        if (diffDays <= 7)
            return 'due-soon';
        return 'due-upcoming';
    }
    getTaskPriorityLabel(task) {
        return task.priority ?? 'Normal';
    }
    getTaskSummaryCounts() {
        // Use UTC parsing to keep date buckets consistent across browsers.
        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return this.myTasks().reduce((acc, task) => {
            if (!task.dueDateUtc)
                return acc;
            const due = this.parseUtcDate(task.dueDateUtc);
            const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
            const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays < 0)
                acc.overdue += 1;
            else if (diffDays === 0)
                acc.today += 1;
            else if (diffDays <= 7)
                acc.week += 1;
            return acc;
        }, { overdue: 0, today: 0, week: 0 });
    }
    getTaskPriorityScore(task) {
        if (!task.dueDateUtc) {
            return task.status === 'Overdue' ? 95 : 60;
        }
        const due = this.parseUtcDate(task.dueDateUtc);
        const today = new Date();
        const dueDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diffDays = Math.round((dueDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 0)
            return 100;
        if (diffDays === 0)
            return 90;
        if (diffDays <= 2)
            return 80;
        if (diffDays <= 7)
            return 70;
        return 60;
    }
    formatShortDate(value) {
        const date = this.parseUtcDate(value);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12)
            return 'Good morning';
        if (hour < 17)
            return 'Good afternoon';
        return 'Good evening';
    }
    parseUtcDate(value) {
        // Ensure UTC interpretation when the API omits a timezone offset.
        return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
    }
    insertCardByPrimaryOrder(currentOrder, cardId, primaryOrder) {
        if (currentOrder.includes(cardId)) {
            return [...currentOrder];
        }
        const indexById = new Map(primaryOrder.map((id, index) => [id, index]));
        const targetIndex = indexById.get(cardId);
        if (targetIndex === undefined) {
            return [...currentOrder, cardId];
        }
        const next = [...currentOrder];
        const insertAt = next.findIndex((id) => {
            const idx = indexById.get(id);
            return idx !== undefined && idx > targetIndex;
        });
        if (insertAt === -1) {
            next.push(cardId);
            return next;
        }
        next.splice(insertAt, 0, cardId);
        return next;
    }
    normalizeLayout(order, fallback) {
        const known = new Set(this.cardCatalog.map((card) => card.id));
        const suppress = this.uiSuppressedCardIds;
        // When a role-level default pack exists, treat it as the allowlist for this user.
        const allowed = this.roleDefaultLayout.length > 0
            ? new Set(fallback.filter((id) => known.has(id) && !suppress.has(id)))
            : new Set(Array.from(known).filter((id) => !suppress.has(id)));
        const filtered = order.filter(id => allowed.has(id) && !suppress.has(id));
        if (filtered.length) {
            return filtered;
        }
        return fallback.filter(id => allowed.has(id) && !suppress.has(id));
    }
    normalizeLayoutWithHidden(order, hiddenCards, fallback) {
        const hidden = new Set(hiddenCards ?? []);
        hidden.delete('risk-register');
        const visibleFallback = fallback.filter(id => !hidden.has(id));
        const visibleOrder = (order ?? []).filter(id => !hidden.has(id));
        return this.normalizeLayout(visibleOrder, visibleFallback);
    }
    applyRoleDefault(order, fallback) {
        if (this.roleDefaultLayout.length === 0) {
            return order;
        }
        const known = new Set(this.cardCatalog.map((card) => card.id));
        const allowed = new Set(fallback.filter((id) => known.has(id)));
        const filtered = order.filter(id => allowed.has(id));
        if (filtered.length) {
            return filtered;
        }
        return [...fallback];
    }
    getOrderedCards(order) {
        const map = new Map(this.cardCatalog.map(card => [card.id, card]));
        return order
            .filter((id) => !this.uiSuppressedCardIds.has(id))
            .map(id => map.get(id))
            .filter(Boolean);
    }
    buildLayoutPayload(orderOverride) {
        const cardOrder = orderOverride ?? this.layoutOrder;
        const defaultOrder = this.getLayoutDefaultOrder();
        const hiddenCards = defaultOrder.filter(id => !cardOrder.includes(id));
        return {
            cardOrder,
            sizes: this.buildDefaultSizeMap(),
            dimensions: this.buildLayoutDimensionsPayload(),
            hiddenCards
        };
    }
    buildDefaultLayoutPayload(orderOverride) {
        const cardOrder = orderOverride ?? [];
        const canonical = this.cardCatalog.map(card => card.id);
        const hiddenCards = canonical.filter(id => !cardOrder.includes(id));
        return {
            cardOrder,
            sizes: this.buildDefaultSizeMap(),
            dimensions: this.buildLayoutDimensionsPayload(),
            hiddenCards
        };
    }
    getLayoutDefaultOrder() {
        const known = new Set(this.cardCatalog.map((card) => card.id));
        if (this.roleDefaultLayout.length > 0) {
            const sanitized = this.roleDefaultLayout.filter((id) => known.has(id) && !this.uiSuppressedCardIds.has(id));
            if (sanitized.length > 0) {
                // Append any new catalog cards not yet in the saved role default
                const seen = new Set(sanitized);
                const newCards = this.cardCatalog
                    .map(card => card.id)
                    .filter(id => !seen.has(id) && !this.uiSuppressedCardIds.has(id));
                return [...sanitized, ...newCards];
            }
        }
        return this.cardCatalog.map(card => card.id).filter((id) => !this.uiSuppressedCardIds.has(id));
    }
    resolveLayoutOrderByPriority(dashpackOrder, userOrder, fallbackPackOrder) {
        const fallback = this.normalizeLayout(fallbackPackOrder ?? [], this.cardCatalog.map((card) => card.id));
        const hasUserOrder = (userOrder?.length ?? 0) > 0;
        const user = hasUserOrder ? this.normalizeLayout(userOrder ?? [], fallback) : [];
        if (hasUserOrder && user.length > 0) {
            return user;
        }
        const hasDashpackOrder = (dashpackOrder?.length ?? 0) > 0;
        const dashpack = hasDashpackOrder ? this.normalizeLayout(dashpackOrder ?? [], fallback) : [];
        if (hasDashpackOrder && dashpack.length > 0) {
            return dashpack;
        }
        return fallback;
    }
    buildDefaultSizeMap() {
        return {
            ...this.defaultCardSizes,
            ...this.defaultChartSizes
        };
    }
    buildLayoutDimensionsPayload() {
        return { ...(this.layoutDimensions ?? {}) };
    }
    applyRoleDefaultCharts() {
        const revenueAllowed = !this.roleDefaultHiddenCharts.has('revenue');
        const growthAllowed = !this.roleDefaultHiddenCharts.has('growth');
        // Role default is the hard limit. Local preference only applies within allowed charts.
        this.showRevenueChart = revenueAllowed && (!this.hasLocalChartPreference || this.showRevenueChart);
        this.showCustomerGrowthChart = growthAllowed && (!this.hasLocalChartPreference || this.showCustomerGrowthChart);
    }
    refreshSelectableCards() {
        const next = this.getSelectableCards();
        this.selectableCards.set(next);
    }
    refreshSelectableCharts() {
        const next = this.chartCatalog.filter((chart) => !this.roleDefaultHiddenCharts.has(chart.id));
        this.selectableCharts.set(next);
    }
    resolvePackName(packName, roleLevel) {
        const trimmed = packName?.trim();
        if (trimmed) {
            return trimmed;
        }
        if (roleLevel && roleLevel > 0) {
            return `H${roleLevel} Pack`;
        }
        if (this.roleDefaultLevel && this.roleDefaultLevel > 0) {
            return `H${this.roleDefaultLevel} Pack`;
        }
        return 'H1 Pack';
    }
    resetChartPreference() {
        if (!isPlatformBrowser(this.platformId))
            return;
        window.localStorage.removeItem(this.chartVisibilityStorageKey);
        this.hasLocalChartPreference = false;
    }
    loadCurrencyContext() {
        this.referenceData
            .getCurrencies()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            if (!this.currencyCode() && this.currencyFallback) {
                this.currencyCode.set(this.currencyFallback);
            }
        });
        const tokenContext = readTokenContext();
        if (!tokenHasPermission(tokenContext?.payload ?? null, PERMISSION_KEYS.administrationView)) {
            return;
        }
        this.settingsService
            .getSettings()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (settings) => {
                const resolved = settings.currency || this.currencyFallback;
                if (resolved) {
                    this.currencyCode.set(resolved);
                }
            }
        });
    }
    resolveCurrencyCode() {
        return this.currencyCode() || this.currencyFallback || '';
    }
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.resolveCurrencyCode() || 'USD',
            maximumFractionDigits: 0
        }).format(value ?? 0);
    }
    static ɵfac = function DashboardPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPage, selectors: [["app-dashboard-page"]], decls: 174, vars: 90, consts: [["aiOrchestrationCard", ""], ["emptyHealth", ""], ["emptyMyTasks", ""], ["emptyAccounts", ""], ["emptyManagerHealth", ""], ["emptyActivities", ""], ["emptyRiskFlags", ""], ["emptyExecutionGuide", ""], ["cardControls", ""], ["chartControls", ""], ["noCostBreakdown", ""], ["kpiFeaturedCard", ""], ["kpiCard", ""], ["numericMetricValue", ""], ["noAiActions", ""], ["monitorOnlyState", ""], ["dashboardCard", ""], ["expansionLoadingTpl", ""], ["noConfidenceData", ""], ["noScenarios", ""], ["noQuota", ""], ["noTruthGaps", ""], ["aqDecisionAction", ""], ["chartCard", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "animated-orb", "orb-4"], [1, "grid-pattern"], [1, "page-container", "dashboard"], [1, "page-content"], [1, "dashboard-layout"], [1, "dashboard-main"], [1, "hero-section"], [1, "hero-content"], [1, "hero-text"], [1, "hero-greeting-row"], [1, "hero-greeting"], [1, "realtime-indicator"], [1, "realtime-dot"], [1, "realtime-label"], [1, "page-title"], [1, "title-gradient"], [1, "title-light"], [1, "page-subtitle"], [1, "hero-stats"], [1, "hero-stat-pill"], [1, "pi", "pi-user-plus"], [1, "pi", "pi-compass"], [1, "pi", "pi-building"], ["class", "hero-stat-pill success", 4, "ngIf"], ["class", "hero-stat-pill danger", 4, "ngIf"], [1, "hero-actions"], ["pButton", "", "type", "button", 1, "btn-gradient", "btn-lg", 3, "click"], [1, "pi", "pi-plus"], ["pButton", "", "type", "button", 1, "btn-glass"], [1, "pi", "pi-calendar"], [1, "pi", "pi-download"], ["pButton", "", "type", "button", 1, "btn-glass", 3, "click"], [1, "pi", "pi-sliders-h"], ["class", "data-retry-banner", 4, "ngIf"], [1, "metrics-dashboard"], [1, "metrics-header"], [1, "section-title"], [1, "pi", "pi-chart-bar"], [1, "metrics-period"], ["type", "button", 1, "period-btn", 3, "click"], [1, "period-divider"], ["type", "button", 1, "period-btn", "period-btn--range", 3, "click"], [1, "range-label"], [1, "range-picker-dropdown"], ["cdkDropList", "", "cdkDropListOrientation", "horizontal", 1, "metrics-grid", 3, "cdkDropListDropped", "cdkDropListData"], ["class", "metric-card featured card-resizable", "data-min-width", "180", "data-min-height", "140", 3, "ngStyle", 4, "ngIf"], ["class", "metric-card card-resizable", "cdkDrag", "", "data-min-width", "160", "data-min-height", "140", 3, "ngStyle", 4, "ngFor", "ngForOf"], ["header", "Assistant Action Detail", 3, "visibleChange", "onHide", "visible", "modal", "draggable", "resizable", "dismissableMask", "contentStyle"], ["class", "assistant-detail-content", 4, "ngIf"], ["pTemplate", "footer"], ["header", "Review Assistant Action", 3, "visibleChange", "onHide", "visible", "modal", "closable", "dismissableMask"], [1, "assistant-review-content"], ["rows", "4", "placeholder", "Add review note (optional)", 3, "ngModelChange", "disabled", "ngModel"], ["cdkDropList", "", "cdkDropListOrientation", "mixed", 1, "dashboard-card-grid", 3, "cdkDropListDropped", "cdkDropListData"], ["class", "glass-card dashboard-card card-resizable", "cdkDrag", "", "data-min-width", "280", 3, "ngSwitch", "ngClass", "full-width-card", "my-tasks-card", "ngStyle", "cdkDragStarted", "cdkDragEnded", 4, "ngFor", "ngForOf"], ["cdkDropList", "", "cdkDropListOrientation", "horizontal", 1, "charts-row", 3, "cdkDropListDropped", "cdkDropListData"], [4, "ngFor", "ngForOf"], ["header", "Cost of Not Knowing - Deal Breakdown", "appendTo", "body", 3, "visibleChange", "visible", "modal", "dismissableMask", "draggable", "resizable", "contentStyle"], [1, "cost-breakdown-dialog"], [1, "dialog-controls"], ["for", "cost-sort"], ["id", "cost-sort", 1, "dialog-select", 3, "ngModelChange", "ngModel"], ["value", "exposure"], ["value", "amount"], ["value", "stage"], ["value", "name"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["class", "cost-breakdown-list", 4, "ngIf", "ngIfElse"], ["header", "Customize Command Center", "appendTo", "body", 3, "visibleChange", "visible", "modal", "dismissableMask", "draggable", "resizable", "maximizable", "contentStyle", "styleClass"], ["cdkDropList", "", "cdkDropListOrientation", "vertical", 1, "layout-order-list", 3, "cdkDropListDropped", "cdkDropListData"], ["class", "layout-item-row", "cdkDrag", "", 4, "ngFor", "ngForOf"], [1, "layout-chart-section"], [1, "layout-chart-list"], ["class", "layout-chart-item", 4, "ngFor", "ngForOf"], ["class", "layout-chart-section", 4, "ngIf"], ["header", "Coach Deal", "appendTo", "body", 3, "visibleChange", "visible", "modal", "dismissableMask", "draggable", "resizable", "contentStyle"], [1, "coaching-dialog"], ["for", "coach-comment", 1, "coaching-label"], ["id", "coach-comment", "rows", "4", "placeholder", "Give clear direction and the next action you expect.", 1, "coaching-textarea", 3, "ngModelChange", "ngModel"], [1, "coaching-row"], [1, "coaching-field"], ["for", "coach-due", 1, "coaching-label"], ["id", "coach-due", "type", "datetime-local", 1, "coaching-input", 3, "ngModelChange", "ngModel"], [1, "coaching-field", "coaching-field--sm"], ["for", "coach-priority", 1, "coaching-label"], ["id", "coach-priority", 1, "coaching-input", 3, "ngModelChange", "ngModel"], ["value", "High"], ["value", "Medium"], ["value", "Low"], [1, "hero-stat-pill", "success"], [1, "pi", "pi-check-circle"], [1, "hero-stat-pill", "danger"], [1, "pi", "pi-exclamation-triangle"], [1, "data-retry-banner"], [1, "pi", "pi-exclamation-circle"], ["type", "button", 1, "retry-btn", 3, "click"], [1, "pi", "pi-refresh"], ["selectionMode", "range", "dateFormat", "dd M yy", "placeholder", "Select date range", 3, "ngModelChange", "inline", "numberOfMonths", "ngModel"], ["data-min-width", "180", "data-min-height", "140", 1, "metric-card", "featured", "card-resizable", 3, "ngStyle"], [1, "metric-glow", "primary"], [1, "metric-hero-header"], [1, "metric-hero-kicker"], [1, "metric-hero-kicker__label"], [1, "metric-hero-kicker__tone"], [1, "metric-hero-main"], [1, "metric-icon-large", "primary"], [1, "pi", "pi-chart-line"], [1, "metric-body"], [1, "metric-value-large"], [1, "metric-label"], [1, "metric-hero-pills"], [1, "metric-hero-pill"], [1, "metric-trend"], [1, "pi"], [1, "resize-handle", "handle-e", 3, "mousedown"], [1, "resize-handle", "handle-se", 3, "mousedown"], ["cdkDrag", "", "data-min-width", "160", "data-min-height", "140", 1, "metric-card", "card-resizable", 3, "ngStyle"], [1, "metric-glow", 3, "ngClass"], [1, "metric-topline"], [1, "metric-status-rail", 3, "ngClass"], [1, "metric-status-dot"], [1, "metric-status-copy"], ["type", "button", "cdkDragHandle", "", "aria-label", "Reorder KPI", 1, "kpi-drag-handle"], [1, "pi", "pi-bars"], [1, "metric-main"], ["cdkDragHandle", "", 1, "metric-icon"], [1, "metric-copy"], ["class", "metric-value", 4, "ngIf", "ngIfElse"], [1, "metric-footer"], [1, "metric-health"], [1, "metric-health-caption"], [1, "metric-health-value"], [1, "metric-bar", 3, "ngClass"], [1, "metric-bar-fill"], [1, "metric-value"], [1, "ai-orchestration-section"], [1, "ai-orchestration-header"], [1, "ai-orchestration-title-group"], [1, "pi", "pi-bolt"], [1, "ai-orchestration-subtitle"], [1, "ai-orchestration-header-meta"], [1, "card-badge"], [1, "ai-generated-at"], [1, "ai-kpi-grid"], ["class", "ai-kpi-card", 4, "ngFor", "ngForOf"], ["class", "ai-action-shell", 4, "ngIf", "ngIfElse"], ["class", "assistant-undo-strip", 4, "ngIf"], [1, "ai-kpi-card"], [1, "ai-kpi-label"], [1, "ai-kpi-value", 3, "ngClass"], [1, "ai-action-shell"], [1, "ai-action-table-head"], [1, "ai-action-list"], ["class", "ai-action-row", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "ai-action-row", 3, "ngClass"], [1, "ai-score-col"], [1, "ai-row-index"], [1, "ai-score-card", 3, "ngClass"], [1, "ai-score-main"], [1, "ai-score-impact"], [1, "ai-score-urgency"], [1, "ai-task-col"], [1, "card-title"], [1, "ai-impact-inline", 3, "ngClass"], ["class", "ai-risk-rationale", 4, "ngIf"], [1, "ai-task-meta"], [1, "meta-chip", "ai-impact-pill", 3, "ngClass"], [1, "meta-chip", "ai-urgency-pill"], [1, "meta-chip"], [1, "pi", "pi-users"], [1, "pi", "pi-clock"], [1, "ai-risk-col"], [1, "ai-risk-chip", 3, "ngClass"], [1, "ai-cta-col"], ["pButton", "", "type", "button", 1, "ai-cta-btn", 3, "click", "ngClass"], [1, "pi", 3, "ngClass"], [1, "ai-risk-rationale"], [1, "ai-risk-rationale__label"], [1, "ai-risk-rationale__text"], [1, "empty-state-inline"], [4, "ngIf", "ngIfElse"], [1, "assistant-undo-strip"], ["pButton", "", "type", "button", 1, "btn-glass", 3, "click", "disabled"], [1, "assistant-detail-content"], [1, "assistant-detail-hero"], [1, "assistant-detail-grid"], [1, "assistant-detail-cell"], [1, "assistant-detail-label"], [1, "assistant-detail-value"], [1, "assistant-detail-cell", "assistant-detail-cell-wide"], [1, "assistant-detail-list"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click", "ngClass", "disabled"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click", "disabled"], ["cdkDrag", "", "data-min-width", "280", 1, "glass-card", "dashboard-card", "card-resizable", 3, "cdkDragStarted", "cdkDragEnded", "ngSwitch", "ngClass", "ngStyle"], [4, "ngSwitchCase"], [1, "resize-handle", "handle-s", 3, "mousedown"], [4, "ngTemplateOutlet"], [1, "card-header"], [1, "pi", "pi-filter"], [1, "card-actions"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "card-body"], [1, "chart-container", "medium"], ["type", "bar", "height", "100%", 3, "data", "options"], [1, "pipeline-stats"], ["class", "pipeline-stat", 4, "ngFor", "ngForOf"], [1, "pipeline-stat"], [1, "stat-label"], [1, "stat-value"], [1, "stat-subvalue"], [1, "pi", "pi-verified"], [1, "truth-metrics-grid"], [1, "truth-metric"], [1, "truth-label"], [1, "truth-value"], [1, "truth-subtext"], [1, "risk-intelligence-title-block"], [1, "pi", "pi-shield"], [1, "risk-intelligence-subtitle"], [1, "card-body", "risk-intelligence-body"], ["class", "risk-intelligence-panel", 4, "ngIf", "ngIfElse"], [1, "risk-intelligence-panel"], [1, "risk-intelligence-overview"], [1, "risk-intelligence-overview-copy"], [1, "risk-intelligence-kicker"], ["class", "risk-intelligence-summary", 4, "ngIf"], [1, "risk-intelligence-list"], ["class", "risk-intelligence-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "risk-intelligence-summary"], ["class", "risk-summary-pill", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "risk-summary-pill", 3, "ngClass"], [1, "risk-intelligence-item", 3, "ngClass"], [1, "risk-intelligence-rail"], [1, "risk-severity-pill", 3, "ngClass"], [1, "risk-intelligence-main"], [1, "risk-intelligence-head"], [1, "risk-intelligence-heading"], [1, "risk-intelligence-count"], [1, "risk-intelligence-meta"], [1, "risk-intelligence-actions"], ["pButton", "", "type", "button", 1, "risk-action-btn", 3, "click", "ngClass"], [1, "pi", "pi-arrow-right"], ["class", "execution-guide", 4, "ngIf", "ngIfElse"], [1, "execution-guide"], ["class", "execution-item", 4, "ngFor", "ngForOf"], [1, "execution-footnote"], [1, "execution-item"], [1, "execution-item-copy"], [1, "execution-item-head"], [1, "execution-step", 3, "ngClass"], [1, "execution-count", 3, "ngClass"], [1, "execution-title"], [1, "execution-detail"], [1, "execution-objective"], [1, "pi", "pi-sparkles"], ["class", "expansion-signals", 4, "ngIf", "ngIfElse"], [1, "expansion-signals"], ["class", "expansion-item", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "expansion-item"], [1, "expansion-info"], [1, "expansion-title"], [1, "expansion-meta"], ["class", "expansion-meta", 4, "ngIf"], [1, "expansion-actions"], ["pButton", "", "type", "button", "label", "Create expansion", "icon", "pi pi-plus", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["class", "expansion-status", 4, "ngIf"], [1, "expansion-status"], [1, "empty-state"], [1, "cf-hero"], [1, "cf-hero__main"], [1, "cf-hero__label"], [1, "cf-hero__value"], [1, "cf-hero__delta"], [1, "cf-hero__delta-hint"], [1, "cf-hero__ring"], ["viewBox", "0 0 80 80"], ["cx", "40", "cy", "40", "r", "34", 1, "cf-ring-bg"], ["cx", "40", "cy", "40", "r", "34", 1, "cf-ring-fill"], [1, "cf-ring-label"], [1, "cf-raw"], [1, "cf-raw__value"], [1, "cf-metrics"], [1, "cf-metric", "cf-metric--danger"], [1, "cf-metric__icon"], [1, "cf-metric__body"], [1, "cf-metric__value"], [1, "cf-metric__label"], [1, "cf-metric", "cf-metric--warning"], [1, "pi", "pi-flag"], [1, "cf-metric", 3, "ngClass"], [1, "pi", "pi-bullseye"], ["class", "cf-metric cf-metric--info", 4, "ngIf"], ["class", "cost-breakdown", 4, "ngIf"], ["class", "cost-trend", 4, "ngIf"], [1, "cf-metric", "cf-metric--info"], [1, "pi", "pi-database"], [1, "cost-breakdown"], [1, "cost-breakdown__header"], ["type", "button", "class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], ["class", "cost-deal", 4, "ngFor", "ngForOf"], [1, "cost-deal"], [1, "cost-deal__header"], [1, "cost-deal__name"], [1, "cost-deal__meta"], [1, "cost-deal__value"], [1, "cost-deal__factors"], ["class", "cost-factor", 4, "ngFor", "ngForOf"], [1, "cost-factor"], [1, "cost-trend"], [1, "cost-trend__header"], [1, "hint"], [1, "chart-container", "small"], ["type", "line", "height", "140px", 3, "data", "options"], [1, "empty-icon"], [1, "forecast-scenarios"], ["class", "scenario-row", 4, "ngFor", "ngForOf"], [1, "scenario-row"], [1, "scenario-label"], [1, "scenario-name"], [1, "scenario-count"], [1, "scenario-value"], [1, "scenario-delta"], [1, "forecast-value"], [1, "forecast-meta"], [1, "forecast-delta"], [1, "forecast-footnote"], ["class", "forecast-aux", 4, "ngIf", "ngIfElse"], [1, "forecast-aux"], [1, "forecast-row"], ["pButton", "", "type", "button", 1, "btn-glass", "btn-sm"], ["class", "card-body", 4, "ngIf", "ngIfElse"], [1, "accounts-list"], ["class", "account-row", 4, "ngFor", "ngForOf"], [1, "account-row"], [1, "account-rank"], [1, "account-avatar"], [1, "account-info"], [1, "account-name"], [1, "account-meta"], [1, "separator"], [1, "account-status"], [1, "status-dot"], [1, "status-text"], ["pButton", "", "type", "button", "icon", "pi pi-ellipsis-h", 1, "btn-icon-sm"], ["class", "card-badge warn", 4, "ngIf"], ["class", "card-body manager-health", 4, "ngIf", "ngIfElse"], [1, "card-badge", "warn"], [1, "card-body", "manager-health"], [1, "manager-health__stats"], ["class", "health-pill", 3, "ngClass", 4, "ngFor", "ngForOf"], ["class", "manager-health__truth", 4, "ngIf", "ngIfElse"], [1, "manager-health__queue"], ["class", "manager-deal", 4, "ngFor", "ngForOf"], [1, "health-pill", 3, "ngClass"], [1, "health-pill__value"], [1, "health-pill__label"], [1, "manager-health__truth"], [1, "truth-heading"], [1, "truth-list"], ["class", "truth-chip", 4, "ngFor", "ngForOf"], [1, "truth-chip"], [1, "manager-health__truth", "manager-health__truth--empty"], [1, "truth-empty"], [1, "manager-deal"], [1, "manager-deal__info"], [1, "manager-deal__name"], [1, "manager-deal__meta"], [1, "manager-deal__reason"], [1, "manager-deal__side"], [1, "manager-deal__amount"], [1, "manager-deal__metrics"], [1, "manager-deal__dates"], [4, "ngIf"], ["pButton", "", "type", "button", 1, "btn-glass", "btn-sm", "coach-btn", 3, "click"], [1, "pi", "pi-chart-pie"], [1, "donut-container"], ["type", "doughnut", "height", "200px", 3, "data", "options"], [1, "activity-breakdown-list"], ["class", "breakdown-item", 4, "ngFor", "ngForOf"], [1, "breakdown-item"], [1, "breakdown-icon"], [1, "breakdown-label"], [1, "breakdown-count"], [1, "pi", "pi-percentage"], [1, "trend-badge", "up"], [1, "pi", "pi-arrow-up"], ["type", "line", "height", "160px", 3, "data", "options"], [1, "conversion-summary"], [1, "summary-stat"], [1, "stat-value", "success"], [1, "pi", "pi-trophy"], [1, "performers-list"], ["class", "performer-row", 4, "ngFor", "ngForOf"], [1, "performer-row"], [1, "performer-rank"], [1, "performer-avatar"], [3, "src", "alt", "title"], [1, "performer-info"], [1, "performer-name"], [1, "performer-stats"], [1, "revenue"], ["class", "performer-badge", 4, "ngIf"], [1, "performer-badge"], [1, "pi", "pi-star-fill"], [1, "team-perf"], [1, "team-perf__kpis"], [1, "team-perf__kpi"], [1, "team-perf__kpi-label"], [1, "team-perf__kpi-value"], [1, "team-perf__kpi-delta", 3, "ngClass"], ["class", "team-perf__reps", 4, "ngIf"], ["class", "team-perf__empty", 4, "ngIf"], [1, "team-perf__reps"], [1, "team-perf__rep-header"], [1, "team-perf__rep-header-cell", "rep-col-rank"], [1, "team-perf__rep-header-cell", "rep-col-name"], [1, "team-perf__rep-header-cell", "rep-col-metric"], ["class", "team-perf__rep", 4, "ngFor", "ngForOf"], [1, "team-perf__rep"], [1, "team-perf__rep-rank", "rep-col-rank"], [1, "team-perf__rep-identity", "rep-col-name"], [1, "team-perf__rep-avatar"], [1, "team-perf__rep-avatar-img", 3, "src", "alt", "title"], [1, "team-perf__rep-name"], [1, "team-perf__rep-metric", "rep-col-metric"], [1, "team-perf__rep-metric-label"], [3, "ngClass"], [1, "activity"], [1, "team-perf__empty"], [1, "aq-card"], [1, "aq-header"], [1, "aq-header__left"], [1, "aq-header__icon-ring"], [1, "aq-header__text"], [1, "aq-header__title"], [1, "aq-header__title-gradient"], [1, "aq-header__subtitle"], ["class", "aq-header__count", 4, "ngIf"], [1, "aq-chips"], ["type", "button", 1, "aq-chip", "aq-chip--danger", 3, "click"], [1, "aq-chip__dot"], [1, "aq-chip__label"], [1, "aq-chip__count"], ["type", "button", 1, "aq-chip", "aq-chip--warning", 3, "click"], ["type", "button", 1, "aq-chip", "aq-chip--purple", 3, "click"], ["type", "button", 1, "aq-chip", "aq-chip--cyan", 3, "click"], ["type", "button", 1, "aq-chip", "aq-chip--orange", 3, "click"], ["type", "button", 1, "aq-chip", "aq-chip--slate", 3, "click"], [1, "aq-tabs"], [1, "aq-tabs__track"], ["type", "button", 1, "aq-tabs__btn", 3, "click"], [1, "aq-tabs__badge"], [1, "aq-tabs__badge", "aq-tabs__badge--danger"], [1, "aq-tabs__badge", "aq-tabs__badge--warning"], [1, "aq-tabs__badge", "aq-tabs__badge--purple"], [1, "aq-tabs__badge", "aq-tabs__badge--cyan"], [1, "aq-tabs__badge", "aq-tabs__badge--orange"], ["class", "aq-list", 4, "ngIf", "ngIfElse"], [1, "aq-header__count"], [1, "aq-header__count-num"], [1, "aq-list"], ["class", "aq-item", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "aq-item"], [1, "aq-item__strip", 3, "ngClass"], [1, "aq-item__body"], [1, "aq-item__icon", 3, "ngClass"], [1, "aq-item__content"], [1, "aq-item__row-top"], [1, "aq-item__title"], [1, "aq-item__due", 3, "ngClass"], [1, "aq-item__subtitle"], [1, "aq-item__tags"], ["class", "aq-item__tag", 4, "ngFor", "ngForOf"], [1, "aq-item__tag", "aq-item__tag--status"], [1, "aq-item__actions"], [1, "aq-item__tag"], ["type", "button", "title", "Call", 1, "aq-item__action-btn", "aq-item__action-btn--phone"], [1, "pi", "pi-phone"], ["type", "button", "title", "Email", 1, "aq-item__action-btn", "aq-item__action-btn--email"], [1, "pi", "pi-envelope"], ["type", "button", 1, "aq-item__action-btn", "aq-item__action-btn--complete", 3, "click"], [1, "pi", "pi-check"], ["type", "button", 1, "aq-item__action-btn", "aq-item__action-btn--review", 3, "click"], [1, "pi", "pi-eye"], [1, "timeline-filter"], ["pButton", "", "type", "button", 1, "filter-btn", "active"], ["pButton", "", "type", "button", 1, "filter-btn"], [1, "timeline"], ["class", "timeline-item", 3, "overdue", 4, "ngFor", "ngForOf"], [1, "timeline-item"], [1, "timeline-marker"], ["class", "timeline-connector", 4, "ngIf"], [1, "timeline-content"], [1, "timeline-header"], [1, "timeline-type"], [1, "timeline-time"], [1, "timeline-subject"], ["class", "timeline-entity", 4, "ngIf"], [1, "timeline-connector"], [1, "timeline-entity"], [1, "pi", "pi-link"], [1, "pi", "pi-heart"], [1, "health-meter"], ["viewBox", "0 0 120 120", 1, "circular-progress"], ["cx", "60", "cy", "60", "r", "54", 1, "progress-bg"], ["cx", "60", "cy", "60", "r", "54", 1, "progress-fill"], [1, "health-value"], [1, "health-number"], [1, "health-unit"], [1, "health-label"], [1, "health-breakdown"], [1, "breakdown-row"], [1, "breakdown-dot", "success"], [1, "breakdown-text"], [1, "breakdown-value"], [1, "breakdown-dot", "danger"], [1, "health-metrics"], [1, "health-metric"], [1, "pi", "pi-heart-fill"], [1, "metric-content"], [1, "pi", "pi-sync"], ["class", "glass-card chart-card chart-card--resizable card-resizable", "cdkDrag", "", 3, "ngClass", "ngStyle", 4, "ngIf"], ["cdkDrag", "", 1, "glass-card", "chart-card", "chart-card--resizable", "card-resizable", 3, "ngClass", "ngStyle"], [3, "ngSwitch"], [1, "chart-legend"], [1, "legend-item", "primary"], [1, "legend-dot"], [1, "chart-container"], ["type", "line", "height", "100%", 3, "data", "options"], [1, "pi", "pi-check-square"], [1, "pi", "pi-briefcase"], [1, "card-controls"], ["pButton", "", "type", "button", "icon", "pi pi-times", "aria-label", "Hide card", 1, "btn-icon-sm", "card-control", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-bars", "cdkDragHandle", "", "aria-label", "Reorder card", 1, "btn-icon-sm", "card-control", "drag-handle"], ["pButton", "", "type", "button", "icon", "pi pi-times", "aria-label", "Hide chart", 1, "btn-icon-sm", "card-control", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-bars", "cdkDragHandle", "", "aria-label", "Reorder chart", 1, "btn-icon-sm", "card-control", "drag-handle"], [1, "cost-breakdown-list"], ["class", "cost-breakdown-row", 4, "ngFor", "ngForOf"], [1, "cost-breakdown-row"], [1, "cost-breakdown-main"], [1, "cost-breakdown-name"], [1, "cost-breakdown-meta"], [1, "cost-breakdown-factors"], [1, "cost-breakdown-values"], [1, "cost-breakdown-amount"], [1, "cost-breakdown-exposure"], [1, "layout-actions"], ["cdkDrag", "", 1, "layout-item-row"], [1, "layout-item"], ["type", "button", "cdkDragHandle", "", "aria-label", "Reorder row", 1, "layout-item__drag"], [1, "layout-item__index"], [1, "layout-chart-item"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click"], [1, "coaching-actions"]], template: function DashboardPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 24);
            i0.ɵɵelement(1, "div", 25)(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "div", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 30)(7, "div", 31);
            i0.ɵɵelement(8, "app-breadcrumbs");
            i0.ɵɵelementStart(9, "div", 32)(10, "div", 33)(11, "section", 34)(12, "div", 35)(13, "div", 36)(14, "div", 37)(15, "span", 38);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 39);
            i0.ɵɵelement(18, "span", 40);
            i0.ɵɵelementStart(19, "span", 41);
            i0.ɵɵtext(20, "Live");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "h1", 42)(22, "span", 43);
            i0.ɵɵtext(23, "Command");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 44);
            i0.ɵɵtext(25, "Center");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "p", 45);
            i0.ɵɵtext(27, "Your CRM at a glance \u2014 track pipeline, monitor activities, and stay ahead of every deal.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 46)(29, "div", 47);
            i0.ɵɵelement(30, "i", 48);
            i0.ɵɵelementStart(31, "span")(32, "strong");
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(34, " leads");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 47);
            i0.ɵɵelement(36, "i", 49);
            i0.ɵɵelementStart(37, "span")(38, "strong");
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(40, " prospects");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 47);
            i0.ɵɵelement(42, "i", 50);
            i0.ɵɵelementStart(43, "span")(44, "strong");
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(46, " customers");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(47, DashboardPage_div_47_Template, 4, 0, "div", 51)(48, DashboardPage_div_48_Template, 6, 1, "div", 52);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "div", 53)(50, "button", 54);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onQuickAdd()); });
            i0.ɵɵelement(51, "i", 55);
            i0.ɵɵelementStart(52, "span");
            i0.ɵɵtext(53, "Quick Add");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "button", 56);
            i0.ɵɵelement(55, "i", 57);
            i0.ɵɵelementStart(56, "span");
            i0.ɵɵtext(57, "Schedule");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "button", 56);
            i0.ɵɵelement(59, "i", 58);
            i0.ɵɵelementStart(60, "span");
            i0.ɵɵtext(61, "Export");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "button", 59);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_62_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openLayoutDialog()); });
            i0.ɵɵelement(63, "i", 60);
            i0.ɵɵelementStart(64, "span");
            i0.ɵɵtext(65, "Customize layout");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(66, DashboardPage_div_66_Template, 7, 0, "div", 61);
            i0.ɵɵelementStart(67, "section", 62)(68, "div", 63)(69, "h2", 64);
            i0.ɵɵelement(70, "i", 65);
            i0.ɵɵtext(71, " Performance Overview ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 66)(73, "button", 67);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_73_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.selectPeriod("month")); });
            i0.ɵɵtext(74, "Month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "button", 67);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_75_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.selectPeriod("week")); });
            i0.ɵɵtext(76, "Week");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "button", 67);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_77_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.selectPeriod("today")); });
            i0.ɵɵtext(78, "Today");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(79, "div", 68);
            i0.ɵɵelementStart(80, "button", 69);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_80_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleRangePicker()); });
            i0.ɵɵelement(81, "i", 57);
            i0.ɵɵconditionalCreate(82, DashboardPage_Conditional_82_Template, 2, 1, "span", 70)(83, DashboardPage_Conditional_83_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(84, DashboardPage_Conditional_84_Template, 2, 3, "div", 71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "div", 72);
            i0.ɵɵlistener("cdkDropListDropped", function DashboardPage_Template_div_cdkDropListDropped_85_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onKpiDrop($event)); });
            i0.ɵɵtemplate(86, DashboardPage_article_86_Template, 32, 30, "article", 73)(87, DashboardPage_article_87_Template, 29, 19, "article", 74);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(88, DashboardPage_ng_template_88_Template, 20, 10, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(90, "p-dialog", 75);
            i0.ɵɵtwoWayListener("visibleChange", function DashboardPage_Template_p_dialog_visibleChange_90_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.assistantDetailDialogOpen, $event) || (ctx.assistantDetailDialogOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("onHide", function DashboardPage_Template_p_dialog_onHide_90_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeAssistantDetailDialog()); });
            i0.ɵɵtemplate(91, DashboardPage_div_91_Template, 70, 16, "div", 76)(92, DashboardPage_ng_template_92_Template, 4, 3, "ng-template", 77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "p-dialog", 78);
            i0.ɵɵtwoWayListener("visibleChange", function DashboardPage_Template_p_dialog_visibleChange_93_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.assistantReviewDialogOpen, $event) || (ctx.assistantReviewDialogOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("onHide", function DashboardPage_Template_p_dialog_onHide_93_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelAssistantReview()); });
            i0.ɵɵelementStart(94, "div", 79)(95, "p");
            i0.ɵɵtext(96, "This action is marked medium/high risk and needs review before execution.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "textarea", 80);
            i0.ɵɵlistener("ngModelChange", function DashboardPage_Template_textarea_ngModelChange_97_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.assistantReviewNote = $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(98, DashboardPage_ng_template_98_Template, 6, 3, "ng-template", 77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "section", 81);
            i0.ɵɵlistener("cdkDropListDropped", function DashboardPage_Template_section_cdkDropListDropped_99_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCardDrop($event)); });
            i0.ɵɵtemplate(100, DashboardPage_article_100_Template, 23, 27, "article", 82);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "section", 83);
            i0.ɵɵlistener("cdkDropListDropped", function DashboardPage_Template_section_cdkDropListDropped_101_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onChartDrop($event)); });
            i0.ɵɵtemplate(102, DashboardPage_ng_container_102_Template, 2, 1, "ng-container", 84);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(103, DashboardPage_ng_template_103_Template, 7, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(105, DashboardPage_ng_template_105_Template, 7, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(107, DashboardPage_ng_template_107_Template, 7, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(109, DashboardPage_ng_template_109_Template, 7, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(111, DashboardPage_ng_template_111_Template, 7, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor)(113, DashboardPage_ng_template_113_Template, 7, 0, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor)(115, DashboardPage_ng_template_115_Template, 7, 0, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor)(117, DashboardPage_ng_template_117_Template, 3, 0, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor)(119, DashboardPage_ng_template_119_Template, 3, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(121, "p-dialog", 85);
            i0.ɵɵtwoWayListener("visibleChange", function DashboardPage_Template_p_dialog_visibleChange_121_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.costBreakdownDialogOpen, $event) || (ctx.costBreakdownDialogOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(122, "div", 86)(123, "div", 87)(124, "label", 88);
            i0.ɵɵtext(125, "Sort by");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "select", 89);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPage_Template_select_ngModelChange_126_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.costBreakdownSortKey, $event) || (ctx.costBreakdownSortKey = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(127, "option", 90);
            i0.ɵɵtext(128, "Exposure");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "option", 91);
            i0.ɵɵtext(130, "Deal amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "option", 92);
            i0.ɵɵtext(132, "Stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(133, "option", 93);
            i0.ɵɵtext(134, "Opportunity");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(135, "button", 94);
            i0.ɵɵlistener("click", function DashboardPage_Template_button_click_135_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleCostBreakdownSortDirection()); });
            i0.ɵɵtext(136);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(137, DashboardPage_div_137_Template, 2, 1, "div", 95)(138, DashboardPage_ng_template_138_Template, 7, 0, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(140, DashboardPage_ng_template_140_Template, 3, 0, "ng-template", 77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "p-dialog", 96);
            i0.ɵɵtwoWayListener("visibleChange", function DashboardPage_Template_p_dialog_visibleChange_141_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.layoutDialogOpen, $event) || (ctx.layoutDialogOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(142, "p");
            i0.ɵɵtext(143, "Drag cards to reorder your Command Center view.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(144, "div", 97);
            i0.ɵɵlistener("cdkDropListDropped", function DashboardPage_Template_div_cdkDropListDropped_144_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLayoutDraftDrop($event)); });
            i0.ɵɵtemplate(145, DashboardPage_div_145_Template, 9, 4, "div", 98);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "div", 99)(147, "h4");
            i0.ɵɵtext(148);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(149, "div", 100);
            i0.ɵɵtemplate(150, DashboardPage_label_150_Template, 5, 4, "label", 101);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(151, DashboardPage_div_151_Template, 5, 1, "div", 102)(152, DashboardPage_ng_template_152_Template, 5, 0, "ng-template", 77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(153, "p-dialog", 103);
            i0.ɵɵtwoWayListener("visibleChange", function DashboardPage_Template_p_dialog_visibleChange_153_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.coachingDialogOpen, $event) || (ctx.coachingDialogOpen = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(154, "div", 104)(155, "label", 105);
            i0.ɵɵtext(156, "Manager comment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "textarea", 106);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPage_Template_textarea_ngModelChange_157_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.coachingComment, $event) || (ctx.coachingComment = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "div", 107)(159, "div", 108)(160, "label", 109);
            i0.ɵɵtext(161, "Due date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "input", 110);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPage_Template_input_ngModelChange_162_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.coachingDueLocal, $event) || (ctx.coachingDueLocal = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(163, "div", 111)(164, "label", 112);
            i0.ɵɵtext(165, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(166, "select", 113);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPage_Template_select_ngModelChange_166_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.coachingPriority, $event) || (ctx.coachingPriority = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(167, "option", 114);
            i0.ɵɵtext(168, "High");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(169, "option", 115);
            i0.ɵɵtext(170, "Medium");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "option", 116);
            i0.ɵɵtext(172, "Low");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(173, DashboardPage_ng_template_173_Template, 5, 3, "ng-template", 77);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const noCostBreakdown_r91 = i0.ɵɵreference(139);
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.greeting);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("updating", ctx.realtimeUpdating());
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.summary().leads || 0);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary().prospects || 0);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary().activeCustomers || 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.summary().overdueActivities === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", (ctx.summary().overdueActivities || 0) > 0);
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("ngIf", ctx.dataLoadFailed());
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("active", ctx.selectedPeriod() === "month");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.selectedPeriod() === "week");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.selectedPeriod() === "today");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.selectedPeriod() === "range");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedPeriod() === "range" && ctx.rangeLabel() ? 82 : 83);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showRangePicker() ? 84 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("cdkDropListData", ctx.kpiOrder());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.summary());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.secondaryKpis());
            i0.ɵɵadvance(3);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(81, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.assistantDetailDialogOpen);
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("dismissableMask", true)("contentStyle", i0.ɵɵpureFunction0(82, _c1));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.assistantDetailAction);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(83, _c2));
            i0.ɵɵtwoWayProperty("visible", ctx.assistantReviewDialogOpen);
            i0.ɵɵproperty("modal", true)("closable", !ctx.assistantReviewSubmitting)("dismissableMask", !ctx.assistantReviewSubmitting);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.assistantReviewSubmitting)("ngModel", ctx.assistantReviewNote);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("cdkDropListData", ctx.renderedLayoutOrder);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.renderedLayoutOrder);
            i0.ɵɵadvance();
            i0.ɵɵproperty("cdkDropListData", ctx.chartOrder);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.chartOrder);
            i0.ɵɵadvance(19);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(84, _c3));
            i0.ɵɵtwoWayProperty("visible", ctx.costBreakdownDialogOpen);
            i0.ɵɵproperty("modal", true)("dismissableMask", true)("draggable", false)("resizable", false)("contentStyle", i0.ɵɵpureFunction0(85, _c4));
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.costBreakdownSortKey);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" ", ctx.costBreakdownSortDirection === "asc" ? "Ascending" : "Descending", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.summary().costOfNotKnowingBreakdown.length)("ngIfElse", noCostBreakdown_r91);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(86, _c5));
            i0.ɵɵtwoWayProperty("visible", ctx.layoutDialogOpen);
            i0.ɵɵproperty("modal", true)("dismissableMask", true)("draggable", true)("resizable", true)("maximizable", true)("contentStyle", i0.ɵɵpureFunction0(87, _c4))("styleClass", "layout-dialog");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("cdkDropListData", ctx.layoutDraft);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.layoutDraft);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("Command Center cards (", ctx.activePackName(), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.selectableCards());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectableCharts().length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(88, _c6));
            i0.ɵɵtwoWayProperty("visible", ctx.coachingDialogOpen);
            i0.ɵɵproperty("modal", true)("dismissableMask", true)("draggable", false)("resizable", false)("contentStyle", i0.ɵɵpureFunction0(89, _c7));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.coachingComment);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.coachingDueLocal);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.coachingPriority);
        } }, dependencies: [NgIf,
            NgFor,
            NgSwitch,
            NgSwitchCase,
            NgClass,
            NgTemplateOutlet,
            NgStyle,
            FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel, DragDropModule, i2.CdkDropList, i2.CdkDrag, i2.CdkDragHandle, ChartModule, i3.UIChart, i4.PrimeTemplate, ButtonModule, i5.ButtonDirective, DialogModule, i6.Dialog, OrderListModule,
            DatePickerModule, i7.DatePicker, BreadcrumbsComponent,
            DatePipe,
            DecimalPipe,
            PercentPipe,
            CurrencyPipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DASHBOARD[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Enterprise[_ngcontent-%COMP%]   Glassmorphic[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   System\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../../styles/design-tokens'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   orb-float[_ngcontent-%COMP%] {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-down {\n  from { opacity: 0; transform: translateY(-20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BACKGROUND[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   LAYOUT\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdff 100%);\n}\n\n.grid-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image: \n    linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px);\n  background-size: 50px 50px;\n}\n\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: orb-float 25s ease-in-out infinite;\n  \n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -8s;\n  }\n  \n  &.orb-3 {\n    width: 350px;\n    height: 350px;\n    background: $purple-gradient;\n    bottom: -50px;\n    left: 40%;\n    animation-delay: -16s;\n  }\n  \n  &.orb-4 {\n    width: 300px;\n    height: 300px;\n    background: $orange-gradient;\n    top: 20%;\n    left: 50%;\n    animation-delay: -12s;\n    opacity: 0.25;\n  }\n}\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: auto;\n  height: auto;\n  padding: $space-5 $space-6;\n\n  @include respond-to('mobile') {\n    padding: $space-3 $space-3;\n  }\n\n  @include respond-to('mobileLg') {\n    padding: $space-3 $space-4;\n  }\n\n  @include respond-to('tablet') {\n    padding: $space-4 $space-5;\n  }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: none;\n  min-width: 0;\n  margin: 0 auto;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n}\n\n.dashboard-layout[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.dashboard-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-6;\n\n  @include respond-to('mobile') {\n    gap: $space-4;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-6;\n  margin-bottom: $space-6;\n  padding: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-2xl;\n  border: 1px solid $glass-border;\n  animation: _ngcontent-%COMP%_fade-in-down 0.5s ease-out;\n\n  @include respond-to('tablet') {\n    flex-direction: column;\n    gap: $space-4;\n    padding: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n    gap: $space-3;\n    padding: $space-3;\n    margin-bottom: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.hero-greeting[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-sm;\n  color: $primary;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  margin-bottom: $space-2;\n}\n\n.hero-greeting-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-2;\n}\n\n//[_ngcontent-%COMP%]   Realtime[_ngcontent-%COMP%]   update[_ngcontent-%COMP%]   indicator\n.realtime-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  background: rgba($success, 0.1);\n  border: 1px solid rgba($success, 0.2);\n  border-radius: $radius-full;\n  font-size: 0.7rem;\n  color: $success;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  transition: all 200ms ease;\n  \n  .realtime-dot {\n    width: 6px;\n    height: 6px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_realtime-pulse 2s ease-in-out infinite;\n  }\n  \n  .realtime-label {\n    line-height: 1;\n  }\n  \n  &.updating {\n    background: rgba($cyan, 0.15);\n    border-color: rgba($cyan, 0.3);\n    color: color.adjust($cyan, $lightness: -10%);\n    transform: scale(1.05);\n    box-shadow: 0 0 12px rgba($cyan, 0.3);\n    \n    .realtime-dot {\n      background: $cyan;\n      animation: _ngcontent-%COMP%_realtime-pulse-fast 0.5s ease-in-out infinite;\n    }\n  }\n}\n\n@keyframes _ngcontent-%COMP%_realtime-pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.5; transform: scale(0.8); }\n}\n\n@keyframes _ngcontent-%COMP%_realtime-pulse-fast {\n  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba($cyan, 0.4); }\n  50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 0 4px rgba($cyan, 0); }\n}\n\n//[_ngcontent-%COMP%]   Page[_ngcontent-%COMP%]   title[_ngcontent-%COMP%]   uses[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   _components.scss\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-stat-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: rgba($primary, 0.08);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  \n  i {\n    color: $primary;\n  }\n  \n  strong {\n    color: $text-primary;\n  }\n  \n  &.success {\n    background: rgba($success, 0.1);\n    i { color: $success; }\n  }\n  \n  &.danger {\n    background: rgba($danger, 0.1);\n    i { color: $danger; }\n  }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BUTTONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn-gradient[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $primary-gradient;\n  color: white;\n  border: none;\n  border-radius: $radius-xl;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  cursor: pointer;\n  transition: all $transition-base;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba($primary, 0.4);\n  }\n  \n  &.btn-lg {\n    padding: $space-3 $space-6;\n    font-size: $font-size-base;\n  }\n}\n\n.btn-glass[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  background: rgba(white, 0.7);\n  color: $text-secondary;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  font-weight: 500;\n  font-size: $font-size-sm;\n  cursor: pointer;\n  transition: all $transition-base;\n  \n  &:hover {\n    background: white;\n    border-color: rgba($primary, 0.3);\n    color: $primary;\n  }\n  \n  &.btn-sm {\n    padding: $space-2 $space-3;\n    font-size: $font-size-xs;\n    border-radius: $radius-lg;\n  }\n}\n\n.btn-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-lg;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.btn-icon-sm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.08);\n    color: $primary;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   RETRY[_ngcontent-%COMP%]   BANNER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-retry-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  margin-bottom: $space-4;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: $radius-lg;\n  animation: _ngcontent-%COMP%_fade-in-up 0.3s ease-out;\n\n  > i {\n    font-size: 1.125rem;\n    color: #ef4444;\n    flex-shrink: 0;\n  }\n\n  > span {\n    flex: 1;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: #991b1b;\n  }\n\n  .retry-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-3;\n    background: $primary-gradient;\n    color: white;\n    border: none;\n    border-radius: $radius-md;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    cursor: pointer;\n    transition: transform 200ms, box-shadow 200ms;\n    white-space: nowrap;\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    i {\n      font-size: $font-size-sm;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]   DASHBOARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-dashboard[_ngcontent-%COMP%] {\n  margin-bottom: $space-6;\n}\n\n.ai-orchestration-section[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 0;\n  padding: 18px 18px 14px;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n  overflow: hidden;\n\n  @include respond-to('mobile') {\n    padding: 12px 12px 10px;\n  }\n}\n\n.ai-orchestration-section[_ngcontent-%COMP%]::before, \n.ai-orchestration-section[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  border-radius: 50%;\n  filter: blur(24px);\n  opacity: 0.48;\n}\n\n.ai-orchestration-section[_ngcontent-%COMP%]::before {\n  width: 210px;\n  height: 210px;\n  top: -80px;\n  right: -58px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.45), rgba(113, 144, 235, 0));\n}\n\n.ai-orchestration-section[_ngcontent-%COMP%]::after {\n  width: 240px;\n  height: 240px;\n  bottom: -110px;\n  left: -76px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.28), rgba(109, 174, 255, 0));\n}\n\n.ai-orchestration-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.ai-orchestration-title-group[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\n\n.ai-orchestration-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.88rem;\n  color: rgba(60, 76, 114, 0.9);\n}\n\n.ai-orchestration-header-meta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.ai-generated-at[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(58, 74, 109, 0.88);\n}\n\n.ai-kpi-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n  margin-bottom: 12px;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.ai-kpi-card[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 0 12px 12px 0;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  min-height: 72px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.35);\n    border-left-color: #2563eb;\n    background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);\n    transform: translateY(-1px);\n  }\n\n  @include respond-to('mobile') {\n    padding: 8px 10px;\n    min-height: auto;\n  }\n}\n\n.ai-kpi-value[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 1.7rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.ai-kpi-value.success[_ngcontent-%COMP%] {\n  color: #4bb49d;\n}\n\n.ai-kpi-value.warning[_ngcontent-%COMP%] {\n  color: #ef9630;\n}\n\n.ai-kpi-value.danger[_ngcontent-%COMP%] {\n  color: #e64a63;\n}\n\n.ai-kpi-label[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: rgba(54, 68, 101, 0.95);\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-weight: 700;\n}\n\n.ai-action-shell[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: block;\n  gap: 8px;\n  border: 1px solid rgba(188, 199, 228, 0.7);\n  border-radius: 14px;\n  background: linear-gradient(150deg, rgba(236, 241, 255, 0.8), rgba(247, 249, 255, 0.76));\n  padding: 6px;\n}\n\n.ai-action-table-head[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 196px minmax(0, 1fr) 156px 168px;\n  align-items: center;\n  gap: 8px;\n  border-radius: 10px;\n  padding: 8px 10px;\n  background: linear-gradient(145deg, rgba(236, 242, 255, 0.82), rgba(224, 232, 249, 0.8));\n  color: rgba(45, 60, 96, 0.96);\n  font-size: 0.9rem;\n  font-weight: 700;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr minmax(0, 1fr) 120px;\n    gap: 6px;\n    font-size: 0.85rem;\n  }\n\n  @include respond-to('mobile') {\n    @include hide-mobile;\n  }\n}\n\n.ai-action-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 8px 4px;\n}\n\n.ai-action-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 420px;\n  overflow-y: auto;\n  padding-right: 2px;\n}\n\n.ai-action-row[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  flex-shrink: 0;\n  min-height: 136px;\n  grid-template-columns: 196px minmax(0, 1fr) 156px 168px;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid rgba(178, 190, 223, 0.62);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 255, 0.86));\n  box-shadow: 0 4px 10px rgba(41, 61, 104, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  overflow: hidden;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr minmax(0, 1fr) 100px;\n    min-height: auto;\n    gap: 6px;\n    padding: 8px 10px;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    min-height: auto;\n    gap: 8px;\n    padding: 12px;\n  }\n}\n\n.ai-action-row[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 6px;\n  border-radius: 10px 0 0 10px;\n  background: linear-gradient(180deg, #ff4b67, #de2346);\n}\n\n.ai-action-row.risk-medium[_ngcontent-%COMP%]::before {\n  background: linear-gradient(180deg, #f9ad3f, #e78e20);\n}\n\n.ai-action-row.risk-low[_ngcontent-%COMP%]::before {\n  background: linear-gradient(180deg, #61cea2, #31aa84);\n}\n\n.ai-score-col[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.ai-row-index[_ngcontent-%COMP%] {\n  width: 24px;\n  min-width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  border: 1px solid rgba(147, 166, 206, 0.75);\n  background: linear-gradient(145deg, #e7eefb, #d8e2f7);\n  color: #4f6492;\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 0.78rem;\n}\n\n.ai-score-card[_ngcontent-%COMP%] {\n  width: 160px;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid rgba(120, 194, 155, 0.7);\n  background: linear-gradient(180deg, #66cfa6, #35ab84);\n  color: #fff;\n}\n\n.ai-score-card.risk-high[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #ff4a66, #e02547);\n}\n\n.ai-score-card.risk-medium[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #f8ab39, #e38719);\n}\n\n.ai-score-card.risk-low[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #5fcea2, #32ac84);\n}\n\n.ai-score-main[_ngcontent-%COMP%] {\n  padding: 8px 10px 0;\n  font-size: 2.6rem;\n  line-height: 1;\n  font-weight: 800;\n}\n\n.ai-score-impact[_ngcontent-%COMP%] {\n  padding: 3px 10px 8px;\n  font-size: 1rem;\n  line-height: 1.15;\n  text-transform: uppercase;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  color: #ffffff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);\n  background: transparent;\n  border-top: 0;\n}\n\n.ai-score-urgency[_ngcontent-%COMP%] {\n  background: rgba(241, 244, 238, 0.98);\n  color: #8a5b18;\n  padding: 7px 10px;\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n}\n\n.ai-task-col[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 2px;\n  font-size: 1.05rem;\n  color: #132447;\n}\n\n.ai-task-col[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-size: 0.92rem;\n  color: #2a3d65;\n  line-height: 1.35;\n}\n\n.ai-impact-inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  margin: 0 0 6px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(166, 181, 215, 0.65);\n  background: rgba(235, 241, 253, 0.9);\n  color: #344c7d;\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.ai-impact-inline.risk-high[_ngcontent-%COMP%] {\n  border-color: rgba(177, 52, 73, 0.46);\n  background: rgba(255, 230, 235, 0.96);\n  color: #a52640;\n}\n\n.ai-impact-inline.risk-medium[_ngcontent-%COMP%] {\n  border-color: rgba(186, 140, 60, 0.45);\n  background: rgba(255, 243, 216, 0.96);\n  color: #915e1d;\n}\n\n.ai-impact-inline.risk-low[_ngcontent-%COMP%] {\n  border-color: rgba(54, 154, 116, 0.46);\n  background: rgba(224, 246, 236, 0.96);\n  color: #1e7b57;\n}\n\n.ai-task-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  font-size: 0.84rem;\n  color: #415680;\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  border: 1px solid rgba(194, 206, 232, 0.85);\n  background: rgba(227, 234, 248, 0.8);\n  padding: 3px 8px;\n}\n\n.ai-impact-pill[_ngcontent-%COMP%] {\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n\n.ai-impact-pill.risk-high[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #ff6e86, #e13a5a);\n  color: #fff;\n  border-color: rgba(175, 40, 64, 0.55);\n}\n\n.ai-impact-pill.risk-medium[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #f3cb73, #e6b44f);\n  color: #3e2a10;\n  border-color: rgba(167, 122, 49, 0.5);\n}\n\n.ai-impact-pill.risk-low[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #63cca2, #37ae86);\n  color: #fff;\n  border-color: rgba(44, 144, 105, 0.55);\n}\n\n.ai-urgency-pill[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  color: #8a5b18;\n  background: linear-gradient(180deg, #f4efe1, #ece3cf);\n  border-color: rgba(178, 152, 95, 0.45);\n}\n\n.ai-risk-col[_ngcontent-%COMP%], \n.ai-cta-col[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.ai-cta-col[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 6px;\n}\n\n.ai-risk-chip[_ngcontent-%COMP%] {\n  min-width: 108px;\n  border-radius: 10px;\n  padding: 4px 8px;\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-size: 0.78rem;\n  line-height: 1.1;\n  font-weight: 800;\n  color: #fff;\n}\n\n.ai-risk-chip.risk-high[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #ff4966, #e12748);\n}\n\n.ai-risk-chip.risk-medium[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #f8ad3c, #e98f20);\n}\n\n.ai-risk-chip.risk-low[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #58c99f, #2fa77f);\n}\n\n.ai-cta-btn[_ngcontent-%COMP%] {\n  min-width: 148px;\n  border-radius: 10px;\n  border: 1px solid rgba(176, 152, 103, 0.45);\n  background: linear-gradient(180deg, #ffefc7, #f7dfa9);\n  box-shadow: 0 8px 16px rgba(177, 150, 88, 0.25);\n  color: #1a2748;\n  text-transform: uppercase;\n  font-size: 0.9rem;\n  font-weight: 800;\n  letter-spacing: 0.03em;\n  padding: 8px 12px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.ai-cta-btn.execute.risk-low[_ngcontent-%COMP%] {\n  border-color: rgba(49, 147, 109, 0.58);\n  background: linear-gradient(180deg, #35b586, #229b6f);\n  color: #ffffff;\n  box-shadow: 0 8px 16px rgba(35, 141, 101, 0.28);\n}\n\n.ai-cta-btn.review.risk-medium[_ngcontent-%COMP%] {\n  border-color: rgba(190, 140, 64, 0.55);\n  background: linear-gradient(180deg, #f0d99b, #e4c574);\n  color: #3b2b12;\n}\n\n.ai-cta-btn.review.risk-high[_ngcontent-%COMP%] {\n  border-color: rgba(179, 51, 72, 0.52);\n  background: linear-gradient(180deg, #ff6f86, #e63d5f);\n  color: #ffffff;\n}\n\n.ai-expand-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  justify-content: center;\n  border: 1px solid rgba(198, 207, 228, 0.8);\n  background: linear-gradient(180deg, #f4f6fb, #e9edf6);\n  color: #2e3d63;\n  box-shadow: none;\n}\n\n.ai-action-detail[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  margin-top: 4px;\n  padding: 10px;\n  border-radius: 9px;\n  border: 1px solid rgba(178, 190, 223, 0.52);\n  background: linear-gradient(145deg, rgba(239, 244, 255, 0.72), rgba(229, 237, 252, 0.62));\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n    gap: 6px;\n    padding: 8px;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: 6px;\n    padding: 8px;\n  }\n}\n\n.ai-detail-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2px;\n}\n\n.ai-detail-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  color: rgba(66, 84, 126, 0.82);\n  font-weight: 700;\n}\n\n.ai-detail-value[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #20365f;\n  font-weight: 600;\n  overflow-wrap: anywhere;\n}\n\n.ai-detail-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 16px;\n  display: grid;\n  gap: 3px;\n  color: #20365f;\n  font-size: 0.83rem;\n  font-weight: 500;\n}\n\n.assistant-detail-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.assistant-detail-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.assistant-detail-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #2a3d65;\n}\n\n.assistant-detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n}\n\n.assistant-detail-cell[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-radius: 10px;\n  border: 1px solid rgba(188, 199, 228, 0.72);\n  background: rgba(246, 249, 255, 0.9);\n  display: grid;\n  gap: 3px;\n}\n\n.assistant-detail-cell-wide[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.assistant-detail-label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  color: rgba(66, 84, 126, 0.82);\n  letter-spacing: 0.02em;\n  font-weight: 700;\n}\n\n.assistant-detail-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #20365f;\n  font-weight: 700;\n  overflow-wrap: anywhere;\n}\n\n.assistant-detail-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 18px;\n  display: grid;\n  gap: 4px;\n  color: #20365f;\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n\n.ai-cta-btn.execute.risk-high[_ngcontent-%COMP%] {\n  border-color: rgba(193, 46, 71, 0.62);\n  background: linear-gradient(180deg, #ff4a66, #e12748);\n  box-shadow: 0 10px 18px rgba(191, 39, 68, 0.34);\n  color: #fff;\n}\n\n.ai-cta-btn.execute.risk-low[_ngcontent-%COMP%] {\n  border-color: rgba(42, 146, 109, 0.62);\n  background: linear-gradient(180deg, #3cb98d, #1f9a70);\n  box-shadow: 0 10px 18px rgba(35, 137, 102, 0.3);\n  color: #fff;\n}\n\n.empty-state-inline[_ngcontent-%COMP%] {\n  padding: 14px;\n  border-radius: 12px;\n  background: rgba(246, 249, 255, 0.76);\n  border: 1px dashed rgba(137, 154, 192, 0.48);\n  color: rgba(61, 76, 108, 0.86);\n  font-size: 0.85rem;\n  display: grid;\n  gap: 4px;\n}\n\n.ai-risk-rationale[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2px;\n  margin-top: 8px;\n  padding: 9px 10px;\n  border-radius: 10px;\n  background: rgba(242, 246, 255, 0.8);\n  border: 1px solid rgba(188, 199, 228, 0.62);\n}\n\n.ai-risk-rationale__label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: rgba(66, 84, 126, 0.82);\n  font-weight: 700;\n}\n\n.ai-risk-rationale__text[_ngcontent-%COMP%] {\n  color: #294064;\n  font-size: 0.83rem;\n  font-weight: 600;\n}\n\n.ai-diagnostics-shell[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 14px;\n  border-radius: 18px;\n  background: linear-gradient(180deg, rgba(244, 247, 255, 0.9), rgba(238, 244, 255, 0.72));\n  border: 1px solid rgba(188, 199, 228, 0.62);\n  display: grid;\n  gap: 12px;\n}\n\n.ai-diagnostics-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.ai-diagnostics-kicker[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.12);\n  color: #4f46e5;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n\n.ai-diagnostics-title[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: #1d2d4f;\n  font-size: 1rem;\n  font-weight: 700;\n}\n\n.ai-diagnostics-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n\n.ai-diagnostic-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 14px;\n  border: 1px solid rgba(203, 213, 225, 0.78);\n  background: rgba(255, 255, 255, 0.84);\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);\n}\n\n.ai-diagnostic-rail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n}\n\n.ai-diagnostic-main[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.ai-diagnostic-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.ai-diagnostic-heading[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #10223d;\n  font-size: 0.97rem;\n  font-weight: 700;\n}\n\n.ai-diagnostic-impact[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(44, 61, 95, 0.88);\n  font-size: 0.86rem;\n}\n\n.ai-diagnostic-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.assistant-review-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n\n.assistant-review-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(220, 233, 255, 0.86);\n  font-size: 0.9rem;\n}\n\n.assistant-review-content[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.3);\n  background: rgba(16, 24, 50, 0.6);\n  color: rgba(234, 242, 255, 0.92);\n  padding: 10px 12px;\n  resize: vertical;\n  min-height: 96px;\n}\n\n.assistant-undo-strip[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.24);\n  background: rgba(255, 255, 255, 0.66);\n  color: rgba(53, 71, 108, 0.9);\n  font-size: 0.84rem;\n}\n\n@media (max-width: 980px) {\n  .ai-kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .ai-diagnostic-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .ai-action-table-head[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .ai-action-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n\n  .ai-risk-col[_ngcontent-%COMP%], \n   .ai-cta-col[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .ai-action-detail[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .assistant-detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .ai-orchestration-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .ai-orchestration-header-meta[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .ai-kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .ai-diagnostics-head[_ngcontent-%COMP%], \n   .ai-diagnostic-heading[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .ai-action-toolbar[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .ai-score-card[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 220px;\n  }\n\n  .ai-cta-btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .ai-action-detail[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .assistant-detail-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ai-orchestration-section[_ngcontent-%COMP%], \n   .ai-action-row[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n.metrics-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  position: relative;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n  margin: 0;\n  \n  i {\n    color: $primary;\n  }\n}\n\n.metrics-period[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: $glass-bg;\n  border-radius: $radius-xl;\n  padding: 4px;\n  border: 1px solid $glass-border;\n  position: relative;\n}\n\n.period-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 20px;\n  background: rgba(0, 0, 0, 0.1);\n  margin: 0 2px;\n  flex-shrink: 0;\n}\n\n.period-btn[_ngcontent-%COMP%] {\n  padding: $space-3 $space-5;\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $text-muted;\n  background: transparent;\n  border: none;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all $transition-fast;\n  white-space: nowrap;\n  \n  &:hover {\n    color: $text-secondary;\n    background: rgba(255, 255, 255, 0.5);\n  }\n  \n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  }\n\n  &--range {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n\n    i {\n      font-size: $font-size-sm;\n    }\n  }\n}\n\n.range-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.range-picker-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 100;\n  margin-top: $space-2;\n  background: white;\n  border-radius: $radius-xl;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08);\n  border: 1px solid $glass-border;\n  padding: $space-3;\n  animation: _ngcontent-%COMP%_fade-in-up 0.2s ease-out;\n\n  ::ng-deep .p-datepicker {\n    border: none;\n    background: transparent;\n    font-family: inherit;\n  }\n}\n\n.metrics-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-4;\n  position: relative;\n\n  @include respond-to('tablet') {\n    gap: $space-3;\n  }\n\n  @include respond-to('mobile') {\n    gap: $space-3;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(241, 246, 255, 0.9)),\n    radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 52%);\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  border: 1px solid rgba(162, 182, 223, 0.34);\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  overflow: hidden;\n  min-height: 160px;\n  min-width: 0;\n  flex: 1 1 calc(25% - #{$space-4} * 3 / 4);\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 18px 40px rgba(24, 45, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85);\n  \n  &:hover {\n    transform: translateY(-4px);\n    border-color: rgba(95, 140, 230, 0.42);\n    box-shadow: 0 22px 48px rgba(35, 58, 112, 0.16), 0 0 0 1px rgba(132, 168, 243, 0.18);\n  }\n  \n  &.featured {\n    flex: 0 0 calc(25% - #{$space-4} * 3 / 4);\n    display: flex;\n    flex-direction: column;\n    padding: $space-5;\n  }\n}\n\n.kpi-drag-handle[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 10px;\n  border: 1px solid rgba(125, 146, 197, 0.22);\n  background: rgba(255, 255, 255, 0.4);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(66, 84, 126, 0.72);\n  cursor: grab;\n  transition: transform $transition-fast, color $transition-fast, border-color $transition-fast, background $transition-fast, opacity $transition-fast;\n  opacity: 0.3;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover {\n    color: $primary;\n    border-color: rgba($primary, 0.35);\n    background: rgba(255, 255, 255, 0.75);\n    transform: translateY(-1px);\n    opacity: 1;\n  }\n\n  &:active {\n    cursor: grabbing;\n    transform: translateY(0);\n  }\n}\n\n.metric-card.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.24);\n  border-radius: $radius-xl;\n}\n\n.metric-card.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0.35;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.06);\n}\n\n.metrics-grid.cdk-drop-list-dragging[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]:not(.cdk-drag-placeholder) {\n  transition: transform 180ms ease;\n}\n\n.metric-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  opacity: 0.18;\n  pointer-events: none;\n  \n  &.primary { background: $primary-gradient; }\n}\n\n.metric-glow--aqua[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(34, 211, 238, 0.42), rgba(34, 211, 238, 0));\n}\n\n.metric-glow--coral[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(248, 113, 113, 0.34), rgba(248, 113, 113, 0));\n}\n\n.metric-glow--amber[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(251, 191, 36, 0.32), rgba(251, 191, 36, 0));\n}\n\n.metric-glow--emerald[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(52, 211, 153, 0.34), rgba(52, 211, 153, 0));\n}\n\n.metric-glow--orange[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(249, 115, 22, 0.32), rgba(249, 115, 22, 0));\n}\n\n.metric-glow--violet[_ngcontent-%COMP%] {\n  background: radial-gradient(circle, rgba(168, 85, 247, 0.34), rgba(168, 85, 247, 0));\n}\n\n.metric-hero-header[_ngcontent-%COMP%], \n.metric-topline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  margin-bottom: $space-3;\n  position: relative;\n  z-index: 1;\n}\n\n.metric-topline[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n\n.metric-status-rail[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  padding: 6px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(150, 169, 212, 0.22);\n  background: rgba(255, 255, 255, 0.54);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n}\n\n.metric-status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: currentColor;\n  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.45);\n}\n\n.metric-status-copy[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.metric-status-rail--aqua[_ngcontent-%COMP%] { color: #0891b2; }\n.metric-status-rail--coral[_ngcontent-%COMP%] { color: #dc2626; }\n.metric-status-rail--amber[_ngcontent-%COMP%] { color: #d97706; }\n.metric-status-rail--emerald[_ngcontent-%COMP%] { color: #059669; }\n.metric-status-rail--orange[_ngcontent-%COMP%] { color: #ea580c; }\n.metric-status-rail--violet[_ngcontent-%COMP%] { color: #7c3aed; }\n\n.metric-hero-kicker[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.metric-hero-kicker__label[_ngcontent-%COMP%], \n.metric-hero-kicker__tone[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 10px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n\n.metric-hero-kicker__label[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n}\n\n.metric-hero-kicker__tone[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.62);\n  color: #166534;\n}\n\n.metric-hero-kicker__tone.down[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.metric-hero-main[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  gap: $space-5;\n  align-items: center;\n  min-width: 0;\n  flex: 1;\n}\n\n.metric-icon-large[_ngcontent-%COMP%] {\n  width: 76px;\n  height: 76px;\n  border-radius: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n\n  i {\n    font-size: 2rem;\n  }\n\n  &.primary {\n    background: linear-gradient(145deg, #2563eb, #7c3aed 58%, #22d3ee);\n    color: white;\n    box-shadow: 0 16px 34px rgba(87, 94, 242, 0.32);\n  }\n}\n\n.metric-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n\n.metric-value-large[_ngcontent-%COMP%] {\n  font-size: clamp(2rem, 3.1vw, $font-size-5xl);\n  font-weight: 800;\n  color: $text-primary;\n  line-height: 1;\n  margin-bottom: $space-2;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-hero-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  margin-top: $space-3;\n}\n\n.metric-hero-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(248, 250, 255, 0.78);\n  border: 1px solid rgba(139, 166, 222, 0.24);\n  color: #27406b;\n  font-size: 0.76rem;\n  font-weight: 700;\n}\n\n.metric-main[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  min-width: 0;\n  flex: 1;\n  margin-bottom: $space-3;\n}\n\n.metric-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n\n.metric-footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-top: auto;\n  display: grid;\n  gap: $space-2;\n}\n\n.metric-health[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.metric-health-caption[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(45, 64, 103, 0.84);\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.metric-health-value[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  font-weight: 800;\n  color: rgba(38, 57, 95, 0.82);\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n\n.metric-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 10px 24px rgba(30, 41, 59, 0.08);\n\n  i {\n    font-size: 1.05rem;\n  }\n  \n  &.aqua {\n    background: linear-gradient(145deg, rgba(34, 211, 238, 0.22), rgba(6, 182, 212, 0.08));\n    color: #0891b2;\n  }\n  \n  &.violet {\n    background: linear-gradient(145deg, rgba(168, 85, 247, 0.22), rgba(124, 58, 237, 0.08));\n    color: #7c3aed;\n  }\n  \n  &.emerald {\n    background: linear-gradient(145deg, rgba(52, 211, 153, 0.22), rgba(16, 185, 129, 0.08));\n    color: #059669;\n  }\n  \n  &.orange {\n    background: linear-gradient(145deg, rgba(249, 115, 22, 0.22), rgba(234, 88, 12, 0.08));\n    color: #ea580c;\n  }\n\n  &.coral {\n    background: linear-gradient(145deg, rgba(248, 113, 113, 0.22), rgba(239, 68, 68, 0.08));\n    color: #dc2626;\n  }\n\n  &.amber {\n    background: linear-gradient(145deg, rgba(251, 191, 36, 0.22), rgba(245, 158, 11, 0.08));\n    color: #d97706;\n  }\n}\n\n.metric-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n  margin-top: $space-3;\n  padding: 8px 12px;\n  border-radius: 14px;\n  width: fit-content;\n  max-width: 100%;\n  background: rgba(255, 255, 255, 0.68);\n  border: 1px solid rgba(162, 182, 223, 0.2);\n  \n  &.up { color: $success; }\n  &.down { color: $danger; }\n  \n  i { font-size: 0.82rem; }\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: clamp(1.6rem, 2.1vw, $font-size-3xl);\n  font-weight: 800;\n  color: $text-primary;\n  line-height: 1;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  color: #172554;\n  font-weight: 700;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: $radius-full;\n  overflow: hidden;\n  position: relative;\n  background: rgba(199, 210, 227, 0.42);\n  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n\n.metric-bar--aqua[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(34, 211, 238, 0.16), rgba(191, 219, 254, 0.34)); }\n.metric-bar--coral[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(248, 113, 113, 0.16), rgba(254, 205, 211, 0.34)); }\n.metric-bar--amber[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(251, 191, 36, 0.16), rgba(253, 230, 138, 0.34)); }\n.metric-bar--emerald[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(52, 211, 153, 0.16), rgba(187, 247, 208, 0.34)); }\n.metric-bar--orange[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(249, 115, 22, 0.16), rgba(254, 215, 170, 0.34)); }\n.metric-bar--violet[_ngcontent-%COMP%] { background: linear-gradient(90deg, rgba(168, 85, 247, 0.16), rgba(221, 214, 254, 0.34)); }\n\n.metric-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 0.6s ease;\n  \n  &.aqua { background: linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%); }\n  &.violet { background: linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%); }\n  &.emerald { background: linear-gradient(90deg, #10b981 0%, #34d399 100%); }\n  &.orange { background: linear-gradient(90deg, #f97316 0%, #fb923c 100%); }\n  &.coral { background: linear-gradient(90deg, #ef4444 0%, #fb7185 100%); }\n  &.amber { background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   MAIN[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   (COMMAND CENTER)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dashboard-card-grid[_ngcontent-%COMP%] {\n  // Flexbox wrap so individual card widths are respected during resize.\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-5;\n  align-items: stretch;\n\n  @include respond-to('tablet') {\n    gap: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n    gap: $space-3;\n  }\n}\n\n.dashboard-card[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  // Default: half-width minus half the gap (two cards per row)\n  flex: 0 0 calc(50% - #{$space-5} / 2);\n  width: calc(50% - #{$space-5} / 2);\n  height: 360px;\n  overflow: hidden;\n\n  @include respond-to('tablet') {\n    flex: 0 0 100%;\n    width: 100%;\n  }\n\n  @include respond-to('mobile') {\n    flex: 0 0 100%;\n    width: 100%;\n    height: auto;\n    min-height: 300px;\n  }\n\n  &.size-sm {\n    width: 100%;\n  }\n\n  &.size-md {\n    width: 100%;\n  }\n\n  &.size-lg {\n    width: 100%;\n  }\n\n  // Default card heights tuned to each card's content to avoid overflows or oversized layouts.\n  &[data-card-id] {\n    min-height: 360px;\n  }\n}\n\n.dashboard-card.full-width-card[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  width: 100%;\n  height: auto;\n  min-height: 420px;\n  overflow: visible;\n}\n\n.dashboard-card.full-width-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  min-height: 0;\n  overflow: visible;\n}\n\n.dashboard-card.full-width-card[_ngcontent-%COMP%]   .ai-orchestration-section[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 0;\n  overflow: visible;\n  padding-right: 4px;\n}\n\n.dashboard-card.full-width-card[_ngcontent-%COMP%]   .ai-action-shell[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n\n.dashboard-card.full-width-card[_ngcontent-%COMP%]   .ai-action-list[_ngcontent-%COMP%] {\n  min-height: 136px;\n  overflow-y: auto;\n}\n\n//[_ngcontent-%COMP%]   Liquid[_ngcontent-%COMP%]   Glass:[_ngcontent-%COMP%]   add[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   subtle[_ngcontent-%COMP%]   highlight[_ngcontent-%COMP%]   layer[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   richer[_ngcontent-%COMP%]   blur[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   dashboard[_ngcontent-%COMP%]   cards.\n.dashboard-card.glass-card,\n.chart-card.glass-card[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.38));\n  border: 1px solid rgba(255, 255, 255, 0.35);\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);\n  backdrop-filter: blur(26px) saturate(160%);\n  overflow: hidden;\n}\n\n.dashboard-card.glass-card::before,\n.chart-card.glass-card::before[_ngcontent-%COMP%] {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(circle at top left, rgba(255, 255, 255, 0.55), transparent 55%),\n    radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.15), transparent 50%);\n  pointer-events: none;\n}\n\n.dashboard-card-grid.cdk-drop-list-dragging[_ngcontent-%COMP%]   .dashboard-card:not(.cdk-drag-placeholder)[_ngcontent-%COMP%] {\n  transition: transform 200ms ease;\n}\n\n.dashboard-card.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);\n  border-radius: $radius-2xl;\n  // Lock drag preview sizing so cards keep their intended dimensions while moving.\n  width: var(--drag-width, auto);\n  height: var(--drag-height, auto);\n  min-width: var(--drag-width, auto);\n  min-height: var(--drag-height, auto);\n  max-width: var(--drag-width, auto);\n  max-height: var(--drag-height, auto);\n  overflow: hidden;\n}\n\n.dashboard-card.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0.3;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.04);\n}\n\n.dashboard-card.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 200ms ease;\n}\n\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//   LAYOUT   DIALOG\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n[_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .layout-dialog[_ngcontent-%COMP%] {\n  .p-dialog {\n    width: min(960px, 94vw);\n    max-height: 85vh;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .p-dialog-content {\n    padding: $space-4 $space-5;\n    // Keep the full layout editor accessible without truncation on shorter viewports.\n    max-height: 70vh;\n    overflow: auto;\n  }\n\n  .p-dialog-header {\n    padding: $space-4 $space-5 $space-2;\n    cursor: move;\n  }\n}\n\n@media (max-width: 840px) {\n  [_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .layout-dialog[_ngcontent-%COMP%] {\n    .p-dialog {\n      width: 96vw;\n      height: 90vh;\n      max-height: 90vh;\n    }\n\n    .p-dialog-content {\n      max-height: calc(90vh - 120px);\n    }\n  }\n}\n\n.layout-order-list[_ngcontent-%COMP%] {\n  max-height: 360px;\n  overflow: auto;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.7);\n  padding: $space-2;\n  display: grid;\n  gap: $space-2;\n}\n\n.layout-item-row.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0.35;\n\n  .layout-item {\n    border-style: dashed;\n    background: rgba($primary, 0.05);\n  }\n}\n\n.layout-item-row.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 180ms ease;\n}\n\n.layout-order-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .layout-item-row:not(.cdk-drag-placeholder)[_ngcontent-%COMP%] {\n  transition: transform 180ms ease;\n}\n\n.layout-item-row.cdk-drag-preview[_ngcontent-%COMP%] {\n  .layout-item {\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14);\n    border-color: rgba($primary, 0.28);\n    background: rgba(255, 255, 255, 0.95);\n  }\n}\n\n.layout-chart-section[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n\n  h4 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-sm;\n    color: $text-secondary;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n  }\n}\n\n.layout-chart-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-2;\n}\n\n.layout-chart-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.7);\n  font-size: $font-size-sm;\n  color: $text-secondary;\n\n  input {\n    accent-color: $primary;\n  }\n\n  i {\n    color: $primary;\n  }\n}\n\n.layout-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($glass-border, 0.6);\n  background: rgba($primary, 0.04);\n  transition: all $transition-fast;\n}\n\n.layout-item__drag[_ngcontent-%COMP%] {\n  width: 1.9rem;\n  height: 1.9rem;\n  border: 1px solid rgba($glass-border, 0.8);\n  border-radius: $radius-md;\n  background: rgba(255, 255, 255, 0.8);\n  color: $text-muted;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: grab;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.78rem;\n  }\n\n  &:active {\n    cursor: grabbing;\n  }\n}\n\n.layout-item__index[_ngcontent-%COMP%] {\n  width: 1.25rem;\n  text-align: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $text-muted;\n  flex-shrink: 0;\n}\n\n.layout-item:hover[_ngcontent-%COMP%] {\n  background: rgba($primary, 0.08);\n  border-color: rgba($primary, 0.2);\n}\n\n.layout-handle[_ngcontent-%COMP%] {\n  color: $text-muted;\n  font-size: $font-size-lg;\n}\n\n.layout-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.layout-title[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.layout-desc[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.layout-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n  margin-top: $space-4;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CHARTS[_ngcontent-%COMP%]   ROW\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.charts-row[_ngcontent-%COMP%] {\n  // Match the standard two-card row layout for charts.\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-5;\n  margin-bottom: $space-5;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n  }\n}\n\n.charts-row.cdk-drop-list-dragging[_ngcontent-%COMP%]   .chart-card:not(.cdk-drag-placeholder)[_ngcontent-%COMP%] {\n  transition: transform 200ms ease;\n}\n\n.chart-card[_ngcontent-%COMP%] {\n  position: relative;\n\n  &.large {\n    .card-body {\n      padding: $space-5;\n    }\n  }\n\n  &.size-sm,\n  &.size-md,\n  &.size-lg {\n    grid-column: span 1;\n  }\n}\n\n.chart-card--resizable[_ngcontent-%COMP%] {\n  max-width: 100%;\n  min-width: 280px;\n  min-height: 280px;\n}\n\n//[_ngcontent-%COMP%]   Chart[_ngcontent-%COMP%]   cards[_ngcontent-%COMP%]   now[_ngcontent-%COMP%]   use[_ngcontent-%COMP%]   fixed[_ngcontent-%COMP%]   content-driven[_ngcontent-%COMP%]   heights[_ngcontent-%COMP%]   to[_ngcontent-%COMP%]   match[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   rest[_ngcontent-%COMP%]   of[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   dashboard.\n.chart-card[data-card-id=\"revenue\"][_ngcontent-%COMP%] {\n  min-height: 360px;\n}\n\n.chart-card[data-card-id=\"growth\"][_ngcontent-%COMP%] {\n  min-height: 320px;\n}\n\n.chart-card.cdk-drag-preview[_ngcontent-%COMP%] {\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);\n  border-radius: $radius-2xl;\n}\n\n.chart-card.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0.3;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.04);\n}\n\n.chart-card.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 200ms ease;\n}\n\n.card-resizable[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  max-width: 100%;\n}\n\n.card-resizable[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow: auto;\n}\n\n.card-resizable[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.card-resizable[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n//[_ngcontent-%COMP%]   Resize[_ngcontent-%COMP%]   handles[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   command[_ngcontent-%COMP%]   center[_ngcontent-%COMP%]   card[_ngcontent-%COMP%]   sizing.\n.resize-handle[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  z-index: 4;\n  background: transparent;\n}\n\n.resize-handle.handle-n,\n.resize-handle.handle-s[_ngcontent-%COMP%] {\n  left: 0;\n  right: 0;\n  height: 18px;\n  border-radius: 999px;\n  cursor: ns-resize;\n}\n\n.resize-handle.handle-n[_ngcontent-%COMP%] {\n  top: -9px;\n}\n\n.resize-handle.handle-s[_ngcontent-%COMP%] {\n  bottom: -9px;\n}\n\n.resize-handle.handle-e,\n.resize-handle.handle-w[_ngcontent-%COMP%] {\n  top: 0;\n  bottom: 0;\n  width: 18px;\n  border-radius: 999px;\n  cursor: ew-resize;\n}\n\n.resize-handle.handle-e[_ngcontent-%COMP%] {\n  right: -9px;\n}\n\n.resize-handle.handle-w[_ngcontent-%COMP%] {\n  left: -9px;\n}\n\n.resize-handle.handle-ne,\n.resize-handle.handle-nw,\n.resize-handle.handle-se,\n.resize-handle.handle-sw[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n}\n\n.resize-handle.handle-ne[_ngcontent-%COMP%] {\n  top: -13px;\n  right: -13px;\n  cursor: nesw-resize;\n}\n\n.resize-handle.handle-nw[_ngcontent-%COMP%] {\n  top: -13px;\n  left: -13px;\n  cursor: nwse-resize;\n}\n\n.resize-handle.handle-se[_ngcontent-%COMP%] {\n  bottom: -13px;\n  right: -13px;\n  cursor: nwse-resize;\n}\n\n.resize-handle.handle-sw[_ngcontent-%COMP%] {\n  bottom: -13px;\n  left: -13px;\n  cursor: nesw-resize;\n}\n\n.chart-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1; // Lift above .glass-card::before gradient overlay\n  width: 100%;\n  \n  &.medium {\n    height: 220px;\n  }\n  \n  &.small {\n    height: 160px;\n  }\n}\n\n.chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n}\n\n.legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  &.primary .legend-dot {\n    background: $primary;\n  }\n}\n\n.legend-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   GLASS[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.glass-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-2xl;\n  border: 1px solid $glass-border;\n  overflow: hidden;\n}\n\n.glass-card.card-resizable[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  padding: $space-4 $space-5;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  position: relative;\n  z-index: 1; // Lift above .glass-card::before gradient overlay\n  padding-right: calc(#{$space-5} + 120px);\n}\n\n.card-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.card-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  z-index: 2;\n}\n\n.card-control[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba($glass-border, 0.7);\n  color: $text-muted;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    border-color: rgba($primary, 0.25);\n    color: $primary;\n  }\n}\n\n.drag-handle[_ngcontent-%COMP%] {\n  cursor: grab;\n\n  &:active {\n    cursor: grabbing;\n  }\n}\n\n.card-title[_ngcontent-%COMP%] {\n  font-size: $font-size-card-title;\n  font-weight: 600;\n  color: $text-primary;\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0;\n  \n  i { color: $primary; }\n}\n\n.card-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: $space-1 $space-2;\n  background: rgba($success, 0.1);\n  color: $success;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  \n  &::before {\n    content: '';\n    width: 6px;\n    height: 6px;\n    background: $success;\n    border-radius: 50%;\n    margin-right: $space-1;\n    animation: pulse 2s infinite;\n  }\n\n  &.warn {\n    background: rgba($warning, 0.15);\n    color: $warning;\n\n    &::before {\n      background: $warning;\n    }\n  }\n}\n\n.card-body[_ngcontent-%COMP%] {\n  padding: $space-5;\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  // Lift content above .glass-card::before gradient overlay to prevent washed-out appearance\n  position: relative;\n  z-index: 1;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PIPELINE[_ngcontent-%COMP%]   FUNNEL\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.funnel-container[_ngcontent-%COMP%] {\n  margin-bottom: $space-5;\n}\n\n.funnel-stage[_ngcontent-%COMP%] {\n  margin-bottom: $space-2;\n}\n\n.funnel-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  margin: 0 auto;\n  transition: all $transition-base;\n  \n  &.stage-1 {\n    background: linear-gradient(135deg, rgba($cyan, 0.15), rgba($cyan, 0.05));\n    border: 1px solid rgba($cyan, 0.2);\n  }\n  \n  &.stage-2 {\n    background: linear-gradient(135deg, rgba($purple, 0.15), rgba($purple, 0.05));\n    border: 1px solid rgba($purple, 0.2);\n  }\n  \n  &.stage-3 {\n    background: linear-gradient(135deg, rgba($success, 0.15), rgba($success, 0.05));\n    border: 1px solid rgba($success, 0.2);\n  }\n  \n  &:hover {\n    transform: scale(1.02);\n  }\n}\n\n.funnel-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n}\n\n.funnel-value[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.funnel-conversion[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-1;\n  padding: $space-2 0;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  i {\n    font-size: 10px;\n    color: $primary;\n  }\n}\n\n.funnel-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.summary-value[_ngcontent-%COMP%] {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n  \n  &.success { color: $success; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACCOUNTS[_ngcontent-%COMP%]   LIST\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.accounts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.account-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.account-rank[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $text-muted;\n  background: $gray-100;\n  border-radius: $radius-md;\n}\n\n.account-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-base;\n  color: white;\n  \n  &.lead { background: $cyan-gradient; }\n  &.prospect { background: $purple-gradient; }\n  &.customer { background: $success-gradient; }\n}\n\n.account-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.account-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.account-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n  \n  .separator { opacity: 0.5; }\n}\n\n.account-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  \n  &.lead { background: $cyan; }\n  &.prospect { background: $purple; }\n  &.customer { background: $success; }\n}\n\n.status-text[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 500;\n  color: $text-secondary;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TRUTH[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]    + RISK[_ngcontent-%COMP%]   REGISTER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.truth-metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-3;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: $space-2;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-2;\n  }\n}\n\n.truth-metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.1);\n}\n\n.truth-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.truth-value[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n\n  &.success { color: $success; }\n  &.info { color: $primary; }\n  &.warning { color: $warning; }\n  &.danger { color: $danger; }\n}\n\n.truth-subtext[_ngcontent-%COMP%] {\n  margin-top: $space-3;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.risk-intelligence-body[_ngcontent-%COMP%] {\n  padding-top: $space-1;\n}\n\n.risk-intelligence-title-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.risk-intelligence-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.risk-intelligence-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n  padding: $space-4;\n  border-radius: calc(#{$radius-xl} + 6px);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(236, 243, 255, 0.82));\n  border: 1px solid rgba(182, 198, 228, 0.26);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.7),\n    0 18px 40px rgba(63, 94, 168, 0.1);\n}\n\n.risk-intelligence-overview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n\n  @include respond-to('tablet') {\n    flex-direction: column;\n  }\n}\n\n.risk-intelligence-overview-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n\n  p {\n    margin: 0;\n    max-width: 680px;\n    color: $text-secondary;\n    font-size: $font-size-sm;\n    line-height: 1.6;\n  }\n}\n\n.risk-intelligence-kicker[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #5a78a7;\n}\n\n.risk-intelligence-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 10px;\n\n  @include respond-to('tablet') {\n    justify-content: flex-start;\n  }\n}\n\n.risk-summary-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0 14px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(241, 245, 249, 0.8);\n  color: #475569;\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n\n  &.critical {\n    color: #b91c1c;\n    background: rgba(254, 226, 226, 0.9);\n    border-color: rgba(239, 68, 68, 0.24);\n  }\n\n  &.high {\n    color: #c2410c;\n    background: rgba(255, 237, 213, 0.92);\n    border-color: rgba(249, 115, 22, 0.22);\n  }\n\n  &.medium {\n    color: #a16207;\n    background: rgba(254, 243, 199, 0.92);\n    border-color: rgba(245, 158, 11, 0.22);\n  }\n\n  &.info {\n    color: #475569;\n    background: rgba(226, 232, 240, 0.92);\n    border-color: rgba(148, 163, 184, 0.22);\n  }\n}\n\n.risk-intelligence-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.risk-intelligence-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 164px minmax(0, 1fr) auto;\n  align-items: stretch;\n  border: 1px solid rgba(138, 157, 190, 0.22);\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(247, 249, 255, 0.92));\n  box-shadow: 0 10px 28px rgba(36, 55, 96, 0.08);\n  overflow: hidden;\n\n  &.critical {\n    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.12);\n  }\n\n  &.high {\n    box-shadow: 0 12px 30px rgba(249, 115, 22, 0.1);\n  }\n\n  &.medium {\n    box-shadow: 0 12px 30px rgba(245, 158, 11, 0.08);\n  }\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.risk-intelligence-rail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  padding: $space-4 $space-3;\n  background: linear-gradient(180deg, rgba(248, 250, 255, 0.96), rgba(241, 245, 255, 0.88));\n\n  .risk-intelligence-item.critical & {\n    background: linear-gradient(180deg, rgba(254, 242, 242, 0.98), rgba(254, 226, 226, 0.84));\n  }\n\n  .risk-intelligence-item.high & {\n    background: linear-gradient(180deg, rgba(255, 247, 237, 0.98), rgba(255, 237, 213, 0.84));\n  }\n\n  .risk-intelligence-item.medium & {\n    background: linear-gradient(180deg, rgba(255, 251, 235, 0.98), rgba(254, 243, 199, 0.84));\n  }\n}\n\n.risk-severity-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 999px;\n  font-size: 0.9rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n  background: rgba(148, 163, 184, 0.16);\n\n  &.critical {\n    color: #fff;\n    background: linear-gradient(135deg, #ef4444, #dc2626);\n  }\n\n  &.high {\n    color: #fff;\n    background: linear-gradient(135deg, #f97316, #ea580c);\n  }\n\n  &.medium {\n    color: #1f2937;\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n  }\n\n  &.info {\n    color: #64748b;\n    background: linear-gradient(135deg, #d8e1f1, #c7d2e7);\n  }\n}\n\n.risk-intelligence-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: $space-4;\n}\n\n.risk-intelligence-heading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.risk-intelligence-count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.risk-intelligence-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  margin-bottom: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: 1.15rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n  }\n}\n\n.risk-intelligence-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  color: $text-secondary;\n  font-size: $font-size-md;\n\n  strong {\n    color: $text-primary;\n    font-weight: 700;\n  }\n}\n\n.risk-intelligence-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: $space-4;\n\n  @include respond-to('tablet') {\n    justify-content: flex-start;\n    padding-top: 0;\n  }\n}\n\n.risk-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  border-radius: $radius-xl;\n  padding: 0.85rem 1.1rem;\n  font-weight: 700;\n  border: none;\n  color: #21406d;\n  background: linear-gradient(135deg, rgba(239, 244, 255, 0.96), rgba(223, 234, 255, 0.88));\n  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.18);\n\n  &.critical,\n  &.high {\n    color: #fff;\n    background: linear-gradient(135deg, #5e9cff, #3b82f6);\n    box-shadow: none;\n  }\n\n  &.medium {\n    color: #1e3a5f;\n    background: linear-gradient(135deg, #eef4ff, #dbeafe);\n  }\n\n  &.info {\n    color: #334155;\n    background: linear-gradient(135deg, #f8fafc, #e2e8f0);\n  }\n\n  .p-button-label {\n    font-weight: 700;\n  }\n}\n\n.risk-checklist[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.risk-checklist-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.12);\n\n  input[type='checkbox'] {\n    accent-color: $primary;\n  }\n}\n\n.risk-checklist-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  font-weight: 600;\n}\n\n.risk-checklist-count[_ngcontent-%COMP%] {\n  background: rgba($primary, 0.12);\n  color: $primary;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n}\n\n.execution-guide[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.execution-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-3;\n  border-radius: $radius-xl;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(236, 243, 255, 0.84));\n  border: 1px solid rgba(168, 186, 221, 0.22);\n  box-shadow: 0 12px 28px rgba(39, 57, 98, 0.08);\n}\n\n.execution-item-copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.execution-item-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.execution-step,\n.execution-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.execution-step[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #2563eb;\n}\n\n.execution-step.danger,\n.execution-count.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.96);\n  color: #b91c1c;\n}\n\n.execution-step.warning,\n.execution-count.warning[_ngcontent-%COMP%] {\n  background: rgba(255, 237, 213, 0.96);\n  color: #c2410c;\n}\n\n.execution-step.info,\n.execution-count.info[_ngcontent-%COMP%] {\n  background: rgba(219, 234, 254, 0.96);\n  color: #1d4ed8;\n}\n\n.execution-step.success,\n.execution-count.success[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.96);\n  color: #15803d;\n}\n\n.execution-title[_ngcontent-%COMP%] {\n  font-size: 1.04rem;\n  line-height: 1.35;\n  color: $text-primary;\n  font-weight: 700;\n}\n\n.execution-detail[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  line-height: 1.6;\n  color: $text-secondary;\n}\n\n.execution-objective[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  line-height: 1.55;\n  color: $text-muted;\n}\n\n.execution-footnote[_ngcontent-%COMP%] {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.expansion-signals[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.expansion-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba($info, 0.08);\n  border: 1px solid rgba($info, 0.18);\n}\n\n.expansion-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-primary;\n  margin-bottom: 2px;\n}\n\n.expansion-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.expansion-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: $space-1;\n}\n\n.expansion-status[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $success;\n  font-weight: 600;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CONFIDENCE[_ngcontent-%COMP%]   FORECAST[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   PREMIUM[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   zone:[_ngcontent-%COMP%]   weighted[_ngcontent-%COMP%]   value[_ngcontent-%COMP%]    + retention[_ngcontent-%COMP%]   ring[_ngcontent-%COMP%]   side-by-side\n.cf-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4 $space-5;\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.10) 0%, rgba(118, 75, 162, 0.08) 50%, rgba(99, 102, 241, 0.06) 100%);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(102, 126, 234, 0.18);\n  box-shadow: 0 4px 24px rgba(102, 126, 234, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);\n    border-color: rgba(102, 126, 234, 0.25);\n  }\n}\n\n.cf-hero__main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.cf-hero__label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: $text-muted;\n}\n\n.cf-hero__value[_ngcontent-%COMP%] {\n  font-size: 1.75rem; // 28px \u2014 large hero value\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: gradient-shift 4s ease-in-out infinite;\n  line-height: 1.15;\n  filter: drop-shadow(0 1px 2px rgba(102, 126, 234, 0.15));\n}\n\n.cf-hero__delta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $success;\n  margin-top: 2px;\n\n  i { font-size: 0.7rem; }\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.cf-hero__delta-hint[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: $text-muted;\n  font-size: $font-size-xs;\n  margin-left: 2px;\n}\n\n//[_ngcontent-%COMP%]   Retention[_ngcontent-%COMP%]   ring\n.cf-hero__ring[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.06));\n  }\n\n  .cf-hero:hover & {\n    transform: scale(1.06);\n  }\n}\n\n.cf-ring-bg[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba($gray-200, 0.5);\n  stroke-width: 4.5;\n}\n\n.cf-ring-fill[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-width: 5;\n  stroke-linecap: round;\n  transition: stroke-dasharray 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  &.excellent { stroke: $success;  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.35)); }\n  &.good      { stroke: $info;     filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.30)); }\n  &.fair      { stroke: $warning;  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.30)); }\n  &.poor      { stroke: $danger;   filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.30)); }\n}\n\n.cf-ring-label[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  strong {\n    font-size: 1.0625rem; // 17px\n    font-weight: 800;\n    color: $text-primary;\n    line-height: 1;\n  }\n\n  span {\n    font-size: 0.625rem; // 10px\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $text-muted;\n    margin-top: 2px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Raw[_ngcontent-%COMP%]   pipeline[_ngcontent-%COMP%]   reference[_ngcontent-%COMP%]   bar\n.cf-raw[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: $glass-bg-subtle;\n  border-left: 3px solid rgba(102, 126, 234, 0.3);\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cf-raw__value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-secondary;\n  font-size: $font-size-sm;\n}\n\n//[_ngcontent-%COMP%]   Metric[_ngcontent-%COMP%]   mini-tiles[_ngcontent-%COMP%]   (2\u00D72 grid)\n.cf-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-2;\n  margin-top: $space-3;\n\n  .cf-metric {\n    animation: fade-in-up 0.4s ease-out backwards;\n\n    @for $i from 1 through 4 {\n      &:nth-child(#{$i}) {\n        animation-delay: #{$i * 0.06}s;\n      }\n    }\n  }\n}\n\n.cf-metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(8px);\n  border: 1px solid transparent;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);\n\n    .cf-metric__icon {\n      transform: scale(1.1) rotate(3deg);\n    }\n  }\n}\n\n.cf-metric__icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.cf-metric--danger[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25); }\n.cf-metric--warning[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25); }\n.cf-metric--excellent[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #4ade80, #22c55e); box-shadow: 0 2px 8px rgba(34, 197, 94, 0.25); }\n.cf-metric--good[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #60a5fa, #3b82f6); box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25); }\n.cf-metric--fair[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25); }\n.cf-metric--poor[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25); }\n.cf-metric--info[_ngcontent-%COMP%]   .cf-metric__icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #818cf8, #667eea); box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25); }\n\n.cf-metric--danger[_ngcontent-%COMP%]  { border-color: rgba($danger,  0.15); background: rgba(239, 68, 68, 0.04); }\n.cf-metric--warning[_ngcontent-%COMP%] { border-color: rgba($warning, 0.15); background: rgba(245, 158, 11, 0.04); }\n.cf-metric--excellent[_ngcontent-%COMP%] { border-color: rgba($success, 0.15); background: rgba(34, 197, 94, 0.04); }\n.cf-metric--good[_ngcontent-%COMP%]    { border-color: rgba($info,    0.15); background: rgba(59, 130, 246, 0.04); }\n.cf-metric--fair[_ngcontent-%COMP%]    { border-color: rgba($warning, 0.15); background: rgba(245, 158, 11, 0.04); }\n.cf-metric--poor[_ngcontent-%COMP%]    { border-color: rgba($danger,  0.15); background: rgba(239, 68, 68, 0.04); }\n.cf-metric--info[_ngcontent-%COMP%]    { border-color: rgba($primary, 0.15); background: rgba(102, 126, 234, 0.04); }\n\n.cf-metric__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  min-width: 0;\n}\n\n.cf-metric__value[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1.2;\n}\n\n.cf-metric__label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem; // 11px\n  color: $text-muted;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n//[_ngcontent-%COMP%]   Keep[_ngcontent-%COMP%]   legacy[_ngcontent-%COMP%]   forecast[_ngcontent-%COMP%]   styles[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   anything[_ngcontent-%COMP%]   that[_ngcontent-%COMP%]   may[_ngcontent-%COMP%]   still[_ngcontent-%COMP%]   reference[_ngcontent-%COMP%]   them\n.forecast-value[_ngcontent-%COMP%] {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.forecast-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-2;\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.forecast-delta[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $success;\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.forecast-footnote[_ngcontent-%COMP%] {\n  margin-top: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.forecast-aux[_ngcontent-%COMP%] {\n  margin-top: $space-3;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.forecast-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.forecast-scenarios[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.scenario-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: $glass-bg-subtle;\n}\n\n.scenario-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.scenario-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.scenario-count[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.scenario-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.scenario-delta[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-muted;\n\n  &.positive {\n    color: $success;\n  }\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.cost-breakdown[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n\n    &::before {\n      content: '';\n      width: 3px;\n      height: 14px;\n      border-radius: 2px;\n      background: linear-gradient(180deg, #f87171, #ef4444);\n    }\n  }\n}\n\n.cost-breakdown__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.cost-deal[_ngcontent-%COMP%] {\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n  border: 1px solid rgba($danger, 0.10);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.85);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);\n    border-color: rgba($danger, 0.18);\n  }\n}\n\n.cost-deal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n}\n\n.cost-deal__name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.cost-deal__meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cost-deal__value[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $danger;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #f87171, #ef4444);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.cost-deal__factors[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.cost-factor[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  padding: 3px 10px;\n  border-radius: $radius-full;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba($primary, 0.10);\n  font-weight: 500;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.08);\n    border-color: rgba($primary, 0.20);\n    color: $text-secondary;\n  }\n}\n\n.cost-trend[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.cost-trend__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n\n    &::before {\n      content: '';\n      width: 3px;\n      height: 14px;\n      border-radius: 2px;\n      background: linear-gradient(180deg, #818cf8, #667eea);\n    }\n  }\n}\n\n.cost-breakdown-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.dialog-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.dialog-select[_ngcontent-%COMP%] {\n  border: 1px solid rgba($text-primary, 0.1);\n  background: rgba($gray-50, 0.8);\n  border-radius: $radius-md;\n  padding: 6px 10px;\n  font-size: $font-size-xs;\n}\n\n.cost-breakdown-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.cost-breakdown-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: rgba($primary, 0.05);\n}\n\n.cost-breakdown-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.cost-breakdown-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.cost-breakdown-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cost-breakdown-factors[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.cost-breakdown-values[_ngcontent-%COMP%] {\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  font-size: $font-size-xs;\n}\n\n.cost-breakdown-amount[_ngcontent-%COMP%] {\n  color: $text-muted;\n}\n\n.cost-breakdown-exposure[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $danger;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   NEW[_ngcontent-%COMP%]   LEADS[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   AT-RISK[_ngcontent-%COMP%]   DEALS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.lead-list,\n.risk-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.lead-row,\n.risk-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.lead-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-sm;\n  color: white;\n  background: $primary-gradient;\n}\n\n.lead-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.lead-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.lead-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n\n  .separator { opacity: 0.5; }\n}\n\n.lead-time[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.risk-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.risk-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.risk-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n\n  .separator { opacity: 0.5; }\n}\n\n.risk-reason[_ngcontent-%COMP%] {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $danger;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n}\n\n.risk-amount[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-health[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.manager-health__stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-2;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.health-pill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.12);\n  min-height: 64px;\n\n  &.danger {\n    background: rgba($danger, 0.10);\n    border-color: rgba($danger, 0.22);\n  }\n\n  &.warn {\n    background: rgba($warning, 0.12);\n    border-color: rgba($warning, 0.24);\n  }\n\n  &.muted {\n    background: rgba($glass-border, 0.5);\n    border-color: rgba($glass-border, 0.9);\n  }\n}\n\n.health-pill__value[_ngcontent-%COMP%] {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1;\n}\n\n.health-pill__label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.manager-health__queue[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.manager-health__truth[_ngcontent-%COMP%] {\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  border: 1px dashed rgba($primary, 0.2);\n  background: rgba($primary, 0.03);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.manager-health__truth--empty[_ngcontent-%COMP%] {\n  color: $text-muted;\n}\n\n.truth-heading[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: $text-muted;\n  font-weight: 600;\n}\n\n.truth-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n}\n\n.truth-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px $space-2;\n  border-radius: $radius-full;\n  background: rgba($primary, 0.1);\n  color: $text-primary;\n  font-size: $font-size-xs;\n  font-weight: 600;\n}\n\n.truth-empty[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n}\n\n.manager-deal[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($primary, 0.10);\n  background: rgba($primary, 0.04);\n}\n\n.manager-deal__info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.manager-deal__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-deal__meta[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n\n  .separator { opacity: 0.45; }\n}\n\n.manager-deal__reason[_ngcontent-%COMP%] {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $danger;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n}\n\n.manager-deal__side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n  min-width: 110px;\n}\n\n.manager-deal__amount[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-deal__metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.manager-deal__dates[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.coach-btn[_ngcontent-%COMP%] {\n  margin-top: $space-2;\n  width: 100%;\n  justify-content: center;\n}\n\n.coaching-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.coaching-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 140px;\n  gap: $space-3;\n}\n\n.coaching-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.coaching-field--sm[_ngcontent-%COMP%] {\n  max-width: 160px;\n}\n\n.coaching-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $text-muted;\n  font-weight: 600;\n}\n\n.coaching-textarea,\n.coaching-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($primary, 0.16);\n  background: $glass-bg-subtle;\n  color: $text-primary;\n  padding: $space-2 $space-3;\n  font-size: $font-size-sm;\n  outline: none;\n  transition: border-color $transition-fast, box-shadow $transition-fast;\n\n  &:focus {\n    border-color: rgba($primary, 0.5);\n    box-shadow: 0 0 0 3px rgba($primary, 0.15);\n  }\n}\n\n.coaching-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 110px;\n}\n\n.coaching-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-2;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TIMELINE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.my-tasks-card[_ngcontent-%COMP%] {\n  min-height: 420px;\n\n  .card-body {\n    padding: $space-4 $space-5;\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  .task-list {\n    flex: 1;\n    min-height: 0;\n    overflow: auto;\n    padding-right: $space-2;\n  }\n}\n\n//[_ngcontent-%COMP%]   Show[_ngcontent-%COMP%]   resize[_ngcontent-%COMP%]   handles[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   hover/resize[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   ALL[_ngcontent-%COMP%]   resizable[_ngcontent-%COMP%]   cards\n.card-resizable:hover[_ngcontent-%COMP%]   .resize-handle,\n.card-resizable.is-resizing[_ngcontent-%COMP%]   .resize-handle,\n.card-resizable:focus-within[_ngcontent-%COMP%]   .resize-handle[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.metric-card:hover[_ngcontent-%COMP%]   .kpi-drag-handle,\n.metric-card:focus-within[_ngcontent-%COMP%]   .kpi-drag-handle[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACTION[_ngcontent-%COMP%]   QUEUE[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Redesign\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.aq-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 0;\n  background: #fff;\n  border-radius: inherit;\n  overflow: hidden;\n  // CRITICAL: position + z-index lifts this above the .glass-card::before overlay\n  // that was painting a translucent radial gradient ON TOP of all card content,\n  // causing every chip / header / label to look washed-out.\n  position: relative;\n  z-index: 1;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-4 $space-5;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  gap: $space-3;\n}\n\n.aq-header__left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.aq-header__icon-ring[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: #fff;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .aq-card:hover & {\n    transform: scale(1.08) rotate(5deg);\n  }\n}\n\n.aq-header__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: $gray-800;\n  line-height: 1.2;\n}\n\n.aq-header__title-gradient[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: gradient-shift 4s ease-in-out infinite;\n}\n\n.aq-header__subtitle[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-top: 1px;\n}\n\n.aq-header__count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  padding: $space-1 $space-3;\n  border-radius: $radius-full;\n  background: rgba(102, 126, 234, 0.08);\n}\n\n.aq-header__count-num[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #667eea;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Chip[_ngcontent-%COMP%]   filters[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n}\n\n.aq-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: $radius-full;\n  border: 1px solid rgba(102, 126, 234, 0.18);\n  background: #fff;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-700;\n  cursor: pointer;\n  transition: all 200ms ease;\n  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n}\n\n.aq-chip__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.aq-chip__count[_ngcontent-%COMP%] {\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  border-radius: 9px;\n  font-size: 0.6875rem;\n  padding: 0 5px;\n}\n\n//[_ngcontent-%COMP%]   Chip[_ngcontent-%COMP%]   color[_ngcontent-%COMP%]   themes\n.aq-chip--danger[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #ef4444; }\n  .aq-chip__count { background: rgba(239, 68, 68, 0.18); color: #dc2626; }\n  &.aq-chip--active {\n    background: #ef4444; color: #fff; border-color: #ef4444;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--warning[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #f59e0b; }\n  .aq-chip__count { background: rgba(245, 158, 11, 0.18); color: #d97706; }\n  &.aq-chip--active {\n    background: #f59e0b; color: #fff; border-color: #f59e0b;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--purple[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #a855f7; }\n  .aq-chip__count { background: rgba(168, 85, 247, 0.18); color: #9333ea; }\n  &.aq-chip--active {\n    background: #a855f7; color: #fff; border-color: #a855f7;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--cyan[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #06b6d4; }\n  .aq-chip__count { background: rgba(6, 182, 212, 0.18); color: #0891b2; }\n  &.aq-chip--active {\n    background: #06b6d4; color: #fff; border-color: #06b6d4;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--orange[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #f97316; }\n  .aq-chip__count { background: rgba(249, 115, 22, 0.18); color: #ea580c; }\n  &.aq-chip--active {\n    background: #f97316; color: #fff; border-color: #f97316;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--slate[_ngcontent-%COMP%] {\n  .aq-chip__dot { background: #64748b; }\n  .aq-chip__count { background: rgba(100, 116, 139, 0.18); color: #475569; }\n  &.aq-chip--active {\n    background: #475569; color: #fff; border-color: #475569;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Segmented[_ngcontent-%COMP%]   tab[_ngcontent-%COMP%]   bar[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-tabs[_ngcontent-%COMP%] {\n  padding: 0 $space-5;\n}\n\n.aq-tabs__track[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  padding: 3px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.06);\n  overflow-x: auto;\n\n  &::-webkit-scrollbar { display: none; }\n}\n\n.aq-tabs__btn[_ngcontent-%COMP%] {\n  appearance: none;\n  flex: 1 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px 14px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  color: $gray-500;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: all 200ms ease;\n\n  &:hover {\n    color: $gray-700;\n    background: rgba(255, 255, 255, 0.6);\n  }\n\n  &--active {\n    background: #fff;\n    color: $gray-800;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06);\n\n    .aq-tabs__badge {\n      background: rgba(102, 126, 234, 0.12);\n      color: #667eea;\n    }\n  }\n}\n\n.aq-tabs__badge[_ngcontent-%COMP%] {\n  min-width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  padding: 0 5px;\n  border-radius: 9px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: rgba(0, 0, 0, 0.06);\n  color: $gray-500;\n  transition: inherit;\n\n  &--danger { background: rgba(239, 68, 68, 0.18); color: #dc2626; }\n  &--warning { background: rgba(245, 158, 11, 0.18); color: #d97706; }\n  &--purple { background: rgba(168, 85, 247, 0.18); color: #9333ea; }\n  &--cyan { background: rgba(6, 182, 212, 0.18); color: #0891b2; }\n  &--orange { background: rgba(249, 115, 22, 0.18); color: #ea580c; }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Item[_ngcontent-%COMP%]   list[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-3 $space-5 $space-4;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);\n\n  &::-webkit-scrollbar { width: 4px; }\n  &::-webkit-scrollbar-track { background: transparent; }\n  &::-webkit-scrollbar-thumb { background: rgba(102, 126, 234, 0.15); border-radius: 4px; }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Single[_ngcontent-%COMP%]   item[_ngcontent-%COMP%]   card[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@keyframes[_ngcontent-%COMP%]   aq-item-in[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateX(-12px); }\n  to   { opacity: 1; transform: translateX(0); }\n}\n\n.aq-item[_ngcontent-%COMP%] {\n  display: flex;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #ffffff, #f8faff);\n  border: 1px solid rgba(102, 126, 234, 0.12);\n  overflow: visible;\n  transition: all 220ms ease;\n  animation: aq-item-in 350ms ease both;\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06);\n    border-color: rgba(102, 126, 234, 0.25);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 248, 255, 0.95));\n  }\n}\n\n//[_ngcontent-%COMP%]   Left[_ngcontent-%COMP%]   color[_ngcontent-%COMP%]   strip\n.aq-item__strip[_ngcontent-%COMP%] {\n  width: 5px;\n  flex-shrink: 0;\n  border-radius: 4px 0 0 4px;\n  background: $gray-300;\n\n  &--danger  { background: linear-gradient(180deg, #f87171, #ef4444); box-shadow: 2px 0 8px rgba(239, 68, 68, 0.2); }\n  &--warning { background: linear-gradient(180deg, #fbbf24, #f59e0b); box-shadow: 2px 0 8px rgba(245, 158, 11, 0.2); }\n  &--purple  { background: linear-gradient(180deg, #c084fc, #a855f7); box-shadow: 2px 0 8px rgba(168, 85, 247, 0.2); }\n  &--cyan    { background: linear-gradient(180deg, #22d3ee, #06b6d4); box-shadow: 2px 0 8px rgba(6, 182, 212, 0.2); }\n  &--default { background: linear-gradient(180deg, #818cf8, #667eea); box-shadow: 2px 0 8px rgba(102, 126, 234, 0.2); }\n}\n\n.aq-item__body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  flex: 1;\n  min-width: 0;\n}\n\n//[_ngcontent-%COMP%]   Icon[_ngcontent-%COMP%]   badge\n.aq-item__icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .aq-item:hover & { transform: scale(1.12); }\n\n  &--danger  { background: rgba(239, 68, 68, 0.15); color: #ef4444; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15); }\n  &--warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15); }\n  &--purple  { background: rgba(168, 85, 247, 0.15); color: #a855f7; box-shadow: 0 2px 8px rgba(168, 85, 247, 0.15); }\n  &--cyan    { background: rgba(6, 182, 212, 0.15); color: #06b6d4; box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15); }\n  &--primary { background: rgba(102, 126, 234, 0.15); color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15); }\n}\n\n//[_ngcontent-%COMP%]   Content\n.aq-item__content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.aq-item__row-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: 4px;\n  flex-wrap: wrap;\n}\n\n.aq-item__title[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 650;\n  color: $gray-900;\n  word-break: break-word;\n  letter-spacing: -0.01em;\n}\n\n.aq-item__due[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: $radius-full;\n\n  &.due-overdue  { background: rgba(239, 68, 68, 0.14); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.1); }\n  &.due-today    { background: rgba(245, 158, 11, 0.14); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.1); }\n  &.due-soon     { background: rgba(102, 126, 234, 0.12); color: #667eea; border: 1px solid rgba(102, 126, 234, 0.08); }\n  &.due-upcoming,\n  &.due-neutral  { background: rgba(15, 23, 42, 0.05); color: $gray-500; border: 1px solid rgba(15, 23, 42, 0.04); }\n}\n\n.aq-item__subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  font-weight: 500;\n  word-break: break-word;\n  margin-bottom: $space-1;\n}\n\n.aq-item__tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.aq-item__tag[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: $gray-600;\n  padding: 3px 10px;\n  border-radius: 6px;\n  background: rgba(102, 126, 234, 0.08);\n  border: 1px solid rgba(102, 126, 234, 0.06);\n\n  &--status {\n    text-transform: capitalize;\n    font-weight: 700;\n    color: $gray-700;\n    background: rgba(15, 23, 42, 0.06);\n    border-color: rgba(15, 23, 42, 0.04);\n  }\n\n  &--overdue {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n    border-color: rgba(239, 68, 68, 0.08);\n  }\n}\n\n//[_ngcontent-%COMP%]   Actions\n.aq-item__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  padding-right: $space-4;\n}\n\n.aq-item__action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: $font-size-xs;\n  transition: all 200ms ease;\n\n  &--phone,\n  &--email {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    background: rgba(102, 126, 234, 0.06);\n    color: $gray-500;\n    padding: 0;\n    border: 1px solid rgba(102, 126, 234, 0.08);\n\n    &:hover {\n      background: rgba(102, 126, 234, 0.12);\n      color: #667eea;\n      transform: translateY(-1px);\n      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);\n    }\n  }\n\n  &--complete {\n    height: 32px;\n    border-radius: 8px;\n    padding: 0 12px;\n    background: linear-gradient(135deg, #4ade80, #22c55e);\n    color: #fff;\n    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);\n\n    &:hover {\n      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);\n      transform: translateY(-1px);\n    }\n  }\n\n  &--review {\n    height: 32px;\n    border-radius: 8px;\n    padding: 0 14px;\n    background: linear-gradient(135deg, #a78bfa, #7c3aed);\n    color: #fff;\n    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);\n\n    &:hover {\n      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);\n      transform: translateY(-1px);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   (Legacy .task-* / .priority-* styles removed \u2014 replaced by .aq-* classes above)\n\n.timeline-filter[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n}\n\n.filter-btn[_ngcontent-%COMP%] {\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  color: $text-muted;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover { color: $text-secondary; }\n  \n  &.active {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.timeline[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  position: relative;\n  padding-bottom: $space-4;\n  \n  &.overdue {\n    .timeline-marker {\n      background: rgba($danger, 0.1) !important;\n      color: $danger !important;\n      border-color: rgba($danger, 0.2) !important;\n    }\n  }\n  \n  &:last-child {\n    padding-bottom: 0;\n  }\n}\n\n.timeline-marker[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  z-index: 1;\n  \n  &.call {\n    background: rgba($cyan, 0.1);\n    color: $cyan;\n    border: 1px solid rgba($cyan, 0.2);\n  }\n  \n  &.email {\n    background: rgba($purple, 0.1);\n    color: $purple;\n    border: 1px solid rgba($purple, 0.2);\n  }\n  \n  &.meeting {\n    background: rgba($primary, 0.1);\n    color: $primary;\n    border: 1px solid rgba($primary, 0.2);\n  }\n  \n  &.task {\n    background: rgba($success, 0.1);\n    color: $success;\n    border: 1px solid rgba($success, 0.2);\n  }\n}\n\n.timeline-connector[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 19px;\n  top: 44px;\n  width: 2px;\n  height: calc(100% - 44px);\n  background: linear-gradient(to bottom, $glass-border, transparent);\n}\n\n.timeline-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.timeline-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-1;\n}\n\n.timeline-type[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: $text-muted;\n}\n\n.timeline-time[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  &.overdue {\n    color: $danger;\n    font-weight: 600;\n  }\n}\n\n.timeline-subject[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $text-primary;\n  margin-bottom: $space-1;\n}\n\n.timeline-entity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  i { font-size: 10px; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HEALTH[_ngcontent-%COMP%]   METER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.stats-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\n.health-meter[_ngcontent-%COMP%] {\n  position: relative;\n  width: 140px;\n  height: 140px;\n  margin-bottom: $space-3;\n}\n\n.circular-progress[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  transform: rotate(-90deg);\n}\n\n.progress-bg[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: $gray-200;\n  stroke-width: 8;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: $primary;\n  stroke-width: 8;\n  stroke-linecap: round;\n  transition: stroke-dasharray 0.6s ease;\n}\n\n.health-value[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.health-number[_ngcontent-%COMP%] {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  background: $primary-gradient;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.health-unit[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $text-muted;\n}\n\n.health-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n  margin-bottom: $space-4;\n}\n\n.health-breakdown[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.breakdown-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n}\n\n.breakdown-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  \n  &.success { background: $success; }\n  &.danger { background: $danger; }\n}\n\n.breakdown-text[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  text-align: left;\n}\n\n.breakdown-value[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8 $space-4;\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: $radius-xl;\n  background: $gray-100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: $space-4;\n  \n  i {\n    font-size: 1.5rem;\n    color: $text-muted;\n  }\n}\n\n.empty-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $text-secondary;\n  margin: 0 0 $space-1;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: $space-4;\n  \n  p {\n    font-size: $font-size-sm;\n    color: $text-muted;\n  }\n}\n\n.loading-spinner[_ngcontent-%COMP%] {\n  position: relative;\n  width: 60px;\n  height: 60px;\n}\n\n.spinner-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  animation: spin 1.2s ease-in-out infinite;\n  \n  &:nth-child(1) {\n    border-top-color: $primary;\n    animation-delay: 0s;\n  }\n  \n  &:nth-child(2) {\n    inset: 6px;\n    border-right-color: $cyan;\n    animation-delay: 0.2s;\n    animation-direction: reverse;\n  }\n  \n  &:nth-child(3) {\n    inset: 12px;\n    border-bottom-color: $purple;\n    animation-delay: 0.4s;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PIPELINE[_ngcontent-%COMP%]   CHART[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.pipeline-chart-card[_ngcontent-%COMP%] {\n  .card-badge {\n    background: rgba($primary, 0.1);\n    color: $primary;\n    \n    &::before {\n      display: none;\n    }\n  }\n}\n\n.pipeline-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, 1fr);\n    gap: $space-2;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-2;\n    margin-top: $space-2;\n    padding-top: $space-2;\n  }\n}\n\n.pipeline-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  text-align: center;\n  \n  .stat-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n  \n  .stat-value {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $text-primary;\n  }\n\n  .stat-subvalue {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $text-muted;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACTIVITY[_ngcontent-%COMP%]   BREAKDOWN[_ngcontent-%COMP%]   (DONUT CARD)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.donut-card[_ngcontent-%COMP%] {\n  .card-body {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n}\n\n.donut-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 280px;\n  margin-bottom: $space-4;\n}\n\n.activity-breakdown-list[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.breakdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba($gray-100, 0.5);\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.05);\n  }\n}\n\n.breakdown-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  &.cyan {\n    background: rgba($cyan, 0.1);\n    color: $cyan;\n  }\n  \n  &.purple {\n    background: rgba($purple, 0.1);\n    color: $purple;\n  }\n  \n  &.primary {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n  \n  &.success {\n    background: rgba($success, 0.1);\n    color: $success;\n  }\n  \n  i { font-size: $font-size-sm; }\n}\n\n.breakdown-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n}\n\n.breakdown-count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CONVERSION[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.conversion-card[_ngcontent-%COMP%] {\n  .card-body {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.trend-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: $space-1 $space-2;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  \n  &.up {\n    background: rgba($success, 0.1);\n    color: $success;\n  }\n  \n  &.down {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n  \n  i { font-size: 10px; }\n}\n\n.conversion-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.summary-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  \n  .stat-value {\n    font-size: $font-size-xl;\n    font-weight: 700;\n    color: $text-primary;\n    \n    &.success { color: $success; }\n  }\n  \n  .stat-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TOP[_ngcontent-%COMP%]   PERFORMERS[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.performers-card[_ngcontent-%COMP%] {\n  .card-body {\n    padding: $space-4;\n  }\n}\n\n.performers-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.performer-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.performer-rank[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  background: $gray-100;\n  color: $text-muted;\n  \n  &.gold {\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n    color: white;\n  }\n  \n  &.silver {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    color: white;\n  }\n  \n  &.bronze {\n    background: linear-gradient(135deg, #d97706, #b45309);\n    color: white;\n  }\n}\n\n.performer-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: $radius-lg;\n  background: $primary-gradient;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.performer-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.performer-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  margin-bottom: 2px;\n}\n\n.performer-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  .separator {\n    opacity: 0.5;\n  }\n  \n  .revenue {\n    color: $success;\n    font-weight: 500;\n  }\n}\n\n.performer-badge[_ngcontent-%COMP%] {\n  color: #fbbf24;\n  animation: pulse 2s infinite;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HEALTH[_ngcontent-%COMP%]   METRICS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.health-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.health-metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n  \n  > i {\n    font-size: $font-size-lg;\n    color: $primary;\n  }\n}\n\n.metric-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  \n  .metric-value {\n    font-size: $font-size-base;\n    font-weight: 700;\n    color: $text-primary;\n  }\n  \n  .metric-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESPONSIVE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media[_ngcontent-%COMP%]   (max-width: 1400px)[_ngcontent-%COMP%] {\n  .dashboard-card-grid {\n    gap: $space-4;\n  }\n}\n\n@media (max-width: 1200px) {\n  .charts-row,\n[_ngcontent-%COMP%]   .dashboard-card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .metrics-grid[_ngcontent-%COMP%] {\n    .metric-card {\n      flex: 0 0 calc(50% - #{$space-3} / 2);\n    }\n    \n    .metric-card.featured {\n      flex: 0 0 100%;\n\n      .metric-hero-main {\n        gap: $space-4;\n      }\n\n      .metric-value-large {\n        font-size: clamp(1.9rem, 4vw, 3rem);\n      }\n    }\n  }\n  \n  .dashboard-card-grid[_ngcontent-%COMP%] {\n    gap: $space-4;\n  }\n\n  .dashboard-card[_ngcontent-%COMP%] {\n    &.size-sm,\n    &.size-md,\n    &.size-lg {\n      width: 100%;\n    }\n  }\n  \n  .pipeline-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .truth-metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: $space-4;\n  }\n  \n  .hero-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: $space-4;\n  }\n  \n  .hero-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    \n    .btn-gradient, .btn-glass {\n      flex: 1;\n      justify-content: center;\n    }\n  }\n\n  //[_ngcontent-%COMP%]   Stack[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   controls[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   period[_ngcontent-%COMP%]   toggle[_ngcontent-%COMP%]   to[_ngcontent-%COMP%]   keep[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   metrics[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   readable[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   mobile.\n[_ngcontent-%COMP%]   .metrics-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: $space-3;\n  }\n\n  .metrics-period[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n\n  .period-divider[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .period-btn[_ngcontent-%COMP%] {\n    flex: 1 1 0;\n    text-align: center;\n    padding: $space-2 $space-3;\n  }\n\n  .range-picker-dropdown[_ngcontent-%COMP%] {\n    position: fixed;\n    top: auto;\n    right: $space-3;\n    left: $space-3;\n    bottom: $space-3;\n\n    ::ng-deep .p-datepicker {\n      .p-datepicker-panel {\n        flex-direction: column;\n      }\n    }\n  }\n  \n  .metrics-grid[_ngcontent-%COMP%] {\n    .metric-card {\n      flex: 0 0 100%;\n    }\n    \n    .metric-card.featured {\n      flex: 0 0 100%;\n\n      .metric-hero-main {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: $space-4;\n      }\n    }\n  }\n\n  .metric-topline,\n[_ngcontent-%COMP%]   .metric-health[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .metric-status-rail[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .metric-copy[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  \n  .health-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  \n  .conversion-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .manager-health__stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .coaching-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .manager-deal[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .manager-deal__side,\n[_ngcontent-%COMP%]   .manager-deal__dates[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n\n  //[_ngcontent-%COMP%]   Stack[_ngcontent-%COMP%]   card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   content[_ngcontent-%COMP%]   so[_ngcontent-%COMP%]   controls[_ngcontent-%COMP%]   stay[_ngcontent-%COMP%]   visible[_ngcontent-%COMP%]   without[_ngcontent-%COMP%]   overlap.\n[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    padding-right: $space-5;\n  }\n\n  .card-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n  }\n\n  .card-controls[_ngcontent-%COMP%] {\n    position: static;\n    align-self: flex-end;\n    margin-top: $space-2;\n  }\n}\n\n@media (max-width: 640px) {\n  //[_ngcontent-%COMP%]   Prevent[_ngcontent-%COMP%]   hero[_ngcontent-%COMP%]   pills[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   chart[_ngcontent-%COMP%]   cards[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   overflowing[_ngcontent-%COMP%]   narrow[_ngcontent-%COMP%]   screens.\n[_ngcontent-%COMP%]   .hero-stats[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .hero-stat-pill[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .charts-row[_ngcontent-%COMP%] {\n    gap: $space-4;\n  }\n\n  .metric-value-large[_ngcontent-%COMP%] {\n    font-size: clamp(1.9rem, 8vw, 2.6rem);\n  }\n\n  .metric-value[_ngcontent-%COMP%] {\n    font-size: clamp(1.2rem, 6vw, 1.6rem);\n  }\n\n  .metric-card[_ngcontent-%COMP%] {\n    padding: $space-3;\n    min-height: 148px;\n  }\n\n  .metric-icon-large[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n    border-radius: 20px;\n  }\n\n  .metric-hero-pills[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n\n  .metric-hero-pill[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n  }\n\n  .manager-health__stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .coaching-field--sm[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   SALES[_ngcontent-%COMP%]   TEAM[_ngcontent-%COMP%]   PERFORMANCE[_ngcontent-%COMP%]   CARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.team-perf[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.team-perf__kpis[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid $glass-border;\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.team-perf__kpi[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: rgba($primary, 0.03);\n  transition: background $transition-fast;\n\n  &:hover {\n    background: rgba($primary, 0.06);\n  }\n}\n\n.team-perf__kpi-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.team-perf__kpi-value[_ngcontent-%COMP%] {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.team-perf__kpi-delta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n\n  &.positive {\n    color: $success;\n  }\n\n  &.negative {\n    color: $danger;\n  }\n\n  i {\n    font-size: 0.625rem;\n  }\n}\n\n.team-perf__reps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n//[_ngcontent-%COMP%]   Column[_ngcontent-%COMP%]   widths[_ngcontent-%COMP%]   shared[_ngcontent-%COMP%]   between[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   rows\n.rep-col-rank[_ngcontent-%COMP%] {\n  width: 32px;\n  flex-shrink: 0;\n  text-align: center;\n}\n\n.rep-col-name[_ngcontent-%COMP%] {\n  flex: 1.4;\n  min-width: 0;\n}\n\n.rep-col-metric[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  min-width: 0;\n}\n\n//[_ngcontent-%COMP%]   Table[_ngcontent-%COMP%]   header\n.team-perf__rep-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  margin-bottom: $space-1;\n  border-bottom: 1px solid rgba($primary, 0.08);\n}\n\n.team-perf__rep-header-cell[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n//[_ngcontent-%COMP%]   Rep[_ngcontent-%COMP%]   row\n.team-perf__rep[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.team-perf__rep-rank[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  background: $gray-100;\n  color: $text-muted;\n\n  &.gold {\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n    color: white;\n  }\n\n  &.silver {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    color: white;\n  }\n\n  &.bronze {\n    background: linear-gradient(135deg, #d97706, #b45309);\n    color: white;\n  }\n}\n\n.team-perf__rep-identity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  min-width: 0;\n}\n\n.team-perf__rep-avatar[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: $radius-md;\n  background: $cyan-gradient;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: $font-size-xs;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n\n.team-perf__rep-avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n.team-perf__rep-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.team-perf__rep-metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1px;\n\n  strong {\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n\n    &.revenue {\n      color: $success;\n    }\n\n    &.activity {\n      color: $primary;\n    }\n\n    &.good {\n      color: $success;\n    }\n\n    &.okay {\n      color: #f59e0b;\n    }\n\n    &.low {\n      color: $danger;\n    }\n  }\n}\n\n.team-perf__rep-metric-label[_ngcontent-%COMP%] {\n  font-size: 0.625rem;\n  color: $text-muted;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n}\n\n.team-perf__empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-3;\n  padding: $space-6;\n  color: $text-muted;\n\n  i {\n    font-size: 2rem;\n    opacity: 0.4;\n  }\n\n  p {\n    font-size: $font-size-sm;\n    margin: 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPage, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgSwitch,
                    NgSwitchCase,
                    NgClass,
                    NgTemplateOutlet,
                    NgStyle,
                    DatePipe,
                    DecimalPipe,
                    PercentPipe,
                    CurrencyPipe,
                    FormsModule,
                    DragDropModule,
                    ChartModule,
                    ButtonModule,
                    DialogModule,
                    OrderListModule,
                    DatePickerModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"animated-orb orb-4\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"page-container dashboard\">\n  <div class=\"page-content\">\n    <!-- PrimeNG Breadcrumb -->\n    <app-breadcrumbs></app-breadcrumbs>\n    <div class=\"dashboard-layout\">\n      <div class=\"dashboard-main\">\n\n    <!-- Hero Section with Greeting -->\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-text\">\n          <div class=\"hero-greeting-row\">\n            <span class=\"hero-greeting\">{{ greeting }}</span>\n            <span class=\"realtime-indicator\" [class.updating]=\"realtimeUpdating()\">\n              <span class=\"realtime-dot\"></span>\n              <span class=\"realtime-label\">Live</span>\n            </span>\n          </div>\n          <h1 class=\"page-title\">\n            <span class=\"title-gradient\">Command</span>\n            <span class=\"title-light\">Center</span>\n          </h1>\n          <p class=\"page-subtitle\">Your CRM at a glance \u2014 track pipeline, monitor activities, and stay ahead of every deal.</p>\n        </div>\n        <div class=\"hero-stats\">\n          <div class=\"hero-stat-pill\">\n            <i class=\"pi pi-user-plus\"></i>\n            <span><strong>{{ summary().leads || 0 }}</strong> leads</span>\n          </div>\n          <div class=\"hero-stat-pill\">\n            <i class=\"pi pi-compass\"></i>\n            <span><strong>{{ summary().prospects || 0 }}</strong> prospects</span>\n          </div>\n          <div class=\"hero-stat-pill\">\n            <i class=\"pi pi-building\"></i>\n            <span><strong>{{ summary().activeCustomers || 0 }}</strong> customers</span>\n          </div>\n          <div class=\"hero-stat-pill success\" *ngIf=\"summary().overdueActivities === 0\">\n            <i class=\"pi pi-check-circle\"></i>\n            <span>All caught up!</span>\n          </div>\n          <div class=\"hero-stat-pill danger\" *ngIf=\"(summary().overdueActivities || 0) > 0\">\n            <i class=\"pi pi-exclamation-triangle\"></i>\n            <span><strong>{{ summary().overdueActivities }}</strong> overdue</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn-gradient btn-lg\" (click)=\"onQuickAdd()\">\n          <i class=\"pi pi-plus\"></i>\n          <span>Quick Add</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn-glass\">\n          <i class=\"pi pi-calendar\"></i>\n          <span>Schedule</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn-glass\">\n          <i class=\"pi pi-download\"></i>\n          <span>Export</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn-glass\" (click)=\"openLayoutDialog()\">\n          <i class=\"pi pi-sliders-h\"></i>\n          <span>Customize layout</span>\n        </button>\n      </div>\n    </section>\n\n    <!-- Data Load Retry Banner -->\n    <div class=\"data-retry-banner\" *ngIf=\"dataLoadFailed()\">\n      <i class=\"pi pi-exclamation-circle\"></i>\n      <span>Dashboard data failed to load. The API may still be starting up.</span>\n      <button type=\"button\" class=\"retry-btn\" (click)=\"retryLoadData()\">\n        <i class=\"pi pi-refresh\"></i>\n        Retry\n      </button>\n    </div>\n\n    <!-- Key Metrics Row -->\n    <section class=\"metrics-dashboard\">\n      <div class=\"metrics-header\">\n        <h2 class=\"section-title\">\n          <i class=\"pi pi-chart-bar\"></i>\n          Performance Overview\n        </h2>\n        <div class=\"metrics-period\">\n          <button type=\"button\" class=\"period-btn\" [class.active]=\"selectedPeriod() === 'month'\" (click)=\"selectPeriod('month')\">Month</button>\n          <button type=\"button\" class=\"period-btn\" [class.active]=\"selectedPeriod() === 'week'\" (click)=\"selectPeriod('week')\">Week</button>\n          <button type=\"button\" class=\"period-btn\" [class.active]=\"selectedPeriod() === 'today'\" (click)=\"selectPeriod('today')\">Today</button>\n          <div class=\"period-divider\"></div>\n          <button type=\"button\" class=\"period-btn period-btn--range\" [class.active]=\"selectedPeriod() === 'range'\" (click)=\"toggleRangePicker()\">\n            <i class=\"pi pi-calendar\"></i>\n            @if (selectedPeriod() === 'range' && rangeLabel()) {\n              <span class=\"range-label\">{{ rangeLabel() }}</span>\n            } @else {\n              Range\n            }\n          </button>\n        </div>\n        @if (showRangePicker()) {\n          <div class=\"range-picker-dropdown\">\n            <p-datepicker\n              selectionMode=\"range\"\n              [inline]=\"true\"\n              [numberOfMonths]=\"2\"\n              [ngModel]=\"dateRange()\"\n              (ngModelChange)=\"onDateRangeChange($event)\"\n              dateFormat=\"dd M yy\"\n              placeholder=\"Select date range\">\n            </p-datepicker>\n          </div>\n        }\n      </div>\n      <div\n        class=\"metrics-grid\"\n        cdkDropList\n        [cdkDropListData]=\"kpiOrder()\"\n        (cdkDropListDropped)=\"onKpiDrop($event)\"\n        cdkDropListOrientation=\"horizontal\"\n      >\n        <article class=\"metric-card featured card-resizable\" *ngIf=\"summary()\"\n          #kpiFeaturedCard\n          [attr.data-card-id]=\"'kpi-featured'\"\n          [ngStyle]=\"getCardDimensions('kpi-featured')\"\n          data-min-width=\"180\"\n          data-min-height=\"140\">\n          <div class=\"metric-glow primary\"></div>\n          <div class=\"metric-hero-header\">\n            <div class=\"metric-hero-kicker\">\n              <span class=\"metric-hero-kicker__label\">Forecast cockpit</span>\n              <span class=\"metric-hero-kicker__tone\" [class.down]=\"weightedPipelineDelta() < 0\" [class.up]=\"weightedPipelineDelta() >= 0\">\n                {{ weightedPipelineHeadline() }}\n              </span>\n            </div>\n          </div>\n          <div class=\"metric-hero-main\">\n            <div class=\"metric-icon-large primary\">\n              <i class=\"pi pi-chart-line\"></i>\n            </div>\n            <div class=\"metric-body\">\n              <div class=\"metric-value-large\">{{ summary().confidenceWeightedPipelineValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</div>\n              <div class=\"metric-label\">Confidence-Weighted Forecast</div>\n              <div class=\"metric-hero-pills\">\n                <span class=\"metric-hero-pill\">\n                  Raw {{ totalPipelineValue() | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                </span>\n                <span class=\"metric-hero-pill\">Retention {{ pipelineRetentionPct() }}%</span>\n                <span class=\"metric-hero-pill\">Calibration {{ calibrationLevel() }}</span>\n              </div>\n              <div class=\"metric-trend\" [class.down]=\"weightedPipelineDelta() < 0\" [class.up]=\"weightedPipelineDelta() >= 0\">\n                <i class=\"pi\" [class.pi-shield]=\"weightedPipelineDelta() >= 0\" [class.pi-arrow-down]=\"weightedPipelineDelta() < 0\"></i>\n                <span>{{ weightedPipelineDirectionLabel() }}</span>\n              </div>\n            </div>\n          </div>\n          <div class=\"resize-handle handle-e\" (mousedown)=\"startResize($event, kpiFeaturedCard, 'e')\"></div>\n          <div class=\"resize-handle handle-se\" (mousedown)=\"startResize($event, kpiFeaturedCard, 'se')\"></div>\n        </article>\n\n        <article class=\"metric-card card-resizable\" *ngFor=\"let metric of secondaryKpis(); let i = index\" cdkDrag\n          #kpiCard\n          [attr.data-card-id]=\"'kpi-' + metric.id\"\n          [ngStyle]=\"getCardDimensions('kpi-' + metric.id)\"\n          data-min-width=\"160\"\n          data-min-height=\"140\">\n          <div class=\"metric-glow\" [ngClass]=\"'metric-glow--' + metricTone(metric.id)\"></div>\n          <div class=\"metric-topline\">\n            <div class=\"metric-status-rail\" [ngClass]=\"'metric-status-rail--' + metricTone(metric.id)\">\n              <span class=\"metric-status-dot\"></span>\n              <span class=\"metric-status-copy\">{{ metric.sub }}</span>\n            </div>\n            <button type=\"button\" class=\"kpi-drag-handle\" cdkDragHandle aria-label=\"Reorder KPI\">\n              <i class=\"pi pi-bars\"></i>\n            </button>\n          </div>\n          <div class=\"metric-main\">\n            <div class=\"metric-icon\" [class]=\"metricTone(metric.id)\" cdkDragHandle>\n              <i class=\"pi\" [class]=\"metric.icon\"></i>\n            </div>\n            <div class=\"metric-copy\">\n              <div class=\"metric-value\" *ngIf=\"metric.format === 'currency'; else numericMetricValue\">\n                {{ metric.value | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n              </div>\n              <ng-template #numericMetricValue>\n                <div class=\"metric-value\">\n                  {{ metric.value | number:'1.0-0' }}\n                </div>\n              </ng-template>\n              <div class=\"metric-label\">{{ metric.label }}</div>\n            </div>\n          </div>\n          <div class=\"metric-footer\">\n            <div class=\"metric-health\">\n              <span class=\"metric-health-caption\">{{ metricHealthCaption(metric) }}</span>\n              <span class=\"metric-health-value\">{{ metric.percentage }}%</span>\n            </div>\n            <div class=\"metric-bar\" [ngClass]=\"'metric-bar--' + metricTone(metric.id)\">\n              <div class=\"metric-bar-fill\" [class]=\"metricTone(metric.id)\" [style.width.%]=\"metric.percentage\"></div>\n            </div>\n          </div>\n          <div class=\"resize-handle handle-e\" (mousedown)=\"startResize($event, kpiCard, 'e')\"></div>\n          <div class=\"resize-handle handle-se\" (mousedown)=\"startResize($event, kpiCard, 'se')\"></div>\n        </article>\n      </div>\n    </section>\n\n    <ng-template #aiOrchestrationCard>\n    <section class=\"ai-orchestration-section\">\n      <div class=\"ai-orchestration-header\">\n        <div class=\"ai-orchestration-title-group\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-bolt\"></i>\n            AI Recommendations\n          </h2>\n          <p class=\"ai-orchestration-subtitle\">{{ assistantSubtitle() }}</p>\n        </div>\n        <div class=\"ai-orchestration-header-meta\">\n          <span class=\"card-badge\">{{ assistantInsights().scope }} scope</span>\n          <span class=\"ai-generated-at\">Updated {{ assistantInsights().generatedAtUtc | date:'shortTime' }}</span>\n        </div>\n      </div>\n\n      <div class=\"ai-kpi-grid\">\n        <article\n          class=\"ai-kpi-card\"\n          *ngFor=\"let kpi of assistantKpis()\"\n          [attr.title]=\"assistantKpiTooltip(kpi.key, kpi.label)\"\n        >\n          <div class=\"ai-kpi-label\">{{ kpi.label }}</div>\n          <div class=\"ai-kpi-value\" [ngClass]=\"assistantSeverityClass(kpi.severity)\">{{ kpi.value | number:'1.0-0' }}</div>\n        </article>\n      </div>\n\n      <div class=\"ai-action-shell\" *ngIf=\"assistantActions().length; else noAiActions\">\n        <div class=\"ai-action-table-head\">\n          <div>Priority Score</div>\n          <div>Task Description</div>\n          <div>Risk</div>\n          <div>Action</div>\n        </div>\n\n        <div class=\"ai-action-list\">\n          <article\n            class=\"ai-action-row\"\n            *ngFor=\"let action of assistantActions(); let idx = index\"\n            [ngClass]=\"[\n              assistantRiskClass(action.riskTier),\n              assistantUrgencyClass(action.priority, action.urgency)\n            ]\"\n          >\n            <div class=\"ai-score-col\">\n              <div class=\"ai-row-index\">{{ idx + 1 }}</div>\n              <div class=\"ai-score-card\" [ngClass]=\"assistantRiskClass(action.riskTier)\">\n                <div class=\"ai-score-main\">{{ action.score }}</div>\n                <div class=\"ai-score-impact\">{{ assistantImpactLabel(action.score) }}</div>\n                <div class=\"ai-score-urgency\">{{ assistantImpactUrgencyLabel(action.score, action.priority, action.urgency) }}</div>\n              </div>\n            </div>\n\n            <div class=\"ai-task-col\">\n              <h3 class=\"card-title\">{{ action.title }}</h3>\n              <div class=\"ai-impact-inline\" [ngClass]=\"assistantRiskClass(action.riskTier)\">\n                {{ assistantImpactLabel(action.score) }} \u00B7 {{ assistantUrgencyLabel(action.priority, action.urgency) }} urgency\n              </div>\n              <p>{{ action.description }}</p>\n              <div class=\"ai-risk-rationale\" *ngIf=\"action.reasons.length\">\n                <span class=\"ai-risk-rationale__label\">Why now</span>\n                <span class=\"ai-risk-rationale__text\">{{ action.reasons[0] }}</span>\n              </div>\n              <div class=\"ai-task-meta\">\n                <span class=\"meta-chip ai-impact-pill\" [ngClass]=\"assistantRiskClass(action.riskTier)\">\n                  {{ assistantImpactLabel(action.score) }}\n                </span>\n                <span class=\"meta-chip ai-urgency-pill\">{{ assistantUrgencyLabel(action.priority, action.urgency) }} urgency</span>\n                <span class=\"meta-chip\"><i class=\"pi pi-users\"></i> {{ action.ownerScope }}</span>\n                <span><i class=\"pi pi-clock\"></i> {{ action.dueWindow }}</span>\n              </div>\n            </div>\n\n            <div class=\"ai-risk-col\">\n              <span class=\"ai-risk-chip\" [ngClass]=\"assistantRiskClass(action.riskTier)\">\n                {{ assistantRiskLabel(action.riskTier) }}\n              </span>\n            </div>\n\n            <div class=\"ai-cta-col\">\n              <button\n                pButton\n                type=\"button\"\n                class=\"ai-cta-btn\"\n                [ngClass]=\"[\n                  assistantRiskClass(action.riskTier),\n                  (action.riskTier || '').toLowerCase() === 'low' ? 'execute' : 'review'\n                ]\"\n                (click)=\"openAssistantAction(action)\"\n              >\n                <i class=\"pi\" [ngClass]=\"(action.riskTier || '').toLowerCase() === 'low' ? 'pi-bolt' : 'pi-search'\"></i>\n                {{ (action.riskTier || '').toLowerCase() === 'low' ? 'Execute' : 'Review' }}\n              </button>\n            </div>\n          </article>\n        </div>\n      </div>\n      <ng-template #noAiActions>\n        <div class=\"empty-state-inline\">\n          <strong *ngIf=\"assistantExecutionHealthy(); else monitorOnlyState\">Execution is healthy right now.</strong>\n          <ng-template #monitorOnlyState>\n            <strong>No urgent AI actions right now.</strong>\n          </ng-template>\n          <span>Use the Risk Intelligence card for guidance and watchlist review.</span>\n        </div>\n      </ng-template>\n\n      <div class=\"assistant-undo-strip\" *ngIf=\"assistantUndoVisible\">\n        <span>{{ assistantUndoMessage }}</span>\n        <button pButton type=\"button\" class=\"btn-glass\" [disabled]=\"assistantUndoBusy\" (click)=\"undoAssistantAction()\">\n          Undo\n        </button>\n      </div>\n    </section>\n    </ng-template>\n\n    <p-dialog\n      [(visible)]=\"assistantDetailDialogOpen\"\n      [modal]=\"true\"\n      [draggable]=\"false\"\n      [resizable]=\"false\"\n      [dismissableMask]=\"true\"\n      header=\"Assistant Action Detail\"\n      [style]=\"{ width: '96vw', maxWidth: '1200px' }\"\n      [contentStyle]=\"{ minHeight: '72vh' }\"\n      (onHide)=\"closeAssistantDetailDialog()\"\n    >\n      <div class=\"assistant-detail-content\" *ngIf=\"assistantDetailAction as action\">\n        <div class=\"assistant-detail-hero\">\n          <div>\n            <h3 class=\"card-title\">{{ action.title }}</h3>\n            <p>{{ action.description }}</p>\n          </div>\n          <span class=\"ai-risk-chip\" [ngClass]=\"assistantRiskClass(action.riskTier)\">\n            {{ assistantRiskLabel(action.riskTier) }}\n          </span>\n        </div>\n\n        <div class=\"assistant-detail-grid\">\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Score</span>\n            <span class=\"assistant-detail-value\">{{ action.score }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Priority rank</span>\n            <span class=\"assistant-detail-value\">{{ action.priority }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Urgency</span>\n            <span class=\"assistant-detail-value\">{{ assistantUrgencyLabel(action.priority, action.urgency) }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Owner scope</span>\n            <span class=\"assistant-detail-value\">{{ action.ownerScope }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Due window</span>\n            <span class=\"assistant-detail-value\">{{ action.dueWindow }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Action type</span>\n            <span class=\"assistant-detail-value\">{{ action.actionType || 'N/A' }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Entity type</span>\n            <span class=\"assistant-detail-value\">{{ action.entityType || 'General' }}</span>\n          </div>\n          <div class=\"assistant-detail-cell\">\n            <span class=\"assistant-detail-label\">Entity ID</span>\n            <span class=\"assistant-detail-value\">{{ action.entityId || 'N/A' }}</span>\n          </div>\n          <div class=\"assistant-detail-cell assistant-detail-cell-wide\">\n            <span class=\"assistant-detail-label\">Why now</span>\n            <ul class=\"assistant-detail-list\">\n              <li *ngFor=\"let reason of action.reasons\">{{ reason }}</li>\n            </ul>\n          </div>\n          <div class=\"assistant-detail-cell assistant-detail-cell-wide\">\n            <span class=\"assistant-detail-label\">Entities in scope</span>\n            <ul class=\"assistant-detail-list\">\n              <li *ngFor=\"let entity of action.entities\">{{ entity }}</li>\n            </ul>\n          </div>\n          <div class=\"assistant-detail-cell assistant-detail-cell-wide\">\n            <span class=\"assistant-detail-label\">Expected impact</span>\n            <span class=\"assistant-detail-value\">{{ action.impactEstimate }}</span>\n          </div>\n          <div class=\"assistant-detail-cell assistant-detail-cell-wide\">\n            <span class=\"assistant-detail-label\">Review guidance</span>\n            <span class=\"assistant-detail-value\">{{ action.reviewGuidance }}</span>\n          </div>\n        </div>\n      </div>\n      <ng-template pTemplate=\"footer\">\n        <button pButton type=\"button\" class=\"btn-glass\" (click)=\"closeAssistantDetailDialog()\">\n          Close\n        </button>\n        <button\n          pButton\n          type=\"button\"\n          class=\"btn-gradient\"\n          [ngClass]=\"(assistantDetailAction?.riskTier || '').toLowerCase() === 'low' ? 'execute' : 'review'\"\n          [disabled]=\"!assistantDetailAction\"\n          (click)=\"runAssistantActionFromDetail()\"\n        >\n          {{ (assistantDetailAction?.riskTier || '').toLowerCase() === 'low' ? 'Execute' : 'Review' }}\n        </button>\n      </ng-template>\n    </p-dialog>\n\n    <p-dialog\n      [(visible)]=\"assistantReviewDialogOpen\"\n      [modal]=\"true\"\n      [closable]=\"!assistantReviewSubmitting\"\n      [dismissableMask]=\"!assistantReviewSubmitting\"\n      header=\"Review Assistant Action\"\n      [style]=\"{ width: '520px', maxWidth: '92vw' }\"\n      (onHide)=\"cancelAssistantReview()\"\n    >\n      <div class=\"assistant-review-content\">\n        <p>This action is marked medium/high risk and needs review before execution.</p>\n        <textarea\n          rows=\"4\"\n          [disabled]=\"assistantReviewSubmitting\"\n          placeholder=\"Add review note (optional)\"\n          [ngModel]=\"assistantReviewNote\"\n          (ngModelChange)=\"assistantReviewNote = $event\"\n        ></textarea>\n      </div>\n      <ng-template pTemplate=\"footer\">\n        <button pButton type=\"button\" class=\"btn-glass\" [disabled]=\"assistantReviewSubmitting\" (click)=\"cancelAssistantReview()\">\n          Cancel\n        </button>\n        <button pButton type=\"button\" class=\"btn-glass\" [disabled]=\"assistantReviewSubmitting\" (click)=\"submitAssistantReview(false)\">\n          Reject\n        </button>\n        <button pButton type=\"button\" class=\"btn-gradient\" [disabled]=\"assistantReviewSubmitting\" (click)=\"submitAssistantReview(true)\">\n          Approve & Execute\n        </button>\n      </ng-template>\n    </p-dialog>\n\n    <!-- Main Grid: Command Center Cards -->\n    <section\n      class=\"dashboard-card-grid\"\n      cdkDropList\n      [cdkDropListData]=\"renderedLayoutOrder\"\n      (cdkDropListDropped)=\"onCardDrop($event)\"\n      cdkDropListOrientation=\"mixed\"\n    >\n        <article\n          class=\"glass-card dashboard-card card-resizable\"\n          *ngFor=\"let cardId of renderedLayoutOrder\"\n          [ngSwitch]=\"cardId\"\n          [ngClass]=\"getCardSizeClass(cardId)\"\n          [class.full-width-card]=\"cardId === 'ai-orchestration' || cardId === 'my-tasks'\"\n          [class.my-tasks-card]=\"cardId === 'my-tasks'\"\n          cdkDrag\n          (cdkDragStarted)=\"onCardDragStart($event)\"\n          (cdkDragEnded)=\"onCardDragEnd($event)\"\n          #dashboardCard\n          [attr.data-card-id]=\"cardId\"\n          [ngStyle]=\"getCardDimensions(cardId)\"\n          data-min-width=\"280\"\n          [attr.data-min-height]=\"cardId === 'my-tasks' ? 360 : 220\"\n        >\n        <ng-container *ngSwitchCase=\"'ai-orchestration'\">\n          <ng-container *ngTemplateOutlet=\"aiOrchestrationCard\"></ng-container>\n        </ng-container>\n\n        <!-- Pipeline Value Chart -->\n        <ng-container *ngSwitchCase=\"'pipeline'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-filter\"></i>\n              Pipeline by Stage\n            </h3>\n            <div class=\"card-actions\">\n              <span class=\"card-badge\">{{ totalPipelineValue() | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"chart-container medium\">\n              <p-chart type=\"bar\" [data]=\"pipelineChartData\" [options]=\"pipelineChartOptions\" height=\"100%\"></p-chart>\n            </div>\n            <div class=\"pipeline-stats\">\n              <div class=\"pipeline-stat\" *ngFor=\"let stage of pipelineValue()\">\n                <span class=\"stat-label\">{{ stage.stage }}</span>\n                <span class=\"stat-value\">{{ stage.count }} deals</span>\n                <span class=\"stat-subvalue\">{{ stage.value | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Truth Metrics -->\n        <ng-container *ngSwitchCase=\"'truth-metrics'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-verified\"></i>\n              Truth Metrics\n            </h3>\n            <div class=\"card-actions\">\n              <span class=\"card-badge\">{{ summary().avgTruthCoverage | percent:'1.0-0' }}</span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"truth-metrics-grid\">\n              <div class=\"truth-metric\">\n                <span class=\"truth-label\">Truth Coverage</span>\n                <span class=\"truth-value\">{{ summary().avgTruthCoverage | percent:'1.0-0' }}</span>\n              </div>\n              <div class=\"truth-metric\">\n                <span class=\"truth-label\">Confidence</span>\n                <span class=\"truth-value\"\n                      [class]=\"confidenceTone(summary().avgQualificationConfidence)\">\n                  {{ confidenceLabel(summary().avgQualificationConfidence) }}\n                </span>\n              </div>\n              <div class=\"truth-metric\">\n                <span class=\"truth-label\">Time-to-Truth</span>\n                <span class=\"truth-value\">{{ summary().avgTimeToTruthDays | number:'1.0-1' }}d</span>\n              </div>\n            </div>\n            <div class=\"truth-subtext\">\n              Based on current lead qualification signals.\n            </div>\n          </div>\n        </ng-container>\n\n        <ng-container *ngSwitchCase=\"'risk-register'\">\n          <div class=\"card-header\">\n            <div class=\"risk-intelligence-title-block\">\n              <h3 class=\"card-title\">\n                <i class=\"pi pi-shield\"></i>\n                Risk Intelligence\n              </h3>\n              <span class=\"risk-intelligence-subtitle\">Top CRM risks ranked by urgency, with owner context and the next recommended action.</span>\n            </div>\n            <div class=\"card-actions\">\n              <span class=\"card-badge\">{{ summary().riskRegisterCount }}</span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body risk-intelligence-body\">\n            <div class=\"risk-intelligence-panel\" *ngIf=\"riskIntelligenceItems().length; else emptyRiskFlags\">\n              <div class=\"risk-intelligence-overview\">\n                <div class=\"risk-intelligence-overview-copy\">\n                  <span class=\"risk-intelligence-kicker\">Early warning</span>\n                  <p>Use this card to understand what is at risk, why it is risky, and where managers or owners should act first.</p>\n                </div>\n                <div class=\"risk-intelligence-summary\" *ngIf=\"riskIntelligenceSummary().length\">\n                  <span\n                    class=\"risk-summary-pill\"\n                    *ngFor=\"let item of riskIntelligenceSummary()\"\n                    [ngClass]=\"item.severity\"\n                  >\n                    {{ item.label }} \u00B7 {{ item.count }}\n                  </span>\n                </div>\n              </div>\n\n              <div class=\"risk-intelligence-list\">\n                <article\n                  class=\"risk-intelligence-item\"\n                  *ngFor=\"let item of riskIntelligenceItems()\"\n                  [ngClass]=\"riskIntelligenceSeverityClass(item.severity)\"\n                >\n                  <div class=\"risk-intelligence-rail\">\n                    <span class=\"risk-severity-pill\" [ngClass]=\"riskIntelligenceSeverityClass(item.severity)\">\n                      <i class=\"pi pi-exclamation-triangle\"></i>\n                      {{ riskIntelligenceSeverityLabel(item.severity) }}\n                    </span>\n                  </div>\n\n                  <div class=\"risk-intelligence-main\">\n                    <div class=\"risk-intelligence-head\">\n                      <div class=\"risk-intelligence-heading\">\n                        <h4>{{ item.label }}</h4>\n                        <span class=\"risk-intelligence-count\">{{ item.count }} active signals</span>\n                      </div>\n                    </div>\n                    <div class=\"risk-intelligence-meta\">\n                      <span><strong>Why:</strong> {{ item.impact }}</span>\n                      <span><strong>Recommended action:</strong> {{ item.recommendedAction }}</span>\n                    </div>\n                  </div>\n\n                  <div class=\"risk-intelligence-actions\">\n                    <button\n                      pButton\n                      type=\"button\"\n                      class=\"risk-action-btn\"\n                      [ngClass]=\"riskIntelligenceSeverityClass(item.severity)\"\n                      (click)=\"openRiskIntelligence(item)\"\n                    >\n                      <i class=\"pi pi-arrow-right\"></i>\n                      Open workspace\n                    </button>\n                  </div>\n                </article>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Execution Guide -->\n        <ng-container *ngSwitchCase=\"'execution-guide'\">\n          <div class=\"card-header\">\n            <div class=\"risk-intelligence-title-block\">\n              <h3 class=\"card-title\">\n                <i class=\"pi pi-compass\"></i>\n                Operating Priorities\n              </h3>\n              <span class=\"risk-intelligence-subtitle\">Recommended focus order for the current book of business, not another count summary.</span>\n            </div>\n            <div class=\"card-actions\">\n              <span class=\"card-badge\">{{ executionGuideItems().length }}</span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"execution-guide\" *ngIf=\"executionGuideItems().length; else emptyExecutionGuide\">\n              <div class=\"execution-item\" *ngFor=\"let item of executionGuideItems()\">\n                <div class=\"execution-item-copy\">\n                  <div class=\"execution-item-head\">\n                    <span class=\"execution-step\" [ngClass]=\"item.tone\">{{ item.eyebrow }}</span>\n                    <span class=\"execution-count\" [ngClass]=\"item.tone\">{{ item.count }} {{ item.countLabel }}</span>\n                  </div>\n                  <div class=\"execution-title\">{{ item.title }}</div>\n                  <div class=\"execution-detail\">{{ item.detail }}</div>\n                  <div class=\"execution-objective\">Outcome: {{ item.objective }}</div>\n                </div>\n              </div>\n              <div class=\"execution-footnote\">\n                Use this card for operating sequence. Diagnostics explain the blockers, and AI Orchestration drives the next recommended actions.\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Expansion Signals -->\n        <ng-container *ngSwitchCase=\"'expansion-signals'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-sparkles\"></i>\n              Expansion Signals\n            </h3>\n            <div class=\"card-actions\">\n              <span class=\"card-badge\">{{ expansionSignalsCount() }}</span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"expansion-signals\" *ngIf=\"!expansionLoading(); else expansionLoadingTpl\">\n              <div class=\"expansion-item\" *ngFor=\"let signal of expansionSignals()\">\n                <div class=\"expansion-info\">\n                  <div class=\"expansion-title\">{{ signal.accountName }}</div>\n                  <div class=\"expansion-meta\">\n                    {{ signal.opportunityName }} \u00B7 {{ signal.signalCount }} signals \u00B7\n                    Last {{ signal.lastSignalAtUtc | date:'MMM d' }}\n                  </div>\n                  <div class=\"expansion-meta\" *ngIf=\"signal.contractEndDateUtc\">\n                    Contract ends {{ signal.contractEndDateUtc | date:'MMM d, yyyy' }}\n                  </div>\n                </div>\n                <div class=\"expansion-actions\">\n                  <button\n                    pButton\n                    type=\"button\"\n                    class=\"crm-button crm-button--primary\"\n                    label=\"Create expansion\"\n                    icon=\"pi pi-plus\"\n                    [disabled]=\"signal.hasExpansionOpportunity || isExpansionSubmitting(signal)\"\n                    (click)=\"createExpansionOpportunity(signal)\"\n                  ></button>\n                  <span class=\"expansion-status\" *ngIf=\"signal.hasExpansionOpportunity\">Expansion created</span>\n                </div>\n              </div>\n              <div class=\"empty-state\" *ngIf=\"!expansionSignals().length\">No expansion signals yet.</div>\n            </div>\n            <ng-template #expansionLoadingTpl>\n              <div class=\"empty-state\">Loading expansion signals...</div>\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <!-- Confidence Forecast -->\n        <ng-container *ngSwitchCase=\"'confidence-forecast'\">\n          <div class=\"card-header\">\n            <div class=\"risk-intelligence-title-block\">\n              <h3 class=\"card-title\">\n                <i class=\"pi pi-chart-line\"></i>\n                Confidence Forecast\n              </h3>\n              <span class=\"risk-intelligence-subtitle\">Pipeline value after confidence weighting &amp; uncertainty exposure.</span>\n            </div>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <ng-container *ngIf=\"hasConfidenceForecastData(); else noConfidenceData\">\n            <!-- Hero zone: weighted value + retention ring -->\n            <div class=\"cf-hero\">\n              <div class=\"cf-hero__main\">\n                <span class=\"cf-hero__label\">Weighted Pipeline</span>\n                <span class=\"cf-hero__value\">\n                  {{ summary().confidenceWeightedPipelineValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                </span>\n                <div class=\"cf-hero__delta\" [class.negative]=\"weightedPipelineDelta() < 0\">\n                  <i class=\"pi\" [class.pi-arrow-down]=\"weightedPipelineDelta() < 0\" [class.pi-arrow-up]=\"weightedPipelineDelta() >= 0\"></i>\n                  {{ weightedPipelineDelta() | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                  <span class=\"cf-hero__delta-hint\">vs raw pipeline</span>\n                </div>\n              </div>\n              <div class=\"cf-hero__ring\">\n                <svg viewBox=\"0 0 80 80\">\n                  <circle class=\"cf-ring-bg\" cx=\"40\" cy=\"40\" r=\"34\" />\n                  <circle class=\"cf-ring-fill\"\n                          [class.excellent]=\"pipelineRetentionPct() >= 80\"\n                          [class.good]=\"pipelineRetentionPct() >= 60 && pipelineRetentionPct() < 80\"\n                          [class.fair]=\"pipelineRetentionPct() >= 40 && pipelineRetentionPct() < 60\"\n                          [class.poor]=\"pipelineRetentionPct() < 40\"\n                          cx=\"40\" cy=\"40\" r=\"34\"\n                          [attr.stroke-dasharray]=\"(pipelineRetentionPct() / 100 * 213.6) + ' 213.6'\" />\n                </svg>\n                <div class=\"cf-ring-label\">\n                  <strong>{{ pipelineRetentionPct() }}%</strong>\n                  <span>retained</span>\n                </div>\n              </div>\n            </div>\n\n            <!-- Raw pipeline reference -->\n            <div class=\"cf-raw\">\n              <span>Raw pipeline</span>\n              <span class=\"cf-raw__value\">{{ totalPipelineValue() | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n            </div>\n\n            <!-- Metric tiles -->\n            <div class=\"cf-metrics\">\n              <div class=\"cf-metric cf-metric--danger\">\n                <div class=\"cf-metric__icon\"><i class=\"pi pi-exclamation-triangle\"></i></div>\n                <div class=\"cf-metric__body\">\n                  <span class=\"cf-metric__value\">{{ summary().costOfNotKnowingValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n                  <span class=\"cf-metric__label\">Cost of Not Knowing</span>\n                </div>\n              </div>\n              <div class=\"cf-metric cf-metric--warning\">\n                <div class=\"cf-metric__icon\"><i class=\"pi pi-flag\"></i></div>\n                <div class=\"cf-metric__body\">\n                  <span class=\"cf-metric__value\">{{ summary().costOfNotKnowingDeals }}</span>\n                  <span class=\"cf-metric__label\">Low-confidence deals</span>\n                </div>\n              </div>\n              <div class=\"cf-metric\" [ngClass]=\"'cf-metric--' + calibrationLevel()\">\n                <div class=\"cf-metric__icon\"><i class=\"pi pi-bullseye\"></i></div>\n                <div class=\"cf-metric__body\">\n                  <span class=\"cf-metric__value\">{{ summary().confidenceCalibrationScore | number:'1.0-0' }}%</span>\n                  <span class=\"cf-metric__label\">Calibration score</span>\n                </div>\n              </div>\n              <div class=\"cf-metric cf-metric--info\" *ngIf=\"summary().confidenceCalibrationSample > 0\">\n                <div class=\"cf-metric__icon\"><i class=\"pi pi-database\"></i></div>\n                <div class=\"cf-metric__body\">\n                  <span class=\"cf-metric__value\">{{ summary().confidenceCalibrationSample }}</span>\n                  <span class=\"cf-metric__label\">Calibration sample</span>\n                </div>\n              </div>\n            </div>\n\n            <!-- Top Cost Drivers -->\n            <div class=\"cost-breakdown\" *ngIf=\"summary().costOfNotKnowingBreakdown.length\">\n              <div class=\"cost-breakdown__header\">\n                <h4>Top Cost Drivers</h4>\n                <button\n                  *ngIf=\"summary().costOfNotKnowingBreakdown.length > 5\"\n                  type=\"button\"\n                  class=\"btn btn-ghost btn-sm\"\n                  (click)=\"openCostBreakdownDialog()\"\n                >\n                  View all\n                </button>\n              </div>\n              <div class=\"cost-deal\" *ngFor=\"let deal of topCostBreakdown()\">\n                <div class=\"cost-deal__header\">\n                  <div>\n                    <div class=\"cost-deal__name\">{{ deal.opportunityName }}</div>\n                    <div class=\"cost-deal__meta\">{{ deal.accountName }} \u2022 {{ deal.stage }}</div>\n                  </div>\n                  <div class=\"cost-deal__value\">\n                    {{ deal.costOfNotKnowingValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                  </div>\n                </div>\n                <div class=\"cost-deal__factors\">\n                  <span class=\"cost-factor\" *ngFor=\"let factor of deal.topFactors\">\n                    {{ factor.label }}: {{ factor.contribution | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                  </span>\n                </div>\n              </div>\n            </div>\n\n            <!-- Exposure Trend -->\n            <div class=\"cost-trend\" *ngIf=\"costTrendChartData\">\n              <div class=\"cost-trend__header\">\n                <h4>Exposure Trend</h4>\n                <span class=\"hint\">Last 8 weeks</span>\n              </div>\n              <div class=\"chart-container small\">\n                <p-chart type=\"line\" [data]=\"costTrendChartData\" [options]=\"costTrendChartOptions\" height=\"140px\"></p-chart>\n              </div>\n            </div>\n            </ng-container>\n            <ng-template #noConfidenceData>\n              <div class=\"empty-state\">\n                <div class=\"empty-icon\"><i class=\"pi pi-chart-line\"></i></div>\n                <h4>No forecast data yet</h4>\n                <p>Confidence forecast will appear once opportunities with confidence scores are in your pipeline.</p>\n              </div>\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <!-- Forecast Scenarios -->\n        <ng-container *ngSwitchCase=\"'forecast-scenarios'\">\n          <div class=\"card-header\">\n            <div class=\"risk-intelligence-title-block\">\n              <h3 class=\"card-title\">\n                <i class=\"pi pi-sliders-h\"></i>\n                Forecast Scenarios\n              </h3>\n              <span class=\"risk-intelligence-subtitle\">Modeled upside, base, and downside views across the open book.</span>\n            </div>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <ng-container *ngIf=\"summary().forecastScenarios.length; else noScenarios\">\n              <div class=\"forecast-scenarios\">\n                <div class=\"scenario-row\" *ngFor=\"let scenario of summary().forecastScenarios\">\n                  <div class=\"scenario-label\">\n                    <span class=\"scenario-name\">{{ scenario.label }}</span>\n                    <span class=\"scenario-count\">{{ scenario.dealCount }} deals</span>\n                  </div>\n                  <div class=\"scenario-value\">\n                    {{ scenario.value | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                  </div>\n                  <div class=\"scenario-delta\" [class.negative]=\"scenario.deltaFromBase < 0\" [class.positive]=\"scenario.deltaFromBase > 0\">\n                    {{ scenario.deltaFromBase | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n            <ng-template #noScenarios>\n              <div class=\"empty-state\">No scenarios available.</div>\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <!-- My Forecast -->\n        <ng-container *ngSwitchCase=\"'my-forecast'\">\n          <div class=\"card-header\">\n            <div class=\"risk-intelligence-title-block\">\n              <h3 class=\"card-title\">\n                <i class=\"pi pi-bolt\"></i>\n                My Forecast\n              </h3>\n              <span class=\"risk-intelligence-subtitle\">Seller-owned weighted view against individual quota, separate from team forecast.</span>\n            </div>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"forecast-value\">\n              {{ summary().myConfidenceWeightedPipelineValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n            </div>\n            <div class=\"forecast-meta\">\n              <span>Weighted pipeline</span>\n              <span class=\"forecast-delta\" [class.negative]=\"summary().myConfidenceWeightedPipelineValue - summary().myPipelineValueTotal < 0\">\n                {{ (summary().myConfidenceWeightedPipelineValue - summary().myPipelineValueTotal) | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n              </span>\n            </div>\n            <div class=\"forecast-footnote\">\n              Raw pipeline: {{ summary().myPipelineValueTotal | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n            </div>\n            <div class=\"forecast-aux\" *ngIf=\"myQuotaTarget() as quota; else noQuota\">\n              <div class=\"forecast-row\">\n                <span>Quota</span>\n                <span>{{ quota | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n              </div>\n              <div class=\"forecast-row\">\n                <span>Progress</span>\n                <span>{{ myQuotaProgress() }}%</span>\n              </div>\n            </div>\n            <ng-template #noQuota>\n              <div class=\"forecast-footnote\">Quota: Not set</div>\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <!-- Recent Accounts -->\n        <ng-container *ngSwitchCase=\"'accounts'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-building\"></i>\n              Recent Accounts\n            </h3>\n            <div class=\"card-actions\">\n              <button pButton type=\"button\" class=\"btn-glass btn-sm\">\n                View All <i class=\"pi pi-arrow-right\"></i>\n              </button>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\" *ngIf=\"recentAccounts().length; else emptyAccounts\">\n            <div class=\"accounts-list\">\n              <div class=\"account-row\" *ngFor=\"let account of recentAccounts(); let i = index\">\n                <div class=\"account-rank\">{{ i + 1 }}</div>\n                <div class=\"account-avatar\"\n                     [class.lead]=\"account.status === 'Lead'\"\n                     [class.prospect]=\"account.status === 'Prospect'\"\n                     [class.customer]=\"account.status === 'Customer'\">\n                  {{ account.name.charAt(0) }}\n                </div>\n                <div class=\"account-info\">\n                  <div class=\"account-name\">{{ account.name }}</div>\n                  <div class=\"account-meta\">\n                    <span>{{ account.company }}</span>\n                    <span class=\"separator\">\u2022</span>\n                    <span>{{ account.owner }}</span>\n                  </div>\n                </div>\n                <div class=\"account-status\">\n                  <span class=\"status-dot\"\n                        [class.lead]=\"account.status === 'Lead'\"\n                        [class.prospect]=\"account.status === 'Prospect'\"\n                        [class.customer]=\"account.status === 'Customer'\"></span>\n                  <span class=\"status-text\">{{ account.status }}</span>\n                </div>\n                <button pButton type=\"button\" class=\"btn-icon-sm\" icon=\"pi pi-ellipsis-h\"></button>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Cards merged into Priority Stream -->\n\n        <!-- Manager Pipeline Health -->\n        <ng-container *ngSwitchCase=\"'manager-health'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-shield\"></i>\n              Pipeline Health\n            </h3>\n            <div class=\"card-actions\">\n              <span class=\"card-badge warn\" *ngIf=\"managerReviewQueue().length\">\n                {{ managerReviewQueue().length }} needs review\n              </span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body manager-health\" *ngIf=\"managerReviewQueue().length; else emptyManagerHealth\">\n            <div class=\"manager-health__stats\">\n              <div class=\"health-pill\" *ngFor=\"let stat of managerHealthStats()\" [ngClass]=\"stat.tone\">\n                <span class=\"health-pill__value\">{{ stat.value }}</span>\n                <span class=\"health-pill__label\">{{ stat.label }}</span>\n              </div>\n            </div>\n            <div class=\"manager-health__truth\" *ngIf=\"managerTruthGaps().length; else noTruthGaps\">\n              <div class=\"truth-heading\">Top Truth Gaps</div>\n              <div class=\"truth-list\">\n                <span class=\"truth-chip\" *ngFor=\"let gap of managerTruthGaps()\">\n                  {{ gap.label }} \u00B7 {{ gap.count }}\n                </span>\n              </div>\n            </div>\n            <ng-template #noTruthGaps>\n              <div class=\"manager-health__truth manager-health__truth--empty\">\n                <div class=\"truth-heading\">Top Truth Gaps</div>\n                <span class=\"truth-empty\">No gaps flagged</span>\n              </div>\n            </ng-template>\n            <div class=\"manager-health__queue\">\n              <div class=\"manager-deal\" *ngFor=\"let deal of managerReviewQueue()\">\n                <div class=\"manager-deal__info\">\n                  <div class=\"manager-deal__name\">{{ deal.name }}</div>\n                  <div class=\"manager-deal__meta\">\n                    <span>{{ deal.accountName }}</span>\n                    <span class=\"separator\">\u2022</span>\n                    <span>{{ deal.stage }}</span>\n                    <span class=\"separator\">\u2022</span>\n                    <span>{{ deal.ownerName }}</span>\n                  </div>\n                  <div class=\"manager-deal__reason\">\n                    <i class=\"pi pi-flag\"></i>\n                    {{ deal.reason }}\n                  </div>\n                </div>\n                <div class=\"manager-deal__side\">\n                  <div class=\"manager-deal__amount\">{{ deal.amount | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</div>\n                  <div class=\"manager-deal__metrics\">\n                    <span>Truth: {{ formatTruthCoverage(deal.truthCoverage) }}</span>\n                    <span>TtT: {{ formatTimeToTruth(deal.timeToTruthDays) }}</span>\n                  </div>\n                  <div class=\"manager-deal__dates\">\n                    <span *ngIf=\"deal.nextStepDueAtUtc\">Next: {{ asLocalDate(deal.nextStepDueAtUtc) | date: 'MMM d' }}</span>\n                    <span *ngIf=\"deal.expectedCloseDate\">Close: {{ asLocalDate(deal.expectedCloseDate) | date: 'MMM d' }}</span>\n                  </div>\n                  <button pButton type=\"button\" class=\"btn-glass btn-sm coach-btn\" (click)=\"openCoaching(deal)\">\n                    Coach\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Activity Breakdown Donut -->\n        <ng-container *ngSwitchCase=\"'activity-mix'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-chart-pie\"></i>\n              Activity Mix\n            </h3>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"donut-container\">\n              <p-chart type=\"doughnut\" [data]=\"activityDonutData\" [options]=\"activityDonutOptions\" height=\"200px\"></p-chart>\n            </div>\n            <div class=\"activity-breakdown-list\">\n              <div class=\"breakdown-item\" *ngFor=\"let activity of activityBreakdown()\">\n                <div class=\"breakdown-icon\" [class]=\"getActivityColor(activity.type)\">\n                  <i class=\"pi\" [class]=\"getActivityIcon(activity.type)\"></i>\n                </div>\n                <span class=\"breakdown-label\">{{ activity.type }}s</span>\n                <span class=\"breakdown-count\">{{ activity.count }}</span>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Conversion Trend -->\n        <ng-container *ngSwitchCase=\"'conversion'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-percentage\"></i>\n              Conversion Trend\n            </h3>\n            <div class=\"card-actions\">\n              <span class=\"trend-badge up\">\n                <i class=\"pi pi-arrow-up\"></i>\n                +12%\n              </span>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"chart-container small\">\n              <p-chart type=\"line\" [data]=\"conversionChartData\" [options]=\"conversionChartOptions\" height=\"160px\"></p-chart>\n            </div>\n            <div class=\"conversion-summary\">\n              <div class=\"summary-stat\">\n                      <span class=\"stat-value success\">{{ summary().winRate }}%</span>\n                <span class=\"stat-label\">Win Rate</span>\n              </div>\n              <div class=\"summary-stat\">\n                    <span class=\"stat-value\">{{ summary().avgSalesCycle }}d</span>\n                <span class=\"stat-label\">Avg Cycle</span>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Top Performers -->\n        <ng-container *ngSwitchCase=\"'top-performers'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-trophy\"></i>\n              Top Performers\n            </h3>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"performers-list\">\n              <div class=\"performer-row\" *ngFor=\"let performer of topPerformers(); let i = index\">\n                <div class=\"performer-rank\" [class.gold]=\"i === 0\" [class.silver]=\"i === 1\" [class.bronze]=\"i === 2\">\n                  {{ i + 1 }}\n                </div>\n                <div class=\"performer-avatar\">\n                  <img\n                    [src]=\"performer.avatar || ('https://i.pravatar.cc/150?u=' + performer.name)\"\n                    [alt]=\"performer.name + ' avatar'\"\n                    [title]=\"performer.name + ' avatar'\"\n                  />\n                </div>\n                <div class=\"performer-info\">\n                  <div class=\"performer-name\">{{ performer.name }}</div>\n                  <div class=\"performer-stats\">\n                    <span>{{ performer.deals }} deals</span>\n                    <span class=\"separator\">\u2022</span>\n                    <span class=\"revenue\">{{ performer.revenue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n                  </div>\n                </div>\n                <div class=\"performer-badge\" *ngIf=\"i === 0\">\n                  <i class=\"pi pi-star-fill\"></i>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Sales Team Performance -->\n        <ng-container *ngSwitchCase=\"'team-performance'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-users\"></i>\n              Sales Team Performance\n            </h3>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\">\n            <div class=\"team-perf\">\n              <!-- Team summary KPIs -->\n              <div class=\"team-perf__kpis\">\n                <div class=\"team-perf__kpi\">\n                  <span class=\"team-perf__kpi-label\">Revenue</span>\n                  <strong class=\"team-perf__kpi-value\">{{ teamPerformance().teamRevenue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</strong>\n                  <span class=\"team-perf__kpi-delta\" [ngClass]=\"teamPerfDelta(teamPerformance().teamRevenue, teamPerformance().teamRevenuePrevious) >= 0 ? 'positive' : 'negative'\">\n                    <i class=\"pi\" [ngClass]=\"teamPerfDelta(teamPerformance().teamRevenue, teamPerformance().teamRevenuePrevious) >= 0 ? 'pi-arrow-up' : 'pi-arrow-down'\"></i>\n                    {{ teamPerfDelta(teamPerformance().teamRevenue, teamPerformance().teamRevenuePrevious) }}%\n                  </span>\n                </div>\n                <div class=\"team-perf__kpi\">\n                  <span class=\"team-perf__kpi-label\">Deals Won</span>\n                  <strong class=\"team-perf__kpi-value\">{{ teamPerformance().dealsClosed }}</strong>\n                  <span class=\"team-perf__kpi-delta\" [ngClass]=\"teamPerfDelta(teamPerformance().dealsClosed, teamPerformance().dealsClosedPrevious) >= 0 ? 'positive' : 'negative'\">\n                    <i class=\"pi\" [ngClass]=\"teamPerfDelta(teamPerformance().dealsClosed, teamPerformance().dealsClosedPrevious) >= 0 ? 'pi-arrow-up' : 'pi-arrow-down'\"></i>\n                    {{ teamPerfDelta(teamPerformance().dealsClosed, teamPerformance().dealsClosedPrevious) }}%\n                  </span>\n                </div>\n                <div class=\"team-perf__kpi\">\n                  <span class=\"team-perf__kpi-label\">Win Rate</span>\n                  <strong class=\"team-perf__kpi-value\">{{ teamPerformance().winRate }}%</strong>\n                  <span class=\"team-perf__kpi-delta\" [ngClass]=\"teamPerfDelta(teamPerformance().winRate, teamPerformance().winRatePrevious) >= 0 ? 'positive' : 'negative'\">\n                    <i class=\"pi\" [ngClass]=\"teamPerfDelta(teamPerformance().winRate, teamPerformance().winRatePrevious) >= 0 ? 'pi-arrow-up' : 'pi-arrow-down'\"></i>\n                    {{ teamPerfDelta(teamPerformance().winRate, teamPerformance().winRatePrevious) }}%\n                  </span>\n                </div>\n                <div class=\"team-perf__kpi\">\n                  <span class=\"team-perf__kpi-label\">Avg Cycle</span>\n                  <strong class=\"team-perf__kpi-value\">{{ teamPerformance().avgCycleDays }}d</strong>\n                  <span class=\"team-perf__kpi-delta\" [ngClass]=\"teamPerfDelta(teamPerformance().avgCycleDays, teamPerformance().avgCycleDaysPrevious) <= 0 ? 'positive' : 'negative'\">\n                    <i class=\"pi\" [ngClass]=\"teamPerfDelta(teamPerformance().avgCycleDays, teamPerformance().avgCycleDaysPrevious) <= 0 ? 'pi-arrow-up' : 'pi-arrow-down'\"></i>\n                    {{ teamPerfDelta(teamPerformance().avgCycleDays, teamPerformance().avgCycleDaysPrevious) }}%\n                  </span>\n                </div>\n              </div>\n\n              <!-- Per-rep breakdown -->\n              <div class=\"team-perf__reps\" *ngIf=\"teamPerformanceReps().length > 0\">\n                <!-- Table header -->\n                <div class=\"team-perf__rep-header\">\n                  <div class=\"team-perf__rep-header-cell rep-col-rank\">#</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-name\">Rep</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-metric\">Deals</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-metric\">Revenue</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-metric\">Win %</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-metric\">Avg Cycle</div>\n                  <div class=\"team-perf__rep-header-cell rep-col-metric\">Activities</div>\n                </div>\n\n                <div class=\"team-perf__rep\" *ngFor=\"let rep of teamPerformanceReps(); let i = index\">\n                  <div class=\"team-perf__rep-rank rep-col-rank\" [class.gold]=\"i === 0\" [class.silver]=\"i === 1\" [class.bronze]=\"i === 2\">\n                    {{ i + 1 }}\n                  </div>\n                  <div class=\"team-perf__rep-identity rep-col-name\">\n                    <div class=\"team-perf__rep-avatar\">\n                      <img\n                        [src]=\"rep.profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (rep.userId || rep.name))\"\n                        [alt]=\"rep.name + ' avatar'\"\n                        [title]=\"rep.name + ' avatar'\"\n                        class=\"team-perf__rep-avatar-img\" />\n                    </div>\n                    <span class=\"team-perf__rep-name\">{{ rep.name }}</span>\n                  </div>\n                  <div class=\"team-perf__rep-metric rep-col-metric\">\n                    <strong>{{ rep.dealsClosed }}</strong>\n                    <span class=\"team-perf__rep-metric-label\">won</span>\n                  </div>\n                  <div class=\"team-perf__rep-metric rep-col-metric\">\n                    <strong class=\"revenue\">{{ rep.revenue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</strong>\n                  </div>\n                  <div class=\"team-perf__rep-metric rep-col-metric\">\n                    <strong [ngClass]=\"rep.winRate >= 50 ? 'good' : rep.winRate >= 25 ? 'okay' : 'low'\">{{ rep.winRate }}%</strong>\n                  </div>\n                  <div class=\"team-perf__rep-metric rep-col-metric\">\n                    <strong>{{ rep.avgCycleDays }}d</strong>\n                  </div>\n                  <div class=\"team-perf__rep-metric rep-col-metric\">\n                    <strong class=\"activity\">{{ rep.activitiesCount }}</strong>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"team-perf__empty\" *ngIf=\"teamPerformanceReps().length === 0\">\n                <i class=\"pi pi-users\"></i>\n                <p>No closed deals this period</p>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- My Tasks -->\n        <ng-container *ngSwitchCase=\"'my-tasks'\">\n          <div class=\"aq-card\">\n            <!-- \u2500\u2500 Floating header ribbon \u2500\u2500 -->\n            <div class=\"aq-header\">\n              <div class=\"aq-header__left\">\n                <div class=\"aq-header__icon-ring\">\n                  <i class=\"pi pi-bolt\"></i>\n                </div>\n                <div class=\"aq-header__text\">\n                  <h3 class=\"aq-header__title\">\n                    <span class=\"aq-header__title-gradient\">Action</span> Queue\n                  </h3>\n                  <span class=\"aq-header__subtitle\">{{ actionQueueSubtitle() }}</span>\n                </div>\n              </div>\n              <div class=\"card-actions\">\n                <span class=\"aq-header__count\" *ngIf=\"priorityStreamItems().length\">\n                  <span class=\"aq-header__count-num\">{{ priorityStreamItems().length }}</span> items\n                </span>\n                <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500 Stat chips row \u2500\u2500 -->\n            <div class=\"aq-chips\">\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--danger\"\n                [class.aq-chip--active]=\"priorityFilter() === 'overdue'\"\n                (click)=\"setPriorityFilter('overdue')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">Overdue</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().overdue }}</span>\n              </button>\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--warning\"\n                [class.aq-chip--active]=\"priorityFilter() === 'today'\"\n                (click)=\"setPriorityFilter('today')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">Due Today</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().today }}</span>\n              </button>\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--purple\"\n                [class.aq-chip--active]=\"priorityFilter() === 'decisions'\"\n                (click)=\"setPriorityFilter('decisions')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">Decisions</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().decisions }}</span>\n              </button>\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--cyan\"\n                [class.aq-chip--active]=\"priorityFilter() === 'new-leads'\"\n                (click)=\"setPriorityFilter('new-leads')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">New Leads</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().newLeads }}</span>\n              </button>\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--orange\"\n                [class.aq-chip--active]=\"priorityFilter() === 'at-risk'\"\n                (click)=\"setPriorityFilter('at-risk')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">At-Risk</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().atRisk }}</span>\n              </button>\n              <button type=\"button\"\n                class=\"aq-chip aq-chip--slate\"\n                [class.aq-chip--active]=\"priorityFilter() === 'no-next-step'\"\n                (click)=\"setPriorityFilter('no-next-step')\">\n                <span class=\"aq-chip__dot\"></span>\n                <span class=\"aq-chip__label\">No Next Step</span>\n                <span class=\"aq-chip__count\">{{ prioritySummary().noNextStep }}</span>\n              </button>\n            </div>\n\n            <!-- \u2500\u2500 Segmented tab bar \u2500\u2500 -->\n            <div class=\"aq-tabs\">\n              <div class=\"aq-tabs__track\">\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'all'\"\n                  (click)=\"setPriorityFilter('all')\">\n                  All\n                  <span class=\"aq-tabs__badge\">{{ priorityStreamItems().length }}</span>\n                </button>\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'overdue'\"\n                  (click)=\"setPriorityFilter('overdue')\">\n                  Overdue\n                  <span class=\"aq-tabs__badge aq-tabs__badge--danger\">{{ prioritySummary().overdue }}</span>\n                </button>\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'today'\"\n                  (click)=\"setPriorityFilter('today')\">\n                  Today\n                  <span class=\"aq-tabs__badge aq-tabs__badge--warning\">{{ prioritySummary().today }}</span>\n                </button>\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'decisions'\"\n                  (click)=\"setPriorityFilter('decisions')\">\n                  Decisions\n                  <span class=\"aq-tabs__badge aq-tabs__badge--purple\">{{ prioritySummary().decisions }}</span>\n                </button>\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'new-leads'\"\n                  (click)=\"setPriorityFilter('new-leads')\">\n                  Leads\n                  <span class=\"aq-tabs__badge aq-tabs__badge--cyan\">{{ prioritySummary().newLeads }}</span>\n                </button>\n                <button type=\"button\"\n                  class=\"aq-tabs__btn\"\n                  [class.aq-tabs__btn--active]=\"priorityFilter() === 'at-risk'\"\n                  (click)=\"setPriorityFilter('at-risk')\">\n                  At-Risk\n                  <span class=\"aq-tabs__badge aq-tabs__badge--orange\">{{ prioritySummary().atRisk }}</span>\n                </button>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500 Item list \u2500\u2500 -->\n            <div class=\"aq-list\" *ngIf=\"filteredPriorityStreamItems().length; else emptyMyTasks\">\n              <div class=\"aq-item\" *ngFor=\"let item of filteredPriorityStreamItems(); let i = index\"\n                [style.animation-delay]=\"(i * 40) + 'ms'\">\n                <!-- Type indicator strip -->\n                <div class=\"aq-item__strip\" [ngClass]=\"{\n                  'aq-item__strip--danger': item.dueClass === 'due-overdue' || item.type === 'deal',\n                  'aq-item__strip--warning': item.dueClass === 'due-today',\n                  'aq-item__strip--purple': item.type === 'decision',\n                  'aq-item__strip--cyan':   item.type === 'lead',\n                  'aq-item__strip--default': item.dueClass !== 'due-overdue' && item.dueClass !== 'due-today' && item.type === 'task'\n                }\"></div>\n\n                <div class=\"aq-item__body\">\n                  <!-- Icon -->\n                  <div class=\"aq-item__icon\" [ngClass]=\"{\n                    'aq-item__icon--danger':  item.dueClass === 'due-overdue' || item.type === 'deal',\n                    'aq-item__icon--warning': item.dueClass === 'due-today' && item.type !== 'deal',\n                    'aq-item__icon--purple':  item.type === 'decision',\n                    'aq-item__icon--cyan':    item.type === 'lead',\n                    'aq-item__icon--primary': item.type === 'task' && item.dueClass !== 'due-overdue' && item.dueClass !== 'due-today'\n                  }\">\n                    <i class=\"pi\" [ngClass]=\"{\n                      'pi-exclamation-triangle': item.type === 'deal' || item.dueClass === 'due-overdue',\n                      'pi-check-square':         item.type === 'task' && item.dueClass !== 'due-overdue',\n                      'pi-user-plus':            item.type === 'lead',\n                      'pi-inbox':                item.type === 'decision'\n                    }\"></i>\n                  </div>\n\n                  <!-- Content -->\n                  <div class=\"aq-item__content\">\n                    <div class=\"aq-item__row-top\">\n                      <span class=\"aq-item__title\">{{ item.title }}</span>\n                      <span class=\"aq-item__due\" [ngClass]=\"item.dueClass\">{{ item.dueColumn }}</span>\n                    </div>\n                    <div class=\"aq-item__subtitle\">{{ item.subtitle }}</div>\n                    <div class=\"aq-item__tags\">\n                      <span class=\"aq-item__tag\" *ngFor=\"let meta of item.meta\">{{ meta }}</span>\n                      <span class=\"aq-item__tag aq-item__tag--status\" [class.aq-item__tag--overdue]=\"item.type === 'deal'\">{{ item.status }}</span>\n                    </div>\n                  </div>\n\n                  <!-- Actions -->\n                  <div class=\"aq-item__actions\">\n                    <ng-container *ngIf=\"item.type !== 'decision'; else aqDecisionAction\">\n                      <button type=\"button\" class=\"aq-item__action-btn aq-item__action-btn--phone\" title=\"Call\">\n                        <i class=\"pi pi-phone\"></i>\n                      </button>\n                      <button type=\"button\" class=\"aq-item__action-btn aq-item__action-btn--email\" title=\"Email\">\n                        <i class=\"pi pi-envelope\"></i>\n                      </button>\n                      <button type=\"button\" class=\"aq-item__action-btn aq-item__action-btn--complete\" (click)=\"onPriorityComplete(item)\">\n                        <i class=\"pi pi-check\"></i>\n                        <span>Done</span>\n                      </button>\n                    </ng-container>\n                    <ng-template #aqDecisionAction>\n                      <button type=\"button\" class=\"aq-item__action-btn aq-item__action-btn--review\" (click)=\"onPriorityComplete(item)\">\n                        <i class=\"pi pi-eye\"></i>\n                        <span>Review</span>\n                      </button>\n                    </ng-template>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Activity Timeline -->\n        <ng-container *ngSwitchCase=\"'timeline'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-clock\"></i>\n              Activity Timeline\n            </h3>\n            <div class=\"card-actions\">\n              <div class=\"timeline-filter\">\n                <button pButton type=\"button\" class=\"filter-btn active\">All</button>\n                <button pButton type=\"button\" class=\"filter-btn\">Calls</button>\n                <button pButton type=\"button\" class=\"filter-btn\">Tasks</button>\n              </div>\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\" *ngIf=\"upcomingActivities().length; else emptyActivities\">\n            <div class=\"timeline\">\n              <div class=\"timeline-item\" *ngFor=\"let activity of upcomingActivities(); let last = last\"\n                   [class.overdue]=\"activity.status === 'Overdue'\">\n                <div class=\"timeline-marker\"\n                     [class.call]=\"activity.type === 'Call'\"\n                     [class.email]=\"activity.type === 'Email'\"\n                     [class.meeting]=\"activity.type === 'Meeting'\"\n                     [class.task]=\"activity.type === 'Task'\">\n                  <i class=\"pi\"\n                     [class.pi-phone]=\"activity.type === 'Call'\"\n                     [class.pi-envelope]=\"activity.type === 'Email'\"\n                     [class.pi-video]=\"activity.type === 'Meeting'\"\n                     [class.pi-check-square]=\"activity.type === 'Task'\"></i>\n                </div>\n                <div class=\"timeline-connector\" *ngIf=\"!last\"></div>\n                <div class=\"timeline-content\">\n                  <div class=\"timeline-header\">\n                    <span class=\"timeline-type\">{{ activity.type }}</span>\n                    <span class=\"timeline-time\" [class.overdue]=\"activity.status === 'Overdue'\">\n                      {{ asLocalDate(activity.dueDateUtc) | date: 'MMM d, h:mm a' }}\n                    </span>\n                  </div>\n                  <div class=\"timeline-subject\">{{ activity.subject }}</div>\n                  <div class=\"timeline-entity\" *ngIf=\"activity.relatedEntityName\">\n                    <i class=\"pi pi-link\"></i>\n                    {{ activity.relatedEntityName }}\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Quick Stats -->\n        <ng-container *ngSwitchCase=\"'health'\">\n          <div class=\"card-header\">\n            <h3 class=\"card-title\">\n              <i class=\"pi pi-heart\"></i>\n              Business Health\n            </h3>\n            <div class=\"card-actions\">\n              <ng-container *ngTemplateOutlet=\"cardControls; context: { $implicit: cardId }\"></ng-container>\n            </div>\n          </div>\n          <div class=\"card-body\" *ngIf=\"hasHealthData(); else emptyHealth\">\n            <div class=\"health-meter\">\n              <svg viewBox=\"0 0 120 120\" class=\"circular-progress\">\n                <circle cx=\"60\" cy=\"60\" r=\"54\" class=\"progress-bg\"></circle>\n                <circle cx=\"60\" cy=\"60\" r=\"54\" class=\"progress-fill\"\n                        [style.stroke-dasharray]=\"getHealthProgress()\"></circle>\n              </svg>\n              <div class=\"health-value\">\n                <span class=\"health-number\">{{ activityStats().completion }}</span>\n                <span class=\"health-unit\">%</span>\n              </div>\n            </div>\n            <div class=\"health-label\">Tasks On Track</div>\n            <div class=\"health-breakdown\">\n              <div class=\"breakdown-row\">\n                <span class=\"breakdown-dot success\"></span>\n                <span class=\"breakdown-text\">Upcoming</span>\n                <span class=\"breakdown-value\">{{ activityStats().upcoming }}</span>\n              </div>\n              <div class=\"breakdown-row\">\n                <span class=\"breakdown-dot danger\"></span>\n                <span class=\"breakdown-text\">Overdue</span>\n                <span class=\"breakdown-value\">{{ activityStats().overdue }}</span>\n              </div>\n            </div>\n            <div class=\"health-metrics\">\n              <div class=\"health-metric\">\n                <i class=\"pi pi-heart-fill\"></i>\n                <div class=\"metric-content\">\n                    <span class=\"metric-value\">{{ summary().customerLifetimeValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</span>\n                  <span class=\"metric-label\">Avg CLV</span>\n                </div>\n              </div>\n              <div class=\"health-metric\">\n                <i class=\"pi pi-sync\"></i>\n                <div class=\"metric-content\">\n                    <span class=\"metric-value\">{{ summary().churnRate }}%</span>\n                  <span class=\"metric-label\">Churn Rate</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </ng-container>\n        <!-- Resize handles for all cards -->\n        <div class=\"resize-handle handle-s\" (mousedown)=\"startResize($event, dashboardCard, 's')\"></div>\n        <div class=\"resize-handle handle-e\" (mousedown)=\"startResize($event, dashboardCard, 'e')\"></div>\n        <div class=\"resize-handle handle-se\" (mousedown)=\"startResize($event, dashboardCard, 'se')\"></div>\n      </article>\n    </section>\n\n    <!-- Charts Row -->\n    <section\n      class=\"charts-row\"\n      cdkDropList\n      [cdkDropListData]=\"chartOrder\"\n      (cdkDropListDropped)=\"onChartDrop($event)\"\n      cdkDropListOrientation=\"horizontal\"\n    >\n      <ng-container *ngFor=\"let chartId of chartOrder\">\n        <article\n          *ngIf=\"isChartVisible(chartId)\"\n          class=\"glass-card chart-card chart-card--resizable card-resizable\"\n          cdkDrag\n          #chartCard\n          [attr.data-card-id]=\"chartId\"\n          [ngClass]=\"[getChartSizeClass(chartId), chartId === 'revenue' ? 'large' : '']\"\n          [ngStyle]=\"getCardDimensions(chartId)\"\n          [attr.data-min-width]=\"chartId === 'revenue' ? 320 : 280\"\n          [attr.data-min-height]=\"chartId === 'revenue' ? 320 : 280\"\n        >\n          <ng-container [ngSwitch]=\"chartId\">\n            <ng-container *ngSwitchCase=\"'revenue'\">\n              <div class=\"card-header\">\n                <h3 class=\"card-title\">\n                  <i class=\"pi pi-chart-line\"></i>\n                  Revenue Trend\n                </h3>\n                <div class=\"card-actions\">\n                  <div class=\"chart-legend\">\n                    <span class=\"legend-item primary\">\n                      <span class=\"legend-dot\"></span>\n                      Revenue\n                    </span>\n                  </div>\n                  <ng-container *ngTemplateOutlet=\"chartControls; context: { $implicit: chartId }\"></ng-container>\n                </div>\n              </div>\n              <div class=\"card-body\">\n                <div class=\"chart-container\">\n                  <p-chart type=\"line\" [data]=\"revenueChartData\" [options]=\"revenueChartOptions\" height=\"100%\"></p-chart>\n                </div>\n              </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'growth'\">\n              <div class=\"card-header\">\n                <h3 class=\"card-title\">\n                  <i class=\"pi pi-users\"></i>\n                  Customer Growth\n                </h3>\n                <div class=\"card-actions\">\n                  <ng-container *ngTemplateOutlet=\"chartControls; context: { $implicit: chartId }\"></ng-container>\n                </div>\n              </div>\n              <div class=\"card-body\">\n                <div class=\"chart-container\">\n                  <p-chart type=\"bar\" [data]=\"customerGrowthData\" [options]=\"customerGrowthOptions\" height=\"100%\"></p-chart>\n                </div>\n              </div>\n            </ng-container>\n          </ng-container>\n          <!-- Resize handles for chart cards -->\n          <div class=\"resize-handle handle-s\" (mousedown)=\"startResize($event, chartCard, 's')\"></div>\n          <div class=\"resize-handle handle-e\" (mousedown)=\"startResize($event, chartCard, 'e')\"></div>\n          <div class=\"resize-handle handle-se\" (mousedown)=\"startResize($event, chartCard, 'se')\"></div>\n        </article>\n      </ng-container>\n    </section>\n  </div>\n</div>\n\n      </div>\n    </div>\n\n<ng-template #emptyHealth>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-heart\"></i>\n    </div>\n    <h4>No health data yet</h4>\n    <p>Activity stats, CLV, and churn metrics will appear here</p>\n  </div>\n</ng-template>\n\n<ng-template #emptyMyTasks>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-check-square\"></i>\n    </div>\n    <h4>No priority items</h4>\n    <p>Tasks, new leads, and at\u2011risk deals will appear here</p>\n  </div>\n</ng-template>\n\n<ng-template #emptyAccounts>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-building\"></i>\n    </div>\n    <h4>No recent accounts</h4>\n    <p>New accounts will appear here</p>\n  </div>\n</ng-template>\n\n\n<ng-template #emptyManagerHealth>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-briefcase\"></i>\n    </div>\n    <h4>Pipeline looks clean</h4>\n    <p>No deals require manager review right now</p>\n  </div>\n</ng-template>\n\n<ng-template #emptyActivities>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-calendar\"></i>\n    </div>\n    <h4>All clear!</h4>\n    <p>No upcoming activities scheduled</p>\n  </div>\n</ng-template>\n\n<ng-template #emptyRiskFlags>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-shield\"></i>\n    </div>\n    <h4>No risk flags</h4>\n    <p>Pipeline risk signals will appear here</p>\n  </div>\n</ng-template>\n\n<ng-template #emptyExecutionGuide>\n  <div class=\"empty-state\">\n    <div class=\"empty-icon\">\n      <i class=\"pi pi-compass\"></i>\n    </div>\n    <h4>No execution prompts</h4>\n    <p>Execution guidance will appear here</p>\n  </div>\n</ng-template>\n\n<ng-template #cardControls let-cardId>\n  <div class=\"card-controls\">\n    <button\n      pButton\n      type=\"button\"\n      class=\"btn-icon-sm card-control\"\n      icon=\"pi pi-times\"\n      (click)=\"hideCard(cardId)\"\n      aria-label=\"Hide card\"\n    ></button>\n    <button\n      pButton\n      type=\"button\"\n      class=\"btn-icon-sm card-control drag-handle\"\n      icon=\"pi pi-bars\"\n      cdkDragHandle\n      aria-label=\"Reorder card\"\n    ></button>\n  </div>\n</ng-template>\n\n<ng-template #chartControls let-chartId>\n  <div class=\"card-controls\">\n    <button\n      pButton\n      type=\"button\"\n      class=\"btn-icon-sm card-control\"\n      icon=\"pi pi-times\"\n      (click)=\"hideChart(chartId)\"\n      aria-label=\"Hide chart\"\n    ></button>\n    <button\n      pButton\n      type=\"button\"\n      class=\"btn-icon-sm card-control drag-handle\"\n      icon=\"pi pi-bars\"\n      cdkDragHandle\n      aria-label=\"Reorder chart\"\n    ></button>\n  </div>\n</ng-template>\n\n<p-dialog\n  header=\"Cost of Not Knowing - Deal Breakdown\"\n  [(visible)]=\"costBreakdownDialogOpen\"\n  [modal]=\"true\"\n  [dismissableMask]=\"true\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  appendTo=\"body\"\n  [style]=\"{ width: 'min(720px, 95vw)' }\"\n  [contentStyle]=\"{ maxHeight: '70vh', overflow: 'auto' }\"\n>\n  <div class=\"cost-breakdown-dialog\">\n    <div class=\"dialog-controls\">\n      <label for=\"cost-sort\">Sort by</label>\n      <select id=\"cost-sort\" class=\"dialog-select\" [(ngModel)]=\"costBreakdownSortKey\">\n        <option value=\"exposure\">Exposure</option>\n        <option value=\"amount\">Deal amount</option>\n        <option value=\"stage\">Stage</option>\n        <option value=\"name\">Opportunity</option>\n      </select>\n      <button type=\"button\" class=\"btn btn-ghost btn-sm\" (click)=\"toggleCostBreakdownSortDirection()\">\n        {{ costBreakdownSortDirection === 'asc' ? 'Ascending' : 'Descending' }}\n      </button>\n    </div>\n\n    <div class=\"cost-breakdown-list\" *ngIf=\"summary().costOfNotKnowingBreakdown.length; else noCostBreakdown\">\n      <div class=\"cost-breakdown-row\" *ngFor=\"let deal of costBreakdownSorted()\">\n        <div class=\"cost-breakdown-main\">\n          <div class=\"cost-breakdown-name\">{{ deal.opportunityName }}</div>\n          <div class=\"cost-breakdown-meta\">{{ deal.accountName }} \u2022 {{ deal.stage }}</div>\n          <div class=\"cost-breakdown-factors\">\n            <span class=\"cost-factor\" *ngFor=\"let factor of deal.topFactors\">\n              {{ factor.label }}: {{ factor.contribution | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n            </span>\n          </div>\n        </div>\n        <div class=\"cost-breakdown-values\">\n          <div class=\"cost-breakdown-amount\">\n            {{ deal.amount | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n          </div>\n          <div class=\"cost-breakdown-exposure\">\n            {{ deal.costOfNotKnowingValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <ng-template #noCostBreakdown>\n      <div class=\"empty-state\">\n        <div class=\"empty-icon\">\n          <i class=\"pi pi-shield\"></i>\n        </div>\n        <h4>No exposure breakdown</h4>\n        <p>Cost of Not Knowing details will appear once there are active opportunities.</p>\n      </div>\n    </ng-template>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <div class=\"layout-actions\">\n      <button pButton type=\"button\" class=\"btn-glass\" (click)=\"closeCostBreakdownDialog()\">Close</button>\n    </div>\n  </ng-template>\n</p-dialog>\n\n\n<p-dialog\n  header=\"Customize Command Center\"\n  [(visible)]=\"layoutDialogOpen\"\n  [modal]=\"true\"\n  [dismissableMask]=\"true\"\n  [draggable]=\"true\"\n  [resizable]=\"true\"\n  [maximizable]=\"true\"\n  appendTo=\"body\"\n  [style]=\"{ width: 'min(960px, 92vw)' }\"\n  [contentStyle]=\"{ maxHeight: '70vh', overflow: 'auto' }\"\n  [styleClass]=\"'layout-dialog'\"\n  >\n  <p>Drag cards to reorder your Command Center view.</p>\n  <div\n    class=\"layout-order-list\"\n    cdkDropList\n    [cdkDropListData]=\"layoutDraft\"\n    cdkDropListOrientation=\"vertical\"\n    (cdkDropListDropped)=\"onLayoutDraftDrop($event)\"\n  >\n    <div class=\"layout-item-row\" *ngFor=\"let card of layoutDraft; let index = index\" cdkDrag>\n      <div class=\"layout-item\">\n        <button type=\"button\" class=\"layout-item__drag\" cdkDragHandle aria-label=\"Reorder row\">\n          <i class=\"pi pi-bars\"></i>\n        </button>\n        <span class=\"layout-item__index\">{{ index + 1 }}</span>\n        <i class=\"pi\" [class]=\"card.icon\"></i>\n        <span>{{ card.label }}</span>\n      </div>\n    </div>\n  </div>\n  <div class=\"layout-chart-section\">\n    <h4>Command Center cards ({{ activePackName() }})</h4>\n    <div class=\"layout-chart-list\">\n      <label class=\"layout-chart-item\" *ngFor=\"let card of selectableCards()\">\n        <input\n          type=\"checkbox\"\n          [ngModel]=\"isCardVisible(card.id)\"\n          (ngModelChange)=\"onCardVisibilityChange(card.id, $event)\"\n        />\n        <i class=\"pi\" [class]=\"card.icon\"></i>\n        <span>{{ card.label }}</span>\n      </label>\n    </div>\n  </div>\n  <div class=\"layout-chart-section\" *ngIf=\"selectableCharts().length > 0\">\n    <h4>Chart cards</h4>\n    <div class=\"layout-chart-list\">\n      <label class=\"layout-chart-item\" *ngFor=\"let chart of selectableCharts()\">\n        <input\n          type=\"checkbox\"\n          [ngModel]=\"isChartVisible(chart.id)\"\n          (ngModelChange)=\"onChartVisibilityChange(chart.id, $event)\"\n        />\n        <i class=\"pi\" [class]=\"chart.icon\"></i>\n        <span>{{ chart.label }}</span>\n      </label>\n    </div>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <div class=\"layout-actions\">\n      <button pButton type=\"button\" class=\"btn-glass\" (click)=\"resetLayout()\">Reset to role default</button>\n      <button pButton type=\"button\" class=\"btn-gradient\" (click)=\"saveLayout()\">Save layout</button>\n    </div>\n  </ng-template>\n</p-dialog>\n\n<p-dialog\n  header=\"Coach Deal\"\n  [(visible)]=\"coachingDialogOpen\"\n  [modal]=\"true\"\n  [dismissableMask]=\"true\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  appendTo=\"body\"\n  [style]=\"{ width: 'min(560px, 92vw)' }\"\n  [contentStyle]=\"{ overflow: 'visible' }\"\n>\n  <div class=\"coaching-dialog\">\n    <label class=\"coaching-label\" for=\"coach-comment\">Manager comment</label>\n    <textarea\n      id=\"coach-comment\"\n      class=\"coaching-textarea\"\n      [(ngModel)]=\"coachingComment\"\n      rows=\"4\"\n      placeholder=\"Give clear direction and the next action you expect.\"\n    ></textarea>\n\n    <div class=\"coaching-row\">\n      <div class=\"coaching-field\">\n        <label class=\"coaching-label\" for=\"coach-due\">Due date</label>\n        <input id=\"coach-due\" type=\"datetime-local\" class=\"coaching-input\" [(ngModel)]=\"coachingDueLocal\" />\n      </div>\n      <div class=\"coaching-field coaching-field--sm\">\n        <label class=\"coaching-label\" for=\"coach-priority\">Priority</label>\n        <select id=\"coach-priority\" class=\"coaching-input\" [(ngModel)]=\"coachingPriority\">\n          <option value=\"High\">High</option>\n          <option value=\"Medium\">Medium</option>\n          <option value=\"Low\">Low</option>\n        </select>\n      </div>\n    </div>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <div class=\"coaching-actions\">\n      <button pButton type=\"button\" class=\"btn-glass\" (click)=\"closeCoaching()\" [disabled]=\"coachingSubmitting\">Cancel</button>\n      <button pButton type=\"button\" class=\"btn-gradient\" (click)=\"submitCoaching()\" [disabled]=\"coachingSubmitting || !coachingComment.trim()\">\n        {{ coachingSubmitting ? 'Sending...' : 'Create task' }}\n      </button>\n    </div>\n  </ng-template>\n</p-dialog>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DASHBOARD PAGE - Enterprise Glassmorphic Design System\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes fade-in-down {\n  from { opacity: 0; transform: translateY(-20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BACKGROUND & PAGE LAYOUT\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-background {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdff 100%);\n}\n\n.grid-pattern {\n  position: absolute;\n  inset: 0;\n  background-image: \n    linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px);\n  background-size: 50px 50px;\n}\n\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: orb-float 25s ease-in-out infinite;\n  \n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -8s;\n  }\n  \n  &.orb-3 {\n    width: 350px;\n    height: 350px;\n    background: $purple-gradient;\n    bottom: -50px;\n    left: 40%;\n    animation-delay: -16s;\n  }\n  \n  &.orb-4 {\n    width: 300px;\n    height: 300px;\n    background: $orange-gradient;\n    top: 20%;\n    left: 50%;\n    animation-delay: -12s;\n    opacity: 0.25;\n  }\n}\n\n.page-container {\n  position: relative;\n  z-index: 1;\n  min-height: auto;\n  height: auto;\n  padding: $space-5 $space-6;\n\n  @include respond-to('mobile') {\n    padding: $space-3 $space-3;\n  }\n\n  @include respond-to('mobileLg') {\n    padding: $space-3 $space-4;\n  }\n\n  @include respond-to('tablet') {\n    padding: $space-4 $space-5;\n  }\n}\n\n.page-content {\n  width: 100%;\n  max-width: none;\n  min-width: 0;\n  margin: 0 auto;\n  animation: fade-in-up 0.6s ease-out;\n}\n\n.dashboard-layout {\n  position: relative;\n}\n\n.dashboard-main {\n  display: flex;\n  flex-direction: column;\n  gap: $space-6;\n\n  @include respond-to('mobile') {\n    gap: $space-4;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-6;\n  margin-bottom: $space-6;\n  padding: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-2xl;\n  border: 1px solid $glass-border;\n  animation: fade-in-down 0.5s ease-out;\n\n  @include respond-to('tablet') {\n    flex-direction: column;\n    gap: $space-4;\n    padding: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n    gap: $space-3;\n    padding: $space-3;\n    margin-bottom: $space-4;\n  }\n}\n\n.hero-content {\n  flex: 1;\n}\n\n.hero-greeting {\n  display: block;\n  font-size: $font-size-sm;\n  color: $primary;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  margin-bottom: $space-2;\n}\n\n.hero-greeting-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-2;\n}\n\n// Realtime update indicator\n.realtime-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  background: rgba($success, 0.1);\n  border: 1px solid rgba($success, 0.2);\n  border-radius: $radius-full;\n  font-size: 0.7rem;\n  color: $success;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  transition: all 200ms ease;\n  \n  .realtime-dot {\n    width: 6px;\n    height: 6px;\n    background: $success;\n    border-radius: 50%;\n    animation: realtime-pulse 2s ease-in-out infinite;\n  }\n  \n  .realtime-label {\n    line-height: 1;\n  }\n  \n  &.updating {\n    background: rgba($cyan, 0.15);\n    border-color: rgba($cyan, 0.3);\n    color: color.adjust($cyan, $lightness: -10%);\n    transform: scale(1.05);\n    box-shadow: 0 0 12px rgba($cyan, 0.3);\n    \n    .realtime-dot {\n      background: $cyan;\n      animation: realtime-pulse-fast 0.5s ease-in-out infinite;\n    }\n  }\n}\n\n@keyframes realtime-pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.5; transform: scale(0.8); }\n}\n\n@keyframes realtime-pulse-fast {\n  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba($cyan, 0.4); }\n  50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 0 4px rgba($cyan, 0); }\n}\n\n// Page title uses global .page-title from _components.scss\n\n.hero-stats {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-stat-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: rgba($primary, 0.08);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  \n  i {\n    color: $primary;\n  }\n  \n  strong {\n    color: $text-primary;\n  }\n  \n  &.success {\n    background: rgba($success, 0.1);\n    i { color: $success; }\n  }\n  \n  &.danger {\n    background: rgba($danger, 0.1);\n    i { color: $danger; }\n  }\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BUTTONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn-gradient {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $primary-gradient;\n  color: white;\n  border: none;\n  border-radius: $radius-xl;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  cursor: pointer;\n  transition: all $transition-base;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba($primary, 0.4);\n  }\n  \n  &.btn-lg {\n    padding: $space-3 $space-6;\n    font-size: $font-size-base;\n  }\n}\n\n.btn-glass {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  background: rgba(white, 0.7);\n  color: $text-secondary;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  font-weight: 500;\n  font-size: $font-size-sm;\n  cursor: pointer;\n  transition: all $transition-base;\n  \n  &:hover {\n    background: white;\n    border-color: rgba($primary, 0.3);\n    color: $primary;\n  }\n  \n  &.btn-sm {\n    padding: $space-2 $space-3;\n    font-size: $font-size-xs;\n    border-radius: $radius-lg;\n  }\n}\n\n.btn-icon {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-lg;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.btn-icon-sm {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.08);\n    color: $primary;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA RETRY BANNER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-retry-banner {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  margin-bottom: $space-4;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: $radius-lg;\n  animation: fade-in-up 0.3s ease-out;\n\n  > i {\n    font-size: 1.125rem;\n    color: #ef4444;\n    flex-shrink: 0;\n  }\n\n  > span {\n    flex: 1;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: #991b1b;\n  }\n\n  .retry-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-3;\n    background: $primary-gradient;\n    color: white;\n    border: none;\n    border-radius: $radius-md;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    cursor: pointer;\n    transition: transform 200ms, box-shadow 200ms;\n    white-space: nowrap;\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    i {\n      font-size: $font-size-sm;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRICS DASHBOARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-dashboard {\n  margin-bottom: $space-6;\n}\n\n.ai-orchestration-section {\n  position: relative;\n  margin-top: 0;\n  padding: 18px 18px 14px;\n  border: 1px solid rgba(188, 198, 226, 0.58);\n  background: linear-gradient(140deg, rgba(245, 248, 255, 0.95), rgba(236, 241, 252, 0.93));\n  backdrop-filter: blur(20px) saturate(130%);\n  box-shadow: 0 14px 30px rgba(56, 75, 121, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);\n  overflow: hidden;\n\n  @include respond-to('mobile') {\n    padding: 12px 12px 10px;\n  }\n}\n\n.ai-orchestration-section::before,\n.ai-orchestration-section::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  border-radius: 50%;\n  filter: blur(24px);\n  opacity: 0.48;\n}\n\n.ai-orchestration-section::before {\n  width: 210px;\n  height: 210px;\n  top: -80px;\n  right: -58px;\n  background: radial-gradient(circle, rgba(113, 144, 235, 0.45), rgba(113, 144, 235, 0));\n}\n\n.ai-orchestration-section::after {\n  width: 240px;\n  height: 240px;\n  bottom: -110px;\n  left: -76px;\n  background: radial-gradient(circle, rgba(109, 174, 255, 0.28), rgba(109, 174, 255, 0));\n}\n\n.ai-orchestration-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.ai-orchestration-title-group {\n  display: grid;\n  gap: 5px;\n}\n\n.ai-orchestration-subtitle {\n  margin: 0;\n  font-size: 0.88rem;\n  color: rgba(60, 76, 114, 0.9);\n}\n\n.ai-orchestration-header-meta {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.ai-generated-at {\n  font-size: 0.82rem;\n  color: rgba(58, 74, 109, 0.88);\n}\n\n.ai-kpi-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n  margin-bottom: 12px;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.ai-kpi-card {\n  padding: 10px 12px;\n  border-radius: 0 12px 12px 0;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  min-height: 72px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.35);\n    border-left-color: #2563eb;\n    background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);\n    transform: translateY(-1px);\n  }\n\n  @include respond-to('mobile') {\n    padding: 8px 10px;\n    min-height: auto;\n  }\n}\n\n.ai-kpi-value {\n  margin-top: 4px;\n  font-size: 1.7rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.ai-kpi-value.success {\n  color: #4bb49d;\n}\n\n.ai-kpi-value.warning {\n  color: #ef9630;\n}\n\n.ai-kpi-value.danger {\n  color: #e64a63;\n}\n\n.ai-kpi-label {\n  font-size: 0.86rem;\n  color: rgba(54, 68, 101, 0.95);\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-weight: 700;\n}\n\n.ai-action-shell {\n  position: relative;\n  z-index: 1;\n  display: block;\n  gap: 8px;\n  border: 1px solid rgba(188, 199, 228, 0.7);\n  border-radius: 14px;\n  background: linear-gradient(150deg, rgba(236, 241, 255, 0.8), rgba(247, 249, 255, 0.76));\n  padding: 6px;\n}\n\n.ai-action-table-head {\n  display: grid;\n  grid-template-columns: 196px minmax(0, 1fr) 156px 168px;\n  align-items: center;\n  gap: 8px;\n  border-radius: 10px;\n  padding: 8px 10px;\n  background: linear-gradient(145deg, rgba(236, 242, 255, 0.82), rgba(224, 232, 249, 0.8));\n  color: rgba(45, 60, 96, 0.96);\n  font-size: 0.9rem;\n  font-weight: 700;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr minmax(0, 1fr) 120px;\n    gap: 6px;\n    font-size: 0.85rem;\n  }\n\n  @include respond-to('mobile') {\n    @include hide-mobile;\n  }\n}\n\n.ai-action-toolbar {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 8px 4px;\n}\n\n.ai-action-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 420px;\n  overflow-y: auto;\n  padding-right: 2px;\n}\n\n.ai-action-row {\n  position: relative;\n  display: grid;\n  flex-shrink: 0;\n  min-height: 136px;\n  grid-template-columns: 196px minmax(0, 1fr) 156px 168px;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid rgba(178, 190, 223, 0.62);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 255, 0.86));\n  box-shadow: 0 4px 10px rgba(41, 61, 104, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n  overflow: hidden;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr minmax(0, 1fr) 100px;\n    min-height: auto;\n    gap: 6px;\n    padding: 8px 10px;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    min-height: auto;\n    gap: 8px;\n    padding: 12px;\n  }\n}\n\n.ai-action-row::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 6px;\n  border-radius: 10px 0 0 10px;\n  background: linear-gradient(180deg, #ff4b67, #de2346);\n}\n\n.ai-action-row.risk-medium::before {\n  background: linear-gradient(180deg, #f9ad3f, #e78e20);\n}\n\n.ai-action-row.risk-low::before {\n  background: linear-gradient(180deg, #61cea2, #31aa84);\n}\n\n.ai-score-col {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.ai-row-index {\n  width: 24px;\n  min-width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  border: 1px solid rgba(147, 166, 206, 0.75);\n  background: linear-gradient(145deg, #e7eefb, #d8e2f7);\n  color: #4f6492;\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 0.78rem;\n}\n\n.ai-score-card {\n  width: 160px;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid rgba(120, 194, 155, 0.7);\n  background: linear-gradient(180deg, #66cfa6, #35ab84);\n  color: #fff;\n}\n\n.ai-score-card.risk-high {\n  background: linear-gradient(180deg, #ff4a66, #e02547);\n}\n\n.ai-score-card.risk-medium {\n  background: linear-gradient(180deg, #f8ab39, #e38719);\n}\n\n.ai-score-card.risk-low {\n  background: linear-gradient(180deg, #5fcea2, #32ac84);\n}\n\n.ai-score-main {\n  padding: 8px 10px 0;\n  font-size: 2.6rem;\n  line-height: 1;\n  font-weight: 800;\n}\n\n.ai-score-impact {\n  padding: 3px 10px 8px;\n  font-size: 1rem;\n  line-height: 1.15;\n  text-transform: uppercase;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n  color: #ffffff;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);\n  background: transparent;\n  border-top: 0;\n}\n\n.ai-score-urgency {\n  background: rgba(241, 244, 238, 0.98);\n  color: #8a5b18;\n  padding: 7px 10px;\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n}\n\n.ai-task-col h3 {\n  margin: 0 0 2px;\n  font-size: 1.05rem;\n  color: #132447;\n}\n\n.ai-task-col p {\n  margin: 0 0 6px;\n  font-size: 0.92rem;\n  color: #2a3d65;\n  line-height: 1.35;\n}\n\n.ai-impact-inline {\n  display: inline-flex;\n  align-items: center;\n  margin: 0 0 6px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(166, 181, 215, 0.65);\n  background: rgba(235, 241, 253, 0.9);\n  color: #344c7d;\n  font-size: 0.76rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.ai-impact-inline.risk-high {\n  border-color: rgba(177, 52, 73, 0.46);\n  background: rgba(255, 230, 235, 0.96);\n  color: #a52640;\n}\n\n.ai-impact-inline.risk-medium {\n  border-color: rgba(186, 140, 60, 0.45);\n  background: rgba(255, 243, 216, 0.96);\n  color: #915e1d;\n}\n\n.ai-impact-inline.risk-low {\n  border-color: rgba(54, 154, 116, 0.46);\n  background: rgba(224, 246, 236, 0.96);\n  color: #1e7b57;\n}\n\n.ai-task-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  font-size: 0.84rem;\n  color: #415680;\n}\n\n.meta-chip {\n  border-radius: 999px;\n  border: 1px solid rgba(194, 206, 232, 0.85);\n  background: rgba(227, 234, 248, 0.8);\n  padding: 3px 8px;\n}\n\n.ai-impact-pill {\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n\n.ai-impact-pill.risk-high {\n  background: linear-gradient(180deg, #ff6e86, #e13a5a);\n  color: #fff;\n  border-color: rgba(175, 40, 64, 0.55);\n}\n\n.ai-impact-pill.risk-medium {\n  background: linear-gradient(180deg, #f3cb73, #e6b44f);\n  color: #3e2a10;\n  border-color: rgba(167, 122, 49, 0.5);\n}\n\n.ai-impact-pill.risk-low {\n  background: linear-gradient(180deg, #63cca2, #37ae86);\n  color: #fff;\n  border-color: rgba(44, 144, 105, 0.55);\n}\n\n.ai-urgency-pill {\n  text-transform: uppercase;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  color: #8a5b18;\n  background: linear-gradient(180deg, #f4efe1, #ece3cf);\n  border-color: rgba(178, 152, 95, 0.45);\n}\n\n.ai-risk-col,\n.ai-cta-col {\n  display: flex;\n  justify-content: center;\n}\n\n.ai-cta-col {\n  flex-direction: column;\n  gap: 6px;\n}\n\n.ai-risk-chip {\n  min-width: 108px;\n  border-radius: 10px;\n  padding: 4px 8px;\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-size: 0.78rem;\n  line-height: 1.1;\n  font-weight: 800;\n  color: #fff;\n}\n\n.ai-risk-chip.risk-high {\n  background: linear-gradient(180deg, #ff4966, #e12748);\n}\n\n.ai-risk-chip.risk-medium {\n  background: linear-gradient(180deg, #f8ad3c, #e98f20);\n}\n\n.ai-risk-chip.risk-low {\n  background: linear-gradient(180deg, #58c99f, #2fa77f);\n}\n\n.ai-cta-btn {\n  min-width: 148px;\n  border-radius: 10px;\n  border: 1px solid rgba(176, 152, 103, 0.45);\n  background: linear-gradient(180deg, #ffefc7, #f7dfa9);\n  box-shadow: 0 8px 16px rgba(177, 150, 88, 0.25);\n  color: #1a2748;\n  text-transform: uppercase;\n  font-size: 0.9rem;\n  font-weight: 800;\n  letter-spacing: 0.03em;\n  padding: 8px 12px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n\n.ai-cta-btn.execute.risk-low {\n  border-color: rgba(49, 147, 109, 0.58);\n  background: linear-gradient(180deg, #35b586, #229b6f);\n  color: #ffffff;\n  box-shadow: 0 8px 16px rgba(35, 141, 101, 0.28);\n}\n\n.ai-cta-btn.review.risk-medium {\n  border-color: rgba(190, 140, 64, 0.55);\n  background: linear-gradient(180deg, #f0d99b, #e4c574);\n  color: #3b2b12;\n}\n\n.ai-cta-btn.review.risk-high {\n  border-color: rgba(179, 51, 72, 0.52);\n  background: linear-gradient(180deg, #ff6f86, #e63d5f);\n  color: #ffffff;\n}\n\n.ai-expand-btn {\n  width: 100%;\n  justify-content: center;\n  border: 1px solid rgba(198, 207, 228, 0.8);\n  background: linear-gradient(180deg, #f4f6fb, #e9edf6);\n  color: #2e3d63;\n  box-shadow: none;\n}\n\n.ai-action-detail {\n  grid-column: 1 / -1;\n  margin-top: 4px;\n  padding: 10px;\n  border-radius: 9px;\n  border: 1px solid rgba(178, 190, 223, 0.52);\n  background: linear-gradient(145deg, rgba(239, 244, 255, 0.72), rgba(229, 237, 252, 0.62));\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n    gap: 6px;\n    padding: 8px;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: 6px;\n    padding: 8px;\n  }\n}\n\n.ai-detail-item {\n  display: grid;\n  gap: 2px;\n}\n\n.ai-detail-label {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  color: rgba(66, 84, 126, 0.82);\n  font-weight: 700;\n}\n\n.ai-detail-value {\n  font-size: 0.85rem;\n  color: #20365f;\n  font-weight: 600;\n  overflow-wrap: anywhere;\n}\n\n.ai-detail-list {\n  margin: 0;\n  padding-left: 16px;\n  display: grid;\n  gap: 3px;\n  color: #20365f;\n  font-size: 0.83rem;\n  font-weight: 500;\n}\n\n.assistant-detail-content {\n  display: grid;\n  gap: 14px;\n}\n\n.assistant-detail-hero {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.assistant-detail-hero p {\n  margin: 6px 0 0;\n  color: #2a3d65;\n}\n\n.assistant-detail-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n}\n\n.assistant-detail-cell {\n  padding: 10px;\n  border-radius: 10px;\n  border: 1px solid rgba(188, 199, 228, 0.72);\n  background: rgba(246, 249, 255, 0.9);\n  display: grid;\n  gap: 3px;\n}\n\n.assistant-detail-cell-wide {\n  grid-column: 1 / -1;\n}\n\n.assistant-detail-label {\n  font-size: 0.74rem;\n  text-transform: uppercase;\n  color: rgba(66, 84, 126, 0.82);\n  letter-spacing: 0.02em;\n  font-weight: 700;\n}\n\n.assistant-detail-value {\n  font-size: 0.95rem;\n  color: #20365f;\n  font-weight: 700;\n  overflow-wrap: anywhere;\n}\n\n.assistant-detail-list {\n  margin: 0;\n  padding-left: 18px;\n  display: grid;\n  gap: 4px;\n  color: #20365f;\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n\n.ai-cta-btn.execute.risk-high {\n  border-color: rgba(193, 46, 71, 0.62);\n  background: linear-gradient(180deg, #ff4a66, #e12748);\n  box-shadow: 0 10px 18px rgba(191, 39, 68, 0.34);\n  color: #fff;\n}\n\n.ai-cta-btn.execute.risk-low {\n  border-color: rgba(42, 146, 109, 0.62);\n  background: linear-gradient(180deg, #3cb98d, #1f9a70);\n  box-shadow: 0 10px 18px rgba(35, 137, 102, 0.3);\n  color: #fff;\n}\n\n.empty-state-inline {\n  padding: 14px;\n  border-radius: 12px;\n  background: rgba(246, 249, 255, 0.76);\n  border: 1px dashed rgba(137, 154, 192, 0.48);\n  color: rgba(61, 76, 108, 0.86);\n  font-size: 0.85rem;\n  display: grid;\n  gap: 4px;\n}\n\n.ai-risk-rationale {\n  display: grid;\n  gap: 2px;\n  margin-top: 8px;\n  padding: 9px 10px;\n  border-radius: 10px;\n  background: rgba(242, 246, 255, 0.8);\n  border: 1px solid rgba(188, 199, 228, 0.62);\n}\n\n.ai-risk-rationale__label {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: rgba(66, 84, 126, 0.82);\n  font-weight: 700;\n}\n\n.ai-risk-rationale__text {\n  color: #294064;\n  font-size: 0.83rem;\n  font-weight: 600;\n}\n\n.ai-diagnostics-shell {\n  margin-top: 14px;\n  padding: 14px;\n  border-radius: 18px;\n  background: linear-gradient(180deg, rgba(244, 247, 255, 0.9), rgba(238, 244, 255, 0.72));\n  border: 1px solid rgba(188, 199, 228, 0.62);\n  display: grid;\n  gap: 12px;\n}\n\n.ai-diagnostics-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.ai-diagnostics-kicker {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.12);\n  color: #4f46e5;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n\n.ai-diagnostics-title {\n  margin: 8px 0 0;\n  color: #1d2d4f;\n  font-size: 1rem;\n  font-weight: 700;\n}\n\n.ai-diagnostics-list {\n  display: grid;\n  gap: 10px;\n}\n\n.ai-diagnostic-item {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 14px;\n  border: 1px solid rgba(203, 213, 225, 0.78);\n  background: rgba(255, 255, 255, 0.84);\n  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);\n}\n\n.ai-diagnostic-rail {\n  display: flex;\n  align-items: flex-start;\n}\n\n.ai-diagnostic-main {\n  display: grid;\n  gap: 8px;\n}\n\n.ai-diagnostic-heading {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.ai-diagnostic-heading h4 {\n  margin: 0;\n  color: #10223d;\n  font-size: 0.97rem;\n  font-weight: 700;\n}\n\n.ai-diagnostic-impact {\n  margin: 0;\n  color: rgba(44, 61, 95, 0.88);\n  font-size: 0.86rem;\n}\n\n.ai-diagnostic-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.assistant-review-content {\n  display: grid;\n  gap: 10px;\n}\n\n.assistant-review-content p {\n  margin: 0;\n  color: rgba(220, 233, 255, 0.86);\n  font-size: 0.9rem;\n}\n\n.assistant-review-content textarea {\n  width: 100%;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.3);\n  background: rgba(16, 24, 50, 0.6);\n  color: rgba(234, 242, 255, 0.92);\n  padding: 10px 12px;\n  resize: vertical;\n  min-height: 96px;\n}\n\n.assistant-undo-strip {\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.24);\n  background: rgba(255, 255, 255, 0.66);\n  color: rgba(53, 71, 108, 0.9);\n  font-size: 0.84rem;\n}\n\n@media (max-width: 980px) {\n  .ai-kpi-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .ai-diagnostic-item {\n    grid-template-columns: 1fr;\n  }\n\n  .ai-action-table-head {\n    display: none;\n  }\n\n  .ai-action-row {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n\n  .ai-risk-col,\n  .ai-cta-col {\n    justify-content: flex-start;\n  }\n\n  .ai-action-detail {\n    grid-template-columns: 1fr;\n  }\n\n  .assistant-detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .ai-orchestration-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .ai-orchestration-header-meta {\n    width: 100%;\n    justify-content: space-between;\n  }\n\n  .ai-kpi-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .ai-diagnostics-head,\n  .ai-diagnostic-heading {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .ai-action-toolbar {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .ai-score-card {\n    width: 100%;\n    max-width: 220px;\n  }\n\n  .ai-cta-btn {\n    width: 100%;\n  }\n\n  .ai-action-detail {\n    grid-template-columns: 1fr;\n  }\n\n  .assistant-detail-hero {\n    flex-direction: column;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ai-orchestration-section,\n  .ai-action-row {\n    transition: none;\n  }\n}\n\n.metrics-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  position: relative;\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n  margin: 0;\n  \n  i {\n    color: $primary;\n  }\n}\n\n.metrics-period {\n  display: flex;\n  align-items: center;\n  background: $glass-bg;\n  border-radius: $radius-xl;\n  padding: 4px;\n  border: 1px solid $glass-border;\n  position: relative;\n}\n\n.period-divider {\n  width: 1px;\n  height: 20px;\n  background: rgba(0, 0, 0, 0.1);\n  margin: 0 2px;\n  flex-shrink: 0;\n}\n\n.period-btn {\n  padding: $space-3 $space-5;\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $text-muted;\n  background: transparent;\n  border: none;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all $transition-fast;\n  white-space: nowrap;\n  \n  &:hover {\n    color: $text-secondary;\n    background: rgba(255, 255, 255, 0.5);\n  }\n  \n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  }\n\n  &--range {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n\n    i {\n      font-size: $font-size-sm;\n    }\n  }\n}\n\n.range-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.range-picker-dropdown {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 100;\n  margin-top: $space-2;\n  background: white;\n  border-radius: $radius-xl;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08);\n  border: 1px solid $glass-border;\n  padding: $space-3;\n  animation: fade-in-up 0.2s ease-out;\n\n  ::ng-deep .p-datepicker {\n    border: none;\n    background: transparent;\n    font-family: inherit;\n  }\n}\n\n.metrics-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-4;\n  position: relative;\n\n  @include respond-to('tablet') {\n    gap: $space-3;\n  }\n\n  @include respond-to('mobile') {\n    gap: $space-3;\n  }\n}\n\n.metric-card {\n  position: relative;\n  background:\n    linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(241, 246, 255, 0.9)),\n    radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 52%);\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  border: 1px solid rgba(162, 182, 223, 0.34);\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  overflow: hidden;\n  min-height: 160px;\n  min-width: 0;\n  flex: 1 1 calc(25% - #{$space-4} * 3 / 4);\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 18px 40px rgba(24, 45, 88, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85);\n  \n  &:hover {\n    transform: translateY(-4px);\n    border-color: rgba(95, 140, 230, 0.42);\n    box-shadow: 0 22px 48px rgba(35, 58, 112, 0.16), 0 0 0 1px rgba(132, 168, 243, 0.18);\n  }\n  \n  &.featured {\n    flex: 0 0 calc(25% - #{$space-4} * 3 / 4);\n    display: flex;\n    flex-direction: column;\n    padding: $space-5;\n  }\n}\n\n.kpi-drag-handle {\n  width: 30px;\n  height: 30px;\n  border-radius: 10px;\n  border: 1px solid rgba(125, 146, 197, 0.22);\n  background: rgba(255, 255, 255, 0.4);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(66, 84, 126, 0.72);\n  cursor: grab;\n  transition: transform $transition-fast, color $transition-fast, border-color $transition-fast, background $transition-fast, opacity $transition-fast;\n  opacity: 0.3;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover {\n    color: $primary;\n    border-color: rgba($primary, 0.35);\n    background: rgba(255, 255, 255, 0.75);\n    transform: translateY(-1px);\n    opacity: 1;\n  }\n\n  &:active {\n    cursor: grabbing;\n    transform: translateY(0);\n  }\n}\n\n.metric-card.cdk-drag-preview {\n  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.24);\n  border-radius: $radius-xl;\n}\n\n.metric-card.cdk-drag-placeholder {\n  opacity: 0.35;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.06);\n}\n\n.metrics-grid.cdk-drop-list-dragging .metric-card:not(.cdk-drag-placeholder) {\n  transition: transform 180ms ease;\n}\n\n.metric-glow {\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  opacity: 0.18;\n  pointer-events: none;\n  \n  &.primary { background: $primary-gradient; }\n}\n\n.metric-glow--aqua {\n  background: radial-gradient(circle, rgba(34, 211, 238, 0.42), rgba(34, 211, 238, 0));\n}\n\n.metric-glow--coral {\n  background: radial-gradient(circle, rgba(248, 113, 113, 0.34), rgba(248, 113, 113, 0));\n}\n\n.metric-glow--amber {\n  background: radial-gradient(circle, rgba(251, 191, 36, 0.32), rgba(251, 191, 36, 0));\n}\n\n.metric-glow--emerald {\n  background: radial-gradient(circle, rgba(52, 211, 153, 0.34), rgba(52, 211, 153, 0));\n}\n\n.metric-glow--orange {\n  background: radial-gradient(circle, rgba(249, 115, 22, 0.32), rgba(249, 115, 22, 0));\n}\n\n.metric-glow--violet {\n  background: radial-gradient(circle, rgba(168, 85, 247, 0.34), rgba(168, 85, 247, 0));\n}\n\n.metric-hero-header,\n.metric-topline {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  margin-bottom: $space-3;\n  position: relative;\n  z-index: 1;\n}\n\n.metric-topline {\n  align-items: flex-start;\n}\n\n.metric-status-rail {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  padding: 6px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(150, 169, 212, 0.22);\n  background: rgba(255, 255, 255, 0.54);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);\n}\n\n.metric-status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: currentColor;\n  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.45);\n}\n\n.metric-status-copy {\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.metric-status-rail--aqua { color: #0891b2; }\n.metric-status-rail--coral { color: #dc2626; }\n.metric-status-rail--amber { color: #d97706; }\n.metric-status-rail--emerald { color: #059669; }\n.metric-status-rail--orange { color: #ea580c; }\n.metric-status-rail--violet { color: #7c3aed; }\n\n.metric-hero-kicker {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.metric-hero-kicker__label,\n.metric-hero-kicker__tone {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 10px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n\n.metric-hero-kicker__label {\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n}\n\n.metric-hero-kicker__tone {\n  background: rgba(255, 255, 255, 0.62);\n  color: #166534;\n}\n\n.metric-hero-kicker__tone.down {\n  color: #b91c1c;\n}\n\n.metric-hero-main {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  gap: $space-5;\n  align-items: center;\n  min-width: 0;\n  flex: 1;\n}\n\n.metric-icon-large {\n  width: 76px;\n  height: 76px;\n  border-radius: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n\n  i {\n    font-size: 2rem;\n  }\n\n  &.primary {\n    background: linear-gradient(145deg, #2563eb, #7c3aed 58%, #22d3ee);\n    color: white;\n    box-shadow: 0 16px 34px rgba(87, 94, 242, 0.32);\n  }\n}\n\n.metric-body {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n\n.metric-value-large {\n  font-size: clamp(2rem, 3.1vw, $font-size-5xl);\n  font-weight: 800;\n  color: $text-primary;\n  line-height: 1;\n  margin-bottom: $space-2;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-hero-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  margin-top: $space-3;\n}\n\n.metric-hero-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(248, 250, 255, 0.78);\n  border: 1px solid rgba(139, 166, 222, 0.24);\n  color: #27406b;\n  font-size: 0.76rem;\n  font-weight: 700;\n}\n\n.metric-main {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  min-width: 0;\n  flex: 1;\n  margin-bottom: $space-3;\n}\n\n.metric-copy {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n\n.metric-footer {\n  position: relative;\n  z-index: 1;\n  margin-top: auto;\n  display: grid;\n  gap: $space-2;\n}\n\n.metric-health {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.metric-health-caption {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(45, 64, 103, 0.84);\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.metric-health-value {\n  font-size: 0.76rem;\n  font-weight: 800;\n  color: rgba(38, 57, 95, 0.82);\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n}\n\n.metric-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 10px 24px rgba(30, 41, 59, 0.08);\n\n  i {\n    font-size: 1.05rem;\n  }\n  \n  &.aqua {\n    background: linear-gradient(145deg, rgba(34, 211, 238, 0.22), rgba(6, 182, 212, 0.08));\n    color: #0891b2;\n  }\n  \n  &.violet {\n    background: linear-gradient(145deg, rgba(168, 85, 247, 0.22), rgba(124, 58, 237, 0.08));\n    color: #7c3aed;\n  }\n  \n  &.emerald {\n    background: linear-gradient(145deg, rgba(52, 211, 153, 0.22), rgba(16, 185, 129, 0.08));\n    color: #059669;\n  }\n  \n  &.orange {\n    background: linear-gradient(145deg, rgba(249, 115, 22, 0.22), rgba(234, 88, 12, 0.08));\n    color: #ea580c;\n  }\n\n  &.coral {\n    background: linear-gradient(145deg, rgba(248, 113, 113, 0.22), rgba(239, 68, 68, 0.08));\n    color: #dc2626;\n  }\n\n  &.amber {\n    background: linear-gradient(145deg, rgba(251, 191, 36, 0.22), rgba(245, 158, 11, 0.08));\n    color: #d97706;\n  }\n}\n\n.metric-trend {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n  margin-top: $space-3;\n  padding: 8px 12px;\n  border-radius: 14px;\n  width: fit-content;\n  max-width: 100%;\n  background: rgba(255, 255, 255, 0.68);\n  border: 1px solid rgba(162, 182, 223, 0.2);\n  \n  &.up { color: $success; }\n  &.down { color: $danger; }\n  \n  i { font-size: 0.82rem; }\n}\n\n.metric-value {\n  font-size: clamp(1.6rem, 2.1vw, $font-size-3xl);\n  font-weight: 800;\n  color: $text-primary;\n  line-height: 1;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-label {\n  font-size: 0.92rem;\n  color: #172554;\n  font-weight: 700;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n}\n\n.metric-bar {\n  height: 8px;\n  border-radius: $radius-full;\n  overflow: hidden;\n  position: relative;\n  background: rgba(199, 210, 227, 0.42);\n  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n\n.metric-bar--aqua { background: linear-gradient(90deg, rgba(34, 211, 238, 0.16), rgba(191, 219, 254, 0.34)); }\n.metric-bar--coral { background: linear-gradient(90deg, rgba(248, 113, 113, 0.16), rgba(254, 205, 211, 0.34)); }\n.metric-bar--amber { background: linear-gradient(90deg, rgba(251, 191, 36, 0.16), rgba(253, 230, 138, 0.34)); }\n.metric-bar--emerald { background: linear-gradient(90deg, rgba(52, 211, 153, 0.16), rgba(187, 247, 208, 0.34)); }\n.metric-bar--orange { background: linear-gradient(90deg, rgba(249, 115, 22, 0.16), rgba(254, 215, 170, 0.34)); }\n.metric-bar--violet { background: linear-gradient(90deg, rgba(168, 85, 247, 0.16), rgba(221, 214, 254, 0.34)); }\n\n.metric-bar-fill {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 0.6s ease;\n  \n  &.aqua { background: linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%); }\n  &.violet { background: linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%); }\n  &.emerald { background: linear-gradient(90deg, #10b981 0%, #34d399 100%); }\n  &.orange { background: linear-gradient(90deg, #f97316 0%, #fb923c 100%); }\n  &.coral { background: linear-gradient(90deg, #ef4444 0%, #fb7185 100%); }\n  &.amber { background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// MAIN GRID (COMMAND CENTER)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dashboard-card-grid {\n  // Flexbox wrap so individual card widths are respected during resize.\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-5;\n  align-items: stretch;\n\n  @include respond-to('tablet') {\n    gap: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n    gap: $space-3;\n  }\n}\n\n.dashboard-card {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  // Default: half-width minus half the gap (two cards per row)\n  flex: 0 0 calc(50% - #{$space-5} / 2);\n  width: calc(50% - #{$space-5} / 2);\n  height: 360px;\n  overflow: hidden;\n\n  @include respond-to('tablet') {\n    flex: 0 0 100%;\n    width: 100%;\n  }\n\n  @include respond-to('mobile') {\n    flex: 0 0 100%;\n    width: 100%;\n    height: auto;\n    min-height: 300px;\n  }\n\n  &.size-sm {\n    width: 100%;\n  }\n\n  &.size-md {\n    width: 100%;\n  }\n\n  &.size-lg {\n    width: 100%;\n  }\n\n  // Default card heights tuned to each card's content to avoid overflows or oversized layouts.\n  &[data-card-id] {\n    min-height: 360px;\n  }\n}\n\n.dashboard-card.full-width-card {\n  flex: 0 0 100%;\n  width: 100%;\n  height: auto;\n  min-height: 420px;\n  overflow: visible;\n}\n\n.dashboard-card.full-width-card .card-body {\n  min-height: 0;\n  overflow: visible;\n}\n\n.dashboard-card.full-width-card .ai-orchestration-section {\n  height: auto;\n  min-height: 0;\n  overflow: visible;\n  padding-right: 4px;\n}\n\n.dashboard-card.full-width-card .ai-action-shell {\n  min-height: 0;\n}\n\n.dashboard-card.full-width-card .ai-action-list {\n  min-height: 136px;\n  overflow-y: auto;\n}\n\n// Liquid Glass: add a subtle highlight layer and richer blur for dashboard cards.\n.dashboard-card.glass-card,\n.chart-card.glass-card {\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.38));\n  border: 1px solid rgba(255, 255, 255, 0.35);\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);\n  backdrop-filter: blur(26px) saturate(160%);\n  overflow: hidden;\n}\n\n.dashboard-card.glass-card::before,\n.chart-card.glass-card::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(circle at top left, rgba(255, 255, 255, 0.55), transparent 55%),\n    radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.15), transparent 50%);\n  pointer-events: none;\n}\n\n.dashboard-card-grid.cdk-drop-list-dragging .dashboard-card:not(.cdk-drag-placeholder) {\n  transition: transform 200ms ease;\n}\n\n.dashboard-card.cdk-drag-preview {\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);\n  border-radius: $radius-2xl;\n  // Lock drag preview sizing so cards keep their intended dimensions while moving.\n  width: var(--drag-width, auto);\n  height: var(--drag-height, auto);\n  min-width: var(--drag-width, auto);\n  min-height: var(--drag-height, auto);\n  max-width: var(--drag-width, auto);\n  max-height: var(--drag-height, auto);\n  overflow: hidden;\n}\n\n.dashboard-card.cdk-drag-placeholder {\n  opacity: 0.3;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.04);\n}\n\n.dashboard-card.cdk-drag-animating {\n  transition: transform 200ms ease;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LAYOUT DIALOG\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n:host ::ng-deep .layout-dialog {\n  .p-dialog {\n    width: min(960px, 94vw);\n    max-height: 85vh;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .p-dialog-content {\n    padding: $space-4 $space-5;\n    // Keep the full layout editor accessible without truncation on shorter viewports.\n    max-height: 70vh;\n    overflow: auto;\n  }\n\n  .p-dialog-header {\n    padding: $space-4 $space-5 $space-2;\n    cursor: move;\n  }\n}\n\n@media (max-width: 840px) {\n  :host ::ng-deep .layout-dialog {\n    .p-dialog {\n      width: 96vw;\n      height: 90vh;\n      max-height: 90vh;\n    }\n\n    .p-dialog-content {\n      max-height: calc(90vh - 120px);\n    }\n  }\n}\n\n.layout-order-list {\n  max-height: 360px;\n  overflow: auto;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.7);\n  padding: $space-2;\n  display: grid;\n  gap: $space-2;\n}\n\n.layout-item-row.cdk-drag-placeholder {\n  opacity: 0.35;\n\n  .layout-item {\n    border-style: dashed;\n    background: rgba($primary, 0.05);\n  }\n}\n\n.layout-item-row.cdk-drag-animating {\n  transition: transform 180ms ease;\n}\n\n.layout-order-list.cdk-drop-list-dragging .layout-item-row:not(.cdk-drag-placeholder) {\n  transition: transform 180ms ease;\n}\n\n.layout-item-row.cdk-drag-preview {\n  .layout-item {\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14);\n    border-color: rgba($primary, 0.28);\n    background: rgba(255, 255, 255, 0.95);\n  }\n}\n\n.layout-chart-section {\n  margin-top: $space-4;\n\n  h4 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-sm;\n    color: $text-secondary;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n  }\n}\n\n.layout-chart-list {\n  display: grid;\n  gap: $space-2;\n}\n\n.layout-chart-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.7);\n  font-size: $font-size-sm;\n  color: $text-secondary;\n\n  input {\n    accent-color: $primary;\n  }\n\n  i {\n    color: $primary;\n  }\n}\n\n.layout-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($glass-border, 0.6);\n  background: rgba($primary, 0.04);\n  transition: all $transition-fast;\n}\n\n.layout-item__drag {\n  width: 1.9rem;\n  height: 1.9rem;\n  border: 1px solid rgba($glass-border, 0.8);\n  border-radius: $radius-md;\n  background: rgba(255, 255, 255, 0.8);\n  color: $text-muted;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: grab;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.78rem;\n  }\n\n  &:active {\n    cursor: grabbing;\n  }\n}\n\n.layout-item__index {\n  width: 1.25rem;\n  text-align: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $text-muted;\n  flex-shrink: 0;\n}\n\n.layout-item:hover {\n  background: rgba($primary, 0.08);\n  border-color: rgba($primary, 0.2);\n}\n\n.layout-handle {\n  color: $text-muted;\n  font-size: $font-size-lg;\n}\n\n.layout-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.layout-title {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.layout-desc {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.layout-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n  margin-top: $space-4;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CHARTS ROW\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.charts-row {\n  // Match the standard two-card row layout for charts.\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-5;\n  margin-bottom: $space-5;\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n  }\n}\n\n.charts-row.cdk-drop-list-dragging .chart-card:not(.cdk-drag-placeholder) {\n  transition: transform 200ms ease;\n}\n\n.chart-card {\n  position: relative;\n\n  &.large {\n    .card-body {\n      padding: $space-5;\n    }\n  }\n\n  &.size-sm,\n  &.size-md,\n  &.size-lg {\n    grid-column: span 1;\n  }\n}\n\n.chart-card--resizable {\n  max-width: 100%;\n  min-width: 280px;\n  min-height: 280px;\n}\n\n// Chart cards now use fixed content-driven heights to match the rest of the dashboard.\n.chart-card[data-card-id=\"revenue\"] {\n  min-height: 360px;\n}\n\n.chart-card[data-card-id=\"growth\"] {\n  min-height: 320px;\n}\n\n.chart-card.cdk-drag-preview {\n  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);\n  border-radius: $radius-2xl;\n}\n\n.chart-card.cdk-drag-placeholder {\n  opacity: 0.3;\n  border: 1px dashed rgba($primary, 0.35);\n  background: rgba($primary, 0.04);\n}\n\n.chart-card.cdk-drag-animating {\n  transition: transform 200ms ease;\n}\n\n.card-resizable {\n  position: relative;\n  overflow: hidden;\n  max-width: 100%;\n}\n\n.card-resizable .card-body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow: auto;\n}\n\n.card-resizable {\n  display: flex;\n  flex-direction: column;\n}\n\n.card-resizable .chart-container {\n  height: 100%;\n}\n\n// Resize handles for command center card sizing.\n.resize-handle {\n  display: none;\n  position: absolute;\n  z-index: 4;\n  background: transparent;\n}\n\n.resize-handle.handle-n,\n.resize-handle.handle-s {\n  left: 0;\n  right: 0;\n  height: 18px;\n  border-radius: 999px;\n  cursor: ns-resize;\n}\n\n.resize-handle.handle-n {\n  top: -9px;\n}\n\n.resize-handle.handle-s {\n  bottom: -9px;\n}\n\n.resize-handle.handle-e,\n.resize-handle.handle-w {\n  top: 0;\n  bottom: 0;\n  width: 18px;\n  border-radius: 999px;\n  cursor: ew-resize;\n}\n\n.resize-handle.handle-e {\n  right: -9px;\n}\n\n.resize-handle.handle-w {\n  left: -9px;\n}\n\n.resize-handle.handle-ne,\n.resize-handle.handle-nw,\n.resize-handle.handle-se,\n.resize-handle.handle-sw {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n}\n\n.resize-handle.handle-ne {\n  top: -13px;\n  right: -13px;\n  cursor: nesw-resize;\n}\n\n.resize-handle.handle-nw {\n  top: -13px;\n  left: -13px;\n  cursor: nwse-resize;\n}\n\n.resize-handle.handle-se {\n  bottom: -13px;\n  right: -13px;\n  cursor: nwse-resize;\n}\n\n.resize-handle.handle-sw {\n  bottom: -13px;\n  left: -13px;\n  cursor: nesw-resize;\n}\n\n.chart-container {\n  position: relative;\n  z-index: 1; // Lift above .glass-card::before gradient overlay\n  width: 100%;\n  \n  &.medium {\n    height: 220px;\n  }\n  \n  &.small {\n    height: 160px;\n  }\n}\n\n.chart-legend {\n  display: flex;\n  gap: $space-3;\n}\n\n.legend-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  &.primary .legend-dot {\n    background: $primary;\n  }\n}\n\n.legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// GLASS CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.glass-card {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-2xl;\n  border: 1px solid $glass-border;\n  overflow: hidden;\n}\n\n.glass-card.card-resizable {\n  overflow: visible;\n}\n\n.card-header {\n  padding: $space-4 $space-5;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  position: relative;\n  z-index: 1; // Lift above .glass-card::before gradient overlay\n  padding-right: calc(#{$space-5} + 120px);\n}\n\n.card-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.card-controls {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  z-index: 2;\n}\n\n.card-control {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba($glass-border, 0.7);\n  color: $text-muted;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    border-color: rgba($primary, 0.25);\n    color: $primary;\n  }\n}\n\n.drag-handle {\n  cursor: grab;\n\n  &:active {\n    cursor: grabbing;\n  }\n}\n\n.card-title {\n  font-size: $font-size-card-title;\n  font-weight: 600;\n  color: $text-primary;\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0;\n  \n  i { color: $primary; }\n}\n\n.card-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: $space-1 $space-2;\n  background: rgba($success, 0.1);\n  color: $success;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  \n  &::before {\n    content: '';\n    width: 6px;\n    height: 6px;\n    background: $success;\n    border-radius: 50%;\n    margin-right: $space-1;\n    animation: pulse 2s infinite;\n  }\n\n  &.warn {\n    background: rgba($warning, 0.15);\n    color: $warning;\n\n    &::before {\n      background: $warning;\n    }\n  }\n}\n\n.card-body {\n  padding: $space-5;\n  overflow: auto;\n  min-height: 0;\n  flex: 1 1 auto;\n  // Lift content above .glass-card::before gradient overlay to prevent washed-out appearance\n  position: relative;\n  z-index: 1;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PIPELINE FUNNEL\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.funnel-container {\n  margin-bottom: $space-5;\n}\n\n.funnel-stage {\n  margin-bottom: $space-2;\n}\n\n.funnel-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  margin: 0 auto;\n  transition: all $transition-base;\n  \n  &.stage-1 {\n    background: linear-gradient(135deg, rgba($cyan, 0.15), rgba($cyan, 0.05));\n    border: 1px solid rgba($cyan, 0.2);\n  }\n  \n  &.stage-2 {\n    background: linear-gradient(135deg, rgba($purple, 0.15), rgba($purple, 0.05));\n    border: 1px solid rgba($purple, 0.2);\n  }\n  \n  &.stage-3 {\n    background: linear-gradient(135deg, rgba($success, 0.15), rgba($success, 0.05));\n    border: 1px solid rgba($success, 0.2);\n  }\n  \n  &:hover {\n    transform: scale(1.02);\n  }\n}\n\n.funnel-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n}\n\n.funnel-value {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.funnel-conversion {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-1;\n  padding: $space-2 0;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  i {\n    font-size: 10px;\n    color: $primary;\n  }\n}\n\n.funnel-summary {\n  display: flex;\n  gap: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.summary-item {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.summary-label {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.summary-value {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n  \n  &.success { color: $success; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACCOUNTS LIST\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.accounts-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.account-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.account-rank {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $text-muted;\n  background: $gray-100;\n  border-radius: $radius-md;\n}\n\n.account-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-base;\n  color: white;\n  \n  &.lead { background: $cyan-gradient; }\n  &.prospect { background: $purple-gradient; }\n  &.customer { background: $success-gradient; }\n}\n\n.account-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.account-name {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.account-meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n  \n  .separator { opacity: 0.5; }\n}\n\n.account-status {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  \n  &.lead { background: $cyan; }\n  &.prospect { background: $purple; }\n  &.customer { background: $success; }\n}\n\n.status-text {\n  font-size: $font-size-xs;\n  font-weight: 500;\n  color: $text-secondary;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TRUTH METRICS + RISK REGISTER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.truth-metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-3;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: $space-2;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-2;\n  }\n}\n\n.truth-metric {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.1);\n}\n\n.truth-label {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.truth-value {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n\n  &.success { color: $success; }\n  &.info { color: $primary; }\n  &.warning { color: $warning; }\n  &.danger { color: $danger; }\n}\n\n.truth-subtext {\n  margin-top: $space-3;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.risk-intelligence-body {\n  padding-top: $space-1;\n}\n\n.risk-intelligence-title-block {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.risk-intelligence-subtitle {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.risk-intelligence-panel {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n  padding: $space-4;\n  border-radius: calc(#{$radius-xl} + 6px);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(236, 243, 255, 0.82));\n  border: 1px solid rgba(182, 198, 228, 0.26);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.7),\n    0 18px 40px rgba(63, 94, 168, 0.1);\n}\n\n.risk-intelligence-overview {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n\n  @include respond-to('tablet') {\n    flex-direction: column;\n  }\n}\n\n.risk-intelligence-overview-copy {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n\n  p {\n    margin: 0;\n    max-width: 680px;\n    color: $text-secondary;\n    font-size: $font-size-sm;\n    line-height: 1.6;\n  }\n}\n\n.risk-intelligence-kicker {\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #5a78a7;\n}\n\n.risk-intelligence-summary {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 10px;\n\n  @include respond-to('tablet') {\n    justify-content: flex-start;\n  }\n}\n\n.risk-summary-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 0 14px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(241, 245, 249, 0.8);\n  color: #475569;\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n\n  &.critical {\n    color: #b91c1c;\n    background: rgba(254, 226, 226, 0.9);\n    border-color: rgba(239, 68, 68, 0.24);\n  }\n\n  &.high {\n    color: #c2410c;\n    background: rgba(255, 237, 213, 0.92);\n    border-color: rgba(249, 115, 22, 0.22);\n  }\n\n  &.medium {\n    color: #a16207;\n    background: rgba(254, 243, 199, 0.92);\n    border-color: rgba(245, 158, 11, 0.22);\n  }\n\n  &.info {\n    color: #475569;\n    background: rgba(226, 232, 240, 0.92);\n    border-color: rgba(148, 163, 184, 0.22);\n  }\n}\n\n.risk-intelligence-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.risk-intelligence-item {\n  display: grid;\n  grid-template-columns: 164px minmax(0, 1fr) auto;\n  align-items: stretch;\n  border: 1px solid rgba(138, 157, 190, 0.22);\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(247, 249, 255, 0.92));\n  box-shadow: 0 10px 28px rgba(36, 55, 96, 0.08);\n  overflow: hidden;\n\n  &.critical {\n    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.12);\n  }\n\n  &.high {\n    box-shadow: 0 12px 30px rgba(249, 115, 22, 0.1);\n  }\n\n  &.medium {\n    box-shadow: 0 12px 30px rgba(245, 158, 11, 0.08);\n  }\n\n  @include respond-to('tablet') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.risk-intelligence-rail {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-start;\n  padding: $space-4 $space-3;\n  background: linear-gradient(180deg, rgba(248, 250, 255, 0.96), rgba(241, 245, 255, 0.88));\n\n  .risk-intelligence-item.critical & {\n    background: linear-gradient(180deg, rgba(254, 242, 242, 0.98), rgba(254, 226, 226, 0.84));\n  }\n\n  .risk-intelligence-item.high & {\n    background: linear-gradient(180deg, rgba(255, 247, 237, 0.98), rgba(255, 237, 213, 0.84));\n  }\n\n  .risk-intelligence-item.medium & {\n    background: linear-gradient(180deg, rgba(255, 251, 235, 0.98), rgba(254, 243, 199, 0.84));\n  }\n}\n\n.risk-severity-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 999px;\n  font-size: 0.9rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n  background: rgba(148, 163, 184, 0.16);\n\n  &.critical {\n    color: #fff;\n    background: linear-gradient(135deg, #ef4444, #dc2626);\n  }\n\n  &.high {\n    color: #fff;\n    background: linear-gradient(135deg, #f97316, #ea580c);\n  }\n\n  &.medium {\n    color: #1f2937;\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n  }\n\n  &.info {\n    color: #64748b;\n    background: linear-gradient(135deg, #d8e1f1, #c7d2e7);\n  }\n}\n\n.risk-intelligence-main {\n  min-width: 0;\n  padding: $space-4;\n}\n\n.risk-intelligence-heading {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.risk-intelligence-count {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.risk-intelligence-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  margin-bottom: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: 1.15rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  @include respond-to('mobile') {\n    flex-direction: column;\n  }\n}\n\n.risk-intelligence-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  color: $text-secondary;\n  font-size: $font-size-md;\n\n  strong {\n    color: $text-primary;\n    font-weight: 700;\n  }\n}\n\n.risk-intelligence-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: $space-4;\n\n  @include respond-to('tablet') {\n    justify-content: flex-start;\n    padding-top: 0;\n  }\n}\n\n.risk-action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  border-radius: $radius-xl;\n  padding: 0.85rem 1.1rem;\n  font-weight: 700;\n  border: none;\n  color: #21406d;\n  background: linear-gradient(135deg, rgba(239, 244, 255, 0.96), rgba(223, 234, 255, 0.88));\n  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.18);\n\n  &.critical,\n  &.high {\n    color: #fff;\n    background: linear-gradient(135deg, #5e9cff, #3b82f6);\n    box-shadow: none;\n  }\n\n  &.medium {\n    color: #1e3a5f;\n    background: linear-gradient(135deg, #eef4ff, #dbeafe);\n  }\n\n  &.info {\n    color: #334155;\n    background: linear-gradient(135deg, #f8fafc, #e2e8f0);\n  }\n\n  .p-button-label {\n    font-weight: 700;\n  }\n}\n\n.risk-checklist {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.risk-checklist-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.12);\n\n  input[type='checkbox'] {\n    accent-color: $primary;\n  }\n}\n\n.risk-checklist-label {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  font-weight: 600;\n}\n\n.risk-checklist-count {\n  background: rgba($primary, 0.12);\n  color: $primary;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n}\n\n.execution-guide {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.execution-item {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-3;\n  border-radius: $radius-xl;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(236, 243, 255, 0.84));\n  border: 1px solid rgba(168, 186, 221, 0.22);\n  box-shadow: 0 12px 28px rgba(39, 57, 98, 0.08);\n}\n\n.execution-item-copy {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.execution-item-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.execution-step,\n.execution-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.execution-step {\n  background: rgba(59, 130, 246, 0.1);\n  color: #2563eb;\n}\n\n.execution-step.danger,\n.execution-count.danger {\n  background: rgba(254, 226, 226, 0.96);\n  color: #b91c1c;\n}\n\n.execution-step.warning,\n.execution-count.warning {\n  background: rgba(255, 237, 213, 0.96);\n  color: #c2410c;\n}\n\n.execution-step.info,\n.execution-count.info {\n  background: rgba(219, 234, 254, 0.96);\n  color: #1d4ed8;\n}\n\n.execution-step.success,\n.execution-count.success {\n  background: rgba(220, 252, 231, 0.96);\n  color: #15803d;\n}\n\n.execution-title {\n  font-size: 1.04rem;\n  line-height: 1.35;\n  color: $text-primary;\n  font-weight: 700;\n}\n\n.execution-detail {\n  font-size: $font-size-sm;\n  line-height: 1.6;\n  color: $text-secondary;\n}\n\n.execution-objective {\n  font-size: $font-size-xs;\n  line-height: 1.55;\n  color: $text-muted;\n}\n\n.execution-footnote {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.expansion-signals {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.expansion-item {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba($info, 0.08);\n  border: 1px solid rgba($info, 0.18);\n}\n\n.expansion-title {\n  font-weight: 700;\n  color: $text-primary;\n  margin-bottom: 2px;\n}\n\n.expansion-meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.expansion-actions {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: $space-1;\n}\n\n.expansion-status {\n  font-size: $font-size-xs;\n  color: $success;\n  font-weight: 600;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CONFIDENCE FORECAST \u2014 PREMIUM KPI CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n// Hero zone: weighted value + retention ring side-by-side\n.cf-hero {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4 $space-5;\n  border-radius: $radius-xl;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.10) 0%, rgba(118, 75, 162, 0.08) 50%, rgba(99, 102, 241, 0.06) 100%);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(102, 126, 234, 0.18);\n  box-shadow: 0 4px 24px rgba(102, 126, 234, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);\n    border-color: rgba(102, 126, 234, 0.25);\n  }\n}\n\n.cf-hero__main {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.cf-hero__label {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: $text-muted;\n}\n\n.cf-hero__value {\n  font-size: 1.75rem; // 28px \u2014 large hero value\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: gradient-shift 4s ease-in-out infinite;\n  line-height: 1.15;\n  filter: drop-shadow(0 1px 2px rgba(102, 126, 234, 0.15));\n}\n\n.cf-hero__delta {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $success;\n  margin-top: 2px;\n\n  i { font-size: 0.7rem; }\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.cf-hero__delta-hint {\n  font-weight: 400;\n  color: $text-muted;\n  font-size: $font-size-xs;\n  margin-left: 2px;\n}\n\n// Retention ring\n.cf-hero__ring {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.06));\n  }\n\n  .cf-hero:hover & {\n    transform: scale(1.06);\n  }\n}\n\n.cf-ring-bg {\n  fill: none;\n  stroke: rgba($gray-200, 0.5);\n  stroke-width: 4.5;\n}\n\n.cf-ring-fill {\n  fill: none;\n  stroke-width: 5;\n  stroke-linecap: round;\n  transition: stroke-dasharray 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  &.excellent { stroke: $success;  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.35)); }\n  &.good      { stroke: $info;     filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.30)); }\n  &.fair      { stroke: $warning;  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.30)); }\n  &.poor      { stroke: $danger;   filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.30)); }\n}\n\n.cf-ring-label {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  strong {\n    font-size: 1.0625rem; // 17px\n    font-weight: 800;\n    color: $text-primary;\n    line-height: 1;\n  }\n\n  span {\n    font-size: 0.625rem; // 10px\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $text-muted;\n    margin-top: 2px;\n  }\n}\n\n// Raw pipeline reference bar\n.cf-raw {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: $glass-bg-subtle;\n  border-left: 3px solid rgba(102, 126, 234, 0.3);\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cf-raw__value {\n  font-weight: 700;\n  color: $text-secondary;\n  font-size: $font-size-sm;\n}\n\n// Metric mini-tiles (2\u00D72 grid)\n.cf-metrics {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-2;\n  margin-top: $space-3;\n\n  .cf-metric {\n    animation: fade-in-up 0.4s ease-out backwards;\n\n    @for $i from 1 through 4 {\n      &:nth-child(#{$i}) {\n        animation-delay: #{$i * 0.06}s;\n      }\n    }\n  }\n}\n\n.cf-metric {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(8px);\n  border: 1px solid transparent;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);\n\n    .cf-metric__icon {\n      transform: scale(1.1) rotate(3deg);\n    }\n  }\n}\n\n.cf-metric__icon {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.cf-metric--danger  .cf-metric__icon { background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25); }\n.cf-metric--warning .cf-metric__icon { background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25); }\n.cf-metric--excellent .cf-metric__icon { background: linear-gradient(135deg, #4ade80, #22c55e); box-shadow: 0 2px 8px rgba(34, 197, 94, 0.25); }\n.cf-metric--good    .cf-metric__icon { background: linear-gradient(135deg, #60a5fa, #3b82f6); box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25); }\n.cf-metric--fair    .cf-metric__icon { background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25); }\n.cf-metric--poor    .cf-metric__icon { background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25); }\n.cf-metric--info    .cf-metric__icon { background: linear-gradient(135deg, #818cf8, #667eea); box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25); }\n\n.cf-metric--danger  { border-color: rgba($danger,  0.15); background: rgba(239, 68, 68, 0.04); }\n.cf-metric--warning { border-color: rgba($warning, 0.15); background: rgba(245, 158, 11, 0.04); }\n.cf-metric--excellent { border-color: rgba($success, 0.15); background: rgba(34, 197, 94, 0.04); }\n.cf-metric--good    { border-color: rgba($info,    0.15); background: rgba(59, 130, 246, 0.04); }\n.cf-metric--fair    { border-color: rgba($warning, 0.15); background: rgba(245, 158, 11, 0.04); }\n.cf-metric--poor    { border-color: rgba($danger,  0.15); background: rgba(239, 68, 68, 0.04); }\n.cf-metric--info    { border-color: rgba($primary, 0.15); background: rgba(102, 126, 234, 0.04); }\n\n.cf-metric__body {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  min-width: 0;\n}\n\n.cf-metric__value {\n  font-size: $font-size-base;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1.2;\n}\n\n.cf-metric__label {\n  font-size: 0.6875rem; // 11px\n  color: $text-muted;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n// Keep legacy forecast styles for anything that may still reference them\n.forecast-value {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.forecast-meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: $space-2;\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.forecast-delta {\n  font-weight: 700;\n  color: $success;\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.forecast-footnote {\n  margin-top: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.forecast-aux {\n  margin-top: $space-3;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.forecast-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.forecast-scenarios {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.scenario-row {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: $glass-bg-subtle;\n}\n\n.scenario-label {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.scenario-name {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.scenario-count {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.scenario-value {\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.scenario-delta {\n  font-weight: 700;\n  color: $text-muted;\n\n  &.positive {\n    color: $success;\n  }\n\n  &.negative {\n    color: $danger;\n  }\n}\n\n.cost-breakdown {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n\n    &::before {\n      content: '';\n      width: 3px;\n      height: 14px;\n      border-radius: 2px;\n      background: linear-gradient(180deg, #f87171, #ef4444);\n    }\n  }\n}\n\n.cost-breakdown__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.cost-deal {\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n  border: 1px solid rgba($danger, 0.10);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.85);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);\n    border-color: rgba($danger, 0.18);\n  }\n}\n\n.cost-deal__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: $space-3;\n}\n\n.cost-deal__name {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.cost-deal__meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cost-deal__value {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $danger;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #f87171, #ef4444);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.cost-deal__factors {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.cost-factor {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  padding: 3px 10px;\n  border-radius: $radius-full;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba($primary, 0.10);\n  font-weight: 500;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.08);\n    border-color: rgba($primary, 0.20);\n    color: $text-secondary;\n  }\n}\n\n.cost-trend {\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.cost-trend__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n\n    &::before {\n      content: '';\n      width: 3px;\n      height: 14px;\n      border-radius: 2px;\n      background: linear-gradient(180deg, #818cf8, #667eea);\n    }\n  }\n}\n\n.cost-breakdown-dialog {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.dialog-controls {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.dialog-select {\n  border: 1px solid rgba($text-primary, 0.1);\n  background: rgba($gray-50, 0.8);\n  border-radius: $radius-md;\n  padding: 6px 10px;\n  font-size: $font-size-xs;\n}\n\n.cost-breakdown-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.cost-breakdown-row {\n  display: flex;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: rgba($primary, 0.05);\n}\n\n.cost-breakdown-main {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.cost-breakdown-name {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.cost-breakdown-meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.cost-breakdown-factors {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.cost-breakdown-values {\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  font-size: $font-size-xs;\n}\n\n.cost-breakdown-amount {\n  color: $text-muted;\n}\n\n.cost-breakdown-exposure {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $danger;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// NEW LEADS & AT-RISK DEALS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.lead-list,\n.risk-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.lead-row,\n.risk-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.lead-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-sm;\n  color: white;\n  background: $primary-gradient;\n}\n\n.lead-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.lead-name {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.lead-meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n\n  .separator { opacity: 0.5; }\n}\n\n.lead-time {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.risk-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.risk-name {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.risk-meta {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  gap: $space-1;\n\n  .separator { opacity: 0.5; }\n}\n\n.risk-reason {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $danger;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n}\n\n.risk-amount {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-health {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.manager-health__stats {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-2;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n  }\n}\n\n.health-pill {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  background: rgba($primary, 0.06);\n  border: 1px solid rgba($primary, 0.12);\n  min-height: 64px;\n\n  &.danger {\n    background: rgba($danger, 0.10);\n    border-color: rgba($danger, 0.22);\n  }\n\n  &.warn {\n    background: rgba($warning, 0.12);\n    border-color: rgba($warning, 0.24);\n  }\n\n  &.muted {\n    background: rgba($glass-border, 0.5);\n    border-color: rgba($glass-border, 0.9);\n  }\n}\n\n.health-pill__value {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1;\n}\n\n.health-pill__label {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.manager-health__queue {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.manager-health__truth {\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  border: 1px dashed rgba($primary, 0.2);\n  background: rgba($primary, 0.03);\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.manager-health__truth--empty {\n  color: $text-muted;\n}\n\n.truth-heading {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: $text-muted;\n  font-weight: 600;\n}\n\n.truth-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n}\n\n.truth-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px $space-2;\n  border-radius: $radius-full;\n  background: rgba($primary, 0.1);\n  color: $text-primary;\n  font-size: $font-size-xs;\n  font-weight: 600;\n}\n\n.truth-empty {\n  font-size: $font-size-xs;\n}\n\n.manager-deal {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($primary, 0.10);\n  background: rgba($primary, 0.04);\n}\n\n.manager-deal__info {\n  flex: 1;\n  min-width: 0;\n}\n\n.manager-deal__name {\n  font-weight: 600;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-deal__meta {\n  margin-top: 2px;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n\n  .separator { opacity: 0.45; }\n}\n\n.manager-deal__reason {\n  margin-top: $space-1;\n  font-size: $font-size-xs;\n  color: $danger;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n}\n\n.manager-deal__side {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n  min-width: 110px;\n}\n\n.manager-deal__amount {\n  font-weight: 700;\n  color: $text-primary;\n  font-size: $font-size-sm;\n}\n\n.manager-deal__metrics {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.manager-deal__dates {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.coach-btn {\n  margin-top: $space-2;\n  width: 100%;\n  justify-content: center;\n}\n\n.coaching-dialog {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.coaching-row {\n  display: grid;\n  grid-template-columns: 1fr 140px;\n  gap: $space-3;\n}\n\n.coaching-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.coaching-field--sm {\n  max-width: 160px;\n}\n\n.coaching-label {\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $text-muted;\n  font-weight: 600;\n}\n\n.coaching-textarea,\n.coaching-input {\n  width: 100%;\n  border-radius: $radius-lg;\n  border: 1px solid rgba($primary, 0.16);\n  background: $glass-bg-subtle;\n  color: $text-primary;\n  padding: $space-2 $space-3;\n  font-size: $font-size-sm;\n  outline: none;\n  transition: border-color $transition-fast, box-shadow $transition-fast;\n\n  &:focus {\n    border-color: rgba($primary, 0.5);\n    box-shadow: 0 0 0 3px rgba($primary, 0.15);\n  }\n}\n\n.coaching-textarea {\n  resize: vertical;\n  min-height: 110px;\n}\n\n.coaching-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-2;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TIMELINE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.my-tasks-card {\n  min-height: 420px;\n\n  .card-body {\n    padding: $space-4 $space-5;\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  .task-list {\n    flex: 1;\n    min-height: 0;\n    overflow: auto;\n    padding-right: $space-2;\n  }\n}\n\n// Show resize handles on hover/resize for ALL resizable cards\n.card-resizable:hover .resize-handle,\n.card-resizable.is-resizing .resize-handle,\n.card-resizable:focus-within .resize-handle {\n  display: block;\n}\n\n.metric-card:hover .kpi-drag-handle,\n.metric-card:focus-within .kpi-drag-handle {\n  opacity: 1;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACTION QUEUE \u2014 Premium Redesign\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.aq-card {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 0;\n  background: #fff;\n  border-radius: inherit;\n  overflow: hidden;\n  // CRITICAL: position + z-index lifts this above the .glass-card::before overlay\n  // that was painting a translucent radial gradient ON TOP of all card content,\n  // causing every chip / header / label to look washed-out.\n  position: relative;\n  z-index: 1;\n}\n\n// \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-4 $space-5;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  gap: $space-3;\n}\n\n.aq-header__left {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.aq-header__icon-ring {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: #fff;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .aq-card:hover & {\n    transform: scale(1.08) rotate(5deg);\n  }\n}\n\n.aq-header__title {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: $gray-800;\n  line-height: 1.2;\n}\n\n.aq-header__title-gradient {\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  animation: gradient-shift 4s ease-in-out infinite;\n}\n\n.aq-header__subtitle {\n  display: block;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-top: 1px;\n}\n\n.aq-header__count {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  padding: $space-1 $space-3;\n  border-radius: $radius-full;\n  background: rgba(102, 126, 234, 0.08);\n}\n\n.aq-header__count-num {\n  font-weight: 700;\n  color: #667eea;\n}\n\n// \u2500\u2500 Chip filters \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n}\n\n.aq-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: $radius-full;\n  border: 1px solid rgba(102, 126, 234, 0.18);\n  background: #fff;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-700;\n  cursor: pointer;\n  transition: all 200ms ease;\n  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n}\n\n.aq-chip__dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.aq-chip__count {\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  border-radius: 9px;\n  font-size: 0.6875rem;\n  padding: 0 5px;\n}\n\n// Chip color themes\n.aq-chip--danger {\n  .aq-chip__dot { background: #ef4444; }\n  .aq-chip__count { background: rgba(239, 68, 68, 0.18); color: #dc2626; }\n  &.aq-chip--active {\n    background: #ef4444; color: #fff; border-color: #ef4444;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--warning {\n  .aq-chip__dot { background: #f59e0b; }\n  .aq-chip__count { background: rgba(245, 158, 11, 0.18); color: #d97706; }\n  &.aq-chip--active {\n    background: #f59e0b; color: #fff; border-color: #f59e0b;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--purple {\n  .aq-chip__dot { background: #a855f7; }\n  .aq-chip__count { background: rgba(168, 85, 247, 0.18); color: #9333ea; }\n  &.aq-chip--active {\n    background: #a855f7; color: #fff; border-color: #a855f7;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--cyan {\n  .aq-chip__dot { background: #06b6d4; }\n  .aq-chip__count { background: rgba(6, 182, 212, 0.18); color: #0891b2; }\n  &.aq-chip--active {\n    background: #06b6d4; color: #fff; border-color: #06b6d4;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--orange {\n  .aq-chip__dot { background: #f97316; }\n  .aq-chip__count { background: rgba(249, 115, 22, 0.18); color: #ea580c; }\n  &.aq-chip--active {\n    background: #f97316; color: #fff; border-color: #f97316;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n.aq-chip--slate {\n  .aq-chip__dot { background: #64748b; }\n  .aq-chip__count { background: rgba(100, 116, 139, 0.18); color: #475569; }\n  &.aq-chip--active {\n    background: #475569; color: #fff; border-color: #475569;\n    .aq-chip__dot { background: #fff; }\n    .aq-chip__count { background: rgba(255, 255, 255, 0.25); color: #fff; }\n  }\n}\n\n// \u2500\u2500 Segmented tab bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-tabs {\n  padding: 0 $space-5;\n}\n\n.aq-tabs__track {\n  display: flex;\n  gap: 2px;\n  padding: 3px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.06);\n  overflow-x: auto;\n\n  &::-webkit-scrollbar { display: none; }\n}\n\n.aq-tabs__btn {\n  appearance: none;\n  flex: 1 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px 14px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  color: $gray-500;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: all 200ms ease;\n\n  &:hover {\n    color: $gray-700;\n    background: rgba(255, 255, 255, 0.6);\n  }\n\n  &--active {\n    background: #fff;\n    color: $gray-800;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06);\n\n    .aq-tabs__badge {\n      background: rgba(102, 126, 234, 0.12);\n      color: #667eea;\n    }\n  }\n}\n\n.aq-tabs__badge {\n  min-width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  padding: 0 5px;\n  border-radius: 9px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: rgba(0, 0, 0, 0.06);\n  color: $gray-500;\n  transition: inherit;\n\n  &--danger { background: rgba(239, 68, 68, 0.18); color: #dc2626; }\n  &--warning { background: rgba(245, 158, 11, 0.18); color: #d97706; }\n  &--purple { background: rgba(168, 85, 247, 0.18); color: #9333ea; }\n  &--cyan { background: rgba(6, 182, 212, 0.18); color: #0891b2; }\n  &--orange { background: rgba(249, 115, 22, 0.18); color: #ea580c; }\n}\n\n// \u2500\u2500 Item list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.aq-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  padding: $space-3 $space-5 $space-4;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);\n\n  &::-webkit-scrollbar { width: 4px; }\n  &::-webkit-scrollbar-track { background: transparent; }\n  &::-webkit-scrollbar-thumb { background: rgba(102, 126, 234, 0.15); border-radius: 4px; }\n}\n\n// \u2500\u2500 Single item card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@keyframes aq-item-in {\n  from { opacity: 0; transform: translateX(-12px); }\n  to   { opacity: 1; transform: translateX(0); }\n}\n\n.aq-item {\n  display: flex;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #ffffff, #f8faff);\n  border: 1px solid rgba(102, 126, 234, 0.12);\n  overflow: visible;\n  transition: all 220ms ease;\n  animation: aq-item-in 350ms ease both;\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06);\n    border-color: rgba(102, 126, 234, 0.25);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(245, 248, 255, 0.95));\n  }\n}\n\n// Left color strip\n.aq-item__strip {\n  width: 5px;\n  flex-shrink: 0;\n  border-radius: 4px 0 0 4px;\n  background: $gray-300;\n\n  &--danger  { background: linear-gradient(180deg, #f87171, #ef4444); box-shadow: 2px 0 8px rgba(239, 68, 68, 0.2); }\n  &--warning { background: linear-gradient(180deg, #fbbf24, #f59e0b); box-shadow: 2px 0 8px rgba(245, 158, 11, 0.2); }\n  &--purple  { background: linear-gradient(180deg, #c084fc, #a855f7); box-shadow: 2px 0 8px rgba(168, 85, 247, 0.2); }\n  &--cyan    { background: linear-gradient(180deg, #22d3ee, #06b6d4); box-shadow: 2px 0 8px rgba(6, 182, 212, 0.2); }\n  &--default { background: linear-gradient(180deg, #818cf8, #667eea); box-shadow: 2px 0 8px rgba(102, 126, 234, 0.2); }\n}\n\n.aq-item__body {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  flex: 1;\n  min-width: 0;\n}\n\n// Icon badge\n.aq-item__icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .aq-item:hover & { transform: scale(1.12); }\n\n  &--danger  { background: rgba(239, 68, 68, 0.15); color: #ef4444; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15); }\n  &--warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15); }\n  &--purple  { background: rgba(168, 85, 247, 0.15); color: #a855f7; box-shadow: 0 2px 8px rgba(168, 85, 247, 0.15); }\n  &--cyan    { background: rgba(6, 182, 212, 0.15); color: #06b6d4; box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15); }\n  &--primary { background: rgba(102, 126, 234, 0.15); color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15); }\n}\n\n// Content\n.aq-item__content {\n  flex: 1;\n  min-width: 0;\n}\n\n.aq-item__row-top {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: 4px;\n  flex-wrap: wrap;\n}\n\n.aq-item__title {\n  font-size: $font-size-md;\n  font-weight: 650;\n  color: $gray-900;\n  word-break: break-word;\n  letter-spacing: -0.01em;\n}\n\n.aq-item__due {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: $radius-full;\n\n  &.due-overdue  { background: rgba(239, 68, 68, 0.14); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.1); }\n  &.due-today    { background: rgba(245, 158, 11, 0.14); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.1); }\n  &.due-soon     { background: rgba(102, 126, 234, 0.12); color: #667eea; border: 1px solid rgba(102, 126, 234, 0.08); }\n  &.due-upcoming,\n  &.due-neutral  { background: rgba(15, 23, 42, 0.05); color: $gray-500; border: 1px solid rgba(15, 23, 42, 0.04); }\n}\n\n.aq-item__subtitle {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  font-weight: 500;\n  word-break: break-word;\n  margin-bottom: $space-1;\n}\n\n.aq-item__tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.aq-item__tag {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: $gray-600;\n  padding: 3px 10px;\n  border-radius: 6px;\n  background: rgba(102, 126, 234, 0.08);\n  border: 1px solid rgba(102, 126, 234, 0.06);\n\n  &--status {\n    text-transform: capitalize;\n    font-weight: 700;\n    color: $gray-700;\n    background: rgba(15, 23, 42, 0.06);\n    border-color: rgba(15, 23, 42, 0.04);\n  }\n\n  &--overdue {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n    border-color: rgba(239, 68, 68, 0.08);\n  }\n}\n\n// Actions\n.aq-item__actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  padding-right: $space-4;\n}\n\n.aq-item__action-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: $font-size-xs;\n  transition: all 200ms ease;\n\n  &--phone,\n  &--email {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    background: rgba(102, 126, 234, 0.06);\n    color: $gray-500;\n    padding: 0;\n    border: 1px solid rgba(102, 126, 234, 0.08);\n\n    &:hover {\n      background: rgba(102, 126, 234, 0.12);\n      color: #667eea;\n      transform: translateY(-1px);\n      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);\n    }\n  }\n\n  &--complete {\n    height: 32px;\n    border-radius: 8px;\n    padding: 0 12px;\n    background: linear-gradient(135deg, #4ade80, #22c55e);\n    color: #fff;\n    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);\n\n    &:hover {\n      box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);\n      transform: translateY(-1px);\n    }\n  }\n\n  &--review {\n    height: 32px;\n    border-radius: 8px;\n    padding: 0 14px;\n    background: linear-gradient(135deg, #a78bfa, #7c3aed);\n    color: #fff;\n    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);\n\n    &:hover {\n      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);\n      transform: translateY(-1px);\n    }\n  }\n}\n\n// (Legacy .task-* / .priority-* styles removed \u2014 replaced by .aq-* classes above)\n\n.timeline-filter {\n  display: flex;\n  gap: $space-1;\n}\n\n.filter-btn {\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  color: $text-muted;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all $transition-fast;\n  \n  &:hover { color: $text-secondary; }\n  \n  &.active {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.timeline {\n  position: relative;\n}\n\n.timeline-item {\n  display: flex;\n  gap: $space-3;\n  position: relative;\n  padding-bottom: $space-4;\n  \n  &.overdue {\n    .timeline-marker {\n      background: rgba($danger, 0.1) !important;\n      color: $danger !important;\n      border-color: rgba($danger, 0.2) !important;\n    }\n  }\n  \n  &:last-child {\n    padding-bottom: 0;\n  }\n}\n\n.timeline-marker {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  z-index: 1;\n  \n  &.call {\n    background: rgba($cyan, 0.1);\n    color: $cyan;\n    border: 1px solid rgba($cyan, 0.2);\n  }\n  \n  &.email {\n    background: rgba($purple, 0.1);\n    color: $purple;\n    border: 1px solid rgba($purple, 0.2);\n  }\n  \n  &.meeting {\n    background: rgba($primary, 0.1);\n    color: $primary;\n    border: 1px solid rgba($primary, 0.2);\n  }\n  \n  &.task {\n    background: rgba($success, 0.1);\n    color: $success;\n    border: 1px solid rgba($success, 0.2);\n  }\n}\n\n.timeline-connector {\n  position: absolute;\n  left: 19px;\n  top: 44px;\n  width: 2px;\n  height: calc(100% - 44px);\n  background: linear-gradient(to bottom, $glass-border, transparent);\n}\n\n.timeline-content {\n  flex: 1;\n  min-width: 0;\n}\n\n.timeline-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-1;\n}\n\n.timeline-type {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: $text-muted;\n}\n\n.timeline-time {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  &.overdue {\n    color: $danger;\n    font-weight: 600;\n  }\n}\n\n.timeline-subject {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $text-primary;\n  margin-bottom: $space-1;\n}\n\n.timeline-entity {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  i { font-size: 10px; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HEALTH METER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.stats-card .card-body {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\n.health-meter {\n  position: relative;\n  width: 140px;\n  height: 140px;\n  margin-bottom: $space-3;\n}\n\n.circular-progress {\n  width: 100%;\n  height: 100%;\n  transform: rotate(-90deg);\n}\n\n.progress-bg {\n  fill: none;\n  stroke: $gray-200;\n  stroke-width: 8;\n}\n\n.progress-fill {\n  fill: none;\n  stroke: $primary;\n  stroke-width: 8;\n  stroke-linecap: round;\n  transition: stroke-dasharray 0.6s ease;\n}\n\n.health-value {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.health-number {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  background: $primary-gradient;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.health-unit {\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $text-muted;\n}\n\n.health-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n  margin-bottom: $space-4;\n}\n\n.health-breakdown {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.breakdown-row {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n}\n\n.breakdown-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  \n  &.success { background: $success; }\n  &.danger { background: $danger; }\n}\n\n.breakdown-text {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  text-align: left;\n}\n\n.breakdown-value {\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8 $space-4;\n  text-align: center;\n}\n\n.empty-icon {\n  width: 64px;\n  height: 64px;\n  border-radius: $radius-xl;\n  background: $gray-100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: $space-4;\n  \n  i {\n    font-size: 1.5rem;\n    color: $text-muted;\n  }\n}\n\n.empty-state h4 {\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $text-secondary;\n  margin: 0 0 $space-1;\n}\n\n.empty-state p {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: $space-4;\n  \n  p {\n    font-size: $font-size-sm;\n    color: $text-muted;\n  }\n}\n\n.loading-spinner {\n  position: relative;\n  width: 60px;\n  height: 60px;\n}\n\n.spinner-ring {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  animation: spin 1.2s ease-in-out infinite;\n  \n  &:nth-child(1) {\n    border-top-color: $primary;\n    animation-delay: 0s;\n  }\n  \n  &:nth-child(2) {\n    inset: 6px;\n    border-right-color: $cyan;\n    animation-delay: 0.2s;\n    animation-direction: reverse;\n  }\n  \n  &:nth-child(3) {\n    inset: 12px;\n    border-bottom-color: $purple;\n    animation-delay: 0.4s;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PIPELINE CHART CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.pipeline-chart-card {\n  .card-badge {\n    background: rgba($primary, 0.1);\n    color: $primary;\n    \n    &::before {\n      display: none;\n    }\n  }\n}\n\n.pipeline-stats {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n\n  @include respond-to('tablet') {\n    grid-template-columns: repeat(2, 1fr);\n    gap: $space-2;\n  }\n\n  @include respond-to('mobile') {\n    grid-template-columns: 1fr;\n    gap: $space-2;\n    margin-top: $space-2;\n    padding-top: $space-2;\n  }\n}\n\n.pipeline-stat {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  text-align: center;\n  \n  .stat-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n  \n  .stat-value {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $text-primary;\n  }\n\n  .stat-subvalue {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $text-muted;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACTIVITY BREAKDOWN (DONUT CARD)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.donut-card {\n  .card-body {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n}\n\n.donut-container {\n  width: 100%;\n  max-width: 280px;\n  margin-bottom: $space-4;\n}\n\n.activity-breakdown-list {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.breakdown-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba($gray-100, 0.5);\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.05);\n  }\n}\n\n.breakdown-icon {\n  width: 32px;\n  height: 32px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  &.cyan {\n    background: rgba($cyan, 0.1);\n    color: $cyan;\n  }\n  \n  &.purple {\n    background: rgba($purple, 0.1);\n    color: $purple;\n  }\n  \n  &.primary {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n  \n  &.success {\n    background: rgba($success, 0.1);\n    color: $success;\n  }\n  \n  i { font-size: $font-size-sm; }\n}\n\n.breakdown-label {\n  flex: 1;\n  font-size: $font-size-sm;\n  color: $text-secondary;\n}\n\n.breakdown-count {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CONVERSION CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.conversion-card {\n  .card-body {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.trend-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: $space-1 $space-2;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  \n  &.up {\n    background: rgba($success, 0.1);\n    color: $success;\n  }\n  \n  &.down {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n  \n  i { font-size: 10px; }\n}\n\n.conversion-summary {\n  display: flex;\n  gap: $space-4;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.summary-stat {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n  \n  .stat-value {\n    font-size: $font-size-xl;\n    font-weight: 700;\n    color: $text-primary;\n    \n    &.success { color: $success; }\n  }\n  \n  .stat-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TOP PERFORMERS CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.performers-card {\n  .card-body {\n    padding: $space-4;\n  }\n}\n\n.performers-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.performer-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  \n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.performer-rank {\n  width: 24px;\n  height: 24px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  background: $gray-100;\n  color: $text-muted;\n  \n  &.gold {\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n    color: white;\n  }\n  \n  &.silver {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    color: white;\n  }\n  \n  &.bronze {\n    background: linear-gradient(135deg, #d97706, #b45309);\n    color: white;\n  }\n}\n\n.performer-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: $radius-lg;\n  background: $primary-gradient;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.performer-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.performer-name {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  margin-bottom: 2px;\n}\n\n.performer-stats {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  \n  .separator {\n    opacity: 0.5;\n  }\n  \n  .revenue {\n    color: $success;\n    font-weight: 500;\n  }\n}\n\n.performer-badge {\n  color: #fbbf24;\n  animation: pulse 2s infinite;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HEALTH METRICS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.health-metrics {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n  margin-top: $space-4;\n  padding-top: $space-4;\n  border-top: 1px solid $glass-border;\n}\n\n.health-metric {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n  \n  > i {\n    font-size: $font-size-lg;\n    color: $primary;\n  }\n}\n\n.metric-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  \n  .metric-value {\n    font-size: $font-size-base;\n    font-weight: 700;\n    color: $text-primary;\n  }\n  \n  .metric-label {\n    font-size: $font-size-xs;\n    color: $text-muted;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESPONSIVE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media (max-width: 1400px) {\n  .dashboard-card-grid {\n    gap: $space-4;\n  }\n}\n\n@media (max-width: 1200px) {\n  .charts-row,\n  .dashboard-card-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .metrics-grid {\n    .metric-card {\n      flex: 0 0 calc(50% - #{$space-3} / 2);\n    }\n    \n    .metric-card.featured {\n      flex: 0 0 100%;\n\n      .metric-hero-main {\n        gap: $space-4;\n      }\n\n      .metric-value-large {\n        font-size: clamp(1.9rem, 4vw, 3rem);\n      }\n    }\n  }\n  \n  .dashboard-card-grid {\n    gap: $space-4;\n  }\n\n  .dashboard-card {\n    &.size-sm,\n    &.size-md,\n    &.size-lg {\n      width: 100%;\n    }\n  }\n  \n  .pipeline-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .truth-metrics-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .page-container {\n    padding: $space-4;\n  }\n  \n  .hero-section {\n    flex-direction: column;\n    padding: $space-4;\n  }\n  \n  .hero-actions {\n    width: 100%;\n    \n    .btn-gradient, .btn-glass {\n      flex: 1;\n      justify-content: center;\n    }\n  }\n\n  // Stack header controls and period toggle to keep the metrics section readable on mobile.\n  .metrics-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: $space-3;\n  }\n\n  .metrics-period {\n    width: 100%;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 4px;\n  }\n\n  .period-divider {\n    display: none;\n  }\n\n  .period-btn {\n    flex: 1 1 0;\n    text-align: center;\n    padding: $space-2 $space-3;\n  }\n\n  .range-picker-dropdown {\n    position: fixed;\n    top: auto;\n    right: $space-3;\n    left: $space-3;\n    bottom: $space-3;\n\n    ::ng-deep .p-datepicker {\n      .p-datepicker-panel {\n        flex-direction: column;\n      }\n    }\n  }\n  \n  .metrics-grid {\n    .metric-card {\n      flex: 0 0 100%;\n    }\n    \n    .metric-card.featured {\n      flex: 0 0 100%;\n\n      .metric-hero-main {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: $space-4;\n      }\n    }\n  }\n\n  .metric-topline,\n  .metric-health {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .metric-status-rail {\n    width: 100%;\n  }\n\n  .metric-copy {\n    width: 100%;\n  }\n  \n  .health-metrics {\n    grid-template-columns: 1fr;\n  }\n  \n  .conversion-summary {\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .manager-health__stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .coaching-row {\n    grid-template-columns: 1fr;\n  }\n\n  .manager-deal {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .manager-deal__side,\n  .manager-deal__dates {\n    align-items: flex-start;\n  }\n\n  // Stack card header content so controls stay visible without overlap.\n  .card-header {\n    flex-direction: column;\n    align-items: flex-start;\n    padding-right: $space-5;\n  }\n\n  .card-actions {\n    width: 100%;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n  }\n\n  .card-controls {\n    position: static;\n    align-self: flex-end;\n    margin-top: $space-2;\n  }\n}\n\n@media (max-width: 640px) {\n  // Prevent hero pills and chart cards from overflowing narrow screens.\n  .hero-stats {\n    flex-direction: column;\n  }\n\n  .hero-stat-pill {\n    width: 100%;\n  }\n\n  .charts-row {\n    gap: $space-4;\n  }\n\n  .metric-value-large {\n    font-size: clamp(1.9rem, 8vw, 2.6rem);\n  }\n\n  .metric-value {\n    font-size: clamp(1.2rem, 6vw, 1.6rem);\n  }\n\n  .metric-card {\n    padding: $space-3;\n    min-height: 148px;\n  }\n\n  .metric-icon-large {\n    width: 64px;\n    height: 64px;\n    border-radius: 20px;\n  }\n\n  .metric-hero-pills {\n    gap: 6px;\n  }\n\n  .metric-hero-pill {\n    font-size: 0.72rem;\n  }\n\n  .manager-health__stats {\n    grid-template-columns: 1fr;\n  }\n\n  .coaching-field--sm {\n    max-width: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// SALES TEAM PERFORMANCE CARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.team-perf {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.team-perf__kpis {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid $glass-border;\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.team-perf__kpi {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-2 $space-3;\n  border-radius: $radius-md;\n  background: rgba($primary, 0.03);\n  transition: background $transition-fast;\n\n  &:hover {\n    background: rgba($primary, 0.06);\n  }\n}\n\n.team-perf__kpi-label {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.team-perf__kpi-value {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.team-perf__kpi-delta {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n\n  &.positive {\n    color: $success;\n  }\n\n  &.negative {\n    color: $danger;\n  }\n\n  i {\n    font-size: 0.625rem;\n  }\n}\n\n.team-perf__reps {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n// Column widths shared between header and rows\n.rep-col-rank {\n  width: 32px;\n  flex-shrink: 0;\n  text-align: center;\n}\n\n.rep-col-name {\n  flex: 1.4;\n  min-width: 0;\n}\n\n.rep-col-metric {\n  flex: 1;\n  text-align: center;\n  min-width: 0;\n}\n\n// Table header\n.team-perf__rep-header {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  margin-bottom: $space-1;\n  border-bottom: 1px solid rgba($primary, 0.08);\n}\n\n.team-perf__rep-header-cell {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n// Rep row\n.team-perf__rep {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border-radius: $radius-lg;\n  transition: all $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.03);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.team-perf__rep-rank {\n  width: 24px;\n  height: 24px;\n  border-radius: $radius-md;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  background: $gray-100;\n  color: $text-muted;\n\n  &.gold {\n    background: linear-gradient(135deg, #fbbf24, #f59e0b);\n    color: white;\n  }\n\n  &.silver {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    color: white;\n  }\n\n  &.bronze {\n    background: linear-gradient(135deg, #d97706, #b45309);\n    color: white;\n  }\n}\n\n.team-perf__rep-identity {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  min-width: 0;\n}\n\n.team-perf__rep-avatar {\n  width: 30px;\n  height: 30px;\n  border-radius: $radius-md;\n  background: $cyan-gradient;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: $font-size-xs;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n\n.team-perf__rep-avatar-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n.team-perf__rep-name {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.team-perf__rep-metric {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1px;\n\n  strong {\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $text-primary;\n\n    &.revenue {\n      color: $success;\n    }\n\n    &.activity {\n      color: $primary;\n    }\n\n    &.good {\n      color: $success;\n    }\n\n    &.okay {\n      color: #f59e0b;\n    }\n\n    &.low {\n      color: $danger;\n    }\n  }\n}\n\n.team-perf__rep-metric-label {\n  font-size: 0.625rem;\n  color: $text-muted;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n}\n\n.team-perf__empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-3;\n  padding: $space-6;\n  color: $text-muted;\n\n  i {\n    font-size: 2rem;\n    opacity: 0.4;\n  }\n\n  p {\n    font-size: $font-size-sm;\n    margin: 0;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/crm/features/dashboard/pages/dashboard.page.ts", lineNumber: 90 }); })();
