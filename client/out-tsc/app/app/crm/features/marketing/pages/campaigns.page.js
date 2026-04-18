import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/api";
import * as i4 from "primeng/select";
import * as i5 from "primeng/table";
function CampaignsPage_div_140_ng_template_2_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 90);
    i0.ɵɵlistener("onChange", function CampaignsPage_div_140_ng_template_2_ng_template_9_Template_p_select_onChange_0_listener($event) { const filter_r3 = i0.ɵɵrestoreView(_r2).filterCallback; return i0.ɵɵresetView(filter_r3($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("options", ctx_r4.statusFilterOptions)("ngModel", value_r4)("showClear", true);
} }
function CampaignsPage_div_140_ng_template_2_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 91);
    i0.ɵɵlistener("onChange", function CampaignsPage_div_140_ng_template_2_ng_template_14_Template_p_select_onChange_0_listener($event) { const filter_r7 = i0.ɵɵrestoreView(_r6).filterCallback; return i0.ɵɵresetView(filter_r7($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r8 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("options", ctx_r4.channelFilterOptions)("ngModel", value_r8)("showClear", true);
} }
function CampaignsPage_div_140_ng_template_2_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 92);
    i0.ɵɵlistener("onChange", function CampaignsPage_div_140_ng_template_2_ng_template_19_Template_p_select_onChange_0_listener($event) { const filter_r10 = i0.ɵɵrestoreView(_r9).filterCallback; return i0.ɵɵresetView(filter_r10($event.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r11 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("options", ctx_r4.ownerFilterOptions())("ngModel", value_r11)("showClear", true);
} }
function CampaignsPage_div_140_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 73);
    i0.ɵɵtext(2, " Name ");
    i0.ɵɵelement(3, "p-sortIcon", 74)(4, "p-columnFilter", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 76);
    i0.ɵɵtext(6, " Status ");
    i0.ɵɵelement(7, "p-sortIcon", 77);
    i0.ɵɵelementStart(8, "p-columnFilter", 78);
    i0.ɵɵtemplate(9, CampaignsPage_div_140_ng_template_2_ng_template_9_Template, 1, 3, "ng-template", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "th", 80);
    i0.ɵɵtext(11, " Channel ");
    i0.ɵɵelement(12, "p-sortIcon", 81);
    i0.ɵɵelementStart(13, "p-columnFilter", 82);
    i0.ɵɵtemplate(14, CampaignsPage_div_140_ng_template_2_ng_template_14_Template, 1, 3, "ng-template", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "th", 83);
    i0.ɵɵtext(16, " Owner ");
    i0.ɵɵelement(17, "p-sortIcon", 84);
    i0.ɵɵelementStart(18, "p-columnFilter", 85);
    i0.ɵɵtemplate(19, CampaignsPage_div_140_ng_template_2_ng_template_19_Template, 1, 3, "ng-template", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "th", 86);
    i0.ɵɵtext(21, " Planned ");
    i0.ɵɵelement(22, "p-sortIcon", 87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 88);
    i0.ɵɵtext(24, " Actual ");
    i0.ɵɵelement(25, "p-sortIcon", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "th");
    i0.ɵɵtext(27, "Dates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "th");
    i0.ɵɵtext(29, "Actions");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("showOperator", false)("showAddButton", false)("showMatchModes", false)("showApplyButton", false);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("showOperator", false)("showAddButton", false)("showMatchModes", false)("showApplyButton", false);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("showOperator", false)("showAddButton", false)("showMatchModes", false)("showApplyButton", false);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("showOperator", false)("showAddButton", false)("showMatchModes", false)("showApplyButton", false);
} }
function CampaignsPage_div_140_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 93);
    i0.ɵɵlistener("click", function CampaignsPage_div_140_ng_template_3_Template_tr_click_0_listener($event) { const campaign_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.onRowClick(campaign_r13, $event)); });
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
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
    i0.ɵɵpipe(15, "date");
    i0.ɵɵpipe(16, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td")(18, "div", 94)(19, "button", 95);
    i0.ɵɵlistener("click", function CampaignsPage_div_140_ng_template_3_Template_button_click_19_listener($event) { const campaign_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r4.openCampaign(campaign_r13)); });
    i0.ɵɵelement(20, "i", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 97);
    i0.ɵɵlistener("click", function CampaignsPage_div_140_ng_template_3_Template_button_click_21_listener($event) { const campaign_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r4.editCampaign(campaign_r13)); });
    i0.ɵɵelement(22, "i", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 99);
    i0.ɵɵlistener("click", function CampaignsPage_div_140_ng_template_3_Template_button_click_23_listener($event) { const campaign_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r4.archiveCampaign(campaign_r13)); });
    i0.ɵɵelement(24, "i", 100);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const campaign_r13 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(campaign_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(campaign_r13.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(campaign_r13.channel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(campaign_r13.ownerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.formatMoney(campaign_r13.budgetPlanned));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r4.formatMoney(campaign_r13.budgetActual));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", campaign_r13.startDateUtc ? i0.ɵɵpipeBind2(15, 10, campaign_r13.startDateUtc, "mediumDate") : "\u2014", " - ", campaign_r13.endDateUtc ? i0.ɵɵpipeBind2(16, 13, campaign_r13.endDateUtc, "mediumDate") : "\u2014");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r4.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r4.canManage() || campaign_r13.status === "Archived");
} }
function CampaignsPage_div_140_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 101);
    i0.ɵɵtext(2, "No campaigns found.");
    i0.ɵɵelementEnd()();
} }
function CampaignsPage_div_140_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68)(1, "p-table", 69);
    i0.ɵɵtemplate(2, CampaignsPage_div_140_ng_template_2_Template, 30, 16, "ng-template", 70)(3, CampaignsPage_div_140_ng_template_3_Template, 25, 16, "ng-template", 71)(4, CampaignsPage_div_140_ng_template_4_Template, 3, 0, "ng-template", 72);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r4.campaigns())("rowHover", true)("paginator", true)("rows", 10)("rowsPerPageOptions", ctx_r4.rowsPerPageOptions)("showCurrentPageReport", true);
} }
function CampaignsPage_ng_template_141_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102);
    i0.ɵɵtext(1, "Loading campaigns...");
    i0.ɵɵelementEnd();
} }
export class CampaignsPage {
    rowsPerPageOptions = [10, 20, 50];
    statusFilterOptions = [
        { label: 'Draft', value: 'Draft' },
        { label: 'Planned', value: 'Planned' },
        { label: 'Active', value: 'Active' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Archived', value: 'Archived' }
    ];
    channelFilterOptions = [
        { label: 'Email', value: 'Email' },
        { label: 'Events', value: 'Events' },
        { label: 'Web', value: 'Web' },
        { label: 'Social', value: 'Social' },
        { label: 'Mixed', value: 'Mixed' }
    ];
    campaigns = signal([], ...(ngDevMode ? [{ debugName: "campaigns" }] : []));
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    ownerFilterOptions = computed(() => Array.from(new Map(this.campaigns()
        .filter((campaign) => !!campaign.ownerName?.trim())
        .map((campaign) => [campaign.ownerName.trim(), { label: campaign.ownerName.trim(), value: campaign.ownerName.trim() }])).values()).sort((a, b) => a.label.localeCompare(b.label)), ...(ngDevMode ? [{ debugName: "ownerFilterOptions" }] : []));
    kpis = computed(() => {
        const rows = this.campaigns();
        return {
            total: rows.length,
            active: rows.filter((row) => row.status === 'Active').length,
            plannedBudget: rows.reduce((sum, row) => sum + (row.budgetPlanned ?? 0), 0),
            actualBudget: rows.reduce((sum, row) => sum + (row.budgetActual ?? 0), 0)
        };
    }, ...(ngDevMode ? [{ debugName: "kpis" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    canManage = computed(() => tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.marketingManage), ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    data = inject(MarketingDataService);
    router = inject(Router);
    toast = inject(AppToastService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    constructor() {
        this.loadCurrencyContext();
        this.load();
    }
    load() {
        this.loading.set(true);
        this.data.searchCampaigns({ page: 1, pageSize: 200 }).subscribe({
            next: (res) => {
                this.campaigns.set(res.items);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Failed to load campaigns.');
            }
        });
    }
    createCampaign() {
        this.router.navigate(['/app/marketing/campaigns/new']);
    }
    openAttribution() {
        this.router.navigate(['/app/marketing/attribution']);
    }
    openSettings() {
        this.router.navigate(['/app/settings/marketing']);
    }
    openCampaign(campaign) {
        this.router.navigate(['/app/marketing/campaigns', campaign.id]);
    }
    onRowClick(campaign, event) {
        if (this.isInteractiveRowTarget(event)) {
            return;
        }
        this.openCampaign(campaign);
    }
    isInteractiveRowTarget(event) {
        const target = event.target;
        if (!target) {
            return false;
        }
        return !!target.closest('button, a, input, textarea, select, .p-button, .p-checkbox, .p-inputswitch, .p-rating, .p-dropdown, .p-select');
    }
    editCampaign(campaign) {
        this.router.navigate(['/app/marketing/campaigns', campaign.id, 'edit']);
    }
    archiveCampaign(campaign) {
        if (!this.canManage()) {
            return;
        }
        this.data.archiveCampaign(campaign.id).subscribe({
            next: () => {
                this.toast.show('success', 'Campaign archived.');
                this.load();
            },
            error: () => this.toast.show('error', 'Unable to archive campaign.')
        });
    }
    resolveCurrencyCode() {
        return this.currencyCode() || this.currencyFallback || 'USD';
    }
    formatMoney(value) {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: this.resolveCurrencyCode(),
            maximumFractionDigits: 0
        }).format(value ?? 0);
    }
    loadCurrencyContext() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            if (!this.currencyCode() && this.currencyFallback) {
                this.currencyCode.set(this.currencyFallback);
            }
        });
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                const resolved = settings.currency || this.currencyFallback;
                if (resolved) {
                    this.currencyCode.set(resolved);
                }
            }
        });
    }
    static ɵfac = function CampaignsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignsPage, selectors: [["app-campaigns-page"]], decls: 143, vars: 17, consts: [["loadingTpl", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "page-container", "marketing-campaigns-page"], [1, "page-content"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "hero-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", 1, "action-btn", "action-btn--attribution", 3, "click"], [1, "pi", "pi-percentage"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "pi", "pi-cog"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-megaphone"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-chart-line"], [1, "metrics-dashboard"], [1, "metrics-grid"], [1, "metric-card", "metric-card--campaigns"], [1, "metric-header"], [1, "metric-icon", "primary"], [1, "pi", "pi-briefcase"], [1, "metric-trend", "up"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--active"], [1, "metric-icon", "success"], [1, "pi", "pi-play-circle"], [1, "pi", "pi-bolt"], [1, "metric-card", "metric-card--planned"], [1, "metric-icon", "info"], [1, "pi", "pi-wallet"], [1, "metric-trend"], [1, "pi", "pi-calendar"], [1, "metric-card", "metric-card--actual"], [1, "metric-icon", "warning"], [1, "pi", "pi-money-bill"], [1, "pi", "pi-chart-bar"], [1, "data-card", "no-hover"], [1, "data-card-header"], [1, "section-title"], [1, "data-card-subtitle"], ["class", "table-wrap", 4, "ngIf", "ngIfElse"], [1, "table-wrap"], ["styleClass", "crm-table", "sortMode", "multiple", "currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} campaigns", 3, "value", "rowHover", "paginator", "rows", "rowsPerPageOptions", "showCurrentPageReport"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["pSortableColumn", "name"], ["field", "name"], ["type", "text", "field", "name", "display", "menu", 3, "showOperator", "showAddButton", "showMatchModes", "showApplyButton"], ["pSortableColumn", "status"], ["field", "status"], ["field", "status", "matchMode", "equals", "display", "menu", 3, "showOperator", "showAddButton", "showMatchModes", "showApplyButton"], ["pTemplate", "filter"], ["pSortableColumn", "channel"], ["field", "channel"], ["field", "channel", "matchMode", "equals", "display", "menu", 3, "showOperator", "showAddButton", "showMatchModes", "showApplyButton"], ["pSortableColumn", "ownerName"], ["field", "ownerName"], ["field", "ownerName", "matchMode", "equals", "display", "menu", 3, "showOperator", "showAddButton", "showMatchModes", "showApplyButton"], ["pSortableColumn", "budgetPlanned"], ["field", "budgetPlanned"], ["pSortableColumn", "budgetActual"], ["field", "budgetActual"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All statuses", "styleClass", "column-menu-filter", 3, "onChange", "options", "ngModel", "showClear"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All channels", "styleClass", "column-menu-filter", 3, "onChange", "options", "ngModel", "showClear"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All owners", "styleClass", "column-menu-filter", 3, "onChange", "options", "ngModel", "showClear"], [3, "click"], [1, "row-actions"], ["type", "button", "title", "View", 1, "row-action-btn", "row-action-btn--view", 3, "click"], [1, "pi", "pi-eye"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Archive", 1, "row-action-btn", "row-action-btn--archive", 3, "click", "disabled"], [1, "pi", "pi-archive"], ["colspan", "8", 1, "empty"], [1, "loading"]], template: function CampaignsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 6)(6, "div", 7);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "section", 8)(9, "div", 9)(10, "div", 10);
            i0.ɵɵelement(11, "span", 11);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Marketing Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 12)(15, "span", 13);
            i0.ɵɵtext(16, "Campaign");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 14);
            i0.ɵɵtext(18, "Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "p", 15);
            i0.ɵɵtext(20, " Plan campaigns, manage audience members, and track first-touch impact on pipeline. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 16)(22, "div", 17)(23, "div", 18);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 19);
            i0.ɵɵtext(26, "Campaigns");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 17)(28, "div", 18);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 19);
            i0.ɵɵtext(31, "Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 17)(33, "div", 18);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 19);
            i0.ɵɵtext(36, "Planned Budget");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 17)(38, "div", 18);
            i0.ɵɵtext(39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 19);
            i0.ɵɵtext(41, "Actual Budget");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(42, "div", 20)(43, "button", 21);
            i0.ɵɵlistener("click", function CampaignsPage_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.createCampaign()); });
            i0.ɵɵelementStart(44, "span", 22);
            i0.ɵɵelement(45, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "span");
            i0.ɵɵtext(47, "New Campaign");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "button", 24);
            i0.ɵɵlistener("click", function CampaignsPage_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openAttribution()); });
            i0.ɵɵelementStart(49, "span", 22);
            i0.ɵɵelement(50, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "span");
            i0.ɵɵtext(52, "Attribution");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "button", 26);
            i0.ɵɵlistener("click", function CampaignsPage_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openSettings()); });
            i0.ɵɵelementStart(54, "span", 22);
            i0.ɵɵelement(55, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span");
            i0.ɵɵtext(57, "Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "button", 28);
            i0.ɵɵlistener("click", function CampaignsPage_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementStart(59, "span", 22);
            i0.ɵɵelement(60, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "span");
            i0.ɵɵtext(62, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(63, "div", 30)(64, "div", 31)(65, "div", 32);
            i0.ɵɵelement(66, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 34)(68, "span", 35);
            i0.ɵɵtext(69, "Campaign Records");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "strong", 36);
            i0.ɵɵtext(71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "span", 37);
            i0.ɵɵtext(73, "Total active + archived");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(74, "div", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 39)(76, "div", 32);
            i0.ɵɵelement(77, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "div", 34)(79, "span", 35);
            i0.ɵɵtext(80, "Active Ratio");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "strong", 36);
            i0.ɵɵtext(82);
            i0.ɵɵpipe(83, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "span", 37);
            i0.ɵɵtext(85, "Currently running");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(86, "div", 38);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(87, "section", 41)(88, "div", 42)(89, "article", 43)(90, "div", 44)(91, "div", 45);
            i0.ɵɵelement(92, "i", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "span", 47);
            i0.ɵɵelement(94, "i", 40);
            i0.ɵɵtext(95, " Total");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(96, "span", 48);
            i0.ɵɵtext(97, "Campaigns");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "strong", 49);
            i0.ɵɵtext(99);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "article", 50)(101, "div", 44)(102, "div", 51);
            i0.ɵɵelement(103, "i", 52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "span", 47);
            i0.ɵɵelement(105, "i", 53);
            i0.ɵɵtext(106, " Live");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "span", 48);
            i0.ɵɵtext(108, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "strong", 49);
            i0.ɵɵtext(110);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(111, "article", 54)(112, "div", 44)(113, "div", 55);
            i0.ɵɵelement(114, "i", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "span", 57);
            i0.ɵɵelement(116, "i", 58);
            i0.ɵɵtext(117, " Forecast");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(118, "span", 48);
            i0.ɵɵtext(119, "Planned");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "strong", 49);
            i0.ɵɵtext(121);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "article", 59)(123, "div", 44)(124, "div", 60);
            i0.ɵɵelement(125, "i", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "span", 57);
            i0.ɵɵelement(127, "i", 62);
            i0.ɵɵtext(128, " Spent");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(129, "span", 48);
            i0.ɵɵtext(130, "Actual");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "strong", 49);
            i0.ɵɵtext(132);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(133, "section", 63)(134, "header", 64)(135, "div")(136, "h2", 65);
            i0.ɵɵtext(137, "Campaign Records");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(138, "p", 66);
            i0.ɵɵtext(139);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(140, CampaignsPage_div_140_Template, 5, 6, "div", 67);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(141, CampaignsPage_ng_template_141_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const loadingTpl_r14 = i0.ɵɵreference(142);
            i0.ɵɵadvance(24);
            i0.ɵɵtextInterpolate(ctx.kpis().total);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.kpis().active);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.kpis().plannedBudget));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.kpis().actualBudget));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(28);
            i0.ɵɵtextInterpolate(ctx.kpis().total);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.kpis().total ? i0.ɵɵpipeBind2(83, 14, ctx.kpis().active / ctx.kpis().total * 100, "1.0-0") : 0, "%");
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate(ctx.kpis().total);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.kpis().active);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.kpis().plannedBudget));
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.kpis().actualBudget));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.campaigns().length, " records");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingTpl_r14);
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.PrimeTemplate, SelectModule, i4.Select, TableModule, i5.Table, i5.SortableColumn, i5.SortIcon, i5.ColumnFilter, BreadcrumbsComponent, i1.DecimalPipe, i1.DatePipe], styles: [".marketing-campaigns-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-description {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(4, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    padding: 1rem 1rem 0.9rem;\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.2rem, 1.8vw, 1.55rem);\n    letter-spacing: -0.01em;\n  }\n\n  .metric-card--campaigns::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--active::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%);\n  }\n\n  .metric-card--planned::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--actual::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .crm-input {\n    width: 100%;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  ::ng-deep .crm-table .p-sortable-column .p-sortable-column-icon {\n    margin-left: 0.35rem;\n    font-size: 0.75rem;\n    color: #64748b;\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button,\n  ::ng-deep .crm-table .p-datatable-column-filter-button {\n    margin-left: 0.3rem;\n    width: 1.65rem;\n    height: 1.65rem;\n    border-radius: 0.45rem;\n    --crm-btn-fg: #475569;\n    color: #475569;\n    border: 1px solid transparent;\n    background: rgba(148, 163, 184, 0.1);\n    transition: background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button:enabled:hover,\n  ::ng-deep .crm-table .p-datatable-column-filter-button:enabled:hover {\n    --crm-btn-fg: #1e40af;\n    background: rgba(59, 130, 246, 0.16);\n    color: #1e40af;\n    border-color: rgba(59, 130, 246, 0.35);\n    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button:focus-visible,\n  ::ng-deep .crm-table .p-datatable-column-filter-button:focus-visible {\n    --crm-btn-fg: #1d4ed8;\n    outline: none;\n    background: rgba(59, 130, 246, 0.2);\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.45);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.22);\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button.p-column-filter-menu-button-active,\n  ::ng-deep .crm-table .p-datatable-column-filter-button.p-column-filter-menu-button-active,\n  ::ng-deep .crm-table .p-datatable-column-filter-button.p-datatable-column-filter-button-active {\n    --crm-btn-fg: #1d4ed8;\n    background: rgba(59, 130, 246, 0.15);\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.35);\n  }\n\n  ::ng-deep .crm-table .column-menu-filter.p-select {\n    width: 16rem;\n    max-width: 100%;\n  }\n\n  ::ng-deep .crm-table .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.25);\n    background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%);\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 1100px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(170px, 1fr));\n    }\n  }\n\n  @media (max-width: 900px) {\n    .data-card-header {\n      align-items: flex-start;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignsPage, [{
        type: Component,
        args: [{ selector: 'app-campaigns-page', standalone: true, imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TableModule, BreadcrumbsComponent], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"page-container marketing-campaigns-page\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Marketing Workspace</span>\n        </div>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Campaign</span>\n          <span class=\"title-light\">Management</span>\n        </h1>\n        <p class=\"hero-description\">\n          Plan campaigns, manage audience members, and track first-touch impact on pipeline.\n        </p>\n\n        <div class=\"hero-stats\">\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ kpis().total }}</div>\n            <div class=\"stat-label\">Campaigns</div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ kpis().active }}</div>\n            <div class=\"stat-label\">Active</div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ formatMoney(kpis().plannedBudget) }}</div>\n            <div class=\"stat-label\">Planned Budget</div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ formatMoney(kpis().actualBudget) }}</div>\n            <div class=\"stat-label\">Actual Budget</div>\n          </div>\n        </div>\n\n        <div class=\"hero-actions\">\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--add\"\n            [disabled]=\"!canManage()\"\n            (click)=\"createCampaign()\"\n          ><span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span><span>New Campaign</span></button>\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--attribution\"\n            (click)=\"openAttribution()\"\n          ><span class=\"action-btn__icon\"><i class=\"pi pi-percentage\"></i></span><span>Attribution</span></button>\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--settings\"\n            (click)=\"openSettings()\"\n          ><span class=\"action-btn__icon\"><i class=\"pi pi-cog\"></i></span><span>Settings</span></button>\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--refresh\"\n            (click)=\"load()\"\n          ><span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span><span>Refresh</span></button>\n        </div>\n      </div>\n\n      <div class=\"hero-visual\">\n        <div class=\"visual-card visual-card--primary\">\n          <div class=\"card-icon\"><i class=\"pi pi-megaphone\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Campaign Records</span>\n            <strong class=\"card-value\">{{ kpis().total }}</strong>\n            <span class=\"card-trend\">Total active + archived</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n        <div class=\"visual-card visual-card--secondary\">\n          <div class=\"card-icon\"><i class=\"pi pi-chart-line\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Active Ratio</span>\n            <strong class=\"card-value\">{{ kpis().total ? ((kpis().active / kpis().total) * 100 | number:'1.0-0') : 0 }}%</strong>\n            <span class=\"card-trend\">Currently running</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"metrics-dashboard\">\n      <div class=\"metrics-grid\">\n        <article class=\"metric-card metric-card--campaigns\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-briefcase\"></i></div>\n            <span class=\"metric-trend up\"><i class=\"pi pi-chart-line\"></i> Total</span>\n          </div>\n          <span class=\"metric-label\">Campaigns</span>\n          <strong class=\"metric-value\">{{ kpis().total }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--active\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon success\"><i class=\"pi pi-play-circle\"></i></div>\n            <span class=\"metric-trend up\"><i class=\"pi pi-bolt\"></i> Live</span>\n          </div>\n          <span class=\"metric-label\">Active</span>\n          <strong class=\"metric-value\">{{ kpis().active }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--planned\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-wallet\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-calendar\"></i> Forecast</span>\n          </div>\n          <span class=\"metric-label\">Planned</span>\n          <strong class=\"metric-value\">{{ formatMoney(kpis().plannedBudget) }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--actual\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-money-bill\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-chart-bar\"></i> Spent</span>\n          </div>\n          <span class=\"metric-label\">Actual</span>\n          <strong class=\"metric-value\">{{ formatMoney(kpis().actualBudget) }}</strong>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\">\n      <header class=\"data-card-header\">\n        <div>\n          <h2 class=\"section-title\">Campaign Records</h2>\n          <p class=\"data-card-subtitle\">{{ campaigns().length }} records</p>\n        </div>\n      </header>\n\n      <div class=\"table-wrap\" *ngIf=\"!loading(); else loadingTpl\">\n        <p-table\n          [value]=\"campaigns()\"\n          styleClass=\"crm-table\"\n          [rowHover]=\"true\"\n          sortMode=\"multiple\"\n          [paginator]=\"true\"\n          [rows]=\"10\"\n          [rowsPerPageOptions]=\"rowsPerPageOptions\"\n          [showCurrentPageReport]=\"true\"\n          currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} campaigns\"\n        >\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th pSortableColumn=\"name\">\n                Name\n                <p-sortIcon field=\"name\"></p-sortIcon>\n                <p-columnFilter\n                  type=\"text\"\n                  field=\"name\"\n                  display=\"menu\"\n                  [showOperator]=\"false\"\n                  [showAddButton]=\"false\"\n                  [showMatchModes]=\"false\"\n                  [showApplyButton]=\"false\"\n                ></p-columnFilter>\n              </th>\n              <th pSortableColumn=\"status\">\n                Status\n                <p-sortIcon field=\"status\"></p-sortIcon>\n                <p-columnFilter\n                  field=\"status\"\n                  matchMode=\"equals\"\n                  display=\"menu\"\n                  [showOperator]=\"false\"\n                  [showAddButton]=\"false\"\n                  [showMatchModes]=\"false\"\n                  [showApplyButton]=\"false\"\n                >\n                  <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"statusFilterOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [ngModel]=\"value\"\n                      (onChange)=\"filter($event.value)\"\n                      placeholder=\"All statuses\"\n                      [showClear]=\"true\"\n                      styleClass=\"column-menu-filter\"\n                    ></p-select>\n                  </ng-template>\n                </p-columnFilter>\n              </th>\n              <th pSortableColumn=\"channel\">\n                Channel\n                <p-sortIcon field=\"channel\"></p-sortIcon>\n                <p-columnFilter\n                  field=\"channel\"\n                  matchMode=\"equals\"\n                  display=\"menu\"\n                  [showOperator]=\"false\"\n                  [showAddButton]=\"false\"\n                  [showMatchModes]=\"false\"\n                  [showApplyButton]=\"false\"\n                >\n                  <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"channelFilterOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [ngModel]=\"value\"\n                      (onChange)=\"filter($event.value)\"\n                      placeholder=\"All channels\"\n                      [showClear]=\"true\"\n                      styleClass=\"column-menu-filter\"\n                    ></p-select>\n                  </ng-template>\n                </p-columnFilter>\n              </th>\n              <th pSortableColumn=\"ownerName\">\n                Owner\n                <p-sortIcon field=\"ownerName\"></p-sortIcon>\n                <p-columnFilter\n                  field=\"ownerName\"\n                  matchMode=\"equals\"\n                  display=\"menu\"\n                  [showOperator]=\"false\"\n                  [showAddButton]=\"false\"\n                  [showMatchModes]=\"false\"\n                  [showApplyButton]=\"false\"\n                >\n                  <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"ownerFilterOptions()\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [ngModel]=\"value\"\n                      (onChange)=\"filter($event.value)\"\n                      placeholder=\"All owners\"\n                      [showClear]=\"true\"\n                      styleClass=\"column-menu-filter\"\n                    ></p-select>\n                  </ng-template>\n                </p-columnFilter>\n              </th>\n              <th pSortableColumn=\"budgetPlanned\">\n                Planned\n                <p-sortIcon field=\"budgetPlanned\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"budgetActual\">\n                Actual\n                <p-sortIcon field=\"budgetActual\"></p-sortIcon>\n              </th>\n              <th>Dates</th>\n              <th>Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-campaign>\n            <tr (click)=\"onRowClick(campaign, $event)\">\n              <td>{{ campaign.name }}</td>\n              <td>{{ campaign.status }}</td>\n              <td>{{ campaign.channel }}</td>\n              <td>{{ campaign.ownerName }}</td>\n              <td>{{ formatMoney(campaign.budgetPlanned) }}</td>\n              <td>{{ formatMoney(campaign.budgetActual) }}</td>\n              <td>{{ campaign.startDateUtc ? (campaign.startDateUtc | date:'mediumDate') : '\u2014' }} - {{ campaign.endDateUtc ? (campaign.endDateUtc | date:'mediumDate') : '\u2014' }}</td>\n              <td>\n                <div class=\"row-actions\">\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--view\"\n                    (click)=\"$event.stopPropagation(); openCampaign(campaign)\"\n                    title=\"View\"\n                  ><i class=\"pi pi-eye\"></i></button>\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--edit\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"$event.stopPropagation(); editCampaign(campaign)\"\n                    title=\"Edit\"\n                  ><i class=\"pi pi-pencil\"></i></button>\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--archive\"\n                    [disabled]=\"!canManage() || campaign.status === 'Archived'\"\n                    (click)=\"$event.stopPropagation(); archiveCampaign(campaign)\"\n                    title=\"Archive\"\n                  ><i class=\"pi pi-archive\"></i></button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"emptymessage\">\n            <tr>\n              <td colspan=\"8\" class=\"empty\">No campaigns found.</td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </section>\n  </div>\n</div>\n\n<ng-template #loadingTpl>\n  <div class=\"loading\">Loading campaigns...</div>\n</ng-template>\n", styles: [".marketing-campaigns-page {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-description {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(4, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    padding: 1rem 1rem 0.9rem;\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.2rem, 1.8vw, 1.55rem);\n    letter-spacing: -0.01em;\n  }\n\n  .metric-card--campaigns::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--active::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%);\n  }\n\n  .metric-card--planned::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--actual::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .crm-input {\n    width: 100%;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  ::ng-deep .crm-table .p-sortable-column .p-sortable-column-icon {\n    margin-left: 0.35rem;\n    font-size: 0.75rem;\n    color: #64748b;\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button,\n  ::ng-deep .crm-table .p-datatable-column-filter-button {\n    margin-left: 0.3rem;\n    width: 1.65rem;\n    height: 1.65rem;\n    border-radius: 0.45rem;\n    --crm-btn-fg: #475569;\n    color: #475569;\n    border: 1px solid transparent;\n    background: rgba(148, 163, 184, 0.1);\n    transition: background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button:enabled:hover,\n  ::ng-deep .crm-table .p-datatable-column-filter-button:enabled:hover {\n    --crm-btn-fg: #1e40af;\n    background: rgba(59, 130, 246, 0.16);\n    color: #1e40af;\n    border-color: rgba(59, 130, 246, 0.35);\n    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button:focus-visible,\n  ::ng-deep .crm-table .p-datatable-column-filter-button:focus-visible {\n    --crm-btn-fg: #1d4ed8;\n    outline: none;\n    background: rgba(59, 130, 246, 0.2);\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.45);\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.22);\n  }\n\n  ::ng-deep .crm-table .p-column-filter-menu-button.p-column-filter-menu-button-active,\n  ::ng-deep .crm-table .p-datatable-column-filter-button.p-column-filter-menu-button-active,\n  ::ng-deep .crm-table .p-datatable-column-filter-button.p-datatable-column-filter-button-active {\n    --crm-btn-fg: #1d4ed8;\n    background: rgba(59, 130, 246, 0.15);\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.35);\n  }\n\n  ::ng-deep .crm-table .column-menu-filter.p-select {\n    width: 16rem;\n    max-width: 100%;\n  }\n\n  ::ng-deep .crm-table .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.25);\n    background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%);\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 1100px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(170px, 1fr));\n    }\n  }\n\n  @media (max-width: 900px) {\n    .data-card-header {\n      align-items: flex-start;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignsPage, { className: "CampaignsPage", filePath: "src/app/crm/features/marketing/pages/campaigns.page.ts", lineNumber: 24 }); })();
