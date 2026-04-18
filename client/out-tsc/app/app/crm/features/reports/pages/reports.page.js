import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/datepicker";
import * as i5 from "primeng/multiselect";
import * as i6 from "primeng/select";
import * as i7 from "@progress/telerik-angular-report-viewer";
const _c0 = ["telerikViewer"];
const _c1 = () => ({ height: "820px", width: "100%" });
function ReportsPage_a_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19);
    i0.ɵɵelement(1, "i", 20);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Open Report Workspace");
    i0.ɵɵelementEnd()();
} }
function ReportsPage_ng_container_19_section_1_section_5_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function ReportsPage_ng_container_19_section_1_section_5_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.editSelectedReportInWorkspace()); });
    i0.ɵɵelementEnd();
} }
function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 42)(1, "span", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 44)(4, "p-datepicker", 45);
    i0.ɵɵlistener("ngModelChange", function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_label_1_Template_p_datepicker_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r6); const filter_r7 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.setDateFilterValue(filter_r7.parameterName, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-datepicker", 46);
    i0.ɵɵlistener("ngModelChange", function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_label_1_Template_p_datepicker_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r6); const filter_r7 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.setDateFilterValue(filter_r7.parameterNameTo, $event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const filter_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(filter_r7.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r2.getDateFilterValue(filter_r7.parameterName))("showIcon", true)("inputStyleClass", "filter-date-picker-input");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.getDateFilterValue(filter_r7.parameterNameTo))("showIcon", true)("inputStyleClass", "filter-date-picker-input");
} }
function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_label_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 48)(1, "span", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-multiselect", 49);
    i0.ɵɵlistener("ngModelChange", function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_label_0_Template_p_multiselect_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r8); const filter_r7 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.setFilterValue(filter_r7.parameterName, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r7 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(filter_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.getFilterOptions(filter_r7))("ngModel", ctx_r2.getMultiFilterValue(filter_r7.parameterName))("filter", true)("showToggleAll", true)("placeholder", filter_r7.placeholder || "Select owners")("loading", ctx_r2.filterOptionsLoading() && filter_r7.optionSource === "report-parameter");
} }
function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 48)(1, "span", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 50);
    i0.ɵɵlistener("ngModelChange", function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_ng_template_1_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r9); const filter_r7 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.setFilterValue(filter_r7.parameterName, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const filter_r7 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(filter_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.getFilterOptions(filter_r7))("ngModel", ctx_r2.getFilterValue(filter_r7.parameterName))("placeholder", filter_r7.placeholder || "Select option")("loading", ctx_r2.filterOptionsLoading() && filter_r7.optionSource === "report-parameter");
} }
function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_label_0_Template, 4, 7, "label", 47)(1, ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_ng_template_1_Template, 4, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const singleSelectFilter_r10 = i0.ɵɵreference(2);
    const filter_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngIf", filter_r7.kind === "owner")("ngIfElse", singleSelectFilter_r10);
} }
function ReportsPage_ng_container_19_section_1_section_5_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ReportsPage_ng_container_19_section_1_section_5_ng_container_9_label_1_Template, 6, 7, "label", 41)(2, ReportsPage_ng_container_19_section_1_section_5_ng_container_9_ng_template_2_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const filter_r7 = ctx.$implicit;
    const selectFilter_r11 = i0.ɵɵreference(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", filter_r7.kind === "dateRange")("ngIfElse", selectFilter_r11);
} }
function ReportsPage_ng_container_19_section_1_section_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 31)(1, "div", 32)(2, "div")(3, "h3", 33);
    i0.ɵɵtext(4, "Filters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 34);
    i0.ɵɵtext(6, "Choose filter values before loading the report.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, ReportsPage_ng_container_19_section_1_section_5_button_7_Template, 1, 0, "button", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 36);
    i0.ɵɵtemplate(9, ReportsPage_ng_container_19_section_1_section_5_ng_container_9_Template, 4, 2, "ng-container", 37);
    i0.ɵɵelementStart(10, "div", 38)(11, "button", 39);
    i0.ɵɵlistener("click", function ReportsPage_ng_container_19_section_1_section_5_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.runOrDesignSelectedReport()); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.canOpenReportDesigner());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.getFilters())("ngForTrackBy", ctx_r2.trackFilter);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", ctx_r2.getSelectedReportRunLabel())("disabled", ctx_r2.filterOptionsLoading());
} }
function ReportsPage_ng_container_19_section_1_tr_viewer_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr-viewer", 51, 3);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("serviceUrl", ctx_r2.telerikServiceUrl())("reportSource", ctx_r2.telerikReportSource())("authenticationToken", ctx_r2.telerikAuthToken)("ready", ctx_r2.onTelerikReady)("error", ctx_r2.onTelerikError)("containerStyle", i0.ɵɵpureFunction0(6, _c1));
} }
function ReportsPage_ng_container_19_section_1_div_8_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Pick filter values above, then run the report.");
    i0.ɵɵelementEnd();
} }
function ReportsPage_ng_container_19_section_1_div_8_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "This library entry is a report template. Open Report Workspace to design or publish it before running it here.");
    i0.ɵɵelementEnd();
} }
function ReportsPage_ng_container_19_section_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵtemplate(2, ReportsPage_ng_container_19_section_1_div_8_p_2_Template, 2, 0, "p", 54)(3, ReportsPage_ng_container_19_section_1_div_8_p_3_Template, 2, 0, "p", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.canRunSelectedReport() ? "pi-sliders-h" : "pi-palette");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.canRunSelectedReport());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.canRunSelectedReport());
} }
function ReportsPage_ng_container_19_section_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 23)(1, "div", 24)(2, "button", 25);
    i0.ɵɵlistener("click", function ReportsPage_ng_container_19_section_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.backToCatalog()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 26);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, ReportsPage_ng_container_19_section_1_section_5_Template, 12, 5, "section", 27);
    i0.ɵɵelementStart(6, "div", 28);
    i0.ɵɵtemplate(7, ReportsPage_ng_container_19_section_1_tr_viewer_7_Template, 2, 7, "tr-viewer", 29)(8, ReportsPage_ng_container_19_section_1_div_8_Template, 4, 3, "div", 30);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.selectedReport().name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.getFilters().length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.telerikEnabled() && ctx_r2.telerikReportSource());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.getFilters().length && !ctx_r2.telerikEnabled());
} }
function ReportsPage_ng_container_19_section_2_div_3_article_1_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r13.description);
} }
function ReportsPage_ng_container_19_section_2_div_3_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 61);
    i0.ɵɵlistener("click", function ReportsPage_ng_container_19_section_2_div_3_article_1_Template_article_click_0_listener() { const item_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.openReport(item_r13)); });
    i0.ɵɵelementStart(1, "div", 62);
    i0.ɵɵelement(2, "i", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 64)(4, "h3", 65);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 66);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ReportsPage_ng_container_19_section_2_div_3_article_1_p_8_Template, 2, 1, "p", 67);
    i0.ɵɵelementStart(9, "span", 68);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r13.categoryName || "Uncategorized");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r13.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Updated ", i0.ɵɵpipeBind2(11, 4, item_r13.modifiedOn, "mediumDate"));
} }
function ReportsPage_ng_container_19_section_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, ReportsPage_ng_container_19_section_2_div_3_article_1_Template, 12, 7, "article", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.reportCatalog());
} }
function ReportsPage_ng_container_19_section_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "i", 71);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No reports are published in the ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5, "CRM");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " category yet. Open the report workspace and publish reports into the CRM folder to show them here.");
    i0.ɵɵelementEnd()();
} }
function ReportsPage_ng_container_19_section_2_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵelement(1, "i", 73);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading report library...");
    i0.ɵɵelementEnd()();
} }
function ReportsPage_ng_container_19_section_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 55)(1, "h2", 26);
    i0.ɵɵtext(2, "Report Library");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ReportsPage_ng_container_19_section_2_div_3_Template, 2, 1, "div", 56)(4, ReportsPage_ng_container_19_section_2_div_4_Template, 7, 0, "div", 57)(5, ReportsPage_ng_container_19_section_2_div_5_Template, 4, 0, "div", 58);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r2.catalogLoading() && ctx_r2.reportCatalog().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.catalogLoading() && !ctx_r2.reportCatalog().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.catalogLoading());
} }
function ReportsPage_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ReportsPage_ng_container_19_section_1_Template, 9, 4, "section", 21)(2, ReportsPage_ng_container_19_section_2_Template, 6, 3, "section", 22);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedReport());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.selectedReport());
} }
function ReportsPage_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 74)(1, "div", 70);
    i0.ɵɵelement(2, "i", 75);
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Report Server is not configured for this environment. Set ");
    i0.ɵɵelementStart(5, "code");
    i0.ɵɵtext(6, "Reporting__ReportServerUrl");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " to enable the report library.");
    i0.ɵɵelementEnd()()();
} }
export class ReportsPage {
    static GENERIC_EMBEDDED_REPORT_SOURCE = 'CRM.Enterprise.Api.Reporting.EmbeddedLibraryTelerikReport, CRM.Enterprise.Api';
    data = inject(ReportsDataService);
    toast = inject(AppToastService);
    host = inject((ElementRef));
    router = inject(Router);
    apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');
    telerikViewer;
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    report = signal({
        generatedAtUtc: new Date().toISOString(),
        totalOpenOpportunities: 0,
        totalPipelineValue: 0,
        stages: []
    }, ...(ngDevMode ? [{ debugName: "report" }] : []));
    telerikEnabled = signal(false, ...(ngDevMode ? [{ debugName: "telerikEnabled" }] : []));
    telerikServiceUrl = signal('', ...(ngDevMode ? [{ debugName: "telerikServiceUrl" }] : []));
    telerikReportSource = signal(null, ...(ngDevMode ? [{ debugName: "telerikReportSource" }] : []));
    reportServerEnabled = signal(false, ...(ngDevMode ? [{ debugName: "reportServerEnabled" }] : []));
    reportServerConfig = signal(null, ...(ngDevMode ? [{ debugName: "reportServerConfig" }] : []));
    reportCatalog = signal([], ...(ngDevMode ? [{ debugName: "reportCatalog" }] : []));
    catalogLoading = signal(false, ...(ngDevMode ? [{ debugName: "catalogLoading" }] : []));
    selectedReport = signal(null, ...(ngDevMode ? [{ debugName: "selectedReport" }] : []));
    viewerReady = signal(false, ...(ngDevMode ? [{ debugName: "viewerReady" }] : []));
    canOpenReportDesigner = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.reportsDesign), ...(ngDevMode ? [{ debugName: "canOpenReportDesigner" }] : []));
    filterValues = signal({}, ...(ngDevMode ? [{ debugName: "filterValues" }] : []));
    dateFilterValues = signal({}, ...(ngDevMode ? [{ debugName: "dateFilterValues" }] : []));
    dynamicFilterOptions = signal({}, ...(ngDevMode ? [{ debugName: "dynamicFilterOptions" }] : []));
    filterOptionsLoading = signal(false, ...(ngDevMode ? [{ debugName: "filterOptionsLoading" }] : []));
    get telerikAuthToken() {
        const appToken = readTokenContext()?.token ?? '';
        return appToken;
    }
    constructor() {
        this.loadReportServerConfig();
        this.refresh();
    }
    ngAfterViewInit() {
        if (this.telerikViewer) {
            console.log('[Telerik] Viewer found in AfterViewInit');
        }
    }
    onTelerikReady = () => {
        this.viewerReady.set(true);
        this.normalizeTelerikViewerState();
    };
    onTelerikError = () => {
        setTimeout(() => this.normalizeTelerikViewerState(), 300);
    };
    refresh() {
        this.loading.set(true);
        this.data.getPipelineByStage().subscribe({
            next: (report) => {
                this.report.set(report);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load pipeline report.');
            }
        });
    }
    openReport(item) {
        this.selectedReport.set(this.normalizeReportLibraryItem(item));
        this.viewerReady.set(false);
        this.telerikEnabled.set(false);
        this.telerikReportSource.set(null);
        this.initializeFilterValues(item);
        if (item.filters.length === 0) {
            this.applySelectedReportFilters();
            return;
        }
        this.loadDynamicFilterOptions(item);
    }
    backToCatalog() {
        this.selectedReport.set(null);
        this.telerikEnabled.set(false);
        this.telerikReportSource.set(null);
        this.filterValues.set({});
        this.dateFilterValues.set({});
        this.dynamicFilterOptions.set({});
        this.filterOptionsLoading.set(false);
        this.viewerReady.set(false);
    }
    applySelectedReportFilters() {
        const selected = this.selectedReport();
        const config = this.reportServerConfig();
        if (!selected || !config?.reportServiceUrl) {
            return;
        }
        this.viewerReady.set(false);
        this.telerikServiceUrl.set(this.resolveServiceUrl(config.reportServiceUrl));
        const isEmbeddedMode = !config.reportServerUrl;
        const reportPath = isEmbeddedMode
            ? (selected.embeddedReportSource ?? '')
            : (selected.categoryName
                ? `${selected.categoryName}/${selected.name}`
                : selected.name);
        if (!reportPath) {
            this.telerikEnabled.set(false);
            this.telerikReportSource.set(null);
            this.toast.show('error', 'This report is available as a template only right now. Open Report Workspace to design or publish it first.');
            return;
        }
        const reportSource = { report: reportPath };
        const parameters = {};
        const values = this.filterValues();
        for (const filter of selected.filters) {
            if (filter.kind === 'dateRange') {
                if (filter.parameterName) {
                    const fromValue = values[filter.parameterName];
                    parameters[filter.parameterName] = typeof fromValue === 'string' ? fromValue : '';
                }
                if (filter.parameterNameTo) {
                    const toValue = values[filter.parameterNameTo];
                    parameters[filter.parameterNameTo] = typeof toValue === 'string' ? toValue : '';
                }
                continue;
            }
            if (filter.parameterName) {
                const value = values[filter.parameterName];
                if (Array.isArray(value)) {
                    const normalized = value.filter((item) => typeof item === 'string' && item.trim().length > 0);
                    const allOptions = this.getFilterOptions(filter)
                        .map((option) => option.value)
                        .filter((option) => typeof option === 'string' && option.trim().length > 0);
                    const isAllSelected = normalized.length > 0 && allOptions.length > 0 && normalized.length === allOptions.length;
                    parameters[filter.parameterName] = isAllSelected ? '' : normalized.join(',');
                }
                else {
                    parameters[filter.parameterName] = value ?? '';
                }
            }
        }
        if (Object.keys(parameters).length > 0) {
            reportSource['parameters'] = parameters;
        }
        if (selected.embeddedReportSource === ReportsPage.GENERIC_EMBEDDED_REPORT_SOURCE) {
            const headers = this.getEmbeddedHeaders(selected.id);
            reportSource['parameters'] = {
                ...(reportSource['parameters'] ?? {}),
                ReportKey: selected.id,
                ReportTitle: selected.name,
                ReportDescription: selected.description,
                Header1: headers[0],
                Header2: headers[1],
                Header3: headers[2],
                Header4: headers[3]
            };
        }
        this.telerikReportSource.set(reportSource);
        this.telerikEnabled.set(true);
    }
    getFilters() {
        return this.selectedReport()?.filters ?? [];
    }
    getFilterValue(parameterName) {
        if (!parameterName) {
            return '';
        }
        const value = this.filterValues()[parameterName];
        return typeof value === 'string' ? value : '';
    }
    getMultiFilterValue(parameterName) {
        if (!parameterName) {
            return [];
        }
        const value = this.filterValues()[parameterName];
        return Array.isArray(value) ? value : [];
    }
    setFilterValue(parameterName, value) {
        if (!parameterName) {
            return;
        }
        this.filterValues.update((current) => ({
            ...current,
            [parameterName]: Array.isArray(value) ? value : (value ?? '')
        }));
    }
    getFilterOptions(filter) {
        return filter.optionSource === 'report-parameter'
            ? this.dynamicFilterOptions()[filter.key] ?? []
            : filter.options ?? [];
    }
    getDateFilterValue(parameterName) {
        if (!parameterName) {
            return null;
        }
        return this.dateFilterValues()[parameterName] ?? null;
    }
    setDateFilterValue(parameterName, value) {
        if (!parameterName) {
            return;
        }
        const nextDate = value instanceof Date && !Number.isNaN(value.getTime())
            ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
            : null;
        const nextValue = nextDate
            ? this.formatDateForParameter(nextDate)
            : '';
        this.dateFilterValues.update((current) => ({
            ...current,
            [parameterName]: nextDate
        }));
        this.setFilterValue(parameterName, nextValue);
    }
    trackFilter(_index, filter) {
        return filter.key;
    }
    canRunSelectedReport() {
        const selected = this.selectedReport();
        const config = this.reportServerConfig();
        if (!selected || !config) {
            return false;
        }
        return config.reportServerUrl
            ? true
            : !!selected.embeddedReportSource;
    }
    getSelectedReportRunLabel() {
        return this.canRunSelectedReport() ? 'Run Report' : 'Open in Workspace';
    }
    runOrDesignSelectedReport() {
        if (this.canRunSelectedReport()) {
            this.applySelectedReportFilters();
            return;
        }
        window.open('/app/report-designer', '_self');
    }
    editSelectedReportInWorkspace() {
        const selected = this.selectedReport();
        if (!selected) {
            return;
        }
        const reportPath = selected.embeddedReportSource?.trim();
        if (!reportPath) {
            this.toast.show('error', 'This report does not have an editable designer definition yet.');
            return;
        }
        void this.router.navigate(['/app/report-designer'], {
            queryParams: {
                report: reportPath
            }
        });
    }
    initializeFilterValues(report) {
        const nextValues = {};
        const nextDateValues = {};
        for (const filter of report.filters) {
            if (filter.kind === 'dateRange') {
                if (filter.parameterName) {
                    nextValues[filter.parameterName] = filter.defaultValue ?? '';
                    nextDateValues[filter.parameterName] = this.parseDateParameter(filter.defaultValue);
                }
                if (filter.parameterNameTo) {
                    nextValues[filter.parameterNameTo] = filter.defaultValueTo ?? '';
                    nextDateValues[filter.parameterNameTo] = this.parseDateParameter(filter.defaultValueTo);
                }
                continue;
            }
            if (filter.parameterName) {
                nextValues[filter.parameterName] = filter.kind === 'owner'
                    ? []
                    : (filter.defaultValue ?? '');
            }
        }
        this.filterValues.set(nextValues);
        this.dateFilterValues.set(nextDateValues);
        this.dynamicFilterOptions.set({});
    }
    loadDynamicFilterOptions(report) {
        const dynamicFilters = report.filters.filter((filter) => filter.optionSource === 'report-parameter' && !!filter.parameterName);
        if (dynamicFilters.length === 0) {
            this.filterOptionsLoading.set(false);
            return;
        }
        this.filterOptionsLoading.set(true);
        const requests = Object.fromEntries(dynamicFilters.map((filter) => [
            filter.key,
            this.data.getReportParameterOptions(report.id, filter.parameterName).pipe(catchError(() => of([])))
        ]));
        forkJoin(requests).subscribe({
            next: (result) => {
                this.dynamicFilterOptions.set(Object.fromEntries(Object.entries(result).map(([key, options]) => [key, this.normalizeOptions(options)])));
                this.filterOptionsLoading.set(false);
            },
            error: () => {
                this.dynamicFilterOptions.set({});
                this.filterOptionsLoading.set(false);
                this.toast.show('error', 'Unable to load report filter options.');
            }
        });
    }
    formatDateForParameter(value) {
        const year = value.getFullYear();
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const day = `${value.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    parseDateParameter(value) {
        if (!value) {
            return null;
        }
        const parsed = new Date(`${value}T00:00:00`);
        return Number.isNaN(parsed.getTime())
            ? null
            : new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }
    loadReportServerConfig() {
        this.data.getReportServerConfig().subscribe({
            next: (config) => {
                this.reportServerConfig.set(config);
                this.reportServerEnabled.set(config.enabled);
                if (config.enabled) {
                    // Keep the viewer on the CRM API origin through the proxy/embedded service path.
                    // Do not fetch a separate Report Server token on page load unless we later reintroduce
                    // a direct external viewer integration.
                    this.loadLibrary();
                }
            }
        });
    }
    loadLibrary() {
        this.catalogLoading.set(true);
        this.data.getReportLibrary().subscribe({
            next: (items) => {
                const crmOnly = items.filter((item) => item.categoryName?.toLowerCase() === 'crm');
                this.reportCatalog.set(crmOnly.map((item) => this.normalizeReportLibraryItem(item)));
                this.catalogLoading.set(false);
            },
            error: () => {
                this.reportCatalog.set([]);
                this.catalogLoading.set(false);
                this.toast.show('error', 'Report library is unavailable right now. Check report connectivity or publish reports later.');
            }
        });
    }
    resolveServiceUrl(servicePath) {
        if (!servicePath) {
            return '';
        }
        if (/^https?:\/\//i.test(servicePath)) {
            return servicePath;
        }
        if (servicePath.startsWith('/')) {
            return `${this.apiBaseUrl}${servicePath}`;
        }
        return `${this.apiBaseUrl}/${servicePath.replace(/^\/+/, '')}`;
    }
    normalizeTelerikViewerState() {
        const root = this.host.nativeElement;
        const errorPane = root.querySelector('.trv-error-pane');
        const errorMessage = root.querySelector('.trv-error-pane .trv-error-message');
        const renderedPages = root.querySelectorAll('.trv-page-wrapper, .trv-report-page');
        if (!errorPane) {
            return;
        }
        const message = (errorMessage?.textContent ?? '').trim();
        const hasRenderedPages = renderedPages.length > 0;
        if (hasRenderedPages && message.length === 0) {
            errorPane.style.display = 'none';
            errorPane.style.visibility = 'hidden';
            errorPane.style.opacity = '0';
        }
        else {
            errorPane.style.removeProperty('display');
            errorPane.style.removeProperty('visibility');
            errorPane.style.removeProperty('opacity');
        }
    }
    normalizeReportLibraryItem(item) {
        return {
            ...item,
            embeddedReportSource: item.embeddedReportSource ?? null,
            filters: item.filters.map((filter) => ({
                ...filter,
                options: this.normalizeOptions(filter.options ?? [])
            }))
        };
    }
    normalizeOptions(options) {
        const seen = new Set();
        const normalized = [];
        for (const option of options) {
            const value = option?.value ?? '';
            const label = option?.label ?? '';
            const key = `${value}::${label}`;
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            normalized.push({ value, label });
        }
        return normalized;
    }
    getEmbeddedHeaders(reportId) {
        switch (reportId) {
            case 'open-opportunities-by-owner':
                return ['Owner', 'Stage', 'Open Deals', 'Pipeline'];
            case 'pending-deal-approval':
                return ['Deal', 'Workflow', 'Status', 'Due'];
            case 'lead-conversion-summary':
                return ['Lead Source', 'Created', 'Qualified', 'Converted'];
            case 'sales-activities-by-owner':
                return ['Owner', 'Activities', 'Completed', 'Overdue'];
            case 'forecast-summary':
            case 'forecast-distribution':
            case 'revenue-forecast':
                return ['Forecast Bucket', 'Deals', 'Open Value', 'Weighted'];
            case 'pipeline-stage-mix':
                return ['Stage', 'Deals', 'Value', 'Share'];
            case 'revenue-and-conversion-trend':
                return ['Period', 'Revenue', 'Leads', 'Converted'];
            case 'win-loss-analysis':
                return ['Outcome', 'Deals', 'Value', 'Avg Deal'];
            case 'sales-cycle-duration':
                return ['Stage', 'Deals', 'Avg Age', 'Avg Value'];
            case 'top-deals':
                return ['Deal', 'Account', 'Stage', 'Amount'];
            case 'lead-conversion-funnel':
                return ['Funnel Step', 'Count', '', ''];
            case 'lead-source-performance':
                return ['Source', 'Leads', 'Converted', 'Conv Rate'];
            case 'lead-aging':
                return ['Age Bucket', 'Lead Count', '', ''];
            case 'lead-score-distribution':
                return ['Score Band', 'Leads', 'Avg Score', 'Avg Confidence'];
            case 'lead-quality-vs-conversation-signal':
                return ['Lead', 'Owner', 'Qualification', 'Conversation'];
            case 'cqvs-readiness-heatmap':
                return ['Factor', 'Captured', 'Verified', 'Missing'];
            case 'manager-pipeline-health':
            case 'pipeline-health-scorecard':
                return ['Stage', 'Open Deals', 'Stale', 'Weighted'];
            case 'activity-summary':
                return ['Activity Type', 'Count', 'Open', 'Completed'];
            case 'team-performance':
                return ['Owner', 'Open Deals', 'Pipeline', 'Completed Acts'];
            case 'customer-growth':
                return ['Period', 'New Customers', 'Revenue', 'Industry'];
            case 'customer-revenue-concentration':
                return ['Customer', 'Annual Revenue', 'Open Opps', 'Pipeline'];
            case 'campaign-roi':
                return ['Campaign', 'Members', 'Actual', 'Planned'];
            case 'email-engagement':
                return ['Template / Subject', 'Sent', 'Opened', 'Clicked'];
            default:
                return ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
        }
    }
    static ɵfac = function ReportsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsPage, selectors: [["app-reports-page"]], viewQuery: function ReportsPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.telerikViewer = _t.first);
        } }, decls: 22, vars: 8, consts: [["reportServerUnavailable", ""], ["selectFilter", ""], ["singleSelectFilter", ""], ["telerikViewer", ""], [1, "reports-page"], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "glass-card", "hero-card"], [1, "hero-content"], [1, "hero-title"], [1, "hero-subtitle"], [1, "hero-note"], [1, "hero-actions"], ["pButton", "", "type", "button", "icon", "pi pi-refresh", "label", "Refresh", 1, "crm-button", "crm-button--secondary", 3, "click", "loading"], ["pButton", "", "type", "button", "class", "crm-button crm-button--secondary", "routerLink", "/app/report-designer", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["pButton", "", "type", "button", "routerLink", "/app/report-designer", 1, "crm-button", "crm-button--secondary"], [1, "pi", "pi-palette"], ["class", "glass-card", 4, "ngIf"], ["class", "glass-card catalog-section", 4, "ngIf"], [1, "glass-card"], [1, "catalog-back"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-left", "label", "Back to Catalog", 1, "crm-button", "crm-button--secondary", 3, "click"], [1, "section-title"], ["class", "report-filter-card glass-card", 4, "ngIf"], [1, "embed-shell"], [3, "serviceUrl", "reportSource", "authenticationToken", "ready", "error", "containerStyle", 4, "ngIf"], ["class", "empty-state report-filter-prompt", 4, "ngIf"], [1, "report-filter-card", "glass-card"], [1, "report-filter-header"], [1, "card-title"], [1, "filter-note"], ["pButton", "", "type", "button", "class", "crm-button crm-button--secondary", "icon", "pi pi-pencil", "label", "Edit in Workspace", 3, "click", 4, "ngIf"], [1, "filter-form-grid"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "filter-actions"], ["pButton", "", "type", "button", "icon", "pi pi-play", 1, "crm-button", "crm-button--primary", "filter-run-button", 3, "click", "label", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-pencil", "label", "Edit in Workspace", 1, "crm-button", "crm-button--secondary", 3, "click"], ["class", "filter-field filter-field--date-range", 4, "ngIf", "ngIfElse"], [1, "filter-field", "filter-field--date-range"], [1, "filter-label"], [1, "filter-date-range"], ["appendTo", "body", "dateFormat", "yy-mm-dd", "placeholder", "Start date", 3, "ngModelChange", "ngModel", "showIcon", "inputStyleClass"], ["appendTo", "body", "dateFormat", "yy-mm-dd", "placeholder", "End date", 3, "ngModelChange", "ngModel", "showIcon", "inputStyleClass"], ["class", "filter-field", 4, "ngIf", "ngIfElse"], [1, "filter-field"], ["optionLabel", "label", "optionValue", "value", "appendTo", "body", "display", "chip", 3, "ngModelChange", "options", "ngModel", "filter", "showToggleAll", "placeholder", "loading"], ["optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "placeholder", "loading"], [3, "serviceUrl", "reportSource", "authenticationToken", "ready", "error", "containerStyle"], [1, "empty-state", "report-filter-prompt"], [1, "pi", 3, "ngClass"], [4, "ngIf"], [1, "glass-card", "catalog-section"], ["class", "catalog-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [1, "catalog-grid"], ["class", "catalog-card glass-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "catalog-card", "glass-card", 3, "click"], [1, "catalog-card-icon"], [1, "pi", "pi-file"], [1, "catalog-card-content"], [1, "catalog-card-title"], [1, "catalog-card-category"], ["class", "catalog-card-desc", 4, "ngIf"], [1, "catalog-card-date"], [1, "catalog-card-desc"], [1, "empty-state"], [1, "pi", "pi-inbox"], [1, "loading-state"], [1, "pi", "pi-spin", "pi-spinner"], [1, "glass-card", "unavailable-card"], [1, "pi", "pi-server"]], template: function ReportsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 4)(1, "div", 5);
            i0.ɵɵelement(2, "div", 6)(3, "div", 7)(4, "div", 8)(5, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "section", 10)(8, "div", 11)(9, "h1", 12);
            i0.ɵɵtext(10, "Reports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p", 13);
            i0.ɵɵtext(12, "Browse published CRM reports and run them inside the application.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 14);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "date");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 15)(17, "button", 16);
            i0.ɵɵlistener("click", function ReportsPage_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.refresh()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, ReportsPage_a_18_Template, 4, 0, "a", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(19, ReportsPage_ng_container_19_Template, 3, 2, "ng-container", 18)(20, ReportsPage_ng_template_20_Template, 8, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const reportServerUnavailable_r14 = i0.ɵɵreference(21);
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate1(" Generated: ", i0.ɵɵpipeBind2(15, 5, ctx.report().generatedAtUtc, "medium"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("loading", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canOpenReportDesigner());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.reportServerEnabled())("ngIfElse", reportServerUnavailable_r14);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.NgControlStatus, i2.NgModel, RouterLink, ButtonModule, i3.ButtonDirective, DatePickerModule, i4.DatePicker, MultiSelectModule, i5.MultiSelect, SelectModule, i6.Select, BreadcrumbsComponent, TelerikReportingModule, i7.TelerikReportViewerComponent, i1.DatePipe], styles: [".reports-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  position: relative;\n  z-index: 1;\n\n  .hero-card {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    position: relative;\n    z-index: 2;\n  }\n\n  .hero-note {\n    margin: 0.4rem 0 0;\n    font-size: 0.86rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n    position: relative;\n    z-index: 10;\n\n    a, button {\n      position: relative;\n      z-index: 10;\n    }\n  }\n\n  .report-kpis {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 1rem;\n  }\n\n  .kpi-card {\n    padding: 1rem 1.1rem;\n  }\n\n  .kpi-label {\n    margin: 0;\n    font-size: 0.82rem;\n    color: var(--crm-text-muted, #64748b);\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  .kpi-value {\n    margin: 0.45rem 0 0;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: var(--crm-text-strong, #0f172a);\n  }\n\n  .embed-shell {\n    margin-bottom: 1rem;\n    border: 1px solid color-mix(in srgb, var(--crm-border, #cbd5e1) 70%, transparent);\n    border-radius: 14px;\n    background: #fff;\n    padding: 0.75rem;\n  }\n\n  .embed-disabled {\n    margin: 0 0 1rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .compatibility-note {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0 0 1rem;\n    padding: 0.875rem 1rem;\n    border-radius: 12px;\n    background: color-mix(in srgb, #f59e0b 10%, #fff);\n    border: 1px solid color-mix(in srgb, #f59e0b 24%, transparent);\n    color: #92400e;\n\n    i {\n      font-size: 1rem;\n    }\n  }\n\n  // Report Server catalog\n  .catalog-section {\n    .section-title {\n      margin: 0 0 1rem;\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--crm-text-strong, #0f172a);\n    }\n  }\n\n  .catalog-back {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 1rem;\n\n    .section-title {\n      margin: 0;\n    }\n  }\n\n  .catalog-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: 1rem;\n  }\n\n  .catalog-card {\n    display: flex;\n    gap: 0.75rem;\n    padding: 1rem;\n    cursor: pointer;\n    transition:\n      transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n      box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);\n    }\n  }\n\n  .catalog-card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: #fff;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n\n  .catalog-card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n  }\n\n  .catalog-card-title {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: var(--crm-text-strong, #0f172a);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .catalog-card-category {\n    font-size: 0.78rem;\n    color: #667eea;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  .catalog-card-desc {\n    margin: 2px 0 0;\n    font-size: 0.82rem;\n    color: var(--crm-text-muted, #64748b);\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n  }\n\n  .catalog-card-date {\n    font-size: 0.76rem;\n    color: var(--crm-text-muted, #94a3b8);\n  }\n\n  .report-filter-card {\n    margin-bottom: 1rem;\n    padding: 1rem 1.25rem;\n    border: 1px solid color-mix(in srgb, #93c5fd 55%, transparent);\n    background: rgba(255, 255, 255, 0.82);\n  }\n\n  .report-filter-header {\n    display: flex;\n    align-items: flex-start;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .filter-note {\n    margin: 0.2rem 0 0;\n    color: var(--crm-text-muted, #64748b);\n    font-size: 0.92rem;\n  }\n\n  .filter-form-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 1rem;\n    align-items: end;\n  }\n\n  .filter-field {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .filter-field--date-range {\n    grid-column: span 2;\n  }\n\n  .filter-actions {\n    display: flex;\n    align-items: end;\n    justify-content: flex-start;\n  }\n\n  .filter-run-button {\n    min-width: 160px;\n    height: 42px;\n  }\n\n  .filter-date-range {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  .filter-date-input {\n    min-height: 42px;\n    border-radius: 12px;\n    border: 1px solid color-mix(in srgb, var(--crm-border, #cbd5e1) 70%, transparent);\n    background: #fff;\n    padding: 0.7rem 0.9rem;\n    color: var(--crm-text-strong, #0f172a);\n    font: inherit;\n  }\n\n  .filter-date-picker-input {\n    min-height: 42px;\n  }\n\n  .filter-label {\n    font-size: 0.78rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: #2563eb;\n  }\n\n  .report-filter-prompt {\n    min-height: 240px;\n  }\n\n  .empty-state {\n    text-align: center;\n    padding: 2rem 1rem;\n    color: var(--crm-text-muted, #64748b);\n\n    i {\n      font-size: 2.5rem;\n      display: block;\n      margin-bottom: 0.5rem;\n      opacity: 0.4;\n    }\n  }\n\n  .loading-state {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 2rem;\n    color: var(--crm-text-muted, #64748b);\n\n    i {\n      font-size: 1.25rem;\n    }\n  }\n\n}\n\n@media (max-width: 900px) {\n  .reports-page[_ngcontent-%COMP%] {\n    .hero-card {\n      flex-direction: column;\n    }\n\n    .report-kpis {\n      grid-template-columns: 1fr;\n    }\n\n    .report-filter-header {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .filter-form-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .filter-field--date-range {\n      grid-column: auto;\n    }\n\n    .filter-date-range {\n      grid-template-columns: 1fr;\n    }\n\n    .filter-actions {\n      justify-content: stretch;\n    }\n\n    .filter-run-button {\n      width: 100%;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsPage, [{
        type: Component,
        args: [{ selector: 'app-reports-page', standalone: true, imports: [CommonModule, FormsModule, RouterLink, ButtonModule, DatePickerModule, MultiSelectModule, SelectModule, BreadcrumbsComponent, TelerikReportingModule], template: "<section class=\"reports-page\">\n  <div class=\"page-background\">\n    <div class=\"animated-orb orb-1\"></div>\n    <div class=\"animated-orb orb-2\"></div>\n    <div class=\"animated-orb orb-3\"></div>\n    <div class=\"grid-pattern\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card hero-card\">\n    <div class=\"hero-content\">\n      <h1 class=\"hero-title\">Reports</h1>\n      <p class=\"hero-subtitle\">Browse published CRM reports and run them inside the application.</p>\n      <p class=\"hero-note\">\n        Generated:\n        {{ report().generatedAtUtc | date: 'medium' }}\n      </p>\n    </div>\n    <div class=\"hero-actions\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" icon=\"pi pi-refresh\" label=\"Refresh\" (click)=\"refresh()\" [loading]=\"loading()\"></button>\n      <a pButton type=\"button\" class=\"crm-button crm-button--secondary\" routerLink=\"/app/report-designer\" *ngIf=\"canOpenReportDesigner()\">\n        <i class=\"pi pi-palette\"></i>\n        <span>Open Report Workspace</span>\n      </a>\n    </div>\n  </section>\n\n  <ng-container *ngIf=\"reportServerEnabled(); else reportServerUnavailable\">\n    <!-- Back to catalog when viewing a report -->\n    <section class=\"glass-card\" *ngIf=\"selectedReport()\">\n      <div class=\"catalog-back\">\n        <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" icon=\"pi pi-arrow-left\" label=\"Back to Catalog\" (click)=\"backToCatalog()\"></button>\n        <h2 class=\"section-title\">{{ selectedReport()!.name }}</h2>\n      </div>\n      <section class=\"report-filter-card glass-card\" *ngIf=\"getFilters().length\">\n        <div class=\"report-filter-header\">\n          <div>\n            <h3 class=\"card-title\">Filters</h3>\n            <p class=\"filter-note\">Choose filter values before loading the report.</p>\n          </div>\n          <button\n            *ngIf=\"canOpenReportDesigner()\"\n            pButton\n            type=\"button\"\n            class=\"crm-button crm-button--secondary\"\n            icon=\"pi pi-pencil\"\n            label=\"Edit in Workspace\"\n            (click)=\"editSelectedReportInWorkspace()\">\n          </button>\n        </div>\n        <div class=\"filter-form-grid\">\n          <ng-container *ngFor=\"let filter of getFilters(); trackBy: trackFilter\">\n            <label class=\"filter-field filter-field--date-range\" *ngIf=\"filter.kind === 'dateRange'; else selectFilter\">\n              <span class=\"filter-label\">{{ filter.label }}</span>\n              <div class=\"filter-date-range\">\n                <p-datepicker\n                  [ngModel]=\"getDateFilterValue(filter.parameterName)\"\n                  (ngModelChange)=\"setDateFilterValue(filter.parameterName, $event)\"\n                  [showIcon]=\"true\"\n                  [inputStyleClass]=\"'filter-date-picker-input'\"\n                  appendTo=\"body\"\n                  dateFormat=\"yy-mm-dd\"\n                  placeholder=\"Start date\">\n                </p-datepicker>\n                <p-datepicker\n                  [ngModel]=\"getDateFilterValue(filter.parameterNameTo)\"\n                  (ngModelChange)=\"setDateFilterValue(filter.parameterNameTo, $event)\"\n                  [showIcon]=\"true\"\n                  [inputStyleClass]=\"'filter-date-picker-input'\"\n                  appendTo=\"body\"\n                  dateFormat=\"yy-mm-dd\"\n                  placeholder=\"End date\">\n                </p-datepicker>\n              </div>\n            </label>\n            <ng-template #selectFilter>\n              <label class=\"filter-field\" *ngIf=\"filter.kind === 'owner'; else singleSelectFilter\">\n                <span class=\"filter-label\">{{ filter.label }}</span>\n                <p-multiselect\n                  [options]=\"getFilterOptions(filter)\"\n                  [ngModel]=\"getMultiFilterValue(filter.parameterName)\"\n                  (ngModelChange)=\"setFilterValue(filter.parameterName, $event)\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  appendTo=\"body\"\n                  display=\"chip\"\n                  [filter]=\"true\"\n                  [showToggleAll]=\"true\"\n                  [placeholder]=\"filter.placeholder || 'Select owners'\"\n                  [loading]=\"filterOptionsLoading() && filter.optionSource === 'report-parameter'\">\n                </p-multiselect>\n              </label>\n              <ng-template #singleSelectFilter>\n              <label class=\"filter-field\">\n                <span class=\"filter-label\">{{ filter.label }}</span>\n                <p-select\n                  [options]=\"getFilterOptions(filter)\"\n                  [ngModel]=\"getFilterValue(filter.parameterName)\"\n                  (ngModelChange)=\"setFilterValue(filter.parameterName, $event)\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  appendTo=\"body\"\n                  [placeholder]=\"filter.placeholder || 'Select option'\"\n                  [loading]=\"filterOptionsLoading() && filter.optionSource === 'report-parameter'\">\n                </p-select>\n              </label>\n              </ng-template>\n            </ng-template>\n          </ng-container>\n          <div class=\"filter-actions\">\n            <button\n              pButton\n              type=\"button\"\n              class=\"crm-button crm-button--primary filter-run-button\"\n              icon=\"pi pi-play\"\n              [label]=\"getSelectedReportRunLabel()\"\n              (click)=\"runOrDesignSelectedReport()\"\n              [disabled]=\"filterOptionsLoading()\">\n            </button>\n          </div>\n        </div>\n      </section>\n      <div class=\"embed-shell\">\n        <tr-viewer\n          *ngIf=\"telerikEnabled() && telerikReportSource()\"\n          #telerikViewer\n          [serviceUrl]=\"telerikServiceUrl()\"\n          [reportSource]=\"telerikReportSource()\"\n          [authenticationToken]=\"telerikAuthToken\"\n          [ready]=\"onTelerikReady\"\n          [error]=\"onTelerikError\"\n          [containerStyle]=\"{ height: '820px', width: '100%' }\">\n        </tr-viewer>\n        <div class=\"empty-state report-filter-prompt\" *ngIf=\"getFilters().length && !telerikEnabled()\">\n          <i class=\"pi\" [ngClass]=\"canRunSelectedReport() ? 'pi-sliders-h' : 'pi-palette'\"></i>\n          <p *ngIf=\"canRunSelectedReport()\">Pick filter values above, then run the report.</p>\n          <p *ngIf=\"!canRunSelectedReport()\">This library entry is a report template. Open Report Workspace to design or publish it before running it here.</p>\n        </div>\n      </div>\n    </section>\n\n    <!-- Report Catalog Grid -->\n    <section class=\"glass-card catalog-section\" *ngIf=\"!selectedReport()\">\n      <h2 class=\"section-title\">Report Library</h2>\n      <div class=\"catalog-grid\" *ngIf=\"!catalogLoading() && reportCatalog().length\">\n        <article class=\"catalog-card glass-card\" *ngFor=\"let item of reportCatalog()\" (click)=\"openReport(item)\">\n          <div class=\"catalog-card-icon\">\n            <i class=\"pi pi-file\"></i>\n          </div>\n          <div class=\"catalog-card-content\">\n            <h3 class=\"catalog-card-title\">{{ item.name }}</h3>\n            <span class=\"catalog-card-category\">{{ item.categoryName || 'Uncategorized' }}</span>\n            <p class=\"catalog-card-desc\" *ngIf=\"item.description\">{{ item.description }}</p>\n            <span class=\"catalog-card-date\">Updated {{ item.modifiedOn | date: 'mediumDate' }}</span>\n          </div>\n        </article>\n      </div>\n      <div class=\"empty-state\" *ngIf=\"!catalogLoading() && !reportCatalog().length\">\n        <i class=\"pi pi-inbox\"></i>\n        <p>No reports are published in the <strong>CRM</strong> category yet. Open the report workspace and publish reports into the CRM folder to show them here.</p>\n      </div>\n      <div class=\"loading-state\" *ngIf=\"catalogLoading()\">\n        <i class=\"pi pi-spin pi-spinner\"></i>\n        <span>Loading report library...</span>\n      </div>\n    </section>\n  </ng-container>\n\n  <ng-template #reportServerUnavailable>\n    <section class=\"glass-card unavailable-card\">\n      <div class=\"empty-state\">\n        <i class=\"pi pi-server\"></i>\n        <p>Report Server is not configured for this environment. Set <code>Reporting__ReportServerUrl</code> to enable the report library.</p>\n      </div>\n    </section>\n  </ng-template>\n</section>\n", styles: [".reports-page {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  position: relative;\n  z-index: 1;\n\n  .hero-card {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 1rem;\n    position: relative;\n    z-index: 2;\n  }\n\n  .hero-note {\n    margin: 0.4rem 0 0;\n    font-size: 0.86rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n    position: relative;\n    z-index: 10;\n\n    a, button {\n      position: relative;\n      z-index: 10;\n    }\n  }\n\n  .report-kpis {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 1rem;\n  }\n\n  .kpi-card {\n    padding: 1rem 1.1rem;\n  }\n\n  .kpi-label {\n    margin: 0;\n    font-size: 0.82rem;\n    color: var(--crm-text-muted, #64748b);\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  .kpi-value {\n    margin: 0.45rem 0 0;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: var(--crm-text-strong, #0f172a);\n  }\n\n  .embed-shell {\n    margin-bottom: 1rem;\n    border: 1px solid color-mix(in srgb, var(--crm-border, #cbd5e1) 70%, transparent);\n    border-radius: 14px;\n    background: #fff;\n    padding: 0.75rem;\n  }\n\n  .embed-disabled {\n    margin: 0 0 1rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .compatibility-note {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0 0 1rem;\n    padding: 0.875rem 1rem;\n    border-radius: 12px;\n    background: color-mix(in srgb, #f59e0b 10%, #fff);\n    border: 1px solid color-mix(in srgb, #f59e0b 24%, transparent);\n    color: #92400e;\n\n    i {\n      font-size: 1rem;\n    }\n  }\n\n  // Report Server catalog\n  .catalog-section {\n    .section-title {\n      margin: 0 0 1rem;\n      font-size: 1.125rem;\n      font-weight: 600;\n      color: var(--crm-text-strong, #0f172a);\n    }\n  }\n\n  .catalog-back {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 1rem;\n\n    .section-title {\n      margin: 0;\n    }\n  }\n\n  .catalog-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: 1rem;\n  }\n\n  .catalog-card {\n    display: flex;\n    gap: 0.75rem;\n    padding: 1rem;\n    cursor: pointer;\n    transition:\n      transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n      box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);\n    }\n  }\n\n  .catalog-card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    background: linear-gradient(135deg, #667eea, #764ba2);\n    color: #fff;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n\n  .catalog-card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n  }\n\n  .catalog-card-title {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: var(--crm-text-strong, #0f172a);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .catalog-card-category {\n    font-size: 0.78rem;\n    color: #667eea;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  .catalog-card-desc {\n    margin: 2px 0 0;\n    font-size: 0.82rem;\n    color: var(--crm-text-muted, #64748b);\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n  }\n\n  .catalog-card-date {\n    font-size: 0.76rem;\n    color: var(--crm-text-muted, #94a3b8);\n  }\n\n  .report-filter-card {\n    margin-bottom: 1rem;\n    padding: 1rem 1.25rem;\n    border: 1px solid color-mix(in srgb, #93c5fd 55%, transparent);\n    background: rgba(255, 255, 255, 0.82);\n  }\n\n  .report-filter-header {\n    display: flex;\n    align-items: flex-start;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .filter-note {\n    margin: 0.2rem 0 0;\n    color: var(--crm-text-muted, #64748b);\n    font-size: 0.92rem;\n  }\n\n  .filter-form-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n    gap: 1rem;\n    align-items: end;\n  }\n\n  .filter-field {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .filter-field--date-range {\n    grid-column: span 2;\n  }\n\n  .filter-actions {\n    display: flex;\n    align-items: end;\n    justify-content: flex-start;\n  }\n\n  .filter-run-button {\n    min-width: 160px;\n    height: 42px;\n  }\n\n  .filter-date-range {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  .filter-date-input {\n    min-height: 42px;\n    border-radius: 12px;\n    border: 1px solid color-mix(in srgb, var(--crm-border, #cbd5e1) 70%, transparent);\n    background: #fff;\n    padding: 0.7rem 0.9rem;\n    color: var(--crm-text-strong, #0f172a);\n    font: inherit;\n  }\n\n  .filter-date-picker-input {\n    min-height: 42px;\n  }\n\n  .filter-label {\n    font-size: 0.78rem;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: #2563eb;\n  }\n\n  .report-filter-prompt {\n    min-height: 240px;\n  }\n\n  .empty-state {\n    text-align: center;\n    padding: 2rem 1rem;\n    color: var(--crm-text-muted, #64748b);\n\n    i {\n      font-size: 2.5rem;\n      display: block;\n      margin-bottom: 0.5rem;\n      opacity: 0.4;\n    }\n  }\n\n  .loading-state {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 2rem;\n    color: var(--crm-text-muted, #64748b);\n\n    i {\n      font-size: 1.25rem;\n    }\n  }\n\n}\n\n@media (max-width: 900px) {\n  .reports-page {\n    .hero-card {\n      flex-direction: column;\n    }\n\n    .report-kpis {\n      grid-template-columns: 1fr;\n    }\n\n    .report-filter-header {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .filter-form-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .filter-field--date-range {\n      grid-column: auto;\n    }\n\n    .filter-date-range {\n      grid-template-columns: 1fr;\n    }\n\n    .filter-actions {\n      justify-content: stretch;\n    }\n\n    .filter-run-button {\n      width: 100%;\n    }\n  }\n}\n"] }]
    }], () => [], { telerikViewer: [{
            type: ViewChild,
            args: ['telerikViewer']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsPage, { className: "ReportsPage", filePath: "src/app/crm/features/reports/pages/reports.page.ts", lineNumber: 33 }); })();
