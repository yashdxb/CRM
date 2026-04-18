import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/api";
import * as i4 from "primeng/select";
import * as i5 from "primeng/table";
import * as i6 from "primeng/tag";
import * as i7 from "primeng/inputtext";
function CampaignEmailsPage_ng_template_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Campaign");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 42);
    i0.ɵɵtext(8, "Recipients");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 42);
    i0.ɵɵtext(10, "Opens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 42);
    i0.ɵɵtext(12, "Clicks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "th");
    i0.ɵɵelementEnd();
} }
function CampaignEmailsPage_ng_template_69_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const email_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("(", ctx_r2.computeRate(email_r2.openCount, email_r2.sentCount), "%)");
} }
function CampaignEmailsPage_ng_template_69_span_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const email_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("(", ctx_r2.computeRate(email_r2.clickCount, email_r2.sentCount), "%)");
} }
function CampaignEmailsPage_ng_template_69_span_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const email_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(email_r2.sentAtUtc));
} }
function CampaignEmailsPage_ng_template_69_span_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵelement(1, "i", 58);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const email_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatDate(email_r2.scheduledAtUtc), " ");
} }
function CampaignEmailsPage_ng_template_69_span_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function CampaignEmailsPage_ng_template_69_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 43)(1, "td")(2, "button", 44);
    i0.ɵɵlistener("click", function CampaignEmailsPage_ng_template_69_Template_button_click_2_listener() { const email_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.viewCampaign(email_r2.campaignId)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "span", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelement(8, "p-tag", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 42)(10, "span", 47);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 42)(13, "div", 48)(14, "span", 47);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, CampaignEmailsPage_ng_template_69_span_16_Template, 2, 1, "span", 49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td", 42)(18, "div", 48)(19, "span", 47);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, CampaignEmailsPage_ng_template_69_span_21_Template, 2, 1, "span", 49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtemplate(23, CampaignEmailsPage_ng_template_69_span_23_Template, 2, 1, "span", 50)(24, CampaignEmailsPage_ng_template_69_span_24_Template, 3, 1, "span", 51)(25, CampaignEmailsPage_ng_template_69_span_25_Template, 2, 0, "span", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td")(27, "button", 53);
    i0.ɵɵlistener("click", function CampaignEmailsPage_ng_template_69_Template_button_click_27_listener() { const email_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.viewEmail(email_r2.id)); });
    i0.ɵɵelement(28, "i", 54);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const email_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", email_r2.campaignName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(email_r2.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", email_r2.status)("severity", ctx_r2.getStatusSeverity(email_r2.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatNumber(email_r2.recipientCount));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatNumber(email_r2.openCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", email_r2.status === "Sent");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatNumber(email_r2.clickCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", email_r2.status === "Sent");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", email_r2.sentAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", email_r2.scheduledAtUtc && !email_r2.sentAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !email_r2.sentAtUtc && !email_r2.scheduledAtUtc);
} }
function CampaignEmailsPage_ng_template_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 60)(2, "div", 61);
    i0.ɵɵelement(3, "i", 62);
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "No campaign emails found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Create a campaign and send emails to see them here");
    i0.ɵɵelementEnd()()()();
} }
export class CampaignEmailsPage {
    rowsPerPageOptions = [10, 20, 50];
    statusFilterOptions = [
        { label: 'All Statuses', value: '' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Scheduled', value: 'Scheduled' },
        { label: 'Sending', value: 'Sending' },
        { label: 'Sent', value: 'Sent' },
        { label: 'Failed', value: 'Failed' }
    ];
    emails = signal([], ...(ngDevMode ? [{ debugName: "emails" }] : []));
    totalRecords = signal(0, ...(ngDevMode ? [{ debugName: "totalRecords" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    statusFilter = signal('', ...(ngDevMode ? [{ debugName: "statusFilter" }] : []));
    searchText = signal('', ...(ngDevMode ? [{ debugName: "searchText" }] : []));
    filteredEmails = computed(() => {
        let rows = this.emails();
        const status = this.statusFilter();
        const search = this.searchText().toLowerCase().trim();
        if (status) {
            rows = rows.filter(e => e.status === status);
        }
        if (search) {
            rows = rows.filter(e => e.subject.toLowerCase().includes(search) ||
                e.campaignName.toLowerCase().includes(search));
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "filteredEmails" }] : []));
    kpis = computed(() => {
        const rows = this.emails();
        const sent = rows.filter(e => e.status === 'Sent');
        const totalSent = sent.reduce((sum, e) => sum + e.sentCount, 0);
        const totalOpens = sent.reduce((sum, e) => sum + e.openCount, 0);
        const totalClicks = sent.reduce((sum, e) => sum + e.clickCount, 0);
        return {
            totalEmails: rows.length,
            sentEmails: sent.length,
            totalRecipients: totalSent,
            avgOpenRate: totalSent > 0 ? Math.round((totalOpens / totalSent) * 100) : 0,
            avgClickRate: totalSent > 0 ? Math.round((totalClicks / totalSent) * 100) : 0
        };
    }, ...(ngDevMode ? [{ debugName: "kpis" }] : []));
    data = inject(MarketingDataService);
    router = inject(Router);
    toast = inject(AppToastService);
    constructor() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.data.searchEmails({
            status: this.statusFilter() || undefined,
            search: this.searchText()?.trim() || undefined,
            page: 1,
            pageSize: 50
        }).subscribe({
            next: (res) => {
                this.emails.set(res.items);
                this.totalRecords.set(res.total);
                this.loading.set(false);
            },
            error: () => {
                this.toast.show('error', 'Failed to load campaign emails');
                this.loading.set(false);
            }
        });
    }
    viewCampaign(campaignId) {
        this.router.navigate(['/app/marketing/campaigns', campaignId]);
    }
    viewEmail(emailId) {
        this.router.navigate(['/app/marketing/emails', emailId]);
    }
    getStatusSeverity(status) {
        switch (status) {
            case 'Sent': return 'success';
            case 'Sending': return 'info';
            case 'Scheduled': return 'warn';
            case 'Draft': return 'secondary';
            case 'Failed': return 'danger';
            default: return 'secondary';
        }
    }
    formatDate(dateStr) {
        if (!dateStr)
            return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    formatNumber(num) {
        return num.toLocaleString();
    }
    computeRate(count, total) {
        return total > 0 ? Math.round((count / total) * 100) : 0;
    }
    static ɵfac = function CampaignEmailsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignEmailsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignEmailsPage, selectors: [["app-campaign-emails-page"]], decls: 71, vars: 15, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-chart-line"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-glow"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-external-link"], [1, "toolbar"], [1, "toolbar-left"], [1, "p-inputgroup", "search-group"], [1, "p-inputgroup-addon"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search by subject or campaign...", 3, "ngModelChange", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Filter by status", "styleClass", "status-filter", 3, "ngModelChange", "options", "ngModel"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "record-count"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} emails", "styleClass", "data-table", 3, "value", "loading", "paginator", "rows", "rowsPerPageOptions", "showCurrentPageReport"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "text-right"], [1, "table-row"], [1, "link-btn", 3, "click"], [1, "subject-text"], [3, "value", "severity"], [1, "metric-value"], [1, "metric-with-rate"], ["class", "metric-rate", 4, "ngIf"], ["class", "date-text", 4, "ngIf"], ["class", "date-text scheduled", 4, "ngIf"], ["class", "date-text draft", 4, "ngIf"], ["pTooltip", "View Details", 1, "icon-btn", 3, "click"], [1, "pi", "pi-eye"], [1, "metric-rate"], [1, "date-text"], [1, "date-text", "scheduled"], [1, "pi", "pi-clock"], [1, "date-text", "draft"], ["colspan", "8", 1, "empty-message"], [1, "empty-state"], [1, "pi", "pi-send"]], template: function CampaignEmailsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "header", 5)(6, "div", 6);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "span", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵtext(10, " Marketing Hub ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "h1", 9)(12, "span", 10);
            i0.ɵɵtext(13, "Campaign");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span", 11);
            i0.ɵɵtext(15, "Emails");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "p", 12);
            i0.ɵɵtext(17, "Track and analyze bulk email sends from your marketing campaigns");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 13)(19, "div", 14)(20, "span", 15);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "span", 16);
            i0.ɵɵtext(23, "Total Emails");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 14)(25, "span", 15);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "span", 16);
            i0.ɵɵtext(28, "Sent");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 14)(30, "span", 15);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span", 16);
            i0.ɵɵtext(33, "Recipients");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(34, "div", 17)(35, "div", 18)(36, "div", 19);
            i0.ɵɵelement(37, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 21)(39, "span", 22);
            i0.ɵɵtext(40, "Avg Open Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "strong", 23);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(43, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 25)(45, "div", 19);
            i0.ɵɵelement(46, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 21)(48, "span", 22);
            i0.ɵɵtext(49, "Avg Click Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "strong", 23);
            i0.ɵɵtext(51);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(52, "div", 24);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(53, "div", 27)(54, "div", 28)(55, "span", 29)(56, "span", 30);
            i0.ɵɵelement(57, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "input", 32);
            i0.ɵɵlistener("ngModelChange", function CampaignEmailsPage_Template_input_ngModelChange_58_listener($event) { return ctx.searchText.set($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "p-select", 33);
            i0.ɵɵtwoWayListener("ngModelChange", function CampaignEmailsPage_Template_p_select_ngModelChange_59_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(60, "div", 34)(61, "div", 35)(62, "div", 36)(63, "h2");
            i0.ɵɵtext(64, "Email Sends");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "span", 37);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "p-table", 38);
            i0.ɵɵtemplate(68, CampaignEmailsPage_ng_template_68_Template, 16, 0, "ng-template", 39)(69, CampaignEmailsPage_ng_template_69_Template, 29, 12, "ng-template", 40)(70, CampaignEmailsPage_ng_template_70_Template, 8, 0, "ng-template", 41);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(21);
            i0.ɵɵtextInterpolate(ctx.kpis().totalEmails);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.kpis().sentEmails);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.formatNumber(ctx.kpis().totalRecipients));
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.kpis().avgOpenRate, "%");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("", ctx.kpis().avgClickRate, "%");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngModel", ctx.searchText());
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.statusFilterOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.filteredEmails().length, " emails");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.filteredEmails())("loading", ctx.loading())("paginator", true)("rows", 10)("rowsPerPageOptions", ctx.rowsPerPageOptions)("showCurrentPageReport", true);
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.PrimeTemplate, SelectModule, i4.Select, TableModule, i5.Table, TagModule, i6.Tag, InputTextModule, i7.InputText, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   Background[_ngcontent-%COMP%]   Orbs\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Section\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n  margin-top: $space-2;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n//[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Cards\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--success .card-icon {\n    background: $success-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   Toolbar\n.toolbar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n}\n\n.toolbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.search-group[_ngcontent-%COMP%] {\n  min-width: 280px;\n\n  .p-inputgroup-addon {\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n    border-right: none;\n  }\n\n  input {\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n  }\n}\n\n  .status-filter {\n  min-width: 160px;\n}\n\n//[_ngcontent-%COMP%]   Data[_ngcontent-%COMP%]   Section\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n//[_ngcontent-%COMP%]   Table[_ngcontent-%COMP%]   Styles\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background 150ms;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.link-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: $primary;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n}\n\n.subject-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: $gray-700;\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.metric-with-rate[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.metric-rate[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.date-text[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  &.scheduled {\n    color: $warning;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n  }\n\n  &.draft {\n    color: $gray-400;\n  }\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n}\n\n.empty-message[_ngcontent-%COMP%] {\n  padding: $space-8 !important;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  color: $gray-400;\n\n  i {\n    font-size: 3rem;\n    color: $gray-300;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-500;\n  }\n\n  span {\n    font-size: $font-size-sm;\n    color: $gray-400;\n  }\n}\n\n//[_ngcontent-%COMP%]   Animations\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignEmailsPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-emails-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ButtonModule,
                    SelectModule,
                    TableModule,
                    TagModule,
                    InputTextModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"page-container\">\n  <!-- Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Hero Section -->\n  <header class=\"hero-section\">\n    <div class=\"hero-content\">\n      <app-breadcrumbs></app-breadcrumbs>\n      <span class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        Marketing Hub\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Campaign</span>\n        <span class=\"title-light\">Emails</span>\n      </h1>\n      <p class=\"hero-description\">Track and analyze bulk email sends from your marketing campaigns</p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <span class=\"stat-value\">{{ kpis().totalEmails }}</span>\n          <span class=\"stat-label\">Total Emails</span>\n        </div>\n        <div class=\"hero-stat\">\n          <span class=\"stat-value\">{{ kpis().sentEmails }}</span>\n          <span class=\"stat-label\">Sent</span>\n        </div>\n        <div class=\"hero-stat\">\n          <span class=\"stat-value\">{{ formatNumber(kpis().totalRecipients) }}</span>\n          <span class=\"stat-label\">Recipients</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-chart-line\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Avg Open Rate</span>\n          <strong class=\"card-value\">{{ kpis().avgOpenRate }}%</strong>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n      <div class=\"visual-card visual-card--success\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-external-link\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Avg Click Rate</span>\n          <strong class=\"card-value\">{{ kpis().avgClickRate }}%</strong>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </header>\n\n  <!-- Toolbar -->\n  <div class=\"toolbar\">\n    <div class=\"toolbar-left\">\n      <span class=\"p-inputgroup search-group\">\n        <span class=\"p-inputgroup-addon\">\n          <i class=\"pi pi-search\"></i>\n        </span>\n        <input\n          pInputText\n          type=\"text\"\n          placeholder=\"Search by subject or campaign...\"\n          [ngModel]=\"searchText()\"\n          (ngModelChange)=\"searchText.set($event)\"\n        />\n      </span>\n      <p-select\n        [options]=\"statusFilterOptions\"\n        [(ngModel)]=\"statusFilter\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        placeholder=\"Filter by status\"\n        styleClass=\"status-filter\"\n      ></p-select>\n    </div>\n  </div>\n\n  <!-- Data Table -->\n  <div class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <h2>Email Sends</h2>\n        <span class=\"record-count\">{{ filteredEmails().length }} emails</span>\n      </div>\n\n      <p-table\n        [value]=\"filteredEmails()\"\n        [loading]=\"loading()\"\n        [paginator]=\"true\"\n        [rows]=\"10\"\n        [rowsPerPageOptions]=\"rowsPerPageOptions\"\n        [showCurrentPageReport]=\"true\"\n        currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} emails\"\n        styleClass=\"data-table\"\n      >\n        <ng-template pTemplate=\"header\">\n          <tr>\n            <th>Campaign</th>\n            <th>Subject</th>\n            <th>Status</th>\n            <th class=\"text-right\">Recipients</th>\n            <th class=\"text-right\">Opens</th>\n            <th class=\"text-right\">Clicks</th>\n            <th>Date</th>\n            <th></th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-email>\n          <tr class=\"table-row\">\n            <td>\n              <button class=\"link-btn\" (click)=\"viewCampaign(email.campaignId)\">\n                {{ email.campaignName }}\n              </button>\n            </td>\n            <td>\n              <span class=\"subject-text\">{{ email.subject }}</span>\n            </td>\n            <td>\n              <p-tag [value]=\"email.status\" [severity]=\"getStatusSeverity(email.status)\"></p-tag>\n            </td>\n            <td class=\"text-right\">\n              <span class=\"metric-value\">{{ formatNumber(email.recipientCount) }}</span>\n            </td>\n            <td class=\"text-right\">\n              <div class=\"metric-with-rate\">\n                <span class=\"metric-value\">{{ formatNumber(email.openCount) }}</span>\n                <span class=\"metric-rate\" *ngIf=\"email.status === 'Sent'\">({{ computeRate(email.openCount, email.sentCount) }}%)</span>\n              </div>\n            </td>\n            <td class=\"text-right\">\n              <div class=\"metric-with-rate\">\n                <span class=\"metric-value\">{{ formatNumber(email.clickCount) }}</span>\n                <span class=\"metric-rate\" *ngIf=\"email.status === 'Sent'\">({{ computeRate(email.clickCount, email.sentCount) }}%)</span>\n              </div>\n            </td>\n            <td>\n              <span class=\"date-text\" *ngIf=\"email.sentAtUtc\">{{ formatDate(email.sentAtUtc) }}</span>\n              <span class=\"date-text scheduled\" *ngIf=\"email.scheduledAtUtc && !email.sentAtUtc\">\n                <i class=\"pi pi-clock\"></i> {{ formatDate(email.scheduledAtUtc) }}\n              </span>\n              <span class=\"date-text draft\" *ngIf=\"!email.sentAtUtc && !email.scheduledAtUtc\">\u2014</span>\n            </td>\n            <td>\n              <button class=\"icon-btn\" pTooltip=\"View Details\" (click)=\"viewEmail(email.id)\">\n                <i class=\"pi pi-eye\"></i>\n              </button>\n            </td>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"emptymessage\">\n          <tr>\n            <td colspan=\"8\" class=\"empty-message\">\n              <div class=\"empty-state\">\n                <i class=\"pi pi-send\"></i>\n                <p>No campaign emails found</p>\n                <span>Create a campaign and send emails to see them here</span>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n      </p-table>\n    </div>\n  </div>\n</section>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n// Background Orbs\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n// Hero Section\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n  margin-top: $space-2;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-stats {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n// Visual Cards\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--success .card-icon {\n    background: $success-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// Toolbar\n.toolbar {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n}\n\n.toolbar-left {\n  display: flex;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.search-group {\n  min-width: 280px;\n\n  .p-inputgroup-addon {\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n    border-right: none;\n  }\n\n  input {\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n  }\n}\n\n::ng-deep .status-filter {\n  min-width: 160px;\n}\n\n// Data Section\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n// Table Styles\n.data-table {\n  width: 100%;\n\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n}\n\n.table-row {\n  transition: background 150ms;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.text-right {\n  text-align: right;\n}\n\n.link-btn {\n  background: transparent;\n  border: none;\n  color: $primary;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n}\n\n.subject-text {\n  font-weight: 500;\n  color: $gray-700;\n}\n\n.metric-value {\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.metric-with-rate {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.metric-rate {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.date-text {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  &.scheduled {\n    color: $warning;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n  }\n\n  &.draft {\n    color: $gray-400;\n  }\n}\n\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n}\n\n.empty-message {\n  padding: $space-8 !important;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  color: $gray-400;\n\n  i {\n    font-size: 3rem;\n    color: $gray-300;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-500;\n  }\n\n  span {\n    font-size: $font-size-sm;\n    color: $gray-400;\n  }\n}\n\n// Animations\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@keyframes pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignEmailsPage, { className: "CampaignEmailsPage", filePath: "src/app/crm/features/marketing/pages/campaign-emails.page.ts", lineNumber: 31 }); })();
