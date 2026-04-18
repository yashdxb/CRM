import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext } from '../../../../core/auth/token.utils';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["designerFrame"];
function ReportDesignerPage_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1, " Build Telerik reports directly inside CRM. Tenant admins and provider-side developers can design, save, and refine reports without Report Server. ");
    i0.ɵɵelementEnd();
} }
function ReportDesignerPage_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1, " Manage reports through the external Telerik Report Server workspace. ");
    i0.ɵɵelementEnd();
} }
function ReportDesignerPage_p_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1, " Reporting workspace configuration is unavailable in this environment. ");
    i0.ɵɵelementEnd();
} }
function ReportDesignerPage_div_13_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 22);
    i0.ɵɵelement(2, "i", 23);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Loading Telerik Report Designer...");
    i0.ɵɵelementEnd()()();
} }
function ReportDesignerPage_div_13_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 24);
    i0.ɵɵelement(2, "i", 25);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 26);
    i0.ɵɵlistener("click", function ReportDesignerPage_div_13_div_26_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.retry()); });
    i0.ɵɵelement(6, "i", 27);
    i0.ɵɵtext(7, " Retry ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const errorMessage_r4 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(errorMessage_r4);
} }
function ReportDesignerPage_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "section", 12)(2, "div", 13)(3, "div", 14);
    i0.ɵɵelement(4, "i", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h2");
    i0.ɵɵtext(7, "Built-In Telerik Designer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, " This workspace uses the CRM-hosted Telerik Web Report Designer and local report definition storage. Report Server stays optional for later publishing and centralized governance. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 16)(11, "article", 17)(12, "span", 18);
    i0.ɵɵtext(13, "Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15, "Embedded Designer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p");
    i0.ɵɵtext(17, "Runs inside CRM using the API-hosted Telerik designer service.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "article", 17)(19, "span", 18);
    i0.ɵɵtext(20, "Storage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22, "API File Storage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p");
    i0.ɵɵtext(24, "Definitions, resources, shared data sources, and settings are stored by the CRM API.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(25, ReportDesignerPage_div_13_div_25_Template, 5, 0, "div", 19)(26, ReportDesignerPage_div_13_div_26_Template, 8, 1, "div", 19);
    i0.ɵɵelementStart(27, "iframe", 20, 0);
    i0.ɵɵlistener("load", function ReportDesignerPage_div_13_Template_iframe_load_27_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDesignerFrameLoad()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(25);
    i0.ɵɵproperty("ngIf", ctx_r2.loading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.error());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("hidden", ctx_r2.loading() || !!ctx_r2.error());
    i0.ɵɵproperty("src", ctx_r2.designerFrameUrl(), i0.ɵɵsanitizeResourceUrl);
} }
function ReportDesignerPage_div_14_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtext(1, "No categories returned yet.");
    i0.ɵɵelementEnd();
} }
function ReportDesignerPage_div_14_ul_73_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r6.name);
} }
function ReportDesignerPage_div_14_ul_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 56);
    i0.ɵɵtemplate(1, ReportDesignerPage_div_14_ul_73_li_1_Template, 2, 1, "li", 57);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.reportServerCategories());
} }
function ReportDesignerPage_div_14_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵelement(1, "i", 23);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading Report Server workspace...");
    i0.ɵɵelementEnd()();
} }
function ReportDesignerPage_div_14_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "No published reports found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Create or publish reports in Report Server, then they will appear here.");
    i0.ɵɵelementEnd()()();
} }
function ReportDesignerPage_div_14_div_85_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63)(1, "span", 64);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const report_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r7.categoryName || "Uncategorized");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r7.extension);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 4, report_r7.modifiedOn, "mediumDate"));
} }
function ReportDesignerPage_div_14_div_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "div", 61)(2, "span");
    i0.ɵɵtext(3, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Format");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Updated");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, ReportDesignerPage_div_14_div_85_div_10_Template, 10, 7, "div", 62);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r2.reportServerCatalog());
} }
function ReportDesignerPage_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 28)(2, "section", 29)(3, "div", 30)(4, "div", 31);
    i0.ɵɵelement(5, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h2");
    i0.ɵɵtext(8, "Report Server Workspace");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10, "Use Report Server to design, publish, organize, and reopen reports without changing application code.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 33)(12, "a", 34);
    i0.ɵɵelement(13, "i", 35);
    i0.ɵɵtext(14, " Open Report Server ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 36);
    i0.ɵɵlistener("click", function ReportDesignerPage_div_14_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openReportServerViewer()); });
    i0.ɵɵelement(16, "i", 37);
    i0.ɵɵtext(17, " Open Catalog ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "a", 38);
    i0.ɵɵelement(19, "i", 39);
    i0.ɵɵtext(20, " Back to Reports ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "section", 40)(22, "article", 17)(23, "span", 18);
    i0.ɵɵtext(24, "Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26, "Report Server");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28, "Viewer and designer are sourced from the external report platform.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "article", 17)(30, "span", 18);
    i0.ɵɵtext(31, "Server URL");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "strong");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p");
    i0.ɵɵtext(35, "Base Report Server address configured for this environment.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "article", 17)(37, "span", 18);
    i0.ɵɵtext(38, "Catalog");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "strong");
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "p");
    i0.ɵɵtext(42, "Published CRM reports currently available from the server catalog.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "article", 17)(44, "span", 18);
    i0.ɵɵtext(45, "Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "strong");
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p");
    i0.ɵɵtext(49, "CRM report folders returned by the server API.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(50, "section", 41)(51, "article", 42)(52, "div", 43)(53, "h3");
    i0.ɵɵtext(54, "Quick Start");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span", 44);
    i0.ɵɵtext(56, "Later Option");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "ol", 45)(58, "li");
    i0.ɵɵtext(59, "Open the external Telerik Report Server workspace.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "li");
    i0.ɵɵtext(61, "Create or import a `.trdp` report.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "li");
    i0.ɵɵtext(63, "Save and publish the report to the catalog.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "li");
    i0.ɵɵtext(65, "Return to the Reports page to run it inside CRM.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(66, "article", 42)(67, "div", 43)(68, "h3");
    i0.ɵɵtext(69, "Categories");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "span", 46);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(72, ReportDesignerPage_div_14_div_72_Template, 2, 0, "div", 47)(73, ReportDesignerPage_div_14_ul_73_Template, 2, 1, "ul", 48);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(74, "section", 49)(75, "div", 50)(76, "div")(77, "h3");
    i0.ɵɵtext(78, "Published Reports");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "p");
    i0.ɵɵtext(80, "Reports currently available from the Report Server catalog.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(81, "a", 51);
    i0.ɵɵtext(82, "Manage in Report Server");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(83, ReportDesignerPage_div_14_div_83_Template, 4, 0, "div", 52)(84, ReportDesignerPage_div_14_div_84_Template, 7, 0, "div", 53)(85, ReportDesignerPage_div_14_div_85_Template, 11, 1, "div", 54);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const cfg_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("href", cfg_r8.designerUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(21);
    i0.ɵɵtextInterpolate(cfg_r8.reportServerUrl);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.reportServerCatalog().length);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.reportServerCategories().length);
    i0.ɵɵadvance(24);
    i0.ɵɵtextInterpolate(ctx_r2.reportServerCategories().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.reportServerCategories().length && !ctx_r2.reportServerLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.reportServerCategories().length);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("href", cfg_r8.designerUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.reportServerLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.reportServerLoading() && !ctx_r2.reportServerCatalog().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.reportServerLoading() && ctx_r2.reportServerCatalog().length);
} }
function ReportDesignerPage_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 24);
    i0.ɵɵelement(2, "i", 32);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Report workspace is not configured for this environment.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 65);
    i0.ɵɵelement(6, "i", 66);
    i0.ɵɵtext(7, " Back to Reports ");
    i0.ɵɵelementEnd()()();
} }
export class ReportDesignerPage {
    reportsData = inject(ReportsDataService);
    toast = inject(AppToastService);
    sanitizer = inject(DomSanitizer);
    route = inject(ActivatedRoute);
    apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');
    clientBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    designerFrame;
    workspaceMode = signal('loading', ...(ngDevMode ? [{ debugName: "workspaceMode" }] : []));
    reportServerConfig = signal(null, ...(ngDevMode ? [{ debugName: "reportServerConfig" }] : []));
    reportServerCatalog = signal([], ...(ngDevMode ? [{ debugName: "reportServerCatalog" }] : []));
    reportServerCategories = signal([], ...(ngDevMode ? [{ debugName: "reportServerCategories" }] : []));
    reportServerLoading = signal(false, ...(ngDevMode ? [{ debugName: "reportServerLoading" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    error = signal(null, ...(ngDevMode ? [{ debugName: "error" }] : []));
    designerFrameUrl = signal(null, ...(ngDevMode ? [{ debugName: "designerFrameUrl" }] : []));
    requestedReport = signal('', ...(ngDevMode ? [{ debugName: "requestedReport" }] : []));
    constructor() {
        this.route.queryParamMap.subscribe((params) => {
            this.requestedReport.set(params.get('report') ?? '');
        });
        this.loadWorkspaceMode();
    }
    isEmbeddedMode = () => this.workspaceMode() === 'embedded';
    isReportServerMode = () => this.workspaceMode() === 'report-server';
    isUnavailableMode = () => this.workspaceMode() === 'unavailable';
    openReportServerViewer() {
        const config = this.reportServerConfig();
        if (!config?.reportServerUrl) {
            return;
        }
        window.open(`${config.reportServerUrl}/Report`, '_blank', 'noopener');
    }
    retry() {
        this.error.set(null);
        this.loading.set(true);
        this.designerFrameUrl.set(this.buildDesignerFrameUrl());
    }
    onDesignerFrameLoad() {
        if (!this.isEmbeddedMode()) {
            return;
        }
        const frameWindow = this.designerFrame?.nativeElement.contentWindow;
        if (!frameWindow) {
            this.error.set('Report designer frame is unavailable.');
            this.loading.set(false);
            return;
        }
        frameWindow.postMessage({
            type: 'crm-report-designer:init',
            payload: {
                serviceUrl: this.designerServiceUrl,
                assetsUrl: this.designerAssetsUrl,
                authenticationToken: this.authToken,
                report: this.requestedReport()
            }
        }, this.clientBaseUrl || '*');
    }
    onMessage(event) {
        if (event.origin !== this.clientBaseUrl || !event.data || typeof event.data !== 'object') {
            return;
        }
        const type = event.data.type;
        if (type === 'crm-report-designer:ready') {
            this.loading.set(false);
            this.error.set(null);
            return;
        }
        if (type === 'crm-report-designer:error') {
            const message = String(event.data.message || 'Failed to initialize report designer.');
            this.error.set(message);
            this.loading.set(false);
            this.toast.show('error', message);
        }
    }
    get designerServiceUrl() {
        const basePath = '/api/report-designer';
        return environment.production
            ? `${this.apiBaseUrl}${basePath}`
            : `${this.apiBaseUrl}${basePath}`;
    }
    get designerAssetsUrl() {
        const basePath = '/api/report-designer-assets';
        return environment.production
            ? `${this.apiBaseUrl}${basePath}`
            : `${this.apiBaseUrl}${basePath}`;
    }
    get authToken() {
        return readTokenContext()?.token ?? '';
    }
    loadWorkspaceMode() {
        this.reportServerLoading.set(true);
        this.reportsData.getReportServerConfig().subscribe({
            next: (cfg) => {
                this.reportServerConfig.set(cfg.enabled ? cfg : null);
                if (!cfg.enabled) {
                    this.workspaceMode.set('unavailable');
                    this.loading.set(false);
                    this.reportServerLoading.set(false);
                    return;
                }
                this.workspaceMode.set('embedded');
                this.reportServerLoading.set(false);
                this.loading.set(true);
                this.designerFrameUrl.set(this.buildDesignerFrameUrl());
            },
            error: () => {
                this.reportServerConfig.set(null);
                this.workspaceMode.set('unavailable');
                this.reportServerCatalog.set([]);
                this.reportServerCategories.set([]);
                this.reportServerLoading.set(false);
                this.loading.set(false);
            }
        });
    }
    buildDesignerFrameUrl() {
        const raw = `${this.clientBaseUrl}/assets/report-designer-host.html`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
    }
    static ɵfac = function ReportDesignerPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportDesignerPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportDesignerPage, selectors: [["app-report-designer-page"]], viewQuery: function ReportDesignerPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.designerFrame = _t.first);
        } }, hostBindings: function ReportDesignerPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("message", function ReportDesignerPage_message_HostBindingHandler($event) { return ctx.onMessage($event); }, i0.ɵɵresolveWindow);
        } }, decls: 16, vars: 6, consts: [["designerFrame", ""], [1, "page-container"], [1, "page-header"], [1, "header-row"], [1, "header-content"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "hero-subtitle", 4, "ngIf"], ["class", "designer-section", 4, "ngIf"], [1, "hero-subtitle"], [1, "designer-section"], [1, "embedded-hero"], [1, "embedded-copy"], [1, "redirect-icon", "embedded-icon"], [1, "pi", "pi-palette"], [1, "embedded-meta"], [1, "status-card"], [1, "status-label"], ["class", "designer-loading-shell", 4, "ngIf"], ["title", "Telerik Report Designer", 1, "designer-container", 3, "load", "src"], [1, "designer-loading-shell"], [1, "loading-state"], [1, "pi", "pi-spin", "pi-spinner"], [1, "error-state"], [1, "pi", "pi-exclamation-triangle"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "pi", "pi-refresh"], [1, "report-server-shell"], [1, "report-server-hero"], [1, "report-server-copy"], [1, "redirect-icon"], [1, "pi", "pi-server"], [1, "report-server-actions"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn-primary", 3, "href"], [1, "pi", "pi-external-link"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "pi", "pi-folder-open"], ["routerLink", "/app/reports", 1, "btn", "btn-secondary"], [1, "pi", "pi-chart-bar"], [1, "status-grid"], [1, "workspace-grid"], [1, "workspace-card"], [1, "workspace-card__header"], [1, "workspace-pill"], [1, "workspace-steps"], [1, "workspace-count"], ["class", "empty-inline", 4, "ngIf"], ["class", "chip-list", 4, "ngIf"], [1, "catalog-panel"], [1, "catalog-panel__header"], ["target", "_blank", "rel", "noopener", 1, "inline-link", 3, "href"], ["class", "loading-state compact", 4, "ngIf"], ["class", "catalog-empty", 4, "ngIf"], ["class", "catalog-table", 4, "ngIf"], [1, "empty-inline"], [1, "chip-list"], [4, "ngFor", "ngForOf"], [1, "loading-state", "compact"], [1, "catalog-empty"], [1, "catalog-table"], [1, "catalog-row", "catalog-row--head"], ["class", "catalog-row", 4, "ngFor", "ngForOf"], [1, "catalog-row"], [1, "report-name"], ["routerLink", "/app/reports", 1, "btn", "btn-primary"], [1, "pi", "pi-arrow-left"]], template: function ReportDesignerPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "header", 2);
            i0.ɵɵelement(2, "app-breadcrumbs");
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "h1", 5)(6, "span", 6);
            i0.ɵɵtext(7, "Report");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 7);
            i0.ɵɵtext(9, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, ReportDesignerPage_p_10_Template, 2, 0, "p", 8)(11, ReportDesignerPage_p_11_Template, 2, 0, "p", 8)(12, ReportDesignerPage_p_12_Template, 2, 0, "p", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(13, ReportDesignerPage_div_13_Template, 29, 5, "div", 9)(14, ReportDesignerPage_div_14_Template, 86, 11, "div", 9)(15, ReportDesignerPage_div_15_Template, 8, 0, "div", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.isEmbeddedMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isReportServerMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isUnavailableMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEmbeddedMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isReportServerMode() && ctx.reportServerConfig());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isUnavailableMode());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, BreadcrumbsComponent, RouterLink, i1.DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: $space-4;\n}\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  flex-wrap: wrap;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.designer-section[_ngcontent-%COMP%] {\n  position: relative;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  min-height: calc(100vh - 200px);\n  overflow: hidden;\n}\n\n.embedded-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.6fr 1fr;\n  gap: $space-4;\n  padding: $space-5;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.14);\n  background:\n    radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 42%),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(255, 255, 255, 0.7));\n\n  @media (max-width: 960px) {\n    grid-template-columns: 1fr;\n    padding: $space-4;\n  }\n}\n\n.embedded-copy[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  align-items: flex-start;\n\n  h2 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-2xl;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 760px;\n    color: $gray-600;\n    line-height: 1.65;\n  }\n}\n\n.embedded-meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.redirect-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 64px;\n  border-radius: $radius-xl;\n  background: $primary-gradient;\n  color: white;\n  font-size: 1.75rem;\n  box-shadow: 0 14px 30px rgba(59, 130, 246, 0.24);\n}\n\n.embedded-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #2563eb, #06b6d4);\n}\n\n.legacy-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin: $space-4;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  background: rgba(245, 158, 11, 0.12);\n  border: 1px solid rgba(245, 158, 11, 0.24);\n  color: #92400e;\n\n  i {\n    font-size: 1.125rem;\n    margin-top: 2px;\n  }\n\n  strong {\n    display: block;\n    margin-bottom: $space-1;\n  }\n\n  p {\n    margin: 0;\n    line-height: 1.5;\n  }\n}\n\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-4;\n  height: 400px;\n  color: $gray-500;\n  font-size: $font-size-lg;\n\n  i {\n    font-size: 3rem;\n  }\n}\n\n.error-state[_ngcontent-%COMP%] {\n  color: $danger;\n\n  i {\n    color: $danger;\n  }\n}\n\n.designer-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: calc(100vh - 200px);\n  min-height: 600px;\n  background: rgba(255, 255, 255, 0.84);\n  border: 0;\n\n  &.hidden {\n    display: none;\n  }\n}\n\n.designer-loading-shell[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n  text-decoration: none;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.report-server-redirect[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-4;\n  padding: $space-8 $space-4;\n  text-align: center;\n  min-height: 400px;\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 420px;\n    font-size: $font-size-base;\n    color: $gray-500;\n    line-height: 1.6;\n  }\n\n  .back-link {\n    margin-top: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-decoration: none;\n\n    &:hover {\n      color: $gray-700;\n    }\n  }\n}\n\n.report-server-shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n  padding: $space-5;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.report-server-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background:\n    linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(16, 185, 129, 0.08)),\n    rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(102, 126, 234, 0.12);\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.report-server-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n\n  h2 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-2xl;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 680px;\n    color: $gray-500;\n    line-height: 1.6;\n  }\n}\n\n.report-server-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  color: $gray-700;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  text-decoration: none;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.status-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.status-card[_ngcontent-%COMP%] {\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n\n  strong {\n    display: block;\n    margin-top: $space-1;\n    font-size: $font-size-xl;\n    color: $gray-800;\n    line-height: 1.3;\n    word-break: break-word;\n  }\n\n  p {\n    margin: $space-2 0 0;\n    color: $gray-500;\n    line-height: 1.5;\n    font-size: $font-size-sm;\n  }\n}\n\n.status-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $gray-500;\n  font-weight: 700;\n}\n\n.workspace-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.workspace-card[_ngcontent-%COMP%], \n.catalog-panel[_ngcontent-%COMP%] {\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n}\n\n.workspace-card__header[_ngcontent-%COMP%], \n.catalog-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  margin-bottom: $space-3;\n\n  h3 {\n    margin: 0;\n    color: $gray-800;\n    font-size: $font-size-lg;\n  }\n}\n\n.workspace-pill[_ngcontent-%COMP%], \n.workspace-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 2.25rem;\n  padding: 0.35rem 0.65rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.12);\n  color: #4f46e5;\n  font-size: $font-size-xs;\n  font-weight: 700;\n}\n\n.workspace-steps[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.1rem;\n  color: $gray-700;\n  line-height: 1.7;\n}\n\n.chip-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n\n  li {\n    padding: 0.45rem 0.8rem;\n    border-radius: 999px;\n    background: rgba(15, 23, 42, 0.05);\n    color: $gray-700;\n    font-size: $font-size-sm;\n    font-weight: 600;\n  }\n}\n\n.empty-inline[_ngcontent-%COMP%] {\n  color: $gray-500;\n  font-size: $font-size-sm;\n}\n\n.catalog-panel__header[_ngcontent-%COMP%] {\n  p {\n    margin: $space-1 0 0;\n    color: $gray-500;\n    font-size: $font-size-sm;\n  }\n}\n\n.inline-link[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-weight: 700;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n}\n\n.catalog-empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4 0;\n  color: $gray-500;\n\n  i {\n    font-size: 1.5rem;\n    color: #4f46e5;\n  }\n\n  strong {\n    display: block;\n    color: $gray-800;\n    margin-bottom: 0.25rem;\n  }\n\n  p {\n    margin: 0;\n  }\n}\n\n.catalog-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: $radius-lg;\n  overflow: hidden;\n}\n\n.catalog-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1.2fr 0.8fr 0.9fr;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.catalog-row--head[_ngcontent-%COMP%] {\n  background: rgba(102, 126, 234, 0.08);\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-weight: 700;\n  color: $gray-500;\n}\n\n.report-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.compact[_ngcontent-%COMP%] {\n  height: auto;\n  padding: $space-4 0;\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportDesignerPage, [{
        type: Component,
        args: [{ selector: 'app-report-designer-page', standalone: true, imports: [CommonModule, BreadcrumbsComponent, RouterLink], template: "<section class=\"page-container\">\n  <header class=\"page-header\">\n    <app-breadcrumbs />\n    <div class=\"header-row\">\n      <div class=\"header-content\">\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Report</span>\n          <span class=\"title-light\">Workspace</span>\n        </h1>\n        <p class=\"hero-subtitle\" *ngIf=\"isEmbeddedMode()\">\n          Build Telerik reports directly inside CRM. Tenant admins and provider-side developers can design, save, and refine reports without Report Server.\n        </p>\n        <p class=\"hero-subtitle\" *ngIf=\"isReportServerMode()\">\n          Manage reports through the external Telerik Report Server workspace.\n        </p>\n        <p class=\"hero-subtitle\" *ngIf=\"isUnavailableMode()\">\n          Reporting workspace configuration is unavailable in this environment.\n        </p>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"designer-section\" *ngIf=\"isEmbeddedMode()\">\n    <section class=\"embedded-hero\">\n      <div class=\"embedded-copy\">\n        <div class=\"redirect-icon embedded-icon\">\n          <i class=\"pi pi-palette\"></i>\n        </div>\n        <div>\n          <h2>Built-In Telerik Designer</h2>\n          <p>\n            This workspace uses the CRM-hosted Telerik Web Report Designer and local report definition storage. Report Server stays optional for later publishing and centralized governance.\n          </p>\n        </div>\n      </div>\n\n      <div class=\"embedded-meta\">\n        <article class=\"status-card\">\n          <span class=\"status-label\">Mode</span>\n          <strong>Embedded Designer</strong>\n          <p>Runs inside CRM using the API-hosted Telerik designer service.</p>\n        </article>\n        <article class=\"status-card\">\n          <span class=\"status-label\">Storage</span>\n          <strong>API File Storage</strong>\n          <p>Definitions, resources, shared data sources, and settings are stored by the CRM API.</p>\n        </article>\n      </div>\n    </section>\n\n    <div class=\"designer-loading-shell\" *ngIf=\"loading()\">\n      <div class=\"loading-state\">\n        <i class=\"pi pi-spin pi-spinner\"></i>\n        <span>Loading Telerik Report Designer...</span>\n      </div>\n    </div>\n\n    <div class=\"designer-loading-shell\" *ngIf=\"error(); let errorMessage\">\n      <div class=\"error-state\">\n        <i class=\"pi pi-exclamation-triangle\"></i>\n        <span>{{ errorMessage }}</span>\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"retry()\">\n          <i class=\"pi pi-refresh\"></i>\n          Retry\n        </button>\n      </div>\n    </div>\n\n    <iframe\n      #designerFrame\n      class=\"designer-container\"\n      [class.hidden]=\"loading() || !!error()\"\n      [src]=\"designerFrameUrl()\"\n      title=\"Telerik Report Designer\"\n      (load)=\"onDesignerFrameLoad()\">\n    </iframe>\n  </div>\n\n  <div class=\"designer-section\" *ngIf=\"isReportServerMode() && reportServerConfig(); let cfg\">\n    <div class=\"report-server-shell\">\n      <section class=\"report-server-hero\">\n        <div class=\"report-server-copy\">\n          <div class=\"redirect-icon\">\n            <i class=\"pi pi-server\"></i>\n          </div>\n          <div>\n            <h2>Report Server Workspace</h2>\n            <p>Use Report Server to design, publish, organize, and reopen reports without changing application code.</p>\n          </div>\n        </div>\n\n        <div class=\"report-server-actions\">\n          <a class=\"btn btn-primary\" [href]=\"cfg.designerUrl\" target=\"_blank\" rel=\"noopener\">\n            <i class=\"pi pi-external-link\"></i>\n            Open Report Server\n          </a>\n          <button class=\"btn btn-secondary\" type=\"button\" (click)=\"openReportServerViewer()\">\n            <i class=\"pi pi-folder-open\"></i>\n            Open Catalog\n          </button>\n          <a class=\"btn btn-secondary\" routerLink=\"/app/reports\">\n            <i class=\"pi pi-chart-bar\"></i>\n            Back to Reports\n          </a>\n        </div>\n      </section>\n\n      <section class=\"status-grid\">\n        <article class=\"status-card\">\n          <span class=\"status-label\">Mode</span>\n          <strong>Report Server</strong>\n          <p>Viewer and designer are sourced from the external report platform.</p>\n        </article>\n\n        <article class=\"status-card\">\n          <span class=\"status-label\">Server URL</span>\n          <strong>{{ cfg.reportServerUrl }}</strong>\n          <p>Base Report Server address configured for this environment.</p>\n        </article>\n\n        <article class=\"status-card\">\n          <span class=\"status-label\">Catalog</span>\n          <strong>{{ reportServerCatalog().length }}</strong>\n          <p>Published CRM reports currently available from the server catalog.</p>\n        </article>\n\n        <article class=\"status-card\">\n          <span class=\"status-label\">Categories</span>\n          <strong>{{ reportServerCategories().length }}</strong>\n          <p>CRM report folders returned by the server API.</p>\n        </article>\n      </section>\n\n      <section class=\"workspace-grid\">\n        <article class=\"workspace-card\">\n          <div class=\"workspace-card__header\">\n            <h3>Quick Start</h3>\n            <span class=\"workspace-pill\">Later Option</span>\n          </div>\n          <ol class=\"workspace-steps\">\n            <li>Open the external Telerik Report Server workspace.</li>\n            <li>Create or import a `.trdp` report.</li>\n            <li>Save and publish the report to the catalog.</li>\n            <li>Return to the Reports page to run it inside CRM.</li>\n          </ol>\n        </article>\n\n        <article class=\"workspace-card\">\n          <div class=\"workspace-card__header\">\n            <h3>Categories</h3>\n            <span class=\"workspace-count\">{{ reportServerCategories().length }}</span>\n          </div>\n          <div class=\"empty-inline\" *ngIf=\"!reportServerCategories().length && !reportServerLoading()\">No categories returned yet.</div>\n          <ul class=\"chip-list\" *ngIf=\"reportServerCategories().length\">\n            <li *ngFor=\"let category of reportServerCategories()\">{{ category.name }}</li>\n          </ul>\n        </article>\n      </section>\n\n      <section class=\"catalog-panel\">\n        <div class=\"catalog-panel__header\">\n          <div>\n            <h3>Published Reports</h3>\n            <p>Reports currently available from the Report Server catalog.</p>\n          </div>\n          <a class=\"inline-link\" [href]=\"cfg.designerUrl\" target=\"_blank\" rel=\"noopener\">Manage in Report Server</a>\n        </div>\n\n        <div class=\"loading-state compact\" *ngIf=\"reportServerLoading()\">\n          <i class=\"pi pi-spin pi-spinner\"></i>\n          <span>Loading Report Server workspace...</span>\n        </div>\n\n        <div class=\"catalog-empty\" *ngIf=\"!reportServerLoading() && !reportServerCatalog().length\">\n          <i class=\"pi pi-folder-open\"></i>\n          <div>\n            <strong>No published reports found</strong>\n            <p>Create or publish reports in Report Server, then they will appear here.</p>\n          </div>\n        </div>\n\n        <div class=\"catalog-table\" *ngIf=\"!reportServerLoading() && reportServerCatalog().length\">\n          <div class=\"catalog-row catalog-row--head\">\n            <span>Name</span>\n            <span>Category</span>\n            <span>Format</span>\n            <span>Updated</span>\n          </div>\n          <div class=\"catalog-row\" *ngFor=\"let report of reportServerCatalog()\">\n            <span class=\"report-name\">{{ report.name }}</span>\n            <span>{{ report.categoryName || 'Uncategorized' }}</span>\n            <span>{{ report.extension }}</span>\n            <span>{{ report.modifiedOn | date: 'mediumDate' }}</span>\n          </div>\n        </div>\n      </section>\n    </div>\n  </div>\n\n  <div class=\"designer-section\" *ngIf=\"isUnavailableMode()\">\n    <div class=\"error-state\">\n      <i class=\"pi pi-server\"></i>\n      <span>Report workspace is not configured for this environment.</span>\n      <a class=\"btn btn-primary\" routerLink=\"/app/reports\">\n        <i class=\"pi pi-arrow-left\"></i>\n        Back to Reports\n      </a>\n    </div>\n  </div>\n</section>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.page-header {\n  margin-bottom: $space-4;\n}\n\n.header-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  flex-wrap: wrap;\n}\n\n.header-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-subtitle {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.designer-section {\n  position: relative;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  min-height: calc(100vh - 200px);\n  overflow: hidden;\n}\n\n.embedded-hero {\n  display: grid;\n  grid-template-columns: 1.6fr 1fr;\n  gap: $space-4;\n  padding: $space-5;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.14);\n  background:\n    radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 42%),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(255, 255, 255, 0.7));\n\n  @media (max-width: 960px) {\n    grid-template-columns: 1fr;\n    padding: $space-4;\n  }\n}\n\n.embedded-copy {\n  display: flex;\n  gap: $space-4;\n  align-items: flex-start;\n\n  h2 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-2xl;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 760px;\n    color: $gray-600;\n    line-height: 1.65;\n  }\n}\n\n.embedded-meta {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.redirect-icon {\n  width: 64px;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 64px;\n  border-radius: $radius-xl;\n  background: $primary-gradient;\n  color: white;\n  font-size: 1.75rem;\n  box-shadow: 0 14px 30px rgba(59, 130, 246, 0.24);\n}\n\n.embedded-icon {\n  background: linear-gradient(135deg, #2563eb, #06b6d4);\n}\n\n.legacy-banner {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin: $space-4;\n  padding: $space-3 $space-4;\n  border-radius: $radius-lg;\n  background: rgba(245, 158, 11, 0.12);\n  border: 1px solid rgba(245, 158, 11, 0.24);\n  color: #92400e;\n\n  i {\n    font-size: 1.125rem;\n    margin-top: 2px;\n  }\n\n  strong {\n    display: block;\n    margin-bottom: $space-1;\n  }\n\n  p {\n    margin: 0;\n    line-height: 1.5;\n  }\n}\n\n.loading-state,\n.error-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-4;\n  height: 400px;\n  color: $gray-500;\n  font-size: $font-size-lg;\n\n  i {\n    font-size: 3rem;\n  }\n}\n\n.error-state {\n  color: $danger;\n\n  i {\n    color: $danger;\n  }\n}\n\n.designer-container {\n  width: 100%;\n  height: calc(100vh - 200px);\n  min-height: 600px;\n  background: rgba(255, 255, 255, 0.84);\n  border: 0;\n\n  &.hidden {\n    display: none;\n  }\n}\n\n.designer-loading-shell {\n  padding: $space-4;\n}\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n}\n\n.btn-primary {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n  text-decoration: none;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.report-server-redirect {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-4;\n  padding: $space-8 $space-4;\n  text-align: center;\n  min-height: 400px;\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 420px;\n    font-size: $font-size-base;\n    color: $gray-500;\n    line-height: 1.6;\n  }\n\n  .back-link {\n    margin-top: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-decoration: none;\n\n    &:hover {\n      color: $gray-700;\n    }\n  }\n}\n\n.report-server-shell {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n  padding: $space-5;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.report-server-hero {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background:\n    linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(16, 185, 129, 0.08)),\n    rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(102, 126, 234, 0.12);\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.report-server-copy {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n\n  h2 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-2xl;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    max-width: 680px;\n    color: $gray-500;\n    line-height: 1.6;\n  }\n}\n\n.report-server-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  color: $gray-700;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  text-decoration: none;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n}\n\n.status-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: $space-3;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.status-card {\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n\n  strong {\n    display: block;\n    margin-top: $space-1;\n    font-size: $font-size-xl;\n    color: $gray-800;\n    line-height: 1.3;\n    word-break: break-word;\n  }\n\n  p {\n    margin: $space-2 0 0;\n    color: $gray-500;\n    line-height: 1.5;\n    font-size: $font-size-sm;\n  }\n}\n\n.status-label {\n  display: inline-block;\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: $gray-500;\n  font-weight: 700;\n}\n\n.workspace-grid {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.workspace-card,\n.catalog-panel {\n  padding: $space-4;\n  border-radius: $radius-xl;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n}\n\n.workspace-card__header,\n.catalog-panel__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  margin-bottom: $space-3;\n\n  h3 {\n    margin: 0;\n    color: $gray-800;\n    font-size: $font-size-lg;\n  }\n}\n\n.workspace-pill,\n.workspace-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 2.25rem;\n  padding: 0.35rem 0.65rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.12);\n  color: #4f46e5;\n  font-size: $font-size-xs;\n  font-weight: 700;\n}\n\n.workspace-steps {\n  margin: 0;\n  padding-left: 1.1rem;\n  color: $gray-700;\n  line-height: 1.7;\n}\n\n.chip-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n\n  li {\n    padding: 0.45rem 0.8rem;\n    border-radius: 999px;\n    background: rgba(15, 23, 42, 0.05);\n    color: $gray-700;\n    font-size: $font-size-sm;\n    font-weight: 600;\n  }\n}\n\n.empty-inline {\n  color: $gray-500;\n  font-size: $font-size-sm;\n}\n\n.catalog-panel__header {\n  p {\n    margin: $space-1 0 0;\n    color: $gray-500;\n    font-size: $font-size-sm;\n  }\n}\n\n.inline-link {\n  color: #4f46e5;\n  font-weight: 700;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n}\n\n.catalog-empty {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4 0;\n  color: $gray-500;\n\n  i {\n    font-size: 1.5rem;\n    color: #4f46e5;\n  }\n\n  strong {\n    display: block;\n    color: $gray-800;\n    margin-bottom: 0.25rem;\n  }\n\n  p {\n    margin: 0;\n  }\n}\n\n.catalog-table {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  border-radius: $radius-lg;\n  overflow: hidden;\n}\n\n.catalog-row {\n  display: grid;\n  grid-template-columns: 2fr 1.2fr 0.8fr 0.9fr;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.9);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.catalog-row--head {\n  background: rgba(102, 126, 234, 0.08);\n  font-size: $font-size-xs;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-weight: 700;\n  color: $gray-500;\n}\n\n.report-name {\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.compact {\n  height: auto;\n  padding: $space-4 0;\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n"] }]
    }], () => [], { designerFrame: [{
            type: ViewChild,
            args: ['designerFrame', { static: false }]
        }], onMessage: [{
            type: HostListener,
            args: ['window:message', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportDesignerPage, { className: "ReportDesignerPage", filePath: "src/app/crm/features/reports/pages/report-designer.page.ts", lineNumber: 28 }); })();
