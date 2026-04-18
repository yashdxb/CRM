import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/table";
import * as i8 from "primeng/tag";
import * as i9 from "primeng/dialog";
const _c0 = () => ({ width: "min(860px, 96vw)" });
function CampaignAttributionPage_section_98_article_8_p_tag_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 81);
} if (rf & 2) {
    const chip_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", chip_r4);
} }
function CampaignAttributionPage_section_98_article_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 75)(1, "header", 67)(2, "div")(3, "h2", 68);
    i0.ɵɵtext(4, "Health Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 73);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "p-tag", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 77)(9, "div", 78);
    i0.ɵɵelement(10, "i");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "/100");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 79);
    i0.ɵɵtemplate(16, CampaignAttributionPage_section_98_article_8_p_tag_16_Template, 1, 1, "p-tag", 80);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const health_r5 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", health_r5.calculationWindowDays, " day window");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", health_r5.trend)("severity", ctx_r2.trendSeverity(health_r5.trend));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(ctx_r2.trendIcon(health_r5.trend));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(health_r5.score);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", health_r5.reasonChips);
} }
function CampaignAttributionPage_section_98_div_16_div_1_li_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ev_r7);
} }
function CampaignAttributionPage_section_98_div_16_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85);
    i0.ɵɵelement(2, "p-tag", 76);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3", 86);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 87);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 88);
    i0.ɵɵtext(11, "Estimated impact: ");
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "ul", 89);
    i0.ɵɵtemplate(15, CampaignAttributionPage_section_98_div_16_div_1_li_15_Template, 2, 1, "li", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 91);
    i0.ɵɵlistener("ngModelChange", function CampaignAttributionPage_section_98_div_16_div_1_Template_input_ngModelChange_16_listener($event) { const recommendation_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.updateRecommendationReason(recommendation_r8.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 92)(18, "button", 93);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_98_div_16_div_1_Template_button_click_18_listener() { const recommendation_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openOpportunityWorklist(recommendation_r8)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 94);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_98_div_16_div_1_Template_button_click_19_listener() { const recommendation_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r8, "accept")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 95);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_98_div_16_div_1_Template_button_click_20_listener() { const recommendation_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r8, "dismiss")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 96);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_98_div_16_div_1_Template_button_click_21_listener() { const recommendation_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r8, "snooze")); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const recommendation_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", recommendation_r8.severity)("severity", ctx_r2.recommendationSeverity(recommendation_r8.severity));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Confidence ", i0.ɵɵpipeBind2(5, 8, recommendation_r8.confidence * 100, "1.0-0"), "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(recommendation_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(recommendation_r8.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(recommendation_r8.impactEstimate));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", recommendation_r8.evidence);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.recommendationReason()[recommendation_r8.id] || "");
} }
function CampaignAttributionPage_section_98_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82);
    i0.ɵɵtemplate(1, CampaignAttributionPage_section_98_div_16_div_1_Template, 22, 11, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.recommendations());
} }
function CampaignAttributionPage_section_98_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 65)(1, "article", 66)(2, "header", 67)(3, "h2", 68);
    i0.ɵɵtext(4, "Decision Cockpit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "label", 69);
    i0.ɵɵtext(6, "Campaign");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-select", 70);
    i0.ɵɵlistener("ngModelChange", function CampaignAttributionPage_section_98_Template_p_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectCampaign($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, CampaignAttributionPage_section_98_article_8_Template, 17, 7, "article", 71);
    i0.ɵɵelementStart(9, "article", 72)(10, "header", 67)(11, "div")(12, "h2", 68);
    i0.ɵɵtext(13, "Next Best Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 73);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(16, CampaignAttributionPage_section_98_div_16_Template, 2, 1, "div", 74);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const selected_r9 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    const noRecommendationsTpl_r10 = i0.ɵɵreference(106);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("options", ctx_r2.items())("ngModel", selected_r9.campaignId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.healthScore());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("Top ", ctx_r2.recommendations().length, " active recommendations");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.recommendations().length)("ngIfElse", noRecommendationsTpl_r10);
} }
function CampaignAttributionPage_section_99_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 105)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 106)(5, "span", 107);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 107);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 107);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 108);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_99_div_11_div_1_Template_button_click_11_listener() { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openCampaignImpactWorklist(row_r12.campaignId, row_r12.campaignName, "positive")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r12.campaignName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedMoney(row_r12.pipeline));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedMoney(row_r12.won));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedPercent(row_r12.conversion));
} }
function CampaignAttributionPage_section_99_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103);
    i0.ɵɵtemplate(1, CampaignAttributionPage_section_99_div_11_div_1_Template, 12, 4, "div", 104);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.topPositiveImpact());
} }
function CampaignAttributionPage_section_99_div_15_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 105)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 106)(5, "span", 109);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 109);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 109);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 108);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_99_div_15_div_1_Template_button_click_11_listener() { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openCampaignImpactWorklist(row_r14.campaignId, row_r14.campaignName, "negative")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r14.campaignName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedMoney(row_r14.pipeline));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedMoney(row_r14.won));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatSignedPercent(row_r14.conversion));
} }
function CampaignAttributionPage_section_99_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103);
    i0.ɵɵtemplate(1, CampaignAttributionPage_section_99_div_15_div_1_Template, 12, 4, "div", 104);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.topNegativeImpact());
} }
function CampaignAttributionPage_section_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 97)(1, "header", 67)(2, "div")(3, "h2", 68);
    i0.ɵɵtext(4, "Model Impact vs First-touch");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 73);
    i0.ɵɵtext(6, "Top campaigns with highest positive and negative pipeline shifts");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 98)(8, "article", 99)(9, "h3", 100);
    i0.ɵɵtext(10, "Top Positive");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, CampaignAttributionPage_section_99_div_11_Template, 2, 1, "div", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "article", 99)(13, "h3", 102);
    i0.ɵɵtext(14, "Top Negative");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, CampaignAttributionPage_section_99_div_15_Template, 2, 1, "div", 101);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const noPositiveTpl_r15 = i0.ɵɵreference(112);
    const noNegativeTpl_r16 = i0.ɵɵreference(114);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r2.topPositiveImpact().length)("ngIfElse", noPositiveTpl_r15);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r2.topNegativeImpact().length)("ngIfElse", noNegativeTpl_r16);
} }
function CampaignAttributionPage_section_100_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 115);
    i0.ɵɵtext(2, "Campaign ");
    i0.ɵɵelement(3, "p-sortIcon", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "th", 117);
    i0.ɵɵtext(5, "Status ");
    i0.ɵɵelement(6, "p-sortIcon", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 119);
    i0.ɵɵtext(8, "Influenced Opps ");
    i0.ɵɵelement(9, "p-sortIcon", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 121);
    i0.ɵɵtext(11, "Influenced Pipeline ");
    i0.ɵɵelement(12, "p-sortIcon", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 123);
    i0.ɵɵtext(14, "Won Revenue ");
    i0.ɵɵelement(15, "p-sortIcon", 124);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 125);
    i0.ɵɵtext(17, "Conversion ");
    i0.ɵɵelement(18, "p-sortIcon", 126);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "\u0394 Pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th");
    i0.ɵɵtext(22, "\u0394 Won");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th");
    i0.ɵɵtext(24, "\u0394 Conv");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th");
    i0.ɵɵtext(26, "Actions");
    i0.ɵɵelementEnd()();
} }
function CampaignAttributionPage_section_100_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵelement(4, "p-tag", 127);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 128);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 128);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 128);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 128);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 129);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 129);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 129);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td")(20, "button", 130);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_100_ng_template_10_Template_button_click_20_listener() { const row_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectCampaign(row_r18.campaignId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 131);
    i0.ɵɵlistener("click", function CampaignAttributionPage_section_100_ng_template_10_Template_button_click_21_listener() { const row_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(row_r18.sampleOpportunityId && ctx_r2.showExplainability(row_r18.sampleOpportunityId)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.campaignName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("severity", ctx_r2.statusSeverity(row_r18.status))("value", row_r18.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.influencedOpportunities);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(row_r18.influencedPipelineAmount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(row_r18.wonRevenue));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", row_r18.conversionRate, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.deltaClass(ctx_r2.rowDelta(row_r18).pipeline));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatSignedMoney(ctx_r2.rowDelta(row_r18).pipeline), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.deltaClass(ctx_r2.rowDelta(row_r18).won));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatSignedMoney(ctx_r2.rowDelta(row_r18).won), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.deltaClass(ctx_r2.rowDelta(row_r18).conversion));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatSignedPercent(ctx_r2.rowDelta(row_r18).conversion), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !row_r18.sampleOpportunityId || !ctx_r2.canExplainAttribution());
} }
function CampaignAttributionPage_section_100_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 132);
    i0.ɵɵtext(2, "No attribution rows yet.");
    i0.ɵɵelementEnd()();
} }
function CampaignAttributionPage_section_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 75)(1, "header", 67)(2, "div")(3, "h2", 68);
    i0.ɵɵtext(4, "Attribution Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 73);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 110)(8, "p-table", 111);
    i0.ɵɵtemplate(9, CampaignAttributionPage_section_100_ng_template_9_Template, 27, 0, "ng-template", 112)(10, CampaignAttributionPage_section_100_ng_template_10_Template, 22, 14, "ng-template", 113)(11, CampaignAttributionPage_section_100_ng_template_11_Template, 3, 0, "ng-template", 114);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r2.filteredItems().length, " campaign rows");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r2.filteredItems())("rowHover", true)("paginator", true)("rows", 10)("rowsPerPageOptions", ctx_r2.rowsPerPageOptions)("showCurrentPageReport", true);
} }
function CampaignAttributionPage_ng_container_102_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const expl_r19 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2022 Rule: ", expl_r19.ruleVersion);
} }
function CampaignAttributionPage_ng_container_102_div_1_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 135);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const expl_r19 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Attributed: ", i0.ɵɵpipeBind2(2, 1, expl_r19.attributedUtc, "short"));
} }
function CampaignAttributionPage_ng_container_102_div_1_li_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ev_r20 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ev_r20);
} }
function CampaignAttributionPage_ng_container_102_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 134)(1, "p", 135);
    i0.ɵɵtext(2, " Model: ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CampaignAttributionPage_ng_container_102_div_1_span_5_Template, 2, 1, "span", 136);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CampaignAttributionPage_ng_container_102_div_1_p_6_Template, 3, 4, "p", 137);
    i0.ɵɵelementStart(7, "ul", 89);
    i0.ɵɵtemplate(8, CampaignAttributionPage_ng_container_102_div_1_li_8_Template, 2, 1, "li", 90);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const expl_r19 = ctx.ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(expl_r19.model);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", expl_r19.ruleVersion);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", expl_r19.attributedUtc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", expl_r19.evidence);
} }
function CampaignAttributionPage_ng_container_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CampaignAttributionPage_ng_container_102_div_1_Template, 9, 4, "div", 133);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const explainEmptyTpl_r21 = i0.ɵɵreference(110);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.explainability())("ngIfElse", explainEmptyTpl_r21);
} }
function CampaignAttributionPage_ng_template_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 138);
    i0.ɵɵtext(1, "Loading attribution summary...");
    i0.ɵɵelementEnd();
} }
function CampaignAttributionPage_ng_template_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtext(1, "No active recommendations available for this campaign.");
    i0.ɵɵelementEnd();
} }
function CampaignAttributionPage_ng_template_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 140);
    i0.ɵɵtext(1, "Loading explainability...");
    i0.ɵɵelementEnd();
} }
function CampaignAttributionPage_ng_template_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtext(1, "No explainability details available.");
    i0.ɵɵelementEnd();
} }
function CampaignAttributionPage_ng_template_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtext(1, "No positive shifts in this view.");
    i0.ɵɵelementEnd();
} }
function CampaignAttributionPage_ng_template_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtext(1, "No negative shifts in this view.");
    i0.ɵɵelementEnd();
} }
export class CampaignAttributionPage {
    items = signal([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    firstTouchBaseline = signal([], ...(ngDevMode ? [{ debugName: "firstTouchBaseline" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    searchTerm = signal('', ...(ngDevMode ? [{ debugName: "searchTerm" }] : []));
    selectedModel = signal('first_touch', ...(ngDevMode ? [{ debugName: "selectedModel" }] : []));
    attributionModels = [
        { label: 'First-touch (source of truth)', value: 'first_touch' },
        { label: 'Last-touch (compare)', value: 'last_touch' },
        { label: 'Linear (compare)', value: 'linear' }
    ];
    rowsPerPageOptions = [10, 20, 50];
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    selectedCampaignId = signal(null, ...(ngDevMode ? [{ debugName: "selectedCampaignId" }] : []));
    healthScore = signal(null, ...(ngDevMode ? [{ debugName: "healthScore" }] : []));
    recommendations = signal([], ...(ngDevMode ? [{ debugName: "recommendations" }] : []));
    recommendationReason = signal({}, ...(ngDevMode ? [{ debugName: "recommendationReason" }] : []));
    explainabilityOpen = signal(false, ...(ngDevMode ? [{ debugName: "explainabilityOpen" }] : []));
    explainability = signal(null, ...(ngDevMode ? [{ debugName: "explainability" }] : []));
    loadingExplainability = signal(false, ...(ngDevMode ? [{ debugName: "loadingExplainability" }] : []));
    filteredItems = computed(() => {
        const term = this.searchTerm().trim().toLowerCase();
        if (!term) {
            return this.items();
        }
        return this.items().filter((item) => item.campaignName.toLowerCase().includes(term) || item.status.toLowerCase().includes(term));
    }, ...(ngDevMode ? [{ debugName: "filteredItems" }] : []));
    canExplainAttribution = computed(() => this.selectedModel() === 'first_touch', ...(ngDevMode ? [{ debugName: "canExplainAttribution" }] : []));
    totals = computed(() => {
        const rows = this.filteredItems();
        return {
            campaigns: rows.length,
            influenced: rows.reduce((sum, row) => sum + row.influencedOpportunities, 0),
            pipeline: rows.reduce((sum, row) => sum + row.influencedPipelineAmount, 0),
            won: rows.reduce((sum, row) => sum + row.wonRevenue, 0),
            avgConversion: rows.length ? rows.reduce((sum, row) => sum + row.conversionRate, 0) / rows.length : 0
        };
    }, ...(ngDevMode ? [{ debugName: "totals" }] : []));
    firstTouchByCampaign = computed(() => {
        return new Map(this.firstTouchBaseline().map((row) => [row.campaignId, row]));
    }, ...(ngDevMode ? [{ debugName: "firstTouchByCampaign" }] : []));
    baselineTotals = computed(() => {
        const rows = this.filteredItems();
        const baseline = this.firstTouchByCampaign();
        let pipeline = 0;
        let won = 0;
        let conversion = 0;
        for (const row of rows) {
            const source = baseline.get(row.campaignId);
            pipeline += source?.influencedPipelineAmount ?? 0;
            won += source?.wonRevenue ?? 0;
            conversion += source?.conversionRate ?? 0;
        }
        return {
            pipeline,
            won,
            avgConversion: rows.length ? conversion / rows.length : 0
        };
    }, ...(ngDevMode ? [{ debugName: "baselineTotals" }] : []));
    deltaTotals = computed(() => {
        const totals = this.totals();
        const baseline = this.baselineTotals();
        return {
            pipeline: totals.pipeline - baseline.pipeline,
            won: totals.won - baseline.won,
            avgConversion: totals.avgConversion - baseline.avgConversion
        };
    }, ...(ngDevMode ? [{ debugName: "deltaTotals" }] : []));
    topPositiveImpact = computed(() => {
        return this.filteredItems()
            .map((row) => {
            const delta = this.rowDelta(row);
            return {
                campaignId: row.campaignId,
                campaignName: row.campaignName,
                pipeline: delta.pipeline,
                won: delta.won,
                conversion: delta.conversion
            };
        })
            .filter((row) => row.pipeline > 0.001 || row.won > 0.001 || row.conversion > 0.001)
            .sort((a, b) => b.pipeline - a.pipeline)
            .slice(0, 3);
    }, ...(ngDevMode ? [{ debugName: "topPositiveImpact" }] : []));
    topNegativeImpact = computed(() => {
        return this.filteredItems()
            .map((row) => {
            const delta = this.rowDelta(row);
            return {
                campaignId: row.campaignId,
                campaignName: row.campaignName,
                pipeline: delta.pipeline,
                won: delta.won,
                conversion: delta.conversion
            };
        })
            .filter((row) => row.pipeline < -0.001 || row.won < -0.001 || row.conversion < -0.001)
            .sort((a, b) => a.pipeline - b.pipeline)
            .slice(0, 3);
    }, ...(ngDevMode ? [{ debugName: "topNegativeImpact" }] : []));
    selectedCampaign = computed(() => {
        const selected = this.selectedCampaignId();
        if (!selected)
            return null;
        return this.items().find((item) => item.campaignId === selected) ?? null;
    }, ...(ngDevMode ? [{ debugName: "selectedCampaign" }] : []));
    data = inject(MarketingDataService);
    toast = inject(AppToastService);
    router = inject(Router);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    constructor() {
        this.loadCurrencyContext();
        this.load();
    }
    load() {
        this.loading.set(true);
        forkJoin({
            selected: this.data.getAttributionSummary(this.selectedModel()),
            firstTouch: this.data.getAttributionSummary('first_touch')
        }).subscribe({
            next: ({ selected, firstTouch }) => {
                this.items.set(selected);
                this.firstTouchBaseline.set(firstTouch);
                this.loading.set(false);
                if (!selected.length) {
                    this.selectedCampaignId.set(null);
                    this.healthScore.set(null);
                    this.recommendations.set([]);
                    return;
                }
                const currentSelected = this.selectedCampaignId();
                const nextSelected = currentSelected && selected.some((r) => r.campaignId === currentSelected)
                    ? currentSelected
                    : selected[0].campaignId;
                this.selectCampaign(nextSelected);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load attribution summary.');
            }
        });
    }
    selectCampaign(campaignId) {
        this.selectedCampaignId.set(campaignId);
        this.data.getCampaignHealthScore(campaignId).subscribe({
            next: (res) => this.healthScore.set(res),
            error: () => this.healthScore.set(null)
        });
        this.data.getCampaignRecommendations(campaignId).subscribe({
            next: (rows) => this.recommendations.set(rows),
            error: () => this.recommendations.set([])
        });
    }
    updateRecommendationReason(recommendationId, value) {
        this.recommendationReason.set({
            ...this.recommendationReason(),
            [recommendationId]: value
        });
    }
    decideRecommendation(recommendation, decision) {
        this.data.applyRecommendationDecision(recommendation.id, {
            decision,
            reason: this.recommendationReason()[recommendation.id] ?? undefined,
            applyActions: true
        }).subscribe({
            next: () => {
                this.toast.show('success', `Recommendation ${decision}ed.`);
                const campaignId = this.selectedCampaignId();
                if (campaignId) {
                    this.selectCampaign(campaignId);
                }
            },
            error: () => this.toast.show('error', 'Unable to apply recommendation decision.')
        });
    }
    openOpportunityWorklist(recommendation) {
        const campaignName = this.selectedCampaign()?.campaignName ?? 'campaign';
        this.router.navigate(['/app/deals'], {
            queryParams: {
                search: campaignName,
                focus: recommendation.type.replaceAll('_', ' ')
            }
        });
    }
    openCampaignImpactWorklist(campaignId, campaignName, direction) {
        const navigate = () => this.router.navigate(['/app/deals'], {
            queryParams: {
                search: campaignName,
                focus: direction === 'positive' ? 'model gain' : 'model loss'
            }
        });
        this.data.trackImpactWorklistClick({
            campaignId,
            campaignName,
            model: this.selectedModel(),
            direction
        }).subscribe({
            next: () => navigate(),
            error: () => navigate()
        });
    }
    showExplainability(opportunityId) {
        if (!this.canExplainAttribution()) {
            this.toast.show('success', 'Explainability is available for first-touch model only.');
            return;
        }
        this.loadingExplainability.set(true);
        this.explainabilityOpen.set(true);
        this.data.explainOpportunityAttribution(opportunityId).subscribe({
            next: (result) => {
                this.explainability.set(result);
                this.loadingExplainability.set(false);
            },
            error: () => {
                this.loadingExplainability.set(false);
                this.explainability.set(null);
                this.toast.show('error', 'Unable to load explainability details.');
            }
        });
    }
    closeExplainability() {
        this.explainabilityOpen.set(false);
        this.explainability.set(null);
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
    openCampaigns() {
        this.router.navigate(['/app/marketing/campaigns']);
    }
    openSettings() {
        this.router.navigate(['/app/settings/marketing']);
    }
    changeAttributionModel(model) {
        this.selectedModel.set(model);
        this.load();
    }
    statusSeverity(status) {
        const normalized = status?.toLowerCase();
        if (normalized === 'active') {
            return 'success';
        }
        if (normalized === 'planned' || normalized === 'draft') {
            return 'info';
        }
        if (normalized === 'completed') {
            return 'secondary';
        }
        return 'warn';
    }
    recommendationSeverity(severity) {
        const normalized = severity?.toLowerCase();
        if (normalized === 'success')
            return 'success';
        if (normalized === 'warn')
            return 'warn';
        if (normalized === 'danger')
            return 'danger';
        if (normalized === 'secondary')
            return 'secondary';
        return 'info';
    }
    trendIcon(trend) {
        if (trend === 'up')
            return 'pi pi-arrow-up';
        if (trend === 'down')
            return 'pi pi-arrow-down';
        return 'pi pi-minus';
    }
    trendSeverity(trend) {
        if (trend === 'up')
            return 'success';
        if (trend === 'down')
            return 'danger';
        return 'info';
    }
    rowDelta(row) {
        const baseline = this.firstTouchByCampaign().get(row.campaignId);
        return {
            pipeline: row.influencedPipelineAmount - (baseline?.influencedPipelineAmount ?? 0),
            won: row.wonRevenue - (baseline?.wonRevenue ?? 0),
            conversion: row.conversionRate - (baseline?.conversionRate ?? 0)
        };
    }
    deltaClass(value) {
        if (value > 0.001)
            return 'delta-positive';
        if (value < -0.001)
            return 'delta-negative';
        return 'delta-neutral';
    }
    formatSignedMoney(value) {
        if (value === 0) {
            return this.formatMoney(0);
        }
        const sign = value > 0 ? '+' : '-';
        return `${sign}${this.formatMoney(Math.abs(value))}`;
    }
    formatSignedPercent(value) {
        const abs = Math.abs(value).toFixed(2);
        const sign = value > 0 ? '+' : value < 0 ? '-' : '';
        return `${sign}${abs}%`;
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
    static ɵfac = function CampaignAttributionPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignAttributionPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignAttributionPage, selectors: [["app-campaign-attribution-page"]], decls: 115, vars: 31, consts: [["loadingTpl", ""], ["noRecommendationsTpl", ""], ["explainLoadingTpl", ""], ["explainEmptyTpl", ""], ["noPositiveTpl", ""], ["noNegativeTpl", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "campaign-attribution-page", "page-container"], [1, "page-content"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "icon", "pi pi-list", "label", "Campaigns", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-cog", "label", "Settings", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-refresh", "label", "Refresh", 1, "crm-button", "crm-button--text", 3, "click"], [1, "metrics-dashboard"], [1, "metrics-grid"], [1, "metric-card", "metric-card--campaigns"], [1, "metric-header"], [1, "metric-icon", "primary"], [1, "pi", "pi-megaphone"], [1, "metric-trend"], [1, "pi", "pi-list"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--influenced"], [1, "metric-icon", "info"], [1, "pi", "pi-briefcase"], [1, "pi", "pi-bolt"], [1, "metric-card", "metric-card--pipeline"], [1, "metric-icon", "warning"], [1, "pi", "pi-chart-line"], [1, "pi", "pi-chart-bar"], [1, "metric-delta", 3, "ngClass"], [1, "metric-card", "metric-card--won"], [1, "metric-icon", "success"], [1, "pi", "pi-check-circle"], [1, "metric-trend", "up"], [1, "pi", "pi-trophy"], [1, "metric-card", "metric-card--conversion"], [1, "metric-icon", "secondary"], [1, "pi", "pi-percentage"], [1, "filter-bar", "glass-card", "no-hover"], [1, "filter-content"], [1, "search-wrapper"], [1, "pi", "pi-search"], ["pInputText", "", "type", "search", "placeholder", "Search campaign", 3, "ngModelChange", "ngModel"], [1, "filter-group"], ["for", "attribution-model"], ["inputId", "attribution-model", "appendTo", "body", "optionLabel", "label", "optionValue", "value", 3, "ngModelChange", "options", "ngModel"], ["class", "insights-grid", 4, "ngIf"], ["class", "data-card no-hover model-impact-card", 4, "ngIf"], ["class", "data-card no-hover", 4, "ngIf", "ngIfElse"], ["header", "Attribution Explainability", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask", "draggable", "resizable"], [4, "ngIf", "ngIfElse"], [1, "insights-grid"], [1, "data-card", "no-hover", "campaign-selector-card"], [1, "data-card-header"], [1, "section-title"], [1, "selector-label"], ["appendTo", "body", "optionLabel", "campaignName", "optionValue", "campaignId", 3, "ngModelChange", "options", "ngModel"], ["class", "data-card no-hover", 4, "ngIf"], [1, "data-card", "no-hover", "recommendations-card"], [1, "data-card-subtitle"], ["class", "recommendation-list", 4, "ngIf", "ngIfElse"], [1, "data-card", "no-hover"], [3, "value", "severity"], [1, "health-inline"], [1, "health-pill"], [1, "health-chips"], ["severity", "secondary", 3, "value", 4, "ngFor", "ngForOf"], ["severity", "secondary", 3, "value"], [1, "recommendation-list"], ["class", "recommendation-item", 4, "ngFor", "ngForOf"], [1, "recommendation-item"], [1, "recommendation-item__head"], [1, "recommendation-title"], [1, "recommendation-description"], [1, "recommendation-impact"], [1, "evidence-list"], [4, "ngFor", "ngForOf"], ["pInputText", "", "type", "text", "placeholder", "Optional decision reason", 3, "ngModelChange", "ngModel"], [1, "recommendation-actions"], ["pButton", "", "type", "button", "icon", "pi pi-list", "label", "Open Worklist", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-check", "label", "Accept", 1, "crm-button", "crm-button--primary", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-times", "label", "Dismiss", 1, "crm-button", "crm-button--text", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-clock", "label", "Snooze", 1, "crm-button", "crm-button--text", 3, "click"], [1, "data-card", "no-hover", "model-impact-card"], [1, "impact-grid"], [1, "impact-column"], [1, "impact-title", "positive"], ["class", "impact-list", 4, "ngIf", "ngIfElse"], [1, "impact-title", "negative"], [1, "impact-list"], ["class", "impact-row", 4, "ngFor", "ngForOf"], [1, "impact-row"], [1, "impact-metrics"], [1, "delta-positive"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-right", "label", "Open Worklist", 1, "crm-button", "crm-button--text", "impact-action-btn", 3, "click"], [1, "delta-negative"], [1, "table-wrap"], ["styleClass", "crm-table", "currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} campaigns", "sortMode", "multiple", 3, "value", "rowHover", "paginator", "rows", "rowsPerPageOptions", "showCurrentPageReport"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["pSortableColumn", "campaignName"], ["field", "campaignName"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "influencedOpportunities"], ["field", "influencedOpportunities"], ["pSortableColumn", "influencedPipelineAmount"], ["field", "influencedPipelineAmount"], ["pSortableColumn", "wonRevenue"], ["field", "wonRevenue"], ["pSortableColumn", "conversionRate"], ["field", "conversionRate"], [3, "severity", "value"], [1, "cell-numeric"], [1, "cell-numeric", "cell-delta", 3, "ngClass"], ["pButton", "", "type", "button", "icon", "pi pi-eye", "label", "Focus", 1, "crm-button", "crm-button--text", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-info-circle", "label", "Explain", 1, "crm-button", "crm-button--text", 3, "click", "disabled"], ["colspan", "10", 1, "empty"], ["class", "explainability", 4, "ngIf", "ngIfElse"], [1, "explainability"], [1, "explainability-meta"], [4, "ngIf"], ["class", "explainability-meta", 4, "ngIf"], [1, "crm-panel", "loading"], [1, "empty"], [1, "loading"]], template: function CampaignAttributionPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelement(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 11)(6, "div", 12);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "section", 13)(9, "div", 14)(10, "div", 15);
            i0.ɵɵelement(11, "span", 16);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Attribution Analytics");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 17)(15, "span", 18);
            i0.ɵɵtext(16, "Campaign");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 19);
            i0.ɵɵtext(18, "Attribution");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "p", 20);
            i0.ɵɵtext(20, "First-touch contribution from campaigns to influenced pipeline and won revenue.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 21)(22, "button", 22);
            i0.ɵɵlistener("click", function CampaignAttributionPage_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openCampaigns()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 23);
            i0.ɵɵlistener("click", function CampaignAttributionPage_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openSettings()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 24);
            i0.ɵɵlistener("click", function CampaignAttributionPage_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "section", 25)(26, "div", 26)(27, "article", 27)(28, "div", 28)(29, "div", 29);
            i0.ɵɵelement(30, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 31);
            i0.ɵɵelement(32, "i", 32);
            i0.ɵɵtext(33, " Active set");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "span", 33);
            i0.ɵɵtext(35, "Campaigns");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "strong", 34);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "article", 35)(39, "div", 28)(40, "div", 36);
            i0.ɵɵelement(41, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "span", 31);
            i0.ɵɵelement(43, "i", 38);
            i0.ɵɵtext(44, " First-touch");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "span", 33);
            i0.ɵɵtext(46, "Influenced Opps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "strong", 34);
            i0.ɵɵtext(48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "article", 39)(50, "div", 28)(51, "div", 40);
            i0.ɵɵelement(52, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 31);
            i0.ɵɵelement(54, "i", 42);
            i0.ɵɵtext(55, " Influenced");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "span", 33);
            i0.ɵɵtext(57, "Influenced Pipeline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "strong", 34);
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "span", 43);
            i0.ɵɵtext(61);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "article", 44)(63, "div", 28)(64, "div", 45);
            i0.ɵɵelement(65, "i", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "span", 47);
            i0.ɵɵelement(67, "i", 48);
            i0.ɵɵtext(68, " Closed won");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(69, "span", 33);
            i0.ɵɵtext(70, "Won Revenue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "strong", 34);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span", 43);
            i0.ɵɵtext(74);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "article", 49)(76, "div", 28)(77, "div", 50);
            i0.ɵɵelement(78, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 31);
            i0.ɵɵelement(80, "i", 41);
            i0.ɵɵtext(81, " Campaign avg");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "span", 33);
            i0.ɵɵtext(83, "Conversion");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "strong", 34);
            i0.ɵɵtext(85);
            i0.ɵɵpipe(86, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "span", 43);
            i0.ɵɵtext(88);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(89, "section", 52)(90, "div", 53)(91, "div", 54);
            i0.ɵɵelement(92, "i", 55);
            i0.ɵɵelementStart(93, "input", 56);
            i0.ɵɵlistener("ngModelChange", function CampaignAttributionPage_Template_input_ngModelChange_93_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.searchTerm.set($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(94, "div", 57)(95, "label", 58);
            i0.ɵɵtext(96, "Model");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "p-select", 59);
            i0.ɵɵlistener("ngModelChange", function CampaignAttributionPage_Template_p_select_ngModelChange_97_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeAttributionModel($event)); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(98, CampaignAttributionPage_section_98_Template, 17, 6, "section", 60)(99, CampaignAttributionPage_section_99_Template, 16, 4, "section", 61)(100, CampaignAttributionPage_section_100_Template, 12, 7, "section", 62);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "p-dialog", 63);
            i0.ɵɵlistener("visibleChange", function CampaignAttributionPage_Template_p_dialog_visibleChange_101_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.explainabilityOpen.set($event)); })("onHide", function CampaignAttributionPage_Template_p_dialog_onHide_101_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeExplainability()); });
            i0.ɵɵtemplate(102, CampaignAttributionPage_ng_container_102_Template, 2, 2, "ng-container", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(103, CampaignAttributionPage_ng_template_103_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(105, CampaignAttributionPage_ng_template_105_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(107, CampaignAttributionPage_ng_template_107_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(109, CampaignAttributionPage_ng_template_109_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(111, CampaignAttributionPage_ng_template_111_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(113, CampaignAttributionPage_ng_template_113_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const loadingTpl_r22 = i0.ɵɵreference(104);
            const explainLoadingTpl_r23 = i0.ɵɵreference(108);
            i0.ɵɵadvance(37);
            i0.ɵɵtextInterpolate(ctx.totals().campaigns);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.totals().influenced);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.totals().pipeline));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.deltaClass(ctx.deltaTotals().pipeline));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" vs First-touch ", ctx.formatSignedMoney(ctx.deltaTotals().pipeline), " ");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.formatMoney(ctx.totals().won));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.deltaClass(ctx.deltaTotals().won));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" vs First-touch ", ctx.formatSignedMoney(ctx.deltaTotals().won), " ");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(86, 27, ctx.totals().avgConversion, "1.2-2"), "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", ctx.deltaClass(ctx.deltaTotals().avgConversion));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" vs First-touch ", ctx.formatSignedPercent(ctx.deltaTotals().avgConversion), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.searchTerm());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.attributionModels)("ngModel", ctx.selectedModel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedCampaign());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedModel() !== "first_touch");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingTpl_r22);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(30, _c0));
            i0.ɵɵproperty("visible", ctx.explainabilityOpen())("modal", true)("dismissableMask", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingExplainability())("ngIfElse", explainLoadingTpl_r23);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, SelectModule, i6.Select, TableModule, i7.Table, i7.SortableColumn, i7.SortIcon, TagModule, i8.Tag, DialogModule, i9.Dialog, BreadcrumbsComponent, i1.DecimalPipe, i1.DatePipe], styles: [".campaign-attribution-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-description {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(5, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.1rem, 1.45vw, 1.45rem);\n  }\n\n  .metric-card--campaigns::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--influenced::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--pipeline::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metric-card--won::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);\n  }\n\n  .metric-card--conversion::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);\n  }\n\n  .metric-delta {\n    margin-top: 0.25rem;\n    font-size: 0.78rem;\n    font-weight: 600;\n  }\n\n  .insights-grid {\n    display: grid;\n    gap: 0.9rem;\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .campaign-selector-card {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .selector-label {\n    font-size: 0.82rem;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .health-inline {\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  .health-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    width: fit-content;\n    padding: 0.5rem 0.8rem;\n    border-radius: 999px;\n    background: rgba(59, 130, 246, 0.14);\n    color: #1d4ed8;\n    border: 1px solid rgba(59, 130, 246, 0.3);\n  }\n\n  .health-pill strong {\n    font-size: 1.15rem;\n  }\n\n  .health-chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n\n  .recommendations-card {\n    grid-column: span 3;\n  }\n\n  .recommendation-list {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .recommendation-item {\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.76) 100%);\n    padding: 0.8rem;\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .recommendation-item__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    color: #64748b;\n    font-size: 0.82rem;\n  }\n\n  .recommendation-title {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n\n  .recommendation-description,\n  .recommendation-impact,\n  .explainability-meta {\n    margin: 0;\n    color: #475569;\n  }\n\n  .evidence-list {\n    margin: 0;\n    padding-left: 1rem;\n    color: #475569;\n    display: grid;\n    gap: 0.18rem;\n  }\n\n  .recommendation-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  .filter-group {\n    display: grid;\n    gap: 0.35rem;\n    min-width: 280px;\n  }\n\n  .filter-group label {\n    font-size: 0.82rem;\n    font-weight: 600;\n    color: #64748b;\n  }\n\n  .cell-numeric {\n    text-align: right;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .cell-delta {\n    font-weight: 600;\n  }\n\n  .model-impact-card {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .impact-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.85rem;\n  }\n\n  .impact-column {\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.85) 100%);\n    padding: 0.75rem;\n    display: grid;\n    gap: 0.55rem;\n  }\n\n  .impact-title {\n    margin: 0;\n    font-size: 0.95rem;\n  }\n\n  .impact-title.positive {\n    color: #15803d;\n  }\n\n  .impact-title.negative {\n    color: #b91c1c;\n  }\n\n  .impact-list {\n    display: grid;\n    gap: 0.5rem;\n  }\n\n  .impact-row {\n    display: grid;\n    grid-template-columns: minmax(160px, 1fr) auto auto;\n    align-items: center;\n    gap: 0.5rem;\n    border-top: 1px dashed rgba(148, 163, 184, 0.35);\n    padding-top: 0.45rem;\n  }\n\n  .impact-metrics {\n    display: flex;\n    gap: 0.5rem;\n    font-size: 0.8rem;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n\n  .impact-action-btn {\n    white-space: nowrap;\n  }\n\n  .delta-positive {\n    color: #15803d;\n  }\n\n  .delta-negative {\n    color: #b91c1c;\n  }\n\n  .delta-neutral {\n    color: #475569;\n  }\n\n  ::ng-deep .crm-table .p-sortable-column .p-sortable-column-icon {\n    margin-left: 0.35rem;\n    font-size: 0.75rem;\n    color: #64748b;\n  }\n\n  ::ng-deep .crm-table .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.25);\n    background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%);\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 1100px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(170px, 1fr));\n    }\n\n    .insights-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .recommendations-card {\n      grid-column: span 1;\n    }\n\n    .impact-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .impact-row {\n      grid-template-columns: 1fr;\n      justify-items: start;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignAttributionPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-attribution-page', standalone: true, imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, TagModule, DialogModule, BreadcrumbsComponent], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"campaign-attribution-page page-container\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Attribution Analytics</span>\n        </div>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Campaign</span>\n          <span class=\"title-light\">Attribution</span>\n        </h1>\n        <p class=\"hero-description\">First-touch contribution from campaigns to influenced pipeline and won revenue.</p>\n        <div class=\"hero-actions\">\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-list\" label=\"Campaigns\" (click)=\"openCampaigns()\"></button>\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-cog\" label=\"Settings\" (click)=\"openSettings()\"></button>\n          <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-refresh\" label=\"Refresh\" (click)=\"load()\"></button>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"metrics-dashboard\">\n      <div class=\"metrics-grid\">\n        <article class=\"metric-card metric-card--campaigns\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-megaphone\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-list\"></i> Active set</span>\n          </div>\n          <span class=\"metric-label\">Campaigns</span>\n          <strong class=\"metric-value\">{{ totals().campaigns }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--influenced\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-briefcase\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-bolt\"></i> First-touch</span>\n          </div>\n          <span class=\"metric-label\">Influenced Opps</span>\n          <strong class=\"metric-value\">{{ totals().influenced }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--pipeline\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-chart-line\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-chart-bar\"></i> Influenced</span>\n          </div>\n          <span class=\"metric-label\">Influenced Pipeline</span>\n          <strong class=\"metric-value\">{{ formatMoney(totals().pipeline) }}</strong>\n          <span class=\"metric-delta\" [ngClass]=\"deltaClass(deltaTotals().pipeline)\">\n            vs First-touch {{ formatSignedMoney(deltaTotals().pipeline) }}\n          </span>\n        </article>\n        <article class=\"metric-card metric-card--won\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon success\"><i class=\"pi pi-check-circle\"></i></div>\n            <span class=\"metric-trend up\"><i class=\"pi pi-trophy\"></i> Closed won</span>\n          </div>\n          <span class=\"metric-label\">Won Revenue</span>\n          <strong class=\"metric-value\">{{ formatMoney(totals().won) }}</strong>\n          <span class=\"metric-delta\" [ngClass]=\"deltaClass(deltaTotals().won)\">\n            vs First-touch {{ formatSignedMoney(deltaTotals().won) }}\n          </span>\n        </article>\n        <article class=\"metric-card metric-card--conversion\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon secondary\"><i class=\"pi pi-percentage\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-chart-line\"></i> Campaign avg</span>\n          </div>\n          <span class=\"metric-label\">Conversion</span>\n          <strong class=\"metric-value\">{{ totals().avgConversion | number:'1.2-2' }}%</strong>\n          <span class=\"metric-delta\" [ngClass]=\"deltaClass(deltaTotals().avgConversion)\">\n            vs First-touch {{ formatSignedPercent(deltaTotals().avgConversion) }}\n          </span>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"filter-bar glass-card no-hover\">\n      <div class=\"filter-content\">\n        <div class=\"search-wrapper\">\n          <i class=\"pi pi-search\"></i>\n          <input\n            pInputText\n            type=\"search\"\n            [ngModel]=\"searchTerm()\"\n            (ngModelChange)=\"searchTerm.set($event)\"\n            placeholder=\"Search campaign\"\n          />\n        </div>\n        <div class=\"filter-group\">\n          <label for=\"attribution-model\">Model</label>\n          <p-select\n            inputId=\"attribution-model\"\n            appendTo=\"body\"\n            [options]=\"attributionModels\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"selectedModel()\"\n            (ngModelChange)=\"changeAttributionModel($event)\"\n          ></p-select>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"insights-grid\" *ngIf=\"selectedCampaign() as selected\">\n      <article class=\"data-card no-hover campaign-selector-card\">\n        <header class=\"data-card-header\">\n          <h2 class=\"section-title\">Decision Cockpit</h2>\n        </header>\n        <label class=\"selector-label\">Campaign</label>\n        <p-select\n          appendTo=\"body\"\n          [options]=\"items()\"\n          optionLabel=\"campaignName\"\n          optionValue=\"campaignId\"\n          [ngModel]=\"selected.campaignId\"\n          (ngModelChange)=\"selectCampaign($event)\"\n        ></p-select>\n      </article>\n\n      <article class=\"data-card no-hover\" *ngIf=\"healthScore() as health\">\n        <header class=\"data-card-header\">\n          <div>\n            <h2 class=\"section-title\">Health Score</h2>\n            <p class=\"data-card-subtitle\">{{ health.calculationWindowDays }} day window</p>\n          </div>\n          <p-tag [value]=\"health.trend\" [severity]=\"trendSeverity(health.trend)\"></p-tag>\n        </header>\n        <div class=\"health-inline\">\n          <div class=\"health-pill\">\n            <i [class]=\"trendIcon(health.trend)\"></i>\n            <strong>{{ health.score }}</strong>\n            <span>/100</span>\n          </div>\n          <div class=\"health-chips\">\n            <p-tag *ngFor=\"let chip of health.reasonChips\" [value]=\"chip\" severity=\"secondary\"></p-tag>\n          </div>\n        </div>\n      </article>\n\n      <article class=\"data-card no-hover recommendations-card\">\n        <header class=\"data-card-header\">\n          <div>\n            <h2 class=\"section-title\">Next Best Actions</h2>\n            <p class=\"data-card-subtitle\">Top {{ recommendations().length }} active recommendations</p>\n          </div>\n        </header>\n        <div class=\"recommendation-list\" *ngIf=\"recommendations().length; else noRecommendationsTpl\">\n          <div class=\"recommendation-item\" *ngFor=\"let recommendation of recommendations()\">\n            <div class=\"recommendation-item__head\">\n              <p-tag [value]=\"recommendation.severity\" [severity]=\"recommendationSeverity(recommendation.severity)\"></p-tag>\n              <span>Confidence {{ (recommendation.confidence * 100) | number:'1.0-0' }}%</span>\n            </div>\n            <h3 class=\"recommendation-title\">{{ recommendation.title }}</h3>\n            <p class=\"recommendation-description\">{{ recommendation.description }}</p>\n            <p class=\"recommendation-impact\">Estimated impact: <strong>{{ formatMoney(recommendation.impactEstimate) }}</strong></p>\n            <ul class=\"evidence-list\">\n              <li *ngFor=\"let ev of recommendation.evidence\">{{ ev }}</li>\n            </ul>\n            <input\n              pInputText\n              type=\"text\"\n              [ngModel]=\"recommendationReason()[recommendation.id] || ''\"\n              (ngModelChange)=\"updateRecommendationReason(recommendation.id, $event)\"\n              placeholder=\"Optional decision reason\"\n            />\n            <div class=\"recommendation-actions\">\n              <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-list\" label=\"Open Worklist\" (click)=\"openOpportunityWorklist(recommendation)\"></button>\n              <button pButton type=\"button\" class=\"crm-button crm-button--primary\" icon=\"pi pi-check\" label=\"Accept\" (click)=\"decideRecommendation(recommendation, 'accept')\"></button>\n              <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-times\" label=\"Dismiss\" (click)=\"decideRecommendation(recommendation, 'dismiss')\"></button>\n              <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-clock\" label=\"Snooze\" (click)=\"decideRecommendation(recommendation, 'snooze')\"></button>\n            </div>\n          </div>\n        </div>\n      </article>\n    </section>\n\n    <section class=\"data-card no-hover model-impact-card\" *ngIf=\"selectedModel() !== 'first_touch'\">\n      <header class=\"data-card-header\">\n        <div>\n          <h2 class=\"section-title\">Model Impact vs First-touch</h2>\n          <p class=\"data-card-subtitle\">Top campaigns with highest positive and negative pipeline shifts</p>\n        </div>\n      </header>\n      <div class=\"impact-grid\">\n        <article class=\"impact-column\">\n          <h3 class=\"impact-title positive\">Top Positive</h3>\n          <div *ngIf=\"topPositiveImpact().length; else noPositiveTpl\" class=\"impact-list\">\n            <div *ngFor=\"let row of topPositiveImpact()\" class=\"impact-row\">\n              <div>\n                <strong>{{ row.campaignName }}</strong>\n              </div>\n              <div class=\"impact-metrics\">\n                <span class=\"delta-positive\">{{ formatSignedMoney(row.pipeline) }}</span>\n                <span class=\"delta-positive\">{{ formatSignedMoney(row.won) }}</span>\n                <span class=\"delta-positive\">{{ formatSignedPercent(row.conversion) }}</span>\n              </div>\n              <button\n                pButton\n                type=\"button\"\n                class=\"crm-button crm-button--text impact-action-btn\"\n                icon=\"pi pi-arrow-right\"\n                label=\"Open Worklist\"\n                (click)=\"openCampaignImpactWorklist(row.campaignId, row.campaignName, 'positive')\"\n              ></button>\n            </div>\n          </div>\n        </article>\n        <article class=\"impact-column\">\n          <h3 class=\"impact-title negative\">Top Negative</h3>\n          <div *ngIf=\"topNegativeImpact().length; else noNegativeTpl\" class=\"impact-list\">\n            <div *ngFor=\"let row of topNegativeImpact()\" class=\"impact-row\">\n              <div>\n                <strong>{{ row.campaignName }}</strong>\n              </div>\n              <div class=\"impact-metrics\">\n                <span class=\"delta-negative\">{{ formatSignedMoney(row.pipeline) }}</span>\n                <span class=\"delta-negative\">{{ formatSignedMoney(row.won) }}</span>\n                <span class=\"delta-negative\">{{ formatSignedPercent(row.conversion) }}</span>\n              </div>\n              <button\n                pButton\n                type=\"button\"\n                class=\"crm-button crm-button--text impact-action-btn\"\n                icon=\"pi pi-arrow-right\"\n                label=\"Open Worklist\"\n                (click)=\"openCampaignImpactWorklist(row.campaignId, row.campaignName, 'negative')\"\n              ></button>\n            </div>\n          </div>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"!loading(); else loadingTpl\">\n      <header class=\"data-card-header\">\n        <div>\n          <h2 class=\"section-title\">Attribution Summary</h2>\n          <p class=\"data-card-subtitle\">{{ filteredItems().length }} campaign rows</p>\n        </div>\n      </header>\n      <div class=\"table-wrap\">\n        <p-table\n          [value]=\"filteredItems()\"\n          styleClass=\"crm-table\"\n          [rowHover]=\"true\"\n          [paginator]=\"true\"\n          [rows]=\"10\"\n          [rowsPerPageOptions]=\"rowsPerPageOptions\"\n          [showCurrentPageReport]=\"true\"\n          currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} campaigns\"\n          sortMode=\"multiple\"\n        >\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th pSortableColumn=\"campaignName\">Campaign <p-sortIcon field=\"campaignName\"></p-sortIcon></th>\n              <th pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n              <th pSortableColumn=\"influencedOpportunities\">Influenced Opps <p-sortIcon field=\"influencedOpportunities\"></p-sortIcon></th>\n              <th pSortableColumn=\"influencedPipelineAmount\">Influenced Pipeline <p-sortIcon field=\"influencedPipelineAmount\"></p-sortIcon></th>\n              <th pSortableColumn=\"wonRevenue\">Won Revenue <p-sortIcon field=\"wonRevenue\"></p-sortIcon></th>\n              <th pSortableColumn=\"conversionRate\">Conversion <p-sortIcon field=\"conversionRate\"></p-sortIcon></th>\n              <th>\u0394 Pipeline</th>\n              <th>\u0394 Won</th>\n              <th>\u0394 Conv</th>\n              <th>Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-row>\n            <tr>\n              <td>{{ row.campaignName }}</td>\n              <td><p-tag [severity]=\"statusSeverity(row.status)\" [value]=\"row.status\"></p-tag></td>\n              <td class=\"cell-numeric\">{{ row.influencedOpportunities }}</td>\n              <td class=\"cell-numeric\">{{ formatMoney(row.influencedPipelineAmount) }}</td>\n              <td class=\"cell-numeric\">{{ formatMoney(row.wonRevenue) }}</td>\n              <td class=\"cell-numeric\">{{ row.conversionRate }}%</td>\n              <td class=\"cell-numeric cell-delta\" [ngClass]=\"deltaClass(rowDelta(row).pipeline)\">\n                {{ formatSignedMoney(rowDelta(row).pipeline) }}\n              </td>\n              <td class=\"cell-numeric cell-delta\" [ngClass]=\"deltaClass(rowDelta(row).won)\">\n                {{ formatSignedMoney(rowDelta(row).won) }}\n              </td>\n              <td class=\"cell-numeric cell-delta\" [ngClass]=\"deltaClass(rowDelta(row).conversion)\">\n                {{ formatSignedPercent(rowDelta(row).conversion) }}\n              </td>\n              <td>\n                <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-eye\" label=\"Focus\" (click)=\"selectCampaign(row.campaignId)\"></button>\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"crm-button crm-button--text\"\n                  icon=\"pi pi-info-circle\"\n                  label=\"Explain\"\n                  [disabled]=\"!row.sampleOpportunityId || !canExplainAttribution()\"\n                  (click)=\"row.sampleOpportunityId && showExplainability(row.sampleOpportunityId)\"\n                ></button>\n              </td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"emptymessage\">\n            <tr>\n              <td colspan=\"10\" class=\"empty\">No attribution rows yet.</td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </section>\n  </div>\n</div>\n\n<p-dialog\n  [visible]=\"explainabilityOpen()\"\n  (visibleChange)=\"explainabilityOpen.set($event)\"\n  [modal]=\"true\"\n  [dismissableMask]=\"true\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  [style]=\"{ width: 'min(860px, 96vw)' }\"\n  header=\"Attribution Explainability\"\n  (onHide)=\"closeExplainability()\"\n>\n  <ng-container *ngIf=\"!loadingExplainability(); else explainLoadingTpl\">\n    <div class=\"explainability\" *ngIf=\"explainability() as expl; else explainEmptyTpl\">\n      <p class=\"explainability-meta\">\n        Model: <strong>{{ expl.model }}</strong>\n        <span *ngIf=\"expl.ruleVersion\"> \u2022 Rule: {{ expl.ruleVersion }}</span>\n      </p>\n      <p class=\"explainability-meta\" *ngIf=\"expl.attributedUtc\">Attributed: {{ expl.attributedUtc | date:'short' }}</p>\n      <ul class=\"evidence-list\">\n        <li *ngFor=\"let ev of expl.evidence\">{{ ev }}</li>\n      </ul>\n    </div>\n  </ng-container>\n</p-dialog>\n\n<ng-template #loadingTpl>\n  <section class=\"crm-panel loading\">Loading attribution summary...</section>\n</ng-template>\n\n<ng-template #noRecommendationsTpl>\n  <div class=\"empty\">No active recommendations available for this campaign.</div>\n</ng-template>\n\n<ng-template #explainLoadingTpl>\n  <div class=\"loading\">Loading explainability...</div>\n</ng-template>\n\n<ng-template #explainEmptyTpl>\n  <div class=\"empty\">No explainability details available.</div>\n</ng-template>\n\n<ng-template #noPositiveTpl>\n  <div class=\"empty\">No positive shifts in this view.</div>\n</ng-template>\n\n<ng-template #noNegativeTpl>\n  <div class=\"empty\">No negative shifts in this view.</div>\n</ng-template>\n", styles: [".campaign-attribution-page {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-description {\n    max-width: 760px;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(5, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.1rem, 1.45vw, 1.45rem);\n  }\n\n  .metric-card--campaigns::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--influenced::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);\n  }\n\n  .metric-card--pipeline::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metric-card--won::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);\n  }\n\n  .metric-card--conversion::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);\n  }\n\n  .metric-delta {\n    margin-top: 0.25rem;\n    font-size: 0.78rem;\n    font-weight: 600;\n  }\n\n  .insights-grid {\n    display: grid;\n    gap: 0.9rem;\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .campaign-selector-card {\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .selector-label {\n    font-size: 0.82rem;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .health-inline {\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  .health-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    width: fit-content;\n    padding: 0.5rem 0.8rem;\n    border-radius: 999px;\n    background: rgba(59, 130, 246, 0.14);\n    color: #1d4ed8;\n    border: 1px solid rgba(59, 130, 246, 0.3);\n  }\n\n  .health-pill strong {\n    font-size: 1.15rem;\n  }\n\n  .health-chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n\n  .recommendations-card {\n    grid-column: span 3;\n  }\n\n  .recommendation-list {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .recommendation-item {\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.76) 100%);\n    padding: 0.8rem;\n    display: grid;\n    gap: 0.45rem;\n  }\n\n  .recommendation-item__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    color: #64748b;\n    font-size: 0.82rem;\n  }\n\n  .recommendation-title {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n\n  .recommendation-description,\n  .recommendation-impact,\n  .explainability-meta {\n    margin: 0;\n    color: #475569;\n  }\n\n  .evidence-list {\n    margin: 0;\n    padding-left: 1rem;\n    color: #475569;\n    display: grid;\n    gap: 0.18rem;\n  }\n\n  .recommendation-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  .filter-group {\n    display: grid;\n    gap: 0.35rem;\n    min-width: 280px;\n  }\n\n  .filter-group label {\n    font-size: 0.82rem;\n    font-weight: 600;\n    color: #64748b;\n  }\n\n  .cell-numeric {\n    text-align: right;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .cell-delta {\n    font-weight: 600;\n  }\n\n  .model-impact-card {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .impact-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.85rem;\n  }\n\n  .impact-column {\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 12px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.85) 100%);\n    padding: 0.75rem;\n    display: grid;\n    gap: 0.55rem;\n  }\n\n  .impact-title {\n    margin: 0;\n    font-size: 0.95rem;\n  }\n\n  .impact-title.positive {\n    color: #15803d;\n  }\n\n  .impact-title.negative {\n    color: #b91c1c;\n  }\n\n  .impact-list {\n    display: grid;\n    gap: 0.5rem;\n  }\n\n  .impact-row {\n    display: grid;\n    grid-template-columns: minmax(160px, 1fr) auto auto;\n    align-items: center;\n    gap: 0.5rem;\n    border-top: 1px dashed rgba(148, 163, 184, 0.35);\n    padding-top: 0.45rem;\n  }\n\n  .impact-metrics {\n    display: flex;\n    gap: 0.5rem;\n    font-size: 0.8rem;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n\n  .impact-action-btn {\n    white-space: nowrap;\n  }\n\n  .delta-positive {\n    color: #15803d;\n  }\n\n  .delta-negative {\n    color: #b91c1c;\n  }\n\n  .delta-neutral {\n    color: #475569;\n  }\n\n  ::ng-deep .crm-table .p-sortable-column .p-sortable-column-icon {\n    margin-left: 0.35rem;\n    font-size: 0.75rem;\n    color: #64748b;\n  }\n\n  ::ng-deep .crm-table .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.25);\n    background: linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%);\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 1100px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(170px, 1fr));\n    }\n\n    .insights-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .recommendations-card {\n      grid-column: span 1;\n    }\n\n    .impact-grid {\n      grid-template-columns: 1fr;\n    }\n\n    .impact-row {\n      grid-template-columns: 1fr;\n      justify-items: start;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignAttributionPage, { className: "CampaignAttributionPage", filePath: "src/app/crm/features/marketing/pages/campaign-attribution.page.ts", lineNumber: 32 }); })();
