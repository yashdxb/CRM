import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { MarketingDataService } from '../../marketing/services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/tag";
function MarketingSettingsPage_section_64_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "div", 56)(2, "article", 57)(3, "div", 29)(4, "div", 30);
    i0.ɵɵelement(5, "i", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 34);
    i0.ɵɵtext(7, "Active Recommendations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong", 35);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "article", 57)(11, "div", 29)(12, "div", 59);
    i0.ɵɵelement(13, "i", 60);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "span", 34);
    i0.ɵɵtext(15, "Acceptance Rate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong", 35);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "article", 57)(19, "div", 29)(20, "div", 37);
    i0.ɵɵelement(21, "i", 61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "span", 34);
    i0.ɵɵtext(23, "Action Tasks Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "strong", 35);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "article", 57)(27, "div", 29)(28, "div", 62);
    i0.ɵɵelement(29, "i", 63);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "span", 34);
    i0.ɵɵtext(31, "Impact Worklist Clicks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "strong", 35);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "article", 57)(35, "div", 29)(36, "div", 40);
    i0.ɵɵelement(37, "i", 64);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "span", 34);
    i0.ɵɵtext(39, "Avg Decision Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "strong", 35);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 65);
    i0.ɵɵtext(43, " Decisions in 30 days: ");
    i0.ɵɵelementStart(44, "strong");
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(46, " accepted, ");
    i0.ɵɵelementStart(47, "strong");
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(49, " dismissed, ");
    i0.ɵɵelementStart(50, "strong");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(52, " snoozed. ");
    i0.ɵɵelementStart(53, "button", 66);
    i0.ɵɵlistener("click", function MarketingSettingsPage_section_64_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openImpactTelemetryAudit()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const metrics_r3 = ctx.ngIf;
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(metrics_r3.activeRecommendations);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", metrics_r3.acceptanceRatePct, "%");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(metrics_r3.actionTasksCreated);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(metrics_r3.impactWorklistClicks);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(metrics_r3.avgDecisionHours);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(metrics_r3.acceptedCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(metrics_r3.dismissedCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(metrics_r3.snoozedCount);
} }
export class MarketingSettingsPage {
    attributionModel = 'First-touch';
    attributionDescription = 'Earliest campaign membership across linked lead/contact determines the single campaign credited per opportunity.';
    pilotMetrics = signal(null, ...(ngDevMode ? [{ debugName: "pilotMetrics" }] : []));
    router = inject(Router);
    marketingData = inject(MarketingDataService);
    constructor() {
        this.loadPilotMetrics();
    }
    openCampaigns() {
        this.router.navigate(['/app/marketing/campaigns']);
    }
    openAttribution() {
        this.router.navigate(['/app/marketing/attribution']);
    }
    openImpactTelemetryAudit() {
        this.router.navigate(['/app/settings/audit-log'], {
            queryParams: {
                entityType: 'MarketingTelemetry',
                action: 'ImpactWorklistOpened'
            }
        });
    }
    loadPilotMetrics() {
        this.marketingData.getRecommendationPilotMetrics().subscribe({
            next: (metrics) => this.pilotMetrics.set(metrics),
            error: () => this.pilotMetrics.set(null)
        });
    }
    static ɵfac = function MarketingSettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MarketingSettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MarketingSettingsPage, selectors: [["app-marketing-settings-page"]], decls: 105, vars: 5, consts: [[1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-container", "marketing-settings-page"], [1, "page-content"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-actions"], ["pButton", "", "type", "button", "icon", "pi pi-megaphone", "label", "Campaigns", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-chart-line", "label", "Attribution", 1, "crm-button", "crm-button--ghost", 3, "click"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-sparkles"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "card-glow"], [1, "metrics-dashboard"], [1, "metrics-grid"], [1, "metric-card", "metric-card--model"], [1, "metric-header"], [1, "metric-icon", "primary"], [1, "pi", "pi-bolt"], [1, "metric-trend", "up"], [1, "pi", "pi-check"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--scope"], [1, "metric-icon", "info"], [1, "pi", "pi-link"], [1, "metric-card", "metric-card--credit"], [1, "metric-icon", "warning"], [1, "pi", "pi-chart-pie"], ["class", "metrics-dashboard", 4, "ngIf"], [1, "data-card", "no-hover", "policy-card"], [1, "data-card-header"], [1, "section-title"], [1, "data-card-subtitle"], ["severity", "info", "value", "Read-only"], [1, "policy-body"], [1, "model-value"], [1, "model-description"], [1, "policy-note"], [1, "data-card", "no-hover"], [1, "scope-grid"], [1, "scope-item"], [1, "scope-title"], [1, "metrics-grid", "metrics-grid--pilot"], [1, "metric-card", "metric-card--pilot"], [1, "pi", "pi-lightbulb"], [1, "metric-icon", "success"], [1, "pi", "pi-check-circle"], [1, "pi", "pi-list-check"], [1, "metric-icon", "secondary"], [1, "pi", "pi-mouse"], [1, "pi", "pi-clock"], [1, "pilot-summary"], ["pButton", "", "type", "button", "icon", "pi pi-external-link", "label", "View Impact Telemetry Audit", 1, "crm-button", "crm-button--text", "pilot-audit-link", 3, "click"]], template: function MarketingSettingsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "section", 6)(8, "div", 7)(9, "div", 8);
            i0.ɵɵelement(10, "span", 9);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Marketing Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "h1", 10)(14, "span", 11);
            i0.ɵɵtext(15, "Marketing Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 12);
            i0.ɵɵtext(17, "Attribution Policy");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "p", 13);
            i0.ɵɵtext(19, "Campaign Management currently uses one attribution policy across the tenant.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 14)(21, "button", 15);
            i0.ɵɵlistener("click", function MarketingSettingsPage_Template_button_click_21_listener() { return ctx.openCampaigns(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 16);
            i0.ɵɵlistener("click", function MarketingSettingsPage_Template_button_click_22_listener() { return ctx.openAttribution(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "div", 17)(24, "div", 18)(25, "div", 19);
            i0.ɵɵelement(26, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 21)(28, "span", 22);
            i0.ɵɵtext(29, "Current Model");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "strong", 23);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span", 24);
            i0.ɵɵtext(33, "One campaign credit per opportunity");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(34, "div", 25);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "section", 26)(36, "div", 27)(37, "article", 28)(38, "div", 29)(39, "div", 30);
            i0.ɵɵelement(40, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 32);
            i0.ɵɵelement(42, "i", 33);
            i0.ɵɵtext(43, " Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "span", 34);
            i0.ɵɵtext(45, "Model");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "strong", 35);
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "article", 36)(49, "div", 29)(50, "div", 37);
            i0.ɵɵelement(51, "i", 38);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "span", 34);
            i0.ɵɵtext(53, "Attribution Scope");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "strong", 35);
            i0.ɵɵtext(55, "Lead + Contact");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "article", 39)(57, "div", 29)(58, "div", 40);
            i0.ɵɵelement(59, "i", 41);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "span", 34);
            i0.ɵɵtext(61, "Credit Allocation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "strong", 35);
            i0.ɵɵtext(63, "Single-touch");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(64, MarketingSettingsPage_section_64_Template, 54, 8, "section", 42);
            i0.ɵɵelementStart(65, "section", 43)(66, "header", 44)(67, "div")(68, "h2", 45);
            i0.ɵɵtext(69, "Attribution Model");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "p", 46);
            i0.ɵɵtext(71, "MVP policy visibility for admins and marketing users");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(72, "p-tag", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 48)(74, "p", 49);
            i0.ɵɵtext(75);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "p", 50);
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "p", 51);
            i0.ɵɵtext(79, "Out of MVP scope: multi-touch, weighted attribution, and time-decay models.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(80, "section", 52)(81, "header", 44)(82, "h2", 45);
            i0.ɵɵtext(83, "MVP Boundaries");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(84, "div", 53)(85, "article", 54)(86, "h3", 55);
            i0.ɵɵtext(87, "Included");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "ul")(89, "li");
            i0.ɵɵtext(90, "Campaign CRUD and member linking");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "li");
            i0.ɵɵtext(92, "First-touch campaign attribution");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "li");
            i0.ɵɵtext(94, "Influenced pipeline and won revenue reporting");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(95, "article", 54)(96, "h3", 55);
            i0.ɵɵtext(97, "Excluded");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "ul")(99, "li");
            i0.ɵɵtext(100, "Email automation and journey orchestration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "li");
            i0.ɵɵtext(102, "Multi-model attribution configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "li");
            i0.ɵɵtext(104, "Weighted or time-decay attribution logic");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(31);
            i0.ɵɵtextInterpolate(ctx.attributionModel);
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.attributionModel);
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngIf", ctx.pilotMetrics());
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.attributionModel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.attributionDescription);
        } }, dependencies: [CommonModule, i1.NgIf, ButtonModule, i2.ButtonDirective, TagModule, i3.Tag, BreadcrumbsComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.marketing-settings-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(3, minmax(180px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.05rem, 1.35vw, 1.35rem);\n  }\n\n  .metric-card--model::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--scope::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--credit::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metrics-grid--pilot {\n    grid-template-columns: repeat(5, minmax(170px, 1fr));\n  }\n\n  .metric-card--pilot::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #334155 0%, #0f172a 100%);\n  }\n\n  .pilot-summary {\n    margin-top: 0.65rem;\n    color: #475569;\n    font-size: 0.92rem;\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.45rem;\n  }\n\n  .pilot-audit-link {\n    margin-left: auto;\n  }\n\n  .policy-card {\n    max-width: 980px;\n  }\n\n  .policy-body {\n    display: grid;\n    gap: 0.55rem;\n  }\n\n  .model-value {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  .model-description {\n    margin: 0;\n    color: #475569;\n  }\n\n  .policy-note {\n    margin: 0.35rem 0 0;\n    color: #64748b;\n    font-size: 0.9rem;\n  }\n\n  .scope-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.95rem;\n  }\n\n  .scope-item {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76) 0%, rgba(248, 250, 252, 0.68) 100%);\n    padding: 0.85rem;\n  }\n\n  .scope-title {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n\n  .scope-item ul {\n    margin: 0.65rem 0 0;\n    padding-left: 1.05rem;\n    display: grid;\n    gap: 0.35rem;\n    color: #475569;\n  }\n\n  @media (max-width: 980px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .metrics-grid--pilot {\n      grid-template-columns: 1fr;\n    }\n\n    .scope-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .pilot-audit-link {\n      margin-left: 0;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarketingSettingsPage, [{
        type: Component,
        args: [{ selector: 'app-marketing-settings-page', standalone: true, imports: [CommonModule, ButtonModule, TagModule, BreadcrumbsComponent], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n</div>\n\n<div class=\"page-container marketing-settings-page\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Marketing Settings</span>\n        </div>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Marketing Settings</span>\n          <span class=\"title-light\">Attribution Policy</span>\n        </h1>\n        <p class=\"hero-subtitle\">Campaign Management currently uses one attribution policy across the tenant.</p>\n        <div class=\"hero-actions\">\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-megaphone\" label=\"Campaigns\" (click)=\"openCampaigns()\"></button>\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-chart-line\" label=\"Attribution\" (click)=\"openAttribution()\"></button>\n        </div>\n      </div>\n      <div class=\"hero-visual\">\n        <div class=\"visual-card visual-card--primary\">\n          <div class=\"card-icon\"><i class=\"pi pi-sparkles\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Current Model</span>\n            <strong class=\"card-value\">{{ attributionModel }}</strong>\n            <span class=\"card-trend\">One campaign credit per opportunity</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"metrics-dashboard\">\n      <div class=\"metrics-grid\">\n        <article class=\"metric-card metric-card--model\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-bolt\"></i></div>\n            <span class=\"metric-trend up\"><i class=\"pi pi-check\"></i> Active</span>\n          </div>\n          <span class=\"metric-label\">Model</span>\n          <strong class=\"metric-value\">{{ attributionModel }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--scope\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-link\"></i></div>\n          </div>\n          <span class=\"metric-label\">Attribution Scope</span>\n          <strong class=\"metric-value\">Lead + Contact</strong>\n        </article>\n        <article class=\"metric-card metric-card--credit\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-chart-pie\"></i></div>\n          </div>\n          <span class=\"metric-label\">Credit Allocation</span>\n          <strong class=\"metric-value\">Single-touch</strong>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"metrics-dashboard\" *ngIf=\"pilotMetrics() as metrics\">\n      <div class=\"metrics-grid metrics-grid--pilot\">\n        <article class=\"metric-card metric-card--pilot\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-lightbulb\"></i></div>\n          </div>\n          <span class=\"metric-label\">Active Recommendations</span>\n          <strong class=\"metric-value\">{{ metrics.activeRecommendations }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--pilot\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon success\"><i class=\"pi pi-check-circle\"></i></div>\n          </div>\n          <span class=\"metric-label\">Acceptance Rate</span>\n          <strong class=\"metric-value\">{{ metrics.acceptanceRatePct }}%</strong>\n        </article>\n        <article class=\"metric-card metric-card--pilot\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-list-check\"></i></div>\n          </div>\n          <span class=\"metric-label\">Action Tasks Created</span>\n          <strong class=\"metric-value\">{{ metrics.actionTasksCreated }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--pilot\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon secondary\"><i class=\"pi pi-mouse\"></i></div>\n          </div>\n          <span class=\"metric-label\">Impact Worklist Clicks</span>\n          <strong class=\"metric-value\">{{ metrics.impactWorklistClicks }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--pilot\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-clock\"></i></div>\n          </div>\n          <span class=\"metric-label\">Avg Decision Hours</span>\n          <strong class=\"metric-value\">{{ metrics.avgDecisionHours }}</strong>\n        </article>\n      </div>\n      <div class=\"pilot-summary\">\n        Decisions in 30 days:\n        <strong>{{ metrics.acceptedCount }}</strong> accepted,\n        <strong>{{ metrics.dismissedCount }}</strong> dismissed,\n        <strong>{{ metrics.snoozedCount }}</strong> snoozed.\n        <button\n          pButton\n          type=\"button\"\n          class=\"crm-button crm-button--text pilot-audit-link\"\n          icon=\"pi pi-external-link\"\n          label=\"View Impact Telemetry Audit\"\n          (click)=\"openImpactTelemetryAudit()\"\n        ></button>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover policy-card\">\n      <header class=\"data-card-header\">\n        <div>\n          <h2 class=\"section-title\">Attribution Model</h2>\n          <p class=\"data-card-subtitle\">MVP policy visibility for admins and marketing users</p>\n        </div>\n        <p-tag severity=\"info\" value=\"Read-only\"></p-tag>\n      </header>\n      <div class=\"policy-body\">\n        <p class=\"model-value\">{{ attributionModel }}</p>\n        <p class=\"model-description\">{{ attributionDescription }}</p>\n        <p class=\"policy-note\">Out of MVP scope: multi-touch, weighted attribution, and time-decay models.</p>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\">\n      <header class=\"data-card-header\">\n        <h2 class=\"section-title\">MVP Boundaries</h2>\n      </header>\n      <div class=\"scope-grid\">\n        <article class=\"scope-item\">\n          <h3 class=\"scope-title\">Included</h3>\n          <ul>\n            <li>Campaign CRUD and member linking</li>\n            <li>First-touch campaign attribution</li>\n            <li>Influenced pipeline and won revenue reporting</li>\n          </ul>\n        </article>\n        <article class=\"scope-item\">\n          <h3 class=\"scope-title\">Excluded</h3>\n          <ul>\n            <li>Email automation and journey orchestration</li>\n            <li>Multi-model attribution configuration</li>\n            <li>Weighted or time-decay attribution logic</li>\n          </ul>\n        </article>\n      </div>\n    </section>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.marketing-settings-page {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-subtitle {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(3, minmax(180px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.05rem, 1.35vw, 1.35rem);\n  }\n\n  .metric-card--model::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--scope::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--credit::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metrics-grid--pilot {\n    grid-template-columns: repeat(5, minmax(170px, 1fr));\n  }\n\n  .metric-card--pilot::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #334155 0%, #0f172a 100%);\n  }\n\n  .pilot-summary {\n    margin-top: 0.65rem;\n    color: #475569;\n    font-size: 0.92rem;\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.45rem;\n  }\n\n  .pilot-audit-link {\n    margin-left: auto;\n  }\n\n  .policy-card {\n    max-width: 980px;\n  }\n\n  .policy-body {\n    display: grid;\n    gap: 0.55rem;\n  }\n\n  .model-value {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  .model-description {\n    margin: 0;\n    color: #475569;\n  }\n\n  .policy-note {\n    margin: 0.35rem 0 0;\n    color: #64748b;\n    font-size: 0.9rem;\n  }\n\n  .scope-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.95rem;\n  }\n\n  .scope-item {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76) 0%, rgba(248, 250, 252, 0.68) 100%);\n    padding: 0.85rem;\n  }\n\n  .scope-title {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n\n  .scope-item ul {\n    margin: 0.65rem 0 0;\n    padding-left: 1.05rem;\n    display: grid;\n    gap: 0.35rem;\n    color: #475569;\n  }\n\n  @media (max-width: 980px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .metrics-grid--pilot {\n      grid-template-columns: 1fr;\n    }\n\n    .scope-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .pilot-audit-link {\n      margin-left: 0;\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MarketingSettingsPage, { className: "MarketingSettingsPage", filePath: "src/app/crm/features/settings/pages/marketing-settings.page.ts", lineNumber: 18 }); })();
