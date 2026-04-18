import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { LeadDataService } from '../../leads/services/lead-data.service';
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
function CampaignDetailPage_div_5_div_63_p_tag_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 65);
} if (rf & 2) {
    const reason_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", reason_r4);
} }
function CampaignDetailPage_div_5_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "div", 57)(2, "div")(3, "h2", 58);
    i0.ɵɵtext(4, "Campaign Health Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 59);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "p-tag", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 61)(10, "div", 62);
    i0.ɵɵelement(11, "i");
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "/100");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 63);
    i0.ɵɵtemplate(17, CampaignDetailPage_div_5_div_63_p_tag_17_Template, 1, 1, "p-tag", 64);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const health_r5 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("Last computed ", i0.ɵɵpipeBind2(7, 12, health_r5.computedUtc, "short"), " \u2022 ", health_r5.calculationWindowDays, "d window");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r2.trendLabel(health_r5.trend))("severity", health_r5.trend === "up" ? "success" : health_r5.trend === "down" ? "danger" : "info");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("down", health_r5.trend === "down")("up", health_r5.trend === "up");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.trendIcon(health_r5.trend));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(health_r5.score);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", health_r5.reasonChips);
} }
function CampaignDetailPage_div_5_section_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 66)(1, "h2", 58);
    i0.ɵɵtext(2, "Campaign Overview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dl", 67)(4, "div")(5, "dt");
    i0.ɵɵtext(6, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "dd");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div")(10, "dt");
    i0.ɵɵtext(11, "Start");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "dd");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "dt");
    i0.ɵɵtext(17, "End");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "dt");
    i0.ɵɵtext(23, "Budget Planned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dd");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "dt");
    i0.ɵɵtext(28, "Budget Actual");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "dd");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 68)(32, "dt");
    i0.ɵɵtext(33, "Objective");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "dd");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const vm_r6 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(vm_r6.campaign.ownerName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(vm_r6.campaign.startDateUtc ? i0.ɵɵpipeBind2(14, 6, vm_r6.campaign.startDateUtc, "mediumDate") : "\u2014");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(vm_r6.campaign.endDateUtc ? i0.ɵɵpipeBind2(20, 9, vm_r6.campaign.endDateUtc, "mediumDate") : "\u2014");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.campaign.budgetPlanned));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.campaign.budgetActual));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(vm_r6.campaign.objective || "\u2014");
} }
function CampaignDetailPage_div_5_section_72_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 75)(1, "p-select", 76);
    i0.ɵɵlistener("ngModelChange", function CampaignDetailPage_div_5_section_72_div_3_Template_p_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.entityType.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 77);
    i0.ɵɵlistener("ngModelChange", function CampaignDetailPage_div_5_section_72_div_3_Template_p_select_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectedEntityId.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 76);
    i0.ɵɵlistener("ngModelChange", function CampaignDetailPage_div_5_section_72_div_3_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.responseStatus.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 78);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_72_div_3_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.addMember()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.entityTypeOptions)("ngModel", ctx_r2.entityType());
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.currentOptions())("placeholder", "Select " + ctx_r2.entityType())("ngModel", ctx_r2.selectedEntityId());
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.responseStatusOptions)("ngModel", ctx_r2.responseStatus());
} }
function CampaignDetailPage_div_5_section_72_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Entity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Added");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Actions");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_div_5_section_72_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
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
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td")(11, "div", 79)(12, "button", 80);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_72_ng_template_7_Template_button_click_12_listener() { const member_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeMember(member_r9)); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const member_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(member_r9.entityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(member_r9.entityType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(member_r9.responseStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 5, member_r9.addedUtc, "short"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function CampaignDetailPage_div_5_section_72_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 81);
    i0.ɵɵtext(2, "No members added yet.");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_div_5_section_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 66)(1, "h2", 58);
    i0.ɵɵtext(2, "Members");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CampaignDetailPage_div_5_section_72_div_3_Template, 5, 7, "div", 69);
    i0.ɵɵelementStart(4, "div", 70)(5, "p-table", 71);
    i0.ɵɵtemplate(6, CampaignDetailPage_div_5_section_72_ng_template_6_Template, 11, 0, "ng-template", 72)(7, CampaignDetailPage_div_5_section_72_ng_template_7_Template, 13, 8, "ng-template", 73)(8, CampaignDetailPage_div_5_section_72_ng_template_8_Template, 3, 0, "ng-template", 74);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const vm_r6 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", vm_r6.members)("rowHover", true);
} }
function CampaignDetailPage_div_5_section_73_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Opportunity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Attributed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Explain");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_div_5_section_73_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
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
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "button", 82);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_73_ng_template_6_Template_button_click_15_listener() { const opp_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.showExplainability(opp_r11.opportunityId)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const opp_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opp_r11.opportunityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opp_r11.accountName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opp_r11.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(opp_r11.amount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opp_r11.isClosed ? opp_r11.isWon ? "Won" : "Closed" : "Open");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 6, opp_r11.attributedUtc, "short"));
} }
function CampaignDetailPage_div_5_section_73_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 83);
    i0.ɵɵtext(2, "No attributed opportunities yet.");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_div_5_section_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 66)(1, "h2", 58);
    i0.ɵɵtext(2, "Attributed Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 70)(4, "p-table", 71);
    i0.ɵɵtemplate(5, CampaignDetailPage_div_5_section_73_ng_template_5_Template, 15, 0, "ng-template", 72)(6, CampaignDetailPage_div_5_section_73_ng_template_6_Template, 16, 9, "ng-template", 73)(7, CampaignDetailPage_div_5_section_73_ng_template_7_Template, 3, 0, "ng-template", 74);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const vm_r6 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", vm_r6.performance.opportunities)("rowHover", true);
} }
function CampaignDetailPage_div_5_section_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 66)(1, "h2", 58);
    i0.ɵɵtext(2, "Performance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 84)(4, "li");
    i0.ɵɵtext(5, "Members: ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "li");
    i0.ɵɵtext(9, "Influenced opportunities: ");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "li");
    i0.ɵɵtext(13, "Influenced pipeline: ");
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "li");
    i0.ɵɵtext(17, "Won revenue: ");
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "li");
    i0.ɵɵtext(21, "Conversion rate: ");
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const vm_r6 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(vm_r6.performance.memberCount);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(vm_r6.performance.influencedOpportunities);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.performance.influencedPipelineAmount));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.performance.wonRevenue));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", vm_r6.performance.conversionRate, "%");
} }
function CampaignDetailPage_div_5_section_75_div_7_article_1_li_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const evidence_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(evidence_r13);
} }
function CampaignDetailPage_div_5_section_75_div_7_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 89)(1, "div", 90);
    i0.ɵɵelement(2, "p-tag", 60);
    i0.ɵɵelementStart(3, "span", 91);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3", 92);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 93);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 94);
    i0.ɵɵtext(11, "Estimated impact: ");
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "ul", 95);
    i0.ɵɵtemplate(15, CampaignDetailPage_div_5_section_75_div_7_article_1_li_15_Template, 2, 1, "li", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 97);
    i0.ɵɵlistener("ngModelChange", function CampaignDetailPage_div_5_section_75_div_7_article_1_Template_input_ngModelChange_16_listener($event) { const recommendation_r14 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.updateRecommendationReason(recommendation_r14.id, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 98)(18, "button", 99);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_75_div_7_article_1_Template_button_click_18_listener() { const recommendation_r14 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.openOpportunityWorklist(recommendation_r14)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 100);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_75_div_7_article_1_Template_button_click_19_listener() { const recommendation_r14 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r14, "accept")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 101);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_75_div_7_article_1_Template_button_click_20_listener() { const recommendation_r14 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r14, "dismiss")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 102);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_section_75_div_7_article_1_Template_button_click_21_listener() { const recommendation_r14 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.decideRecommendation(recommendation_r14, "snooze")); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const recommendation_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", recommendation_r14.severity)("severity", ctx_r2.recommendationSeverity(recommendation_r14.severity));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Confidence ", i0.ɵɵpipeBind2(5, 11, recommendation_r14.confidence * 100, "1.0-0"), "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(recommendation_r14.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(recommendation_r14.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(recommendation_r14.impactEstimate));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", recommendation_r14.evidence);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.recommendationReason()[recommendation_r14.id] || "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function CampaignDetailPage_div_5_section_75_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87);
    i0.ɵɵtemplate(1, CampaignDetailPage_div_5_section_75_div_7_article_1_Template, 22, 14, "article", 88);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.recommendations());
} }
function CampaignDetailPage_div_5_section_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 66)(1, "header", 85)(2, "div")(3, "h2", 58);
    i0.ɵɵtext(4, "Next Best Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 59);
    i0.ɵɵtext(6, "Recommendation volume capped at 5 active actions.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(7, CampaignDetailPage_div_5_section_75_div_7_Template, 2, 1, "div", 86);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const noRecommendationsTpl_r15 = i0.ɵɵreference(11);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.recommendations().length)("ngIfElse", noRecommendationsTpl_r15);
} }
function CampaignDetailPage_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13);
    i0.ɵɵelement(2, "app-breadcrumbs");
    i0.ɵɵelementStart(3, "section", 14)(4, "div", 15)(5, "div", 16);
    i0.ɵɵelement(6, "span", 17);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "Campaign Workspace");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "h1", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 19);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 20)(14, "button", 21);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.backToCampaigns()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 22);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToAttribution()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 23);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.editCampaign()); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(17, "section", 24)(18, "div", 25)(19, "article", 26)(20, "div", 27)(21, "div", 28);
    i0.ɵɵelement(22, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 30);
    i0.ɵɵelement(24, "i", 31);
    i0.ɵɵtext(25, " Audience");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "span", 32);
    i0.ɵɵtext(27, "Members");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "strong", 33);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "article", 34)(31, "div", 27)(32, "div", 35);
    i0.ɵɵelement(33, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 30);
    i0.ɵɵelement(35, "i", 37);
    i0.ɵɵtext(36, " First Touch");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "span", 32);
    i0.ɵɵtext(38, "Influenced Opps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "strong", 33);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "article", 38)(42, "div", 27)(43, "div", 39);
    i0.ɵɵelement(44, "i", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 30);
    i0.ɵɵelement(46, "i", 41);
    i0.ɵɵtext(47, " Pipeline");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "span", 32);
    i0.ɵɵtext(49, "Pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "strong", 33);
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "article", 42)(53, "div", 27)(54, "div", 43);
    i0.ɵɵelement(55, "i", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "span", 45);
    i0.ɵɵelement(57, "i", 46);
    i0.ɵɵtext(58, " Won");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "span", 32);
    i0.ɵɵtext(60, "Won Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "strong", 33);
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(63, CampaignDetailPage_div_5_div_63_Template, 18, 15, "div", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "section", 48)(65, "div", 49)(66, "button", 50);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_66_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab("overview")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "button", 51);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_67_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab("members")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "button", 52);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_68_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab("opportunities")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "button", 53);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_69_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab("performance")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "button", 54);
    i0.ɵɵlistener("click", function CampaignDetailPage_div_5_Template_button_click_70_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setTab("action-center")); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(71, CampaignDetailPage_div_5_section_71_Template, 36, 12, "section", 55)(72, CampaignDetailPage_div_5_section_72_Template, 9, 3, "section", 55)(73, CampaignDetailPage_div_5_section_73_Template, 8, 2, "section", 55)(74, CampaignDetailPage_div_5_section_74_Template, 24, 5, "section", 55)(75, CampaignDetailPage_div_5_section_75_Template, 8, 2, "section", 55);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const vm_r6 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(vm_r6.campaign.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", vm_r6.campaign.type, " \u2022 ", vm_r6.campaign.channel, " \u2022 ", vm_r6.campaign.status);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(vm_r6.performance.memberCount);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(vm_r6.performance.influencedOpportunities);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.performance.influencedPipelineAmount));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r2.formatMoney(vm_r6.performance.wonRevenue));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.healthScore());
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === "overview");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === "members");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === "opportunities");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === "performance");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r2.activeTab() === "action-center");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeTab() === "overview");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeTab() === "members");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeTab() === "opportunities");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeTab() === "performance");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeTab() === "action-center");
} }
function CampaignDetailPage_ng_container_7_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const expl_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2022 Rule: ", expl_r16.ruleVersion);
} }
function CampaignDetailPage_ng_container_7_div_1_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 105);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const expl_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Attributed: ", i0.ɵɵpipeBind2(2, 1, expl_r16.attributedUtc, "short"));
} }
function CampaignDetailPage_ng_container_7_div_1_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 105);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const expl_r16 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Source: ", expl_r16.sourceEntityType, " ", expl_r16.sourceEntityId);
} }
function CampaignDetailPage_ng_container_7_div_1_li_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r17);
} }
function CampaignDetailPage_ng_container_7_div_1_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Campaign");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Entity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Entity Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Member Added");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_ng_container_7_div_1_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
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
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.campaignName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.entityType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.entityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 4, row_r18.memberAddedUtc, "short"));
} }
function CampaignDetailPage_ng_container_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "p", 105);
    i0.ɵɵtext(2, " Model: ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CampaignDetailPage_ng_container_7_div_1_span_5_Template, 2, 1, "span", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CampaignDetailPage_ng_container_7_div_1_p_6_Template, 3, 4, "p", 107)(7, CampaignDetailPage_ng_container_7_div_1_p_7_Template, 2, 2, "p", 107);
    i0.ɵɵelementStart(8, "h3", 58);
    i0.ɵɵtext(9, "Evidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ul", 95);
    i0.ɵɵtemplate(11, CampaignDetailPage_ng_container_7_div_1_li_11_Template, 2, 1, "li", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "h3", 58);
    i0.ɵɵtext(13, "Candidate Memberships");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p-table", 71);
    i0.ɵɵtemplate(15, CampaignDetailPage_ng_container_7_div_1_ng_template_15_Template, 9, 0, "ng-template", 72)(16, CampaignDetailPage_ng_container_7_div_1_ng_template_16_Template, 10, 7, "ng-template", 73);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const expl_r16 = ctx.ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(expl_r16.model);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", expl_r16.ruleVersion);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", expl_r16.attributedUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", expl_r16.sourceEntityType);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", expl_r16.evidence);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", expl_r16.candidates)("rowHover", true);
} }
function CampaignDetailPage_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CampaignDetailPage_ng_container_7_div_1_Template, 17, 7, "div", 103);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const explainEmptyTpl_r19 = i0.ɵɵreference(15);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.explainability())("ngIfElse", explainEmptyTpl_r19);
} }
function CampaignDetailPage_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 108)(1, "section", 109);
    i0.ɵɵtext(2, "Loading campaign...");
    i0.ɵɵelementEnd()();
} }
function CampaignDetailPage_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 110);
    i0.ɵɵtext(1, "No active recommendations yet. Refresh from attribution to recompute.");
    i0.ɵɵelementEnd();
} }
function CampaignDetailPage_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵtext(1, "Loading explainability...");
    i0.ɵɵelementEnd();
} }
function CampaignDetailPage_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 110);
    i0.ɵɵtext(1, "No explainability details found for this opportunity.");
    i0.ɵɵelementEnd();
} }
export class CampaignDetailPage {
    entityTypeOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Contact', value: 'Contact' }
    ];
    responseStatusOptions = [
        { label: 'Sent', value: 'Sent' },
        { label: 'Responded', value: 'Responded' },
        { label: 'Qualified', value: 'Qualified' },
        { label: 'Unsubscribed', value: 'Unsubscribed' }
    ];
    campaign = signal(null, ...(ngDevMode ? [{ debugName: "campaign" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    activeTab = signal('overview', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    healthScore = signal(null, ...(ngDevMode ? [{ debugName: "healthScore" }] : []));
    recommendations = signal([], ...(ngDevMode ? [{ debugName: "recommendations" }] : []));
    recommendationReason = signal({}, ...(ngDevMode ? [{ debugName: "recommendationReason" }] : []));
    explainabilityOpen = signal(false, ...(ngDevMode ? [{ debugName: "explainabilityOpen" }] : []));
    explainability = signal(null, ...(ngDevMode ? [{ debugName: "explainability" }] : []));
    loadingExplainability = signal(false, ...(ngDevMode ? [{ debugName: "loadingExplainability" }] : []));
    entityType = signal('Lead', ...(ngDevMode ? [{ debugName: "entityType" }] : []));
    selectedEntityId = signal('', ...(ngDevMode ? [{ debugName: "selectedEntityId" }] : []));
    responseStatus = signal('Sent', ...(ngDevMode ? [{ debugName: "responseStatus" }] : []));
    leadOptions = signal([], ...(ngDevMode ? [{ debugName: "leadOptions" }] : []));
    contactOptions = signal([], ...(ngDevMode ? [{ debugName: "contactOptions" }] : []));
    canManage = computed(() => tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.marketingManage), ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    currentOptions = computed(() => this.entityType() === 'Lead' ? this.leadOptions() : this.contactOptions(), ...(ngDevMode ? [{ debugName: "currentOptions" }] : []));
    route = inject(ActivatedRoute);
    router = inject(Router);
    data = inject(MarketingDataService);
    leads = inject(LeadDataService);
    contacts = inject(ContactDataService);
    toast = inject(AppToastService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    constructor() {
        this.loadCurrencyContext();
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/app/marketing/campaigns']);
            return;
        }
        this.loadLookups();
        this.loadCampaign(id);
        this.loadInsights(id);
    }
    setTab(tab) {
        this.activeTab.set(tab);
    }
    editCampaign() {
        const id = this.campaign()?.campaign.id;
        if (!id)
            return;
        this.router.navigate(['/app/marketing/campaigns', id, 'edit']);
    }
    goToAttribution() {
        this.router.navigate(['/app/marketing/attribution']);
    }
    backToCampaigns() {
        this.router.navigate(['/app/marketing/campaigns']);
    }
    addMember() {
        const id = this.campaign()?.campaign.id;
        const entityId = this.selectedEntityId();
        if (!id || !entityId) {
            return;
        }
        this.data
            .addCampaignMember(id, {
            entityType: this.entityType(),
            entityId,
            responseStatus: this.responseStatus()
        })
            .subscribe({
            next: () => {
                this.toast.show('success', 'Member added.');
                this.selectedEntityId.set('');
                this.loadCampaign(id);
                this.loadInsights(id);
            },
            error: () => this.toast.show('error', 'Unable to add member.')
        });
    }
    removeMember(member) {
        const id = this.campaign()?.campaign.id;
        if (!id)
            return;
        this.data.removeCampaignMember(id, member.id).subscribe({
            next: () => {
                this.toast.show('success', 'Member removed.');
                this.loadCampaign(id);
                this.loadInsights(id);
            },
            error: () => this.toast.show('error', 'Unable to remove member.')
        });
    }
    decideRecommendation(recommendation, decision) {
        const reason = this.recommendationReason()[recommendation.id] ?? '';
        this.data
            .applyRecommendationDecision(recommendation.id, {
            decision,
            reason: reason.trim() || undefined,
            applyActions: true
        })
            .subscribe({
            next: () => {
                this.toast.show('success', `Recommendation ${decision}ed.`);
                const campaignId = this.campaign()?.campaign.id;
                if (campaignId) {
                    this.loadInsights(campaignId);
                }
            },
            error: () => this.toast.show('error', 'Unable to apply recommendation decision.')
        });
    }
    updateRecommendationReason(recommendationId, value) {
        this.recommendationReason.set({
            ...this.recommendationReason(),
            [recommendationId]: value
        });
    }
    openOpportunityWorklist(recommendation) {
        const campaignName = this.campaign()?.campaign.name ?? 'campaign';
        const focusTag = recommendation.type.replaceAll('_', ' ');
        this.router.navigate(['/app/deals'], {
            queryParams: {
                search: campaignName,
                focus: focusTag
            }
        });
    }
    showExplainability(opportunityId) {
        this.loadingExplainability.set(true);
        this.explainabilityOpen.set(true);
        this.data.explainOpportunityAttribution(opportunityId).subscribe({
            next: (result) => {
                this.explainability.set(result);
                this.loadingExplainability.set(false);
            },
            error: () => {
                this.explainability.set(null);
                this.loadingExplainability.set(false);
                this.toast.show('error', 'Unable to load attribution explainability.');
            }
        });
    }
    closeExplainability() {
        this.explainabilityOpen.set(false);
        this.explainability.set(null);
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
    trendLabel(trend) {
        if (trend === 'up')
            return 'Improving';
        if (trend === 'down')
            return 'Declining';
        return 'Stable';
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
    loadCampaign(id) {
        this.loading.set(true);
        this.data.getCampaign(id).subscribe({
            next: (res) => {
                this.campaign.set(res);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load campaign detail.');
                this.router.navigate(['/app/marketing/campaigns']);
            }
        });
    }
    loadInsights(campaignId) {
        this.data.getCampaignHealthScore(campaignId).subscribe({
            next: (res) => this.healthScore.set(res),
            error: () => this.healthScore.set(null)
        });
        this.data.getCampaignRecommendations(campaignId).subscribe({
            next: (rows) => this.recommendations.set(rows),
            error: () => this.recommendations.set([])
        });
    }
    loadLookups() {
        this.leads.search({ page: 1, pageSize: 200 }).subscribe({
            next: (res) => this.leadOptions.set(res.items.map((lead) => ({ label: `${lead.name} (${lead.company || 'No company'})`, value: lead.id }))),
            error: () => this.leadOptions.set([])
        });
        this.contacts.search({ page: 1, pageSize: 200 }).subscribe({
            next: (res) => this.contactOptions.set(res.items.map((contact) => ({ label: `${contact.name} (${contact.accountName || 'No account'})`, value: contact.id }))),
            error: () => this.contactOptions.set([])
        });
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
    static ɵfac = function CampaignDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignDetailPage, selectors: [["app-campaign-detail-page"]], decls: 16, vars: 12, consts: [["loadingTpl", ""], ["noRecommendationsTpl", ""], ["explainLoadingTpl", ""], ["explainEmptyTpl", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], ["class", "campaign-detail-page page-container", 4, "ngIf", "ngIfElse"], ["header", "Attribution Explainability", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask", "draggable", "resizable"], [4, "ngIf", "ngIfElse"], [1, "campaign-detail-page", "page-container"], [1, "page-content"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "hero-subtitle"], [1, "hero-actions"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-left", "label", "All Campaigns", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-percentage", "label", "Attribution", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-pencil", "label", "Edit Campaign", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [1, "metrics-dashboard"], [1, "metrics-grid"], [1, "metric-card", "metric-card--members"], [1, "metric-header"], [1, "metric-icon", "primary"], [1, "pi", "pi-users"], [1, "metric-trend"], [1, "pi", "pi-id-card"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--influenced"], [1, "metric-icon", "info"], [1, "pi", "pi-briefcase"], [1, "pi", "pi-bolt"], [1, "metric-card", "metric-card--pipeline"], [1, "metric-icon", "warning"], [1, "pi", "pi-dollar"], [1, "pi", "pi-chart-line"], [1, "metric-card", "metric-card--won"], [1, "metric-icon", "success"], [1, "pi", "pi-check-circle"], [1, "metric-trend", "up"], [1, "pi", "pi-trophy"], ["class", "health-card data-card no-hover", 4, "ngIf"], [1, "tab-bar", "glass-card", "no-hover"], [1, "tab-actions"], ["pButton", "", "type", "button", "label", "Overview", 1, "crm-button", "crm-button--pill", "crm-button--sm", "tab-button", 3, "click"], ["pButton", "", "type", "button", "label", "Members", 1, "crm-button", "crm-button--pill", "crm-button--sm", "tab-button", 3, "click"], ["pButton", "", "type", "button", "label", "Attributed Opportunities", 1, "crm-button", "crm-button--pill", "crm-button--sm", "tab-button", 3, "click"], ["pButton", "", "type", "button", "label", "Performance", 1, "crm-button", "crm-button--pill", "crm-button--sm", "tab-button", 3, "click"], ["pButton", "", "type", "button", "label", "Action Center", 1, "crm-button", "crm-button--pill", "crm-button--sm", "tab-button", 3, "click"], ["class", "data-card no-hover", 4, "ngIf"], [1, "health-card", "data-card", "no-hover"], [1, "health-card__head"], [1, "section-title"], [1, "data-card-subtitle"], [3, "value", "severity"], [1, "health-card__body"], [1, "health-score-pill"], [1, "health-reasons"], ["severity", "secondary", 3, "value", 4, "ngFor", "ngForOf"], ["severity", "secondary", 3, "value"], [1, "data-card", "no-hover"], [1, "overview-grid"], [1, "objective"], ["class", "member-form", 4, "ngIf"], [1, "table-wrap"], ["styleClass", "crm-table", 3, "value", "rowHover"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "member-form"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", 3, "ngModelChange", "options", "ngModel"], ["appendTo", "body", "styleClass", "crm-input", "optionLabel", "label", "optionValue", "value", 3, "ngModelChange", "options", "placeholder", "ngModel"], ["pButton", "", "type", "button", "label", "Add Member", 1, "crm-button", "crm-button--primary", 3, "click"], [1, "row-actions"], ["pButton", "", "type", "button", "icon", "pi pi-trash", 1, "action-btn", "p-button-text", "p-button-rounded", "p-button-sm", "p-button-danger", 3, "click", "disabled"], ["colspan", "5", 1, "empty"], ["pButton", "", "type", "button", "icon", "pi pi-info-circle", "label", "Why", 1, "crm-button", "crm-button--text", 3, "click"], ["colspan", "7", 1, "empty"], [1, "performance-list"], [1, "data-card-header"], ["class", "recommendation-grid", 4, "ngIf", "ngIfElse"], [1, "recommendation-grid"], ["class", "recommendation-card", 4, "ngFor", "ngForOf"], [1, "recommendation-card"], [1, "recommendation-card__head"], [1, "confidence"], [1, "recommendation-title"], [1, "recommendation-description"], [1, "recommendation-impact"], [1, "evidence-list"], [4, "ngFor", "ngForOf"], ["pInputText", "", "type", "text", "placeholder", "Optional decision reason", 1, "reason-input", 3, "ngModelChange", "ngModel"], [1, "recommendation-actions"], ["pButton", "", "type", "button", "icon", "pi pi-list", "label", "Open Worklist", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-check", "label", "Accept", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-times", "label", "Dismiss", 1, "crm-button", "crm-button--text", 3, "click", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-clock", "label", "Snooze", 1, "crm-button", "crm-button--text", 3, "click", "disabled"], ["class", "explainability", 4, "ngIf", "ngIfElse"], [1, "explainability"], [1, "explainability-meta"], [4, "ngIf"], ["class", "explainability-meta", 4, "ngIf"], [1, "page-container", "campaign-detail-page"], [1, "crm-panel", "loading"], [1, "empty"], [1, "loading"]], template: function CampaignDetailPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelement(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, CampaignDetailPage_div_5_Template, 76, 25, "div", 9);
            i0.ɵɵelementStart(6, "p-dialog", 10);
            i0.ɵɵlistener("visibleChange", function CampaignDetailPage_Template_p_dialog_visibleChange_6_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.explainabilityOpen.set($event)); })("onHide", function CampaignDetailPage_Template_p_dialog_onHide_6_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeExplainability()); });
            i0.ɵɵtemplate(7, CampaignDetailPage_ng_container_7_Template, 2, 2, "ng-container", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, CampaignDetailPage_ng_template_8_Template, 3, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(10, CampaignDetailPage_ng_template_10_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(12, CampaignDetailPage_ng_template_12_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(14, CampaignDetailPage_ng_template_14_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const loadingTpl_r20 = i0.ɵɵreference(9);
            const explainLoadingTpl_r21 = i0.ɵɵreference(13);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.campaign())("ngIfElse", loadingTpl_r20);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(11, _c0));
            i0.ɵɵproperty("visible", ctx.explainabilityOpen())("modal", true)("dismissableMask", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingExplainability())("ngIfElse", explainLoadingTpl_r21);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, SelectModule, i6.Select, TableModule, i7.Table, TagModule, i8.Tag, DialogModule, i9.Dialog, BreadcrumbsComponent, i1.DecimalPipe, i1.DatePipe], styles: [".campaign-detail-page[_ngcontent-%COMP%] {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-subtitle {\n    max-width: 100%;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(4, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.1rem, 1.5vw, 1.45rem);\n  }\n\n  .metric-card--members::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--influenced::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);\n  }\n\n  .metric-card--pipeline::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metric-card--won::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);\n  }\n\n  .health-card {\n    margin-top: 0.9rem;\n  }\n\n  .health-card__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 0.85rem;\n  }\n\n  .health-card__body {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    gap: 0.8rem;\n    align-items: center;\n  }\n\n  .health-score-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.55rem 0.8rem;\n    border-radius: 999px;\n    border: 1px solid rgba(59, 130, 246, 0.3);\n    color: #1d4ed8;\n    background: rgba(59, 130, 246, 0.12);\n  }\n\n  .health-score-pill.up {\n    color: #047857;\n    border-color: rgba(16, 185, 129, 0.36);\n    background: rgba(16, 185, 129, 0.14);\n  }\n\n  .health-score-pill.down {\n    color: #b91c1c;\n    border-color: rgba(239, 68, 68, 0.36);\n    background: rgba(239, 68, 68, 0.14);\n  }\n\n  .health-score-pill strong {\n    font-size: 1.2rem;\n  }\n\n  .health-reasons {\n    display: flex;\n    gap: 0.4rem;\n    flex-wrap: wrap;\n  }\n\n  .tab-bar {\n    padding: 0.75rem 1rem;\n  }\n\n  .tab-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.55rem;\n  }\n\n  .tab-button {\n    border: 1px solid rgba(148, 163, 184, 0.35);\n    background: rgba(255, 255, 255, 0.75);\n    color: #334155;\n  }\n\n  .tab-button.active {\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n    border-color: transparent;\n    color: #fff;\n    box-shadow: 0 12px 22px rgba(59, 130, 246, 0.22);\n  }\n\n  .overview-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.85rem 1rem;\n  }\n\n  .overview-grid .objective {\n    grid-column: 1 / -1;\n  }\n\n  .overview-grid dt {\n    margin: 0;\n    font-size: 0.8rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .overview-grid dd {\n    margin: 0.2rem 0 0;\n    font-weight: 600;\n    color: #1f2937;\n  }\n\n  .member-form {\n    display: grid;\n    grid-template-columns: 150px minmax(220px, 1fr) 190px auto;\n    gap: 0.7rem;\n    margin-bottom: 0.9rem;\n  }\n\n  .crm-input {\n    width: 100%;\n  }\n\n  ::ng-deep .crm-input.p-select {\n    width: 100%;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  .performance-list {\n    margin: 0;\n    padding-left: 1.1rem;\n    display: grid;\n    gap: 0.35rem;\n  }\n\n  .recommendation-grid {\n    display: grid;\n    gap: 0.8rem;\n  }\n\n  .recommendation-card {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    border-radius: 14px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, rgba(248, 250, 252, 0.75) 100%);\n    padding: 0.85rem;\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  .recommendation-card__head {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 0.6rem;\n  }\n\n  .confidence {\n    font-size: 0.82rem;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .recommendation-title {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n\n  .recommendation-description,\n  .recommendation-impact {\n    margin: 0;\n    color: #334155;\n  }\n\n  .evidence-list {\n    margin: 0;\n    padding-left: 1rem;\n    color: #475569;\n    display: grid;\n    gap: 0.2rem;\n  }\n\n  .reason-input {\n    width: 100%;\n  }\n\n  .recommendation-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.45rem;\n  }\n\n  .explainability-meta {\n    margin: 0 0 0.45rem;\n    color: #475569;\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 980px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(165px, 1fr));\n    }\n\n    .member-form {\n      grid-template-columns: 1fr;\n    }\n\n    .health-card__body {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 900px) {\n    .overview-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignDetailPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-detail-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    TableModule,
                    TagModule,
                    DialogModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"campaign-detail-page page-container\" *ngIf=\"campaign() as vm; else loadingTpl\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Campaign Workspace</span>\n        </div>\n        <h1 class=\"hero-title\">{{ vm.campaign.name }}</h1>\n        <p class=\"hero-subtitle\">{{ vm.campaign.type }} \u2022 {{ vm.campaign.channel }} \u2022 {{ vm.campaign.status }}</p>\n        <div class=\"hero-actions\">\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-arrow-left\" label=\"All Campaigns\" (click)=\"backToCampaigns()\"></button>\n          <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-percentage\" label=\"Attribution\" (click)=\"goToAttribution()\"></button>\n          <button pButton type=\"button\" class=\"crm-button crm-button--primary\" icon=\"pi pi-pencil\" label=\"Edit Campaign\" [disabled]=\"!canManage()\" (click)=\"editCampaign()\"></button>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"metrics-dashboard\">\n      <div class=\"metrics-grid\">\n        <article class=\"metric-card metric-card--members\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon primary\"><i class=\"pi pi-users\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-id-card\"></i> Audience</span>\n          </div>\n          <span class=\"metric-label\">Members</span>\n          <strong class=\"metric-value\">{{ vm.performance.memberCount }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--influenced\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon info\"><i class=\"pi pi-briefcase\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-bolt\"></i> First Touch</span>\n          </div>\n          <span class=\"metric-label\">Influenced Opps</span>\n          <strong class=\"metric-value\">{{ vm.performance.influencedOpportunities }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--pipeline\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon warning\"><i class=\"pi pi-dollar\"></i></div>\n            <span class=\"metric-trend\"><i class=\"pi pi-chart-line\"></i> Pipeline</span>\n          </div>\n          <span class=\"metric-label\">Pipeline</span>\n          <strong class=\"metric-value\">{{ formatMoney(vm.performance.influencedPipelineAmount) }}</strong>\n        </article>\n        <article class=\"metric-card metric-card--won\">\n          <div class=\"metric-header\">\n            <div class=\"metric-icon success\"><i class=\"pi pi-check-circle\"></i></div>\n            <span class=\"metric-trend up\"><i class=\"pi pi-trophy\"></i> Won</span>\n          </div>\n          <span class=\"metric-label\">Won Revenue</span>\n          <strong class=\"metric-value\">{{ formatMoney(vm.performance.wonRevenue) }}</strong>\n        </article>\n      </div>\n\n      <div class=\"health-card data-card no-hover\" *ngIf=\"healthScore() as health\">\n        <div class=\"health-card__head\">\n          <div>\n            <h2 class=\"section-title\">Campaign Health Score</h2>\n            <p class=\"data-card-subtitle\">Last computed {{ health.computedUtc | date:'short' }} \u2022 {{ health.calculationWindowDays }}d window</p>\n          </div>\n          <p-tag [value]=\"trendLabel(health.trend)\" [severity]=\"health.trend === 'up' ? 'success' : (health.trend === 'down' ? 'danger' : 'info')\"></p-tag>\n        </div>\n        <div class=\"health-card__body\">\n          <div class=\"health-score-pill\" [class.down]=\"health.trend === 'down'\" [class.up]=\"health.trend === 'up'\">\n            <i [class]=\"trendIcon(health.trend)\"></i>\n            <strong>{{ health.score }}</strong>\n            <span>/100</span>\n          </div>\n          <div class=\"health-reasons\">\n            <p-tag *ngFor=\"let reason of health.reasonChips\" [value]=\"reason\" severity=\"secondary\"></p-tag>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"tab-bar glass-card no-hover\">\n      <div class=\"tab-actions\">\n        <button pButton type=\"button\" class=\"crm-button crm-button--pill crm-button--sm tab-button\" [class.active]=\"activeTab() === 'overview'\" label=\"Overview\" (click)=\"setTab('overview')\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--pill crm-button--sm tab-button\" [class.active]=\"activeTab() === 'members'\" label=\"Members\" (click)=\"setTab('members')\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--pill crm-button--sm tab-button\" [class.active]=\"activeTab() === 'opportunities'\" label=\"Attributed Opportunities\" (click)=\"setTab('opportunities')\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--pill crm-button--sm tab-button\" [class.active]=\"activeTab() === 'performance'\" label=\"Performance\" (click)=\"setTab('performance')\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--pill crm-button--sm tab-button\" [class.active]=\"activeTab() === 'action-center'\" label=\"Action Center\" (click)=\"setTab('action-center')\"></button>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"activeTab() === 'overview'\">\n      <h2 class=\"section-title\">Campaign Overview</h2>\n      <dl class=\"overview-grid\">\n        <div><dt>Owner</dt><dd>{{ vm.campaign.ownerName }}</dd></div>\n        <div><dt>Start</dt><dd>{{ vm.campaign.startDateUtc ? (vm.campaign.startDateUtc | date:'mediumDate') : '\u2014' }}</dd></div>\n        <div><dt>End</dt><dd>{{ vm.campaign.endDateUtc ? (vm.campaign.endDateUtc | date:'mediumDate') : '\u2014' }}</dd></div>\n        <div><dt>Budget Planned</dt><dd>{{ formatMoney(vm.campaign.budgetPlanned) }}</dd></div>\n        <div><dt>Budget Actual</dt><dd>{{ formatMoney(vm.campaign.budgetActual) }}</dd></div>\n        <div class=\"objective\"><dt>Objective</dt><dd>{{ vm.campaign.objective || '\u2014' }}</dd></div>\n      </dl>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"activeTab() === 'members'\">\n      <h2 class=\"section-title\">Members</h2>\n\n      <div class=\"member-form\" *ngIf=\"canManage()\">\n        <p-select\n          appendTo=\"body\"\n          styleClass=\"crm-input\"\n          [options]=\"entityTypeOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [ngModel]=\"entityType()\"\n          (ngModelChange)=\"entityType.set($event)\"\n        ></p-select>\n\n        <p-select\n          appendTo=\"body\"\n          styleClass=\"crm-input\"\n          [options]=\"currentOptions()\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [placeholder]=\"'Select ' + entityType()\"\n          [ngModel]=\"selectedEntityId()\"\n          (ngModelChange)=\"selectedEntityId.set($event)\"\n        ></p-select>\n\n        <p-select\n          appendTo=\"body\"\n          styleClass=\"crm-input\"\n          [options]=\"responseStatusOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [ngModel]=\"responseStatus()\"\n          (ngModelChange)=\"responseStatus.set($event)\"\n        ></p-select>\n\n        <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Add Member\" (click)=\"addMember()\"></button>\n      </div>\n\n      <div class=\"table-wrap\">\n        <p-table [value]=\"vm.members\" styleClass=\"crm-table\" [rowHover]=\"true\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Entity</th>\n              <th>Type</th>\n              <th>Status</th>\n              <th>Added</th>\n              <th>Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-member>\n            <tr>\n              <td>{{ member.entityName }}</td>\n              <td>{{ member.entityType }}</td>\n              <td>{{ member.responseStatus }}</td>\n              <td>{{ member.addedUtc | date:'short' }}</td>\n              <td>\n                <div class=\"row-actions\">\n                  <button\n                    pButton\n                    type=\"button\"\n                    class=\"action-btn p-button-text p-button-rounded p-button-sm p-button-danger\"\n                    icon=\"pi pi-trash\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"removeMember(member)\"\n                  ></button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"emptymessage\">\n            <tr>\n              <td colspan=\"5\" class=\"empty\">No members added yet.</td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"activeTab() === 'opportunities'\">\n      <h2 class=\"section-title\">Attributed Opportunities</h2>\n      <div class=\"table-wrap\">\n        <p-table [value]=\"vm.performance.opportunities\" styleClass=\"crm-table\" [rowHover]=\"true\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Opportunity</th>\n              <th>Account</th>\n              <th>Stage</th>\n              <th>Amount</th>\n              <th>Status</th>\n              <th>Attributed</th>\n              <th>Explain</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-opp>\n            <tr>\n              <td>{{ opp.opportunityName }}</td>\n              <td>{{ opp.accountName }}</td>\n              <td>{{ opp.stage }}</td>\n              <td>{{ formatMoney(opp.amount) }}</td>\n              <td>{{ opp.isClosed ? (opp.isWon ? 'Won' : 'Closed') : 'Open' }}</td>\n              <td>{{ opp.attributedUtc | date:'short' }}</td>\n              <td>\n                <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-info-circle\" label=\"Why\" (click)=\"showExplainability(opp.opportunityId)\"></button>\n              </td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"emptymessage\">\n            <tr>\n              <td colspan=\"7\" class=\"empty\">No attributed opportunities yet.</td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"activeTab() === 'performance'\">\n      <h2 class=\"section-title\">Performance</h2>\n      <ul class=\"performance-list\">\n        <li>Members: <strong>{{ vm.performance.memberCount }}</strong></li>\n        <li>Influenced opportunities: <strong>{{ vm.performance.influencedOpportunities }}</strong></li>\n        <li>Influenced pipeline: <strong>{{ formatMoney(vm.performance.influencedPipelineAmount) }}</strong></li>\n        <li>Won revenue: <strong>{{ formatMoney(vm.performance.wonRevenue) }}</strong></li>\n        <li>Conversion rate: <strong>{{ vm.performance.conversionRate }}%</strong></li>\n      </ul>\n    </section>\n\n    <section class=\"data-card no-hover\" *ngIf=\"activeTab() === 'action-center'\">\n      <header class=\"data-card-header\">\n        <div>\n          <h2 class=\"section-title\">Next Best Actions</h2>\n          <p class=\"data-card-subtitle\">Recommendation volume capped at 5 active actions.</p>\n        </div>\n      </header>\n      <div class=\"recommendation-grid\" *ngIf=\"recommendations().length; else noRecommendationsTpl\">\n        <article class=\"recommendation-card\" *ngFor=\"let recommendation of recommendations()\">\n          <div class=\"recommendation-card__head\">\n            <p-tag [value]=\"recommendation.severity\" [severity]=\"recommendationSeverity(recommendation.severity)\"></p-tag>\n            <span class=\"confidence\">Confidence {{ (recommendation.confidence * 100) | number:'1.0-0' }}%</span>\n          </div>\n          <h3 class=\"recommendation-title\">{{ recommendation.title }}</h3>\n          <p class=\"recommendation-description\">{{ recommendation.description }}</p>\n          <p class=\"recommendation-impact\">Estimated impact: <strong>{{ formatMoney(recommendation.impactEstimate) }}</strong></p>\n\n          <ul class=\"evidence-list\">\n            <li *ngFor=\"let evidence of recommendation.evidence\">{{ evidence }}</li>\n          </ul>\n\n          <input\n            pInputText\n            type=\"text\"\n            class=\"reason-input\"\n            [ngModel]=\"recommendationReason()[recommendation.id] || ''\"\n            (ngModelChange)=\"updateRecommendationReason(recommendation.id, $event)\"\n            placeholder=\"Optional decision reason\"\n          />\n\n          <div class=\"recommendation-actions\">\n            <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" icon=\"pi pi-list\" label=\"Open Worklist\" (click)=\"openOpportunityWorklist(recommendation)\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" icon=\"pi pi-check\" label=\"Accept\" [disabled]=\"!canManage()\" (click)=\"decideRecommendation(recommendation, 'accept')\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-times\" label=\"Dismiss\" [disabled]=\"!canManage()\" (click)=\"decideRecommendation(recommendation, 'dismiss')\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--text\" icon=\"pi pi-clock\" label=\"Snooze\" [disabled]=\"!canManage()\" (click)=\"decideRecommendation(recommendation, 'snooze')\"></button>\n          </div>\n        </article>\n      </div>\n    </section>\n  </div>\n</div>\n\n<p-dialog\n  [visible]=\"explainabilityOpen()\"\n  (visibleChange)=\"explainabilityOpen.set($event)\"\n  [modal]=\"true\"\n  [dismissableMask]=\"true\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  [style]=\"{ width: 'min(860px, 96vw)' }\"\n  header=\"Attribution Explainability\"\n  (onHide)=\"closeExplainability()\"\n>\n  <ng-container *ngIf=\"!loadingExplainability(); else explainLoadingTpl\">\n    <div class=\"explainability\" *ngIf=\"explainability() as expl; else explainEmptyTpl\">\n      <p class=\"explainability-meta\">\n        Model: <strong>{{ expl.model }}</strong>\n        <span *ngIf=\"expl.ruleVersion\"> \u2022 Rule: {{ expl.ruleVersion }}</span>\n      </p>\n      <p class=\"explainability-meta\" *ngIf=\"expl.attributedUtc\">Attributed: {{ expl.attributedUtc | date:'short' }}</p>\n      <p class=\"explainability-meta\" *ngIf=\"expl.sourceEntityType\">Source: {{ expl.sourceEntityType }} {{ expl.sourceEntityId }}</p>\n\n      <h3 class=\"section-title\">Evidence</h3>\n      <ul class=\"evidence-list\">\n        <li *ngFor=\"let item of expl.evidence\">{{ item }}</li>\n      </ul>\n\n      <h3 class=\"section-title\">Candidate Memberships</h3>\n      <p-table [value]=\"expl.candidates\" styleClass=\"crm-table\" [rowHover]=\"true\">\n        <ng-template pTemplate=\"header\">\n          <tr>\n            <th>Campaign</th>\n            <th>Entity</th>\n            <th>Entity Name</th>\n            <th>Member Added</th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-row>\n          <tr>\n            <td>{{ row.campaignName }}</td>\n            <td>{{ row.entityType }}</td>\n            <td>{{ row.entityName }}</td>\n            <td>{{ row.memberAddedUtc | date:'short' }}</td>\n          </tr>\n        </ng-template>\n      </p-table>\n    </div>\n  </ng-container>\n</p-dialog>\n\n<ng-template #loadingTpl>\n  <div class=\"page-container campaign-detail-page\">\n    <section class=\"crm-panel loading\">Loading campaign...</section>\n  </div>\n</ng-template>\n\n<ng-template #noRecommendationsTpl>\n  <div class=\"empty\">No active recommendations yet. Refresh from attribution to recompute.</div>\n</ng-template>\n\n<ng-template #explainLoadingTpl>\n  <div class=\"loading\">Loading explainability...</div>\n</ng-template>\n\n<ng-template #explainEmptyTpl>\n  <div class=\"empty\">No explainability details found for this opportunity.</div>\n</ng-template>\n", styles: [".campaign-detail-page {\n  .page-content {\n    display: grid;\n    gap: 1rem;\n  }\n\n  .hero-subtitle {\n    max-width: 100%;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(4, minmax(170px, 1fr));\n    gap: 0.9rem;\n  }\n\n  .metric-card {\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n    padding: 0.95rem 1rem;\n  }\n\n  .metric-card .metric-value {\n    font-size: clamp(1.1rem, 1.5vw, 1.45rem);\n  }\n\n  .metric-card--members::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n  }\n\n  .metric-card--influenced::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);\n  }\n\n  .metric-card--pipeline::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);\n  }\n\n  .metric-card--won::before {\n    opacity: 1;\n    background: linear-gradient(135deg, #10b981 0%, #22c55e 100%);\n  }\n\n  .health-card {\n    margin-top: 0.9rem;\n  }\n\n  .health-card__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 0.85rem;\n  }\n\n  .health-card__body {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    gap: 0.8rem;\n    align-items: center;\n  }\n\n  .health-score-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    padding: 0.55rem 0.8rem;\n    border-radius: 999px;\n    border: 1px solid rgba(59, 130, 246, 0.3);\n    color: #1d4ed8;\n    background: rgba(59, 130, 246, 0.12);\n  }\n\n  .health-score-pill.up {\n    color: #047857;\n    border-color: rgba(16, 185, 129, 0.36);\n    background: rgba(16, 185, 129, 0.14);\n  }\n\n  .health-score-pill.down {\n    color: #b91c1c;\n    border-color: rgba(239, 68, 68, 0.36);\n    background: rgba(239, 68, 68, 0.14);\n  }\n\n  .health-score-pill strong {\n    font-size: 1.2rem;\n  }\n\n  .health-reasons {\n    display: flex;\n    gap: 0.4rem;\n    flex-wrap: wrap;\n  }\n\n  .tab-bar {\n    padding: 0.75rem 1rem;\n  }\n\n  .tab-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.55rem;\n  }\n\n  .tab-button {\n    border: 1px solid rgba(148, 163, 184, 0.35);\n    background: rgba(255, 255, 255, 0.75);\n    color: #334155;\n  }\n\n  .tab-button.active {\n    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);\n    border-color: transparent;\n    color: #fff;\n    box-shadow: 0 12px 22px rgba(59, 130, 246, 0.22);\n  }\n\n  .overview-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.85rem 1rem;\n  }\n\n  .overview-grid .objective {\n    grid-column: 1 / -1;\n  }\n\n  .overview-grid dt {\n    margin: 0;\n    font-size: 0.8rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .overview-grid dd {\n    margin: 0.2rem 0 0;\n    font-weight: 600;\n    color: #1f2937;\n  }\n\n  .member-form {\n    display: grid;\n    grid-template-columns: 150px minmax(220px, 1fr) 190px auto;\n    gap: 0.7rem;\n    margin-bottom: 0.9rem;\n  }\n\n  .crm-input {\n    width: 100%;\n  }\n\n  ::ng-deep .crm-input.p-select {\n    width: 100%;\n  }\n\n  .table-wrap {\n    overflow-x: auto;\n  }\n\n  .performance-list {\n    margin: 0;\n    padding-left: 1.1rem;\n    display: grid;\n    gap: 0.35rem;\n  }\n\n  .recommendation-grid {\n    display: grid;\n    gap: 0.8rem;\n  }\n\n  .recommendation-card {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    border-radius: 14px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, rgba(248, 250, 252, 0.75) 100%);\n    padding: 0.85rem;\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  .recommendation-card__head {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 0.6rem;\n  }\n\n  .confidence {\n    font-size: 0.82rem;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .recommendation-title {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n  }\n\n  .recommendation-description,\n  .recommendation-impact {\n    margin: 0;\n    color: #334155;\n  }\n\n  .evidence-list {\n    margin: 0;\n    padding-left: 1rem;\n    color: #475569;\n    display: grid;\n    gap: 0.2rem;\n  }\n\n  .reason-input {\n    width: 100%;\n  }\n\n  .recommendation-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.45rem;\n  }\n\n  .explainability-meta {\n    margin: 0 0 0.45rem;\n    color: #475569;\n  }\n\n  .empty,\n  .loading {\n    text-align: center;\n    color: var(--crm-text-muted, #6b7280);\n    padding: 1rem;\n  }\n\n  @media (max-width: 980px) {\n    .metrics-grid {\n      grid-template-columns: repeat(2, minmax(165px, 1fr));\n    }\n\n    .member-form {\n      grid-template-columns: 1fr;\n    }\n\n    .health-card__body {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 900px) {\n    .overview-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .metrics-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignDetailPage, { className: "CampaignDetailPage", filePath: "src/app/crm/features/marketing/pages/campaign-detail.page.ts", lineNumber: 49 }); })();
